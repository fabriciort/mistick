import { cn } from '../../../utils/cn'

export function getAppShellClassName({ isLoading }) {
  return cn('transition-opacity duration-500', isLoading ? 'opacity-0' : 'opacity-100')
}

