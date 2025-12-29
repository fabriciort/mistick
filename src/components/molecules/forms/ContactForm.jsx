import { useState } from 'react'
import { Input, Select, TextArea, Button, SocialIcon } from '../../atoms'
import { getWhatsAppLink } from '../../../utils/whatsapp'

/**
 * ContactForm Molecule - Formulário de contato completo
 */
const ContactForm = ({
  eventTypes = [],
  className = '',
}) => {
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

  return (
    <div className={`bg-cream rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-cream-dark shadow-lg sm:shadow-xl ${className}`}>
      <h3 className="font-serif text-xl sm:text-2xl text-forest mb-1 sm:mb-2">
        Envie uma Mensagem
      </h3>
      <p className="font-sans text-xs sm:text-sm text-forest/60 mb-5 sm:mb-6">
        Preencha o formulário e entraremos em contato via WhatsApp
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <Input
          label="Seu Nome"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          placeholder="Digite seu nome"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <Input
            label="E-mail"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="seu@email.com"
          />
          <Input
            label="Telefone"
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="(11) 99999-9999"
          />
        </div>

        <Select
          label="Tipo de Evento"
          id="eventType"
          name="eventType"
          value={formData.eventType}
          onChange={handleInputChange}
          options={eventTypes}
          placeholder="Selecione uma opção"
        />

        <TextArea
          label="Sua Mensagem"
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={3}
          placeholder="Conte-nos sobre seu evento..."
        />

        <Button
          type="submit"
          variant="accent"
          fullWidth
          loading={isSubmitting}
          icon={<SocialIcon name="whatsapp" className="w-5 h-5" />}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar via WhatsApp'}
        </Button>
      </form>
    </div>
  )
}

export default ContactForm
