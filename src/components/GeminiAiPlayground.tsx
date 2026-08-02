"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, Send, Bot, Copy, Check, Key, 
  Trash2, RefreshCw, ArrowLeft, Code, Zap, HelpCircle, BookOpen, ExternalLink, ShieldCheck
} from "lucide-react";
import { askGemini } from "@/lib/gemini";
import { queryOfflineAi } from "@/lib/offlineAiEngine";
import AdSenseBanner from "./AdSenseBanner";

interface PromptHistoryItem {
  id: string;
  timestamp: string;
  prompt: string;
  response: string;
  persona: string;
  sourceUrl?: string;
  sourceTitle?: string;
}

const SAMPLE_PROMPTS = [
  {
    title: "Explain React Hooks",
    persona: "Web Dev Tutor",
    prompt: "Explain useState and useEffect hooks in React with simple real-world analogies and code snippets."
  },
  {
    title: "Debug JavaScript Code",
    persona: "Code Debugger",
    prompt: "Why does `[1, 2, 10].sort()` result in `[1, 10, 2]` in JavaScript? Explain the behavior and show how to fix it."
  },
  {
    title: "CSS Flexbox vs Grid",
    persona: "Web Dev Tutor",
    prompt: "When should I use CSS Flexbox instead of CSS Grid? Give clear use cases."
  },
  {
    title: "Explain Von Neumann Architecture",
    persona: "BCA Exam Tutor",
    prompt: "Explain the Von Neumann Architecture (CPU, ALU, Control Unit, Bus, Memory) in simple terms."
  },
  {
    title: "Command Prompt Basics",
    persona: "Terminal & CLI Expert",
    prompt: "How to use mkdir, cd, dir, and echo commands in Windows Command Prompt?"
  }
];

const PERSONAS = [
  { id: "Web Dev Tutor", name: "💻 Web Dev Tutor", instruction: "You are a friendly, expert Web Development Tutor for Nextsem Academy. Explain concepts clearly using code snippets, bullet points, and simple examples." },
  { id: "Terminal & CLI Expert", name: "🖥️ Terminal & CLI Expert", instruction: "You are a Windows Command Prompt & Terminal operations expert. Explain CLI commands with clear examples." },
  { id: "BCA Exam Tutor", name: "🎓 BCA Exam Tutor", instruction: "You are a university Computer Science & BCA exam tutor. Provide structured, high-scoring exam answers with bullet points and key definitions." },
  { id: "Offline Knowledge Engine", name: "⚡ Offline Nextsem Engine (100% Free)", instruction: "Fast offline curriculum search engine across 3,500+ lessons without any API key." }
];

export default function GeminiAiPlayground() {
  const [apiKey, setApiKey] = useState<string>("");
  const [useOnlineGemini, setUseOnlineGemini] = useState<boolean>(false);
  const [showKeyInput, setShowKeyInput] = useState<boolean>(false);
  const [promptInput, setPromptInput] = useState<string>("");
  const [selectedPersona, setSelectedPersona] = useState<string>("Web Dev Tutor");
  const [selectedModel, setSelectedModel] = useState<string>("gemini-1.5-flash");
  
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [currentResponse, setCurrentResponse] = useState<string>("");
  const [currentSourceUrl, setCurrentSourceUrl] = useState<string | undefined>(undefined);
  const [currentSourceTitle, setCurrentSourceTitle] = useState<string | undefined>(undefined);
  const [history, setHistory] = useState<PromptHistoryItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load API Key & Prompt History on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedKey = localStorage.getItem("nextsem_gemini_api_key") || "";
      setApiKey(savedKey);
      if (savedKey) setUseOnlineGemini(true);

      const savedHistory = localStorage.getItem("nextsem_gemini_history");
      if (savedHistory) {
        try {
          setHistory(JSON.parse(savedHistory));
        } catch (e) {}
      }
    }
  }, []);

  const saveApiKey = (key: string) => {
    setApiKey(key);
    if (typeof window !== "undefined") {
      localStorage.setItem("nextsem_gemini_api_key", key);
    }
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promptInput.trim() || isGenerating) return;

    const promptText = promptInput.trim();
    setIsGenerating(true);
    setCurrentResponse("");
    setCurrentSourceUrl(undefined);
    setCurrentSourceTitle(undefined);

    const personaObj = PERSONAS.find(p => p.id === selectedPersona) || PERSONAS[0];

    try {
      let resultText = "";
      let sourceUrl: string | undefined = undefined;
      let sourceTitle: string | undefined = undefined;

      if (useOnlineGemini && apiKey.trim()) {
        // Run via online Gemini API
        resultText = await askGemini(promptText, apiKey, personaObj.instruction, selectedModel);
      } else {
        // Run 100% Offline using Nextsem Knowledge Engine (Zero API Key needed!)
        const offlineResult = queryOfflineAi(promptText, selectedPersona);
        resultText = offlineResult.markdown;
        sourceUrl = offlineResult.sourceLessonUrl;
        sourceTitle = offlineResult.sourceLessonTitle;
      }

      setCurrentResponse(resultText);
      setCurrentSourceUrl(sourceUrl);
      setCurrentSourceTitle(sourceTitle);

      // Save to prompt history
      const newItem: PromptHistoryItem = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        prompt: promptText,
        response: resultText,
        persona: selectedPersona,
        sourceUrl,
        sourceTitle
      };

      const updatedHistory = [newItem, ...history.slice(0, 19)];
      setHistory(updatedHistory);
      if (typeof window !== "undefined") {
        localStorage.setItem("nextsem_gemini_history", JSON.stringify(updatedHistory));
      }
    } catch (err: any) {
      console.error("AI Generation Error:", err);
      // Fallback to offline engine if online API fails
      const offlineFallback = queryOfflineAi(promptText, selectedPersona);
      setCurrentResponse(`⚠️ Online API Notice: ${err.message}\n\nFalling back to Nextsem Offline Engine:\n\n${offlineFallback.markdown}`);
      setCurrentSourceUrl(offlineFallback.sourceLessonUrl);
      setCurrentSourceTitle(offlineFallback.sourceLessonTitle);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear prompt history?")) {
      setHistory([]);
      if (typeof window !== "undefined") {
        localStorage.removeItem("nextsem_gemini_history");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4 md:px-8 max-w-[1400px] mx-auto text-left">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/60 pb-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
            <Sparkles size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[9px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck size={10} /> 100% Offline Capable (No API Key Required)
              </span>
              {useOnlineGemini && (
                <span className="text-[9px] font-black uppercase tracking-wider text-indigo-400 bg-indigo-950/60 border border-indigo-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Zap size={9} /> Gemini Online Mode
                </span>
              )}
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white mt-1">
              AI Prompt Studio &amp; Knowledge Engine
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Ask questions, generate explanations, debug code, and search 3,500+ Nextsem lessons offline.
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowKeyInput(!showKeyInput)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
            title="Configure optional online Gemini API Key"
          >
            <Key size={14} className={apiKey ? "text-emerald-400" : "text-slate-400"} />
            <span>{apiKey ? "Gemini Key Configured" : "Optional Gemini Key"}</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-all"
          >
            <ArrowLeft size={14} />
            <span>Dashboard</span>
          </Link>
        </div>
      </div>

      {/* Optional Gemini API Key Settings Panel */}
      {showKeyInput && (
        <div className="mb-6 p-5 bg-slate-900/90 border border-indigo-500/30 rounded-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Key size={16} className="text-indigo-400" />
              <span className="text-xs font-black uppercase tracking-wider text-white">Optional Gemini API Key (Online Mode)</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold">Offline engine works great without key!</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="password"
              placeholder="Paste optional Gemini API Key (e.g. AIzaSy...)"
              value={apiKey}
              onChange={(e) => {
                saveApiKey(e.target.value);
                setUseOnlineGemini(!!e.target.value.trim());
              }}
              className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
            <button
              onClick={() => {
                setShowKeyInput(false);
                setUseOnlineGemini(!!apiKey.trim());
              }}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Save &amp; Enable Online Mode
            </button>
          </div>
        </div>
      )}

      {/* Sample Prompt Chips */}
      <div className="mb-6 space-y-2">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
          💡 Try Sample Prompts (Instant Offline Results):
        </span>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_PROMPTS.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPromptInput(sample.prompt);
                setSelectedPersona(sample.persona);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
            >
              <Sparkles size={12} className="text-indigo-400" />
              <span>{sample.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Prompt Form & Response Pane */}
        <div className="lg:col-span-2 space-y-6">
          {/* Form Controls */}
          <form onSubmit={handleGenerate} className="bg-slate-950 border border-slate-850 p-5 rounded-3xl space-y-4 shadow-xl backdrop-blur-xl">
            {/* Engine & Mode Switcher */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                  AI Persona Mode
                </label>
                <select
                  value={selectedPersona}
                  onChange={(e) => setSelectedPersona(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  {PERSONAS.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                  Execution Engine
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setUseOnlineGemini(false)}
                    className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      !useOnlineGemini
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-black"
                        : "bg-slate-900 text-slate-400 border-slate-800"
                    }`}
                  >
                    ⚡ Offline Engine (Free)
                  </button>
                  {apiKey && (
                    <button
                      type="button"
                      onClick={() => setUseOnlineGemini(true)}
                      className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        useOnlineGemini
                          ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/40 font-black"
                          : "bg-slate-900 text-slate-400 border-slate-800"
                      }`}
                    >
                      🤖 Gemini Online
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Prompt Textarea */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                Your Prompt / Question
              </label>
              <textarea
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Ask anything (e.g. Explain how flexbox works, von neumann architecture, mkdir command, or Doctypes)..."
                rows={4}
                className="w-full p-4 bg-slate-900/60 border border-slate-800 focus:border-indigo-500/60 rounded-2xl text-xs md:text-sm text-white focus:outline-none leading-relaxed font-medium placeholder-slate-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isGenerating || !promptInput.trim()}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-indigo-600/25 active:scale-95"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Searching Knowledge Base...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Run Prompt (Instant Result)</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* AI Response Display Card */}
          {(isGenerating || currentResponse) && (
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Bot size={18} className="text-indigo-400" />
                  <span className="text-xs font-black uppercase tracking-wider text-white">Prompt Output</span>
                  <span className="text-[9px] font-mono text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/20">
                    {useOnlineGemini ? "Gemini Online" : "100% Offline Engine"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {currentSourceUrl && (
                    <Link
                      href={currentSourceUrl}
                      className="flex items-center gap-1 text-[10px] font-black uppercase text-indigo-400 hover:text-indigo-300 bg-indigo-950/40 border border-indigo-500/30 px-3 py-1 rounded-lg transition-all"
                    >
                      <BookOpen size={12} />
                      <span>Open Full Lesson: {currentSourceTitle}</span>
                      <ExternalLink size={10} />
                    </Link>
                  )}

                  {currentResponse && (
                    <button
                      onClick={() => handleCopyText(currentResponse, "current")}
                      className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-white px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
                    >
                      {copiedId === "current" ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span>{copiedId === "current" ? "Copied" : "Copy Result"}</span>
                    </button>
                  )}
                </div>
              </div>

              {isGenerating ? (
                <div className="py-8 flex flex-col items-center justify-center space-y-3">
                  <div className="w-10 h-10 border-4 border-t-emerald-500 border-slate-800 rounded-full animate-spin" />
                  <span className="text-xs text-slate-400 font-semibold animate-pulse">
                    Synthesizing offline knowledge base explanation...
                  </span>
                </div>
              ) : (
                <article className="prose prose-invert max-w-none text-xs md:text-sm leading-relaxed text-slate-200">
                  {currentResponse.split("\n\n").map((para, idx) => {
                    const trimmed = para.trim();
                    if (!trimmed) return null;

                    if (trimmed.startsWith("###")) {
                      return <h3 key={idx} className="text-sm md:text-base font-bold text-indigo-300 mt-4 mb-2">{trimmed.replace(/###/g, "").trim()}</h3>;
                    }
                    if (trimmed.startsWith("##")) {
                      return <h2 key={idx} className="text-base md:text-lg font-bold text-white mt-5 mb-2 border-b border-slate-800 pb-1">{trimmed.replace(/##/g, "").trim()}</h2>;
                    }
                    if (trimmed.startsWith("```")) {
                      const codeText = trimmed.replace(/```[a-z]*/g, "").trim();
                      return (
                        <pre key={idx} className="bg-slate-900 border border-slate-800 p-4 rounded-xl font-mono text-xs text-emerald-300 overflow-x-auto my-3 leading-relaxed">
                          {codeText}
                        </pre>
                      );
                    }
                    if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
                      return (
                        <li key={idx} className="ml-4 list-disc text-slate-300 my-1">
                          {trimmed.replace(/^[\*\-]\s+/, "")}
                        </li>
                      );
                    }

                    return <p key={idx} className="my-2 text-slate-300 leading-relaxed font-medium">{trimmed}</p>;
                  })}
                </article>
              )}
            </div>
          )}
        </div>

        {/* Sidebar: Prompt History */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span>Recent Prompt Runs</span>
              <span className="text-[10px] text-slate-500 font-mono">({history.length})</span>
            </h3>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-[10px] font-bold text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1 cursor-pointer"
                title="Clear history"
              >
                <Trash2 size={10} />
                <span>Clear</span>
              </button>
            )}
          </div>

          <div className="bg-slate-950 border border-slate-850 rounded-3xl p-4 space-y-3 max-h-[650px] overflow-y-auto custom-scrollbar">
            {history.length === 0 ? (
              <div className="py-12 text-center text-slate-500 space-y-2">
                <HelpCircle size={24} className="mx-auto opacity-40" />
                <p className="text-xs font-medium">No prompt runs yet.</p>
                <p className="text-[10px]">Your run history will automatically appear here!</p>
              </div>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-2 text-left hover:border-indigo-500/30 transition-all"
                >
                  <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono">
                    <span className="text-indigo-400 font-bold uppercase">{item.persona}</span>
                    <span>{item.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-200 font-bold line-clamp-2">
                    "{item.prompt}"
                  </p>

                  <div className="flex items-center gap-2 pt-1 border-t border-slate-800/40">
                    <button
                      onClick={() => {
                        setPromptInput(item.prompt);
                        setSelectedPersona(item.persona);
                        setCurrentResponse(item.response);
                        setCurrentSourceUrl(item.sourceUrl);
                        setCurrentSourceTitle(item.sourceTitle);
                      }}
                      className="text-[10px] font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      Load Prompt
                    </button>
                    <span className="text-slate-700">•</span>
                    <button
                      onClick={() => handleCopyText(item.response, item.id)}
                      className="text-[10px] font-bold text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      {copiedId === item.id ? "Copied!" : "Copy Answer"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Ad Banner */}
      <div className="mt-10">
        <AdSenseBanner />
      </div>
    </div>
  );
}
