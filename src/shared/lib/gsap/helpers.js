/**
 * GSAP Helper Functions
 * 
 * Funções utilitárias para criar animações de forma consistente
 * e reduzir boilerplate nos componentes.
 */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { defaultScrollTrigger, scrollTriggerOnce } from './presets'

/**
 * Cria uma animação scroll-triggered com configurações padrão
 * 
 * @param {Element|string} element - Elemento ou seletor a ser animado
 * @param {Object} animation - Objeto com { from, to, duration?, ease? }
 * @param {Object} options - Opções adicionais
 * @returns {gsap.core.Tween}
 */
export const createScrollAnimation = (element, animation, options = {}) => {
  const { from, to, duration = 0.8, stagger, ease = 'power3.out' } = animation
  const { once = false, delay = 0, ...scrollOptions } = options

  return gsap.fromTo(element, from, {
    ...to,
    duration,
    stagger,
    delay,
    ease,
    scrollTrigger: {
      trigger: options.trigger || element,
      ...(once ? scrollTriggerOnce : defaultScrollTrigger),
      ...scrollOptions,
    },
  })
}

/**
 * Cria uma animação imediata (não scroll-triggered)
 * 
 * @param {Element|string} element - Elemento ou seletor a ser animado
 * @param {Object} animation - Objeto com { from, to, duration?, ease? }
 * @param {Object} options - Opções adicionais (delay, etc.)
 * @returns {gsap.core.Tween}
 */
export const createAnimation = (element, animation, options = {}) => {
  const { from, to, duration = 0.8, stagger, ease = 'power3.out' } = animation
  const { delay = 0 } = options

  return gsap.fromTo(element, from, {
    ...to,
    duration,
    stagger,
    delay,
    ease,
  })
}

/**
 * Cria uma timeline com contexto GSAP
 * Útil para animações complexas em componentes React
 * 
 * @param {React.RefObject} containerRef - Ref do container
 * @param {Function} setupFn - Função que recebe (tl, gsap) e configura a timeline
 * @returns {Function} Cleanup function
 */
export const createTimelineContext = (containerRef, setupFn) => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline()
    setupFn(tl, gsap)
  }, containerRef)

  return () => ctx.revert()
}

/**
 * Prepara paths SVG para animação de desenho
 * 
 * @param {NodeList|Array} paths - Paths SVG
 * @param {Object} options - strokeColor, strokeWidth
 */
export const prepareSVGPaths = (paths, options = {}) => {
  const { strokeColor = '#E59500', strokeWidth = 2 } = options

  paths.forEach((path) => {
    const length = path.getTotalLength()
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      fillOpacity: 0,
      stroke: strokeColor,
      strokeWidth,
    })
  })
}

/**
 * Anima paths SVG com efeito de desenho
 * 
 * @param {gsap.core.Timeline} timeline - Timeline GSAP
 * @param {NodeList|Array} paths - Paths SVG
 * @param {Object} options - Opções de animação
 */
export const animateSVGDraw = (timeline, paths, options = {}) => {
  const { duration = 2, stagger = 0.1, fillDuration = 0.8 } = options

  // Desenha o stroke
  timeline.to(paths, {
    strokeDashoffset: 0,
    duration,
    ease: 'power2.inOut',
    stagger,
  })

  // Preenche e remove stroke
  timeline.to(
    paths,
    {
      fillOpacity: 1,
      strokeOpacity: 0,
      duration: fillDuration,
      ease: 'power2.out',
    },
    '-=0.4'
  )
}

/**
 * Limpa todas as instâncias de ScrollTrigger
 * Útil para cleanup em useEffect
 */
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
}

/**
 * Refresh ScrollTrigger após mudanças no DOM
 * Útil após loading states ou transições
 * 
 * @param {number} delay - Delay em ms antes do refresh
 */
export const refreshScrollTrigger = (delay = 100) => {
  setTimeout(() => {
    ScrollTrigger.refresh()
  }, delay)
}

/**
 * Hook-friendly: Retorna funções para criar contexto GSAP
 * 
 * @param {React.RefObject} ref - Ref do container
 * @returns {Object} { context, cleanup }
 */
export const createGSAPContext = (ref) => {
  let ctx = null

  return {
    context: (callback) => {
      ctx = gsap.context(callback, ref)
      return ctx
    },
    cleanup: () => {
      if (ctx) ctx.revert()
    },
  }
}
