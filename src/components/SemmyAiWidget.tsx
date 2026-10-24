"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Send, Minimize2, ChevronRight, Key } from 'lucide-react';
import Link from 'next/link';
import { getSemmyResponses, querySemmy, SemmyKnowledgeBase } from '@/data/semmyAiData';
import { askGemini } from '@/lib/gemini';
import { Capacitor } from '@capacitor/core';

interface ChatMessage {
  id: string;
  sender: 'user' | 'semmy';
  text: string;
  hasCode?: boolean;
  code?: string;
  notFound?: boolean;
  keyword?: string;
}

const GREETINGS = [
  "Hi! I'm Semmy 🤖 Ask me about CPU registers, logic gates, Von Neumann, or BCA concepts!",
  "Hey there! 👋 I know about BIOS, RAM, ALU, computer generations & more. What's on your mind?",
  "Hello! I'm Semmy AI 🧠 Your BCA study companion. Ask me anything from your syllabus!",
];

export default function SemmyAiWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [kb, setKb] = useState<SemmyKnowledgeBase>({});
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [pulseActive, setPulseActive] = useState(true);
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load knowledge base & listen for updates from training playground
  useEffect(() => {
    setKb(getSemmyResponses());
    
    if (typeof window !== 'undefined') {
      setGeminiApiKey(localStorage.getItem('nextsem_gemini_api_key') || '');
    }

    // Set greeting message
    const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    setMessages([{ id: '0', sender: 'semmy', text: greeting }]);

    // Listen for storage updates (from training playground)
    const handleStorage = () => {
      setKb(getSemmyResponses());
    };

    const handleApiKeyUpdate = () => {
      setGeminiApiKey(localStorage.getItem('nextsem_gemini_api_key') || '');
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('nextsem_semmy_updated', handleStorage);
    window.addEventListener('nextsem_api_key_updated', handleApiKeyUpdate);
    window.addEventListener('storage', handleApiKeyUpdate);

    // Stop pulsing after 5s
    const timer = setTimeout(() => setPulseActive(false), 5000);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('nextsem_semmy_updated', handleStorage);
      window.removeEventListener('nextsem_api_key_updated', handleApiKeyUpdate);
      window.removeEventListener('storage', handleApiKeyUpdate);
      clearTimeout(timer);
    };
  }, []);

  const handleSaveApiKey = (val: string) => {
    setGeminiApiKey(val);
    if (typeof window !== 'undefined') {
      if (val) {
        localStorage.setItem('nextsem_gemini_api_key', val);
      } else {
        localStorage.removeItem('nextsem_gemini_api_key');
      }
      window.dispatchEvent(new Event('nextsem_api_key_updated'));
    }
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen && !isMinimized) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasNewMessage(false);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const query = input.trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(async () => {
      const concept = querySemmy(query, kb);

      if (concept) {
        setIsTyping(false);
        const reply: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'semmy',
          text: `**${concept.title}**\n\n${concept.summary}`,
          hasCode: !!concept.code,
          code: concept.code,
        };
        setMessages(prev => [...prev, reply]);
      } else {
        // Try to query Gemini API dynamically
        const localKey = typeof window !== 'undefined' ? localStorage.getItem('nextsem_gemini_api_key') : null;
        const apiKey = localKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

        if (apiKey) {
          try {
            const replyText = await askGemini(query, apiKey);
            setIsTyping(false);
            const reply: ChatMessage = {
              id: (Date.now() + 1).toString(),
              sender: 'semmy',
              text: replyText,
            };
            setMessages(prev => [...prev, reply]);
            return;
          } catch (err) {
            console.error("Gemini query failed, falling back to database", err);
          }
        }

        setIsTyping(false);
        const notFoundMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'semmy',
          text: `I don't know about "${query}" yet! But you can teach me 🎓`,
          notFound: true,
          keyword: query
        };
        setMessages(prev => [...prev, notFoundMsg]);
        setHasNewMessage(true);
      }
    }, 900);
  };

  // Do not show Semmy AI on native mobile app builds
  if (typeof window !== 'undefined' && Capacitor.isNativePlatform()) {
    return null;
  }

  return (
    <>
      {/* Floating Bubble Trigger */}
      <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-[9999]">
        {!isOpen && (
          <button
            onClick={handleOpen}
            className={`relative group w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-violet-700 border border-indigo-500/50 shadow-2xl shadow-indigo-900/60 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 ${
              pulseActive ? 'animate-bounce' : ''
            }`}
            title="Ask Semmy AI"
          >
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping pointer-events-none" 
              style={{ animationDuration: '2s', display: pulseActive ? 'block' : 'none' }} />
            
            <Sparkles size={22} className="text-white drop-shadow-lg" />

            {/* New message badge */}
            {hasNewMessage && (
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-[#07070c] animate-pulse" />
            )}

            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#0c0c14] border border-white/10 text-white text-[10px] font-black px-2.5 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-150 pointer-events-none">
              Ask Semmy AI 🧠
            </div>
          </button>
        )}

        {/* Chat Window */}
        {isOpen && (
          <div className={`bg-slate-950 border border-indigo-500/20 rounded-[28px] shadow-2xl shadow-indigo-900/40 flex flex-col overflow-hidden transition-all duration-300 ${
            isMinimized 
              ? 'w-72 h-14' 
              : 'w-[340px] sm:w-[380px] h-[500px] sm:h-[560px]'
          }`}>
            
            {/* Header */}
            <div className="h-14 px-4 border-b border-white/5 bg-[#0a0a12] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md">
                  <Sparkles size={14} className="text-white" />
                </div>
                <div className="text-left">
                  <span className="text-[11px] font-black text-white block leading-tight">Semmy AI</span>
                  <span className="text-[8px] text-indigo-400 font-bold uppercase tracking-widest">
                    {isTyping ? '⬤ Thinking...' : '⬤ Online'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowSettings(!showSettings);
                  }}
                  className={`p-1.5 hover:bg-slate-900 rounded-lg transition-colors ${showSettings ? 'text-indigo-400 hover:text-white' : 'text-slate-400 hover:text-white'}`}
                  title="Gemini Settings"
                >
                  <Key size={14} />
                </button>
                <Link 
                  href="/bca/semmy-ai"
                  className="p-1.5 hover:bg-slate-900 rounded-lg text-indigo-400 hover:text-white transition-colors"
                  title="Open Training Lab"
                >
                  <ChevronRight size={14} />
                </Link>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                  <Minimize2 size={14} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {showSettings ? (
                  // Settings View
                  <div className="flex-1 flex flex-col p-4 bg-slate-950 text-left">
                    <div className="flex-1 space-y-4">
                      <div>
                        <h4 className="text-xs font-black text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <Key size={12} className="text-indigo-400" />
                          Gemini API Key
                        </h4>
                        <p className="text-[10px] text-slate-400 leading-normal mb-3">
                          Configure a custom Gemini API Key to enable dynamic answers to questions outside Semmy&apos;s built-in knowledge.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-indigo-400">Your API Key</label>
                        <div className="flex gap-2">
                          <input
                            type="password"
                            value={geminiApiKey}
                            onChange={(e) => handleSaveApiKey(e.target.value)}
                            placeholder="AIzaSy..."
                            className="flex-1 bg-[#0c0c14] border border-white/5 focus:border-indigo-500/30 outline-none rounded-xl text-[10px] px-3 py-2 caret-indigo-400 text-white font-mono transition-all"
                          />
                          {geminiApiKey && (
                            <button
                              type="button"
                              onClick={() => handleSaveApiKey('')}
                              className="px-3 py-2 bg-red-950/20 hover:bg-red-950/40 border border-red-500/10 text-red-400 text-[9px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                            >
                              Clear
                            </button>
                          )}
                        </div>
                        <p className="text-[9px] text-slate-500 leading-relaxed">
                          Stored locally in your browser. Get a key from the <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Google AI Studio</a>.
                        </p>
                      </div>

                      {process.env.NEXT_PUBLIC_GEMINI_API_KEY && (
                        <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-start gap-2.5">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mt-1 shrink-0" />
                          <div>
                            <span className="text-[10px] font-bold text-emerald-400 block">Default Key Active</span>
                            <span className="text-[9px] text-slate-400 leading-tight block mt-0.5">
                              A platform key is configured by default. Custom keys take precedence.
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowSettings(false)}
                      className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-lg shadow-indigo-950/50 transition-all cursor-pointer shrink-0"
                    >
                      Back to Chat
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                        >
                          <div className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 leading-relaxed whitespace-pre-wrap ${
                            msg.sender === 'user'
                              ? 'bg-indigo-600 text-white rounded-br-none text-[11px]'
                              : 'bg-[#121217] border border-white/5 text-slate-300 rounded-bl-none text-[11px]'
                          }`}>
                            {msg.text}
                            
                            {/* Code block */}
                            {msg.hasCode && msg.code && (
                              <pre className="mt-2.5 bg-black/60 border border-white/5 rounded-xl p-2.5 text-[9px] text-emerald-400 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
                                {msg.code}
                              </pre>
                            )}

                            {/* Not found: CTA to train or configure key */}
                            {msg.notFound && (
                              <div className="mt-2.5 flex flex-wrap gap-1.5">
                                <Link
                                  href={`/bca/semmy-ai?teach=${encodeURIComponent(msg.keyword || '')}`}
                                  className="flex items-center gap-1 px-2.5 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-xl text-[8px] font-black uppercase tracking-wider hover:bg-indigo-500/15 transition-colors w-fit"
                                >
                                  <Sparkles size={8} />
                                  Teach Semmy
                                </Link>
                                <button
                                  type="button"
                                  onClick={() => setShowSettings(true)}
                                  className="flex items-center gap-1 px-2.5 py-1.5 bg-indigo-600/10 border border-indigo-600/20 text-indigo-400 rounded-xl text-[8px] font-black uppercase tracking-wider hover:bg-indigo-600/15 transition-colors w-fit cursor-pointer"
                                >
                                  <Key size={8} />
                                  Set Key
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {isTyping && (
                        <div className="flex items-start">
                          <div className="bg-[#121217] border border-white/5 text-slate-500 rounded-2xl rounded-bl-none px-3.5 py-2.5 text-[11px] flex items-center gap-1">
                            <span className="animate-bounce" style={{ animationDelay: '0ms' }}>⬤</span>
                            <span className="animate-bounce" style={{ animationDelay: '150ms' }}>⬤</span>
                            <span className="animate-bounce" style={{ animationDelay: '300ms' }}>⬤</span>
                          </div>
                        </div>
                      )}
                      
                      <div ref={endRef} />
                    </div>

                    {/* Suggested chips */}
                    <div className="flex gap-1.5 px-3 pb-1 overflow-x-auto shrink-0 scrollbar-hide">
                      {['Von Neumann', 'RAM', 'Logic Gates', 'BIOS', 'ALU'].map(chip => (
                        <button
                          key={chip}
                          onClick={() => {
                            setInput(chip);
                            setTimeout(() => handleSubmit(), 50);
                          }}
                          className="shrink-0 px-2.5 py-1 bg-indigo-500/8 border border-indigo-500/15 text-indigo-400 rounded-xl text-[9px] font-bold whitespace-nowrap hover:bg-indigo-500/15 transition-colors cursor-pointer"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="p-3 border-t border-white/5 flex gap-2 shrink-0">
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about CPU, RAM, gates..."
                        className="flex-1 bg-[#0c0c14] border border-slate-800 focus:border-indigo-500/50 outline-none rounded-xl text-[11px] text-white px-3 py-2 caret-indigo-400 transition-all"
                      />
                      <button
                        type="submit"
                        className="p-2 bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 text-white rounded-xl transition-all cursor-pointer shrink-0 disabled:opacity-40"
                        disabled={!input.trim()}
                      >
                        <Send size={13} />
                      </button>
                    </form>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
