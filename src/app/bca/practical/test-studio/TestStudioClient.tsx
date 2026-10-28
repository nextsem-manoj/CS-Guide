"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, ArrowRight, Zap, Code2, Globe, CheckCircle2, 
  ChevronRight, Sparkles, BookOpen
} from "lucide-react";
import BcaHeaderNav from "@/components/bca/BcaHeaderNav";
import PracticalTaskLiveCodingStudio from "@/components/bca/PracticalTaskLiveCodingStudio";
import { PRACTICAL_LESSONS, PracticalLesson } from "@/data/bcaPracticalData";
import { useStudentProgress } from "@/context/StudentProgressContext";

function TestStudioInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dayParam = searchParams.get("day");
  const initialDay = dayParam ? parseInt(dayParam, 10) : 1;

  const [activeDay, setActiveDay] = useState<number>(() => {
    return isNaN(initialDay) || initialDay < 1 ? 1 : initialDay;
  });

  const { isDayCompleted } = useStudentProgress();

  const currentLesson = useMemo<PracticalLesson>(() => {
    return PRACTICAL_LESSONS.find(l => l.day === activeDay) || PRACTICAL_LESSONS[0];
  }, [activeDay]);

  const nextLesson = useMemo<PracticalLesson | undefined>(() => {
    return PRACTICAL_LESSONS.find(l => l.day === activeDay + 1);
  }, [activeDay]);

  const prevLesson = useMemo<PracticalLesson | undefined>(() => {
    return PRACTICAL_LESSONS.find(l => l.day === activeDay - 1);
  }, [activeDay]);

  const handleSelectDay = (day: number) => {
    setActiveDay(day);
    router.replace(`/bca/practical/test-studio?day=${day}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-black dark:text-white flex flex-col font-sans transition-colors">
      {/* Top Navbar */}
      <BcaHeaderNav 
        currentSubjectCode="Live Test Studio" 
        currentSubjectName="HTML & CSS Task Evaluation" 
      />

      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-4 w-full flex-1">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4 overflow-x-auto whitespace-nowrap py-1">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 font-bold">
            🏠 Home
          </Link>
          <span>❯</span>
          <Link href="/bca" className="hover:text-blue-600 dark:hover:text-blue-400 font-bold">
            BCA Hub
          </Link>
          <span>❯</span>
          <Link href="/bca/practical" className="hover:text-blue-600 dark:hover:text-blue-400 font-bold">
            Practical Portal
          </Link>
          <span>❯</span>
          <span className="text-black dark:text-white font-extrabold flex items-center gap-1">
            <Zap size={13} className="text-amber-500 fill-amber-500" />
            <span>Test Studio (Day {activeDay})</span>
          </span>
        </nav>

        {/* Studio Header Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 shadow-sm mb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-black text-xs border border-blue-200 dark:border-blue-900">
                Day {currentLesson.day} of {PRACTICAL_LESSONS.length}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                {currentLesson.category}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight">
              {currentLesson.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Type HTML and CSS on the left side. The real-time regex validator tests your code as you type, and auto-advances to the next lesson once all tasks pass!
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={`/bca/practical/${currentLesson.slug}`}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-neutral-900 hover:bg-slate-200 dark:hover:bg-neutral-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <BookOpen size={13} />
              <span>Full Lesson Guide</span>
            </Link>

            {prevLesson && (
              <button
                type="button"
                onClick={() => handleSelectDay(prevLesson.day)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-neutral-900 hover:bg-slate-200 dark:hover:bg-neutral-800 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all cursor-pointer"
                title={`Previous Day: Day ${prevLesson.day}`}
              >
                <ArrowLeft size={16} />
              </button>
            )}

            {nextLesson && (
              <button
                type="button"
                onClick={() => handleSelectDay(nextLesson.day)}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <span>Day {nextLesson.day}</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Quick Day Selector Bar (Days 1 to 50) */}
        <div className="mb-5 overflow-x-auto pb-2 scrollbar-thin">
          <div className="flex items-center gap-1.5 min-w-max">
            {PRACTICAL_LESSONS.map((l) => {
              const isCurrent = l.day === activeDay;
              const completed = isDayCompleted(l.day);
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => handleSelectDay(l.day)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isCurrent
                      ? "bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/40"
                      : completed
                      ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60"
                      : "bg-white dark:bg-neutral-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-neutral-800 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {completed ? (
                    <CheckCircle2 size={12} className="text-emerald-500" />
                  ) : (
                    <span className="text-[11px] opacity-70">#{l.day}</span>
                  )}
                  <span>Day {l.day}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── LIVE INTERACTIVE CODING TEST STUDIO (Left Side: Test & Editor, Right Side: Live Browser, Auto-Advance) ── */}
        <PracticalTaskLiveCodingStudio
          key={`studio-day-${currentLesson.day}`}
          lesson={currentLesson}
          nextLesson={nextLesson}
          onAllTasksPassed={() => {
            // Callback when all tasks pass
          }}
        />
      </main>
    </div>
  );
}

export default function TestStudioClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 dark:bg-black flex items-center justify-center p-6 text-sm font-bold text-slate-500">
        Loading Practical Test Studio...
      </div>
    }>
      <TestStudioInner />
    </Suspense>
  );
}
