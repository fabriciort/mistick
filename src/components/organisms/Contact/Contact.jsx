import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  SectionLabel, 
  SectionTitle, 
  SectionDescription,
  SocialIcon 
} from '../../atoms'
import { ContactCard, ContactForm, SocialLinks } from '../../molecules'
import { openWhatsApp } from '../../../utils/whatsapp'
import { CONTACT_INFO, EVENT_TYPES, SOCIAL_LINKS_CONTACT } from '../../../utils/constants'

gsap.registerPlugin(ScrollTrigger)

/**
 * Contact Organism - Seção de contato
 */
const Contact = () => {
  const sectionRef = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Form animation
      gsap.fromTo(formRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Contact cards animation
      gsap.fromTo('.contact-card',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-cards',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Generate contact info with icons
  const contactInfoWithIcons = CONTACT_INFO.map(info => ({
    ...info,
    icon: <SocialIcon name={info.iconName} className="w-5 h-5 sm:w-6 sm:h-6" />,
    action: info.hasAction ? () => {
      if (info.iconName === 'whatsapp') {
        openWhatsApp('greeting')
      } else if (info.type === 'email') {
        window.location.href = `mailto:${info.value}`
      }
    } : null,
  }))

  return (
    <section
      id="contato"
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-cream-dark to-cream overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-5 sm:top-20 sm:right-10 w-32 h-32 sm:w-64 sm:h-64 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-10 left-5 sm:bottom-20 sm:left-10 w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-forest/5 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <SectionLabel>Vamos Conversar</SectionLabel>
          <SectionTitle>Entre em Contato</SectionTitle>
          <SectionDescription>
            Estamos ansiosos para conhecer você e ajudar a criar momentos inesquecíveis.
          </SectionDescription>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-forest mb-6 sm:mb-8">
              Informações de Contato
            </h3>
            
            <div className="contact-cards space-y-3 sm:space-y-4 mb-8 sm:mb-10">
              {contactInfoWithIcons.map((info, index) => (
                <ContactCard
                  key={index}
                  icon={info.icon}
                  title={info.title}
                  value={info.value}
                  action={info.action}
                  actionLabel={info.actionLabel}
                />
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-sans text-xs sm:text-sm tracking-wider uppercase text-forest/60 mb-3 sm:mb-4">
                Siga-nos nas Redes
              </h4>
              <SocialLinks 
                links={SOCIAL_LINKS_CONTACT} 
                variant="light" 
              />
            </div>
          </div>

          {/* Form */}
          <div ref={formRef}>
            <ContactForm eventTypes={EVENT_TYPES} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
