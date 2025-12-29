import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CloseIcon, SocialIcon, MistickLogo } from '../../atoms'
import { BrandLogo, NavLink, MobileMenuButton, MobileNavLink } from '../../molecules'
import { NAV_LINKS } from '../../../utils/constants'
import { scrollToSection } from '../../../utils/scroll'

gsap.registerPlugin(ScrollTrigger)

/**
 * Header Organism - Cabeçalho principal com navegação
 */
const Header = () => {
  const headerRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const menuRef = useRef(null)

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
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

  // Initial animation
  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    gsap.fromTo(header,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  // Mobile menu animation
  useEffect(() => {
    if (!menuRef.current) return

    if (isMenuOpen) {
      gsap.fromTo(menuRef.current.querySelectorAll('.menu-item'),
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out' }
      )
    }
  }, [isMenuOpen])

  const handleNavClick = (e, href) => {
    scrollToSection(e, href, headerRef.current?.offsetHeight)
    setIsMenuOpen(false)
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
          <BrandLogo 
            isScrolled={isScrolled}
            onClick={(e) => handleNavClick(e, '#inicio')}
          />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                isScrolled={isScrolled}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <MobileMenuButton
            isOpen={isMenuOpen}
            isScrolled={isScrolled}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-mistick-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        ref={menuRef}
        className={`lg:hidden fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-white z-50 shadow-2xl transition-transform duration-500 ease-out safe-area-top ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center bg-cream-dark/50 hover:bg-cream-dark transition-colors duration-300 touch-target"
            aria-label="Fechar menu"
          >
            <CloseIcon className="w-5 h-5 text-mistick-black" />
          </button>
        </div>

        {/* Logo in menu */}
        <div className="px-6 pb-6 border-b border-cream-dark">
          <div className="flex items-center gap-3">
            <div className="w-10">
              <MistickLogo animated={false} />
            </div>
            <div>
              <span className="font-serif text-lg font-medium tracking-wide text-mistick-black block leading-none">
                Mistick
              </span>
              <span className="font-sans text-[8px] tracking-[0.15em] uppercase text-accent block">
                by Daniele Ribeiro
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-6 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <MobileNavLink
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </MobileNavLink>
          ))}
        </nav>

        {/* CTA in mobile menu */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-cream-dark bg-white safe-area-bottom">
          <a
            href="#contato"
            onClick={(e) => handleNavClick(e, '#contato')}
            className="w-full flex items-center justify-center gap-2 bg-mistick-black text-white font-sans text-xs tracking-widest uppercase py-4 hover:bg-accent transition-colors duration-300 touch-target"
          >
            <SocialIcon name="whatsapp" className="w-4 h-4" />
            Fale Conosco
          </a>
        </div>
      </div>
    </>
  )
}

export default Header
