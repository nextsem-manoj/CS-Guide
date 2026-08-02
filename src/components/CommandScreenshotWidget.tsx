"use client";

import React, { useState, useEffect, useRef } from "react";
import { Camera, Upload, Trash2, CheckCircle2, Image as ImageIcon, ZoomIn, X } from "lucide-react";

interface CommandScreenshotWidgetProps {
  lessonId: number;
  lessonSlug: string;
  lessonTitle: string;
}

export default function CommandScreenshotWidget({
  lessonId,
  lessonSlug,
  lessonTitle,
}: CommandScreenshotWidgetProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const storageKey = `nextsem_screenshot_${lessonSlug || lessonId}`;

  useEffect(() => {
    // 1. Try loading user uploaded screenshot from localStorage
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setImageSrc(saved);
    } else {
      // 2. Fallback check for static public image if available
      const staticPath = `/screenshots/cli/${lessonSlug}.png`;
      const img = new Image();
      img.src = staticPath;
      img.onload = () => setImageSrc(staticPath);
    }
  }, [lessonSlug, lessonId, storageKey]);

  // Handle file select or paste
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (PNG, JPG, WEBP).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setImageSrc(result);
        try {
          localStorage.setItem(storageKey, result);
        } catch (_) {
          console.warn("Image too large for localStorage, showing in session.");
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Clipboard Paste
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            const blob = items[i].getAsFile();
            if (blob) processFile(blob);
          }
        }
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [storageKey]);

  const handleRemove = () => {
    setImageSrc(null);
    localStorage.removeItem(storageKey);
  };

  return (
    <div className="my-8 space-y-3 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera size={18} className="text-[#04AA6D]" />
          <h3 className="text-sm font-extrabold text-white tracking-wide uppercase">
            Command Screenshot: <span className="text-[#c1a648]">{lessonTitle}</span>
          </h3>
        </div>

        {imageSrc && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsZoomed(true)}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
            >
              <ZoomIn size={14} />
              <span>Zoom</span>
            </button>
            <button
              onClick={handleRemove}
              className="px-2.5 py-1 bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-400 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              title="Remove Screenshot"
            >
              <Trash2 size={14} />
              <span>Replace</span>
            </button>
          </div>
        )}
      </div>

      {imageSrc ? (
        /* Real Command Screenshot Window Container */
        <div className="bg-[#0b101c] border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl transition-all relative group">
          {/* Windows CMD Title Bar */}
          <div className="bg-[#151c2e] px-4 py-2 border-b border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="text-xs font-mono font-bold text-slate-300 ml-2">
                ⊞ Command Prompt — {lessonTitle}
              </span>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
              ✓ Verified PC Screenshot
            </span>
          </div>

          {/* Screenshot Display */}
          <div 
            className="p-2 sm:p-4 bg-black/60 cursor-pointer flex justify-center items-center"
            onClick={() => setIsZoomed(true)}
          >
            <img
              src={imageSrc}
              alt={`Command prompt screenshot for ${lessonTitle}`}
              className="max-h-[450px] w-auto max-w-full rounded-lg object-contain shadow-lg border border-slate-800"
            />
          </div>
        </div>
      ) : (
        /* Dropzone Upload & Paste Box */
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-700 hover:border-[#04AA6D] bg-slate-900/30 hover:bg-slate-900/60 p-6 sm:p-8 rounded-2xl text-center transition-all cursor-pointer space-y-3 group"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#04AA6D]/10 text-[#04AA6D] flex items-center justify-center mx-auto border border-[#04AA6D]/20 group-hover:scale-110 transition-transform">
            <Upload size={24} />
          </div>

          <div className="space-y-1">
            <h4 className="text-base font-bold text-white">
              Upload / Paste PC Command Screenshot
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Take a screenshot of the actual command running on your PC terminal, then <strong className="text-emerald-400">paste (Ctrl+V)</strong> or click to select image.
            </p>
          </div>

          <button className="px-4 py-2 bg-[#04AA6D] hover:bg-[#039861] text-white text-xs font-extrabold rounded-xl shadow-md transition-all cursor-pointer">
            Select Screenshot Image
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      )}

      {/* Lightbox Modal */}
      {isZoomed && imageSrc && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button 
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 p-3 bg-slate-900 text-white rounded-full hover:bg-slate-800 border border-slate-700 cursor-pointer"
          >
            <X size={20} />
          </button>
          <img
            src={imageSrc}
            alt={`Full zoom screenshot for ${lessonTitle}`}
            className="max-h-[90vh] max-w-[95vw] object-contain rounded-xl shadow-2xl border border-slate-700"
          />
        </div>
      )}
    </div>
  );
}
