import { useLanguage } from '../context/LanguageContext'
import { content } from '../data/content'
import { HomeIcon, LinkedInIcon, GitHubIcon, WhatsAppIcon, MapPinIcon } from './Icons'

export default function Footer() {
    const { t } = useLanguage()
    const { about, footer } = content

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    return (
        <footer className="bg-gradient-to-b from-primary via-slate-950 to-primary-dark text-text-light dark:text-gray-300 py-16 relative border-t border-white/10">
            {/* Back to top button */}
            <button
                onClick={scrollToTop}
                className="home-icon absolute -top-6 left-1/2 -translate-x-1/2 bg-accent text-white border-none w-12 h-12 rounded-2xl cursor-pointer shadow-xl hover:bg-emerald-600 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center shadow-emerald-500/20"
                title="Back to Top"
                aria-label={t("Back to top", "Volver arriba")}
            >
                <HomeIcon size={20} />
            </button>

            <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-6 pb-12 border-b border-white/10">
                    {/* Col 1: Identity & Role */}
                    <div>
                        <div className="flex items-center gap-2.5 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white font-heading font-black text-xs shadow-md">
                                DP
                            </div>
                            <h3 className="text-lg font-bold font-heading text-white tracking-tight">
                                {footer.title}
                            </h3>
                        </div>
                        <p className="text-accent text-sm font-semibold mb-4 leading-snug">
                            {footer.role}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-400 flex items-center gap-2 mb-2">
                            <MapPinIcon size={14} className="text-accent shrink-0" />
                            <span>{about.contact.location}</span>
                        </p>
                    </div>

                    {/* Col 2: Direct Contact & Channels */}
                    <div>
                        <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
                            {t("Direct Connect", "Contacto Directo")}
                        </h4>
                        <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-gray-300">
                            <a
                                href={`mailto:${about.contact.email}`}
                                className="text-gray-300 hover:text-accent transition-colors flex items-center gap-2"
                            >
                                <span className="text-accent">✉</span> {about.contact.email}
                            </a>
                            <a
                                href={`tel:${about.contact.phone}`}
                                className="text-gray-300 hover:text-accent transition-colors flex items-center gap-2"
                            >
                                <span className="text-accent">📱</span> {about.contact.phone}
                            </a>
                            <div className="flex items-center gap-3 mt-2">
                                <a
                                    href={about.contact.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-linkedin flex items-center justify-center text-white transition-colors"
                                >
                                    <LinkedInIcon size={14} />
                                </a>
                                <a
                                    href={about.contact.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="WhatsApp"
                                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-whatsapp flex items-center justify-center text-white transition-colors"
                                >
                                    <WhatsAppIcon size={14} />
                                </a>
                                {about.contact.github && (
                                    <a
                                        href={about.contact.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="GitHub"
                                        className="w-8 h-8 rounded-lg bg-white/10 hover:bg-slate-700 flex items-center justify-center text-white transition-colors"
                                    >
                                        <GitHubIcon size={14} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Col 3: Languages & Global Reach */}
                    <div>
                        <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
                            {t(footer.languages.title.en, footer.languages.title.es)}
                        </h4>
                        <div className="flex flex-col gap-2 text-xs sm:text-sm text-gray-400">
                            {footer.languages.items.map((lang) => (
                                <p key={lang.en} className="m-0 flex items-center gap-2">
                                    <span className="text-emerald-400 text-xs">✔</span>
                                    <span>{t(lang.en, lang.es)}</span>
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="text-center pt-8 text-xs text-gray-500">
                    <p className="m-0">
                        &copy; {new Date().getFullYear()} Daniel Camilo Pardo Figueroa. {t(footer.copyright.en, footer.copyright.es)}
                    </p>
                </div>
            </div>
        </footer>
    )
}
