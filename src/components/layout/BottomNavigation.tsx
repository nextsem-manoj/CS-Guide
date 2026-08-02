"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from "next-themes";
import { 
  Home, 
  BookOpen, 
  Terminal, 
  Menu, 
  X, 
  User, 
  Languages, 
  LogOut, 
  LogIn, 
  Sun, 
  Moon, 
  Sparkles,
  ChevronRight,
  Code,
  GraduationCap
} from "lucide-react";
import { usePWA } from '@/hooks/usePWA';
import { LANGUAGES, changeLanguage } from '@/components/TranslateWidget';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { Capacitor } from '@capacitor/core';

import LessonBottomNavigation from '@/components/layout/LessonBottomNavigation';

const BottomNavigation = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { isInstallable, installApp } = usePWA();
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; avatar: string; photo?: string } | null>(null);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNative, setIsNative] = useState(false);

  const [navVisible] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleFs = () => setIsFullscreen(!!document.fullscreenElement);
      document.addEventListener("fullscreenchange", handleFs);
      return () => document.removeEventListener("fullscreenchange", handleFs);
    }
  }, []);

  if (isFullscreen) return null;

  useEffect(() => {
    const native = Capacitor.isNativePlatform();
    setMounted(true);
    setIsNative(native);

    const checkAuth = () => {
      const saved = localStorage.getItem('nextsem_user');
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

  // Close menu drawer on route navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  if (!mounted) return null;
  if (pathname === '/simulator') return null;

  const isLessonRoute = Boolean(
    pathname && (
      pathname.startsWith('/html') ||
      pathname.startsWith('/msword') ||
      pathname.startsWith('/cli') ||
      pathname.startsWith('/git') ||
      pathname.includes('/book/') ||
      pathname.startsWith('/bca/notes/') ||
      (pathname.startsWith('/bca/semester-') && (pathname.includes('/unit-') || pathname.includes('/lessons/')))
    )
  );

  if (isLessonRoute) {
    return <LessonBottomNavigation pathname={pathname} />;
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setMenuOpen(false);
    } catch (err) {
      console.error("Sign Out Error:", err);
    }
  };

  const handleSignIn = () => {
    setMenuOpen(false);
    window.dispatchEvent(new Event("open_google_auth"));
  };

  const isBcaSubdomain = pathname?.startsWith('/bca');

  // Dynamic BCA Semester Detection (Sem 1, Sem 2, Sem 3, etc.)
  const semMatch = pathname?.match(/\/bca\/(?:semester-)?(\d+)/i);
  const activeSemNum = semMatch ? semMatch[1] : "1";

  const navTabs = isBcaSubdomain ? [
    {
      id: 'home',
      label: 'Home',
      path: '/',
      icon: Home,
      isActive: pathname === '/' && !menuOpen
    },
    {
      id: 'activeSem',
      label: `Sem ${activeSemNum}`,
      path: `/bca/semester-${activeSemNum}`,
      icon: BookOpen,
      isActive: (pathname === `/bca/semester-${activeSemNum}` || pathname === `/bca/${activeSemNum}` || (activeSemNum === "1" && (pathname?.includes('/bcs-011') || pathname?.includes('/BCS-111')))) && !menuOpen
    },
    {
      id: 'bcahub',
      label: 'BCA Hub',
      path: '/bca',
      icon: GraduationCap,
      isActive: pathname === '/bca' && !menuOpen
    },
    {
      id: 'profile',
      label: currentUser ? (currentUser.name?.split(' ')[0] || 'Profile') : 'Sign In',
      path: currentUser ? '/profile' : '#',
      isButton: !currentUser,
      onClick: !currentUser ? handleSignIn : undefined,
      icon: User,
      photoUrl: currentUser?.photo || null,
      isActive: pathname === '/profile' && !menuOpen
    },
    {
      id: 'menu',
      label: 'Menu',
      path: '#',
      icon: Menu,
      isButton: true,
      onClick: () => setMenuOpen(!menuOpen),
      isActive: menuOpen
    }
  ] : [
    {
      id: 'home',
      label: 'Home',
      path: '/',
      icon: Home,
      isActive: pathname === '/' && !menuOpen
    },
    {
      id: 'courses',
      label: pathname?.startsWith('/html') ? 'HTML' :
             pathname?.startsWith('/cli') ? 'CLI' :
             pathname?.startsWith('/git') ? 'Git' :
             pathname?.startsWith('/msword') ? 'MS Word' :
             pathname?.startsWith('/bca') ? 'BCA' :
             pathname?.startsWith('/book/p1-') ? 'HTML' :
             pathname?.startsWith('/book/p2-') ? 'CSS' :
             pathname?.startsWith('/book/p3-') ? 'JS' :
             pathname?.startsWith('/book/p4-') ? 'React' :
             pathname?.startsWith('/book/p5-') ? 'Node' : 'Courses',
      path: '/course',
      icon: BookOpen,
      isActive: (pathname === '/course' || pathname?.startsWith('/html') || pathname?.startsWith('/cli') || pathname?.startsWith('/git') || pathname?.startsWith('/book')) && !menuOpen
    },
    {
      id: 'profile',
      label: currentUser ? (currentUser.name?.split(' ')[0] || 'Profile') : 'Sign In',
      path: currentUser ? '/profile' : '#',
      isButton: !currentUser,
      onClick: !currentUser ? handleSignIn : undefined,
      icon: User,
      photoUrl: currentUser?.photo || null,
      isActive: pathname === '/profile' && !menuOpen
    },
    {
      id: 'menu',
      label: 'Menu',
      path: '#',
      icon: Menu,
      isButton: true,
      onClick: () => setMenuOpen(!menuOpen),
      isActive: menuOpen
    }
  ];

  return (
    <>
      {/* Slide-Up Professional Menu Drawer */}
      {menuOpen && (
        <>
          {/* Glassmorphic Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-40 transition-opacity animate-in fade-in duration-200"
            onClick={() => setMenuOpen(false)}
          />
          
          <div 
            className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-2xl border-t border-x border-slate-800/80 rounded-t-[32px] p-5 pb-24 z-50 animate-in slide-in-from-bottom duration-300 select-none shadow-[0_-12px_40px_rgba(0,0,0,0.5)] text-slate-100"
            style={{ paddingBottom: 'calc(5.5rem + env(safe-area-inset-bottom))' }}
          >
            {/* Handle Indicator Bar */}
            <div className="w-12 h-1 bg-slate-700/60 rounded-full mx-auto mb-4" />

            {/* Header */}
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-800/60">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs shadow-inner">
                  NS
                </div>
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-white flex items-center gap-2">
                  NextSem Academy
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full">
                    Menu
                  </span>
                </h3>
              </div>
              <button 
                onClick={() => setMenuOpen(false)}
                className="p-1.5 rounded-full bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
              
              {/* User Auth Banner */}
              <div className="p-3.5 bg-slate-800/40 border border-slate-700/50 rounded-2xl">
                {currentUser ? (
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {currentUser.photo ? (
                        <img 
                          src={currentUser.photo} 
                          alt={currentUser.name} 
                          className="w-10 h-10 rounded-full object-cover border-2 border-amber-500/30 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center font-black text-sm shrink-0 shadow-md">
                          {currentUser.avatar}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">
                          {currentUser.name}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate mt-0.5">
                          {currentUser.email}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl transition-all cursor-pointer"
                      title="Sign Out"
                    >
                      <LogOut size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-white">
                        Guest Student
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Sign in to sync course certification & stats
                      </div>
                    </div>
                    <button
                      onClick={handleSignIn}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-extrabold text-[11px] transition-all active:scale-95 cursor-pointer shadow-md shadow-amber-500/20"
                    >
                      <LogIn size={12} className="stroke-[2.5]" />
                      <span>Sign In</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Navigation Links — Location Context Aware */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {isBcaSubdomain ? (
                  <>
                    <div className="sm:col-span-2 text-[10px] font-black uppercase text-cyan-400 tracking-wider px-1">
                      BCA Semester {activeSemNum} Subjects & Modules
                    </div>
                    <Link
                      href="/bca/semester-1/bcs-011-computer-basics"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between p-3 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <BookOpen size={16} className="text-cyan-400 shrink-0" />
                        <span className="text-xs font-bold text-slate-200 truncate">BCS-111 Computer Basics</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-500 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </Link>

                    <Link
                      href="/bca/semester-1/bcs-011-computer-basics/unit-1/lessons"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-950/60 to-cyan-950/60 hover:from-emerald-900/60 hover:to-cyan-900/60 border border-cyan-500/30 rounded-xl transition-all group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Sparkles size={16} className="text-amber-400 shrink-0" />
                        <span className="text-xs font-black text-amber-300 truncate">50 Micro-Lessons Hub</span>
                      </div>
                      <ChevronRight size={14} className="text-amber-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </Link>

                    <Link
                      href="/bca/semester-1/bcsl-013-software-lab"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between p-3 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Code size={16} className="text-emerald-400 shrink-0" />
                        <span className="text-xs font-bold text-slate-200 truncate">BCSL-013 Software Lab</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-500 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </Link>

                    <Link
                      href="/bca/semester-1/bcs-012-basic-mathematics"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between p-3 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <BookOpen size={16} className="text-blue-400 shrink-0" />
                        <span className="text-xs font-bold text-slate-200 truncate">BCS-012 Basic Mathematics</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-500 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </Link>

                    <Link
                      href="/bca/semester-1/begla-136-english"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between p-3 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <BookOpen size={16} className="text-purple-400 shrink-0" />
                        <span className="text-xs font-bold text-slate-200 truncate">BEGLA-136 Communication</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-500 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </Link>

                    <Link
                      href="/bca/semester-1/bevae-181-environmental-studies"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between p-3 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <BookOpen size={16} className="text-emerald-400 shrink-0" />
                        <span className="text-xs font-bold text-slate-200 truncate">BEVAE-181 Environment</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-500 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between p-3 bg-slate-800/30 hover:bg-slate-800/60 border border-slate-700/40 rounded-xl transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <User size={16} className="text-amber-400" />
                        <span className="text-xs font-semibold text-slate-200">Profile</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                    </Link>

                    <Link
                      href="/bca"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between p-3 bg-slate-800/30 hover:bg-slate-800/60 border border-slate-700/40 rounded-xl transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <GraduationCap size={16} className="text-blue-400" />
                        <span className="text-xs font-semibold text-slate-200">BCA Notes</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </>
                )}
              </div>

              {/* Language Switcher Section */}
              <div className="p-3 bg-slate-800/30 border border-slate-700/40 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <Languages size={15} className="text-amber-400" />
                  <span>App Language</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setMenuOpen(false);
                      }}
                      className="py-1.5 px-2 bg-slate-800 hover:bg-amber-500/20 hover:text-amber-300 border border-slate-700/60 hover:border-amber-500/40 rounded-lg text-[11px] font-semibold text-slate-300 transition-all text-center cursor-pointer"
                    >
                      {lang.flag} {lang.label}
                    </button>
                  ))}
                </div>
              </div>
              {isInstallable && !isNative && (
                <button
                  onClick={() => {
                    installApp();
                    setMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl font-extrabold text-xs tracking-wide transition-all shadow-md cursor-pointer"
                >
                  📲 Install App to Home Screen
                </button>
              )}
            </div>
          </div>
        </>
      )}



      {/* Full-width Pinned Edge-to-Edge Bottom Navigation Bar (Visible on Mobile) */}
      <nav 
        className={`fixed left-4 right-4 bottom-2 z-[999] md:hidden select-none bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-2xl border-2 border-emerald-500/50 rounded-3xl shadow-[0_8px_30px_rgba(4,170,109,0.3)] transition-transform duration-300 ${
          navVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))', paddingTop: '0.5rem' }}
      >
        <div className="px-3 py-1 flex items-center justify-around w-full max-w-lg mx-auto">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const active = tab.isActive;

            if (tab.isButton) {
              return (
                <button
                  key={tab.id}
                  onClick={tab.onClick}
                  className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 active:scale-90 cursor-pointer ${
                    active 
                      ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {(tab as any).photoUrl ? (
                    <img src={(tab as any).photoUrl} alt="" className={`w-5 h-5 rounded-full object-cover border ${active ? 'border-amber-400' : 'border-slate-600'}`} />
                  ) : (
                    <Icon size={20} className={active ? "stroke-[2.5]" : "stroke-[1.75]"} />
                  )}
                  <span className="text-[10px] font-bold tracking-tight mt-0.5">
                    {tab.label}
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={tab.id}
                href={tab.path}
                className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 active:scale-90 ${
                  active 
                    ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {(tab as any).photoUrl ? (
                  <img src={(tab as any).photoUrl} alt="" className={`w-5 h-5 rounded-full object-cover border ${active ? 'border-amber-400' : 'border-slate-600'}`} />
                ) : (
                  <Icon size={20} className={active ? "stroke-[2.5]" : "stroke-[1.75]"} />
                )}
                <span className="text-[10px] font-bold tracking-tight mt-0.5">
                  {tab.label}
                </span>

                {/* Active Indicator Glow Dot */}
                {active && (
                  <span className="absolute -top-0.5 w-1 h-1 bg-amber-400 rounded-full shadow-[0_0_6px_#f59e0b]" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default BottomNavigation;
