'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Disc, Play, Pause, RotateCcw } from 'lucide-react';

interface VinylPlayerProps {
  title?: string;
  artist?: string;
  spotifyLink?: string;
}

const VinylPlayer: React.FC<VinylPlayerProps> = ({ 
  title = "Midnight Serenade",
  artist = "The Cozy Club",
  spotifyLink = "" 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isNeedleOn, setIsNeedleOn] = useState(false);

  const toggleNeedle = () => {
    setIsNeedleOn(!isNeedleOn);
    // Add a slight delay to "play" after the needle moves
    if (!isNeedleOn) {
      setTimeout(() => setIsPlaying(true), 400);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] w-full p-8 bg-amber-50/30 rounded-[3rem] border border-amber-100/50 shadow-inner">
      <div className="relative w-72 h-72 md:w-96 md:h-96">
        {/* Record Base / Player */}
        <div className="absolute inset-0 bg-[#2a2a2a] rounded-[2.5rem] shadow-2xl border-4 border-[#1a1a1a]">
          {/* Subtle Texture */}
          <div className="absolute inset-0 opacity-10" style={{ 
            backgroundImage: 'radial-gradient(circle at 50% 50%, #fff 1px, transparent 0)',
            backgroundSize: '40px 40px' 
          }} />
        </div>

        {/* The Vinyl Record */}
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "linear"
          }}
          className="absolute inset-8 rounded-full bg-[#121212] shadow-xl flex items-center justify-center overflow-hidden border-4 border-[#080808]"
        >
          {/* Grooves */}
          <div className="absolute inset-0 rounded-full border border-white/5 opacity-50" style={{ margin: '10%' }} />
          <div className="absolute inset-0 rounded-full border border-white/5 opacity-50" style={{ margin: '20%' }} />
          <div className="absolute inset-0 rounded-full border border-white/5 opacity-50" style={{ margin: '30%' }} />
          
          {/* Label */}
          <div className="w-1/3 h-1/3 rounded-full bg-rose-400 flex items-center justify-center text-[10px] md:text-xs font-bold text-rose-900 border-4 border-[#121212] z-10 text-center p-2 leading-tight uppercase tracking-widest shadow-inner">
            {title}
          </div>
          
          {/* Center Hole */}
          <div className="absolute w-2 h-2 bg-slate-800 rounded-full z-20" />
        </motion.div>

        {/* Tonearm / Needle */}
        <div 
          className="absolute top-4 right-12 w-8 h-48 md:h-64 z-30 cursor-pointer origin-top"
          onClick={toggleNeedle}
        >
          <motion.div
            animate={{ rotate: isNeedleOn ? 25 : 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="h-full w-full flex flex-col items-center"
            style={{ originY: 0 }}
          >
            {/* The Arm Part */}
            <div className="w-2 h-3/4 bg-slate-400 rounded-full shadow-md" />
            {/* The Head / Needle */}
            <div className="w-8 h-12 bg-slate-300 rounded-sm shadow-lg flex flex-col items-center p-1 border border-slate-400">
              <div className="w-1 h-4 bg-slate-600 rounded-full mt-auto" />
            </div>
          </motion.div>
        </div>

        {/* Control Button (Secondary) */}
        <div className="absolute bottom-6 right-8">
          <button 
            onClick={toggleNeedle}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isNeedleOn ? 'bg-rose-500 text-white shadow-rose-200' : 'bg-slate-700 text-slate-300 shadow-slate-900'
            } shadow-lg active:scale-95`}
          >
            {isNeedleOn ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
          </button>
        </div>
      </div>

      {/* Info Card */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 text-center"
      >
        <h3 className="text-xl font-serif text-slate-800 mb-1">{title}</h3>
        <p className="text-slate-500 text-sm mb-4">{artist}</p>
        
        {isPlaying && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 text-rose-500 text-xs font-bold uppercase tracking-widest"
          >
            <div className="flex gap-0.5 h-3 items-end">
              <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-current" />
              <motion.div animate={{ height: [8, 4, 8] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1 bg-current" />
              <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-current" />
            </div>
            Now Playing
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default VinylPlayer;
