/**
 * @fileoverview SocialLink molecule component
 * Social media link with icon
 */

import { memo } from 'react'
import { Icon } from '../../atoms/Icon'
import { cn } from '../../../lib/cn'

/**
 * @typedef {'light' | 'dark'} SocialLinkVariant
 */

/**
 * Social media link with icon
 * @param {Object} props
 * @param {string} props.name - Social network name (maps to icon)
 * @param {string} props.url - Profile URL
 * @param {string} [props.ariaLabel] - Accessibility label
 * @param {SocialLinkVariant} [props.variant='dark'] - Visual variant
 * @param {string} [props.className] - Additional classes
 */
const SocialLink = ({
  name,
  url,
  ariaLabel,
  variant = 'dark',
  className,
  ...props
}) => {
  const variants = {
    dark: 'bg-cream/10 text-cream hover:bg-gold hover:text-forest',
    light: 'bg-forest text-cream hover:bg-gold',
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center',
        'transition-all duration-300 touch-target',
        variants[variant],
        className
      )}
      aria-label={ariaLabel || `Seguir no ${name}`}
      {...props}
    >
      <Icon name={name} size="sm" />
    </a>
  )
}

/**
 * Group of social links
 */
export const SocialLinkGroup = memo(({ 
  links, 
  variant = 'dark',
  className 
}) => (
  <div className={cn('flex gap-3 sm:gap-4', className)}>
    {links.map((link) => (
      <SocialLink
        key={link.name}
        name={link.name}
        url={link.url}
        ariaLabel={link.ariaLabel}
        variant={variant}
      />
    ))}
  </div>
))

SocialLinkGroup.displayName = 'SocialLinkGroup'

export default memo(SocialLink)
