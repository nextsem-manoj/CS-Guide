"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Terminal, Folder, Settings, Power, CheckCircle, Sparkles, AlertCircle } from "lucide-react";

// Helper function to render authentic Windows 11 style Fluent SVG icons
const getAppIcon = (name: string, size = 20) => {
  switch (name.toLowerCase()) {
    case "edge":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="15" fill="#0c1d3c" stroke="#102a5c" strokeWidth="1" />
          <path d="M16 4c6.6 0 12 5.4 12 12s-5.4 12-12 12c-5 0-9.2-3.1-10.9-7.5l6-3.5c1-1.7 2.8-2.5 4.9-2.5h3v-2.5h-3c-3 0-5.5 1.5-6.9 3.8L5.1 12.5C6.8 7.5 11 4 16 4z" fill="#00E5FF" />
          <path d="M5.1 12.5c1.7-5 5.9-8.5 10.9-8.5v8c-1.5 0-2.8.7-3.6 1.8l-7.3-1.3z" fill="#00B0FF" />
          <path d="M28 16c0 6.6-5.4 12-12 12v-8c1.5 0 2.8-.7 3.6-1.8l8.4-2.2z" fill="#00E676" />
        </svg>
      );
    case "word":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <rect x="4" y="2" width="24" height="28" rx="4" fill="#1B365D" />
          <rect x="2" y="8" width="16" height="16" rx="3" fill="#0078D4" />
          <path d="M5 12L7.5 20L10 12M10 12L12.5 20L15 12" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "store":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <path d="M8 8V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v2" stroke="#888" strokeWidth="2" fill="none" />
          <rect x="4" y="8" width="24" height="20" rx="3" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1" />
          <rect x="9" y="13" width="6" height="6" fill="#F25022" />
          <rect x="17" y="13" width="6" height="6" fill="#7FBA00" />
          <rect x="9" y="21" width="6" height="6" fill="#00A4EF" />
          <rect x="17" y="21" width="6" height="6" fill="#FFB900" />
        </svg>
      );
    case "settings":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="7" fill="#4B5563" />
          <circle cx="16" cy="16" r="6" stroke="#FFFFFF" strokeWidth="3" />
          <path d="M16 4v3M16 25v3M4 16h3M25 16h3M7.5 7.5l2.1 2.1M22.4 22.4l2.1 2.1M7.5 24.5l2.1-2.1M22.4 9.6l2.1-2.1" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "notepad":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <rect x="4" y="2" width="24" height="28" rx="4" fill="#ECEFF1" stroke="#CFD8DC" strokeWidth="1" />
          <path d="M4 8h24M8 13h16M8 18h16M8 23h10" stroke="#78909C" strokeWidth="2" strokeLinecap="round" />
          <path d="M22 2v6h6" fill="none" stroke="#BDBDBD" strokeWidth="1.5" />
          <rect x="3" y="2" width="2" height="28" fill="#FF5252" />
        </svg>
      );
    case "command prompt":
    case "cmd":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="7" fill="#1E1E1E" />
          <rect x="1" y="1" width="30" height="30" rx="6" stroke="#434343" strokeWidth="1.5" />
          <path d="M8 10L14 15L8 20" stroke="#39FF14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="15" y1="20" x2="23" y2="20" stroke="#39FF14" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "photos":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="7" fill="#0288D1" />
          <circle cx="22" cy="10" r="3" fill="#FFEB3B" />
          <path d="M4 28l8-10l6 8l10-14l4 8v8H4z" fill="#00C853" />
          <path d="M4 28l6-8l6 8H4z" fill="#00E676" />
        </svg>
      );
    case "calculator":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="7" fill="#455A64" />
          <rect x="4" y="4" width="24" height="6" rx="1.5" fill="#ECEFF1" />
          <rect x="4" y="13" width="5" height="4" rx="1" fill="#90A4AE" />
          <rect x="11" y="13" width="5" height="4" rx="1" fill="#90A4AE" />
          <rect x="18" y="13" width="5" height="4" rx="1" fill="#90A4AE" />
          <rect x="25" y="13" width="3" height="4" rx="1" fill="#FF9800" />
          <rect x="4" y="19" width="5" height="4" rx="1" fill="#90A4AE" />
          <rect x="11" y="19" width="5" height="4" rx="1" fill="#90A4AE" />
          <rect x="18" y="19" width="5" height="4" rx="1" fill="#90A4AE" />
          <rect x="25" y="19" width="3" height="4" rx="1" fill="#FF9800" />
          <rect x="4" y="25" width="12" height="4" rx="1" fill="#90A4AE" />
          <rect x="18" y="25" width="5" height="4" rx="1" fill="#90A4AE" />
          <rect x="25" y="25" width="3" height="4" rx="1" fill="#FF9800" />
        </svg>
      );
    case "file explorer":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <path d="M2 8a3 3 0 0 1 3-3h6.586a1 1 0 0 1 .707.293L15 8h12a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8z" fill="#FFA000" />
          <path d="M2 11.5V24a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V11.5H2z" fill="#FFCA28" />
          <rect x="6" y="9" width="20" height="6" rx="1" fill="#0288D1" opacity="0.8" />
        </svg>
      );
    case "pc":
    case "this pc":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <rect x="2" y="4" width="28" height="18" rx="2" fill="#0078D4" />
          <rect x="4" y="6" width="24" height="14" fill="#EAEAEA" />
          <path d="M12 22h8l2 5H10l2-5z" fill="#757575" />
          <rect x="8" y="27" width="16" height="2" rx="1" fill="#424242" />
        </svg>
      );
    default:
      return <span>📁</span>;
  }
};

export default function StartMenuGuide() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: Click start, 2: Type/Select cmd, 3: Open terminal (success)
  const [glowStart, setGlowStart] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (menuOpen && step === 1) {
      setStep(2);
      setGlowStart(false);
      // Auto-focus search input
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [menuOpen, step]);

  const handleStartClick = () => {
    setMenuOpen(!menuOpen);
    if (terminalOpen) {
      // Reset
      setTerminalOpen(false);
      setSearchQuery("");
      setStep(1);
      setGlowStart(true);
    }
  };

  const handleAppClick = (appName: string) => {
    if (appName.toLowerCase() === "command prompt" || appName.toLowerCase() === "cmd") {
      setTerminalOpen(true);
      setMenuOpen(false);
      setStep(3);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.toLowerCase().includes("cmd") || val.toLowerCase().includes("comm")) {
      // Ready for user to click Command Prompt
    }
  };

  const resetSimulator = () => {
    setMenuOpen(false);
    setSearchQuery("");
    setTerminalOpen(false);
    setStep(1);
    setGlowStart(true);
  };

  // Simulated list of pinned apps (no colors/emojis needed, handled by getAppIcon)
  const pinnedApps = [
    { name: "Edge", isTarget: false },
    { name: "Word", isTarget: false },
    { name: "Store", isTarget: false },
    { name: "Settings", isTarget: false },
    { name: "Notepad", isTarget: false },
    { name: "Command Prompt", isTarget: true },
    { name: "Photos", isTarget: false },
    { name: "Calculator", isTarget: false },
  ];

  return (
    <div className="my-8 rounded-3xl border-2 border-slate-800 bg-[#090e1c] shadow-2xl overflow-hidden select-none font-sans relative">
      
      {/* ── HEADER / STEP INSTRUCTIONS ── */}
      <div className="p-3.5 sm:p-4 bg-slate-900/90 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 relative z-30">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39ff14] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39ff14]" />
          </span>
          <div className="min-w-0">
            <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Simulation Drill</h4>
            <h3 className="text-xs sm:text-sm font-black text-white mt-0.5 truncate">Windows 11 Start Menu Drill</h3>
          </div>
        </div>

        {/* Step Badge & Instruction */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-[#39ff14]/10 text-[#39ff14] border border-[#39ff14]/20 shrink-0">
            Step {step} of 3
          </span>
          <p className="text-[11px] sm:text-xs font-bold text-slate-350 leading-tight">
            {step === 1 && "Click the Windows Start Button ⊞ on the taskbar below."}
            {step === 2 && "Type 'cmd' in search or click the 'Command Prompt' icon."}
            {step === 3 && "Success! Review terminal. Click Start again to reset."}
          </p>
        </div>
      </div>

      {/* ── MAIN VIRTUAL DESKTOP SCREEN ── */}
      <div className="relative w-full min-h-[385px] sm:min-h-[420px] md:min-h-0 md:aspect-[16/9] overflow-hidden flex flex-col justify-end bg-gradient-to-br from-[#0c102b] via-[#101438] to-[#1c183a]">
        
        {/* Abstract Windows 11-style Bloom Wallpaper graphic */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,183,255,0.18)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.1)_0%,transparent_50%)] pointer-events-none" />
        
        {/* Floating Desktop icons */}
        <div className="absolute top-6 left-6 flex flex-col gap-5">
          <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/5 active:scale-95 transition-all cursor-pointer w-16 text-center">
            <div className="w-9 h-9 flex items-center justify-center filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
              {getAppIcon("this pc", 32)}
            </div>
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-wide mt-1">This PC</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/5 active:scale-95 transition-all cursor-pointer w-16 text-center">
            <div className="w-9 h-9 flex items-center justify-center filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
              {getAppIcon("file explorer", 32)}
            </div>
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-wide mt-1">Nextsem</span>
          </div>
        </div>

        {/* ── POPUP: SIMULATED COMMAND PROMPT WINDOW ── */}
        {terminalOpen && (
          <div className="absolute inset-x-2 sm:inset-x-6 top-2 sm:top-6 bottom-16 sm:bottom-20 bg-[#090d16] border-2 border-slate-700/80 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 z-10">
            {/* Terminal Title Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-slate-400" />
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-350">Command Prompt (Administrator)</span>
              </div>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/30" />
                <button 
                  onClick={resetSimulator}
                  className="w-2.5 h-2.5 rounded-full bg-red-500 hover:bg-red-400 border border-red-500 transition-colors"
                  title="Close Terminal"
                />
              </div>
            </div>
            
            {/* Terminal Window Content */}
            <div className="p-4 font-mono text-[11px] sm:text-xs text-green-400 flex-1 space-y-3 overflow-y-auto">
              <p className="text-slate-450">Microsoft Windows [Version 10.0.22631.3296]<br />(c) Microsoft Corporation. All rights reserved.</p>
              <div className="space-y-1.5 pt-2">
                <p className="text-[#39ff14]">C:\Users\Student&gt; _</p>
                <div className="mt-4 p-4 bg-slate-950/60 border border-emerald-500/20 rounded-xl max-w-md animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <h5 className="font-sans font-black text-[#39ff14] text-xs uppercase tracking-wide flex items-center gap-1.5">
                    <CheckCircle size={14} /> Lesson Pre-requisite Complete!
                  </h5>
                  <p className="font-sans text-[10px] sm:text-xs text-slate-300 mt-1.5 leading-relaxed">
                    You&apos;ve successfully launched the terminal via the Start Menu. In the next section, you&apos;ll learn how to type commands like <code className="bg-slate-900 border border-slate-800 text-yellow-400 px-1 py-0.5 rounded font-mono">dir</code> and <code className="bg-slate-900 border border-slate-800 text-yellow-400 px-1 py-0.5 rounded font-mono">cd</code> to explore directories.
                  </p>
                  <button 
                    onClick={resetSimulator}
                    className="font-sans mt-3 px-3 py-1.5 bg-[#39ff14] hover:bg-[#2ebd10] text-black font-black rounded-lg text-[9px] uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Reset Simulation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── POPUP: SIMULATED WINDOWS 11 START MENU ── */}
        {menuOpen && !terminalOpen && (
          <div className="absolute bottom-14 sm:bottom-16 left-1/2 -translate-x-1/2 w-[94%] max-w-[340px] sm:max-w-[420px] bg-slate-950/90 border border-slate-800/80 rounded-3xl p-3.5 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.5)] backdrop-blur-md flex flex-col gap-3 sm:gap-4 animate-in slide-in-from-bottom-10 duration-200 z-20">
            
            {/* Search Input Box */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Type here to search (e.g. 'cmd' or 'prompt')..."
                className="w-full bg-slate-900 hover:bg-slate-850 focus:bg-slate-900 border border-slate-800/80 rounded-2xl pl-10 pr-4 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-[#39ff14]/30 transition-all placeholder-slate-500"
              />
            </div>

            {/* Filtered Search Results View */}
            {searchQuery ? (
              <div className="flex-1 min-h-[180px] space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Best Match</span>
                {(searchQuery.toLowerCase().includes("c") || searchQuery.toLowerCase().includes("t")) ? (
                  <button
                    onClick={() => handleAppClick("Command Prompt")}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#39ff14]/5 hover:bg-[#39ff14]/10 border border-[#39ff14]/20 hover:border-[#39ff14]/40 transition-all cursor-pointer text-left relative"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                        {getAppIcon("command prompt", 32)}
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-200">Command Prompt</h4>
                        <span className="text-[9px] text-[#39ff14] font-black uppercase tracking-wide">System Application</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase text-[#39ff14] tracking-widest mr-8">Click to Open</span>
                    
                    {/* Floating hand pointer for search results */}
                    {step === 2 && (
                      <div className="absolute top-1/2 -translate-y-1/2 right-4 animate-bounce pointer-events-none text-2xl filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] z-30">
                        👈
                      </div>
                    )}
                  </button>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-6 text-slate-500">
                    <AlertCircle size={24} className="stroke-[1.5] mb-2" />
                    <p className="text-xs font-bold">No results found for &quot;{searchQuery}&quot;</p>
                    <p className="text-[10px] text-slate-650 mt-0.5">Try searching for &quot;cmd&quot; or &quot;command prompt&quot;.</p>
                  </div>
                )}
              </div>
            ) : (
              // Standard Pinned Apps Grid View
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Pinned</span>
                  <span className="text-[10px] font-black px-2 py-0.5 bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-400 cursor-pointer">All apps</span>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  {pinnedApps.map((app, i) => (
                    <button
                      key={i}
                      onClick={() => handleAppClick(app.name)}
                      className={`flex flex-col items-center p-2 rounded-xl hover:bg-white/5 active:scale-95 transition-all text-center cursor-pointer relative ${
                        app.isTarget && step === 2 ? "ring-2 ring-[#39ff14] ring-offset-2 ring-offset-slate-950 bg-[#39ff14]/5" : ""
                      }`}
                    >
                      <div className="w-9 h-9 flex items-center justify-center filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                        {getAppIcon(app.name, 28)}
                      </div>
                      <span className="text-[9px] font-extrabold text-slate-300 mt-1 truncate w-full leading-tight">{app.name}</span>
                      
                      {/* Floating hand pointer for Step 2 */}
                      {app.isTarget && step === 2 && (
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none text-2xl filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] z-30">
                          👇
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Panel (User / Power controls) */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-900 text-slate-400">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-350">
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs">🎓</div>
                <span>Dev Student</span>
              </div>
              <button 
                onClick={resetSimulator}
                className="p-1.5 rounded-lg hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
                title="Shut Down Simulator"
              >
                <Power size={13} />
              </button>
            </div>

          </div>
        )}

        {/* ── TASKBAR ── */}
        <div className="w-full h-12 bg-slate-950/70 border-t border-slate-900/80 backdrop-blur-md flex items-center justify-between px-4 z-20">
          
          {/* Left space (e.g. widgets stub) */}
          <div className="w-12 hidden sm:flex items-center text-[10px] text-slate-400 font-bold">
            ⛅ 24°C
          </div>

          {/* Centered Taskbar Icons (Windows 11 alignment) */}
          <div className="flex items-center gap-1.5 mx-auto">
            {/* Start Button */}
            <button
              onClick={handleStartClick}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer hover:bg-white/10 active:scale-90 relative ${
                menuOpen ? "bg-white/10" : ""
              } ${glowStart ? "animate-pulse ring-2 ring-[#39ff14]/50 shadow-[0_0_15px_rgba(57,255,20,0.3)] bg-slate-900/50" : ""}`}
              title="Start Button"
            >
              {/* Windows 11 Logo SVG with rounded corners */}
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <rect x="0" y="0" width="7.1" height="7.1" rx="0.8" fill="#0078D4" />
                <rect x="8.9" y="0" width="7.1" height="7.1" rx="0.8" fill="#0078D4" />
                <rect x="0" y="8.9" width="7.1" height="7.1" rx="0.8" fill="#0078D4" />
                <rect x="8.9" y="8.9" width="7.1" height="7.1" rx="0.8" fill="#0078D4" />
              </svg>

              {/* Floating hand pointer for Step 1 */}
              {step === 1 && glowStart && (
                <div className="absolute -top-9 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none text-2xl z-30 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]">
                  👇
                </div>
              )}
            </button>

            {/* Search Icon */}
            <button 
              onClick={() => { setMenuOpen(true); }}
              className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors text-slate-350 cursor-pointer"
            >
              <Search size={14} />
            </button>

            {/* Simulated Desktop / File Explorer App Icons */}
            <div className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors" title="File Explorer">
              {getAppIcon("file explorer", 20)}
            </div>
            <div className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors" title="Microsoft Edge">
              {getAppIcon("edge", 20)}
            </div>
            <div className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors" title="Settings">
              {getAppIcon("settings", 20)}
            </div>
          </div>

          {/* Right space (System tray tray/time stub) */}
          <div className="w-12 text-right hidden sm:flex flex-col justify-center text-[9px] font-extrabold text-slate-400 tracking-wider">
            <span>ENG US</span>
            <span className="text-slate-500">03:14 AM</span>
          </div>

        </div>

      </div>

      {/* ── FOOTER / TIPS ── */}
      <div className="p-4 bg-slate-900/40 border-t border-slate-800 flex items-start gap-2.5 text-xs text-slate-400">
        <Sparkles className="text-amber-400 shrink-0 mt-0.5" size={14} />
        <div>
          <span className="text-white font-black uppercase text-[10px] tracking-wider block">PRO TIP FOR BEGINNERS</span>
          <p className="mt-0.5 leading-relaxed">
            In physical Windows 11 systems, you can also launch the terminal instantly by right-clicking the Start Menu button and selecting <strong>Terminal</strong>, or by holding down <strong>Windows Key + R</strong>, typing <code>cmd</code>, and pressing Enter.
          </p>
        </div>
      </div>

    </div>
  );
}
