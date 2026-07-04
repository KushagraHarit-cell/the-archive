'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ChapterFour() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-[150vh] w-full flex items-center justify-center relative bg-[var(--background)] py-32 px-6">
      <div ref={containerRef} className="max-w-3xl w-full">

        <div className="text-center mb-24">
          <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[var(--secondary)] mb-6 block">
            Chapter 04
          </span>
          <h2 className="font-serif text-[clamp(40px,6vw,80px)] text-[var(--text)]">Almost There</h2>
        </div>

        {/* The Letter */}
        <div className="relative bg-[var(--paper)] text-[var(--background)] p-12 md:p-24 paper-shadow overflow-hidden min-h-[80vh]">

          {/* Paper Texture */}
          <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

          {/* Ink Reveal Animation Overlay using Clip Path */}
          <motion.div
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={isInView ? { clipPath: "circle(150% at 50% 50%)" } : { clipPath: "circle(0% at 50% 50%)" }}
            transition={{ duration: 3, ease: [0.76, 0, 0.24, 1] }}
            className="relative z-10"
          >
            <p className="font-serif text-2xl md:text-4xl leading-[1.8] tracking-wide mb-12">
              My dearest,
            </p>
            <p className="font-serif text-xl md:text-3xl leading-[2] tracking-wide mb-12 opacity-90">
              Pata hai, log kehte hain birthdays sirf ek aur saal badhne ka din hote hai. Par mere liye aaj ka din us insaan ko celebrate karne ka din hai jisne meri life ko itna beautiful bana diya. Thank you... meri har smile ka reason banne ke liye, meri bakwaas sunne ke liye, mujhe samajhne ke liye, aur har din mujhe thoda aur better insaan banane ke liye. Meri sirf ek wish hai—chahe life kitni bhi busy ya difficult ho jaaye, teri smile kabhi kam na ho. Aur jab kabhi tu thak jaaye, ya lage ki sab kuch bahut zyada ho raha hai, bas yaad rakhna... tujhe sab kuch akela nahi sambhalna. Me hamesha tere saath hu. Me perfect nahi hu, aur shayad kabhi ho bhi na paau. Par ek cheez ka promise karta hu me har din tujhe wahi pyaar, respect aur care dene ki koshish karunga jiski tu haqdaar hai.
            </p>
            <p className="font-serif text-xl md:text-3xl leading-[2] tracking-wide mb-16 opacity-90">
              Thank you for being you. Aur thank you meri life ka itna khoobsurat hissa banne ke liye.
            </p>

            <div className="flex flex-col items-end opacity-80">
              <span className="font-serif text-2xl italic mb-2">With all my love,</span>
              <span className="font-serif text-3xl">Yours, always.❤️</span>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
