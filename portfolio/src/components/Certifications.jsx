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

export default function Certifications() {
    const { t } = useLanguage()

    return (
        <section id="certifications" className="py-16 bg-bg-section dark:bg-slate-900 content-vis-auto">
            <div className="max-w-[1200px] mx-auto px-8">
                <SectionTitle>{t("Certifications", "Certificaciones")}</SectionTitle>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                >
                    {content.certifications.map((cat) => (
                        <motion.div key={cat.category.en} variants={cardVariants} className="h-full">
                            <Card className="p-8 h-full flex flex-col bg-white dark:bg-slate-800 border-transparent dark:border-slate-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                                <h4 className="text-primary dark:text-white text-xl mb-8 pb-2 border-b-2 border-secondary dark:border-slate-600 font-bold">
                                    {t(cat.category.en, cat.category.es)}
                                </h4>
                                <ul className="list-none p-0 flex-grow">
                                    {cat.items.map((item, j) => (
                                        <li key={j} className="py-2 text-base text-gray-700 dark:text-gray-300 leading-relaxed border-b border-bg-section dark:border-slate-700 last:border-b-0">
                                            <span aria-hidden="true">✅</span> {item}
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
