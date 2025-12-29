import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  DecorativePattern, 
  Divider, 
  IconButton,
  ArrowIcon 
} from '../../atoms'
import { BrandSignature, SocialLinks } from '../../molecules'
import { NAV_LINKS, SOCIAL_LINKS_FOOTER } from '../../../utils/constants'
import { scrollToSection } from '../../../utils/scroll'

gsap.registerPlugin(ScrollTrigger)

/**
 * Footer Organism - Rodapé do site
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

  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavClick = (e, href) => {
    scrollToSection(e, href)
  }

  return (
    <footer
      ref={footerRef}
      className="relative bg-forest text-cream py-12 sm:py-16 overflow-hidden"
    >
      {/* Background pattern */}
      <DecorativePattern variant="dots" />

      <div className="container-custom relative z-10">
        <div className="footer-content">
          {/* Brand Signature */}
          <BrandSignature
            description="Transformando sonhos em momentos inesquecíveis, com elegância e dedicação em cada detalhe."
            className="mb-8 sm:mb-12"
          />

          {/* Divider */}
          <Divider className="mb-8 sm:mb-12" />

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
            {NAV_LINKS.map((link) => (
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

          {/* Social Links */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <SocialLinks links={SOCIAL_LINKS_FOOTER} />
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
        className={`
          fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 
          w-11 h-11 sm:w-12 sm:h-12 rounded-full 
          bg-gold text-cream flex items-center justify-center 
          shadow-lg hover:bg-gold-dark transition-all duration-500 
          z-40 touch-target
          ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        `}
        aria-label="Voltar ao topo"
      >
        <ArrowIcon direction="up" className="w-5 h-5" />
      </button>
    </footer>
  )
}

export default Footer
