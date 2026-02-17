import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, School } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    icon: GraduationCap,
    institution: 'Rangia College, Assam',
    degree: 'Bachelor of Computer Applications (BCA)',
    period: '2020 – 2023',
    result: 'CGPA: 7.58/10',
  },
  {
    icon: School,
    institution: 'Tamulpur HS School',
    degree: 'Higher Secondary (PCMB)',
    period: '2018 – 2020',
    result: '61%',
  },
];

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: true,
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.education-card');
      cards?.forEach((card) => {
        gsap.fromTo(
          card,
          { y: '6vh', opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 65%',
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-charcoal py-24 z-40"
    >
      <div className="px-[8vw]">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="font-display font-black uppercase text-[clamp(2.5rem,5vw,4rem)] text-cream tracking-[-0.02em] mb-16"
        >
          Education
        </h2>

        {/* Education Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {educationData.map((edu, index) => (
            <div
              key={index}
              className="education-card bg-charcoal border border-[rgba(243,241,234,0.15)] p-8 hover:border-gold/50 transition-colors duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gold/10 flex items-center justify-center">
                  <edu.icon className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <span className="font-mono text-xs tracking-[0.12em] text-gold uppercase">
                    {edu.period}
                  </span>
                  <h3 className="font-display font-bold text-lg text-cream mt-1">
                    {edu.institution}
                  </h3>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-cream/90 font-medium">{edu.degree}</p>
                <p className="text-mutedCream text-sm">{edu.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
