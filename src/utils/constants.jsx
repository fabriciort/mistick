/**
 * Constantes centralizadas da aplicação
 * Facilita manutenção e reutilização de dados
 */

// Navigation Links
export const NAV_LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#contato', label: 'Contato' },
]

// About Section Features
export const ABOUT_FEATURES = [
  {
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Dedicação',
    description: 'Atenção exclusiva em cada projeto',
  },
  {
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Criatividade',
    description: 'Ideias únicas para você',
  },
  {
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Confiança',
    description: 'Excelência em cada detalhe',
  },
]

// Services Data
export const SERVICES = [
  {
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
      </svg>
    ),
    title: 'Casamentos',
    description: 'Assessoria completa para o dia mais especial da sua vida. Do planejamento à execução.',
    features: ['Planejamento completo', 'Gestão de fornecedores', 'Cerimonial no dia'],
  },
  {
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
    title: 'Festas & Celebrações',
    description: 'Aniversários, bodas, formaturas e mais. Cada celebração merece ser única.',
    features: ['Decoração personalizada', 'Buffet e entretenimento', 'Coordenação do evento'],
  },
  {
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Consultoria Criativa',
    description: 'Orientação especializada para quem deseja organizar seu próprio evento.',
    features: ['Análise de necessidades', 'Sugestão de fornecedores', 'Acompanhamento remoto'],
  },
  {
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Eventos Corporativos',
    description: 'Confraternizações, lançamentos e workshops. Profissionalismo para sua empresa.',
    features: ['Logística completa', 'Identidade visual', 'Gestão de convidados'],
  },
]

// Contact Info
export const CONTACT_INFO = [
  {
    iconName: 'whatsapp',
    title: 'WhatsApp',
    value: '(11) 99999-9999',
    actionLabel: 'Iniciar Conversa',
    hasAction: true,
    type: 'phone',
  },
  {
    iconName: 'email',
    title: 'E-mail',
    value: 'contato@mistick.com.br',
    actionLabel: 'Enviar Email',
    hasAction: true,
    type: 'email',
  },
  {
    iconName: 'location',
    title: 'Localização',
    value: 'São Paulo, SP',
    actionLabel: 'Atendemos toda região',
    hasAction: false,
    type: 'location',
  },
]

// Event Types for Contact Form
export const EVENT_TYPES = [
  'Casamento',
  'Festa de Aniversário',
  'Evento Corporativo',
  'Bodas',
  'Formatura',
  'Chá de Bebê',
  'Outro',
]

// Social Links - Contact Section
export const SOCIAL_LINKS_CONTACT = [
  { name: 'instagram', url: 'https://instagram.com/mistickeventos' },
  { name: 'facebook', url: 'https://facebook.com/mistickeventos' },
  { name: 'pinterest', url: 'https://pinterest.com/mistickeventos' },
]

// Social Links - Footer
export const SOCIAL_LINKS_FOOTER = [
  { name: 'instagram', url: 'https://instagram.com/mistickbydaniele' },
  { name: 'facebook', url: 'https://facebook.com/mistickbydaniele' },
  { name: 'whatsapp', url: 'https://wa.me/5511999999999' },
]
