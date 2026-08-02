"use client";

import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, RefreshCw, Sparkles, HelpCircle } from 'lucide-react';

interface MatchPair {
  left: string;
  right: string;
}

interface MatchingQuizProps {
  quizId: string;
  pairs: MatchPair[] | string; // Can be parsed JSON or a structured array
  title?: string;
  explanation?: string;
}

export default function MatchingQuiz({
  quizId,
  pairs = [],
  title = "Command Concept Matching",
  explanation = ""
}: MatchingQuizProps) {
  const [leftItems, setLeftItems] = useState<string[]>([]);
  const [rightItems, setRightItems] = useState<string[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({}); // maps left -> right
  const [failedMatch, setFailedMatch] = useState<{ left: string; right: string } | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  let parsedPairs: MatchPair[] = [];
  if (Array.isArray(pairs)) {
    parsedPairs = pairs;
  } else if (typeof pairs === 'string') {
    try {
      parsedPairs = JSON.parse(pairs.trim());
    } catch (e) {
      console.error("Failed to parse pairs string in MatchingQuiz", e);
    }
  }

  // Shuffle arrays helper
  const shuffle = (array: string[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (parsedPairs.length > 0) {
      const lefts = parsedPairs.map(p => p.left);
      const rights = parsedPairs.map(p => p.right);
      setLeftItems(shuffle(lefts));
      setRightItems(shuffle(rights));
      setMatches({});
      setIsFinished(false);
      setSelectedLeft(null);
      setSelectedRight(null);
    }
  }, [quizId]);

  // Handle Match Evaluation
  useEffect(() => {
    if (selectedLeft && selectedRight) {
      const correctPair = parsedPairs.find(p => p.left === selectedLeft);
      if (correctPair && correctPair.right === selectedRight) {
        // Correct match!
        setMatches(prev => {
          const updated = { ...prev, [selectedLeft]: selectedRight };
          if (Object.keys(updated).length === parsedPairs.length) {
            setIsFinished(true);
          }
          return updated;
        });
        setSelectedLeft(null);
        setSelectedRight(null);
      } else {
        // Wrong match!
        const currentLeft = selectedLeft;
        const currentRight = selectedRight;
        setFailedMatch({ left: currentLeft, right: currentRight });
        setSelectedLeft(null);
        setSelectedRight(null);
        
        // Reset wrong highlight after 800ms
        setTimeout(() => {
          setFailedMatch(null);
        }, 800);
      }
    }
  }, [selectedLeft, selectedRight]);

  const handleReset = () => {
    const lefts = parsedPairs.map(p => p.left);
    const rights = parsedPairs.map(p => p.right);
    setLeftItems(shuffle(lefts));
    setRightItems(shuffle(rights));
    setMatches({});
    setIsFinished(false);
    setSelectedLeft(null);
    setSelectedRight(null);
    setFailedMatch(null);
  };

  return (
    <div 
      id={quizId}
      className={`p-5 rounded-3xl border transition-all my-6 ${
        isFinished 
          ? 'border-emerald-500/40 bg-emerald-950/10'
          : 'border-slate-800 bg-slate-900/60'
      }`}
    >
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-extrabold text-[#39ff14]/80 mb-3">
        <Sparkles size={11} className="animate-pulse" />
        {title}
      </div>

      <p className="text-xs text-slate-400 mb-4">
        Click a card on the left column, then click its matching definition on the right column to connect them.
      </p>

      {/* Columns Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-2">
          {leftItems.map(leftVal => {
            const isMatched = matches[leftVal] !== undefined;
            const isSelected = selectedLeft === leftVal;
            const isFailed = failedMatch?.left === leftVal;

            return (
              <button
                key={leftVal}
                disabled={isMatched || isFinished}
                onClick={() => setSelectedLeft(leftVal)}
                className={`w-full text-left p-3 rounded-xl border text-xs font-mono transition-all select-none ${
                  isMatched
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 opacity-60 pointer-events-none'
                    : isFailed
                    ? 'border-rose-500 bg-rose-500/20 text-rose-300 animate-shake'
                    : isSelected
                    ? 'border-blue-500 bg-blue-500/15 text-blue-300 scale-[1.02] shadow-[0_0_8px_rgba(59,130,246,0.3)]'
                    : 'border-slate-800 bg-slate-950/40 text-slate-200 hover:border-slate-700 hover:bg-slate-950/60'
                }`}
              >
                {leftVal}
              </button>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-2">
          {rightItems.map(rightVal => {
            const isMatched = Object.values(matches).includes(rightVal);
            const isSelected = selectedRight === rightVal;
            const isFailed = failedMatch?.right === rightVal;

            return (
              <button
                key={rightVal}
                disabled={isMatched || isFinished}
                onClick={() => setSelectedRight(rightVal)}
                className={`w-full text-left p-3 rounded-xl border text-xs transition-all select-none ${
                  isMatched
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 opacity-60 pointer-events-none'
                    : isFailed
                    ? 'border-rose-500 bg-rose-500/20 text-rose-300 animate-shake'
                    : isSelected
                    ? 'border-blue-500 bg-blue-500/15 text-blue-300 scale-[1.02] shadow-[0_0_8px_rgba(59,130,246,0.3)]'
                    : 'border-slate-800 bg-slate-950/40 text-slate-200 hover:border-slate-700 hover:bg-slate-950/60'
                }`}
              >
                {rightVal}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback Panel */}
      {isFinished && (
        <div className="mt-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex gap-3 items-start bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-2xl">
            <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={16} />
            <div>
              <p className="text-xs font-bold text-emerald-400">Awesome Match Completed! 🎉</p>
              {explanation && (
                <p className="text-xs text-slate-350 mt-1.5 leading-relaxed">{explanation}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reset button shown if made a mistake or finished */}
      {(Object.keys(matches).length > 0 || isFinished) && (
        <div className="flex justify-end mt-4">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700/50 text-[10px] font-bold uppercase transition-all cursor-pointer"
          >
            <RefreshCw size={11} /> Reset Board
          </button>
        </div>
      )}
    </div>
  );
}
