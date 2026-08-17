import { memo } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { content } from '../data/content'
import Card from './Card'
import SectionTitle from './SectionTitle'
import ChatInterface from './ChatInterface'
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
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1, scale: 1, y: 0,
        transition: { type: "spring", stiffness: 100, damping: 20 }
    }
}

const RecCard = memo(function RecCard({ rec }) {
    const { t } = useLanguage()

    return (
        <motion.div variants={cardVariants} className="h-full">
            <Card className="glass-card p-8 border-t-2 border-secondary hover:border-accent transition-all duration-300 hover:shadow-xl hover:-translate-y-2 rounded-2xl">
                <div className="mb-4">
                    <h3 className="text-primary dark:text-white text-xl font-bold mb-1 font-heading">{rec.name}</h3>
                    <span className="text-secondary dark:text-accent text-sm font-semibold">{rec.role}</span>
                </div>
                <p className="text-base leading-relaxed italic text-gray-600 dark:text-gray-300">&ldquo;{t(rec.text.en, rec.text.es)}&rdquo;</p>
            </Card>
        </motion.div>
    )
})

export default function Recommendations() {
    const { t } = useLanguage()

    return (
        <section id="recommendations" className="py-16 bg-white dark:bg-primary content-vis-auto">
            <div className="max-w-[1200px] mx-auto px-8">
                <SectionTitle>{t("Recommendations", "Recomendaciones")}</SectionTitle>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid gap-8 mb-16"
                >
                    {content.recommendations.map((rec) => (
                        <RecCard key={rec.name} rec={rec} />
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md mx-auto"
                >
                    <ChatInterface />
                </motion.div>
            </div>
        </section>
    )
}
