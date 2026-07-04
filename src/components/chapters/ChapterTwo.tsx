'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MOCK_IMAGES = [
  '/IMG_2715.JPG',
  '/IMG_2753.JPG',
  '/IMG_E2558.JPG',
  '/IMG_E2595.JPG',
  '/MQSJ5353.JPG',
];

export default function ChapterTwo() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div ref={containerRef} className="min-h-[200vh] w-full px-6 py-24 md:py-32 relative bg-[var(--background)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-32">
          <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[var(--secondary)] mb-6 block">
            Chapter 02
          </span>
          <h2 className="font-serif text-[clamp(40px,6vw,80px)] text-[var(--text)]">Little Moments</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

          {/* Column 1 */}
          <motion.div style={{ y: y1 }} className="flex flex-col gap-12 pt-24">
            <div className="relative aspect-[3/4] overflow-hidden group paper-shadow">
              <img src={MOCK_IMAGES[0]} alt="Memory" className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
            </div>
            <div className="relative aspect-square overflow-hidden group paper-shadow">
              <img src={MOCK_IMAGES[1]} alt="Memory" className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
            </div>
          </motion.div>

          {/* Column 2 */}
          <motion.div style={{ y: y2 }} className="flex flex-col gap-12">
            <div className="relative aspect-[4/5] overflow-hidden group paper-shadow">
              <img src={MOCK_IMAGES[2]} alt="Memory" className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
            </div>
            <div className="p-8 border border-[var(--secondary)]/20 text-center flex items-center justify-center aspect-square">
              <p className="font-serif italic text-xl md:text-2xl text-[var(--secondary)]">
                "We didn't realize we were making memories. We just knew we were having fun."
              </p>
            </div>
          </motion.div>

          {/* Column 3 */}
          <motion.div style={{ y: y3 }} className="flex flex-col gap-12 pt-48">
            <div className="relative aspect-square overflow-hidden group paper-shadow">
              <img src={MOCK_IMAGES[3]} alt="Memory" className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden group paper-shadow">
              <img src={MOCK_IMAGES[4]} alt="Memory" className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
