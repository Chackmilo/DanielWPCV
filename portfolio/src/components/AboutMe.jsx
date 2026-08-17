import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { content } from '../data/content'
import { LinkedInIcon, WhatsAppIcon, GitHubIcon, DocumentTextIcon, CalendarIcon, CopyIcon } from './Icons'
import Toast from './Toast'
import { motion } from 'framer-motion'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1, y: 0,
        transition: { type: "spring", stiffness: 100, damping: 20 }
    }
}

export default function AboutMe() {
    const { t } = useLanguage()
    const about = content.about
    const [toastMessage, setToastMessage] = useState('')
    const [showToast, setShowToast] = useState(false)

    const copyToClipboard = (text, label) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text)
            setToastMessage(`${label} ${t('copied to clipboard!', '¡copiado al portapapeles!')}`)
            setShowToast(true)
            setTimeout(() => setShowToast(false), 3000)
        }
    }

    return (
        <section id="about" className="py-16 bg-bg-section-alt dark:bg-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-gradient-subtle" />

            <div className="max-w-[1200px] mx-auto px-8 relative">
                {/* Header: Image + Title side by side */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row items-center gap-8 mb-10 text-center md:text-left"
                >
                    <div className="relative group">
                        <picture>
                            <source srcSet="/profile.webp" type="image/webp" />
                            <img
                                src="/profile.jpg"
                                alt="Daniel Camilo Pardo Figueroa"
                                width="140"
                                height="140"
                                loading="eager"
                                fetchPriority="high"
                                className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover shadow-lg border-4 border-white dark:border-slate-800 transition-transform duration-300 group-hover:scale-105"
                            />
                        </picture>
                        <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full animate-pulse" title="Available for roles"></span>
                    </div>

                    <div>
                        <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-primary dark:text-white leading-tight">
                            Daniel Camilo Pardo Figueroa
                        </h1>
                        <p className="text-secondary dark:text-accent font-semibold text-lg md:text-xl mt-1">
                            {t(about.subtitle.en, about.subtitle.es)}
                        </p>
                    </div>
                </motion.div>

                {/* KPI Metrics Dashboard Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
                >
                    <div className="glass-card rounded-xl p-4 text-center border-t-2 border-emerald-500 shadow-sm">
                        <span className="block text-2xl md:text-3xl font-extrabold font-heading text-emerald-500">~40%</span>
                        <span className="text-xs uppercase tracking-wider font-semibold text-gray-600 dark:text-gray-400">{t("KPI Latency Reduction", "Reducción Latencia KPIs")}</span>
                    </div>
                    <div className="glass-card rounded-xl p-4 text-center border-t-2 border-cyan-500 shadow-sm">
                        <span className="block text-2xl md:text-3xl font-extrabold font-heading text-cyan-500">1.5x</span>
                        <span className="text-xs uppercase tracking-wider font-semibold text-gray-600 dark:text-gray-400">{t("LATAM GMV Growth", "Crecimiento GMV LATAM")}</span>
                    </div>
                    <div className="glass-card rounded-xl p-4 text-center border-t-2 border-indigo-500 shadow-sm">
                        <span className="block text-2xl md:text-3xl font-extrabold font-heading text-indigo-500">30x</span>
                        <span className="text-xs uppercase tracking-wider font-semibold text-gray-600 dark:text-gray-400">{t("Query Optimization", "Optimización de Consultas")}</span>
                    </div>
                    <div className="glass-card rounded-xl p-4 text-center border-t-2 border-amber-500 shadow-sm">
                        <span className="block text-2xl md:text-3xl font-extrabold font-heading text-amber-500">99.9%</span>
                        <span className="text-xs uppercase tracking-wider font-semibold text-gray-600 dark:text-gray-400">{t("Data Accuracy (5M+)", "Precisión de Datos (5M+)")}</span>
                    </div>
                </motion.div>

                {/* Content: staggered entrance */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="flex flex-col gap-5"
                >
                    {/* WHO I AM */}
                    <motion.div variants={itemVariants}>
                        <h2 className="text-primary dark:text-white text-lg mb-1 font-semibold">{t(about.whoIAm.title.en, about.whoIAm.title.es)}</h2>
                        <p className="leading-relaxed">{t(about.whoIAm.text.en, about.whoIAm.text.es)}</p>
                    </motion.div>

                    {/* WHAT I DO */}
                    <motion.div variants={itemVariants}>
                        <h2 className="text-primary dark:text-white text-lg mb-1 font-semibold">{t(about.whatIDo.title.en, about.whatIDo.title.es)}</h2>
                        <ul className="list-none flex flex-col gap-1">
                            {about.whatIDo.items.map((item) => (
                                <li key={item.en}>
                                    <span className="text-accent">▹</span> {t(item.en, item.es)}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* IMPACT DELIVERED */}
                    <motion.div variants={itemVariants}>
                        <h2 className="text-primary dark:text-white text-lg mb-1 font-semibold">{t(about.impact.title.en, about.impact.title.es)}</h2>
                        <ul className="list-none flex flex-col gap-1">
                            {about.impact.items.map((item) => (
                                <li key={item.en}><span aria-hidden="true">✔</span> {t(item.en, item.es)}</li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* TECH STACK */}
                    <motion.div variants={itemVariants}>
                        <h2 className="text-primary dark:text-white text-lg mb-1 font-semibold">{t(about.techStack.title.en, about.techStack.title.es)}</h2>
                        <p className="leading-relaxed">{t(about.techStack.text.en, about.techStack.text.es)}</p>
                    </motion.div>

                    {/* CERTIFICATIONS & LANGUAGES */}
                    <motion.div variants={itemVariants}>
                        <h2 className="text-primary dark:text-white text-lg mb-1 font-semibold">{t(about.certificationsSummary.title.en, about.certificationsSummary.title.es)}</h2>
                        <p className="leading-relaxed">{t(about.certificationsSummary.text.en, about.certificationsSummary.text.es)}</p>
                    </motion.div>

                    {/* OPEN TO & CTAS */}
                    <motion.div variants={itemVariants} className="bg-primary/5 dark:bg-white/5 p-5 rounded-lg border-l-4 border-accent mt-2">
                        <h2 className="text-primary dark:text-white text-base font-semibold mb-2">{t(about.openTo.title.en, about.openTo.title.es)}</h2>
                        <p className="font-medium mb-3">{t(about.openTo.text.en, about.openTo.text.es)}</p>
                        <div className="flex gap-2.5 flex-wrap">
                            {about.contact.cv && (
                                <a href={about.contact.cv} target="_blank" rel="noopener noreferrer"
                                    download="CV_Daniel_Pardo.pdf"
                                    aria-label={t("Download CV (PDF)", "Descargar CV (PDF)")}
                                    className="inline-flex items-center gap-1.5 py-2 px-4 rounded-md text-sm font-semibold text-white bg-accent hover:bg-emerald-600 transition-colors no-underline outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent shadow-sm">
                                    <DocumentTextIcon /> {t("Download CV", "Descargar CV")}
                                </a>
                            )}
                            <a href={`mailto:${about.contact.email}?subject=Strategy%20%26%20Leadership%20Inquiry%20-%20Daniel%20Pardo`}
                                aria-label={t("Schedule Strategy Call", "Agendar Consulta Estratégica")}
                                className="inline-flex items-center gap-1.5 py-2 px-4 rounded-md text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors no-underline outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 shadow-sm">
                                <CalendarIcon /> {t("Schedule 1:1 Call", "Agendar 1:1")}
                            </a>
                            <a href={about.contact.linkedin} target="_blank" rel="noopener noreferrer"
                                aria-label="LinkedIn Profile"
                                className="inline-flex items-center gap-1.5 py-2 px-4 rounded-md text-sm font-semibold text-white bg-linkedin hover:bg-linkedin-hover transition-colors no-underline outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-linkedin shadow-sm">
                                <LinkedInIcon /> LinkedIn
                            </a>
                            <a href={about.contact.whatsapp} target="_blank" rel="noopener noreferrer"
                                aria-label="WhatsApp Contact"
                                className="inline-flex items-center gap-1.5 py-2 px-4 rounded-md text-sm font-semibold text-white bg-whatsapp hover:bg-whatsapp-hover transition-colors no-underline outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-whatsapp shadow-sm">
                                <WhatsAppIcon /> WhatsApp
                            </a>
                            {about.contact.github && (
                                <a href={about.contact.github} target="_blank" rel="noopener noreferrer"
                                    aria-label="GitHub Profile"
                                    className="inline-flex items-center gap-1.5 py-2 px-4 rounded-md text-sm font-semibold text-white bg-github hover:bg-github-hover transition-colors no-underline outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-github shadow-sm">
                                    <GitHubIcon /> GitHub
                                </a>
                            )}
                        </div>
                    </motion.div>

                    {/* Contact Info Card */}
                    <motion.div variants={itemVariants} className="p-6 bg-white dark:bg-slate-800 border-l-4 border-accent rounded shadow-sm">
                        <p className="my-1"><strong>{t("Location:", "Ubicación:")}</strong> {about.contact.location}</p>
                        <p className="my-1 flex items-center gap-2 flex-wrap">
                            <strong>{t("Email:", "Email:")}</strong>
                            <a href={`mailto:${about.contact.email}`} className="text-secondary font-semibold hover:text-accent hover:underline transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-1">{about.contact.email}</a>
                            <button
                                onClick={() => copyToClipboard(about.contact.email, 'Email')}
                                aria-label={t("Copy email address", "Copiar correo electrónico")}
                                className="inline-flex items-center gap-1 text-xs py-1 px-2.5 rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                            >
                                <CopyIcon size={13} /> {t("Copy", "Copiar")}
                            </button>
                        </p>
                        <p className="my-1"><strong>{t("Phone:", "Teléfono:")}</strong> {about.contact.phone}</p>
                        <p className="my-1"><strong>LinkedIn:</strong> <a href={about.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-secondary dark:text-accent font-semibold hover:text-accent hover:underline transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-1">Daniel Pardo</a></p>
                        {about.contact.github && (
                            <p className="my-1"><strong>GitHub:</strong> <a href={about.contact.github} target="_blank" rel="noopener noreferrer" className="text-secondary dark:text-accent font-semibold hover:text-accent hover:underline transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-1">Chackmilo</a></p>
                        )}
                    </motion.div>
                </motion.div>
            </div>

            <Toast
                message={toastMessage}
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </section>
    )
}
