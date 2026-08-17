import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { content } from './data/content'
import { ThemeProvider } from './context/ThemeContext'
import { NAVBAR_OFFSET_PX } from './utils/constants'
import Navbar from './components/Navbar'
import AboutMe from './components/AboutMe'
import Skills from './components/Skills'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import BlogPost from './components/BlogPost'

const Projects = lazy(() => import('./components/Projects'))
const Education = lazy(() => import('./components/Education'))
const Recommendations = lazy(() => import('./components/Recommendations'))
const Blog = lazy(() => import('./components/Blog'))
const Certifications = lazy(() => import('./components/Certifications'))

const SectionFallback = () => (
  <div className="flex justify-center items-center py-32">
    <div className="w-12 h-12 border-4 border-slate-200 border-t-accent rounded-full animate-spin"></div>
  </div>
)

function Home() {
  const { lang, t } = useLanguage()
  const location = useLocation()
  const pageTitle = t(content.meta.title.en, content.meta.title.es)
  const pageDesc = t(content.meta.description.en, content.meta.description.es)

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const timer = setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          const offset = el.offsetTop - NAVBAR_OFFSET_PX
          window.scrollTo({ top: offset, behavior: 'smooth' })
        }
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [location.hash])

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <html lang={lang} />
        <link rel="canonical" href="https://danielwpcv.vercel.app/" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
      </Helmet>

      <main id="main" role="main">
        <AboutMe />
        <Skills />
        <ErrorBoundary><Suspense fallback={<SectionFallback />}><Projects /></Suspense></ErrorBoundary>
        <ErrorBoundary><Suspense fallback={<SectionFallback />}><Education /></Suspense></ErrorBoundary>
        <ErrorBoundary><Suspense fallback={<SectionFallback />}><Recommendations /></Suspense></ErrorBoundary>
        <ErrorBoundary><Suspense fallback={<SectionFallback />}><Blog /></Suspense></ErrorBoundary>
        <ErrorBoundary><Suspense fallback={<SectionFallback />}><Certifications /></Suspense></ErrorBoundary>
      </main>
    </>
  )
}

function NotFound() {
  const { t } = useLanguage()
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-bg-light dark:bg-slate-900 px-8 py-20">
      <Helmet>
        <title>404 - Page Not Found | Daniel Pardo</title>
      </Helmet>
      <h1 className="text-5xl font-heading font-extrabold text-primary dark:text-white mb-4">404</h1>
      <p className="text-text-dark dark:text-gray-300 mb-8 text-lg">{t("The page you are looking for does not exist.", "La página que buscas no existe.")}</p>
      <Link to="/" className="px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-accent transition-colors shadow-md">
        {t("Return to Home", "Volver al inicio")}
      </Link>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          {/* 
            Navbar and Footer are outside the Routes, 
            so they remain consistently visible across pages. 
          */}
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
