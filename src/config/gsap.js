/**
 * Configuração global do GSAP
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugins
gsap.registerPlugin(ScrollTrigger)

// Default GSAP config
gsap.config({
  nullTargetWarn: false,
})

// Default ScrollTrigger config
ScrollTrigger.config({
  ignoreMobileResize: true,
})

/**
 * Inicializa GSAP com configurações padrão
 */
export const initGsap = () => {
  // Any global animations or setup can go here
}

/**
 * Refresh ScrollTrigger (útil após mudanças de layout)
 */
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh()
}

/**
 * Limpa todos os ScrollTriggers
 */
export const clearScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
}

export { gsap, ScrollTrigger }
