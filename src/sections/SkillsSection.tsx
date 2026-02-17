import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Database, Cloud, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    icon: Code2,
    title: 'Languages',
    skills: ['JavaScript', 'Php','Sql', 'C', 'C++', 'HTML', 'CSS'],
  },
  {
    icon: Layers,
    title: 'frontend Framework',
    skills: ['React', 'Nextjs', 'React-Native']
  },
  {
    icon: Database,
    title: 'Backend & Data',
    skills: ['Node.js','Bun', 'MongoDB', 'Nestjs', 'Redis', 'Prisma', 'REST APIs', 'Drizzle'],
  },
  {
    icon: Cloud,
    title: 'Tools & Cloud',
    skills: ['AWS (S3/EC2)', 'Cloudinary', 'Docker', 'Nginx', 'Git', 'Linux', 'Vim', 'Postman'],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      // Headline lines
      const headlineWords = headlineRef.current?.querySelectorAll('.headline-word');
      if (headlineWords) {
        scrollTl.fromTo(
          headlineWords,
          { x: '-40vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0
        );
      }

      // Subheadline
      scrollTl.fromTo(
        subheadRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // Skill categories
      const skillCards = skillsRef.current?.querySelectorAll('.skill-category');
      if (skillCards) {
        scrollTl.fromTo(
          skillCards,
          { x: '40vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.05, ease: 'none' },
          0.05
        );
      }

      // Skill rules
      const rules = skillsRef.current?.querySelectorAll('.skill-rule');
      if (rules) {
        scrollTl.fromTo(
          rules,
          { scaleX: 0 },
          { scaleX: 1, transformOrigin: 'left center', stagger: 0.04, ease: 'none' },
          0.15
        );
      }

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      if (headlineWords) {
        scrollTl.fromTo(
          headlineWords,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
      }

      if (skillCards) {
        scrollTl.fromTo(
          skillCards,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0, stagger: 0.02, ease: 'power2.in' },
          0.7
        );
      }

      scrollTl.fromTo(
        subheadRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      if (rules) {
        scrollTl.fromTo(
          rules,
          { scaleX: 1 },
          { scaleX: 0, transformOrigin: 'right center', stagger: 0.02, ease: 'power2.in' },
          0.8
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-pinned z-30"
      style={{ backgroundColor: '#6B4C42' }}
    >
      {/* Left Headline Block */}
      <div className="absolute left-[8vw] top-[18vh] w-[40vw]">
        <div ref={headlineRef}>
          <h2 className="font-display font-black uppercase leading-[0.9] tracking-[-0.03em]">
            <span className="headline-word block text-[clamp(3rem,6vw,6rem)] text-cream">My</span>
            <span className="headline-word block text-[clamp(3rem,6vw,6rem)] text-gold">Stack</span>
          </h2>
        </div>

        <p
          ref={subheadRef}
          className="mt-8 text-cream/80 text-lg font-medium"
        >
          Backend-first. Cloud-ready. Frontend-capable.
        </p>
      </div>

      {/* Skill Categories (Right Side) */}
      <div
        ref={skillsRef}
        className="absolute left-[54vw] top-[18vh] w-[38vw] space-y-8"
      >
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-category">
            <div className="skill-rule hairline mb-4" />
            <div className="flex items-center gap-3 mb-3">
              <category.icon className="w-5 h-5 text-gold" />
              <h3 className="font-display font-bold text-cream uppercase tracking-wide text-sm">
                {category.title}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-charcoal/40 text-cream/90 text-sm font-mono tracking-wide"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
