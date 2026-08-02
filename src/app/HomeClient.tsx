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
                  ignou.nextsem.online
                </span>
              </div>
            </Link>

            {/* Desktop Navbar Links */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-bold text-slate-700 dark:text-slate-350">
              
              {/* Tutorials Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => {
                    setTutorialsDropdownOpen(!tutorialsDropdownOpen);
                    setExercisesDropdownOpen(false);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
                >
                  Tutorials <ChevronDown size={14} className={`transform transition-transform ${tutorialsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {tutorialsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-4 w-[420px] z-50 text-left animate-in fade-in slide-in-from-top-2 duration-150">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-2 px-1">
                        Systems & Basics
                      </span>
                      <div className="flex flex-col gap-1 text-xs">
                        <button 
                          onClick={() => { handleScrollToId('setup-section'); setTutorialsDropdownOpen(false); }} 
                          className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-xl hover:text-[#04AA6D] transition-all text-left font-bold"
                        >
                          <span>⚙️</span>
                          <span className="truncate">Setup & Software</span>
                        </button>
                        <button 
                          onClick={() => { handleScrollToId('setup-section'); setTutorialsDropdownOpen(false); }} 
                          className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-xl hover:text-[#04AA6D] transition-all text-left font-bold"
                        >
                          <span>🌿</span>
                          <span className="truncate">Git & Version Control</span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-2 px-1">
                        Web Development
                      </span>
                      <div className="flex flex-col gap-1 text-xs">
                        <button 
                          onClick={() => { handleScrollToId('html-section'); setTutorialsDropdownOpen(false); }} 
                          className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-xl hover:text-[#04AA6D] transition-all text-left font-bold"
                        >
                          <span>📝</span>
                          <span className="truncate">HTML Tutorials</span>
                        </button>
                        <button 
                          onClick={() => { handleScrollToId('css-section'); setTutorialsDropdownOpen(false); }} 
                          className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-xl hover:text-[#04AA6D] transition-all text-left font-bold"
                        >
                          <span>🎨</span>
                          <span className="truncate">CSS Styling & Flex</span>
                        </button>
                        <button 
                          onClick={() => { handleScrollToId('js-section'); setTutorialsDropdownOpen(false); }} 
                          className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-xl hover:text-[#04AA6D] transition-all text-left font-bold"
                        >
                          <span>⚡</span>
                          <span className="truncate">JavaScript Coding</span>
                        </button>
                        <button 
                          onClick={() => { handleScrollToId('react-section'); setTutorialsDropdownOpen(false); }} 
                          className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-xl hover:text-[#04AA6D] transition-all text-left font-bold"
                        >
                          <span>⚛️</span>
                          <span className="truncate">React UI Library</span>
                        </button>
                        <button 
                          onClick={() => { handleScrollToId('backend-section'); setTutorialsDropdownOpen(false); }} 
                          className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-xl hover:text-[#04AA6D] transition-all text-left font-bold col-span-2"
                        >
                          <span>🔌</span>
                          <span className="truncate">Node.js & Express</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Exercises Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => {
                    setExercisesDropdownOpen(!exercisesDropdownOpen);
                    setTutorialsDropdownOpen(false);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
                >
                  Exercises <ChevronDown size={14} className={`transform transition-transform ${exercisesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {exercisesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-2xl p-3 flex flex-col gap-1.5 w-[240px] z-50 text-left animate-in fade-in slide-in-from-top-2 duration-150">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block px-2 mb-1.5">
                      Interactive Tools
                    </span>
                    <Link href="/cmd" target="_blank" onClick={() => setExercisesDropdownOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-[#04AA6D] text-xs font-bold transition-all">
                      <span>🪟</span>
                      <span>CMD Simulator</span>
                    </Link>
                    <Link href="/simulator" target="_blank" onClick={() => setExercisesDropdownOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-[#04AA6D] text-xs font-bold transition-all">
                      <span>🖥️</span>
                      <span>Windows 11 Simulator</span>
                    </Link>
                    <Link href="/git" target="_blank" onClick={() => setExercisesDropdownOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-[#04AA6D] text-xs font-bold transition-all">
                      <span>🌿</span>
                      <span>Git Simulator</span>
                    </Link>
                    <Link href="/bca/semester-1/bcs-011-computer-basics" onClick={() => setExercisesDropdownOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-[#04AA6D] text-xs font-bold transition-all">
                      <span>💻</span>
                      <span>BCS-111 Computer Basics</span>
                    </Link>
                    <Link href="/bca/semester-1/bcsl-013-software-lab" onClick={() => setExercisesDropdownOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-[#04AA6D] text-xs font-bold transition-all">
                      <span>🧪</span>
                      <span>BCSL-013 Software Lab</span>
                    </Link>
                    <Link href="/bca/semester-1/bevae-181-environmental-studies" onClick={() => setExercisesDropdownOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-[#04AA6D] text-xs font-bold transition-all">
                      <span>🌱</span>
                      <span>BEVAE-181 Environment</span>
                    </Link>
                    <button onClick={() => { handleScrollToId('exercises-section'); setExercisesDropdownOpen(false); }} className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-[#04AA6D] text-xs font-bold transition-all text-left">
                      <span>🏆</span>
                      <span>Course Quizzes</span>
                    </button>
                  </div>
                )}
              </div>

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

      {/* ── CORE CURRICULUM PHASES (Image 11 Card Pattern) ── */}

      


      {/* 2. HTML Band */}
      <section id="html-section" className="bg-[#D9EEE1] text-slate-900 py-16 px-4 md:px-8 transition-colors">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="text-left space-y-4">
            <span className="text-[10px] font-black uppercase bg-[#04AA6D]/20 border border-[#04AA6D]/30 px-3 py-1 rounded-full text-[#036c45]">
              Phase 1: Web Markup
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-slate-950 tracking-tight">
              HTML5 Web markup
            </h2>
            <p className="text-slate-800 text-sm md:text-base max-w-lg leading-relaxed font-semibold">
              The structural skeleton of the web. Master semantic page flows, navigation elements, forms, layouts, and Google search engine index tags.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <Link 
                href="/html"
                className="px-5 py-2.5 bg-[#04AA6D] hover:bg-[#039861] text-white rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-[#04AA6D]/20 flex items-center gap-1.5"
              >
                <BookOpen size={14} className="stroke-[2.5]" />
                <span>Learn HTML</span>
              </Link>
              <Link 
                href="/playground"
                className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-gray-900/10 flex items-center gap-1.5"
              >
                <Code size={14} className="stroke-[2.5]" />
                <span>Try HTML Sandbox</span>
              </Link>
            </div>
          </div>

          {/* Mock Code Box */}
          <div className="bg-[#282A35] text-white rounded-xl overflow-hidden shadow-2xl max-w-md lg:max-w-full mx-auto w-full text-xs text-left font-mono">
            <div className="bg-[#1f2029] px-4 py-2 border-b border-slate-800 flex justify-between select-none">
              <span className="text-slate-400 font-bold text-[10px] uppercase">index.html</span>
              <button onClick={() => router.push('/playground')} className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-0.5">
                <span>Run Code</span>
                <ChevronRight size={12} />
              </button>
            </div>
            <pre className="p-4 space-y-0.5 overflow-x-auto text-[11px] leading-relaxed">
              <div><span className="text-cyan-400">&lt;!DOCTYPE html&gt;</span></div>
              <div><span className="text-teal-400">&lt;html&gt;</span></div>
              <div><span className="text-teal-400">  &lt;head&gt;</span></div>
              <div><span className="text-teal-400">    &lt;title&gt;</span><span className="text-yellow-200">Nextsem Academy</span><span className="text-teal-400">&lt;/title&gt;</span></div>
              <div><span className="text-teal-400">  &lt;body&gt;</span></div>
              <div><span className="text-teal-400">    &lt;h1&gt;</span><span className="text-white font-bold">Welcome to Nextsem</span><span className="text-teal-400">&lt;/h1&gt;</span></div>
              <div><span className="text-teal-400">    &lt;p&gt;</span><span className="text-slate-300">Learn to build beautiful websites.</span><span className="text-teal-400">&lt;/p&gt;</span></div>
              <div><span className="text-teal-400">  &lt;/body&gt;</span></div>
              <div><span className="text-teal-400">&lt;/html&gt;</span></div>
            </pre>
          </div>
        </div>
      </section>

      {/* 3. CSS Band */}
      <section id="css-section" className="bg-[#FFF4A3] text-slate-950 py-16 px-4 md:px-8 transition-colors">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Mock Code Box */}
          <div className="bg-[#282A35] text-white rounded-xl overflow-hidden shadow-2xl max-w-md lg:max-w-full mx-auto w-full text-xs text-left font-mono order-2 lg:order-1">
            <div className="bg-[#1f2029] px-4 py-2 border-b border-slate-800 flex justify-between select-none">
              <span className="text-slate-400 font-bold text-[10px] uppercase">styles.css</span>
              <button onClick={() => router.push('/playground')} className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-0.5">
                <span>Try it</span>
                <ChevronRight size={12} />
              </button>
            </div>
            <pre className="p-4 space-y-1 overflow-x-auto text-[11px] leading-relaxed">
              <div><span className="text-yellow-400">body</span> &#123;</div>
              <div>  <span className="text-cyan-400">background-color</span>: <span className="text-emerald-400">#060c18</span>;</div>
              <div>  <span className="text-cyan-400">font-family</span>: <span className="text-teal-300">&apos;Outfit&apos;, sans-serif</span>;</div>
              <div>&#125;</div>
              <div className="pt-2"><span className="text-yellow-400">.landing-card</span> &#123;</div>
              <div>  <span className="text-cyan-400">border</span>: <span className="text-slate-400">1px solid var(--theme-border)</span>;</div>
              <div>  <span className="text-cyan-400">border-radius</span>: <span className="text-emerald-400">1rem</span>;</div>
              <div>  <span className="text-cyan-400">backdrop-filter</span>: <span className="text-teal-300">blur(12px)</span>;</div>
              <div>&#125;</div>
            </pre>
          </div>

          <div className="text-left space-y-4 order-1 lg:order-2">
            <span className="text-[10px] font-black uppercase bg-slate-900/10 border border-slate-900/20 px-3 py-1 rounded-full text-slate-950 font-bold">
              Phase 2: Stylesheets &amp; Layouts
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-slate-950 tracking-tight">
              CSS3 Responsive Layouts
            </h2>
            <p className="text-slate-900 text-sm md:text-base max-w-lg leading-relaxed font-semibold">
              Inject styling, positioning, and variables. Create premium responsive grid-panels, flexbox headers, dark switches, and smooth keyframe micro-animations.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <button 
                onClick={() => handleLaunchChapter('p2-1-selectors')}
                className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-lg"
              >
                Learn CSS
              </button>
              <Link 
                href="/playground"
                className="px-5 py-2.5 border-2 border-slate-900 text-slate-950 font-black hover:bg-slate-900 hover:text-white rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm"
              >
                CSS Reference
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 4. JavaScript Band (Phase 3) */}
      <section id="js-section" className="bg-theme-bg border-b border-theme-border text-theme-text py-16 px-4 md:px-8">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="text-left space-y-4">
            <span className="text-[10px] font-black uppercase bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded-full text-theme-accent">
              Phase 3: Scripting &amp; Logic
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-theme-text tracking-tight">
              JavaScript Logic
            </h2>
            <p className="text-theme-text/80 text-sm md:text-base max-w-lg leading-relaxed">
              Program logic, arrays, and event handlers. Manipulate DOM hierarchies dynamically and store database state vectors into local storage buffers.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <button 
                onClick={() => handleLaunchChapter('p3-1-basics')}
                className="px-5 py-2.5 bg-[#04AA6D] hover:bg-[#039861] text-white rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-[#04AA6D]/20"
              >
                Learn JavaScript
              </button>
              <Link 
                href="/playground"
                className="px-5 py-2.5 bg-theme-surface hover:bg-theme-card text-theme-text border border-theme-border rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer inline-flex items-center justify-center"
              >
                JS Playground
              </Link>
            </div>
          </div>

          {/* Mock Code Box */}
          <div className="bg-[#1f2029] border border-slate-800 text-white rounded-xl overflow-hidden shadow-2xl max-w-md lg:max-w-full mx-auto w-full text-xs text-left font-mono">
            <div className="bg-[#15161d] px-4 py-2 border-b border-slate-900 flex justify-between select-none">
              <span className="text-slate-500 font-bold text-[10px] uppercase">main.js</span>
              <button onClick={() => router.push('/playground')} className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-0.5">
                <span>Run logic</span>
                <ChevronRight size={12} />
              </button>
            </div>
            <pre className="p-4 space-y-1 overflow-x-auto text-[11px] leading-relaxed">
              <div><span className="text-red-400">function</span> <span className="text-blue-400">calculateTotal</span>(subtotal, taxRate) &#123;</div>
              <div>  <span className="text-red-400">let</span> tax = subtotal * taxRate;</div>
              <div>  <span className="text-red-400">return</span> subtotal + tax;</div>
              <div>&#125;</div>
              <div className="pt-2"><span className="text-slate-400">{"// Output order check"}</span></div>
              <div><span className="text-teal-400">console</span>.<span className="text-blue-400">log</span>(<span className="text-blue-400">calculateTotal</span>(<span className="text-yellow-400">100</span>, <span className="text-yellow-400">0.08</span>)); <span className="text-slate-500">{"// 108"}</span></div>
            </pre>
          </div>
        </div>
      </section>

      {/* 5. React & Backend Bands (Compact side-by-side grids) */}
      <section className="bg-slate-100 dark:bg-[#0c1222] py-16 px-4 md:px-8 border-y border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* React Block */}
          <div id="react-section" className="bg-[#E7F3FF] dark:bg-[#12233c] text-slate-900 dark:text-white p-8 rounded-2xl border border-blue-200 dark:border-slate-800 text-left flex flex-col justify-between transition-colors">
            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400">React Core (⚛)</span>
              <h3 className="text-2xl font-black uppercase">React UI libraries</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed">
                Build composable, reactive client interfaces. Leverage useState triggers, useEffect fetch handlers, and Context provider stores.
              </p>
              
              <div className="bg-[#282A35] text-white p-4 rounded-xl font-mono text-[10px] space-y-1 overflow-x-auto shadow-inner select-none mt-4">
                <div><span className="text-red-400">function</span> <span className="text-blue-400">Hero</span>(&#123; title &#125;) &#123;</div>
                <div>  <span className="text-red-400">return</span> <span className="text-teal-400">&lt;h1&gt;</span>&#123;title&#125;<span className="text-teal-400">&lt;/h1&gt;</span>;</div>
                <div>&#125;</div>
              </div>
            </div>
            <button 
              onClick={() => handleLaunchChapter('p4-1-jsx')} 
              className="mt-6 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 rounded-lg text-xs font-black uppercase tracking-wider transition-all self-start cursor-pointer"
            >
              Start React
            </button>
          </div>

          {/* Backend Block */}
          <div id="backend-section" className="bg-[#F3EBF6] dark:bg-[#20152b] text-slate-900 dark:text-white p-8 rounded-2xl border border-purple-200 dark:border-slate-800 text-left flex flex-col justify-between transition-colors">
            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase text-purple-600 dark:text-purple-400">Server Side (🔌)</span>
              <h3 className="text-2xl font-black uppercase">Node.js & Databases</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed">
                Deploy fast RESTful servers. Route Express endpoints, construct databases tables in MongoDB, and deploy full stack SaaS containers.
              </p>

              <div className="bg-[#282A35] text-white p-4 rounded-xl font-mono text-[10px] space-y-1 overflow-x-auto shadow-inner select-none mt-4">
                <div><span className="text-red-400">const</span> express = <span className="text-blue-400">require</span>(<span className="text-yellow-200">&apos;express&apos;</span>);</div>
                <div>app.<span className="text-blue-400">get</span>(<span className="text-yellow-200">&apos;/api&apos;</span>, (req, res) =&gt; res.<span className="text-blue-400">send</span>(<span className="text-yellow-200">&apos;Online&apos;</span>));</div>
              </div>
            </div>
            <button 
              onClick={() => handleLaunchChapter('p5-1-node')} 
              className="mt-6 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 rounded-lg text-xs font-black uppercase tracking-wider transition-all self-start cursor-pointer"
            >
              Start Backend
            </button>
          </div>

        </div>
      </section>

      {/* ── FOOTER (Nextsem Academy style columned) ── */}
      <footer className="bg-[#1f2029] text-white border-t border-slate-850/80 transition-colors mt-auto">
        
        {/* Quick courses band */}
        <div className="bg-[#1b1c24] border-b border-slate-800/60 py-4">
          <div className="max-w-[1200px] mx-auto px-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-black uppercase text-slate-400">
            <button onClick={() => handleScrollToId('cli-section')} className="hover:text-white cursor-pointer">CLI</button>
            <span>•</span>
            <button onClick={() => handleScrollToId('html-section')} className="hover:text-white cursor-pointer">HTML</button>
            <span>•</span>
            <button onClick={() => handleScrollToId('css-section')} className="hover:text-white cursor-pointer">CSS</button>
            <span>•</span>
            <button onClick={() => handleScrollToId('js-section')} className="hover:text-white cursor-pointer">JAVASCRIPT</button>
            <span>•</span>
            <button onClick={() => handleScrollToId('react-section')} className="hover:text-white cursor-pointer">REACT</button>
            <span>•</span>
            <button onClick={() => handleScrollToId('backend-section')} className="hover:text-white cursor-pointer">NODE.JS</button>
            <span>•</span>
            <Link href="/playground" className="hover:text-white">SANDBOX</Link>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-left text-xs text-slate-400">
          
          <div className="space-y-3">
            <h5 className="font-black uppercase text-white text-xs tracking-wider">Top Tutorials</h5>
            <ul className="space-y-2 font-medium">
              <li><button onClick={() => handleScrollToId('html-section')} className="hover:text-white">HTML Tutorial</button></li>
              <li><button onClick={() => handleScrollToId('css-section')} className="hover:text-white">CSS Tutorial</button></li>
              <li><button onClick={() => handleScrollToId('js-section')} className="hover:text-white">JavaScript Tutorial</button></li>
              <li><button onClick={() => handleScrollToId('react-section')} className="hover:text-white">React Tutorial</button></li>
              <li><button onClick={() => handleScrollToId('backend-section')} className="hover:text-white">Node.js Backend</button></li>
              <li><button onClick={() => handleScrollToId('cli-section')} className="hover:text-white">Windows Commands (CLI)</button></li>
              <li><Link href="/curriculum" className="hover:text-white text-emerald-400 font-bold">🚀 Full Dev Curriculum</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-black uppercase text-white text-xs tracking-wider">Simulators & Tools</h5>
            <ul className="space-y-2 font-medium">
              <li><Link href="/cmd" target="_blank" className="hover:text-white">🪟 Windows CMD Simulator</Link></li>
              <li><Link href="/git" target="_blank" className="hover:text-white">🌿 Git Simulator</Link></li>
              <li><Link href="/playground" className="hover:text-white">💻 Code Sandbox Playground</Link></li>
              <li><Link href="/bca" className="hover:text-white">🎓 BCA Semester Hub</Link></li>
              <li><button onClick={() => handleLaunchChapter('p0-3-vscode')} className="hover:text-white">VS Code Editor Setup</button></li>
              <li><button onClick={() => handleLaunchChapter('p0-5-devtools')} className="hover:text-white">Chrome DevTools Console</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-black uppercase text-white text-xs tracking-wider">Career Prep</h5>
            <ul className="space-y-2 font-medium">
              <li><button onClick={() => handleLaunchChapter('p7-2-resume')} className="hover:text-white">ATS-friendly Resume</button></li>
              <li><button onClick={() => handleLaunchChapter('p7-1-interview')} className="hover:text-white">Technical Interview Q&A</button></li>
              <li><button onClick={() => handleLaunchChapter('p7-3-github')} className="hover:text-white">GitHub Portfolio SEO</button></li>
              <li><button onClick={() => handleLaunchChapter('p6-1-portfolio')} className="hover:text-white">PWA App manifest</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-black uppercase text-white text-xs tracking-wider">Legal & Academy</h5>
            <ul className="space-y-2 font-medium">
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Support</Link></li>
              <li><Link href="/about" className="hover:text-white">About Nextsem</Link></li>
            </ul>
          </div>

        </div>

        {/* Disclaimer / Nextsem Academy style */}
        <div className="bg-[#1b1c24] text-[10px] text-slate-500 font-medium py-6 px-4 border-t border-slate-800/40">
          <div className="max-w-[1000px] mx-auto text-center space-y-3 leading-relaxed">
            <p>
              Nextsem Academy is optimized for learning, testing, and training. Examples and simulations might be simplified to improve reading and basic understanding. Tutorials, references, and examples are constantly reviewed to avoid errors, but we cannot warrant full correctness of all content.
            </p>
            <p>
              While using Nextsem Academy, you agree to have read and accepted our <Link href="/terms" className="underline hover:text-slate-400">terms of use</Link>, <Link href="/privacy" className="underline hover:text-slate-400">cookie and privacy policy</Link>.
            </p>
            <p className="pt-2 text-slate-400 font-bold uppercase tracking-wider font-sans">
              Copyright {new Date().getFullYear()} by Nextsem Academy. All rights reserved. Powered by React, Next.js & Tailwind CSS.
            </p>
          </div>
        </div>

      </footer>

    </div>
  );
}
