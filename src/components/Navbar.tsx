import React from 'react';
import { FadeIn } from './FadeIn';

interface NavbarProps {
  onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <FadeIn delay={0} y={-20} duration={0.6}>
      <header className="w-full px-6 md:px-10 pt-6 md:pt-8">
        <nav
          aria-label="Primary Navigation"
          className="w-full flex items-center justify-between text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]"
        >
          <button
            onClick={() => scrollTo('about')}
            type="button"
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D7E2EA] rounded"
          >
            About
          </button>
          <button
            onClick={() => scrollTo('services')}
            type="button"
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D7E2EA] rounded"
          >
            Price
          </button>
          <button
            onClick={() => scrollTo('projects')}
            type="button"
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D7E2EA] rounded"
          >
            Projects
          </button>
          <button
            onClick={onContactClick}
            type="button"
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D7E2EA] rounded"
          >
            Contact
          </button>
        </nav>
      </header>
    </FadeIn>
  );
};
