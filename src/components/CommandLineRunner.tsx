"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, Play, RotateCcw, CheckCircle, Sparkles, HelpCircle } from "lucide-react";

interface CommandItem {
  input: string;
  output: string;
  explanation: string;
  visualState?: string; // Optional hook for visual feedback changes
}

interface CommandLineRunnerProps {
  commands: CommandItem[] | string; // Can be array or stringified JSON
}

export default function CommandLineRunner({ commands = [] }: CommandLineRunnerProps) {
  let parsedCommands: CommandItem[] = [];
  if (Array.isArray(commands)) {
    parsedCommands = commands;
  } else if (typeof commands === "string") {
    try {
      parsedCommands = JSON.parse(commands);
    } catch (e) {
      console.error("Failed to parse commands in CommandLineRunner:", e);
    }
  }

  const [activeCommandIndex, setActiveCommandIndex] = useState<number | null>(null);
  const [typedText, setTypedText] = useState("");
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "Microsoft Windows [Version 10.0.22621.1702]",
    "(c) Microsoft Corporation. All rights reserved.",
    "",
    "C:\\Users\\Student> _"
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("C:\\Users\\Student>");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Scroll terminal to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLines, typedText]);

  const handleCommandClick = (index: number) => {
    if (isTyping) return;
    const cmd = parsedCommands[index];
    setActiveCommandIndex(index);
    setIsTyping(true);
    setTypedText("");

    // Simulate character-by-character typing
    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex < cmd.input.length) {
        setTypedText((prev) => prev + cmd.input[charIndex]);
        charIndex++;
      } else {
        clearInterval(interval);
        
        // Command typed completely, execute after brief pause
        setTimeout(() => {
          // Process special simulation commands (like drive switches or cls)
          let nextPrompt = currentPrompt;
          const outputLines = cmd.output.split("\n");

          if (cmd.input.trim().toLowerCase() === "cls") {
            setTerminalLines([`${currentPrompt} ${cmd.input}`, "Screen cleared successfully."]);
          } else {
            if (cmd.input.trim().toUpperCase() === "D:") {
              nextPrompt = "D:\\>";
            } else if (cmd.input.trim().toUpperCase() === "C:") {
              nextPrompt = "C:\\Users\\Student>";
            } else if (cmd.input.trim().startsWith("cd ")) {
              const target = cmd.input.trim().substring(3);
              if (target === "..") {
                nextPrompt = "C:\\Users>";
              } else {
                nextPrompt = `${currentPrompt.replace(">", "")}\\${target}>`;
              }
            }

            setTerminalLines((prev) => [
              ...prev.filter(l => l !== "C:\\Users\\Student> _" && !l.endsWith("> _")),
              `${currentPrompt} ${cmd.input}`,
              ...outputLines,
              ""
            ]);
            setCurrentPrompt(nextPrompt);
          }
          
          setTypedText("");
          setIsTyping(false);
        }, 600);
      }
    }, 80);
  };

  const resetTerminal = () => {
    setTerminalLines([
      "Microsoft Windows [Version 10.0.22621.1702]",
      "(c) Microsoft Corporation. All rights reserved.",
      "",
      "C:\\Users\\Student> _"
    ]);
    setCurrentPrompt("C:\\Users\\Student>");
    setActiveCommandIndex(null);
    setTypedText("");
    setIsTyping(false);
  };

  return (
    <div className="my-8 border border-slate-800 bg-[#090f1d] rounded-2xl overflow-hidden shadow-2xl select-none font-sans">
      
      {/* Terminal Title Bar */}
      <div className="p-4 bg-slate-950 border-b border-slate-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-2">cmd.exe - Automated Drill</span>
        </div>
        <button
          onClick={resetTerminal}
          className="p-1 text-slate-500 hover:text-white transition-colors cursor-pointer"
          title="Reset Console"
        >
          <RotateCcw size={12} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 bg-[#050912]">
        
        {/* Terminal Screen (3/5 width) */}
        <div className="lg:col-span-3 p-5 font-mono text-xs text-slate-350 min-h-[220px] max-h-[300px] overflow-y-auto bg-slate-950/70 relative">
          <div className="space-y-1">
            {terminalLines.map((line, idx) => (
              <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                {line}
              </div>
            ))}
            {isTyping && (
              <div className="leading-relaxed">
                {currentPrompt} {typedText}
                <span className="w-1.5 h-3.5 bg-[#39FF14] inline-block ml-0.5 animate-pulse" />
              </div>
            )}
            {!isTyping && (
              <div className="leading-relaxed">
                {currentPrompt} _
              </div>
            )}
            <div ref={terminalEndRef} />
          </div>
        </div>

        {/* Command Controls (2/5 width) */}
        <div className="lg:col-span-2 p-5 border-t lg:border-t-0 lg:border-l border-slate-800 bg-[#090f1d] flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-[9px] font-black uppercase tracking-widest text-[#39FF14] bg-emerald-500/10 px-2 py-0.5 rounded">Interactive runner</span>
              <h4 className="text-xs font-black text-white uppercase tracking-tight mt-2">Click to Run Commands:</h4>
              <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                Click any command pill below to watch it execute automatically in the console.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              {parsedCommands.map((cmd, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCommandClick(idx)}
                  disabled={isTyping}
                  className={`p-3 rounded-xl border text-left flex flex-col transition-all cursor-pointer ${
                    activeCommandIndex === idx
                      ? "border-emerald-500 bg-emerald-500/5 text-white"
                      : "border-slate-800 bg-slate-950/80 hover:border-slate-700 text-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-xs font-bold text-white group-hover:text-emerald-400">
                      {cmd.input}
                    </span>
                    <Play size={10} className="text-slate-500" />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 leading-normal font-medium">
                    {cmd.explanation}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
