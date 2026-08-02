"use client";

import React, { useState } from 'react';
import { CheckCircle2, XCircle, RefreshCw, HelpCircle, Sparkles } from 'lucide-react';

interface DragDropQuestionProps {
  questionId: string;
  text: string;
  correctOption: string;
  options: string[] | string;
  explanation: string;
}

export default function DragDropQuestion({
  questionId,
  text = "",
  correctOption = "",
  options = [],
  explanation = ""
}: DragDropQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shake, setShake] = useState(false);

  let safeOptions: string[] = [];
  if (Array.isArray(options)) {
    safeOptions = options;
  } else if (typeof options === 'string') {
    const trimmed = options.trim();
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        safeOptions = JSON.parse(trimmed);
      } catch (e) {
        // Fallback: strip brackets and split by comma
        safeOptions = trimmed.slice(1, -1)
          .split(',')
          .map(s => s.replace(/['"]/g, '').trim())
          .filter(Boolean);
      }
    } else {
      safeOptions = trimmed.split(',').map(s => s.trim()).filter(Boolean);
    }
  }

  const safeText = text || "";
  const safeExplanation = explanation || "";

  const handleDrop = (item: string) => {
    setSelected(item);
    if (item === correctOption) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleDragStart = (e: React.DragEvent, item: string) => {
    e.dataTransfer.setData('text/plain', item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    try {
      e.dataTransfer.dropEffect = 'move';
    } catch (err) {
      // safe fallback
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const item = e.dataTransfer.getData('text/plain');
    if (item) {
      handleDrop(item);
    }
  };

  const handleOptionClick = (item: string) => {
    if (isCorrect) return;
    handleDrop(item);
  };

  const handleReset = () => {
    setSelected(null);
    setIsCorrect(null);
  };

  // Split text around the blank "__________"
  const parts = safeText.split("__________");

  return (
    <div 
      id={questionId}
      className={`p-5 rounded-2xl border transition-all my-6 ${
        isCorrect === true
          ? 'border-emerald-500/40 bg-emerald-950/10'
          : isCorrect === false
          ? 'border-rose-500/30 bg-rose-950/10'
          : 'border-slate-800 bg-slate-900/60'
      }`}
    >
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-extrabold text-[#39ff14]/80 mb-2">
        <Sparkles size={11} className="animate-pulse" />
        Interactive Command Drill
      </div>
      
      {/* Question Text with Drop Zone */}
      <div className="text-sm md:text-base font-semibold text-slate-100 flex flex-wrap items-center gap-2 mb-4 leading-relaxed">
        {parts[0]}
        <div
          onDragOver={onDragOver}
          onDrop={onDrop}
          className={`px-4 py-2 min-w-[120px] h-10 inline-flex items-center justify-center border-2 border-dashed rounded-xl transition-all ${
            isCorrect === true
              ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400 font-mono font-bold scale-105'
              : isCorrect === false
              ? `border-rose-500 bg-rose-500/20 text-rose-400 font-mono ${shake ? 'animate-shake' : ''}`
              : 'border-blue-500/40 bg-slate-950/40 text-slate-400 hover:border-blue-500/60'
          }`}
        >
          {selected ? (
            <span className="font-mono text-xs md:text-sm font-bold bg-slate-950/60 px-2 py-0.5 rounded border border-white/5">{selected}</span>
          ) : (
            <span className="text-[11px] font-medium tracking-wide uppercase opacity-60">Drop Here</span>
          )}
        </div>
        {parts[1]}
      </div>

      {/* Drag options list */}
      {!isCorrect && (
        <div className="flex flex-wrap gap-2.5 my-4">
          {safeOptions.map((opt) => (
            <div
              key={opt}
              draggable={!isCorrect}
              onDragStart={(e) => handleDragStart(e, opt)}
              onClick={() => handleOptionClick(opt)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleOptionClick(opt);
                }
              }}
              role="button"
              tabIndex={0}
              className="px-4 py-2 bg-slate-800/80 hover:bg-slate-700 text-slate-100 border border-slate-700/60 hover:border-blue-500/50 rounded-xl cursor-grab font-mono text-xs select-none transition-all active:cursor-grabbing hover:scale-[1.03] shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {opt}
            </div>
          ))}
        </div>
      )}

      {/* Feedback Panel */}
      {isCorrect !== null && (
        <div className="mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {isCorrect ? (
            <div className="flex gap-3 items-start bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl">
              <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={16} />
              <div>
                <p className="text-xs font-bold text-emerald-400">Excellent! Correct Command.</p>
                <p className="text-xs text-slate-350 mt-1 leading-relaxed">{safeExplanation}</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center bg-rose-500/5 border border-rose-500/20 p-4 rounded-xl">
              <div className="flex gap-3 items-start">
                <XCircle className="text-rose-400 shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="text-xs font-bold text-rose-400">Oops! Incorrect command.</p>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Try dragging another option or click directly to select.
                  </p>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Try Again"
              >
                <RefreshCw size={14} className="animate-spin-once" />
              </button>
            </div>
          )}
        </div>
      )}
      
      {!isCorrect && (
        <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-3">
          <HelpCircle size={10} />
          <span>Tip: Drag command chips into the box, or simply click/tap them to answer!</span>
        </div>
      )}
    </div>
  );
}
