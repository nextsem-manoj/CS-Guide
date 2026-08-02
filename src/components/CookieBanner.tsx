"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Check, Shield } from "lucide-react";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkConsent = () => {
      const consent = localStorage.getItem("cookie_consent");
      const onboardingDone = localStorage.getItem("nextsem_onboarding_v1") === "1";
      if (consent !== "true" && onboardingDone) {
        setShowBanner(true);
      } else {
        setShowBanner(false);
      }
    };

    checkConsent();

    window.addEventListener("nextsem_view_mode_changed", checkConsent);
    return () => window.removeEventListener("nextsem_view_mode_changed", checkConsent);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div 
      className="fixed bottom-4 left-4 right-4 max-w-lg mx-auto bg-slate-950/95 backdrop-blur-xl border border-blue-500/30 rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.15)] p-4 z-[9997] transition-all duration-300 animate-in slide-in-from-bottom duration-300 select-none flex flex-col gap-3"
    >
      <div className="flex items-start gap-3">
        <div className="bg-blue-500/10 border border-blue-500/35 text-blue-450 p-2 rounded-xl shrink-0 flex items-center justify-center">
          <Shield size={18} className="text-blue-400" />
        </div>
        <div className="min-w-0">
          <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-200">
            Cookie Consent & Privacy
          </h4>
          <p className="text-[9px] text-slate-400 font-bold leading-relaxed mt-1">
            We use essential local cookies & storage to save your reading theme settings, font preferences, and track your offline web development curriculum progress.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 border-t border-slate-900 pt-2.5">
        <Link 
          href="/privacy" 
          className="px-3.5 py-1.5 rounded-xl hover:bg-slate-900 text-slate-400 hover:text-white transition-all text-[10px] font-extrabold uppercase tracking-wider"
        >
          Privacy Policy
        </Link>
        <button
          onClick={handleAccept}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-[10px] uppercase tracking-wider transition-all active:scale-95 cursor-pointer shadow-md shadow-blue-500/10"
        >
          <Check size={11} className="stroke-[3]" />
          <span>Accept Cookies</span>
        </button>
      </div>
    </div>
  );
}
