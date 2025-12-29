/**
 * GSAP Centralized Setup
 * 
 * Este módulo centraliza toda a configuração do GSAP, garantindo que
 * os plugins sejam registrados apenas uma vez e fornecendo exports
 * consistentes para toda a aplicação.
 */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registro único de plugins - executado uma vez no carregamento do módulo
gsap.registerPlugin(ScrollTrigger)

// Configurações globais do GSAP
gsap.defaults({
  ease: 'power3.out',
  duration: 0.8,
})

// Export do gsap configurado e plugins
export { gsap, ScrollTrigger }

// Re-export de presets e helpers
export * from './presets'
export * from './helpers'
