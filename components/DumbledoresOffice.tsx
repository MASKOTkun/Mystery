
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Home, Moon, Sun, Scroll, Sparkles as SparklesIcon } from 'lucide-react';

const HIDDEN_MESSAGES = [
  "Sneha, your kindness is the real magic in our lives. Happy 20th!",
  "To the girl who carries sunshine in her smile—stay magical.",
  "May your 20s be as bright as a well-cast Patronus.",
  "You're not just 20; you're twenty years of wonderful stories.",
  "Keep dreaming, keep shining, and keep being uniquely YOU.",
  "The map says you're headed for greatness, Sneha!",
  "A heart like yours deserves every bit of magic today.",
  "Your light is a compass for those around you, Sneha.",
  "Mischief managed, but the magic has only just begun.",
  "A secret: the best chapters of your story are yet to be written."
];

const INVISIBLE_POOL = [
  "Always...", "Pure Magic", "20 Years of Light", "Sneha's Day", 
  "The Chosen One", "Lumos!", "Nitwit! Blubber! Oddment!",
  "Mischief Managed", "After all this time?", "The Boy Who Lived",
  "Wit Beyond Measure", "Expecto Patronum", "Felix Felicis",
  "Marauder's Map", "I solemnly swear", "Up to no good"
];

const SnitchWings: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none" style={{ willChange: 'transform' }}>
    {/* Left Wing - High-Speed flutter */}
    <motion.div
      animate={{ 
        rotateX: [0, 110, 0],
        rotateY: [15, 45, 15],
        scaleX: [1, 0.6, 1],
        skewY: [-10, 10, -10]
      }}
      transition={{ duration: 0.05, repeat: Infinity, ease: "linear" }}
      className="absolute right-1/2 top-1/2 -translate-y-1/2 w-8 h-3.5 bg-gradient-to-r from-transparent via-amber-100/60 to-white/80 rounded-full blur-[0.4px] origin-right mr-[5px]"
      style={{ willChange: 'transform' }}
    />
    {/* Right Wing - High-Speed flutter */}
    <motion.div
      animate={{ 
        rotateX: [0, 110, 0],
        rotateY: [-15, -45, -15],
        scaleX: [1, 0.6, 1],
        skewY: [10, -10, 10]
      }}
      transition={{ duration: 0.05, repeat: Infinity, ease: "linear", delay: 0.025 }}
      className="absolute left-1/2 top-1/2 -translate-y-1/2 w-8 h-3.5 bg-gradient-to-l from-transparent via-amber-100/60 to-white/80 rounded-full blur-[0.4px] origin-left ml-[5px]"
      style={{ willChange: 'transform' }}
    />
  </div>
);

const GoldenSnitch: React.FC<{ onCatch: () => void; index: number }> = ({ onCatch, index }) => {
  // Stabilized erratic path
  const pathData = useMemo(() => {
    const points = 10;
    return {
      x: Array.from({ length: points }, () => `${Math.random() * 85 + 7.5}vw`),
      y: Array.from({ length: points }, () => `${Math.random() * 85 + 7.5}vh`),
      rotate: Array.from({ length: points }, () => Math.random() * 1440 - 720),
      scale: Array.from({ length: points }, () => 0.9 + Math.random() * 0.3),
      duration: 10 + Math.random() * 6
    };
  }, []);

  return (
    <motion.div
      className="fixed z-[120] cursor-pointer pointer-events-auto"
      initial={{ x: pathData.x[0], y: pathData.y[0] }}
      animate={{
        x: pathData.x,
        y: pathData.y,
        rotate: pathData.rotate,
        scale: pathData.scale,
      }}
      transition={{
        duration: pathData.duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay: index * 0.4
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onCatch();
      }}
      style={{ willChange: 'transform' }}
    >
      <div className="relative group p-8 -m-8 flex items-center justify-center">
        <SnitchWings />
        <motion.div 
          animate={{ scale: [1, 2, 1], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 bg-amber-400 blur-3xl rounded-full pointer-events-none"
        />
        <div className="w-5 h-5 bg-gradient-to-br from-amber-100 via-amber-500 to-amber-900 rounded-full shadow-[0_0_30px_rgba(251,191,36,0.8)] border border-amber-200/60 relative z-10">
           <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full blur-[0.2px] opacity-60" />
        </div>
      </div>
    </motion.div>
  );
};

const FootprintPath: React.FC<{ stepsData: any }> = ({ stepsData }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(stepsData.steps)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ 
            duration: 3, 
            delay: stepsData.delay + i * 0.4, 
            repeat: Infinity,
            repeatDelay: 10
          }}
          className="absolute"
          style={{ 
            left: `${stepsData.startPos.x + (i % 2 === 0 ? 0 : 3.5) + Math.sin(stepsData.startPos.rotation * (Math.PI/180)) * i * 4.5}%`, 
            top: `${stepsData.startPos.y + (i * 3.2) + Math.cos(stepsData.startPos.rotation * (Math.PI/180)) * i * 4.5}%`,
            transform: `rotate(${stepsData.startPos.rotation + (i % 2 === 0 ? -20 : 20)}deg)`,
            willChange: 'opacity'
          }}
        >
          <svg width="10" height="20" viewBox="0 0 14 24" fill="currentColor" className="text-blue-400/35">
            <ellipse cx="7" cy="6" rx="5" ry="6" />
            <ellipse cx="7" cy="18" rx="4" ry="5" />
            <circle cx="3" cy="2" r="1.2" />
            <circle cx="7" cy="1" r="1.2" />
            <circle cx="11" cy="2" r="1.5" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

const DumbledoresOffice: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [isLit, setIsLit] = useState(true);
  const [snitchCaught, setSnitchCaught] = useState(false);
  const [activeMessage, setActiveMessage] = useState("");
  
  // Memoize all complex background animations to prevent recalculation on every state change
  const scatteredWords = useMemo(() => 
    INVISIBLE_POOL.map((word) => ({
      text: word,
      top: `${2 + Math.random() * 95}%`,
      left: `${2 + Math.random() * 95}%`,
      delay: Math.random() * 10,
      scale: 0.6 + Math.random() * 0.6,
      rotate: (Math.random() - 0.5) * 45
    }))
  , []);

  const footprintPaths = useMemo(() => 
    [...Array(15)].map((_, i) => ({
      steps: 18,
      delay: i * 1.8,
      startPos: {
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360
      }
    }))
  , []);

  const embers = useMemo(() => 
    [...Array(25)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 7 + Math.random() * 6,
      delay: Math.random() * 5
    }))
  , []);

  const handleCatchSnitch = () => {
    const randomMsg = HIDDEN_MESSAGES[Math.floor(Math.random() * HIDDEN_MESSAGES.length)];
    setActiveMessage(randomMsg);
    setSnitchCaught(true);
  };

  return (
    <div className={`min-h-screen transition-colors duration-[1500ms] flex flex-col items-center justify-center p-6 relative overflow-hidden ${isLit ? 'bg-[#1a120b]' : 'bg-[#010204]'}`}>
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute inset-0 transition-opacity duration-[1500ms] ${isLit ? 'opacity-20' : 'opacity-5'}`}>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')]" />
        </div>
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.98)_100%)] transition-opacity duration-[1500ms] ${isLit ? 'opacity-0' : 'opacity-100'}`} />
        
        {/* Floating Embers */}
        {embers.map((ember, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -250, 0],
              opacity: [0, 0.5, 0],
              scale: [1, 1.4, 1]
            }}
            transition={{ duration: ember.duration, repeat: Infinity, delay: ember.delay }}
            className={`absolute w-1 h-1 rounded-full ${isLit ? 'bg-amber-500/25' : 'bg-blue-400/25'}`}
            style={{ left: ember.left, top: ember.top, willChange: 'transform' }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-12">
        
        {/* HEADER */}
        <div className="text-center space-y-4 pt-10 px-4">
          <motion.h2 
            animate={{ color: isLit ? '#f59e0b' : '#60a5fa' }}
            className="font-title text-2xl md:text-5xl uppercase tracking-[0.35em] glow-text transition-colors duration-[1500ms]"
          >
            The Headmaster's Office
          </motion.h2 >
          <p className={`font-script text-lg md:text-2xl transition-all duration-[1500ms] ${isLit ? 'text-amber-100/35' : 'text-blue-100/45 glow-blue'}`}>
            {isLit ? "Legacy of a long and storied history..." : "Shadows tell the tales that Sneha keeps..."}
          </p>
        </div>

        {/* INTERACTIVE NOX CONTENT */}
        <AnimatePresence>
          {!isLit && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none overflow-hidden z-20"
            >
              {footprintPaths.map((path, i) => (
                <FootprintPath key={i} stepsData={path} />
              ))}
              
              {scatteredWords.map((word, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.55, 0], y: [0, -25, 0] }}
                  transition={{ duration: 9, repeat: Infinity, delay: word.delay }}
                  className="absolute font-script text-xl md:text-3xl text-blue-300/35 whitespace-nowrap glow-blue"
                  style={{ top: word.top, left: word.left, scale: word.scale, rotate: word.rotate, willChange: 'transform, opacity' }}
                >
                  {word.text}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* DELUMINATOR */}
        <div className="relative flex items-center justify-center py-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLit(!isLit)}
            className="relative z-[150] group"
          >
            <div className={`absolute -inset-10 blur-[80px] rounded-full transition-all duration-[1500ms] ${isLit ? 'bg-amber-500/25' : 'bg-blue-500/20'}`} />
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[1.2rem] border-2 flex items-center justify-center transition-all duration-700 shadow-2xl ${isLit ? 'bg-amber-900/40 border-amber-400/35' : 'bg-blue-900/40 border-blue-400/35'}`}>
              <AnimatePresence mode="wait">
                {isLit ? (
                  <motion.div key="sun" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }}>
                    <Sun size={28} className="text-amber-400" />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -90 }}>
                    <Moon size={28} className="text-blue-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <p className={`mt-3 font-title text-[8px] uppercase tracking-[0.6em] text-center transition-all duration-700 ${isLit ? 'text-amber-500/45' : 'text-blue-400/65'}`}>
              {isLit ? "Nox" : "Lumos"}
            </p>
          </motion.button>
        </div>

        {/* SNITCHES */}
        {isLit && !snitchCaught && (
          <div className="fixed inset-0 pointer-events-none z-[110]">
             {[...Array(6)].map((_, i) => (
               <GoldenSnitch key={i} index={i} onCatch={handleCatchSnitch} />
             ))}
          </div>
        )}

        {/* SNITCH MODAL */}
        <AnimatePresence>
          {snitchCaught && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-6"
              onClick={() => {
                setActiveMessage("");
                setSnitchCaught(false);
              }}
            >
              <motion.div 
                initial={{ scale: 0.5, rotateX: 60, y: 200 }}
                animate={{ scale: 1, rotateX: 0, y: 0 }}
                exit={{ scale: 0.5, rotateX: -60, y: -200 }}
                className="bg-[#fefaf0] p-8 md:p-14 rounded-[3.5rem] border-x-[16px] border-amber-900/15 text-center space-y-8 max-w-lg relative overflow-hidden shadow-[0_0_150px_rgba(251,191,36,0.3)]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Parchment Texture */}
                <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]" />
                
                <div className="relative z-10 flex flex-col items-center">
                  <motion.div 
                    animate={{ y: [0, -12, 0] }} 
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-6 p-5 bg-amber-100/60 rounded-full text-amber-700"
                  >
                    <Scroll size={44} />
                  </motion.div>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <SparklesIcon size={18} className="text-amber-500/50" />
                    <h3 className="font-title text-lg md:text-xl text-amber-900 uppercase tracking-[0.45em] border-y border-amber-900/15 py-3">
                      I Open At The Close
                    </h3>
                    <SparklesIcon size={18} className="text-amber-500/50" />
                  </div>
                  
                  <div className="relative py-6">
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                      className="font-script text-2xl md:text-4xl text-amber-900 leading-snug italic px-6 drop-shadow-sm"
                    >
                      "{activeMessage}"
                    </motion.p>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setActiveMessage("");
                      setSnitchCaught(false);
                    }}
                    className="mt-10 px-16 py-4 bg-amber-700 text-white font-title rounded-full text-xs tracking-[0.25em] uppercase shadow-2xl hover:bg-amber-600 transition-all active:scale-95 group flex items-center gap-4"
                  >
                    Release the Snitch <Star size={16} className="group-hover:rotate-180 transition-transform duration-700" />
                  </button>
                </div>
                
                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-amber-900/10 rounded-tl-[3.5rem]" />
                <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-amber-900/10 rounded-br-[3.5rem]" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FOOTER */}
        <div className="flex flex-col gap-6 items-center z-[150] pb-6">
          <p className={`font-title text-[9px] uppercase tracking-[0.6em] transition-all duration-[2000ms] text-center px-6 ${isLit ? 'opacity-35 text-amber-200' : 'opacity-85 text-blue-400 glow-blue'}`}>
            {isLit ? "The Snitches vanish in the shadows... be swift" : "A map is only as true as the one who holds it, Sneha"}
          </p>
          <button onClick={onBack} className="text-white/20 font-title uppercase tracking-widest text-[9px] py-4 hover:text-white transition-colors flex items-center gap-2">
            <Home size={16} /> Back to the Great Hall
          </button>
        </div>

      </div>

      <style>{`
        .glow-blue { text-shadow: 0 0 14px rgba(96, 165, 250, 0.8), 0 0 28px rgba(96, 165, 250, 0.4); }
        .glow-text { text-shadow: 0 0 18px rgba(251, 191, 36, 0.25); }
      `}</style>
    </div>
  );
};

export default DumbledoresOffice;
