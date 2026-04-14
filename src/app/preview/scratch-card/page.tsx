'use client';

import ScratchCard from '@/components/gifts/ScratchCard';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ScratchCardPreview() {
  return (
    <div className="min-h-screen bg-[#fffaf5] p-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif text-slate-900 mb-4">Scratch-Off Card</h1>
          <p className="text-slate-500">A playful way to reveal surprises and special messages.</p>
        </div>

        <div className="flex flex-col gap-12">
          <ScratchCard 
            message="SURPRISE! We're going to that new sushi place this Friday! 🍣" 
            foilColor="silver"
          />
          
          <ScratchCard 
            message="A special coupon for one 'Get Out of Chores' day! 🎫✨" 
            foilColor="gold"
          />
        </div>
      </div>
    </div>
  );
}
