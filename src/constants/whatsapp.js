/** @typedef {import('../types/whatsapp').WhatsAppMessageType} WhatsAppMessageType */

export const WHATSAPP_NUMBER = '5511999999999' // TODO: substituir pelo número real

/** @type {Record<WhatsAppMessageType, string>} */
export const WHATSAPP_DEFAULT_MESSAGES = {
  greeting: 'Olá! Gostaria de saber mais sobre os serviços da Tina Ribéro Assessoria & Eventos.',
  event: 'Olá! Tenho interesse em organizar um evento e gostaria de uma consultoria.',
  consulting: 'Olá! Gostaria de agendar uma consultoria personalizada.',
  budget: 'Olá! Gostaria de solicitar um orçamento para meu evento.',
}

