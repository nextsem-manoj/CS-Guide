"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from "react";
import { Code2, Terminal, FileCode, Wifi, Database, Play, AlertCircle, PlayCircle, Trash2, ArrowRight } from "lucide-react";

type DevToolsTab = "elements" | "console" | "sources" | "network" | "application";

export default function TabbedDevTools() {
  const [activeTab, setActiveTab] = useState<DevToolsTab>("elements");

  // Elements panel state
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  // Console panel states
  const [consoleLogs, setConsoleLogs] = useState<Array<{ type: "log" | "error" | "table" | "group" | "time"; data: any }>>([
    { type: "log", data: "DevTools Console Initialized. Click commands above to execute." }
  ]);

  // Sources panel states
  const [breakpoints, setBreakpoints] = useState<Set<number>>(new Set([5]));
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Network panel states
  const [throttling, setThrottling] = useState<"none" | "fast" | "slow">("none");
  const [networkRequests, setNetworkRequests] = useState<Array<{ name: string; status: number | string; type: string; size: string; time: string }>>([
    { name: "index.html", status: 200, type: "document", size: "1.2 KB", time: "12ms" },
    { name: "styles.css", status: 200, type: "stylesheet", size: "4.8 KB", time: "24ms" }
  ]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  // Application storage states
  const [storageItems, setStorageItems] = useState<Array<{ key: string; value: string }>>([
    { key: "nextsem_theme", value: "dark" },
    { key: "user_xp", value: "3200" },
    { key: "completed_lesson_p0.4", value: "true" }
  ]);

  // Console helper commands
  const runConsoleCmd = (cmd: "table" | "group" | "time" | "error" | "clear") => {
    if (cmd === "clear") {
      setConsoleLogs([]);
      return;
    }
    
    let newLog: { type: "log" | "error" | "table" | "group" | "time"; data: any };

    if (cmd === "table") {
      newLog = {
        type: "table",
        data: [
          { name: "Aman", role: "Frontend", level: 1 },
          { name: "Rahul", role: "Backend", level: 2 },
          { name: "Manoj", role: "Fullstack", level: 3 }
        ]
      };
    } else if (cmd === "group") {
      newLog = {
        type: "group",
        data: {
          title: "User Profile details (Grouped)",
          items: ["Name: Nextsem", "Status: Certified", "XP: 3,200", "Gems: 45"]
        }
      };
    } else if (cmd === "time") {
      newLog = {
        type: "time",
        data: "Database Fetch timer started... complete in 1.45ms"
      };
    } else {
      newLog = {
        type: "error",
        data: "Uncaught ReferenceError: devtoolsMastered is not defined at <anonymous>:1:1"
      };
    }

    setConsoleLogs((prev) => [...prev, newLog]);
  };

  // Trigger breakpoint execution simulation
  const toggleBreakpoint = (lineNum: number) => {
    setBreakpoints((prev) => {
      const next = new Set(prev);
      if (next.has(lineNum)) next.delete(lineNum);
      else next.add(lineNum);
      return next;
    });
  };

  // Network fetching simulator
  const simulateFetch = () => {
    if (isFetching) return;
    setIsFetching(true);
    
    const newReqId = networkRequests.length + 1;
    const reqName = `api/get-user-data.json?v=${newReqId}`;
    
    setNetworkRequests((prev) => [
      ...prev,
      { name: reqName, status: "pending", type: "fetch", size: "pending", time: "pending" }
    ]);

    const delay = throttling === "slow" ? 3000 : throttling === "fast" ? 1000 : 150;

    setTimeout(() => {
      setNetworkRequests((prev) => 
        prev.map((r) => 
          r.name === reqName 
            ? { name: reqName, status: 200, type: "fetch", size: "524 B", time: `${delay}ms` } 
            : r
        )
      );
      setIsFetching(false);
    }, delay);
  };

  // Add storage key
  const addStorageItem = () => {
    const keys = ["user_email", "nextsem_completed", "active_session", "dev_setup"];
    const vals = ["manoj@nextsem.online", "true", "auth_token_941a", "completed"];
    const idx = Math.floor(Math.random() * keys.length);
    
    if (storageItems.some((item) => item.key === keys[idx])) return;
    
    setStorageItems((prev) => [...prev, { key: keys[idx], value: vals[idx] }]);
  };

  // Delete storage key
  const deleteStorageItem = (keyToDelete: string) => {
    setStorageItems((prev) => prev.filter((item) => item.key !== keyToDelete));
  };

  return (
    <div className="my-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#0c111d] shadow-2xl overflow-hidden text-slate-350 select-none">
      
      {/* ── Mockup Browser/Window Top Frame ── */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#141b2d] border-b border-slate-800">
        <div className="flex items-center gap-2">
          {/* Windows Mac dots */}
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] font-black text-slate-500 ml-2 font-mono">
            Chrome DevTools - localhost:3000
          </span>
        </div>
        
        {/* Active Throttling Indicator Badge */}
        {throttling !== "none" && (
          <span className="text-[9px] font-black uppercase bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 animate-pulse">
            ⚠️ Network Throttled ({throttling})
          </span>
        )}
      </div>

      {/* ── Tabs Navigation Bar ── */}
      <div className="border-b border-slate-800 bg-[#101625] p-1.5 transition-colors">
        {/* Desktop View tab bar */}
        <div className="hidden sm:flex gap-1">
          {[
            { id: "elements", label: "Elements", icon: Code2 },
            { id: "console", label: "Console", icon: Terminal },
            { id: "sources", label: "Sources", icon: FileCode },
            { id: "network", label: "Network", icon: Wifi },
            { id: "application", label: "Application", icon: Database }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as DevToolsTab)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all active:scale-95 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#04aa6d] text-white shadow-md shadow-emerald-500/15"
                    : "text-slate-450 hover:text-slate-200 hover:bg-slate-800/40"
                }`}
              >
                <Icon size={14} className={isActive ? "text-white" : "text-slate-450"} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile View Tabbed Dropdown (replaces scrolling tabs) */}
        <div className="flex sm:hidden w-full max-w-[200px] relative">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as DevToolsTab)}
            className="w-full bg-[#0d1220] border border-slate-800 rounded-xl px-3.5 py-1.5 text-xs font-black text-slate-200 focus:outline-none appearance-none cursor-pointer pr-8"
          >
            <option value="elements">🖥️ Elements</option>
            <option value="console">💻 Console</option>
            <option value="sources">⚙️ Sources</option>
            <option value="network">📡 Network</option>
            <option value="application">💾 Application</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-400">
            <span className="text-[8px]">▼</span>
          </div>
        </div>
      </div>

      {/* ── Active Panel Display Area ── */}
      <div className="p-4 bg-[#090d16] min-h-[280px] font-mono text-[11px] leading-relaxed">

        {/* ── ELEMENTS PANEL MOCKUP ── */}
        {activeTab === "elements" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-in fade-in duration-200">
            {/* HTML Inspector Pane */}
            <div className="p-3 bg-[#0d1220] border border-slate-800 rounded-xl overflow-x-auto">
              <div className="text-[9px] font-black uppercase text-slate-500 tracking-wider mb-2">
                📂 DOM Tree (HTML)
              </div>
              <div className="space-y-1">
                <div className="text-slate-500">&lt;!DOCTYPE html&gt;</div>
                <div className="text-[#3b82f6]">&lt;<span className="text-[#e2e8f0]">html</span> <span className="text-amber-500">lang</span>=&quot;<span className="text-[#10b981]">en</span>&quot;&gt;</div>
                <div className="pl-3 text-[#3b82f6]">&lt;<span className="text-[#e2e8f0]">head</span>&gt;...&lt;/<span className="text-[#e2e8f0]">head</span>&gt;</div>
                <div className="pl-3 text-[#3b82f6]">
                  &lt;<span className="text-[#e2e8f0]">body</span>&gt;
                </div>
                
                {/* Interactive Div block */}
                <div 
                  className={`pl-6 py-1 rounded-lg transition-all cursor-pointer ${
                    hoveredElement === "root" ? "bg-blue-500/10 border border-blue-500/30 text-white" : "border border-transparent"
                  }`}
                  onMouseEnter={() => setHoveredElement("root")}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  <span className="text-[#3b82f6]">&lt;</span>
                  <span className="text-[#e2e8f0]">div</span>{" "}
                  <span className="text-amber-400">id</span>=&quot;<span className="text-[#10b981]">root</span>&quot;{" "}
                  <span className="text-amber-400">class</span>=&quot;<span className="text-[#10b981]">bg-slate-950 p-6</span>&quot;
                  <span className="text-[#3b82f6]">&gt;</span>
                </div>
 
                {/* Interactive H1 block */}
                <div 
                  className={`pl-9 py-1 rounded-lg transition-all cursor-pointer ${
                    hoveredElement === "h1" ? "bg-blue-500/10 border border-blue-500/30 text-white" : "border border-transparent"
                  }`}
                  onMouseEnter={() => setHoveredElement("h1")}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  <span className="text-[#3b82f6]">&lt;</span>
                  <span className="text-[#e2e8f0]">h1</span>{" "}
                  <span className="text-amber-400">class</span>=&quot;<span className="text-[#10b981]">text-amber-500</span>&quot;
                  <span className="text-[#3b82f6]">&gt;</span>
                  <span className="text-white font-bold">Nextsem Academy</span>
                  <span className="text-[#3b82f6]">&lt;/</span>
                  <span className="text-[#e2e8f0]">h1</span>
                  <span className="text-[#3b82f6]">&gt;</span>
                </div>
 
                {/* Interactive P block */}
                <div 
                  className={`pl-9 py-1 rounded-lg transition-all cursor-pointer ${
                    hoveredElement === "p" ? "bg-blue-500/10 border border-blue-500/30 text-white" : "border border-transparent"
                  }`}
                  onMouseEnter={() => setHoveredElement("p")}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  <span className="text-[#3b82f6]">&lt;</span>
                  <span className="text-[#e2e8f0]">p</span>{" "}
                  <span className="text-amber-400">class</span>=&quot;<span className="text-[#10b981]">text-slate-400</span>&quot;
                  <span className="text-[#3b82f6]">&gt;</span>
                  <span className="text-slate-350">Master DevTools!</span>
                  <span className="text-[#3b82f6]">&lt;/</span>
                  <span className="text-[#e2e8f0]">p</span>
                  <span className="text-[#3b82f6]">&gt;</span>
                </div>

                <div className="pl-6 text-[#3b82f6]">&lt;/<span className="text-[#e2e8f0]">div</span>&gt;</div>
                <div className="pl-3 text-[#3b82f6]">&lt;/<span className="text-[#e2e8f0]">body</span>&gt;</div>
                <div className="text-slate-500">&lt;/html&gt;</div>
              </div>
              <div className="mt-3 text-[9px] text-slate-500 italic pl-1">
                💡 Hover over the tags above to see matching styles in the right panel.
              </div>
            </div>

            {/* CSS styles inspector panel */}
            <div className="p-3 bg-[#0d1220] border border-slate-800 rounded-xl">
              <div className="text-[9px] font-black uppercase text-slate-500 tracking-wider mb-2">
                🎨 Styles (CSS Editor)
              </div>
              
              <div className="space-y-4">
                {/* Root Styles */}
                <div className={`p-2 rounded-xl transition-all ${hoveredElement === "root" ? "bg-blue-600/10 border border-blue-500/20" : "border border-transparent"}`}>
                  <div className="text-[#10b981]">#root <span className="text-slate-400">{"{"}</span></div>
                  <div className="pl-4 text-purple-400">background-color: <span className="text-slate-300">#020617;</span></div>
                  <div className="pl-4 text-purple-400">padding: <span className="text-slate-300">24px;</span></div>
                  <div className="text-slate-400">{"}"}</div>
                </div>

                {/* H1 Styles */}
                <div className={`p-2 rounded-xl transition-all ${hoveredElement === "h1" ? "bg-blue-600/10 border border-blue-500/20" : "border border-transparent"}`}>
                  <div className="text-[#10b981]">h1.text-amber-500 <span className="text-slate-400">{"{"}</span></div>
                  <div className="pl-4 text-purple-400">color: <span className="text-slate-300">#f59e0b; /* Amber */</span></div>
                  <div className="pl-4 text-purple-400">font-weight: <span className="text-slate-300">900;</span></div>
                  <div className="text-slate-400">{"}"}</div>
                </div>

                {/* P Styles */}
                <div className={`p-2 rounded-xl transition-all ${hoveredElement === "p" ? "bg-blue-600/10 border border-blue-500/20" : "border border-transparent"}`}>
                  <div className="text-[#10b981]">p.text-slate-400 <span className="text-slate-400">{"{"}</span></div>
                  <div className="pl-4 text-purple-400">color: <span className="text-slate-300">#94a3b8;</span></div>
                  <div className="pl-4 text-purple-400">font-size: <span className="text-slate-300">14px;</span></div>
                  <div className="text-slate-400">{"}"}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── CONSOLE PANEL MOCKUP ── */}
        {activeTab === "console" && (
          <div className="flex flex-col gap-3 animate-in fade-in duration-200">
            {/* Quick command triggers */}
            <div className="flex flex-wrap gap-2 pb-2.5 border-b border-slate-800">
              <button 
                onClick={() => runConsoleCmd("table")}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 hover:border-blue-500/50 rounded-xl text-[10px] font-black text-blue-400 transition-all cursor-pointer"
              >
                <span>📊</span> Run console.table()
              </button>
              <button 
                onClick={() => runConsoleCmd("group")}
                className="flex items-center gap-1 px-3 py-1.5 bg-violet-600/10 hover:bg-violet-600/20 border border-violet-500/30 hover:border-violet-500/50 rounded-xl text-[10px] font-black text-violet-400 transition-all cursor-pointer"
              >
                <span>📁</span> Run console.group()
              </button>
              <button 
                onClick={() => runConsoleCmd("time")}
                className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 hover:border-emerald-500/50 rounded-xl text-[10px] font-black text-emerald-400 transition-all cursor-pointer"
              >
                <span>⏱️</span> Run console.time()
              </button>
              <button 
                onClick={() => runConsoleCmd("error")}
                className="flex items-center gap-1 px-3 py-1.5 bg-rose-600/10 hover:bg-rose-600/20 border border-rose-500/30 hover:border-rose-500/50 rounded-xl text-[10px] font-black text-rose-450 transition-all cursor-pointer"
              >
                <span>⚠️</span> Log Error
              </button>
              <button 
                onClick={() => runConsoleCmd("clear")}
                className="ml-auto flex items-center gap-1 px-2.5 py-1.5 bg-slate-850 hover:bg-slate-800 text-slate-350 hover:text-white rounded-xl text-[10px] font-black transition-all cursor-pointer border border-slate-800"
              >
                <Trash2 size={11} /> Clear
              </button>
            </div>

            {/* Console Log stream output */}
            <div className="p-3 bg-[#05080f] border border-slate-900 rounded-xl space-y-2 min-h-[160px] overflow-y-auto font-mono text-[10px]">
              {consoleLogs.length === 0 ? (
                <div className="text-slate-650 italic">Console is empty. Click one of the buttons above to log output.</div>
              ) : (
                consoleLogs.map((log, i) => (
                  <div key={i} className="animate-in slide-in-from-bottom-2 duration-200">
                    
                    {log.type === "log" && (
                      <div className="text-slate-300 pl-4 relative">
                        <span className="absolute left-0 text-slate-500">&gt;</span>
                        <span>{log.data}</span>
                      </div>
                    )}

                    {log.type === "error" && (
                      <div className="flex gap-2 p-2 bg-rose-950/20 border-l-4 border-rose-500 text-rose-450 rounded-r-lg">
                        <AlertCircle size={13} className="shrink-0 mt-0.5" />
                        <span>{log.data}</span>
                      </div>
                    )}

                    {log.type === "time" && (
                      <div className="text-[#04aa6d] pl-4 relative font-bold">
                        <span className="absolute left-0 text-slate-500">&gt;</span>
                        <span>{log.data}</span>
                      </div>
                    )}

                    {log.type === "group" && (
                      <div className="p-2.5 bg-slate-900/50 border border-slate-850 rounded-xl">
                        <div className="text-slate-300 font-black mb-1 flex items-center gap-1">
                          <span>▼</span> {log.data.title}
                        </div>
                        <div className="pl-4 border-l border-slate-800 space-y-1.5 text-slate-400">
                          {log.data.items.map((item: string, idx: number) => (
                            <div key={idx}>{item}</div>
                          ))}
                        </div>
                      </div>
                    )}

                    {log.type === "table" && (
                      <div className="overflow-x-auto my-1 bg-[#090d16] border border-slate-850 rounded-lg">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-900/90 text-slate-400 border-b border-slate-850 text-[9px] font-bold">
                              <th className="p-2 border-r border-slate-850">(index)</th>
                              <th className="p-2 border-r border-slate-850">name</th>
                              <th className="p-2 border-r border-slate-850">role</th>
                              <th className="p-2">level</th>
                            </tr>
                          </thead>
                          <tbody>
                            {log.data.map((row: any, idx: number) => (
                              <tr key={idx} className="border-b border-slate-900 hover:bg-white/5 text-[9px]">
                                <td className="p-2 border-r border-slate-850 text-slate-500">{idx}</td>
                                <td className="p-2 border-r border-slate-850 text-[#04aa6d] font-bold">&quot;{row.name}&quot;</td>
                                <td className="p-2 border-r border-slate-850 text-amber-500 font-bold">&quot;{row.role}&quot;</td>
                                <td className="p-2 text-indigo-400">{row.level}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ── SOURCES PANEL MOCKUP ── */}
        {activeTab === "sources" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-in fade-in duration-200">
            {/* Left File Navigation List */}
            <div className="lg:col-span-1 p-3 bg-[#0d1220] border border-slate-800 rounded-xl">
              <div className="text-[9px] font-black uppercase text-slate-500 tracking-wider mb-2">
                📁 File Navigator
              </div>
              <div className="space-y-1.5 text-slate-400">
                <div className="text-slate-500 font-bold flex items-center gap-1">
                  📁 <span className="truncate">localhost:3000</span>
                </div>
                <div className="pl-4 text-slate-500 font-bold flex items-center gap-1">
                  📁 <span className="truncate">src</span>
                </div>
                <div className="pl-8 text-blue-400 font-bold flex items-center gap-1 bg-blue-500/5 p-1 rounded">
                  📄 <span className="truncate">index.js</span>
                </div>
                <div className="pl-8 text-slate-400 flex items-center gap-1">
                  📄 <span className="truncate">utils.js</span>
                </div>
              </div>
            </div>

            {/* Middle code editor pane */}
            <div className="lg:col-span-2 p-3 bg-[#0d1220] border border-slate-800 rounded-xl relative">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[9px] font-black uppercase text-slate-500 tracking-wider">
                  📄 index.js (Editor)
                </div>
                {breakpoints.size > 0 && (
                  <span className="text-[8px] font-black uppercase tracking-widest text-[#04aa6d] bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded animate-pulse">
                    Breakpoint Set
                  </span>
                )}
              </div>
              
              <div className="space-y-1 font-mono text-[10px]">
                {[
                  "// Simulated Breakpoint Debugger",
                  "const users = ['Aman', 'Rahul'];",
                  "function verifyUsers() {",
                  "  console.log('Verifying...');",
                  "  users.forEach((user) => {",
                  "    const isMaster = user === 'Rahul';",
                  "    console.log(user, isMaster);",
                  "  });",
                  "}",
                  "verifyUsers();"
                ].map((line, idx) => {
                  const lineNum = idx + 1;
                  const hasBreakpoint = breakpoints.has(lineNum);
                  return (
                    <div key={idx} className="flex items-center group">
                      {/* Clickable Line number area */}
                      <button
                        onClick={() => toggleBreakpoint(lineNum)}
                        className={`w-6 h-5 mr-3 shrink-0 rounded flex items-center justify-center font-bold transition-all relative ${
                          hasBreakpoint 
                            ? "bg-[#04aa6d] text-white" 
                            : "text-slate-500 hover:bg-slate-800 hover:text-slate-200"
                        }`}
                      >
                        {hasBreakpoint ? (
                          <div className="w-2.5 h-2.5 rounded-full bg-white animate-ping absolute" />
                        ) : null}
                        <span>{lineNum}</span>
                      </button>
                      <span className={`flex-1 whitespace-pre ${hasBreakpoint ? "bg-emerald-500/10 text-white font-bold" : "text-slate-350"}`}>
                        {line}
                      </span>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-3.5 text-[9px] text-slate-550 pl-1 leading-relaxed border-t border-slate-800/80 pt-2.5">
                💡 Click on the **line numbers** (e.g. Line 5) to toggle active breakpoints.
              </div>
            </div>
          </div>
        )}

        {/* ── NETWORK PANEL MOCKUP ── */}
        {activeTab === "network" && (
          <div className="flex flex-col gap-3 animate-in fade-in duration-200">
            {/* Toolbar row */}
            <div className="flex flex-wrap items-center gap-3 pb-2.5 border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-450 font-black">Throttling:</span>
                <select 
                  value={throttling}
                  onChange={(e) => setThrottling(e.target.value as "none" | "fast" | "slow")}
                  className="bg-slate-900 text-slate-300 font-bold border border-slate-800 rounded-xl px-2 py-1 text-[10px] focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="none">No throttling</option>
                  <option value="fast">Fast 3G</option>
                  <option value="slow">Slow 3G</option>
                </select>
              </div>

              <button
                onClick={simulateFetch}
                disabled={isFetching}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-[#04aa6d] hover:bg-emerald-600 disabled:bg-emerald-800 text-white rounded-xl text-[10px] font-black shadow transition-all cursor-pointer border border-emerald-500/20"
              >
                <span>🌐</span> {isFetching ? "Loading..." : "Trigger Fetch Request"}
              </button>
            </div>

            {/* Network request table grid */}
            <div className="overflow-x-auto bg-[#05080f] border border-slate-900 rounded-xl">
              <table className="w-full text-left border-collapse text-[10px]">
                <thead>
                  <tr className="bg-slate-900/80 text-slate-400 border-b border-slate-800 text-[9px] font-bold">
                    <th className="p-2 border-r border-slate-800">Name</th>
                    <th className="p-2 border-r border-slate-800">Status</th>
                    <th className="p-2 border-r border-slate-800">Type</th>
                    <th className="p-2 border-r border-slate-800">Size</th>
                    <th className="p-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {networkRequests.map((req, idx) => (
                    <tr 
                      key={idx} 
                      className={`border-b border-slate-900/60 hover:bg-white/5 ${
                        req.status === "pending" ? "text-amber-400" : "text-slate-350"
                      }`}
                    >
                      <td className="p-2 border-r border-slate-800 font-bold truncate max-w-[150px]">{req.name}</td>
                      <td className="p-2 border-r border-slate-800">
                        {req.status === "pending" ? (
                          <span className="inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                            pending
                          </span>
                        ) : (
                          <span className="text-[#04aa6d] font-bold">{req.status}</span>
                        )}
                      </td>
                      <td className="p-2 border-r border-slate-800 text-slate-500 font-semibold">{req.type}</td>
                      <td className="p-2 border-r border-slate-800 text-slate-500 font-semibold">{req.size}</td>
                      <td className="p-2 font-bold">{req.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-[9px] text-slate-550 pl-1">
              💡 Switch Throttling to **Slow 3G** and run fetch to simulate packet lag.
            </div>
          </div>
        )}

        {/* ── APPLICATION STORAGE PANEL MOCKUP ── */}
        {activeTab === "application" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-in fade-in duration-200">
            {/* Storage Navigator tree */}
            <div className="lg:col-span-1 p-3 bg-[#0d1220] border border-slate-800 rounded-xl">
              <div className="text-[9px] font-black uppercase text-slate-500 tracking-wider mb-2">
                📁 Storage Category
              </div>
              
              <div className="space-y-1.5 text-slate-400">
                <div className="text-blue-400 font-bold flex items-center gap-1 bg-blue-500/5 p-1 rounded">
                  📁 <span>Local Storage</span>
                </div>
                <div className="pl-4 text-[#04aa6d] font-medium truncate">
                  ↳ http://localhost:3000
                </div>
                <div className="text-slate-500 flex items-center gap-1">
                  📁 <span>Session Storage</span>
                </div>
                <div className="text-slate-500 flex items-center gap-1">
                  📁 <span>Cookies</span>
                </div>
              </div>
            </div>

            {/* Key Value item viewer list */}
            <div className="lg:col-span-2 p-3 bg-[#0d1220] border border-slate-800 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[9px] font-black uppercase text-slate-500 tracking-wider">
                  🔑 Key Value Registry (Local Storage)
                </div>
                
                <button
                  onClick={addStorageItem}
                  className="px-2.5 py-1 bg-[#10b981]/15 hover:bg-[#10b981]/25 border border-[#10b981]/30 hover:border-[#10b981]/50 text-[#10b981] rounded-lg text-[9px] font-black transition-all cursor-pointer"
                >
                  ➕ Add Key
                </button>
              </div>

              {/* Table list */}
              <div className="overflow-x-auto bg-[#05080f] border border-slate-900 rounded-lg">
                <table className="w-full text-left border-collapse text-[10px]">
                  <thead>
                    <tr className="bg-slate-900 text-slate-400 border-b border-slate-800 text-[9px] font-bold">
                      <th className="p-2 border-r border-slate-800">Key</th>
                      <th className="p-2 border-r border-slate-800">Value</th>
                      <th className="p-2 w-10 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {storageItems.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="p-4 text-center text-slate-655 italic">Storage is empty.</td>
                      </tr>
                    ) : (
                      storageItems.map((item, idx) => (
                        <tr key={idx} className="border-b border-slate-900/60 hover:bg-white/5 text-[9px] text-slate-350">
                          <td className="p-2 border-r border-slate-800 font-bold text-amber-500">&quot;{item.key}&quot;</td>
                          <td className="p-2 border-r border-slate-800 text-cyan-400 font-bold">&quot;{item.value}&quot;</td>
                          <td className="p-2 text-center">
                            <button
                              onClick={() => deleteStorageItem(item.key)}
                              className="text-rose-550 hover:text-rose-400 transition-colors cursor-pointer"
                              title="Delete Item"
                            >
                              <Trash2 size={11} className="mx-auto" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
