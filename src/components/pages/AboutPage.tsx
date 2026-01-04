import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Layers, Lock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Expertise } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';

export default function AboutPage() {
  const [expertise, setExpertise] = useState<Expertise[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadExpertise();
  }, []);

  const loadExpertise = async () => {
    try {
      const result = await BaseCrudService.getAll<Expertise>('expertise');
      setExpertise(result.items.sort((a, b) => (b.proficiencyLevel || 0) - (a.proficiencyLevel || 0)));
    } catch (error) {
      console.error('Error loading expertise:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (index: number) => {
    const icons = [Layers, Zap, Shield, Lock];
    return icons[index % icons.length];
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
              About Me
            </h1>
            <div className="w-24 h-1 bg-primary" />
          </motion.div>

          {/* Introduction */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="bg-charcoal rounded-xl p-12 border border-primary/20">
              <h2 className="font-heading text-3xl font-bold text-primary mb-8">
                Professional Background
              </h2>
              <div className="space-y-6 font-paragraph text-lg text-foreground/80 leading-relaxed">
                <p>
                  I'm a passionate Backend Developer with expertise in building robust, scalable, 
                  and high-performance server-side applications. With over a year of professional 
                  experience, I specialize in .NET technologies, REST API development, and database 
                  management using SQL Server.
                </p>
                <p>
                  My approach to software development is rooted in clean architecture principles, 
                  ensuring that every solution I build is maintainable, testable, and ready to scale. 
                  I believe in writing code that not only works but is also elegant and efficient.
                </p>
                <p>
                  Throughout my career, I've worked on diverse projects ranging from enterprise 
                  resource planning systems to asset management platforms, always focusing on 
                  delivering solutions that meet both technical excellence and business objectives.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Expertise Areas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl font-bold text-foreground mb-12">
              Areas of Expertise
            </h2>

            {isLoading ? (
              <div className="flex justify-center py-16">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {expertise.map((item, index) => {
                  const IconComponent = getIcon(index);
                  return (
                    <motion.div
                      key={item._id}
                      className="bg-charcoal rounded-xl p-8 border border-primary/20 hover:border-primary/50 transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                      whileHover={{ y: -8 }}
                    >
                      <div className="flex items-start gap-6">
                        <div className="p-4 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                          {item.image ? (
                            <Image 
                              src={item.image} 
                              alt={item.areaOfExpertise || 'Expertise'} 
                              className="w-8 h-8"
                              width={32}
                            />
                          ) : (
                            <IconComponent className="h-8 w-8 text-primary" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
                            {item.areaOfExpertise}
                          </h3>
                          <p className="font-paragraph text-base text-foreground/70 leading-relaxed mb-4">
                            {item.shortDescription}
                          </p>
                          {item.proficiencyLevel && (
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="font-paragraph text-sm text-foreground/60">
                                  Proficiency
                                </span>
                                <span className="font-paragraph text-sm font-semibold text-primary">
                                  {item.proficiencyLevel}%
                                </span>
                              </div>
                              <div className="h-2 bg-deep-navy rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-primary rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${item.proficiencyLevel}%` }}
                                  transition={{ delay: 0.8 + index * 0.1, duration: 1, ease: 'easeOut' }}
                                />
                              </div>
                            </div>
                          )}
                          {item.learnMoreUrl && (
                            <a
                              href={item.learnMoreUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-4 font-paragraph text-sm text-primary hover:text-primary/80 transition-colors"
                            >
                              Learn more →
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
