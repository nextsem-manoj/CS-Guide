"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Play, Home, RefreshCw, Copy, Check, RotateCcw
} from "lucide-react";

const DEFAULT_HTML = `<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>My First Heading</h1>
<p>My first paragraph.</p>

</body>
</html>`;

const normalizeCode = (raw: string | null): string => {
  if (!raw) return DEFAULT_HTML;
  const trimmed = raw.trim();
  if (trimmed.toLowerCase().includes("<!doctype html>") || trimmed.toLowerCase().includes("<html")) {
    return trimmed;
  }
  // Wrap simple text or snippets inside standard HTML markup
  return `<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>My First Heading</h1>
<p>${trimmed}</p>

</body>
</html>`;
};

export default function HtmlDemoClient() {
  const searchParams = useSearchParams();
  const paramCode = searchParams.get("code");

  const [htmlCode, setHtmlCode] = useState<string>(DEFAULT_HTML);
  const [iframeSrc, setIframeSrc] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [orientation, setOrientation] = useState<"row" | "col">("row");

  // Compile and run code in iframe + save to localStorage
  const runCode = (codeToRun: string) => {
    try {
      localStorage.setItem("nextsem_tryit_saved_code", codeToRun);
    } catch {
      // Ignore quota errors
    }
    setIframeSrc(codeToRun);
  };

  useEffect(() => {
    let initialVal = DEFAULT_HTML;
    if (paramCode) {
      initialVal = normalizeCode(paramCode);
    } else {
      const saved = localStorage.getItem("nextsem_tryit_saved_code");
      if (saved) {
        initialVal = saved;
      }
    }
    setHtmlCode(initialVal);
    runCode(initialVal);
  }, [paramCode]);

  const handleReset = () => {
    const resetVal = normalizeCode(paramCode);
    setHtmlCode(resetVal);
    runCode(resetVal);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-[#0e1726] text-white font-sans overflow-hidden">
      {/* ── NEXTSEM ACADEMY TRYIT TOP BAR (Matching Image 80 & Image 82) ── */}
      <header className="h-14 bg-[#16222f] border-b border-slate-800 flex items-center justify-between px-3 md:px-5 shrink-0 z-20">
        {/* Left Toolbar Icons */}
        <div className="flex items-center gap-2 md:gap-3">
          <Link
            href="/html"
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Home - Back to HTML Lessons"
          >
            <Home size={18} />
          </Link>

          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Save / Copy Code"
          >
            {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
          </button>

          {/* Screen Rotation / Layout Toggle Button (Matching Image 82) */}
          <button
            onClick={() => setOrientation((prev) => (prev === "row" ? "col" : "row"))}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Rotate Screen / Change Layout Direction"
          >
            <RotateCcw size={18} className="transition-transform duration-300 active:rotate-180" />
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer hidden sm:flex"
            title="Reset Code"
          >
            <RefreshCw size={18} />
          </button>
        </div>

        {/* Right Main Action (Nextsem Academy Green Run ❯ Button Only - Image 80) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => runCode(htmlCode)}
            className="px-6 py-2 bg-[#04AA6D] hover:bg-[#039861] text-white font-extrabold text-sm md:text-base rounded-lg transition-all flex items-center gap-2 shadow-md hover:shadow-[#04AA6D]/30 active:scale-95 cursor-pointer"
          >
            <span>Run</span>
            <Play size={15} className="fill-white" />
          </button>
        </div>
      </header>

      {/* ── SPLIT WORKSPACE: 2-COLUMN SIDE-BY-SIDE VIEW (Image 80) ── */}
      <div className={`flex-1 flex ${orientation === "row" ? "flex-col md:flex-row" : "flex-col"} overflow-hidden relative`}>
        {/* Left Column: Code Editor */}
        <div className={`${orientation === "row" ? "w-full md:w-1/2 h-1/2 md:h-full" : "w-full h-1/2"} bg-[#15202b] border-r border-slate-800 flex flex-col relative overflow-hidden`}>
          <div className="bg-[#121b24] px-4 py-2 border-b border-slate-800 text-xs font-mono font-bold text-slate-400 flex items-center justify-between">
            <span>index.html</span>
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">HTML5 Editor</span>
          </div>

          <textarea
            value={htmlCode}
            onChange={(e) => setHtmlCode(e.target.value)}
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            className="w-full flex-1 bg-[#15202b] text-slate-100 font-mono text-sm md:text-base p-4 outline-none resize-none leading-relaxed border-none focus:ring-0"
            style={{ caretColor: "#04AA6D" }}
          />
        </div>

        {/* Right Column: Live Output Preview (Standard Viewport matching Image 80) */}
        <div className={`${orientation === "row" ? "w-full md:w-1/2 h-1/2 md:h-full" : "w-full h-1/2"} bg-white flex flex-col relative overflow-hidden`}>
          <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 text-xs font-mono font-bold text-slate-600 flex items-center justify-between">
            <span>Result Preview</span>
            <span className="text-[10px] text-emerald-600 font-bold">● Live Render</span>
          </div>

          <iframe
            title="HTML Live Output Preview"
            srcDoc={iframeSrc}
            sandbox="allow-scripts"
            className="w-full flex-1 border-none bg-white"
          />
        </div>
      </div>
    </div>
  );
}
