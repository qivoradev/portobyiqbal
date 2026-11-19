import { useState, useEffect } from 'react';
import { Eye, GraduationCap } from 'lucide-react';
import { CertificateModal } from '../components/CertificateModal';
import { AnimatePresence } from 'motion/react';
import type { CertificationItem, PortfolioContent, Language } from '../data/content';
import { SectionTitle, FadeUp } from '../components/ScrollAnimations';

interface CredentialsProps {
  content: PortfolioContent;
  lang?: Language;
  onModalStateChange?: (open: boolean) => void;
}

export function Credentials({ content, lang = 'in', onModalStateChange }: CredentialsProps) {
  const [activeCert, setActiveCert] = useState<CertificationItem | null>(null);
  const { credentials, certModal } = content;

  useEffect(() => {
    onModalStateChange?.(!!activeCert);
  }, [activeCert, onModalStateChange]);

  const certiportCert = credentials.certifications.find((c) => c.id === 'certiport-ai');
  const bnspCert = credentials.certifications.find((c) => c.id === 'bnsp-web-developer');

  const graduatedChipText = lang === 'in' ? 'Lulus 2026' : 'Graduated 2026';
  const periodLabel = lang === 'in' ? 'Periode:' : 'Period:';

  return (
    <>
      <section
        id="credentials"
        className="relative w-full py-16 lg:py-20 scroll-mt-[88px]"
      >
        <div className="site-container">
          {/* Section Header */}
          <div className="mb-10 sm:mb-12 text-left">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#F59E0B] shadow-xs shrink-0" />
              <span className="text-[12.5px] font-semibold tracking-[0.08em] text-[#6b6b6b] uppercase">
                {credentials.sectionLabel}
              </span>
            </div>

            <SectionTitle
              title={credentials.headline}
              className="text-[clamp(32px,4vw,50px)] font-semibold text-[#111111] leading-[1.12] tracking-[-0.035em] max-w-[720px]"
            />
          </div>

          {/* 1. Academic Degree: Sleek Row DIRECT on Page Background (NO Card, Top & Bottom Hairline Borders) */}
          <FadeUp className="py-5 sm:py-6 border-y border-black/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3.5">
              <div className="tactile-badge tactile-badge-yellow w-10 h-10 shrink-0">
                <GraduationCap size={20} strokeWidth={2.2} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#111111] tracking-tight">
                    {credentials.degree}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#10B981]/10 text-[#047857] text-[11.5px] font-semibold border border-[#10B981]/20">
                    {graduatedChipText}
                  </span>
                </div>
                <p className="text-[14px] text-[#555555] mt-0.5">
                  {credentials.university}
                </p>
              </div>
            </div>

            <div className="text-[13.5px] font-medium text-[#666666] md:text-right shrink-0">
              <span className="text-[#888888] mr-1.5">{periodLabel}</span>
              <span className="font-semibold text-[#111111] tabular-nums">{credentials.period}</span>
            </div>
          </FadeUp>

          {/* 2. Exactly Two Certificate Cards Side-by-Side (Equal Height) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch mt-8 sm:mt-10">
            {/* Certificate 1: Certiport Artificial Intelligence */}
            {certiportCert && (
              <FadeUp delay={0.1} className="bento-card p-6 sm:p-7 flex flex-col justify-between h-full group">
                <div className="space-y-4">
                  {/* Thumbnail on Top (16:10, contain, pure white canvas, light gray bg) */}
                  <div className="w-full aspect-[16/10] bg-[#F4F4F5] rounded-[14px] p-2 flex items-center justify-center overflow-hidden border border-black/5 shadow-inner">
                    <img
                      src="/certificates/certiport-thumb.png"
                      alt={certiportCert.title}
                      loading="lazy"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Issuer Chip + Date */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#2563EB]/10 text-[#1D4ED8] text-[11px] font-bold uppercase tracking-wider">
                      {certiportCert.issuer}
                    </span>
                    <span className="text-[12.5px] text-[#777777] tabular-nums">
                      {certiportCert.date}
                    </span>
                  </div>

                  {/* Title & Validity */}
                  <div>
                    <h4 className="text-[20px] sm:text-[22px] font-semibold text-[#111111] leading-snug tracking-tight">
                      {certiportCert.title}
                    </h4>
                    <p className="text-[13.5px] text-[#555555] mt-1">
                      {certiportCert.validity}
                    </p>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="flex flex-wrap items-center gap-3 pt-6 mt-4 border-t border-black/5">
                  <button
                    type="button"
                    onClick={() => setActiveCert(certiportCert)}
                    className="min-h-[44px] px-4 py-2 rounded-full bg-[#111111] text-white text-[13px] font-medium hover:bg-black/85 active:scale-95 transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye size={14} />
                    <span>{credentials.viewCertButton}</span>
                  </button>

                  {certiportCert.verification?.url && (
                    <a
                      href={certiportCert.verification.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] inline-flex items-center text-[13.5px] font-semibold text-[#2563EB] hover:underline px-2 py-1"
                    >
                      <span>{credentials.verifyLinkText}</span>
                    </a>
                  )}
                </div>
              </FadeUp>
            )}

            {/* Certificate 2: BNSP Certified Web Developer (CWDev) */}
            {bnspCert && (
              <FadeUp delay={0.15} className="bento-card p-6 sm:p-7 flex flex-col justify-between h-full group">
                <div className="space-y-4">
                  {/* Thumbnail on Top (16:10, contain, light gray bg) */}
                  <div className="w-full aspect-[16/10] bg-[#F4F4F5] rounded-[14px] p-2 flex items-center justify-center overflow-hidden border border-black/5 shadow-inner">
                    <img
                      src="/certificates/bnsp-web-developer.jpg"
                      alt={bnspCert.title}
                      loading="lazy"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Issuer Chip + Date */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#10B981]/10 text-[#047857] text-[11px] font-bold uppercase tracking-wider">
                      {bnspCert.issuer}
                    </span>
                    <span className="text-[12.5px] text-[#777777] tabular-nums">
                      {bnspCert.date}
                    </span>
                  </div>

                  {/* Title & Validity */}
                  <div>
                    <h4 className="text-[20px] sm:text-[22px] font-semibold text-[#111111] leading-snug tracking-tight">
                      {bnspCert.title}
                    </h4>
                    <p className="text-[13.5px] text-[#555555] mt-1">
                      {bnspCert.validity}
                    </p>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="flex flex-wrap items-center gap-3 pt-6 mt-4 border-t border-black/5">
                  <button
                    type="button"
                    onClick={() => setActiveCert(bnspCert)}
                    className="min-h-[44px] px-4 py-2 rounded-full bg-[#111111] text-white text-[13px] font-medium hover:bg-black/85 active:scale-95 transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye size={14} />
                    <span>{credentials.viewCertButton}</span>
                  </button>
                </div>
              </FadeUp>
            )}
          </div>
        </div>
      </section>

      {/* Certificate Document Modal (Preserved as required) */}
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
