import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Eye, Star } from 'lucide-react';
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
      {/* Optimized Floating Orb - Using smoother transitions to prevent flicker */}
      <motion.div
        animate={{ 
          y: [0, -25, 10, -25, 0],
          x: [0, 15, -15, 10, 0],
          rotate: [0, 2, -2, 1, 0],
        }}
        transition={{ 
          duration: 10 + (index * 1.5), 
          repeat: Infinity, 
          ease: "easeInOut",
        }}
        style={{ willChange: 'transform' }}
        className={`w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br ${memory.color} relative shadow-[0_0_35px_rgba(180,220,255,0.25)] overflow-hidden transition-all duration-700 group-hover:shadow-[0_0_70px_rgba(180,220,255,0.5)] group-hover:scale-110`}
      >
        {/* Hardware-accelerated Inner Swirl */}
        <div 
          className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] animate-spin-slow pointer-events-none" 
          style={{ transform: 'translateZ(0)' }}
        />
        
        {/* Memory Image Glimpse */}
        <div className="absolute inset-0 opacity-10 grayscale group-hover:opacity-40 group-hover:grayscale-0 transition-all duration-700 pointer-events-none">
           <img 
             src={memory.image} 
             className="w-full h-full object-cover scale-[1.6]" 
             alt="" 
             loading="lazy"
           />
        </div>

        {/* Static Glass Highlight to prevent render-loop flickering */}
        <div className="absolute top-[10%] left-[20%] w-[60%] h-[30%] bg-white/30 rounded-full blur-md -rotate-45 pointer-events-none" />
        
        {/* Subtle Pulsing Overlay */}
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-white/10 pointer-events-none"
        />
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.3)_0%,transparent_60%)] pointer-events-none" />
      </motion.div>

      {/* Label Reveal */}
      <motion.div 
        className="mt-6 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0"
      >
        <span className="font-title text-[9px] uppercase tracking-[0.4em] text-blue-200/40 font-bold">
          Dive into Memory
        </span>
        <div className="w-8 h-[1px] bg-blue-300/20 mt-2 scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
      </motion.div>
    </motion.div>
  );
};

const PensieveMemories: React.FC = () => {
  const [selectedMemory, setSelectedMemory] = useState<typeof PENSIEVE_MEMORIES[0] | null>(null);

  return (
    <section className="py-20 bg-[#0a0f18] relative overflow-hidden min-h-[600px] flex flex-col items-center">
      {/* Background with reduced complexity */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/5 via-[#0a0f18] to-[#0a0f18] z-0" />
      
      {/* Background Wisps */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`wisp-${i}`}
            animate={{ 
              y: [0, -100, 0],
              opacity: [0, 0.2, 0],
            }}
            transition={{ duration: 12 + i, repeat: Infinity, delay: i * 0.5 }}
            className="absolute text-blue-200/10"
            style={{ left: `${(i * 17) % 100}%`, top: `${(i * 23) % 100}%` }}
          >
            <Star size={Math.random() * 4 + 2} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl px-6">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 text-blue-400/20"
          >
            <Sparkles size={22} className="animate-pulse" />
          </motion.div>
          
          <h2 className="font-title text-3xl md:text-5xl text-blue-50 tracking-[0.05em] drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            The Pensieve Basin
          </h2>
          <p className="font-sans text-[9px] uppercase tracking-[0.5em] text-blue-400/30 font-black">
            Drifting Memories of the Soul
          </p>
        </div>

        {/* Orbs Grid */}
        <div className="flex flex-wrap justify-center gap-10 md:gap-20 relative">
          {PENSIEVE_MEMORIES.map((m, idx) => (
            <MemoryOrb key={m.id} memory={m} index={idx} onSelect={setSelectedMemory} />
          ))}
        </div>
      </div>

      {/* Stable Immersive Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2500] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.05, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-4xl aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5"
            >
              {/* MAGICAL BORDER */}
              <div className="absolute inset-0 z-50 pointer-events-none">
                 <motion.div 
                   animate={{ 
                     opacity: [0.3, 0.6, 0.3],
                     borderColor: ["rgba(255,255,255,0.1)", "rgba(251,191,36,0.4)", "rgba(255,255,255,0.1)"]
                   }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute inset-0 border-2 rounded-2xl" 
                 />
              </div>
              
              {/* Memory Image */}
              <div className="absolute inset-0">
                <motion.img 
                  animate={{ scale: [1.1, 1.2, 1.1] }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  src={selectedMemory.image} 
                  className="w-full h-full object-cover contrast-110"
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-[1px] w-8 bg-amber-400/30" />
                    <h3 className="font-title text-2xl md:text-4xl text-white tracking-tight">{selectedMemory.title}</h3>
                  </div>
                  <p className="font-script text-xl md:text-3xl text-blue-100/90 italic leading-snug max-w-2xl">
                    "{selectedMemory.description}"
                  </p>
                </motion.div>
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setSelectedMemory(null)}
                className="absolute top-6 right-6 p-3 bg-black/40 hover:bg-black/60 rounded-full text-white/50 hover:text-white transition-all backdrop-blur-md z-[60] border border-white/10"
              >
                <X size={24} />
              </button>
            </motion.div>
            
            {/* Modal Subtext */}
            <div className="absolute bottom-10 flex flex-col items-center gap-2 text-blue-300/20">
               <Eye size={20} className="animate-pulse" />
               <span className="text-[10px] uppercase tracking-[0.5em]">Gazing into the Past</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .animate-spin-slow { 
          animation: spin 120s linear infinite; 
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default PensieveMemories;