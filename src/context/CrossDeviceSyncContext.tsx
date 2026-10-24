"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useStudentProgress } from "@/context/StudentProgressContext";
import CrossDeviceClipboardToast from "@/components/bca/CrossDeviceClipboardToast";
import { safeInstantCopy } from "@/lib/clipboard";

export interface CloudClipboardItem {
  text: string;
  sourceDevice: "mobile" | "desktop";
  sourceLabel: string;
  copiedBy: string; // user email or username
  timestamp: number;
  eventId: string;
  senderSessionId: string;
}

interface CrossDeviceSyncContextType {
  deviceType: "mobile" | "desktop";
  isGoogleLoggedIn: boolean;
  activeAccountEmail: string | null;
  lastSyncedItem: CloudClipboardItem | null;
  incomingItem: CloudClipboardItem | null;
  copyAndSyncToCloud: (text: string, label?: string) => boolean;
  dismissIncomingToast: () => void;
  openGoogleLoginModal: () => void;
}

const CrossDeviceSyncContext = createContext<CrossDeviceSyncContextType | undefined>(undefined);

// Generate unique per-tab session ID so sender tab never shows its own incoming toast
const CURRENT_SESSION_ID = typeof window !== "undefined"
  ? (window as unknown as { __NS_SESSION__?: string }).__NS_SESSION__ || (
      (window as unknown as { __NS_SESSION__?: string }).__NS_SESSION__ = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    )
  : "session_ssr";

// Subtle pleasant web audio chime on sync
function playSyncNotificationChime() {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.26);
  } catch {
    // Ignore audio restriction if browser requires interaction
  }
}

export function CrossDeviceSyncProvider({ children }: { children: ReactNode }) {
  const { user, openAuthModal } = useStudentProgress();
  const [deviceType, setDeviceType] = useState<"mobile" | "desktop">("desktop");
  const [lastSyncedItem, setLastSyncedItem] = useState<CloudClipboardItem | null>(null);
  const [incomingItem, setIncomingItem] = useState<CloudClipboardItem | null>(null);

  const lastSentEventIdRef = useRef<string | null>(null);
  const lastReceivedEventIdRef = useRef<string | null>(null);
  const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
  const pendingAutoCopyRef = useRef<string | null>(null);

  // 1. Detect current physical device type (mobile vs desktop)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkDevice = () => {
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isNarrow = window.innerWidth < 768;
      setDeviceType(isMobileUA || isNarrow ? "mobile" : "desktop");
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const isGoogleLoggedIn = Boolean(user && !user.isGuest && user.email);
  const activeAccountEmail = isGoogleLoggedIn ? user!.email : null;

  // Compute canonical sync doc ID for this user/device pairing
  const syncKey = user?.email
    ? user.email.toLowerCase().trim().replace(/[^a-z0-9]/g, "_")
    : user?.uid
    ? `uid_${user.uid}`
    : "guest_local_sync";

  // 2. Setup BroadcastChannel for 0ms local sync across browser windows / tabs
  useEffect(() => {
    if (typeof window === "undefined" || typeof BroadcastChannel === "undefined") return;

    try {
      const channel = new BroadcastChannel(`nextsem_clipboard_${syncKey}`);
      broadcastChannelRef.current = channel;

      channel.onmessage = (event) => {
        const item = event.data as CloudClipboardItem;
        if (!item || !item.eventId || item.senderSessionId === CURRENT_SESSION_ID) return;
        if (item.eventId === lastReceivedEventIdRef.current) return;

        lastReceivedEventIdRef.current = item.eventId;
        pendingAutoCopyRef.current = item.text;
        setIncomingItem(item);
        playSyncNotificationChime();

        // Auto-copy if window has focus
        if (document.hasFocus()) {
          safeInstantCopy(item.text);
        }
      };

      return () => {
        channel.close();
      };
    } catch {
      // BroadcastChannel not available in older environments
    }
  }, [syncKey]);

  // Window focus listener: immediately copies incoming text as soon as student switches to laptop window
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleFocus = () => {
      if (pendingAutoCopyRef.current) {
        safeInstantCopy(pendingAutoCopyRef.current);
      }
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  // 3. Real-time Firestore Listener for Cross-Device Clipboard under cross_device_clipboard/{syncKey}
  useEffect(() => {
    if (!syncKey || syncKey === "guest_local_sync") return;

    const clipDocRef = doc(db, "cross_device_clipboard", syncKey);

    const unsubscribe = onSnapshot(
      clipDocRef,
      (snapshot) => {
        if (!snapshot.exists()) return;
        const clip = snapshot.data() as CloudClipboardItem | undefined;

        if (!clip || !clip.eventId || !clip.text) return;

        // Skip if this browser session was the sender
        if (clip.senderSessionId === CURRENT_SESSION_ID) return;
        // Skip if this device just sent this exact event ID
        if (clip.eventId === lastSentEventIdRef.current) return;
        // Skip if we already received and displayed this event
        if (clip.eventId === lastReceivedEventIdRef.current) return;

        // Verify freshness: only accept items copied within the last 10 minutes (tolerant to clock drift)
        if (Math.abs(Date.now() - clip.timestamp) > 600000) return;

        lastReceivedEventIdRef.current = clip.eventId;
        pendingAutoCopyRef.current = clip.text;
        setIncomingItem(clip);
        playSyncNotificationChime();

        // Attempt automatic write to system clipboard
        try {
          if (document.hasFocus()) {
            safeInstantCopy(clip.text);
          }
        } catch {
          // Window focus listener will complete copy upon window focus
        }
      },
      (error) => {
        console.warn("Cross-device sync listener note:", error.message);
      }
    );

    return () => unsubscribe();
  }, [syncKey]);

  // 4. Function to copy locally INSTANTLY (0ms) and broadcast to cloud across devices
  const copyAndSyncToCloud = useCallback(
    (text: string, label: string = "Code Command"): boolean => {
      if (typeof window === "undefined" || !text) return false;

      // STEP 1: Execute 0ms instant local copy synchronously!
      const copied = safeInstantCopy(text);

      const eventId = `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      lastSentEventIdRef.current = eventId;

      const payload: CloudClipboardItem = {
        text,
        sourceDevice: deviceType,
        sourceLabel: label,
        copiedBy: user?.email || user?.name || "Student Device",
        timestamp: Date.now(),
        eventId,
        senderSessionId: CURRENT_SESSION_ID,
      };

      setLastSyncedItem(payload);

      // STEP 2: Broadcast immediately to local BroadcastChannel (0ms)
      if (broadcastChannelRef.current) {
        try {
          broadcastChannelRef.current.postMessage(payload);
        } catch {}
      }

      // STEP 3: Broadcast asynchronously to Firestore in background (does not block local UI)
      if (syncKey && syncKey !== "guest_local_sync") {
        const clipDocRef = doc(db, "cross_device_clipboard", syncKey);
        setDoc(clipDocRef, payload).catch((err) => {
          console.warn("Cloud clipboard sync notice:", err);
        });
      }

      return copied;
    },
    [user, deviceType, syncKey]
  );

  const dismissIncomingToast = useCallback(() => {
    setIncomingItem(null);
  }, []);

  const openGoogleLoginModal = useCallback(() => {
    openAuthModal();
  }, [openAuthModal]);

  return (
    <CrossDeviceSyncContext.Provider
      value={{
        deviceType,
        isGoogleLoggedIn,
        activeAccountEmail,
        lastSyncedItem,
        incomingItem,
        copyAndSyncToCloud,
        dismissIncomingToast,
        openGoogleLoginModal,
      }}
    >
      {children}
      {/* Global Cross-Device Floating Toast */}
      {incomingItem && (
        <CrossDeviceClipboardToast
          item={incomingItem}
          currentDevice={deviceType}
          onDismiss={dismissIncomingToast}
        />
      )}
    </CrossDeviceSyncContext.Provider>
  );
}

export function useCrossDeviceSync() {
  const context = useContext(CrossDeviceSyncContext);
  if (!context) {
    throw new Error("useCrossDeviceSync must be used within a CrossDeviceSyncProvider");
  }
  return context;
}
