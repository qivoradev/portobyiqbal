import { Fragment } from 'react';
import { motion } from 'motion/react';
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
      className="relative w-full bg-[#F5F5F5] text-[#050505] pt-28 md:pt-36 pb-20 md:pb-24 scroll-mt-24"
    >
      <div className="site-container">
        {/* Asymmetric Split (4:8) Pure-Typography Layout */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column (4 cols): Headline + 1-Sentence Intro */}
          <FadeUp className="lg:col-span-4 text-left">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#050505]">
              {skills.headline}
            </h2>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-neutral-600 max-w-xs">
              {skills.subtitle}
            </p>
          </FadeUp>

          {/* Right Column (8 cols): 3 Vertical Hairline-Separated Typographic Rows */}
          <div className="lg:col-span-8 border-t border-black/15">
            {skills.items.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: reducedMotion ? 0.01 : 0.35,
                  delay: reducedMotion ? 0 : idx * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="border-b border-black/15 py-6 md:py-7 first:pt-6 group transition-colors duration-200 hover:border-black/30 text-left"
              >
                {/* Row 1: Tool Name + Monospace Context */}
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#050505]">
                    {item.title}
                  </h3>
                  <span className="font-mono text-xs md:text-sm text-neutral-500">
                    {item.context}
                  </span>
                </div>

                {/* Row 2: 1-Sentence Summary */}
                <p className="mt-2 text-sm md:text-base text-neutral-700 leading-relaxed">
                  {item.summary}
                </p>

                {/* Row 3: Inline Scope Typography (No Pills/Boxes) */}
                <p className="mt-3 text-xs md:text-sm text-neutral-500 flex flex-wrap items-center gap-x-2.5 gap-y-1 transition-colors duration-200 group-hover:text-neutral-800">
                  {item.scopes.map((scope, scopeIdx) => (
                    <Fragment key={scope}>
                      {scopeIdx > 0 && (
                        <span
                          aria-hidden="true"
                          className="text-[#259B52] select-none"
                        >
                          ·
                        </span>
                      )}
                      <span>{scope}</span>
                    </Fragment>
                  ))}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
