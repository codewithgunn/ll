'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DndContext, 
  useDraggable, 
  useDroppable, 
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { Coffee, Book, Wind, Heart } from 'lucide-react';

interface ItemProps {
  id: string;
  icon: React.ReactNode;
  label: string;
  color: string;
}

const DraggableItem = ({ id, icon, label, color }: ItemProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`flex flex-col items-center gap-2 p-4 rounded-2xl ${color} cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow z-50`}
    >
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </div>
  );
};

const DroppableBox = ({ items, isOpen, onClick }: { items: string[], isOpen: boolean, onClick: () => void }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'box',
  });

  return (
    <div 
      ref={setNodeRef}
      onClick={onClick}
      className="relative w-64 h-64 md:w-80 md:h-80 cursor-pointer"
    >
      {/* Box Back/Inside */}
      <div className={`absolute inset-0 bg-amber-200 border-2 border-amber-300 rounded-lg shadow-inner transition-colors ${isOver ? 'bg-amber-300' : ''}`}>
        <div className="absolute inset-0 flex flex-wrap gap-2 p-6 items-center justify-center">
          <AnimatePresence>
            {items.map((itemId) => (
              <motion.div
                key={itemId}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center"
              >
                {itemId === 'tea' && <Coffee className="w-6 h-6 text-amber-700" />}
                {itemId === 'book' && <Book className="w-6 h-6 text-blue-700" />}
                {itemId === 'blanket' && <Wind className="w-6 h-6 text-emerald-700" />}
                {itemId === 'love' && <Heart className="w-6 h-6 text-rose-700" />}
              </motion.div>
            ))}
          </AnimatePresence>
          {items.length === 0 && isOpen && (
            <p className="text-amber-800/40 font-bold text-center text-sm">
              Drag items here
            </p>
          )}
        </div>
      </div>

      {/* Flaps */}
      {/* Left Flap */}
      <motion.div
        animate={{ rotateY: isOpen ? -110 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-y-0 left-0 w-1/2 bg-amber-400 border-r border-amber-500 rounded-l-lg origin-left z-20 shadow-md"
      />
      {/* Right Flap */}
      <motion.div
        animate={{ rotateY: isOpen ? 110 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-y-0 right-0 w-1/2 bg-amber-400 border-l border-amber-500 rounded-r-lg origin-right z-20 shadow-md"
      />
      {/* Top Flap */}
      <motion.div
        animate={{ rotateX: isOpen ? 110 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-x-0 top-0 h-1/2 bg-amber-500 border-b border-amber-600 rounded-t-lg origin-top z-30 shadow-md"
      />
      {/* Bottom Flap */}
      <motion.div
        animate={{ rotateX: isOpen ? -110 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-amber-500 border-t border-amber-600 rounded-b-lg origin-bottom z-10 shadow-md"
      />

      {/* Label on closed box */}
      {!isOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
          <div className="bg-white/90 px-4 py-2 border-2 border-dashed border-amber-300 rounded rotate-[-5deg]">
            <p className="font-serif font-bold text-amber-900">CARE PACKAGE</p>
          </div>
        </div>
      )}
    </div>
  );
};

const CarePackage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [packedItems, setPackedItems] = useState<string[]>([]);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    
    if (over && over.id === 'box' && isOpen) {
      if (!packedItems.includes(active.id as string)) {
        setPackedItems([...packedItems, active.id as string]);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] w-full p-4 bg-orange-50/50 rounded-3xl">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full max-w-5xl">
          
          {/* Palette of Items */}
          <div className="grid grid-cols-2 gap-4 order-2 lg:order-1">
            <DraggableItem 
              id="tea" 
              icon={<Coffee className="w-8 h-8 text-amber-600" />} 
              label="Hot Tea" 
              color="bg-amber-100 text-amber-700" 
            />
            <DraggableItem 
              id="book" 
              icon={<Book className="w-8 h-8 text-blue-600" />} 
              label="Cozy Read" 
              color="bg-blue-100 text-blue-700" 
            />
            <DraggableItem 
              id="blanket" 
              icon={<Wind className="w-8 h-8 text-emerald-600" />} 
              label="Warmth" 
              color="bg-emerald-100 text-emerald-700" 
            />
            <DraggableItem 
              id="love" 
              icon={<Heart className="w-8 h-8 text-rose-600" />} 
              label="Much Love" 
              color="bg-rose-100 text-rose-700" 
            />
          </div>

          {/* The Box */}
          <div className="order-1 lg:order-2 flex flex-col items-center">
            <DroppableBox 
              items={packedItems} 
              isOpen={isOpen} 
              onClick={() => setIsOpen(!isOpen)} 
            />
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 text-center"
            >
              <h3 className="text-2xl font-serif text-slate-800 mb-2">
                {isOpen ? (packedItems.length > 0 ? "Perfectly Packed!" : "Drop some items in!") : "A Surprise Awaits..."}
              </h3>
              <p className="text-slate-500 max-w-xs">
                {isOpen 
                  ? "Drag items from the left to fill your care package with warmth."
                  : "Click the box to open it and start packing a digital hug."}
              </p>
            </motion.div>
          </div>
        </div>
      </DndContext>
    </div>
  );
};

export default CarePackage;
