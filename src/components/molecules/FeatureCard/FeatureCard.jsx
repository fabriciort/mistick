/**
 * @fileoverview FeatureCard molecule component
 * Feature display card used in About section
 */

import { memo } from 'react'
import { IconWrapper } from '../../atoms/Icon'
import { cn } from '../../../lib/cn'

/**
 * Feature card for About section
 * @param {Object} props
 * @param {string} props.iconName - Icon identifier
 * @param {string} props.title - Feature title
 * @param {string} props.description - Feature description
 * @param {string} [props.className] - Additional classes
 */
const FeatureCard = ({
  iconName,
  title,
  description,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'about-feature text-center p-3 sm:p-4 rounded-lg sm:rounded-xl',
        'bg-cream-dark/30 hover:bg-cream-dark/50 transition-colors duration-300',
        className
      )}
      {...props}
    >
      <IconWrapper
        name={iconName}
        size="md"
        variant="default"
        className="mx-auto mb-2 sm:mb-3"
      />
      <h4 className="font-serif text-sm sm:text-base md:text-lg text-forest mb-0.5 sm:mb-1">
        {title}
      </h4>
      <p className="font-sans text-[10px] sm:text-xs md:text-sm text-forest-light leading-tight">
        {description}
      </p>
    </div>
  )
}

export default memo(FeatureCard)
