import { memo } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { content } from '../data/content'
import Card from './Card'
import SectionTitle from './SectionTitle'
import { TrendingUpIcon, PieChartIcon, CpuIcon, TerminalIcon, UsersIcon, DatabaseIcon } from './Icons'
import { motion } from 'framer-motion'

const skillIconMap = {
    'trending-up': TrendingUpIcon,
    'pie-chart': PieChartIcon,
    cpu: CpuIcon,
    terminal: TerminalIcon,
    users: UsersIcon,
    database: DatabaseIcon,
}

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
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 120, damping: 18 }
    }
}

const SkillCard = memo(function SkillCard({ skill }) {
    const { t } = useLanguage()
    const Icon = skillIconMap[skill.icon] || DatabaseIcon

    return (
        <motion.div variants={cardVariants} className="h-full">
            <Card className="glass-card h-full p-6 sm:p-8 rounded-2xl border border-border dark:border-white/10 hover:border-secondary dark:hover:border-secondary transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3.5 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-accent flex items-center justify-center shrink-0">
                            <Icon size={24} />
                        </div>
                        <h3 className="font-heading text-primary dark:text-white text-lg sm:text-xl font-bold leading-tight">
                            {t(skill.title.en, skill.title.es)}
                        </h3>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                        {t(skill.description.en, skill.description.es)}
                    </p>
                </div>

                {/* Tool Badges */}
                {skill.tools && (
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border dark:border-white/10">
                        {skill.tools.map((tool) => (
                            <span
                                key={tool}
                                className="bg-slate-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 text-xs px-2.5 py-1 rounded-md font-semibold border border-border dark:border-white/5 shadow-2xs hover:bg-secondary hover:text-white dark:hover:bg-secondary dark:hover:text-white transition-colors cursor-default"
                            >
                                {tool}
                            </span>
                        ))}
                    </div>
                )}
            </Card>
        </motion.div>
    )
})

export default function Skills() {
    const { t } = useLanguage()

    return (
        <section id="skills" className="py-16 md:py-24 bg-bg-light dark:bg-bg-dark content-vis-auto relative">
            <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle>{t("Skills & Strategic Capabilities", "Habilidades y Capacidades Estratégicas")}</SectionTitle>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12"
                >
                    {content.skills.map((skill) => (
                        <SkillCard key={skill.icon + skill.title.en} skill={skill} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
