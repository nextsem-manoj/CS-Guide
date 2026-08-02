"use client";

import React, { useEffect, useState } from 'react';
import { Download, X, Smartphone } from 'lucide-react';
import { Capacitor } from '@capacitor/core';

export default function TopAppDownloadBanner() {
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    setMounted(true);
    const native = Capacitor.isNativePlatform();
    setIsNative(native);

    if (typeof window !== 'undefined') {
      const isDismissed = localStorage.getItem("nextsem_top_app_banner_dismissed") === "true";
      setDismissed(isDismissed);
    }
  }, []);

  if (!mounted || isNative || dismissed) return null;

  const handleDismiss = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("nextsem_top_app_banner_dismissed", "true");
    }
    setDismissed(true);
  };

  const handleDownload = () => {
    // Navigate directly to official Google Play Store app listing
    window.open("https://play.google.com/store/apps/details?id=online.nextsem.app", "_blank");
  };

  return (
    <div className="w-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 px-3 py-1.5 flex items-center justify-between gap-2 shadow-md z-[10000] relative font-bold text-xs select-none border-b border-amber-400/40">
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-6 h-6 rounded-lg bg-slate-950/90 border border-amber-300/40 flex items-center justify-center shrink-0 shadow-sm">
          <img src="/logo.svg" alt="Nextsem Logo" className="w-4 h-4 object-contain" />
        </div>
        <div className="flex items-center gap-1.5 min-w-0 truncate">
          <span className="font-extrabold uppercase tracking-wide truncate">
            Nextsem Academy Official Android App
          </span>
          <span className="hidden sm:inline-block text-[10px] font-black bg-slate-950 text-amber-300 px-1.5 py-0.5 rounded-full uppercase tracking-wider shrink-0 border border-amber-400/30">
            Free Download
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={handleDownload}
          className="flex items-center gap-1 px-3 py-1 bg-slate-950 hover:bg-slate-900 text-amber-300 hover:text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 shadow-sm cursor-pointer border border-amber-400/30"
        >
          <Download size={11} className="stroke-[3]" />
          <span>Download App</span>
        </button>

        <button
          onClick={handleDismiss}
          className="p-1 hover:bg-slate-950/20 text-slate-950 hover:text-white rounded-md transition-colors cursor-pointer"
          title="Close Banner"
          aria-label="Close Top Banner"
        >
          <X size={14} className="stroke-[3]" />
        </button>
      </div>
    </div>
  );
}
