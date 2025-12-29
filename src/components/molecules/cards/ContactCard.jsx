import { ArrowIcon } from '../../atoms'

/**
 * ContactCard Molecule - Card de informação de contato
 */
const ContactCard = ({
  icon,
  title,
  value,
  action,
  actionLabel,
  className = '',
}) => {
  return (
    <div
      className={`
        contact-card group bg-cream rounded-lg sm:rounded-xl 
        p-4 sm:p-5 md:p-6 border border-cream-dark 
        hover:border-gold/30 hover:shadow-lg 
        transition-all duration-300
        ${className}
      `}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold flex-shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-sans text-xs sm:text-sm tracking-wider uppercase text-forest/60 mb-0.5 sm:mb-1">
            {title}
          </h4>
          <p className="font-serif text-lg sm:text-xl text-forest mb-1 sm:mb-2 truncate">
            {value}
          </p>
          {action ? (
            <button
              onClick={action}
              className="font-sans text-xs sm:text-sm text-gold hover:text-gold-dark transition-colors duration-300 flex items-center gap-1.5 sm:gap-2 touch-target"
            >
              {actionLabel}
              <ArrowIcon direction="right" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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

export default ContactCard
