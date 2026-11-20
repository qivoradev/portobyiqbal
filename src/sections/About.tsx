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
          {/* Part 1: Profile Avatar + Editorial Contrast Paragraph */}
          <FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-7 md:gap-10 items-center text-left">
              {/* Left (Desktop col-span-5): Circular Avatar stays horizontally beside heading even on mobile */}
              <div className="md:col-span-5 flex items-center gap-4 md:gap-6">
                <div className="w-20 h-20 md:w-28 md:h-28 shrink-0 rounded-full bg-gradient-to-b from-neutral-700 to-neutral-900 border border-neutral-700 overflow-hidden flex items-center justify-center select-none">
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

                <h2 className="text-[28px] sm:text-[34px] md:text-[38px] font-bold tracking-[-0.03em] leading-[1.08] text-white">
                  {about.heading}
                </h2>
              </div>

              {/* Right (Desktop col-span-7): High-Contrast Dimmed vs Bold Editorial Paragraph */}
              <div className="md:col-span-7">
                <p className="text-[16px] md:text-[17.5px] leading-[1.7] text-neutral-500">
                  <span className="text-white font-medium">{about.paragraphLead}</span>
                  <span>{about.paragraphMuted1}</span>
                  <span className="text-white font-medium">{about.paragraphHighlight1}</span>
                  <span>{about.paragraphMuted2}</span>
                  <span className="text-white font-medium">{about.paragraphHighlight2}</span>
                  <span>{about.paragraphClosing}</span>
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Part 2: Anti-Overlap Stats Bar */}
          {/* Mobile (<640px): grid-cols-2 with 3rd item full-width below separated by border-t; >=640px: 3 equal columns */}
          <FadeUp delay={0.08}>
            <div className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6 md:p-8 mt-10">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-6 text-left">
                {about.stats.map((stat, idx) => {
                  const isThird = idx === 2;
                  return (
                    <div
                      key={stat.label}
                      className={
                        isThird
                          ? 'col-span-2 pt-3 border-t border-neutral-800/80 sm:col-span-1 sm:pt-0 sm:border-t-0'
                          : ''
                      }
                    >
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight tabular-nums leading-none">
                        {stat.value}
                      </div>
                      <p className="mt-2 text-[13px] sm:text-[14px] text-neutral-400 font-medium">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
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
