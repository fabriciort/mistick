# Frontend Architecture Guide

## Overview

This project follows a **Modular Layered Architecture**, inspired by Feature-Sliced Design (FSD). The goal is to decouple business logic from UI presentation and ensure scalability as the application grows from a Landing Page to a complex platform.

## Directory Structure

```
src/
├── app/            # Application entry points, providers, and global configs
├── pages/          # Page composition (currently implicit via App.jsx for LP)
├── sections/       # Domain-specific modules (Landing Page Sections)
├── widgets/        # Complex, reusable UI blocks (Header, Footer)
├── shared/         # Universal reuse layer (UI Kit, Utilities, Hooks, Assets)
│   ├── ui/         # Dumb/Atomic components
│   ├── lib/        # Pure logic/utils
│   ├── hooks/      # Custom React hooks
│   └── assets/     # Static resources
└── main.jsx        # Vite Entry Point
```

## Layers Definition

### 1. Shared (`@/shared`)
The foundation. Things here must NOT import from upper layers.
- **UI**: Buttons, Inputs, Logos, Loaders. *Must be stateless or UI-state only.*
- **Lib**: Helpers like `whatsapp.js`, formatters, validators.
- **Hooks**: Generic hooks like `useScrollAnimation`.

### 2. Widgets (`@/widgets`)
Standalone UI blocks that combine shared components to form functional units.
- Examples: `Header`, `Footer`, `WhatsAppButton`.
- Can import from `shared`.

### 3. Sections (`@/sections`)
Specific business domains or page blocks. In a Landing Page context, each section (Hero, About) acts like a feature module.
- Contains the specific logic and layout for that part of the user journey.
- Can import from `widgets` and `shared`.

### 4. App (`@/app`)
The orchestration layer.
- `App.jsx`: Composes the sections to build the page.
- Context Providers would live here.

## Key Principles

1.  **Unidirectional Data Flow**: Props down, events up.
2.  **Strict Import Rules**: A layer can only import from layers "below" it.
    - `shared` cannot import `widgets`.
    - `widgets` cannot import `sections`.
3.  **Composition**: Prefer composing smaller components over monolithic files.
4.  **Aliases**: Always use `@/` imports instead of relative `../../`.

## Scalability Roadmap

- **Adding a New Page**: Create `src/pages/NewPage`, compose existing Widgets and Sections, or create new specific Sections.
- **State Management**: If global state becomes complex, introduce `src/entities` (for business models) or use Context in `src/app`.
- **Testing**: Mirror the `src` structure in `tests/` or place `__tests__` alongside components.

---
*Maintained by the Engineering Team.*
