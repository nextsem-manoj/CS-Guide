"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { coursePhases } from "../data/courseData";
import { useProgress } from "../context/ProgressContext";
import { usePWA } from "../hooks/usePWA";
import { Check, ArrowRight, Code2, ShieldAlert, Award, Compass, Laptop, Star, Wifi } from "lucide-react";
import { auth, signInWithGoogle } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { getChapterUrl } from "../lib/htmlLessonsHelper";

interface ClassicHomeSlidesProps {
  currentUser: { name: string; email: string; photo?: string } | null;
  onStartLearning?: () => void;
}

export default function ClassicHomeSlides({ currentUser, onStartLearning }: ClassicHomeSlidesProps) {
  const { completedChapters } = useProgress();
  const { isInstallable, installApp } = usePWA();
  const [expandedPhases, setExpandedPhases] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    const initialExpanded: Record<string, boolean> = {};
    if (coursePhases && coursePhases.length > 0) {
      const activePhase = coursePhases.find((phase) => {
        if (!completedChapters) return true;
        const done = phase.topics.filter((t) => completedChapters[t.path]).length;
        const progress = Math.round((done / phase.topics.length) * 100);
        return progress < 100;
      }) || coursePhases[0];
      
      if (activePhase) {
        initialExpanded[activePhase.id] = true;
      }
    }
    setExpandedPhases(initialExpanded);
  }, [completedChapters]);

  const getPhaseProgress = (phase: typeof coursePhases[0]) => {
    if (!completedChapters) return 0;
    const done = phase.topics.filter((t) => completedChapters[t.path]).length;
    return Math.round((done / phase.topics.length) * 100);
  };

  const handleOfflineClick = () => {
    if (isInstallable) {
      installApp();
    } else {
      alert("Nextsem Academy is configured for 100% offline access. You can install it on your device by selecting 'Add to Home Screen' in your mobile browser menu, or bookmark this page!");
    }
  };

  const firstPath = coursePhases[0]?.topics[0]?.path || "p0-1-setup";

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 pt-0 pb-10 flex flex-col gap-10 select-text font-sans">
      
      <div>
        {/* ── TOP NAVIGATION BAR ── */}
        <header className="w-full flex items-center justify-between pt-4 pb-0">
          {/* Left Side: Brand Logo and Title */}
          <div className="flex items-center gap-3">
            <Image 
              src="/logo.svg" 
              alt="Nextsem Logo" 
              width={40} 
              height={40} 
              className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 p-1 bg-white dark:bg-slate-950 shrink-0 shadow-sm" 
            />
            <div>
              <span className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white block leading-none">
                Nextsem Academy
              </span>
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-1 block">
                Do It Yourself
              </span>
            </div>
          </div>

          {/* Right Side: Slogan Pill and Mini CTAs */}
          <div className="flex items-center gap-3">
            <p className="hidden md:block text-[9px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-3.5 py-1.5 rounded-full border border-blue-100/50 dark:border-blue-900/30 whitespace-nowrap">
              🛠️ Learn by Coding, Succeed by Doing
            </p>
            <Link
              href="/course"
              prefetch={true}
              className="hidden sm:inline-block text-slate-700 dark:text-slate-350 hover:text-slate-900 dark:hover:text-white font-bold text-[9px] uppercase tracking-widest py-2.5 px-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-all"
            >
              🗺️ All Phases
            </Link>
            <Link
              href="/course"
              prefetch={true}
              onClick={onStartLearning}
              className="hidden sm:inline-block text-white bg-slate-900 dark:bg-slate-950 hover:bg-slate-800 dark:hover:bg-slate-900 border border-transparent font-bold text-[9px] uppercase tracking-widest py-2.5 px-4 rounded-lg transition-all"
            >
              Start Learning
            </Link>
          </div>
        </header>

        {/* ── 1. HERO SECTION ── */}
        <section className="text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10 pt-2 pb-2">
          <div className="flex-1 space-y-5">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
                📖 Structured Web Dev Syllabus
              </span>
              <button
                onClick={handleOfflineClick}
                className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-all cursor-pointer"
              >
                📱 Works Offline (PWA)
              </button>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-tight">
              Structured Web Development <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
                Curriculum for Developers
              </span>
            </h1>

            <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed max-w-2xl font-medium">
              Nextsem Academy provides a fully structured, project-driven learning path designed to take you from absolute zero to a competent front-end developer. Write code directly in your browser, check your assignments instantly, and work completely offline.
            </p>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start items-center">
              <Link
                href="/course"
                prefetch={true}
                onClick={onStartLearning}
                className="w-full sm:w-auto h-12 inline-flex items-center justify-center gap-2 px-6 rounded-xl text-xs font-black uppercase tracking-widest text-black bg-[#39FF14] hover:bg-[#32e011] transition-all duration-300 shadow-[0_0_18px_rgba(57,255,20,0.3)] hover:shadow-[0_0_25px_rgba(57,255,20,0.5)] active:scale-95 shrink-0"
              >
                <span>🚀</span> Start learning for 🪟 Windows 11 users
              </Link>
              <Link
                href="/course"
                prefetch={true}
                className="w-full sm:w-auto h-12 inline-flex items-center justify-center gap-2 px-6 rounded-xl text-xs font-black uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-[0_0_18px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] active:scale-95 shrink-0"
              >
                <span>🗺️</span> View All Phases
              </Link>
              <button
                onClick={async () => {
                  if (currentUser) {
                    try {
                      await signOut(auth);
                    } catch (err) {
                      console.error("Sign Out Error:", err);
                    }
                  } else {
                    try {
                      await signInWithGoogle();
                    } catch (err) {
                      console.error("Sign In Error:", err);
                    }
                  }
                }}
                className="w-full sm:w-auto h-12 inline-flex items-center justify-center gap-2.5 px-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/5 dark:bg-slate-900/40 text-slate-700 dark:text-slate-350 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 font-bold text-xs shadow-sm transition-all active:scale-95 shrink-0"
              >
                {currentUser ? (
                  <>
                    {currentUser.photo ? (
                      <img src={currentUser.photo} alt="" className="w-5 h-5 rounded-full shrink-0 object-cover border border-white/20" />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-[9px] shrink-0">
                        {currentUser.name.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span className="truncate max-w-[150px]">Sign Out ({currentUser.name.split(' ')[0]})</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </button>
              <button 
                onClick={() => document.getElementById("curriculum-timeline")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:w-auto h-12 inline-flex items-center justify-center font-bold text-xs uppercase tracking-widest px-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/60 text-slate-700 dark:text-slate-350 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
              >
                Explore Chapters
              </button>
            </div>

            {/* Progress Auto-Saved Label */}
            <div className="mt-3.5 flex items-center justify-center md:justify-start gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-500 dark:text-emerald-400 select-none">
              <span>✨</span> Your progress is automatically saved to your Google Account!
            </div>

            {currentUser && (
              <p className="text-xs text-slate-400">
                Welcome back, <span className="font-bold text-slate-700 dark:text-slate-300">{currentUser.name}</span>! Ready to continue your path?
              </p>
            )}
          </div>

          {/* Hero Visual: Syllabus quick index list */}
          <div className="w-full md:w-[400px] shrink-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-3xl p-6 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 font-sans">Curriculum Map</h3>
            <div className="space-y-3">
              {coursePhases.slice(0, 5).map((phase, idx) => {
                const progress = getPhaseProgress(phase);
                return (
                  <Link 
                    key={phase.id} 
                    href={getChapterUrl(phase.topics[0]?.path)}
                    prefetch={true}
                    className="flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-950/60 p-2 -mx-2 rounded-2xl transition-all cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 flex items-center justify-center text-sm font-bold group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-650 dark:group-hover:text-blue-400 transition-colors truncate">
                        {phase.title}
                      </p>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 shrink-0 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                      {progress}%
                    </span>
                  </Link>
                );
              })}
              <Link 
                href="/course"
                prefetch={true}
                className="text-[10px] text-slate-450 hover:text-blue-500 hover:underline block text-center pt-2 border-t border-slate-100 dark:border-slate-850 cursor-pointer font-bold transition-all"
              >
                + {coursePhases.length - 5} remaining learning phases
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* ── 2. VALUE PROPOSITIONS ── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Code2 size={20} />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-tight">Interactive Sandbox</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Write markup, adjust styling, and configure scripts directly within the course modules. Built-in instant preview matches your changes immediately.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Laptop size={20} />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-tight">Environment Setup</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Configure industry-standard tools locally on your computer, including Visual Studio Code, Terminal interfaces, Node.js, and git.
          </p>
        </div>

        <button
          onClick={handleOfflineClick}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 rounded-2xl p-6 space-y-3 text-left transition-all cursor-pointer block w-full"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Wifi size={20} />
          </div>
          <h3 className="text-base font-bold uppercase tracking-tight flex items-center justify-between" style={{ color: 'inherit' }}>
            <span>Works Offline (PWA)</span>
            <span className="text-[9px] font-black uppercase bg-emerald-100 dark:bg-emerald-900 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 tracking-wider" style={{ color: '#059669' }}>Try Now</span>
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: 'inherit', opacity: 0.7 }}>
            Download Nextsem Academy once and study completely offline. Click this card to install the Progressive Web App to your home screen!
          </p>
        </button>
      </section>

      {/* ── 3. TIMELINE CURRICULUM SECTION ── */}
      <section id="curriculum-timeline" className="space-y-12 scroll-mt-20">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-md border border-blue-100 dark:border-blue-900/40">
            Path Overview
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Curriculum Roadmap
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Select a phase to view its lessons. Follow the structured sequence from zero setup to application deployment.
          </p>
        </div>

        {/* Timeline wrapper */}
        <div className="space-y-8 relative max-w-4xl mx-auto">
          {/* Centered line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 bg-slate-100 dark:bg-slate-850 -translate-x-1/2 hidden md:block" />

          {coursePhases.map((phase, idx) => {
            const progress = getPhaseProgress(phase);
            const isEven = idx % 2 === 0;
            const isExpanded = !!expandedPhases[phase.id];

            return (
              <div key={phase.id} className="relative flex flex-col md:flex-row items-stretch gap-6 md:gap-0 select-none">
                
                {/* Desktop Left Side Card */}
                <div className={`w-full md:w-[45%] flex ${isEven ? "justify-end" : "justify-start md:order-last"}`}>
                  <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between gap-4 shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-3">
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-blue-500">
                          Phase {idx + 1}
                        </span>
                        <h4 className="text-sm font-black" style={{ color: 'inherit' }}>
                          {phase.title}
                        </h4>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-black" style={{ color: 'inherit', opacity: 0.6 }}>
                          {progress}% Done
                        </span>
                        <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden mt-1">
                          <div className="h-full bg-blue-500" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    </div>

                    {/* Lesson checklist */}
                    <div className={`${isExpanded ? "block" : "hidden md:block"} space-y-2 pr-1 mt-2`}>
                      {phase.topics.map((topic, tIdx) => {
                        const isDone = completedChapters?.[topic.path];
                        return (
                          <Link
                            key={`${idx}-${topic.path}`}
                            href={getChapterUrl(topic.path)}
                            className={`flex items-center justify-between p-2 rounded-xl border text-[11px] font-bold ${
                              isDone
                                ? "bg-emerald-500/5 border-emerald-500/20"
                                : "bg-slate-50/50 dark:bg-slate-950/40 border-slate-150 dark:border-slate-850"
                            }`}
                            style={{ color: isDone ? '#10b981' : 'inherit' }}
                          >
                            <span className="truncate">{topic.label}</span>
                            {isDone ? (
                              <Check size={11} className="stroke-[3] text-emerald-500 shrink-0" />
                            ) : (
                              <span className="text-[9px] font-normal shrink-0" style={{ color: 'inherit', opacity: 0.5 }}>L{tIdx + 1}</span>
                            )}
                          </Link>
                        );
                      })}
                    </div>

                    {/* Mobile toggle button */}
                    <button
                      onClick={() => setExpandedPhases(prev => ({ ...prev, [phase.id]: !prev[phase.id] }))}
                      className="md:hidden w-full text-center text-[10px] font-black uppercase tracking-wider py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white transition-all cursor-pointer mt-2"
                    >
                      {isExpanded ? "🔼 Hide Lessons" : `🔽 Show Lessons (${phase.topics.length})`}
                    </button>

                    <Link
                      href={getChapterUrl(phase.topics[0]?.path)}
                      className="w-full text-center bg-slate-900 hover:bg-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900 border border-transparent dark:border-slate-850 font-bold text-[10px] uppercase tracking-widest py-2.5 rounded-xl block mt-1"
                      style={{ color: '#ffffff' }}
                    >
                      Open Phase →
                    </Link>
                  </div>
                </div>

                {/* Timeline node in center */}
                <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white dark:border-slate-950 bg-blue-600 z-10 flex items-center justify-center shrink-0 shadow-md hidden md:flex">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>

                {/* Desktop Spacer Right Side */}
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 4. FINAL CALL-TO-ACTION ── */}
      <section className="text-center py-10 max-w-xl mx-auto space-y-6">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
          Ready to start your path?
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Unlock lifetime access to the curriculum. Study at your own pace, complete coding challenges, and gain developer skills. Free to start, no card required.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/course"
            onClick={onStartLearning}
            className="text-white bg-blue-600 hover:bg-blue-700 font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-xl transition-all shadow-sm active:scale-98"
          >
            Start learning for Windows 11 users
          </Link>
          <Link
            href="/about"
            className="font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 transition-all"
          >
            Learn More
          </Link>
        </div>
      </section>

    </div>
  );
}
