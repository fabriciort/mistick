import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/shared/lib/gsap'
import AnimatedText from '@/ui/atoms/AnimatedText'
import { openWhatsApp, getWhatsAppLink } from '@/shared/utils/whatsapp'

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
      // Animação do formulário
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

      // Animação dos cards de contato
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

  const contactInfo = [
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      title: 'WhatsApp',
      value: '(11) 99999-9999',
      action: () => openWhatsApp('greeting'),
      actionLabel: 'Iniciar Conversa',
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'E-mail',
      value: 'contato@mistick.com.br',
      action: () => window.location.href = 'mailto:contato@mistick.com.br',
      actionLabel: 'Enviar Email',
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Localização',
      value: 'São Paulo, SP',
      action: null,
      actionLabel: 'Atendemos toda região',
    },
  ]

  const eventTypes = [
    'Casamento',
    'Festa de Aniversário',
    'Evento Corporativo',
    'Bodas',
    'Formatura',
    'Chá de Bebê',
    'Outro',
  ]

  return (
    <section
      id="contato"
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-cream-dark to-cream overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-5 sm:top-20 sm:right-10 w-32 h-32 sm:w-64 sm:h-64 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-10 left-5 sm:bottom-20 sm:left-10 w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-forest/5 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header da seção */}
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

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
          {/* Informações de contato */}
          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-forest mb-6 sm:mb-8">Informações de Contato</h3>
            
            <div className="contact-cards space-y-3 sm:space-y-4 mb-8 sm:mb-10">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="contact-card group bg-cream rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border border-cream-dark hover:border-gold/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold flex-shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                      {info.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-sans text-xs sm:text-sm tracking-wider uppercase text-forest/60 mb-0.5 sm:mb-1">
                        {info.title}
                      </h4>
                      <p className="font-serif text-lg sm:text-xl text-forest mb-1 sm:mb-2 truncate">{info.value}</p>
                      {info.action ? (
                        <button
                          onClick={info.action}
                          className="font-sans text-xs sm:text-sm text-gold hover:text-gold-dark transition-colors duration-300 flex items-center gap-1.5 sm:gap-2 touch-target"
                        >
                          {info.actionLabel}
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                      ) : (
                        <span className="font-sans text-xs sm:text-sm text-forest/50">{info.actionLabel}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Redes sociais */}
            <div>
              <h4 className="font-sans text-xs sm:text-sm tracking-wider uppercase text-forest/60 mb-3 sm:mb-4">
                Siga-nos nas Redes
              </h4>
              <div className="flex gap-3 sm:gap-4">
                {['instagram', 'facebook', 'pinterest'].map((social) => (
                  <a
                    key={social}
                    href={`https://${social}.com/mistickeventos`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-forest flex items-center justify-center text-cream hover:bg-gold transition-colors duration-300 touch-target"
                    aria-label={`Seguir no ${social}`}
                  >
                    {social === 'instagram' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    )}
                    {social === 'facebook' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    )}
                    {social === 'pinterest' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div ref={formRef}>
            <div className="bg-cream rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-cream-dark shadow-lg sm:shadow-xl">
              <h3 className="font-serif text-xl sm:text-2xl text-forest mb-1 sm:mb-2">Envie uma Mensagem</h3>
              <p className="font-sans text-xs sm:text-sm text-forest/60 mb-5 sm:mb-6">
                Preencha o formulário e entraremos em contato via WhatsApp
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label htmlFor="name" className="block font-sans text-xs sm:text-sm text-forest/70 mb-1.5 sm:mb-2">
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-cream-dark/50 border border-cream-dark rounded-lg font-sans text-forest placeholder:text-forest/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                    placeholder="Digite seu nome"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label htmlFor="email" className="block font-sans text-xs sm:text-sm text-forest/70 mb-1.5 sm:mb-2">
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-cream-dark/50 border border-cream-dark rounded-lg font-sans text-forest placeholder:text-forest/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block font-sans text-xs sm:text-sm text-forest/70 mb-1.5 sm:mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-cream-dark/50 border border-cream-dark rounded-lg font-sans text-forest placeholder:text-forest/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="eventType" className="block font-sans text-xs sm:text-sm text-forest/70 mb-1.5 sm:mb-2">
                    Tipo de Evento
                  </label>
                  <div className="relative">
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-cream-dark/50 border border-cream-dark rounded-lg font-sans text-forest focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300 appearance-none cursor-pointer pr-10"
                    >
                      <option value="">Selecione uma opção</option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-forest/50 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block font-sans text-xs sm:text-sm text-forest/70 mb-1.5 sm:mb-2">
                    Sua Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-cream-dark/50 border border-cream-dark rounded-lg font-sans text-forest placeholder:text-forest/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300 resize-none"
                    placeholder="Conte-nos sobre seu evento..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group relative px-6 sm:px-8 py-3 sm:py-4 bg-gold text-cream font-sans text-xs sm:text-sm tracking-widest uppercase rounded-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-gold/30 disabled:opacity-70 disabled:cursor-not-allowed touch-target"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                    {isSubmitting ? (
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    )}
                    {isSubmitting ? 'Enviando...' : 'Enviar via WhatsApp'}
                  </span>
                  <div className="absolute inset-0 bg-gold-dark transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
