import { CloseIcon, IconButton } from '../../atoms'

/**
 * StoryModal - Modal de detalhes da história
 */
const StoryModal = ({ story, onClose }) => {
  if (!story) return null

  const Icon = story.icon

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-forest/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl relative"
        onClick={e => e.stopPropagation()}
        style={{ viewTransitionName: 'story-card-container' }}
      >
        <IconButton
          onClick={onClose}
          variant="dark"
          className="absolute top-4 right-4 z-10 bg-white/50 backdrop-blur"
          aria-label="Fechar"
        >
          <CloseIcon className="w-6 h-6 text-forest" />
        </IconButton>

        {/* Image Section */}
        <div className="md:w-1/2 relative h-64 md:h-auto">
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover"
            style={{ viewTransitionName: `story-img-${story.id}` }}
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${story.color} mix-blend-overlay opacity-30`} />
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-cream/30">
          <div className="flex items-center gap-3 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className={`p-3 rounded-full bg-gradient-to-br ${story.color} bg-opacity-20`}>
              {Icon && <Icon size={24} className="text-gray-700" />}
            </div>
            <span className="text-sm font-bold uppercase tracking-widest text-gray-500">
              {story.category}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-serif text-forest mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {story.title}
          </h2>

          <p className="text-lg text-forest-light leading-relaxed mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {story.text}
          </p>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="h-1 w-20 bg-gold rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoryModal
