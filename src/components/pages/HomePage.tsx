import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Download, Mail, Code, Briefcase, Award, 
  Terminal, Database, Server, Cpu, Globe, Layers, 
  ExternalLink, Github, Linkedin, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { 
  HeroSectionStatistics, 
  Projects, 
  Skills, 
  Experience, 
  Certifications 
} from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

// --- Utility Components for Motion & Layout ---

type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('is-visible');
        observer.unobserve(element);
      }
    }, { threshold: 0.1 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`opacity-0 translate-y-8 transition-all duration-1000 ease-out ${className || ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <style>{`
        .is-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
      {children}
    </div>
  );
};

const SectionDivider = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent my-0" />
);

const GridBackground = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="absolute inset-0 opacity-[0.03]" 
      style={{
        backgroundImage: `linear-gradient(#00FFFF 1px, transparent 1px), linear-gradient(90deg, #00FFFF 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} 
    />
    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
  </div>
);

// --- Main Component ---

const HomePage: React.FC = () => {
  // --- Data State ---
  const [stats, setStats] = useState<HeroSectionStatistics[]>([]);
  const [projects, setProjects] = useState<Projects[]>([]);
  const [skills, setSkills] = useState<Skills[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [certifications, setCertifications] = useState<Certifications[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- Scroll Progress ---
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // --- Data Fetching ---
  useEffect(() => {
    const loadAllData = async () => {
      try {
        // Parallel fetching for performance
        const [statsRes, projectsRes, skillsRes, expRes, certsRes] = await Promise.all([
          BaseCrudService.getAll<HeroSectionStatistics>('stats'),
          BaseCrudService.getAll<Projects>('projects'),
          BaseCrudService.getAll<Skills>('skills'),
          BaseCrudService.getAll<Experience>('experience'),
          BaseCrudService.getAll<Certifications>('certifications')
        ]);

        setStats(statsRes.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
        setProjects(projectsRes.items);
        setSkills(skillsRes.items.sort((a, b) => (b.proficiencyLevel || 0) - (a.proficiencyLevel || 0)));
        setExperience(expRes.items.sort((a, b) => new Date(b.startDate || '').getTime() - new Date(a.startDate || '').getTime()));
        setCertifications(certsRes.items);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph selection:bg-primary/30 selection:text-primary-foreground overflow-x-clip">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />
      <Header />
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
        <GridBackground />
        
        {/* Decorative Glows */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container max-w-[120rem] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Content */}
            <div className="lg:col-span-8 space-y-8">
              <AnimatedElement>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-mono mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Available for Hire
                </div>
              </AnimatedElement>

              <AnimatedElement delay={100}>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] font-montserrat">
                  SHRUTIKA <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary font-fraunces">
                    SATANGE
                  </span>
                </h1>
              </AnimatedElement>

              <AnimatedElement delay={200}>
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-xl md:text-2xl text-foreground/80 font-light">
                  <span className="flex items-center gap-2">
                    <Terminal className="w-6 h-6 text-primary" />
                    Backend Developer
                  </span>
                  <span className="hidden md:block w-px h-6 bg-foreground/20" />
                  <span className="flex items-center gap-2">
                    <Database className="w-6 h-6 text-secondary" />
                    .NET Specialist
                  </span>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={300}>
                <p className="max-w-2xl text-lg text-foreground/60 leading-relaxed border-l-2 border-primary/30 pl-6">
                  Architecting robust, scalable backend systems. Specialized in building high-performance REST APIs and SQL Server architectures that power modern enterprise applications.
                </p>
              </AnimatedElement>

              <AnimatedElement delay={400}>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link to="/projects">
                    <Button className="h-14 px-8 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none border-r-4 border-r-white/20 text-lg font-medium transition-all hover:translate-x-1">
                      View Projects <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="h-14 px-8 border-foreground/20 hover:bg-foreground/5 rounded-none text-lg font-medium"
                    onClick={() => window.open('#', '_blank')}
                  >
                    Download Resume <Download className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </AnimatedElement>
            </div>

            {/* Hero Stats - Vertical Stack */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {stats.map((stat, index) => (
                <AnimatedElement key={stat._id} delay={500 + (index * 100)}>
                  <div className="group relative bg-charcoal/50 backdrop-blur-sm border border-white/5 p-6 hover:border-primary/50 transition-colors duration-300 overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                      {index === 0 && <Briefcase className="w-12 h-12" />}
                      {index === 1 && <Code className="w-12 h-12" />}
                      {index === 2 && <Award className="w-12 h-12" />}
                    </div>
                    <div className="relative z-10">
                      <div className="text-4xl font-heading font-bold text-white mb-1">
                        {stat.statisticValue}<span className="text-primary">{stat.unit}</span>
                      </div>
                      <div className="text-sm font-mono text-primary uppercase tracking-wider mb-2">
                        {stat.statisticLabel}
                      </div>
                      <div className="text-xs text-foreground/50">
                        {stat.description}
                      </div>
                    </div>
                    {/* Hover Line */}
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500 ease-out" />
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/30"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-foreground/30 to-transparent" />
        </motion.div>
      </section>
      <SectionDivider />
      {/* --- ABOUT SECTION (Sticky Layout) --- */}
      <section className="py-32 relative">
        <div className="container max-w-[120rem] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Sticky Title */}
            <div className="lg:col-span-4 relative">
              <div className="sticky top-32">
                <h2 className="font-heading text-5xl md:text-7xl font-bold text-foreground/10 mb-4">01</h2>
                <h3 className="font-heading text-4xl font-bold text-white mb-6">
                  Engineering <br />
                  <span className="text-primary">Philosophy</span>
                </h3>
                <p className="text-foreground/60 font-mono text-sm leading-relaxed max-w-xs">
                  // CORE_PRINCIPLES<br/>
                  Clean Architecture<br/>
                  Scalability<br/>
                  Security First
                </p>
              </div>
            </div>

            {/* Content Flow */}
            <div className="lg:col-span-8 space-y-16">
              <AnimatedElement>
                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-2xl md:text-3xl leading-relaxed font-light text-foreground/90">
                    I don't just write code; I engineer <span className="text-white font-medium">digital ecosystems</span>. 
                    My approach combines the precision of clean architecture with the raw power of modern .NET technologies.
                  </p>
                </div>
              </AnimatedElement>

              <div className="grid md:grid-cols-2 gap-8">
                <AnimatedElement delay={100}>
                  <div className="p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300">
                    <Server className="w-10 h-10 text-primary mb-6" />
                    <h4 className="text-xl font-bold text-white mb-3">Scalable Architecture</h4>
                    <p className="text-foreground/60 leading-relaxed">
                      Designing systems that grow with your business. Utilizing microservices and modular monoliths to ensure long-term maintainability.
                    </p>
                  </div>
                </AnimatedElement>

                <AnimatedElement delay={200}>
                  <div className="p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300">
                    <Cpu className="w-10 h-10 text-secondary mb-6" />
                    <h4 className="text-xl font-bold text-white mb-3">Performance Optimization</h4>
                    <p className="text-foreground/60 leading-relaxed">
                      Obsessed with milliseconds. Optimizing SQL queries, implementing caching strategies, and fine-tuning API response times.
                    </p>
                  </div>
                </AnimatedElement>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SectionDivider />
      {/* --- SKILLS SECTION (Tech Grid) --- */}
      <section className="py-32 bg-charcoal/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        
        <div className="container max-w-[120rem] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div>
              <h2 className="font-heading text-5xl md:text-7xl font-bold text-foreground/10 mb-2">02</h2>
              <h3 className="font-heading text-4xl font-bold text-white">Technical <span className="text-secondary">Arsenal</span></h3>
            </div>
            <div className="hidden md:block w-1/3 h-px bg-white/20 mb-4" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {skills.map((skill, index) => (
              <AnimatedElement key={skill._id} delay={index * 50}>
                <div className="group relative aspect-square bg-background border border-white/5 hover:border-primary/50 transition-all duration-300 flex flex-col items-center justify-center p-4 text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {skill.skillLogo ? (
                    <div className="w-12 h-12 mb-4 relative grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110">
                      <Image 
                        src={skill.skillLogo} 
                        alt={skill.skillName || 'Skill'} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <Code className="w-10 h-10 mb-4 text-foreground/40 group-hover:text-primary transition-colors" />
                  )}
                  
                  <h4 className="font-mono text-sm font-bold text-foreground group-hover:text-white transition-colors">
                    {skill.skillName}
                  </h4>
                  
                  {/* Proficiency Bar */}
                  <div className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-500 ease-out" 
                       style={{ width: `${skill.proficiencyLevel || 0}%`, opacity: 0 }} 
                  />
                  <style>{`
                    .group:hover .absolute.bottom-0 {
                      opacity: 1 !important;
                    }
                  `}</style>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>
      {/* --- PROJECTS SECTION (Horizontal Scroll / Cards) --- */}
      <section className="py-32 relative">
        <div className="container max-w-[120rem] mx-auto px-6">
          <div className="mb-20">
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-foreground/10 mb-2">03</h2>
            <h3 className="font-heading text-4xl font-bold text-white">Featured <span className="text-primary">Deployments</span></h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {projects.map((project, index) => (
              <AnimatedElement key={project._id} delay={index * 100}>
                <div className="group relative bg-charcoal border border-white/10 overflow-hidden h-full flex flex-col">
                  {/* Image Area */}
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
                    {project.projectImage ? (
                      <Image 
                        src={project.projectImage} 
                        alt={project.projectTitle || 'Project'} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-deep-navy flex items-center justify-center">
                        <Layers className="w-16 h-16 text-white/10" />
                      </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-heading text-2xl font-bold text-white group-hover:text-primary transition-colors">
                        {project.projectTitle}
                      </h4>
                      <ExternalLink className="w-5 h-5 text-foreground/40 group-hover:text-white transition-colors" />
                    </div>
                    
                    <p className="text-foreground/60 mb-6 line-clamp-3 flex-1">
                      {project.projectDescription}
                    </p>

                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologiesUsed?.split(',').map((tech, i) => (
                          <span key={i} className="text-xs font-mono px-2 py-1 border border-white/10 text-foreground/70">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                      
                      <div className="pt-4 border-t border-white/5">
                        <p className="text-sm text-foreground/40 font-mono">
                          <span className="text-primary">Role:</span> {project.rolePerformed}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/projects">
              <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg">
                View All Projects <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <SectionDivider />
      {/* --- EXPERIENCE SECTION (Timeline) --- */}
      <section className="py-32 bg-deep-navy/30">
        <div className="container max-w-[120rem] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <h2 className="font-heading text-5xl md:text-7xl font-bold text-foreground/10 mb-2">04</h2>
                <h3 className="font-heading text-4xl font-bold text-white mb-8">
                  Career <span className="text-secondary">Timeline</span>
                </h3>
                <p className="text-foreground/60 mb-8">
                  A track record of delivering value and technical excellence across diverse organizations.
                </p>
                <Button className="bg-white text-black hover:bg-gray-200 rounded-none">
                  <Download className="mr-2 w-4 h-4" /> Download Full Resume
                </Button>
              </div>
            </div>

            <div className="lg:col-span-8 relative">
              {/* Timeline Line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 md:left-8" />

              <div className="space-y-12">
                {experience.map((role, index) => (
                  <AnimatedElement key={role._id} delay={index * 100}>
                    <div className="relative pl-8 md:pl-16">
                      {/* Timeline Dot */}
                      <div className="absolute left-[-4px] md:left-[28px] top-2 w-2 h-2 bg-primary rounded-full ring-4 ring-background" />
                      
                      <div className="bg-background border border-white/5 p-8 hover:border-white/20 transition-colors">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                          <div>
                            <h4 className="text-2xl font-bold text-white">{role.jobTitle}</h4>
                            <h5 className="text-lg text-primary">{role.companyName}</h5>
                          </div>
                          <div className="text-sm font-mono text-foreground/50 bg-white/5 px-3 py-1 rounded">
                            {new Date(role.startDate || '').getFullYear()} - {role.isCurrent ? 'Present' : new Date(role.endDate || '').getFullYear()}
                          </div>
                        </div>
                        
                        <p className="text-foreground/70 leading-relaxed whitespace-pre-line">
                          {role.responsibilities}
                        </p>
                      </div>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* --- CERTIFICATIONS SECTION --- */}
      <section className="py-24 border-y border-white/5">
        <div className="container max-w-[120rem] mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h3 className="font-heading text-3xl font-bold text-white mb-2">Certifications & Awards</h3>
            <div className="w-12 h-1 bg-primary" />
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {certifications.map((cert) => (
              <AnimatedElement key={cert._id}>
                <div className="flex items-center gap-4 bg-white/5 px-6 py-4 rounded-lg border border-white/5 hover:border-primary/30 transition-colors">
                  {cert.badgeImage ? (
                    <div className="w-12 h-12">
                      <Image src={cert.badgeImage} alt="Badge" className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    <Award className="w-10 h-10 text-secondary" />
                  )}
                  <div className="text-left">
                    <div className="font-bold text-white">{cert.certificationName}</div>
                    <div className="text-sm text-foreground/50">{cert.issuingOrganization}</div>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>
      {/* --- CONTACT SECTION --- */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-deep-navy/20" />
        
        <div className="container max-w-[120rem] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-heading text-5xl md:text-7xl font-bold text-foreground/10 mb-2">05</h2>
              <h3 className="font-heading text-4xl font-bold text-white mb-8">
                Let's Build <br />
                <span className="text-primary">Something Great</span>
              </h3>
              <p className="text-xl text-foreground/70 mb-12 max-w-md">
                Currently available for freelance projects and full-time opportunities. Open to discussing backend architecture, .NET migration, or API development.
              </p>

              <div className="space-y-6">
                <a href="mailto:shrutikasatange29@gmail.com" className="flex items-center gap-4 text-foreground/80 hover:text-primary transition-colors group">
                  <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-lg">shrutikasatange29@gmail.com</span>
                </a>
                <div className="flex items-center gap-4 text-foreground/80">
                  <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full">
                    <Globe className="w-5 h-5" />
                  </div>
                  <span className="text-lg">Nagpur, India</span>
                </div>
              </div>

              <div className="flex gap-4 mt-12">
                <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-white/10 hover:bg-white/10 hover:text-white">
                  <Github className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-white/10 hover:bg-white/10 hover:text-white">
                  <Linkedin className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="bg-charcoal/50 p-8 md:p-12 border border-white/5 backdrop-blur-sm">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-mono text-foreground/60">NAME</label>
                    <input type="text" className="w-full bg-background border border-white/10 p-4 text-white focus:border-primary focus:outline-none transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-mono text-foreground/60">EMAIL</label>
                    <input type="email" className="w-full bg-background border border-white/10 p-4 text-white focus:border-primary focus:outline-none transition-colors" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-mono text-foreground/60">SUBJECT</label>
                  <input type="text" className="w-full bg-background border border-white/10 p-4 text-white focus:border-primary focus:outline-none transition-colors" placeholder="Project Inquiry" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-mono text-foreground/60">MESSAGE</label>
                  <textarea rows={5} className="w-full bg-background border border-white/10 p-4 text-white focus:border-primary focus:outline-none transition-colors" placeholder="Tell me about your project..." />
                </div>
                <Button className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-bold tracking-wide">
                  SEND MESSAGE
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;