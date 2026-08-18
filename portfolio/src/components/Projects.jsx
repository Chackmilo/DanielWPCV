import { useState, useMemo, memo } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { content } from '../data/content'
import Card from './Card'
import SectionTitle from './SectionTitle'
import { STAR_SPLIT_RE, STAR_TEST_RE } from '../utils/constants'
import { motion, AnimatePresence } from 'framer-motion'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05,
        }
    }
}

const cardVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: "spring", stiffness: 120, damping: 18 }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.2 }
    }
}

const ProjectCard = memo(function ProjectCard({ project }) {
    const { t } = useLanguage()

    const formatDescription = (text) => {
        if (!text) return null
        const parts = text.split(STAR_SPLIT_RE)
        return parts.map((part, index) => {
            if (STAR_TEST_RE.test(part)) {
                const isResult = /Result:|Resultado:/i.test(part)
                return (
                    <span
                        key={index}
                        className={`block mt-3.5 mb-1 font-bold text-xs uppercase tracking-wider ${isResult ? 'text-accent dark:text-emerald-400' : 'text-secondary dark:text-indigo-400'
                            }`}
                    >
                        {part}
                    </span>
                )
            }
            return (
                <span key={index} className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {part}
                </span>
            )
        })
    }

    return (
        <motion.div
            layout
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="h-full"
        >
            <Card className="glass-card h-full overflow-hidden border border-border dark:border-white/10 hover:border-secondary dark:hover:border-secondary flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 rounded-2xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary via-slate-900 to-primary-dark dark:from-slate-950 dark:to-primary text-white p-6 border-b border-white/10 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                        <h3 className="font-heading text-xl font-bold tracking-tight text-white">
                            {project.company.split(' (')[0]}
                        </h3>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 font-medium">
                            {project.company.includes('(') ? '(' + project.company.split('(')[1] : ''}
                        </span>
                    </div>
                    <span className="text-sm font-semibold text-accent dark:text-emerald-400">
                        {project.title}
                    </span>
                </div>

                {/* Body with STAR content */}
                <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                    <div className="mb-6">
                        {formatDescription(t(project.description.en, project.description.es))}
                    </div>

                    <div>
                        {/* Metrics Pills */}
                        <div className="flex flex-wrap gap-2 mb-5">
                            {project.metrics.map((m, i) => (
                                <span
                                    key={i}
                                    className="bg-emerald-500/10 dark:bg-emerald-400/10 py-1.5 px-3 rounded-lg text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 shadow-xs"
                                >
                                    {m.value && <strong className="text-sm sm:text-base mr-1">{m.value}</strong>}
                                    {t(m.label.en, m.label.es)}
                                </span>
                            ))}
                        </div>

                        {/* Tech Badges */}
                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border dark:border-white/10">
                            {project.tech.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-slate-100 dark:bg-slate-800/90 text-gray-700 dark:text-gray-300 font-medium text-xs px-2.5 py-1 rounded-md border border-border dark:border-white/5"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    )
})

export default function Projects() {
    const { t } = useLanguage()
    const [selectedCategory, setSelectedCategory] = useState('all')

    const categories = content.projectCategories || [
        { id: "all", label: { en: "All Projects", es: "Todos los Proyectos" } },
        { id: "data-strategy", label: { en: "Data Strategy & Lakehouse", es: "Estrategia de Datos & Lakehouse" } },
        { id: "ai-agents", label: { en: "AI Agents & GenAI", es: "Agentes IA & GenAI" } },
        { id: "product-growth", label: { en: "Product & Growth", es: "Producto & Crecimiento" } },
    ]

    const filteredProjects = useMemo(() => {
        if (selectedCategory === 'all') return content.projects
        return content.projects.filter(p => p.category === selectedCategory)
    }, [selectedCategory])

    return (
        <section id="projects" className="py-16 md:py-24 bg-bg-section dark:bg-slate-900/60 content-vis-auto relative">
            <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle>{t("Featured Strategic Projects", "Proyectos Estratégicos Destacados")}</SectionTitle>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-8 mb-12">
                    {categories.map((cat) => {
                        const isActive = selectedCategory === cat.id
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent ${isActive
                                    ? 'bg-secondary text-white shadow-md shadow-indigo-500/25 scale-[1.02]'
                                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-border dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-700'
                                    }`}
                            >
                                {t(cat.label.en, cat.label.es)}
                            </button>
                        )
                    })}
                </div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.company + project.title} project={project} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}
