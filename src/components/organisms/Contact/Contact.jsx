/**
 * @fileoverview Contact organism component
 * Contact section with form and contact info
 */

import { useEffect, useRef, useState, memo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatedText, ContactCard, FormField, SocialLinkGroup } from '../../molecules'
import { Icon } from '../../atoms'
import { cn } from '../../../lib/cn'
import { CONTACT_INFO, EVENT_TYPES, SOCIAL_LINKS } from '../../../constants'
import { getWhatsAppLink } from '../../../utils/whatsapp'
import { SECTION_STYLES, CARD_STYLES } from '../../../styles/tailwind-classes'
import { DURATION, EASING, STAGGER } from '../../../styles/animation-theme'

gsap.registerPlugin(ScrollTrigger)

/**
 * Contact section component
 */
const Contact = () => {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const customMessage = `Olá! Meu nome é ${formData.name}.
${formData.eventType ? `Tenho interesse em: ${formData.eventType}` : ''}
${formData.message ? `\nMensagem: ${formData.message}` : ''}
${formData.email ? `\nEmail: ${formData.email}` : ''}
${formData.phone ? `\nTelefone: ${formData.phone}` : ''}`
    
    setTimeout(() => {
      window.open(getWhatsAppLink(customMessage), '_blank')
      setIsSubmitting(false)
    }, 300)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Form animation
      gsap.fromTo(formRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DURATION.MEDIUM,
          ease: EASING.DEFAULT,
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
          duration: DURATION.FAST,
          stagger: STAGGER.MEDIUM,
          ease: EASING.DEFAULT,
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

  return (
    <section
      id="contato"
      ref={sectionRef}
      className={cn('relative bg-gradient-to-b from-cream-dark to-cream overflow-hidden', SECTION_STYLES.padding)}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-5 sm:top-20 sm:right-10 w-32 h-32 sm:w-64 sm:h-64 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-10 left-5 sm:bottom-20 sm:left-10 w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-forest/5 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <ContactHeader />

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
          {/* Contact Info */}
          <ContactInfo />

          {/* Form */}
          <ContactForm
            ref={formRef}
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </section>
  )
}

/**
 * Contact section header
 */
const ContactHeader = memo(() => (
  <div className="text-center mb-10 sm:mb-12 md:mb-16">
    <AnimatedText
      as="span"
      animation="words"
      className="font-sans text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gold mb-3 sm:mb-4 block"
    >
      Vamos Conversar
    </AnimatedText>

    <AnimatedText
      as="h2"
      animation="words"
      stagger={0.04}
      className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-forest mb-4 sm:mb-6"
    >
      Entre em Contato
    </AnimatedText>

    <AnimatedText
      as="p"
      animation="lines"
      className="font-sans text-base sm:text-lg text-forest-light max-w-xs sm:max-w-lg md:max-w-2xl mx-auto px-2"
    >
      Estamos ansiosos para conhecer você e ajudar a criar momentos inesquecíveis.
    </AnimatedText>
  </div>
))

ContactHeader.displayName = 'ContactHeader'

/**
 * Contact info column
 */
const ContactInfo = memo(() => (
  <div>
    <h3 className="font-serif text-xl sm:text-2xl text-forest mb-6 sm:mb-8">
      Informações de Contato
    </h3>
    
    <div className="contact-cards space-y-3 sm:space-y-4 mb-8 sm:mb-10">
      {CONTACT_INFO.map((info) => (
        <ContactCard
          key={info.id}
          iconName={info.iconName}
          title={info.title}
          value={info.value}
          actionLabel={info.actionLabel}
          actionType={info.actionType}
        />
      ))}
    </div>

    {/* Social Links */}
    <div>
      <h4 className="font-sans text-xs sm:text-sm tracking-wider uppercase text-forest/60 mb-3 sm:mb-4">
        Siga-nos nas Redes
      </h4>
      <SocialLinkGroup 
        links={SOCIAL_LINKS.filter(l => l.name !== 'whatsapp')} 
        variant="light" 
      />
    </div>
  </div>
))

ContactInfo.displayName = 'ContactInfo'

/**
 * Contact form component
 */
const ContactForm = memo(({ formData, onChange, onSubmit, isSubmitting, ...props }, ref) => (
  <div ref={ref} {...props}>
    <div className={cn(CARD_STYLES.base, CARD_STYLES.variants.elevated, 'p-5 sm:p-6 md:p-8')}>
      <h3 className="font-serif text-xl sm:text-2xl text-forest mb-1 sm:mb-2">
        Envie uma Mensagem
      </h3>
      <p className="font-sans text-xs sm:text-sm text-forest/60 mb-5 sm:mb-6">
        Preencha o formulário e entraremos em contato via WhatsApp
      </p>

      <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
        <FormField
          label="Seu Nome"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={onChange}
          placeholder="Digite seu nome"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <FormField
            label="E-mail"
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            placeholder="seu@email.com"
          />
          <FormField
            label="Telefone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={onChange}
            placeholder="(11) 99999-9999"
          />
        </div>

        <FormField
          label="Tipo de Evento"
          name="eventType"
          type="select"
          value={formData.eventType}
          onChange={onChange}
          placeholder="Selecione uma opção"
          options={EVENT_TYPES}
        />

        <FormField
          label="Sua Mensagem"
          name="message"
          type="textarea"
          value={formData.message}
          onChange={onChange}
          placeholder="Conte-nos sobre seu evento..."
          rows={3}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'w-full group relative px-6 sm:px-8 py-3 sm:py-4',
            'bg-gold text-cream font-sans text-xs sm:text-sm tracking-widest uppercase rounded-lg',
            'overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-gold/30',
            'disabled:opacity-70 disabled:cursor-not-allowed touch-target'
          )}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
            {isSubmitting ? (
              <LoadingSpinner />
            ) : (
              <Icon name="whatsapp" size="md" />
            )}
            {isSubmitting ? 'Enviando...' : 'Enviar via WhatsApp'}
          </span>
          <span className="absolute inset-0 bg-gold-dark transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
        </button>
      </form>
    </div>
  </div>
))

ContactForm.displayName = 'ContactForm'

/**
 * Loading spinner component
 */
const LoadingSpinner = memo(() => (
  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
))

LoadingSpinner.displayName = 'LoadingSpinner'

export default memo(Contact)
