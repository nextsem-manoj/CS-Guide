"use client";

import React, { useState } from "react";
import { AlertCircle, CheckCircle, HelpCircle } from "lucide-react";

interface Segment {
  text: string;
  isError: boolean;
  explanation: string;
}

interface SpotTheErrorProps {
  question: string;
  command: string; // Shorthand/Display full command
  segments: Segment[];
  correctCommand: string;
  generalExplanation: string;
}

export default function SpotTheError({ question, command, segments = [], correctCommand, generalExplanation }: SpotTheErrorProps) {
  let parsedSegments: Segment[] = [];
  if (Array.isArray(segments)) {
    parsedSegments = segments;
  } else if (typeof segments === "string") {
    try {
      parsedSegments = JSON.parse(segments);
    } catch (e) {
      console.error("Failed to parse segments in SpotTheError:", e);
    }
  }

  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);

  const handleSegmentClick = (index: number) => {
    setClickedIndex(index);
    if (parsedSegments[index] && parsedSegments[index].isError) {
      setSolved(true);
    }
  };

  return (
    <div className="my-6 p-5 md:p-6 rounded-3xl border border-slate-850 bg-[#090f1d]/60 shadow-xl relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-[40px] pointer-events-none" />

      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
            <AlertCircle size={14} />
          </span>
          <div>
            <span className="text-[8px] font-black uppercase tracking-widest text-amber-500">Syntax Debugger</span>
            <h4 className="text-xs font-black text-white uppercase tracking-tight mt-0.5">Spot the Syntax Error!</h4>
          </div>
        </div>

        {/* Question text */}
        <p className="text-xs text-slate-300 font-bold leading-relaxed">
          {question}
        </p>

        {/* Interactive Command Display */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-900 flex flex-wrap gap-1 items-center font-mono text-sm select-none">
          <span className="text-slate-500 mr-2 shrink-0">C:\&gt;</span>
          {parsedSegments.map((seg, idx) => {
            const isClicked = clickedIndex === idx;
            const isErrAndSolved = seg.isError && solved;
            
            return (
              <button
                key={idx}
                onClick={() => handleSegmentClick(idx)}
                className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                  isErrAndSolved
                    ? "bg-red-500/15 border border-red-500/30 text-red-400 font-black shadow-[0_0_8px_rgba(239,68,68,0.1)]"
                    : isClicked && !seg.isError
                    ? "bg-slate-800 border border-slate-700 text-slate-350"
                    : "hover:bg-slate-900 border border-transparent text-white"
                }`}
              >
                {seg.text}
              </button>
            );
          })}
        </div>

        {/* Feedback / Explanations */}
        {clickedIndex !== null && parsedSegments[clickedIndex] && (
          <div 
            className={`p-4 rounded-2xl border text-xs leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300 ${
              parsedSegments[clickedIndex].isError
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-450"
                : "bg-slate-900/60 border-slate-800/80 text-slate-400"
            }`}
          >
            <div className="flex items-start gap-2">
              <span className="text-sm shrink-0">
                {parsedSegments[clickedIndex].isError ? "🎉" : "❓"}
              </span>
              <div>
                <span className="font-black uppercase tracking-wider text-[9px] block mb-1">
                  {parsedSegments[clickedIndex].isError ? "Correct! Error Spotted:" : "Not quite:"}
                </span>
                <p className="font-medium">{parsedSegments[clickedIndex].explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Solved screen */}
        {solved && (
          <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/25 space-y-2 animate-in zoom-in-95 duration-500">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-wider">
              <CheckCircle size={14} />
              <span>Correct Code Syntax:</span>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-900 font-mono text-xs text-white">
              {correctCommand}
            </div>
            <p className="text-[10px] text-slate-400 font-bold leading-normal mt-1">
              {generalExplanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
