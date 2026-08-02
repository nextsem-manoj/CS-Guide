"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, BookOpen, Languages, HardDriveDownload, 
  Terminal, Code, Layers, ChevronRight, GraduationCap, 
  Cpu, Zap, Users, ShieldCheck, Heart 
} from 'lucide-react';
import { auth, signInWithGoogle } from '../../lib/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

export default function AboutClient() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; photo?: string } | null>(null);
  const [isAlreadyDownloaded, setIsAlreadyDownloaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({ 
          name: user.displayName || "Student", 
          email: user.email || "", 
          photo: user.photoURL || undefined 
        });
      } else {
        setCurrentUser(null);
      }
    });

    const saved = localStorage.getItem('nextsem_offline_chapters');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && Object.keys(parsed).length > 0) setIsAlreadyDownloaded(true);
      } catch (e) { 
        console.error(e); 
      }
    }
    return () => unsubscribe();
  }, []);

  const stats = [
    { number: "100%", label: "Free Forever", desc: "No subscriptions, no hidden paywalls." },
    { number: "3+", label: "Languages Supported", desc: "Learn in English, Hindi, or Hinglish." },
    { number: "6 Phases", label: "Structured Path", desc: "From absolute setup basics to production deploy." },
    { number: "Offline", label: "First Approach", desc: "Download and study without internet." }
  ];

  const features = [
    { 
      icon: <Languages size={22} className="text-[#c1a648]" />, 
      label: "Multilingual Localized Learning", 
      desc: "Switch between English, Hindi, and Hinglish instantly mid-lesson. We write lessons the way you actually speak and think, eliminating linguistic barriers to core engineering concepts." 
    },
    { 
      icon: <Terminal size={22} className="text-[#39FF14]" />, 
      label: "Hands-on CMD & Git Simulators", 
      desc: "Learn CLI commands through our exclusive Windows terminal emulator. Practice dir, cd, mkdir, and git init step-by-step with real-time shell feedback." 
    },
    { 
      icon: <Code size={22} className="text-[#60a5fa]" />, 
      label: "Live Sandbox Playgrounds", 
      desc: "Code HTML, CSS, and JS components live side-by-side with your readings. Test responsive layouts and script outputs directly inside the browser." 
    },
    { 
      icon: <HardDriveDownload size={22} className="text-[#a78bfa]" />, 
      label: "Offline-First Portability", 
      desc: "Save entire chapters to local storage with one click. Access rich interactive textbook materials and exercises even when traveling or in areas with poor internet connection." 
    },
    { 
      icon: <GraduationCap size={22} className="text-[#f472b6]" />, 
      label: "Indian University Integration", 
      desc: "Curriculum tailored specifically to align with BCA, B.Tech, and MCA course guidelines across Indian universities, while bridging the gap with modern industry-level toolchains." 
    },
    { 
      icon: <ShieldCheck size={22} className="text-[#34d399]" />, 
      label: "No Ads, No Distractions", 
      desc: "Unlike other free coding sites, our about page, profile screens, and lessons are built to be completely distraction-free, focusing 100% on your learning journey." 
    }
  ];

  const curriculum = [
    { phase: "Phase 1", label: "Dev Setup & CLI", desc: "Master the Windows CMD Prompt, VS Code workspace organization, and local Git version control basics." },
    { phase: "Phase 2", label: "Responsive HTML/CSS", desc: "Build layouts using modern Semantic HTML5, Flexbox alignments, CSS Grid systems, and media queries." },
    { phase: "Phase 3", label: "Interactive JavaScript", desc: "Dive deep into DOM manipulation, async fetches, API calls, event handlers, and ES6+ programming." },
    { phase: "Phase 4", label: "Frontend with React.js", desc: "Develop reactive web apps using JSX structures, component lifecycle hooks, states, and custom hook hooks." },
    { phase: "Phase 5", label: "Backend Engineering", desc: "Architect APIs using Node.js servers, Express routing, REST patterns, and MongoDB document structures." },
    { phase: "Phase 6", label: "Production & Deploy", desc: "Configure server environments, manage deployments, publish live domains, and optimize application performance." }
  ];

  return (
    <div className="min-h-screen bg-[#050914] text-slate-100 font-sans selection:bg-[#c1a648]/30 selection:text-white relative bg-[radial-gradient(rgba(193,166,72,0.06)_1px,transparent_1px)] [background-size:24px_24px]">

      {/* Header Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#060813]/90 backdrop-blur-xl border-b border-slate-800/80 flex items-center justify-between px-6 py-4">
        <button 
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 hover:text-white transition-colors cursor-pointer border-none bg-transparent"
        >
          <ArrowLeft size={14} className="stroke-[2.5]" />
          <span>Back to Home</span>
        </button>
        
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Nextsem Logo" className="w-6 h-6 rounded-lg border border-emerald-500/20" />
          <span className="font-black text-xs uppercase tracking-widest text-slate-200">About Nextsem</span>
        </div>

        {currentUser ? (
          <button
            onClick={async () => { try { await signOut(auth); } catch (e) { console.error(e); } }}
            className="text-xs font-black uppercase tracking-wider text-slate-400 hover:text-white transition-colors cursor-pointer border-none bg-transparent"
          >
            Sign out
          </button>
        ) : (
          <button
            onClick={async () => { try { await signInWithGoogle(); } catch (e) { console.error(e); } }}
            className="text-xs font-black uppercase tracking-wider text-[#c1a648] hover:text-[#e4ca67] transition-colors cursor-pointer border-none bg-transparent"
          >
            Sign in
          </button>
        )}
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-6 py-12 md:py-20 space-y-24">

        {/* ── HERO HEADER SECTION ── */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-amber-500/10 to-[#c1a648]/10 border border-[#c1a648]/20 rounded-full text-[10px] font-black uppercase tracking-widest text-[#c1a648]">
            <Zap size={10} />
            <span>Our Vision & Mission</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
            Democratizing Technology<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#e4ca67] via-[#c1a648] to-[#967b26]">
              Education for India
            </span>
          </h1>

          <p className="text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Nextsem Academy is a free, structured, and offline-capable coding curriculum built explicitly to help college students bridge the gap between academic syllabus and real-world product engineering.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <Link
              href="/course"
              className="px-6 py-3 bg-[#c1a648] hover:bg-[#a38b3a] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center gap-1"
            >
              <span>Explore Curriculum</span>
              <ChevronRight size={14} className="stroke-[2.5]" />
            </Link>
            <Link
              href="/profile"
              className="px-6 py-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 font-black text-xs uppercase tracking-wider rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Check My Progress
            </Link>
          </div>
        </section>

        {/* ── STATS BLOCK ── */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, idx) => (
            <div key={idx} className="bg-[#0c101f]/40 border border-slate-850/60 rounded-2xl p-5 text-center space-y-1">
              <span className="block text-2xl md:text-3xl font-black text-white tracking-tight">{s.number}</span>
              <span className="block text-[10px] font-black uppercase text-[#c1a648] tracking-wider">{s.label}</span>
              <span className="block text-[9px] text-slate-500 font-bold leading-normal">{s.desc}</span>
            </div>
          ))}
        </section>

        {/* ── BRAND MISSION STATEMENT ── */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#070b19]/35 border border-slate-850/60 rounded-3xl p-8 backdrop-blur-md">
          <div className="md:col-span-4 flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-[#c1a648]/10 border border-[#c1a648]/20 flex items-center justify-center text-[#c1a648]">
              <Heart size={32} className="animate-pulse" />
            </div>
          </div>
          <div className="md:col-span-8 space-y-3.5 text-center md:text-left">
            <h3 className="font-extrabold text-white text-base uppercase tracking-tight">Bridging Academic & Industry Standards</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              We realized that university syllabi (BCA, B.Tech, MCA) are highly theoretical, whereas companies expect hands-on CLI command knowledge, package integrations, and modern version control right from day one. Nextsem Academy is designed to bridge this exact gap with gamified simulators, live sandboxes, and structured project tracks.
            </p>
          </div>
        </section>

        {/* ── SYSTEM KEY FEATURES Grid ── */}
        <section className="space-y-8">
          <div className="text-center space-y-1">
            <span className="text-[9px] font-black uppercase text-[#c1a648] tracking-widest">Built-in Innovation</span>
            <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Everything is Included & 100% Free</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, idx) => (
              <div key={idx} className="bg-[#070b19]/25 border border-slate-850/60 rounded-2xl p-5 hover:border-slate-800 transition-all hover:scale-[1.01] active:scale-[0.99] flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-850 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                    {f.icon}
                  </div>
                  <h4 className="font-extrabold text-white text-xs uppercase tracking-tight">{f.label}</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed font-medium">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CURRICULUM TIMELINE ── */}
        <section className="space-y-8">
          <div className="text-center space-y-1">
            <span className="text-[9px] font-black uppercase text-[#c1a648] tracking-widest">The Roadmap</span>
            <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Curriculum Structure</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {curriculum.map((c, idx) => (
              <div key={idx} className="bg-[#0b0c16] border border-slate-850 rounded-2xl p-5 space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-slate-900/40 rounded-bl-full flex items-center justify-center text-[10px] font-black text-[#c1a648] opacity-60">
                  {c.phase}
                </div>
                <h4 className="font-extrabold text-white text-xs uppercase tracking-tight pr-8">{c.label}</h4>
                <p className="text-[10px] text-slate-400 leading-relaxed font-medium">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link 
              href="/course" 
              className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#c1a648] hover:text-[#e4ca67] transition-all hover:translate-x-0.5"
            >
              <span>See Full Course Details</span>
              <ChevronRight size={14} className="stroke-[2.5]" />
            </Link>
          </div>
        </section>

        {/* ── BOTTOM CALL TO ACTION ── */}
        <section className="border border-slate-850 bg-[#070b19]/35 rounded-3xl p-8 md:p-12 text-center space-y-6 max-w-3xl mx-auto relative overflow-hidden">
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Ready to Master Full Stack?</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            Start learning today without even creating an account. Sign in with Google only when you want to sync progress.
          </p>
          
          <div>
            <Link
              href="/course"
              className="px-6 py-3.5 bg-[#c1a648] hover:bg-[#a38b3a] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-1"
            >
              <span>Start Course Now</span>
              <ChevronRight size={14} className="stroke-[2.5]" />
            </Link>
          </div>

          <div className="pt-8 border-t border-slate-850/60 flex flex-wrap gap-x-6 gap-y-2 justify-center text-[10px] font-black uppercase tracking-wider text-slate-500">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Use</Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">Contact Support</Link>
            <span className="text-slate-600">© 2026 Nextsem Academy</span>
          </div>
        </section>

      </main>
    </div>
  );
}
