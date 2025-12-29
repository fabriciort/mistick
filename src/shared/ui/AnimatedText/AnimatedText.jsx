import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, defaultScrollTrigger } from '@shared/lib/gsap'

/**
 * AnimatedText Component
 * 
 * Componente para animar texto com diferentes modos:
 * - words: anima cada palavra separadamente
 * - chars: anima cada caractere
 * - lines: anima o bloco inteiro
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Texto a ser animado
 * @param {string} props.className - Classes CSS
 * @param {'words'|'chars'|'lines'} props.animation - Tipo de animação
 * @param {number} props.stagger - Delay entre elementos
 * @param {number} props.duration - Duração da animação
 * @param {number} props.delay - Delay inicial
 * @param {string} props.as - Tag HTML a ser renderizada
 * @param {boolean} props.triggerOnScroll - Se anima no scroll ou imediatamente
 */
const AnimatedText = ({
  children,
  className = '',
  animation = 'words',
  stagger = 0.05,
  duration = 0.8,
  delay = 0,
  as = 'div',
  triggerOnScroll = true,
}) => {
  const Tag = as
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let elements = []

    if (animation === 'words') {
      const text = container.textContent
      container.innerHTML = text
        .split(' ')
        .map(
          (word) =>
            `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`
        )
        .join(' ')
      elements = container.querySelectorAll('span > span')
    } else if (animation === 'chars') {
      const text = container.textContent
      container.innerHTML = text
        .split('')
        .map((char) =>
          char === ' '
            ? ' '
            : `<span class="inline-block overflow-hidden"><span class="inline-block">${char}</span></span>`
        )
        .join('')
      elements = container.querySelectorAll('span > span')
    } else if (animation === 'lines') {
      elements = [container]
    }

    const animationConfig = {
      y: animation === 'lines' ? 40 : 60,
      opacity: 0,
    }

    if (triggerOnScroll) {
      gsap.fromTo(
        elements,
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
            ...defaultScrollTrigger,
          },
        }
      )
    } else {
      gsap.fromTo(
        elements,
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
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars?.trigger === container) {
          trigger.kill()
        }
      })
    }
  }, [animation, stagger, duration, delay, triggerOnScroll])

  return (
    <Tag ref={containerRef} className={`${className} [&>span]:inline-block`}>
      {children}
    </Tag>
  )
}

export default AnimatedText
