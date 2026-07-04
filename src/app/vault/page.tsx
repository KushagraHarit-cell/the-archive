import React from 'react';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

// For this project, we check if all chapters are unlocked before allowing access to the vault.
async function isVaultUnlocked() {
  const filePath = path.join(process.cwd(), 'src/data/archive.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  
  const now = new Date().getTime();
  // Assume chapter 5 is the final chapter
  const finalChapter = data.chapters.find((c: any) => c.id === 5);
  if (!finalChapter) return true; // fallback
  
  const unlockTime = new Date(finalChapter.unlockDate).getTime();
  return now >= unlockTime;
}

export const dynamic = 'force-dynamic';

export default async function MemoryVaultPage() {
  const unlocked = await isVaultUnlocked();

  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6">
        <div>
          <h1 className="font-serif text-3xl mb-4">The Vault is Sealed</h1>
          <p className="text-[var(--secondary)] text-sm mb-8">It will open when the final chapter is revealed.</p>
          <Link href="/timeline" className="text-[9px] uppercase tracking-[0.3em] text-[var(--accent)] border-b border-[var(--accent)]/20 pb-1">Return</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full px-6 md:px-12 py-24 md:py-32 relative">
      <div className="max-w-6xl mx-auto flex flex-col gap-12 relative z-10">
        
        {/* Header */}
        <div className="mb-12 border-b border-[var(--secondary)]/20 pb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="font-serif text-[clamp(40px,6vw,80px)] text-[var(--text)] tracking-tight leading-none mb-4">
              Memory Vault
            </h1>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--secondary)]">
              Unlocked Forever
            </p>
          </div>
          <Link href="/timeline" className="text-[9px] uppercase tracking-[0.3em] text-[var(--text)] border-b border-[var(--text)]/20 pb-1 hover:border-[var(--text)] transition-colors">
            Back to For My Forever Favourite
          </Link>
        </div>

        {/* Vault Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="p-12 border border-[var(--secondary)]/20 bg-[var(--surface)] paper-shadow group cursor-pointer hover:bg-[var(--text)] transition-colors duration-500">
            <h3 className="font-serif text-2xl text-[var(--text)] group-hover:text-[var(--background)] transition-colors mb-4">Letters</h3>
            <p className="text-sm text-[var(--secondary)] group-hover:text-[var(--background)]/70 transition-colors">7 sealed notes</p>
          </div>

          <div className="p-12 border border-[var(--secondary)]/20 bg-[var(--surface)] paper-shadow group cursor-pointer hover:bg-[var(--text)] transition-colors duration-500">
            <h3 className="font-serif text-2xl text-[var(--text)] group-hover:text-[var(--background)] transition-colors mb-4">Gallery</h3>
            <p className="text-sm text-[var(--secondary)] group-hover:text-[var(--background)]/70 transition-colors">124 photographs</p>
          </div>

          <div className="p-12 border border-[var(--secondary)]/20 bg-[var(--surface)] paper-shadow group cursor-pointer hover:bg-[var(--text)] transition-colors duration-500">
            <h3 className="font-serif text-2xl text-[var(--text)] group-hover:text-[var(--background)] transition-colors mb-4">Videos</h3>
            <p className="text-sm text-[var(--secondary)] group-hover:text-[var(--background)]/70 transition-colors">12 moments</p>
          </div>

          <div className="p-12 border border-[var(--secondary)]/20 bg-[var(--surface)] paper-shadow group cursor-pointer hover:bg-[var(--text)] transition-colors duration-500">
            <h3 className="font-serif text-2xl text-[var(--text)] group-hover:text-[var(--background)] transition-colors mb-4">Voice Notes</h3>
            <p className="text-sm text-[var(--secondary)] group-hover:text-[var(--background)]/70 transition-colors">5 recordings</p>
          </div>

        </div>

      </div>
    </div>
  );
}
