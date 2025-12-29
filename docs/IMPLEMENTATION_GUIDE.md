# Guia de Implementação - Feature-Sliced Design

## 📁 Estrutura Implementada

```
src/
├── app/                          # Camada de aplicação
│   ├── App.jsx                   # Componente raiz
│   └── styles/                   # Estilos organizados
│       ├── index.css             # Entry point
│       ├── theme.css             # Design tokens
│       ├── base.css              # Reset & globals
│       ├── animations.css        # CSS animations
│       └── utilities.css         # Custom utilities
│
├── widgets/                      # Composições complexas
│   ├── header/
│   │   ├── index.js              # Public API
│   │   ├── ui/
│   │   │   ├── Header.jsx
│   │   │   ├── DesktopNav.jsx
│   │   │   └── MobileMenu.jsx
│   │   └── model/
│   │       └── useHeaderState.js
│   │
│   └── footer/
│       ├── index.js
│       └── ui/
│           └── Footer.jsx
│
├── features/                     # Features isoladas
│   └── whatsapp/
│       ├── index.js
│       ├── ui/
│       │   └── WhatsAppButton.jsx
│       ├── lib/
│       │   └── whatsapp.js
│       └── config/
│           └── messages.js
│
├── entities/                     # Dados de domínio
│   ├── navigation/
│   │   └── model/navLinks.js
│   ├── services/
│   │   └── model/services.js
│   ├── about/
│   │   └── model/features.js
│   ├── story/
│   │   └── model/stories.js
│   └── contact/
│       └── model/contactInfo.js
│
├── shared/                       # Código reutilizável
│   ├── ui/                       # Componentes primitivos
│   │   ├── AnimatedText/
│   │   ├── Logo/
│   │   ├── Loader/
│   │   ├── Button/
│   │   └── icons/
│   │
│   ├── lib/                      # Utilitários
│   │   ├── gsap/                 # Sistema de animações
│   │   │   ├── index.js          # Setup centralizado
│   │   │   ├── presets.js        # Animações predefinidas
│   │   │   └── helpers.js        # Funções auxiliares
│   │   └── utils/
│   │       ├── cn.js             # Class name utility
│   │       └── scroll.js         # Scroll utilities
│   │
│   ├── hooks/                    # React hooks
│   │   ├── useScrollPosition.js
│   │   ├── useClickOutside.js
│   │   ├── useBodyScrollLock.js
│   │   ├── useMediaQuery.js
│   │   └── useScrollAnimation.js
│   │
│   ├── config/                   # Configurações
│   │   ├── site.js
│   │   └── contact.js
│   │
│   └── assets/                   # Assets estáticos
│       └── images/
│
├── components/                   # [LEGADO] Migrar para widgets/
│
└── main.jsx                      # Entry point
```

---

## 🔌 Path Aliases

Configure seu editor para reconhecer os aliases:

| Alias | Caminho |
|-------|---------|
| `@/` | `src/` |
| `@app/` | `src/app/` |
| `@widgets/` | `src/widgets/` |
| `@features/` | `src/features/` |
| `@entities/` | `src/entities/` |
| `@shared/` | `src/shared/` |

### Exemplos de Import

```javascript
// ✅ Correto - usando aliases
import { Button } from '@shared/ui'
import { gsap } from '@shared/lib/gsap'
import { useScrollPosition } from '@shared/hooks'
import { Header } from '@widgets/header'
import { openWhatsApp } from '@features/whatsapp'
import { navLinks } from '@entities/navigation'

// ❌ Evitar - imports relativos profundos
import { Button } from '../../../shared/ui/Button'
```

---

## 🎨 Sistema de Animações GSAP

### Setup Centralizado

O GSAP é inicializado uma única vez em `@shared/lib/gsap/index.js`:

```javascript
// Sempre importe do shared, nunca diretamente de 'gsap'
import { gsap, ScrollTrigger } from '@shared/lib/gsap'

// Usar presets para consistência
import { fadeInUp, staggerFadeUp } from '@shared/lib/gsap'
```

### Presets Disponíveis

```javascript
// Fade animations
fadeIn, fadeInUp, fadeInDown, fadeInLeft, fadeInRight

// Scale animations
scaleIn, scaleInBounce

// Stagger animations
staggerFadeUp, staggerFadeIn, staggerScale

// Text animations
textRevealWords, textRevealChars, textRevealLines

// UI specific
headerSlideDown, menuItemReveal, scrollIndicatorBounce
```

### Helpers

```javascript
import { 
  createScrollAnimation,
  createAnimation,
  createGSAPContext,
  prepareSVGPaths,
  animateSVGDraw,
  refreshScrollTrigger 
} from '@shared/lib/gsap'

// Criar animação scroll-triggered
useEffect(() => {
  const ctx = gsap.context(() => {
    createScrollAnimation(elementRef.current, fadeInUp, {
      start: 'top 85%'
    })
  }, containerRef)
  return () => ctx.revert()
}, [])
```

---

## 🧩 Criando Novos Componentes

### Widget (composição complexa)

```
widgets/
└── novo-widget/
    ├── index.js              # Public API
    ├── ui/
    │   ├── NovoWidget.jsx    # Componente principal
    │   └── SubComponente.jsx # Componentes internos
    └── model/
        └── useNovoWidgetState.js  # Lógica de estado
```

```javascript
// widgets/novo-widget/index.js
export { default as NovoWidget } from './ui/NovoWidget'
export { useNovoWidgetState } from './model/useNovoWidgetState'
```

### Feature (funcionalidade isolada)

```
features/
└── nova-feature/
    ├── index.js
    ├── ui/
    │   └── NovaFeatureUI.jsx
    ├── lib/
    │   └── utils.js
    └── config/
        └── constants.js
```

### Entity (dados de domínio)

```
entities/
└── nova-entidade/
    ├── index.js
    └── model/
        └── data.js
```

---

## 📋 Checklist de Migração

Para migrar um componente legado de `components/` para a nova estrutura:

1. **Identificar o tipo:**
   - É um primitivo UI? → `shared/ui/`
   - É uma funcionalidade isolada? → `features/`
   - É uma composição de seção? → `widgets/`
   - São dados de domínio? → `entities/`

2. **Criar estrutura de slice:**
   - Criar diretório com `index.js`
   - Separar UI em `ui/`
   - Extrair lógica para `model/`
   - Extrair dados hardcoded para `entities/`

3. **Atualizar imports:**
   - Usar aliases `@shared/`, `@widgets/`, etc.
   - Importar GSAP de `@shared/lib/gsap`

4. **Testar:**
   - `npm run lint`
   - `npm run build`

---

## 🚧 Componentes Pendentes de Migração

Os seguintes componentes ainda estão em `components/` e devem ser migrados:

- [ ] `Hero.jsx` → `widgets/hero/`
- [ ] `About.jsx` → `widgets/about/`
- [ ] `Story.jsx` → `widgets/story/`
- [ ] `Services.jsx` → `widgets/services/`
- [ ] `Contact.jsx` → `widgets/contact/`

**Prioridade:** Migrar na ordem de complexidade, começando pelos mais simples.

---

## 📚 Referências

- [Feature-Sliced Design Docs](https://feature-sliced.design/)
- [Documentação de Arquitetura](./ARCHITECTURE.md)
- [GSAP React Guide](https://greensock.com/react-advanced)
