"use client";

import { useEffect, useRef, useState } from "react";
import { showAppOpenAd } from "../lib/admobHelper";
import { Capacitor } from '@capacitor/core';


// Animation phases:
// 0 → N and S pop in as standalone letters
// 1 → N expands to "Next", S expands to "Sem"
// 2 → "ext"/"em" fade, letters condense into NS logo box and hold
// 3 → Fade out → gone

export default function SplashScreen() {
  const [phase, setPhase] = useState(0);
  const [gone, setGone] = useState(true); // Default to true (hidden) for SSR/safe-guard
  const [muted, setMuted] = useState(false);
  const gainRef = useRef<GainNode | null>(null);

  // Check on client-side mount
  useEffect(() => {
    const isShown = sessionStorage.getItem("nextsem_splash_shown");
    setTimeout(() => {
      if (isShown) {
        setGone(true);
      } else {
        setGone(false);
        sessionStorage.setItem("nextsem_splash_shown", "true");
      }
    }, 0);
  }, []);

  // ── Web Audio: play a soft tech arpeggio on mount ──
  useEffect(() => {
    if (gone || muted) return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      // E minor arpeggio: E4 G4 B4 E5 G5
      const notes = [329.63, 392.0, 493.88, 659.25, 783.99];
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.18, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainRef.current = masterGain;

      notes.forEach((freq, i) => {
        const t = ctx.currentTime + i * 0.32;
        const osc = ctx.createOscillator();
        const env = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t);
        env.gain.setValueAtTime(0, t);
        env.gain.linearRampToValueAtTime(1, t + 0.05);   // attack
        env.gain.exponentialRampToValueAtTime(0.001, t + 0.7); // decay
        osc.connect(env);
        env.connect(masterGain);
        osc.start(t);
        osc.stop(t + 0.75);
      });

      // Fade out master gain as splash ends
      masterGain.gain.setValueAtTime(0.18, ctx.currentTime + 1.8);
      masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.6);

      return () => {
        ctx.close();
      };
    } catch { /* AudioContext not available */ }
  }, [gone, muted]);

  useEffect(() => {
    if (gone) return;
    const timings = [
      [300,  () => setPhase(1)], // expand to NextSem
      [1100, () => setPhase(2)], // condense to NS logo box
      [2200, () => setPhase(3)], // start fade out
      [3000, () => {
        setGone(true);
        // Fire App Open Ad on native after splash animation completes
        if (Capacitor.isNativePlatform()) {
          showAppOpenAd().catch(() => { /* silent fail — no fill is fine */ });
        }
      }],
    ] as [number, () => void][];
    const timers = timings.map(([ms, fn]) => setTimeout(fn, ms));
    return () => timers.forEach(clearTimeout);
  }, [gone]);


  if (gone) return null;

  const G = "#39FF14"; // neon green

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden"
      style={{
        opacity: phase === 3 ? 0 : 1,
        transition: "opacity 0.8s ease",
        pointerEvents: phase === 3 ? "none" : "all",
      }}
    >
      {/* 🔇 Mute toggle */}
      <button
        onClick={() => setMuted(m => !m)}
        className="absolute top-4 right-4 z-10 text-lg w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
        aria-label="Toggle sound"
      >
        {muted ? "🔇" : "🔊"}
      </button>

      {/* Ambient glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 300, height: 300,
          background: `radial-gradient(circle, ${G}18 0%, transparent 70%)`,
          filter: "blur(40px)",
          transform: "translate(-50%, -50%)",
          top: "50%", left: "50%",
        }}
      />

      {/* ─── Phase 0–1: Letter animation ─── */}
      {phase < 2 && (
        <div className="flex items-center justify-center gap-0 select-none" style={{ height: 80 }}>
          {/* N → Next */}
          <div className="flex items-center overflow-hidden" style={{ height: 72 }}>
            <span
              className="font-black leading-none"
              style={{
                fontSize: 64,
                color: G,
                textShadow: `0 0 20px ${G}, 0 0 40px ${G}66`,
                fontFamily: "system-ui, sans-serif",
                animation: "letterPop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
              }}
            >
              N
            </span>
            <span
              className="font-black leading-none overflow-hidden"
              style={{
                fontSize: 38,
                color: G,
                fontFamily: "system-ui, sans-serif",
                maxWidth: phase === 1 ? 120 : 0,
                opacity: phase === 1 ? 1 : 0,
                transition: "max-width 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease",
                whiteSpace: "nowrap",
                display: "inline-block",
                verticalAlign: "middle",
                marginBottom: -4,
              }}
            >
              ext
            </span>
          </div>

          {/* spacer */}
          <span style={{ width: phase === 1 ? 6 : 0, transition: "width 0.5s ease", display: "inline-block" }} />

          {/* S → Sem */}
          <div className="flex items-center overflow-hidden" style={{ height: 72 }}>
            <span
              className="font-black leading-none"
              style={{
                fontSize: 64,
                color: G,
                textShadow: `0 0 20px ${G}, 0 0 40px ${G}66`,
                fontFamily: "system-ui, sans-serif",
                animation: "letterPop 0.4s 0.15s cubic-bezier(0.34,1.56,0.64,1) both",
              }}
            >
              S
            </span>
            <span
              className="font-black leading-none overflow-hidden"
              style={{
                fontSize: 38,
                color: G,
                fontFamily: "system-ui, sans-serif",
                maxWidth: phase === 1 ? 100 : 0,
                opacity: phase === 1 ? 1 : 0,
                transition: "max-width 0.5s 0.1s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s 0.1s ease",
                whiteSpace: "nowrap",
                display: "inline-block",
                verticalAlign: "middle",
                marginBottom: -4,
              }}
            >
              em
            </span>
          </div>
        </div>
      )}

      {/* ─── Phase 2+: NS Logo Box (holds until fade) ─── */}
      {phase >= 2 && (
        <div
          className="flex flex-col items-center justify-center rounded-[2rem] border-2"
          style={{
            width: 112, height: 112,
            borderColor: `${G}60`,
            background: "#0a0a0a",
            boxShadow: `0 0 60px ${G}40, 0 0 120px ${G}20`,
            animation: "logoIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
          }}
        >
          <span
            className="font-black"
            style={{
              fontSize: 40,
              color: G,
              textShadow: `0 0 20px ${G}`,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            NS
          </span>
        </div>
      )}

      {/* App name — shows from phase 1 onward */}
      <div
        className="mt-6 flex flex-col items-center gap-1"
        style={{
          opacity: phase >= 1 && phase < 3 ? 1 : 0,
          transform: phase >= 1 ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <span className="text-white text-xl font-bold tracking-wide">
          Nextsem Academy
        </span>
        <span style={{ color: G, fontSize: 10, letterSpacing: "0.2em", fontWeight: 600, textTransform: "uppercase" }}>
          Learn · Build · Get Hired
        </span>
      </div>

      {/* Loading dots */}
      <div className="flex gap-1.5 mt-5" style={{ opacity: phase >= 1 && phase < 3 ? 1 : 0, transition: "opacity 0.5s" }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: 6, height: 6,
              background: G,
              animation: "dotBounce 1.2s ease-in-out infinite",
              animationDelay: `${i * 0.2}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes letterPop {
          from { opacity: 0; transform: scale(0.4) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes logoIn {
          from { opacity: 0; transform: scale(0.6); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%            { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
