/**
 * @fileoverview ContactCard molecule component
 * Contact information card with icon and action
 */

import { memo } from 'react'
import { IconWrapper, Icon } from '../../atoms/Icon'
import { cn } from '../../../lib/cn'
import { CARD_STYLES } from '../../../styles/tailwind-classes'
import { openWhatsApp } from '../../../utils/whatsapp'

/**
 * Contact card component
 * @param {Object} props
 * @param {string} props.iconName - Icon identifier
 * @param {string} props.title - Contact method title
 * @param {string} props.value - Contact value
 * @param {string} props.actionLabel - Action button label
 * @param {'whatsapp' | 'email' | 'none'} [props.actionType='none'] - Action type
 * @param {string} [props.className] - Additional classes
 */
const ContactCard = ({
  iconName,
  title,
  value,
  actionLabel,
  actionType = 'none',
  className,
  ...props
}) => {
  const handleAction = () => {
    switch (actionType) {
      case 'whatsapp':
        openWhatsApp('greeting')
        break
      case 'email':
        window.location.href = `mailto:${value}`
        break
      default:
        break
    }
  }

  return (
    <div
      className={cn(
        'contact-card group',
        CARD_STYLES.base,
        CARD_STYLES.variants.elevated,
        'p-4 sm:p-5 md:p-6',
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <IconWrapper
          name={iconName}
          size="md"
          variant="default"
          className="group-hover:bg-gold/20 flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-sans text-xs sm:text-sm tracking-wider uppercase text-forest/60 mb-0.5 sm:mb-1">
            {title}
          </h4>
          <p className="font-serif text-lg sm:text-xl text-forest mb-1 sm:mb-2 truncate">
            {value}
          </p>
          {actionType !== 'none' ? (
            <button
              onClick={handleAction}
              className="font-sans text-xs sm:text-sm text-gold hover:text-gold-dark transition-colors duration-300 flex items-center gap-1.5 sm:gap-2 touch-target"
            >
              {actionLabel}
              <Icon name="arrowRight" size="sm" />
            </button>
          ) : (
            <span className="font-sans text-xs sm:text-sm text-forest/50">
              {actionLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(ContactCard)
