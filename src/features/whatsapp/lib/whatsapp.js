/**
 * WhatsApp Utilities
 * 
 * Funções para integração com WhatsApp Business.
 */

import { contactConfig } from '@shared/config'
import { whatsappMessages } from '../config/messages'

const WHATSAPP_NUMBER = contactConfig.phone.whatsapp

/**
 * Gera link do WhatsApp com mensagem
 * 
 * @param {string} message - Mensagem a ser enviada
 * @returns {string} URL do WhatsApp
 */
export const getWhatsAppLink = (message = '') => {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

/**
 * Abre WhatsApp com mensagem predefinida
 * 
 * @param {keyof typeof whatsappMessages | string} messageType - Tipo de mensagem ou mensagem custom
 */
export const openWhatsApp = (messageType = 'greeting') => {
  const message = whatsappMessages[messageType] || whatsappMessages.greeting
  window.open(getWhatsAppLink(message), '_blank')
}

/**
 * Abre WhatsApp com mensagem personalizada
 * 
 * @param {string} customMessage - Mensagem personalizada
 */
export const openWhatsAppWithMessage = (customMessage) => {
  window.open(getWhatsAppLink(customMessage), '_blank')
}

/**
 * Gera mensagem de contato formatada
 * 
 * @param {Object} formData - Dados do formulário
 * @returns {string} Mensagem formatada
 */
export const formatContactMessage = (formData) => {
  const { name, email, phone, eventType, message } = formData

  let formattedMessage = `Olá! Meu nome é ${name}.`

  if (eventType) {
    formattedMessage += `\nTenho interesse em: ${eventType}`
  }

  if (message) {
    formattedMessage += `\n\nMensagem: ${message}`
  }

  if (email) {
    formattedMessage += `\n\nEmail: ${email}`
  }

  if (phone) {
    formattedMessage += `\nTelefone: ${phone}`
  }

  return formattedMessage
}
