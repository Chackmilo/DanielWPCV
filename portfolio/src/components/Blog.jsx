import { useLanguage } from '../context/LanguageContext'
import { content } from '../data/content'
import { blogPosts } from '../data/blog'
import SectionTitle from './SectionTitle'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05,
        }
    }
}

const cardVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: "spring", stiffness: 120, damping: 18 }
    }
}

export default function Blog() {
    const { t } = useLanguage()
    const blogTitle = t(content.nav.blog.en, content.nav.blog.es)

    if (!blogPosts || blogPosts.length === 0) return null

    return (
        <section id="blog" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-bg-section dark:bg-slate-900/60 content-vis-auto relative">
            <div className="max-w-[1100px] mx-auto">
                <SectionTitle>{blogTitle}</SectionTitle>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="flex flex-col gap-6 sm:gap-8 mt-12"
                >
                    {blogPosts.map((post) => (
                        <motion.article
                            variants={cardVariants}
                            key={post.id}
                            className="glass-card rounded-2xl overflow-hidden border border-border dark:border-white/10 p-6 sm:p-8 hover:border-secondary dark:hover:border-secondary hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex justify-between items-start flex-wrap gap-4 mb-3">
                                <h3 className="text-xl sm:text-2xl font-bold font-heading text-primary dark:text-white tracking-tight">
                                    {t(post.title.en, post.title.es)}
                                </h3>
                                <span className="text-secondary dark:text-accent text-xs sm:text-sm tracking-wider font-bold">
                                    {post.date}
                                </span>
                            </div>

                            <div className="flex gap-2 mb-5 flex-wrap">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 py-1 px-3 rounded-full border border-border dark:border-white/5 font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div>
                                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                    {t(post.summary.en, post.summary.es)}
                                </p>
                                <Link
                                    to={`/blog/${post.id}`}
                                    className="text-secondary dark:text-accent font-bold hover:underline transition-colors cursor-pointer inline-flex items-center gap-1 text-sm sm:text-base"
                                >
                                    <span>{t(content.blog.readMore.en, content.blog.readMore.es)}</span>
                                    <span>→</span>
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
