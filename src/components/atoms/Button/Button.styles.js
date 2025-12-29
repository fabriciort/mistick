import { cn } from '../../../utils/cn'

export function getButtonClassName({ variant = 'solid', size = 'md', className } = {}) {
  return cn(
    'inline-flex items-center justify-center gap-2 font-sans tracking-widest uppercase touch-target transition-all',
    size === 'sm' && 'text-xs px-4 py-3',
    size === 'md' && 'text-xs sm:text-sm px-6 sm:px-8 md:px-10 py-3 sm:py-4',
    variant === 'solid' &&
      'bg-white text-mistick-black hover:shadow-2xl hover:shadow-white/20',
    variant === 'outline' &&
      'border border-white/50 text-white hover:bg-white hover:text-mistick-black hover:border-white',
    className
  )
}

