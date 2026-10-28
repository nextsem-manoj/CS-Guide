"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Terminal, Sparkles, CheckCircle2, Circle, ArrowRight, BookOpen, 
  Code2, GitBranch, Layers, Trophy, Laptop, Globe, Cpu, Database, 
  ExternalLink, Calendar, Filter, Clock, Star, ShieldCheck, ChevronRight,
  Lock, LogIn, LogOut, UserCheck
} from "lucide-react";
import BcaHeaderNav from "@/components/bca/BcaHeaderNav";
import BcaStoriesTray from "@/components/bca/BcaStoriesTray";
import StudentPeerNetwork from "@/components/bca/StudentPeerNetwork";
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
    signInAsGuest,
    signOut, 
    openProfileDashboard,
    isDayCompleted, 
    isDayUnlocked,
    setSelectedTrack 
  } = useStudentProgress();

  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const [sprintViewFilter, setSprintViewFilter] = useState<number | "all">(1);
  const [dayFilter, setDayFilter] = useState<"all" | "1-10" | "11-20" | "21-30" | "31-40" | "41-50">("all");
  const [lockedModalDay, setLockedModalDay] = useState<number | null>(null);

  const filteredLessons = PRACTICAL_LESSONS.filter((lesson) => {
    if (dayFilter === "1-10") return lesson.day <= 10;
    if (dayFilter === "11-20") return lesson.day > 10 && lesson.day <= 20;
    if (dayFilter === "21-30") return lesson.day > 20 && lesson.day <= 30;
    if (dayFilter === "31-40") return lesson.day > 30 && lesson.day <= 40;
    if (dayFilter === "41-50") return lesson.day > 40 && lesson.day <= 50;
    return true;
  });

  const completionPercentage = Math.round((completedDays.length / PRACTICAL_LESSONS.length) * 100);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col font-sans pb-24 transition-colors">
      {/* Top Header Nav */}
      <BcaHeaderNav currentSubjectCode="BCA Practical" currentSubjectName="Job-Oriented Training Portal" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 w-full flex-1">
        {/* Breadcrumb Navigation Trail */}
        <nav aria-label="Breadcrumbs" className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-bold py-1 mb-6">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
            <span>🏠 Home</span>
          </Link>
          <span className="text-slate-400 dark:text-slate-600 font-bold">❯</span>
          <Link href="/bca" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            BCA Hub
          </Link>
          <span className="text-slate-400 dark:text-slate-600 font-bold">❯</span>
          <span className="text-blue-600 dark:text-blue-400 font-bold">
            ⚡ Practical Learning Portal
          </span>
        </nav>

        {/* ── BCA STUDENT DAILY STORIES TRAY ── */}
        <BcaStoriesTray />

        {/* ── GOOGLE SIGN-IN & STUDENT STATUS BAR ── */}
        <div className="rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-4 sm:p-5 mb-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {user ? (
            <div className="flex items-center gap-3.5">
              <button
                onClick={openProfileDashboard}
                className="relative cursor-pointer hover:scale-105 active:scale-95 transition-all text-left group"
                title="Click photo to open Student Dashboard"
              >
                {user.photo ? (
                  <img src={user.photo} alt={user.name} loading="eager" decoding="async" className="w-12 h-12 rounded-2xl border-2 border-blue-600 object-cover shadow-sm group-hover:border-blue-500" />
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center font-black text-white text-base shadow-sm">
                    {user.isGuest ? "G" : user.name.charAt(0)}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-blue-600 border-2 border-white dark:border-black" title="Active Student" />
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={openProfileDashboard}
                    className="text-sm font-extrabold text-black dark:text-white hover:text-blue-600 transition-colors text-left cursor-pointer"
                  >
                    {user.name}
                  </button>
                  {isCloudSynced ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-neutral-900 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-800">
                      ☁️ Cloud Synced
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-neutral-700">
                      💾 Saved on Device
                    </span>
                  )}
                  <Link
                    href="/bca/practical/how-it-works"
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    title="Read complete guide on local storage, cloud sync, and 360-day degree roadmap"
                  >
                    ℹ️ How it works?
                  </Link>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">{user.email}</div>
                <div className="text-[11px] text-blue-600 dark:text-blue-400 font-bold mt-0.5">
                  Completed: <span className="text-black dark:text-white font-extrabold">{completedDays.length} Days</span> • Active Track: <span className="text-black dark:text-white uppercase font-extrabold">{selectedTrack}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-neutral-900 border border-blue-200 dark:border-neutral-800 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
                <UserCheck size={20} />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold text-black dark:text-white">Student Progress Tracking &amp; Cloud Sync</h3>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">
                  Sign in with your Google account so your teacher can track your practical submissions, completed days, and verified GitHub repos.
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            {user ? (
              <>
                <button
                  onClick={openProfileDashboard}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all active:scale-95 shadow-sm cursor-pointer"
                >
                  <Sparkles size={13} />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={signOut}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all active:scale-95 cursor-pointer"
                >
                  <LogOut size={13} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => signInAsGuest()}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-black dark:text-white font-bold text-xs transition-all active:scale-95 cursor-pointer"
                >
                  Guest
                </button>
                <button
                  onClick={signIn}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs transition-all active:scale-95 shadow-sm cursor-pointer"
                >
                  <LogIn size={14} />
                  <span>Sign in with Google</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-6 sm:p-8 mb-8 shadow-sm">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-neutral-900 border border-blue-200 dark:border-neutral-800 text-blue-600 dark:text-blue-400 text-xs font-black tracking-wide uppercase mb-3">
              <Sparkles size={14} />
              <span>3-Year Practical-First Training System</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-black dark:text-white tracking-tight mb-3">
              BCA Practical Learning Portal
            </h1>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed mb-6 font-normal">
              Structured daily hands-on training to turn everyday BCA students into job-ready software developers.
              Follow the proven pipeline: <strong className="text-black dark:text-white">Foundation ➔ Specialization ➔ Projects ➔ GitHub ➔ Portfolio ➔ Job Preparation</strong>.
            </p>

            {/* Pipeline Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-2 pb-4 text-xs font-bold text-center">
              <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl p-2.5">
                <span className="text-blue-600 dark:text-blue-400 block mb-0.5">Step 1</span>
                <span className="text-black dark:text-white">🧱 Foundation</span>
              </div>
              <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl p-2.5">
                <span className="text-blue-600 dark:text-blue-400 block mb-0.5">Step 2</span>
                <span className="text-black dark:text-white">🎯 Specialization</span>
              </div>
              <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl p-2.5">
                <span className="text-blue-600 dark:text-blue-400 block mb-0.5">Step 3</span>
                <span className="text-black dark:text-white">🚀 Real Projects</span>
              </div>
              <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl p-2.5">
                <span className="text-blue-600 dark:text-blue-400 block mb-0.5">Step 4</span>
                <span className="text-black dark:text-white">🐙 GitHub Proof</span>
              </div>
              <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl p-2.5">
                <span className="text-blue-600 dark:text-blue-400 block mb-0.5">Step 5</span>
                <span className="text-black dark:text-white">🌐 Live Portfolio</span>
              </div>
              <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl p-2.5">
                <span className="text-blue-600 dark:text-blue-400 block mb-0.5">Step 6</span>
                <span className="text-black dark:text-white">💼 Job Readiness</span>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Class Model</div>
                  <div className="text-sm font-extrabold text-black dark:text-white flex items-center gap-1.5 mt-0.5">
                    <Clock size={14} className="text-blue-600 dark:text-blue-400" />
                    <span>2 Hours Practical / Day</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Progression Rule</div>
                  <div className="text-sm font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 mt-0.5">
                    <GitBranch size={14} />
                    <span>Sequential + GitHub Verified</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                  Sprint 1 Progress: <span className="text-black dark:text-white font-extrabold">{completedDays.length} / {PRACTICAL_LESSONS.length}</span> ({completionPercentage}%)
                </span>
                <div className="w-24 sm:w-32 h-2.5 bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden border border-slate-200 dark:border-neutral-800">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-500" 
                    style={{ width: `${completionPercentage}%` }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured .NET Practical Portal Banner */}
        <div className="rounded-2xl p-4 sm:p-5 mb-8 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 border-2 border-blue-600/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
              🟣
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-full mb-1">
                ⭐ New Specialization Portal
              </div>
              <h3 className="text-sm sm:text-base font-black text-black dark:text-white">
                .NET 9 &amp; C# Enterprise Practical Portal
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                50-day job-oriented bootcamp: C# 12, Entity Framework Core 9, Minimal APIs, Blazor, Docker &amp; Azure Cloud.
              </p>
            </div>
          </div>
          <Link
            href="/practical/dotnet"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition-all shadow-md active:scale-95 shrink-0"
          >
            <span>Open .NET Portal</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 4 Career Specialization Tracks */}
        <section className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-black dark:text-white flex items-center gap-2">
                <span>🎯 4 Career Specialization Tracks</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
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
                    ? "bg-blue-50/50 dark:bg-neutral-900 border-blue-600 ring-2 ring-blue-600/20 shadow-md" 
                    : "bg-white dark:bg-neutral-950 hover:bg-slate-50 dark:hover:bg-neutral-900 border-slate-200 dark:border-neutral-800"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{track.icon}</span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-neutral-700">
                      {track.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-black dark:text-white mb-1.5 leading-snug">
                    {track.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-3 leading-relaxed">
                    {track.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-neutral-800 mt-2">
                  <div className="text-[11px] font-bold text-slate-500 mb-1">Target Roles:</div>
                  <div className="flex flex-wrap gap-1">
                    {track.targetRoles.slice(0, 2).map((role, idx) => (
                      <span key={idx} className="text-[10px] font-semibold bg-slate-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-neutral-700">
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
              <h2 className="text-lg sm:text-xl font-black text-black dark:text-white flex items-center gap-2">
                <span>🗓️ 3-Year / 6-Semester Practical Progression</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                A seamless curriculum from Day 1 setup to Semester 6 production deployment.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
            {PRACTICAL_SEMESTERS.map((sem) => (
              <button
                key={sem.semNumber}
                onClick={() => {
                  setSelectedSemester(sem.semNumber);
                  setSprintViewFilter(sem.semNumber);
                }}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  selectedSemester === sem.semNumber
                    ? "bg-blue-50 dark:bg-neutral-900 border-blue-600 text-blue-600 dark:text-blue-400 font-black shadow-sm"
                    : "bg-white dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
                }`}
              >
                <div className="text-[11px] text-slate-500 uppercase tracking-wider font-extrabold">Year {sem.year}</div>
                <div className="text-xs font-black mt-0.5">Sem {sem.semNumber}</div>
              </button>
            ))}
          </div>

          {/* Active Semester Details Box */}
          {(() => {
            const activeSem = PRACTICAL_SEMESTERS.find(s => s.semNumber === selectedSemester) || PRACTICAL_SEMESTERS[0];
            return (
              <div className="rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-5 sm:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h3 className="text-base font-extrabold text-black dark:text-white flex items-center gap-2">
                    <span className="text-blue-600 dark:text-blue-400">⚡</span>
                    <span>{activeSem.title}</span>
                  </h3>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-neutral-900 px-2.5 py-1 rounded-full border border-blue-200 dark:border-neutral-800 w-fit">
                    Year {activeSem.year} Focus
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  {activeSem.focus}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-200 dark:border-neutral-800">
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">Core Theory &amp; Lab Subjects:</h4>
                    <ul className="space-y-1.5 text-xs text-slate-800 dark:text-slate-200">
                      {activeSem.coreSubjects.map((sub, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">Practical Lab Milestones:</h4>
                    <ul className="space-y-1.5 text-xs text-slate-800 dark:text-slate-200">
                      {activeSem.practicalHighlights.map((hl, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-blue-600 dark:text-blue-400 font-bold">✔</span>
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

        {/* 3-Year Practical Sprints (12 Sprints • 360 Days) */}
        <section className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-black dark:text-white flex items-center gap-2">
                <span>⚡ 3-Year Practical Sprints (12 Sprints • 360 Days)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Two intensive 30-day coding sprints per semester to build real developer muscle memory.
              </p>
            </div>

            {/* Sprint Semester Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
              {[1, 2, 3, 4, 5, 6].map((sem) => (
                <button
                  key={sem}
                  type="button"
                  onClick={() => setSprintViewFilter(sem)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    sprintViewFilter === sem
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Sem {sem}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setSprintViewFilter("all")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  sprintViewFilter === "all"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                All 12 Sprints
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(sprintViewFilter === "all"
              ? PRACTICAL_SPRINTS
              : PRACTICAL_SPRINTS.filter(s => s.semester === sprintViewFilter)
            ).map((sprint) => (
              <div key={sprint.sprintNumber} className="rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-5 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400">{sprint.daysRange}</span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-neutral-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-neutral-800">
                      {sprint.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-black dark:text-white mb-2">{sprint.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{sprint.description}</p>
                </div>
                <div className="pt-3 border-t border-slate-200 dark:border-neutral-800 text-xs">
                  <span className="text-slate-500 font-bold block mb-0.5">Milestone Project:</span>
                  <span className="text-blue-600 dark:text-blue-400 font-extrabold">{sprint.milestoneProject}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Daily Practical Lessons Grid (Days 1–10) with Sequential Lock Enforcement */}
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-black dark:text-white flex items-center gap-2">
                <span>📚 Daily Practical Lessons (Sequential + GitHub Required)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                You must complete each day and verify its GitHub commit before unlocking the next practical lesson.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="inline-flex flex-wrap rounded-xl bg-slate-100 dark:bg-neutral-900 p-1 border border-slate-200 dark:border-neutral-800 text-xs font-bold gap-1 self-start sm:self-auto">
              <button 
                onClick={() => setDayFilter("all")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${dayFilter === "all" ? "bg-white dark:bg-black text-black dark:text-white border border-slate-200 dark:border-neutral-700 shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"}`}
              >
                All Live Days (1–50)
              </button>
              <button 
                onClick={() => setDayFilter("1-10")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${dayFilter === "1-10" ? "bg-white dark:bg-black text-black dark:text-white border border-slate-200 dark:border-neutral-700 shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"}`}
              >
                Days 1–10 (HTML)
              </button>
              <button 
                onClick={() => setDayFilter("11-20")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${dayFilter === "11-20" ? "bg-white dark:bg-black text-black dark:text-white border border-slate-200 dark:border-neutral-700 shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"}`}
              >
                Days 11–20 (CSS &amp; Grid)
              </button>
              <button 
                onClick={() => setDayFilter("21-30")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${dayFilter === "21-30" ? "bg-white dark:bg-black text-black dark:text-white border border-slate-200 dark:border-neutral-700 shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"}`}
              >
                Days 21–30 (JS Core)
              </button>
              <button 
                onClick={() => setDayFilter("31-40")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${dayFilter === "31-40" ? "bg-white dark:bg-black text-black dark:text-white border border-slate-200 dark:border-neutral-700 shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"}`}
              >
                Days 31–40 (DOM &amp; Events)
              </button>
              <button 
                onClick={() => setDayFilter("41-50")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${dayFilter === "41-50" ? "bg-white dark:bg-black text-black dark:text-white border border-slate-200 dark:border-neutral-700 shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"}`}
              >
                Days 41–50 (APIs &amp; SPA)
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
                      ? "bg-white dark:bg-neutral-950 border-blue-600/60 shadow-sm ring-1 ring-blue-600/30" 
                      : isUnlocked
                        ? "bg-white dark:bg-neutral-950 hover:border-blue-600 border-slate-200 dark:border-neutral-800 shadow-sm"
                        : "bg-slate-50 dark:bg-neutral-950/60 border-slate-200 dark:border-neutral-900 opacity-70"
                  }`}
                >
                  <div>
                    {/* Top Row Badges */}
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-black px-2.5 py-0.5 rounded-lg ${
                          isDone 
                            ? "bg-blue-50 dark:bg-neutral-900 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-800"
                            : isUnlocked
                              ? "bg-slate-100 dark:bg-neutral-900 text-black dark:text-white border border-slate-200 dark:border-neutral-800"
                              : "bg-slate-100 dark:bg-neutral-900 text-slate-500 border border-slate-200 dark:border-neutral-800"
                        }`}>
                          Day {lesson.day}
                        </span>
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                          {lesson.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Clock size={11} />
                          {lesson.estimatedTime}
                        </span>
                        {isDone ? (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-50 dark:bg-neutral-900 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-800 flex items-center gap-1">
                            <CheckCircle2 size={11} /> GitHub Verified
                          </span>
                        ) : !isUnlocked ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-neutral-900 text-slate-500 border border-slate-200 dark:border-neutral-800 flex items-center gap-1">
                            <Lock size={11} /> Locked
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-neutral-900 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-800 flex items-center gap-1">
                            ⚡ Active
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className={`text-base font-black mb-2 leading-snug ${isUnlocked ? "text-black dark:text-white" : "text-slate-500"}`}>
                      {lesson.title}
                    </h3>

                    {/* Objectives Checklist Preview */}
                    <div className="space-y-1 mb-4">
                      {lesson.objectives.slice(0, 2).map((obj, i) => (
                        <div key={i} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                          <span className={`${isUnlocked ? "text-blue-600 dark:text-blue-400" : "text-slate-400"} shrink-0 mt-0.5 font-bold`}>❯</span>
                          <span className="line-clamp-1">{obj}</span>
                        </div>
                      ))}
                    </div>

                    {/* Submitted GitHub Link (if done) */}
                    {isDone && submittedGhUrl && (
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-blue-200 dark:border-neutral-800 mb-3 text-[11px] font-mono text-blue-600 dark:text-blue-400 flex items-center gap-1.5 truncate">
                        <GitBranch size={12} className="shrink-0" />
                        <span className="truncate">{submittedGhUrl}</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Button */}
                  <div className="pt-3 border-t border-slate-200 dark:border-neutral-800 flex items-center justify-between mt-2">
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <GitBranch size={13} />
                      <span>{lesson.githubWorkflow.repoName}</span>
                    </span>

                    {isUnlocked ? (
                      <Link
                        href={`/bca/practical/${lesson.slug}`}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all active:scale-95 ${
                          isDone
                            ? "bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-black dark:text-white border border-slate-200 dark:border-neutral-800"
                            : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                        }`}
                      >
                        <span>{isDone ? "Review Practical" : !user ? "Sign In to Access" : "Start Practical"}</span>
                        {!user && !isDone ? <LogIn size={13} /> : <ArrowRight size={13} />}
                      </Link>
                    ) : (
                      <button
                        onClick={() => setLockedModalDay(lesson.day)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-500 hover:text-black dark:hover:text-white transition-all cursor-pointer"
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

          {/* 360-Day Degree Progression Card: Days 51–360 */}
          <div className="mt-8 rounded-2xl bg-gradient-to-r from-blue-500/5 via-emerald-500/5 to-blue-500/5 border border-slate-200 dark:border-neutral-800 p-5 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                  <Sparkles size={13} />
                  <span>3-YEAR / 6-SEMESTER DEGREE PROGRESSION (360 DAYS)</span>
                </div>
                <h3 className="text-base font-black text-black dark:text-white mt-1">
                  Full 360-Day Curriculum Roadmap
                </h3>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 w-fit">
                Days 1–50 Live Now • Sprints 1–12 Mapped
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-1">
                <div className="flex items-center justify-between font-extrabold text-emerald-600 dark:text-emerald-400">
                  <span>Year 1 • Sem 1</span>
                  <span>Days 1–60</span>
                </div>
                <div className="font-bold text-black dark:text-white">Web Foundation, CSS &amp; JavaScript</div>
                <p className="text-slate-500 text-[11px] leading-relaxed">Days 1–50 active with VS Code labs, auto-validators, Git commits &amp; viva checks.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-1">
                <div className="flex items-center justify-between font-extrabold text-blue-600 dark:text-blue-400">
                  <span>Year 1 • Sem 2</span>
                  <span>Days 61–120</span>
                </div>
                <div className="font-bold text-black dark:text-white">C Programming &amp; DOM/SQL Sandbox</div>
                <p className="text-slate-500 text-[11px] leading-relaxed">Sprints 3 &amp; 4: Pointers, memory allocation, structs &amp; terminal student record apps.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-1">
                <div className="flex items-center justify-between font-extrabold text-purple-600 dark:text-purple-400">
                  <span>Year 2 • Sem 3</span>
                  <span>Days 121–180</span>
                </div>
                <div className="font-bold text-black dark:text-white">Data Structures &amp; Relational DBMS</div>
                <p className="text-slate-500 text-[11px] leading-relaxed">Sprints 5 &amp; 6: Linked lists, stacks, queues, trees, joins &amp; PostgreSQL architecture.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-1">
                <div className="flex items-center justify-between font-extrabold text-amber-600 dark:text-amber-400">
                  <span>Year 2 • Sem 4</span>
                  <span>Days 181–240</span>
                </div>
                <div className="font-bold text-black dark:text-white">Java OOP &amp; Backend REST APIs</div>
                <p className="text-slate-500 text-[11px] leading-relaxed">Sprints 7 &amp; 8: Classes, polymorphism, Node.js Express servers, JWT &amp; Linux shell.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-1">
                <div className="flex items-center justify-between font-extrabold text-indigo-600 dark:text-indigo-400">
                  <span>Year 3 • Sem 5</span>
                  <span>Days 241–300</span>
                </div>
                <div className="font-bold text-black dark:text-white">Track Specialization &amp; DevOps</div>
                <p className="text-slate-500 text-[11px] leading-relaxed">Sprints 9 &amp; 10: Deep-dive career tracks (React/Next.js, Python AI, Docker CI/CD).</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-1">
                <div className="flex items-center justify-between font-extrabold text-rose-600 dark:text-rose-400">
                  <span>Year 3 • Sem 6</span>
                  <span>Days 301–360</span>
                </div>
                <div className="font-bold text-black dark:text-white">Major Capstone &amp; Job Readiness</div>
                <p className="text-slate-500 text-[11px] leading-relaxed">Sprints 11 &amp; 12: Production app deployment, portfolio defense, resume &amp; mock viva.</p>
              </div>
            </div>
          </div>
        </section>

        {/* BCA Peer Network & Coder Directory (Social Follower System) */}
        <StudentPeerNetwork />

        {/* GitHub Workflow Requirement Banner */}
        <section className="rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-600 dark:text-blue-400">
                <GitBranch size={14} />
                <span>MANDATORY GITHUB PRACTICE FROM SEMESTER 1</span>
              </div>
              <h3 className="text-base font-black text-black dark:text-white">
                Individual Project Repositories &amp; Real Git Commits
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                Do NOT dump every assignment into one giant repository. Maintain clean, dedicated repos for 
                <code className="text-blue-600 dark:text-blue-400 mx-1">html-css-projects</code>, 
                <code className="text-blue-600 dark:text-blue-400 mx-1">javascript-projects</code>, and your 
                <code className="text-blue-600 dark:text-blue-400 mx-1">major-project</code>.
                Every practical session follows the standard workflow: <span className="text-black dark:text-white font-mono font-bold">Code ➔ Test ➔ Git Add ➔ Commit ➔ Push</span>.
              </p>
            </div>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black hover:bg-neutral-900 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-black font-extrabold text-xs shrink-0 transition-all active:scale-95 shadow-sm"
            >
              <span>Visit GitHub</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </section>

        {/* Locked Modal Notice */}
        {lockedModalDay && (
          <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-black dark:text-white">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-neutral-900 border border-blue-200 dark:border-neutral-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                <Lock size={24} />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-black text-black dark:text-white">Day {lockedModalDay} is Locked</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  To maintain strict practical mastery, you must complete <strong className="text-black dark:text-white">Day {lockedModalDay - 1}</strong>, pass all coding tasks, and verify your commit on GitHub before moving forward.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setLockedModalDay(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer"
                >
                  Close
                </button>
                <Link
                  href={`/bca/practical/${PRACTICAL_LESSONS.find(l => l.day === lockedModalDay - 1)?.slug || "day-1-html-setup-first-webpage"}`}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-sm"
                >
                  Go to Day {lockedModalDay - 1} 🚀
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Author Attribution Banner */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>Curriculum &amp; Practical Systems Authored by <strong className="text-black dark:text-white font-bold">Er. Manoj Kumar</strong></span>
          </div>
          <div className="text-slate-500 font-mono text-[11px]">
            NextSem Academy • BCA Practical Learning Portal
          </div>
        </div>
      </main>
    </div>
  );
}
