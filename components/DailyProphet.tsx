
import React from 'react';
import { motion } from 'framer-motion';

const PROPHET_STORIES = [
  {
    id: '1',
    videoUrl: 'https://cdn.jsdelivr.net/gh/MASKOTkun/Music@main/VID-20251217-WA0045.mp4',
    headline: 'SNEHA CELEBRATES TWO DECADES!',
    subheadline: 'A Golden Milestone for the Wizarding World',
    article: 'In a stunning display of temporal magic, local witch Sneha reaches the milestone of twenty years today. Observers in Kolkata report a significant increase in atmospheric sparkles and sunflowers. The Ministry has declared this an official day of joy.',
    quote: '"She is a natural," says a local owl.'
  },
  {
    id: '2',
    videoUrl: 'https://cdn.jsdelivr.net/gh/MASKOTkun/Music@main/VID-20251217-WA0046.mp4',
    headline: 'JOY LEVELS AT RECORD HIGHS',
    subheadline: 'Ministry Baffled by Happiness Spells',
    article: 'The Department of Magical Accidents and Catastrophes reports that joy levels surrounding Sneha have caused a city-wide outbreak of spontaneous smiling. Authorities recommend dancing and celebration for all.',
    quote: 'Exclusive: Joy charms verified.'
  },
  {
    id: '3',
    videoUrl: 'https://cdn.jsdelivr.net/gh/MASKOTkun/Music@main/video_20260107_084314.mp4',
    headline: 'THE RADIANCE PHENOMENON',
    subheadline: 'Experts Baffled by Constant Glow',
    article: 'Xylomancy experts are baffled by the constant "sunshine state" following Sneha. Preliminary research suggests it originates from her pure-hearted nature and love for life. A once-in-a-century light has been spotted.',
    quote: 'A once-in-a-century light.'
  },
  {
    id: '4',
    videoUrl: 'https://cdn.jsdelivr.net/gh/MASKOTkun/Music@main/VID-20250306-WA0067.mp4',
    headline: 'EXCLUSIVE: THE QUEEN OF HEARTS',
    subheadline: 'Future Predictions Bright as Stars',
    article: 'Professor Trelawney predicts a decade of unparalleled adventure for the birthday witch. "Her tea leaves are shaped like a crown and a star," the professor noted while gasping. The future is indeed golden.',
    quote: 'The brightest star of the era.'
  }
];

const ProphetCard: React.FC<{ story: typeof PROPHET_STORIES[0], index: number }> = ({ story, index }) => {
  return (
    <div className="flex-shrink-0 snap-center py-6 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: index % 2 === 0 ? -1 : 1 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative w-[85vw] md:w-[380px] bg-[#e8e4d9] p-6 shadow-[0_15px_40px_rgba(0,0,0,0.2)] border-4 border-[#333] border-double overflow-hidden flex flex-col h-[540px]"
      >
        {/* Newspaper Heading */}
        <div className="border-b-4 border-[#333] mb-4 pb-2 text-center">
          <h2 className="font-title text-3xl uppercase tracking-tighter text-[#333]">The Daily Prophet</h2>
          <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-[#333] mt-1 border-t border-[#333] pt-1">
            <span>Vol. XX No. {index + 1}</span>
            <span>Birthday Edition</span>
            <span>Special Release</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center mb-4">
          <h3 className="font-title text-xl leading-none text-[#333] uppercase font-black">
            {story.headline}
          </h3>
          <p className="text-[10px] mt-2 opacity-70 italic font-serif lowercase tracking-normal border-y border-[#333]/20 py-1">
            — {story.subheadline} —
          </p>
        </div>

        {/* Moving Magical Photo (Native Video Player) */}
        <div className="relative aspect-video mb-4 border-2 border-[#333] overflow-hidden bg-stone-300 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
           <video
             src={story.videoUrl}
             autoPlay
             muted
             loop
             playsInline
             className="w-full h-full object-cover grayscale brightness-110 contrast-125 sepia-[0.2]"
             style={{ filter: 'grayscale(100%) contrast(120%) brightness(110%)' }}
           />
           
           {/* Magical Overlay Texture */}
           <div 
             className="absolute inset-0 pointer-events-none z-10 opacity-20 mix-blend-overlay"
             style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')" }}
           />

           {/* Vignette */}
           <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.4)] z-20" />
           
           <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#333]/80 text-[#e8e4d9] text-[7px] font-bold uppercase tracking-widest z-30">
              Moving Portrait
           </div>
        </div>

        {/* Article Text */}
        <div className="flex-1 overflow-hidden">
          <div className="columns-2 gap-4 text-[10px] leading-tight text-[#333] font-serif italic text-justify">
            <p className="first-letter:text-2xl first-letter:font-bold first-letter:float-left first-letter:mr-1 first-letter:leading-none">
              {story.article}
            </p>
          </div>
        </div>

        {/* Quote Footer */}
        <div className="mt-4 pt-2 border-t border-[#333]/20">
          <p className="text-[9px] font-bold text-[#444] text-center italic leading-tight">
            {story.quote}
          </p>
        </div>

        {/* Burnt Corner Effect */}
        <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-[#FFFBEB] rounded-full blur-md opacity-40 pointer-events-none" />
      </motion.div>
    </div>
  );
};

const DailyProphet: React.FC = () => {
  return (
    <div className="py-24 bg-stone-100/40 overflow-hidden relative border-y border-stone-200">
      {/* Decorative Title */}
      <div className="flex flex-col items-center mb-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-3"
        >
          <div className="h-[1px] w-12 bg-stone-400" />
          <h2 className="font-title text-2xl uppercase tracking-[0.2em] text-stone-800">Magical Press</h2>
          <div className="h-[1px] w-12 bg-stone-400" />
        </motion.div>
        <p className="text-stone-500 font-sans text-[10px] uppercase tracking-widest text-center">
          Reporting live from the heart of the magical realm
        </p>
      </div>

      {/* Horizontal Scrollable Container */}
      <div 
        className="flex overflow-x-auto snap-x snap-mandatory gap-2 custom-scrollbar-hide pb-12 px-4 md:px-[calc(50%-190px)]"
      >
        {PROPHET_STORIES.map((story, index) => (
          <ProphetCard key={story.id} story={story} index={index} />
        ))}
      </div>

      <div className="flex flex-col items-center justify-center gap-2 -mt-6">
        <motion.p 
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-stone-400 text-[10px] uppercase tracking-[0.4em] font-sans"
        >
          Swipe to Read
        </motion.p>
      </div>
      
      <style>{`
        .custom-scrollbar-hide::-webkit-scrollbar { display: none; }
        .custom-scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default DailyProphet;
