import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Skills } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skills[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const result = await BaseCrudService.getAll<Skills>('skills');
      setSkills(result.items.sort((a, b) => (b.proficiencyLevel || 0) - (a.proficiencyLevel || 0)));
    } catch (error) {
      console.error('Error loading skills:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skills[]>);

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
              Technical Skills
            </h1>
            <div className="w-24 h-1 bg-primary" />
            <p className="font-paragraph text-lg text-foreground/70 mt-8 max-w-3xl">
              A comprehensive overview of my technical expertise, tools, and technologies 
              I work with to build robust backend solutions.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="space-y-16">
              {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.2, duration: 0.6 }}
                >
                  <h2 className="font-heading text-3xl font-bold text-primary mb-8">
                    {category}
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categorySkills.map((skill, index) => (
                      <motion.div
                        key={skill._id}
                        className="bg-charcoal rounded-xl p-8 border border-primary/20 hover:border-primary/50 transition-all duration-300 group"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: categoryIndex * 0.2 + index * 0.1, duration: 0.4 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                      >
                        <div className="flex items-start gap-4 mb-6">
                          {skill.skillLogo && (
                            <div className="w-12 h-12 bg-deep-navy rounded-lg flex items-center justify-center p-2 group-hover:bg-primary/10 transition-colors duration-300">
                              <Image 
                                src={skill.skillLogo} 
                                alt={skill.skillName || 'Skill'} 
                                className="w-full h-full object-contain"
                                width={48}
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="font-heading text-xl font-bold text-foreground mb-1">
                              {skill.skillName}
                            </h3>
                            {skill.yearsOfExperience !== undefined && (
                              <p className="font-paragraph text-sm text-primary">
                                {skill.yearsOfExperience}+ {skill.yearsOfExperience === 1 ? 'year' : 'years'} experience
                              </p>
                            )}
                          </div>
                        </div>

                        {skill.description && (
                          <p className="font-paragraph text-sm text-foreground/70 mb-6 leading-relaxed">
                            {skill.description}
                          </p>
                        )}

                        {skill.proficiencyLevel !== undefined && (
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-paragraph text-sm text-foreground/60">
                                Proficiency
                              </span>
                              <span className="font-paragraph text-sm font-semibold text-primary">
                                {skill.proficiencyLevel}%
                              </span>
                            </div>
                            <div className="h-2 bg-deep-navy rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.proficiencyLevel}%` }}
                                transition={{ 
                                  delay: categoryIndex * 0.2 + index * 0.1 + 0.3, 
                                  duration: 1, 
                                  ease: 'easeOut' 
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Skills Summary */}
          {!isLoading && skills.length > 0 && (
            <motion.div
              className="mt-24 bg-gradient-to-br from-charcoal to-deep-navy rounded-xl p-12 border border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="font-heading text-5xl font-bold text-primary mb-2">
                    {skills.length}
                  </div>
                  <div className="font-paragraph text-base text-foreground/70">
                    Technical Skills
                  </div>
                </div>
                <div>
                  <div className="font-heading text-5xl font-bold text-primary mb-2">
                    {Object.keys(groupedSkills).length}
                  </div>
                  <div className="font-paragraph text-base text-foreground/70">
                    Skill Categories
                  </div>
                </div>
                <div>
                  <div className="font-heading text-5xl font-bold text-primary mb-2">
                    {Math.round(skills.reduce((sum, s) => sum + (s.proficiencyLevel || 0), 0) / skills.length)}%
                  </div>
                  <div className="font-paragraph text-base text-foreground/70">
                    Average Proficiency
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
