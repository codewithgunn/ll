'use client';

import { motion } from 'framer-motion';
import { Mail, Music, Flower, Sparkles, Gift, Cookie, Disc, Package, Waves, PlusCircle, Eye } from 'lucide-react';
import Link from 'next/link';

const giftTypes = [
  {
    id: 'letters',
    title: 'Interactive Letters',
    description: 'Digital envelopes that slide open to reveal your handwritten-style message.',
    icon: Mail,
    color: 'bg-rose-100 text-rose-600',
    delay: 0.1,
    previewUrl: '/preview/letter',
    createUrl: '/create/letters'
  },
  {
    id: 'fortune',
    title: 'Fortune Cookie',
    description: 'A tactile "crack" experience that reveals a hidden piece of wisdom or luck.',
    icon: Cookie,
    color: 'bg-orange-100 text-orange-600',
    delay: 0.2,
    previewUrl: '/preview/fortune',
    createUrl: '/create/fortune'
  },
  {
    id: 'vinyl',
    title: 'Vinyl Player',
    description: 'Drop the needle on a spinning record to play a cozy audio message.',
    icon: Disc,
    color: 'bg-indigo-100 text-indigo-600',
    delay: 0.3,
    previewUrl: '/preview/vinyl',
    createUrl: '/create/vinyl'
  },
  {
    id: 'bouquet',
    title: 'DigiBouquet',
    description: 'A drag-and-drop canvas to build a custom flower arrangement.',
    icon: Flower,
    color: 'bg-emerald-100 text-emerald-600',
    delay: 0.4,
    previewUrl: '/preview/bouquet',
    createUrl: '/create/bouquet'
  },
  {
    id: 'care-package',
    title: 'Care Package',
    description: 'Pack a virtual box with tea, blankets, and books for someone special.',
    icon: Package,
    color: 'bg-amber-100 text-amber-600',
    delay: 0.5,
    previewUrl: '/preview/package',
    createUrl: '/create/package'
  },
  {
    id: 'bottle',
    title: 'Message in a Bottle',
    description: 'A drifting bottle on a digital sea that holds your secret floating note.',
    icon: Waves,
    color: 'bg-cyan-100 text-cyan-600',
    delay: 0.6,
    previewUrl: '/preview/bottle',
    createUrl: '/create/bottle'
  },
  {
    id: 'scratch',
    title: 'Scratch-Off Card',
    description: 'A metallic layer you can "scratch" away with your cursor to reveal a secret.',
    icon: Sparkles,
    color: 'bg-purple-100 text-purple-600',
    delay: 0.7,
    previewUrl: '/preview/scratch',
    createUrl: '/create/scratch'
  },
  {
    id: 'cake',
    title: 'Birthday Cake',
    description: 'Digital candles you can physically "blow out" using your microphone.',
    icon: Gift,
    color: 'bg-rose-100 text-rose-500',
    delay: 0.8,
    previewUrl: '/preview/cake',
    createUrl: '/create/cake'
  },
];

export default function Home() {
  return (
    <main className="flex-1 bg-[#fffaf5]">
      {/* Hero Section */}
      <section className="px-6 py-20 md:py-32 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
            <Gift className="w-4 h-4" />
            <span>Spreading warmth, one bit at a time</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-slate-900 mb-6">
            The Thoughtfulness of Gifting,<br />
            <span className="text-rose-500 italic">Instant & Interactive.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Bloom & Note helps you bridge the distance with interactive digital gifts 
            that feel as cozy as a handwritten letter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#catalog"
              className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-semibold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
            >
              Start Creating
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Catalog Grid */}
      <section id="catalog" className="px-6 py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-slate-900 mb-4">Choose Your Gift Type</h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              Pick a canvas and start customizing an experience they won&apos;t forget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {giftTypes.map((gift) => (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: gift.delay }}
                whileHover={{ y: -5 }}
                className="group p-8 rounded-[2.5rem] border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all flex flex-col h-full"
              >
                <div className={`w-14 h-14 ${gift.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
                  <gift.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{gift.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">
                  {gift.description}
                </p>
                
                <div className="space-y-3">
                  <Link 
                    href={gift.createUrl}
                    className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-sm shadow-slate-200"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Customize
                  </Link>
                  <Link 
                    href={gift.previewUrl}
                    className="w-full py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 hover:text-slate-900 transition-all"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-slate-100 bg-white text-center">
        <p className="text-slate-400 text-sm">
          © {new Date().getFullYear()} Bloom & Note. Made with ♡ for the cozy web.
        </p>
      </footer>
    </main>
  );
}
