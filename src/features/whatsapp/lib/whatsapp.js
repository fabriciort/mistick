// Configuração do WhatsApp Business
// Preferir configurar via `.env`: VITE_WHATSAPP_NUMBER=5511999999999
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '5511999999999'

export const getWhatsAppLink = (message = '') => {
  const url = new URL(`https://wa.me/${WHATSAPP_NUMBER}`)
  if (message) url.searchParams.set('text', message)
  return url.toString()
}

export const defaultMessages = {
  greeting: 'Olá! Gostaria de saber mais sobre os serviços da Mistick by Daniele Ribeiro.',
  event: 'Olá! Tenho interesse em organizar um evento e gostaria de uma consultoria.',
  consulting: 'Olá! Gostaria de agendar uma consultoria personalizada.',
  budget: 'Olá! Gostaria de solicitar um orçamento para meu evento.',
}

export const openWhatsAppWithMessage = (message = '') => {
  window.open(getWhatsAppLink(message), '_blank', 'noopener,noreferrer')
}

export const openWhatsApp = (messageType = 'greeting') => {
  const message = defaultMessages[messageType] || defaultMessages.greeting
  openWhatsAppWithMessage(message)
}
