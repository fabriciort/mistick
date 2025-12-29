import { useSyncExternalStore } from 'react'

/**
 * Hook para detectar media queries
 * Usa useSyncExternalStore para evitar warnings de setState em useEffect
 * 
 * @param {string} query - Media query string (ex: '(min-width: 768px)')
 * @returns {boolean} Se a query corresponde
 */
export const useMediaQuery = (query) => {
  const subscribe = (callback) => {
    const mediaQuery = window.matchMedia(query)
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', callback)
    } else {
      mediaQuery.addListener(callback)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', callback)
      } else {
        mediaQuery.removeListener(callback)
      }
    }
  }

  const getSnapshot = () => {
    return window.matchMedia(query).matches
  }

  const getServerSnapshot = () => {
    // Default para SSR - assume desktop
    return false
  }

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

// Breakpoints convenientes (Tailwind defaults)
export const useIsMobile = () => useMediaQuery('(max-width: 767px)')
export const useIsTablet = () => useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')

export default useMediaQuery
