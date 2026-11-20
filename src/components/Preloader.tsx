import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { stopLenis, startLenis } from '../hooks/useLenis';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      onCompleteRef.current();
      return;
    }

    stopLenis();
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let rafId: number;
    const startTime = performance.now();
    const duration = 850; // ~0.85s smooth progress fill

    const step = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / duration);
      // Clean cubic-out easing curve for data loading feel
      const eased = 1 - Math.pow(1 - rawProgress, 2.8);
      const currentCount = Math.min(100, Math.round(eased * 100));

      setProgress(currentCount);

      if (rawProgress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setProgress(100);
        // Short solid pause (~120ms) before lifting the curtain
        setTimeout(() => {
          document.body.style.overflow = origOverflow;
          startLenis();
          onCompleteRef.current();
        }, 120);
      }
    };

    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.overflow = origOverflow;
      startLenis();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-[#050505] text-white flex flex-col justify-between p-6 md:p-10 select-none pointer-events-auto"
      role="status"
      aria-label="Loading portfolio"
    >
      {/* Top spacer */}
      <div className="h-6" aria-hidden="true" />

      {/* Center: Monogram IDF + IQBALDF wordmark with masked entrance */}
      <div className="overflow-hidden flex flex-col items-center justify-center">
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <svg
            viewBox="0 0 46 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="square"
            strokeLinejoin="miter"
            className="h-8 md:h-9 w-auto text-white"
            aria-hidden="true"
          >
            {/* Letter I */}
            <line x1="3" y1="2" x2="3" y2="18" />
            {/* Letter D with geometric chamfered outer loop */}
            <line x1="11" y1="2" x2="11" y2="18" />
            <path d="M11 2H18.5L23.5 7V13L18.5 18H11" />
            {/* Letter F */}
            <line x1="29" y1="2" x2="29" y2="18" />
            <line x1="29" y1="2" x2="42" y2="2" />
            <line x1="29" y1="10" x2="39" y2="10" />
          </svg>
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-400 mt-3 select-none">
            IQBALDF
          </span>
        </motion.div>
      </div>

      {/* Bottom Area: Metadata Label + Counter & Thin Progress Line */}
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex items-center justify-between text-neutral-400 mb-2.5">
          <span className="text-[10px] font-mono tracking-[0.18em] text-neutral-500 uppercase select-none">
            DATA ANALYST PORTFOLIO
          </span>
          <span className="text-xs md:text-sm font-mono tabular-nums text-neutral-200 select-none">
            {String(progress).padStart(2, '0')}
          </span>
        </div>

        {/* Thin 1px progress track */}
        <div className="h-[1px] w-full bg-white/10 overflow-hidden relative">
          <div
            className="h-full bg-[#259B52] transition-[width] duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
