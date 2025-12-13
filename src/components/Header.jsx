import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Header = () => {
  const headerRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const menuRef = useRef(null)

  // Fechar menu ao clicar fora
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

  // Prevenir scroll quando menu está aberto (mobile)
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    gsap.fromTo(header,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  // Animação do menu mobile
  useEffect(() => {
    if (!menuRef.current) return

    if (isMenuOpen) {
      gsap.fromTo(menuRef.current.querySelectorAll('.menu-item'),
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out' }
      )
    }
  }, [isMenuOpen])

  const navLinks = [
    { href: '#inicio', label: 'Início' },
    { href: '#sobre', label: 'Sobre' },
    { href: '#servicos', label: 'Serviços' },
    { href: '#contato', label: 'Contato' },
  ]

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 safe-area-top ${
          isScrolled
            ? 'bg-cream/95 backdrop-blur-md shadow-lg py-2 sm:py-3'
            : 'bg-transparent py-4 sm:py-6'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => scrollToSection(e, '#inicio')}
            className="flex items-center gap-2 sm:gap-3 group touch-target"
          >
            <svg
              viewBox="0 0 100 50"
              className="w-10 h-5 sm:w-12 sm:h-6 text-forest transition-transform duration-300 group-hover:scale-110"
              fill="none"
            >
              <path
                d="M50 25C50 17 43 10 33 10C23 10 15 17 15 25C15 33 23 40 33 40C43 40 50 33 50 25C50 33 57 40 67 40C77 40 85 33 85 25C85 17 77 10 67 10C57 10 50 17 50 25Z"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-semibold tracking-wide text-forest leading-tight">
                Tina Ribéro
              </span>
              <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-gold leading-tight">
                Assessoria & Eventos
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="relative font-sans text-sm tracking-widest uppercase text-forest hover:text-gold transition-colors duration-300 group py-2"
              >
                {link.label}
                <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-cream-dark/50 transition-colors duration-300 touch-target"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
          >
            <span
              className={`w-6 h-0.5 bg-forest transition-all duration-300 origin-center ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-forest transition-all duration-300 ${
                isMenuOpen ? 'opacity-0 scale-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-forest transition-all duration-300 origin-center ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-forest/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        ref={menuRef}
        className={`lg:hidden fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-cream z-50 shadow-2xl transition-transform duration-500 ease-out safe-area-top ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-cream-dark/50 hover:bg-cream-dark transition-colors duration-300 touch-target"
            aria-label="Fechar menu"
          >
            <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Logo no menu */}
        <div className="px-6 pb-8 border-b border-cream-dark">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 100 50" className="w-12 h-6 text-forest" fill="none">
              <path
                d="M50 25C50 17 43 10 33 10C23 10 15 17 15 25C15 33 23 40 33 40C43 40 50 33 50 25C50 33 57 40 67 40C77 40 85 33 85 25C85 17 77 10 67 10C57 10 50 17 50 25Z"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <div>
              <span className="font-serif text-xl font-semibold tracking-wide text-forest block leading-tight">Tina Ribéro</span>
              <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-gold">Assessoria & Eventos</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-6 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="menu-item font-sans text-lg tracking-wider text-forest hover:text-gold transition-colors duration-300 py-4 px-4 rounded-xl hover:bg-cream-dark/50 flex items-center justify-between group touch-target"
            >
              <span>{link.label}</span>
              <svg 
                className="w-5 h-5 text-gold opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </nav>

        {/* CTA no menu mobile */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-cream-dark bg-cream safe-area-bottom">
          <a
            href="#contato"
            onClick={(e) => scrollToSection(e, '#contato')}
            className="w-full flex items-center justify-center gap-2 bg-gold text-cream font-sans text-sm tracking-widest uppercase py-4 rounded-xl hover:bg-gold-dark transition-colors duration-300 touch-target"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Fale Conosco
          </a>
        </div>
      </div>
    </>
  )
}

export default Header
