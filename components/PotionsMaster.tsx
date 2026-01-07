
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, FlaskConical, RotateCcw, Home, Utensils, Shirt, Gem, 
  User, MapPin, BookOpen, Star, Flame, Cloud, Moon, Music, Zap, Waves, Wand2 
} from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  glow: string;
  essence: string;
}

const INGREDIENTS: Ingredient[] = [
  { id: '1', name: "Muffin Dash", icon: Utensils, color: "#60a5fa", glow: "rgba(96,165,250,0.5)", essence: "Sweetness and comforting warmth." },
  { id: '2', name: "Silk Thread", icon: Shirt, color: "#fb7185", glow: "rgba(251,113,133,0.5)", essence: "Grace and timeless tradition." },
  { id: '3', name: "Jhumka", icon: Gem, color: "#fbbf24", glow: "rgba(251,191,36,0.5)", essence: "Joyful rhythms and festive sparkle." },
  { id: '4', name: "Cinema Magic", icon: User, color: "#78716c", glow: "rgba(120,113,108,0.5)", essence: "Deep emotion and grand romance." },
  { id: '5', name: "Kolkata Charm", icon: MapPin, color: "#fb923c", glow: "rgba(251,146,60,0.5)", essence: "Roots that grow deep and strong." },
  { id: '6', name: "Storybook", icon: BookOpen, color: "#34d399", glow: "rgba(52,211,153,0.5)", essence: "Infinite imagination and wisdom." },
  { id: '7', name: "Starlight", icon: Star, color: "#a5b4fc", glow: "rgba(165,180,252,0.5)", essence: "Guidance through the darkest nights." },
  { id: '8', name: "Phoenix Flame", icon: Flame, color: "#ef4444", glow: "rgba(239,68,68,0.5)", essence: "Resilience and the power of rebirth." },
  { id: '9', name: "Morning Mist", icon: Cloud, color: "#ccfbf1", glow: "rgba(204,251,241,0.5)", essence: "Fresh beginnings and clear vision." },
  { id: '10', name: "Full Moon", icon: Moon, color: "#a78bfa", glow: "rgba(167,139,250,0.5)", essence: "Deep reflection and hidden dreams." },
  { id: '11', name: "Golden Record", icon: Music, color: "#f472b6", glow: "rgba(244,114,182,0.5)", essence: "A life lived in harmony and song." },
  { id: '12', name: "Arcane Spark", icon: Zap, color: "#fde047", glow: "rgba(253,224,71,0.5)", essence: "The drive to reach for the impossible." },
];

const PROPHECIES = [
  "Your 20s will be a blend of profound success and simple joys, tasting like the finest potion ever brewed.",
  "Expect a decade where your heritage fuels your future, creating a magic that is uniquely yours.",
  "The stars align to bring you laughter as loud as a Mandrake's cry, but as sweet as a Canary Cream.",
  "You are destined for adventures that write themselves into legends, powered by the ingredients of your heart.",
  "A golden light follows your path, turning every obstacle into a stepping stone toward your dreams.",
  "The elixir hums with the promise of deep connections; your 20s will be defined by the people who call you 'home'.",
  "A rare clarity settles over your future—choices made with your heart will lead to a crown of starlight.",
  "This potion glows with the fire of resilience; no matter the challenge, you will emerge brighter and bolder.",
  "The scent of the sea and the whispers of old books suggest a decade of travel—both of the world and the mind.",
  "An unexpected harmony awaits; the different parts of your life will finally click into a masterpiece of joy.",
  "Your creativity will overflow like this cauldron, painting the next ten years in colors the world hasn't seen yet.",
  "A steady, warm light accompanies your destiny, ensuring that your kindness becomes your greatest strength."
];

const CauldronSVG: React.FC<{ isBrewing: boolean; isLit: boolean; selected: Ingredient[] }> = ({ isBrewing, isLit, selected }) => {
  // Dynamic liquid color based on selected ingredients
  const mixedColor = selected.length > 0 
    ? selected[selected.length - 1].color 
    : '#f59e0b';

  return (
    <div className="relative w-56 h-56 md:w-72 md:h-72 mx-auto">
      {/* Immersive Magical Fog */}
      <AnimatePresence>
        {isLit && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.5 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-amber-500/10 blur-[80px] rounded-full -z-10"
          />
        )}
      </AnimatePresence>

      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_25px_40px_rgba(0,0,0,0.7)]">
        {/* Legs */}
        <path d="M55 165 L45 190 M145 165 L155 190" stroke="#121212" strokeWidth="10" strokeLinecap="round" />
        {/* Main Cauldron Body */}
        <path d="M25 80 Q25 180 100 180 Q175 180 175 80 L175 60 Q175 40 100 40 Q25 40 25 60 Z" fill="#1a1a1a" />
        <path d="M25 60 Q25 85 100 85 Q175 85 175 60 Q175 40 100 40 Q25 40 25 60 Z" fill="#252525" stroke="#000" strokeWidth="2" />
        
        {/* Dark Inner Hole */}
        <ellipse cx="100" cy="60" rx="68" ry="18" fill="#000" />
        
        {/* Liquid Layer */}
        {isLit && (
          <motion.ellipse 
            animate={{ 
              opacity: [0.3, 0.7, 0.3],
              rx: [63, 65, 63],
              ry: [14, 16, 14]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            cx="100" cy="60" rx="65" ry="15" 
            fill={mixedColor}
            style={{ filter: 'blur(5px)', opacity: 0.4 }}
          />
        )}

        {/* Subtle Rim Shine */}
        <path d="M30 60 Q30 75 100 75 Q170 75 170 60" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
      </svg>

      {/* Floating Icons Glimpse (brewing phase) */}
      <AnimatePresence>
        {isBrewing && (
          <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[60%] h-[10%] pointer-events-none">
             {selected.map((ing, i) => {
                const Icon = ing.icon;
                return (
                  <motion.div
                    key={`float-icon-${ing.id}`}
                    initial={{ opacity: 0, scale: 0, y: 10 }}
                    animate={{ 
                      opacity: [0, 1, 0], 
                      scale: [0.5, 1.2, 0.5],
                      y: [-10, -50],
                      x: (i - 1) * 30,
                      rotate: [0, 360]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.8 }}
                    className="absolute"
                  >
                    <Icon size={24} style={{ color: ing.color, filter: `drop-shadow(0 0 5px ${ing.glow})` }} />
                  </motion.div>
                );
             })}
          </div>
        )}
      </AnimatePresence>

      {/* Better Steam and Rising Sparkles */}
      {isLit && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 pointer-events-none overflow-visible">
           {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [-10, -150],
                  x: [(i - 3.5) * 15, (i - 3.5) * 25],
                  opacity: [0, 0.4, 0],
                  scale: [0.5, 2, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full blur-xl"
                style={{ backgroundColor: mixedColor }}
              />
           ))}
        </div>
      )}

      {/* Fire beneath the cauldron */}
      {isLit && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1 pointer-events-none items-end">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                height: [15, 45, 20],
                opacity: [0.4, 0.9, 0.4]
              }}
              transition={{ duration: 0.3 + Math.random() * 0.2, repeat: Infinity, delay: i * 0.05 }}
              className="w-3 rounded-t-full blur-md"
              style={{ backgroundColor: i % 2 === 0 ? '#f97316' : '#fbbf24' }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const PotionsMaster: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [step, setStep] = useState<'intro' | 'shelf' | 'stirring' | 'reveal'>('intro');
  const [selected, setSelected] = useState<Ingredient[]>([]);
  const [stirProgress, setStirProgress] = useState(0);
  const [prophecy, setProphecy] = useState("");
  const [isCauldronLit, setIsCauldronLit] = useState(false);

  const startBrewing = () => setStep('shelf');

  const addIngredient = (ing: Ingredient) => {
    if (selected.length < 3 && !selected.find(i => i.id === ing.id)) {
      setSelected([...selected, ing]);
    }
  };

  const removeIngredient = (id: string) => {
    setSelected(selected.filter(i => i.id !== id));
  };

  const initiateBrew = () => {
    setIsCauldronLit(true);
    setTimeout(() => setStep('stirring'), 1500);
  };

  useEffect(() => {
    if (step === 'stirring') {
      const interval = setInterval(() => {
        setStirProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // Deterministic hash for variety
            const hash = selected.reduce((acc, ing) => acc + parseInt(ing.id), 0);
            const index = hash % PROPHECIES.length;
            setProphecy(PROPHECIES[index]);
            setTimeout(() => {
              setStep('reveal');
              setIsCauldronLit(false);
            }, 1000);
            return 100;
          }
          return prev + 1.2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [step, selected]);

  const reset = () => {
    setStep('intro');
    setSelected([]);
    setStirProgress(0);
    setProphecy("");
    setIsCauldronLit(false);
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-amber-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(60,30,10,0.6)_0%,transparent_70%)]" />
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -80, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.5, 1]
            }}
            transition={{ duration: 5 + Math.random() * 6, repeat: Infinity }}
            className="absolute w-1 h-1 bg-amber-500 rounded-full blur-[1px]"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center space-y-8"
            >
              <div className="w-40 h-40 mx-auto bg-amber-500/5 rounded-full flex items-center justify-center border border-amber-500/20 shadow-[0_0_50px_rgba(251,191,36,0.1)]">
                <FlaskConical size={80} className="text-amber-500 animate-pulse" />
              </div>
              <div className="space-y-4">
                <h1 className="font-magic text-4xl md:text-6xl text-amber-500 glow-yellow">The Potions Master</h1>
                <p className="font-script text-2xl text-amber-100/60 leading-relaxed max-w-md mx-auto">
                  Brew a unique elixir for your 20s. Distill your heritage and your dreams into one potent destiny.
                </p>
              </div>
              <div className="flex flex-col gap-4 items-center">
                <button
                  onClick={startBrewing}
                  className="px-14 py-5 bg-amber-500 text-black font-title text-xl rounded-full shadow-[0_10px_40px_rgba(251,191,36,0.4)] hover:bg-amber-400 transition-all hover:scale-105 active:scale-95"
                >
                  Enter the Dungeon ✨
                </button>
                <button onClick={onBack} className="text-amber-400/30 font-title uppercase tracking-[0.4em] text-[10px] py-4 hover:text-amber-400">
                  Return to Common Room
                </button>
              </div>
            </motion.div>
          )}

          {step === 'shelf' && (
            <motion.div
              key="shelf"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, filter: "blur(20px)" }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="font-title text-2xl text-amber-400 uppercase tracking-[0.2em] mb-1">Cabinet of Essences</h2>
                <p className="font-script text-lg text-amber-100/30 italic">Infuse your cauldron with three magical elements</p>
              </div>

              {/* Central Cauldron Area */}
              <div className="relative py-4">
                 <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-5 z-50">
                    {[...Array(3)].map((_, i) => {
                      const item = selected[i];
                      const Icon = item?.icon;
                      return (
                        <motion.div 
                          key={i} 
                          className={`w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-dashed flex items-center justify-center bg-black/40 backdrop-blur-md transition-all ${item ? 'border-amber-500/50 shadow-[0_0_15px_rgba(251,191,36,0.2)]' : 'border-amber-500/10'}`}
                        >
                          {item && Icon && (
                            <motion.div 
                              initial={{ scale: 0, rotate: -180 }} 
                              animate={{ scale: 1, rotate: 0 }}
                              onClick={() => removeIngredient(item.id)}
                              className="cursor-pointer"
                            >
                               <Icon size={24} style={{ color: item.color }} />
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                 </div>
                 
                 <CauldronSVG isBrewing={false} isLit={selected.length === 3} selected={selected} />
              </div>

              {/* Shelf Grid (Icons Only) */}
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {INGREDIENTS.map((ing) => {
                  const isSelected = selected.find(i => i.id === ing.id);
                  const Icon = ing.icon;
                  return (
                    <motion.button
                      key={ing.id}
                      whileHover={!isSelected && selected.length < 3 ? { scale: 1.1, backgroundColor: 'rgba(255,255,255,0.05)' } : {}}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addIngredient(ing)}
                      disabled={!!isSelected || selected.length >= 3}
                      className={`relative h-20 md:h-24 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all group ${
                        isSelected 
                        ? 'border-amber-500 bg-amber-500/20 shadow-[0_0_20px_rgba(251,191,36,0.2)]' 
                        : 'border-white/5 bg-white/[0.02] hover:border-amber-500/40'
                      }`}
                    >
                      <Icon 
                        size={28} 
                        className={`transition-all duration-500 ${isSelected ? 'scale-110' : 'opacity-40 group-hover:opacity-100 group-hover:scale-110'}`} 
                        style={{ color: isSelected ? ing.color : 'white' }}
                      />
                      <span className={`text-[8px] uppercase font-title tracking-widest text-center px-1 leading-tight ${isSelected ? 'text-amber-200' : 'text-white/20 group-hover:text-white/60'}`}>
                        {ing.name}
                      </span>
                      {isSelected && (
                         <div className="absolute top-1.5 right-1.5">
                            <Sparkles size={8} className="text-amber-400" />
                         </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex justify-center pt-2">
                <AnimatePresence>
                  {selected.length === 3 && (
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={initiateBrew}
                      disabled={isCauldronLit}
                      className="px-14 py-4 bg-amber-500 text-black font-title text-xl rounded-full shadow-[0_0_50px_rgba(251,191,36,0.6)] flex items-center gap-3 active:scale-95 group"
                    >
                       <span>Stir the Magic</span>
                       <RotateCcw size={20} className="group-hover:rotate-180 transition-transform duration-700" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {step === 'stirring' && (
            <motion.div
              key="stirring"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center space-y-12"
            >
              <CauldronSVG isBrewing={true} isLit={true} selected={selected} />

              <div className="w-full max-w-xs space-y-4">
                <div className="flex justify-between items-center text-[10px] uppercase font-title text-amber-500/50 tracking-[0.3em]">
                   <span>Alchemy: {Math.round(stirProgress)}%</span>
                   <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }}>Brewing Destiny...</motion.span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stirProgress}%` }}
                    className="h-full bg-gradient-to-r from-amber-600 to-amber-400"
                    style={{ boxShadow: '0 0 15px rgba(251,191,36,0.5)' }}
                  />
                </div>
                
                <div className="flex justify-center gap-5 mt-6">
                  {selected.map((ing, idx) => {
                    const Icon = ing.icon;
                    return (
                      <motion.div
                        key={ing.id}
                        animate={{ 
                          y: [0, -15, 0],
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          delay: idx * 0.6
                        }}
                        className="p-3 rounded-full border border-amber-500/20 bg-amber-500/5"
                      >
                        <Icon size={20} style={{ color: ing.color }} />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {step === 'reveal' && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-10 flex flex-col items-center"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="w-56 h-56 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-amber-700 p-1 shadow-[0_0_100px_rgba(251,191,36,0.25)] relative"
              >
                <div className="w-full h-full rounded-full bg-[#05070a] flex items-center justify-center overflow-hidden relative border-8 border-black/60 shadow-inner">
                   <div className="absolute inset-0 bg-amber-500/10 blur-3xl" />
                   <Sparkles size={64} className="text-amber-500 animate-pulse" />
                   <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                </div>
                
                {/* Floating particles */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [-30, 30],
                      x: [-30, 30],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 4 + Math.random() * 3,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                  />
                ))}
              </motion.div>

              <div className="space-y-6 w-full">
                <div className="space-y-2">
                   <h2 className="font-magic text-3xl md:text-5xl text-amber-500 glow-yellow leading-tight">Your 20s Elixir</h2>
                   <p className="text-[10px] uppercase font-title tracking-[0.6em] text-amber-500/30 font-bold">A Masterpiece of Fate</p>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="p-10 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-3xl relative overflow-hidden shadow-2xl"
                >
                   <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
                   <p className="font-script text-2xl md:text-3xl text-amber-50 leading-relaxed italic relative z-10 px-4 drop-shadow-lg">
                     "{prophecy}"
                   </p>
                   
                   <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex justify-around items-center">
                      <Wand2 size={100} />
                      <Waves size={100} />
                   </div>
                </motion.div>

                <div className="flex flex-col gap-4 mt-12">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={reset}
                    className="px-14 py-5 bg-amber-500 text-black font-title text-xl rounded-full shadow-2xl flex items-center justify-center gap-3 transition-shadow hover:shadow-amber-500/30"
                  >
                    <RotateCcw size={20} /> Brew Another
                  </motion.button>
                  <button onClick={onBack} className="text-amber-400/40 font-title uppercase tracking-widest text-[10px] py-2 hover:text-amber-400 flex items-center justify-center gap-2 transition-colors">
                    <Home size={14} /> Back to the Common Room
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PotionsMaster;
