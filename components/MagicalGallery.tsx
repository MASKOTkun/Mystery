
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ZoomIn, RotateCcw } from 'lucide-react';
import { SNEHA_PHOTOS } from '../constants';

const SECRET_NOTES = [
  "A spark of pure joy captured in time.",
  "Radiating the warmth of a thousand suns.",
  "The grace of a queen, the heart of a child.",
  "Beauty found in the simplest of moments.",
  "A legacy of kindness written in a smile."
];

const PhotoCard: React.FC<{ photo: typeof SNEHA_PHOTOS[0], index: number }> = ({ photo, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Random decorative elements
  const rotation = (index % 3 === 0 ? -3 : index % 2 === 0 ? 2 : 4);
  const tapeColor = index % 2 === 0 ? 'bg-amber-400/30' : 'bg-orange-300/30';

  return (
    <div className="relative group perspective-1000 py-10">
      {/* Decorative Washi Tape */}
      <div 
        className={`absolute -top-2 left-1/2 -translate-x-1/2 w-24 h-8 ${tapeColor} backdrop-blur-sm z-30 -rotate-2 border-x border-amber-900/10 shadow-sm pointer-events-none`}
        style={{ clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)' }}
      />

      <motion.div
        className="relative w-full aspect-[4/5] preserve-3d cursor-pointer"
        initial={{ opacity: 0, y: 30, rotate: rotation }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
          scale: isFlipped ? 1.05 : 1
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of Polaroid */}
        <div className="absolute inset-0 backface-hidden z-10 bg-white p-4 pb-12 shadow-xl border border-amber-100 flex flex-col">
          <div className="flex-1 bg-stone-100 overflow-hidden relative group-hover:shadow-inner transition-shadow">
            <img 
              src={photo.url} 
              alt={photo.caption} 
              className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="absolute bottom-2 right-2 text-white/60">
                <ZoomIn size={14} />
            </div>
          </div>
          <p className="mt-4 font-script text-xl text-amber-950 text-center leading-tight">
            {photo.caption}
          </p>
          
          {/* Subtle Sparkle on Front */}
          <motion.div 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: index }}
            className="absolute top-6 right-6 text-amber-400"
          >
            <Sparkles size={12} />
          </motion.div>
        </div>

        {/* Back of Polaroid (Secret Note) */}
        <div 
          className="absolute inset-0 backface-hidden bg-[#faf7f0] p-8 shadow-2xl border-2 border-amber-200 flex flex-col items-center justify-center text-center rotate-y-180"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }}
        >
          <div className="absolute inset-4 border border-amber-100 rounded-sm pointer-events-none" />
          
          <div className="mb-6 p-3 bg-amber-50 rounded-full text-amber-600/50">
            <RotateCcw size={20} />
          </div>
          
          <h4 className="font-title text-[10px] uppercase tracking-[0.3em] text-amber-800/40 mb-4 font-bold">Enchanted Essence</h4>
          <p className="font-script text-2xl text-amber-900 italic leading-relaxed">
            {SECRET_NOTES[index % SECRET_NOTES.length]}
          </p>
          
          <div className="mt-8 flex gap-1">
             {[...Array(3)].map((_, i) => (
               <Sparkles key={i} size={8} className="text-amber-300" />
             ))}
          </div>

          <div className="absolute bottom-4 text-[8px] uppercase tracking-widest text-amber-800/20">
            Tap to flip back
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const MagicalGallery: React.FC = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        {/* Gallery Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block p-3 bg-amber-100/50 rounded-full text-amber-600 mb-2"
          >
            <Sparkles size={24} />
          </motion.div>
          <h2 className="font-magic text-4xl text-amber-600">The Gallery of Glow</h2>
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-amber-800/40 font-bold">
            Interactive Memories • Tap to Reveal Secrets
          </p>
        </div>

        {/* Scattered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {SNEHA_PHOTOS.map((photo, index) => (
            <PhotoCard key={index} photo={photo} index={index} />
          ))}
        </div>

        {/* Decorative Floating Elements */}
        <div className="mt-20 flex justify-center">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
        </div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </section>
  );
};

export default MagicalGallery;
