import { useState, useEffect } from 'react';
import { GraduationCap, Award, Eye } from 'lucide-react';
import { CertificateModal } from '../components/CertificateModal';
import { AnimatePresence } from 'motion/react';
import type { CertificationItem, PortfolioContent } from '../data/content';

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

  return (
    <>
      <section id="credentials" className="relative w-full py-16 sm:py-24 px-4 sm:px-6">
        <div className="w-full max-w-[1140px] mx-auto space-y-8 sm:space-y-10">
          {/* Section Header */}
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#F59E0B] shadow-xs shrink-0" />
              <span className="text-[13px] font-semibold tracking-wider text-[#666666] uppercase">
                {credentials.sectionLabel}
              </span>
            </div>
            <h2 className="text-[28px] sm:text-[38px] font-semibold text-[#111111] leading-[1.1] tracking-[-0.035em]">
              {credentials.headline}
            </h2>
          </div>

          {/* Credentials Grid: Academic Degree (Left) & Verified Certifications (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            {/* Left: Academic Degree Card */}
            <div className="lg:col-span-5 bg-white rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 border border-black/5 shadow-[0_10px_25px_-8px_rgba(0,0,0,0.05)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-full bg-[#FFFBEB] flex items-center justify-center text-[#F59E0B] shrink-0">
                    <GraduationCap size={19} />
                  </div>
                  <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#111111] tracking-tight">
                    {credentials.educationTitle}
                  </h3>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[16px] sm:text-[17px] font-semibold text-black leading-snug">
                    {credentials.degree}
                  </h4>
                  <p className="text-[14px] text-[#555555]">
                    {credentials.university}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="px-3 py-1 rounded-full bg-[#F3F4F6] text-[12px] font-medium text-[#444444]">
                      {credentials.period}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F0F0F0] text-[13px] text-[#777777] leading-relaxed">
                {credentials.courseworkNote}
              </div>
            </div>

            {/* Right: Verified Certifications List (2 Cards) */}
            <div className="lg:col-span-7 bg-white rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 border border-black/5 shadow-[0_10px_25px_-8px_rgba(0,0,0,0.05)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] shrink-0">
                    <Award size={19} />
                  </div>
                  <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#111111] tracking-tight">
                    {credentials.certificationsTitle}
                  </h3>
                </div>

                <div className="space-y-3.5">
                  {credentials.certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-4 rounded-2xl bg-[#FAFAFA] border border-black/5 hover:bg-[#F5F5F5] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2 py-0.5 rounded-sm bg-[#EFEFEF] text-[11px] font-semibold text-[#333333]">
                            {cert.issuer}
                          </span>
                          <span className="text-[11.5px] text-[#777777]">
                            {cert.date}
                          </span>
                        </div>
                        <h4 className="font-semibold text-[15px] text-black leading-snug">
                          {cert.title}
                        </h4>
                        <p className="text-[12px] text-[#666666]">
                          {cert.validity}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveCert(cert)}
                        className="self-start sm:self-center shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-black/15 shadow-xs text-[12px] font-medium text-[#111111] hover:bg-[#111111] hover:text-white transition-all cursor-pointer active:scale-95"
                      >
                        <Eye size={13} />
                        <span>{credentials.viewCertButton}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Document Modal */}
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
