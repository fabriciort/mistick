/**
 * @fileoverview Typography atom component
 * Provides consistent text styling across the application
 */

import { memo } from 'react'
import { cn } from '../../../lib/cn'
import { TYPOGRAPHY_STYLES } from '../../../styles/tailwind-classes'

/**
 * @typedef {'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodySmall' | 'label' | 'caption'} TypographyVariant
 */

/**
 * Typography component for consistent text styling
 * @param {Object} props
 * @param {TypographyVariant} [props.variant='body'] - Typography variant
 * @param {string} [props.as] - HTML element to render
 * @param {string} [props.color] - Text color class
 * @param {boolean} [props.italic=false] - Italic style
 * @param {React.ReactNode} props.children - Text content
 * @param {string} [props.className] - Additional classes
 */
const Typography = ({
  variant = 'body',
  as,
  color,
  italic = false,
  children,
  className,
  ...props
}) => {
  // Default element mapping
  const elementMap = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    body: 'p',
    bodySmall: 'p',
    label: 'span',
    caption: 'span',
  }

  const Component = as || elementMap[variant] || 'span'

  return (
    <Component
      className={cn(
        TYPOGRAPHY_STYLES[variant],
        color,
        italic && 'italic',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

/**
 * Pre-styled heading component
 */
export const Heading = memo(({ level = 2, children, className, ...props }) => (
  <Typography
    variant={`h${level}`}
    as={`h${level}`}
    className={className}
    {...props}
  >
    {children}
  </Typography>
))

Heading.displayName = 'Heading'

/**
 * Section label component (small caps)
 */
export const SectionLabel = memo(({ children, className, ...props }) => (
  <Typography
    variant="label"
    className={cn('text-gold mb-3 sm:mb-4 block', className)}
    {...props}
  >
    {children}
  </Typography>
))

SectionLabel.displayName = 'SectionLabel'

export default memo(Typography)
