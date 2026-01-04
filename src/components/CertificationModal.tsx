import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { Certifications } from '@/entities';
import { Image } from '@/components/ui/image';
import { format } from 'date-fns';

interface CertificationModalProps {
  certification: Certifications | null;
  isOpen: boolean;
  onClose: () => void;
}

const CertificationModal: React.FC<CertificationModalProps> = ({ certification, isOpen, onClose }) => {
  if (!certification) return null;

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    try {
      return format(new Date(date), 'MMMM yyyy');
    } catch {
      return '';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          >
            <motion.div
              className="bg-charcoal border border-primary/30 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              {/* Close Button */}
              <div className="sticky top-0 flex justify-end p-4 bg-charcoal/95 border-b border-primary/10 z-10">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 text-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                {/* Badge Image - Full Size */}
                {certification.badgeImage && (
                  <div className="mb-8 flex justify-center">
                    <div className="w-full max-w-md">
                      <Image
                        src={certification.badgeImage}
                        alt={certification.certificationName || 'Certification'}
                        className="w-full h-auto object-contain"
                        width={400}
                      />
                    </div>
                  </div>
                )}

                {/* Title */}
                <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
                  {certification.certificationName}
                </h2>

                {/* Organization */}
                {certification.issuingOrganization && (
                  <p className="font-paragraph text-xl text-primary mb-6">
                    {certification.issuingOrganization}
                  </p>
                )}

                {/* Date */}
                {certification.dateIssued && (
                  <div className="mb-8 pb-8 border-b border-white/10">
                    <p className="font-paragraph text-base text-foreground/70">
                      <span className="font-semibold text-foreground">Issued:</span> {formatDate(certification.dateIssued)}
                    </p>
                  </div>
                )}

                {/* Verification Link */}
                {certification.verificationUrl && (
                  <div className="flex gap-4">
                    <a
                      href={certification.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-all duration-200"
                    >
                      View Credential
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CertificationModal;
