"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle, BookOpen, Briefcase, Sparkles, ArrowLeft } from "lucide-react";
import { mswordLessons } from "../data/mswordLessonsData";

const MODULES = [
  { id: 1, title: "Word Basics & Orientation", emoji: "🖥️", range: [1, 8], color: "from-blue-600 to-indigo-600", border: "border-blue-800/40", badge: "bg-blue-950/50 text-blue-300" },
  { id: 2, title: "Formatting Like a Pro", emoji: "🎨", range: [9, 18], color: "from-purple-600 to-pink-600", border: "border-purple-800/40", badge: "bg-purple-950/50 text-purple-300" },
  { id: 3, title: "Page Layout & Design", emoji: "📐", range: [19, 26], color: "from-emerald-600 to-teal-600", border: "border-emerald-800/40", badge: "bg-emerald-950/50 text-emerald-300" },
  { id: 4, title: "Tables, Images & Diagrams", emoji: "🖼️", range: [27, 36], color: "from-orange-600 to-amber-600", border: "border-orange-800/40", badge: "bg-orange-950/50 text-orange-300" },
  { id: 5, title: "Advanced Writing Tools", emoji: "📝", range: [37, 44], color: "from-rose-600 to-red-600", border: "border-rose-800/40", badge: "bg-rose-950/50 text-rose-300" },
  { id: 6, title: "Collaboration & Teamwork", emoji: "🤝", range: [45, 50], color: "from-cyan-600 to-sky-600", border: "border-cyan-800/40", badge: "bg-cyan-950/50 text-cyan-300" },
  { id: 7, title: "AI Tools & Smart Features", emoji: "🤖", range: [51, 55], color: "from-violet-600 to-purple-600", border: "border-violet-800/40", badge: "bg-violet-950/50 text-violet-300" },
  { id: 8, title: "Real Job Projects", emoji: "🏆", range: [56, 60], color: "from-yellow-600 to-amber-500", border: "border-yellow-800/40", badge: "bg-yellow-950/50 text-yellow-300" },
];

export default function MsWordDashboardClient() {
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const userRaw = localStorage.getItem("nextsem_user");
    let email = "guest";
    if (userRaw) {
      try { email = JSON.parse(userRaw)?.email ?? "guest"; } catch {}
    }
    const done = new Set<number>();
    for (let id = 1; id <= 60; id++) {
      if (localStorage.getItem(`nextsem_msword_completed_${email}_${id}`) === "true") done.add(id);
    }
    setCompletedIds(done);
  }, []);

  const totalDone = completedIds.size;
  const percent = Math.round((totalDone / 60) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 h-14 bg-slate-950/90 backdrop-blur border-b border-slate-800 flex items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={15} />
          Home
        </Link>
        <span className="text-sm font-black text-white flex items-center gap-2">
          📄 MS Word 365
        </span>
        <span className="text-xs text-slate-500">{totalDone}/60 done</span>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-950/60 via-slate-950 to-indigo-950/40 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(59,130,246,0.15)_0%,_transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 py-12 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-950/50 border border-blue-700/40 text-blue-300 text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
            <Briefcase size={12} /> Career Skills Course
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            MS Word 365 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Career Skills</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mb-6">
            60 lessons designed for <strong className="text-white">job seekers & working professionals</strong> (18–40 yrs). Real job tasks, AI tips, Hindi/Hinglish/English.
          </p>

          {/* Progress bar */}
          {mounted && (
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                <span>Your Progress</span>
                <span>{totalDone} / 60 lessons · {percent}%</span>
              </div>
              <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-700"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Tools Banner */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <div className="bg-gradient-to-r from-violet-950/50 to-purple-950/50 border border-violet-700/40 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-violet-800/40 border border-violet-600/30 flex items-center justify-center text-xl shrink-0">🤖</div>
          <div>
            <p className="text-sm font-bold text-white">AI Tools Integrated Throughout</p>
            <p className="text-xs text-slate-400">Every lesson includes a <strong className="text-violet-300">Copilot Tip</strong> showing how AI can do the same task for you faster.</p>
          </div>
          <div className="ml-auto shrink-0">
            <Link href="/msword/what-is-ms-word-career-basics" className="text-xs font-black text-violet-300 hover:text-white transition-colors whitespace-nowrap">
              Start Now →
            </Link>
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {MODULES.map((mod) => {
          const modLessons = mswordLessons.filter(l => l.id >= mod.range[0] && l.id <= mod.range[1]);
          const modDone = modLessons.filter(l => completedIds.has(l.id)).length;
          const isComingSoon = modLessons.length === 0;

          return (
            <div key={mod.id} className={`border ${mod.border} rounded-2xl overflow-hidden`}>
              {/* Module header */}
              <div className={`bg-gradient-to-r ${mod.color} bg-opacity-10 p-4 flex items-center gap-3`}>
                <span className="text-2xl">{mod.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black text-white/60 uppercase tracking-wider">Module {mod.id}</span>
                    {isComingSoon && (
                      <span className="text-[9px] font-black uppercase tracking-wider bg-slate-800 text-slate-400 border border-slate-700 px-2 py-0.5 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <h2 className="text-sm font-black text-white">{mod.title}</h2>
                </div>
                {!isComingSoon && (
                  <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${mod.badge} shrink-0`}>
                    {modDone}/{modLessons.length}
                  </span>
                )}
              </div>

              {/* Lesson list */}
              {isComingSoon ? (
                <div className="p-4 text-center text-xs text-slate-600 italic">
                  Lessons coming soon — Module 1 is live!
                </div>
              ) : (
                <div className="divide-y divide-slate-800/50">
                  {modLessons.map((lesson) => {
                    const done = completedIds.has(lesson.id);
                    return (
                      <Link
                        key={lesson.id}
                        href={`/msword/${lesson.slug}`}
                        className="flex items-center gap-3 px-4 py-3.5 hover:bg-slate-900/60 transition-colors group"
                      >
                        {done ? (
                          <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                        ) : (
                          <Circle size={15} className="text-slate-700 group-hover:text-slate-500 shrink-0 transition-colors" />
                        )}
                        <span className="text-[10px] font-black text-slate-500 shrink-0 w-6">
                          {lesson.id}
                        </span>
                        <div className="flex-1 min-w-0">
                          <span className={`text-sm font-semibold truncate block transition-colors ${done ? "text-emerald-400" : "text-slate-300 group-hover:text-white"}`}>
                            {lesson.title}
                          </span>
                          <span className="text-[10px] text-slate-600">{lesson.bookRef}</span>
                        </div>
                        <ArrowRight size={13} className="text-slate-700 group-hover:text-slate-400 shrink-0 transition-colors" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="max-w-4xl mx-auto px-4 pb-12 text-center space-y-3">
        <div className="inline-flex items-center gap-2 text-xs text-slate-500">
          <Sparkles size={12} className="text-amber-500" />
          <span>60 lessons · Multilingual · AI Tools · Free</span>
          <Sparkles size={12} className="text-amber-500" />
        </div>
        <p className="text-xs text-slate-600">
          Progress saved automatically on this device. No login required.
        </p>
      </div>
    </div>
  );
}
