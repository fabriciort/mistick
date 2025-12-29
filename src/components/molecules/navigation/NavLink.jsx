/**
 * NavLink Molecule - Link de navegação com efeito underline
 */
const NavLink = ({
  href,
  children,
  isScrolled = false,
  onClick,
  className = '',
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`
        relative font-sans text-xs md:text-sm tracking-widest uppercase 
        transition-colors duration-300 group py-2
        ${className}
      `}
      style={{ color: isScrolled ? '#1A1A1A' : '#FFFFFF' }}
    >
      {children}
      <span
        className="absolute -bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
        style={{ backgroundColor: isScrolled ? '#E59500' : '#FFFFFF' }}
      />
    </a>
  )
}

export default NavLink
