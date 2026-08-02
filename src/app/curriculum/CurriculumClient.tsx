"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import FullStackRoadmap from '@/components/FullStackRoadmap';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ArrowLeft, BookOpen, Layers, Terminal, Rocket, CheckCircle2 } from 'lucide-react';

export default function CurriculumClient() {
  return (
    <div className="min-h-screen bg-[#060d1a] text-white flex flex-col font-sans selection:bg-[#04AA6D]/30">
      
      {/* ── HEADER NAVIGATION ── */}
      <header className="sticky top-0 z-50 bg-[#0b1329]/90 backdrop-blur-md border-b border-slate-800 shadow-md">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-[60px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 select-none group">
              <img src="/logo.svg" alt="Nextsem Logo" className="w-8 h-8 rounded-lg border border-emerald-500/20 group-hover:scale-105 transition-transform" />
              <span className="font-black text-base tracking-tight text-white uppercase">
                Nextsem<span className="text-[#04AA6D] lowercase font-bold">.online</span>
              </span>
            </Link>
            <span className="hidden sm:inline-block text-slate-600 dark:text-slate-500">•</span>
            <span className="hidden sm:inline-block text-xs font-bold text-slate-400 uppercase tracking-wider">
              Free Dev Curriculum
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700/60"
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ── HERO BANNER ── */}
      <section className="py-12 px-4 md:px-6 max-w-[1200px] mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#04AA6D] text-xs font-black uppercase tracking-widest">
          <Rocket size={14} />
          <span>Full Stack Roadmap & Subject Tree</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
          Complete Free Dev Curriculum
        </h1>
        <p className="text-slate-400 text-xs md:text-sm max-w-2xl mx-auto font-medium leading-relaxed">
          Master full stack software development from Windows CLI and HTML basics up to React, Node.js REST APIs, MongoDB, and production deployment — completely free with step-by-step interactive simulators.
        </p>
      </section>

      {/* ── ROADMAP CONTAINER ── */}
      <main className="flex-1 max-w-[1300px] w-full mx-auto px-2 md:px-6 pb-16">
        <div className="bg-[#0a1120] border border-slate-800/80 rounded-3xl p-4 md:p-8 shadow-2xl">
          <FullStackRoadmap />
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#080e1a] border-t border-slate-800/80 py-8 px-4 text-center text-xs text-slate-500 font-medium">
        <div className="max-w-[1200px] mx-auto space-y-3">
          <p className="text-slate-400 font-bold uppercase tracking-wider">
            Nextsem Academy • Complete Free Dev Curriculum
          </p>
          <p className="text-[11px]">
            Designed for self-taught developers, college students, and computer science aspirants worldwide.
          </p>
        </div>
      </footer>

    </div>
  );
}
