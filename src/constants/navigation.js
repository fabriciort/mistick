/**
 * @fileoverview Navigation constants for the application
 * Single source of truth for navigation links and anchors
 */

/**
 * @typedef {Object} NavLink
 * @property {string} href - The anchor href
 * @property {string} label - Display label
 * @property {string} ariaLabel - Accessibility label
 */

/** @type {NavLink[]} */
export const NAV_LINKS = [
  { href: '#inicio', label: 'Início', ariaLabel: 'Ir para início' },
  { href: '#sobre', label: 'Sobre', ariaLabel: 'Ir para seção sobre' },
  { href: '#servicos', label: 'Serviços', ariaLabel: 'Ir para serviços' },
  { href: '#contato', label: 'Contato', ariaLabel: 'Ir para contato' },
]

/** @type {Object.<string, string>} */
export const SECTION_IDS = {
  HOME: 'inicio',
  ABOUT: 'sobre',
  SERVICES: 'servicos',
  CONTACT: 'contato',
}

/**
 * @typedef {Object} SocialLink
 * @property {string} name - Social network name
 * @property {string} url - Profile URL
 * @property {string} ariaLabel - Accessibility label
 */

/** @type {SocialLink[]} */
export const SOCIAL_LINKS = [
  {
    name: 'instagram',
    url: 'https://instagram.com/mistickbydaniele',
    ariaLabel: 'Seguir no Instagram',
  },
  {
    name: 'facebook',
    url: 'https://facebook.com/mistickbydaniele',
    ariaLabel: 'Seguir no Facebook',
  },
  {
    name: 'whatsapp',
    url: 'https://wa.me/5511999999999',
    ariaLabel: 'Contato via WhatsApp',
  },
  {
    name: 'pinterest',
    url: 'https://pinterest.com/mistickeventos',
    ariaLabel: 'Seguir no Pinterest',
  },
]
