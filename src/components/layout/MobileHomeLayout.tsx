"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { 
  Bell, 
  Search, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  BookOpen, 
  Code, 
  Terminal, 
  Sparkles, 
  Bookmark, 
  Clock, 
  TrendingUp, 
  FileText, 
  Sun, 
  Moon, 
  X, 
  Menu,
  LogIn,
  LogOut,
  User,
  CheckCircle,
  GraduationCap,
  Briefcase,
  Layers,
  Cpu,
  Palette,
  Cloud,
  GitBranch,
  Server
} from 'lucide-react';
import searchIndex from '@/data/searchIndex.json';
import { useProgress } from '@/context/ProgressContext';
import { auth, signInWithGoogle } from "@/lib/firebase";
import { signOut } from "firebase/auth";

interface SearchItem {
  id: string;
  title: string;
  content: string;
  phase: string;
  duration: string;
  color: string;
  icon: string;
}

export default function MobileHomeLayout() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { completedChapters } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [expandedAccordions, setExpandedAccordions] = useState<Record<string, boolean>>({});
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; photo?: string } | null>(null);
  const [bookmarkedLessons, setBookmarkedLessons] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleAuthChange = () => {
      const stored = localStorage.getItem("nextsem_user");
      if (stored) {
        try {
          setCurrentUser(JSON.parse(stored));
        } catch (e) {
          setCurrentUser(null);
        }
      } else if (auth.currentUser) {
        setCurrentUser({
          name: auth.currentUser.displayName || "Student",
          email: auth.currentUser.email || "",
          photo: auth.currentUser.photoURL || undefined
        });
      } else {
        setCurrentUser(null);
      }
    };
    handleAuthChange();
    window.addEventListener("nextsem_auth_changed", handleAuthChange);

    // Load saved bookmarks from localStorage
    try {
      const saved = localStorage.getItem('nextsem_bookmarks');
      if (saved) {
        setBookmarkedLessons(JSON.parse(saved));
      } else {
        setBookmarkedLessons([
          'learn-how-to-join-git-branch-on-github',
          'learn-windows-command-prompt-cmd-basics',
          'learn-html-web-free-lessons-what-is-the-internet',
          'ms-word-interface-ribbon-tabs-explained'
        ]);
      }
    } catch (e) {
      console.error(e);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener("nextsem_auth_changed", handleAuthChange);
    };
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      window.dispatchEvent(new Event("nextsem_auth_changed"));
    } catch (err) {
      console.error("Sign-In Error: ", err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("nextsem_user");
      setCurrentUser(null);
      window.dispatchEvent(new Event("nextsem_auth_changed"));
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  const toggleAccordion = (id: string) => {
    setExpandedAccordions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Handle Search Input
  const handleSearchChange = (queryStr: string) => {
    setSearchQuery(queryStr);
    if (!queryStr.trim()) {
      setSearchResults([]);
      return;
    }
    const cleanQuery = queryStr.toLowerCase();
    const matches = (searchIndex as SearchItem[]).filter((item: SearchItem) =>
      item.title.toLowerCase().includes(cleanQuery) ||
      item.content.toLowerCase().includes(cleanQuery)
    ).slice(0, 6);
    setSearchResults(matches);
  };

  const handleLaunchSearchItem = (id: string) => {
    let url = `/book/${id}`;
    if (id.startsWith('cli/')) url = `/${id}`;
    if (id.startsWith('html/')) url = `/${id}`;
    if (id === 'p0-4-git') url = '/git';
    router.push(url);
    setSearchQuery('');
    setSearchResults([]);
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated: string[];
    if (bookmarkedLessons.includes(id)) {
      updated = bookmarkedLessons.filter(b => b !== id);
    } else {
      updated = [...bookmarkedLessons, id];
    }
    setBookmarkedLessons(updated);
    try {
      localStorage.setItem('nextsem_bookmarks', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  // Helper to render Lucide React Icon dynamically
  const renderModuleIcon = (iconName: string, className: string) => {
    const icons: Record<string, React.ReactNode> = {
      Terminal: <Terminal className={className} size={18} />,
      GitBranch: <GitBranch className={className} size={18} />,
      FileText: <FileText className={className} size={18} />,
      Code: <Code className={className} size={18} />,
      Palette: <Palette className={className} size={18} />,
      Cpu: <Cpu className={className} size={18} />,
      Layers: <Layers className={className} size={18} />,
      Cloud: <Cloud className={className} size={18} />,
      GraduationCap: <GraduationCap className={className} size={18} />,
      Briefcase: <Briefcase className={className} size={18} />,
      Server: <Server className={className} size={18} />
    };
    return icons[iconName] || <Code className={className} size={18} />;
  };

  // Helper to get module styles strictly mapped to Light Mode Blue, Black, White
  const getModuleStyles = (_color: string) => {
    return {
      bg: "bg-white hover:bg-blue-50/60",
      border: "border-slate-200 hover:border-blue-300",
      text: "text-blue-700",
      badge: "bg-blue-50 text-blue-700 border border-blue-200 font-bold",
      iconBg: "bg-blue-50 border border-blue-200"
    };
  };

  // Modules List ordered in strict ascending Phase order: Clicking any module navigates directly to the FIRST LESSON
  const modules = [
    {
      title: "MS Word 365 Career Skills",
      summary: "Ribbon tabs, formatting, tables, mail merge, and office productivity.",
      path: "/msword/what-is-ms-word-career-basics",
      iconName: "FileText",
      badge: "🟡 15% Done",
      color: "blue"
    },
    {
      title: "Command Line Interface (CLI)",
      summary: "Master 14+ Windows CMD commands, file management, and system administration.",
      path: "/cli/introduction-to-command-line-interface-cli-basics",
      iconName: "Terminal",
      badge: "🟡 15% Done",
      color: "emerald"
    },
    {
      title: "HTML5 Web Fundamentals",
      summary: "Semantic markup, forms, inputs, SEO tags, and modern web architecture.",
      path: "/html/learn-html-web-free-lessons-what-is-the-internet",
      iconName: "Code",
      badge: "🟢 100% Done",
      color: "orange"
    },
    {
      title: "Git & Version Control",
      summary: "Learn repository setups, branching strategies, and open-source collaboration on GitHub.",
      path: "/git/learn-how-to-join-git-branch-on-github",
      iconName: "GitBranch",
      badge: "🔴 1% Done",
      color: "amber"
    },
    {
      title: "CSS3 Styling & Flexbox",
      summary: "Flexbox, Grid, keyframe animations, dark mode, and glassmorphism.",
      path: "/course",
      iconName: "Palette",
      badge: "Phase 2",
      color: "teal"
    },
    {
      title: "JavaScript ES6+ Logic",
      summary: "Arrays, objects, DOM manipulation, async logic, and event listeners.",
      path: "/course",
      iconName: "Cpu",
      badge: "Phase 3",
      color: "yellow"
    },
    {
      title: "React.js & UI Components",
      summary: "JSX, hooks, reactive state management, context API, and component lifecycles.",
      path: "/course",
      iconName: "Layers",
      badge: "Phase 4",
      color: "cyan"
    },
    {
      title: "Node.js & Backend APIs",
      summary: "Express servers, RESTful API endpoints, MongoDB cloud databases, and deployment.",
      path: "/course",
      iconName: "Server",
      badge: "Phase 5",
      color: "green"
    },
    {
      title: "BCA Semester Study Notes",
      summary: "Syllabus guides, unit notes, exam blueprints, and downloadable PDFs.",
      path: "/bca",
      iconName: "GraduationCap",
      badge: "Academic",
      color: "indigo"
    },
    {
      title: "Tech Jobs & Internships",
      summary: "Off-campus hiring drives, BCA/MCA/B.Tech eligible roles, and career placement.",
      path: "/jobs",
      iconName: "Briefcase",
      badge: "Careers",
      color: "rose"
    }
  ];

  // Recently Viewed Courses
  const recentlyViewed = [
    {
      id: "git-lesson-1",
      title: "How to Join & Checkout Git Branches on GitHub",
      category: "Git & Version Control",
      path: "/git/learn-how-to-join-git-branch-on-github",
      icon: "🌿",
      progress: 100
    },
    {
      id: "cmd-lesson-1",
      title: "Windows Command Prompt Basics & File Systems",
      category: "CLI System Admin",
      path: "/cli/learn-windows-command-prompt-cmd-basics",
      icon: "🪟",
      progress: 75
    },
    {
      id: "html-lesson-1",
      title: "HTML5 Web Architecture & Document Tags",
      category: "Web Fundamentals",
      path: "/html/learn-html-web-free-lessons-what-is-the-internet",
      icon: "📝",
      progress: 50
    },
    {
      id: "msword-lesson-1",
      title: "MS Word 365 Ribbon Interface & Job Skills",
      category: "Career Essentials",
      path: "/msword/ms-word-interface-ribbon-tabs-explained",
      icon: "📄",
      progress: 60
    }
  ];

  // Recently Added Lessons & Modules
  const recentlyAdded = [
    {
      title: "How to Join a Branch on a Project on GitHub",
      summary: "Step-by-step interactive lesson on remote Git checkout and visual branch graphs.",
      path: "/git/learn-how-to-join-git-branch-on-github",
      tag: "NEW GIT MODULE",
      icon: "🌿"
    },
    {
      title: "MS Word 365 Masterclass & Career Essentials",
      summary: "Complete office productivity suite: formatting, mail merge, tables, and shortcut keys.",
      path: "/msword",
      tag: "OFFICE 365",
      icon: "📄"
    },
    {
      title: "BCA Semester 1: Computer Basics & PC Software",
      summary: "Unit 5 My PC, hardware components, and operating system notes.",
      path: "/bca/1/bcs-011",
      tag: "IGNOU BCA",
      icon: "🎓"
    },
    {
      title: "Windows CMD Drive Letters & Directory Trees",
      summary: "Learn how to list drive volumes, change directories, and make nested folders.",
      path: "/cli/windows-drive-letters-and-file-system-structure",
      tag: "CLI COMMANDS",
      icon: "🪟"
    }
  ];

  // Popular Categories / Keywords
  const popularKeywords = [
    "#Git_Branching",
    "#Windows_CMD",
    "#HTML5",
    "#CSS_Flexbox",
    "#JavaScript_DOM",
    "#React_Hooks",
    "#BCA_Notes",
    "#MS_Word_365",
    "#NodeJS_Express",
    "#TailwindCSS",
    "#REST_APIs"
  ];

  // Bookmarked Articles
  const bookmarkedArticles = [
    {
      id: 'learn-how-to-join-git-branch-on-github',
      title: "How to Join a Branch on a GitHub Project",
      category: "Git & Version Control",
      path: "/git/learn-how-to-join-git-branch-on-github",
      icon: "🌿",
      readTime: "5 min read"
    },
    {
      id: 'learn-windows-command-prompt-cmd-basics',
      title: "Windows Command Prompt (CMD) Essentials",
      category: "CLI System Admin",
      path: "/cli/learn-windows-command-prompt-cmd-basics",
      icon: "🪟",
      readTime: "8 min read"
    },
    {
      id: 'learn-html-web-free-lessons-what-is-the-internet',
      title: "How the Internet Works & Client-Server Model",
      category: "Web Fundamentals",
      path: "/html/learn-html-web-free-lessons-what-is-the-internet",
      icon: "🌐",
      readTime: "6 min read"
    },
    {
      id: 'ms-word-interface-ribbon-tabs-explained',
      title: "MS Word 365 Ribbon Tabs & Office Productivity",
      category: "Career Skills",
      path: "/msword/ms-word-interface-ribbon-tabs-explained",
      icon: "📄",
      readTime: "7 min read"
    }
  ];

  if (!mounted) return null;

  return (
    <div className="w-full space-y-6 pb-20 text-slate-800 select-none">
      
      {/* ── 1. TOP MOBILE NAVIGATION BAR (Matching image-34.png: Hamburger Left + Logo, Search & Bell Right) ── */}
      <div className="flex items-center justify-between pt-2 pb-2 px-1 border-b border-slate-200 bg-white">
        
        {/* Top Left: Hamburger Menu Button + Logo */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMenuDrawerOpen(true)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all cursor-pointer active:scale-95 border border-slate-200"
            title="Open Menu"
          >
            <Menu size={20} />
          </button>

          <Link href="/" className="flex items-center gap-2 select-none">
            <img 
              src="/logo.svg" 
              alt="Nextsem Logo" 
              className="w-8 h-8 rounded-xl border border-blue-200 p-0.5 bg-white shadow-sm shrink-0" 
            />
            <span className="font-black text-base tracking-tight text-slate-900 uppercase">
              Nextsem<span className="text-blue-600 lowercase font-bold">.online</span>
            </span>
          </Link>
        </div>

        {/* Top Right: Search Button + Notification Bell */}
        <div className="flex items-center gap-2">
          
          {/* Quick Search Button */}
          <button
            onClick={() => {
              const inputEl = document.getElementById('mobile-search-input');
              if (inputEl) inputEl.focus();
            }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer shadow-sm active:scale-95 border border-slate-200"
            title="Search Tutorials"
          >
            <Search size={18} />
          </button>

          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer relative shadow-sm active:scale-95 border border-slate-200"
              title="Notifications & Recent Updates"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full" />
            </button>

            {/* Notification Dropdown Panel */}
            {notificationsOpen && (
              <div className="absolute right-0 top-11 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-3.5 z-50 animate-in fade-in slide-in-from-top-2 text-left select-none">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2.5">
                  <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                    🔔 Platform Updates &amp; Features
                  </span>
                  <button 
                    onClick={() => setNotificationsOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="space-y-2 text-xs">
                  <Link 
                    href="/git/learn-how-to-join-git-branch-on-github" 
                    onClick={() => setNotificationsOpen(false)} 
                    className="block p-2.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-all"
                  >
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">🌿 New Feature</span>
                    <p className="text-slate-800 font-semibold mt-0.5">Git Branching &amp; GitHub Collaboration lesson is live!</p>
                  </Link>
                  <Link 
                    href="/cmd" 
                    onClick={() => setNotificationsOpen(false)} 
                    className="block p-2.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-all"
                  >
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">🪟 Interactive Simulator</span>
                    <p className="text-slate-800 font-semibold mt-0.5">Windows CMD Simulator with 25+ practice commands.</p>
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ── 2. MOBILE ACCORDION DRAWER MENU (Matching image-35.png Layout & Accordions) ── */}
      {menuDrawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs"
            onClick={() => setMenuDrawerOpen(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 w-[50vw] min-w-[280px] max-w-[80vw] z-50 bg-white flex flex-col p-4 overflow-y-auto animate-in slide-in-from-left duration-200 text-slate-900 font-sans shadow-2xl border-r border-slate-200">
          
          {/* Drawer Top Header: Close Button ✕ + Logo */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <button
              onClick={() => setMenuDrawerOpen(false)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all cursor-pointer border border-slate-200"
            >
              <X size={22} />
            </button>

            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="Nextsem" className="w-8 h-8 rounded-xl border border-blue-200" />
              <span className="font-black text-base tracking-tight text-slate-900 uppercase">
                Nextsem<span className="text-blue-600 lowercase font-bold">.online</span>
              </span>
            </div>
          </div>

          {/* Full-width Sign In / User Profile Button (Matching image-35.png Sign In layout) */}
          <div className="mt-5 mb-4">
            {currentUser ? (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {currentUser.photo ? (
                    <img src={currentUser.photo} alt="" className="w-9 h-9 rounded-full object-cover border border-blue-300" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="text-left">
                    <div className="text-xs font-black text-slate-900">{currentUser.name}</div>
                    <div className="text-[10px] text-slate-500 truncate max-w-[140px]">{currentUser.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                className="w-full bg-[#1e293b] hover:bg-slate-900 text-white font-extrabold text-sm py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn size={18} />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Vertical Accordion Menu List (Matching image-35.png) */}
          <div className="divide-y divide-slate-100 flex-1 text-left">
            {[
              {
                id: "basics",
                title: "Basics",
                items: [
                  { label: "📄 MS Word 365 (Career Skills)", path: "/msword/what-is-ms-word-career-basics" },
                  { label: "🪟 Windows Commands (CLI)", path: "/cli/introduction-to-command-line-interface-cli-basics" },
                  { label: "🖥️ Win 11 Simulator", path: "/simulator" },
                  { label: "⚙️ Software Setup Guide", path: "/p0-setup" },
                ]
              },
              {
                id: "html",
                title: "Arrays & Strings (HTML5)",
                items: [
                  { label: "📝 HTML5 Web Architecture", path: "/html/learn-html-web-free-lessons-what-is-the-internet" },
                  { label: "🏷️ Headings & Text Formatting", path: "/html/html-headings-paragraphs-and-text-formatting" },
                  { label: "🔗 Navigation & Links", path: "/html/html-links-and-navigation-anchors" },
                  { label: "📋 Forms & Inputs", path: "/html/html-forms-and-input-types" },
                ]
              },
              {
                id: "css",
                title: "Pointers and Structures (CSS3)",
                items: [
                  { label: "🎨 CSS Selectors & Colors", path: "/book/p2-1-selectors" },
                  { label: "📐 Flexbox Layouts", path: "/book/p2-2-flexbox" },
                  { label: "📱 Responsive Grids", path: "/book/p2-3-responsive" },
                ]
              },
              {
                id: "js",
                title: "Memory Management (JS Logic)",
                items: [
                  { label: "⚡ JavaScript ES6+ Basics", path: "/book/p3-1-basics" },
                  { label: "📦 Arrays & Objects", path: "/book/p3-2-arrays" },
                  { label: "🖱️ DOM Event Handlers", path: "/book/p3-3-dom" },
                ]
              },
              {
                id: "react",
                title: "File & Error Handling (React UI)",
                items: [
                  { label: "⚛️ React JSX Components", path: "/book/p4-1-jsx" },
                  { label: "🔄 Hooks & State", path: "/book/p4-2-hooks" },
                  { label: "🏬 Context Provider", path: "/book/p4-3-context" },
                ]
              },
              {
                id: "backend",
                title: "Advanced Concepts (Node & APIs)",
                items: [
                  { label: "🔌 Node.js & Express REST APIs", path: "/book/p5-1-node" },
                  { label: "🍃 MongoDB Databases", path: "/book/p5-2-mongodb" },
                  { label: "🔒 JWT Authentication", path: "/book/p5-3-apis" },
                ]
              },
              {
                id: "courses",
                title: "Courses & Simulators",
                badge: "Tools",
                items: [
                  { label: "🪟 Windows CMD Simulator", path: "/cmd" },
                  { label: "🌿 Git Version Control", path: "/git" },
                  { label: "💻 Code Sandbox Playground", path: "/playground" },
                  { label: "🎓 BCA Semester Hub", path: "/bca" },
                ]
              },
              {
                id: "dsa",
                title: "DSA to System Design",
                badge: "Course",
                items: [
                  { label: "🏅 Claim Verified Certificate", path: "/#certificate-section" },
                  { label: "💼 Student Developer Portfolio", path: "/jobs" },
                ]
              }
            ].map(cat => {
              const isExpanded = !!expandedAccordions[cat.id];
              return (
                <div key={cat.id} className="py-3">
                  <button
                    onClick={() => toggleAccordion(cat.id)}
                    className="w-full flex items-center justify-between py-1 px-1 text-slate-900 hover:text-blue-600 font-bold text-sm transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span>{cat.title}</span>
                      {cat.badge && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                          {cat.badge}
                        </span>
                      )}
                    </div>
                    {isExpanded ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-2 pl-3 space-y-1.5 border-l-2 border-blue-200">
                      {cat.items.map((sub, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => {
                            setMenuDrawerOpen(false);
                            if (sub.path.startsWith('/#')) {
                              const el = document.getElementById(sub.path.replace('/#', ''));
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            } else {
                              router.push(sub.path);
                            }
                          }}
                          className="w-full text-left py-1.5 px-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          <span>{sub.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Theme Toggle Button (Matching image-36.png) */}
          <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-center">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white flex items-center gap-2.5 text-xs font-extrabold shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer select-none active:scale-95"
              title="Toggle Light / Dark Theme"
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={18} className="text-amber-400" />
                  <span>Switch to Light Mode</span>
                </>
              ) : (
                <>
                  <Moon size={18} className="text-blue-600" />
                  <span>Switch to Dark Mode</span>
                </>
              )}
            </button>
          </div>

        </div>
      </>
    )}

      {/* Search Bar removed as per image-38 */}

      {/* ── 4. ALL MODULES CARDS WITH VIBRANT COLORS ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Layers size={14} className="text-[#04AA6D]" />
            <span>All Learning Modules</span>
          </h2>
          <Link href="/course" className="text-[11px] font-bold text-[#04AA6D] flex items-center hover:underline">
            <span>Explore All</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {modules.map((mod, idx) => {
            const styles = getModuleStyles(mod.color);
            return (
              <Link
                key={idx}
                href={mod.path}
                className={`p-4 rounded-2xl ${styles.bg} border ${styles.border} shadow-sm transition-all active:scale-[0.98] group flex flex-col justify-between relative overflow-hidden`}
              >
                <div className="space-y-2 text-left">
                  <div className="flex items-center justify-between">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${styles.iconBg} ${styles.text}`}>
                      {renderModuleIcon(mod.iconName, styles.text)}
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${styles.badge}`}>
                      {mod.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors block mt-1">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1">
                    {mod.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-3 text-[11px] font-bold">
                  <span className="text-slate-600 group-hover:text-blue-700 transition-colors">Start Learning</span>
                  <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <ChevronRight size={16} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── 5. RECENTLY VIEWED COURSES (CAROUSEL) ── */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
            <Clock size={14} className="text-blue-600" />
            <span>Recently Viewed Courses</span>
          </h2>
          <Link href="/course" className="text-[11px] font-bold text-blue-600 flex items-center hover:underline">
            <span>View History</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        {/* Horizontal Swipeable Carousel */}
        <div className="flex gap-3 overflow-x-auto snap-x scrollbar-none pb-2 pt-1 px-1">
          {recentlyViewed.map((course) => (
            <Link
              key={course.id}
              href={course.path}
              className="min-w-[240px] max-w-[240px] snap-start p-3.5 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between space-y-3 shadow-xs hover:border-blue-300 transition-all text-left"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span>{course.icon}</span>
                  <span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider px-2 py-0.5 bg-slate-100 border border-slate-200 rounded-full">
                    {course.category}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-2 mt-1">
                  {course.title}
                </h4>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[10px] font-bold text-slate-600">
                  <span>Progress</span>
                  <span className="text-blue-700">{course.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] font-bold text-blue-700">
                <span>Continue</span>
                <ChevronRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── 6. RECENTLY ADDED LESSONS & MODULES ── */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
            <Sparkles size={14} className="text-blue-600" />
            <span>Recently Added Lessons</span>
          </h2>
          <Link href="/course" className="text-[11px] font-bold text-blue-600 flex items-center hover:underline">
            <span>See New</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="space-y-2">
          {recentlyAdded.map((item, idx) => (
            <Link
              key={idx}
              href={item.path}
              className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center justify-between gap-3 shadow-xs hover:border-blue-300 transition-all text-left group"
            >
              <div className="flex items-start gap-3 min-w-0">
                <span className="text-lg shrink-0 mt-0.5">{item.icon}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-extrabold text-blue-700 uppercase tracking-wider px-1.5 py-0.5 bg-blue-50 border border-blue-200 rounded-md shrink-0">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors mt-1 truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 truncate mt-0.5">
                    {item.summary}
                  </p>
                </div>
              </div>
              <div className="w-7 h-7 rounded-xl bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-600 flex items-center justify-center shrink-0 transition-all">
                <ChevronRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── 7. POPULAR CATEGORIES & KEYWORDS LIST ── */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
            <TrendingUp size={14} className="text-blue-600" />
            <span>Popular Categories & Keywords</span>
          </h2>
          <ChevronRight size={14} className="text-slate-400" />
        </div>

        <div className="flex flex-wrap gap-2 pt-1 px-0.5">
          {popularKeywords.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => handleSearchChange(tag.replace('#', ''))}
              className="flex items-center gap-1 px-3 py-1.5 bg-white text-slate-800 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 hover:border-blue-300 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              <span>{tag}</span>
              <ChevronRight size={12} className="text-slate-400 group-hover:text-blue-700" />
            </button>
          ))}
        </div>
      </div>

      {/* ── 8. BOOKMARKED ARTICLES & SAVED LESSONS ── */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
            <Bookmark size={14} className="text-blue-600" />
            <span>Bookmarked Articles</span>
          </h2>
          <Link href="/course" className="text-[11px] font-bold text-blue-600 flex items-center hover:underline">
            <span>View All</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="space-y-2">
          {bookmarkedArticles.map((article) => {
            const isSaved = bookmarkedLessons.includes(article.id);
            return (
              <div
                key={article.id}
                onClick={() => router.push(article.path)}
                className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center justify-between gap-3 shadow-xs hover:border-blue-300 transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-lg shrink-0">{article.icon}</span>
                  <div className="min-w-0">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
                      {article.category} • {article.readTime}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors mt-0.5 truncate">
                      {article.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => toggleBookmark(article.id, e)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    <Bookmark size={16} className={isSaved ? "text-blue-600 fill-blue-600" : ""} />
                  </button>
                  <div className="w-7 h-7 rounded-xl bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-600 flex items-center justify-center transition-all">
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
