import type { PortfolioContent, Language, SkillCardItem } from '../data/content';
import { FadeUp } from '../components/ScrollAnimations';

interface SkillsProps {
  content: PortfolioContent;
  lang?: Language;
}

/**
 * Minimalist Monochrome Architectural Visuals for Skills Cards:
 * Pure geometric wireframes without decorative charts or synthetic numbers.
 */
function SkillArchitecturalVisual({ id }: { id: SkillCardItem['id'] }) {
  if (id === 'sql') {
    return (
      /* Relational Table Schema Blocks */
      <div className="w-full h-full flex items-center justify-center gap-3 px-2 select-none" aria-hidden="true">
        <div className="w-[42%] rounded-lg bg-white border border-neutral-200 p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="h-2 w-12 rounded-xs bg-neutral-800 mb-2" />
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="h-1.5 w-8 rounded-xs bg-neutral-400" />
              <span className="h-1.5 w-4 rounded-xs bg-neutral-200" />
            </div>
            <div className="flex items-center justify-between">
              <span className="h-1.5 w-11 rounded-xs bg-neutral-300" />
              <span className="h-1.5 w-5 rounded-xs bg-neutral-200" />
            </div>
            <div className="flex items-center justify-between">
              <span className="h-1.5 w-9 rounded-xs bg-neutral-300" />
              <span className="h-1.5 w-4 rounded-xs bg-neutral-200" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-0.5 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
          <span className="w-5 h-px bg-neutral-400" />
          <span className="w-1.5 h-1.5 rounded-full border border-neutral-500 bg-white" />
        </div>

        <div className="w-[42%] rounded-lg bg-white border border-neutral-200 p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="h-2 w-10 rounded-xs bg-neutral-700 mb-2" />
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="h-1.5 w-10 rounded-xs bg-neutral-400" />
              <span className="h-1.5 w-4 rounded-xs bg-neutral-200" />
            </div>
            <div className="flex items-center justify-between">
              <span className="h-1.5 w-7 rounded-xs bg-neutral-300" />
              <span className="h-1.5 w-5 rounded-xs bg-neutral-200" />
            </div>
            <div className="flex items-center justify-between">
              <span className="h-1.5 w-9 rounded-xs bg-neutral-300" />
              <span className="h-1.5 w-4 rounded-xs bg-neutral-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'excel') {
    return (
      /* Clean Spreadsheet Cell Grid Wireframe (No fake numbers) */
      <div className="w-full h-full flex items-center justify-center px-3 select-none" aria-hidden="true">
        <div className="w-full max-w-[240px] rounded-lg bg-white border border-neutral-200 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          {/* Header Row */}
          <div className="grid grid-cols-4 border-b border-neutral-200 bg-neutral-50">
            {[0, 1, 2, 3].map((col) => (
              <div
                key={col}
                className="h-5 border-r last:border-r-0 border-neutral-200 flex items-center px-2"
              >
                <span className="h-1.5 w-6 rounded-xs bg-neutral-400" />
              </div>
            ))}
          </div>
          {/* Data Grid Rows */}
          {[0, 1, 2].map((row) => (
            <div
              key={row}
              className="grid grid-cols-4 border-b last:border-b-0 border-neutral-100"
            >
              {[0, 1, 2, 3].map((col) => {
                const isActiveCell = row === 1 && col === 2;
                return (
                  <div
                    key={col}
                    className={`h-6 border-r last:border-r-0 border-neutral-100 flex items-center px-2 ${
                      isActiveCell ? 'ring-1 ring-inset ring-neutral-800 bg-neutral-50' : ''
                    }`}
                  >
                    <span
                      className={`h-1.5 rounded-xs ${
                        isActiveCell ? 'w-7 bg-neutral-800' : 'w-5 bg-neutral-200'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    /* Clean BI Dashboard Wireframe (KPI strip + layout panels) */
    <div className="w-full h-full flex items-center justify-center px-3 select-none" aria-hidden="true">
      <div className="w-full max-w-[240px] rounded-lg bg-white border border-neutral-200 p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-2">
        {/* Top KPI Wireframe Strip */}
        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((kpi) => (
            <div
              key={kpi}
              className="rounded-md bg-neutral-50 border border-neutral-200/80 p-1.5 space-y-1"
            >
              <div className="h-1 w-6 rounded-xs bg-neutral-300" />
              <div className="h-2 w-9 rounded-xs bg-neutral-800" />
            </div>
          ))}
        </div>
        {/* Bottom Split Wireframe Panels */}
        <div className="grid grid-cols-12 gap-1.5">
          <div className="col-span-7 h-12 rounded-md bg-neutral-50 border border-neutral-200/80 p-2 flex items-end gap-1.5">
            <span className="flex-1 h-[40%] rounded-xs bg-neutral-300" />
            <span className="flex-1 h-[75%] rounded-xs bg-neutral-400" />
            <span className="flex-1 h-[55%] rounded-xs bg-neutral-300" />
            <span className="flex-1 h-[92%] rounded-xs bg-neutral-800" />
            <span className="flex-1 h-[64%] rounded-xs bg-neutral-400" />
          </div>
          <div className="col-span-5 h-12 rounded-md bg-neutral-50 border border-neutral-200/80 p-2 flex flex-col justify-center gap-1.5">
            <span className="h-1.5 w-full rounded-xs bg-neutral-700" />
            <span className="h-1.5 w-4/5 rounded-xs bg-neutral-300" />
            <span className="h-1.5 w-3/5 rounded-xs bg-neutral-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Skills({ content }: SkillsProps) {
  const { skills } = content;

  return (
    <section
      id="skills"
      className="relative w-full bg-[#F5F5F5] text-[#111111] pt-6 pb-20 md:pt-10 md:pb-28 scroll-mt-24"
    >
      <div className="site-container">
        {/* Section Header */}
        <FadeUp className="mb-10 md:mb-12 text-left md:text-center max-w-2xl md:mx-auto">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#525252] mb-2">
            {skills.sectionLabel}
          </p>
          <h2 className="text-[28px] sm:text-[34px] md:text-[42px] font-bold tracking-[-0.03em] leading-[1.12] text-[#111111]">
            {skills.headline}
          </h2>
          <p className="mt-3 text-[15px] md:text-[16px] text-[#525252] leading-relaxed">
            {skills.subtitle}
          </p>
        </FadeUp>

        {/* 3 Equal Columns on Desktop, Compact Stack on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.items.map((item, idx) => (
            <FadeUp key={item.id} delay={idx * 0.08} className="h-full">
              <article className="h-full bg-white rounded-2xl border border-[#E5E5E5] p-5 flex flex-col justify-between transition-colors duration-200 hover:border-neutral-300">
                <div>
                  {/* Top Visual Slot (16:10) */}
                  <div className="aspect-[16/10] w-full rounded-xl bg-neutral-100 border border-neutral-200/70 p-3 mb-5 flex items-center justify-center overflow-hidden">
                    <SkillArchitecturalVisual id={item.id} />
                  </div>

                  {/* Bold Title + Compact 2-Line Description */}
                  <h3 className="text-[18px] md:text-[19px] font-bold tracking-tight text-[#111111]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] text-[#525252] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Thin Bordered Pills */}
                <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-neutral-100">
                  {item.pills.map((pill) => (
                    <span
                      key={pill}
                      className="rounded-full border border-neutral-300 text-neutral-700 text-xs font-medium px-3 py-1"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
