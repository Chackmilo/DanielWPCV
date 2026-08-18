import { memo } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { content } from '../data/content'
import SectionTitle from './SectionTitle'
import { BriefcaseIcon, MapPinIcon } from './Icons'
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

const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 120, damping: 18 }
    }
}

const TimelineCard = memo(function TimelineCard({ item, index }) {
    const { t } = useLanguage()

    return (
        <motion.div
            variants={itemVariants}
            className="relative flex flex-col md:flex-row gap-6 md:gap-8 items-start group"
        >
            {/* Timeline Spine Node */}
            <div className="hidden md:flex flex-col items-center shrink-0 w-16 pt-1">
                <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-4 border-bg-light dark:border-bg-dark transition-all duration-300 shadow-md ${item.isCurrent
                        ? 'bg-accent shadow-glow-emerald scale-110'
                        : 'bg-secondary dark:bg-indigo-500'
                        }`}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                </div>
                {index < content.timeline.length - 1 && (
                    <div className="w-0.5 h-full min-h-[140px] bg-gradient-to-b from-secondary/40 via-accent/30 to-border dark:to-white/5 my-2"></div>
                )}
            </div>

            {/* Content Card */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 flex-grow border border-border dark:border-white/10 hover:border-secondary dark:hover:border-secondary transition-all duration-300 hover:shadow-xl w-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-heading text-xl sm:text-2xl font-bold text-primary dark:text-white">
                                {item.company}
                            </span>
                            {item.isCurrent && (
                                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                                    {t("Current Role", "Rol Actual")}
                                </span>
                            )}
                        </div>
                        <h4 className="text-secondary dark:text-accent font-semibold text-base sm:text-lg">
                            {t(item.role.en, item.role.es)}
                        </h4>
                    </div>

                    <div className="flex flex-col sm:items-end gap-1 shrink-0">
                        <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg border border-border dark:border-white/10">
                            <BriefcaseIcon size={14} />
                            {item.period}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <MapPinIcon size={13} className="text-accent" />
                            {item.location}
                        </span>
                    </div>
                </div>

                {/* Achievements List */}
                <ul className="list-none p-0 my-4 flex flex-col gap-2">
                    {item.achievements.map((ach, aIdx) => (
                        <li key={aIdx} className="text-sm sm:text-base text-gray-700 dark:text-gray-300 flex items-start gap-2.5 leading-relaxed">
                            <span className="text-accent dark:text-emerald-400 font-bold shrink-0 mt-0.5">▹</span>
                            <span>{t(ach.en, ach.es)}</span>
                        </li>
                    ))}
                </ul>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-4 mt-2 border-t border-border dark:border-white/10">
                    {item.tech.map((tag) => (
                        <span
                            key={tag}
                            className="bg-slate-100/80 dark:bg-slate-800/80 text-gray-700 dark:text-gray-300 text-xs px-2.5 py-1 rounded-md font-medium border border-border dark:border-white/5"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
})

export default function CareerTimeline() {
    const { t } = useLanguage()

    return (
        <section id="timeline" className="py-16 md:py-24 bg-white dark:bg-bg-dark content-vis-auto relative">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle>{t("Career Trajectory & Milestones", "Trayectoria Profesional & Hitos")}</SectionTitle>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="flex flex-col gap-6 sm:gap-8 mt-12"
                >
                    {content.timeline.map((item, index) => (
                        <TimelineCard key={item.id} item={item} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
