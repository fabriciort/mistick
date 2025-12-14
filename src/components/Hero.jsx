import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import AnimatedText from './AnimatedText'
import MistickLogo from './MistickLogo'
import { openWhatsApp } from '../utils/whatsapp'

const Hero = () => {
  const heroRef = useRef(null)
  const logoContainerRef = useRef(null)
  const decorRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo container entrance
      gsap.fromTo(logoContainerRef.current,
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 }
      )

      // Decorative elements
      gsap.fromTo('.hero-decor',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 0.05, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.5 }
      )

      // CTA buttons
      gsap.fromTo('.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.5 }
      )

      // Scroll indicator
      gsap.fromTo('.scroll-indicator',
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 2 }
      )

      // Scroll indicator loop
      gsap.to('.scroll-indicator-arrow', {
        y: 8,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 2.5,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

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
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="hero-decor absolute -top-20 -right-20 sm:-top-32 sm:-right-32 w-64 h-64 sm:w-96 sm:h-96 md:w-[500px] md:h-[500px] rounded-full bg-accent"
          ref={decorRef}
        />
        <div className="hero-decor absolute top-1/3 -left-24 sm:-left-40 w-48 h-48 sm:w-72 sm:h-72 rounded-full bg-mistick-black" />
        <div className="hero-decor absolute bottom-24 right-1/4 w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-accent-light hidden sm:block" />

        {/* Subtle Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="1" height="80" fill="currentColor" className="text-mistick-black" />
              <rect x="0" y="0" width="80" height="1" fill="currentColor" className="text-mistick-black" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="container-custom relative z-10 text-center pt-28 pb-20 sm:pt-32 sm:pb-24 md:py-36 px-4">
        {/* Animated Mistick Logo */}
        <div ref={logoContainerRef} className="mb-10 sm:mb-12 flex justify-center">
          <MistickLogo className="w-24 sm:w-32 md:w-40" />
        </div>

        {/* Brand Name */}
        <AnimatedText
          as="h1"
          animation="chars"
          stagger={0.04}
          delay={0.6}
          triggerOnScroll={false}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-wider text-mistick-black mb-4 sm:mb-5"
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
          className="font-sans text-sm sm:text-base md:text-lg tracking-[0.3em] uppercase text-mistick-charcoal mb-10 sm:mb-12"
        >
          by Daniele Ribeiro
        </AnimatedText>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-4 sm:gap-5 mb-10 sm:mb-12">
          <div className="w-16 sm:w-24 md:w-32 h-px bg-gradient-to-r from-transparent to-accent" />
          <div className="w-2 h-2 rounded-full bg-accent" />
          <div className="w-16 sm:w-24 md:w-32 h-px bg-gradient-to-l from-transparent to-accent" />
        </div>

        {/* Tagline */}
        <AnimatedText
          as="p"
          animation="lines"
          delay={1.3}
          triggerOnScroll={false}
          className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-mistick-charcoal italic max-w-sm sm:max-w-xl md:max-w-3xl mx-auto mb-12 sm:mb-14 leading-relaxed px-2"
        >
          Criando momentos que transcendem o ordinário
        </AnimatedText>

        {/* CTA Buttons */}
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <button
            onClick={() => openWhatsApp('greeting')}
            className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-mistick-black text-white font-sans text-sm tracking-widest uppercase rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-mistick-black/30 touch-target"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Fale Conosco
            </span>
            <div className="absolute inset-0 bg-accent transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
          </button>

          <button
            onClick={scrollToServices}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 border-2 border-mistick-black text-mistick-black font-sans text-sm tracking-widest uppercase rounded-full transition-all duration-300 hover:bg-mistick-black hover:text-white touch-target"
          >
            Nossos Serviços
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-mistick-charcoal/60 hidden sm:flex">
        <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase">Scroll</span>
        <div className="scroll-indicator-arrow">
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero
