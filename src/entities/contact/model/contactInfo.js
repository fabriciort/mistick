/**
 * Contact Information Data
 * 
 * Informações de contato para exibição.
 */

import { contactConfig } from '@shared/config'

export const contactInfo = [
  {
    id: 'whatsapp',
    icon: 'whatsapp',
    title: 'WhatsApp',
    value: contactConfig.phone.display,
    actionType: 'whatsapp',
    actionLabel: 'Iniciar Conversa',
  },
  {
    id: 'email',
    icon: 'mail',
    title: 'E-mail',
    value: contactConfig.email,
    actionType: 'email',
    actionLabel: 'Enviar Email',
  },
  {
    id: 'location',
    icon: 'location',
    title: 'Localização',
    value: contactConfig.location.display,
    actionType: null,
    actionLabel: contactConfig.location.serviceArea,
  },
]

export const eventTypes = [
  'Casamento',
  'Festa de Aniversário',
  'Evento Corporativo',
  'Bodas',
  'Formatura',
  'Chá de Bebê',
  'Outro',
]

export const socialLinks = [
  { name: 'instagram', url: 'https://instagram.com/mistickeventos' },
  { name: 'facebook', url: 'https://facebook.com/mistickeventos' },
  { name: 'pinterest', url: 'https://pinterest.com/mistickeventos' },
]

export default contactInfo
