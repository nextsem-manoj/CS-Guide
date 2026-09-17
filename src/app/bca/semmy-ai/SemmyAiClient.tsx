"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Sparkles, ArrowLeft, Send, Brain, Trash2, Plus, CheckCircle2,
  Code2, BookOpen, Zap, RotateCcw, Search, ChevronRight, X,
  Menu, LogOut, Copy, Check, MessageSquare, Cpu, Layers, Briefcase, Key
} from 'lucide-react';
import {
  getSemmyResponses,
  querySemmy,
  saveSemmyConcept,
  deleteSemmyConcept,
  resetSemmyCustomConcepts,
  getCustomConcepts,
  DEFAULT_CONCEPTS,
  SemmyConcept,
  SemmyKnowledgeBase
} from '@/data/semmyAiData';
import { askGemini } from '@/lib/gemini';
import { auth, db, signInWithGoogle } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, doc, setDoc, getDocs, deleteDoc, query, where, orderBy } from 'firebase/firestore';

interface ChatMessage {
  id: string;
  sender: 'user' | 'semmy';
  text: string;
  code?: string;
  timestamp: string;
}

interface SavedChatThread {
  id: string;
  userId: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: string;
}

type DrawerType = 'train' | 'registry' | null;

// Suggestion Prompts for New Chats
const SUGGESTIONS = [
  {
    title: "Von Neumann Architecture",
    description: "Explain CPU, ALU, control unit, and registers.",
    prompt: "Explain the Von Neumann Architecture and how CPU registers work.",
    icon: <Cpu size={16} className="text-blue-400" />,
    bg: "hover:border-blue-500/20 hover:bg-blue-500/5"
  },
  {
    title: "Logic Gates & Tables",
    description: "How do AND, OR, XOR, and NOT gates function?",
    prompt: "Explain digital logic gates (AND, OR, NOT, XOR) and show their truth tables.",
    icon: <Layers size={16} className="text-purple-400" />,
    bg: "hover:border-purple-500/20 hover:bg-purple-500/5"
  },
  {
    title: "Class 11 Accounting",
    description: "Explain basic principles of Accounting Part-1.",
    prompt: "What are the basic principles and rules of double-entry system in Financial Accounting Part-1?",
    icon: <Briefcase size={16} className="text-emerald-400" />,
    bg: "hover:border-emerald-500/20 hover:bg-emerald-500/5"
  },
  {
    title: "Class 12 Physics",
    description: "What is Ohm's Law and electric current?",
    prompt: "Explain Ohm's Law, resistivity, and electric current for Class 12 Physics Chapter 3.",
    icon: <Zap size={16} className="text-yellow-400" />,
    bg: "hover:border-yellow-500/20 hover:bg-yellow-500/5"
  }
];

// Inline Markdown Bold Parser Helper
const parseInlineBold = (str: string) => {
  const parts = str.split("**");
  return parts.map((part, index) => {
    const isBold = index % 2 === 1;
    if (isBold) {
      return <strong key={index} className="font-extrabold text-white">{part}</strong>;
    }
    return part;
  });
};

// Custom parse code block structure
const parseGeminiMessage = (text: string) => {
  const parts = text.split("```");
  return parts.map((part, index) => {
    const isCode = index % 2 === 1;
    if (isCode) {
      const lines = part.split("\n");
      const language = lines[0].trim();
      const codeContent = lines.slice(1).join("\n").trim();
      return { isCode: true, language, content: codeContent };
    } else {
      return { isCode: false, content: part };
    }
  });
};

// Copyable CodeBlock Component
const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {}
  };

  return (
    <div className="border border-white/5 bg-[#05050a]/90 rounded-2xl overflow-hidden my-3 shadow-md max-w-full text-left font-mono">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-[#090910] text-[10px] text-slate-500 font-bold uppercase tracking-wider">
        <span>{language || "code"}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check size={11} className="text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={11} />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-[11px] text-[#39FF14] whitespace-pre select-text leading-relaxed">
        <code>{code}</code>
      </div>
    </div>
  );
};

// Formatted Chat Message Component
const FormattedMessage = ({ text }: { text: string }) => {
  const parsed = parseGeminiMessage(text);

  return (
    <div className="space-y-4">
      {parsed.map((section, idx) => {
        if (section.isCode) {
          return (
            <CodeBlock
              key={idx}
              code={section.content}
              language={section.language || "code"}
            />
          );
        } else {
          return (
            <div key={idx} className="space-y-2 leading-relaxed text-sm text-slate-200">
              {section.content.split("\n").map((line, lIdx) => {
                const trimmed = line.trim();
                if (trimmed.startsWith("### ")) {
                  return (
                    <h3 key={lIdx} className="text-sm font-black text-white uppercase tracking-wider mt-4 mb-2 flex items-center gap-1.5">
                      <Sparkles size={12} className="text-indigo-400" />
                      {parseInlineBold(trimmed.substring(4))}
                    </h3>
                  );
                }
                if (trimmed.startsWith("## ")) {
                  return (
                    <h2 key={lIdx} className="text-base font-black text-white mt-4 mb-2 flex items-center gap-1.5">
                      {parseInlineBold(trimmed.substring(3))}
                    </h2>
                  );
                }
                if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                  return (
                    <div key={lIdx} className="flex items-start gap-2 ml-4 my-1">
                      <span className="text-[#39FF14] text-[10px] mt-1.5">•</span>
                      <span className="flex-1 text-slate-350">{parseInlineBold(trimmed.substring(2))}</span>
                    </div>
                  );
                }
                if (trimmed.match(/^\d+\.\s/)) {
                  const numberMatch = trimmed.match(/^(\d+)\.\s(.*)/);
                  const num = numberMatch ? numberMatch[1] : "";
                  const content = numberMatch ? numberMatch[2] : trimmed;
                  return (
                    <div key={lIdx} className="flex items-start gap-2 ml-4 my-1">
                      <span className="text-indigo-400 font-mono text-xs font-black">{num}.</span>
                      <span className="flex-1 text-slate-350">{parseInlineBold(content)}</span>
                    </div>
                  );
                }
                if (!trimmed) return <div key={lIdx} className="h-2" />;
                return <p key={lIdx} className="text-slate-300">{parseInlineBold(trimmed)}</p>;
              })}
            </div>
          );
        }
      })}
    </div>
  );
};

interface UserProfile {
  uid: string;
  name: string;
  email: string;
  avatar: string;
}

// Purity helpers to bypass strict ESLint rules
function generateId(offset = 0): string {
  return (Date.now() + offset).toString();
}
function generateTimestamp(): string {
  return new Date().toISOString();
}

export default function SemmyAiClient() {
  const searchParams = useSearchParams();
  const teachKeyword = searchParams.get('teach') || '';

  // Auth state
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Chat & Threads state
  const [threads, setThreads] = useState<SavedChatThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [kb, setKb] = useState<SemmyKnowledgeBase>({});
  const [customConcepts, setCustomConcepts] = useState<SemmyKnowledgeBase>({});
  const [geminiApiKey, setGeminiApiKey] = useState('');

  // UI Panels / Drawer state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);

  // Train form state
  const [keyword, setKeyword] = useState(teachKeyword);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [code, setCode] = useState('');
  const [trainSuccess, setTrainSuccess] = useState(false);
  const [trainError, setTrainError] = useState('');

  // Registry search
  const [registrySearch, setRegistrySearch] = useState('');

  const endRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // Load KB responses
  const refreshKb = () => {
    const fresh = getSemmyResponses();
    setKb(fresh);
    setCustomConcepts(getCustomConcepts());
    // Notify global widget
    window.dispatchEvent(new Event('nextsem_semmy_updated'));
  };

  // Google Sign In
  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (e) {
      console.error("Sign in failed:", e);
    }
  };

  // Continue as Guest
  const handleContinueAsGuest = () => {
    const offlineProfile = {
      uid: "offline",
      name: "Guest User",
      email: "guest",
      avatar: ""
    };
    setCurrentUser(offlineProfile);
    localStorage.setItem("nextsem_user", JSON.stringify(offlineProfile));
  };

  // Sign Out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setThreads([]);
      setActiveThreadId(null);
      setMessages([]);
    } catch (e) {
      console.error(e);
    }
  };

  // Fetch threads from Firestore
  async function fetchThreads(uid: string) {
    try {
      const q = query(
        collection(db, "users_chats"),
        where("userId", "==", uid),
        orderBy("updatedAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const loaded: SavedChatThread[] = [];
      querySnapshot.forEach((doc) => {
        loaded.push(doc.data() as SavedChatThread);
      });
      setThreads(loaded);
    } catch (err) {
      console.error("Error loading chat threads:", err);
    }
  }

  // Listen to Auth State
  useEffect(() => {
    // Check offline user on init
    try {
      const savedUser = localStorage.getItem("nextsem_user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed?.uid === "offline") {
          setCurrentUser(parsed);
          setAuthLoading(false);
        }
      }
    } catch (_) {}

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthLoading(true);
      if (user) {
        const profile = {
          uid: user.uid,
          name: user.displayName || "User",
          email: user.email || "",
          avatar: user.photoURL || ""
        };
        setCurrentUser(profile);
        localStorage.setItem("nextsem_user", JSON.stringify(profile));
        fetchThreads(user.uid);
      } else {
        // Only clear if not in offline mode
        const savedUser = localStorage.getItem("nextsem_user");
        let isOffline = false;
        if (savedUser) {
          try {
            isOffline = JSON.parse(savedUser).uid === "offline";
          } catch (e) {}
        }
        if (!isOffline) {
          setCurrentUser(null);
          localStorage.removeItem("nextsem_user");
          setThreads([]);
          setActiveThreadId(null);
          setMessages([]);
        }
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Load active thread messages
  useEffect(() => {
    if (activeThreadId) {
      const thread = threads.find(t => t.id === activeThreadId);
      if (thread) {
        setMessages(thread.messages);
      }
    } else {
      setMessages([]);
    }
  }, [activeThreadId, threads]);

  // Load local settings on mount
  useEffect(() => {
    refreshKb();
    if (typeof window !== 'undefined') {
      setGeminiApiKey(localStorage.getItem('nextsem_gemini_api_key') || '');
    }
    if (teachKeyword) {
      setActiveDrawer('train');
      setKeyword(teachKeyword);
    }

    const handleApiKeyUpdate = () => {
      if (typeof window !== 'undefined') {
        setGeminiApiKey(localStorage.getItem('nextsem_gemini_api_key') || '');
      }
    };
    window.addEventListener('nextsem_api_key_updated', handleApiKeyUpdate);
    window.addEventListener('storage', handleApiKeyUpdate);

    return () => {
      window.removeEventListener('nextsem_api_key_updated', handleApiKeyUpdate);
      window.removeEventListener('storage', handleApiKeyUpdate);
    };
  }, [teachKeyword]);

  // Auto scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Delete chat thread
  const handleDeleteThread = async (e: React.MouseEvent, threadId: string) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this conversation?")) return;

    try {
      await deleteDoc(doc(db, "users_chats", threadId));
      setThreads(prev => prev.filter(t => t.id !== threadId));
      if (activeThreadId === threadId) {
        setActiveThreadId(null);
      }
    } catch (err) {
      console.error("Failed to delete thread:", err);
    }
  };

  // Helper to sync thread to Firestore
  const saveThreadToDb = async (threadId: string, titleStr: string, msgs: ChatMessage[]) => {
    if (!currentUser) return;
    try {
      const threadDoc = doc(db, "users_chats", threadId);
      await setDoc(threadDoc, {
        id: threadId,
        userId: currentUser.uid,
        title: titleStr,
        messages: msgs,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.error("Failed to save thread to Firestore:", err);
    }
  };

  // Sandbox chat send handler
  const handleSend = (textInput: string) => {
    const q = textInput.trim();
    if (!q) return;

    const userMsg: ChatMessage = {
      id: generateId(),
      sender: 'user',
      text: q,
      timestamp: generateTimestamp()
    };

    setChatInput('');
    setIsTyping(true);

    const isNewChat = activeThreadId === null;
    const tempThreadId = activeThreadId || doc(collection(db, "temp")).id;
    const initialTitle = isNewChat ? (q.slice(0, 45) + (q.length > 45 ? "..." : "")) : "";

    // If starting a new thread, set local states immediately
    if (isNewChat) {
      setActiveThreadId(tempThreadId);
      const newThread: SavedChatThread = {
        id: tempThreadId,
        userId: currentUser?.uid || 'guest',
        title: initialTitle,
        messages: [userMsg],
        updatedAt: generateTimestamp()
      };
      setThreads(prev => [newThread, ...prev]);
      setMessages([userMsg]);
    } else {
      setMessages(prev => [...prev, userMsg]);
      // Update thread lists
      setThreads(prev => prev.map(t => t.id === tempThreadId
        ? { ...t, messages: [...t.messages, userMsg], updatedAt: new Date().toISOString() }
        : t
      ));
    }

    setTimeout(async () => {
      const concept = querySemmy(q, kb);
      let replyText = "";
      
      if (concept) {
        replyText = `**${concept.title}**\n\n${concept.summary}`;
        if (concept.code) {
          replyText += `\n\n\`\`\`${concept.code.includes("class") || concept.code.includes("function") ? "javascript" : "code"}\n${concept.code}\n\`\`\``;
        }
      } else {
        const localKey = typeof window !== 'undefined' ? localStorage.getItem('nextsem_gemini_api_key') : null;
        const apiKey = localKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

        if (apiKey) {
          try {
            replyText = await askGemini(q, apiKey);
          } catch (err) {
            console.error("Gemini failed", err);
            replyText = "Oops! Something went wrong calling the Gemini API. Please make sure your API key is valid.";
          }
        } else {
          replyText = `I parsed your question, but that concept is outside my current knowledge. Try asking about 'CPU registers', 'logic gates', or 'Von Neumann'!\n\nOr click the Teach Semmy button in the sidebar to train me on "${q}" ✨`;
        }
      }

      setIsTyping(false);

      const semmyReply: ChatMessage = {
        id: generateId(1),
        sender: 'semmy',
        text: replyText,
        timestamp: generateTimestamp()
      };

      setMessages(prev => [...prev, semmyReply]);

      // Update thread list locally
      setThreads(prev => {
        const list = prev.map(t => t.id === tempThreadId
          ? { ...t, messages: [...t.messages, semmyReply], updatedAt: generateTimestamp() }
          : t
        );
        // Resort threads list
        return list.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      });

      // Persist thread updates in Firestore
      if (currentUser) {
        const activeT = threads.find(t => t.id === tempThreadId);
        const finalTitle = isNewChat ? initialTitle : (activeT?.title || "Chat");
        const finalMsgs = isNewChat ? [userMsg, semmyReply] : [...messages, userMsg, semmyReply];
        await saveThreadToDb(tempThreadId, finalTitle, finalMsgs);
        
        // Day 9: AI Compiler Sage hint trigger complete
        const isTrainedKey = `semmy_trained`;
        localStorage.setItem(`nextsem_terminal_step_${isTrainedKey}`, 'true');
        // Push completion flag to local storage trigger
        window.dispatchEvent(new Event('nextsem_progress_updated'));
      }
    }, 850);
  };

  // Training form submit
  const handleTrain = (e: React.FormEvent) => {
    e.preventDefault();
    setTrainError('');
    if (!keyword.trim()) return setTrainError('Keyword trigger is required.');
    if (!title.trim()) return setTrainError('Concept title is required.');
    if (!summary.trim()) return setTrainError('Explanation summary is required.');

    const concept: SemmyConcept = {
      title: title.trim(),
      summary: summary.trim(),
      code: code.trim() || undefined,
      isCustom: true,
    };

    saveSemmyConcept(keyword.trim(), concept);
    refreshKb();

    setTrainSuccess(true);
    setTimeout(() => setTrainSuccess(false), 3000);

    // Clear form
    setKeyword('');
    setTitle('');
    setSummary('');
    setCode('');
  };

  const allConceptKeys = Object.keys(kb).filter(k =>
    k.includes(registrySearch.toLowerCase()) ||
    kb[k].title?.toLowerCase().includes(registrySearch.toLowerCase())
  );

  const activeThread = threads.find(t => t.id === activeThreadId);

  // Main UI render logic
  return (
    <div className="w-full h-screen bg-slate-950 text-white flex overflow-hidden font-sans relative selection:bg-[#c1a648]/30">
      
      {/* ── AUTHENTICATION GATE ── */}
      {(!currentUser && !authLoading) ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-950 relative z-20">
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[140px]" />
          </div>

          <div className="relative z-10 w-full max-w-md bg-[#0a0a14]/85 border border-white/5 backdrop-blur-xl rounded-[32px] p-8 text-center shadow-2xl">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-700 flex items-center justify-center shadow-lg shadow-indigo-900/40 mb-6 animate-pulse">
              <Sparkles size={24} className="text-white" />
            </div>

            <h1 className="text-xl font-black text-white leading-tight">Unlock Semmy AI Companion 🧠</h1>
            <p className="text-[11px] text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
              Your custom study companion for college BCA, digital fundamentals, accounting, and revision preps.
            </p>

            {/* Checklist */}
            <div className="my-6 space-y-3.5 text-left border-t border-b border-white/5 py-5">
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 mt-0.5">
                  <Zap size={10} className="text-indigo-400" />
                </div>
                <div>
                  <span className="text-[11px] font-black text-white block">Real-time Gemini AI</span>
                  <span className="text-[9px] text-slate-500 block leading-tight">Dynamic responses beyond built-in knowledge using Gemini API.</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 mt-0.5">
                  <MessageSquare size={10} className="text-indigo-400" />
                </div>
                <div>
                  <span className="text-[11px] font-black text-white block">Account-level Chat History</span>
                  <span className="text-[9px] text-slate-500 block leading-tight">Securely save and retrieve your learning conversation threads.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 mt-0.5">
                  <Brain size={10} className="text-indigo-400" />
                </div>
                <div>
                  <span className="text-[11px] font-black text-white block">Interactive Training Sandbox</span>
                  <span className="text-[9px] text-slate-500 block leading-tight">Teach Semmy new concepts and explore custom knowledge.</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSignIn}
              className="w-full py-3.5 bg-white hover:bg-slate-100 text-[#07070c] font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Sign in with Google
            </button>

            <button
              onClick={handleContinueAsGuest}
              className="text-slate-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-wider cursor-pointer mt-4"
            >
              Continue as Guest (No Cloud Sync) ➔
            </button>
            
            <div className="mt-4">
              <Link href="/bca" className="text-[10px] font-bold text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest flex items-center justify-center gap-1">
                <ArrowLeft size={10} /> Back to BCA Hub
              </Link>
            </div>
          </div>
        </div>
      ) : authLoading ? (
        <div className="flex-1 h-screen bg-slate-950 flex items-center justify-center relative z-20">
          <div className="w-10 h-10 border-4 border-t-indigo-500 border-slate-800 rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* ── LEFT SIDEBAR (ChatGPT Style) ── */}
          <aside className={`w-64 md:w-72 shrink-0 bg-slate-950 border-r border-white/5 flex flex-col h-full z-30 transition-transform duration-300 md:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0 absolute left-0 top-0 bottom-0' : '-translate-x-full absolute md:relative'
          }`}>
            {/* Header / New Chat */}
            <div className="p-4 flex flex-col gap-2.5 border-b border-white/5 bg-[#090910]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-700 flex items-center justify-center shadow">
                    <Sparkles size={13} className="text-white" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest">Semmy AI</span>
                </div>
                
                {/* Mobile close sidebar trigger */}
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 hover:bg-slate-900 rounded-lg md:hidden text-slate-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <button
                onClick={() => {
                  setActiveThreadId(null);
                  setIsSidebarOpen(false);
                  setTimeout(() => chatInputRef.current?.focus(), 50);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#0d0d18] border border-white/5 hover:border-indigo-500/30 rounded-2xl text-[10px] font-black uppercase tracking-wider text-white hover:text-indigo-300 transition-all cursor-pointer shadow-sm mt-2"
              >
                <Plus size={13} />
                New Chat
              </button>
            </div>

            {/* Middle: Saved threads */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4 custom-scrollbar text-left">
              <div>
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block px-2 mb-2">Saved Conversations</span>
                {threads.length === 0 ? (
                  <span className="text-[10px] text-slate-600 font-bold block px-2 italic">No conversations saved yet.</span>
                ) : (
                  <div className="space-y-1">
                    {threads.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          setActiveThreadId(t.id);
                          setIsSidebarOpen(false);
                        }}
                        className={`group flex items-center justify-between px-3 py-2.5 rounded-2xl text-[11px] font-bold cursor-pointer transition-all hover:bg-slate-950/80 ${
                          activeThreadId === t.id
                            ? 'bg-[#0f0f1c]/90 border border-white/5 text-white shadow'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <MessageSquare size={12} className={activeThreadId === t.id ? "text-indigo-400" : "text-slate-600"} />
                          <span className="truncate pr-1">{t.title}</span>
                        </div>
                        <button
                          onClick={(e) => handleDeleteThread(e, t.id)}
                          className="p-1 text-slate-600 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom utilities */}
            <div className="p-4 border-t border-white/5 bg-[#090910] space-y-2 text-left">
              {/* API Key settings card inside sidebar (clean & collapsable) */}
              <div className="bg-slate-950 border border-white/5 rounded-2xl p-3 mb-2">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Key size={11} className="text-indigo-400" />
                  <span className="text-[8px] font-black uppercase tracking-wider text-slate-400">Gemini API Key</span>
                </div>
                <div className="flex gap-1.5">
                  <input
                    type="password"
                    value={geminiApiKey}
                    onChange={(e) => {
                      setGeminiApiKey(e.target.value);
                      localStorage.setItem('nextsem_gemini_api_key', e.target.value);
                      window.dispatchEvent(new Event('nextsem_api_key_updated'));
                    }}
                    placeholder="Enter key..."
                    className="flex-1 bg-[#0c0c14] border border-white/5 focus:border-indigo-500/30 outline-none rounded-xl text-[9px] px-2.5 py-1.5 caret-indigo-400 text-white transition-all font-mono"
                  />
                  {geminiApiKey && (
                    <button
                      onClick={() => {
                        setGeminiApiKey('');
                        localStorage.removeItem('nextsem_gemini_api_key');
                        window.dispatchEvent(new Event('nextsem_api_key_updated'));
                      }}
                      className="px-2 py-1.5 bg-red-950/20 hover:bg-red-950/40 border border-red-500/10 text-red-400 text-[8px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Drawers triggers */}
              <button
                onClick={() => { setActiveDrawer('train'); setIsSidebarOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/5 border border-transparent hover:border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <Zap size={11} className="text-yellow-400" />
                Teach Semmy 🎓
              </button>
              
              <button
                onClick={() => { setActiveDrawer('registry'); setIsSidebarOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/5 border border-transparent hover:border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <BookOpen size={11} className="text-blue-400" />
                Browse Registry 📚
              </button>

              <Link
                href="/bca"
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/5 border border-transparent hover:border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all"
              >
                <ArrowLeft size={11} className="text-indigo-400" />
                Back to BCA Hub
              </Link>

              {/* Profile card */}
              <div className="flex items-center justify-between border-t border-white/5 pt-3.5 mt-2">
                <div className="flex items-center gap-2 min-w-0">
                  {currentUser?.avatar ? (
                    <img src={currentUser.avatar} alt="avatar" className="w-7 h-7 rounded-full border border-white/10 shrink-0" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center font-black text-xs shrink-0">{currentUser?.name?.[0] || 'U'}</div>
                  )}
                  <div className="text-left min-w-0 leading-tight">
                    <span className="text-[10px] font-black text-white block truncate">{currentUser?.name || 'User'}</span>
                    <span className="text-[8px] text-slate-500 block truncate">{currentUser?.email || ''}</span>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-2 hover:bg-slate-900 text-slate-500 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut size={13} />
                </button>
              </div>
            </div>
          </aside>

          {/* Overlay to close sidebar on mobile click outside */}
          {isSidebarOpen && (
            <div
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-20 md:hidden"
            />
          )}

          {/* ── CENTRAL CHAT AREA ── */}
          <main className="flex-1 flex flex-col h-full bg-[#0a0a12] relative overflow-hidden">
            {/* Header bar */}
            <header className="h-14 border-b border-white/5 bg-[#0a0a12] flex items-center justify-between px-6 shrink-0 z-10">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-1.5 hover:bg-slate-900 rounded-lg md:hidden text-slate-400 hover:text-white cursor-pointer"
                >
                  <Menu size={18} />
                </button>

                <Link
                  href="/"
                  className="flex items-center gap-1 text-slate-300 hover:text-white font-bold text-xs bg-slate-900 hover:bg-slate-800 border border-slate-800 px-2.5 py-1 rounded-xl transition-colors shrink-0 shadow-sm"
                  title="Return to Home"
                >
                  <span>🏠 Home</span>
                </Link>
                <span className="text-slate-600 font-bold text-xs">❯</span>
                <Link
                  href="/bca"
                  className="text-slate-300 hover:text-[#04AA6D] font-bold text-xs shrink-0 transition-colors hidden sm:inline"
                >
                  BCA Hub
                </Link>
                <span className="text-slate-600 font-bold text-xs hidden sm:inline">❯</span>

                <div className="text-left leading-tight">
                  <span className="text-xs font-black text-white block">
                    {activeThreadId ? (activeThread?.title || "Conversation") : "New Chat"}
                  </span>
                  <span className="text-[8px] text-indigo-400 font-bold uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                    Semmy AI Active
                  </span>
                </div>
              </div>

              {/* Fast stats indicator */}
              <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest hidden sm:block">
                {messages.length} messages in buffer
              </div>
            </header>

            {/* Chat Messages Panel */}
            <div className="flex-1 overflow-y-auto px-4 md:px-12 py-8 space-y-6 custom-scrollbar">
              {currentUser?.uid === "offline" && (
                <div className="max-w-2xl mx-auto bg-[#120c18] border border-violet-500/20 rounded-2xl p-4 flex items-center justify-between text-left shrink-0">
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <span className="text-sm shrink-0">💡</span>
                    <div className="min-w-0">
                      <span className="text-[9px] font-black text-violet-300 uppercase tracking-widest block leading-none">Running in Guest Mode</span>
                      <span className="text-[10px] text-slate-400 block mt-1 leading-tight">
                        Connect with your Google account to save your chat threads and sync history under your account.
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleSignIn}
                    className="px-3.5 py-1.5 bg-violet-600 hover:bg-violet-550 text-white rounded-xl text-[9px] font-black uppercase tracking-wider shrink-0 cursor-pointer shadow-sm transition-all"
                  >
                    Sign In
                  </button>
                </div>
              )}
              
              {/* EMPTY CHAT SUGGESTIONS STATE */}
              {messages.length === 0 ? (
                <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[70%] text-center px-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-700 flex items-center justify-center shadow-lg shadow-indigo-900/50 mb-4 animate-bounce">
                    <Sparkles size={20} className="text-white" />
                  </div>
                  <h2 className="text-lg font-black text-white leading-tight">Welcome to Semmy AI Study Companion 🧪</h2>
                  <p className="text-[10px] text-slate-500 mt-1 max-w-sm">
                    Ask me anything about computer hardware, digital gates, code, accounting, or physics!
                  </p>

                  {/* Suggestions Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 w-full">
                    {SUGGESTIONS.map((card, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSend(card.prompt)}
                        className={`bg-[#0d0d18] border border-white/5 rounded-2xl p-4 text-left cursor-pointer transition-all duration-200 hover:-translate-y-0.5 shadow-sm group ${card.bg}`}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          {card.icon}
                          <span className="text-[11px] font-black text-white group-hover:text-indigo-400 transition-colors leading-none">
                            {card.title}
                          </span>
                        </div>
                        <p className="text-[9px] text-slate-500 font-bold leading-normal">
                          {card.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* RENDER MESSAGES */
                <div className="max-w-2xl mx-auto space-y-6">
                  {messages.map((msg) => {
                    const isUser = msg.sender === 'user';
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-4 items-start ${isUser ? 'flex-row-reverse text-right' : 'text-left'}`}
                      >
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border shadow-sm ${
                          isUser
                            ? 'bg-slate-900 border-white/10 text-slate-400'
                            : 'bg-gradient-to-br from-indigo-500 to-violet-700 border-indigo-500/20 text-white'
                        }`}>
                          {isUser ? <MessageSquare size={13} /> : <Sparkles size={13} />}
                        </div>

                        {/* Content bubble */}
                        <div className={`max-w-[85%] rounded-[24px] px-5 py-4 ${
                          isUser
                            ? 'bg-[#0f0f1c]/90 border border-white/5 text-slate-200 text-sm leading-relaxed text-left'
                            : 'bg-transparent text-left space-y-3'
                        }`}>
                          {isUser ? (
                            <p>{msg.text}</p>
                          ) : (
                            <FormattedMessage text={msg.text} />
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Bouncing Dots typing shimmer loader */}
                  {isTyping && (
                    <div className="flex gap-4 items-start text-left">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-700 border border-indigo-500/20 flex items-center justify-center shrink-0 text-white animate-pulse">
                        <Sparkles size={13} />
                      </div>
                      <div className="bg-transparent px-5 py-4 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}

                  <div ref={endRef} />
                </div>
              )}
            </div>

            {/* Bottom Input Area */}
            <div className="shrink-0 px-4 md:px-12 pb-6 pt-2 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12] to-transparent">
              <div className="max-w-2xl mx-auto w-full">
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSend(chatInput); }}
                  className="relative bg-[#0d0d18]/90 border border-white/10 focus-within:border-indigo-500/50 rounded-2xl p-1.5 flex items-center shadow-lg backdrop-blur"
                >
                  <input
                    ref={chatInputRef}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Message Semmy AI..."
                    className="flex-1 bg-transparent outline-none border-none text-[12px] text-white px-4 py-2.5 caret-indigo-400 pr-12"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim() || isTyping}
                    className="absolute right-3 p-2 bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 text-white rounded-xl transition-all cursor-pointer disabled:opacity-20 flex items-center justify-center"
                  >
                    <Send size={12} />
                  </button>
                </form>
                <span className="text-[9px] text-slate-600 block text-center mt-2.5 leading-normal">
                  Semmy AI can make mistakes. Verify important info in your core textbook chapters.
                </span>
              </div>
            </div>
          </main>

          {/* ── RIGHT SLIDE-OVER DRAWER (For Train / Registry) ── */}
          {activeDrawer && (
            <>
              {/* Drawer backdrop */}
              <div
                onClick={() => setActiveDrawer(null)}
                className="fixed inset-0 bg-black/60 z-40"
              />
              
              <div className="fixed top-0 bottom-0 right-0 w-full sm:w-[480px] bg-slate-950 border-l border-white/5 z-50 flex flex-col h-full shadow-2xl animate-slide-in">
                {/* Header */}
                <div className="h-14 px-5 border-b border-white/5 bg-[#090910] flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    {activeDrawer === 'train' ? <Zap size={14} className="text-yellow-400" /> : <BookOpen size={14} className="text-blue-400" />}
                    <span className="text-[11px] font-black uppercase tracking-wider">
                      {activeDrawer === 'train' ? "Teach Semmy AI" : "BCA Concept Registry"}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveDrawer(null)}
                    className="p-1 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar text-left">
                  
                  {/* DRAWER: TEACH FORM */}
                  {activeDrawer === 'train' && (
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-sm font-black text-white flex items-center gap-2">
                          🧠 Train Semmy&apos;s Brain
                        </h3>
                        <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                          Add custom concepts to the local knowledge base. The keyword trigger maps to the response when typed by students.
                        </p>
                      </div>

                      {trainSuccess && (
                        <div className="px-4 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-2 text-emerald-400 text-[11px] font-bold">
                          <CheckCircle2 size={14} />
                          Concept saved! Semmy now knows about &quot;{keyword || 'it'}&quot; ✨
                        </div>
                      )}
                      {trainError && (
                        <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-2 text-red-400 text-[11px] font-bold">
                          <X size={12} /> {trainError}
                        </div>
                      )}

                      <form onSubmit={handleTrain} className="space-y-4">
                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">
                            Keyword Trigger <span className="text-red-400">*</span>
                          </label>
                          <input
                            value={keyword}
                            onChange={e => setKeyword(e.target.value)}
                            placeholder="e.g. cache, bus, register..."
                            className="w-full bg-[#0c0c14] border border-slate-800 focus:border-indigo-500/50 outline-none rounded-xl text-[12px] text-white px-4 py-3 caret-indigo-400 transition-all"
                          />
                          <p className="text-[9px] text-slate-600 mt-1">This is what triggers the response (lowercase)</p>
                        </div>

                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">
                            Concept Title <span className="text-red-400">*</span>
                          </label>
                          <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="e.g. CPU Registers and Cache"
                            className="w-full bg-[#0c0c14] border border-slate-800 focus:border-indigo-500/50 outline-none rounded-xl text-[12px] text-white px-4 py-3 caret-indigo-400 transition-all"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">
                            Explanation Summary <span className="text-red-400">*</span>
                          </label>
                          <textarea
                            value={summary}
                            onChange={e => setSummary(e.target.value)}
                            placeholder="Write a clear, student-friendly explanation of this concept..."
                            rows={5}
                            className="w-full bg-[#0c0c14] border border-slate-800 focus:border-indigo-500/50 outline-none rounded-xl text-[12px] text-white px-4 py-3 caret-indigo-400 transition-all resize-none leading-relaxed"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 flex items-center gap-1.5">
                            <Code2 size={10} /> Example Code <span className="text-slate-600 normal-case font-semibold">(optional)</span>
                          </label>
                          <textarea
                            value={code}
                            onChange={e => setCode(e.target.value)}
                            placeholder="// paste relevant code example..."
                            rows={4}
                            className="w-full bg-black/40 border border-slate-800 focus:border-emerald-500/50 outline-none rounded-xl text-[11px] text-emerald-400 font-mono px-4 py-3 caret-emerald-400 transition-all resize-none leading-relaxed"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-700 hover:from-indigo-500 hover:to-violet-600 border border-indigo-500/50 text-white font-black text-[12px] uppercase tracking-widest rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Brain size={14} />
                          Save to Semmy&apos;s Brain
                        </button>
                      </form>
                      
                      <div className="border-t border-white/5 pt-4 mt-6">
                        <button
                          onClick={() => { if (confirm('Reset all custom trained concepts?')) { resetSemmyCustomConcepts(); refreshKb(); } }}
                          className="w-full py-2.5 bg-red-950/20 hover:bg-red-950/40 border border-red-500/10 text-red-400 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <RotateCcw size={11} /> Reset Custom Concepts RAM
                        </button>
                      </div>
                    </div>
                  )}

                  {/* DRAWER: REGISTRY */}
                  {activeDrawer === 'registry' && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-black text-white flex items-center gap-2">
                          📚 Concept Knowledge Base
                        </h3>
                        <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                          Browse all concepts locally registered in Semmy&apos;s knowledge base. Use trigger keyword to query.
                        </p>
                      </div>

                      {/* Search box */}
                      <div className="flex items-center gap-2 bg-[#0c0c14] border border-slate-800 rounded-xl px-3 py-2">
                        <Search size={12} className="text-slate-500" />
                        <input
                          value={registrySearch}
                          onChange={e => setRegistrySearch(e.target.value)}
                          placeholder="Search concepts..."
                          className="flex-1 bg-transparent outline-none text-[11px] text-white caret-indigo-400"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[9px] text-slate-500 font-bold uppercase tracking-widest px-1">
                        <span>{allConceptKeys.length} concepts</span>
                        <span>
                          <span className="text-indigo-400">{Object.keys(customConcepts).length} custom</span>
                          {' · '}
                          <span>{Object.keys(DEFAULT_CONCEPTS).length} built-in</span>
                        </span>
                      </div>

                      {/* Concept list */}
                      <div className="space-y-2 pt-2">
                        {allConceptKeys.map(key => {
                          const c = kb[key];
                          const isCustom = !!customConcepts[key];
                          return (
                            <div
                              key={key}
                              className="group bg-[#0c0c14] border border-white/5 hover:border-indigo-500/20 rounded-2xl px-4 py-3.5 transition-all"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1.5">
                                    <span className="text-[10px] font-black text-slate-400 font-mono bg-slate-900 px-2 py-0.5 rounded-lg border border-white/5">
                                      {key}
                                    </span>
                                    {isCustom ? (
                                      <span className="text-[8px] font-black text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded uppercase tracking-widest">
                                        ✦ Custom
                                      </span>
                                    ) : (
                                      <span className="text-[8px] font-black text-slate-500 bg-slate-900 border border-white/5 px-1.5 py-0.5 rounded uppercase tracking-widest">
                                        Built-in
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs font-bold text-white leading-tight truncate">{c.title}</p>
                                  <p className="text-[10px] text-slate-500 mt-1 leading-relaxed line-clamp-3">{c.summary}</p>
                                </div>
                                {isCustom && (
                                  <button
                                    onClick={() => { deleteSemmyConcept(key); refreshKb(); }}
                                    className="p-1.5 text-slate-700 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
