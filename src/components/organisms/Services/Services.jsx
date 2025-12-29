import { useEffect, useRef } from 'react'
import { ANIMATION_THEME } from '../../../constants/animation-theme'
import { gsap, registerGsap } from '../../../lib/gsap/register-gsap'
import { openWhatsApp } from '../../../utils/whatsapp'
import { AnimatedText } from '../../molecules'

const Services = () => {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  const services = [
    {
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
        </svg>
      ),
      title: 'Casamentos',
      description: 'Assessoria completa para o dia mais especial da sua vida. Do planejamento à execução.',
      features: ['Planejamento completo', 'Gestão de fornecedores', 'Cerimonial no dia'],
    },
    {
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      title: 'Festas & Celebrações',
      description: 'Aniversários, bodas, formaturas e mais. Cada celebração merece ser única.',
      features: ['Decoração personalizada', 'Buffet e entretenimento', 'Coordenação do evento'],
    },
    {
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Consultoria Criativa',
      description: 'Orientação especializada para quem deseja organizar seu próprio evento.',
      features: ['Análise de necessidades', 'Sugestão de fornecedores', 'Acompanhamento remoto'],
    },
    {
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: 'Eventos Corporativos',
      description: 'Confraternizações, lançamentos e workshops. Profissionalismo para sua empresa.',
      features: ['Logística completa', 'Identidade visual', 'Gestão de convidados'],
    },
  ]

  useEffect(() => {
    registerGsap()
    const ctx = gsap.context(() => {
      // Animação dos cards com stagger
      cardsRef.current.forEach((card, index) => {
        if (!card) return
        
        gsap.fromTo(card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: ANIMATION_THEME.duration.sm,
            ease: ANIMATION_THEME.ease.enter,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.08,
          }
        )
      })

      // Animação do elemento decorativo
      gsap.to('.services-decor', {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: ANIMATION_THEME.ease.linear,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="servicos"
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-forest overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="services-decor absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 border border-gold/10 rounded-full" />
        <div className="services-decor absolute -bottom-32 -left-32 sm:-bottom-60 sm:-left-60 w-48 h-48 sm:w-96 sm:h-96 border border-cream/5 rounded-full" />
        
        {/* Padrão de fundo */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="services-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M40 0L80 40L40 80L0 40Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cream" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#services-pattern)" />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        {/* Header da seção */}
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

        {/* Grid de serviços - responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 xl:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="group relative bg-forest-light/20 sm:bg-forest-light/30 backdrop-blur-sm border border-cream/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 hover:border-gold/30 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/5 hover-lift"
            >
              {/* Número decorativo */}
              <span className="absolute top-4 right-4 sm:top-6 sm:right-6 font-serif text-4xl sm:text-5xl md:text-6xl text-cream/5 group-hover:text-gold/10 transition-colors duration-500">
                0{index + 1}
              </span>

              {/* Ícone */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-4 sm:mb-5 md:mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                {service.icon}
              </div>

              {/* Título */}
              <h3 className="font-serif text-xl sm:text-2xl text-cream mb-2 sm:mb-3 md:mb-4 group-hover:text-gold transition-colors duration-300">
                {service.title}
              </h3>

              {/* Descrição */}
              <p className="font-sans text-sm sm:text-base text-cream/70 leading-relaxed mb-4 sm:mb-5 md:mb-6">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 md:mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-cream/60">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gold flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Link */}
              <button
                onClick={() => openWhatsApp('event')}
                className="inline-flex items-center gap-2 font-sans text-xs sm:text-sm tracking-wider uppercase text-gold hover:text-gold-light transition-colors duration-300 group/btn touch-target"
              >
                <span>Saiba Mais</span>
                <svg
                  className="w-4 h-4 transform transition-transform duration-300 group-hover/btn:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* CTA Central */}
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
            className="group relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-transparent border-2 border-gold text-gold font-sans text-xs sm:text-sm tracking-widest uppercase rounded-full overflow-hidden transition-all duration-500 hover:text-forest touch-target"
          >
            <span className="relative z-10">Solicite uma Proposta</span>
            <div className="absolute inset-0 bg-gold transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Services
