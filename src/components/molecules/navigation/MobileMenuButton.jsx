/**
 * MobileMenuButton Molecule - Botão hamburguer animado
 */
const MobileMenuButton = ({
  isOpen = false,
  isScrolled = false,
  onClick,
  className = '',
}) => {
  const lineColor = isScrolled ? 'bg-mistick-black' : 'bg-white'

  return (
    <button
      onClick={onClick}
      className={`
        lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 
        transition-colors duration-300 touch-target
        ${isScrolled ? 'hover:bg-cream-dark/50' : 'hover:bg-white/10'}
        ${className}
      `}
      aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
      aria-expanded={isOpen}
    >
      <span
        className={`w-5 h-0.5 transition-all duration-300 origin-center ${lineColor} ${
          isOpen ? 'rotate-45 translate-y-2' : ''
        }`}
      />
      <span
        className={`w-5 h-0.5 transition-all duration-300 ${lineColor} ${
          isOpen ? 'opacity-0 scale-0' : ''
        }`}
      />
      <span
        className={`w-5 h-0.5 transition-all duration-300 origin-center ${lineColor} ${
          isOpen ? '-rotate-45 -translate-y-2' : ''
        }`}
      />
    </button>
  )
}

export default MobileMenuButton
