import { forwardRef } from 'react'
import { ChevronIcon } from '../icons'

/**
 * Select Atom - Campo de seleção padronizado
 */
const Select = forwardRef(({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Selecione uma opção',
  required = false,
  disabled = false,
  error,
  className = '',
  ...props
}, ref) => {
  const selectStyles = `
    w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10
    bg-cream-dark/50 border border-cream-dark rounded-lg 
    font-sans text-forest 
    focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 
    transition-all duration-300 appearance-none cursor-pointer
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
      <div className="relative">
        <select
          ref={ref}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={selectStyles}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option 
              key={typeof option === 'string' ? option : option.value} 
              value={typeof option === 'string' ? option : option.value}
            >
              {typeof option === 'string' ? option : option.label}
            </option>
          ))}
        </select>
        <ChevronIcon 
          direction="down" 
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-forest/50 pointer-events-none" 
        />
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  )
})

Select.displayName = 'Select'

export default Select
