'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Letter from '@/components/gifts/Letter';
import FortuneCookie from '@/components/gifts/FortuneCookie';
import CassetteTape from '@/components/gifts/CassetteTape';
import DigiBouquet from '@/components/gifts/DigiBouquet';
import Bottle from '@/components/gifts/Bottle';
import CarePackage from '@/components/gifts/CarePackage';
import ScratchCard from '@/components/gifts/ScratchCard';
import BirthdayCake from '@/components/gifts/BirthdayCake';
import { useParams } from 'next/navigation';
import { Loader2, Heart } from 'lucide-react';

export default function GiftPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [gift, setGift] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchGift() {
      try {
        const { data, error } = await supabase
          .from('gifts')
          .select('*')
          .eq('id', id)
          .single();

        if (error || !data) {
          setError(true);
        } else {
          setGift(data);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchGift();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffaf5]">
        <Loader2 className="w-8 h-8 text-rose-400 animate-spin mb-4" />
        <p className="text-slate-500 font-serif italic">Unwrapping your surprise...</p>
      </div>
    );
  }

  if (error || !gift) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffaf5] p-6 text-center">
        <h1 className="text-2xl font-serif text-slate-800 mb-2">Oops!</h1>
        <p className="text-slate-500 mb-8">This gift link seems to have expired or never existed.</p>
        <a href="/" className="px-6 py-2 bg-slate-900 text-white rounded-xl">Create a New Gift</a>
      </div>
    );
  }

  const { type, config } = gift;

  const renderGift = () => {
    switch (type) {
      case 'letter':
        return <Letter message={config.message} sender={config.sender} />;
      case 'fortune':
        return <FortuneCookie fortune={config.fortune} />;
      case 'vinyl':
        return <CassetteTape label={config.label} sender={config.sender} spotifyUrl={config.spotifyUrl} />;
      case 'bouquet':
        // The DigiBouquet component should be updated to accept an initial flowers prop if needed
        return <DigiBouquet />;
      case 'bottle':
        return <Bottle message={config.message} />;
      case 'package':
        return <CarePackage />;
      case 'scratch':
        return <ScratchCard message={config.message} />;
      case 'cake':
        return <BirthdayCake name={config.name} />;
      default:
        return <div>Unknown gift type</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf5] flex flex-col items-center justify-center p-6 lg:p-12">
      <div className="max-w-4xl w-full flex flex-col items-center">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-xs font-bold uppercase tracking-widest mb-4">
            <Heart className="w-3 h-3 fill-current" />
            <span>A Surprise for You</span>
          </div>
          <h2 className="text-3xl font-serif text-slate-900">Open it with a smile!</h2>
        </div>
        
        {renderGift()}
        
        <div className="mt-20 opacity-40 hover:opacity-100 transition-opacity">
          <p className="text-sm text-slate-400 font-serif italic">
            Sent with ♡ via <a href="/" className="underline decoration-rose-200">Bloom & Note</a>
          </p>
        </div>
      </div>
    </div>
  );
}
