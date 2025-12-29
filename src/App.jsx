/**
 * @fileoverview Main App component
 * Root component with loading state, error boundary, and layout structure
 */

import { useState, useEffect, Suspense, lazy, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MainLayout } from './components/templates'
import { Loader } from './components/organisms'
import { refreshScrollTrigger } from './hooks'

// Register GSAP plugins once at app level
gsap.registerPlugin(ScrollTrigger)

// Lazy load the Home page for code splitting
const Home = lazy(() => import('./components/pages/Home'))

/**
 * Loading fallback component for Suspense
 */
const PageLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-cream">
    <div className="animate-pulse text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/20" />
      <p className="text-forest/60 font-sans text-sm tracking-widest uppercase">
        Carregando...
      </p>
    </div>
  </div>
)

/**
 * Main App component
 */
function App() {
  const [isLoading, setIsLoading] = useState(true)

  // Disable scroll during loading
  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isLoading])

  // Handle load complete
  const handleLoadComplete = useCallback(() => {
    setIsLoading(false)
    
    // Refresh ScrollTrigger after loading to recalculate positions
    setTimeout(() => {
      refreshScrollTrigger()
    }, 100)
  }, [])

  return (
    <>
      {/* Initial page loader */}
      {isLoading && <Loader onComplete={handleLoadComplete} />}

      {/* Main content with transition */}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <MainLayout>
          <Suspense fallback={<PageLoadingFallback />}>
            <Home isLoading={isLoading} />
          </Suspense>
        </MainLayout>
      </div>
    </>
  )
}

export default App
