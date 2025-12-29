import { useEffect } from 'react'

/**
 * Hook para detectar clicks fora de um elemento
 * 
 * @param {React.RefObject} ref - Ref do elemento
 * @param {Function} handler - Callback quando click fora ocorre
 * @param {boolean} enabled - Se o listener está ativo
 */
export const useClickOutside = (ref, handler, enabled = true) => {
  useEffect(() => {
    if (!enabled) return

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler(event)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [ref, handler, enabled])
}

export default useClickOutside
