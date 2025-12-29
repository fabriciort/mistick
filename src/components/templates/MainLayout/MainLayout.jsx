/**
 * @fileoverview MainLayout template component
 * Primary layout structure with header, footer, and content area
 */

import { memo } from 'react'
import { Header, Footer, WhatsAppButton } from '../../organisms'
import ErrorBoundary from './ErrorBoundary'
import { cn } from '../../../lib/cn'

/**
 * Main layout template
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content
 * @param {boolean} [props.showHeader=true] - Show header
 * @param {boolean} [props.showFooter=true] - Show footer
 * @param {boolean} [props.showWhatsApp=true] - Show WhatsApp button
 * @param {string} [props.className] - Additional classes for main content
 */
const MainLayout = ({
  children,
  showHeader = true,
  showFooter = true,
  showWhatsApp = true,
  className,
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      {showHeader && (
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>
      )}

      <main className={cn('flex-1', className)}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>

      {showFooter && (
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      )}

      {showWhatsApp && <WhatsAppButton />}
    </div>
  )
}

export default memo(MainLayout)
