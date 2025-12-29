import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../../utils/cn';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  className, 
  onClick, 
  type = 'button',
  ...props 
}, ref) => {
  const baseStyles = "group relative w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4 font-sans text-xs sm:text-sm tracking-widest uppercase overflow-hidden transition-all duration-500 touch-target cursor-pointer flex items-center justify-center";
  
  const variants = {
    primary: "bg-white text-mistick-black hover:shadow-2xl hover:shadow-white/20",
    outline: "border border-white/50 text-white hover:bg-white hover:text-mistick-black hover:border-white duration-300"
  };

  const shimmerStyles = variant === 'primary' 
    ? "bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000"
    : "bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700";

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], className)}
      style={variant === 'primary' ? {
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.1)'
      } : undefined}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2 sm:gap-3">
        {children}
      </span>

      {/* Hover fill effect for Primary */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-accent transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
      )}

      {/* Shimmer effect */}
      <div className={cn("absolute inset-0 -translate-x-full group-hover:translate-x-full", shimmerStyles)} />
    </button>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'outline']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;
