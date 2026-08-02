"use client";

import React, { useState, useRef, useEffect } from 'react';
import { coursePhases } from '../data/courseData';
import PhaseCard from './PhaseCard';

const CourseTimeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);
  const touchStartX = useRef(0);

  const handleNext = () => {
    setHasInteracted(true);
    setHintVisible(false);
    setActiveIndex((prev) => Math.min(coursePhases.length - 1, prev + 1));
  };

  const handlePrev = () => {
    setHasInteracted(true);
    setHintVisible(false);
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const handleDotClick = (idx: number) => {
    setHasInteracted(true);
    setHintVisible(false);
    setActiveIndex(idx);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) handleNext();       // swiped left → next
    else if (diff < -50) handlePrev(); // swiped right → prev
  };

  // Keyboard navigation (left/right arrows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-hide hint after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setHintVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const currentPhase = coursePhases[activeIndex];
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === coursePhases.length - 1;

  return (
    <div className="flex-1 flex flex-col relative items-center">
      <h2 className="text-[#0f172a] dark:text-white font-black text-2xl mb-6 text-center uppercase tracking-wide">
        COMPLETE COURSE STRUCTURE
      </h2>

      <div
        className="relative w-full max-w-2xl flex flex-col rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 select-none overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* ── Navigation Bar ── */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">

          {/* ← Prev Button */}
          <button
            onClick={handlePrev}
            disabled={isFirst}
            aria-label="Previous phase"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold bg-slate-100 dark:bg-slate-700 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* Dots */}
          <div className="flex gap-1.5 items-center">
            {coursePhases.map((phase, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                title={phase.title}
                className={`rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? 'w-6 h-2.5 bg-blue-500'
                    : 'w-2.5 h-2.5 bg-gray-300 dark:bg-gray-600 hover:bg-blue-300'
                }`}
              />
            ))}
          </div>

          {/* Next → Button */}
          <button
            onClick={handleNext}
            disabled={isLast}
            aria-label="Next phase"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold bg-slate-100 dark:bg-slate-700 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
          >
            <span className="hidden sm:inline">Next</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* ── Card ── */}
        <div
          className="overflow-y-auto max-h-[520px] animate-in fade-in slide-in-from-right-4 duration-300"
          key={currentPhase.id}
        >
          <PhaseCard phase={currentPhase} onClick={() => {}} />
        </div>

        {/* ── Swipe Hint (fades in on load, disappears after interaction or 3s) ── */}
        <div
          className={`flex items-center justify-center gap-2 py-2 transition-all duration-500 ${
            hintVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Animated left arrow */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 text-blue-400 animate-[bounce_1s_infinite] rotate-90"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <span className="text-[11px] font-semibold text-gray-400 tracking-wide">
            Swipe or tap arrows to explore phases
          </span>
          {/* Animated right arrow */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 text-blue-400 animate-[bounce_1s_infinite] -rotate-90"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>

        {/* ── Progress & Counter (always visible) ── */}
        <div className="flex items-center gap-2 px-4 pb-3">
          {/* Progress bar */}
          <div className="flex-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${((activeIndex + 1) / coursePhases.length) * 100}%` }}
            />
          </div>
          <span className="text-[11px] font-bold text-gray-400 shrink-0">
            {activeIndex + 1} / {coursePhases.length}
          </span>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="bg-[#0f172a] text-white py-3 px-6 rounded-lg mb-4 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 text-sm font-bold shadow-md mt-6 mx-2 sm:mx-8 w-full max-w-2xl">
        <span>Total Duration: 34 - 45 Weeks (8 - 10 Months)</span>
        <span className="hidden sm:inline text-gray-500">|</span>
        <span>Project Based Learning</span>
        <span className="hidden sm:inline text-gray-500">|</span>
        <span className="text-yellow-400">Get Placed</span>
      </div>
    </div>
  );
};

export default CourseTimeline;
