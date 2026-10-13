import React, { useState } from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  const [moonError, setMoonError] = useState(false);
  const [p59Error, setP59Error] = useState(false);
  const [legoError, setLegoError] = useState(false);
  const [groupError, setGroupError] = useState(false);

  const aboutText = "Hi, I'm Meraj Khan, a web developer passionate about building modern, responsive, and user-friendly digital experiences. I work with HTML, CSS, JavaScript, Tailwind CSS, React, TypeScript, and Firebase to create websites that combine clean design with practical functionality. I enjoy turning ideas into real projects, exploring new technologies, and continuously improving my development skills. My goal is to build digital experiences that look great, work smoothly, and make a lasting impression. Let's build something incredible together!";

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
    >
      {/* Decorative 3D Image 1: Top-Left (Moon Icon) */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none z-10">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          {!moonError ? (
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
              alt="Decorative 3D Moon"
              className="w-full h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
              referrerPolicy="no-referrer"
              onError={() => setMoonError(true)}
            />
          ) : (
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-[#646973]/30 to-[#BBCCD7]/40 blur-[1px] border border-white/10" />
          )}
        </FadeIn>
      </div>

      {/* Decorative 3D Image 2: Bottom-Left (3D object p59_1) */}
      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px] pointer-events-none z-10">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          {!p59Error ? (
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
              alt="Decorative 3D Object"
              className="w-full h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
              referrerPolicy="no-referrer"
              onError={() => setP59Error(true)}
            />
          ) : (
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-[#7621B0]/20 to-[#B600A8]/30 border border-purple-500/20" />
          )}
        </FadeIn>
      </div>

      {/* Decorative 3D Image 3: Top-Right (Lego Icon) */}
      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none z-10">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          {!legoError ? (
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
              alt="Decorative 3D Lego"
              className="w-full h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
              referrerPolicy="no-referrer"
              onError={() => setLegoError(true)}
            />
          ) : (
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-[#BBCCD7]/30 to-[#646973]/20 border border-white/10" />
          )}
        </FadeIn>
      </div>

      {/* Decorative 3D Image 4: Bottom-Right (3D Group 134) */}
      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px] pointer-events-none z-10">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          {!groupError ? (
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
              alt="Decorative 3D Group"
              className="w-full h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
              referrerPolicy="no-referrer"
              onError={() => setGroupError(true)}
            />
          ) : (
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-bl from-[#BE4C00]/20 to-[#7621B0]/30 border border-orange-500/20" />
          )}
        </FadeIn>
      </div>

      {/* Main Content Column */}
      <div className="relative z-20 flex flex-col items-center max-w-4xl text-center">
        {/* Heading: "About me" */}
        <FadeIn delay={0} y={40} duration={0.8}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Gap between heading/text: gap-10 sm:gap-14 md:gap-16 */}
        <div className="h-10 sm:h-14 md:h-16" />

        {/* Animated paragraph */}
        <AnimatedText
          text={aboutText}
          className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' } as React.CSSProperties}
        />

        {/* Gap between text block and button: gap-16 sm:gap-20 md:gap-24 */}
        <div className="h-16 sm:h-20 md:h-24" />

        {/* Contact button */}
        <FadeIn delay={0.2} y={20} duration={0.7}>
          <ContactButton onClick={onContactClick} />
        </FadeIn>
      </div>
    </section>
  );
};
