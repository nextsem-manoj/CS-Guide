"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useStudentProgress } from '@/context/StudentProgressContext';
import { PRACTICAL_LESSONS, PRACTICAL_SPRINTS } from '@/data/bcaPracticalData';
import BcaStoriesTray from '@/components/bca/BcaStoriesTray';
import StudentPeerNetwork from '@/components/bca/StudentPeerNetwork';
import { 
  Play, CheckCircle2, Lock, ArrowRight, Laptop, 
  Terminal, Sparkles, BookOpen, ChevronRight, 
  LogIn, LogOut, GitBranch, Award,
  Clock, ShieldCheck, ChevronDown, ChevronUp, Sun, Moon,
  Calendar, Heart, Flame, Code2, Compass, Zap
} from 'lucide-react';

export default function HomeClient() {
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { 
    user, 
    completedDays, 
    isDayCompleted, 
    isDayUnlocked, 
    signIn, 
    signOut 
  } = useStudentProgress();

  // Active semester & sprint filter tabs
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const [activeSprint, setActiveSprint] = useState<number>(1);
  const [showTheorySection, setShowTheorySection] = useState<boolean>(false);
  const [likedCardIds, setLikedCardIds] = useState<Record<string, boolean>>({});
  const [cardLikesCount, setCardLikesCount] = useState<Record<string, number>>({
    "day-1": 142,
    "day-2": 98,
    "day-3": 115,
    "day-4": 164,
    "day-5": 210,
  });

  useEffect(() => {
    setMounted(true);
    try {
      const savedLikes = localStorage.getItem("nextsem_card_likes");
      if (savedLikes) setLikedCardIds(JSON.parse(savedLikes));
    } catch {}
  }, []);

  const handleLikeCard = (cardId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const isCurrentlyLiked = !!likedCardIds[cardId];
    const updatedLikes = { ...likedCardIds, [cardId]: !isCurrentlyLiked };
    setLikedCardIds(updatedLikes);
    setCardLikesCount(prev => ({
      ...prev,
      [cardId]: (prev[cardId] || 100) + (isCurrentlyLiked ? -1 : 1)
    }));
    try {
      localStorage.setItem("nextsem_card_likes", JSON.stringify(updatedLikes));
    } catch {}
  };

  const completedCount = completedDays.length;

  const currentTheme = resolvedTheme || theme;
  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  // Trending Spotlight Labs for the Visual Reel-Style Feed
  const spotlightDays = [
    {
      day: 1,
      title: "HTML Setup & First Webpage",
      category: "HTML5",
      snippet: "<!DOCTYPE html>\n<html>\n  <head><title>My Portfolio</title></head>\n  <body><h1>Hello World!</h1></body>\n</html>",
      estTime: "45 mins",
      vivaScore: "100% Viva Approved",
      slug: "day-1-html-setup-first-webpage",
      color: "from-blue-600 to-indigo-700"
    },
    {
      day: 4,
      title: "HTML Semantic Elements & Page Structure",
      category: "HTML5 & SEO",
      snippet: "<header><nav><a href=\"/\">Home</a></nav></header>\n<main><article>Clean Semantic Web</article></main>\n<footer>&copy; 2026 NextSem</footer>",
      estTime: "45 mins",
      vivaScore: "100% Viva Approved",
      slug: "day-4-html-semantic-elements-page-structure",
      color: "from-cyan-600 to-blue-700"
    },
    {
      day: 5,
      title: "HTML Forms & Input Validations",
      category: "Forms & Data",
      snippet: "<form action=\"/submit\" method=\"POST\">\n  <input type=\"text\" required pattern=\"[0-9]{9,10}\" />\n  <button type=\"submit\">Submit BCA Record</button>\n</form>",
      estTime: "50 mins",
      vivaScore: "100% Viva Approved",
      slug: "day-5-html-forms-input-elements",
      color: "from-purple-600 to-pink-700"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col justify-between font-sans transition-colors duration-150 selection:bg-blue-600 selection:text-white">
      
      {/* ── TOP HEADER (Clean Blue, Black & White) ── */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-slate-200 dark:border-neutral-800 py-3 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-mono font-black text-white text-base shadow-sm group-hover:scale-105 transition-transform">
              &lt;/&gt;
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-black dark:text-white group-hover:text-blue-600 transition-colors">
                BCA Practical Lab
              </span>
              <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold tracking-wider">
                by NextSem
              </span>
            </div>
          </Link>

          {/* Header Controls: Author + Theme Toggle + Search + Auth */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span>By <strong className="text-black dark:text-white">Er. Manoj Kumar</strong></span>
            </div>

            {/* Dedicated Light / Dark Mode Toggle Button */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all cursor-pointer"
                title={`Switch to ${currentTheme === 'dark' ? 'Light' : 'Dark'} Mode`}
              >
                {currentTheme === 'dark' ? (
                  <>
                    <Sun size={14} className="text-blue-400" />
                    <span className="hidden sm:inline">Light</span>
                  </>
                ) : (
                  <>
                    <Moon size={14} className="text-blue-600" />
                    <span className="hidden sm:inline">Dark</span>
                  </>
                )}
              </button>
            )}

            {/* Theory Reference Link */}
            <button
              onClick={() => {
                setShowTheorySection(true);
                const el = document.getElementById('theory-reference-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
            >
              <BookOpen size={13} className="text-blue-600 dark:text-blue-400" />
              <span>Theory Reference</span>
            </button>

            <Link
              href="/cmd"
              target="_blank"
              className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all"
            >
              <Terminal size={13} className="text-blue-600 dark:text-blue-400" />
              <span>CMD</span>
            </Link>

            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 px-2.5 py-1 rounded-xl">
                  {user.photo ? (
                    <img src={user.photo} alt="" className="w-5 h-5 rounded-full object-cover" />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100 hidden sm:inline max-w-[80px] truncate">
                    {user.name.split(" ")[0]}
                  </span>
                </div>
                <button 
                  onClick={signOut}
                  className="p-1.5 text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <button 
                onClick={signIn}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <LogIn size={13} />
                <span>Sign In</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        
        {/* ── 1. DAILY STORIES & STATUS FEED TRAY ── */}
        <BcaStoriesTray />

        {/* ── 2. HERO SECTION: 360-DAY PRACTICAL ROADMAP ── */}
        <div className="text-center space-y-4 max-w-3xl mx-auto pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/50 text-blue-700 dark:text-blue-400 text-xs font-bold tracking-wide">
            <Sparkles size={13} />
            <span>3-Year University Degree Curriculum • 6 Semesters • 360 Practical Days</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-black dark:text-white tracking-tight leading-tight">
            Learn to Code. Build Real Projects. Defend Your Viva.
          </h1>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
            Universal 3-year job-ready practical curriculum designed for all BCA students. Solve daily hands-on coding tasks, debug broken programs, pass technical viva checks, push code to your personal GitHub, and earn verified milestones.
          </p>

          {/* Quick Metrics Badges */}
          <div className="pt-1 flex flex-wrap items-center justify-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
              <Laptop size={14} className="text-blue-600 dark:text-blue-400" />
              <span>360 Daily Coding Labs</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
              <Calendar size={14} className="text-blue-600 dark:text-blue-400" />
              <span>3 Years • 6 Semesters</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
              <GitBranch size={14} className="text-blue-600 dark:text-blue-400" />
              <span>GitHub Push Workflow</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
              <Award size={14} className="text-blue-600 dark:text-blue-400" />
              <span>Viva Voce Defense Checks</span>
            </div>
            {completedCount > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-100 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300">
                <CheckCircle2 size={14} />
                <span>{completedCount} Days Completed</span>
              </div>
            )}
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/bca/practical/day-1-html-setup-first-webpage"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm sm:text-base shadow-xl shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Play size={16} className="fill-current" />
              <span>Start Day 1 Practical »</span>
            </Link>

            <Link
              href="/bca/practical"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-black dark:text-white font-bold text-sm sm:text-base transition-all active:scale-95"
            >
              <Compass size={16} />
              <span>Explore All 6 Semesters</span>
            </Link>
          </div>
        </div>

        {/* ── 3. FEATURED DAILY MILESTONES (Engaging Feed-Style Cards) ── */}
        <section aria-label="Featured Daily Coding Milestones" className="border-t border-slate-200 dark:border-neutral-800 pt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <h2 className="text-base sm:text-lg font-black text-black dark:text-white">
                  Trending Practical Milestones
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Top rated coding tasks completed by BCA peers this week
              </p>
            </div>

            <Link
              href="/bca/practical"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>View All 360 Days</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {spotlightDays.map((item) => {
              const cardId = `day-${item.day}`;
              const isLiked = !!likedCardIds[cardId];
              const likes = cardLikesCount[cardId] || 120;

              return (
                <div
                  key={item.day}
                  className="rounded-3xl bg-slate-50/70 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800/90 p-5 flex flex-col justify-between hover:shadow-xl hover:border-blue-500/50 transition-all group backdrop-blur-sm"
                >
                  <div className="space-y-3">
                    {/* Header: Day Badge & Micro Kudos */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-xl bg-blue-600 text-white font-black text-xs shadow-sm">
                          Day {item.day}
                        </span>
                        <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 bg-white dark:bg-neutral-900 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-neutral-800">
                          {item.category}
                        </span>
                      </div>

                      {/* Heart Button */}
                      <button
                        onClick={(e) => handleLikeCard(cardId, e)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold font-mono transition-all active:scale-125 cursor-pointer ${
                          isLiked 
                            ? "bg-rose-50 dark:bg-rose-950/50 text-rose-600 border border-rose-300 dark:border-rose-800" 
                            : "bg-white dark:bg-neutral-900 text-slate-500 hover:text-rose-500 border border-slate-200 dark:border-neutral-800"
                        }`}
                        title="Cheer with kudos"
                      >
                        <Heart size={13} className={isLiked ? "fill-rose-500 text-rose-500" : ""} />
                        <span>{likes}</span>
                      </button>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-black text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                      {item.title}
                    </h3>

                    {/* Syntax Snippet Preview */}
                    <div className="rounded-2xl bg-black/90 border border-neutral-800 p-3 font-mono text-[11px] text-emerald-400 overflow-x-auto shadow-inner">
                      <pre className="whitespace-pre">{item.snippet}</pre>
                    </div>
                  </div>

                  {/* Footer Meta & Action */}
                  <div className="pt-4 border-t border-slate-200 dark:border-neutral-800/80 mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <Clock size={12} className="text-blue-500" />
                      <span>{item.estTime}</span>
                      <span>•</span>
                      <span className="text-emerald-500 font-bold">100% Viva</span>
                    </div>

                    <Link
                      href={`/bca/practical/${item.slug}`}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition-all shadow-sm active:scale-95"
                    >
                      <span>Start Lab</span>
                      <ChevronRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 4. COMPLETE 6-SEMESTER ROADMAP & SPRINTS ── */}
        <div className="border-t border-slate-200 dark:border-neutral-800 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-black dark:text-white">
                3-Year Day-by-Day Practical Roadmap
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Structured across all 6 semesters (360 Days). Follow sequentially and push verified code to GitHub.
              </p>
            </div>

            {/* 6-Semester Switcher */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {Array.from({ length: 6 }).map((_, idx) => {
                const sem = idx + 1;
                const isSelected = selectedSemester === sem;
                const year = Math.ceil(sem / 2);
                return (
                  <button
                    key={sem}
                    type="button"
                    onClick={() => {
                      setSelectedSemester(sem);
                      setActiveSprint((sem - 1) * 2 + 1);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-neutral-800'
                    }`}
                  >
                    Sem {sem} (Yr {year})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sprints Switcher Buttons for Active Semester */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {PRACTICAL_SPRINTS.filter(s => s.semester === selectedSemester).map((sprint) => {
              const isActive = activeSprint === sprint.sprintNumber;
              return (
                <button
                  key={sprint.sprintNumber}
                  type="button"
                  onClick={() => setActiveSprint(sprint.sprintNumber)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-blue-50 dark:bg-neutral-900 border-blue-600 ring-2 ring-blue-600/20 shadow-md' 
                      : 'bg-white dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 hover:border-slate-400 dark:hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {sprint.daysRange}
                    </span>
                    <span className="text-xs font-mono text-slate-500 font-bold">
                      Sprint {sprint.sprintNumber}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-black dark:text-white line-clamp-1 mb-1">
                    {sprint.title.replace(/^Sprint \d+: /, '')}
                  </h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-1">
                    {sprint.milestoneProject}
                  </p>
                </button>
              );
            })}
          </div>

          {/* ── DAY-WISE PRACTICAL CARDS GRID (Blue, Black & White) ── */}
          {activeSprint === 1 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PRACTICAL_LESSONS.map((lesson) => {
                const completed = isDayCompleted(lesson.day);
                const unlocked = isDayUnlocked(lesson.day);

                return (
                  <Link
                    key={lesson.id}
                    href={`/bca/practical/${lesson.slug}`}
                    className={`rounded-2xl p-5 bg-white dark:bg-neutral-950 border transition-all flex flex-col justify-between group hover:shadow-xl hover:-translate-y-1 ${
                      completed
                        ? 'border-blue-600/70 dark:border-blue-500/70 ring-1 ring-blue-600/30'
                        : unlocked
                        ? 'border-slate-200 dark:border-neutral-800 hover:border-blue-600 dark:hover:border-blue-500'
                        : 'border-slate-200 dark:border-neutral-900 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div>
                      {/* Day Header Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-mono font-black text-blue-600 dark:text-blue-400">
                          Day {lesson.day < 10 ? `0${lesson.day}` : lesson.day}
                        </span>

                        {completed ? (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                            <CheckCircle2 size={12} />
                            <span>Done</span>
                          </span>
                        ) : unlocked ? (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-black dark:text-white bg-slate-100 dark:bg-neutral-900 px-2 py-0.5 rounded-full border border-slate-300 dark:border-neutral-700">
                            <Play size={11} className="fill-current" />
                            <span>Ready</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-neutral-900 px-2 py-0.5 rounded-full border border-slate-200 dark:border-neutral-800">
                            <Lock size={11} />
                            <span>Locked</span>
                          </span>
                        )}
                      </div>

                      {/* Lesson Title */}
                      <h4 className="text-base font-black text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1.5">
                        {lesson.title}
                      </h4>

                      {/* Lesson Overview */}
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                        {lesson.concept.overview}
                      </p>

                      {/* Feature Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4 text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                        <span className="bg-slate-100 dark:bg-neutral-900 px-2 py-0.5 rounded border border-slate-200 dark:border-neutral-800">
                          💻 {lesson.practicalLab.tasks.length} Coding Tasks
                        </span>
                        <span className="bg-slate-100 dark:bg-neutral-900 px-2 py-0.5 rounded border border-slate-200 dark:border-neutral-800">
                          🐛 Spot the Bug
                        </span>
                        <span className="bg-slate-100 dark:bg-neutral-900 px-2 py-0.5 rounded border border-slate-200 dark:border-neutral-800">
                          🎓 Viva MCQ
                        </span>
                      </div>
                    </div>

                    {/* Launch Action */}
                    <div className="pt-3 border-t border-slate-200 dark:border-neutral-800 flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-500 text-[11px]">
                        ⏱️ {lesson.estimatedTime}
                      </span>
                      <span className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        <span>Launch Lab</span>
                        <ChevronRight size={14} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto text-xl font-black">
                {activeSprint === 2 ? 'JS' : 'FS'}
              </div>
              <h4 className="text-lg font-black text-black dark:text-white">
                Sprint {activeSprint}: {PRACTICAL_SPRINTS[activeSprint - 1]?.title}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                {PRACTICAL_SPRINTS[activeSprint - 1]?.description}
              </p>
              <div className="inline-block text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
                Milestone Project: {PRACTICAL_SPRINTS[activeSprint - 1]?.milestoneProject}
              </div>
              <div>
                <Link
                  href="/bca/practical/day-1-html-setup-first-webpage"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                >
                  <span>Complete Days 1–10 to Unlock Sprint {activeSprint}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ── REGISTERED BCA PEER COMMUNITY (FOLLOW & FOLLOWING) ── */}
        <section id="peer-network-section" className="border-t border-slate-200 dark:border-neutral-800 pt-8">
          <StudentPeerNetwork />
        </section>

        {/* ── 5. THEORETICAL PART (Secondary Reference Section) ── */}
        <section id="theory-reference-section" className="border-t border-slate-200 dark:border-neutral-800 pt-8">
          <div className="rounded-3xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-6 sm:p-8">
            <button
              onClick={() => setShowTheorySection(!showTheorySection)}
              className="w-full flex items-center justify-between text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-neutral-900 border border-blue-200 dark:border-neutral-800 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <BookOpen size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-neutral-900 px-2 py-0.5 rounded-full border border-blue-200 dark:border-neutral-800">
                    Secondary Reference
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mt-0.5">
                    Theory, Textbook Notes &amp; Degree Syllabi
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                <span>{showTheorySection ? 'Hide Reference' : 'Expand Reference'}</span>
                {showTheorySection ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </button>

            {showTheorySection && (
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-neutral-800 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in duration-200">
                
                {/* 1. BCA Semester 1 Theory */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    BCA Semester 1 Theory
                  </span>
                  <h4 className="text-sm font-black text-black dark:text-white">
                    Textbook Units &amp; Subject Notes
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    BCS-111 (Computer Basics), BCS-012 (Mathematics), BEGLA-136, and BEVAE-181.
                  </p>
                  <Link 
                    href="/bca/semester-1" 
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline pt-1"
                  >
                    <span>Open Semester 1 Theory Hub »</span>
                  </Link>
                </div>

                {/* 2. All 6 BCA Semesters Syllabus */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    University Degree
                  </span>
                  <h4 className="text-sm font-black text-black dark:text-white">
                    Complete 6-Semester BCA Syllabus
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Course outlines, credit distribution, and theory exam patterns across all 6 semesters.
                  </p>
                  <Link 
                    href="/bca" 
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline pt-1"
                  >
                    <span>View All 6 Semesters »</span>
                  </Link>
                </div>

                {/* 3. MCA Master Degree Reference */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Postgraduate Reference
                  </span>
                  <h4 className="text-sm font-black text-black dark:text-white">
                    MCA Master Curriculum
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    AI/ML, Cloud Computing, Big Data, and Major Dissertation guides for MCA students.
                  </p>
                  <Link 
                    href="/mca" 
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline pt-1"
                  >
                    <span>Open MCA Reference Hub »</span>
                  </Link>
                </div>

              </div>
            )}
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-100 dark:bg-neutral-950 border-t border-slate-200 dark:border-neutral-800 py-6 px-4 text-center">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>Curriculum &amp; Practical Systems Authored by <strong className="text-black dark:text-white">Er. Manoj Kumar</strong></span>
          </div>

          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400 font-medium">
            <Link href="/bca/practical" className="hover:text-blue-600 transition-colors">3-Year Practical (360 Days)</Link>
            <Link href="/bca/semester-1" className="hover:text-blue-600 transition-colors">Theory Notes</Link>
            <Link href="/cmd" target="_blank" className="hover:text-blue-600 transition-colors">Windows CMD</Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors">Support</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
