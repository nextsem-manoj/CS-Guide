"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  X, CheckCircle2, GitBranch, ExternalLink, Award, Sparkles, 
  Terminal, LogOut, LogIn, ShieldCheck, UserCheck, 
  ChevronRight, Laptop, Calendar, Play, Code, Clock, Flame,
  HelpCircle
} from "lucide-react";
import { useStudentProgress } from "@/context/StudentProgressContext";
import { CAREER_TRACKS, PRACTICAL_LESSONS } from "@/data/bcaPracticalData";
import StudentSocialIntegrationsCard from "./profile/StudentSocialIntegrationsCard";
import PracticalProcessGuideModal from "./profile/PracticalProcessGuideModal";
import CbtScoreCard from "./profile/CbtScoreCard";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function StudentProfileDashboardModal({ isOpen, onClose }: Props) {
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

  const [lessonFilter, setLessonFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [showProcessGuide, setShowProcessGuide] = useState(false);

  // Close on Escape key and lock scroll smoothly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const totalPossibleDays = 360;
  const sem1TotalDays = 60;
  const sem1CompletedCount = completedDays.filter(d => d <= 60).length;
  const sem1Percent = Math.min(100, Math.round((sem1CompletedCount / sem1TotalDays) * 100));

  // Determine active track object
  const activeTrackObj = CAREER_TRACKS.find(t => t.id === selectedTrack) || CAREER_TRACKS[0];

  // Find next unlocked day
  const nextDayToStudy = Array.from({ length: 60 }, (_, i) => i + 1).find(d => !completedDays.includes(d)) || 1;
  const nextLessonObj = PRACTICAL_LESSONS.find(l => l.day === nextDayToStudy);

  // Filtered practical lessons
  const filteredLessons = PRACTICAL_LESSONS.filter(l => {
    if (lessonFilter === 'completed') return completedDays.includes(l.day);
    if (lessonFilter === 'pending') return !completedDays.includes(l.day);
    return true;
  });

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm transition-all duration-200 select-none ${
        isOpen
          ? "opacity-100 pointer-events-auto visible"
          : "opacity-0 pointer-events-none invisible"
      }`}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div 
        className={`w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 shadow-2xl p-5 sm:p-7 text-black dark:text-white relative flex flex-col gap-6 transition-all duration-200 will-change-transform ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-2"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-neutral-900 border border-blue-200 dark:border-neutral-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Sparkles size={16} />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-black dark:text-white leading-tight">
                Student Learning Dashboard
              </h2>
              <p className="text-[11px] text-slate-500 font-mono">
                BCA Practical Coding System • Er. Manoj Kumar
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer"
            title="Close Dashboard"
          >
            <X size={16} />
          </button>
        </div>

        {/* 1. Student Identity Hero Card */}
        <div className="rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {user?.photo ? (
              <img 
                src={user.photo} 
                alt={user.name} 
                loading="eager"
                decoding="async"
                className="w-14 h-14 rounded-2xl border-2 border-blue-600 object-cover shadow-sm shrink-0" 
              />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-black text-xl flex items-center justify-center shadow-sm shrink-0">
                {user?.isGuest ? "G" : (user?.name?.charAt(0) || "S")}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-black text-black dark:text-white">
                  {user?.name || "Guest Student"}
                </h3>
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

              <div className="text-xs text-slate-500 font-mono mt-0.5">
                {user?.email || "guest@nextsem.local"}
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] font-bold">
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
                  className="inline-flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-bold transition-colors cursor-pointer"
                  title="Click to understand how local storage, cloud sync, and the 360-day practical roadmap works"
                >
                  <HelpCircle size={12} />
                  <span>How it works?</span>
                </button>
              </div>
            </div>
          </div>

          {/* Connect Google if Guest, or Sign Out */}
          <div className="flex sm:flex-col items-center gap-2 shrink-0">
            {user?.isGuest ? (
              <button
                onClick={() => { onClose(); signIn(); }}
                className="w-full px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                title="Sign in with Google to enable cloud backup"
              >
                <LogIn size={13} />
                <span>Connect Google</span>
              </button>
            ) : null}

            <button
              onClick={() => { onClose(); signOut(); }}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <LogOut size={13} />
              <span>{user?.isGuest ? "Exit Guest" : "Sign Out"}</span>
            </button>
          </div>
        </div>

        {/* Degree Architecture Explainer Pill */}
        <div className="px-3.5 py-2.5 rounded-2xl bg-blue-50/80 dark:bg-neutral-900 border border-blue-200 dark:border-neutral-800 text-[11px] text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
          <span className="w-5 h-5 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">
            ℹ️
          </span>
          <div className="leading-snug">
            <span className="font-black text-black dark:text-white">3-Year BCA Degree Practical Structure:</span>{" "}
            A 3-year degree has <strong>6 Semesters</strong>. Each semester has <strong>60 practical lab days</strong> (15 weeks × 4 lab classes/week).{" "}
            <strong>6 Semesters × 60 Days = 360 Total Practical Coding Days</strong> across your entire 3-year degree.
          </div>
        </div>

        {/* 2. Degree Practical Progress Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
            <div className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider flex items-center justify-between">
              <span>Sem 1 Practical</span>
              <span className="text-[9px] font-bold text-slate-400">Active</span>
            </div>
            <div className="text-xl font-black text-black dark:text-white mt-1">
              {sem1CompletedCount} <span className="text-xs text-slate-400 font-normal">/ 60 Days</span>
            </div>
            <div className="text-[9px] text-slate-500 dark:text-slate-400 mt-1 truncate">
              3-Yr Total: {completedDays.length} / 360 Labs
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
            <div className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">Sem 1 Sprints</div>
            <div className="text-xl font-black text-blue-600 dark:text-blue-400 mt-1">
              {sem1Percent}% <span className="text-xs text-slate-400 font-normal">done</span>
            </div>
            <div className="text-[9px] text-slate-500 dark:text-slate-400 mt-1 truncate">
              Sprint 1 (Days 1–30)
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
            <div className="text-[10px] font-black uppercase text-slate-500 tracking-wider">GitHub Repos</div>
            <div className="text-xl font-black text-black dark:text-white mt-1">
              {Object.keys(githubRepoUrls).length} <span className="text-xs text-slate-400 font-normal">verified</span>
            </div>
            <div className="text-[9px] text-slate-500 dark:text-slate-400 mt-1 truncate">
              Portfolio Pushes
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
            <div className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Active Day</div>
            <div className="text-xl font-black text-black dark:text-white mt-1">
              Day {nextDayToStudy}
            </div>
            <div className="text-[9px] text-blue-600 dark:text-blue-400 mt-1 font-bold truncate">
              Current Target
            </div>
          </div>
        </div>

        {/* 3. Progress Bar for Semester 1 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="text-black dark:text-white">Semester 1 Practical Progress (Days 1–60)</span>
            <span className="text-blue-600 dark:text-blue-400 font-mono">{sem1CompletedCount} of {sem1TotalDays} Days ({sem1Percent}%)</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-neutral-800 overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-500" 
              style={{ width: `${Math.max(5, sem1Percent)}%` }} 
            />
          </div>
          {nextLessonObj && (
            <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-slate-200 dark:border-neutral-800">
              <span className="text-[11px] text-slate-600 dark:text-slate-400 truncate">
                Next Up: <strong className="text-black dark:text-white">Day {nextLessonObj.day}: {nextLessonObj.title}</strong>
              </span>
              <Link
                href={`/bca/practical/${nextLessonObj.slug}`}
                onClick={onClose}
                className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] shrink-0 inline-flex items-center gap-1 transition-all active:scale-95"
              >
                <span>Continue</span>
                <ChevronRight size={12} />
              </Link>
            </div>
          )}
        </div>

        {/* Computer Competency 100-MCQ Assessment Scorecard */}
        <CbtScoreCard onAction={onClose} />

        {/* 4. PRACTICAL DAYS LESSON UPDATES (NO THEORY UPDATES) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                ⚡
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-black dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <span>Practical Lesson Updates</span>
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-800">
                    Coding Labs Only
                  </span>
                </h4>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 self-start sm:self-auto bg-slate-200 dark:bg-neutral-800 p-0.5 rounded-xl text-[10px] font-bold">
              <button
                onClick={() => setLessonFilter('all')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  lessonFilter === 'all'
                    ? 'bg-white dark:bg-black text-blue-600 dark:text-blue-400 font-black shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
                }`}
              >
                All ({PRACTICAL_LESSONS.length})
              </button>
              <button
                onClick={() => setLessonFilter('completed')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  lessonFilter === 'completed'
                    ? 'bg-white dark:bg-black text-blue-600 dark:text-blue-400 font-black shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
                }`}
              >
                Done ({completedDays.length})
              </button>
              <button
                onClick={() => setLessonFilter('pending')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
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
            <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-950 border border-blue-200 dark:border-blue-900/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="font-bold text-black dark:text-white text-[11px]">Sprint 1 (Days 1–10): HTML5 &amp; Resume</span>
              </div>
              <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded">
                Live Now
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 flex items-center justify-between opacity-80">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <span className="font-bold text-black dark:text-white text-[11px]">Sprint 2 (Days 11–20): CSS3 &amp; Flexbox</span>
              </div>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
                Next Sprint
              </span>
            </div>
          </div>

          {/* Practical Lesson Updates Cards Feed */}
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {filteredLessons.map((lesson) => {
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
                    <div className={`px-2 py-1 rounded-lg font-mono text-[11px] font-black shrink-0 ${
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
                      <div className="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5">
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
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-neutral-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            title="View Verified GitHub Repository"
                          >
                            <GitBranch size={13} />
                          </a>
                        )}

                        <Link
                          href={`/bca/practical/${lesson.slug}`}
                          onClick={onClose}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-black dark:text-white font-bold text-[11px] transition-all"
                        >
                          Review
                        </Link>
                      </>
                    ) : (
                      <Link
                        href={`/bca/practical/${lesson.slug}`}
                        onClick={onClose}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] flex items-center gap-1 shadow-sm transition-all active:scale-95"
                      >
                        <Play size={11} />
                        <span>Start Lab</span>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Career Track Specialization Switcher */}
        <div>
          <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
            Selected Career Track:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {CAREER_TRACKS.map(track => {
              const isSelected = track.id === selectedTrack;
              return (
                <button
                  key={track.id}
                  onClick={() => setSelectedTrack(track.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-blue-50 dark:bg-neutral-900 border-blue-600 text-black dark:text-white shadow-sm"
                      : "bg-slate-50 dark:bg-neutral-900/40 border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold flex items-center gap-1.5">
                      <span>{track.icon}</span>
                      <span>{track.title.split("—")[1] || track.title}</span>
                    </span>
                    {isSelected && (
                      <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-blue-600 text-white">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 line-clamp-1">
                    {track.targetRoles.join(", ")}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 6. Verified GitHub Repositories List */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              Verified GitHub Project Repositories:
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              {Object.keys(githubRepoUrls).length} Pushed
            </span>
          </div>

          {Object.keys(githubRepoUrls).length === 0 ? (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-dashed border-slate-300 dark:border-neutral-800 text-center text-xs text-slate-500">
              No practical projects submitted yet. Complete any practical day and submit your GitHub repository link to build your developer portfolio!
            </div>
          ) : (
            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              {Object.entries(githubRepoUrls).map(([dayNum, url]) => (
                <div 
                  key={dayNum}
                  className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="px-1.5 py-0.5 rounded bg-blue-50 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 font-mono text-[10px] font-bold shrink-0">
                      Day {dayNum}
                    </span>
                    <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300 truncate">
                      {url.replace(/^https?:\/\/github\.com\//, "")}
                    </span>
                  </div>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded text-slate-400 hover:text-blue-600 transition-colors shrink-0"
                    title="View on GitHub"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 7. Professional & Social Integrations (LinkedIn, Instagram, WhatsApp) */}
        <StudentSocialIntegrationsCard />

        {/* 8. Quick Practical Portal Shortcuts (100% Practical - Zero Theory Links) */}
        <div className="pt-2 border-t border-slate-200 dark:border-neutral-800 flex flex-wrap items-center gap-2">
          <Link
            href="/bca/practical"
            onClick={onClose}
            className="flex-1 min-w-[140px] px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-black dark:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Calendar size={14} className="text-blue-600 dark:text-blue-400" />
            <span>Practical Portal</span>
          </Link>

          <Link
            href={`/bca/practical/${nextLessonObj?.slug || 'day-1-html-setup-first-webpage'}`}
            onClick={onClose}
            className="flex-1 min-w-[140px] px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
          >
            <Play size={14} />
            <span>Continue Day {nextDayToStudy}</span>
          </Link>

          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent("🚀 Check out my BCA Practical Learning Progress on NextSem: https://ignou-study-notes-by-nextsem.web.app/bca/practical")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[140px] px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
          >
            <span>WhatsApp Share</span>
          </a>
        </div>
      </div>

      <PracticalProcessGuideModal 
        isOpen={showProcessGuide} 
        onClose={() => setShowProcessGuide(false)} 
      />
    </div>
  );
}
