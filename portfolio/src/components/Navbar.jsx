import { useState, useEffect, useMemo, useCallback } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { content } from '../data/content'
import { NAVBAR_SCROLL_THRESHOLD, NAVBAR_OFFSET_PX } from '../utils/constants'
import { MoonIcon, SunIcon } from './Icons'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
    const { lang, toggleLanguage, t } = useLanguage()
    const { isDarkMode, toggleTheme } = useTheme()
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('about')
    const location = useLocation()
    const isHomePage = location.pathname === '/'
    const nav = content.nav

    const links = useMemo(() => [
        { id: 'about', label: t(nav.about.en, nav.about.es) },
        { id: 'skills', label: t(nav.skills.en, nav.skills.es) },
        { id: 'timeline', label: t(nav.timeline?.en || 'Trajectory', nav.timeline?.es || 'Trayectoria') },
        { id: 'projects', label: t(nav.projects.en, nav.projects.es) },
        { id: 'education', label: t(nav.education.en, nav.education.es) },
        { id: 'recommendations', label: t(nav.recommendations.en, nav.recommendations.es) },
        { id: 'certifications', label: t(nav.certifications.en, nav.certifications.es) },
        { id: 'blog', label: t(nav.blog.en, nav.blog.es) },
    ], [t, nav])

    // Scroll spy & scrolled threshold listener
    useEffect(() => {
        let ticking = false
        const sectionIds = links.map(l => l.id)

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > NAVBAR_SCROLL_THRESHOLD)

                    if (isHomePage) {
                        const scrollPosition = window.scrollY + NAVBAR_OFFSET_PX + 120
                        for (let i = sectionIds.length - 1; i >= 0; i--) {
                            const el = document.getElementById(sectionIds[i])
                            if (el && el.offsetTop <= scrollPosition) {
                                setActiveSection(sectionIds[i])
                                break
                            }
                        }
                    }

                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [links, isHomePage])

    const scrollTo = useCallback((id) => {
        if (!isHomePage) return

        const el = document.getElementById(id)
        if (el) {
            const offset = el.offsetTop - NAVBAR_OFFSET_PX
            window.scrollTo({ top: offset, behavior: 'smooth' })
            setActiveSection(id)
            setMenuOpen(false)
        }
    }, [isHomePage])

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
                ? 'glass-nav shadow-lg shadow-black/10 dark:shadow-black/40 py-2.5'
                : 'bg-white/90 dark:bg-bg-dark/90 backdrop-blur-md border-b border-border dark:border-white/5 py-3.5'
                }`}
        >
            <nav className="flex justify-between items-center px-4 sm:px-6 max-w-[1400px] mx-auto gap-4">
                {/* Brand / Name */}
                <div className="flex items-center gap-3">
                    <Link
                        to="/"
                        onClick={() => isHomePage && window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="flex items-center gap-2.5 group no-underline"
                    >
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-secondary via-accent to-accent-cyan flex items-center justify-center text-white font-heading font-black text-sm shadow-md group-hover:scale-105 transition-transform">
                            DP
                        </div>
                        <span className="font-heading text-base sm:text-lg font-extrabold text-primary dark:text-white tracking-tight group-hover:text-secondary dark:group-hover:text-accent transition-colors">
                            DANIEL CAMILO PARDO
                        </span>
                    </Link>
                </div>

                {/* Desktop Nav Items */}
                <ul
                    className="hidden lg:flex items-center list-none gap-1 xl:gap-2 m-0 p-0"
                    role="menubar"
                >
                    {links.map((link) => {
                        const isActive = isHomePage && activeSection === link.id
                        return (
                            <li key={link.id} role="none">
                                {isHomePage ? (
                                    <button
                                        role="menuitem"
                                        onClick={() => scrollTo(link.id)}
                                        className={`font-heading text-xs xl:text-sm font-bold py-1.5 px-3 rounded-lg transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent ${isActive
                                            ? 'bg-secondary text-white shadow-xs'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                                            }`}
                                    >
                                        {link.label}
                                    </button>
                                ) : (
                                    <Link
                                        role="menuitem"
                                        to={`/#${link.id}`}
                                        className="font-heading text-xs xl:text-sm font-bold py-1.5 px-3 rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 no-underline outline-none focus-visible:ring-2 focus-visible:ring-accent"
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </li>
                        )
                    })}
                </ul>

                {/* Right controls: Theme, Language, Mobile Toggle */}
                <div className="flex items-center gap-2.5 sm:gap-3">
                    <button
                        onClick={toggleTheme}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-700 dark:text-gray-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent shadow-2xs"
                        aria-label={isDarkMode ? t('Switch to light mode', 'Cambiar a modo claro') : t('Switch to dark mode', 'Cambiar a modo oscuro')}
                    >
                        {isDarkMode ? <SunIcon size={18} /> : <MoonIcon size={18} />}
                    </button>

                    <button
                        onClick={toggleLanguage}
                        className="lang-btn bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200 border border-border dark:border-white/10 py-1.5 px-3 rounded-xl cursor-pointer font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all duration-200 hover:scale-105 shadow-2xs outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        aria-label={lang === 'en' ? 'Switch to Spanish' : 'Cambiar a inglés'}
                    >
                        <span aria-hidden="true">🌐</span> {lang === 'en' ? 'ES' : 'EN'}
                    </button>

                    {/* Mobile hamburger */}
                    <button
                        className="lg:hidden text-gray-800 dark:text-white text-xl p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={t('Toggle menu', 'Alternar menú')}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Drawer */}
            {menuOpen && (
                <div className="lg:hidden bg-white/98 dark:bg-bg-dark/98 backdrop-blur-xl border-b border-border dark:border-white/10 px-4 py-4 shadow-xl">
                    <ul className="flex flex-col list-none gap-2 m-0 p-0" role="menu">
                        {links.map((link) => (
                            <li key={link.id} role="none">
                                {isHomePage ? (
                                    <button
                                        role="menuitem"
                                        onClick={() => scrollTo(link.id)}
                                        className={`w-full text-left font-heading text-sm font-bold py-2.5 px-4 rounded-xl transition-all cursor-pointer ${activeSection === link.id
                                            ? 'bg-secondary text-white'
                                            : 'text-gray-800 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                                            }`}
                                    >
                                        {link.label}
                                    </button>
                                ) : (
                                    <Link
                                        role="menuitem"
                                        to={`/#${link.id}`}
                                        onClick={() => setMenuOpen(false)}
                                        className="block font-heading text-sm font-bold py-2.5 px-4 rounded-xl text-gray-800 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-800 no-underline"
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    )
}
