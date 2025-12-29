import { ChevronIcon } from '../../atoms'

/**
 * MobileNavLink Molecule - Link de navegação para menu mobile
 */
const MobileNavLink = ({
  href,
  children,
  onClick,
  className = '',
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`
        menu-item font-sans text-base tracking-wider text-mistick-charcoal 
        hover:text-accent transition-colors duration-300 
        py-3 px-4 hover:bg-cream-dark/50 
        flex items-center justify-between group touch-target
        ${className}
      `}
    >
      <span>{children}</span>
      <ChevronIcon
        direction="right"
        className="w-4 h-4 text-accent opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
      />
    </a>
  )
}

export default MobileNavLink
