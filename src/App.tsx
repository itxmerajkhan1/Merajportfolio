import { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection, ProjectData } from './components/ProjectsSection';
import { ContactSheetSection } from './components/ContactSheetSection';
import { ContactModal } from './components/ContactModal';
import { ProjectModal } from './components/ProjectModal';
import { Footer } from './components/Footer';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);

  const handleOpenContact = () => setIsContactOpen(true);
  const handleCloseContact = () => setIsContactOpen(false);

  const handleSelectProject = (project: ProjectData) => {
    setSelectedProject(project);
    setSelectedImage(null);
  };

  const handleSelectImage = (src: string, title: string) => {
    setSelectedImage({ src, title });
    setSelectedProject(null);
  };

  const handleCloseProjectModal = () => {
    setSelectedProject(null);
    setSelectedImage(null);
  };

  return (
    <div className="w-full min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-['Kanit',sans-serif] overflow-x-clip selection:bg-[#B600A8]/30 selection:text-white">
      {/* 1. Hero Section */}
      <HeroSection onContactClick={handleOpenContact} />

      {/* 2. Marquee Section */}
      <MarqueeSection />

      {/* 3. About Section */}
      <AboutSection onContactClick={handleOpenContact} />

      {/* 4. Services Section */}
      <ServicesSection />

      {/* 5. Projects Section */}
      <ProjectsSection
        onSelectProject={handleSelectProject}
        onSelectImage={handleSelectImage}
      />

      {/* 6. Contact Sheet Section (React Bits Pro ContactSheet Component) */}
      <ContactSheetSection
        onSelectImage={handleSelectImage}
        onOpenContact={handleOpenContact}
      />

      {/* Footer */}
      <Footer onContactClick={handleOpenContact} />

      {/* Interactive Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />

      {/* Interactive Project / Lightbox Modal */}
      <ProjectModal
        project={selectedProject}
        activeImage={selectedImage}
        onClose={handleCloseProjectModal}
        onOpenContact={handleOpenContact}
      />
    </div>
  );
}
