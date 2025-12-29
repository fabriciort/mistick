/**
 * @fileoverview Footer organism component
 * Site footer with navigation and social links
 */

import { useEffect, useRef, useState, memo, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Logo } from '../../atoms'
import { Icon } from '../../atoms/Icon'
import { SocialLinkGroup } from '../../molecules'
import { cn } from '../../../lib/cn'
import { NAV_LINKS, SOCIAL_LINKS } from '../../../constants'
import { DURATION, EASING } from '../../../styles/animation-theme'

gsap.registerPlugin(ScrollTrigger)

/**
 * Footer component
 */
const Footer = () => {
  const footerRef = useRef(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-content',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DURATION.MEDIUM,
          ease: EASING.DEFAULT,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const currentYear = new Date().getFullYear()

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const scrollToSection = useCallback((e, href) => {
    e.preventDefault()
    const section = document.querySelector(href)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative bg-forest text-cream py-12 sm:py-16 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="currentColor" className="text-cream" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-pattern)" />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        <div className="footer-content">
          {/* Logo and description */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="w-12 sm:w-16">
                <Logo animate={false} variant="light" />
              </div>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl tracking-wide mb-1 sm:mb-2 text-cream">
              Mistick
            </h3>
            <p className="font-sans text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase text-gold mb-4 sm:mb-6">
              by Daniele Ribeiro
            </p>
            <p className="font-sans text-sm sm:text-base text-cream/60 max-w-xs sm:max-w-md mx-auto px-4">
              Transformando sonhos em momentos inesquecíveis, com elegância e dedicação em cada detalhe.
            </p>
          </div>

          {/* Divider */}
          <Divider />

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="font-sans text-xs sm:text-sm tracking-wider uppercase text-cream/60 hover:text-gold transition-colors duration-300 py-2 touch-target"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social links */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <SocialLinkGroup links={SOCIAL_LINKS.slice(0, 3)} variant="dark" />
          </div>

          {/* Copyright */}
          <div className="text-center border-t border-cream/10 pt-6 sm:pt-8">
            <p className="font-sans text-xs sm:text-sm text-cream/40">
              © {currentYear} Mistick by Daniele Ribeiro. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={cn(
          'fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8',
          'w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gold text-cream',
          'flex items-center justify-center shadow-lg hover:bg-gold-dark',
          'transition-all duration-500 z-40 touch-target',
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        )}
        aria-label="Voltar ao topo"
      >
        <Icon name="arrowUp" size="md" />
      </button>
    </footer>
  )
}

/**
 * Decorative divider
 */
const Divider = memo(() => (
  <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
    <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent to-gold/50" />
    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gold/50" />
    <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent to-gold/50" />
  </div>
))

Divider.displayName = 'Divider'

export default memo(Footer)
