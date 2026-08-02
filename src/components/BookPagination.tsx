"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import searchIndex from '../data/searchIndex.json';
import { getChapterIdFromPath, getChapterUrl } from '../lib/htmlLessonsHelper';

const chapters = searchIndex.map(item => ({
  id: item.id,
  title: `${item.phase}: ${item.title.split(': ')[1] || item.title}`
}));

const BookPagination = () => {
  const pathname = usePathname();
  const currentIndex = chapters.findIndex(c => c.id === getChapterIdFromPath(pathname));

  if (currentIndex === -1) return null;

  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-slate-800 gap-4">
      {prevChapter ? (
        <Link 
          href={getChapterUrl(prevChapter.id)}
          className="flex flex-col w-full sm:w-1/2 p-4 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all group"
        >
          <span className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1 group-hover:text-blue-500">
            <ChevronLeft size={14} /> Previous
          </span>
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{prevChapter.title}</span>
        </Link>
      ) : <div className="w-full sm:w-1/2" />}

      {nextChapter ? (
        <Link 
          href={getChapterUrl(nextChapter.id)}
          className="flex flex-col w-full sm:w-1/2 items-end text-right p-4 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all group"
        >
          <span className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1 flex items-center justify-end gap-1 group-hover:text-blue-500">
            Next <ChevronRight size={14} />
          </span>
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{nextChapter.title}</span>
        </Link>
      ) : <div className="w-full sm:w-1/2" />}
    </div>
  );
};

export default BookPagination;
