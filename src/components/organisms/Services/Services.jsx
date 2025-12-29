/**
 * @fileoverview Services organism component
 * Services section with animated cards
 */

import { useEffect, useRef, memo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatedText, ServiceCard } from '../../molecules'
import { Button } from '../../atoms'
import { cn } from '../../../lib/cn'
import { SERVICES } from '../../../constants'
import { openWhatsApp } from '../../../utils/whatsapp'
import { SECTION_STYLES } from '../../../styles/tailwind-classes'
import { DURATION, EASING, STAGGER } from '../../../styles/animation-theme'

gsap.registerPlugin(ScrollTrigger)

/**
 * Services section component
 */
const Services = () => {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card animations with stagger
      cardsRef.current.forEach((card, index) => {
        if (!card) return
        
        gsap.fromTo(card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: DURATION.NORMAL,
            ease: EASING.DEFAULT,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            delay: index * STAGGER.MEDIUM,
          }
        )
      })

      // Decorative element rotation
      gsap.to('.services-decor', {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: 'none',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="servicos"
      ref={sectionRef}
      className={cn('relative bg-forest overflow-hidden', SECTION_STYLES.padding)}
    >
      {/* Decorative Elements */}
      <ServicesBackground />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <SectionHeader />

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 xl:gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              ref={el => cardsRef.current[index] = el}
              index={index}
              iconName={service.iconName}
              title={service.title}
              description={service.description}
              features={service.features}
              onAction={() => openWhatsApp('event')}
            />
          ))}
        </div>

        {/* Central CTA */}
        <ServicesCTA />
      </div>
    </section>
  )
}

/**
 * Services section background decorations
 */
const ServicesBackground = memo(() => (
  <div className="absolute inset-0 pointer-events-none">
    {/* Rotating circles */}
    <div className="services-decor absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 border border-gold/10 rounded-full" />
    <div className="services-decor absolute -bottom-32 -left-32 sm:-bottom-60 sm:-left-60 w-48 h-48 sm:w-96 sm:h-96 border border-cream/5 rounded-full" />
    
    {/* Background pattern */}
    <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="services-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M40 0L80 40L40 80L0 40Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cream" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#services-pattern)" />
    </svg>
  </div>
))

ServicesBackground.displayName = 'ServicesBackground'

/**
 * Services section header
 */
const SectionHeader = memo(() => (
  <div className="text-center mb-10 sm:mb-12 md:mb-16">
    <AnimatedText
      as="span"
      animation="words"
      className="font-sans text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gold mb-3 sm:mb-4 block"
    >
      O Que Oferecemos
    </AnimatedText>

    <AnimatedText
      as="h2"
      animation="words"
      stagger={0.04}
      className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream mb-4 sm:mb-6"
    >
      Nossos Serviços
    </AnimatedText>

    <AnimatedText
      as="p"
      animation="lines"
      className="font-sans text-base sm:text-lg text-cream/70 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto px-2"
    >
      Soluções completas para tornar cada momento especial.
      Da concepção à realização, estamos ao seu lado.
    </AnimatedText>
  </div>
))

SectionHeader.displayName = 'SectionHeader'

/**
 * Services section CTA
 */
const ServicesCTA = memo(() => (
  <div className="text-center mt-10 sm:mt-12 md:mt-16">
    <AnimatedText
      as="p"
      animation="lines"
      className="font-serif text-base sm:text-lg md:text-xl text-cream/70 italic mb-4 sm:mb-6 px-4"
    >
      Não encontrou o que procura? Criamos soluções personalizadas.
    </AnimatedText>
    <button
      onClick={() => openWhatsApp('consulting')}
      className={cn(
        'group relative px-6 sm:px-8 md:px-10 py-3 sm:py-4',
        'bg-transparent border-2 border-gold text-gold',
        'font-sans text-xs sm:text-sm tracking-widest uppercase rounded-full',
        'overflow-hidden transition-all duration-500 hover:text-forest touch-target'
      )}
    >
      <span className="relative z-10">Solicite uma Proposta</span>
      <span className="absolute inset-0 bg-gold transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
    </button>
  </div>
))

ServicesCTA.displayName = 'ServicesCTA'

export default memo(Services)
