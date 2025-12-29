/**
 * @fileoverview About organism component
 * About section with features and CTA
 */

import { useEffect, useRef, memo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatedText, FeatureCard } from '../../molecules'
import { Icon } from '../../atoms'
import { cn } from '../../../lib/cn'
import { openWhatsApp } from '../../../utils/whatsapp'
import { SECTION_STYLES } from '../../../styles/tailwind-classes'
import { DURATION, EASING, STAGGER } from '../../../styles/animation-theme'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  { iconName: 'heart', title: 'Dedicação', description: 'Atenção exclusiva em cada projeto' },
  { iconName: 'lightbulb', title: 'Criatividade', description: 'Ideias únicas para você' },
  { iconName: 'star', title: 'Confiança', description: 'Excelência em cada detalhe' },
]

/**
 * About section component
 */
const About = () => {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation
      gsap.fromTo(imageRef.current,
        { scale: 0.9, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: DURATION.SLOW,
          ease: EASING.DEFAULT,
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Features animation
      gsap.fromTo('.about-feature',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DURATION.NORMAL,
          stagger: STAGGER.MEDIUM,
          ease: EASING.DEFAULT,
          scrollTrigger: {
            trigger: '.about-features',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className={cn('relative bg-cream overflow-hidden', SECTION_STYLES.padding)}
    >
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-1/2 sm:w-1/3 h-full bg-gradient-to-l from-cream-dark/50 to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Image Column */}
          <AboutImage ref={imageRef} />

          {/* Text Column */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <AnimatedText
              as="span"
              animation="words"
              className="font-sans text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gold mb-3 sm:mb-4 block"
            >
              A Arte do Encontro
            </AnimatedText>

            <AnimatedText
              as="h2"
              animation="words"
              stagger={0.04}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-forest mb-6 sm:mb-8 leading-tight"
            >
              Mistick: Onde a magia acontece
            </AnimatedText>

            <AnimatedText
              as="p"
              animation="lines"
              className="font-sans text-base sm:text-lg text-forest-light leading-relaxed mb-4 sm:mb-6"
            >
              Olá! Sou Daniele Ribeiro, a mente criativa por trás da Mistick.
              Minha paixão é orquestrar momentos que transcendem o comum,
              criando experiências que ficam marcadas na alma.
            </AnimatedText>

            <AnimatedText
              as="p"
              animation="lines"
              className="font-sans text-base sm:text-lg text-forest-light leading-relaxed mb-8 sm:mb-10"
            >
              Cada celebração é um ritual único. Na Mistick, unimos elegância,
              precisão e uma pitada de encanto para contar a sua história
              de forma autêntica e inesquecível.
            </AnimatedText>

            {/* Features */}
            <div className="about-features grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10">
              {FEATURES.map((feature, index) => (
                <FeatureCard
                  key={index}
                  iconName={feature.iconName}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>

            {/* CTA */}
            <div className="flex justify-center lg:justify-start">
              <button
                onClick={() => openWhatsApp('consulting')}
                className="group inline-flex items-center gap-2 sm:gap-3 font-sans text-sm tracking-widest uppercase text-gold hover:text-gold-dark transition-colors duration-300 touch-target"
              >
                <span>Vamos Conversar</span>
                <Icon 
                  name="arrowRight" 
                  size="md" 
                  className="transform transition-transform duration-300 group-hover:translate-x-2"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * About section image placeholder
 */
const AboutImage = memo(({ ...props }, ref) => (
  <div ref={ref} className="relative order-2 lg:order-1 mx-auto lg:mx-0 max-w-sm lg:max-w-none" {...props}>
    {/* Decorative frames */}
    <div className="absolute -inset-2 sm:-inset-4 border-2 border-gold/20 rounded-xl sm:rounded-2xl transform rotate-2 hidden sm:block" />
    <div className="absolute -inset-2 sm:-inset-4 border-2 border-forest/10 rounded-xl sm:rounded-2xl transform -rotate-1 hidden sm:block" />

    {/* Image placeholder */}
    <div className="relative bg-gradient-to-br from-forest via-forest-light to-forest rounded-xl sm:rounded-2xl aspect-[4/5] flex items-center justify-center overflow-hidden shadow-xl sm:shadow-2xl">
      {/* Decorative pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="about-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="currentColor" className="text-cream" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#about-pattern)" />
      </svg>

      <div className="text-center text-cream p-6 sm:p-8 relative z-10">
        <div className="w-16 h-8 sm:w-24 sm:h-12 mx-auto mb-4 sm:mb-6 text-gold">
          <span className="font-serif text-4xl">M</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl mb-1 sm:mb-2 text-cream">Daniele Ribeiro</h3>
        <p className="font-sans text-xs sm:text-sm tracking-widest uppercase text-gold">
          Founder & Creative Director
        </p>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-transparent opacity-60" />
    </div>
  </div>
))

AboutImage.displayName = 'AboutImage'

export default memo(About)
