"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { 
  Home, ChevronDown, BookOpen, X, Sparkles, GraduationCap, 
  CheckCircle2, Search, Building2, LogIn, LogOut, Sun, Moon,
  Code2, Lock, ArrowRight
} from 'lucide-react';
import { bcaSemesters, BcaSemester, BcaSubject } from '@/data/bcaCoursesData';
import { duCsSemesters, ignouMcaSemesters, UniversitySemester, UniversitySubject } from '@/data/universityCoursesData';
import { 
  PRACTICAL_LESSONS, 
  PRACTICAL_SPRINTS, 
  CAREER_TRACKS 
} from '@/data/bcaPracticalData';
import { useStudentProgress } from '@/context/StudentProgressContext';

interface BcaHeaderNavProps {
  currentSubjectCode?: string;
  currentSubjectName?: string;
  points?: number;
}

export default function BcaHeaderNav({
  currentSubjectCode = "BCA Practical",
  currentSubjectName = "Job-Oriented Training Portal",
  points = 0
}: BcaHeaderNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalUniversityTab, setModalUniversityTab] = useState<'practical' | 'bca' | 'du' | 'mca'>('practical');
  const { 
    user, 
    completedDays, 
    isDayCompleted, 
    isDayUnlocked, 
    signIn, 
    signInAsGuest, 
    signOut, 
    openProfileDashboard,
    openAuthModal 
  } = useStudentProgress();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (pathname?.includes('/practical') || currentSubjectCode?.toLowerCase().includes('day')) {
      setModalUniversityTab('practical');
    }
  }, [pathname, currentSubjectCode]);

  const currentTheme = resolvedTheme || theme;
  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <header className="h-16 border-b border-slate-200 dark:border-neutral-800 bg-white/95 dark:bg-black/95 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6 select-none shadow-sm gap-2">
        {/* Left: Always Visible Home Link & Practical Portal */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-700 hover:text-black dark:text-slate-300 dark:hover:text-white font-black text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 px-3.5 py-2 rounded-xl transition-all active:scale-95 shrink-0"
          >
            <Home size={15} className="text-blue-600 dark:text-blue-400" />
            <span className="hidden sm:inline">Home</span>
          </Link>

          <Link
            href="/bca/practical"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-sm transition-all active:scale-95 shrink-0"
            title="BCA Practical Learning Portal"
          >
            <Sparkles size={14} />
            <span>Practical Portal</span>
          </Link>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-global-search"))}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-slate-700 hover:text-black dark:text-slate-300 dark:hover:text-white font-bold text-xs shadow-sm transition-all active:scale-95 cursor-pointer"
            title="Universal Search (Ctrl+K)"
          >
            <Search size={14} className="text-blue-600 dark:text-blue-400" />
            <span>Search</span>
            <kbd className="hidden lg:inline text-[9px] bg-slate-200 dark:bg-neutral-800 px-1 py-0.5 rounded border border-slate-300 dark:border-neutral-700 text-slate-600 dark:text-slate-400">Ctrl K</kbd>
          </button>
        </div>

        {/* Center: Subject Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-black dark:text-white font-extrabold text-xs sm:text-sm shadow-sm transition-all active:scale-95 max-w-[220px] sm:max-w-xs truncate cursor-pointer"
          >
            <BookOpen size={15} className="text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="truncate">
              {currentSubjectCode}: {currentSubjectName}
            </span>
            <ChevronDown size={14} className={`text-slate-500 shrink-0 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Right: Theme Toggle + Auth Status + Logo Badge */}
        <div className="flex items-center gap-2">
          {/* Light / Dark Mode Toggle */}
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

          {user ? (
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-1 pl-1.5 rounded-xl">
              <button
                onClick={openProfileDashboard}
                className="flex items-center gap-2 hover:opacity-85 transition-all cursor-pointer group text-left"
                title="Click photo to open your Student Learning Dashboard"
              >
                {user.isGuest ? (
                  <div className="w-6 h-6 rounded-lg bg-slate-500 text-white flex items-center justify-center font-black text-[10px] shadow-sm">
                    G
                  </div>
                ) : user.photo ? (
                  <img src={user.photo} alt={user.name} loading="eager" decoding="async" className="w-6 h-6 rounded-lg object-cover border border-blue-500/50 shadow-sm" />
                ) : (
                  <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shadow-sm">
                    {user.name.charAt(0)}
                  </div>
                )}
                <span className="text-xs font-black text-black dark:text-white hidden md:inline max-w-[85px] truncate">
                  {user.isGuest ? "Guest" : user.name.split(" ")[0]}
                </span>
              </button>

              <button
                onClick={openProfileDashboard}
                className="p-1 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-white dark:hover:bg-black transition-all cursor-pointer"
                title="Open Student Dashboard"
              >
                <Sparkles size={13} />
              </button>

              <button 
                onClick={signOut}
                className="text-slate-400 hover:text-black dark:text-slate-400 dark:hover:text-white p-1 rounded-lg hover:bg-white dark:hover:bg-black transition-colors cursor-pointer"
                title={user.isGuest ? "Exit Guest Mode" : "Sign Out"}
              >
                <LogOut size={13} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => signInAsGuest()}
                className="hidden sm:flex items-center px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-black dark:text-white font-bold text-xs transition-all active:scale-95 cursor-pointer"
                title="Practice as Guest without sign-in"
              >
                <span>Guest</span>
              </button>
              <button
                onClick={openAuthModal}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs transition-all active:scale-95 shadow-sm cursor-pointer"
              >
                <LogIn size={13} />
                <span>Sign In</span>
              </button>
            </div>
          )}

          <Link
            href="/"
            className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-black dark:text-white text-xs font-black shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center font-mono font-black text-white text-xs shrink-0">
              &lt;/&gt;
            </div>
            <div className="flex flex-col leading-none text-left hidden sm:flex">
              <span className="font-black text-xs tracking-tight text-black dark:text-white uppercase">
                BCA Lab
              </span>
              <span className="text-[8px] font-mono text-blue-600 dark:text-blue-400 font-bold tracking-tight">
                by NextSem
              </span>
            </div>
          </Link>
        </div>
      </header>

      {/* ── Slide-Over / Modal Subject Switcher Menu ── */}
      {dropdownOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50 animate-in fade-in duration-200"
            onClick={() => setDropdownOpen(false)}
          />

          <div className="fixed top-16 right-4 left-4 sm:left-auto sm:right-8 sm:w-[480px] bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-3xl p-5 z-50 shadow-2xl animate-in zoom-in-95 duration-200 text-black dark:text-white space-y-4 max-h-[82vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-blue-600 dark:text-blue-400" />
                <h3 className="font-extrabold text-sm text-black dark:text-white">
                  {modalUniversityTab === 'practical' ? 'Switch Practical Day & Track' : 'Switch Curriculum & Subject'}
                </h3>
              </div>
              <button
                onClick={() => setDropdownOpen(false)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Curriculum Switcher inside Dropdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl">
              <button
                type="button"
                onClick={() => setModalUniversityTab('practical')}
                className={`py-2 px-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer truncate ${
                  modalUniversityTab === 'practical'
                    ? 'bg-blue-600 text-white shadow-sm font-black'
                    : 'text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <Code2 size={13} className="shrink-0" />
                <span className="truncate">Practical Lab</span>
              </button>

              <button
                type="button"
                onClick={() => setModalUniversityTab('bca')}
                className={`py-2 px-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer truncate ${
                  modalUniversityTab === 'bca'
                    ? 'bg-blue-600 text-white shadow-sm font-black'
                    : 'text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <GraduationCap size={13} className="shrink-0" />
                <span className="truncate">BCA Theory</span>
              </button>

              <button
                type="button"
                onClick={() => setModalUniversityTab('du')}
                className={`py-2 px-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer truncate ${
                  modalUniversityTab === 'du'
                    ? 'bg-blue-600 text-white shadow-sm font-black'
                    : 'text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <Building2 size={13} className="shrink-0" />
                <span className="truncate">DU CS</span>
              </button>

              <button
                type="button"
                onClick={() => setModalUniversityTab('mca')}
                className={`py-2 px-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer truncate ${
                  modalUniversityTab === 'mca'
                    ? 'bg-blue-600 text-white shadow-sm font-black'
                    : 'text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <Sparkles size={13} className="shrink-0" />
                <span className="truncate">MCA (PG)</span>
              </button>
            </div>

            {/* List all items for active tab */}
            <div className="space-y-4 pt-1">
              {modalUniversityTab === 'practical' ? (
                <>
                  {/* Practical Portal Quick Banner */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-600/10 via-blue-500/5 to-transparent border border-blue-200 dark:border-blue-900/50 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-black text-blue-600 dark:text-blue-400">
                        <Sparkles size={13} />
                        <span>3-Year / 360-Day Practical Coding Roadmap</span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                        {completedDays.length} of 10 Days Completed • Job-Oriented Training
                      </p>
                    </div>
                    <Link
                      href="/bca/practical"
                      onClick={() => setDropdownOpen(false)}
                      className="px-2.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[11px] flex items-center gap-1 shrink-0 transition-all active:scale-95 shadow-sm"
                    >
                      <span>Hub</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>

                  {/* Sprint 1: Days 1–10 Active Lessons */}
                  <div className="space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 flex items-center justify-between">
                      <span>YEAR 1 • SPRINT 1 (DAYS 1–30 • HTML &amp; CSS)</span>
                      <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        10 Active Lessons
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {PRACTICAL_LESSONS.map((pLesson) => {
                        const isCurrent = currentSubjectCode.toLowerCase().includes(`day ${pLesson.day}`) ||
                                          pathname?.includes(pLesson.slug);
                        const isCompleted = isDayCompleted(pLesson.day);
                        const isUnlocked = isDayUnlocked(pLesson.day);

                        return (
                          <button
                            key={pLesson.id}
                            onClick={() => {
                              setDropdownOpen(false);
                              router.push(`/bca/practical/${pLesson.slug}`);
                            }}
                            className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-3 text-xs font-bold cursor-pointer group ${
                              isCurrent
                                ? "bg-blue-50 dark:bg-neutral-900 border-blue-600 text-blue-600 dark:text-blue-400 shadow-sm"
                                : "bg-white hover:bg-slate-50 dark:bg-neutral-950 dark:hover:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-slate-800 dark:text-slate-200"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black tracking-wide shrink-0 ${
                                isCurrent
                                  ? "bg-blue-600 text-white"
                                  : isCompleted
                                  ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800"
                                  : "bg-slate-100 dark:bg-neutral-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-neutral-800"
                              }`}>
                                Day {pLesson.day}
                              </span>
                              <div className="min-w-0 truncate">
                                <span className="block truncate font-extrabold">{pLesson.title}</span>
                                <span className="block text-[10px] text-slate-500 truncate font-medium">
                                  {pLesson.category} • {pLesson.estimatedTime}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              {isCurrent ? (
                                <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-300 dark:border-blue-800 flex items-center gap-1">
                                  <CheckCircle2 size={11} /> Current
                                </span>
                              ) : isCompleted ? (
                                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                                  <CheckCircle2 size={11} /> Done
                                </span>
                              ) : isUnlocked ? (
                                <span className="text-[10px] font-bold text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                  Start ➔
                                </span>
                              ) : (
                                <span className="text-slate-400 text-[10px] flex items-center gap-1">
                                  <Lock size={11} />
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Upcoming Practical Sprints */}
                  <div className="space-y-2 pt-2">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center justify-between">
                      <span>UPCOMING PRACTICAL SPRINTS (ROADMAP)</span>
                      <span className="text-[9px] font-mono text-slate-400">360 Days Total</span>
                    </div>

                    <div className="space-y-1.5">
                      {PRACTICAL_SPRINTS.slice(1, 4).map((sprint) => (
                        <div
                          key={`sprint-${sprint.sprintNumber}`}
                          className="p-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900/40 border border-slate-200 dark:border-neutral-800/80 flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black text-slate-500 font-mono">
                                {sprint.daysRange}
                              </span>
                              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">
                                {sprint.title}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-500 block truncate mt-0.5">
                              {sprint.milestoneProject}
                            </span>
                          </div>
                          <span className="text-[9px] font-bold text-slate-400 bg-slate-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full shrink-0">
                            ⏳ Sprint {sprint.sprintNumber}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Career Specialization Tracks */}
                  <div className="space-y-2 pt-2">
                    <div className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 flex items-center justify-between">
                      <span>4 CAREER SPECIALIZATIONS</span>
                      <Link href="/bca/practical" onClick={() => setDropdownOpen(false)} className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline">
                        View All ➔
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {CAREER_TRACKS.map((track) => (
                        <Link
                          key={track.id}
                          href="/bca/practical"
                          onClick={() => setDropdownOpen(false)}
                          className="p-2.5 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 hover:border-blue-500/50 transition-all block group"
                        >
                          <div className="flex items-center gap-1.5 text-xs font-black text-black dark:text-white truncate">
                            <span>{track.icon}</span>
                            <span className="truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {track.title.split('—')[1] || track.title}
                            </span>
                          </div>
                          <span className="block text-[9px] text-slate-500 truncate mt-0.5 font-medium">
                            {track.targetRoles[0]}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : modalUniversityTab === 'bca' ? (
                /* BCA Subjects */
                bcaSemesters.map((sem) => (
                  <div key={`modal-bca-${sem.id}`} className="space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 flex items-center justify-between">
                      <span>BCA • {sem.name}</span>
                      <Link
                        href={`/bca`}
                        onClick={() => setDropdownOpen(false)}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        View All
                      </Link>
                    </div>

                    <div className="space-y-1">
                      {sem.subjects.map((sub) => {
                        const isCurrent = sub.code.toUpperCase() === currentSubjectCode.toUpperCase() || currentSubjectCode.includes(sub.code);
                        const isComputerBasics = sub.code === "BCS-111" || sub.code === "BCS-011";
                        const targetUrl = sem.id === 1
                          ? (isComputerBasics 
                              ? "/bca/semester-1/bcs-011-computer-basics" 
                              : sub.code === "BCS-012"
                              ? "/bca/semester-1/bcs-012-basic-mathematics"
                              : sub.code === "BCSL-013"
                              ? "/bca/semester-1/bcsl-013-software-lab"
                              : sub.code === "BEGLA-136"
                              ? "/bca/semester-1/begla-136-english"
                              : sub.code === "BEVAE-181"
                              ? "/bca/semester-1/bevae-181-environmental-studies"
                              : `/bca/semester-1/${sub.code.toLowerCase()}`)
                          : `/bca/${sem.id}/${sub.code.toLowerCase()}`;

                        return (
                          <button
                            key={sub.code}
                            onClick={() => {
                              setDropdownOpen(false);
                              router.push(targetUrl);
                            }}
                            className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 text-xs font-bold cursor-pointer ${
                              isCurrent
                                ? "bg-blue-50 dark:bg-neutral-900 border-blue-600 text-blue-600 dark:text-blue-400"
                                : "bg-white hover:bg-slate-50 dark:bg-neutral-950 dark:hover:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-slate-800 dark:text-slate-200"
                            }`}
                          >
                            <div className="min-w-0 truncate">
                              <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 mr-2 uppercase">{sub.code}</span>
                              <span className="truncate">{sub.name}</span>
                            </div>
                            {isCurrent && <CheckCircle2 size={14} className="text-blue-600 dark:text-blue-400 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : modalUniversityTab === 'du' ? (
                /* DU CS Subjects */
                duCsSemesters.map((sem: UniversitySemester) => (
                  <div key={`modal-du-${sem.id}`} className="space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 flex items-center justify-between">
                      <span>DU • {sem.name}</span>
                      <span className="text-slate-500 font-mono text-[9px]">UGCF 2022</span>
                    </div>

                    <div className="space-y-1">
                      {sem.subjects.map((sub: UniversitySubject) => {
                        const isCurrent = sub.code.toUpperCase() === currentSubjectCode.toUpperCase();
                        return (
                          <button
                            key={sub.code}
                            onClick={() => {
                              setDropdownOpen(false);
                              router.push(`/bca?uni=du`);
                            }}
                            className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 text-xs font-bold cursor-pointer ${
                              isCurrent
                                ? "bg-blue-50 dark:bg-neutral-900 border-blue-600 text-blue-600 dark:text-blue-400"
                                : "bg-white hover:bg-slate-50 dark:bg-neutral-950 dark:hover:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-slate-800 dark:text-slate-200"
                            }`}
                          >
                            <div className="min-w-0 truncate">
                              <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 mr-2 uppercase">{sub.code}</span>
                              <span className="truncate">{sub.name}</span>
                            </div>
                            {isCurrent && <CheckCircle2 size={14} className="text-blue-600 dark:text-blue-400 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                /* MCA Subjects */
                ignouMcaSemesters.map((sem: UniversitySemester) => (
                  <div key={`modal-mca-${sem.id}`} className="space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 flex items-center justify-between">
                      <span>MCA • {sem.name}</span>
                      <Link
                        href={`/bca?prog=ignou-mca`}
                        onClick={() => setDropdownOpen(false)}
                        className="text-blue-600 dark:text-blue-400 hover:underline text-[9px]"
                      >
                        View Full Syllabus
                      </Link>
                    </div>

                    <div className="space-y-1">
                      {sem.subjects.map((sub: UniversitySubject) => {
                        const isCurrent = sub.code.toUpperCase() === currentSubjectCode.toUpperCase();
                        return (
                          <button
                            key={sub.code}
                            onClick={() => {
                              setDropdownOpen(false);
                              router.push(`/bca?prog=ignou-mca`);
                            }}
                            className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 text-xs font-bold cursor-pointer ${
                              isCurrent
                                ? "bg-blue-50 dark:bg-neutral-900 border-blue-600 text-blue-600 dark:text-blue-400"
                                : "bg-white hover:bg-slate-50 dark:bg-neutral-950 dark:hover:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-slate-800 dark:text-slate-200"
                            }`}
                          >
                            <div className="min-w-0 truncate">
                              <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 mr-2 uppercase">{sub.code}</span>
                              <span className="truncate">{sub.name}</span>
                            </div>
                            {isCurrent && <CheckCircle2 size={14} className="text-blue-600 dark:text-blue-400 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
