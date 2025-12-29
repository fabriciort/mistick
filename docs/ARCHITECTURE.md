# Mistick - Arquitetura Frontend

## 📋 Sumário Executivo

Este documento apresenta a auditoria arquitetural completa e o roadmap de refatoração para o projeto Mistick, uma landing page de alta performance construída com React 19, Vite 7, TailwindCSS 4 e GSAP.

---

## 🔍 Auditoria da Estrutura Atual

### Estrutura Original
```
src/
├── App.jsx
├── main.jsx
├── index.css
├── assets/
│   ├── images/
│   └── logo-mistick.svg
├── components/
│   ├── About.jsx
│   ├── AnimatedText.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── InfinityLogo.jsx
│   ├── Loader.jsx
│   ├── MistickLogo.jsx
│   ├── Services.jsx
│   ├── Story.jsx
│   └── WhatsAppButton.jsx
├── hooks/
│   └── useScrollAnimation.js
└── utils/
    └── whatsapp.js
```

### Problemas Identificados

#### 1. **Flat Component Structure** (Severidade: Alta)
- Todos os componentes em um único diretório `/components`
- Sem separação por domínio, feature ou responsabilidade
- Dificuldade de navegação à medida que o projeto cresce

#### 2. **Acoplamento Forte com GSAP** (Severidade: Alta)
```javascript
// Repetido em 7+ arquivos
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
```
- Plugin registration duplicado
- Lógica de animação misturada com lógica de UI
- Configurações de animação não centralizadas

#### 3. **Repetição de Código** (Severidade: Média)
- Ícones SVG duplicados (WhatsApp em 4+ arquivos)
- Padrões de scroll handling repetidos
- NavLinks hardcoded em múltiplos locais

#### 4. **Mistura de Responsabilidades** (Severidade: Alta)
- Componentes gerenciam UI, estado e lógica de negócio
- Dados de domínio embutidos em componentes de apresentação
- Contact.jsx: 370 linhas com form handling inline

#### 5. **CSS Global Poluído** (Severidade: Média)
- Animações keyframes no index.css global
- Utilitários customizados sem namespace
- Potencial conflito com Tailwind utilities

#### 6. **Hooks Subutilizados** (Severidade: Baixa)
- `useScrollAnimation` criado mas não utilizado
- Lógica duplicada que poderia usar o hook

---

## 🏗️ Nova Arquitetura: Feature-Sliced Design (FSD) Adaptado

### Visão Geral

O Feature-Sliced Design é uma metodologia arquitetural que organiza o código em camadas horizontais e slices verticais, promovendo:

- **Baixo acoplamento** entre features
- **Alta coesão** dentro de cada módulo
- **Escalabilidade** previsível
- **Testabilidade** isolada

### Nova Estrutura de Diretórios

```
src/
├── app/                          # Camada de aplicação (composição raiz)
│   ├── App.jsx                   # Componente raiz
│   ├── providers/                # Context providers globais
│   │   └── AnimationProvider.jsx
│   └── styles/                   # Estilos globais
│       ├── index.css
│       ├── animations.css
│       └── theme.css
│
├── pages/                        # Camada de páginas (entry points)
│   └── home/
│       ├── index.jsx
│       └── HomePage.jsx
│
├── widgets/                      # Composições complexas de features
│   ├── header/
│   │   ├── index.js
│   │   ├── ui/
│   │   │   ├── Header.jsx
│   │   │   ├── MobileMenu.jsx
│   │   │   └── DesktopNav.jsx
│   │   └── model/
│   │       └── useHeaderState.js
│   │
│   ├── hero/
│   │   ├── index.js
│   │   └── ui/
│   │       └── Hero.jsx
│   │
│   ├── about/
│   │   ├── index.js
│   │   ├── ui/
│   │   │   └── About.jsx
│   │   └── model/
│   │       └── features.js
│   │
│   ├── story/
│   │   ├── index.js
│   │   ├── ui/
│   │   │   ├── Story.jsx
│   │   │   └── StoryModal.jsx
│   │   └── model/
│   │       └── stories.js
│   │
│   ├── services/
│   │   ├── index.js
│   │   ├── ui/
│   │   │   ├── Services.jsx
│   │   │   └── ServiceCard.jsx
│   │   └── model/
│   │       └── services.js
│   │
│   ├── contact/
│   │   ├── index.js
│   │   ├── ui/
│   │   │   ├── Contact.jsx
│   │   │   ├── ContactForm.jsx
│   │   │   └── ContactInfo.jsx
│   │   └── model/
│   │       ├── useContactForm.js
│   │       └── contactInfo.js
│   │
│   └── footer/
│       ├── index.js
│       └── ui/
│           └── Footer.jsx
│
├── features/                     # Features isoladas e reutilizáveis
│   ├── whatsapp/
│   │   ├── index.js
│   │   ├── ui/
│   │   │   └── WhatsAppButton.jsx
│   │   ├── lib/
│   │   │   └── whatsapp.js
│   │   └── config/
│   │       └── messages.js
│   │
│   └── scroll-to-top/
│       ├── index.js
│       └── ui/
│           └── ScrollToTopButton.jsx
│
├── entities/                     # Entidades de domínio
│   └── navigation/
│       ├── index.js
│       └── model/
│           └── navLinks.js
│
├── shared/                       # Código compartilhado (não tem conhecimento de negócio)
│   ├── ui/                       # Componentes UI primitivos
│   │   ├── index.js
│   │   ├── AnimatedText/
│   │   │   ├── index.js
│   │   │   └── AnimatedText.jsx
│   │   ├── Logo/
│   │   │   ├── index.js
│   │   │   └── MistickLogo.jsx
│   │   ├── Loader/
│   │   │   ├── index.js
│   │   │   └── Loader.jsx
│   │   ├── Button/
│   │   │   ├── index.js
│   │   │   └── Button.jsx
│   │   └── icons/
│   │       ├── index.js
│   │       ├── WhatsAppIcon.jsx
│   │       ├── SocialIcons.jsx
│   │       └── ArrowIcon.jsx
│   │
│   ├── lib/                      # Bibliotecas e utilitários
│   │   ├── gsap/
│   │   │   ├── index.js          # Setup centralizado do GSAP
│   │   │   ├── plugins.js        # Registro de plugins
│   │   │   └── presets.js        # Animações predefinidas
│   │   └── utils/
│   │       ├── cn.js             # Class name merger (clsx/tailwind-merge)
│   │       └── scroll.js         # Scroll utilities
│   │
│   ├── hooks/                    # Hooks reutilizáveis
│   │   ├── index.js
│   │   ├── useScrollAnimation.js
│   │   ├── useScrollPosition.js
│   │   ├── useMediaQuery.js
│   │   ├── useClickOutside.js
│   │   └── useBodyScrollLock.js
│   │
│   ├── config/                   # Configurações globais
│   │   ├── index.js
│   │   ├── site.js               # Metadados do site
│   │   └── contact.js            # Informações de contato
│   │
│   └── assets/                   # Assets estáticos
│       └── images/
│           ├── hero-bg.jpg
│           └── story/
│               └── ...
│
└── main.jsx                      # Entry point
```

---

## 📐 Princípios Arquiteturais

### 1. Direção de Dependências

```
┌─────────────────────────────────────────────────────┐
│                      app/                            │
├─────────────────────────────────────────────────────┤
│                     pages/                           │
├─────────────────────────────────────────────────────┤
│                    widgets/                          │
├─────────────────────────────────────────────────────┤
│                   features/                          │
├─────────────────────────────────────────────────────┤
│                   entities/                          │
├─────────────────────────────────────────────────────┤
│                    shared/                           │
└─────────────────────────────────────────────────────┘
          ▲ Dependências só podem apontar para baixo
```

### 2. Estrutura de Slice (Segmento)

Cada slice (widget, feature, entity) segue a mesma estrutura interna:

```
slice-name/
├── index.js        # Public API (barrel export)
├── ui/             # Componentes React
├── model/          # Lógica de negócio, hooks, estado
├── lib/            # Utilitários específicos do slice
├── api/            # Chamadas de API (se aplicável)
└── config/         # Constantes e configurações
```

### 3. Public API Pattern

Cada módulo expõe uma API pública através do `index.js`:

```javascript
// widgets/header/index.js
export { Header } from './ui/Header'
export { useHeaderState } from './model/useHeaderState'
```

---

## 🎨 Sistema de Animações Centralizado

### Problema Atual
Registro de plugins GSAP duplicado e lógica de animação espalhada.

### Solução: Animation Layer

```javascript
// shared/lib/gsap/index.js
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registro único de plugins
gsap.registerPlugin(ScrollTrigger)

// Export configurado
export { gsap, ScrollTrigger }

// shared/lib/gsap/presets.js
export const fadeInUp = {
  from: { opacity: 0, y: 60 },
  to: { opacity: 1, y: 0 },
  duration: 0.8,
  ease: 'power3.out'
}

export const staggerReveal = {
  from: { opacity: 0, y: 30 },
  to: { opacity: 1, y: 0 },
  stagger: 0.1,
  ease: 'power3.out'
}

// Função helper para scroll-triggered animations
export const createScrollAnimation = (element, animation, options = {}) => {
  return gsap.fromTo(element, animation.from, {
    ...animation.to,
    scrollTrigger: {
      trigger: element,
      start: options.start || 'top 85%',
      toggleActions: options.toggleActions || 'play none none reverse',
      ...options.scrollTrigger
    }
  })
}
```

---

## 🎯 Guidelines de Implementação

### Componentes UI (shared/ui)

1. **Primitivos puros** - sem conhecimento de negócio
2. **Props fortemente tipadas** (com JSDoc ou TypeScript futuro)
3. **Composição sobre herança**
4. **Forwardref para componentes DOM**

```javascript
// shared/ui/Button/Button.jsx
import { forwardRef } from 'react'
import { cn } from '@/shared/lib/utils/cn'

/**
 * @typedef {Object} ButtonProps
 * @property {'primary' | 'secondary' | 'ghost'} [variant='primary']
 * @property {'sm' | 'md' | 'lg'} [size='md']
 * @property {boolean} [loading=false]
 */

export const Button = forwardRef(({ 
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'touch-target font-sans tracking-widest uppercase transition-all duration-300',
        variants[variant],
        sizes[size],
        loading && 'opacity-70 cursor-not-allowed',
        className
      )}
      disabled={loading}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  )
})

Button.displayName = 'Button'
```

### Widgets

1. **Composição de features e entidades**
2. **Estado local quando necessário**
3. **Podem ter model/ para lógica complexa**

### Features

1. **Funcionalidade isolada e reutilizável**
2. **Não depende de outras features**
3. **Pode ser removida sem quebrar o app**

---

## 📁 Path Aliases

Configuração recomendada para imports limpos:

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/app'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@features': path.resolve(__dirname, './src/features'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
})
```

---

## 🔄 Plano de Migração

### Fase 1: Infraestrutura (Atual)
- [x] Documentação arquitetural
- [ ] Configurar path aliases
- [ ] Criar estrutura de diretórios base
- [ ] Centralizar GSAP setup

### Fase 2: Camada Shared
- [ ] Extrair ícones para shared/ui/icons
- [ ] Criar Button primitivo
- [ ] Migrar AnimatedText e MistickLogo
- [ ] Centralizar hooks

### Fase 3: Entities e Features
- [ ] Extrair dados para entities/
- [ ] Criar feature WhatsApp isolada
- [ ] Criar feature scroll-to-top

### Fase 4: Widgets
- [ ] Refatorar Header como widget
- [ ] Refatorar Contact com form extraído
- [ ] Migrar demais sections

### Fase 5: Validação
- [ ] Verificar imports
- [ ] Rodar lint
- [ ] Validar build
- [ ] Performance audit

---

## 📊 Métricas de Sucesso

| Métrica | Antes | Depois (Meta) |
|---------|-------|---------------|
| Arquivos em /components | 12 | 0 |
| Duplicação de código GSAP | 7 ocorrências | 1 (centralizado) |
| Máx. linhas por componente | 370 (Contact) | < 150 |
| Path depth imports | 3-4 levels | 1-2 levels (aliases) |
| Cobertura de testes | 0% | Setup ready |

---

## 🚀 Benefícios Esperados

1. **Escalabilidade**: Adicionar novas features sem refatorar existentes
2. **Manutenibilidade**: Localizar código por domínio, não por tipo
3. **Onboarding**: Estrutura previsível para novos devs
4. **Testabilidade**: Slices isolados facilitam unit tests
5. **Performance**: Imports mais granulares para tree-shaking

---

## 📚 Referências

- [Feature-Sliced Design](https://feature-sliced.design/)
- [Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [GSAP Best Practices](https://greensock.com/react-advanced)
