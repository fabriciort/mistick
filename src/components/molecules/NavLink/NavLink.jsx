/**
 * @fileoverview NavLink molecule component
 * Navigation link with animated underline effect
 */

import { memo, useCallback } from 'react'
import { cn } from '../../../lib/cn'

/**
 * Navigation link with animated underline
 * @param {Object} props
 * @param {string} props.href - Link href
 * @param {string} props.label - Link label
 * @param {boolean} [props.isScrolled=false] - Header scroll state for styling
 * @param {Function} [props.onClick] - Click handler
 * @param {string} [props.className] - Additional classes
 */
const NavLink = ({
  href,
  label,
  isScrolled = false,
  onClick,
  className,
  ...props
}) => {
  const handleClick = useCallback((e) => {
    e.preventDefault()
    const section = document.querySelector(href)
    if (section) {
      const headerHeight = 80
      const elementPosition = section.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    onClick?.(e)
  }, [href, onClick])

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        'relative font-sans text-xs md:text-sm tracking-widest uppercase transition-colors duration-300 group py-2',
        className
      )}
      style={{ color: isScrolled ? '#1A1A1A' : '#FFFFFF' }}
      {...props}
    >
      {label}
      <span
        className="absolute -bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
        style={{ backgroundColor: isScrolled ? '#E59500' : '#FFFFFF' }}
      />
    </a>
  )
}

/**
 * Mobile navigation link variant
 */
export const NavLinkMobile = memo(({
  href,
  label,
  onClick,
  className,
  ...props
}) => {
  const handleClick = useCallback((e) => {
    e.preventDefault()
    const section = document.querySelector(href)
    if (section) {
      const headerHeight = 80
      const elementPosition = section.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    onClick?.(e)
  }, [href, onClick])

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        'menu-item font-sans text-base tracking-wider text-mistick-charcoal',
        'hover:text-accent transition-colors duration-300',
        'py-3 px-4 hover:bg-cream-dark/50 flex items-center justify-between group touch-target',
        className
      )}
      {...props}
    >
      <span>{label}</span>
      <svg
        className="w-4 h-4 text-accent opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
      </svg>
    </a>
  )
})

NavLinkMobile.displayName = 'NavLinkMobile'

export default memo(NavLink)
