# Daniel Pardo - React Portfolio

This is the main codebase for Daniel Pardo's professional portfolio, built with a modern React stack. It showcases experience in Data Strategy, Business Intelligence, and AI consulting (NablaOps).

## 🚀 Tech Stack
- **Frontend Framework:** React + Vite
- **AI Backend / Proxy:** Python (FastAPI/Uvicorn) - Serves the DeepSeek API integration.
- **Styling:** TailwindCSS (v4) with native Dark Mode via React Context. Includes full `focus-visible` Web Accessibility features.
- **Routing & SEO:** `react-router-dom`, `react-helmet-async`, Framer Motion. Rich Schema.org (JSON-LD) implemented.
- **Data:** Structured JS objects (`src/data/content.js`, `src/data/blog.js`).
- **Icons:** Custom SVG icons (`Icons.jsx`).

## 📂 Key Architecture
- `/api/`: Contains the standalone backend logic (`chat.py`) powering the Nabla Agent chatbot using DeepSeek API. Supports Serverless deployment (Vercel) or Standalone (Render/Railway).
- `/src/components/`: Section components (Navbar, AboutMe, Skills, Projects, Education, Recommendations, Blog, Certifications, Footer) and shared UI. Includes animated components using Framer Motion.
- `/src/context/`: Contains `LanguageContext.jsx` for the En/Es toggle and `ThemeContext.jsx` for Light/Dark mode.
- `/src/data/`: Content files. Edit `content.js` to update text, projects, and skills. Edit `blog.js` to add new stories.
- `/src/hooks/`: Custom hooks for viewport monitoring.
- `/src/utils/`: Constants, regex patterns and thresholds.

## 🌟 First-time Initialization / Inicialización

If you are starting from zero / Si empiezas desde cero:

### 🇬🇧 English
1. **Install Node.js dependencies:** Run `npm install` in this folder.
2. **Setup Python environment:**
   - Create a venv: `python -m venv .venv`
   - Activate it: `.\.venv\Scripts\Activate.ps1` (Windows)
   - Install requirements: `pip install -r api/requirements.txt`
3. **Environment Variables:** Create `.env.local` and add `DEEPSEEK_API_KEY=sk-...`

### 🇪🇸 Español
1. **Instalar Node.js:** Ejecuta `npm install` en esta carpeta.
2. **Configurar Python:**
   - Crear venv: `python -m venv .venv`
   - Activar: `.\.venv\Scripts\Activate.ps1` (Windows)
   - Instalar paquetes: `pip install -r api/requirements.txt`
3. **Variables de Entorno:** Crea `.env.local` y añade tu `DEEPSEEK_API_KEY`.

## 🛠️ Local Development (Dual-Server Architecture)

The project relies on two synchronized local servers to enable the AI Chatbot and the Frontend UI.

### 1. Environment Setup
Make sure you have a `.env.local` file in the root `portfolio/` directory:
```env
DEEPSEEK_API_KEY=sk-your-secret-key-here
ALLOWED_ORIGIN=https://your-domain.vercel.app  # Optional: defaults to localhost:5173
```

### 2. Run the AI Backend (Python)
Use the automated PowerShell script for a clean start (automatically cleans up port 8000 and uses the correct interpreter):
```powershell
# From the portfolio folder
.\start-backend.ps1
```

*Manual alternative:*
1. `pip install -r api/requirements.txt`
2. `python -m uvicorn api.chat:app --port 8000`

### 3. Run the Frontend (React + Vite)
Open a **second terminal** window, navigate to `portfolio/` and start Vite:
```bash
npm install
npm run dev
```

*(Vite is configured in `vite.config.js` to automatically proxy all requests from `/api` to the Python server on port 8000).*

## 🔒 Security & Production Readiness

The project has been hardened for deployment:
- **Rate Limiting:** Python backend uses `slowapi` (10 requests/min per IP) on the chatbot endpoint.
- **Input Validation:** Pydantic enforcement on chat message length and history depth.
- **Error Sanitization:** Generic 500/502/504 error responses to prevent internal data exposure.
- **Strict Headers:** `vercel.json` includes **Content-Security-Policy (CSP)** blocking direct API connections from the browser, `X-Frame-Options: DENY`, and `X-Content-Type-Options: nosniff`.
- **CORS Management:** Middleware restricted to authorized origins via `ALLOWED_ORIGIN`.
- **Code Quality:** 100% clean ESLint report and verified production build.
- **AI Security Testing:** Automated usefulness and prompt injection tests (`api/test_agent.py`) ensure the agent does not output PII or answer off-topic queries.

## 🤝 Features & Sections
- **About Me:** Highlights executive experience, tech stack, and location.
- **Skills:** Grid layout showing Data Strategy, BI, and GenAI domains.
- **Projects:** STAR method descriptions with metrics and tech tags.
- **Blog:** Markdown-supported articles with dedicated URLs and Meta tags.
- **Chatbot (NablaOps):** Interactive AI mock powered by DeepSeek giving recruiters real-time answers based strictly on the portfolio's context.
