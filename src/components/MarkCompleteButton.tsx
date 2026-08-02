"use client";

import React from 'react';
import { useProgress } from '../context/ProgressContext';
import { CheckCircle, Lock } from 'lucide-react';
import { AdMob } from '@capacitor-community/admob';
import { useRouter } from 'next/navigation';
import searchIndex from '../data/searchIndex.json';

export default function MarkCompleteButton({ chapterId, hasAssignment }: { chapterId: string, hasAssignment?: boolean }) {
  const { completedChapters, markCompleted, markIncomplete, completedAssignments } = useProgress();
  const isCompleted = completedChapters[chapterId];
  const isAssignmentDone = !hasAssignment || (completedAssignments && completedAssignments[chapterId]);
  const router = useRouter();

  const prepareAd = async () => {
    try {
      await AdMob.prepareInterstitial({
        adId: 'ca-app-pub-4242865347895866/7073253343', // Production AdMob Interstitial ID
        isTesting: false
      });
    } catch (e) {
      console.error("Failed to prepare AdMob Interstitial ad:", e);
    }
  };

  React.useEffect(() => {
    const isNative = typeof window !== 'undefined' &&
      (window as unknown as { Capacitor?: { isNativePlatform: () => boolean } }).Capacitor?.isNativePlatform();
    if (isNative) {
      prepareAd();
    }
  }, []);

  const toggleCompletion = async () => {
    if (!isAssignmentDone) {
      // Trigger user feedback
      alert("Please complete the Practice Assignment above and click 'Mark Assignment as Done' before marking the lesson as complete!");
      return;
    }

    if (isCompleted) {
      markIncomplete(chapterId);
    } else {
      const isNative = typeof window !== 'undefined' &&
        (window as unknown as { Capacitor?: { isNativePlatform: () => boolean } }).Capacitor?.isNativePlatform();
      if (isNative) {
        try {
          await AdMob.showInterstitial();
        } catch (e) {
          console.error("Failed to show AdMob Interstitial ad:", e);
        }
      }

      markCompleted(chapterId);
      // Trigger the rating popup
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('trigger-rate-prompt'));
      }

      if (isNative) {
        prepareAd(); // Pre-load another ad for the next lesson
      }

      // Auto-navigate to the next lesson or dashboard after a short delay
      const currentIndex = searchIndex.findIndex((item) => item.id === chapterId);
      if (currentIndex >= 0 && currentIndex < searchIndex.length - 1) {
        const nextChapter = searchIndex[currentIndex + 1];
        setTimeout(() => {
          router.push(`/book/${nextChapter.id}`);
        }, 1500);
      } else {
        setTimeout(() => {
          router.push('/');
        }, 1500);
      }
    }
  };

  return (
    <div className="mt-8 flex flex-col items-center justify-center border-t border-gray-200 dark:border-slate-800 pt-8 gap-3">
      <button 
        onClick={toggleCompletion}
        disabled={!isAssignmentDone && !isCompleted}
        className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-md transition-all duration-300 ${
          isCompleted 
            ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer' 
            : !isAssignmentDone
              ? 'bg-slate-800/80 text-slate-500 border border-slate-700/60 cursor-not-allowed opacity-60'
              : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-blue-500/20'
        }`}
      >
        {isCompleted ? (
          <CheckCircle size={20} className="text-white" />
        ) : !isAssignmentDone ? (
          <Lock size={18} className="text-slate-500" />
        ) : (
          <CheckCircle size={20} className="text-white/80" />
        )}
        {isCompleted 
          ? 'Completed!' 
          : !isAssignmentDone 
            ? 'Lesson Locked (Finish Assignment First)' 
            : 'Mark Lesson as Complete'}
      </button>
      
      {!isAssignmentDone && !isCompleted && (
        <span className="text-xs text-rose-400 font-medium animate-pulse">
          🔒 Complete the Practice Assignment above to unlock completion.
        </span>
      )}
    </div>
  );
}
