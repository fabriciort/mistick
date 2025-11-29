import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null)
  const logoRef = useRef(null)
  const textRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power3.out',
          onComplete,
        })
      },
    })

    // Animação do logo
    tl.fromTo(logoRef.current,
      { scale: 0, rotation: -180, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.5)' }
    )

    // Animação do texto
    tl.fromTo(textRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    )

    // Animação da barra de progresso
    tl.fromTo(progressRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.5, ease: 'power2.inOut' },
      '-=0.3'
    )

    return () => tl.kill()
  }, [onComplete])

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[100] bg-cream flex flex-col items-center justify-center"
    >
      {/* Logo animado */}
      <div ref={logoRef} className="mb-8">
        <svg
          viewBox="0 0 100 50"
          className="w-32 h-16 text-forest"
          fill="none"
        >
          <path
            d="M50 25C50 17 43 10 33 10C23 10 15 17 15 25C15 33 23 40 33 40C43 40 50 33 50 25C50 33 57 40 67 40C77 40 85 33 85 25C85 17 77 10 67 10C57 10 50 17 50 25Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Nome */}
      <div ref={textRef} className="text-center mb-8">
        <h1 className="font-serif text-4xl tracking-wider text-forest mb-2">MISTICK</h1>
        <p className="font-sans text-sm tracking-[0.3em] uppercase text-gold">
          Assessoria & Eventos
        </p>
      </div>

      {/* Barra de progresso */}
      <div className="w-48 h-0.5 bg-cream-dark rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-gold origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </div>
  )
}

export default Loader

