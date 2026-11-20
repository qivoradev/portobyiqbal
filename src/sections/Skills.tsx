import { Database, Table2, BarChart3 } from 'lucide-react';
import type { PortfolioContent, Language, SkillCardItem } from '../data/content';
import { FadeUp } from '../components/ScrollAnimations';

interface SkillsProps {
  content: PortfolioContent;
  lang?: Language;
}

function SkillIcon({ id }: { id: SkillCardItem['id'] }) {
  if (id === 'sql') {
    return <Database className="w-5 h-5 text-neutral-700 shrink-0" strokeWidth={1.75} aria-hidden="true" />;
  }
  if (id === 'excel') {
    return <Table2 className="w-5 h-5 text-neutral-700 shrink-0" strokeWidth={1.75} aria-hidden="true" />;
  }
  return <BarChart3 className="w-5 h-5 text-neutral-700 shrink-0" strokeWidth={1.75} aria-hidden="true" />;
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

        {/* 3 Clean Editorial Typography Cards (No Images / Wireframes) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {skills.items.map((item, idx) => {
            const indexLabel = `0${idx + 1}`;
            return (
              <FadeUp key={item.id} delay={idx * 0.08} className="h-full">
                <article className="h-full bg-white rounded-2xl border border-neutral-200 p-5 md:p-6 flex flex-col justify-between transition-colors duration-200 hover:border-neutral-400 text-left">
                  <div>
                    {/* Top Row: Thin Mono Index (Left) + Minimalist Monochrome Icon (Right) */}
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400 text-xs font-mono font-medium tracking-wider select-none">
                        {indexLabel}
                      </span>
                      <SkillIcon id={item.id} />
                    </div>

                    {/* Middle Content: Bold Title + Compact 2-Line Description */}
                    <h3 className="text-lg md:text-xl font-bold text-neutral-950 tracking-tight mt-5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Row: Thin Hairline Divider + Pill Tags */}
                  <div className="border-t border-neutral-100 mt-5 pt-4 flex flex-wrap gap-2">
                    {item.pills.map((pill) => (
                      <span
                        key={pill}
                        className="rounded-full border border-neutral-300 px-3 py-1 text-xs text-neutral-700 font-medium"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </article>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
