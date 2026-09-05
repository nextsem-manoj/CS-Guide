"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ChevronRight, ChevronDown, Check, ArrowLeft,
  PanelLeftClose, PanelLeftOpen, GripVertical,
  BookOpen, Terminal, FileText, Globe, Layers,
  Image, Video, List, FormInput, Cpu, Home,
  Command, Monitor, GitBranch, GitMerge, GitCommit, Upload, Download, Search, Award
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { coursePhases } from '../data/courseData';
import { htmlLessons } from '../data/htmlLessonsData';
import { cliLessons } from '../data/cliLessonsData';
import searchIndex from '../data/searchIndex.json';
import { getChapterIdFromPath, getChapterUrl } from '../lib/htmlLessonsHelper';

// Map phase id → color/title
const phaseColorMap: Record<string, string> = {};
const phaseTitleMap: Record<string, string> = {};
coursePhases.forEach((p) => {
  phaseColorMap[p.id] = p.bulletColor;
  phaseTitleMap[p.id] = p.title;
});

type Chapter = { id: string; title: string; phaseKey: string };
type PhaseGroup = { key: string; label: string; color: string; chapters: Chapter[] };

const phaseGroups: PhaseGroup[] = [];
searchIndex.forEach((item) => {
  const phaseKey = item.phase.split('.')[0];
  let group = phaseGroups.find((g) => g.key === phaseKey);
  if (!group) {
    group = { key: phaseKey, label: phaseTitleMap[phaseKey] ?? phaseKey, color: phaseColorMap[phaseKey] ?? '#3b82f6', chapters: [] };
    phaseGroups.push(group);
  }
  group.chapters.push({ id: item.id, title: `${item.phase}: ${item.title.split(': ').slice(1).join(': ') || item.title}`, phaseKey });
});

// Module icon mapping for collapsed mode
const MODULE_ICONS = [Globe, FileText, Layers, BookOpen, ChevronRight, Image, Video, List, FormInput, Cpu];
const CLI_ICONS = [Home, Terminal, Monitor, Command, Layers, FileText, Globe, List, BookOpen, Cpu, FormInput, Monitor, Globe, Layers, Terminal];

// Git simulator steps (same 40 as GitClient.tsx)
const GIT_SIDEBAR_STEPS = [
  { id: 'init', title: 'Initialize Repo', icon: GitBranch },
  { id: 'status', title: 'Check Status', icon: Search },
  { id: 'add', title: 'Stage Files', icon: FileText },
  { id: 'commit', title: 'Commit Changes', icon: GitCommit },
  { id: 'branch', title: 'Rename Branch', icon: GitBranch },
  { id: 'remote', title: 'Add Remote', icon: Globe },
  { id: 'push', title: 'Push to Origin', icon: Upload },
  { id: 'checkout-b', title: 'Create & Switch Branch', icon: GitBranch },
  { id: 'merge', title: 'Merge Branches', icon: GitMerge },
  { id: 'pull', title: 'Pull Remote Changes', icon: Download },
  { id: 'stash', title: 'Stash Changes', icon: Layers },
  { id: 'stash-pop', title: 'Pop Stash', icon: Layers },
  { id: 'log', title: 'View Commit Log', icon: List },
  { id: 'log-oneline', title: 'Compact Log', icon: List },
  { id: 'revert', title: 'Revert Commit', icon: GitCommit },
  { id: 'reset-soft', title: 'Soft Reset', icon: GitCommit },
  { id: 'reset-hard', title: 'Hard Reset', icon: GitCommit },
  { id: 'diff', title: 'View Diff', icon: FileText },
  { id: 'tag', title: 'Create Tag', icon: Award },
  { id: 'clone', title: 'Clone Repository', icon: Download },
  { id: 'fork-contribute', title: 'Fork & Contribute', icon: GitBranch },
  { id: 'rebase', title: 'Rebase Branch', icon: GitMerge },
  { id: 'squash', title: 'Squash Commits', icon: GitCommit },
  { id: 'ignore', title: '.gitignore Setup', icon: FileText },
  { id: 'config-name', title: 'Config Username', icon: Command },
  { id: 'config-email', title: 'Config Email', icon: Command },
  { id: 'remote-v', title: 'List Remotes', icon: Globe },
  { id: 'branch-list', title: 'List Branches', icon: GitBranch },
  { id: 'branch-del', title: 'Delete Branch', icon: GitBranch },
  { id: 'fetch-origin', title: 'Fetch Remote', icon: Download },
  { id: 'track-remote', title: 'Track Remote Branch', icon: GitBranch },
  { id: 'clean-df', title: 'Clean Untracked', icon: Terminal },
  { id: 'branch-all', title: 'All Branches', icon: GitBranch },
  { id: 'diff-staged', title: 'Staged Diff', icon: FileText },
  { id: 'checkout-discard', title: 'Discard Changes', icon: GitCommit },
  { id: 'cherry-pick', title: 'Cherry Pick', icon: GitCommit },
  { id: 'remote-rename', title: 'Rename Remote', icon: Globe },
  { id: 'remote-remove', title: 'Remove Remote', icon: Globe },
  { id: 'push-force', title: 'Force Push', icon: Upload },
  { id: 'shortlog', title: 'Author Shortlog', icon: List },
  { id: 'reflog', title: 'Reference Log', icon: List },
];


interface BookSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  sidebarWidth: number;
  onWidthChange: (w: number) => void;
  isCollapsed: boolean;
  onCollapsedChange: (c: boolean) => void;
}

const BookSidebar = ({ isOpen, setIsOpen, sidebarWidth, onWidthChange, isCollapsed, onCollapsedChange }: BookSidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { completedChapters } = useProgress();

  const activeChapterId = getChapterIdFromPath(pathname);
  const activePhaseKey = phaseGroups.find((g) =>
    g.chapters.some((c) => c.id === activeChapterId)
  )?.key ?? phaseGroups[0]?.key ?? '';

  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(() => new Set([activePhaseKey]));
  const [completedHtmlLessons, setCompletedHtmlLessons] = useState<Set<number>>(new Set());
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());

  const isResizing = useRef(false);
  const dragStartX = useRef(0);
  const dragStartWidth = useRef(0);

  const htmlModules = [
    { id: 1, title: "Web Fundamentals & Client-Server", range: [1, 10] },
    { id: 2, title: "Document Structure & Metadata", range: [11, 20] },
    { id: 3, title: "Structural Text & Layout Elements", range: [21, 30] },
    { id: 4, title: "Semantic Content & Modifications", range: [31, 40] },
    { id: 5, title: "Navigation & Hyperlinks", range: [41, 50] },
    { id: 6, title: "Multimedia & Art Direction", range: [51, 60] },
    { id: 7, title: "Native Audio, Video & Embeds", range: [61, 70] },
    { id: 8, title: "Lists, Tables & Layout Grids", range: [71, 80] },
    { id: 9, title: "Interactive Forms & Inputs", range: [81, 90] },
    { id: 10, title: "Advanced Semantics & APIs", range: [91, 100] }
  ].map(mod => ({
    ...mod,
    lessons: htmlLessons.filter(l => l.id >= mod.range[0] && l.id <= mod.range[1])
  }));

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nextsem_user");
      let email = "guest";
      if (saved) { try { const u = JSON.parse(saved); if (u?.email) email = u.email; } catch {} }
      const completed = new Set<number>();
      for (let id = 1; id <= 100; id++) {
        if (localStorage.getItem(`nextsem_html_completed_${email}_${id}`) === "true") completed.add(id);
      }
      setCompletedHtmlLessons(completed);
    }
  }, [pathname]);

  useEffect(() => {
    const currentLesson = htmlLessons.find(l => pathname.endsWith(`/${l.slug}`) || (pathname === '/html' && l.id === 1));
    if (currentLesson) {
      const activeModId = Math.floor((currentLesson.id - 1) / 10) + 1;
      setExpandedModules(prev => new Set([...prev, activeModId]));
    }
  }, [pathname]);

  useEffect(() => {
    if (activePhaseKey) setTimeout(() => setExpandedPhases(prev => new Set([...prev, activePhaseKey])), 0);
  }, [activePhaseKey]);

  const toggleModule = (modId: number) =>
    setExpandedModules(prev => { const n = new Set(prev); n.has(modId) ? n.delete(modId) : n.add(modId); return n; });

  // ── Drag-to-resize handlers ──────────────────────────────────────────
  const handleDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    dragStartX.current = e.clientX;
    dragStartWidth.current = sidebarWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [sidebarWidth]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isResizing.current) return;
      const delta = e.clientX - dragStartX.current;
      const newWidth = Math.max(180, Math.min(480, dragStartWidth.current + delta));
      onWidthChange(newWidth);
    };
    const onUp = () => {
      if (!isResizing.current) return;
      isResizing.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
  }, [onWidthChange]);

  const SIDEBAR_COLLAPSED_WIDTH = 52;
  const effectiveWidth = isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : sidebarWidth;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-30 animate-in fade-in duration-200" />
      )}

      {/* ── Sidebar Panel ── */}
      <aside
        style={{ width: `${effectiveWidth}px` }}
        className={`
          fixed top-[50px] md:top-[92px] left-0 md:left-[5vw] h-[calc(100vh-50px)] md:h-[calc(100vh-92px)]
          bg-[#15202b] text-white border-r border-slate-700/60 shadow-2xl md:shadow-xl
          transition-[width,transform,opacity] duration-300 z-50 md:z-30 overflow-y-auto overflow-x-hidden shrink-0 select-none
          ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 md:translate-x-0 md:opacity-100'}
        `}
      >
        <div className={`${isCollapsed ? 'px-1.5 pt-3 pb-2' : 'px-4 pt-3 pb-2'} flex flex-col h-full`}>

          {/* ── Top Controls Row ── */}
          <div className={`flex items-center ${isCollapsed ? 'flex-col gap-2' : 'justify-between gap-2'} mb-4`}>
            {/* Back to dashboard */}
            {!isCollapsed && (
              <button
                onClick={() => {
                  if (window.opener || window.history.length === 1) window.close();
                  else router.push(activePhaseKey === 'P1' ? '/html' : '/');
                }}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer group"
                title="Return to Dashboard"
              >
                <ArrowLeft size={14} className="stroke-[2.5]" />
                <span className="uppercase tracking-wider text-[10px]">Dashboard</span>
              </button>
            )}
            {isCollapsed && (
              <button
                onClick={() => {
                  if (window.opener || window.history.length === 1) window.close();
                  else router.push(activePhaseKey === 'P1' ? '/html' : '/');
                }}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors cursor-pointer"
                title="Dashboard"
              >
                <ArrowLeft size={16} />
              </button>
            )}

            {/* Expand/Collapse toggle */}
            <button
              onClick={() => onCollapsedChange(!isCollapsed)}
              className={`p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0 ${isCollapsed ? 'w-8 h-8 flex items-center justify-center' : ''}`}
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
            </button>
          </div>

          {/* ── Logo/Tutorial Header Box ── */}
          {(() => {
            const isHtml = activePhaseKey === 'P1';
            const isCli = activePhaseKey === 'P0';
            const isGit = pathname.startsWith('/git');
            return (
              <div className={`mb-3 text-left border-b border-slate-800/60 pb-3 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
                <div className={`flex ${isCollapsed ? 'flex-col items-center gap-1' : 'items-center gap-2.5'} mb-2`}>
                  <div className="w-8 h-8 rounded-lg bg-[#04AA6D] text-white flex items-center justify-center font-black text-xs shadow-md shrink-0">
                    {isHtml ? "5" : isCli ? "⌘" : isGit ? "🐙" : "NS"}
                  </div>
                  {!isCollapsed && (
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-[#04AA6D] block">Tutorial</span>
                      <h3 className="text-sm font-extrabold text-white tracking-tight leading-tight">
                        {isHtml ? "HTML5 Tutorial" : isCli ? "Windows CLI" : isGit ? "Git Version Control" : "Nextsem"}
                      </h3>
                    </div>
                  )}
                </div>

                {!isCollapsed && isHtml && (
                  <div className="flex flex-col gap-1.5 mt-2">
                    <Link href="/html/tags" onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-3 py-1.5 bg-blue-950/40 border border-blue-800/40 text-blue-300 hover:bg-blue-900/40 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer">
                      <span>🏷️ All HTML Tags</span>
                      <span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-bold">115+</span>
                    </Link>
                    <Link href="/html/quiz" onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-3 py-1.5 bg-[#04AA6D]/15 border border-[#04AA6D]/40 text-[#04AA6D] hover:bg-[#04AA6D]/25 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer">
                      <span>📝 Take HTML Quiz</span>
                      <span className="text-[9px] bg-[#04AA6D] text-white px-1.5 py-0.5 rounded font-bold">100 Qs</span>
                    </Link>
                  </div>
                )}
                {!isCollapsed && isCli && (
                  <Link href="/cli/quiz" onClick={() => setIsOpen(false)}
                    className="mt-2 flex items-center justify-between px-3 py-1.5 bg-[#04AA6D]/15 border border-[#04AA6D]/40 text-[#04AA6D] hover:bg-[#04AA6D]/25 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer">
                    <span>💻 Take CLI Quiz</span>
                    <span className="text-[9px] bg-[#04AA6D] text-white px-1.5 py-0.5 rounded font-bold">Start</span>
                  </Link>
                )}
              </div>
            );
          })()}

          {/* ── Lesson List ── */}
          <nav className="flex flex-col gap-2 flex-1">
            {pathname.startsWith('/git') ? (
              /* Git Steps */
              isCollapsed ? (
                <div className="flex flex-col items-center gap-1.5">
                  {GIT_SIDEBAR_STEPS.map((step, idx) => {
                    const Icon = step.icon;
                    const isActive = idx === 0; // GitClient manages active idx internally
                    return (
                      <Link key={step.id} href="/git" title={step.title}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isActive ? 'bg-[#39FF14]/20 text-[#39FF14]' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                        <Icon size={15} />
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col gap-0.5 text-left">
                  <span className="px-2 py-1 text-[11px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-800/60 mb-1 block">Git Commands (40)</span>
                  {GIT_SIDEBAR_STEPS.map((step, idx) => {
                    const Icon = step.icon;
                    return (
                      <Link key={step.id} href="/git"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold text-slate-300 hover:bg-slate-800/60 hover:text-white transition-all">
                        <Icon size={12} className="shrink-0 text-slate-500" />
                        <span className="truncate flex-1 text-left">{idx + 1}. {step.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )
            ) : activePhaseKey === 'P1' ? (
              /* HTML Modules */
              isCollapsed ? (
                /* Collapsed: icon-only dots per module */
                <div className="flex flex-col items-center gap-1.5">
                  {htmlModules.map((mod, mi) => {
                    const Icon = MODULE_ICONS[mi] ?? BookOpen;
                    const hasActive = mod.lessons.some(l => pathname.endsWith(`/${l.slug}`) || (pathname === '/html' && l.id === 1));
                    return (
                      <button
                        key={mod.id}
                        onClick={() => { onCollapsedChange(false); }}
                        title={mod.title}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${hasActive ? 'bg-[#04AA6D] text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                      >
                        <Icon size={15} />
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* Expanded: full module+lesson list */
                <div className="flex flex-col gap-3">
                  {htmlModules.map((mod, mi) => {
                    const Icon = MODULE_ICONS[mi] ?? BookOpen;
                    const isModExp = expandedModules.has(mod.id);
                    return (
                      <div key={mod.id} className="flex flex-col gap-0.5 text-left">
                        <button
                          onClick={() => toggleModule(mod.id)}
                          className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-black uppercase tracking-wider text-slate-400 hover:text-white border-b border-slate-800/60 mb-0.5 w-full text-left transition-colors cursor-pointer"
                        >
                          <Icon size={11} className="shrink-0" />
                          <span className="flex-1 truncate">{mod.title}</span>
                          {isModExp ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
                        </button>

                        {isModExp && (
                          <div className="flex flex-col gap-0.5">
                            {mod.lessons.map((lesson) => {
                              const isLActive = pathname.endsWith(`/${lesson.slug}`) || (pathname === '/html' && lesson.id === 1);
                              const isLCompleted = completedHtmlLessons.has(lesson.id);
                              const cleanTitle = lesson.id === 1 ? "HTML Home" :
                                `HTML ${lesson.title.replace(/^(Lesson\s+\d+:|Learn HTML5?|Introduction to|What is|How)\s*/i, '').replace(/\s*-\s*Free Web Development.*$/i, '').replace(/\s*-\s*Comprehensive Guide.*$/i, '').trim()}`;
                              return (
                                <Link key={lesson.id}
                                  href={lesson.id === 1 ? '/html' : `/html/${lesson.slug}`}
                                  className={`flex items-center justify-between px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${isLActive ? 'bg-[#04AA6D] text-white font-extrabold shadow-sm' : isLCompleted ? 'text-emerald-400 hover:bg-slate-800/60' : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'}`}
                                >
                                  <span className="truncate flex-1 text-left">{cleanTitle}</span>
                                  {isLCompleted && <Check size={12} className="text-emerald-400 shrink-0 ml-1.5 stroke-[3]" />}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )
            ) : activePhaseKey === 'P0' ? (
              /* CLI Lessons */
              isCollapsed ? (
                <div className="flex flex-col items-center gap-1.5">
                  {cliLessons.map((l: any, li: number) => {
                    const Icon = CLI_ICONS[li] ?? Terminal;
                    const isLActive = pathname.endsWith(`/${l.slug}`) || (pathname === '/cli' && l.id === 1);
                    return (
                      <Link key={l.id} href={l.id === 1 ? '/cli' : `/cli/${l.slug}`} title={l.title}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isLActive ? 'bg-[#04AA6D] text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                        <Icon size={15} />
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col gap-0.5 text-left">
                  <span className="px-2 py-1 text-[11px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-800/60 mb-1 block">CMD Fundamentals</span>
                  {cliLessons.map((l: any) => {
                    const isLActive = pathname.endsWith(`/${l.slug}`) || (pathname === '/cli' && l.id === 1);
                    const isLCompleted = completedHtmlLessons.has(l.id);
                    const cleanTitle = l.id === 1 ? "CLI Home" : `CLI ${l.title.replace(/^(Lesson\s+\d+:|Learn CLI|Introduction to|What is|How)\s*/i, '').trim()}`;
                    return (
                      <Link key={l.id} href={l.id === 1 ? '/cli' : `/cli/${l.slug}`}
                        className={`flex items-center justify-between px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${isLActive ? 'bg-[#04AA6D] text-white font-extrabold shadow-sm' : isLCompleted ? 'text-emerald-400 hover:bg-slate-800/60' : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'}`}>
                        <span className="truncate flex-1 text-left">{cleanTitle}</span>
                        {isLCompleted && <Check size={12} className="text-emerald-400 shrink-0 ml-1.5 stroke-[3]" />}
                      </Link>
                    );
                  })}
                </div>
              )
            ) : (
              /* Other courses */
              (() => {
                const currentGroup = phaseGroups.find((g) => g.key === activePhaseKey) || phaseGroups[0];
                if (!currentGroup) return null;
                return currentGroup.chapters.map((chapter) => {
                  const isActive = activeChapterId === chapter.id;
                  const isCompleted = !!completedChapters[chapter.id];
                  if (isCollapsed) {
                    return (
                      <Link key={chapter.id} href={getChapterUrl(chapter.id)} title={chapter.title}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto transition-all ${isActive ? 'bg-[#04AA6D] text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
                        <span className="text-[10px] font-black">{chapter.id.slice(-2)}</span>
                      </Link>
                    );
                  }
                  return (
                    <Link key={chapter.id} href={getChapterUrl(chapter.id)}
                      className={`flex items-start justify-between px-3 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all group/ch ${isActive ? 'bg-[#04AA6D] text-white font-extrabold shadow-md' : isCompleted ? 'text-emerald-300 hover:bg-emerald-950/30' : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'}`}>
                      <div className="flex items-start gap-2.5 flex-1 min-w-0">
                        {isCompleted ? (
                          <span className="shrink-0 mt-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500"><Check size={10} className="text-white stroke-[3]" /></span>
                        ) : isActive ? (
                          <span className="w-4 shrink-0 font-black text-center text-white text-xs">•</span>
                        ) : (
                          <span className="shrink-0 mt-1 w-3.5 h-3.5 rounded-full border border-slate-600/80" />
                        )}
                        <span className="truncate flex-1 text-left leading-snug">{chapter.title}</span>
                      </div>
                    </Link>
                  );
                });
              })()
            )}
          </nav>
        </div>

        {/* ── Drag Handle (right edge, desktop only) ── */}
        <div
          onMouseDown={handleDragStart}
          className={`absolute top-0 right-0 w-1.5 h-full cursor-col-resize group hover:w-2 transition-all hidden md:flex items-center justify-center ${isCollapsed ? 'hidden' : ''}`}
          title="Drag to resize sidebar"
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-0.5">
            <GripVertical size={14} className="text-slate-500" />
          </div>
          <div className="absolute inset-y-0 right-0 w-px bg-slate-700/60 group-hover:bg-emerald-500/60 transition-colors" />
        </div>
      </aside>
    </>
  );
};

export default BookSidebar;
