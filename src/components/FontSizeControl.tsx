"use client";

import React, { useEffect, useState } from "react";

// Font scale steps — maps to CSS font-size multiplier on <html>
const FONT_STEPS = [0.85, 0.9, 1, 1.1, 1.2, 1.35] as const;
const DEFAULT_STEP = 2; // index → 1 (100%)
const LS_KEY = "nextsem_font_scale";

function applyFontScale(scale: number) {
  if (typeof document !== "undefined") {
    document.documentElement.style.fontSize = `${scale * 16}px`;
  }
}

/** Compact inline pill for desktop header */
export function FontSizeControlPill() {
  const [stepIdx, setStepIdx] = useState(DEFAULT_STEP);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    const idx = saved !== null ? Number(saved) : DEFAULT_STEP;
    const clampedIdx = Math.max(0, Math.min(FONT_STEPS.length - 1, idx));
    setStepIdx(clampedIdx);
    applyFontScale(FONT_STEPS[clampedIdx]);
    setMounted(true);
  }, []);

  const change = (delta: -1 | 1) => {
    const next = Math.max(0, Math.min(FONT_STEPS.length - 1, stepIdx + delta));
    setStepIdx(next);
    localStorage.setItem(LS_KEY, String(next));
    applyFontScale(FONT_STEPS[next]);
    // Notify any interested listeners
    window.dispatchEvent(new Event("fontScaleChanged"));
  };

  if (!mounted) return null;

  const pct = Math.round(FONT_STEPS[stepIdx] * 100);

  return (
    <div
      className="flex items-center gap-0.5 bg-white/5 border border-white/10 rounded-full px-1 py-0.5"
      title="Adjust text size"
      aria-label="Text size control"
    >
      {/* Decrease */}
      <button
        onClick={() => change(-1)}
        disabled={stepIdx === 0}
        aria-label="Decrease text size"
        className="w-6 h-6 flex items-center justify-center rounded-full text-gray-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90 cursor-pointer"
      >
        <span className="font-black text-[10px] leading-none">A−</span>
      </button>

      {/* Current label */}
      <span
        className="text-[9px] font-black text-green-400 w-7 text-center tabular-nums select-none"
        aria-live="polite"
      >
        {pct}%
      </span>

      {/* Increase */}
      <button
        onClick={() => change(1)}
        disabled={stepIdx === FONT_STEPS.length - 1}
        aria-label="Increase text size"
        className="w-6 h-6 flex items-center justify-center rounded-full text-gray-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90 cursor-pointer"
      >
        <span className="font-black text-[12px] leading-none">A+</span>
      </button>
    </div>
  );
}

/** Expanded block for mobile menu drawer */
export function FontSizeControlBlock() {
  const [stepIdx, setStepIdx] = useState(DEFAULT_STEP);
  const [mounted, setMounted] = useState(false);

  // Sync with any changes made by the pill (cross-component)
  useEffect(() => {
    const sync = () => {
      const saved = localStorage.getItem(LS_KEY);
      if (saved !== null) {
        const idx = Math.max(0, Math.min(FONT_STEPS.length - 1, Number(saved)));
        setStepIdx(idx);
      }
    };
    const saved = localStorage.getItem(LS_KEY);
    const idx = saved !== null ? Number(saved) : DEFAULT_STEP;
    const clampedIdx = Math.max(0, Math.min(FONT_STEPS.length - 1, idx));
    setStepIdx(clampedIdx);
    applyFontScale(FONT_STEPS[clampedIdx]);
    setMounted(true);

    window.addEventListener("fontScaleChanged", sync);
    return () => window.removeEventListener("fontScaleChanged", sync);
  }, []);

  const change = (delta: -1 | 1) => {
    const next = Math.max(0, Math.min(FONT_STEPS.length - 1, stepIdx + delta));
    setStepIdx(next);
    localStorage.setItem(LS_KEY, String(next));
    applyFontScale(FONT_STEPS[next]);
    window.dispatchEvent(new Event("fontScaleChanged"));
  };

  const reset = () => {
    setStepIdx(DEFAULT_STEP);
    localStorage.setItem(LS_KEY, String(DEFAULT_STEP));
    applyFontScale(FONT_STEPS[DEFAULT_STEP]);
    window.dispatchEvent(new Event("fontScaleChanged"));
  };

  if (!mounted) return null;

  const pct = Math.round(FONT_STEPS[stepIdx] * 100);

  return (
    <div className="p-3 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-gray-100 dark:border-slate-900 mt-2">
      <div className="flex items-center gap-2 text-slate-800 dark:text-slate-300 font-black text-[10px] uppercase tracking-wider mb-3">
        {/* Small "A big A" visual label */}
        <span className="text-emerald-500 text-sm font-black leading-none">A</span>
        <span>Text Size</span>
        <span className="ml-auto text-[9px] text-emerald-400 font-black">{pct}%</span>
      </div>

      {/* Step bar */}
      <div className="flex items-center gap-2">
        {/* Decrease button */}
        <button
          onClick={() => change(-1)}
          disabled={stepIdx === 0}
          aria-label="Decrease text size"
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-slate-950 border border-gray-200/50 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-black text-base hover:border-emerald-500/40 hover:bg-emerald-500/5 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all cursor-pointer"
        >
          A−
        </button>

        {/* Visual scale bar */}
        <div className="flex-1 flex items-center gap-0.5 h-9 px-1">
          {FONT_STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setStepIdx(i);
                localStorage.setItem(LS_KEY, String(i));
                applyFontScale(FONT_STEPS[i]);
                window.dispatchEvent(new Event("fontScaleChanged"));
              }}
              aria-label={`Set text size to ${Math.round(FONT_STEPS[i] * 100)}%`}
              className={`flex-1 rounded-full transition-all cursor-pointer ${
                i === stepIdx
                  ? "bg-emerald-400 h-4 shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                  : i < stepIdx
                  ? "bg-emerald-500/50 h-2.5 hover:bg-emerald-400/70"
                  : "bg-slate-300 dark:bg-slate-700 h-2 hover:bg-slate-400 dark:hover:bg-slate-600"
              }`}
            />
          ))}
        </div>

        {/* Increase button */}
        <button
          onClick={() => change(1)}
          disabled={stepIdx === FONT_STEPS.length - 1}
          aria-label="Increase text size"
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-slate-950 border border-gray-200/50 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-black text-lg hover:border-emerald-500/40 hover:bg-emerald-500/5 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all cursor-pointer"
        >
          A+
        </button>
      </div>

      {/* Reset link */}
      {stepIdx !== DEFAULT_STEP && (
        <button
          onClick={reset}
          className="mt-2 w-full text-[9px] font-black uppercase tracking-wider text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
        >
          ↩ Reset to Default (100%)
        </button>
      )}
    </div>
  );
}

/** Hydration helper — applies saved scale on mount (put in layout or _app) */
export function FontScaleHydrator() {
  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved !== null) {
      const idx = Math.max(0, Math.min(FONT_STEPS.length - 1, Number(saved)));
      applyFontScale(FONT_STEPS[idx]);
    }
  }, []);
  return null;
}
