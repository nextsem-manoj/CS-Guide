"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { 
  X, ChevronLeft, ChevronRight, CheckCircle2, GitBranch, 
  ExternalLink, Sparkles, Code2, Play, Pause, ShieldCheck, ArrowRight
} from "lucide-react";
import { BcaStudentStory, BcaStorySlide, getUserInitials, getAvatarGradient } from "@/data/bcaStoriesData";

export interface BcaStoryViewerModalProps {
  stories: BcaStudentStory[];
  initialUserIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onMarkSeen?: (storyId: string) => void;
}

interface FloatingReaction {
  id: number;
  emoji: string;
  x: number;
}

const SLIDE_DURATION_MS = 5000;

export default function BcaStoryViewerModal({
  stories,
  initialUserIndex,
  isOpen,
  onClose,
  onMarkSeen
}: BcaStoryViewerModalProps) {
  const [currentUserIndex, setCurrentUserIndex] = useState(initialUserIndex);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [floatingReactions, setFloatingReactions] = useState<FloatingReaction[]>([]);
  const [kudosCount, setKudosCount] = useState<Record<string, number>>({});
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});

  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);

  // Sync initial user index when modal opens
  useEffect(() => {
    if (isOpen) {
      const validIndex = Math.max(0, Math.min(initialUserIndex, stories.length - 1));
      setCurrentUserIndex(validIndex);
      setCurrentSlideIndex(0);
      setProgress(0);
      setIsPaused(false);
      setFloatingReactions([]);
    }
  }, [isOpen, initialUserIndex, stories.length]);

  const currentStory = stories[currentUserIndex];
  const currentSlide: BcaStorySlide | undefined = currentStory?.slides?.[currentSlideIndex];

  // Mark story as seen
  useEffect(() => {
    if (isOpen && currentStory && onMarkSeen) {
      onMarkSeen(currentStory.id);
    }
  }, [isOpen, currentStory, onMarkSeen]);

  // Navigate to Next Slide or Next User Story
  const goToNext = useCallback(() => {
    if (!currentStory) return;
    if (currentSlideIndex < currentStory.slides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
      setProgress(0);
      startTimeRef.current = Date.now();
      pausedTimeRef.current = 0;
    } else if (currentUserIndex < stories.length - 1) {
      setCurrentUserIndex((prev) => prev + 1);
      setCurrentSlideIndex(0);
      setProgress(0);
      startTimeRef.current = Date.now();
      pausedTimeRef.current = 0;
    } else {
      // Completed all stories in tray
      onClose();
    }
  }, [currentStory, currentSlideIndex, currentUserIndex, stories.length, onClose]);

  // Navigate to Previous Slide or Previous User Story
  const goToPrevious = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
      setProgress(0);
      startTimeRef.current = Date.now();
      pausedTimeRef.current = 0;
    } else if (currentUserIndex > 0) {
      const prevUser = stories[currentUserIndex - 1];
      setCurrentUserIndex((prev) => prev - 1);
      setCurrentSlideIndex(prevUser.slides.length - 1);
      setProgress(0);
      startTimeRef.current = Date.now();
      pausedTimeRef.current = 0;
    } else {
      // At very beginning
      setProgress(0);
      startTimeRef.current = Date.now();
    }
  }, [currentSlideIndex, currentUserIndex, stories]);

  // Progress Bar Timer
  useEffect(() => {
    if (!isOpen || isPaused || !currentSlide) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    startTimeRef.current = Date.now() - (pausedTimeRef.current || 0);

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const currentPct = Math.min(100, (elapsed / SLIDE_DURATION_MS) * 100);
      setProgress(currentPct);

      if (elapsed >= SLIDE_DURATION_MS) {
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        goToNext();
      }
    }, 50);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isOpen, isPaused, currentSlide, goToNext]);

  // Hold to pause logic
  const handleHoldStart = () => {
    setIsPaused(true);
    pausedTimeRef.current = Date.now() - startTimeRef.current;
  };

  const handleHoldEnd = () => {
    setIsPaused(false);
  };

  // Tap navigation (Left 30% vs Right 70%)
  const handleContentTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    if (clickX < width * 0.3) {
      goToPrevious();
    } else {
      goToNext();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === " ") setIsPaused((prev) => !prev);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, goToNext, goToPrevious]);

  // Floating Reaction Emojis
  const triggerReaction = (emoji: string) => {
    if (!currentSlide) return;
    const slideId = currentSlide.id;
    setKudosCount((prev) => ({ ...prev, [slideId]: (prev[slideId] || 0) + 1 }));
    setHasLiked((prev) => ({ ...prev, [slideId]: true }));

    const newReaction: FloatingReaction = {
      id: Date.now() + Math.random(),
      emoji,
      x: 30 + Math.random() * 40
    };
    setFloatingReactions((prev) => [...prev, newReaction]);

    setTimeout(() => {
      setFloatingReactions((prev) => prev.filter((r) => r.id !== newReaction.id));
    }, 1800);
  };

  if (!isOpen || !currentStory || !currentSlide) return null;

  const currentSlideId = currentSlide.id;
  const currentKudos = kudosCount[currentSlideId] || 12;
  const isLiked = !!hasLiked[currentSlideId];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 sm:bg-black/90 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 select-none animate-in fade-in duration-200">
      {/* Background desktop backdrop click to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />

      {/* Floating Reaction Emojis Container */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        {floatingReactions.map((reaction) => (
          <div
            key={reaction.id}
            style={{ left: `${reaction.x}%` }}
            className="absolute bottom-24 text-3xl sm:text-4xl animate-story-float"
          >
            {reaction.emoji}
          </div>
        ))}
      </div>

      {/* Story Player Container */}
      <div 
        className="w-full h-full sm:h-[90vh] sm:max-w-md sm:rounded-3xl bg-neutral-950 flex flex-col justify-between overflow-hidden relative shadow-2xl border-0 sm:border sm:border-neutral-800"
        onMouseDown={handleHoldStart}
        onMouseUp={handleHoldEnd}
        onTouchStart={handleHoldStart}
        onTouchEnd={handleHoldEnd}
      >
        {/* Top Progress Segmented Bars */}
        <div className="absolute top-0 left-0 right-0 z-30 pt-3 px-3 pb-2 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
          <div className="flex items-center gap-1.5 w-full">
            {currentStory.slides.map((slide, idx) => {
              let fillWidth = "0%";
              if (idx < currentSlideIndex) fillWidth = "100%";
              else if (idx === currentSlideIndex) fillWidth = `${progress}%`;

              return (
                <div 
                  key={slide.id} 
                  className="flex-1 h-1 rounded-full bg-white/25 overflow-hidden backdrop-blur-sm cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlideIndex(idx);
                    setProgress(0);
                  }}
                >
                  <div 
                    className="h-full bg-white transition-all duration-75 ease-linear rounded-full"
                    style={{ width: fillWidth }}
                  />
                </div>
              );
            })}
          </div>

          {/* Story Header */}
          <div className="flex items-center justify-between mt-2.5">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                {currentStory.userAvatar ? (
                  <img
                    src={currentStory.userAvatar}
                    alt={currentStory.userName}
                    className="w-9 h-9 rounded-full object-cover border-2 border-white/80 shadow-md"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = "none";
                      const fb = document.getElementById(`modal-fb-${currentStory.id}`);
                      if (fb) fb.classList.remove("hidden");
                    }}
                  />
                ) : null}
                <div 
                  id={`modal-fb-${currentStory.id}`}
                  className={`w-9 h-9 rounded-full ${getAvatarGradient(currentStory.userName)} flex items-center justify-center font-bold text-white text-xs border border-white/80 ${currentStory.userAvatar ? "hidden" : "flex"}`}
                >
                  {getUserInitials(currentStory.userName)}
                </div>
                {currentStory.isVerified && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center text-[9px] text-white border border-black">
                    ✓
                  </div>
                )}
              </div>

              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white hover:underline cursor-pointer">
                    {currentStory.userName}
                  </span>
                  <span className="text-xs text-white/60 font-mono">
                    @{currentStory.userHandle}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-white/70">
                  <span className="font-semibold text-blue-400">Day {currentSlide.day}</span>
                  <span>•</span>
                  <span>{currentSlide.timestamp}</span>
                  {isPaused && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full text-white/90">
                      Paused
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPaused((prev) => !prev);
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                title={isPaused ? "Resume" : "Pause"}
              >
                {isPaused ? <Play size={14} /> : <Pause size={14} />}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Center Tap Navigation & Slide Visual Content */}
        <div 
          className="relative flex-1 flex flex-col justify-center px-5 pt-20 pb-28 cursor-pointer overflow-y-auto"
          onClick={handleContentTap}
        >
          {/* Subtle gradient aura backdrop */}
          <div className={`absolute inset-0 bg-gradient-to-br ${currentSlide.gradientTheme} opacity-40 -z-10`} />

          {/* Left / Right Screen Tap Indicators */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/80 transition-colors hidden sm:block">
            <ChevronLeft size={28} />
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/80 transition-colors hidden sm:block">
            <ChevronRight size={28} />
          </div>

          {/* Story Card Content */}
          <div 
            className="w-full bg-neutral-900/90 backdrop-blur-xl border border-white/15 rounded-3xl p-5 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Milestone Badge */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black tracking-wide shadow-md">
                <Sparkles size={13} className="text-amber-300" />
                DAY {currentSlide.day} COMPLETED
              </div>

              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
                <CheckCircle2 size={12} />
                {currentSlide.vivaScore}
              </div>
            </div>

            {/* Lesson Title */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                {currentSlide.lessonTitle}
              </h2>
              <p className="text-xs text-white/60 font-mono mt-0.5">
                BCA Practical Portal • NextSem
              </p>
            </div>

            {/* Student's Custom Caption / Update */}
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-sm text-neutral-200 leading-relaxed font-sans">
              <span className="text-blue-400 font-bold mr-1.5">@{currentStory.userHandle}:</span>
              {currentSlide.caption}
            </div>

            {/* Code Snippet Highlight (if available) */}
            {currentSlide.codeSnippetPreview && (
              <div className="rounded-2xl bg-black/80 border border-neutral-800 p-3 font-mono text-[11px] text-emerald-400 overflow-x-hidden shadow-inner">
                <div className="text-[10px] text-white/40 pb-1 mb-1 border-b border-white/10 flex items-center justify-between">
                  <span>verified-solution.html</span>
                  <Code2 size={12} className="text-white/40" />
                </div>
                <pre className="whitespace-pre-wrap break-words break-all sm:break-words overflow-x-hidden">{currentSlide.codeSnippetPreview}</pre>
              </div>
            )}

            {/* GitHub Verification Card */}
            <div className="rounded-2xl bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 p-3.5 space-y-2.5">
              <div className="flex items-center justify-between text-xs text-white/80">
                <div className="flex items-center gap-1.5 font-bold">
                  <GitBranch size={14} className="text-blue-400" />
                  <span>GitHub Repository</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <ShieldCheck size={12} /> Verified Code
                </span>
              </div>

              <div className="text-xs font-mono text-neutral-300 break-all bg-neutral-950 p-2 rounded-xl border border-neutral-800/80">
                {currentSlide.githubRepoUrl}
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href={currentSlide.githubRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white text-black font-extrabold text-xs hover:bg-neutral-200 transition-all shadow-sm active:scale-95"
                >
                  <ExternalLink size={13} />
                  Inspect Code
                </a>

                {currentSlide.liveDemoUrl && (
                  <a
                    href={currentSlide.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 text-white font-extrabold text-xs hover:bg-blue-500 transition-all shadow-sm active:scale-95"
                  >
                    <span>🌐 Live Page</span>
                  </a>
                )}
              </div>
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {currentSlide.techTags.map((tag) => (
                <span 
                  key={tag} 
                  className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-white/80 border border-white/10"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Direct CTA: Practice This Lesson */}
            <Link
              href={`/bca/practical/day-${currentSlide.day}`}
              onClick={onClose}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-blue-600/30 hover:bg-blue-600/40 border border-blue-500/40 text-blue-300 font-bold text-xs transition-all"
            >
              <span>Practice Day {currentSlide.day} Lesson</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Bottom Reactions & Kudos Dock */}
        <div className="absolute bottom-0 left-0 right-0 z-30 p-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent">
          <div className="flex items-center justify-between gap-2 max-w-sm mx-auto">
            {/* Quick Reaction Emojis */}
            <div className="flex items-center gap-1.5">
              {[
                { emoji: "❤️", name: "Love" },
                { emoji: "🔥", name: "Fire" },
                { emoji: "👏", name: "Clap" },
                { emoji: "🚀", name: "Rocket" },
                { emoji: "💯", name: "100" }
              ].map(({ emoji, name }) => (
                <button
                  key={emoji}
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerReaction(emoji);
                  }}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-125 transition-all flex items-center justify-center text-lg shadow-sm"
                  title={`React ${name}`}
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Kudos Counter Badge */}
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white text-xs font-bold font-mono">
              <span className={isLiked ? "text-rose-500 animate-pulse" : "text-white"}>❤️</span>
              <span>{currentKudos}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
