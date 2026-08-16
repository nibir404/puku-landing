import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export { gsap };

/**
 * Custom hook for GSAP floating / hover animation
 */
export function useGsapFloat<T extends HTMLElement = HTMLDivElement>(
  options: { y?: number; duration?: number; delay?: number } = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;
    const { y = 8, duration = 3, delay = 0 } = options;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: `-=${y}`,
        duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay,
      });
    }, ref);

    return () => ctx.revert();
  }, [options.y, options.duration, options.delay]);

  return ref;
}

/**
 * Custom hook for GSAP magnetic hover effect
 */
export function useGsapMagnetic<T extends HTMLElement = HTMLDivElement>(strength = 0.3) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return ref;
}
