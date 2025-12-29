import { useState, useEffect } from 'react'

/**
 * Hook para monitorar a posição de scroll
 * 
 * @param {Object} options - Opções
 * @param {number} options.threshold - Threshold para isScrolled
 * @param {boolean} options.passive - Usar passive event listener
 * @returns {Object} { scrollY, scrollX, isScrolled }
 */
export const useScrollPosition = (options = {}) => {
  const { threshold = 80, passive = true } = options

  const [state, setState] = useState({
    scrollY: 0,
    scrollX: 0,
    isScrolled: false,
  })

  useEffect(() => {
    const handleScroll = () => {
      setState({
        scrollY: window.pageYOffset,
        scrollX: window.pageXOffset,
        isScrolled: window.pageYOffset > threshold,
      })
    }

    // Set initial state
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [threshold, passive])

  return state
}

export default useScrollPosition
