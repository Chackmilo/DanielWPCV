from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator, Field
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import requests
import os
from dotenv import load_dotenv
from typing import List

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
# Allow localhost for dev and the Vercel production domain.
# Set ALLOWED_ORIGIN env var in your Vercel project settings
# e.g. https://your-portfolio.vercel.app
ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN", "http://localhost:5173")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[ALLOWED_ORIGIN, "http://localhost:5173"],
    allow_credentials=False,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)

# ── API Key ────────────────────────────────────────────────────────────────────
DEEPSEEK_API_KEY = os.environ.get("DEEPSEEK_API_KEY")

SYSTEM_PROMPT = """You are Nabla, the AI assistant for Daniel Camilo Pardo Figueroa's professional portfolio.
Your job is to answer recruiter or client questions about Daniel's experience, skills, and background using EXCLUSIVELY the information provided below.
Always answer in the same language the user is speaking (English or Spanish).
Keep answers concise (maximum 3 sentences), professional, and directly related to Daniel's profile.
If you don't know the answer based on the context, politely state that you only have information about Daniel's professional profile as shown on the website.

CONTEXT ABOUT DANIEL:
Role: Director of Data Strategy & AI
Based in: Bogotá, Colombia (Open to remote / relocation)
Open to: Director / Head of Data · AI Strategy · BI & Analytics Leadership · Digital Product and Data Transformation

Education:
- Microsoft AI & Machine Learning Engineer — Microsoft (Professional Program)
- Master Business Engineering (MBE) — Universitat de Barcelona (2020-2021)
- Industrial Engineering — Universidad de los Andes (2010-2014)
- Chemical Engineering — Universidad de los Andes (2010-2014)

Experience:
- NablaOps (2024-Present): Founder & Consulting Lead. End-to-end digital transformation consulting. Built AI agents using Python, LangChain, LangGraph, RAG, and n8n deployed on Docker. Clients include Monomiel, Fortuna Migration, Urbagio. 3+ B2B/B2C clients launched, 100% automated customer service.
- RippleNami (2025-Present): Director of Strategy & BI. Architected enterprise datalakehouse, optimized 50+ DB queries (15min→30sec), ~40% KPI delivery latency reduction, 95%+ ML prediction accuracy, 99.9% data accuracy across 5M+ records.
- inDrive LATAM Delivery (2022-2024): Senior Product & Growth Manager. Led growth strategies across LATAM. 60% operations growth, 40% MAU growth, 1.5x GMV growth, 20% operational efficiency increase.
- twinlu (2020-2022): CEO & Co-Founder. Digital transformation for 50+ regional B2B clients across multiple industries. E-commerce, dashboards, process optimization.

Impact highlights:
- ~40% reduction in KPI delivery latency (RippleNami)
- 1.5x GMV growth across LATAM (inDrive)
- 30% improvement in operational efficiency for delivery users
- 20% increase in customer retention via data-driven campaigns
- Digital transformation for 50+ B2B clients (twinlu)

Skills & Tech Stack:
- Data Strategy & Governance: Data Operating Models, Stewardship, Quality SLAs, Data Catalog, MDM
- Business Intelligence: Power BI, Tableau, Superset, KPI/OKR frameworks, dashboards
- GenAI & Machine Learning: Generative AI, ML pipelines, Deep Learning, AI Agents, LangGraph
- Python & Data Engineering: ETL pipelines, ML models, automation scripts
- Data Architecture: Datalakehouse, scalable pipelines, OrientDB, Snowflake
- Cloud: Azure, GCP, AWS
- Tools: BigQuery, dbt, Airflow, Great Expectations, Docker, n8n

Languages: Spanish (Native), English (B2 Advanced).

Certifications: AI Engineer, PMP, Data Scientist, Scrum Professional. Plus courses from Microsoft, DeepLearning.AI, Google, IBM, Duke, Vanderbilt, Hugging Face.
"""

# ── Models ─────────────────────────────────────────────────────────────────────
class ChatMessage(BaseModel):
    role: str = Field(..., pattern="^(user|assistant)$")
    content: str = Field(..., min_length=1, max_length=1000)

    @validator("content")
    def strip_content(cls, v: str) -> str:
        return v.strip()

class ChatRequest(BaseModel):
    messages: List[ChatMessage] = Field(..., min_items=1, max_items=20)

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
        response = requests.post(
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
            timeout=30
        )
        response.raise_for_status()
        result = response.json()
        reply = result.get("choices", [{}])[0].get("message", {}).get("content", "")
        if not reply:
            raise ValueError("Empty reply from upstream API")
        return {"reply": reply}

    except requests.exceptions.Timeout:
        raise HTTPException(status_code=504, detail="Request to AI service timed out. Please try again.")
    except requests.exceptions.HTTPError as e:
        status = e.response.status_code if e.response else 502
        # Never expose upstream error details (may contain auth info)
        raise HTTPException(status_code=502, detail="AI service returned an error. Please try again later.")
    except Exception:
        # Generic catch — never expose internal stack traces
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again.")
