import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error('Template ErrorBoundary capturou um erro:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-[50vh] flex items-center justify-center px-6 text-center">
          <div>
            <p className="font-serif text-2xl text-mistick-black mb-3">Algo deu errado.</p>
            <p className="font-sans text-sm text-mistick-charcoal/70">
              Recarregue a página ou tente novamente em alguns instantes.
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

