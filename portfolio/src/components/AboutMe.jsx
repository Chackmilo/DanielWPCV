import { useState, useCallback } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { content } from '../data/content'
import {
    LinkedInIcon,
    WhatsAppIcon,
    GitHubIcon,
    DocumentTextIcon,
    CalendarIcon,
    CopyIcon,
    CheckIcon,
    DatabaseIcon,
    CpuIcon,
    TrendingUpIcon,
    SparklesIcon,
    MapPinIcon
} from './Icons'
import Toast from './Toast'
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

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 120, damping: 18 }
    }
}

const pillarIconMap = {
    database: DatabaseIcon,
    cpu: CpuIcon,
    'trending-up': TrendingUpIcon,
}

export default function AboutMe() {
    const { t } = useLanguage()
    const about = content.about
    const [toastMessage, setToastMessage] = useState('')
    const [showToast, setShowToast] = useState(false)
    const [copiedEmail, setCopiedEmail] = useState(false)

    const copyToClipboard = useCallback((text, label) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                setCopiedEmail(true)
                setToastMessage(`${label} ${t('copied to clipboard!', '¡copiado al portapapeles!')}`)
                setShowToast(true)
                setTimeout(() => {
                    setShowToast(false)
                    setCopiedEmail(false)
                }, 3000)
            }).catch(() => {
                // Fallback if needed
            })
        }
    }, [t])

    return (
        <section id="about" className="py-12 md:py-20 bg-bg-light dark:bg-bg-dark relative overflow-hidden">
            {/* Ambient Background Aura Meshes */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-subtle" />

            <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-6 md:gap-8"
                >
                    {/* Top Hero Bento Box: Profile + Executive Bio */}
                    <motion.div
                        variants={itemVariants}
                        className="glass-card rounded-3xl p-6 sm:p-8 lg:p-10 border border-border dark:border-white/10 relative overflow-hidden"
                    >
                        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-10">
                            {/* Avatar with Luminous Status Halo */}
                            <div className="relative shrink-0">
                                <div className="relative group">
                                    <div className="absolute -inset-1.5 bg-gradient-to-r from-secondary via-accent to-accent-cyan rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse-glow" />
                                    <picture>
                                        <source srcSet="/profile.webp" type="image/webp" />
                                        <img
                                            src="/profile.jpg"
                                            alt="Daniel Camilo Pardo Figueroa"
                                            width="160"
                                            height="160"
                                            loading="eager"
                                            fetchPriority="high"
                                            className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full object-cover shadow-2xl border-4 border-white dark:border-slate-900 transition-transform duration-300 group-hover:scale-[1.03]"
                                        />
                                    </picture>
                                </div>

                                {/* Status Dot Badge */}
                                <div className="mt-3.5 flex items-center justify-center gap-2 bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 py-1 px-3 rounded-full shadow-xs">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <span className="text-[11px] sm:text-xs font-bold text-emerald-700 dark:text-emerald-400 tracking-wide uppercase">
                                        {t(about.statusBadge.en, about.statusBadge.es)}
                                    </span>
                                </div>
                            </div>

                            {/* Hero Text & Value Proposition */}
                            <div className="flex-grow text-center lg:text-left flex flex-col justify-center">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3 w-fit mx-auto lg:mx-0">
                                    <SparklesIcon size={14} /> {t("Executive Portfolio", "Portafolio Ejecutivo")}
                                </div>

                                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-primary dark:text-white tracking-tight leading-tight mb-2">
                                    Daniel Camilo Pardo Figueroa
                                </h1>

                                <p className="text-secondary dark:text-accent font-semibold text-lg sm:text-xl lg:text-2xl leading-snug mb-4">
                                    {t(about.subtitle.en, about.subtitle.es)}
                                </p>

                                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed max-w-4xl font-normal mb-4">
                                    {t(about.whoIAm.text.en, about.whoIAm.text.es)}
                                </p>

                                <div className="flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                    <MapPinIcon size={16} className="text-accent" />
                                    <span>{about.contact.location}</span>
                                </div>
                            </div>
                        </div>

                        {/* Fast Action Bar */}
                        <div className="mt-8 pt-6 border-t border-border dark:border-white/10 flex flex-wrap items-center justify-center lg:justify-between gap-3">
                            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                                {about.contact.cv && (
                                    <a
                                        href={about.contact.cv}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download="CV_Daniel_Pardo.pdf"
                                        aria-label={t("Download CV (PDF)", "Descargar CV (PDF)")}
                                        className="inline-flex items-center gap-2 py-2.5 px-4 sm:px-5 rounded-xl text-sm font-bold text-white bg-accent hover:bg-emerald-600 active:scale-95 transition-all shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30"
                                    >
                                        <DocumentTextIcon size={18} />
                                        <span>{t("Download Executive CV", "Descargar CV Ejecutivo")}</span>
                                    </a>
                                )}

                                <a
                                    href={`mailto:${about.contact.email}?subject=Strategy%20%26%20Leadership%20Inquiry%20-%20Daniel%20Pardo`}
                                    aria-label={t("Schedule 1:1 Strategy Call", "Agendar Consulta Estratégica")}
                                    className="inline-flex items-center gap-2 py-2.5 px-4 sm:px-5 rounded-xl text-sm font-bold text-white bg-secondary hover:bg-secondary-hover active:scale-95 transition-all shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30"
                                >
                                    <CalendarIcon size={18} />
                                    <span>{t("Schedule 1:1 Call", "Agendar 1:1")}</span>
                                </a>

                                <button
                                    onClick={() => copyToClipboard(about.contact.email, 'Email')}
                                    aria-label={t("Copy email address", "Copiar correo electrónico")}
                                    className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200 border border-border dark:border-white/10 active:scale-95 transition-all cursor-pointer"
                                >
                                    {copiedEmail ? <CheckIcon size={16} className="text-emerald-500" /> : <CopyIcon size={16} />}
                                    <span>{copiedEmail ? t("Copied!", "¡Copiado!") : t("Copy Email", "Copiar Email")}</span>
                                </button>
                            </div>

                            {/* Social / Direct Connect Badges */}
                            <div className="flex items-center gap-2">
                                <a
                                    href={about.contact.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn Profile"
                                    className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-xl text-xs font-bold text-white bg-linkedin hover:bg-linkedin-hover transition-transform hover:-translate-y-0.5 shadow-sm"
                                >
                                    <LinkedInIcon size={14} />
                                    <span>LinkedIn</span>
                                </a>

                                <a
                                    href={about.contact.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="WhatsApp Contact"
                                    className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-xl text-xs font-bold text-white bg-whatsapp hover:bg-whatsapp-hover transition-transform hover:-translate-y-0.5 shadow-sm"
                                >
                                    <WhatsAppIcon size={14} />
                                    <span>WhatsApp</span>
                                </a>

                                {about.contact.github && (
                                    <a
                                        href={about.contact.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="GitHub Profile"
                                        className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-xl text-xs font-bold text-white bg-github hover:bg-github-hover transition-transform hover:-translate-y-0.5 shadow-sm"
                                    >
                                        <GitHubIcon size={14} />
                                        <span>GitHub</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Bento Metrics Grid: 6 High-Impact Verified KPIs */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
                    >
                        {about.metrics.map((m, idx) => (
                            <div
                                key={idx}
                                className="glass-card rounded-2xl p-4 text-center border-t-2 border-accent dark:border-accent flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div>
                                    <span className="block text-2xl sm:text-3xl font-black font-heading tracking-tight text-primary dark:text-white">
                                        {m.value}
                                    </span>
                                    <span className="block text-xs uppercase tracking-wider font-bold text-secondary dark:text-accent mt-1">
                                        {t(m.label.en, m.label.es)}
                                    </span>
                                </div>
                                <span className="block text-[11px] text-gray-500 dark:text-gray-400 mt-2 font-medium leading-tight">
                                    {t(m.detail.en, m.detail.es)}
                                </span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Executive Pillars: 3 Strategic Cards */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6"
                    >
                        {about.executiveCards.map((card, i) => {
                            const IconComp = pillarIconMap[card.icon] || DatabaseIcon
                            return (
                                <div
                                    key={i}
                                    className="glass-card rounded-2xl p-6 sm:p-7 border border-border dark:border-white/10 flex flex-col justify-between transition-all duration-300 hover:border-secondary dark:hover:border-secondary hover:shadow-xl hover:-translate-y-1"
                                >
                                    <div>
                                        <div className="w-12 h-12 rounded-xl bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-accent flex items-center justify-center mb-4">
                                            <IconComp size={26} />
                                        </div>
                                        <h3 className="font-heading text-lg sm:text-xl font-bold text-primary dark:text-white mb-2">
                                            {t(card.title.en, card.title.es)}
                                        </h3>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                            {t(card.text.en, card.text.es)}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </motion.div>

                    {/* Target Roles & Engagement Callout */}
                    <motion.div
                        variants={itemVariants}
                        className="glass-card rounded-2xl p-5 sm:p-6 border-l-4 border-secondary dark:border-accent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-secondary dark:text-accent block mb-1">
                                {t(about.openTo.title.en, about.openTo.title.es)}
                            </span>
                            <p className="text-primary dark:text-white text-sm sm:text-base font-semibold">
                                {t(about.openTo.text.en, about.openTo.text.es)}
                            </p>
                        </div>
                        <a
                            href={`mailto:${about.contact.email}?subject=Leadership%20Opportunity%20-%20Daniel%20Pardo`}
                            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-secondary dark:text-accent hover:underline shrink-0"
                        >
                            <span>{t("Initiate Conversation", "Iniciar Conversación")}</span> →
                        </a>
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
