import { useLanguage } from '../context/LanguageContext'

const CHIPS = [
    {
        id: 'ai',
        icon: '🚀',
        en: "What is Daniel's experience in GenAI & AI Agents?",
        es: "¿Cuál es la experiencia de Daniel en GenAI y Agentes de IA?"
    },
    {
        id: 'datalakehouse',
        icon: '📊',
        en: 'Tell me about the Datalakehouse at RippleNami.',
        es: 'Cuéntame sobre el Datalakehouse en RippleNami.'
    },
    {
        id: 'growth',
        icon: '📈',
        en: 'How did Daniel drive 1.5x GMV growth at inDrive?',
        es: '¿Cómo impulsó el crecimiento de 1.5x GMV en inDrive?'
    },
    {
        id: 'roles',
        icon: '💼',
        en: 'What leadership roles is Daniel open to?',
        es: '¿A qué roles de liderazgo está abierto Daniel?'
    }
]

export default function QuickChips({ onSelect, disabled }) {
    const { lang } = useLanguage()

    return (
        <div className="flex gap-2 overflow-x-auto pb-2 px-4 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 no-scrollbar">
            {CHIPS.map((chip) => {
                const text = lang === 'es' ? chip.es : chip.en
                return (
                    <button
                        key={chip.id}
                        type="button"
                        disabled={disabled}
                        onClick={() => onSelect(text)}
                        className="whitespace-nowrap inline-flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-full bg-slate-100 dark:bg-slate-700/80 text-slate-700 dark:text-slate-200 hover:bg-secondary/10 dark:hover:bg-accent/20 hover:text-secondary dark:hover:text-accent border border-slate-200/80 dark:border-slate-600/80 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                        <span aria-hidden="true">{chip.icon}</span>
                        <span>{text}</span>
                    </button>
                )
            })}
        </div>
    )
}
