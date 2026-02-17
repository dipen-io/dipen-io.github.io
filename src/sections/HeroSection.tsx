import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, ArrowRight, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Load animation (auto-play on mount)
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Portrait entrance
      loadTl.fromTo(
        portraitRef.current,
        { opacity: 0, scale: 1.06, x: '-6vw' },
        { opacity: 1, scale: 1, x: 0, duration: 1 },
        0
      );

      // Panel entrance
      loadTl.fromTo(
        panelRef.current,
        { x: '10vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9 },
        0.1
      );

      // Hairlines
      loadTl.fromTo(
        [topLineRef.current, bottomLineRef.current],
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, transformOrigin: 'left center' },
        0.3
      );

      // Label
      loadTl.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.4
      );

      // Headline words stagger
      const headlineWords = headlineRef.current?.querySelectorAll('.headline-word');
      if (headlineWords) {
        loadTl.fromTo(
          headlineWords,
          { y: 40, opacity: 0, rotateX: 25 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.7, stagger: 0.08 },
          0.5
        );
      }

      // Body + CTAs
      loadTl.fromTo(
        bodyRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.7
      );

      loadTl.fromTo(
        ctaRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.8
      );

      // Socials
      const socialIcons = socialsRef.current?.querySelectorAll('a');
      if (socialIcons) {
        loadTl.fromTo(
          socialIcons,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, stagger: 0.06 },
          0.9
        );
      }

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back
            gsap.set([portraitRef.current, panelRef.current], { opacity: 1, x: 0 });
            gsap.set(headlineRef.current, { opacity: 1, x: 0 });
            gsap.set([bodyRef.current, ctaRef.current], { opacity: 1, y: 0 });
          },
        },
      });

      // ENTRANCE (0-30%): Hold at visible state (already animated on load)
      // SETTLE (30-70%): Static
      // EXIT (70-100%): Animate out

      // Headline exit
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Body + CTA exit
      scrollTl.fromTo(
        [bodyRef.current, ctaRef.current],
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      // Portrait exit
      scrollTl.fromTo(
        portraitRef.current,
        { x: 0, scale: 1, opacity: 1 },
        { x: '-18vw', scale: 1.04, opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Panel exit
      scrollTl.fromTo(
        panelRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.75
      );

      // Lines exit
      scrollTl.fromTo(
        [topLineRef.current, bottomLineRef.current],
        { scaleX: 1 },
        { scaleX: 0, transformOrigin: 'right center', ease: 'power2.in' },
        0.8
      );

      // Socials exit
      scrollTl.fromTo(
        socialsRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-charcoal z-10"
    >
      {/* Portrait Image */}
      <img
        ref={portraitRef}
        src="/hero_portrait.jpg"
        alt="Dipen Boro"
        className="absolute left-0 top-0 w-[52vw] h-full object-cover"
      />

      {/* Right Content Panel */}
      <div
        ref={panelRef}
        className="absolute left-[52vw] top-0 w-[48vw] h-full bg-charcoal flex flex-col justify-center px-[4vw]"
      >
        {/* Top Hairline */}
        <div
          ref={topLineRef}
          className="hairline absolute left-[4vw] top-[10vh] w-[36vw]"
        />

        {/* Micro Label */}
        <span
          ref={labelRef}
          className="font-mono text-xs tracking-[0.12em] text-gold uppercase absolute left-[4vw] top-[13vh]"
        >
          Backend Developer
        </span>

        {/* Headline */}
        <div
          ref={headlineRef}
          className="absolute left-[4vw] top-[22vh] w-[36vw]"
        >
          <h1 className="font-display font-black uppercase leading-[0.9] tracking-[-0.03em] text-cream">
            <span className="headline-word block text-[clamp(2.5rem,5vw,5rem)]">I Build</span>
            <span className="headline-word block text-[clamp(2.5rem,5vw,5rem)] text-gold">Scalable</span>
            <span className="headline-word block text-[clamp(2.5rem,5vw,5rem)]">Systems</span>
          </h1>
        </div>

        {/* Body Text */}
        <div
          ref={bodyRef}
          className="absolute left-[4vw] top-[56vh] w-[32vw]"
        >
          <p className="text-mutedCream text-[clamp(0.875rem,1.1vw,1rem)] leading-relaxed">
            I'm Dipen Boro—a backend-focused developer who designs APIs, databases, and
            deployments that stay reliable under real-world load. I also craft clean,
            responsive frontends when the project calls for it.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="absolute left-[4vw] top-[74vh] flex gap-4"
        >
          <a
            href="#projects"
            className="btn-primary flex items-center gap-2 group"
          >
            View Projects
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="https://github.com/dipen-io"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            GitHub
          </a>
        </div>

        {/* Bottom Hairline */}
        <div
          ref={bottomLineRef}
          className="hairline absolute left-[4vw] top-[88vh] w-[36vw]"
        />

        {/* Social Icons */}
        <div
          ref={socialsRef}
          className="absolute left-[4vw] top-[91vh] flex gap-5"
        >
          <a
            href="https://github.com/usernamedinesh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream hover:text-gold transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream hover:text-gold transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:borod9200@gmail.com"
            className="text-cream hover:text-gold transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
