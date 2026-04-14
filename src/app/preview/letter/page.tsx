'use client';

import Letter from '@/components/gifts/Letter';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LetterPreview() {
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
          <h1 className="text-4xl font-serif text-slate-900 mb-4">Interactive Letter</h1>
          <p className="text-slate-500">A smooth, tactile experience for sending heartfelt messages.</p>
        </div>

        <Letter 
          message="Hey there! I just wanted to send you a little digital warmth today. Hope you're having a wonderful week and remember to take some time for yourself! \n\nSending you lots of love and good vibes."
          sender="Gemini"
        />
      </div>
    </div>
  );
}
