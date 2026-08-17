# CLAUDE.md

This file provides guidance to Claude Code and other AI assistants working in this repository.

## Working Directory

All active application code lives in `portfolio/`. Run all commands below from `portfolio/`, not the root directory.

## Commands

```bash
# from portfolio/
.\start-frontend.ps1 # Recommended: runs Vite dev server on :5173 with port cleanup
.\start-backend.ps1  # Recommended: runs Python FastAPI chatbot on :8000
npm run build        # vite build → dist/, then runs generate-sitemap.js
npm run lint         # eslint (0 errors/warnings)
npm test             # vitest run (19 unit tests passing)
npm run test:e2e     # playwright e2e (8/8 tests passing, mocked /api/chat)
npm run test:e2e:live# opt-in live smoke test against live backend
npm run preview      # serve the production build locally
```

Run a single JS unit test: `npx vitest run src/context/ThemeContext.test.jsx`.

## Architecture & Code Conventions

Single-page React 19 portfolio (Vite 7, TailwindCSS v4, Framer Motion) with a Python FastAPI serverless backend deployed on Vercel.

**Design System ("Obsidian Command"):**
- Display font: `@fontsource/outfit` (600, 700, 800) imported in `main.jsx`.
- Palette: Deep Obsidian (`#0B0F17`), Electric Emerald (`#10B981`), Cobalt Indigo (`#6366F1`), Amber (`#F59E0B`).
- Utility classes: `.glass-card` defined in `src/App.css`.

**Provider Hierarchy (`main.jsx` & `App.jsx`):**
`HelmetProvider` → `BrowserRouter` → `ErrorBoundary` → `ThemeProvider` → `LanguageProvider`.
Routes: `/` (Home), `/blog/:id` (BlogPost), `*` (NotFound 404). Sticky `Navbar` and `Footer` live outside `<Routes>`.

**Semantic SEO & Headings:**
- Each page must have strictly **one `<h1>` element** (Hero on Home, Post title on BlogPost).
- The Navbar brand logo uses a `<span>` element to preserve the heading hierarchy.
- Route-specific canonical links are managed dynamically via `<Helmet>` in `Home`, `BlogPost`, and `NotFound`.

**Bilingual Data Structure:**
All user-facing content is structured in `{ en, es }` dictionaries in `src/data/content.js` and `src/data/blog.js`.
Components retrieve text via `const { t } = useLanguage()` -> `t(obj.en, obj.es)`. Do not hardcode strings inside component JSX.

**Performance Pattern:**
Below-the-fold sections (`Projects`, `Education`, `Recommendations`, `Blog`, `Certifications`) are loaded lazily via `React.lazy` and wrapped in their own `<ErrorBoundary>` with `<Suspense>` fallbacks.

**Nabla Chatbot Architecture:**
- Frontend: `src/components/ChatInterface.jsx` with interactive prompt chips and auto-scrolling message stream.
- Backend: `api/chat.py` with singleton `httpx.AsyncClient` pool, 1 automatic retry on 502/503/504 errors, `slowapi` rate limiting (10 req/min/IP with `X-Forwarded-For` support), and sanitized JSON errors.
- Persona & Bio: `api/system_prompt.py` is the single source of truth for Daniel's career facts, CV location (`/CV_Daniel_Pardo.pdf`), and metrics.

## Continuous Integration & Quality Checks

GitHub Actions workflow at `.github/workflows/ci.yml` executes `npm run lint`, `npm test`, and `npm run test:e2e` automatically on pull requests and pushes to `main`.
