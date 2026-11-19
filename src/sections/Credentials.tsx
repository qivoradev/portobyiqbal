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

  return (
    <>
      <section
        id="credentials"
        className="relative w-full py-10 sm:py-14 px-4 sm:px-6 scroll-mt-[88px]"
      >
        <div className="w-full max-w-[1080px] mx-auto space-y-5 sm:space-y-6">
          {/* Section Header */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#F59E0B] shadow-xs shrink-0" />
              <span className="text-[12.5px] font-semibold tracking-[0.08em] text-[#6b6b6b] uppercase">
                {credentials.sectionLabel}
              </span>
            </div>

            <SectionTitle
              title={credentials.headline}
              className="text-[28px] sm:text-[38px] md:text-[42px] font-semibold text-[#111111] leading-[1.1] tracking-[-0.035em] max-w-[740px]"
            />
          </div>

          {/* Bento Grid:
              Desktop: Left Card (Pendidikan, Span 5, Full Height) | Right Stack (2 Certs, Span 7)
              Mobile: 1 Column
          */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
            {/* Left Bento: Academic Degree (Span 5) */}
            <FadeUp className="lg:col-span-5 bento-card p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-5">
                {/* Header with Graduation Cap Tactile Badge & Chip */}
                <div className="flex items-center justify-between">
                  <div className="tactile-badge tactile-badge-yellow w-11 h-11">
                    <GraduationCap size={22} strokeWidth={2.2} />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#10B981]/10 text-[#047857] text-[12px] font-semibold border border-[#10B981]/20">
                    {graduatedChipText}
                  </span>
                </div>

                {/* Degree Title & University */}
                <div className="space-y-2">
                  <span className="text-[12px] font-semibold tracking-[0.08em] text-[#6b6b6b] uppercase block">
                    {credentials.educationTitle}
                  </span>
                  <h3 className="text-[22px] sm:text-[25px] font-semibold text-[#111111] leading-snug tracking-tight">
                    {credentials.degree}
                  </h3>
                  <p className="text-[16px] text-[#3f3f3f] leading-relaxed">
                    {credentials.university}
                  </p>
                </div>
              </div>

              {/* Bottom Period */}
              <div className="mt-8 pt-4 border-t border-black/5 flex items-center justify-between text-[14px]">
                <span className="text-[#666666] font-medium">Periode:</span>
                <span className="font-semibold text-[#111111] tabular-nums">
                  {credentials.period}
                </span>
              </div>
            </FadeUp>

            {/* Right Stack (Span 7): Two Certificate Cards */}
            <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6 justify-between">
              {/* Card 1: Certiport Artificial Intelligence */}
              {certiportCert && (
                <FadeUp delay={0.1} className="bento-card p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-center">
                  {/* Thumbnail: Left */}
                  <div className="w-full sm:w-[160px] h-[115px] rounded-[14px] overflow-hidden border border-black/10 bg-white shrink-0 shadow-2xs">
                    <img
                      src="/certificates/certiport-thumb.png"
                      alt={certiportCert.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info & Actions: Right */}
                  <div className="flex-1 w-full space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-md bg-[#2563EB]/10 text-[#1D4ED8] text-[10.5px] font-bold uppercase tracking-wider">
                          {certiportCert.issuer}
                        </span>
                        <span className="text-[12px] text-[#777777] tabular-nums">
                          {certiportCert.date}
                        </span>
                      </div>
                      <h4 className="text-[18px] sm:text-[20px] font-semibold text-[#111111] leading-snug tracking-tight">
                        {certiportCert.title}
                      </h4>
                      <p className="text-[13.5px] text-[#555555] mt-0.5">
                        {certiportCert.validity}
                      </p>
                    </div>

                    {/* Actions: View Certificate Button + Verify Link (Single Arrow) */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveCert(certiportCert)}
                        className="w-full sm:w-auto min-h-[44px] px-4 py-2 rounded-full bg-[#111111] text-white text-[13px] font-medium hover:bg-black/85 active:scale-95 transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Eye size={14} />
                        <span>{credentials.viewCertButton}</span>
                      </button>

                      {certiportCert.verification?.url && (
                        <a
                          href={certiportCert.verification.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[13.5px] font-semibold text-[#2563EB] hover:underline px-2 py-1 flex items-center"
                        >
                          <span>{credentials.verifyLinkText}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </FadeUp>
              )}

              {/* Card 2: BNSP Certified Web Developer (CWDev) */}
              {bnspCert && (
                <FadeUp delay={0.15} className="bento-card p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-center">
                  {/* Thumbnail: Left */}
                  <div className="w-full sm:w-[160px] h-[115px] rounded-[14px] overflow-hidden border border-black/10 bg-white shrink-0 shadow-2xs">
                    <img
                      src="/certificates/bnsp-web-developer.jpg"
                      alt={bnspCert.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Info & Actions: Right */}
                  <div className="flex-1 w-full space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-md bg-[#10B981]/10 text-[#047857] text-[10.5px] font-bold uppercase tracking-wider">
                          {bnspCert.issuer}
                        </span>
                        <span className="text-[12px] text-[#777777] tabular-nums">
                          {bnspCert.date}
                        </span>
                      </div>
                      <h4 className="text-[18px] sm:text-[20px] font-semibold text-[#111111] leading-snug tracking-tight">
                        {bnspCert.title}
                      </h4>
                      <p className="text-[13.5px] text-[#555555] mt-0.5">
                        {bnspCert.validity}
                      </p>
                    </div>

                    {/* Actions: View Certificate Button */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveCert(bnspCert)}
                        className="w-full sm:w-auto min-h-[44px] px-4 py-2 rounded-full bg-[#111111] text-white text-[13px] font-medium hover:bg-black/85 active:scale-95 transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Eye size={14} />
                        <span>{credentials.viewCertButton}</span>
                      </button>
                    </div>
                  </div>
                </FadeUp>
              )}
            </div>
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
