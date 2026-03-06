import { useLanguage } from '../context/LanguageContext'
import { content } from '../data/content'
import { LinkedInIcon, WhatsAppIcon, GitHubIcon } from './Icons'
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

    return (
        <section id="about" className="py-16 bg-bg-section-alt dark:bg-slate-900 relative overflow-hidden">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-subtle" />

            <div className="max-w-[1200px] mx-auto px-8 relative">
                {/* Header: Image + Title side by side */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row items-center gap-8 mb-10"
                >
                    <picture>
                        <source srcSet="/profile.webp" type="image/webp" />
                        <img
                            src="/profile.jpg"
                            alt="Daniel Pardo Profile Picture"
                            width="180"
                            height="180"
                            loading="eager"
                            fetchPriority="high"
                            className="w-[180px] h-[180px] rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-card-hover hover:scale-105 transition-transform duration-300 shrink-0"
                        />
                    </picture>
                    <div>
                        <h1 className="font-heading text-[length:var(--font-size-section-title)] font-extrabold tracking-tight text-primary dark:text-white pb-4 relative mb-4">
                            {t(about.title.en, about.title.es)}
                            <span className="absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-secondary to-accent rounded-sm" />
                        </h1>
                        <h3 className="font-heading text-[1.5rem] text-secondary dark:text-accent font-bold tracking-tight">
                            {t(about.subtitle.en, about.subtitle.es)}
                        </h3>
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
                        <h4 className="text-primary dark:text-white text-lg mb-1 font-semibold">{t(about.whoIAm.title.en, about.whoIAm.title.es)}</h4>
                        <p className="leading-relaxed">{t(about.whoIAm.text.en, about.whoIAm.text.es)}</p>
                    </motion.div>

                    {/* WHAT I DO */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-primary dark:text-white text-lg mb-1 font-semibold">{t(about.whatIDo.title.en, about.whatIDo.title.es)}</h4>
                        <ul className="list-none flex flex-col gap-1">
                            {about.whatIDo.items.map((item, i) => (
                                <li key={i}>
                                    <span className="text-accent">→</span> {t(item.en, item.es)}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* IMPACT DELIVERED */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-primary dark:text-white text-lg mb-1 font-semibold">{t(about.impact.title.en, about.impact.title.es)}</h4>
                        <ul className="list-none flex flex-col gap-1">
                            {about.impact.items.map((item, i) => (
                                <li key={i}><span aria-hidden="true">✅</span> {t(item.en, item.es)}</li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* TECH STACK */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-primary dark:text-white text-lg mb-1 font-semibold">{t(about.techStack.title.en, about.techStack.title.es)}</h4>
                        <p className="leading-relaxed">{t(about.techStack.text.en, about.techStack.text.es)}</p>
                    </motion.div>

                    {/* CERTIFICATIONS & LANGUAGES */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-primary dark:text-white text-lg mb-1 font-semibold">{t(about.certificationsSummary.title.en, about.certificationsSummary.title.es)}</h4>
                        <p className="leading-relaxed">{t(about.certificationsSummary.text.en, about.certificationsSummary.text.es)}</p>
                    </motion.div>

                    {/* OPEN TO */}
                    <motion.div variants={itemVariants} className="bg-primary/5 dark:bg-white/5 p-5 rounded-lg border-l-4 border-accent mt-2">
                        <h4 className="text-primary dark:text-white text-base font-semibold mb-2">{t(about.openTo.title.en, about.openTo.title.es)}</h4>
                        <p className="font-medium mb-3">{t(about.openTo.text.en, about.openTo.text.es)}</p>
                        <div className="flex gap-2.5 flex-wrap">
                            <a href={about.contact.linkedin} target="_blank" rel="noopener noreferrer"
                                aria-label="LinkedIn Profile"
                                className="inline-flex items-center gap-1.5 py-2 px-4 rounded-md text-sm font-semibold text-white bg-linkedin hover:bg-linkedin-hover transition-colors no-underline outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-linkedin">
                                <LinkedInIcon /> LinkedIn
                            </a>
                            <a href={about.contact.whatsapp} target="_blank" rel="noopener noreferrer"
                                aria-label="WhatsApp Contact"
                                className="inline-flex items-center gap-1.5 py-2 px-4 rounded-md text-sm font-semibold text-white bg-whatsapp hover:bg-whatsapp-hover transition-colors no-underline outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-whatsapp">
                                <WhatsAppIcon /> WhatsApp
                            </a>
                            {about.contact.github && (
                                <a href={about.contact.github} target="_blank" rel="noopener noreferrer"
                                    aria-label="GitHub Profile"
                                    className="inline-flex items-center gap-1.5 py-2 px-4 rounded-md text-sm font-semibold text-white bg-github hover:bg-github-hover transition-colors no-underline outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-github">
                                    <GitHubIcon /> GitHub
                                </a>
                            )}
                        </div>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div variants={itemVariants} className="p-6 bg-white dark:bg-slate-800 border-l-4 border-accent rounded shadow-sm">
                        <p className="my-1"><strong>{t("Location:", "Ubicación:")}</strong> {about.contact.location}</p>
                        <p className="my-1"><strong>{t("Email:", "Email:")}</strong> <a href={`mailto:${about.contact.email}`} className="text-secondary font-semibold hover:text-accent hover:underline transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-1">{about.contact.email}</a></p>
                        <p className="my-1"><strong>{t("Phone:", "Teléfono:")}</strong> {about.contact.phone}</p>
                        <p className="my-1"><strong>LinkedIn:</strong> <a href={about.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-secondary dark:text-accent font-semibold hover:text-accent hover:underline transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-1">Daniel Pardo</a></p>
                        {about.contact.github && (
                            <p className="my-1"><strong>GitHub:</strong> <a href={about.contact.github} target="_blank" rel="noopener noreferrer" className="text-secondary dark:text-accent font-semibold hover:text-accent hover:underline transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-1">Chackmilo</a></p>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
