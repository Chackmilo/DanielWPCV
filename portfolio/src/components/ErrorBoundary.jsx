import { Component } from 'react'

// ErrorBoundary renders OUTSIDE LanguageProvider, so it can't read the in-app
// language. Fall back to the browser locale to stay bilingual.
const FALLBACK_MESSAGE = {
    en: 'Something went wrong loading this section.',
    es: 'Algo salió mal al cargar esta sección.',
}

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error, info) {
        console.error('ErrorBoundary caught:', error, info)
    }

    render() {
        if (this.state.hasError) {
            const lang = typeof navigator !== 'undefined' && navigator.language?.startsWith('es') ? 'es' : 'en'
            return (
                <div className="flex justify-center items-center py-32 text-center">
                    <p className="text-gray-500">{FALLBACK_MESSAGE[lang]}</p>
                </div>
            )
        }
        return this.props.children
    }
}
