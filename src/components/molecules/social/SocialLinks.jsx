import { IconButton, SocialIcon } from '../../atoms'

/**
 * SocialLinks Molecule - Links de redes sociais
 */
const SocialLinks = ({
  links = [],
  variant = 'default',
  className = '',
}) => {
  return (
    <div className={`flex gap-3 sm:gap-4 ${className}`}>
      {links.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Seguir no ${social.name}`}
        >
          <IconButton variant={variant} size="md">
            <SocialIcon name={social.name} className="w-4 h-4 sm:w-5 sm:h-5" />
          </IconButton>
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
