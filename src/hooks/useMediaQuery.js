import { useSyncExternalStore, useCallback } from 'react'

/**
 * useMediaQuery - Hook para detectar media queries
 * Usa useSyncExternalStore para evitar problemas de sincronização
 * @param {string} query - Media query string
 * @returns {boolean} - Se a query corresponde
 */
export const useMediaQuery = (query) => {
  const subscribe = useCallback((callback) => {
    const media = window.matchMedia(query)
    media.addEventListener('change', callback)
    return () => media.removeEventListener('change', callback)
  }, [query])

  const getSnapshot = useCallback(() => {
    return window.matchMedia(query).matches
  }, [query])

  const getServerSnapshot = useCallback(() => false, [])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/**
 * useBreakpoint - Hook para detectar breakpoints Tailwind
 * @returns {Object} - Objeto com breakpoints ativos
 */
export const useBreakpoint = () => {
  const isSm = useMediaQuery('(min-width: 640px)')
  const isMd = useMediaQuery('(min-width: 768px)')
  const isLg = useMediaQuery('(min-width: 1024px)')
  const isXl = useMediaQuery('(min-width: 1280px)')
  const is2xl = useMediaQuery('(min-width: 1536px)')

  return {
    isSm,
    isMd,
    isLg,
    isXl,
    is2xl,
    isMobile: !isMd,
    isTablet: isMd && !isLg,
    isDesktop: isLg,
  }
}
