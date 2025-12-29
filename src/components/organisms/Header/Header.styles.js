import { cn } from '../../../utils/cn'

export function getHeaderClassName({ isScrolled }) {
  return cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out safe-area-top',
    isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3 md:py-4' : 'bg-transparent py-4 md:py-6'
  )
}

export function getBrandNameClassName({ isScrolled }) {
  return cn(
    'font-serif text-base sm:text-lg md:text-xl font-medium tracking-wide leading-none transition-colors duration-300',
    isScrolled ? 'text-mistick-black' : 'text-white'
  )
}

export function getBrandSubtitleClassName({ isScrolled }) {
  return cn(
    'font-sans text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.15em] uppercase leading-tight mt-0.5 transition-colors duration-300',
    isScrolled ? 'text-accent' : 'text-accent-light'
  )
}

export function getDesktopNavLinkClassName({ isScrolled }) {
  return cn(
    'relative font-sans text-xs md:text-sm tracking-widest uppercase transition-colors duration-300 group py-2',
    isScrolled ? 'text-mistick-charcoal' : 'text-white'
  )
}

export function getDesktopNavUnderlineClassName({ isScrolled }) {
  return cn(
    'absolute -bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full',
    isScrolled ? 'bg-accent' : 'bg-white'
  )
}

export function getMobileOverlayClassName({ isMenuOpen }) {
  return cn(
    'lg:hidden fixed inset-0 bg-mistick-black/60 backdrop-blur-sm z-40 transition-opacity duration-300',
    isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
  )
}

export function getMobilePanelClassName({ isMenuOpen }) {
  return cn(
    'lg:hidden fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-white z-50 shadow-2xl transition-transform duration-500 ease-out safe-area-top',
    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
  )
}

export function getHamburgerLineClassName({ isScrolled, isMenuOpen, position }) {
  const base = cn('w-5 h-0.5 transition-all duration-300', isScrolled ? 'bg-mistick-black' : 'bg-white')

  if (position === 'top') return cn(base, 'origin-center', isMenuOpen && 'rotate-45 translate-y-2')
  if (position === 'middle') return cn(base, isMenuOpen && 'opacity-0 scale-0')
  return cn(base, 'origin-center', isMenuOpen && '-rotate-45 -translate-y-2')
}

