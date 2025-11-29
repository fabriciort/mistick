import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText from './AnimatedText'
import { openWhatsApp } from '../utils/whatsapp'

gsap.registerPlugin(ScrollTrigger)

const Services = () => {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  const services = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
        </svg>
      ),
      title: 'Casamentos',
      description: 'Assessoria completa para o dia mais especial da sua vida. Do planejamento à execução, cuidamos de cada detalhe com amor e dedicação.',
      features: ['Planejamento completo', 'Gestão de fornecedores', 'Cerimonial no dia'],
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      title: 'Festas & Celebrações',
      description: 'Aniversários, bodas, formaturas e eventos corporativos. Cada celebração merece ser única e memorável.',
      features: ['Decoração personalizada', 'Buffet e entretenimento', 'Coordenação do evento'],
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Consultoria Criativa',
      description: 'Orientação especializada para você que deseja organizar seu próprio evento, mas precisa de direcionamento profissional.',
      features: ['Análise de necessidades', 'Sugestão de fornecedores', 'Acompanhamento remoto'],
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: 'Eventos Corporativos',
      description: 'Confraternizações, lançamentos, workshops e reuniões. Profissionalismo e elegância para sua empresa.',
      features: ['Logística completa', 'Identidade visual', 'Gestão de convidados'],
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação dos cards
      cardsRef.current.forEach((card, index) => {
        if (!card) return
        
        gsap.fromTo(card,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1,
          }
        )
      })

      // Animação do elemento decorativo
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
      className="relative py-24 md:py-32 bg-forest overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="services-decor absolute -top-40 -right-40 w-80 h-80 border border-gold/10 rounded-full" />
        <div className="services-decor absolute -bottom-60 -left-60 w-96 h-96 border border-cream/5 rounded-full" />
        
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
        <div className="text-center mb-16">
          <AnimatedText
            as="span"
            animation="words"
            className="font-sans text-sm tracking-[0.3em] uppercase text-gold mb-4 block"
          >
            O Que Oferecemos
          </AnimatedText>

          <AnimatedText
            as="h2"
            animation="words"
            stagger={0.04}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream mb-6"
          >
            Nossos Serviços
          </AnimatedText>

          <AnimatedText
            as="p"
            animation="lines"
            className="font-sans text-lg text-cream/70 max-w-2xl mx-auto"
          >
            Oferecemos soluções completas para tornar cada momento especial.
            Da concepção à realização, estamos ao seu lado em cada etapa.
          </AnimatedText>
        </div>

        {/* Grid de serviços */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="group relative bg-forest-light/30 backdrop-blur-sm border border-cream/10 rounded-2xl p-8 hover:border-gold/30 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/5"
            >
              {/* Número decorativo */}
              <span className="absolute top-6 right-6 font-serif text-6xl text-cream/5 group-hover:text-gold/10 transition-colors duration-500">
                0{index + 1}
              </span>

              {/* Ícone */}
              <div className="w-16 h-16 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                {service.icon}
              </div>

              {/* Título */}
              <h3 className="font-serif text-2xl text-cream mb-4 group-hover:text-gold transition-colors duration-300">
                {service.title}
              </h3>

              {/* Descrição */}
              <p className="font-sans text-cream/70 leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-cream/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Link */}
              <button
                onClick={() => openWhatsApp('event')}
                className="inline-flex items-center gap-2 font-sans text-sm tracking-wider uppercase text-gold hover:text-gold-light transition-colors duration-300 group/btn"
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
        <div className="text-center mt-16">
          <AnimatedText
            as="p"
            animation="lines"
            className="font-serif text-xl text-cream/70 italic mb-6"
          >
            Não encontrou o que procura? Criamos soluções personalizadas para você.
          </AnimatedText>
          <button
            onClick={() => openWhatsApp('consulting')}
            className="group relative px-10 py-4 bg-transparent border-2 border-gold text-gold font-sans text-sm tracking-widest uppercase rounded-full overflow-hidden transition-all duration-500 hover:text-forest"
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

