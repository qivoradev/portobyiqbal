import { useState, useEffect } from 'react';
import { ProjectCardVisual } from '../components/ProjectCardVisual';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, ExternalLink } from 'lucide-react';
import type { PortfolioContent, ProjectItem } from '../data/content';

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
          {/* Title */}
          <h2 className="text-[22px] sm:text-[26px] font-semibold text-[#111111] leading-tight tracking-tight">
            {project.title}
          </h2>

          {/* Visual Mockup Container */}
          <div className="w-full h-[200px] sm:h-[240px] bg-white rounded-2xl border border-black/5 shadow-inner overflow-hidden">
            <ProjectCardVisual id={project.id} />
          </div>

          {/* Context & Scope */}
          <div>
            <h3 className="font-semibold text-black text-[15px] sm:text-[16px] mb-1.5">
              {labels.context}
            </h3>
            <p className="text-[14px] sm:text-[15px] text-[#555555] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tools Used */}
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

          {/* Key Highlights (Direct from CV) */}
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
  onModalStateChange?: (open: boolean) => void;
}

export function Projects({ content, onModalStateChange }: ProjectsProps) {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const { projects } = content;

  useEffect(() => {
    onModalStateChange?.(!!activeProject);
  }, [activeProject, onModalStateChange]);

  return (
    <>
      <section id="projects" className="relative w-full py-16 sm:py-24 px-4 sm:px-6">
        <div className="w-full max-w-[1140px] mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 sm:mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#10B981] shadow-xs shrink-0" />
                <span className="text-[13px] font-semibold tracking-wider text-[#666666] uppercase">
                  {projects.sectionLabel}
                </span>
              </div>
              <h2 className="text-[28px] sm:text-[38px] font-semibold text-[#111111] leading-[1.1] tracking-[-0.035em]">
                {projects.headline}
              </h2>
            </div>
            <span className="text-[13px] sm:text-[14px] text-[#666666] font-medium">
              {projects.subtitle}
            </span>
          </div>

          {/* 3-Column Grid on Desktop, 1 Column on Mobile/Tablet */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.items.map((project) => (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setActiveProject(project)}
                className="group relative bg-white rounded-[24px] sm:rounded-[28px] p-5 border border-black/5 shadow-[0_10px_25px_-8px_rgba(0,0,0,0.05)] cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] flex flex-col justify-between"
              >
                {/* Mockup Frame (4:3) */}
                <div className="relative w-full aspect-[4/3] bg-[#FDFDFD] rounded-2xl border border-black/5 overflow-hidden mb-4">
                  <ProjectCardVisual id={project.id} />

                  {/* "View" Floating Tag on Hover */}
                  <AnimatePresence>
                    {hoveredId === project.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 4 }}
                        transition={{ duration: 0.18 }}
                        className="absolute inset-0 bg-black/15 backdrop-blur-[2px] flex items-center justify-center"
                      >
                        <div className="px-4 py-2 rounded-full bg-white/95 border border-black/10 shadow-lg text-[13px] font-medium text-black flex items-center gap-1.5">
                          <span>{projects.viewCase}</span>
                          <ArrowUpRight size={14} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Card Editorial Info */}
                <div className="space-y-1.5">
                  <div className="text-[11.5px] font-semibold text-[#777777] uppercase tracking-wider">
                    {project.category}
                  </div>

                  <h3 className="text-[18px] sm:text-[19px] font-semibold text-[#111111] tracking-tight group-hover:text-black transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-[13.5px] text-[#555555] leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
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
