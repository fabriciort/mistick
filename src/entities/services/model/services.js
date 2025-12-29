/**
 * Services Data
 * 
 * Dados dos serviços oferecidos.
 */

export const services = [
  {
    id: 'weddings',
    icon: 'cake',
    title: 'Casamentos',
    description: 'Assessoria completa para o dia mais especial da sua vida. Do planejamento à execução.',
    features: ['Planejamento completo', 'Gestão de fornecedores', 'Cerimonial no dia'],
  },
  {
    id: 'parties',
    icon: 'gift',
    title: 'Festas & Celebrações',
    description: 'Aniversários, bodas, formaturas e mais. Cada celebração merece ser única.',
    features: ['Decoração personalizada', 'Buffet e entretenimento', 'Coordenação do evento'],
  },
  {
    id: 'consulting',
    icon: 'lightbulb',
    title: 'Consultoria Criativa',
    description: 'Orientação especializada para quem deseja organizar seu próprio evento.',
    features: ['Análise de necessidades', 'Sugestão de fornecedores', 'Acompanhamento remoto'],
  },
  {
    id: 'corporate',
    icon: 'building',
    title: 'Eventos Corporativos',
    description: 'Confraternizações, lançamentos e workshops. Profissionalismo para sua empresa.',
    features: ['Logística completa', 'Identidade visual', 'Gestão de convidados'],
  },
]

export const serviceIcons = {
  cake: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
    </svg>
  ),
  gift: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
  ),
  lightbulb: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  building: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
}

export default services
