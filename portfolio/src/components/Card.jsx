import { useCallback, useRef } from 'react'

export default function Card({ children, className = '' }) {
    const rafRef = useRef(null)

    const handleMouseMove = useCallback((e) => {
        if (rafRef.current) return
        const target = e.currentTarget
        const clientX = e.clientX
        const clientY = e.clientY

        rafRef.current = requestAnimationFrame(() => {
            const rect = target.getBoundingClientRect()
            target.style.setProperty('--mouse-x', `${clientX - rect.left}px`)
            target.style.setProperty('--mouse-y', `${clientY - rect.top}px`)
            rafRef.current = null
        })
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
