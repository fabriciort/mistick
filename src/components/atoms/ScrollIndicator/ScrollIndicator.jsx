import { forwardRef } from 'react';
import { cn } from '../../../utils/cn';

const ScrollIndicator = forwardRef(({ className }, ref) => {
  return (
    <div 
      ref={ref}
      className={cn("scroll-indicator absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/50 hidden sm:flex", className)}
    >
      <span className="text-[10px] sm:text-xs tracking-[0.15em] uppercase">Scroll</span>
      <div className="scroll-indicator-arrow">
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
});

ScrollIndicator.displayName = 'ScrollIndicator';

export default ScrollIndicator;
