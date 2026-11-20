import type { PortfolioContent, Language } from '../data/content';
import { FadeUp } from '../components/ScrollAnimations';

interface SkillsProps {
  content: PortfolioContent;
  lang?: Language;
}

export function Skills({ content }: SkillsProps) {
  const { skills } = content;

  return (
    <section
      id="skills"
      className="relative w-full bg-[#F5F5F5] text-[#111111] pt-6 pb-20 md:pt-10 md:pb-28 scroll-mt-24"
    >
      <div className="site-container max-w-5xl mx-auto">
        {/* Section Header */}
        <FadeUp className="mb-10 md:mb-12 text-left max-w-2xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#525252] mb-2">
            {skills.sectionLabel}
          </p>
          <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-bold tracking-[-0.03em] leading-[1.12] text-[#111111]">
            {skills.headline}
          </h2>
          <p className="mt-2.5 text-[15px] md:text-[16px] text-[#525252] leading-relaxed">
            {skills.subtitle}
          </p>
        </FadeUp>

        {/* Editorial Spec-List: 3 Horizontal Rows without Card Containers */}
        <div className="border-t border-neutral-300/80 divide-y divide-neutral-300/80 border-b">
          {skills.items.map((item, idx) => {
            const indexLabel = `0${idx + 1}`;
            return (
              <FadeUp key={item.id} delay={idx * 0.06}>
                <div className="py-6 md:py-7 px-1 md:px-3 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-start md:items-center transition-colors hover:bg-black/[0.025]">
                  {/* Left Column (col-span-4): Monospace Index + Bold Pillar Title */}
                  <div className="md:col-span-4 flex items-baseline gap-3.5 text-left">
                    <span className="text-xs font-mono font-medium text-neutral-400 select-none">
                      {indexLabel}
                    </span>
                    <h3 className="text-lg md:text-xl font-semibold tracking-tight text-neutral-950">
                      {item.title}
                    </h3>
                  </div>

                  {/* Center Column (col-span-4): Dense 2-Line Description */}
                  <div className="md:col-span-4 text-left">
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Right Column (col-span-4): Flat Minimalist Square-Rounded Tool Tags */}
                  <div className="md:col-span-4 flex flex-wrap md:justify-end gap-1.5 pt-1 md:pt-0">
                    {item.pills.map((pill) => (
                      <span
                        key={pill}
                        className="rounded-md bg-neutral-200/80 border border-neutral-300/70 px-2.5 py-1 text-xs font-medium text-neutral-800 select-none"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
