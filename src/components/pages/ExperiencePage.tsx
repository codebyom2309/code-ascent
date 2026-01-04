import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Experience } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { format } from 'date-fns';

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const result = await BaseCrudService.getAll<Experience>('experience');
      const sorted = result.items.sort((a, b) => {
        const dateA = a.startDate ? new Date(a.startDate).getTime() : 0;
        const dateB = b.startDate ? new Date(b.startDate).getTime() : 0;
        return dateB - dateA;
      });
      setExperiences(sorted);
    } catch (error) {
      console.error('Error loading experiences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    try {
      return format(new Date(date), 'MMM yyyy');
    } catch {
      return '';
    }
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
            <h1 className="font-heading text-6xl md:text-7xl font-bold text-foreground mb-6">
              Work Experience
            </h1>
            <div className="w-24 h-1 bg-primary" />
            <p className="font-paragraph text-lg text-foreground/70 mt-8 max-w-3xl">
              My professional journey in backend development, showcasing roles, responsibilities, 
              and contributions across different organizations.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />

              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp._id}
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-6 top-8 w-5 h-5 bg-primary rounded-full border-4 border-background hidden md:block z-10" />

                    {/* Content Card */}
                    <div className="md:ml-24">
                      <motion.div
                        className="bg-charcoal rounded-xl p-8 border border-primary/20 hover:border-primary/50 transition-all duration-300"
                        whileHover={{ y: -4, x: 4 }}
                      >
                        {/* Current Badge */}
                        {exp.isCurrent && (
                          <div className="inline-block mb-4">
                            <span className="px-4 py-2 bg-primary/20 text-primary rounded-lg font-paragraph text-sm font-semibold border border-primary/30">
                              Current Position
                            </span>
                          </div>
                        )}

                        {/* Job Title */}
                        <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
                          {exp.jobTitle}
                        </h2>

                        {/* Company Name */}
                        <div className="flex items-center gap-2 mb-4">
                          <Briefcase className="h-5 w-5 text-primary" />
                          <h3 className="font-heading text-xl font-semibold text-primary">
                            {exp.companyName}
                          </h3>
                        </div>

                        {/* Date Range */}
                        <div className="flex items-center gap-2 mb-6">
                          <Calendar className="h-4 w-4 text-foreground/60" />
                          <span className="font-paragraph text-sm text-foreground/60">
                            {formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
                          </span>
                        </div>

                        {/* Responsibilities */}
                        {exp.responsibilities && (
                          <div className="space-y-3">
                            <h4 className="font-heading text-sm font-semibold text-foreground/60 uppercase tracking-wider">
                              Key Responsibilities
                            </h4>
                            <div className="font-paragraph text-base text-foreground/70 leading-relaxed">
                              {exp.responsibilities.split('\n').map((line, i) => (
                                <p key={i} className="mb-2">
                                  {line.trim().startsWith('•') || line.trim().startsWith('-') 
                                    ? line 
                                    : `• ${line}`}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Experience Summary */}
          {!isLoading && experiences.length > 0 && (
            <motion.div
              className="mt-24 bg-gradient-to-br from-charcoal to-deep-navy rounded-xl p-12 border border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="grid md:grid-cols-2 gap-8 text-center">
                <div>
                  <div className="font-heading text-5xl font-bold text-primary mb-2">
                    {experiences.length}
                  </div>
                  <div className="font-paragraph text-base text-foreground/70">
                    Professional Roles
                  </div>
                </div>
                <div>
                  <div className="font-heading text-5xl font-bold text-primary mb-2">
                    {experiences.filter(e => e.isCurrent).length}
                  </div>
                  <div className="font-paragraph text-base text-foreground/70">
                    Current Position{experiences.filter(e => e.isCurrent).length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
