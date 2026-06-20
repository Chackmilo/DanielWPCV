import { useState, useEffect, useRef } from 'react'

export function useInView(options = {}) {
    const ref = useRef(null)
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true)
                    observer.unobserve(element)
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -100px 0px', ...options }
        )

        observer.observe(element)
        return () => observer.disconnect()
        // Observe once on mount; the only call site passes no options.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return [ref, isInView]
}
