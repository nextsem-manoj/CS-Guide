"use client";

import React, { useState } from "react";
import { 
  Terminal, 
  Copy, 
  Check, 
  GitBranch, 
  WrapText, 
  Layers, 
  ChevronRight, 
  Sparkles,
  Folder
} from "lucide-react";

export interface TerminalCommandBoxProps {
  /** Single command string or array of commands to display */
  commands: string[] | string;
  /** Header title, defaults to "Windows 11 Terminal / VS Code" */
  title?: string;
  /** Current Git branch, e.g. "main" */
  branch?: string;
  /** Target repository or folder name */
  repoName?: string;
  /** Current working directory indicator, e.g. "~/html-css-projects" */
  cwd?: string;
  /** Map of line index (0-based) to step explanation text */
  explanationMap?: Record<number, string>;
  /** Whether to allow switching to one-liner chained command (&&) view */
  allowOneLiner?: boolean;
  /** Default state for line wrapping (default true) */
  defaultWrap?: boolean;
  /** Additional container classes */
  className?: string;
}

/**
 * Tokenize and render syntax highlighting for terminal and git commands
 */
function renderSyntax(cmd: string) {
  // If line is a comment
  if (cmd.trim().startsWith("#")) {
    return <span className="text-slate-400 italic">{cmd}</span>;
  }

  // Regex to separate quoted strings from other tokens
  // Matches "..." or '...' or tokens without quotes
  const parts: { text: string; isString: boolean }[] = [];
  const regex = /("[^"]*"|'[^']*'|[^\s"']+|\s+)/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(cmd)) !== null) {
    const text = match[0];
    const isString = (text.startsWith('"') && text.endsWith('"')) || (text.startsWith("'") && text.endsWith("'"));
    parts.push({ text, isString });
  }

  return parts.map((part, index) => {
    if (part.isString) {
      return (
        <span key={index} className="text-emerald-300 font-medium">
          {part.text}
        </span>
      );
    }

    const trimmed = part.text.trim();

    // Primary command verbs
    if (/^(git|cd|mkdir|code|npm|npx|node|cls|clear)$/i.test(trimmed)) {
      return (
        <span key={index} className="text-sky-400 font-bold">
          {part.text}
        </span>
      );
    }

    // Git subcommands
    if (/^(add|commit|push|pull|status|checkout|branch|clone|remote|init|diff|log)$/i.test(trimmed)) {
      return (
        <span key={index} className="text-cyan-300 font-semibold">
          {part.text}
        </span>
      );
    }

    // Flags and options
    if (/^(\.|-m|-b|-u|--all|-p|--global|-v|--version)$/i.test(trimmed)) {
      return (
        <span key={index} className="text-amber-400 font-semibold">
          {part.text}
        </span>
      );
    }

    // Branch / remote names
    if (/^(origin|main|master|upstream|HEAD)$/i.test(trimmed)) {
      return (
        <span key={index} className="text-purple-300 font-semibold">
          {part.text}
        </span>
      );
    }

    return (
      <span key={index} className="text-slate-200">
        {part.text}
      </span>
    );
  });
}

/**
 * Intelligent default step explanations for standard developer commands
 */
function getAutomaticExplanation(cmd: string): string | null {
  const trimmed = cmd.trim();
  if (trimmed === "git add .") return "Stage all modified files and new assets for commit";
  if (trimmed.startsWith("git commit -m")) return "Commit staged changes with a descriptive message";
  if (trimmed.startsWith("git push")) return "Push local commits directly to your remote GitHub repository";
  if (trimmed.startsWith("mkdir ")) return `Create a new project folder (${trimmed.replace("mkdir ", "")})`;
  if (trimmed.startsWith("cd ")) return `Change working directory to ${trimmed.replace("cd ", "")}`;
  if (trimmed === "code .") return "Launch this folder immediately in Visual Studio Code";
  if (trimmed.startsWith("#")) return null;
  return null;
}

export function TerminalCommandBox({
  commands,
  title = "Windows 11 Terminal / VS Code",
  branch = "main",
  repoName,
  cwd,
  explanationMap,
  allowOneLiner = true,
  defaultWrap = true,
  className = ""
}: TerminalCommandBoxProps) {
  // Normalize commands to string array
  const commandList: string[] = Array.isArray(commands)
    ? commands
    : commands.split("\n").filter((c) => c.trim().length > 0);

  const [isWrapped, setIsWrapped] = useState<boolean>(defaultWrap);
  const [activeTab, setActiveTab] = useState<"step" | "oneliner">("step");
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [copiedSingleIndex, setCopiedSingleIndex] = useState<number | null>(null);

  // Compute one-liner chained command (using && for sequential execution)
  const executableCommands = commandList.filter((c) => !c.trim().startsWith("#"));
  const oneLinerCommand = executableCommands.join(" && ");

  const handleCopyAll = async () => {
    const textToCopy = activeTab === "oneliner" 
      ? oneLinerCommand 
      : commandList.join("\n");
      
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      // Fallback
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  const handleCopySingle = async (cmd: string, index: number) => {
    try {
      await navigator.clipboard.writeText(cmd.trim());
      setCopiedSingleIndex(index);
      setTimeout(() => setCopiedSingleIndex(null), 1800);
    } catch {
      setCopiedSingleIndex(index);
      setTimeout(() => setCopiedSingleIndex(null), 1800);
    }
  };

  return (
    <div
      className={`rounded-2xl border-2 border-slate-300 dark:border-neutral-800 bg-[#090d16] text-white overflow-hidden shadow-lg transition-all ${className}`}
    >
      {/* ── Top Terminal Titlebar ── */}
      <div className="px-3.5 sm:px-4 py-2.5 bg-[#0d1322] border-b border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
        {/* Left Side: Window Controls & Shell Identification */}
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Windows / Mac Style Window Dots */}
          <div className="flex items-center gap-1.5 shrink-0 select-none">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          <div className="flex items-center gap-2 min-w-0">
            <Terminal size={14} className="text-blue-400 shrink-0" />
            <span className="font-mono text-xs font-bold text-slate-200 truncate">
              {title}
            </span>
          </div>

          {/* Optional Branch / Repo Badges */}
          <div className="hidden sm:flex items-center gap-1.5">
            {branch && (
              <span className="px-2 py-0.5 rounded-md bg-blue-950/70 text-blue-400 border border-blue-800/60 text-[10px] font-mono font-bold flex items-center gap-1">
                <GitBranch size={10} />
                {branch}
              </span>
            )}
            {repoName && (
              <span className="px-2 py-0.5 rounded-md bg-neutral-900 text-slate-400 border border-neutral-800 text-[10px] font-mono hidden md:flex items-center gap-1">
                <Folder size={10} />
                {repoName}
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Interactive Controls (Word Wrap Toggle + Copy All) */}
        <div className="flex items-center gap-1.5 sm:gap-2 ml-auto shrink-0">
          {/* Word Wrap Toggle Button */}
          <button
            type="button"
            onClick={() => setIsWrapped(!isWrapped)}
            title={isWrapped ? "Disable word wrap (show scrollbar)" : "Enable word wrap (fit to screen)"}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold font-mono transition-all border ${
              isWrapped
                ? "bg-blue-950/80 text-blue-300 border-blue-700/60 shadow-sm"
                : "bg-neutral-900 text-slate-400 border-neutral-800 hover:text-white"
            } active:scale-95 cursor-pointer`}
          >
            <WrapText size={11} className={isWrapped ? "text-blue-400" : "text-slate-500"} />
            <span>{isWrapped ? "Wrap: ON" : "Wrap: OFF"}</span>
          </button>

          {/* Global Copy All Button */}
          <button
            type="button"
            onClick={handleCopyAll}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold transition-all shadow-sm active:scale-95 cursor-pointer ${
              copiedAll
                ? "bg-emerald-600 text-white"
                : "bg-blue-600 hover:bg-blue-500 text-white"
            }`}
          >
            {copiedAll ? <Check size={12} /> : <Copy size={12} />}
            <span>{copiedAll ? "Copied All!" : "Copy All"}</span>
          </button>
        </div>
      </div>

      {/* ── Subheader Bar: View Switcher (Step-by-Step vs One-Liner Chained) ── */}
      {allowOneLiner && commandList.length > 1 && (
        <div className="px-3.5 sm:px-4 py-1.5 bg-[#0b101c] border-b border-slate-800/80 flex items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("step")}
              className={`px-2.5 py-0.5 rounded-md font-bold transition-colors cursor-pointer ${
                activeTab === "step"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Step-by-Step ({commandList.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("oneliner")}
              className={`px-2.5 py-0.5 rounded-md font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                activeTab === "oneliner"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Sparkles size={10} />
              <span>Chained One-Liner (&&)</span>
            </button>
          </div>

          <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
            {cwd ? cwd : "💡 Click individual copy icons to run step-by-step"}
          </span>
        </div>
      )}

      {/* ── Commands Body ── */}
      <div className="p-2 sm:p-3 space-y-1.5">
        {activeTab === "step" ? (
          /* View 1: Step-by-Step rows with line number, prompt, syntax highlighting, and 1-click copy */
          commandList.map((cmd, idx) => {
            const explanation = explanationMap?.[idx] ?? getAutomaticExplanation(cmd);
            const isCopied = copiedSingleIndex === idx;
            const isComment = cmd.trim().startsWith("#");

            return (
              <div
                key={idx}
                className="group relative rounded-xl border border-transparent hover:border-slate-800/80 hover:bg-white/[0.03] transition-all p-2 sm:p-2.5 flex flex-col gap-1"
              >
                <div className="flex items-start justify-between gap-2">
                  {/* Left: Line Number & Prompt Icon */}
                  <div className="flex items-start gap-2.5 min-w-0 flex-1">
                    <div className="shrink-0 select-none flex items-center gap-1.5 pt-0.5 text-[11px] font-mono text-slate-500 min-w-[28px]">
                      <span>{idx + 1}</span>
                      <span className="text-blue-400 font-bold">$</span>
                    </div>

                    {/* Middle: Command Text with Smart Word-Wrap (No horizontal clipping) */}
                    <div
                      className={`font-mono text-xs sm:text-[13px] leading-relaxed flex-1 min-w-0 text-slate-100 selection:bg-blue-600 selection:text-white ${
                        isWrapped
                          ? "whitespace-pre-wrap break-words break-all sm:break-words overflow-x-hidden"
                          : "whitespace-pre overflow-x-auto pb-1"
                      }`}
                    >
                      {renderSyntax(cmd)}
                    </div>
                  </div>

                  {/* Right: Individual Copy Button for this specific command */}
                  {!isComment && (
                    <button
                      type="button"
                      onClick={() => handleCopySingle(cmd, idx)}
                      title={`Copy line ${idx + 1}: ${cmd}`}
                      className={`shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold font-mono transition-all border cursor-pointer ${
                        isCopied
                          ? "bg-emerald-600 text-white border-emerald-500 scale-95"
                          : "bg-neutral-900/90 hover:bg-neutral-800 text-slate-300 hover:text-white border-neutral-700/80 active:scale-95"
                      }`}
                    >
                      {isCopied ? <Check size={11} /> : <Copy size={11} />}
                      <span>{isCopied ? "Copied" : "Copy"}</span>
                    </button>
                  )}
                </div>

                {/* Optional Helpful Step Context Pill */}
                {explanation && (
                  <div className="pl-8 sm:pl-9 flex items-center gap-1.5 text-[11px] text-slate-400">
                    <ChevronRight size={11} className="text-blue-500 shrink-0" />
                    <span>{explanation}</span>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          /* View 2: Chained One-Liner (Run all at once with &&) */
          <div className="p-3 rounded-xl bg-black/40 border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] text-slate-400 flex items-center gap-1.5 font-bold">
                <Layers size={13} className="text-blue-400" />
                <span>Single Chained Execution (Paste Once in Terminal):</span>
              </span>
              <button
                type="button"
                onClick={handleCopyAll}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all border cursor-pointer ${
                  copiedAll
                    ? "bg-emerald-600 text-white border-emerald-500"
                    : "bg-blue-600 hover:bg-blue-500 text-white border-blue-500"
                }`}
              >
                {copiedAll ? <Check size={11} /> : <Copy size={11} />}
                <span>{copiedAll ? "Copied!" : "Copy Chained"}</span>
              </button>
            </div>

            <div
              className={`p-3 rounded-lg bg-neutral-950 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-100 border border-neutral-800 select-all ${
                isWrapped
                  ? "whitespace-pre-wrap break-words break-all sm:break-words overflow-x-hidden"
                  : "whitespace-pre overflow-x-auto pb-1"
              }`}
            >
              <span className="text-blue-400 font-bold select-none mr-2">$</span>
              {renderSyntax(oneLinerCommand)}
            </div>

            <p className="text-[11px] text-slate-400">
              💡 Chaining with <code className="text-blue-400 font-bold">&&</code> ensures the next command only runs if the previous one succeeded.
            </p>
          </div>
        )}
      </div>

      {/* ── Terminal Footer / Keyboard Pro-Tip ── */}
      <div className="px-3.5 sm:px-4 py-2 bg-[#0d1322] border-t border-slate-800/80 text-[10px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-1">
          <span>⌨️ Paste into terminal:</span>
          <kbd className="px-1.5 py-0.5 rounded bg-neutral-900 border border-slate-700 text-slate-200 font-mono text-[9px]">
            Ctrl + V
          </kbd>
          <span className="hidden sm:inline">or right-click in Windows Terminal / VS Code</span>
        </span>

        <span className="text-slate-500 font-mono">
          {isWrapped ? "✨ Word wrap active (no horizontal cutoff)" : "↔️ Horizontal scroll enabled"}
        </span>
      </div>
    </div>
  );
}

export default TerminalCommandBox;
