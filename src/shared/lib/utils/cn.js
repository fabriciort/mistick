/**
 * Class Name Utility
 * 
 * Utility para combinar classes CSS de forma condicional.
 * Implementação simplificada inspirada em clsx.
 * 
 * @param {...(string|Object|Array|undefined|null|boolean)} inputs - Classes ou condicionais
 * @returns {string} Classes combinadas
 * 
 * @example
 * cn('base', condition && 'active', { 'hover:bg-red': isRed })
 * // => 'base active hover:bg-red'
 */
export function cn(...inputs) {
  const classes = []

  for (const input of inputs) {
    if (!input) continue

    if (typeof input === 'string') {
      classes.push(input)
    } else if (Array.isArray(input)) {
      const inner = cn(...input)
      if (inner) classes.push(inner)
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key)
      }
    }
  }

  return classes.join(' ')
}

export default cn
