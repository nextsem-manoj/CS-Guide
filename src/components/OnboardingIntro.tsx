"use client";

import { useEffect, useState, useCallback } from "react";

// Semmy Mascot: custom Gemini-style sparkle bot SVG
const SemmyMascot = ({ className = "w-24 h-24" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <defs>
      <linearGradient id="geminiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7a22ff" />
        <stop offset="45%" stopColor="#00bbf9" />
        <stop offset="90%" stopColor="#25c85d" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Google Gemini 4-pointed sparkle star */}
    <path 
      d="M50,2 C50,33 67,50 98,50 C67,50 50,67 50,98 C50,67 33,50 2,50 C33,50 50,33 50,2 Z" 
      fill="url(#geminiGradient)"
      filter="url(#glow)"
    />
    {/* Cute display screen face */}
    <circle cx="50" cy="50" r="16" fill="#0d0d0f" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
    {/* Eyes */}
    <circle cx="44" cy="48" r="2.2" fill="#39FF14" />
    <circle cx="56" cy="48" r="2.2" fill="#39FF14" />
    {/* Cute robotic curved smile */}
    <path d="M46,54 Q50,57 54,54" stroke="#39FF14" strokeWidth="1.2" strokeLinecap="round" fill="none" />
  </svg>
);

export default function OnboardingIntro({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<"welcome" | "lesson_intro" | "question_1" | "question_2" | "launch">("welcome");
  
  // Interactive quiz state
  const [selectedQ1, setSelectedQ1] = useState<string | null>(null);
  const [isQ1Correct, setIsQ1Correct] = useState(false);
  const [showQ1Explanation, setShowQ1Explanation] = useState(false);

  const [selectedQ2, setSelectedQ2] = useState<string | null>(null);
  const [isQ2Correct, setIsQ2Correct] = useState(false);
  const [showQ2Explanation, setShowQ2Explanation] = useState(false);

  const handleFinish = useCallback(() => {
    localStorage.setItem("nextsem_onboarding_v1", "1");
    localStorage.setItem("nextsem_view_mode", "classic");
    localStorage.setItem("nextsem_sound_effects", "true");
    
    // Notify application of view mode set
    window.dispatchEvent(new Event("nextsem_view_mode_changed"));
    
    setVisible(false);
    setTimeout(onComplete, 400);
  }, [onComplete]);

  useEffect(() => {
    const seen = localStorage.getItem("nextsem_onboarding_v1");
    if (seen) { 
      onComplete(); 
      return; 
    }
    const t = setTimeout(() => setVisible(true), 3150);
    return () => clearTimeout(t);
  }, [onComplete]);

  const handleSignIn = () => {
    window.dispatchEvent(new Event("open_google_auth"));
    localStorage.setItem("nextsem_onboarding_v1", "1");
    setVisible(false);
    setTimeout(onComplete, 400);
  };

  const playToggleSound = () => {
    if (typeof window !== "undefined") {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const audioCtx = new AudioContextClass();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.08);
      } catch (e) {
        console.warn("Audio Context blocked or unsupported:", e);
      }
    }
  };

  const playSuccessSound = () => {
    if (typeof window !== "undefined") {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const audioCtx = new AudioContextClass();
        
        // Note 1
        const osc1 = audioCtx.createOscillator();
        const gain1 = audioCtx.createGain();
        osc1.connect(gain1);
        gain1.connect(audioCtx.destination);
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        gain1.gain.setValueAtTime(0.04, audioCtx.currentTime);
        osc1.start();
        osc1.stop(audioCtx.currentTime + 0.1);

        // Note 2
        setTimeout(() => {
          const osc2 = audioCtx.createOscillator();
          const gain2 = audioCtx.createGain();
          osc2.connect(gain2);
          gain2.connect(audioCtx.destination);
          osc2.type = "sine";
          osc2.frequency.setValueAtTime(659.25, audioCtx.currentTime); // E5
          gain2.gain.setValueAtTime(0.04, audioCtx.currentTime);
          osc2.start();
          osc2.stop(audioCtx.currentTime + 0.15);
        }, 80);

        // Note 3
        setTimeout(() => {
          const osc3 = audioCtx.createOscillator();
          const gain3 = audioCtx.createGain();
          osc3.connect(gain3);
          gain3.connect(audioCtx.destination);
          osc3.type = "sine";
          osc3.frequency.setValueAtTime(783.99, audioCtx.currentTime); // G5
          gain3.gain.setValueAtTime(0.04, audioCtx.currentTime);
          osc3.start();
          osc3.stop(audioCtx.currentTime + 0.25);
        }, 160);

      } catch (e) {
        console.warn("Audio Context blocked or unsupported:", e);
      }
    }
  };

  // Launch screen triggers transition finish
  useEffect(() => {
    if (step === "launch") {
      playSuccessSound();
      const timer = setTimeout(handleFinish, 2200);
      return () => clearTimeout(timer);
    }
  }, [step, handleFinish]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex flex-col justify-between bg-[#131310] text-white font-sans overflow-y-auto pb-10 select-none"
      style={{
        animation: "onboardFadeIn 0.3s ease forwards",
      }}
    >
      {/* ── STEP HEADER ── */}
      {step !== "launch" && (
        <header className="w-full max-w-md mx-auto px-6 pt-6 pb-2 shrink-0 flex items-center justify-between z-10 select-none">
          <button
            onClick={() => {
              playToggleSound();
              if (step === "welcome") handleFinish();
              else if (step === "lesson_intro") setStep("welcome");
              else if (step === "question_1") setStep("lesson_intro");
              else if (step === "question_2") setStep("question_1");
            }}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {/* Close / Back Chevron */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Top Progress bar matching Brilliant's green bar trail */}
          {step !== "welcome" && (
            <div className="flex-1 mx-4 max-w-xs h-1.5 bg-[#2d2d2a] rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-[#25c85d] transition-all duration-300"
                style={{
                  width: step === "lesson_intro" ? "25%" : step === "question_1" ? "55%" : "85%"
                }}
              />
            </div>
          )}

          {/* Energy Bolt icon in right header */}
          <div className="text-yellow-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.972 9.75h7.278a.75.75 0 0 1 .68.439.75.75 0 0 1-.209.89l-11.25 9.75a.75.75 0 0 1-1.196-.702l2.003-7.277H2.972a.75.75 0 0 1-.68-.439.75.75 0 0 1 .209-.89l11.25-9.75a.75.75 0 0 1 .863-.048Zm-2.738 10.612L9.42 19.349l7.393-6.406h-5.06a.75.75 0 0 1-.722-.554l-1.636-5.94 4.5 5.253Z" clipRule="evenodd" />
            </svg>
          </div>
        </header>
      )}

      {/* ── MAIN SCENE CONTAINER ── */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full px-6 py-4 relative min-h-0">

        {/* ── SCREEN 1: WELCOME SCREEN ── */}
        {/* ── SCREEN 1: WELCOME SCREEN ── */}
        {step === "welcome" && (
          <div className="w-full flex flex-col items-center animate-slideUp">
            {/* Visual Panel Card */}
            <div className="w-full max-w-[340px] aspect-[4/3] rounded-3xl bg-[#0b0f19] border border-emerald-500/10 flex items-center justify-center p-4 relative overflow-hidden select-none mb-6">
              
              {/* Professional man silhouette outline */}
              <div className="absolute inset-0 flex items-end justify-start pl-4">
                <svg viewBox="0 0 100 100" className="w-52 h-52 text-emerald-400/20">
                  {/* Shoulders / suit */}
                  <path d="M10,95 C10,68 32,60 50,60 C68,60 90,68 90,95 Z" fill="currentColor" />
                  {/* Head with neat hair */}
                  <circle cx="50" cy="35" r="18" fill="currentColor" />
                  <path d="M32,32 C30,20 45,15 68,23 C68,23 62,32 50,32 C38,32 32,32 32,32 Z" fill="currentColor" />
                  {/* Glasses */}
                  <path d="M40,33 H48 M52,33 H60 M48,33 A2,2 0 0,1 52,33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <rect x="40" y="30" width="8" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <rect x="52" y="30" width="8" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  {/* Shirt collar & tie */}
                  <path d="M43,60 L50,72 L57,60 Z" fill="#0b0f19" />
                  <path d="M47,60 L50,72 L53,60 Z" fill="currentColor" />
                  <path d="M49,72 L51,72 L52,90 L50,94 L48,90 Z" fill="currentColor" />
                </svg>
              </div>

              {/* Nextsem Logo Badge overlapping */}
              <div className="absolute left-[40%] bottom-3 -translate-x-1/2 z-10 w-9 h-9 bg-slate-950 rounded-xl border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/5 transform rotate-6">
                <img src="/logo.svg" alt="Nextsem Logo" className="w-6 h-6 rounded" />
              </div>

              {/* CMD Helper speech bubbles */}
              <div className="absolute left-6 top-16 bg-[#111118] border border-slate-800/80 px-2.5 py-1.5 rounded-xl text-[8px] font-mono text-slate-300 shadow-lg">
                C:\&gt; how to see files?
              </div>
              <div className="absolute left-8 top-28 bg-[#111118] border border-emerald-500/20 px-2.5 py-1.5 rounded-xl text-[8px] font-mono text-[#39FF14] shadow-lg">
                Try running &apos;dir&apos;!
              </div>
              
              {/* Terminal Window Card */}
              <div className="absolute right-6 top-6 w-44 h-48 bg-slate-950 border border-slate-800 rounded-2xl p-3 shadow-2xl flex flex-col justify-between select-none">
                {/* Terminal Header */}
                <div className="flex items-center justify-between border-b border-slate-850 pb-1.5 mb-1.5 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
                    <span className="text-[7px] font-mono uppercase tracking-wider text-slate-500 pl-1">cmd.exe</span>
                  </div>
                </div>

                {/* Terminal Body */}
                <div className="flex-1 flex flex-col justify-start text-[8px] font-mono text-slate-350 leading-normal text-left overflow-hidden">
                  <div className="text-slate-600 mb-1">Microsoft Windows [Version 10.0]</div>
                  <div className="text-[#39FF14] font-bold">C:\Users\Student&gt; cd nextsem</div>
                  <div>C:\nextsem&gt; npm run dev</div>
                  <div className="text-blue-400 mt-1">&gt; nextsem@0.1.0 dev</div>
                  <div className="text-slate-400">&gt; ready on port 3000</div>
                  <div className="text-slate-500 animate-pulse mt-0.5">_</div>
                </div>

                {/* Status Bar */}
                <div className="border-t border-slate-850 pt-1.5 mt-1.5 flex items-center justify-between text-[7px] font-mono text-slate-500">
                  <span>UTF-8</span>
                  <span>Ln 1, Col 21</span>
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-black text-white tracking-tight mt-2 mb-3 text-center leading-snug uppercase">
              A world-class CLI tutor <br />
              for every developer
            </h1>

            <p className="text-[#a3a39e] text-sm text-center max-w-[280px] leading-relaxed mb-8 select-none">
              Your personal tutor for Windows Terminal &amp; Git. Built specifically for BCA students and self-taught developers.
            </p>

            <div className="flex flex-col gap-3 w-full px-2">
              <button
                onClick={() => {
                  playToggleSound();
                  setStep("launch");
                }}
                className="w-full py-4 bg-[#39FF14] hover:bg-[#2ebd10] text-[#07070c] text-sm font-black uppercase tracking-wider rounded-3xl transition-all hover:scale-101 active:scale-98 cursor-pointer shadow-lg shadow-[#39FF14]/10"
              >
                I&apos;m a learner
              </button>
            </div>
          </div>
        )}

        {/* ── SCREEN 2: MICRO-LESSON INTRO SCREEN ── */}
        {step === "lesson_intro" && (
          <div className="w-full flex flex-col items-center animate-slideUp text-center">
            {/* Visual: Stylized Bar Chart Panel */}
            <div className="w-full max-w-[340px] aspect-[16/10] bg-[#e5e5e0] rounded-2xl flex flex-col justify-end p-6 border border-slate-200 shadow-lg mb-8 select-none">
              <div className="w-full flex justify-around items-end h-28 relative">
                {/* Horizontal Baseline */}
                <div className="absolute bottom-0 inset-x-0 h-[1.5px] bg-[#131310]" />
                
                {/* TX Bar */}
                <div className="flex flex-col items-center w-8">
                  <div className="w-6 bg-[#0f2142] rounded-t-[3px]" style={{ height: "24px" }} />
                  <span className="text-[10px] font-black text-black font-sans mt-1.5">TX</span>
                </div>
                
                {/* WA Bar */}
                <div className="flex flex-col items-center w-8">
                  <div className="w-6 bg-[#51239c] rounded-t-[3px]" style={{ height: "14px" }} />
                  <span className="text-[10px] font-black text-black font-sans mt-1.5">WA</span>
                </div>

                {/* FL Bar */}
                <div className="flex flex-col items-center w-8">
                  <div className="w-6 bg-[#b21e64] rounded-t-[3px]" style={{ height: "14px" }} />
                  <span className="text-[10px] font-black text-black font-sans mt-1.5">FL</span>
                </div>

                {/* CA Bar (Tallest) */}
                <div className="flex flex-col items-center w-8">
                  <div className="w-6 bg-[#ff52b6] rounded-t-[3px]" style={{ height: "56px" }} />
                  <span className="text-[10px] font-black text-black font-sans mt-1.5">CA</span>
                </div>

                {/* NY Bar */}
                <div className="flex flex-col items-center w-8">
                  <div className="w-6 bg-[#eab308] rounded-t-[3px]" style={{ height: "10px" }} />
                  <span className="text-[10px] font-black text-black font-sans mt-1.5">NY</span>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              Reading Bar Charts
            </h2>
            <p className="text-[#a3a39e] text-sm text-center max-w-sm mt-3.5 leading-relaxed px-4">
              Data visualizations help us answer questions at a glance. Let&apos;s look at one of the simplest &mdash; a bar chart.
            </p>

            <div className="w-full mt-12 flex gap-4 items-center px-4">
              <SemmyMascot className="w-12 h-12 shrink-0 select-none" />
              <button
                onClick={() => {
                  playToggleSound();
                  setStep("question_1");
                }}
                className="flex-1 py-4 bg-[#e5e5e0] hover:bg-white text-black text-xs font-black uppercase tracking-widest rounded-3xl transition-all active:scale-98 cursor-pointer"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ── SCREEN 3: INTERACTIVE QUIZ Q1 ── */}
        {step === "question_1" && (
          <div className="w-full flex flex-col items-center animate-slideUp select-none pb-20">
            {/* Question Text */}
            <div className="w-full px-2 mb-6">
              <p className="text-sm font-bold text-slate-350 leading-relaxed select-none">
                This chart shows the number of Starbucks cafes in three states &mdash; New Jersey, New York, and Pennsylvania.
              </p>
              <h3 className="text-base font-black text-white tracking-tight mt-3">
                What state has about 400 cafes?
              </h3>
            </div>

            {/* Starbucks Bar Chart Grid */}
            <div className="w-full max-w-[340px] aspect-[14/10] bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between shadow-lg relative mb-6">
              <div className="w-full h-full flex items-end justify-around relative">
                {/* Horizontal grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[700, 600, 500, 400, 300, 200, 100, 0].map((val, i) => (
                    <div key={val} className="w-full flex items-center relative h-0">
                      <span className="absolute -left-6 text-[8px] font-mono text-slate-400 w-4 text-right select-none">{val}</span>
                      {i < 7 && <div className="w-full h-[0.5px] bg-slate-100 ml-1.5" />}
                    </div>
                  ))}
                </div>

                {/* NJ Bar (~280) */}
                <button
                  onClick={() => {
                    playToggleSound();
                    setSelectedQ1("NJ");
                    setIsQ1Correct(false);
                    setShowQ1Explanation(false);
                  }}
                  className="flex flex-col items-center w-12 z-10 select-none group"
                >
                  <div 
                    className={`w-9 rounded-t-[3px] border border-slate-300 transition-all ${
                      selectedQ1 === "NJ" ? "bg-red-500/10 border-red-500 shadow-sm" : "bg-slate-50 hover:bg-slate-100"
                    }`}
                    style={{ height: "45px" }} 
                  />
                  <span className="text-[9px] font-bold text-slate-600 font-sans mt-2">NJ</span>
                </button>

                {/* NY Bar (~620) */}
                <button
                  onClick={() => {
                    playToggleSound();
                    setSelectedQ1("NY");
                    setIsQ1Correct(false);
                    setShowQ1Explanation(false);
                  }}
                  className="flex flex-col items-center w-12 z-10 select-none group"
                >
                  <div 
                    className={`w-9 rounded-t-[3px] border border-slate-300 transition-all ${
                      selectedQ1 === "NY" ? "bg-red-500/10 border-red-500 shadow-sm" : "bg-slate-50 hover:bg-slate-100"
                    }`}
                    style={{ height: "100px" }} 
                  />
                  <span className="text-[9px] font-bold text-slate-600 font-sans mt-2">NY</span>
                </button>

                {/* PA Bar (~400) - CORRECT ANSWER */}
                <button
                  onClick={() => {
                    playSuccessSound();
                    setSelectedQ1("PA");
                    setIsQ1Correct(true);
                    setShowQ1Explanation(false);
                  }}
                  className="flex flex-col items-center w-12 z-10 select-none group relative"
                >
                  <div 
                    className={`w-9 rounded-t-[3px] border transition-all ${
                      selectedQ1 === "PA" 
                        ? "bg-[#0f2142] border-[#0f2142] shadow-md" 
                        : "bg-slate-50 border-slate-300 hover:bg-slate-100"
                    }`}
                    style={{ height: "65px" }} 
                  />
                  {selectedQ1 === "PA" && (
                    <div className="absolute top-[-14px] flex items-center justify-center w-4 h-4 rounded bg-emerald-500 text-white animate-scaleIn">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                  )}
                  <span className="text-[9px] font-bold text-slate-600 font-sans mt-2">PA</span>
                </button>
              </div>
            </div>

            {/* Wrong explanation dialog if selected NJ/NY */}
            {selectedQ1 && !isQ1Correct && (
              <div className="w-full max-w-sm px-4 py-3 rounded-2xl bg-red-950/20 border border-red-900/30 text-red-400 text-xs font-bold animate-slideUp text-center select-none">
                Not quite! Look at the PA bar height on the Y-Axis values. NJ is at 280, NY is at 620. Try again!
              </div>
            )}

            {/* Explanation text toggled by 'Why?' button */}
            {showQ1Explanation && (
              <div className="w-full max-w-sm px-5 py-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold leading-relaxed mb-4 animate-slideUp select-none">
                <span className="text-[#39FF14] block mb-1">Explanation:</span>
                Looking at the values on the left vertical Y-axis, the PA bar aligns with 400. New Jersey (NJ) is at about 280, and New York (NY) is at about 620.
              </div>
            )}
            
            {/* Correct Popup Banner (Brilliant replica) */}
            {isQ1Correct && (
              <div 
                className="fixed bottom-0 inset-x-0 bg-[#062412] border-t border-emerald-900/40 p-5 flex flex-col gap-4 z-50 select-none animate-slideUp"
                style={{ paddingBottom: "32px" }}
              >
                <div className="max-w-md mx-auto w-full flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <span className="text-xl">🎉</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-[#39FF14] uppercase tracking-wider">Correct!</h4>
                      <p className="text-[10px] text-emerald-450 font-bold mt-0.5">+15 XP earned</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2.5 items-center">
                    <button
                      onClick={() => setShowQ1Explanation(!showQ1Explanation)}
                      className="px-4 py-2.5 border border-slate-700 bg-slate-900/40 hover:bg-slate-800/60 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-350 hover:text-white transition-colors cursor-pointer"
                    >
                      Why?
                    </button>
                    <button
                      onClick={() => {
                        playToggleSound();
                        setStep("question_2");
                      }}
                      className="px-7 py-2.5 bg-[#25c85d] hover:bg-[#1f9e49] text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-lg transition-all active:scale-95 cursor-pointer"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── SCREEN 4: INTERACTIVE QUIZ Q2 ── */}
        {step === "question_2" && (
          <div className="w-full flex flex-col items-center animate-slideUp select-none pb-20">
            {/* Question Text */}
            <div className="w-full px-2 mb-6">
              <h3 className="text-base font-black text-white tracking-tight">
                What state has the most cafes?
              </h3>
            </div>

            {/* Starbucks Bar Chart Grid 2 */}
            <div className="w-full max-w-[340px] aspect-[14/10] bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between shadow-lg relative mb-6">
              {/* Lightning electricity drawing layer on correct */}
              {isQ2Correct && (
                <div className="absolute inset-0 pointer-events-none select-none z-20 overflow-hidden rounded-2xl bg-yellow-500/5 animate-pulse">
                  <svg className="absolute top-2 right-4 w-28 h-28 text-yellow-400 opacity-60 animate-lightning" viewBox="0 0 100 100">
                    <path d="M50,10 L30,50 L55,50 L35,90 L75,40 L45,40 Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                  </svg>
                </div>
              )}

              <div className="w-full h-full flex items-end justify-around relative">
                {/* Horizontal grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[700, 600, 500, 400, 300, 200, 100, 0].map((val, i) => (
                    <div key={val} className="w-full flex items-center relative h-0">
                      <span className="absolute -left-6 text-[8px] font-mono text-slate-400 w-4 text-right select-none">{val}</span>
                      {i < 7 && <div className="w-full h-[0.5px] bg-slate-100 ml-1.5" />}
                    </div>
                  ))}
                </div>

                {[
                  { state: "CT", height: "20px" },
                  { state: "DE", height: "12px" },
                  { state: "NJ", height: "45px" },
                  { state: "NY", height: "100px", correct: true }, // CORRECT ANSWER
                  { state: "PA", height: "65px" },
                  { state: "VT", height: "6px" },
                  { state: "VA", height: "72px" }
                ].map((item) => {
                  const isSelected = selectedQ2 === item.state;
                  return (
                    <button
                      key={item.state}
                      onClick={() => {
                        if (item.correct) {
                          playSuccessSound();
                          setIsQ2Correct(true);
                        } else {
                          playToggleSound();
                          setIsQ2Correct(false);
                        }
                        setSelectedQ2(item.state);
                        setShowQ2Explanation(false);
                      }}
                      className="flex flex-col items-center w-7 z-10 select-none group relative"
                    >
                      <div 
                        className={`w-5 rounded-t-[2px] border transition-all ${
                          isSelected && item.correct
                            ? "bg-[#51239c] border-[#51239c] shadow-md"
                            : isSelected
                            ? "bg-red-500/10 border-red-500 shadow-sm"
                            : "bg-slate-50 border-slate-300 hover:bg-slate-100"
                        }`}
                        style={{ height: item.height }} 
                      />
                      {isSelected && item.correct && (
                        <div className="absolute top-[-12px] flex items-center justify-center w-3 h-3 rounded bg-emerald-500 text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4.5} stroke="currentColor" className="w-2.5 h-2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        </div>
                      )}
                      <span className="text-[7px] font-bold text-slate-550 font-sans mt-2">{item.state}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Wrong explanation dialog */}
            {selectedQ2 && !isQ2Correct && (
              <div className="w-full max-w-sm px-4 py-3 rounded-2xl bg-red-950/20 border border-red-900/30 text-red-400 text-xs font-bold animate-slideUp text-center select-none">
                Not quite! The taller the bar, the larger the count. NY is the tallest bar! Try again.
              </div>
            )}

            {/* Explanation text */}
            {showQ2Explanation && (
              <div className="w-full max-w-sm px-5 py-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-350 text-xs font-bold leading-relaxed mb-4 animate-slideUp select-none">
                <span className="text-[#39FF14] block mb-1">Explanation:</span>
                The tallest bar represents the largest number of cafes. In this chart, the bar for New York (NY) stands tallest at approximately 620 cafes.
              </div>
            )}
            
            {/* Correct Popup Banner (Brilliant replica) */}
            {isQ2Correct && (
              <div 
                className="fixed bottom-0 inset-x-0 bg-[#062412] border-t border-emerald-900/40 p-5 flex flex-col gap-4 z-50 select-none animate-slideUp"
                style={{ paddingBottom: "32px" }}
              >
                <div className="max-w-md mx-auto w-full flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <span className="text-xl">⚡</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-[#39FF14] uppercase tracking-wider">Superb!</h4>
                      <p className="text-[10px] text-emerald-450 font-bold mt-0.5">+15 XP earned</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2.5 items-center">
                    <button
                      onClick={() => setShowQ2Explanation(!showQ2Explanation)}
                      className="px-4 py-2.5 border border-slate-700 bg-slate-900/40 hover:bg-slate-800/60 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-355 hover:text-white transition-colors cursor-pointer"
                    >
                      Why?
                    </button>
                    <button
                      onClick={() => {
                        playToggleSound();
                        setStep("launch");
                      }}
                      className="px-7 py-2.5 bg-[#25c85d] hover:bg-[#1f9e49] text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-lg transition-all active:scale-95 cursor-pointer"
                    >
                      Unlock Path
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── SCREEN 5: LAUNCH TRANSITION SCREEN (Semmy launching down glowing track) ── */}
        {step === "launch" && (
          <div className="fixed inset-0 bg-[#0d0d0f] flex flex-col items-center justify-center z-[99999] overflow-hidden select-none animate-fadeOutDelayed">
            {/* Ambient glows */}
            <div className="absolute top-1/4 w-80 h-80 rounded-full blur-[100px] bg-emerald-500/10 opacity-60 animate-pulse" />
            <div className="absolute bottom-1/4 w-80 h-80 rounded-full blur-[100px] bg-blue-500/10 opacity-40 animate-pulse" />

            {/* Glowing Vertical Line Track */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#25c85d]/40 to-transparent" />

            {/* Animated Mascot Launch Container */}
            <div className="relative flex flex-col items-center justify-center animate-launchSemmy">
              {/* Vertical Light Gradient Tail above Semmy */}
              <div 
                className="absolute bottom-12 w-6 h-60 bg-gradient-to-t from-[#25c85d]/70 via-[#00bbf9]/20 to-transparent blur-[1px] transform translate-y-2 rounded-full" 
                style={{ animation: "sparkleTail 0.8s ease-in-out infinite alternate" }}
              />
              
              {/* Mascot Semmy */}
              <SemmyMascot className="w-16 h-16 relative z-10 drop-shadow-[0_0_20px_rgba(57,255,20,0.5)]" />
            </div>

            <div className="absolute bottom-24 text-center select-none animate-fadeInUp">
              <span className="text-[10px] font-black text-[#39FF14] uppercase tracking-widest block mb-2 font-sans">Tutorial Complete</span>
              <h3 className="text-sm font-bold text-white tracking-tight uppercase">Unlocking Nextsem Academy...</h3>
            </div>
          </div>
        )}
      </main>

      {/* ── FOOTER SIGN IN LINK (Welcome screen only) ── */}
      {step === "welcome" && (
        <footer className="w-full max-w-md mx-auto px-6 pb-6 pt-2 shrink-0 text-center text-xs text-slate-500 z-10 select-none">
          <p className="font-bold text-sm">
            Existing user?{" "}
            <button
              onClick={handleSignIn}
              className="text-slate-300 font-bold hover:text-white underline cursor-pointer transition-colors"
            >
              Sign in
            </button>
          </p>
        </footer>
      )}

      {/* Animations CSS */}
      <style>{`
        @keyframes onboardFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes launchSemmy {
          0% { transform: translateY(-80dvh); }
          10% { transform: translateY(-80dvh); }
          85% { transform: translateY(80dvh); }
          100% { transform: translateY(80dvh); }
        }
        @keyframes fadeOutDelayed {
          0% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(12px); }
          15% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes lightning {
          0%, 90%, 100% { opacity: 0; }
          92% { opacity: 1; }
          93% { opacity: 0.2; }
          94% { opacity: 0.9; }
          96% { opacity: 0.1; }
        }
        .animate-slideUp {
          animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-launchSemmy {
          animation: launchSemmy 2.1s cubic-bezier(0.66, 0, 0.34, 1) forwards;
        }
        .animate-fadeOutDelayed {
          animation: fadeOutDelayed 2.2s ease-in-out forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 2.1s ease-in-out forwards;
        }
        .animate-lightning {
          animation: lightning 3.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
