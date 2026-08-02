"use client";

import React, { useState, useEffect } from 'react';
import { Play, Sparkles, X, ChevronRight, HelpCircle } from 'lucide-react';

interface TourStep {
  title: string;
  description: string;
  icon: string;
  color: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: "Immersive Coding Curriculum",
    description: "Learn Frontend Development step-by-step with structured, job-ready lessons. Tapping buttons automatically launches immersive full-screen learning!",
    icon: "💻",
    color: "from-blue-500 to-indigo-500"
  },
  {
    title: "In-App Code Editor & Sandbox",
    description: "Click 'Edit Code' on any code block, modify the HTML, CSS, or JS, and tap 'Run Code' to watch it render instantly in a dark-mode interactive sandbox below the lesson!",
    icon: "✏️",
    color: "from-amber-500 to-orange-500"
  },
  {
    title: "Hinglish & Multi-Language Translation",
    description: "Translate the entire curriculum into Hindi, Spanish, French, German, or Hinglish (English script read as Hindi sound, e.g., 'Aap kaise hain') using the top floating globe button.",
    icon: "🗣️",
    color: "from-emerald-500 to-teal-500"
  },
  {
    title: "Curriculum Search Engine",
    description: "Search the entire curriculum by keyword, phrase, HTML tag, or code block instantly using the floating top search icon. Matches highlight content snippets automatically!",
    icon: "🔍",
    color: "from-cyan-500 to-blue-500"
  },
  {
    title: "Floating Navigation Capsule",
    description: "Use the bottom iOS-style floating pill to jump home, open topics, clear offline cache, toggle night theme, or trigger community actions.",
    icon: "📱",
    color: "from-fuchsia-500 to-pink-500"
  }
];

const OnboardingTour = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const completed = localStorage.getItem("nextsem_tour_completed") === "true";
      if (!completed) {
        setTimeout(() => setIsOpen(true), 0);
      }
    }

    const handleRestartTour = () => {
      setStep(0);
      setIsOpen(true);
    };

    window.addEventListener("restart-tour", handleRestartTour);
    return () => window.removeEventListener("restart-tour", handleRestartTour);
  }, []);

  const handleNext = () => {
    if (step < TOUR_STEPS.length - 1) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem("nextsem_tour_completed", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const current = TOUR_STEPS[step];

  return (
    <div className="fixed inset-0 z-[99999] bg-[#030712]/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      
      {/* Game-style tutorial card */}
      <div className="relative w-full max-w-md bg-slate-950/90 border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(59,130,246,0.15)] flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
        
        {/* Glowing floating orb header */}
        <div className={`absolute -top-12 w-24 h-24 rounded-full bg-gradient-to-br ${current.color} opacity-20 blur-xl`} />
        
        {/* Skip button top right */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-200 p-1.5 rounded-full hover:bg-slate-900 transition-colors"
          title="Skip tutorial"
        >
          <X size={18} />
        </button>

        {/* Step Badge */}
        <div className="mb-4 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 shadow-inner">
          <Sparkles size={10} className="text-amber-400 animate-spin" /> Step {step + 1} of {TOUR_STEPS.length}
        </div>

        {/* Big visual game icon */}
        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${current.color} flex items-center justify-center text-4xl shadow-lg border border-white/10 mb-6 transform scale-100 hover:scale-105 transition-transform duration-300`}>
          {current.icon}
        </div>

        {/* Title & Desc */}
        <h2 className="text-xl md:text-2xl font-black text-white leading-tight mb-3">
          {current.title}
        </h2>
        <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8 max-w-sm">
          {current.description}
        </p>

        {/* Indicator dots */}
        <div className="flex gap-1.5 mb-8">
          {TOUR_STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step ? "w-6 bg-blue-500" : "w-1.5 bg-slate-800"
              }`}
            />
          ))}
        </div>

        {/* Action button row */}
        <div className="w-full flex items-center gap-3">
          {step < TOUR_STEPS.length - 1 ? (
            <>
              <button
                onClick={handleSkip}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-black text-slate-400 hover:text-white bg-transparent border border-slate-850 hover:bg-slate-900 transition-colors active:scale-98"
              >
                Skip Intro
              </button>
              <button
                onClick={handleNext}
                className="flex-[2] py-3 px-4 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-500 shadow-[0_4px_15px_rgba(59,130,246,0.4)] flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-98 transition-all"
              >
                Next Step <ChevronRight size={14} />
              </button>
            </>
          ) : (
            <button
              onClick={handleComplete}
              className="w-full py-3.5 px-6 rounded-xl text-sm font-black text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-[0_4px_20px_rgba(16,185,129,0.4)] hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              Start Learning Now! 🎮
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default OnboardingTour;
