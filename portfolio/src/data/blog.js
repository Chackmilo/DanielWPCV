export const blogPosts = [
    {
        id: "from-pmo-to-ai-leadership",
        date: "2025-03-01",
        title: {
            en: "From Government PMO to Leading Global AI Strategies",
            es: "De PMO Gubernamental a Liderar Estrategias Globales de IA",
        },
        summary: {
            en: "A reflection on how managing multi-stakeholder government projects in Colombia laid the groundwork for leading data and AI strategies across four continents — and why the hardest part was never the technology.",
            es: "Una reflexión sobre cómo gestionar proyectos gubernamentales multi-stakeholder en Colombia sentó las bases para liderar estrategias de datos e IA en cuatro continentes — y por qué lo más difícil nunca fue la tecnología.",
        },
        content: {
            en: `
### Where It All Started

Before I ever wrote a line of Python or architected a datalakehouse, I managed something far messier: government projects. As a PMO and Strategic Manager at institutions like DNP (Colombia's National Planning Department) and the Ministry of Information Technologies, I learned a lesson that still defines how I work today — *the hardest part of any transformation is never the technology. It's the alignment.*

Aligning a ministry with 200+ employees toward a single strategic objective, navigating political cycles, managing budgets under public scrutiny, and delivering measurable results with finite resources — that was my training ground. And honestly, it was harder than anything I've faced since in the private sector.

### The Skills That Transferred (and the Ones That Didn't)

What I took from those years wasn't a specific tool or methodology. It was the ability to operate in complexity: to map stakeholders, manage competing priorities, build consensus, and deliver under constraints. This is the DNA of what we now call "Data Governance" — defining who owns what, how decisions flow, and what quality standards apply.

When I transitioned into the global tech ecosystem — first through twinlu (my own company), then inDrive (one of the largest ride-hailing platforms), and now RippleNami — I realized that the core challenge was identical: *how do you get an entire organization to make decisions based on data instead of intuition?*

The answer is never a dashboard. It's a governance model. A clear accountability matrix. An operating model that defines data ownership, quality SLAs, and escalation paths. The dashboard is just the visible tip.

### Building the Bridge at inDrive

At inDrive, I was responsible for growing a P2P delivery business across LATAM — coordinating teams in marketing, product, engineering, finance, and operations. The numbers tell part of the story: 60% operations growth, 40% MAU increase, 1.5x GMV growth. But the real story is *how* we got there.

We built a KPI/OKR framework from scratch, with over 30 metrics tracked weekly across six countries. Every marketing campaign, every pricing experiment, every courier acquisition push was backed by data — and validated by Russian statisticians who helped us build models for iterative optimization.

The PMO muscle was essential. Managing a portfolio of 15+ concurrent projects, each with cross-functional dependencies, is not a data science problem — it's a project management problem. And the rigor I developed managing government programs is what allowed me to orchestrate all those moving parts without losing coherence.

### Crisis Management: When Data Governance Breaks

One of the hardest moments in my career came when we discovered that a critical data pipeline was producing inconsistent metrics across regions. Marketing was making decisions based on numbers that contradicted what operations was seeing. Trust in the data collapsed overnight.

The fix wasn't technical (though we did optimize 50+ queries and reduce processing from 15 minutes to 30 seconds). The real fix was *governance*: establishing a single source of truth, defining data ownership per metric, implementing quality frameworks with 99.9% accuracy targets, and creating a review cadence where stakeholders could challenge the numbers before they reached the C-level.

That experience at RippleNami — where I reduced KPI delivery latency by ~40% and achieved 95%+ ML prediction accuracy — taught me that data quality and data governance are not "nice to have" initiatives. They are the foundation without which no ML model, no dashboard, and no AI agent can deliver reliable value.

### The GenAI Chapter

Today, through NablaOps, I'm building something I couldn't have imagined during my government years: AI agents that automate entire customer service flows, marketing campaigns driven by real-time data, and executive dashboards that tell the story of a business in seconds.

The stack has changed dramatically — Python, LangChain, LangGraph, RAG, Docker, n8n — but the principles haven't. Every AI agent I deploy follows the same governance logic I learned managing public sector programs: *clear inputs, defined ownership, measurable outputs, and an escalation path when things go wrong.*

The difference is speed. What used to take a 6-month government procurement cycle now takes a week with the right tools. But the strategic thinking — understanding the problem before building the solution, mapping the stakeholders, defining success metrics — that still takes the same discipline it always did.

### What I've Learned

If I had to distill 12 years of experience into a few principles, they would be:

1. **Technology is the easy part.** Alignment, governance, and stakeholder management are what determine whether a data initiative succeeds or becomes shelfware.

2. **Every metric needs an owner.** If nobody is accountable for a KPI, it will eventually become unreliable, and decisions based on it will fail.

3. **Cross-functional delivery is a muscle.** You build it by doing it, not by reading about it. Managing government programs, product launches, and AI deployments all require the same core skill: orchestrating people toward a shared outcome.

4. **The best AI strategies start with the business problem.** Not the model, not the tool, not the vendor. The problem. Then work backwards.

The road from a government PMO office in Bogotá to architecting AI strategies across multiple continents was neither straight nor obvious. But every chapter — public sector, entrepreneurship, hyper-growth, and now consulting — added a layer that makes the next one stronger.

That's the compound effect of a non-linear career. And I wouldn't trade it for anything.
            `,
            es: `
### Donde Todo Comenzó

Antes de escribir una sola línea de Python o diseñar un datalakehouse, gestioné algo mucho más complejo: proyectos gubernamentales. Como PMO y Gestor Estratégico en instituciones como el DNP (Departamento Nacional de Planeación) y el MinTIC, aprendí una lección que sigue definiendo cómo trabajo hoy — *lo más difícil de cualquier transformación nunca es la tecnología. Es la alineación.*

Alinear un ministerio con más de 200 empleados hacia un solo objetivo estratégico, navegar ciclos políticos, gestionar presupuestos bajo escrutinio público y entregar resultados medibles con recursos finitos — ese fue mi campo de entrenamiento. Y honestamente, fue más difícil que cualquier reto que haya enfrentado después en el sector privado.

### Las Habilidades que se Transfirieron (y las que No)

Lo que me llevé de esos años no fue una herramienta ni una metodología específica. Fue la capacidad de operar en complejidad: mapear stakeholders, gestionar prioridades en competencia, construir consenso y entregar bajo restricciones. Este es el ADN de lo que hoy llamamos "Gobierno de Datos" — definir quién es dueño de qué, cómo fluyen las decisiones y qué estándares de calidad aplican.

Cuando hice la transición al ecosistema tech global — primero con twinlu (mi propia empresa), luego inDrive (una de las mayores plataformas de ride-hailing), y ahora RippleNami — me di cuenta de que el desafío central era idéntico: *¿cómo logras que toda una organización tome decisiones basándose en datos en lugar de intuición?*

La respuesta nunca es un dashboard. Es un modelo de gobernanza. Una matriz clara de responsabilidades. Un modelo operativo que define la propiedad de los datos, SLAs de calidad y rutas de escalamiento. El dashboard es solo la punta visible del iceberg.

### Construyendo el Puente en inDrive

En inDrive fui responsable de hacer crecer un negocio P2P de delivery en LATAM — coordinando equipos de marketing, producto, ingeniería, finanzas y operaciones. Los números cuentan parte de la historia: 60% de crecimiento en operaciones, 40% de aumento en MAU, 1.5x de crecimiento en GMV. Pero la verdadera historia está en *cómo* lo logramos.

Construimos un framework de KPI/OKR desde cero, con más de 30 métricas rastreadas semanalmente en seis países. Cada campaña de marketing, cada experimento de pricing, cada iniciativa de adquisición de couriers estaba respaldada por datos — y validada por matemáticos rusos que nos ayudaron a construir modelos para optimización iterativa.

El músculo de PMO fue esencial. Gestionar un portafolio de 15+ proyectos concurrentes, cada uno con dependencias cross-functional, no es un problema de data science — es un problema de gestión de proyectos. Y el rigor que desarrollé gestionando programas gubernamentales fue lo que me permitió orquestar todas esas piezas móviles sin perder coherencia.

### Gestión de Crisis: Cuando el Gobierno de Datos Falla

Uno de los momentos más difíciles de mi carrera fue cuando descubrimos que un pipeline crítico de datos estaba produciendo métricas inconsistentes entre regiones. Marketing tomaba decisiones basándose en números que contradecían lo que operaciones estaba viendo. La confianza en los datos colapsó de la noche a la mañana.

La solución no fue técnica (aunque sí optimizamos 50+ queries y redujimos el procesamiento de 15 minutos a 30 segundos). La verdadera solución fue *gobernanza*: establecer una única fuente de verdad, definir la propiedad de cada métrica, implementar frameworks de calidad con objetivos de 99.9% de precisión, y crear una cadencia de revisión donde los stakeholders pudieran cuestionar los números antes de que llegaran al C-level.

Esa experiencia en RippleNami — donde reduje la latencia de entrega de KPIs en un ~40% y logré una precisión de predicción ML del 95%+ — me enseñó que la calidad y el gobierno de datos no son iniciativas "nice to have". Son el fundamento sin el cual ningún modelo ML, dashboard o agente IA puede entregar valor confiable.

### El Capítulo de GenAI

Hoy, a través de NablaOps, estoy construyendo algo que no podría haber imaginado en mis años de gobierno: agentes de IA que automatizan flujos completos de atención al cliente, campañas de marketing impulsadas por datos en tiempo real, y dashboards ejecutivos que cuentan la historia de un negocio en segundos.

El stack ha cambiado dramáticamente — Python, LangChain, LangGraph, RAG, Docker, n8n — pero los principios no. Cada agente IA que despliego sigue la misma lógica de gobernanza que aprendí gestionando programas del sector público: *inputs claros, propiedad definida, outputs medibles, y una ruta de escalamiento cuando las cosas salen mal.*

La diferencia es la velocidad. Lo que antes tomaba un ciclo de contratación pública de 6 meses ahora toma una semana con las herramientas correctas. Pero el pensamiento estratégico — entender el problema antes de construir la solución, mapear los stakeholders, definir las métricas de éxito — eso sigue requiriendo la misma disciplina de siempre.

### Lo que He Aprendido

Si tuviera que destilar 12 años de experiencia en algunos principios, serían:

1. **La tecnología es la parte fácil.** La alineación, la gobernanza y la gestión de stakeholders son lo que determina si una iniciativa de datos tiene éxito o se convierte en un ejercicio académico.

2. **Toda métrica necesita un dueño.** Si nadie es responsable de un KPI, eventualmente se volverá poco confiable, y las decisiones basadas en él fallarán.

3. **La entrega cross-functional es un músculo.** Se construye haciéndolo, no leyendo al respecto. Gestionar programas gubernamentales, lanzamientos de producto y despliegues de IA requieren la misma habilidad central: orquestar personas hacia un resultado compartido.

4. **Las mejores estrategias de IA empiezan con el problema de negocio.** No con el modelo, no con la herramienta, no con el proveedor. El problema. Y luego se trabaja hacia atrás.

El camino desde una oficina de PMO gubernamental en Bogotá hasta diseñar estrategias de IA en múltiples continentes no fue ni recto ni obvio. Pero cada capítulo — sector público, emprendimiento, hipercrecimiento y ahora consultoría — agregó una capa que hace al siguiente más fuerte.

Ese es el efecto compuesto de una carrera no lineal. Y no lo cambiaría por nada.
            `
        },
        tags: ["AI Leadership", "Data Strategy", "Data Governance", "Career Transition"],
    },
    {
        id: "my-path-to-ai",
        date: "2025-03-03",
        title: {
            en: "My Story with Artificial Intelligence",
            es: "Mi Historia con la Inteligencia Artificial",
        },
        summary: {
            en: "From struggling with uncertainty equations at university to deploying ML models in production at global scale — a personal journey through optimization, entrepreneurship, data strategy, and the tools that shaped the way I think about AI and business.",
            es: "Desde las ecuaciones de incertidumbre en la universidad hasta modelos de ML corriendo en producción a escala global — un viaje personal por la optimización, el emprendimiento, la estrategia de datos y las herramientas que moldearon mi forma de pensar la IA y los negocios.",
        },
        content: {
            en: `
### The Mathematics of Uncertainty
My story with artificial intelligence didn't start in front of a screen with perfectly organized data. It started with confusion, with pages full of formulas I couldn't quite understand, with the feeling that the math I was being taught in college had nothing to do with the real world. It was 2010, my second year of Industrial Engineering at Universidad de los Andes, and suddenly I found myself facing something completely different from anything I'd known: probability and statistics. It wasn't the clean, predictable math I was used to. It was something else entirely. It was the mathematics of uncertainty.

And curiously, that's where something inside me clicked.

I moved through optimization courses and discovered something that deeply fascinated me: the possibility of translating a real problem — messy, complex, full of variables — into mathematical language, and from there finding solutions that would otherwise be invisible. It wasn't just solving equations; it was learning to *see* the world differently. Understanding that a molecule in a chemical reactor, with its temperature peak at the precise moment, could be represented, modeled, optimized. That chaos has structure.

### From Theory to Tools
But I'll be honest: it wasn't easy. Algebra, vector calculus, differential equations, stochastic mathematics for time series... all mixed together. There were moments when I wanted to give up. And that was just the theoretical part. Because learning to *do* things with that theory meant another parallel journey: learning the tools. Moving from paper to machine. Starting to understand that a Jupyter Notebook isn't just a code editor — it's a space where a hypothesis becomes tangible; that Google Colab lets you run models your personal computer could never handle; that Visual Studio Code, with its extensions and ecosystem, can become the command center for any data analysis. Each new tool was a challenge in itself: hours configuring environments, understanding why the code wouldn't run, debugging errors that seemed unsolvable. But with each obstacle overcome, the sense of being able to do more grew.

I studied network flows, probabilistic models, the foundations of what we now call neural networks. And something began to take shape.

### The Holistic View
There's always that criticism of industrial engineers: "they're oceans of knowledge one meter deep." That they know a little of everything and nothing in depth. I never believed that. What you actually build is a holistic perspective — the ability to understand a business from strategy to operations, to connect dots that others can't see. And that perspective led me to find my focus: operations optimization.

That's how I arrived at my thesis and earned my Green Belt certification, applying Six Sigma in hospitals to improve care for elderly patients with hip fractures. When I saw that length of stay was decreasing, that quality was improving, that real people could leave the hospital sooner with better outcomes... I felt something that the most elegant equation had never given me: the certainty that what I study matters. That it serves a purpose. That it reaches someone.

### A Different Chapter
In late 2014, I took a different path — one where I wanted to contribute to the country's growth from another angle. I won't go deeper into it, but it was a chapter that also shaped me.

### Twinlu: Building and Letting Go
Then 2020 arrived. The world was stopping, and I, paradoxically, wanted to build something. Twinlu was born — a company with a mission that moved me deeply: closing the digital gap in Latin American businesses through custom software. Two years, over 50 projects, from e-commerce to executive dashboards, clients across the region. It was beautiful and exhausting at the same time. We faced individual challenges, collective ones, environmental ones. And eventually, Twinlu closed.

Closing a company you founded yourself hurts in a way that's hard to describe. But the lessons it left — in me and in the team — were greater than the pain of closing.

### The Little Button at inDrive
Then came one of the most intense challenges of my career: growing "a little button" inside an app called inDrive. That button was a P2P and B2B delivery business, managed by couriers in markets where the brand was unknown, trust had to be earned every single day, and competitors showed no mercy. From strategy, from marketing, from technology — with its strengths and limitations — we had to build something from practically zero.

What followed was an absolute learning experience. I coordinated marketing, product, strategy, finance, copywriting, sales, and provider acquisition teams, orchestrating a project portfolio that had to coexist and strengthen each other. No project was executed without a solid data foundation: I worked with Russian mathematicians who were experts in statistical models that allowed us to create, validate, and optimize iteratively.

And in the background, a constant challenge that rarely gets mentioned: the technological learning curve never stops. Learning to navigate Google's suite — BigQuery, Looker Studio, Vertex AI — was a process that took time, errors, and late nights. The same with Microsoft Azure: understanding its architectures, cognitive services, data pipelines, and MLOps capabilities. Nobody explains it all at once. You discover it along the way, often with more questions than answers. And that's fine. Because each tool you master opens a door you didn't even know existed.

I traveled, discovered new markets, new cultures, new ways of seeing business. And that made me mature in a way no course ever could.

### Models in Production
In that context, I reconnected with statistics, but from a very different place. I was no longer the student facing formulas — I was someone who understood what they were for. That's where I built my first agents using GPT models to solve B2B client problems, increasing satisfaction, retention, and recurring revenue. We also lived through the transition from a monolithic architecture to microservices — an enormous challenge, achieved successfully — and put machine learning models into production to dynamically optimize pricing: demand, weather, traffic, competitor prices, gas prices, dollar fluctuations. All in real time. That moment — watching those models running in production and impacting the business — was one of the deepest satisfactions of my professional life.

### The Present: RippleNami and the New Ecosystem
That chapter closed in 2024. And in 2025, a new one began: as Director of Data Strategy & AI at RippleNami, with operations in the US and Africa, leading teams of Data Scientists and MLOps engineers, designing end-to-end data strategies, reducing KPI delivery latency by 40%, and taking machine learning models to production to optimize property rental pricing.

Today, the tool ecosystem has also changed in ways that still surprise me. Tools like Claude Code or Google Antigravity have redefined what's possible in a single workday. Things that used to take weeks of development now take hours. Projects that required an entire team can now be started from a single terminal window with the right instruction. It's not magic — it's the combination of years of experience with tools that are finally up to the level of the problems we always wanted to solve. And that, far from diminishing the value of the path traveled, makes it even more valuable: because knowing *what to ask* of a powerful tool requires deeply understanding the problem, the data, the business.

The road here — from those equations I didn't understand at Los Andes to models running in production at global scale — was neither straight nor easy. It had frustrations, closures, doubts, tools I didn't understand, technical documentation in English at 2 AM, and also victories that no one else can see but that you carry inside.

And throughout that entire journey, there's one thread that never changed: the conviction that data, well used, can improve people's lives. I saw it in the hospitals. I saw it in the couriers delivering faster. I keep seeing it every time a model in production makes a better decision.

That's what drives me. That's who I am.
            `,
            es: `
### La Matemática de la Incertidumbre
Mi historia con la inteligencia artificial no empezó frente a una pantalla con datos perfectamente ordenados. Empezó con confusión, con hojas llenas de fórmulas que no terminaba de entender, con la sensación de que la matemática que me enseñaban en la universidad no tenía nada que ver con el mundo real. Era 2010, segundo año de Ingeniería Industrial en la Universidad de los Andes, y de repente me encontré frente a algo completamente distinto a lo que había conocido hasta entonces: probabilidad y estadística. No era la matemática limpia y predecible de siempre. Era otra cosa. Era la matemática de la incertidumbre.

Y curiosamente, fue ahí donde algo dentro de mí se encendió.

Empecé a transitar por cursos de optimización y descubrí algo que me fascinó profundamente: la posibilidad de traducir un problema real —sucio, complejo, lleno de variables— en un lenguaje matemático, y desde ahí encontrar soluciones que de otra forma serían invisibles. No era solo resolver ecuaciones; era aprender a *ver* el mundo de otra manera. Entender que una molécula en un reactor químico, con su pico de temperatura en el instante preciso, podía representarse, modelarse, optimizarse. Que el caos tiene estructura.

### De la Teoría a las Herramientas
Pero seré honesto: no fue fácil. Álgebra, cálculo vectorial, ecuaciones diferenciales, matemática estocástica para series de tiempo... todo mezclado. Hubo momentos en que quise rendirme. Y eso fue solo la parte teórica. Porque aprender a *hacer* con esa teoría implicaba otro viaje paralelo: aprender las herramientas. Pasar del papel a la máquina. Empezar a entender que un Jupyter Notebook no es solo un editor de código, sino un espacio donde una hipótesis se vuelve tangible; que Google Colab te permite ejecutar modelos que tu computador personal nunca podría correr; que Visual Studio Code, con sus extensiones y su ecosistema, puede convertirse en el centro de operaciones de cualquier análisis de datos. Cada herramienta nueva fue un reto en sí mismo: horas configurando entornos, entendiendo por qué el código no corría, depurando errores que parecían no tener solución. Pero con cada obstáculo superado, la sensación de poder hacer más crecía.

Estudié flujo en redes, modelos probabilísticos, las bases de lo que hoy llamamos redes neuronales. Y algo empezó a tomar forma.

### La Mirada Holística
Siempre existe esa crítica hacia los ingenieros industriales: "son océanos de conocimiento con un metro de profundidad". Que saben un poco de todo y nada a fondo. Nunca lo creí. Lo que en realidad se construye es una mirada holística, la capacidad de entender un negocio desde la estrategia hasta la operación, de conectar puntos que otros no ven. Y esa mirada me llevó a encontrar mi foco: la optimización de operaciones.

Fue así como llegué a mi tesis y a certificarme como Green Belt, aplicando Six Sigma en hospitales para mejorar la atención de pacientes adultos mayores con fractura de cadera. Cuando vi que los tiempos de estancia se reducían, que la calidad mejoraba, que personas reales podían salir antes del hospital con mayor bienestar... sentí algo que la ecuación más elegante nunca me había dado: la certeza de que lo que estudio importa. Que sirve. Que llega a alguien.

### Un Capítulo Diferente
A finales de 2014 tomé un camino diferente, uno en el que quise contribuir al crecimiento del país desde otro ángulo. No profundizaré en ello, pero fue un capítulo que también me formó.

### Twinlu: Construir y Soltar
Luego llegó 2020. El mundo se detenía y yo, paradójicamente, quería construir algo. Nació Twinlu, una empresa con una misión que me movía por dentro: cerrar la brecha digital en los negocios de Latinoamérica a través de software a la medida. Dos años, más de 50 proyectos, desde e-commerce hasta dashboards ejecutivos, clientes en toda la región. Fue hermoso y agotador al mismo tiempo. Enfrentamos desafíos individuales, colectivos, del entorno. Y finalmente, Twinlu cerró.

Cerrar una empresa que uno mismo fundó duele de una manera difícil de describir. Pero las enseñanzas que dejó —en mí y en el equipo— fueron más grandes que el dolor del cierre.

### El Botoncito de inDrive
Entonces llegó uno de los retos más intensos de mi carrera: hacer crecer "un botoncito" dentro de una app llamada inDrive. Ese botón era un negocio P2P y B2B de envíos, gestionado por couriers en mercados donde la marca era desconocida, la confianza había que ganársela todos los días y la competencia no perdonaba. Desde lo estratégico, desde el marketing, desde la tecnología —con sus fortalezas y sus límites— había que construir algo desde prácticamente cero.

Lo que vino fue un aprendizaje absoluto. Coordiné equipos de marketing, producto, estrategia, finanzas, copywriting, ventas y adquisición de proveedores, articulando un portafolio de proyectos que debían convivir y potenciarse mutuamente. Ningún proyecto se ejecutaba sin una base sólida de datos: trabajé con matemáticos rusos expertos en modelos estadísticos que permitían crear, validar y optimizar de forma iterativa.

Y de fondo, un reto constante que pocas veces se menciona: la curva de aprendizaje tecnológico nunca para. Aprender a moverse dentro de la suite de Google —BigQuery, Looker Studio, Vertex AI— fue un proceso que llevó tiempo, errores y madrugadas. Lo mismo con Microsoft Azure: entender sus arquitecturas, sus servicios cognitivos, sus pipelines de datos, sus capacidades de MLOps. Nadie te lo explica todo de un golpe. Lo vas descubriendo en el camino, muchas veces con más preguntas que respuestas. Y eso está bien. Porque cada herramienta dominada abre una puerta que antes ni sabías que existía.

Viajé, conocí nuevos mercados, nuevas culturas, nuevas formas de ver el negocio. Y eso me hizo madurar de una manera que ningún curso podría haberme dado.

### Modelos en Producción
En ese contexto volví a reencontrarme con la estadística, pero desde un lugar muy distinto. Ya no era el estudiante frente a las fórmulas: era alguien que entendía para qué servían. Fue ahí donde construí mis primeros agentes con modelos GPT para resolver problemas de clientes B2B, aumentando satisfacción, fidelización e ingresos por recurrencia. Vivimos también la transición de una arquitectura monolítica a microservicios —enorme desafío, logrado con éxito— y pusimos en producción modelos de machine learning para optimizar precios dinámicamente: demanda, clima, tráfico, precios de competidores, precio de gasolina, fluctuación del dólar. Todo en tiempo real. Ese momento, ver esos modelos corriendo en producción e impactando el negocio, fue una de las satisfacciones más profundas de mi vida profesional.

### El Presente: RippleNami y el Nuevo Ecosistema
Ese capítulo cerró en 2024. Y en 2025 empezó uno nuevo: como Director of Data Strategy & AI en RippleNami, con operaciones en EE. UU. y África, liderando equipos de Data Scientists y MLOps, diseñando estrategias de datos end-to-end, reduciendo en un 40% la latencia de entrega de KPIs y llevando modelos de machine learning a producción para optimizar precios de alquiler de propiedades.

Hoy, además, el ecosistema de herramientas ha cambiado de una forma que todavía me sorprende. Herramientas como Claude Code o Google Antigravity han redefinido lo que es posible hacer en un día de trabajo. Cosas que antes tomaban semanas de desarrollo ahora toman horas. Proyectos que requerían un equipo entero hoy pueden iniciarse desde una sola ventana de terminal con la instrucción correcta. No es magia, es la combinación de años de experiencia con herramientas que finalmente están a la altura de los problemas que siempre quisimos resolver. Y eso, lejos de quitarle mérito al camino recorrido, lo hace aún más valioso: porque saber *qué pedirle* a una herramienta poderosa requiere entender a fondo el problema, el dato, el negocio.

El camino hasta aquí —desde aquellas ecuaciones que no entendía en Los Andes hasta los modelos corriendo en producción a escala global— no fue recto ni fácil. Tuvo frustraciones, cierres, dudas, herramientas que no entendía, documentación en inglés técnico a las 2 de la mañana, y también victorias que nadie más puede ver pero que uno lleva adentro.

Y en todo ese camino, hay un hilo conductor que nunca cambió: la convicción de que los datos, bien usados, pueden mejorar la vida de las personas. Lo vi en los hospitales. Lo vi en los couriers que entregaban más rápido. Lo sigo viendo cada vez que un modelo en producción toma una mejor decisión.

Eso es lo que me mueve. Eso es lo que soy.
            `
        },
        tags: ["Career Journey", "AI & Data", "Optimization", "Leadership", "Tools & Learning"],
    }
];
