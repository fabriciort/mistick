import AnimatedText from './AnimatedText'

/**
 * SectionDescription Atom - Descrição/parágrafo de seções
 */
const SectionDescription = ({ 
  children, 
  className = '', 
  variant = 'dark',
  animated = true,
  maxWidth = 'max-w-2xl'
}) => {
  const variants = {
    dark: 'text-forest-light',
    light: 'text-cream/70',
    muted: 'text-forest/60',
  }

  const baseStyles = `font-sans text-base sm:text-lg leading-relaxed ${variants[variant]} ${maxWidth} mx-auto px-2`

  if (animated) {
    return (
      <AnimatedText
        as="p"
        animation="lines"
        className={`${baseStyles} ${className}`}
      >
        {children}
      </AnimatedText>
    )
  }

  return (
    <p className={`${baseStyles} ${className}`}>
      {children}
    </p>
  )
}

export default SectionDescription
