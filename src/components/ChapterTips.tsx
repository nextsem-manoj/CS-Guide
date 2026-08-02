"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, HelpCircle, X, Shuffle, ArrowRight } from "lucide-react";

interface Tip {
  id: string;
  icon: string;
  category: string;
  title: string;
  text: string;
  tags?: string[];
}

const TIPS_DATABASE: Record<string, Tip[]> = {
  // Phase 0 / CLI Setup
  terminal: [
    {
      id: "cli-history",
      icon: "⏳",
      category: "Command Line",
      title: "Scroll Command History",
      text: "Press the Up Arrow key on your keyboard inside the terminal to instantly cycle back through previously executed commands! Saves tons of typing.",
      tags: ["shortcuts", "speed"]
    },
    {
      id: "cli-autocomplete",
      icon: "⚡",
      category: "Command Line",
      title: "Auto-Complete Directory Names",
      text: "Type the first few letters of a directory or file name and press Tab. The terminal will auto-complete it for you! Double-tap Tab to show all possibilities.",
      tags: ["shortcuts", "efficiency"]
    },
    {
      id: "cli-cls",
      icon: "🧼",
      category: "Command Line",
      title: "Clear Screen Clutter",
      text: "If your command prompt screen gets too messy and filled with text outputs, type cls (Clear Screen) and press Enter to start fresh.",
      tags: ["cli", "clean"]
    },
    {
      id: "cli-cancel",
      icon: "🛑",
      category: "Command Line",
      title: "Stop Stuck Commands",
      text: "If a command is running indefinitely (like a continuous network ping) or is stuck, press Ctrl + C to terminate the process and get your prompt back.",
      tags: ["shortcuts", "troubleshooting"]
    },
    {
      id: "cli-spaces",
      icon: "🚫",
      category: "Command Line",
      title: "The Zero-Space Rule",
      text: "Never use spaces when naming folders or files on the command line! Use hyphens (my-project) or underscores (my_project) to keep URLs from breaking.",
      tags: ["rules", "best-practice"]
    },
    {
      id: "cli-elevation",
      icon: "👑",
      category: "Command Line",
      title: "Run as Administrator (Elevation)",
      text: "Getting a 'requires elevation' error? Press the ⊞ Windows key, type cmd, right-click 'Command Prompt', and select 'Run as administrator' to open an elevated terminal window with full access rights.",
      tags: ["admin", "security"]
    },
    {
      id: "cli-window-size",
      icon: "📐",
      category: "Command Line",
      title: "Resizing the Command Prompt",
      text: "To make the terminal window larger, right-click the top title bar -> select Properties -> click Layout Tab -> adjust the Width/Height buffer fields to fit your screen resolution.",
      tags: ["customization", "cli"]
    }
  ],
  // HTML / Web Basics
  html: [
    {
      id: "html-seo-h1",
      icon: "🏆",
      category: "SEO & Structure",
      title: "The One H1 Rule",
      text: "Always use exactly one <h1> tag on every page. Using multiple <h1> tags confuses search engines and degrades your website's SEO indexing.",
      tags: ["seo", "accessibility"]
    },
    {
      id: "html-img-alt",
      icon: "🖼️",
      category: "Web Accessibility",
      title: "Always Use Image Alt Tags",
      text: "Always write descriptive alt attributes for your <img> elements (e.g. alt=\"Student analyzing code\"). Screen readers and Google image bots depend on them!",
      tags: ["accessibility", "seo"]
    },
    {
      id: "html-force-refresh",
      icon: "🔄",
      category: "Web Previewing",
      title: "Force-Refresh Browser Cache",
      text: "If your browser is showing cached files instead of your recent CSS changes, press Ctrl + F5 (or Cmd + Shift + R on Mac) to force-reload clean assets.",
      tags: ["debugging", "caching"]
    },
    {
      id: "html-semantics",
      icon: "🧠",
      category: "Semantic HTML",
      title: "Avoid Div-Soup Layouts",
      text: "Don't wrap everything in raw <div> tags. Use semantic HTML5 layout tags like <main>, <header>, <section>, and <footer> to help crawlers read your structure.",
      tags: ["best-practice", "semantics"]
    }
  ],
  // Developer Setup & Editor
  editor: [
    {
      id: "vscode-terminal",
      icon: "💻",
      category: "VS Code Setup",
      title: "Toggle Terminal Instantly",
      text: "Press Ctrl + ` (backtick) inside VS Code to slide the integrated terminal panel open or closed instantly without touching your mouse.",
      tags: ["shortcuts", "editor"]
    },
    {
      id: "git-commits",
      icon: "🌿",
      category: "Version Control",
      title: "Commit Small Changes",
      text: "Make small, incremental Git commits as you build. It makes locating bugs and reversing faulty code changes extremely simple!",
      tags: ["git", "best-practice"]
    },
    {
      id: "vscode-format",
      icon: "✨",
      category: "VS Code Setup",
      title: "Enable Format-On-Save",
      text: "Search for 'Format on Save' in your VS Code settings and enable it. Your code will automatically align and indent according to Prettier rules whenever you save!",
      tags: ["editor", "clean-code"]
    }
  ],
  // General study tips
  general: [
    {
      id: "dev-break",
      icon: "🧘",
      category: "Productivity",
      title: "Take a Five-Minute Break",
      text: "Stuck on a compile error or logic bug? Step away from your monitor for 5 minutes. Your subconscious mind will often find the solution while you're resting.",
      tags: ["mental-health", "productivity"]
    },
    {
      id: "dev-docs",
      icon: "📚",
      category: "Documentation",
      title: "Bookmark Official MDN Web Docs",
      text: "MDN (Mozilla Developer Network) is the gold standard dictionary for HTML, CSS, and JavaScript. Keep it open in a browser tab as you write code.",
      tags: ["resources", "learning"]
    }
  ]
};

interface ChapterTipsProps {
  chapterId: string;
}

export default function ChapterTips({ chapterId }: ChapterTipsProps) {
  // Determine relevant tip category
  let categoryKey = "general";
  if (chapterId.includes("terminal") || chapterId.includes("cli")) {
    categoryKey = "terminal";
  } else if (chapterId.startsWith("p1-") || chapterId.startsWith("p2-")) {
    categoryKey = "html";
  } else if (chapterId.includes("git") || chapterId.includes("vscode") || chapterId.includes("setup")) {
    categoryKey = "editor";
  }

  const tipsList = [...(TIPS_DATABASE[categoryKey] || []), ...TIPS_DATABASE.general];
  
  const [activeTipIndex, setActiveTipIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTip, setPopupTip] = useState<Tip | null>(null);

  // Set active tip on mount
  useEffect(() => {
    setActiveTipIndex(Math.floor(Math.random() * tipsList.length));
    
    // Choose a random popup tip when navigating to a new chapter
    const randTip = tipsList[Math.floor(Math.random() * tipsList.length)];
    setPopupTip(randTip);
  }, [chapterId]);

  const shuffleTip = () => {
    let nextIdx = Math.floor(Math.random() * tipsList.length);
    // Ensure we don't repeat the same tip consecutively
    if (nextIdx === activeTipIndex && tipsList.length > 1) {
      nextIdx = (nextIdx + 1) % tipsList.length;
    }
    setActiveTipIndex(nextIdx);
  };

  const togglePopup = () => {
    const nextState = !showPopup;
    setShowPopup(nextState);
    if (nextState) {
      // Pick a fresh random tip of the moment upon opening
      const randTip = tipsList[Math.floor(Math.random() * tipsList.length)];
      setPopupTip(randTip);
    }
  };

  const activeTip = tipsList[activeTipIndex];

  if (!activeTip) return null;

  return (
    <div className="relative mt-8">
      {/* 1. Main Inline Tips Card (Gamified Theme Card) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/10 via-[#0c1328]/80 to-purple-900/10 border border-blue-500/20 shadow-2xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom duration-500 select-none">
        
        {/* Glow Effects */}
        <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-blue-500/10 blur-xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-24 h-24 rounded-full bg-purple-500/10 blur-xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 shadow-lg shadow-blue-500/5 animate-pulse">
              <Sparkles size={18} />
            </div>
            <div>
              <span className="block text-[10px] font-black uppercase tracking-wider text-blue-400">Nextsem Scholar Tips</span>
              <h3 className="text-sm font-black text-white flex items-center gap-1">
                Developer Tip of the Lesson
              </h3>
            </div>
          </div>

          <button
            onClick={shuffleTip}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 hover:bg-slate-700/80 text-[10px] font-black uppercase text-slate-350 hover:text-white transition-all duration-300 cursor-pointer shadow-md active:scale-95"
          >
            <Shuffle size={12} />
            Shuffle Next Tip
          </button>
        </div>

        {/* Tip Content Area */}
        <div className="flex gap-4 items-start">
          <span className="text-4xl filter drop-shadow-md select-none">{activeTip.icon}</span>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-[9px] font-bold uppercase tracking-wider text-blue-400">
                {activeTip.category}
              </span>
              {activeTip.tags?.map((tag) => (
                <span key={tag} className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                  #{tag}
                </span>
              ))}
            </div>
            <h4 className="text-sm font-black text-white">{activeTip.title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-bold">
              {activeTip.text}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Floating Toggle Button (💡 Icon) */}
      <button
        onClick={togglePopup}
        className="fixed bottom-24 right-6 z-[9999] w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white flex items-center justify-center shadow-xl border border-blue-400/30 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 group shadow-blue-500/20"
        title="Toggle Scholar Tip of the Moment"
      >
        <span className="text-xl animate-bounce select-none">💡</span>
        <span className="absolute right-14 bg-slate-900 border border-slate-700/60 text-white text-[9px] font-black uppercase tracking-wider py-1.5 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md">
          💡 Scholar Tip of the Moment
        </span>
      </button>

      {/* 3. Floating Pop-up Toast (Slides in bottom right, positioned above the toggle button) */}
      {showPopup && popupTip && (
        <div className="fixed bottom-40 right-6 z-[9999] max-w-sm w-full bg-[#070c1a]/95 border border-blue-500/30 shadow-2xl rounded-2xl p-4 flex gap-3 animate-in slide-in-from-bottom-12 duration-500 select-none backdrop-blur-md">
          <div className="text-2xl shrink-0 select-none">{popupTip.icon}</div>
          <div className="space-y-1 pr-4">
            <span className="block text-[8px] font-black uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
              <Sparkles size={8} className="animate-spin duration-[4000]" />
              Tip of the Moment
            </span>
            <h5 className="text-xs font-black text-white leading-tight">{popupTip.title}</h5>
            <p className="text-[10px] text-slate-400 leading-relaxed font-bold">
              {popupTip.text}
            </p>
          </div>

          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-2 right-2 text-slate-500 hover:text-white transition-colors cursor-pointer"
            aria-label="Close notification"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
