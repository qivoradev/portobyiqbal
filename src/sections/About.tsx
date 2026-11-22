import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Eye, GraduationCap } from 'lucide-react';
import type { CertificationItem, PortfolioContent, Language } from '../data/content';
import { ABOUT_AVATAR_URL } from '../config/assets';
import { CertificateModal } from '../components/CertificateModal';
import { FadeUp } from '../components/ScrollAnimations';

interface AboutProps {
  content: PortfolioContent;
  lang?: Language;
  onModalStateChange?: (open: boolean) => void;
}

export function About({ content, onModalStateChange }: AboutProps) {
  const [activeCert, setActiveCert] = useState<CertificationItem | null>(null);
  const { about, certModal } = content;

  useEffect(() => {
    onModalStateChange?.(Boolean(activeCert));
  }, [activeCert, onModalStateChange]);

  return (
    <>
      <section
        id="about"
        className="relative w-full bg-[#050505] text-[#FAFAFA] py-16 md:py-24 scroll-mt-16"
      >
        <div className="site-container max-w-5xl">
          {/* Part 1: Profile Avatar, 2-Line Heading & Editorial Contrast Paragraph */}
          <FadeUp>
            <div className="max-w-[320px] md:max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 items-center gap-0 md:gap-8 lg:gap-12 text-left">
              {/* Left (Desktop col-span-5): Circular Avatar + Tight 2-Line Heading */}
              <div className="md:col-span-5 flex items-center gap-4 md:gap-5">
                <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 shrink-0 rounded-full bg-gradient-to-b from-neutral-700 to-neutral-900 border border-neutral-700 overflow-hidden flex items-center justify-center select-none">
                  {ABOUT_AVATAR_URL ? (
                    <img
                      src={ABOUT_AVATAR_URL}
                      alt="Iqbal Dwi Fathonah"
                      className="w-full h-full object-cover object-top scale-105 select-none pointer-events-none"
                    />
                  ) : (
                    <span className="font-mono text-lg md:text-xl font-bold tracking-tight text-neutral-300">
                      {content.monogram}
                    </span>
                  )}
                </div>

                <h2 className="text-[28px] md:text-3xl lg:text-[34px] font-bold tracking-tight leading-[1.08] text-white whitespace-nowrap">
                  {about.headingLine1}
                  <br />
                  {about.headingLine2}
                </h2>
              </div>

              {/* Right (Desktop col-span-7): White ONLY on opening name & closing specialization sentence */}
              <div className="md:col-span-7 mt-4 md:mt-0">
                <p className="text-[13.5px] md:text-[15px] leading-[1.68] md:leading-[1.7] md:max-w-md text-left text-neutral-500">
                  <span className="text-white font-semibold">{about.paragraphLead}</span>
                  {about.paragraphBody}
                  <span className="text-white font-semibold">{about.paragraphClosing}</span>
                </p>

                {/* Core Tools (Directly below Bio Paragraph, Above Stats Card) */}
                <div className="mt-6 text-left">
                  <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-neutral-500 mb-3">
                    {about.coreToolsLabel}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    {about.coreTools.map((tool) => (
                      <div
                        key={tool.id}
                        className="inline-flex items-center gap-2.5 rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-2 transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.07]"
                      >
                        <div className="w-7 h-7 rounded-lg bg-white/95 p-1 flex items-center justify-center shrink-0">
                          <img
                            src={tool.iconUrl}
                            alt={tool.alt}
                            className="w-full h-full object-contain select-none"
                          />
                        </div>
                        <span className="text-xs md:text-sm font-medium text-neutral-200 whitespace-nowrap">
                          {tool.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Part 2: 3-Column Single-Row Stats Bar (Desktop & Mobile) with Subtle Radial Emerald Glow */}
          <FadeUp delay={0.08}>
            <div className="max-w-3xl mx-auto mt-10 md:mt-14 rounded-2xl bg-[#0B0D0C] border border-white/[0.06] px-4 py-5 sm:px-8 sm:py-7 relative overflow-hidden">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse 70% 100% at 50% 50%, rgba(37, 155, 82, 0.07) 0%, transparent 72%)',
                }}
              />
              <div className="relative z-10 grid grid-cols-[1.1fr_1.3fr_0.75fr] gap-2.5 sm:grid-cols-3 sm:gap-8 items-start text-left">
                {about.stats.map((stat) => (
                  <div key={stat.label} className="min-w-0">
                    <div className="text-[19px] sm:text-3xl md:text-4xl font-semibold tracking-tight text-white tabular-nums whitespace-nowrap leading-none">
                      {stat.value}
                    </div>
                    <p className="text-[11px] sm:text-sm text-neutral-400 leading-snug mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Part 3: Education & Credentials (Compact Dark Theme) */}
          <div id="credentials" className="scroll-mt-24">
            {/* Education Hairline Row */}
            <FadeUp delay={0.12}>
              <div className="border-y border-neutral-800 py-5 mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 shrink-0">
                    <GraduationCap size={19} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-[16px] sm:text-[17px] font-semibold text-white tracking-tight">
                        {about.education.degree}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#259B52]/15 text-[#4ADE80] border border-[#259B52]/30 text-[11.5px] font-semibold">
                        {about.education.badge}
                      </span>
                    </div>
                    <p className="text-[13.5px] sm:text-[14px] text-neutral-400 mt-0.5">
                      {about.education.university}
                    </p>
                  </div>
                </div>

                <div className="font-mono text-[13px] text-neutral-400 sm:text-right shrink-0 pl-[54px] sm:pl-0 tabular-nums">
                  {about.education.period}
                </div>
              </div>
            </FadeUp>

            {/* 2 Side-by-Side Dark Certificate Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              {about.credentials.items.map((cert, idx) => (
                <FadeUp key={cert.id} delay={0.14 + idx * 0.06}>
                  <article className="h-full bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 rounded-xl p-4 flex items-center gap-4 transition-colors duration-200 text-left">
                    {/* Compact Certificate Thumbnail */}
                    <div className="w-[82px] h-[60px] sm:w-[96px] sm:h-[70px] rounded-lg bg-neutral-800 border border-neutral-700/80 overflow-hidden shrink-0 flex items-center justify-center">
                      <img
                        src={cert.thumbnailUrl}
                        alt={cert.title}
                        loading="lazy"
                        className={`w-full h-full ${
                          cert.fileType === 'image' ? 'object-cover object-top' : 'object-contain bg-neutral-100 p-0.5'
                        }`}
                      />
                    </div>

                    {/* Certificate Details & Actions */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11.5px]">
                          <span className="font-semibold text-neutral-300 uppercase tracking-wider">
                            {cert.issuer}
                          </span>
                          <span className="font-mono text-neutral-400 tabular-nums">{cert.date}</span>
                        </div>
                        <h4 className="text-[15.5px] sm:text-[16.5px] font-semibold text-white leading-snug mt-0.5 truncate">
                          {cert.title}
                        </h4>
                        <p className="text-[12.5px] text-neutral-500 mt-0.5">{cert.validity}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <button
                          type="button"
                          onClick={() => setActiveCert(cert)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-xs font-medium text-white transition-colors cursor-pointer"
                        >
                          <Eye size={13} />
                          <span>{about.credentials.viewCertButton}</span>
                        </button>
                      </div>
                    </div>
                  </article>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Preserved Certificate Preview Modal */}
      <AnimatePresence>
        {activeCert && (
          <CertificateModal
            cert={activeCert}
            content={certModal}
            onClose={() => setActiveCert(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
