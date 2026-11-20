import { useState, useEffect, useRef, useCallback } from 'react';
import { ProjectCardVisual } from '../components/ProjectCardVisual';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import type { PortfolioContent, ProjectItem, Language } from '../data/content';
import { SectionTitle, usePrefersReducedMotion } from '../components/ScrollAnimations';

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

    // Focus close button on mount
    closeButtonRef.current?.focus();

    // Push state for mobile hardware back button
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
        {/* Sticky Header (Title, Category, Close Button ≥ 44px) */}
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

        {/* Scrollable Content Body (Vertical Only, Thin Scrollbar) */}
        <div className="overflow-y-auto thin-scrollbar p-5 sm:p-8 space-y-6 flex-1">
          {/* Main Title */}
          <h2
            id="project-modal-title"
            className="text-[22px] sm:text-[28px] font-semibold text-[#111111] leading-tight tracking-tight"
          >
            {project.title}
          </h2>

          {/* Clean 16:9 Preview Container (Max Height 280px on desktop) */}
          <div className="w-full aspect-[16/9] max-h-[280px] bg-white rounded-2xl border border-black/10 shadow-inner overflow-hidden">
            <ProjectCardVisual id={project.id} lang={lang} />
          </div>

          {/* Overview Section */}
          <div className="space-y-1.5">
            <h3 className="text-[15px] font-semibold text-black uppercase tracking-wider text-[12px]">
              {overviewTitle}
            </h3>
            <p className="text-[15px] sm:text-[16px] text-[#444444] leading-relaxed max-w-[65ch]">
              {project.description}
            </p>
          </div>

          {/* Tools Section (Keycaps) */}
          <div className="space-y-2">
            <h3 className="text-[15px] font-semibold text-black uppercase tracking-wider text-[12px]">
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

          {/* Highlights Section (ALL Bullet Points from CV) */}
          <div className="space-y-3">
            <h3 className="text-[15px] font-semibold text-black uppercase tracking-wider text-[12px]">
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

          {/* External Dashboard Link */}
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

        {/* Sticky Footer: Previous / Next Navigation Buttons (Touch Target ≥ 44px, Safe-Area Padded) */}
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

function DesktopPreviewWithParallax({
  project,
  lang,
  indexStr,
  moveHelperText,
}: {
  project: ProjectItem;
  lang: Language;
  indexStr: string;
  moveHelperText: string;
}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hasInteracted, setHasInteracted] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);
    setOffset({
      x: Math.max(-8, Math.min(8, deltaX * 8)),
      y: Math.max(-8, Math.min(8, deltaY * 8)),
    });
    if (!hasInteracted) setHasInteracted(true);
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div className="flex flex-col justify-center h-full w-full">
      <div
        ref={frameRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full min-h-[260px] sm:min-h-[280px] lg:min-h-[340px] transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        }}
      >
        <ProjectCardVisual
          id={project.id}
          lang={lang}
          indexStr={indexStr}
          previewLabel={project.previewLabel}
        />
      </div>
      {!hasInteracted && (
        <p className="text-[11px] font-mono text-[#777777] text-center mt-2.5 transition-opacity">
          {moveHelperText}
        </p>
      )}
    </div>
  );
}

interface StickyProjectCardProps {
  project: ProjectItem;
  idx: number;
  total: number;
  lang: Language;
  projectsContent: PortfolioContent['projects'];
  isStickyFallback: boolean;
  isMobile: boolean;
  reducedMotion: boolean;
  onOpenModal: (idx: number) => void;
  cardTriggerRef: (el: HTMLDivElement | null) => void;
}

function StickyProjectCard({
  project,
  idx,
  total,
  lang,
  projectsContent,
  isStickyFallback,
  isMobile,
  reducedMotion,
  onOpenModal,
  cardTriggerRef,
}: StickyProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });

  const isLast = idx === total - 1;
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast || reducedMotion ? 1 : 0.95]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, isLast || reducedMotion ? 0 : 0.08]);

  const accentColors = [
    {
      bg: 'color-mix(in oklab, #10B981 10%, #FFFFFF)',
      border: 'color-mix(in oklab, #10B981 22%, #E5E7EB)',
      badge: 'tactile-badge-green',
    },
    {
      bg: 'color-mix(in oklab, #2563EB 10%, #FFFFFF)',
      border: 'color-mix(in oklab, #2563EB 22%, #E5E7EB)',
      badge: 'tactile-badge-blue',
    },
    {
      bg: 'color-mix(in oklab, #F59E0B 10%, #FFFFFF)',
      border: 'color-mix(in oklab, #F59E0B 22%, #E5E7EB)',
      badge: 'tactile-badge-yellow',
    },
  ];
  const accent = accentColors[idx] || accentColors[0];
  const indexStr = `(0${idx + 1})`;

  // Desktop top: 88px + idx * 14px; Mobile top: 64px + idx * 8px
  const stickyTopDesktop = 88 + idx * 14;
  const stickyTopMobile = 64 + idx * 8;
  const activeStickyTop = isMobile ? stickyTopMobile : stickyTopDesktop;

  return (
    <div
      ref={(el) => {
        (cardRef as any).current = el;
        cardTriggerRef(el);
      }}
      style={{
        position: isStickyFallback ? 'relative' : 'sticky',
        top: isStickyFallback ? 'auto' : `${activeStickyTop}px`,
        zIndex: (idx + 1) * 10,
        marginBottom: isStickyFallback || isLast ? '0px' : '12vh',
      }}
      className="w-full focus:outline-hidden"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenModal(idx);
        }
      }}
    >
      <motion.div
        style={{
          scale,
          transformOrigin: 'top center',
          backgroundColor: accent.bg,
          borderColor: accent.border,
        }}
        className="relative w-full rounded-[28px] lg:rounded-[36px] border border-solid overflow-hidden shadow-[0_-12px_40px_-12px_rgba(0,0,0,0.12),0_12px_32px_-8px_rgba(0,0,0,0.08)] p-5 sm:p-8 lg:p-12 xl:p-14 min-h-0 lg:min-h-[min(640px,calc(100dvh-120px))]"
      >
        {/* Darkening Overlay when covered */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black pointer-events-none z-30"
        />

        {/* 1. Desktop Layout (≥1024px): 12-Column Grid (Span 5 Left, Span 7 Right) */}
        <div className="hidden lg:grid grid-cols-12 gap-8 lg:gap-12 items-stretch h-full">
          {/* Left Column (Span 5): Flex column with bottom pinned CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between py-1 text-left">
            <div>
              {/* Badge + Category */}
              <div className="flex items-center gap-2.5 mb-3">
                <div className={`tactile-badge ${accent.badge} w-7 h-7 text-white text-[12px] font-bold shrink-0`}>
                  0{idx + 1}
                </div>
                <span className="text-[13px] font-semibold tracking-wider text-[#555555] uppercase">
                  {project.category}
                </span>
              </div>

              {/* Big Display Title */}
              <h3 className="text-[clamp(48px,7vw,96px)] font-bold text-[#111111] tracking-[-0.04em] leading-[0.95] mb-2">
                {project.displayTitle}
              </h3>

              {/* Full Project Title */}
              <h4 className="text-[20px] lg:text-[22px] font-medium text-[#111111] leading-snug mb-3">
                {project.title}
              </h4>

              {/* 1-Sentence Summary (Max 3 lines) */}
              <p className="text-[16px] lg:text-[17px] text-[#444444] leading-[1.55] line-clamp-3 mb-6">
                {project.description}
              </p>
            </div>

            {/* Hairline Meta Table */}
            <div className="border-t border-black/8 divide-y divide-black/8 text-[13.5px] mb-6 mt-auto">
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#777777] uppercase tracking-wider">
                  {projectsContent.metaLabels?.category || 'Category'}
                </span>
                <span className="font-medium text-[#222222]">{project.category}</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#777777] uppercase tracking-wider">
                  {projectsContent.metaLabels?.tools || 'Tools'}
                </span>
                <span className="font-medium text-[#222222]">{project.toolsText}</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#777777] uppercase tracking-wider">
                  {projectsContent.metaLabels?.data || 'Data'}
                </span>
                <span className="font-medium text-[#222222]">{project.dataMetric}</span>
              </div>
            </div>

            {/* Bottom Pinned CTA Pill */}
            <div>
              <button
                type="button"
                onClick={() => onOpenModal(idx)}
                className="min-h-[44px] px-6 rounded-full bg-[#111111] text-white text-[13.5px] font-medium hover:bg-[#222222] active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs w-fit"
              >
                <span>{projectsContent.viewDetails}</span>
              </button>
            </div>
          </div>

          {/* Right Column (Span 7): Preview Frame with Parallax */}
          <div className="lg:col-span-7 flex flex-col justify-center h-full">
            <DesktopPreviewWithParallax
              project={project}
              lang={lang}
              indexStr={indexStr}
              moveHelperText={projectsContent.moveHelperText}
            />
          </div>
        </div>

        {/* 2. Mobile & Tablet Layout (<1024px): 1-Column Stacked */}
        <div
          onClick={() => onOpenModal(idx)}
          className="lg:hidden flex flex-col gap-4 text-left cursor-pointer"
        >
          {/* Top: Preview Frame */}
          <div className="w-full min-h-[200px] aspect-[16/10] sm:aspect-auto sm:min-h-[250px]">
            <ProjectCardVisual
              id={project.id}
              lang={lang}
              indexStr={indexStr}
              previewLabel={project.previewLabel}
            />
          </div>

          {/* Badge + Category */}
          <div className="flex items-center gap-2 mt-1">
            <div className={`tactile-badge ${accent.badge} w-6 h-6 text-white text-[11px] font-bold shrink-0`}>
              0{idx + 1}
            </div>
            <span className="text-[12px] font-semibold tracking-wider text-[#555555] uppercase">
              {project.category}
            </span>
          </div>

          {/* Big Display Title */}
          <h3 className="text-[clamp(36px,11vw,48px)] font-bold text-[#111111] tracking-tight leading-[0.95]">
            {project.displayTitle}
          </h3>

          {/* Full Project Title */}
          <h4 className="text-[16px] sm:text-[17px] font-medium text-[#111111] leading-snug">
            {project.title}
          </h4>

          {/* Summary (Max 3 lines) */}
          <p className="text-[15px] sm:text-[16px] text-[#444444] leading-[1.55] line-clamp-3">
            {project.description}
          </p>

          {/* Tablet Meta Table (768–1023px) */}
          <div className="hidden md:block border-t border-black/8 divide-y divide-black/8 text-[13px] my-1">
            <div className="py-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#777777] uppercase tracking-wider">
                {projectsContent.metaLabels?.category || 'Category'}
              </span>
              <span className="font-medium text-[#222222]">{project.category}</span>
            </div>
            <div className="py-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#777777] uppercase tracking-wider">
                {projectsContent.metaLabels?.tools || 'Tools'}
              </span>
              <span className="font-medium text-[#222222]">{project.toolsText}</span>
            </div>
            <div className="py-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#777777] uppercase tracking-wider">
                {projectsContent.metaLabels?.data || 'Data'}
              </span>
              <span className="font-medium text-[#222222]">{project.dataMetric}</span>
            </div>
          </div>

          {/* Mobile Tools as Keycaps (<768px) */}
          <div className="flex md:hidden flex-wrap gap-1.5 pt-0.5">
            {project.tools.map((t) => (
              <span key={t} className="keycap px-2.5 py-1 text-[12px]">
                {t}
              </span>
            ))}
          </div>

          {/* Full-Width Button (Touch Target ≥ 48px) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(idx);
            }}
            className="w-full min-h-[48px] px-6 rounded-full bg-[#111111] text-white text-[14px] font-medium hover:bg-[#222222] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs mt-2"
          >
            <span>{projectsContent.viewDetails}</span>
          </button>
        </div>
      </motion.div>
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
  const reducedMotion = usePrefersReducedMotion();

  const [viewportHeight, setViewportHeight] = useState<number>(
    typeof window !== 'undefined' ? window.innerHeight : 900
  );
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fallback: If viewport height < 700px, disable sticky
  const isStickyFallback = viewportHeight < 700;

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
        className="relative w-full py-12 sm:py-16 lg:py-20 scroll-mt-[88px]"
      >
        <div className="site-container">
          {/* Section Header (Uniform: Eyebrow + Headline) */}
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

          {/* Single-Column Stack of 3 Sticky Project Cards */}
          <div className={`w-full flex flex-col ${isStickyFallback ? 'gap-6' : ''}`}>
            {projects.items.map((project, idx) => (
              <StickyProjectCard
                key={project.id}
                project={project}
                idx={idx}
                total={projects.items.length}
                lang={lang}
                projectsContent={projects}
                isStickyFallback={isStickyFallback}
                isMobile={isMobile}
                reducedMotion={reducedMotion}
                onOpenModal={openModal}
                cardTriggerRef={(el) => {
                  cardTriggerRefs.current[idx] = el;
                }}
              />
            ))}
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
