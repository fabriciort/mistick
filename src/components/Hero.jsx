import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import AnimatedText from './AnimatedText'
import { openWhatsApp } from '../utils/whatsapp'

const Hero = () => {
  const heroRef = useRef(null)
  const infinityRef = useRef(null)
  const decorRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação do símbolo infinito
      gsap.fromTo(infinityRef.current,
        { scale: 0, rotation: -180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1.5, ease: 'elastic.out(1, 0.5)', delay: 0.3 }
      )

      // Animação dos elementos decorativos
      gsap.fromTo('.hero-decor',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 0.15, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.8 }
      )

      // Animação do botão CTA
      gsap.fromTo('.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.5 }
      )

      // Animação de scroll indicator
      gsap.fromTo('.scroll-indicator',
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 2 }
      )

      // Loop do scroll indicator
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

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-cream via-cream to-cream-dark"
    >
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="hero-decor absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold"
          ref={decorRef}
        />
        <div className="hero-decor absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-forest" />
        <div className="hero-decor absolute bottom-20 right-1/4 w-48 h-48 rounded-full bg-gold-light" />
        
        {/* Padrão geométrico sutil */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1.5" fill="currentColor" className="text-forest" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
      </div>

      {/* Conteúdo principal */}
      <div className="container-custom relative z-10 text-center py-32">
        {/* Símbolo Infinito Animado */}
        <div ref={infinityRef} className="mb-8">
          <svg
            viewBox="0 0 100 50"
            className="w-28 h-14 md:w-36 md:h-18 mx-auto text-forest"
            fill="none"
          >
            <path
              d="M50 25C50 17 43 10 33 10C23 10 15 17 15 25C15 33 23 40 33 40C43 40 50 33 50 25C50 33 57 40 67 40C77 40 85 33 85 25C85 17 77 10 67 10C57 10 50 17 50 25Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Nome da marca */}
        <AnimatedText
          as="h1"
          animation="chars"
          stagger={0.03}
          delay={0.5}
          triggerOnScroll={false}
          className="font-serif text-6xl md:text-8xl lg:text-9xl font-light tracking-wider text-forest mb-4"
        >
          MISTICK
        </AnimatedText>

        {/* Subtítulo */}
        <AnimatedText
          as="p"
          animation="words"
          stagger={0.08}
          delay={1}
          triggerOnScroll={false}
          className="font-sans text-sm md:text-base tracking-[0.4em] uppercase text-gold mb-8"
        >
          Assessoria & Eventos
        </AnimatedText>

        {/* Linha divisória decorativa */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-gold" />
          <div className="w-2 h-2 rounded-full bg-gold" />
          <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-gold" />
        </div>

        {/* Tagline */}
        <AnimatedText
          as="p"
          animation="lines"
          delay={1.2}
          triggerOnScroll={false}
          className="font-serif text-xl md:text-2xl lg:text-3xl text-forest-light italic max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Transformamos seus sonhos em momentos inesquecíveis
        </AnimatedText>

        {/* CTA Buttons */}
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => openWhatsApp('greeting')}
            className="group relative px-8 py-4 bg-gold text-cream font-sans text-sm tracking-widest uppercase rounded-full overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-gold/30"
          >
            <span className="relative z-10 flex items-center gap-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Fale Conosco
            </span>
            <div className="absolute inset-0 bg-gold-dark transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
          </button>

          <a
            href="#servicos"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#servicos')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-8 py-4 border-2 border-forest text-forest font-sans text-sm tracking-widest uppercase rounded-full transition-all duration-300 hover:bg-forest hover:text-cream"
          >
            Nossos Serviços
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-forest/60">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="scroll-indicator-arrow">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero

