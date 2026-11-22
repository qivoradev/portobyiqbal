import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import type { PortfolioContent, Language } from '../data/content';
import { FadeUp, usePrefersReducedMotion } from '../components/ScrollAnimations';

interface SkillsProps {
  content: PortfolioContent;
  lang?: Language;
}

export function Skills({ content }: SkillsProps) {
  const { skills } = content;
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="skills"
      className="relative w-full bg-[#F5F5F5] text-[#050505] pt-6 pb-20 md:pt-10 md:pb-24 scroll-mt-24"
    >
      <div className="site-container">
        {/* 2-Column Asymmetric Header (No Eyebrow) */}
        <FadeUp className="max-w-6xl mx-auto mb-8 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-3">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#050505] text-left">
            {skills.headline}
          </h2>
          <p className="text-sm text-neutral-600 max-w-sm md:text-right leading-relaxed text-left">
            {skills.subtitle}
          </p>
        </FadeUp>

        {/* 3-Column Connected Pipeline (Zero-Click Scannability) */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-stretch">
          {skills.items.map((item, idx) => {
            const isLast = idx === skills.items.length - 1;

            return (
              <motion.div
                key={item.id}
                initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: reducedMotion ? 0.01 : 0.4,
                  delay: reducedMotion ? 0 : idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative h-full"
              >
                {/* Minimalist Horizontal Pipeline Connector (lg only, between cards 01->02 and 02->03) */}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="hidden lg:block absolute top-8 -right-6 w-6 h-px bg-black/15 pointer-events-none"
                  />
                )}

                <article
                  tabIndex={0}
                  className="group h-full flex flex-col bg-white border border-black/10 rounded-2xl text-[#050505] p-5 sm:p-6 transition-colors duration-300 lg:hover:bg-[#050505] lg:hover:border-[#050505] lg:hover:text-white lg:focus-within:bg-[#050505] lg:focus-within:border-[#050505] lg:focus-within:text-white text-left"
                >
                  {/* Stage Header Row + Flow Arrow (Cards 01 & 02 on lg) */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="w-2 h-2 rounded-full bg-[#259B52] lg:bg-neutral-300 lg:group-hover:bg-[#259B52] lg:group-focus-within:bg-[#259B52] transition-colors duration-300 shrink-0"
                      />
                      <span className="text-[11px] font-mono font-medium tracking-[0.15em] uppercase text-neutral-500 lg:group-hover:text-neutral-400 lg:group-focus-within:text-neutral-400 transition-colors duration-300">
                        {item.stageLabel}
                      </span>
                    </div>

                    {!isLast && (
                      <ArrowRight
                        size={14}
                        strokeWidth={1.8}
                        aria-hidden="true"
                        className="hidden lg:block shrink-0 text-neutral-400 lg:group-hover:text-[#259B52] lg:group-focus-within:text-[#259B52] lg:group-hover:translate-x-0.5 transition-all duration-300"
                      />
                    )}
                  </div>

                  {/* Tool Title & Sub-label */}
                  <div className="mt-4">
                    <h3 className="text-[22px] font-bold tracking-tight leading-snug text-[#050505] lg:group-hover:text-white lg:group-focus-within:text-white transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs font-mono tracking-wide text-neutral-500 lg:group-hover:text-neutral-400 lg:group-focus-within:text-neutral-400 transition-colors duration-300">
                      {item.subLabel}
                    </p>
                  </div>

                  {/* 3 Core Technical Capabilities */}
                  <ul className="mt-5 pt-4 border-t border-black/10 lg:group-hover:border-white/10 lg:group-focus-within:border-white/10 space-y-2.5 transition-colors duration-300">
                    {item.capabilities.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-neutral-600 lg:group-hover:text-neutral-300 lg:group-focus-within:text-neutral-300 transition-colors duration-300"
                      >
                        <span
                          aria-hidden="true"
                          className="w-2.5 h-[1.5px] rounded-full bg-[#259B52] mt-[10px] shrink-0"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Aligned Output Footer */}
                  <div className="mt-auto pt-5">
                    <div className="pt-4 border-t border-black/10 lg:group-hover:border-white/10 lg:group-focus-within:border-white/10 transition-colors duration-300">
                      <span className="block text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-neutral-400 lg:group-hover:text-[#259B52] lg:group-focus-within:text-[#259B52] transition-colors duration-300">
                        {skills.outputLabel}
                      </span>
                      <p className="mt-1 text-[13px] font-medium leading-snug text-[#050505] lg:group-hover:text-white lg:group-focus-within:text-white transition-colors duration-300">
                        {item.output}
                      </p>
                    </div>
                  </div>
                </article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
