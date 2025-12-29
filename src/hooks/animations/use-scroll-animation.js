import { useEffect, useRef } from 'react'
import { ANIMATION_THEME } from '../../constants/animation-theme'
import { gsap, registerGsap } from '../../lib/gsap/register-gsap'

export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null)

  useEffect(() => {
    registerGsap()

    const element = ref.current
    if (!element) return

    const {
      animation = 'fadeUp',
      duration = 1,
      delay = 0,
      start = 'top 85%',
      markers = false,
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
        ease: ANIMATION_THEME.ease.enter,
        scrollTrigger: {
          trigger: element,
          start,
          markers,
          toggleActions: 'play none none reverse',
        },
      })
    }, element)

    return () => {
      ctx.revert()
    }
  }, [options.animation, options.duration, options.delay, options.start, options.markers])

  return ref
}

export const useParallax = (speed = 0.5) => {
  const ref = useRef(null)

  useEffect(() => {
    registerGsap()

    const element = ref.current
    if (!element) return

    const ctx = gsap.context(() => {
      gsap.to(element, {
        yPercent: speed * 100,
        ease: ANIMATION_THEME.ease.linear,
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, element)

    return () => {
      ctx.revert()
    }
  }, [speed])

  return ref
}

