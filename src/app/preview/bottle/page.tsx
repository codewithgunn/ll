'use client';

import Bottle from '@/components/gifts/Bottle';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BottlePreview() {
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
          <h1 className="text-4xl font-serif text-slate-900 mb-4">Message in a Bottle</h1>
          <p className="text-slate-500">A drifting bottle on a digital sea that holds your secret floating note.</p>
        </div>

        <Bottle 
          message="Sometimes you just need to let a message drift into the world and hope it finds its way to someone who needs it. I hope this finds you smiling today."
          sender="A Wanderer"
        />
      </div>
    </div>
  );
}
