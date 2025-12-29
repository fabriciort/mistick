import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@shared/lib/gsap'
import { scrollToSection, scrollToTop } from '@shared/lib/utils'
import { MistickLogo, ArrowUpIcon } from '@shared/ui'
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from '@shared/ui/icons'
import { navLinks } from '@entities/navigation'
import { useScrollPosition } from '@shared/hooks'

/**
 * Footer Widget
 * 
 * Rodapé do site com navegação, redes sociais e botão scroll-to-top.
 */
const Footer = () => {
  const footerRef = useRef(null)
  const { scrollY } = useScrollPosition()
  const showScrollTop = scrollY > 500

  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'instagram', url: 'https://instagram.com/mistickbydaniele', icon: InstagramIcon },
    { name: 'facebook', url: 'https://facebook.com/mistickbydaniele', icon: FacebookIcon },
    { name: 'whatsapp', url: 'https://wa.me/5511999999999', icon: WhatsAppIcon },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-content',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
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

  const handleNavClick = (e, href) => {
    e.preventDefault()
    scrollToSection(href)
  }

  return (
    <footer
      ref={footerRef}
      className="relative bg-forest text-cream py-12 sm:py-16 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.02]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="footer-pattern"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="30" cy="30" r="1" fill="currentColor" className="text-cream" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-pattern)" />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        <div className="footer-content">
          {/* Logo e descrição */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="w-12 sm:w-16">
                <MistickLogo variant="light" />
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
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
            <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent to-gold/50" />
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gold/50" />
            <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent to-gold/50" />
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-sans text-xs sm:text-sm tracking-wider uppercase text-cream/60 hover:text-gold transition-colors duration-300 py-2 touch-target"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-cream/10 flex items-center justify-center text-cream hover:bg-gold hover:text-forest transition-all duration-300 touch-target"
                  aria-label={`Seguir no ${social.name}`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              )
            })}
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
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gold text-cream flex items-center justify-center shadow-lg hover:bg-gold-dark transition-all duration-500 z-40 touch-target ${
          showScrollTop
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Voltar ao topo"
      >
        <ArrowUpIcon className="w-5 h-5" />
      </button>
    </footer>
  )
}

export default Footer
