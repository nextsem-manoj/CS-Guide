"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  Lock, 
  ChevronDown, 
  ChevronRight, 
  Search, 
  Sparkles, 
  BookOpen, 
  Compass, 
  Flame, 
  ExternalLink,
  Layers,
  GraduationCap,
  FolderGit2,
  Check
} from "lucide-react";
import { PracticalLesson, PRACTICAL_LESSONS } from "@/data/bcaPracticalData";
import { useStudentProgress } from "@/context/StudentProgressContext";

export interface PracticalSprintGroup {
  id: string;
  sprintNumber: number;
  title: string;
  shortTitle: string;
  daysRange: string;
  startDay: number;
  endDay: number;
  badge: string;
  isLive: boolean;
  milestone?: string;
}

export const PRACTICAL_SPRINT_GROUPS: PracticalSprintGroup[] = [
  {
    id: "sprint-1",
    sprintNumber: 1,
    title: "Sprint 1: Web Foundation & Semantic HTML5",
    shortTitle: "Sprint 1 • HTML5 Foundation",
    daysRange: "Days 1–10",
    startDay: 1,
    endDay: 10,
    badge: "Live • Foundation",
    isLive: true,
    milestone: "Student Profile & Semantic Markup"
  },
  {
    id: "sprint-2",
    sprintNumber: 2,
    title: "Sprint 2: Modern CSS Layouts, Grid & Flexbox",
    shortTitle: "Sprint 2 • CSS3 & Flexbox/Grid",
    daysRange: "Days 11–20",
    startDay: 11,
    endDay: 20,
    badge: "Live • Styling",
    isLive: true,
    milestone: "Responsive Holy Grail Layout & Portfolio"
  },
  {
    id: "sprint-3",
    sprintNumber: 3,
    title: "Sprint 3: JavaScript Core & Algorithmic Logic",
    shortTitle: "Sprint 3 • JavaScript Core",
    daysRange: "Days 21–30",
    startDay: 21,
    endDay: 30,
    badge: "Live • Logic",
    isLive: true,
    milestone: "Interactive Calculator & Data Processing"
  },
  {
    id: "sprint-4",
    sprintNumber: 4,
    title: "Sprint 4: DOM Events & Interactive Web Apps",
    shortTitle: "Sprint 4 • DOM & Web Apps",
    daysRange: "Days 31–40",
    startDay: 31,
    endDay: 40,
    badge: "Live • Interaction",
    isLive: true,
    milestone: "Todo App, Stopwatch & Mini Games"
  },
  {
    id: "sprint-5",
    sprintNumber: 5,
    title: "Sprint 5: APIs, Canvas 2D & SPA Capstone",
    shortTitle: "Sprint 5 • APIs & Capstone",
    daysRange: "Days 41–50",
    startDay: 41,
    endDay: 50,
    badge: "Live • Capstone",
    isLive: true,
    milestone: "Multi-Tool Single Page Application"
  },
  // ── ROADMAP SPRINTS (DAYS 51–360) ──
  {
    id: "sprint-6",
    sprintNumber: 6,
    title: "Sprint 6: Advanced Git Flow & Full-Stack Integration",
    shortTitle: "Sprint 6 • Git Flow & Full-Stack",
    daysRange: "Days 51–60",
    startDay: 51,
    endDay: 60,
    badge: "Upcoming • Sem 1",
    isLive: false,
    milestone: "Multi-Page Responsive Showcase with Git Flow"
  },
  {
    id: "sprint-7",
    sprintNumber: 7,
    title: "Sprint 7: C Programming & Pointer Memory Architecture",
    shortTitle: "Sprint 7 • C Programming & Memory",
    daysRange: "Days 61–90",
    startDay: 61,
    endDay: 90,
    badge: "Upcoming • Sem 2",
    isLive: false,
    milestone: "CLI Banking & Memory Engine in C"
  },
  {
    id: "sprint-8",
    sprintNumber: 8,
    title: "Sprint 8: Advanced JS, Async & SQL Databases",
    shortTitle: "Sprint 8 • Async JS & SQL",
    daysRange: "Days 91–120",
    startDay: 91,
    endDay: 120,
    badge: "Upcoming • Sem 2",
    isLive: false,
    milestone: "Relational Database Schema & Query Studio"
  },
  {
    id: "sprint-9",
    sprintNumber: 9,
    title: "Sprint 9: Data Structures & Algorithms (DSA)",
    shortTitle: "Sprint 9 • DSA & Algorithms",
    daysRange: "Days 121–180",
    startDay: 121,
    endDay: 180,
    badge: "Upcoming • Sem 3",
    isLive: false,
    milestone: "Linked Lists, Stacks, Queues & Trees"
  },
  {
    id: "sprint-10",
    sprintNumber: 10,
    title: "Sprint 10: Backend REST APIs & Systems Architecture",
    shortTitle: "Sprint 10 • REST APIs & Node.js",
    daysRange: "Days 181–240",
    startDay: 181,
    endDay: 240,
    badge: "Upcoming • Sem 4",
    isLive: false,
    milestone: "Production Node.js & Express API Engine"
  },
  {
    id: "sprint-11",
    sprintNumber: 11,
    title: "Sprint 11: Cloud Deployment, Docker & DevOps",
    shortTitle: "Sprint 11 • Cloud & Docker",
    daysRange: "Days 241–300",
    startDay: 241,
    endDay: 300,
    badge: "Upcoming • Sem 5",
    isLive: false,
    milestone: "Containerized Multi-Service Cloud Architecture"
  },
  {
    id: "sprint-12",
    sprintNumber: 12,
    title: "Sprint 12: Production Portfolio & Technical Viva Defense",
    shortTitle: "Sprint 12 • Capstone & Viva",
    daysRange: "Days 301–360",
    startDay: 301,
    endDay: 360,
    badge: "Upcoming • Sem 6",
    isLive: false,
    milestone: "Industry Job Readiness & Final Viva Voce"
  }
];

interface BcaPracticalSidebarProps {
  currentDay: number;
  className?: string;
}

export default function BcaPracticalSidebar({
  currentDay,
  className = ""
}: BcaPracticalSidebarProps) {
  const { completedDays, isDayCompleted, isDayUnlocked } = useStudentProgress();
  const [searchQuery, setSearchQuery] = useState("");
  const activeDayRef = useRef<HTMLAnchorElement | null>(null);

  // Determine which sprint contains the current day
  const currentSprintNumber = useMemo(() => {
    const found = PRACTICAL_SPRINT_GROUPS.find(
      s => currentDay >= s.startDay && currentDay <= s.endDay
    );
    return found ? found.sprintNumber : 1;
  }, [currentDay]);

  // Collapsible state for each sprint: default open the current sprint
  const [openSprints, setOpenSprints] = useState<Record<number, boolean>>(() => ({
    [currentSprintNumber]: true
  }));

  // Auto-scroll the active day item into view smoothly on mount
  useEffect(() => {
    if (activeDayRef.current) {
      activeDayRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, [currentDay]);

  const toggleSprint = (sprintNum: number) => {
    setOpenSprints(prev => ({
      ...prev,
      [sprintNum]: !prev[sprintNum]
    }));
  };

  const expandAllLive = () => {
    const nextState: Record<number, boolean> = {};
    PRACTICAL_SPRINT_GROUPS.forEach(s => {
      nextState[s.sprintNumber] = true;
    });
    setOpenSprints(nextState);
  };

  const collapseAll = () => {
    setOpenSprints({});
  };

  // Filter lessons based on search query
  const filteredLessonsBySprint = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const result: Record<number, PracticalLesson[]> = {};

    PRACTICAL_SPRINT_GROUPS.filter(s => s.isLive).forEach(sprint => {
      const sprintLessons = PRACTICAL_LESSONS.filter(
        l => l.day >= sprint.startDay && l.day <= sprint.endDay
      );

      if (!query) {
        result[sprint.sprintNumber] = sprintLessons;
      } else {
        result[sprint.sprintNumber] = sprintLessons.filter(l => 
          l.title.toLowerCase().includes(query) ||
          l.category.toLowerCase().includes(query) ||
          `day ${l.day}`.toLowerCase().includes(query) ||
          `${l.day}` === query
        );
      }
    });

    return result;
  }, [searchQuery]);

  // Overall stats
  const totalLiveDays = PRACTICAL_LESSONS.length;
  const completedCount = completedDays.length;
  const overallPercentage = Math.round((completedCount / (totalLiveDays || 1)) * 100);

  return (
    <aside 
      className={`flex flex-col bg-slate-50/90 dark:bg-black border-r border-slate-200 dark:border-neutral-800 text-black dark:text-white select-none transition-colors ${className}`}
      aria-label="Practical Curriculum Sprints & Lessons Navigation"
    >
      {/* ── Top Header / Overall Stats ── */}
      <div className="p-3.5 border-b border-slate-200 dark:border-neutral-800 shrink-0 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-xs shrink-0 border border-blue-500/30">
              <Layers size={14} />
            </div>
            <div className="min-w-0">
              <h2 className="text-xs font-black tracking-tight text-black dark:text-white truncate">
                BCA Practical Sprints
              </h2>
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 block truncate">
                50 Live Days • 12 Sprints Roadmap
              </span>
            </div>
          </div>
          <Link
            href="/bca/practical"
            className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 hover:underline px-2 py-1 rounded-md hover:bg-blue-50 dark:hover:bg-neutral-900 transition-colors shrink-0"
            title="Open Practical Hub Overview"
          >
            Hub ➔
          </Link>
        </div>

        {/* Progress Bar Mini Card */}
        <div className="bg-slate-100 dark:bg-neutral-900/90 rounded-xl p-2.5 border border-slate-200 dark:border-neutral-800">
          <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
            <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1">
              <Flame size={12} className="text-amber-500" />
              <span>Progress</span>
            </span>
            <span className="text-black dark:text-white font-extrabold font-mono">
              {completedCount} / {totalLiveDays} <span className="text-blue-600 dark:text-blue-400">({overallPercentage}%)</span>
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-500 rounded-full"
              style={{ width: `${Math.min(100, overallPercentage)}%` }}
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-2.5 relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Day or Topic (e.g. Flexbox, Day 14)..."
            className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-[11px] text-black dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-black dark:hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Toggle Expand / Collapse Controls */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/80 dark:border-neutral-800/80 text-[10px] text-slate-500 font-bold">
          <span>Sprints 1–5 (Live)</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={expandAllLive}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Expand All
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={collapseAll}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Collapse
            </button>
          </div>
        </div>
      </div>

      {/* ── Scrollable Sprints & Daily Lessons ── */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-2.5 custom-scrollbar">
        {/* 1. Live Sprints (1–5) */}
        {PRACTICAL_SPRINT_GROUPS.filter(s => s.isLive).map((sprint) => {
          const lessons = filteredLessonsBySprint[sprint.sprintNumber] || [];
          const isOpen = Boolean(openSprints[sprint.sprintNumber]) || Boolean(searchQuery.trim());
          const isCurrentSprint = sprint.sprintNumber === currentSprintNumber;

          // Sprint Completion calculation
          const sprintTotal = sprint.endDay - sprint.startDay + 1;
          const sprintDoneCount = Array.from(
            { length: sprintTotal },
            (_, i) => sprint.startDay + i
          ).filter(d => isDayCompleted(d)).length;
          const sprintDonePercent = Math.round((sprintDoneCount / sprintTotal) * 100);
          const isSprintFullyDone = sprintDoneCount === sprintTotal;

          if (searchQuery.trim() && lessons.length === 0) {
            return null; // hide empty sprint during search
          }

          return (
            <div 
              key={sprint.id}
              className={`rounded-xl border transition-all ${
                isCurrentSprint 
                  ? "border-blue-500/40 bg-blue-50/20 dark:bg-blue-950/10 shadow-xs" 
                  : "border-slate-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-950/40"
              }`}
            >
              {/* Sprint Header Accordion Button */}
              <button
                type="button"
                onClick={() => toggleSprint(sprint.sprintNumber)}
                className="w-full p-2.5 flex items-center justify-between text-left hover:bg-slate-100/60 dark:hover:bg-neutral-900/60 transition-colors rounded-xl cursor-pointer"
              >
                <div className="min-w-0 flex-1 pr-2">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] font-black font-mono text-blue-600 dark:text-blue-400">
                      {sprint.daysRange}
                    </span>
                    {isSprintFullyDone ? (
                      <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.2 rounded border border-emerald-500/30 flex items-center gap-0.5">
                        <Check size={9} /> Done
                      </span>
                    ) : sprintDoneCount > 0 ? (
                      <span className="text-[9px] font-bold text-slate-500 font-mono">
                        {sprintDoneCount}/{sprintTotal}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="text-xs font-black text-black dark:text-white truncate">
                    {sprint.shortTitle}
                  </h3>
                </div>

                <div className="shrink-0 text-slate-400 dark:text-slate-500">
                  <ChevronDown 
                    size={14} 
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
                  />
                </div>
              </button>

              {/* Sprint Lessons List */}
              {isOpen && (
                <div className="px-1.5 pb-2 pt-1 border-t border-slate-200/60 dark:border-neutral-800/60 space-y-1">
                  {lessons.map((l) => {
                    const isDone = isDayCompleted(l.day);
                    const isUnlocked = isDayUnlocked(l.day);
                    const isCurrent = l.day === currentDay;

                    return (
                      <Link
                        key={l.id}
                        ref={isCurrent ? activeDayRef : null}
                        href={`/bca/practical/${l.slug}`}
                        className={`group flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                          isCurrent
                            ? "bg-blue-600 text-white font-black shadow-xs ring-1 ring-blue-500"
                            : isDone
                              ? "text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-neutral-900 font-bold"
                              : isUnlocked
                                ? "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-neutral-900 font-medium"
                                : "text-slate-400 dark:text-slate-600 hover:bg-slate-100/50 dark:hover:bg-neutral-900/50 font-normal"
                        }`}
                        title={`Day ${l.day}: ${l.title}`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {/* Day Pill */}
                          <span className={`text-[10px] font-mono font-black px-1.5 py-0.5 rounded shrink-0 ${
                            isCurrent
                              ? "bg-white/20 text-white"
                              : isDone
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                : isUnlocked
                                  ? "bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-slate-300"
                                  : "bg-slate-100 dark:bg-neutral-900 text-slate-400 dark:text-slate-600"
                          }`}>
                            D{l.day}
                          </span>

                          {/* Lesson Title (Concise) */}
                          <span className="truncate text-[11px] leading-tight">
                            {l.title}
                          </span>
                        </div>

                        {/* Status Icon */}
                        <div className="shrink-0 flex items-center">
                          {isCurrent ? (
                            <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-white text-blue-600 shrink-0">
                              Active
                            </span>
                          ) : isDone ? (
                            <CheckCircle2 size={13} className="text-emerald-500 dark:text-emerald-400" />
                          ) : isUnlocked ? (
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-60 group-hover:opacity-100" />
                          ) : (
                            <Lock size={11} className="text-slate-400 dark:text-slate-600" />
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* 2. Upcoming Sprints Roadmap (Sprints 6 to 12) */}
        {!searchQuery && (
          <div className="pt-2">
            <div className="px-2 py-1 flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Compass size={11} />
                <span>Roadmap (Days 51–360)</span>
              </span>
              <span className="text-[9px] font-mono text-slate-400">7 Sprints</span>
            </div>

            <div className="mt-1.5 space-y-1.5">
              {PRACTICAL_SPRINT_GROUPS.filter(s => !s.isLive).map((sprint) => {
                const isOpen = Boolean(openSprints[sprint.sprintNumber]);

                return (
                  <div 
                    key={sprint.id}
                    className="rounded-xl border border-dashed border-slate-200 dark:border-neutral-800/80 bg-slate-50/40 dark:bg-neutral-950/20"
                  >
                    <button
                      type="button"
                      onClick={() => toggleSprint(sprint.sprintNumber)}
                      className="w-full p-2 flex items-center justify-between text-left hover:bg-slate-100/50 dark:hover:bg-neutral-900/40 rounded-xl transition-colors cursor-pointer"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[9px] font-mono font-bold text-slate-500">
                            {sprint.daysRange}
                          </span>
                          <span className="text-[8px] font-extrabold uppercase px-1 rounded bg-slate-200 dark:bg-neutral-800 text-slate-600 dark:text-slate-400">
                            {sprint.badge.split("•")[1] || "Roadmap"}
                          </span>
                        </div>
                        <h4 className="text-[11px] font-bold text-slate-700 dark:text-slate-300 truncate">
                          {sprint.shortTitle}
                        </h4>
                      </div>

                      <div className="shrink-0 text-slate-400">
                        <Lock size={11} />
                      </div>
                    </button>

                    {isOpen && sprint.milestone && (
                      <div className="px-2.5 pb-2 pt-1 border-t border-slate-200/50 dark:border-neutral-800/50 text-[10px] text-slate-500 dark:text-slate-400 leading-snug">
                        <span className="font-bold text-slate-600 dark:text-slate-300 block mb-0.5">
                          Capstone Milestone:
                        </span>
                        <span>{sprint.milestone}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom Faculty / Dashboard Quick Footer ── */}
      <div className="p-3 border-t border-slate-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-sm shrink-0 flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400">
        <Link 
          href="/dashboard"
          className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          title="Open Faculty Evaluation Dashboard"
        >
          <GraduationCap size={14} className="text-[#04AA6D]" />
          <span>Dashboard</span>
        </Link>
        <Link 
          href="/tests/sprint1"
          className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          title="Sprint 1 Technical Knowledge Check"
        >
          <Sparkles size={12} className="text-amber-500" />
          <span>Sprint 1 Test</span>
        </Link>
      </div>
    </aside>
  );
}
