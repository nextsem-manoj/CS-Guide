"use client";

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import Link from 'next/link';
import { Sparkles, CheckCircle2, ArrowRight, X } from 'lucide-react';
import searchIndex from '../data/searchIndex.json';

interface ProgressContextType {
  completedChapters: Record<string, boolean>;
  markCompleted: (chapterId: string) => void;
  markIncomplete: (chapterId: string) => void;
  totalCompleted: number;
  completedAssignments: Record<string, boolean>;
  markAssignmentComplete: (chapterId: string) => void;
  markAssignmentIncomplete: (chapterId: string) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const MOTIVATIONAL_QUOTES = [
  "Every line of code you write is a step closer to your dream role. Keep building! 🚀",
  "Every master was once a beginner who refused to quit. Congratulations! 🎓",
  "The secret of getting ahead is getting started. You're officially making progress! ⚡",
  "Great frontend developers shape how the world interacts with information. You're doing great! 🌐",
  "Stuck code is just a puzzle waiting for your logic. Congratulations on finishing this lesson! 🧩",
  "Clean code is not written in one go; it is built page by page. Excellent job! ✍️",
  "You just unlocked another piece of the web developer skillset. Keep pushing forward! 🔥"
];

interface ConfettiParticle {
  x: number;
  y: number;
  r: number;
  d: number;
  color: string;
  tilt: number;
  tiltAngleIncremental: number;
  tiltAngle: number;
}

// Pure HTML Canvas Confetti Particle System
const ConfettiCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];
    const particles: ConfettiParticle[] = [];

    // Initialize particles
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        r: Math.random() * 4 + 3,
        d: Math.random() * height,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngleIncremental: Math.random() * 0.07 + 0.02,
        tiltAngle: 0,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.x += Math.sin(p.tiltAngle);
        p.tilt = Math.sin(p.tiltAngle - idx / 3) * 15;

        // Draw particle
        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();

        // Reset particles that fall off bottom
        if (p.y > height) {
          particles[idx] = {
            ...p,
            x: Math.random() * width,
            y: -20,
            tilt: Math.random() * 10 - 5,
          };
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[1050]" />;
};

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [completedChapters, setCompletedChapters] = useState<Record<string, boolean>>({});
  const [completedAssignments, setCompletedAssignments] = useState<Record<string, boolean>>({});
  const [userEmail, setUserEmail] = useState<string>("guest");
  const [isLoaded, setIsLoaded] = useState(false);

  // Celebration States
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationTitle, setCelebrationTitle] = useState("");
  const [celebrationQuote, setCelebrationQuote] = useState("");
  const [nextChapterUrl, setNextChapterUrl] = useState<string | null>(null);

  // Sync user status on mount and when authentication changes
  useEffect(() => {
    const handleAuth = () => {
      const savedUser = localStorage.getItem('nextsem_user');
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          setUserEmail(parsed.email || "guest");
        } catch (e) {
          setUserEmail("guest");
        }
      } else {
        setUserEmail("guest");
      }
    };
    handleAuth();
    window.addEventListener("nextsem_auth_changed", handleAuth);
    return () => window.removeEventListener("nextsem_auth_changed", handleAuth);
  }, []);

  // Load progress when userEmail changes or on mount
  useEffect(() => {
    const key = `nextsem-progress:${userEmail}`;
    const assignKey = `nextsem-assignments:${userEmail}`;
    const savedProgress = localStorage.getItem(key);
    const savedAssign = localStorage.getItem(assignKey);
    
    let chapters: Record<string, boolean> = {};
    let assignments: Record<string, boolean> = {};

    if (savedProgress) {
      try {
        chapters = JSON.parse(savedProgress);
      } catch (e) {
        chapters = {};
      }
    } else {
      // Migrate old progress key if migrating guest user
      if (userEmail === "guest") {
        const oldProgress = localStorage.getItem('nextsem-progress');
        if (oldProgress) {
          try {
            const parsed = JSON.parse(oldProgress);
            chapters = parsed;
            localStorage.setItem(key, oldProgress);
          } catch (e) {
            chapters = {};
          }
        } else {
          chapters = {};
        }
      } else {
        chapters = {};
      }
    }

    if (savedAssign) {
      try {
        assignments = JSON.parse(savedAssign);
      } catch (e) {
        assignments = {};
      }
    } else {
      assignments = {};
    }

    /* eslint-disable react-hooks/set-state-in-effect */
    setCompletedChapters(chapters);
    setCompletedAssignments(assignments);
    setIsLoaded(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [userEmail]);

  // Save progress to key specific to the current logged-in user
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(`nextsem-progress:${userEmail}`, JSON.stringify(completedChapters));
      localStorage.setItem(`nextsem-assignments:${userEmail}`, JSON.stringify(completedAssignments));
    }
  }, [completedChapters, completedAssignments, userEmail, isLoaded]);

  const markCompleted = (chapterId: string) => {
    setCompletedChapters((prev) => ({ ...prev, [chapterId]: true }));

    // Find completed chapter and prepare congratulations quote
    const currentChapter = searchIndex.find(c => c.id === chapterId);
    const currentIndex = searchIndex.findIndex(c => c.id === chapterId);
    const nextChapter = currentIndex !== -1 && currentIndex < searchIndex.length - 1
      ? searchIndex[currentIndex + 1]
      : null;

    if (currentChapter) {
      setCelebrationTitle(currentChapter.title);
      const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
      setCelebrationQuote(randomQuote);
      
      if (nextChapter) {
        setNextChapterUrl(`/book/${nextChapter.id}`);
      } else {
        setNextChapterUrl(null);
      }
      setShowCelebration(true);
    }
  };

  const markIncomplete = (chapterId: string) => {
    setCompletedChapters((prev) => {
      const newState = { ...prev };
      delete newState[chapterId];
      return newState;
    });
  };

  const markAssignmentComplete = (chapterId: string) => {
    setCompletedAssignments((prev) => ({ ...prev, [chapterId]: true }));
  };

  const markAssignmentIncomplete = (chapterId: string) => {
    setCompletedAssignments((prev) => {
      const newState = { ...prev };
      delete newState[chapterId];
      return newState;
    });
  };

  const totalCompleted = Object.values(completedChapters).filter(Boolean).length;

  return (
    <ProgressContext.Provider value={{ 
      completedChapters, 
      markCompleted, 
      markIncomplete, 
      totalCompleted,
      completedAssignments,
      markAssignmentComplete,
      markAssignmentIncomplete
    }}>
      {children}

      {/* Confetti & Congratulations Motivational Popup Overlay */}
      {showCelebration && (
        <>
          <ConfettiCanvas />
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[1060] flex items-center justify-center p-4 select-none animate-in fade-in duration-200">
            <div className="bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-emerald-500/20 p-[1px] rounded-3xl shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-200">
              <div className="bg-[#0b0f19] rounded-[23px] p-6 md:p-8 text-center space-y-6 relative overflow-hidden text-white">
                <div className="absolute -right-16 -top-16 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Close Button */}
                <button
                  onClick={() => setShowCelebration(false)}
                  className="absolute right-4 top-4 p-1.5 bg-slate-900 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white cursor-pointer"
                >
                  <X size={16} />
                </button>

                <div className="flex justify-center">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 size={28} className="animate-bounce" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="block text-[10px] font-black uppercase text-emerald-400 tracking-widest">Chapter Completed!</span>
                  <h3 className="text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 uppercase tracking-wide">
                    {celebrationTitle}
                  </h3>
                </div>

                {/* Quote Display */}
                <div className="py-4 px-4 bg-[#050811] border border-slate-900 rounded-2xl relative">
                  <span className="absolute -top-3.5 left-4 px-2 bg-[#0b0f19] text-[9px] font-black uppercase text-slate-500 tracking-wider">
                    Motivational Spark
                  </span>
                  <p className="text-xs md:text-sm text-slate-350 italic font-medium leading-relaxed">
                    “{celebrationQuote}”
                  </p>
                </div>

                {/* Navigation CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => setShowCelebration(false)}
                    className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-black uppercase tracking-wider text-slate-300 transition-all cursor-pointer hover:scale-[1.02] active:scale-98"
                  >
                    Keep Learning
                  </button>
                  {nextChapterUrl ? (
                    <Link
                      href={nextChapterUrl}
                      onClick={() => setShowCelebration(false)}
                      className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-500 hover:to-indigo-550 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg hover:scale-[1.02] active:scale-98"
                    >
                      <span>Next Chapter</span>
                      <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <Link
                      href="/profile"
                      onClick={() => setShowCelebration(false)}
                      className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-650 hover:from-emerald-500 hover:to-teal-550 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg hover:scale-[1.02] active:scale-98"
                    >
                      <span>Classroom View</span>
                      <Sparkles size={14} className="text-amber-400" />
                    </Link>
                  )}
                </div>

              </div>
            </div>
          </div>
        </>
      )}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
