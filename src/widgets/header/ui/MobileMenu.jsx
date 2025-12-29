import { forwardRef } from 'react'
import { MistickLogo } from '@shared/ui'
import { CloseIcon, ChevronRightIcon, WhatsAppIcon } from '@shared/ui/icons'

/**
 * Mobile Menu Component
 * 
 * Menu lateral para dispositivos móveis.
 */
const MobileMenu = forwardRef(({ isOpen, links, onNavClick, onClose }, ref) => {
  return (
    <div
      ref={ref}
      className={`lg:hidden fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-white z-50 shadow-2xl transition-transform duration-500 ease-out safe-area-top ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Close button */}
      <div className="flex justify-end p-4">
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center bg-cream-dark/50 hover:bg-cream-dark transition-colors duration-300 touch-target"
          aria-label="Fechar menu"
        >
          <CloseIcon className="w-5 h-5 text-mistick-black" />
        </button>
      </div>

      {/* Logo in menu */}
      <div className="px-6 pb-6 border-b border-cream-dark">
        <div className="flex items-center gap-3">
          <div className="w-10">
            <MistickLogo />
          </div>
          <div>
            <span className="font-serif text-lg font-medium tracking-wide text-mistick-black block leading-none">
              Mistick
            </span>
            <span className="font-sans text-[8px] tracking-[0.15em] uppercase text-accent block">
              by Daniele Ribeiro
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="p-6 flex flex-col gap-1">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => onNavClick(e, link.href)}
            className="menu-item font-sans text-base tracking-wider text-mistick-charcoal hover:text-accent transition-colors duration-300 py-3 px-4 hover:bg-cream-dark/50 flex items-center justify-between group touch-target"
          >
            <span>{link.label}</span>
            <ChevronRightIcon className="w-4 h-4 text-accent opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
          </a>
        ))}
      </nav>

      {/* CTA in mobile menu */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-cream-dark bg-white safe-area-bottom">
        <a
          href="#contato"
          onClick={(e) => onNavClick(e, '#contato')}
          className="w-full flex items-center justify-center gap-2 bg-mistick-black text-white font-sans text-xs tracking-widest uppercase py-4 hover:bg-accent transition-colors duration-300 touch-target"
        >
          <WhatsAppIcon className="w-4 h-4" />
          Fale Conosco
        </a>
      </div>
    </div>
  )
})

MobileMenu.displayName = 'MobileMenu'

export default MobileMenu
