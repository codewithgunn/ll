'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, Music } from 'lucide-react';

interface CassetteTapeProps {
  label?: string;
  sender?: string;
  spotifyUrl?: string;
}

const CassetteTape: React.FC<CassetteTapeProps> = ({ 
  label = "Our Summer Mixtape '24",
  sender = "Alex",
  spotifyUrl = "" 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extracting Spotify ID if provided
  const getSpotifyEmbedUrl = (url: string) => {
    if (!url) return null;
    const match = url.match(/track\/([a-zA-Z0-9]+)/);
    return match ? `https://open.spotify.com/embed/track/${match[1]}?utm_source=generator&theme=0` : null;
  };

  const embedUrl = getSpotifyEmbedUrl(spotifyUrl);

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] w-full p-8 bg-[#fdfaf6] rounded-[3rem] border border-slate-200/60 shadow-xl">
      <div className="relative w-full max-w-md aspect-[1.6/1]">
        {/* Cassette Body */}
        <div className="absolute inset-0 bg-slate-800 rounded-2xl shadow-2xl border-b-8 border-slate-900 overflow-hidden flex flex-col p-4">
          {/* Subtle Plastic Texture */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ 
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/dark-matter.png")'
          }} />

          {/* Label Area */}
          <div className="relative flex-1 bg-slate-100 rounded-lg border-2 border-slate-700 p-4 flex flex-col shadow-inner overflow-hidden">
            {/* Handwriting Label */}
            <div className="absolute top-0 left-0 right-0 h-12 bg-white/80 border-b border-slate-200 flex items-center px-4">
              <span className="font-serif text-slate-800 text-lg italic truncate w-full border-b border-dotted border-slate-300 pb-1">
                {label}
              </span>
            </div>

            {/* Tape Window */}
            <div className="mt-14 flex-1 bg-slate-800/90 rounded-md border-4 border-slate-300/20 flex items-center justify-around px-8 relative overflow-hidden">
              {/* Spinning Reels */}
              <motion.div 
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 rounded-full border-4 border-dashed border-slate-500/50 flex items-center justify-center"
              >
                <div className="w-4 h-4 bg-slate-600 rounded-full" />
              </motion.div>

              <motion.div 
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 rounded-full border-4 border-dashed border-slate-500/50 flex items-center justify-center"
              >
                <div className="w-4 h-4 bg-slate-600 rounded-full" />
              </motion.div>

              {/* Tape Strips */}
              <div className="absolute bottom-4 left-0 right-0 h-1 bg-slate-700/50" />
            </div>

            {/* Side Label */}
            <div className="absolute bottom-2 right-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Side A • Mixed by {sender}
            </div>
          </div>

          {/* Bottom Controls/Screws */}
          <div className="h-12 mt-4 flex items-center justify-between px-6">
            <div className="w-4 h-4 rounded-full bg-slate-900 border border-slate-700 shadow-inner" />
            <div className="flex gap-4">
               <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className={`w-14 h-14 -mt-16 rounded-full flex items-center justify-center transition-all border-4 ${
                  isPlaying ? 'bg-rose-500 border-rose-400 text-white shadow-rose-200' : 'bg-slate-700 border-slate-600 text-slate-300 shadow-slate-900'
                } shadow-lg active:scale-95 z-20`}
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
              </button>
            </div>
            <div className="w-4 h-4 rounded-full bg-slate-900 border border-slate-700 shadow-inner" />
          </div>
        </div>
      </div>

      {/* Hidden Player or Embed */}
      <AnimatePresence>
        {isPlaying && embedUrl && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-12 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-slate-200"
          >
            <iframe 
              src={embedUrl}
              width="100%" 
              height="152" 
              frameBorder="0" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!embedUrl && isPlaying && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 flex items-center gap-3 text-rose-500 font-medium"
        >
          <Music className="w-5 h-5 animate-bounce" />
          <span>(Retro tape sound effect playing...)</span>
        </motion.div>
      )}

      <div className="mt-8 text-center text-slate-400 text-sm italic">
        "Press play to start the mixtape"
      </div>
    </div>
  );
};

export default CassetteTape;
