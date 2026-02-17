import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
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
    <footer
      ref={sectionRef}
      className="relative bg-charcoal py-8 z-40"
    >
      <div className="hairline absolute top-0 left-0 w-full" />
      
      <div
        ref={contentRef}
        className="px-[8vw] flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <p className="text-mutedCream text-sm">
          © {new Date().getFullYear()} Dipen Boro. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/usernamedinesh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-cream hover:text-gold transition-colors text-sm"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-cream hover:text-gold transition-colors text-sm"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <a
            href="mailto:borod9200@gmail.com"
            className="flex items-center gap-2 text-cream hover:text-gold transition-colors text-sm"
          >
            <FileText className="w-4 h-4" />
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
