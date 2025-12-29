/**
 * ScrollIndicator Atom - Indicador de scroll para seções hero
 */
const ScrollIndicator = ({ className = '' }) => {
  return (
    <div className={`scroll-indicator flex flex-col items-center gap-2 text-white/50 ${className}`}>
      <span className="text-[10px] sm:text-xs tracking-[0.15em] uppercase">Scroll</span>
      <div className="scroll-indicator-arrow">
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  )
}

export default ScrollIndicator
