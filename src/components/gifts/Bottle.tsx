'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BottleProps {
  message?: string;
  sender?: string;
}

const Bottle: React.FC<BottleProps> = ({
  message = "May your days be filled with peace and your heart with joy. Sending this message across the digital seas to you!",
  sender = "A Voyager"
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] w-full p-4 relative overflow-hidden bg-gradient-to-b from-cyan-50 to-blue-100 rounded-3xl">
      {/* Waves Background */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, -100, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[200%] h-full opacity-30"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1440 320\'%3E%3Cpath fill=\'%230891b2\' fill-opacity=\'1\' d=\'M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z\'%3E%3C/path%3E%3C/svg%3E")',
            backgroundSize: '1440px 320px',
            backgroundRepeat: 'repeat-x'
          }}
        />
        <motion.div
          animate={{ x: [-100, 0, -100] }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[200%] h-full opacity-20"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1440 320\'%3E%3Cpath fill=\'%230e7490\' fill-opacity=\'1\' d=\'M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,112C672,128,768,160,864,149.3C960,139,1056,85,1152,80C1248,75,1344,117,1392,138.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z\'%3E%3C/path%3E%3C/svg%3E")',
            backgroundSize: '1440px 320px',
            backgroundRepeat: 'repeat-x',
            bottom: '-20px'
          }}
        />
      </div>

      {/* The Bottle Container */}
      <motion.div
        animate={{
          y: isOpen ? 0 : [0, -15, 0],
          rotate: isOpen ? 0 : [-2, 2, -2]
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut"
        }}
        className="relative z-10 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* The Note (slides out) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: 0, opacity: 0, scale: 0.8 }}
              animate={{ y: -220, opacity: 1, scale: 1 }}
              exit={{ y: 0, opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="absolute left-1/2 -translate-x-1/2 w-64 md:w-80 bg-[#fdf6e3] p-8 shadow-2xl rounded-sm border-2 border-[#eee8d5] z-30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Paper Texture Effect */}
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")'
              }} />
              
              <div className="relative font-serif text-slate-800 italic">
                <p className="text-lg leading-relaxed mb-6 whitespace-pre-wrap">
                  {message}
                </p>
                <div className="mt-auto border-t border-cyan-200/50 pt-4 flex justify-end">
                  <p className="font-bold">— {sender}</p>
                </div>
              </div>

              {/* Scroll ends decorative */}
              <div className="absolute -top-2 left-0 right-0 h-4 bg-[#eee8d5] rounded-full blur-[1px] opacity-50" />
              <div className="absolute -bottom-2 left-0 right-0 h-4 bg-[#eee8d5] rounded-full blur-[1px] opacity-50" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottle Body */}
        <div className="relative w-32 h-64 md:w-40 md:h-80">
          {/* Cork */}
          <motion.div
            animate={{ y: isOpen ? -40 : 0, opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-10 bg-amber-800 rounded-t-lg z-20"
          />

          {/* Bottle Glass */}
          <div className="absolute inset-0 bg-cyan-200/30 backdrop-blur-[2px] border-2 border-white/40 rounded-b-[4rem] rounded-t-[2rem] shadow-xl overflow-hidden">
            {/* Highlights */}
            <div className="absolute top-10 left-4 w-4 h-32 bg-white/20 rounded-full blur-sm" />
            <div className="absolute top-20 right-6 w-2 h-16 bg-white/10 rounded-full blur-[1px]" />
            
            {/* Liquid inside (optional, but looks nice) */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-blue-400/20" />

            {/* Rolled paper inside when closed */}
            {!isOpen && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-40 bg-[#fdf6e3] rounded-sm shadow-inner border border-[#eee8d5]"
                style={{ transform: 'translate(-50%, -50%) rotate(5deg)' }}
              >
                <div className="w-full h-full opacity-20" style={{
                   backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 10px, #000 11px)'
                }} />
              </motion.div>
            )}
          </div>
          
          {/* Bottle Neck */}
          <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-12 h-16 bg-cyan-200/30 backdrop-blur-[2px] border-2 border-white/40 rounded-t-lg" />
        </div>

        {/* Floating instruction */}
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-cyan-800 text-xs font-bold py-2 px-4 rounded-full shadow-lg whitespace-nowrap border border-cyan-100"
          >
            Uncork the Bottle
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Bottle;
