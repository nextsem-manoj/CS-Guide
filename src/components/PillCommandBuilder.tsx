"use client";

import React, { useState, useEffect } from "react";
import { Terminal, RotateCcw, CheckCircle2, AlertCircle } from "lucide-react";

interface PillCommandBuilderProps {
  task: string;
  pills: string[]; // List of available pills
  correctSequence: string[]; // Correct sequence of pills
  terminalOutput: string;
  explanation: string;
}

export default function PillCommandBuilder({ task, pills, correctSequence, terminalOutput, explanation }: PillCommandBuilderProps) {
  const [selectedPills, setSelectedPills] = useState<string[]>([]);
  const [shuffledPills, setShuffledPills] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Shuffle the input pills on mount
    setShuffledPills([...pills].sort(() => Math.random() - 0.5));
  }, [pills]);

  const handlePillClick = (pill: string) => {
    if (isSuccess) return;
    setIsError(false);
    
    // Add to selected pills
    const nextSelected = [...selectedPills, pill];
    setSelectedPills(nextSelected);

    // If selected length matches correct sequence length, validate
    if (nextSelected.length === correctSequence.length) {
      const matches = nextSelected.every((val, index) => val === correctSequence[index]);
      if (matches) {
        setIsSuccess(true);
      } else {
        setIsError(true);
      }
    }
  };

  const handleReset = () => {
    setSelectedPills([]);
    setIsSuccess(false);
    setIsError(false);
    // Re-shuffle pills
    setShuffledPills([...pills].sort(() => Math.random() - 0.5));
  };

  // Find remaining pills to show (can click multiple times if needed, or filter out used ones)
  // For simplicity, we hide the pill once it is clicked, unless it appears multiple times.
  const getAvailablePills = () => {
    const counts: Record<string, number> = {};
    selectedPills.forEach((p) => {
      counts[p] = (counts[p] || 0) + 1;
    });

    return shuffledPills.filter((pill) => {
      const totalInPills = pills.filter((p) => p === pill).length;
      const totalUsed = counts[pill] || 0;
      return totalUsed < totalInPills;
    });
  };

  const availablePills = getAvailablePills();

  return (
    <div className="my-6 border border-slate-850 bg-[#090f1d] rounded-2xl overflow-hidden shadow-2xl font-sans">
      {/* Title Bar */}
      <div className="p-4 bg-slate-950 border-b border-slate-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded bg-[#39FF14]/15 text-[#39FF14] border border-[#39FF14]/25 flex items-center justify-center">
            <Terminal size={12} />
          </span>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-1">
            Pill Command Builder
          </span>
        </div>
        <button
          onClick={handleReset}
          className="p-1 text-slate-500 hover:text-white transition-colors cursor-pointer"
          title="Reset Builder"
        >
          <RotateCcw size={12} />
        </button>
      </div>

      <div className="p-5 space-y-4">
        {/* Task Title */}
        <div className="space-y-1">
          <span className="text-[8px] font-black uppercase tracking-widest text-[#39FF14] bg-emerald-500/10 px-2 py-0.5 rounded">
            Target Task
          </span>
          <h4 className="text-xs font-black text-slate-200 uppercase tracking-tight mt-1">
            {task}
          </h4>
        </div>

        {/* Builder Terminal Screen */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-900 font-mono text-xs text-slate-300 min-h-[90px] flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 leading-relaxed">
              <span className="text-slate-500">C:\Users\Student&gt;</span>
              {selectedPills.map((pill, idx) => (
                <span 
                  key={idx} 
                  className={`px-2 py-0.5 rounded-md border text-[11px] font-bold ${
                    isSuccess 
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-450" 
                      : isError 
                      ? "bg-red-500/10 border-red-500/30 text-red-400" 
                      : "bg-slate-900 border-slate-800 text-white"
                  }`}
                >
                  {pill}
                </span>
              ))}
              {!isSuccess && (
                <span className="w-1.5 h-3.5 bg-[#39FF14] inline-block ml-0.5 animate-pulse" />
              )}
            </div>
          </div>

          {/* Terminal output on success */}
          {isSuccess && (
            <div className="mt-4 pt-3 border-t border-slate-900 text-emerald-450 whitespace-pre-wrap text-[10px] leading-relaxed">
              {terminalOutput}
            </div>
          )}

          {/* Error notice */}
          {isError && (
            <div className="mt-4 pt-3 border-t border-slate-900 text-red-400 text-[10px] flex items-center gap-1">
              <AlertCircle size={12} />
              <span>Syntax error. The commands or arguments are in the incorrect sequence. Click reset and try again!</span>
            </div>
          )}
        </div>

        {/* Pills Selector */}
        {!isSuccess && (
          <div className="space-y-2">
            <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">
              Click options to build:
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {availablePills.map((pill, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePillClick(pill)}
                  disabled={isError}
                  className="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700 text-xs font-mono font-bold text-slate-200 transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  {pill}
                </button>
              ))}
              {availablePills.length === 0 && selectedPills.length === 0 && (
                <span className="text-[10px] text-slate-500 italic">No pills configured.</span>
              )}
            </div>
          </div>
        )}

        {/* Success Details */}
        {isSuccess && (
          <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/25 space-y-1.5 animate-in zoom-in-95 duration-300">
            <div className="flex items-center gap-1.5 text-emerald-450 text-[11px] font-black uppercase tracking-wider">
              <CheckCircle2 size={14} />
              <span>Execution Successful!</span>
            </div>
            <p className="text-[10px] text-slate-400 font-bold leading-normal pt-0.5">
              {explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
