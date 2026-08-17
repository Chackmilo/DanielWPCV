# Daniel Pardo - Professional Portfolio

**Live:** [danielwpcv.vercel.app](https://danielwpcv.vercel.app)

## Overview

Executive portfolio showcasing leadership experience, strategic metrics, projects, and certifications in **Data Strategy, Business Intelligence, and Generative AI**.

Built with **React 19 + Vite** (frontend) and **Python / FastAPI** (serverless AI backend), deployed on **Vercel** with automated CI/CD.

> All active code lives in the `portfolio/` directory.

---

## ⚡ Quick Start (Local Development)

### 1. Clone & Install

```bash
git clone https://github.com/Chackmilo/DanielWPCV.git
cd DanielWPCV/portfolio
npm install
```

### 2. Environment Variables

Create `portfolio/.env.local`:

```env
DEEPSEEK_API_KEY=sk-your-key-here
```

### 3. Start Backend & Frontend

We provide automated helper scripts that handle port cleanup, Python environment resolution, and local hosting:

**Terminal 1 (Backend - FastAPI):**
```powershell
# From portfolio/
.\start-backend.ps1
```
*Backend runs on [http://localhost:8000](http://localhost:8000).*

**Terminal 2 (Frontend - React + Vite):**
```powershell
# From portfolio/
.\start-frontend.ps1
# or: npm run dev
```
*Frontend runs on [http://localhost:5173](http://localhost:5173).*

Vite automatically proxies `/api` requests to the Python server on port 8000.

---

## ✨ Key Features & Architecture

- **Visual Design ("Obsidian Command"):** Sleek dark aesthetics (`#0B0F17`), Outfit display typography, Electric Emerald & Cobalt Indigo accents, and `.glass-card` styling.
- **Executive Telemetry Strip:** Real-time impact indicators (`~40% KPI Latency Reduction`, `1.5x LATAM GMV`, `30x Query Optimization`, `99.9% Data Accuracy`).
- **Long-Form Executive Blog:** 2 in-depth articles published with rich markdown parsing, reading progress bar, and schema markup:
  1. *From Government PMO to Leading Global AI Strategies* (`from-pmo-to-ai-leadership`)
  2. *My Story with Artificial Intelligence* (`my-path-to-ai`)
- **AI Agent (Nabla):** FastAPI serverless backend powered by DeepSeek with persistent connection pooling (`httpx`), rate limiting (`slowapi`), automatic retries, and interactive prompt suggestions.
- **Integrated CV:** Direct download button and PDF asset hosted at `/CV_Daniel_Pardo.pdf`.
- **Bilingual Context with Persistence:** Reactive English/Spanish switching with `localStorage` persistence and automatic browser language detection (`useLanguage`).
- **High-Performance Assets:** Modern `<picture>` element with WebP compression (35 KB, ~97% size reduction), eager priority loading, and self-hosted fonts.
- **SEO & Web Standards:** Semantic HTML (single `<h1>` per view, normalized `h1` → `h2` → `h3` hierarchy), dynamic route-specific canonical links via `react-helmet-async`, automated `sitemap.xml` with 3 indexed URLs, and JSON-LD schema markup.
- **Accessibility (WCAG 2.1 AA):** High contrast ratios, descriptive ARIA attributes, and visible focus rings.

---

## 🧪 Testing & Quality Assurance

```bash
# From portfolio/
npm run lint           # ESLint (0 errors / warnings)
npm test               # Unit tests (Vitest + Testing Library)
npm run build          # Production build + sitemap generator
npm run test:e2e       # E2E tests (Playwright with mocked /api/chat)
npm run test:e2e:live  # Live smoke test (hits active backend + DeepSeek)
```

Playwright browser installation (first run only): `npx playwright install chromium`.

---

## 🚀 CI/CD & Deployment (Vercel)

- **Continuous Integration:** GitHub Actions (`.github/workflows/ci.yml`) runs ESLint, Vitest, and Playwright on every push and pull request.
- **Vercel Serverless:** Automatic deployment upon merge to `main`.

| Setting | Value |
|---|---|
| **Framework Preset** | Vite |
| **Root Directory** | `portfolio` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Serverless Functions** | `api/chat.py` (Python 3.12) |

---

## 📁 Project Structure

```
DanielWPCV/
├── .github/workflows/      # GitHub Actions CI workflow (lint + test + e2e)
├── portfolio/              # Main application directory
│   ├── api/                # FastAPI backend & system prompts
│   │   ├── chat.py         # Chat endpoint (httpx pool, retries, rate limits)
│   │   ├── system_prompt.py# Single source of truth for Nabla AI facts
│   │   └── test_agent.py   # AI security and prompt injection test script
│   ├── src/                # React source code
│   │   ├── components/     # UI sections (Navbar, AboutMe, Skills, Projects, etc.)
│   │   ├── context/        # Language and Theme state providers
│   │   ├── data/           # Structured data (content.js, blog.js)
│   │   └── utils/          # Constants, regex patterns, and helpers
│   ├── e2e/                # Playwright end-to-end tests
│   ├── public/             # Static assets (CV PDF, profile images, robots.txt)
│   ├── start-backend.ps1   # Helper script to launch Python backend
│   ├── start-frontend.ps1  # Helper script to launch Vite dev server
│   ├── vercel.json         # Vercel security headers and rewrites
│   └── vite.config.js      # Vite build and proxy configuration
├── CLAUDE.md               # Developer and AI agent reference
└── README.md               # Root repository documentation
```

---

## 📬 Contact

- **Email:** [chackmilo@gmail.com](mailto:chackmilo@gmail.com)
- **LinkedIn:** [Daniel Pardo](https://www.linkedin.com/in/daniel-camilo-pardo-figueroa-656544153/)
- **GitHub:** [Chackmilo](https://github.com/Chackmilo)
- **WhatsApp:** [+57 310 323 5141](https://wa.me/573103235141)
