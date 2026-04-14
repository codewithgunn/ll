'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LetterProps {
  message?: string;
  sender?: string;
}

const Letter: React.FC<LetterProps> = ({ 
  message = "I just wanted to say how much I appreciate you. You make every day a little brighter!",
  sender = "Your Friend" 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] w-full p-4">
      <div 
        className="relative w-full max-w-md aspect-[3/2] cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Shadow */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-4 bg-slate-900/5 blur-xl rounded-full" />

        {/* Envelope Back */}
        <div className="absolute inset-0 bg-rose-50 border border-rose-100 rounded-lg shadow-sm overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, #f43f5e 1px, transparent 0)',
            backgroundSize: '24px 24px' 
          }} />
        </div>

        {/* The Letter */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -150, opacity: 1 }}
              exit={{ y: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="absolute left-1/2 -translate-x-1/2 top-4 w-[90%] h-[120%] bg-white p-8 shadow-2xl rounded-sm border border-slate-100 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-full flex flex-col font-serif italic text-slate-800">
                <p className="text-lg leading-relaxed mb-4 whitespace-pre-wrap">
                  {message}
                </p>
                <div className="mt-auto border-t border-rose-100 pt-4 flex justify-end">
                  <p className="font-bold">— {sender}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Envelope Front (Bottom/Sides) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* Bottom flap triangle-like shape */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-rose-50 border-t border-rose-100" style={{
            clipPath: 'polygon(0 100%, 50% 0, 100% 100%)'
          }} />
          {/* Left flap */}
          <div className="absolute inset-y-0 left-0 w-1/2 bg-rose-50/80 border-r border-rose-100/50" style={{
            clipPath: 'polygon(0 0, 100% 50%, 0 100%)'
          }} />
          {/* Right flap */}
          <div className="absolute inset-y-0 right-0 w-1/2 bg-rose-50/80 border-l border-rose-100/50" style={{
            clipPath: 'polygon(100% 0, 0 50%, 100% 100%)'
          }} />
        </div>

        {/* Top Flap */}
        <motion.div
          animate={{ rotateX: isOpen ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute top-0 left-0 right-0 h-1/2 bg-rose-100 border-b border-rose-200"
          style={{
            clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
            transformOrigin: 'top',
            zIndex: isOpen ? 0 : 30
          }}
        />
        
        {/* Prompt */}
        {!isOpen && (
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-full z-40"
          >
            Click to Open
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Letter;
