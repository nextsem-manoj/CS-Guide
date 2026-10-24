"use client";

import React, { useState, useEffect } from "react";
import { Check, Copy, X, Smartphone, Laptop, Sparkles } from "lucide-react";
import type { CloudClipboardItem } from "@/context/CrossDeviceSyncContext";
import { safeInstantCopy } from "@/lib/clipboard";

interface CrossDeviceClipboardToastProps {
  item: CloudClipboardItem;
  currentDevice: "mobile" | "desktop";
  onDismiss: () => void;
}

export default function CrossDeviceClipboardToast({
  item,
  currentDevice,
  onDismiss,
}: CrossDeviceClipboardToastProps) {
  const [copiedManually, setCopiedManually] = useState(false);

  // Auto-dismiss after 9 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 9000);
    return () => clearTimeout(timer);
  }, [item.eventId, onDismiss]);

  const handleManualCopy = () => {
    safeInstantCopy(item.text);
    setCopiedManually(true);
    setTimeout(() => setCopiedManually(false), 2000);
  };

  const isReceivedOnDesktop = currentDevice === "desktop";

  return (
    <div className="fixed bottom-24 sm:bottom-6 right-3 sm:right-6 z-[100] max-w-sm sm:max-w-md w-[calc(100vw-24px)] animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="rounded-2xl bg-[#0c1328] border-2 border-[#04AA6D] p-4 text-white shadow-2xl shadow-emerald-500/20 backdrop-blur-xl relative overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#04AA6D]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header Row with Official [NS] Emblem */}
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex items-center gap-2.5">
            {/* Logo Emblem Icon */}
            <div className="w-8 h-8 rounded-xl bg-black border border-blue-500 flex items-center justify-center shrink-0 shadow-sm">
              <span className="font-black text-xs text-[#04AA6D] leading-none">N</span>
              <span className="font-black text-xs text-white leading-none">S</span>
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <Sparkles size={10} className="text-[#04AA6D]" /> Cloud Clipboard Synced
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {isReceivedOnDesktop ? (
                    <span className="flex items-center gap-1 text-cyan-300">
                      <Smartphone size={10} /> From Phone ➔ Laptop <Laptop size={10} />
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-cyan-300">
                      <Laptop size={10} /> From Laptop ➔ Phone <Smartphone size={10} />
                    </span>
                  )}
                </span>
              </div>

              <h4 className="text-xs sm:text-sm font-black text-white mt-0.5">
                {isReceivedOnDesktop
                  ? "Ready on your Laptop Clipboard!"
                  : "Ready on your Mobile Clipboard!"}
              </h4>
            </div>
          </div>

          {/* Dismiss Button */}
          <button
            onClick={onDismiss}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer shrink-0"
            title="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>

        {/* Synced Content Snippet Preview */}
        <div className="mt-2.5 p-2.5 rounded-xl bg-black/80 border border-slate-800 text-[11px] font-mono relative z-10">
          <div className="text-[10px] text-slate-400 font-sans mb-1 flex items-center justify-between">
            <span className="font-bold text-slate-300">{item.sourceLabel || "Copied Code"}:</span>
            <span className="text-[9px] text-slate-500 truncate max-w-[150px]">{item.copiedBy}</span>
          </div>
          <code className="text-[#04AA6D] break-all line-clamp-2 block font-bold">
            {item.text}
          </code>
        </div>

        {/* Action Buttons Row */}
        <div className="mt-3 flex items-center justify-between gap-2 relative z-10">
          <span className="text-[10px] font-medium text-emerald-300 flex items-center gap-1">
            <Check size={12} className="stroke-[3] text-[#04AA6D]" />
            <span>Synced across both devices</span>
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleManualCopy}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-sm active:scale-95 ${
                copiedManually
                  ? "bg-emerald-600 text-white"
                  : "bg-[#04AA6D] hover:bg-emerald-600 text-white font-extrabold"
              }`}
            >
              {copiedManually ? <Check size={12} className="stroke-[3]" /> : <Copy size={12} />}
              <span>{copiedManually ? "Copied!" : "Copy Again"}</span>
            </button>

            <button
              onClick={onDismiss}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
