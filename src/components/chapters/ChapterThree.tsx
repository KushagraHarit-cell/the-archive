'use client';

import React, { useRef, useState } from 'react';
import { Play, Pause, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ChapterThree() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-[var(--background)] px-6">

      {/* Cinema Mode Background */}
      <div className={`absolute inset-0 bg-black transition-opacity duration-1000 ${isPlaying ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`} />

      <div className="max-w-5xl w-full relative z-10 flex flex-col items-center">

        <div className={`text-center mb-12 transition-opacity duration-700 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
          <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[var(--secondary)] mb-6 block">
            Chapter 03
          </span>
          <h2 className="font-serif text-[clamp(40px,6vw,80px)] text-[var(--text)]">Our Story</h2>
        </div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-full aspect-video bg-[var(--surface)] cinematic-shadow group overflow-hidden border border-[var(--secondary)]/10"
        >
          {/* We use a placeholder video for demonstration */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover opacity-80"
            src="/YAXO1680.MP4"
            loop
            muted={false}
            playsInline
          />

          {/* Grain overlay for cinematic feel */}
          <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />

          {/* Custom Controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
            <div className="flex items-center justify-between w-full">
              <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-md"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
              </button>

              {/* Subtitles Area (Mock) */}
              <div className="flex-grow text-center px-4">
                {isPlaying && (
                  <span className="font-serif italic text-white/80 text-lg tracking-wide">
                    "Do you remember that day..."
                  </span>
                )}
              </div>

              <button
                onClick={handleFullscreen}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
