'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower, Trash2, Plus, Sparkles } from 'lucide-react';

interface BouquetFlower {
  id: string;
  type: string;
  color: string;
  x: number;
  y: number;
  rotation: number;
}

const flowerOptions = [
  { type: 'Rose', color: '#f43f5e', icon: Flower },
  { type: 'Sunflower', color: '#f59e0b', icon: Flower },
  { type: 'Lavender', color: '#8b5cf6', icon: Flower },
  { type: 'Tulip', color: '#ec4899', icon: Flower },
  { type: 'Daisy', color: '#fcd34d', icon: Flower },
];

const DigiBouquet: React.FC = () => {
  const [flowers, setFlowers] = useState<BouquetFlower[]>([]);

  const addFlower = (type: string, color: string) => {
    const newFlower: BouquetFlower = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      color,
      x: 0,
      y: 0,
      rotation: Math.random() * 40 - 20, // Random initial rotation
    };
    setFlowers([...flowers, newFlower]);
  };

  const removeFlower = (id: string) => {
    setFlowers(flowers.filter(f => f.id !== id));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl mx-auto p-4 lg:p-8 min-h-[600px]">
      {/* Palette Side */}
      <div className="w-full lg:w-64 flex flex-col gap-6 order-2 lg:order-1">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Pick a Bloom
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
            {flowerOptions.map((opt) => (
              <button
                key={opt.type}
                onClick={() => addFlower(opt.type, opt.color)}
                className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group text-left"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: `${opt.color}15`, color: opt.color }}>
                  <opt.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">{opt.type}</p>
                  <p className="text-[10px] text-slate-400 font-medium tracking-tight uppercase">Add to vase</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-rose-50/50 p-6 rounded-3xl border border-rose-100/50">
          <p className="text-xs text-rose-600 font-medium leading-relaxed">
            Drag the flowers around the canvas to create your perfect arrangement. You can overlap them to build depth!
          </p>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden min-h-[500px] order-1 lg:order-2">
        {/* Background Decorative Vase Placeholder */}
        <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-48 h-64 bg-slate-100/40 rounded-t-[100px] pointer-events-none" />
        
        {/* Empty State */}
        {flowers.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 pointer-events-none">
            <Sparkles className="w-12 h-12 mb-4 opacity-50" />
            <p className="font-serif italic">Your bouquet is waiting to bloom...</p>
          </div>
        )}

        {/* Flowers on Canvas */}
        <div className="absolute inset-0 p-12">
          <AnimatePresence>
            {flowers.map((flower) => (
              <motion.div
                key={flower.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                drag
                dragMomentum={false}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                whileDrag={{ scale: 1.1, zIndex: 50, cursor: 'grabbing' }}
                className="absolute cursor-grab active:cursor-grabbing group p-4"
                style={{ 
                  left: `calc(50% + ${flower.x}px)`, 
                  top: `calc(50% + ${flower.y}px)`,
                  rotate: flower.rotation 
                }}
              >
                {/* Delete Button (visible on hover) */}
                <button
                  onClick={() => removeFlower(flower.id)}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-white shadow-lg border border-slate-100 rounded-full flex items-center justify-center text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* The Flower Visualization */}
                <div className="relative">
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }} 
                    transition={{ repeat: Infinity, duration: 3 + Math.random() * 2 }}
                    className="w-20 h-20 flex items-center justify-center"
                    style={{ color: flower.color }}
                  >
                    <Flower className="w-full h-full fill-current opacity-80" strokeWidth={1.5} />
                    {/* Stem */}
                    <div className="absolute top-[90%] left-1/2 -translate-x-1/2 w-1 h-32 bg-emerald-500/30 rounded-full -z-10" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DigiBouquet;
