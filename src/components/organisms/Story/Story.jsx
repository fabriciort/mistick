import { useState } from 'react'
import { flushSync } from 'react-dom'
import { Heart, Star, Sparkles, User, Camera } from 'lucide-react'
import { StoryCard } from '../../molecules'
import StoryModal from './StoryModal'

// Import images
import imgProfessional from '../../../assets/images/story/portrait-professional.jpg'
import imgCasual from '../../../assets/images/story/portrait-casual.jpg'
import imgDedication from '../../../assets/images/story/dedication-bride-dress.jpg'
import imgDecor from '../../../assets/images/story/event-decor-selfie.jpg'
import imgCouple from '../../../assets/images/story/wedding-couple-client.jpg'

const stories = [
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
 * Story Organism - Seção de histórias/galeria
 */
const Story = () => {
  const [selectedId, setSelectedId] = useState(null)
  const selectedStory = stories.find(s => s.id === selectedId)

  const handleSelect = (id) => {
    if (!document.startViewTransition) {
      setSelectedId(id)
      return
    }

    document.startViewTransition(() => {
      flushSync(() => {
        setSelectedId(id)
      })
    })
  }

  const handleClose = () => {
    if (!document.startViewTransition) {
      setSelectedId(null)
      return
    }

    document.startViewTransition(() => {
      flushSync(() => {
        setSelectedId(null)
      })
    })
  }

  return (
    <section className="py-24 bg-cream overflow-hidden">
      <div className="container-custom">
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              id={story.id}
              title={story.title}
              category={story.category}
              image={story.image}
              icon={story.icon}
              color={story.color}
              isWide={story.id === 5}
              selectedId={selectedId}
              onClick={handleSelect}
            />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedId && selectedStory && (
        <StoryModal story={selectedStory} onClose={handleClose} />
      )}

      <style>{`
        ::view-transition-group(root) {
          animation-duration: 0.5s;
        }
      `}</style>
    </section>
  )
}

export default Story
