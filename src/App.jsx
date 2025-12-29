import { gsap, ScrollTrigger } from './config/gsap'
import { MainLayout, Hero, About, Story, Services, Contact } from './components'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

/**
 * App Component
 * Utiliza Atomic Design com MainLayout como template
 * e organisms como seções da página
 */
function App() {
  return (
    <MainLayout>
      {({ isLoading }) => (
        <>
          <Hero isLoading={isLoading} />
          <About />
          <Story />
          <Services />
          <Contact />
        </>
      )}
    </MainLayout>
  )
}

export default App
