'use client';

import FortuneCookie from '@/components/gifts/FortuneCookie';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function FortunePreview() {
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
          <h1 className="text-4xl font-serif text-slate-900 mb-4">Fortune Cookie</h1>
          <p className="text-slate-500">A tactile "crack" experience that reveals a hidden piece of wisdom.</p>
        </div>

        <FortuneCookie 
          fortune="The best way to predict the future is to create it."
        />
      </div>
    </div>
  );
}
