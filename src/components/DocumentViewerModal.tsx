import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { X, Download, ExternalLink, ZoomIn, ZoomOut, FileText, Award } from 'lucide-react';
import { stopLenis, startLenis } from '../hooks/useLenis';

export interface DocumentViewerProps {
  type: 'cv' | 'cert';
  fileUrl: string;
  fileType: 'pdf' | 'image';
  title: string;
  subtitle?: string;
  verification?: {
    site: string;
    code: string;
  };
  labels: {
    downloadButton: string;
    closeButton: string;
    zoomIn: string;
    zoomOut: string;
    openNewTab: string;
    verification?: string;
    code?: string;
    fallbackText: string;
  };
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export function DocumentViewerModal({
  type,
  fileUrl,
  fileType,
  title,
  subtitle,
  verification,
  labels,
  onClose,
  triggerRef,
}: DocumentViewerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [docDimensions, setDocDimensions] = useState<{ width: number; height: number } | null>(null);

  // Lock page scroll and trap focus
  useEffect(() => {
    stopLenis();
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    panelRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      startLenis();
      document.body.style.overflow = origOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      triggerRef?.current?.focus();
    };
  }, [onClose, triggerRef]);

  // Determine aspect ratio class
  const isLandscape = docDimensions ? docDimensions.width > docDimensions.height : type === 'cert' && fileUrl.includes('certiport');

  // PDF rendering with pdfjs-dist
  useEffect(() => {
    if (fileType !== 'pdf') {
      setIsLoading(false);
      return;
    }

    let isCancelled = false;
    let currentRenderTask: any = null;

    async function loadAndRender() {
      try {
        setIsLoading(true);
        setHasError(false);

        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

        const loadingTask = pdfjs.getDocument({ url: fileUrl });
        const doc = await loadingTask.promise;
        if (isCancelled) return;

        const page = await doc.getPage(1);
        if (isCancelled) return;

        const unscaledViewport = page.getViewport({ scale: 1 });
        const unscaledWidth = unscaledViewport.width;
        const unscaledHeight = unscaledViewport.height;

        setDocDimensions({ width: unscaledWidth, height: unscaledHeight });

        const container = containerRef.current;
        if (!container || !canvasRef.current) return;

        // Available area inside the modal container
        const availWidth = Math.max(container.clientWidth - 16, 200);
        const availHeight = Math.max(container.clientHeight - 16, 200);

        // Fit-to-view containment scale
        const baseScale = Math.min(availWidth / unscaledWidth, availHeight / unscaledHeight);
        const currentScale = isZoomed ? baseScale * 2 : baseScale;

        const cssWidth = Math.floor(unscaledWidth * currentScale);
        const cssHeight = Math.floor(unscaledHeight * currentScale);

        // Razor-sharp canvas sizing with devicePixelRatio (2x to 3x)
        const dpr = Math.min(3, Math.max(2, window.devicePixelRatio || 1));
        const canvas = canvasRef.current;
        canvas.width = Math.floor(cssWidth * dpr);
        canvas.height = Math.floor(cssHeight * dpr);
        canvas.style.width = `${cssWidth}px`;
        canvas.style.height = `${cssHeight}px`;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        if (currentRenderTask) {
          currentRenderTask.cancel();
        }

        const viewport = page.getViewport({ scale: currentScale * dpr });
        currentRenderTask = page.render({
          canvas: canvas,
          canvasContext: ctx,
          viewport: viewport,
        });

        await currentRenderTask.promise;
        if (!isCancelled) {
          setIsLoading(false);
        }
      } catch (err: any) {
        if (err?.name === 'RenderingCancelledException') return;
        console.error('PDF rendering error:', err);
        if (!isCancelled) {
          setHasError(true);
          setIsLoading(false);
        }
      }
    }

    loadAndRender();

    // Debounced resize handler
    let resizeTimer: any = null;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        loadAndRender();
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isCancelled = true;
      if (currentRenderTask) {
        currentRenderTask.cancel();
      }
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [fileUrl, fileType, isZoomed]);

  // For image document (BNSP), measure intrinsic size
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setDocDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    setIsLoading(false);
  };

  const toggleZoom = useCallback(() => {
    setIsZoomed((prev) => !prev);
  }, []);

  const downloadFilename = fileUrl.split('/').pop() || 'document';

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/60 flex items-center justify-center p-2 sm:p-4 select-none"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className={`relative w-full ${
          isLandscape ? 'max-w-[min(94vw,960px)]' : 'max-w-[min(94vw,680px)]'
        } max-h-[94dvh] flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-black/10 shadow-2xl overflow-hidden focus:outline-hidden`}
        style={{ transform: 'none' }}
      >
        {/* Compact Single-Row Header */}
        <header className="flex items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3 border-b border-[#F0F0F0] bg-[#FAFAFA] shrink-0 gap-2">
          {/* Left: Icon + Title + Subtitle */}
          <div className="flex items-center gap-2.5 min-w-0 pr-1">
            <div className="w-8 h-8 rounded-full bg-[#111111] flex items-center justify-center text-white shrink-0">
              {type === 'cv' ? <FileText size={16} /> : <Award size={16} />}
            </div>
            <div className="truncate">
              <h2 className="text-[14px] sm:text-[15px] font-semibold text-[#111111] tracking-tight leading-tight truncate">
                {title}
              </h2>
              {subtitle && (
                <p className="text-[11px] sm:text-[12px] text-[#666666] font-medium truncate">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Right: Zoom Toggle, Open in New Tab, Download, Close */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Zoom Button */}
            <button
              type="button"
              onClick={toggleZoom}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-white border border-black/10 hover:bg-[#F2F2F2] text-[11px] sm:text-[12px] font-medium text-[#222222] transition-colors cursor-pointer"
              title={isZoomed ? labels.zoomOut : labels.zoomIn}
              aria-label={isZoomed ? labels.zoomOut : labels.zoomIn}
            >
              {isZoomed ? <ZoomOut size={13} /> : <ZoomIn size={13} />}
              <span className="hidden xs:inline">{isZoomed ? labels.zoomOut : labels.zoomIn}</span>
            </button>

            {/* Open in New Tab */}
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-black/10 hover:bg-[#F2F2F2] flex items-center justify-center text-[#555555] hover:text-black transition-colors"
              title={labels.openNewTab}
              aria-label={labels.openNewTab}
            >
              <ExternalLink size={13} />
            </a>

            {/* Direct Download Button */}
            <a
              href={fileUrl}
              download={downloadFilename}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#111111] text-white text-[11px] sm:text-[12px] font-medium hover:bg-black/85 transition-colors shadow-xs"
              title={labels.downloadButton}
              aria-label={labels.downloadButton}
            >
              <Download size={13} />
              <span className="hidden sm:inline">{labels.downloadButton}</span>
            </a>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-black/10 hover:bg-[#F2F2F2] flex items-center justify-center text-[#555555] hover:text-black transition-colors cursor-pointer"
              title={labels.closeButton}
              aria-label={labels.closeButton}
            >
              <X size={15} strokeWidth={2} />
            </button>
          </div>
        </header>

        {/* Document Display Area: Fit-to-view / Pannable when zoomed */}
        <div
          ref={containerRef}
          data-lenis-prevent
          onDoubleClick={toggleZoom}
          className={`relative flex-1 min-h-[50vh] sm:min-h-[58vh] max-h-[calc(94dvh-95px)] bg-[#EDEDED] flex items-center justify-center p-2 sm:p-3 ${
            isZoomed
              ? 'overflow-auto cursor-grab active:cursor-grabbing touch-pan-x touch-pan-y'
              : 'overflow-hidden cursor-zoom-in'
          }`}
          style={{
            touchAction: isZoomed ? 'pan-x pan-y pinch-zoom' : 'none',
          }}
        >
          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-xs z-10 text-[#666666] text-[12px] font-medium">
              <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin mb-2" />
              <span>Loading...</span>
            </div>
          )}

          {/* Error Fallback */}
          {hasError && (
            <div className="flex flex-col items-center justify-center p-6 text-center space-y-3 bg-white rounded-xl border border-black/10">
              <p className="text-[13px] text-[#555555]">{labels.fallbackText}</p>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111111] text-white text-[12px] font-medium"
              >
                <ExternalLink size={14} />
                <span>{labels.openNewTab}</span>
              </a>
            </div>
          )}

          {/* PDF Canvas Rendering */}
          {fileType === 'pdf' && (
            <div className="bg-white rounded-lg shadow-sm border border-black/10 overflow-hidden shrink-0 flex items-center justify-center">
              <canvas ref={canvasRef} className="block max-w-none" />
            </div>
          )}

          {/* Image Rendering for BNSP */}
          {fileType === 'image' && (
            <div
              className={`bg-white rounded-lg shadow-sm border border-black/10 overflow-hidden shrink-0 flex items-center justify-center ${
                isZoomed ? 'w-[180%] sm:w-[160%]' : 'max-h-full max-w-full'
              }`}
            >
              <img
                src={fileUrl}
                alt={title}
                onLoad={handleImageLoad}
                className={`block ${isZoomed ? 'w-full h-auto' : 'max-h-[calc(94dvh-130px)] max-w-full object-contain'}`}
              />
            </div>
          )}
        </div>

        {/* Compact Verification Chip for Certiport Certificate */}
        {verification && (
          <footer className="flex items-center justify-center gap-2 py-1.5 px-4 bg-[#F8F9FA] border-t border-black/5 text-[11px] sm:text-[12px] text-[#555555] shrink-0">
            <span className="font-medium text-[#111111]">
              {labels.verification || 'Verifikasi'}:
            </span>
            <a
              href={`https://${verification.site}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#2563EB] hover:underline font-medium"
            >
              <span>{verification.site}</span>
              <ExternalLink size={11} />
            </a>
            <span className="text-[#999999]">·</span>
            <span>{labels.code || 'Kode'}:</span>
            <code className="px-1.5 py-0.5 rounded bg-black/5 font-mono text-[11px] font-semibold text-black">
              {verification.code}
            </code>
          </footer>
        )}
      </motion.div>
    </div>
  );
}
