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
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 120, damping: 18 }
    }
}

export default function Certifications() {
    const { t } = useLanguage()

    return (
        <section id="certifications" className="py-16 md:py-24 bg-bg-section dark:bg-slate-900/60 content-vis-auto relative">
            <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle>{t("Executive Certifications & Specializations", "Certificaciones Ejecutivas & Especializaciones")}</SectionTitle>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12"
                >
                    {content.certifications.map((cat) => (
                        <motion.div key={cat.category.en} variants={cardVariants} className="h-full">
                            <Card className="glass-card p-6 sm:p-8 h-full flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl rounded-2xl border border-border dark:border-white/10 hover:border-secondary dark:hover:border-secondary">
                                <h4 className="text-primary dark:text-white text-lg sm:text-xl mb-5 pb-3 border-b border-border dark:border-white/10 font-heading font-bold">
                                    {t(cat.category.en, cat.category.es)}
                                </h4>
                                <ul className="list-none p-0 flex-grow flex flex-col gap-2.5">
                                    {cat.items.map((item) => (
                                        <li
                                            key={item}
                                            className="py-1.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed border-b border-border/50 dark:border-white/5 last:border-b-0 flex items-start gap-2.5"
                                        >
                                            <span aria-hidden="true" className="text-accent dark:text-emerald-400 text-sm mt-0.5">✦</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
