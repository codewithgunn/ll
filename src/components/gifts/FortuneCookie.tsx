'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FortuneCookieProps {
  fortune?: string;
}

const FortuneCookie: React.FC<FortuneCookieProps> = ({ 
  fortune = "Your path is illuminated by the light of your own courage." 
}) => {
  const [isCracked, setIsCracked] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full p-4 overflow-hidden">
      <div 
        className="relative w-64 h-64 cursor-pointer flex items-center justify-center"
        onClick={() => !isCracked && setIsCracked(true)}
      >
        {/* The Paper (Hidden inside initially) */}
        <AnimatePresence>
          {isCracked && (
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 0 }}
              animate={{ scale: 1, opacity: 1, y: -20 }}
              transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
              className="absolute z-10 bg-white px-6 py-3 shadow-lg border border-slate-100 rounded-sm"
            >
              <div className="relative">
                <div className="absolute -left-1 top-0 bottom-0 w-1 bg-rose-400 opacity-20" />
                <p className="font-serif italic text-slate-800 text-center text-sm sm:text-base max-w-[200px]">
                  "{fortune}"
                </p>
                <div className="absolute -right-1 top-0 bottom-0 w-1 bg-rose-400 opacity-20" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cookie Left Half */}
        <motion.div
          animate={isCracked ? { x: -60, rotate: -20, opacity: 0.8 } : { x: 0, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="absolute z-20"
        >
          <svg width="120" height="120" viewBox="0 0 120 120">
            <path 
              d="M100,60 C100,30 70,10 40,10 C10,10 10,40 10,60 C10,80 30,110 60,110 C80,110 100,90 100,60 Z" 
              fill="#f3d299" 
              stroke="#e6bc75" 
              strokeWidth="2"
            />
            <path 
              d="M40,30 C30,30 25,40 25,50" 
              fill="none" 
              stroke="#e6bc75" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* Cookie Right Half */}
        <motion.div
          animate={isCracked ? { x: 60, rotate: 20, opacity: 0.8 } : { x: 0, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="absolute z-20"
        >
          <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'scaleX(-1)' }}>
            <path 
              d="M100,60 C100,30 70,10 40,10 C10,10 10,40 10,60 C10,80 30,110 60,110 C80,110 100,90 100,60 Z" 
              fill="#f3d299" 
              stroke="#e6bc75" 
              strokeWidth="2"
            />
             <path 
              d="M40,30 C30,30 25,40 25,50" 
              fill="none" 
              stroke="#e6bc75" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* Click Prompt */}
        {!isCracked && (
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute -bottom-8 whitespace-nowrap bg-orange-100 text-orange-700 text-xs font-bold py-1 px-3 rounded-full"
          >
            Click to Crack
          </motion.div>
        )}

        {/* Reset Button */}
        {isCracked && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -bottom-16 text-xs text-slate-400 hover:text-slate-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsCracked(false);
            }}
          >
            Try another?
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default FortuneCookie;
