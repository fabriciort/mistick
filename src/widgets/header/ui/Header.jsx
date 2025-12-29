import { useEffect } from 'react'
import { gsap } from '@shared/lib/gsap'
import { scrollToSection } from '@shared/lib/utils'
import { MistickLogo } from '@shared/ui'
import { navLinks } from '@entities/navigation'
import { useHeaderState } from '../model/useHeaderState'
import MobileMenu from './MobileMenu'
import DesktopNav from './DesktopNav'

/**
 * Header Widget
 * 
 * Header principal com navegação responsiva.
 */
const Header = () => {
  const {
    isMenuOpen,
    isScrolled,
    menuRef,
    headerRef,
    closeMenu,
    toggleMenu,
  } = useHeaderState()

  // Initial entrance animation
  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    gsap.fromTo(
      header,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    )
    // headerRef is stable and doesn't need to be in deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Mobile menu animation
  useEffect(() => {
    if (!menuRef.current || !isMenuOpen) return

    gsap.fromTo(
      menuRef.current.querySelectorAll('.menu-item'),
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out' }
    )
    // menuRef is stable and doesn't need to be in deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const headerHeight = headerRef.current?.offsetHeight || 80
    scrollToSection(href, { offset: headerHeight })
    closeMenu()
  }

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out safe-area-top ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-3 md:py-4'
            : 'bg-transparent py-4 md:py-6'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => handleNavClick(e, '#inicio')}
            className="flex items-center gap-2 sm:gap-3 group touch-target"
          >
            <div className="w-10 sm:w-12 md:w-14">
              <MistickLogo />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-serif text-base sm:text-lg md:text-xl font-medium tracking-wide leading-none transition-colors duration-300 ${
                  isScrolled ? 'text-mistick-black' : 'text-white'
                }`}
              >
                Mistick
              </span>
              <span
                className={`font-sans text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.15em] uppercase leading-tight mt-0.5 transition-colors duration-300 ${
                  isScrolled ? 'text-accent' : 'text-accent-light'
                }`}
              >
                by Daniele Ribeiro
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <DesktopNav
            links={navLinks}
            isScrolled={isScrolled}
            onNavClick={handleNavClick}
          />

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 transition-colors duration-300 touch-target ${
              isScrolled ? 'hover:bg-cream-dark/50' : 'hover:bg-white/10'
            }`}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
          >
            <span
              className={`w-5 h-0.5 transition-all duration-300 origin-center ${
                isScrolled ? 'bg-mistick-black' : 'bg-white'
              } ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`w-5 h-0.5 transition-all duration-300 ${
                isScrolled ? 'bg-mistick-black' : 'bg-white'
              } ${isMenuOpen ? 'opacity-0 scale-0' : ''}`}
            />
            <span
              className={`w-5 h-0.5 transition-all duration-300 origin-center ${
                isScrolled ? 'bg-mistick-black' : 'bg-white'
              } ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        ref={menuRef}
        isOpen={isMenuOpen}
        links={navLinks}
        onNavClick={handleNavClick}
        onClose={closeMenu}
      />

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-mistick-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      />
    </>
  )
}

export default Header
