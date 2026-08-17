import { useState, useRef, useEffect, useCallback } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { content } from '../data/content'

export default function ChatInterface() {
    const { t } = useLanguage()
    const errorMessage = t(
        "Sorry, I'm having trouble connecting to the network.",
        "Lo siento, tengo problemas para conectarme a la red."
    )

    const idRef = useRef(0)
    const nextId = () => ++idRef.current

    const [messages, setMessages] = useState(() => [
        { id: 0, role: 'assistant', content: t(content.chat.greeting.en, content.chat.greeting.es) }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const scrollContainerRef = useRef(null)
    const messagesEndRef = useRef(null)
    const abortRef = useRef(null)

    const scrollToBottom = useCallback(() => {
        if (scrollContainerRef.current) {
            const { scrollHeight, clientHeight } = scrollContainerRef.current
            scrollContainerRef.current.scrollTo({
                top: scrollHeight - clientHeight,
                behavior: 'smooth'
            })
        }
    }, [])

    useEffect(() => {
        scrollToBottom()
    }, [messages, scrollToBottom])

    // Abort any in-flight request if the chat unmounts
    useEffect(() => () => abortRef.current?.abort(), [])

    const sendMessage = async (textToSend) => {
        const query = (textToSend || input).trim()
        if (!query || isLoading) return

        const userMessage = { id: nextId(), role: 'user', content: query }
        const newMessages = [...messages, userMessage]

        setMessages(newMessages)
        setInput('')
        setIsLoading(true)

        const controller = new AbortController()
        abortRef.current = controller

        try {
            const contextMessages = newMessages.slice(-10).map(({ role, content }) => ({ role, content }))

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: contextMessages }),
                signal: controller.signal
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const data = await response.json()
            const replyContent = data.reply || errorMessage
            setMessages([...newMessages, { id: nextId(), role: 'assistant', content: replyContent }])
        } catch (error) {
            if (controller.signal.aborted) return
            console.error('Error in chat:', error)
            setMessages([...newMessages, { id: nextId(), role: 'assistant', content: errorMessage }])
        } finally {
            if (!controller.signal.aborted) setIsLoading(false)
        }
    }

    const handleFormSubmit = (e) => {
        if (e) e.preventDefault()
        sendMessage()
    }

    const suggestions = [
        { en: "What is Daniel's current role?", es: "¿Cuál es el rol actual de Daniel?" },
        { en: "P&L impact at inDrive?", es: "¿Impacto en P&L en inDrive?" },
        { en: "AI & LangGraph experience?", es: "¿Experiencia en IA y LangGraph?" },
    ]

    return (
        <div className="glass-card text-text-dark dark:text-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[520px] border border-border dark:border-white/10 transition-all duration-300">
            <div className="bg-primary dark:bg-slate-950 text-white p-4 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-bold text-lg text-white shadow-glow-emerald">
                        N
                    </div>
                    <div>
                        <h4 className="font-heading font-bold m-0 leading-tight">
                            Nabla AI Agent
                        </h4>
                        <span className="text-xs text-emerald-400 flex items-center gap-1.5 mt-0.5 font-medium">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            Online · DeepSeek
                        </span>
                    </div>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-white/10 text-white/80">
                    AI Assistant
                </span>
            </div>

            <div
                ref={scrollContainerRef}
                aria-live="polite"
                aria-atomic="false"
                className="flex-grow p-5 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col gap-4 overflow-y-auto scroll-smooth"
            >
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''} animate-fade-in-up`}>
                        {msg.role === 'assistant' && (
                            <div className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xs shrink-0 mt-1 shadow-sm">
                                N
                            </div>
                        )}
                        <div
                            className={`p-3.5 text-sm md:text-base shadow-sm leading-relaxed ${msg.role === 'user'
                                ? 'bg-secondary text-white rounded-2xl rounded-tr-none max-w-[85%]'
                                : 'bg-white dark:bg-slate-800 rounded-2xl rounded-tl-none border border-border dark:border-slate-700 dark:text-gray-100 max-w-[90%]'
                                }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-3 animate-fade-in-up">
                        <div className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xs shrink-0">
                            N
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl rounded-tl-none shadow-sm flex gap-1.5 items-center border border-border dark:border-slate-700">
                            <span className="w-2 h-2 rounded-full bg-accent animate-bounce"></span>
                            <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                            <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-4 py-2 bg-slate-100/80 dark:bg-slate-900/80 border-t border-border dark:border-white/5 flex gap-2 overflow-x-auto">
                {suggestions.map((s, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => sendMessage(t(s.en, s.es))}
                        disabled={isLoading}
                        className="whitespace-nowrap text-xs bg-white dark:bg-slate-800 hover:bg-secondary hover:text-white dark:hover:bg-secondary text-gray-700 dark:text-gray-300 py-1.5 px-3 rounded-full border border-border dark:border-white/10 transition-colors shadow-xs cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-accent"
                    >
                        💡 {t(s.en, s.es)}
                    </button>
                ))}
            </div>

            <form onSubmit={handleFormSubmit} className="recommendation-form p-3 bg-white dark:bg-slate-950 border-t border-border dark:border-white/10 flex gap-2">
                <input
                    type="text"
                    value={input}
                    maxLength={1000}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t("Ask me about Daniel...", "Pregúntame sobre Daniel...")}
                    aria-label={t("Ask me about Daniel", "Pregúntame sobre Daniel")}
                    className="flex-grow bg-slate-100 dark:bg-slate-800 rounded-full py-2.5 px-4 text-sm text-text-dark dark:text-white outline-none border border-transparent focus:border-secondary transition-colors focus-visible:ring-2 focus-visible:ring-accent"
                />
                <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    aria-label={t("Send message", "Enviar mensaje")}
                    className="bg-secondary text-white w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent dark:focus-visible:ring-offset-slate-800 shrink-0"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-0.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                </button>
            </form>
        </div>
    )
}
