"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { auth, signInWithGoogle } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  desktopSimulatorSteps,
  isSimulatorComplete,
  getTotalXP,
  type DesktopSimulatorStep,
} from "../../data/desktopSimulatorSteps";
import { useRouter } from "next/navigation";
import { Heart, Star, Lightbulb, CheckCircle2, AlertCircle, X, ChevronRight, Trophy, Search, ImageIcon } from "lucide-react";

// ─── Wallpapers (Real Windows Era Wallpapers) ────────────────────────────────
interface Wallpaper {
  id: string;
  name: string;
  era: string;
  emoji: string;
  style: React.CSSProperties;
}

const WALLPAPERS: Wallpaper[] = [
  {
    id: "xp-bliss",
    name: "Bliss",
    era: "Windows XP",
    emoji: "🌄",
    style: {
      backgroundImage: "url('https://www.wallpaperhub.app/_next/image?url=https%3A%2F%2Fcdn.wallpaperhub.app%2Fcloudcache%2Fb%2Fd%2F7%2F6%2F4%2Fb%2Fbd764bb25d49a05105060185774ba14cd2c846f7.jpg&w=4500&q=100')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  },
  {
    id: "vista-aurora",
    name: "Aurora",
    era: "Windows Vista",
    emoji: "🌌",
    style: {
      backgroundImage: "url('https://archive.org/download/theoriginalfilesofsomewindowswallpapers/Vista%20Destination.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  },
  {
    id: "win7-harmony",
    name: "Harmony",
    era: "Windows 7",
    emoji: "🎨",
    style: {
      backgroundImage: "url('https://archive.org/download/theoriginalfilesofsomewindowswallpapers/NTS0043H.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  },
  {
    id: "win7-fish",
    name: "Fish",
    era: "Windows 7",
    emoji: "🐟",
    style: {
      backgroundImage: "url('https://archive.org/download/theoriginalfilesofsomewindowswallpapers/IL141-016.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  },
  {
    id: "win8-hero",
    name: "Hero",
    era: "Windows 8",
    emoji: "🌀",
    style: {
      backgroundImage: "url('https://archive.org/download/theoriginalfilesofsomewindowswallpapers/NTS0027H.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  },
  {
    id: "win10-hero",
    name: "Hero",
    era: "Windows 10",
    emoji: "📎",
    style: {
      backgroundImage: "url('https://archive.org/download/theoriginalfilesofsomewindowswallpapers/G719102013.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  },
  {
    id: "win10-spotlight",
    name: "Spotlight",
    era: "Windows 10",
    emoji: "🌠",
    style: {
      backgroundImage: "url('https://archive.org/download/theoriginalfilesofsomewindowswallpapers/e4f70bf29a988b6c3213a35085cdc230650ec56f442c752895b3339fd7042441.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  },
  {
    id: "win11-bloom",
    name: "Bloom",
    era: "Windows 11",
    emoji: "🌸",
    style: {
      backgroundImage: "url('https://raw.githubusercontent.com/viridivn/windows11wallpapers/main/img0.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  },
  {
    id: "win95-teal",
    name: "Classic Teal",
    era: "Windows 95/98",
    emoji: "🖥️",
    style: {
      background: "#008080",
    },
  },
  {
    id: "nextsem-os",
    name: "Nextsem OS",
    era: "Custom",
    emoji: "🚀",
    style: {
      backgroundImage: "url('https://archive.org/download/theoriginalfilesofsomewindowswallpapers/earth--from-space-img94-JPG.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  },
];

const wallpaperKey = (e: string) => `nextsem_desktop_wallpaper_${e}`;

// ─── Constants ──────────────────────────────────────────────────────────────
const MAX_HEARTS   = 5;
const progressKey  = (e: string) => `nextsem_desktop_sim_progress_${e}`;
const heartsKey    = (e: string) => `nextsem_desktop_sim_hearts_${e}`;
const certKey      = (e: string) => `nextsem_desktop_sim_certified_${e}`;

// ─── Types ───────────────────────────────────────────────────────────────────
interface FeedbackState { type: "success" | "error" | null; message: string; }
interface OpenWindow {
  id: string;
  title: string;
  emoji: string;
  x: number;
  y: number;
  width?: number;
  minHeight?: number;
}

// ─── Context Menu ─────────────────────────────────────────────────────────────
function CtxMenu({ x, y, items, onClose }: { x: number; y: number; items: string[]; onClose: () => void }) {
  return (
    <div
      className="fixed z-[999] bg-[#1e2d3d]/95 backdrop-blur border border-white/10 rounded-xl shadow-2xl py-1 min-w-[180px] text-xs"
      style={{ left: x, top: y }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {items.map((item, i) =>
        item === "---" ? (
          <div key={i} className="border-t border-white/10 my-1" />
        ) : (
          <button
            key={item}
            onClick={onClose}
            className="w-full text-left px-4 py-2 text-slate-300 hover:bg-blue-600/40 hover:text-white transition-colors"
          >
            {item}
          </button>
        )
      )}
    </div>
  );
}

// ─── Draggable Window ─────────────────────────────────────────────────────────
function DesktopWindow({ win, onClose, children }: { win: OpenWindow; onClose: (id: string) => void; children: React.ReactNode }) {
  const [pos, setPos] = useState({ x: win.x, y: win.y });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ mx: 0, my: 0, wx: 0, wy: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    dragStart.current = { mx: e.clientX, my: e.clientY, wx: pos.x, wy: pos.y };
  };

  useEffect(() => {
    if (!dragging) return;
    const move = (e: MouseEvent) => setPos({
      x: dragStart.current.wx + e.clientX - dragStart.current.mx,
      y: Math.max(32, dragStart.current.wy + e.clientY - dragStart.current.my),
    });
    const up = () => setDragging(false);
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
    return () => { document.removeEventListener("mousemove", move); document.removeEventListener("mouseup", up); };
  }, [dragging]);

  return (
    <div
      className="fixed z-[200] bg-[#0d1b2a]/95 backdrop-blur border border-white/15 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden flex flex-col"
      style={{ left: pos.x, top: pos.y, width: win.width || 480, minHeight: win.minHeight || 300 }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 bg-[#0f2340]/80 border-b border-white/10 cursor-move select-none shrink-0"
        onMouseDown={onMouseDown}
      >
        <div className="flex items-center gap-2">
          <span>{win.emoji}</span>
          <span className="text-white text-xs font-bold">{win.title}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-amber-400/80 hover:bg-amber-300 cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-emerald-400/80 hover:bg-emerald-300 cursor-pointer" />
          <button onClick={() => onClose(win.id)} className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 cursor-pointer" />
        </div>
      </div>
      {/* Content */}
      <div className="p-4 text-slate-300 text-xs flex-1 flex flex-col min-h-0">{children}</div>
    </div>
  );
}

// ─── Start Menu ───────────────────────────────────────────────────────────────
function StartMenu({ onClose, onSearch, onLaunchApp }: { onClose: () => void; onSearch: (q: string) => void; onLaunchApp: (appId: string) => void }) {
  const [query, setQuery] = useState("");
  return (
    <div className="fixed bottom-12 left-2 z-[500] w-72 bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-4 text-slate-300">
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-3 py-2 mb-4">
        <Search size={14} className="text-slate-500" />
        <input
          id="start-search-input"
          autoFocus
          className="bg-transparent outline-none text-xs w-full text-slate-200 placeholder:text-slate-600"
          placeholder="Type to search..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); onSearch(e.target.value); }}
          onKeyDown={(e) => { if (e.key === "Enter") { onSearch(query); onClose(); } }}
        />
      </div>
      <div className="text-[10px] text-slate-600 uppercase font-bold mb-2 px-1">Pinned Apps</div>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[["📁","File Explorer", "file-explorer"],["💻","CMD", "cmd"],["⚙️","Settings", "settings"],["🗑️","Recycle Bin", "recycle-bin"]].map(([em, label, appId]) => (
          <button
            key={label}
            id={appId === "settings" ? "settings-icon-start" : undefined}
            onClick={() => { onLaunchApp(appId); onClose(); }}
            className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/8 text-center cursor-pointer"
          >
            <span className="text-2xl">{em}</span>
            <span className="text-[9px] text-slate-400 font-bold truncate w-full">{label}</span>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-xs font-black">N</div>
          <span className="text-xs font-bold text-white">Student</span>
        </div>
        <button onClick={onClose} className="text-[10px] text-slate-500 hover:text-red-400 transition-colors cursor-pointer">⏻ Shut down</button>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function SimulatorPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulator state
  const [completedIds,    setCompletedIds]    = useState<string[]>([]);
  const [currentStepIdx,  setCurrentStepIdx]  = useState(0);
  const [hearts,          setHearts]          = useState(MAX_HEARTS);
  const [totalXP,         setTotalXP]         = useState(0);
  const [xpGained,        setXpGained]        = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [feedback,        setFeedback]        = useState<FeedbackState>({ type: null, message: "" });
  const [hintVisible,     setHintVisible]     = useState(false);
  const [isComplete,      setIsComplete]      = useState(false);
  const [mcqAnswer,       setMCQAnswer]       = useState<{ selected: string | null; submitted: boolean }>({ selected: null, submitted: false });

  // Desktop UI state
  const [startOpen,       setStartOpen]       = useState(false);
  const [ctxMenu,         setCtxMenu]         = useState<{ x: number; y: number; items: string[]; targetId?: string } | null>(null);
  const [openWindows,     setOpenWindows]     = useState<OpenWindow[]>([]);
  const [time,            setTime]            = useState("");
  const [date,            setDate]            = useState("");
  const [searchQuery,     setSearchQuery]     = useState("");
  const [wallpaperId,     setWallpaperId]     = useState("xp-bliss");
  const [showWallpapers,  setShowWallpapers]  = useState(false);
  const [cardMinimized,   setCardMinimized]   = useState(false);
  const [taskbarVisible,  setTaskbarVisible]  = useState(true);

  // visual enhancements states
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [projectFolderCreated, setProjectFolderCreated] = useState(false);
  const [chromeKilled, setChromeKilled] = useState(false);
  const [deletedFiles, setDeletedFiles] = useState<string[]>([]);
  const [snipActive, setSnipActive] = useState(false);

  const autoHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const taskbarLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const step: DesktopSimulatorStep = desktopSimulatorSteps[currentStepIdx];
  const totalSteps = desktopSimulatorSteps.length;

  // Auth
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        const savedUser = localStorage.getItem("nextsem_user");
        let email = "guest";
        if (savedUser) {
          try {
            email = JSON.parse(savedUser).email || "guest";
          } catch (e) {}
        }
        setUserEmail(email);
      }
      setLoading(false);
    });
  }, []);

  // Load progress
  useEffect(() => {
    if (!userEmail) return;
    const savedIds   = localStorage.getItem(progressKey(userEmail));
    const savedHrts  = localStorage.getItem(heartsKey(userEmail));
    const certified  = localStorage.getItem(certKey(userEmail));
    if (certified === "true") {
      // Already certified — send straight to main app
      router.push("/?active=0");
      return;
    }
    if (savedIds) {
      const ids: string[] = JSON.parse(savedIds);
      setCompletedIds(ids);
      const next = desktopSimulatorSteps.findIndex((s) => !ids.includes(s.id));
      if (next >= 0) setCurrentStepIdx(next);
    }
    if (savedHrts) setHearts(Math.max(0, parseInt(savedHrts, 10)));
    // Load saved wallpaper
    const savedWp = localStorage.getItem(wallpaperKey(userEmail));
    if (savedWp) setWallpaperId(savedWp);
  }, [userEmail]);

  // Clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      setDate(now.toLocaleDateString([], { month: "short", day: "numeric" }));
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  // Close menus on click outside
  useEffect(() => {
    const close = () => { setCtxMenu(null); setStartOpen(false); };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  // Auto-hide taskbar (4s) and instructions card (6s) on step change
  useEffect(() => {
    setTaskbarVisible(true);
    setCardMinimized(false);

    const cardTimer = setTimeout(() => {
      setCardMinimized(true);
    }, 6000);

    return () => {
      clearTimeout(cardTimer);
    };
  }, [currentStepIdx]);

  // Change wallpaper
  const changeWallpaper = useCallback((id: string) => {
    setWallpaperId(id);
    if (userEmail) localStorage.setItem(wallpaperKey(userEmail), id);
    setShowWallpapers(false);
  }, [userEmail]);

  const handleSkipOnboarding = useCallback(() => {
    const email = userEmail || "guest";
    localStorage.setItem(certKey(email), "true");
    router.push("/?active=0");
  }, [userEmail, router]);

  // Save progress
  const saveProgress = useCallback((ids: string[], h: number) => {
    if (!userEmail) return;
    localStorage.setItem(progressKey(userEmail), JSON.stringify(ids));
    localStorage.setItem(heartsKey(userEmail), String(h));
  }, [userEmail]);

  const flashFeedback = useCallback((type: "success" | "error", msg: string) => {
    setFeedback({ type, message: msg });
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => setFeedback({ type: null, message: "" }), 2600);
  }, []);

  const completeStep = useCallback((s: DesktopSimulatorStep) => {
    setCompletedIds((prev) => {
      const next = [...prev, s.id];
      saveProgress(next, hearts);
      setTotalXP((x) => x + s.xpReward);
      setXpGained(s.xpReward);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1600);
      flashFeedback("success", s.successMsg);

      if (isSimulatorComplete(next)) {
        setTimeout(() => {
          if (userEmail) localStorage.setItem(certKey(userEmail), "true");
          router.push("/?active=0");
        }, 2000);
        return next;
      }

      setTimeout(() => {
        setCurrentStepIdx((i) => Math.min(i + 1, totalSteps - 1));
        setMCQAnswer({ selected: null, submitted: false });
        setHintVisible(false);
      }, 1800);
      return next;
    });
  }, [flashFeedback, hearts, saveProgress, totalSteps, userEmail]);

  const deductHeart = useCallback((penalty: number) => {
    if (penalty <= 0) return;
    setHearts((h) => {
      const next = Math.max(0, h - penalty);
      saveProgress(completedIds, next);
      return next;
    });
    flashFeedback("error", "Wrong action! Try again. 💔");
  }, [completedIds, flashFeedback, saveProgress]);

  const validateAction = useCallback((performed: string, iconId?: string) => {
    if (!step) return;
    const targetId = step.targetElement.replace("#", "");
    const targetOk = !iconId || targetId === iconId || targetId === "desktop-bg" || targetId === "shortcut-demo-area";
    const actionOk = performed === step.action;

    if (actionOk && targetOk) {
      completeStep(step);
    } else if (actionOk && !targetOk) {
      deductHeart(step.heartPenalty);
    }
  }, [completeStep, deductHeart, step]);

  // Listen for the Windows key (Meta key) to toggle the simulator's Start Menu
  useEffect(() => {
    const handleWinKey = (e: KeyboardEvent) => {
      if (e.key === "Meta") {
        e.preventDefault();
        e.stopPropagation();
        setStartOpen((prev) => {
          const next = !prev;
          if (next) {
            validateAction("click", "start-button");
          }
          return next;
        });
      }
    };
    window.addEventListener("keydown", handleWinKey, true);
    return () => window.removeEventListener("keydown", handleWinKey, true);
  }, [validateAction]);

  // Open a window
  const openWindow = useCallback((id: string, title: string, emoji: string, x?: number, y?: number, width?: number, minHeight?: number) => {
    setOpenWindows((prev) => {
      if (prev.find((w) => w.id === id)) return prev;
      const defaultX = 120 + prev.length * 30;
      const defaultY = 60 + prev.length * 20;
      return [...prev, { id, title, emoji, x: x ?? defaultX, y: y ?? defaultY, width, minHeight }];
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  // On-screen keyboard pressed key tracking & shortcuts interception
  useEffect(() => {
    const handleVisualKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      let keyLabel = key;
      if (key === "escape") keyLabel = "esc";
      if (key === "control") keyLabel = "ctrl";
      if (key === "meta") keyLabel = "win";

      setPressedKeys((prev) => prev.includes(keyLabel) ? prev : [...prev, keyLabel]);

      if (!step) return;

      // Validate keyboard shortcut targets
      const expected = step.shortcut;
      let matched = false;

      if (expected === "Ctrl + Shift + Esc") {
        if (e.ctrlKey && e.shiftKey && e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
          matched = true;
          // Open custom Task Manager window
          openWindow("task-manager", "Task Manager", "⚙️", 100, 100, 540, 360);
        }
      } else if (expected === "⊞ + Shift + S") {
        if (e.shiftKey && e.key?.toLowerCase() === "s") {
          e.preventDefault();
          e.stopPropagation();
          matched = true;
          setSnipActive(true);
        }
      } else if (expected === "Ctrl + A") {
        if (e.ctrlKey && e.key?.toLowerCase() === "a") {
          e.preventDefault();
          e.stopPropagation();
          matched = true;
        }
      }

      if (matched) {
        completeStep(step);
      }
    };

    const handleVisualKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      let keyLabel = key;
      if (key === "escape") keyLabel = "esc";
      if (key === "control") keyLabel = "ctrl";
      if (key === "shift") keyLabel = "shift";
      if (key === "meta") keyLabel = "win";

      setPressedKeys((prev) => prev.filter((k) => k !== keyLabel));
    };

    window.addEventListener("keydown", handleVisualKeyDown, true);
    window.addEventListener("keyup", handleVisualKeyUp, true);
    return () => {
      window.removeEventListener("keydown", handleVisualKeyDown, true);
      window.removeEventListener("keyup", handleVisualKeyUp, true);
    };
  }, [step, completeStep, openWindow]);

  // Desktop icon handlers
  const handleIconClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    validateAction("click", id);
  };

  const handleIconDblClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    validateAction("double-click", id);
    // Actually open window
    if (id === "recycle-bin-icon") {
      openWindow("recycle-bin", "Recycle Bin", "🗑️");
    }
    if (id === "file-explorer-icon" || id === "documents-folder") {
      openWindow("file-explorer", "File Explorer", "📁");
    }
  };

  const handleIconRightClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault(); e.stopPropagation();
    setCtxMenu({ x: e.clientX, y: e.clientY, items: ["Open", "---", "Copy", "Rename", "Delete", "---", "Properties"], targetId: id });
    validateAction("right-click", id);
  };

  const handleDesktopRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setCtxMenu({
      x: e.clientX,
      y: e.clientY,
      items: ["View", "Sort by", "Refresh", "---", "New", "---", "🖼️ Change Wallpaper", "---", "Display settings", "Personalise"],
    });
    validateAction("right-click");
  };

  const handleDesktopClick = (e: React.MouseEvent) => {
    setStartOpen(false);
    setCtxMenu(null);
    validateAction("click");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (step?.action === "keyboard") completeStep(step);
    if (e.key === "Escape") { setStartOpen(false); setCtxMenu(null); }
  };

  const handleMCQSubmit = () => {
    if (!mcqAnswer.selected || mcqAnswer.submitted) return;
    setMCQAnswer((prev) => ({ ...prev, submitted: true }));
    if (mcqAnswer.selected === step.correctOption) { completeStep(step); }
    else { deductHeart(step.heartPenalty); setTimeout(() => setMCQAnswer({ selected: null, submitted: false }), 1000); }
  };

  const SettingsWindowContent = () => {
    return (
      <div className="flex h-full min-h-[280px] bg-[#0c1322] text-slate-200 rounded-b-xl overflow-hidden font-sans">
        <div className="w-1/3 bg-[#080d1a] p-3 border-r border-white/5 space-y-1 select-none">
          <div className="px-2 py-1 bg-white/5 rounded-lg text-xs font-black text-white">🖥️ Personalisation</div>
          <div className="px-2 py-1 hover:bg-white/5 rounded-lg text-xs text-slate-400 cursor-not-allowed">⚙️ System</div>
          <div className="px-2 py-1 hover:bg-white/5 rounded-lg text-xs text-slate-400 cursor-not-allowed">👤 Accounts</div>
          <div className="px-2 py-1 hover:bg-white/5 rounded-lg text-xs text-slate-400 cursor-not-allowed">🔄 Windows Update</div>
        </div>
        <div className="w-2/3 p-4 overflow-y-auto space-y-3">
          <h3 className="text-white font-black text-sm">Personalisation Settings</h3>
          <p className="text-[10px] text-slate-400">Select a background wallpaper to update your desktop look.</p>
          <div className="grid grid-cols-2 gap-2 pt-1">
            {WALLPAPERS.slice(0, 8).map((wp) => {
              const isActive = wallpaperId === wp.id;
              const isTargetBloom = wp.id === "win11-bloom";
              return (
                <button
                  key={wp.id}
                  id={isTargetBloom ? "settings-wallpaper-bloom" : undefined}
                  onClick={() => {
                    changeWallpaper(wp.id);
                    if (isTargetBloom) {
                      validateAction("click", "settings-wallpaper-bloom");
                    }
                  }}
                  className={`relative rounded-xl overflow-hidden h-14 border-2 transition-all hover:scale-105 cursor-pointer
                    ${isActive ? "border-purple-500 shadow" : "border-white/10 hover:border-white/20"}`}
                >
                  <div className="absolute inset-0" style={wp.style} />
                  <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center">
                    <span className="text-[8px] text-white font-bold truncate px-1">{wp.name}</span>
                  </div>
                  {isActive && (
                    <div className="absolute top-1 right-1 w-3 h-3 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-[7px] font-black">✓</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const CmdWindowContent = () => {
    const [lines, setLines] = useState<string[]>([
      "Microsoft Windows [Version 10.0.22000.253]",
      "(c) Microsoft Corporation. All rights reserved.",
      "",
    ]);
    const [cmdInput, setCmdInput] = useState("");
    const terminalEnd = useRef<HTMLDivElement>(null);

    useEffect(() => {
      terminalEnd.current?.scrollIntoView({ behavior: "smooth" });
    }, [lines]);

    const handleCmdSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const val = cmdInput.trim();
      if (!val) return;

      const newLines = [...lines, `C:\\Users\\Student> ${val}`];

      if (val.toLowerCase() === "dir") {
        const dirOutput = [
          "",
          " Directory of C:\\Users\\Student",
          "",
          "12/07/2026  12:00 PM    <DIR>          .",
          "12/07/2026  12:00 PM    <DIR>          ..",
          projectFolderCreated ? "12/07/2026  12:00 PM    <DIR>          project" : "",
          `               0 File(s)              0 bytes`,
          `               ${projectFolderCreated ? 3 : 2} Dir(s)  45,123,456,789 bytes free`,
          "",
        ].filter(Boolean);

        setLines([...newLines, ...dirOutput]);

        if (step?.id === "cmd-dir-command" || step?.id === "cmd-dir-verify") {
          completeStep(step);
        }
      } else if (val.toLowerCase() === "mkdir project") {
        setProjectFolderCreated(true);
        setLines([...newLines, "", "Directory 'project' created successfully.", ""]);
        
        if (step?.id === "cmd-mkdir-project") {
          completeStep(step);
        }
      } else {
        setLines([...newLines, `'${val}' is not recognised as an internal or external command,`, "operable program or batch file.", ""]);
      }

      setCmdInput("");
    };

    return (
      <div className="flex flex-col h-full min-h-[240px] bg-black text-slate-200 rounded-b-xl overflow-hidden font-mono p-3 text-[13px] border border-white/5">
        <div className="flex-1 overflow-y-auto space-y-1 pr-1 max-h-[220px]">
          {lines.map((l, i) => (
            <div key={i} className="whitespace-pre-wrap leading-tight text-left">{l}</div>
          ))}
          <div ref={terminalEnd} />
        </div>
        <form onSubmit={handleCmdSubmit} className="flex items-center mt-1 pt-1.5 border-t border-white/5 shrink-0">
          <span className="text-emerald-400 font-bold mr-1 shrink-0">C:\\Users\\Student&gt;</span>
          <input
            id="cmd-input"
            autoFocus
            className="flex-1 bg-transparent border-none outline-none focus:ring-0 p-0 text-white font-mono text-[13px] caret-emerald-400"
            value={cmdInput}
            onChange={(e) => setCmdInput(e.target.value)}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </form>
      </div>
    );
  };

  const TaskManagerContent = () => {
    const [selectedProcess, setSelectedProcess] = useState<string | null>(null);
    const [cpuHistory, setCpuHistory] = useState<number[]>(Array.from({ length: 20 }, () => Math.floor(Math.random() * 5) + 94));

    useEffect(() => {
      const timer = setInterval(() => {
        setCpuHistory((prev) => {
          const nextVal = chromeKilled 
            ? Math.floor(Math.random() * 4) + 2 
            : Math.floor(Math.random() * 5) + 94; 
          return [...prev.slice(1), nextVal];
        });
      }, 800);
      return () => clearInterval(timer);
    }, []);

    const processes = [
      { name: "Google Chrome", status: chromeKilled ? "Closed" : "Not Responding", cpu: chromeKilled ? 0 : 98.4, mem: chromeKilled ? 0 : 2100 },
      { name: "File Explorer", status: "Running", cpu: 0.2, mem: 45 },
      { name: "Command Prompt", status: "Running", cpu: 0.1, mem: 12 },
      { name: "Task Manager", status: "Running", cpu: 1.5, mem: 32 },
    ].filter(p => p.cpu > 0 || p.name !== "Google Chrome" || !chromeKilled);

    const maxCpuVal = 100;
    const chartHeight = 60;
    const chartWidth = 240;
    const pointsStr = cpuHistory.map((val, idx) => {
      const x = (idx / (cpuHistory.length - 1)) * chartWidth;
      const y = chartHeight - (val / maxCpuVal) * chartHeight;
      return `${x},${y}`;
    }).join(" ");

    return (
      <div className="flex flex-col h-full min-h-[260px] bg-[#1e1e24] text-slate-200 rounded-b-xl p-3 font-sans text-xs">
        <div className="bg-black/30 rounded-xl p-3 mb-3 border border-white/5 flex items-center justify-between shrink-0">
          <div>
            <div className="font-black text-white text-[10px] uppercase tracking-wider">CPU Utilisation</div>
            <div className="text-lg font-black text-purple-400 mt-0.5">
              {cpuHistory[cpuHistory.length - 1]}%
            </div>
          </div>
          <div className="relative overflow-hidden w-[240px] h-[60px] border border-purple-500/20 bg-purple-950/5 rounded-lg">
            <svg width={chartWidth} height={chartHeight} className="overflow-visible">
              <line x1="0" y1="20" x2="240" y2="20" stroke="rgba(255,255,255,0.05)" />
              <line x1="0" y1="40" x2="240" y2="40" stroke="rgba(255,255,255,0.05)" />
              <polyline
                fill="none"
                stroke="#a855f7"
                strokeWidth="2"
                points={pointsStr}
                className="transition-all duration-300"
              />
            </svg>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto border border-white/5 rounded-xl bg-black/20">
          <div className="grid grid-cols-4 gap-2 bg-[#121216] p-2 text-[10px] font-black text-slate-500 uppercase border-b border-white/5 select-none">
            <div>Process Name</div>
            <div>Status</div>
            <div className="text-right">CPU %</div>
            <div className="text-right">RAM (MB)</div>
          </div>
          <div className="divide-y divide-white/5 select-none">
            {processes.map((p) => {
              const isSelected = selectedProcess === p.name;
              return (
                <div
                  key={p.name}
                  onClick={() => p.status === "Not Responding" && setSelectedProcess(p.name)}
                  className={`grid grid-cols-4 gap-2 p-2 cursor-pointer transition-colors text-[11px]
                    ${isSelected ? "bg-purple-600/30 text-white font-bold" : "hover:bg-white/3 text-slate-350"}`}
                >
                  <div className="truncate font-semibold">{p.name}</div>
                  <div className={p.status === "Not Responding" ? "text-red-400 font-bold" : "text-emerald-400"}>{p.status}</div>
                  <div className="text-right">{p.cpu}%</div>
                  <div className="text-right">{p.mem} MB</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-3 border-t border-white/5 mt-3 shrink-0">
          <button
            id="taskmanager-kill-btn"
            disabled={!selectedProcess}
            onClick={() => {
              if (selectedProcess === "Google Chrome") {
                setChromeKilled(true);
                setSelectedProcess(null);
                validateAction("click", "taskmanager-kill-btn");
              }
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:hover:bg-red-600 text-white font-black rounded-xl transition-all cursor-pointer select-none"
          >
            End Task
          </button>
        </div>
      </div>
    );
  };

  const progressPercent = Math.round((completedIds.length / totalSteps) * 100);

  // ─── Loading ───────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  // ─── Auth gate ─────────────────────────────────────────────────────────────
  if (!userEmail) return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-8 max-w-sm w-full text-center">
        <div className="text-5xl mb-4">🎮</div>
        <h1 className="text-white font-black text-xl mb-2">Windows Desktop Simulator</h1>
        <p className="text-slate-400 text-sm mb-6">Sign in to start the guided experience and save your progress.</p>
        <button onClick={signInWithGoogle} className="w-full bg-white text-gray-900 font-black rounded-2xl py-3 flex items-center justify-center gap-3 hover:bg-gray-100 transition-all">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign in with Google
        </button>
        <button
          type="button"
          onClick={() => setUserEmail("guest")}
          className="w-full mt-3 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold rounded-2xl py-2.5 text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>Continue as Guest</span>
        </button>
      </div>
    </div>
  );

  // ─── Completion ─────────────────────────────────────────────────────────────
  if (isComplete) return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-amber-400/30 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="w-20 h-20 bg-amber-400/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-400/30">
          <Trophy size={40} className="text-amber-400" />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">🏆 Desktop Certified!</h2>
        <p className="text-slate-400 text-sm mb-6">You&apos;ve mastered Windows Desktop navigation!</p>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[["⭐ XP", getTotalXP()], ["❤️ Left", hearts], ["✅ Done", totalSteps]].map(([label, val]) => (
            <div key={String(label)} className="bg-white/5 rounded-2xl p-3 border border-white/10">
              <div className="text-white text-lg font-black">{val}</div>
              <div className="text-slate-500 text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>
        <div className="bg-amber-500/10 border border-amber-400/20 rounded-2xl p-4 mb-6">
          <div className="text-3xl mb-1">🏅</div>
          <div className="text-amber-400 font-black text-sm">Terminal Cadet Badge</div>
        </div>
        <button
          onClick={() => { router.push("/?active=0"); }}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black rounded-2xl py-3 flex items-center justify-center gap-2 hover:opacity-90 transition-all"
        >
          🚀 Go to Main App <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (id === "old-notes-file") {
      setDeletedFiles((prev) => [...prev, "old-notes-file"]);
      validateAction("drag", "recycle-bin-icon");
    }
  };

  // ─── Desktop icons ─────────────────────────────────────────────────────────
  const desktopIcons = [
    { 
      id: "recycle-bin-icon", 
      label: deletedFiles.includes("old-notes-file") ? "Recycle Bin (Full)" : "Recycle Bin", 
      emoji: deletedFiles.includes("old-notes-file") ? "🗑️" : "🗑️" 
    },
    { id: "file-explorer-icon", label: "File Explorer", emoji: "📁" },
    { id: "documents-folder",   label: "Documents",     emoji: "📄" },
  ];

  const targetIconId = step?.targetElement?.replace("#", "");

  // ─── Full Desktop Render ───────────────────────────────────────────────────
    const activeWp = WALLPAPERS.find((w) => w.id === wallpaperId) ?? WALLPAPERS[WALLPAPERS.length - 1];

  return (
    <div
      id="desktop-bg"
      className="fixed inset-0 overflow-hidden select-none outline-none transition-all duration-700"
      style={activeWp.style}
      onClick={handleDesktopClick}
      onContextMenu={handleDesktopRightClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* ── Wallpaper grid ── */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

      {/* ── Animated blobs ── */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/8 rounded-full blur-[120px] pointer-events-none" />

      {/* ─────────────────────────────────────────────────────
          TOP HUD — Hearts · Progress · XP
      ───────────────────────────────────────────────────── */}
      <header className="absolute top-0 left-0 right-0 h-9 z-[300] bg-black/40 backdrop-blur border-b border-white/5 flex items-center justify-between px-4">
        {/* Left: brand */}
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="logo" className="w-5 h-5 rounded" />
          <span className="text-white font-black text-xs hidden sm:block">Nextsem Desktop Trainer</span>
        </div>

        {/* Center: progress bar */}
        <div className="flex-1 mx-6 max-w-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-[10px] font-mono whitespace-nowrap">{completedIds.length}/{totalSteps}</span>
            <div className="flex-1 bg-white/5 rounded-full h-1.5">
              <div className="h-1.5 bg-gradient-to-r from-purple-500 to-blue-400 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>

        {/* Right: Hearts + XP + Skip option */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: MAX_HEARTS }).map((_, i) => (
              <Heart key={i} size={13} className={i < hearts ? "text-red-400 fill-red-400" : "text-slate-700"} />
            ))}
          </div>
          <div className="flex items-center gap-1 text-amber-400 font-black text-xs mr-1">
            <Star size={12} className="fill-amber-400" />{totalXP}
          </div>
          <button
            onClick={handleSkipOnboarding}
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-bold text-[10px] px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 active:scale-95 cursor-pointer ml-1"
            title="Skip Simulator and go to dashboard"
          >
            Skip Onboarding ➔
          </button>
        </div>
      </header>

      <main className="absolute top-10 left-4 bottom-12 flex flex-col gap-4 pt-3 w-20 z-10">
        {desktopIcons.map((icon) => {
          const isTarget = targetIconId === icon.id;
          return (
            <button
              key={icon.id}
              id={icon.id}
              onDragOver={icon.id === "recycle-bin-icon" ? handleDragOver : undefined}
              onDrop={icon.id === "recycle-bin-icon" ? handleDrop : undefined}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all w-full text-center group
                ${isTarget
                  ? "bg-white/10 ring-2 ring-purple-400 ring-offset-2 ring-offset-transparent"
                  : "hover:bg-white/8"
                }`}
              style={isTarget ? { animation: "pulse 1.5s ease-in-out infinite" } : undefined}
              onClick={(e) => handleIconClick(e, icon.id)}
              onDoubleClick={(e) => handleIconDblClick(e, icon.id)}
              onContextMenu={(e) => handleIconRightClick(e, icon.id)}
            >
              <span className="text-3xl drop-shadow-lg">{icon.emoji}</span>
              <span className="text-[10px] text-white font-bold leading-tight drop-shadow">{icon.label}</span>
              {isTarget && (
                <span className="text-[8px] text-purple-300 font-bold bg-purple-500/20 rounded-full px-1.5 py-0.5">← Here!</span>
              )}
            </button>
          );
        })}

        {/* Draggable old_notes.txt */}
        {!deletedFiles.includes("old-notes-file") && (
          <div
            id="old-notes-file"
            draggable
            onDragStart={(e) => handleDragStart(e, "old-notes-file")}
            className="flex flex-col items-center gap-1.5 p-2 rounded-2xl hover:bg-white/8 w-full text-center cursor-grab active:cursor-grabbing select-none group"
            onClick={(e) => handleIconClick(e, "old-notes-file")}
          >
            <span className="text-3xl drop-shadow-lg">📄</span>
            <span className="text-[10px] text-white font-bold leading-tight drop-shadow">old_notes.txt</span>
          </div>
        )}
      </main>

      {/* ─────────────────────────────────────────────────────
          STEP GUIDANCE CARD — bottom-left floating card
      ───────────────────────────────────────────────────── */}
      <div
        id="mcq-block"
        className={`absolute left-3 z-[100] bg-[#0d1b2a]/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden
          ${cardMinimized 
            ? "bottom-14 w-44 px-3 py-2.5 hover:bg-[#1a2e46]/95 border-purple-500/30" 
            : "bottom-14 w-[340px] sm:w-[380px]"}`}
        onClick={(e) => {
          e.stopPropagation();
          if (cardMinimized) setCardMinimized(false);
        }}
        onContextMenu={(e) => e.stopPropagation()}
      >
        {cardMinimized ? (
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-sm shrink-0">📖</span>
              <span className="text-white font-black text-[10px] truncate">Read Instructions</span>
            </div>
            <span className="text-[8px] font-bold bg-purple-500/20 text-purple-300 rounded px-1 shrink-0">Step {currentStepIdx + 1}</span>
          </div>
        ) : (
          <>
            {/* Card header */}
            <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/30 px-4 py-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-base shrink-0">
                  {{ "desktop": "🖥️", "start-menu": "🪟", "taskbar": "📌", "file-explorer": "📁", "terminal": "💻", "recycle-bin": "🗑️", "shortcuts": "⌨️" }[step.category] ?? "🎮"}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-black text-xs truncate">{step.title}</div>
                  <div className="text-slate-500 text-[10px] truncate">Step {currentStepIdx + 1} of {totalSteps}</div>
                </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setCardMinimized(true); }}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors shrink-0"
                title="Minimize instructions"
              >
                <X size={12} />
              </button>
            </div>

            <div className="p-3 space-y-2 max-h-[280px] overflow-y-auto">
              {/* Instruction */}
              <p className="text-slate-200 text-[11px] leading-relaxed whitespace-pre-line">{step.instruction}</p>

              {/* Shortcut bubble */}
              {step.shortcut && (
                <div className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5">
                  <span className="text-[10px] text-slate-400">Shortcut:</span>
                  <kbd className="text-[10px] font-mono text-purple-300 font-bold">{step.shortcut}</kbd>
                </div>
              )}

              {/* Keyboard zone */}
              {step.action === "keyboard" && (
                <div
                  id="shortcut-demo-area"
                  tabIndex={0}
                  className="bg-slate-900 border border-purple-500/30 rounded-2xl p-3 text-center cursor-text outline-none focus:border-purple-400"
                  onKeyDown={(e) => { e.stopPropagation(); completeStep(step); }}
                  onClick={(e) => { e.stopPropagation(); (e.currentTarget as HTMLElement).focus(); }}
                >
                  <div className="text-2xl mb-1">⌨️</div>
                  <div className="text-slate-400 text-[10px]">Click here, then press:</div>
                  <div className="text-purple-300 font-mono font-black text-sm mt-0.5">{step.shortcut ?? "any key"}</div>
                </div>
              )}

              {/* Start search zone */}
              {step.action === "keyboard" && targetIconId === "start-search-input" && (
                <div className="flex items-center gap-2 bg-white/5 border border-purple-500/30 rounded-xl px-3 py-2">
                  <Search size={12} className="text-slate-500" />
                  <input
                    id="start-search-input"
                    className="bg-transparent outline-none text-[11px] text-slate-200 w-full placeholder:text-slate-600"
                    placeholder="Type 'cmd' and press Enter..."
                    onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") completeStep(step); }}
                    onChange={() => { if (step.action === "keyboard") completeStep(step); }}
                  />
                </div>
              )}

              {/* MCQ options */}
              {step.action === "mcq" && step.mcqOptions && (
                <div className="space-y-1.5">
                  {step.mcqOptions.map((opt) => {
                    const sel  = mcqAnswer.selected === opt.label;
                    const ok   = mcqAnswer.submitted && opt.label === step.correctOption;
                    const bad  = mcqAnswer.submitted && sel && opt.label !== step.correctOption;
                    return (
                      <button key={opt.label}
                        onClick={(e) => { e.stopPropagation(); if (!mcqAnswer.submitted) setMCQAnswer({ selected: opt.label, submitted: false }); }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-[11px] font-bold border transition-all
                          ${ok  ? "bg-emerald-500/20 border-emerald-500 text-emerald-300" : ""}
                          ${bad ? "bg-red-500/20 border-red-500 text-red-300" : ""}
                          ${sel && !mcqAnswer.submitted ? "bg-purple-500/20 border-purple-500/60 text-purple-200" : ""}
                          ${!sel && !mcqAnswer.submitted ? "bg-white/3 border-white/10 text-slate-300 hover:bg-white/8" : ""}
                        `}
                      >
                        <span className="text-slate-500 mr-1.5">[{opt.label}]</span>{opt.text}
                      </button>
                    );
                  })}
                  {mcqAnswer.selected && !mcqAnswer.submitted && (
                    <button onClick={(e) => { e.stopPropagation(); handleMCQSubmit(); }}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-black rounded-xl py-2 text-[11px] active:scale-95 transition-all">
                      Submit Answer ✓
                    </button>
                  )}
                </div>
              )}

              {/* Hint */}
              {hintVisible && (
                <div className="bg-amber-500/8 border border-amber-500/25 rounded-2xl p-2.5">
                  <div className="flex items-start gap-2">
                    <Lightbulb size={13} className="text-amber-400 mt-0.5 shrink-0" />
                    <p className="text-amber-200 text-[10px] leading-relaxed">{step.hint}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Card footer */}
            <div className="px-3 pb-3 pt-1 border-t border-white/5 flex gap-2">
              <button onClick={() => setHintVisible((v) => !v)}
                className="flex-1 text-[10px] font-bold text-amber-400 bg-amber-500/8 hover:bg-amber-500/15 border border-amber-500/20 rounded-xl py-1.5 flex items-center justify-center gap-1 transition-all">
                <Lightbulb size={11} />{hintVisible ? "Hide Hint" : "Hint"}
              </button>
              {(step.action === "drag" || step.action === "hover") && (
                <button onClick={() => completeStep(step)}
                  id="completion-btn"
                  className="flex-1 text-[10px] font-black text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl py-1.5 flex items-center justify-center gap-1 active:scale-95 transition-all">
                  ✓ Done <ChevronRight size={11} />
                </button>
              )}
              {step.id === "world-1-complete" && (
                <button onClick={() => completeStep(step)}
                  id="completion-btn"
                  className="flex-1 text-[10px] font-black text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl py-1.5 flex items-center justify-center gap-1 active:scale-95 transition-all">
                  🏆 Claim Reward
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────
          TASKBAR
      ───────────────────────────────────────────────────── */}
      <div
        id="taskbar"
        className={`absolute bottom-0 left-0 right-0 h-11 z-[300] bg-[#0a1628]/90 backdrop-blur-xl border-t border-white/8 flex items-center px-2 gap-2
          ${targetIconId === "taskbar" ? "ring-2 ring-inset ring-purple-400" : ""}`}
        onClick={(e) => { e.stopPropagation(); validateAction("click", "taskbar"); }}
      >
        {/* Start button */}
        <button
          id="start-button"
          className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all hover:bg-white/10
            ${targetIconId === "start-button" ? "ring-2 ring-purple-400 bg-purple-500/20" : ""}
            ${startOpen ? "bg-white/15" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setStartOpen((v) => !v);
            validateAction("click", "start-button");
          }}
        >
          🪟
        </button>

        <div className="h-5 w-px bg-white/10" />

        {/* Pinned taskbar apps */}
        {[["💻", "CMD", "cmd"], ["📁", "Files", "files"], ["🌐", "Browser", "browser"]].map(([em, label, appId]) => (
          <button
            key={label}
            onClick={() => {
              if (appId === "cmd") {
                openWindow("cmd", "Command Prompt", "💻", 80, 80, 520, 320);
              }
            }}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-base hover:bg-white/8 transition-all cursor-pointer"
            title={label}
          >
            {em}
          </button>
        ))}

        <div className="flex-1" />

        {/* System tray */}
        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-mono pr-1">
          {/* Wallpaper button */}
          <button
            title="Change Wallpaper"
            onClick={(e) => { e.stopPropagation(); setShowWallpapers((v) => !v); }}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-white/10
              ${showWallpapers ? "bg-white/15 text-purple-300" : "text-slate-500 hover:text-slate-300"}`}
          >
            <ImageIcon size={14} />
          </button>
          <div className="h-3 w-px bg-white/10" />
          <span>📶</span>
          <span>🔋</span>
          <div className="h-3 w-px bg-white/10 mx-1" />
          <div className="text-right leading-tight">
            <div className="text-white text-[11px] font-bold">{time}</div>
            <div className="text-slate-500 text-[9px]">{date}</div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────
          START MENU
      ───────────────────────────────────────────────────── */}
      {startOpen && (
        <StartMenu
          onClose={() => setStartOpen(false)}
          onSearch={(q) => {
            setSearchQuery(q);
            if (q.toLowerCase().includes("cmd") && step?.action === "keyboard") {
              completeStep(step);
              openWindow("cmd", "Command Prompt", "💻", 80, 80, 520, 320);
            }
          }}
          onLaunchApp={(appId) => {
            if (appId === "cmd") {
              openWindow("cmd", "Command Prompt", "💻", 80, 80, 520, 320);
            }
            if (appId === "settings") {
              openWindow("settings", "Settings", "⚙️", 140, 100, 560, 365);
            }
          }}
        />
      )}

      {/* ─────────────────────────────────────────────────────
          OPEN WINDOWS
      ───────────────────────────────────────────────────── */}
      {openWindows.map((win) => {
        let content: React.ReactNode = null;
        if (win.id === "recycle-bin") {
          content = (
            <div className="space-y-2">
              <p className="text-slate-400 text-center py-8">Recycle Bin is empty.</p>
            </div>
          );
        } else if (win.id === "file-explorer") {
          content = (
            <div className="space-y-1">
              {["Desktop", "Downloads", "Documents", "Pictures", "Music"].map((f) => (
                <div key={f} className="flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded-lg cursor-pointer">
                  <span>📁</span><span className="text-xs">{f}</span>
                </div>
              ))}
            </div>
          );
        } else if (win.id === "cmd") {
          content = <CmdWindowContent />;
        } else if (win.id === "settings") {
          content = <SettingsWindowContent />;
        } else if (win.id === "task-manager") {
          content = <TaskManagerContent />;
        }

        return (
          <DesktopWindow key={win.id} win={win} onClose={closeWindow}>
            {content}
          </DesktopWindow>
        );
      })}

      {/* ── Virtual On-Screen Keyboard ── */}
      {step?.action === "keyboard" && (
        <div className="fixed bottom-14 right-4 z-[400] bg-[#0d1b2a]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl max-w-sm w-80 font-sans">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-black text-[10px] uppercase tracking-wider">On-Screen Keyboard Helper</span>
            <span className="text-[9px] text-[#39FF14] font-bold font-sans">Press physical keys to simulate</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5 text-center font-mono">
            {/* Row 1 */}
            {["Ctrl", "Shift", "Win", "Esc", "A"].map((k) => {
              const isActive = pressedKeys.includes(k.toLowerCase());
              return (
                <div
                  key={k}
                  className={`py-2 rounded-lg text-xs font-black border transition-all select-none
                    ${isActive
                      ? "bg-[#39FF14]/20 border-[#39FF14] text-[#39FF14] shadow-[0_0_8px_rgba(57,255,20,0.4)]"
                      : "bg-white/5 border-white/10 text-slate-400"
                    }`}
                >
                  {k}
                </div>
              );
            })}
            {/* Row 2 */}
            {["S", "C", "V", "X", "Z"].map((k) => {
              const isActive = pressedKeys.includes(k.toLowerCase());
              return (
                <div
                  key={k}
                  className={`py-2 rounded-lg text-xs font-black border transition-all select-none
                    ${isActive
                      ? "bg-[#39FF14]/20 border-[#39FF14] text-[#39FF14] shadow-[0_0_8px_rgba(57,255,20,0.4)]"
                      : "bg-white/5 border-white/10 text-slate-400"
                    }`}
                >
                  {k}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Snip & Sketch Screenshot Overlay ── */}
      {snipActive && (
        <div
          onClick={() => {
            setSnipActive(false);
            if (step?.id === "shortcut-screenshot") {
              completeStep(step);
            }
          }}
          className="fixed inset-0 bg-black/70 z-[9999] flex flex-col items-center justify-center cursor-crosshair font-sans animate-fadeInFast select-none"
        >
          <div className="text-center space-y-2">
            <div className="text-3xl animate-pulse">📸</div>
            <div className="text-white font-black text-sm uppercase tracking-widest">Snip & Sketch Active</div>
            <p className="text-slate-400 text-xs max-w-xs leading-relaxed">Click and drag anywhere (or click here to finish snipping) to capture your screenshot.</p>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────
          CONTEXT MENU
      ───────────────────────────────────────────────────── */}
      {ctxMenu && (
        <div
          className="fixed z-[999] bg-[#1e2d3d]/95 backdrop-blur border border-white/10 rounded-xl shadow-2xl py-1 min-w-[180px] text-xs"
          style={{ left: ctxMenu.x, top: ctxMenu.y }}
          onClick={(e) => e.stopPropagation()}
          onContextMenu={(e) => e.preventDefault()}
        >
          {ctxMenu.items.map((item, i) =>
            item === "---" ? (
              <div key={i} className="border-t border-white/10 my-1" />
            ) : (
              <button
                key={item}
                onClick={() => {
                  if (item.includes("Change Wallpaper")) {
                    setCtxMenu(null);
                    setShowWallpapers(true);
                  } else {
                    setCtxMenu(null);
                  }
                }}
                className="w-full text-left px-4 py-2 text-slate-300 hover:bg-blue-600/40 hover:text-white transition-colors"
              >
                {item}
              </button>
            )
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────
          XP CELEBRATION FLASH
      ───────────────────────────────────────────────────── */}
      {showCelebration && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] pointer-events-none">
          <div className="bg-amber-400 text-black font-black text-3xl rounded-3xl px-10 py-5 shadow-2xl shadow-amber-500/50 animate-bounce">
            +{xpGained} XP ⭐
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────
          FEEDBACK TOAST
      ───────────────────────────────────────────────────── */}
      {feedback.type && (
        <div className={`fixed top-12 left-1/2 -translate-x-1/2 z-[9999] px-5 py-3 rounded-2xl font-bold text-sm shadow-xl max-w-sm w-[90%] text-center
          ${feedback.type === "success" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}>
          <div className="flex items-center justify-center gap-2">
            {feedback.type === "success" ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
            <span className="line-clamp-2 text-xs">{feedback.message}</span>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────
          WALLPAPER PICKER PANEL
      ───────────────────────────────────────────────────── */}
      {showWallpapers && (
        <>
          {/* Backdrop — click outside to close */}
          <div
            className="fixed inset-0 z-[499]"
            onClick={() => setShowWallpapers(false)}
          />
          <div
            className="fixed bottom-12 right-3 z-[500] bg-[#0d1b2a]/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-4 w-72"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ImageIcon size={14} className="text-purple-400" />
                <span className="text-white font-black text-xs">Choose Wallpaper</span>
              </div>
              <button onClick={() => setShowWallpapers(false)} className="text-slate-500 hover:text-white transition-colors">
                <X size={14} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {WALLPAPERS.map((wp) => {
                const isActive = wallpaperId === wp.id;
                return (
                  <button
                    key={wp.id}
                    onClick={() => changeWallpaper(wp.id)}
                    className={`relative rounded-2xl overflow-hidden h-16 border-2 transition-all hover:scale-105 active:scale-95
                      ${isActive ? "border-purple-400 shadow-lg shadow-purple-500/30" : "border-white/10 hover:border-white/30"}`}
                  >
                    {/* Wallpaper gradient thumbnail */}
                    <div className="absolute inset-0" style={wp.style} />

                    {/* XP-style grass/sky indicator */}
                    {wp.id === "xp-bliss" && (
                      <div className="absolute inset-0">
                        <div className="absolute top-0 left-0 right-0 h-[45%]" style={{ background: "linear-gradient(180deg,#4da6ff,#87ceeb)" }} />
                        <div className="absolute bottom-0 left-0 right-0 h-[55%]" style={{ background: "linear-gradient(180deg,#6ab04c,#3d7a20)" }} />
                      </div>
                    )}

                    {/* Label overlay */}
                    <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center">
                      <span className="text-lg">{wp.emoji}</span>
                      <span className="text-white font-black text-[9px] mt-0.5 drop-shadow">{wp.name}</span>
                      <span className="text-white/60 text-[8px] drop-shadow">{wp.era}</span>
                    </div>

                    {/* Active tick */}
                    {isActive && (
                      <div className="absolute top-1 right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-[8px] font-black">✓</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <p className="text-slate-600 text-[9px] text-center mt-3">
              Wallpaper saved automatically 💾
            </p>
          </div>
        </>
      )}
    </div>
  );
}
