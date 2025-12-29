/**
 * DecorativePattern Atom - Padrões SVG de fundo
 */
const DecorativePattern = ({ variant = 'dots', className = '' }) => {
  const patterns = {
    dots: (
      <svg className={`absolute inset-0 w-full h-full opacity-[0.02] ${className}`} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1" fill="currentColor" className="text-cream" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots-pattern)" />
      </svg>
    ),
    diamonds: (
      <svg className={`absolute inset-0 w-full h-full opacity-[0.02] ${className}`} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="diamonds-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M40 0L80 40L40 80L0 40Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cream" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diamonds-pattern)" />
      </svg>
    ),
    grid: (
      <svg className={`absolute inset-0 w-full h-full opacity-10 ${className}`} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="currentColor" className="text-cream" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    ),
  }

  return patterns[variant] || patterns.dots
}

export default DecorativePattern
