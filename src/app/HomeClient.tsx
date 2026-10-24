"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useStudentProgress } from '@/context/StudentProgressContext';
import { 
  getPracticalLessonByDay,
  getNextPracticalDayNumber,
  PRACTICAL_LESSONS,
} from '@/data/bcaPracticalData';
import { 
  BookOpen, FileText, GitBranch, Settings, LogOut, 
  LogIn, ChevronDown, ChevronRight, Folder, 
  Check, RefreshCw, Search, Sun, Moon, MoreHorizontal,
  Play, CheckCircle2, XCircle, HelpCircle, Copy, 
  Terminal, Code2, Laptop, ArrowRight, ArrowLeft,
  Sparkles, ExternalLink
} from 'lucide-react';

// ── 3-YEAR (6-SEMESTER / 360-DAY) ACTIVE SPRINTS ARCHITECTURE ──
export interface PracticalSprintGroup {
  id: number;
  name: string;
  title: string;
  daysRange: string;
  icon: string;
  startDay: number;
  endDay: number;
  badge: string;
}

export const ACTIVE_SPRINTS: PracticalSprintGroup[] = [
  { id: 1, name: 'Sprint 1', title: 'Web Foundation', daysRange: 'Days 1–10', icon: '🌐', startDay: 1, endDay: 10, badge: 'HTML5 Basics' },
  { id: 2, name: 'Sprint 2', title: 'Modern CSS & Grid', daysRange: 'Days 11–20', icon: '📦', startDay: 11, endDay: 20, badge: 'Flex & Grid' },
  { id: 3, name: 'Sprint 3', title: 'JavaScript Core', daysRange: 'Days 21–30', icon: '⚡', startDay: 21, endDay: 30, badge: 'JS Logic' },
  { id: 4, name: 'Sprint 4', title: 'DOM & Events', daysRange: 'Days 31–40', icon: '🎮', startDay: 31, endDay: 40, badge: 'Interactive' },
  { id: 5, name: 'Sprint 5', title: 'APIs & SPA Studio', daysRange: 'Days 41–50', icon: '🚀', startDay: 41, endDay: 50, badge: 'Full Capstone' },
];

export const ALL_ACTIVE_DAYS = PRACTICAL_LESSONS.map((l) => ({
  day: l.day,
  title: l.title,
  short: `Day ${l.day}: ${l.title.replace(/^Day \d+[:\s-]*/i, '').replace(/^Sprint \d+ Capstone[:\s-]*/i, '').slice(0, 24)}`,
  icon: l.day <= 10 ? '🌐' : l.day <= 20 ? '📦' : l.day <= 30 ? '⚡' : l.day <= 40 ? '🎮' : '🚀',
  tech: l.category,
  time: l.estimatedTime || '20 mins',
  sprintId: Math.ceil(l.day / 10),
}));

export const SPRINT_1_DAYS = ALL_ACTIVE_DAYS.filter(d => d.sprintId === 1);

export const SEMESTER_PLANNED_SPRINTS: Record<number, { sprintNum: number; name: string; daysRange: string; focus: string }[]> = {
  2: [
    { sprintNum: 3, name: 'Sprint 3: C Programming & Computational Logic', daysRange: 'Days 61–90', focus: 'Pointers, Memory & Data Structures in C' },
    { sprintNum: 4, name: 'Sprint 4: JavaScript DOM & Interactive Apps', daysRange: 'Days 91–120', focus: 'Event-driven Apps, DOM Tree & SQL Sandbox' },
  ],
  3: [
    { sprintNum: 5, name: 'Sprint 5: Data Structures & Algorithms (DSA)', daysRange: 'Days 121–150', focus: 'Linked Lists, Stacks, Queues & Trees in C/C++' },
    { sprintNum: 6, name: 'Sprint 6: Relational Database & SQL Architecture', daysRange: 'Days 151–180', focus: 'Normalized Tables, Joins & PostgreSQL' },
  ],
  4: [
    { sprintNum: 7, name: 'Sprint 7: Object-Oriented Software Design (OOP)', daysRange: 'Days 181–210', focus: 'Classes, Polymorphism & Clean Design in Java' },
    { sprintNum: 8, name: 'Sprint 8: Backend REST APIs & Linux Shell', daysRange: 'Days 211–240', focus: 'Node.js Express, JWT Auth & Shell Automation' },
  ],
  5: [
    { sprintNum: 9, name: 'Sprint 9: Career Track Specialization Deep-Dive', daysRange: 'Days 241–270', focus: 'React/Next.js, Python Data/AI or Cloud DevOps' },
    { sprintNum: 10, name: 'Sprint 10: Cloud Deployment, Docker & CI/CD', daysRange: 'Days 271–300', focus: 'Containers, GitHub Actions & Cloud VMs' },
  ],
  6: [
    { sprintNum: 11, name: 'Sprint 11: Major Capstone Industry Product', daysRange: 'Days 301–330', focus: 'End-to-End Software Architecture & Build' },
    { sprintNum: 12, name: 'Sprint 12: Production Portfolio & Viva Defense', daysRange: 'Days 331–360', focus: 'Live Deployment, GitHub Showcase & Job Defense' },
  ],
};

// ── BCA SEMESTER SYLLABUS TREE STRUCTURE ──
interface BcaSemesterNode {
  id: number;
  title: string;
  tag?: string;
  subjects: { code: string; name: string; href: string; isLab?: boolean }[];
}

const BCA_SEMESTERS_TREE: BcaSemesterNode[] = [
  {
    id: 1,
    title: "Semester 1: Foundation",
    tag: "Active Sprint",
    subjects: [
      { code: "BCS-111", name: "Computer Basics & PC Software", href: "/bca/semester-1/bcs-111", isLab: false },
      { code: "BCS-012", name: "Mathematics", href: "/bca/semester-1/bcs-012", isLab: false },
      { code: "BCSL-013", name: "Software Lab (HTML/CSS)", href: "/bca/semester-1/bcsl-013", isLab: true },
    ]
  },
  {
    id: 2,
    title: "Semester 2: Core Programming",
    tag: "C & Assembly",
    subjects: [
      { code: "ECO-02", name: "Accountancy-I", href: "/bca/semester-2/eco-02", isLab: false },
      { code: "MCS-011", name: "Problem Solving & C Programming", href: "/bca/semester-2/mcs-011", isLab: false },
      { code: "MCS-012", name: "Computer Organization & Assembly", href: "/bca/semester-2/mcs-012", isLab: false },
      { code: "MCS-015", name: "Communication Skills", href: "/bca/semester-2/mcs-015", isLab: false },
      { code: "MCSL-016", name: "C & Assembly Language Lab", href: "/bca/semester-2/mcsl-016", isLab: true },
    ]
  },
  {
    id: 3,
    title: "Semester 3: Data Structures & C++",
    tag: "OOP & DBMS",
    subjects: [
      { code: "MCS-021", name: "Data & File Structures", href: "/bca/semester-3/mcs-021", isLab: false },
      { code: "MCS-023", name: "Database Management Systems", href: "/bca/semester-3/mcs-023", isLab: false },
      { code: "MCS-014", name: "Systems Analysis & Design", href: "/bca/semester-3/mcs-014", isLab: false },
      { code: "BCS-031", name: "Programming in C++", href: "/bca/semester-3/bcs-031", isLab: false },
      { code: "BCSL-032", name: "C++ & Data Structures Lab", href: "/bca/semester-3/bcsl-032", isLab: true },
    ]
  },
  {
    id: 4,
    title: "Semester 4: Java & Networks",
    tag: "Java & Stats",
    subjects: [
      { code: "BCS-040", name: "Statistical Techniques", href: "/bca/semester-4/bcs-040", isLab: false },
      { code: "MCS-024", name: "Object Oriented Tech & Java", href: "/bca/semester-4/mcs-024", isLab: false },
      { code: "BCS-041", name: "Fundamentals of Computer Networks", href: "/bca/semester-4/bcs-041", isLab: false },
      { code: "BCS-042", name: "Introduction to Algorithm Design", href: "/bca/semester-4/bcs-042", isLab: false },
      { code: "BCSL-043", name: "Java Programming Lab", href: "/bca/semester-4/bcsl-043", isLab: true },
    ]
  },
  {
    id: 5,
    title: "Semester 5: Web Dev & Software Eng",
    tag: "PHP & Python",
    subjects: [
      { code: "BCS-051", name: "Intro to Software Engineering", href: "/bca/semester-5/bcs-051", isLab: false },
      { code: "BCS-052", name: "Network Programming & Admin", href: "/bca/semester-5/bcs-052", isLab: false },
      { code: "BCS-053", name: "Web Programming (PHP/MySQL)", href: "/bca/semester-5/bcs-053", isLab: false },
      { code: "BCS-054", name: "Numerical Techniques", href: "/bca/semester-5/bcs-054", isLab: false },
      { code: "BCSL-056", name: "Web Programming Lab", href: "/bca/semester-5/bcsl-056", isLab: true },
    ]
  },
  {
    id: 6,
    title: "Semester 6: Final Project",
    tag: "Major Project",
    subjects: [
      { code: "BCS-062", name: "E-Commerce & Internet Security", href: "/bca/semester-6/bcs-062", isLab: false },
      { code: "BCSP-064", name: "BCA Final Year Major Project", href: "/bca/semester-6/bcsp-064", isLab: true },
    ]
  }
];

export default function HomeClient() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const { 
    user, 
    completedDays, 
    signOut,
    openProfileDashboard,
    openAuthModal,
  } = useStudentProgress();

  // Desktop Activity Rail & Tree States
  const [activeRailTab, setActiveRailTab] = useState<'syllabus' | 'notes' | 'git' | 'settings'>('syllabus');
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const [selectedSprintId, setSelectedSprintId] = useState<number>(1);
  const [expandedSprintId, setExpandedSprintId] = useState<number | null>(1);

  // Active Lab Day (Defaults to next incomplete day or Day 1)
  const [activeLabDay, setActiveLabDay] = useState<number>(1);
  const nextDayToStudy = getNextPracticalDayNumber(completedDays);

  // Current Sprint's active days
  const currentSprintDays = useMemo(() => {
    return ALL_ACTIVE_DAYS.filter(d => d.sprintId === selectedSprintId);
  }, [selectedSprintId]);

  // Per-day Interactive Checklists: { "1_1": true, "1_2": false, ... }
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({
    '1_1': true,
    '1_2': true,
    '1_3': false,
  });

  // Hints Expanded
  const [expandedHint, setExpandedHint] = useState<number | null>(null);

  // Viva Selection State: selected option index per day { [day]: optionIndex }
  const [selectedVivaAnswers, setSelectedVivaAnswers] = useState<Record<number, number>>({});

  // Editor Tab: 'code' | 'preview'
  const [editorTab, setEditorTab] = useState<'code' | 'preview'>('code');

  // Simulated GitHub Sync State
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>("10 mins ago");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedGitCmd, setCopiedGitCmd] = useState<string | null>(null);

  const handleCopyGitCmd = useCallback((cmd: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(cmd);
      setCopiedGitCmd(cmd);
      setTimeout(() => setCopiedGitCmd(null), 1800);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    if (nextDayToStudy && nextDayToStudy <= 50) {
      setActiveLabDay(nextDayToStudy);
      const sprintForDay = Math.ceil(nextDayToStudy / 10);
      setSelectedSprintId(sprintForDay);
      setExpandedSprintId(sprintForDay);
    }
  }, [nextDayToStudy]);

  const isDark = mounted ? (resolvedTheme === 'dark' || theme === 'dark') : true;
  const toggleTheme = useCallback(() => {
    setTheme(isDark ? 'light' : 'dark');
  }, [isDark, setTheme]);

  const handleSignIn = useCallback(() => {
    openAuthModal();
  }, [openAuthModal]);

  // Retrieve current day lesson data
  const activeLesson = useMemo(() => {
    return getPracticalLessonByDay(activeLabDay) || PRACTICAL_LESSONS[0];
  }, [activeLabDay]);

  // Simplify day into 3 clear, beginner-friendly guided steps
  const daySteps = useMemo(() => {
    const labTasks = activeLesson.practicalLab?.tasks || [];
    return [
      {
        id: 1,
        title: 'Step 1: Open VS Code & File Setup',
        detail: `Create ${activeLesson.assignment?.fileName || 'index.html'} and add the initial structure.`,
        hint: `Open Windows Terminal or CMD, navigate to your folder and type: code . to launch VS Code.`,
      },
      {
        id: 2,
        title: `Step 2: ${labTasks[0]?.title || 'Write Core Code & Tags'}`,
        detail: labTasks[0]?.instruction || activeLesson.concept?.keyPoints?.[0] || 'Implement the core tags for today.',
        hint: labTasks[0]?.hint || 'Look at the Code Editor tab to see the exact syntax required.',
      },
      {
        id: 3,
        title: 'Step 3: Preview in Browser & Push to GitHub',
        detail: `Verify output in Chrome and commit with: "${activeLesson.githubWorkflow?.commitMessage || 'Day ' + activeLabDay}"`,
        hint: `Run: git add . && git commit -m "${activeLesson.githubWorkflow?.commitMessage || 'feat: day ' + activeLabDay}" && git push origin main`,
      }
    ];
  }, [activeLesson, activeLabDay]);

  // Task completion toggle
  const toggleTask = useCallback((stepId: number) => {
    const key = `${activeLabDay}_${stepId}`;
    setCheckedTasks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }, [activeLabDay]);

  // Calculate day progress
  const completedStepsForDay = useMemo(() => {
    return daySteps.filter(s => !!checkedTasks[`${activeLabDay}_${s.id}`]).length;
  }, [daySteps, checkedTasks, activeLabDay]);
  const progressPercent = Math.round((completedStepsForDay / daySteps.length) * 100);

  // Viva Selection Handler
  const handleVivaSelect = useCallback((optionIdx: number) => {
    setSelectedVivaAnswers(prev => ({
      ...prev,
      [activeLabDay]: optionIdx
    }));
  }, [activeLabDay]);

  const currentVivaSelected = selectedVivaAnswers[activeLabDay] ?? null;
  const isVivaCorrect = currentVivaSelected !== null && currentVivaSelected === activeLesson.vivaCheck?.correctAnswer;

  // GitHub Sync Handler
  const handleSyncNow = useCallback(() => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime("Just now");
    }, 900);
  }, []);

  // Copy Code Handler
  const handleCopyCode = useCallback(() => {
    const codeToCopy = activeLesson.teacherDemo?.code || activeLesson.practicalLab?.initialCode || "";
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(codeToCopy);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 1500);
    }
  }, [activeLesson]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#070c18] text-slate-900 dark:text-slate-100 flex flex-col font-sans select-none antialiased transition-colors">
      
      {/* ════════════════════════════════════════════════════════════════
          1. TOP APP HEADER (Shared across viewports)
      ════════════════════════════════════════════════════════════════ */}
      <header className="w-full bg-white dark:bg-[#070c18] border-b border-slate-200 dark:border-slate-800/80 px-4 sm:px-6 h-14 flex items-center justify-between z-30 transition-colors">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
              <span className="font-mono font-black text-xs">&lt;/&gt;</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                CS Guide
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs">NextSem</span>
            </div>
          </Link>
        </div>

        {/* Desktop Tagline Subtitle */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">BCA Practical Studio</span>
          <span>•</span>
          <span>Semester 1 Foundation</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs">
            <Search size={13} />
            <span className="text-[11px]">Search practicals...</span>
          </div>

          {/* Theme Toggle Button */}
          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer text-xs font-semibold shadow-2xs"
              title={isDark ? "Current: Dark Mode (Click to switch to Light)" : "Current: Light Mode (Click to switch to Dark)"}
            >
              {isDark ? (
                <>
                  <Moon size={13} className="text-emerald-400" />
                  <span className="text-[11px] font-mono font-bold text-slate-300">Dark</span>
                </>
              ) : (
                <>
                  <Sun size={13} className="text-amber-500" />
                  <span className="text-[11px] font-mono font-bold text-slate-700">Light</span>
                </>
              )}
            </button>
          )}

          {/* User Profile Pill */}
          {user ? (
            <button
              onClick={openProfileDashboard}
              suppressHydrationWarning
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-white transition-colors cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-mono">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline max-w-[80px] truncate">{user.name.split(" ")[0]}</span>
            </button>
          ) : (
            <button
              onClick={handleSignIn}
              className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>
      </header>


      {/* ════════════════════════════════════════════════════════════════
          2. DESKTOP VIEWPORT: TWO-PANEL SPLIT STUDIO
          (Hidden on mobile, Visible on md & lg)
      ════════════════════════════════════════════════════════════════ */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        
        {/* ── LEFT ACTIVITY RAIL (Thin Vertical Icon Dock) ── */}
        <aside className="w-14 bg-slate-50 dark:bg-[#050914] border-r border-slate-200 dark:border-slate-800/80 flex flex-col items-center justify-between py-4 shrink-0 z-20 transition-colors">
          <div className="flex flex-col items-center gap-4 w-full">
            <button
              onClick={() => setActiveRailTab('syllabus')}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                activeRailTab === 'syllabus'
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-900'
              }`}
              title="Syllabus Explorer"
            >
              <BookOpen size={18} />
            </button>

            <button
              onClick={() => setActiveRailTab('notes')}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                activeRailTab === 'notes'
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-900'
              }`}
              title="Theory Notes"
            >
              <FileText size={18} />
            </button>

            <button
              onClick={() => setActiveRailTab('git')}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                activeRailTab === 'git'
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-900'
              }`}
              title="GitHub Repositories"
            >
              <GitBranch size={18} />
            </button>

            <button
              onClick={() => setActiveRailTab('settings')}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                activeRailTab === 'settings'
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-900'
              }`}
              title="Settings"
            >
              <Settings size={18} />
            </button>
          </div>

          <div className="w-full flex justify-center">
            {user ? (
              <button
                onClick={signOut}
                suppressHydrationWarning
                className="w-9 h-9 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-slate-200/60 dark:hover:bg-slate-900 flex items-center justify-center transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            ) : (
              <button
                onClick={handleSignIn}
                className="w-9 h-9 rounded-xl text-emerald-600 dark:text-emerald-400 hover:bg-slate-200/60 dark:hover:bg-slate-900 flex items-center justify-center transition-colors cursor-pointer"
                title="Sign In"
              >
                <LogIn size={16} />
              </button>
            )}
          </div>
        </aside>

        {/* ── LEFT PANEL: DYNAMIC ACTIVITY CONTENT (Width: ~280-320px) ── */}
        <aside className="w-72 xl:w-80 bg-slate-50/80 dark:bg-[#090e1c] border-r border-slate-200 dark:border-slate-800/80 flex flex-col p-4 shrink-0 overflow-y-auto transition-colors">
          
          {/* 1. SYLLABUS EXPLORER VIEW */}
          {activeRailTab === 'syllabus' && (
            <>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                  <BookOpen size={14} className="text-emerald-600 dark:text-emerald-400" />
                  <span>Syllabus: BCA</span>
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  {selectedSemester > 0 ? `Sem ${selectedSemester}` : 'BCA Hub'}
                </span>
              </div>

              {/* 360-Day Practical Portal Gateway Card */}
              <Link
                href="/bca/practical"
                className="block mb-3 p-2.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-emerald-500/10 hover:from-emerald-500/20 hover:to-blue-500/20 border border-emerald-500/30 text-left transition-all group shadow-2xs"
                title="Open 3-Year / 360-Day Practical Learning Portal"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 dark:text-emerald-400">
                    <Sparkles size={13} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>360 Days Practical Portal</span>
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-extrabold">
                    12 Sprints
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-1 leading-snug">
                  Full 3-Year Degree Curriculum (Days 1–360)
                </p>
                <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 group-hover:underline">
                  <span>Explore All 360 Days</span>
                  <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>

              {/* Tree View Navigation (Full 6 Semesters Collapsible Accordion) */}
              <div className="space-y-1.5 text-xs">
                {BCA_SEMESTERS_TREE.map((sem) => {
                  const isExpanded = selectedSemester === sem.id;
                  return (
                    <div key={sem.id} className="space-y-1">
                      {/* Semester Header: Chevron toggles accordion, Title & External Icon link to Semester Page */}
                      <div
                        className={`w-full flex items-center justify-between py-1 px-1.5 rounded-lg transition-all select-none ${
                          isExpanded
                            ? 'bg-slate-200/80 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700/80 shadow-2xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/40 border border-transparent'
                        }`}
                      >
                        {/* 1. Accordion Toggle Arrow */}
                        <button
                          type="button"
                          onClick={() => setSelectedSemester(prev => (prev === sem.id ? 0 : sem.id))}
                          className="p-1 rounded hover:bg-slate-300/50 dark:hover:bg-slate-700/50 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer shrink-0"
                          title={isExpanded ? `Collapse ${sem.title}` : `Expand ${sem.title}`}
                        >
                          {isExpanded ? (
                            <ChevronDown size={14} className="text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <ChevronRight size={14} />
                          )}
                        </button>

                        {/* 2. Direct Navigation Link (Clicking the semester title opens that semester page) */}
                        <Link
                          href={`/bca/semester-${sem.id}`}
                          className="flex-1 px-1.5 py-0.5 text-left font-bold truncate hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-xs"
                          title={`Open Semester ${sem.id} Hub`}
                        >
                          <span>{sem.title}</span>
                        </Link>

                        {/* 3. Direct Link Button / Badge */}
                        <div className="flex items-center gap-1 shrink-0">
                          {sem.id === 1 && (
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold">
                              5 Sprints Live
                            </span>
                          )}
                          <Link
                            href={`/bca/semester-${sem.id}`}
                            className="p-1 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                            title={`Open Semester ${sem.id} Page`}
                          >
                            <ExternalLink size={12} />
                          </Link>
                        </div>
                      </div>

                      {/* Accordion Content — Strictly rendered ONLY when this semester is open! */}
                      {isExpanded && (
                        <div className="pl-2 space-y-2 border-l-2 border-emerald-500/30 ml-2.5 pt-1">
                          {/* Semester 1 Practical Container (Active Sprints 1–5 • Days 1–50) */}
                          {sem.id === 1 && (
                            <div className="space-y-1.5">
                              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1 pt-0.5 flex items-center justify-between">
                                <span>Active Practical Labs</span>
                                <span className="text-emerald-600 dark:text-emerald-400">50 Days Live</span>
                              </div>

                              {ACTIVE_SPRINTS.map((sprint) => {
                                const isSprintOpen = expandedSprintId === sprint.id;
                                const sprintDays = ALL_ACTIVE_DAYS.filter(d => d.sprintId === sprint.id);
                                const sprintCompletedCount = sprintDays.filter(d => completedDays.includes(d.day)).length;

                                return (
                                  <div key={sprint.id} className="rounded-xl p-2 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/90 shadow-2xs">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setExpandedSprintId(prev => prev === sprint.id ? null : sprint.id);
                                        setSelectedSprintId(sprint.id);
                                      }}
                                      className="w-full flex items-center justify-between text-left text-slate-800 dark:text-slate-200 font-bold hover:text-slate-900 dark:hover:text-white cursor-pointer py-0.5"
                                    >
                                      <div className="flex items-center gap-1.5 truncate">
                                        <span className="text-xs">{sprint.icon}</span>
                                        <span className="truncate text-xs">{sprint.name}: {sprint.title}</span>
                                      </div>
                                      <div className="flex items-center gap-1 shrink-0">
                                        <span className="font-mono text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">
                                          {sprintCompletedCount > 0 ? `${sprintCompletedCount}/10` : sprint.daysRange}
                                        </span>
                                        {isSprintOpen ? (
                                          <ChevronDown size={12} className="text-slate-400" />
                                        ) : (
                                          <ChevronRight size={12} className="text-slate-400" />
                                        )}
                                      </div>
                                    </button>

                                    {/* Days Quick List */}
                                    {isSprintOpen && (
                                      <div className="pt-1.5 mt-1 space-y-1 border-t border-slate-100 dark:border-slate-800/60">
                                        {sprintDays.map((d) => {
                                          const isActive = activeLabDay === d.day;
                                          const isDone = completedDays.includes(d.day);
                                          return (
                                            <button
                                              key={d.day}
                                              type="button"
                                              onClick={() => {
                                                setActiveLabDay(d.day);
                                                setSelectedSprintId(sprint.id);
                                                setEditorTab('code');
                                              }}
                                              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left transition-all cursor-pointer ${
                                                isActive
                                                  ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30 shadow-xs'
                                                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                                              }`}
                                            >
                                              <div className="flex items-center gap-2 truncate">
                                                <span className="text-xs">{d.icon}</span>
                                                <span className="truncate text-[11px]">{d.short}</span>
                                              </div>
                                              {isDone ? (
                                                <Check size={12} className="text-emerald-600 dark:text-emerald-400 shrink-0 stroke-[3]" />
                                              ) : isActive ? (
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                                              ) : null}
                                            </button>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}

                              {/* All 360 Days Portal Direct Link Under Semester 1 */}
                              <Link
                                href="/bca/practical"
                                className="w-full flex items-center justify-between p-2 rounded-xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 hover:from-emerald-500/20 hover:to-blue-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold transition-all shadow-2xs"
                              >
                                <div className="flex items-center gap-1.5 truncate">
                                  <Sparkles size={12} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                                  <span className="truncate text-[11px] font-mono">View All 360 Days (Sprints 1–12) »</span>
                                </div>
                                <ExternalLink size={12} className="shrink-0" />
                              </Link>
                            </div>
                          )}

                          {/* Semesters 2 to 6 Practical Sprints List */}
                          {sem.id > 1 && SEMESTER_PLANNED_SPRINTS[sem.id] && (
                            <div className="rounded-xl p-2 bg-slate-100/70 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 space-y-1.5">
                              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-0.5 flex items-center justify-between">
                                <span>Practical Roadmap</span>
                                <span className="text-blue-600 dark:text-blue-400 font-bold">60 Days</span>
                              </div>
                              {SEMESTER_PLANNED_SPRINTS[sem.id].map((ps) => (
                                <Link
                                  key={ps.sprintNum}
                                  href="/bca/practical"
                                  className="block p-1.5 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition-colors group"
                                >
                                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                                    <span className="truncate text-[11px]">{ps.name}</span>
                                    <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">{ps.daysRange}</span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{ps.focus}</p>
                                </Link>
                              ))}
                              <Link
                                href="/bca/practical"
                                className="flex items-center justify-between py-1 px-1 rounded text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                <span>Open Semester {sem.id} Practical Hub »</span>
                                <ExternalLink size={10} />
                              </Link>
                            </div>
                          )}

                          {/* Subject Theory & Lab Links */}
                          <div className="space-y-0.5 pt-1">
                            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
                              Theory &amp; Lab Courses
                            </div>
                            {sem.subjects.map((sub) => (
                              <Link
                                key={sub.code}
                                href={sub.href}
                                className="flex items-center justify-between py-1 px-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/40 transition-colors group"
                              >
                                <div className="flex items-center gap-1.5 truncate">
                                  <FileText size={12} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                                  <span className="truncate text-[11px] font-medium">{sub.code}: {sub.name}</span>
                                </div>
                                {sub.isLab && (
                                  <span className="text-[9px] font-mono px-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">Lab</span>
                                )}
                              </Link>
                            ))}
                          </div>

                          {/* Full Semester Hub Jump Link */}
                          <Link
                            href={`/bca/semester-${sem.id}`}
                            className="flex items-center justify-between py-1 px-2 rounded-lg text-emerald-700 dark:text-emerald-400 hover:underline text-[11px] font-mono font-bold"
                          >
                            <span>Open Semester {sem.id} Hub »</span>
                            <ChevronRight size={12} />
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* 2. THEORY NOTES VIEW */}
          {activeRailTab === 'notes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                  <FileText size={14} className="text-emerald-600 dark:text-emerald-400" />
                  <span>Theory Notes: BCA</span>
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20">
                  IGNOU Curated
                </span>
              </div>

              {/* Subject 1: BCS-111 / BCS-011 */}
              <div className="rounded-xl p-3 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">BCS-111 Computer Basics</span>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">Sem 1</span>
                </div>
                <div className="space-y-1 text-xs">
                  <Link
                    href="/bca/notes/bcs-011-block-3-unit-1-networking-and-internet"
                    className="flex items-center gap-1.5 p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span className="text-emerald-600 dark:text-emerald-400 text-[10px]">●</span>
                    <span className="truncate">Unit 1: Networking & Internet</span>
                  </Link>
                  <Link
                    href="/bca/notes/bcs-011-unit-2-operating-system"
                    className="flex items-center gap-1.5 p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span className="text-emerald-600 dark:text-emerald-400 text-[10px]">●</span>
                    <span className="truncate">Unit 2: Operating System Basics</span>
                  </Link>
                  <Link
                    href="/bca/notes/bcs-011-unit-3-programming-languages"
                    className="flex items-center gap-1.5 p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span className="text-emerald-600 dark:text-emerald-400 text-[10px]">●</span>
                    <span className="truncate">Unit 3: Programming Languages</span>
                  </Link>
                  <Link
                    href="/bca/notes/bcs-011-unit-5"
                    className="flex items-center gap-1.5 p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span className="text-emerald-600 dark:text-emerald-400 text-[10px]">●</span>
                    <span className="truncate">Unit 5: Information Security</span>
                  </Link>
                </div>
              </div>

              {/* Subject 2: BCSL-013 Lab Manual */}
              <div className="rounded-xl p-3 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">BCSL-013 Software Lab</span>
                <div className="space-y-1 text-xs">
                  <Link
                    href="/cli"
                    className="flex items-center gap-1.5 p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Terminal size={12} className="text-emerald-600 dark:text-emerald-400" />
                    <span>Windows CMD Simulator</span>
                  </Link>
                  <Link
                    href="/html"
                    className="flex items-center gap-1.5 p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Code2 size={12} className="text-emerald-600 dark:text-emerald-400" />
                    <span>HTML5 Tag Reference</span>
                  </Link>
                </div>
              </div>

              <Link
                href="/bca/semester-1"
                className="w-full py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Browse All Semester 1 Notes</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          )}

          {/* 3. GIT WORKFLOWS VIEW */}
          {activeRailTab === 'git' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                  <GitBranch size={14} className="text-emerald-600 dark:text-emerald-400" />
                  <span>GitHub Workflows</span>
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  Day {activeLabDay}
                </span>
              </div>

              {/* Connected Target Repo Card */}
              <div className="rounded-xl p-3 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs shadow-xs">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span>Target Repository</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">main</span>
                </div>
                <div className="font-mono text-slate-900 dark:text-white font-bold bg-slate-100 dark:bg-black/60 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  html-css-projects
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 pt-0.5">
                  <Folder size={11} className="text-emerald-600 dark:text-emerald-400" />
                  <span>Folder: <code className="text-emerald-700 dark:text-emerald-300 font-mono">bca-day-{activeLabDay < 10 ? '0' + activeLabDay : activeLabDay}</code></span>
                </div>
              </div>

              {/* 4 Essential Push Commands */}
              <div className="space-y-2 text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-bold block text-[11px] uppercase tracking-wider">Terminal Push Commands</span>
                
                {[
                  `git checkout -b feature/day-${activeLabDay}`,
                  `git add .`,
                  `git commit -m "feat(day-${activeLabDay}): complete ${activeLesson.title.toLowerCase().slice(0, 28)}"`,
                  `git push origin feature/day-${activeLabDay}`
                ].map((cmd, idx) => (
                  <div key={idx} className="group flex items-center justify-between bg-slate-100 dark:bg-black/60 border border-slate-200 dark:border-slate-800 rounded-lg p-2 font-mono text-[11px]">
                    <span className="text-slate-800 dark:text-slate-300 truncate pr-2">{cmd}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyGitCmd(cmd)}
                      className="text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 p-1 rounded transition-colors shrink-0 cursor-pointer"
                      title="Copy command"
                    >
                      {copiedGitCmd === cmd ? <Check size={12} className="text-emerald-600 dark:text-emerald-400" /> : <Copy size={12} />}
                    </button>
                  </div>
                ))}
              </div>

              <Link
                href="/bca/practical/how-it-works"
                className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>GitHub Verification Guide</span>
                <ExternalLink size={12} />
              </Link>
            </div>
          )}

          {/* 4. SETTINGS VIEW */}
          {activeRailTab === 'settings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                  <Settings size={14} className="text-emerald-600 dark:text-emerald-400" />
                  <span>Studio Settings</span>
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  Preferences
                </span>
              </div>

              {/* User Account / Profile Card */}
              <div className="rounded-xl p-3 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 text-xs shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                    {user ? user.name.charAt(0).toUpperCase() : "G"}
                  </div>
                  <div className="truncate flex-1">
                    <div className="text-slate-900 dark:text-white font-bold truncate">{user ? user.name : "Guest Student"}</div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px] truncate">{user ? user.email : "Not signed in"}</div>
                  </div>
                </div>

                {user ? (
                  <button
                    type="button"
                    onClick={openProfileDashboard}
                    className="w-full py-1.5 px-2.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-bold text-[11px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Open Student Dashboard</span>
                    <ExternalLink size={12} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSignIn}
                    className="w-full py-1.5 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Sign In with Google
                  </button>
                )}
              </div>

              {/* Theme Settings */}
              <div className="rounded-xl p-3 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 text-xs shadow-xs">
                <span className="text-slate-500 dark:text-slate-400 font-bold block text-[11px] uppercase tracking-wider">Appearance Theme</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTheme('dark')}
                    className={`p-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isDark 
                        ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50 shadow-xs ring-1 ring-emerald-500/30' 
                        : 'bg-slate-100 dark:bg-black/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Moon size={13} className={isDark ? "text-emerald-700 dark:text-emerald-400" : ""} />
                    <span>Dark</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme('light')}
                    className={`p-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      !isDark 
                        ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/50 shadow-xs ring-1 ring-emerald-500/30' 
                        : 'bg-slate-100 dark:bg-black/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Sun size={13} className={!isDark ? "text-amber-500" : ""} />
                    <span>Light</span>
                  </button>
                </div>
              </div>

              {/* Practical Progress Summary */}
              <div className="rounded-xl p-3 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs shadow-xs">
                <span className="text-slate-500 dark:text-slate-400 font-bold block text-[11px] uppercase tracking-wider">Practical Progress</span>
                <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                  <span>Completed Labs:</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{completedDays.length} / 360</span>
                </div>
                <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                  <span>Current Sprint:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Sprint 1 (Days 1–10)</span>
                </div>
              </div>

              {user && (
                <button
                  type="button"
                  onClick={signOut}
                  className="w-full py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-500 dark:text-rose-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <LogOut size={13} />
                  <span>Sign Out of CS Guide</span>
                </button>
              )}
            </div>
          )}

        </aside>

        {/* ── RIGHT MAIN PANEL: CODING PLAYGROUND STUDIO ── */}
        <main className="flex-1 bg-slate-100/70 dark:bg-[#070c18] p-5 xl:p-6 overflow-y-auto space-y-4 transition-colors">
          
          {/* Header Row & Day Switcher Bar */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  Day {activeLabDay}: {activeLesson.title}
                </h1>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  {activeLesson.category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/bca/practical/${activeLesson.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs font-mono shadow-xs transition-transform active:scale-95"
                >
                  <Sparkles size={12} />
                  <span>{activeLabDay === 1 ? "Interactive Studio »" : "Open Full Lesson »"}</span>
                </Link>
                <button className="p-1 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>

            {/* Quick Multi-Sprint & Day Pill Strip */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {/* Sprint Badges */}
              <div className="flex items-center gap-1 shrink-0 p-0.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                {ACTIVE_SPRINTS.map((sprint) => (
                  <button
                    key={sprint.id}
                    type="button"
                    onClick={() => {
                      setSelectedSprintId(sprint.id);
                      setExpandedSprintId(sprint.id);
                      setActiveLabDay(sprint.startDay);
                      setEditorTab('code');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      selectedSprintId === sprint.id
                        ? 'bg-emerald-500 text-black shadow-xs font-black'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    title={`${sprint.name}: ${sprint.title} (${sprint.daysRange})`}
                  >
                    <span>{sprint.icon}</span>
                    <span className="hidden sm:inline">{sprint.name}</span>
                    <span className="sm:hidden">S{sprint.id}</span>
                  </button>
                ))}
              </div>

              <span className="w-px h-5 bg-slate-300 dark:bg-slate-700 shrink-0 mx-0.5" />

              {/* Days for Current Active Sprint */}
              {currentSprintDays.map((d) => {
                const isActive = activeLabDay === d.day;
                const isDone = completedDays.includes(d.day);
                return (
                  <button
                    key={d.day}
                    onClick={() => {
                      setActiveLabDay(d.day);
                      setEditorTab('code');
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                        : isDone
                        ? 'bg-white dark:bg-slate-900 border border-emerald-500/40 text-emerald-700 dark:text-emerald-400 shadow-2xs'
                        : 'bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs'
                    }`}
                  >
                    <span>Day {d.day}</span>
                    {isDone && <Check size={11} className="stroke-[3]" />}
                  </button>
                );
              })}

              <Link
                href="/bca/practical"
                className="px-3 py-1 rounded-xl text-xs font-mono font-bold text-blue-600 dark:text-blue-400 hover:underline bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 shrink-0 shadow-2xs transition-colors flex items-center gap-1.5"
                title="View All 360 Days Across All 6 Semesters"
              >
                <Sparkles size={11} />
                <span>All 360 Days »</span>
              </Link>
            </div>
          </div>

          {/* User-Friendly Terminal Banner with Goal */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#090e1c] border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shadow-xs transition-colors">
            <div className="space-y-0.5">
              <div className="font-mono text-xs text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                <Terminal size={13} />
                <span>~/bca/sem1/{activeLesson.slug.replace(/^day-\d+-/, '')} $</span>
              </div>
              <div className="text-xs text-slate-700 dark:text-slate-300 font-medium line-clamp-1">
                <strong className="text-slate-900 dark:text-white">Goal:</strong> {activeLesson.concept?.overview || 'Build and verify your practical code today.'}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 text-xs font-mono">
              <span className="text-slate-500 dark:text-slate-400">Time: <strong className="text-slate-900 dark:text-white">~20 mins</strong></span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">{activeLesson.difficulty}</span>
            </div>
          </div>

          {/* Two-Column Middle Grid: 3 Simple Guided Tasks (Left) vs Code Editor & Output (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* Left 6 Columns: 3 SIMPLE GUIDED ACTION TASKS + VIVA CHECK */}
            <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
              
              {/* Box 1: 3 SIMPLE GUIDED TASKS */}
              <div className="rounded-2xl bg-white dark:bg-[#0b1224] border border-slate-200 dark:border-slate-800 p-4 space-y-3 shadow-xs transition-colors">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 text-slate-900 dark:text-white">
                    <Laptop size={14} className="text-emerald-600 dark:text-emerald-400" />
                    <span>Today&apos;s 3 Guided Steps</span>
                  </span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-mono text-[11px] font-bold">
                    {completedStepsForDay} / 3 Complete ({progressPercent}%)
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Steps List */}
                <div className="space-y-2.5 pt-1">
                  {daySteps.map((step) => {
                    const isDone = !!checkedTasks[`${activeLabDay}_${step.id}`];
                    const isHintOpen = expandedHint === step.id;
                    return (
                      <div 
                        key={step.id}
                        className={`rounded-xl p-2.5 border transition-all ${
                          isDone 
                            ? 'bg-slate-50/60 dark:bg-slate-900/30 border-slate-200/80 dark:border-slate-800/60' 
                            : 'bg-slate-50/90 dark:bg-slate-900/70 border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <button
                            type="button"
                            onClick={() => toggleTask(step.id)}
                            className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-all ${
                              isDone 
                                ? 'bg-emerald-500 text-black shadow-xs' 
                                : 'border border-slate-400 dark:border-slate-600 hover:border-emerald-500 text-transparent'
                            }`}
                          >
                            <Check size={11} className="stroke-[3]" />
                          </button>

                          <div className="flex-1 space-y-0.5">
                            <div className="flex items-center justify-between">
                              <span className={`text-xs font-bold ${isDone ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-900 dark:text-slate-100'}`}>
                                {step.title}
                              </span>
                              <button
                                type="button"
                                onClick={() => setExpandedHint(isHintOpen ? null : step.id)}
                                className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 flex items-center gap-0.5 cursor-pointer"
                              >
                                <HelpCircle size={10} />
                                <span>{isHintOpen ? 'Hide' : 'Hint'}</span>
                              </button>
                            </div>

                            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                              {step.detail}
                            </p>

                            {/* Collapsible Hint */}
                            {isHintOpen && (
                              <div className="mt-1.5 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-[10px] font-mono text-emerald-800 dark:text-emerald-300 leading-relaxed">
                                💡 <strong>Tip:</strong> {step.hint}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Box 2: INSTANT VIVA KNOWLEDGE CHECK */}
              <div className="rounded-2xl bg-white dark:bg-[#0b1224] border border-slate-200 dark:border-slate-800 p-4 space-y-2.5 shadow-xs transition-colors">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1 text-slate-900 dark:text-white">
                    <span>🎓</span> Instant Viva Voce Check
                  </span>
                  <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">1 Click Exam Prep</span>
                </div>

                <p className="text-xs font-bold text-slate-900 dark:text-slate-200 leading-snug">
                  {activeLesson.vivaCheck?.question || 'Why is proper structure important in web development?'}
                </p>

                {/* 4 Clickable Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {(activeLesson.vivaCheck?.options || [
                    'Standard compliance & browser stability',
                    'Increases server bandwidth overhead',
                    'Forces legacy rendering mode',
                    'Required only for mobile apps'
                  ]).map((opt, optIdx) => {
                    const isSelected = currentVivaSelected === optIdx;
                    const isCorrect = optIdx === activeLesson.vivaCheck?.correctAnswer;
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleVivaSelect(optIdx)}
                        className={`flex items-start gap-2 p-2 rounded-xl text-left text-xs transition-all cursor-pointer border ${
                          isSelected
                            ? isCorrect
                              ? 'bg-emerald-500/15 dark:bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold'
                              : 'bg-rose-500/15 border-rose-500 text-rose-800 dark:text-rose-300 font-bold'
                            : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100/60 dark:hover:bg-slate-900'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-mono ${
                          isSelected 
                            ? isCorrect ? 'border-emerald-400 bg-emerald-500 text-black font-bold' : 'border-rose-400 bg-rose-500 text-white font-bold'
                            : 'border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400'
                        }`}>
                          {['A', 'B', 'C', 'D'][optIdx]}
                        </span>
                        <span className="line-clamp-2 text-[11px] leading-tight">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Instant Feedback Alert */}
                {currentVivaSelected !== null && (
                  <div className={`p-2.5 rounded-xl border text-xs leading-snug flex items-start gap-2 ${
                    isVivaCorrect 
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-500/50 text-emerald-800 dark:text-emerald-300' 
                      : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-500/50 text-amber-800 dark:text-amber-300'
                  }`}>
                    {isVivaCorrect ? <CheckCircle2 size={15} className="shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" /> : <XCircle size={15} className="shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />}
                    <div className="space-y-0.5">
                      <div className="font-bold">
                        {isVivaCorrect ? '🎉 Correct Answer!' : '💡 Keep trying! Check the clue:'}
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-300">
                        {activeLesson.vivaCheck?.explanation || 'Inspect the core concepts of this lesson.'}
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Right 6 Columns: CODE EDITOR & LIVE OUTPUT STUDIO */}
            <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
              
              {/* CODE STUDIO BOX */}
              <div className="rounded-2xl bg-white dark:bg-[#090e1c] border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col flex-1 shadow-xs transition-colors">
                {/* Editor Action Header */}
                <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditorTab('code')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        editorTab === 'code'
                          ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/40'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Code2 size={13} />
                      <span>Starter Code</span>
                    </button>

                    <button
                      onClick={() => setEditorTab('preview')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        editorTab === 'preview'
                          ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/40'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Play size={12} className="fill-emerald-500 dark:fill-emerald-400 text-emerald-500 dark:text-emerald-400" />
                      <span>Live Output</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono">
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-bold transition-colors cursor-pointer flex items-center gap-1 px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-2xs"
                      title="Copy Starter Code"
                    >
                      <Copy size={11} />
                      <span>{copiedCode ? "Copied!" : "Copy"}</span>
                    </button>
                    <Link
                      href={`/bca/practical/${activeLesson.slug}`}
                      className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 font-bold transition-colors cursor-pointer"
                    >
                      [Full Guide »]
                    </Link>
                  </div>
                </div>

                {/* Tab 1: Code View with Syntax Styling */}
                {editorTab === 'code' ? (
                  <div className="p-4 font-mono text-xs leading-relaxed flex items-start gap-3 overflow-x-auto text-slate-200 bg-slate-950 dark:bg-[#070c18] flex-1 min-h-[220px]">
                    {/* Line numbers */}
                    <div className="text-slate-600 select-none text-right shrink-0">
                      1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9<br />10
                    </div>

                    <pre className="text-slate-200">
                      <code>
                        {activeLesson.day === 1 ? (
                          <>
                            <span className="text-purple-400 font-bold">&lt;!DOCTYPE html&gt;</span><br />
                            <span className="text-cyan-400 font-bold">&lt;html <span className="text-yellow-300">lang</span>=<span className="text-emerald-400">&quot;en&quot;</span>&gt;</span><br />
                            <span className="text-cyan-400 font-bold">&lt;head&gt;</span><br />
                            &nbsp;&nbsp;<span className="text-cyan-400">&lt;meta <span className="text-yellow-300">charset</span>=<span className="text-emerald-400">&quot;UTF-8&quot;</span>&gt;</span><br />
                            &nbsp;&nbsp;<span className="text-cyan-400">&lt;title&gt;</span><span className="text-white">NextSem Day 1</span><span className="text-cyan-400">&lt;/title&gt;</span><br />
                            <span className="text-cyan-400 font-bold">&lt;/head&gt;</span><br />
                            <span className="text-cyan-400 font-bold">&lt;body&gt;</span><br />
                            &nbsp;&nbsp;<span className="text-emerald-400 font-bold">&lt;h1&gt;</span>Hello Nextsem Developer<span className="text-emerald-400 font-bold">&lt;/h1&gt;</span><br />
                            &nbsp;&nbsp;<span className="text-emerald-400 font-bold">&lt;p&gt;</span>My first valid HTML5 webpage!<span className="text-emerald-400 font-bold">&lt;/p&gt;</span><br />
                            <span className="text-cyan-400 font-bold">&lt;/body&gt;</span><br />
                            <span className="text-cyan-400 font-bold">&lt;/html&gt;</span>
                          </>
                        ) : (
                          <>
                            <span className="text-slate-400">{"// Starter Code for Day " + activeLesson.day}</span><br />
                            <span className="text-white">{activeLesson.teacherDemo?.code || activeLesson.practicalLab?.initialCode}</span>
                          </>
                        )}
                      </code>
                    </pre>
                  </div>
                ) : (
                  /* Tab 2: Rendered Live Output / Mini Browser View */
                  <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-b-2xl overflow-hidden flex-1 flex flex-col min-h-[220px]">
                    <div className="bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-3 py-1.5 flex items-center gap-2 text-[11px] font-mono text-slate-500">
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      </div>
                      <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 truncate flex-1">
                        http://localhost:3000/{activeLesson.assignment?.fileName || 'index.html'}
                      </span>
                    </div>

                    <div className="p-4 bg-white dark:bg-slate-900 flex-1 space-y-2">
                      <h1 className="text-lg font-black text-slate-900 dark:text-white">
                        {activeLesson.day === 1 ? 'Hello Nextsem Developer' : activeLesson.title}
                      </h1>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {activeLesson.concept?.overview || 'Your practical output runs seamlessly in standards mode.'}
                      </p>
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                        ✓ HTML5 W3C Standards Mode Active • Viewport verified
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Box 3: STUDENT GITHUB SYNC & WORKFLOW */}
              <div className="rounded-2xl bg-white dark:bg-[#0b1224] border border-slate-200 dark:border-slate-800 p-4 space-y-2.5 shadow-xs transition-colors">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5 text-slate-900 dark:text-white">
                    <GitBranch size={13} className="text-emerald-600 dark:text-emerald-400" />
                    <span>Student GitHub Push</span>
                  </span>
                  <span className="font-mono text-slate-500">{lastSyncTime}</span>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between gap-2">
                  <span className="truncate text-emerald-700 dark:text-emerald-400">
                    git commit -m &quot;{activeLesson.githubWorkflow?.commitMessage || 'Day ' + activeLabDay}&quot;
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSyncNow}
                    disabled={isSyncing}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
                  >
                    {isSyncing ? <RefreshCw size={12} className="animate-spin" /> : <GitBranch size={12} />}
                    <span>{isSyncing ? "Verifying..." : "[Sync & Verify]"}</span>
                  </button>

                  <Link
                    href={`/bca/practical/${activeLesson.slug}`}
                    className="py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono transition-colors flex items-center gap-1"
                  >
                    <span>Full Lab</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>

            </div>

          </div>

          {/* Desktop Bottom Day Navigation */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800/80 text-xs font-mono">
            <button
              onClick={() => setActiveLabDay(Math.max(1, activeLabDay - 1))}
              disabled={activeLabDay <= 1}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                activeLabDay <= 1
                  ? 'border-slate-200/50 dark:border-slate-800/50 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs'
              }`}
            >
              <ArrowLeft size={13} />
              <span>Previous Day</span>
            </button>

            <span className="text-slate-500 text-[11px]">
              Authored by <strong className="text-slate-700 dark:text-slate-400">Er. Manoj Kumar</strong> • Nextsem Academy
            </span>

            <button
              onClick={() => setActiveLabDay(Math.min(30, activeLabDay + 1))}
              disabled={activeLabDay >= 30}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                activeLabDay >= 30
                  ? 'border-slate-200/50 dark:border-slate-800/50 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                  : 'border-emerald-500/40 bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-xs'
              }`}
            >
              <span>Next Day</span>
              <ArrowRight size={13} />
            </button>
          </div>

        </main>

      </div>


      {/* ════════════════════════════════════════════════════════════════
          3. MOBILE VIEWPORT: SIMPLIFIED DAILY PRACTICAL STUDIO
          (Visible on mobile < md, Hidden on desktop)
      ════════════════════════════════════════════════════════════════ */}
      <div className="block md:hidden flex-1 p-4 pb-28 space-y-4 bg-slate-100 dark:bg-transparent transition-colors">
        
        {/* Mobile Header Title & Active Semester Pill */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              BCA Practical Studio
            </h1>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-mono">
              Day {activeLabDay} of 360 • Semester 1
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-emerald-500/40 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-2xs">
            <span className="text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">Active</span>
            <span>Sem 1</span>
            <ChevronDown size={13} className="text-emerald-700 dark:text-emerald-400" />
          </div>
        </div>

        {/* Mobile Swipeable Sprint Switcher & Day Pill Carousel */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {ACTIVE_SPRINTS.map((sprint) => (
              <button
                key={sprint.id}
                type="button"
                onClick={() => {
                  setSelectedSprintId(sprint.id);
                  setExpandedSprintId(sprint.id);
                  setActiveLabDay(sprint.startDay);
                  setEditorTab('code');
                }}
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1 ${
                  selectedSprintId === sprint.id
                    ? 'bg-emerald-500 text-black shadow-xs font-black'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <span>{sprint.icon}</span>
                <span>{sprint.name}</span>
              </button>
            ))}
            <Link
              href="/bca/practical"
              className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 shrink-0"
            >
              All 360 Days »
            </Link>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {currentSprintDays.map((d) => {
              const isActive = activeLabDay === d.day;
              const isDone = completedDays.includes(d.day);
              return (
                <button
                  key={d.day}
                  onClick={() => {
                    setActiveLabDay(d.day);
                    setEditorTab('code');
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/30'
                      : isDone
                      ? 'bg-white dark:bg-slate-900 border border-emerald-500/40 text-emerald-700 dark:text-emerald-400 shadow-2xs'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 shadow-2xs'
                  }`}
                >
                  <span>{d.icon} Day {d.day}</span>
                  {isDone && <Check size={11} className="stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Card 1: Daily Guided Practical Lab */}
        <div className="rounded-3xl bg-white dark:bg-[#0c1328] border border-slate-200 dark:border-slate-800 p-4 space-y-3 shadow-md transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
            <span className="text-emerald-700 dark:text-emerald-400 font-bold font-mono">Day {activeLabDay} Lab</span>
            <span className="text-[10px] font-mono">{activeLesson.category}</span>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-slate-900 dark:text-white line-clamp-1">
              {activeLesson.title}
            </h2>
            <span className="text-emerald-700 dark:text-emerald-400 font-black font-mono text-xs">{progressPercent}%</span>
          </div>

          {/* Simple Progress Bar */}
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">
            {completedStepsForDay} of 3 Tasks Done
          </div>

          {/* 3 Step Sequence Pills */}
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((stepNum) => {
              const isDone = !!checkedTasks[`${activeLabDay}_${stepNum}`];
              return (
                <button
                  key={stepNum}
                  type="button"
                  onClick={() => toggleTask(stepNum)}
                  className={`py-1.5 text-center font-mono font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    isDone 
                      ? 'bg-emerald-500 text-black shadow-xs' 
                      : 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span>Step {stepNum}</span>
                  {isDone && <Check size={11} className="stroke-[3]" />}
                </button>
              );
            })}
          </div>

          {/* Embedded Output / Starter Code Box */}
          <div className="rounded-2xl bg-slate-950 dark:bg-[#070c18] border border-slate-800 p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Terminal size={12} className="text-emerald-400" />
                <span>Live Browser &amp; Terminal</span>
              </span>
              <button
                onClick={() => setEditorTab(editorTab === 'code' ? 'preview' : 'code')}
                className="text-[10px] font-mono text-emerald-400 font-bold hover:underline"
              >
                [{editorTab === 'code' ? 'View Output' : 'View Code'}]
              </button>
            </div>

            {editorTab === 'code' ? (
              <pre className="font-mono text-[11px] leading-relaxed text-slate-300 overflow-x-auto p-1 max-h-36">
                <code>
                  {activeLesson.day === 1 ? (
                    <>
                      <span className="text-purple-400 font-bold">&lt;!DOCTYPE html&gt;</span><br />
                      <span className="text-cyan-400">&lt;html lang=&quot;en&quot;&gt;</span><br />
                      <span className="text-emerald-400 font-bold">&lt;h1&gt;</span>Hello Nextsem<span className="text-emerald-400 font-bold">&lt;/h1&gt;</span><br />
                      <span className="text-emerald-400 font-bold">&lt;p&gt;</span>My first webpage!<span className="text-emerald-400 font-bold">&lt;/p&gt;</span>
                    </>
                  ) : (
                    activeLesson.teacherDemo?.code || activeLesson.practicalLab?.initialCode
                  )}
                </code>
              </pre>
            ) : (
              <div className="p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl space-y-1">
                <div className="text-xs font-black text-slate-900 dark:text-white">
                  {activeLesson.day === 1 ? 'Hello Nextsem Developer' : activeLesson.title}
                </div>
                <div className="text-[10px] text-slate-600 dark:text-slate-400">
                  Rendered live in W3C Standards mode (Chrome / WebView)
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card 2: Daily Viva Voce MCQ */}
        <div className="rounded-3xl bg-white dark:bg-[#0c1328] border border-slate-200 dark:border-slate-800 p-4 space-y-3 shadow-md transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
              <span>🎓</span> Instant Viva Check (Day {activeLabDay})
            </span>
            <span className="font-mono text-emerald-700 dark:text-emerald-400 text-[10px]">Exam Prep</span>
          </div>

          <p className="text-xs font-semibold text-slate-900 dark:text-slate-200 leading-snug">
            {activeLesson.vivaCheck?.question || 'Why is <!DOCTYPE html> required at the first line?'}
          </p>

          {/* Radio Options */}
          <div className="space-y-1.5 pt-1 text-xs">
            {(activeLesson.vivaCheck?.options || [
              'Signals standards mode rendering',
              'Forces stylesheet compilation',
              'Injects TLS certificates',
              'Required only on Android'
            ]).map((opt, idx) => {
              const isSelected = currentVivaSelected === idx;
              const isCorrect = idx === activeLesson.vivaCheck?.correctAnswer;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleVivaSelect(idx)}
                  className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition-all ${
                    isSelected
                      ? isCorrect
                        ? "bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-500/40"
                        : "bg-rose-500/20 text-rose-800 dark:text-rose-300 font-bold border border-rose-500/40"
                      : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-transparent"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected 
                      ? isCorrect ? "border-emerald-400 bg-emerald-500 text-black" : "border-rose-400 bg-rose-500 text-white" 
                      : "border-slate-300 dark:border-slate-600"
                  }`}>
                    {isSelected && <span className="text-[10px] font-bold">✓</span>}
                  </div>
                  <span className="text-[11px] leading-tight">{['A', 'B', 'C', 'D'][idx]}. {opt}</span>
                </button>
              );
            })}
          </div>

          {currentVivaSelected !== null && (
            <div className={`p-2 rounded-xl text-[11px] border ${
              isVivaCorrect 
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30' 
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-500/30'
            }`}>
              {isVivaCorrect ? '🎉 Correct! ' : '💡 Tip: '}
              {activeLesson.vivaCheck?.explanation}
            </div>
          )}
        </div>

        {/* Card 3: Floating / Sticky Bottom Sheet: Student GitHub Sync */}
        <div className="rounded-3xl bg-white/95 dark:bg-[#0c1328]/95 border border-slate-200 dark:border-slate-800/90 p-4 space-y-2.5 shadow-2xl backdrop-blur-md transition-colors">
          <div className="w-8 h-1 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto" />

          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <GitBranch size={13} className="text-emerald-600 dark:text-emerald-400" />
              <span>Student GitHub Push</span>
            </h3>
            <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">Verified</span>
          </div>

          <div className="text-[11px] font-mono text-slate-700 dark:text-slate-300 truncate">
            Commit: <span className="text-emerald-700 dark:text-emerald-400 font-bold">&quot;{activeLesson.githubWorkflow?.commitMessage || 'feat: day ' + activeLabDay}&quot;</span>
          </div>

          {/* Action Link to Full Practical Day */}
          <Link
            href={`/bca/practical/${activeLesson.slug}`}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/30 transition-transform active:scale-95 cursor-pointer"
          >
            <span>{activeLabDay === 1 ? "⚡ Launch Day 1 Interactive Studio" : `Open Day ${activeLabDay} Full Lesson`}</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>


      {/* ════════════════════════════════════════════════════════════════
          4. MOBILE BOTTOM NAVIGATION (Matches exact mockup icons)
      ════════════════════════════════════════════════════════════════ */}
      <nav className="fixed left-0 right-0 bottom-0 z-40 md:hidden bg-white/95 dark:bg-[#070c18]/95 border-t border-slate-200 dark:border-slate-800 backdrop-blur-xl py-2 px-4 transition-colors">
        <div className="flex items-center justify-around max-w-md mx-auto text-[10px] font-semibold text-slate-600 dark:text-slate-400">
          <Link href="/" className="flex flex-col items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors">
            <span className="text-sm">🏠</span>
            <span>Home</span>
          </Link>

          <Link href="/bca" className="flex flex-col items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors">
            <span className="text-sm">📁</span>
            <span>Projects</span>
          </Link>

          {/* Active *Coding Lab Tab */}
          <Link href="/bca/practical" className="flex flex-col items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
            <span className="text-base text-emerald-600 dark:text-emerald-400 font-black">✳️</span>
            <span>*Coding</span>
          </Link>

          <Link href="/cbt" className="flex flex-col items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors">
            <span className="text-sm">🤍</span>
            <span>Viva</span>
          </Link>

          <button onClick={openProfileDashboard} className="flex flex-col items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors">
            <span className="text-sm">👤</span>
            <span>Profile</span>
          </button>
        </div>
      </nav>

    </div>
  );
}
