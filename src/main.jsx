import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Inicializa GSAP uma única vez no entry point
import '@shared/lib/gsap'

// Estilos globais
import './app/styles/index.css'

// App root
import App from './app/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
