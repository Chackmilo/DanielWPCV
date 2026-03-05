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
    'cpu': CpuIcon,
    'terminal': TerminalIcon,
    'users': UsersIcon,
    'database': DatabaseIcon,
}

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
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1, y: 0,
        transition: { type: "spring", stiffness: 100, damping: 20 }
    }
}

const SkillCard = memo(function SkillCard({ skill }) {
    const { t } = useLanguage()
    const Icon = skillIconMap[skill.icon]

    return (
        <motion.div variants={cardVariants} className="h-full">
            <Card className="h-full p-8 text-center border-t-4 border-transparent hover:border-secondary transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-slate-800 dark:border-slate-700 dark:hover:border-secondary">
                <div className="text-secondary dark:text-accent mb-4 flex justify-center">{Icon && <Icon />}</div>
                <h3 className="font-heading text-primary dark:text-white text-xl font-bold mb-4">{t(skill.title.en, skill.title.es)}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">{t(skill.description.en, skill.description.es)}</p>
            </Card>
        </motion.div>
    )
})

export default function Skills() {
    const { t } = useLanguage()

    return (
        <section id="skills" className="py-16 bg-white dark:bg-primary">
            <div className="max-w-[1200px] mx-auto px-8">
                <SectionTitle>{t("Skills & Expertise", "Habilidades y Experiencia")}</SectionTitle>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
                >
                    {content.skills.map((skill) => (
                        <SkillCard key={skill.icon} skill={skill} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
