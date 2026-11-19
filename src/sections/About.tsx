import type { PortfolioContent, Language } from '../data/content';
import { SectionTitle, CountUp, AnimatedLine, FadeUp } from '../components/ScrollAnimations';

interface AboutProps {
  content: PortfolioContent;
  lang?: Language;
}

export function About({ content, lang = 'in' }: AboutProps) {
  const approachColors = [
    '#10B981', // Green
    '#2563EB', // Blue
    '#F59E0B', // Yellow
    '#EF4444', // Red
    '#7A60C3', // Purple
  ];

  const { about } = content;

  return (
    <section
      id="about"
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 scroll-mt-[88px]"
    >
      <div className="w-full max-w-[1140px] mx-auto space-y-12 sm:space-y-16">
        {/* Section Indicator Header */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#10B981] shadow-xs shrink-0" />
            <span className="text-[13px] font-semibold tracking-wider text-[#666666] uppercase">
              {about.sectionLabel}
            </span>
          </div>

          <SectionTitle
            title={about.headline}
            className="text-[28px] sm:text-[38px] max-w-[780px]"
          />
        </div>

        {/* 2-Column Grid on Desktop, 1 Column on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Authentic Story & Academic Base */}
          <FadeUp className="lg:col-span-6 space-y-5 sm:space-y-6">
            <div className="space-y-4 text-[15.5px] sm:text-[16px] text-[#444444] leading-[1.65]">
              <p>{about.story}</p>
            </div>

            <div className="pt-4 border-t border-black/10 text-[13px] sm:text-[14px] text-[#666666] leading-relaxed">
              <span className="font-semibold text-black mr-1">
                {about.academicBaseLabel}
              </span>
              <span>{about.academicBaseValue}</span>
            </div>
          </FadeUp>

          {/* Right Column: Approach Card + Technology Card */}
          <FadeUp delay={0.12} className="lg:col-span-6 space-y-6">
            {/* Approach Card */}
            <div className="bg-white rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 border border-black/5 shadow-[0_10px_28px_-10px_rgba(0,0,0,0.06)]">
              <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#111111] tracking-tight mb-4">
                {about.approach.label}
              </h3>

              <div className="space-y-3">
                {about.approach.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span
                      className="w-2.5 h-2.5 rounded-[2px] mt-1.5 shrink-0 shadow-xs"
                      style={{
                        backgroundColor: approachColors[i % approachColors.length],
                      }}
                    />
                    <div className="text-[14px] sm:text-[15px] text-[#333333]">
                      <span className="font-semibold text-[#111111] mr-1.5">
                        0{i + 1}.
                      </span>
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Stack & Toolkit: ONLY the 5 tools */}
            <div className="bg-white rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 border border-black/5 shadow-[0_10px_28px_-10px_rgba(0,0,0,0.06)]">
              <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#111111] tracking-tight mb-3.5">
                {about.toolkit.label}
              </h3>

              <div className="flex flex-wrap gap-2">
                {about.toolkit.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3.5 py-1.5 rounded-full bg-[#F2F2F2] border border-black/5 text-[13px] font-medium text-[#222222] hover:bg-[#EAEAEA] transition-colors"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Animated Divider */}
        <AnimatedLine />

        {/* Strip 3 Angka Tipografi Besar (Count-Up) */}
        <div className="pt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-black/10">
            {about.metrics.map((metric, idx) => (
              <div
                key={metric.label}
                className={`flex flex-col justify-between ${
                  idx === 0
                    ? 'md:pr-8'
                    : idx === 1
                      ? 'md:px-8'
                      : 'md:pl-8'
                }`}
              >
                <CountUp
                  target={metric.value}
                  suffix={metric.suffix}
                  label={metric.label}
                  lang={lang}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
