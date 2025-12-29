import { forwardRef } from 'react'
import { cn } from '@shared/lib/utils/cn'

/**
 * Variantes de estilo do botão
 */
const variants = {
  primary: [
    'bg-white text-mistick-black',
    'hover:shadow-2xl hover:shadow-white/20',
    'group-hover:scale-x-100',
  ].join(' '),
  secondary: [
    'border border-white/50 text-white',
    'hover:bg-white hover:text-mistick-black hover:border-white',
  ].join(' '),
  accent: [
    'bg-gold text-cream',
    'hover:shadow-xl hover:shadow-gold/30',
  ].join(' '),
  ghost: [
    'text-gold hover:text-gold-dark',
    'bg-transparent',
  ].join(' '),
  outline: [
    'border-2 border-gold text-gold',
    'hover:text-forest',
    'rounded-full',
  ].join(' '),
}

/**
 * Tamanhos do botão
 */
const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-xs sm:text-sm',
  lg: 'px-8 sm:px-10 md:px-12 py-4 sm:py-5 text-sm sm:text-base',
}

/**
 * Button Component
 * 
 * Componente de botão reutilizável com variantes e animações.
 * 
 * @param {Object} props
 * @param {'primary'|'secondary'|'accent'|'ghost'|'outline'} props.variant
 * @param {'sm'|'md'|'lg'} props.size
 * @param {boolean} props.loading
 * @param {boolean} props.withHoverFill - Adiciona efeito de preenchimento no hover
 * @param {boolean} props.withShimmer - Adiciona efeito shimmer no hover
 * @param {string} props.className
 * @param {React.ReactNode} props.children
 */
const Button = forwardRef(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      withHoverFill = false,
      withShimmer = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          'relative group font-sans tracking-widest uppercase overflow-hidden',
          'transition-all duration-500',
          'touch-target',
          // Variant
          variants[variant],
          // Size
          sizes[size],
          // Loading state
          loading && 'opacity-70 cursor-not-allowed',
          // Custom classes
          className
        )}
        disabled={loading}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
          {loading ? <LoadingSpinner /> : children}
        </span>

        {/* Hover fill effect */}
        {withHoverFill && (
          <div className="absolute inset-0 bg-accent transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
        )}

        {/* Shimmer effect */}
        {withShimmer && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

/**
 * Loading Spinner
 */
const LoadingSpinner = () => (
  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)

export default Button
