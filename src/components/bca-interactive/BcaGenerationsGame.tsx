"use client";

import React, { useState } from 'react';
import { Star, RotateCcw, Award } from 'lucide-react';

interface GameItem {
  id: string;
  name: string;
  correctGen: string; // "1st", "2nd", "3rd", "4th", "5th"
}

const GAME_ITEMS: GameItem[] = [
  { id: "valves", name: "Vacuum Tubes (Glass Envelopes)", correctGen: "1st" },
  { id: "transistor", name: "Transistors (Semiconductor Switches)", correctGen: "2nd" },
  { id: "ic", name: "Integrated Circuits (Silicon Microchips)", correctGen: "3rd" },
  { id: "micro", name: "Microprocessors (VLSI single-chip CPU)", correctGen: "4th" },
  { id: "ai", name: "ULSI & Artificial Intelligence (Watson, PARAM)", correctGen: "5th" }
];

const TARGETS = [
  { id: "1st", label: "1st Gen", period: "1940 - 1956" },
  { id: "2nd", label: "2nd Gen", period: "1956 - 1963" },
  { id: "3rd", label: "3rd Gen", period: "1964 - 1971" },
  { id: "4th", label: "4th Gen", period: "1971 - Present" },
  { id: "5th", label: "5th Gen", period: "Present & Beyond" }
];

export default function BcaGenerationsGame() {
  const [selectedTech, setSelectedTech] = useState<GameItem | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({}); // { targetGen: techName }
  const [solvedTechIds, setSolvedTechIds] = useState<Set<string>>(new Set());
  const [wrongTargetId, setWrongTargetId] = useState<string | null>(null);
  const [earnedPoints, setEarnedPoints] = useState(0);

  const playSound = (type: 'success' | 'error') => {
    if (typeof window === "undefined") return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      
      if (type === 'success') {
        // C5 to E5 chord
        const osc1 = audioCtx.createOscillator();
        const gain1 = audioCtx.createGain();
        osc1.connect(gain1);
        gain1.connect(audioCtx.destination);
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        gain1.gain.setValueAtTime(0.02, audioCtx.currentTime);
        osc1.start();
        osc1.stop(audioCtx.currentTime + 0.08);

        setTimeout(() => {
          const osc2 = audioCtx.createOscillator();
          const gain2 = audioCtx.createGain();
          osc2.connect(gain2);
          gain2.connect(audioCtx.destination);
          osc2.type = "sine";
          osc2.frequency.setValueAtTime(659.25, audioCtx.currentTime); // E5
          gain2.gain.setValueAtTime(0.02, audioCtx.currentTime);
          osc2.start();
          osc2.stop(audioCtx.currentTime + 0.12);
        }, 60);
      } else {
        // Low sawtooth buzz
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(140, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      }
    } catch (e) {}
  };

  const handleTechClick = (tech: GameItem) => {
    if (solvedTechIds.has(tech.id)) return;
    setSelectedTech(tech);
    setWrongTargetId(null);
  };

  const handleTargetClick = (targetId: string) => {
    if (!selectedTech) return;

    if (selectedTech.correctGen === targetId) {
      // Correct Match
      playSound('success');
      setMatches(prev => ({ ...prev, [targetId]: selectedTech.name }));
      setSolvedTechIds(prev => {
        const next = new Set(prev);
        next.add(selectedTech.id);
        return next;
      });
      setSelectedTech(null);
      setWrongTargetId(null);

      // Reward points (+10 XP)
      const newPoints = earnedPoints + 10;
      setEarnedPoints(newPoints);

      // Add to local storage BCA points
      const savedUser = localStorage.getItem('nextsem_user');
      let email = "guest";
      if (savedUser) {
        try {
          email = JSON.parse(savedUser).email || "guest";
        } catch (e) {}
      }
      const savedPoints = parseInt(localStorage.getItem(`nextsem_bca_points_${email}`) || "0", 10);
      localStorage.setItem(`nextsem_bca_points_${email}`, (savedPoints + 10).toString());
      
      // Fire custom event to update points in page headers
      window.dispatchEvent(new Event("nextsem_points_updated"));
    } else {
      // Wrong Match
      playSound('error');
      setWrongTargetId(targetId);
      setTimeout(() => {
        setWrongTargetId(null);
      }, 500);
    }
  };

  const handleReset = () => {
    setSelectedTech(null);
    setMatches({});
    setSolvedTechIds(new Set());
    setWrongTargetId(null);
    setEarnedPoints(0);
  };

  const isGameOver = solvedTechIds.size === GAME_ITEMS.length;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-slate-400">
          Match the technology card on the left to its corresponding generation period slot on the right.
        </p>
        {earnedPoints > 0 && (
          <span className="flex items-center gap-1 text-[10px] font-black text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
            +{earnedPoints} XP
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Left Column: Technology Cards Pool */}
        <div className="md:col-span-2 flex flex-col gap-3">
          <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest block mb-1">Technology Cards</span>
          
          {GAME_ITEMS.map((tech) => {
            const isSolved = solvedTechIds.has(tech.id);
            const isSelected = selectedTech?.id === tech.id;

            return (
              <button
                key={tech.id}
                onClick={() => handleTechClick(tech)}
                disabled={isSolved}
                className={`w-full p-4 rounded-2xl text-left border text-xs font-black leading-snug transition-all duration-200 cursor-pointer ${
                  isSolved 
                    ? 'bg-slate-900/30 border-slate-900 text-slate-600 cursor-default' 
                    : isSelected 
                      ? 'bg-emerald-500/10 border-emerald-400 text-emerald-350 shadow-md shadow-emerald-500/5 scale-[0.98]'
                      : 'bg-[#121217] border-white/5 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                {tech.name}
                {isSolved && <span className="float-right text-[#39D353]">✓ Solved</span>}
              </button>
            );
          })}
        </div>

        {/* Right Column: Generation Slots */}
        <div className="md:col-span-3 flex flex-col gap-3">
          <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest block mb-1">Generation Slots</span>
          
          {TARGETS.map((target) => {
            const matchedName = matches[target.id];
            const isSolved = !!matchedName;
            const isWrong = wrongTargetId === target.id;
            const activeMatch = selectedTech;

            return (
              <div
                key={target.id}
                onClick={() => handleTargetClick(target.id)}
                className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-all duration-150 relative ${
                  isSolved
                    ? 'bg-emerald-950/10 border-emerald-500/30 text-emerald-300'
                    : isWrong
                      ? 'bg-red-500/10 border-red-500/40 text-red-400 animate-shake'
                      : activeMatch
                        ? 'bg-indigo-950/10 border-indigo-500/25 text-indigo-350 hover:border-indigo-400 cursor-pointer'
                        : 'bg-[#121217] border-white/5 text-slate-400'
                }`}
              >
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black">{target.label}</span>
                    <span className="text-[9px] font-bold text-slate-500">({target.period})</span>
                  </div>
                  {isSolved ? (
                    <p className="text-[11px] text-[#39D353] font-bold mt-1 animate-fadeInFast">
                      ⚡ {matchedName}
                    </p>
                  ) : (
                    <p className="text-[10px] text-slate-550 mt-1 select-none font-medium">
                      {activeMatch ? "Click to match selection" : "Empty slot"}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Game Over Screen */}
      {isGameOver && (
        <div className="bg-[#121217] border border-emerald-500/20 rounded-3xl p-6 text-center animate-fadeInFast flex flex-col items-center justify-center">
          <Award size={40} className="text-amber-400 mb-3 animate-pulse" />
          <h4 className="text-lg font-black text-white">Challenge Completed!</h4>
          <p className="text-slate-400 text-xs mt-1">Excellent! You matched all computing technology generations perfectly. (+50 XP Earned)</p>
          <button
            onClick={handleReset}
            className="mt-4 flex items-center gap-1.5 px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-850 text-[10px] font-black uppercase tracking-wider text-slate-300 rounded-xl transition-all cursor-pointer"
          >
            <RotateCcw size={12} />
            Play Again
          </button>
        </div>
      )}
      
      {!isGameOver && solvedTechIds.size > 0 && (
        <div className="text-center mt-2">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 border border-slate-900 hover:border-slate-800 text-[10px] font-bold text-slate-400 hover:text-slate-200 rounded-lg transition-all cursor-pointer"
          >
            <RotateCcw size={11} />
            Reset Challenge
          </button>
        </div>
      )}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-4px); }
          40%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
