import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { 
  MistickLogo, 
  AnimatedText, 
  Button, 
  SocialIcon, 
  Divider, 
  ScrollIndicator 
} from '../../atoms'
import { openWhatsApp } from '../../../utils/whatsapp'
import heroBg from '../../../assets/images/hero-bg.jpg'

/**
 * Hero Organism - Seção hero principal
 */
const Hero = ({ isLoading = false }) => {
  const heroRef = useRef(null)
  const logoContainerRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (isLoading || hasAnimated.current) return
    hasAnimated.current = true

    const ctx = gsap.context(() => {
      // Logo container entrance
      gsap.fromTo(logoContainerRef.current,
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      )

      // CTA buttons
      gsap.fromTo('.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.2 }
      )

      // Scroll indicator
      gsap.fromTo('.scroll-indicator',
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 1.8 }
      )

      // Scroll indicator loop
      gsap.to('.scroll-indicator-arrow', {
        y: 8,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 2.2,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [isLoading])

  const scrollToServices = () => {
    const section = document.querySelector('#servicos')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-mistick-black/70 via-mistick-black/50 to-mistick-black/80" />
      </div>

      {/* Light effect overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-gradient-radial from-white/5 to-transparent blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-1/3 h-1/2 bg-gradient-radial from-accent/10 to-transparent blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="container-custom relative z-10 text-center pt-32 pb-24 sm:pt-36 sm:pb-28 md:pt-40 md:pb-32 lg:pt-44 lg:pb-36 px-4 sm:px-6">
        {/* Animated Mistick Logo */}
        <div ref={logoContainerRef} className="mb-8 sm:mb-10 md:mb-12 flex justify-center">
          <MistickLogo className="w-20 sm:w-28 md:w-36 lg:w-44" variant="light" />
        </div>

        {/* Brand Name */}
        <AnimatedText
          as="h1"
          animation="chars"
          stagger={0.04}
          delay={0.6}
          triggerOnScroll={false}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-wider text-white mb-3 sm:mb-4 md:mb-5"
        >
          Mistick
        </AnimatedText>

        {/* Subtitle */}
        <AnimatedText
          as="p"
          animation="words"
          stagger={0.1}
          delay={1.1}
          triggerOnScroll={false}
          className="font-sans text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white/70 mb-8 sm:mb-10 md:mb-12"
        >
          by Daniele Ribeiro
        </AnimatedText>

        {/* Decorative Divider */}
        <Divider variant="diamond" className="mb-8 sm:mb-10 md:mb-12" />

        {/* Tagline */}
        <AnimatedText
          as="p"
          animation="lines"
          delay={1.3}
          triggerOnScroll={false}
          className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/80 italic max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-14 leading-relaxed"
        >
          Criando momentos que transcendem o ordinário
        </AnimatedText>

        {/* CTA Buttons */}
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5">
          <Button
            variant="primary"
            onClick={() => openWhatsApp('greeting')}
            icon={<SocialIcon name="whatsapp" className="w-4 h-4 sm:w-5 sm:h-5" />}
            className="w-full sm:w-auto"
          >
            Fale Conosco
          </Button>

          <Button
            variant="secondary"
            onClick={scrollToServices}
            className="w-full sm:w-auto"
          >
            Nossos Serviços
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex">
        <ScrollIndicator />
      </div>
    </section>
  )
}

export default Hero
