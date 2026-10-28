"use client";

import React, { useState, useEffect } from "react";
import { 
  Smartphone, Laptop, Terminal, Copy, Check, Share2, 
  QrCode, CheckCircle2, ChevronDown, ChevronUp,
  Globe, ArrowRight, ShieldCheck, Zap, X
} from "lucide-react";
import DualDeviceWorkflowAnimation from "@/components/bca/DualDeviceWorkflowAnimation";
import { useCrossDeviceSync } from "@/context/CrossDeviceSyncContext";

interface Props {
  day: number;
  daySlug: string;
  lessonTitle: string;
  primaryFile: string;
  targetFolder: string;
  terminalCommand: string;
  isCompleted: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  asModal?: boolean;
}

export default function MobileToPcCompanionBar({
  day,
  daySlug,
  lessonTitle,
  primaryFile,
  targetFolder,
  terminalCommand,
  isCompleted,
  isOpen = false,
  onClose,
  asModal = false
}: Props) {
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);

  // Close modal on Escape key press
  useEffect(() => {
    if (!asModal || !isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [asModal, isOpen, onClose]);

  const { 
    isGoogleLoggedIn, 
    activeAccountEmail, 
    copyAndSyncToCloud, 
    openGoogleLoginModal,
    deviceType 
  } = useCrossDeviceSync();

  // Exact canonical URL for this lesson
  const lessonUrl = typeof window !== "undefined"
    ? `${window.location.origin}/bca/practical/${daySlug}`
    : `https://cs.nextsem.online/bca/practical/${daySlug}`;

  // WhatsApp share link for student to send to their own laptop/PC WhatsApp Web
  const whatsappShareText = encodeURIComponent(
    `💻 BCA Practical Day ${day}: ${lessonTitle}\nOpen and practice live in VS Code on your PC:\n${lessonUrl}`
  );
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${whatsappShareText}`;

  // 1-Click Copy Windows Terminal setup one-liner with Cloud Sync across devices (0ms instant local execution)
  const handleCopyCmd = () => {
    const pcOneLiner = terminalCommand.replace(/\n/g, "; ") || `mkdir ${targetFolder}; cd ${targetFolder}; code .`;
    copyAndSyncToCloud(pcOneLiner, `Day ${day} PC Setup Command`);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2500);
  };

  // 1-Click Copy Lesson URL with Cloud Sync across devices (0ms instant local execution)
  const handleCopyUrl = () => {
    copyAndSyncToCloud(lessonUrl, `Day ${day} Lesson Link`);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const copyCmdLabel = copiedCmd 
    ? (isGoogleLoggedIn ? (deviceType === "mobile" ? "✓ Copied & Synced to Laptop!" : "✓ Copied & Synced to Phone!") : "✓ Copied Instantly!")
    : "Copy PC Setup Command";

  if (asModal && !isOpen) return null;

  const barContent = (
    <section 
      aria-label="Mobile to PC Coding Companion"
      className={asModal 
        ? "relative w-full max-w-2xl bg-white dark:bg-[#0c1328] border border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto custom-scrollbar" 
        : "w-full mb-6 rounded-2xl bg-white dark:bg-[#0c1328] border border-emerald-500/30 dark:border-emerald-500/30 p-4 sm:p-5 shadow-sm transition-all"}
    >
      {asModal && onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer z-20"
          title="Close Companion Modal"
        >
          <X size={18} />
        </button>
      )}
      {/* ── Top Header Banner (NextSem Logo Theme) ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5">
        <div className="flex items-start gap-3">
          {/* Dual-device connected icon animation */}
          <div className="relative shrink-0 mt-0.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
              <Smartphone size={20} className="stroke-[2.5]" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-md bg-black dark:bg-[#04AA6D] text-white dark:text-black flex items-center justify-center shadow-md">
              <Laptop size={11} className="stroke-[2.5]" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/40">
                Dual-Device Mode
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                📱 Study on Phone ❯ 💻 Code in VS Code on PC
              </span>
            </div>

            <h3 className="text-sm sm:text-base font-extrabold text-black dark:text-white mt-1">
              Dual-Screen Coding Companion
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
              Keep this phone propped beside your PC keyboard as your live lab manual. Type full-screen in VS Code without annoying Alt-Tab window switching!
            </p>
          </div>
        </div>

        {/* Action Buttons for Sending to PC */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {/* Copy PC Setup Command */}
          <button
            onClick={handleCopyCmd}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-95 ${
              copiedCmd
                ? "bg-emerald-600 text-white border border-emerald-500"
                : "bg-[#04AA6D] hover:bg-emerald-600 text-white font-extrabold border border-emerald-500 shadow-emerald-500/20"
            }`}
            title="Copies one-liner to create folder and open VS Code on Windows PC (synced across devices)"
          >
            {copiedCmd ? <Check size={14} className="stroke-[3]" /> : <Terminal size={14} />}
            <span>{copyCmdLabel}</span>
          </button>

          {/* Send to WhatsApp Web / PC */}
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-xl bg-white dark:bg-[#060c18] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-black dark:text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            title="Send this lesson link to your WhatsApp so you can click open on your laptop"
          >
            <Share2 size={13} className="text-emerald-500" />
            <span>Send to PC</span>
          </a>

          {/* Toggle Visual Animation Button */}
          <button
            onClick={() => setShowAnimation(!showAnimation)}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95 ${
              showAnimation
                ? "bg-[#060c18] dark:bg-[#060c18] text-emerald-400 border border-emerald-500/60 shadow-md shadow-emerald-500/10 font-bold"
                : "bg-white dark:bg-[#060c18] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-500"
            }`}
            title="Toggle Visual Animation demonstrating how dual-screen works"
          >
            <span>🎬</span>
            <span>{showAnimation ? "Hide Animation" : "See How It Works"}</span>
          </button>

          {/* QR Code trigger */}
          <button
            onClick={() => setIsQrModalOpen(true)}
            className="p-2 rounded-xl bg-white dark:bg-neutral-900 hover:bg-slate-100 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300 transition-all cursor-pointer shadow-sm active:scale-95"
            title="Scan QR Code to sync lesson between phone and PC"
            aria-label="Show QR Code"
          >
            <QrCode size={16} />
          </button>

          {/* Expand/Collapse Workflow */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-xl bg-white dark:bg-neutral-900 hover:bg-slate-100 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300 transition-all cursor-pointer shadow-sm active:scale-95"
            title={isExpanded ? "Collapse Dual-Screen Guide" : "Expand Dual-Screen Guide"}
            aria-label="Toggle Guide Steps"
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* ── GOOGLE ACCOUNT CROSS-DEVICE CLOUD CLIPBOARD STATUS BAR ── */}
      {!isGoogleLoggedIn ? (
        <div className="mt-3.5 p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-[#0c1328] border border-blue-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-md">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
              <Zap size={16} />
            </div>
            <div>
              <div className="font-extrabold text-white flex items-center gap-1.5 flex-wrap">
                <span>Same Google Account Login Required on Both Devices</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 uppercase">
                  Real-Time Sync
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                Login with the <strong>SAME Google account</strong> on both your mobile and laptop. Whatever you copy on mobile instantly syncs to your laptop clipboard, and vice-versa!
              </p>
            </div>
          </div>

          <button
            onClick={openGoogleLoginModal}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-black font-black text-xs flex items-center justify-center gap-1.5 shrink-0 shadow-md active:scale-95 cursor-pointer transition-transform"
          >
            <span>🔑 Sign In with Google</span>
          </button>
        </div>
      ) : (
        <div className="mt-3.5 px-3.5 py-2.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#04AA6D] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#04AA6D]" />
            </span>
            <span className="font-extrabold text-white text-[11px]">Real-Time Cloud Clipboard Active:</span>
            <span className="text-emerald-400 font-bold truncate max-w-[200px] sm:max-w-xs">{activeAccountEmail}</span>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-slate-400 shrink-0">
            <span className="text-emerald-400 font-bold">✓ Phone ⇄ Laptop Connected</span>
            <span>•</span>
            <span>Auto-Paste Enabled</span>
          </div>
        </div>
      )}

      {/* ── ANIMATED WORKFLOW DEMO (Shows how propping phone beside PC works) ── */}
      {showAnimation && (
        <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-neutral-800/80 animate-in fade-in duration-200">
          <DualDeviceWorkflowAnimation />
        </div>
      )}

      {/* ── Collapsible Step-by-Step 3-Step Dual Workflow ── */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-neutral-800/80 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Step 1: Mobile */}
            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-900 flex items-center gap-1.5">
                    <Smartphone size={12} /> Step 1: On Phone
                  </span>
                  <CheckCircle2 size={16} className="text-[#04AA6D]" />
                </div>
                <h4 className="text-sm sm:text-base font-black text-black dark:text-white mt-1">
                  Read &amp; Inspect Guide
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1 leading-relaxed font-medium">
                  Read the 5-point bite-sized breakdown on this phone. Tap any 🪟 Windows 11 screenshot to zoom in for 1-to-1 visual code verification.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-neutral-800/60 text-xs font-mono text-slate-500">
                Target: {primaryFile}
              </div>
            </div>

            {/* Step 2: PC */}
            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-900 flex items-center gap-1.5">
                    <Laptop size={12} /> Step 2: On Laptop / PC
                  </span>
                  <Terminal size={16} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="text-sm sm:text-base font-black text-black dark:text-white mt-1">
                  Type &amp; Test in VS Code
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1 leading-relaxed font-medium">
                  Open terminal on PC and run <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 font-mono text-xs font-bold">code .</code>. Implement the specifications and test live in Google Chrome with Live Server.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-neutral-800/60 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">Folder: {targetFolder}</span>
                <button
                  onClick={handleCopyCmd}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Copy size={12} />
                  <span>Copy</span>
                </button>
              </div>
            </div>

            {/* Step 3: Verified Push */}
            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-900 flex items-center gap-1.5">
                    <ShieldCheck size={12} /> Step 3: Git Push &amp; Unlock
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 size={16} className="text-[#04AA6D]" />
                  ) : (
                    <ArrowRight size={16} className="text-slate-400" />
                  )}
                </div>
                <h4 className="text-sm sm:text-base font-black text-black dark:text-white mt-1">
                  GitHub Push &amp; Instant Sync
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1 leading-relaxed font-medium">
                  Push your code (<code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-neutral-800 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold">git push origin main</code>), answer the quick Viva check on your phone, and unlock Day {day + 1} simultaneously on both devices!
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-neutral-800/60 text-xs font-mono text-[#04AA6D] dark:text-emerald-400 font-bold">
                {isCompleted ? "✓ Day Completed & Verified" : "⏳ Ready for GitHub Verification"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Quick Windows 11 PC Terminal Launcher Bar ── */}
      <div className="mt-3.5 pt-3.5 border-t border-slate-200/60 dark:border-neutral-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300">
          <span className="px-2 py-0.5 rounded bg-slate-200/80 dark:bg-neutral-800 text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">
            🪟 Windows PC One-Liner
          </span>
          <code className="text-[#04AA6D] dark:text-emerald-400 font-bold truncate">
            mkdir {targetFolder}; cd {targetFolder}; code .
          </code>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleCopyCmd}
            className="text-xs sm:text-sm font-bold text-[#04AA6D] dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            {copiedCmd ? <Check size={13} className="stroke-[3]" /> : <Copy size={13} />}
            <span>{copiedCmd ? "Copied Instantly!" : "Copy One-Liner"}</span>
          </button>
          <span className="text-slate-300 dark:text-neutral-700">|</span>
          <button
            onClick={handleCopyUrl}
            className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white flex items-center gap-1 cursor-pointer"
          >
            {copiedUrl ? <Check size={13} className="stroke-[3]" /> : <Globe size={13} />}
            <span>{copiedUrl ? "URL Copied!" : "Copy Lesson Link"}</span>
          </button>
        </div>
      </div>

      {/* ── QR CODE MODAL ── */}
      {isQrModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setIsQrModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-6 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 border border-blue-500/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3 shadow-sm">
              <QrCode size={24} className="stroke-[2.5]" />
            </div>

            <h3 className="text-base font-extrabold text-black dark:text-white">
              Scan to Open on PC or Mobile
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 mb-4">
              Scan this QR code with your phone camera to study from your mobile while typing in VS Code on your laptop.
            </p>

            {/* QR Code image generated dynamically from official free endpoint */}
            <div className="p-3 bg-white rounded-2xl border border-slate-200 inline-block shadow-inner mx-auto mb-4">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=4&data=${encodeURIComponent(lessonUrl)}`}
                alt={`QR code for BCA Day ${day}`}
                className="w-48 h-48 rounded-lg"
              />
            </div>

            <div className="text-[11px] font-mono text-slate-500 break-all px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 mb-4">
              {lessonUrl}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyUrl}
                className="flex-1 py-2.5 rounded-xl bg-[#04AA6D] hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md shadow-emerald-500/20"
              >
                {copiedUrl ? <Check size={14} className="stroke-[3]" /> : <Copy size={14} />}
                <span>{copiedUrl ? "Link Copied!" : "Copy URL"}</span>
              </button>

              <button
                onClick={() => setIsQrModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-neutral-900 hover:bg-slate-200 dark:hover:bg-neutral-800 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );

  if (asModal) {
    return (
      <div 
        className="fixed inset-0 z-50 bg-black/60 dark:bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200 select-none"
        onClick={(e) => {
          if (e.target === e.currentTarget && onClose) onClose();
        }}
      >
        {barContent}
      </div>
    );
  }

  return barContent;
}
