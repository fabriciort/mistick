/**
 * Desktop Navigation Component
 * 
 * Navegação horizontal para telas grandes.
 */
const DesktopNav = ({ links, isScrolled, onNavClick }) => {
  return (
    <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={(e) => onNavClick(e, link.href)}
          className="relative font-sans text-xs md:text-sm tracking-widest uppercase transition-colors duration-300 group py-2"
          style={{ color: isScrolled ? '#1A1A1A' : '#FFFFFF' }}
        >
          {link.label}
          <span
            className="absolute -bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
            style={{ backgroundColor: isScrolled ? '#E59500' : '#FFFFFF' }}
          />
        </a>
      ))}
    </nav>
  )
}

export default DesktopNav
