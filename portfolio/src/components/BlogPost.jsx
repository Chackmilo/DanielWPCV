import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../context/LanguageContext'
import { blogPosts } from '../data/blog'
import { motion } from 'framer-motion'


// Parse inline **bold** and *italic* markers into React elements
function parseInlineFormatting(text) {
    // Process **bold** first, then *italic* in remaining segments
    const parts = text.split(/\*\*([^*]+)\*\*/g)
    if (parts.length === 1) {
        // No bold — try italic only
        const italicParts = text.split(/\*([^*]+)\*/g)
        if (italicParts.length === 1) return text
        return italicParts.map((part, i) =>
            i % 2 === 1 ? <em key={`i${i}`}>{part}</em> : part
        )
    }
    return parts.map((part, i) => {
        if (i % 2 === 1) return <strong key={`b${i}`}>{part}</strong>
        // Within non-bold segments, check for italic
        if (!part) return null
        const italicParts = part.split(/\*([^*]+)\*/g)
        if (italicParts.length === 1) return part
        return italicParts.map((sub, j) =>
            j % 2 === 1 ? <em key={`i${i}-${j}`}>{sub}</em> : sub
        )
    })
}

// Pure function — no dependency on component state
function renderContent(text) {
    return text.split('\n').map((line, idx) => {
        if (line.trim().startsWith('###')) {
            return <h3 key={idx} className="text-2xl font-bold font-heading text-primary dark:text-white mb-4 mt-8">{line.replace('### ', '')}</h3>
        }
        if (line.trim().startsWith('*') && line.trim().endsWith('*') && !line.trim().slice(1, -1).includes('*')) {
            return <p key={idx} className="italic text-gray-600 dark:text-gray-400 mb-6 text-lg">{line.replace(/\*/g, '')}</p>
        }
        if (line.trim() === '') return null;
        return <p key={idx} className="mb-6 text-text-dark dark:text-gray-300 leading-relaxed text-lg">{parseInlineFormatting(line)}</p>
    })
}

export default function BlogPost() {
    const { id } = useParams()
    const { lang, t } = useLanguage()

    const post = blogPosts.find(p => p.id === id)

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-bg-light dark:bg-slate-900 px-8">
                <Helmet>
                    <title>404 - Post Not Found | Daniel Pardo</title>
                </Helmet>
                <h1 className="text-4xl font-heading font-bold text-primary dark:text-white mb-4">404</h1>
                <p className="text-text-dark dark:text-gray-300 mb-8">The article you are looking for does not exist.</p>
                <Link to="/#blog" className="px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-accent transition-colors shadow-md">
                    Return to Home
                </Link>
            </div>
        )
    }

    const title = t(post.title.en, post.title.es)
    const summary = t(post.summary.en, post.summary.es)

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="min-h-screen bg-bg-light dark:bg-slate-900 pt-32 pb-16 px-8"
        >
            <Helmet>
                <title>{title} - Daniel Pardo</title>
                <meta name="description" content={summary} />
                <html lang={lang} />
                <link rel="canonical" href={`https://danielwpcv.vercel.app/blog/${id}`} />
                <link rel="alternate" hreflang="en" href={`https://danielwpcv.vercel.app/blog/${id}`} />
                <link rel="alternate" hreflang="es" href={`https://danielwpcv.vercel.app/blog/${id}`} />
                <link rel="alternate" hreflang="x-default" href={`https://danielwpcv.vercel.app/blog/${id}`} />
                {/* Add Open Graph tags for better social sharing */}
                <meta property="og:title" content={`${title} - Daniel Pardo`} />
                <meta property="og:description" content={summary} />
                <meta property="og:type" content="article" />
                <meta property="article:published_time" content={post.date} />
                {post.tags.map(tag => (
                    <meta property="article:tag" content={tag} key={tag} />
                ))}
            </Helmet>

            <div className="max-w-[800px] mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-border dark:border-slate-700">
                <header className="px-8 py-10 md:px-12 md:py-16 bg-bg-section dark:bg-slate-900 border-b border-border dark:border-slate-700">
                    <Link to="/#blog" className="inline-flex items-center text-sm font-semibold text-secondary hover:text-accent mb-8 transition-colors">
                        ← {lang === 'es' ? 'Volver al inicio' : 'Back to home'}
                    </Link>

                    <div className="flex gap-2 mb-6 flex-wrap">
                        {post.tags.map(tag => (
                            <span key={tag} className="text-xs bg-white dark:bg-slate-700 text-text-dark dark:text-gray-300 py-1.5 px-4 rounded-full border border-border dark:border-slate-600 font-medium shadow-sm">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold font-heading text-primary dark:text-white leading-tight mb-6">
                        {title}
                    </h1>

                    <p className="text-secondary dark:text-accent font-semibold tracking-wide">
                        {post.date}
                    </p>
                </header>

                <div className="px-8 py-12 md:px-12 md:py-16">
                    <div className="prose prose-lg max-w-none text-text-dark dark:text-gray-300">
                        <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-400 italic border-l-4 border-secondary dark:border-secondary pl-6 mb-10">
                            {summary}
                        </p>

                        {renderContent(t(post.content.en, post.content.es))}
                    </div>
                </div>
            </div>
        </motion.article>
    )
}
