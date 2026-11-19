import { useState, useEffect, useRef, useCallback } from 'react';
import { ProjectCardVisual } from '../components/ProjectCardVisual';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import type { PortfolioContent, ProjectItem, Language } from '../data/content';
import { SectionTitle, FadeUp } from '../components/ScrollAnimations';
import { scrollToLenis } from '../hooks/useLenis';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const { projects } = content;

  const galleryRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    onModalStateChange?.(!!activeProject);
  }, [activeProject, onModalStateChange]);

  const viewCaseText = lang === 'in' ? 'Lihat kasus' : 'View case';
  const talkPrompt =
    lang === 'in'
      ? 'Tertarik mendiskusikan analisis data? Mari bicara →'
      : 'Interested in discussing data analytics? Let’s talk →';

  const projectBadges = [
    'tactile-badge-green',
    'tactile-badge-blue',
    'tactile-badge-yellow',
  ];

  // Scroll gallery to a specific card index
  const scrollToIndex = useCallback((index: number) => {
    const total = projects.items.length;
    const clamped = Math.max(0, Math.min(index, total - 1));
    const targetCard = cardRefs.current[clamped];
    if (targetCard && galleryRef.current) {
      targetCard.scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
        block: 'nearest',
      });
      setCurrentIndex(clamped);
    }
  }, [projects.items.length]);

  // Track active card index during scroll
  const handleScroll = useCallback(() => {
    if (!galleryRef.current) return;
    const scrollLeft = galleryRef.current.scrollLeft;
    const firstCard = cardRefs.current[0];
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 24; // gap-6 is 24px
    const index = Math.round(scrollLeft / (cardWidth + gap));
    const clamped = Math.max(0, Math.min(index, projects.items.length - 1));
    setCurrentIndex(clamped);
  }, [projects.items.length]);

  // Keyboard navigation when gallery is focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollToIndex(currentIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollToIndex(currentIndex - 1);
    }
  };

  const handleContactClick = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      scrollToLenis(contactEl, -88);
    }
  };

  return (
    <>
      <section
        id="projects"
        className="relative w-full py-16 lg:py-20 scroll-mt-[88px]"
      >
        <div className="site-container">
          {/* Section Header with Controls on the Right */}
          <div className="mb-10 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="text-left">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#10B981] shadow-xs shrink-0" />
                <span className="text-[12.5px] font-semibold tracking-[0.08em] text-[#6b6b6b] uppercase">
                  {projects.sectionLabel}
                </span>
              </div>
              <SectionTitle
                title={projects.headline}
                className="text-[clamp(32px,4vw,50px)] font-semibold text-[#111111] leading-[1.12] tracking-[-0.035em] max-w-[720px]"
              />
            </div>

            {/* Gallery Navigation Controls: ‹ › & "01 / 03" Indicator */}
            <div className="flex items-center gap-3 self-start sm:self-end shrink-0 pt-2 sm:pt-0">
              <span className="text-[13px] sm:text-[14px] font-mono font-medium text-[#555555] tracking-wider tabular-nums px-1">
                {`0${currentIndex + 1} / 0${projects.items.length}`}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollToIndex(currentIndex - 1)}
                  disabled={currentIndex === 0}
                  className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white border border-black/10 shadow-xs hover:bg-[#F5F5F5] active:scale-95 disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center text-[#111111] transition-all cursor-pointer"
                  aria-label="Previous project"
                >
                  <ChevronLeft size={18} strokeWidth={2.2} />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToIndex(currentIndex + 1)}
                  disabled={currentIndex === projects.items.length - 1}
                  className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white border border-black/10 shadow-xs hover:bg-[#F5F5F5] active:scale-95 disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center text-[#111111] transition-all cursor-pointer"
                  aria-label="Next project"
                >
                  <ChevronRight size={18} strokeWidth={2.2} />
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal Image-First Scroll-Snap Gallery */}
          <div
            ref={galleryRef}
            data-lenis-prevent="true"
            tabIndex={0}
            role="region"
            aria-label="Projects Gallery"
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pt-1 no-scrollbar focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 rounded-2xl"
          >
            {projects.items.map((project, idx) => (
              <div
                key={project.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                onClick={() => setActiveProject(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveProject(project);
                  }
                }}
                role="button"
                tabIndex={0}
                className="w-[88%] sm:w-[75%] md:w-[62%] shrink-0 snap-start flex flex-col group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-4 rounded-[26px]"
              >
                {/* 1. Image-First Clean Preview Container (16:10, 24px radius, hover zoom 1.03) */}
                <div className="w-full aspect-[16/10] rounded-[24px] overflow-hidden border border-black/10 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.03)] bg-white relative">
                  <div className="w-full h-full transform group-hover:scale-[1.03] transition-transform duration-300 ease-out">
                    <ProjectCardVisual id={project.id} lang={lang} />
                  </div>
                </div>

                {/* 2. Direct on Page Background Beneath Preview (NO card, NO box) */}
                <div className="mt-5 space-y-2.5 text-left">
                  {/* Number Badge + Category */}
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`tactile-badge ${projectBadges[idx]} w-7 h-7 text-[12px] font-mono font-bold`}
                    >
                      {`0${idx + 1}`}
                    </div>
                    <span className="text-[11.5px] font-semibold text-[#666666] uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  {/* Title (28–32px) */}
                  <h3 className="text-[26px] sm:text-[30px] font-semibold text-[#111111] tracking-tight leading-[1.18]">
                    {project.title}
                  </h3>

                  {/* 1 Concise Sentence Summary (Max 2 lines) */}
                  <p className="text-[15.5px] sm:text-[16px] text-[#444444] leading-[1.6] line-clamp-2 max-w-[60ch]">
                    {project.description}
                  </p>

                  {/* Tools as Plain Text Separated by " · " (NO keycaps / NO cards) */}
                  <div className="text-[14px] font-medium text-[#555555] pt-0.5">
                    {project.tools.join(' · ')}
                  </div>

                  {/* View Case Action Link */}
                  <div className="pt-1.5">
                    <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#111111] group-hover:text-[#2563EB] transition-colors">
                      <span>{viewCaseText}</span>
                      <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Under Gallery: Single Small Text Line with Link to Contact */}
          <FadeUp delay={0.2} className="mt-10 sm:mt-12 text-left">
            <button
              type="button"
              onClick={handleContactClick}
              className="text-[13.5px] sm:text-[14px] font-medium text-[#555555] hover:text-[#111111] transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>{talkPrompt}</span>
            </button>
          </FadeUp>
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
