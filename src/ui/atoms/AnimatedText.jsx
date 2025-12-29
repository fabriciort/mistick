import { useEffect, useRef } from 'react'
import { gsap } from '@/shared/lib/gsap'

const AnimatedText = ({
  children,
  className = '',
  animation = 'words',
  stagger = 0.05,
  duration = 0.8,
  delay = 0,
  as: asProp = 'div',
  triggerOnScroll = true,
}) => {
  const Component = asProp
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const originalText = container.textContent ?? ''
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

    const ctx = gsap.context(() => {
      const from = { y: animation === 'lines' ? 40 : 60, opacity: 0 }
      const base = { y: 0, opacity: 1, duration, stagger, delay, ease: 'power3.out' }

      if (triggerOnScroll) {
        gsap.fromTo(elements, from, {
          ...base,
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      } else {
        gsap.fromTo(elements, from, base)
      }
    }, container)

    return () => {
      ctx.revert()
      // We mutate `innerHTML` above; restore the original content on cleanup.
      container.textContent = originalText
    }
  }, [animation, stagger, duration, delay, triggerOnScroll, children])

  return (
    <Component ref={containerRef} className={`${className} [&>span]:inline-block`}>
      {children}
    </Component>
  )
}

export default AnimatedText

