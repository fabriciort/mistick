import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Centraliza o registro de plugins para evitar duplicação em vários módulos.
// Como o módulo é cacheado, isso roda apenas uma vez por bundle.
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

