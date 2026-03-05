# Daniel Pardo - Professional Portfolio

## 🌐 Overview
A modern, responsive single-page portfolio website showcasing professional experience, skills, projects, and certifications in the field of Data Strategy, Business Intelligence, and Generative AI.

**⚠️ IMPORTANT NOTE:** The project has been migrated from vanilla HTML/CSS to a modern **React + Vite** architecture with a **Python (FastAPI) Backend** for AI features.

**All active development and the current version of the portfolio are located in the `portfolio/` directory.**

## 🛠️ Inicialización del Proyecto

Sigue estos pasos para configurar el proyecto por primera vez en tu entorno local:

1.  **Clonar el repositorio:**
    ```bash
    git clone <url-del-repositorio>
    cd DanielWPCV
    ```
2.  **Configurar Variables de Entorno:**
    - Crea un archivo `.env.local` dentro de la carpeta `portfolio/`.
    - Agrega tu clave: `DEEPSEEK_API_KEY=tu_clave_aqui`.
3.  **Instalar Dependencias (Frontend):**
    ```bash
    cd portfolio
    npm install
    ```
4.  **Instalar Dependencias (Backend):**
    - Se recomienda usar un entorno virtual:
    ```bash
    cd api
    python -m venv venv
    # Activa en Windows: .\venv\Scripts\Activate.ps1
    # Activa en Unix/macOS: source venv/bin/activate
    pip install -r requirements.txt
    ```

## 🚀 Inicio Rápido (Desarrollo Local)

The application uses a Dual-Server Architecture for the AI Chatbot. 

1. **Environment Setup:** Add `.env.local` to the `portfolio/` folder with `DEEPSEEK_API_KEY=sk-...`
2. **Start Backend:** Run `./start-backend.ps1` from the `portfolio/` directory. This script handles port 8000 cleanup and uses the correct Python interpreter.
3. **Start Frontend:** In a new terminal, run `npm run dev` in the `portfolio/` directory.
4. **Access:** Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🎯 Features
- ✅ **Built with React + Vite** and TailwindCSS for styling.
- ✅ **Serverless AI Backend**: Python/FastAPI integration responding dynamically using the DeepSeek LLM.
- ✅ **Bilingual support** (English/Spanish toggled via Context API).
- ✅ **Dynamic Content Strategy**: Driven by structured data files for easy updates (`content.js`, `blog.js`).
- ✅ **Professional sections**: About, Skills, Projects (STAR format), Education, Recommendations, Certifications.
- ✅ **Blog Section**: Expandable storytelling articles with dedicated URL routing.
- ✅ **Visual Polish**: Framer Motion scroll reveals and global Dark Mode.
- ✅ **Security Hardened**: Rate limiting, strict CSP headers, input validation, and sanitized API responses.
- ✅ **WCAG 2.1 AA accessibility**: Complete `focus-visible` outlines, ARIA labels, and contrast improvements.
- ✅ **Optimized WebP images** with `<picture>` fallback for performance.
- ✅ **Rich SEO & Identity**: Fully integrated Open Graph tags, Twitter Cards, and `Person` JSON-LD Schema.

## 📁 Project Structure

```
E:\Backup\DanielWPCV\
│
├── portfolio/              # ⬅️ MAIN PROJECT FOLDER (React/Vite app)
│   ├── src/                # React source code (components, context, data, hooks, utils)
│   ├── public/             # Static assets like CV and images
│   ├── api/                # Python backend for the AI Chatbot
│   ├── package.json        # Dependencies
│   └── README.md           # React app documentation
│
├── src/                    # Legacy vanilla HTML/CSS/JS (Deprecated)
├── assets/                 # Shared static assets
├── .agents/                # Agent configuration files
└── README.md               # This file
```

## 📞 Contact
- 📧 Email: chackmilo@gmail.com
- 💼 LinkedIn: [Daniel Pardo](https://www.linkedin.com/in/daniel-camilo-pardo-figueroa-656544153/)
