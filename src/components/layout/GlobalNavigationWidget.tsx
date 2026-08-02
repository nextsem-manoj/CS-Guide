"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, X, Home, Terminal, Code, Play, BookOpen, 
  Layers, Library, Compass, Landmark, LineChart, 
  User, Info, Mail, ShieldAlert, FileSpreadsheet, Sparkles
} from 'lucide-react';

interface NavLink {
  name: string;
  href: string;
  desc: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

interface NavCategory {
  title: string;
  color: string;
  links: NavLink[];
}

export default function GlobalNavigationWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close drawer automatically on navigation changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock document scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!mounted) return null;

  // Exclude rendering on Playground (which needs full workspace area)
  if (pathname === '/playground') return null;

  // Web Development & Coding categories (Main site: nextsem.online)
  const webDevCategories: NavCategory[] = [
    {
      title: "💻 Practice & Coding Simulators",
      color: "text-blue-400 border-blue-500/20 bg-blue-500/5",
      links: [
        {
          name: "CMD Simulator",
          href: "/cmd",
          desc: "Practice Windows CMD terminal commands",
          icon: <Terminal size={14} className="text-blue-400" />,
          badge: "drill",
          badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20"
        },
        {
          name: "Git Terminal",
          href: "/git/terminal",
          desc: "Step-by-step Git version control tutorial",
          icon: <Code size={14} className="text-emerald-400" />,
          badge: "interactive",
          badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        },
        {
          name: "Sandbox Playground",
          href: "/playground",
          desc: "Live HTML, CSS, and JS editor console",
          icon: <Play size={14} className="text-purple-400" />,
        },
        {
          name: "PDF to Markdown",
          href: "/pdf-to-markdown",
          desc: "Convert uploaded PDF notes into .md files",
          icon: <FileSpreadsheet size={14} className="text-[#c1a648]" />,
          badge: "NEW",
          badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        },
        {
          name: "Gemini AI Studio",
          href: "/gemini-ai",
          desc: "Run user prompts with Google Gemini AI",
          icon: <Sparkles size={14} className="text-indigo-400" />,
          badge: "AI",
          badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
        }
      ]
    },
    {
      title: "📚 Web Dev & BCA Syllabus",
      color: "text-amber-400 border-amber-500/20 bg-amber-500/5",
      links: [
        {
          name: "BCA Subject Hub",
          href: "/bca",
          desc: "IGNOU & standard university degree notes",
          icon: <Layers size={14} className="text-amber-400" />,
          badge: "Semester 1-6",
          badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20"
        },
        {
          name: "HTML Tutorials",
          href: "/html",
          desc: "100+ bite-sized interactive web lessons",
          icon: <BookOpen size={14} className="text-cyan-400" />,
        },
        {
          name: "Classroom Syllabus",
          href: "/course",
          desc: "All learning modules roadmap & certificates",
          icon: <Sparkles size={14} className="text-yellow-400" />
        }
      ]
    },
    {
      title: "👤 Account & General Links",
      color: "text-slate-400 border-slate-800 bg-slate-900/40",
      links: [
        {
          name: "Student Profile",
          href: "/profile",
          desc: "Track completed courses & stats",
          icon: <User size={14} className="text-slate-300" />
        },
        {
          name: "About Nextsem",
          href: "/about",
          desc: "Learn about our mission & platform",
          icon: <Info size={14} className="text-slate-350" />
        },
        {
          name: "Contact Support",
          href: "/contact",
          desc: "Get support or request features",
          icon: <Mail size={14} className="text-slate-355" />
        },
        {
          name: "Privacy Policy",
          href: "/privacy",
          desc: "Review privacy practices",
          icon: <ShieldAlert size={14} className="text-slate-400" />
        },
        {
          name: "Terms of Service",
          href: "/terms",
          desc: "Read platform agreements",
          icon: <FileSpreadsheet size={14} className="text-slate-400" />
        }
      ]
    }
  ];

  const activeCategories = webDevCategories;

  return (
    <>
      {/* Navigation Drawer Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] animate-in fade-in duration-200"
          />

          {/* Drawer Panel */}
          <aside className="fixed top-0 left-0 h-screen w-80 md:w-[350px] bg-[#070b15] border-r border-slate-850/80 text-white z-[10000] flex flex-col shadow-[15px_0_50px_rgba(0,0,0,0.8)] animate-in slide-in-from-left duration-300 select-none">
            
            {/* Header */}
            <div className="p-5 border-b border-slate-850/50 bg-[#0b101f] flex justify-between items-center shrink-0">
              <Link 
                href="/" 
                className="flex items-center gap-2.5"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <span className="text-emerald-400 font-black text-xs leading-none">NS</span>
                </div>
                <div>
                  <h2 className="text-sm font-black uppercase tracking-widest text-white leading-none">Nextsem</h2>
                  <p className="text-[9px] font-extrabold uppercase text-emerald-400 mt-1 tracking-wider">
                    Web Dev Navigator
                  </p>
                </div>
              </Link>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Close Navigation"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Categories & Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
              
              {/* Home Quick Link */}
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 bg-slate-900/30 hover:bg-slate-900 border border-slate-850 hover:border-emerald-500/30 rounded-xl transition-all group font-bold text-xs"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:scale-105 transition-transform">
                  <Home size={14} className="text-emerald-400" />
                </div>
                <div className="text-left">
                  <span className="block text-slate-200 group-hover:text-emerald-400 transition-colors">Welcome Dashboard</span>
                  <span className="block text-[8px] text-slate-500 mt-0.5">
                    Web Development Academy
                  </span>
                </div>
              </Link>

              {/* Categorized Modules */}
              {activeCategories.map((cat, idx) => (
                <div key={idx} className="space-y-2">
                  <span className="block text-[10px] font-black uppercase tracking-wider text-slate-500 pl-1">
                    {cat.title}
                  </span>

                  <div className="flex flex-col gap-1.5">
                    {cat.links.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all text-xs font-semibold ${
                            isActive
                              ? "bg-slate-900 border-emerald-500/40 text-emerald-400"
                              : "bg-slate-900/15 border-transparent hover:border-slate-850 hover:bg-slate-900/40 text-slate-300 hover:text-white"
                          }`}
                        >
                          <div className={`w-7 h-7 rounded-lg bg-[#0c1223] border border-slate-850 flex items-center justify-center shrink-0 ${isActive ? 'border-emerald-500/20' : ''}`}>
                            {link.icon}
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className={`block font-bold ${isActive ? 'text-emerald-400' : 'text-slate-200'}`}>
                                {link.name}
                              </span>
                              {link.badge && (
                                <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full border shrink-0 ${link.badgeColor}`}>
                                  {link.badge}
                                </span>
                              )}
                            </div>
                            <span className="block text-[9px] text-slate-400 mt-0.5 font-normal line-clamp-1">
                              {link.desc}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}

            </div>
          </aside>
        </>
      )}
    </>
  );
}
