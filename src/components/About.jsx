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
        { scale: 0.8, opacity: 0, rotation: -5 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Animação das features
      gsap.fromTo('.about-feature',
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-features',
            start: 'top 80%',
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
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Dedicação',
      description: 'Cada projeto recebe atenção exclusiva e personalizada',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Criatividade',
      description: 'Ideias únicas que refletem sua personalidade',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Confiança',
      description: 'Compromisso com excelência em cada detalhe',
    },
  ]

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-cream overflow-hidden"
    >
      {/* Elemento decorativo */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-cream-dark/50 to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Coluna da imagem */}
          <div ref={imageRef} className="relative">
            {/* Moldura decorativa */}
            <div className="absolute -inset-4 border-2 border-gold/30 rounded-2xl transform rotate-3" />
            <div className="absolute -inset-4 border-2 border-forest/20 rounded-2xl transform -rotate-2" />
            
            {/* Placeholder de imagem elegante */}
            <div className="relative bg-gradient-to-br from-forest via-forest-light to-forest rounded-xl aspect-[4/5] flex items-center justify-center overflow-hidden shadow-2xl">
              {/* Padrão decorativo */}
              <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="about-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="1" fill="currentColor" className="text-cream" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#about-pattern)" />
              </svg>

              <div className="text-center text-cream p-8">
                <svg
                  viewBox="0 0 100 50"
                  className="w-24 h-12 mx-auto mb-6 text-gold"
                  fill="none"
                >
                  <path
                    d="M50 25C50 17 43 10 33 10C23 10 15 17 15 25C15 33 23 40 33 40C43 40 50 33 50 25C50 33 57 40 67 40C77 40 85 33 85 25C85 17 77 10 67 10C57 10 50 17 50 25Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <h3 className="font-serif text-3xl mb-2">Tina Ribéro</h3>
                <p className="font-sans text-sm tracking-widest uppercase text-gold">
                  Fundadora & Consultora
                </p>
              </div>

              {/* Gradiente overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-transparent opacity-60" />
            </div>
          </div>

          {/* Coluna de texto */}
          <div className="lg:pl-8">
            <AnimatedText
              as="span"
              animation="words"
              className="font-sans text-sm tracking-[0.3em] uppercase text-gold mb-4 block"
            >
              Conheça Nossa História
            </AnimatedText>

            <AnimatedText
              as="h2"
              animation="words"
              stagger={0.04}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-forest mb-8 leading-tight"
            >
              Elegância em cada detalhe
            </AnimatedText>

            <AnimatedText
              as="p"
              animation="lines"
              className="font-sans text-lg text-forest-light leading-relaxed mb-6"
            >
              Olá! Sou Tina Ribéro, fundadora da Mistick Assessoria & Eventos. 
              Com paixão por criar experiências memoráveis, dedico-me a transformar 
              seus sonhos em realidade, cuidando de cada detalhe com elegância e sofisticação.
            </AnimatedText>

            <AnimatedText
              as="p"
              animation="lines"
              className="font-sans text-lg text-forest-light leading-relaxed mb-10"
            >
              Acredito que cada evento é único, assim como cada pessoa. Por isso, 
              ofereço consultoria personalizada, entendendo suas necessidades e 
              desejos para criar momentos verdadeiramente especiais e inesquecíveis.
            </AnimatedText>

            {/* Features */}
            <div className="about-features grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="about-feature text-center p-4 rounded-xl bg-cream-dark/30 hover:bg-cream-dark/50 transition-colors duration-300"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    {feature.icon}
                  </div>
                  <h4 className="font-serif text-lg text-forest mb-1">{feature.title}</h4>
                  <p className="font-sans text-sm text-forest-light">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => openWhatsApp('consulting')}
              className="group inline-flex items-center gap-3 font-sans text-sm tracking-widest uppercase text-gold hover:text-gold-dark transition-colors duration-300"
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
    </section>
  )
}

export default About

