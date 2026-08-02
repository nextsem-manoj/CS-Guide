"use client";

import React, { useState, useEffect } from 'react';
import { WifiOff, ShieldAlert, Wifi } from 'lucide-react';

export default function OfflineGuard() {
  const [isOfflineBlocked, setIsOfflineBlocked] = useState(false);
  const [timeRemainingText, setTimeRemainingText] = useState("");

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkOfflineStatus = () => {
      const isOnline = navigator.onLine;
      const lastSyncStr = localStorage.getItem("nextsem_last_online_sync");

      if (isOnline) {
        // User is online: update the last sync time
        localStorage.setItem("nextsem_last_online_sync", Date.now().toString());
        setIsOfflineBlocked(false);
      } else {
        // User is offline: check if 24 hours have passed
        if (!lastSyncStr) {
          // If no sync timestamp exists, block immediately to force an initial online sync
          setIsOfflineBlocked(true);
        } else {
          const lastSyncTime = Number(lastSyncStr);
          const timeElapsed = Date.now() - lastSyncTime;
          const twentyFourHours = 24 * 60 * 60 * 1000;

          if (timeElapsed >= twentyFourHours) {
            setIsOfflineBlocked(true);
          } else {
            setIsOfflineBlocked(false);
            // Calculate time left in offline window
            const timeLeft = twentyFourHours - timeElapsed;
            const hoursLeft = Math.ceil(timeLeft / (60 * 60 * 1000));
            setTimeRemainingText(`${hoursLeft} hour${hoursLeft > 1 ? 's' : ''}`);
          }
        }
      }
    };

    // Initial check
    checkOfflineStatus();

    // Listen to network status changes
    window.addEventListener('online', checkOfflineStatus);
    window.addEventListener('offline', checkOfflineStatus);

    // Periodically re-evaluate every minute
    const interval = setInterval(checkOfflineStatus, 60000);

    return () => {
      window.removeEventListener('online', checkOfflineStatus);
      window.removeEventListener('offline', checkOfflineStatus);
      clearInterval(interval);
    };
  }, []);

  if (!isOfflineBlocked) {
    // If not blocked but offline, display a small warning banner showing remaining window time
    if (typeof window !== 'undefined' && !navigator.onLine && timeRemainingText) {
      return (
        <div className="fixed top-0 left-0 right-0 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider py-1.5 px-4 text-center z-[99999] flex items-center justify-center gap-2 select-none shadow-md">
          <WifiOff size={12} />
          <span>Offline Mode: Connect to internet within {timeRemainingText} to sync your progress!</span>
        </div>
      );
    }
    return null;
  }

  // Fullscreen block overlay when 24 hours of offline use has expired
  return (
    <div className="fixed inset-0 bg-background z-[999999] flex flex-col items-center justify-center p-6 text-center select-none animate-in fade-in duration-300">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-rose-500/10 border border-rose-500/30 rounded-full flex items-center justify-center">
          <ShieldAlert className="text-rose-500 w-8 h-8 animate-pulse" />
        </div>

        <h3 className="text-lg md:text-xl font-black text-slate-100 mt-6 mb-2">Sync Required</h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-6">
          You have been using Nextsem Academy offline for over **24 hours**. 
          To protect your course progression, certifications, and security, you must connect to the internet to verify your app once per day.
        </p>

        <div className="p-4 bg-slate-950/60 border border-slate-850 rounded-2xl flex flex-col items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center animate-spin">
            <Wifi className="text-blue-400 w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Waiting for Connection...</span>
        </div>

        <p className="text-[10px] text-slate-500">
          This window will close automatically as soon as an active internet connection is detected.
        </p>
      </div>
    </div>
  );
}
