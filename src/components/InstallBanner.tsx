"use client";

import React, { useEffect, useState } from 'react';
import { Download, X, Smartphone, Share } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';

export default function InstallBanner() {
  const { isInstallable, isInstalled, installApp } = usePWA();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showIosInstructions, setShowIosInstructions] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem("pwa_install_dismissed") === "true";
    const timer = setTimeout(() => {
      setMounted(true);
      setIsMobile(window.innerWidth < 768);
      setDismissed(isDismissed);
    }, 120000); // Delay install prompt by 2 minutes
    
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !isMobile || dismissed || isInstalled) return null;

  // Detect iOS
  const isIOS = typeof navigator !== 'undefined' && 
    (/iPad|iPhone|iPod/.test(navigator.userAgent) || 
     (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

  const handleInstallClick = () => {
    if (isInstallable) {
      installApp();
    } else if (isIOS) {
      setShowIosInstructions(true);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("pwa_install_dismissed", "true");
    setDismissed(true);
  };

  return (
    <>
      <div 
        className="fixed top-4 left-4 right-4 max-w-sm mx-auto bg-slate-950/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl shadow-[0_10px_30px_rgba(16,185,129,0.2)] p-3.5 z-[9999] transition-all duration-300 md:hidden flex items-center justify-between gap-3 select-none animate-in slide-in-from-top duration-300"
        style={{ top: 'calc(1rem + env(safe-area-inset-top))' }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="bg-emerald-500/10 border border-emerald-500/35 text-emerald-450 p-2.5 rounded-xl shrink-0 flex items-center justify-center">
            <Smartphone size={20} className="animate-pulse text-emerald-400" />
          </div>
          <div className="min-w-0 text-left">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-white">Nextsem Offline App</h4>
            <p className="text-[9px] font-bold text-slate-400 mt-0.5 leading-snug">
              Install for offline study, fast speeds & instant access.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={handleInstallClick}
            className="px-3.5 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-450 hover:to-teal-450 text-slate-950 font-black text-[9px] uppercase tracking-wider rounded-xl transition-all hover:scale-102 active:scale-98 shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <Download size={10} className="stroke-[3]" />
            <span>Install</span>
          </button>
          
          <button 
            onClick={handleDismiss}
            className="p-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 cursor-pointer"
          >
            <X size={12} />
          </button>
        </div>
      </div>

      {/* iOS Manual Installation Guide Popup */}
      {showIosInstructions && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] transition-opacity duration-200"
            onClick={() => setShowIosInstructions(false)}
          />
          <div className="fixed bottom-6 left-6 right-6 bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl p-5 z-[10001] animate-in slide-in-from-bottom duration-300 md:hidden max-w-sm mx-auto text-left">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                <Share size={12} /> Install on iOS
              </h4>
              <button 
                onClick={() => setShowIosInstructions(false)}
                className="p-1 hover:bg-slate-900 rounded-full text-slate-400 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            
            <p className="text-[10px] font-bold text-slate-400 leading-relaxed">
              Safari on iOS does not support one-click installations. Follow these simple steps to add the app to your Home Screen:
            </p>
            
            <div className="mt-4 space-y-3.5 text-[9px] font-black text-white uppercase tracking-wider">
              <div className="flex items-center gap-3">
                <span className="bg-slate-900 w-5 h-5 flex items-center justify-center rounded-lg border border-slate-850 text-slate-400">1</span>
                <span>Tap the Safari <span className="inline-flex items-center justify-center p-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-md mx-0.5"><Share size={10} /> share</span> button.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-slate-900 w-5 h-5 flex items-center justify-center rounded-lg border border-slate-850 text-slate-400">2</span>
                <span>Scroll down and select <span className="text-amber-400">&quot;Add to Home Screen&quot;</span>.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-slate-900 w-5 h-5 flex items-center justify-center rounded-lg border border-slate-850 text-slate-400">3</span>
                <span>Tap <span className="text-emerald-450">&quot;Add&quot;</span> in the top right corner.</span>
              </div>
            </div>

            <button 
              onClick={() => setShowIosInstructions(false)}
              className="mt-5 w-full py-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 rounded-2xl font-black text-[9px] uppercase tracking-widest transition-all cursor-pointer text-center"
            >
              Got it, thanks!
            </button>
          </div>
        </>
      )}
    </>
  );
}
