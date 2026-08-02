import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
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

      {/* Right Section: Progress, Font Size & Theme Toggle in a horizontal row */}
      <div className="flex flex-row items-center gap-3 sm:gap-4">
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
