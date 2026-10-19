from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, field_validator, Field
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import httpx
import os
import sys
import json
import logging
import asyncio
from dotenv import load_dotenv
from typing import List, Optional, Dict

# ── Logging ──────────────────────────────────────────────────────────────────
logger = logging.getLogger("nabla_chat")
logger.setLevel(logging.INFO)
if not logger.handlers:
    handler = logging.StreamHandler(sys.stderr)
    handler.setFormatter(logging.Formatter("[%(asctime)s] %(levelname)s in %(module)s: %(message)s"))
    logger.addHandler(handler)

from pathlib import Path
current_dir = Path(__file__).resolve().parent

# Ensure current_dir is in sys.path so system_prompt can always be resolved
if str(current_dir) not in sys.path:
    sys.path.insert(0, str(current_dir))

# Persona lives in one place, shared with api/test_agent.py to prevent drift.
try:
    from system_prompt import SYSTEM_PROMPT  # Vercel / same directory
except ImportError:
    try:
        from api.system_prompt import SYSTEM_PROMPT  # portfolio/ cwd
    except ImportError:
        from portfolio.api.system_prompt import SYSTEM_PROMPT  # root cwd

# Load env vars (support both .env and .env.local, in current, portfolio, and parent dirs)
candidates = [
    current_dir / ".env",
    current_dir / ".env.local",
    current_dir.parent / ".env",
    current_dir.parent / ".env.local",
    current_dir.parent.parent / ".env",
    current_dir.parent.parent / ".env.local",
]
for p in candidates:
    if p.exists():
        load_dotenv(p)

# ── LLM Provider Configuration ──────────────────────────────────────────────
def get_llm_providers() -> List[Dict[str, str]]:
    """Resolve active LLM providers in priority order. Groq first, DeepSeek as fallback."""
    providers = []
    groq_api_key = os.environ.get("GROQ_API_KEY")
    if groq_api_key:
        model = os.environ.get("GROQ_MODEL", "openai/gpt-oss-120b")
        providers.append({
            "provider": "Groq",
            "api_url": "https://api.groq.com/openai/v1/chat/completions",
            "api_key": groq_api_key,
            "model": model,
        })

    deepseek_api_key = os.environ.get("DEEPSEEK_API_KEY")
    if deepseek_api_key:
        providers.append({
            "provider": "DeepSeek",
            "api_url": "https://api.deepseek.com/chat/completions",
            "api_key": deepseek_api_key,
            "model": "deepseek-chat",
        })

    return providers

def get_llm_config() -> Optional[Dict[str, str]]:
    """Backwards-compatible helper returning the primary LLM provider."""
    providers = get_llm_providers()
    return providers[0] if providers else None

# Log provider status at startup
configured_providers = get_llm_providers()
if configured_providers:
    summary = ", ".join([f"{p['provider']} ({p['model']})" for p in configured_providers])
    logger.info(f"LLM Providers configured (in priority order): {summary}")
else:
    logger.warning("No LLM API key found (neither GROQ_API_KEY nor DEEPSEEK_API_KEY).")

# ── Rate Limiting ────────────────────────────────────────────────────────────
def get_client_ip(request: Request) -> str:
    """Extract real client IP considering reverse proxy headers (e.g. Vercel)."""
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return get_remote_address(request)

limiter = Limiter(key_func=get_client_ip)
app = FastAPI(
    docs_url=None,      # Disable Swagger UI in production
    redoc_url=None,     # Disable ReDoc in production
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# ── CORS ─────────────────────────────────────────────────────────────────────
LOCAL_ORIGIN = "http://localhost:5173"
ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN")
allowed_origins = [ALLOWED_ORIGIN] if ALLOWED_ORIGIN else [LOCAL_ORIGIN]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["POST"],
    allow_headers=["Content-Type", "Accept"],
)

# ── HTTP Client ──────────────────────────────────────────────────────────────
_http_client: Optional[httpx.AsyncClient] = None

def get_http_client() -> httpx.AsyncClient:
    global _http_client
    if _http_client is None or _http_client.is_closed:
        _http_client = httpx.AsyncClient(
            timeout=httpx.Timeout(30.0, connect=10.0),
            limits=httpx.Limits(max_keepalive_connections=5, max_connections=10)
        )
    return _http_client

# ── Models ───────────────────────────────────────────────────────────────────
class ChatMessage(BaseModel):
    role: str = Field(..., pattern="^(user|assistant)$")
    content: str = Field(..., min_length=1, max_length=1000)

    @field_validator("content")
    @classmethod
    def strip_content(cls, v: str) -> str:
        return v.strip()

class ChatRequest(BaseModel):
    messages: List[ChatMessage] = Field(..., min_length=1, max_length=10)

# ── Routes ───────────────────────────────────────────────────────────────────
@app.post("/api/chat")
@limiter.limit("15/minute")
async def chat(request: Request, body: ChatRequest):
    providers = get_llm_providers()
    if not providers:
        logger.error("Rejecting chat request: No LLM API key configured (GROQ_API_KEY or DEEPSEEK_API_KEY).")
        raise HTTPException(status_code=503, detail="Chat service is temporarily unavailable.")

    # Context slicing: only last 10 messages with system prompt
    context = body.messages[-10:]
    formatted_messages = [{"role": "system", "content": SYSTEM_PROMPT}] + [
        {"role": m.role, "content": m.content} for m in context
    ]

    client = get_http_client()
    accept_header = request.headers.get("accept", "")

    # Check if client accepts streaming (SSE)
    if "text/event-stream" in accept_header:
        async def event_generator():
            async with httpx.AsyncClient(
                timeout=httpx.Timeout(30.0, connect=10.0),
                limits=httpx.Limits(max_keepalive_connections=5, max_connections=10)
            ) as stream_client:
                for p_idx, provider in enumerate(providers):
                    try:
                        async with stream_client.stream(
                            "POST",
                            provider["api_url"],
                            headers={
                                "Content-Type": "application/json",
                                "Authorization": f"Bearer {provider['api_key']}"
                            },
                            json={
                                "model": provider["model"],
                                "messages": formatted_messages,
                                "max_tokens": 300,
                                "temperature": 0.3,
                                "stream": True
                            },
                            timeout=30.0
                        ) as response:
                            if response.status_code != 200:
                                logger.warning(
                                    f"Stream request failed on {provider['provider']} with status {response.status_code}."
                                )
                                if p_idx + 1 < len(providers):
                                    logger.info(f"Failing over to fallback provider: {providers[p_idx+1]['provider']}")
                                    continue
                                yield f"data: {json.dumps({'error': 'AI service error'})}\n\n"
                                return

                            async for line in response.aiter_lines():
                                if not line:
                                    continue
                                if line.startswith("data: "):
                                    data_str = line[6:].strip()
                                    if data_str == "[DONE]":
                                        yield "data: [DONE]\n\n"
                                        return
                                    try:
                                        chunk = json.loads(data_str)
                                        delta = chunk.get("choices", [{}])[0].get("delta", {}).get("content", "")
                                        if delta:
                                            yield f"data: {json.dumps({'content': delta})}\n\n"
                                    except json.JSONDecodeError:
                                        continue
                            return
                    except Exception as e:
                        logger.warning(f"Exception during stream with {provider['provider']}: {e}")
                        if p_idx + 1 < len(providers):
                            logger.info(f"Failing over to fallback provider: {providers[p_idx+1]['provider']}")
                            continue
                        yield f"data: {json.dumps({'error': 'Stream error'})}\n\n"
                        return

        return StreamingResponse(
            event_generator(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no"
            }
        )

    # Standard JSON fallback / direct completions
    last_error_detail = "AI service returned an error. Please try again later."
    for p_idx, provider in enumerate(providers):
        max_attempts = 2
        for attempt in range(1, max_attempts + 1):
            try:
                response = await client.post(
                    provider["api_url"],
                    headers={
                        "Content-Type": "application/json",
                        "Authorization": f"Bearer {provider['api_key']}"
                    },
                    json={
                        "model": provider["model"],
                        "messages": formatted_messages,
                        "max_tokens": 300,
                        "temperature": 0.3
                    }
                )

                if response.status_code in (429, 502, 503, 504) and attempt < max_attempts:
                    logger.warning(
                        f"Upstream {provider['provider']} returned {response.status_code} on attempt {attempt}. Retrying..."
                    )
                    await asyncio.sleep(1.0)
                    continue

                if response.status_code != 200:
                    logger.warning(
                        f"Upstream {provider['provider']} failed with status {response.status_code}."
                    )
                    break  # Failover to next provider

                result = response.json()
                reply = result.get("choices", [{}])[0].get("message", {}).get("content", "")
                if not reply:
                    logger.warning(f"Upstream {provider['provider']} returned empty content.")
                    break  # Failover to next provider

                return {"reply": reply}

            except (httpx.TimeoutException, httpx.NetworkError) as e:
                logger.warning(f"Network error on attempt {attempt} for {provider['provider']}: {e}")
                if attempt < max_attempts:
                    await asyncio.sleep(1.0)
                    continue
                break  # Failover to next provider
            except Exception as e:
                logger.error(f"Unexpected error with {provider['provider']}: {e}", exc_info=True)
                break

    raise HTTPException(status_code=502, detail=last_error_detail)
