# Daniel Pardo - React Portfolio

**Live:** [danielwpcv.vercel.app](https://danielwpcv.vercel.app)

This is the main codebase for Daniel Pardo's professional portfolio, built with a modern React stack. It showcases experience in Data Strategy, Business Intelligence, and AI consulting (NablaOps).

## Tech Stack

- **Frontend:** React 19 + Vite 7, TailwindCSS v4, Framer Motion
- **Backend:** Python (FastAPI/Uvicorn) — DeepSeek LLM integration, deployed as Vercel Serverless Functions
- **Routing & SEO:** `react-router-dom`, `react-helmet-async`, JSON-LD Schema.org markup
- **Styling:** Dark Mode via React Context, full `focus-visible` WCAG 2.1 AA accessibility
- **Data:** Structured JS objects (`src/data/content.js`, `src/data/blog.js`)
- **Hosting:** Vercel (automatic deployments from `main` branch)

## Recent Optimizations

- **Backend I/O:** Replaced synchronous `requests` with asynchronous `httpx` in the FastAPI chatbot endpoint to prevent Event Loop blocking during DeepSeek API calls.
- **Frontend Scroll Performance:** Added requestAnimationFrame throttling to the Navbar scroll listener to maintain 60FPS.
- **Image Optimization:** Converted heavy profile images to `.webp` format for improved First Contentful Paint.
- **Resilience:** Implemented a top-level React `<ErrorBoundary>` wrapper to elegantly catch rendering errors across the application.

## Architecture

```
portfolio/
├── api/                    # Serverless backend
│   ├── chat.py             # FastAPI app — Nabla chatbot (DeepSeek API)
│   ├── requirements.txt    # Python dependencies
│   └── test_agent.py       # Security and usefulness tests
├── src/
│   ├── components/         # Section components (Navbar, AboutMe, Skills, Projects, etc.)
│   ├── context/            # LanguageContext (En/Es), ThemeContext (Light/Dark)
│   ├── data/               # Content files — edit to update text, projects, skills, blog
│   ├── hooks/              # Custom hooks (viewport monitoring)
│   └── utils/              # Constants, regex patterns, thresholds
├── public/                 # Static assets (CV, images, sitemap)
├── vercel.json             # Rewrites, security headers, cache rules
└── package.json            # Dependencies and scripts
```

## Setup / Configuración

### English

1. **Install dependencies:** `npm install`
2. **Python environment:**

   ```bash
   python -m venv .venv
   # Windows: .\.venv\Scripts\Activate.ps1
   # Unix/macOS: source .venv/bin/activate
   pip install -r api/requirements.txt
   ```

3. **Environment variables:** Create `.env.local` with `DEEPSEEK_API_KEY=sk-...`

### Español

1. **Instalar dependencias:** `npm install`
2. **Entorno Python:**

   ```bash
   python -m venv .venv
   # Windows: .\.venv\Scripts\Activate.ps1
   # Unix/macOS: source .venv/bin/activate
   pip install -r api/requirements.txt
   ```

3. **Variables de entorno:** Crea `.env.local` con tu `DEEPSEEK_API_KEY`

## Local Development (Dual-Server)

The AI chatbot requires two servers running simultaneously.

### 1. Environment

Create `.env.local` in this folder:

```env
DEEPSEEK_API_KEY=sk-your-secret-key-here
```

### 2. Backend (Python)

```powershell
# From portfolio/
.\start-backend.ps1
```

Or manually: `python -m uvicorn api.chat:app --port 8000`

### 3. Frontend (React + Vite)

In a second terminal:

```bash
npm run dev
```

Vite proxies `/api` requests to the Python backend on port 8000 (configured in `vite.config.js`).

Open [http://localhost:5173](http://localhost:5173).

## Production (Vercel)

Deployed at **<https://danielwpcv.vercel.app>** with automatic deployments on push to `main`.

| Setting | Value |
|---|---|
| Root Directory | `portfolio` |
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Python Runtime | 3.12 |

**Environment variables** (configured in Vercel dashboard):

- `DEEPSEEK_API_KEY` — DeepSeek API key
- `ALLOWED_ORIGIN` — `https://danielwpcv.vercel.app`

## Security

- **Rate Limiting:** `slowapi` — 10 requests/min per IP on the chatbot endpoint
- **Input Validation:** Pydantic enforcement on message length and history depth
- **Error Sanitization:** Generic 500/502/504 responses prevent internal data exposure
- **Headers:** CSP, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff` (via `vercel.json`)
- **CORS:** Restricted to authorized origins via `ALLOWED_ORIGIN`
- **AI Security:** Automated prompt injection and usefulness tests (`api/test_agent.py`)

## Sections

- **About Me** — Executive experience, tech stack, location
- **Skills** — Grid layout: Data Strategy, BI, GenAI domains
- **Projects** — STAR method descriptions with metrics and tech tags
- **Education** — Academic background and certifications
- **Recommendations** — Professional endorsements
- **Blog** — Articles with dedicated URLs and meta tags
- **Chatbot (Nabla)** — AI assistant answering recruiter questions based on portfolio context
