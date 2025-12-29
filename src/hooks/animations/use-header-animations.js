import { useEffect } from 'react'
import { ANIMATION_THEME } from '../../constants/animation-theme'
import { gsap, registerGsap } from '../../lib/gsap/register-gsap'

export function useHeaderAnimations({ headerRef, menuRef, isMenuOpen }) {
  useEffect(() => {
    registerGsap()
    const header = headerRef.current
    if (!header) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: ANIMATION_THEME.ease.enter,
          delay: 0.2,
        }
      )
    }, header)

    return () => ctx.revert()
  }, [headerRef])

  useEffect(() => {
    registerGsap()
    const menu = menuRef.current
    if (!menu || !isMenuOpen) return

    const ctx = gsap.context(() => {
      const items = menu.querySelectorAll('.menu-item')
      gsap.fromTo(
        items,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: ANIMATION_THEME.duration.xs, stagger: ANIMATION_THEME.stagger.xs, ease: 'power2.out' }
      )
    }, menu)

    return () => ctx.revert()
  }, [menuRef, isMenuOpen])
}

