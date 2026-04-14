'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Send, Copy, Check, Sparkles, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const giftMetadata: Record<string, { title: string; fields: any[] }> = {
  letters: {
    title: 'Handwritten Letter',
    fields: [
      { id: 'message', label: 'Your Message', type: 'textarea', placeholder: 'Write something heartfelt...' },
      { id: 'sender', label: 'From', type: 'text', placeholder: 'Your Name' },
    ],
  },
  fortune: {
    title: 'Fortune Cookie',
    fields: [
      { id: 'fortune', label: 'The Fortune', type: 'textarea', placeholder: 'Enter a piece of wisdom or a lucky note...' },
    ],
  },
  vinyl: {
    title: 'Vinyl Player',
    fields: [
      { id: 'title', label: 'Song Title', type: 'text', placeholder: 'e.g. Our Favorite Song' },
      { id: 'artist', label: 'Artist', type: 'text', placeholder: 'e.g. The Midnight Dreamers' },
    ],
  },
  bottle: {
    title: 'Message in a Bottle',
    fields: [
      { id: 'message', label: 'Secret Message', type: 'textarea', placeholder: 'Write a secret note to be found at sea...' },
    ],
  },
  scratch: {
    title: 'Scratch-Off Card',
    fields: [
      { id: 'message', label: 'Hidden Surprise', type: 'textarea', placeholder: 'e.g. Dinner on me tonight! 🍕' },
    ],
  },
  cake: {
    title: 'Birthday Cake',
    fields: [
      { id: 'name', label: "Recipient's Name", type: 'text', placeholder: 'Who is the lucky person?' },
    ],
  },
};

export default function CreateGift() {
  const { type } = useParams();
  const router = useRouter();
  const metadata = giftMetadata[type as string];

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  if (!metadata) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffaf5] p-6 text-center">
        <h1 className="text-2xl font-serif text-slate-800 mb-2">Wait a second...</h1>
        <p className="text-slate-500 mb-8">This gift type is still in the works or doesn't exist.</p>
        <Link href="/" className="px-6 py-2 bg-slate-900 text-white rounded-xl">Back to Home</Link>
      </div>
    );
  }

  const handleInputChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // type map for DB storage
      const dbType = type === 'letters' ? 'letter' : type as string;
      
      const { data, error } = await supabase
        .from('gifts')
        .insert({
          type: dbType,
          config: formData,
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        const url = `${window.location.origin}/gift/${data.id}`;
        setGeneratedLink(url);
      }
    } catch (err) {
      console.error('Error creating gift:', err);
      alert('Failed to create gift. Did you set up your Supabase credentials in .env.local?');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#fffaf5] p-6 lg:p-12">
      <div className="max-w-2xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Cancel & Back</span>
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-serif text-slate-900 mb-4">Create your {metadata.title}</h1>
          <p className="text-slate-500">Fill in the details below to generate your unique gift link.</p>
        </div>

        <AnimatePresence mode="wait">
          {!generatedLink ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleCreate}
              className="space-y-6 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50"
            >
              {metadata.fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <label htmlFor={field.id} className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.id}
                      required
                      placeholder={field.placeholder}
                      rows={4}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:bg-white transition-all resize-none font-serif text-slate-800"
                    />
                  ) : (
                    <input
                      id={field.id}
                      type="text"
                      required
                      placeholder={field.placeholder}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:bg-white transition-all font-serif text-slate-800"
                    />
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-bold text-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>Generate Gift Link</span>
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-10 rounded-[2.5rem] border border-emerald-100 shadow-xl shadow-emerald-100/50 text-center"
            >
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Send className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-serif text-slate-900 mb-2">Your gift is ready!</h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Copy the link below and send it to your special someone. They'll be able to open it instantly.
              </p>
              
              <div className="flex gap-2 p-2 bg-slate-50 border border-slate-100 rounded-2xl mb-8 group">
                <input 
                  type="text" 
                  readOnly 
                  value={generatedLink}
                  className="bg-transparent flex-1 px-4 text-slate-600 text-sm focus:outline-none"
                />
                <button 
                  onClick={copyToClipboard}
                  className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                    copied ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href={generatedLink}
                  className="flex-1 py-4 bg-white border border-slate-200 text-slate-800 rounded-2xl font-bold hover:bg-slate-50 transition-all"
                >
                  Preview Yours
                </Link>
                <button 
                  onClick={() => setGeneratedLink('')}
                  className="flex-1 py-4 text-slate-400 font-medium hover:text-slate-600 transition-all"
                >
                  Create another?
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3" />
          <span>Made with love on the cozy web</span>
        </div>
      </div>
    </div>
  );
}
