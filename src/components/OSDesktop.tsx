"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  BookOpen, Terminal as TerminalIcon, Code2, User, HelpCircle, 
  Settings as SettingsIcon, Minimize2, Maximize2, X, LayoutDashboard, 
  Trophy, Wifi, Battery, Calendar, Clock, Monitor, RefreshCw, Languages, Gem, ArrowRight
} from "lucide-react";
import { coursePhases } from "../data/courseData";
import { getChapterUrl } from "../lib/htmlLessonsHelper";
import TabbedOS from "./TabbedOS";

// Define app window interfaces
interface WindowInstance {
  id: string;
  title: string;
  icon: any;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface OSDesktopProps {
  currentUser: { name: string; email: string; photo?: string } | null;
  userXP: number;
  userGems: number;
  onLogout?: () => void;
  onSignIn?: () => void;
}

export default function OSDesktop({ currentUser, userXP, userGems, onLogout, onSignIn }: OSDesktopProps) {
  const router = useRouter();
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [focusedWindow, setFocusedWindow] = useState<string | null>(null);
  const [topZIndex, setTopZIndex] = useState<number>(10);
  const [activeLayout, setActiveLayout] = useState<"desktop" | "classic" | "adventure">("desktop");

  // Track window list
  const [windows, setWindows] = useState<Record<string, WindowInstance>>({
    curriculum: {
      id: "curriculum",
      title: "Course Curriculum Navigator",
      icon: BookOpen,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      x: 40,
      y: 50,
      width: 720,
      height: 480
    },
    terminal: {
      id: "terminal",
      title: "Interactive Simulated Shell",
      icon: TerminalIcon,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 2,
      x: 100,
      y: 120,
      width: 580,
      height: 380
    },
    playground: {
      id: "playground",
      title: "Live Code Playground",
      icon: Code2,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 3,
      x: 140,
      y: 80,
      width: 820,
      height: 520
    },
    profile: {
      id: "profile",
      title: "User Profile & Achievements",
      icon: User,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 4,
      x: 200,
      y: 150,
      width: 440,
      height: 340
    }
  });

  // Clock ticks
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Window Focus / Bring to front handler
  const focusWindow = (id: string) => {
    setFocusedWindow(id);
    setTopZIndex((prev) => {
      const nextZ = prev + 1;
      setWindows((prevWindows) => ({
        ...prevWindows,
        [id]: { ...prevWindows[id], zIndex: nextZ, isMinimized: false }
      }));
      return nextZ;
    });
  };

  // Open App
  const openApp = (id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, isMinimized: false }
    }));
    focusWindow(id);
  };

  // Close App
  const closeApp = (id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false }
    }));
    if (focusedWindow === id) setFocusedWindow(null);
  };

  // Minimize App
  const minimizeApp = (id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true }
    }));
    if (focusedWindow === id) setFocusedWindow(null);
  };

  // Maximize / Restore App
  const toggleMaximizeApp = (id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized }
    }));
    focusWindow(id);
  };

  // Custom Window Drag Hook logic
  const dragStartPos = useRef<{ x: number; y: number } | null>(null);
  const dragWindowId = useRef<string | null>(null);

  const startDrag = (e: React.MouseEvent, id: string) => {
    focusWindow(id);
    if (windows[id].isMaximized) return; // Cannot drag full screen window
    dragWindowId.current = id;
    dragStartPos.current = {
      x: e.clientX - windows[id].x,
      y: e.clientY - windows[id].y
    };
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", stopDrag);
  };

  const handleDrag = (e: MouseEvent) => {
    if (!dragWindowId.current || !dragStartPos.current) return;
    const id = dragWindowId.current;
    const newX = e.clientX - dragStartPos.current.x;
    const newY = e.clientY - dragStartPos.current.y;
    
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], x: newX, y: Math.max(28, newY) } // Prevent dragging above top bar
    }));
  };

  const stopDrag = () => {
    dragWindowId.current = null;
    dragStartPos.current = null;
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", stopDrag);
  };

  // Return to Classic/Adventure views
  const handleLayoutSwitch = (layout: "classic" | "adventure") => {
    localStorage.setItem("nextsem_curriculum_layout", layout);
    window.location.reload();
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#030712] text-slate-100 font-sans select-none crt-scanline">
      
      {/* ── Desktop Canvas Wallpaper / Animated Grid Backdrop ── */}
      <div className="absolute inset-0 os-desktop-grid opacity-60 z-0 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-[60vw] h-[60vw] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none z-0" />
      <div className="absolute -bottom-40 -right-40 w-[60vw] h-[60vw] rounded-full bg-[#04aa6d]/5 blur-[150px] pointer-events-none z-0" />

      {/* ── TOP MENU STATUS BAR ── */}
      <header className="absolute top-0 left-0 right-0 h-7 bg-[#0f172a]/80 backdrop-blur border-b border-white/5 flex items-center justify-between px-4 z-[9999] text-[11px] font-black text-slate-350">
        
        {/* Left Section: OS Brand & Layout switcher */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 hover:text-white cursor-pointer">
            <img src="/logo.svg" alt="Nextsem OS Logo" className="w-4 h-4 rounded" />
            <span className="font-black text-xs text-white">Nextsem OS</span>
          </div>
          
          <div className="h-3 w-px bg-slate-800" />
          
          {/* Quick theme/layout toggle pill inside OS status bar */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleLayoutSwitch("adventure")}
              className="hover:text-amber-400 flex items-center gap-1 transition-colors cursor-pointer"
            >
              🗺️ <span className="hidden sm:inline">Gamified Trail</span>
            </button>
            <span className="text-slate-800">|</span>
            <button 
              onClick={() => handleLayoutSwitch("classic")}
              className="hover:text-amber-400 flex items-center gap-1 transition-colors cursor-pointer"
            >
              📑 <span className="hidden sm:inline">Classic Slides</span>
            </button>
          </div>
        </div>

        {/* Right Section: System stats, clock, XP indicators */}
        <div className="flex items-center gap-4 font-mono">
          <div className="flex items-center gap-1 text-amber-400">
            <span>🪙</span>
            <span>{userXP.toLocaleString()} XP</span>
          </div>
          <div className="flex items-center gap-1 text-purple-400">
            <span>💎</span>
            <span>{userGems} Gems</span>
          </div>
          <div className="h-3.5 w-px bg-slate-800" />
          
          <div className="flex items-center gap-1">
            <Wifi size={12} className="text-emerald-400" />
            <Battery size={13} className="text-slate-400" />
          </div>
          
          <div className="h-3.5 w-px bg-slate-800" />
          
          <div className="flex items-center gap-1.5 text-slate-200">
            <Clock size={11} className="text-slate-500" />
            <span>{time}</span>
          </div>
        </div>

      </header>

      {/* ── DESKTOP SHORTCUT GRID (Left Side) ── */}
      <main className="absolute top-10 bottom-16 left-4 right-4 z-10 grid grid-cols-1 grid-flow-row auto-rows-[90px] gap-4 w-28 text-center pt-2">
        
        {/* Shortcut: Curriculum Navigator */}
        <button 
          onClick={() => openApp("curriculum")}
          className="flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 active:scale-95 transition-all text-slate-300 hover:text-white cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border border-blue-500/25 flex items-center justify-center group-hover:scale-105 transition-transform">
            <BookOpen size={22} className="text-blue-400 group-hover:text-blue-300" />
          </div>
          <span className="text-[10px] font-black mt-2 tracking-wide truncate max-w-full drop-shadow-md">
            Curriculum
          </span>
        </button>

        {/* Shortcut: Terminal Simulator */}
        <button 
          onClick={() => openApp("terminal")}
          className="flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 active:scale-95 transition-all text-slate-300 hover:text-white cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/25 flex items-center justify-center group-hover:scale-105 transition-transform">
            <TerminalIcon size={22} className="text-emerald-450 group-hover:text-emerald-350" />
          </div>
          <span className="text-[10px] font-black mt-2 tracking-wide truncate max-w-full drop-shadow-md">
            Terminal
          </span>
        </button>

        {/* Shortcut: Profile details */}
        <button 
          onClick={() => openApp("profile")}
          className="flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 active:scale-95 transition-all text-slate-300 hover:text-white cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/25 flex items-center justify-center group-hover:scale-105 transition-transform">
            <User size={22} className="text-amber-400 group-hover:text-amber-300" />
          </div>
          <span className="text-[10px] font-black mt-2 tracking-wide truncate max-w-full drop-shadow-md">
            My Profile
          </span>
        </button>

      </main>

      {/* ── DRAGGABLE WINDOW MANAGER RENDER LAYER ── */}
      <div className="absolute inset-0 top-7 bottom-16 pointer-events-none z-20">
        
        {Object.values(windows).map((win) => {
          if (!win.isOpen || win.isMinimized) return null;
          const WinIcon = win.icon;
          const isActive = focusedWindow === win.id;
          
          return (
            <div
              key={win.id}
              onClick={() => focusWindow(win.id)}
              className={`absolute os-window-glass rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden transition-all duration-100 pointer-events-auto border ${
                isActive 
                  ? "border-[#04aa6d]/30 shadow-[#04aa6d]/5 ring-1 ring-[#04aa6d]/15" 
                  : "border-slate-800"
              }`}
              style={{
                zIndex: win.zIndex,
                left: win.isMaximized ? 0 : `${win.x}px`,
                top: win.isMaximized ? 28 : `${win.y}px`,
                width: win.isMaximized ? '100vw' : `${win.width}px`,
                height: win.isMaximized ? 'calc(100vh - 28px - 60px)' : `${win.height}px`,
              }}
            >
              
              {/* Window Header / Drag handle bar */}
              <div 
                onMouseDown={(e) => startDrag(e, win.id)}
                className="flex items-center justify-between h-9 px-4 bg-[#101726]/90 border-b border-white/5 cursor-move"
              >
                <div className="flex items-center gap-2">
                  <WinIcon size={14} className="text-slate-450" />
                  <span className="text-[11px] font-black text-slate-300 truncate max-w-[200px] sm:max-w-sm select-none">
                    {win.title}
                  </span>
                </div>

                {/* OS traffic light control buttons */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); minimizeApp(win.id); }}
                    className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-400 transition-colors flex items-center justify-center text-[8px] font-bold text-amber-950"
                  >
                    <span>-</span>
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleMaximizeApp(win.id); }}
                    className="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-400 transition-colors flex items-center justify-center text-[7px] font-bold text-emerald-950"
                  >
                    <span>▲</span>
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); closeApp(win.id); }}
                    className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-450 transition-colors flex items-center justify-center text-[8px] font-bold text-rose-950"
                  >
                    <span>×</span>
                  </button>
                </div>
              </div>

              {/* Window Content Pane */}
              <div className="flex-1 overflow-auto bg-[#080d16] custom-scrollbar p-1">
                
                {/* Curriculum app */}
                {win.id === "curriculum" && (
                  <div className="p-4 space-y-6">
                    <div>
                      <h2 className="text-lg font-black tracking-tight text-white mb-1 uppercase">Nextsem Academy Curriculum</h2>
                      <p className="text-[11px] text-slate-400">Complete all learning modules to earn your verified course certificate.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {coursePhases.map((phase) => (
                        <div key={phase.id} className="p-4 rounded-2xl bg-[#0e1423] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg">{phase.icon}</span>
                              <h3 className="text-xs font-black uppercase text-white leading-none">{phase.title}</h3>
                            </div>
                            <ul className="space-y-1.5 pl-5 list-disc text-[10px] text-slate-400 mb-4">
                              {phase.topics.slice(0, 3).map((topic, i) => (
                                <li key={i} className="truncate">{topic.label}</li>
                              ))}
                              {phase.topics.length > 3 && <li className="italic text-slate-500">+{phase.topics.length - 3} more subtopics...</li>}
                            </ul>
                          </div>
                          
                          <Link 
                            href={getChapterUrl(phase.topics[0]?.path)}
                            className="inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 font-black text-[10px] uppercase text-white tracking-widest transition-all text-center"
                          >
                            <span>Open Phase</span>
                            <ArrowRight size={12} className="stroke-[3]" />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Terminal Simulator App */}
                {win.id === "terminal" && (
                  <div className="w-full h-full overflow-y-auto bg-[#0b1329] rounded-b-xl p-1.5">
                    <TabbedOS />
                  </div>
                )}

                {/* Playground App */}
                {win.id === "playground" && (
                  <iframe 
                    src="/playground"
                    className="w-full h-full border-none rounded-b-xl"
                  />
                )}

                {/* User profile App */}
                {win.id === "profile" && (
                  <div className="p-5 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full border-4 border-amber-400/80 bg-slate-900 overflow-hidden flex items-center justify-center">
                      {currentUser?.photo ? (
                        <img src={currentUser.photo} alt={currentUser.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl font-black text-white">{currentUser?.name?.slice(0,2).toUpperCase() || "SE"}</span>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-base font-black text-white">{currentUser?.name || "Guest Student"}</h3>
                      <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">
                        {userXP > 10000 ? "Gold Scholar" : "Bronze Scholar"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full max-w-xs p-3 bg-slate-900/60 border border-slate-800 rounded-2xl">
                      <div className="text-center p-2">
                        <span className="block text-xs font-black text-white">🪙 {userXP.toLocaleString()}</span>
                        <span className="text-[8px] text-slate-500 font-bold uppercase">Points</span>
                      </div>
                      <div className="text-center p-2">
                        <span className="block text-xs font-black text-purple-400">💎 {userGems}</span>
                        <span className="text-[8px] text-slate-500 font-bold uppercase">Gems</span>
                      </div>
                    </div>
                    
                    {currentUser ? (
                      <button 
                        onClick={onLogout}
                        className="py-1.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
                      >
                        Sign Out
                      </button>
                    ) : (
                      <button 
                        onClick={onSignIn}
                        className="py-2 px-6 rounded-xl bg-blue-600 hover:bg-blue-750 text-white text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
                      >
                        Sign In with Google
                      </button>
                    )}
                  </div>
                )}

              </div>

            </div>
          );
        })}

      </div>

      {/* ── BOTTOM APP LAUNCHER TASKBAR DOCK ── */}
      <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 h-14 max-w-md w-[90%] bg-[#0e1626]/85 backdrop-blur-xl border border-white/5 rounded-3xl flex items-center justify-around px-4 z-[9999] shadow-[0_15px_30px_rgba(0,0,0,0.6)]">
        
        {/* Dock: Home/Show Desktop */}
        <button 
          onClick={() => {
            // Minimize all open windows
            setWindows((prev) => {
              const res = { ...prev };
              Object.keys(res).forEach((k) => { res[k].isMinimized = true; });
              return res;
            });
          }}
          className="w-10 h-10 rounded-2xl hover:bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer active:scale-95"
          title="Show Desktop"
        >
          <Monitor size={18} />
        </button>

        <div className="w-px h-6 bg-slate-800" />

        {/* Dock: Curriculum */}
        <button 
          onClick={() => openApp("curriculum")}
          className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
            windows.curriculum.isOpen && !windows.curriculum.isMinimized
              ? "bg-[#04aa6d]/15 text-emerald-450 border border-emerald-500/20" 
              : "text-slate-450 hover:bg-white/5 hover:text-slate-200"
          }`}
          title="Curriculum Navigator"
        >
          <BookOpen size={18} />
        </button>

        {/* Dock: Terminal */}
        <button 
          onClick={() => openApp("terminal")}
          className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
            windows.terminal.isOpen && !windows.terminal.isMinimized
              ? "bg-[#04aa6d]/15 text-emerald-450 border border-emerald-500/20" 
              : "text-slate-450 hover:bg-white/5 hover:text-slate-200"
          }`}
          title="Terminal Shell"
        >
          <TerminalIcon size={18} />
        </button>

        {/* Dock: Profile */}
        <button 
          onClick={() => openApp("profile")}
          className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
            windows.profile.isOpen && !windows.profile.isMinimized
              ? "bg-[#04aa6d]/15 text-emerald-450 border border-emerald-500/20" 
              : "text-slate-450 hover:bg-white/5 hover:text-slate-200"
          }`}
          title="My Profile"
        >
          <User size={18} />
        </button>

      </footer>

    </div>
  );
}
