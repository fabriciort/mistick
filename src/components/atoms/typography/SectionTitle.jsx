import AnimatedText from './AnimatedText'

/**
 * SectionTitle Atom - Título principal de seções
 * Design consistente para todos os títulos de seção
 */
const SectionTitle = ({ 
  children, 
  className = '', 
  variant = 'dark',
  animated = true,
  as = 'h2'
}) => {
  const variants = {
    dark: 'text-forest',
    light: 'text-cream',
    white: 'text-white',
  }

  const baseStyles = `font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 ${variants[variant]}`

  if (animated) {
    return (
      <AnimatedText
        as={as}
        animation="words"
        stagger={0.04}
        className={`${baseStyles} ${className}`}
      >
        {children}
      </AnimatedText>
    )
  }

  const Component = as
  return (
    <Component className={`${baseStyles} ${className}`}>
      {children}
    </Component>
  )
}

export default SectionTitle
