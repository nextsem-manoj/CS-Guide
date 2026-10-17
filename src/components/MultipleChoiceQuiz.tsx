"use client";

import React, { useState } from 'react';
import { CheckCircle2, XCircle, RefreshCw, Sparkles, HelpCircle } from 'lucide-react';

interface MultipleChoiceQuizProps {
  quizId: string;
  question: string;
  options: string[] | string;
  correctOption: string;
  explanation: string;
  title?: string;
}

export default function MultipleChoiceQuiz({
  quizId,
  question = "",
  options = [],
  correctOption = "",
  explanation = "",
  title = "Syllabus Multiple Choice Check"
}: MultipleChoiceQuizProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shake, setShake] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  let safeOptions: string[] = [];
  if (Array.isArray(options)) {
    safeOptions = options;
  } else if (typeof options === 'string') {
    const trimmed = options.trim();
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        safeOptions = JSON.parse(trimmed);
      } catch (e) {
        safeOptions = trimmed.slice(1, -1)
          .split(',')
          .map(s => s.replace(/['"]/g, '').trim())
          .filter(Boolean);
      }
    } else {
      safeOptions = trimmed.split(',').map(s => s.trim()).filter(Boolean);
    }
  }

  // Fisher-Yates unbiased shuffle
  const shuffleList = (arr: string[]) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  React.useEffect(() => {
    if (safeOptions.length > 0) {
      setShuffledOptions(shuffleList(safeOptions));
    }
  }, [options]);

  const handleSelect = (option: string) => {
    if (isCorrect) return; // Prevent clicking after correct answer
    setSelected(option);
    if (option === correctOption) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleReset = () => {
    setSelected(null);
    setIsCorrect(null);
    if (safeOptions.length > 0) {
      setShuffledOptions(shuffleList(safeOptions));
    }
  };

  const displayOptions = shuffledOptions.length > 0 ? shuffledOptions : safeOptions;
  const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div 
      id={quizId}
      className={`p-5 rounded-3xl border transition-all my-6 ${
        isCorrect === true
          ? 'border-emerald-500/40 bg-emerald-950/10'
          : isCorrect === false
          ? 'border-rose-500/30 bg-rose-950/10'
          : 'border-slate-800 bg-slate-900/60'
      }`}
    >
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-extrabold text-[#39ff14]/80 mb-3">
        <Sparkles size={11} className="animate-pulse" />
        {title}
      </div>

      <h3 className="text-sm md:text-base font-semibold text-slate-100 mb-4 leading-relaxed">
        {question}
      </h3>

      {/* Options Stack */}
      <div className="space-y-2.5">
        {displayOptions.map((opt, idx) => {
          const isSelected = selected === opt;
          const isWrong = isSelected && isCorrect === false;
          const isRight = opt === correctOption && isCorrect === true;
          const letter = optionLetters[idx] || `${idx + 1}`;

          return (
            <button
              key={`${opt}-${idx}`}
              disabled={isCorrect === true}
              onClick={() => handleSelect(opt)}
              className={`w-full text-left p-4 rounded-xl border text-xs md:text-sm transition-all flex items-center justify-between gap-3 ${
                isRight
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold scale-[1.01]'
                  : isWrong
                  ? `border-rose-500 bg-rose-500/10 text-rose-400 ${shake ? 'animate-shake' : ''}`
                  : isSelected
                  ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                  : 'border-slate-850 bg-slate-950/40 text-slate-300 hover:border-slate-700 hover:bg-slate-950/60'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`w-6 h-6 rounded-lg text-[11px] font-black flex items-center justify-center shrink-0 border ${
                  isRight
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                    : isWrong
                    ? 'bg-rose-500 text-white border-rose-400'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>
                  {letter}
                </span>
                <span className="break-words leading-relaxed">{opt}</span>
              </div>
              {isRight && <CheckCircle2 size={16} className="text-emerald-400 shrink-0 ml-2" />}
              {isWrong && <XCircle size={16} className="text-rose-400 shrink-0 ml-2" />}
            </button>
          );
        })}
      </div>

      {/* Feedback Panel */}
      {isCorrect !== null && (
        <div className="mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {isCorrect ? (
            <div className="flex gap-3 items-start bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl">
              <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={16} />
              <div>
                <p className="text-xs font-bold text-emerald-400">Excellent! Correct Answer.</p>
                <p className="text-xs text-slate-350 mt-1 leading-relaxed">{explanation}</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center bg-rose-500/5 border border-rose-500/20 p-4 rounded-xl">
              <div className="flex gap-3 items-start">
                <XCircle className="text-rose-400 shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="text-xs font-bold text-rose-400">Not quite right.</p>
                  <p className="text-xs text-slate-450 mt-1 leading-relaxed">
                    Check your notes and try another option!
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
    </div>
  );
}
