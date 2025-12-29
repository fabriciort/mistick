import { useEffect, useRef } from 'react'
import { ANIMATION_THEME } from '../../../constants/animation-theme'
import { gsap, registerGsap } from '../../../lib/gsap/register-gsap'
import { INFINITY_LOGO_PATH, INFINITY_LOGO_SIZES } from './InfinityLogo.styles'

const InfinityLogo = ({ className = '', animated = true, size = 'md' }) => {
  const animatedPathRef = useRef(null)
  const { width, height, strokeWidth } = INFINITY_LOGO_SIZES[size] || INFINITY_LOGO_SIZES.md

  useEffect(() => {
    registerGsap()

    const path = animatedPathRef.current
    if (!animated || !path) return

    const length = path.getTotalLength()

    const ctx = gsap.context(() => {
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: ANIMATION_THEME.duration.xl,
        ease: 'power2.inOut',
        delay: 0.5,
      })
    }, path)

    return () => ctx.revert()
  }, [animated])

  return (
    <svg
      viewBox="0 0 100 50"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={INFINITY_LOGO_PATH}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
        ref={animatedPathRef}
        style={{
          filter: 'drop-shadow(0 2px 4px rgba(44, 62, 62, 0.1))',
        }}
      />
    </svg>
  )
}

export default InfinityLogo

