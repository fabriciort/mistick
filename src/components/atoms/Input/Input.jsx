/**
 * @fileoverview Input atom component
 * Form input elements with consistent styling
 */

import { forwardRef, memo } from 'react'
import { cn } from '../../../lib/cn'
import { INPUT_STYLES } from '../../../styles/tailwind-classes'

/**
 * Base input component
 * @param {Object} props
 * @param {string} [props.size='md'] - Input size
 * @param {boolean} [props.error=false] - Error state
 * @param {string} [props.className] - Additional classes
 */
const Input = forwardRef(({
  size = 'md',
  error = false,
  className,
  ...props
}, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        INPUT_STYLES.base,
        INPUT_STYLES.sizes[size],
        error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
        className
      )}
      {...props}
    />
  )
})

Input.displayName = 'Input'

/**
 * Textarea component with consistent styling
 */
export const TextArea = forwardRef(({
  size = 'md',
  error = false,
  className,
  rows = 3,
  ...props
}, ref) => {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        INPUT_STYLES.base,
        INPUT_STYLES.sizes[size],
        'resize-none',
        error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
        className
      )}
      {...props}
    />
  )
})

TextArea.displayName = 'TextArea'

/**
 * Select component with consistent styling
 */
export const Select = forwardRef(({
  size = 'md',
  error = false,
  className,
  children,
  placeholder,
  ...props
}, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          INPUT_STYLES.base,
          INPUT_STYLES.sizes[size],
          'appearance-none cursor-pointer pr-10',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
          className
        )}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>
      <svg 
        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-forest/50 pointer-events-none" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  )
})

Select.displayName = 'Select'

/**
 * Label component for form fields
 */
export const Label = memo(({ 
  htmlFor, 
  required = false, 
  children, 
  className,
  ...props 
}) => (
  <label
    htmlFor={htmlFor}
    className={cn(
      'block font-sans text-xs sm:text-sm text-forest/70 mb-1.5 sm:mb-2',
      className
    )}
    {...props}
  >
    {children}
    {required && <span className="text-red-500 ml-0.5">*</span>}
  </label>
))

Label.displayName = 'Label'

export default memo(Input)
