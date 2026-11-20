import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { X, Download, ExternalLink, FileText } from 'lucide-react';
import type { PortfolioContent } from '../data/content';
import { stopLenis, startLenis } from '../hooks/useLenis';
import { EDITORIAL_EASE } from './ScrollAnimations';

interface CVModalProps {
  content: PortfolioContent['cvModal'];
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

const CV_FILE_URL = '/cv/Iqbal-Dwi-Fathonah-CV.pdf';
const ZOOM_LEVELS = [75, 100, 125, 150] as const;
type ZoomLevel = (typeof ZOOM_LEVELS)[number];

export function CVModal({ content, onClose, triggerRef }: CVModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pagesWrapperRef = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState<ZoomLevel>(100);
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Use native vector PDF iframe on desktop at 100% default; use crisp high-DPI Fit-to-Width canvas on mobile or custom zoom
  const useNativeIframe = isDesktop && zoom === 100;

  // Lock background scroll (Lenis + body) & reset modal scroll to top on open
  useEffect(() => {
    stopLenis();
    const origBodyOverflow = document.body.style.overflow;
    const origHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    panelRef.current?.focus();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      startLenis();
      document.body.style.overflow = origBodyOverflow;
      document.documentElement.style.overflow = origHtmlOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      triggerRef?.current?.focus();
    };
  }, [onClose, triggerRef]);

  // Reset scroll to top when switching mode
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [useNativeIframe]);

  // Render crisp Fit-to-Width PDF pages via pdfjs-dist when on mobile or custom zoom
  useEffect(() => {
    if (useNativeIframe) {
      setIsLoading(false);
      setHasError(false);
      return;
    }

    let isCancelled = false;

    async function renderPages() {
      const container = scrollContainerRef.current;
      const wrapper = pagesWrapperRef.current;
      if (!container || !wrapper) return;

      try {
        setIsLoading(true);
        setHasError(false);

        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

        const loadingTask = pdfjs.getDocument({ url: CV_FILE_URL });
        const doc = await loadingTask.promise;
        if (isCancelled) return;

        wrapper.innerHTML = '';

        // Fit-to-Width reading base (up to 820px on desktop, full inner width on mobile)
        const availWidth = Math.max(container.clientWidth - 32, 280);
        const baseReadingWidth = Math.min(availWidth, 820);
        const targetCssWidth = Math.round(baseReadingWidth * (zoom / 100));
        const dpr = Math.min(3, Math.max(2, window.devicePixelRatio || 2));

        for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
          const page = await doc.getPage(pageNum);
          if (isCancelled) return;

          const baseViewport = page.getViewport({ scale: 1 });
          const fitWidthScale = targetCssWidth / baseViewport.width;
          const renderViewport = page.getViewport({ scale: fitWidthScale * dpr });

          const canvas = document.createElement('canvas');
          canvas.width = Math.floor(renderViewport.width);
          canvas.height = Math.floor(renderViewport.height);
          canvas.style.width = `${targetCssWidth}px`;
          canvas.style.height = `${Math.floor(baseViewport.height * fitWidthScale)}px`;
          canvas.className =
            'block mx-auto bg-white rounded-lg shadow-md border border-neutral-200 max-w-none';

          const ctx = canvas.getContext('2d', { alpha: false });
          if (!ctx) continue;

          await page.render({
            canvas,
            canvasContext: ctx,
            viewport: renderViewport,
          }).promise;

          if (isCancelled) return;
          wrapper.appendChild(canvas);
        }

        if (!isCancelled) {
          setIsLoading(false);
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
          }
        }
      } catch (err) {
        console.error('CV PDF render error:', err);
        if (!isCancelled) {
          setHasError(true);
          setIsLoading(false);
        }
      }
    }

    renderPages();

    return () => {
      isCancelled = true;
    };
  }, [useNativeIframe, zoom]);

  const downloadFilename = CV_FILE_URL.split('/').pop() || 'Iqbal-Dwi-Fathonah-CV.pdf';

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 select-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        initial={{ opacity: 0, y: 14, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.99 }}
        transition={{ duration: 0.22, ease: EDITORIAL_EASE }}
        className="relative max-w-4xl w-[95vw] h-[90vh] flex flex-col overflow-hidden bg-white rounded-2xl border border-neutral-200 shadow-2xl focus:outline-hidden"
      >
        {/* Top Control Bar */}
        <header className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6 py-3 border-b border-neutral-200 bg-neutral-50 shrink-0">
          {/* Left: Icon + Title */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center shrink-0">
              <FileText size={16} />
            </div>
            <div className="min-w-0">
              <h2
                id="cv-modal-title"
                className="text-[14px] sm:text-[15px] font-bold text-[#111111] tracking-tight leading-tight truncate"
              >
                {content.title}
              </h2>
              <p className="text-[11px] sm:text-[12px] text-neutral-500 font-medium truncate">
                {content.subtitle}
              </p>
            </div>
          </div>

          {/* Right: Precision Zoom Controls + Open New Tab + Download + Close */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Precision Zoom Pills: 75% | 100% | 125% | 150% */}
            <div
              className="hidden sm:flex items-center rounded-lg border border-neutral-200 bg-white p-0.5"
              role="group"
              aria-label="Zoom level"
            >
              {ZOOM_LEVELS.map((level) => {
                const active = zoom === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setZoom(level)}
                    className={`px-2 py-1 rounded-md text-[11.5px] font-mono font-semibold transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#111111] text-white'
                        : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
                    }`}
                    aria-pressed={active}
                  >
                    {level}%
                  </button>
                );
              })}
            </div>

            {/* Open in New Tab */}
            <a
              href={CV_FILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white border border-neutral-200 hover:bg-neutral-100 flex items-center justify-center text-neutral-600 hover:text-neutral-950 transition-colors"
              title={content.openNewTab}
              aria-label={content.openNewTab}
            >
              <ExternalLink size={14} />
            </a>

            {/* Download PDF */}
            <a
              href={CV_FILE_URL}
              download={downloadFilename}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-[#259B52] hover:bg-[#1F8244] text-white text-[12px] font-semibold transition-colors"
              title={content.downloadButton}
              aria-label={content.downloadButton}
            >
              <Download size={13} />
              <span className="hidden sm:inline">{content.downloadButton}</span>
            </a>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white border border-neutral-200 hover:bg-neutral-100 flex items-center justify-center text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer"
              title={content.closeButton}
              aria-label={content.closeButton}
            >
              <X size={16} strokeWidth={2} />
            </button>
          </div>
        </header>

        {/* Scrollable Fit-to-Width Document Area (data-lenis-prevent) */}
        <div
          ref={scrollContainerRef}
          data-lenis-prevent
          className={`relative flex-1 bg-neutral-200/80 ${
            useNativeIframe ? 'overflow-hidden' : 'overflow-y-auto overflow-x-auto p-3 sm:p-5 thin-scrollbar'
          }`}
        >
          {useNativeIframe ? (
            /* Native 100% Vector PDF Viewer on Desktop (Fit-to-Width via #view=FitH) */
            <iframe
              src={`${CV_FILE_URL}#toolbar=0&navpanes=0&view=FitH`}
              title={content.title}
              className="w-full h-full border-0 bg-white block"
            />
          ) : (
            <>
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-100/80 backdrop-blur-xs z-10 text-neutral-600 text-xs font-medium">
                  <div className="w-6 h-6 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin mb-2" />
                  <span>Loading...</span>
                </div>
              )}

              {hasError && (
                <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-xl border border-neutral-200 text-center space-y-3">
                  <p className="text-sm text-neutral-600">{content.fallbackText}</p>
                  <a
                    href={CV_FILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#111111] text-white text-xs font-semibold"
                  >
                    <ExternalLink size={14} />
                    <span>{content.openNewTab}</span>
                  </a>
                </div>
              )}

              <div ref={pagesWrapperRef} className="space-y-4 w-full min-h-full" />
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
