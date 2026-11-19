import type { PortfolioContent } from '../data/content';

interface SkillsProps {
  content: PortfolioContent;
}

export function Skills({ content }: SkillsProps) {
  const { skills } = content;

  return (
    <section id="skills" className="relative w-full py-16 sm:py-24 px-4 sm:px-6">
      <div className="w-full max-w-[1140px] mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#2563EB] shadow-xs shrink-0" />
          <span className="text-[13px] font-semibold tracking-wider text-[#666666] uppercase">
            {skills.sectionLabel}
          </span>
        </div>
        <h2 className="text-[28px] sm:text-[38px] font-semibold text-[#111111] leading-[1.1] tracking-[-0.035em] mb-8 sm:mb-12">
          {skills.headline}
        </h2>

        {/* 3 Large Tactile Cards (NO percentage bars or level claims) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10">
          {skills.items.map((skill) => (
            <div
              key={skill.title}
              className="bg-white rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 border border-black/5 shadow-[0_10px_25px_-8px_rgba(0,0,0,0.05)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <span
                    className="w-2.5 h-2.5 rounded-[2px] shadow-xs shrink-0"
                    style={{ backgroundColor: skill.bulletColor }}
                  />
                  <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#111111] tracking-tight">
                    {skill.title}
                  </h3>
                </div>

                <p className="text-[13.5px] sm:text-[14px] text-[#555555] leading-relaxed mb-5">
                  {skill.description}
                </p>
              </div>

              {/* Clean Tools Badges */}
              <div className="pt-4 border-t border-[#F0F0F0]">
                <div className="flex flex-wrap gap-2">
                  {skill.tools.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-[#F4F4F4] text-[12px] font-medium text-[#222222] border border-black/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Soft Skills & Collaborative Strengths Row */}
        <div className="bg-white/80 rounded-2xl p-4 sm:p-5 border border-black/5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px]">
          <span className="font-semibold text-black uppercase tracking-wider text-[11.5px] sm:text-[12px]">
            {skills.softSkillsLabel}:
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {skills.softSkills.map((soft) => (
              <span
                key={soft}
                className="px-3 py-1 rounded-full bg-white border border-black/10 text-[#444444] font-medium text-[12px]"
              >
                {soft}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
