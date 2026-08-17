import { memo } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { content } from '../data/content'
import Card from './Card'
import SectionTitle from './SectionTitle'
import { STAR_SPLIT_RE, STAR_TEST_RE } from '../utils/constants'
import { motion } from 'framer-motion'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        }
    }
}

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1, y: 0,
        transition: { type: "spring", stiffness: 100, damping: 20 }
    }
}

const ProjectCard = memo(function ProjectCard({ project }) {
    const { t } = useLanguage()

    const formatDescription = (text) => {
        if (!text) return null;
        const parts = text.split(STAR_SPLIT_RE);
        return parts.map((part, index) => {
            if (STAR_TEST_RE.test(part)) {
                return <span key={index} className="block mt-4 text-base font-bold text-primary dark:text-white">{part}</span>;
            }
            return <span key={index} className="text-base text-gray-700 dark:text-gray-300">{part}</span>;
        });
    }

    return (
        <motion.div variants={cardVariants} className="h-full">
            <Card className="glass-card h-full overflow-hidden border border-border dark:border-white/10 hover:border-secondary dark:hover:border-secondary flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="bg-primary dark:bg-slate-950 text-white p-6 border-b-2 border-secondary flex flex-col gap-1">
                    <h3 className="font-heading text-xl font-bold">{project.company.split(' (')[0]}</h3>
                    <span className="text-base font-medium text-accent">{project.title}</span>
                    <span className="text-[0.85rem] opacity-75">{project.company.includes('(') ? '(' + project.company.split('(')[1] : ''}</span>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                    <p className="leading-relaxed mb-8 flex-grow text-gray-700 dark:text-gray-300">
                        {formatDescription(t(project.description.en, project.description.es))}
                    </p>
                    <div className="flex flex-wrap gap-2.5 mb-6">
                        {project.metrics.map((m, i) => (
                            <span key={i} className="bg-emerald-500/10 dark:bg-emerald-400/10 py-1.5 px-3 rounded-lg text-sm font-bold text-accent border border-accent/20">
                                {m.value && <strong className="text-base mr-1">{m.value}</strong>} {t(m.label.en, m.label.es)}
                            </span>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-border dark:border-white/5">
                        {project.tech.map((tag) => (
                            <span key={tag} className="bg-slate-100 dark:bg-slate-800/80 text-gray-700 dark:text-gray-300 font-medium text-xs px-2.5 py-1 rounded-full border border-border dark:border-white/5">{tag}</span>
                        ))}
                    </div>
                </div>
            </Card>
        </motion.div>
    )
})

export default function Projects() {
    const { t } = useLanguage()

    return (
        <section id="projects" className="py-16 bg-bg-section dark:bg-slate-900 content-vis-auto">
            <div className="max-w-[1400px] mx-auto px-6">
                <SectionTitle>{t("Featured Projects", "Proyectos Destacados")}</SectionTitle>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
                >
                    {content.projects.map((project) => (
                        <ProjectCard key={project.company} project={project} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
