/**
 * Configuração e utilitários do WhatsApp Business
 */

// Número do WhatsApp Business (substituir pelo número real)
const WHATSAPP_NUMBER = '5511999999999'

/**
 * Gera link do WhatsApp com mensagem
 * @param {string} message - Mensagem pré-preenchida
 * @returns {string} - URL do WhatsApp
 */
export const getWhatsAppLink = (message = '') => {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

/**
 * Mensagens padrão por tipo de contato
 */
export const defaultMessages = {
  greeting: 'Olá! Gostaria de saber mais sobre os serviços da Mistick by Daniele Ribeiro.',
  event: 'Olá! Tenho interesse em organizar um evento e gostaria de uma consultoria.',
  consulting: 'Olá! Gostaria de agendar uma consultoria personalizada.',
  budget: 'Olá! Gostaria de solicitar um orçamento para meu evento.',
}

/**
 * Abre o WhatsApp com mensagem padrão
 * @param {string} messageType - Tipo de mensagem (greeting, event, consulting, budget)
 */
export const openWhatsApp = (messageType = 'greeting') => {
  const message = defaultMessages[messageType] || defaultMessages.greeting
  window.open(getWhatsAppLink(message), '_blank')
}

/**
 * Gera mensagem customizada para formulário de contato
 * @param {Object} formData - Dados do formulário
 * @returns {string} - Mensagem formatada
 */
export const generateContactMessage = (formData) => {
  const { name, eventType, message, email, phone } = formData
  
  let customMessage = `Olá! Meu nome é ${name}.`
  
  if (eventType) {
    customMessage += `\nTenho interesse em: ${eventType}`
  }
  if (message) {
    customMessage += `\nMensagem: ${message}`
  }
  if (email) {
    customMessage += `\nEmail: ${email}`
  }
  if (phone) {
    customMessage += `\nTelefone: ${phone}`
  }
  
  return customMessage
}
