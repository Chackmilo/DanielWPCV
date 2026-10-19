import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import {
    SearchIcon,
    DocumentTextIcon,
    CopyIcon,
    SparklesIcon,
    CheckIcon,
    HomeIcon,
    DatabaseIcon,
    BriefcaseIcon,
    SunIcon,
    MoonIcon
} from './Icons'

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [copied, setCopied] = useState(false)
    const inputRef = useRef(null)
    const listRef = useRef(null)

    const { lang, t, toggleLanguage } = useLanguage()
    const { isDarkMode, toggleTheme } = useTheme()

    // Global shortcut listener (Cmd+K / Ctrl+K and custom event)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && (e.key?.toLowerCase() === 'k' || e.code === 'KeyK')) {
                e.preventDefault()
                setIsOpen((prev) => {
                    if (!prev) {
                        setQuery('')
                        setSelectedIndex(0)
                    }
                    return !prev
                })
            } else if (e.key === 'Escape' && isOpen) {
                e.preventDefault()
                setIsOpen(false)
            }
        }

        const handleCustomOpen = () => {
            setQuery('')
            setSelectedIndex(0)
            setIsOpen(true)
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('open-command-palette', handleCustomOpen)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('open-command-palette', handleCustomOpen)
        }
    }, [isOpen])

    // Lock body scroll and focus input when open
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => inputRef.current?.focus(), 50)
            document.body.style.overflow = 'hidden'
            return () => {
                clearTimeout(timer)
                document.body.style.overflow = ''
            }
        } else {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    const navigateTo = useCallback((id) => {
        setIsOpen(false)
        const el = document.getElementById(id)
        if (el) {
            const offset = el.offsetTop - 80
            window.scrollTo({ top: offset, behavior: 'smooth' })
        } else {
            window.location.hash = `#${id}`
        }
    }, [])

    const copyEmail = useCallback(async () => {
        try {
            await navigator.clipboard.writeText('chackmilo@gmail.com')
            setCopied(true)
            setTimeout(() => {
                setCopied(false)
                setIsOpen(false)
            }, 800)
        } catch {
            setIsOpen(false)
        }
    }, [])

    const focusChat = useCallback(() => {
        setIsOpen(false)
        const chatInput = document.querySelector('input[placeholder*="Nabla"], input[placeholder*="Ask"]')
        const aboutSection = document.getElementById('about')
        if (aboutSection) {
            window.scrollTo({ top: aboutSection.offsetTop - 80, behavior: 'smooth' })
        }
        setTimeout(() => chatInput?.focus(), 300)
    }, [])

    const actions = [
        // Navigation Group
        {
            id: 'nav-about',
            group: t('Navigation', 'Navegación'),
            title: t('About & Executive Overview', 'Sobre Mí & Resumen Ejecutivo'),
            subtitle: '#about',
            icon: HomeIcon,
            keywords: 'about summary bio perfil inicio overview',
            run: () => navigateTo('about'),
        },
        {
            id: 'nav-skills',
            group: t('Navigation', 'Navegación'),
            title: t('Skills & Strategic Capabilities', 'Habilidades & Capacidades Estratégicas'),
            subtitle: '#skills',
            icon: DatabaseIcon,
            keywords: 'skills lakehouse ai bigquery dbt langgraph capacidades',
            run: () => navigateTo('skills'),
        },
        {
            id: 'nav-timeline',
            group: t('Navigation', 'Navegación'),
            title: t('Executive Trajectory & Roles', 'Trayectoria Ejecutiva & Experiencia'),
            subtitle: '#timeline',
            icon: BriefcaseIcon,
            keywords: 'trajectory experience timeline ripplenami indrive mintic nablaops',
            run: () => navigateTo('timeline'),
        },
        {
            id: 'nav-projects',
            group: t('Navigation', 'Navegación'),
            title: t('Case Studies & Enterprise Projects', 'Casos de Estudio & Proyectos'),
            subtitle: '#projects',
            icon: SparklesIcon,
            keywords: 'projects alterego agente blablabla gra fortuna github',
            run: () => navigateTo('projects'),
        },
        {
            id: 'nav-certifications',
            group: t('Navigation', 'Navegación'),
            title: t('Executive Certifications & Degrees', 'Certificaciones & Educación'),
            subtitle: '#certifications',
            icon: DocumentTextIcon,
            keywords: 'certifications education degrees microsoft pmp scrum master',
            run: () => navigateTo('certifications'),
        },
        {
            id: 'nav-blog',
            group: t('Navigation', 'Navegación'),
            title: t('Executive Blog & Strategic Articles', 'Blog Ejecutivo & Artículos'),
            subtitle: '#blog',
            icon: DocumentTextIcon,
            keywords: 'blog articles publicaciones pmo ai story ui ux',
            run: () => navigateTo('blog'),
        },
        {
            id: 'nav-contact',
            group: t('Navigation', 'Navegación'),
            title: t('Direct Contact & Socials', 'Contacto Directo & Redes'),
            subtitle: '#contact',
            icon: CopyIcon,
            keywords: 'contact email whatsapp linkedin teléfono correo',
            run: () => navigateTo('contact'),
        },
        // Quick Actions Group
        {
            id: 'act-cv',
            group: t('Actions', 'Acciones Rápidas'),
            title: t('Download Executive CV (PDF)', 'Descargar CV Ejecutivo (PDF)'),
            subtitle: '/CV_Daniel_Pardo.pdf',
            icon: DocumentTextIcon,
            keywords: 'download cv resume pdf descargar curriculum vitae',
            run: () => {
                setIsOpen(false)
                window.open('/CV_Daniel_Pardo.pdf', '_blank')
            },
        },
        {
            id: 'act-email',
            group: t('Actions', 'Acciones Rápidas'),
            title: copied ? t('Copied to Clipboard!', '¡Copiado al Portapapeles!') : t('Copy Email: chackmilo@gmail.com', 'Copiar Correo: chackmilo@gmail.com'),
            subtitle: 'chackmilo@gmail.com',
            icon: copied ? CheckIcon : CopyIcon,
            keywords: 'copy email correo copiar chackmilo',
            run: copyEmail,
        },
        {
            id: 'act-chat',
            group: t('Actions', 'Acciones Rápidas'),
            title: t('Ask Nabla AI (Chatbot)', 'Preguntar a Nabla AI (Chatbot)'),
            subtitle: 'DeepSeek / Groq AI Assistant',
            icon: SparklesIcon,
            keywords: 'chat nabla ai deepseek prompt ask preguntar asistente',
            run: focusChat,
        },
        {
            id: 'act-lang',
            group: t('Actions', 'Acciones Rápidas'),
            title: lang === 'en' ? 'Cambiar a Español (ES)' : 'Switch to English (EN)',
            subtitle: `Active: ${lang.toUpperCase()}`,
            icon: HomeIcon,
            keywords: 'language idioma español ingles english spanish toggle',
            run: () => {
                toggleLanguage()
                setIsOpen(false)
            },
        },
        {
            id: 'act-theme',
            group: t('Actions', 'Acciones Rápidas'),
            title: isDarkMode ? t('Switch to Light Mode', 'Cambiar a Modo Claro') : t('Switch to Dark Mode', 'Cambiar a Modo Oscuro'),
            subtitle: `Active: ${isDarkMode ? 'Dark' : 'Light'}`,
            icon: isDarkMode ? SunIcon : MoonIcon,
            keywords: 'theme tema dark light oscuro claro toggle',
            run: () => {
                toggleTheme()
                setIsOpen(false)
            },
        },
    ]

    const filtered = actions.filter((item) => {
        if (!query.trim()) return true
        const q = query.toLowerCase()
        return (
            item.title.toLowerCase().includes(q) ||
            item.subtitle.toLowerCase().includes(q) ||
            item.keywords.toLowerCase().includes(q)
        )
    })

    // Keyboard navigation within list
    const handleKeyDown = (e) => {
        if (filtered.length === 0) return

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSelectedIndex((prev) => (prev + 1) % filtered.length)
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length)
        } else if (e.key === 'Enter') {
            e.preventDefault()
            filtered[selectedIndex]?.run()
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={t('Command Palette', 'Paleta de Comandos')}
                    className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-md"
                    onClick={() => setIsOpen(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -16 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-xl bg-white dark:bg-[#0c1222] border border-border dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Search Bar */}
                        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border dark:border-white/10">
                            <SearchIcon size={18} className="text-secondary dark:text-accent shrink-0" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value)
                                    setSelectedIndex(0)
                                }}
                                onKeyDown={handleKeyDown}
                                placeholder={t('Type a command or search section...', 'Escribe un comando o busca una sección...')}
                                className="w-full bg-transparent text-sm sm:text-base text-primary dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none font-medium"
                            />
                            {query && (
                                <button
                                    onClick={() => setQuery('')}
                                    className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                                >
                                    ✕
                                </button>
                            )}
                            <kbd className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 border border-border dark:border-white/10">
                                ESC
                            </kbd>
                        </div>

                        {/* Results List */}
                        <div ref={listRef} className="max-h-[380px] overflow-y-auto p-2 flex flex-col gap-1">
                            {filtered.length === 0 ? (
                                <div className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                                    {t('No matching commands found.', 'No se encontraron comandos coincidentes.')}
                                </div>
                            ) : (
                                filtered.map((item, idx) => {
                                    const IconComponent = item.icon
                                    const isSelected = idx === selectedIndex
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={item.run}
                                            onMouseEnter={() => setSelectedIndex(idx)}
                                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer outline-none ${isSelected
                                                ? 'bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-white border-l-2 border-secondary dark:border-accent'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isSelected
                                                        ? 'bg-secondary text-white dark:bg-accent dark:text-slate-900'
                                                        : 'bg-slate-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400'
                                                        }`}
                                                >
                                                    <IconComponent size={14} />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold tracking-tight text-primary dark:text-white">
                                                        {item.title}
                                                    </div>
                                                    <div className="text-[11px] text-gray-400 dark:text-gray-500 font-mono">
                                                        {item.subtitle}
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 dark:text-gray-500">
                                                {item.group}
                                            </span>
                                        </button>
                                    )
                                })
                            )}
                        </div>

                        {/* Footer Tips */}
                        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/60 border-t border-border dark:border-white/5 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1">
                                    <kbd className="font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-border dark:border-white/10 text-[10px]">↑</kbd>
                                    <kbd className="font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-border dark:border-white/10 text-[10px]">↓</kbd>
                                    <span>{t('navigate', 'navegar')}</span>
                                </span>
                                <span className="flex items-center gap-1">
                                    <kbd className="font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-border dark:border-white/10 text-[10px]">↵</kbd>
                                    <span>{t('select', 'seleccionar')}</span>
                                </span>
                            </div>
                            <span className="font-mono text-[10px] text-accent font-semibold">
                                ⌘K / Ctrl+K
                            </span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
