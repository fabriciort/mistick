/**
 * ArrowIcon Atom - Ícones de seta consistentes
 */
const ArrowIcon = ({ direction = 'right', className = 'w-5 h-5' }) => {
  const rotations = {
    up: 'rotate-[-90deg]',
    right: 'rotate-0',
    down: 'rotate-90',
    left: 'rotate-180',
  }

  return (
    <svg
      className={`${className} ${rotations[direction]} transition-transform duration-300`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  )
}

export default ArrowIcon
