"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ShieldCheck, Power } from 'lucide-react';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'system';
}

const FILES: Record<string, string> = {
  "index.txt": "Welcome to BCA-DOS v1.0 workstation. Practicing command lines builds developer logic!",
  "readme.txt": "Syllabus Unit 1: Computer Their Origin and Applications.\nCourse: BCS-011 Computer Basics.",
  "todo.txt": "1. Complete CPU simulators.\n2. Practice assembly language in BCSL-022.\n3. Master logical breadboards."
};

export default function BcaVirtualConsole() {
  const [booting, setBooting] = useState<boolean>(true);
  const [bootStep, setBootStep] = useState<number>(0);
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [inputVal, setInputVal] = useState<string>("");
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Power On Self Test (POST) Boot sequence
  const bootLines = [
    "BIOS Version 1.04.12 — Nextsem Systems Inc.",
    "CPU: Nextsem-8086 Core Clock 4.77 MHz",
    "Checking System RAM: 640 KB Base Memory — OK",
    "Initializing Disk Controller A: ... OK",
    "Loading BCA-DOS Version 1.0 ...",
    "BCA-DOS loaded successfully.",
    "Type 'HELP' to view list of available console commands.",
    ""
  ];

  useEffect(() => {
    if (booting) {
      if (bootStep < bootLines.length) {
        const timer = setTimeout(() => {
          setHistory(prev => [...prev, { text: bootLines[bootStep], type: 'system' }]);
          setBootStep(prev => prev + 1);
        }, 350);
        return () => clearTimeout(timer);
      } else {
        setBooting(false);
      }
    }
  }, [booting, bootStep]);

  // Scroll to terminal bottom on history updates
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    setInputVal("");
    setHistory(prev => [...prev, { text: `C:\\>${cmd}`, type: 'input' }]);

    const args = cmd.split(" ");
    const commandName = args[0].toLowerCase();
    const outputLines: TerminalLine[] = [];

    switch (commandName) {
      case "help":
        outputLines.push({ text: "BCA-DOS v1.0 console supports these internal commands:", type: 'system' });
        outputLines.push({ text: "  HELP     - Display this command dictionary help list.", type: 'system' });
        outputLines.push({ text: "  DIR      - List files in current directory.", type: 'system' });
        outputLines.push({ text: "  TYPE     - Display contents of a text file (e.g. TYPE index.txt).", type: 'system' });
        outputLines.push({ text: "  SYSINFO  - Display system hardware specifications.", type: 'system' });
        outputLines.push({ text: "  CLS      - Clear the console screen logs.", type: 'system' });
        outputLines.push({ text: "  VER      - Show Operating System version.", type: 'system' });
        break;
      case "dir":
        outputLines.push({ text: " Volume in drive C has no label.", type: 'system' });
        outputLines.push({ text: " Directory of C:\\", type: 'system' });
        outputLines.push({ text: "", type: 'system' });
        Object.keys(FILES).forEach(filename => {
          outputLines.push({ text: `07/13/2026  12:00 PM                42 ${filename}`, type: 'system' });
        });
        outputLines.push({ text: `               ${Object.keys(FILES).length} File(s)            126 bytes`, type: 'system' });
        outputLines.push({ text: `               1 Dir(s)        655,360 bytes free`, type: 'system' });
        break;
      case "type":
        const targetFile = args[1];
        if (!targetFile) {
          outputLines.push({ text: "Syntax Error: Filename not specified. Usage: TYPE [filename]", type: 'error' });
        } else if (FILES[targetFile.toLowerCase()]) {
          outputLines.push({ text: FILES[targetFile.toLowerCase()], type: 'output' });
        } else {
          outputLines.push({ text: `File Not Found — '${targetFile}'`, type: 'error' });
        }
        break;
      case "sysinfo":
        outputLines.push({ text: "SYSTEM SPECIFICATIONS:", type: 'system' });
        outputLines.push({ text: "--------------------------------------------", type: 'system' });
        outputLines.push({ text: "OS Name:          BCA-DOS v1.0", type: 'system' });
        outputLines.push({ text: "CPU Architecture: Nextsem-8086", type: 'system' });
        outputLines.push({ text: "System Clock:     4.77 MHz", type: 'system' });
        outputLines.push({ text: "Base RAM:         640 KB", type: 'system' });
        outputLines.push({ text: "Storage Adapt:    Floppy Drive A: (360KB)", type: 'system' });
        break;
      case "ver":
        outputLines.push({ text: "BCA-DOS Version 1.0 (Built 2026.07)", type: 'system' });
        break;
      case "cls":
        setHistory([]);
        return;
      default:
        outputLines.push({ text: `Bad command or file name — '${args[0]}'`, type: 'error' });
        outputLines.push({ text: "Type 'HELP' to see list of available console commands.", type: 'system' });
    }

    setHistory(prev => [...prev, ...outputLines, { text: "", type: 'system' }]);
  };

  const handleRestart = () => {
    setBooting(true);
    setBootStep(0);
    setHistory([]);
    setInputVal("");
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4 bg-slate-900/30 border border-slate-850 p-4 rounded-2xl">
        <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-400">
          <Terminal size={14} className="text-emerald-400" />
          <span>BCA-DOS Workstation Prompt</span>
        </div>
        <button
          onClick={handleRestart}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:border-slate-750 text-[10px] font-black uppercase tracking-wider text-slate-350 rounded-xl transition-all cursor-pointer shadow-sm"
        >
          <Power size={11} className="text-red-500 fill-red-500" />
          Reboot console
        </button>
      </div>

      {/* Terminal Viewport */}
      <div 
        onClick={focusInput}
        className="w-full h-80 bg-black border border-emerald-950/30 rounded-3xl p-5 font-mono text-xs text-emerald-400 text-left overflow-y-auto cursor-text flex flex-col justify-start relative shadow-inner custom-scrollbar"
      >
        <div className="flex-1 flex flex-col gap-1 select-all">
          {history.map((line, index) => {
            let color = "text-emerald-400";
            if (line.type === 'input') color = "text-white font-bold select-text";
            if (line.type === 'error') color = "text-red-400 font-bold";
            if (line.type === 'output') color = "text-teal-300 font-medium select-text";
            if (line.type === 'system') color = "text-emerald-400/90";

            return (
              <div key={index} className={`${color} whitespace-pre-wrap break-all`}>
                {line.text}
              </div>
            );
          })}

          {booting && (
            <div className="flex items-center gap-1.5 mt-2">
              <span className="w-2.5 h-2.5 rounded-full border border-emerald-500/20 border-t-emerald-400 animate-spin" />
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider select-none">POST Booting Adapt...</span>
            </div>
          )}

          {/* Active Command Prompt line */}
          {!booting && (
            <form onSubmit={handleCommandSubmit} className="flex items-center w-full mt-1 shrink-0">
              <span className="font-bold select-none shrink-0">C:\&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                autoFocus
                autoComplete="off"
                spellCheck={false}
                className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white pl-1 select-text caret-emerald-400"
              />
            </form>
          )}

          <div ref={terminalEndRef} />
        </div>
        
        {!booting && (
          <div className="absolute right-4 bottom-4 flex items-center gap-1 text-emerald-500/30 text-[8px] font-black uppercase tracking-wider select-none">
            <ShieldCheck size={10} />
            Console Prompt Online
          </div>
        )}
      </div>
    </div>
  );
}
