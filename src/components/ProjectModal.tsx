import React, { useEffect } from 'react';
import { X, ExternalLink, Layers, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectData } from './ProjectsSection';

interface ProjectModalProps {
  project: ProjectData | null;
  activeImage: { src: string; title: string } | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  activeImage,
  onClose,
  onOpenContact,
}) => {
  const isOpen = Boolean(project || activeImage);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#101114] border border-[#D7E2EA]/30 p-6 sm:p-8 shadow-2xl z-10 text-[#D7E2EA]"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-[#BBCCD7] font-medium border border-white/10">
                  {project?.category || 'Showcase'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                  {project?.title || activeImage?.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Gallery / Single Image */}
            <div className="mt-6 flex flex-col gap-4">
              {activeImage ? (
                <div className="w-full rounded-2xl overflow-hidden bg-black/50 border border-white/10 max-h-[60vh] flex items-center justify-center">
                  <img
                    src={activeImage.src}
                    alt={activeImage.title}
                    className="w-full h-auto max-h-[60vh] object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : project ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl overflow-hidden bg-black/40 border border-white/10">
                    <img
                      src={project.col2Image}
                      alt={`${project.title} Hero`}
                      className="w-full h-full object-cover max-h-[360px]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="rounded-2xl overflow-hidden bg-black/40 border border-white/10 h-[170px]">
                      <img
                        src={project.col1Image1}
                        alt={`${project.title} Render 1`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden bg-black/40 border border-white/10 h-[170px]">
                      <img
                        src={project.col1Image2}
                        alt={`${project.title} Render 2`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Project Details if project object is available */}
              {project && (
                <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-[#D7E2EA]/80 leading-relaxed max-w-xl">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      <Layers className="w-4 h-4 text-[#BBCCD7]/60" />
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="text-xs uppercase tracking-wider text-[#BBCCD7] px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenContact();
                      }}
                      className="px-6 py-2.5 rounded-full text-xs font-medium uppercase tracking-widest bg-white text-black hover:bg-white/90 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#B600A8]" />
                      <span>Inquire Project</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
