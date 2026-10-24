"use client";

import React, { useState, useEffect } from "react";
import { 
  Smartphone, Laptop, Terminal, Play, Pause, RotateCcw, 
  ArrowRight, Check, Zap
} from "lucide-react";

interface WorkflowScene {
  id: number;
  label: string;
  short: string;
  badge: string;
  title: string;
  description: string;
  phoneHighlight: string;
  pcHighlight: string;
}

const WORKFLOW_SCENES: WorkflowScene[] = [
  {
    id: 1,
    label: "1. Same Google Account",
    short: "1. Google Login",
    badge: "Step 1: Universal Login",
    title: "Phone Aur Laptop Dono Par Same Google Account Se Login Karein",
    description: "Apne mobile aur laptop dono devices par ek hi Google account se sign in karein. Isse dono devices cloud ke through direct apas me link ho jate hain.",
    phoneHighlight: "Signed in: student@gmail.com 🟢",
    pcHighlight: "Signed in: student@gmail.com 🟢"
  },
  {
    id: 2,
    label: "2. Cloud Clipboard Sync",
    short: "2. Real-Time Sync",
    badge: "Step 2: Auto-Clipboard",
    title: "Phone Par Copy Karein ➔ Laptop Clipboard Me Instant Sync!",
    description: "Phone par 'Copy PC Setup Command' dabate hi NextSem Cloud Clipboard wahi command turant aapke laptop ke clipboard me real-time bhej deta hai (aur vice-versa)!",
    phoneHighlight: "Tap 'Copy Command' ➔ Synced ⚡",
    pcHighlight: "Laptop Clipboard Ready: mkdir bca-day-01; cd bca-day-01; code ."
  },
  {
    id: 3,
    label: "3. Full-Screen VS Code",
    short: "3. Zero Alt-Tab",
    badge: "Step 3: Fast Coding",
    title: "Laptop Terminal Me Paste (Ctrl+V) Karein & Full-Screen Code Karein",
    description: "Laptop par PowerShell/CMD me sirf 'Ctrl + V' dabayein aur Enter karein. VS Code direct launch ho jayega aur aap 100% full-screen code kar sakte hain bina Alt-Tab ke!",
    phoneHighlight: "Phone par line-by-line tags dekhein",
    pcHighlight: "Full-screen VS Code with Live Server"
  },
  {
    id: 4,
    label: "4. Push & Vice-Versa Unlock",
    short: "4. Auto-Unlock",
    badge: "Step 4: Completion",
    title: "PC Se Git Push Karein • Dono Devices Par Next Day Instant Unlock",
    description: "Laptop terminal me 'git push origin main' karein. NextSem platform dono devices par live sync karke turant Day 2 unlock kar deta hai!",
    phoneHighlight: "Day 1 Verified ✓ • Day 2 Unlocked 🎉",
    pcHighlight: "git push origin main -> 100% Verified ✓"
  }
];

export default function DualDeviceWorkflowAnimation() {
  const [activeScene, setActiveScene] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Auto-play through 4 scenes
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setActiveScene((prev) => (prev >= WORKFLOW_SCENES.length ? 1 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const current = WORKFLOW_SCENES[activeScene - 1] || WORKFLOW_SCENES[0];

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-[#0c1328] border border-emerald-200 dark:border-emerald-500/30 p-4 sm:p-5 space-y-4 shadow-sm transition-colors overflow-hidden">
      
      {/* ── TOP HEADER WITH CONTROLS (NextSem Logo Theme) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#04AA6D] text-white flex items-center justify-center font-bold shrink-0 shadow-md shadow-emerald-500/20">
            <Zap size={16} className="fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#04AA6D] dark:text-emerald-400">
                Visual Demonstration
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/40">
                How Dual-Screen Works
              </span>
            </div>
            <h4 className="text-sm font-black text-black dark:text-white mt-0.5">
              Why Prop Phone Beside PC Keyboard? (Visual Demo)
            </h4>
          </div>
        </div>

        {/* Player Controls & Stepper */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-[#060c18] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
            title={isPlaying ? "Pause Animation" : "Play Animation"}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} className="fill-emerald-500 text-emerald-500" />}
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveScene(1);
              setIsPlaying(true);
            }}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-[#060c18] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
            title="Restart Animation"
          >
            <RotateCcw size={13} />
          </button>

          <span className="text-[11px] font-mono text-slate-500 ml-1">
            Scene {activeScene}/4
          </span>
        </div>
      </div>

      {/* ── SCENE STEPPER PILLS (NextSem Emerald Theme) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {WORKFLOW_SCENES.map((scene) => {
          const isActive = activeScene === scene.id;
          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => {
                setActiveScene(scene.id);
                setIsPlaying(false);
              }}
              className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between gap-1.5 ${
                isActive
                  ? "bg-[#04AA6D] text-white border-emerald-500 shadow-md shadow-emerald-500/20 font-black"
                  : "bg-slate-50 dark:bg-[#060c18] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-black dark:hover:text-white"
              }`}
            >
              <span className="text-[11px] font-mono truncate">{scene.short}</span>
              {isActive ? (
                <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
              ) : (
                <span className="text-[10px] opacity-60 shrink-0">#{scene.id}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── ANIMATED TWIN-DEVICE STAGE (Phone + Wi-Fi Sync + Laptop) ── */}
      <div className="relative rounded-2xl bg-gradient-to-b from-[#0c1328] to-[#060c18] border border-slate-800 p-4 sm:p-6 overflow-hidden select-none">
        
        {/* Subtle Background Desk Grid & Ambient Emerald Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Live Status Callout Banner */}
        <div className="relative z-10 mb-4 flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-slate-800/80 text-[11px] font-mono">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-white font-bold truncate">
              {current.badge}: {current.title}
            </span>
          </div>
          <span className="text-emerald-400 hidden sm:inline shrink-0 font-bold">
            {activeScene === 3 ? "⚡ Zero Alt-Tab Switching" : "Dual-Device Synergy"}
          </span>
        </div>

        {/* ── TWIN DEVICES WORKSTATION GRID ── */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* ════ LEFT: SMARTPHONE MOCKUP (4 Cols on Desktop) ════ */}
          <div className="md:col-span-4 flex flex-col items-center">
            
            {/* Device Label Tag */}
            <div className={`mb-2 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all ${
              activeScene === 1 || activeScene === 4
                ? "bg-[#04AA6D] text-white shadow-md shadow-emerald-500/20"
                : "bg-slate-800 text-slate-300"
            }`}>
              <Smartphone size={11} />
              <span>PHONE: Live Lab Manual</span>
            </div>

            {/* Phone Chassis */}
            <div className={`relative w-[180px] sm:w-[200px] h-[310px] rounded-[32px] bg-[#020611] p-2.5 shadow-2xl transition-all duration-300 border-2 ${
              activeScene === 1 || activeScene === 4
                ? "border-emerald-500 shadow-emerald-500/30 scale-102 ring-4 ring-emerald-500/20" 
                : "border-slate-700/80"
            }`}>
              {/* Phone Speaker Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-3 bg-slate-900 rounded-full flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800 mr-2" />
                <div className="w-6 h-1 bg-slate-800 rounded-full" />
              </div>

              {/* Phone Screen Canvas */}
              <div className="w-full h-full pt-4 pb-2 px-2.5 rounded-[24px] bg-[#060c18] text-slate-200 font-sans flex flex-col justify-between overflow-hidden text-[10px]">
                
                {/* Simulated NextSem Mobile App Header */}
                <div className="border-b border-slate-800/80 pb-1.5">
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <span className="text-emerald-400 font-bold">5G</span>
                      <span>100%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 font-bold text-white text-[10px] truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="truncate">NextSem BCA Practical</span>
                  </div>
                </div>

                {/* Simulated Lesson Content */}
                <div className="space-y-1.5 py-1.5 flex-1">
                  <div className="p-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30">
                    <div className="text-[9px] font-mono text-emerald-400 font-bold">
                      Day 1: HTML Boilerplate
                    </div>
                    <div className="text-[8px] text-slate-400 mt-0.5">
                      11 Step Line-by-Line Guide
                    </div>
                  </div>

                  {/* Line Checkpoints simulation */}
                  <div className="space-y-1 font-mono text-[9px]">
                    <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-black/60 border border-slate-800">
                      <span className="text-emerald-400 font-bold">&lt;!DOCTYPE html&gt;</span>
                      <Check size={10} className="text-emerald-400 stroke-[3]" />
                    </div>
                    <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-black/60 border border-slate-800">
                      <span className="text-cyan-400 font-bold">&lt;html lang=&quot;en&quot;&gt;</span>
                      <Check size={10} className="text-emerald-400 stroke-[3]" />
                    </div>
                    <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-black/60 border border-slate-800">
                      <span className="text-white font-bold">&lt;head&gt; ... &lt;/head&gt;</span>
                      <Check size={10} className="text-emerald-400 stroke-[3]" />
                    </div>
                  </div>

                  {/* Scene Status Callout inside Phone Screen */}
                  {activeScene === 1 ? (
                    <div className="p-1.5 rounded-lg bg-blue-950/80 border border-blue-500/50 text-cyan-300 text-[8px] font-bold text-center">
                      🔑 Google: student@gmail.com ✓
                    </div>
                  ) : activeScene === 2 ? (
                    <div className="p-1 rounded-md bg-[#04AA6D] text-white text-[8px] font-bold text-center animate-bounce">
                      ⚡ Cloud: Copied to Laptop Clipboard!
                    </div>
                  ) : activeScene === 4 ? (
                    <div className="p-1.5 rounded-lg bg-emerald-950 border border-emerald-500 text-emerald-300 text-[9px] font-bold text-center animate-pulse">
                      🎉 Day 1 Verified! Day 2 Unlocked
                    </div>
                  ) : null}
                </div>

                {/* Simulated Bottom Sticky Companion Action */}
                <div className="pt-1 border-t border-slate-800/80 text-[8px] font-mono text-center text-slate-400">
                  Phone stays propped beside keyboard
                </div>
              </div>

              {/* Phone Prop Stand base simulation */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-2 bg-slate-700/60 rounded-full" />
            </div>

            <span className="text-[10px] text-slate-400 font-mono mt-2 text-center">
              No need to switch windows on laptop
            </span>
          </div>


          {/* ════ CENTER: SYNC DATA STREAM ARROW (1 Col on Desktop) ════ */}
          <div className="md:col-span-1 flex flex-col items-center justify-center my-2 md:my-0">
            <div className={`p-2 rounded-full border transition-all ${
              activeScene === 2 || activeScene === 4
                ? "bg-[#04AA6D] text-white border-emerald-400 shadow-lg shadow-emerald-500/30 scale-110"
                : "bg-slate-900 text-slate-400 border-slate-800"
            }`}>
              <ArrowRight size={14} className="rotate-90 md:rotate-0" />
            </div>
            <span className="text-[9px] font-mono text-emerald-400 mt-1 uppercase tracking-wider text-center hidden md:inline font-bold">
              Hands Free
            </span>
          </div>


          {/* ════ RIGHT: LAPTOP / PC MOCKUP (7 Cols on Desktop) ════ */}
          <div className="md:col-span-7 flex flex-col items-center">
            
            {/* Device Label Tag */}
            <div className={`mb-2 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all ${
              activeScene === 2 || activeScene === 3
                ? "bg-[#060c18] border border-emerald-500 text-emerald-400 shadow-md shadow-emerald-500/20"
                : "bg-slate-800 text-slate-300"
            }`}>
              <Laptop size={11} />
              <span>LAPTOP / PC: Full-Screen Visual Studio Code</span>
            </div>

            {/* Laptop Screen Frame */}
            <div className={`relative w-full max-w-[420px] rounded-2xl bg-[#0b0f19] border-2 shadow-2xl transition-all duration-300 overflow-hidden ${
              activeScene === 3 || activeScene === 4
                ? "border-emerald-500 shadow-emerald-500/30 ring-4 ring-emerald-500/20" 
                : "border-slate-700/80"
            }`}>
              
              {/* Laptop Top Chrome Bar */}
              <div className="px-3 py-1.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-300">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-slate-300 font-bold ml-1.5 text-[10px]">
                    Visual Studio Code — bca-day-01
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[9px] text-slate-400">
                  <span className="text-emerald-400 font-bold">100% Full Screen</span>
                </div>
              </div>

              {/* VS Code Workspace Canvas */}
              <div className="p-3 bg-[#0d1117] text-slate-200 font-mono text-xs flex flex-col justify-between min-h-[190px]">
                
                {/* Editor Top Tab Bar */}
                <div className="flex items-center gap-2 border-b border-slate-800/80 pb-1.5 text-[10px]">
                  <div className="px-2.5 py-0.5 rounded-t bg-slate-800 text-white font-bold flex items-center gap-1 border-t-2 border-emerald-400">
                    <span className="text-cyan-400">&lt;&gt;</span>
                    <span>index.html</span>
                  </div>
                  <span className="text-slate-500 text-[10px]">style.css</span>
                </div>

                {/* Editor Code Lines (Animated typing) */}
                <div className="py-2 space-y-1 text-[11px] leading-snug">
                  <div className="text-emerald-400 font-bold">&lt;!DOCTYPE html&gt;</div>
                  <div className="text-cyan-400 font-bold">&lt;html lang=&quot;en&quot;&gt;</div>
                  <div className="pl-3 text-slate-400">&lt;head&gt;</div>
                  <div className="pl-6 text-slate-300">
                    &lt;title&gt;<span className="text-emerald-400 font-bold">My First BCA Webpage</span>&lt;/title&gt;
                  </div>
                  <div className="pl-3 text-slate-400">&lt;/head&gt;</div>
                  <div className="pl-3 text-white font-bold">&lt;body&gt;</div>
                  <div className="pl-6 text-slate-200 flex items-center gap-1">
                    <span>&lt;h1&gt;Hello World!&lt;/h1&gt;</span>
                    {activeScene === 3 && (
                      <span className="w-2 h-4 bg-emerald-400 animate-pulse" />
                    )}
                  </div>
                  <div className="pl-3 text-white font-bold">&lt;/body&gt;</div>
                  <div className="text-cyan-400 font-bold">&lt;/html&gt;</div>
                </div>

                {/* Integrated Terminal at Bottom */}
                <div className="mt-1 pt-1.5 border-t border-slate-800/90 text-[10px] bg-black/60 p-2 rounded-lg">
                  <div className="flex items-center justify-between text-slate-400 text-[9px] mb-1 font-sans">
                    <span className="flex items-center gap-1 font-bold">
                      <Terminal size={10} className="text-emerald-400" />
                      <span>TERMINAL</span>
                    </span>
                    <span className="text-[8px] font-mono text-slate-500">PowerShell / bash</span>
                  </div>

                  {activeScene === 2 ? (
                    <div className="space-y-0.5">
                      <div className="text-[8px] text-cyan-300 font-mono flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                        <span>⚡ Synced from Mobile Cloud Clipboard:</span>
                      </div>
                      <div className="text-emerald-400 font-bold animate-pulse text-[10px]">
                        PS C:\Users\student&gt; mkdir bca-day-01; cd bca-day-01; code .
                      </div>
                    </div>
                  ) : activeScene === 4 ? (
                    <div className="text-emerald-400 font-bold text-[10px] flex items-center justify-between">
                      <span>PS bca-day-01&gt; git push origin main</span>
                      <span className="text-black bg-emerald-400 px-1.5 py-0.2 rounded font-bold">✓ Verified</span>
                    </div>
                  ) : (
                    <div className="text-slate-400 text-[10px]">
                      Live Server running at http://127.0.0.1:5500/index.html
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* Laptop Keyboard Base */}
            <div className="w-[440px] max-w-full h-3 bg-slate-800 rounded-b-xl border-t border-slate-700/80 shadow-md relative">
              <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-16 h-1 bg-slate-600 rounded-full" />
            </div>

            <span className="text-[10px] text-slate-400 font-mono mt-2 text-center">
              100% Full-Screen VS Code on PC • Fast typing speed
            </span>
          </div>

        </div>

      </div>

      {/* ── ACTIVE SCENE EXPLANATION BANNER (NextSem Emerald Theme) ── */}
      <div className="rounded-xl p-3 bg-emerald-50/70 dark:bg-[#060c18] border border-emerald-200 dark:border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-0.5">
          <div className="font-extrabold text-black dark:text-white flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#04AA6D]" />
            <span>{current.title}</span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
            {current.description}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setActiveScene((prev) => (prev >= WORKFLOW_SCENES.length ? 1 : prev + 1));
              setIsPlaying(false);
            }}
            className="px-3.5 py-1.5 rounded-lg bg-[#04AA6D] hover:bg-emerald-600 text-white font-black text-xs flex items-center gap-1 shadow-md shadow-emerald-500/20 transition-transform active:scale-95 cursor-pointer"
          >
            <span>Next Step</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </div>

    </div>
  );
}
