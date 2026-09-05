"use client";

import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import ProgressIndicator from './ProgressIndicator';
import { FontSizeControlPill } from './FontSizeControl';

const Header = () => {
  return (
    <header className="bg-[#0f172a]/80 backdrop-blur-xl text-white py-3 px-4 md:px-8 flex flex-row items-center justify-between border-b border-green-500/50 shadow-md relative z-50">
      
      {/* Left Section: Logo + Title in a horizontal row */}
      <div className="flex flex-row items-center gap-3 sm:gap-4">
        {/* Title Link */}
        <Link href="/" className="flex flex-row items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/logo.svg" alt="Nextsem Logo" className="w-7 h-7 rounded-lg border border-emerald-500/20" />
          <span className="font-black text-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">NextSem</span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-1.5 py-0.5 rounded-md font-black">v29</span>
        </Link>
        
        {/* Title */}
        <div className="h-6 w-px bg-gray-600 hidden sm:block"></div>
        <h1 className="text-sm md:text-lg font-black text-white tracking-wide uppercase whitespace-nowrap overflow-hidden text-ellipsis">
          Nextsem JBRS course
        </h1>
      </div>

      {/* Right Section: Search, Progress, Font Size */}
      <div className="flex flex-row items-center gap-2.5 sm:gap-4">
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('open-global-search'))}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-emerald-500/60 text-slate-300 hover:text-white transition-all text-xs font-bold cursor-pointer"
          title="Search Topics (Ctrl+K)"
        >
          <Search size={14} className="text-emerald-400" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden md:inline-block text-[9px] bg-slate-800 border border-slate-700 px-1 py-0.5 rounded text-slate-400 font-mono">
            Ctrl+K
          </kbd>
        </button>

        <div className="hidden md:block">
          <ProgressIndicator />
        </div>
        
        {/* Accessibility: Text size control — visible on md+ */}
        <div className="hidden md:block">
          <FontSizeControlPill />
        </div>
      </div>

    </header>
  );
};

export default Header;
