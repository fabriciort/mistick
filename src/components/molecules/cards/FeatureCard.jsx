/**
 * FeatureCard Molecule - Card de feature/característica
 */
const FeatureCard = ({
  icon,
  title,
  description,
  className = '',
}) => {
  return (
    <div
      className={`
        about-feature text-center p-3 sm:p-4 
        rounded-lg sm:rounded-xl bg-cream-dark/30 
        hover:bg-cream-dark/50 transition-colors duration-300
        ${className}
      `}
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-full bg-gold/10 flex items-center justify-center text-gold">
        {icon}
      </div>
      <h4 className="font-serif text-sm sm:text-base md:text-lg text-forest mb-0.5 sm:mb-1">
        {title}
      </h4>
      <p className="font-sans text-[10px] sm:text-xs md:text-sm text-forest-light leading-tight">
        {description}
      </p>
    </div>
  )
}

export default FeatureCard
