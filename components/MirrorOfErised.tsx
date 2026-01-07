
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, Home, RotateCcw, Heart, Compass, Book, Zap, Search, Wand2, Stars, Star } from 'lucide-react';

const OrnateFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative w-full max-w-[340px] aspect-[1/1.8] mx-auto group">
      {/* Outer Glow */}
      <div className="absolute -inset-8 bg-amber-500/5 blur-[60px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
      
      {/* The Frame */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        {/* Main Golden Structure */}
        <div className="absolute inset-0 border-[12px] md:border-[18px] border-[#8b6b23] rounded-t-[1000px] rounded-b-lg shadow-[inset_0_0_20px_rgba(0,0,0,0.8),0_10px_40px_rgba(0,0,0,0.6)]" />
        <div className="absolute inset-[4px] md:inset-[6px] border-[2px] border-[#d4af37]/40 rounded-t-[1000px] rounded-b-sm" />
        
        {/* Carvings - Top Arch */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[#d4af37] drop-shadow-lg">
          <svg width="120" height="40" viewBox="0 0 120 40" fill="currentColor">
             <path d="M60 5 C40 5 30 15 10 15 C30 15 40 35 60 35 C80 35 90 15 110 15 C90 15 80 5 60 5Z" />
             <circle cx="60" cy="20" r="4" fill="#ffecb3" className="animate-pulse" />
          </svg>
        </div>

        {/* Carvings - Bottom Corners */}
        <div className="absolute -bottom-2 -left-2 text-[#8b6b23]">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
            <path d="M0 40 L40 40 L40 30 Q30 30 30 0 L20 0 Q20 20 0 20 Z" />
          </svg>
        </div>
        <div className="absolute -bottom-2 -right-2 text-[#8b6b23] scale-x-[-1]">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
            <path d="M0 40 L40 40 L40 30 Q30 30 30 0 L20 0 Q20 20 0 20 Z" />
          </svg>
        </div>

        {/* Decorative Gems */}
        <div className="absolute top-1/4 -left-1 w-2 h-6 bg-amber-900/80 rounded-full border border-amber-400/30" />
        <div className="absolute top-1/4 -right-1 w-2 h-6 bg-amber-900/80 rounded-full border border-amber-400/30" />
      </div>

      {/* The Mirror Content Container */}
      <div className="absolute inset-[12px] md:inset-[18px] rounded-t-[1000px] rounded-b-sm bg-[#05070a] overflow-hidden shadow-inner perspective-[1000px]">
        {children}
      </div>
    </div>
  );
};

const MirrorOfErised: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [step, setStep] = useState<'intro' | 'choice' | 'revealing' | 'reflection'>('intro');
  const [reflectionText, setReflectionText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const paths = [
    { id: 'love', name: 'Infinite Love', icon: Heart, prompt: "a future filled with deep connection, kindred spirits, and a heart that stays wide open." },
    { id: 'wisdom', name: 'Ancient Wisdom', icon: Book, prompt: "becoming a source of light for others, mastering the arts of patience and profound insight." },
    { id: 'adventure', name: 'Grand Adventure', icon: Compass, prompt: "a life of discovery, traveling to unknown horizons with fearless joy." },
    { id: 'impact', name: 'Spark of Impact', icon: Zap, prompt: "creating magic that changes the world, leaving a golden trail of kindness behind." }
  ];

  const generateReflection = async (pathPrompt: string) => {
    setStep('revealing');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a poetic, soul-stirring "Mirror of Erised" reflection for a 20-year-old girl named Sneha on her birthday. She has chosen the path of ${pathPrompt}. Tone: Harry Potter-inspired, magical, deeply personal. Start with "I see in you, Sneha..." Focus on her potential. Max 100 words. Do not use markdown headers or bolding.`,
      });
      
      setReflectionText(response.text || "Your future is written in starlight, Sneha. The mirror shows a path of endless warmth and grace.");
    } catch (error) {
      console.error(error);
      setReflectionText("The mirror ripples with a destiny too bright to describe. Know that your heart's desire is already within your reach, Sneha. You are the magic you seek.");
    } finally {
      setStep('reflection');
    }
  };

  const reset = () => {
    setStep('intro');
    setReflectionText("");
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-amber-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(40,30,15,0.6)_0%,transparent_70%)]" />
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -window.innerHeight],
              opacity: [0, 0.4, 0],
            }}
            transition={{ duration: 8 + Math.random() * 8, repeat: Infinity, delay: Math.random() * 5 }}
            className="absolute w-1 h-1 bg-amber-400/20 rounded-full blur-[1px]"
            style={{ left: `${Math.random() * 100}%`, top: `100%` }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-8 flex flex-col items-center"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="p-10 rounded-full bg-amber-500/5 border border-amber-500/20 shadow-2xl relative"
              >
                <Search size={64} className="text-amber-500" />
                <div className="absolute inset-0 animate-pulse bg-amber-500/10 rounded-full blur-2xl" />
              </motion.div>
              <div className="space-y-4">
                <h1 className="font-magic text-5xl md:text-7xl text-amber-500 glow-yellow leading-tight">Mirror of Erised</h1>
                <p className="font-script text-2xl text-amber-100/60 leading-relaxed max-w-md mx-auto italic">
                  "Erised stra ehru oyt ube cafru oyt on wohsi."
                </p>
              </div>
              <button
                onClick={() => setStep('choice')}
                className="px-14 py-5 bg-amber-500 text-black font-title text-xl rounded-full shadow-[0_0_50px_rgba(251,191,36,0.2)] hover:bg-amber-400 transition-all hover:scale-105 active:scale-95"
              >
                Peer into the Mirror ✨
              </button>
              <button onClick={onBack} className="text-amber-400/20 font-title uppercase tracking-widest text-[10px] py-4 hover:text-amber-400 transition-colors">
                Return to the Great Hall
              </button>
            </motion.div>
          )}

          {step === 'choice' && (
            <motion.div
              key="choice"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              className="space-y-12 w-full flex flex-col items-center"
            >
              <div className="text-center space-y-3">
                <h2 className="font-title text-2xl text-amber-500 uppercase tracking-[0.2em] mb-1">Seek Your Destiny</h2>
                <p className="font-script text-xl text-amber-100/40 italic">Which whisper of the heart calls to you today?</p>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-8 w-full">
                {paths.map((path) => {
                  const Icon = path.icon;
                  return (
                    <motion.button
                      key={path.id}
                      whileHover={{ scale: 1.05, borderColor: 'rgba(251,191,36,0.6)' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => generateReflection(path.prompt)}
                      className="p-8 rounded-[2.5rem] border border-amber-500/10 bg-white/[0.03] flex flex-col items-center gap-4 transition-all group"
                    >
                      <div className="p-4 bg-amber-500/5 rounded-full text-amber-500 group-hover:scale-110 transition-transform">
                        <Icon size={32} />
                      </div>
                      <span className="font-title text-xs md:text-sm uppercase tracking-widest text-amber-100/80 group-hover:text-amber-400">{path.name}</span>
                    </motion.button>
                  );
                })}
              </div>
              <button onClick={() => setStep('intro')} className="text-amber-400/20 font-title uppercase tracking-widest text-[10px] hover:text-amber-400 transition-colors">
                Cancel Ritual
              </button>
            </motion.div>
          )}

          {(step === 'revealing' || step === 'reflection') && (
            <motion.div
              key="reflection-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full flex flex-col items-center space-y-10"
            >
              <OrnateFrame>
                {/* 1. Deep Background Layer (z-0) */}
                <div className="absolute inset-0 z-0">
                  <AnimatePresence>
                    {step === 'revealing' && (
                      <motion.div
                        key="stars-depth"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 2 } }}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 overflow-hidden"
                      >
                         <motion.div
                          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                          className="opacity-10 text-amber-200"
                         >
                            <Stars size={220} />
                         </motion.div>
                         <motion.div 
                          animate={{ opacity: [0, 0.4, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent blur-[100px]"
                         />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Glass Rippling Surface */}
                  <motion.div 
                    animate={{ 
                      opacity: step === 'revealing' ? [0.2, 0.4, 0.2] : 0.05,
                      scale: [1, 1.02, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-amber-900/10 pointer-events-none blur-3xl"
                  />
                </div>

                {/* 2. Mist Layer (z-10) - Now blurs only the background */}
                <AnimatePresence>
                  {step === 'revealing' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 4 } }}
                      className="absolute inset-0 z-10 pointer-events-none bg-stone-900/40 backdrop-blur-3xl mix-blend-screen"
                    />
                  )}
                </AnimatePresence>

                {/* 3. Rays of Clarity (z-15) - Above Mist */}
                {step === 'reflection' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 z-15 pointer-events-none"
                  >
                    {[...Array(2)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          rotate: [35, 40, 35],
                          opacity: [0.05, 0.1, 0.05]
                        }}
                        transition={{ duration: 6, repeat: Infinity, delay: i * 3 }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[250%] bg-gradient-to-b from-amber-300/20 to-transparent origin-top blur-[80px]"
                      />
                    ))}
                  </motion.div>
                )}

                {/* 4. Content Reveal Area (z-20) - Clearly visible above mist */}
                <div className="relative z-20 h-full w-full">
                  <AnimatePresence mode="wait">
                    {step === 'revealing' ? (
                      <motion.div
                        key="loading-ui"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: 'blur(30px)' }}
                        className="h-full flex flex-col items-center justify-center p-8 text-center relative"
                      >
                        {/* THE BIG SPARKLE - Sharp and wandering */}
                        <motion.div
                            animate={{ 
                                x: [-90, 90, -50, 70, -90],
                                y: [-130, 110, -70, 130, -130],
                                scale: [1.2, 1.6, 0.9, 1.4, 1.2],
                                opacity: [0.5, 1, 0.6, 1, 0.5],
                                rotate: [0, 90, 180, 270, 360]
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute text-amber-400 drop-shadow-[0_0_30px_rgba(251,191,36,0.9)]"
                         >
                            <Star size={72} fill="currentColor" className="opacity-90" />
                            <motion.div 
                                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.6, 0.2] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 bg-amber-300 rounded-full blur-2xl -z-10"
                            />
                         </motion.div>

                        <div className="space-y-6 relative z-10 pt-20">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                            className="mx-auto"
                          >
                            <Sparkles className="text-amber-500/60" size={56} />
                          </motion.div>
                          <div className="space-y-3">
                            <p className="font-magic text-3xl text-amber-500 glow-yellow">Searching the Soul...</p>
                            <p className="font-script text-xl text-amber-100 italic px-4 drop-shadow-md">
                              Waiting for your heart's desire to appear in the mist...
                            </p>
                            <motion.p
                              animate={{ opacity: [0.2, 0.5, 0.2] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="text-[8px] uppercase font-title tracking-[0.5em] text-amber-400/40"
                            >
                              The glass is clearing
                            </motion.p>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="prophecy-ui"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full w-full flex flex-col relative bg-transparent"
                        style={{
                          /* organic scroll erase mask - heavily feathered at top and bottom */
                          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, transparent 100%)',
                          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, transparent 100%)'
                        }}
                      >
                        <div 
                          ref={scrollRef}
                          className="h-full w-full overflow-y-auto custom-scrollbar pt-32 pb-32 px-10 no-background"
                        >
                          <div className="space-y-12 text-center min-h-full flex flex-col justify-center bg-transparent">
                            <motion.p 
                              initial={{ opacity: 0, filter: 'blur(20px)', y: 40, scale: 0.95 }}
                              animate={{ 
                                opacity: 1, 
                                filter: 'blur(0px)',
                                y: 0,
                                scale: 1,
                                transition: { duration: 4, ease: "easeOut", delay: 1 } 
                              }}
                              className="font-script text-2xl md:text-3xl text-amber-50 leading-relaxed italic drop-shadow-[0_0_20px_rgba(251,191,36,0.6)] px-2"
                            >
                              {reflectionText}
                            </motion.p>
                            
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1, transition: { delay: 4.5 } }}
                              className="flex justify-center gap-4 py-8"
                            >
                               <Wand2 size={24} className="text-amber-500/20" />
                               <div className="w-12 h-[1px] bg-amber-500/10 mt-3" />
                               <Wand2 size={24} className="text-amber-500/20" />
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </OrnateFrame>

              {step === 'reflection' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 5 }}
                  className="flex flex-col gap-4 w-full max-w-xs"
                >
                  <button
                    onClick={reset}
                    className="px-10 py-5 bg-amber-500 text-black font-title text-base rounded-full shadow-[0_10px_50px_rgba(0,0,0,0.7)] flex items-center justify-center gap-3 hover:bg-amber-400 active:scale-95 transition-all"
                  >
                    <RotateCcw size={18} /> Seek New Prophecy
                  </button>
                  <button onClick={onBack} className="text-amber-400/20 font-title uppercase tracking-widest text-[10px] py-2 hover:text-amber-400 flex items-center justify-center gap-2 transition-colors">
                    <Home size={14} /> Back to Common Room
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px; 
        }
        .custom-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
          background: transparent !important;
        }
        .no-background {
          background: transparent !important;
        }
      `}</style>
    </div>
  );
};

export default MirrorOfErised;
