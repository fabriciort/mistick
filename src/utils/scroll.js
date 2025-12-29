/**
 * Utilitários para scroll suave
 */

/**
 * Scroll suave para uma seção
 * @param {Event} e - Evento do click
 * @param {string} href - Seletor da seção (#id)
 * @param {number} headerOffset - Altura do header para compensar
 */
export const scrollToSection = (e, href, headerOffset = 80) => {
  e?.preventDefault()
  const section = document.querySelector(href)
  if (section) {
    const elementPosition = section.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

/**
 * Scroll para o topo da página
 */
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/**
 * Verifica se um elemento está visível na viewport
 * @param {HTMLElement} element - Elemento a verificar
 * @param {number} offset - Offset de tolerância
 * @returns {boolean}
 */
export const isInViewport = (element, offset = 0) => {
  if (!element) return false
  
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= -offset &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}
