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
    let holdTimeout: number | undefined;
    const initialDelay = 150; // ms: wait for logo entrance to be clearly visible
    const duration = 1600; // ms (1.6s progress duration)
    const holdDuration = 300; // ms (0.3s hold at 100)
    let startTime: number | null = null;

    // Organic easeInOutCubic: smooth start, brisk mid-stroke, gentle glide to 100
    const easeInOutCubic = (x: number): number => {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    };

    const step = (now: number) => {
      if (startTime === null) {
        startTime = now;
      }
      const elapsed = now - startTime;

      if (elapsed < initialDelay) {
        setProgress(0);
        rafId = requestAnimationFrame(step);
        return;
      }

      const activeElapsed = elapsed - initialDelay;
      const rawProgress = Math.min(1, activeElapsed / duration);
      const eased = easeInOutCubic(rawProgress);
      const currentCount = Math.min(100, Math.round(eased * 100));

      setProgress(currentCount);

      if (rawProgress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setProgress(100);
        holdTimeout = window.setTimeout(() => {
          document.body.style.overflow = origOverflow;
          startLenis();
          onCompleteRef.current();
        }, holdDuration);
      }
    };

    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      if (holdTimeout) clearTimeout(holdTimeout);
      document.body.style.overflow = origOverflow;
      startLenis();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-[#050505] text-white flex items-center justify-center p-6 select-none pointer-events-auto"
      role="status"
      aria-label="Loading portfolio"
    >
      {/* Centered compact block */}
      <div className="w-full max-w-[240px] flex flex-col items-center">
        {/* 1. Monogram IDF + IQBALDF wordmark with smooth entrance */}
        <motion.div
          initial={{ y: 14, opacity: 0 }}
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
          <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-neutral-400 mt-3 select-none">
            IQBALDF
          </span>
        </motion.div>

        {/* 2. Compact Progress Bar */}
        <div className="mt-7 w-full h-[2px] rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-[#259B52] origin-left transition-[width] duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 3. Info & Counter Row */}
        <div className="mt-2.5 w-full flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-[0.18em] text-neutral-500 uppercase select-none">
            DATA ANALYST
          </span>
          <span className="text-[11px] font-mono tabular-nums text-neutral-200 select-none">
            {String(progress).padStart(2, '0')}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
