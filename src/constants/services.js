/**
 * @fileoverview Services data constants
 * Centralized service definitions for the Services section
 */

/**
 * @typedef {Object} ServiceFeature
 * @property {string} text - Feature description
 */

/**
 * @typedef {Object} Service
 * @property {string} id - Unique identifier
 * @property {string} iconName - Icon identifier (maps to Icon component)
 * @property {string} title - Service title
 * @property {string} description - Service description
 * @property {string[]} features - List of features
 */

/** @type {Service[]} */
export const SERVICES = [
  {
    id: 'weddings',
    iconName: 'cake',
    title: 'Casamentos',
    description: 'Assessoria completa para o dia mais especial da sua vida. Do planejamento à execução.',
    features: ['Planejamento completo', 'Gestão de fornecedores', 'Cerimonial no dia'],
  },
  {
    id: 'celebrations',
    iconName: 'gift',
    title: 'Festas & Celebrações',
    description: 'Aniversários, bodas, formaturas e mais. Cada celebração merece ser única.',
    features: ['Decoração personalizada', 'Buffet e entretenimento', 'Coordenação do evento'],
  },
  {
    id: 'consulting',
    iconName: 'lightbulb',
    title: 'Consultoria Criativa',
    description: 'Orientação especializada para quem deseja organizar seu próprio evento.',
    features: ['Análise de necessidades', 'Sugestão de fornecedores', 'Acompanhamento remoto'],
  },
  {
    id: 'corporate',
    iconName: 'building',
    title: 'Eventos Corporativos',
    description: 'Confraternizações, lançamentos e workshops. Profissionalismo para sua empresa.',
    features: ['Logística completa', 'Identidade visual', 'Gestão de convidados'],
  },
]

/** @type {string[]} */
export const EVENT_TYPES = [
  'Casamento',
  'Festa de Aniversário',
  'Evento Corporativo',
  'Bodas',
  'Formatura',
  'Chá de Bebê',
  'Outro',
]
