"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProgress } from '../../context/ProgressContext';
import { auth } from '../../lib/firebase';
import { coursePhases } from '../../data/courseData';
import chapterSimulators from '../../data/chapterSimulators';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import AdSenseBanner from "../../components/AdSenseBanner";
import {
  Code,
  Palette,
  Cpu,
  Cloud,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Layers,
  FileCode,
  Briefcase,
  Rocket
} from 'lucide-react';

interface ModuleItem {
  id: string;
  title: string;
  subtitle: string;
  statusLabel: string;
  description: string;
  firstChapterId: string;
  color: string;
  renderIllustration: () => React.ReactNode;
}

export default function CourseClient() {
  const router = useRouter();
  const { completedChapters } = useProgress();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [showSignOut, setShowSignOut] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [loadingChapterPath, setLoadingChapterPath] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  // Stagger boot steps for the simulated upcoming lessons
  useEffect(() => {
    if (!loadingChapterPath) return;

    const interval = setInterval(() => {
      setLoadingStep((s: number) => s + 1);
    }, 600); // 600ms per lesson line

    const timeout = setTimeout(() => {
      router.push(`/book/${loadingChapterPath}`);
    }, 3200);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [loadingChapterPath, router]);

  const handleLaunchChapter = (path: string) => {
    if (path === "cmd") {
      router.push("/cmd");
    } else {
      setLoadingChapterPath(path);
      setLoadingStep(0);
    }
  };

  // Calculate completed count
  const completedCount = Object.keys(completedChapters).filter(k => completedChapters[k]).length;

  // Read initial active card from query parameter (e.g. /course?active=2)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const activeParam = params.get("active");
      if (activeParam) {
        const idx = parseInt(activeParam, 10);
        if (!isNaN(idx) && idx >= 0 && idx < 9) {
          setActiveCardIdx(idx);
        }
      }
    }
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("nextsem_user");
      router.push("/");
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  // Touch Swipe Handlers for carousel
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 55;
    const isRightSwipe = distance < -55;

    if (isLeftSwipe) {
      setActiveCardIdx(prev => (prev + 1) % modules.length);
    }
    if (isRightSwipe) {
      setActiveCardIdx(prev => (prev - 1 + modules.length) % modules.length);
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Mouse Drag Handlers for carousel
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStart(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStart === null) return;
    const distance = dragStart - e.clientX;
    const isLeftSwipe = distance > 55;
    const isRightSwipe = distance < -55;

    if (isLeftSwipe) {
      setActiveCardIdx(prev => (prev + 1) % modules.length);
    }
    if (isRightSwipe) {
      setActiveCardIdx(prev => (prev - 1 + modules.length) % modules.length);
    }
    setDragStart(null);
  };

  // 9 Modules Definition matching coursePhases
  const modules: ModuleItem[] = [
    {
      id: "cli",
      title: "Windows commands Module 1",
      subtitle: "LEVEL 1 • RECOMMENDED",
      statusLabel: "CMD.EXE Terminal Workstation",
      description: "Master standard command prompt operations, directory navigation, file management, piping, and diagnostic diagnostics.",
      firstChapterId: "cmd",
      color: "#8b5cf6",
      renderIllustration: () => (
        <svg viewBox="0 0 200 200" className="w-56 h-56">
          <defs>
            <filter id="glow-violet" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="violet-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          {/* Glowing background halo */}
          <circle cx="100" cy="100" r="50" fill="url(#violet-grad)" opacity="0.15" />

          {/* Windows 11 Logo (Perspective / Flat styled Grid) */}
          <g transform="translate(60, 50)" className="animate-pulse">
            {/* Top Left */}
            <path d="M5,5 L28,2 L28,25 L5,25 Z" fill="#0078d4" opacity="0.9" />
            {/* Top Right */}
            <path d="M32,2 L55,5 L55,25 L32,25 Z" fill="#0078d4" opacity="0.9" />
            {/* Bottom Left */}
            <path d="M5,29 L28,29 L28,52 L5,49 Z" fill="#0078d4" opacity="0.9" />
            {/* Bottom Right */}
            <path d="M32,29 L55,29 L55,49 L32,52 Z" fill="#0078d4" opacity="0.9" />
          </g>

          {/* Terminal Command Window overlay */}
          <g transform="translate(85, 90)" filter="url(#glow-violet)">
            {/* Terminal Window container */}
            <rect x="0" y="0" width="80" height="55" rx="6" fill="#030712" stroke="#8b5cf6" strokeWidth="1.5" />
            {/* Header bar */}
            <line x1="0" y1="12" x2="80" y2="12" stroke="#2a3347" strokeWidth="1" />
            {/* Window control dots */}
            <circle cx="6" cy="6" r="1.5" fill="#ef4444" />
            <circle cx="12" cy="6" r="1.5" fill="#f59e0b" />
            <circle cx="18" cy="6" r="1.5" fill="#10b981" />
            
            {/* Command Symbol prompt >_ */}
            <text x="6" y="32" fill="#39FF14" fontStyle="normal" fontWeight="bold" fontFamily="monospace" fontSize="16" letterSpacing="0">
              &gt;_
            </text>
            
            {/* Cursor animation */}
            <rect x="32" y="21" width="6" height="12" fill="#39FF14" opacity="0.8">
              <animate attributeName="opacity" values="0.8;0;0.8" dur="1s" repeatCount="indefinite" />
            </rect>
          </g>
        </svg>
      )
    },
    {
      id: "p0",
      title: "Introduction to Coding",
      subtitle: "LEVEL 2 • RECOMMENDED",
      statusLabel: "Developer Setup & Git",
      description: "Install runtime dependencies, set up visual editor sandboxes, and initialize git version repositories.",
      firstChapterId: "p0-setup",
      color: "#c084fc",
      renderIllustration: () => (
        <svg viewBox="0 0 200 200" className="w-56 h-56">
          <defs>
            <filter id="glow-purple" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <g filter="url(#glow-purple)" transform="translate(100, 100)">
            {/* VS Code box layout styling */}
            <rect x="-35" y="-35" width="70" height="70" rx="14" fill="#5b2c6f" opacity="0.25" stroke="#c084fc" strokeWidth="3.5" />

            {/* Git network nodes */}
            <circle cx="-15" cy="15" r="5" fill="#c084fc" />
            <circle cx="15" cy="-15" r="5" fill="#c084fc" />
            <circle cx="15" cy="15" r="5" fill="#c084fc" />

            <line x1="-15" y1="15" x2="15" y2="15" stroke="#c084fc" strokeWidth="2" />
            <line x1="15" y1="-15" x2="15" y2="15" stroke="#c084fc" strokeWidth="2" />

            {/* Glowing tag bracket */}
            <text x="0" y="5" fill="#ffffff" fontSize="22" fontWeight="900" textAnchor="middle" fontFamily="monospace">
              {"<>"}
            </text>
          </g>
        </svg>
      )
    },
    {
      id: "p1",
      title: "Basics of Web Dev",
      subtitle: "LEVEL 3 • CORE PATH",
      statusLabel: "HTML5 Structuring",
      description: "Structure accessible web documents using lists, tables, dynamic forms, semantic layout tags, and SEO tags.",
      firstChapterId: "p1-1-intro-and-text",
      color: "#3b82f6",
      renderIllustration: () => (
        <svg viewBox="0 0 200 200" className="w-56 h-56">
          <defs>
            <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {/* Laptop frame */}
          <rect x="35" y="60" width="130" height="80" rx="8" fill="#11111a" stroke="#1e1b4b" strokeWidth="3" />
          <rect x="42" y="67" width="116" height="66" rx="4" fill="#050508" stroke="#312e81" strokeWidth="1" />
          {/* Laptop Base */}
          <path d="M20,140 L180,140 L170,148 L30,148 Z" fill="#1e1e2f" stroke="#3b82f6" strokeWidth="2" />

          {/* Browser header inside laptop screen */}
          <rect x="44" y="69" width="112" height="10" fill="#1e1b4b" />
          <circle cx="50" cy="74" r="2" fill="#ef4444" />
          <circle cx="56" cy="74" r="2" fill="#eab308" />
          <circle cx="62" cy="74" r="2" fill="#39FF14" />

          {/* Code tags glowing */}
          <g filter="url(#glow-blue)" transform="translate(100, 108)">
            <text x="0" y="0" fill="#3b82f6" fontSize="24" fontWeight="900" textAnchor="middle" fontFamily="monospace">
              {"</>"}
            </text>
          </g>
        </svg>
      )
    },
    {
      id: "p2",
      title: "Advanced HTML/CSS",
      subtitle: "LEVEL 4 • DESIGN PATH",
      statusLabel: "CSS3 Styling & Layouts",
      description: "Design stunning styled containers with CSS variables, Flexbox properties, CSS Grids, and CSS Keyframes.",
      firstChapterId: "p2-1-selectors",
      color: "#2dd4bf",
      renderIllustration: () => (
        <svg viewBox="0 0 200 200" className="w-56 h-56">
          <defs>
            <filter id="glow-teal" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <rect x="40" y="40" width="120" height="120" rx="20" fill="#0c0c14" stroke="#2dd4bf" strokeWidth="2" strokeDasharray="3 3" opacity="0.4" />

          {/* Neon Floating Shapes representing styling */}
          <g filter="url(#glow-teal)">
            <rect x="55" y="55" width="42" height="42" rx="10" fill="#2dd4bf" opacity="0.2" stroke="#2dd4bf" strokeWidth="2" />
            <circle cx="130" cy="75" r="22" fill="#14b8a6" opacity="0.3" stroke="#14b8a6" strokeWidth="2" />
          </g>

          <rect x="75" y="85" width="50" height="30" rx="8" fill="#1e1b4b" stroke="#2dd4bf" strokeWidth="2" />
          <text x="100" y="104" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            CSS3
          </text>
        </svg>
      )
    },
    {
      id: "p3",
      title: "JavaScript Fundamentals",
      subtitle: "LEVEL 5 • CORE PATH",
      statusLabel: "Variables & DOM Events",
      description: "Program dynamic browser features using loops, conditions, functions, objects, arrays, and event handlers.",
      firstChapterId: "p3-1-basics",
      color: "#fbbf24",
      renderIllustration: () => (
        <svg viewBox="0 0 200 200" className="w-56 h-56">
          <defs>
            <filter id="glow-yellow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <circle cx="100" cy="100" r="60" fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="6 4" opacity="0.3" />

          <g filter="url(#glow-yellow)" transform="translate(100, 100)">
            <rect x="-30" y="-30" width="60" height="60" rx="12" fill="#27273a" stroke="#fbbf24" strokeWidth="3" />
            <rect x="-35" y="-18" width="5" height="6" fill="#fbbf24" />
            <rect x="-35" y="-4" width="5" height="6" fill="#fbbf24" />
            <rect x="-35" y="10" width="5" height="6" fill="#fbbf24" />
            <rect x="30" y="-18" width="5" height="6" fill="#fbbf24" />
            <rect x="30" y="-4" width="5" height="6" fill="#fbbf24" />
            <rect x="30" y="10" width="5" height="6" fill="#fbbf24" />

            <path d="M -5,-14 L 8,-4 L -2,0 L 5,14 L -8,4 L 1,0 Z" fill="#fbbf24" />
          </g>
        </svg>
      )
    },
    {
      id: "p4",
      title: "React Basics",
      subtitle: "LEVEL 6 • FRAMEWORK PATH",
      statusLabel: "React SPAs & Context",
      description: "Build reactive single page frontends using jsx elements, functional components, state hooks, and global context API stores.",
      firstChapterId: "p4-1-jsx",
      color: "#ef4444",
      renderIllustration: () => (
        <svg viewBox="0 0 200 200" className="w-56 h-56">
          <defs>
            <filter id="glow-react" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <g filter="url(#glow-react)" transform="translate(100, 100)">
            {/* Center Nucleus */}
            <circle cx="0" cy="0" r="10" fill="#ef4444" />

            {/* Ellipse 1 */}
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="15s"
                repeatCount="indefinite"
              />
              <ellipse cx="0" cy="0" rx="55" ry="20" fill="none" stroke="#ef4444" strokeWidth="2.5" />
            </g>
            {/* Ellipse 2 (rotated 60deg) */}
            <g transform="rotate(60)">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="15s"
                repeatCount="indefinite"
              />
              <ellipse cx="0" cy="0" rx="55" ry="20" fill="none" stroke="#ef4444" strokeWidth="2.5" />
            </g>
            {/* Ellipse 3 (rotated 120deg) */}
            <g transform="rotate(120)">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="15s"
                repeatCount="indefinite"
              />
              <ellipse cx="0" cy="0" rx="55" ry="20" fill="none" stroke="#ef4444" strokeWidth="2.5" />
            </g>
          </g>
        </svg>
      )
    },
    {
      id: "p5",
      title: "Backend & APIs",
      subtitle: "LEVEL 7 • BACKEND PATH",
      statusLabel: "Express Servers & MongoDB",
      description: "Build robust Node REST APIs, configure MongoDB databases, and deploy hosting via Firebase production rules.",
      firstChapterId: "p5-1-node",
      color: "#22c55e",
      renderIllustration: () => (
        <svg viewBox="0 0 200 200" className="w-56 h-56">
          <defs>
            <filter id="glow-backend" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <g filter="url(#glow-backend)" transform="translate(100, 100)">
            <rect x="-35" y="-35" width="70" height="70" rx="12" fill="#14532d" opacity="0.3" stroke="#22c55e" strokeWidth="3" />
            {/* DB cylinder symbol */}
            <ellipse cx="0" cy="-15" rx="18" ry="6" fill="#15803d" stroke="#22c55e" strokeWidth="2" />
            <path d="M-18,-15 L-18,5 A18,6 0 0,0 18,5 L18,-15 Z" fill="#15803d" stroke="#22c55e" strokeWidth="2" />
            <path d="M-18,5 L-18,22 A18,6 0 0,0 18,22 L18,5 Z" fill="#15803d" stroke="#22c55e" strokeWidth="2" />
          </g>
        </svg>
      )
    },
    {
      id: "p6",
      title: "Capstone Projects",
      subtitle: "LEVEL 8 • PORTFOLIO PATH",
      statusLabel: "Full Stack Applications",
      description: "Combine HTML, CSS, JavaScript, and backend logic to assemble professional projects and publish them.",
      firstChapterId: "p6-1-portfolio",
      color: "#94a3b8",
      renderIllustration: () => (
        <svg viewBox="0 0 200 200" className="w-56 h-56">
          <defs>
            <filter id="glow-slate" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <g filter="url(#glow-slate)" transform="translate(100, 100)">
            <circle cx="0" cy="0" r="40" fill="#334155" opacity="0.3" stroke="#94a3b8" strokeWidth="3" />
            {/* Star badge */}
            <polygon points="0,-25 7,-9 24,-7 12,5 15,22 0,14 -15,22 -12,5 -24,-7 -7,-9" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
          </g>
        </svg>
      )
    },
    {
      id: "p7",
      title: "Placement Prep",
      subtitle: "LEVEL 9 • PLACEMENT PREP",
      statusLabel: "Interview & Resume Funnels",
      description: "Pass technical mock interviews, optimize your developer resume, and structure freelance funnels.",
      firstChapterId: "p7-1-interview",
      color: "#f472b6",
      renderIllustration: () => (
        <svg viewBox="0 0 200 200" className="w-56 h-56">
          <defs>
            <filter id="glow-pink" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <g filter="url(#glow-pink)" transform="translate(100, 100)">
            {/* Rocket symbol representing placement launch */}
            <g>
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,5; 0,-5; 0,5"
                dur="3s"
                repeatCount="indefinite"
              />
              <path d="M0,-35 C5,-15 15,-10 15,15 L-15,15 C-15,-10 -5,-15 0,-35 Z" fill="#db2777" stroke="#f472b6" strokeWidth="2.5" />
              <polygon points="-15,10 -25,25 -15,20" fill="#be185d" />
              <polygon points="15,10 25,25 15,20" fill="#be185d" />
              <path d="M-5,15 L-10,30 L0,22 L10,30 L5,15 Z" fill="#ef4444" />
            </g>
          </g>
        </svg>
      )
    }
  ];

  if (!mounted) return null;

  const activeModule = modules[activeCardIdx];

  return (
    <div className="fixed inset-0 flex flex-col justify-between bg-slate-950 text-white overflow-hidden pb-16 md:pb-0 select-none font-sans">
      {/* Ambient glowing radial light */}
      <div
        className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20 transition-all duration-750"
        style={{ backgroundColor: activeModule.color }}
      />



      {/* ── 2. Syllabus Header Title Area (8vh) ── */}
      <section className="h-[8vh] flex flex-col items-center justify-center text-center px-4 shrink-0 mt-2">
        <h2 className="text-white text-lg sm:text-xl font-black font-sans tracking-wide uppercase leading-tight">
          Course Syllabus
        </h2>
        <span className="text-[8px] font-black tracking-widest uppercase mt-1.5 text-slate-500">
          Complete chapters to unlock achievements and certs
        </span>
      </section>

      <div className="max-w-md mx-auto px-4 shrink-0">
        <AdSenseBanner />
      </div>

      {/* ── 3. Modules List (84vh) ── */}
      <section className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4 custom-scrollbar pb-safe select-none">
        <div className="max-w-md mx-auto space-y-4">
          {modules.map((mod, index) => {
            const matchingPhase = coursePhases.find(p => p.id === mod.id.toUpperCase());
            const topicsList = matchingPhase?.topics || [];
            const completedTopics = topicsList.filter(t => completedChapters[t.path]);
            const modPercentComplete = topicsList.length > 0 ? Math.round((completedTopics.length / topicsList.length) * 100) : 0;
            
            return (
              <React.Fragment key={mod.id}>
                {index === 3 && (
                  <AdSenseBanner />
                )}
                <div
                  className="bg-[#111116]/90 border border-white/5 rounded-3xl p-5 flex flex-col gap-4 shadow-xl relative overflow-hidden"
              >
                {/* Glow accent */}
                <div 
                  className="absolute -top-10 -left-10 w-24 h-24 rounded-full blur-[60px] opacity-10 pointer-events-none"
                  style={{ backgroundColor: mod.color }}
                />

                {/* Module Summary info row */}
                <div className="flex items-center justify-between gap-4 w-full">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0"
                      style={{
                        borderColor: `${mod.color}35`,
                        backgroundColor: `${mod.color}0a`
                      }}
                    >
                      {mod.id === "cli" && (
                        <svg viewBox="0 0 24 24" width="16" height="16" fill={mod.color}>
                          <path d="M0 3.449L9.75 2.1v9.45H0V3.449zM0 12.45h9.75v9.45L0 20.551v-8.1zM10.8 1.95L24 0v11.55H10.8V1.95zM10.8 12.45H24v11.55l-13.2-1.95v-9.6z" />
                        </svg>
                      )}
                      {mod.id === "p0" && <Layers size={16} style={{ color: mod.color }} />}
                      {mod.id === "p1" && <Code size={16} style={{ color: mod.color }} />}
                      {mod.id === "p2" && <Palette size={16} style={{ color: mod.color }} />}
                      {mod.id === "p3" && <Cpu size={16} style={{ color: mod.color }} />}
                      {mod.id === "p4" && <FileCode size={16} style={{ color: mod.color }} />}
                      {mod.id === "p5" && <Cloud size={16} style={{ color: mod.color }} />}
                      {mod.id === "p6" && <Briefcase size={16} style={{ color: mod.color }} />}
                      {mod.id === "p7" && <Rocket size={16} style={{ color: mod.color }} />}
                    </div>

                    <div className="text-left">
                      <span className="block text-[8px] font-black uppercase text-slate-500 tracking-wider">Level {index + 1}</span>
                      <h4 className="text-xs font-black text-white tracking-tight uppercase leading-tight mt-0.5">
                        {mod.title}
                      </h4>
                    </div>
                  </div>

                  <span className="text-[10px] font-black tracking-wider" style={{ color: mod.color }}>
                    {modPercentComplete}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1 bg-slate-950 border border-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${modPercentComplete}%`,
                      backgroundColor: mod.color
                    }}
                  />
                </div>

                {/* Chapters nodes list checklist */}
                <div className="flex flex-col gap-2.5 mt-1 border-t border-white/5 pt-3">
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest text-left">
                    Chapters Checklist:
                  </span>

                  <div className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
                    {topicsList.map((topic, tIdx) => {
                      const isChapterCompleted = !!completedChapters[topic.path];
                      const isCurrent = !isChapterCompleted && (tIdx === 0 || !!completedChapters[topicsList[tIdx - 1]?.path]);
                      
                      return (
                        <button
                          key={topic.path}
                          onClick={() => handleLaunchChapter(topic.path)}
                          className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                            isCurrent
                              ? "bg-slate-900/60 border-violet-500/40 text-white"
                              : isChapterCompleted
                              ? "bg-slate-900/20 border-white/5 text-slate-400"
                              : "bg-slate-950/20 border-white/5 text-slate-650 hover:border-slate-800"
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0 pr-3">
                            {/* Checkbox badge circle */}
                            <div className="shrink-0 flex items-center justify-center">
                              {isChapterCompleted ? (
                                <div className="w-4 h-4 rounded-full bg-[#39FF14]/20 border border-[#39FF14] flex items-center justify-center text-[#39FF14] text-[8px] font-black">
                                  ✓
                                </div>
                              ) : isCurrent ? (
                                <div className="w-4 h-4 rounded-full border border-violet-500 flex items-center justify-center">
                                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                                </div>
                              ) : (
                                <div className="w-4 h-4 rounded-full border border-slate-800 bg-transparent" />
                              )}
                            </div>

                            <span className="text-[10px] font-bold truncate leading-tight">
                              {topic.label}
                            </span>
                          </div>

                          <span className="text-[8px] font-black uppercase text-slate-500 tracking-wide shrink-0">
                            {isChapterCompleted ? "Complete" : isCurrent ? "Active" : "Locked"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
              </React.Fragment>
            );
          })}
        </div>
        <div className="max-w-md mx-auto px-4 mt-4 shrink-0">
          <AdSenseBanner />
        </div>
      </section>



      {/* Animations style block */}
      <style>{`
        .animate-spin-slow {
          animation: spin 35s linear infinite;
        }
        .animate-spin-reverse-slow {
          animation: spin-reverse 20s linear infinite;
        }
        @keyframes spin {
          from { transform: translate(0, 0) rotate(0deg); }
          to   { transform: translate(0, 0) rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: translate(0, 0) rotate(360deg); }
          to   { transform: translate(0, 0) rotate(0deg); }
        }
        .animate-scaleIn {
          animation: scaleIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* ── Windows 11 Style Boot Loader Overlay ── */}
      {loadingChapterPath && (() => {
        const sim = chapterSimulators.find(s => s.chapterId === loadingChapterPath);
        const lessonsList = sim ? sim.lessons : [];
        const activePhase = coursePhases.find(p => p.topics.some(t => t.path === loadingChapterPath));

        return (
          <div className="fixed inset-0 z-[300] bg-[#000000] flex flex-col items-center justify-between py-16 px-6 select-none font-mono">
            {/* Top Windows 11 Logo Simulation */}
            <div className="flex flex-col items-center gap-3 mt-8">
              {/* Windows 11 Grid Logo in Neon Green */}
              <div className="grid grid-cols-2 gap-1 w-12 h-12 opacity-80 animate-pulse">
                <span className="w-5 h-5 bg-[#39FF14] rounded-sm shadow-[0_0_10px_rgba(57,255,20,0.5)]" />
                <span className="w-5 h-5 bg-[#39FF14] rounded-sm shadow-[0_0_10px_rgba(57,255,20,0.5)]" />
                <span className="w-5 h-5 bg-[#39FF14] rounded-sm shadow-[0_0_10px_rgba(57,255,20,0.5)]" />
                <span className="w-5 h-5 bg-[#39FF14] rounded-sm shadow-[0_0_10px_rgba(57,255,20,0.5)]" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#39FF14]">
                NEXTSEM OS v11.0
              </span>
            </div>

            {/* Middle: Windows 11 Rotating Progress Ring */}
            <div className="flex flex-col items-center gap-6 my-auto">
              <div className="relative w-16 h-16 flex items-center justify-center">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      width: "100%",
                      height: "100%",
                      transformOrigin: "center center",
                      animation: "win11-orbit 4s infinite",
                      animationDelay: `${i * 0.15}s`,
                    }}
                  >
                    <div className="w-2.5 h-2.5 bg-[#39FF14] rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_10px_rgba(57,255,20,0.6)]" />
                  </div>
                ))}
              </div>

              {/* Status and logs */}
              <div className="flex flex-col items-center gap-4 text-center max-w-sm">
                <span className="text-xs font-black text-white/90">
                  Booting into {activePhase?.id || "Level"} Chapter Simulator...
                </span>

                {/* Simulated Boot Logs (Staggered Lessons) */}
                <div className="w-64 bg-slate-950/60 border border-slate-900 rounded-xl p-4 text-[10px] text-slate-400 text-left space-y-1.5 min-h-[120px]">
                  {lessonsList.slice(0, 4).map((lesson, idx) => {
                    const isVisible = loadingStep >= idx;
                    if (!isVisible) return null;
                    return (
                      <div key={lesson.id} className="flex items-center gap-2 animate-fadeInFast text-white/80">
                        <span className="text-[#39FF14]">✓</span>
                        <span className="truncate">Loaded: {lesson.title}</span>
                      </div>
                    );
                  })}
                  {lessonsList.length > 4 && loadingStep >= 4 && (
                    <div className="text-slate-500 italic text-[8px] pl-5">
                      + {lessonsList.length - 4} more lessons prepared...
                    </div>
                  )}
                  {loadingStep >= lessonsList.length && (
                    <div className="text-[#39FF14] font-black text-[9px] mt-1 text-center animate-pulse">
                      SYSTEM READY — LAUNCHING 🚀
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Brand */}
            <div className="text-[8px] text-slate-500 tracking-wider">
              ⊞ MICROSOFT WINDOWS SIMULATION SANDBOX
            </div>

            {/* Self-contained CSS keyframes */}
            <style>{`
              @keyframes win11-orbit {
                0% { transform: rotate(180deg); opacity: 1; animation-timing-function: ease-out; }
                7% { transform: rotate(300deg); animation-timing-function: linear; }
                30% { transform: rotate(410deg); animation-timing-function: ease-in-out; }
                39% { transform: rotate(560deg); animation-timing-function: linear; }
                70% { transform: rotate(780deg); opacity: 1; animation-timing-function: ease-out; }
                75% { transform: rotate(900deg); animation-timing-function: linear; }
                76% { transform: rotate(900deg); opacity: 0; }
                100% { transform: rotate(900deg); opacity: 0; }
              }
            `}</style>
          </div>
        );
      })()}
    </div>
  );
}
