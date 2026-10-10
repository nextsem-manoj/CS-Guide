"use client";

import React, { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { showBannerAd } from '@/lib/admobHelper';

export default function AdSenseBanner({ className = "" }: { className?: string }) {
  useEffect(() => {
    // Only mount native AdMob banner when running as an installed native app
    if (Capacitor.isNativePlatform()) {
      showBannerAd().catch((err) => {
        console.warn('[AdMob Banner] Auto-mount warning:', err);
      });
    }
  }, []);

  // Web view: AdSense banner container
  if (!Capacitor.isNativePlatform()) {
    return (
      <aside 
        aria-label="Sponsor Banner" 
        className={`w-full max-w-4xl mx-auto my-4 min-h-[90px] flex items-center justify-center rounded-xl overflow-hidden bg-slate-900/40 border border-slate-800/50 ${className}`}
      >
        <ins 
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minHeight: '90px' }}
          data-ad-client="ca-pub-4242865347895866"
          data-ad-slot="1125281920"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </aside>
    );
  }

  // Native: AdMob handles rendering natively on the OS window layer
  return null;
}
