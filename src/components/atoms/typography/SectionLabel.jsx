import AnimatedText from './AnimatedText'

/**
 * SectionLabel Atom - Label superior de seções
 * Usado para identificar seções como "Sobre Nós", "Serviços", etc.
 */
const SectionLabel = ({ children, className = '', animated = true }) => {
  const baseStyles = 'font-sans text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gold mb-3 sm:mb-4 block'

  if (animated) {
    return (
      <AnimatedText
        as="span"
        animation="words"
        className={`${baseStyles} ${className}`}
      >
        {children}
      </AnimatedText>
    )
  }

  return (
    <span className={`${baseStyles} ${className}`}>
      {children}
    </span>
  )
}

export default SectionLabel
