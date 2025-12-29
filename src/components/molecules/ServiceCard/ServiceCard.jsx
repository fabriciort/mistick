/**
 * @fileoverview ServiceCard molecule component
 * Service display card with icon, title, description and features
 */

import { forwardRef, memo } from 'react'
import { IconWrapper } from '../../atoms/Icon'
import { cn } from '../../../lib/cn'
import { CARD_STYLES } from '../../../styles/tailwind-classes'

/**
 * Service card component
 * @param {Object} props
 * @param {number} props.index - Card index for numbering
 * @param {string} props.iconName - Icon identifier
 * @param {string} props.title - Service title
 * @param {string} props.description - Service description
 * @param {string[]} props.features - Feature list
 * @param {Function} [props.onAction] - CTA click handler
 * @param {string} [props.actionLabel='Saiba Mais'] - CTA label
 * @param {string} [props.className] - Additional classes
 */
const ServiceCard = forwardRef(({
  index,
  iconName,
  title,
  description,
  features = [],
  onAction,
  actionLabel = 'Saiba Mais',
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        CARD_STYLES.base,
        CARD_STYLES.variants.dark,
        'group relative p-5 sm:p-6 md:p-8 hover:shadow-2xl hover:shadow-gold/5 hover-lift',
        className
      )}
      {...props}
    >
      {/* Decorative number */}
      <span className="absolute top-4 right-4 sm:top-6 sm:right-6 font-serif text-4xl sm:text-5xl md:text-6xl text-cream/5 group-hover:text-gold/10 transition-colors duration-500">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Icon */}
      <IconWrapper
        name={iconName}
        size="lg"
        variant="default"
        className="mb-4 sm:mb-5 md:mb-6 group-hover:bg-gold/20"
      />

      {/* Title */}
      <h3 className="font-serif text-xl sm:text-2xl text-cream mb-2 sm:mb-3 md:mb-4 group-hover:text-gold transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="font-sans text-sm sm:text-base text-cream/70 leading-relaxed mb-4 sm:mb-5 md:mb-6">
        {description}
      </p>

      {/* Features */}
      {features.length > 0 && (
        <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 md:mb-6">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-cream/60">
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gold flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      )}

      {/* Action button */}
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 font-sans text-xs sm:text-sm tracking-wider uppercase text-gold hover:text-gold-light transition-colors duration-300 group/btn touch-target"
        >
          <span>{actionLabel}</span>
          <svg
            className="w-4 h-4 transform transition-transform duration-300 group-hover/btn:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      )}
    </div>
  )
})

ServiceCard.displayName = 'ServiceCard'

export default memo(ServiceCard)
