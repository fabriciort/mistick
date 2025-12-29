import { forwardRef } from 'react'

/**
 * Button Atom - Componente base para todos os botões do sistema
 * Segue princípios de design system com variantes consistentes
 */
const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
  onClick,
  type = 'button',
  ...props
}, ref) => {
  const baseStyles = `
    group relative inline-flex items-center justify-center gap-2 
    font-sans tracking-widest uppercase transition-all duration-500 
    overflow-hidden touch-target disabled:opacity-70 disabled:cursor-not-allowed
  `

  const variants = {
    primary: `
      bg-white text-mistick-black hover:shadow-2xl hover:shadow-white/20
      [box-shadow:inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-1px_0_rgba(0,0,0,0.1)]
    `,
    secondary: `
      border border-white/50 text-white 
      hover:bg-white hover:text-mistick-black hover:border-white
    `,
    accent: `
      bg-gold text-cream hover:shadow-xl hover:shadow-gold/30
    `,
    ghost: `
      text-gold hover:text-gold-dark
    `,
    outline: `
      border-2 border-gold text-gold rounded-full
      hover:text-forest
    `,
    dark: `
      bg-mistick-black text-white hover:bg-accent
    `,
  }

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-xs sm:px-8 sm:py-4 sm:text-sm',
    lg: 'px-8 py-4 text-sm sm:px-10 sm:py-5',
  }

  const iconContent = icon && (
    <span className={`${loading ? 'opacity-0' : ''}`}>
      {icon}
    </span>
  )

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
        {iconPosition === 'left' && iconContent}
        {loading ? (
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          children
        )}
        {iconPosition === 'right' && iconContent}
      </span>

      {/* Hover fill effect for primary variant */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-accent transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
      )}

      {/* Hover fill effect for outline variant */}
      {variant === 'outline' && (
        <div className="absolute inset-0 bg-gold transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
      )}

      {/* Shimmer effect */}
      {(variant === 'primary' || variant === 'secondary') && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
