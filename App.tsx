
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Wand2, Heart, Music, Star, ChevronDown, Volume2, VolumeX, Utensils, Home, Gem, User, LucideIcon, BrainCircuit, GraduationCap, FlaskConical, Eye } from 'lucide-react';
import { FAVORITE_SONGS, HOBBIES, HER_FOOD, HER_PLACES, BACKGROUND_MUSIC_URL } from './constants';
import Sparkles from './components/Sparkles';
import EnchantedEnvelope from './components/EnchantedEnvelope';
import DailyProphet from './components/DailyProphet';
import MagicalGallery from './components/MagicalGallery';
import PensieveMemories from './components/PensieveMemories';
import Navigation from './components/Navigation';
import MagicTrivia from './components/MagicTrivia';
import SortingHatQuiz from './components/SortingHatQuiz';
import PotionsMaster from './components/PotionsMaster';
import MirrorOfErised from './components/MirrorOfErised';
import DumbledoresOffice from './components/DumbledoresOffice';

const MagicalItem: React.FC<{ title: string; subtitle?: string; icon: LucideIcon; index: number }> = ({ title, subtitle, icon: Icon, index }) => {
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
          <Icon size={16} />
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
    </motion.div>
  );
};

const SnapCard: React.FC<{ 
  title: string; 
  icon: LucideIcon; 
  children: React.ReactNode;
}> = ({ title, icon: Icon, children }) => {
  return (
    <div className="flex-shrink-0 snap-center py-10 px-4">
      <div className="w-[85vw] md:w-[400px] h-[540px] bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(180,120,0,0.15)] border border-amber-100 p-8 flex flex-col relative overflow-hidden transition-all duration-300">
        <div className="flex items-center gap-3 font-title text-amber-700 text-base mb-6 pb-4 border-b border-amber-50 relative z-10">
          <div className="text-amber-500 p-2 bg-amber-50 rounded-full">
            <Icon size={20} />
          </div>
          <span>{title}</span>
        </div>
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isAppStarted, setIsAppStarted] = useState(false);
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'trivia' | 'sorting' | 'potions' | 'mirror' | 'office'>('home');
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const audio = bgAudioRef.current;
    if (!audio || !isAppStarted) return;
    if (isMusicEnabled) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isMusicEnabled, isAppStarted]);

  const toggleMusic = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMusicEnabled(prev => !prev);
  };

  const startMagic = () => {
    setIsAppStarted(true); 
    setIsMusicEnabled(true);
    if (bgAudioRef.current) {
      bgAudioRef.current.volume = 0.4;
      bgAudioRef.current.play().catch(() => {});
    }
  };

  const handleNavigate = (id: string) => {
    if (id === 'trivia') setCurrentView('trivia');
    else if (id === 'sorting') setCurrentView('sorting');
    else if (id === 'potions') setCurrentView('potions');
    else if (id === 'mirror') setCurrentView('mirror');
    else if (id === 'office') setCurrentView('office');
    else {
      setCurrentView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFFBEB] text-amber-900 font-sans select-none overflow-x-hidden">
      <Sparkles />
      <audio ref={bgAudioRef} src={BACKGROUND_MUSIC_URL} loop preload="auto" crossOrigin="anonymous" />

      {isAppStarted && <Navigation onNavigate={handleNavigate} activeId={currentView} />}

      <AnimatePresence>
        {!isAppStarted && (
          <motion.div 
            initial={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-amber-50 px-6 cursor-pointer"
            onClick={startMagic}
          >
            <Star size={84} className="text-amber-500 mb-8 animate-pulse" fill="currentColor" />
            <h2 className="font-magic text-2xl text-amber-600 mb-12 text-center leading-relaxed">
              A little birthday magic is waiting for you...
            </h2>
            <button className="px-12 py-5 bg-amber-400 text-white rounded-full font-title text-xl shadow-2xl">
              Enter the Magic ✨
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isAppStarted && currentView === 'home' && (
          <motion.div key="home-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="fixed top-6 right-6 z-[900]">
              <motion.button
                onClick={toggleMusic}
                className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  isMusicEnabled ? 'bg-amber-400 text-white' : 'bg-white text-amber-400 border border-amber-100'
                }`}
              >
                {isMusicEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
              </motion.button>
            </div>

            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-amber-400 z-[60] origin-left" style={{ scaleX }} />

            <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="z-20">
                <h1 className="font-magic text-5xl md:text-7xl text-amber-500 glow-yellow mb-4 leading-tight">
                  Happy Birthday,<br/>Sneha ✨
                </h1>
                <p className="text-lg md:text-xl font-title text-amber-700/80 mb-8">Every once in a while, magic is real.</p>
                <button
                  onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                  className="px-8 py-3 bg-amber-400 text-white rounded-full font-title shadow-lg flex items-center gap-2 mx-auto"
                >
                  Explore the Magic <ChevronDown size={18} />
                </button>
              </motion.div>
            </section>

            <MagicalGallery />
            <EnchantedEnvelope />
            <DailyProphet />
            <PensieveMemories />

            <section className="py-32 bg-amber-50/40 relative z-10 overflow-hidden">
              <h2 className="text-center font-magic text-3xl md:text-4xl mb-6 text-amber-600 px-6">Sneha's Magical World</h2>
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-20 px-6 scroll-smooth">
                <SnapCard title="Favorite Songs" icon={Music}>
                  {FAVORITE_SONGS.map((song, idx) => (
                    <MagicalItem key={song.id} title={song.title} subtitle={song.artist} icon={Music} index={idx} />
                  ))}
                </SnapCard>
                <SnapCard title="Her Hobbies" icon={Wand2}>
                  {HOBBIES.map((h, idx) => (
                    <MagicalItem key={h.name} title={h.name} icon={h.icon} index={idx} />
                  ))}
                </SnapCard>
                <SnapCard title="Her Food" icon={Utensils}>
                  {HER_FOOD.map((f, idx) => (
                    <MagicalItem key={f.name} title={f.name} subtitle={f.subtitle} icon={f.icon} index={idx} />
                  ))}
                </SnapCard>
                <SnapCard title="Her Places" icon={Home}>
                  {HER_PLACES.map((p, idx) => (
                    <MagicalItem key={p.name} title={p.name} icon={p.icon} index={idx} />
                  ))}
                </SnapCard>
              </div>
            </section>

            <footer className="py-10 text-center text-amber-800/30 text-[10px] tracking-[0.3em] uppercase font-sans">
              Handcrafted with magic for Sneha • 2026
            </footer>
          </motion.div>
        )}

        {isAppStarted && currentView === 'trivia' && (
          <motion.div key="trivia-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <MagicTrivia onBack={() => setCurrentView('home')} />
          </motion.div>
        )}

        {isAppStarted && currentView === 'sorting' && (
          <motion.div key="sorting-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SortingHatQuiz onBack={() => setCurrentView('home')} />
          </motion.div>
        )}

        {isAppStarted && currentView === 'potions' && (
          <motion.div key="potions-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <PotionsMaster onBack={() => setCurrentView('home')} />
          </motion.div>
        )}

        {isAppStarted && currentView === 'mirror' && (
          <motion.div key="mirror-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <MirrorOfErised onBack={() => setCurrentView('home')} />
          </motion.div>
        )}

        {isAppStarted && currentView === 'office' && (
          <motion.div key="office-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <DumbledoresOffice onBack={() => setCurrentView('home')} />
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #fde68a; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default App;
