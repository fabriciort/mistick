/**
 * @fileoverview Error Boundary component
 * Catches JavaScript errors in child component tree
 */

import { Component } from 'react'
import { Button } from '../../atoms'
import { cn } from '../../../lib/cn'

/**
 * Error Boundary class component for catching render errors
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo })
    
    // Log error to monitoring service (e.g., Sentry)
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className={cn(
          'min-h-[400px] flex flex-col items-center justify-center',
          'bg-cream-dark/50 rounded-2xl p-8 text-center',
          this.props.className
        )}>
          <div className="w-16 h-16 mb-6 text-accent">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          
          <h2 className="font-serif text-2xl text-forest mb-2">
            Ops! Algo deu errado
          </h2>
          
          <p className="font-sans text-forest-light mb-6 max-w-md">
            Desculpe pelo inconveniente. Por favor, tente recarregar a página ou volte mais tarde.
          </p>

          <div className="flex gap-4">
            <Button
              variant="accent"
              onClick={this.handleRetry}
            >
              Tentar Novamente
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => window.location.reload()}
            >
              Recarregar Página
            </Button>
          </div>

          {/* Show error details in development */}
          {import.meta.env.DEV && this.state.error && (
            <details className="mt-8 text-left w-full max-w-2xl">
              <summary className="cursor-pointer text-sm text-forest/60 hover:text-forest">
                Detalhes do erro (desenvolvimento)
              </summary>
              <pre className="mt-4 p-4 bg-mistick-black text-cream text-xs rounded-lg overflow-auto">
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
