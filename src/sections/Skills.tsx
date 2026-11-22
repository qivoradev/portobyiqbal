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
      className="relative w-full bg-[#F5F5F5] text-[#050505] pt-8 pb-20 md:pt-12 md:pb-24 scroll-mt-24"
    >
      <div className="site-container">
        {/* Minimalist Editorial 2-Side Header (No Eyebrow) */}
        <FadeUp className="max-w-5xl mx-auto mb-9 md:mb-11 flex flex-col md:flex-row md:items-end justify-between gap-3">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#050505] text-left">
            {skills.headline}
          </h2>
          <p className="max-w-md text-sm md:text-base text-neutral-600 md:text-right leading-relaxed text-left">
            {skills.subtitle}
          </p>
        </FadeUp>

        {/* Open Typographic List (3 Clean Hairline-Separated Rows) */}
        <div className="max-w-5xl mx-auto border-t border-black/15">
          {skills.items.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: reducedMotion ? 0.01 : 0.35,
                delay: reducedMotion ? 0 : idx * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group border-b border-black/15 py-7 md:py-9 space-y-3 md:space-y-0 md:grid md:grid-cols-12 md:gap-8 md:items-baseline text-left"
            >
              {/* Mobile pairs index + title; Desktop dissolves into col-span-1 & col-span-4 */}
              <div className="flex items-baseline gap-3.5 md:contents">
                {/* Col 1: Monospace Index */}
                <span className="md:col-span-1 font-mono text-sm text-neutral-400 transition-colors duration-200 group-hover:text-[#259B52] shrink-0 select-none">
                  {item.index}
                </span>

                {/* Col 2: Tool Name & Sub-Label */}
                <div className="md:col-span-4">
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#050505] transition-transform duration-200 md:group-hover:translate-x-1">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-500 mt-1 transition-transform duration-200 md:group-hover:translate-x-1">
                    {item.subLabel}
                  </p>
                </div>
              </div>

              {/* Col 3: Direct Concrete Paragraph */}
              <p className="md:col-span-7 text-sm md:text-base leading-relaxed text-neutral-700 transition-colors duration-200 group-hover:text-[#050505]">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
