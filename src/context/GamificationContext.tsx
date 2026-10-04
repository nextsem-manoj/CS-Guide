"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { Heart, Flame, Star, Zap, Trophy, X } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GamificationState {
  hearts: number;
  maxHearts: number;
  streakDays: number;
  lastActivityDate: string | null;
  points: number;
  level: number;
  xp: number;
  xpToNextLevel: number;
  badges: string[];
}

export interface GamificationContextType extends GamificationState {
  loseHeart: () => void;
  gainHeart: (count?: number) => void;
  addPoints: (amount: number, reason?: string) => void;
  addXp: (amount: number) => void;
  recordActivity: () => void;
  awardBadge: (badge: string) => void;
  hasBadge: (badge: string) => boolean;
  resetHearts: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_HEARTS = 5;
const STORAGE_KEY = "csguide_gamification_v1";

const XP_PER_LEVEL = [0, 100, 250, 500, 900, 1400, 2000, 2800, 3800, 5000];

function getLevelFromXp(xp: number): { level: number; xpToNext: number } {
  let level = 1;
  for (let i = 0; i < XP_PER_LEVEL.length; i++) {
    if (xp >= XP_PER_LEVEL[i]) level = i + 1;
    else break;
  }
  const nextThreshold = XP_PER_LEVEL[level] ?? XP_PER_LEVEL[XP_PER_LEVEL.length - 1];
  const currentThreshold = XP_PER_LEVEL[level - 1] ?? 0;
  const xpToNext = nextThreshold - xp;
  return { level: Math.min(level, 10), xpToNext: Math.max(0, xpToNext) };
}

function isSameDay(dateA: string, dateB: string) {
  return dateA.slice(0, 10) === dateB.slice(0, 10);
}

function isConsecutiveDay(lastDate: string, today: string) {
  const last = new Date(lastDate);
  const now = new Date(today);
  last.setDate(last.getDate() + 1);
  return last.toDateString() === now.toDateString();
}

// ─── Default State ────────────────────────────────────────────────────────────

const defaultState: GamificationState = {
  hearts: MAX_HEARTS,
  maxHearts: MAX_HEARTS,
  streakDays: 0,
  lastActivityDate: null,
  points: 0,
  level: 1,
  xp: 0,
  xpToNextLevel: XP_PER_LEVEL[1],
  badges: [],
};

// ─── Context ──────────────────────────────────────────────────────────────────

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

// ─── Toast Notification ───────────────────────────────────────────────────────

interface ToastProps {
  message: string;
  icon: ReactNode;
  color: string;
  onClose: () => void;
}

function GamificationToast({ message, icon, color, onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-24 md:bottom-6 right-4 z-[9999] flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border backdrop-blur-md animate-in slide-in-from-bottom-4 duration-300 ${color}`}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-bold">{message}</span>
      <button onClick={onClose} className="ml-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
        <X size={14} />
      </button>
    </div>
  );
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function GamificationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GamificationState>(defaultState);
  const [toast, setToast] = useState<{ message: string; icon: ReactNode; color: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: GamificationState = JSON.parse(raw);
        // Rehydrate hearts over time (1 heart per 30 min, max 5)
        const now = new Date();
        const last = saved.lastActivityDate ? new Date(saved.lastActivityDate) : now;
        const diffMinutes = Math.floor((now.getTime() - last.getTime()) / 60000);
        const heartsRegained = Math.min(Math.floor(diffMinutes / 30), MAX_HEARTS - saved.hearts);
        setState({
          ...saved,
          hearts: Math.min(saved.hearts + heartsRegained, MAX_HEARTS),
        });
      }
    } catch {
      setState(defaultState);
    }
  }, []);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, mounted]);

  const showToast = useCallback(
    (message: string, icon: ReactNode, color: string) => {
      setToast({ message, icon, color });
    },
    []
  );

  const loseHeart = useCallback(() => {
    setState((prev) => {
      const newHearts = Math.max(0, prev.hearts - 1);
      if (newHearts === 0) {
        showToast("💔 No hearts left! Complete a review to restore.", <Heart size={16} />, "bg-red-950/90 border-red-500/40 text-red-200");
      } else {
        showToast(`❤️ ${newHearts} heart${newHearts === 1 ? "" : "s"} remaining`, <Heart size={16} />, "bg-rose-950/90 border-rose-500/40 text-rose-200");
      }
      return { ...prev, hearts: newHearts };
    });
  }, [showToast]);

  const gainHeart = useCallback(
    (count = 1) => {
      setState((prev) => {
        const newHearts = Math.min(prev.hearts + count, MAX_HEARTS);
        showToast(`❤️ +${count} Heart${count > 1 ? "s" : ""} restored!`, <Heart size={16} />, "bg-emerald-950/90 border-emerald-500/40 text-emerald-200");
        return { ...prev, hearts: newHearts };
      });
    },
    [showToast]
  );

  const resetHearts = useCallback(() => {
    setState((prev) => ({ ...prev, hearts: MAX_HEARTS }));
    showToast("❤️ Hearts fully restored!", <Heart size={16} />, "bg-emerald-950/90 border-emerald-500/40 text-emerald-200");
  }, [showToast]);

  const addPoints = useCallback(
    (amount: number, reason?: string) => {
      setState((prev) => ({ ...prev, points: prev.points + amount }));
      showToast(`⭐ +${amount} Points${reason ? ` — ${reason}` : ""}`, <Star size={16} />, "bg-yellow-950/90 border-yellow-500/40 text-yellow-200");
    },
    [showToast]
  );

  const addXp = useCallback(
    (amount: number) => {
      setState((prev) => {
        const newXp = prev.xp + amount;
        const { level, xpToNext } = getLevelFromXp(newXp);
        const leveledUp = level > prev.level;
        if (leveledUp) {
          showToast(`🏆 Level Up! You're now Level ${level}!`, <Trophy size={16} />, "bg-indigo-950/90 border-indigo-500/40 text-indigo-200");
        } else {
          showToast(`⚡ +${amount} XP`, <Zap size={16} />, "bg-cyan-950/90 border-cyan-500/40 text-cyan-200");
        }
        return { ...prev, xp: newXp, level, xpToNextLevel: xpToNext };
      });
    },
    [showToast]
  );

  const recordActivity = useCallback(() => {
    setState((prev) => {
      const today = new Date().toISOString();
      if (!prev.lastActivityDate) {
        showToast("🔥 Daily Streak Started! Day 1", <Flame size={16} />, "bg-orange-950/90 border-orange-500/40 text-orange-200");
        return { ...prev, streakDays: 1, lastActivityDate: today };
      }
      if (isSameDay(prev.lastActivityDate, today)) {
        return { ...prev, lastActivityDate: today };
      }
      if (isConsecutiveDay(prev.lastActivityDate, today)) {
        const newStreak = prev.streakDays + 1;
        showToast(`🔥 Streak Extended! ${newStreak} Days!`, <Flame size={16} />, "bg-orange-950/90 border-orange-500/40 text-orange-200");
        return { ...prev, streakDays: newStreak, lastActivityDate: today };
      }
      showToast("🔥 Streak Reset — Day 1", <Flame size={16} />, "bg-orange-950/90 border-orange-500/40 text-orange-200");
      return { ...prev, streakDays: 1, lastActivityDate: today };
    });
  }, [showToast]);

  const awardBadge = useCallback(
    (badge: string) => {
      setState((prev) => {
        if (prev.badges.includes(badge)) return prev;
        showToast(`🎖️ New Badge Unlocked: ${badge}`, <Trophy size={16} />, "bg-amber-950/90 border-amber-500/40 text-amber-200");
        return { ...prev, badges: [...prev.badges, badge] };
      });
    },
    [showToast]
  );

  const hasBadge = useCallback((badge: string) => state.badges.includes(badge), [state.badges]);

  return (
    <GamificationContext.Provider
      value={{
        ...state,
        loseHeart,
        gainHeart,
        addPoints,
        addXp,
        recordActivity,
        awardBadge,
        hasBadge,
        resetHearts,
      }}
    >
      {children}
      {toast && (
        <GamificationToast
          message={toast.message}
          icon={toast.icon}
          color={toast.color}
          onClose={() => setToast(null)}
        />
      )}
    </GamificationContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useGamification(): GamificationContextType {
  const ctx = useContext(GamificationContext);
  if (!ctx) {
    throw new Error("useGamification must be used within a GamificationProvider");
  }
  return ctx;
}
