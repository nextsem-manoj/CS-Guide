"use client";

import React, { useState, useEffect } from "react";
import { Folder, File, ChevronRight, Play, CheckCircle, RotateCcw } from "lucide-react";

interface TreeItem {
  name: string;
  type: "folder" | "file";
  path: string;
  isReadOnly?: boolean;
  isHidden?: boolean;
}

interface Step {
  command: string;
  output: string;
  explanation: string;
  highlightPath?: string; // Path of the folder/file affected
  treeState: TreeItem[];
}

interface FolderTreeVisualizerProps {
  title: string;
  initialTree: TreeItem[];
  steps: Step[];
}

export default function FolderTreeVisualizer({ title, initialTree = [], steps = [] }: FolderTreeVisualizerProps) {
  let parsedInitialTree: TreeItem[] = [];
  if (Array.isArray(initialTree)) {
    parsedInitialTree = initialTree;
  } else if (typeof initialTree === "string") {
    try {
      parsedInitialTree = JSON.parse(initialTree);
    } catch (e) {
      console.error("Failed to parse initialTree in FolderTreeVisualizer:", e);
    }
  }

  let parsedSteps: Step[] = [];
  if (Array.isArray(steps)) {
    parsedSteps = steps;
  } else if (typeof steps === "string") {
    try {
      parsedSteps = JSON.parse(steps);
    } catch (e) {
      console.error("Failed to parse steps in FolderTreeVisualizer:", e);
    }
  }

  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [currentTree, setCurrentTree] = useState<TreeItem[]>(parsedInitialTree);
  const [typingCommand, setTypingCommand] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [cmdOutput, setCmdOutput] = useState<string>("");

  useEffect(() => {
    setCurrentTree(parsedInitialTree);
  }, [initialTree]);

  const handleStepClick = (index: number) => {
    if (isTyping) return;
    const step = parsedSteps[index];
    if (!step) return;
    setActiveStepIndex(index);
    setIsTyping(true);
    setTypingCommand("");
    setCmdOutput("");

    // Typing effect
    let charIdx = 0;
    const interval = setInterval(() => {
      if (charIdx < step.command.length) {
        setTypingCommand((prev) => prev + step.command[charIdx]);
        charIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsTyping(false);
          setCmdOutput(step.output);
          setCurrentTree(step.treeState);
        }, 400);
      }
    }, 60);
  };

  const handleReset = () => {
    setActiveStepIndex(null);
    setCurrentTree(parsedInitialTree);
    setTypingCommand("");
    setCmdOutput("");
    setIsTyping(false);
  };

  // Group paths into hierarchy
  const renderTree = () => {
    // Sort tree items by path depth
    const sorted = [...currentTree].sort((a, b) => a.path.localeCompare(b.path));
    
    return (
      <div className="space-y-1.5 font-mono text-[11px] text-slate-300">
        {sorted.map((item) => {
          const depth = item.path.split("/").length - 1;
          const isHighlighted = activeStepIndex !== null && parsedSteps[activeStepIndex]?.highlightPath === item.path;
          
          return (
            <div 
              key={item.path} 
              className={`flex items-center gap-1.5 py-1 px-2 rounded transition-all duration-300 ${
                isHighlighted 
                  ? "bg-[#39FF14]/10 border-l-2 border-[#39FF14] text-white" 
                  : "hover:bg-slate-900/30"
              }`}
              style={{ paddingLeft: `${depth * 14 + 8}px` }}
            >
              {item.type === "folder" ? (
                <Folder size={12} className={item.isHidden ? "text-slate-500 opacity-60" : "text-sky-400"} />
              ) : (
                <File size={12} className={item.isReadOnly ? "text-red-400" : "text-emerald-400"} />
              )}
              <span className={item.isHidden ? "italic text-slate-500" : ""}>
                {item.name}
              </span>
              {item.isReadOnly && (
                <span className="text-[7px] font-black uppercase text-red-400 bg-red-400/10 px-1 py-0.2 rounded border border-red-400/20">
                  R
                </span>
              )}
              {item.isHidden && (
                <span className="text-[7px] font-black uppercase text-slate-500 bg-slate-500/10 px-1 py-0.2 rounded border border-slate-500/20">
                  H
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="my-6 border border-slate-850 bg-[#090f1d] rounded-2xl overflow-hidden shadow-2xl font-sans">
      {/* Title Header */}
      <div className="p-4 bg-slate-950 border-b border-slate-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-2">
            {title}
          </span>
        </div>
        <button
          onClick={handleReset}
          className="p-1 text-slate-500 hover:text-white transition-colors cursor-pointer"
          title="Reset Simulation"
        >
          <RotateCcw size={12} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 bg-[#050912]">
        {/* Left Column: Live Tree (3/5 width) */}
        <div className="md:col-span-3 p-5 border-b md:border-b-0 md:border-r border-slate-850 flex flex-col justify-between min-h-[250px]">
          <div>
            <span className="text-[8px] font-black uppercase tracking-widest text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded">
              Storage Partition Tree
            </span>
            <div className="mt-4 bg-slate-950/60 rounded-xl p-4 border border-slate-900 min-h-[160px]">
              {renderTree()}
            </div>
          </div>

          {/* Console preview output */}
          <div className="mt-4 bg-slate-950 p-3 rounded-xl border border-slate-900 font-mono text-[10px] text-slate-400 min-h-[54px] flex flex-col justify-center">
            {isTyping && (
              <div className="text-white">
                C:\Users\Student&gt; {typingCommand}
                <span className="w-1.5 h-3 bg-[#39FF14] inline-block ml-0.5 animate-pulse" />
              </div>
            )}
            {!isTyping && activeStepIndex !== null && parsedSteps[activeStepIndex] && (
              <div className="space-y-1">
                <div className="text-slate-500">C:\Users\Student&gt; {parsedSteps[activeStepIndex].command}</div>
                {cmdOutput && <div className="text-emerald-450 whitespace-pre-wrap">{cmdOutput}</div>}
              </div>
            )}
            {!isTyping && activeStepIndex === null && (
              <div className="text-slate-500 italic">Click an action pill on the right to start...</div>
            )}
          </div>
        </div>

        {/* Right Column: Steps list (2/5 width) */}
        <div className="md:col-span-2 p-5 bg-[#090f1d]/50 flex flex-col gap-3">
          <span className="text-[8px] font-black uppercase tracking-widest text-[#39FF14] bg-emerald-500/10 px-2 py-0.5 rounded w-max">
            Interactive Actions
          </span>
          <p className="text-[10px] text-slate-400 font-bold leading-normal">
            Click any step below to run the command and watch the folder tree update live:
          </p>

          <div className="space-y-2 mt-2">
            {parsedSteps.map((step, idx) => {
              const isActive = activeStepIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleStepClick(idx)}
                  disabled={isTyping}
                  className={`w-full p-3 rounded-xl border text-left flex flex-col transition-all cursor-pointer ${
                    isActive
                      ? "border-emerald-500 bg-emerald-500/5 text-white"
                      : "border-slate-800 bg-slate-950/80 hover:border-slate-700 text-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-[10px] font-bold text-white">
                      {step.command}
                    </span>
                    {isActive ? (
                      <CheckCircle size={10} className="text-[#39FF14]" />
                    ) : (
                      <Play size={8} className="text-slate-600 group-hover:text-slate-450" />
                    )}
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1 leading-normal font-medium">
                    {step.explanation}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
