# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working directory

All active code lives in `portfolio/`. The repo root only holds `assets/`, `README.md`, and tooling configs. **Run every command below from `portfolio/`, not the repo root.** (The root `README.md` mentions a deprecated `src/` at the repo root — it no longer exists; the real source tree is `portfolio/src/`.)

## Commands

```bash
# from portfolio/
npm run dev          # Vite dev server on :5173 (proxies /api → :8000)
npm run build        # vite build → dist/, then runs generate-sitemap.js
npm run lint         # eslint
npm test             # vitest run (JS unit tests)
npm run preview      # serve the production build locally
```

Run a single JS test: `npx vitest run src/context/ThemeContext.test.jsx` or filter by name with `npx vitest run -t "<name>"`. Current vitest files: `src/context/ThemeContext.test.jsx` and `src/utils/constants.test.js`.

### Backend (Python / FastAPI chatbot)

The Nabla chatbot needs a second server running locally. Start it from `portfolio/`:

```powershell
.\start-backend.ps1   # kills anything on :8000, then runs uvicorn api.chat:app --port 8000
```

`start-backend.ps1` hardcodes a Python 3.14 interpreter path. Production (Vercel) pins Python 3.12 and `fastapi<0.115` (see `api/requirements.txt`) — keep that ceiling in mind when changing backend deps.

`api/test_agent.py` is **not** a pytest test — it's a standalone script (`python api/test_agent.py`) that hits the live DeepSeek API to manually check prompt-injection / off-topic resistance. It needs `DEEPSEEK_API_KEY` in `.env.local`.

## Architecture

Single-page React 19 portfolio (Vite 7, Tailwind v4, Framer Motion) with a Python serverless backend for the AI chatbot. Deployed on Vercel; every push to `main` auto-deploys.

**Provider chain (Vite root):** `main.jsx` wraps `App` in `HelmetProvider → BrowserRouter`; `App.jsx` then wraps in `ErrorBoundary → ThemeProvider → LanguageProvider`. Two routes only: `/` (Home, all sections) and `/blog/:id` (BlogPost). Navbar and Footer sit outside `<Routes>`.

**Performance pattern:** below-the-fold sections (Projects, Education, Recommendations, Blog, Certifications) are `React.lazy` + `Suspense`, each individually wrapped in `ErrorBoundary` so one section crashing doesn't take down the page. AboutMe and Skills load eagerly.

**Bilingual content (the core data pattern):** all user-facing text is `{ en, es }` objects in `src/data/content.js` and `src/data/blog.js`. `LanguageContext` exposes `t(en, es)` which returns the right string for the current `lang`. **To change wording, edit the data files — not the components.** Components read `content.*` and call `t()`.

**Theme:** `ThemeContext` handles light/dark; Tailwind dark-mode classes throughout.

**The Nabla chatbot UI is embedded inside `src/components/Recommendations.jsx`** (not a standalone component). It POSTs the last 10 messages to `/api/chat`.

**Backend (`api/chat.py`):** FastAPI `POST /api/chat` → DeepSeek (`deepseek-chat`) via async `httpx`. The recruiter-facing persona and all of Daniel's profile facts live in the `SYSTEM_PROMPT` string in `api/system_prompt.py`. Hardening: `slowapi` rate limit (10/min/IP), Pydantic validation (message ≤1000 chars, ≤20 messages), CORS locked to `ALLOWED_ORIGIN`, and sanitized 5xx errors that never leak upstream details. Swagger/ReDoc are disabled.

> Note: `SYSTEM_PROMPT` lives in a single shared module `api/system_prompt.py`, imported by both `api/chat.py` (production) and `api/test_agent.py`. Edit the profile there — there is no longer a duplicated copy to keep in sync.

**Misc conventions:**
- STAR-method project descriptions are split/styled via the shared regexes in `src/utils/constants.js` (`STAR_SPLIT_RE`, `STAR_TEST_RE`) — bilingual (English + Spanish labels).
- `generate-sitemap.js` runs post-build, scraping blog IDs out of `blog.js` by regex. Its `DOMAIN` constant (`https://danielwpcv.vercel.app`) is hardcoded; it now matches the live Vercel domain and the SEO/OG/canonical URLs across the source — keep all of them in sync if the domain ever changes.
- ESLint allows unused vars matching `^[A-Z_]` or named `motion` (Framer Motion import convention).

## Environment / secrets

`portfolio/.env.local` needs `DEEPSEEK_API_KEY`. On Vercel, set both `DEEPSEEK_API_KEY` and `ALLOWED_ORIGIN`. Vercel config (rewrites, CSP and security headers, `no-store` on `/api`) is in `portfolio/vercel.json`.
