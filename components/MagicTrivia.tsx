import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw, Sparkles, CheckCircle2, XCircle, Star, GraduationCap, Home } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  fact: string;
}

const TRIVIA_POOL: Question[] = [
  {
    id: 1,
    question: "What is the core of Harry Potter's first wand?",
    options: ["Dragon Heartstring", "Unicorn Hair", "Phoenix Feather", "Veela Hair"],
    correct: 2,
    fact: "Both Harry and Voldemort's wands contained feathers from Fawkes, Dumbledore's phoenix!"
  },
  {
    id: 2,
    question: "Which house does Luna Lovegood belong to?",
    options: ["Gryffindor", "Ravenclaw", "Hufflepuff", "Slytherin"],
    correct: 1,
    fact: "Luna is a proud Ravenclaw, known for her unique perspective and wisdom."
  },
  {
    id: 3,
    question: "What is the incantation for the Patronus Charm?",
    options: ["Expecto Patronum", "Expelliarmus", "Accio", "Lumos Solem"],
    correct: 0,
    fact: "It's one of the most powerful defensive charms, powered by your happiest memory."
  },
  {
    id: 4,
    question: "What animal can Professor McGonall transform into?",
    options: ["A Tabby Cat", "An Owl", "A Phoenix", "A Stag"],
    correct: 0,
    fact: "She is a registered Animagus, marked by spectacle-shaped markings around her eyes."
  },
  {
    id: 5,
    question: "How many Horcruxes did Voldemort intentionally create?",
    options: ["Six", "Seven", "Eight", "Five"],
    correct: 0,
    fact: "He intended to split his soul into seven pieces, but Harry became the accidental eighth."
  },
  {
    id: 6,
    question: "What color is the blood of a Unicorn?",
    options: ["Golden", "Silver", "Pure White", "Crimson"],
    correct: 1,
    fact: "Unicorn blood is silver and can keep a person alive, but at a terrible price."
  },
  {
    id: 7,
    question: "Which of these is NOT a Marauder?",
    options: ["Moony", "Padfoot", "Prongs", "Snivellus"],
    correct: 3,
    fact: "Snivellus was the derogatory nickname James and Sirius gave to Severus Snape."
  },
  {
    id: 8,
    question: "What is the name of Hagrid's giant three-headed dog?",
    options: ["Norbert", "Buckbeak", "Fluffy", "Fang"],
    correct: 2,
    fact: "Fluffy was used to guard the trapdoor leading to the Philosopher's Stone."
  },
  {
    id: 10,
    question: "What did Dumbledore see in the Mirror of Erised?",
    options: ["Himself holding socks", "His family whole and happy", "The Elder Wand", "Grindelwald"],
    correct: 0,
    fact: "He claimed to see socks, but he actually saw his family reunited, much like Harry."
  }
];

const MagicTrivia: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [gameState, setGameState] = useState<'intro' | 'quiz' | 'results'>('intro');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const shuffled = [...TRIVIA_POOL].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 10));
  }, []);

  const handleAnswer = (idx: number) => {
    if (isLocked) return;
    setSelectedAnswer(idx);
    setIsLocked(true);
    
    if (idx === questions[currentIdx].correct) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      if (currentIdx < questions.length - 1) {
        setCurrentIdx(c => c + 1);
        setSelectedAnswer(null);
        setIsLocked(false);
      } else {
        setGameState('results');
      }
    }, 1500);
  };

  const getRank = () => {
    if (score === 10) return { title: "Order of the Phoenix", desc: "You are a master of magic, Sneha! Dumbledore would be proud." };
    if (score >= 8) return { title: "Head Girl", desc: "Brilliant mind! You've mastered your NEWTs with flying colors." };
    if (score >= 5) return { title: "Prefect", desc: "Very good! You have a solid grasp of the wizarding world." };
    return { title: "Muggle-born", desc: "The magic is still waking up in you. Time for some extra Herbology!" };
  };

  const resetGame = () => {
    const shuffled = [...TRIVIA_POOL].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 10));
    setCurrentIdx(0);
    setScore(0);
    setGameState('quiz');
    setSelectedAnswer(null);
    setIsLocked(false);
  };

  return (
    <div className="min-h-screen bg-[#0c0e14] text-amber-50 py-12 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]" />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.1, 0.4, 0.1], scale: [1, 1.2, 1] }}
            transition={{ duration: 4 + i % 3, repeat: Infinity }}
            className="absolute text-amber-400"
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
          >
            <Star size={12} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {gameState === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="z-10 text-center max-w-xl flex flex-col items-center"
          >
            <div className="mb-12 p-8 bg-amber-500/10 rounded-full border border-amber-500/30">
              <Sparkles size={64} className="text-amber-400 animate-pulse" />
            </div>
            <h1 className="font-magic text-4xl md:text-6xl text-amber-400 mb-6 glow-yellow">Wizarding Trivia</h1>
            <p className="font-script text-2xl text-amber-100/70 mb-12 leading-relaxed">
              Step forward, Sneha. Are you truly a master of the magical arts?
            </p>
            <div className="flex flex-col gap-4 w-full max-w-sm">
              <button
                onClick={() => setGameState('quiz')}
                className="px-12 py-5 bg-amber-500 text-black font-title text-xl rounded-full shadow-2xl hover:bg-amber-400 transition-all flex items-center justify-center gap-3 group"
              >
                Begin <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button onClick={onBack} className="text-amber-400/50 font-title uppercase tracking-widest text-xs hover:text-amber-400 py-4">
                Return Home
              </button>
            </div>
          </motion.div>
        )}

        {gameState === 'quiz' && (
          <motion.div
            key={`q-${currentIdx}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="z-10 w-full max-w-2xl"
          >
            <div className="mb-12">
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-amber-500 shadow-lg"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-4 text-[10px] font-title uppercase tracking-widest text-amber-500/50">
                <span>Question {currentIdx + 1} of {questions.length}</span>
                <span>Score: {score}</span>
              </div>
            </div>

            <div className="bg-[#1a1d26] p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-2xl">
              <h2 className="font-title text-xl md:text-2xl text-amber-50 leading-snug mb-10 text-center">
                {questions[currentIdx]?.question}
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {questions[currentIdx]?.options.map((option, i) => {
                  const isCorrect = i === questions[currentIdx].correct;
                  const isSelected = selectedAnswer === i;
                  let borderColor = "border-white/10";
                  let bgColor = "bg-white/5";

                  if (isLocked) {
                    if (isCorrect) { borderColor = "border-emerald-500/50"; bgColor = "bg-emerald-500/10"; }
                    else if (isSelected) { borderColor = "border-rose-500/50"; bgColor = "bg-rose-500/10"; }
                  }

                  return (
                    <button
                      key={i}
                      disabled={isLocked}
                      onClick={() => handleAnswer(i)}
                      className={`w-full p-5 rounded-2xl border text-left font-sans transition-all flex items-center justify-between ${borderColor} ${bgColor}`}
                    >
                      <span className="text-sm md:text-base">{option}</span>
                      <AnimatePresence>
                        {isLocked && isCorrect && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0, rotate: -45 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                            className="text-emerald-400"
                          >
                            <CheckCircle2 size={18} />
                          </motion.div>
                        )}
                        {isLocked && isSelected && !isCorrect && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0, rotate: 45 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                            className="text-rose-400"
                          >
                            <XCircle size={18} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  );
                })}
              </div>

              {isLocked && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 pt-8 border-t border-white/5 text-center">
                  <p className="font-script text-xl text-amber-400/60 italic leading-snug">
                    "{questions[currentIdx]?.fact}"
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {gameState === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-10 text-center max-w-xl"
          >
            <div className="mb-10 flex justify-center">
              <div className="p-10 bg-amber-500/10 rounded-full border border-amber-500/30">
                <GraduationCap size={80} className="text-amber-400" />
              </div>
            </div>

            <div className="space-y-4 mb-12">
              <h1 className="font-magic text-4xl md:text-6xl text-amber-400 glow-yellow">{getRank().title}</h1>
              <p className="text-amber-500/80 font-title uppercase tracking-widest text-sm">Your Final Score: {score} / 10</p>
              <p className="font-script text-3xl text-amber-100/80 leading-relaxed px-6">
                {getRank().desc}
              </p>
            </div>

            <div className="flex flex-col gap-4 items-center">
              <button
                onClick={resetGame}
                className="w-full max-w-sm py-5 bg-amber-500 text-black font-title rounded-full shadow-xl flex items-center justify-center gap-3"
              >
                <RotateCcw size={20} /> Re-take Quiz
              </button>
              <button
                onClick={onBack}
                className="w-full max-w-sm py-5 bg-white/5 text-amber-400 font-title rounded-full border border-amber-400/20 flex items-center justify-center gap-3"
              >
                <Home size={20} /> Return Home
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MagicTrivia;