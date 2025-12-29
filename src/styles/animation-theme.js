/**
 * @fileoverview GSAP Animation Theme Configuration
 * Global animation constants for visual cohesion across the application
 */

/**
 * Easing functions using GSAP naming convention
 * @see https://greensock.com/docs/v3/Eases
 */
export const EASING = {
  /** Smooth deceleration - best for entrances */
  DEFAULT: 'power3.out',
  /** Symmetrical ease - good for hover states */
  SMOOTH: 'power2.inOut',
  /** Overshoot effect - for buttons/icons */
  BOUNCE: 'back.out(1.7)',
  /** Linear - for continuous animations */
  LINEAR: 'none',
  /** Strong deceleration - dramatic entrances */
  EXPO: 'expo.out',
  /** Smooth acceleration - for exits */
  IN: 'power3.in',
}

/**
 * Standard animation durations in seconds
 */
export const DURATION = {
  /** Micro interactions (buttons, icons) */
  INSTANT: 0.15,
  /** Quick transitions (hover states) */
  FAST: 0.3,
  /** Standard animations */
  NORMAL: 0.6,
  /** Entrance animations */
  MEDIUM: 0.8,
  /** Complex/dramatic animations */
  SLOW: 1.0,
  /** Hero/loading animations */
  EXTENDED: 1.5,
  /** Logo draw animations */
  DRAMATIC: 2.0,
}

/**
 * Stagger values for sequential animations
 */
export const STAGGER = {
  /** Fast sequence */
  FAST: 0.03,
  /** Default stagger */
  NORMAL: 0.05,
  /** Noticeable stagger */
  MEDIUM: 0.08,
  /** Dramatic sequence */
  SLOW: 0.1,
  /** Very slow reveal */
  DRAMATIC: 0.15,
}

/**
 * Common transform values
 */
export const TRANSFORM = {
  /** Small vertical offset */
  OFFSET_SM: 20,
  /** Medium vertical offset */
  OFFSET_MD: 40,
  /** Large vertical offset */
  OFFSET_LG: 60,
  /** Scale for entrance */
  SCALE_INITIAL: 0.8,
  /** Normal scale */
  SCALE_NORMAL: 1,
  /** Hover scale */
  SCALE_HOVER: 1.05,
}

/**
 * ScrollTrigger default configurations
 */
export const SCROLL_TRIGGER = {
  /** Start position relative to viewport */
  START: 'top 85%',
  /** End position */
  END: 'bottom 15%',
  /** Toggle actions for standard reveals */
  TOGGLE_ACTIONS: 'play none none reverse',
  /** Toggle for one-time animations */
  TOGGLE_ONCE: 'play none none none',
}

/**
 * Pre-configured animation presets
 */
export const ANIMATION_PRESETS = {
  fadeUp: {
    from: { opacity: 0, y: TRANSFORM.OFFSET_LG },
    to: { opacity: 1, y: 0, duration: DURATION.MEDIUM, ease: EASING.DEFAULT },
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1, duration: DURATION.NORMAL, ease: EASING.DEFAULT },
  },
  fadeLeft: {
    from: { opacity: 0, x: -TRANSFORM.OFFSET_LG },
    to: { opacity: 1, x: 0, duration: DURATION.MEDIUM, ease: EASING.DEFAULT },
  },
  fadeRight: {
    from: { opacity: 0, x: TRANSFORM.OFFSET_LG },
    to: { opacity: 1, x: 0, duration: DURATION.MEDIUM, ease: EASING.DEFAULT },
  },
  scaleUp: {
    from: { opacity: 0, scale: TRANSFORM.SCALE_INITIAL },
    to: { opacity: 1, scale: TRANSFORM.SCALE_NORMAL, duration: DURATION.MEDIUM, ease: EASING.BOUNCE },
  },
  slideDown: {
    from: { y: -100, opacity: 0 },
    to: { y: 0, opacity: 1, duration: DURATION.SLOW, ease: EASING.DEFAULT },
  },
}
