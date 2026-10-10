"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, LogIn, Sparkles, BookOpen, Layers, Terminal, Rocket, ChevronDown, Menu } from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  photo?: string;
}

interface NsSubjectNavBarProps {
  currentUser?: UserProfile | null;
  onSignIn?: () => void;
  onToggleSidebar?: () => void;
  showSubjectBar?: boolean;
}

const SUBJECT_TABS = [
  { id: "html", label: "HTML", href: "/html", match: (p: string) => p === "/html" || (p.startsWith("/html/") && !p.includes("/tags")) },
  { id: "html-tags", label: "HTML TAGS (115+)", href: "/html/tags", match: (p: string) => p.includes("/html/tags") || p.includes("/html-tags") },
  { id: "css", label: "CSS", href: "/book/p2-1-selectors", match: (p: string) => p.includes("p2-") },
  { id: "js", label: "JAVASCRIPT", href: "/book/p3-1-basics", match: (p: string) => p.includes("p3-") },
  { id: "react", label: "REACT", href: "/book/p4-1-jsx", match: (p: string) => p.includes("p4-") },
  { id: "backend", label: "NODE.JS", href: "/book/p5-1-node", match: (p: string) => p.includes("p5-") },
  { id: "cli", label: "WINDOWS CLI", href: "/cli", match: (p: string) => p.startsWith("/cli") },
  { id: "git", label: "GIT", href: "/git", match: (p: string) => p.startsWith("/git") },
  { id: "cmd", label: "CMD SIMULATOR", href: "/cmd", match: (p: string) => p.startsWith("/cmd") },
  { id: "curriculum", label: "CURRICULUM", href: "/curriculum", match: (p: string) => p.startsWith("/curriculum") }
];

export default function NsSubjectNavBar({ currentUser, onSignIn, onToggleSidebar, showSubjectBar }: NsSubjectNavBarProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleFs = () => setIsFullscreen(!!document.fullscreenElement);
      document.addEventListener("fullscreenchange", handleFs);
      return () => document.removeEventListener("fullscreenchange", handleFs);
    }
  }, []);

  const pathname = usePathname() || "";
  const isHomePage = pathname === "/";
  const shouldShowSubjectBar = showSubjectBar ?? isHomePage;
  const [searchQuery, setSearchQuery] = useState("");

  if (isFullscreen) return null;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.dispatchEvent(new CustomEvent("open_search", { 
        detail: { query: searchQuery.trim() } 
      }));
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-slate-200 dark:border-neutral-800 shadow-sm select-none transition-colors">
      {/* ── TOP HEADER BAR ── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-3">
        
        {/* Left Section: Mobile Menu Toggle + Brand Logo */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer md:hidden"
              title="Toggle Menu"
            >
              <Menu size={18} />
            </button>
          )}

          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xs shadow-md transition-transform group-hover:scale-105">
              NS
            </div>
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
              NextSem<span className="text-blue-600 dark:text-blue-400">.online</span>
              <span className="text-[9px] bg-blue-50 dark:bg-neutral-900 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-800 px-1.5 py-0.5 rounded-md font-black">v29</span>
            </span>
          </Link>
        </div>

        {/* Search Input Bar (Desktop) */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-sm mx-4">
          <div className="relative w-full">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tutorials, HTML tags, CLI..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-full text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-all"
            />
          </div>
        </form>

        {/* Right Action: Sign In or User Badge */}
        <div className="flex items-center gap-2">
          {currentUser ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 rounded-full transition-all"
            >
              {currentUser.photo ? (
                <img src={currentUser.photo} alt="" className="w-5 h-5 rounded-full object-cover" />
              ) : (
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-[10px]">
                  {currentUser.avatar || currentUser.name.charAt(0)}
                </div>
              )}
              <span className="text-xs font-bold text-black dark:text-white hidden sm:inline max-w-[100px] truncate">
                {currentUser.name}
              </span>
            </Link>
          ) : (
            <button
              onClick={onSignIn}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-extrabold text-xs transition-all shadow-sm cursor-pointer"
            >
              <LogIn size={13} />
              <span>Sign In</span>
            </button>
          )}
        </div>

      </div>

      {/* ── SUBJECT TABS NAVIGATION BAR (Horizontal Scrollable - ONLY ON FRONT PAGE) ── */}
      {shouldShowSubjectBar && (
        <div className="bg-slate-50 dark:bg-neutral-950 border-t border-slate-200 dark:border-neutral-800 px-2">
          <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto custom-scrollbar py-1 scroll-smooth">
            {SUBJECT_TABS.map((tab) => {
              const isActive = tab.match(pathname);
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider rounded-md whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-neutral-900"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
