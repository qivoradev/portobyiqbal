import { motion } from 'motion/react';
import { useInView } from '../hooks/useInView';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'span';
}

/** Fade-up reveal on scroll, respects prefers-reduced-motion via useInView. */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: RevealProps) {
  const { ref, isInView } = useInView(0.1);
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}
