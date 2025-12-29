import { forwardRef } from 'react';
import { cn } from '../../../utils/cn';

const Divider = forwardRef(({ className }, ref) => {
  return (
    <div 
      ref={ref}
      className={cn("flex items-center justify-center gap-3 sm:gap-4 md:gap-5 mb-8 sm:mb-10 md:mb-12", className)}
    >
      <div className="w-12 sm:w-20 md:w-28 lg:w-36 h-px bg-gradient-to-r from-transparent to-accent" />
      <div 
        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent" 
        style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} 
      />
      <div className="w-12 sm:w-20 md:w-28 lg:w-36 h-px bg-gradient-to-l from-transparent to-accent" />
    </div>
  );
});

Divider.displayName = 'Divider';

export default Divider;
