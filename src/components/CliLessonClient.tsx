"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ChevronLeft, ChevronRight, BookOpen, Code, 
  HelpCircle, CheckCircle2, AlertCircle, Sparkles, Lock, ArrowLeft, X, FileText, Loader2, Bookmark
} from "lucide-react";
import { cliLessons } from "../data/cliLessonsData";
import AdSenseBanner from "./AdSenseBanner";
import { useProgress } from "../context/ProgressContext";
import { AdMob } from "@capacitor-community/admob";
import { triggerCelebration } from "../lib/celebration";
import TopicAnimationWidget from "./TopicAnimationWidget";

interface CliLessonClientProps {
  lesson: any; // Using any to avoid type issues with imported Lesson structures
}

export default function CliLessonClient({ lesson }: CliLessonClientProps) {
  const router = useRouter();
  const { completedChapters, markCompleted } = useProgress();

  const [mounted, setMounted] = useState(false);
  const [selectedLang, setSelectedLang] = useState<"english" | "hinglish" | "hindi">("english");
  const [selectedLevel, setSelectedLevel] = useState<"kid" | "pro">("kid");
  const [showTutorTip, setShowTutorTip] = useState(false);
  
  // Bookmark state
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedBookmarks = JSON.parse(localStorage.getItem("nextsem_cli_bookmarks") || "[]");
      setIsBookmarked(savedBookmarks.includes(lesson.id));
    }
  }, [lesson.id]);

  const toggleBookmark = () => {
    if (typeof window !== "undefined") {
      const savedBookmarks = JSON.parse(localStorage.getItem("nextsem_cli_bookmarks") || "[]");
      let updated;
      if (savedBookmarks.includes(lesson.id)) {
        updated = savedBookmarks.filter((id: number) => id !== lesson.id);
        setIsBookmarked(false);
      } else {
        updated = [...savedBookmarks, lesson.id];
        setIsBookmarked(true);
      }
      localStorage.setItem("nextsem_cli_bookmarks", JSON.stringify(updated));
    }
  };
  
  // Exercise States
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // PDF States
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState("");

  // User States
  // defaults to "guest" so progress auto-saves without login
  const [userEmail, setUserEmail] = useState<string>("guest");

  // Sync preferences on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("nextsem_cli_lang") as "english" | "hinglish" | "hindi" | null;
      if (savedLang) setSelectedLang(savedLang);

      const savedLevel = localStorage.getItem("nextsem_cli_level") as "kid" | "pro" | null;
      if (savedLevel) setSelectedLevel(savedLevel);

      const hideTip = localStorage.getItem("nextsem_cli_hide_tip") === "true";
      setShowTutorTip(false); // Help guide hidden by default
      setMounted(true);
    }
  }, []);

  const handleLangChange = (lang: "english" | "hinglish" | "hindi") => {
    setSelectedLang(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("nextsem_cli_lang", lang);
    }
  };

  const handleLevelChange = (level: "kid" | "pro") => {
    setSelectedLevel(level);
    if (typeof window !== "undefined") {
      localStorage.setItem("nextsem_cli_level", level);
    }
  };

  const dismissTutorTip = () => {
    setShowTutorTip(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("nextsem_cli_hide_tip", "true");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nextsem_user");
      if (saved) {
        try {
          const userObj = JSON.parse(saved);
          if (userObj?.email) {
            setUserEmail(userObj.email);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const currentExercise = lesson.exercise[selectedLang] || lesson.exercise.english;

  // Check if current lesson is completed
  const isLessonCompletedKey = `nextsem_cli_completed_${userEmail}_${lesson.id}`;
  const [isLessonDone, setIsLessonDone] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const done = localStorage.getItem(isLessonCompletedKey) === "true" || completedChapters[lesson.slug] === true;
      setIsLessonDone(done);
      if (done) {
        // Pre-fill answer if already completed
        setSelectedOption(currentExercise.correctAnswer);
        setIsCorrect(true);
        setShowFeedback(true);
      } else {
        setSelectedOption(null);
        setIsCorrect(false);
        setShowFeedback(false);
        setShowHint(false);
      }
    }
  }, [lesson, isLessonCompletedKey, completedChapters, selectedLang, currentExercise]);

  // Find adjacent lessons
  const currentIndex = cliLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? cliLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < cliLessons.length - 1 ? cliLessons[currentIndex + 1] : null;

  // Check if next lesson is unlocked
  const isNextUnlocked = isLessonDone;

  const handleOptionSelect = (option: string, e?: React.MouseEvent) => {
    if (isLessonDone) return; // Prevent change after completion
    setSelectedOption(option);
    const correct = option === currentExercise.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      triggerCelebration(e);
      if (typeof window !== "undefined") {
        localStorage.setItem(isLessonCompletedKey, "true");
        setIsLessonDone(true);
        markCompleted(lesson.slug);

        // Trigger user rating prompt
        window.dispatchEvent(new CustomEvent("trigger-rate-prompt"));
      }
    }
  };

  const handlePdfDownload = async () => {
    const isNative = typeof window !== 'undefined' &&
      (window as any).Capacitor?.isNativePlatform();

    if (isNative) {
      setIsDownloading(true);
      setDownloadStatus("Preparing Ad...");
      try {
        // Prepare Rewarded Video Ad
        await AdMob.prepareRewardVideoAd({
          adId: 'ca-app-pub-4242865347895866/5641573985', // Production AdMob Rewarded Ad ID
          isTesting: false
        });

        // Setup event listener for reward
        let rewardEarned = false;
        const rewardListener = await AdMob.addListener('rewardedVideoReward' as any, () => {
          rewardEarned = true;
        });

        const closeListener = await AdMob.addListener('rewardedVideoClosed' as any, () => {
          // Clean up listeners
          rewardListener.remove();
          closeListener.remove();
          
          setIsDownloading(false);
          if (rewardEarned) {
            triggerPdfPrint();
          } else {
            alert("You must watch the full sponsored ad to unlock the PDF download!");
          }
        });

        // Show Ad
        await AdMob.showRewardVideoAd();
      } catch (e) {
        console.error("AdMob Rewarded Ad failed:", e);
        setIsDownloading(false);
        // Fallback: if ad fails to load/show, let them download anyway
        triggerPdfPrint();
      }
    } else {
      // Web simulation
      setIsDownloading(true);
      setDownloadStatus("Loading Ad...");
      setTimeout(() => {
        setDownloadStatus("Watching Ad (2s)...");
        setTimeout(() => {
          setIsDownloading(false);
          triggerPdfPrint();
        }, 2000);
      }, 1000);
    }
  };

  const triggerPdfPrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // Basic Markdown-to-JSX parser
  const renderContentText = (text: string) => {
    if (!text) return null;
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={idx} className="h-2" />;

      if (trimmed.startsWith("###")) {
        return (
          <h3 key={idx} className="text-md md:text-lg font-black text-slate-100 mt-6 mb-3 flex items-center gap-2 border-b border-slate-800/40 pb-1">
            <span className="text-[#c1a648]">#</span>
            {trimmed.replace("###", "").trim()}
          </h3>
        );
      }

      if (trimmed.startsWith("* ")) {
        return (
          <li key={idx} className="ml-5 list-disc text-xs md:text-sm text-slate-350 my-1.5 leading-relaxed">
            {trimmed.replace("* ", "").replace(/\*\*(.*?)\*\*/g, "$1").trim()}
          </li>
        );
      }

      if (trimmed.startsWith("1. ") || trimmed.startsWith("2. ") || trimmed.startsWith("3. ")) {
        return (
          <li key={idx} className="ml-5 list-decimal text-xs md:text-sm text-slate-350 my-1.5 leading-relaxed">
            {trimmed.replace(/^\d+\.\s*/, "").replace(/\*\*(.*?)\*\*/g, "$1").trim()}
          </li>
        );
      }

      // Normal paragraph
      const boldRegex = /\*\*(.*?)\*\*/g;
      if (boldRegex.test(trimmed)) {
        const parts = trimmed.split(boldRegex);
        return (
          <p key={idx} className="text-xs md:text-sm text-slate-350 leading-relaxed my-2.5 font-medium">
            {parts.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="text-[#c1a648] font-black">{part}</strong> : part)}
          </p>
        );
      }

      return (
        <p key={idx} className="text-xs md:text-sm text-slate-350 leading-relaxed my-2.5 font-medium">
          {trimmed}
        </p>
      );
    });
  };

  const currentContent = lesson[selectedLang][selectedLevel];

  if (!mounted) {
    return (
      <div className="space-y-6 animate-pulse text-left py-10">
        <div className="h-6 bg-slate-900 rounded-lg w-1/4" />
        <div className="h-10 bg-slate-900 rounded-xl w-3/4" />
        <div className="h-48 bg-slate-900 rounded-2xl w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner Ad */}
      <AdSenseBanner />

      {/* Nextsem Academy Clean Header (Previous + Exact Lesson Title + Save + Next) */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-800/60 pt-2">
        {/* Left: Previous Lesson */}
        <div className="flex items-center gap-2 shrink-0">
          {prevLesson ? (
            <Link
              href={prevLesson.id === 1 ? "/cli" : `/cli/${prevLesson.slug}`}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <ChevronLeft size={16} className="stroke-[2.5]" />
              <span className="hidden sm:inline">Previous</span>
            </Link>
          ) : (
            <div className="px-3.5 py-2 bg-slate-950/60 border border-slate-850 text-slate-600 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-not-allowed">
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">Previous</span>
            </div>
          )}
        </div>

        {/* Center: Exact Clean Topic Title */}
        <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight text-center truncate px-2">
          {lesson.title}
        </h1>

        {/* Right: Save Options + Next Lesson */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleBookmark}
            className={`px-3 py-2 rounded-xl border transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
              isBookmarked
                ? "bg-emerald-950/40 border-emerald-500/40 text-[#04AA6D]"
                : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
            }`}
            title={isBookmarked ? "Remove Bookmark" : "Save Bookmark"}
          >
            <Bookmark size={18} className={`stroke-[2.5] ${isBookmarked ? "fill-[#04AA6D] text-[#04AA6D]" : ""}`} />
            <span className="text-xs font-bold">{isBookmarked ? "Saved" : "Save"}</span>
          </button>

          {nextLesson ? (
            <Link
              href={`/cli/${nextLesson.slug}`}
              className="px-4 py-2 bg-[#04AA6D] hover:bg-[#039861] text-white rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-md shadow-[#04AA6D]/20 cursor-pointer"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={16} className="stroke-[2.5]" />
            </Link>
          ) : null}
        </div>
      </div>

      {/* Interactive Tabs Menu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/40 border border-slate-850 p-2.5 rounded-2xl backdrop-blur-xl">
        {/* Language Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900/50 p-1 rounded-xl border border-slate-800/30">
          <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider pl-2 pr-1 hidden sm:inline">🌐 Lang:</span>
          {(["english", "hinglish", "hindi"] as const).map((lang) => {
            const labelMap = { english: "🇬🇧 English", hinglish: "🗣️ Hinglish", hindi: "🕉️ Hindi" };
            return (
              <button
                key={lang}
                onClick={() => handleLangChange(lang)}
                className={`flex-1 py-1.5 text-[11px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  selectedLang === lang
                    ? "bg-[#04AA6D] text-white shadow-sm font-black"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                }`}
              >
                {labelMap[lang]}
              </button>
            );
          })}
        </div>

        {/* Level Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-900/50 p-1 rounded-xl border border-slate-800/30">
          <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider pl-2 pr-1 hidden sm:inline">🧠 Level:</span>
          {(["kid", "pro"] as const).map((level) => {
            const labelMap = { kid: "🧒 Kid Mode (6th)", pro: "💻 Professional" };
            return (
              <button
                key={level}
                onClick={() => handleLevelChange(level)}
                className={`flex-1 py-1.5 text-[11px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  selectedLevel === level
                    ? "bg-[#04AA6D] text-white shadow-sm font-black"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                }`}
              >
                {labelMap[level]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-slate-900/40 border border-slate-850 p-5 md:p-8 rounded-2xl shadow-xl backdrop-blur-xl relative overflow-hidden">
        {/* Dynamic Mode Watermark */}
        <div className="absolute top-2 right-4 text-[9px] font-black uppercase tracking-widest text-slate-700 pointer-events-none select-none">
          {selectedLang} • {selectedLevel}
        </div>

        {selectedLevel === "kid" && (
          <div className="mb-6 p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl flex items-start gap-3">
            <span className="text-2xl shrink-0">💡</span>
            <div className="text-left">
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider block">Simplified Analogy</span>
              <p className="text-xs text-slate-300 font-semibold leading-relaxed mt-0.5">
                We are using analogies here to make complex structures easy to visualize! Switch to **Professional** mode at the top once you understand the core idea.
              </p>
            </div>
          </div>
        )}

        <article className="prose prose-invert max-w-none text-left">
          {renderContentText(currentContent)}
        </article>

        {/* Visual Demonstration Topic Animation GIF Card */}
        <TopicAnimationWidget lessonId={lesson.id} lessonTitle={lesson.title} type="cli" />
      </div>

      {/* Nextsem Academy CLI Quiz Reminder Card (Replaces inline question block - Image 86) */}
      <div className="my-8 p-5 md:p-6 bg-[#1d2a35] border border-slate-700/60 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl text-left">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#04AA6D]/20 text-[#04AA6D] flex items-center justify-center font-black text-xl shrink-0 border border-[#04AA6D]/30 shadow-inner">
            💻
          </div>
          <div>
            <h4 className="text-base font-extrabold text-white">Test Your CLI & CMD Knowledge!</h4>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              Take the comprehensive CLI Quiz to test your understanding of Windows Command Prompt commands and terminal workflows.
            </p>
          </div>
        </div>
        <Link
          href="/cli/quiz"
          className="px-5 py-2.5 bg-[#04AA6D] hover:bg-[#039861] text-white font-extrabold text-xs rounded-xl shadow-md transition-all whitespace-nowrap cursor-pointer shrink-0 flex items-center gap-1.5"
        >
          <span>Start CLI Quiz »</span>
        </Link>
      </div>

      {/* Rewarded Ad PDF Download Option */}
      <div className="w-full flex justify-center pt-2">
        <button
          onClick={handlePdfDownload}
          disabled={isDownloading}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-xs bg-slate-900 border border-slate-850 hover:border-[#c1a648]/50 hover:bg-slate-850 text-[#c1a648] hover:text-white transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          {isDownloading ? (
            <>
              <Loader2 size={14} className="animate-spin text-[#c1a648]" />
              <span>{downloadStatus}</span>
            </>
          ) : (
            <>
              <FileText size={14} />
              <span>Download Lesson PDF</span>
              <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-[#c1a648]/20 text-[#c1a648] text-[8px] font-black tracking-wider uppercase animate-pulse">
                <Sparkles size={8} /> Watch Ad
              </span>
            </>
          )}
        </button>
      </div>

      {/* Lesson Foot Pagination — visible on desktop; mobile uses bottom 5-tab bar */}
      <div className="hidden md:flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-850 pt-6">
        {prevLesson ? (
          <Link
            href={`/cli/${prevLesson.slug}`}
            className="w-full sm:w-auto justify-center px-4 py-2.5 bg-[#9daec8] hover:bg-[#b5c5dd] text-slate-950 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm"
          >
            <ChevronLeft size={16} className="stroke-[2.5]" />
            <span>Previous</span>
          </Link>
        ) : (
          <div className="w-full sm:w-auto justify-center px-4 py-2.5 bg-slate-900/50 text-slate-600 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border border-slate-850 cursor-not-allowed">
            <ChevronLeft size={16} />
            <span>Previous</span>
          </div>
        )}

        {/* Center Track Progress Sign In Button / Badge */}
        {userEmail === "guest" ? (
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent("nextsem_open_auth"));
            }}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
          >
            <span>Sign in to track progress</span>
          </button>
        ) : (
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
            ✓ Progress Auto-Saved
          </span>
        )}

        {nextLesson ? (
          <Link
            href={`/cli/${nextLesson.slug}`}
            className="w-full sm:w-auto justify-center px-5 py-2.5 bg-[#04AA6D] hover:bg-[#039861] text-white rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-[#04AA6D]/20 cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight size={16} className="stroke-[3]" />
          </Link>
        ) : null}
      </div>

      {/* Hidden print container containing the current lesson */}
      <div id="print-section" className="hidden prose prose-slate dark:prose-invert max-w-none text-left">
        <div className="mb-6 border-b pb-4">
          <h1 className="text-3xl font-black text-slate-900">Nextsem Academy</h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Lesson: {lesson.title}</p>
        </div>
        <div className="text-slate-800">
          {renderContentText(lesson.english.pro)}
        </div>
      </div>

      {/* Bottom Ad Banner */}
      <AdSenseBanner />
    </div>
  );
}
