import { useState, useEffect } from 'react';
import { Eye, ExternalLink } from 'lucide-react';
import { CertificateModal } from '../components/CertificateModal';
import { AnimatePresence } from 'motion/react';
import type { CertificationItem, PortfolioContent } from '../data/content';
import { SectionTitle } from '../components/ScrollAnimations';

interface CredentialsProps {
  content: PortfolioContent;
  onModalStateChange?: (open: boolean) => void;
}

export function Credentials({ content, onModalStateChange }: CredentialsProps) {
  const [activeCert, setActiveCert] = useState<CertificationItem | null>(null);
  const { credentials, certModal } = content;

  useEffect(() => {
    onModalStateChange?.(!!activeCert);
  }, [activeCert, onModalStateChange]);

  const certiportCert = credentials.certifications.find((c) => c.id === 'certiport-ai');
  const bnspCert = credentials.certifications.find((c) => c.id === 'bnsp-web-developer');

  return (
    <>
      <section
        id="credentials"
        className="relative w-full py-20 sm:py-28 px-4 sm:px-6 scroll-mt-[88px]"
      >
        <div className="w-full max-w-[1140px] mx-auto space-y-10 sm:space-y-12">
          {/* Section Header */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#F59E0B] shadow-xs shrink-0" />
              <span className="text-[13px] font-semibold tracking-wider text-[#666666] uppercase">
                {credentials.sectionLabel}
              </span>
            </div>

            <SectionTitle
              title={credentials.headline}
              className="text-[28px] sm:text-[38px] max-w-[720px]"
            />
          </div>

          {/* Ledger Single Container (No Cards, Separated by Thin Lines) */}
          <div className="w-full border-t border-black/10">
            {/* Row 1: Academic Degree (Education) */}
            <div className="group relative w-full py-6 sm:py-8 border-b border-black/10 transition-colors duration-200 hover:bg-black/[0.02] -mx-3 px-3 sm:-mx-4 sm:px-4 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-4 md:items-center">
                {/* Column 1: Date */}
                <div className="md:col-span-3">
                  <span className="text-[13px] font-mono text-[#777777] font-medium tabular-nums">
                    {credentials.period}
                  </span>
                </div>

                {/* Column 2: Title, Issuer, Institution */}
                <div className="md:col-span-6 space-y-0.5">
                  <h3 className="text-[17px] sm:text-[19px] font-semibold text-[#111111] leading-snug">
                    {credentials.degree}
                  </h3>
                  <p className="text-[13px] text-[#666666]">
                    {credentials.university}
                  </p>
                </div>

                {/* Column 3: Action (None for degree) */}
                <div className="md:col-span-3 flex md:justify-end">
                  <span className="text-[12px] font-mono text-[#999999] uppercase tracking-wider">
                    {credentials.educationTitle}
                  </span>
                </div>
              </div>
            </div>

            {/* Row 2: Certiport Artificial Intelligence */}
            {certiportCert && (
              <div className="group relative w-full py-6 sm:py-8 border-b border-black/10 transition-colors duration-200 hover:bg-black/[0.02] -mx-3 px-3 sm:-mx-4 sm:px-4 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:items-center">
                  {/* Column 1: Date */}
                  <div className="md:col-span-3">
                    <span className="text-[13px] font-mono text-[#777777] font-medium tabular-nums">
                      {certiportCert.date}
                    </span>
                  </div>

                  {/* Column 2: Title, Issuer & Validity */}
                  <div className="md:col-span-6 space-y-0.5">
                    <h3 className="text-[17px] sm:text-[19px] font-semibold text-[#111111] leading-snug">
                      {certiportCert.title}
                    </h3>
                    <div className="text-[13px] text-[#666666] flex flex-wrap items-center gap-x-2">
                      <span>{certiportCert.issuer}</span>
                      <span className="text-[#999999]">·</span>
                      <span className="text-[12px] text-[#888888]">
                        {certiportCert.validity}
                      </span>
                    </div>
                  </div>

                  {/* Column 3: Actions (Pill Button + Verify Link) */}
                  <div className="md:col-span-3 flex items-center md:justify-end gap-3 pt-2 md:pt-0">
                    <button
                      type="button"
                      onClick={() => setActiveCert(certiportCert)}
                      className="min-h-[44px] md:min-h-0 px-4 py-2 rounded-full bg-white border border-black/15 shadow-2xs text-[12.5px] font-medium text-[#111111] hover:bg-[#111111] hover:text-white transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
                    >
                      <Eye size={13} />
                      <span>{credentials.viewCertButton}</span>
                    </button>

                    {certiportCert.verification?.url && (
                      <a
                        href={certiportCert.verification.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] md:min-h-0 flex items-center gap-1 text-[12.5px] font-medium text-[#2563EB] hover:underline px-2"
                      >
                        <span>{credentials.verifyLinkText}</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Row 3: BNSP Certified Web Developer (CWDev) */}
            {bnspCert && (
              <div className="group relative w-full py-6 sm:py-8 border-b border-black/10 transition-colors duration-200 hover:bg-black/[0.02] -mx-3 px-3 sm:-mx-4 sm:px-4 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:items-center">
                  {/* Column 1: Date */}
                  <div className="md:col-span-3">
                    <span className="text-[13px] font-mono text-[#777777] font-medium tabular-nums">
                      {bnspCert.date}
                    </span>
                  </div>

                  {/* Column 2: Title, Issuer & Validity */}
                  <div className="md:col-span-6 space-y-0.5">
                    <h3 className="text-[17px] sm:text-[19px] font-semibold text-[#111111] leading-snug">
                      {bnspCert.title}
                    </h3>
                    <div className="text-[13px] text-[#666666] flex flex-wrap items-center gap-x-2">
                      <span>{bnspCert.issuer}</span>
                      <span className="text-[#999999]">·</span>
                      <span className="text-[12px] text-[#888888]">
                        {bnspCert.validity}
                      </span>
                    </div>
                  </div>

                  {/* Column 3: Action (Pill Button) */}
                  <div className="md:col-span-3 flex items-center md:justify-end gap-3 pt-2 md:pt-0">
                    <button
                      type="button"
                      onClick={() => setActiveCert(bnspCert)}
                      className="min-h-[44px] md:min-h-0 px-4 py-2 rounded-full bg-white border border-black/15 shadow-2xs text-[12.5px] font-medium text-[#111111] hover:bg-[#111111] hover:text-white transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
                    >
                      <Eye size={13} />
                      <span>{credentials.viewCertButton}</span>
                    </button>
                  </div>
                </div>
              </div>
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
