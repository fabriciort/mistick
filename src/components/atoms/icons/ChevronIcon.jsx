/**
 * ChevronIcon Atom - Chevron para menus e dropdowns
 */
const ChevronIcon = ({ direction = 'down', className = 'w-5 h-5' }) => {
  const rotations = {
    up: 'rotate-180',
    right: 'rotate-[-90deg]',
    down: 'rotate-0',
    left: 'rotate-90',
  }

  return (
    <svg
      className={`${className} ${rotations[direction]} transition-transform duration-300`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

export default ChevronIcon
