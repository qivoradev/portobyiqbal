import { useState, useRef, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import type { PortfolioContent, Language } from '../data/content';
import { FadeUp, usePrefersReducedMotion } from '../components/ScrollAnimations';

interface SkillsProps {
  content: PortfolioContent;
  lang?: Language;
}

export function Skills({ content }: SkillsProps) {
  const { skills } = content;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const reducedMotion = usePrefersReducedMotion();

  const desktopTabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileTabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const items = skills.items;
  const activeSkill = items[activeIndex] ?? items[0];

  const handleTabKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    index: number,
    orientation: 'vertical' | 'horizontal'
  ) => {
    const prevKey = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';
    const nextKey = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';
    let nextIndex: number | null = null;

    if (e.key === nextKey) {
      nextIndex = (index + 1) % items.length;
    } else if (e.key === prevKey) {
      nextIndex = (index - 1 + items.length) % items.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = items.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      setActiveIndex(nextIndex);
      const refs = orientation === 'vertical' ? desktopTabRefs : mobileTabRefs;
      refs.current[nextIndex]?.focus();
    }
  };

  return (
    <section
      id="skills"
      className="relative w-full bg-[#F5F5F5] text-[#111111] pt-6 pb-20 md:pt-10 md:pb-28 scroll-mt-24"
    >
      <div className="site-container">
        {/* A. Asymmetric 2-Column Editorial Header (No Cliché Eyebrow) */}
        <FadeUp className="max-w-5xl mx-auto mb-8 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-3">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-950 text-left">
            {skills.headline}
          </h2>
          <p className="text-sm text-neutral-600 max-w-sm md:text-right leading-relaxed text-left">
            {skills.subtitle}
          </p>
        </FadeUp>

        {/* B. Interactive Workflow Stage */}
        <FadeUp delay={0.08} className="max-w-5xl mx-auto">
          {/* Mobile Segmented Control (1 row, 3 compact tabs) */}
          <div
            role="tablist"
            aria-label={skills.headline}
            aria-orientation="horizontal"
            className="grid md:hidden grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#E4E5E7] border border-black/[0.06] mb-3"
          >
            {items.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    mobileTabRefs.current[idx] = el;
                  }}
                  id={`skill-tab-mobile-${item.id}`}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={`skill-panel-${item.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIndex(idx)}
                  onKeyDown={(e) => handleTabKeyDown(e, idx, 'horizontal')}
                  className={`relative text-xs font-semibold py-2.5 px-1.5 rounded-lg transition-colors cursor-pointer text-center whitespace-nowrap ${
                    isActive ? 'text-white' : 'text-neutral-700 hover:text-neutral-950'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-skill-tab-mobile"
                      transition={
                        reducedMotion
                          ? { duration: 0.01 }
                          : { type: 'spring', stiffness: 420, damping: 34 }
                      }
                      className="absolute inset-0 rounded-lg bg-[#0A0A0A] shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{item.shortTitle}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 items-stretch">
            {/* Desktop Tactile Vertical Tab Rail */}
            <div
              role="tablist"
              aria-label={skills.headline}
              aria-orientation="vertical"
              className="hidden md:flex md:col-span-5 flex-col gap-2.5"
            >
              {items.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      desktopTabRefs.current[idx] = el;
                    }}
                    id={`skill-tab-desktop-${item.id}`}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    aria-controls={`skill-panel-${item.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveIndex(idx)}
                    onKeyDown={(e) => handleTabKeyDown(e, idx, 'vertical')}
                    className={`group relative w-full text-left rounded-2xl p-5 transition-colors cursor-pointer border flex-1 flex items-center ${
                      isActive
                        ? 'border-black text-white bg-transparent'
                        : 'bg-[#E8E9EB] hover:bg-[#DFDFE2] border-black/[0.06] text-neutral-900'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-skill-tab"
                        transition={
                          reducedMotion
                            ? { duration: 0.01 }
                            : { type: 'spring', stiffness: 420, damping: 34 }
                        }
                        className="absolute inset-0 rounded-[15px] bg-[#0A0A0A]"
                      />
                    )}

                    <div className="relative z-10 w-full flex items-center justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`text-[11px] font-mono font-medium tracking-wider transition-colors ${
                              isActive ? 'text-neutral-400' : 'text-neutral-500'
                            }`}
                          >
                            {item.index}
                          </span>
                          {isActive && (
                            <span
                              className="w-2 h-2 rounded-full bg-[#259B52] shrink-0"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                        <div
                          className={`text-base lg:text-[17px] font-semibold tracking-tight mt-1 transition-colors ${
                            isActive ? 'text-white' : 'text-neutral-900'
                          }`}
                        >
                          {item.title}
                        </div>
                        <div
                          className={`text-xs mt-0.5 leading-snug transition-colors ${
                            isActive ? 'text-neutral-400' : 'text-neutral-500'
                          }`}
                        >
                          {item.role}
                        </div>
                      </div>

                      <ArrowRight
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                        className={`shrink-0 transition-all duration-200 ${
                          isActive
                            ? 'text-white/85 translate-x-0 opacity-100'
                            : 'text-neutral-500 -translate-x-1 opacity-0 group-hover:opacity-60 group-hover:translate-x-0'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dark Stage Detail Panel */}
            <div className="md:col-span-7">
              <div
                id={`skill-panel-${activeSkill.id}`}
                role="tabpanel"
                aria-labelledby={`skill-tab-desktop-${activeSkill.id} skill-tab-mobile-${activeSkill.id}`}
                className="rounded-2xl bg-[#0A0A0A] text-white border border-black/15 p-6 md:p-8 flex flex-col justify-between min-h-[310px] md:min-h-[340px] h-full relative overflow-hidden text-left"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSkill.id}
                    initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                    transition={{
                      duration: reducedMotion ? 0.01 : 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex flex-col justify-between flex-1 h-full"
                  >
                    <div>
                      {/* 1. Top Row: Step label + Emerald dot */}
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-2 h-2 rounded-full bg-[#259B52] shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-[11px] font-mono tracking-[0.16em] text-neutral-400 uppercase">
                          {activeSkill.stepLabel}
                        </span>
                      </div>

                      {/* 2. Tool Title & Concrete Focus */}
                      <h3 className="text-2xl md:text-[26px] font-bold tracking-tight text-white mt-2">
                        {activeSkill.title}
                      </h3>
                      <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
                        {activeSkill.focus}
                      </p>

                      {/* 3. 3 Real Technical Capabilities */}
                      <ul className="mt-5 space-y-2.5">
                        {activeSkill.capabilities.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-3 border-t border-white/[0.07] pt-2.5 text-[13.5px] md:text-sm text-neutral-200 leading-relaxed"
                          >
                            <span
                              className="w-3 h-[1.5px] bg-[#259B52] mt-[10px] shrink-0 rounded-full"
                              aria-hidden="true"
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 4. Bottom Row: Verified Output Proof */}
                    <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4">
                      <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-neutral-500 shrink-0">
                        {skills.keyOutputLabel}
                      </span>
                      <span className="text-xs md:text-[13px] text-neutral-200 font-medium sm:text-right leading-snug">
                        {activeSkill.keyOutput}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
