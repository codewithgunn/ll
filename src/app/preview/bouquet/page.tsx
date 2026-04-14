'use client';

import DigiBouquet from '@/components/gifts/DigiBouquet';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BouquetPreview() {
  return (
    <div className="min-h-screen bg-[#fffaf5] p-8">
      <div className="max-w-7xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif text-slate-900 mb-4">DigiBouquet Builder</h1>
          <p className="text-slate-500 text-lg">Pick your favorite blooms and arrange them in the virtual vase.</p>
        </div>

        <DigiBouquet />
      </div>
    </div>
  );
}
