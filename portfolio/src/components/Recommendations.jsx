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

const RecCard = memo(function RecCard({ rec }) {
    const { t } = useLanguage()

    return (
        <motion.div variants={cardVariants} className="h-full">
            <Card className="glass-card p-6 sm:p-8 border border-border dark:border-white/10 hover:border-secondary dark:hover:border-secondary transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl flex flex-col justify-between h-full">
                <div className="mb-4">
                    <div className="text-secondary dark:text-accent text-2xl font-serif mb-2">“</div>
                    <p className="text-sm sm:text-base leading-relaxed italic text-gray-700 dark:text-gray-300">
                        {t(rec.text.en, rec.text.es)}
                    </p>
                </div>
                <div className="pt-4 border-t border-border dark:border-white/10">
                    <h3 className="text-primary dark:text-white text-base sm:text-lg font-bold font-heading">
                        {rec.name}
                    </h3>
                    <span className="text-secondary dark:text-accent text-xs sm:text-sm font-semibold">
                        {rec.role}
                    </span>
                </div>
            </Card>
        </motion.div>
    )
})

export default function Recommendations() {
    const { t } = useLanguage()

    return (
        <section id="recommendations" className="py-16 md:py-24 bg-white dark:bg-bg-dark content-vis-auto relative">
            <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle>{t("Executive Endorsements", "Recomendaciones Ejecutivas")}</SectionTitle>

                {/* Recommendations grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 mb-16"
                >
                    {content.recommendations.map((rec) => (
                        <RecCard key={rec.name} rec={rec} />
                    ))}
                </motion.div>

                {/* AI Interactive Chatbot Section */}
                <div className="mt-16 pt-8 border-t border-border dark:border-white/10">
                    <div className="text-center max-w-xl mx-auto mb-8">
                        <span className="text-xs font-bold uppercase tracking-widest text-secondary dark:text-accent block mb-1">
                            {t("Interactive Experience", "Experiencia Interactiva")}
                        </span>
                        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-primary dark:text-white">
                            {t("Chat with Nabla AI", "Conversa con Nabla IA")}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            {t(
                                "Ask questions directly about Daniel's leadership, datalakehouse architectures, or business impact.",
                                "Consulta directamente sobre el liderazgo de Daniel, arquitecturas datalakehouse o impacto de negocio."
                            )}
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="max-w-2xl mx-auto"
                    >
                        <ChatInterface />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
