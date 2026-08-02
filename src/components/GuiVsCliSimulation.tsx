"use client";

import React, { useState } from "react";
import { MousePointer, Terminal, CheckCircle2, Play, AlertCircle, Sparkles } from "lucide-react";

export default function GuiVsCliSimulation() {
  const [activeTab, setActiveTab] = useState<"gui" | "cli">("gui");
  const [guiStep, setGuiStep] = useState<number>(0);
  const [cliInput, setCliInput] = useState<string>("");
  const [cliSuccess, setCliSuccess] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  const handleGuiClick = (stepIndex: number) => {
    if (stepIndex === guiStep + 1) {
      setGuiStep(stepIndex);
      if (stepIndex === 5) {
        setLogs(prev => [...prev, "🎉 GUI Task Complete: Desktop/Nextsem/Week-1 created!"]);
      }
    }
  };

  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cliInput.trim().toLowerCase() === "mkdir nextsem\\week-1") {
      setCliSuccess(true);
      setLogs(prev => [
        ...prev,
        "C:\\Users\\Student\\Desktop> mkdir Nextsem\\Week-1",
        "🎉 CLI Task Complete: Created folder tree Nextsem\\Week-1 instantly (1 Step, 0.1s)!"
      ]);
    } else {
      setLogs(prev => [
        ...prev,
        `C:\\Users\\Student\\Desktop> ${cliInput}`,
        "❌ Syntax Error. Did you type 'mkdir Nextsem\\Week-1' exactly?"
      ]);
      setCliInput("");
    }
  };

  const resetSim = () => {
    setGuiStep(0);
    setCliInput("");
    setCliSuccess(false);
    setLogs([]);
  };

  return (
    <div className="my-8 rounded-2xl border border-emerald-500/10 dark:border-slate-800 bg-[#090f1e]/40 shadow-xl overflow-hidden select-none">
      
      {/* Header bar */}
      <div className="p-6 md:p-8 border-b border-slate-800 bg-[#090f1e]/75">
        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full select-none mb-3 inline-block">
          Interactive Comparison
        </span>
        <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight mb-2">
          GUI vs. CLI Speed Comparison
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
          Compare the effort required to create a nested directory layout (<code>Nextsem\Week-1</code>) on your Desktop using a mouse pointer (GUI) versus the command line interface (CLI).
        </p>
      </div>

      {/* Selector tabs */}
      <div className="flex bg-slate-950 p-1 border-b border-slate-900">
        <button
          onClick={() => { setActiveTab("gui"); resetSim(); }}
          className={`flex-1 py-3 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "gui" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <MousePointer size={13} />
          <span>Graphical UI (GUI) Mode</span>
        </button>
        <button
          onClick={() => { setActiveTab("cli"); resetSim(); }}
          className={`flex-1 py-3 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "cli" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Terminal size={13} />
          <span>Command Line (CLI) Mode</span>
        </button>
      </div>

      <div className="p-5 md:p-6 bg-[#070b13]">
        {activeTab === "gui" ? (
          /* GUI SIMULATION CONTENT */
          <div className="space-y-6">
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">
              GUI Action Checklist (12 clicks/actions required):
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {/* Step 1 */}
              <button
                onClick={() => handleGuiClick(1)}
                className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer min-h-[90px] ${
                  guiStep >= 1 ? "border-emerald-500 bg-emerald-500/5 text-slate-200" : "border-slate-800 bg-slate-950 hover:border-blue-500 text-slate-400"
                }`}
              >
                <span className="text-[9px] font-bold text-slate-500">Action 1</span>
                <span className="text-xs font-black leading-tight">Right Click Desktop</span>
                {guiStep >= 1 && <span className="text-[8px] text-emerald-400 font-bold mt-2">✓ Clicked</span>}
              </button>

              {/* Step 2 */}
              <button
                onClick={() => handleGuiClick(2)}
                disabled={guiStep < 1}
                className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer min-h-[90px] ${
                  guiStep >= 2 ? "border-emerald-500 bg-emerald-500/5 text-slate-200" : guiStep === 1 ? "border-amber-500 bg-amber-500/5 text-slate-300" : "border-slate-900 bg-slate-950/20 text-slate-600 cursor-not-allowed"
                }`}
              >
                <span className="text-[9px] font-bold text-slate-500">Action 2</span>
                <span className="text-xs font-black leading-tight">Hover &ldquo;New&rdquo; &rarr; &ldquo;Folder&rdquo;</span>
                {guiStep >= 2 && <span className="text-[8px] text-emerald-400 font-bold mt-2">✓ Selected</span>}
              </button>

              {/* Step 3 */}
              <button
                onClick={() => handleGuiClick(3)}
                disabled={guiStep < 2}
                className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer min-h-[90px] ${
                  guiStep >= 3 ? "border-emerald-500 bg-emerald-500/5 text-slate-200" : guiStep === 2 ? "border-amber-500 bg-amber-500/5 text-slate-300" : "border-slate-900 bg-slate-950/20 text-slate-600 cursor-not-allowed"
                }`}
              >
                <span className="text-[9px] font-bold text-slate-500">Action 3</span>
                <span className="text-xs font-black leading-tight">Type Name &ldquo;Nextsem&rdquo; &amp; Save</span>
                {guiStep >= 3 && <span className="text-[8px] text-emerald-400 font-bold mt-2">✓ Saved</span>}
              </button>

              {/* Step 4 */}
              <button
                onClick={() => handleGuiClick(4)}
                disabled={guiStep < 3}
                className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer min-h-[90px] ${
                  guiStep >= 4 ? "border-emerald-500 bg-emerald-500/5 text-slate-200" : guiStep === 3 ? "border-amber-500 bg-amber-500/5 text-slate-300" : "border-slate-900 bg-slate-950/20 text-slate-600 cursor-not-allowed"
                }`}
              >
                <span className="text-[9px] font-bold text-slate-500">Action 4</span>
                <span className="text-xs font-black leading-tight">Double-Click to open Folder</span>
                {guiStep >= 4 && <span className="text-[8px] text-emerald-400 font-bold mt-2">✓ Opened</span>}
              </button>

              {/* Step 5 */}
              <button
                onClick={() => handleGuiClick(5)}
                disabled={guiStep < 4}
                className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer min-h-[90px] ${
                  guiStep >= 5 ? "border-emerald-500 bg-emerald-500/5 text-slate-200" : guiStep === 4 ? "border-amber-500 bg-amber-500/5 text-slate-300" : "border-slate-900 bg-slate-950/20 text-slate-600 cursor-not-allowed"
                }`}
              >
                <span className="text-[9px] font-bold text-slate-500">Action 5</span>
                <span className="text-xs font-black leading-tight">Create &amp; Name &ldquo;Week-1&rdquo; Folder</span>
                {guiStep >= 5 && <span className="text-[8px] text-emerald-400 font-bold mt-2">✓ Complete</span>}
              </button>
            </div>

            {/* Visual Desktop Representation */}
            <div className="border border-slate-900 bg-slate-950 rounded-xl p-4 min-h-[100px] flex items-center justify-center gap-4 relative">
              {guiStep === 0 && <span className="text-slate-600 text-xs italic">Empty Desktop. Click Action 1 to start...</span>}
              {guiStep >= 3 && (
                <div className="flex flex-col items-center gap-1.5 p-2 bg-slate-900/60 rounded-xl border border-slate-800 w-24">
                  <span className="text-2xl">📂</span>
                  <span className="text-[10px] text-white font-black">Nextsem/</span>
                </div>
              )}
              {guiStep >= 5 && (
                <div className="flex flex-col items-center gap-1.5 p-2 bg-slate-900/60 rounded-xl border border-emerald-500/30 w-24 animate-pulse">
                  <span className="text-2xl">📂</span>
                  <span className="text-[10px] text-emerald-400 font-black">Week-1/</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* CLI SIMULATION CONTENT */
          <div className="space-y-6">
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">
              CLI Command Input (1 Step - Run mkdir command):
            </div>

            <form onSubmit={handleCliSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 font-mono text-sm text-slate-200 p-3 bg-slate-950 rounded-xl border border-slate-900 flex items-center gap-2">
                <span className="text-slate-500 shrink-0">C:\Users\Student\Desktop&gt;</span>
                <input 
                  type="text"
                  value={cliInput}
                  onChange={(e) => setCliInput(e.target.value)}
                  disabled={cliSuccess}
                  placeholder="mkdir Nextsem\Week-1"
                  className="bg-transparent focus:outline-none text-white w-full font-mono placeholder:text-slate-700"
                />
              </div>
              <button
                type="submit"
                disabled={cliSuccess || !cliInput}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-800 text-white font-black text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-all cursor-pointer shrink-0 active:scale-95"
              >
                Execute &raquo;
              </button>
            </form>

            <div className="p-3 bg-slate-900/40 border border-slate-850 rounded-xl text-[10px] text-slate-450 leading-relaxed flex items-start gap-2 select-none">
              <AlertCircle size={14} className="text-blue-400 mt-0.5 shrink-0" />
              <span>
                💡 <strong>Command Tip:</strong> Type <code>mkdir Nextsem\Week-1</code> (making sure to use a backslash `\` to create the nested subfolder) and click Execute!
              </span>
            </div>

            {/* Visual representation */}
            <div className="border border-slate-900 bg-slate-950 rounded-xl p-4 min-h-[100px] flex items-center justify-center gap-4">
              {!cliSuccess ? (
                <span className="text-slate-600 text-xs italic">Awaiting terminal execution...</span>
              ) : (
                <div className="flex items-center gap-3 animate-pulse">
                  <div className="flex flex-col items-center gap-1 p-2 bg-slate-900/60 rounded-xl border border-slate-800 w-24">
                    <span className="text-2xl">📂</span>
                    <span className="text-[10px] text-white font-black">Nextsem/</span>
                  </div>
                  <span className="text-slate-500 font-bold text-lg">&rarr;</span>
                  <div className="flex flex-col items-center gap-1 p-2 bg-slate-900/60 rounded-xl border border-emerald-500/30 w-24">
                    <span className="text-2xl">📂</span>
                    <span className="text-[10px] text-emerald-400 font-black">Week-1/</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Console Outputs & Metrics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Logs */}
          <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 font-mono text-[10px] leading-relaxed text-slate-450 h-28 overflow-y-auto select-text scrollbar-thin">
            {logs.length === 0 ? (
              <span className="text-slate-650 italic">Console logs empty...</span>
            ) : (
              logs.map((log, idx) => (
                <div key={idx} className={log.startsWith("🎉") ? "text-emerald-400 font-bold" : log.startsWith("❌") ? "text-rose-500" : ""}>
                  {log}
                </div>
              ))
            )}
          </div>

          {/* Efficiency Metrics Card */}
          <div className="bg-slate-900/20 border border-slate-850 rounded-xl p-4 flex flex-col justify-between">
            <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider block mb-2">
              Efficiency Comparison Metrics
            </span>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-2 bg-slate-950 rounded-lg border border-slate-900/60">
                <span className="text-[9px] text-slate-500 uppercase font-black block">GUI Mode</span>
                <span className="text-xs font-black text-rose-400 block mt-1">12 Steps</span>
                <span className="text-[9px] text-slate-600 block mt-0.5">~15.0 seconds</span>
              </div>
              <div className="p-2 bg-slate-950 rounded-lg border border-slate-900/60">
                <span className="text-[9px] text-slate-500 uppercase font-black block">CLI Mode</span>
                <span className="text-xs font-black text-emerald-400 block mt-1">1 Step</span>
                <span className="text-[9px] text-slate-600 block mt-0.5">~0.1 seconds</span>
              </div>
            </div>
            {logs.length > 0 && (
              <div className="mt-3 flex items-center justify-center gap-1 text-[9px] text-emerald-400 bg-emerald-500/10 py-1.5 px-3 rounded-lg font-black border border-emerald-500/10">
                <Sparkles size={11} />
                <span>CLI Mode is 150x Faster &amp; Automatable!</span>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
