'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ScratchCardProps {
  message?: string;
  foilColor?: 'silver' | 'gold';
}

const ScratchCard: React.FC<ScratchCardProps> = ({
  message = "You've won a cozy movie night with all your favorite snacks! 🍿✨",
  foilColor = 'silver'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Fill with foil color
    if (foilColor === 'silver') {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#bdc3c7');
      gradient.addColorStop(0.5, '#ecf0f1');
      gradient.addColorStop(1, '#bdc3c7');
      ctx.fillStyle = gradient;
    } else {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#d4af37');
      gradient.addColorStop(0.5, '#f1c40f');
      gradient.addColorStop(1, '#d4af37');
      ctx.fillStyle = gradient;
    }
    
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add some "metallic" texture
    for (let i = 0; i < 1000; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`;
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
    }

    // Add text on foil
    ctx.font = 'bold 24px sans-serif';
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH HERE', canvas.width / 2, canvas.height / 2);

    ctx.globalCompositeOperation = 'destination-out';
  }, [foilColor]);

  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas || !isDrawing) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = (e as React.MouseEvent).clientX - rect.left;
      y = (e as React.MouseEvent).clientY - rect.top;
    }

    ctx.lineWidth = 40;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y);
    ctx.stroke();

    if (!isScratched) {
      setTimeout(() => setIsScratched(true), 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] w-full p-4">
      <div className="relative w-full max-w-md aspect-video rounded-2xl overflow-hidden shadow-2xl bg-white border-8 border-slate-100">
        
        {/* The revealed content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-purple-50 to-pink-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isScratched ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: "spring" }}
          >
            <h3 className="text-sm font-bold uppercase tracking-widest text-purple-400 mb-4">You revealed...</h3>
            <p className="text-2xl font-serif text-slate-800 leading-relaxed italic">
              &quot;{message}&quot;
            </p>
          </motion.div>
        </div>

        {/* The scratchable canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 cursor-crosshair touch-none"
          onMouseDown={() => setIsDrawing(true)}
          onMouseUp={() => setIsDrawing(false)}
          onMouseOut={() => setIsDrawing(false)}
          onMouseMove={scratch}
          onTouchStart={() => setIsDrawing(true)}
          onTouchEnd={() => setIsDrawing(false)}
          onTouchMove={scratch}
        />
      </div>

      <div className="mt-8 text-center">
        <p className="text-slate-500 font-medium">
          Use your cursor or finger to scratch away the {foilColor} layer!
        </p>
      </div>
    </div>
  );
};

export default ScratchCard;
