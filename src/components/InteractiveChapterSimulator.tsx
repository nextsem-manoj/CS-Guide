"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChapterSimulator, ChapterLesson, getNextChapterSimulator } from "@/data/chapterSimulators";
import { coursePhases } from "@/data/courseData";
import AdSenseBanner from "./AdSenseBanner";

interface Props {
  simulator: ChapterSimulator;
  chapterId: string;
  userEmail?: string;
}

type FeedbackStatus = "waiting" | "correct" | "wrong";
type SemmyState = "idle" | "hint" | "correct" | "wrong" | "certified";

interface HistoryLine {
  text: string;
  type: "input" | "output" | "error" | "system";
}

const renderLineWithHighlights = (text: string, defaultClass: string = "text-white") => {
  const normalized = text.replace(/`([^`]+)`/g, "'$1'");
  const parts = normalized.split(/'([^']+)'/g);
  if (parts.length === 1) {
    return <span className={defaultClass}>{text}</span>;
  }
  return (
    <span className={defaultClass}>
      {parts.map((part, index) => {
        const isQuoted = index % 2 === 1;
        if (isQuoted) {
          return (
            <span 
              key={index} 
              className="text-[#c1a648] underline decoration-2 font-black tracking-wider shadow-[0_0_8px_rgba(193,166,72,0.4)] bg-[#c1a648]/15 px-1.5 py-0.5 rounded mx-0.5"
            >
              {part}
            </span>
          );
        }
        return part;
      })}
    </span>
  );
};

export default function InteractiveChapterSimulator({ simulator, chapterId, userEmail }: Props) {
  const progressKey = `nextsem_chapter_step_${chapterId}_${userEmail || "guest"}`;
  const pointsKey = `nextsem_chapter_points_${chapterId}_${userEmail || "guest"}`;
  const certKey = `nextsem_chapter_cert_${chapterId}_${userEmail || "guest"}`;

  const [stepIdx, setStepIdx] = useState(0);
  const [points, setPoints] = useState(0);
  const [certified, setCertified] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState<FeedbackStatus>("waiting");
  const [showHint, setShowHint] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const [isWorking, setIsWorking] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device to suppress keyboard popup
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const [history, setHistory] = useState<HistoryLine[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const lessons = simulator.lessons;
  const currentLesson: ChapterLesson = lessons[Math.min(stepIdx, lessons.length - 1)];
  const router = useRouter();
  const nextChapter = getNextChapterSimulator(chapterId);

  // ── Restore progress from localStorage ─────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedStep = parseInt(localStorage.getItem(progressKey) || "0", 10);
    const savedPoints = parseInt(localStorage.getItem(pointsKey) || "0", 10);
    const savedCert = localStorage.getItem(certKey) === "true";
    setStepIdx(Math.min(savedStep, lessons.length - 1));
    setPoints(savedPoints);
    setCertified(savedCert);
  }, [chapterId]);

  // ── Print lesson instructions on step change ───────────────────────────
  useEffect(() => {
    if (certified) return;
    const lesson = lessons[stepIdx];
    if (!lesson) return;
    const lines: HistoryLine[] = [
      { text: "===================================================", type: "system" },
      { text: `📖 ${lesson.title}`, type: "system" },
      { text: "===================================================", type: "system" },
    ];
    lesson.instruction.split("\n").forEach((l) => lines.push({ text: l, type: "system" }));
    lines.push({ text: "", type: "system" });
    if (lesson.type === "mcq" && lesson.options) {
      lesson.options.forEach((o) => lines.push({ text: o, type: "system" }));
      lines.push({ text: "", type: "system" });
    }
    setHistory(lines);
    setShowHint(false);
    setFeedbackStatus("waiting");
    setInputVal("");
    setTimeout(() => terminalEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }, [stepIdx, certified]);

  // ── Auto-scroll on new history ─────────────────────────────────────────
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const focusTerminal = () => inputRef.current?.focus();

  const saveProgress = (step: number, pts: number, cert: boolean) => {
    localStorage.setItem(progressKey, step.toString());
    localStorage.setItem(pointsKey, pts.toString());
    localStorage.setItem(certKey, cert.toString());
  };

  const executeCommand = useCallback(
    (cmd: string) => {
      if (isWorking || certified) return;
      const trimmed = cmd.trim();
      if (!trimmed) return;

      // Add user input to history
      const prompt = currentLesson.type === "mcq" ? "ANSWER" : "C:\\Users\\User";
      setHistory((prev) => [...prev, { text: `${prompt}> ${trimmed}`, type: "input" }]);
      setInputVal("");
      setIsWorking(true);

      setTimeout(() => {
        const correct =
          trimmed.toLowerCase() === currentLesson.expectedInput.toLowerCase() ||
          (currentLesson.correctOption &&
            trimmed.toUpperCase() === currentLesson.correctOption);

        if (correct) {
          // Add any command outputs
          if (currentLesson.outputs) {
            setHistory((prev) => [
              ...prev,
              ...currentLesson.outputs!.map((o) => ({ text: o, type: "output" as const })),
            ]);
          }
          setHistory((prev) => [
            ...prev,
            { text: `✓ ${currentLesson.successMsg}`, type: "system" },
          ]);
          const newPoints = points + 20;
          setPoints(newPoints);
          setFeedbackStatus("correct");

          // Check if this was the last lesson
          if (stepIdx >= lessons.length - 1) {
            setCertified(true);
            saveProgress(stepIdx, newPoints, true);
          } else {
            saveProgress(stepIdx + 1, newPoints, false);
          }
        } else {
          setHistory((prev) => [
            ...prev,
            { text: `❌ Incorrect. Try again! (Hint: ${currentLesson.hint})`, type: "error" },
          ]);
          const deducted = Math.max(0, points - 5);
          setPoints(deducted);
          setFeedbackStatus("wrong");
          saveProgress(stepIdx, deducted, false);
        }
        setIsWorking(false);
      }, 400);
    },
    [isWorking, certified, currentLesson, points, stepIdx, lessons.length]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  const handleNextStep = () => {
    if (stepIdx < lessons.length - 1) {
      setStepIdx((s) => s + 1);
    }
  };

  const handleRestart = () => {
    setStepIdx(0);
    setPoints(0);
    setCertified(false);
    setHistory([]);
    setFeedbackStatus("waiting");
    setInputVal("");
    saveProgress(0, 0, false);
  };

  // ── Auto-navigate to next chapter on certification ─────────────────────
  const [countdown, setCountdown] = useState<number | null>(null);
  useEffect(() => {
    if (!certified || !nextChapter) return;
    setCountdown(5);
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c === null) return null;
        if (c <= 1) {
          clearInterval(interval);
          router.push(`/book/${nextChapter.chapterId}`);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [certified]);

  // ── Semmy state ────────────────────────────────────────────────────────
  const semmyState: SemmyState = certified
    ? "certified"
    : feedbackStatus === "correct"
    ? "correct"
    : feedbackStatus === "wrong"
    ? "wrong"
    : showHint
    ? "hint"
    : "idle";

  const progressPct = certified ? 100 : Math.round((stepIdx / lessons.length) * 100);

  return (
    <div
      className="relative w-full h-full flex flex-col bg-[#1e303f] text-white overflow-hidden"
    >
      {/* Mobile-only top ad */}
      <div className="md:hidden w-full shrink-0 px-4 pt-2">
        <AdSenseBanner />
      </div>

      {/* ── Desktop Split View Main Container ────────────────────────────── */}
      <main
        className="relative flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden bg-[#1e303f]"
        onClick={() => { if (!isMobile) focusTerminal(); }}
      >
        {/* Left Panel: Textbook Guide (Desktop Only) */}
        <div className="hidden md:flex md:w-[38%] bg-[#121d27] border-r border-[#c1a648]/15 flex-col overflow-y-auto p-6 font-sans select-none shrink-0 justify-between">
          <div className="flex flex-col gap-5">
            {/* Header info */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black tracking-widest text-[#c1a648] bg-[#c1a648]/10 border border-[#c1a648]/20 px-2.5 py-1 rounded-full uppercase">
                Lesson Guide
              </span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-sans">
                STEP {certified ? lessons.length : stepIdx + 1}/{lessons.length}
              </span>
            </div>

            {/* Lesson Title */}
            <h1 className="text-xl font-black text-white uppercase tracking-tight leading-snug mt-2 font-sans">
              {currentLesson.title}
            </h1>
            <AdSenseBanner />

            {/* Progress Divider */}
            <div className="w-12 h-1 bg-[#c1a648] rounded-full shadow-[0_0_8px_rgba(193,166,72,0.4)]" />

            {/* Textbook Instruction Card */}
            <div className="text-slate-350 text-sm leading-relaxed space-y-4 font-sans">
              {currentLesson.instruction.split("\n").map((para, pIdx) => {
                if (!para.trim()) return null;
                return (
                  <p key={pIdx} className="font-medium font-sans">
                    {renderLineWithHighlights(para, "text-slate-350")}
                  </p>
                );
              })}
            </div>

            {/* MCQ Options Display if applicable */}
            {currentLesson.type === "mcq" && currentLesson.options && (
              <div className="mt-4 flex flex-col gap-2 font-sans">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Selectable Options:</span>
                <div className="flex flex-col gap-2">
                  {currentLesson.options.map((opt, optIdx) => {
                    const letter = String.fromCharCode(65 + optIdx); // A, B, C, D
                    return (
                      <div 
                        key={optIdx} 
                        className="p-3 bg-[#121d27]/60 border border-[#c1a648]/15 rounded-xl text-xs font-bold text-slate-350 flex items-center gap-3 transition-colors hover:border-[#c1a648]/40"
                      >
                        <span className="w-5 h-5 rounded bg-[#1c2d3b] border border-[#c1a648]/20 text-[#c1a648] flex items-center justify-center text-[10px] font-black">{letter}</span>
                        <span>{opt}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <AdSenseBanner />

          {/* Bottom Card Inside Left Panel: Tips/Hints */}
          <div className="mt-8 pt-4 border-t border-[#c1a648]/10 shrink-0 font-sans">
            <div className="bg-[#c1a648]/5 border border-[#c1a648]/15 rounded-xl p-4 flex flex-col gap-2">
              <span className="text-[9px] font-black text-[#c1a648] uppercase tracking-widest flex items-center gap-1.5 font-sans">
                <span>💡</span> Learning Hint
              </span>
              <p className="text-[11px] font-bold text-slate-350 leading-relaxed font-sans">
                {currentLesson.hint}
              </p>
            </div>
          </div>
          <AdSenseBanner />
        </div>

        {/* Right Panel: Terminal Window Container */}
        <div className="flex-1 md:w-[62%] flex flex-col min-h-0 px-2 md:px-4 py-3 bg-[#1e303f]">
          <div className="w-full h-full flex flex-col rounded-2xl bg-[#121d27] border border-[#c1a648]/20 shadow-[0_0_40px_rgba(193,166,72,0.08)] overflow-hidden cursor-text select-text">
          {/* Titlebar */}
          <div className="w-full bg-[#1c1c24] pl-4 pr-0 py-0 flex items-center justify-between border-b border-slate-900 shrink-0 select-none">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black font-sans text-slate-350 tracking-wide uppercase">
                {simulator.icon} Command Prompt
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 font-sans">
                STEP {certified ? lessons.length : stepIdx + 1}/{lessons.length}
              </span>
              
              {/* Windows 11 window controls */}
              <div className="flex items-center">
                <button 
                  tabIndex={-1}
                  className="w-11 h-8 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer text-xs select-none focus:outline-none"
                >
                  ‒
                </button>
                <button 
                  tabIndex={-1}
                  className="w-11 h-8 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer text-[10px] select-none focus:outline-none"
                >
                  ⬜
                </button>
                <button 
                  onClick={() => {
                    const activeIdx = coursePhases.findIndex(p => p.topics.some(t => t.path === chapterId));
                    router.push(`/?active=${activeIdx !== -1 ? activeIdx : 0}`);
                  }}
                  className="w-11 h-8 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white transition-colors cursor-pointer text-xs select-none focus:outline-none"
                  title="Close Terminal"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          {/* Task Path Roadmap */}
          <div className="w-full bg-slate-950/60 border-b border-slate-900 px-4 py-2 flex items-center gap-2 overflow-x-auto select-none shrink-0 scrollbar-none">
            <span className="text-[8px] font-black text-slate-500 tracking-wider uppercase shrink-0 font-sans">ROADMAP:</span>
            <div className="flex items-center gap-1.5 py-0.5">
              {lessons.map((lesson, idx) => {
                const isActive = idx === stepIdx;
                const isCompleted = idx < stepIdx || certified;
                const isClickable = isCompleted && !isActive;
                return (
                  <React.Fragment key={lesson.id}>
                    {idx > 0 && (
                      <div className={`h-[2px] w-6 transition-all duration-300 ${
                        isCompleted ? "bg-[#c1a648]" : "bg-slate-800"
                      }`} />
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        if (!isClickable) return;
                        setStepIdx(idx);
                        setFeedbackStatus("waiting");
                        setShowHint(false);
                        setInputVal("");
                        setHistory([]);
                      }}
                      disabled={!isClickable}
                      title={`${lesson.title}${isClickable ? " — click to jump here" : isActive ? " (current)" : " (locked)"}`}
                      className={`relative group flex items-center justify-center w-5 h-5 rounded-full border text-[9px] font-black font-sans transition-all duration-300 ${
                        isActive
                          ? "border-[#c1a648] bg-[#c1a648]/10 text-[#c1a648] shadow-[0_0_8px_rgba(193,166,72,0.4)] scale-110"
                          : isCompleted
                          ? "border-[#c1a648] bg-[#c1a648] text-[#1e303f] cursor-pointer hover:scale-125 hover:shadow-[0_0_10px_rgba(193,166,72,0.6)] active:scale-95"
                          : "border-slate-800 bg-[#1c2d3b] text-slate-500 cursor-not-allowed"
                      }`}
                    >
                      {isCompleted && !isActive ? "✓" : idx + 1}

                      {/* Tooltip on hover */}
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-950 border border-slate-700 text-white text-[8px] font-bold px-2 py-1 rounded whitespace-nowrap shadow-xl z-50 pointer-events-none">
                        {lesson.title}
                        {isClickable && <span className="ml-1 text-[#c1a648]">↩ jump</span>}
                      </div>
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Mobile-only middle ad */}
          <div className="md:hidden w-full shrink-0">
            <AdSenseBanner />
          </div>

          {/* Terminal console */}
          <div className="flex-1 p-4 font-mono text-[16px] overflow-y-auto space-y-1.5 flex flex-col">
            {history.map((line, idx) => {
              if (line.type === "input")
                return (
                  <div key={idx} className="text-white font-bold whitespace-pre-wrap">
                    {line.text}
                  </div>
                );
              if (line.type === "error")
                return (
                  <div key={idx} className="text-red-400 font-bold bg-red-950/30 border-l-2 border-red-500 pl-2 py-0.5 rounded-r whitespace-pre-wrap">
                    {line.text}
                  </div>
                );
              if (line.type === "system") {
                const t = line.text;
                if (t.startsWith("===")) return <div key={idx} className="text-white/30">{t}</div>;
                if (t.startsWith("---")) return <div key={idx} className="text-white/20">{t}</div>;
                if (t.startsWith("📖")) return <div key={idx} className="text-white font-black text-[18px] tracking-wide mb-1">{t}</div>;
                if (t.startsWith("❓")) return <div key={idx} className="text-white font-bold">{t}</div>;
                if (t.startsWith("💡")) return <div key={idx} className="text-white font-bold">{renderLineWithHighlights(t)}</div>;
                if (t.startsWith("✓")) return <div key={idx} className="text-emerald-400 font-bold">{t}</div>;
                if (t.startsWith("❌")) return <div key={idx} className="text-red-400 font-bold">{t}</div>;
                if (t.match(/^\s+\[ [A-D] \]/)) return <div key={idx} className="text-white font-medium">{t}</div>;
                if (t.startsWith("Microsoft") || t.startsWith("(c)")) return <div key={idx} className="text-white/40">{t}</div>;
                return (
                  <div key={idx} className="text-white leading-relaxed whitespace-pre-wrap">
                    {renderLineWithHighlights(t)}
                  </div>
                );
              }
              return (
                <div key={idx} className="text-white whitespace-pre-wrap">
                  {renderLineWithHighlights(line.text)}
                </div>
              );
            })}
            <div ref={terminalEndRef} />
          </div>

          {/* Prompt row */}
          {!certified && feedbackStatus === "waiting" && (
            <div
              className={`w-full flex flex-col px-4 py-2 transition-all duration-200 ${
                !isWorking
                  ? "opacity-100 bg-[#1e303f]/20 border-l-2 border-[#c1a648]"
                  : "opacity-30 pointer-events-none"
              }`}
            >
              <form onSubmit={handleSubmit} className="flex items-center">
                <span className="shrink-0 font-bold text-white text-[16px]">
                  {currentLesson.type === "mcq" ? "ANSWER" : "C:\\Users\\User"}&gt;
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  disabled={isWorking}
                  readOnly={isMobile}
                  className="flex-1 bg-transparent border-none outline-none focus:ring-0 p-0 text-white font-bold font-mono text-[16px] ml-1.5 caret-[#c1a648]"
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  autoFocus={!isMobile}
                />
              </form>

              {/* Quick-run buttons */}
              {!isWorking && (
                <div className="mt-2.5 pt-2 border-t border-violet-900/30">
                  <span className="text-[8px] font-black text-violet-400/60 uppercase tracking-widest block mb-1.5 font-sans">
                    {currentLesson.type === "mcq" ? "⚡ Tap an option:" : "⚡ Quick run:"}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentLesson.type === "mcq"
                      ? ["A", "B", "C", "D"].map((ch, ci) => {
                          const colors = [
                            "border-sky-500/40 bg-sky-950/40 text-sky-300 hover:bg-sky-500/20",
                            "border-violet-500/40 bg-violet-950/40 text-violet-300 hover:bg-violet-500/20",
                            "border-amber-500/40 bg-amber-950/40 text-amber-300 hover:bg-amber-500/20",
                            "border-rose-500/40 bg-rose-950/40 text-rose-300 hover:bg-rose-500/20",
                          ];
                          return (
                            <button
                              key={ch}
                              type="button"
                              onClick={() => executeCommand(ch)}
                              className={`px-4 py-1.5 rounded-lg border font-sans text-[10px] font-black tracking-wider cursor-pointer active:scale-95 transition-all ${colors[ci]}`}
                            >
                              [ {ch} ]
                            </button>
                          );
                        })
                      : (currentLesson.suggestedCommands || [currentLesson.expectedInput]).map((cmd, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => executeCommand(cmd)}
                            className="px-3 py-1.5 rounded-lg border border-[#c1a648]/30 bg-[#c1a648]/5 text-[#c1a648] hover:bg-[#c1a648]/15 hover:shadow-[0_0_10px_rgba(193,166,72,0.3)] font-mono text-[10px] cursor-pointer active:scale-95 transition-all"
                          >
                            $ {cmd}
                          </button>
                        ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Hint bar */}
          {!certified && feedbackStatus === "waiting" && (currentLesson.type === "terminal" || currentLesson.hintImage) && (
            <div className="shrink-0 flex items-center gap-3 px-4 py-2.5 border-t border-violet-900/30 bg-gradient-to-r from-violet-950/50 to-slate-950/80 select-none">
              <button
                onClick={() => setShowHint((v) => !v)}
                className="px-3 py-1.5 border border-amber-500/30 bg-amber-950/30 rounded-lg text-[10px] font-bold text-amber-300 hover:bg-amber-500/20 cursor-pointer transition-all font-sans"
              >
                {showHint ? "🙈 Hide Hint" : "💡 Show Hint"}
              </button>
              {showHint && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-[10px] text-amber-300 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-lg">
                    💡 Hint: <span className="text-amber-200">{currentLesson.hint}</span>
                  </span>
                  {currentLesson.hintImage && (
                    <button
                      type="button"
                      onClick={() => setShowImageModal(true)}
                      className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-black font-black text-[9px] uppercase tracking-wider rounded cursor-pointer transition-all active:scale-95 font-sans"
                    >
                      🔍 View Screenshot
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
          {!certified && currentLesson.type === "mcq" && !currentLesson.hintImage && (
            <div className="shrink-0 px-4 py-2.5 border-t border-violet-900/30 bg-gradient-to-r from-violet-950/50 to-slate-950/80 select-none text-[10px] font-black text-violet-300 tracking-wide font-sans">
              ✏️ Type <span className="text-sky-300">A</span>, <span className="text-violet-300">B</span>, <span className="text-amber-300">C</span> or <span className="text-rose-300">D</span> and press Enter — or tap a button above
            </div>
          )}

          {/* Spacer to leave 20% space between hint/tip and feedback dock */}
          <div className="h-[4vh] shrink-0" />

          {/* Mobile-only bottom ad */}
          <div className="md:hidden w-full shrink-0 px-4">
            <AdSenseBanner />
          </div>

      {/* ── Bottom Feedback Dock ──────────────────────────────────────────── */}
      <div
        className={`w-full shrink-0 flex items-center justify-center px-4 sm:px-8 py-3.5 z-20 transition-all duration-500 min-h-[14vh] ${
          feedbackStatus === "correct" || certified
            ? "bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-950 border-t-2 border-emerald-400 shadow-[0_-8px_30px_rgba(52,211,153,0.25)]"
            : feedbackStatus === "wrong"
            ? "bg-gradient-to-r from-red-950 via-rose-950 to-red-950 border-t-2 border-red-500 shadow-[0_-8px_30px_rgba(239,68,68,0.25)]"
            : "bg-gradient-to-r from-violet-950/80 via-slate-900/90 to-indigo-950/80 border-t border-violet-800/30"
        }`}
      >
        {/* Centre: Feedback controls */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {(feedbackStatus === "correct" && !certified) && (
            <div className="flex flex-col items-center gap-2 animate-fadeInFast">
              <div className="flex items-center gap-3">
                <span className="text-3xl animate-bounce">🎉</span>
                <div>
                  <span className="text-emerald-300 font-black text-lg font-sans uppercase tracking-widest block">Correct!</span>
                  <span className="text-emerald-400/70 text-[11px] font-sans">⭐ +20 Points earned</span>
                </div>
              </div>
              <button
                onClick={() => { handleNextStep(); setFeedbackStatus("waiting"); }}
                className="mt-1 px-10 py-2.5 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all active:scale-95 shadow-[0_0_20px_rgba(52,211,153,0.5)]"
              >
                Continue →
              </button>
            </div>
          )}
          {certified && (
            <div className="flex flex-col items-center gap-2 animate-fadeInFast">
              <div className="flex items-center gap-3">
                <span className="text-3xl animate-bounce">🏆</span>
                <div>
                  <span className="text-emerald-300 font-black text-lg font-sans uppercase tracking-widest block">Chapter Complete!</span>
                  <span className="text-emerald-400/70 text-[11px] font-sans">⭐ {points} Total Points Earned!</span>
                </div>
              </div>
              {nextChapter ? (
                <div className="flex flex-col items-center gap-1.5">
                  <button
                    onClick={() => router.push(`/book/${nextChapter.chapterId}`)}
                    className="mt-1 px-8 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all active:scale-95 shadow-[0_0_20px_rgba(52,211,153,0.4)]"
                  >
                    Next Chapter: {nextChapter.chapterTitle} →
                  </button>
                  {countdown !== null && countdown > 0 && (
                    <span className="text-[9px] text-emerald-400/60 font-mono">
                      Auto-advancing in {countdown}s...
                    </span>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => {
                    const activeIdx = coursePhases.findIndex(p => p.topics.some(t => t.path === chapterId));
                    router.push(`/?active=${activeIdx !== -1 ? activeIdx : 0}`);
                  }}
                  className="mt-1 px-8 py-2.5 bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all active:scale-95"
                >
                  Back to Levels List 🏆
                </button>
              )}
              <button
                onClick={handleRestart}
                className="px-6 py-1.5 border border-slate-700 text-slate-400 hover:text-white text-[9px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 font-sans"
              >
                Restart Chapter ↺
              </button>
            </div>
          )}
          {feedbackStatus === "wrong" && (
            <div className="flex flex-col items-center gap-2 animate-fadeInFast">
              <div className="flex items-center gap-3">
                <span className="text-3xl animate-bounce">💥</span>
                <div>
                  <span className="text-red-400 font-black text-lg font-sans uppercase tracking-widest block">Incorrect!</span>
                  <span className="text-red-400/70 text-[11px] font-sans">💔 -5 Points — Try again!</span>
                </div>
              </div>
              <button
                onClick={() => { setFeedbackStatus("waiting"); inputRef.current?.focus(); }}
                className="mt-1 px-8 py-2.5 bg-gradient-to-r from-red-600/70 to-rose-600/70 text-white font-black text-xs uppercase tracking-widest rounded-xl border border-red-400/30 transition-all active:scale-95"
              >
                Try Again ↺
              </button>
            </div>
          )}
          {feedbackStatus === "waiting" && !certified && (
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-sans font-black tracking-widest bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent uppercase">
                Lesson {stepIdx + 1} of {lessons.length} — Type below &amp; press Enter ⏎
              </span>
              <div className="flex gap-1 mt-0.5 flex-wrap justify-center max-w-xs">
                {lessons.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i < stepIdx
                        ? "bg-[#c1a648]/60 w-2.5"
                        : i === stepIdx
                        ? "bg-[#c1a648] w-5 shadow-[0_0_8px_rgba(193,166,72,0.6)]"
                        : "bg-slate-700 w-2"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</main>

      {/* ── Animations ───────────────────────────────────────────────────── */}
      <style>{`
        @keyframes semmyBob {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(2deg); }
        }
        @keyframes semmyJump {
          0%, 100% { transform: translateY(0) scale(1); }
          30% { transform: translateY(-14px) scaleY(1.1) scaleX(0.9); }
          50% { transform: translateY(0) scaleY(0.95) scaleX(1.05); }
          70% { transform: translateY(-7px) scale(1); }
        }
        @keyframes semmyShake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          20%, 60% { transform: translateX(-4px) rotate(-3deg); }
          40%, 80% { transform: translateX(4px) rotate(3deg); }
        }
        @keyframes semmyThink {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg) translateY(-2px); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-semmyBob { animation: semmyBob 2s ease-in-out infinite; }
        .animate-semmyJump { animation: semmyJump 0.8s ease-in-out infinite; }
        .animate-semmyShake { animation: semmyShake 0.4s ease-in-out infinite; }
        .animate-semmyThink { animation: semmyThink 1.5s ease-in-out infinite; }
        .animate-fadeInFast { animation: fadeIn 0.15s ease-out forwards; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ── Screenshot Hint Modal ────────────────────────────────────────── */}
      {showImageModal && currentLesson.hintImage && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={() => setShowImageModal(false)}
        >
          <div
            className="relative w-full max-w-3xl mx-4 rounded-2xl overflow-hidden border border-amber-400/30 shadow-[0_0_60px_rgba(251,191,36,0.2)] flex flex-col max-h-[90vh] bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-amber-950/80 border-b border-amber-500/30">
              <div className="flex items-center gap-2">
                <span className="text-lg">📸</span>
                <span className="text-amber-300 font-black text-xs uppercase tracking-widest font-sans">
                  Lesson Screenshot — {currentLesson.title}
                </span>
              </div>
              <button
                onClick={() => setShowImageModal(false)}
                className="w-8 h-8 rounded-full bg-amber-900/60 hover:bg-amber-700/80 border border-amber-500/40 flex items-center justify-center text-amber-300 font-black text-sm cursor-pointer transition-all"
              >
                ✕
              </button>
            </div>

            {/* Screenshot Image */}
            <div className="relative bg-black flex-1 min-h-0 overflow-auto">
              <Image
                src={currentLesson.hintImage}
                alt={`Hint screenshot for ${currentLesson.title}`}
                width={1280}
                height={720}
                className="w-full h-auto object-contain"
                unoptimized
              />
            </div>

            {/* Modal Footer */}
            <div className="px-4 py-3 bg-slate-950/90 border-t border-amber-500/20 flex items-center justify-between">
              <span className="text-[10px] text-amber-400/70 font-mono">
                🔍 Zoom: pinch on mobile / scroll on desktop
              </span>
              <button
                onClick={() => setShowImageModal(false)}
                className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-black text-[10px] uppercase tracking-wider rounded-lg cursor-pointer transition-all active:scale-95 font-sans"
              >
                Got It ✓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
