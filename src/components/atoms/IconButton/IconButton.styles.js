import { cn } from '../../../utils/cn'

export function getIconButtonClassName({ isScrolled, className } = {}) {
  return cn(
    'w-10 h-10 flex flex-col items-center justify-center gap-1.5 transition-colors duration-300 touch-target',
    isScrolled ? 'hover:bg-cream-dark/50' : 'hover:bg-white/10',
    className
  )
}

