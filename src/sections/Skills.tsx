import type { PortfolioContent, Language } from '../data/content';
import { SectionTitle, FadeUp } from '../components/ScrollAnimations';
import { Database, FileSpreadsheet, LayoutDashboard, Terminal, Table, BarChart2, Users, CheckCircle2 } from 'lucide-react';

interface SkillsProps {
  content: PortfolioContent;
  lang?: Language;
}

export function Skills({ content, lang = 'in' }: SkillsProps) {
  const { skills } = content;
  const illustrativeTag = lang === 'in' ? 'Ilustrasi' : 'Illustrative';

  return (
    <section
      id="skills"
      className="relative w-full py-10 sm:py-14 px-4 sm:px-6 scroll-mt-[88px]"
    >
      <div className="w-full max-w-[1080px] mx-auto space-y-5 sm:space-y-6">
        {/* Section Header */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#2563EB] shadow-xs shrink-0" />
            <span className="text-[12.5px] font-semibold tracking-[0.08em] text-[#6b6b6b] uppercase">
              {skills.sectionLabel}
            </span>
          </div>

          <SectionTitle
            title={skills.headline}
            className="text-[28px] sm:text-[38px] md:text-[42px] font-semibold text-[#111111] leading-[1.1] tracking-[-0.035em] max-w-[760px]"
          />
        </div>

        {/* 12-Column Bento Grid:
            Desktop: Left Card (Span 5, 2-Rows Tall) | Right Top (Span 7) | Right Bottom (Span 7)
            Mobile: 1 Column
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* 1. SQL & Database Bento Card (Span 5, Tall 2 Rows) */}
          <FadeUp className="lg:col-span-5 bento-card p-6 sm:p-8 flex flex-col justify-between group">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="tactile-badge tactile-badge-green">
                  <Database size={20} strokeWidth={2.2} />
                </div>
                <span className="text-[12px] font-semibold tracking-[0.08em] text-[#6b6b6b] uppercase">
                  MODE 01 · SQL
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-[24px] sm:text-[26px] font-semibold text-[#111111] tracking-tight">
                  {skills.items[0].title}
                </h3>
                <p className="text-[15.5px] sm:text-[16px] text-[#3f3f3f] leading-[1.6] line-clamp-2">
                  {skills.items[0].description}
                </p>
              </div>

              {/* Tools Keycaps */}
              <div className="flex flex-wrap gap-2 pt-1">
                {skills.items[0].tools.map((tool) => (
                  <span key={tool} className="keycap px-3.5 py-1.5 text-[14px]">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Mini Visual: Dark LCD Query Screen */}
            <div className="mt-6 pt-2">
              <div className="rounded-2xl bg-[#141517] border border-black/40 shadow-[inset_0_3px_6px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.8)] p-3.5 font-mono text-[11.5px] sm:text-[12px] select-none text-white/90 overflow-hidden group-hover:border-black/60 transition-colors">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] text-white/50">
                  <span className="flex items-center gap-1.5">
                    <Terminal size={12} className="text-[#10B981]" />
                    <span>query_runner.sql</span>
                  </span>
                  <span className="text-[9.5px] uppercase tracking-wider text-white/40">
                    {illustrativeTag}
                  </span>
                </div>
                <div className="space-y-1 text-left leading-relaxed">
                  <div>
                    <span className="text-[#3B82F6] font-semibold">SELECT</span> category, <span className="text-[#10B981] font-semibold">COUNT</span>(*) <span className="text-[#3B82F6]">AS</span> orders,
                  </div>
                  <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#10B981] font-semibold">SUM</span>(revenue) <span className="text-[#3B82F6]">AS</span> total_sales
                  </div>
                  <div>
                    <span className="text-[#3B82F6] font-semibold">FROM</span> <span className="text-[#F59E0B]">transactions</span>
                  </div>
                  <div>
                    <span className="text-[#3B82F6] font-semibold">WHERE</span> status = <span className="text-[#10B981]">'completed'</span>
                  </div>
                  <div>
                    <span className="text-[#3B82F6] font-semibold">GROUP BY</span> category
                  </div>
                  <div className="flex items-center">
                    <span className="text-[#3B82F6] font-semibold">ORDER BY</span> total_sales <span className="text-[#3B82F6]">DESC</span>
                    <span className="inline-block w-1.5 h-3 bg-white/90 animate-pulse ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Right Column (Span 7): 2 Stacked Bento Cards */}
          <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6 justify-between">
            {/* 2. Spreadsheet & Reporting Bento Card */}
            <FadeUp delay={0.1} className="bento-card p-6 sm:p-8 flex flex-col justify-between group">
              <div className="space-y-3.5">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="tactile-badge tactile-badge-blue">
                    <FileSpreadsheet size={20} strokeWidth={2.2} />
                  </div>
                  <span className="text-[12px] font-semibold tracking-[0.08em] text-[#6b6b6b] uppercase">
                    MODE 02 · EXCEL
                  </span>
                </div>

                {/* Title & Description */}
                <div className="space-y-1.5">
                  <h3 className="text-[22px] sm:text-[24px] font-semibold text-[#111111] tracking-tight">
                    {skills.items[1].title}
                  </h3>
                  <p className="text-[15.5px] sm:text-[16px] text-[#3f3f3f] leading-[1.6] line-clamp-2">
                    {skills.items[1].description}
                  </p>
                </div>

                {/* Keycaps */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {skills.items[1].tools.map((tool) => (
                    <span key={tool} className="keycap px-3.5 py-1.5 text-[14px]">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mini Visual: 4×4 Pivot Table with Green Highlighted Cell */}
              <div className="mt-5 p-3 rounded-2xl bg-[#F8F8F8] border border-black/5 shadow-inner">
                <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-black/5 text-[10.5px] text-[#666666]">
                  <span className="flex items-center gap-1 font-semibold text-[#111111]">
                    <Table size={12} className="text-[#2563EB]" />
                    <span>Pivot_QuarterlySales</span>
                  </span>
                  <span className="text-[9.5px] uppercase tracking-wider text-[#888888]">
                    {illustrativeTag}
                  </span>
                </div>

                <div className="w-full text-[11.5px] sm:text-[12px] tabular-nums">
                  <div className="grid grid-cols-4 font-semibold text-[#555555] pb-1 border-b border-black/10 text-center">
                    <span className="text-left pl-1">Region</span>
                    <span>Q1</span>
                    <span>Q2</span>
                    <span className="text-right pr-1">Total</span>
                  </div>
                  <div className="grid grid-cols-4 py-1 text-[#333333] text-center border-b border-black/5">
                    <span className="text-left pl-1 font-medium text-black">East</span>
                    <span>$42.5K</span>
                    <span>$58.1K</span>
                    <span className="text-right pr-1 font-medium">$100.6K</span>
                  </div>
                  <div className="grid grid-cols-4 py-1 text-[#333333] text-center border-b border-black/5 items-center">
                    <span className="text-left pl-1 font-medium text-black">West</span>
                    <span>$51.2K</span>
                    <span className="px-1.5 py-0.5 rounded-md bg-[#10B981]/15 text-[#047857] font-semibold border border-[#10B981]/30">
                      $64.8K
                    </span>
                    <span className="text-right pr-1 font-medium">$116.0K</span>
                  </div>
                  <div className="grid grid-cols-4 pt-1.5 font-semibold text-[#111111] text-center">
                    <span className="text-left pl-1">Total</span>
                    <span>$93.7K</span>
                    <span>$122.9K</span>
                    <span className="text-right pr-1 text-[#2563EB]">$216.6K</span>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* 3. Dashboard & BI Bento Card */}
            <FadeUp delay={0.15} className="bento-card p-6 sm:p-8 flex flex-col justify-between group">
              <div className="space-y-3.5">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="tactile-badge tactile-badge-yellow">
                    <LayoutDashboard size={20} strokeWidth={2.2} />
                  </div>
                  <span className="text-[12px] font-semibold tracking-[0.08em] text-[#6b6b6b] uppercase">
                    MODE 03 · BI
                  </span>
                </div>

                {/* Title & Description */}
                <div className="space-y-1.5">
                  <h3 className="text-[22px] sm:text-[24px] font-semibold text-[#111111] tracking-tight">
                    {skills.items[2].title}
                  </h3>
                  <p className="text-[15.5px] sm:text-[16px] text-[#3f3f3f] leading-[1.6] line-clamp-2">
                    {skills.items[2].description}
                  </p>
                </div>

                {/* Keycaps */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {skills.items[2].tools.map((tool) => (
                    <span key={tool} className="keycap px-3.5 py-1.5 text-[14px]">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mini Visual: Dashboard with 3 KPIs & Chart */}
              <div className="mt-5 p-3 rounded-2xl bg-[#F8F8F8] border border-black/5 shadow-inner">
                <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-black/5 text-[10.5px] text-[#666666]">
                  <span className="flex items-center gap-1 font-semibold text-[#111111]">
                    <BarChart2 size={12} className="text-[#F59E0B]" />
                    <span>Executive_BI_Overview</span>
                  </span>
                  <span className="text-[9.5px] uppercase tracking-wider text-[#888888]">
                    {illustrativeTag}
                  </span>
                </div>

                {/* 3 Mini KPIs */}
                <div className="grid grid-cols-3 gap-2 mb-2 text-center">
                  <div className="p-1.5 rounded-lg bg-white border border-black/5">
                    <span className="text-[9px] text-[#666666] block uppercase font-medium">AOV</span>
                    <span className="text-[13px] font-semibold text-[#111111] tabular-nums">$38.40</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white border border-black/5">
                    <span className="text-[9px] text-[#666666] block uppercase font-medium">Retention</span>
                    <span className="text-[13px] font-semibold text-[#10B981] tabular-nums">78.4%</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white border border-black/5">
                    <span className="text-[9px] text-[#666666] block uppercase font-medium">Active Feeds</span>
                    <span className="text-[13px] font-semibold text-[#2563EB] tabular-nums">12 Live</span>
                  </div>
                </div>

                {/* Mini SVG Trend Line & Bars */}
                <div className="h-10 w-full flex items-end gap-1.5 px-2 pt-1 bg-white rounded-lg border border-black/5">
                  <div className="flex-1 bg-[#2563EB]/25 rounded-t-xs h-[45%]" />
                  <div className="flex-1 bg-[#2563EB]/40 rounded-t-xs h-[65%]" />
                  <div className="flex-1 bg-[#2563EB]/60 rounded-t-xs h-[55%]" />
                  <div className="flex-1 bg-[#2563EB]/80 rounded-t-xs h-[85%]" />
                  <div className="flex-1 bg-[#F59E0B] rounded-t-xs h-[95%]" />
                  <div className="flex-1 bg-[#10B981] rounded-t-xs h-[75%]" />
                </div>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Soft Skills: Full Width Bento Card Below */}
        <FadeUp delay={0.2} className="bento-card py-5 px-6 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="tactile-badge tactile-badge-purple w-8 h-8">
              <Users size={15} strokeWidth={2.2} />
            </div>
            <span className="text-[12.5px] font-semibold tracking-[0.08em] text-[#111111] uppercase">
              {skills.softSkillsLabel}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {skills.softSkills.map((soft) => (
              <span key={soft} className="flex items-center gap-1.5 text-[14.5px] font-medium text-[#333333]">
                <CheckCircle2 size={15} className="text-[#10B981] shrink-0" />
                <span>{soft}</span>
              </span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
