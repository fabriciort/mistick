import { useEffect, useRef } from 'react'
import { ANIMATION_THEME } from '../../../constants/animation-theme'
import { gsap, registerGsap } from '../../../lib/gsap/register-gsap'

const AnimatedText = ({
  children,
  className = '',
  animation = 'words',
  stagger = 0.05,
  duration = 0.8,
  delay = 0,
  as: Component = 'div',
  triggerOnScroll = true,
}) => {
  const containerRef = useRef(null)

  useEffect(() => {
    registerGsap()

    const container = containerRef.current
    if (!container) return

    const originalText = container.textContent || ''
    let elements = []

    if (animation === 'words') {
      container.innerHTML = originalText
        .split(' ')
        .map(word => `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`)
        .join(' ')
      elements = container.querySelectorAll('span > span')
    } else if (animation === 'chars') {
      container.innerHTML = originalText
        .split('')
        .map(char => char === ' ' ? ' ' : `<span class="inline-block overflow-hidden"><span class="inline-block">${char}</span></span>`)
        .join('')
      elements = container.querySelectorAll('span > span')
    } else if (animation === 'lines') {
      elements = [container]
    }

    const yFrom = animation === 'lines' ? 40 : 60

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        { y: yFrom, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease: ANIMATION_THEME.ease.enter,
          ...(triggerOnScroll
            ? {
              scrollTrigger: {
                trigger: container,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
            : null),
        }
      )
    }, container)

    return () => {
      ctx.revert()
      // Restore original text to keep React/DOM consistent when unmounting/remounting.
      container.textContent = originalText
    }
  }, [animation, stagger, duration, delay, triggerOnScroll])

  return (
    <Component ref={containerRef} className={`${className} [&>span]:inline-block`}>
      {children}
    </Component>
  )
}

export default AnimatedText

