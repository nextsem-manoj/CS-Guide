"use client";

import React from 'react';
import { useProgress } from '../context/ProgressContext';

export default function ProgressIndicator() {
  const { totalCompleted } = useProgress();
  
  if (totalCompleted === 0) return null;

  return (
    <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
      <span>🏆</span> {totalCompleted} Completed
    </div>
  );
}
