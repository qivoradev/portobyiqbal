import { useState, useCallback } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import type { PortfolioContent } from '../data/content';

interface ContactProps {
  content: PortfolioContent;
}

export function Contact({ content }: ContactProps) {
  const [copied, setCopied] = useState(false);
  const { contact } = content;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = contact.email;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [contact.email]);

  return (
    <section id="contact" className="relative w-full pt-16 sm:pt-24 pb-32 sm:pb-28 px-4 sm:px-6">
      <div className="w-full max-w-[1140px] mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#EF4444] shadow-xs" />
          <span className="text-[13px] font-semibold tracking-wider text-[#666666] uppercase">
            {contact.sectionLabel}
          </span>
        </div>

        {/* Large Tactile Contact Card - Balanced Centered Column */}
        <div className="bg-white rounded-[32px] sm:rounded-[40px] py-12 sm:py-16 px-5 sm:px-12 border border-black/5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.03)] text-center flex flex-col items-center">
          {/* 1. Headline */}
          <h2 className="text-[32px] sm:text-[46px] md:text-[54px] font-semibold text-[#111111] leading-[1.08] tracking-[-0.04em] max-w-[680px] mb-3.5 sm:mb-4">
            {contact.heading}
          </h2>

          {/* 2. Kalimat pendukung */}
          <p className="text-[15px] sm:text-[16.5px] text-[#555555] max-w-[540px] leading-relaxed mb-8 sm:mb-9">
            {contact.subheading}
          </p>

          {/* 3. Pill Email with Copy button inside */}
          <div className="w-full max-w-[460px] flex items-center justify-between p-1.5 pl-4 sm:pl-6 rounded-full bg-[#F4F4F4] border border-black/10 shadow-inner mb-6 sm:mb-7">
            <span className="text-[13px] sm:text-[15px] font-medium text-black truncate select-all pr-2 text-left">
              {contact.email}
            </span>

            <button
              type="button"
              onClick={handleCopy}
              className="shrink-0 flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#111111] text-white text-[12px] sm:text-[13px] font-medium shadow-sm hover:bg-black/85 active:scale-95 transition-all cursor-pointer"
              aria-label={copied ? contact.copiedButton : contact.copyButton}
            >
              {copied ? (
                <>
                  <Check size={14} className="text-[#10B981] shrink-0" />
                  <span className="hidden xs:inline">{contact.copiedButton}</span>
                  <span className="xs:hidden">✓</span>
                </>
              ) : (
                <>
                  <Copy size={14} className="shrink-0" />
                  <span className="hidden xs:inline">{contact.copyButton}</span>
                </>
              )}
            </button>
          </div>

          {/* 4. Row of two pills: LinkedIn and GitHub (Equal width & height 44-48px, gap 12-16px, centered) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-[340px]">
            {contact.socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target={social.url !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="h-11 sm:h-12 flex items-center justify-center gap-2 px-4 rounded-full bg-white border border-black/15 shadow-xs text-[13px] font-medium text-[#222222] hover:bg-[#F9F9F9] hover:border-black/30 active:scale-95 transition-all cursor-pointer"
              >
                <span>{social.label}</span>
                <ArrowUpRight size={13} className="text-[#888888] shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* Minimal Footer */}
        <footer className="mt-14 pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] sm:text-[13px] text-[#777777]">
          <div>{contact.footerCopy}</div>
          <div>{contact.footerLocation}</div>
        </footer>
      </div>
    </section>
  );
}
