import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';

export interface ProjectData {
  id: string;
  number: string;
  title: string;
  category: 'Client' | 'Personal';
  description: string;
  tools: string[];
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
  liveUrl?: string;
}

const PROJECTS: ProjectData[] = [
  {
    id: 'nextlevel-studio',
    number: '01',
    title: 'Nextlevel Studio',
    category: 'Client',
    description: 'A cutting-edge 3D interactive web showcase built for Nextlevel Studio featuring photorealistic character modeling and WebGL interactions.',
    tools: ['Blender', 'Cinema 4D', 'Three.js', 'React'],
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
  {
    id: 'aura-brand-identity',
    number: '02',
    title: 'Aura Brand Identity',
    category: 'Personal',
    description: 'Atmospheric visual identity exploration examining luminous refraction, caustic lightforms, and organic material physics.',
    tools: ['Octane Render', 'Houdini', 'After Effects', 'Tailwind'],
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    id: 'solaris-digital',
    number: '03',
    title: 'Solaris Digital',
    category: 'Client',
    description: 'High-energy motion design and 3D architectural renders engineered for Solaris Digital marketing campaigns and experiential spaces.',
    tools: ['Unreal Engine 5', 'Blender', 'TypeScript', 'Framer Motion'],
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  onSelectProject: (p: ProjectData) => void;
  onSelectImage: (src: string, title: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  onSelectProject,
  onSelectImage,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [img1Error, setImg1Error] = useState(false);
  const [img2Error, setImg2Error] = useState(false);
  const [img3Error, setImg3Error] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] relative flex items-start justify-center"
      style={{
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{
          scale,
          top: `calc(5rem + ${index * 28}px)`,
        }}
        className="sticky w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-2xl transition-shadow duration-300"
      >
        {/* Top Row: Number, category label, project name, Live Project button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-6 md:pb-8 border-b border-[#D7E2EA]/20 gap-4">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            {/* Number: huge, same style as services */}
            <span
              className="font-black text-[#D7E2EA] leading-none shrink-0 tabular-nums"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
            >
              {project.number}
            </span>

            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-medium uppercase tracking-widest text-[#BBCCD7]/60">
                {project.category}
              </span>
              <h3
                className="font-medium uppercase text-[#D7E2EA] leading-tight"
                style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2.2rem)' }}
              >
                {project.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LiveProjectButton
              onClick={() => onSelectProject(project)}
              label="Live Project"
            />
          </div>
        </div>

        {/* Bottom Row: Two-column image grid (Left 40% stacked, Right 60% tall) */}
        <div className="pt-4 sm:pt-6 md:pt-8 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
          {/* Left Column (40% width / 5 cols) has 2 stacked images */}
          <div className="md:col-span-5 flex flex-col gap-4 sm:gap-6">
            {/* Left Top Image */}
            <div
              onClick={() => onSelectImage(project.col1Image1, `${project.title} - Render 01`)}
              className="relative w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#16181C] border border-white/5 cursor-pointer group"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            >
              {!img1Error ? (
                <img
                  src={project.col1Image1}
                  alt={`${project.title} Render 1`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={() => setImg1Error(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-tr from-[#1a1c22] to-[#252a36]">
                  <span className="text-xs uppercase tracking-widest text-[#BBCCD7]/70 font-semibold">
                    {project.title} &bull; 01
                  </span>
                  <span className="text-[11px] text-white/40 mt-1">High-Res Render</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Left Bottom Image */}
            <div
              onClick={() => onSelectImage(project.col1Image2, `${project.title} - Render 02`)}
              className="relative w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#16181C] border border-white/5 cursor-pointer group"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            >
              {!img2Error ? (
                <img
                  src={project.col1Image2}
                  alt={`${project.title} Render 2`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={() => setImg2Error(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#1c1824] to-[#281d38]">
                  <span className="text-xs uppercase tracking-widest text-[#BBCCD7]/70 font-semibold">
                    {project.title} &bull; 02
                  </span>
                  <span className="text-[11px] text-white/40 mt-1">Lighting Breakdown</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>
          </div>

          {/* Right Column (60% width / 7 cols) has 1 tall image */}
          <div className="md:col-span-7">
            <div
              onClick={() => onSelectImage(project.col2Image, `${project.title} - Hero Showcase`)}
              className="relative w-full h-[300px] sm:h-[380px] md:h-full min-h-[300px] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#16181C] border border-white/5 cursor-pointer group"
            >
              {!img3Error ? (
                <img
                  src={project.col2Image}
                  alt={`${project.title} Showcase`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={() => setImg3Error(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-tr from-[#121824] via-[#1e273a] to-[#0c0c0c]">
                  <span className="text-sm uppercase tracking-widest text-[#BBCCD7] font-bold">
                    {project.title} Showcase
                  </span>
                  <p className="text-xs text-white/50 mt-2 max-w-xs text-center">
                    {project.description}
                  </p>
                </div>
              )}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ProjectsSectionProps {
  onSelectProject: (p: ProjectData) => void;
  onSelectImage: (src: string, title: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
  onSelectImage,
}) => {
  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-32"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading: "Project" (singular) using .hero-heading gradient */}
        <FadeIn delay={0} y={40} duration={0.8} className="text-center mb-16 sm:mb-20 md:mb-28">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight inline-block"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Project
          </h2>
        </FadeIn>

        {/* 3 sticky-stacking project cards */}
        <div className="relative">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              totalCards={PROJECTS.length}
              onSelectProject={onSelectProject}
              onSelectImage={onSelectImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
