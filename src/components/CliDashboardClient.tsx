"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Play, BookOpen, CheckCircle, Lock, Award, 
  ChevronRight, ArrowRight, Zap, Target, Star
} from "lucide-react";
import { cliLessons } from "../data/cliLessonsData";
import AdSenseBanner from "./AdSenseBanner";

export default function CliDashboardClient() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("guest");
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());

  // Load progress on mount — works without login (guest user)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nextsem_user");
      let email = "guest";
      if (saved) {
        try {
          const userObj = JSON.parse(saved);
          if (userObj?.email) {
            email = userObj.email;
          }
        } catch (e) {}
      }
      setUserEmail(email);

      // Load progress (we check from local storage or context if they marked complete)
      const completed = new Set<number>();
      
      // Also sync from standard completedChapters progress context if available
      // Because MarkCompleteButton uses `completedChapters` which writes `nextsem_completed_chapters_${email}`
      // Let's check completed chapters:
      let chaptersObj: Record<string, boolean> = {};
      try {
        const savedChapters = localStorage.getItem(`nextsem_completed_chapters_${email}`);
        if (savedChapters) {
          chaptersObj = JSON.parse(savedChapters);
        }
      } catch (e) {}

      cliLessons.forEach(lesson => {
        // Check both custom key and progressContext completed chapters
        const isDone = localStorage.getItem(`nextsem_cli_completed_${email}_${lesson.id}`) === "true" ||
                       chaptersObj[lesson.slug] === true;
        if (isDone) {
          completed.add(lesson.id);
        }
      });
      
      setCompletedLessons(completed);
      setMounted(true);
    }
  }, []);

  const totalLessons = cliLessons.length;
  const completedCount = completedLessons.size;
  const progressPercent = Math.round((completedCount / totalLessons) * 100) || 0;

  // Group lessons by units
  const modules = [
    { id: 1, title: "Command Line Fundamentals", desc: "Understand CLI vs GUI, the history of MS-DOS, prompt parameters, and basic system diagnostics.", range: [1, 4] },
    { id: 2, title: "File System & Directories", desc: "Master directory listings with dir, folder creation with mkdir, file attributes, and permissions.", range: [5, 7] },
    { id: 3, title: "I/O Redirection & Disk Management", desc: "Use wildcards, redirect command outputs with pipes and operators, format file systems, and configure file shares.", range: [8, 10] },
    { id: 4, title: "User Accounts & Networking", desc: "Manage Windows user security accounts, resolve host names, trace IP packets, and audit network ports.", range: [11, 13] },
    { id: 5, title: "Automation & Task Scheduling", desc: "Write batch (.bat) script loops, handle variables, monitor tasks, and configure schtasks daemons.", range: [14, 15] }
  ].map(mod => {
    const lessons = cliLessons.filter(l => l.id >= mod.range[0] && l.id <= mod.range[1]);
    const completedInMod = lessons.filter(l => completedLessons.has(l.id)).length;
    return { ...mod, lessons, completedInMod };
  });

  // Find next lesson to resume
  let nextLesson = cliLessons[0];
  for (let id = 1; id <= totalLessons; id++) {
    if (!completedLessons.has(id)) {
      const found = cliLessons.find(l => l.id === id);
      if (found) {
        nextLesson = found;
        break;
      }
    }
  }

  // All lessons are unlocked for free browsing
  const isLessonUnlocked = (lessonId: number) => true;

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white py-8 px-4 md:px-10 max-w-[1400px] mx-auto">
      {/* Top Banner section */}
      <div className="relative rounded-3xl p-6 md:p-10 overflow-hidden border border-white/5 bg-gradient-to-br from-[#1c2d3b]/40 via-[#121d27]/55 to-slate-950 shadow-2xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Blur overlays for premium glass aesthetics */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#c1a648]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#7f7034]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-left space-y-3 z-10 flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c1a648]/10 text-[#c1a648] text-[10px] font-black uppercase tracking-wider border border-[#c1a648]/20">
            <Zap size={10} className="fill-[#c1a648]" />
            <span>Interactive Course</span>
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-slate-350 bg-clip-text text-transparent">
            Windows CLI path
          </h1>
          <p className="text-slate-400 text-xs md:text-sm max-w-xl font-medium leading-relaxed">
            Master 🪟 Windows command line operations, directory tree hierarchies, attribute filters, batch scripting, and networking utilities.
          </p>

          {/* Overall progress indicator bar */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-1.5">
              <span>Course Progress</span>
              <span className="text-[#c1a648]">{completedCount} / {totalLessons} Lessons ({progressPercent}%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-[#e4ca67] via-[#c1a648] to-[#967b26] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="z-10 shrink-0 w-full md:w-auto">
          <button
            onClick={() => router.push(`/cli/${nextLesson.slug}`)}
            className="w-full md:w-auto flex items-center justify-center gap-2.5 px-8 py-4 bg-[#04AA6D] hover:bg-[#039861] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-[#04AA6D]/20 hover:shadow-[#04AA6D]/30 transition-all border border-[#04AA6D]/30 group cursor-pointer"
          >
            <Play size={14} className="fill-current" />
            <span>{completedCount > 0 ? "Resume Learning" : "Start Learning"}</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
        {/* Left column: Module details list */}
        <div className="lg:col-span-2 space-y-5">
          <h2 className="text-lg font-black tracking-tight uppercase text-slate-300">Course Syllabus Modules</h2>

          <div className="space-y-4">
            {modules.map((mod) => {
              const allDone = mod.completedInMod === mod.lessons.length;
              return (
                <div 
                  key={mod.id}
                  className="rounded-2xl border border-white/5 bg-[#0f172a]/20 hover:border-slate-800 transition-all p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black uppercase text-[#c1a648] tracking-wider">Unit {mod.id}</span>
                      {allDone && (
                        <span className="inline-flex items-center gap-0.5 text-[8px] font-black uppercase bg-emerald-950/60 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded-full">
                          <CheckCircle size={8} className="text-emerald-405" /> Completed
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-slate-100">{mod.title}</h3>
                    <p className="text-[11px] text-slate-450 leading-relaxed font-medium">{mod.desc}</p>
                  </div>

                  {/* Module progress breakdown */}
                  <div className="shrink-0 flex items-center justify-between md:flex-col md:items-end gap-2 md:gap-1.5 pl-0 md:pl-4 border-t md:border-t-0 md:border-l border-slate-850 pt-2.5 md:pt-0">
                    <span className="text-xs font-bold text-slate-400">
                      {mod.completedInMod}/{mod.lessons.length} Lessons
                    </span>
                    <button
                      onClick={() => router.push(`/cli/${mod.lessons[0].slug}`)}
                      className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-[#c1a648] hover:text-[#7f7034] transition-colors cursor-pointer"
                    >
                      <span>Explore</span>
                      <ChevronRight size={10} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: Lesson details widget */}
        <div className="space-y-5">
          <h2 className="text-lg font-black tracking-tight uppercase text-slate-300">Quick Lesson Finder</h2>

          <div className="rounded-2xl border border-white/5 bg-[#0b0f19]/80 p-5 space-y-4">
            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
              Click on any unlocked lesson below to jump directly into the slide-deck lesson and solve check problems.
            </p>

            <div className="max-h-[60vh] min-h-[300px] overflow-y-auto pr-1 space-y-1.5 scrollbar-thin">
              {cliLessons.map((lesson) => {
                const isCompleted = completedLessons.has(lesson.id);
                const isUnlocked = isLessonUnlocked(lesson.id);

                return (
                  <div key={lesson.id} className="w-full">
                    {isUnlocked ? (
                      <Link
                        href={`/cli/${lesson.slug}`}
                        className={`w-full p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all text-left ${
                          isCompleted
                            ? "bg-emerald-950/10 border-emerald-500/25 hover:border-emerald-500/40 text-slate-300"
                            : "bg-slate-900/40 border-slate-800 hover:border-[#c1a648]/40 text-slate-200"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-sm shrink-0">{lesson.icon}</span>
                          <div className="min-w-0">
                            <span className="block text-[11px] font-bold truncate">
                              {lesson.id}. {lesson.title}
                            </span>
                          </div>
                        </div>
                        <div className="shrink-0">
                          {isCompleted ? (
                            <CheckCircle size={14} className="text-emerald-500" />
                          ) : (
                            <Play size={10} className="fill-current text-[#c1a648]" />
                          )}
                        </div>
                      </Link>
                    ) : (
                      <div className="w-full p-3.5 rounded-xl border bg-slate-950/40 border-slate-900 text-slate-600 flex items-center justify-between gap-3 cursor-not-allowed select-none">
                        <div className="flex items-center gap-2.5 min-w-0 opacity-40">
                          <span className="text-sm shrink-0">{lesson.icon}</span>
                          <span className="text-[11px] font-bold truncate">
                            {lesson.id}. {lesson.title}
                          </span>
                        </div>
                        <Lock size={12} className="opacity-40" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <AdSenseBanner />
      </div>
    </div>
  );
}
