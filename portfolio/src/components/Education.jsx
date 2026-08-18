import { memo } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { content } from '../data/content'
import Card from './Card'
import SectionTitle from './SectionTitle'
import { motion } from 'framer-motion'

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
    }
}

const EducationCard = memo(function EducationCard({ edu }) {
    const { t } = useLanguage()

    return (
        <motion.div variants={cardVariants} className="h-full">
            <Card className="glass-card h-full overflow-hidden border border-border dark:border-white/10 hover:border-secondary dark:hover:border-secondary flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 rounded-2xl">
                <div className="bg-gradient-to-r from-primary via-slate-900 to-primary-dark dark:from-slate-950 dark:to-primary text-white p-6 sm:p-7 border-b border-white/10 flex items-start justify-between gap-4">
                    <div>
                        <h3 className="font-heading text-lg sm:text-xl font-bold mb-1 tracking-tight text-white">
                            {t(edu.title.en, edu.title.es)}
                        </h3>
                        <span className="text-xs sm:text-sm text-accent dark:text-emerald-400 font-medium">
                            {edu.institution}
                        </span>
                    </div>
                    {edu.badge && (
                        <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-white/10 text-white border border-white/10 shrink-0">
                            {edu.badge}
                        </span>
                    )}
                </div>
                <div className="p-6 sm:p-7 flex-grow">
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                        {t(edu.description.en, edu.description.es)}
                    </p>
                </div>
            </Card>
        </motion.div>
    )
})

export default function Education() {
    const { t } = useLanguage()

    return (
        <section id="education" className="py-16 md:py-24 bg-bg-section dark:bg-slate-900/60 content-vis-auto relative">
            <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle>{t("Academic Background & Credentials", "Formación Académica & Credenciales")}</SectionTitle>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-12"
                >
                    {content.education.map((edu) => (
                        <EducationCard key={edu.institution + edu.title.en} edu={edu} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
