
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Wand2, Heart, Music, Star, ChevronDown, Volume2, VolumeX, Utensils, Home, MapPin, Gem, Shirt, User, Sparkles as SparklesIcon } from 'lucide-react';
import { SNEHA_PHOTOS, FAVORITE_SONGS, HOBBIES, HER_FOOD, HER_PLACES, HER_ATTIRE, HER_ACTORS, BACKGROUND_MUSIC_URL } from './constants';
import Sparkles from './components/Sparkles';
import EnchantedEnvelope from './components/EnchantedEnvelope';
import DailyProphet from './components/DailyProphet';
import MagicalGallery from './components/MagicalGallery';
import PensieveMemories from './components/PensieveMemories';

// --- Sub-component: MagicalItem ---
const MagicalItem: React.FC<{ title: string; subtitle?: string; icon: React.ReactNode; index: number }> = ({ title, subtitle, icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      viewport={{ once: true }}
      className="relative p-4 rounded-xl bg-amber-50/60 border border-amber-100 shadow-sm overflow-hidden group mb-3"
    >
      <div className="flex items-center gap-3 relative z-10">
        <div className="p-2 bg-white rounded-full text-amber-500 shadow-sm group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-title text-[13px] text-amber-900 leading-tight">
            {title}
          </span>
          {subtitle && (
            <span className="text-[9px] uppercase tracking-widest text-amber-600/70 font-sans font-bold mt-0.5 italic">
              ({subtitle})
            </span>
          )}
        </div>
      </div>
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.06, 0.03] }}
        transition={{ repeat: Infinity, duration: 4 + index, ease: "easeInOut" }}
        className="absolute -top-1 -right-1 text-amber-300 pointer-events-none"
      >
        {React.cloneElement(icon as React.ReactElement, { size: 32 })}
      </motion.div>
    </motion.div>
  );
};

// --- Sub-component: SnapCard ---
const SnapCard: React.FC<{ 
  title: string; 
  icon: React.ReactNode; 
  children: React.ReactNode;
}> = ({ title, icon, children }) => {
  return (
    <div className="flex-shrink-0 snap-center py-10 px-4">
      <div className="w-[85vw] md:w-[400px] h-[540px] bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(180,120,0,0.15)] border border-amber-100 p-8 flex flex-col relative overflow-hidden transition-all duration-300">
        <div className="flex items-center gap-3 font-title text-amber-700 text-base mb-6 pb-4 border-b border-amber-50 relative z-10">
          <div className="text-amber-500 p-2 bg-amber-50 rounded-full">{icon}</div>
          <span>{title}</span>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative z-10">
          {children}
        </div>

        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50/50 rounded-bl-full -mr-10 -mt-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-50/50 rounded-tr-full -ml-8 -mb-8 pointer-events-none" />
      </div>
    </div>
  );
};

// --- Main App Component ---
const App: React.FC = () => {
  const [isAppStarted, setIsAppStarted] = useState(false);
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);
  
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const muteBtnRef = useRef<HTMLButtonElement | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const audio = bgAudioRef.current;
    if (!audio || !isAppStarted) return;
    if (isMusicEnabled) {
      audio.play().catch(err => { if (err.name !== 'AbortError') console.warn(err); });
    } else {
      audio.pause();
    }
  }, [isMusicEnabled, isAppStarted]);

  useEffect(() => {
    if (!isAppStarted) return;
    const btn = muteBtnRef.current;
    if (!btn) return;
    const handleToggle = (e: any) => {
      e.stopPropagation(); e.preventDefault();
      setIsMusicEnabled(prev => !prev);
    };
    btn.addEventListener('click', handleToggle);
    btn.addEventListener('touchend', handleToggle);
    return () => {
      btn.removeEventListener('click', handleToggle);
      btn.removeEventListener('touchend', handleToggle);
    };
  }, [isAppStarted]);

  const startMagic = () => {
    setIsAppStarted(true); setIsMusicEnabled(true);
    if (bgAudioRef.current) {
      bgAudioRef.current.volume = 0.4; bgAudioRef.current.load(); bgAudioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFFBEB] text-amber-900 font-sans select-none overflow-x-hidden">
      <Sparkles />
      
      <audio 
        ref={bgAudioRef} 
        src={BACKGROUND_MUSIC_URL}
        loop preload="auto" crossOrigin="anonymous"
      />

      <AnimatePresence>
        {!isAppStarted && (
          <motion.div 
            initial={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-amber-50 px-6"
            onClick={startMagic}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-amber-500 mb-8"
            >
              <Star size={84} fill="currentColor" className="glow-yellow" />
            </motion.div>
            <h2 className="font-magic text-2xl text-amber-600 mb-12 text-center max-w-sm leading-relaxed">
              A little birthday magic is waiting for you...
            </h2>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="px-12 py-5 bg-amber-400 text-white rounded-full font-title text-xl shadow-2xl glow-yellow border-b-4 border-amber-600"
            >
              Enter the Magic ✨
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {isAppStarted && (
        <div className="fixed top-6 right-6 z-[900]">
          <div className="relative w-14 h-14">
            {isMusicEnabled && (
              <motion.div
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                className="absolute inset-0 bg-amber-400 rounded-full"
              />
            )}
            <motion.button
              ref={muteBtnRef}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              className={`absolute inset-0 rounded-full shadow-2xl transition-colors flex items-center justify-center cursor-pointer z-10 ${
                isMusicEnabled ? 'bg-amber-400 text-white' : 'bg-white text-amber-400 border border-amber-100'
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div key={isMusicEnabled ? 'on' : 'off'} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                  {isMusicEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      )}

      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-amber-400 z-[60] origin-left" style={{ scaleX }} />

      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="z-20">
          <h1 className="font-magic text-5xl md:text-7xl text-amber-500 glow-yellow mb-4 leading-tight">
            Happy Birthday,<br/>Sneha ✨
          </h1>
          <p className="text-lg md:text-xl font-title text-amber-700/80 mb-2">Every once in a while, magic is real.</p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="px-8 py-3 bg-amber-400 text-white rounded-full font-title shadow-lg flex items-center gap-2 mx-auto"
          >
            Explore the Magic <ChevronDown size={18} />
          </motion.button>
        </motion.div>
      </section>

      <MagicalGallery />

      <EnchantedEnvelope />

      <DailyProphet />

      {/* New Pensieve Section */}
      <PensieveMemories />

      {/* SNEHA'S MAGICAL WORLD: UNIFORM LARGE SIDE-BY-SIDE CARDS */}
      <section className="py-32 bg-amber-50/40 relative z-10 overflow-hidden">
        <h2 className="text-center font-magic text-3xl md:text-4xl mb-6 text-amber-600 px-6">Sneha's Magical World</h2>
        
        <div 
          style={{ 
            paddingInline: "var(--scroll-padding)",
            scrollPaddingInline: "var(--scroll-padding)"
          }}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 custom-scrollbar-hide pb-20 scroll-smooth items-center min-h-[620px] [--scroll-padding:7.5vw] md:[--scroll-padding:calc(50%-200px)]"
        >
          <SnapCard title="Favorite Songs" icon={<Music size={20} />}>
            {FAVORITE_SONGS.map((song, idx) => (
              <MagicalItem key={song.id} title={song.title} subtitle={song.artist} icon={<Music size={16} />} index={idx} />
            ))}
          </SnapCard>

          <SnapCard title="Her Hobbies" icon={<Wand2 size={20} />}>
            {HOBBIES.map((h, idx) => (
              <MagicalItem key={h.name} title={h.name} icon={h.icon} index={idx} />
            ))}
          </SnapCard>

          <SnapCard title="Her Food" icon={<Utensils size={20} />}>
            {HER_FOOD.map((f, idx) => (
              <MagicalItem key={f.name} title={f.name} subtitle={f.subtitle} icon={f.icon} index={idx} />
            ))}
          </SnapCard>

          <SnapCard title="Her Places" icon={<Home size={20} />}>
            {HER_PLACES.map((p, idx) => (
              <MagicalItem key={p.name} title={p.name} icon={p.icon} index={idx} />
            ))}
          </SnapCard>

          <SnapCard title="Her Attire" icon={<Gem size={20} />}>
            {HER_ATTIRE.map((a, idx) => (
              <MagicalItem key={a.name} title={a.name} icon={a.icon} index={idx} />
            ))}
          </SnapCard>

          <SnapCard title="Her Actors" icon={<User size={20} />}>
            {HER_ACTORS.map((ac, idx) => (
              <MagicalItem key={ac.name} title={ac.name} icon={ac.icon} index={idx} />
            ))}
          </SnapCard>
        </div>
        
        <p className="text-center text-amber-800/40 text-[10px] uppercase tracking-widest -mt-10">Swipe to explore each piece of magic ✨</p>
      </section>

      <section className="h-screen flex flex-col items-center justify-center text-center px-8 relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="space-y-6">
          <h2 className="font-magic text-4xl text-amber-500 glow-yellow pt-8">Happy Birthday,<br/>Sunshine ✨</h2>
          <Heart className="mx-auto text-amber-500 animate-pulse mt-6" fill="currentColor" size={32} />
        </motion.div>
      </section>

      <footer className="py-10 text-center text-amber-800/30 text-[10px] tracking-[0.3em] uppercase relative z-10 font-sans">
        Handcrafted with magic for Sneha • 2024
      </footer>
      
      <style>{`
        .custom-scrollbar-hide::-webkit-scrollbar { display: none; }
        .custom-scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #fde68a; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default App;
