"use client";

import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, LogIn, X, Menu } from "lucide-react";
import BookSidebar from "@/components/BookSidebar";
import BookNavigation from "@/components/BookNavigation";
import BookRightSidebar from "@/components/BookRightSidebar";
import { coursePhases } from "@/data/courseData";
import { signInWithGoogle } from "@/lib/firebase";
import searchIndex from "@/data/searchIndex.json";
import { getChapterIdFromPath } from "@/lib/htmlLessonsHelper";
import NsSubjectNavBar from "@/components/NsSubjectNavBar";

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  photo?: string;
}

function HtmlLayoutContent({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default CLOSED — mobile-first; desktop opens on mount
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lessonContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFsHint, setShowFsHint] = useState(false);

  const pathname = usePathname() || "";
  const currentChapterId = getChapterIdFromPath(pathname);

  useEffect(() => {
    const checkAuth = () => {
      const saved = localStorage.getItem("nextsem_user");
      let userObj = null;
      if (saved) {
        try {
          userObj = JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
      setCurrentUser(userObj);
    };
    checkAuth();
    window.addEventListener("nextsem_auth_changed", checkAuth);
    return () => {
      window.removeEventListener("nextsem_auth_changed", checkAuth);
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

  // Reset scroll container to top on page mount/refresh and pathname changes
  useEffect(() => {
    setScrollPercent(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [pathname]);

  // Track scroll container progress percentage
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      let scrollTop = container.scrollTop;
      let totalHeight = container.scrollHeight - container.clientHeight;

      if (totalHeight <= 0) {
        scrollTop = window.scrollY || document.documentElement.scrollTop;
        totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      }

      if (totalHeight <= 0) {
        setScrollPercent(0);
        return;
      }
      const percent = (scrollTop / totalHeight) * 100;
      setScrollPercent(Math.min(100, Math.max(0, percent)));
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mounted, pathname]);

  useEffect(() => {
    document.body.classList.add("in-book-mode");
    setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => {
      document.body.classList.remove("in-book-mode");
    };
  }, []);

  const currentIndex = searchIndex.findIndex((item) => item.id === currentChapterId);
  const currentChapter = currentIndex >= 0 ? searchIndex[currentIndex] : null;

  const currentPhase = coursePhases.find(
    (phase) =>
      phase.path === currentChapterId ||
      phase.topics.some((t) => t.path === currentChapterId)
  );

  const prevChapter = currentIndex > 0 ? searchIndex[currentIndex - 1] : null;
  const nextChapter =
    currentIndex >= 0 && currentIndex < searchIndex.length - 1
      ? searchIndex[currentIndex + 1]
      : null;

  const prevHref = prevChapter
    ? prevChapter.id.startsWith("p1-")
      ? "/html"
      : `/book/${prevChapter.id}`
    : null;
  const nextHref = nextChapter
    ? nextChapter.id.startsWith("p1-")
      ? "/html"
      : `/book/${nextChapter.id}`
    : null;

  const themeClass = "bg-background border-slate-850 text-foreground";
  const headerThemeClass = "bg-background border-slate-850 text-foreground";

  const effectiveSidebarWidth = sidebarCollapsed ? 52 : sidebarWidth;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Open sidebar on desktop, always keep it closed on mobile
      setSidebarOpen(!mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div ref={lessonContainerRef} className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white font-sans selection:bg-blue-600/30 transition-colors duration-300">
      <NsSubjectNavBar currentUser={currentUser} onSignIn={handleSignIn} onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
      <div
        className="flex-1 flex flex-col md:flex-row w-full min-w-0 bg-white dark:bg-black"
        style={mounted && !isMobile ? { paddingLeft: `calc(5vw + ${effectiveSidebarWidth}px)`, paddingRight: '5vw' } : undefined}
      >
        <BookSidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          sidebarWidth={sidebarWidth}
          onWidthChange={setSidebarWidth}
          isCollapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
        />

        <main className="flex-1 p-3 md:p-6 w-full flex flex-col relative min-w-0 bg-white dark:bg-black">
          {/* Main Reading Container */}
          <div
            ref={scrollContainerRef}
            className="flex-1 px-2 py-3 md:px-6 md:py-6 relative z-10 transition-all duration-300"
          >
            <div className="max-w-5xl mx-auto w-full">
              {children}
            </div>
          </div>
        </main>

        <BookRightSidebar
          currentChapterId={currentChapterId}
          currentChapterTitle={currentChapter?.title || "Reading Lesson"}
        />
      </div>
    </div>
  );
}

export default function HtmlLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background">
          <div className="text-sm font-bold text-slate-500 animate-pulse">
            Loading course layout...
          </div>
        </div>
      }
    >
      <HtmlLayoutContent>{children}</HtmlLayoutContent>
    </Suspense>
  );
}
