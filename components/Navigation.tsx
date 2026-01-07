
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Home, Star, LucideIcon, BrainCircuit, GraduationCap, FlaskConical, Eye, Ghost
} from 'lucide-react';

interface NavLink {
  id: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
}

const NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'Home', icon: Home, active: true },
  { id: 'sorting', label: 'Sorting Ceremony', icon: GraduationCap, active: true },
  { id: 'potions', label: 'Potions Master', icon: FlaskConical, active: true },
  { id: 'mirror', label: 'Mirror of Erised', icon: Eye, active: true },
  { id: 'office', label: "Headmaster's Office", icon: Ghost, active: true },
  { id: 'trivia', label: 'Magic Trivia', icon: BrainCircuit, active: true }
];

const Navigation: React.FC<{ onNavigate: (id: string) => void, activeId: string }> = ({ onNavigate, activeId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (id: string, active: boolean) => {
    if (!active) return;
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <>
      <div className="fixed top-6 left-6 z-[1000]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-white/80 backdrop-blur-md rounded-full shadow-[0_4px_15px_rgba(180,120,0,0.15)] border border-amber-100 text-amber-600 hover:text-amber-500 transition-colors"
          aria-label="Open Navigation"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-amber-950/20 backdrop-blur-sm z-[990]"
            />

            {/* Side Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[300px] bg-gradient-to-br from-[#fffdfa] via-[#fefcf7] to-amber-50/30 z-[1001] shadow-[10px_0_40px_rgba(0,0,0,0.1)] border-r border-amber-100 flex flex-col"
            >
              {/* Header Container */}
              <div className="pt-16 pb-8 px-8 flex flex-col items-center flex-shrink-0 bg-white/40 backdrop-blur-sm border-b border-amber-100/50">
                <div className="p-4 bg-amber-100/50 rounded-full text-amber-500 mb-4 shadow-inner">
                  <Star size={32} fill="currentColor" className="animate-pulse" />
                </div>
                <h2 className="font-magic text-2xl text-amber-600">Magical Menu</h2>
                <div className="h-[1px] w-24 bg-amber-200 mt-4" />
              </div>

              {/* Scrollable Navigation Area */}
              <nav className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-3">
                {NAV_LINKS.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeId === link.id;
                  return (
                    <motion.div
                      key={link.id}
                      whileHover={link.active ? { x: 8 } : {}}
                      whileTap={link.active ? { scale: 0.98 } : {}}
                    >
                      <button
                        onClick={() => handleNavClick(link.id, link.active)}
                        className={`w-full flex items-center gap-4 p-3.5 rounded-2xl transition-all ${
                          link.active && isActive
                            ? 'bg-amber-400 text-white shadow-lg shadow-amber-200' 
                            : link.active
                            ? 'text-amber-900/80 hover:bg-amber-100/30 hover:text-amber-900'
                            : 'text-amber-900/30 cursor-not-allowed'
                        }`}
                      >
                        <span className={link.active && isActive ? 'text-white' : 'text-amber-500/70'}>
                          <Icon size={20} />
                        </span>
                        <span className="font-title text-[13px] tracking-wide uppercase">
                          {link.label}
                        </span>
                      </button>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Footer Container */}
              <div className="mt-auto p-8 border-t border-amber-100 bg-white/40 backdrop-blur-sm text-center flex-shrink-0">
                <p className="font-script text-lg text-amber-800/40">"Always..."</p>
                <div className="text-[10px] uppercase tracking-[0.3em] text-amber-800/20 mt-2 font-bold">
                  Sneha's 20th Birthday • 2026
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(251, 191, 36, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </>
  );
};

export default Navigation;
