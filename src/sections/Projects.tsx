import { useState, useEffect, useRef } from 'react';
import { ProjectCardVisual } from '../components/ProjectCardVisual';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { X, ArrowUpRight, ExternalLink } from 'lucide-react';
import type { PortfolioContent, ProjectItem } from '../data/content';
import { SectionTitle, usePrefersReducedMotion } from '../components/ScrollAnimations';

interface ProjectDetailModalProps {
  project: ProjectItem;
  labels: PortfolioContent['projects']['modalLabels'];
  onClose: () => void;
}

function ProjectDetailModal({ project, labels, onClose }: ProjectDetailModalProps) {
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

          <div className="w-full h-[200px] sm:h-[240px] bg-white rounded-2xl border border-black/5 shadow-inner overflow-hidden">
            <ProjectCardVisual id={project.id} />
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
                <span
                  key={tool}
                  className="px-3 py-1 rounded-full bg-[#F4F4F4] text-[12.5px] font-medium text-[#222222] border border-black/5"
                >
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

interface ProjectRowProps {
  project: ProjectItem;
  index: number;
  viewDetailsLabel: string;
  onOpen: (project: ProjectItem) => void;
}

function ProjectRow({
  project,
  index,
  viewDetailsLabel,
  onOpen,
}: ProjectRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start end', 'end start'],
  });

  // Soft Parallax ±24px on desktop only
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-24, 24]);
  const activeParallax = isDesktop && !reduced ? parallaxY : 0;

  // Zig-zag:
  // Row 0 (odd display '01'): Text on left, Visual on right
  // Row 1 (even display '02'): Visual on left, Text on right
  // Row 2 (odd display '03'): Text on left, Visual on right
  const isVisualLeftOnDesktop = index % 2 === 1;

  // Pick top 2-3 concise points from CV highlights
  const displayedHighlights = project.highlights.slice(0, 3);

  return (
    <div
      ref={rowRef}
      className="relative w-full py-12 sm:py-16 border-b border-black/10 last:border-b-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Mobile: Visual Preview ALWAYS on top. Desktop: depends on zig-zag */}
        <div
          className={`lg:col-span-6 w-full ${
            isVisualLeftOnDesktop
              ? 'lg:order-1'
              : 'lg:order-2'
          }`}
        >
          <motion.div
            style={{ y: activeParallax }}
            className="relative w-full aspect-[16/11] sm:aspect-[4/3] rounded-[24px] sm:rounded-[28px] border border-black/5 shadow-[0_16px_36px_-12px_rgba(0,0,0,0.08)] bg-white overflow-hidden group cursor-pointer"
            onClick={() => onOpen(project)}
          >
            <ProjectCardVisual id={project.id} />

            {/* Hover overlay on desktop */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.04] transition-colors pointer-events-none" />
          </motion.div>
        </div>

        {/* Text Details Column */}
        <div
          className={`lg:col-span-6 space-y-4 sm:space-y-5 ${
            isVisualLeftOnDesktop
              ? 'lg:order-2'
              : 'lg:order-1'
          }`}
        >
          {/* Header Row: Big Number & Category */}
          <div className="flex items-center justify-between border-b border-black/10 pb-3">
            <span className="text-[26px] sm:text-[32px] font-mono font-semibold text-[#888888] tabular-nums leading-none">
              0{index + 1}
            </span>
            <span className="text-[12px] font-semibold uppercase tracking-wider text-[#666666]">
              {project.category}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="text-[24px] sm:text-[30px] lg:text-[34px] font-semibold text-[#111111] tracking-[-0.035em] leading-[1.14]">
            {project.title}
          </h3>

          {/* Tools as Plain Text */}
          <div className="text-[13px] font-medium text-[#666666]">
            {project.tools.join(' · ')}
          </div>

          {/* 2-3 Concise CV Highlights */}
          <ul className="space-y-2 text-[14px] sm:text-[15px] text-[#444444] leading-relaxed pt-1">
            {displayedHighlights.map((point, hIdx) => (
              <li key={hIdx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-black/40 mt-2 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {/* View Details Action Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] text-white text-[13px] font-medium hover:bg-black/85 transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <span>{viewDetailsLabel}</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProjectsProps {
  content: PortfolioContent;
  onModalStateChange?: (open: boolean) => void;
}

export function Projects({ content, onModalStateChange }: ProjectsProps) {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const { projects } = content;

  useEffect(() => {
    onModalStateChange?.(!!activeProject);
  }, [activeProject, onModalStateChange]);

  return (
    <>
      <section
        id="projects"
        className="relative w-full py-20 sm:py-28 px-4 sm:px-6 scroll-mt-[88px]"
      >
        <div className="w-full max-w-[1140px] mx-auto space-y-10 sm:space-y-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#10B981] shadow-xs shrink-0" />
                <span className="text-[13px] font-semibold tracking-wider text-[#666666] uppercase">
                  {projects.sectionLabel}
                </span>
              </div>
              <SectionTitle
                title={projects.headline}
                className="text-[28px] sm:text-[38px] max-w-[720px]"
              />
            </div>
            <span className="text-[13px] sm:text-[14px] text-[#666666] font-medium">
              {projects.subtitle}
            </span>
          </div>

          {/* Zig-Zag Editorial Rows */}
          <div className="w-full border-t border-black/10">
            {projects.items.map((project, index) => (
              <ProjectRow
                key={project.id}
                project={project}
                index={index}
                viewDetailsLabel={projects.viewCase}
                onOpen={(p) => setActiveProject(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal (Preserved as required) */}
      <AnimatePresence>
        {activeProject && (
          <ProjectDetailModal
            project={activeProject}
            labels={projects.modalLabels}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
