import type { RefObject } from 'react';
import { motion } from 'motion/react';
import { MapPin, FileText } from 'lucide-react';
import type { PortfolioContent, Language } from '../data/content';
import { PROFILE_PHOTO_URL } from '../config/assets';
import { ENABLE_CV_MODAL } from '../config/features';
import { EDITORIAL_EASE, usePrefersReducedMotion } from '../components/ScrollAnimations';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenCV: () => void;
  lang: Language;
  content: PortfolioContent;
  cvTriggerRef?: RefObject<HTMLButtonElement | null>;
}

export function Hero({
  onNavigate,
  onOpenCV,
  content,
  cvTriggerRef,
}: HeroProps) {
  const { hero } = content;
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="hero"
      className="relative w-full bg-[#F5F5F5] text-[#111111] pt-28 pb-16 sm:pt-32 md:pt-36 md:pb-24 overflow-x-clip"
    >
      <div className="site-container flex flex-col items-start text-left md:items-center md:text-center">
        {/* Editorial Role & Location Label */}
        <motion.p
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EDITORIAL_EASE }}
          className="mb-4 text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-neutral-500"
        >
          {hero.roleLabel}
        </motion.p>

        {/* Bold High-Contrast Editorial Headline (Max 3 lines) */}
        <motion.h1
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EDITORIAL_EASE }}
          className="text-[30px] sm:text-[44px] md:text-[56px] lg:text-[64px] font-bold text-[#111111] tracking-[-0.015em] [word-spacing:0.04em] leading-[1.08] max-w-[18.5ch]"
        >
          {hero.headline}
        </motion.h1>

        {/* CTA Buttons: Emerald Primary + Minimalist Secondary */}
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: EDITORIAL_EASE }}
          className="mt-7 md:mt-8 flex flex-wrap items-center justify-start md:justify-center gap-3"
        >
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="px-6 py-3.5 rounded-xl bg-[#259B52] hover:bg-[#1F8244] active:scale-[0.98] text-white text-[15px] font-semibold tracking-tight shadow-[0_6px_18px_rgba(37,155,82,0.22)] transition-all duration-200 cursor-pointer"
          >
            {hero.ctaProjects}
          </button>

          {ENABLE_CV_MODAL && (
            <button
              ref={cvTriggerRef}
              type="button"
              onClick={onOpenCV}
              className="px-5 py-3.5 rounded-xl bg-white/80 hover:bg-white border border-neutral-300 hover:border-neutral-400 active:scale-[0.98] text-[#111111] text-[15px] font-medium transition-all duration-200 inline-flex items-center gap-2 cursor-pointer"
            >
              <FileText size={16} strokeWidth={1.9} className="text-[#525252]" />
              <span>{hero.ctaCv}</span>
            </button>
          )}
        </motion.div>

        {/* Portrait Frame Placeholder + Rotating Circular Text Badge */}
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.16, ease: EDITORIAL_EASE }}
          className="mt-11 md:mt-14 w-full flex flex-col items-start md:items-center"
        >
          {/* Portrait Wrapper: 72% max-w-[260px] on mobile, max-w-[320px] md:max-w-[340px] on desktop */}
          <div className="relative w-[72%] max-w-[260px] sm:max-w-[320px] md:w-full md:max-w-[340px]">
            {/* Portrait Card: 3:4.2 aspect ratio, full-bleed suit to edges */}
            <div className="relative w-full aspect-[3/4.2] rounded-2xl bg-gradient-to-b from-[#E4E6E8] via-[#D8DADC] to-[#CACDD0] border border-neutral-300/80 overflow-hidden flex items-end justify-center p-0">
              {PROFILE_PHOTO_URL ? (
                <img
                  src={PROFILE_PHOTO_URL}
                  alt="Iqbal Dwi Fathonah"
                  className="w-full h-auto block object-bottom scale-[1.01] origin-bottom select-none pointer-events-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.08)]"
                />
              ) : (
                /* Clean Minimalist Portrait Placeholder (Swap via PROFILE_PHOTO_URL in src/config/assets.ts) */
                <div className="relative w-full h-full flex flex-col items-center justify-end pt-10 select-none">
                  {/* Minimalist silhouette geometry */}
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-neutral-400/35 border border-neutral-400/20 mb-3" />
                  <div className="w-[74%] h-[42%] rounded-t-[80px] bg-neutral-400/30 border-t border-x border-neutral-400/20 flex items-center justify-center">
                    <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-neutral-600/80 font-medium">
                      {hero.photoPlaceholderLabel}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Rotating Circular Badge overlapping Top-Right Corner with #F5F5F5 cutout backing */}
            <div
              aria-hidden="true"
              className="absolute -top-7 -right-7 sm:-top-8 sm:-right-8 md:-top-9 md:-right-9 w-[104px] h-[104px] sm:w-[116px] sm:h-[116px] md:w-[126px] md:h-[126px] rounded-full bg-[#F5F5F5] flex items-center justify-center pointer-events-none select-none z-10"
            >
              <motion.svg
                viewBox="0 0 120 120"
                className="w-[96%] h-[96%] text-[#111111]"
                animate={reduced ? undefined : { rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 22,
                  ease: 'linear',
                }}
              >
                <defs>
                  <path
                    id="hero-badge-circle-path"
                    d="M 60, 60 m -41, 0 a 41,41 0 1,1 82,0 a 41,41 0 1,1 -82,0"
                  />
                </defs>
                <text
                  fill="currentColor"
                  fontSize="9.1"
                  fontWeight="700"
                  letterSpacing="2.45"
                >
                  <textPath href="#hero-badge-circle-path" startOffset="0%" textLength="252">
                    {hero.circularBadgeText}
                  </textPath>
                </text>
              </motion.svg>
            </div>
          </div>

          {/* Minimalist Location Row directly beneath Portrait Frame */}
          <p className="mt-3.5 w-full text-center text-xs sm:text-[13.5px] font-medium text-[#525252] leading-relaxed">
            <MapPin
              size={15}
              strokeWidth={1.8}
              aria-hidden="true"
              className="inline-block align-[-2px] mr-1.5 text-[#111111]"
            />
            <span>{hero.location}</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
