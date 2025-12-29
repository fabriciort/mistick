/**
 * @fileoverview Custom hook for GSAP context management
 * Ensures proper cleanup of GSAP animations in React's lifecycle
 */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugins once
gsap.registerPlugin(ScrollTrigger)

/**
 * Creates a GSAP context bound to a ref element with automatic cleanup
 * @param {Function} callback - Function containing GSAP animations
 * @param {Array} dependencies - Effect dependencies
 * @returns {React.RefObject} Ref to attach to the container element
 * 
 * @example
 * const containerRef = useGsapContext((ctx) => {
 *   ctx.add(() => {
 *     gsap.to('.element', { opacity: 1 })
 *   })
 * }, [])
 */
export function useGsapContext(callback, dependencies = []) {
  const containerRef = useRef(null)
  const contextRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create context scoped to the container
    contextRef.current = gsap.context(() => {
      callback(contextRef.current)
    }, containerRef)

    // Cleanup on unmount or dependency change
    return () => {
      if (contextRef.current) {
        contextRef.current.revert()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return containerRef
}

/**
 * Hook for creating scroll-triggered animations with automatic cleanup
 * @param {Object} options - Animation configuration
 * @returns {React.RefObject} Ref to attach to the animated element
 */
export function useScrollReveal(options = {}) {
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const {
      from = { opacity: 0, y: 60 },
      to = {},
      duration = 0.8,
      delay = 0,
      ease = 'power3.out',
      start = 'top 85%',
      toggleActions = 'play none none reverse',
      markers = false,
    } = options

    const ctx = gsap.context(() => {
      gsap.fromTo(element, from, {
        ...to,
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions,
          markers,
        },
      })
    }, element)

    return () => ctx.revert()
  }, [options])

  return elementRef
}

/**
 * Hook for parallax scrolling effects
 * @param {number} speed - Parallax speed multiplier (0.1 to 1)
 * @returns {React.RefObject} Ref to attach to the parallax element
 */
export function useParallax(speed = 0.5) {
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
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

  return elementRef
}

/**
 * Hook for staggered reveal animations on multiple elements
 * @param {string} selector - CSS selector for child elements
 * @param {Object} options - Animation options
 * @returns {React.RefObject} Ref to attach to the container
 */
export function useStaggerReveal(selector, options = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const {
      from = { opacity: 0, y: 40 },
      duration = 0.6,
      stagger = 0.1,
      ease = 'power3.out',
      start = 'top 85%',
    } = options

    const ctx = gsap.context(() => {
      const elements = container.querySelectorAll(selector)
      
      gsap.fromTo(elements, from, {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: 'play none none reverse',
        },
      })
    }, container)

    return () => ctx.revert()
  }, [selector, options])

  return containerRef
}

/**
 * Utility to refresh ScrollTrigger after layout changes
 */
export function refreshScrollTrigger() {
  ScrollTrigger.refresh()
}
