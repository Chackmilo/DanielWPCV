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
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1, scale: 1, y: 0,
        transition: { type: "spring", stiffness: 100, damping: 20 }
    }
}

function EducationCard({ edu }) {
    const { t } = useLanguage()

    return (
        <motion.div variants={cardVariants} className="h-full">
            <Card className="h-full overflow-hidden border border-border dark:border-slate-700 hover:border-secondary dark:hover:border-secondary flex flex-col bg-white dark:bg-slate-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="bg-primary dark:bg-slate-900 text-white p-8 border-b-[3px] border-secondary">
                    <h3 className="font-heading text-2xl font-bold mb-1">{t(edu.title.en, edu.title.es)}</h3>
                    <span className="text-[0.9rem] opacity-90 italic">{edu.institution}</span>
                </div>
                <div className="p-8 flex-grow">
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{t(edu.description.en, edu.description.es)}</p>
                </div>
            </Card>
        </motion.div>
    )
}

export default function Education() {
    const { t } = useLanguage()

    return (
        <section id="education" className="py-16 bg-bg-section dark:bg-slate-900 content-vis-auto">
            <div className="max-w-[1200px] mx-auto px-8">
                <SectionTitle>{t("Education", "Educación")}</SectionTitle>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
                >
                    {content.education.map((edu) => (
                        <EducationCard key={edu.institution} edu={edu} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
