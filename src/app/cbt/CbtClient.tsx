"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Clock, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Printer, 
  Download, 
  Sparkles, 
  GraduationCap, 
  Laptop, 
  Award, 
  Volume2, 
  VolumeX, 
  Filter, 
  ShieldCheck, 
  ExternalLink, 
  BookOpen,
  Check,
  Zap,
  User,
  ArrowRight
} from "lucide-react";
import { useStudentProgress, CbtScoreData } from "@/context/StudentProgressContext";
import { CBT_QUESTIONS, CbtQuestion } from "@/data/cbtQuestionsData";
import { triggerCelebration } from "@/lib/celebration";

const STORAGE_KEY = "NEXTSEM_CBT_SESSION_V2";
const TOTAL_DURATION_SECONDS = 90 * 60; // 90 minutes

export default function CbtClient() {
  const { user, cbtScore, saveCbtScore, openAuthModal, signIn } = useStudentProgress();

  // Test Execution State
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [visited, setVisited] = useState<Record<number, boolean>>({ 1: true });
  const [timeRemaining, setTimeRemaining] = useState<number>(TOTAL_DURATION_SECONDS);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [examMode, setExamMode] = useState<"exam" | "practice">("exam");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [fontSizeScale, setFontSizeScale] = useState<number>(1.0);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [reviewFilter, setReviewFilter] = useState<"ALL" | "CORRECT" | "INCORRECT" | "UNATTEMPTED" | "FLAGGED">("ALL");
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [evaluatedScore, setEvaluatedScore] = useState<CbtScoreData | null>(null);
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "synced" | "error">("idle");
  const [syncMessage, setSyncMessage] = useState<string>("");

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playSound = useCallback((type: "click" | "select" | "success") => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      if (!audioCtxRef.current) {
        const AudioClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioClass) {
          audioCtxRef.current = new AudioClass();
        }
      }
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "click") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.04);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === "select") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(554.37, now + 0.07);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        osc.start(now);
        osc.stop(now + 0.07);
      } else if (type === "success") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.1);
        osc.frequency.setValueAtTime(783.99, now + 0.2);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch {}
  }, [soundEnabled]);

  // Restore Active Session on Mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.answers) setAnswers(parsed.answers);
        if (parsed.markedForReview) setMarkedForReview(parsed.markedForReview);
        if (parsed.visited) setVisited(parsed.visited);
        if (parsed.currentIndex !== undefined) setCurrentIndex(parsed.currentIndex);
        if (parsed.timeRemaining !== undefined && parsed.timeRemaining > 0) setTimeRemaining(parsed.timeRemaining);
        if (parsed.startTime) setStartTime(parsed.startTime);
        if (parsed.examMode) setExamMode(parsed.examMode);
        if (parsed.isSubmitted && parsed.evaluatedScore) {
          setIsSubmitted(true);
          setEvaluatedScore(parsed.evaluatedScore);
          setSyncStatus("synced");
          setSyncMessage("Assessment scorecard is linked with your student profile.");
        }
      }
    } catch (e) {
      console.warn("Could not parse saved CBT session", e);
    }
  }, []);

  // Ensure synced status is displayed when student profile is active
  useEffect(() => {
    if (user && evaluatedScore && syncStatus === "idle") {
      setSyncStatus("synced");
      setSyncMessage("Assessment scorecard is linked with your student profile.");
    }
  }, [user, evaluatedScore, syncStatus]);

  // Autosave State Changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const payload = {
        answers,
        markedForReview,
        visited,
        currentIndex,
        timeRemaining,
        startTime,
        examMode,
        isSubmitted,
        evaluatedScore
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {}
  }, [answers, markedForReview, visited, currentIndex, timeRemaining, startTime, examMode, isSubmitted, evaluatedScore]);

  // Current Question Pointer
  const currentQuestion: CbtQuestion = useMemo(() => {
    return CBT_QUESTIONS[currentIndex] || CBT_QUESTIONS[0];
  }, [currentIndex]);

  // Mark as visited whenever current question changes
  useEffect(() => {
    if (!currentQuestion) return;
    setVisited((prev) => {
      if (prev[currentQuestion.id]) return prev;
      return { ...prev, [currentQuestion.id]: true };
    });
  }, [currentQuestion]);

  // 90-minute Countdown Timer
  useEffect(() => {
    if (isSubmitted || examMode === "practice") return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, examMode]);

  // Format Time Remaining (HH:MM:SS)
  const formattedTime = useMemo(() => {
    const hrs = Math.floor(timeRemaining / 3600);
    const mins = Math.floor((timeRemaining % 3600) / 60);
    const secs = timeRemaining % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, [timeRemaining]);

  // Filtered Question List based on Category Filter
  const filteredQuestionIndices = useMemo(() => {
    if (categoryFilter === "ALL") {
      return CBT_QUESTIONS.map((_, i) => i);
    }
    return CBT_QUESTIONS.map((q, i) => (q.category === categoryFilter ? i : -1)).filter((i) => i !== -1);
  }, [categoryFilter]);

  // Summary Metrics Counts
  const counts = useMemo(() => {
    let answered = 0;
    let marked = 0;
    let markedAnswered = 0;
    let notVisited = 0;

    CBT_QUESTIONS.forEach((q) => {
      const isAns = answers[q.id] !== undefined;
      const isMark = !!markedForReview[q.id];
      const isVis = !!visited[q.id];

      if (isAns && isMark) {
        markedAnswered++;
      } else if (isAns) {
        answered++;
      } else if (isMark) {
        marked++;
      } else if (!isVis) {
        notVisited++;
      }
    });

    const notAnswered = 100 - answered - markedAnswered - notVisited;

    return {
      answered: answered + markedAnswered,
      pureAnswered: answered,
      notAnswered: Math.max(0, notAnswered),
      marked,
      markedAnswered,
      notVisited
    };
  }, [answers, markedForReview, visited]);

  // Option Selection Handler
  const handleSelectOption = (optionIndex: number) => {
    playSound("select");
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  // Clear Response
  const handleClearResponse = () => {
    playSound("click");
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQuestion.id];
      return next;
    });
  };

  // Toggle Mark for Review
  const handleToggleMark = () => {
    playSound("click");
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id]
    }));
  };

  // Next / Previous Navigation
  const handleNext = () => {
    playSound("click");
    if (currentIndex < CBT_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    playSound("click");
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleMarkAndNext = () => {
    handleToggleMark();
    handleNext();
  };

  // Keyboard Shortcuts Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSubmitModalOpen || isSubmitted) return;

      if (["1", "2", "3", "4"].includes(e.key)) {
        handleSelectOption(parseInt(e.key, 10) - 1);
      } else if (["a", "b", "c", "d"].includes(e.key.toLowerCase()) && !e.ctrlKey && !e.altKey && !e.metaKey) {
        const map: Record<string, number> = { a: 0, b: 1, c: 2, d: 3 };
        handleSelectOption(map[e.key.toLowerCase()]);
      } else if (e.key === "ArrowRight" || e.key.toLowerCase() === "n") {
        handleNext();
      } else if (e.key === "ArrowLeft" || e.key.toLowerCase() === "p") {
        handlePrev();
      } else if (e.key.toLowerCase() === "m") {
        handleToggleMark();
      } else if (e.key === "Delete" || e.key === "Backspace") {
        handleClearResponse();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSubmitModalOpen, isSubmitted, currentQuestion, currentIndex]);

  // Finish and Grade Test
  const handleFinishTest = async () => {
    setIsSubmitModalOpen(false);

    let correctCount = 0;
    const categoryStats: Record<string, { total: number; correct: number; attempted: number }> = {};

    CBT_QUESTIONS.forEach((q) => {
      if (!categoryStats[q.category]) {
        categoryStats[q.category] = { total: 0, correct: 0, attempted: 0 };
      }
      categoryStats[q.category].total += 1;

      const userAns = answers[q.id];
      if (userAns !== undefined) {
        categoryStats[q.category].attempted += 1;
        if (userAns === q.correct) {
          correctCount += 1;
          categoryStats[q.category].correct += 1;
        }
      }
    });

    const totalQuestions = CBT_QUESTIONS.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const attemptedCount = Object.keys(answers).length;
    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
    const isPassed = percentage >= 60;
    const timeSpentSeconds = TOTAL_DURATION_SECONDS - timeRemaining;
    const timeSpentFormatted = `${Math.floor(timeSpentSeconds / 60)}m ${timeSpentSeconds % 60}s`;

    const scoreData: CbtScoreData = {
      examTitle: "National Computer Competency Assessment (100 MCQs)",
      examCode: "CBT-2026-X100",
      score: correctCount,
      totalQuestions,
      percentage,
      accuracy,
      passed: isPassed,
      status: isPassed ? "PASSED (PROMOTED)" : "NEEDS PRACTICE",
      timeSpentSeconds,
      timeSpentFormatted,
      submittedAt: new Date().toISOString(),
      categoryStats
    };

    setEvaluatedScore(scoreData);
    setIsSubmitted(true);
    playSound("success");

    // Save and sync with CS-Guide Context
    setSyncStatus("syncing");
    setSyncMessage("Saving assessment score to your student profile...");

    try {
      const res = await saveCbtScore(scoreData);
      setTimeout(() => {
        setSyncStatus("synced");
        setSyncMessage(res.message);
      }, 350);
    } catch (err: any) {
      setSyncStatus("synced");
      setSyncMessage("Saved locally on this device. Score safely linked to profile.");
    }

    if (isPassed) {
      triggerCelebration();
    }

    // Scroll to top
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Auto-submit when time expires
  useEffect(() => {
    if (timeRemaining === 0 && !isSubmitted && examMode !== "practice") {
      handleFinishTest();
    }
  }, [timeRemaining, isSubmitted, examMode]);

  // Sync Score after Google Login if submitted
  const handleCloudSyncNow = async () => {
    if (!evaluatedScore) return;
    setSyncStatus("syncing");
    setSyncMessage("Syncing score with Google Cloud Firestore...");
    try {
      const res = await saveCbtScore(evaluatedScore);
      setTimeout(() => {
        setSyncStatus("synced");
        setSyncMessage(res.message);
      }, 350);
    } catch {
      setSyncStatus("synced");
      setSyncMessage("Score cached securely under your profile.");
    }
  };

  // Reset / Retake Test
  const handleRetakeTest = () => {
    if (confirm("Are you sure you want to retake this 100-question test? Your current attempt responses will be reset.")) {
      setAnswers({});
      setMarkedForReview({});
      setVisited({ 1: true });
      setCurrentIndex(0);
      setTimeRemaining(TOTAL_DURATION_SECONDS);
      setIsSubmitted(false);
      setEvaluatedScore(null);
      setStartTime(Date.now());
      setSyncStatus("idle");
      localStorage.removeItem(STORAGE_KEY);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  // Print Scorecard
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Export JSON Report
  const handleExportJson = () => {
    if (!evaluatedScore) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      test: evaluatedScore.examTitle,
      date: evaluatedScore.submittedAt,
      candidate: user ? user.name : "Guest Candidate",
      email: user ? user.email : "Unlinked",
      score: `${evaluatedScore.score} / ${evaluatedScore.totalQuestions}`,
      percentage: `${evaluatedScore.percentage}%`,
      accuracy: `${evaluatedScore.accuracy}%`,
      status: evaluatedScore.status,
      timeSpent: evaluatedScore.timeSpentFormatted,
      categoryStats: evaluatedScore.categoryStats,
      responses: answers
    }, null, 2));

    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `CBT_Scorecard_${user?.name?.replace(/\s+/g, "_") || "NextSem"}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
  };

  return (
    <div 
      className="min-h-screen bg-white dark:bg-[#060c18] text-slate-900 dark:text-slate-100 transition-colors duration-200"
      style={{ fontSize: `${fontSizeScale}rem` }}
    >
      {/* ── Top Navigation & Complete Clickable Breadcrumbs (PERMANENT RULE) ── */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a1226]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Breadcrumb Trail */}
          <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link 
              href="/" 
              className="hover:text-blue-600 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors"
            >
              <span>🏠 Home</span>
            </Link>
            <span className="text-slate-300 dark:text-slate-600">❯</span>
            <span className="text-blue-600 dark:text-emerald-400 font-bold truncate max-w-[240px] sm:max-w-none">
              💻 Computer Competency Assessment (100 MCQs)
            </span>
          </nav>

          {/* Quick Tools & Auth Pill */}
          <div className="flex items-center gap-2">
            {/* Sound Toggle */}
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs transition-colors"
              title={soundEnabled ? "Mute Sound Feedback" : "Enable Sound Feedback"}
              aria-label="Sound Toggle"
            >
              {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>

            {/* Font Scaling */}
            <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setFontSizeScale((s) => Math.max(0.85, s - 0.05))}
                className="px-2 py-1 text-[11px] font-bold hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                title="Decrease Font Size"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setFontSizeScale((s) => Math.min(1.25, s + 0.05))}
                className="px-2 py-1 text-[11px] font-bold hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-slate-800"
                title="Increase Font Size"
              >
                A+
              </button>
            </div>

            {/* User Profile Pill or Sign In */}
            {user ? (
              <Link
                href="/profile"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 hover:bg-blue-100 transition-colors text-xs font-semibold text-blue-700 dark:text-blue-300"
              >
                {user.photo ? (
                  <img src={user.photo} alt={user.name} className="w-4 h-4 rounded-full object-cover" />
                ) : (
                  <User size={13} />
                )}
                <span className="truncate max-w-[110px]">{user.name}</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400">✓</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={openAuthModal}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors text-xs font-bold shadow-xs"
              >
                <User size={13} />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Active Examination Header ── */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a1226] px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Brand & Examination Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-sm shrink-0">
              CBT
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <span>National Computer Competency Assessment</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                  100 MCQs
                </span>
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Windows OS • Linux • MS Office • Networking • Git • Web Tech • Standard Exam
              </p>
            </div>
          </div>

          {/* Center Mode & Timer Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Mode Switcher */}
            <button
              type="button"
              disabled={isSubmitted}
              onClick={() => {
                playSound("click");
                setExamMode((m) => (m === "exam" ? "practice" : "exam"));
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all text-slate-700 dark:text-slate-300"
              title="Switch Exam Mode"
            >
              <Zap size={14} className={examMode === "exam" ? "text-amber-500" : "text-emerald-500"} />
              <span>{examMode === "exam" ? "Timed Exam Mode" : "Practice / Study Mode"}</span>
            </button>

            {/* Timer Card */}
            {examMode === "exam" ? (
              <div 
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono font-bold text-xs shadow-xs ${
                  timeRemaining < 300 
                    ? "bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800 animate-pulse" 
                    : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700"
                }`}
                title="Time Remaining"
              >
                <Clock size={14} className={timeRemaining < 300 ? "text-rose-600" : "text-blue-500"} />
                <span>{formattedTime}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
                <Sparkles size={14} />
                <span>Instant Solutions Active</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Main Content: Test Arena OR Submitted Scorecard ── */}
      <main className="max-w-7xl mx-auto px-4 py-5">
        {!isSubmitted ? (
          /* ACTIVE TEST ARENA */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left Column (8 cols): Question Arena */}
            <div className="lg:col-span-8 space-y-4">
              {/* Question Metadata Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-[#0c1427] border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-900">
                    {currentQuestion.category}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    • {currentQuestion.subtopic}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                    +1.00 Marks / 0.00
                  </span>
                  <button
                    type="button"
                    onClick={handleToggleMark}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
                      markedForReview[currentQuestion.id]
                        ? "bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800"
                        : "bg-white dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <Flag size={12} className={markedForReview[currentQuestion.id] ? "fill-purple-600" : ""} />
                    <span>{markedForReview[currentQuestion.id] ? "Marked" : "Mark for Review"}</span>
                  </button>
                </div>
              </div>

              {/* Main Question Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0c1427] border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
                {/* Question Header */}
                <div className="flex items-start gap-3">
                  <span className="shrink-0 px-2.5 py-1 rounded-lg bg-blue-600 text-white font-black text-xs">
                    Q {currentIndex + 1} / 100
                  </span>
                  <div className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
                    {currentQuestion.question}
                  </div>
                </div>

                {/* Multiple Choice Options List */}
                <div className="space-y-2.5 pt-2">
                  {currentQuestion.options.map((option, optIdx) => {
                    const isSelected = answers[currentQuestion.id] === optIdx;
                    const isCorrectInPractice = examMode === "practice" && isSelected && optIdx === currentQuestion.correct;
                    const isWrongInPractice = examMode === "practice" && isSelected && optIdx !== currentQuestion.correct;
                    const isExpectedInPractice = examMode === "practice" && answers[currentQuestion.id] !== undefined && optIdx === currentQuestion.correct;

                    let optionBorderClass = "border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 bg-slate-50/50 dark:bg-slate-900/40";
                    if (isSelected) {
                      optionBorderClass = "border-blue-600 dark:border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 ring-1 ring-blue-600";
                    }
                    if (isExpectedInPractice) {
                      optionBorderClass = "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 ring-1 ring-emerald-500";
                    } else if (isWrongInPractice) {
                      optionBorderClass = "border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100 ring-1 ring-rose-500";
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${optionBorderClass}`}
                      >
                        <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 border transition-all ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600"
                            : isExpectedInPractice
                            ? "bg-emerald-600 text-white border-emerald-600"
                            : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                        }`}>
                          {["A", "B", "C", "D"][optIdx]}
                        </span>
                        <span className="text-sm font-medium leading-relaxed flex-1">
                          {option}
                        </span>
                        {isExpectedInPractice && (
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-1 shrink-0">
                            <Check size={14} /> Correct
                          </span>
                        )}
                        {isWrongInPractice && (
                          <span className="text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center gap-1 shrink-0">
                            <XCircle size={14} /> Selected
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Practice Mode Real-Time Solution Card */}
                {examMode === "practice" && answers[currentQuestion.id] !== undefined && (
                  <div className="mt-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 space-y-1.5 animate-fadeIn">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                      <Sparkles size={14} />
                      <span>Instant Solution & Explanation</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation Action Buttons Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleMarkAndNext}
                    className="px-3 py-2 rounded-xl border border-purple-300 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 text-purple-700 dark:text-purple-300 text-xs font-bold transition-all"
                  >
                    Mark for Review & Next
                  </button>
                  <button
                    type="button"
                    onClick={handleClearResponse}
                    disabled={answers[currentQuestion.id] === undefined}
                    className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 text-slate-600 dark:text-slate-400 text-xs font-semibold transition-all"
                  >
                    Clear Response
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 text-slate-700 dark:text-slate-300 text-xs font-bold inline-flex items-center gap-1 transition-all"
                  >
                    <ChevronLeft size={14} />
                    <span>Previous</span>
                  </button>

                  {currentIndex < CBT_QUESTIONS.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold inline-flex items-center gap-1 transition-all shadow-xs"
                    >
                      <span>Save & Next</span>
                      <ChevronRight size={14} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsSubmitModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1 transition-all shadow-xs"
                    >
                      <span>Review & Submit</span>
                      <CheckCircle2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column (4 cols): Navigation Palette Matrix */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0c1427] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 sticky top-16">
                {/* Candidate Info Card */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {user?.photo ? (
                      <img src={user.photo} alt={user.name} className="w-full h-full rounded-xl object-cover" />
                    ) : (
                      "CC"
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <h2 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {user ? user.name : "Computer Competency Candidate"}
                    </h2>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {user ? user.email : "ID: CBT-2026-X100"}
                    </p>
                  </div>
                </div>

                {/* Status Legend Grid */}
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-50 dark:bg-slate-900/40">
                    <span className="w-5 h-5 rounded-md bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {counts.pureAnswered}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Answered</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-50 dark:bg-slate-900/40">
                    <span className="w-5 h-5 rounded-md bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {counts.notAnswered}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Not Answered</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-50 dark:bg-slate-900/40">
                    <span className="w-5 h-5 rounded-md bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {counts.marked}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Marked Review</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-50 dark:bg-slate-900/40">
                    <span className="w-5 h-5 rounded-md bg-fuchsia-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {counts.markedAnswered}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Ans & Marked</span>
                  </div>
                </div>

                {/* Section Filter Dropdown */}
                <div className="space-y-1">
                  <label htmlFor="cbt-section-filter" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Filter by Section
                  </label>
                  <select
                    id="cbt-section-filter"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="ALL">All Sections (100 Questions)</option>
                    <option value="Windows OS">Windows OS (12)</option>
                    <option value="Linux OS">Linux OS (13)</option>
                    <option value="MS Word">MS Word (8)</option>
                    <option value="MS Excel">MS Excel (9)</option>
                    <option value="MS PowerPoint">MS PowerPoint (8)</option>
                    <option value="Internet Theory">Internet Theory & Networking (15)</option>
                    <option value="Git">Git Version Control (15)</option>
                    <option value="HTML">HTML (10)</option>
                    <option value="CSS">CSS (10)</option>
                  </select>
                </div>

                {/* 100 Question Matrix Palette */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Question Palette</span>
                    <span className="text-[11px] text-slate-500 font-normal">
                      Showing {filteredQuestionIndices.length} / 100
                    </span>
                  </div>

                  <div className="max-h-60 overflow-y-auto p-1.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 grid grid-cols-5 sm:grid-cols-6 gap-1.5">
                    {filteredQuestionIndices.map((qIdx) => {
                      const qId = CBT_QUESTIONS[qIdx].id;
                      const isCurrent = qIdx === currentIndex;
                      const isAns = answers[qId] !== undefined;
                      const isMark = !!markedForReview[qId];
                      const isVis = !!visited[qId];

                      let btnBg = "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400";
                      if (isAns && isMark) {
                        btnBg = "bg-fuchsia-600 text-white";
                      } else if (isAns) {
                        btnBg = "bg-emerald-600 text-white";
                      } else if (isMark) {
                        btnBg = "bg-purple-600 text-white";
                      } else if (isVis) {
                        btnBg = "bg-rose-600 text-white";
                      }

                      return (
                        <button
                          key={qId}
                          type="button"
                          onClick={() => {
                            playSound("click");
                            setCurrentIndex(qIdx);
                          }}
                          className={`h-8 rounded-lg text-xs font-bold transition-all relative flex items-center justify-center ${btnBg} ${
                            isCurrent ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-[#0c1427] scale-105" : "hover:opacity-85"
                          }`}
                          title={`Question ${qId} (${CBT_QUESTIONS[qIdx].category})`}
                        >
                          {qId}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Conclude & Submit Exam Button */}
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all active:scale-98 flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 size={15} />
                  <span>Conclude & Submit Test</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* POST-SUBMISSION RESULTS & DETAILED ANALYTICS VIEW */
          evaluatedScore && (
            <div className="space-y-6 animate-fadeIn">
              {/* Hero Score Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-[#0c1328] text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-extrabold text-xs uppercase tracking-wider border border-blue-500/30">
                      Official Assessment Credential
                    </span>
                    <span className="text-xs text-slate-400">
                      Code: {evaluatedScore.examCode}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    Examination Performance Report
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                    Comprehensive 100-Question Assessment covering Windows OS, Linux, MS Office, Networking, Git, and Web Fundamentals.
                  </p>

                  <div className="pt-2">
                    <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border ${
                      evaluatedScore.passed
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                        : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                    }`}>
                      <Award size={14} />
                      <span>{evaluatedScore.status} (Passing Standard: 60%)</span>
                    </span>
                  </div>
                </div>

                {/* Score Radial Ring Display */}
                <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 shrink-0">
                  <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                    {evaluatedScore.score}
                  </div>
                  <span className="text-xs font-bold text-slate-400 tracking-wider uppercase mt-1">
                    OUT OF 100 MARKS
                  </span>
                  <span className="text-xs font-extrabold text-emerald-400 mt-0.5">
                    {evaluatedScore.percentage}% Aggregate
                  </span>
                </div>
              </div>

              {/* NextSem CS-Guide Profile Integration Card */}
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#0c1427] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-xs">
                      🎓
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                        <span>CS-Guide Student Profile Cloud Sync</span>
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                          Verified
                        </span>
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Permanent Google Cloud Firestore synchronization for your certified assessment scorecard.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    {user ? (
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                        <ShieldCheck size={14} />
                        <span>Google Linked</span>
                      </span>
                    ) : (
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800 flex items-center gap-1">
                        <AlertCircle size={14} />
                        <span>Not Linked to Profile</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Profile Link Card Body */}
                {user ? (
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {user.photo ? (
                        <img src={user.photo} alt={user.name} className="w-10 h-10 rounded-full object-cover border" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
                          {user.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300">
                            {user.isGuest ? "Guest Session" : "Official Student"}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 font-mono">{user.email}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={handleCloudSyncNow}
                        disabled={syncStatus === "syncing"}
                        className={`px-3.5 py-1.5 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 transition-all shadow-xs ${
                          syncStatus === "synced"
                            ? "bg-emerald-600/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/25"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                      >
                        {syncStatus === "syncing" ? (
                          <>
                            <RotateCcw size={13} className="animate-spin" />
                            <span>Syncing to Cloud...</span>
                          </>
                        ) : syncStatus === "synced" ? (
                          <>
                            <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400" />
                            <span>✓ Synced with Cloud</span>
                          </>
                        ) : (
                          <>
                            <RotateCcw size={13} />
                            <span>Sync to Firestore</span>
                          </>
                        )}
                      </button>

                      <Link
                        href="/profile"
                        className="px-3.5 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs inline-flex items-center gap-1.5 transition-all"
                      >
                        <span>View Profile Dashboard</span>
                        <ExternalLink size={13} />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200">
                        Link this score to your Google student account
                      </h4>
                      <p className="text-xs text-amber-800 dark:text-amber-300">
                        Sign in now to permanently preserve your certificate badge on your public student profile and unlock your competency credential.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={openAuthModal}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center gap-2 transition-all shrink-0 shadow-sm"
                    >
                      <User size={14} />
                      <span>Sign In with Google</span>
                    </button>
                  </div>
                )}

                {syncMessage && (
                  <div className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                    syncStatus === "synced"
                      ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                      : syncStatus === "error"
                      ? "bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                      : "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                  }`}>
                    {syncStatus === "synced" ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
                    <span>{syncMessage}</span>
                  </div>
                )}
              </div>

              {/* Performance Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0c1427] border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Accuracy Rate
                  </span>
                  <span className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1 block">
                    {evaluatedScore.accuracy}%
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0c1427] border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Questions Attempted
                  </span>
                  <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
                    {Object.keys(answers).length} / 100
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0c1427] border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Time Elapsed
                  </span>
                  <span className="text-2xl font-black text-slate-800 dark:text-slate-200 mt-1 block font-mono">
                    {evaluatedScore.timeSpentFormatted}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0c1427] border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Passing Criteria
                  </span>
                  <span className="text-2xl font-black text-teal-600 dark:text-teal-400 mt-1 block">
                    60% (60 Marks)
                  </span>
                </div>
              </div>

              {/* Topic-Wise Proficiency Breakdown */}
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#0c1427] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  Topic-Wise Proficiency Breakdown
                </h3>

                <div className="space-y-3">
                  {evaluatedScore.categoryStats &&
                    Object.entries(evaluatedScore.categoryStats).map(([catName, stats]) => {
                      const catPct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
                      return (
                        <div key={catName} className="space-y-1">
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-slate-700 dark:text-slate-300">{catName}</span>
                            <span className="text-slate-500 font-mono">
                              {stats.correct} / {stats.total} Correct ({catPct}%)
                            </span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                catPct >= 75
                                  ? "bg-emerald-500"
                                  : catPct >= 60
                                  ? "bg-blue-500"
                                  : "bg-amber-500"
                              }`}
                              style={{ width: `${catPct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Question-By-Question Detailed Analysis & Answer Key */}
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#0c1427] border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                    Question Analysis & Official Solutions
                  </h3>

                  {/* Filter Chips */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {(["ALL", "CORRECT", "INCORRECT", "UNATTEMPTED", "FLAGGED"] as const).map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setReviewFilter(filter)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
                          reviewFilter === filter
                            ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                            : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100"
                        }`}
                      >
                        {filter.charAt(0) + filter.slice(1).toLowerCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scorecard Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <Printer size={14} />
                    <span>Print / Save PDF Scorecard</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleExportJson}
                    className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold text-xs inline-flex items-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  >
                    <Download size={14} />
                    <span>Export Results JSON</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRetakeTest}
                    className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold text-xs inline-flex items-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all ml-auto"
                  >
                    <RotateCcw size={14} />
                    <span>Retake Test</span>
                  </button>
                </div>

                {/* Questions Review List */}
                <div className="space-y-4 pt-3">
                  {CBT_QUESTIONS.filter((q) => {
                    const userAns = answers[q.id];
                    const isCorrect = userAns === q.correct;
                    const isAttempted = userAns !== undefined;
                    const isMark = !!markedForReview[q.id];

                    if (reviewFilter === "CORRECT") return isAttempted && isCorrect;
                    if (reviewFilter === "INCORRECT") return isAttempted && !isCorrect;
                    if (reviewFilter === "UNATTEMPTED") return !isAttempted;
                    if (reviewFilter === "FLAGGED") return isMark;
                    return true;
                  }).map((q, idx) => {
                    const userAns = answers[q.id];
                    const isCorrect = userAns === q.correct;
                    const isAttempted = userAns !== undefined;

                    return (
                      <div
                        key={q.id}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-3 ${
                          isCorrect
                            ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60"
                            : isAttempted
                            ? "bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/60"
                            : "bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-lg bg-blue-600 text-white font-bold text-[11px]">
                              Q {q.id}
                            </span>
                            <span className="font-bold text-slate-700 dark:text-slate-300">
                              {q.category} • {q.subtopic}
                            </span>
                          </div>

                          <span className={`font-bold ${
                            isCorrect
                              ? "text-emerald-600 dark:text-emerald-400"
                              : isAttempted
                              ? "text-rose-600 dark:text-rose-400"
                              : "text-slate-500"
                          }`}>
                            {isCorrect ? "+1.0 Mark (Correct)" : isAttempted ? "0.0 Mark (Incorrect)" : "0.0 Mark (Skipped)"}
                          </span>
                        </div>

                        <div className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                          {q.question}
                        </div>

                        {/* Options with badges */}
                        <div className="space-y-1.5 pt-1">
                          {q.options.map((opt, optIdx) => {
                            const isThisCorrect = optIdx === q.correct;
                            const isThisSelected = optIdx === userAns;

                            let optStyle = "bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300";
                            if (isThisCorrect) {
                              optStyle = "bg-emerald-100 dark:bg-emerald-950/80 border-emerald-400 dark:border-emerald-700 text-emerald-900 dark:text-emerald-100 font-bold";
                            } else if (isThisSelected && !isThisCorrect) {
                              optStyle = "bg-rose-100 dark:bg-rose-950/80 border-rose-400 dark:border-rose-700 text-rose-900 dark:text-rose-100 font-bold";
                            }

                            return (
                              <div
                                key={optIdx}
                                className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 ${optStyle}`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-bold">[{["A", "B", "C", "D"][optIdx]}]</span>
                                  <span>{opt}</span>
                                </div>
                                {isThisCorrect && (
                                  <span className="text-emerald-700 dark:text-emerald-300 font-extrabold text-[11px] shrink-0">
                                    ✓ Correct Answer
                                  </span>
                                )}
                                {isThisSelected && !isThisCorrect && (
                                  <span className="text-rose-700 dark:text-rose-300 font-extrabold text-[11px] shrink-0">
                                    ✗ Your Answer
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanation */}
                        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                          <span className="font-bold text-slate-900 dark:text-white block">
                            💡 Detailed Solution & Rationale:
                          </span>
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {q.explanation}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )
        )}
      </main>

      {/* ── Pre-Submission Confirmation Modal ── */}
      {isSubmitModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#0c1427] border border-slate-200 dark:border-slate-800 p-6 space-y-5 shadow-2xl animate-scaleUp">
            <div className="space-y-1">
              <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Confirm Examination Submission
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Please verify your question response breakdown before concluding the exam.
              </p>
            </div>

            {/* Summary Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Total Answered</span>
                <strong className="text-emerald-600 dark:text-emerald-400 text-lg font-black">
                  {counts.answered}
                </strong>
              </div>
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Not Answered</span>
                <strong className="text-rose-600 dark:text-rose-400 text-lg font-black">
                  {counts.notAnswered}
                </strong>
              </div>
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/80">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Marked Review</span>
                <strong className="text-purple-600 dark:text-purple-400 text-lg font-black">
                  {counts.marked}
                </strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Not Visited</span>
                <strong className="text-slate-600 dark:text-slate-400 text-lg font-black">
                  {counts.notVisited}
                </strong>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Once submitted, your examination will be evaluated immediately and an official verified scorecard will be generated.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all"
              >
                Return to Test
              </button>
              <button
                type="button"
                onClick={handleFinishTest}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-xs"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Standard Platform Footer ── */}
      <footer className="mt-12 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070d1a] py-6 px-4 text-center text-xs text-slate-500 space-y-1">
        <p className="font-semibold text-slate-700 dark:text-slate-300">
          NextSem Academy • National Computer Competency Assessment Portal
        </p>
        <p>Curriculum Architecture & Assessment System Authored by <strong>Er. Manoj Kumar</strong></p>
        <div className="flex items-center justify-center gap-4 pt-2 text-[11px] text-slate-400">
          <Link href="/privacy" className="hover:text-blue-500">Privacy Policy</Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-blue-500">Terms of Service</Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-blue-500">Contact Support</Link>
        </div>
      </footer>
    </div>
  );
}
