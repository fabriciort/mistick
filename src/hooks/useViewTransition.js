import { useCallback } from 'react'
import { flushSync } from 'react-dom'

/**
 * useViewTransition - Hook para View Transitions API
 * @returns {Object} - Funções para transições
 */
export const useViewTransition = () => {
  /**
   * Executa uma transição com fallback para browsers sem suporte
   * @param {Function} callback - Função a executar durante a transição
   */
  const startTransition = useCallback((callback) => {
    if (!document.startViewTransition) {
      callback()
      return
    }

    document.startViewTransition(() => {
      flushSync(() => {
        callback()
      })
    })
  }, [])

  /**
   * Verifica se o browser suporta View Transitions
   */
  const isSupported = typeof document !== 'undefined' && 'startViewTransition' in document

  return {
    startTransition,
    isSupported,
  }
}
