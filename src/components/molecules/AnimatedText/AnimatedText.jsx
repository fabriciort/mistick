/**
 * @fileoverview AnimatedText molecule component
 * Text with GSAP-powered reveal animations
 */

import { useEffect, useRef, memo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '../../../lib/cn'
import { DURATION, EASING, STAGGER, SCROLL_TRIGGER } from '../../../styles/animation-theme'

gsap.registerPlugin(ScrollTrigger)

/**
 * @typedef {'words' | 'chars' | 'lines'} AnimationType
 */

/**
 * Animated text component with word/char/line reveal
 * @param {Object} props
 * @param {React.ReactNode} props.children - Text content
 * @param {string} [props.className] - Additional classes
 * @param {AnimationType} [props.animation='words'] - Animation type
 * @param {number} [props.stagger] - Stagger delay
 * @param {number} [props.duration] - Animation duration
 * @param {number} [props.delay=0] - Initial delay
 * @param {string} [props.as='div'] - HTML element to render
 * @param {boolean} [props.triggerOnScroll=true] - Use scroll trigger
 */
const AnimatedText = (props) => {
  const {
    children,
    className = '',
    animation = 'words',
    stagger,
    duration,
    delay = 0,
    as: ElementType = 'div',
    triggerOnScroll = true,
  } = props
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let elements = []

    // Split text based on animation type
    if (animation === 'words') {
      const text = container.textContent
      container.innerHTML = text
        .split(' ')
        .map(word => `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`)
        .join(' ')
      elements = container.querySelectorAll('span > span')
    } else if (animation === 'chars') {
      const text = container.textContent
      container.innerHTML = text
        .split('')
        .map(char => char === ' ' ? ' ' : `<span class="inline-block overflow-hidden"><span class="inline-block">${char}</span></span>`)
        .join('')
      elements = container.querySelectorAll('span > span')
    } else if (animation === 'lines') {
      elements = [container]
    }

    const animDuration = duration ?? DURATION.MEDIUM
    const animStagger = stagger ?? (animation === 'chars' ? STAGGER.FAST : STAGGER.NORMAL)
    const yOffset = animation === 'lines' ? 40 : 60

    const ctx = gsap.context(() => {
      if (triggerOnScroll) {
        gsap.fromTo(elements,
          { y: yOffset, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: animDuration,
            stagger: animStagger,
            delay,
            ease: EASING.DEFAULT,
            scrollTrigger: {
              trigger: container,
              start: SCROLL_TRIGGER.START,
              toggleActions: SCROLL_TRIGGER.TOGGLE_ACTIONS,
            },
          }
        )
      } else {
        gsap.fromTo(elements,
          { y: yOffset, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: animDuration,
            stagger: animStagger,
            delay,
            ease: EASING.DEFAULT,
          }
        )
      }
    }, container)

    return () => ctx.revert()
  }, [animation, stagger, duration, delay, triggerOnScroll])

  return (
    <ElementType ref={containerRef} className={cn('[&>span]:inline-block', className)}>
      {children}
    </ElementType>
  )
}

export default memo(AnimatedText)
