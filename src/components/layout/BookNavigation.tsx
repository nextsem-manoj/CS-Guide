"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, Home, Menu, LogIn, Sun, Moon, Coffee } from "lucide-react";
import { useTheme } from "next-themes";
import searchIndex from '@/data/searchIndex.json';
import { auth, signInWithGoogle } from '@/lib/firebase';
import { getChapterIdFromPath, getChapterUrl } from '@/lib/htmlLessonsHelper';

interface BookNavigationProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  photo?: string;
}

function NavigationContent({
  sidebarOpen,
  setSidebarOpen,
}: BookNavigationProps) {
  const pathname = usePathname();
  const currentChapterId = getChapterIdFromPath(pathname);
  const [currentUser, setCurrentUser] = React.useState<UserProfile | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  React.useEffect(() => {
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

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      window.dispatchEvent(new Event("nextsem_auth_changed"));
    } catch (err) {
      console.error("Sign-In Error: ", err);
    }
  };

  // Find current, previous, and next chapters from searchIndex
  const currentIndex = searchIndex.findIndex((item) => item.id === currentChapterId);
  const prevChapter = currentIndex > 0 ? searchIndex[currentIndex - 1] : null;
  const nextChapter = currentIndex >= 0 && currentIndex < searchIndex.length - 1 ? searchIndex[currentIndex + 1] : null;

  // Calculate Prev / Next Href pointing directly to adjacent chapters
  const prevHref = prevChapter ? getChapterUrl(prevChapter.id) : null;
  const nextHref = nextChapter ? getChapterUrl(nextChapter.id) : null;

  const containerThemeClass = "w-full max-w-lg mx-auto my-4 px-2 py-2 border-t border-slate-800/40 text-slate-100 select-none bg-transparent";
  const buttonHoverClass = "hover:bg-slate-900/50 text-slate-400 hover:text-white";

  return (
    <div className={`w-full transition-all duration-300 md:hidden ${containerThemeClass}`}>
      <div className="flex justify-around items-center h-12 w-full px-2">
        {/* Home Button */}
        <Link
          href="/"
          aria-label="Return to Main Landing Page"
          title="Home"
          className={`flex flex-col items-center justify-center flex-1 py-1.5 rounded-xl transition-all ${buttonHoverClass}`}
        >
          <Home size={18} className="mb-0.5" />
          <span className="text-[9px] font-black uppercase tracking-wider">Home</span>
        </Link>
        
        {/* Menu Button (Toggles Sidebar) */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`flex flex-col items-center justify-center flex-1 py-1.5 rounded-xl transition-all ${
            sidebarOpen 
              ? "text-amber-500 dark:text-amber-450 font-bold bg-slate-100 dark:bg-slate-900/50" 
              : buttonHoverClass
          }`}
          aria-label="Toggle Sidebar Menu"
        >
          <Menu size={18} className="mb-0.5" />
          <span className="text-[9px] font-black uppercase tracking-wider">Menu</span>
        </button>

        {/* Theme Switch Button removed */}

        {/* Profile / Sign In Button beside Menu */}
        {currentUser ? (
          <Link
            href="/profile"
            className={`flex flex-col items-center justify-center flex-1 py-1.5 rounded-xl transition-all ${buttonHoverClass}`}
            title="Profile Dashboard"
          >
            {currentUser.photo ? (
              <img src={currentUser.photo} alt="" className="w-5 h-5 rounded-full object-cover border border-[#c1a648]/20 mb-0.5 shrink-0" />
            ) : (
              <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-[9px] mb-0.5 shrink-0">
                {currentUser.avatar}
              </div>
            )}
            <span className="text-[9px] font-black uppercase tracking-wider truncate max-w-[40px]">{currentUser.name.split(" ")[0]}</span>
          </Link>
        ) : (
          <button
            onClick={handleSignIn}
            className={`flex flex-col items-center justify-center flex-1 py-1.5 rounded-xl transition-all ${buttonHoverClass}`}
            title="Sign In"
          >
            <LogIn size={18} className="mb-0.5 text-[#c1a648]" />
            <span className="text-[9px] font-black uppercase tracking-wider text-[#c1a648]">Sign In</span>
          </button>
        )}

        {/* Prev Button */}
        {prevHref ? (
          <Link
            href={prevHref}
            className={`flex flex-col items-center justify-center flex-1 py-1.5 rounded-xl transition-all ${buttonHoverClass}`}
          >
            <ChevronLeft size={20} className="mb-0.5" />
            <span className="text-[9px] font-black uppercase tracking-wider">Prev</span>
          </Link>
        ) : (
          <div className="flex-1 opacity-20 cursor-not-allowed flex flex-col items-center justify-center py-1.5">
            <ChevronLeft size={20} className="mb-0.5" />
            <span className="text-[9px] font-black uppercase tracking-wider">Prev</span>
          </div>
        )}

        {/* Next Button */}
        {nextHref ? (
          <Link
            href={nextHref}
            className={`flex flex-col items-center justify-center flex-1 py-1.5 rounded-xl transition-all ${buttonHoverClass}`}
          >
            <ChevronRight size={20} className="mb-0.5" />
            <span className="text-[9px] font-black uppercase tracking-wider">Next</span>
          </Link>
        ) : (
          <div className="flex-1 opacity-20 cursor-not-allowed flex flex-col items-center justify-center py-1.5">
            <ChevronRight size={20} className="mb-0.5" />
            <span className="text-[9px] font-black uppercase tracking-wider">Next</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookNavigation(props: BookNavigationProps) {
  return (
    <Suspense fallback={
      <div className="fixed bottom-0 left-0 right-0 z-[1000] bg-slate-950 text-slate-100 py-3 text-center text-xs font-bold border-t border-slate-900">
        Loading Navigation...
      </div>
    }>
      <NavigationContent {...props} />
    </Suspense>
  );
}
