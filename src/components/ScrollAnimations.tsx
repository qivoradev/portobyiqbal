import { useState, useEffect, useRef, type ReactNode } from 'react';
import { motion, useInView } from 'motion/react';

export const CUBIC_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

interface SectionTitleProps {
  title: string;
  className?: string;
  as?: 'h2' | 'h3' | 'h1';
}

/**
 * Editorial Section Title reveal per word:
 * Each word masked with overflow-hidden, translates from y: 100% -> 0% with 40ms stagger.
 * Re-triggers safely on language switch by reading title prop.
 */
export function SectionTitle({
  title,
  className = '',
  as = 'h2',
}: SectionTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const reduced = usePrefersReducedMotion();

  const words = title.split(' ');
  const Tag = as;

  return (
    <Tag
      ref={ref}
      className={`font-semibold text-[#111111] leading-[1.1] tracking-[-0.035em] ${className}`}
    >
      {words.map((word, idx) => (
        <span
          key={`${word}-${idx}`}
          className="inline-block overflow-hidden align-top mr-[0.24em] last:mr-0 pb-[0.08em]"
        >
          <motion.span
            className="inline-block"
            initial={reduced ? { opacity: 1, y: 0 } : { y: '105%', opacity: 0.2 }}
            animate={
              isInView || reduced
                ? { y: 0, opacity: 1 }
                : { y: '105%', opacity: 0.2 }
            }
            transition={{
              duration: reduced ? 0 : 0.65,
              ease: CUBIC_EASE,
              delay: reduced ? 0 : idx * 0.04,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

interface AnimatedLineProps {
  className?: string;
  delay?: number;
}

/**
 * 1px horizontal rule animated left-to-right (scaleX 0 -> 1, origin-left).
 */
export function AnimatedLine({ className = '', delay = 0 }: AnimatedLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const reduced = usePrefersReducedMotion();

  return (
    <div ref={ref} className="w-full overflow-hidden">
      <motion.div
        className={`h-[1px] w-full bg-black/10 origin-left ${className}`}
        initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
        animate={isInView || reduced ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration: reduced ? 0 : 0.75,
          ease: CUBIC_EASE,
          delay: reduced ? 0 : delay,
        }}
      />
    </div>
  );
}

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Standard content fade-up with consistent 600-800ms cubic-bezier and travel distance 18-20px.
 */
export function FadeUp({ children, className = '', delay = 0 }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      animate={isInView || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: reduced ? 0 : 0.7,
        ease: CUBIC_EASE,
        delay: reduced ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}

interface CountUpProps {
  target: number;
  suffix?: string;
  label: string;
  lang?: 'in' | 'en';
  className?: string;
  numberClassName?: string;
  labelClassName?: string;
}

/**
 * Animated count-up counter that runs once on viewport enter:
 * ~1.2s easeOut animation, tabular-nums, formatted according to language (21.350 vs 21,350),
 * accessible via aria-label with the full terminal metric.
 */
export function CountUp({
  target,
  suffix = '',
  label,
  lang = 'in',
  className = '',
  numberClassName = '',
  labelClassName = '',
}: CountUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const reduced = usePrefersReducedMotion();
  const [currentVal, setCurrentVal] = useState(reduced ? target : 0);

  useEffect(() => {
    if (reduced) {
      setCurrentVal(target);
      return;
    }

    if (!isInView) return;

    const startTime = performance.now();
    const duration = 1200; // 1.2 seconds

    let frameId: number;
    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic: 1 - (1 - t)^3
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(target * ease);
      setCurrentVal(val);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCurrentVal(target);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, target, reduced]);

  // Format with thousand separator according to language:
  // IN uses '.' (e.g. 21.350), EN uses ',' (e.g. 21,350)
  const formattedNumber =
    lang === 'in'
      ? currentVal.toLocaleString('id-ID')
      : currentVal.toLocaleString('en-US');

  const finalFormatted =
    lang === 'in'
      ? target.toLocaleString('id-ID')
      : target.toLocaleString('en-US');

  const accessibleText = `${finalFormatted}${suffix} ${label}`;

  return (
    <div
      ref={ref}
      className={`flex flex-col ${className}`}
      aria-label={accessibleText}
      role="text"
    >
      <div
        className={`text-[34px] sm:text-[42px] font-bold tabular-nums tracking-[-0.035em] leading-none ${
          numberClassName || 'text-[#111111]'
        }`}
      >
        <span>{formattedNumber}</span>
        {suffix && (
          <span
            className={`font-semibold ml-0.5 ${
              numberClassName.includes('text-white') ? 'text-white/70' : 'text-[#666666]'
            }`}
          >
            {suffix}
          </span>
        )}
      </div>
      <p
        className={`text-[14px] leading-snug mt-2.5 ${
          labelClassName || 'text-[#4f4f4f]'
        }`}
      >
        {label}
      </p>
    </div>
  );
}
