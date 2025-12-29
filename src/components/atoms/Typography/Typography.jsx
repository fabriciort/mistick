import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../../../utils/cn';

// Ensure ScrollTrigger is registered
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Typography = forwardRef(({
  children,
  className,
  variant = 'body', // h1, h2, body, caption, etc - logical variants
  as: Component = 'div', // HTML tag
  animation = 'none', // 'none', 'chars', 'words', 'lines'
  stagger = 0.05,
  duration = 0.8,
  delay = 0,
  triggerOnScroll = true,
  ...props
}, ref) => {
  const localRef = useRef(null);
  // Allow parent to access the DOM element
  useImperativeHandle(ref, () => localRef.current);

  useEffect(() => {
    if (animation === 'none') return;
    
    const container = localRef.current;
    if (!container) return;

    let elements = [];
    const text = container.textContent || '';

    // Text splitting logic
    // Note: For production, consider using a library like SplitType or GSAP SplitText (paid)
    // This is a manual implementation matching the original project's logic
    if (animation === 'words') {
      container.innerHTML = text
        .split(' ')
        .map(word => `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`)
        .join(' ');
      elements = container.querySelectorAll('span > span');
    } else if (animation === 'chars') {
      container.innerHTML = text
        .split('')
        .map(char => char === ' ' ? ' ' : `<span class="inline-block overflow-hidden"><span class="inline-block">${char}</span></span>`)
        .join('');
      elements = container.querySelectorAll('span > span');
    } else if (animation === 'lines') {
      // Lines is tricky without a library, falling back to block animation logic from original
      elements = [container];
    }

    const animationConfig = {
      y: animation === 'lines' ? 40 : 60,
      opacity: 0,
      duration,
      stagger,
      delay,
      ease: 'power3.out',
    };

    let ctx;
    
    // If triggerOnScroll is false, we expect the parent to animate it, 
    // BUT the original component handled it internally. 
    // To support Atomic Design best practices, we should leave orchestration to the parent (Hero)
    // However, to maintain the current behavior where the component *can* self-animate:
    
    if (triggerOnScroll) {
       ctx = gsap.context(() => {
        gsap.fromTo(elements,
          { y: animationConfig.y, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration,
            stagger,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }, localRef);
    } else {
        // If not triggered on scroll, we just set initial state so parent can animate to final state
        // OR we animate immediately if it's meant to run on load.
        // The original code ran immediate animation if triggerOnScroll=false
        ctx = gsap.context(() => {
            gsap.fromTo(elements,
                { y: animationConfig.y, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration,
                    stagger,
                    delay,
                    ease: 'power3.out',
                }
            );
        }, localRef);
    }

    return () => ctx && ctx.revert();
  }, [animation, stagger, duration, delay, triggerOnScroll]);

  return (
    <Component 
      ref={localRef} 
      className={cn(className, "[&>span]:inline-block")}
      {...props}
    >
      {children}
    </Component>
  );
});

Typography.displayName = 'Typography';

Typography.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.string,
  as: PropTypes.elementType,
  animation: PropTypes.oneOf(['none', 'chars', 'words', 'lines']),
  stagger: PropTypes.number,
  duration: PropTypes.number,
  delay: PropTypes.number,
  triggerOnScroll: PropTypes.bool,
};

export default Typography;
