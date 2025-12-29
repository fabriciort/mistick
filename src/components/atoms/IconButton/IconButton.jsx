import { forwardRef, memo } from 'react'
import { getIconButtonClassName } from './IconButton.styles'

function IconButtonInner({ className, isScrolled, children, ...props }, ref) {
  return (
    <button ref={ref} className={getIconButtonClassName({ isScrolled, className })} {...props}>
      {children}
    </button>
  )
}

const IconButton = memo(forwardRef(IconButtonInner))
IconButton.displayName = 'IconButton'

export default IconButton

