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
        {/* Desktop (≥1024px): 2 Columns with items-start (Span 7 Left, Span 5 Right) */}
        {/* Mobile & Tablet (<1024px): 1 Column in exact sequence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column (Span 7 on desktop): Eyebrow → Headline → Paragraph → Stat Strip */}
          <div className="lg:col-span-7 flex flex-col text-left">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#10B981] shadow-xs shrink-0" />
              <span className="text-[12.5px] font-semibold tracking-[0.08em] text-[#6b6b6b] uppercase">
                {about.sectionLabel}
              </span>
            </div>

            {/* Headline */}
            <SectionTitle
              title={about.headline}
              className="text-[clamp(30px,6.5vw,54px)] font-semibold text-[#111111] leading-[1.08] tracking-[-0.035em] max-w-[740px] mb-4 sm:mb-5"
            />

            {/* Story Paragraph (±60 char/line) */}
            <FadeUp>
              <p className="text-[15.5px] sm:text-[16.5px] text-[#3f3f3f] leading-[1.68] max-w-[62ch]">
                {about.story}
              </p>
            </FadeUp>

            {/* Stat Strip directly below paragraph with 40px gap (mt-10) */}
            {/* Desktop: 3 Numbers with vertical hairline dividers */}
            {/* Mobile: 3 equal width columns */}
            <FadeUp delay={0.1} className="mt-10 pt-6 border-t border-black/10">
              <div className="grid grid-cols-3 divide-x divide-black/15">
                {about.metrics.map((metric, idx) => (
                  <div
                    key={metric.label}
                    className={`flex flex-col justify-between ${
                      idx === 0
                        ? 'pr-3 sm:pr-6'
                        : idx === 1
                          ? 'px-3 sm:px-6'
                          : 'pl-3 sm:pl-6'
                    }`}
                  >
                    <CountUp
                      target={metric.value}
                      suffix={metric.suffix}
                      label={metric.label}
                      lang={lang}
                      numberClassName="text-[#111111] text-[clamp(22px,7vw,30px)] lg:text-[clamp(36px,4vw,52px)] font-bold tracking-tight leading-none"
                      labelClassName="text-[#555555] text-[12px] sm:text-[13px] lg:text-[14px] leading-snug mt-2 line-clamp-2"
                    />
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Right Column (Span 5 on desktop): 5-Step Analytical Approach Stepper Card */}
          {/* Mobile: compact stepper card (badge 28px, text 15px, padding 20px) */}
          <FadeUp delay={0.15} className="lg:col-span-5 w-full">
            <div className="bento-card p-5 sm:p-6 lg:p-8 rounded-[28px] w-full text-left">
              {/* Stepper Card Header */}
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="tactile-badge tactile-badge-blue w-8 h-8 sm:w-9 sm:h-9">
                  <Layers size={17} strokeWidth={2.2} />
                </div>
                <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#111111] tracking-tight">
                  {about.approach.label}
                </h3>
              </div>

              {/* Stepper Nodes */}
              <div className="relative pl-0.5">
                {about.approach.steps.map((step, idx) => {
                  const isLast = idx === about.approach.steps.length - 1;
                  return (
                    <div key={idx} className="relative flex items-start gap-3 sm:gap-3.5 pb-3.5 sm:pb-4 last:pb-1">
                      {!isLast && (
                        <div className="absolute left-[14px] top-7 bottom-0 w-[1.5px] bg-black/10 -translate-x-1/2" />
                      )}
                      <div
                        className={`tactile-badge ${
                          approachBadgeColors[idx % approachBadgeColors.length]
                        } w-7 h-7 sm:w-7 sm:h-7 text-[12px] font-bold z-10 shrink-0`}
                      >
                        {idx + 1}
                      </div>
                      <div className="text-[14px] sm:text-[15px] text-[#333333] leading-snug pt-0.5 font-normal">
                        {step}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
