import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, ChevronLeft, ChevronRight, Monitor } from 'lucide-react';
import type { PortfolioContent, ProjectItem, Language } from '../data/content';
import { PROJECT_PREVIEW_IMAGES } from '../config/assets';
import { usePrefersReducedMotion, FadeUp, EDITORIAL_EASE } from '../components/ScrollAnimations';
import { stopLenis, startLenis } from '../hooks/useLenis';

interface ProjectDetailModalProps {
  project: ProjectItem;
  currentIndex: number;
  totalProjects: number;
  labels: PortfolioContent['projects']['modalLabels'];
  previewLabel: string;
  onClose: () => void;
  onNavigateProject: (newIndex: number) => void;
}

function ProjectDetailModal({
  project,
  currentIndex,
  totalProjects,
  labels,
  previewLabel,
  onClose,
  onNavigateProject,
}: ProjectDetailModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const onNavigateRef = useRef(onNavigateProject);
  onNavigateRef.current = onNavigateProject;
  const currentIdxRef = useRef(currentIndex);
  currentIdxRef.current = currentIndex;
  const totalRef = useRef(totalProjects);
  totalRef.current = totalProjects;

  useEffect(() => {
    stopLenis();
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseRef.current();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onNavigateRef.current(
          (currentIdxRef.current - 1 + totalRef.current) % totalRef.current
        );
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNavigateRef.current((currentIdxRef.current + 1) % totalRef.current);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      startLenis();
      document.body.style.overflow = origOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const previewImg = PROJECT_PREVIEW_IMAGES[project.id];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0.01 : 0.2 }}
      className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 lg:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.98 }}
        transition={{ duration: reducedMotion ? 0.01 : 0.24, ease: EDITORIAL_EASE }}
        className="relative w-full max-w-[780px] max-h-[92dvh] sm:max-h-[88dvh] flex flex-col bg-[#111111] text-[#FAFAFA] rounded-t-2xl sm:rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-neutral-800 bg-[#0A0A0A] shrink-0">
          <div className="flex items-center gap-3 min-w-0 pr-3">
            <span className="font-mono text-xs font-semibold text-[#259B52]">
              {project.index}
            </span>
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider truncate">
              {project.category}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label={labels.close}
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div data-lenis-prevent className="overflow-y-auto thin-scrollbar p-5 sm:p-7 space-y-6 flex-1 text-left">
          <h2
            id="project-modal-title"
            className="text-[22px] sm:text-[26px] font-bold text-white leading-tight tracking-tight"
          >
            {project.title}
          </h2>

          {/* Clean Preview Slot */}
          <div className="w-full aspect-[16/9] max-h-[260px] rounded-xl bg-[#0A0A0A] border border-neutral-800 overflow-hidden flex flex-col">
            {previewImg ? (
              <img
                src={previewImg}
                alt={project.title}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <>
                <div className="h-7 px-3.5 border-b border-neutral-800/80 flex items-center justify-between bg-[#141416]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-neutral-700" />
                    <span className="w-2 h-2 rounded-full bg-neutral-700" />
                    <span className="w-2 h-2 rounded-full bg-neutral-700" />
                  </div>
                  <span className="font-mono text-[11px] text-neutral-500">
                    {project.previewSubtitle}
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center p-4 text-center gap-2">
                  <Monitor size={24} strokeWidth={1.6} className="text-neutral-500" />
                  <p className="text-sm font-medium text-neutral-300">{previewLabel}</p>
                  <p className="font-mono text-xs text-neutral-500">{project.previewSubtitle}</p>
                </div>
              </>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.14em]">
              {labels.overview}
            </h3>
            <p className="text-[15px] text-neutral-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="space-y-2.5">
            <h3 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.14em]">
              {labels.tools}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-700 text-xs font-medium text-white"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.14em]">
              {labels.highlights}
            </h3>
            <ul className="space-y-3 text-[14.5px] text-neutral-300 leading-relaxed">
              {project.highlights.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#259B52] mt-2 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.dashboardUrl && (
            <div className="pt-2">
              <a
                href={project.dashboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#259B52] hover:underline"
              >
                <span>{labels.openDashboard}</span>
                <ExternalLink size={14} />
              </a>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-7 py-3.5 border-t border-neutral-800 bg-[#0A0A0A] flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={() => onNavigateProject((currentIndex - 1 + totalProjects) % totalProjects)}
            className="min-h-[40px] px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-xs sm:text-sm font-medium text-neutral-200 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft size={15} />
            <span>{labels.previous}</span>
          </button>

          <span className="text-xs font-mono text-neutral-500 tabular-nums">
            {`0${currentIndex + 1} / 0${totalProjects}`}
          </span>

          <button
            type="button"
            onClick={() => onNavigateProject((currentIndex + 1) % totalProjects)}
            className="min-h-[40px] px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-xs sm:text-sm font-medium text-neutral-200 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>{labels.next}</span>
            <ChevronRight size={15} />
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

export function Projects({ content, onModalStateChange }: ProjectsProps) {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { projects } = content;

  const openModal = useCallback((index: number) => {
    setActiveProjectIndex(index);
  }, []);

  const closeModal = useCallback(() => {
    const closedIdx = activeProjectIndex;
    setActiveProjectIndex(null);
    if (closedIdx !== null && triggerRefs.current[closedIdx]) {
      setTimeout(() => {
        triggerRefs.current[closedIdx]?.focus();
      }, 50);
    }
  }, [activeProjectIndex]);

  useEffect(() => {
    onModalStateChange?.(activeProjectIndex !== null);
  }, [activeProjectIndex, onModalStateChange]);

  const activeProject =
    activeProjectIndex !== null ? projects.items[activeProjectIndex] : null;

  return (
    <>
      <section
        id="projects"
        className="relative w-full bg-[#050505] text-[#FAFAFA] py-20 md:py-28 scroll-mt-16"
      >
        <div className="site-container">
          {/* Header: Left-aligned on mobile (<768px), Centered on desktop */}
          <FadeUp className="mb-12 md:mb-16 text-left md:text-center max-w-2xl md:mx-auto">
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold tracking-[-0.03em] leading-[1.08] text-[#FAFAFA]">
              {projects.headline}
            </h2>
            <p className="mt-3.5 text-[15px] md:text-[16px] text-[#737373] leading-relaxed">
              {projects.subtitle}
            </p>
          </FadeUp>

          {/* 3 High-Contrast Light-Gray Cards Stacked Vertically */}
          <div className="space-y-8 max-w-5xl mx-auto">
            {projects.items.map((project, idx) => {
              const previewImg = PROJECT_PREVIEW_IMAGES[project.id];

              return (
                <FadeUp key={project.id} delay={idx * 0.08}>
                  <article className="group relative bg-[#DFE1E4] text-neutral-950 rounded-2xl overflow-hidden flex flex-col transition-transform duration-300">
                    {/* Top Row: Title + Category Pill (Left) & Large Mono Index (Top-Right) */}
                    <div className="px-5 pt-5 pb-4 sm:px-7 sm:pt-7 md:px-9 md:pt-8 flex items-start justify-between gap-4">
                      <div className="min-w-0 text-left">
                        <h3 className="text-[20px] sm:text-[26px] md:text-[31px] font-bold tracking-[-0.025em] leading-[1.15] text-neutral-950">
                          {project.title}
                        </h3>
                        <span className="mt-2.5 inline-flex items-center rounded-full border border-neutral-500/60 px-3.5 py-1 text-[12px] md:text-[13px] font-medium text-neutral-800">
                          {project.category}
                        </span>
                      </div>

                      <span
                        aria-hidden="true"
                        className="font-mono text-[26px] sm:text-[32px] md:text-[40px] font-bold tracking-tight leading-none text-neutral-950/25 shrink-0 select-none"
                      >
                        {project.index}
                      </span>
                    </div>

                    {/* Middle Area: Dashboard Preview Slot (Ready for real screenshots via PROJECT_PREVIEW_IMAGES) */}
                    <div className="px-5 sm:px-7 md:px-9">
                      <div className="w-full aspect-[16/10] md:aspect-[16/9] max-h-[380px] rounded-xl bg-[#D1D4D8] border border-neutral-400/40 p-3 sm:p-4 md:p-6 flex items-center justify-center overflow-hidden">
                        {previewImg ? (
                          <img
                            src={previewImg}
                            alt={project.title}
                            className="w-full h-full object-cover object-top rounded-lg shadow-lg transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                        ) : (
                          /* Minimalist Screen Mockup Frame ready for real dashboard screenshots */
                          <div className="w-full h-full max-w-[660px] rounded-xl bg-[#111113] border border-neutral-800 shadow-[0_18px_40px_rgba(0,0,0,0.22)] flex flex-col overflow-hidden transition-transform duration-500 group-hover:scale-[1.015]">
                            {/* Browser/Window Top Bar */}
                            <div className="h-7 sm:h-8 px-3.5 border-b border-neutral-800/90 bg-[#0A0A0C] flex items-center justify-between shrink-0">
                              <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-neutral-700" />
                                <span className="w-2 h-2 rounded-full bg-neutral-700" />
                                <span className="w-2 h-2 rounded-full bg-neutral-700" />
                              </div>
                              <span className="font-mono text-[10.5px] sm:text-[11px] text-neutral-400 tracking-wide truncate">
                                {project.previewSubtitle}
                              </span>
                            </div>

                            {/* Clean Placeholder Canvas */}
                            <div className="flex-1 flex flex-col items-center justify-center p-4 text-center gap-2">
                              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400">
                                <Monitor size={18} strokeWidth={1.7} />
                              </div>
                              <p className="text-[13.5px] sm:text-[15px] font-semibold text-neutral-200 tracking-tight">
                                {projects.previewLabel}
                              </p>
                              <p className="font-mono text-[11px] sm:text-[12px] text-neutral-500">
                                {project.tools.join(' · ')}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Row: Left Tool Badges & Summary + Bottom-Right Dark Cutout Notch CTA */}
                    <div className="pt-5 md:pt-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                      {/* Left: Solid Black Tool Badges + Concise Verified Metric Summary */}
                      <div className="px-5 pb-1 sm:px-7 md:px-9 md:pb-8 flex-1 min-w-0 text-left">
                        <div className="flex flex-wrap items-center gap-2 mb-2.5">
                          {project.tools.map((tool) => (
                            <span
                              key={tool}
                              className="bg-neutral-950 text-white rounded-md px-3 py-1.5 text-xs font-medium tracking-wide"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                        <p className="text-[13.5px] sm:text-[14.5px] md:text-[15px] text-neutral-800 leading-relaxed line-clamp-2 md:line-clamp-3 max-w-[56ch]">
                          {project.shortSummary}
                        </p>
                      </div>

                      {/* Bottom-Right Cutout Notch: Cleanly flush to card bottom-right edge on both mobile & desktop */}
                      <div className="flex justify-end shrink-0">
                        <div className="bg-[#050505] rounded-tl-2xl pt-3 pl-3">
                          <button
                            ref={(el) => {
                              triggerRefs.current[idx] = el;
                            }}
                            type="button"
                            onClick={() => openModal(idx)}
                            className="border border-neutral-600 hover:bg-white hover:text-black hover:border-white active:scale-[0.98] text-white bg-[#050505] rounded-lg px-5 py-2.5 md:px-6 md:py-3 text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap"
                          >
                            {projects.viewCaseButton}
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {activeProject && activeProjectIndex !== null && (
          <ProjectDetailModal
            project={activeProject}
            currentIndex={activeProjectIndex}
            totalProjects={projects.items.length}
            labels={projects.modalLabels}
            previewLabel={projects.previewLabel}
            onClose={closeModal}
            onNavigateProject={setActiveProjectIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
}
