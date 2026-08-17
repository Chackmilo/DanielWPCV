# Daniel Pardo — React Portfolio & AI Backend

**Live Site:** [danielwpcv.vercel.app](https://danielwpcv.vercel.app)

The core codebase for Daniel Pardo's professional executive portfolio, featuring a modern React frontend and a Python serverless AI assistant backend.

---

## 🌟 Tech Stack

- **Frontend:** React 19, Vite 7, Tailwind CSS v4, Framer Motion
- **AI Backend:** Python 3.12 / FastAPI (Serverless Functions on Vercel) with DeepSeek LLM (`deepseek-chat`)
- **State & Routing:** React Context (Theme & Bilingual Language), `react-router-dom` v7, `react-helmet-async`
- **Testing:** Vitest (Unit testing with Testing Library), Playwright (E2E browser automation)
- **CI/CD & Hosting:** GitHub Actions CI, Vercel Serverless Hosting

---

## ⚡ Recent Implementations & Upgrades
 
1. **Nabla AI 2.0 Streaming & Quick Chips:**
   - Real-time Server-Sent Events (SSE) streaming from `/api/chat` to `ChatInterface.jsx` with progressive token rendering.
   - Bilingual `QuickChips.jsx` suggestions for immediate 1-click recruiter interaction.
2. **Executive Thought Leadership Blog:**
   - 2 published full-length articles (*From Government PMO to Leading Global AI Strategies* & *My Story with Artificial Intelligence*).
   - Rich structured Markdown rendering with support for numbered points, bullets, bold, and italic highlights.
   - Reading progress bar and full SEO/JSON-LD schemas for articles and breadcrumbs.
3. **Conversion & User Experience:**
   - Direct PDF Download CV action and 1:1 Strategy Call scheduling CTA in `AboutMe.jsx`.
   - Animated clipboard copy feedback via `Toast.jsx`.
   - Bilingual language preference persistence via `localStorage` with automatic browser language fallback.
4. **Performance & Asset Optimization:**
   - Image optimization using WebP (`profile.webp` at 35 KB, saving ~1.18 MB over raw JPG).
   - Clean manual chunking in `vite.config.js` and elimination of redundant scroll observers.
   - Singleton HTTP client connection pooling in `api/chat.py`.
5. **SEO, a11y & Web Standards:**
   - Normalized semantic heading hierarchy (`h1` -> `h2` -> `h3`).
   - Automated post-build sitemap generation indexing 3 dynamic URLs (`/`, `/blog/from-pmo-to-ai-leadership`, `/blog/my-path-to-ai`).
6. **Quality & CI/CD:**
   - 19 Unit tests in Vitest and 8 Playwright E2E tests integrated into `.github/workflows/ci.yml`.

---

## 🚀 Local Development

### 1. Environment Setup

Create `portfolio/.env.local`:

```env
DEEPSEEK_API_KEY=sk-your-deepseek-api-key
```

### 2. Start Servers

**Terminal 1 — Backend (FastAPI):**
```powershell
.\start-backend.ps1
```

**Terminal 2 — Frontend (Vite):**
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## 🧪 Testing

```bash
npm run lint          # Run ESLint validation
npm test              # Run Vitest unit tests (19/19 passing)
npm run build         # Build production assets + generate sitemap.xml
npm run test:e2e      # Run Playwright E2E tests (8/8 passing)
npm run test:e2e:live # Run live smoke test against active backend
```

---

## 🔒 Security & Hardening

- **Rate Limiting:** `slowapi` restricts chatbot requests to 15 req/min per IP.
- **Payload Validation:** Pydantic models enforce strict length boundaries (`min_length=1, max_length=1000`) and message history caps.
- **Security Headers:** Strict CSP, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `no-store` caching on API routes configured in `vercel.json`.
- **Error Sanitization:** 5xx errors return sanitized client messages, avoiding any credential or upstream leakage.
