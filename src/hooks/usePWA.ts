"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

let globalDeferredPrompt: BeforeInstallPromptEvent | null = null;
let globalIsInstallable = false;
let globalUpdateAvailable = false;
let globalWaitingWorker: ServiceWorker | null = null;
const listeners = new Set<() => void>();
const updateListeners = new Set<() => void>();

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    globalDeferredPrompt = e as BeforeInstallPromptEvent;
    globalIsInstallable = true;
    listeners.forEach((l) => l());
  });

  window.addEventListener("appinstalled", () => {
    globalDeferredPrompt = null;
    globalIsInstallable = false;
    listeners.forEach((l) => l());
  });
}

export function usePWA() {
  const [isInstallable, setIsInstallable] = useState(globalIsInstallable);
  const [isInstalled, setIsInstalled] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(globalUpdateAvailable);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setTimeout(() => setIsInstalled(true), 0);
    }

    const handleChange = () => {
      setIsInstallable(globalIsInstallable);
    };

    const handleUpdateChange = () => {
      setUpdateAvailable(globalUpdateAvailable);
    };

    listeners.add(handleChange);
    updateListeners.add(handleUpdateChange);
    
    // Initial sync
    setTimeout(() => {
      setIsInstallable(globalIsInstallable);
      setUpdateAvailable(globalUpdateAvailable);
    }, 0);

    // Register SW
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js")
        .then((reg) => {
          console.log("SW Registered");

          // 1. Check if there is already a waiting worker
          if (reg.waiting) {
            globalWaitingWorker = reg.waiting;
            globalUpdateAvailable = true;
            updateListeners.forEach((l) => l());
          }

          // 2. Listen for new update found
          reg.addEventListener("updatefound", () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed") {
                  if (navigator.serviceWorker.controller) {
                    globalWaitingWorker = newWorker;
                    globalUpdateAvailable = true;
                    updateListeners.forEach((l) => l());
                  }
                }
              });
            }
          });
        })
        .catch((err) => console.error("SW Registration failed", err));

      // 3. Reload page when new worker takes control
      let refreshing = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    }

    return () => {
      listeners.delete(handleChange);
      updateListeners.delete(handleUpdateChange);
    };
  }, []);

  const installApp = async () => {
    if (!globalDeferredPrompt) return;
    globalDeferredPrompt.prompt();
    const { outcome } = await globalDeferredPrompt.userChoice;
    if (outcome === "accepted") {
      globalDeferredPrompt = null;
      globalIsInstallable = false;
      setIsInstallable(false);
      setIsInstalled(true);
      listeners.forEach((l) => l());
    }
  };

  const triggerUpdate = () => {
    if (globalWaitingWorker) {
      globalWaitingWorker.postMessage({ type: "SKIP_WAITING" });
    }
  };

  return { isInstallable, isInstalled, updateAvailable, installApp, triggerUpdate };
}
