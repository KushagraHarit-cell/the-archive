import fs from 'fs';
import path from 'path';
import Link from 'next/link';

interface Chapter {
  id: number;
  title: string;
  unlockDate: string;
  description: string;
}

async function getChapters(): Promise<Chapter[]> {
  const filePath = path.join(process.cwd(), 'src/data/archive.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  return data.chapters;
}

export default async function TimelinePage() {
  const chapters = await getChapters();
  const now = new Date().getTime();

  return (
    <div className="min-h-screen w-full px-6 md:px-12 py-24 md:py-32 relative">
      <div className="max-w-4xl mx-auto flex flex-col gap-12 relative z-10">
        
        {/* Header */}
        <div className="mb-12 border-b border-[var(--secondary)]/20 pb-12">
          <h1 className="font-serif text-[clamp(40px,6vw,80px)] text-[var(--text)] tracking-tight leading-none mb-4">
            The Exhibition
          </h1>
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--secondary)]">
            Five installments. One story.
          </p>
        </div>

        {/* Timeline List */}
        <div className="flex flex-col gap-16">
          {chapters.map((chapter, index) => {
            const unlockTime = new Date(chapter.unlockDate).getTime();
            const isUnlocked = now >= unlockTime;
            
            // Determine if it's the "Current" chapter (the most recently unlocked one)
            const nextChapterTime = chapters[index + 1] ? new Date(chapters[index + 1].unlockDate).getTime() : Infinity;
            const isCurrent = isUnlocked && now < nextChapterTime;

            return (
              <div 
                key={chapter.id}
                className={`flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center group ${!isUnlocked ? 'opacity-50 grayscale' : ''}`}
              >
                {/* Number / Status Indicator */}
                <div className="flex flex-col items-center gap-4 w-12 flex-shrink-0">
                  <span className="font-serif text-3xl italic text-[var(--secondary)]">0{chapter.id}</span>
                  {isUnlocked && (
                    <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--text)] to-transparent" />
                  )}
                </div>

                {/* Content Area */}
                <div className="flex-grow border border-[var(--secondary)]/10 bg-[var(--surface)] p-8 relative overflow-hidden paper-shadow">
                  
                  {/* Status Badge */}
                  <div className="absolute top-8 right-8 flex items-center gap-2">
                    {isCurrent ? (
                      <span className="flex items-center gap-2 text-[8px] uppercase tracking-widest text-[var(--accent)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                        
                      </span>
                    ) : !isUnlocked && (
                      <span className="text-[8px] uppercase tracking-widest text-[var(--secondary)]">Sealed</span>
                    )}
                  </div>


                  
                  <h2 className="font-serif text-4xl md:text-5xl text-[var(--text)] mb-4 tracking-[-0.02em]">
                    {chapter.title}
                  </h2>
                  
                  <p className="text-sm text-[var(--secondary)] max-w-md">
                    {isUnlocked ? chapter.description : "Patience reveals beautiful things."}
                  </p>

                  {isUnlocked && (
                    <div className="mt-8">
                      <Link href={`/chapter/${chapter.id}`} className="text-[9px] uppercase tracking-[0.3em] font-sans text-[var(--text)] border-b border-[var(--text)]/20 pb-1 hover:border-[var(--text)] transition-colors">
                        Enter Chapter
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
