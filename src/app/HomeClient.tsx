"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useProgress } from '@/context/ProgressContext';
import { auth, signInWithGoogle } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { coursePhases } from '@/data/courseData';
import searchIndex from '@/data/searchIndex.json';
import { getChapterSimulator } from '@/data/chapterSimulators';
import { ThemeToggle } from '@/components/ThemeToggle';
import FullStackRoadmap from '@/components/FullStackRoadmap';
import { 
  Layers, Cpu, Code, Palette, Cloud, Briefcase, 
  Rocket, BookOpen, ChevronRight, Play, CheckCircle, 
  Zap, LogIn, LogOut, Terminal, Star, Search, Menu, X, 
  ChevronDown, Award, ExternalLink, RefreshCw, Sparkles 
} from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  photo?: string;
}

const moduleIcons: Record<string, React.ReactNode> = {
  "CLI": <Terminal size={18} className="text-emerald-400" />,
  "P0": <Layers size={18} className="text-purple-400" />,
  "P1": <Code size={18} className="text-blue-400" />,
  "P2": <Palette size={18} className="text-teal-400" />,
  "P3": <Cpu size={18} className="text-amber-400" />,
  "P4": <Code size={18} className="text-red-400" />,
  "P5": <Cloud size={18} className="text-sky-400" />,
  "P6": <Briefcase size={18} className="text-slate-400" />,
  "P7": <Rocket size={18} className="text-pink-400" />
};

export default function HomeClient() {
  const router = useRouter();
  const { completedChapters } = useProgress();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  
  // Navigation states
  const [tutorialsDropdownOpen, setTutorialsDropdownOpen] = useState(false);
  const [exercisesDropdownOpen, setExercisesDropdownOpen] = useState(false);
  
  interface SearchItem {
    id: string;
    title: string;
    content: string;
    phase: string;
    duration: string;
    color: string;
    icon: string;
  }

  // Search states
  const [heroSearchQuery, setHeroSearchQuery] = useState('');
  const [navSearchQuery, setNavSearchQuery] = useState('');
  const [heroSearchResults, setHeroSearchResults] = useState<SearchItem[]>([]);
  const [navSearchResults, setNavSearchResults] = useState<SearchItem[]>([]);
  
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);

  const heroSearchRef = useRef<HTMLDivElement>(null);
  const navSearchRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (heroSearchRef.current && !heroSearchRef.current.contains(event.target as Node)) {
        setHeroSearchResults([]);
      }
      if (navSearchRef.current && !navSearchRef.current.contains(event.target as Node)) {
        setNavSearchResults([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Authenticated state listener
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

  const handleLaunchChapter = (path: string) => {
    let url = path.startsWith("cli/") || path.startsWith("html/") ? `/${path}` : `/book/${path}`;
    if (path === "cmd") {
      url = "/cmd";
    } else if (path === "p0-4-git") {
      url = "/git";
    }

    const hasCode = path === "cmd" || path === "p0-4-git" || !!getChapterSimulator(path);

    if (hasCode) {
      window.open(url, '_blank');
    } else {
      router.push(url);
    }
  };

  // Search logic
  const performSearch = (queryStr: string, setResults: React.Dispatch<React.SetStateAction<SearchItem[]>>) => {
    if (!queryStr.trim()) {
      setResults([]);
      return;
    }
    const cleanQuery = queryStr.toLowerCase();
    const matches = (searchIndex as SearchItem[]).filter((item: SearchItem) => 
      item.title.toLowerCase().includes(cleanQuery) || 
      item.content.toLowerCase().includes(cleanQuery)
    ).slice(0, 6);
    setResults(matches);
  };

  useEffect(() => {
    performSearch(heroSearchQuery, setHeroSearchResults);
  }, [heroSearchQuery]);

  useEffect(() => {
    performSearch(navSearchQuery, setNavSearchResults);
  }, [navSearchQuery]);

  const handleHeroSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (heroSearchQuery.trim()) {
      window.dispatchEvent(new CustomEvent("open_search", { 
        detail: { query: heroSearchQuery.trim() } 
      }));
      setHeroSearchQuery('');
    }
  };

  const handleNavSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (navSearchQuery.trim()) {
      window.dispatchEvent(new CustomEvent("open_search", { 
        detail: { query: navSearchQuery.trim() } 
      }));
      setNavSearchQuery('');
    }
  };

  const handleScrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white flex flex-col font-sans selection:bg-[#c1a648]/30 transition-colors duration-200">
      
      {/* ── TOP NAVIGATION BAR (Nextsem Academy Style) ── */}
      <header className="sticky top-0 z-50 bg-white dark:bg-[#0b0f19] border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-[54px] flex items-center justify-between">
          
          {/* Left Side Branding and Links */}
          <div className="flex items-center gap-4 lg:gap-6">
            <Link href="/" className="flex items-center gap-2.5 select-none group">
              <img src="/logo.svg" alt="IGNOU Logo" className="w-8 h-8 rounded-lg border border-emerald-500/20 group-hover:scale-105 transition-transform select-none shrink-0" />
              <div className="flex flex-col leading-none">
                <span className="font-black text-lg tracking-tight text-slate-800 dark:text-white uppercase">
                  IGNOU
                </span>
                <span className="text-[10px] font-mono text-[#04AA6D] font-bold tracking-tight mt-0.5">
                  Study Notes Hub
                </span>
              </div>
            </Link>

            {/* Desktop Navbar Links */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-bold text-slate-700 dark:text-slate-350">
              <Link href="/bca/semester-1" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer">
                <BookOpen size={14} className="text-[#04AA6D]" />
                <span>IGNOU BCA 1st Sem</span>
              </Link>
              <Link href="/bca" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer">
                <Layers size={14} className="text-indigo-500" />
                <span>Semesters</span>
              </Link>
              <Link href="/curriculum" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer">
                <Rocket size={14} className="text-amber-400" />
                <span>Curriculum</span>
              </Link>
            </nav>
          </div>

          {/* Right Side Tools & Auth */}
          <div className="flex items-center gap-3">
            
            {/* Header Search Box */}
            <div ref={navSearchRef} className="relative hidden lg:block w-[180px] xl:w-[240px]">
              <form onSubmit={handleNavSearchSubmit} className="relative">
                <input 
                  type="text"
                  placeholder="Search tutorials..."
                  value={navSearchQuery}
                  onChange={(e) => setNavSearchQuery(e.target.value)}
                  className="w-full h-8 pl-8 pr-3 text-xs bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-full focus:outline-none focus:border-[#04AA6D] focus:ring-1 focus:ring-[#04AA6D] dark:text-white"
                />
                <Search size={14} className="absolute left-3 top-2 text-slate-400" />
              </form>

              {(navSearchResults.length > 0 || navSearchQuery.trim()) && (
                <div className="absolute top-full right-0 mt-1.5 w-[300px] bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl max-h-[350px] overflow-y-auto z-50 text-left p-2 animate-in fade-in slide-in-from-top-1">
                  {navSearchResults.length > 0 && (
                    <>
                      {navSearchResults.map((result) => (
                        <button
                          key={result.id}
                          onClick={() => {
                            handleLaunchChapter(result.id);
                            setNavSearchQuery('');
                          }}
                          className="w-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg text-left transition-colors flex items-start gap-2 border-b border-slate-100 dark:border-slate-900 last:border-b-0"
                        >
                          <span className="text-sm mt-0.5">{result.icon || '📄'}</span>
                          <div>
                            <div className="text-xs font-bold text-slate-800 dark:text-white">{result.title}</div>
                            <div className="text-[10px] text-slate-400 truncate max-w-[230px]">{result.duration || '5 min read'} • {result.phase || 'Chapter'}</div>
                          </div>
                        </button>
                      ))}
                    </>
                  )}

                  {navSearchQuery.trim() && (
                    <div className="pt-1.5 border-t border-slate-150 dark:border-slate-900 mt-1">
                      <button
                        onClick={() => {
                          window.open(`https://www.google.com/search?q=${encodeURIComponent(navSearchQuery.trim())}`, '_blank', 'noopener,noreferrer');
                          setNavSearchQuery('');
                        }}
                        className="w-full p-2 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg text-left transition-colors flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs"
                      >
                        <Search size={12} className="text-blue-500 shrink-0" />
                        <span>Search &ldquo;{navSearchQuery}&rdquo; on Google Search</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Theme Toggle Button removed */}

            {/* Streak & XP (if logged in) */}
            {currentUser && (
              <div className="hidden sm:flex items-center gap-3">
                <div className="flex items-center gap-1 text-[11px] font-black text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-2.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-800">
                  <Zap size={12} className="text-amber-500 fill-amber-500 animate-pulse" />
                  <span>🔥 5 Days</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-black text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-2.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-800">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span>🏆 1,480 XP</span>
                </div>
              </div>
            )}

            {/* Sign In / User menu */}
            <div>
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2 py-1 rounded-lg">
                    {currentUser.photo ? (
                      <img src={currentUser.photo} alt="" className="w-5 h-5 rounded-full object-cover border border-emerald-500/20" />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-[#04AA6D] text-white flex items-center justify-center font-black text-[9px]">
                        {currentUser.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200 hidden sm:inline max-w-[70px] truncate">{currentUser.name.split(" ")[0]}</span>
                  </div>
                  <button 
                    onClick={handleSignOut}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
                    title="Sign Out"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleSignIn}
                  className="flex items-center gap-1.5 bg-[#04AA6D] hover:bg-[#039861] text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-md shadow-[#04AA6D]/10 cursor-pointer"
                >
                  <LogIn size={13} />
                  <span>Sign In</span>
                </button>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* ── HERO SEARCH AREA (Nextsem Academy Style) ── */}
      <section className="bg-theme-bg text-theme-text py-8 sm:py-16 px-4 sm:px-6 text-center relative border-b border-theme-border">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(#04AA6D_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-[800px] mx-auto relative z-10">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-tight text-white">
            LEARN IGNOU BCA
          </h2>
          <p className="text-[#c1a648] text-xs sm:text-base font-extrabold uppercase mt-2 tracking-wider">
            Line-by-Line Textbook Units, Bilingual Lessons & Solved Assignments.
          </p>
          <p className="text-[#FFF4A3] text-xs sm:text-base font-black uppercase mt-1 tracking-wide">
            100% Free Study Hub • Author: Er. Manoj Kumar
          </p>

          {/* ── HERO ACTION BUTTONS ── */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/bca/semester-1"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#0c1328] hover:bg-[#101b38] text-white font-extrabold text-sm sm:text-base border border-[#04AA6D]/50 hover:border-[#04AA6D] shadow-xl shadow-cyan-950/30 transition-all transform active:scale-95 cursor-pointer group"
            >
              <BookOpen size={18} className="text-[#c1a648] group-hover:scale-110 transition-transform" />
              <span className="bg-gradient-to-r from-white via-cyan-200 to-emerald-300 bg-clip-text text-transparent">Start IGNOU BCA 1st Sem Free Lessons</span>
              <ChevronRight size={18} className="text-[#04AA6D] group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/curriculum"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 font-extrabold text-xs sm:text-sm border border-amber-500/30 hover:border-amber-400 shadow-lg transition-all transform active:scale-95 cursor-pointer"
            >
              <Sparkles size={16} />
              <span>Subject Phase Tracker »</span>
            </Link>
          </div>

          {/* ── IGNOU BCA 3-YEAR DEGREE LEARNING ROADMAP ── */}
          <div className="mt-12 max-w-5xl mx-auto text-left space-y-6">
            <div className="text-center space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-[#04AA6D]/15 text-[#04AA6D] border border-[#04AA6D]/30 text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#c1a648]" />
                <span>IGNOU BCA 3-Year Bachelor Degree</span>
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                IGNOU BCA Semester-by-Semester Roadmap
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Follow our structured academic pathway covering all 6 semesters — from 1st Semester Computer Basics & PC Software to Final Year Major Capstone Project.
              </p>
            </div>

            {/* BCA Semester Roadmap Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
              
              {/* Semester 1: Computer Basics & PC Software */}
              <div className="p-6 bg-[#0c1328] border border-[#04AA6D]/50 rounded-2xl shadow-xl hover:border-[#04AA6D] transition-all duration-300 group relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-[#04AA6D]/20 text-[#04AA6D] font-black text-xs flex items-center justify-center border border-[#04AA6D]/40">
                      01
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-md">
                      100% Ready • Active
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-white group-hover:text-[#04AA6D] transition-colors">
                      Semester 1: Foundation & PC Software
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Master BCS-111 Computer Basics, BCS-012 Basic Math, BCSL-013 Software Lab (Windows CMD, Linux, HTML5), BEGLA-136 English, and BEVAE-181.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-300">BCS-111</span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-300">BCS-012</span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-300">BCSL-013</span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-300">BEGLA-136</span>
                  </div>
                </div>
                <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <Link
                    href="/bca/semester-1"
                    className="px-4 py-2 bg-[#04AA6D] hover:bg-[#039861] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Start 1st Sem Lessons »</span>
                  </Link>
                  <Link
                    href="/bca/semester-1/bcs-011-computer-basics"
                    className="text-xs font-bold text-[#c1a648] hover:text-white transition-colors"
                  >
                    BCS-111 Computer Basics ➔
                  </Link>
                </div>
              </div>

              {/* Semester 2: C Programming & Computer Organization */}
              <div className="p-6 bg-[#0c1328] border border-cyan-500/40 rounded-2xl shadow-xl hover:border-cyan-400 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 font-black text-xs flex items-center justify-center border border-cyan-500/40">
                      02
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800 px-2.5 py-1 rounded-md">
                      75% Ready • Active
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-white group-hover:text-cyan-400 transition-colors">
                      Semester 2: C Programming & Assembly
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Master MCS-011 Problem Solving in C, MCS-012 Computer Organization & Assembly, MCS-013 Discrete Math, and MCSL-017 Practical Lab.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-300">MCS-011</span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-300">MCS-012</span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-300">MCS-013</span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-300">MCSL-017</span>
                  </div>
                </div>
                <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <Link
                    href="/bca/2"
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Explore 2nd Sem Subjects »</span>
                  </Link>
                  <Link
                    href="/bca/2/mcs-011"
                    className="text-xs font-bold text-slate-400 hover:text-white transition-colors"
                  >
                    MCS-011 C Language ➔
                  </Link>
                </div>
              </div>

              {/* Semester 3: Data Structures & DBMS */}
              <div className="p-6 bg-[#0c1328] border border-amber-500/40 rounded-2xl shadow-xl hover:border-amber-400 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 font-black text-xs flex items-center justify-center border border-amber-500/40">
                      03
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800 px-2.5 py-1 rounded-md">
                      60% Ready • In Progress
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-white group-hover:text-amber-400 transition-colors">
                      Semester 3: Data Structures & DBMS SQL
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Deep dive into MCS-021 Data Structures (Trees, Graphs), MCS-023 DBMS (SQL, Relational Algebra), MCS-014 SAD, and MCSL-025 Lab.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-300">MCS-021</span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-300">MCS-023</span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-300">MCS-014</span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-300">MCSL-025</span>
                  </div>
                </div>
                <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <Link
                    href="/bca/3"
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Explore 3rd Sem Subjects »</span>
                  </Link>
                  <Link
                    href="/curriculum"
                    className="text-xs font-bold text-slate-400 hover:text-white transition-colors"
                  >
                    Phase Breakdown ➔
                  </Link>
                </div>
              </div>

              {/* Semester 4: Java OOP & Operating Systems */}
              <div className="p-6 bg-[#0c1328] border border-indigo-500/40 rounded-2xl shadow-xl hover:border-indigo-400 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 font-black text-xs flex items-center justify-center border border-indigo-500/40">
                      04
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 border border-indigo-800 px-2.5 py-1 rounded-md">
                      45% Ready • Phase 4
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-white group-hover:text-indigo-400 transition-colors">
                      Semester 4: Java OOP & Operating Systems
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Master MCS-024 Object Oriented Java, MCS-022 OS Kernels & Linux, BCS-040 Statistics, and MCSL-036 Practical Lab.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-300">MCS-024</span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-300">MCS-022</span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-300">BCS-040</span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-300">MCSL-036</span>
                  </div>
                </div>
                <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <Link
                    href="/curriculum"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Java & OS Syllabus »</span>
                  </Link>
                  <Link
                    href="/bca"
                    className="text-xs font-bold text-slate-400 hover:text-white transition-colors"
                  >
                    All Semesters ➔
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── IGNOU BCA PRACTICAL LAB SIMULATORS BAND ── */}
      <section className="bg-[#0b1328] text-white py-16 px-4 md:px-8 border-t border-slate-800">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="text-left space-y-4">
            <span className="text-[10px] font-black uppercase bg-[#04AA6D]/20 border border-[#04AA6D]/30 px-3 py-1 rounded-full text-[#04AA6D]">
              Practical Lab & Terminal Simulators
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-white tracking-tight">
              BCS-111 & BCSL-013 Interactive Simulators
            </h2>
            <p className="text-slate-300 text-sm md:text-base max-w-lg leading-relaxed font-medium">
              Practice Windows Command Prompt (CMD), Linux CLI commands, and HTML5 Web Lab directly in your browser with instant execution feedback.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <Link 
                href="/cmd"
                target="_blank"
                className="px-5 py-2.5 bg-[#04AA6D] hover:bg-[#039861] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-[#04AA6D]/20 flex items-center gap-1.5"
              >
                <Terminal size={14} className="stroke-[2.5]" />
                <span>Open CMD Simulator</span>
              </Link>
              <Link 
                href="/bca/semester-1/bcs-011-computer-basics/unit-1/lessons"
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center gap-1.5 border border-amber-500/30"
              >
                <BookOpen size={14} className="stroke-[2.5]" />
                <span>50 Micro-Lessons Hub</span>
              </Link>
            </div>
          </div>

          {/* Interactive CMD Simulator Preview Card */}
          <div className="bg-[#090e1a] border border-slate-800 text-white rounded-2xl overflow-hidden shadow-2xl max-w-md lg:max-w-full mx-auto w-full text-xs text-left font-mono">
            <div className="bg-[#0e162a] px-4 py-2.5 border-b border-slate-800 flex justify-between items-center select-none">
              <span className="text-emerald-400 font-bold text-[10px] uppercase flex items-center gap-1.5">
                <Terminal size={12} />
                <span>Windows Command Prompt • BCS-111 Lab</span>
              </span>
              <Link href="/cmd" target="_blank" className="text-amber-300 hover:text-amber-200 font-bold text-[10px] flex items-center gap-0.5">
                <span>Launch Full Screen »</span>
              </Link>
            </div>
            <pre className="p-4 space-y-1.5 overflow-x-auto text-[11px] leading-relaxed text-slate-300">
              <div><span className="text-[#04AA6D]">C:\NEXTSEM&gt;</span> dir</div>
              <div className="text-slate-400"> Directory of C:\NEXTSEM</div>
              <div className="text-slate-400">08/02/2026  10:00 AM    &lt;DIR&gt;          BCS-111_Computer_Basics</div>
              <div className="text-slate-400">08/02/2026  10:05 AM    &lt;DIR&gt;          BCSL-013_Software_Lab</div>
              <div><span className="text-[#04AA6D]">C:\NEXTSEM&gt;</span> systeminfo</div>
              <div className="text-cyan-300">Host Name: DESKTOP-IGNOU-BCA</div>
              <div className="text-cyan-300">OS Name: Microsoft Windows 11 Pro</div>
            </pre>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0c1328] text-white border-t border-slate-800/80 transition-colors mt-auto">
        
        {/* IGNOU Subject Sub-Navigation Band */}
        <div className="bg-[#080d1c] border-b border-slate-800/60 py-4">
          <div className="max-w-[1200px] mx-auto px-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-black uppercase text-slate-400">
            <Link href="/bca/semester-1/bcs-011-computer-basics" className="hover:text-white cursor-pointer">BCS-111</Link>
            <span>•</span>
            <Link href="/bca/semester-1/bcs-012-basic-mathematics" className="hover:text-white cursor-pointer">BCS-012</Link>
            <span>•</span>
            <Link href="/bca/semester-1/bcsl-013-software-lab" className="hover:text-white cursor-pointer">BCSL-013</Link>
            <span>•</span>
            <Link href="/bca/semester-1/begla-136-english" className="hover:text-white cursor-pointer">BEGLA-136</Link>
            <span>•</span>
            <Link href="/bca/semester-1/bevae-181-environmental-studies" className="hover:text-white cursor-pointer">BEVAE-181</Link>
            <span>•</span>
            <Link href="/bca/2" className="hover:text-white cursor-pointer">MCS-011</Link>
            <span>•</span>
            <Link href="/bca/3" className="hover:text-white cursor-pointer">MCS-021</Link>
            <span>•</span>
            <Link href="/curriculum" className="hover:text-amber-400 text-[#c1a648]">BCA CURRICULUM</Link>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-left text-xs text-slate-400">
          
          <div className="space-y-3">
            <h5 className="font-black uppercase text-white text-xs tracking-wider">IGNOU BCA Courses</h5>
            <ul className="space-y-2 font-medium">
              <li><Link href="/bca/semester-1/bcs-011-computer-basics" className="hover:text-white">BCS-111 Computer Basics</Link></li>
              <li><Link href="/bca/semester-1/bcs-012-basic-mathematics" className="hover:text-white">BCS-012 Basic Mathematics</Link></li>
              <li><Link href="/bca/semester-1/bcsl-013-software-lab" className="hover:text-white">BCSL-013 Software Lab</Link></li>
              <li><Link href="/bca/semester-1/begla-136-english" className="hover:text-white">BEGLA-136 Workplace English</Link></li>
              <li><Link href="/bca/semester-1/bevae-181-environmental-studies" className="hover:text-white">BEVAE-181 Environment</Link></li>
              <li><Link href="/bca/semester-1" className="hover:text-white font-bold text-cyan-400">🎓 IGNOU BCA 1st Sem Hub</Link></li>
              <li><Link href="/curriculum" className="hover:text-white text-emerald-400 font-bold">🚀 Full BCA Phase Curriculum</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-black uppercase text-white text-xs tracking-wider">Simulators & Tools</h5>
            <ul className="space-y-2 font-medium">
              <li><Link href="/cmd" target="_blank" className="hover:text-white">🪟 Windows CMD Simulator (BCS-111)</Link></li>
              <li><Link href="/git" target="_blank" className="hover:text-white">🌿 Git & Terminal Simulator</Link></li>
              <li><Link href="/bca/semester-1" className="hover:text-white">📚 Line-by-Line Textbook Reader</Link></li>
              <li><Link href="/bca" className="hover:text-white">🎓 All Semesters Dashboard</Link></li>
              <li><Link href="/bca/semmy-ai" className="hover:text-white">🤖 Semmy AI Tutor</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-black uppercase text-white text-xs tracking-wider">Exam & Degree Prep</h5>
            <ul className="space-y-2 font-medium">
              <li><Link href="/bca/semester-1" className="hover:text-white">IGNOU Solved Assignments</Link></li>
              <li><Link href="/curriculum" className="hover:text-white">Exam Important Questions Q&A</Link></li>
              <li><Link href="/curriculum" className="hover:text-white">BCA Viva & Practical Exam Prep</Link></li>
              <li><Link href="/curriculum" className="hover:text-white">BCSP-064 Major Project Guide</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-black uppercase text-white text-xs tracking-wider">Legal & Academy</h5>
            <ul className="space-y-2 font-medium">
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Support</Link></li>
              <li><Link href="/about" className="hover:text-white">About IGNOU BCA Hub</Link></li>
            </ul>
          </div>

        </div>

        {/* IGNOU BCA Disclaimer & Copyright */}
        <div className="bg-[#080d1c] text-[10px] text-slate-400 font-medium py-6 px-4 border-t border-slate-800/60">
          <div className="max-w-[1000px] mx-auto text-center space-y-3 leading-relaxed">
            <p>
              IGNOU BCA Study Hub by Nextsem is optimized for degree learning, exam preparation, and practical lab training. Tutorials, unit notes, and code simulations are line-by-line textbook aligned by Er. Manoj Kumar.
            </p>
            <p>
              While using IGNOU BCA Study Hub, you agree to have read and accepted our <Link href="/terms" className="underline hover:text-slate-300">terms of use</Link>, <Link href="/privacy" className="underline hover:text-slate-300">cookie and privacy policy</Link>.
            </p>
            <p className="pt-2 text-[#c1a648] font-bold uppercase tracking-wider font-sans">
              COPYRIGHT 2026 BY IGNOU BCA HUB • NEXTSEM.ONLINE. ALL RIGHTS RESERVED. AUTHOR: ER. MANOJ KUMAR.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
