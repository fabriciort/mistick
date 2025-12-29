import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import { useGsapContext } from '../../../hooks/use-gsap-context';
import { openWhatsApp } from '../../../utils/whatsapp';

// Atoms
import Typography from '../../atoms/Typography';
import Button from '../../atoms/Button';
import Divider from '../../atoms/Divider';
import ScrollIndicator from '../../atoms/ScrollIndicator';
import MistickLogo from '../../atoms/MistickLogo';

// Assets
import heroBg from '../../../assets/images/hero-bg.jpg';

const Hero = ({ isLoading }) => {
  const containerRef = useRef(null);
  const logoContainerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Main Orchestration Timeline
  useGsapContext((self) => {
    // Wait for loading to finish and prevent re-animation
    if (isLoading || hasAnimated) return;

    // Logo container entrance
    gsap.fromTo(logoContainerRef.current,
      { scale: 0.8, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
    );

    // CTA buttons entrance
    gsap.fromTo('.hero-cta',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.2 }
    );

    // Scroll indicator entrance
    gsap.fromTo('.scroll-indicator',
      { y: -10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 1.8 }
    );

    // Scroll indicator loop
    gsap.to('.scroll-indicator-arrow', {
      y: 8,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 2.2,
    });
    
    setHasAnimated(true);

  }, [isLoading, hasAnimated]); // Add isLoading to dependencies

  const scrollToServices = () => {
    const section = document.querySelector('#servicos');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-mistick-black/70 via-mistick-black/50 to-mistick-black/80" />
      </div>

      {/* Subtle light effect overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-gradient-radial from-white/5 to-transparent blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-1/3 h-1/2 bg-gradient-radial from-accent/10 to-transparent blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="container-custom relative z-10 text-center pt-32 pb-24 sm:pt-36 sm:pb-28 md:pt-40 md:pb-32 lg:pt-44 lg:pb-36 px-4 sm:px-6">
        
        {/* Animated Mistick Logo */}
        <div ref={logoContainerRef} className="mb-8 sm:mb-10 md:mb-12 flex justify-center">
          <MistickLogo className="w-20 sm:w-28 md:w-36 lg:w-44" variant="light" />
        </div>

        {/* Brand Name (H1) */}
        <Typography
          as="h1"
          animation="chars"
          stagger={0.04}
          delay={0.6}
          triggerOnScroll={false}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-wider text-white mb-3 sm:mb-4 md:mb-5"
        >
          Mistick
        </Typography>

        {/* Subtitle (P) */}
        <Typography
          as="p"
          animation="words"
          stagger={0.1}
          delay={1.1}
          triggerOnScroll={false}
          className="font-sans text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white/70 mb-8 sm:mb-10 md:mb-12"
        >
          by Daniele Ribeiro
        </Typography>

        {/* Decorative Divider */}
        <Divider />

        {/* Tagline */}
        <Typography
          as="p"
          animation="lines"
          delay={1.3}
          triggerOnScroll={false}
          className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/80 italic max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-14 leading-relaxed"
        >
          Criando momentos que transcendem o ordinário
        </Typography>

        {/* CTA Buttons */}
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5">
          <Button 
            variant="primary" 
            onClick={() => openWhatsApp('greeting')}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Fale Conosco
          </Button>

          <Button 
            variant="outline" 
            onClick={scrollToServices}
          >
            Nossos Serviços
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
};

Hero.propTypes = {
  isLoading: PropTypes.bool
};

export default Hero;
