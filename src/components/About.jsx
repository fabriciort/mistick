import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText from './AnimatedText'
import { openWhatsApp } from '../utils/whatsapp'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação da imagem/placeholder
      gsap.fromTo(imageRef.current,
        { scale: 0.9, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Animação das features
      gsap.fromTo('.about-feature',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
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

  const features = [
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Dedicação',
      description: 'Atenção exclusiva em cada projeto',
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Criatividade',
      description: 'Ideias únicas para você',
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Confiança',
      description: 'Excelência em cada detalhe',
    },
  ]

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-cream overflow-hidden"
    >
      {/* Elemento decorativo */}
      <div className="absolute top-0 right-0 w-1/2 sm:w-1/3 h-full bg-gradient-to-l from-cream-dark/50 to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Coluna da imagem - ordem invertida em mobile */}
          <div ref={imageRef} className="relative order-2 lg:order-1 mx-auto lg:mx-0 max-w-sm lg:max-w-none">
            {/* Moldura decorativa - menor em mobile */}
            <div className="absolute -inset-2 sm:-inset-4 border-2 border-gold/20 rounded-xl sm:rounded-2xl transform rotate-2 hidden sm:block" />
            <div className="absolute -inset-2 sm:-inset-4 border-2 border-forest/10 rounded-xl sm:rounded-2xl transform -rotate-1 hidden sm:block" />

            {/* Placeholder de imagem elegante */}
            <div className="relative bg-gradient-to-br from-forest via-forest-light to-forest rounded-xl sm:rounded-2xl aspect-[4/5] flex items-center justify-center overflow-hidden shadow-xl sm:shadow-2xl">
              {/* Padrão decorativo */}
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
                  {/* Reuse MistickLogo style content here or import if possible, for now just text or simple svg replacement */}
                  {/* Simplified logo placeholder since we can't easily import MistickLogo inside the card without refactoring too much - sticking to text for the card */}
                  <span className="font-serif text-4xl">M</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl mb-1 sm:mb-2 text-cream">Daniele Ribeiro</h3>
                <p className="font-sans text-xs sm:text-sm tracking-widest uppercase text-gold">
                  Founder & Creative Director
                </p>
              </div>

              {/* Gradiente overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-transparent opacity-60" />
            </div>
          </div>

          {/* Coluna de texto */}
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

            {/* Features - mais compacto em mobile */}
            <div className="about-features grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="about-feature text-center p-3 sm:p-4 rounded-lg sm:rounded-xl bg-cream-dark/30 hover:bg-cream-dark/50 transition-colors duration-300"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    {feature.icon}
                  </div>
                  <h4 className="font-serif text-sm sm:text-base md:text-lg text-forest mb-0.5 sm:mb-1">{feature.title}</h4>
                  <p className="font-sans text-[10px] sm:text-xs md:text-sm text-forest-light leading-tight">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex justify-center lg:justify-start">
              <button
                onClick={() => openWhatsApp('consulting')}
                className="group inline-flex items-center gap-2 sm:gap-3 font-sans text-sm tracking-widest uppercase text-gold hover:text-gold-dark transition-colors duration-300 touch-target"
              >
                <span>Vamos Conversar</span>
                <svg
                  className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
