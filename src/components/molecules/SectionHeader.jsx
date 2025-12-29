import React from 'react'
import { AnimatedText } from '../atoms'

const SectionHeader = ({ subtitle, title, description, className = '' }) => {
  return (
    <div className={`text-center mb-10 sm:mb-12 md:mb-16 ${className}`}>
      {subtitle && (
        <AnimatedText
          as="span"
          animation="words"
          className="font-sans text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gold mb-3 sm:mb-4 block"
        >
          {subtitle}
        </AnimatedText>
      )}

      {title && (
        <AnimatedText
          as="h2"
          animation="words"
          stagger={0.04}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream mb-4 sm:mb-6"
        >
          {title}
        </AnimatedText>
      )}

      {description && (
        <AnimatedText
          as="p"
          animation="lines"
          className="font-sans text-base sm:text-lg text-cream/70 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto px-2"
        >
          {description}
        </AnimatedText>
      )}
    </div>
  )
}

export default SectionHeader
