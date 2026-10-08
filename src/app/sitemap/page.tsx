"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Map, Star, Search, Sparkles, Book, Monitor, Cpu, 
  GraduationCap, Compass, Layers, Home, Info, ShieldCheck, 
  Code, BookOpen, ChevronRight, Terminal, ArrowRight
} from 'lucide-react';
import { bcaSemesters } from '@/data/bcaCoursesData';
import searchIndex from '@/data/searchIndex.json';
import { htmlLessons } from '@/data/htmlLessonsData';

interface SitemapLink {
  title: string;
  url: string;
  category: 'core' | 'bca' | 'book';
  description: string;
  icon: React.ReactNode;
  tag?: string;
}

export default function UserSitemap() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // 1. Compile Core Routes
  const coreRoutes: SitemapLink[] = [
    { title: "Home Page", url: "/", category: "core", description: "NextSem Academy main landing page and platform features overview.", icon: <Home size={16} /> },
    { title: "About Us", url: "/about", category: "core", description: "Our mission, teaching methodology, and developer credentials.", icon: <Info size={16} /> },
    { title: "User Dashboard", url: "/profile", category: "core", description: "Personalized revision workspace tracking your XP, badges, and progress.", icon: <Star size={16} />, tag: "Personal" },
    { title: "BCA Semester Revision", url: "/course", category: "core", description: "Central dashboard directory for IGNOU BCA degree courses.", icon: <GraduationCap size={16} /> },
    { title: "Windows Command Simulator", url: "/cmd", category: "core", description: "Learn Windows Command Prompt in an interactive simulated CMD console.", icon: <Terminal size={16} />, tag: "Simulator" },
    { title: "systeminfo | findstr OS Diagnostics", url: "/cli/windows-systeminfo-findstr-os-details", category: "core", description: "Filter Windows 11 OS Name, Version, and 64-bit System Type with findstr.", icon: <Terminal size={16} />, tag: "New Lab" },
    { title: "Operating System Desktop", url: "/simulator", category: "core", description: "Visual desktop sandbox featuring drag-and-drop file operations.", icon: <Monitor size={16} />, tag: "Simulator" },
    { title: "Interactive Sandbox", url: "/playground", category: "core", description: "Realtime coding editor and interactive logic components sandbox.", icon: <Code size={16} />, tag: "Interactive" },
    { title: "Git Basics Guide", url: "/git", category: "core", description: "Step-by-step documentation detailing Git repositories and branches.", icon: <BookOpen size={16} /> },
    { title: "Git Terminal Sandbox", url: "/git/terminal", category: "core", description: "Hands-on terminal simulator for executing real git commit operations.", icon: <Terminal size={16} />, tag: "Lab" },
    { title: "Privacy Policy", url: "/privacy", category: "core", description: "NextSem Academy terms of user data confidentiality and cookies policy.", icon: <ShieldCheck size={16} /> },
    { title: "Terms of Service", url: "/terms", category: "core", description: "Terms and conditions detailing student usage regulations.", icon: <Info size={16} /> }
  ];

  // 2. Compile BCA Dynamic Routes
  const bcaRoutes: SitemapLink[] = useMemo(() => {
    const list: SitemapLink[] = [
      { 
        title: "BCA Hub Catalog", 
        url: "/bca", 
        category: "bca", 
        description: "Central entry directory for all BCA online courses, files, and chatbot revision systems.", 
        icon: <Layers size={16} /> 
      },
      { 
        title: "BCA Practical Learning Portal", 
        url: "/bca/practical", 
        category: "bca", 
        description: "3-Year job-oriented practical training system across 6 Semesters, 4 career tracks, daily 2-hour hands-on coding labs, and GitHub portfolio milestones.", 
        icon: <Code size={16} />, 
        tag: "Practical Portal" 
      },
      { 
        title: "Semmy AI Chatbot Assistant", 
        url: "/bca/semmy-ai", 
        category: "bca", 
        description: "Our contextual AI agent designed to help answer IGNOU BCA questions instantly.", 
        icon: <Sparkles size={16} />, 
        tag: "AI Tutor" 
      },
      { 
        title: "Textbook PDF Viewer Interface", 
        url: "/bca/viewer", 
        category: "bca", 
        description: "Static PDF reading and progress tagging client for syllabus textbooks.", 
        icon: <Book size={16} /> 
      },
      { 
        title: "Unit 2: Operating System (Visual Notes & Lab)", 
        url: "/bca/notes/bcs-011-unit-2-operating-system", 
        category: "bca", 
        description: "12-page comprehensive interactive notes, initial-alphabet fill-in-the-blanks, and Windows 11 CMD diagnostic simulator.", 
        icon: <Sparkles size={16} />, 
        tag: "Interactive Notes" 
      },
      { 
        title: "Unit 3: Concept in Programming Language (Visual Notes & Quiz)", 
        url: "/bca/notes/bcs-011-unit-3-programming-languages", 
        category: "bca", 
        description: "Line-by-line notes on Pages 65–67, Grammar Quadruplet L(T,N,P,S), BNF notation, parsing, ambiguity, and master quiz.", 
        icon: <Sparkles size={16} />, 
        tag: "Interactive Notes" 
      },
      { 
        title: "Block 3 Unit 1: Networking & Internet (Interactive Study Suite)", 
        url: "/bca/notes/bcs-011-block-3-unit-1-networking-and-internet", 
        category: "bca", 
        description: "Pages 5–38 complete notes, transmission modes, guided/unguided media, topologies, OSI 7 layers, network devices, TCP/IP, IP addressing, DNS, and Windows 11 terminal simulator.", 
        icon: <Sparkles size={16} />, 
        tag: "Interactive Notes" 
      },
      { 
        title: "Unit 5: My Personal Computer (Visual Notes)", 
        url: "/bca/notes/bcs-011-unit-5", 
        category: "bca", 
        description: "Deeply visual revision slides, interactive self-check MCQs, and fill-in-the-blank drills.", 
        icon: <Sparkles size={16} />, 
        tag: "Interactive Notes" 
      },
      { 
        title: "10 Master Problems: Algorithms & Flowcharts Hub", 
        url: "/algorithms-and-flowcharts", 
        category: "bca", 
        description: "Overview and directory of the 10 core computer science problem-solving archetypes with C++ programs.", 
        icon: <Code size={16} />, 
        tag: "Algorithms Hub" 
      },
      { 
        title: "Problem 7: Real & Complex Roots of Quadratic Equation", 
        url: "/algorithms-and-flowcharts/problem-7-quadratic-equation-roots", 
        category: "bca", 
        description: "Step-by-step algorithm, interactive Mermaid diagram, ANSI SVG vector flowchart, and production C++ program.", 
        icon: <Code size={16} />, 
        tag: "Problem 7" 
      },
      { 
        title: "Problem 8: Linear Search with Early Exit in Array", 
        url: "/algorithms-and-flowcharts/problem-8-linear-search-in-array", 
        category: "bca", 
        description: "Sequential search algorithm, syntax-validated Mermaid flowchart, ANSI SVG diagram, and C++ vector program.", 
        icon: <Code size={16} />, 
        tag: "Problem 8" 
      }
    ];

    bcaSemesters.forEach((sem) => {
      // Add Semester page
      list.push({
        title: `${sem.name} Dashboard`,
        url: `/bca/${sem.id}`,
        category: 'bca',
        description: `Subject index and completion tracking for BCA Semester ${sem.id}.`,
        icon: <GraduationCap size={16} />
      });

      // Add Subject pages
      sem.subjects.forEach((subj) => {
        list.push({
          title: `[${subj.code}] ${subj.name}`,
          url: `/bca/${sem.id}/${subj.code}`,
          category: 'bca',
          description: `Syllabus units catalog, reference files, and reading modules for ${subj.code}.`,
          icon: <BookOpen size={16} />
        });
      });
    });

    return list;
  }, []);

  // 4. Compile Book Chapter Dynamic Routes
  const bookRoutes: SitemapLink[] = useMemo(() => {
    // 4.1 Filter and map standard chapters (excluding HTML ones)
    const baseChapters = searchIndex
      .filter((chapter) => !chapter.id.startsWith("p1-"))
      .map((chapter) => ({
        title: chapter.title,
        url: `/book/${chapter.id}`,
        category: 'book' as const,
        description: `Bite-sized visual textbook chapter with interactive code widgets, drills, and flashcards.`,
        icon: <Book size={16} />,
        tag: chapter.phase
      }));

    // 4.2 Map all 100 HTML lessons
    const htmlChapters = htmlLessons.map((lesson) => ({
      title: `Lesson ${lesson.id}: ${lesson.title}`,
      url: lesson.id === 1 ? "/html" : `/html/${lesson.slug}`,
      category: 'book' as const,
      description: `Free HTML lesson covering ${lesson.title} with interactive checks in English, Hinglish, and Hindi.`,
      icon: <Code size={16} />,
      tag: `HTML ${lesson.unit.split(':')[0]}`
    }));

    return [...baseChapters, ...htmlChapters];
  }, []);

  // 5. Combine and Filter all routes
  const allRoutes = useMemo(() => {
    return [...coreRoutes, ...bcaRoutes, ...bookRoutes];
  }, [bcaRoutes, bookRoutes]);

  const filteredRoutes = useMemo(() => {
    return allRoutes.filter((route) => {
      // Category filter
      if (activeCategory !== 'all' && route.category !== activeCategory) {
        return false;
      }
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          route.title.toLowerCase().includes(query) ||
          route.url.toLowerCase().includes(query) ||
          route.description.toLowerCase().includes(query) ||
          (route.tag && route.tag.toLowerCase().includes(query))
        );
      }
      return true;
    });
  }, [allRoutes, searchQuery, activeCategory]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white flex flex-col justify-between font-sans selection:bg-[#c1a648]/30 relative">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-emerald-955/10 blur-[130px] pointer-events-none" />

      {/* Header */}
      <header className="h-16 border-b border-slate-850/50 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-4 md:px-8 shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-slate-400 hover:text-white font-bold text-xs uppercase tracking-wider transition-all"
          >
            <Home size={14} />
            <span>NextSem Academy</span>
          </button>
          <span className="text-slate-700">|</span>
          <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider flex items-center gap-1">
            <Map size={11} />
            Visual Sitemap
          </span>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-6">
        
        {/* Banner Card */}
        <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#12121c] to-[#0a0a10] border border-white/5 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-955/40 border border-emerald-500/20 text-emerald-300 rounded-full text-[9px] font-black uppercase tracking-widest">
              <Sparkles size={10} className="animate-spin" />
              Sitemap Explorer
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">
              Site Index & Navigator
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Explore the entire NextSem curriculum. Instantly navigate across 144 revision subjects, interactive command-line sandbox terminals, visual study notebooks, and custom AI tools.
            </p>
          </div>
          
          {/* Dashboard Stats */}
          <div className="flex items-center gap-3 bg-black/40 border border-slate-850 p-4 rounded-2xl shrink-0">
            <div className="text-center px-4 border-r border-slate-800">
              <span className="block text-xl font-black text-white">{allRoutes.length}</span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Total Pages</span>
            </div>
            <div className="text-center px-4 border-r border-slate-800">
              <span className="block text-xl font-black text-emerald-400">{coreRoutes.length}</span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Apps/Labs</span>
            </div>
            <div className="text-center px-4">
              <span className="block text-xl font-black text-indigo-400">{bookRoutes.length}</span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Chapters</span>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#0b0b11] border border-slate-850/60 p-4 rounded-2xl">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {[
              { id: 'all', label: 'All pages', count: allRoutes.length },
              { id: 'core', label: 'Core & Simulators', count: coreRoutes.length },
              { id: 'bca', label: 'BCA Course', count: bcaRoutes.length },
              { id: 'book', label: 'Book Chapters', count: bookRoutes.length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/10'
                    : 'bg-slate-900/60 border border-slate-850/65 text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                  activeCategory === tab.id ? 'bg-emerald-800 text-emerald-200' : 'bg-slate-800 text-slate-500'
                }`}>{tab.count}</span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Search size={14} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sitemap..."
              className="w-full bg-slate-950/70 border border-slate-850 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/40"
            />
          </div>
        </div>

        {/* Results Info */}
        {searchQuery && (
          <div className="text-xs text-slate-500">
            Found <span className="text-slate-300 font-bold">{filteredRoutes.length}</span> matching routes for &ldquo;{searchQuery}&rdquo;.
          </div>
        )}

        {/* Sitemap Grid */}
        {filteredRoutes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRoutes.map((route, rIdx) => (
              <div
                key={route.url + '-' + rIdx}
                onClick={() => router.push(route.url)}
                className="group relative bg-[#0b0b11] border border-slate-850/60 hover:bg-[#11111a]/80 hover:border-slate-800 hover:shadow-xl rounded-2xl p-5 transition-all duration-150 cursor-pointer flex flex-col justify-between gap-4"
              >
                {/* Top Half */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-850 flex items-center justify-center text-slate-400 group-hover:text-emerald-400 transition-colors">
                      {route.icon}
                    </div>
                    {route.tag && (
                      <span className="text-[9px] font-black uppercase tracking-wider text-indigo-400 bg-indigo-950/40 border border-indigo-900/30 px-2 py-0.5 rounded-md">
                        {route.tag}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-white group-hover:text-emerald-300 transition-colors leading-snug">
                      {route.title}
                    </h3>
                    <p className="text-[10px] text-slate-500 font-mono select-all truncate">
                      {route.url}
                    </p>
                  </div>
                </div>

                {/* Bottom Half */}
                <div className="space-y-3">
                  <p className="text-[11px] text-slate-400 leading-relaxed min-h-[44px]">
                    {route.description}
                  </p>
                  
                  <div className="flex items-center gap-1 text-[10px] font-black uppercase text-slate-500 group-hover:text-emerald-400 tracking-wider transition-all duration-150 mt-1">
                    <span>Visit Page</span>
                    <ArrowRight size={10} className="transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-16 border border-dashed border-slate-850 text-center rounded-3xl space-y-3">
            <Compass size={32} className="mx-auto text-slate-650" />
            <h3 className="text-sm font-bold text-white">No pages match your search</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn&apos;t find any routes that match &ldquo;{searchQuery}&rdquo;. Try using a different keyword or browsing by category tabs.
            </p>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-[10px] text-slate-700 border-t border-white/5 select-none bg-[#030306] mt-12">
        © 2026 Nextsem Academy · Sitemap Directory for 144 Platform Pages
      </footer>
    </div>
  );
}
