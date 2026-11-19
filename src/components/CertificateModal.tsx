import { DocumentViewerModal } from './DocumentViewerModal';
import type { CertificationItem, PortfolioContent } from '../data/content';

interface CertificateModalProps {
  cert: CertificationItem;
  content: PortfolioContent['certModal'];
  onClose: () => void;
}

export function CertificateModal({ cert, content, onClose }: CertificateModalProps) {
  return (
    <DocumentViewerModal
      type="cert"
      fileUrl={cert.fileUrl}
      fileType={cert.fileType}
      title={cert.title}
      subtitle={`${cert.issuer} · ${cert.date}`}
      verification={cert.verification}
      labels={content}
      onClose={onClose}
    />
  );
}
