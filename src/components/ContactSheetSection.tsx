import React, { useState, useRef } from 'react';
import { Play, Pause, FastForward, Rewind, Eye, Aperture, Film, Layers, Sparkles } from 'lucide-react';
import { ContactSheet, ContactSheetRef, ContactSheetImage } from './ui/contact-sheet';
import { FadeIn } from './FadeIn';

interface ContactSheetSectionProps {
  onSelectImage: (src: string, title: string) => void;
  onOpenContact: () => void;
}

// Visual style definitions
type VisualStyleId = 'darkroom' | 'contact-sheet' | 'floating' | 'gallery';

interface VisualStyleConfig {
  id: VisualStyleId;
  label: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  speed: number;
  rush: number;
  spiral: number;
  develop: boolean;
  blankArea: number;
  count: number;
  size: number;
  rim: number;
  border: number;
  borderColor: string;
  roll: number;
}

const VISUAL_STYLES: VisualStyleConfig[] = [
  {
    id: 'darkroom',
    label: 'Darkroom Reveal',
    subtitle: 'Photographs emerge from darkness, developing latent tones and silver highlights',
    icon: Aperture,
    speed: 0.09,
    rush: 0.42,
    spiral: 0.12,
    develop: true,
    blankArea: 0.28,
    count: 20,
    size: 155,
    rim: 14,
    border: 4,
    borderColor: '#ffffff',
    roll: 0.15,
  },
  {
    id: 'contact-sheet',
    label: 'Film Contact Sheet',
    subtitle: 'Traditional 35mm & 120 medium format proof frames with indexed edge borders',
    icon: Film,
    speed: 0.05,
    rush: 0.18,
    spiral: 0.0,
    develop: false,
    blankArea: 0.22,
    count: 24,
    size: 135,
    rim: 9,
    border: 5,
    borderColor: '#f2f2f4',
    roll: 0.05,
  },
  {
    id: 'floating',
    label: 'Floating Prints',
    subtitle: 'Prints drifting organically on fluid currents with layered depth and gentle tilts',
    icon: Layers,
    speed: 0.13,
    rush: 0.52,
    spiral: 0.28,
    develop: true,
    blankArea: 0.32,
    count: 22,
    size: 165,
    rim: 16,
    border: 4,
    borderColor: '#ffffff',
    roll: 0.32,
  },
  {
    id: 'gallery',
    label: 'Gallery Showcase',
    subtitle: 'Calm, architectural photo stream tuned for high-resolution visual contemplation',
    icon: Sparkles,
    speed: 0.045,
    rush: 0.22,
    spiral: -0.06,
    develop: true,
    blankArea: 0.24,
    count: 16,
    size: 180,
    rim: 12,
    border: 5,
    borderColor: '#ffffff',
    roll: 0.08,
  },
];

// Curated frames using existing portfolio artwork and 3D renders
const PORTFOLIO_FRAMES: ContactSheetImage[] = [
  {
    src: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    title: 'Nextlevel Studio - Cyber Figure 01',
    caption: 'Character modeling, lighting passes, and subsurface skin shaders in Blender.',
    aspect: 1.33,
  },
  {
    src: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    title: 'Nextlevel Studio - Optical Rig 02',
    caption: 'Volumetric studio rim lighting and hard-surface robotic articulation.',
    aspect: 1.25,
  },
  {
    src: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    title: 'Nextlevel Studio - Hero Panorama',
    caption: 'Full-resolution hero render with chromatic aberration and depth blur.',
    aspect: 1.5,
  },
  {
    src: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    title: 'Aura Brand - Luminescent Mesh',
    caption: 'Octane spectral dispersion with thin-film optical interference physics.',
    aspect: 1.33,
  },
  {
    src: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    title: 'Aura Brand - Prismatic Geometry',
    caption: 'Refractive crystal structures with procedural glass absorption coefficients.',
    aspect: 1.33,
  },
  {
    src: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    title: 'Aura Brand - Fluid Caustics',
    caption: 'High-density photon caustics rendered via GPU path-tracing algorithms.',
    aspect: 1.4,
  },
  {
    src: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    title: 'Solaris Digital - Architectural Space',
    caption: 'Brutalist concrete architecture integrated with ambient light panels.',
    aspect: 1.33,
  },
  {
    src: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    title: 'Solaris Digital - Kinetic Lighting',
    caption: 'Interactive real-time lighting cues programmed with GLSL shaders.',
    aspect: 1.25,
  },
  {
    src: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    title: 'Solaris Digital - Main Stage',
    caption: 'Cinematic scale stage lighting configuration rendered at 8K.',
    aspect: 1.5,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
    title: 'Celestial Artifact - Lunar Core',
    caption: 'Stylized 3D celestial icon featuring metallic crater topology.',
    aspect: 1.0,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
    title: 'Sculptural Specimen - P59 Form',
    caption: 'Surreal organic sculpture exploring elastic displacement textures.',
    aspect: 1.0,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
    title: 'Modular Artifact - High-Gloss Block',
    caption: 'Plastic material simulation with microscopic scratches and bevel beveling.',
    aspect: 1.0,
  },
];

export const ContactSheetSection: React.FC<ContactSheetSectionProps> = ({
  onSelectImage,
  onOpenContact,
}) => {
  const contactSheetRef = useRef<ContactSheetRef>(null);
  const [currentStyle, setCurrentStyle] = useState<VisualStyleConfig>(VISUAL_STYLES[0]);
  const [isPaused, setIsPaused] = useState(false);

  const handleOpenPhoto = (index: number) => {
    const frame = PORTFOLIO_FRAMES[index % PORTFOLIO_FRAMES.length];
    onSelectImage(frame.src, frame.title || `Frame ${(index + 1).toString().padStart(2, '0')}`);
  };

  return (
    <section
      id="contact-sheet"
      className="bg-[#0C0C0C] text-[#D7E2EA] pt-24 sm:pt-32 md:pt-40 pb-28 relative z-20 overflow-hidden border-t border-white/5"
      aria-label="Selected Frames Contact Sheet"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <FadeIn delay={0} y={30} duration={0.8}>
            <span className="text-xs uppercase tracking-widest text-[#BBCCD7]/60 font-medium">
              Contact Sheet Experience &bull; Visual Archives
            </span>
          </FadeIn>

          <FadeIn delay={0.1} y={35} duration={0.8} className="mt-3">
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 8.5vw, 120px)' }}
            >
              Selected Frames
            </h2>
          </FadeIn>

          <FadeIn delay={0.2} y={20} duration={0.7} className="mt-4 sm:mt-5">
            <p className="text-sm sm:text-base md:text-lg font-light text-[#BBCCD7]/80 tracking-wide">
              Fragments of creativity, captured and brought to life.
            </p>
          </FadeIn>

          {/* Visual Style Switcher Tabs */}
          <FadeIn delay={0.3} y={20} duration={0.7} className="mt-8 flex justify-center">
            <div
              role="tablist"
              aria-label="Visual Style Presets"
              className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#14151a] border border-white/10 flex-wrap justify-center shadow-lg"
            >
              {VISUAL_STYLES.map((style) => {
                const Icon = style.icon;
                const isActive = currentStyle.id === style.id;
                return (
                  <button
                    key={style.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setCurrentStyle(style)}
                    className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-white/15 to-white/10 text-white border border-white/20 shadow-sm'
                        : 'text-[#BBCCD7]/60 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#BBCCD7]' : 'text-white/40'}`} />
                    <span>{style.label}</span>
                  </button>
                );
              })}
            </div>
          </FadeIn>

          <p className="text-xs text-[#BBCCD7]/50 mt-3 font-mono">
            {currentStyle.subtitle}
          </p>
        </div>

        {/* Cinematic Contact Sheet Canvas Viewport */}
        <FadeIn delay={0.35} y={40} duration={0.9}>
          <div className="relative w-full h-[520px] sm:h-[620px] md:h-[720px] rounded-3xl overflow-hidden border border-white/10 bg-[#0C0C0C] shadow-2xl group">
            {/* Ambient Vignette & Darkroom Glow */}
            <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#0C0C0C]/80 pointer-events-none z-10" />

            {/* Core React Bits Pro Contact Sheet Component */}
            <ContactSheet
              ref={contactSheetRef}
              images={PORTFOLIO_FRAMES}
              count={currentStyle.count}
              speed={currentStyle.speed}
              rush={currentStyle.rush}
              spiral={currentStyle.spiral}
              blankArea={currentStyle.blankArea}
              size={currentStyle.size}
              aspect={1.33}
              radius={8}
              border={currentStyle.border}
              borderColor={currentStyle.borderColor}
              rim={currentStyle.rim}
              roll={currentStyle.roll}
              develop={currentStyle.develop}
              shadow={true}
              edgeFade={true}
              backgroundColor="#0C0C0C"
              paused={isPaused}
              onOpen={handleOpenPhoto}
              className="w-full h-full"
            >
              {/* Central Focal Content inside blankArea */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 max-w-xs shadow-2xl select-none">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#18011F] via-[#B600A8]/60 to-[#7621B0] flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(182,0,168,0.4)]">
                  <Aperture className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-tight text-white leading-tight">
                  Meraj Khan
                </h3>
                <p className="text-[11px] uppercase tracking-widest text-[#BBCCD7]/60 mt-1">
                  Darkroom Stream &bull; 35mm Proofs
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => contactSheetRef.current?.boost(0.25)}
                    type="button"
                    className="px-3 py-1 rounded-lg text-[10px] uppercase font-semibold tracking-wider bg-white/10 hover:bg-white/15 text-white transition-colors cursor-pointer"
                  >
                    Boost Stream
                  </button>
                  <button
                    onClick={onOpenContact}
                    type="button"
                    className="px-3 py-1 rounded-lg text-[10px] uppercase font-semibold tracking-wider bg-[#B600A8]/30 hover:bg-[#B600A8]/40 border border-[#B600A8]/40 text-white transition-colors cursor-pointer"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </ContactSheet>

            {/* Bottom Floating Control Bar */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 p-2 rounded-2xl bg-[#14151a]/90 backdrop-blur-md border border-white/15 shadow-2xl">
              <button
                onClick={() => contactSheetRef.current?.boost(-0.25)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Reverse photo stream"
                title="Rewind stream"
              >
                <Rewind className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPaused(!isPaused)}
                className="px-3.5 h-9 rounded-xl flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white bg-white/10 hover:bg-white/15 transition-colors cursor-pointer"
                aria-label={isPaused ? 'Resume photo stream' : 'Pause photo stream'}
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isPaused ? 'Resume' : 'Pause'}</span>
              </button>

              <button
                onClick={() => contactSheetRef.current?.boost(0.25)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Accelerate photo stream"
                title="Accelerate stream"
              >
                <FastForward className="w-4 h-4" />
              </button>

              <div className="h-4 w-px bg-white/15 mx-1" />

              <span className="text-[11px] font-mono text-[#BBCCD7]/60 px-2 hidden md:inline">
                Scroll / Drag to fly &bull; Click to inspect
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Curated Film Strip Proof Gallery (Style 2 & 4 complementary showcase) */}
        <div className="mt-16 sm:mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#BBCCD7]/60 font-mono">
                ROLL #024 &bull; EXPOSURE MANIFEST
              </span>
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mt-1">
                Individual Proof Plates
              </h3>
            </div>
            <p className="text-xs text-[#BBCCD7]/60 font-light max-w-sm">
              Each frame is developed directly from production 3D scenes, lighting passes, and procedural shaders.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {PORTFOLIO_FRAMES.slice(0, 8).map((frame, index) => (
              <div
                key={index}
                onClick={() => onSelectImage(frame.src, frame.title || `Frame 0${index + 1}`)}
                className="group relative rounded-2xl bg-[#14151a] border border-white/10 p-3 sm:p-4 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-white/30 hover:scale-[1.02] shadow-lg"
              >
                {/* Film Edge Index */}
                <div className="flex items-center justify-between text-[10px] font-mono text-[#BBCCD7]/50 mb-2 uppercase tracking-widest">
                  <span>FRAME {((index + 1).toString().padStart(2, '0'))}A</span>
                  <span>35MM PBR</span>
                </div>

                {/* Photo Preview */}
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-black/40 border border-white/5">
                  <img
                    src={frame.src}
                    alt={frame.title || `Frame ${index + 1}`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                {/* Caption */}
                <div className="mt-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-white truncate">
                    {frame.title}
                  </h4>
                  <p className="text-[11px] text-[#BBCCD7]/60 line-clamp-1 mt-0.5 font-light">
                    {frame.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
