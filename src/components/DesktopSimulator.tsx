"use client";

/**
 * DesktopSimulator.tsx
 * Day 2 (Upgraded) — Real action detection
 *
 * Interactive guided overlay that:
 * - Renders a mini Windows desktop sandbox
 * - Detects real mouse/keyboard events (click, dblclick, contextmenu, keydown)
 * - Auto-advances on correct action, deducts hearts on wrong action
 * - Manages XP/hearts, persists progress to localStorage
 */

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  desktopSimulatorSteps,
  isSimulatorComplete,
  getTotalXP,
  type DesktopSimulatorStep,
} from "../data/desktopSimulatorSteps";
import {
  Heart, Star, Trophy, ChevronRight, Lightbulb, X,
  CheckCircle2, AlertCircle, Monitor,
} from "lucide-react";

// ─── Constants ─────────────────────────────────────────────────────────────

const MAX_HEARTS = 5;
const HINT_DELAY_MS = 10000;

const progressKey  = (e: string) => `nextsem_desktop_sim_progress_${e}`;
const heartsKey    = (e: string) => `nextsem_desktop_sim_hearts_${e}`;
const certKey      = (e: string) => `nextsem_desktop_sim_certified_${e}`;

// ─── Types ─────────────────────────────────────────────────────────────────

interface SimulatorProps {
  userEmail: string;
  onComplete?: () => void;
  onClose?: () => void;
}

interface FeedbackState {
  type: "success" | "error" | null;
  message: string;
}

// ─── Desktop Icon definitions ──────────────────────────────────────────────

interface DesktopIcon {
  id: string;
  label: string;
  emoji: string;
  bg: string;
}

const DESKTOP_ICONS: DesktopIcon[] = [
  { id: "recycle-bin-icon",   label: "Recycle Bin",   emoji: "🗑️", bg: "from-slate-600/40 to-slate-700/40" },
  { id: "file-explorer-icon", label: "File Explorer", emoji: "📁", bg: "from-amber-600/30 to-yellow-700/30" },
  { id: "documents-folder",   label: "Documents",     emoji: "📄", bg: "from-blue-600/30 to-indigo-700/30"  },
  { id: "start-button",       label: "Start Menu",    emoji: "🪟", bg: "from-blue-500/30 to-cyan-600/30"    },
];

// ─── Action label map ───────────────────────────────────────────────────────

const ACTION_LABEL: Record<string, string> = {
  "click":        "👆 Single-Click",
  "double-click": "👆👆 Double-Click",
  "right-click":  "🖱️ Right-Click",
  "drag":         "✋ Drag the icon",
  "keyboard":     "⌨️ Press the key",
  "hover":        "🎯 Hover over it",
  "mcq":          "🧠 Pick an answer",
};

const DIFFICULTY_COLOR: Record<string, string> = {
  beginner: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  easy:     "bg-blue-500/15 text-blue-400 border-blue-500/30",
  medium:   "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

const CATEGORY_EMOJI: Record<string, string> = {
  "desktop":       "🖥️",
  "start-menu":    "🪟",
  "taskbar":       "📌",
  "file-explorer": "📁",
  "terminal":      "💻",
  "recycle-bin":   "🗑️",
  "shortcuts":     "⌨️",
};

// ─── Mini Context Menu ──────────────────────────────────────────────────────

function ContextMenu({ x, y, onClose }: { x: number; y: number; onClose: () => void }) {
  return (
    <div
      className="absolute z-50 bg-[#1e2a3a] border border-white/10 rounded-xl shadow-2xl py-1 min-w-[160px] text-xs"
      style={{ left: x, top: y }}
    >
      {["Open", "Properties", "Rename", "Copy", "Delete"].map((item) => (
        <button
          key={item}
          onClick={onClose}
          className="w-full text-left px-3 py-1.5 text-slate-300 hover:bg-white/8 transition-colors"
        >
          {item}
        </button>
      ))}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function DesktopSimulator({ userEmail, onComplete, onClose }: SimulatorProps) {

  // ── State ──────────────────────────────────────────────────────────
  const [completedIds,    setCompletedIds]    = useState<string[]>([]);
  const [currentStepIdx,  setCurrentStepIdx]  = useState(0);
  const [hearts,          setHearts]          = useState(MAX_HEARTS);
  const [totalXP,         setTotalXP]         = useState(0);
  const [feedback,        setFeedback]        = useState<FeedbackState>({ type: null, message: "" });
  const [hintVisible,     setHintVisible]     = useState(false);
  const [showHintAuto,    setShowHintAuto]    = useState(false);
  const [mcqAnswer,       setMCQAnswer]       = useState<{ selected: string | null; submitted: boolean }>({ selected: null, submitted: false });
  const [isComplete,      setIsComplete]      = useState(false);
  const [xpGained,        setXpGained]        = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isMinimized,     setIsMinimized]     = useState(false);
  const [contextMenu,     setContextMenu]     = useState<{ x: number; y: number } | null>(null);
  const [highlightedIcon, setHighlightedIcon] = useState<string | null>(null);
  const [keyPressed,      setKeyPressed]      = useState<string | null>(null);

  const hintTimer     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sandboxRef    = useRef<HTMLDivElement>(null);

  const step       = desktopSimulatorSteps[currentStepIdx];
  const totalSteps = desktopSimulatorSteps.length;

  // ── Load saved progress ────────────────────────────────────────────
  useEffect(() => {
    if (!userEmail) return;
    const savedIds   = localStorage.getItem(progressKey(userEmail));
    const savedHearts = localStorage.getItem(heartsKey(userEmail));
    const certified  = localStorage.getItem(certKey(userEmail));
    if (certified === "true") { setIsComplete(true); return; }
    if (savedIds) {
      const ids: string[] = JSON.parse(savedIds);
      setCompletedIds(ids);
      const next = desktopSimulatorSteps.findIndex((s) => !ids.includes(s.id));
      if (next >= 0) setCurrentStepIdx(next);
    }
    if (savedHearts) setHearts(Math.max(0, parseInt(savedHearts, 10)));
  }, [userEmail]);

  // ── Auto-hint timer ────────────────────────────────────────────────
  useEffect(() => {
    setShowHintAuto(false);
    setHintVisible(false);
    setContextMenu(null);
    setKeyPressed(null);
    if (hintTimer.current) clearTimeout(hintTimer.current);
    hintTimer.current = setTimeout(() => setShowHintAuto(true), HINT_DELAY_MS);
    return () => { if (hintTimer.current) clearTimeout(hintTimer.current); };
  }, [currentStepIdx]);

  // ── Highlight the target icon ──────────────────────────────────────
  useEffect(() => {
    const target = step?.targetElement?.replace("#", "");
    const iconIds = DESKTOP_ICONS.map((i) => i.id);
    setHighlightedIcon(iconIds.includes(target) ? target : null);
  }, [step]);

  // ── Save progress ──────────────────────────────────────────────────
  const saveProgress = useCallback((ids: string[], h: number) => {
    if (!userEmail) return;
    localStorage.setItem(progressKey(userEmail), JSON.stringify(ids));
    localStorage.setItem(heartsKey(userEmail), String(h));
  }, [userEmail]);

  // ── Flash feedback ─────────────────────────────────────────────────
  const flashFeedback = useCallback((type: "success" | "error", msg: string) => {
    setFeedback({ type, message: msg });
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => setFeedback({ type: null, message: "" }), 2800);
  }, []);

  // ── Complete a step ────────────────────────────────────────────────
  const completeStep = useCallback((s: DesktopSimulatorStep) => {
    setCompletedIds((prev) => {
      const next = [...prev, s.id];
      saveProgress(next, hearts);
      setTotalXP((x) => x + s.xpReward);
      setXpGained(s.xpReward);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1600);
      flashFeedback("success", s.successMsg);

      if (isSimulatorComplete(next)) {
        setTimeout(() => {
          setIsComplete(true);
          if (userEmail) localStorage.setItem(certKey(userEmail), "true");
          onComplete?.();
        }, 2000);
        return next;
      }

      setTimeout(() => {
        setCurrentStepIdx((idx) => Math.min(idx + 1, totalSteps - 1));
        setMCQAnswer({ selected: null, submitted: false });
      }, 1800);
      return next;
    });
  }, [flashFeedback, hearts, onComplete, saveProgress, totalSteps, userEmail]);

  // ── Deduct heart ───────────────────────────────────────────────────
  const deductHeart = useCallback((penalty: number) => {
    if (penalty <= 0) return;
    setHearts((h) => {
      const next = Math.max(0, h - penalty);
      saveProgress(completedIds, next);
      return next;
    });
    flashFeedback("error", "Not quite right! Try the correct action. 💔");
  }, [completedIds, flashFeedback, saveProgress]);

  // ── Validate action against step ──────────────────────────────────
  const validateAction = useCallback((performed: string, targetId?: string) => {
    if (!step) return;
    const targetOk = !targetId || step.targetElement === `#${targetId}` || step.targetElement === "#desktop-bg";
    const actionOk = performed === step.action;

    if (actionOk && targetOk) {
      completeStep(step);
    } else if (!actionOk) {
      deductHeart(step.heartPenalty);
    }
  }, [completeStep, deductHeart, step]);

  // ── Sandbox event handlers ─────────────────────────────────────────

  const handleSandboxClick = (e: React.MouseEvent, iconId?: string) => {
    e.stopPropagation();
    setContextMenu(null);
    validateAction("click", iconId);
  };

  const handleSandboxDblClick = (e: React.MouseEvent, iconId?: string) => {
    e.stopPropagation();
    setContextMenu(null);
    validateAction("double-click", iconId);
  };

  const handleSandboxRightClick = (e: React.MouseEvent, iconId?: string) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = sandboxRef.current?.getBoundingClientRect();
    if (rect) {
      setContextMenu({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    validateAction("right-click", iconId);
  };

  // ── Keyboard detection (attached to sandbox div via tabIndex) ─────
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (step?.action !== "keyboard") return;
    setKeyPressed(e.key);
    // Accept Enter, any letter key, or shortcut keys
    setTimeout(() => setKeyPressed(null), 600);
    completeStep(step);
  }, [completeStep, step]);

  // ── MCQ handlers ───────────────────────────────────────────────────
  const handleMCQSelect = (label: string) => {
    if (mcqAnswer.submitted) return;
    setMCQAnswer({ selected: label, submitted: false });
  };

  const handleMCQSubmit = () => {
    if (!mcqAnswer.selected || mcqAnswer.submitted) return;
    setMCQAnswer((prev) => ({ ...prev, submitted: true }));
    if (mcqAnswer.selected === step.correctOption) {
      completeStep(step);
    } else {
      deductHeart(step.heartPenalty);
      setTimeout(() => setMCQAnswer({ selected: null, submitted: false }), 1000);
    }
  };

  const progressPercent = Math.round((completedIds.length / totalSteps) * 100);

  // ────────────────────────────────────────────────────────────────────
  // ── Render: Completion Screen ──────────────────────────────────────
  // ────────────────────────────────────────────────────────────────────
  if (isComplete) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
        <div className="bg-[#0f172a] border border-amber-400/30 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl shadow-amber-500/10">
          <div className="w-20 h-20 bg-amber-400/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-400/30">
            <Trophy size={40} className="text-amber-400" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">🏆 Desktop Certified!</h2>
          <p className="text-slate-400 text-sm mb-6">You&apos;ve mastered Windows Desktop navigation!</p>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
              <div className="text-amber-400 text-lg font-black">{getTotalXP()}</div>
              <div className="text-slate-500 text-xs mt-0.5">Total XP</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
              <div className="text-lg font-black">{"❤️".repeat(Math.max(0, hearts))}</div>
              <div className="text-slate-500 text-xs mt-0.5">Hearts Left</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
              <div className="text-emerald-400 text-lg font-black">{totalSteps}</div>
              <div className="text-slate-500 text-xs mt-0.5">Steps Done</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-400/20 rounded-2xl p-4 mb-6">
            <div className="text-3xl mb-1">🏅</div>
            <div className="text-amber-400 font-black text-sm">Terminal Cadet</div>
            <div className="text-slate-500 text-xs">Awarded for completing the Desktop Simulator</div>
          </div>
          <button
            onClick={() => onComplete?.()}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-black rounded-2xl py-3 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            Start Learning CMD <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // ── Minimized pill ──────────────────────────────────────────────────
  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-20 right-4 z-[9999] bg-[#0f172a] border border-purple-500/40 rounded-2xl px-4 py-2.5 flex items-center gap-2 shadow-xl hover:border-purple-400/60 transition-all"
      >
        <Monitor size={14} className="text-purple-400" />
        <span className="text-purple-400 text-sm font-black">Step {currentStepIdx + 1}/{totalSteps}</span>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: MAX_HEARTS }).map((_, i) => (
            <Heart key={i} size={11} className={i < hearts ? "text-red-400 fill-red-400" : "text-slate-700"} />
          ))}
        </div>
      </button>
    );
  }

  // ────────────────────────────────────────────────────────────────────
  // ── Render: Main Simulator ─────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* XP Celebration */}
      {showCelebration && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10001] pointer-events-none">
          <div className="bg-amber-400 text-black font-black text-2xl rounded-3xl px-8 py-4 shadow-2xl shadow-amber-500/50 animate-bounce">
            +{xpGained} XP ⭐
          </div>
        </div>
      )}

      {/* Feedback Toast */}
      {feedback.type && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[10001] px-5 py-3 rounded-2xl font-bold text-sm shadow-xl max-w-sm w-[92%] text-center
          ${feedback.type === "success" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}>
          <div className="flex items-center justify-center gap-2">
            {feedback.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span className="line-clamp-2">{feedback.message}</span>
          </div>
        </div>
      )}

      {/* ── Main Panel ── */}
      <div className="fixed bottom-4 right-4 z-[9999] w-full max-w-[360px] bg-[#0d1117] border border-white/10 rounded-3xl shadow-2xl shadow-purple-500/10 overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900/60 to-blue-900/40 px-4 pt-4 pb-3 border-b border-white/5 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">{CATEGORY_EMOJI[step.category] ?? "🖥️"}</span>
              <div>
                <div className="text-white font-black text-xs">{step.title}</div>
                <div className="text-slate-500 text-[10px]">Step {currentStepIdx + 1} of {totalSteps}</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button onClick={() => setIsMinimized(true)} className="w-6 h-6 rounded-full bg-amber-500/20 hover:bg-amber-500/40 text-amber-400 flex items-center justify-center text-xs transition-all" title="Minimize">─</button>
              {onClose && (
                <button onClick={onClose} className="w-6 h-6 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 flex items-center justify-center transition-all" title="Close"><X size={12} /></button>
              )}
            </div>
          </div>
          {/* Progress */}
          <div className="w-full bg-white/5 rounded-full h-1.5 mb-2">
            <div className="h-1.5 bg-gradient-to-r from-purple-500 to-blue-400 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
          {/* Hearts + XP */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {Array.from({ length: MAX_HEARTS }).map((_, i) => (
                <Heart key={i} size={14} className={`transition-all ${i < hearts ? "text-red-400 fill-red-400" : "text-slate-700"}`} />
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-amber-400 font-black text-xs">
              <Star size={12} className="fill-amber-400" /><span>{totalXP} XP</span>
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">

          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
              {ACTION_LABEL[step.action]}
            </span>
            <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-full ${DIFFICULTY_COLOR[step.difficulty]}`}>
              {step.difficulty.charAt(0).toUpperCase() + step.difficulty.slice(1)}
            </span>
            {step.shortcut && (
              <span className="text-[10px] font-mono text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">{step.shortcut}</span>
            )}
          </div>

          {/* Instruction */}
          <div className="bg-white/3 border border-white/5 rounded-2xl p-3">
            <p className="text-slate-200 text-xs leading-relaxed whitespace-pre-line">{step.instruction}</p>
          </div>

          {/* ── Interactive Desktop Sandbox ── */}
          {step.action !== "mcq" && (
            <div
              ref={sandboxRef}
              id="desktop-bg"
              tabIndex={0}
              className="relative bg-gradient-to-br from-[#0d1b2a] to-[#0a1628] border border-white/10 rounded-2xl overflow-hidden cursor-pointer select-none outline-none focus:border-purple-500/50"
              style={{ minHeight: 140 }}
              onClick={(e) => handleSandboxClick(e)}
              onDoubleClick={(e) => handleSandboxDblClick(e)}
              onContextMenu={(e) => handleSandboxRightClick(e)}
              onKeyDown={handleKeyDown}
            >
              {/* Fake wallpaper grid */}
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)", backgroundSize: "20px 20px" }} />

              {/* Fake taskbar */}
              <div className="absolute bottom-0 left-0 right-0 h-7 bg-[#0f172a]/90 border-t border-white/10 flex items-center px-2 gap-1.5">
                <button
                  id="start-button"
                  className={`w-6 h-6 rounded flex items-center justify-center text-sm transition-all hover:bg-white/10
                    ${highlightedIcon === "start-button" ? "ring-1 ring-blue-400 bg-blue-500/20" : ""}`}
                  onClick={(e) => handleSandboxClick(e, "start-button")}
                  onContextMenu={(e) => handleSandboxRightClick(e, "start-button")}
                >
                  🪟
                </button>
                <div className="h-3.5 w-px bg-white/10" />
                <span className="text-slate-600 text-[9px] font-mono ml-auto pr-1">
                  {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>

              {/* Desktop icons */}
              <div className="flex flex-wrap gap-3 p-3 pb-10">
                {DESKTOP_ICONS.filter((ic) => ic.id !== "start-button").map((icon) => {
                  const isTarget = highlightedIcon === icon.id;
                  return (
                    <button
                      key={icon.id}
                      id={icon.id}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all w-[70px] text-center
                        ${isTarget
                          ? "bg-white/10 ring-1 ring-purple-400/80 ring-offset-1 ring-offset-transparent animate-pulse"
                          : "hover:bg-white/8"
                        }`}
                      onClick={(e) => { e.stopPropagation(); handleSandboxClick(e, icon.id); }}
                      onDoubleClick={(e) => { e.stopPropagation(); handleSandboxDblClick(e, icon.id); }}
                      onContextMenu={(e) => { e.stopPropagation(); handleSandboxRightClick(e, icon.id); }}
                    >
                      <span className="text-2xl">{icon.emoji}</span>
                      <span className="text-[9px] text-slate-300 font-bold truncate w-full">{icon.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Keyboard prompt overlay */}
              {step.action === "keyboard" && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl">
                  <div className={`bg-[#1e293b] border rounded-xl px-4 py-3 text-center transition-all
                    ${keyPressed ? "border-emerald-400 bg-emerald-900/30" : "border-purple-500/40"}`}>
                    <div className="text-2xl mb-1">⌨️</div>
                    <div className="text-slate-300 text-[10px] font-bold">Click here, then press:</div>
                    <div className="text-purple-300 font-mono font-black text-sm mt-1">
                      {step.shortcut ?? "any key"}
                    </div>
                    {keyPressed && (
                      <div className="text-emerald-400 text-xs mt-1 font-bold">✓ Pressed: {keyPressed}</div>
                    )}
                  </div>
                </div>
              )}

              {/* Context menu */}
              {contextMenu && (
                <ContextMenu x={contextMenu.x} y={contextMenu.y} onClose={() => setContextMenu(null)} />
              )}

              {/* Action hint overlay (top-right badge) */}
              <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg px-2 py-0.5 text-[9px] text-slate-400 font-bold">
                {ACTION_LABEL[step.action]}
              </div>
            </div>
          )}

          {/* MCQ Options */}
          {step.action === "mcq" && step.mcqOptions && (
            <div className="space-y-2">
              {step.mcqOptions.map((opt) => {
                const isSelected  = mcqAnswer.selected === opt.label;
                const isCorrect   = mcqAnswer.submitted && opt.label === step.correctOption;
                const isWrong     = mcqAnswer.submitted && isSelected && opt.label !== step.correctOption;
                return (
                  <button
                    key={opt.label}
                    onClick={() => handleMCQSelect(opt.label)}
                    disabled={mcqAnswer.submitted}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold border transition-all
                      ${isCorrect  ? "bg-emerald-500/20 border-emerald-500/60 text-emerald-300" : ""}
                      ${isWrong    ? "bg-red-500/20 border-red-500/60 text-red-300" : ""}
                      ${isSelected && !mcqAnswer.submitted ? "bg-purple-500/20 border-purple-500/50 text-purple-200" : ""}
                      ${!isSelected && !mcqAnswer.submitted ? "bg-white/3 border-white/10 text-slate-300 hover:bg-white/8 hover:border-white/20" : ""}
                    `}
                  >
                    <span className="text-slate-500 mr-2">[{opt.label}]</span>{opt.text}
                  </button>
                );
              })}
              {mcqAnswer.selected && !mcqAnswer.submitted && (
                <button onClick={handleMCQSubmit} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-black rounded-xl py-2.5 text-xs transition-all active:scale-95">
                  Submit Answer ✓
                </button>
              )}
            </div>
          )}

          {/* Hint */}
          {(showHintAuto || hintVisible) && (
            <div className="bg-amber-500/8 border border-amber-500/25 rounded-2xl p-3">
              <div className="flex items-start gap-2">
                <Lightbulb size={14} className="text-amber-400 mt-0.5 shrink-0" />
                <p className="text-amber-200 text-xs leading-relaxed">{step.hint}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 pb-4 pt-2 border-t border-white/5 shrink-0 space-y-2">
          <div className="flex gap-2">
            <button
              onClick={() => setHintVisible((v) => !v)}
              className="flex-1 text-[11px] font-bold text-amber-400 bg-amber-500/8 hover:bg-amber-500/15 border border-amber-500/20 rounded-xl py-2 flex items-center justify-center gap-1.5 transition-all"
            >
              <Lightbulb size={12} />{hintVisible ? "Hide Hint" : "Show Hint"}
            </button>
            {/* Skip button for keyboard/drag steps that can't be auto-detected on web */}
            {(step.action === "keyboard" || step.action === "drag" || step.action === "hover") && (
              <button
                onClick={() => completeStep(step)}
                className="flex-1 text-[11px] font-black text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl py-2 flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                ✓ Done <ChevronRight size={12} />
              </button>
            )}
          </div>
          <div className="text-center text-[10px] text-slate-600">
            Complete to earn <span className="text-amber-400 font-bold">+{step.xpReward} XP</span>
          </div>
        </div>
      </div>
    </>
  );
}
