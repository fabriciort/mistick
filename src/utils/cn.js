import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Tailwind-friendly className composer.
 * - clsx: conditional classes
 * - tailwind-merge: resolves conflicting Tailwind utilities
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

