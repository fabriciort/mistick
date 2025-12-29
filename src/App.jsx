import { useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Header from './components/Header'
import Hero from './components/organisms/Hero'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Story from './components/Story'
import WhatsAppButton from './components/WhatsAppButton'
import Loader from './components/Loader'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

function App() {
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
    setIsLoading(false)
    // Refresh ScrollTrigger after loading
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
  }

  return (
    <>
      {isLoading && <Loader onComplete={handleLoadComplete} />}

      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Header />
        <main>
          <Hero isLoading={isLoading} />
          <About />
          <Story />
          <Services />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  )
}

export default App
