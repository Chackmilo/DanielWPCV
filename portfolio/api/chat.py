from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, field_validator, Field
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import httpx
import os
from dotenv import load_dotenv
from typing import List

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

# ── Rate Limiting ──────────────────────────────────────────────────────────────
limiter = Limiter(key_func=get_remote_address, default_limits=["30/minute"])
app = FastAPI(
    docs_url=None,      # Disable Swagger UI in production
    redoc_url=None,     # Disable ReDoc in production
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# ── CORS ───────────────────────────────────────────────────────────────────────
# Production: set ALLOWED_ORIGIN in Vercel to the deployed domain.
# Local dev: leave it unset and only the Vite dev origin is allowed.
LOCAL_ORIGIN = "http://localhost:5173"
ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN")
allowed_origins = [ALLOWED_ORIGIN] if ALLOWED_ORIGIN else [LOCAL_ORIGIN]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)

# ── API Key ────────────────────────────────────────────────────────────────────
DEEPSEEK_API_KEY = os.environ.get("DEEPSEEK_API_KEY")

# ── Models ─────────────────────────────────────────────────────────────────────
class ChatMessage(BaseModel):
    role: str = Field(..., pattern="^(user|assistant)$")
    content: str = Field(..., min_length=1, max_length=1000)

    @field_validator("content")
    @classmethod
    def strip_content(cls, v: str) -> str:
        return v.strip()

class ChatRequest(BaseModel):
    messages: List[ChatMessage] = Field(..., min_length=1, max_length=20)

# ── Routes ─────────────────────────────────────────────────────────────────────
@app.post("/api/chat")
@limiter.limit("10/minute")
async def chat(request: Request, body: ChatRequest):
    if not DEEPSEEK_API_KEY:
        raise HTTPException(status_code=503, detail="Chat service is temporarily unavailable.")

    # Only keep last 10 turns; always inject system prompt first
    context = body.messages[-10:]
    formatted_messages = [{"role": "system", "content": SYSTEM_PROMPT}] + [
        {"role": m.role, "content": m.content} for m in context
    ]

    try:
        async with httpx.AsyncClient() as client:
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
                },
                timeout=30.0
            )
            response.raise_for_status()
            result = response.json()
            reply = result.get("choices", [{}])[0].get("message", {}).get("content", "")
            if not reply:
                raise ValueError("Empty reply from upstream API")
            return {"reply": reply}

    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Request to AI service timed out. Please try again.")
    except httpx.HTTPStatusError:
        # Never expose upstream error details (may contain auth info)
        raise HTTPException(status_code=502, detail="AI service returned an error. Please try again later.")
    except Exception:
        # Generic catch — never expose internal stack traces
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again.")
