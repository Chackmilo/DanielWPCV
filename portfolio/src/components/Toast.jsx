import { motion, AnimatePresence } from 'framer-motion'

export default function Toast({ message, isVisible, onClose }) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900/95 text-white py-3 px-5 rounded-xl shadow-2xl border border-emerald-500/40 backdrop-blur-md"
                    role="status"
                    aria-live="polite"
                >
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span className="text-sm font-medium">{message}</span>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-white ml-2 text-sm leading-none outline-none"
                            aria-label="Cerrar notificación"
                        >
                            &times;
                        </button>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
