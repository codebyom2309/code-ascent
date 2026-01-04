import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { SocialLinks } from '@/entities';
import { Image } from '@/components/ui/image';

const Footer: React.FC = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLinks[]>([]);

  useEffect(() => {
    loadSocialLinks();
  }, []);

  const loadSocialLinks = async () => {
    try {
      const result = await BaseCrudService.getAll<SocialLinks>('sociallinks');
      setSocialLinks(result.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
    } catch (error) {
      console.error('Error loading social links:', error);
    }
  };

  const getIconComponent = (platformName: string) => {
    const name = platformName?.toLowerCase() || '';
    if (name.includes('github')) return Github;
    if (name.includes('linkedin')) return Linkedin;
    if (name.includes('gmail') || name.includes('email')) return Mail;
    if (name.includes('resume')) return FileText;
    return Mail;
  };

  const handleSocialClick = (url: string | undefined, platformName: string | undefined) => {
    if (!url) return;
    
    // Handle email links
    if (platformName?.toLowerCase().includes('email') || url.startsWith('mailto:')) {
      window.location.href = url;
    } else {
      // Open external links in new tab
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <footer className="bg-charcoal border-t border-primary/10">
      <div className="max-w-[120rem] mx-auto px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Logo and Name */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center font-heading font-bold text-primary-foreground text-2xl">
              SS
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                Shrutika Satange
              </h3>
              <p className="font-paragraph text-sm text-primary">
                Backend Developer
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center gap-4">
            <p className="font-paragraph text-sm text-foreground/60">
              Building scalable backend solutions
            </p>
            <div className="flex gap-6">
              <Link to="/about" className="font-paragraph text-sm text-foreground/80 hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/projects" className="font-paragraph text-sm text-foreground/80 hover:text-primary transition-colors">
                Projects
              </Link>
              <Link to="/contact" className="font-paragraph text-sm text-foreground/80 hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-end gap-4">
            {socialLinks.map((social) => {
              const IconComponent = getIconComponent(social.platformName || '');
              return (
                <motion.button
                  key={social._id}
                  onClick={() => handleSocialClick(social.platformUrl, social.platformName)}
                  className="w-10 h-10 bg-deep-navy rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.description || social.platformName}
                  type="button"
                >
                  {social.platformIcon ? (
                    <Image 
                      src={social.platformIcon} 
                      alt={social.platformName || 'Social'} 
                      className="w-5 h-5"
                      width={20}
                    />
                  ) : (
                    <IconComponent className="h-5 w-5" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-primary/10 text-center">
          <p className="font-paragraph text-sm text-foreground/60">
            © {new Date().getFullYear()} Shrutika Satange. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
