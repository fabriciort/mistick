/**
 * @fileoverview Contact information constants
 */

/**
 * @typedef {Object} ContactInfo
 * @property {string} id - Unique identifier
 * @property {string} iconName - Icon identifier
 * @property {string} title - Contact method title
 * @property {string} value - Contact value
 * @property {string} actionLabel - CTA label
 * @property {string} [actionType] - Action type: 'whatsapp' | 'email' | 'none'
 */

/** @type {ContactInfo[]} */
export const CONTACT_INFO = [
  {
    id: 'whatsapp',
    iconName: 'whatsapp',
    title: 'WhatsApp',
    value: '(11) 99999-9999',
    actionLabel: 'Iniciar Conversa',
    actionType: 'whatsapp',
  },
  {
    id: 'email',
    iconName: 'mail',
    title: 'E-mail',
    value: 'contato@mistick.com.br',
    actionLabel: 'Enviar Email',
    actionType: 'email',
  },
  {
    id: 'location',
    iconName: 'mapPin',
    title: 'Localização',
    value: 'São Paulo, SP',
    actionLabel: 'Atendemos toda região',
    actionType: 'none',
  },
]
