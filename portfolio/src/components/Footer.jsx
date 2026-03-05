import { useLanguage } from '../context/LanguageContext'
import { content } from '../data/content'
import { HomeIcon } from './Icons'

export default function Footer() {
    const { t } = useLanguage()
    const { about, footer } = content

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    return (
        <footer className="bg-gradient-to-br from-primary to-primary-dark dark:from-slate-900 dark:to-slate-950 text-text-light dark:text-gray-300 py-12 relative">
            {/* Back to top button */}
            <button
                onClick={scrollToTop}
                className="absolute -top-6 left-1/2 -translate-x-1/2 bg-accent text-white border-none w-12 h-12 rounded-full cursor-pointer shadow-card hover:bg-secondary dark:hover:bg-secondary-100 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                title="Back to Top"
                aria-label={t("Back to top", "Volver arriba")}
            >
                <HomeIcon />
            </button>

            <div className="max-w-[1200px] mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 my-12 pt-8">
                    <div>
                        <h3 className="mb-4 text-xl font-bold dark:text-white">{footer.title}</h3>
                        <p className="my-1 text-base">{footer.role}</p>
                        <p className="my-1 text-base"><span aria-hidden="true">📍</span> {about.contact.location}</p>
                        <p className="my-1 text-base"><span aria-hidden="true">📧</span> <a href={`mailto:${about.contact.email}`} className="text-secondary dark:text-accent no-underline hover:text-accent dark:hover:text-secondary-100 transition-colors">{about.contact.email}</a></p>
                        <p className="my-1 text-base"><span aria-hidden="true">📱</span> {about.contact.phone}</p>
                        <p className="my-1 text-base"><span aria-hidden="true">💼</span> <a href={about.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-secondary dark:text-accent no-underline hover:text-accent dark:hover:text-secondary-100 transition-colors">{t(footer.linkedinLabel.en, footer.linkedinLabel.es)}</a></p>
                    </div>
                    <div>
                        <h4 className="mb-4 text-secondary dark:text-accent font-bold">{t(footer.languages.title.en, footer.languages.title.es)}</h4>
                        {footer.languages.items.map((lang) => (
                            <p key={lang.en} className="my-1 text-base">{t(lang.en, lang.es)}</p>
                        ))}
                    </div>
                </div>

                <div className="text-center pt-8 border-t border-white/10 dark:border-white/5 text-sm">
                    <p className="my-1">&copy; 2026 Daniel Camilo Pardo Figueroa. {t(footer.copyright.en, footer.copyright.es)}</p>
                </div>
            </div>
        </footer>
    )
}
