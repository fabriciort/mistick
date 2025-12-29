import { memo, useEffect, useRef, useState } from 'react'
import { NAV_LINKS } from '../../../constants/navigation'
import { IconButton, MistickLogo } from '../../atoms'
import { useHeaderAnimations } from '../../../hooks/animations/use-header-animations'
import {
  getBrandNameClassName,
  getBrandSubtitleClassName,
  getDesktopNavLinkClassName,
  getDesktopNavUnderlineClassName,
  getHamburgerLineClassName,
  getHeaderClassName,
  getMobileOverlayClassName,
  getMobilePanelClassName,
} from './Header.styles'

const Header = () => {
  const headerRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const menuRef = useRef(null)
  const menuToggleRef = useRef(null)

  useHeaderAnimations({ headerRef, menuRef, isMenuOpen })

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      const menu = menuRef.current
      const toggle = menuToggleRef.current
      if (isMenuOpen && menu && !menu.contains(e.target) && toggle && !toggle.contains(e.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isMenuOpen])

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Scroll detection for header style change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (e, href) => {
    e.preventDefault()
    const section = document.querySelector(href)
    if (section) {
      const headerHeight = headerRef.current?.offsetHeight || 80
      const elementPosition = section.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      setIsMenuOpen(false)
    }
  }

  return (
    <>
      <header
        ref={headerRef}
        className={getHeaderClassName({ isScrolled })}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => scrollToSection(e, '#inicio')}
            className="flex items-center gap-2 sm:gap-3 group touch-target"
          >
            <div className="w-10 sm:w-12 md:w-14">
              <MistickLogo />
            </div>
            <div className="flex flex-col">
              <span className={getBrandNameClassName({ isScrolled })}>
                Mistick
              </span>
              <span className={getBrandSubtitleClassName({ isScrolled })}>
                by Daniele Ribeiro
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={getDesktopNavLinkClassName({ isScrolled })}
              >
                {link.label}
                <span className={getDesktopNavUnderlineClassName({ isScrolled })} />
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <IconButton
            ref={menuToggleRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden"
            isScrolled={isScrolled}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
          >
            <span
              className={getHamburgerLineClassName({ isScrolled, isMenuOpen, position: 'top' })}
            />
            <span
              className={getHamburgerLineClassName({ isScrolled, isMenuOpen, position: 'middle' })}
            />
            <span
              className={getHamburgerLineClassName({ isScrolled, isMenuOpen, position: 'bottom' })}
            />
          </IconButton>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={getMobileOverlayClassName({ isMenuOpen })}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        ref={menuRef}
        className={getMobilePanelClassName({ isMenuOpen })}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center bg-cream-dark/50 hover:bg-cream-dark transition-colors duration-300 touch-target"
            aria-label="Fechar menu"
          >
            <svg className="w-5 h-5 text-mistick-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Logo in menu */}
        <div className="px-6 pb-6 border-b border-cream-dark">
          <div className="flex items-center gap-3">
            <div className="w-10">
              <MistickLogo />
            </div>
            <div>
              <span className="font-serif text-lg font-medium tracking-wide text-mistick-black block leading-none">Mistick</span>
              <span className="font-sans text-[8px] tracking-[0.15em] uppercase text-accent block">by Daniele Ribeiro</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-6 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="menu-item font-sans text-base tracking-wider text-mistick-charcoal hover:text-accent transition-colors duration-300 py-3 px-4 hover:bg-cream-dark/50 flex items-center justify-between group touch-target"
            >
              <span>{link.label}</span>
              <svg
                className="w-4 h-4 text-accent opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </nav>

        {/* CTA in mobile menu */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-cream-dark bg-white safe-area-bottom">
          <a
            href="#contato"
            onClick={(e) => scrollToSection(e, '#contato')}
            className="w-full flex items-center justify-center gap-2 bg-mistick-black text-white font-sans text-xs tracking-widest uppercase py-4 hover:bg-accent transition-colors duration-300 touch-target"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Fale Conosco
          </a>
        </div>
      </div>
    </>
  )
}

export default memo(Header)
