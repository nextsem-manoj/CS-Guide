"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Cpu, ArrowRight, Play, RefreshCw, Layers } from "lucide-react";

interface CommandDefinition {
  cmd: string;
  binary: string;
  action: string;
  explanation: string;
}

const SAMPLE_COMMANDS: Record<string, CommandDefinition> = {
  "ver": {
    cmd: "ver",
    binary: "01110110 01100101 01110010",
    action: "Querying Kernel OS registry metadata for build tags...",
    explanation: "Retrieves the current operating system kernel build tag (e.g. Microsoft Windows [Version 10.0.22621])."
  },
  "dir": {
    cmd: "dir",
    binary: "01100100 01101001 01110010",
    action: "Enumerating local MFT directory indexes...",
    explanation: "Queries the disk file table to list all files and subfolders within the active directory path."
  },
  "mkdir": {
    cmd: "mkdir",
    binary: "01101101 01101011 01100100 01101001 01110010",
    action: "Sending NTFS CreateDirectory system call to partition controller...",
    explanation: "Allocates a new block on the hard drive storage table to register a new folder index."
  },
  "cls": {
    cmd: "cls",
    binary: "01100011 01101100 01110011",
    action: "Clearing active command buffer memory and flushing stdout...",
    explanation: "Empties the screen output buffer state, clearing the visual terminal interface."
  }
};

export default function CommandInterpreterSimulation() {
  const [selectedCmd, setSelectedCmd] = useState<string>("ver");
  const [typedInput, setTypedInput] = useState<string>("ver");
  const [isInterpreting, setIsInterpreting] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    setTypedInput(selectedCmd);
    setStep(0);
    setLogs([]);
  }, [selectedCmd]);

  const triggerInterpretation = () => {
    if (isInterpreting) return;
    setIsInterpreting(true);
    setStep(1);
    setLogs(["[Operator] Sending command string: \"" + typedInput + "\""]);

    // Step 2: Interpretation
    setTimeout(() => {
      setStep(2);
      const matched = SAMPLE_COMMANDS[typedInput.toLowerCase().trim()];
      const binaryVal = matched 
        ? matched.binary 
        : typedInput.split("").map(c => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
      
      setLogs(prev => [
        ...prev,
        "[CMD.EXE] Command recognized. Parsing syntax structure...",
        "[CMD.EXE] Translating human command string to machine binary code...",
        `[CMD.EXE] Generated Binary Instruction: ${binaryVal.slice(0, 45)}...`
      ]);
    }, 1200);

    // Step 3: Execution
    setTimeout(() => {
      setStep(3);
      const matched = SAMPLE_COMMANDS[typedInput.toLowerCase().trim()];
      const actionText = matched ? matched.action : "Sending general instruction block to local CPU execution threads...";
      const outcomeText = matched 
        ? matched.explanation 
        : "Executing generic command sequence. Return code status: SUCCESS.";
      
      setLogs(prev => [
        ...prev,
        `[Kernel] ${actionText}`,
        `[Action] Done. ${outcomeText}`
      ]);
      setIsInterpreting(false);
    }, 2800);
  };

  const currentDef = SAMPLE_COMMANDS[typedInput.toLowerCase().trim()];

  return (
    <div className="my-8 rounded-2xl border border-blue-500/10 dark:border-slate-800 bg-[#090f1e]/40 shadow-xl overflow-hidden select-none">
      
      {/* ── Title & Intro Definition Card ── */}
      <div className="p-6 md:p-8 border-b border-blue-500/10 bg-[#090f1e]/70">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#00B0FF] bg-blue-500/10 px-2.5 py-1 rounded-full select-none mb-3 inline-block">
          Concept Spotlight
        </span>
        <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight mb-4">
          What is the Windows Command Line?
        </h3>
        <p className="text-xs md:text-sm text-slate-350 leading-relaxed font-medium">
          Generally, the <strong>&ldquo;Windows command line&rdquo;</strong> refers to a program called the <strong>&ldquo;Command Prompt&rdquo;</strong>, or <strong>CMD.EXE</strong>, that has been included with every version of Windows since Windows 2000. 
          <br /><br />
          CMD.EXE is Windows&apos;s built-in <strong>command interpreter</strong>. A command interpreter is a program that takes lines of text entered by the computer operator (i.e. you) and converts them into instructions the computer hardware can actually understand. A command prompt is commonly referred to as a command-line interface or a <strong>CLI</strong>.
        </p>
      </div>

      {/* ── Interactive Simulation Playground ── */}
      <div className="p-5 md:p-6 bg-[#070b13]">
        <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-4 block">
          Interactive Command Interpreter Flow
        </div>

        {/* Preset Selector Panel */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {Object.keys(SAMPLE_COMMANDS).map((cmdName) => (
            <button
              key={cmdName}
              onClick={() => setSelectedCmd(cmdName)}
              disabled={isInterpreting}
              className={`py-2 px-3 rounded-lg text-xs font-black transition-all cursor-pointer ${
                selectedCmd === cmdName
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                  : "bg-slate-900/50 hover:bg-slate-900 border border-slate-800 text-slate-400"
              }`}
            >
              Command: {cmdName}
            </button>
          ))}
        </div>

        {/* Three-Step Visual Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch mb-6 relative">
          
          {/* Box 1: User Text Input */}
          <div className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
            step === 1 ? "border-[#00e5ff] bg-[#00e5ff]/5" : "border-slate-800 bg-slate-950/40"
          }`}>
            <div>
              <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider block mb-2">
                1. Operator Input (Human Text)
              </span>
              <div className="font-mono text-xs text-slate-330 p-2.5 bg-slate-950 rounded-lg border border-slate-900 flex items-center gap-1.5 min-h-[40px]">
                <span className="text-slate-500">C:\&gt;</span>
                <input 
                  type="text" 
                  value={typedInput}
                  onChange={(e) => setTypedInput(e.target.value)}
                  disabled={isInterpreting}
                  className="bg-transparent focus:outline-none text-white w-full"
                />
              </div>
            </div>
            <button 
              onClick={triggerInterpretation}
              disabled={isInterpreting || !typedInput.trim()}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 text-white font-black text-[10px] uppercase py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <Play size={11} />
              <span>Interpret Instruction</span>
            </button>
          </div>

          {/* Box 2: CMD.EXE Interpreter Brain */}
          <div className={`p-4 rounded-xl border transition-all flex flex-col justify-center items-center text-center relative ${
            step === 2 ? "border-amber-400 bg-amber-400/5 shadow-lg shadow-amber-400/5" : "border-slate-800 bg-slate-950/40"
          }`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${
              step === 2 ? "bg-amber-400/20 text-amber-400 animate-pulse" : "bg-slate-900 text-slate-500"
            }`}>
              <Layers size={20} className={step === 2 ? "animate-spin duration-3000" : ""} />
            </div>
            <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider block mb-1">
              2. CMD.EXE (Command Interpreter)
            </span>
            <p className="text-[10px] text-slate-400 leading-relaxed px-2">
              Parses the command, checks syntax rules, and translates text to machine instructions.
            </p>
            {step === 2 && (
              <span className="absolute bottom-2.5 text-[8px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded uppercase font-black tracking-widest">
                Translating...
              </span>
            )}
          </div>

          {/* Box 3: Machine Action Output */}
          <div className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
            step === 3 ? "border-[#00e676] bg-[#00e676]/5" : "border-slate-800 bg-slate-950/40"
          }`}>
            <div>
              <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider block mb-2">
                3. Computer Execution (Binary & Effect)
              </span>
              <div className="font-mono text-[9px] text-[#00e676] p-2 bg-slate-950 rounded border border-slate-900 min-h-[44px] break-all leading-normal select-all">
                {currentDef ? currentDef.binary : "Calculating instructions..."}
              </div>
            </div>
            <div className="mt-3 flex items-start gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-850">
              <Cpu size={14} className="text-emerald-400 mt-0.5 shrink-0" />
              <div className="text-[9px] text-slate-400 leading-normal">
                <strong>System Call:</strong> {currentDef ? currentDef.explanation : "Executing user command lines."}
              </div>
            </div>
          </div>

        </div>

        {/* Live console logging window */}
        <div className="border border-slate-900 bg-slate-950 rounded-xl overflow-hidden shadow-inner">
          <div className="bg-slate-900 px-4 py-2 border-b border-slate-950 flex items-center justify-between text-[9px] font-mono text-slate-500 font-bold select-none">
            <div className="flex items-center gap-1.5">
              <Terminal size={11} className="text-blue-500" />
              <span>Interpreter Translation Logs</span>
            </div>
            <span>Stdout Console</span>
          </div>
          <div className="p-4 h-32 overflow-y-auto font-mono text-[10px] text-slate-400 space-y-1.5 scrollbar-thin">
            {logs.length === 0 ? (
              <div className="text-slate-650 italic text-center pt-8">
                Click &ldquo;Interpret Instruction&rdquo; above to inspect the translation workflow...
              </div>
            ) : (
              logs.map((log, index) => {
                let colorClass = "text-slate-450";
                if (log.startsWith("[Operator]")) colorClass = "text-sky-400";
                if (log.startsWith("[CMD.EXE]")) colorClass = "text-amber-400";
                if (log.startsWith("[Kernel]") || log.startsWith("[Action]")) colorClass = "text-emerald-400 font-bold";
                return (
                  <div key={index} className={colorClass}>
                    {log}
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
