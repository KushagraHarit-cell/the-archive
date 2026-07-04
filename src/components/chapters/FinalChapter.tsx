'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Mock array for photo wall
const MOCK_IMAGES = Array(12).fill('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600');

export default function FinalChapter() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // On mount, we would trigger global confetti/fireworks here using a canvas library like canvas-confetti
    // For this implementation, we simulate it via CSS/Framer
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-[200vh] w-full relative bg-[#F8F7F3] text-[#050505] overflow-hidden transition-colors duration-1000">
      
      {/* Dynamic DOM Takeover: We inverse the colors specifically for this chapter to signify the climax */}
      
      {/* Hero Section */}
      <div className="h-screen w-full flex flex-col items-center justify-center relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
          className="text-center"
        >
          <span className="font-sans text-[12px] uppercase tracking-[0.5em] text-[#C8A96A] mb-8 block font-medium">
            July 29th
          </span>
          <h1 className="font-serif text-[clamp(60px,12vw,160px)] leading-[0.8] tracking-[-0.04em] mb-12">
            Happy<br/>Birthday
          </h1>
          <p className="font-sans text-sm uppercase tracking-widest text-[#999999]">
            For My Forever Favourite is now fully unlocked.
          </p>
        </motion.div>
      </div>

      {/* Photo Wall */}
      <div className="w-full px-6 md:px-12 py-32 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {MOCK_IMAGES.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (idx % 4) * 0.1 }}
              className="aspect-square relative overflow-hidden group paper-shadow"
            >
              <img src={img} alt="Birthday Memory" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
