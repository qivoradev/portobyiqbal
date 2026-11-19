import { DocumentViewerModal } from './DocumentViewerModal';
import type { PortfolioContent } from '../data/content';

interface CVModalProps {
  content: PortfolioContent['cvModal'];
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export function CVModal({ content, onClose, triggerRef }: CVModalProps) {
  return (
    <DocumentViewerModal
      type="cv"
      fileUrl="/cv/Iqbal-Dwi-Fathonah-CV.pdf"
      fileType="pdf"
      title={content.title}
      subtitle={content.subtitle}
      labels={content}
      onClose={onClose}
      triggerRef={triggerRef}
    />
  );
}
