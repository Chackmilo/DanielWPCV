export default function Card({ children, className = '' }) {
    return (
        <div
            className={`bg-white dark:bg-slate-800 rounded-xl shadow-card hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300 ${className}`}
        >
            {children}
        </div>
    )
}
