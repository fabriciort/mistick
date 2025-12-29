import { useState, useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Loader } from '../atoms'
import { WhatsAppFloatingButton } from '../molecules'
import { Header, Footer } from '../organisms'

/**
 * MainLayout Template - Layout principal da aplicação
 * Gerencia estado de loading e estrutura base da página
 */
const MainLayout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
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
          {/* Pass isLoading to children that need it */}
          {typeof children === 'function' 
            ? children({ isLoading }) 
            : children
          }
        </main>
        <Footer />
        <WhatsAppFloatingButton />
      </div>
    </>
  )
}

export default MainLayout
