import { useState, useEffect } from 'react';
import { ProjectCardVisual } from '../components/ProjectCardVisual';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink } from 'lucide-react';
import type { PortfolioContent, ProjectItem, Language } from '../data/content';
import { SectionTitle, FadeUp } from '../components/ScrollAnimations';

interface ProjectDetailModalProps {
  project: ProjectItem;
  labels: PortfolioContent['projects']['modalLabels'];
  lang: Language;
  onClose: () => void;
}

function ProjectDetailModal({ project, labels, lang, onClose }: ProjectDetailModalProps) {
  useEffect(() => {
    const orig = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = orig;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 16 }}
        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[720px] max-h-[92vh] sm:max-h-[90vh] flex flex-col bg-white rounded-t-[28px] sm:rounded-[32px] border border-black/10 shadow-2xl overflow-hidden"
      >
        {/* Sticky Top Header */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 border-b border-[#F0F0F0] bg-[#FAFAFA] shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#10B981]" />
            <span className="text-[12px] font-semibold text-[#666666] uppercase tracking-wider">
              {project.category}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-black/10 hover:bg-[#F0F0F0] flex items-center justify-center text-[#444444] hover:text-black transition-colors cursor-pointer"
            aria-label={labels.close}
          >
            <X size={18} strokeWidth={1.8} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
          <h2 className="text-[22px] sm:text-[26px] font-semibold text-[#111111] leading-tight tracking-tight">
            {project.title}
          </h2>

          <div className="w-full h-[220px] sm:h-[260px] bg-white rounded-2xl border border-black/5 shadow-inner overflow-hidden">
            <ProjectCardVisual id={project.id} lang={lang} />
          </div>

          <div>
            <h3 className="font-semibold text-black text-[15px] sm:text-[16px] mb-1.5">
              {labels.context}
            </h3>
            <p className="text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
              {project.description}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-black text-[15px] sm:text-[16px] mb-2">
              {labels.tools}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="keycap px-3 py-1 text-[13px]">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-black text-[15px] sm:text-[16px] mb-2.5">
              {labels.highlights}
            </h3>
            <ul className="space-y-2.5 text-[14px] sm:text-[15px] text-[#444444] leading-relaxed">
              {project.highlights.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-2 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="px-5 sm:px-8 py-4 border-t border-[#F0F0F0] bg-[#FAFAFA] flex items-center justify-between shrink-0">
          <div>
            {project.dashboardUrl && (
              <a
                href={project.dashboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2563EB] hover:underline"
              >
                <span>{labels.openDashboard}</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#111111] text-white text-[13px] font-medium hover:bg-black/85 transition-colors cursor-pointer"
          >
            {labels.close}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface ProjectsProps {
  content: PortfolioContent;
  lang?: Language;
  onModalStateChange?: (open: boolean) => void;
}

export function Projects({ content, lang = 'in', onModalStateChange }: ProjectsProps) {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const { projects } = content;

  useEffect(() => {
    onModalStateChange?.(!!activeProject);
  }, [activeProject, onModalStateChange]);

  const viewCaseText = lang === 'in' ? 'Lihat Kasus ↗' : 'View case ↗';

  const pizzaProject = projects.items.find((p) => p.id === 'pizza-sales') || projects.items[0];
  const superstoreProject = projects.items.find((p) => p.id === 'superstore-sales') || projects.items[1];
  const nycProject = projects.items.find((p) => p.id === 'nyc-traffic') || projects.items[2];

  return (
    <>
      <section
        id="projects"
        className="relative w-full py-10 sm:py-14 px-4 sm:px-6 scroll-mt-[88px]"
      >
        <div className="w-full max-w-[1080px] mx-auto space-y-5 sm:space-y-6">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#10B981] shadow-xs shrink-0" />
                <span className="text-[12.5px] font-semibold tracking-[0.08em] text-[#6b6b6b] uppercase">
                  {projects.sectionLabel}
                </span>
              </div>
              <SectionTitle
                title={projects.headline}
                className="text-[28px] sm:text-[38px] md:text-[42px] font-semibold text-[#111111] leading-[1.1] tracking-[-0.035em] max-w-[740px]"
              />
            </div>
            <span className="text-[13px] sm:text-[14px] text-[#6b6b6b] font-medium">
              {projects.subtitle}
            </span>
          </div>

          {/* 1. Featured Project Card: Full-Width Bento (Span 12)
              Desktop: Left Text (Span 5) | Right Preview (Span 7)
          */}
          <FadeUp className="bento-card p-6 sm:p-8 md:p-9 group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
              {/* Text Side (Span 5) */}
              <div className="lg:col-span-5 space-y-4">
                {/* Number Badge & Category Pill */}
                <div className="flex items-center gap-3">
                  <div className="tactile-badge tactile-badge-green w-9 h-9 text-[13px] font-mono font-bold">
                    01
                  </div>
                  <span className="px-3 py-1 rounded-full bg-black/5 text-[11.5px] font-semibold uppercase tracking-wider text-[#555555]">
                    {pizzaProject.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[26px] sm:text-[32px] font-semibold text-[#111111] tracking-tight leading-[1.15]">
                  {pizzaProject.title}
                </h3>

                {/* 1-Sentence Summary (Max 2 lines, from CV) */}
                <p className="text-[16px] text-[#3f3f3f] leading-[1.6] line-clamp-2">
                  {pizzaProject.description}
                </p>

                {/* Keycaps Tools */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {pizzaProject.tools.map((t) => (
                    <span key={t} className="keycap px-3.5 py-1.5 text-[14px]">
                      {t}
                    </span>
                  ))}
                </div>

                {/* View Case Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveProject(pizzaProject)}
                    className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] text-white text-[13.5px] font-medium shadow-xs hover:bg-black/85 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>{viewCaseText}</span>
                  </button>
                </div>
              </div>

              {/* Large Preview Side (Span 7) */}
              <div
                className="lg:col-span-7 rounded-[20px] overflow-hidden border border-black/5 shadow-inner bg-white aspect-[16/11] sm:aspect-[16/10] cursor-pointer group-hover:shadow-md transition-all"
                onClick={() => setActiveProject(pizzaProject)}
              >
                <div className="w-full h-full transform group-hover:scale-[1.02] transition-transform duration-300">
                  <ProjectCardVisual id="pizza-sales" lang={lang} />
                </div>
              </div>
            </div>
          </FadeUp>

          {/* 2 & 3. Two Medium Bento Cards (Span 6 + 6) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
            {/* Superstore Sales Card (Span 6) */}
            <FadeUp delay={0.1} className="bento-card p-6 sm:p-8 flex flex-col justify-between group">
              <div className="space-y-4">
                {/* Preview on top */}
                <div
                  className="w-full aspect-[16/10] rounded-[20px] overflow-hidden border border-black/5 shadow-inner bg-white cursor-pointer group-hover:shadow-md transition-all"
                  onClick={() => setActiveProject(superstoreProject)}
                >
                  <div className="w-full h-full transform group-hover:scale-[1.02] transition-transform duration-300">
                    <ProjectCardVisual id="superstore-sales" lang={lang} />
                  </div>
                </div>

                {/* Number Badge & Category Pill */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="tactile-badge tactile-badge-blue w-9 h-9 text-[13px] font-mono font-bold">
                    02
                  </div>
                  <span className="px-3 py-1 rounded-full bg-black/5 text-[11.5px] font-semibold uppercase tracking-wider text-[#555555]">
                    {superstoreProject.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[22px] sm:text-[26px] font-semibold text-[#111111] tracking-tight leading-snug">
                  {superstoreProject.title}
                </h3>

                {/* 1-Sentence Summary (Max 2 lines) */}
                <p className="text-[15.5px] sm:text-[16px] text-[#3f3f3f] leading-[1.6] line-clamp-2">
                  {superstoreProject.description}
                </p>

                {/* Keycaps Tools */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {superstoreProject.tools.map((t) => (
                    <span key={t} className="keycap px-3.5 py-1.5 text-[14px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Case Action Button */}
              <div className="pt-5">
                <button
                  type="button"
                  onClick={() => setActiveProject(superstoreProject)}
                  className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] text-white text-[13.5px] font-medium shadow-xs hover:bg-black/85 active:scale-95 transition-all cursor-pointer"
                >
                  <span>{viewCaseText}</span>
                </button>
              </div>
            </FadeUp>

            {/* NYC Traffic Safety Card (Span 6) */}
            <FadeUp delay={0.15} className="bento-card p-6 sm:p-8 flex flex-col justify-between group">
              <div className="space-y-4">
                {/* Preview on top */}
                <div
                  className="w-full aspect-[16/10] rounded-[20px] overflow-hidden border border-black/5 shadow-inner bg-white cursor-pointer group-hover:shadow-md transition-all"
                  onClick={() => setActiveProject(nycProject)}
                >
                  <div className="w-full h-full transform group-hover:scale-[1.02] transition-transform duration-300">
                    <ProjectCardVisual id="nyc-traffic" lang={lang} />
                  </div>
                </div>

                {/* Number Badge & Category Pill */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="tactile-badge tactile-badge-yellow w-9 h-9 text-[13px] font-mono font-bold">
                    03
                  </div>
                  <span className="px-3 py-1 rounded-full bg-black/5 text-[11.5px] font-semibold uppercase tracking-wider text-[#555555]">
                    {nycProject.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[22px] sm:text-[26px] font-semibold text-[#111111] tracking-tight leading-snug">
                  {nycProject.title}
                </h3>

                {/* 1-Sentence Summary (Max 2 lines) */}
                <p className="text-[15.5px] sm:text-[16px] text-[#3f3f3f] leading-[1.6] line-clamp-2">
                  {nycProject.description}
                </p>

                {/* Keycaps Tools */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {nycProject.tools.map((t) => (
                    <span key={t} className="keycap px-3.5 py-1.5 text-[14px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Case Action Button */}
              <div className="pt-5">
                <button
                  type="button"
                  onClick={() => setActiveProject(nycProject)}
                  className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] text-white text-[13.5px] font-medium shadow-xs hover:bg-black/85 active:scale-95 transition-all cursor-pointer"
                >
                  <span>{viewCaseText}</span>
                </button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Detail Modal (Preserved as required) */}
      <AnimatePresence>
        {activeProject && (
          <ProjectDetailModal
            project={activeProject}
            labels={projects.modalLabels}
            lang={lang}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
