import { useEffect } from 'react'
import { lockBodyScroll, unlockBodyScroll } from '../lib/utils/scroll'

/**
 * Hook para bloquear/desbloquear scroll do body
 * 
 * @param {boolean} isLocked - Se o scroll deve estar bloqueado
 */
export const useBodyScrollLock = (isLocked) => {
  useEffect(() => {
    if (isLocked) {
      lockBodyScroll()
    } else {
      unlockBodyScroll()
    }

    return () => {
      unlockBodyScroll()
    }
  }, [isLocked])
}

export default useBodyScrollLock
