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
    const location = useLocation()
    const isHomePage = location.pathname === '/'
    const nav = content.nav

    useEffect(() => {
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > NAVBAR_SCROLL_THRESHOLD);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollTo = useCallback((id) => {
        if (!isHomePage) {
            // Need to navigate and let the new page handle scrolling.
            // A simple implementation here works with React Router Link components.
            return;
        }

        const el = document.getElementById(id)
        if (el) {
            const offset = el.offsetTop - NAVBAR_OFFSET_PX
            window.scrollTo({ top: offset, behavior: 'smooth' })
            setMenuOpen(false)
        }
    }, [isHomePage])

    const links = useMemo(() => [
        { id: 'about', label: t(nav.about.en, nav.about.es) },
        { id: 'skills', label: t(nav.skills.en, nav.skills.es) },
        { id: 'projects', label: t(nav.projects.en, nav.projects.es) },
        { id: 'education', label: t(nav.education.en, nav.education.es) },
        { id: 'recommendations', label: t(nav.recommendations.en, nav.recommendations.es) },
        { id: 'certifications', label: t(nav.certifications.en, nav.certifications.es) },
        { id: 'blog', label: t(nav.blog.en, nav.blog.es) },
    ], [t, nav])

    return (
        <header
            className={`bg-primary sticky top-0 z-50 border-b border-white/5 transition-shadow duration-300 ${scrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.2)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.05)]' : 'shadow-[0_2px_10px_rgba(0,0,0,0.1)]'}`}
        >
            <nav className="flex justify-between items-center py-4 px-8 max-w-[1200px] mx-auto flex-wrap gap-4">
                <div>
                    <h1 className="font-heading text-2xl font-extrabold text-text-light tracking-tight">
                        <Link to="/" onClick={() => isHomePage && window.scrollTo(0, 0)}>
                            DANIEL CAMILO PARDO FIGUEROA
                        </Link>
                    </h1>
                </div>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden text-text-light text-2xl outline-none focus-visible:ring-2 focus-visible:ring-accent rounded transition-shadow"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? '✕' : '☰'}
                </button>

                <ul
                    className={`${menuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row list-none gap-2 md:gap-8 w-full md:w-auto items-center`}
                    role="menu"
                    aria-hidden={!menuOpen}
                >
                    {links.map(link => (
                        <li key={link.id} role="none">
                            {isHomePage ? (
                                <button
                                    role="menuitem"
                                    onClick={() => scrollTo(link.id)}
                                    className="font-heading text-text-light font-semibold text-base py-1 px-4 border-b-2 border-transparent opacity-90 hover:opacity-100 hover:text-accent dark:hover:text-secondary hover:border-accent transition-all duration-300 hover:-translate-y-0.5 cursor-pointer bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                                >
                                    {link.label}
                                </button>
                            ) : (
                                <Link
                                    role="menuitem"
                                    to={`/#${link.id}`}
                                    className="font-heading text-text-light font-semibold text-base py-1 px-4 border-b-2 border-transparent opacity-90 hover:opacity-100 hover:text-accent dark:hover:text-secondary hover:border-accent transition-all duration-300 hover:-translate-y-0.5 cursor-pointer bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                                >
                                    {link.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="text-text-light hover:text-accent dark:hover:text-secondary transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full p-1"
                        aria-label={isDarkMode ? 'Switch to Light Mode' : 'Toggle Dark Mode'}
                    >
                        {isDarkMode ? <SunIcon /> : <MoonIcon />}
                    </button>

                    <button
                        onClick={toggleLanguage}
                        className="bg-white/10 text-text-light border border-white/20 py-1.5 px-4 rounded-full cursor-pointer font-bold text-sm flex items-center gap-1.5 hover:bg-white hover:text-primary transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        aria-label={lang === 'en' ? 'Switch to Spanish' : 'Cambiar a inglés'}
                    >
                        <span aria-hidden="true">🌐</span> {lang === 'en' ? 'ES' : 'EN'}
                    </button>
                </div>
            </nav>
        </header>
    )
}
