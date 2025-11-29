import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Header = () => {
  const headerRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
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
      section.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <a
          href="#inicio"
          onClick={(e) => scrollToSection(e, '#inicio')}
          className="flex items-center gap-3 group"
        >
          <svg
            viewBox="0 0 100 50"
            className="w-12 h-6 text-forest transition-transform duration-300 group-hover:scale-110"
            fill="none"
          >
            <path
              d="M50 25C50 17 43 10 33 10C23 10 15 17 15 25C15 33 23 40 33 40C43 40 50 33 50 25C50 33 57 40 67 40C77 40 85 33 85 25C85 17 77 10 67 10C57 10 50 17 50 25Z"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="font-serif text-2xl font-semibold tracking-wide text-forest">
            MISTICK
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="relative font-sans text-sm tracking-widest uppercase text-forest hover:text-gold transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
          aria-label="Menu"
        >
          <span
            className={`w-6 h-0.5 bg-forest transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-forest transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-forest transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-cream/98 backdrop-blur-md shadow-lg transition-all duration-500 overflow-hidden ${
          isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container-custom py-6 flex flex-col gap-4">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="font-sans text-lg tracking-wider text-forest hover:text-gold transition-colors duration-300 py-2 border-b border-cream-dark"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header

