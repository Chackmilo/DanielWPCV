export default function SectionTitle({ children }) {
    return (
        <h2 className="font-heading text-[length:var(--font-size-section-title)] font-extrabold tracking-tight text-primary dark:text-white mb-12 text-center relative pb-4 section-title-underline">
            {children}
        </h2>
    )
}
