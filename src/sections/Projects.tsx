import { useState, useEffect, useRef, useCallback } from 'react';
import { ProjectCardVisual } from '../components/ProjectCardVisual';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, ChevronLeft, ChevronRight, Database, ArrowRight } from 'lucide-react';
import type { PortfolioContent, ProjectItem, Language } from '../data/content';
import { SectionTitle, usePrefersReducedMotion, FadeUp } from '../components/ScrollAnimations';

interface ProjectDetailModalProps {
  project: ProjectItem;
  currentIndex: number;
  totalProjects: number;
  labels: PortfolioContent['projects']['modalLabels'];
  lang: Language;
  onClose: () => void;
  onNavigateProject: (newIndex: number) => void;
}

function ProjectDetailModal({
  project,
  currentIndex,
  totalProjects,
  labels,
  lang,
  onClose,
  onNavigateProject,
}: ProjectDetailModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
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

  // Scroll lock and hardware back button handling
  useEffect(() => {
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    closeButtonRef.current?.focus();

    let popped = false;
    window.history.pushState({ projectModal: true }, '');

    const handlePopState = () => {
      popped = true;
      onCloseRef.current();
    };

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

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = origOverflow;
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
      if (!popped && window.history.state?.projectModal) {
        window.history.back();
      }
    };
  }, []);

  const prevText = labels.previous || (lang === 'in' ? '← Sebelumnya' : '← Previous');
  const nextText = labels.next || (lang === 'in' ? 'Berikutnya →' : 'Next →');
  const overviewTitle = labels.overview || (lang === 'in' ? 'Ringkasan' : 'Overview');
  const toolsTitle = labels.tools || 'Tools';
  const highlightsTitle = labels.highlights || (lang === 'in' ? 'Sorotan Implementasi' : 'Key Highlights');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0.01 : 0.2 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 lg:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={modalRef}
        initial={
          reducedMotion
            ? { opacity: 1 }
            : { opacity: 0, y: typeof window !== 'undefined' && window.innerWidth < 640 ? '100%' : 16, scale: 0.98 }
        }
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={
          reducedMotion
            ? { opacity: 0 }
            : { opacity: 0, y: typeof window !== 'undefined' && window.innerWidth < 640 ? '100%' : 16, scale: 0.98 }
        }
        transition={{ duration: reducedMotion ? 0.01 : 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[880px] h-[92dvh] sm:h-auto sm:max-h-[88dvh] flex flex-col bg-white rounded-t-[24px] sm:rounded-[28px] border border-black/10 shadow-2xl overflow-hidden"
      >
        {/* Sticky Header */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 sm:py-4 border-b border-[#F0F0F0] bg-[#FAFAFA] shrink-0">
          <div className="flex items-center gap-2.5 min-w-0 pr-3">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#10B981] shrink-0" />
            <span className="text-[12px] font-semibold text-[#666666] uppercase tracking-wider truncate">
              {project.category}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white border border-black/10 hover:bg-[#F0F0F0] active:scale-95 flex items-center justify-center text-[#333333] hover:text-black transition-colors cursor-pointer shrink-0"
            aria-label={labels.close || 'Close modal'}
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto thin-scrollbar p-5 sm:p-8 space-y-6 flex-1">
          <h2
            id="project-modal-title"
            className="text-[22px] sm:text-[28px] font-semibold text-[#111111] leading-tight tracking-tight"
          >
            {project.title}
          </h2>

          <div className="w-full aspect-[16/9] max-h-[280px] bg-white rounded-2xl border border-black/10 shadow-inner overflow-hidden">
            <ProjectCardVisual id={project.id} lang={lang} />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-[12px] font-semibold text-black uppercase tracking-wider">
              {overviewTitle}
            </h3>
            <p className="text-[15px] sm:text-[16px] text-[#444444] leading-relaxed max-w-[65ch]">
              {project.description}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-[12px] font-semibold text-black uppercase tracking-wider">
              {toolsTitle}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="keycap px-3 py-1.5 text-[13px]">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-[12px] font-semibold text-black uppercase tracking-wider">
              {highlightsTitle}
            </h3>
            <ul className="space-y-3 text-[14.5px] sm:text-[15px] text-[#333333] leading-relaxed">
              {project.highlights.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] mt-2 shrink-0 shadow-2xs" />
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
                className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#2563EB] hover:underline"
              >
                <span>{labels.openDashboard}</span>
                <ExternalLink size={14} />
              </a>
            </div>
          )}
        </div>

        {/* Sticky Footer */}
        <div className="px-5 sm:px-8 py-3.5 sm:py-4 border-t border-[#F0F0F0] bg-[#FAFAFA] flex items-center justify-between shrink-0 pb-[max(14px,env(safe-area-inset-bottom,14px))]">
          <button
            type="button"
            onClick={() => onNavigateProject((currentIndex - 1 + totalProjects) % totalProjects)}
            className="min-h-[44px] px-4 py-2 rounded-full bg-white border border-black/10 hover:bg-[#F5F5F5] active:scale-95 text-[13px] font-medium text-[#111111] transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
            aria-label="Previous project"
          >
            <ChevronLeft size={16} />
            <span>{prevText}</span>
          </button>

          <span className="text-[12.5px] font-mono text-[#777777] tabular-nums">
            {`0${currentIndex + 1} / 0${totalProjects}`}
          </span>

          <button
            type="button"
            onClick={() => onNavigateProject((currentIndex + 1) % totalProjects)}
            className="min-h-[44px] px-4 py-2 rounded-full bg-white border border-black/10 hover:bg-[#F5F5F5] active:scale-95 text-[13px] font-medium text-[#111111] transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
            aria-label="Next project"
          >
            <span>{nextText}</span>
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

export function Projects({ content, lang = 'in', onModalStateChange }: ProjectsProps) {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const cardTriggerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { projects } = content;

  const openModal = useCallback((index: number) => {
    setActiveProjectIndex(index);
  }, []);

  const closeModal = useCallback(() => {
    const closedIndex = activeProjectIndex;
    setActiveProjectIndex(null);
    if (closedIndex !== null && cardTriggerRefs.current[closedIndex]) {
      setTimeout(() => {
        cardTriggerRefs.current[closedIndex]?.focus();
      }, 50);
    }
  }, [activeProjectIndex]);

  const handleNavigateProject = useCallback((newIdx: number) => {
    setActiveProjectIndex(newIdx);
  }, []);

  useEffect(() => {
    onModalStateChange?.(activeProjectIndex !== null);
  }, [activeProjectIndex, onModalStateChange]);

  const activeProject =
    activeProjectIndex !== null ? projects.items[activeProjectIndex] : null;

  const accentStyles = [
    {
      bg: 'bg-[color-mix(in_oklab,#10B981_7%,#FFFFFF)]',
      border: 'border-[color-mix(in_oklab,#10B981_20%,#E5E7EB)]',
      badge: 'tactile-badge-green',
      iconColor: 'text-[#10B981]',
    },
    {
      bg: 'bg-[color-mix(in_oklab,#2563EB_7%,#FFFFFF)]',
      border: 'border-[color-mix(in_oklab,#2563EB_20%,#E5E7EB)]',
      badge: 'tactile-badge-blue',
      iconColor: 'text-[#2563EB]',
    },
    {
      bg: 'bg-[color-mix(in_oklab,#F59E0B_7%,#FFFFFF)]',
      border: 'border-[color-mix(in_oklab,#F59E0B_20%,#E5E7EB)]',
      badge: 'tactile-badge-yellow',
      iconColor: 'text-[#F59E0B]',
    },
  ];

  const featuredProject = projects.items[0];
  const secondaryProjects = projects.items.slice(1);

  return (
    <>
      <section
        id="projects"
        className="relative w-full py-12 sm:py-16 lg:py-20 scroll-mt-[88px]"
      >
        <div className="site-container">
          {/* Section Header: Eyebrow + Single Line Headline */}
          <div className="mb-8 sm:mb-10 lg:mb-12 text-left">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#10B981] shadow-xs shrink-0" />
              <span className="text-[12.5px] font-semibold tracking-[0.08em] text-[#6b6b6b] uppercase">
                {projects.sectionLabel}
              </span>
            </div>
            <SectionTitle
              title={projects.headline}
              className="text-[clamp(30px,6.5vw,56px)] font-semibold text-[#111111] leading-[1.08] tracking-[-0.035em] max-w-[720px]"
            />
          </div>

          {/* Normal Responsive Grid (ZERO Sticky) */}
          <div className="flex flex-col gap-6">
            {/* ROW 1: Featured Project (Pizza Sales) */}
            {/* Desktop: Horizontal layout (Preview 55%, Text 45%, min-height 360px). Mobile/Tablet: Vertical */}
            {featuredProject && (
              <FadeUp>
                <div
                  ref={(el) => {
                    cardTriggerRefs.current[0] = el;
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${featuredProject.title} — ${projects.viewDetails}`}
                  onClick={() => openModal(0)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openModal(0);
                    }
                  }}
                  className={`group relative w-full rounded-[28px] border ${accentStyles[0].bg} ${accentStyles[0].border} p-5 sm:p-7 lg:p-8 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.06)] hover:-translate-y-1 active:scale-[0.99] transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:outline-hidden`}
                >
                  {/* Desktop Layout (≥1024px): Horizontal 2-col (Preview ~55% / Text ~45%) */}
                  <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch min-h-[360px]">
                    {/* Left: Preview Frame (~55%) */}
                    <div className="col-span-7 rounded-[22px] overflow-hidden bg-white/50 border border-black/5 shadow-inner flex flex-col h-full min-h-[340px]">
                      <div className="w-full h-full transform transition-transform duration-300 group-hover:scale-[1.03]">
                        <ProjectCardVisual
                          id={featuredProject.id}
                          lang={lang}
                          previewLabel={featuredProject.previewLabel}
                        />
                      </div>
                    </div>

                    {/* Right: Text Column (~45%) */}
                    <div className="col-span-5 flex flex-col justify-between py-1 text-left">
                      <div>
                        {/* Tactile Badge + Category */}
                        <div className="flex items-center gap-2.5 mb-3">
                          <div className={`tactile-badge ${accentStyles[0].badge} w-7 h-7 text-white text-[12px] font-bold shrink-0`}>
                            01
                          </div>
                          <span className="text-[13px] font-semibold tracking-wider text-[#555555] uppercase">
                            {featuredProject.category}
                          </span>
                        </div>

                        {/* Full Project Title: 28-32px */}
                        <h3 className="text-[28px] xl:text-[32px] font-bold text-[#111111] leading-tight tracking-tight mb-3">
                          {featuredProject.title}
                        </h3>

                        {/* Summary: 1-2 Sentences, max 3 lines */}
                        <p className="text-[15.5px] xl:text-[16px] text-[#444444] leading-[1.6] line-clamp-3 mb-4">
                          {featuredProject.description}
                        </p>

                        {/* Fact Line with Database Icon */}
                        <div className="flex items-center gap-2 text-[14px] font-medium text-[#222222]">
                          <Database size={15} className={`${accentStyles[0].iconColor} shrink-0`} />
                          <span>{featuredProject.fact}</span>
                        </div>
                      </div>

                      {/* Hairline + Bottom Action Row */}
                      <div className="pt-4 mt-4 border-t border-black/10 flex items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-1.5">
                          {featuredProject.tools.map((t) => (
                            <span key={t} className="keycap px-2.5 py-1 text-[12px]">
                              {t}
                            </span>
                          ))}
                        </div>

                        <span className="shrink-0 text-[13.5px] font-semibold text-[#111111] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                          {projects.viewDetails}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tablet & Mobile Layout (<1024px): 1-Column Vertical */}
                  <div className="lg:hidden flex flex-col gap-4 text-left">
                    {/* Preview (16:10 ratio) */}
                    <div className="w-full aspect-[16/10] min-h-[200px] sm:min-h-[240px] rounded-[20px] overflow-hidden bg-white/50 border border-black/5 shadow-inner">
                      <div className="w-full h-full transform transition-transform duration-300 group-hover:scale-[1.03]">
                        <ProjectCardVisual
                          id={featuredProject.id}
                          lang={lang}
                          previewLabel={featuredProject.previewLabel}
                        />
                      </div>
                    </div>

                    {/* Badge + Category */}
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`tactile-badge ${accentStyles[0].badge} w-6 h-6 text-white text-[11px] font-bold shrink-0`}>
                        01
                      </div>
                      <span className="text-[12.5px] font-semibold tracking-wider text-[#555555] uppercase">
                        {featuredProject.category}
                      </span>
                    </div>

                    {/* Full Project Title: 24-28px */}
                    <h3 className="text-[22px] sm:text-[26px] font-bold text-[#111111] leading-tight tracking-tight">
                      {featuredProject.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-[15px] sm:text-[16px] text-[#444444] leading-relaxed line-clamp-3">
                      {featuredProject.description}
                    </p>

                    {/* Fact Line with Database Icon */}
                    <div className="flex items-center gap-2 text-[13.5px] font-medium text-[#222222]">
                      <Database size={15} className={`${accentStyles[0].iconColor} shrink-0`} />
                      <span>{featuredProject.fact}</span>
                    </div>

                    {/* Hairline + Action Row */}
                    <div className="pt-3.5 border-t border-black/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {featuredProject.tools.map((t) => (
                          <span key={t} className="keycap px-2.5 py-1 text-[12px]">
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Full-width touch target button on mobile */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(0);
                        }}
                        className="w-full sm:w-auto min-h-[48px] px-6 rounded-full bg-[#111111] text-white text-[13.5px] font-medium hover:bg-black/85 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <span>{projects.viewDetails}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </FadeUp>
            )}

            {/* ROW 2: Superstore & NYC Traffic */}
            {/* Desktop: 2 Equal Columns (grid-cols-2), Equal Height (items-stretch), Vertical Layout */}
            {/* Tablet & Mobile: 1 Column */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {secondaryProjects.map((project, sIdx) => {
                const idx = sIdx + 1;
                const accent = accentStyles[idx] || accentStyles[1];

                return (
                  <FadeUp key={project.id} delay={0.1 * idx}>
                    <div
                      ref={(el) => {
                        cardTriggerRefs.current[idx] = el;
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`${project.title} — ${projects.viewDetails}`}
                      onClick={() => openModal(idx)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openModal(idx);
                        }
                      }}
                      className={`group relative w-full h-full rounded-[28px] border ${accent.bg} ${accent.border} p-5 sm:p-7 lg:p-8 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.06)] hover:-translate-y-1 active:scale-[0.99] transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:outline-hidden flex flex-col justify-between`}
                    >
                      <div className="flex flex-col text-left">
                        {/* Preview: Aspect 16:10 */}
                        <div className="w-full aspect-[16/10] min-h-[200px] sm:min-h-[220px] rounded-[20px] overflow-hidden bg-white/50 border border-black/5 shadow-inner mb-4">
                          <div className="w-full h-full transform transition-transform duration-300 group-hover:scale-[1.03]">
                            <ProjectCardVisual
                              id={project.id}
                              lang={lang}
                              previewLabel={project.previewLabel}
                            />
                          </div>
                        </div>

                        {/* Badge + Category */}
                        <div className="flex items-center gap-2 mb-2.5">
                          <div className={`tactile-badge ${accent.badge} w-6 h-6 sm:w-7 sm:h-7 text-white text-[11px] sm:text-[12px] font-bold shrink-0`}>
                            0{idx + 1}
                          </div>
                          <span className="text-[12.5px] sm:text-[13px] font-semibold tracking-wider text-[#555555] uppercase">
                            {project.category}
                          </span>
                        </div>

                        {/* Full Project Title: 24-28px */}
                        <h3 className="text-[22px] sm:text-[25px] font-bold text-[#111111] leading-tight tracking-tight mb-2.5">
                          {project.title}
                        </h3>

                        {/* Summary: 1-2 Sentences, max 3 lines */}
                        <p className="text-[15px] sm:text-[15.5px] text-[#444444] leading-[1.6] line-clamp-3 mb-4">
                          {project.description}
                        </p>

                        {/* Fact Line with Database Icon */}
                        <div className="flex items-center gap-2 text-[13.5px] font-medium text-[#222222] mb-4">
                          <Database size={15} className={`${accent.iconColor} shrink-0`} />
                          <span>{project.fact}</span>
                        </div>
                      </div>

                      {/* Hairline + Bottom Action Row */}
                      <div className="pt-4 border-t border-black/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-auto">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tools.map((t) => (
                            <span key={t} className="keycap px-2.5 py-1 text-[12px]">
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Desktop & Tablet: inline link text. Mobile (<640px): full width button */}
                        <div className="hidden sm:block">
                          <span className="shrink-0 text-[13.5px] font-semibold text-[#111111] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                            {projects.viewDetails}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(idx);
                          }}
                          className="sm:hidden w-full min-h-[48px] px-6 rounded-full bg-[#111111] text-white text-[13.5px] font-medium hover:bg-black/85 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <span>{projects.viewDetails}</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </FadeUp>
                );
              })}
            </div>
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
            lang={lang}
            onClose={closeModal}
            onNavigateProject={handleNavigateProject}
          />
        )}
      </AnimatePresence>
    </>
  );
}
