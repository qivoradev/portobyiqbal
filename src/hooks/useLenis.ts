import { useEffect } from 'react';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export function stopLenis() {
  lenisInstance?.stop();
}

export function startLenis() {
  lenisInstance?.start();
}

/** Smooth-scroll to an element or selector with consistent header offset */
export function scrollToLenis(target: string | HTMLElement, offset = -88) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: 1.1 });
  } else {
    const el =
      typeof target === 'string'
        ? (document.querySelector(target) as HTMLElement | null)
        : target;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}

/** Initialises Lenis smooth-scroll and auto-cleans on unmount. */
export function useLenis() {
  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenisInstance = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}
