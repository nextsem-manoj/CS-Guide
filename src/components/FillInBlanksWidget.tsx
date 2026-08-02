"use client";

import React, { useState } from "react";
import { 
  HelpCircle, CheckCircle2, XCircle, Sparkles, BookOpen, 
  Lightbulb, ChevronDown, ChevronUp, RefreshCw, Check
} from "lucide-react";

export interface FillInBlankItem {
  id: number;
  sentence: string; // e.g. "The ___ command is used to clear the terminal screen."
  blankAnswer: string; // e.g. "cls"
  options?: string[]; // Multiple choice fallback options
  hintKid: string;
  hintPro: string;
  solutionExplanation: string;
  conceptTitle: string;
}

interface FillInBlanksWidgetProps {
  items?: FillInBlankItem[];
  pageNumber?: number;
}

export default function FillInBlanksWidget({ items, pageNumber }: FillInBlanksWidgetProps) {
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [submittedStatus, setSubmittedStatus] = useState<Record<number, boolean | null>>({});
  const [showHints, setShowHints] = useState<Record<number, boolean>>({});
  const [showSolutions, setShowSolutions] = useState<Record<number, boolean>>({});
  const [mode, setMode] = useState<"kid" | "pro">("kid");

  if (!items || items.length === 0) return null;

  const handleInputChange = (id: number, val: string) => {
    setUserAnswers(prev => ({ ...prev, [id]: val }));
    // Reset check status when user types
    if (submittedStatus[id] !== undefined) {
      setSubmittedStatus(prev => ({ ...prev, [id]: null }));
    }
  };

  const checkAnswer = (item: FillInBlankItem) => {
    const userInput = (userAnswers[item.id] || "").trim().toLowerCase();
    const expected = item.blankAnswer.trim().toLowerCase();
    const correct = userInput === expected;
    setSubmittedStatus(prev => ({ ...prev, [item.id]: correct }));
  };

  const toggleHint = (id: number) => {
    setShowHints(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSolution = (id: number) => {
    setShowSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="my-8 p-5 md:p-7 bg-gradient-to-br from-[#0d1728]/95 via-[#0a1221]/95 to-slate-950 border border-blue-500/20 rounded-3xl shadow-2xl space-y-6 text-left select-none relative overflow-hidden">
      {/* Glow overlays */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-black shrink-0">
            ✍️
          </div>
          <div>
            <h3 className="text-sm md:text-base font-black text-white flex items-center gap-2">
              <span>Interactive Fill-in-the-Blanks Study Notes</span>
              {pageNumber && (
                <span className="text-[10px] font-black uppercase text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-md">
                  Page {pageNumber}
                </span>
              )}
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">
              Fill in the missing keywords below to test your understanding of this page
            </p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl shrink-0">
          <button
            onClick={() => setMode("kid")}
            className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
              mode === "kid" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            🐣 Kid Mode
          </button>
          <button
            onClick={() => setMode("pro")}
            className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
              mode === "pro" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            🚀 Pro Mode
          </button>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-6">
        {items.map((item, idx) => {
          const isCorrect = submittedStatus[item.id] === true;
          const isWrong = submittedStatus[item.id] === false;
          const userVal = userAnswers[item.id] || "";

          // Render sentence with input field replacing "___" or "[blank]"
          const parts = item.sentence.split(/___|\[blank\]/g);

          return (
            <div 
              key={item.id}
              className={`p-5 rounded-2xl border transition-all space-y-4 ${
                isCorrect 
                  ? "bg-emerald-950/20 border-emerald-500/30 shadow-emerald-500/5" 
                  : isWrong 
                  ? "bg-red-950/20 border-red-500/30 shadow-red-500/5" 
                  : "bg-slate-950/80 border-slate-800/80 hover:border-slate-700"
              }`}
            >
              {/* Concept Title Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-blue-400 tracking-wider flex items-center gap-1.5">
                  <BookOpen size={11} />
                  <span>{item.conceptTitle || `Question ${idx + 1}`}</span>
                </span>

                {isCorrect && (
                  <span className="flex items-center gap-1 text-[10px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 size={12} /> Correct Answer! 🎉
                  </span>
                )}
                {isWrong && (
                  <span className="flex items-center gap-1 text-[10px] font-black text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 rounded-full">
                    <XCircle size={12} /> Try Again!
                  </span>
                )}
              </div>

              {/* Interactive Fill-in Sentence */}
              <div className="text-sm md:text-base font-semibold text-slate-100 leading-relaxed flex flex-wrap items-center gap-2">
                {parts.map((part, pIdx) => (
                  <React.Fragment key={pIdx}>
                    <span>{part}</span>
                    {pIdx < parts.length - 1 && (
                      <div className="inline-flex items-center relative my-1">
                        <input
                          type="text"
                          placeholder="type answer..."
                          value={userVal}
                          onChange={(e) => handleInputChange(item.id, e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter") checkAnswer(item); }}
                          className={`px-3 py-1.5 rounded-xl border text-sm font-black font-mono focus:outline-none transition-all shadow-inner ${
                            isCorrect 
                              ? "bg-emerald-950 text-emerald-300 border-emerald-500" 
                              : isWrong 
                              ? "bg-red-950 text-red-300 border-red-500" 
                              : "bg-slate-900 text-blue-300 border-blue-500/40 focus:border-blue-400"
                          }`}
                          style={{ minWidth: "140px" }}
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Option Chips (If available) */}
              {item.options && item.options.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Word Bank:</span>
                  {item.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleInputChange(item.id, opt)}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono font-bold text-blue-300 transition-colors cursor-pointer"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Action Buttons: Check Answer, Toggle Hint, Toggle Solution */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/60">
                <button
                  onClick={() => checkAnswer(item)}
                  disabled={!userVal.trim()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <Check size={13} />
                  <span>Check Answer</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleHint(item.id)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Lightbulb size={13} className="text-amber-400" />
                    <span>{showHints[item.id] ? "Hide Hint" : "Need Hint?"}</span>
                  </button>

                  <button
                    onClick={() => toggleSolution(item.id)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <HelpCircle size={13} className="text-blue-400" />
                    <span>{showSolutions[item.id] ? "Hide Solution" : "View Solution"}</span>
                  </button>
                </div>
              </div>

              {/* Hint Box */}
              {showHints[item.id] && (
                <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200 space-y-1 animate-in fade-in">
                  <span className="font-black uppercase tracking-wider text-[10px] text-amber-400 block">
                    💡 Hint ({mode === "kid" ? "Kid Friendly" : "Professional Level"}):
                  </span>
                  <p className="leading-relaxed font-medium">
                    {mode === "kid" ? item.hintKid : item.hintPro}
                  </p>
                </div>
              )}

              {/* Solution Box */}
              {showSolutions[item.id] && (
                <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs text-slate-200 space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="font-black uppercase tracking-wider text-[10px] text-blue-400">
                      ✅ Answer: <strong className="text-white font-mono text-xs underline">{item.blankAnswer}</strong>
                    </span>
                  </div>
                  <p className="leading-relaxed text-slate-300">
                    {item.solutionExplanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
