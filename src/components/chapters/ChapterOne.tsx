'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChapterOne() {
  const [isOpen, setIsOpen] = useState(false);
  const [showText, setShowText] = useState(false);

  // Typewriter effect variables
  const message = "Kuch moments bahut simple hote hain... na koi shor, na koi grand beginning. Phir bhi wahi moments poori life ki direction badal dete hai Pata hi nahi chala kab teri baatein meri aadat ban gayi, kab teri smile meri favourite cheez ban gayi, aur kab tera khayal rakhna meri routine nahi, meri khushi ban gaya. Shayad humari story kisi ek bade moment se shuru nahi hui... balki un hazaar chhoti-chhoti baaton se, jo dheere dheere mujhe sirf tere paas le aayi. 🤍";
  const words = message.split(' ');

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-[var(--background)]">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="relative cursor-pointer group"
            onClick={() => {
              setIsOpen(true);
              setTimeout(() => setShowText(true), 1500);
            }}
          >
            {/* The Envelope Representation */}
            <div className="w-[300px] md:w-[500px] h-[200px] md:h-[320px] bg-[var(--surface)] border border-[var(--secondary)]/20 paper-shadow relative flex items-center justify-center overflow-hidden transition-transform duration-700 group-hover:scale-105">

              {/* Flap lines */}
              <div className="absolute top-0 left-0 w-full h-full">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,0 L50,50 L100,0" stroke="var(--secondary)" strokeOpacity="0.2" strokeWidth="0.5" fill="none" />
                  <path d="M0,100 L50,50 L100,100" stroke="var(--secondary)" strokeOpacity="0.1" strokeWidth="0.5" fill="none" />
                </svg>
              </div>

              {/* Wax Seal */}
              <div className="w-12 h-12 rounded-full bg-[var(--accent)] absolute z-10 flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-90">
                <span className="text-[var(--background)] font-serif text-xl italic">A</span>
              </div>

              <span className="absolute bottom-6 text-[8px] uppercase tracking-[0.4em] text-[var(--secondary)]">Click to break seal</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="w-full max-w-2xl px-6 md:px-0"
          >
            {/* The Unfolded Paper */}
            <div className="bg-[var(--paper)] text-[var(--background)] p-12 md:p-24 min-h-[60vh] cinematic-shadow relative overflow-hidden flex flex-col justify-center">

              {/* Paper Texture Overlay */}
              <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

              <h3 className="font-serif text-3xl md:text-5xl mb-12 relative z-10">Chapter One</h3>

              {showText && (
                <p className="font-serif text-xl md:text-3xl leading-relaxed relative z-10">
                  {words.map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.1, delay: i * 0.15 }} // Typewriter timing
                      className="inline-block mr-2"
                    >
                      {word}
                    </motion.span>
                  ))}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
