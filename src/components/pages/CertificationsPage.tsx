import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, Maximize2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Certifications } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';
import { format } from 'date-fns';
import CertificationModal from '@/components/CertificationModal';

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certifications[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState<Certifications | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadCertifications();
  }, []);

  const loadCertifications = async () => {
    try {
      const result = await BaseCrudService.getAll<Certifications>('certifications');
      const sorted = result.items.sort((a, b) => {
        const dateA = a.dateIssued ? new Date(a.dateIssued).getTime() : 0;
        const dateB = b.dateIssued ? new Date(b.dateIssued).getTime() : 0;
        return dateB - dateA;
      });
      setCertifications(sorted);
    } catch (error) {
      console.error('Error loading certifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    try {
      return format(new Date(date), 'MMMM yyyy');
    } catch {
      return '';
    }
  };

  const handleOpenModal = (cert: Certifications) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCert(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-32 pb-24 px-8">
        <div className="max-w-[100rem] mx-auto">
          {/* Page Header */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6 font-fraunces">
              Certifications
            </h1>
            <div className="w-24 h-1 bg-primary" />
            <p className="font-paragraph text-lg text-foreground/70 mt-8 max-w-3xl">
              Professional certifications and credentials that validate my expertise and 
              commitment to continuous learning in software development.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert._id}
                  className="bg-charcoal rounded-xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-all duration-300 group cursor-pointer h-full flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => handleOpenModal(cert)}
                >
                  {/* Badge Image */}
                  {cert.badgeImage && (
                    <div className="relative h-64 bg-deep-navy flex items-center justify-center p-8 overflow-hidden">
                      <Image 
                        src={cert.badgeImage} 
                        alt={cert.certificationName || 'Certification'} 
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        width={400}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                      {/* Expand Icon */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors duration-300">
                        <Maximize2 className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <h2 className="font-heading text-xl font-bold text-foreground leading-tight">
                        {cert.certificationName}
                      </h2>
                    </div>

                    {cert.issuingOrganization && (
                      <p className="font-paragraph text-base text-primary mb-4">
                        {cert.issuingOrganization}
                      </p>
                    )}

                    {cert.dateIssued && (
                      <div className="flex items-center gap-2 mb-6">
                        <Calendar className="h-4 w-4 text-foreground/60" />
                        <span className="font-paragraph text-sm text-foreground/60">
                          Issued {formatDate(cert.dateIssued)}
                        </span>
                      </div>
                    )}

                    <div className="mt-auto pt-4 border-t border-white/10">
                      {cert.verificationUrl && (
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg font-paragraph text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200 border border-primary/20"
                        >
                          Verify Credential
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Certifications Summary */}
          {!isLoading && certifications.length > 0 && (
            <motion.div
              className="mt-24 bg-gradient-to-br from-charcoal to-deep-navy rounded-xl p-12 border border-primary/20 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="font-heading text-5xl font-bold text-primary mb-4">
                {certifications.length}
              </div>
              <div className="font-paragraph text-xl text-foreground/70">
                Professional Certification{certifications.length !== 1 ? 's' : ''}
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <CertificationModal 
        certification={selectedCert} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
      />
      <Footer />
    </div>
  );
}
