/**
 * @fileoverview WhatsAppButton organism component
 * Floating WhatsApp contact button
 */

import { useEffect, useRef, useState, memo, useCallback } from 'react'
import gsap from 'gsap'
import { Icon } from '../../atoms'
import { cn } from '../../../lib/cn'
import { openWhatsApp } from '../../../utils/whatsapp'
import { DURATION, EASING } from '../../../styles/animation-theme'

/**
 * Floating WhatsApp button component
 */
const WhatsAppButton = () => {
  const buttonRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!buttonRef.current) return

    const ctx = gsap.context(() => {
      if (isVisible) {
        gsap.fromTo(buttonRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: DURATION.FAST, ease: EASING.BOUNCE }
        )

        // Show tooltip once after button appears (desktop only)
        if (!hasInteracted && window.innerWidth >= 768) {
          const timeout = setTimeout(() => {
            setShowTooltip(true)
            setTimeout(() => {
              setShowTooltip(false)
              setHasInteracted(true)
            }, 4000)
          }, 2000)

          return () => clearTimeout(timeout)
        }
      } else {
        gsap.to(buttonRef.current, {
          scale: 0,
          opacity: 0,
          duration: DURATION.FAST,
          ease: EASING.IN,
        })
      }
    }, buttonRef)

    return () => ctx.revert()
  }, [isVisible, hasInteracted])

  const handleClick = useCallback(() => {
    setShowTooltip(false)
    setHasInteracted(true)
    openWhatsApp('greeting')
  }, [])

  return (
    <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 md:right-8 z-50 safe-area-bottom">
      {/* Tooltip - desktop only */}
      <div
        className={cn(
          'hidden md:block absolute right-full mr-3 top-1/2 -translate-y-1/2',
          'whitespace-nowrap bg-forest text-cream px-4 py-2.5 rounded-lg text-sm font-sans shadow-xl',
          'transition-all duration-300',
          showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        )}
      >
        <span className="flex items-center gap-2">
          Fale conosco pelo WhatsApp!
          <span className="text-base">💬</span>
        </span>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
          <div className="border-8 border-transparent border-l-forest" />
        </div>
      </div>

      {/* Button */}
      <button
        ref={buttonRef}
        onClick={handleClick}
        onMouseEnter={() => !hasInteracted && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={cn(
          'group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white',
          'flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-[#25D366]/30',
          'transition-all duration-300 hover:scale-105 active:scale-95 touch-target'
        )}
        aria-label="Contato via WhatsApp"
        style={{ opacity: 0, transform: 'scale(0)' }}
      >
        <Icon name="whatsapp" size="lg" className="w-6 h-6 sm:w-7 sm:h-7" />

        {/* Pulse animation ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        
        {/* Subtle glow */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
      </button>
    </div>
  )
}

export default memo(WhatsAppButton)
