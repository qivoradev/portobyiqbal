import { useState, useEffect, useRef, useCallback } from 'react';
import type { PortfolioContent, Language } from '../data/content';
import { SectionTitle, FadeUp, usePrefersReducedMotion } from '../components/ScrollAnimations';
import { Database, FileSpreadsheet, LayoutDashboard, Terminal, Table, BarChart2, Check } from 'lucide-react';
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
      icon: <Database size={18} strokeWidth={2.2} />,
      item: skills.items[0],
    },
    {
      id: 'excel',
      name: skills.items[1].title,
      shortName: 'Excel',
      badgeColor: 'tactile-badge-blue',
      icon: <FileSpreadsheet size={18} strokeWidth={2.2} />,
      item: skills.items[1],
    },
    {
      id: 'bi',
      name: skills.items[2].title,
      shortName: 'BI',
      badgeColor: 'tactile-badge-yellow',
      icon: <LayoutDashboard size={18} strokeWidth={2.2} />,
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

  // Keyboard navigation for tablist (ArrowLeft, ArrowRight, Home, End)
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
        {/* Uniform Section Header (mb-8 sm:mb-10 lg:mb-12) */}
        <div className="mb-8 sm:mb-10 lg:mb-12 text-left">
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

        {/* Exactly ONE Large Console Card with 3 Modes */}
        <FadeUp
          className="bento-card p-5 sm:p-7 lg:p-9"
          delay={0.1}
        >
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="space-y-6 sm:space-y-8"
          >
            {/* Top: Mode Selector */}
            <div
              role="tablist"
              aria-label={lang === 'in' ? 'Pilihan Mode Analisis' : 'Analytics Mode Selector'}
              className="w-full"
            >
              {/* 1. Mobile (<768px): 3 EQUAL-WIDTH Tabs in a Single Row (Grid 3 cols, NO scroll) */}
              <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-[#EEEEEE] border border-black/5 md:hidden">
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
                      className={`min-h-[58px] py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-black/5 text-[#111111]'
                          : 'text-[#666666] hover:bg-black/5 active:scale-95'
                      }`}
                    >
                      <div className={`tactile-badge ${mode.badgeColor} w-8 h-8 text-white shadow-xs`}>
                        {mode.icon}
                      </div>
                      <span className="text-[12px] font-semibold tracking-tight truncate">
                        {mode.shortName}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* 2. Desktop (≥768px): Grid 3 Columns EQUAL-WIDTH, Total Width = Bar Width */}
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

            {/* Content Area with Fixed Height Visual Screen */}
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
                  transition={{ duration: reducedMotion ? 0.01 : 0.22, ease: 'easeOut' }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-h-[340px] lg:min-h-[380px]"
                >
                  {/* Left Column (Span 5 on desktop): Balanced content with Hairline Meta Table */}
                  <div className="lg:col-span-5 flex flex-col justify-between py-1 text-left min-h-[300px] lg:min-h-[360px]">
                    <div>
                      {/* Mode Header Row: "1 / 3" Indicator in corner */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[12px] font-mono font-medium text-[#777777] px-2 py-0.5 rounded bg-black/5 tabular-nums">
                          {`${activeTab + 1} / ${modes.length}`}
                        </span>
                      </div>

                      <h3 className="text-[24px] sm:text-[28px] lg:text-[30px] font-semibold text-[#111111] tracking-tight mb-2">
                        {currentMode.name}
                      </h3>

                      <p className="text-[14.5px] sm:text-[15px] text-[#444444] leading-[1.6] line-clamp-2 max-w-[55ch] mb-5">
                        {currentMode.item.description}
                      </p>
                    </div>

                    {/* Hairline Meta Table (Scope, Tools, Level / Used in) */}
                    <div className="border-t border-black/8 divide-y divide-black/8 text-[13px] sm:text-[13.5px] mt-auto">
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
                            <span key={tool} className="keycap px-2.5 py-1 text-[12px]">
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

                  {/* Right Column (Span 7 on desktop): Fixed Height Screen */}
                  <div className="lg:col-span-7 h-[250px] sm:h-[280px] lg:h-auto lg:min-h-[360px] overflow-hidden rounded-2xl bg-white border border-black/5 shadow-inner flex flex-col justify-between">
                    {/* Visual 1: SQL LCD Code Runner */}
                    {activeTab === 0 && (
                      <div className="w-full h-full bg-[#141517] p-4 sm:p-5 font-mono text-[11.5px] sm:text-[12px] text-white/90 flex flex-col justify-between select-none">
                        <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] text-white/50 shrink-0">
                          <span className="flex items-center gap-1.5">
                            <Terminal size={12} className="text-[#10B981]" />
                            <span>query_analysis.sql</span>
                          </span>
                          <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-white/60">
                            {sampleDataTag}
                          </span>
                        </div>

                        {/* Explicit Spaces in SQL Syntax Highlight */}
                        <div className="space-y-1 sm:space-y-1.5 leading-relaxed text-left py-1.5 flex-1 flex flex-col justify-center">
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

                        <div className="w-full text-[11.5px] sm:text-[12.5px] tabular-nums my-auto py-1">
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
                            <span className="text-[13px] sm:text-[14px] font-bold text-[#111111] tabular-nums">1,420</span>
                          </div>
                          <div className="p-1.5 rounded-lg bg-white border border-black/5 text-center">
                            <span className="text-[8.5px] text-[#777777] uppercase font-semibold block">Region B</span>
                            <span className="text-[13px] sm:text-[14px] font-bold text-[#10B981] tabular-nums">940</span>
                          </div>
                          <div className="p-1.5 rounded-lg bg-white border border-black/5 text-center">
                            <span className="text-[8.5px] text-[#777777] uppercase font-semibold block">Feeds</span>
                            <span className="text-[13px] sm:text-[14px] font-bold text-[#2563EB] tabular-nums">6 Bands</span>
                          </div>
                        </div>

                        <div className="h-16 sm:h-20 w-full flex items-end gap-1.5 px-2 pt-2 bg-white rounded-lg border border-black/5">
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

        {/* Soft Skills DIRECT on Background (NO Card, 3 items with checkmarks) */}
        <FadeUp delay={0.2} className="mt-8 pt-5 border-t border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[14px]">
          <span className="font-semibold text-black uppercase tracking-[0.08em] text-[12px] shrink-0 text-left">
            {skills.softSkillsLabel}:
          </span>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[#444444]">
            {skills.softSkills.map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5 font-medium text-[13.5px]">
                <Check size={14} className="text-[#10B981] shrink-0" strokeWidth={2.5} />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
