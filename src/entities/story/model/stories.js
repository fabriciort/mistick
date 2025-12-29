/**
 * Stories Data
 * 
 * Dados para a seção de histórias/galeria.
 */

import { Heart, Star, Sparkles, User, Camera } from 'lucide-react'

// Import images
import imgProfessional from '@shared/assets/images/story/portrait-professional.jpg'
import imgCasual from '@shared/assets/images/story/portrait-casual.jpg'
import imgDedication from '@shared/assets/images/story/dedication-bride-dress.jpg'
import imgDecor from '@shared/assets/images/story/event-decor-selfie.jpg'
import imgCouple from '@shared/assets/images/story/wedding-couple-client.jpg'

export const stories = [
  {
    id: 1,
    title: 'Uma Visão de Excelência',
    category: 'Profissionalismo',
    text: 'Não é apenas sobre organizar eventos, é sobre orquestrar sonhos. Minha missão é trazer tranquilidade e perfeição para cada segundo do seu grande dia.',
    image: imgProfessional,
    icon: Star,
    color: 'from-amber-200 to-amber-100',
  },
  {
    id: 2,
    title: 'Em Cada Detalhe',
    category: 'Dedicação',
    text: 'Estar presente significa cuidar do que ninguém vê, mas todos sentem. Seja ajustando o vestido ou alinhando o cronograma, eu sou a guardiã dos seus detalhes.',
    image: imgDedication,
    icon: Heart,
    color: 'from-rose-200 to-rose-100',
  },
  {
    id: 3,
    title: 'A Pessoa por Trás da Marca',
    category: 'Autenticidade',
    text: 'Autenticidade é a minha assinatura. Quando você me contrata, leva junto toda a minha paixão, energia e um compromisso pessoal inegociável com o seu sucesso.',
    image: imgCasual,
    icon: User,
    color: 'from-blue-200 to-blue-100',
  },
  {
    id: 4,
    title: 'Vivendo o Momento',
    category: 'Atmosfera',
    text: 'Eu celebro cada conquista junto com você. A beleza de um evento está na alegria compartilhada, e eu garanto que nada atrapalhe esse brilho.',
    image: imgDecor,
    icon: Sparkles,
    color: 'from-purple-200 to-purple-100',
  },
  {
    id: 5,
    title: 'Conexões que Duram',
    category: 'Vínculo',
    text: 'Mais do que clientes, construo histórias e laços. Ver o sorriso no rosto de vocês é a minha maior recompensa e o combustível que move meu trabalho.',
    image: imgCouple,
    icon: Camera,
    color: 'from-emerald-200 to-emerald-100',
    featured: true, // Indica que é destacado (col-span-2)
  },
]

export default stories
