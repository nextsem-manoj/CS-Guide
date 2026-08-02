"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, BookOpen, Sparkles, Send, CheckCircle2, PenTool, 
  Highlighter, Eraser, Trash2, Undo2, Star, X, ExternalLink, 
  FileText, Download, Loader2, RefreshCw, AlertTriangle
} from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { Capacitor } from '@capacitor/core';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

// Local RAG dictionary for BCA hardware/origins questions
const AI_RESPONSES: Record<string, { title: string; summary: string; code?: string }> = {
  "von neumann": {
    title: "Von Neumann Architecture",
    summary: "First proposed by mathematician John von Neumann in 1945, this design forms the basis of almost all modern computers. Key features include: 1) A shared memory system holding both program instructions and data (Stored Program Concept), 2) A Central Processing Unit (CPU) containing an ALU and registers, 3) Sequential instruction execution tracked by a Program Counter (PC).",
    code: "// Von Neumann Instruction Cycle:\n// 1. FETCH: Instruction at address PC loaded to Instruction Register (IR)\n// 2. DECODE: Control Unit (CU) interprets instruction opcode\n// 3. EXECUTE: ALU performs arithmetic, stores results in Accumulator (ACC)\n// 4. UPDATE: PC increments to point to next cell address."
  },
  "register": {
    title: "CPU Registers",
    summary: "Registers are ultra-fast, volatile storage cells located directly inside the CPU core. They hold active instructions, data values being processed, and memory addresses. Key registers include the Program Counter (PC), Accumulator (ACC), Instruction Register (IR), Memory Address Register (MAR), and Memory Buffer Register (MBR).",
    code: "Accumulator (ACC) = 15; // ALU workspace\nProgram Counter (PC) = 04;   // Index of next code cell\nInstruction Register (IR) = 'ADD 06';"
  },
  "gate": {
    title: "Digital Logic Gates",
    summary: "Logic gates are the physical building blocks of microchips. They implement Boolean algebra operations (AND, OR, NOT, XOR, NAND, NOR) using transistor switches. Multiple logic gates are connected to form integrated circuits (ICs) like half-adders and arithmetic logic units (ALUs).",
    code: "// AND Gate Truth Table:\n// A=0, B=0 => Output=0\n// A=1, B=0 => Output=0\n// A=1, B=1 => Output=1 (High voltage)"
  },
  "babbage": {
    title: "Charles Babbage & Engines",
    summary: "Charles Babbage, a 19th-century mathematician, designed the Difference Engine (to automate polynomial tables) and the Analytical Engine (the first general-purpose programmable computer). Though mechanical, the Analytical Engine featured a processor (Mill), memory (Store), punched card input, and printer output.",
    code: "// Analytical Engine Components:\n// Mill  == CPU (processes calculations)\n// Store == RAM (holds variables and program states)\n// Cards == Input (punched card instructions)"
  },
  "generation": {
    title: "Computer Generations",
    summary: "Computer evolution is divided into 5 eras based on switching technologies: 1st Gen (Vacuum Tubes - hot, bulky), 2nd Gen (Transistors - smaller, efficient), 3rd Gen (Integrated Circuits - silicon microchips), 4th Gen (Microprocessors/VLSI - single-chip CPU), and 5th Gen (ULSI & Artificial Intelligence).",
    code: "const generations = {\n  '1st': 'Vacuum Tubes',\n  '2nd': 'Transistors',\n  '3rd': 'Integrated Circuits (ICs)',\n  '4th': 'VLSI Microprocessors',\n  '5th': 'ULSI & Neural Nets (AI)'\n};"
  },
  "limit": {
    title: "Computer Limitations",
    summary: "Despite their high speed, computers have physical bottlenecks: 1) No native intelligence (depend on human program scripts), 2) Emotionless (no moral, artistic, or empathetic judgment), 3) Purely logical execution (susceptible to garbage-in, garbage-out errors).",
    code: "if (userInput === 'garbage') {\n    return 'garbage'; // GIGO limitation\n}"
  }
};

interface Point {
  x: number;
  y: number;
  mode: string;
  color: string;
  size: number;
}

export default function TextbookViewer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { completedChapters, markCompleted, markIncomplete } = useProgress();

  const fileUrl = searchParams.get('file') || '';
  const fileTitle = searchParams.get('title') || 'Textbook Unit';
  const pageParam = searchParams.get('page');

  // Compute canonical absolute PDF URL
  const absolutePdfUrl = fileUrl.startsWith('http')
    ? fileUrl
    : `https://nextsem.online${fileUrl.startsWith('/') ? '' : '/'}${fileUrl}`;

  const isPdfFile = fileUrl.toLowerCase().endsWith('.pdf') || fileUrl.includes('/BCA_NEW_Books/');
  const googleDocsUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(absolutePdfUrl)}`;

  // Default to direct PDF in-app viewer (false = direct native viewer, true = google docs)
  const [useGoogleDocs, setUseGoogleDocs] = useState<boolean>(false);
  const [showLaunchModal, setShowLaunchModal] = useState<boolean>(false);
  const [isOpeningNative, setIsOpeningNative] = useState<boolean>(false);

  // PDF Loading & Fallback states
  const [iframeLoaded, setIframeLoaded] = useState<boolean>(false);
  const [iframeTimedOut, setIframeTimedOut] = useState<boolean>(false);
  const [autoDownloaded, setAutoDownloaded] = useState<boolean>(false);

  let iframeSrc = useGoogleDocs && isPdfFile ? googleDocsUrl : fileUrl;
  if (fileUrl && pageParam && !fileUrl.includes('#page=') && !useGoogleDocs) {
    iframeSrc = `${fileUrl}#page=${pageParam}`;
  }

  // Trigger browser file download automatically
  const triggerAutoDownload = useCallback((url: string, filename?: string) => {
    try {
      const a = document.createElement('a');
      a.href = url;
      a.download = filename || 'IGNOU_BCA_Lesson_Notes.pdf';
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      window.open(url, '_blank');
    }
  }, []);

  // Timer: If PDF iframe fails to load or times out after 3.5s, trigger auto-download & show banner
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (fileUrl && isPdfFile && !iframeLoaded) {
      timer = setTimeout(() => {
        if (!iframeLoaded) {
          setIframeTimedOut(true);
          if (!autoDownloaded) {
            setAutoDownloaded(true);
            triggerAutoDownload(fileUrl, `${fileTitle}.pdf`);
          }
        }
      }, 3500);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [fileUrl, isPdfFile, iframeLoaded, autoDownloaded, fileTitle, triggerAutoDownload]);

  // Redirection for custom visual textbook notes pages
  useEffect(() => {
    if (fileUrl.toLowerCase().includes('unit 5.pdf') || fileUrl.toLowerCase().includes('unit-5')) {
      router.replace('/bca/notes/bcs-011-unit-5');
    }
  }, [fileUrl, router]);

  // Construct context key for reading progress
  const relativePath = fileUrl.replace('/BCA_NEW_Books/', '');
  const progressKey = `bca_unit:${relativePath}`;
  const isCompleted = !!completedChapters[progressKey];

  const [mounted, setMounted] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("guest");
  const [points, setPoints] = useState(0);

  // Drawing Canvas states
  const [isDrawOpen, setIsDrawOpen] = useState(false);
  const [tool, setTool] = useState<'pen' | 'highlighter' | 'eraser'>('pen');
  const [drawColor, setDrawColor] = useState<string>('#39FF14'); // Glowing green
  const [drawSize, setDrawSize] = useState<number>(3);

  // Canvas drawing ref variables
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef<boolean>(false);
  const pathsRef = useRef<Point[][]>([]);
  const currentPathRef = useRef<Point[]>([]);

  useEffect(() => {
    setMounted(true);

    const savedUser = localStorage.getItem('nextsem_user');
    let email = "guest";
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        email = parsed.email || "guest";
      } catch (e) {}
    }
    setUserEmail(email);

    const savedPoints = localStorage.getItem(`nextsem_bca_points_${email}`);
    if (savedPoints) {
      setPoints(parseInt(savedPoints) || 0);
    }

    // Load annotations if present
    const savedDrawings = localStorage.getItem(`bca_drawings:${relativePath}`);
    if (savedDrawings) {
      try {
        pathsRef.current = JSON.parse(savedDrawings);
      } catch (e) {}
    }
  }, [relativePath]);

  // Redraw canvas lines
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pathsRef.current.forEach((path) => {
      if (path.length === 0) return;
      ctx.beginPath();
      ctx.strokeStyle = path[0].mode === 'eraser' ? 'rgba(0,0,0,1)' : path[0].color;
      ctx.lineWidth = path[0].size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      if (path[0].mode === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
      } else {
        ctx.globalCompositeOperation = 'source-over';
      }

      ctx.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
      }
      ctx.stroke();
    });

    ctx.globalCompositeOperation = 'source-over';
  }, []);

  // Sync canvas size to container
  useEffect(() => {
    if (!isDrawOpen) return;
    
    const timer = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;

      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      redrawCanvas();
    }, 100);

    return () => clearTimeout(timer);
  }, [isDrawOpen, redrawCanvas]);

  // Handle Mark completed progress toggle
  const handleToggleRead = () => {
    const savedUser = localStorage.getItem('nextsem_user');
    let email = "guest";
    if (savedUser) {
      try {
        email = JSON.parse(savedUser).email || "guest";
      } catch (e) {}
    }

    if (isCompleted) {
      markIncomplete(progressKey);
      const newPoints = Math.max(0, points - 10);
      setPoints(newPoints);
      localStorage.setItem(`nextsem_bca_points_${email}`, newPoints.toString());
    } else {
      markCompleted(progressKey);
      const newPoints = points + 10;
      setPoints(newPoints);
      localStorage.setItem(`nextsem_bca_points_${email}`, newPoints.toString());
      playSound('success');
    }
  };

  const playSound = (type: 'success' | 'error') => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(type === 'success' ? 587.33 : 150, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {}
  };

  // Canvas Drawing mouse triggers
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    
    let clientX = 0;
    let clientY = 0;
    
    if ('touches' in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const handleStartDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const coords = getCoordinates(e);
    if (!coords) return;

    drawingRef.current = true;
    const size = tool === 'highlighter' ? 12 : tool === 'eraser' ? 20 : drawSize;
    const color = tool === 'highlighter' ? `${drawColor}60` : drawColor;

    const newPt: Point = { x: coords.x, y: coords.y, mode: tool, color, size };
    currentPathRef.current = [newPt];
    pathsRef.current.push(currentPathRef.current);
    redrawCanvas();
  };

  const handleDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    e.preventDefault();
    
    const coords = getCoordinates(e);
    if (!coords) return;

    const size = tool === 'highlighter' ? 12 : tool === 'eraser' ? 20 : drawSize;
    const color = tool === 'highlighter' ? `${drawColor}60` : drawColor;

    const newPt: Point = { x: coords.x, y: coords.y, mode: tool, color, size };
    currentPathRef.current.push(newPt);
    redrawCanvas();
  };

  const handleEndDraw = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    localStorage.setItem(`bca_drawings:${relativePath}`, JSON.stringify(pathsRef.current));
  };

  const handleUndo = () => {
    pathsRef.current.pop();
    localStorage.setItem(`bca_drawings:${relativePath}`, JSON.stringify(pathsRef.current));
    redrawCanvas();
  };

  const handleClearAll = () => {
    if (confirm("Clear all drawings and annotations on this page?")) {
      pathsRef.current = [];
      localStorage.removeItem(`bca_drawings:${relativePath}`);
      redrawCanvas();
    }
  };

  if (!mounted) {
    return (
      <div className="w-full h-screen bg-[#060c18] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-t-emerald-500 border-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-[#060c18] text-white flex flex-col justify-between font-sans selection:bg-[#c1a648]/30 overflow-hidden relative">
      
      {/* Header bar */}
      <header className="h-16 border-b border-slate-800/80 bg-[#060c18]/95 flex items-center justify-between px-3 md:px-6 shrink-0 z-30 shadow-md">
        <div className="flex items-center gap-3 min-w-0">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-1 text-slate-400 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0 p-1.5 rounded-lg hover:bg-slate-900"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back</span>
          </button>
          
          <div className="h-5 w-px bg-slate-800 hidden sm:block shrink-0" />
          
          <div className="min-w-0 text-left">
            <span className="text-[8px] text-amber-400 font-black uppercase tracking-widest block">Textbook Reader</span>
            <h1 className="text-xs sm:text-sm font-black text-white truncate leading-tight pr-2">
              {fileTitle} {pageParam ? `(Page ${pageParam})` : ''}
            </h1>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Mode Switcher Pill */}
          <div className="hidden sm:flex items-center bg-slate-900 p-0.5 rounded-xl border border-slate-800 text-[10px]">
            <button
              onClick={() => {
                setUseGoogleDocs(false);
                setIframeLoaded(false);
                setIframeTimedOut(false);
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                !useGoogleDocs ? "bg-cyan-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
              }`}
              title="View PDF directly in browser"
            >
              📄 Direct
            </button>
            <button
              onClick={() => {
                setUseGoogleDocs(true);
                setIframeLoaded(false);
                setIframeTimedOut(false);
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                useGoogleDocs ? "bg-cyan-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
              }`}
              title="View PDF via Google Docs"
            >
              🌐 Google View
            </button>
          </div>

          {/* Download PDF Button */}
          <button
            onClick={() => triggerAutoDownload(fileUrl, `${fileTitle}.pdf`)}
            className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
            title="Download PDF to device"
          >
            <Download size={13} />
            <span className="hidden md:inline">Download PDF</span>
          </button>

          {/* Open in New Tab / External */}
          <button
            onClick={() => window.open(fileUrl, '_blank')}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            title="Open PDF directly in new browser tab"
          >
            <ExternalLink size={13} />
            <span className="hidden lg:inline">New Tab</span>
          </button>
          
          {/* Toggle Pen Canvas */}
          <button
            onClick={() => setIsDrawOpen(!isDrawOpen)}
            className={`px-3 py-1.5 border rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              isDrawOpen 
                ? 'bg-emerald-500/10 border-emerald-400 text-emerald-350 shadow-md shadow-emerald-500/5' 
                : 'bg-slate-900 border-slate-800 text-slate-350 hover:bg-slate-850'
            }`}
          >
            <PenTool size={12} />
            <span className="hidden sm:inline">Pen</span>
          </button>

          {/* Mark Complete */}
          <button
            onClick={handleToggleRead}
            className={`px-3 py-1.5 border rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              isCompleted 
                ? 'bg-[#39D353]/15 border-[#39D353]/30 text-[#39D353]' 
                : 'bg-indigo-650 border-indigo-650 hover:bg-indigo-600 text-white'
            }`}
          >
            <CheckCircle2 size={12} />
            <span className="hidden xs:inline">{isCompleted ? 'Completed ✓' : 'Mark Read'}</span>
          </button>

          {/* XP Badge */}
          <div className="hidden lg:flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-550/20 px-3 py-1.5 rounded-full shrink-0">
            <Star size={12} className="fill-amber-400 text-amber-400 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-wider text-emerald-300">
              {points} XP
            </span>
          </div>
        </div>
      </header>

      {/* 🚀 NATIVE PDF LAUNCHER MODAL (Dark Mode #060c18) */}
      {showLaunchModal && (
        <div className="fixed inset-0 bg-[#060c18]/95 backdrop-blur-md z-[10000] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="max-w-sm w-full bg-[#0c1328] border-2 border-emerald-500/40 rounded-3xl p-6 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              {isOpeningNative ? (
                <Loader2 size={32} className="animate-spin text-cyan-400" />
              ) : (
                <FileText size={32} className="text-amber-400" />
              )}
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-extrabold text-white">
                Launch Official IGNOU BCA PDF
              </h3>
              <p className="text-xs text-slate-300">
                {fileTitle}
              </p>
              <p className="text-[11px] text-emerald-400 font-medium">
                {Capacitor.isNativePlatform() ? "Opening in Native App File Reader..." : "Opening in new high-speed tab..."}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setIsOpeningNative(true);
                  setTimeout(() => {
                    triggerAutoDownload(fileUrl, `${fileTitle}.pdf`);
                    setIsOpeningNative(false);
                    setShowLaunchModal(false);
                  }, 400);
                }}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <Download size={14} />
                <span>Open / Download PDF</span>
              </button>

              <button
                onClick={() => {
                  setShowLaunchModal(false);
                  router.back();
                }}
                className="w-full py-2.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-white font-bold text-xs transition-all cursor-pointer"
              >
                Cancel / Return to Lesson
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Core: Viewer Container */}
      <div className="flex-1 flex overflow-hidden relative bg-[#060c18]">
        
        {/* PDF Container */}
        <div className="flex-1 h-full bg-[#060c18] relative flex flex-col justify-center items-center">
          
          {/* Drawing Floating Toolbar */}
          {isDrawOpen && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#09090d]/95 border border-slate-850 p-2.5 rounded-2xl flex items-center gap-2.5 z-40 shadow-2xl">
              <button
                onClick={() => setTool('pen')}
                className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  tool === 'pen' ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-450 hover:bg-slate-900'
                }`}
                title="Pen tool"
              >
                <PenTool size={14} />
              </button>
              
              <button
                onClick={() => setTool('highlighter')}
                className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  tool === 'highlighter' ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-450 hover:bg-slate-900'
                }`}
                title="Highlighter tool"
              >
                <Highlighter size={14} />
              </button>

              <button
                onClick={() => setTool('eraser')}
                className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  tool === 'eraser' ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-450 hover:bg-slate-900'
                }`}
                title="Eraser tool"
              >
                <Eraser size={14} />
              </button>

              <div className="w-px h-5 bg-slate-850" />

              {/* Color Selectors */}
              <div className="flex items-center gap-1.5">
                {['#39FF14', '#FF3131', '#FFFF00', '#00FFFF', '#FF00FF'].map(c => (
                  <button
                    key={c}
                    onClick={() => setDrawColor(c)}
                    className={`w-3.5 h-3.5 rounded-full border transition-transform ${drawColor === c ? 'scale-120 border-white' : 'border-none'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>

              <div className="w-px h-5 bg-slate-850" />

              <button
                onClick={handleUndo}
                className="p-2 rounded-lg text-slate-450 hover:bg-slate-900 text-xs cursor-pointer"
                title="Undo stroke"
              >
                <Undo2 size={14} />
              </button>

              <button
                onClick={handleClearAll}
                className="p-2 rounded-lg text-red-400 hover:bg-red-500/5 text-xs cursor-pointer"
                title="Clear Page"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}

          {/* Interactive Banner: Auto-Download Notification & Quick Action Controls */}
          {iframeTimedOut && (
            <div className="w-full bg-[#0c1328] border-b border-amber-500/40 p-3 px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs z-30 shadow-lg animate-in slide-in-from-top duration-300">
              <div className="flex items-center gap-2.5 text-amber-300 font-medium">
                <AlertTriangle size={18} className="text-amber-400 shrink-0 animate-bounce" />
                <span>
                  <strong>PDF Auto-Downloaded!</strong> If in-app preview is taking time, tap below to open or download directly.
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                <button
                  onClick={() => triggerAutoDownload(fileUrl, `${fileTitle}.pdf`)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-md active:scale-95 cursor-pointer"
                >
                  <Download size={13} />
                  <span>Download Again</span>
                </button>
                <button
                  onClick={() => window.open(fileUrl, '_blank')}
                  className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-md cursor-pointer"
                >
                  <ExternalLink size={13} />
                  <span>Open in New Tab</span>
                </button>
                <button
                  onClick={() => {
                    setUseGoogleDocs(!useGoogleDocs);
                    setIframeLoaded(false);
                    setIframeTimedOut(false);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white font-bold text-[11px] cursor-pointer"
                >
                  <RefreshCw size={12} />
                  <span>{useGoogleDocs ? "Try Direct View" : "Try Google Docs View"}</span>
                </button>
              </div>
            </div>
          )}

          {/* PDF Frame with Native `<object>` and `<iframe>` Fallback */}
          <div className="w-full h-full relative flex items-center justify-center bg-[#060c18]">
            {iframeSrc ? (
              <object
                data={iframeSrc}
                type="application/pdf"
                className="w-full h-full border-none bg-[#060c18]"
                onLoad={() => setIframeLoaded(true)}
              >
                <iframe
                  src={iframeSrc}
                  className="w-full h-full border-none bg-[#060c18]"
                  title="PDF Textbook Reader"
                  onLoad={() => setIframeLoaded(true)}
                />
              </object>
            ) : (
              <div className="text-center p-6 text-slate-500">
                <BookOpen size={48} className="mx-auto mb-3 animate-bounce" />
                <p className="text-xs">No PDF textbook source configured for this page.</p>
              </div>
            )}

            {/* Transparent drawing layer */}
            {isDrawOpen && (
              <canvas
                ref={canvasRef}
                onMouseDown={handleStartDraw}
                onMouseMove={handleDrawing}
                onMouseUp={handleEndDraw}
                onMouseLeave={handleEndDraw}
                onTouchStart={handleStartDraw}
                onTouchMove={handleDrawing}
                onTouchEnd={handleEndDraw}
                className="absolute inset-0 z-30 cursor-crosshair touch-none"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
