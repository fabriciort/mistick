import { forwardRef } from 'react'

/**
 * IconButton Atom - Botão circular para ícones
 * Usado para ações rápidas como redes sociais, fechar modal, etc.
 */
const IconButton = forwardRef(({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  'aria-label': ariaLabel,
  onClick,
  ...props
}, ref) => {
  const baseStyles = `
    flex items-center justify-center rounded-full 
    transition-all duration-300 touch-target
  `

  const variants = {
    default: 'bg-cream/10 text-cream hover:bg-gold hover:text-forest',
    light: 'bg-forest text-cream hover:bg-gold',
    dark: 'bg-cream-dark/50 hover:bg-cream-dark',
    ghost: 'hover:bg-white/10',
    accent: 'bg-gold text-cream hover:bg-gold-dark',
    whatsapp: 'bg-[#25D366] text-white hover:shadow-xl hover:shadow-[#25D366]/30 hover:scale-105 active:scale-95',
  }

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-11 h-11 sm:w-12 sm:h-12',
    xl: 'w-12 h-12 sm:w-14 sm:h-14',
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
})

IconButton.displayName = 'IconButton'

export default IconButton
