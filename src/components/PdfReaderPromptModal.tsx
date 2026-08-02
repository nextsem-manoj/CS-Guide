"use client";

import React from "react";
import { FileText, Download, ExternalLink, X } from "lucide-react";

interface PdfReaderPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

export const PdfReaderPromptModal: React.FC<PdfReaderPromptModalProps> = ({
  isOpen,
  onClose,
  pdfUrl,
}) => {
  if (!isOpen) return null;

  const handleOpenGoogleDriveViewer = () => {
    const driveViewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`;
    window.open(driveViewerUrl, "_blank");
    onClose();
  };

  const handleOpenPlayStorePdfReader = () => {
    window.open("https://play.google.com/store/apps/details?id=com.google.android.apps.pdfviewer", "_blank");
    onClose();
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[10000] animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-sm bg-[#090d22] border-2 border-emerald-500/50 rounded-3xl p-6 z-[10001] shadow-[0_0_50px_rgba(4,170,109,0.3)] animate-in zoom-in-95 duration-200 text-slate-100 select-none space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-amber-300">
                PDF Reader App Required
              </h3>
              <p className="text-[11px] text-slate-400">
                Choose how to view your downloaded lesson PDF
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-2.5 pt-1">
          <button
            onClick={handleOpenGoogleDriveViewer}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <ExternalLink size={14} />
            <span>Open in Google Drive Viewer</span>
          </button>

          <button
            onClick={handleOpenPlayStorePdfReader}
            className="w-full py-2.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 hover:text-amber-200 transition-all cursor-pointer"
          >
            <Download size={14} />
            <span>Get PDF Reader from Play Store</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 px-4 text-center text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};
