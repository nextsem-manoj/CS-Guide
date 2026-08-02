"use client";

import React, { useState } from "react";
import { Monitor, ShieldAlert, Cpu, CheckCircle2, Copy, History, HelpCircle } from "lucide-react";

type BootMode = "normal" | "safe" | "recovery";
type FeatureTab = "case" | "history" | "paste";

export default function CommandLineBasicsSimulation() {
  // Boot simulator state
  const [bootMode, setBootMode] = useState<BootMode>("normal");
  
  // CMD features state
  const [activeTab, setActiveTab] = useState<FeatureTab>("case");
  const [caseModeInput, setCaseModeInput] = useState("dir");
  const [caseMatchLogs, setCaseMatchLogs] = useState<string[]>([
    "Type a command in the input box to test case sensitivity...",
  ]);
  
  // History simulator state
  const mockHistory = ["ver", "mkdir Nextsem", "cd Nextsem", "prompt developer$"];
  const [historyIndex, setHistoryIndex] = useState(mockHistory.length);
  const [historyInput, setHistoryInput] = useState("");

  // Paste simulator state
  const [clipboardText, setClipboardText] = useState("mkdir Week-1");
  const [pasteTarget, setPasteTarget] = useState("");
  const [pasteSuccess, setPasteSuccess] = useState(false);

  const handleBootSelect = (mode: BootMode) => {
    setBootMode(mode);
  };

  const handleCaseTest = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = caseModeInput.trim();
    if (!clean) return;
    
    const lower = clean.toLowerCase();
    let result = "";
    if (lower === "dir" || lower === "ver" || lower === "cls") {
      result = `✅ SUCCESS: Command "${clean}" recognized! (CMD ignores casing: ${clean.toUpperCase()} is identical to ${clean.toLowerCase()})`;
    } else {
      result = `❌ UNRECOGNIZED: "${clean}" is not a system command. (Try 'dir' or 'ver' in different cases)`;
    }
    
    setCaseMatchLogs(prev => [...prev, `C:\\Users\\Student> ${clean}`, result]);
  };

  const handleHistoryNav = (direction: "up" | "down") => {
    if (direction === "up") {
      const nextIndex = historyIndex > 0 ? historyIndex - 1 : 0;
      setHistoryIndex(nextIndex);
      setHistoryInput(mockHistory[nextIndex]);
    } else {
      const nextIndex = historyIndex < mockHistory.length - 1 ? historyIndex + 1 : mockHistory.length;
      setHistoryIndex(nextIndex);
      if (nextIndex === mockHistory.length) {
        setHistoryInput("");
      } else {
        setHistoryInput(mockHistory[nextIndex]);
      }
    }
  };

  const handlePasteSimulate = () => {
    setPasteTarget(clipboardText);
    setPasteSuccess(true);
    setTimeout(() => setPasteSuccess(false), 2000);
  };

  return (
    <div className="my-8 rounded-2xl border-2 border-slate-800 bg-[#090e1c] shadow-2xl overflow-hidden select-none font-sans">
      
      {/* ── SECTION HEADER ── */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded bg-[#39ff14]/10 text-[#39ff14]">🎮</span>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Concept Simulation</h4>
            <h3 className="text-sm font-black text-white mt-0.5">🪟 Windows 11 GUI Boot & CMD Basics Simulator</h3>
          </div>
        </div>
      </div>

      {/* ── SIMULATION TAB PANEL ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        
        {/* LEFT PANEL: BOOT INTERFACE SIMULATOR */}
        <div className="p-5 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between">
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#00B0FF] mb-2 flex items-center gap-1">
              <Monitor size={12} /> Part 1: Boot Mode & GUI launch
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-400 mb-4">
              By default, 🪟 Windows boots into a graphical user interface (GUI). However, if your system fails or you select Safe Mode, you boot into a text-heavy command environment.
            </p>

            {/* Boot Mode Selection Buttons */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {(["normal", "safe", "recovery"] as BootMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleBootSelect(mode)}
                  className={`py-2 px-2.5 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer border ${
                    bootMode === mode
                      ? "bg-blue-600 border-blue-400 text-white shadow-lg"
                      : "bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {mode === "normal" && "Normal (GUI)"}
                  {mode === "safe" && "Safe Mode"}
                  {mode === "recovery" && "Recovery CLI"}
                </button>
              ))}
            </div>
          </div>

          {/* Virtual Screen Viewport */}
          <div className="relative w-full aspect-[16/10] bg-black border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-end">
            
            {/* NORMAL GUI BOOT SCREEN */}
            {bootMode === "normal" && (
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-900/40 via-indigo-950/40 to-slate-900 flex flex-col justify-end p-4 animate-in fade-in duration-300">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-slate-500 text-[10px]">
                  🖥️ 🪟 Windows 11 Normal Desktop GUI Active
                </div>
                {/* Simulated Taskbar */}
                <div className="h-8 bg-slate-950/80 rounded-xl border border-slate-800/80 flex items-center justify-between px-3">
                  <div className="flex gap-1.5">
                    <span className="w-4 h-4 rounded bg-blue-600 flex items-center justify-center text-[9px] text-white">⊞</span>
                    <span className="w-4 h-4 rounded bg-slate-900 border border-slate-800 text-[8px] flex items-center justify-center text-slate-400">&gt;_</span>
                  </div>
                  <span className="text-[8px] text-slate-450">03:14 AM</span>
                </div>
              </div>
            )}

            {/* SAFE MODE SCREEN */}
            {bootMode === "safe" && (
              <div className="absolute inset-0 bg-slate-950/90 flex flex-col justify-between p-3.5 border border-slate-800 animate-in fade-in duration-300 font-mono text-[9px] text-slate-400">
                <div className="flex justify-between text-slate-600">
                  <span>Safe Mode</span>
                  <span>Safe Mode</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center p-3">
                  <ShieldAlert size={20} className="text-amber-500 mb-2 animate-bounce" />
                  <p className="font-sans font-black text-slate-200">Safe Mode Enabled</p>
                  <p className="font-sans text-slate-450 mt-1 max-w-[200px]">Only standard drivers loaded. Used for system debugging.</p>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Safe Mode</span>
                  <span>Safe Mode</span>
                </div>
              </div>
            )}

            {/* RECOVERY CLI ONLY */}
            {bootMode === "recovery" && (
              <div className="absolute inset-0 bg-black flex flex-col p-4 animate-in fade-in duration-300 font-mono text-[9px] text-[#39ff14] overflow-y-auto">
                <p className="text-slate-500">🪟 Windows Boot Error Recovery Manager</p>
                <p className="text-slate-500">Checking system partition cluster configurations...</p>
                <p className="mt-2 text-emerald-400">C:\&gt; _</p>
                <div className="mt-3 p-2 bg-emerald-950/20 border border-emerald-500/20 rounded-lg text-slate-350 font-sans max-w-[240px]">
                  <p className="font-black text-xs">⚠️ System Diagnostic Mode</p>
                  <p className="text-[9px] mt-0.5 text-slate-400">If 🪟 Windows boots directly into a command prompt without showing a desktop GUI, the system has encountered an error.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: CMD CHARACTERISTICS DRILLS */}
        <div className="p-5 flex flex-col justify-between">
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#39ff14] mb-2.5 flex items-center gap-1">
              <Cpu size={12} /> Part 2: CMD.EXE Core Behaviors
            </h4>

            {/* Features Sub-tab Selection */}
            <div className="flex border-b border-slate-900 mb-4 gap-4">
              {(["case", "history", "paste"] as FeatureTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-[10px] font-black uppercase tracking-wider relative transition-all cursor-pointer ${
                    activeTab === tab
                      ? "text-white border-b-2 border-[#39ff14]"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tab === "case" && "Case Sensitivity"}
                  {tab === "history" && "Command History"}
                  {tab === "paste" && "Copy & Paste"}
                </button>
              ))}
            </div>

            {/* TAB CONTENT: CASE SENSITIVITY */}
            {activeTab === "case" && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <p className="text-[11px] leading-relaxed text-slate-400">
                  Unlike Linux, the ⊞ Windows Command Prompt is **case-insensitive**. Writing `dir`, `DIR`, or `DiR` triggers the exact same file scan.
                </p>
                <form onSubmit={handleCaseTest} className="flex gap-2">
                  <input
                    type="text"
                    value={caseModeInput}
                    onChange={(e) => setCaseModeInput(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-white flex-1 focus:outline-none focus:border-[#39ff14]/30"
                    placeholder="dir or ver..."
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-black text-[9px] uppercase px-3.5 py-1.5 rounded-lg transition-all cursor-pointer">
                    Submit
                  </button>
                </form>
                {/* Console list output */}
                <div className="bg-slate-950 border border-slate-900 rounded-xl p-3 h-24 overflow-y-auto font-mono text-[9px] text-slate-350 space-y-1 scrollbar-thin">
                  {caseMatchLogs.map((log, idx) => (
                    <div key={idx} className={log.startsWith("✅") ? "text-emerald-400 font-bold" : log.startsWith("❌") ? "text-rose-500" : "text-slate-500"}>
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: COMMAND HISTORY */}
            {activeTab === "history" && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <p className="text-[11px] leading-relaxed text-slate-400">
                  Press the ⌨️ **Up & Down Arrow** keys to cycle back and forth through previously entered commands inside your active memory buffer.
                </p>
                
                <div className="flex gap-3 justify-center">
                  <button 
                    onClick={() => handleHistoryNav("up")}
                    className="bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl p-2 flex items-center justify-center gap-1.5 text-[9px] font-black uppercase text-white cursor-pointer select-none"
                  >
                    <History size={12} className="rotate-180" /> Up (Older)
                  </button>
                  <button 
                    onClick={() => handleHistoryNav("down")}
                    className="bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl p-2 flex items-center justify-center gap-1.5 text-[9px] font-black uppercase text-white cursor-pointer select-none"
                  >
                    <History size={12} /> Down (Newer)
                  </button>
                </div>

                {/* Console box mockup */}
                <div className="bg-slate-950 border border-slate-900 rounded-xl p-3 font-mono text-[10px] space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">C:\Users\Student&gt;</span>
                    <span className="text-white font-bold min-h-[14px]">
                      {historyInput}
                      <span className="w-1 h-3.5 bg-[#39ff14] inline-block ml-0.5 animate-pulse" />
                    </span>
                  </div>
                  <div className="text-[8px] font-black text-slate-500 uppercase tracking-wider border-t border-slate-900 pt-2 flex justify-between">
                    <span>Active Buffer Stack:</span>
                    <span>{historyIndex === mockHistory.length ? "Empty input" : `Command ${historyIndex + 1} of ${mockHistory.length}`}</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: COPY & PASTE */}
            {activeTab === "paste" && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <p className="text-[11px] leading-relaxed text-slate-400">
                  In the ⊞ Windows Command Prompt, copy-paste behaves differently. You can right-click to paste text, or press `Ctrl` + `Shift` + `C`/`V` to run clipboard commands.
                </p>
                <div className="flex gap-3 items-center">
                  <div className="bg-slate-950 border border-slate-900 rounded-xl p-2 flex-1 text-center font-mono text-[10px] text-slate-400 border-dashed">
                    📋 Clipboard text: <strong className="text-white">{clipboardText}</strong>
                  </div>
                  <button 
                    onClick={handlePasteSimulate}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-black text-[9px] uppercase px-3 py-2 rounded-lg flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <Copy size={11} /> Paste
                  </button>
                </div>

                <div className="bg-slate-950 border border-slate-900 rounded-xl p-3 font-mono text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">C:\Users\Student&gt;</span>
                    <span className="text-white">{pasteTarget || "_"}</span>
                  </div>
                  {pasteSuccess && (
                    <div className="text-emerald-400 text-[8px] font-black uppercase mt-2 animate-pulse flex items-center gap-1">
                      <CheckCircle2 size={10} /> Pasted from system clipboard!
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

          <div className="mt-4 p-3 bg-slate-950/60 border border-slate-900 rounded-xl text-[9px] text-slate-550 leading-relaxed">
            💡 <strong>Drill Target:</strong> Switch through all boot modes on the left, and try the three core shell characteristics on the right to master basic CLI execution habits.
          </div>
        </div>

      </div>

    </div>
  );
}
