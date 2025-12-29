/**
 * @fileoverview Header organism component
 * Main navigation header with responsive mobile menu
 */

import { useEffect, useRef, useState, memo, useCallback } from 'react'
import gsap from 'gsap'
import { Logo } from '../../atoms'
import { NavLink, NavLinkMobile } from '../../molecules'
import { Icon } from '../../atoms/Icon'
import { cn } from '../../../lib/cn'
import { NAV_LINKS } from '../../../constants'
import { DURATION, EASING, STAGGER } from '../../../styles/animation-theme'

/**
 * Main header component with navigation
 */
const Header = () => {
  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
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
    if (!headerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: DURATION.SLOW, ease: EASING.DEFAULT, delay: 0.2 }
      )
    }, headerRef)

    return () => ctx.revert()
  }, [])

  // Mobile menu animation
  useEffect(() => {
    if (!menuRef.current || !isMenuOpen) return

    const ctx = gsap.context(() => {
      gsap.fromTo(menuRef.current.querySelectorAll('.menu-item'),
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: DURATION.FAST, stagger: STAGGER.FAST, ease: EASING.DEFAULT }
      )
    }, menuRef)

    return () => ctx.revert()
  }, [isMenuOpen])

  const handleCloseMenu = useCallback(() => setIsMenuOpen(false), [])

  const scrollToSection = useCallback((e, href) => {
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
  }, [])

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out safe-area-top',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-3 md:py-4'
            : 'bg-transparent py-4 md:py-6'
        )}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => scrollToSection(e, '#inicio')}
            className="flex items-center gap-2 sm:gap-3 group touch-target"
          >
            <div className="w-10 sm:w-12 md:w-14">
              <Logo animate={false} variant={isScrolled ? 'dark' : 'light'} />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                'font-serif text-base sm:text-lg md:text-xl font-medium tracking-wide leading-none transition-colors duration-300',
                isScrolled ? 'text-mistick-black' : 'text-white'
              )}>
                Mistick
              </span>
              <span className={cn(
                'font-sans text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.15em] uppercase leading-tight mt-0.5 transition-colors duration-300',
                isScrolled ? 'text-accent' : 'text-accent-light'
              )}>
                by Daniele Ribeiro
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                isScrolled={isScrolled}
                onClick={(e) => scrollToSection(e, link.href)}
              />
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <HamburgerButton
            isOpen={isMenuOpen}
            isScrolled={isScrolled}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 bg-mistick-black/60 backdrop-blur-sm z-40 transition-opacity duration-300',
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={handleCloseMenu}
      />

      {/* Mobile Menu Panel */}
      <MobileMenu
        ref={menuRef}
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        onNavigate={scrollToSection}
      />
    </>
  )
}

/**
 * Hamburger menu button component
 */
const HamburgerButton = memo(({ isOpen, isScrolled, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      'lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 transition-colors duration-300 touch-target',
      isScrolled ? 'hover:bg-cream-dark/50' : 'hover:bg-white/10'
    )}
    aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
    aria-expanded={isOpen}
  >
    <span className={cn(
      'w-5 h-0.5 transition-all duration-300 origin-center',
      isScrolled ? 'bg-mistick-black' : 'bg-white',
      isOpen && 'rotate-45 translate-y-2'
    )} />
    <span className={cn(
      'w-5 h-0.5 transition-all duration-300',
      isScrolled ? 'bg-mistick-black' : 'bg-white',
      isOpen && 'opacity-0 scale-0'
    )} />
    <span className={cn(
      'w-5 h-0.5 transition-all duration-300 origin-center',
      isScrolled ? 'bg-mistick-black' : 'bg-white',
      isOpen && '-rotate-45 -translate-y-2'
    )} />
  </button>
))

HamburgerButton.displayName = 'HamburgerButton'

/**
 * Mobile menu panel component
 */
const MobileMenu = memo(({ isOpen, onClose, onNavigate, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'lg:hidden fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-white z-50 shadow-2xl transition-transform duration-500 ease-out safe-area-top',
      isOpen ? 'translate-x-0' : 'translate-x-full'
    )}
    {...props}
  >
    {/* Close button */}
    <div className="flex justify-end p-4">
      <button
        onClick={onClose}
        className="w-10 h-10 flex items-center justify-center bg-cream-dark/50 hover:bg-cream-dark transition-colors duration-300 touch-target"
        aria-label="Fechar menu"
      >
        <Icon name="close" size="md" className="text-mistick-black" />
      </button>
    </div>

    {/* Logo in menu */}
    <div className="px-6 pb-6 border-b border-cream-dark">
      <div className="flex items-center gap-3">
        <div className="w-10">
          <Logo animate={false} variant="dark" />
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
        <NavLinkMobile
          key={link.href}
          href={link.href}
          label={link.label}
          onClick={(e) => onNavigate(e, link.href)}
        />
      ))}
    </nav>

    {/* CTA in mobile menu */}
    <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-cream-dark bg-white safe-area-bottom">
      <a
        href="#contato"
        onClick={(e) => onNavigate(e, '#contato')}
        className="w-full flex items-center justify-center gap-2 bg-mistick-black text-white font-sans text-xs tracking-widest uppercase py-4 hover:bg-accent transition-colors duration-300 touch-target"
      >
        <Icon name="whatsapp" size="sm" />
        Fale Conosco
      </a>
    </div>
  </div>
))

MobileMenu.displayName = 'MobileMenu'

export default memo(Header)
