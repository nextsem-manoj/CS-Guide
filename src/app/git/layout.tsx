"use client";

import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useTheme } from "next-themes";
import { signInWithGoogle } from "@/lib/firebase";
import NsSubjectNavBar from "@/components/NsSubjectNavBar";
import BookSidebar from "@/components/BookSidebar";

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  photo?: string;
}

function GitLayoutContent({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default CLOSED — mobile-first; desktop opens on mount
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const lessonContainerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFsHint, setShowFsHint] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const saved = localStorage.getItem("nextsem_user");
      let userObj = null;
      if (saved) {
        try { userObj = JSON.parse(saved); } catch (e) { console.error(e); }
      }
      setCurrentUser(userObj);
    };
    checkAuth();
    window.addEventListener("nextsem_auth_changed", checkAuth);
    return () => window.removeEventListener("nextsem_auth_changed", checkAuth);
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      window.dispatchEvent(new Event("nextsem_auth_changed"));
    } catch (err) {
      console.error("Sign-In Error: ", err);
    }
  };

  const effectiveSidebarWidth = sidebarCollapsed ? 52 : sidebarWidth;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const enterFullscreen = useCallback(async () => {
    const el = lessonContainerRef.current || document.documentElement;
    try {
      if (el.requestFullscreen) await el.requestFullscreen();
      else if ((el as any).webkitRequestFullscreen) await (el as any).webkitRequestFullscreen();
      setIsFullscreen(true);
      setShowFsHint(true);
      setTimeout(() => setShowFsHint(false), 2500);
    } catch (_) {}
  }, []);

  const exitFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
    } catch (_) {}
    setIsFullscreen(false);
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  useEffect(() => {
    const isLesson = pathname?.includes('/git/');
    if (isLesson && mounted) {
      const t = setTimeout(() => enterFullscreen(), 600);
      return () => clearTimeout(t);
    }
  }, [pathname, mounted, enterFullscreen]);

  return (
    <div ref={lessonContainerRef} className="min-h-screen flex flex-col bg-[#060813] text-slate-100 font-sans selection:bg-[#c1a648]/30 transition-colors duration-300">
      {isFullscreen && showFsHint && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] bg-black/80 text-white text-xs px-4 py-2 rounded-full backdrop-blur-md pointer-events-none shadow-lg">
          📖 Tap anywhere to exit fullscreen
        </div>
      )}
      {!isFullscreen && (
        <NsSubjectNavBar currentUser={currentUser} onSignIn={handleSignIn} onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
      )}
      <div
        className="flex-1 flex flex-col md:flex-row w-full min-w-0 bg-[#060813]"
        style={mounted && !isMobile ? { paddingLeft: `calc(5vw + ${effectiveSidebarWidth}px)`, paddingRight: '5vw' } : undefined}
        onClick={isFullscreen ? exitFullscreen : undefined}
      >
        <BookSidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          sidebarWidth={sidebarWidth}
          onWidthChange={setSidebarWidth}
          isCollapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
        />

        <main className="flex-1 min-w-0 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function GitLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#060813]">
          <div className="text-sm font-bold text-slate-500 animate-pulse">Loading Git...</div>
        </div>
      }
    >
      <GitLayoutContent>{children}</GitLayoutContent>
    </Suspense>
  );
}
