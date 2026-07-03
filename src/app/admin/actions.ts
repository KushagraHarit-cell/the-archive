'use server';

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

export async function updateChapterDates(formData: FormData) {
  const filePath = path.join(process.cwd(), 'src/data/archive.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);

  // Update the dates based on form data
  data.chapters = data.chapters.map((chapter: any) => {
    const newDate = formData.get(`chapter_${chapter.id}_date`);
    if (newDate) {
      return { ...chapter, unlockDate: newDate };
    }
    return chapter;
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  
  // Revalidate the timeline and chapter routes so they update immediately
  revalidatePath('/timeline');
  revalidatePath('/chapter/[id]', 'page');
  revalidatePath('/vault');
}
