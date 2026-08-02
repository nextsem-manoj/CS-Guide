"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface FeatureSpotlightProps {
  featureId: string;           // unique key stored in localStorage
  label: string;               // tooltip text
  side?: "top" | "bottom" | "left" | "right"; // where the hand + bubble appear
  children: React.ReactNode;
  color?: string;              // tailwind color token e.g. "blue" | "emerald" | "amber"
}

/**
 * FeatureSpotlight – wraps any element and overlays an animated
 * pointing-hand badge that dismisses permanently on click or after 10s.
 * Seen-state is persisted in localStorage keyed by `featureId`.
 */
export default function FeatureSpotlight({
  featureId,
  label,
  side = "top",
  children,
  color = "blue",
}: FeatureSpotlightProps) {
  const storageKey = `nextsem_spotlight_seen_${featureId}`;
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    setVisible(false);
    localStorage.setItem(storageKey, "1");
    if (timerRef.current) clearTimeout(timerRef.current);
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const alreadySeen = localStorage.getItem(storageKey) === "1";
    if (!alreadySeen) {
      // Small delay so it animates in after page paint
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!visible) return;
    // Auto-dismiss after 12 seconds
    timerRef.current = setTimeout(() => dismiss(), 12000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible, dismiss]);

  const colorMap: Record<string, { ring: string; bg: string; text: string; hand: string }> = {
    blue:    { ring: "ring-blue-500/60",    bg: "bg-blue-600",    text: "text-white", hand: "💙" },
    emerald: { ring: "ring-emerald-500/60", bg: "bg-emerald-600", text: "text-white", hand: "💚" },
    amber:   { ring: "ring-amber-500/60",   bg: "bg-amber-500",   text: "text-slate-900", hand: "✨" },
    rose:    { ring: "ring-rose-500/60",    bg: "bg-rose-600",    text: "text-white", hand: "🔴" },
  };
  const c = colorMap[color] ?? colorMap.blue;

  // Position of the hand + bubble relative to wrapped element
  const positionClasses: Record<string, string> = {
    top:    "bottom-full left-1/2 -translate-x-1/2 mb-2 flex-col items-center",
    bottom: "top-full  left-1/2 -translate-x-1/2 mt-2 flex-col-reverse items-center",
    left:   "right-full top-1/2 -translate-y-1/2 mr-2 flex-row items-center",
    right:  "left-full  top-1/2 -translate-y-1/2 ml-2 flex-row-reverse items-center",
  };

  // Which way the hand points
  const handEmoji: Record<string, string> = {
    top:    "👇",
    bottom: "👆",
    left:   "👉",
    right:  "👈",
  };

  return (
    <div className="relative inline-flex w-full" onClick={() => visible && dismiss()}>
      {/* Glowing ring pulse around the wrapped element */}
      {visible && (
        <span
          className={`pointer-events-none absolute inset-0 rounded-xl ring-2 ${c.ring} animate-ping opacity-70`}
          style={{ animationDuration: "1.6s" }}
        />
      )}

      {/* The actual child element */}
      {children}

      {/* Floating hand + label bubble */}
      {visible && (
        <div
          className={`pointer-events-none absolute z-[9999] flex gap-1 ${positionClasses[side]}`}
          style={{ animation: "spotlight-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both" }}
        >
          {/* Animated hand */}
          <span
            className="text-xl leading-none select-none"
            style={{ animation: "hand-bounce 0.8s ease-in-out infinite alternate" }}
          >
            {handEmoji[side]}
          </span>

          {/* Label bubble */}
          <div
            className={`${c.bg} ${c.text} rounded-xl px-2.5 py-1.5 text-[10px] font-black shadow-xl whitespace-nowrap border border-white/10`}
          >
            🆕 {label}
          </div>
        </div>
      )}

      <style>{`
        @keyframes hand-bounce {
          from { transform: translateY(0px) rotate(-5deg); }
          to   { transform: translateY(-6px) rotate(5deg); }
        }
        @keyframes spotlight-in {
          from { opacity: 0; transform: scale(0.7); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
