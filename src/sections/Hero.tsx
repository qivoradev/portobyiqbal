import { motion } from 'motion/react';
import { AnalyticsConsole } from '../components/AnalyticsConsole';
import { BarChart3, ArrowDown, FileText } from 'lucide-react';
import type { Language, PortfolioContent } from '../data/content';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenCV: () => void;
  lang: Language;
  content: PortfolioContent;
  cvTriggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export function Hero({ onNavigate, onOpenCV, lang, content, cvTriggerRef }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[100svh] pt-18 sm:pt-20 md:pt-22 pb-8 sm:pb-6 px-4 sm:px-6 flex flex-col items-center justify-between select-none"
      aria-label="Introduction and Analytics Console"
    >
      <div className="w-full max-w-[960px] mx-auto flex-1 flex flex-col items-center justify-center text-center my-auto">
        {/* Eyebrow Label */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] sm:text-[13px] font-medium text-[#555555] mb-2 sm:mb-2.5">
          <BarChart3 size={14} className="text-[#333333]" />
          <span>{content.hero.eyebrow}</span>
        </div>

        {/* Big 2-Line Headline (Tight Leading & Tracking, Scaled with Clamp) */}
        <h1 className="text-[clamp(26px,5vw,56px)] font-semibold text-[#111111] leading-[1.08] tracking-[-0.04em] max-w-[800px] mb-4 sm:mb-5">
          {content.hero.headlineLine1} <br />
          <span className="text-[#111111]">{content.hero.headlineLine2}</span>
        </h1>

        {/* Two Equal-Width Pill CTA Buttons (Single Row, 10px Gap, Height ≥ 44px) */}
        <div className="w-full max-w-[320px] sm:max-w-[360px] grid grid-cols-2 gap-2.5 mx-auto mb-7 sm:mb-8">
          {/* Primary: View Projects (Black Pill) */}
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="w-full min-h-[44px] h-11 flex items-center justify-center gap-1.5 px-3 rounded-full bg-[#111111] text-white text-[12.5px] sm:text-[13px] font-medium shadow-xs hover:bg-black/85 active:scale-95 transition-all cursor-pointer"
          >
            <span>{content.hero.ctaProjects}</span>
            <ArrowDown size={14} className="opacity-75 shrink-0" />
          </button>

          {/* Secondary: View CV (White/Outline Pill) */}
          <button
            ref={cvTriggerRef}
            type="button"
            onClick={onOpenCV}
            className="w-full min-h-[44px] h-11 flex items-center justify-center gap-1.5 px-3 rounded-full border border-black/15 bg-white/90 backdrop-blur-sm text-[12.5px] sm:text-[13px] font-medium text-[#111111] shadow-xs hover:bg-white hover:border-black/30 active:scale-95 transition-all cursor-pointer"
          >
            <FileText size={14} className="text-[#555555] shrink-0" />
            <span>{content.hero.ctaCv}</span>
          </button>
        </div>

        {/* Central Stage: Console + 2 Floating Collaborative Cursor Tags */}
        <div className="relative w-full max-w-[580px] px-0.5 sm:px-0">
          {/* Floating Cursor Tag 1 (Purple - Left: SQL · MySQL) — Positioned on top edge of console with ≥ 24px gap from CTA */}
          <motion.div
            animate={{
              y: [-2, 3, -2],
              x: [-1, 1, -1],
            }}
            transition={{
              repeat: Infinity,
              duration: 4.8,
              ease: 'easeInOut',
            }}
            className="absolute -top-4 sm:-top-6 left-1 sm:left-3 z-20 flex items-start pointer-events-none"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="#7A60C3"
              stroke="#FFFFFF"
              strokeWidth="2"
              className="drop-shadow-sm -mr-1"
              aria-hidden="true"
            >
              <path d="M4 4l7 17 2-6 6-2z" />
            </svg>
            <div className="px-2.5 py-0.5 rounded-full bg-[#7A60C3] border border-white/80 shadow-md text-white text-[10px] sm:text-[11px] font-medium tracking-tight whitespace-nowrap">
              {content.hero.cursorLeft}
            </div>
          </motion.div>

          {/* Floating Cursor Tag 2 (Orange - Right: Excel · Looker Studio) */}
          <motion.div
            animate={{
              y: [3, -3, 3],
              x: [1, -1, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 5.2,
              ease: 'easeInOut',
            }}
            className="absolute -top-4 sm:-top-6 right-1 sm:right-3 z-20 flex items-start pointer-events-none"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="#EA580C"
              stroke="#FFFFFF"
              strokeWidth="2"
              className="drop-shadow-sm -mr-1"
              aria-hidden="true"
            >
              <path d="M4 4l7 17 2-6 6-2z" />
            </svg>
            <div className="px-2.5 py-0.5 rounded-full bg-[#EA580C] border border-white/80 shadow-md text-white text-[10px] sm:text-[11px] font-medium tracking-tight whitespace-nowrap">
              {content.hero.cursorRight}
            </div>
          </motion.div>

          {/* Central Hardware Object with Live Data LCD Screen */}
          <AnalyticsConsole onNavigate={onNavigate} lang={lang} content={content.console} />
        </div>
      </div>

      {/* ── Bottom Link Row with 4 Colored Square Bullets (Grid 2x2 on ≤ 400px, flex row on > 400px) ── */}
      <div className="w-full max-w-[800px] mx-auto pt-5 pb-2">
        <div className="grid grid-cols-2 min-[420px]:flex min-[420px]:flex-wrap items-center justify-center gap-x-6 gap-y-2.5 min-[420px]:gap-6 sm:gap-8 md:gap-10 text-[12px] sm:text-[13px] font-medium text-[#444444] justify-items-center">
          {/* Green: Projects */}
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="flex items-center gap-2 hover:text-black transition-colors group cursor-pointer"
          >
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#10B981] group-hover:scale-110 transition-transform shadow-xs shrink-0" />
            <span className="whitespace-nowrap">{content.hero.bottomLinks.projects}</span>
          </button>

          {/* Blue: Skills */}
          <button
            type="button"
            onClick={() => onNavigate('skills')}
            className="flex items-center gap-2 hover:text-black transition-colors group cursor-pointer"
          >
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#2563EB] group-hover:scale-110 transition-transform shadow-xs shrink-0" />
            <span className="whitespace-nowrap">{content.hero.bottomLinks.skills}</span>
          </button>

          {/* Yellow: Credentials */}
          <button
            type="button"
            onClick={() => onNavigate('credentials')}
            className="flex items-center gap-2 hover:text-black transition-colors group cursor-pointer"
          >
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#F59E0B] group-hover:scale-110 transition-transform shadow-xs shrink-0" />
            <span className="whitespace-nowrap">{content.hero.bottomLinks.credentials}</span>
          </button>

          {/* Red: Contact */}
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="flex items-center gap-2 hover:text-black transition-colors group cursor-pointer"
          >
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#EF4444] group-hover:scale-110 transition-transform shadow-xs shrink-0" />
            <span className="whitespace-nowrap">{content.hero.bottomLinks.contact}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
