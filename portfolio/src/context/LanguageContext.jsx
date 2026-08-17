import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('lang')
            if (saved === 'en' || saved === 'es') return saved
            if (navigator.language && navigator.language.startsWith('es')) return 'es'
        }
        return 'en'
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('lang', lang)
        }
    }, [lang])

    const toggleLanguage = () => setLang(prev => prev === 'en' ? 'es' : 'en')
    const t = (en, es) => lang === 'en' ? en : es

    return (
        <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) throw new Error('useLanguage must be used within LanguageProvider')
    return context
}
