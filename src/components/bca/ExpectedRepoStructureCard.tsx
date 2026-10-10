"use client";

import React, { useState } from "react";
import { 
  Folder, FolderOpen, FileCode, FileText, CheckCircle2, 
  Sparkles, AlertTriangle, ChevronDown, ChevronUp, Copy, 
  Check, GitBranch, Terminal, ExternalLink, HelpCircle,
  AlertCircle, ArrowRight
} from "lucide-react";
import { PracticalLesson } from "@/data/bcaPracticalData";

interface Props {
  lesson: PracticalLesson;
}

// Summary mapping of what each practical day creates
const DAY_FILE_MANIFEST: Record<number, {
  folder: string;
  primaryFile: string;
  extraFiles?: string[];
  summary: string;
  keyElements: string[];
}> = {
  1: {
    folder: "day-01",
    primaryFile: "index.html",
    summary: "HTML5 Boilerplate & First Webpage",
    keyElements: ["<!DOCTYPE html>", "<head>", "<title>", "<body>", "<h1>", "<p>"]
  },
  2: {
    folder: "day-02",
    primaryFile: "index.html",
    summary: "Heading Hierarchy & Text Formatting",
    keyElements: ["<h1>", "<h2>", "<h3>", "<strong>", "<em>", "<mark>", "<hr>"]
  },
  3: {
    folder: "day-03",
    primaryFile: "index.html",
    summary: "Hyperlinks & Accessible Images",
    keyElements: ["<a href=\"...\">", "target=\"_blank\"", "<img src=\"...\" alt=\"...\">"]
  },
  4: {
    folder: "day-04",
    primaryFile: "index.html",
    summary: "Lists & Navigation Menus",
    keyElements: ["<nav>", "<ul>", "<ol>", "<li>", "<dl>", "<dt>", "<dd>"]
  },
  5: {
    folder: "day-05",
    primaryFile: "index.html",
    summary: "Tables & Tabular Data Presentation",
    keyElements: ["<table>", "<thead>", "<tbody>", "<tr>", "<th>", "<td>"]
  },
  6: {
    folder: "day-06",
    primaryFile: "index.html",
    summary: "Semantic HTML5 Layout",
    keyElements: ["<header>", "<nav>", "<main>", "<article>", "<aside>", "<footer>"]
  },
  7: {
    folder: "day-07",
    primaryFile: "index.html",
    summary: "HTML Forms & Input Controls",
    keyElements: ["<form>", "<label>", "<input type=\"text\">", "<select>", "<button>"]
  },
  8: {
    folder: "day-08",
    primaryFile: "index.html",
    summary: "HTML5 Form Validation & Regex",
    keyElements: ["required", "pattern=\"...\"", "type=\"email\"", "minlength"]
  },
  9: {
    folder: "day-09",
    primaryFile: "index.html",
    summary: "HTML5 Media: Audio, Video & Embeds",
    keyElements: ["<audio controls>", "<video controls>", "<iframe>"]
  },
  10: {
    folder: "day-10",
    primaryFile: "index.html",
    extraFiles: ["styles.css"],
    summary: "Sprint 1 Capstone: Developer Resume",
    keyElements: ["Semantic layout", "CSS stylesheet link", "Portfolio showcase"]
  },
  11: {
    folder: "day-11",
    primaryFile: "index.html",
    summary: "CSS Box Model (Content, Padding, Border, Margin)",
    keyElements: ["box-sizing: border-box", "padding", "border", "margin", "background-color"]
  },
  12: {
    folder: "day-12",
    primaryFile: "index.html",
    summary: "CSS Display Modes & Document Flow",
    keyElements: ["display: block", "display: inline", "display: inline-block", "display: none"]
  },
  13: {
    folder: "day-13",
    primaryFile: "index.html",
    summary: "CSS Positioning (Static, Relative, Absolute, Fixed, Sticky)",
    keyElements: ["position: relative", "position: absolute", "position: sticky", "z-index", "top / right / bottom / left"]
  },
  14: {
    folder: "day-14",
    primaryFile: "index.html",
    summary: "Flexbox: 1D Layouts & Main Axis Alignment",
    keyElements: ["display: flex", "flex-direction", "justify-content", "gap"]
  },
  15: {
    folder: "day-15",
    primaryFile: "index.html",
    summary: "Flexbox: Cross Axis Alignment & Flex Items",
    keyElements: ["align-items", "flex-wrap: wrap", "flex-grow", "flex-shrink", "flex: 1"]
  },
  16: {
    folder: "day-16",
    primaryFile: "index.html",
    summary: "CSS Grid: 2D Layouts & Template Columns",
    keyElements: ["display: grid", "grid-template-columns", "repeat(3, 1fr)", "gap", "minmax()"]
  },
  17: {
    folder: "day-17",
    primaryFile: "index.html",
    summary: "CSS Grid: Spanning & Grid Template Areas",
    keyElements: ["grid-column: span 2", "grid-row: span 2", "grid-template-areas", "grid-area"]
  },
  18: {
    folder: "day-18",
    primaryFile: "index.html",
    summary: "Responsive Design & Media Queries (Mobile-First)",
    keyElements: ["<meta name=\"viewport\">", "@media (min-width: 768px)", "@media (min-width: 1024px)"]
  },
  19: {
    folder: "day-19",
    primaryFile: "index.html",
    summary: "CSS Transitions & Micro-Interactions",
    keyElements: ["transition: all 0.3s ease", ":hover", "transform: translateY(-4px)", "box-shadow"]
  },
  20: {
    folder: "day-20",
    primaryFile: "index.html",
    extraFiles: ["styles.css"],
    summary: "Sprint 2 Capstone: Responsive University Campus Portal",
    keyElements: ["Semantic layout", "Flexbox navigation bar", "CSS Grid departments", "Responsive media queries", "Hover transitions"]
  },
  21: {
    folder: "day-21",
    primaryFile: "index.html",
    summary: "JavaScript Introduction: <script>, Variables & Types",
    keyElements: ["<script>", "const", "let", "typeof", "console.log()"]
  },
  22: {
    folder: "day-22",
    primaryFile: "index.html",
    summary: "JavaScript Operators: Arithmetic & Strict Equality",
    keyElements: ["===", "!==", "&&", "||", "!"]
  },
  23: {
    folder: "day-23",
    primaryFile: "index.html",
    summary: "Control Flow: if-else if & switch Statements",
    keyElements: ["if (...) { ... }", "else if", "switch", "case", "break"]
  },
  24: {
    folder: "day-24",
    primaryFile: "index.html",
    summary: "Loops & Iteration: for, while & for...of",
    keyElements: ["for (let i = ...)", "while (...)", "for (const item of items)"]
  },
  25: {
    folder: "day-25",
    primaryFile: "index.html",
    summary: "Functions: Declarations, Arrow Syntax & Scope",
    keyElements: ["function name()", "const name = () =>", "return", "parameters"]
  },
  26: {
    folder: "day-26",
    primaryFile: "index.html",
    summary: "Array Methods: push, map, filter & reduce",
    keyElements: [".filter()", ".map()", ".reduce()", ".push()"]
  },
  27: {
    folder: "day-27",
    primaryFile: "index.html",
    summary: "Objects: Key-Value Pairs, Nested Data & JSON",
    keyElements: ["{ key: value }", "JSON.stringify()", "JSON.parse()", "destructuring"]
  },
  28: {
    folder: "day-28",
    primaryFile: "index.html",
    summary: "DOM Selection: querySelector, textContent & Styles",
    keyElements: ["document.querySelector()", ".textContent", ".style", ".classList.toggle()"]
  },
  29: {
    folder: "day-29",
    primaryFile: "index.html",
    summary: "DOM Events: addEventListener & preventDefault",
    keyElements: ["addEventListener('click')", "addEventListener('submit')", "e.preventDefault()"]
  },
  30: {
    folder: "day-30",
    primaryFile: "index.html",
    extraFiles: ["styles.css"],
    summary: "Sprint 3 Capstone: Interactive Student SGPA & Grade Portal",
    keyElements: ["Interactive form", "Number() casting", "SGPA calculation", "Dynamic DOM table", "Pass/Fail badges"]
  }
};

export default function ExpectedRepoStructureCard({ lesson }: Props) {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [showTroubleshooting, setShowTroubleshooting] = useState<boolean>(true);
  const [copiedCommands, setCopiedCommands] = useState<boolean>(false);

  const currentDay = lesson.day;
  const padDay = currentDay < 10 ? `0${currentDay}` : `${currentDay}`;
  const currentManifest = DAY_FILE_MANIFEST[currentDay] || {
    folder: `day-${padDay}`,
    primaryFile: lesson.practicalLab.language === "c" ? "main.c" : lesson.practicalLab.language === "javascript" ? "app.js" : "index.html",
    summary: lesson.title,
    keyElements: lesson.objectives.slice(0, 3)
  };

  // Generate days to display cumulatively from 1 up to currentDay
  const cumulativeDays = Array.from({ length: currentDay }, (_, i) => i + 1);

  // Exact terminal setup commands snippet for Windows CMD / PowerShell / VS Code
  const terminalSnippet = `# 1. Enter your repository directory
cd ${lesson.githubWorkflow.repoName || "html-css-projects"}

# 2. Create the exact folder for Day ${currentDay}
mkdir day-${padDay}
cd day-${padDay}

# 3. Create your code file: ${currentManifest.primaryFile}
# (Write your Day ${currentDay} homework code inside ${currentManifest.primaryFile})

# 4. Save, stage, commit and push to GitHub:
git add .
git commit -m "Day ${padDay}: ${lesson.title.replace(/"/g, '')}"
git push origin main`;

  const handleCopyCommands = () => {
    navigator.clipboard.writeText(terminalSnippet);
    setCopiedCommands(true);
    setTimeout(() => setCopiedCommands(false), 2000);
  };

  return (
    <div className="rounded-2xl border-2 border-blue-600/30 dark:border-blue-500/40 bg-white dark:bg-black overflow-hidden shadow-sm transition-all mb-4">
      {/* Card Header */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-3.5 sm:p-4 bg-gradient-to-r from-blue-50/80 via-white to-blue-50/50 dark:from-neutral-900 dark:via-black dark:to-neutral-900 border-b border-blue-100 dark:border-neutral-800 flex items-center justify-between gap-3 cursor-pointer select-none"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <GitBranch size={16} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-xs sm:text-sm font-black text-black dark:text-white tracking-tight">
                Exact GitHub Setup Guide & Expected Structure
              </h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-600 text-white flex items-center gap-1">
                <Sparkles size={10} />
                Day {currentDay} Requirements
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              Follow these exact folder and file names to prevent verification errors.
            </p>
          </div>
        </div>

        <button 
          type="button"
          className="p-1.5 rounded-lg text-slate-500 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shrink-0"
          aria-label="Toggle file tree"
        >
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {isExpanded && (
        <div className="p-4 sm:p-5 space-y-4">
          {/* ── 1. EXACT STEP-BY-STEP SPECIFICATION CARDS ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {/* Step 1: Repo Name */}
            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-1">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                1. GitHub Repository
              </div>
              <div className="text-xs font-mono font-black text-blue-600 dark:text-blue-400 truncate">
                {lesson.githubWorkflow.repoName || "html-css-projects"}
              </div>
              <div className="text-[10px] text-slate-500">
                Must be set to <strong>Public</strong>
              </div>
            </div>

            {/* Step 2: Folder Name */}
            <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border-2 border-blue-600/40 space-y-1">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center justify-between">
                <span>2. Exact Folder</span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-600 text-white">NEW</span>
              </div>
              <div className="text-xs font-mono font-black text-black dark:text-white">
                day-{padDay}/ <span className="text-slate-400 font-normal">or</span> bca-day-{currentDay}/
              </div>
              <div className="text-[10px] text-slate-500">
                Create inside repo root
              </div>
            </div>

            {/* Step 3: Exact File Name */}
            <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border-2 border-blue-600/40 space-y-1">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center justify-between">
                <span>3. Exact File Name</span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-600 text-white">REQUIRED</span>
              </div>
              <div className="text-xs font-mono font-black text-black dark:text-white">
                {currentManifest.primaryFile}
              </div>
              <div className="text-[10px] text-rose-600 dark:text-rose-400 font-bold">
                ⚠️ No spaces or custom names
              </div>
            </div>

            {/* Step 4: Submission Link */}
            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-1">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                4. What to Submit Below
              </div>
              <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold truncate">
                https://github.com/YOU/{lesson.githubWorkflow.repoName || "html-css-projects"}
              </div>
              <div className="text-[10px] text-slate-500">
                Or direct link to {currentManifest.primaryFile}
              </div>
            </div>
          </div>

          {/* ── 2. EXACT TERMINAL COMMANDS BOX (COPY-PASTEABLE) ── */}
          <div className="rounded-xl border border-slate-300 dark:border-neutral-800 bg-slate-900 text-slate-200 font-mono text-xs overflow-hidden shadow-inner">
            <div className="px-3.5 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <Terminal size={14} className="text-blue-400" />
                <span className="font-bold text-slate-300">
                  Terminal Commands to Create &amp; Push Day {currentDay}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyCommands}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                {copiedCommands ? <Check size={12} /> : <Copy size={12} />}
                <span>{copiedCommands ? "Copied!" : "Copy All Commands"}</span>
              </button>
            </div>
            <pre className="p-3.5 text-[11px] overflow-x-auto text-emerald-400 whitespace-pre leading-relaxed">
              {terminalSnippet}
            </pre>
          </div>

          {/* ── 3. COMMON PITFALLS & ERROR AVOIDANCE CHECKLIST ── */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs space-y-2">
            <div className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-2">
              <AlertCircle size={15} className="text-amber-600 shrink-0" />
              <span>How to Avoid "Could not find your practical code file" Errors:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-amber-950 dark:text-amber-200/90 pl-1">
              <div className="flex items-start gap-1.5">
                <span className="font-bold text-amber-700">1.</span>
                <span><strong>Use Lowercase <code>index.html</code>:</strong> Avoid spaces or custom names like <code>Alan Turing..html</code> or <code>Index.HTML</code>. Linux/GitHub servers are strictly case-sensitive.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="font-bold text-amber-700">2.</span>
                <span><strong>Separate Day Folders:</strong> Create a new folder <code>day-{padDay}/</code> for today so you don't overwrite previous days.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="font-bold text-amber-700">3.</span>
                <span><strong>Ensure Public Visibility:</strong> If your GitHub repo is <strong>Private</strong>, automated validation cannot inspect your code. Set it to <strong>Public</strong>.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="font-bold text-amber-700">4.</span>
                <span><strong>Check on GitHub Website:</strong> Before clicking "Verify", open your repo in Google Chrome to confirm your files were pushed to branch <code>main</code>.</span>
              </div>
            </div>
          </div>

          {/* ── 4. CUMULATIVE DIRECTORY TREE PREVIEW ── */}
          <div className="rounded-xl border border-slate-300 dark:border-neutral-800 bg-slate-900 text-slate-200 font-mono text-xs overflow-hidden shadow-inner">
            {/* Visual Title Bar */}
            <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                <span className="ml-2 font-bold text-slate-300">
                  📁 github.com/YOUR_USERNAME/{lesson.githubWorkflow.repoName || "html-css-projects"}
                </span>
              </div>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                Branch: main
              </span>
            </div>

            {/* Tree Content */}
            <div className="p-4 space-y-2 overflow-x-auto">
              {/* Root Readme */}
              <div className="flex items-center gap-2 text-slate-400 text-[11px] pl-2">
                <FileText size={13} className="text-slate-500 shrink-0" />
                <span className="text-white font-bold">README.md</span>
                <span className="text-slate-500 text-[10px]"># BCA Practical Portfolio overview</span>
              </div>

              {/* Cumulative Day Folders */}
              {cumulativeDays.map((d) => {
                const info = DAY_FILE_MANIFEST[d] || {
                  folder: `day-${d < 10 ? `0${d}` : d}`,
                  primaryFile: "index.html",
                  summary: `Day ${d} Practice`,
                  keyElements: []
                };
                const isCurrent = d === currentDay;

                return (
                  <div 
                    key={d}
                    className={`rounded-lg transition-all ${
                      isCurrent 
                        ? "p-2.5 bg-blue-950/70 border-2 border-blue-500 shadow-sm" 
                        : "pl-2 py-0.5 opacity-80"
                    }`}
                  >
                    {/* Folder Row */}
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      {isCurrent ? (
                        <FolderOpen size={15} className="text-blue-400 shrink-0" />
                      ) : (
                        <Folder size={14} className="text-slate-400 shrink-0" />
                      )}
                      
                      <span className={`font-bold ${isCurrent ? "text-blue-300 font-black text-sm" : "text-slate-300"}`}>
                        {info.folder}/
                      </span>

                      {isCurrent ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-black bg-blue-500 text-white flex items-center gap-1">
                          <Sparkles size={10} />
                          ✨ CREATE THIS FOLDER FOR TODAY (Day {currentDay})
                        </span>
                      ) : (
                        <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                          <CheckCircle2 size={11} />
                          Day {d} Prior Lesson
                        </span>
                      )}

                      <span className="text-[10px] text-slate-400 hidden sm:inline">
                        — {info.summary}
                      </span>
                    </div>

                    {/* Inside Files */}
                    <div className="pl-6 pt-1 space-y-1">
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="text-slate-600">└──</span>
                        <FileCode size={14} className={isCurrent ? "text-blue-400" : "text-slate-400"} />
                        <span className={isCurrent ? "text-white font-black text-xs" : "text-slate-300"}>
                          {info.primaryFile}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] text-blue-300 bg-blue-900/60 px-2 py-0.5 rounded font-sans font-semibold">
                            Must contain: {info.keyElements.slice(0, 4).join(", ")}
                          </span>
                        )}
                      </div>

                      {/* Extra files like styles.css if any */}
                      {info.extraFiles?.map((extra) => (
                        <div key={extra} className="flex items-center gap-2 text-[11px]">
                          <span className="text-slate-600">└──</span>
                          <FileCode size={13} className="text-slate-400" />
                          <span className="text-slate-300">{extra}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
