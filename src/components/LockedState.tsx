import React from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';

interface LockedStateProps {
  unlockDate: string;
}

export default function LockedState({ unlockDate }: LockedStateProps) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-6">
      <div className="flex flex-col items-center z-10 p-12 md:p-24 bg-[var(--surface)] border border-[var(--secondary)]/10 paper-shadow">
        
        <div className="w-20 h-20 rounded-full border border-[var(--secondary)]/20 flex items-center justify-center mb-8 bg-[var(--background)]">
          <Lock className="w-6 h-6 text-[var(--secondary)] opacity-80" strokeWidth={1} />
        </div>

        <h2 className="font-serif text-4xl text-[var(--text)] mb-4">
          Sealed Record
        </h2>
        


        <p className="text-[var(--secondary)] text-sm italic font-serif mb-12">
          &quot;Patience reveals beautiful things.&quot;
        </p>

        <Link href="/timeline" className="text-[9px] uppercase tracking-[0.3em] text-[var(--text)] border-b border-[var(--text)]/20 pb-1 hover:border-[var(--text)] transition-colors">
          Return to Archive
        </Link>
      </div>
    </div>
  );
}
