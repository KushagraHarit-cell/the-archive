'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import RollingDigits from '@/components/ui/RollingDigits';

export default function LandingPage() {
  const [targetDate] = useState(new Date("2026-07-29T00:00:00").getTime());
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setIsBirthday(true);
        clearInterval(timer);
        return;
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-6">
      
      {/* Title */}
      <div className="flex flex-col items-center text-center z-10 mb-20">
        <h1 className="font-serif text-[clamp(60px,10vw,140px)] text-[var(--text)] tracking-tight">
          The Archive
        </h1>
        <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[var(--secondary)] mt-6">
          For one extraordinary person.
        </p>
      </div>

      {/* Countdown Area */}
      <div className="z-10 flex flex-col items-center mb-24 min-h-[120px]">
        {isBirthday ? (
          <h2 className="font-serif text-5xl md:text-7xl text-[var(--accent)] tracking-wide">
            Happy Birthday
          </h2>
        ) : (
          <div className="flex gap-6 md:gap-12 items-end">
            <RollingDigits value={countdown.days} label="Days" />
            <span className="text-[var(--secondary)] font-serif italic text-4xl -mt-6">,</span>
            <RollingDigits value={countdown.hours} label="Hours" />
            <span className="text-[var(--secondary)] font-serif italic text-4xl -mt-6">,</span>
            <RollingDigits value={countdown.minutes} label="Mins" />
          </div>
        )}
      </div>

      {/* Enter Button */}
      <div className="z-10 mt-8">
        <Link href="/timeline" className="group relative px-8 py-4 flex items-center justify-center cursor-pointer">
          <span className="relative z-10 text-[9px] uppercase tracking-[0.3em] font-sans text-[var(--text)] transition-colors duration-500 group-hover:text-[var(--background)]">
            Enter Archive
          </span>
          <div className="absolute inset-0 border border-[var(--text)]/20 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[var(--text)] group-hover:scale-105" />
        </Link>
      </div>

    </div>
  );
}
