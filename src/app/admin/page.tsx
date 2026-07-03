import React from 'react';
import fs from 'fs';
import path from 'path';
import { updateChapterDates } from './actions';
import { Lock } from 'lucide-react';

async function getArchiveData() {
  const filePath = path.join(process.cwd(), 'src/data/archive.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export const dynamic = 'force-dynamic';

export default async function AdminPage({ searchParams }: { searchParams: { auth?: string } }) {
  // Simple password protection for demonstration
  // In production, use next-auth or a secure middleware
  if (searchParams.auth !== 'secret') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)]">
        <div className="w-16 h-16 rounded-full border border-[var(--secondary)] flex items-center justify-center mb-8">
          <Lock className="w-5 h-5 text-[var(--secondary)]" />
        </div>
        <p className="font-sans text-[10px] uppercase tracking-widest text-[var(--secondary)]">
          Access Denied. Provide ?auth=password in URL.
        </p>
      </div>
    );
  }

  const data = await getArchiveData();

  return (
    <div className="min-h-screen w-full px-6 py-24 bg-[var(--background)]">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl mb-2 text-[var(--text)]">The Archive: Director's Panel</h1>
        <p className="text-[var(--secondary)] mb-12">Manage chapter unlock dates and media (local JSON storage).</p>

        <form action={updateChapterDates} className="bg-[var(--surface)] p-8 border border-[var(--secondary)]/20 paper-shadow flex flex-col gap-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.chapters.map((chapter: any) => (
              <div key={chapter.id} className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-[var(--accent)] font-sans">
                  Chapter 0{chapter.id}: {chapter.title}
                </label>
                <input 
                  type="datetime-local" 
                  name={`chapter_${chapter.id}_date`}
                  defaultValue={new Date(chapter.unlockDate).toISOString().slice(0, 16)}
                  className="bg-[var(--background)] border border-[var(--secondary)]/30 text-[var(--text)] p-3 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>
            ))}
          </div>

          <div className="border-t border-[var(--secondary)]/20 pt-8 flex justify-end">
            <button 
              type="submit"
              className="px-8 py-3 bg-[var(--text)] text-[var(--background)] font-sans text-[10px] uppercase tracking-widest hover:bg-[var(--accent)] transition-colors"
            >
              Publish Changes
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
