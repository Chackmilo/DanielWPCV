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
from typing import List, Optional

# ── Logging ──────────────────────────────────────────────────────────────────
logger = logging.getLogger("nabla_chat")
logger.setLevel(logging.INFO)
if not logger.handlers:
    handler = logging.StreamHandler(sys.stderr)
    handler.setFormatter(logging.Formatter("[%(asctime)s] %(levelname)s in %(module)s: %(message)s"))
    logger.addHandler(handler)

# Persona lives in one place, shared with api/test_agent.py to prevent drift.
try:
    from system_prompt import SYSTEM_PROMPT  # Vercel (api/ is the function root)
except ImportError:  # local dev: `uvicorn api.chat:app` launched from portfolio/
    from api.system_prompt import SYSTEM_PROMPT

# Load env vars (local dev: from parent dir, production: from environment)
if os.path.exists(".env.local"):
    load_dotenv(".env.local")
elif os.path.exists("../.env.local"):
    load_dotenv("../.env.local")

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

# ── API Key & HTTP Client ───────────────────────────────────────────────────
DEEPSEEK_API_KEY = os.environ.get("DEEPSEEK_API_KEY")
if not DEEPSEEK_API_KEY:
    logger.warning("DEEPSEEK_API_KEY is not configured in the environment.")

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
    if not DEEPSEEK_API_KEY:
        logger.error("Rejecting chat request: DEEPSEEK_API_KEY is not set.")
        raise HTTPException(status_code=503, detail="Chat service is temporarily unavailable.")

    # Context slicing: only last 10 messages with system prompt
    context = body.messages[-10:]
    formatted_messages = [{"role": "system", "content": SYSTEM_PROMPT}] + [
        {"role": m.role, "content": m.content} for m in context
    ]

    client = get_http_client()

    # Check if client accepts streaming (SSE)
    accept_header = request.headers.get("accept", "")
    if "text/event-stream" in accept_header:
        async def event_generator():
            try:
                async with client.stream(
                    "POST",
                    "https://api.deepseek.com/chat/completions",
                    headers={
                        "Content-Type": "application/json",
                        "Authorization": f"Bearer {DEEPSEEK_API_KEY}"
                    },
                    json={
                        "model": "deepseek-chat",
                        "messages": formatted_messages,
                        "max_tokens": 300,
                        "temperature": 0.3,
                        "stream": True
                    },
                    timeout=30.0
                ) as response:
                    if response.status_code != 200:
                        logger.error(f"Upstream stream error: {response.status_code}")
                        yield f"data: {json.dumps({'error': 'AI service error'})}\n\n"
                        return

                    async for line in response.aiter_lines():
                        if not line:
                            continue
                        if line.startswith("data: "):
                            data_str = line[6:].strip()
                            if data_str == "[DONE]":
                                yield "data: [DONE]\n\n"
                                break
                            try:
                                chunk = json.loads(data_str)
                                delta = chunk.get("choices", [{}])[0].get("delta", {}).get("content", "")
                                if delta:
                                    yield f"data: {json.dumps({'content': delta})}\n\n"
                            except json.JSONDecodeError:
                                continue
            except Exception as e:
                logger.error(f"Stream error: {e}", exc_info=True)
                yield f"data: {json.dumps({'error': 'Stream error'})}\n\n"

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
    max_attempts = 2
    for attempt in range(1, max_attempts + 1):
        try:
            response = await client.post(
                "https://api.deepseek.com/chat/completions",
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {DEEPSEEK_API_KEY}"
                },
                json={
                    "model": "deepseek-chat",
                    "messages": formatted_messages,
                    "max_tokens": 300,
                    "temperature": 0.3
                }
            )

            if response.status_code in (502, 503, 504) and attempt < max_attempts:
                logger.warning(f"Upstream returned {response.status_code} on attempt {attempt}. Retrying...")
                await asyncio.sleep(1.0)
                continue

            response.raise_for_status()
            result = response.json()
            reply = result.get("choices", [{}])[0].get("message", {}).get("content", "")
            if not reply:
                logger.error("Upstream returned 200 OK but content was empty.")
                raise HTTPException(status_code=502, detail="AI service returned an empty response. Please try again.")
            return {"reply": reply}

        except (httpx.TimeoutException, httpx.NetworkError) as e:
            logger.warning(f"Network error on attempt {attempt}: {e}")
            if attempt < max_attempts:
                await asyncio.sleep(1.0)
                continue
            raise HTTPException(status_code=504, detail="Request to AI service timed out. Please try again.")
        except httpx.HTTPStatusError as e:
            logger.error(f"HTTP error from upstream: status={e.response.status_code}")
            raise HTTPException(status_code=502, detail="AI service returned an error. Please try again later.")
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Unexpected error in chat endpoint: {e}", exc_info=True)
            raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again.")
