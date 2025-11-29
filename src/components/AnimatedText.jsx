import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
    const container = containerRef.current
    if (!container) return

    let elements = []

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

    const animationConfig = {
      y: animation === 'lines' ? 40 : 60,
      opacity: 0,
      duration,
      stagger,
      delay,
      ease: 'power3.out',
    }

    if (triggerOnScroll) {
      gsap.fromTo(elements, 
        { y: animationConfig.y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    } else {
      gsap.fromTo(elements,
        { y: animationConfig.y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease: 'power3.out',
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [animation, stagger, duration, delay, triggerOnScroll])

  return (
    <Component ref={containerRef} className={className}>
      {children}
    </Component>
  )
}

export default AnimatedText

