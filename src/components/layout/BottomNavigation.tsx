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
  GraduationCap,
  Search
} from "lucide-react";
import { usePWA } from '@/hooks/usePWA';
import { LANGUAGES, changeLanguage } from '@/components/TranslateWidget';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { Capacitor } from '@capacitor/core';

import LessonBottomNavigation from '@/components/layout/LessonBottomNavigation';

const BottomNavigation = () => {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;
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

  if (isFullscreen) return null;
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

  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  const activeSemNum = pathname?.match(/semester-(\d+)/)?.[1] || (pathname?.match(/\/bca\/(\d+)/)?.[1] ?? null);

  const getSecondTab = () => {
    if (activeSemNum) {
      return {
        id: 'semester',
        label: `Sem ${activeSemNum}`,
        path: `/bca/semester-${activeSemNum}`,
        icon: BookOpen,
        isActive: (pathname === `/bca/semester-${activeSemNum}` || pathname === `/bca/${activeSemNum}`) && !menuOpen
      };
    }
    if (pathname === '/bca') {
      return {
        id: 'bca',
        label: 'BCA Hub',
        path: '/bca',
        icon: GraduationCap,
        isActive: pathname === '/bca' && !menuOpen
      };
    }
    return {
      id: 'practical',
      label: 'Practical',
      path: '/bca/practical',
      icon: Sparkles,
      isActive: (pathname === '/bca/practical' || pathname?.startsWith('/bca/practical/')) && !menuOpen
    };
  };

  const navTabs = [
    {
      id: 'home',
      label: 'Home',
      path: '/',
      icon: Home,
      isActive: pathname === '/' && !menuOpen
    },
    {
      id: 'bca',
      label: activeSemNum ? `Sem ${activeSemNum}` : 'BCA Hub',
      path: activeSemNum ? `/bca/semester-${activeSemNum}` : '/bca',
      icon: GraduationCap,
      isActive: (pathname === '/bca' || pathname?.startsWith('/bca/semester-') || pathname?.startsWith('/bca/notes/')) && !pathname.includes('/practical') && !menuOpen
    },
    {
      id: 'practical',
      label: 'Stories & Lab',
      path: '/bca/practical',
      icon: Sparkles,
      isActive: (pathname === '/bca/practical' || pathname?.startsWith('/bca/practical/')) && !menuOpen
    },
    {
      id: 'theme',
      label: currentTheme === 'dark' ? 'Light' : 'Dark',
      path: '#',
      icon: currentTheme === 'dark' ? Sun : Moon,
      isButton: true,
      onClick: toggleTheme,
      isActive: false
    },
    {
      id: 'profile',
      label: currentUser ? (currentUser.name?.split(' ')[0] || 'Profile') : 'Profile',
      path: currentUser ? '/profile' : '#',
      isButton: !currentUser,
      onClick: !currentUser ? handleSignIn : undefined,
      icon: User,
      photoUrl: currentUser?.photo || null,
      isActive: pathname === '/profile' && !menuOpen
    }
  ];

  return (
    <>
      {/* Slide-Up Professional Menu Drawer */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md z-40 transition-opacity animate-in fade-in duration-200"
            onClick={() => setMenuOpen(false)}
          />
          
          <div 
            className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white/95 dark:bg-neutral-950/95 backdrop-blur-2xl border-t border-x border-slate-200 dark:border-neutral-800 rounded-t-[32px] p-5 pb-24 z-50 animate-in slide-in-from-bottom duration-300 select-none shadow-2xl text-black dark:text-white"
            style={{ paddingBottom: 'calc(5.5rem + env(safe-area-inset-bottom))' }}
          >
            {/* Handle Indicator Bar */}
            <div className="w-12 h-1 bg-slate-300 dark:bg-neutral-700 rounded-full mx-auto mb-4" />

            {/* Header */}
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-200 dark:border-neutral-800">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-blue-600 flex items-center justify-center text-white font-mono font-bold text-xs shadow-sm">
                  &lt;/&gt;
                </div>
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-black dark:text-white flex items-center gap-2">
                  NextSem Academy
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 dark:bg-neutral-900 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-800 rounded-full">
                    Menu
                  </span>
                </h3>
              </div>
              <button 
                onClick={() => setMenuOpen(false)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
              
              {/* Universal Search Quick Button */}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  window.dispatchEvent(new CustomEvent("open-global-search"));
                }}
                className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 rounded-2xl text-slate-700 hover:text-black dark:text-slate-300 dark:hover:text-white transition-all cursor-pointer group shadow-sm text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-neutral-800 border border-blue-200 dark:border-neutral-700 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                    <Search size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-black dark:text-white flex items-center gap-1.5">
                      <span>Search All Courses</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.2 bg-blue-50 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-700 rounded-md">500+ Lessons</span>
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">HTML, CLI, BCA Lab, MS Word &amp; C Programming</div>
                  </div>
                </div>
                <kbd className="hidden sm:inline-block text-[10px] font-mono bg-slate-200 dark:bg-neutral-800 px-2 py-1 rounded-lg border border-slate-300 dark:border-neutral-700 text-slate-600 dark:text-slate-400">Ctrl K</kbd>
              </button>

              {/* Theme Toggle Button Row */}
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 rounded-2xl text-black dark:text-white transition-all cursor-pointer group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-neutral-800 border border-blue-200 dark:border-neutral-700 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-black dark:text-white">
                      Toggle Theme ({theme === 'dark' ? 'Dark Mode' : 'Light Mode'})
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      Click to switch to {theme === 'dark' ? 'Light' : 'Dark'} mode
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
                </span>
              </button>

              {/* User Auth Banner */}
              <div className="p-3.5 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl">
                {currentUser ? (
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {currentUser.photo ? (
                        <img 
                          src={currentUser.photo} 
                          alt={currentUser.name} 
                          className="w-10 h-10 rounded-full object-cover border-2 border-blue-600 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
                          {currentUser.name.charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-black dark:text-white truncate">
                          {currentUser.name}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {currentUser.email}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="p-2 bg-slate-200 hover:bg-slate-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-black dark:text-white rounded-xl transition-all cursor-pointer"
                      title="Sign Out"
                    >
                      <LogOut size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-black dark:text-white">
                        Guest Student
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Sign in to sync your practical certifications &amp; GitHub repos
                      </div>
                    </div>
                    <button
                      onClick={handleSignIn}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-extrabold text-[11px] transition-all active:scale-95 cursor-pointer shadow-sm"
                    >
                      <LogIn size={12} className="stroke-[2.5]" />
                      <span>Sign In</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Navigation Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="sm:col-span-2 text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider px-1">
                  BCA Practical &amp; Course Shortcuts
                </div>

                <Link
                  href="/bca/practical"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Sparkles size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
                    <span className="text-xs font-bold text-black dark:text-white truncate">3-Year BCA Practical Lab (360 Days)</span>
                  </div>
                  <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                </Link>

                <Link
                  href="/bca/semester-1"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <BookOpen size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
                    <span className="text-xs font-bold text-black dark:text-white truncate">Semester 1 Theory Hub</span>
                  </div>
                  <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                </Link>

                <Link
                  href="/bca"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <GraduationCap size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
                    <span className="text-xs font-bold text-black dark:text-white truncate">6-Semester Degree Syllabus</span>
                  </div>
                  <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                </Link>

                <Link
                  href="/cmd"
                  target="_blank"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Terminal size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
                    <span className="text-xs font-bold text-black dark:text-white truncate">Windows 11 CMD Simulator</span>
                  </div>
                  <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                </Link>
              </div>

              {/* Language Switcher Section */}
              <div className="p-3 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-black dark:text-white">
                  <Languages size={15} className="text-blue-600 dark:text-blue-400" />
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
                      className="py-1.5 px-2 bg-white hover:bg-slate-100 dark:bg-neutral-950 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 rounded-lg text-[11px] font-semibold text-black dark:text-white transition-all text-center cursor-pointer"
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
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-extrabold text-xs tracking-wide transition-all shadow-sm cursor-pointer"
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
        className={`fixed left-4 right-4 bottom-2 z-[999] md:hidden select-none bg-white/95 dark:bg-[#0c1328]/95 backdrop-blur-2xl border-2 border-emerald-500/50 rounded-3xl shadow-[0_8px_30px_rgba(4,170,109,0.25)] transition-transform duration-300 ${
          navVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ paddingBottom: 'calc(0.6rem + env(safe-area-inset-bottom))', paddingTop: '0.6rem' }}
      >
        <div className="px-3 py-1 flex items-center justify-around w-full max-w-lg mx-auto">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const active = tab.isActive;

            if (tab.id === 'practical') {
              return (
                <Link
                  key={tab.id}
                  href={tab.path}
                  className="relative flex flex-col items-center justify-center -translate-y-2.5 transition-transform duration-200 active:scale-95 group focus:outline-none"
                >
                  <div className="p-[2.5px] rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-emerald-600 shadow-[0_4px_16px_rgba(4,170,109,0.35)]">
                    <div className="w-10 h-10 rounded-[13px] bg-white dark:bg-[#060c18] flex items-center justify-center text-emerald-500 group-hover:scale-105 transition-transform">
                      <Sparkles size={18} className="text-emerald-400 fill-emerald-400" />
                    </div>
                  </div>
                  <span className="text-[10px] font-black tracking-tight mt-0.5 text-black dark:text-white">
                    {tab.label}
                  </span>
                  {active && (
                    <span className="absolute -bottom-1 w-1 h-1 bg-emerald-500 rounded-full shadow-[0_0_6px_#04AA6D]" />
                  )}
                </Link>
              );
            }

            if (tab.isButton) {
              return (
                <button
                  key={tab.id}
                  onClick={tab.onClick}
                  className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 active:scale-90 cursor-pointer focus:outline-none focus-visible:outline-none ${
                    active 
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800' 
                      : 'text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {(tab as any).photoUrl ? (
                    <img src={(tab as any).photoUrl} alt="" loading="eager" decoding="async" className={`w-5 h-5 rounded-full object-cover border ${active ? 'border-emerald-500' : 'border-slate-300 dark:border-neutral-700'}`} />
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
                className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 active:scale-90 focus:outline-none focus-visible:outline-none ${
                  active 
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800' 
                    : 'text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {(tab as any).photoUrl ? (
                  <img src={(tab as any).photoUrl} alt="" loading="eager" decoding="async" className={`w-5 h-5 rounded-full object-cover border ${active ? 'border-emerald-500' : 'border-slate-300 dark:border-neutral-700'}`} />
                ) : (
                  <Icon size={20} className={active ? "stroke-[2.5]" : "stroke-[1.75]"} />
                )}
                <span className="text-[10px] font-bold tracking-tight mt-0.5">
                  {tab.label}
                </span>

                {/* Active Indicator Glow Dot */}
                {active && (
                  <span className="absolute -top-0.5 w-1 h-1 bg-emerald-500 rounded-full shadow-[0_0_6px_#04AA6D]" />
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
