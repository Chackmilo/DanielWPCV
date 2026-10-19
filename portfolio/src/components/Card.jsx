import { useCallback } from 'react'

export default function Card({ children, className = '' }) {
    const handleMouseMove = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
    }, [])

    return (
        <div
            onMouseMove={handleMouseMove}
            className={`spotlight-card bg-white dark:bg-slate-800 rounded-xl shadow-card hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300 ${className}`}
        >
            {children}
        </div>
    )
}
