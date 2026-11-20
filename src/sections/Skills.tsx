import { useState, useEffect, useRef, useCallback } from 'react';
import type { PortfolioContent, Language } from '../data/content';
import { SectionTitle, FadeUp, usePrefersReducedMotion } from '../components/ScrollAnimations';
import { Database, FileSpreadsheet, LayoutDashboard, Terminal, Table, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SkillsProps {
  content: PortfolioContent;
  lang?: Language;
}

export function Skills({ content, lang = 'in' }: SkillsProps) {
  const { skills } = content;
  const reducedMotion = usePrefersReducedMotion();

  const [activeTab, setActiveTab] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const sampleDataTag = lang === 'in' ? 'Data contoh' : 'Sample data';

  const modes = [
    {
      id: 'sql',
      name: skills.items[0].title,
      shortName: 'SQL',
      badgeColor: 'tactile-badge-green',
      icon: <Database size={17} strokeWidth={2.2} />,
      item: skills.items[0],
    },
    {
      id: 'excel',
      name: skills.items[1].title,
      shortName: 'Excel',
      badgeColor: 'tactile-badge-blue',
      icon: <FileSpreadsheet size={17} strokeWidth={2.2} />,
      item: skills.items[1],
    },
    {
      id: 'bi',
      name: skills.items[2].title,
      shortName: 'BI',
      badgeColor: 'tactile-badge-yellow',
      icon: <LayoutDashboard size={17} strokeWidth={2.2} />,
      item: skills.items[2],
    },
  ];

  // Auto-switch mode every 8 seconds only before first user interaction, paused on hover/reduced-motion
  useEffect(() => {
    if (hasInteracted || reducedMotion || isHovered) return;

    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % modes.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [hasInteracted, reducedMotion, isHovered, modes.length]);

  const handleSelectTab = useCallback((index: number) => {
    setHasInteracted(true);
    setActiveTab(index);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % modes.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + modes.length) % modes.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = modes.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    handleSelectTab(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  const currentMode = modes[activeTab];

  return (
    <section
      id="skills"
      className="relative w-full py-12 sm:py-16 lg:py-20 scroll-mt-[88px]"
    >
      <div className="site-container">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8 lg:mb-10 text-left">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#2563EB] shadow-xs shrink-0" />
            <span className="text-[12.5px] font-semibold tracking-[0.08em] text-[#6b6b6b] uppercase">
              {skills.sectionLabel}
            </span>
          </div>
          <SectionTitle
            title={skills.headline}
            className="text-[clamp(30px,6.5vw,56px)] font-semibold text-[#111111] leading-[1.08] tracking-[-0.035em] max-w-[760px]"
          />
        </div>

        {/* Console Card */}
        <FadeUp
          className="bento-card p-4.5 sm:p-7 lg:p-8"
          delay={0.1}
        >
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="space-y-5 sm:space-y-6"
          >
            {/* Top: Mode Selector */}
            <div
              role="tablist"
              aria-label={lang === 'in' ? 'Pilihan Mode Analisis' : 'Analytics Mode Selector'}
              className="w-full"
            >
              {/* Mobile (<768px): 3 Equal-width Tabs in 1 row */}
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-[#EEEEEE] border border-black/5 md:hidden">
                {modes.map((mode, idx) => {
                  const isSelected = activeTab === idx;
                  return (
                    <button
                      key={mode.id}
                      ref={(el) => {
                        if (typeof window !== 'undefined' && window.innerWidth < 768) {
                          tabRefs.current[idx] = el;
                        }
                      }}
                      type="button"
                      role="tab"
                      id={`skill-tab-m-${mode.id}`}
                      aria-selected={isSelected}
                      aria-controls={`skill-panel-${mode.id}`}
                      tabIndex={isSelected ? 0 : -1}
                      onClick={() => handleSelectTab(idx)}
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                      className={`min-h-[50px] py-1.5 px-1 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-black/5 text-[#111111] font-semibold'
                          : 'text-[#666666] hover:bg-black/5 active:scale-95'
                      }`}
                    >
                      <div className={`tactile-badge ${mode.badgeColor} w-6 h-6 text-white shrink-0`}>
                        {mode.icon}
                      </div>
                      <span className="text-[12px] truncate">
                        {mode.shortName}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Desktop (≥768px): Grid 3 Columns Equal-Width */}
              <div className="hidden md:grid grid-cols-3 w-full p-1.5 rounded-full bg-[#EEEEEE] border border-black/5 shadow-inner gap-1">
                {modes.map((mode, idx) => {
                  const isSelected = activeTab === idx;
                  return (
                    <button
                      key={mode.id}
                      ref={(el) => {
                        if (typeof window !== 'undefined' && window.innerWidth >= 768) {
                          tabRefs.current[idx] = el;
                        }
                      }}
                      type="button"
                      role="tab"
                      id={`skill-tab-d-${mode.id}`}
                      aria-selected={isSelected}
                      aria-controls={`skill-panel-${mode.id}`}
                      tabIndex={isSelected ? 0 : -1}
                      onClick={() => handleSelectTab(idx)}
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                      className={`w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-full transition-all duration-200 text-[13.5px] lg:text-[14px] font-medium cursor-pointer ${
                        isSelected
                          ? 'bg-white text-[#111111] font-semibold shadow-xs'
                          : 'text-[#666666] hover:text-[#111111]'
                      }`}
                    >
                      <div className={`tactile-badge ${mode.badgeColor} w-6 h-6 shrink-0 text-white`}>
                        {mode.icon}
                      </div>
                      <span className="truncate">{mode.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Area with Constant Panel Height */}
            <div
              role="tabpanel"
              id={`skill-panel-${currentMode.id}`}
              aria-labelledby={`skill-tab-m-${currentMode.id}`}
              className="w-full"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMode.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0.01 : 0.18, ease: 'easeOut' }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[190px] md:min-h-[290px]"
                >
                  {/* Left Column (Full on mobile, Span 5 on desktop): Mode title, description, compact meta table */}
                  <div className="w-full md:col-span-5 flex flex-col justify-between text-left py-1">
                    <div>
                      <h3 className="text-[20px] sm:text-[24px] lg:text-[26px] font-bold text-[#111111] tracking-tight mb-1.5">
                        {currentMode.name}
                      </h3>

                      <p className="text-[13.5px] sm:text-[14.5px] text-[#444444] leading-[1.55] line-clamp-2 max-w-[55ch] mb-4">
                        {currentMode.item.description}
                      </p>
                    </div>

                    {/* Compact Meta Table (Scope, Tools, Level / Used in) with padding 10-12px (py-2.5) */}
                    <div className="border-t border-black/8 divide-y divide-black/8 text-[12.5px] sm:text-[13px]">
                      <div className="py-2.5 flex items-start justify-between gap-4">
                        <span className="text-[11px] font-semibold text-[#777777] uppercase tracking-wider shrink-0 pt-0.5">
                          {skills.metaLabels?.scope || (lang === 'in' ? 'Cakupan' : 'Scope')}
                        </span>
                        <span className="font-medium text-[#222222] text-right">
                          {currentMode.item.scope}
                        </span>
                      </div>
                      <div className="py-2.5 flex items-center justify-between gap-4">
                        <span className="text-[11px] font-semibold text-[#777777] uppercase tracking-wider shrink-0">
                          {skills.metaLabels?.tools || 'Tools'}
                        </span>
                        <div className="flex flex-wrap gap-1.5 justify-end">
                          {currentMode.item.tools.map((tool) => (
                            <span key={tool} className="keycap px-2.5 py-1 text-[11.5px]">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="py-2.5 flex items-center justify-between gap-4">
                        <span className="text-[11px] font-semibold text-[#777777] uppercase tracking-wider shrink-0">
                          {currentMode.item.levelOrUsageLabel}
                        </span>
                        <span className="font-medium text-[#222222] text-right">
                          {currentMode.item.levelOrUsageValue}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (Desktop Only, Span 7, height ≤ 300px): Visual Screen */}
                  <div className="hidden md:flex md:col-span-7 h-[275px] max-h-[300px] overflow-hidden rounded-2xl bg-white border border-black/5 shadow-inner flex-col justify-between">
                    {/* Visual 1: SQL LCD Code Runner */}
                    {activeTab === 0 && (
                      <div className="w-full h-full bg-[#141517] p-4 sm:p-5 font-mono text-[11.5px] text-white/90 flex flex-col justify-between select-none">
                        <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] text-white/50 shrink-0">
                          <span className="flex items-center gap-1.5">
                            <Terminal size={12} className="text-[#10B981]" />
                            <span>query_analysis.sql</span>
                          </span>
                          <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-white/60">
                            {sampleDataTag}
                          </span>
                        </div>

                        <div className="space-y-1 leading-relaxed text-left py-1.5 flex-1 flex flex-col justify-center">
                          <div>
                            <span className="text-[#3B82F6] font-semibold">SELECT</span>{' '}
                            <span>category, </span>
                            <span className="text-[#10B981] font-semibold">COUNT</span>(*) <span className="text-[#3B82F6]">AS</span> count_records,
                          </div>
                          <div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#10B981] font-semibold">SUM</span>(quantity){' '}
                            <span className="text-[#3B82F6]">AS</span> total_units
                          </div>
                          <div>
                            <span className="text-[#3B82F6] font-semibold">FROM</span>{' '}
                            <span className="text-[#F59E0B]">sample_dataset</span>
                          </div>
                          <div>
                            <span className="text-[#3B82F6] font-semibold">WHERE</span> status ={' '}
                            <span className="text-[#10B981]">'active'</span>
                          </div>
                          <div>
                            <span className="text-[#3B82F6] font-semibold">GROUP BY</span> category
                          </div>
                          <div>
                            <span className="text-[#3B82F6] font-semibold">HAVING</span>{' '}
                            <span className="text-[#10B981] font-semibold">SUM</span>(quantity) &gt; 100
                          </div>
                          <div className="flex items-center">
                            <span className="text-[#3B82F6] font-semibold">ORDER BY</span>
                            <span>&nbsp;total_units&nbsp;</span>
                            <span className="text-[#3B82F6] font-semibold">DESC</span>
                            <span className="inline-block w-1.5 h-3 bg-white/90 animate-pulse ml-1" />
                          </div>
                        </div>

                        <div className="pt-2 border-t border-white/10 flex justify-between text-[9.5px] text-white/50 shrink-0">
                          <span>SQL · MySQL syntax</span>
                          <span>{sampleDataTag}</span>
                        </div>
                      </div>
                    )}

                    {/* Visual 2: Excel Generic Pivot Table */}
                    {activeTab === 1 && (
                      <div className="w-full h-full bg-[#FCFCFD] p-4 sm:p-5 flex flex-col justify-between select-none">
                        <div className="flex items-center justify-between pb-2 border-b border-black/5 text-[11px] text-[#666666] shrink-0">
                          <span className="flex items-center gap-1.5 font-semibold text-[#111111]">
                            <Table size={13} className="text-[#2563EB]" />
                            <span>PivotTable_Summary</span>
                          </span>
                          <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-black/5 text-[#666666]">
                            {sampleDataTag}
                          </span>
                        </div>

                        <div className="w-full text-[11.5px] tabular-nums my-auto py-1">
                          <div className="grid grid-cols-4 font-semibold text-[#555555] pb-1.5 border-b border-black/10 text-center">
                            <span className="text-left pl-1">Region</span>
                            <span>Q1</span>
                            <span>Q2</span>
                            <span className="text-right pr-1">Total</span>
                          </div>
                          <div className="grid grid-cols-4 py-1.5 text-[#333333] text-center border-b border-black/5">
                            <span className="text-left pl-1 font-medium text-black">Region A</span>
                            <span>120</span>
                            <span>180</span>
                            <span className="text-right pr-1 font-medium">300</span>
                          </div>
                          <div className="grid grid-cols-4 py-1.5 text-[#333333] text-center border-b border-black/5 items-center">
                            <span className="text-left pl-1 font-medium text-black">Region B</span>
                            <span>240</span>
                            <span className="px-1.5 py-0.5 rounded bg-[#10B981]/15 text-[#047857] font-semibold text-[11px]">
                              310
                            </span>
                            <span className="text-right pr-1 font-medium">550</span>
                          </div>
                          <div className="grid grid-cols-4 py-1.5 text-[#333333] text-center border-b border-black/5">
                            <span className="text-left pl-1 font-medium text-black">Region C</span>
                            <span>95</span>
                            <span>145</span>
                            <span className="text-right pr-1 font-medium">240</span>
                          </div>
                          <div className="grid grid-cols-4 pt-1.5 font-semibold text-[#111111] text-center">
                            <span className="text-left pl-1">Total</span>
                            <span>455</span>
                            <span>635</span>
                            <span className="text-right pr-1 text-[#2563EB]">1,090</span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-black/5 flex justify-between text-[9.5px] text-[#777777] shrink-0">
                          <span>Microsoft Excel · Calculated Fields</span>
                          <span>Data Modeling</span>
                        </div>
                      </div>
                    )}

                    {/* Visual 3: Mini Dashboard */}
                    {activeTab === 2 && (
                      <div className="w-full h-full bg-[#FCFCFD] p-4 sm:p-5 flex flex-col justify-between select-none">
                        <div className="flex items-center justify-between pb-2 border-b border-black/5 text-[11px] text-[#666666] shrink-0">
                          <span className="flex items-center gap-1.5 font-semibold text-[#111111]">
                            <BarChart2 size={13} className="text-[#F59E0B]" />
                            <span>Executive_Metrics_View</span>
                          </span>
                          <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-black/5 text-[#666666]">
                            {sampleDataTag}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 my-auto">
                          <div className="p-1.5 rounded-lg bg-white border border-black/5 text-center">
                            <span className="text-[8.5px] text-[#777777] uppercase font-semibold block">Region A</span>
                            <span className="text-[13px] font-bold text-[#111111] tabular-nums">1,420</span>
                          </div>
                          <div className="p-1.5 rounded-lg bg-white border border-black/5 text-center">
                            <span className="text-[8.5px] text-[#777777] uppercase font-semibold block">Region B</span>
                            <span className="text-[13px] font-bold text-[#10B981] tabular-nums">940</span>
                          </div>
                          <div className="p-1.5 rounded-lg bg-white border border-black/5 text-center">
                            <span className="text-[8.5px] text-[#777777] uppercase font-semibold block">Feeds</span>
                            <span className="text-[13px] font-bold text-[#2563EB] tabular-nums">6 Bands</span>
                          </div>
                        </div>

                        <div className="h-16 w-full flex items-end gap-1.5 px-2 pt-2 bg-white rounded-lg border border-black/5">
                          <div className="flex-1 bg-[#2563EB]/30 rounded-t-xs h-[40%]" />
                          <div className="flex-1 bg-[#2563EB]/50 rounded-t-xs h-[60%]" />
                          <div className="flex-1 bg-[#2563EB]/70 rounded-t-xs h-[50%]" />
                          <div className="flex-1 bg-[#2563EB] rounded-t-xs h-[85%]" />
                          <div className="flex-1 bg-[#F59E0B] rounded-t-xs h-[95%]" />
                          <div className="flex-1 bg-[#10B981] rounded-t-xs h-[75%]" />
                        </div>

                        <div className="pt-2 border-t border-black/5 flex justify-between text-[9.5px] text-[#777777] shrink-0">
                          <span>Google Looker Studio · BI Visuals</span>
                          <span>Git Version Control</span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </FadeUp>

        {/* Soft Skills: single line small text (can wrap) below panel, without card */}
        <FadeUp delay={0.15} className="mt-5 text-center sm:text-left text-[13px] text-[#666666] leading-relaxed">
          <span className="font-semibold text-[#222222]">{skills.softSkillsLabel}: </span>
          <span>{skills.softSkills.join(' · ')}</span>
        </FadeUp>
      </div>
    </section>
  );
}
