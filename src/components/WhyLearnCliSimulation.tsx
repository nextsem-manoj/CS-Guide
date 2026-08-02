"use client";

import React, { useState, useEffect } from "react";
import { Copy, Wifi, ShieldAlert, Play, RefreshCw, CheckCircle, ArrowRight, Zap } from "lucide-react";

type CaseStudyId = "copy" | "ip" | "batch";

interface CaseStudy {
  id: CaseStudyId;
  title: string;
  badge: string;
  icon: React.ReactNode;
  guiSteps: string[];
  cliCmd: string;
  cliAction: string;
  comparisonText: string;
}

export default function WhyLearnCliSimulation() {
  const [activeCase, setActiveCase] = useState<CaseStudyId>("copy");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [runType, setRunType] = useState<"gui" | "cli" | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [resultMessage, setResultMessage] = useState<string>("");

  const CASES: Record<CaseStudyId, CaseStudy> = {
    copy: {
      id: "copy",
      title: "Bulk Copying August Photos",
      badge: "File Management",
      icon: <Copy size={16} className="text-blue-400" />,
      guiSteps: [
        "Open C:\\Pictures folder",
        "CTRL-Click August01.JPEG",
        "CTRL-Click August02.JPEG",
        "CTRL-Click August03.JPEG... (repeat 30 times)",
        "Right-click -> Copy",
        "Open Flash Drive (Drive J:)",
        "Right-click -> Paste"
      ],
      cliCmd: "COPY C:\\pictures\\August*.JPEG J:\\",
      cliAction: "Copying 30 files matching 'August*.JPEG' to J:\\...",
      comparisonText: "CLI finishes in 0.1s using wildcards, compared to 15-20 seconds of manual file selecting in GUI."
    },
    ip: {
      id: "ip",
      title: "Finding Your Local IP Address",
      badge: "Network Diagnostics",
      icon: <Wifi size={16} className="text-emerald-400" />,
      guiSteps: [
        "Click Windows Start Button",
        "Click Settings Icon",
        "Click Network & Internet",
        "Click Properties on Ethernet",
        "Scroll down past settings to find IPv4 address"
      ],
      cliCmd: "ipconfig",
      cliAction: "Querying active network adapter interfaces...",
      comparisonText: "GUI takes 5 clicks and 4 windows. CLI takes one command and shows it instantly."
    },
    batch: {
      id: "batch",
      title: "Daily Server Backup Task",
      badge: "Automation Scripts",
      icon: <ShieldAlert size={16} className="text-amber-400" />,
      guiSteps: [
        "Create empty backups folder on Desktop",
        "Open current project workspace",
        "Select and copy all HTML and CSS files",
        "Paste files into backups folder",
        "Rename backups folder with current date"
      ],
      cliCmd: "backup.bat",
      cliAction: "Executing backup.bat automation script...",
      comparisonText: "GUI requires manual copying and renaming every single day. CLI runs a 3-line batch script in a single click."
    }
  };

  const currentCase = CASES[activeCase];

  useEffect(() => {
    // Reset state on tab change
    setIsRunning(false);
    setRunType(null);
    setProgress(0);
    setCompletedSteps([]);
    setResultMessage("");
  }, [activeCase]);

  const runSimulation = (type: "gui" | "cli") => {
    if (isRunning) return;
    setIsRunning(true);
    setRunType(type);
    setProgress(0);
    setCompletedSteps([]);
    setResultMessage("");

    const steps = type === "gui" ? currentCase.guiSteps : [currentCase.cliCmd];
    const duration = type === "gui" ? 3500 : 800;
    const intervalTime = duration / steps.length;

    let index = 0;
    const timer = setInterval(() => {
      if (index < steps.length) {
        setCompletedSteps(prev => [...prev, steps[index]]);
        setProgress(Math.round(((index + 1) / steps.length) * 100));
        index++;
      } else {
        clearInterval(timer);
        setIsRunning(false);
        setResultMessage(
          type === "gui" 
            ? "⚠️ Completed the GUI way in 15.0 seconds. High risk of missing files!" 
            : `⚡ Completed the CLI way in 0.1 seconds! Command: ${currentCase.cliCmd}`
        );
      }
    }, intervalTime);
  };

  return (
    <div className="my-8 rounded-2xl border border-sky-500/10 dark:border-slate-800 bg-[#090f1e]/40 shadow-xl overflow-hidden select-none">
      
      {/* Title */}
      <div className="p-6 md:p-8 border-b border-slate-800 bg-[#090f1e]/75">
        <span className="text-[10px] font-black uppercase tracking-widest text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full select-none mb-3 inline-block">
          Efficiency Showcase
        </span>
        <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight mb-2">
          Why Learn the Command Line?
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
          Observe how the Command Line performs repetitive or deep network tasks compared to navigating multiple graphical user menus.
        </p>
      </div>

      {/* Case Study Tabs */}
      <div className="grid grid-cols-3 bg-slate-950 p-1 border-b border-slate-900 gap-1">
        {(Object.keys(CASES) as CaseStudyId[]).map((key) => (
          <button
            key={key}
            onClick={() => setActiveCase(key)}
            disabled={isRunning}
            className={`py-2 px-3 rounded-lg text-[10px] md:text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeCase === key
                ? "bg-sky-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/30"
            }`}
          >
            {CASES[key].icon}
            <span className="hidden sm:inline">{CASES[key].title}</span>
            <span className="sm:hidden">{CASES[key].badge}</span>
          </button>
        ))}
      </div>

      {/* Simulation Playground */}
      <div className="p-6 bg-[#070b13] grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Panel: Comparison execution runs */}
        <div className="space-y-4">
          <h4 className="text-xs font-black text-white uppercase tracking-wider">
            Execution Mode Selector:
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            {/* GUI Run Button */}
            <button
              onClick={() => runSimulation("gui")}
              disabled={isRunning}
              className="p-4 rounded-xl border border-slate-800 hover:border-slate-600 bg-slate-950/60 hover:bg-slate-950 text-center flex flex-col items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              <span className="text-xl">🖱️</span>
              <span className="text-xs font-black text-slate-300">Run GUI Method</span>
              <span className="text-[9px] text-slate-500 uppercase font-bold">Manual Clicks</span>
            </button>

            {/* CLI Run Button */}
            <button
              onClick={() => runSimulation("cli")}
              disabled={isRunning}
              className="p-4 rounded-xl border border-sky-500/20 hover:border-sky-500/40 bg-sky-950/10 hover:bg-sky-950/20 text-center flex flex-col items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              <Zap size={20} className="text-sky-400 animate-pulse" />
              <span className="text-xs font-black text-sky-300">Run CLI Method</span>
              <span className="text-[9px] text-sky-500 uppercase font-bold">1-Line Command</span>
            </button>
          </div>

          {/* Progress Bar */}
          {runType && (
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[9px] font-mono text-slate-500">
                <span>Task Progress ({runType.toUpperCase()} Mode)</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                <div 
                  className={`h-full transition-all duration-300 ${runType === "cli" ? "bg-sky-400" : "bg-amber-500"}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Status Message */}
          {resultMessage && (
            <div className={`p-3.5 rounded-xl border text-[10px] leading-relaxed ${
              runType === "cli" 
                ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-400 font-bold" 
                : "border-amber-500/30 bg-amber-500/5 text-amber-400"
            }`}>
              {resultMessage}
            </div>
          )}
        </div>

        {/* Right Panel: Simulated Operation Logger */}
        <div className="border border-slate-900 bg-slate-950 rounded-2xl p-4 flex flex-col justify-between min-h-[220px]">
          <div>
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-3 border-b border-slate-900 pb-2">
              Action Execution Console
            </span>
            <div className="space-y-2 font-mono text-[10px] text-slate-400 max-h-[140px] overflow-y-auto">
              {completedSteps.length === 0 ? (
                <span className="text-slate-650 italic">Select execution mode to log steps...</span>
              ) : (
                completedSteps.map((stepText, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className="text-sky-500 select-none">&rarr;</span>
                    <span className={runType === "cli" ? "text-sky-400 font-bold" : ""}>{stepText}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-900 text-[10px] text-slate-500 leading-normal flex items-start gap-1.5">
            <span className="text-sky-400 font-bold">💡 Note:</span>
            <span>{currentCase.comparisonText}</span>
          </div>
        </div>

      </div>

    </div>
  );
}
