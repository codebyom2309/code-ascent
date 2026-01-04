import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Code, User, Wrench } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Projects } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Projects | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProject();
  }, [id]);

  const loadProject = async () => {
    if (!id) return;
    try {
      const data = await BaseCrudService.getById<Projects>('projects', id);
      setProject(data);
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-32 pb-24 px-8">
          <div className="max-w-[100rem] mx-auto text-center">
            <h1 className="font-heading text-4xl font-bold text-foreground mb-4">
              Project Not Found
            </h1>
            <Link to="/projects">
              <Button className="mt-8">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="pt-32 pb-24 px-8">
        <div className="max-w-[100rem] mx-auto">
          {/* Back Button */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link to="/projects">
              <Button 
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
          </motion.div>

          {/* Project Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              {project.projectTitle}
            </h1>
            <div className="w-24 h-1 bg-primary" />
          </motion.div>

          {/* Project Image */}
          {project.projectImage && (
            <motion.div
              className="mb-12 rounded-xl overflow-hidden border border-primary/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Image 
                src={project.projectImage} 
                alt={project.projectTitle || 'Project'} 
                className="w-full h-[500px] object-cover"
                width={1600}
              />
            </motion.div>
          )}

          {/* Project Details Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Role */}
            {project.rolePerformed && (
              <motion.div
                className="bg-charcoal rounded-xl p-8 border border-primary/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    My Role
                  </h3>
                </div>
                <p className="font-paragraph text-base text-foreground/70">
                  {project.rolePerformed}
                </p>
              </motion.div>
            )}

            {/* Technologies */}
            {project.technologiesUsed && (
              <motion.div
                className="bg-charcoal rounded-xl p-8 border border-primary/20 lg:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Wrench className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    Technologies Used
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {project.technologiesUsed.split(',').map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-deep-navy text-primary rounded-lg font-paragraph text-sm font-semibold border border-primary/20"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Project Description */}
          <motion.div
            className="bg-charcoal rounded-xl p-12 border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground">
                Project Overview
              </h3>
            </div>
            <p className="font-paragraph text-lg text-foreground/70 leading-relaxed">
              {project.projectDescription}
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
