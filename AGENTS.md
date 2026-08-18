# Antigravity Brain Context — Daniel Pardo Figueroa (Chackmilo)

Este archivo proporciona contexto persistente sobre el usuario, su identidad técnica, sus proyectos desarrollados y su integración activa con GitHub.

---

## 👤 Perfil del Usuario & Identidad GitHub

- **Nombre**: Daniel Camilo Pardo Figueroa
- **GitHub**: [`@Chackmilo`](https://github.com/Chackmilo) *(Autenticado en el sistema mediante GitHub CLI `gh` con permisos `repo`, `gist`, `read:org`, `admin:public_key`)*
- **Correo**: `chackmilo@gmail.com`
- **LinkedIn**: [Daniel Camilo Pardo Figueroa](https://www.linkedin.com/in/daniel-camilo-pardo-figueroa-656544153/)
- **Rol Ejecutivo**: Director de Estrategia de Datos e IA | Lead Data Architect | Founder NablaOps | Ex-inDrive, RippleNami, MinTIC, DNP.
- **Experiencia**: Más de 14 años de trayectoria ejecutiva, técnica y de liderazgo en EE. UU., Europa y LATAM.
- **Especialidades**: Arquitectura de Datalakehouse (BigQuery + dbt + Airflow), Sistemas Multi-Agente en Producción (LangGraph 1.x, RAG, FastAPI), MLOps, Automatización Operativa y Plataformas Digitales.

---

## 🛠️ Acceso a GitHub en Tiempo Real (`gh` CLI)

El asistente dispone de acceso total a GitHub mediante la herramienta de comandos `gh`. Puede ejecutar:
- **Consultar repositorios**: `gh repo list Chackmilo --limit 50`
- **Ver detalles y README**: `gh repo view Chackmilo/<repo-name>`
- **Ver código y estructura de archivos**: `gh api repos/Chackmilo/<repo-name>/contents/<path>`
- **Gestionar issues y pull requests**: `gh issue list -R Chackmilo/<repo-name>`, `gh pr list -R Chackmilo/<repo-name>`
- **Clonar o descargar artefactos**: `gh repo clone Chackmilo/<repo-name>`

---

## 📂 Catálogo Maestro de Proyectos Desarrollados por Daniel (`Chackmilo`)

### 🤖 1. IA Agéntica, LLMOps & Automatización Inteligente
1. **`Chackmilo/Agente`** *(Privado)*
   - **Descripción**: Framework de agentes multi-tenant de nivel de producción construido sobre **LangGraph 1.x**, **FastAPI** y **PostgreSQL** (`asyncpg`/SQLAlchemy).
   - **Características**: Núcleo multi-inquilino desacoplado, ejecución asíncrona nativa, persistencia con checkpointer blindado contra vulnerabilidades, suite de tests exhaustiva (Playwright E2E + Vitest + Pytest), guards de regresión arquitectónica, integraciones multicanal (Telegram, WhatsApp, CRM Kommo).
   - **Stack**: Python 3.11+, LangGraph, FastAPI, PostgreSQL, Docker, TypeScript/React Dashboard.

2. **`Chackmilo/Fortuna_Agente` & `Chackmilo/Fortuna_Migration`** *(Privado)*
   - **Descripción**: Ecosistema de agentes de IA para **Fortuna Migration** (JECH Donoso Lawyers).
   - **Características**: Calificación automatizada de leads migratorios, extracción y estructuración de datos de prospectos, procesamiento de casos jurídicos y handoff a asesores humanos.
   - **Stack**: Python, LangGraph, FastAPI, Docker, RAG.

3. **`Chackmilo/intent-canvas-kit`** & **`Chackmilo/Nablapp`** *(Privados)*
   - **Descripción**: Herramientas y kits visuales para diseño de intenciones y flujos agénticos dentro del ecosistema NablaOps.
   - **Stack**: TypeScript, React, TailwindCSS.

4. **`Chackmilo/data-formulator`** *(Público, Fork)*
   - **Descripción**: Plataforma interactiva para creación y formulación de visualizaciones complejas asistidas por IA.
   - **Stack**: Python, TypeScript, React, SCSS.

---

### 🍽️ 2. Automatización Gastronómica & POS Inteligente
5. **`Chackmilo/blablabla`** *(Privado)*
   - **Descripción**: Plataforma tecnológica integral de automatización y gestión operativa para el restaurante **"BLA BLA BLA Cocina Mediterránea y Levante"**.
   - **Características**:
     - **PWA Meseros**: Captura rápida de comandas en tiempo real con selector de 11 mesas y combos.
     - **KDS Cocina**: Sistema de pantalla de cocina con WebSockets (`Socket.io`) y estados en vivo.
     - **Caja & Facturación**: Precálculo de cuenta, división de cuentas, propina voluntaria y sellado criptográfico **SHA-256 de Cierre Z (Ledger inmutable)**.
     - **IA & Forecast**: Pronóstico semanal de insumos mediante descomposición de recetas y modelo ARIMA en BigQuery ML.
     - **Design System**: *Light Bistro* (paleta Luz de Levante, targets táctiles $\ge 48\text{px}$).
   - **Stack**: Node.js, Express, Socket.io, React, Vite, TailwindCSS, Docker Compose, Nginx.

---

### 🌐 3. Portfolio Ejecutivo, CV Digital & Marca Personal
6. **`Chackmilo/DanielWPCV`** *(Público - Repositorio Actual)*
   - **Descripción**: Web app interactiva del CV ejecutivo de Daniel Pardo con chatbot de IA integrado (Nabla AI Chatbot).
   - **Características**: Single Page App con diseño *Obsidian Command*, arquitectura bilingüe (EN/ES), micro-animaciones con Framer Motion, backend serverless FastAPI para el chatbot y CI/CD con GitHub Actions.
   - **Stack**: React 19, Vite 7, TailwindCSS v4, Framer Motion, Python FastAPI, Playwright, Vitest.

---

### 📊 4. Data Science, Machine Learning & Valuación Predictiva
7. **`Chackmilo/GRA-valuation`** *(Privado)*
   - **Descripción**: Sistema avanzado de valuación catastral y predicción de valores de renta para la **Gambia Revenue Authority (GRA)**.
   - **Características**: Pipeline de ML con **Gradient Boosting Regressor optimizado** (R², RMSE, MAE, MAPE, SMAPE), análisis de más de 79.000 edificaciones, scoring de pobreza socioeconómica (Poverty Score & DAI), análisis geoespacial y mapas de calor.
   - **Stack**: Python, Scikit-Learn, Pandas, GeoPandas, Joblib, Docker.

8. **`Chackmilo/Planta_de_Energia`** *(Público)*
   - **Descripción**: Modelado predictivo de producción y rendimiento en plantas de generación energética con algoritmos de regresión y análisis exploratorio.
   - **Stack**: Python, Scikit-Learn, Pandas, Jupyter Notebooks.

9. **`Chackmilo/Transformer`** *(Público)*
   - **Descripción**: Implementaciones y notebooks de experimentación profunda con arquitecturas Transformer y modelos de atención.
   - **Stack**: Python, PyTorch / TensorFlow, Jupyter Notebooks.

10. **`Chackmilo/dashboard-nomina-oil-gas`** *(Público)*
    - **Descripción**: Dashboard analítico interactivo para gestión y visualización de nómina e indicadores de RRHH en el sector Oil & Gas.
    - **Stack**: Streamlit, Python, Plotly, Pandas.

---

### ☁️ 5. Infraestructura, DevOps & Business Intelligence
11. **`Chackmilo/vps-infra`** *(Privado)*
    - **Descripción**: Repositorio de automatización, orquestación y aprovisionamiento para el VPS de producción (Docker Compose, Nginx Reverse Proxy, gestión de certificados SSL, backups automatizados y scripts de deploy).
    - **Stack**: Bash, Python, Docker, Nginx.

12. **`Chackmilo/ConexGas`** *(Privado)*
    - **Descripción**: Portal y dashboard operativo en tiempo real para métricas de gas y telemetría de distribución.
    - **Stack**: Python, JavaScript, HTML/CSS.

13. **`Chackmilo/MyProyectSuperSet`** & **`Chackmilo/superset-docker`** *(Privado / Público)*
    - **Descripción**: Implementación en contenedores Docker y configuración de dashboards empresariales en **Apache Superset**.
    - **Stack**: Docker, Python, Apache Superset.

14. **`Chackmilo/urbagio-quote-wizard`** & **`Chackmilo/cartagena-beach-stays`** *(Privados)*
    - **Descripción**: Aplicaciones frontend para cotización automatizada (Urbagio) y portal de reservas turísticas en Cartagena.
    - **Stack**: TypeScript, React, TailwindCSS.

15. **`Chackmilo/palmar`**, **`Chackmilo/NablaSolutions`**, **`Chackmilo/MVP`** *(Privados)*
    - **Descripción**: Proyectos de desarrollo de software a la medida, MVP SaaS y componentes para clientes empresariales.
    - **Stack**: TypeScript, React, Python.

---

## 🎯 Directrices para Asistir a Daniel

1. **Reconocimiento Automático**: Reconoce sus repositorios, terminología interna (*NablaOps, Agente, blablabla, GRA-valuation, Fortuna, ConexGas, RippleNami*).
2. **Uso Proactivo de `gh`**: Cuando Daniel pida inspeccionar código, comparar implementaciones, revisar commits o crear issues/PRs, utiliza `gh` directamente.
3. **Calidad de Producción**: Aplica los mismos estándares que Daniel exige en sus proyectos: tipado estricto, pruebas automatizadas (Playwright/Pytest/Vitest), seguridad de dependencias, diseño pulido e invariantes inmutables.
