import { forwardRef } from 'react'

/**
 * TextArea Atom - Campo de texto multilinha padronizado
 */
const TextArea = forwardRef(({
  label,
  id,
  name,
  placeholder,
  value,
  onChange,
  rows = 3,
  required = false,
  disabled = false,
  error,
  className = '',
  ...props
}, ref) => {
  const textareaStyles = `
    w-full px-3 sm:px-4 py-2.5 sm:py-3 
    bg-cream-dark/50 border border-cream-dark rounded-lg 
    font-sans text-forest placeholder:text-forest/40 
    focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 
    transition-all duration-300 resize-none
    ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
    ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
  `

  return (
    <div className={className}>
      {label && (
        <label 
          htmlFor={id} 
          className="block font-sans text-xs sm:text-sm text-forest/70 mb-1.5 sm:mb-2"
        >
          {label} {required && <span className="text-gold">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        disabled={disabled}
        className={textareaStyles}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  )
})

TextArea.displayName = 'TextArea'

export default TextArea
