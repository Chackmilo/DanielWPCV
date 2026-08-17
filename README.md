# Daniel Pardo - Professional Portfolio

**Live:** [danielwpcv.vercel.app](https://danielwpcv.vercel.app)

## Overview

A modern, responsive single-page portfolio showcasing professional experience, skills, projects, and certifications in Data Strategy, Business Intelligence, and Generative AI.

Built with **React 19 + Vite** (frontend) and **Python / FastAPI** (serverless AI backend), deployed on **Vercel**.

> All active code lives in the `portfolio/` directory.

## Quick Start (Local Development)

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

### 3. Backend (Python / FastAPI)

```bash
cd portfolio/api
python -m venv venv
# Windows: .\venv\Scripts\Activate.ps1
# Unix/macOS: source venv/bin/activate
pip install -r requirements.txt
```

Start the backend:

```powershell
# From portfolio/
.\start-backend.ps1
```

Or manually: `python -m uvicorn api.chat:app --port 8000`

### 4. Frontend (React + Vite)

In a second terminal:

```bash
cd portfolio
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Vite proxies `/api` requests to the Python server on port 8000.

## Features

- **React 19 + Vite** with TailwindCSS v4 and Framer Motion animations
- **AI Chatbot (Nabla):** FastAPI serverless function powered by DeepSeek LLM
- **Bilingual:** English/Spanish toggle via React Context
- **Dark Mode:** System-aware with manual toggle
- **Content-driven:** Structured data files (`content.js`, `blog.js`) for easy updates
- **Blog:** Expandable articles with dedicated URL routing and meta tags
- **Security hardened:** Rate limiting, CSP headers, input validation, sanitized responses
- **WCAG 2.1 AA accessible:** `focus-visible` outlines, ARIA labels, contrast compliance
- **Optimized images:** WebP with `<picture>` fallback
- **SEO:** Open Graph, Twitter Cards, JSON-LD Person schema, sitemap

## Testing

```bash
# from portfolio/
npm test               # Unit tests (Vitest)
npm run test:e2e       # End-to-end tests (Playwright, mocked chatbot API)
npm run test:e2e:live  # Opt-in live smoke test (needs the backend + DEEPSEEK_API_KEY)
```

The first e2e run downloads the browser: `npx playwright install chromium`.

## Production Deployment (Vercel)

The project is deployed on Vercel with the following configuration:

| Setting | Value |
|---|---|
| **Framework** | Vite |
| **Root Directory** | `portfolio` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Serverless Functions** | `api/chat.py` (Python 3.12) |

Environment variables configured in Vercel:

- `DEEPSEEK_API_KEY` — DeepSeek API key for the chatbot
- `ALLOWED_ORIGIN` — `https://danielwpcv.vercel.app` (CORS whitelist)

Every push to `main` triggers an automatic production deployment.

## Project Structure

```
DanielWPCV/
├── portfolio/              # Main project folder (React/Vite app + API)
│   ├── src/                # Components, context, data, hooks, utils, unit tests
│   ├── e2e/                # Playwright end-to-end tests
│   ├── public/             # Static assets (images, robots.txt)
│   ├── api/                # Python backend (FastAPI serverless functions)
│   ├── vercel.json         # Vercel rewrites, headers, and security config
│   ├── package.json        # Dependencies and scripts
│   └── README.md           # Detailed app documentation
│
├── assets/                 # CV PDF and source images
├── CLAUDE.md               # Guidance for Claude Code
└── README.md               # This file
```

## Contact

- Email: chackmilo@gmail.com
- LinkedIn: [Daniel Pardo](https://www.linkedin.com/in/daniel-camilo-pardo-figueroa-656544153/)
- GitHub: [Chackmilo](https://github.com/Chackmilo)
