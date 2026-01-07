
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles as SparklesIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { TWENTY_LETTERS } from '../constants';

const EnchantedEnvelope: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  // Prevent background scrolling when letter is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleStartOpening = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);
    
    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      setCurrentPage(0);
    }, 1200);
  };

  const closeLetter = () => {
    setIsOpen(false);
  };

  const nextPage = () => {
    if (currentPage < TWENTY_LETTERS.length - 1) {
      setDirection(1);
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(prev => prev - 1);
    }
  };

  const pageVariants = {
    initial: (direction: number) => ({
      rotateY: direction > 0 ? 110 : -110,
      opacity: 0,
      transformOrigin: direction > 0 ? "left center" : "right center",
    }),
    animate: {
      rotateY: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -110 : 110,
      opacity: 0,
      transformOrigin: direction > 0 ? "right center" : "left center",
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

  return (
    <div className={`flex flex-col items-center justify-center py-24 px-6 min-h-[500px] relative transition-all duration-300 ${isOpen ? 'z-[1500]' : 'z-20'}`}>
      
      {/* Closed/Opening Envelope View */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative cursor-pointer w-full max-w-xs flex flex-col items-center perspective-[1200px]"
        onClick={handleStartOpening}
      >
        <div className="relative group preserve-3d">
          <motion.div 
            animate={{ 
              scale: isOpening ? [1, 1.5, 2] : [1, 1.1, 1], 
              opacity: isOpening ? [0.2, 0.5, 0] : [0.1, 0.2, 0.1] 
            }}
            transition={{ duration: isOpening ? 1 : 3, repeat: isOpening ? 0 : Infinity }}
            className="absolute -inset-10 bg-amber-400 blur-3xl rounded-full pointer-events-none"
          />

          <motion.div 
            animate={isOpening ? { scale: [1, 1.05, 0.95], y: [0, -10, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="relative w-72 h-48 bg-amber-200 rounded-lg shadow-2xl border-2 border-amber-300 overflow-visible z-10 preserve-3d"
          >
            <motion.div 
              initial={{ rotateX: 0 }}
              animate={{ rotateX: isOpening ? -170 : 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-amber-300 z-50 shadow-md origin-top preserve-3d"
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', backfaceVisibility: 'hidden' }}
            >
              <div className="absolute inset-0 bg-amber-400/50" style={{ transform: 'rotateX(180deg)' }} />
            </motion.div>
            
            <div className="absolute inset-0 z-10 bg-amber-200 rounded-lg shadow-inner overflow-hidden">
               <div className="absolute bottom-0 left-0 w-full h-full bg-amber-100/90" style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 50%)' }} />
               <div className="absolute top-0 left-0 h-full w-full bg-amber-200/60" style={{ clipPath: 'polygon(0 0, 0 100%, 50% 50%)' }} />
               <div className="absolute top-0 right-0 h-full w-full bg-amber-200/60" style={{ clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)' }} />
            </div>

            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ 
                y: isOpening ? -130 : 0, 
                opacity: isOpening ? 1 : 0,
                scale: isOpening ? 1.1 : 1,
                rotateX: isOpening ? -10 : 0
              }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
              className="absolute top-4 left-6 right-6 h-40 bg-white shadow-xl z-20 rounded-sm border border-amber-100 p-4 flex flex-col items-center justify-center text-center overflow-hidden"
            >
               <div className="w-10 h-1 bg-amber-100 rounded-full mb-2" />
               <div className="w-full h-[1px] bg-amber-50 mb-2" />
               <p className="font-title text-[10px] text-amber-800/40 uppercase tracking-widest">Sneha's 20th</p>
               <p className="font-magic text-xs text-amber-600 mt-1">A Secret History</p>
            </motion.div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60]">
              <motion.div 
                animate={isOpening ? { scale: 0, opacity: 0, rotate: 45 } : {}}
                whileHover={{ scale: 1.15, rotate: 8 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 bg-red-800 rounded-full flex items-center justify-center shadow-lg border-2 border-red-900 group"
              >
                <div className="absolute inset-0 bg-red-700 rounded-full opacity-0 group-hover:opacity-20 animate-pulse" />
                <span className="text-amber-400 font-magic text-3xl drop-shadow-md z-10">20</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.p 
          animate={isOpening ? { opacity: 0 } : { opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="mt-12 text-amber-800 font-title text-sm uppercase tracking-[0.2em] flex items-center gap-3 text-center"
        >
          <SparklesIcon size={14} className="text-amber-500" /> 
          Tap to unveil your chapters 
          <SparklesIcon size={14} className="text-amber-500" />
        </motion.p>
      </motion.div>

      {/* Full Screen Letter Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1600] flex items-center justify-center p-4 md:p-10 bg-amber-50/98 backdrop-blur-3xl overflow-hidden"
          >
            {/* Global Background Particles */}
            <motion.div className="absolute inset-0 pointer-events-none">
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -120, 0], 
                    x: [0, Math.random() * 60 - 30, 0],
                    opacity: [0, 0.6, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 4 + Math.random() * 3, 
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                  className="absolute text-amber-400/40"
                  style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
                >
                  <SparklesIcon size={Math.random() * 12 + 6} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ scale: 0.6, y: 100, rotateX: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, rotateX: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="relative w-full max-w-2xl h-[85vh] perspective-[2500px]"
            >
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeLetter}
                className="absolute -top-14 right-0 p-3 text-amber-900/40 hover:text-amber-900 transition-colors z-[1700] hover:bg-amber-100/50 rounded-full backdrop-blur-sm"
              >
                <X size={28} />
              </motion.button>

              <div className="absolute top-1/2 left-0 md:-left-24 -translate-y-1/2 z-[1700]">
                <motion.button
                  whileHover={{ scale: 1.1, x: -4 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={currentPage === 0}
                  onClick={prevPage}
                  className={`p-3 rounded-full bg-white/30 backdrop-blur-md text-amber-900/60 shadow-lg border border-white/40 transition-all ${currentPage === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                  <ChevronLeft size={30} />
                </motion.button>
              </div>

              <div className="absolute top-1/2 right-0 md:-right-24 -translate-y-1/2 z-[1700]">
                <motion.button
                  whileHover={{ scale: 1.1, x: 4 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={currentPage === TWENTY_LETTERS.length - 1}
                  onClick={nextPage}
                  className={`p-3 rounded-full bg-white/30 backdrop-blur-md text-amber-900/60 shadow-lg border border-white/40 transition-all ${currentPage === TWENTY_LETTERS.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                  <ChevronRight size={30} />
                </motion.button>
              </div>

              <div className="w-full h-full flex flex-col justify-center items-center preserve-3d">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentPage}
                    custom={direction}
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    style={{
                      boxShadow: "0 50px 100px -30px rgba(180,120,0,0.4)"
                    }}
                    className="w-full h-full bg-[#fefcf7] p-8 md:p-16 border border-amber-200/50 rounded-xl overflow-y-auto flex flex-col relative preserve-3d"
                  >
                    {/* Comforting Border Pulse Animation */}
                    <motion.div 
                      animate={{ 
                        boxShadow: [
                          "inset 0 0 40px rgba(251,191,36,0.05)", 
                          "inset 0 0 60px rgba(251,191,36,0.15)", 
                          "inset 0 0 40px rgba(251,191,36,0.05)"
                        ],
                        borderColor: [
                          "rgba(251,191,36,0.2)",
                          "rgba(251,191,36,0.5)",
                          "rgba(251,191,36,0.2)"
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-xl border-2 pointer-events-none z-0"
                    />

                    {/* Moving Sparkle Background inside pages */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={`inner-sparkle-${i}`}
                          initial={{ 
                            x: Math.random() * 400 - 200, 
                            y: Math.random() * 800 - 400, 
                            opacity: 0,
                            scale: 0.5
                          }}
                          animate={{ 
                            x: [null, Math.random() * 400 - 200],
                            y: [null, Math.random() * 800 - 400],
                            opacity: [0, 0.8, 0],
                            scale: [0.5, 1.2, 0.5]
                          }}
                          transition={{ 
                            duration: 5 + Math.random() * 5, 
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          className="absolute w-1 h-1 bg-amber-400 rounded-full blur-[1px]"
                          style={{ 
                            top: `${Math.random() * 100}%`, 
                            left: `${Math.random() * 100}%` 
                          }}
                        />
                      ))}
                    </div>

                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/old-map.png')" }} />
                    
                    <div className="relative z-10 flex-1 flex flex-col">
                      <div className="flex justify-between items-center mb-10 border-b border-amber-100 pb-4">
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-amber-400" />
                           <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber-800/40 font-bold">Vol. XX : Chapters of Sneha</span>
                        </div>
                        <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber-800/40 font-bold">P. {currentPage + 1}</span>
                      </div>

                      <div className="flex-1 flex flex-col justify-center text-center space-y-10">
                        <motion.h2 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                          className="font-title text-2xl md:text-4xl text-amber-900 leading-tight tracking-wide"
                        >
                          {TWENTY_LETTERS[currentPage].title}
                        </motion.h2>

                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.6 }}
                          className="font-script text-2xl md:text-3xl text-amber-950/80 leading-relaxed px-4 md:px-8"
                        >
                          {TWENTY_LETTERS[currentPage].content}
                        </motion.div>

                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8, duration: 0.6 }}
                          className="pt-10 mt-auto"
                        >
                          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-amber-200 to-transparent mx-auto mb-8" />
                          <p className="italic text-xl md:text-2xl font-medium text-amber-800/70 leading-snug font-serif max-w-md mx-auto">
                            "{TWENTY_LETTERS[currentPage].quote}"
                          </p>
                        </motion.div>
                      </div>

                      <div className="mt-12 pt-6 border-t border-amber-50/50 flex justify-center">
                        <div className="flex gap-1.5 flex-wrap justify-center max-w-[200px]">
                          {TWENTY_LETTERS.map((_, idx) => (
                            <div 
                              key={idx} 
                              className={`h-1.5 transition-all duration-500 rounded-full ${idx === currentPage ? 'w-6 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'w-1.5 bg-amber-200 hover:bg-amber-300 cursor-pointer'}`}
                              onClick={() => { setDirection(idx > currentPage ? 1 : -1); setCurrentPage(idx); }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .preserve-3d { transform-style: preserve-3d; }
        .perspective-1200 { perspective: 1200px; }
        .perspective-2500 { perspective: 2500px; }
      `}</style>
    </div>
  );
};

export default EnchantedEnvelope;
