
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Eye } from 'lucide-react';
import { PENSIEVE_MEMORIES } from '../constants';

const MemoryOrb: React.FC<{ 
  memory: typeof PENSIEVE_MEMORIES[0], 
  index: number, 
  onSelect: (m: typeof PENSIEVE_MEMORIES[0]) => void 
}> = ({ memory, index, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative flex flex-col items-center group cursor-pointer"
      onClick={() => onSelect(memory)}
    >
      {/* The Floating Orb */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          x: [0, 10, -5, 0],
          scale: [1, 1.05, 0.98, 1]
        }}
        transition={{ 
          duration: 6 + index, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: index * 0.5
        }}
        className={`w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br ${memory.color} relative shadow-[0_0_40px_rgba(180,220,255,0.4)] overflow-hidden group-hover:shadow-[0_0_60px_rgba(180,220,255,0.7)] transition-shadow duration-500`}
      >
        {/* Inner Swirl Effect */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] mix-blend-overlay animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
        
        {/* Glass Reflection */}
        <div className="absolute top-2 left-1/4 w-1/2 h-1/4 bg-white/30 rounded-full blur-md -rotate-45" />
        
        {/* Hint of Image */}
        <div className="absolute inset-0 opacity-10 grayscale group-hover:opacity-30 group-hover:grayscale-0 transition-all duration-700">
           <img src={memory.image} className="w-full h-full object-cover scale-150" alt="" />
        </div>
      </motion.div>

      {/* Label */}
      <motion.span 
        className="mt-6 font-title text-[10px] uppercase tracking-[0.3em] text-blue-200/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        View Memory
      </motion.span>
    </motion.div>
  );
};

const PensieveMemories: React.FC = () => {
  const [selectedMemory, setSelectedMemory] = useState<typeof PENSIEVE_MEMORIES[0] | null>(null);

  return (
    <section className="py-32 bg-[#0a0f18] relative overflow-hidden min-h-[800px] flex flex-col items-center">
      {/* Mystical Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/5 via-[#0a0f18] to-[#0a0f18] z-0" />
      
      {/* Swirling Mist Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1e293b_0%,transparent_70%)] animate-slow-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-6xl px-6">
        <div className="text-center mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 text-blue-300/40 mb-2"
          >
            <div className="h-[1px] w-12 bg-blue-300/20" />
            <Sparkles size={20} />
            <div className="h-[1px] w-12 bg-blue-300/20" />
          </motion.div>
          
          <h2 className="font-title text-3xl md:text-5xl text-blue-100 tracking-wider">The Pensieve Basin</h2>
          <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-blue-400/50 font-bold max-w-md mx-auto">
            A sanctuary of light and shadow where your most radiant memories float in silence
          </p>
        </div>

        {/* Floating Orbs Container */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 relative min-h-[400px]">
          {PENSIEVE_MEMORIES.map((m, idx) => (
            <MemoryOrb key={m.id} memory={m} index={idx} onSelect={setSelectedMemory} />
          ))}

          {/* Background Wisps */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 0.3, 0]
              }}
              transition={{ duration: 10 + Math.random() * 10, repeat: Infinity }}
              className="absolute text-blue-200/10 pointer-events-none"
              style={{ 
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%` 
              }}
            >
              <Sparkles size={Math.random() * 20 + 10} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Memory Modal - The "Dive" */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2500] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-6"
          >
            <motion.div
              initial={{ scale: 0.5, rotateY: 90, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="relative w-full max-w-4xl aspect-[16/10] md:aspect-video rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(180,220,255,0.3)] border border-white/10"
            >
              <img 
                src={selectedMemory.image} 
                className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-1000"
                alt=""
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 p-8 md:p-12 flex flex-col justify-end">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="font-title text-2xl md:text-4xl text-white mb-4">{selectedMemory.title}</h3>
                  <p className="font-script text-xl md:text-2xl text-blue-100/80 max-w-2xl leading-relaxed">
                    "{selectedMemory.description}"
                  </p>
                </motion.div>
              </div>

              <button 
                onClick={() => setSelectedMemory(null)}
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <X size={24} />
              </button>
              
              {/* Dive Ripple Effect */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute inset-0 pointer-events-none border-[20px] border-blue-400/10 rounded-2xl"
              />
            </motion.div>
            
            <div className="absolute bottom-10 flex flex-col items-center text-blue-300/40">
               <Eye size={20} className="mb-2 animate-bounce" />
               <span className="text-[10px] uppercase tracking-[0.4em]">Submerged in Memory</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes slow-pulse {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.2; }
        }
        .animate-slow-pulse { animation: slow-pulse 15s infinite ease-in-out; }
      `}</style>
    </section>
  );
};

export default PensieveMemories;
