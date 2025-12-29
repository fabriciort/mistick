/**
 * @fileoverview Story organism component
 * Story gallery section with modal detail view
 */

import { useState, memo, useCallback } from 'react'
import { flushSync } from 'react-dom'
import { Heart, Star, Sparkles, User, Camera, X } from 'lucide-react'
import { cn } from '../../../lib/cn'
import { SECTION_STYLES } from '../../../styles/tailwind-classes'

// Import images
import imgProfessional from '../../../assets/images/story/portrait-professional.jpg'
import imgCasual from '../../../assets/images/story/portrait-casual.jpg'
import imgDedication from '../../../assets/images/story/dedication-bride-dress.jpg'
import imgDecor from '../../../assets/images/story/event-decor-selfie.jpg'
import imgCouple from '../../../assets/images/story/wedding-couple-client.jpg'

const STORIES = [
  {
    id: 1,
    title: "Uma Visão de Excelência",
    category: "Profissionalismo",
    text: "Não é apenas sobre organizar eventos, é sobre orquestrar sonhos. Minha missão é trazer tranquilidade e perfeição para cada segundo do seu grande dia.",
    image: imgProfessional,
    icon: Star,
    color: "from-amber-200 to-amber-100"
  },
  {
    id: 2,
    title: "Em Cada Detalhe",
    category: "Dedicação",
    text: "Estar presente significa cuidar do que ninguém vê, mas todos sentem. Seja ajustando o vestido ou alinhando o cronograma, eu sou a guardiã dos seus detalhes.",
    image: imgDedication,
    icon: Heart,
    color: "from-rose-200 to-rose-100"
  },
  {
    id: 3,
    title: "A Pessoa por Trás da Marca",
    category: "Autenticidade",
    text: "Autenticidade é a minha assinatura. Quando você me contrata, leva junto toda a minha paixão, energia e um compromisso pessoal inegociável com o seu sucesso.",
    image: imgCasual,
    icon: User,
    color: "from-blue-200 to-blue-100"
  },
  {
    id: 4,
    title: "Vivendo o Momento",
    category: "Atmosfera",
    text: "Eu celebro cada conquista junto com você. A beleza de um evento está na alegria compartilhada, e eu garanto que nada atrapalhe esse brilho.",
    image: imgDecor,
    icon: Sparkles,
    color: "from-purple-200 to-purple-100"
  },
  {
    id: 5,
    title: "Conexões que Duram",
    category: "Vínculo",
    text: "Mais do que clientes, construo histórias e laços. Ver o sorriso no rosto de vocês é a minha maior recompensa e o combustível que move meu trabalho.",
    image: imgCouple,
    icon: Camera,
    color: "from-emerald-200 to-emerald-100"
  }
]

/**
 * Story section component
 */
const Story = () => {
  const [selectedId, setSelectedId] = useState(null)
  const selectedStory = STORIES.find(s => s.id === selectedId)

  const handleSelect = useCallback((id) => {
    if (!document.startViewTransition) {
      setSelectedId(id)
      return
    }

    document.startViewTransition(() => {
      flushSync(() => {
        setSelectedId(id)
      })
    })
  }, [])

  const handleClose = useCallback(() => {
    if (!document.startViewTransition) {
      setSelectedId(null)
      return
    }

    document.startViewTransition(() => {
      flushSync(() => {
        setSelectedId(null)
      })
    })
  }, [])

  return (
    <section className={cn('bg-cream overflow-hidden', SECTION_STYLES.padding)}>
      <div className="container-custom">
        {/* Section Header */}
        <SectionHeader />

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STORIES.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              isSelected={selectedId === null}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedId && selectedStory && (
        <StoryModal story={selectedStory} onClose={handleClose} />
      )}

      {/* View Transition Styles */}
      <style>{`
        ::view-transition-group(root) {
          animation-duration: 0.5s;
        }
      `}</style>
    </section>
  )
}

/**
 * Story section header
 */
const SectionHeader = memo(() => (
  <div className="text-center mb-16 animate-fade-in-up">
    <span className="inline-block py-1 px-3 rounded-full bg-gold/10 text-gold text-sm font-medium tracking-wider mb-4 border border-gold/20">
      Nossa Essência
    </span>
    <h2 className="text-4xl md:text-5xl font-serif text-forest mb-6">
      Histórias Reais, <span className="text-gold italic">Conexões Verdadeiras</span>
    </h2>
    <p className="max-w-2xl mx-auto text-forest-light text-lg leading-relaxed">
      Cada evento é único, assim como a nossa dedicação. Conheça um pouco mais sobre quem faz acontecer e como transformamos compromisso em arte.
    </p>
  </div>
))

SectionHeader.displayName = 'SectionHeader'

/**
 * Story card component
 */
const StoryCard = memo(({ story, isSelected, onSelect }) => {
  const IconComponent = story.icon

  return (
    <div
      className={cn(
        'group cursor-pointer relative rounded-2xl overflow-hidden hover-lift bg-white shadow-sm border border-stone-100',
        story.id === 5 && 'md:col-span-2 lg:col-span-2'
      )}
      onClick={() => onSelect(story.id)}
    >
      <div className={cn(
        'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500',
        story.color
      )} />

      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{
            viewTransitionName: isSelected ? `story-img-${story.id}` : ''
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

        <div className="absolute bottom-4 left-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center gap-2 mb-1">
            <IconComponent size={16} className="text-gold-light" />
            <span className="text-xs font-medium uppercase tracking-wider text-gold-light">
              {story.category}
            </span>
          </div>
          <h3 className="text-xl font-serif font-medium">{story.title}</h3>
        </div>
      </div>
    </div>
  )
})

StoryCard.displayName = 'StoryCard'

/**
 * Story detail modal
 */
const StoryModal = memo(({ story, onClose }) => {
  const IconComponent = story.icon

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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/50 backdrop-blur rounded-full hover:bg-white transition-colors"
          aria-label="Fechar"
        >
          <X size={24} className="text-forest" />
        </button>

        {/* Image Section */}
        <div className="md:w-1/2 relative h-64 md:h-auto">
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover"
            style={{ viewTransitionName: `story-img-${story.id}` }}
          />
          <div className={cn(
            'absolute inset-0 bg-gradient-to-br mix-blend-overlay opacity-30',
            story.color
          )} />
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-cream/30">
          <div className="flex items-center gap-3 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className={cn('p-3 rounded-full bg-gradient-to-br bg-opacity-20', story.color)}>
              <IconComponent size={24} className="text-gray-700" />
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
})

StoryModal.displayName = 'StoryModal'

export default memo(Story)
