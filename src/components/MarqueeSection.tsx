import React, { useEffect, useRef, useState, useCallback } from 'react';

const ROW1_IMAGES = [
  { url: 'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif', title: 'Space Voyage 3D', tag: 'WebGL' },
  { url: 'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif', title: 'CodeNest Interactive', tag: '3D UI' },
  { url: 'https://motionsites.ai/assets/hero-finlytic-preview-CV9g0FHP.gif', title: 'Finlytic Glass', tag: 'Motion' },
  { url: 'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif', title: 'Wealth OS', tag: 'Render' },
  { url: 'https://plugin-assets.open-design.ai/plugins/ai-designer-portfolio/hero-space-voyage-preview-eECLH3Yc-475920.gif', title: 'Cosmic Journey', tag: 'Animation' },
  { url: 'https://plugin-assets.open-design.ai/plugins/ai-designer-portfolio/hero-portfolio-cosmic-preview-BpvWJ3Nc-89ab29.gif', title: 'Cosmic Portfolio', tag: '3D Art' },
  { url: 'https://plugin-assets.open-design.ai/plugins/liquid-glass-agency/hero-finlytic-preview-CV9g0FHP-9d3cb6.gif', title: 'Liquid Glass', tag: 'Shaders' },
  { url: 'https://plugin-assets.open-design.ai/plugins/liquid-glass-agency/hero-wealth-preview-B70idl_u-7969db.gif', title: 'Aura Motion', tag: 'Cinema 4D' },
  { url: 'https://plugin-assets.open-design.ai/plugins/ai-designer-portfolio/hero-velorah-preview-Df8s2Ka-189423.gif', title: 'Velorah Experience', tag: 'Brand' },
  { url: 'https://motionsites.ai/assets/hero-zenith-preview-k92Js9L.gif', title: 'Zenith Studio', tag: 'Visuals' },
  { url: 'https://motionsites.ai/assets/hero-nexus-preview-X84mLp2.gif', title: 'Nexus Cyber', tag: 'Blender' },
];

const ROW2_IMAGES = [
  { url: 'https://motionsites.ai/assets/hero-orbis-preview-m89Kls2.gif', title: 'Orbis Spatial', tag: 'VR/AR' },
  { url: 'https://motionsites.ai/assets/hero-cyberpunk-preview-P29kL4.gif', title: 'Neo Shinjuku', tag: '3D Scene' },
  { url: 'https://motionsites.ai/assets/hero-aura-preview-Z84nKx1.gif', title: 'Aura Lightform', tag: 'Octane' },
  { url: 'https://motionsites.ai/assets/hero-hyper-preview-Q91kLm4.gif', title: 'Hyper Drive', tag: 'Motion' },
  { url: 'https://motionsites.ai/assets/hero-vortex-preview-K39sL1.gif', title: 'Vortex Particle', tag: 'Houdini' },
  { url: 'https://motionsites.ai/assets/hero-solaris-preview-M72pL9.gif', title: 'Solaris Raytrace', tag: 'Raytrace' },
  { url: 'https://motionsites.ai/assets/hero-pulse-preview-V83nK2.gif', title: 'Pulse Rhythm', tag: 'Abstract' },
  { url: 'https://motionsites.ai/assets/hero-prism-preview-B92mL7.gif', title: 'Prism Refraction', tag: 'Physics' },
  { url: 'https://motionsites.ai/assets/hero-glitch-preview-W19sK3.gif', title: 'Glitch Horizon', tag: 'Style' },
  { url: 'https://motionsites.ai/assets/hero-chrono-preview-Y74pL5.gif', title: 'Chrono Shift', tag: 'Keyframe' },
];

const ImageTile: React.FC<{ item: { url: string; title: string; tag: string }; index: number }> = ({ item, index }) => {
  const [hasError, setHasError] = useState(false);

  // Fallback gradient schemes
  const gradients = [
    'from-[#121824] via-[#1a233a] to-[#0d1117]',
    'from-[#1c1224] via-[#2d1b3b] to-[#120a17]',
    'from-[#1a1f16] via-[#24301e] to-[#0f140d]',
    'from-[#241c12] via-[#362719] to-[#140e0a]',
    'from-[#1f2024] via-[#2b2d34] to-[#121316]',
  ];
  const bgGrad = gradients[index % gradients.length];

  return (
    <div
      className="relative shrink-0 w-[420px] h-[270px] rounded-2xl overflow-hidden bg-[#141416] border border-white/5 shadow-xl select-none group"
      style={{ width: '420px', height: '270px' }}
    >
      {!hasError ? (
        <img
          src={item.url}
          alt={item.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="w-[420px] h-[270px] object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${bgGrad} p-6 flex flex-col justify-between border border-white/10 relative overflow-hidden`}>
          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between z-10">
            <span className="text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-[#BBCCD7] border border-white/10">
              {item.tag}
            </span>
            <span className="text-xs text-white/40 font-mono">0{((index % 11) + 1).toString().padStart(2, '0')}</span>
          </div>
          <div className="z-10">
            <h4 className="text-xl font-bold uppercase tracking-tight text-white mb-1">
              {item.title}
            </h4>
            <p className="text-xs text-white/60 tracking-wider uppercase">
              3D Motion Reel &bull; Meraj Khan
            </p>
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-4">
        <span className="text-xs uppercase font-medium tracking-wider text-white/90">
          {item.title}
        </span>
      </div>
    </div>
  );
};

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const calculatedOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
    setScrollOffset(calculatedOffset);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Triple Row 1 (first 11 images)
  const tripledRow1 = [...ROW1_IMAGES, ...ROW1_IMAGES, ...ROW1_IMAGES];
  // Triple Row 2 (remaining 10 images)
  const tripledRow2 = [...ROW2_IMAGES, ...ROW2_IMAGES, ...ROW2_IMAGES];

  const row1Translate = scrollOffset - 200;
  const row2Translate = -(scrollOffset - 200);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden relative"
      aria-label="3D Work Marquee"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1: Moves RIGHT on scroll (translateX(offset - 200)) */}
        <div
          className="flex gap-3 will-change-transform"
          style={{
            transform: `translate3d(${row1Translate}px, 0, 0)`,
            willChange: 'transform',
          }}
        >
          {tripledRow1.map((item, index) => (
            <ImageTile key={`row1-${index}`} item={item} index={index} />
          ))}
        </div>

        {/* Row 2: Moves LEFT on scroll (translateX(-(offset - 200))) */}
        <div
          className="flex gap-3 will-change-transform"
          style={{
            transform: `translate3d(${row2Translate}px, 0, 0)`,
            willChange: 'transform',
          }}
        >
          {tripledRow2.map((item, index) => (
            <ImageTile key={`row2-${index}`} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
