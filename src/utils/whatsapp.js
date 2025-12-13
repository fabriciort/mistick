// Configuração do WhatsApp Business
const WHATSAPP_NUMBER = '5511999999999' // Substituir pelo número real

export const getWhatsAppLink = (message = '') => {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

export const defaultMessages = {
  greeting: 'Olá! Gostaria de saber mais sobre os serviços da Tina Ribéro Assessoria & Eventos.',
  event: 'Olá! Tenho interesse em organizar um evento e gostaria de uma consultoria.',
  consulting: 'Olá! Gostaria de agendar uma consultoria personalizada.',
  budget: 'Olá! Gostaria de solicitar um orçamento para meu evento.',
}

export const openWhatsApp = (messageType = 'greeting') => {
  const message = defaultMessages[messageType] || defaultMessages.greeting
  window.open(getWhatsAppLink(message), '_blank')
}
