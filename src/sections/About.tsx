import type { PortfolioContent, Language } from '../data/content';
import { SectionTitle, CountUp, FadeUp } from '../components/ScrollAnimations';
import { Layers } from 'lucide-react';

interface AboutProps {
  content: PortfolioContent;
  lang?: Language;
}

export function About({ content, lang = 'in' }: AboutProps) {
  const { about } = content;

  const approachBadgeColors = [
    'tactile-badge-green',
    'tactile-badge-blue',
    'tactile-badge-yellow',
    'tactile-badge-red',
    'tactile-badge-purple',
  ];

  return (
    <section
      id="about"
      className="relative w-full py-12 sm:py-16 lg:py-20 scroll-mt-[88px]"
    >
      <div className="site-container">
        {/* Uniform Section Header (mb-8 sm:mb-10 lg:mb-12) */}
        <div className="mb-8 sm:mb-10 lg:mb-12 text-left">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#10B981] shadow-xs shrink-0" />
            <span className="text-[12.5px] font-semibold tracking-[0.08em] text-[#6b6b6b] uppercase">
              {about.sectionLabel}
            </span>
          </div>
          <SectionTitle
            title={about.headline}
            className="text-[clamp(30px,6.5vw,56px)] font-semibold text-[#111111] leading-[1.08] tracking-[-0.035em] max-w-[780px]"
          />
        </div>

        {/* Row 1: About text + education direct on background (Span 7) | Stepper Card (Span 5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left: About Text & Academic Degree DIRECT on page background (NO Card) */}
          <FadeUp className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4 max-w-[620px]">
              <p className="text-[15.5px] sm:text-[16.5px] text-[#3f3f3f] leading-[1.65]">
                {about.story}
              </p>
            </div>

            {/* Academic Base Footer */}
            <div className="pt-4 border-t border-black/10 flex items-baseline gap-2 text-[14px] sm:text-[14.5px] text-[#555555]">
              <span className="font-semibold text-black shrink-0">
                {about.academicBaseLabel}
              </span>
              <span className="text-[#3f3f3f] leading-relaxed">
                {about.academicBaseValue}
              </span>
            </div>
          </FadeUp>

          {/* Right: Exactly ONE Card — 5-Step Analytical Approach Stepper Card (Span 5) */}
          <FadeUp delay={0.1} className="lg:col-span-5 bento-card p-5 sm:p-6 lg:p-8 h-full flex flex-col justify-between">
            <div>
              {/* Stepper Card Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="tactile-badge tactile-badge-blue w-9 h-9">
                  <Layers size={17} strokeWidth={2.2} />
                </div>
                <h3 className="text-[19px] sm:text-[21px] font-semibold text-[#111111] tracking-tight">
                  {about.approach.label}
                </h3>
              </div>

              {/* Stepper Nodes */}
              <div className="relative pl-1">
                {about.approach.steps.map((step, idx) => {
                  const isLast = idx === about.approach.steps.length - 1;
                  return (
                    <div key={idx} className="relative flex items-start gap-3.5 pb-4 last:pb-1">
                      {!isLast && (
                        <div className="absolute left-3.5 top-7 bottom-0 w-[1.5px] bg-black/10 -translate-x-1/2" />
                      )}
                      <div
                        className={`tactile-badge ${
                          approachBadgeColors[idx % approachBadgeColors.length]
                        } w-7 h-7 text-[12px] font-bold z-10 shrink-0`}
                      >
                        {idx + 1}
                      </div>
                      <div className="text-[15px] sm:text-[15.5px] text-[#333333] leading-snug pt-0.5 font-normal">
                        {step}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Row 2: 3 Stats in ONE Row DIRECT on background (NO Cards, Hairline Dividers, mt-16 / 64px) */}
        <FadeUp delay={0.15} className="mt-16 pt-8 border-t border-black/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-black/15">
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
                  numberClassName="text-[#111111] text-[40px] sm:text-[46px] lg:text-[50px] font-bold"
                  labelClassName="text-[#4f4f4f] text-[14.5px] leading-snug mt-2"
                />
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Row 3: Core Stack DIRECT on Background (NO wrapping card, mt-10 / 40px) */}
        <FadeUp delay={0.2} className="mt-10 pt-6 border-t border-black/10 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-xs" />
            <span className="text-[12.5px] font-semibold tracking-[0.08em] text-[#6b6b6b] uppercase">
              {about.toolkit.label}:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {about.toolkit.tools.map((tool) => (
              <span key={tool} className="keycap px-3.5 py-1.5 text-[14px]">
                {tool}
              </span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
