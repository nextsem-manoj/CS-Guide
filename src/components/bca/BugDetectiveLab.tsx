"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  Bug, Search, CheckCircle2, AlertTriangle, Sparkles, Copy, 
  Check, RotateCcw, ShieldAlert, Lightbulb, Eye, Code2, 
  ArrowRight, Award, Zap
} from "lucide-react";
import { useCrossDeviceSync } from "@/context/CrossDeviceSyncContext";
import { safeInstantCopy } from "@/lib/clipboard";

interface BugDetectiveLabProps {
  day: number;
  title: string;
  buggyCode: string;
  bugExplanation: string;
  fixedCode: string;
}

export default function BugDetectiveLab({
  day,
  title,
  buggyCode,
  bugExplanation,
  fixedCode,
}: BugDetectiveLabProps) {
  const [activeTab, setActiveTab] = useState<"interactive" | "diff" | "fixed">("interactive");
  const [selectedLineIndex, setSelectedLineIndex] = useState<number | null>(null);
  const [isBugFound, setIsBugFound] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [copiedFix, setCopiedFix] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [wordWrap, setWordWrap] = useState<boolean>(true);

  // Check saved state from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(`nextsem_bca_bug_squashed_day_${day}`);
        if (saved === "true") {
          setIsBugFound(true);
        }
      } catch (e) {}
    }
  }, [day]);

  // Split lines for line-by-line inspection
  const buggyLines = useMemo(() => buggyCode.trim().split("\n"), [buggyCode]);
  const fixedLines = useMemo(() => fixedCode.trim().split("\n"), [fixedCode]);

  // Identify which lines contain bugs by comparing with fixed lines
  const bugLineIndices = useMemo(() => {
    const indices: number[] = [];
    buggyLines.forEach((line, idx) => {
      const trimmed = line.trim();
      const matchingFixed = fixedLines[idx]?.trim();
      if (trimmed !== matchingFixed) {
        indices.push(idx);
      }
    });
    // Fallback: If lengths differ or none found, default to last or first non-empty line
    if (indices.length === 0) {
      indices.push(Math.max(0, buggyLines.length - 1));
    }
    return indices;
  }, [buggyLines, fixedLines]);

  const handleLineClick = (idx: number) => {
    setSelectedLineIndex(idx);
    setAttempts((prev) => prev + 1);

    if (bugLineIndices.includes(idx) || buggyLines.length === 1) {
      setIsBugFound(true);
      setFeedbackMsg(`🎯 BINGO! You spotted the bug on Line ${idx + 1}!`);
      try {
        localStorage.setItem(`nextsem_bca_bug_squashed_day_${day}`, "true");
      } catch (e) {}
    } else {
      setFeedbackMsg(`Line ${idx + 1} looks clean! Inspect the other lines carefully. 🔍`);
    }
  };

  const handleRevealSolution = () => {
    setIsBugFound(true);
    setSelectedLineIndex(bugLineIndices[0] ?? 0);
    setActiveTab("diff");
    setFeedbackMsg("Solution revealed! Study the line-by-line diff below.");
  };

  const handleResetChallenge = () => {
    setSelectedLineIndex(null);
    setIsBugFound(false);
    setShowHint(false);
    setFeedbackMsg(null);
    setActiveTab("interactive");
    try {
      localStorage.removeItem(`nextsem_bca_bug_squashed_day_${day}`);
    } catch (e) {}
  };

  let copyAndSyncToCloud: ((text: string, label?: string) => boolean) | null = null;
  try {
    const sync = useCrossDeviceSync();
    copyAndSyncToCloud = sync?.copyAndSyncToCloud || null;
  } catch {}

  const handleCopyFix = () => {
    if (copyAndSyncToCloud) {
      copyAndSyncToCloud(fixedCode, `Day ${day} Bug Hunt Fixed Code`);
    } else {
      safeInstantCopy(fixedCode);
    }
    setCopiedFix(true);
    setTimeout(() => setCopiedFix(false), 2000);
  };

  // Helper to format inline code formatting in explanation
  const renderFormattedExplanation = (text: string) => {
    const parts = text.split(/(`[^`]+`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={i}
            className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-neutral-800 text-blue-700 dark:text-blue-300 font-mono text-[11px] font-bold border border-blue-200 dark:border-neutral-700 mx-0.5"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <section className="rounded-3xl bg-white dark:bg-neutral-950 border-2 border-blue-600/40 dark:border-blue-500/30 p-5 sm:p-7 mb-8 shadow-lg relative overflow-hidden transition-all">
      {/* Background Accent Glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* ── TOP HEADER: Detective Badge & Actions ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-200 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-blue-600 text-white shadow-sm flex items-center justify-center">
              <Bug size={18} />
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-50 dark:bg-neutral-900 border border-blue-200 dark:border-neutral-800 text-blue-600 dark:text-blue-400">
                Interactive Bug Detective
              </span>
              {isBugFound && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 flex items-center gap-1 animate-pulse">
                  <CheckCircle2 size={12} />
                  <span>Bug Squashed (+50 XP)</span>
                </span>
              )}
            </div>
          </div>
          <h3 className="text-base sm:text-lg font-black text-black dark:text-white tracking-tight">
            {title || "Spot-the-Error: Debugging Challenge"}
          </h3>
        </div>

        {/* View Switcher / Solution Toggle */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto flex-wrap">
          <button
            type="button"
            onClick={() => setWordWrap(!wordWrap)}
            className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
            title="Toggle word wrap to fit small screens without horizontal scroll"
          >
            Wrap: {wordWrap ? "ON" : "OFF"}
          </button>

          {!isBugFound ? (
            <button
              type="button"
              onClick={handleRevealSolution}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs transition-all active:scale-95 shadow-sm cursor-pointer flex items-center gap-1"
            >
              <Eye size={13} />
              <span>Reveal Fix</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleResetChallenge}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1"
            >
              <RotateCcw size={12} />
              <span>Retry</span>
            </button>
          )}
        </div>
      </div>

      {/* ── INTERACTIVE VIEW SWITCHER TABS ── */}
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-neutral-900 p-1 rounded-2xl border border-slate-200 dark:border-neutral-800 mb-4 text-xs font-bold w-full sm:w-auto overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("interactive")}
          className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "interactive"
              ? "bg-white dark:bg-black text-blue-600 dark:text-blue-400 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
          }`}
        >
          <Search size={13} />
          <span>1. Detective Hunt</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("diff")}
          className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "diff"
              ? "bg-white dark:bg-black text-blue-600 dark:text-blue-400 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
          }`}
        >
          <Zap size={13} />
          <span>2. Visual Diff</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("fixed")}
          className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "fixed"
              ? "bg-white dark:bg-black text-blue-600 dark:text-blue-400 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
          }`}
        >
          <CheckCircle2 size={13} />
          <span>3. Verified Fix</span>
        </button>
      </div>

      {/* ── TAB 1: DETECTIVE HUNT (INTERACTIVE LINE-BY-LINE INSPECTION) ── */}
      {activeTab === "interactive" && (
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-700 dark:text-slate-300">
            <p className="flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping inline-block" />
              <span>Tap or click on the exact line below that contains the error:</span>
            </p>
            <span className="text-[11px] text-slate-500 font-mono">
              {attempts > 0 ? `${attempts} inspection attempts` : "Click any code line"}
            </span>
          </div>

          {/* Code Window with Clickable Lines */}
          <div className="rounded-2xl border border-slate-300 dark:border-neutral-800 bg-neutral-950 overflow-hidden shadow-inner font-mono text-xs">
            <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-b border-neutral-800 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-slate-300 font-bold ml-2">⚠️ Broken Code Inspector</span>
              </div>
              <span className="text-[10px] text-amber-400 font-mono">Tap buggy line</span>
            </div>

            <div className={`p-2 sm:p-3 divide-y divide-neutral-900 ${wordWrap ? "overflow-x-hidden" : "overflow-x-auto"}`}>
              {buggyLines.map((line, idx) => {
                const isBugLine = bugLineIndices.includes(idx);
                const isSelected = selectedLineIndex === idx;

                let rowStyle = "hover:bg-neutral-900/90 text-slate-200 cursor-pointer";
                if (isSelected && isBugLine) {
                  rowStyle = "bg-rose-950/60 border-l-4 border-rose-500 text-rose-200 font-bold";
                } else if (isSelected && !isBugLine) {
                  rowStyle = "bg-amber-950/40 border-l-4 border-amber-500 text-amber-200";
                } else if (isBugFound && isBugLine) {
                  rowStyle = "bg-rose-950/40 border-l-4 border-rose-500 text-rose-200";
                }

                return (
                  <div
                    key={idx}
                    onClick={() => handleLineClick(idx)}
                    className={`flex items-start gap-3 py-1.5 px-2 rounded-lg transition-all ${rowStyle}`}
                    title="Click to inspect this line"
                  >
                    <span className="w-6 text-right select-none text-slate-600 font-mono text-[11px] shrink-0">
                      {idx + 1}
                    </span>
                    <div className={`flex-1 ${wordWrap ? "whitespace-pre-wrap break-all sm:break-words" : "whitespace-pre"}`}>
                      <code>{line || " "}</code>
                    </div>
                    {isSelected && isBugLine && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-black bg-rose-600 text-white shrink-0 self-center">
                        BUG! 🎯
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Feedback Message Banner */}
          {feedbackMsg && (
            <div
              className={`p-3.5 rounded-2xl border text-xs flex items-center justify-between gap-3 animate-fade-in ${
                isBugFound
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold"
                  : "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 font-medium"
              }`}
            >
              <div className="flex items-center gap-2">
                {isBugFound ? <CheckCircle2 size={16} className="text-emerald-600 shrink-0" /> : <AlertTriangle size={16} className="text-amber-600 shrink-0" />}
                <span>{feedbackMsg}</span>
              </div>

              {isBugFound && (
                <button
                  type="button"
                  onClick={() => setActiveTab("diff")}
                  className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shrink-0 cursor-pointer shadow-sm flex items-center gap-1"
                >
                  <span>Inspect Diff</span>
                  <ArrowRight size={13} />
                </button>
              )}
            </div>
          )}

          {/* Detective Clue Card */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Lightbulb size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
              <span>
                {showHint
                  ? "💡 Detective Clue: Check for missing attributes, unclosed elements, or security vulnerabilities in external references."
                  : "Stuck? Need a detective clue before checking the solution?"}
              </span>
            </div>
            {!showHint && (
              <button
                type="button"
                onClick={() => setShowHint(true)}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0 cursor-pointer"
              >
                Show Clue
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── TAB 2: VISUAL GIT-STYLE DIFF (SIDE-BY-SIDE OR MORPH) ── */}
      {activeTab === "diff" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-300 dark:border-neutral-800 bg-neutral-950 overflow-hidden shadow-inner font-mono text-xs">
            <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-b border-neutral-800 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="text-white font-bold">Forensic Diff: Broken vs Verified Fix</span>
              </div>
              <span className="text-slate-400 text-[10px]">Red = Remove • Green = Add</span>
            </div>

            <div className="p-2 sm:p-3 divide-y divide-neutral-900">
              {/* Broken Code Diff Block */}
              <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-900/60 mb-2">
                <div className="text-[10px] font-black text-rose-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <span>-</span>
                  <span>Broken Snippet:</span>
                </div>
                <div className={`${wordWrap ? "whitespace-pre-wrap break-all sm:break-words overflow-x-hidden" : "overflow-x-auto"} text-rose-200 leading-relaxed`}>
                  <code className="whitespace-pre-wrap break-all sm:break-words">{buggyCode}</code>
                </div>
              </div>

              {/* Verified Fix Diff Block */}
              <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-900/60">
                <div className="text-[10px] font-black text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <span>+</span>
                  <span>Verified Correction:</span>
                </div>
                <div className={`${wordWrap ? "whitespace-pre-wrap break-all sm:break-words overflow-x-hidden" : "overflow-x-auto"} text-emerald-200 leading-relaxed font-bold`}>
                  <code className="whitespace-pre-wrap break-all sm:break-words">{fixedCode}</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: VERIFIED FIX & 1-CLICK COPY ── */}
      {activeTab === "fixed" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-300 dark:border-neutral-800 bg-neutral-950 overflow-hidden shadow-inner font-mono text-xs">
            <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-b border-neutral-800 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-white font-bold">✔ Ready-to-Use Verified Solution</span>
              </div>
              <button
                type="button"
                onClick={handleCopyFix}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-slate-200 text-[11px] font-bold cursor-pointer transition-all"
              >
                {copiedFix ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>{copiedFix ? "Copied!" : "Copy Code"}</span>
              </button>
            </div>

            <div className={`p-4 ${wordWrap ? "whitespace-pre-wrap break-all sm:break-words overflow-x-hidden" : "overflow-x-auto"} text-emerald-300 leading-relaxed`}>
              <code className="whitespace-pre-wrap break-all sm:break-words">{fixedCode}</code>
            </div>
          </div>
        </div>
      )}

      {/* ── SENIOR DEVELOPER FORENSIC EXPLANATION CARD (ALWAYS VISIBLE WHEN INSPECTING) ── */}
      <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-blue-50/70 dark:bg-neutral-900/80 border border-blue-200 dark:border-neutral-800 space-y-3">
        <div className="flex items-start gap-2.5">
          <ShieldAlert size={18} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs sm:text-sm font-black text-black dark:text-white mb-1">
              Senior Developer Forensic Analysis:
            </h4>
            <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
              <p>{renderFormattedExplanation(bugExplanation)}</p>
            </div>
          </div>
        </div>

        {/* Golden Rule Takeaway Pill */}
        <div className="pt-2 border-t border-blue-200 dark:border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-black dark:text-white">
            <Award size={14} className="text-blue-600 dark:text-blue-400" />
            <span>Golden Rule: Always validate code syntax and security attributes before pushing to GitHub!</span>
          </div>

          <button
            type="button"
            onClick={handleCopyFix}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto shrink-0"
          >
            {copiedFix ? <Check size={13} /> : <Copy size={13} />}
            <span>{copiedFix ? "Copied Fix!" : "Copy Verified Fix"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
