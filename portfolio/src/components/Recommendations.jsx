import { memo, useState, useRef, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { content } from '../data/content'
import Card from './Card'
import SectionTitle from './SectionTitle'
import { motion } from 'framer-motion'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        }
    }
}

const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1, scale: 1, y: 0,
        transition: { type: "spring", stiffness: 100, damping: 20 }
    }
}

const RecCard = memo(function RecCard({ rec }) {
    const { t } = useLanguage()

    return (
        <motion.div variants={cardVariants} className="h-full">
            <Card className="p-8 border-t-4 border-secondary hover:border-accent bg-white dark:bg-slate-800 dark:border-slate-700 dark:border-t-secondary transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="mb-4">
                    <h4 className="text-primary dark:text-white text-xl font-bold mb-1">{rec.name}</h4>
                    <span className="text-secondary dark:text-accent text-sm font-semibold">{rec.role}</span>
                </div>
                <p className="text-base leading-relaxed italic text-gray-600 dark:text-gray-300">&ldquo;{t(rec.text.en, rec.text.es)}&rdquo;</p>
            </Card>
        </motion.div>
    )
})

const ChatInterface = () => {
    const { t } = useLanguage()
    const [messages, setMessages] = useState([
        { role: 'assistant', content: t(content.chat.greeting.en, content.chat.greeting.es) }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const scrollContainerRef = useRef(null)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            const { scrollHeight, clientHeight } = scrollContainerRef.current
            scrollContainerRef.current.scrollTo({
                top: scrollHeight - clientHeight,
                behavior: 'smooth'
            })
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = async (e) => {
        if (e) e.preventDefault()
        if (!input.trim() || isLoading) return

        const userMessage = { role: 'user', content: input.trim() }
        const newMessages = [...messages, userMessage]

        setMessages(newMessages)
        setInput('')
        setIsLoading(true)

        try {
            // Send maximum 10 last messages as context to prevent huge payloads
            const contextMessages = newMessages.slice(-10)

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: contextMessages })
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const data = await response.json()

            if (data.reply) {
                setMessages([...newMessages, { role: 'assistant', content: data.reply }])
            } else if (data.error) {
                setMessages([...newMessages, { role: 'assistant', content: "Error: " + data.error }])
            }
        } catch (error) {
            console.error('Error in chat:', error)
            setMessages([...newMessages, { role: 'assistant', content: t("Sorry, I'm having trouble connecting to the network.", "Lo siento, tengo problemas para conectarme a la red.") }])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-white dark:bg-slate-800 border text-text-dark dark:text-white border-border dark:border-slate-700 rounded-2xl shadow-lg overflow-hidden flex flex-col h-[450px]">
            <div className="bg-primary dark:bg-slate-900 text-white p-4 flex items-center gap-3 border-b dark:border-slate-700">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-bold text-lg">N</div>
                <div>
                    <h4 className="font-heading font-bold m-0 leading-tight">Nabla Agent</h4>
                    <span className="text-xs text-secondary-100 flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                        Online
                    </span>
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                className="flex-grow p-6 bg-slate-50 dark:bg-slate-800/50 flex flex-col gap-4 overflow-y-auto scroll-smooth"
            >
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''} animate-fade-in-up`}>
                        {msg.role === 'assistant' && (
                            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm shrink-0">N</div>
                        )}
                        <div className={`p-3 text-base shadow-sm ${msg.role === 'user'
                            ? 'bg-secondary text-white rounded-2xl rounded-tr-none'
                            : 'bg-white dark:bg-slate-700 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-600 dark:text-gray-100'
                            }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-3 animate-fade-in-up">
                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm shrink-0">N</div>
                        <div className="bg-white dark:bg-slate-700 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center border border-slate-200 dark:border-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex gap-2">
                <input
                    type="text"
                    value={input}
                    maxLength={1000}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t("Ask me about Daniel...", "Pregúntame sobre Daniel...")}
                    className="flex-grow bg-slate-100 dark:bg-slate-700 rounded-full py-2.5 px-5 text-sm text-text-dark dark:text-white outline-none border border-transparent focus:border-secondary transition-colors focus-visible:ring-2 focus-visible:ring-accent"
                />
                <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="bg-secondary text-white w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent dark:focus-visible:ring-offset-slate-800"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-0.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                </button>
            </form>
        </div>
    )
}

export default function Recommendations() {
    const { t } = useLanguage()

    return (
        <section id="recommendations" className="py-16 bg-white dark:bg-primary content-vis-auto">
            <div className="max-w-[1200px] mx-auto px-8">
                <SectionTitle>{t("Recommendations", "Recomendaciones")}</SectionTitle>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid gap-8 mb-16"
                >
                    {content.recommendations.map((rec) => (
                        <RecCard key={rec.name} rec={rec} />
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md mx-auto"
                >
                    <ChatInterface />
                </motion.div>
            </div>
        </section>
    )
}
