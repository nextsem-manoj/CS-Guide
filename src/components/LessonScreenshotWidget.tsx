"use client";

import React, { useState } from "react";
import { Camera, ZoomIn, X, CheckCircle, Monitor, ShieldCheck, Terminal, ArrowDown } from "lucide-react";

export interface ScreenshotItem {
  src: string;
  caption: string;
  alt?: string;
  stepNumber?: number;
  commandSnippet?: string;
}

interface LessonScreenshotWidgetProps {
  screenshots?: ScreenshotItem[];
  items?: ScreenshotItem[];
  subjectTitle?: string;
  stepNumber?: number;
}

export default function LessonScreenshotWidget({ screenshots, items, subjectTitle }: LessonScreenshotWidgetProps) {
  const [activeZoomImage, setActiveZoomImage] = useState<ScreenshotItem | null>(null);

  const activeScreenshots = screenshots || items;
  if (!activeScreenshots || activeScreenshots.length === 0) return null;

  return (
    <div className="my-8 p-5 md:p-7 bg-gradient-to-br from-[#0d1527]/90 via-[#09101d]/95 to-slate-950 border border-blue-500/20 rounded-3xl shadow-2xl shadow-blue-500/5 space-y-6 text-left select-none relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-md shrink-0">
            <Camera size={20} />
          </div>
          <div>
            <h3 className="text-sm md:text-base font-black text-white flex items-center gap-2">
              <span>🪟 Windows 11 Practical Step-by-Step Walkthrough</span>
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">
              Real screenshots captured by Nextsem — Follow each step vertically below
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full shrink-0">
          <ShieldCheck size={12} className="text-emerald-400" />
          <span>Verified Practical</span>
        </span>
      </div>

      {/* Vertical Stack: Multiple Screenshots arranged vertically one after another */}
      <div className="flex flex-col gap-6 relative z-10 w-full">
        {activeScreenshots.map((item, idx) => (
          <div key={idx} className="space-y-3">
            {/* Command / Instruction Header Box */}
            <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                  {item.stepNumber ?? (idx + 1)}
                </span>
                <span className="text-xs font-bold text-white leading-snug">
                  {item.caption}
                </span>
              </div>

              {item.commandSnippet && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-blue-400 shrink-0">
                  <Terminal size={13} />
                  <span>{item.commandSnippet}</span>
                </div>
              )}
            </div>

            {/* Vertical Screenshot Card */}
            <div 
              className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/90 hover:border-blue-500/50 transition-all duration-300 shadow-xl hover:shadow-blue-500/10 cursor-pointer"
              onClick={() => setActiveZoomImage(item)}
            >
              {/* Hover Zoom Prompt Overlay */}
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-10 backdrop-blur-xs">
                <span className="px-4 py-2.5 rounded-xl bg-blue-600 text-white shadow-xl flex items-center gap-2 text-xs font-black uppercase tracking-wider scale-95 group-hover:scale-100 transition-transform">
                  <ZoomIn size={15} /> Click to Expand Screenshot
                </span>
              </div>

              {/* Full Width Vertical Image Frame */}
              <div className="w-full bg-slate-950 flex items-center justify-center p-1 border-b border-slate-800/60 relative overflow-hidden group">
                <img 
                  src={item.src} 
                  alt={item.alt || item.caption} 
                  className="w-full h-auto max-h-[500px] object-contain rounded-xl group-hover:scale-[1.01] transition-transform duration-500"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                  }}
                />

                {/* ⚡ NextSem Official Logo Diagonal Watermark (Partially Visible) */}
                <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center overflow-hidden">
                  <div className="flex items-center gap-3 opacity-20 rotate-[-15deg] scale-110 sm:scale-125">
                    <img src="/logo.svg" alt="NextSem Logo" className="w-16 h-16 sm:w-20 sm:h-20 object-contain filter drop-shadow-md" />
                    <span className="text-xl sm:text-3xl font-black uppercase tracking-widest text-slate-100 font-mono">
                      NEXTSEM.ONLINE
                    </span>
                  </div>
                </div>

                {/* Corner Logo Badge */}
                <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-950/75 backdrop-blur-md border border-amber-500/30 text-white shadow-xl opacity-70 pointer-events-none select-none">
                  <img src="/logo.svg" alt="NextSem" className="w-4 h-4 rounded object-contain" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">NEXTSEM</span>
                </div>
              </div>
            </div>

            {/* Downward Arrow indicator between vertical steps */}
            {idx < activeScreenshots.length - 1 && (
              <div className="flex justify-center py-1">
                <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                  <ArrowDown size={14} className="animate-bounce" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Image Zoom Modal */}
      {activeZoomImage && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveZoomImage(null)}
        >
          <div 
            className="max-w-5xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-4 shadow-2xl relative animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Monitor size={16} className="text-blue-400" />
                <span className="text-xs font-black text-white">Full Resolution Windows 11 Screenshot</span>
              </div>
              <button 
                onClick={() => setActiveZoomImage(null)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[72vh] overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center p-2 relative">
              <img 
                src={activeZoomImage.src} 
                alt={activeZoomImage.alt} 
                className="max-h-[68vh] w-auto object-contain rounded-xl shadow-lg"
              />

              {/* ⚡ NextSem Official Logo Watermark inside Zoom Modal */}
              <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center overflow-hidden">
                <div className="flex items-center gap-4 opacity-20 rotate-[-15deg] scale-125 sm:scale-150">
                  <img src="/logo.svg" alt="NextSem Logo" className="w-20 h-20 sm:w-28 sm:h-28 object-contain filter drop-shadow-lg" />
                  <span className="text-2xl sm:text-4xl font-black uppercase tracking-widest text-slate-100 font-mono">
                    NEXTSEM.ONLINE
                  </span>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-amber-500/30 text-white shadow-2xl opacity-75 pointer-events-none select-none">
                <img src="/logo.svg" alt="NextSem" className="w-5 h-5 rounded object-contain" />
                <span className="text-xs font-black uppercase tracking-widest text-amber-300 font-mono">NEXTSEM.ONLINE</span>
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 text-center">
              <p className="text-xs font-bold text-slate-200">
                {activeZoomImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
