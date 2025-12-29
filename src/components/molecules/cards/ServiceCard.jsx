import { forwardRef } from 'react'
import { ArrowIcon } from '../../atoms'

/**
 * ServiceCard Molecule - Card de serviço com ícone e features
 */
const ServiceCard = forwardRef(({
  index = 0,
  icon,
  title,
  description,
  features = [],
  onAction,
  actionLabel = 'Saiba Mais',
  className = '',
}, ref) => {
  return (
    <div
      ref={ref}
      className={`
        group relative bg-forest-light/20 sm:bg-forest-light/30 
        backdrop-blur-sm border border-cream/10 rounded-xl sm:rounded-2xl 
        p-5 sm:p-6 md:p-8 hover:border-gold/30 
        transition-all duration-500 hover:shadow-2xl hover:shadow-gold/5 hover-lift
        ${className}
      `}
    >
      {/* Número decorativo */}
      <span className="absolute top-4 right-4 sm:top-6 sm:right-6 font-serif text-4xl sm:text-5xl md:text-6xl text-cream/5 group-hover:text-gold/10 transition-colors duration-500">
        0{index + 1}
      </span>

      {/* Ícone */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-4 sm:mb-5 md:mb-6 group-hover:bg-gold/20 transition-colors duration-300">
        {icon}
      </div>

      {/* Título */}
      <h3 className="font-serif text-xl sm:text-2xl text-cream mb-2 sm:mb-3 md:mb-4 group-hover:text-gold transition-colors duration-300">
        {title}
      </h3>

      {/* Descrição */}
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

      {/* Action Link */}
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 font-sans text-xs sm:text-sm tracking-wider uppercase text-gold hover:text-gold-light transition-colors duration-300 group/btn touch-target"
        >
          <span>{actionLabel}</span>
          <ArrowIcon 
            direction="right" 
            className="w-4 h-4 transform transition-transform duration-300 group-hover/btn:translate-x-1" 
          />
        </button>
      )}
    </div>
  )
})

ServiceCard.displayName = 'ServiceCard'

export default ServiceCard
