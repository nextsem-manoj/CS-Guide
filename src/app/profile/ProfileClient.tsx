"use client";

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { 
  CheckCircle2, ArrowLeft, LogOut, LogIn, 
  ArrowRight, ChevronRight, Download, User, ShieldCheck, Sun, Moon, 
  Sparkles, ExternalLink, GitBranch, Play, Code, Calendar, HelpCircle
} from 'lucide-react';
import { useStudentProgress } from '@/context/StudentProgressContext';
import { usePWA } from '@/hooks/usePWA';
import { CAREER_TRACKS, PRACTICAL_LESSONS } from '@/data/bcaPracticalData';
import StudentSocialIntegrationsCard from '@/components/profile/StudentSocialIntegrationsCard';
import PracticalProcessGuideModal from '@/components/profile/PracticalProcessGuideModal';
import CbtScoreCard from '@/components/profile/CbtScoreCard';

export default function ProfileClient() {
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;
  const [mounted, setMounted] = useState(false);
  const [showProcessGuide, setShowProcessGuide] = useState(false);

  const {
    user,
    completedDays,
    githubRepoUrls,
    githubUsername,
    selectedTrack,
    setSelectedTrack,
    isCloudSynced,
    signIn,
    signOut
  } = useStudentProgress();

  const { isInstallable, installApp } = usePWA();
  const [lessonFilter, setLessonFilter] = useState<'all' | 'completed' | 'pending'>('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your account? All progress and data will be lost and cannot be recovered."
    );
    if (!confirmed) return;
    try {
      localStorage.removeItem('nextsem_user');
      localStorage.removeItem('completed_chapters');
      signOut();
      router.push('/');
    } catch (err) {
      alert("Failed to delete account. Please try again.");
    }
  };

  const sem1TotalDays = 60;
  const sem1CompletedCount = completedDays.filter(d => d <= 60).length;
  const sem1Percent = Math.min(100, Math.round((sem1CompletedCount / sem1TotalDays) * 100));

  const nextDayToStudy = Array.from({ length: 60 }, (_, i) => i + 1).find(d => !completedDays.includes(d)) || 1;
  const nextLessonObj = PRACTICAL_LESSONS.find(l => l.day === nextDayToStudy);

  const filteredPracticalLessons = useMemo(() => {
    return PRACTICAL_LESSONS.filter(l => {
      if (lessonFilter === 'completed') return completedDays.includes(l.day);
      if (lessonFilter === 'pending') return !completedDays.includes(l.day);
      return true;
    });
  }, [lessonFilter, completedDays]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-200 pb-28 font-sans selection:bg-blue-600/30">
      
      {/* ── Top Bar ── */}
      <header className="sticky top-0 z-40 h-16 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-slate-200 dark:border-neutral-800 flex items-center justify-between px-4 sm:px-8 select-none shadow-xs">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-black dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 px-3 py-1.5 rounded-xl transition-all active:scale-95"
        >
          <ArrowLeft size={15} className="text-blue-600 dark:text-blue-400" />
          <span>Home</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-black text-black dark:text-white uppercase tracking-wider">
            Student Profile &amp; Dashboard
          </span>
        </div>

        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all cursor-pointer"
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

          {user && (
            <button 
              onClick={signOut} 
              className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">{user.isGuest ? "Exit Guest" : "Sign Out"}</span>
            </button>
          )}
        </div>
      </header>

      {/* ── Main Dashboard Body ── */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* 1. Student Identity Hero Card */}
        <div className="rounded-3xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-xs">
          <div className="flex items-center gap-4">
            {user?.photo ? (
              <img 
                src={user.photo} 
                alt={user.name} 
                loading="eager"
                decoding="async"
                className="w-16 h-16 rounded-2xl border-2 border-blue-600 object-cover shadow-sm shrink-0" 
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-black text-2xl flex items-center justify-center shadow-sm shrink-0">
                {user?.isGuest ? "G" : (user?.name?.charAt(0) || "S")}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-black text-black dark:text-white">
                  {user?.name || "Guest Student"}
                </h1>
                {user?.isGuest ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-neutral-700">
                    Guest Mode
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-800 flex items-center gap-1">
                    <ShieldCheck size={11} />
                    Verified Google Account
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                {user?.email || "guest@nextsem.local"}
              </p>

              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs font-bold">
                {isCloudSynced ? (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5" title="Your progress is backed up to Google Cloud and accessible across devices">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    ☁️ Synced to Cloud (Safe & Backed Up)
                  </span>
                ) : (
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5" title="Your progress is saved directly in this browser's memory for 0ms instant loading and offline practice">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    💾 Saved Locally on Device (Offline-Ready • Instant)
                  </span>
                )}

                <button
                  onClick={() => setShowProcessGuide(true)}
                  className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline font-bold transition-colors cursor-pointer"
                  title="Click to understand how local storage, cloud sync, and the 360-day practical roadmap works"
                >
                  <HelpCircle size={13} />
                  <span>How it works?</span>
                </button>
              </div>
            </div>
          </div>

          {/* Connect Google or Sign In Button if Guest */}
          {user?.isGuest && (
            <button
              onClick={signIn}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shrink-0"
              title="Sign in with Google to enable cloud backup"
            >
              <LogIn size={14} />
              <span>Connect Google Account</span>
            </button>
          )}
        </div>

        {/* Degree Architecture Explainer Pill */}
        <div className="px-4 py-3 rounded-2xl bg-blue-50/80 dark:bg-neutral-900 border border-blue-200 dark:border-neutral-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-3">
          <span className="w-5 h-5 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">
            ℹ️
          </span>
          <div className="leading-relaxed">
            <span className="font-black text-black dark:text-white">3-Year BCA Degree Practical Structure:</span>{" "}
            A 3-year degree has <strong>6 Semesters</strong>. Each semester has <strong>60 practical lab days</strong> (15 weeks × 4 lab classes/week).{" "}
            <strong>6 Semesters × 60 Days = 360 Total Practical Coding Days</strong> across your entire 3-year degree.
          </div>
        </div>

        {/* 2. Degree Practical Progress Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-xs">
            <div className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider flex items-center justify-between">
              <span>Sem 1 Practical</span>
              <span className="text-[9px] font-bold text-slate-400">Active</span>
            </div>
            <div className="text-2xl font-black text-black dark:text-white mt-1">
              {sem1CompletedCount} <span className="text-xs text-slate-400 font-normal">/ 60 Days</span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 truncate">
              3-Yr Total: {completedDays.length} / 360 Labs
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-xs">
            <div className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">Sem 1 Sprints</div>
            <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
              {sem1Percent}% <span className="text-xs text-slate-400 font-normal">done</span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 truncate">
              Sprint 1 (Days 1–30)
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-xs">
            <div className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider">GitHub Repos</div>
            <div className="text-2xl font-black text-black dark:text-white mt-1">
              {Object.keys(githubRepoUrls).length} <span className="text-xs text-slate-400 font-normal">verified</span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 truncate">
              Portfolio Pushes
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-xs">
            <div className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider">Active Day</div>
            <div className="text-2xl font-black text-black dark:text-white mt-1">
              Day {nextDayToStudy}
            </div>
            <div className="text-[10px] text-blue-600 dark:text-blue-400 mt-1 font-bold truncate">
              Current Target
            </div>
          </div>
        </div>

        {/* 3. Semester 1 Practical Progress Bar */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-black dark:text-white">Semester 1 Practical Progress (Days 1–60)</span>
            <span className="text-blue-600 dark:text-blue-400 font-mono">{sem1CompletedCount} of {sem1TotalDays} Days ({sem1Percent}%)</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-neutral-800 overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-500" 
              style={{ width: `${Math.max(5, sem1Percent)}%` }} 
            />
          </div>
          {nextLessonObj && (
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-neutral-800">
              <span className="text-xs text-slate-600 dark:text-slate-400 truncate">
                Next Up: <strong className="text-black dark:text-white">Day {nextLessonObj.day}: {nextLessonObj.title}</strong>
              </span>
              <Link
                href={`/bca/practical/${nextLessonObj.slug}`}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shrink-0 inline-flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
              >
                <span>Continue</span>
                <ChevronRight size={13} />
              </Link>
            </div>
          )}
        </div>

        {/* 4. Computer Competency 100-MCQ Assessment Scorecard */}
        <CbtScoreCard />

        {/* 5. Practical Days Lesson Updates (No Theory Clutter) */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                ⚡
              </div>
              <div>
                <h2 className="text-sm font-black text-black dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <span>Practical Lesson Updates</span>
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-800">
                    Coding Labs Only
                  </span>
                </h2>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 self-start sm:self-auto bg-slate-200 dark:bg-neutral-800 p-0.5 rounded-xl text-[11px] font-bold">
              <button
                onClick={() => setLessonFilter('all')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  lessonFilter === 'all'
                    ? 'bg-white dark:bg-black text-blue-600 dark:text-blue-400 font-black shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
                }`}
              >
                All ({PRACTICAL_LESSONS.length})
              </button>
              <button
                onClick={() => setLessonFilter('completed')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  lessonFilter === 'completed'
                    ? 'bg-white dark:bg-black text-blue-600 dark:text-blue-400 font-black shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
                }`}
              >
                Done ({completedDays.length})
              </button>
              <button
                onClick={() => setLessonFilter('pending')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  lessonFilter === 'pending'
                    ? 'bg-white dark:bg-black text-blue-600 dark:text-blue-400 font-black shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
                }`}
              >
                To Do ({Math.max(0, PRACTICAL_LESSONS.length - completedDays.length)})
              </button>
            </div>
          </div>

          {/* Sprints Release Status Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-white dark:bg-neutral-950 border border-blue-200 dark:border-blue-900/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="font-bold text-black dark:text-white text-xs">Sprint 1 (Days 1–10): HTML5 &amp; Resume</span>
              </div>
              <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                Live Now
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 flex items-center justify-between opacity-80">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <span className="font-bold text-black dark:text-white text-xs">Sprint 2 (Days 11–20): CSS3 &amp; Flexbox</span>
              </div>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                Next Sprint
              </span>
            </div>
          </div>

          {/* Practical Lesson Updates Cards Feed */}
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {filteredPracticalLessons.map((lesson) => {
              const isDone = completedDays.includes(lesson.day);
              const repoUrl = githubRepoUrls[lesson.day.toString()];

              return (
                <div
                  key={lesson.id}
                  className={`p-3 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
                    isDone
                      ? 'bg-white dark:bg-neutral-950 border-emerald-500/30'
                      : 'bg-white dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 hover:border-blue-500/50'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-2.5 min-w-0">
                    <div className={`px-2 py-1 rounded-lg font-mono text-xs font-black shrink-0 ${
                      isDone
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
                        : 'bg-blue-50 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-700'
                    }`}>
                      Day {lesson.day}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-black dark:text-white truncate">
                          {lesson.title}
                        </span>
                        {lesson.day === 10 && (
                          <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-amber-500 text-black">
                            🏆 Portfolio Project
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>{lesson.category}</span>
                        <span>•</span>
                        <span>{lesson.estimatedTime}</span>
                        <span>•</span>
                        <span>{lesson.practicalLab.tasks.length} Coding Tasks</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    {isDone ? (
                      <>
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 size={13} />
                          <span>Passed</span>
                        </span>

                        {repoUrl && (
                          <a
                            href={repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            title="View Verified GitHub Repository"
                          >
                            <GitBranch size={13} />
                          </a>
                        )}

                        <Link
                          href={`/bca/practical/${lesson.slug}`}
                          className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-black dark:text-white font-bold text-xs transition-all"
                        >
                          Review
                        </Link>
                      </>
                    ) : (
                      <Link
                        href={`/bca/practical/${lesson.slug}`}
                        className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
                      >
                        <Play size={12} />
                        <span>Start Lab</span>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Career Specialization Track Switcher */}
        <div className="space-y-3">
          <div className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Selected Career Track:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CAREER_TRACKS.map(track => {
              const isSelected = track.id === selectedTrack;
              return (
                <button
                  key={track.id}
                  onClick={() => setSelectedTrack(track.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-blue-50 dark:bg-neutral-900 border-blue-600 text-black dark:text-white shadow-xs"
                      : "bg-slate-50 dark:bg-neutral-900/40 border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold flex items-center gap-2">
                      <span className="text-base">{track.icon}</span>
                      <span>{track.title.split("—")[1] || track.title}</span>
                    </span>
                    {isSelected && (
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-600 text-white">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                    {track.targetRoles.join(", ")}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 6. Verified GitHub Project Repositories */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Verified GitHub Repositories:
            </span>
            <span className="text-xs font-mono text-slate-500">
              {Object.keys(githubRepoUrls).length} Pushed
            </span>
          </div>

          {Object.keys(githubRepoUrls).length === 0 ? (
            <div className="p-4 rounded-xl bg-white dark:bg-neutral-950 border border-dashed border-slate-300 dark:border-neutral-800 text-center text-xs text-slate-500">
              No practical projects submitted yet. Complete any practical day and submit your GitHub repository link to build your developer portfolio!
            </div>
          ) : (
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {Object.entries(githubRepoUrls).map(([dayNum, url]) => (
                <div 
                  key={dayNum}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-xs"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 font-mono text-[11px] font-bold shrink-0">
                      Day {dayNum}
                    </span>
                    <span className="font-mono text-xs text-slate-700 dark:text-slate-300 truncate">
                      {url.replace(/^https?:\/\/github\.com\//, "")}
                    </span>
                  </div>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0"
                    title="View on GitHub"
                  >
                    <ExternalLink size={15} />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 7. Professional & Social Integrations (LinkedIn, Instagram, WhatsApp) */}
        <StudentSocialIntegrationsCard />

        {/* 8. PWA Install */}
        {isInstallable && (
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-black dark:text-white">Install as Progressive Web App</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Add NextSem to your home screen for quick offline access and fullscreen mode.</p>
            </div>
            <button
              onClick={installApp}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 shadow-sm"
            >
              <Download size={14} />
              <span>Install App</span>
            </button>
          </div>
        )}

        {/* 10. Danger Zone: Delete Account */}
        <div className="p-5 rounded-2xl border border-rose-200 dark:border-rose-950/60 bg-rose-50/30 dark:bg-rose-950/10 space-y-2">
          <p className="text-xs font-bold text-rose-700 dark:text-rose-400">Account Reset / Data Removal</p>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
            Permanently clear your local storage progress, completed badges, and sign out from this device.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="px-3.5 py-1.5 text-xs font-bold text-rose-600 hover:text-white hover:bg-rose-600 dark:text-rose-400 dark:hover:bg-rose-900 border border-rose-300 dark:border-rose-900/60 rounded-xl transition-all cursor-pointer"
          >
            Clear Account Data
          </button>
        </div>

      </main>

      <PracticalProcessGuideModal 
        isOpen={showProcessGuide} 
        onClose={() => setShowProcessGuide(false)} 
      />
    </div>
  );
}
