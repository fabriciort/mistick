/**
 * @fileoverview Tailwind CSS class constants
 * Single source of truth for complex utility combinations
 */

/**
 * Button style variants
 */
export const BUTTON_STYLES = {
  base: 'inline-flex items-center justify-center font-sans tracking-widest uppercase transition-all duration-300 touch-target',
  
  variants: {
    primary: 'bg-white text-mistick-black hover:bg-accent',
    secondary: 'border border-white/50 text-white hover:bg-white hover:text-mistick-black hover:border-white',
    accent: 'bg-gold text-cream hover:bg-gold-dark',
    ghost: 'text-gold hover:text-gold-dark',
    outline: 'border-2 border-gold text-gold hover:text-forest hover:bg-gold',
  },
  
  sizes: {
    sm: 'px-4 py-2 text-xs gap-2',
    md: 'px-6 py-3 text-xs sm:text-sm gap-2 sm:gap-3',
    lg: 'px-8 py-4 text-sm gap-3',
  },
}

/**
 * Input field styles
 */
export const INPUT_STYLES = {
  base: 'w-full bg-cream-dark/50 border border-cream-dark rounded-lg font-sans text-forest placeholder:text-forest/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300',
  sizes: {
    sm: 'px-3 py-2 text-sm',
    md: 'px-3 sm:px-4 py-2.5 sm:py-3',
    lg: 'px-4 py-4 text-lg',
  },
}

/**
 * Card styles
 */
export const CARD_STYLES = {
  base: 'rounded-xl sm:rounded-2xl transition-all duration-300',
  variants: {
    elevated: 'bg-cream shadow-lg sm:shadow-xl border border-cream-dark hover:border-gold/30 hover:shadow-xl',
    flat: 'bg-cream-dark/30 hover:bg-cream-dark/50',
    dark: 'bg-forest-light/20 sm:bg-forest-light/30 backdrop-blur-sm border border-cream/10 hover:border-gold/30',
  },
}

/**
 * Section spacing
 */
export const SECTION_STYLES = {
  padding: 'py-16 sm:py-20 md:py-24 lg:py-32',
  paddingSmall: 'py-12 sm:py-16',
}

/**
 * Typography presets
 */
export const TYPOGRAPHY_STYLES = {
  // Headings
  h1: 'font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-wider',
  h2: 'font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
  h3: 'font-serif text-xl sm:text-2xl',
  h4: 'font-serif text-lg sm:text-xl',
  
  // Body
  body: 'font-sans text-base sm:text-lg leading-relaxed',
  bodySmall: 'font-sans text-sm sm:text-base',
  
  // Labels
  label: 'font-sans text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase',
  caption: 'font-sans text-xs sm:text-sm',
}

/**
 * Container styles
 */
export const CONTAINER_STYLES = {
  default: 'container-custom',
  narrow: 'max-w-3xl mx-auto px-4 sm:px-6',
  wide: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
}

/**
 * Icon wrapper styles
 */
export const ICON_WRAPPER_STYLES = {
  base: 'flex items-center justify-center',
  rounded: 'rounded-full',
  sizes: {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-12 sm:h-12',
    lg: 'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16',
  },
}
