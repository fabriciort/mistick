import { useState } from 'react'
import { ScrollTrigger, refreshScrollTrigger } from '@shared/lib/gsap'
import { useBodyScrollLock } from '@shared/hooks'
import { Loader } from '@shared/ui'
import { WhatsAppButton } from '@features/whatsapp'
import { Header, Footer } from '@widgets'

// Componentes legados ainda não migrados para widgets/
// TODO: Migrar para widgets/ seguindo o padrão FSD
import Hero from '../components/Hero'
import About from '../components/About'
import Story from '../components/Story'
import Services from '../components/Services'
import Contact from '../components/Contact'

/**
 * App Component
 * 
 * Componente raiz da aplicação.
 * Gerencia o estado de loading e compõe os widgets principais.
 */
function App() {
  const [isLoading, setIsLoading] = useState(true)

  // Lock body scroll during loading
  useBodyScrollLock(isLoading)

  const handleLoadComplete = () => {
    setIsLoading(false)
    // Refresh ScrollTrigger after loading
    refreshScrollTrigger()
  }

  return (
    <>
      {isLoading && <Loader onComplete={handleLoadComplete} />}

      <div
        className={`transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
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
