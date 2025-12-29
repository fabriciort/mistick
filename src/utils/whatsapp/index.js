/** @typedef {import('../../types/whatsapp').WhatsAppMessageType} WhatsAppMessageType */

import { WHATSAPP_DEFAULT_MESSAGES, WHATSAPP_NUMBER } from '../../constants/whatsapp'

export function getWhatsAppLink(message = '') {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

/**
 * @param {WhatsAppMessageType} [messageType]
 */
export function openWhatsApp(messageType = 'greeting') {
  const message = WHATSAPP_DEFAULT_MESSAGES[messageType] || WHATSAPP_DEFAULT_MESSAGES.greeting
  window.open(getWhatsAppLink(message), '_blank')
}

