'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface BirthdayCakeProps {
  name?: string;
  message?: string;
  candlesCount?: number;
}

const Candle = ({ isLit }: { isLit: boolean }) => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Flame */}
      <AnimatePresence>
        {isLit && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: 1,
              y: [0, -2, 0],
              rotate: [-2, 2, -2]
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              duration: 0.4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-6 w-3 h-6 bg-orange-400 rounded-full blur-[1px] shadow-[0_0_10px_#fbbf24]"
            style={{ 
              background: 'radial-gradient(circle at 50% 100%, #fbbf24 0%, #f59e0b 60%, #ef4444 100%)'
            }}
          />
        )}
      </AnimatePresence>
      {/* Candle Body */}
      <div className="w-2 h-10 bg-pink-200 rounded-full border-b-2 border-pink-300 shadow-sm" style={{
        backgroundImage: 'linear-gradient(45deg, #fbcfe8 25%, #f9a8d4 25%, #f9a8d4 50%, #fbcfe8 50%, #fbcfe8 75%, #f9a8d4 75%, #f9a8d4 100%)',
        backgroundSize: '8px 8px'
      }} />
    </div>
  );
};

const BirthdayCake: React.FC<BirthdayCakeProps> = ({
  name = "Friend",
  message,
  candlesCount = 5
}) => {
  const displayMessage = message || `Happy Birthday, ${name}! Make a wish and blow out the candles!`;
  const [isLit, setIsLit] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Generate confetti data once
  const confettiPieces = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400 - 100,
      rotate: Math.random() * 360,
      color: ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][i % 5]
    }));
  }, []);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContextClass();
      audioContextRef.current = audioContext;
      
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;
      
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      const checkVolume = () => {
        if (!isLit) return;
        analyser.getByteFrequencyData(dataArray);
        
        let sum = 0;
        for (let i = 20; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / (bufferLength - 20);
        
        if (average > 40) {
          setIsLit(false);
          stopListening();
        } else {
          requestAnimationFrame(checkVolume);
        }
      };
      
      checkVolume();
    } catch (err) {
      console.error("Microphone access denied or not supported:", err);
    }
  };

  const stopListening = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  const extinguish = () => {
    setIsLit(false);
    stopListening();
  };

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] w-full p-4 bg-purple-50/30 rounded-3xl">
      <div className="relative flex flex-col items-center">
        
        {/* Confetti / Sparkles when extinguished */}
        <AnimatePresence>
          {!isLit && (
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-50">
              {confettiPieces.map((piece) => (
                <motion.div
                  key={piece.id}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{ 
                    scale: [0, 1, 0],
                    x: piece.x,
                    y: piece.y,
                    rotate: piece.rotate
                  }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="absolute left-1/2 top-1/2 w-4 h-4 rounded-sm"
                  style={{ 
                    backgroundColor: piece.color
                  }}
                />
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 text-center w-full"
              >
                <h2 className="text-4xl font-serif text-purple-600 drop-shadow-sm">Yay! 🎉</h2>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* The Cake */}
        <div className="relative mt-20 flex flex-col items-center">
          {/* Candles */}
          <div className="absolute -top-12 left-0 right-0 flex justify-center gap-4 z-20">
            {[...Array(candlesCount)].map((_, i) => (
              <Candle key={i} isLit={isLit} />
            ))}
          </div>

          {/* Cake Top Layer */}
          <div className="w-48 h-24 bg-pink-100 rounded-t-[3rem] border-x-4 border-t-4 border-pink-200 relative z-10">
            {/* Icing drips */}
            <div className="absolute -bottom-4 left-0 right-0 flex justify-around px-1">
               {[...Array(5)].map((_, i) => (
                 <div key={i} className="w-8 h-8 bg-pink-100 rounded-full" />
               ))}
            </div>
          </div>
          
          {/* Cake Bottom Layer */}
          <div className="w-64 h-32 bg-white rounded-t-[2rem] border-x-4 border-t-4 border-slate-100 relative shadow-xl overflow-hidden">
             {/* Decorative patterns */}
             <div className="absolute inset-0 opacity-10" style={{
               backgroundImage: 'radial-gradient(circle at 10px 10px, #ec4899 2px, transparent 0)',
               backgroundSize: '20px 20px'
             }} />
             
             {/* Text on cake */}
             <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
               <p className="font-serif text-pink-400 font-bold text-lg leading-tight">
                 HAPPY<br/>BIRTHDAY
               </p>
             </div>
          </div>

          {/* Plate */}
          <div className="w-80 h-4 bg-slate-50 border-b-4 border-slate-200 rounded-full mt-[-10px] shadow-sm relative z-0" />
        </div>
      </div>

      <div className="mt-16 text-center max-w-md">
        <h3 className="text-2xl font-serif text-slate-800 mb-4">{displayMessage}</h3>
        
        {isLit ? (
          <div className="flex flex-col gap-4 items-center">
            <button
              onClick={startListening}
              className="flex items-center gap-2 px-6 py-3 bg-purple-100 text-purple-700 rounded-full font-bold hover:bg-purple-200 transition-colors shadow-sm"
            >
              <Sparkles className="w-5 h-5" />
              Enable Mic to Blow
            </button>
            <button
              onClick={extinguish}
              className="text-slate-400 text-sm hover:underline"
            >
              Or just click here to blow them out
            </button>
          </div>
        ) : (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsLit(true)}
            className="px-6 py-2 border-2 border-slate-200 text-slate-500 rounded-full font-medium hover:bg-slate-50 transition-colors"
          >
            Light them again
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default BirthdayCake;
