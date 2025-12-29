/**
 * @fileoverview FormField molecule component
 * Combines Label with Input/Select/TextArea for consistent form fields
 */

import { forwardRef, memo } from 'react'
import { Input, TextArea, Select, Label } from '../../atoms/Input'
import { cn } from '../../../lib/cn'

/**
 * Form field combining label and input
 * @param {Object} props
 * @param {string} props.label - Field label
 * @param {string} props.name - Field name
 * @param {'text' | 'email' | 'tel' | 'textarea' | 'select'} [props.type='text'] - Field type
 * @param {boolean} [props.required=false] - Required field
 * @param {string} [props.error] - Error message
 * @param {Array} [props.options] - Options for select type
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.className] - Container classes
 */
const FormField = forwardRef(({
  label,
  name,
  type = 'text',
  required = false,
  error,
  options = [],
  placeholder,
  className,
  rows,
  ...props
}, ref) => {
  const renderInput = () => {
    const commonProps = {
      ref,
      id: name,
      name,
      placeholder,
      error: !!error,
      ...props
    }

    if (type === 'textarea') {
      return <TextArea {...commonProps} rows={rows} />
    }

    if (type === 'select') {
      return (
        <Select {...commonProps} placeholder={placeholder}>
          {options.map((option) => (
            <option key={option.value || option} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </Select>
      )
    }

    return <Input {...commonProps} type={type} />
  }

  return (
    <div className={cn('space-y-1', className)}>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      {renderInput()}
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  )
})

FormField.displayName = 'FormField'

export default memo(FormField)
