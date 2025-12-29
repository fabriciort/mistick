import { MistickLogo, Divider } from '../../atoms'

/**
 * BrandSignature Molecule - Assinatura da marca para footer
 */
const BrandSignature = ({
  description,
  className = '',
}) => {
  return (
    <div className={`text-center ${className}`}>
      <div className="flex items-center justify-center mb-3 sm:mb-4">
        <div className="w-12 sm:w-16">
          <MistickLogo animated={false} />
        </div>
      </div>
      <h3 className="font-serif text-2xl sm:text-3xl tracking-wide mb-1 sm:mb-2 text-cream">
        Mistick
      </h3>
      <p className="font-sans text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase text-gold mb-4 sm:mb-6">
        by Daniele Ribeiro
      </p>
      {description && (
        <p className="font-sans text-sm sm:text-base text-cream/60 max-w-xs sm:max-w-md mx-auto px-4">
          {description}
        </p>
      )}
    </div>
  )
}

export default BrandSignature
