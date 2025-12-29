/**
 * Animation Presets
 * 
 * Presets de animação reutilizáveis para manter consistência visual
 * e reduzir duplicação de código em toda a aplicação.
 */

// ============================================
// FADE ANIMATIONS
// ============================================

export const fadeIn = {
  from: { opacity: 0 },
  to: { opacity: 1 },
  duration: 0.6,
}

export const fadeInUp = {
  from: { opacity: 0, y: 60 },
  to: { opacity: 1, y: 0 },
  duration: 0.8,
}

export const fadeInDown = {
  from: { opacity: 0, y: -60 },
  to: { opacity: 1, y: 0 },
  duration: 0.8,
}

export const fadeInLeft = {
  from: { opacity: 0, x: -60 },
  to: { opacity: 1, x: 0 },
  duration: 0.8,
}

export const fadeInRight = {
  from: { opacity: 0, x: 60 },
  to: { opacity: 1, x: 0 },
  duration: 0.8,
}

// ============================================
// SCALE ANIMATIONS
// ============================================

export const scaleIn = {
  from: { opacity: 0, scale: 0.8 },
  to: { opacity: 1, scale: 1 },
  duration: 0.6,
}

export const scaleInBounce = {
  from: { opacity: 0, scale: 0 },
  to: { opacity: 1, scale: 1 },
  duration: 0.4,
  ease: 'back.out(1.7)',
}

// ============================================
// STAGGER ANIMATIONS
// ============================================

export const staggerFadeUp = {
  from: { opacity: 0, y: 30 },
  to: { opacity: 1, y: 0 },
  duration: 0.6,
  stagger: 0.1,
}

export const staggerFadeIn = {
  from: { opacity: 0 },
  to: { opacity: 1 },
  duration: 0.5,
  stagger: 0.08,
}

export const staggerScale = {
  from: { opacity: 0, scale: 0.9 },
  to: { opacity: 1, scale: 1 },
  duration: 0.5,
  stagger: 0.1,
}

// ============================================
// TEXT ANIMATIONS
// ============================================

export const textRevealWords = {
  from: { y: 60, opacity: 0 },
  to: { y: 0, opacity: 1 },
  duration: 0.8,
  stagger: 0.05,
}

export const textRevealChars = {
  from: { y: 60, opacity: 0 },
  to: { y: 0, opacity: 1 },
  duration: 0.8,
  stagger: 0.04,
}

export const textRevealLines = {
  from: { y: 40, opacity: 0 },
  to: { y: 0, opacity: 1 },
  duration: 0.8,
}

// ============================================
// HEADER/NAV ANIMATIONS
// ============================================

export const headerSlideDown = {
  from: { y: -100, opacity: 0 },
  to: { y: 0, opacity: 1 },
  duration: 1,
  ease: 'power3.out',
}

export const menuItemReveal = {
  from: { x: -20, opacity: 0 },
  to: { x: 0, opacity: 1 },
  duration: 0.3,
  stagger: 0.05,
  ease: 'power2.out',
}

// ============================================
// SCROLL INDICATOR
// ============================================

export const scrollIndicatorBounce = {
  y: 8,
  duration: 1,
  repeat: -1,
  yoyo: true,
  ease: 'power1.inOut',
}

// ============================================
// DECORATIVE ANIMATIONS
// ============================================

export const rotateForever = {
  rotation: 360,
  duration: 60,
  repeat: -1,
  ease: 'none',
}

// ============================================
// LOADER ANIMATIONS
// ============================================

export const loaderDraw = {
  strokeDashoffset: 0,
  duration: 2,
  ease: 'power2.inOut',
  stagger: 0.15,
}

export const loaderFadeOut = {
  opacity: 0,
  duration: 0.5,
  ease: 'power3.out',
}

// ============================================
// DEFAULTS FOR SCROLL TRIGGER
// ============================================

export const defaultScrollTrigger = {
  start: 'top 85%',
  toggleActions: 'play none none reverse',
}

export const scrollTriggerOnce = {
  start: 'top 85%',
  toggleActions: 'play none none none',
}
