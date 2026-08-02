"use client";

import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from "next-themes";
import { Capacitor } from '@capacitor/core';
import { hideBannerAd, showBannerAd } from '@/lib/admobHelper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AmpAd = 'amp-ad' as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OverflowDiv = 'div' as any;

export default function AdSenseBanner() {
  const [isNative, setIsNative] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [readTheme, setReadTheme] = useState<"default" | "sepia" | "dark">(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('read_theme') as "default" | "sepia" | "dark" | null;
      return savedTheme || "default";
    }
    return "default";
  });
  const [mounted, setMounted] = useState(false);
  const [adBlocked, setAdBlocked] = useState(false);
  const insRef = useRef<HTMLModElement>(null);
  const pathname = usePathname() || '';
  const isInBook = pathname.startsWith('/book/') || pathname.startsWith('/cli/');
  const isLearnPage = pathname.startsWith('/book/') || pathname.startsWith('/html/') || pathname.startsWith('/cli/');
  const { theme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (typeof window === 'undefined') return;

    const native = Capacitor.isNativePlatform();
    const mobile = window.innerWidth < 768 || /Mobi|Android|iPhone/i.test(navigator.userAgent);
    setIsNative(native);
    setIsMobile(mobile);

    const onSettingsChange = () => {
      const t = localStorage.getItem('read_theme') as "default" | "sepia" | "dark" | null;
      if (t) setReadTheme(t);
    };
    window.addEventListener('readerSettingsChanged', onSettingsChange);

    if (native) {
      const isHomeScreen = pathname === '/';
      const isLesson = !isHomeScreen && (
        pathname.startsWith('/html') || pathname.startsWith('/cli') ||
        pathname.startsWith('/git') || pathname.startsWith('/book') ||
        pathname.startsWith('/msword') || pathname.startsWith('/bca')
      );
      const isFullscreenNow = typeof document !== 'undefined' && !!document.fullscreenElement;

      if (!isLesson || isFullscreenNow || isHomeScreen) {
        hideBannerAd();
        return;
      }

      showBannerAd();

      const onFsChange = () => {
        if (document.fullscreenElement) {
          hideBannerAd();
        }
      };
      document.addEventListener('fullscreenchange', onFsChange);

      return () => {
        hideBannerAd();
        document.removeEventListener('fullscreenchange', onFsChange);
        window.removeEventListener('readerSettingsChanged', onSettingsChange);
      };
    } else {
      // Standard web browser & PWA: Initialize Google AdSense for all viewport layouts
      let checkTimeout: NodeJS.Timeout;
      try {
        // @ts-expect-error: adsbygoogle global is dynamically injected by the Google AdSense script
        (window.adsbygoogle = window.adsbygoogle || []).push({});

        checkTimeout = setTimeout(() => {
          if (insRef.current && insRef.current.innerHTML.trim() === "") {
            setAdBlocked(true);
          }
        }, 4000);
      } catch (err) {
        setAdBlocked(true);
      }

      return () => {
        if (checkTimeout) clearTimeout(checkTimeout);
        window.removeEventListener('readerSettingsChanged', onSettingsChange);
      };
    }
  }, []);

  if (isNative) {
    // Native AdMob renders as a native overlay over the WebView,
    // so we render a matching placeholder spacer in the DOM.
    return (
      <div className={`${isInBook ? 'my-1 h-[40px]' : 'my-4 h-[50px]'} w-full bg-transparent pointer-events-none`} />
    );
  }

  if (isLearnPage && isMobile) {
    return null;
  }

  if (adBlocked) {
    // Return null to completely remove the fallback promotional card when ads are blocked
    return null;
  }

  // Decide active visual mode: 'light' or 'dark'
  let visualMode: 'light' | 'dark' = 'dark';

  if (mounted) {
    if (theme === 'light') {
      visualMode = 'light';
    } else {
      visualMode = 'dark';
    }
  } else {
    visualMode = 'dark';
  }

  let containerClass = "";
  let labelClass = "absolute top-1 right-2 text-[6px] font-black uppercase tracking-widest";

  if (visualMode === 'dark') {
    containerClass = isInBook
      ? "my-2 flex flex-col items-center justify-center w-full overflow-hidden bg-[#0c1328]/60 border border-slate-800/80 rounded-xl p-2 relative select-none"
      : "my-8 flex flex-col items-center justify-center w-full overflow-hidden bg-[#0c1328]/60 border border-slate-800/80 rounded-2xl p-4 min-h-[120px] relative select-none";
    labelClass += " text-slate-500";
  } else {
    // light mode
    containerClass = isInBook
      ? "my-2 flex flex-col items-center justify-center w-full overflow-hidden bg-slate-100/60 border border-slate-200 rounded-xl p-2 relative select-none"
      : "my-8 flex flex-col items-center justify-center w-full overflow-hidden bg-slate-100/60 border border-slate-200 rounded-2xl p-4 min-h-[120px] relative select-none";
    labelClass += " text-slate-400";
  }

  return (
    <div className={containerClass}>
      <span className={labelClass}>Ads by Google</span>

      <div className="w-full flex justify-center">
        {/* Google AdSense Responsive Ad Unit for PWAs and Responsive Web Layouts */}
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{
            display: 'block',
            width: '100%',
            minHeight: isInBook ? '50px' : '90px',
            background: 'transparent'
          }}
          data-ad-client="ca-pub-4242865347895866"
          data-ad-slot="6059354880"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  );
}
