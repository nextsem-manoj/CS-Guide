"use client";

import React, { useState } from "react";
import { Terminal, Play, RotateCcw, CheckCircle2, Sparkles, Monitor, Code } from "lucide-react";

export interface SimulationConfig {
  type: "cli" | "office" | "html";
  title: string;
  initialOutput?: string;
  expectedCommands?: string[];
  simulationSteps?: { command: string; output: string }[];
}

interface PdfSimulationEngineProps {
  config?: SimulationConfig;
  subjectTitle?: string;
}

export default function PdfSimulationEngine({ config, subjectTitle }: PdfSimulationEngineProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [userCommandInput, setUserCommandInput] = useState("");
  const [history, setHistory] = useState<{ command: string; output: string }[]>([]);

  if (!config) return null;

  const currentStep = config.simulationSteps?.[activeStepIndex] || {
    command: "dir",
    output: " Directory of C:\\Users\\Student\n\n07/25/2026  10:00 AM    <DIR>          Desktop\n07/25/2026  10:00 AM    <DIR>          Documents\n               0 File(s)              0 bytes"
  };

  const handleRunCommand = () => {
    const input = userCommandInput.trim();
    if (!input) return;

    let output = `Command '${input}' executed successfully.`;
    if (config.simulationSteps) {
      const matchedStep = config.simulationSteps.find(s => s.command.toLowerCase() === input.toLowerCase());
      if (matchedStep) {
        output = matchedStep.output;
      }
    }

    setHistory(prev => [...prev, { command: input, output }]);
    setUserCommandInput("");
  };

  const handleReset = () => {
    setHistory([]);
    setActiveStepIndex(0);
    setUserCommandInput("");
  };

  return (
    <div className="my-8 p-5 md:p-7 bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl space-y-4 text-left select-none relative overflow-hidden">
      {/* Simulation Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Terminal size={16} />
          </div>
          <div>
            <h4 className="text-xs font-black text-white flex items-center gap-2">
              <span>🖥️ Interactive Concept Simulation</span>
            </h4>
            <p className="text-[10px] text-slate-400 font-medium">
              {config.title || "Run and test commands directly in the virtual sandbox below"}
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          title="Reset Simulation"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      {/* Terminal Sandbox Window */}
      <div className="rounded-2xl border border-slate-800 bg-[#0c101c] overflow-hidden font-mono text-xs shadow-inner">
        {/* Terminal Titlebar */}
        <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="text-[10px] font-bold text-slate-400 ml-2">cmd.exe - Virtual Windows Terminal</span>
          </div>
          <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
            ONLINE
          </span>
        </div>

        {/* Terminal Screen Output Area */}
        <div className="p-4 h-48 overflow-y-auto space-y-2 text-slate-300 scrollbar-thin">
          <p className="text-slate-500">Microsoft Windows [Version 10.0.22631.3007]</p>
          <p className="text-slate-500">(c) Microsoft Corporation. All rights reserved.</p>
          
          <div className="pt-2" />

          {/* History */}
          {history.map((h, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center gap-2 text-blue-400 font-bold">
                <span>C:\Users\NextSem&gt;</span>
                <span className="text-white">{h.command}</span>
              </div>
              <pre className="text-slate-300 font-mono text-xs whitespace-pre-wrap pl-2 leading-relaxed">
                {h.output}
              </pre>
            </div>
          ))}

          {/* Prompt Input Row */}
          <div className="flex items-center gap-2 text-blue-400 font-bold pt-1">
            <span>C:\Users\NextSem&gt;</span>
            <input
              type="text"
              value={userCommandInput}
              onChange={(e) => setUserCommandInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleRunCommand(); }}
              placeholder={currentStep.command}
              className="flex-1 bg-transparent text-white font-mono focus:outline-none placeholder-slate-600 text-xs"
              autoFocus
            />
            <button
              onClick={handleRunCommand}
              className="px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-sans font-bold uppercase transition-colors shrink-0"
            >
              Run
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
