import { useState, useEffect, useRef, useCallback } from 'react';
import { ProjectCardVisual } from '../components/ProjectCardVisual';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, ChevronLeft, ChevronRight, Database, ArrowRight } from 'lucide-react';
import type { PortfolioContent, ProjectItem, Language } from '../data/content';
import { usePrefersReducedMotion, FadeUp } from '../components/ScrollAnimations';

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
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 sm:py-4 border-b border-[#F0F0F0] bg-[#FAFAFA] shrink-0">
          <div className="flex items-center gap-2.5 min-w-0 pr-3">
            <span className="w-2 h-2 rounded-full bg-[#111111] shrink-0" />
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
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-2.5 shrink-0" />
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
                className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#111111] underline hover:text-[#555]"
              >
                <span>{labels.openDashboard}</span>
                <ExternalLink size={14} />
              </a>
            </div>
          )}
        </div>

        {/* Modal Footer */}
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

/**
 * Minimalist Monochrome Thumbnail Component:
 * - If public/projects/<slug>.webp (or .png/.jpg) exists, display it (object-fit: cover, object-position: top).
 * - Otherwise: thin near-black lines on #f3f3f1 background, without legend/axis/text/numbers/colors.
 *   01: dual-peak curve
 *   02: paired thin horizontal bars
 *   03: small histogram
 * - Includes bottom-left corner "Sample" tag (10-11px).
 */
function ProjectThumbnail({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [imgError, setImgError] = useState(false);
  const slug = id === 'superstore-sales' ? 'superstore' : id;
  const imageSrc = `/projects/${slug}.webp`;

  if (!imgError) {
    return (
      <div className="relative w-full h-full bg-[#f3f3f1] rounded-[10px] md:rounded-[12px] overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-top transform transition-transform duration-200 group-hover:scale-[1.02]"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-[#f3f3f1] rounded-[10px] md:rounded-[12px] overflow-hidden flex items-center justify-center p-2.5 sm:p-3 select-none">
      <div className="w-full h-full flex items-center justify-center transform transition-transform duration-200 group-hover:scale-[1.02]">
        {id === 'pizza-sales' && (
          /* 01: Dual-peak curve (Thin near-black line, no numbers, no legend) */
          <svg viewBox="0 0 200 120" className="w-full h-full max-h-[92px]" preserveAspectRatio="none">
            <line x1="16" y1="88" x2="184" y2="88" stroke="#111111" strokeOpacity="0.12" strokeWidth="1" />
            <path
              d="M 16 88 C 38 88, 48 38, 68 38 C 88 38, 98 68, 118 68 C 138 68, 148 30, 168 30 C 182 30, 188 88, 194 88"
              fill="none"
              stroke="#111111"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        )}

        {id === 'superstore-sales' && (
          /* 02: Paired thin horizontal bars (Thin near-black bars, no numbers, no legend) */
          <svg viewBox="0 0 200 120" className="w-full h-full max-h-[92px]" preserveAspectRatio="none">
            <line x1="24" y1="18" x2="24" y2="102" stroke="#111111" strokeOpacity="0.12" strokeWidth="1" />
            <rect x="24" y="24" width="135" height="3.5" rx="1" fill="#111111" />
            <rect x="24" y="31.5" width="85" height="3.5" rx="1" fill="#111111" fillOpacity="0.32" />
            <rect x="24" y="45" width="155" height="3.5" rx="1" fill="#111111" />
            <rect x="24" y="52.5" width="105" height="3.5" rx="1" fill="#111111" fillOpacity="0.32" />
            <rect x="24" y="66" width="95" height="3.5" rx="1" fill="#111111" />
            <rect x="24" y="73.5" width="60" height="3.5" rx="1" fill="#111111" fillOpacity="0.32" />
            <rect x="24" y="87" width="120" height="3.5" rx="1" fill="#111111" />
            <rect x="24" y="94.5" width="75" height="3.5" rx="1" fill="#111111" fillOpacity="0.32" />
          </svg>
        )}

        {id === 'nyc-traffic' && (
          /* 03: Small histogram (Thin near-black bars, no numbers, no legend) */
          <svg viewBox="0 0 200 120" className="w-full h-full max-h-[92px]" preserveAspectRatio="none">
            <line x1="16" y1="92" x2="184" y2="92" stroke="#111111" strokeOpacity="0.12" strokeWidth="1" />
            {[18, 14, 10, 14, 24, 40, 56, 48, 44, 60, 76, 84, 68, 46, 32, 22].map((h, i) => (
              <rect
                key={i}
                x={20 + i * 10}
                y={92 - h * 0.72}
                width="5.5"
                height={h * 0.72}
                rx="1"
                fill="#111111"
                fillOpacity={(i >= 5 && i <= 6) || (i >= 10 && i <= 11) ? 0.92 : 0.45}
              />
            ))}
          </svg>
        )}
      </div>

      {/* Tag "Sample" 10-11px bottom-left */}
      <span className="absolute bottom-1.5 left-1.5 md:bottom-2 md:left-2 text-[10px] md:text-[10.5px] font-mono text-[#666666] tracking-wider uppercase px-1.5 py-0.5 rounded bg-black/5 leading-none select-none">
        Sample
      </span>
    </div>
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

  return (
    <>
      <section
        id="projects"
        className="relative w-full pt-4 pb-6 sm:pt-6 sm:pb-8 lg:pt-8 lg:pb-10 mb-16 lg:mb-24 scroll-mt-[88px]"
      >
        <div className="site-container">
          {/* Section Header: Eyebrow + Single Line Headline (Jarak ke daftar: 32px desktop, 24px mobile) */}
          <div className="mb-6 sm:mb-8 text-left">
            <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#111111] shadow-xs shrink-0" />
              <span className="text-[12px] sm:text-[12.5px] font-semibold tracking-[0.08em] text-[#6b6b6b] uppercase">
                {projects.sectionLabel}
              </span>
            </div>
            <h2 className="text-[clamp(28px,4.5vw,44px)] font-semibold text-[#111111] leading-tight tracking-[-0.03em]">
              {projects.headline}
            </h2>
          </div>

          {/* Single Column of 3 Compact, Flat, Neutral Cards (Gap 12px) */}
          <div className="flex flex-col gap-3 w-full">
            {projects.items.map((project, idx) => {
              const numStr = `0${idx + 1}`;

              return (
                <FadeUp key={project.id} delay={idx * 0.08}>
                  <div
                    ref={(el) => {
                      cardTriggerRefs.current[idx] = el;
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`${project.title} — ${projects.viewDetails}`}
                    onClick={() => openModal(idx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openModal(idx);
                      }
                    }}
                    className="group relative w-full bg-white border border-black/[0.07] rounded-[16px] md:rounded-[20px] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:border-black/20 active:bg-[#fafafa] transition-colors duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 p-3.5 md:p-4.5 lg:p-5"
                  >
                    {/* 1. Desktop Layout (≥768px): [thumbnail 220-240px | content 1fr | action auto], items-center, p-4.5/p-5, gap-5/gap-6 */}
                    <div className="hidden md:grid md:grid-cols-[220px_1fr_auto] lg:grid-cols-[240px_1fr_auto] gap-5 lg:gap-6 items-center">
                      {/* Thumbnail: 4:3 ratio, radius 12px, #f3f3f1 */}
                      <div className="w-[220px] lg:w-[240px] aspect-[4/3] rounded-[12px] bg-[#f3f3f1] overflow-hidden shrink-0">
                        <ProjectThumbnail id={project.id} title={project.title} />
                      </div>

                      {/* Content Column: order = number/category → full title → summary → bottom row */}
                      <div className="flex flex-col justify-center text-left min-w-0 pr-1 lg:pr-2">
                        {/* Number + Category: "01 · Business Intelligence Project" (12px uppercase #6b6b6b) */}
                        <div className="text-[12px] uppercase tracking-wider text-[#6b6b6b] font-medium mb-1 truncate">
                          <span>{numStr}</span>
                          <span className="mx-1.5">·</span>
                          <span>{project.category}</span>
                        </div>

                        {/* Full Title: 20-22px, weight 600, tracking -0.02em, max 2 lines */}
                        <h3 className="text-[19px] lg:text-[21px] font-semibold text-[#111111] tracking-[-0.02em] leading-snug line-clamp-2 mb-1.5">
                          {project.title}
                        </h3>

                        {/* Summary: 15px, #555, max 2 lines */}
                        <p className="text-[14px] lg:text-[15px] text-[#555555] leading-relaxed line-clamp-2 mb-2.5">
                          {project.description}
                        </p>

                        {/* Bottom Row: Fact 13px (Database icon + text) then Keycap Tools (height 28px, font 13px) */}
                        <div className="flex flex-wrap items-center gap-2.5 lg:gap-3">
                          <div className="flex items-center gap-1.5 text-[12.5px] lg:text-[13px] text-[#222222] font-medium shrink-0">
                            <Database size={13} className="text-[#333333] shrink-0" strokeWidth={2} />
                            <span>{project.fact}</span>
                          </div>

                          <span className="text-black/15 select-none shrink-0 text-[12.5px]">·</span>

                          <div className="flex flex-wrap items-center gap-1.5">
                            {project.tools.map((t) => (
                              <span
                                key={t}
                                className="keycap h-7 min-h-[28px] px-2.5 text-[12.5px] lg:text-[13px] flex items-center justify-center font-medium"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Column: Round 44px Button with Arrow → */}
                      <div className="shrink-0 flex items-center justify-center pl-1 lg:pl-2">
                        <div
                          className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-black/10 flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-white group-hover:border-[#111111] transition-all duration-200"
                          aria-label={projects.viewDetails}
                          title={projects.viewDetails}
                        >
                          <ArrowRight
                            size={16}
                            strokeWidth={2}
                            className="transform transition-transform duration-200 group-hover:translate-x-1"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 2. Mobile Layout (<768px): Vertical flow */}
                    <div className="md:hidden flex flex-col text-left">
                      {/* Top Row: [thumbnail 88x88 | title + category] */}
                      <div className="flex items-start gap-3 w-full">
                        <div className="w-[88px] h-[88px] rounded-[10px] bg-[#f3f3f1] overflow-hidden shrink-0">
                          <ProjectThumbnail id={project.id} title={project.title} />
                        </div>

                        <div className="flex-1 min-w-0 pt-0.5">
                          <div className="text-[11px] uppercase tracking-wider text-[#6b6b6b] font-medium truncate mb-0.5">
                            <span>{numStr}</span>
                            <span className="mx-1">·</span>
                            <span>{project.category}</span>
                          </div>

                          <h3 className="text-[15.5px] font-semibold text-[#111111] tracking-[-0.02em] leading-snug line-clamp-2">
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      {/* Summary below, full card width, max 2 lines */}
                      <p className="text-[13.5px] text-[#555555] leading-snug line-clamp-2 mt-2">
                        {project.description}
                      </p>

                      {/* Bottom Row: Keycap tools left, Arrow right */}
                      <div className="flex items-center justify-between gap-2 mt-2.5 pt-2 border-t border-black/[0.06]">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {project.tools.map((t) => (
                            <span
                              key={t}
                              className="keycap h-6.5 min-h-[26px] px-2 text-[12px] flex items-center justify-center font-medium"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <div
                          className="w-8 h-8 min-w-[32px] min-h-[32px] rounded-full border border-black/10 flex items-center justify-center text-[#111111] shrink-0"
                          aria-label={projects.viewDetails}
                        >
                          <ArrowRight size={13} strokeWidth={2} />
                        </div>
                      </div>
                    </div>
                  </div>
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
            lang={lang}
            onClose={closeModal}
            onNavigateProject={handleNavigateProject}
          />
        )}
      </AnimatePresence>
    </>
  );
}
