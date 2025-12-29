import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const InfinityLogo = ({ className = '', animated = true, size = 'md' }) => {
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
        d="M25 25C25 14.5 18 8 10 8C4 8 0 14 0 25C0 36 4 42 10 42C18 42 25 35.5 25 25ZM25 25C25 35.5 32 42 40 42C48 42 55 35.5 55 25C55 14.5 48 8 40 8C32 8 25 14.5 25 25ZM55 25C55 14.5 62 8 70 8C78 8 85 14.5 85 25C85 35.5 78 42 70 42C62 42 55 35.5 55 25ZM85 25C85 35.5 92 42 100 42C106 42 100 36 100 25C100 14 106 8 100 8C92 8 85 14.5 85 25"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ 
          filter: 'drop-shadow(0 2px 4px rgba(44, 62, 62, 0.1))'
        }}
      />
      {/* Infinity symbol simplificado */}
      <path
        d="M50 25C50 17 43 10 33 10C23 10 15 17 15 25C15 33 23 40 33 40C43 40 50 33 50 25C50 33 57 40 67 40C77 40 85 33 85 25C85 17 77 10 67 10C57 10 50 17 50 25Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
        ref={pathRef}
      />
    </svg>
  )
}

export default InfinityLogo

