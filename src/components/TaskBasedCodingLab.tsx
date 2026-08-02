"use client";

import React, { useState, useEffect } from "react";
import { 
  Code2, CheckCircle2, Circle, Lightbulb, Play, RotateCcw, 
  Sparkles, Terminal, Award, Layers, ShieldCheck, ChevronDown, ChevronUp, ExternalLink, HelpCircle
} from "lucide-react";
import { triggerCelebration } from "@/lib/celebration";

export interface TaskItem {
  id: string;
  title: string;
  instruction: string;
  hint: string;
  validatorKeywords?: string[];
  validatorRegex?: string;
}

export interface TaskCodingLabProps {
  labId: string;
  labTitle: string;
  labDescription?: string;
  language?: "html" | "css" | "javascript" | "cli" | "c";
  initialCode?: string;
  tasks: TaskItem[];
}

export default function TaskBasedCodingLab({
  labId,
  labTitle,
  labDescription = "Complete each task step-by-step in the interactive code editor below. Click 'Run & Verify Tasks' to test your code!",
  language = "html",
  initialCode = `<!-- Write your solution code here -->\n<div class="card">\n  \n</div>`,
  tasks = []
}: TaskCodingLabProps) {
  const [code, setCode] = useState<string>(initialCode);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [activeHintId, setActiveHintId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"preview" | "terminal">("preview");
  const [verificationFeedback, setVerificationFeedback] = useState<{
    status: "idle" | "success" | "partial" | "error";
    message: string;
  }>({ status: "idle", message: "" });

  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(tasks[0]?.id || null);

  // Load saved code & progress
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedCode = localStorage.getItem(`nextsem_task_lab_code_${labId}`);
        if (savedCode) setCode(savedCode);

        const savedProgress = localStorage.getItem(`nextsem_task_lab_done_${labId}`);
        if (savedProgress) setCompletedTaskIds(JSON.parse(savedProgress));
      } catch (e) {
        console.error("Failed to load task lab state", e);
      }
    }
  }, [labId]);

  // Save code changes
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (typeof window !== "undefined") {
      localStorage.setItem(`nextsem_task_lab_code_${labId}`, newCode);
    }
  };

  // Reset code to default
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your code to default?")) {
      setCode(initialCode);
      setCompletedTaskIds([]);
      setVerificationFeedback({ status: "idle", message: "" });
      if (typeof window !== "undefined") {
        localStorage.removeItem(`nextsem_task_lab_code_${labId}`);
        localStorage.removeItem(`nextsem_task_lab_done_${labId}`);
      }
    }
  };

  // Run & Verify Code against Tasks
  const handleVerify = (e?: React.MouseEvent) => {
    const newlyCompleted: string[] = [];

    tasks.forEach(task => {
      let passed = true;

      // Check keywords
      if (task.validatorKeywords && task.validatorKeywords.length > 0) {
        const missing = task.validatorKeywords.filter(
          kw => !code.toLowerCase().includes(kw.toLowerCase())
        );
        if (missing.length > 0) passed = false;
      }

      // Check regex pattern if provided
      if (task.validatorRegex) {
        try {
          const reg = new RegExp(task.validatorRegex, "i");
          if (!reg.test(code)) passed = false;
        } catch (err) {
          console.error("Regex validation error:", err);
        }
      }

      if (passed) {
        newlyCompleted.push(task.id);
      }
    });

    setCompletedTaskIds(newlyCompleted);

    if (typeof window !== "undefined") {
      localStorage.setItem(`nextsem_task_lab_done_${labId}`, JSON.stringify(newlyCompleted));
    }

    if (newlyCompleted.length === tasks.length && tasks.length > 0) {
      setVerificationFeedback({
        status: "success",
        message: "🎉 Fantastic Job! All tasks passed successfully! Task-Based Coding Lab Completed!"
      });
      triggerCelebration(e);
    } else if (newlyCompleted.length > 0) {
      setVerificationFeedback({
        status: "partial",
        message: `Great progress! ${newlyCompleted.length} of ${tasks.length} tasks completed. Keep going!`
      });
    } else {
      setVerificationFeedback({
        status: "error",
        message: "No tasks passed yet. Review the task instructions & hints, then update your code."
      });
    }
  };

  const progressPercent = tasks.length > 0 ? Math.round((completedTaskIds.length / tasks.length) * 100) : 0;

  return (
    <div className="my-8 bg-[#0c1328] border border-emerald-500/30 rounded-2xl p-4 md:p-6 shadow-2xl relative overflow-hidden">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider flex items-center gap-1">
              <Code2 className="w-3.5 h-3.5" /> Task-Based Coding Lab
            </span>
            <span className="text-xs text-slate-400 font-mono uppercase">{language}</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            {labTitle}
          </h3>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
            {labDescription}
          </p>
        </div>

        {/* Overall Progress Counter */}
        <div className="bg-[#060c18] border border-slate-800 rounded-xl p-3 flex flex-col items-center min-w-[140px]">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Progress: {completedTaskIds.length}/{tasks.length}</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[10px] font-bold text-emerald-400 mt-1">{progressPercent}% Completed</span>
        </div>
      </div>

      {/* Main Grid Layout: Tasks Checklist (Left) & Code Editor/Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Tasks Checklist (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" /> Coding Tasks ({tasks.length})
            </h4>
          </div>

          <div className="flex flex-col gap-2.5">
            {tasks.map((task, idx) => {
              const isDone = completedTaskIds.includes(task.id);
              const isExpanded = expandedTaskId === task.id;

              return (
                <div 
                  key={task.id}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isDone 
                      ? "bg-emerald-950/20 border-emerald-500/40" 
                      : "bg-[#060c18] border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {/* Task Header Bar */}
                  <div 
                    onClick={() => setExpandedTaskId(isExpanded ? null : task.id)}
                    className="p-3.5 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-500 flex-shrink-0" />
                      )}
                      <div>
                        <span className="text-xs text-slate-400 font-mono block">Task #{idx + 1}</span>
                        <span className={`text-sm font-bold ${isDone ? "text-emerald-300 line-through" : "text-white"}`}>
                          {task.title}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isDone && (
                        <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-500/30">
                          DONE
                        </span>
                      )}
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Task Instruction & Hint */}
                  {isExpanded && (
                    <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-800/80 bg-[#0c1328]/50 text-xs text-slate-300 space-y-3">
                      <p className="leading-relaxed whitespace-pre-line">{task.instruction}</p>

                      {/* Hint Button & Expandable Box */}
                      {task.hint && (
                        <div>
                          <button
                            onClick={() => setActiveHintId(activeHintId === task.id ? null : task.id)}
                            className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                          >
                            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                            {activeHintId === task.id ? "Hide Hint" : "Need a Hint?"}
                          </button>

                          {activeHintId === task.id && (
                            <div className="mt-2 p-2.5 bg-amber-950/30 border border-amber-500/30 rounded-lg text-amber-200 text-xs leading-relaxed animate-fadeIn">
                              💡 <strong>Hint:</strong> {task.hint}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Button: Verify Tasks */}
          <div className="mt-2 flex flex-col gap-2">
            <button
              onClick={handleVerify}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black py-3 px-4 rounded-xl shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Run & Verify Tasks</span>
            </button>

            <button
              onClick={handleReset}
              className="w-full bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-medium py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700/60"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Code & Tasks</span>
            </button>
          </div>

          {/* Verification Feedback Alert Banner */}
          {verificationFeedback.status !== "idle" && (
            <div className={`mt-2 p-3 rounded-xl border text-xs leading-relaxed font-medium flex items-start gap-2.5 animate-fadeIn ${
              verificationFeedback.status === "success" 
                ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-200" 
                : verificationFeedback.status === "partial"
                ? "bg-amber-950/60 border-amber-500/50 text-amber-200"
                : "bg-rose-950/60 border-rose-500/50 text-rose-200"
            }`}>
              <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{verificationFeedback.message}</span>
            </div>
          )}
        </div>

        {/* Right Column: Code Editor & Live Preview (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {/* Editor Header Toolbar */}
          <div className="flex items-center justify-between bg-[#060c18] border border-slate-800 rounded-t-xl px-4 py-2.5">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Code Editor</span>
            </div>

            {/* Output Tab Selector */}
            <div className="flex items-center gap-1 bg-[#0c1328] p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setActiveTab("preview")}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-md transition-all ${
                  activeTab === "preview" 
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                🌐 Live Preview
              </button>
              <button
                onClick={() => setActiveTab("terminal")}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-md transition-all ${
                  activeTab === "terminal" 
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                💻 Code View
              </button>
            </div>
          </div>

          {/* Interactive Code Textarea */}
          <div className="relative font-mono text-xs">
            <textarea
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              placeholder="Write your code here..."
              className="w-full h-[240px] md:h-[280px] bg-[#030712] text-emerald-300 p-4 rounded-b-xl border-x border-b border-slate-800 focus:outline-none focus:border-emerald-500/50 resize-y leading-relaxed font-mono selection:bg-emerald-500/30"
              spellCheck={false}
            />
          </div>

          {/* Output Window (Live Preview / Code Box) */}
          <div className="bg-[#060c18] border border-slate-800 rounded-xl overflow-hidden min-h-[160px] flex flex-col">
            <div className="bg-[#0c1328] px-3.5 py-2 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold flex items-center gap-1.5 text-slate-300">
                {activeTab === "preview" ? "🌐 Rendered Output" : "💻 Raw Output View"}
              </span>
              <span className="text-[10px] text-slate-500">Auto-Updates</span>
            </div>

            <div className="p-4 flex-1 overflow-auto bg-[#030712]">
              {activeTab === "preview" ? (
                language === "html" || language === "css" || language === "javascript" ? (
                  <iframe
                    title="Live Code Preview"
                    srcDoc={code}
                    className="w-full h-[180px] border-0 bg-white rounded-lg"
                    sandbox="allow-scripts"
                  />
                ) : (
                  <div className="font-mono text-xs text-emerald-400 whitespace-pre-wrap leading-relaxed">
                    $ {code.trim().split("\n").join("\n$ ")}
                  </div>
                )
              ) : (
                <pre className="font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {code}
                </pre>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
