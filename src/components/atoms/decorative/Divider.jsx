/**
 * Divider Atom - Divisores decorativos para seções
 */
const Divider = ({ variant = 'default', className = '' }) => {
  const variants = {
    default: (
      <div className={`flex items-center justify-center gap-3 sm:gap-4 ${className}`}>
        <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent to-gold/50" />
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gold/50" />
        <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent to-gold/50" />
      </div>
    ),
    diamond: (
      <div className={`flex items-center justify-center gap-3 sm:gap-4 md:gap-5 ${className}`}>
        <div className="w-12 sm:w-20 md:w-28 lg:w-36 h-px bg-gradient-to-r from-transparent to-accent" />
        <div 
          className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent" 
          style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} 
        />
        <div className="w-12 sm:w-20 md:w-28 lg:w-36 h-px bg-gradient-to-l from-transparent to-accent" />
      </div>
    ),
    simple: (
      <div className={`flex justify-center ${className}`}>
        <div className="w-20 h-1 bg-gold rounded-full" />
      </div>
    ),
    line: (
      <div className={`border-t border-cream/10 ${className}`} />
    ),
  }

  return variants[variant] || variants.default
}

export default Divider
