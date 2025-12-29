import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import * as presets from '../lib/gsap/presets'

/**
 * Hook para criar animações scroll-triggered
 * 
 * @param {Object} options - Opções de animação
 * @param {string} options.animation - Nome do preset ou objeto custom
 * @param {number} options.duration - Duração da animação
 * @param {number} options.delay - Delay inicial
 * @param {string} options.start - Posição de início do ScrollTrigger
 * @param {boolean} options.markers - Mostrar markers de debug
 * @returns {React.RefObject} Ref para anexar ao elemento
 */
export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const {
      animation = 'fadeInUp',
      duration = 0.8,
      delay = 0,
      start = 'top 85%',
      markers = false,
    } = options

    // Obter preset ou usar como custom
    const anim = typeof animation === 'string' 
      ? presets[animation] || presets.fadeInUp
      : animation

    const from = anim.from || { opacity: 0, y: 60 }
    const to = anim.to || { opacity: 1, y: 0 }

    gsap.fromTo(element, from, {
      ...to,
      duration: anim.duration || duration,
      delay,
      ease: anim.ease || 'power3.out',
      scrollTrigger: {
        trigger: element,
        start,
        markers,
        toggleActions: 'play none none reverse',
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [options])

  return ref
}

/**
 * Hook para efeito parallax
 * 
 * @param {number} speed - Velocidade do parallax (0-1)
 * @returns {React.RefObject}
 */
export const useParallax = (speed = 0.5) => {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    gsap.to(element, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [speed])

  return ref
}

export default useScrollAnimation
