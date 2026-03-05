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

export default function Blog() {
    const { t } = useLanguage()
    const blogTitle = t(content.nav.blog.en, content.nav.blog.es)

    if (!blogPosts || blogPosts.length === 0) return null;

    return (
        <section id="blog" className="py-16 px-8 bg-bg-section dark:bg-slate-900 content-vis-auto">
            <div className="max-w-[1000px] mx-auto">
                <SectionTitle>{blogTitle}</SectionTitle>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="flex flex-col gap-8"
                >
                    {blogPosts.map((post) => (
                        <motion.article
                            variants={cardVariants}
                            key={post.id}
                            className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md border border-border dark:border-slate-700 p-8 hover:border-secondary dark:hover:border-secondary hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                                <h3 className="text-2xl font-bold font-heading text-primary dark:text-white">{t(post.title.en, post.title.es)}</h3>
                                <span className="text-secondary dark:text-accent text-sm tracking-wider font-semibold">{post.date}</span>
                            </div>

                            <div className="flex gap-2 mb-6 flex-wrap">
                                {post.tags.map(tag => (
                                    <span key={tag} className="text-xs bg-bg-section dark:bg-slate-700 text-text-dark dark:text-gray-300 py-1 px-3 rounded-full border border-border dark:border-slate-600 font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div>
                                <p className="text-text-dark dark:text-gray-300 leading-relaxed mb-6">
                                    {t(post.summary.en, post.summary.es)}
                                </p>
                                <Link
                                    to={`/blog/${post.id}`}
                                    className="text-secondary dark:text-accent font-semibold hover:text-accent dark:hover:text-secondary transition-colors cursor-pointer inline-block"
                                >
                                    {t(content.blog.readMore.en, content.blog.readMore.es)} →
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

