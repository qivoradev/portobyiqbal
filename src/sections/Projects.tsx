import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, ChevronLeft, ChevronRight, FileSpreadsheet } from 'lucide-react';
import type { PortfolioContent, ProjectItem, Language } from '../data/content';
import { PROJECT_PREVIEW_IMAGES } from '../config/assets';
import { usePrefersReducedMotion, FadeUp } from '../components/ScrollAnimations';
import { stopLenis, startLenis } from '../hooks/useLenis';

interface ProjectDetailModalProps {
  project: ProjectItem;
  currentIndex: number;
  totalProjects: number;
  labels: PortfolioContent['projects']['modalLabels'];
  onClose: () => void;
  onNavigateProject: (newIndex: number) => void;
}

function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth >= breakpoint;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const update = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop(e.matches);
    };
    update(mql);
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [breakpoint]);

  return isDesktop;
}

function ProjectDetailModal({
  project,
  currentIndex,
  totalProjects,
  labels,
  onClose,
  onNavigateProject,
}: ProjectDetailModalProps) {
  const isDesktop = useIsDesktop(768);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const contentScrollRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const onNavigateRef = useRef(onNavigateProject);
  onNavigateRef.current = onNavigateProject;
  const currentIdxRef = useRef(currentIndex);
  currentIdxRef.current = currentIndex;
  const totalRef = useRef(totalProjects);
  totalRef.current = totalProjects;

  // Lock body scroll and stop Lenis while drawer is open
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

  // Reset scrollTop = 0 whenever a new project is opened or switched
  useEffect(() => {
    if (contentScrollRef.current) {
      contentScrollRef.current.scrollTop = 0;
    }
  }, [project.id]);

  const previewImg = PROJECT_PREVIEW_IMAGES[project.id] || project.image;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: reducedMotion ? 0.01 : isDesktop ? 0.38 : 0.36 }}
      className="fixed inset-0 z-50 overflow-hidden pointer-events-none"
    >
      {/* 1. Backdrop */}
      <motion.div
        key="project-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reducedMotion ? 0.01 : 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-[2px] pointer-events-auto"
        aria-hidden="true"
      />

      {/* 2. Responsive Panel: Wide Side Drawer (>= 768px) / Bottom Sheet (< 768px) */}
      <motion.div
        key={isDesktop ? 'desktop-drawer' : 'mobile-sheet'}
        initial={
          reducedMotion
            ? { opacity: 0 }
            : isDesktop
            ? { x: '100%' }
            : { y: '100%' }
        }
        animate={
          reducedMotion
            ? { opacity: 1 }
            : isDesktop
            ? { x: 0 }
            : { y: 0 }
        }
        exit={
          reducedMotion
            ? { opacity: 0 }
            : isDesktop
            ? { x: '100%' }
            : { y: '100%' }
        }
        transition={{
          duration: reducedMotion ? 0.01 : isDesktop ? 0.38 : 0.36,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={
          isDesktop
            ? "fixed inset-y-0 right-0 z-50 h-dvh w-full max-w-[820px] bg-[#0B0D0F] text-white border-l border-white/10 rounded-l-2xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
            : "fixed inset-x-0 bottom-0 z-50 max-h-[92dvh] w-full bg-[#0B0D0F] text-white border-t border-white/10 rounded-t-3xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
        }
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        {/* Mobile Grabber / Handle Bar */}
        <div className="md:hidden pt-3 pb-1 flex justify-center shrink-0 bg-[#0B0D0F]/95">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* Sticky Header */}
        <div className="shrink-0 border-b border-white/10 px-5 py-4 md:px-7 md:py-5 flex items-start justify-between gap-4 bg-[#0B0D0F]/95 backdrop-blur-md">
          <div className="min-w-0 space-y-1.5 flex-1">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold text-[#4ADE80] bg-[#259B52]/15 border border-[#259B52]/30 px-2 py-0.5 rounded-md shrink-0">
                {project.index}
              </span>
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider truncate">
                {project.category}
              </span>
            </div>
            <h2
              id="project-modal-title"
              className="text-lg md:text-xl lg:text-[22px] font-bold text-white leading-snug tracking-tight"
            >
              {project.title}
            </h2>
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-0.5 rounded-md bg-white/[0.07] border border-white/10 text-[11px] font-medium text-neutral-300"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="min-w-[36px] min-h-[36px] w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 mt-0.5"
            aria-label={labels.close}
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Scrollable Content Body with data-lenis-prevent */}
        <div
          ref={contentScrollRef}
          data-lenis-prevent
          className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 md:px-7 md:py-6 space-y-6 text-left"
        >
          {/* Dashboard Preview & Action Row */}
          <div className="space-y-3.5">
            <div className="w-full aspect-[16/10] rounded-xl bg-white p-2 sm:p-3 border border-white/10 flex items-center justify-center overflow-hidden shadow-md">
              <img
                src={previewImg}
                alt={project.title}
                className="w-full h-full object-contain rounded-lg select-none"
              />
            </div>

            {/* Action Row */}
            {project.id === 'pizza-sales' && (
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {project.liveDashboardUrl && (
                  <a
                    href={project.liveDashboardUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#259B52] hover:bg-[#1E7D42] text-white text-xs sm:text-sm font-semibold transition-colors duration-200 shadow-sm"
                  >
                    <span>{labels.openLiveDashboard}</span>
                    <ExternalLink size={15} />
                  </a>
                )}
                {project.datasetUrl && (
                  <a
                    href={project.datasetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-neutral-200 hover:text-white text-xs sm:text-sm font-medium transition-colors duration-200"
                  >
                    <span>{labels.viewDataset}</span>
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
            )}

            {project.id === 'nyc-traffic' && project.workbookInfo && (
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-neutral-300 text-xs sm:text-[13px] font-mono">
                <FileSpreadsheet size={15} className="text-[#4ADE80]" />
                <span>{project.workbookInfo}</span>
              </div>
            )}
          </div>

          {/* Grid 4 Metrik Kunci */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-[12px] font-bold text-neutral-400 uppercase tracking-[0.12em]">
                {labels.metricsHeading}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="bg-[#15181C] border border-white/[0.08] rounded-xl p-3.5 flex flex-col justify-between"
                  >
                    <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider leading-snug">
                      {m.label}
                    </span>
                    <span className="text-[20px] sm:text-[23px] font-bold text-white font-mono mt-1 leading-tight tabular-nums">
                      {m.value}
                    </span>
                    {m.subtext && (
                      <span className="text-[11.5px] text-neutral-400 mt-1 leading-snug">
                        {m.subtext}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Narasi Analisis Terstruktur */}
          {/* Latar Belakang Bisnis (Project 01) */}
          {project.businessContext && (
            <div className="space-y-2">
              <h3 className="text-[12px] font-bold text-neutral-400 uppercase tracking-[0.12em]">
                {project.businessContext.heading}
              </h3>
              <p className="text-[14.5px] text-neutral-300 leading-relaxed bg-[#13161A] border border-white/[0.06] rounded-xl p-4">
                {project.businessContext.body}
              </p>
            </div>
          )}

          {/* Temuan Utama (Project 01) */}
          {project.keyFindings && (
            <div className="space-y-2.5">
              <h3 className="text-[12px] font-bold text-neutral-400 uppercase tracking-[0.12em]">
                {project.keyFindings.heading}
              </h3>
              <div className="space-y-2.5">
                {project.keyFindings.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-[#13161A] border border-white/[0.06] rounded-xl p-3.5 text-[14px] text-neutral-300 leading-relaxed"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#4ADE80] mt-2 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rekomendasi Strategis (Project 01) */}
          {project.recommendations && (
            <div className="space-y-2.5">
              <h3 className="text-[12px] font-bold text-neutral-400 uppercase tracking-[0.12em]">
                {project.recommendations.heading}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {project.recommendations.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#13161A] border border-white/[0.06] rounded-xl p-3.5 flex flex-col gap-2"
                  >
                    <span className="font-mono text-xs font-bold text-[#4ADE80]">
                      0{idx + 1}
                    </span>
                    <p className="text-[13.5px] text-neutral-300 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Kerangka PAR (Project 02) */}
          {project.parFramework && (
            <div className="space-y-3">
              <h3 className="text-[12px] font-bold text-neutral-400 uppercase tracking-[0.12em]">
                {project.parFramework.heading}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-[#13161A] border border-white/[0.06] rounded-xl p-4 flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
                    Problem
                  </span>
                  <p className="text-[13.5px] text-neutral-300 leading-relaxed">
                    {project.parFramework.problem}
                  </p>
                </div>
                <div className="bg-[#13161A] border border-white/[0.06] rounded-xl p-4 flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
                    Action
                  </span>
                  <p className="text-[13.5px] text-neutral-300 leading-relaxed">
                    {project.parFramework.action}
                  </p>
                </div>
                <div className="bg-[#13161A] border border-[#259B52]/30 bg-[#259B52]/5 rounded-xl p-4 flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#4ADE80]">
                    Result
                  </span>
                  <p className="text-[13.5px] text-neutral-200 leading-relaxed">
                    {project.parFramework.result}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Kerangka What – So What – Now What (Project 02) */}
          {project.actionFramework && (
            <div className="space-y-3">
              <h3 className="text-[12px] font-bold text-neutral-400 uppercase tracking-[0.12em]">
                {project.actionFramework.heading}
              </h3>
              <div className="space-y-3">
                {project.actionFramework.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#13161A] border border-white/[0.06] rounded-xl p-4 space-y-2.5"
                  >
                    <h4 className="text-[14.5px] font-bold text-white tracking-tight">
                      {item.title}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                      <div className="bg-[#0E1012] p-3 rounded-lg border border-white/[0.04]">
                        <span className="text-[10.5px] font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                          What (Fakta)
                        </span>
                        <p className="text-[13px] text-neutral-300 leading-relaxed">
                          {item.what}
                        </p>
                      </div>
                      <div className="bg-[#0E1012] p-3 rounded-lg border border-white/[0.04]">
                        <span className="text-[10.5px] font-semibold uppercase tracking-wider text-amber-400 block mb-1">
                          So What (Makna)
                        </span>
                        <p className="text-[13px] text-neutral-300 leading-relaxed">
                          {item.soWhat}
                        </p>
                      </div>
                      <div className="bg-[#0E1012] p-3 rounded-lg border border-[#259B52]/30">
                        <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#4ADE80] block mb-1">
                          Now What (Aksi)
                        </span>
                        <p className="text-[13px] text-neutral-200 leading-relaxed">
                          {item.nowWhat}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Sticky */}
        <div className="px-5 sm:px-7 py-3.5 border-t border-white/10 bg-[#0A0C0E] flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={() => onNavigateProject((currentIndex - 1 + totalProjects) % totalProjects)}
            className="min-h-[38px] px-3.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-xs sm:text-sm font-medium text-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft size={16} />
            <span>{labels.previous}</span>
          </button>

          <span className="text-xs font-mono text-neutral-400 tabular-nums">
            {`0${currentIndex + 1} / 0${totalProjects}`}
          </span>

          <button
            type="button"
            onClick={() => onNavigateProject((currentIndex + 1) % totalProjects)}
            className="min-h-[38px] px-3.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-xs sm:text-sm font-medium text-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>{labels.next}</span>
            <ChevronRight size={16} />
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

          {/* 2 High-Contrast Light-Gray Cards Stacked Vertically (max-w-4xl, fits viewport comfortably) */}
          <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
            {projects.items.map((project, idx) => {
              const previewImg = PROJECT_PREVIEW_IMAGES[project.id] || project.image;

              return (
                <FadeUp key={project.id} delay={idx * 0.08}>
                  <article className="group relative bg-[#DFE1E4] text-neutral-950 rounded-2xl overflow-hidden flex flex-col transition-transform duration-300">
                    {/* Top Row: Title + Category Pill (Left) & Mono Index (Right) */}
                    <div className="px-5 pt-4 pb-3 md:px-6 md:pt-5 md:pb-3 flex items-start justify-between gap-4">
                      <div className="min-w-0 text-left">
                        <h3 className="text-lg sm:text-xl md:text-[22px] font-semibold tracking-tight leading-snug text-neutral-950">
                          {project.title}
                        </h3>
                        <span className="mt-1.5 inline-flex items-center rounded-full border border-neutral-500/60 px-2.5 py-0.5 text-[11px] font-medium text-neutral-800">
                          {project.category}
                        </span>
                      </div>

                      <span
                        aria-hidden="true"
                        className="font-mono text-2xl md:text-3xl font-semibold tracking-tight leading-none text-neutral-400 shrink-0 select-none"
                      >
                        {project.index}
                      </span>
                    </div>

                    {/* Middle Area: Dashboard Preview Screen Frame (Locked Height, Utuh & Anti-Terpotong) */}
                    <div className="mx-5 md:mx-6 rounded-xl bg-white border border-black/10 p-1.5 md:p-2 flex items-center justify-center h-[210px] sm:h-[290px] md:h-[340px] lg:h-[370px] overflow-hidden">
                      <img
                        src={previewImg}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-contain rounded-lg select-none"
                      />
                    </div>

                    {/* Bottom Row: Left Tool Badges & Summary + Bottom-Right Cutout Notch CTA */}
                    <div className="px-5 pt-3 pb-4 md:pl-6 md:pt-3.5 md:pb-4 flex flex-col md:flex-row md:items-end justify-between gap-3">
                      {/* Left: Solid Black Tool Badges + Concise Verified Metric Summary */}
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex flex-wrap items-center gap-1.5 mb-2">
                          {project.tools.map((tool) => (
                            <span
                              key={tool}
                              className="bg-neutral-950 text-white rounded-md px-2.5 py-1 text-[11.5px] font-medium tracking-wide"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                        <p className="text-[13px] sm:text-[13.5px] md:text-[14px] text-neutral-800 leading-relaxed line-clamp-2 max-w-[62ch]">
                          {project.shortSummary}
                        </p>
                      </div>

                      {/* Bottom-Right Cutout Notch CTA */}
                      <div className="flex justify-end shrink-0 -mr-5 -mb-4 md:-mr-6 md:-mb-4">
                        <div className="bg-[#050505] rounded-tl-2xl pt-2.5 pl-3">
                          <button
                            ref={(el) => {
                              triggerRefs.current[idx] = el;
                            }}
                            type="button"
                            onClick={() => openModal(idx)}
                            className="border border-neutral-600 hover:bg-white hover:text-black hover:border-white active:scale-[0.98] text-white bg-[#050505] rounded-lg px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap"
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
            onClose={closeModal}
            onNavigateProject={setActiveProjectIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
}
