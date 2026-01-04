import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Projects } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const result = await BaseCrudService.getAll<Projects>('projects');
      setProjects(result.items);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
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
              Projects
            </h1>
            <div className="w-24 h-1 bg-primary" />
            <p className="font-paragraph text-lg text-foreground/70 mt-8 max-w-3xl">
              A showcase of my professional work, demonstrating expertise in backend development, 
              system architecture, and delivering scalable solutions.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="grid gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  className="bg-charcoal rounded-xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative h-80 lg:h-auto overflow-hidden bg-deep-navy">
                      {project.projectImage ? (
                        <Image 
                          src={project.projectImage} 
                          alt={project.projectTitle || 'Project'} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          width={800}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Code className="h-24 w-24 text-primary/20" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content Section */}
                    <div className="p-8 lg:p-12 flex flex-col justify-between">
                      <div>
                        <h2 className="font-heading text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                          {project.projectTitle}
                        </h2>

                        {project.rolePerformed && (
                          <div className="mb-6">
                            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-lg font-paragraph text-sm font-semibold">
                              {project.rolePerformed}
                            </span>
                          </div>
                        )}

                        <p className="font-paragraph text-base text-foreground/70 leading-relaxed mb-6">
                          {project.projectDescription}
                        </p>

                        {project.technologiesUsed && (
                          <div className="mb-8">
                            <h3 className="font-heading text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-3">
                              Technologies Used
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {project.technologiesUsed.split(',').map((tech, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-deep-navy text-primary rounded-md font-paragraph text-sm border border-primary/20"
                                >
                                  {tech.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <Link to={`/projects/${project._id}`}>
                          <Button 
                            className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 rounded-lg font-paragraph transition-all duration-200 hover:shadow-lg hover:shadow-primary/50"
                          >
                            View Details <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Projects Summary */}
          {!isLoading && projects.length > 0 && (
            <motion.div
              className="mt-24 bg-gradient-to-br from-charcoal to-deep-navy rounded-xl p-12 border border-primary/20 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="font-heading text-5xl font-bold text-primary mb-4">
                {projects.length}+
              </div>
              <div className="font-paragraph text-xl text-foreground/70">
                Successfully Delivered Projects
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
