"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, ChevronLeft, ChevronRight, BookOpen, CheckCircle2, 
  HelpCircle, FileText, Sparkles, Share2, Award, ExternalLink, RefreshCw, Home 
} from 'lucide-react';
import { 
  Unit1Lesson, unit1Lessons, PDF_URL, getUnit1Lesson 
} from '@/data/unit1LessonsData';
import BcaHeaderNav from '@/components/bca/BcaHeaderNav';
import { Capacitor } from '@capacitor/core';
import { showRewardedAd } from '@/lib/admobHelper';
import { generateAndDownloadLessonPdf } from '@/lib/pdfHelper';
import { PdfReaderPromptModal } from '@/components/PdfReaderPromptModal';
import { triggerCelebration } from '@/lib/celebration';

interface Props {
  lessonId: string;
}

export default function Unit1LessonClient({ lessonId }: Props) {
  const router = useRouter();
  const lesson = getUnit1Lesson(lessonId) || unit1Lessons[0];
  
  const [selectedLang, setSelectedLang] = useState<'english' | 'hinglish'>('hinglish');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showPdfEmbed, setShowPdfEmbed] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const prevLesson = unit1Lessons.find(l => l.lessonNumber === lesson.lessonNumber - 1);
  const nextLesson = unit1Lessons.find(l => l.lessonNumber === lesson.lessonNumber + 1);

  const [pillBlankInput, setPillBlankInput] = useState("");
  const [isPillSubmitted, setIsPillSubmitted] = useState(false);
  const [showAllMcqs, setShowAllMcqs] = useState(false);
  const [allMcqAnswers, setAllMcqAnswers] = useState<Record<string, number>>({});

  const handleSelectAllMcqOption = (lessonIdStr: string, optIdx: number) => {
    setAllMcqAnswers(prev => ({ ...prev, [lessonIdStr]: optIdx }));
  };

  useEffect(() => {
    // Reset state on lesson change
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowPdfEmbed(false);
    setPillBlankInput("");
    setIsPillSubmitted(false);

    // Load progress
    const savedUser = localStorage.getItem('nextsem_user');
    let email = 'guest';
    if (savedUser) {
      try { email = JSON.parse(savedUser).email || 'guest'; } catch (e) {}
    }
    const completedKey = `nextsem_unit1_completed_${email}`;
    const completedList: string[] = JSON.parse(localStorage.getItem(completedKey) || '[]');
    setIsCompleted(completedList.includes(lesson.id));

    const savedPts = parseInt(localStorage.getItem(`nextsem_bca_points_${email}`) || '0', 10);
    setUserPoints(savedPts);
  }, [lessonId, lesson.id]);

  const handleOptionSelect = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    setShowAllMcqs(true);

    const activeMcq = lesson.mcq[selectedLang];
    if (selectedOption === activeMcq.correctAnswer && !isCompleted) {
      setIsCompleted(true);
      const savedUser = localStorage.getItem('nextsem_user');
      let email = 'guest';
      if (savedUser) {
        try { email = JSON.parse(savedUser).email || 'guest'; } catch (e) {}
      }
      const completedKey = `nextsem_unit1_completed_${email}`;
      const completedList: string[] = JSON.parse(localStorage.getItem(completedKey) || '[]');
      if (!completedList.includes(lesson.id)) {
        completedList.push(lesson.id);
        localStorage.setItem(completedKey, JSON.stringify(completedList));
      }
      const newPoints = userPoints + 10;
      setUserPoints(newPoints);
      localStorage.setItem(`nextsem_bca_points_${email}`, newPoints.toString());
    }
  };

  const activeContent = lesson.content[selectedLang];
  const activeMcq = lesson.mcq[selectedLang];

  // ── PDF Rewarded Download ──────────────────────────────────────────────────
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [showReaderPrompt, setShowReaderPrompt] = useState(false);

  const triggerPdfDownload = () => {
    const contentText = lesson.content[selectedLang];
    const canonical = `https://ignou-study-notes-by-nextsem.web.app/bca/semester-1/computer-basics-and-pc-software/${lesson.id}`;
    const titleStr = selectedLang === 'hinglish' ? lesson.hinglishTitle : lesson.title;
    generateAndDownloadLessonPdf({
      title: titleStr,
      courseName: "IGNOU BCA 1st Sem (BCS-111) - Unit 1",
      content: contentText,
      unit: `Lesson ${lesson.lessonNumber}`,
      author: "Nextsem",
      canonicalUrl: canonical
    });
    // Mobile notification
    if ("Notification" in window && Notification.permission === "granted") {
      try {
        new Notification("📄 Lesson PDF Downloaded!", {
          body: `${titleStr} has been downloaded successfully!`,
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
        () => { triggerPdfDownload(); },
        () => { setIsDownloadingPdf(false); }
      ).then((triggered) => {
        if (!triggered) triggerPdfDownload();
      });
    } else {
      setTimeout(() => { triggerPdfDownload(); }, 1500);
    }
  };



  const parseInlineStyles = (str: string): React.ReactNode[] => {
    const parts = str.split(/(\*\*[^*]+\*\*|`[^`]+`)/);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="text-amber-300 font-bold">
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

  const renderFormattedText = (text: string): React.ReactNode => {
    if (!text) return null;
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={lineIdx} className="h-2" />;

      if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        const itemContent = trimmed.replace(/^[*\-]\s*/, "");
        return (
          <div key={lineIdx} className="flex items-start gap-2.5 my-1.5 pl-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0 shadow-sm shadow-cyan-400/50" />
            <div className="text-slate-300 leading-relaxed">{parseInlineStyles(itemContent)}</div>
          </div>
        );
      }

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

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col font-sans pb-32 transition-colors">
      <BcaHeaderNav currentSubjectCode="BCS-111" currentSubjectName="Computer Basics & PC Software" />

      <main className="max-w-4xl mx-auto px-4 py-6 w-full flex-1">
        {/* Navigation Breadcrumbs */}
        <nav aria-label="Breadcrumbs" className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-bold py-1 mb-4">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
            <span>🏠 Home</span>
          </Link>
          <span className="text-slate-400 dark:text-slate-600 font-bold">❯</span>
          <Link href="/bca" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            BCA Hub
          </Link>
          <span className="text-slate-400 dark:text-slate-600 font-bold">❯</span>
          <Link href="/bca/semester-1" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Semester 1
          </Link>
          <span className="text-slate-400 dark:text-slate-600 font-bold">❯</span>
          <Link href="/bca/semester-1/bcs-011-computer-basics" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            BCS-111
          </Link>
          <span className="text-slate-400 dark:text-slate-600 font-bold">❯</span>
          <Link href="/bca/semester-1/bcs-011-computer-basics/unit-1/lessons" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Unit 1
          </Link>
          <span className="text-slate-400 dark:text-slate-600 font-bold">❯</span>
          <span className="text-blue-600 dark:text-blue-400 font-extrabold">Lesson {lesson.lessonNumber}</span>
        </nav>

        {/* Top Header Navigation Bar */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2 text-xs">
          <Link 
            href="/bca/semester-1/bcs-011-computer-basics/unit-1/lessons"
            className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-bold bg-slate-100 dark:bg-neutral-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-neutral-800 transition-all"
          >
            <ArrowLeft size={14} />
            <span>Unit 1 All 50 Lessons Hub</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-neutral-900 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-800 font-mono font-bold text-[11px]">
              Lesson {lesson.lessonNumber} of 50
            </span>
            {isCompleted && (
              <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-neutral-900 text-black dark:text-white border border-slate-200 dark:border-neutral-800 font-bold text-[11px] flex items-center gap-1">
                <CheckCircle2 size={12} className="text-blue-600 dark:text-blue-400" /> Complete (+10 PTS)
              </span>
            )}
          </div>
        </div>

        {/* Lesson Title Header */}
        <div className="bg-slate-50 dark:bg-neutral-950 rounded-3xl p-5 sm:p-7 border border-slate-200 dark:border-neutral-800 shadow-sm mb-6 relative overflow-hidden">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{lesson.emoji}</span>
                <span className="text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider bg-blue-50 dark:bg-neutral-900 px-2.5 py-0.5 rounded border border-blue-200 dark:border-neutral-800">
                  IGNOU BCS-111 • Unit 1
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-black dark:text-white leading-tight">
                {selectedLang === 'hinglish' ? lesson.hinglishTitle : lesson.title}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                Author: <span className="text-blue-600 dark:text-blue-400 font-bold">Er. Manoj Kumar</span> • Canonical PDF Page #{lesson.pdfPage}
              </p>
            </div>

            {/* Language Selector Pill */}
            <div className="flex items-center bg-slate-100 dark:bg-neutral-900 p-1 rounded-2xl border border-slate-200 dark:border-neutral-800">
              <button
                onClick={() => setSelectedLang('hinglish')}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  selectedLang === 'hinglish' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
                }`}
              >
                🇲🇮 Hinglish
              </button>
              <button
                onClick={() => setSelectedLang('english')}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  selectedLang === 'english' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
                }`}
              >
                🇬🇧 English
              </button>
            </div>
          </div>
        </div>

        {/* PDF Page Visual Reference Banner */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-slate-200 dark:border-neutral-800 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-neutral-800 border border-blue-200 dark:border-neutral-700 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <FileText size={20} />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-black dark:text-white">
                Official IGNOU PDF Reference — Page {lesson.pdfPage}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Unit-1.pdf ("Computer their Origin and Applications")
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            <button
              onClick={() => setShowPdfEmbed(!showPdfEmbed)}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <BookOpen size={14} />
              <span>{showPdfEmbed ? "Hide PDF Page" : `View PDF Page #${lesson.pdfPage}`}</span>
            </button>
            <Link
              href={`/bca/viewer?file=${encodeURIComponent(PDF_URL)}&page=${lesson.pdfPage}&title=${encodeURIComponent(lesson.title)}`}
              target="_blank"
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-black dark:text-white border border-slate-200 dark:border-neutral-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <ExternalLink size={14} />
              <span>Full PDF Reader</span>
            </Link>
            {/* Download Lesson PDF */}
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloadingPdf}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isDownloadingPdf ? (
                <>
                  <div className="w-3 h-3 rounded-full border-2 border-t-white border-blue-400 animate-spin" />
                  <span>Preparing...</span>
                </>
              ) : (
                <>
                  <FileText size={14} />
                  <span>📥 Download PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Embedded Interactive PDF Viewer Frame if toggled */}
        {showPdfEmbed && (
          <div className="bg-slate-50 dark:bg-neutral-950 rounded-2xl border border-blue-600/40 p-2 mb-6 shadow-xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 dark:border-neutral-800 text-xs font-bold text-slate-500 dark:text-slate-400">
              <span>PDF Viewer focused on Page {lesson.pdfPage}</span>
              <button onClick={() => setShowPdfEmbed(false)} className="text-slate-500 hover:text-black dark:hover:text-white">✕ Close</button>
            </div>
            <iframe
              src={`${PDF_URL}#page=${lesson.pdfPage}`}
              className="w-full h-[450px] rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-black"
              title={`PDF Page ${lesson.pdfPage}`}
            />
          </div>
        )}

        {/* Main Lesson Explanation Body */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-neutral-800 shadow-sm mb-6 space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <div className="text-sm sm:text-base leading-relaxed text-black dark:text-white space-y-3">
              {renderFormattedText(activeContent)}
            </div>
          </div>

          {/* Key Takeaways Card */}
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 p-5 rounded-2xl border border-slate-200 dark:border-neutral-800">
            <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-1.5">
              <Award size={16} /> Key Learning Highlights
            </h3>
            <ul className="space-y-2">
              {lesson.keyPoints.map((kp, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                  <span className="text-blue-600 dark:text-blue-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span>{parseInlineStyles(kp)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 💡 Nextsem Extra Notes (Not in IGNOU provided PDF) */}
        {lesson.extraNotes && (
          <div className="bg-slate-50 dark:bg-neutral-950 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-neutral-800 shadow-sm mb-6 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3.5 py-1 rounded-full bg-blue-50 dark:bg-neutral-900 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-800 text-xs font-black tracking-wide flex items-center gap-1.5 shadow-sm">
                👨‍🏫 Exam &amp; Practical Notes
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-black text-black dark:text-white mb-3 flex items-center gap-2">
              <span>{parseInlineStyles(lesson.extraNotes.subheading)}</span>
            </h3>

            {lesson.extraNotes.imageUrl && (
              <div className="my-4 rounded-2xl overflow-hidden border border-slate-200 dark:border-neutral-800 bg-white dark:bg-black p-2.5 shadow-sm">
                <img
                  src={lesson.extraNotes.imageUrl}
                  alt={lesson.extraNotes.subheading}
                  className="w-full h-auto max-h-80 object-cover rounded-xl border border-slate-200 dark:border-neutral-800"
                />
                {lesson.extraNotes.imageCaption && (
                  <p className="text-center text-xs text-slate-500 dark:text-slate-400 font-medium mt-2">
                    🖼️ {lesson.extraNotes.imageCaption}
                  </p>
                )}
              </div>
            )}

            <div className="text-sm sm:text-base leading-relaxed text-black dark:text-white space-y-3 mt-2">
              {renderFormattedText(lesson.extraNotes.content[selectedLang])}
            </div>
          </div>
        )}

        {/* 💊 Fill-in-the-Blank Pill Option Challenge */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-neutral-800 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles size={18} />
              <span>Fill-in-the-Blank Pill Challenge</span>
            </h3>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-700">
              Interactive Pill Test
            </span>
          </div>

          <p className="text-sm sm:text-base font-bold text-black dark:text-white mb-3 leading-snug">
            Fill in the blank using the option pills below:
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-black dark:text-white text-sm sm:text-base font-medium mb-4">
            {activeMcq.question.replace(/\?$/, "")}{" "}
            <span className="inline-block px-3 py-1 mx-1 rounded-lg bg-blue-50 dark:bg-neutral-800 border border-blue-200 dark:border-neutral-700 font-bold text-blue-600 dark:text-blue-400 min-w-[100px] text-center underline decoration-dashed">
              {pillBlankInput ? pillBlankInput : "________"}
            </span>
          </div>

          <div className="space-y-2 mb-4">
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Tap an Option Pill to Fill:
            </div>
            <div className="flex flex-wrap gap-2">
              {activeMcq.options.map((pillOpt, pillIdx) => (
                <button
                  key={pillIdx}
                  onClick={(e) => {
                    setPillBlankInput(pillOpt);
                    setIsPillSubmitted(true);
                    if (pillIdx === activeMcq.correctAnswer) {
                      triggerCelebration(e);
                    }
                  }}
                  className={`px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm ${
                    pillBlankInput === pillOpt
                      ? pillIdx === activeMcq.correctAnswer
                        ? "bg-blue-600 text-white border-blue-600 shadow-blue-500/20"
                        : "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                      : "bg-slate-100 dark:bg-neutral-800 border-slate-200 dark:border-neutral-700 text-black dark:text-white hover:bg-slate-200 dark:hover:bg-neutral-700"
                  }`}
                >
                  💊 {pillOpt}
                </button>
              ))}
            </div>
          </div>

          {isPillSubmitted && (
            <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
              pillBlankInput === activeMcq.options[activeMcq.correctAnswer]
                ? 'bg-blue-50 dark:bg-neutral-950 border-blue-200 dark:border-neutral-800 text-blue-700 dark:text-blue-300'
                : 'bg-slate-100 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 text-black dark:text-white'
            }`}>
              <div className="font-extrabold mb-1 flex items-center gap-1.5 text-sm">
                {pillBlankInput === activeMcq.options[activeMcq.correctAnswer] ? (
                  <>🎉 Perfect Pill Match!</>
                ) : (
                  <>❌ Sahi Option Pill: "{activeMcq.options[activeMcq.correctAnswer]}"</>
                )}
              </div>
              <p className="mt-1 font-medium">{activeMcq.explanation}</p>
            </div>
          )}
        </div>

        {/* MCQ Interactive Exercise */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-neutral-800 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-2">
              <HelpCircle size={18} />
              <span>Lesson Checkpoint Exercise</span>
            </h3>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-neutral-800 text-black dark:text-white border border-slate-200 dark:border-neutral-700">
              Reward: +10 Points
            </span>
          </div>

          <p className="text-sm sm:text-base font-bold text-black dark:text-white mb-5 leading-snug">
            {activeMcq.question}
          </p>

          <div className="space-y-2.5 mb-6">
            {activeMcq.options.map((option, idx) => {
              let btnClass = "w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ";

              if (!isAnswerSubmitted) {
                if (selectedOption === idx) {
                  btnClass += "bg-blue-50 dark:bg-neutral-800 border-blue-600 text-blue-600 dark:text-blue-400 shadow-sm";
                } else {
                  btnClass += "bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 text-black dark:text-white hover:bg-slate-100 dark:hover:bg-neutral-800";
                }
              } else {
                if (idx === activeMcq.correctAnswer) {
                  btnClass += "bg-blue-600 text-white border-blue-600 font-bold shadow-sm";
                } else if (selectedOption === idx) {
                  btnClass += "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white font-bold";
                } else {
                  btnClass += "bg-slate-100 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 text-slate-400 opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className={btnClass}
                  disabled={isAnswerSubmitted}
                >
                  <span>{option}</span>
                  {isAnswerSubmitted && idx === activeMcq.correctAnswer && (
                    <CheckCircle2 size={16} className="text-white shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {!isAnswerSubmitted ? (
            <button
              onClick={handleCheckAnswer}
              disabled={selectedOption === null}
              className={`w-full py-3 rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer ${
                selectedOption !== null
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-slate-200 dark:bg-neutral-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              Submit Answer
            </button>
          ) : (
            <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
              selectedOption === activeMcq.correctAnswer
                ? 'bg-blue-50 dark:bg-neutral-950 border-blue-200 dark:border-neutral-800 text-blue-700 dark:text-blue-300'
                : 'bg-slate-100 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 text-black dark:text-white'
            }`}>
              <div className="font-extrabold mb-1 flex items-center gap-1.5 text-sm">
                {selectedOption === activeMcq.correctAnswer ? (
                  <>🎉 Correct Answer! (+10 Points Added)</>
                ) : (
                  <>❌ Incorrect — Explanation:</>
                )}
              </div>
              <p className="mt-1 font-medium">{activeMcq.explanation}</p>
            </div>
          )}
        </div>

        {/* Toggle Button to view/hide All Unit MCQs */}
        <div className="mb-6 text-center">
          <button
            onClick={() => setShowAllMcqs(!showAllMcqs)}
            className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-blue-600 dark:text-blue-400 font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 mx-auto shadow-sm cursor-pointer active:scale-95 transition-all"
          >
            <Sparkles size={16} />
            <span>{showAllMcqs ? "Hide All Unit MCQs List" : "🔥 Practice All Unit MCQs Together (50 Questions)"}</span>
          </button>
        </div>

        {/* 📋 All 50 Unit MCQs Together Practice Quiz */}
        {showAllMcqs && (
          <div className="bg-slate-50 dark:bg-neutral-950 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-neutral-800 shadow-sm mb-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-neutral-800">
              <div>
                <h3 className="text-base sm:text-lg font-black text-black dark:text-white flex items-center gap-2">
                  <Award size={20} className="text-blue-600 dark:text-blue-400" />
                  <span>Unit 1 Full Practice Checkpoint — 50 MCQs</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Solve all questions together. Answers and explanations are checked live!
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-neutral-900 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-800 text-xs font-bold shrink-0">
                50 Questions
              </span>
            </div>

            <div className="space-y-6 max-h-[700px] overflow-y-auto pr-1">
              {unit1Lessons.map((uItem, uIdx) => {
                const qMcq = uItem.mcq[selectedLang];
                const selectedPill = allMcqAnswers[uItem.id];
                const isSelected = selectedPill !== undefined;

                return (
                  <div key={uItem.id} className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-xs sm:text-sm font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                          Q{uIdx + 1}
                        </span>
                        <span>{uItem.title}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm font-bold text-black dark:text-white leading-snug">
                      {qMcq.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {qMcq.options.map((opt, optIdx) => {
                        let optBtnStyle = "text-left p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ";
                        if (!isSelected) {
                          optBtnStyle += "bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 text-black dark:text-white hover:bg-slate-100 dark:hover:bg-neutral-800";
                        } else {
                          if (optIdx === qMcq.correctAnswer) {
                            optBtnStyle += "bg-blue-600 text-white border-blue-600 font-bold shadow-sm";
                          } else if (selectedPill === optIdx) {
                            optBtnStyle += "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white font-bold";
                          } else {
                            optBtnStyle += "bg-slate-100 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 text-slate-400 opacity-50";
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAllMcqOption(uItem.id, optIdx)}
                            className={optBtnStyle}
                          >
                            <span>{opt}</span>
                            {isSelected && optIdx === qMcq.correctAnswer && (
                              <CheckCircle2 size={14} className="text-white shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isSelected && (
                      <div className={`p-3 rounded-xl border text-xs leading-relaxed ${
                        selectedPill === qMcq.correctAnswer
                          ? "bg-blue-50 dark:bg-neutral-950 border-blue-200 dark:border-neutral-800 text-blue-700 dark:text-blue-300"
                          : "bg-slate-100 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 text-black dark:text-white"
                      }`}>
                        <div className="font-bold mb-0.5">
                          {selectedPill === qMcq.correctAnswer ? "🎉 Correct Answer!" : `❌ Incorrect — Correct: "${qMcq.options[qMcq.correctAnswer]}"`}
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-[11px]">{qMcq.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Navigation — Home • Prev • Subject • Next */}
        <nav className="pt-6 border-t border-slate-200 dark:border-neutral-800 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {/* 1. Home */}
          <Link
            href="/"
            className="p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 hover:border-blue-600 text-black dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm group cursor-pointer"
          >
            <Home size={14} className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform shrink-0" />
            <span>Home</span>
          </Link>

          {/* 2. Previous Lesson */}
          {prevLesson ? (
            <button
              onClick={() => router.push(`/bca/semester-1/bcs-011-computer-basics/unit-1/lessons/${prevLesson.id}`)}
              className="p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700 text-black dark:text-white font-bold text-xs flex items-center justify-center gap-1 transition-all shadow-sm group cursor-pointer truncate"
              title={`Previous: #${prevLesson.lessonNumber} ${prevLesson.title}`}
            >
              <ChevronLeft size={14} className="text-blue-600 dark:text-blue-400 group-hover:-translate-x-0.5 transition-transform shrink-0" />
              <span className="truncate">Prev #{prevLesson.lessonNumber}</span>
            </button>
          ) : (
            <button
              disabled
              className="p-3 rounded-2xl bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-slate-400 font-bold text-xs flex items-center justify-center gap-1 cursor-not-allowed opacity-50"
            >
              <ChevronLeft size={14} className="shrink-0" />
              <span>Prev</span>
            </button>
          )}

          {/* 3. Subject Hub */}
          <Link
            href="/bca/semester-1/bcs-011-computer-basics"
            className="p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 hover:border-blue-600 text-black dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm group cursor-pointer truncate"
          >
            <BookOpen size={14} className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform shrink-0" />
            <span className="truncate">Subject</span>
          </Link>

          {/* 4. Next Lesson */}
          {nextLesson ? (
            <button
              onClick={() => router.push(`/bca/semester-1/bcs-011-computer-basics/unit-1/lessons/${nextLesson.id}`)}
              className="p-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-1 transition-all shadow-md active:scale-95 group cursor-pointer truncate"
              title={`Next: #${nextLesson.lessonNumber} ${nextLesson.title}`}
            >
              <span className="truncate">Next #{nextLesson.lessonNumber}</span>
              <ChevronRight size={14} className="text-white group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>
          ) : (
            <Link
              href="/bca/semester-1/bcs-011-computer-basics/unit-1/lessons"
              className="p-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-1 transition-all shadow-md truncate"
            >
              <span className="truncate">Done 🎉</span>
              <ChevronRight size={14} className="text-white shrink-0" />
            </Link>
          )}
        </nav>
        {/* PDF Reader Prompt Modal */}
        <PdfReaderPromptModal
          isOpen={showReaderPrompt}
          onClose={() => setShowReaderPrompt(false)}
          pdfUrl={`https://ignou-study-notes-by-nextsem.web.app/bca/semester-1/computer-basics-and-pc-software/${lesson.id}`}
        />
      </main>
    </div>
  );
}
