"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ChevronLeft, ChevronRight, BookOpen, Code, 
  HelpCircle, CheckCircle2, AlertCircle, Sparkles, Lock, ArrowLeft, X, Bookmark, Download
} from "lucide-react";
import { htmlLessons, Lesson } from "../data/htmlLessonsData";
import AdSenseBanner from "./AdSenseBanner";
import { useProgress } from "../context/ProgressContext";
import { triggerCelebration } from "../lib/celebration";
import TopicAnimationWidget from "./TopicAnimationWidget";
import HtmlTagTooltip from "./HtmlTagTooltip";
import TaskBasedCodingLab from "./TaskBasedCodingLab";
import { AdMob } from "@capacitor-community/admob";
import { Capacitor } from "@capacitor/core";
import { showRewardedAd } from "@/lib/admobHelper";
import { generateAndDownloadLessonPdf } from "../lib/pdfHelper";

interface HtmlLessonClientProps {
  lesson: Lesson;
}

export default function HtmlLessonClient({ lesson }: HtmlLessonClientProps) {
  const router = useRouter();
  const { completedChapters, markCompleted } = useProgress();

  const [mounted, setMounted] = useState(false);
  const [selectedLang, setSelectedLang] = useState<"english" | "hinglish" | "hindi">("english");
  const [selectedLevel, setSelectedLevel] = useState<"kid" | "pro">("kid");
  const [showTutorTip, setShowTutorTip] = useState(false);
  
  // Exercise States
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // User States — defaults to "guest" so progress auto-saves without login
  // After AdSense approval this will merge with Google Sign In profile
  const [userEmail, setUserEmail] = useState<string>("guest");

  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  // Sync preferences on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("nextsem_html_lang") as "english" | "hinglish" | "hindi" | null;
      if (savedLang) setSelectedLang(savedLang);
      else setSelectedLang("english");

      const savedLevel = localStorage.getItem("nextsem_html_level") as "kid" | "pro" | null;
      if (savedLevel) setSelectedLevel(savedLevel);

      try {
        const savedBookmarks: number[] = JSON.parse(localStorage.getItem("nextsem_html_bookmarks") || "[]");
        setIsBookmarked(savedBookmarks.includes(lesson.id));
      } catch (e) {
        console.error(e);
      }

      setShowTutorTip(false); // Help guide hidden by default
      setMounted(true);
    }
  }, [lesson.id]);

  const toggleBookmark = () => {
    try {
      const savedBookmarks: number[] = JSON.parse(localStorage.getItem("nextsem_html_bookmarks") || "[]");
      let updated: number[];
      if (savedBookmarks.includes(lesson.id)) {
        updated = savedBookmarks.filter(id => id !== lesson.id);
        setIsBookmarked(false);
      } else {
        updated = [...savedBookmarks, lesson.id];
        setIsBookmarked(true);
      }
      localStorage.setItem("nextsem_html_bookmarks", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownloadPdf = async () => {
    const currentContentText = lesson[selectedLang][selectedLevel];

    if (Capacitor.isNativePlatform()) {
      const adSuccess = await showRewardedAd(() => {
        generateAndDownloadLessonPdf({
          title: lesson.title,
          courseName: "HTML Web Dev",
          content: currentContentText,
          unit: lesson.unit
        });
      });
      if (!adSuccess) {
        generateAndDownloadLessonPdf({
          title: lesson.title,
          courseName: "HTML Web Dev",
          content: currentContentText,
          unit: lesson.unit
        });
      }
    } else {
      generateAndDownloadLessonPdf({
        title: lesson.title,
        courseName: "HTML Web Dev",
        content: currentContentText,
        unit: lesson.unit
      });
    }
  };

  const handleLangChange = (lang: "english" | "hinglish" | "hindi") => {
    setSelectedLang(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("nextsem_html_lang", lang);
    }
  };

  const handleLevelChange = (level: "kid" | "pro") => {
    setSelectedLevel(level);
    if (typeof window !== "undefined") {
      localStorage.setItem("nextsem_html_level", level);
    }
  };

  const dismissTutorTip = () => {
    setShowTutorTip(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("nextsem_html_hide_tip", "true");
    }
  };

  // Sync user email from localStorage (if signed in), otherwise stays "guest"
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
      // Also listen for sign-in/sign-out events
      const handleAuth = () => {
        const u = localStorage.getItem("nextsem_user");
        if (u) {
          try { setUserEmail(JSON.parse(u)?.email || "guest"); } catch { setUserEmail("guest"); }
        } else {
          setUserEmail("guest");
        }
      };
      window.addEventListener("nextsem_auth_changed", handleAuth);
      return () => window.removeEventListener("nextsem_auth_changed", handleAuth);
    }
  }, []);

  // Check if current lesson is completed — works for both guest and signed-in users
  const isLessonCompletedKey = `nextsem_html_completed_${userEmail}_${lesson.id}`;
  const [isLessonDone, setIsLessonDone] = useState(false);

  // Compute current exercise based on selected language (with fallback to english)
  const rawExercise = lesson.exercise;
  const currentExercise = (() => {
    if (rawExercise && typeof rawExercise === "object" && "english" in rawExercise) {
      // New multilingual format
      const multiEx = rawExercise as {
        english: { question: string; options: string[]; correctAnswer: string; hint: string };
        hinglish?: { question: string; options: string[]; correctAnswer: string; hint: string };
        hindi?: { question: string; options: string[]; correctAnswer: string; hint: string };
      };
      return multiEx[selectedLang] ?? multiEx.english;
    }
    // Legacy single-language format — use as English for all languages
    return rawExercise as { question: string; options: string[]; correctAnswer: string; hint: string };
  })();

  // Reset MCQ when language changes (don't reset if already completed)
  useEffect(() => {
    if (!isLessonDone) {
      setSelectedOption(null);
      setIsCorrect(false);
      setShowFeedback(false);
      setShowHint(false);
    }
  }, [selectedLang, isLessonDone]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const done = localStorage.getItem(isLessonCompletedKey) === "true";
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
  }, [lesson, isLessonCompletedKey]);

  // Find adjacent lessons
  const currentIndex = htmlLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? htmlLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < htmlLessons.length - 1 ? htmlLessons[currentIndex + 1] : null;

  // Check if next lesson is unlocked
  const isNextUnlocked = isLessonDone || (typeof window !== "undefined" && localStorage.getItem(`nextsem_html_completed_${userEmail}_${lesson.id}`) === "true");

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

        // Sync to global progress if this is the end of a unit
        checkAndSyncUnitProgress(lesson.id);
      }
    }
  };

  const checkAndSyncUnitProgress = (lessonId: number) => {
    // If the finished lesson is the 10th lesson of a phase, mark the phase complete
    const unitCompletionMap: Record<number, string> = {
      10: "p1-1-intro-and-text",
      20: "p1-2-links-and-media",
      30: "p1-3-lists-and-tables",
      40: "p1-4-forms-and-inputs",
      50: "p1-5-semantics-and-seo",
      100: "p1-6-html5-tags"
    };

    const chapterToMark = unitCompletionMap[lessonId];
    if (chapterToMark) {
      markCompleted(chapterToMark);
      // Trigger user rating prompt
      window.dispatchEvent(new CustomEvent("trigger-rate-prompt"));
    }
  };

  // ── Inline backtick `code` tokeniser — wraps tokens in HtmlTagTooltip
  const renderInlineCode = (text: string): React.ReactNode[] => {
    const parts = text.split(/(`[^`]+`)/);
    return parts.map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        const token = part.slice(1, -1);
        return <HtmlTagTooltip key={i} code={token} lang={selectedLang} />;
      }
      // Also auto-detect bare HTML tags like <div>, <p> etc in plain text
      const tagRegex = /(<\/?[a-zA-Z][a-zA-Z0-9]*\s*\/?>)/g;
      const subParts = part.split(tagRegex);
      return subParts.map((sub, j) => {
        if (tagRegex.test(sub) || (sub.startsWith('<') && sub.endsWith('>'))) {
          return <HtmlTagTooltip key={`${i}-${j}`} code={sub.trim()} lang={selectedLang} />;
        }
        return <React.Fragment key={`${i}-${j}`}>{sub}</React.Fragment>;
      });
    });
  };

  // Basic Markdown-to-JSX parser with Nextsem Academy Typography font sizing
  const renderContentText = (text: string) => {
    if (!text) return null;
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={idx} className="h-3" />;

      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={idx} className="text-xl md:text-2xl font-extrabold text-white mt-8 mb-4 border-b border-slate-800/60 pb-2 tracking-tight">
            {trimmed.replace(/^##\s*/, "").replace(/^[#\s]+/, "").trim()}
          </h2>
        );
      }

      if (trimmed.startsWith("###")) {
        return (
          <h3 key={idx} className="text-lg md:text-xl font-bold text-[#c1a648] mt-6 mb-3 tracking-tight">
            {trimmed.replace(/^###\s*/, "").replace(/^[#\s]+/, "").trim()}
          </h3>
        );
      }

      if (trimmed.startsWith("* ")) {
        return (
          <li key={idx} className="ml-6 list-disc text-sm md:text-base text-slate-300 my-2 leading-relaxed">
            {trimmed.replace("* ", "").replace(/\*\*(.*?)\*\*/g, "$1").trim()}
          </li>
        );
      }

      if (trimmed.startsWith("1. ") || trimmed.startsWith("2. ") || trimmed.startsWith("3. ")) {
        return (
          <li key={idx} className="ml-6 list-decimal text-sm md:text-base text-slate-300 my-2 leading-relaxed">
            {trimmed.replace(/^\d+\.\s*/, "").replace(/\*\*(.*?)\*\*/g, "$1").trim()}
          </li>
        );
      }

      // Detect raw code snippets blocks and render Nextsem Academy Example Card (Matching Image 85)
      if (
        trimmed.startsWith("Host:") ||
        trimmed.startsWith("GET ") ||
        trimmed.startsWith("HTTP/1.1 ") ||
        trimmed.startsWith("<!DOCTYPE html>") ||
        trimmed.startsWith("```")
      ) {
        const cleanCode = trimmed.replace(/^```[a-z]*\n?/, "").replace(/\n?```$/, "");
        return (
          <div key={idx} className="my-6 p-5 md:p-6 bg-[#1d2a35] border border-slate-700/60 rounded-xl space-y-4 shadow-xl text-left">
            <h3 className="text-xl font-extrabold text-white tracking-tight">Example</h3>
            <div className="bg-[#15202b] p-4 md:p-5 rounded-lg border-l-4 border-[#04AA6D] font-mono text-sm overflow-x-auto leading-relaxed shadow-inner">
              {cleanCode.split('\n').map((codeLine, cIdx) => {
                // Split into tags and inner text content
                const tagRegex = /(<\/?[a-zA-Z0-9!\s="-]+>)/g;
                const tokens = codeLine.split(tagRegex);
                return (
                  <div key={cIdx}>
                    {tokens.map((tok, tIdx) => {
                      if (tok.startsWith('<') && tok.endsWith('>')) {
                        return <span key={tIdx} className="text-[#f25f5c] font-semibold">{tok}</span>;
                      }
                      return <span key={tIdx} className="text-white font-medium">{tok}</span>;
                    })}
                  </div>
                );
              })}
            </div>
            <Link
              href={`/htmldemo?code=${encodeURIComponent(cleanCode)}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#04AA6D] hover:bg-[#039861] text-white font-extrabold text-sm rounded-md transition-all shadow-md cursor-pointer"
            >
              <span>Try it Yourself »</span>
            </Link>
          </div>
        );
      }

      // Normal paragraph — inline code + bold + auto tag tooltip
      const boldRegex = /\*\*(.*?)\*\*/g;
      if (boldRegex.test(trimmed) || trimmed.includes('`') || trimmed.includes('<')) {
        const parts = trimmed.split(boldRegex);
        return (
          <p key={idx} className="text-sm md:text-base text-slate-300 leading-relaxed my-3 font-normal">
            {parts.map((part, pIdx) =>
              pIdx % 2 === 1
                ? <strong key={pIdx} className="text-white font-bold">{part}</strong>
                : <React.Fragment key={pIdx}>{renderInlineCode(part)}</React.Fragment>
            )}
          </p>
        );
      }

      return (
        <p key={idx} className="text-sm md:text-base text-slate-300 leading-relaxed my-3 font-normal">
          {renderInlineCode(trimmed)}
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

      {/* Nextsem Academy Exact Header (Image 69 Pattern) */}
      <div className="space-y-4 pb-4 border-b border-slate-800/60 pt-2">
        {/* Title Row with Bookmark Icon */}
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {
              lesson.id === 1 ? "HTML Introduction" :
              `HTML ${
                lesson.title
                  .replace(/^(Lesson\s+\d+:|Learn HTML5?|Introduction to|What is|How)\s*/i, '')
                  .replace(/\s*-\s*Free Web Development.*$/i, '')
                  .replace(/\s*-\s*Comprehensive Guide.*$/i, '')
                  .trim()
              }`
            }
          </h1>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              className="p-2 rounded-lg border border-amber-500/40 bg-amber-950/30 text-amber-400 hover:text-amber-300 transition-all cursor-pointer shrink-0 flex items-center gap-1.5 shadow-md"
              title="Download Lesson PDF (Rewarded Ad)"
            >
              <Download size={20} className="stroke-[2.5]" />
              <span className="hidden sm:inline text-xs font-bold">PDF</span>
            </button>

            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-lg border transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                isBookmarked
                  ? "bg-emerald-950/40 border-emerald-500/40 text-[#04AA6D]"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
              }`}
              title={isBookmarked ? "Remove Bookmark" : "Save Bookmark"}
            >
              <Bookmark size={22} className={`stroke-[2.5] ${isBookmarked ? "fill-[#04AA6D] text-[#04AA6D]" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-slate-900/40 border border-slate-850 p-5 md:p-8 rounded-2xl shadow-xl backdrop-blur-xl relative overflow-hidden">
        {/* Dynamic Mode Watermark */}
        <div className="absolute top-2 right-4 text-[9px] font-black uppercase tracking-widest text-slate-700 pointer-events-none select-none">
          {selectedLang} • {selectedLevel}
        </div>

        {/* Graphic Concept Visualizers (Batches 1-10 custom assets placeholder) */}
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
        <TopicAnimationWidget lessonId={lesson.id} lessonTitle={lesson.title} type="html" lang={selectedLang} />

        {/* Task-Based Coding Lab Section */}
        <TaskBasedCodingLab
          labId={`html-lab-${lesson.id}`}
          labTitle={`Task-Based Coding Lab: Practice ${lesson.title}`}
          language="html"
          initialCode={`<!-- Practice Task Code -->\n<div class="card">\n  <h1>HTML Coding Lab</h1>\n  <p>Practice writing clean semantic HTML code step-by-step.</p>\n</div>`}
          tasks={[
            {
              id: "task-1",
              title: "Create a container <div> element",
              instruction: "Wrap your content inside a <div> tag with a class attribute.",
              hint: "Use <div class=\"card\">...</div>",
              validatorKeywords: ["<div", "</div>"]
            },
            {
              id: "task-2",
              title: "Add a main heading <h1>",
              instruction: "Include a main header <h1> element inside your container.",
              hint: "Use <h1>My Title</h1> syntax.",
              validatorKeywords: ["<h1>", "</h1>"]
            },
            {
              id: "task-3",
              title: "Add a descriptive paragraph <p>",
              instruction: "Add a paragraph <p> explaining your project details.",
              hint: "Use <p>Description goes here...</p>",
              validatorKeywords: ["<p>", "</p>"]
            }
          ]}
        />
      </div>

      {/* Nextsem Academy HTML Quiz Reminder Card (Replaces inline question block - Image 86) */}
      <div className="my-8 p-5 md:p-6 bg-[#1d2a35] border border-slate-700/60 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl text-left">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#04AA6D]/20 text-[#04AA6D] flex items-center justify-center font-black text-xl shrink-0 border border-[#04AA6D]/30 shadow-inner">
            📝
          </div>
          <div>
            <h4 className="text-base font-extrabold text-white">Test Your HTML Knowledge!</h4>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              Take the comprehensive HTML Quiz to test your understanding of HTML elements, tags, and page structure.
            </p>
          </div>
        </div>
        <Link
          href="/html/quiz"
          className="px-5 py-2.5 bg-[#04AA6D] hover:bg-[#039861] text-white font-extrabold text-xs rounded-xl shadow-md transition-all whitespace-nowrap cursor-pointer shrink-0 flex items-center gap-1.5"
        >
          <span>Start HTML Quiz »</span>
        </Link>
      </div>

      {/* Bottom Nextsem Academy Style Navigation Row — visible on desktop; mobile uses bottom 5-tab bar */}
      <div className="hidden md:flex items-center justify-between gap-4 border-t border-slate-800/60 pt-6 mt-8">
        {prevLesson ? (
          <Link
            href={prevLesson.id === 1 ? "/html" : `/html/${prevLesson.slug}`}
            className="px-5 py-2.5 bg-[#04AA6D] hover:bg-[#039861] text-white rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-[#04AA6D]/20 cursor-pointer"
          >
            <ChevronLeft size={16} className="stroke-[3]" />
            <span>Previous</span>
          </Link>
        ) : (
          <div className="px-5 py-2.5 bg-slate-900/50 text-slate-600 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border border-slate-850 cursor-not-allowed">
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
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
          >
            <span>Sign in to track progress</span>
          </button>
        ) : (
          <span className="hidden sm:inline text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
            ✓ Progress Auto-Saved
          </span>
        )}

        {nextLesson ? (
          <Link
            href={`/html/${nextLesson.slug}`}
            className="px-5 py-2.5 bg-[#04AA6D] hover:bg-[#039861] text-white rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-[#04AA6D]/20 cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight size={16} className="stroke-[3]" />
          </Link>
        ) : null}
      </div>

      {/* Bottom Ad Banner */}
      <AdSenseBanner />
    </div>
  );
}
