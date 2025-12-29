/**
 * Scroll Utilities
 * 
 * Funções utilitárias para manipulação de scroll.
 */

/**
 * Faz scroll suave para uma seção específica
 * 
 * @param {string} selector - Seletor CSS da seção (ex: '#about')
 * @param {Object} options - Opções
 * @param {number} options.offset - Offset do topo (útil para headers fixos)
 * @param {string} options.behavior - 'smooth' | 'auto'
 */
export const scrollToSection = (selector, options = {}) => {
  const { offset = 80, behavior = 'smooth' } = options
  const section = document.querySelector(selector)

  if (!section) return

  const elementPosition = section.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - offset

  window.scrollTo({
    top: offsetPosition,
    behavior,
  })
}

/**
 * Faz scroll suave para o topo da página
 * 
 * @param {Object} options - Opções
 * @param {string} options.behavior - 'smooth' | 'auto'
 */
export const scrollToTop = (options = {}) => {
  const { behavior = 'smooth' } = options

  window.scrollTo({
    top: 0,
    behavior,
  })
}

/**
 * Bloqueia o scroll do body
 * Útil para modais e menus mobile
 */
export const lockBodyScroll = () => {
  document.body.style.overflow = 'hidden'
}

/**
 * Desbloqueia o scroll do body
 */
export const unlockBodyScroll = () => {
  document.body.style.overflow = ''
}

/**
 * Obtém a posição atual do scroll
 * 
 * @returns {Object} { x, y }
 */
export const getScrollPosition = () => ({
  x: window.pageXOffset || document.documentElement.scrollLeft,
  y: window.pageYOffset || document.documentElement.scrollTop,
})

/**
 * Verifica se o usuário fez scroll além de um threshold
 * 
 * @param {number} threshold - Pixels de scroll
 * @returns {boolean}
 */
export const hasScrolledPast = (threshold = 0) => {
  return getScrollPosition().y > threshold
}
