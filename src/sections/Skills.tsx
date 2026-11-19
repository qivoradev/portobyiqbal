import { useState, useEffect, useRef } from 'react';
import type { PortfolioContent } from '../data/content';
import { SectionTitle } from '../components/ScrollAnimations';

interface SkillsProps {
  content: PortfolioContent;
}

export function Skills({ content }: SkillsProps) {
  const { skills } = content;
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll-linked tracking: Row closest to viewport center has opacity 1, others 0.28
  useEffect(() => {
    const handleScroll = () => {
      const vCenter = window.innerHeight / 2;
      let closestIdx = 0;
      let minDistance = Infinity;

      rowRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const rowCenter = rect.top + rect.height / 2;
        const dist = Math.abs(rowCenter - vCenter);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      setActiveIndex(closestIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="skills"
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 scroll-mt-[88px]"
    >
      <div className="w-full max-w-[1140px] mx-auto space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#2563EB] shadow-xs shrink-0" />
            <span className="text-[13px] font-semibold tracking-wider text-[#666666] uppercase">
              {skills.sectionLabel}
            </span>
          </div>

          <SectionTitle
            title={skills.headline}
            className="text-[28px] sm:text-[38px] max-w-[720px]"
          />
        </div>

        {/* 3 Full-Width Rows (Editorial Typography Index) */}
        <div className="w-full border-t border-black/10">
          {skills.items.map((skill, index) => {
            const isHighlight =
              hoveredIndex !== null
                ? hoveredIndex === index
                : activeIndex === index;

            return (
              <div
                key={skill.title}
                ref={(el) => {
                  rowRefs.current[index] = el;
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  opacity: isHighlight ? 1 : 0.28,
                }}
                className="group relative w-full py-8 sm:py-12 border-b border-black/10 transition-opacity duration-400 ease-out cursor-default"
              >
                {/* Desktop 12-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
                  {/* Columns 1-2: Index Number */}
                  <div className="lg:col-span-2 flex items-center lg:items-start">
                    <span className="text-[13px] sm:text-[14px] font-mono text-[#888888] font-semibold tabular-nums pt-0.5 lg:pt-3">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Columns 3-8: Large Group Name (shifts 8px right on hover) */}
                  <div className="lg:col-span-6 overflow-hidden">
                    <h3 className="text-[28px] sm:text-[38px] lg:text-[48px] xl:text-[54px] font-semibold text-[#111111] tracking-[-0.04em] leading-[1.08] transition-transform duration-300 ease-out group-hover:translate-x-2">
                      {skill.title}
                    </h3>
                  </div>

                  {/* Columns 9-12: Description & Tools as Plain Text */}
                  <div className="lg:col-span-4 space-y-2.5 pt-1 lg:pt-2">
                    <p className="text-[14px] sm:text-[15px] text-[#444444] leading-relaxed">
                      {skill.description}
                    </p>
                    <div className="text-[13px] font-medium text-[#666666] leading-relaxed">
                      {skill.toolsText}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Soft Skills: Single text row separated by ' / ', without pills */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3 text-[13px] text-[#666666]">
          <span className="font-semibold text-black uppercase tracking-wider text-[11.5px] shrink-0">
            {skills.softSkillsLabel}:
          </span>
          <span className="text-[#333333] font-medium leading-relaxed">
            {skills.softSkills.join(' / ')}
          </span>
        </div>
      </div>
    </section>
  );
}
