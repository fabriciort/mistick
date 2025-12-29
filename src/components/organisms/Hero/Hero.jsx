/**
 * @fileoverview Hero organism component
 * Main hero section with animated content
 */

import { useEffect, useRef, memo } from 'react'
import gsap from 'gsap'
import { Logo } from '../../atoms'
import { Button, Icon } from '../../atoms'
import { AnimatedText } from '../../molecules'
import { cn } from '../../../lib/cn'
import { openWhatsApp } from '../../../utils/whatsapp'
import { DURATION, EASING } from '../../../styles/animation-theme'

// Import hero background image
import heroBg from '../../../assets/images/hero-bg.jpg'

/**
 * Hero section component
 * @param {Object} props
 * @param {boolean} [props.isLoading=false] - Loading state
 */
const Hero = ({ isLoading = false }) => {
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
        { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: EASING.DEFAULT, delay: 0.3 }
      )

      // CTA buttons
      gsap.fromTo('.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: DURATION.MEDIUM, ease: EASING.DEFAULT, delay: 1.2 }
      )

      // Scroll indicator
      gsap.fromTo('.scroll-indicator',
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: DURATION.NORMAL, ease: EASING.DEFAULT, delay: 1.8 }
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
          <Logo className="w-20 sm:w-28 md:w-36 lg:w-44" variant="light" />
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
        <DecorativeDivider />

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
        <HeroButtons onScrollToServices={scrollToServices} />
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  )
}

/**
 * Decorative divider component
 */
const DecorativeDivider = memo(() => (
  <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 mb-8 sm:mb-10 md:mb-12">
    <div className="w-12 sm:w-20 md:w-28 lg:w-36 h-px bg-gradient-to-r from-transparent to-accent" />
    <div 
      className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent" 
      style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} 
    />
    <div className="w-12 sm:w-20 md:w-28 lg:w-36 h-px bg-gradient-to-l from-transparent to-accent" />
  </div>
))

DecorativeDivider.displayName = 'DecorativeDivider'

/**
 * Hero CTA buttons component
 */
const HeroButtons = memo(({ onScrollToServices }) => (
  <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5">
    {/* Primary Button */}
    <button
      onClick={() => openWhatsApp('greeting')}
      className={cn(
        'group relative w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4',
        'bg-white text-mistick-black font-sans text-xs sm:text-sm tracking-widest uppercase',
        'overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-white/20 touch-target'
      )}
      style={{
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.1)'
      }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
        <Icon name="whatsapp" size="md" />
        Fale Conosco
      </span>
      <span className="absolute inset-0 bg-accent transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </button>

    {/* Secondary Button */}
    <button
      onClick={onScrollToServices}
      className={cn(
        'group relative w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4',
        'border border-white/50 text-white font-sans text-xs sm:text-sm tracking-widest uppercase',
        'transition-all duration-300 hover:bg-white hover:text-mistick-black hover:border-white touch-target overflow-hidden'
      )}
    >
      <span className="relative z-10">Nossos Serviços</span>
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </button>
  </div>
))

HeroButtons.displayName = 'HeroButtons'

/**
 * Scroll indicator component
 */
const ScrollIndicator = memo(() => (
  <div className="scroll-indicator absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/50 hidden sm:flex">
    <span className="text-[10px] sm:text-xs tracking-[0.15em] uppercase">Scroll</span>
    <div className="scroll-indicator-arrow">
      <Icon name="arrowDown" size="md" className="w-5 h-5 sm:w-6 sm:h-6" />
    </div>
  </div>
))

ScrollIndicator.displayName = 'ScrollIndicator'

export default memo(Hero)
