import { Suspense, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ScrollTrigger, registerGsap } from '../../../lib/gsap/register-gsap'
import { Loader } from '../../molecules'
import { Footer, Header, WhatsAppButton } from '../../organisms'
import { ErrorBoundary } from '../ErrorBoundary'
import { getAppShellClassName } from './MainTemplate.styles'

export default function MainTemplate() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Disable scroll during loading
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isLoading])

  const handleLoadComplete = () => {
    registerGsap()
    setIsLoading(false)

    // Refresh ScrollTrigger after loading
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
  }

  return (
    <>
      {isLoading && <Loader onComplete={handleLoadComplete} />}

      <div className={getAppShellClassName({ isLoading })}>
        <Header />
        <main>
          <ErrorBoundary>
            <Suspense fallback={null}>
              <Outlet context={{ isLoading }} />
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  )
}

