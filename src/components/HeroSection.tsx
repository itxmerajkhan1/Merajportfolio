import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { ContactButton } from './ContactButton';
import { Magnet } from './Magnet';
import { FadeIn } from './FadeIn';

interface HeroSectionProps {
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative h-screen min-h-[640px] flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none">
      {/* 1. Navbar */}
      <Navbar onContactClick={onContactClick} />

      {/* 2. Hero Heading */}
      <div className="w-full overflow-hidden text-center z-0 px-2 mt-6 sm:mt-4 md:-mt-5">
        <FadeIn delay={0.15} y={40} duration={0.8}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] pointer-events-none">
            Hi, i&apos;m Meraj
          </h1>
        </FadeIn>
      </div>

      {/* 3. Hero Portrait with Magnet Interaction */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 pointer-events-auto top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]">
        <FadeIn delay={0.6} y={30} duration={0.9}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full flex items-center justify-center"
          >
            {imageError ? (
              <div className="w-full aspect-[3/4] rounded-3xl bg-gradient-to-b from-[#20242C] via-[#121418] to-[#0C0C0C] border border-[#BBCCD7]/20 flex flex-col items-center justify-center p-6 text-center shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-radial from-[#7621B0]/20 via-transparent to-transparent pointer-events-none" />
                <div className="w-32 h-32 rounded-full border-2 border-[#BBCCD7]/40 flex items-center justify-center mb-4 bg-[#18011F]/60 shadow-[0_0_30px_rgba(182,0,168,0.3)]">
                  <span className="text-4xl font-black text-[#D7E2EA]">MK</span>
                </div>
                <p className="text-xl font-bold uppercase tracking-widest text-[#D7E2EA]">
                  Meraj Khan
                </p>
                <p className="text-xs uppercase tracking-widest text-[#BBCCD7]/70 mt-1">
                  3D Creator &amp; Developer
                </p>
              </div>
            ) : (
              <img
                src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
                alt="Meraj Khan - 3D Creator Portrait"
                className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] filter brightness-95 contrast-105"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
              />
            )}
          </Magnet>
        </FadeIn>
      </div>

      {/* 4. Bottom Bar */}
      <div className="w-full flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 z-20 relative">
        <FadeIn delay={0.35} y={20} duration={0.7}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a web developer driven by crafting modern, responsive and unforgettable digital experiences
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20} duration={0.7}>
          <ContactButton onClick={onContactClick} />
        </FadeIn>
      </div>
    </section>
  );
};
