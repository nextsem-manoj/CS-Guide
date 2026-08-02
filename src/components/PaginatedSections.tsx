"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, BookOpen, Check, FileText, Sparkles, Loader2 } from "lucide-react";
import PracticeAssignment from "./PracticeAssignment";
import MarkCompleteButton from "./MarkCompleteButton";
import ChapterTips from "./ChapterTips";
import BookPagination from "./BookPagination";
import AdSenseBanner from "./AdSenseBanner";
import { AdMob } from "@capacitor-community/admob";
import { generateAndDownloadLessonPdf } from '../lib/pdfHelper';


interface PaginatedSectionsProps {
  slides: React.ReactNode[];
  hasAssignment: boolean;
  chapterId: string;
  instructions: string[];
}

export default function PaginatedSections({
  slides,
  hasAssignment,
  chapterId,
  instructions,
}: PaginatedSectionsProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState("");

  const handlePdfDownload = async () => {
    const isNative = typeof window !== 'undefined' &&
      (window as any).Capacitor?.isNativePlatform();

    if (isNative) {
      setIsDownloading(true);
      setDownloadStatus("Preparing Ad...");
      try {
        // Prepare Rewarded Video Ad
        await AdMob.prepareRewardVideoAd({
          adId: 'ca-app-pub-4242865347895866/5641573985', // Production AdMob Rewarded Ad ID
          isTesting: false
        });

        // Setup event listener for reward
        let rewardEarned = false;
        const rewardListener = await AdMob.addListener('rewardedVideoReward' as any, () => {
          rewardEarned = true;
        });

        const closeListener = await AdMob.addListener('rewardedVideoClosed' as any, () => {
          // Clean up listeners
          rewardListener.remove();
          closeListener.remove();
          
          setIsDownloading(false);
          if (rewardEarned) {
            triggerPdfPrint();
          } else {
            alert("You must watch the full sponsored ad to unlock the PDF download!");
          }
        });

        // Show Ad
        await AdMob.showRewardVideoAd();
      } catch (e) {
        console.error("AdMob Rewarded Ad failed:", e);
        setIsDownloading(false);
        // Fallback: if ad fails to load/show, let them download anyway
        triggerPdfPrint();
      }
    } else {
      // Web simulation
      setIsDownloading(true);
      setDownloadStatus("Loading Ad...");
      setTimeout(() => {
        setDownloadStatus("Watching Ad (2s)...");
        setTimeout(() => {
          setIsDownloading(false);
          triggerPdfPrint();
        }, 2000);
      }, 1000);
    }
  };

  const triggerPdfPrint = () => {
    if (typeof window !== 'undefined') {
      const container = document.querySelector("article") || document.querySelector("main") || document.body;
      const lessonText = container ? container.innerText : "Lesson content loaded.";
      generateAndDownloadLessonPdf({
        title: `Lesson ${chapterId}`,
        courseName: "Textbook Lesson Guide",
        content: lessonText
      });
    }
  };


  // Scroll to top of the reading container when slide changes
  useEffect(() => {
    const container = document.querySelector(".in-book-mode main div.overflow-y-auto") || document.querySelector("main div.overflow-y-auto");
    if (container) {
      container.scrollTop = 0;
    }
  }, [activeSlide]);

  if (!slides || slides.length === 0) return null;

  const isLastSlide = activeSlide === slides.length - 1;
  const progressPercent = ((activeSlide + 1) / slides.length) * 100;

  return (
    <div className="animate-in fade-in duration-500 space-y-6 pb-4">
      {/* Slide Deck Container */}
      <div className="w-full bg-[#0a1120]/75 backdrop-blur-xl border border-slate-850 rounded-[2rem] shadow-2xl transition-all duration-300">
        
        {/* Card Header: Progress Bar — sticky at top */}
        <div className="sticky top-0 z-10 rounded-t-[2rem] overflow-hidden bg-[#0a1120]/95 backdrop-blur-xl">
          <div className="relative w-full h-1.5 bg-slate-900/40">
            <div 
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-300 shadow-[0_0_8px_rgba(52,211,153,0.3)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Card Info Bar */}
          <div className="px-6 pt-4 pb-2 flex items-center justify-between border-b border-slate-800/40 text-slate-400 text-xs font-bold">
            <div className="flex items-center gap-1.5 text-blue-400">
              <BookOpen size={14} />
              <span>LESSON SLIDES</span>
            </div>
            <div className="bg-slate-800/60 px-3 py-1 rounded-full text-slate-300 font-mono">
              {activeSlide + 1} / {slides.length}
            </div>
          </div>
        </div>

        {/* Card Body: Active Slide Content */}
        <div className="px-6 py-6 md:px-8 md:py-8 min-h-[220px] max-w-none">
          <article className="prose prose-slate dark:prose-invert prose-blue max-w-none text-[15px] leading-relaxed">
            {slides[activeSlide]}
          </article>
        </div>

        {/* Card Footer: Navigation Actions */}
        <div className="px-6 py-4 border-t border-slate-800/40 bg-slate-900/20 flex flex-col sm:flex-row justify-between items-center gap-3">
          
          {/* Back Button */}
          <button
            onClick={() => setActiveSlide((prev) => Math.max(0, prev - 1))}
            disabled={activeSlide === 0}
            className="w-full sm:w-auto px-4 py-2 text-xs font-black rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:hover:bg-slate-900 disabled:hover:text-slate-300 transition-all flex items-center justify-center gap-1 active:scale-95"
          >
            <ChevronLeft size={14} className="stroke-[3]" /> PREV
          </button>

          {/* Dot Indicators */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === activeSlide ? "w-6 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" : "w-2 bg-slate-800 hover:bg-slate-700"}`}
                title={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Next/Finish Button */}
          {activeSlide < slides.length - 1 ? (
            <button
              onClick={() => setActiveSlide((prev) => Math.min(slides.length - 1, prev + 1))}
              className="w-full sm:w-auto px-5 py-2 text-xs font-black rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all flex items-center justify-center gap-1 active:scale-95 shadow-lg shadow-blue-600/25"
            >
              NEXT <ChevronRight size={14} className="stroke-[3]" />
            </button>
          ) : (
            <div className="w-full sm:w-auto px-5 py-2 text-xs font-black rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center gap-1 cursor-default animate-pulse">
              <Check size={14} className="stroke-[3]" /> COMPLETED
            </div>
          )}
        </div>

      </div>

      {/* Rewarded Ad PDF Download Option */}
      <div className="w-full flex justify-center pt-2">
        <button
          onClick={handlePdfDownload}
          disabled={isDownloading}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-xs bg-slate-900 border border-slate-850 hover:border-indigo-500/50 hover:bg-slate-850 text-indigo-400 hover:text-white transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          {isDownloading ? (
            <>
              <Loader2 size={14} className="animate-spin text-indigo-400" />
              <span>{downloadStatus}</span>
            </>
          ) : (
            <>
              <FileText size={14} />
              <span>Download Lesson PDF</span>
              <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-[8px] font-black tracking-wider uppercase animate-pulse">
                <Sparkles size={8} /> Watch Ad
              </span>
            </>
          )}
        </button>
      </div>


      <AdSenseBanner />

      {/* Gamification widgets loaded once they finish all slides */}
      {isLastSlide && (
        <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ChapterTips chapterId={chapterId} />

          {hasAssignment && (
            <div className="border-t border-slate-800/60 pt-6">
              <PracticeAssignment chapterId={chapterId} instructions={instructions} />
            </div>
          )}

          <div className="border-t border-slate-800/60 pt-6">
            <MarkCompleteButton chapterId={chapterId} hasAssignment={hasAssignment} />
          </div>

          <BookPagination />
        </div>
      )}

      {/* Hidden print container containing all slides of the current lesson */}
      <div id="print-section" className="hidden prose prose-slate dark:prose-invert max-w-none text-left">
        <div className="mb-6 border-b pb-4">
          <h1 className="text-3xl font-black text-slate-900">Nextsem Academy</h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Lesson: {chapterId}</p>
        </div>
        {slides.map((slide, idx) => (
          <div key={idx} className="mb-10 pb-10 border-b border-slate-100 last:border-0 last:pb-0 last:mb-0 break-after-page">
            <span className="block text-[9px] text-slate-400 font-mono uppercase mb-4">Slide {idx + 1} / {slides.length}</span>
            <div className="text-slate-800">
              {slide}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
