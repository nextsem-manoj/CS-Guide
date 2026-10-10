"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, CheckCircle2, ArrowLeft, Play, Sparkles, Award, FileText, Search 
} from 'lucide-react';
import { unit1Lessons, PDF_URL } from '@/data/unit1LessonsData';
import BcaHeaderNav from '@/components/bca/BcaHeaderNav';

export default function Unit1LessonsHubPage() {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [userEmail, setUserEmail] = useState('guest');
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    const savedUser = localStorage.getItem('nextsem_user');
    let email = 'guest';
    if (savedUser) {
      try { email = JSON.parse(savedUser).email || 'guest'; } catch (e) {}
    }
    setUserEmail(email);

    const completedKey = `nextsem_unit1_completed_${email}`;
    const list: string[] = JSON.parse(localStorage.getItem(completedKey) || '[]');
    setCompletedIds(list);

    const savedPts = parseInt(localStorage.getItem(`nextsem_bca_points_${email}`) || '0', 10);
    setUserPoints(savedPts);
  }, []);

  const filteredLessons = unit1Lessons.filter(lesson => 
    lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.hinglishTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.lessonNumber.toString().includes(searchQuery)
  );

  const completedPct = Math.round((completedIds.length / unit1Lessons.length) * 100);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col font-sans pb-20 transition-colors">
      <BcaHeaderNav currentSubjectCode="BCS-111" currentSubjectName="Computer Basics & PC Software" />

      <main className="max-w-5xl mx-auto px-4 py-6 w-full flex-1">
        {/* Navigation Breadcrumbs */}
        <nav aria-label="Breadcrumbs" className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-bold py-1 mb-4">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
            <span>🏠 Home</span>
          </Link>
          <span className="text-slate-400 dark:text-slate-600 font-bold">❯</span>
          <Link href="/bca" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            BCA Hub
          </Link>
          <span className="text-slate-400 dark:text-slate-600 font-bold">❯</span>
          <Link href="/bca/semester-1" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Semester 1
          </Link>
          <span className="text-slate-400 dark:text-slate-600 font-bold">❯</span>
          <Link href="/bca/semester-1/bcs-011-computer-basics" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            BCS-111
          </Link>
          <span className="text-slate-400 dark:text-slate-600 font-bold">❯</span>
          <span className="text-blue-600 dark:text-blue-400 font-extrabold">Unit 1 Lessons Hub</span>
        </nav>

        {/* Back Link */}
        <div className="mb-4">
          <Link
            href="/bca/semester-1/bcs-011-computer-basics"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline bg-slate-100 dark:bg-neutral-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-neutral-800 transition-all"
          >
            <ArrowLeft size={14} />
            <span>Back to BCS-111 Subject Dashboard</span>
          </Link>
        </div>

        {/* Hero Header Banner */}
        <div className="bg-slate-50 dark:bg-neutral-950 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-neutral-800 shadow-sm mb-8 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-neutral-900 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-800 text-xs font-black uppercase tracking-wider">
                  IGNOU BCS-111 • Unit 1
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-neutral-900 text-black dark:text-white border border-slate-200 dark:border-neutral-800 text-xs font-black uppercase tracking-wider">
                  50 Micro-Lessons
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-black dark:text-white leading-tight">
                Computer Their Origin & Applications 💻
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
                Complete unit PDF broken down into 50 visual, bite-sized lessons with Hinglish & English explanations, PDF page citations, and practice MCQs.
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 font-bold">
                Author & Educator: Er. Manoj Kumar
              </p>
            </div>

            {/* Progress Card */}
            <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-slate-200 dark:border-neutral-800 shrink-0 w-full sm:w-56 text-center shadow-sm">
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{completedPct}%</div>
              <div className="text-xs font-extrabold text-slate-500 dark:text-slate-400 mt-0.5 uppercase tracking-wider">
                {completedIds.length} of 50 Lessons
              </div>
              <div className="w-full bg-slate-200 dark:bg-neutral-800 h-2 rounded-full mt-3 overflow-hidden">
                <div 
                  className="bg-blue-600 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${completedPct}%` }}
                ></div>
              </div>
              <div className="text-[11px] text-blue-600 dark:text-blue-400 font-bold mt-2.5 flex items-center justify-center gap-1">
                <Award size={13} /> {userPoints} Total Points
              </div>
            </div>
          </div>
        </div>

        {/* Search & PDF Link Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search 50 lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-all"
            />
          </div>

          <Link
            href={`/bca/viewer?file=${encodeURIComponent(PDF_URL)}&title=${encodeURIComponent('Computer their Origin and Applications')}`}
            target="_blank"
            className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-black dark:text-white border border-slate-200 dark:border-neutral-800 text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <FileText size={14} className="text-blue-600 dark:text-blue-400" />
            <span>Open Original 22-Page PDF Notes</span>
          </Link>
        </div>

        {/* 50 Lessons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {filteredLessons.map((lesson) => {
            const isDone = completedIds.includes(lesson.id);

            return (
              <Link
                key={lesson.id}
                href={`/bca/semester-1/bcs-011-computer-basics/unit-1/lessons/${lesson.id}`}
                className={`p-4 rounded-2xl border transition-all duration-200 group flex items-center justify-between gap-3 ${
                  isDone 
                    ? 'bg-blue-50/40 dark:bg-neutral-900/40 border-blue-600/50 hover:border-blue-600' 
                    : 'bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 hover:border-blue-600/60'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 font-bold ${
                    isDone 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-100 dark:bg-neutral-800 text-black dark:text-white border border-slate-200 dark:border-neutral-700'
                  }`}>
                    {isDone ? <CheckCircle2 size={18} className="text-white" /> : lesson.emoji}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 font-mono">
                        Lesson #{lesson.lessonNumber}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500">
                        PDF Page {lesson.pdfPage}
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-extrabold text-black dark:text-white truncate leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mt-0.5">
                      {lesson.title}
                    </h3>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-1 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                  <Play size={14} className="fill-blue-600 dark:fill-blue-400" />
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
