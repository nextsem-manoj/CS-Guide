"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowLeft, X, Sparkles, Bookmark } from "lucide-react";
import { mswordLessons, MsWordLesson } from "../data/mswordLessonsData";
import AdSenseBanner from "./AdSenseBanner";

interface Props {
  lesson: MsWordLesson;
}

type Lang = "english" | "hinglish" | "hindi";
type Level = "kid" | "pro";

export default function MsWordLessonClient({ lesson }: Props) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Lang>("hinglish");
  const [selectedLevel, setSelectedLevel] = useState<Level>("kid");
  const [isCompleted, setIsCompleted] = useState(false);
  const [userEmail, setUserEmail] = useState("guest");

  // MCQ state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Previous/Next lessons
  const currentIndex = mswordLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? mswordLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < mswordLessons.length - 1 ? mswordLessons[currentIndex + 1] : null;

  useEffect(() => {
    setMounted(true);
    const raw = localStorage.getItem("nextsem_user");
    let email = "guest";
    try { if (raw) email = JSON.parse(raw)?.email ?? "guest"; } catch {}
    setUserEmail(email);

    const savedLang = localStorage.getItem("nextsem_lesson_lang") as Lang | null;
    const savedLevel = localStorage.getItem("nextsem_lesson_level") as Level | null;
    if (savedLang) setSelectedLang(savedLang);
    if (savedLevel) setSelectedLevel(savedLevel);

    const done = localStorage.getItem(`nextsem_msword_completed_${email}_${lesson.id}`) === "true";
    setIsCompleted(done);
  }, [lesson.id]);

  const handleLangChange = (lang: Lang) => {
    setSelectedLang(lang);
    localStorage.setItem("nextsem_lesson_lang", lang);
  };

  const handleLevelChange = (level: Level) => {
    setSelectedLevel(level);
    localStorage.setItem("nextsem_lesson_level", level);
  };

  const getExercise = () => {
    const ex = lesson.exercise as unknown as Record<string, { question: string; options: string[]; correctAnswer: string; hint: string }>;
    if (ex[selectedLang] !== undefined) {
      return ex[selectedLang];
    }
    return lesson.exercise as { question: string; options: string[]; correctAnswer: string; hint: string };
  };

  const exercise = getExercise();
  const isCorrect = selectedOption === exercise.correctAnswer;

  const handleSubmit = () => {
    if (!selectedOption) return;
    setShowResult(true);
    if (isCorrect && !isCompleted) {
      const done = `nextsem_msword_completed_${userEmail}_${lesson.id}`;
      localStorage.setItem(done, "true");
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setShowResult(false);
    setShowHint(false);
  };

  // Render lesson content
  const renderContent = (text: string) => {
    if (!text) return null;
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={idx} className="h-2" />;

      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={idx} className="text-base md:text-lg font-black text-slate-100 mt-6 mb-3 flex items-center gap-2 border-b border-slate-800/40 pb-1">
            <span className="text-blue-400">#</span>
            {trimmed.replace("### ", "").trim()}
          </h3>
        );
      }

      if (trimmed.startsWith("* ")) {
        return (
          <li key={idx} className="ml-5 list-disc text-xs md:text-sm text-slate-300 my-1.5 leading-relaxed">
            {trimmed.replace("* ", "").replace(/\*\*(.*?)\*\*/g, "$1")}
          </li>
        );
      }

      if (trimmed.startsWith("1. ") || trimmed.startsWith("2. ") || trimmed.startsWith("3. ") || trimmed.startsWith("4. ")) {
        return (
          <li key={idx} className="ml-5 list-decimal text-xs md:text-sm text-slate-300 my-1.5 leading-relaxed">
            {trimmed.replace(/^\d+\.\s*/, "").replace(/\*\*(.*?)\*\*/g, "$1")}
          </li>
        );
      }

      // Table rows
      if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
        const cells = trimmed.split("|").filter(c => c.trim()).map(c => c.trim());
        if (cells.every(c => c.replace(/-/g, "").trim() === "")) return null; // separator row
        return (
          <tr key={idx} className="border-b border-slate-800/50">
            {cells.map((cell, ci) => (
              <td key={ci} className="px-3 py-2 text-xs text-slate-300 font-medium">
                {cell.replace(/\*\*(.*?)\*\*/g, "$1")}
              </td>
            ))}
          </tr>
        );
      }

      // 🤖 AI Tip
      if (trimmed.startsWith("🤖")) {
        return (
          <div key={idx} className="my-3 p-3 bg-violet-950/30 border border-violet-700/30 rounded-xl flex gap-2.5">
            <span className="text-lg shrink-0">🤖</span>
            <p className="text-xs text-violet-200 leading-relaxed font-medium">
              {trimmed.slice(2).replace(/\*\*(.*?)\*\*/g, "$1").trim()}
            </p>
          </div>
        );
      }

      // Bold inline
      const boldRegex = /\*\*(.*?)\*\*/g;
      if (boldRegex.test(trimmed)) {
        const parts = trimmed.split(boldRegex);
        return (
          <p key={idx} className="text-xs md:text-sm text-slate-300 leading-relaxed my-2 font-medium">
            {parts.map((part, pi) =>
              pi % 2 === 1
                ? <strong key={pi} className="text-blue-300 font-black">{part}</strong>
                : <React.Fragment key={pi}>{part}</React.Fragment>
            )}
          </p>
        );
      }

      // Italic *story*
      if (trimmed.startsWith("*") && trimmed.endsWith("*")) {
        return (
          <p key={idx} className="text-xs md:text-sm text-slate-400 italic leading-relaxed my-2">
            {trimmed.slice(1, -1)}
          </p>
        );
      }

      return (
        <p key={idx} className="text-xs md:text-sm text-slate-300 leading-relaxed my-2 font-medium">
          {trimmed}
        </p>
      );
    });
  };

  const currentContent = lesson[selectedLang][selectedLevel];

  if (!mounted) {
    return (
      <div className="space-y-6 animate-pulse text-left py-10 max-w-3xl mx-auto px-4">
        <div className="h-6 bg-slate-900 rounded-lg w-1/4" />
        <div className="h-10 bg-slate-900 rounded-xl w-3/4" />
        <div className="h-48 bg-slate-900 rounded-2xl w-full" />
      </div>
    );
  }

  // Check if any rows exist in content (for table wrapping)
  const hasTable = currentContent.includes("|---|");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": `${lesson.title} - MS Word 365 Lesson`,
    "description": `Learn ${lesson.title} in Microsoft Word 365 for career skills.`,
    "articleSection": lesson.unit,
    "inLanguage": ["en", "hi"],
    "learningResourceType": "Lesson",
    "url": `https://nextsem.online/msword/${lesson.slug}`,
    "publisher": {
      "@type": "Organization",
      "name": "Nextsem Academy",
      "url": "https://nextsem.online"
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* JSON-LD for SEO Crawlers */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header bar */}
      <div className="sticky top-0 z-40 h-14 bg-slate-950/90 backdrop-blur border-b border-blue-900/40 flex items-center justify-between px-4">
        <Link href="/msword" className="flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-white transition-colors">
          <ArrowLeft size={14} />
          MS Word 365
        </Link>
        <span className="text-xs font-black text-slate-300 hidden sm:block">
          Lesson {lesson.id} of {mswordLessons.length}
        </span>
        {isCompleted && (
          <span className="flex items-center gap-1 text-xs font-black text-emerald-400">
            <CheckCircle2 size={13} /> Done
          </span>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <AdSenseBanner />

        {/* Nextsem Academy Exact Header (Image 69 & 92 Pattern) */}
        <div className="space-y-4 pb-4 border-b border-slate-800/60 pt-2">
          {/* Title Row with Bookmark Icon */}
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              MS Word {lesson.title.replace(/^(Lesson\s+\d+:|Learn MS Word|Introduction to|What is|How)\s*/i, '').trim()}
            </h1>

            <button
              onClick={() => {
                const saved = JSON.parse(localStorage.getItem("nextsem_msword_bookmarks") || "[]");
                let updated;
                if (saved.includes(lesson.id)) {
                  updated = saved.filter((id: number) => id !== lesson.id);
                } else {
                  updated = [...saved, lesson.id];
                }
                localStorage.setItem("nextsem_msword_bookmarks", JSON.stringify(updated));
                setIsCompleted(!isCompleted);
              }}
              className="p-2 rounded-lg border border-slate-800 bg-slate-900/60 hover:text-white text-slate-400 transition-all cursor-pointer shrink-0"
              title="Bookmark Lesson"
            >
              <Bookmark size={22} className="stroke-[2.5]" />
            </button>
          </div>

        </div>

        {/* Language & Level tabs */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Language */}
          <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 gap-1">
            {(["english", "hinglish", "hindi"] as Lang[]).map(lang => (
              <button
                key={lang}
                onClick={() => handleLangChange(lang)}
                className={`flex-1 text-[10px] font-black uppercase tracking-wider py-1.5 px-2 rounded-lg transition-all cursor-pointer ${
                  selectedLang === lang
                    ? "bg-[#04AA6D] text-white font-extrabold"
                    : "text-slate-500 hover:text-white"
                }`}
              >
                {lang === "english" ? "🇬🇧 EN" : lang === "hinglish" ? "🌐 Hinglish" : "🇮🇳 हिंदी"}
              </button>
            ))}
          </div>

          {/* Level */}
          <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 gap-1">
            {(["kid", "pro"] as Level[]).map(level => (
              <button
                key={level}
                onClick={() => handleLevelChange(level)}
                className={`flex-1 text-[10px] font-black uppercase tracking-wider py-1.5 px-3 rounded-lg transition-all cursor-pointer ${
                  selectedLevel === level
                    ? "bg-[#04AA6D] text-white font-extrabold"
                    : "text-slate-500 hover:text-white"
                }`}
              >
                {level === "kid" ? "🧒 Beginner" : "💼 Pro"}
              </button>
            ))}
          </div>
        </div>

        {/* Lesson Content */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 space-y-1">
          {hasTable ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <tbody>{renderContent(currentContent)}</tbody>
              </table>
            </div>
          ) : (
            renderContent(currentContent)
          )}
        </div>

        {/* MCQ Practice */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-amber-400" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">Practice Question</span>
          </div>

          <p className="text-sm font-bold text-white">{exercise.question}</p>

          <div className="space-y-2">
            {exercise.options.map((option) => {
              let chipClass = "bg-slate-800/60 border-slate-700 text-slate-300 hover:border-blue-500/50 hover:bg-blue-950/20";
              if (showResult && option === exercise.correctAnswer) {
                chipClass = "bg-emerald-950/40 border-emerald-500 text-emerald-300";
              } else if (showResult && option === selectedOption && !isCorrect) {
                chipClass = "bg-rose-950/40 border-rose-500 text-rose-300";
              } else if (!showResult && option === selectedOption) {
                chipClass = "bg-blue-950/40 border-blue-500 text-blue-300";
              }

              return (
                <button
                  key={option}
                  onClick={() => !showResult && setSelectedOption(option)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${chipClass}`}
                  disabled={showResult}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Hint */}
          {showHint && !showResult && (
            <div className="p-3 bg-amber-950/30 border border-amber-700/30 rounded-xl flex gap-2">
              <span>💡</span>
              <p className="text-xs text-amber-200">{exercise.hint}</p>
            </div>
          )}

          {/* Result */}
          {showResult && (
            <div className={`p-3 rounded-xl border flex gap-2 ${isCorrect ? "bg-emerald-950/30 border-emerald-700/30" : "bg-rose-950/30 border-rose-700/30"}`}>
              <span>{isCorrect ? "🎉" : "❌"}</span>
              <p className={`text-xs font-semibold ${isCorrect ? "text-emerald-300" : "text-rose-300"}`}>
                {isCorrect ? "Correct! Well done." : exercise.hint}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2">
            {!showResult ? (
              <>
                <button
                  onClick={handleSubmit}
                  disabled={!selectedOption}
                  className="flex-1 py-2.5 text-xs font-black uppercase tracking-wider bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  Submit Answer
                </button>
                <button
                  onClick={() => setShowHint(h => !h)}
                  className="px-4 py-2.5 text-xs font-black text-amber-400 border border-amber-800/40 bg-amber-950/20 hover:bg-amber-950/40 rounded-xl transition-all cursor-pointer"
                >
                  💡 Hint
                </button>
              </>
            ) : (
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 text-xs font-black uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all cursor-pointer"
              >
                Try Again
              </button>
            )}
          </div>
        </div>



        <AdSenseBanner />
      </div>
    </div>
  );
}
