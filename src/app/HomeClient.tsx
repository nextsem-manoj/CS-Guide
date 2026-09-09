"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useProgress } from '@/context/ProgressContext';
import { auth, signInWithGoogle } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import searchIndex from '@/data/searchIndex.json';
import { getChapterSimulator } from '@/data/chapterSimulators';
import { 
  Layers, Code, BookOpen, ChevronRight, Zap, 
  LogIn, LogOut, Terminal, Star, Search, X, 
  Sparkles, Compass, ArrowRight, GitBranch, Bot, 
  GraduationCap, FileText, Building2
} from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  photo?: string;
}

interface SearchItem {
  id: string;
  title: string;
  content: string;
  phase: string;
  duration: string;
  color: string;
  icon: string;
  url?: string;
  category?: string;
}

const POPULAR_SEARCH_CHIPS = [
  { label: 'BCS-111 Computer Basics', query: 'BCS-111' },
  { label: 'Windows CMD', query: 'CMD' },
  { label: 'BCS-012 Math', query: 'BCS-012' },
  { label: 'HTML5 Tags', query: 'HTML' },
  { label: 'MS Word 2021', query: 'Word' },
  { label: 'Flexbox & CSS', query: 'Flexbox' },
];

export default function HomeClient() {
  const router = useRouter();
  const { completedChapters } = useProgress();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchResults([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search filtering logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const cleanQuery = searchQuery.toLowerCase();
    const matches = (searchIndex as SearchItem[]).filter((item: SearchItem) => 
      item.title.toLowerCase().includes(cleanQuery) || 
      item.content.toLowerCase().includes(cleanQuery) ||
      (item.category && item.category.toLowerCase().includes(cleanQuery))
    ).slice(0, 6);
    setSearchResults(matches);
  }, [searchQuery]);

  // Auth state synchronization
  useEffect(() => {
    const handleAuthChange = () => {
      const saved = localStorage.getItem('nextsem_user');
      if (saved) {
        try {
          setCurrentUser(JSON.parse(saved));
        } catch (e) {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };
    handleAuthChange();
    window.addEventListener("nextsem_auth_changed", handleAuthChange);
    return () => window.removeEventListener("nextsem_auth_changed", handleAuthChange);
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error("Sign-In Error: ", err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("nextsem_user");
      window.dispatchEvent(new Event("nextsem_auth_changed"));
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  const handleLaunchItem = (itemOrId: string | SearchItem) => {
    let url = "";
    if (typeof itemOrId === "object" && itemOrId.url) {
      url = itemOrId.url;
    } else {
      const path = typeof itemOrId === "string" ? itemOrId : itemOrId.id;
      const matched = (searchIndex as SearchItem[]).find(s => s.id === path);
      if (matched?.url) {
        url = matched.url;
      } else if (path.startsWith("cli/") || path.startsWith("html/") || path.startsWith("msword/")) {
        url = `/${path}`;
      } else if (path === "cmd") {
        url = "/cmd";
      } else if (path === "p0-4-git") {
        url = "/git";
      } else {
        url = `/book/${path}`;
      }
    }

    const pathKey = typeof itemOrId === "string" ? itemOrId : itemOrId.id;
    const hasCode = pathKey === "cmd" || pathKey === "p0-4-git" || !!getChapterSimulator(pathKey);

    if (hasCode) {
      window.open(url, '_blank');
    } else {
      router.push(url);
    }
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      window.dispatchEvent(new CustomEvent("open-global-search", { 
        detail: { query: searchQuery.trim() } 
      }));
      setSearchResults([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#060c18] text-slate-100 flex flex-col font-sans selection:bg-[#c1a648]/30">
      
      {/* ── TOP NAVIGATION BAR ── */}
      <header className="sticky top-0 z-50 bg-[#060c18]/90 backdrop-blur-md border-b border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-[#0c1328] border border-emerald-500/40 flex items-center justify-center overflow-hidden shadow-md group-hover:scale-105 transition-transform p-0.5">
                <img src="/code-icon.png" alt="CS Guide Logo" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-black text-base tracking-tight text-white uppercase group-hover:text-emerald-400 transition-colors">
                  CS Guide
                </span>
                <span className="text-[10px] font-mono text-[#04AA6D] font-bold tracking-tight">
                  by NextSem
                </span>
              </div>
            </Link>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-1 text-xs font-bold text-slate-300">
              <Link href="/du" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800/80 hover:text-white transition-all">
                <Building2 size={14} className="text-blue-400" />
                <span>DU CS (NEP)</span>
              </Link>
              <Link href="/bca" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800/80 hover:text-white transition-all">
                <GraduationCap size={14} className="text-emerald-400" />
                <span>IGNOU BCA</span>
              </Link>
              <Link href="/mca" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800/80 hover:text-white transition-all">
                <Sparkles size={14} className="text-amber-400" />
                <span>IGNOU MCA</span>
              </Link>
              <Link href="/cmd" target="_blank" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800/80 hover:text-white transition-all">
                <Terminal size={14} className="text-cyan-400" />
                <span>Windows CMD</span>
              </Link>
              <Link href="/curriculum" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800/80 hover:text-white transition-all">
                <Compass size={14} className="text-purple-400" />
                <span>Curriculum</span>
              </Link>
            </nav>
          </div>

          {/* Quick Search Trigger & Auth */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-global-search"))}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-750 hover:border-emerald-500/50 text-slate-400 hover:text-white transition-all text-xs cursor-pointer"
              title="Search all lessons (Ctrl+K)"
            >
              <Search size={14} className="text-emerald-400" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden lg:inline-block text-[9px] bg-slate-800 border border-slate-700 px-1 py-0.5 rounded text-slate-400 font-mono">
                Ctrl+K
              </kbd>
            </button>

            {currentUser ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-xl">
                  {currentUser.photo ? (
                    <img src={currentUser.photo} alt="" className="w-5 h-5 rounded-full object-cover" />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-[#04AA6D] text-white flex items-center justify-center font-black text-[9px]">
                      {currentUser.name.charAt(0)}
                    </div>
                  )}
                  <span className="text-xs font-bold text-slate-200 hidden sm:inline max-w-[80px] truncate">
                    {currentUser.name.split(" ")[0]}
                  </span>
                </div>
                <button 
                  onClick={handleSignOut}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleSignIn}
                className="flex items-center gap-1.5 bg-[#04AA6D] hover:bg-[#039861] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-[#04AA6D]/20 cursor-pointer"
              >
                <LogIn size={13} />
                <span>Sign In</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* ── HERO SECTION: COMPLETE IGNOU BCA LESSONS (THEORY + PRACTICAL) ── */}
      <main className="relative py-10 sm:py-14 md:py-16 px-4 sm:px-6 flex flex-col items-center text-center overflow-hidden w-full max-w-5xl mx-auto">
        {/* Background glow effects */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[220px] bg-emerald-500/10 blur-[90px] rounded-full pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(#04AA6D_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="w-full max-w-3xl mx-auto relative z-10 space-y-4 sm:space-y-5">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-lg">
            <Sparkles size={13} className="text-[#c1a648]" />
            <span>100% Free University CS Hub • Author: Er. Manoj Kumar</span>
          </div>

          {/* 1. Complete CS Degree Lessons Headline */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              COMPUTER SCIENCE UNIVERSITY COURSES
            </h1>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold uppercase tracking-wide bg-gradient-to-r from-blue-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">
              DELHI UNIVERSITY (DU) & IGNOU (BCA / MCA)
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-medium max-w-xl mx-auto pt-0.5">
              Official UGCF & NEP Syllabi, Downloadable PDFs, Line-by-Line Textbook Notes & Interactive Simulators.
            </p>
          </div>

          {/* 2. Search Bar */}
          <div ref={searchRef} className="pt-0.5 max-w-2xl mx-auto relative">
            <form onSubmit={handleSearchSubmit} className="relative group">
              <div className="relative flex items-center bg-[#0c1328]/95 backdrop-blur-xl border-2 border-emerald-500/50 hover:border-emerald-400 focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-500/20 rounded-2xl shadow-2xl transition-all p-1.5 sm:p-2">
                <Search size={20} className="text-emerald-400 ml-3 shrink-0 group-focus-within:scale-110 transition-transform" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 500+ topics (e.g. BCS-111, Windows CMD, HTML5, Flexbox, Math)..."
                  className="w-full bg-transparent px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-white placeholder-slate-400 font-medium focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSearchResults([]);
                    }}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors mr-1 cursor-pointer"
                    title="Clear"
                  >
                    <X size={15} />
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#04AA6D] to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-xs tracking-wide shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <span>Search</span>
                  <kbd className="hidden sm:inline-block text-[10px] bg-emerald-900/60 border border-emerald-700/50 px-1.5 py-0.5 rounded font-mono text-emerald-200">
                    ↵
                  </kbd>
                </button>
              </div>
            </form>

            {/* Instant Search Autocomplete Dropdown */}
            {(searchResults.length > 0 || (searchQuery.trim() && searchResults.length === 0)) && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#0c1328] border border-slate-750 rounded-2xl shadow-2xl overflow-hidden z-50 text-left p-2 divide-y divide-slate-800/80 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[380px] overflow-y-auto">
                {searchResults.length > 0 ? (
                  <>
                    <div className="px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-emerald-400 flex items-center justify-between">
                      <span>Quick Matches ({searchResults.length})</span>
                      <span className="text-[10px] text-slate-400 font-normal">Press Enter for full modal</span>
                    </div>
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        type="button"
                        onClick={() => {
                          handleLaunchItem(result);
                          setSearchQuery('');
                          setSearchResults([]);
                        }}
                        className="w-full p-2.5 hover:bg-[#101c38] rounded-xl text-left transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className={`w-8 h-8 rounded-xl ${result.color || 'bg-emerald-500/20 text-emerald-400'} flex items-center justify-center font-bold text-sm shrink-0 border border-white/10 group-hover:scale-105 transition-transform`}>
                          {result.icon || '📄'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-black text-white group-hover:text-emerald-400 transition-colors truncate">
                              {result.title}
                            </span>
                            {result.category && (
                              <span className="text-[9px] font-mono font-bold bg-slate-900 border border-slate-700 px-1.5 py-0.5 rounded text-slate-300 shrink-0">
                                {result.category}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                            {result.content.substring(0, 90)}...
                          </p>
                        </div>
                        <ChevronRight size={15} className="text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all self-center shrink-0" />
                      </button>
                    ))}
                  </>
                ) : (
                  <div className="p-4 text-center">
                    <p className="text-xs text-slate-300 font-medium">
                      No direct local matches for &ldquo;{searchQuery}&rdquo;
                    </p>
                    <button
                      type="button"
                      onClick={() => handleSearchSubmit()}
                      className="mt-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles size={13} />
                      <span>Open Universal Search & AI Overview »</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Popular Search Chips */}
            <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5 text-xs">
              <span className="text-slate-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={11} className="text-[#c1a648]" /> Popular:
              </span>
              {POPULAR_SEARCH_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSearchQuery(chip.query)}
                  className="px-2.5 py-1 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-750 hover:border-emerald-500/50 text-slate-300 hover:text-white font-medium text-[11px] transition-all cursor-pointer shadow-sm"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Action Buttons: Degree Gateways */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/du"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl bg-[#0c1328] hover:bg-[#101b38] text-white font-extrabold text-xs sm:text-sm border border-blue-500/50 hover:border-blue-400 shadow-xl shadow-blue-950/30 transition-all transform active:scale-95 cursor-pointer group"
            >
              <Building2 size={16} className="text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent">
                Delhi University (DU CS)
              </span>
              <ChevronRight size={16} className="text-blue-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/bca"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl bg-[#0c1328] hover:bg-[#101b38] text-white font-extrabold text-xs sm:text-sm border border-[#04AA6D]/50 hover:border-[#04AA6D] shadow-xl shadow-emerald-950/30 transition-all transform active:scale-95 cursor-pointer group"
            >
              <GraduationCap size={16} className="text-[#04AA6D] group-hover:scale-110 transition-transform" />
              <span className="bg-gradient-to-r from-white via-emerald-200 to-teal-300 bg-clip-text text-transparent">
                IGNOU BCA (UG)
              </span>
              <ChevronRight size={16} className="text-[#04AA6D] group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/mca"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-extrabold text-xs sm:text-sm border border-amber-500/40 hover:border-amber-400 shadow-lg transition-all transform active:scale-95 cursor-pointer group"
            >
              <Sparkles size={15} className="text-amber-400 group-hover:scale-110 transition-transform" />
              <span>IGNOU MCA (PG) »</span>
            </Link>
          </div>

          {/* Compact Feature Highlights (Eliminates dead space elegantly) */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-2 text-[11px] sm:text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-blue-400">🏛️</span>
              <span>DU, BCA & MCA Syllabi</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-amber-400">⚡</span>
              <span>Windows CMD & Code Simulators</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-emerald-400">📄</span>
              <span>Official Syllabi PDFs</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-cyan-400">🎓</span>
              <span>100% Free & Open Access</span>
            </div>
          </div>

        </div>
      </main>

      {/* ── FOOTER WITH CLEAN CRISP ICONS (Sits directly beneath content with zero dead space) ── */}
      <footer className="bg-[#060c18] text-white border-t border-slate-800">
        
        {/* IGNOU Subject & Labs Quick Links Ribbon */}
        <div className="bg-[#091020]/95 border-b border-slate-800/80 py-3 px-4 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-xs font-semibold">
            
            {/* Semester 1 Course Chips */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-slate-400">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mr-1 hidden sm:inline">
                Semester 1:
              </span>
              <Link 
                href="/bca/semester-1/bcs-011-computer-basics" 
                className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-white font-bold transition-all shadow-sm hover:scale-105 active:scale-95"
              >
                BCS-111
              </Link>
              <Link 
                href="/bca/semester-1/bcs-012-basic-mathematics" 
                className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-white font-bold transition-all shadow-sm hover:scale-105 active:scale-95"
              >
                BCS-012
              </Link>
              <Link 
                href="/bca/semester-1/bcsl-013-software-lab" 
                className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-white font-bold transition-all shadow-sm hover:scale-105 active:scale-95"
              >
                BCSL-013
              </Link>
              <Link 
                href="/bca/semester-1/begla-136-english" 
                className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-white font-bold transition-all shadow-sm hover:scale-105 active:scale-95"
              >
                BEGLA-136
              </Link>
              <Link 
                href="/bca/semester-1/bevae-181-environmental-studies" 
                className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-white font-bold transition-all shadow-sm hover:scale-105 active:scale-95"
              >
                BEVAE-181
              </Link>
            </div>

            <div className="hidden md:block w-px h-4 bg-slate-800 mx-1" />

            {/* Interactive Practical Labs & Simulators */}
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <Link 
                href="/cmd" 
                target="_blank" 
                className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-amber-300 font-bold transition-all flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95"
              >
                <Terminal size={13} className="text-amber-400" />
                <span>Windows CMD</span>
              </Link>
              <Link 
                href="/html" 
                className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 font-bold transition-all flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95"
              >
                <Code size={13} className="text-cyan-400" />
                <span>HTML5 Lessons</span>
              </Link>
              <Link 
                href="/curriculum" 
                className="px-2.5 py-1 rounded-lg bg-[#0c1328] hover:bg-[#101c38] border border-[#c1a648]/40 hover:border-[#c1a648] text-[#c1a648] hover:text-amber-300 font-bold transition-all flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95"
              >
                <Compass size={13} />
                <span>BCA Roadmap</span>
              </Link>
            </div>

          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-slate-400">
          
          <div className="space-y-2.5">
            <h5 className="font-black uppercase text-white tracking-wider">University CS Hub</h5>
            <ul className="space-y-1.5 font-medium">
              <li><Link href="/du" className="hover:text-white">Delhi University B.Sc. CS</Link></li>
              <li><Link href="/bca" className="hover:text-white">IGNOU BCA (6 Semesters)</Link></li>
              <li><Link href="/mca" className="hover:text-white">IGNOU MCA (New 2-Year)</Link></li>
              <li><Link href="/bca/semester-1" className="hover:text-white">BCA 1st Sem Hub</Link></li>
              <li>
                <Link href="/bca" className="text-emerald-400 font-bold hover:underline flex items-center gap-1">
                  <GraduationCap size={13} />
                  <span>All Degree Papers</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h5 className="font-black uppercase text-white tracking-wider">Lab Simulators</h5>
            <ul className="space-y-1.5 font-medium">
              <li>
                <Link href="/cmd" target="_blank" className="hover:text-white flex items-center gap-1.5">
                  <Terminal size={13} className="text-emerald-400" />
                  <span>Windows CMD Simulator</span>
                </Link>
              </li>
              <li>
                <Link href="/git" target="_blank" className="hover:text-white flex items-center gap-1.5">
                  <GitBranch size={13} className="text-emerald-400" />
                  <span>Git & Terminal Lab</span>
                </Link>
              </li>
              <li>
                <Link href="/html" className="hover:text-white flex items-center gap-1.5">
                  <Code size={13} className="text-amber-400" />
                  <span>HTML5 Interactive Lab</span>
                </Link>
              </li>
              <li>
                <Link href="/bca/semmy-ai" className="hover:text-white flex items-center gap-1.5">
                  <Bot size={13} className="text-cyan-400" />
                  <span>Semmy AI Tutor</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h5 className="font-black uppercase text-white tracking-wider">Official Syllabi</h5>
            <ul className="space-y-1.5 font-medium">
              <li><a href="/syllabus/DU_BSc_Prog_CS_Sem1_Programming_using_C++.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white">DU B.Sc. CS NEP PDF</a></li>
              <li><a href="/syllabus/IGNOU_BCA_Programme_Guide_Syllabus.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white">IGNOU BCA Syllabus PDF</a></li>
              <li><a href="/syllabus/IGNOU_MCA_Programme_Guide_Syllabus.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white">IGNOU MCA Syllabus PDF</a></li>
              <li><Link href="/curriculum" className="hover:text-white">Curriculum Roadmap</Link></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h5 className="font-black uppercase text-white tracking-wider">About & Legal</h5>
            <ul className="space-y-1.5 font-medium">
              <li><Link href="/about" className="hover:text-white">About CS Guide</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Support</Link></li>
            </ul>
          </div>

        </div>

        {/* Copyright & Author Attribution */}
        <div className="bg-[#050914] text-[11px] text-slate-400 py-6 px-4 border-t border-slate-800/60 text-center space-y-2">
          <p className="max-w-2xl mx-auto leading-relaxed">
            CS Guide by NextSem is optimized for university computer science students across Delhi University (DU) and IGNOU (BCA & MCA).
          </p>
          <p className="text-[#c1a648] font-bold uppercase tracking-wider">
            © 2026 CS GUIDE BY NEXTSEM • NEXTSEM.ONLINE • AUTHOR: ER. MANOJ KUMAR
          </p>
        </div>
      </footer>

    </div>
  );
}
