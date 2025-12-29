import { MistickLogo } from '../../atoms'

/**
 * BrandLogo Molecule - Logo da marca com nome
 */
const BrandLogo = ({
  isScrolled = false,
  onClick,
  size = 'md',
  className = '',
}) => {
  const sizes = {
    sm: {
      logo: 'w-8 sm:w-10',
      name: 'text-base sm:text-lg',
      subtitle: 'text-[7px] sm:text-[8px]',
    },
    md: {
      logo: 'w-10 sm:w-12 md:w-14',
      name: 'text-base sm:text-lg md:text-xl',
      subtitle: 'text-[7px] sm:text-[8px] md:text-[9px]',
    },
    lg: {
      logo: 'w-12 sm:w-16',
      name: 'text-2xl sm:text-3xl',
      subtitle: 'text-xs sm:text-sm',
    },
  }

  const currentSize = sizes[size]

  return (
    <a
      href="#inicio"
      onClick={onClick}
      className={`flex items-center gap-2 sm:gap-3 group touch-target ${className}`}
    >
      <div className={currentSize.logo}>
        <MistickLogo animated={false} />
      </div>
      <div className="flex flex-col">
        <span className={`font-serif ${currentSize.name} font-medium tracking-wide leading-none transition-colors duration-300 ${
          isScrolled ? 'text-mistick-black' : 'text-white'
        }`}>
          Mistick
        </span>
        <span className={`font-sans ${currentSize.subtitle} tracking-[0.15em] uppercase leading-tight mt-0.5 transition-colors duration-300 ${
          isScrolled ? 'text-accent' : 'text-accent-light'
        }`}>
          by Daniele Ribeiro
        </span>
      </div>
    </a>
  )
}

export default BrandLogo
