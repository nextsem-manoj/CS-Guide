"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Heart, ArrowLeft, Laptop, Coffee, MessageSquare, Play, RotateCcw } from "lucide-react";

interface DuduBubuWipWidgetProps {
  title?: string;
  subtitle?: string;
  returnUrl?: string;
}

export default function DuduBubuWipWidget({
  title = "Arre Arre! Yahan tak to aa gaye 🐾",
  subtitle = "par yahan se aage ka content Dudu aur Bubu milkar bana rahe hain! Thoda wait karo 🐻❤️🐻",
  returnUrl = "/bca/semester-1"
}: DuduBubuWipWidgetProps) {
  // 0: Bubu speaks first, 1: Dudu speaks next, 2: Both together
  const [activeScene, setActiveScene] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setActiveScene((prev) => (prev + 1) % 3);
    }, 3500);

    return () => clearInterval(timer);
  }, [isAutoPlay]);

  return (
    <div className="w-full my-8 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0c1328] via-[#090f20] to-[#060c18] border border-cyan-500/40 shadow-2xl shadow-cyan-950/50 text-center relative overflow-hidden group">
      {/* Ambient background glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Particles */}
      <div className="absolute top-4 left-8 animate-bounce delay-300 pointer-events-none text-pink-400 opacity-75">
        <Heart className="w-6 h-6 fill-pink-400" />
      </div>
      <div className="absolute top-6 right-10 animate-bounce delay-700 pointer-events-none text-amber-400 opacity-75">
        <Sparkles className="w-6 h-6" />
      </div>

      <div className="relative z-10 space-y-6 max-w-xl mx-auto">
        {/* Story Scene Navigation Indicator */}
        <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-slate-400 px-2">
          <span className="flex items-center gap-1.5 text-cyan-300">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Scene {activeScene + 1} of 3: {activeScene === 0 ? "Bubu Speaking" : activeScene === 1 ? "Dudu Speaking" : "Bubu & Dudu Dev Team"}</span>
          </span>
          <button
            onClick={() => {
              setIsAutoPlay(false);
              setActiveScene((prev) => (prev + 1) % 3);
            }}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800"
          >
            <Play className="w-3 h-3 text-cyan-400" />
            <span>Next Scene</span>
          </button>
        </div>

        {/* ── SCENE 1: BUBU SPEAKS FIRST (Full Screen / Spotlight) ── */}
        {activeScene === 0 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="relative mx-auto w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-tr from-pink-950/80 via-[#0c1328] to-slate-900 border-2 border-pink-500/50 p-3 shadow-2xl shadow-pink-950/60 overflow-hidden flex items-center justify-center">
              <img
                src="/mascot/bubu.png"
                alt="Bubu Mascot (image-17.png)"
                className="w-full h-full object-contain drop-shadow-lg animate-bounce"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40 text-[10px] font-bold flex items-center gap-1 animate-pulse">
                <Coffee className="w-3 h-3 text-pink-400" /> Waving & Speaking...
              </div>
            </div>

            {/* Bubu Speech Bubble */}
            <div className="relative p-5 rounded-2xl bg-gradient-to-r from-pink-950/40 via-slate-900 to-slate-950 border border-pink-500/40 text-left shadow-lg">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 border-t border-l border-pink-500/40 transform rotate-45" />
              <div className="text-xs font-bold text-pink-400 mb-1 flex items-center gap-1.5">
                <span>🐼 Bubu Says:</span>
              </div>
              <p className="text-sm sm:text-base font-extrabold text-white leading-relaxed">
                &ldquo;Arre Arre! Yahan tak to aa gaye 🐾... par yahan se aage ka content...&rdquo;
              </p>
            </div>
          </div>
        )}

        {/* ── SCENE 2: DUDU STEPS IN (Full Screen / Spotlight) ── */}
        {activeScene === 1 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="relative mx-auto w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-tr from-amber-950/80 via-[#0c1328] to-slate-900 border-2 border-amber-500/50 p-3 shadow-2xl shadow-amber-950/60 overflow-hidden flex items-center justify-center">
              <img
                src="/mascot/dudu.png"
                alt="Dudu Mascot (image-18.png)"
                className="w-full h-full object-contain drop-shadow-lg animate-pulse"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold flex items-center gap-1">
                <Laptop className="w-3 h-3 text-amber-400" /> Coding on Laptop...
              </div>
            </div>

            {/* Dudu Speech Bubble */}
            <div className="relative p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/40 text-left shadow-lg">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 border-t border-l border-amber-500/40 transform rotate-45" />
              <div className="text-xs font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                <span>🐻 Dudu Continues:</span>
              </div>
              <p className="text-sm sm:text-base font-extrabold text-white leading-relaxed">
                &ldquo;...Dudu aur Bubu milkar bana rahe hain! Thoda wait karo 🐻❤️🐻&rdquo;
              </p>
            </div>
          </div>
        )}

        {/* ── SCENE 3: BOTH CHARACTERS SIDE-BY-SIDE ── */}
        {activeScene === 2 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex items-center justify-center gap-4 sm:gap-8 py-2">
              {/* Dudu Mascot (image-18.png) */}
              <div className="relative flex flex-col items-center">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-tr from-amber-950/80 via-[#0c1328] to-slate-900 border-2 border-amber-500/40 p-2 flex items-center justify-center shadow-xl shadow-amber-950/50">
                  <img src="/mascot/dudu.png" alt="Dudu" className="w-full h-full object-contain animate-pulse" />
                </div>
                <span className="mt-2 text-[11px] font-black uppercase text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  Dudu Dev 💻
                </span>
              </div>

              {/* Heart Connection */}
              <div className="flex flex-col items-center gap-1">
                <Heart className="w-6 h-6 text-pink-400 fill-pink-400 animate-ping" />
                <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  Together
                </span>
              </div>

              {/* Bubu Mascot (image-17.png) */}
              <div className="relative flex flex-col items-center">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-tr from-pink-950/80 via-[#0c1328] to-slate-900 border-2 border-pink-500/40 p-2 flex items-center justify-center shadow-xl shadow-pink-950/50">
                  <img src="/mascot/bubu.png" alt="Bubu" className="w-full h-full object-contain animate-bounce" />
                </div>
                <span className="mt-2 text-[11px] font-black uppercase text-pink-300 bg-pink-500/10 px-2.5 py-0.5 rounded-full border border-pink-500/30">
                  Bubu QA ☕
                </span>
              </div>
            </div>

            {/* Full Message Box */}
            <div className="space-y-2 p-5 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-inner">
              <h3 className="text-sm sm:text-base font-extrabold text-cyan-300 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{title}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-semibold">
                {subtitle}
              </p>
            </div>
          </div>
        )}

        {/* Story Controls & Action Return Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setActiveScene(0)}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Replay Story</span>
          </button>

          <Link
            href={returnUrl}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-[#0c1328] hover:bg-[#101b38] text-white font-extrabold text-xs sm:text-sm border border-[#04AA6D]/50 hover:border-[#04AA6D] shadow-xl shadow-cyan-950/40 transition-all transform active:scale-95 cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Active IGNOU BCA 1st Sem Hub</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
