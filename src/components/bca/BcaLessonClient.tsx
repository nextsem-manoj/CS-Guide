"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, ChevronRight, ChevronLeft, Home, BookOpen, Sparkles, Check, HelpCircle, AlertCircle, 
  Award, Download, Languages, Cpu, Zap, Calculator, Bookmark, CheckCircle2,
  Share2, Copy, Monitor, Layers, Terminal
} from "lucide-react";
import { BcaMultilingualLesson, bcaLessons } from "@/data/bcaLessonsData";
import AdSenseBanner from "@/components/AdSenseBanner";
import BcaHeaderNav from "@/components/bca/BcaHeaderNav";
import TaskBasedCodingLab from "@/components/TaskBasedCodingLab";
import { triggerCelebration } from "@/lib/celebration";
import { generateAndDownloadLessonPdf } from "@/lib/pdfHelper";
import { Capacitor } from "@capacitor/core";
import { showRewardedAd } from "@/lib/admobHelper";
import { PdfReaderPromptModal } from "@/components/PdfReaderPromptModal";


interface BcaLessonClientProps {
  lesson: BcaMultilingualLesson;
}

export default function BcaLessonClient({ lesson }: BcaLessonClientProps) {
  const [selectedLang, setSelectedLang] = useState<"english" | "hinglish">("english");
  const [selectedComplexity, setSelectedComplexity] = useState<"easy" | "normal">("easy");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Exercise States
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Fill-in-the-blank state
  const [userBlankInput, setUserBlankInput] = useState("");
  const [showBlankHint, setShowBlankHint] = useState(false);
  const [blankSubmitted, setBlankSubmitted] = useState(false);

  // Interactive Bitwise Converter State
  const [inputVal, setInputVal] = useState<number>(42);

  // PDF Download State
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const activeVariant = lesson.content[selectedLang][selectedComplexity];
  const activeExercise = lesson.exercise[selectedLang];

  // ✅ Prev/Next: filter same subject → sort ascending by unitNumber → find adjacent
  const subjectLessons = bcaLessons
    .filter(l => l.subjectSlug === lesson.subjectSlug)
    .slice()
    .sort((a, b) => a.unitNumber - b.unitNumber);
  const currentIdx = subjectLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIdx > 0 ? subjectLessons[currentIdx - 1] : null;
  const nextLesson = currentIdx !== -1 && currentIdx < subjectLessons.length - 1 ? subjectLessons[currentIdx + 1] : null;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("nextsem_bca_lang") as "english" | "hinglish" | null;
      if (savedLang) setSelectedLang(savedLang);

      const savedComp = localStorage.getItem("nextsem_bca_comp") as "easy" | "normal" | null;
      if (savedComp) setSelectedComplexity(savedComp);
    }
  }, []);

  const handleLangChange = (lang: "english" | "hinglish") => {
    setSelectedLang(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("nextsem_bca_lang", lang);
    }
  };

  const handleComplexityChange = (comp: "easy" | "normal") => {
    setSelectedComplexity(comp);
    if (typeof window !== "undefined") {
      localStorage.setItem("nextsem_bca_comp", comp);
    }
  };

  const handleOptionSelect = (optIdx: number, e?: React.MouseEvent) => {
    setSelectedOption(optIdx);
    setShowExplanation(true);
    if (optIdx === activeExercise.mcq.correctAnswer) {
      triggerCelebration(e);
    }
  };

  const handleCopySnippet = (snippet: string, idx: number) => {
    navigator.clipboard.writeText(snippet);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const pdfTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const [showReaderPrompt, setShowReaderPrompt] = useState(false);
  const [pdfDownloadUrl, setPdfDownloadUrl] = useState("");

  const triggerPdfGenerationAndNotification = () => {
    const contentText = activeVariant.sections
      .map(s => `## ${s.heading}\n${s.content}\n${s.codeSnippet ? `\n\`\`\`\n${s.codeSnippet}\n\`\`\`\n` : ''}`)
      .join('\n\n');

    const canonical = `https://nextsem.online/bca/semester-1/${lesson.subjectSlug}/${lesson.slug}`;
    setPdfDownloadUrl(canonical);

    generateAndDownloadLessonPdf({
      title: activeVariant.title,
      courseName: `IGNOU BCA 1st Sem (${lesson.subjectCode})`,
      content: contentText,
      unit: `Unit ${lesson.unitNumber}`,
      author: "Nextsem",
      canonicalUrl: canonical
    });

    // Send Mobile Push Notification
    if ("Notification" in window && Notification.permission === "granted") {
      try {
        new Notification("📄 Lesson PDF Downloaded!", {
          body: `${activeVariant.title} has been downloaded. Tap to open with native reader.`,
          icon: "/favicon.ico"
        });
      } catch (e) {}
    }

    setIsDownloadingPdf(false);
    setShowReaderPrompt(true);
  };

  const handleDownloadPdf = () => {
    setIsDownloadingPdf(true);

    if (Capacitor.isNativePlatform()) {
      showRewardedAd(
        () => {
          // Rewarded video completed!
          triggerPdfGenerationAndNotification();
        },
        () => {
          setIsDownloadingPdf(false);
        }
      ).then((triggered) => {
        if (!triggered) {
          // If native ad failed to load, proceed directly
          triggerPdfGenerationAndNotification();
        }
      });
    } else {
      // On web browser: 1.5s simulated video reward timer
      if (pdfTimeoutRef.current) clearTimeout(pdfTimeoutRef.current);
      pdfTimeoutRef.current = setTimeout(() => {
        triggerPdfGenerationAndNotification();
      }, 1500);
    }
  };

  const handleCancelPdfDownload = () => {
    if (pdfTimeoutRef.current) {
      clearTimeout(pdfTimeoutRef.current);
      pdfTimeoutRef.current = null;
    }
    setIsDownloadingPdf(false);
  };

  // Inline Markdown Parser: parses **bold**, `code`, and *italic*
  const renderFormattedText = (text: string): React.ReactNode => {
    if (!text) return null;

    // First split lines
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={lineIdx} className="h-2" />;

      // Bullet points
      if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        const itemContent = trimmed.replace(/^[*\-]\s*/, "");
        return (
          <div key={lineIdx} className="flex items-start gap-2.5 my-1.5 pl-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0 shadow-sm shadow-cyan-400/50" />
            <div className="text-slate-300 leading-relaxed">{parseInlineStyles(itemContent)}</div>
          </div>
        );
      }

      // Numbered items (1. 2.)
      if (/^\d+\.\s/.test(trimmed)) {
        const itemContent = trimmed.replace(/^\d+\.\s*/, "");
        const num = trimmed.match(/^\d+/)?.[0];
        return (
          <div key={lineIdx} className="flex items-start gap-3 my-2 pl-1">
            <span className="px-2 py-0.5 text-[11px] font-extrabold rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shrink-0">
              {num}
            </span>
            <div className="text-slate-300 leading-relaxed">{parseInlineStyles(itemContent)}</div>
          </div>
        );
      }

      return (
        <p key={lineIdx} className="my-2 leading-relaxed text-slate-300">
          {parseInlineStyles(line)}
        </p>
      );
    });
  };

  // Helper to parse **bold** and `code` inside inline strings
  const parseInlineStyles = (str: string): React.ReactNode[] => {
    const parts = str.split(/(\*\*[^*]+\*\*|`[^`]+`)/);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="text-cyan-300 font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={i} className="px-2 py-0.5 rounded-md bg-[#030712] border border-slate-700/80 text-emerald-400 font-mono text-xs shadow-inner font-semibold">
            {part.slice(1, -1)}
          </code>
        );
      }
      return <React.Fragment key={i}>{part}</React.Fragment>;
    });
  };

  return (
    <div className="min-h-screen bg-[#060c18] text-slate-100 font-sans pb-32 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* ── Top Header Bar with Subject Switcher Dropdown (Matching image-20.png) ── */}
      <BcaHeaderNav
        currentSubjectCode={lesson.subjectCode}
        currentSubjectName={lesson.title.split(':')[0] || lesson.title}
      />

      {/* Language & Complexity Bar */}
      <div className="bg-[#0c1328]/80 border-b border-slate-800/80 px-4 py-2.5 shadow-md">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/bca/semester-1"
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-slate-900/60 hover:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-800"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">IGNOU BCA 1st Sem</span>
            <span className="sm:hidden">Back</span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Language Pill Selector */}
            <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => handleLangChange("english")}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  selectedLang === "english"
                    ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                English
              </button>
              <button
                onClick={() => handleLangChange("hinglish")}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  selectedLang === "hinglish"
                    ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Hinglish
              </button>
            </div>

            {/* Complexity Pill Selector */}
            <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => handleComplexityChange("easy")}
                className={`px-3 py-1 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                  selectedComplexity === "easy"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                <span>Easy</span>
              </button>
              <button
                onClick={() => handleComplexityChange("normal")}
                className={`px-3 py-1 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                  selectedComplexity === "normal"
                    ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-300" />
                <span>Normal</span>
              </button>
            </div>

            {/* Bookmark Toggle */}
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-xl border transition-all ${
                isBookmarked
                  ? "bg-amber-500/20 border-amber-500/50 text-amber-400"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 pt-8 space-y-8">
        {/* Course Banner Hero Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-[#0c162d] to-[#0a1122] border border-slate-800/90 p-6 sm:p-8 shadow-2xl shadow-cyan-950/20">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-semibold tracking-wide uppercase">
                <Cpu className="w-3.5 h-3.5" />
                {lesson.subjectCode} • Block {lesson.blockNumber} Unit {lesson.unitNumber}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold tracking-wide">
                ✍️ Author: Nextsem
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {activeVariant.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {activeVariant.summary}
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Mode: <strong className="text-cyan-300">{selectedLang.toUpperCase()}</strong> ({selectedComplexity.toUpperCase()} Level)</span>
              </div>

              <button
                onClick={handleDownloadPdf}
                disabled={isDownloadingPdf}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-xl transition-all shadow-lg shadow-cyan-600/20 active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>{isDownloadingPdf ? "Generating PDF..." : "Download Lesson PDF"}</span>
              </button>
            </div>
          </div>
        </div>

        <AdSenseBanner />

        {/* Section Cards */}
        <div className="space-y-6">
          {activeVariant.sections.map((section, idx) => (
            <article
              key={idx}
              className="group rounded-3xl bg-[#0c1328]/80 border border-slate-800/80 p-6 sm:p-8 space-y-4 hover:border-slate-700/80 transition-all shadow-lg shadow-black/40"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3 tracking-tight border-b border-slate-800/60 pb-3">
                <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Layers className="w-5 h-5" />
                </span>
                <span>{section.heading}</span>
              </h2>

              <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-3 font-normal">
                {renderFormattedText(section.content)}
              </div>

              {/* Code Snippet Box */}
              {section.codeSnippet && (
                <div className="relative mt-4 rounded-2xl bg-[#030712] border border-slate-800 p-4 font-mono text-xs text-emerald-400 overflow-x-auto shadow-inner">
                  <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-slate-800/60 text-[11px] font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" /> C++ Architecture Code Sample
                    </span>
                    <button
                      onClick={() => handleCopySnippet(section.codeSnippet!, idx)}
                      className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedIndex === idx ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>
                  <pre className="pt-3 leading-relaxed">{section.codeSnippet}</pre>
                </div>
              )}

              {/* Key Takeaways Card */}
              {section.keyTakeaways && section.keyTakeaways.length > 0 && (
                <div className="mt-5 p-5 rounded-2xl bg-gradient-to-r from-emerald-950/30 to-slate-900/50 border border-emerald-500/30 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Developer Key Takeaways</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {section.keyTakeaways.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{parseInlineStyles(item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Interactive Bitwise & Number System Tool */}
        <section className="rounded-3xl bg-gradient-to-br from-indigo-950/40 via-[#0a1226] to-[#060c18] border border-indigo-500/40 p-6 sm:p-8 space-y-5 shadow-xl shadow-indigo-950/20">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Calculator className="w-6 h-6" />
            </span>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Interactive Computer Architecture Tool: Base Converter
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Type any integer below to see how the CPU represents it across Binary, Octal, and Hexadecimal registers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Decimal (Base 10)</label>
              <input
                type="number"
                value={inputVal}
                onChange={(e) => setInputVal(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 text-sm font-semibold rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="space-y-1.5 p-4 rounded-xl bg-[#030712] border border-slate-800">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Binary (Base 2)</div>
              <div className="font-mono text-base font-extrabold text-emerald-400 break-all">{inputVal.toString(2)}</div>
            </div>
            <div className="space-y-1.5 p-4 rounded-xl bg-[#030712] border border-slate-800">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Octal (Base 8)</div>
              <div className="font-mono text-base font-extrabold text-cyan-400 break-all">{inputVal.toString(8)}</div>
            </div>
            <div className="space-y-1.5 p-4 rounded-xl bg-[#030712] border border-slate-800">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Hexadecimal (Base 16)</div>
              <div className="font-mono text-base font-extrabold text-amber-400 break-all">0x{inputVal.toString(16).toUpperCase()}</div>
            </div>
          </div>
        </section>

        {/* Task-Based Coding Lab Section */}
        <TaskBasedCodingLab
          labId={`bca-task-lab-${lesson.id}`}
          labTitle={`Task-Based Coding Lab: ${lesson.title}`}
          language={lesson.subjectSlug.includes("bcs-011") || lesson.subjectSlug.includes("bcs-111") ? "c" : "javascript"}
          initialCode={`// Task-Based Coding Challenge: ${lesson.title}\n#include <stdio.h>\n\nint main() {\n    // Task 1: Print Welcome Message\n    printf("Nextsem IGNOU BCA Task Lab\\n");\n    \n    // Task 2: Declare variables and calculate output\n    int num1 = 10, num2 = 20;\n    int sum = num1 + num2;\n    printf("Sum = %d\\n", sum);\n    \n    return 0;\n}`}
          tasks={[
            {
              id: "bca-task-1",
              title: "Include stdio.h header file",
              instruction: "Ensure your program imports standard I/O library for printing output.",
              hint: "Write #include <stdio.h> at the top of your code.",
              validatorKeywords: ["#include", "<stdio.h>"]
            },
            {
              id: "bca-task-2",
              title: "Define main() entry function",
              instruction: "Implement the main function with integer return type.",
              hint: "Write int main() { ... return 0; }",
              validatorKeywords: ["int main", "return 0;"]
            },
            {
              id: "bca-task-3",
              title: "Print calculated output via printf()",
              instruction: "Use printf() function to print the calculated sum output.",
              hint: "Use printf(\"Sum = %d\\n\", sum);",
              validatorKeywords: ["printf("]
            }
          ]}
        />

        {/* Multilingual Interactive Mastery Quiz */}
        <section className="rounded-3xl bg-[#0c1328]/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
            <span className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Award className="w-6 h-6" />
            </span>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Unit Mastery Quiz
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Test your understanding in <strong>{selectedLang.toUpperCase()}</strong>.
              </p>
            </div>
          </div>

          {/* Multiple Choice Question */}
          <div className="space-y-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-sm sm:text-base font-semibold text-white">
              Q1. {activeExercise.mcq.question}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeExercise.mcq.options.map((option, optIdx) => {
                const isSelected = selectedOption === optIdx;
                const isCorrect = optIdx === activeExercise.mcq.correctAnswer;
                
                let btnStyle = "bg-[#060c18] border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white";
                if (showExplanation) {
                  if (isCorrect) btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold shadow-lg shadow-emerald-950/40";
                  else if (isSelected) btnStyle = "bg-red-950/80 border-red-500 text-red-200";
                }

                return (
                  <button
                    key={optIdx}
                    onClick={(e) => handleOptionSelect(optIdx, e)}
                    className={`p-4 rounded-xl border text-left text-xs sm:text-sm transition-all ${btnStyle}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs sm:text-sm text-slate-200 space-y-1.5 animate-in fade-in duration-300">
                <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Answer Explanation</span>
                </div>
                <p className="text-slate-300">{activeExercise.mcq.explanation}</p>
              </div>
            )}
          </div>

          {/* Fill-in-the-blank Question with Interactive Answer Option Pills */}
          <div className="space-y-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-sm sm:text-base font-semibold text-white">
              Q2. Fill in the blank: {activeExercise.blank.question}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={userBlankInput}
                onChange={(e) => setUserBlankInput(e.target.value)}
                placeholder="Type or click a pill option below..."
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-[#060c18] border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                onClick={() => setBlankSubmitted(true)}
                className="px-5 py-2.5 text-xs sm:text-sm font-bold bg-cyan-600 text-white rounded-xl hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-600/20"
              >
                Submit
              </button>
            </div>

            {/* Interactive Pill-Form Options Below Input */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Select Option Pill:
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  activeExercise.blank.answer,
                  "Stack Pointer",
                  "Accumulator",
                  "Instruction Register"
                ].map((pillText, pillIdx) => (
                  <button
                    key={pillIdx}
                    onClick={(e) => {
                      setUserBlankInput(pillText);
                      setBlankSubmitted(true);
                      if (pillText.toLowerCase() === activeExercise.blank.answer.toLowerCase()) {
                        triggerCelebration(e);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                      userBlankInput === pillText
                        ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20"
                        : "bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    {pillText}
                  </button>
                ))}
              </div>
            </div>

            {blankSubmitted && (
              <div className="text-xs sm:text-sm pt-2">
                {userBlankInput.trim().toLowerCase() === activeExercise.blank.answer.toLowerCase() ? (
                  <p className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Excellent! The correct answer is "{activeExercise.blank.answer}".
                  </p>
                ) : (
                  <p className="text-red-400 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" /> Not quite. Correct answer: "{activeExercise.blank.answer}".
                  </p>
                )}
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => setShowBlankHint(!showBlankHint)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>{showBlankHint ? "Hide Hint" : "Show Hint"}</span>
              </button>
            </div>

            {showBlankHint && (
              <p className="text-xs text-amber-300 italic bg-amber-950/40 p-3 rounded-xl border border-amber-500/30">
                Hint: {activeExercise.blank.hint}
              </p>
            )}
          </div>
        </section>

        {/* Reference Links & External Deep-Dives */}
        <section className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Official IGNOU & Developer Reference Links</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <a
              href="https://egyankosh.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-all flex items-center justify-between group"
            >
              <span>eGyanKosh Official IGNOU Portal</span>
              <Share2 className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
            </a>
            <Link
              href="/bca/semester-1"
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-all flex items-center justify-between group"
            >
              <span>IGNOU BCA 1st Semester Hub</span>
              <BookOpen className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            </Link>
          </div>
        </section>

        {/* Bottom Navigation Buttons: Home • Prev • Subject • Next */}
        <nav className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {/* 1. Home */}
          <Link
            href="/"
            className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md group cursor-pointer"
          >
            <Home className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform shrink-0" />
            <span>Home</span>
          </Link>

          {/* 2. Previous Lesson */}
          {prevLesson ? (
            <Link
              href={`/bca/semester-1/${prevLesson.subjectSlug}/${prevLesson.slug}`}
              className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1 transition-all shadow-md group cursor-pointer truncate"
              title={`Previous: Unit ${prevLesson.unitNumber}`}
            >
              <ChevronLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-0.5 transition-transform shrink-0" />
              <span className="truncate">Prev (Unit {prevLesson.unitNumber})</span>
            </Link>
          ) : (
            <button
              disabled
              className="p-3 rounded-2xl bg-slate-950/40 border border-slate-900 text-slate-600 font-bold text-xs flex items-center justify-center gap-1 cursor-not-allowed opacity-50"
            >
              <ChevronLeft className="w-4 h-4 shrink-0" />
              <span>Prev</span>
            </button>
          )}

          {/* 3. Subject Hub */}
          <Link
            href={`/bca/semester-1/${lesson.subjectSlug}`}
            className="p-3 rounded-2xl bg-slate-900/90 border border-amber-500/30 hover:border-amber-500/60 text-amber-300 hover:text-amber-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md group cursor-pointer truncate"
          >
            <BookOpen className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
            <span className="truncate">Subject</span>
          </Link>

          {/* 4. Next Lesson */}
          {nextLesson ? (
            <Link
              href={`/bca/semester-1/${nextLesson.subjectSlug}/${nextLesson.slug}`}
              className="p-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-extrabold text-xs flex items-center justify-center gap-1 transition-all shadow-lg shadow-cyan-600/20 active:scale-95 group cursor-pointer truncate"
              title={`Next: Unit ${nextLesson.unitNumber}`}
            >
              <span className="truncate">Next (Unit {nextLesson.unitNumber})</span>
              <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform shrink-0" />
            </Link>
          ) : (
            <Link
              href={`/bca/semester-1/${lesson.subjectSlug}`}
              className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-1 transition-all shadow-lg truncate"
            >
              <span className="truncate">Done 🎉</span>
              <ChevronRight className="w-4 h-4 text-white shrink-0" />
            </Link>
          )}
        </nav>

        {/* PDF Preparation & Cancel Modal */}
        {isDownloadingPdf && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-[#0c1328] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-5 shadow-2xl shadow-cyan-950/50">
              <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-t-cyan-400 border-cyan-950 animate-spin" />
                <Download className="w-6 h-6 text-cyan-400" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Preparing Lesson PDF...
                </h3>
                <p className="text-xs text-slate-300">
                  Compiling <strong>Nextsem's</strong> official notes for {lesson.subjectCode} Unit {lesson.unitNumber}.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleCancelPdfDownload}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-bold text-xs transition-all shadow-md active:scale-95"
                >
                  Cancel / Return to Lesson
                </button>
              </div>
            </div>
          </div>
        )}
        {/* PDF Reader Prompt Modal */}
        <PdfReaderPromptModal
          isOpen={showReaderPrompt}
          onClose={() => setShowReaderPrompt(false)}
          pdfUrl={pdfDownloadUrl || `https://nextsem.online/bca/semester-1/${lesson.subjectSlug}/${lesson.slug}`}
        />
      </main>
    </div>
  );
}
