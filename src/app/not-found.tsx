"use client";

import React from 'react';
import Link from 'next/link';
import { Home, BookOpen, Terminal, ArrowRight, HelpCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="w-full min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center font-sans selection:bg-[#c1a648]/30 relative overflow-hidden px-4">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-950/10 blur-[130px] pointer-events-none" />

      {/* Main Error Card */}
      <div className="max-w-md w-full text-center space-y-6 relative z-10">
        
        {/* Floating Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 shadow-lg shadow-indigo-500/5 animate-pulse mb-2">
          <HelpCircle size={40} className="text-indigo-400" />
        </div>

        {/* Status Code */}
        <div className="space-y-2">
          <h1 className="text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 font-outfit">
            404
          </h1>
          <h2 className="text-xl font-bold tracking-tight text-white font-outfit">
            Page Not Found
          </h2>
          <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        {/* Redirect Action Options */}
        <div className="bg-slate-950/50 border border-slate-850 rounded-2xl p-4.5 space-y-2 text-left">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2 px-1 font-outfit">Quick Navigation</span>

          <Link 
            href="/" 
            className="flex items-center justify-between p-3 bg-slate-900/40 hover:bg-indigo-600/10 border border-slate-850 hover:border-indigo-550/40 rounded-xl transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <Home size={16} className="text-slate-400 group-hover:text-indigo-400" />
              <span className="text-xs font-bold text-slate-200 group-hover:text-white">Go to Homepage</span>
            </div>
            <ArrowRight size={14} className="text-slate-600 group-hover:text-indigo-400 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link 
            href="/bca" 
            className="flex items-center justify-between p-3 bg-slate-900/40 hover:bg-indigo-600/10 border border-slate-850 hover:border-indigo-550/40 rounded-xl transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <BookOpen size={16} className="text-slate-400 group-hover:text-indigo-400" />
              <span className="text-xs font-bold text-slate-200 group-hover:text-white">Browse IGNOU BCA Hub</span>
            </div>
            <ArrowRight size={14} className="text-slate-600 group-hover:text-indigo-400 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link 
            href="/cmd" 
            className="flex items-center justify-between p-3 bg-slate-900/40 hover:bg-indigo-600/10 border border-slate-850 hover:border-indigo-550/40 rounded-xl transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <Terminal size={16} className="text-slate-400 group-hover:text-indigo-400" />
              <span className="text-xs font-bold text-slate-200 group-hover:text-white">Command Simulator</span>
            </div>
            <ArrowRight size={14} className="text-slate-600 group-hover:text-indigo-400 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Small Footer brand link */}
        <div className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">
          Nextsem Academy
        </div>

      </div>
    </div>
  );
}
