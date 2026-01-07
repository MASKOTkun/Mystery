import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Scroll, RotateCcw, ChevronRight, Home } from 'lucide-react';
import { SORTING_QUIZ } from '../constants';

type ArchetypeKey = keyof typeof SORTING_QUIZ.archetypes;

const SortingHatSVG: React.FC<{ isTalking?: boolean; isThinking?: boolean }> = ({ isTalking, isThinking }) => {
  return (
    <motion.div
      animate={isThinking ? {
        rotate: [0, -2, 2, -2, 0],
        scale: [1, 1.02, 0.98, 1],
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
      } : {}}
      className="relative w-48 h-48 mx-auto mb-8 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
    >
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M20 160C20 150 60 140 100 140C140 140 180 150 180 160C180 175 140 185 100 185C60 185 20 175 20 160Z" fill="#3D2B1F" />
        <path d="M35 155C35 150 65 145 100 145C135 145 165 150 165 155C165 165 135 170 100 170C65 170 35 165 35 155Z" fill="#2D1B0F" />
        <motion.path 
          animate={isTalking ? {
            d: [
              "M60 145 L80 40 L120 20 L140 40 L140 145 Z",
              "M60 145 L75 35 L125 15 L145 35 L140 145 Z",
              "M60 145 L80 40 L120 20 L140 40 L140 145 Z"
            ],
            transition: { duration: 0.5, repeat: Infinity }
          } : {}}
          d="M60 145 L80 40 L120 20 L140 40 L140 145 Z" 
          fill="#4D3B2F" 
        />
        <motion.path 
          animate={isThinking ? { 
            opacity: [0.4, 0.8, 0.4],
            transition: { duration: 2, repeat: Infinity }
          } : { opacity: 0.4 }}
          d="M75 80 Q90 70 100 85" stroke="#1A0F08" strokeWidth="4" strokeLinecap="round" 
        />
        <motion.path 
          animate={isThinking ? { 
            opacity: [0.4, 0.8, 0.4],
            transition: { duration: 2, repeat: Infinity, delay: 0.3 }
          } : { opacity: 0.4 }}
          d="M125 80 Q110 70 100 85" stroke="#1A0F08" strokeWidth="4" strokeLinecap="round" 
        />
        <motion.path 
          animate={isTalking ? {
            d: [
              "M80 115 Q100 130 120 115",
              "M80 115 Q100 110 120 115",
              "M80 120 Q100 140 120 120",
              "M80 115 Q100 130 120 115"
            ],
            transition: { duration: 0.3, repeat: Infinity }
          } : (isThinking ? { d: "M85 120 Q100 125 115 120" } : { d: "M80 115 Q100 130 120 115" }))
          d="M80 115 Q100 130 120 115" 
          stroke="#1A0F08" 
          strokeWidth="5" 
          strokeLinecap="round" 
          fill="none" 
        />
        <rect x="110" y="60" width="15" height="15" rx="2" fill="#5D4B3F" transform="rotate(15 110 60)" />
        <path d="M112 62 L123 73 M112 73 L123 62" stroke="#3D2B1F" strokeWidth="1" />
      </svg>
      <AnimatePresence>
        {isThinking && (
          <motion.div
            key="glow"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.6, scale: 1.2 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-amber-400/20 blur-3xl rounded-full -z-10"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SortingHatQuiz: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [step, setStep] = useState<'intro' | 'quiz' | 'thinking' | 'result'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<ArchetypeKey, number>>({
    vanguard: 0,
    sage: 0,
    dreamer: 0,
    lighthouse: 0
  });
  const [result, setResult] = useState<ArchetypeKey | null>(null);
  const [thinkingText, setThinkingText] = useState("");

  const startQuiz = () => setStep('quiz');

  const handleAnswer = (type: ArchetypeKey) => {
    setScores(prev => ({ ...prev, [type]: prev[type] + 1 }));
    
    if (currentQuestion < SORTING_QUIZ.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setStep('thinking');
    }
  };

  useEffect(() => {
    if (step === 'thinking') {
      const texts = [
        "Hmm... tricky, very tricky...",
        "I see plenty of courage, oh yes...",
        "A thirst to prove yourself, perhaps?",
        "But where to put you? Where do you belong?",
        "I have it! It must be..."
      ];
      
      let i = 0;
      const interval = setInterval(() => {
        if (i < texts.length) {
          setThinkingText(texts[i]);
          i++;
        }
      }, 900);

      const timer = setTimeout(() => {
        const sorted = Object.entries(scores).sort((a, b) => (b[1] as number) - (a[1] as number));
        setResult(sorted[0][0] as ArchetypeKey);
        setStep('result');
        clearInterval(interval);
      }, 5000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [step, scores]);

  const reset = () => {
    setStep('intro');
    setCurrentQuestion(0);
    setScores({ vanguard: 0, sage: 0, dreamer: 0, lighthouse: 0 });
    setResult(null);
    setThinkingText("");
  };

  return (
    <div className="min-h-screen bg-[#0c0e14] text-amber-50 py-24 px-6 relative flex flex-col items-center justify-center overflow-hidden">
      {/* Floating Candles Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -60, 0],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-1.5 h-10 bg-amber-100 rounded-full blur-[3px]"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              boxShadow: "0 0 15px #fcd34d"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-xl text-center">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              className="space-y-8 flex flex-col items-center"
            >
              <SortingHatSVG />
              
              <h2 className="font-title text-3xl md:text-5xl text-amber-100 tracking-widest uppercase">
                The Great Hall Ceremony
              </h2>
              <p className="font-script text-xl text-amber-200/60 leading-relaxed px-4">
                "Step forward, Sneha. Twenty years of magic in your soul... Let's see where the next decade leads you."
              </p>
              
              <div className="flex flex-col gap-4 w-full max-w-xs">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(251,191,36,0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startQuiz}
                  className="px-12 py-5 bg-amber-500 text-black font-title text-xl rounded-full shadow-[0_0_30px_rgba(251,191,36,0.4)] border-b-4 border-amber-700 transition-shadow"
                >
                  Let the Sorting Begin ✨
                </motion.button>
                <button onClick={onBack} className="text-amber-400/50 font-title uppercase tracking-widest text-[10px] hover:text-amber-400 py-2 transition-colors">
                  Return to Home
                </button>
              </div>
            </motion.div>
          )}

          {step === 'quiz' && (
            <motion.div
              key={`q-${currentQuestion}`}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)", rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)", rotateY: 0 }}
              exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)", rotateY: -90 }}
              transition={{ duration: 0.8, type: "spring", damping: 15 }}
              className="space-y-10"
            >
              <div className="flex justify-center -mb-4">
                 <SortingHatSVG />
              </div>

              <div className="space-y-4">
                <span className="text-amber-500/50 font-title text-xs uppercase tracking-[0.4em]">Prophecy Question {currentQuestion + 1}</span>
                <h3 className="font-title text-2xl md:text-3xl text-amber-50 leading-snug px-4">
                  {SORTING_QUIZ.questions[currentQuestion].text}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 px-4">
                {SORTING_QUIZ.questions[currentQuestion].options.map((option, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.03, backgroundColor: "rgba(251,191,36,0.1)", borderColor: "rgba(251,191,36,0.6)" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(option.type as ArchetypeKey)}
                    className="p-5 text-left border border-amber-900/40 rounded-2xl bg-black/40 backdrop-blur-sm text-amber-200 font-sans text-sm md:text-base flex items-center justify-between group transition-colors"
                  >
                    <span className="flex-1 pr-4">{option.text}</span>
                    <ChevronRight size={18} className="text-amber-500/20 group-hover:text-amber-500 transition-colors shrink-0" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'thinking' && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center space-y-8"
            >
              <SortingHatSVG isTalking={thinkingText !== ""} isThinking={true} />
              
              <div className="min-h-[100px] flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  {thinkingText ? (
                    <motion.p
                      key={thinkingText}
                      initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                      className="font-script text-3xl text-amber-100 italic px-6 text-center leading-relaxed"
                    >
                      "{thinkingText}"
                    </motion.p>
                  ) : (
                    <motion.p
                      key="waiting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-script text-2xl text-amber-200/50 italic"
                    >
                      Patience, my dear...
                    </motion.p>
                  )}
                </AnimatePresence>
                
                <motion.div 
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-8 flex gap-3"
                >
                   <Sparkles className="text-amber-500" size={16} />
                   <Sparkles className="text-amber-500" size={20} />
                   <Sparkles className="text-amber-500" size={16} />
                </motion.div>
              </div>
            </motion.div>
          )}

          {step === 'result' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.5, filter: "blur(30px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              className="relative flex flex-col items-center"
            >
              <div className="bg-[#fefcf7] p-10 md:p-14 border-[12px] border-double border-amber-900/30 rounded-2xl shadow-[0_0_100px_rgba(180,120,0,0.4)] relative overflow-hidden mx-4">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/old-map.png')" }} />
                
                <div className="relative z-10 space-y-8">
                  <div className="flex flex-col items-center space-y-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.5 }}
                    >
                      <Scroll size={40} className="text-amber-800/50" />
                    </motion.div>
                    <span className="font-sans text-[11px] uppercase tracking-[0.6em] text-amber-800/70 font-black">Official Destiny Decree</span>
                  </div>

                  <h2 className="font-title text-4xl md:text-6xl text-amber-950 leading-tight">
                    {SORTING_QUIZ.archetypes[result].title}
                  </h2>

                  <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-amber-900/20 to-transparent mx-auto" />

                  <p className="font-script text-2xl md:text-3xl text-amber-950/90 leading-relaxed px-2">
                    {SORTING_QUIZ.archetypes[result].description}
                  </p>

                  <div className="pt-8 mt-4 border-t border-amber-900/10">
                    <p className="font-serif italic text-xl text-amber-800/80 max-w-sm mx-auto leading-snug">
                      "{SORTING_QUIZ.archetypes[result].quote}"
                    </p>
                  </div>

                  <div className="flex justify-center gap-6 mt-10">
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: -180 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={reset}
                      className="p-4 bg-amber-50 text-amber-900/40 hover:text-amber-900 rounded-full transition-all border border-amber-100"
                      title="Sort Again"
                    >
                      <RotateCcw size={24} />
                    </motion.button>
                  </div>
                </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="mt-12 space-y-4"
              >
                <div className="text-amber-500/60 font-title text-xs uppercase tracking-[0.4em]">The Magic of the 20s has been Declared</div>
                <button 
                  onClick={onBack}
                  className="px-8 py-3 bg-amber-500 text-black rounded-full font-title flex items-center gap-2 mx-auto shadow-lg"
                >
                  <Home size={18} /> Return Home
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SortingHatQuiz;