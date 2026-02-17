import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Code } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    icon: Briefcase,
    role: 'Freelance Full-Stack Developer',
    company: 'Self-Employed',
    period: '2023 - Present',
    description: 'Built and deployed end-to-end solutions for clients—APIs, databases, cloud infra, and responsive UIs.',
    highlights: [
      'Developed custom APIs and database schemas using Node.js and MongoDB',
      'Deployed cloud-based solutions on AWS (S3, EC2) with Docker',
      'Built responsive frontend interfaces with React, HTML, CSS, JavaScript',
    ],
  },

  {
    icon: Code,
    role: 'Backend Developer',
    company: 'BPF Party App',
    period: '2024',
    description: 'Designed multi-user auth, payments, and media pipelines; optimized for real-time usage.',
    highlights: [
      'Architected role-based multi-user system with secure authentication',
      'Integrated payment gateways and Cloudinary media uploads',
      'Ensured performance and scalability for election-season traffic',
    ],
  },

{
  icon: Code,
  role: 'Frontend Developer Intern (Remote)',
  company: 'Last Minutes Deal',
  period: 'Aug 2025 - Oct 2025',
  description: 'Contributed to a production e-commerce platform using Next.js, improving UI performance and user experience.',
  highlights: [
    'Built responsive product pages and reusable UI components using Next.js and TypeScript',
    'Implemented server-side rendering (SSR) for improved SEO and faster initial load times',
    'Integrated REST APIs for product listings, cart functionality, and user authentication',
    'Optimized performance using image optimization and lazy loading techniques',
  ],
},
]

export default function ExperienceSection() {
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
        { x: '-10vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.experience-card');
      cards?.forEach((card) => {
        gsap.fromTo(
          card,
          { y: '8vh', opacity: 0, rotateX: 10 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: true,
            },
          }
        );

        // Hairline animation
        const line = card.querySelector('.card-line');
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: 'left center',
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'top 65%',
                scrub: true,
              },
            }
          );
        }
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
          Experience
        </h2>

        {/* Experience Cards */}
        <div ref={cardsRef} className="space-y-2">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="experience-card timeline-card"
            >
              <div className="card-line hairline mb-6" />

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-12">
                {/* Left: Role & Company */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <exp.icon className="w-5 h-5 text-gold" />
                    <span className="font-mono text-xs tracking-[0.12em] text-gold uppercase">
                      {exp.period}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-cream mb-1">
                    {exp.role}
                  </h3>
                  <p className="text-mutedCream text-sm">{exp.company}</p>
                </div>

                {/* Right: Description & Highlights */}
                <div>
                  <p className="text-cream/80 mb-4 leading-relaxed">
                    {exp.description}
                  </p>
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-mutedCream"
                      >
                        <span className="w-1 h-1 bg-gold rounded-full mt-2 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
