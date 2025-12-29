import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useGsapAnimation - Hook para animações GSAP com ScrollTrigger
 * @param {Object} options - Configurações da animação
 * @returns {React.RefObject} - Ref para o elemento animado
 */
export const useGsapAnimation = (options = {}) => {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const {
      animation = 'fadeUp',
      duration = 1,
      delay = 0,
      start = 'top 85%',
      markers = false,
      ease = 'power3.out',
    } = options

    const animations = {
      fadeUp: {
        from: { opacity: 0, y: 60 },
        to: { opacity: 1, y: 0 },
      },
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      fadeLeft: {
        from: { opacity: 0, x: -60 },
        to: { opacity: 1, x: 0 },
      },
      fadeRight: {
        from: { opacity: 0, x: 60 },
        to: { opacity: 1, x: 0 },
      },
      scale: {
        from: { opacity: 0, scale: 0.8 },
        to: { opacity: 1, scale: 1 },
      },
      rotate: {
        from: { opacity: 0, rotation: -10 },
        to: { opacity: 1, rotation: 0 },
      },
    }

    const anim = animations[animation] || animations.fadeUp

    const ctx = gsap.context(() => {
      gsap.fromTo(element, anim.from, {
        ...anim.to,
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: element,
          start,
          markers,
          toggleActions: 'play none none reverse',
        },
      })
    }, element)

    return () => ctx.revert()
  }, [options])

  return ref
}

/**
 * useParallax - Hook para efeito parallax
 * @param {number} speed - Velocidade do parallax
 * @returns {React.RefObject} - Ref para o elemento
 */
export const useParallax = (speed = 0.5) => {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const ctx = gsap.context(() => {
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
    }, element)

    return () => ctx.revert()
  }, [speed])

  return ref
}

/**
 * useStaggerAnimation - Hook para animações com stagger
 * @param {Object} options - Configurações
 * @returns {React.RefObject} - Ref para o container
 */
export const useStaggerAnimation = (options = {}) => {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const {
      childSelector = '.stagger-item',
      duration = 0.6,
      stagger = 0.1,
      start = 'top 85%',
      fromY = 30,
    } = options

    const children = container.querySelectorAll(childSelector)
    if (!children.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(children,
        { y: fromY, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start,
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, container)

    return () => ctx.revert()
  }, [options])

  return ref
}
