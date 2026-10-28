"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, CheckCircle2, Circle, ArrowRight, BookOpen, 
  Code2, GitBranch, Layers, Trophy, Laptop, Globe, Cpu, Database, 
  ExternalLink, Calendar, Filter, Clock, Star, ShieldCheck, ChevronRight,
  Lock, LogIn, LogOut, UserCheck, Terminal, Cloud, Server
} from "lucide-react";
import BcaHeaderNav from "@/components/bca/BcaHeaderNav";
import { 
  DOTNET_SPRINTS, DOTNET_LESSONS, DotnetSprint, DotnetLesson, getNextDotnetDayUrl 
} from "@/data/dotnetPracticalData";
import { useStudentProgress } from "@/context/StudentProgressContext";

export default function DotnetPracticalHubClient() {
  const { 
    user, 
    completedDays, 
    isCloudSynced, 
    signIn, 
    signInAsGuest,
    signOut, 
    openProfileDashboard,
    isDayCompleted, 
    isDayUnlocked 
  } = useStudentProgress();

  const [activeSprintFilter, setActiveSprintFilter] = useState<number | "all">("all");
  const [dayRangeFilter, setDayRangeFilter] = useState<"all" | "1-10" | "11-20" | "21-30" | "31-40" | "41-50">("all");
  const [lockedModalDay, setLockedModalDay] = useState<number | null>(null);

  const filteredLessons = DOTNET_LESSONS.filter((lesson) => {
    if (activeSprintFilter !== "all" && lesson.sprint !== activeSprintFilter) {
      return false;
    }
    if (dayRangeFilter === "1-10") return lesson.day <= 10;
    if (dayRangeFilter === "11-20") return lesson.day > 10 && lesson.day <= 20;
    if (dayRangeFilter === "21-30") return lesson.day > 20 && lesson.day <= 30;
    if (dayRangeFilter === "31-40") return lesson.day > 30 && lesson.day <= 40;
    if (dayRangeFilter === "41-50") return lesson.day > 40 && lesson.day <= 50;
    return true;
  });

  const completionPercentage = Math.round((completedDays.length / 50) * 100);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col font-sans pb-24 transition-colors">
      {/* Top Header Nav */}
      <BcaHeaderNav currentSubjectCode=".NET Enterprise" currentSubjectName="C# & Cloud Practical Portal" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 w-full flex-1">
        {/* Breadcrumb Navigation Trail */}
        <nav aria-label="Breadcrumbs" className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-bold py-1 mb-6">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
            <span>🏠 Home</span>
          </Link>
          <span className="text-slate-400 dark:text-slate-600 font-bold">❯</span>
          <Link href="/bca/practical" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Practical Portals
          </Link>
          <span className="text-slate-400 dark:text-slate-600 font-bold">❯</span>
          <span className="text-blue-600 dark:text-blue-400 font-bold">
            🟣 .NET &amp; C# Enterprise Hub
          </span>
        </nav>

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
                      💾 Saved Locally
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">{user.email}</div>
                <div className="text-[11px] text-blue-600 dark:text-blue-400 font-bold mt-0.5">
                  Completed: <span className="text-black dark:text-white font-extrabold">{completedDays.length} / 50 Days</span> • Track: <span className="text-black dark:text-white uppercase font-extrabold">.NET Enterprise Full Stack</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-neutral-900 border border-blue-200 dark:border-neutral-800 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
                <UserCheck size={20} />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold text-black dark:text-white">.NET Student Progress &amp; GitHub Sync</h3>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">
                  Sign in with Google so your instructor can verify your C# labs, EF Core migrations, and pushed GitHub repos.
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
              <span>50-Day Job-Oriented Enterprise Bootcamp</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-black dark:text-white tracking-tight mb-3">
              .NET Practical Learning Portal
            </h1>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed mb-6 font-normal">
              Structured daily hands-on training to build enterprise backend, web APIs, and cloud microservices using <strong className="text-black dark:text-white">C# 12, .NET 9, Entity Framework Core, Blazor, Docker &amp; Azure</strong>.
            </p>

            {/* 6-Step Pipeline Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-2 pb-4 text-xs font-bold text-center">
              <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl p-2.5">
                <span className="text-blue-600 dark:text-blue-400 block mb-0.5">Step 1</span>
                <span className="text-black dark:text-white">🧱 C# 12 Core</span>
              </div>
              <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl p-2.5">
                <span className="text-blue-600 dark:text-blue-400 block mb-0.5">Step 2</span>
                <span className="text-black dark:text-white">🗄️ EF Core 9</span>
              </div>
              <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl p-2.5">
                <span className="text-blue-600 dark:text-blue-400 block mb-0.5">Step 3</span>
                <span className="text-black dark:text-white">🚀 Web APIs</span>
              </div>
              <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl p-2.5">
                <span className="text-blue-600 dark:text-blue-400 block mb-0.5">Step 4</span>
                <span className="text-black dark:text-white">💻 Blazor WASM</span>
              </div>
              <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl p-2.5">
                <span className="text-blue-600 dark:text-blue-400 block mb-0.5">Step 5</span>
                <span className="text-black dark:text-white">🐙 GitHub Proof</span>
              </div>
              <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl p-2.5">
                <span className="text-blue-600 dark:text-blue-400 block mb-0.5">Step 6</span>
                <span className="text-black dark:text-white">☁️ Azure Cloud</span>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Class Model</div>
                  <div className="text-sm font-extrabold text-black dark:text-white flex items-center gap-1.5 mt-0.5">
                    <Clock size={14} className="text-blue-600 dark:text-blue-400" />
                    <span>2 Hours Lab / Day</span>
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
                  Bootcamp Progress: <span className="text-black dark:text-white font-extrabold">{completedDays.length} / 50</span> ({completionPercentage}%)
                </span>
                <div className="w-24 sm:w-32 h-2.5 bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden border border-slate-200 dark:border-neutral-800">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-500" 
                    style={{ width: `${Math.min(100, completionPercentage)}%` }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5 ENTERPRISE SPRINTS SHOWCASE ── */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-black text-black dark:text-white flex items-center gap-2">
                <span>🎯</span>
                <span>The 5 Enterprise Sprints (50 Days)</span>
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Click any sprint below to filter the daily coding challenges.
              </p>
            </div>
            {activeSprintFilter !== "all" && (
              <button
                onClick={() => setActiveSprintFilter("all")}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                Clear Sprint Filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DOTNET_SPRINTS.map((sprint) => {
              const sprintUrl = `/practical/dotnet/${sprint.startDaySlug}`;
              return (
                <Link
                  key={sprint.sprintNumber}
                  href={sprintUrl}
                  title={`Click to open ${sprint.title} (${sprint.daysRange})`}
                  className="group rounded-2xl p-4 sm:p-5 border transition-all cursor-pointer relative overflow-hidden bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 hover:border-blue-600 hover:shadow-lg dark:hover:border-blue-500 hover:scale-[1.01] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xl group-hover:scale-110 transition-transform">{sprint.icon}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300">
                          {sprint.daysRange}
                        </span>
                        <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRight size={11} />
                        </span>
                      </div>
                    </div>

                    <h3 className="text-sm font-extrabold text-black dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {sprint.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
                      {sprint.focus}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/60 dark:border-neutral-800/60">
                      {sprint.coreSkills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white dark:bg-neutral-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-neutral-800">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Direct Link Action Bar */}
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-200/80 dark:border-neutral-800/80 text-xs font-bold text-blue-600 dark:text-blue-400">
                    <span className="flex items-center gap-1">
                      <span>Start Sprint {sprint.sprintNumber}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 group-hover:underline">
                      <span>Open Lab</span>
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── DAILY CODING LABS LIST ── */}
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-slate-200 dark:border-neutral-800">
            <div>
              <h2 className="text-lg font-black text-black dark:text-white flex items-center gap-2">
                <span>💻</span>
                <span>Daily Guided Coding Labs</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                  {filteredLessons.length} Days Showing
                </span>
              </h2>
            </div>

            {/* Day Range Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-500 font-bold mr-1 shrink-0">Range:</span>
              {(["all", "1-10", "11-20", "21-30", "31-40", "41-50"] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setDayRangeFilter(range)}
                  className={`px-2.5 py-1 rounded-lg font-bold shrink-0 cursor-pointer transition-all ${
                    dayRangeFilter === range
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-neutral-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-neutral-800"
                  }`}
                >
                  {range === "all" ? "All" : `Days ${range}`}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLessons.map((lesson) => {
              const isCompleted = isDayCompleted(lesson.day);
              const isUnlocked = isDayUnlocked(lesson.day) || lesson.day === 1;

              return (
                <div
                  key={lesson.id}
                  className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                    isCompleted
                      ? "bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-300 dark:border-emerald-800/40"
                      : isUnlocked
                      ? "bg-white dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 hover:border-blue-500 hover:shadow-md"
                      : "bg-slate-50 dark:bg-neutral-950/40 border-slate-200 dark:border-neutral-900 opacity-80"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60 font-mono">
                          Day {lesson.day < 10 ? `0${lesson.day}` : lesson.day}
                        </span>
                        <span className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400">
                          {lesson.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                          <Clock size={11} />
                          {lesson.estimatedTime}
                        </span>
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                            <CheckCircle2 size={12} />
                            Verified
                          </span>
                        ) : isUnlocked ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-full">
                            <Circle size={12} />
                            Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-neutral-900 px-2 py-0.5 rounded-full">
                            <Lock size={11} />
                            Locked
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-base font-extrabold text-black dark:text-white mb-2 leading-snug">
                      {lesson.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                      {lesson.concept.overview}
                    </p>

                    <div className="space-y-1 mb-4">
                      {lesson.objectives.slice(0, 2).map((obj, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 size={13} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{obj}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-neutral-900 flex items-center justify-between gap-3">
                    <span className="text-[11px] font-semibold text-slate-500">
                      VS Code Lab: <code className="text-blue-600 dark:text-blue-400 font-mono font-bold">{lesson.practicalLab.targetFolder}</code>
                    </span>

                    {isUnlocked ? (
                      <Link
                        href={`/practical/dotnet/${lesson.slug}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all active:scale-95 shadow-sm"
                      >
                        <span>{isCompleted ? "Review Lab" : "Start Lab"}</span>
                        <ArrowRight size={13} />
                      </Link>
                    ) : (
                      <button
                        onClick={() => setLockedModalDay(lesson.day)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-neutral-900 hover:bg-slate-200 dark:hover:bg-neutral-800 text-slate-600 dark:text-slate-400 text-xs font-bold transition-all cursor-pointer"
                      >
                        <Lock size={12} />
                        <span>Prerequisite Locked</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── ENTERPRISE ARCHITECTURE ROADMAP ── */}
        <section className="rounded-3xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-6 sm:p-8 text-center mb-10">
          <h2 className="text-xl sm:text-2xl font-black text-black dark:text-white mb-2">
            Enterprise Career Readiness Guaranteed
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-6">
            Completing this 50-day roadmap positions you for high-paying roles as a <strong className="text-black dark:text-white">.NET Backend Engineer, Full-Stack .NET Developer, or Cloud Microservices Architect</strong>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={getNextDotnetDayUrl(completedDays)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm transition-all shadow-md active:scale-95"
            >
              <Sparkles size={16} />
              <span>Continue Day {completedDays.length + 1} Lab</span>
            </Link>
            <Link
              href="/bca/practical"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-black dark:text-white font-bold text-sm hover:border-slate-300 dark:hover:border-neutral-700 transition-all"
            >
              <span>Explore All Tracks</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </main>

      {/* Locked Modal Dialog */}
      {lockedModalDay && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-slate-200 dark:border-neutral-800 max-w-md w-full p-6 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
              <Lock size={24} />
            </div>
            <h3 className="text-lg font-black text-black dark:text-white mb-2">
              Day {lockedModalDay} is Locked
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              To guarantee real enterprise competency, practical days unlock sequentially. Please complete <strong className="text-black dark:text-white">Day {lockedModalDay - 1}</strong> by answering the Technical Viva check and submitting your pushed GitHub repository URL.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setLockedModalDay(null)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
