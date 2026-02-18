import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
         // ScrollTrigger.create({
         //      trigger: section,
         //      start: "top 100%",
         //      id: "contact",
         //    });
      // Headline animation
      const headlineWords = headlineRef.current?.querySelectorAll('.headline-word');
      if (headlineWords) {
        gsap.fromTo(
          headlineWords,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 80%',
              end: 'top 55%',
              scrub: true,
            },
          }
        );
      }

      // Contact info animation
      gsap.fromTo(
        contactRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 85%',
            end: 'top 65%',
            scrub: true,
          },
        }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            end: 'top 65%',
            scrub: true,
          },
        }
      );

      // Socials animation
      gsap.fromTo(
        socialsRef.current,
        { y: '3vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: socialsRef.current,
            start: 'top 90%',
            end: 'top 75%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-charcoal py-24 z-40"
    >
      <div className="px-[8vw]">
        {/* Headline */}
        <div ref={headlineRef} className="mb-16">
          <h2 className="font-display font-black uppercase leading-[0.9] tracking-[-0.03em]">
            <span className="headline-word block text-[clamp(2rem,4.5vw,4.5rem)] text-cream">Let's Build</span>
            <span className="headline-word block text-[clamp(2rem,4.5vw,4.5rem)] text-cream">Something</span>
            <span className="headline-word block text-[clamp(2rem,4.5vw,4.5rem)] text-gold">Solid</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div ref={contactRef}>
            <p className="text-mutedCream mb-8 leading-relaxed max-w-md">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>

            <div className="space-y-6">
              <a
                href="mailto:borod9200@gmail.com"
                className="flex items-center gap-4 text-cream hover:text-gold transition-colors group"
              >
                <div className="w-10 h-10 bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <span className="text-sm">borod9200@gmail.com</span>
              </a>

              <a
                href="tel:+919365646114"
                className="flex items-center gap-4 text-cream hover:text-gold transition-colors group"
              >
                <div className="w-10 h-10 bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <span className="text-sm">+91 93656 46114</span>
              </a>

              <div className="flex items-center gap-4 text-cream">
                <div className="w-10 h-10 bg-gold/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <span className="text-sm">Rangia, Assam, India</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <input
                type="text"
                placeholder="Your Name"
                disabled
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div>
              <input
                type="email"
                disabled
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div>
              <textarea
                placeholder="Your Message"
                disabled
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="form-input resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled
              className="btn-primary flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              Send Message
            </button>
          </form>
        </div>

        {/* Social Links */}
        <div
          ref={socialsRef}
          className="mt-16 pt-8 border-t border-[rgba(243,241,234,0.15)]"
        >
          <div className="flex items-center gap-6">
            <span className="text-mutedCream text-sm">Find me on:</span>
            <a
              href="https://github.com/dipen-io"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-cream hover:text-gold transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href="http://www.linkedin.com/in/dipenboro"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-cream hover:text-gold transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span className="text-sm">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
