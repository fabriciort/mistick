import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  SectionLabel, 
  SectionTitle, 
  SectionDescription,
  AnimatedText,
  Button,
  DecorativePattern
} from '../../atoms'
import { ServiceCard } from '../../molecules'
import { openWhatsApp } from '../../../utils/whatsapp'
import { SERVICES } from '../../../utils/constants'

gsap.registerPlugin(ScrollTrigger)

/**
 * Services Organism - Seção de serviços
 */
const Services = () => {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards animation with stagger
      cardsRef.current.forEach((card, index) => {
        if (!card) return
        
        gsap.fromTo(card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.08,
          }
        )
      })

      // Decorative element animation
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
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-forest overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="services-decor absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 border border-gold/10 rounded-full" />
        <div className="services-decor absolute -bottom-32 -left-32 sm:-bottom-60 sm:-left-60 w-48 h-48 sm:w-96 sm:h-96 border border-cream/5 rounded-full" />
        
        <DecorativePattern variant="diamonds" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <SectionLabel>O Que Oferecemos</SectionLabel>
          <SectionTitle variant="light">Nossos Serviços</SectionTitle>
          <SectionDescription variant="light">
            Soluções completas para tornar cada momento especial.
            Da concepção à realização, estamos ao seu lado.
          </SectionDescription>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 xl:gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={index}
              ref={el => cardsRef.current[index] = el}
              index={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              onAction={() => openWhatsApp('event')}
            />
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
          <Button
            variant="outline"
            onClick={() => openWhatsApp('consulting')}
          >
            Solicite uma Proposta
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Services
