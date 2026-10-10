"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { 
  ChevronLeft, ChevronRight, LayoutGrid, BookOpen, 
  User, Menu, X, LogIn, LogOut, Sliders, Type, Languages, Sparkles, Code, GraduationCap, CheckCircle2,
  Sun, Moon
} from "lucide-react";
import { mswordLessons } from "@/data/mswordLessonsData";
import { cliLessons } from "@/data/cliLessonsData";
import { htmlLessons } from "@/data/htmlLessonsData";
import { gitLessons } from "@/data/gitLessonsData";
import { unit1Lessons } from "@/data/unit1LessonsData";
import { bcaLessons } from "@/data/bcaLessonsData";
import { bcaSemesters } from "@/data/bcaCoursesData";
import searchIndex from "@/data/searchIndex.json";
import { getChapterIdFromPath, getChapterUrl } from "@/lib/htmlLessonsHelper";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { Capacitor } from "@capacitor/core";
import { showBannerAd, hideBannerAd } from "@/lib/admobHelper";

interface LessonBottomNavigationProps {
  pathname: string;
}

type Lang = "english" | "hinglish" | "hindi";
type Level = "kid" | "pro";

interface UserObj {
  name: string;
  email: string;
  avatar?: string;
  photo?: string;
}

export default function LessonBottomNavigation({ pathname }: LessonBottomNavigationProps) {
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;
  const [currentUser, setCurrentUser] = useState<UserObj | null>(null);
  const [selectedLang, setSelectedLang] = useState<Lang>("hinglish");
  const [selectedLevel, setSelectedLevel] = useState<Level>("kid");
  const [fontSize, setFontSize] = useState<number>(14);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [toolsOpen, setToolsOpen] = useState<boolean>(false);
  const [subjectDrawerOpen, setSubjectDrawerOpen] = useState<boolean>(false);
  const [completedChapters, setCompletedChapters] = useState<Record<string, boolean>>({});

  // 5-Tab Navigation Bar (Prev/Home/Tools/Menu/Next):
  const [navVisible] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    if (Capacitor.isNativePlatform() && pathname !== "/") {
      showBannerAd();
    } else if (Capacitor.isNativePlatform() && pathname === "/") {
      hideBannerAd();
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = (localStorage.getItem("nextsem_lesson_lang") || localStorage.getItem("nextsem_html_lang")) as Lang | null;
      const savedLevel = (localStorage.getItem("nextsem_lesson_level") || localStorage.getItem("nextsem_html_level")) as Level | null;
      if (savedLang) setSelectedLang(savedLang);
      if (savedLevel) setSelectedLevel(savedLevel);

      try {
        const done = JSON.parse(localStorage.getItem("nextsem_completed_chapters") || "{}");
        setCompletedChapters(done);
      } catch (e) {
        console.error(e);
      }

      const checkAuth = () => {
        const saved = localStorage.getItem("nextsem_user");
        let uObj = null;
        if (saved) {
          try {
            uObj = JSON.parse(saved);
          } catch (e) {
            console.error(e);
          }
        }
        setCurrentUser(uObj);
      };
      checkAuth();
      window.addEventListener("nextsem_auth_changed", checkAuth);

      const handlePrefChange = (e: Event) => {
        const customEvent = e as CustomEvent<{ lang?: Lang; level?: Level; fontSize?: number }>;
        if (customEvent.detail?.lang) setSelectedLang(customEvent.detail.lang);
        if (customEvent.detail?.level) setSelectedLevel(customEvent.detail.level);
        if (customEvent.detail?.fontSize) setFontSize(customEvent.detail.fontSize);
      };

      window.addEventListener("nextsem_lesson_pref_changed", handlePrefChange);
      return () => {
        window.removeEventListener("nextsem_auth_changed", checkAuth);
        window.removeEventListener("nextsem_lesson_pref_changed", handlePrefChange);
      };
    }
  }, []);

  if (isFullscreen) return null;

  const handleLangChange = (lang: Lang) => {
    setSelectedLang(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("nextsem_lesson_lang", lang);
      localStorage.setItem("nextsem_html_lang", lang);
      window.dispatchEvent(new CustomEvent("nextsem_lesson_pref_changed", { detail: { lang } }));
    }
  };

  const handleLevelChange = (level: Level) => {
    setSelectedLevel(level);
    if (typeof window !== "undefined") {
      localStorage.setItem("nextsem_lesson_level", level);
      localStorage.setItem("nextsem_html_level", level);
      window.dispatchEvent(new CustomEvent("nextsem_lesson_pref_changed", { detail: { level } }));
    }
  };

  const handleFontSizeChange = (delta: number) => {
    const nextSize = Math.min(24, Math.max(12, fontSize + delta));
    setFontSize(nextSize);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("nextsem_lesson_pref_changed", { detail: { fontSize: nextSize } }));
    }
  };

  const handleSignIn = () => {
    setMenuOpen(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open_google_auth"));
    }
  };

  const handleSignOut = async () => {
    try {
      if (auth) await signOut(auth);
      localStorage.removeItem("nextsem_user");
      setCurrentUser(null);
      setMenuOpen(false);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("nextsem_auth_changed"));
      }
    } catch (e) {
      console.error("Sign Out Error:", e);
    }
  };

  let prevHref: string | null = null;
  let nextHref: string | null = null;
  let dashboardHref = "/";
  let courseTitle = "Lesson";
  let progressText = "";
  let activeLessonsList: { id: number; slug: string; title: string }[] = [];
  let currentSlug = "";
  let currentLessonDisplay = "";
  let currentUnitDisplay = "";
  let currentBlockDisplay = "";

  // 1. MS Word Lessons (/msword/<slug>)
  if (pathname.startsWith("/msword")) {
    const raw = pathname.replace(/^\/msword\/?/, "").split("/")[0].split("?")[0].replace(/\/$/, "");
    const decoded = decodeURIComponent(raw);
    const idx = mswordLessons.findIndex((l) => l.slug === raw || l.slug === decoded || l.id === Number(raw));
    dashboardHref = "/msword";
    courseTitle = "MS Word 365";
    activeLessonsList = mswordLessons.map(l => ({ id: l.id, slug: l.slug, title: l.title }));

    if (idx !== -1) {
      progressText = `Lesson ${idx + 1} of ${mswordLessons.length}`;
      prevHref = idx > 0 ? `/msword/${mswordLessons[idx - 1].slug}` : "/msword";
      nextHref = idx < mswordLessons.length - 1 ? `/msword/${mswordLessons[idx + 1].slug}` : "/msword";
    } else {
      prevHref = "/msword";
      nextHref = `/msword/${mswordLessons[0].slug}`;
    }
  } 
  // 2. CLI Lessons (/cli/<slug>)
  else if (pathname.startsWith("/cli")) {
    const raw = pathname.replace(/^\/cli\/?/, "").split("/")[0].split("?")[0].replace(/\/$/, "");
    const decoded = decodeURIComponent(raw);
    const idx = cliLessons.findIndex((l) => l.slug === raw || l.slug === decoded || l.id === Number(raw));
    dashboardHref = "/cli";
    courseTitle = "Windows CLI";
    activeLessonsList = cliLessons.map(l => ({ id: l.id, slug: l.slug, title: l.title }));

    if (idx !== -1) {
      progressText = `Lesson ${idx + 1} of ${cliLessons.length}`;
      prevHref = idx > 0 ? `/cli/${cliLessons[idx - 1].slug}` : "/cli";
      nextHref = idx < cliLessons.length - 1 ? `/cli/${cliLessons[idx + 1].slug}` : "/cli";
    } else {
      prevHref = "/cli";
      nextHref = `/cli/${cliLessons[0].slug}`;
    }
  } 
  // 3. HTML Lessons (/html/<slug>)
  else if (pathname.startsWith("/html")) {
    const raw = pathname.replace(/^\/html\/?/, "").split("/")[0].split("?")[0].replace(/\/$/, "");
    const decoded = decodeURIComponent(raw);
    const idx = htmlLessons.findIndex((l) => l.slug === raw || l.slug === decoded || l.id === Number(raw));
    dashboardHref = "/html";
    courseTitle = "HTML Web Dev";
    activeLessonsList = htmlLessons.map(l => ({ id: l.id, slug: l.slug, title: l.title }));

    if (idx !== -1) {
      progressText = `Lesson ${idx + 1} of ${htmlLessons.length}`;
      prevHref = idx > 0 ? `/html/${htmlLessons[idx - 1].slug}` : "/html";
      nextHref = idx < htmlLessons.length - 1 ? `/html/${htmlLessons[idx + 1].slug}` : "/html";
    } else {
      prevHref = "/html";
      nextHref = `/html/${htmlLessons[0].slug}`;
    }
  } 
  // 4. Git Lessons (/git/<slug>)
  else if (pathname.startsWith("/git")) {
    const raw = pathname.replace(/^\/git\/?/, "").split("/")[0].split("?")[0].replace(/\/$/, "");
    const decoded = decodeURIComponent(raw);
    const idx = gitLessons.findIndex((l) => l.slug === raw || l.slug === decoded || l.id === Number(raw));
    dashboardHref = "/git";
    courseTitle = "Git & GitHub";
    activeLessonsList = gitLessons.map(l => ({ id: l.id, slug: l.slug, title: l.title }));

    if (idx !== -1) {
      progressText = `Lesson ${idx + 1} of ${gitLessons.length}`;
      prevHref = idx > 0 ? `/git/${gitLessons[idx - 1].slug}` : "/git";
      nextHref = idx < gitLessons.length - 1 ? `/git/${gitLessons[idx + 1].slug}` : "/git";
    } else {
      prevHref = "/git";
      nextHref = `/git/${gitLessons[0].slug}`;
    }
  } 
  // 6. Textbook Book Chapters (/book/<id> or /<subject>/book/<id>)
  else if (pathname.includes("/book/")) {
    const chapterId = getChapterIdFromPath(pathname);
    const idx = searchIndex.findIndex((item) => item.id === chapterId);
    dashboardHref = "/course";
    courseTitle = "Textbook Chapter";

    if (idx !== -1) {
      progressText = `Chapter ${idx + 1} of ${searchIndex.length}`;
      prevHref = idx > 0 ? getChapterUrl(searchIndex[idx - 1].id) : "/course";
      nextHref = idx < searchIndex.length - 1 ? getChapterUrl(searchIndex[idx + 1].id) : "/course";
    } else {
      prevHref = "/course";
      nextHref = "/course";
    }
  }
  // 7. BCA Unit 1 50 Micro-Lessons (/bca/semester-1/.../unit-1/lessons/<lessonId>)
  else if (pathname.includes("/unit-1/lessons/")) {
    const lessonId = pathname.split("/unit-1/lessons/")[1]?.split("?")[0]?.replace(/\/$/, "") || "";
    const idx = unit1Lessons.findIndex((l) => l.id === lessonId);
    dashboardHref = "/bca/semester-1/bcs-011-computer-basics/unit-1/lessons";
    courseTitle = "BCS-111 Unit 1";
    activeLessonsList = unit1Lessons.map(l => ({ id: l.lessonNumber, slug: `unit-1/lessons/${l.id}`, title: `#${l.lessonNumber} ${l.title}` }));

    if (idx !== -1) {
      const activeL = unit1Lessons[idx];
      currentSlug = `unit-1/lessons/${activeL.id}`;
      progressText = `Lesson ${idx + 1} of 50`;
      currentLessonDisplay = `Lesson #${activeL.lessonNumber}: ${activeL.title}`;
      currentUnitDisplay = "Unit 1: Computer their Origin and Applications";
      currentBlockDisplay = "Block 1: Basics of Computer Hardware (BCS-111)";
      prevHref = idx > 0 ? `/bca/semester-1/bcs-011-computer-basics/unit-1/lessons/${unit1Lessons[idx - 1].id}` : "/bca/semester-1/bcs-011-computer-basics/unit-1/lessons";
      nextHref = idx < unit1Lessons.length - 1 ? `/bca/semester-1/bcs-011-computer-basics/unit-1/lessons/${unit1Lessons[idx + 1].id}` : "/bca/semester-1/bcs-011-computer-basics/unit-1/lessons";
    } else {
      prevHref = "/bca/semester-1/bcs-011-computer-basics/unit-1/lessons";
      nextHref = `/bca/semester-1/bcs-011-computer-basics/unit-1/lessons/${unit1Lessons[0].id}`;
    }
  }
  // 8. General BCA Subject Unit Lessons (/bca/semester-1/<subjectSlug>/<lessonSlug>)
  else if (pathname.includes("/bca/semester-")) {
    const segs = pathname.replace(/^\/bca\//, "").split("/");
    const semSeg = segs[0] || "semester-1";
    const subSeg = segs[1] || "bcs-011-computer-basics";
    const lesSeg = segs[2] || "";

    const subjectLessons = bcaLessons
      .filter(l => l.subjectSlug.toLowerCase() === subSeg.toLowerCase() || l.subjectCode.toLowerCase() === subSeg.toLowerCase())
      .sort((a, b) => a.unitNumber - b.unitNumber);

    const idx = subjectLessons.findIndex(l => l.slug.toLowerCase() === lesSeg.toLowerCase() || l.id.toLowerCase() === lesSeg.toLowerCase());

    dashboardHref = `/bca/${semSeg}/${subSeg}`;
    courseTitle = subSeg.toUpperCase();
    activeLessonsList = subjectLessons.map(l => ({ id: l.unitNumber, slug: `${subSeg}/${l.slug}`, title: `Unit ${l.unitNumber}: ${l.title}` }));

    if (idx !== -1) {
      const activeL = subjectLessons[idx];
      currentSlug = `${subSeg}/${activeL.slug}`;
      progressText = `Unit ${activeL.unitNumber} of ${subjectLessons.length}`;
      const titleHasUnit = activeL.title.toLowerCase().includes(`unit ${activeL.unitNumber}`) || activeL.title.toLowerCase().startsWith("unit ");
      currentLessonDisplay = titleHasUnit ? activeL.title : `Unit ${activeL.unitNumber}: ${activeL.title}`;
      currentUnitDisplay = `Unit ${activeL.unitNumber} (${activeL.subjectCode})`;
      currentBlockDisplay = `${activeL.subjectCode} — ${activeL.subjectSlug.toUpperCase()}`;
      prevHref = idx > 0 ? `/bca/${semSeg}/${subSeg}/${subjectLessons[idx - 1].slug}` : `/bca/${semSeg}/${subSeg}`;
      nextHref = idx < subjectLessons.length - 1 ? `/bca/${semSeg}/${subSeg}/${subjectLessons[idx + 1].slug}` : `/bca/${semSeg}/${subSeg}`;
    } else {
      prevHref = `/bca/${semSeg}/${subSeg}`;
      nextHref = subjectLessons.length > 0 ? `/bca/${semSeg}/${subSeg}/${subjectLessons[0].slug}` : `/bca/${semSeg}`;
    }
  }
  // 9. General Fallback
  else {
    dashboardHref = "/";
    courseTitle = "Lessons";
    progressText = "Interactive Lesson";
    prevHref = "/";
    nextHref = "/";
  }
  return (
    <>
      {/* ── SLIDE-UP TOOLS DRAWER ── */}
      {toolsOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md z-40 transition-opacity animate-in fade-in duration-200"
            onClick={() => setToolsOpen(false)}
          />
          <div 
            className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 dark:bg-neutral-950/95 backdrop-blur-2xl border-t border-x border-slate-200 dark:border-neutral-800 rounded-t-[32px] p-5 pb-24 z-50 animate-in slide-in-from-bottom duration-300 select-none shadow-2xl text-black dark:text-white space-y-4"
            style={{ paddingBottom: 'calc(5.5rem + env(safe-area-inset-bottom))' }}
          >
            <div className="w-12 h-1 bg-slate-300 dark:bg-neutral-700 rounded-full mx-auto mb-2" />
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-neutral-800">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-black dark:text-white flex items-center gap-2">
                <Sliders size={16} className="text-blue-600 dark:text-blue-400" />
                Lesson Reading Preferences
              </h3>
              <button 
                onClick={() => setToolsOpen(false)}
                className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Language Switcher */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">Select Language</label>
              <div className="grid grid-cols-3 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-1 rounded-xl gap-1">
                {(["english", "hinglish", "hindi"] as Lang[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLangChange(lang)}
                    className={`text-xs font-black uppercase py-2 px-2 rounded-lg transition-all cursor-pointer ${
                      selectedLang === lang
                        ? "bg-blue-600 text-white shadow-sm font-bold"
                        : "text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white"
                    }`}
                  >
                    {lang === "english" ? "🇬🇧 EN" : lang === "hinglish" ? "🌐 Hinglish" : "🇮🇳 हिंदी"}
                  </button>
                ))}
              </div>
            </div>

            {/* Kid vs Pro Level Mode */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">Content Mode</label>
              <div className="grid grid-cols-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-1 rounded-xl gap-1">
                {(["kid", "pro"] as Level[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => handleLevelChange(level)}
                    className={`text-xs font-black uppercase py-2 px-2 rounded-lg transition-all cursor-pointer ${
                      selectedLevel === level
                        ? "bg-blue-600 text-white font-black shadow-sm"
                        : "text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white"
                    }`}
                  >
                    {level === "kid" ? "🧒 Beginner Mode" : "💼 Professional"}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size Adjuster */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-slate-700 dark:text-slate-300 tracking-wider">Font Size ({fontSize}px)</label>
              <div className="flex items-center justify-between bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-2 rounded-xl">
                <button
                  onClick={() => handleFontSizeChange(-1)}
                  className="px-4 py-1.5 bg-white hover:bg-slate-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-slate-200 dark:border-neutral-700 text-black dark:text-white font-black rounded-lg transition-colors cursor-pointer text-xs"
                >
                  A- Small
                </button>
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">{fontSize}px</span>
                <button
                  onClick={() => handleFontSizeChange(1)}
                  className="px-4 py-1.5 bg-white hover:bg-slate-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-slate-200 dark:border-neutral-700 text-black dark:text-white font-black rounded-lg transition-colors cursor-pointer text-xs"
                >
                  A+ Large
                </button>
              </div>
            </div>

          </div>
        </>
      )}

      {/* ── SLIDE-UP LESSON & NAVIGATION MENU DRAWER ── */}
      {menuOpen && (
        <>
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
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-200 dark:border-neutral-800">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-blue-600 flex items-center justify-center text-white font-mono font-bold text-xs shadow-sm">
                  &lt;/&gt;
                </div>
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-black dark:text-white flex items-center gap-2">
                  {courseTitle}
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 dark:bg-neutral-900 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-800 rounded-full">
                    {progressText || "Menu"}
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

            <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1 custom-scrollbar">
              
              {/* User Auth Banner */}
              <div className="p-3 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl">
                {currentUser ? (
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {currentUser.photo ? (
                        <img 
                          src={currentUser.photo} 
                          alt={currentUser.name || "User"} 
                          className="w-9 h-9 rounded-full object-cover border-2 border-blue-600 shrink-0"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                          {currentUser.avatar || currentUser.name?.charAt(0) || "U"}
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
                      <LogOut size={15} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-black dark:text-white">Guest Student</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Sign in to save certifications &amp; stats</div>
                    </div>
                    <button
                      onClick={handleSignIn}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-extrabold text-[11px] transition-all cursor-pointer shadow-sm"
                    >
                      <LogIn size={13} />
                      <span>Sign In</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Module Lessons Menu List */}
              {activeLessonsList.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 px-1">
                    All Course Lessons ({activeLessonsList.length})
                  </div>
                  {activeLessonsList.map((item) => {
                    const isActive = item.slug === currentSlug;
                    const itemDone = completedChapters[item.slug] === true;
                    return (
                      <Link
                        key={item.id}
                        href={`${dashboardHref}/${item.slug}`}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center justify-between gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                          isActive
                            ? "bg-blue-50 dark:bg-neutral-900 border-blue-600 text-blue-600 dark:text-blue-400 font-bold"
                            : "bg-white hover:bg-slate-50 dark:bg-neutral-950 dark:hover:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-black dark:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 ${
                            isActive ? "bg-blue-600 text-white" : itemDone ? "bg-blue-50 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-700" : "bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-slate-400"
                          }`}>
                            {itemDone ? "✓" : item.id}
                          </span>
                          <span className="truncate text-xs">{item.title}</span>
                        </div>
                        {isActive && <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse shrink-0" />}
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Quick Navigation Links */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-neutral-800">
                <Link
                  href={dashboardHref}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 bg-white hover:bg-slate-50 dark:bg-neutral-950 dark:hover:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs font-bold text-black dark:text-white"
                >
                  <BookOpen size={15} className="text-blue-600 dark:text-blue-400" />
                  <span>Course Dashboard</span>
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 bg-white hover:bg-slate-50 dark:bg-neutral-950 dark:hover:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs font-bold text-black dark:text-white"
                >
                  <User size={15} className="text-blue-600 dark:text-blue-400" />
                  <span>My Profile</span>
                </Link>
                <Link
                  href="/cmd"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 bg-white hover:bg-slate-50 dark:bg-neutral-950 dark:hover:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs font-bold text-black dark:text-white"
                >
                  <Code size={15} className="text-blue-600 dark:text-blue-400" />
                  <span>CMD Terminal</span>
                </Link>
                <Link
                  href="/bca"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 bg-white hover:bg-slate-50 dark:bg-neutral-950 dark:hover:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs font-bold text-black dark:text-white"
                >
                  <GraduationCap size={15} className="text-blue-600 dark:text-blue-400" />
                  <span>BCA Syllabus</span>
                </Link>
              </div>

            </div>
          </div>
        </>
      )}



      {/* ── SLIDE-UP SUBJECT & UNIT SWITCHER DRAWER (Integrating BcaHeaderNav Dropdown) ── */}
      {subjectDrawerOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md z-40 transition-opacity animate-in fade-in duration-200"
            onClick={() => setSubjectDrawerOpen(false)}
          />
          
          <div 
            className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white/95 dark:bg-neutral-950/95 backdrop-blur-2xl border-t border-x border-slate-200 dark:border-neutral-800 rounded-t-[32px] p-5 pb-24 z-50 animate-in slide-in-from-bottom duration-300 select-none shadow-2xl text-black dark:text-white"
            style={{ paddingBottom: 'calc(5.5rem + env(safe-area-inset-bottom))' }}
          >
            <div className="w-12 h-1 bg-slate-300 dark:bg-neutral-700 rounded-full mx-auto mb-4" />

            <div className="flex flex-col items-center text-center mb-4 pb-3 border-b border-slate-200 dark:border-neutral-800 relative">
              <div className="flex items-center justify-center gap-2 mb-1">
                <BookOpen size={18} className="text-blue-600 dark:text-blue-400" />
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-black dark:text-white text-center">
                  Switch Subject or Unit
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center font-medium">
                BCA Degree Curriculum Sequence
              </p>
              <button 
                onClick={() => setSubjectDrawerOpen(false)}
                className="absolute right-0 top-0 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar text-center">
              {/* 1. Micro-Lessons Fast Switcher Grid */}
              <div className="space-y-2 pb-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    BCS-111 Unit 1 Micro-Lessons (50)
                  </span>
                  <Link
                    href="/bca/semester-1/bcs-011-computer-basics/unit-1/lessons"
                    onClick={() => setSubjectDrawerOpen(false)}
                    className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View All Hub
                  </Link>
                </div>

                <div className="grid grid-cols-5 gap-1.5 p-2.5 bg-slate-50 dark:bg-neutral-900 rounded-2xl border border-slate-200 dark:border-neutral-800 shadow-inner">
                  {unit1Lessons.map((l) => {
                    const isCurrentLesson = pathname.includes(`/lessons/${l.id}`) || (l.lessonNumber === 1 && (pathname.endsWith('/unit-1') || pathname.endsWith('/unit-1/lessons')));

                    return (
                      <button
                        key={l.id}
                        onClick={() => {
                          setSubjectDrawerOpen(false);
                          router.push(`/bca/semester-1/bcs-011-computer-basics/unit-1/lessons/${l.id}`);
                        }}
                        className={`p-2 rounded-xl text-[11px] font-black text-center transition-all cursor-pointer ${
                          isCurrentLesson
                            ? "bg-blue-600 text-white border border-blue-600 shadow-md scale-105"
                            : "bg-white hover:bg-slate-100 dark:bg-neutral-950 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300"
                        }`}
                        title={`#${l.lessonNumber}: ${l.title}`}
                      >
                        #{l.lessonNumber}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Active Reading Position Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-center space-y-1.5 shadow-sm">
                <div className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                  📍 Active Reading Position
                </div>

                <div className="text-sm sm:text-base font-black text-black dark:text-white">
                  {currentLessonDisplay || "Lesson #1: What is a Computer?"}
                </div>

                <div className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1.5">
                  <BookOpen size={13} className="text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>{currentUnitDisplay || "Unit 1: Computer their Origin and Applications"}</span>
                </div>

                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5">
                  <span>📦 {currentBlockDisplay || "Block 1: Basics of Computer Hardware (BCS-111)"}</span>
                </div>
              </div>

              {/* 3. Subject Order */}
              <div className="space-y-2.5 pt-2 border-t border-slate-200 dark:border-neutral-800">
                <div className="text-[11px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 text-center">
                  📚 BCA Subject Order
                </div>
                
                {bcaSemesters[0]?.subjects.map((sub) => {
                  const targetUrl = (sub.code === "BCS-111" || sub.code === "BCS-011")
                    ? "/bca/semester-1/bcs-011-computer-basics/unit-1-introduction-to-computer-systems"
                    : `/bca/1/${sub.code.toLowerCase()}`;

                  const isCurrent = pathname.includes(sub.code.toLowerCase()) || (sub.code === "BCS-111" && pathname.includes("bcs-011"));

                  return (
                    <div key={sub.code} className="space-y-1.5">
                      <button
                        onClick={() => {
                          setSubjectDrawerOpen(false);
                          router.push(targetUrl);
                        }}
                        className={`w-full text-center p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 group cursor-pointer ${
                          isCurrent
                            ? "bg-blue-50 dark:bg-neutral-900 border-blue-600 text-blue-600 dark:text-blue-400 shadow-sm"
                            : "bg-white hover:bg-slate-50 dark:bg-neutral-950 dark:hover:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-black dark:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 mx-auto">
                          <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-neutral-900 text-blue-600 dark:text-blue-400 text-[10px] font-black border border-blue-200 dark:border-neutral-800 shrink-0">
                            {sub.code}
                          </span>
                          <span className="text-xs font-bold truncate">
                            {sub.name}
                          </span>
                        </div>
                        {isCurrent && <CheckCircle2 size={15} className="text-blue-600 dark:text-blue-400 shrink-0" />}
                      </button>

                      {/* Display Units for this Subject */}
                      <div className="grid grid-cols-1 gap-1 pl-2 pr-2">
                        {sub.blocks.map((block) => (
                          <div key={block.name} className="space-y-1 my-1">
                            <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider text-center">
                              {block.name}
                            </div>
                            {block.units.map((unit, uIdx) => (
                              <button
                                key={unit.fileName}
                                onClick={() => {
                                  setSubjectDrawerOpen(false);
                                  const unitSlug = unit.displayName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                  router.push(`/bca/semester-1/${sub.code.toLowerCase()}/unit-${uIdx + 1}-${unitSlug}`);
                                }}
                                className="w-full py-1.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-neutral-900 dark:hover:bg-neutral-850 border border-slate-200 dark:border-neutral-800 text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 text-center transition-all cursor-pointer truncate"
                              >
                                Unit {uIdx + 1}: {unit.displayName}
                              </button>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Semester Switcher Tabs */}
              <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-neutral-800">
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 text-center">
                  BCA Semesters (1 to 6)
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((semNum) => (
                    <Link
                      key={semNum}
                      href={`/bca/semester-${semNum}`}
                      onClick={() => setSubjectDrawerOpen(false)}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-center text-xs font-extrabold text-black dark:text-white transition-all"
                    >
                      Semester {semNum}
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </>
      )}

      {/* ── FULL-WIDTH PINNED EDGE-TO-EDGE TAB BAR (Strict Blue, Black & White) ── */}
      <nav 
        className={`fixed left-0 right-0 bottom-0 w-full z-[999] select-none bg-white/95 dark:bg-black/95 backdrop-blur-2xl border-t border-slate-200 dark:border-neutral-800 shadow-[0_-8px_25px_rgba(0,0,0,0.1)] text-black dark:text-white transition-transform duration-300 ${
          navVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="px-2 py-1.5 flex items-center justify-around w-full max-w-xl mx-auto">
          
          {/* TAB 1: HOME */}
          <Link
            href="/"
            className="relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 active:scale-90 text-slate-700 hover:text-black dark:text-slate-300 dark:hover:text-white"
          >
            <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center text-white font-mono font-bold text-[9px] shadow-sm">
              &lt;&gt;
            </div>
            <span className="text-[10px] font-bold tracking-tight mt-0.5">Home</span>
          </Link>

          {/* TAB 2: PREV */}
          {prevHref ? (
            <Link
              href={prevHref}
              className="relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 active:scale-90 text-blue-600 dark:text-blue-400 font-bold"
            >
              <ChevronLeft size={18} className="stroke-[2.5]" />
              <span className="text-[10px] font-bold tracking-tight mt-0.5">Prev</span>
            </Link>
          ) : (
            <div className="relative flex flex-col items-center justify-center py-1 px-3 rounded-xl opacity-30 text-slate-400 dark:text-slate-600 cursor-not-allowed">
              <ChevronLeft size={18} className="stroke-[1.5]" />
              <span className="text-[10px] font-bold tracking-tight mt-0.5">Prev</span>
            </div>
          )}

          {/* TAB 3: THEME TOGGLE (Sun / Moon) */}
          <button
            onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
            className="relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 active:scale-90 text-slate-700 hover:text-black dark:text-slate-300 dark:hover:text-white cursor-pointer"
            title={`Switch to ${currentTheme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {currentTheme === 'dark' ? (
              <Sun size={18} className="stroke-[2] text-blue-400" />
            ) : (
              <Moon size={18} className="stroke-[2] text-blue-600" />
            )}
            <span className="text-[10px] font-bold tracking-tight mt-0.5">
              {currentTheme === 'dark' ? 'Light' : 'Dark'}
            </span>
          </button>

          {/* TAB 4: NEXT */}
          {nextHref ? (
            <Link
              href={nextHref}
              className="relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 active:scale-90 text-blue-600 dark:text-blue-400 font-bold"
            >
              <ChevronRight size={18} className="stroke-[2.5]" />
              <span className="text-[10px] font-black tracking-tight mt-0.5">Next</span>
            </Link>
          ) : (
            <div className="relative flex flex-col items-center justify-center py-1 px-3 rounded-xl opacity-30 text-slate-400 dark:text-slate-600 cursor-not-allowed">
              <ChevronRight size={18} className="stroke-[1.5]" />
              <span className="text-[10px] font-black tracking-tight mt-0.5">Next</span>
            </div>
          )}

          {/* TAB 5: UNIT / SUBJECT SWITCHER */}
          <button
            onClick={() => {
              setSubjectDrawerOpen(!subjectDrawerOpen);
              setMenuOpen(false);
              setToolsOpen(false);
            }}
            className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 active:scale-90 cursor-pointer ${
              subjectDrawerOpen 
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-neutral-900 border border-blue-200 dark:border-neutral-800 font-bold' 
                : 'text-slate-700 hover:text-black dark:text-slate-300 dark:hover:text-white font-bold'
            }`}
          >
            <BookOpen size={18} className="stroke-[2]" />
            <span className="text-[10px] font-bold tracking-tight mt-0.5">Unit ▾</span>
            {subjectDrawerOpen && (
              <span className="absolute -top-0.5 w-1.5 h-1.5 bg-blue-600 rounded-full" />
            )}
          </button>

        </div>
      </nav>
    </>
  );
}
