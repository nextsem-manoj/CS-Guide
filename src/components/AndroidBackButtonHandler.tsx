"use client";

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';

export default function AndroidBackButtonHandler() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const backButtonListener = App.addListener('backButton', () => {
      // 1. Check if any active modal is open (Story viewer, search, or profile dashboard)
      const storyModalOpen = document.querySelector('[role="dialog"], .animate-story-float, [aria-label="Modal"]');
      if (storyModalOpen) {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        return;
      }

      // 2. Custom routing logic for Android hardware back button
      if (pathname?.startsWith('/bca/practical/day-')) {
        router.push('/bca/practical');
      } else if (pathname === '/bca/practical') {
        router.push('/bca');
      } else if (pathname?.startsWith('/bca/semester-') || pathname?.startsWith('/bca/notes/')) {
        router.push('/bca');
      } else if (pathname === '/bca') {
        router.push('/');
      } else if (pathname?.startsWith('/book/')) {
        router.push('/');
      } else if (pathname === '/cmd' || pathname === '/profile' || pathname === '/course') {
        router.push('/');
      } else if (pathname === '/') {
        // If they are on the landing page and click back, exit the app
        App.exitApp();
      } else {
        // For other pages, fall back to browser history back
        if (window.history.length > 1) {
          window.history.back();
        } else {
          router.push('/');
        }
      }
    });

    return () => {
      backButtonListener.then((l) => l.remove());
    };
  }, [pathname, router]);

  return null;
}
