import { useState, useRef, useCallback } from 'react'
import { useScrollPosition, useClickOutside, useBodyScrollLock } from '@shared/hooks'

/**
 * Hook para gerenciar estado do Header
 * 
 * Encapsula toda a lógica de estado do Header:
 * - Menu mobile aberto/fechado
 * - Detecção de scroll para mudança de estilo
 * - Click outside para fechar menu
 * - Lock do body scroll quando menu aberto
 */
export const useHeaderState = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const headerRef = useRef(null)
  
  const { isScrolled } = useScrollPosition({ threshold: 80 })

  // Fecha menu quando clica fora
  useClickOutside(menuRef, () => setIsMenuOpen(false), isMenuOpen)

  // Bloqueia scroll do body quando menu está aberto
  useBodyScrollLock(isMenuOpen)

  const openMenu = useCallback(() => setIsMenuOpen(true), [])
  const closeMenu = useCallback(() => setIsMenuOpen(false), [])
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), [])

  return {
    // State
    isMenuOpen,
    isScrolled,
    
    // Refs
    menuRef,
    headerRef,
    
    // Actions
    openMenu,
    closeMenu,
    toggleMenu,
  }
}

export default useHeaderState
