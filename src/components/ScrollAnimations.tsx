import { useState, useEffect, type ReactNode } from 'react';
import { motion } from 'motion/react';

export const EDITORIAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Hook to detect prefers-reduced-motion */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  return prefersReduced;
}

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Editorial Fade-Up Reveal:
 * Subtle vertical entrance (opacity 0, y 16 -> opacity 1, y 0).
 */
export function FadeUp({ children, className = '', delay = 0 }: FadeUpProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.55,
        ease: EDITORIAL_EASE,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
