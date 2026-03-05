import { useInView } from '../hooks/useInView'

export default function Card({ children, className = '', animate = true }) {
    const [ref, isInView] = useInView()
    return (
        <div
            ref={animate ? ref : undefined}
            className={`bg-white dark:bg-slate-800 rounded-xl shadow-card hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300 ${animate ? (isInView ? 'animate-fade-in-up' : 'opacity-0') : ''} ${className}`}
        >
            {children}
        </div>
    )
}
