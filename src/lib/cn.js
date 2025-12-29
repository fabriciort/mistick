/**
 * @fileoverview Utility for merging Tailwind CSS classes conditionally
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 */

import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges class names with Tailwind CSS conflict resolution
 * @param {...(string|object|array)} inputs - Class names, objects, or arrays
 * @returns {string} Merged class string
 * @example
 * cn('px-4 py-2', isActive && 'bg-gold', 'px-8') // 'py-2 bg-gold px-8'
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
