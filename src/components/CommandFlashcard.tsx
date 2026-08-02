"use client";

import React, { useState } from "react";
import { HelpCircle, RefreshCw, Star } from "lucide-react";

interface Flashcard {
  command: string;
  analogy: string;
  explanation: string;
  joke?: string;
}

interface CommandFlashcardProps {
  cards: Flashcard[];
}

export default function CommandFlashcard({ cards = [] }: CommandFlashcardProps) {
  let parsedCards: Flashcard[] = [];
  if (Array.isArray(cards)) {
    parsedCards = cards;
  } else if (typeof cards === "string") {
    try {
      parsedCards = JSON.parse(cards);
    } catch (e) {
      console.error("Failed to parse cards in CommandFlashcard:", e);
    }
  }

  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setActiveCardIdx((prev) => (prev + 1) % parsedCards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setActiveCardIdx((prev) => (prev - 1 + parsedCards.length) % parsedCards.length);
    }, 150);
  };

  const activeCard = parsedCards[activeCardIdx];

  if (!activeCard) return null;

  return (
    <div className="my-6 max-w-md mx-auto space-y-4 font-sans select-none">
      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
        <span>💡 Analogy Flashcard</span>
        <span>
          Card {activeCardIdx + 1} of {parsedCards.length}
        </span>
      </div>

      {/* 3D Flipping Card Container */}
      <div 
        onClick={handleFlip}
        className="w-full h-64 cursor-pointer relative perspective"
      >
        <div 
          className={`w-full h-full rounded-3xl border transition-all duration-500 transform style-preserve-3d relative ${
            isFlipped ? "rotate-y-180" : ""
          } ${
            isFlipped 
              ? "border-[#39FF14]/30 bg-[#071911]/80 shadow-[0_0_15px_rgba(16,185,129,0.05)]" 
              : "border-slate-800 bg-slate-900/50 hover:border-slate-700 shadow-xl"
          }`}
        >
          {/* FRONT SIDE */}
          <div className="absolute inset-0 backface-hidden p-6 flex flex-col justify-between items-center text-center">
            <span className="p-1 rounded bg-slate-950/60 border border-slate-850 text-slate-500 flex items-center justify-center">
              <Star size={10} className="text-[#39FF14]" />
            </span>
            
            <div className="space-y-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-[#39FF14] bg-emerald-500/10 px-2 py-0.5 rounded">
                CLI Command
              </span>
              <h3 className="text-xl md:text-2xl font-mono font-black text-white tracking-tight">
                {activeCard.command}
              </h3>
            </div>

            <div className="text-[9px] font-bold text-slate-500 flex items-center gap-1.5 hover:text-slate-350 transition-colors uppercase tracking-widest">
              <RefreshCw size={10} /> Click card to flip
            </div>
          </div>

          {/* BACK SIDE */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 p-6 flex flex-col justify-between items-center text-center overflow-y-auto">
            {/* Analogy Badge */}
            <div className="space-y-1">
              <span className="text-[8px] font-black uppercase tracking-widest text-emerald-450 bg-emerald-500/10 px-2 py-0.5 rounded">
                💡 Analogy Shorthand
              </span>
              <h4 className="text-xs font-black text-white uppercase tracking-tight mt-1">
                {activeCard.analogy}
              </h4>
            </div>

            {/* Explanation */}
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed max-w-sm">
              {activeCard.explanation}
            </p>

            {/* Dev Joke */}
            {activeCard.joke && (
              <div className="text-[10px] text-slate-500 font-bold italic leading-relaxed border-t border-slate-950/60 pt-2 w-full">
                💬 {activeCard.joke}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          className="flex-1 py-2 bg-slate-900 border border-slate-850 hover:border-slate-700 hover:text-white text-slate-450 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer text-center"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="flex-1 py-2 bg-[#39FF14] hover:bg-[#32e011] text-black text-[10px] font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer text-center hover:shadow-lg hover:shadow-emerald-500/10"
        >
          Next Card
        </button>
      </div>

      {/* Global CSS style block for 3D flip animations */}
      <style jsx global>{`
        .perspective {
          perspective: 1000px;
        }
        .style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
