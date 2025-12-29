import { memo } from 'react'
import { getButtonClassName } from './Button.styles'

function Button({ className, variant, size, ...props }) {
  return <button className={getButtonClassName({ variant, size, className })} {...props} />
}

export default memo(Button)

