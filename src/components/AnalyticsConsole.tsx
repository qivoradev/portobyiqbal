import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import type { Language, PortfolioContent } from '../data/content';

interface AnalyticsConsoleProps {
  onNavigate: (sectionId: string) => void;
  lang: Language;
  content: PortfolioContent['console'];
}

type DashboardMetric = 'sales' | 'orders' | 'customers' | 'growth';

export function AnalyticsConsole({ onNavigate, lang, content }: AnalyticsConsoleProps) {
  // Mode: 0 = SQL Query, 1 = Excel Report, 2 = Dashboard
  const [mode, setMode] = useState<number>(2);
  const [activeMetric, setActiveMetric] = useState<DashboardMetric>('sales');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [sqlCharCount, setSqlCharCount] = useState(0);

  const dialRef = useRef<HTMLDivElement>(null);

  // Snap angles for the 3 dial modes: SQL (-35°), Excel (25°), Dashboard (85°)
  const modeAngles = [-35, 25, 85];
  const modeKeys: ('sql' | 'excel' | 'dashboard')[] = ['sql', 'excel', 'dashboard'];
  const currentModeKey = modeKeys[mode];
  const currentModeName = content.modes[currentModeKey];

  // Full SQL query string for typewriter effect
  const sqlQueryFull = `SELECT category, SUM(revenue)\nFROM sample_orders\nGROUP BY 1 ORDER BY 2 DESC;`;

  // Auto-advance mode every 6s until user interacts
  useEffect(() => {
    if (hasInteracted) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const interval = setInterval(() => {
      setMode((prev) => (prev + 1) % 3);
    }, 6000);

    return () => clearInterval(interval);
  }, [hasInteracted]);

  // Typewriter effect for SQL mode
  useEffect(() => {
    if (mode !== 0) {
      setSqlCharCount(0);
      return;
    }
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setSqlCharCount(sqlQueryFull.length);
      return;
    }

    setSqlCharCount(0);
    const step = 2;
    const timer = setInterval(() => {
      setSqlCharCount((prev) => {
        if (prev >= sqlQueryFull.length) {
          clearInterval(timer);
          return prev;
        }
        return Math.min(prev + step, sqlQueryFull.length);
      });
    }, 35);

    return () => clearInterval(timer);
  }, [mode, sqlQueryFull.length]);

  const advanceMode = useCallback((direction: 1 | -1 = 1) => {
    setHasInteracted(true);
    setMode((prev) => (prev + direction + 3) % 3);
  }, []);

  const handleDialClick = () => {
    advanceMode(1);
  };

  const handleDialWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      advanceMode(1);
    } else if (e.deltaY < 0) {
      advanceMode(-1);
    }
  };

  const handleDialKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      advanceMode(1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      advanceMode(-1);
    }
  };

  const handleMetricSelect = (metric: DashboardMetric) => {
    setHasInteracted(true);
    setActiveMetric(metric);
    if (mode !== 2) {
      setMode(2);
    }
  };

  const projectsLabel = lang === 'in' ? 'Proyek' : 'Projects';
  const aboutLabel = lang === 'in' ? 'Tentang' : 'About';

  // Common LCD Screen Component rendered in both desktop and mobile layouts
  const renderLcdScreen = (isMobile = false) => (
    <div
      className={`relative w-full ${
        isMobile ? 'h-[92px]' : 'max-w-[250px] sm:max-w-[270px] h-[98px] sm:h-[108px]'
      } rounded-2xl bg-[#141517] border border-black/40 shadow-[inset_0_3px_6px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.8)] p-2.5 flex flex-col justify-between overflow-hidden select-none`}
      aria-live="polite"
    >
      {/* Top Status */}
      <div className="flex items-center justify-between text-[9px] font-mono border-b border-white/10 pb-1">
        <span className="text-[#10B981] font-semibold">
          {mode === 0 ? '[SQL_CONSOLE]' : mode === 1 ? '[XLS_SHEET]' : `[DSH:${activeMetric.toUpperCase()}]`}
        </span>
        <span className="text-white/40 tracking-tight">{content.sampleData}</span>
      </div>

      {/* Screen Body */}
      <div className="flex-1 flex flex-col justify-center py-0.5">
        {mode === 0 && (
          <div className="font-mono text-[9px] text-[#E4E4E7] leading-tight select-text overflow-hidden">
            <pre className="whitespace-pre-wrap font-mono">
              {sqlQueryFull.slice(0, sqlCharCount)}
              <span className="inline-block w-1.5 h-2 bg-[#10B981] ml-0.5 animate-pulse" />
            </pre>
          </div>
        )}

        {mode === 1 && (
          <div className="w-full text-[8px] sm:text-[8.5px] font-mono text-[#D4D4D8]">
            <div className="grid grid-cols-3 text-white/50 border-b border-white/10 pb-0.5">
              <span>CAT</span>
              <span className="text-right">TGT</span>
              <span className="text-right">ACTUAL</span>
            </div>
            <div className="grid grid-cols-3 py-0.5 border-b border-white/5">
              <span className="text-white">Retail</span>
              <span className="text-right text-white/70">120M</span>
              <span className="text-right text-[#10B981] font-semibold">134M</span>
            </div>
            <div className="grid grid-cols-3 py-0.5 border-b border-white/5">
              <span className="text-white">Direct</span>
              <span className="text-right text-white/70">85M</span>
              <span className="text-right text-white/90">92M</span>
            </div>
            <div className="grid grid-cols-3 pt-0.5 text-[#38BDF8] font-bold">
              <span>SUM</span>
              <span className="text-right">205M</span>
              <span className="text-right">226M</span>
            </div>
          </div>
        )}

        {mode === 2 && (
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col">
              <span className="text-[8.5px] uppercase font-mono tracking-wider text-white/60">
                {content.metrics[activeMetric]}
              </span>
              <span className="text-[16px] sm:text-[18px] font-bold tracking-tight text-white font-mono leading-none my-0.5">
                {activeMetric === 'sales' && 'Rp 482.5M'}
                {activeMetric === 'orders' && '5,240'}
                {activeMetric === 'customers' && '1,420'}
                {activeMetric === 'growth' && '+14.6%'}
              </span>
              <span className="text-[8px] text-[#10B981] font-medium font-mono">
                {activeMetric === 'sales' && '+12.4% MoM'}
                {activeMetric === 'orders' && '+8.2% MoM'}
                {activeMetric === 'customers' && '+5.1% MoM'}
                {activeMetric === 'growth' && 'Q4 Target Met'}
              </span>
            </div>

            {/* Minimal SVG Graphic */}
            <div className="w-16 h-10 flex items-end justify-center shrink-0">
              {activeMetric === 'sales' && (
                <div className="flex items-end gap-1 h-7 w-full justify-end">
                  <div className="w-2 bg-white/20 rounded-xs" style={{ height: '40%' }} />
                  <div className="w-2 bg-white/30 rounded-xs" style={{ height: '65%' }} />
                  <div className="w-2 bg-white/20 rounded-xs" style={{ height: '50%' }} />
                  <div className="w-2 bg-[#2563EB] rounded-xs shadow-xs" style={{ height: '95%' }} />
                </div>
              )}
              {activeMetric === 'orders' && (
                <div className="flex items-end gap-1 h-7 w-full justify-end">
                  <div className="w-2 bg-white/20 rounded-xs" style={{ height: '55%' }} />
                  <div className="w-2 bg-white/30 rounded-xs" style={{ height: '70%' }} />
                  <div className="w-2 bg-[#10B981] rounded-xs shadow-xs" style={{ height: '90%' }} />
                  <div className="w-2 bg-white/40 rounded-xs" style={{ height: '80%' }} />
                </div>
              )}
              {activeMetric === 'customers' && (
                <svg viewBox="0 0 70 30" className="w-full h-7 overflow-visible">
                  <path
                    d="M 2 22 Q 20 26, 35 14 T 66 5"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="66" cy="5" r="3" fill="#EF4444" />
                </svg>
              )}
              {activeMetric === 'growth' && (
                <svg viewBox="0 0 70 30" className="w-full h-7 overflow-visible">
                  <path
                    d="M 2 24 L 22 24 L 22 16 L 44 16 L 44 6 L 68 6"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="68" cy="6" r="3" fill="#F59E0B" />
                </svg>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative w-full max-w-[580px] mx-auto select-none">
      {/* ── DESKTOP LAYOUT (≥ md): Unchanged Horizontal 3-Column Chassis ── */}
      <div className="hidden md:flex relative w-full h-[285px] lg:h-[295px] bg-gradient-to-b from-[#FDFDFD] via-[#F4F4F4] to-[#EBEBEB] rounded-[56px] p-6 items-center justify-between border border-black/10 shadow-[0_24px_50px_-15px_rgba(0,0,0,0.16),0_10px_20px_-8px_rgba(0,0,0,0.08),inset_0_2px_2px_rgba(255,255,255,0.9),inset_0_-3px_5px_rgba(0,0,0,0.06)]">
        <div className="absolute top-1.5 left-10 right-10 h-[1.5px] bg-white/80 rounded-full pointer-events-none" />

        {/* Left: Mode Dial */}
        <div className="flex flex-col items-center justify-center pl-2">
          <div
            ref={dialRef}
            role="slider"
            tabIndex={0}
            aria-valuemin={0}
            aria-valuemax={2}
            aria-valuenow={mode}
            aria-valuetext={currentModeName}
            aria-label="Console Mode Selector Dial"
            onClick={handleDialClick}
            onWheel={handleDialWheel}
            onKeyDown={handleDialKeyDown}
            className="group relative w-24 h-24 lg:w-26 lg:h-26 rounded-full bg-gradient-to-b from-[#F2F2F2] to-[#D8D8D8] border border-black/15 shadow-[0_8px_16px_rgba(0,0,0,0.12),inset_0_2px_3px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.12)] flex items-center justify-center cursor-pointer transition-transform active:scale-95 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-black"
            title="Click, scroll, or use arrow keys to rotate dial"
          >
            <div className="absolute inset-1 rounded-full border border-dashed border-black/20" />
            <motion.div
              animate={{ rotate: modeAngles[mode] }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              className="relative w-16 h-16 lg:w-18 lg:h-18 rounded-full bg-gradient-to-b from-[#EAEAEA] to-[#CCCCCC] shadow-[inset_0_2px_3px_rgba(255,255,255,0.8),0_3px_6px_rgba(0,0,0,0.14)] flex items-center justify-center"
            >
              <div className="absolute top-1 w-1.5 h-3.5 bg-[#111827] rounded-full shadow-xs" />
              <div className="w-5 h-5 rounded-full bg-gradient-to-b from-[#DDDDDD] to-[#BFBFBF] border border-black/10 shadow-inner flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-black/30" />
              </div>
            </motion.div>
          </div>
          <span className="text-[10px] font-semibold text-[#888888] tracking-widest mt-2 uppercase">
            Mode Dial
          </span>
        </div>

        {/* Center: LCD + Buttons */}
        <div className="flex-1 flex flex-col items-center justify-between h-full py-2 px-3">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#222222] tracking-wider uppercase mb-1">
            <span className="text-[#888888]">{content.modeLabel}:</span>
            <span aria-live="polite" className="text-black">
              {currentModeName}
            </span>
          </div>

          {renderLcdScreen(false)}

          {/* Two Functional Capsule Buttons */}
          <div className="flex items-center gap-5 mt-2 mb-0.5">
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="group flex flex-col items-center gap-1 cursor-pointer focus:outline-hidden"
              aria-label={`Scroll to ${projectsLabel}`}
            >
              <div className="w-8 h-12 rounded-full bg-gradient-to-b from-[#2E2E2E] to-[#141414] shadow-[0_5px_10px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-2px_2px_rgba(0,0,0,0.4)] transition-all active:translate-y-1 active:shadow-[0_2px_4px_rgba(0,0,0,0.3)] group-hover:from-[#3A3A3A]" />
              <span className="text-[11px] font-semibold text-[#444444] tracking-tight group-hover:text-black transition-colors">
                {projectsLabel}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('about')}
              className="group flex flex-col items-center gap-1 cursor-pointer focus:outline-hidden"
              aria-label={`Scroll to ${aboutLabel}`}
            >
              <div className="w-8 h-12 rounded-full bg-gradient-to-b from-[#2E2E2E] to-[#141414] shadow-[0_5px_10px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-2px_2px_rgba(0,0,0,0.4)] transition-all active:translate-y-1 active:shadow-[0_2px_4px_rgba(0,0,0,0.3)] group-hover:from-[#3A3A3A]" />
              <span className="text-[11px] font-semibold text-[#444444] tracking-tight group-hover:text-black transition-colors">
                {aboutLabel}
              </span>
            </button>
          </div>
        </div>

        {/* Right: Metrics Matrix */}
        <div className="flex flex-col items-center justify-center pr-2">
          <div className="relative w-28 h-28 lg:w-30 lg:h-30 rounded-full bg-gradient-to-b from-[#383838] to-[#242424] border border-black/30 shadow-[inset_0_4px_8px_rgba(0,0,0,0.6),0_5px_14px_rgba(0,0,0,0.15)] flex items-center justify-center p-2">
            <div className="relative w-full h-full">
              {/* x: Sales */}
              <button
                type="button"
                onClick={() => handleMetricSelect('sales')}
                className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer focus:outline-hidden"
                aria-label="Sales Metric (Blue x)"
                title="Sales Metric (x)"
              >
                <div
                  className={`w-7.5 h-7.5 rounded-full bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] border border-white/20 shadow-[0_3px_6px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.5)] flex items-center justify-center text-white text-[11px] font-bold active:translate-y-0.5 active:shadow-xs transition-transform ${
                    mode === 2 && activeMetric === 'sales' ? 'ring-2 ring-white/80' : ''
                  }`}
                >
                  x
                </div>
              </button>

              {/* y: Orders */}
              <button
                type="button"
                onClick={() => handleMetricSelect('orders')}
                className="absolute top-1/2 left-0 -translate-y-1/2 flex flex-col items-center cursor-pointer focus:outline-hidden"
                aria-label="Orders Metric (Green y)"
                title="Orders Metric (y)"
              >
                <div
                  className={`w-7.5 h-7.5 rounded-full bg-gradient-to-b from-[#10B981] to-[#047857] border border-white/20 shadow-[0_3px_6px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.5)] flex items-center justify-center text-white text-[11px] font-bold active:translate-y-0.5 active:shadow-xs transition-transform ${
                    mode === 2 && activeMetric === 'orders' ? 'ring-2 ring-white/80' : ''
                  }`}
                >
                  y
                </div>
              </button>

              {/* a: Customers */}
              <button
                type="button"
                onClick={() => handleMetricSelect('customers')}
                className="absolute top-1/2 right-0 -translate-y-1/2 flex flex-col items-center cursor-pointer focus:outline-hidden"
                aria-label="Customers Metric (Red a)"
                title="Customers Metric (a)"
              >
                <div
                  className={`w-7.5 h-7.5 rounded-full bg-gradient-to-b from-[#EF4444] to-[#B91C1C] border border-white/20 shadow-[0_3px_6px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.5)] flex items-center justify-center text-white text-[11px] font-bold active:translate-y-0.5 active:shadow-xs transition-transform ${
                    mode === 2 && activeMetric === 'customers' ? 'ring-2 ring-white/80' : ''
                  }`}
                >
                  a
                </div>
              </button>

              {/* b: Growth */}
              <button
                type="button"
                onClick={() => handleMetricSelect('growth')}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer focus:outline-hidden"
                aria-label="Growth Metric (Yellow b)"
                title="Growth Metric (b)"
              >
                <div
                  className={`w-7.5 h-7.5 rounded-full bg-gradient-to-b from-[#F59E0B] to-[#B45309] border border-white/20 shadow-[0_3px_6px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.5)] flex items-center justify-center text-white text-[11px] font-bold active:translate-y-0.5 active:shadow-xs transition-transform ${
                    mode === 2 && activeMetric === 'growth' ? 'ring-2 ring-white/80' : ''
                  }`}
                >
                  b
                </div>
              </button>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-[#888888] tracking-widest mt-2 uppercase">
            Metrics Matrix
          </span>
        </div>
      </div>

      {/* ── MOBILE LAYOUT (< md): Vertical Stack with Everything Inside Rounded Chassis ── */}
      <div className="flex md:hidden flex-col w-full bg-gradient-to-b from-[#FDFDFD] via-[#F4F4F4] to-[#EBEBEB] rounded-[36px] p-4 border border-black/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15),inset_0_2px_2px_rgba(255,255,255,0.9)]">
        {/* Top: Mode Label + Full-Width LCD Screen */}
        <div className="w-full flex items-center justify-between mb-2 px-1">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#222222] tracking-wider uppercase">
            <span className="text-[#888888]">{content.modeLabel}:</span>
            <span aria-live="polite" className="text-black font-semibold">
              {currentModeName}
            </span>
          </div>
          <span className="text-[9px] font-mono text-[#888888] tracking-tight">iqbaldf hardware</span>
        </div>

        {renderLcdScreen(true)}

        {/* Bottom Controls Row: Dial (left) | Capsule Buttons (center) | Action Matrix (right) */}
        <div className="w-full flex items-center justify-between pt-3 px-1">
          {/* Dial (left) */}
          <div className="flex flex-col items-center">
            <div
              role="slider"
              tabIndex={0}
              aria-valuemin={0}
              aria-valuemax={2}
              aria-valuenow={mode}
              aria-valuetext={currentModeName}
              aria-label="Mobile Mode Dial"
              onClick={handleDialClick}
              className="relative w-15 h-15 rounded-full bg-gradient-to-b from-[#F2F2F2] to-[#D8D8D8] border border-black/15 shadow-[0_4px_10px_rgba(0,0,0,0.12),inset_0_2px_2px_rgba(255,255,255,0.9)] flex items-center justify-center cursor-pointer active:scale-95"
            >
              <div className="absolute inset-1 rounded-full border border-dashed border-black/20" />
              <motion.div
                animate={{ rotate: modeAngles[mode] }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                className="relative w-10 h-10 rounded-full bg-gradient-to-b from-[#EAEAEA] to-[#CCCCCC] shadow-[inset_0_2px_3px_rgba(255,255,255,0.8),0_2px_5px_rgba(0,0,0,0.14)] flex items-center justify-center"
              >
                <div className="absolute top-0.5 w-1 h-2.5 bg-[#111827] rounded-full" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#DDDDDD] border border-black/10 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-black/30" />
                </div>
              </motion.div>
            </div>
            <span className="text-[8.5px] font-semibold text-[#888888] tracking-wider mt-1 uppercase">
              Dial
            </span>
          </div>

          {/* Capsule Buttons (center) */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="group flex flex-col items-center gap-0.5 cursor-pointer focus:outline-hidden"
              aria-label={`Scroll to ${projectsLabel}`}
            >
              <div className="w-6 h-10 rounded-full bg-gradient-to-b from-[#2E2E2E] to-[#141414] shadow-[0_4px_8px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] active:translate-y-0.5" />
              <span className="text-[9.5px] font-semibold text-[#444444]">
                {projectsLabel}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('about')}
              className="group flex flex-col items-center gap-0.5 cursor-pointer focus:outline-hidden"
              aria-label={`Scroll to ${aboutLabel}`}
            >
              <div className="w-6 h-10 rounded-full bg-gradient-to-b from-[#2E2E2E] to-[#141414] shadow-[0_4px_8px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] active:translate-y-0.5" />
              <span className="text-[9.5px] font-semibold text-[#444444]">
                {aboutLabel}
              </span>
            </button>
          </div>

          {/* Action Matrix (right) — Perfectly sized, no overflow! */}
          <div className="flex flex-col items-center">
            <div className="relative w-18 h-18 rounded-full bg-gradient-to-b from-[#383838] to-[#242424] border border-black/30 shadow-[inset_0_3px_6px_rgba(0,0,0,0.6)] flex items-center justify-center p-1.5">
              <div className="relative w-full h-full">
                {/* x: Sales */}
                <button
                  type="button"
                  onClick={() => handleMetricSelect('sales')}
                  className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center"
                  aria-label="Sales Metric"
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] flex items-center justify-center text-white text-[9px] font-bold ${
                      mode === 2 && activeMetric === 'sales' ? 'ring-1.5 ring-white' : ''
                    }`}
                  >
                    x
                  </div>
                </button>

                {/* y: Orders */}
                <button
                  type="button"
                  onClick={() => handleMetricSelect('orders')}
                  className="absolute top-1/2 left-0 -translate-y-1/2 flex items-center justify-center"
                  aria-label="Orders Metric"
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-gradient-to-b from-[#10B981] to-[#047857] flex items-center justify-center text-white text-[9px] font-bold ${
                      mode === 2 && activeMetric === 'orders' ? 'ring-1.5 ring-white' : ''
                    }`}
                  >
                    y
                  </div>
                </button>

                {/* a: Customers */}
                <button
                  type="button"
                  onClick={() => handleMetricSelect('customers')}
                  className="absolute top-1/2 right-0 -translate-y-1/2 flex items-center justify-center"
                  aria-label="Customers Metric"
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-gradient-to-b from-[#EF4444] to-[#B91C1C] flex items-center justify-center text-white text-[9px] font-bold ${
                      mode === 2 && activeMetric === 'customers' ? 'ring-1.5 ring-white' : ''
                    }`}
                  >
                    a
                  </div>
                </button>

                {/* b: Growth */}
                <button
                  type="button"
                  onClick={() => handleMetricSelect('growth')}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center"
                  aria-label="Growth Metric"
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-gradient-to-b from-[#F59E0B] to-[#B45309] flex items-center justify-center text-white text-[9px] font-bold ${
                      mode === 2 && activeMetric === 'growth' ? 'ring-1.5 ring-white' : ''
                    }`}
                  >
                    b
                  </div>
                </button>
              </div>
            </div>
            <span className="text-[8.5px] font-semibold text-[#888888] tracking-wider mt-1 uppercase">
              Matrix
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
