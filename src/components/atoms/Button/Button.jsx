/**
 * @fileoverview Button atom component
 * Core interactive element with multiple variants
 */

import { forwardRef, memo } from 'react'
import { cn } from '../../../lib/cn'
import { BUTTON_STYLES } from '../../../styles/tailwind-classes'

/**
 * @typedef {'primary' | 'secondary' | 'accent' | 'ghost' | 'outline'} ButtonVariant
 * @typedef {'sm' | 'md' | 'lg'} ButtonSize
 */

/**
 * Button component with multiple variants and sizes
 * @param {Object} props
 * @param {ButtonVariant} [props.variant='primary'] - Visual variant
 * @param {ButtonSize} [props.size='md'] - Size preset
 * @param {boolean} [props.fullWidth=false] - Full width button
 * @param {boolean} [props.isLoading=false] - Loading state
 * @param {boolean} [props.hasShimmer=false] - Enable shimmer effect
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.className] - Additional classes
 */
const Button = forwardRef(({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  hasShimmer = false,
  children,
  className,
  disabled,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(
        BUTTON_STYLES.base,
        BUTTON_STYLES.variants[variant],
        BUTTON_STYLES.sizes[size],
        fullWidth && 'w-full',
        (disabled || isLoading) && 'opacity-70 cursor-not-allowed',
        'relative overflow-hidden group',
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-inherit">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          children
        )}
      </span>
      
      {/* Hover fill effect for primary/secondary */}
      {(variant === 'primary' || variant === 'outline') && (
        <span className="absolute inset-0 bg-accent transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
      )}
      
      {/* Shimmer effect */}
      {hasShimmer && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}
    </button>
  )
})

Button.displayName = 'Button'

/**
 * Loading spinner for button loading state
 */
const LoadingSpinner = memo(() => (
  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle 
      className="opacity-25" 
      cx="12" cy="12" r="10" 
      stroke="currentColor" 
      strokeWidth="4" 
    />
    <path 
      className="opacity-75" 
      fill="currentColor" 
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
    />
  </svg>
))

LoadingSpinner.displayName = 'LoadingSpinner'

export default memo(Button)
