export const content = {
    nav: {
        about: { en: "About", es: "Sobre Mí" },
        skills: { en: "Skills", es: "Habilidades" },
        timeline: { en: "Trajectory", es: "Trayectoria" },
        projects: { en: "Projects", es: "Proyectos" },
        education: { en: "Education", es: "Educación" },
        recommendations: { en: "Recommendations", es: "Recomendaciones" },
        certifications: { en: "Certifications", es: "Certificaciones" },
        blog: { en: "Blog", es: "Blog" },
    },

    about: {
        title: { en: "About Me", es: "Sobre Mí" },
        headline: "Daniel Camilo Pardo Figueroa",
        subtitle: {
            en: "Director of Data Strategy & AI | Senior Data Engineer | Digital Products & MLOps",
            es: "Director de Estrategia de Datos e IA | Senior Data Engineer | Productos Digitales & MLOps",
        },
        statusBadge: {
            en: "Available for Strategic Roles",
            es: "Disponible para Roles Estratégicos",
        },
        whoIAm: {
            title: { en: "Executive Profile & Value Proposition", es: "Perfil Ejecutivo y Propuesta de Valor" },
            text: {
                en: "Industrial and Chemical Engineer with over 14 years of executive experience bridging enterprise data architecture, machine learning engineering, and product strategy across the US, Europe, and LATAM. I specialize in designing modern BigQuery & dbt datalakehouses, deploying production Agentic AI (LangGraph/RAG), and leading high-velocity cross-functional engineering teams to drive multi-million dollar P&L growth, operational efficiency, and scalable data-driven automation.",
                es: "Ingeniero Industrial y Químico con más de 14 años de experiencia ejecutiva articulando arquitectura de datos empresarial, ingeniería de machine learning y estrategia de producto en EE. UU., Europa y LATAM. Especialista en diseño de datalakehouses modernos en BigQuery & dbt, despliegue de IA Agéntica en producción (LangGraph/RAG) y liderazgo de equipos de ingeniería de alto rendimiento para maximizar impacto en P&L, eficiencia operativa y automatización escalable.",
            },
        },
        executiveCards: [
            {
                icon: "database",
                title: { en: "Enterprise Data Strategy & Lakehouse", es: "Estrategia de Datos y Lakehouse" },
                text: {
                    en: "Architecting modern data stacks (BigQuery, dbt, Airflow, Great Expectations) scaling daily ingestion from 50M to 500M+ records with 99.9% data quality SLAs and ~40% KPI latency reduction.",
                    es: "Arquitectura de stacks modernos de datos (BigQuery, dbt, Airflow, Great Expectations) escalando ingestas de 50M a 500M+ registros diarios con 99.9% de calidad y ~40% de reducción en latencia de KPIs.",
                },
                accent: "emerald",
            },
            {
                icon: "cpu",
                title: { en: "Production Agentic AI & MLOps", es: "IA Agéntica en Producción y MLOps" },
                text: {
                    en: "Building multi-channel RAG & LangGraph AI agents, automated workflow orchestration with n8n/Docker, dynamic pricing ML models, and containerized LLM services driving 100% customer support automation.",
                    es: "Construcción de agentes IA multicanal con RAG y LangGraph, orquestación de flujos con n8n/Docker, modelos ML de pricing dinámico y servicios LLM logrando 100% de automatización en soporte al cliente.",
                },
                accent: "indigo",
            },
            {
                icon: "trending-up",
                title: { en: "Growth, Product & Engineering Leadership", es: "Growth, Producto y Liderazgo de Equipos" },
                text: {
                    en: "Delivering 1.5x LATAM GMV growth, +30% courier/delivery operational efficiency, directing 50+ B2B software and analytics client solutions, and mentoring top-tier cross-functional engineering talent.",
                    es: "Logro de 1.5x crecimiento en GMV en LATAM, +30% en eficiencia operativa de delivery, dirección de 50+ soluciones de analítica y software B2B, y mentoría de talento técnico de alto nivel.",
                },
                accent: "cyan",
            },
        ],
        metrics: [
            {
                value: "~40%",
                label: { en: "KPI Latency Reduction", es: "Reducción Latencia KPIs" },
                detail: { en: "BigQuery + dbt Lakehouse (RippleNami)", es: "Lakehouse BigQuery + dbt (RippleNami)" },
                glow: "emerald",
            },
            {
                value: "1.5x",
                label: { en: "LATAM GMV Growth", es: "Crecimiento GMV LATAM" },
                detail: { en: "Pricing ML & Analytics (inDrive)", es: "Pricing ML & Analítica (inDrive)" },
                glow: "cyan",
            },
            {
                value: "500M+",
                label: { en: "Daily Ingestion Scaling", es: "Escalabilidad Diaria" },
                detail: { en: "Scaled from 50M/day with 0 degradation", es: "Escalado desde 50M/día sin degradación" },
                glow: "indigo",
            },
            {
                value: "99.9%",
                label: { en: "Data Quality Precision", es: "Precisión Calidad de Datos" },
                detail: { en: "5M+ records daily via Great Expectations", es: "5M+ registros diarios con Great Expectations" },
                glow: "amber",
            },
            {
                value: "30x",
                label: { en: "SQL Query Speedup", es: "Optimización Consultas SQL" },
                detail: { en: "15 min → 30 sec execution avg", es: "Promedio de 15 min → 30 seg" },
                glow: "emerald",
            },
            {
                value: "100%",
                label: { en: "AI Support Automation", es: "Automatización Soporte IA" },
                detail: { en: "LangGraph/RAG Multi-Agent (NablaOps)", es: "Multi-Agentes LangGraph/RAG (NablaOps)" },
                glow: "indigo",
            },
        ],
        openTo: {
            title: { en: "Target Roles & Engagement", es: "Roles Objetivo & Modalidad" },
            text: {
                en: "Director / Head of Data · AI Strategy & Engineering · Lead Data Architect · Digital Product Leadership · Senior Consulting Advisor",
                es: "Director / Head of Data · Estrategia de IA & Ingeniería · Lead Data Architect · Liderazgo de Producto Digital · Asesor Senior de Consultoría",
            },
        },
        contact: {
            location: "Bogotá, Colombia (Open to Global Remote / Relocation)",
            email: "chackmilo@gmail.com",
            phone: "+57 3103235141",
            linkedin: "https://www.linkedin.com/in/daniel-camilo-pardo-figueroa-656544153/",
            github: "https://github.com/Chackmilo",
            whatsapp: "https://wa.me/573103235141",
            cv: "/CV_Daniel_Pardo.pdf",
        },
    },

    timeline: [
        {
            id: "ripplenami",
            period: "2025 - Present",
            role: { en: "Director of Strategy & BI / Lakehouse Architect", es: "Director de Estrategia & BI / Arquitecto Lakehouse" },
            company: "RippleNami",
            location: "USA / Global Remote",
            isCurrent: true,
            achievements: [
                {
                    en: "Architected scalable enterprise datalakehouse on BigQuery + dbt, expanding ingestion from 50M to 500M+ records/day with zero performance degradation.",
                    es: "Diseñó datalakehouse corporativo en BigQuery + dbt, escalando la ingesta de 50M a más de 500M+ registros diarios sin degradación de rendimiento.",
                },
                {
                    en: "Cut KPI delivery latency by ~40% and optimized 50+ mission-critical queries by 30x (from 15 min down to 30 sec average).",
                    es: "Redujo la latencia de entrega de KPIs en ~40% y optimizó 50+ consultas críticas 30x (de 15 min a 30 seg promedio).",
                },
                {
                    en: "Implemented Great Expectations data quality framework maintaining 99.9% precision over 5M+ daily records and 95%+ ML predictive accuracy.",
                    es: "Implementó framework de calidad con Great Expectations logrando 99.9% de precisión sobre 5M+ registros diarios y 95%+ de precisión predictiva ML.",
                },
            ],
            tech: ["BigQuery", "dbt", "Airflow", "Python", "SQL", "Looker", "Great Expectations", "Data Governance"],
        },
        {
            id: "nablaops",
            period: "2024 - Present",
            role: { en: "Founder & Consulting Lead", es: "Fundador & Líder de Consultoría" },
            company: "NablaOps",
            location: "Bogotá / Remote",
            isCurrent: true,
            achievements: [
                {
                    en: "Engineered and deployed multi-channel autonomous AI agents using Python, LangChain, LangGraph, RAG, and n8n containerized on Docker.",
                    es: "Construyó y desplegó agentes autónomos de IA multicanal usando Python, LangChain, LangGraph, RAG y n8n containerizados en Docker.",
                },
                {
                    en: "Achieved 100% automated customer service and lead qualification for high-growth ventures (Monomiel, Fortuna Migration, Urbagio).",
                    es: "Logró 100% de automatización en atención al cliente y calificación de leads para empresas en crecimiento (Monomiel, Fortuna Migration, Urbagio).",
                },
                {
                    en: "Designed real-time executive ROI tracking dashboards and agile marketing automation ecosystems driving direct client revenue growth.",
                    es: "Diseñó tableros de control de ROI y ecosistemas ágiles de automatización de marketing impulsando crecimiento de ingresos.",
                },
            ],
            tech: ["Python", "LangChain", "LangGraph", "RAG", "n8n", "Docker", "FastAPI", "PostgreSQL"],
        },
        {
            id: "indrive",
            period: "2022 - 2024",
            role: { en: "Operations & Business Strategy Lead (Senior Product & Growth Manager)", es: "Líder de Operaciones & Estrategia (Senior Product & Growth Manager)" },
            company: "inDrive LATAM Delivery",
            location: "LATAM / Regional",
            isCurrent: false,
            achievements: [
                {
                    en: "Spearheaded growth, operations, and analytics across LATAM markets, delivering 1.5x GMV growth through data-driven strategies.",
                    es: "Lideró operaciones de growth y analítica en mercados LATAM, logrando 1.5x de crecimiento en GMV mediante estrategias de datos.",
                },
                {
                    en: "Deployed dynamic pricing ML algorithms and customer support GPT agents, driving +30% operational efficiency for delivery and +20% for couriers.",
                    es: "Desplegó algoritmos de pricing dinámico ML y agentes GPT, logrando +30% en eficiencia operativa para delivery y +20% para couriers.",
                },
                {
                    en: "Boosted customer retention by +20% via targeted lifecycle campaigns and automated executive reporting across regional leadership.",
                    es: "Incrementó la retención de clientes en +20% mediante campañas de ciclo de vida y reportería ejecutiva C-level automatizada.",
                },
            ],
            tech: ["Power BI", "SQL", "Python", "Google BigQuery", "Looker Studio", "Machine Learning", "Pricing Models"],
        },
        {
            id: "twinlu",
            period: "2020 - 2022",
            role: { en: "Co-Founder & Head of Operations", es: "Co-Fundador & Director de Operaciones" },
            company: "twinlu",
            location: "Colombia / Spain",
            isCurrent: false,
            achievements: [
                {
                    en: "Directed 50+ bespoke software development, digital transformation, and analytics projects for regional B2B enterprise clients.",
                    es: "Dirigió más de 50 proyectos de desarrollo de software, transformación digital y analítica para clientes B2B regionales.",
                },
                {
                    en: "Maintained a 100% on-time delivery rate under agile frameworks, generating 3x average revenue growth for top clients.",
                    es: "Mantuvo una tasa de entrega a tiempo del 100% bajo metodologías ágiles, generando 3x de crecimiento promedio en ingresos de clientes.",
                },
                {
                    en: "Architected centralized business intelligence pipelines and custom operational portals.",
                    es: "Diseñó pipelines centralizados de inteligencia de negocios y portales operativos a medida.",
                },
            ],
            tech: ["React", "Node.js", "Python", "PostgreSQL", "Power BI", "Scrum", "Jira"],
        },
        {
            id: "mintic",
            period: "2019 - 2021",
            role: { en: "Digital Transformation & Analytics Advisor / Project Lead", es: "Asesor de Transformación Digital & Analítica / Líder de Proyecto" },
            company: "MinTIC (Ministerio de Tecnologías de la Información y las Comunicaciones)",
            location: "Bogotá, Colombia",
            isCurrent: false,
            achievements: [
                {
                    en: "Advised national public programs on digital transformation, technology adoption, and data-driven citizen service ecosystems.",
                    es: "Asesoró programas públicos nacionales en transformación digital, adopción tecnológica y servicios ciudadanos basados en datos.",
                },
                {
                    en: "Led cross-functional agile teams and established performance monitoring frameworks for nationwide technology investment initiatives.",
                    es: "Lideró equipos ágiles multidisciplinarios y estructuró marcos de monitoreo para iniciativas nacionales de inversión en TI.",
                },
            ],
            tech: ["Data Governance", "SQL", "Power BI", "Agile Management", "Public Sector Analytics"],
        },
        {
            id: "dnp",
            period: "2014 - 2018",
            role: { en: "Strategic Planning & Data Analyst / Senior Advisor", es: "Analista de Planeación Estratégica & Datos / Asesor Senior" },
            company: "DNP (Departamento Nacional de Planeación)",
            location: "Bogotá, Colombia",
            isCurrent: false,
            achievements: [
                {
                    en: "Formulated, modeled, and evaluated national investment projects using quantitative modeling and socioeconomic data analytics.",
                    es: "Formuló, modeló y evaluó proyectos de inversión nacional aplicando modelado cuantitativo y analítica de datos socioeconómicos.",
                },
                {
                    en: "Engineered systemic performance indicators and automated tracking dashboards for national infrastructure and economic development programs.",
                    es: "Diseñó indicadores de desempeño sistémico y tableros automatizados para programas de infraestructura y desarrollo económico.",
                },
            ],
            tech: ["Quantitative Modeling", "Econometrics", "Advanced SQL", "Tableau", "Process Optimization"],
        },
    ],

    skills: [
        {
            icon: "database",
            categoryKey: "lakehouse",
            title: { en: "Data Strategy & Modern Lakehouse", es: "Estrategia de Datos y Lakehouse" },
            description: {
                en: "Enterprise Lakehouse architectures, Operating Models, Data Stewardship, Quality SLAs, and Governance.",
                es: "Arquitecturas Lakehouse corporativas, Modelos Operativos, Data Stewardship, SLAs de Calidad y Gobierno.",
            },
            tools: ["BigQuery", "dbt", "Airflow", "Snowflake", "Great Expectations", "Data Catalog", "MDM"],
        },
        {
            icon: "cpu",
            categoryKey: "ai",
            title: { en: "GenAI, LLMs & Agentic Systems", es: "IA Generativa, LLMs y Agentes IA" },
            description: {
                en: "Multi-agent autonomous systems, RAG pipelines, prompt engineering, fine-tuning, and LLMOps orchestration.",
                es: "Sistemas autónomos multi-agente, pipelines RAG, ingeniería de prompts, fine-tuning y orquestación LLMOps.",
            },
            tools: ["LangGraph", "LangChain", "RAG", "Claude Code", "OpenAI / DeepSeek", "n8n", "Hugging Face"],
        },
        {
            icon: "terminal",
            categoryKey: "engineering",
            title: { en: "Data Engineering & Python Ecosystem", es: "Ingeniería de Datos y Ecosistema Python" },
            description: {
                en: "Scalable ETL/ELT pipelines, distributed computing, API development, query optimization, and automation.",
                es: "Pipelines ETL/ELT escalables, cómputo distribuido, desarrollo de APIs, optimización de queries y automatización.",
            },
            tools: ["Python", "Advanced SQL", "FastAPI", "PostgreSQL", "Docker", "Git / CI-CD", "Bash"],
        },
        {
            icon: "pie-chart",
            categoryKey: "bi",
            title: { en: "Business Intelligence & Executive Analytics", es: "Inteligencia de Negocios y Analítica Ejecutiva" },
            description: {
                en: "Real-time decision intelligence, metric layers, executive dashboards, OKR/KPI frameworks, and semantic modeling.",
                es: "Inteligencia para decisiones en tiempo real, capa semántica de métricas, tableros C-level y frameworks OKR/KPI.",
            },
            tools: ["Power BI", "Looker", "Apache Superset", "Tableau", "DAX", "Data Modeling"],
        },
        {
            icon: "trending-up",
            categoryKey: "product",
            title: { en: "Digital Product Strategy & Growth", es: "Estrategia de Producto Digital y Growth" },
            description: {
                en: "Product lifecycle management, dynamic pricing models, unit economics optimization, and agile delivery.",
                es: "Gestión de ciclo de vida de producto, pricing dinámico, optimización de unit economics y entrega ágil.",
            },
            tools: ["PMP", "Scrum", "Dynamic Pricing", "A/B Testing", "Jira", "Growth Modeling"],
        },
        {
            icon: "users",
            categoryKey: "leadership",
            title: { en: "Engineering & Executive Leadership", es: "Liderazgo de Ingeniería y Ejecutivo" },
            description: {
                en: "Leading high-velocity data & AI teams, mentoring engineers, C-suite stakeholder alignment, and P&L accountability.",
                es: "Liderazgo de equipos de datos e IA, mentoría técnica, alineación con directivos C-Level y gestión de P&L.",
            },
            tools: ["Team Mentorship", "Stakeholder Mgmt", "P&L Management", "Cross-functional Delivery"],
        },
    ],

    projectCategories: [
        { id: "all", label: { en: "All Projects", es: "Todos los Proyectos" } },
        { id: "data-strategy", label: { en: "Data Strategy & Lakehouse", es: "Estrategia de Datos & Lakehouse" } },
        { id: "ai-agents", label: { en: "AI Agents & GenAI", es: "Agentes IA & GenAI" } },
        { id: "product-growth", label: { en: "Product & Growth", es: "Producto & Crecimiento" } },
    ],

    projects: [
        {
            category: "data-strategy",
            title: {
                en: "Director of Strategy & BI / Lakehouse Architect",
                es: "Director de Estrategia & BI / Arquitecto Lakehouse",
            },
            company: "RippleNami (2025 - Present)",
            description: {
                en: "Situation: Needed to modernize global analytics and AI capabilities across massive incoming data streams. Task: Architect an enterprise datalakehouse and implement automated data governance while leading cross-functional engineers. Action: Deployed a scalable BigQuery + dbt architecture, optimized 50+ SQL queries (from 15 min to 30 sec), implemented Great Expectations quality frameworks (99.9% precision), and scaled ingestion from 50M to 500M+ daily records. Result: Reduced KPI delivery latency by ~40%, enabled real-time executive decision-making, and achieved 95%+ ML prediction accuracy.",
                es: "Situación: Necesidad de modernizar analítica global y capacidades de IA sobre flujos masivos de datos. Tarea: Diseñar un datalakehouse corporativo e implementar gobierno automatizado de datos liderando ingenieros. Acción: Despliegue de arquitectura BigQuery + dbt, optimización de 50+ queries (de 15 min a 30 seg), implementación de framework Great Expectations (99.9% precisión) y escalamiento de ingesta de 50M a 500M+ registros/día. Resultado: Reducción del ~40% en latencia de KPIs, analítica C-Level en tiempo real y precisión predictiva ML del 95%+.",
            },
            metrics: [
                { value: "40%", label: { en: "faster KPI delivery", es: "entrega de KPIs más rápida" } },
                { value: "500M+", label: { en: "records/day ingested", es: "registros/día ingeridos" } },
                { value: "99.9%", label: { en: "data quality accuracy", es: "precisión en calidad de datos" } },
                { value: "30x", label: { en: "SQL query speedup", es: "aceleración de consultas SQL" } },
            ],
            tech: ["BigQuery", "dbt", "Airflow", "Python", "SQL", "Looker", "Great Expectations"],
        },
        {
            category: "ai-agents",
            title: {
                en: "Production Multi-Tenant Agentic Architecture",
                es: "Arquitectura Agéntica Multi-Inquilino en Producción",
            },
            company: "Agente Core Framework (2025 - Present)",
            github: "https://github.com/Chackmilo/Agente",
            description: {
                en: "Situation: Enterprises require resilient, decoupled multi-agent architectures without cloning infrastructure per tenant. Task: Architect a hardened, asynchronous multi-tenant AI agent core supporting dynamic tool execution and multi-channel routing. Action: Engineered a production framework on LangGraph 1.x and FastAPI with PostgreSQL/SQLAlchemy, async checkpointer memory hardened against deserialization vulnerabilities, AST architectural regression guards, 256+ Playwright E2E tests, and live multi-channel connectors (Telegram, WhatsApp, Kommo CRM). Result: 100% tenant isolation, sub-second latency, zero regression downtime in CI/CD, and battle-tested operational stability.",
                es: "Situación: Empresas requieren arquitecturas multi-agente desacopladas y resilientes sin clonar infraestructura por inquilino. Tarea: Diseñar un núcleo de agentes IA multi-tenant asíncrono con ejecución dinámica de herramientas y enrutamiento multicanal. Acción: Desarrollo de framework en producción sobre LangGraph 1.x y FastAPI con PostgreSQL/SQLAlchemy, memoria checkpointer asíncrona blindada contra vulnerabilidades, guards de regresión arquitectónica por AST, 256+ tests Playwright E2E e integraciones multicanal (Telegram, WhatsApp, CRM Kommo). Resultado: 100% de aislamiento entre inquilinos, latencia sub-segundo, cero caídas por regresión en CI/CD y estabilidad operativa comprobada.",
            },
            metrics: [
                { value: "256+", label: { en: "Playwright E2E tests", es: "pruebas E2E Playwright" } },
                { value: "LangGraph 1.x", label: { en: "hardened checkpointer", es: "checkpointer blindado" } },
                { value: "100%", label: { en: "tenant isolation", es: "aislamiento multi-tenant" } },
                { value: "Multi-Channel", label: { en: "Telegram, WhatsApp, Kommo", es: "Telegram, WhatsApp, Kommo" } },
            ],
            tech: ["Python", "LangGraph 1.x", "FastAPI", "PostgreSQL", "Docker", "TypeScript", "React", "Playwright"],
        },
        {
            category: "ai-agents",
            title: {
                en: "Founder & AI Engineering Lead",
                es: "Fundador y Líder de Ingeniería de IA",
            },
            company: "NablaOps (2024 - Present)",
            description: {
                en: "Situation: Modern businesses require autonomous, multi-channel AI agents integrated with business workflows to replace manual customer touchpoints. Task: Architect and deploy production Agentic AI ecosystems and marketing automation pipelines. Action: Built autonomous AI agents using Python, LangChain, LangGraph, RAG, and n8n, containerized on Docker for clients like Monomiel, Fortuna Migration, and Urbagio. Result: 100% automated customer service and lead capture, dynamic campaign optimization, and real-time revenue attribution dashboards.",
                es: "Situación: Negocios requieren agentes IA autónomos y multicanal integrados con flujos operativos para automatizar interacciones con clientes. Tarea: Diseñar y desplegar ecosistemas de IA Agéntica en producción y pipelines de marketing. Acción: Construcción de agentes IA usando Python, LangChain, LangGraph, RAG y n8n en Docker para clientes como Monomiel, Fortuna Migration y Urbagio. Resultado: 100% de automatización en soporte y captura de leads, optimización de campañas y dashboards de atribución en tiempo real.",
            },
            metrics: [
                { value: "100%", label: { en: "automated customer service", es: "atención al cliente automatizada" } },
                { value: "3+", label: { en: "enterprise clients launched", es: "clientes corporativos lanzados" } },
                { value: "RAG", label: { en: "multi-agent LangGraph flows", es: "flujos multi-agente LangGraph" } },
            ],
            tech: ["Python", "LangChain", "LangGraph", "RAG", "n8n", "Docker", "FastAPI", "PostgreSQL"],
        },
        {
            category: "product-growth",
            title: {
                en: "Gastronomic Automation & Cryptographic POS",
                es: "Automatización Gastronómica y POS Criptográfico",
            },
            company: "BLA BLA BLA Restaurant (2026)",
            github: "https://github.com/Chackmilo/blablabla",
            description: {
                en: "Situation: High-volume Mediterranean restaurant required eliminating manual paper ticketing, billing latency, and kitchen communication friction. Task: Build an end-to-end bespoke POS and KDS platform with real-time sync, cryptographic audit trails, and ML forecasting. Action: Engineered a responsive PWA for waiters with 11-table live layout, real-time Kitchen Display System (KDS) via WebSockets (Socket.io), automated pre-bill calculation, immutable SHA-256 cryptographic Z-Close cash register sealing, and weekly recipe ingredient demand forecasting using BigQuery ML (ARIMA_PLUS). Result: 0% lost orders, under 100ms real-time kitchen sync, fraud-proof immutable accounting ledger, and optimized food prep inventory.",
                es: "Situación: Restaurante mediterráneo de alta rotación requería erradicar comandas manuales en papel, demoras en facturación y fricciones salón-cocina. Tarea: Construir una plataforma POS y KDS a la medida con sincronización en tiempo real, auditoría criptográfica y pronóstico ML. Acción: Desarrollo de PWA móvil para meseros con mapa interactivo de 11 mesas, KDS de cocina en tiempo real vía WebSockets (Socket.io), precálculo automatizado de cuenta, sellado criptográfico SHA-256 de Cierre Z (ledger inmutable) y pronóstico semanal de insumos con BigQuery ML (ARIMA_PLUS). Resultado: 0% comandas perdidas, sincronización en <100ms, ledger contable a prueba de fraude y optimización de inventario perecedero.",
            },
            metrics: [
                { value: "SHA-256", label: { en: "immutable Z-Close ledger", es: "ledger inmutable Cierre Z" } },
                { value: "<100ms", label: { en: "real-time WebSocket KDS", es: "KDS WebSocket en tiempo real" } },
                { value: "ARIMA_PLUS", label: { en: "BigQuery ML ingredient forecast", es: "forecast insumos BigQuery ML" } },
                { value: "Light Bistro", label: { en: "custom touch design system", es: "design system táctil a medida" } },
            ],
            tech: ["Node.js", "Socket.io", "React", "Vite", "TailwindCSS", "BigQuery ML", "Docker Compose", "Nginx"],
        },
        {
            category: "data-strategy",
            title: {
                en: "Mass Catastral & Rental Valuation ML",
                es: "Valuación Masiva Catastral y de Renta con ML",
            },
            company: "Gambia Revenue Authority (2025)",
            github: "https://github.com/Chackmilo/GRA-valuation",
            description: {
                en: "Situation: National tax authority required accurate, transparent mass appraisal of residential and commercial properties across heterogeneous urban regions. Task: Build an end-to-end predictive valuation and poverty scoring machine learning pipeline for over 79,000 buildings. Action: Engineered an advanced ML framework using optimized Gradient Boosting Regressor (R², RMSE, MAE, MAPE, SMAPE) integrating building footprint dimensions, construction materials, socioeconomic census metrics (DAI, Poverty Score), and geospatial heatmapping with GeoPandas. Result: Modeled 79k+ properties with baseline R² of 0.50-0.60, reducing manual field survey audit cycles from months to days with high interpretability.",
                es: "Situación: Autoridad tributaria nacional requería valuación catastral masiva y transparente de inmuebles residenciales y comerciales en zonas urbanas heterogéneas. Tarea: Construir un pipeline de ML para avalúo predictivo y scoring de pobreza sobre más de 79.000 edificaciones. Acción: Desarrollo de framework de ML con Gradient Boosting Regressor optimizado (R², RMSE, MAE, MAPE, SMAPE) integrando dimensiones de construcción, materiales, indicadores censales socioeconómicos (DAI, Poverty Score) y mapas de calor geoespaciales con GeoPandas. Resultado: Valuación de 79k+ inmuebles con R² de 0.50-0.60, reduciendo auditorías de campo de meses a días con alta interpretabilidad.",
            },
            metrics: [
                { value: "79k+", label: { en: "buildings valued", es: "edificaciones valuadas" } },
                { value: "0.50-0.60", label: { en: "optimized R² score", es: "R² optimizado" } },
                { value: "DAI & Poverty", label: { en: "socioeconomic scoring", es: "scoring socioeconómico" } },
                { value: "GeoPandas", label: { en: "geospatial heatmaps", es: "mapas de calor geoespaciales" } },
            ],
            tech: ["Python", "Scikit-Learn", "GeoPandas", "Pandas", "Joblib", "Docker", "Pytest"],
        },
        {
            category: "ai-agents",
            title: {
                en: "Legal Intake & Lead Qualification Agent",
                es: "Agente de Intake Legal y Calificación de Leads",
            },
            company: "Fortuna Migration (2025)",
            github: "https://github.com/Chackmilo/Fortuna_Agente",
            description: {
                en: "Situation: Immigration law firm overwhelmed with manual lead screening and unstructured prospective client questionnaires. Task: Build an autonomous legal intake agent to qualify immigration eligibility and route high-value cases. Action: Implemented an intelligent multi-channel agent with LangGraph, FastAPI, and RAG pipelines for dynamic legal requirement assessment, structured data extraction, and automated CRM handoff to specialized lawyers. Result: 100% automated prospect qualification, 4x faster response times, and higher conversion rates for complex visa consultations.",
                es: "Situación: Firma de abogados de inmigración sobrecargada con revisión manual de prospectos y cuestionarios no estructurados. Tarea: Construir un agente legal autónomo de intake para calificar viabilidad migratoria y enrutar casos prioritarios. Acción: Implementación de agente multicanal con LangGraph, FastAPI y RAG para evaluación dinámica de requisitos legales, extracción estructurada de expedientes y handoff directo al CRM de abogados. Resultado: 100% de calificación automatizada, reducción de 4x en tiempo de respuesta y mayor conversión de consultas de visa.",
            },
            metrics: [
                { value: "100%", label: { en: "automated qualification", es: "calificación automatizada" } },
                { value: "4x", label: { en: "faster intake speed", es: "mayor velocidad de intake legal" } },
                { value: "RAG", label: { en: "legal knowledge pipeline", es: "pipeline de conocimiento legal" } },
            ],
            tech: ["Python", "LangGraph", "FastAPI", "Docker", "RAG", "TypeScript"],
        },
        {
            category: "product-growth",
            title: {
                en: "Operations & Business Strategy Lead",
                es: "Líder de Operaciones y Estrategia de Negocio",
            },
            company: "inDrive LATAM Delivery (2022 - 2024)",
            description: {
                en: "Situation: Aggressive multi-country expansion required across LATAM delivery and courier markets. Task: Drive GMV acceleration, unit economics profitability, and operational efficiency through data and AI transformation. Action: Led cross-functional growth teams, deployed dynamic pricing ML algorithms, implemented customer service GPT agents, and designed centralized KPI executive dashboards. Result: Achieved 1.5x LATAM GMV growth, +30% operational efficiency for delivery, +20% customer retention, and automated C-level analytics.",
                es: "Situación: Expansión acelerada requerida en mercados LATAM de delivery y mensajería. Tarea: Impulsar crecimiento de GMV, rentabilidad de unit economics y eficiencia operativa mediante datos e IA. Acción: Liderazgo de equipos multifuncionales de growth, despliegue de algoritmos ML de pricing dinámico, agentes GPT de soporte y diseño de dashboards ejecutivos centralizados. Resultado: Crecimiento de 1.5x en GMV, +30% en eficiencia operativa de delivery, +20% en retención y analítica C-level automatizada.",
            },
            metrics: [
                { value: "1.5x", label: { en: "GMV growth across LATAM", es: "crecimiento de GMV en LATAM" } },
                { value: "+30%", label: { en: "delivery operational efficiency", es: "eficiencia operativa delivery" } },
                { value: "+20%", label: { en: "customer retention increase", es: "aumento en retención de clientes" } },
            ],
            tech: ["Power BI", "SQL", "Python", "Google BigQuery", "Looker Studio", "Machine Learning", "GPT Agents"],
        },
        {
            category: "product-growth",
            title: {
                en: "Co-Founder & Head of Operations",
                es: "Co-Fundador y Director de Operaciones",
            },
            company: "twinlu (2020 - 2022)",
            description: {
                en: "Situation: Regional B2B enterprises lacked custom digital platforms, automated business intelligence, and agile software delivery. Task: Build and scale a digital product and analytics agency from the ground up. Action: Directed 50+ custom software and analytics client solutions across LATAM, developed real-time BI dashboards, and implemented agile sprint frameworks. Result: Delivered 50+ successful client deployments with 100% on-time delivery rate, enabling 3x average revenue growth for core clients.",
                es: "Situación: Empresas B2B carecían de plataformas digitales a medida, BI automatizado y entrega ágil de software. Tarea: Construir y escalar una agencia de producto digital y analítica desde cero. Acción: Dirección de más de 50 soluciones de software y analítica en LATAM, desarrollo de dashboards BI en tiempo real e implementación de metodologías ágiles. Resultado: 50+ despliegues exitosos con 100% de cumplimiento a tiempo y 3x de crecimiento en ingresos para clientes clave.",
            },
            metrics: [
                { value: "50+", label: { en: "projects delivered", es: "proyectos entregados" } },
                { value: "100%", label: { en: "on-time delivery rate", es: "tasa de entrega a tiempo" } },
                { value: "3x", label: { en: "client revenue growth average", es: "crecimiento promedio en ingresos de clientes" } },
            ],
            tech: ["React", "Node.js", "Python", "PostgreSQL", "Power BI", "Scrum", "Jira"],
        },
    ],

    education: [
        {
            title: { en: "Master in Business Engineering & Supply Chain (MBE)", es: "Máster en Business Engineering & Supply Chain (MBE)" },
            institution: "Universitat de Barcelona (2020 - 2022)",
            description: {
                en: "Advanced corporate strategy, digital supply chain optimization, and technological innovation management. Focused on driving operational excellence and enterprise business models.",
                es: "Estrategia corporativa avanzada, optimización de cadenas de suministro digitales y gestión de la innovación tecnológica. Enfoque en excelencia operativa y modelos de negocio escalables.",
            },
            badge: "MBE",
        },
        {
            title: { en: "Master of Engineering (MEng) - Industrial Management", es: "Máster en Ingeniería (MEng) - Gestión Industrial" },
            institution: "Universidad de los Andes & Politecnico di Milano (2014 - 2016)",
            description: {
                en: "Double master's degree program bridging technical engineering with international strategic corporate management, operations research, and technology strategy.",
                es: "Programa de doble titulación que une la ingeniería técnica con la gestión corporativa estratégica internacional, investigación de operaciones y estrategia tecnológica.",
            },
            badge: "MEng",
        },
        {
            title: { en: "Industrial Engineering", es: "Ingeniería Industrial" },
            institution: "Universidad de los Andes (2009 - 2014)",
            description: {
                en: "Rigorous quantitative foundation in systems engineering, stochastic modeling, operations research, and statistical process optimization at one of LATAM's top universities.",
                es: "Sólida formación cuantitativa en ingeniería de sistemas, modelado estocástico, investigación de operaciones y optimización estadística en una de las mejores universidades de LATAM.",
            },
            badge: "BSc",
        },
        {
            title: { en: "Chemical Engineering", es: "Ingeniería Química" },
            institution: "Universidad de los Andes (2008 - 2013)",
            description: {
                en: "Dual degree specializing in transport phenomena, thermodynamic modeling, and complex analytical systems, cultivating deep mathematical problem-solving capabilities.",
                es: "Doble titulación especializada en fenómenos de transporte, modelado termodinámico y sistemas analíticos complejos, cultivando un riguroso análisis matemático.",
            },
            badge: "BSc",
        },
    ],

    recommendations: [
        {
            name: "Sarah Mitchell",
            role: "VP of Engineering, RippleNami",
            text: {
                en: "Daniel transformed our data infrastructure from fragmented systems into a unified, real-time analytics platform. His technical expertise in datalake architecture and ability to align data strategy with business outcomes has been instrumental in our growth. He's not just a talented engineer, but a strategic leader who mentors teams effectively.",
                es: "Daniel transformó nuestra infraestructura de datos de sistemas fragmentados a una plataforma de análisis unificada en tiempo real. Su experiencia técnica en arquitectura datalake y capacidad para alinear estrategia de datos con resultados de negocio ha sido instrumental en nuestro crecimiento. No es solo un ingeniero talentoso, sino un líder estratégico que guía, forma y potencia equipos con gran efectividad.",
            },
        },
        {
            name: "Carlos Rodríguez",
            role: "Head of Product, inDrive LATAM",
            text: {
                en: "Working with Daniel was a game-changer for our LATAM operations. He built a KPI framework that gave us unprecedented visibility into our business metrics. The dashboards he created became the single source of truth for our entire organization. His blend of technical skills and business acumen is rare and invaluable.",
                es: "Trabajar con Daniel fue transformador para nuestras operaciones LATAM. Construyó un framework de KPIs que nos dio visibilidad sin precedentes de nuestras métricas de negocio. Los dashboards que creó se convirtieron en la única fuente de verdad para toda nuestra organización. Su combinación de habilidades técnicas y visión de negocio es rara e invaluable.",
            },
        },
        {
            name: "Jennifer Park",
            role: "Senior Data Scientist, RippleNami",
            text: {
                en: "Daniel is an exceptional mentor and leader. He established best practices for our data engineering team and created an environment where we could grow professionally. His approach to building ML pipelines and data quality frameworks set a new standard for our organization. I learned more in six months working with him than in years elsewhere.",
                es: "Daniel es un mentor y líder excepcional. Estableció mejores prácticas para nuestro equipo de ingeniería de datos y creó un ambiente donde pudimos crecer profesionalmente. Su enfoque para construir pipelines ML y frameworks de calidad de datos estableció un nuevo estándar para nuestra organización. Aprendí más en seis meses trabajando con él que en años en otros lugares.",
            },
        },
    ],

    certifications: [
        {
            category: { en: "AI, Machine Learning & Agentic Systems", es: "IA, Machine Learning y Sistemas Agénticos" },
            items: [
                "Machine Learning in Production · DeepLearning.AI",
                "Agentic AI and AI Agents for Leaders · Vanderbilt University",
                "Claude Code: Software Engineering with GenAI Agents · Vanderbilt University",
                "AI Product Management · Duke University",
                "AI Agents Fundamentals · Hugging Face",
                "Google Advanced Data Analytics & AI · Google / Coursera",
                "Generative AI for Executives · IBM",
                "Introduction to Deep Learning & Neural Networks · IBM",
            ],
        },
        {
            category: { en: "Data Analytics, Lakehouse & Engineering", es: "Analítica de Datos, Lakehouse e Ingeniería" },
            items: [
                "Google Advanced Data Analytics (Professional Certificate) · Google",
                "Generative AI for BI Analysts · IBM",
                "Data Analysis with R Programming · Google",
                "Business Analytics · Campus BBVA",
                "Create Interactive Dashboards with Streamlit · Coursera",
                "Introduction to Software Engineering · IBM",
                "Key Technologies for Business · IBM",
            ],
        },
        {
            category: { en: "Project Management, Agile & Leadership", es: "Gestión de Proyectos, Ágil y Liderazgo" },
            items: [
                "PMP Certification (Project Management Professional) · PMI",
                "Applied Scrum for Agile Project Management · University of Maryland",
                "Google Project Management (6-Course Specialization) · Google",
                "Generative AI PM · IBM",
                "Gestión de Proyectos con Jira · Coursera",
            ],
        },
    ],

    form: {
        title: { en: "Leave a Recommendation", es: "Dejar una Recomendación" },
        submit: { en: "Submit Recommendation", es: "Enviar Recomendación" },
        namePlaceholder: { en: "Your Name", es: "Tu Nombre" },
        rolePlaceholder: { en: "Your Role & Company", es: "Tu Cargo y Empresa" },
        messagePlaceholder: { en: "Your recommendation message", es: "Tu mensaje de recomendación" },
        thanks: { en: "Thank you!", es: "¡Gracias!" },
        thanksMessage: { en: "Thank you for submitting a recommendation!", es: "¡Gracias por enviar una recomendación!" },
    },

    chat: {
        greeting: {
            en: "Hello! I am Nabla, Daniel's AI assistant. Would you like to explore his executive experience in Data Strategy, AI Lakehouses, LangGraph Agents, or P&L impact?",
            es: "¡Hola! Soy Nabla, el asistente de IA de Daniel. ¿Te gustaría consultar sobre su experiencia en Estrategia de Datos, Lakehouses, Agentes LangGraph o impacto en P&L?",
        },
        userReply: {
            en: "I want to ask about Daniel's leadership experience!",
            es: "¡Quiero consultar sobre la experiencia de liderazgo de Daniel!",
        },
        botReply: {
            en: "Here are details about Daniel's executive track record...",
            es: "Aquí tienes detalles sobre la trayectoria ejecutiva de Daniel...",
        },
        placeholder: {
            en: "Ask Nabla anything about Daniel's experience...",
            es: "Pregúntale a Nabla sobre la experiencia de Daniel...",
        },
    },

    blog: {
        readMore: { en: "Read full story", es: "Leer historia completa" },
        showLess: { en: "Show less", es: "Mostrar menos" },
    },

    footer: {
        title: "DANIEL CAMILO PARDO FIGUEROA",
        role: "Director of Data Strategy & AI | Senior Data Engineer | Digital Products & MLOps",
        linkedinLabel: { en: "LinkedIn Profile", es: "Perfil de LinkedIn" },
        languages: {
            title: { en: "Languages", es: "Idiomas" },
            items: [
                { en: "Spanish - Native", es: "Español - Nativo" },
                { en: "English - Advanced (Full Professional)", es: "Inglés - Avanzado (Profesional Fluido)" },
                { en: "German - Basic (A2)", es: "Alemán - Básico (A2)" },
            ],
        },
        copyright: {
            en: "All rights reserved.",
            es: "Todos los derechos reservados.",
        },
    },

    meta: {
        title: {
            en: "Daniel Camilo Pardo | Director of Data Strategy & AI",
            es: "Daniel Camilo Pardo | Director de Estrategia de Datos e IA",
        },
        description: {
            en: "Executive portfolio of Daniel Camilo Pardo Figueroa — Director of Data Strategy & AI, Senior Data Engineer, and MLOps expert delivering modern BigQuery lakehouses and agentic AI.",
            es: "Portafolio ejecutivo de Daniel Camilo Pardo Figueroa — Director de Estrategia de Datos e IA, Senior Data Engineer y experto en MLOps, lakehouses BigQuery y agentes IA.",
        },
    },
};
