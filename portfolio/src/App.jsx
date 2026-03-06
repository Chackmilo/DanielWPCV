import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { content } from './data/content'
import { ThemeProvider } from './context/ThemeContext'
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
  const pageTitle = t(content.meta.title.en, content.meta.title.es)
  const pageDesc = t(content.meta.description.en, content.meta.description.es)

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <html lang={lang} />
        <link rel="alternate" hreflang="en" href="https://danielwpcv.vercel.app/" />
        <link rel="alternate" hreflang="es" href="https://danielwpcv.vercel.app/" />
        <link rel="alternate" hreflang="x-default" href="https://danielwpcv.vercel.app/" />
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
          </Routes>

          <Footer />
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
