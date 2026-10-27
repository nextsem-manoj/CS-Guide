"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { 
  CheckCircle2, Circle, RotateCcw, 
  Copy, Check, ArrowRight, Globe, Lightbulb, 
  Trophy, Zap
} from "lucide-react";
import { PracticalLesson, PracticalTask } from "@/data/bcaPracticalData";
import { useStudentProgress } from "@/context/StudentProgressContext";
import { triggerCelebration } from "@/lib/celebration";
import { safeInstantCopy } from "@/lib/clipboard";

interface Props {
  lesson: PracticalLesson;
  nextLesson?: PracticalLesson;
  onAllTasksPassed?: () => void;
}

interface TaskValidationResult {
  taskId: string;
  passed: boolean;
  message: string;
}

export default function PracticalTaskLiveCodingStudio({ lesson, nextLesson, onAllTasksPassed }: Props) {
  const router = useRouter();
  const { completeDayWithCodingTest } = useStudentProgress();

  // Load saved code or fallback to initialCode
  const storageKey = `nextsem_practical_code_day_${lesson.day}`;
  const [code, setCode] = useState<string>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved && saved.trim()) return saved;
      } catch {
        // ignore
      }
    }
    return lesson.practicalLab.initialCode;
  });

  const [copiedCode, setCopiedCode] = useState(false);
  const [previewTab, setPreviewTab] = useState<"live" | "expected">("live");
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  
  // Auto-advance countdown state
  const [countdown, setCountdown] = useState<number | null>(null);
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // File names based on lesson language
  const primaryFile = lesson.practicalLab.language === "css" 
    ? "style.css" 
    : lesson.practicalLab.language === "c" 
    ? "main.c" 
    : "index.html";

  // Validate tasks against code in real time as user types
  const validationResults = useMemo<TaskValidationResult[]>(() => {
    const normalizedCode = code.replace(/\r\n/g, "\n");

    return lesson.practicalLab.tasks.map((task: PracticalTask) => {
      // 1. Keyword validation
      if (task.validatorKeywords && task.validatorKeywords.length > 0) {
        const missing = task.validatorKeywords.find(kw => !normalizedCode.includes(kw));
        if (missing) {
          return {
            taskId: task.id,
            passed: false,
            message: `Requires keyword: ${missing}`
          };
        }
      }

      // 2. Regex validation
      if (task.validatorRegex) {
        try {
          const regex = new RegExp(task.validatorRegex, "i");
          if (!regex.test(normalizedCode)) {
            return {
              taskId: task.id,
              passed: false,
              message: "Code syntax does not match required task pattern yet."
            };
          }
        } catch {
          // ignore regex errors
        }
      }

      return {
        taskId: task.id,
        passed: true,
        message: "Requirement verified!"
      };
    });
  }, [code, lesson.practicalLab.tasks]);

  const totalTasks = lesson.practicalLab.tasks.length;
  const passedTasksCount = validationResults.filter(r => r.passed).length;
  const allTasksPassed = totalTasks > 0 && passedTasksCount === totalTasks;

  // Persist typed code to localStorage
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    try {
      localStorage.setItem(storageKey, newCode);
    } catch {
      // ignore
    }
  };

  // Support Tab key indentation in editor
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);

      // Restore cursor position
      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      });
    }
  };

  const handleResetCode = () => {
    if (confirm("Reset editor to initial template? Your current edits will be cleared.")) {
      setCode(lesson.practicalLab.initialCode);
      try {
        localStorage.removeItem(storageKey);
      } catch {
        // ignore
      }
    }
  };

  const handleCopyCode = () => {
    safeInstantCopy(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const toggleHint = (taskId: string) => {
    setShowHints(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  // When all tasks pass: trigger celebration, unlock day, and start 2-second countdown to next lesson!
  useEffect(() => {
    if (allTasksPassed && !hasCelebrated) {
      setHasCelebrated(true);
      triggerCelebration();

      // Mark completed & unlock next lesson in StudentProgressContext
      completeDayWithCodingTest(lesson.day);
      if (onAllTasksPassed) onAllTasksPassed();

      // Start 2-second countdown
      setCountdown(2);
    }
  }, [allTasksPassed, hasCelebrated, lesson.day, completeDayWithCodingTest, onAllTasksPassed]);

  // Countdown timer effect
  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      timerRef.current = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0 && nextLesson) {
      // Auto-advance to next lesson!
      router.push(`/bca/practical/${nextLesson.slug}`);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [countdown, nextLesson, router]);

  const handleAdvanceNow = () => {
    if (nextLesson) {
      router.push(`/bca/practical/${nextLesson.slug}`);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-black overflow-hidden shadow-sm transition-all mb-8">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 bg-slate-50 dark:bg-neutral-950 border-b border-slate-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Zap size={18} />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Interactive Coding Test
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 font-bold">
                Auto-Evaluates as you type
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-black text-black dark:text-white">
              Day {lesson.day} Practical Task Test Studio
            </h3>
          </div>
        </div>

        {/* Progress & Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-bold">
            <span className="text-slate-500 dark:text-slate-400">Test Score:</span>
            <span className={`font-mono font-black ${allTasksPassed ? "text-emerald-600 dark:text-emerald-400" : "text-blue-600 dark:text-blue-400"}`}>
              {passedTasksCount} / {totalTasks} Passed
            </span>
          </div>

          <button
            type="button"
            onClick={handleResetCode}
            className="p-2 rounded-xl bg-white dark:bg-neutral-900 hover:bg-slate-100 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-all cursor-pointer"
            title="Reset code to initial template"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* SUCCESS & AUTO-ADVANCE BANNER (Glows when 100% correct!) */}
      {allTasksPassed && (
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Trophy size={20} className="text-white" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-extrabold text-emerald-100">
                100% Correct • All Practical Tasks Passed!
              </div>
              <div className="text-sm sm:text-base font-black">
                {nextLesson ? (
                  <span>
                    Advancing to <strong className="underline underline-offset-2">Day {nextLesson.day}: {nextLesson.title}</strong> in {countdown ?? 2}s...
                  </span>
                ) : (
                  <span>Congratulations! You completed the final practical milestone of this sprint!</span>
                )}
              </div>
            </div>
          </div>

          {nextLesson && (
            <button
              type="button"
              onClick={handleAdvanceNow}
              className="px-5 py-2.5 rounded-xl bg-white text-emerald-700 hover:bg-emerald-50 font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
            >
              <span>Go to Next Lesson (Day {nextLesson.day}) Now</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      )}

      {/* Main 2-Column Split: Left = Test & Code Editor; Right = Live Browser Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* ── LEFT SIDE: PRACTICAL TASKS & LIVE HTML/CSS CODE EDITOR (7 Cols) ── */}
        <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-neutral-800 flex flex-col bg-slate-50/50 dark:bg-neutral-950">
          {/* 1. Tasks Checklist with Live Badges */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-neutral-800 bg-white dark:bg-black">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                1. Practical Task Specifications &amp; Live Test Checklist:
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                Type code below to pass tests
              </span>
            </div>

            <div className="space-y-2.5">
              {lesson.practicalLab.tasks.map((task: PracticalTask, idx: number) => {
                const result = validationResults.find(r => r.taskId === task.id);
                const isPassed = Boolean(result?.passed);
                const isHintOpen = Boolean(showHints[task.id]);

                return (
                  <div
                    key={task.id}
                    className={`p-3 rounded-xl border transition-all ${
                      isPassed
                        ? "bg-emerald-500/10 border-emerald-500/40 text-black dark:text-white"
                        : "bg-slate-50 dark:bg-neutral-900/60 border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5 flex-1 min-w-0">
                        <span className={`mt-0.5 shrink-0 ${isPassed ? "text-emerald-500" : "text-slate-400"}`}>
                          {isPassed ? <CheckCircle2 size={16} className="fill-emerald-500 text-white dark:text-black" /> : <Circle size={16} />}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-black uppercase px-1.5 py-0.2 rounded bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-slate-300">
                              Task {idx + 1}
                            </span>
                            <span className={`text-xs font-black truncate ${isPassed ? "text-emerald-600 dark:text-emerald-400" : "text-black dark:text-white"}`}>
                              {task.title}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            {task.instruction}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                            isPassed
                              ? "bg-emerald-500 text-white"
                              : "bg-slate-200 dark:bg-neutral-800 text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          {isPassed ? "✔ PASSED" : "⏳ WAITING"}
                        </span>

                        {task.hint && (
                          <button
                            type="button"
                            onClick={() => toggleHint(task.id)}
                            className="p-1 rounded text-slate-400 hover:text-blue-500 transition-colors"
                            title="Toggle hint"
                          >
                            <Lightbulb size={13} />
                          </button>
                        )}
                      </div>
                    </div>

                    {isHintOpen && task.hint && (
                      <div className="mt-2 pt-2 border-t border-slate-200 dark:border-neutral-800 text-[11px] font-mono text-blue-600 dark:text-blue-400 bg-white/60 dark:bg-black/60 p-2 rounded-lg">
                        💡 Hint: {task.hint}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Interactive Code Editor Container */}
          <div className="flex-1 flex flex-col p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  2. Type HTML &amp; CSS Code:
                </span>
                <span className="px-2 py-0.5 rounded bg-neutral-900 text-emerald-400 font-mono text-[11px] font-bold border border-neutral-800">
                  {primaryFile}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                  <span>{copiedCode ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Code Textarea Editor */}
            <div className="flex-1 rounded-xl overflow-hidden border border-slate-300 dark:border-neutral-800 bg-neutral-950 flex flex-col shadow-inner min-h-[300px]">
              <div className="px-3 py-1.5 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="text-white font-bold ml-1">{primaryFile}</span>
                </div>
                <span className="text-emerald-400 font-bold uppercase text-[10px]">
                  ⚡ Real-Time Testing Active
                </span>
              </div>

              <textarea
                value={code}
                onChange={handleCodeChange}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                placeholder="Type your HTML and CSS code here..."
                className="w-full flex-1 p-4 bg-neutral-950 text-white font-mono text-xs sm:text-sm leading-relaxed resize-none outline-none border-none min-h-[280px]"
              />

              <div className="px-3 py-1.5 bg-neutral-900 border-t border-neutral-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Tab inserts 2 spaces • Live DOM refresh</span>
                <span>{code.length} chars</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT SIDE: REAL-TIME LIVE BROWSER PREVIEW (5 Cols) ── */}
        <div className="lg:col-span-5 flex flex-col bg-slate-100 dark:bg-neutral-900/60 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Live Browser Output:
            </span>

            {/* Preview Mode Switcher */}
            <div className="inline-flex p-0.5 rounded-lg bg-slate-200 dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setPreviewTab("live")}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  previewTab === "live"
                    ? "bg-white dark:bg-neutral-950 text-emerald-600 dark:text-emerald-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
                }`}
              >
                🌐 Your Output
              </button>
              <button
                type="button"
                onClick={() => setPreviewTab("expected")}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  previewTab === "expected"
                    ? "bg-white dark:bg-neutral-950 text-blue-600 dark:text-blue-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
                }`}
              >
                🎯 Expected Target
              </button>
            </div>
          </div>

          {/* Browser Chrome Container */}
          <div className="flex-1 flex flex-col rounded-xl border border-slate-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden shadow-sm">
            {/* Browser Address Bar */}
            <div className="px-3 py-2 bg-slate-200/90 dark:bg-neutral-900 border-b border-slate-300 dark:border-neutral-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
              </div>

              <div className="flex-1 max-w-xs truncate text-[11px] font-mono px-2 py-0.5 rounded bg-white dark:bg-neutral-950 border border-slate-300 dark:border-neutral-800 text-slate-600 dark:text-slate-400 text-center">
                🔒 http://localhost:5500/{primaryFile}
              </div>

              <span className="text-[10px] font-bold text-slate-500 uppercase shrink-0">
                {previewTab === "live" ? "Live" : "Target"}
              </span>
            </div>

            {/* Live iframe */}
            <div className="flex-1 p-2 sm:p-3 bg-white flex flex-col min-h-[360px]">
              <iframe
                title="Live Output Preview"
                srcDoc={previewTab === "live" ? code : lesson.teacherDemo.code}
                sandbox="allow-scripts"
                className="w-full flex-1 min-h-[340px] bg-white border border-slate-200 rounded-lg shadow-inner"
              />
            </div>

            {/* Output Footer Note */}
            <div className="p-3 bg-slate-50 dark:bg-neutral-950 border-t border-slate-200 dark:border-neutral-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-2">
              <Globe size={13} className="text-emerald-500 shrink-0" />
              <span>
                {previewTab === "live"
                  ? "Renders live HTML & CSS typed on the left."
                  : "Target output expected for this practical lesson."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
