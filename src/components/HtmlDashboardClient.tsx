"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Play, BookOpen, CheckCircle, Lock, Award, 
  ChevronRight, ArrowRight, Zap, Target, Star
} from "lucide-react";
import { htmlLessons } from "../data/htmlLessonsData";
import AdSenseBanner from "./AdSenseBanner";

export default function HtmlDashboardClient() {
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

      const completed = new Set<number>();
      for (let id = 1; id <= 100; id++) {
        const done = localStorage.getItem(`nextsem_html_completed_${email}_${id}`) === "true";
        if (done) completed.add(id);
      }
      setCompletedLessons(completed);
      setMounted(true);
    }
  }, []);

  const totalLessons = 100;
  const completedCount = completedLessons.size;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  // Group lessons by units
  const modules = [
    { id: 1, title: "Web Fundamentals & Client-Server", desc: "Internet architecture, client-server models, DNS, TCP/IP, and URLs.", range: [1, 10] },
    { id: 2, title: "Document Structure & Metadata", desc: "HTML skeleton, doctypes, head configurations, CSS linking, and scripts.", range: [11, 20] },
    { id: 3, title: "Structural Text & Layout Elements", desc: "Headings, paragraphs, line breaks, separators, divs, and spans.", range: [21, 30] },
    { id: 4, title: "Semantic Content & Modifications", desc: "Formatting tags, monospace code blocks, abbreviations, and notations.", range: [31, 40] },
    { id: 5, title: "Navigation & Hyperlinks", desc: "Anchor tags, relative/absolute paths, directory hopping, target blanks.", range: [41, 50] },
    { id: 6, title: "Multimedia & Art Direction", desc: "Images, srcset, picture elements, lazy loading, and modern SVG vectors.", range: [51, 60] },
    { id: 7, title: "Native Audio, Video & Embeds", desc: "HTML5 audio/video, track subtitles, embedding iframes, and sandbox security.", range: [61, 70] },
    { id: 8, title: "Lists, Tables & Layout Grids", desc: "Ordered/unordered list trees, table grids, headers, and spanning parameters.", range: [71, 80] },
    { id: 9, title: "Interactive Forms & Inputs", desc: "Forms, input fields, labels, textareas, select lists, and checkboxes.", range: [81, 90] },
    { id: 10, title: "Advanced Semantics & APIs", desc: "Native validation, dialog modals, HTML5 canvas, and custom schemas.", range: [91, 100] }
  ].map(mod => {
    const lessons = htmlLessons.filter(l => l.id >= mod.range[0] && l.id <= mod.range[1]);
    const completedInMod = lessons.filter(l => completedLessons.has(l.id)).length;
    return { ...mod, lessons, completedInMod };
  });

  // Find next lesson to resume
  let nextLesson = htmlLessons[0];
  for (let id = 1; id <= 100; id++) {
    if (!completedLessons.has(id)) {
      const found = htmlLessons.find(l => l.id === id);
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
            HTML5 Developer Path
          </h1>
          <p className="text-slate-400 text-xs md:text-sm max-w-xl font-medium leading-relaxed">
            Master standard semantic tags, client-server document outline rules, layouts, and responsive components via 100 bite-sized lessons.
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
            onClick={() => router.push(`/html/${nextLesson.slug}`)}
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
              const allDone = mod.completedInMod === 10;
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
                      {mod.completedInMod}/10 Lessons
                    </span>
                    <button
                      onClick={() => router.push(`/html/${mod.lessons[0].slug}`)}
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
              Click on any unlocked lesson below to jump directly into the editor and solve check problems.
            </p>

            <div className="h-[550px] overflow-y-auto pr-1 space-y-1.5 scrollbar-thin">
              {htmlLessons.map((lesson) => {
                const isCompleted = completedLessons.has(lesson.id);
                const isUnlocked = isLessonUnlocked(lesson.id);

                return (
                  <div key={lesson.id} className="w-full">
                    {isUnlocked ? (
                      <Link
                        href={`/html/${lesson.slug}`}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-left transition-all ${
                          isCompleted
                            ? "bg-emerald-950/10 border-emerald-500/10 hover:border-emerald-500/30 text-emerald-300"
                            : "bg-slate-900/30 border-white/5 hover:bg-slate-900/70 hover:border-slate-800 text-slate-350"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          {isCompleted ? (
                            <span className="shrink-0 flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500">
                              <CheckCircle size={10} className="text-white" />
                            </span>
                          ) : (
                            <span className="shrink-0 text-[10px] font-bold font-mono text-[#c1a648] bg-[#c1a648]/10 w-4 h-4 rounded-full flex items-center justify-center border border-[#c1a648]/20">
                              {lesson.id}
                            </span>
                          )}
                          <span className="text-xs font-semibold truncate leading-normal flex-1">
                            {lesson.title}
                          </span>
                        </div>
                        <ChevronRight size={12} className="opacity-50" />
                      </Link>
                    ) : (
                      <div 
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-white/5 bg-slate-950/20 text-slate-600 cursor-not-allowed opacity-50 select-none"
                        title="Complete previous lessons to unlock!"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <span className="shrink-0 text-[10px] font-bold font-mono text-slate-600 bg-slate-900/40 w-4 h-4 rounded-full flex items-center justify-center border border-slate-800/40">
                            {lesson.id}
                          </span>
                          <span className="text-xs font-semibold truncate leading-normal flex-1">
                            {lesson.title}
                          </span>
                        </div>
                        <Lock size={10} className="shrink-0" />
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
