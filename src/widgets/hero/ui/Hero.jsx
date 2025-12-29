import { useEffect, useRef } from 'react'
import { gsap } from '@/shared/lib/gsap'
import AnimatedText from '@/shared/ui/AnimatedText'
import MistickLogo from '@/shared/ui/brand/MistickLogo'
import { openWhatsApp } from '@/features/whatsapp'

// Import hero background image
import heroBg from '@/shared/assets/images/hero-bg.jpg'

const Hero = ({ isLoading }) => {
  const heroRef = useRef(null)
  const logoContainerRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    // Only animate after loading is complete and hasn't animated yet
    if (isLoading || hasAnimated.current) return
    hasAnimated.current = true

    const ctx = gsap.context(() => {
      // Logo container entrance
      gsap.fromTo(logoContainerRef.current,
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      )

      // CTA buttons with light shimmer effect
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
        {/* Dark Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-mistick-black/70 via-mistick-black/50 to-mistick-black/80" />
      </div>

      {/* Subtle light effect overlay */}
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
        <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 mb-8 sm:mb-10 md:mb-12">
          <div className="w-12 sm:w-20 md:w-28 lg:w-36 h-px bg-gradient-to-r from-transparent to-accent" />
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
          <div className="w-12 sm:w-20 md:w-28 lg:w-36 h-px bg-gradient-to-l from-transparent to-accent" />
        </div>

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

        {/* CTA Buttons - Squared/Rectangular Style */}
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5">
          {/* Primary Button */}
          <button
            onClick={() => openWhatsApp('greeting')}
            className="group relative w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-white text-mistick-black font-sans text-xs sm:text-sm tracking-widest uppercase overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-white/20 touch-target"
            style={{
              // Subtle inner light border
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.1)'
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Fale Conosco
            </span>
            {/* Hover fill effect */}
            <div className="absolute inset-0 bg-accent transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
            {/* Light shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>

          {/* Secondary Button */}
          <button
            onClick={scrollToServices}
            className="group relative w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4 border border-white/50 text-white font-sans text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-mistick-black hover:border-white touch-target overflow-hidden"
          >
            <span className="relative z-10">Nossos Serviços</span>
            {/* Light shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/50 hidden sm:flex">
        <span className="text-[10px] sm:text-xs tracking-[0.15em] uppercase">Scroll</span>
        <div className="scroll-indicator-arrow">
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero
