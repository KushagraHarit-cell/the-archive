'use client';

import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';

export default function VinylPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div 
      className="fixed bottom-8 left-8 z-[100] flex items-center group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor={isPlaying ? "PAUSE" : "PLAY"}
      onClick={togglePlay}
    >
      
      {/* Vinyl Record */}
      <div 
        className="relative w-14 h-14 rounded-full bg-[#111111] border border-white/10 cinematic-shadow flex items-center justify-center overflow-hidden z-20"
        style={{
          animation: isPlaying ? 'spin 4s linear infinite' : 'none'
        }}
      >
        <div className="absolute inset-1 rounded-full border border-white/5" />
        <div className="absolute inset-2 rounded-full border border-white/5" />
        <div className="absolute inset-[10px] rounded-full border border-white/5" />
        <div className="absolute inset-3 rounded-full border border-[var(--accent)]/20" />
        
        {/* Reflection */}
        <div className="absolute top-0 left-1/2 w-[200%] h-[200%] bg-gradient-to-tr from-white/0 via-white/5 to-white/0 -translate-x-1/2 -translate-y-1/2 rotate-45 pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity" />

        {/* Label */}
        <div className="w-4 h-4 rounded-full bg-[var(--accent)] flex items-center justify-center z-10 border border-[#111111]">
          <div className="w-1 h-1 rounded-full bg-[var(--background)]" />
        </div>
      </div>

      {/* Control Panel Slide Out */}
      <div 
        className={`bg-[var(--surface)] border border-[var(--secondary)]/20 rounded-full py-2 px-6 flex items-center gap-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left -ml-4 pl-8 paper-shadow ${
          isHovered || isPlaying ? 'opacity-100 scale-x-100 translate-x-0' : 'opacity-0 scale-x-50 -translate-x-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col min-w-[120px]">
          <div className="flex items-center gap-2 mb-0.5">
            {isPlaying && (
              <div className="flex gap-0.5 items-center h-2">
                <span className="w-0.5 h-full bg-[var(--accent)] animate-[eq_1s_ease-in-out_infinite]" />
                <span className="w-0.5 h-1/2 bg-[var(--accent)] animate-[eq_1.2s_ease-in-out_infinite_0.2s]" />
                <span className="w-0.5 h-3/4 bg-[var(--accent)] animate-[eq_0.8s_ease-in-out_infinite_0.4s]" />
              </div>
            )}
            <span className="text-xs font-serif font-medium text-[var(--text)] truncate">Clair de Lune</span>
          </div>
          <span className="text-[8px] uppercase tracking-[0.3em] text-[var(--secondary)] truncate font-sans">Debussy</span>
        </div>

        <div className="border-l border-[var(--secondary)]/20 pl-4 text-[var(--secondary)]">
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes eq {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
