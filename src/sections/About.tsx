import type { PortfolioContent, Language } from '../data/content';
import { SectionTitle, CountUp, FadeUp } from '../components/ScrollAnimations';
import { Database, FileSpreadsheet, BarChart3, Layers } from 'lucide-react';

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
      className="relative w-full py-10 sm:py-14 px-4 sm:px-6 scroll-mt-[88px]"
    >
      <div className="w-full max-w-[1080px] mx-auto space-y-5 sm:space-y-6">
        {/* ROW 1: Teks About (Span 7) | Stepper Vertikal 5-Step Approach (Span 5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Left Bento: Story & Profile (Span 7) */}
          <FadeUp className="lg:col-span-7 bento-card p-6 sm:p-8 md:p-9 flex flex-col justify-between">
            <div className="space-y-5">
              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#10B981] shadow-xs shrink-0" />
                <span className="text-[12.5px] font-semibold tracking-[0.08em] text-[#6b6b6b] uppercase">
                  {about.sectionLabel}
                </span>
              </div>

              {/* Headline */}
              <SectionTitle
                title={about.headline}
                className="text-[26px] sm:text-[32px] md:text-[36px] font-semibold text-[#111111] leading-[1.14] tracking-[-0.035em]"
              />

              {/* Story Paragraf (Body ≥ 16px, line-height 1.6, warna ≥ #3f3f3f) */}
              <p className="text-[16px] sm:text-[16.5px] text-[#3f3f3f] leading-[1.65]">
                {about.story}
              </p>
            </div>

            {/* Academic Base Footer */}
            <div className="mt-6 pt-4 border-t border-black/5 flex items-baseline gap-2 text-[14px] text-[#555555]">
              <span className="font-semibold text-black shrink-0">
                {about.academicBaseLabel}
              </span>
              <span className="text-[#444444] leading-relaxed">
                {about.academicBaseValue}
              </span>
            </div>
          </FadeUp>

          {/* Right Bento: 5-Step Analytical Approach Vertical Stepper (Span 5) */}
          <FadeUp delay={0.1} className="lg:col-span-5 bento-card p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="tactile-badge tactile-badge-blue w-10 h-10">
                  <Layers size={18} strokeWidth={2.2} />
                </div>
                <h3 className="text-[20px] sm:text-[22px] font-semibold text-[#111111] tracking-tight">
                  {about.approach.label}
                </h3>
              </div>

              {/* Vertical Stepper with Tactile Circles and Connecting Line */}
              <div className="relative pl-2">
                {about.approach.steps.map((step, idx) => {
                  const isLast = idx === about.approach.steps.length - 1;
                  return (
                    <div key={idx} className="relative flex items-start gap-3.5 pb-5 last:pb-1">
                      {/* Vertical line connecting nodes */}
                      {!isLast && (
                        <div className="absolute left-3.5 top-7.5 bottom-0 w-[1.5px] bg-black/10 -translate-x-1/2" />
                      )}

                      {/* Tactile Circle Node */}
                      <div
                        className={`tactile-badge ${
                          approachBadgeColors[idx % approachBadgeColors.length]
                        } w-7 h-7 text-[12px] font-bold z-10 shrink-0`}
                      >
                        {idx + 1}
                      </div>

                      {/* Step Text (16–17px, readable contrast) */}
                      <div className="text-[15.5px] sm:text-[16px] text-[#333333] leading-snug pt-0.5 font-normal">
                        {step}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeUp>
        </div>

        {/* ROW 2: 3 Stat Cards (Span 4 / 4 / 4) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {/* Card 1: 21,350+ (Near-Black Card to Break Uniformity) */}
          <FadeUp delay={0.15} className="bento-card-dark p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="tactile-badge tactile-badge-green w-10 h-10">
                  <Database size={18} strokeWidth={2.2} />
                </div>
                <span className="text-[12px] font-semibold tracking-[0.08em] text-white/60 uppercase">
                  {lang === 'in' ? 'TRANSAKSI' : 'TRANSACTIONS'}
                </span>
              </div>

              <CountUp
                target={about.metrics[0].value}
                suffix={about.metrics[0].suffix}
                label={about.metrics[0].label}
                lang={lang}
                numberClassName="text-white text-[38px] sm:text-[44px]"
                labelClassName="text-white/80 text-[14px] leading-snug mt-2"
              />
            </div>
          </FadeUp>

          {/* Card 2: 238,000+ (Light Bento Card) */}
          <FadeUp delay={0.2} className="bento-card p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="tactile-badge tactile-badge-blue w-10 h-10">
                  <FileSpreadsheet size={18} strokeWidth={2.2} />
                </div>
                <span className="text-[12px] font-semibold tracking-[0.08em] text-[#6b6b6b] uppercase">
                  {lang === 'in' ? 'VALIDASI DATA' : 'DATA RECORDS'}
                </span>
              </div>

              <CountUp
                target={about.metrics[1].value}
                suffix={about.metrics[1].suffix}
                label={about.metrics[1].label}
                lang={lang}
                numberClassName="text-[#111111] text-[38px] sm:text-[44px]"
                labelClassName="text-[#4f4f4f] text-[14px] leading-snug mt-2"
              />
            </div>
          </FadeUp>

          {/* Card 3: 3 Projects (Light Bento Card) */}
          <FadeUp delay={0.25} className="bento-card p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="tactile-badge tactile-badge-yellow w-10 h-10">
                  <BarChart3 size={18} strokeWidth={2.2} />
                </div>
                <span className="text-[12px] font-semibold tracking-[0.08em] text-[#6b6b6b] uppercase">
                  {lang === 'in' ? 'PORTOFOLIO BI' : 'BI PORTFOLIO'}
                </span>
              </div>

              <CountUp
                target={about.metrics[2].value}
                suffix={about.metrics[2].suffix}
                label={about.metrics[2].label}
                lang={lang}
                numberClassName="text-[#111111] text-[38px] sm:text-[44px]"
                labelClassName="text-[#4f4f4f] text-[14px] leading-snug mt-2"
              />
            </div>
          </FadeUp>
        </div>

        {/* ROW 3: Full Width Thin Card "Core Stack" with 5 Keycaps */}
        <FadeUp delay={0.3} className="bento-card py-5 px-6 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-xs" />
            <span className="text-[13px] font-semibold tracking-[0.08em] text-[#111111] uppercase">
              {about.toolkit.label}
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
