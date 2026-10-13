import React, { useState, useEffect } from 'react';
import { X, Mail, Check, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '3D Modeling',
    message: '',
  });

  const emailAddress = 'itxmerajkhan3109@gmail.com';

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

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2400);
  };

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
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-xl rounded-3xl bg-[#121214] border border-[#D7E2EA]/20 p-6 sm:p-8 shadow-2xl z-10 text-[#D7E2EA] overflow-hidden"
          >
            {/* Top Close Button */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#BBCCD7]/60 font-medium">
                  Let&apos;s Build Together
                </span>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white mt-0.5">
                  Contact Meraj Khan
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

            {/* Quick Email Pill */}
            <div className="mt-5 p-3.5 rounded-2xl bg-[#181a20] border border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 truncate">
                <Mail className="w-4 h-4 text-[#B600A8] shrink-0" />
                <span className="text-sm font-mono text-[#BBCCD7] truncate">{emailAddress}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={copyEmail}
                  type="button"
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/15 text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <span>Copy</span>
                  )}
                </button>
                <a
                  href={`mailto:${emailAddress}?subject=Project%20Inquiry%20via%20Portfolio`}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#B600A8]/20 hover:bg-[#B600A8]/30 text-white border border-[#B600A8]/40 transition-colors"
                >
                  Email
                </a>
              </div>
            </div>

            {/* Contact Form */}
            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Message Received!</h4>
                <p className="text-sm text-[#BBCCD7]/70 max-w-xs">
                  Thank you for reaching out. Meraj will review your message and reply promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#BBCCD7]/70 mb-1.5">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#181a20] border border-white/10 text-white text-sm focus:outline-none focus:border-[#BBCCD7] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#BBCCD7]/70 mb-1.5">
                      Your Email
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#181a20] border border-white/10 text-white text-sm focus:outline-none focus:border-[#BBCCD7] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#BBCCD7]/70 mb-1.5">
                    Service of Interest
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#181a20] border border-white/10 text-white text-sm focus:outline-none focus:border-[#BBCCD7] transition-colors"
                  >
                    <option value="3D Modeling">01 - 3D Modeling</option>
                    <option value="Rendering">02 - Rendering</option>
                    <option value="Motion Design">03 - Motion Design</option>
                    <option value="Branding">04 - Branding</option>
                    <option value="Web Design">05 - Web Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#BBCCD7]/70 mb-1.5">
                    Project Brief &amp; Vision
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell Meraj about your timeline, scope, and ideas..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#181a20] border border-white/10 text-white text-sm focus:outline-none focus:border-[#BBCCD7] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full py-3.5 rounded-xl text-white font-medium uppercase tracking-widest text-sm flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-[0.99]"
                  style={{
                    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                    boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                    outline: '2px solid #FFFFFF',
                    outlineOffset: '-3px',
                  }}
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
