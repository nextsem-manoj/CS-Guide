"use client";

import React, { useState, useEffect } from "react";
import { Star, X, Play } from "lucide-react";

export default function RateAppPrompt({ inline = false }: { inline?: boolean }) {
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (inline) {
      setTimeout(() => setVisible(true), 0);
      return;
    }

    // Listen for custom trigger event (e.g. from marking a chapter complete)
    const handleTrigger = () => {
      const isNative = typeof window !== 'undefined' &&
        (window as unknown as { Capacitor?: { isNativePlatform: () => boolean } }).Capacitor?.isNativePlatform();
      if (!isNative) return; // Keep Play Store prompts on mobile app only

      const lastPrompt = localStorage.getItem("nextsem_rate_prompt_time");
      const alreadyReviewed = localStorage.getItem("nextsem_already_reviewed");
      if (alreadyReviewed) return;

      const now = Date.now();
      const delay = 7 * 24 * 60 * 60 * 1000; // 7 days interval between prompts
      if (!lastPrompt || now - parseInt(lastPrompt) > delay) {
        localStorage.setItem("nextsem_rate_prompt_time", now.toString());
        // Wait 1.5 seconds after completion to show the prompt
        setTimeout(() => setVisible(true), 1500);
      }
    };

    window.addEventListener("trigger-rate-prompt", handleTrigger);
    return () => window.removeEventListener("trigger-rate-prompt", handleTrigger);
  }, [inline]);

  const handleRate = (value: number) => {
    setRating(value);
    setSubmitted(true);
    localStorage.setItem("nextsem_already_reviewed", "true");

    // If rated high (4 or 5 stars), redirect to the Play Store
    if (value >= 4) {
      setTimeout(() => {
        window.open(
          "https://play.google.com/store/apps/details?id=online.nextsem.app",
          "_blank",
          "noopener,noreferrer"
        );
        if (!inline) setVisible(false);
      }, 800);
    } else {
      // Feedback submitted
      setTimeout(() => {
        if (!inline) setVisible(false);
      }, 1500);
    }
  };

  const handleDismiss = () => {
    setVisible(false);
  };

  if (!visible) return null;

  const G = "#39FF14"; // brand neon green

  if (inline) {
    return (
      <div className="p-4 bg-slate-900/60 dark:bg-black/60 rounded-2xl border border-[#39FF14]/15 text-center relative overflow-hidden">
        <div
          className="absolute w-20 h-20 rounded-full blur-[40px] opacity-15 pointer-events-none"
          style={{ background: G, top: "-10px", left: "-10px" }}
        />
        <div className="flex justify-center gap-1 mb-2">
          {"★".repeat(5).split("").map((_, i) => (
            <Star
              key={i}
              size={18}
              className={`transition-colors cursor-pointer ${
                (hovered || rating) > i ? "fill-emerald-400 text-emerald-400 animate-pulse" : "text-slate-600"
              }`}
              onMouseEnter={() => setHovered(i + 1)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => handleRate(i + 1)}
            />
          ))}
        </div>
        <span className="block text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">
          {submitted ? "Thank you for rating! 💚" : "Enjoying Nextsem? Rate us!"}
        </span>
        <span className="block text-[8px] text-slate-500 font-medium">
          {submitted ? "Your feedback helps us improve." : "Tap stars to open Google Play Store"}
        </span>
      </div>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] transition-opacity animate-in fade-in duration-300"
        onClick={handleDismiss}
      />

      {/* Floating Dialog */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-slate-950 border border-emerald-500/20 rounded-[28px] p-6 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[1000] animate-in zoom-in-95 duration-200">
        {/* Glow */}
        <div
          className="absolute inset-0 rounded-[28px] opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(57,255,20,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X size={14} />
        </button>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo Icon */}
          <img
            src="/logo.svg"
            alt="Nextsem Logo"
            className="w-16 h-16 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.25)] border border-emerald-400/30 mb-4"
          />

          <h3 className="text-white text-lg font-black tracking-wide mb-1">
            {submitted ? "You're Awesome! 🎉" : "Enjoying Nextsem Academy?"}
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed max-w-[240px] mb-4">
            {submitted
              ? "Redirecting you to Google Play Store to leave a quick review..."
              : "If you love learning with us, please rate us on the Play Store. It only takes 10 seconds!"}
          </p>

          {/* Star Selection */}
          <div className="flex gap-1.5 mb-5">
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={val}
                onMouseEnter={() => setHovered(val)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => handleRate(val)}
                className="transition-transform active:scale-90"
              >
                <Star
                  size={32}
                  className={`transition-colors ${
                    (hovered || rating) >= val
                      ? "fill-emerald-400 text-emerald-400"
                      : "text-slate-700"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Play Store CTA */}
          <a
            href="https://play.google.com/store/apps/details?id=online.nextsem.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-450 hover:to-emerald-550 text-black font-black text-xs rounded-xl shadow-lg active:scale-95 transition-all w-full"
            style={{
              boxShadow: "0 0 20px rgba(57,255,20,0.2)",
            }}
          >
            <Play size={12} className="fill-black stroke-none" />
            <span>Open Play Store Directly</span>
          </a>
        </div>
      </div>
    </>
  );
}
