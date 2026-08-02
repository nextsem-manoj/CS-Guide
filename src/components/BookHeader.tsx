"use client";

import React from 'react';
import Link from 'next/link';
import ProgressIndicator from './ProgressIndicator';


const BookHeader = () => {
  return (
    <header className="bg-[#0f172a]/80 backdrop-blur-xl text-white py-3 px-4 md:px-8 flex flex-row items-center justify-between border-b border-green-500/50 shadow-md sticky top-0 z-50">

      {/* Left: Logo + Title */}
      <div className="flex flex-row items-center gap-3 sm:gap-4">
        <Link href="/" className="flex flex-row items-center gap-2.5 hover:opacity-80 transition-opacity">
          <img src="/logo.svg" alt="Nextsem Logo" className="w-7 h-7 rounded-lg border border-emerald-500/20" />
          <span className="font-black text-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">NextSem</span>
        </Link>
        <div className="h-6 w-px bg-gray-600 hidden sm:block" />
        <h1 className="text-sm md:text-lg font-black text-white tracking-wide uppercase whitespace-nowrap overflow-hidden text-ellipsis">
          Nextsem JBRS course
        </h1>
      </div>

      {/* Right: Progress */}
      <div className="flex flex-row items-center gap-4">
        <div className="hidden sm:block">
          <ProgressIndicator />
        </div>
      </div>


    </header>
  );
};

export default BookHeader;

