"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Terminal, Sparkles, CheckCircle2, Circle, ArrowRight, BookOpen, 
  Code2, GitBranch, Layers, Trophy, Laptop, Globe, Cpu, Database, 
  ExternalLink, Calendar, Filter, Clock, Star, ShieldCheck, ChevronRight,
  Lock, LogIn, LogOut, UserCheck, CloudCheck, AlertTriangle
} from "lucide-react";
import BcaHeaderNav from "@/components/bca/BcaHeaderNav";
import { 
  CAREER_TRACKS, PRACTICAL_SEMESTERS, PRACTICAL_SPRINTS, 
  PRACTICAL_LESSONS, CareerTrack, PracticalSemester, PracticalLesson 
} from "@/data/bcaPracticalData";
import { useStudentProgress } from "@/context/StudentProgressContext";

export default function BcaPracticalHubClient() {
  const { 
    user, 
    loading, 
    completedDays, 
    githubRepoUrls, 
    selectedTrack, 
    isCloudSynced, 
    signIn, 
    signOut, 
    isDayCompleted, 
    isDayUnlocked,
    setSelectedTrack 
  } = useStudentProgress();

  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const [dayFilter, setDayFilter] = useState<"all" | "1-5" | "6-10">("all");
  const [lockedModalDay, setLockedModalDay] = useState<number | null>(null);

  const filteredLessons = PRACTICAL_LESSONS.filter((lesson) => {
    if (dayFilter === "1-5") return lesson.day <= 5;
    if (dayFilter === "6-10") return lesson.day > 5 && lesson.day <= 10;
    return true;
  });

  const completionPercentage = Math.round((completedDays.length / PRACTICAL_LESSONS.length) * 100);

  return (
    <div className="min-h-screen bg-[#060c18] text-slate-100 flex flex-col font-sans pb-24">
      {/* Top Header Nav */}
      <BcaHeaderNav currentSubjectCode="BCA Practical" currentSubjectName="Job-Oriented Training Portal" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 w-full flex-1">
        {/* Breadcrumb Navigation Trail */}
        <nav aria-label="Breadcrumbs" className="flex flex-wrap items-center gap-2 text-xs text-slate-300 font-bold py-1 mb-6">
          <Link href="/" className="hover:text-[#04AA6D] transition-colors flex items-center gap-1">
            <span>🏠 Home</span>
          </Link>
          <span className="text-slate-600 font-bold">❯</span>
          <Link href="/bca" className="hover:text-[#04AA6D] transition-colors">
            BCA Hub
          </Link>
          <span className="text-slate-600 font-bold">❯</span>
          <span className="text-emerald-400 font-bold">
            ⚡ Practical Learning Portal
          </span>
        </nav>

        {/* ── GOOGLE SIGN-IN & STUDENT STATUS BAR ── */}
        <div className="rounded-2xl bg-[#091124] border border-cyan-500/30 p-4 sm:p-5 mb-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {user ? (
            <div className="flex items-center gap-3.5">
              <div className="relative">
                {user.photo ? (
                  <img src={user.photo} alt={user.name} className="w-12 h-12 rounded-full border-2 border-emerald-400 object-cover shadow-md" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-emerald-600 border-2 border-emerald-400 flex items-center justify-center font-black text-white text-base">
                    {user.name.charAt(0)}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#091124]" title="Active Student" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-extrabold text-white">{user.name}</h3>
                  {isCloudSynced && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      ☁️ Cloud Synced
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-400 font-mono">{user.email}</div>
                <div className="text-[11px] text-cyan-300 font-bold mt-0.5">
                  Completed: <span className="text-white font-extrabold">{completedDays.length} Days</span> • Active Track: <span className="text-white uppercase font-extrabold">{selectedTrack}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
                <UserCheck size={20} />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold text-white">Student Progress Tracking & Cloud Sync</h3>
                <p className="text-[11px] sm:text-xs text-slate-300">
                  Sign in with your Google account so your teacher can track your practical submissions, completed days, and verified GitHub repos.
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            {user ? (
              <button
                onClick={signOut}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white transition-all active:scale-95"
              >
                <LogOut size={13} />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                onClick={signIn}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-black text-xs transition-all active:scale-95 shadow-lg shadow-white/10"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Sign in with Google</span>
              </button>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1328] via-[#091124] to-[#060c18] border border-cyan-500/20 p-6 sm:p-8 mb-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold tracking-wide uppercase mb-3">
              <Sparkles size={14} />
              <span>3-Year Practical-First Training System</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
              BCA Practical Learning Portal
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed mb-6 font-normal">
              Structured daily hands-on training to turn everyday BCA students into job-ready software developers.
              Follow the proven pipeline: <strong className="text-white">Foundation ➔ Specialization ➔ Projects ➔ GitHub ➔ Portfolio ➔ Job Preparation</strong>.
            </p>

            {/* Pipeline Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-2 pb-4 text-xs font-bold text-center">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5">
                <span className="text-emerald-400 block mb-0.5">Step 1</span>
                <span className="text-white">🧱 Foundation</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5">
                <span className="text-cyan-400 block mb-0.5">Step 2</span>
                <span className="text-white">🎯 Specialization</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5">
                <span className="text-blue-400 block mb-0.5">Step 3</span>
                <span className="text-white">🚀 Real Projects</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5">
                <span className="text-indigo-400 block mb-0.5">Step 4</span>
                <span className="text-white">🐙 GitHub Proof</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5">
                <span className="text-amber-400 block mb-0.5">Step 5</span>
                <span className="text-white">🌐 Live Portfolio</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5">
                <span className="text-rose-400 block mb-0.5">Step 6</span>
                <span className="text-white">💼 Job Readiness</span>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-xs text-slate-400">Class Model</div>
                  <div className="text-sm font-extrabold text-white flex items-center gap-1.5 mt-0.5">
                    <Clock size={14} className="text-amber-400" />
                    <span>2 Hours Practical / Day</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Progression Rule</div>
                  <div className="text-sm font-extrabold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                    <GitBranch size={14} />
                    <span>Sequential + GitHub Verified</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400">
                  Sprint 1 Progress: <span className="text-white font-extrabold">{completedDays.length} / {PRACTICAL_LESSONS.length}</span> ({completionPercentage}%)
                </span>
                <div className="w-24 sm:w-32 h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500" 
                    style={{ width: `${completionPercentage}%` }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Career Specialization Tracks */}
        <section className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <span>🎯 4 Career Specialization Tracks</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                After the common foundation in Year 1, select your target career track based on your strength and interest.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CAREER_TRACKS.map((track) => (
              <div 
                key={track.id}
                onClick={() => setSelectedTrack(track.id)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all text-left flex flex-col justify-between ${
                  selectedTrack === track.id 
                    ? "bg-[#0e1733] border-cyan-400 ring-2 ring-cyan-500/20 shadow-lg shadow-cyan-950/40" 
                    : "bg-[#0c1328]/80 hover:bg-[#0f1938] border-slate-800/80 hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{track.icon}</span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-900/90 text-cyan-300 border border-slate-700">
                      {track.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-white mb-1.5 leading-snug">
                    {track.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-3 mb-3 leading-relaxed">
                    {track.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/60 mt-2">
                  <div className="text-[11px] font-bold text-slate-400 mb-1">Target Roles:</div>
                  <div className="flex flex-wrap gap-1">
                    {track.targetRoles.slice(0, 2).map((role, idx) => (
                      <span key={idx} className="text-[10px] font-semibold bg-slate-900/90 px-1.5 py-0.5 rounded text-slate-300 border border-slate-800">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3-Year / 6-Semester Practical Roadmap */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <span>🗓️ 3-Year / 6-Semester Practical Progression</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                A seamless curriculum from Day 1 setup to Semester 6 production deployment.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
            {PRACTICAL_SEMESTERS.map((sem) => (
              <button
                key={sem.semNumber}
                onClick={() => setSelectedSemester(sem.semNumber)}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  selectedSemester === sem.semNumber
                    ? "bg-[#0c1328] border-emerald-500 text-white font-black shadow-md shadow-emerald-950/30"
                    : "bg-slate-950/70 border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-extrabold">Year {sem.year}</div>
                <div className="text-xs font-black mt-0.5">Sem {sem.semNumber}</div>
              </button>
            ))}
          </div>

          {/* Active Semester Details Box */}
          {(() => {
            const activeSem = PRACTICAL_SEMESTERS.find(s => s.semNumber === selectedSemester) || PRACTICAL_SEMESTERS[0];
            return (
              <div className="rounded-2xl bg-[#0c1328] border border-slate-800/80 p-5 sm:p-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <span className="text-emerald-400">⚡</span>
                    <span>{activeSem.title}</span>
                  </h3>
                  <span className="text-xs font-bold text-cyan-400 bg-cyan-950/50 px-2.5 py-1 rounded-full border border-cyan-800/60 w-fit">
                    Year {activeSem.year} Focus
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {activeSem.focus}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-800/80">
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Core Theory & Lab Subjects:</h4>
                    <ul className="space-y-1.5 text-xs text-slate-200">
                      {activeSem.coreSubjects.map((sub, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Practical Lab Milestones:</h4>
                    <ul className="space-y-1.5 text-xs text-slate-200">
                      {activeSem.practicalHighlights.map((hl, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-cyan-400 font-bold">✔</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        {/* 90-Day Sprint Overview Cards */}
        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <span>⚡ 90-Day Practical Sprints (Year 1 Foundation)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Three intensive 30-day coding sprints to build real developer muscle memory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PRACTICAL_SPRINTS.map((sprint) => (
              <div key={sprint.sprintNumber} className="rounded-2xl bg-[#0c1328] border border-slate-800 p-5 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold text-emerald-400">{sprint.daysRange}</span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
                      {sprint.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-white mb-2">{sprint.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{sprint.description}</p>
                </div>
                <div className="pt-3 border-t border-slate-800 text-xs">
                  <span className="text-slate-400 font-bold block mb-0.5">Milestone Project:</span>
                  <span className="text-amber-300 font-extrabold">{sprint.milestoneProject}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Daily Practical Lessons Grid (Days 1–10) with Sequential Lock Enforcement */}
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <span>📚 Daily Practical Lessons (Sequential + GitHub Required)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                You must complete each day and verify its GitHub commit before unlocking the next practical lesson.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="inline-flex rounded-xl bg-slate-900 p-1 border border-slate-800 text-xs font-bold self-start sm:self-auto">
              <button 
                onClick={() => setDayFilter("all")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${dayFilter === "all" ? "bg-[#0c1328] text-white border border-slate-700 shadow" : "text-slate-400 hover:text-white"}`}
              >
                All Days (1–10)
              </button>
              <button 
                onClick={() => setDayFilter("1-5")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${dayFilter === "1-5" ? "bg-[#0c1328] text-white border border-slate-700 shadow" : "text-slate-400 hover:text-white"}`}
              >
                Days 1–5
              </button>
              <button 
                onClick={() => setDayFilter("6-10")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${dayFilter === "6-10" ? "bg-[#0c1328] text-white border border-slate-700 shadow" : "text-slate-400 hover:text-white"}`}
              >
                Days 6–10
              </button>
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLessons.map((lesson) => {
              const isDone = isDayCompleted(lesson.day);
              const isUnlocked = isDayUnlocked(lesson.day);
              const submittedGhUrl = githubRepoUrls[lesson.day.toString()];

              return (
                <div 
                  key={lesson.id}
                  className={`rounded-2xl p-5 border transition-all flex flex-col justify-between relative ${
                    isDone 
                      ? "bg-[#0c1328]/90 border-emerald-500/50 shadow-lg shadow-emerald-950/20" 
                      : isUnlocked
                        ? "bg-[#0c1328] hover:bg-[#0f1938] border-cyan-500/40 shadow-md ring-1 ring-cyan-500/20"
                        : "bg-slate-950/60 border-slate-800/60 opacity-70"
                  }`}
                >
                  <div>
                    {/* Top Row Badges */}
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-black px-2.5 py-0.5 rounded-lg ${
                          isDone 
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : isUnlocked
                              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                              : "bg-slate-900 text-slate-500 border border-slate-800"
                        }`}>
                          Day {lesson.day}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400">
                          {lesson.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                          <Clock size={11} />
                          {lesson.estimatedTime}
                        </span>
                        {isDone ? (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                            <CheckCircle2 size={11} /> GitHub Verified
                          </span>
                        ) : !isUnlocked ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-slate-500 border border-slate-800 flex items-center gap-1">
                            <Lock size={11} /> Locked
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center gap-1">
                            ⚡ Active
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className={`text-base font-black mb-2 leading-snug ${isUnlocked ? "text-white" : "text-slate-400"}`}>
                      {lesson.title}
                    </h3>

                    {/* Objectives Checklist Preview */}
                    <div className="space-y-1 mb-4">
                      {lesson.objectives.slice(0, 2).map((obj, i) => (
                        <div key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                          <span className={`${isUnlocked ? "text-cyan-400" : "text-slate-600"} shrink-0 mt-0.5`}>❯</span>
                          <span className="line-clamp-1">{obj}</span>
                        </div>
                      ))}
                    </div>

                    {/* Submitted GitHub Link (if done) */}
                    {isDone && submittedGhUrl && (
                      <div className="p-2 rounded-xl bg-slate-950/80 border border-emerald-500/30 mb-3 text-[11px] font-mono text-emerald-300 flex items-center gap-1.5 truncate">
                        <GitBranch size={12} className="text-emerald-400 shrink-0" />
                        <span className="truncate">{submittedGhUrl}</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Button */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between mt-2">
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                      <GitBranch size={13} className="text-slate-400" />
                      <span>{lesson.githubWorkflow.repoName}</span>
                    </span>

                    {isUnlocked ? (
                      <Link
                        href={`/bca/practical/${lesson.slug}`}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all active:scale-95 ${
                          isDone
                            ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                            : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/40"
                        }`}
                      >
                        <span>{isDone ? "Review Practical" : "Start Practical"}</span>
                        <ArrowRight size={13} />
                      </Link>
                    ) : (
                      <button
                        onClick={() => setLockedModalDay(lesson.day)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 border border-slate-800 text-slate-500 hover:text-slate-400 hover:border-slate-700 transition-all cursor-pointer"
                      >
                        <Lock size={12} />
                        <span>Requires Day {lesson.day - 1}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* GitHub Workflow Requirement Banner */}
        <section className="rounded-2xl bg-gradient-to-r from-slate-900 via-[#0c1328] to-slate-900 border border-slate-800 p-6 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-400">
                <GitBranch size={14} />
                <span>MANDATORY GITHUB PRACTICE FROM SEMESTER 1</span>
              </div>
              <h3 className="text-base font-black text-white">
                Individual Project Repositories & Real Git Commits
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Do NOT dump every assignment into one giant repository. Maintain clean, dedicated repos for 
                <code className="text-emerald-400 mx-1">html-css-projects</code>, 
                <code className="text-emerald-400 mx-1">javascript-projects</code>, and your 
                <code className="text-emerald-400 mx-1">major-project</code>.
                Every practical session follows the standard workflow: <span className="text-white font-mono font-bold">Code ➔ Test ➔ Git Add ➔ Commit ➔ Push</span>.
              </p>
            </div>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-extrabold text-xs shrink-0 transition-all active:scale-95 shadow-md"
            >
              <span>Visit GitHub</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </section>

        {/* Locked Modal Notice */}
        {lockedModalDay && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#0c1328] border border-cyan-500/40 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
                <Lock size={24} />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-black text-white">Day {lockedModalDay} is Locked</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  To maintain strict practical mastery, you must complete <strong className="text-white">Day {lockedModalDay - 1}</strong>, pass all coding tasks, and verify your commit on GitHub before moving forward.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setLockedModalDay(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
                >
                  Close
                </button>
                <Link
                  href={`/bca/practical/${PRACTICAL_LESSONS.find(l => l.day === lockedModalDay - 1)?.slug || "day-1-html-setup-first-webpage"}`}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md"
                >
                  Go to Day {lockedModalDay - 1} 🚀
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
