import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }, 1500);
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
              Get In Touch
            </h1>
            <div className="w-24 h-1 bg-primary" />
            <p className="font-paragraph text-lg text-foreground/70 mt-8 max-w-3xl">
              Have a project in mind or want to discuss opportunities? I'd love to hear from you. 
              Send me a message and I'll get back to you as soon as possible.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="bg-charcoal rounded-xl p-8 border border-primary/20">
                <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
                  Send a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-paragraph text-sm text-foreground/80">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-deep-navy border-primary/20 text-foreground focus:border-primary h-12"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-paragraph text-sm text-foreground/80">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-deep-navy border-primary/20 text-foreground focus:border-primary h-12"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="font-paragraph text-sm text-foreground/80">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-deep-navy border-primary/20 text-foreground focus:border-primary h-12"
                      placeholder="Project Inquiry"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-paragraph text-sm text-foreground/80">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="bg-deep-navy border-primary/20 text-foreground focus:border-primary resize-none"
                      placeholder="Tell me about your project or inquiry..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-lg font-paragraph font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-primary/50"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            <Send className="h-4 w-4" />
                          </motion.div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </motion.div>

                  {/* Success/Error Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      className="flex items-center gap-3 p-4 bg-primary/10 border border-primary/30 rounded-lg"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <p className="font-paragraph text-sm text-primary">
                        Message sent successfully! I'll get back to you soon.
                      </p>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-lg"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                      <p className="font-paragraph text-sm text-destructive">
                        Something went wrong. Please try again.
                      </p>
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="bg-charcoal rounded-xl p-8 border border-primary/20">
                <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                        Email
                      </h3>
                      <a
                        href="mailto:shrutikasatange29@gmail.com"
                        className="font-paragraph text-base text-primary hover:text-primary/80 transition-colors"
                      >
                        shrutikasatange29@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                        Location
                      </h3>
                      <p className="font-paragraph text-base text-foreground/70">
                        Nagpur, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="bg-gradient-to-br from-charcoal to-deep-navy rounded-xl p-8 border border-primary/20">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                  Let's Work Together
                </h3>
                <p className="font-paragraph text-base text-foreground/70 leading-relaxed mb-6">
                  I'm currently open to new opportunities and exciting projects. Whether you need 
                  a backend developer for your team or want to discuss a freelance project, 
                  feel free to reach out.
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  <span className="font-paragraph text-sm text-primary font-semibold">
                    Available for new projects
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
