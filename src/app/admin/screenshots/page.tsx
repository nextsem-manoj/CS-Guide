"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Camera, Upload, Plus, Trash2, Save, Copy, Check, 
  ArrowLeft, Eye, Rocket, Globe, Sparkles, RefreshCw, CheckCircle2, AlertTriangle, Terminal, X
} from "lucide-react";
import { cliLessons } from "@/data/cliLessonsData";
import { mswordLessons } from "@/data/mswordLessonsData";
import { htmlLessons } from "@/data/htmlLessonsData";
import LessonScreenshotWidget, { ScreenshotItem } from "@/components/LessonScreenshotWidget";

type SubjectType = "msword" | "cli" | "html";

export default function ScreenshotManagerPage() {
  const [subject, setSubject] = useState<SubjectType>("msword");
  const [selectedLessonId, setSelectedLessonId] = useState<number>(1);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState<string | null>(null);
  const [deployLog, setDeployLog] = useState<string | null>(null);
  const [deploySuccess, setDeploySuccess] = useState<boolean | null>(null);

  // Storage for custom screenshots
  const [customScreenshotsMap, setCustomScreenshotsMap] = useState<Record<string, ScreenshotItem[]>>({});

  // Active form state for adding screenshot
  const [steps, setSteps] = useState<ScreenshotItem[]>([]);
  const [newSrc, setNewSrc] = useState("");
  const [newCaption, setNewCaption] = useState("");

  // Get active lesson list based on subject
  const currentLessons = subject === "msword" ? mswordLessons : subject === "cli" ? cliLessons : htmlLessons;
  const activeLesson = currentLessons.find(l => l.id === selectedLessonId) || currentLessons[0];

  // Default suggested image path for selected lesson
  const suggestedPath = `/screenshots/${subject}/lesson${activeLesson.id}_step1_${subject === "msword" ? "start" : "cmd"}.png`;

  // Load custom screenshots from localStorage on mount & subject/lesson change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storageKey = `nextsem_custom_screenshots_${subject}`;
      const saved = localStorage.getItem(storageKey);
      let map: Record<string, ScreenshotItem[]> = {};
      if (saved) {
        try { map = JSON.parse(saved); } catch (e) {}
      }
      setCustomScreenshotsMap(map);

      // Load steps for active lesson
      const key = `${subject}_${activeLesson.id}`;
      const existing = map[key] || ((activeLesson as unknown as Record<string, unknown>).screenshots as ScreenshotItem[]) || [];
      setSteps(existing);
      setNewSrc(suggestedPath);
    }
  }, [subject, selectedLessonId]);

  // Handle local file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        setNewSrc(result);
        if (!newCaption) {
          setNewCaption(`Step ${steps.length + 1}: ${activeLesson.title} screenshot`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new step screenshot
  const handleAddStep = () => {
    if (!newSrc) return;
    const stepNum = steps.length + 1;
    const newItem: ScreenshotItem = {
      src: newSrc,
      caption: newCaption || `Step ${stepNum}: ${activeLesson.title}`,
      alt: `${subject.toUpperCase()} Lesson ${activeLesson.id} Step ${stepNum}`,
      stepNumber: stepNum
    };
    const updated = [...steps, newItem];
    setSteps(updated);

    // Save to local state & localStorage map
    const key = `${subject}_${activeLesson.id}`;
    const newMap = { ...customScreenshotsMap, [key]: updated };
    setCustomScreenshotsMap(newMap);
    localStorage.setItem(`nextsem_custom_screenshots_${subject}`, JSON.stringify(newMap));

    // Reset form
    setNewCaption("");
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Delete step screenshot
  const handleDeleteStep = (index: number) => {
    const updated = steps.filter((_, i) => i !== index);
    setSteps(updated);
    const key = `${subject}_${activeLesson.id}`;
    const newMap = { ...customScreenshotsMap, [key]: updated };
    setCustomScreenshotsMap(newMap);
    localStorage.setItem(`nextsem_custom_screenshots_${subject}`, JSON.stringify(newMap));
  };

  // Trigger Actual Production Deployment via API
  const handleDeployToProd = async () => {
    setIsDeploying(true);
    setDeployStatus("⚙️ Executing build & Firebase production deployment to https://nextsem.online... Please wait 30–60s.");
    setDeployLog(null);
    setDeploySuccess(null);

    try {
      const res = await fetch('/api/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target: 'production' })
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        setDeploySuccess(true);
        setDeployStatus("🎉 LIVE DEPLOYMENT COMPLETE! Site updated at https://nextsem.online");
        setDeployLog(data.output || "Deployment completed successfully!");
      } else {
        setDeploySuccess(false);
        setDeployStatus(`⚠️ Deployment issue: ${data.message || 'Build or Firebase upload error'}`);
        setDeployLog(data.errors || data.output || "Check terminal for firebase login status.");
      }
    } catch (err: any) {
      setDeploySuccess(false);
      setDeployStatus(`⚠️ Deploy error: ${err.message || 'Network request failed'}`);
      setDeployLog(err.stack || "Ensure firebase CLI is logged in.");
    } finally {
      setIsDeploying(false);
    }
  };

  const filteredLessons = currentLessons.filter(l => 
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.id.toString() === searchQuery
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      {/* ── Top Bar with Title & Actual Deploy Button ── */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
        <div className="flex items-center gap-3">
          <Link href="/msword" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Camera size={20} />
              </span>
              <h1 className="text-xl md:text-2xl font-black text-white">Screenshot Manager</h1>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Attach real Windows 11 screenshots to lessons & trigger 1-click live production deployment
            </p>
          </div>
        </div>

        {/* Action Controls: Subject Switcher & Actual Deploy Button */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Subject Pills */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-2xl">
            <button
              onClick={() => { setSubject("msword"); setSelectedLessonId(1); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                subject === "msword" ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-white"
              }`}
            >
              📄 MS Word 365
            </button>
            <button
              onClick={() => { setSubject("cli"); setSelectedLessonId(1); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                subject === "cli" ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-white"
              }`}
            >
              💻 Windows CLI
            </button>
            <button
              onClick={() => { setSubject("html"); setSelectedLessonId(1); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                subject === "html" ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-white"
              }`}
            >
              🌐 HTML5
            </button>
          </div>

          {/* 🚀 REAL PROD DEPLOY BUTTON */}
          <button
            onClick={handleDeployToProd}
            disabled={isDeploying}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-500 to-teal-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-emerald-950/50 hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            <Rocket size={16} className={isDeploying ? "animate-spin" : ""} />
            <span>{isDeploying ? "Building & Deploying..." : "🚀 Deploy to Prod Now"}</span>
          </button>
        </div>
      </div>

      {/* Deployment Status Card */}
      {deployStatus && (
        <div className={`max-w-7xl mx-auto mb-6 p-4 rounded-2xl border text-xs font-bold space-y-2 animate-fadeIn ${
          deploySuccess === true 
            ? "bg-emerald-950/60 border-emerald-500/60 text-emerald-300"
            : deploySuccess === false
            ? "bg-rose-950/60 border-rose-500/60 text-rose-300"
            : "bg-blue-950/60 border-blue-500/60 text-blue-300"
        }`}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Globe size={18} className={isDeploying ? "animate-spin text-blue-400" : "text-emerald-400"} />
              <span className="font-black">{deployStatus}</span>
            </div>
            <button onClick={() => { setDeployStatus(null); setDeployLog(null); }} className="text-slate-400 hover:text-white p-1">
              <X size={16} />
            </button>
          </div>

          {deployLog && (
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] font-mono overflow-x-auto max-h-48 text-slate-300 scrollbar-thin">
              <pre className="whitespace-pre-wrap">{deployLog}</pre>
            </div>
          )}
        </div>
      )}

      {/* ── Main 2-Column Work Area ── */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        {/* Left Column: Lesson Selector */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-black uppercase text-slate-300 tracking-wider">Select Lesson</h2>
              <span className="text-[10px] font-black text-blue-400 bg-blue-950/60 border border-blue-800/60 px-2 py-0.5 rounded-md">
                {currentLessons.length} Total
              </span>
            </div>
            
            <input 
              type="text" 
              placeholder="Search by title or lesson #..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />

            <div className="h-[520px] overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
              {filteredLessons.map(l => {
                const key = `${subject}_${l.id}`;
                const hasCustom = customScreenshotsMap[key] && customScreenshotsMap[key].length > 0;
                const isSelected = l.id === selectedLessonId;

                return (
                  <button
                    key={l.id}
                    onClick={() => setSelectedLessonId(l.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected 
                        ? "bg-blue-600/20 border-blue-500 text-blue-300 font-bold shadow-md"
                        : "bg-slate-950/50 border-slate-800/80 hover:bg-slate-900 text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className={`text-[10px] font-black w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400"
                      }`}>
                        {l.id}
                      </span>
                      <span className="text-xs truncate">{l.title}</span>
                    </div>
                    {hasCustom && (
                      <span className="text-[9px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                        <CheckCircle2 size={10} /> {customScreenshotsMap[key].length} Pic
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Simplified Add & Preview Card */}
        <div className="lg:col-span-8 space-y-6">
          {/* Selected Lesson Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-400 bg-blue-950/60 border border-blue-800/60 px-2.5 py-1 rounded-md">
                  Lesson {activeLesson.id} · {subject.toUpperCase()}
                </span>
                <h2 className="text-lg md:text-xl font-black text-white mt-2">{activeLesson.title}</h2>
              </div>

              <Link 
                href={`/${subject}/${activeLesson.slug}`} 
                target="_blank"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-colors shrink-0 self-start sm:self-center"
              >
                <Eye size={14} className="text-blue-400" />
                <span>View Live Page</span>
              </Link>
            </div>

            {/* Simple Upload Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase text-slate-300 tracking-wider flex items-center gap-1.5">
                <Upload size={14} className="text-blue-400" />
                <span>Add Screenshot to Lesson {activeLesson.id}</span>
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {/* Upload Box */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <label className="w-full sm:w-auto px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md shrink-0">
                    <Upload size={16} />
                    <span>Choose File from PC</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>

                  <span className="text-xs text-slate-500 font-bold">OR Path:</span>

                  <input
                    type="text"
                    placeholder="/screenshots/msword/lesson1_step1_start.png"
                    value={newSrc}
                    onChange={(e) => setNewSrc(e.target.value)}
                    className="w-full flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Caption Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Step Caption / Description</label>
                  <input
                    type="text"
                    placeholder="e.g. Open MS Word 365 start screen displaying blank document & templates"
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handleAddStep}
                  disabled={!newSrc}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <Save size={15} />
                  <span>Attach Screenshot to Lesson</span>
                </button>

                {savedSuccess && (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 animate-pulse">
                    <CheckCircle2 size={16} /> Saved & Live!
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Attached Screenshots List */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase text-slate-300 tracking-wider">
              Attached Screenshots ({steps.length})
            </h3>

            {steps.length === 0 ? (
              <div className="p-8 bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl text-center text-slate-500 text-xs">
                No screenshots attached yet. Choose a file above to add your first Windows 11 screenshot!
              </div>
            ) : (
              <div className="space-y-3">
                {steps.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-900 border border-slate-800 rounded-xl gap-4">
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div className="w-20 h-12 bg-slate-950 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                        <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-black text-blue-400 uppercase">Step {idx + 1}</span>
                        <p className="text-xs font-bold text-white truncate">{item.caption}</p>
                        <p className="text-[10px] text-slate-500 font-mono truncate">{item.src}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteStep(idx)}
                      className="p-2 rounded-lg bg-red-950/40 border border-red-800/40 text-red-400 hover:text-white hover:bg-red-900 transition-colors cursor-pointer"
                      title="Delete Step"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Live Lesson Widget Preview */}
            <div className="pt-4 border-t border-slate-800">
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider block mb-3">Live Lesson Preview</span>
              <LessonScreenshotWidget screenshots={steps} subjectTitle={activeLesson.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
