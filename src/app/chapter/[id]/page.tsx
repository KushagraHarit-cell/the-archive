import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import LockedState from '@/components/LockedState';
import ChapterOne from '@/components/chapters/ChapterOne';
import ChapterTwo from '@/components/chapters/ChapterTwo';
import ChapterThree from '@/components/chapters/ChapterThree';
import ChapterFour from '@/components/chapters/ChapterFour';
import FinalChapter from '@/components/chapters/FinalChapter';

// In a real scenario, this data fetching might be abstracted
async function getChapterData(id: string) {
  const filePath = path.join(process.cwd(), 'src/data/archive.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  return data.chapters.find((c: any) => c.id.toString() === id);
}

// Ensure dynamic rendering to check server time accurately on request
export const dynamic = 'force-dynamic';

export default async function ChapterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const chapter = await getChapterData(id);

  if (!chapter) {
    notFound();
  }

  const now = new Date().getTime();
  const unlockTime = new Date(chapter.unlockDate).getTime();

  // STRICT SERVER-SIDE VALIDATION
  // If the server time is before the unlock time, the client receives ONLY the LockedState HTML.
  // The future content physically does not exist in the source code sent to the browser.
  if (now < unlockTime) {
    return <LockedState unlockDate={chapter.unlockDate} />;
  }

  // --- UNLOCKED CONTENT BELOW ---
  
  switch (chapter.id) {
    case 1:
      return <ChapterOne />;
    case 2:
      return <ChapterTwo />;
    case 3:
      return <ChapterThree />;
    case 4:
      return <ChapterFour />;
    case 5:
      return <FinalChapter />;
    default:
      return notFound();
  }
}
