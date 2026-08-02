"use client";

import React, { useState, useEffect } from "react";

export default function TerminalTypingAnimation() {
  const [typedText, setTypedText] = useState("");
  const fullText = "search Command Prompt";
  const [phase, setPhase] = useState<"typing" | "open" | "done">("typing");

  useEffect(() => {
    let index = 0;
    let timer: NodeJS.Timeout;

    const runLoop = () => {
      setPhase("typing");
      setTypedText("");
      index = 0;
      
      const type = () => {
        if (index < fullText.length) {
          setTypedText((prev) => prev + fullText[index]);
          index++;
          timer = setTimeout(type, 120);
        } else {
          setPhase("open");
          timer = setTimeout(() => {
            setPhase("done");
            timer = setTimeout(runLoop, 4000); // Restart after 4s
          }, 1000);
        }
      };

      type();
    };

    runLoop();

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="my-6 border border-slate-800 bg-[#080d16] rounded-2xl overflow-hidden shadow-xl max-w-md mx-auto select-none">
      {/* Search mock box */}
      <div className="p-4 bg-slate-950 border-b border-slate-900 flex items-center justify-between text-xs font-black text-slate-400">
        <span className="uppercase tracking-widest text-[9px] text-[#39FF14] bg-emerald-500/10 px-2 py-0.5 rounded">Interactive Loop</span>
        <span>Windows Search Simulator</span>
      </div>

      <div className="p-5 space-y-4">
        {/* Search bar mockup */}
        <div className="flex items-center gap-2 p-3 bg-slate-900 border border-slate-800 rounded-xl">
          <span className="text-slate-500">🔍</span>
          <span className="text-xs font-mono text-white min-h-[16px]">
            {typedText}
            <span className="w-1.5 h-3 bg-[#39FF14] inline-block ml-0.5 animate-pulse" />
          </span>
        </div>

        {/* Results Mockup */}
        <div className="space-y-2">
          {phase !== "typing" ? (
            <div className="p-3 bg-blue-600/10 border border-blue-500/20 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <span className="text-xl">⚙️</span>
              <div>
                <div className="text-xs font-black text-white">Command Prompt (cmd.exe)</div>
                <div className="text-[10px] text-blue-400">System Desktop App - Click to Launch</div>
              </div>
            </div>
          ) : (
            <div className="text-center text-[10px] text-slate-500 italic py-3">
              Typing query to search...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
