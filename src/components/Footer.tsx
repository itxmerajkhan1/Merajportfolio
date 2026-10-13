import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { ContactButton } from './ContactButton';

interface FooterProps {
  onContactClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0C0C0C] text-[#D7E2EA] border-t border-white/10 px-6 md:px-10 py-16 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="hero-heading font-black uppercase text-3xl sm:text-4xl md:text-5xl tracking-tight">
              Meraj Khan
            </h2>
            <p className="text-xs sm:text-sm font-light uppercase tracking-widest text-[#BBCCD7]/60 mt-2">
              3D Creator &bull; Web Developer &bull; Digital Experiences
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="mailto:itxmerajkhan3109@gmail.com"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#BBCCD7] hover:text-white transition-colors py-2 px-3 rounded-lg bg-white/5 border border-white/10"
            >
              <Mail className="w-3.5 h-3.5 text-[#B600A8]" />
              <span>itxmerajkhan3109@gmail.com</span>
            </a>
            <ContactButton onClick={onContactClick} label="Get In Touch" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/5 text-xs text-[#BBCCD7]/60 gap-4">
          <nav aria-label="Footer Navigation" className="flex items-center gap-6 uppercase tracking-wider font-medium">
            <button
              onClick={() => scrollTo('about')}
              type="button"
              className="hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollTo('services')}
              type="button"
              className="hover:text-white transition-colors cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => scrollTo('projects')}
              type="button"
              className="hover:text-white transition-colors cursor-pointer"
            >
              Projects
            </button>
            <button
              onClick={onContactClick}
              type="button"
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <span>&copy; {new Date().getFullYear()} Meraj Khan. All rights reserved.</span>
            <button
              onClick={scrollToTop}
              type="button"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
