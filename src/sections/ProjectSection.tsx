import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, FileText, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const bulletsRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=110%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      // Image entrance
      scrollTl.fromTo(
        imageRef.current,
        { x: '-60vw', opacity: 0, scale: 1.08 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Panel entrance
      scrollTl.fromTo(
        panelRef.current,
        { x: '50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Hairlines
      scrollTl.fromTo(
        topLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, transformOrigin: 'left center', ease: 'none' },
        0.05
      );

      // Label
      scrollTl.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // Title words
      const titleWords = titleRef.current?.querySelectorAll('.title-word');
      if (titleWords) {
        scrollTl.fromTo(
          titleWords,
          { y: 60, opacity: 0, rotateX: 30 },
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.02, ease: 'none' },
          0.08
        );
      }

      // Tags
      scrollTl.fromTo(
        tagsRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // Description
      scrollTl.fromTo(
        descRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );

      // Bullets
      const bulletItems = bulletsRef.current?.querySelectorAll('li');
      if (bulletItems) {
        scrollTl.fromTo(
          bulletItems,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.2
        );
      }

      // CTAs
      scrollTl.fromTo(
        ctaRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.22
      );

      // Bottom line
      scrollTl.fromTo(
        bottomLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, transformOrigin: 'left center', ease: 'none' },
        0.15
      );

      // SETTLE (30-70%): Elements hold position - no animation needed

      // EXIT (70-100%)
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        panelRef.current,
        { x: 0, opacity: 1 },
        { x: '14vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Lines exit
      scrollTl.fromTo(
        [topLineRef.current, bottomLineRef.current],
        { scaleX: 1 },
        { scaleX: 0, transformOrigin: 'right center', ease: 'power2.in' },
        0.8
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-pinned bg-charcoal z-20"
    >
      {/* Project Image */}
      <img
        ref={imageRef}
        src="/project_phone.jpg"
        alt="BPF Party App"
        className="absolute left-0 top-0 w-[55vw] h-full object-cover"
      />

      {/* Right Info Panel */}
      <div
        ref={panelRef}
        className="absolute left-[55vw] top-0 w-[45vw] h-full bg-charcoal flex flex-col justify-center px-[4vw]"
      >
        {/* Top Hairline */}
        <div
          ref={topLineRef}
          className="hairline absolute left-[4vw] top-[10vh] w-[32vw]"
        />

        {/* Micro Label */}
        <span
          ref={labelRef}
          className="font-mono text-xs tracking-[0.12em] text-gold uppercase absolute left-[4vw] top-[13vh]"
        >
          Featured Project
        </span>

        {/* Project Title */}
        <h2
          ref={titleRef}
          className="font-display font-black uppercase leading-[0.95] tracking-[-0.03em] text-cream absolute left-[4vw] top-[20vh] w-[32vw]"
        >
          <span className="title-word block text-[clamp(2rem,4vw,4rem)]">BPF Party</span>
          <span className="title-word block text-[clamp(2rem,4vw,4rem)]">App</span>
        </h2>

        {/* Tech Tags */}
        <div
          ref={tagsRef}
          className="absolute left-[4vw] top-[38vh]"
        >
          <span className="font-mono text-xs tracking-[0.1em] text-mutedCream uppercase">
            Node.js • MongoDB • Cloudinary • React Native
          </span>
        </div>

        {/* Description */}
        <p
          ref={descRef}
          className="absolute left-[4vw] top-[44vh] w-[32vw] text-mutedCream text-[clamp(0.875rem,1vw,1rem)] leading-relaxed"
        >
          A full-stack social platform built for a political party during election
          season—supporting content sharing, payments, and role-based access.
        </p>

        {/* Bullet Points */}
        <ul
          ref={bulletsRef}
          className="absolute left-[4vw] top-[56vh] w-[32vw] space-y-3"
        >
          {[
            'Role-based multi-user system with secure auth',
            'Payments + media uploads integrated end-to-end',
            'Deployed for real-time traffic with monitoring',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-cream text-sm">
              <Check className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="absolute left-[4vw] top-[76vh] flex gap-4"
        >
          <a
            href="https://play.google.com/store/apps/details?id=com.kodevana.bpf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2 group"
          >
            <ExternalLink className="w-4 h-4" />
            Play Store
          </a>
          <button
            className="btn-secondary flex items-center gap-2 opacity-60 cursor-not-allowed"
            disabled
          >
            <FileText className="w-4 h-4" />
            Case Study
          </button>
        </div>

        {/* Bottom Hairline */}
        <div
          ref={bottomLineRef}
          className="hairline absolute left-[4vw] top-[88vh] w-[32vw]"
        />
      </div>
    </section>
  );
}
