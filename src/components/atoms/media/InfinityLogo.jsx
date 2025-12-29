import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * InfinityLogo Atom - Logo símbolo do infinito com animação
 */
const InfinityLogo = ({ 
  className = '', 
  animated = true, 
  size = 'md' 
}) => {
  const pathRef = useRef(null)

  const sizes = {
    sm: { width: 60, height: 30, strokeWidth: 2 },
    md: { width: 100, height: 50, strokeWidth: 2.5 },
    lg: { width: 150, height: 75, strokeWidth: 3 },
    xl: { width: 200, height: 100, strokeWidth: 3.5 },
  }

  const { width, height, strokeWidth } = sizes[size] || sizes.md

  useEffect(() => {
    if (!animated || !pathRef.current) return

    const path = pathRef.current
    const length = path.getTotalLength()

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    })

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2.5,
      ease: 'power2.inOut',
      delay: 0.5,
    })
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
        ref={pathRef}
        d="M50 25C50 17 43 10 33 10C23 10 15 17 15 25C15 33 23 40 33 40C43 40 50 33 50 25C50 33 57 40 67 40C77 40 85 33 85 25C85 17 77 10 67 10C57 10 50 17 50 25Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
        style={{ 
          filter: 'drop-shadow(0 2px 4px rgba(44, 62, 62, 0.1))'
        }}
      />
    </svg>
  )
}

export default InfinityLogo
