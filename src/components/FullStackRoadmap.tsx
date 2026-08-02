"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2, Clock, Lock, ChevronDown, ChevronUp,
  Globe, Terminal, Palette, Code2, Server, Database,
  Layers, Rocket, Wrench, Brain, BookOpen, Sparkles, Briefcase
} from "lucide-react";

// ─── Curriculum Data ────────────────────────────────────────────────────────

interface Subject {
  id: string;
  name: string;
  lessons: number;
  covered: number;
  link?: string;
  priority: "critical" | "high" | "medium";
}

interface Phase {
  id: string;
  icon: React.ReactNode;
  title: string;
  color: string;
  glow: string;
  subjects: Subject[];
}

const CURRICULUM: Phase[] = [
  {
    id: "career",
    icon: <Briefcase size={18} />,
    title: "Phase 0 — Office & Career Productivity",
    color: "from-blue-600 to-indigo-500",
    glow: "shadow-blue-500/20",
    subjects: [
      { id: "msword", name: "MS Word 365 (Career Skills)", lessons: 60, covered: 8, link: "/msword", priority: "high" },
      { id: "msexcel", name: "MS Excel 365 (Formulas & Data)", lessons: 60, covered: 0, priority: "high" },
      { id: "ppt", name: "MS PowerPoint 365", lessons: 40, covered: 0, priority: "medium" },
      { id: "gworkspace", name: "Google Workspace (Docs, Sheets)", lessons: 40, covered: 0, priority: "medium" },
      { id: "email", name: "Professional Email Writing", lessons: 20, covered: 0, priority: "high" },
      { id: "resume-skills", name: "Resume & LinkedIn Building", lessons: 20, covered: 0, priority: "critical" },
    ],
  },
  {
    id: "foundation",
    icon: <Globe size={18} />,
    title: "Phase 1 — Foundation",
    color: "from-blue-500 to-cyan-400",
    glow: "shadow-blue-500/20",
    subjects: [
      { id: "html", name: "HTML5", lessons: 100, covered: 100, link: "/html", priority: "critical" },
      { id: "cli", name: "Windows CLI / CMD", lessons: 100, covered: 15, link: "/cli", priority: "critical" },
      { id: "css-basics", name: "CSS3 (Basics)", lessons: 100, covered: 0, priority: "critical" },
      { id: "js-basics", name: "JavaScript (ES6+)", lessons: 100, covered: 0, priority: "critical" },
      { id: "git", name: "Git & GitHub", lessons: 100, covered: 0, priority: "critical" },
    ],
  },
  {
    id: "frontend",
    icon: <Palette size={18} />,
    title: "Phase 2 — Frontend",
    color: "from-violet-500 to-purple-400",
    glow: "shadow-violet-500/20",
    subjects: [
      { id: "bootstrap", name: "Bootstrap 5", lessons: 100, covered: 0, priority: "high" },
      { id: "tailwind", name: "Tailwind CSS", lessons: 100, covered: 0, priority: "high" },
      { id: "adv-css", name: "Advanced CSS", lessons: 100, covered: 0, priority: "high" },
      { id: "react", name: "React.js (Core)", lessons: 100, covered: 0, priority: "critical" },
      { id: "adv-react", name: "Advanced React (Redux, Zustand)", lessons: 100, covered: 0, priority: "critical" },
      { id: "typescript", name: "TypeScript", lessons: 100, covered: 0, priority: "critical" },
      { id: "nextjs", name: "Next.js (App Router, SSR)", lessons: 100, covered: 0, priority: "critical" },
      { id: "react-native", name: "React Native (Expo)", lessons: 100, covered: 0, priority: "high" },
    ],
  },
  {
    id: "backend",
    icon: <Server size={18} />,
    title: "Phase 3 — Backend",
    color: "from-emerald-500 to-green-400",
    glow: "shadow-emerald-500/20",
    subjects: [
      { id: "nodejs", name: "Node.js", lessons: 100, covered: 0, priority: "critical" },
      { id: "express", name: "Express.js + REST API", lessons: 100, covered: 0, priority: "critical" },
      { id: "adv-js", name: "Advanced JavaScript", lessons: 100, covered: 0, priority: "critical" },
      { id: "auth", name: "Authentication (JWT, OAuth)", lessons: 50, covered: 0, priority: "critical" },
      { id: "graphql", name: "GraphQL", lessons: 50, covered: 0, priority: "medium" },
      { id: "websockets", name: "WebSockets & Real-time", lessons: 30, covered: 0, priority: "medium" },
      { id: "python", name: "Python", lessons: 100, covered: 0, priority: "high" },
      { id: "django", name: "Django / FastAPI", lessons: 100, covered: 0, priority: "medium" },
    ],
  },
  {
    id: "database",
    icon: <Database size={18} />,
    title: "Phase 4 — Databases",
    color: "from-orange-500 to-amber-400",
    glow: "shadow-orange-500/20",
    subjects: [
      { id: "sql", name: "SQL (MySQL, PostgreSQL)", lessons: 100, covered: 0, priority: "critical" },
      { id: "mongodb", name: "MongoDB (NoSQL)", lessons: 100, covered: 0, priority: "critical" },
      { id: "prisma", name: "Prisma ORM", lessons: 50, covered: 0, priority: "high" },
      { id: "redis", name: "Redis (Caching, Pub/Sub)", lessons: 50, covered: 0, priority: "medium" },
    ],
  },
  {
    id: "fullstack",
    icon: <Layers size={18} />,
    title: "Phase 5 — Full Stack Projects",
    color: "from-pink-500 to-rose-400",
    glow: "shadow-pink-500/20",
    subjects: [
      { id: "mern", name: "MERN Stack Projects", lessons: 100, covered: 0, priority: "critical" },
      { id: "nextjs-projects", name: "Full Stack Next.js Projects", lessons: 50, covered: 0, priority: "critical" },
      { id: "system-design", name: "System Design (LLD, HLD)", lessons: 100, covered: 0, priority: "critical" },
    ],
  },
  {
    id: "devops",
    icon: <Wrench size={18} />,
    title: "Phase 6 — DevOps & Cloud",
    color: "from-sky-500 to-blue-400",
    glow: "shadow-sky-500/20",
    subjects: [
      { id: "linux", name: "Linux CLI & Bash", lessons: 100, covered: 0, priority: "high" },
      { id: "docker", name: "Docker & Containers", lessons: 100, covered: 0, priority: "critical" },
      { id: "cicd", name: "CI/CD (GitHub Actions)", lessons: 50, covered: 0, priority: "high" },
      { id: "cloud", name: "Cloud (AWS / Firebase / Vercel)", lessons: 100, covered: 0, priority: "high" },
      { id: "k8s", name: "Kubernetes (Basics)", lessons: 50, covered: 0, priority: "medium" },
      { id: "nginx", name: "Nginx & Web Servers", lessons: 30, covered: 0, priority: "medium" },
      { id: "devops-complete", name: "DevOps End-to-End Workflow", lessons: 100, covered: 0, priority: "high" },
    ],
  },
  {
    id: "advanced",
    icon: <Brain size={18} />,
    title: "Phase 7 — CS Fundamentals",
    color: "from-fuchsia-500 to-pink-400",
    glow: "shadow-fuchsia-500/20",
    subjects: [
      { id: "dsa", name: "DSA (Arrays, Trees, DP, Graphs)", lessons: 100, covered: 0, priority: "critical" },
      { id: "networking", name: "Computer Networks (HTTP, DNS)", lessons: 100, covered: 0, priority: "critical" },
      { id: "security", name: "Web Security (OWASP Top 10)", lessons: 50, covered: 0, priority: "critical" },
      { id: "performance", name: "Performance Optimization", lessons: 50, covered: 0, priority: "high" },
      { id: "testing", name: "Testing (Jest, Cypress, RTL)", lessons: 50, covered: 0, priority: "high" },
      { id: "os", name: "Operating Systems Basics", lessons: 50, covered: 0, priority: "medium" },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getPct(covered: number, lessons: number) {
  return Math.round((covered / lessons) * 100);
}

function getStatusBadge(covered: number, lessons: number) {
  const pct = getPct(covered, lessons);
  if (pct === 0) return { label: "Under Dev 🚧", cls: "bg-slate-800 text-slate-500 border border-slate-700" };
  if (pct === 100) return { label: "Complete ✅", cls: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" };
  return { label: `${pct}% done`, cls: "bg-blue-500/10 text-blue-400 border border-blue-500/20" };
}

// ─── Subject Row ─────────────────────────────────────────────────────────────

function SubjectRow({ subject }: { subject: Subject }) {
  const pct = getPct(subject.covered, subject.lessons);
  const status = getStatusBadge(subject.covered, subject.lessons);
  const isLive = pct > 0 && subject.link;
  const isComplete = pct === 100;

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
      ${isLive ? "hover:bg-white/5 cursor-pointer" : "opacity-70 cursor-default"}`}>
      
      {/* Status icon */}
      <div className="flex-shrink-0">
        {isComplete ? (
          <CheckCircle2 size={16} className="text-emerald-400" />
        ) : pct > 0 ? (
          <Clock size={16} className="text-blue-400 animate-pulse" />
        ) : (
          <Lock size={16} className="text-slate-600" />
        )}
      </div>

      {/* Name + progress */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          {isLive ? (
            <Link href={subject.link!}
              className="text-sm font-bold text-slate-200 hover:text-white group-hover:underline underline-offset-2 truncate">
              {subject.name}
            </Link>
          ) : (
            <span className="text-sm font-bold text-slate-500 truncate">{subject.name}</span>
          )}
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${status.cls}`}>
            {status.label}
          </span>
        </div>
        {/* Progress bar */}
        {pct > 0 && pct < 100 && (
          <div className="mt-1.5 h-1 bg-slate-800 rounded-full overflow-hidden w-full max-w-xs">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
        )}
      </div>

      {/* Lesson count */}
      <span className="text-[11px] text-slate-600 font-mono flex-shrink-0">
        {subject.covered}/{subject.lessons}
      </span>
    </div>
  );
}

// ─── Phase Card ───────────────────────────────────────────────────────────────

function PhaseCard({ phase }: { phase: Phase }) {
  const [open, setOpen] = useState(true);
  const totalLessons = phase.subjects.reduce((a, s) => a + s.lessons, 0);
  const coveredLessons = phase.subjects.reduce((a, s) => a + s.covered, 0);
  const pct = getPct(coveredLessons, totalLessons);
  const liveSubs = phase.subjects.filter(s => s.covered > 0).length;

  return (
    <div className={`bg-[#0a1120]/80 backdrop-blur-xl border border-slate-800/60 rounded-2xl overflow-hidden shadow-xl ${phase.glow}`}>
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-white/3 transition-all"
      >
        {/* Gradient icon pill */}
        <div className={`p-2 rounded-xl bg-gradient-to-br ${phase.color} text-white shadow-lg flex-shrink-0`}>
          {phase.icon}
        </div>

        <div className="flex-1 text-left">
          <div className="text-sm font-black text-white">{phase.title}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {liveSubs}/{phase.subjects.length} subjects live · {coveredLessons}/{totalLessons} lessons
          </div>
        </div>

        {/* Phase % badge */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="hidden sm:flex flex-col items-end gap-1">
            <span className={`text-xs font-black px-2.5 py-0.5 rounded-full
              ${pct === 0 ? "text-slate-500 bg-slate-800" :
                pct === 100 ? "text-emerald-400 bg-emerald-500/10" :
                "text-blue-400 bg-blue-500/10"}`}>
              {pct === 0 ? "Coming Soon" : `${pct}%`}
            </span>
            {/* Mini progress bar */}
            <div className="w-24 h-1 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full bg-gradient-to-r ${phase.color} rounded-full transition-all`}
                style={{ width: `${pct}%` }} />
            </div>
          </div>
          {open ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
        </div>
      </button>

      {/* Subject list */}
      {open && (
        <div className="border-t border-slate-800/60 py-2">
          {phase.subjects.map(sub => (
            <SubjectRow key={sub.id} subject={sub} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Roadmap Component ───────────────────────────────────────────────────

export default function FullStackRoadmap() {
  const totalSubjects = CURRICULUM.reduce((a, p) => a + p.subjects.length, 0);
  const totalLessons = CURRICULUM.reduce((a, p) => a + p.subjects.reduce((b, s) => b + s.lessons, 0), 0);
  const coveredLessons = CURRICULUM.reduce((a, p) => a + p.subjects.reduce((b, s) => b + s.covered, 0), 0);
  const liveSubjects = CURRICULUM.reduce((a, p) => a + p.subjects.filter(s => s.covered > 0).length, 0);
  const overallPct = getPct(coveredLessons, totalLessons);

  return (
    <section id="roadmap" className="py-16 px-4 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-4">
          <Sparkles size={12} />
          Full Stack Roadmap
          <Sparkles size={12} />
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
          India&apos;s Most Complete{" "}
          <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
            Free Dev Curriculum
          </span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
          48 subjects · ~3,750 lessons · Hindi + Hinglish + English · Kid &amp; Pro mode
        </p>

        {/* Global progress bar */}
        <div className="mt-8 bg-[#0a1120]/80 border border-slate-800/60 rounded-2xl p-5 max-w-sm mx-auto">
          <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
            <span>{liveSubjects} / {totalSubjects} Subjects Live</span>
            <span className="text-blue-400">{overallPct}% Overall</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-400 rounded-full transition-all duration-1000"
              style={{ width: `${overallPct}%` }} />
          </div>
          <div className="flex justify-between text-[10px] text-slate-600 mt-2">
            <span>{coveredLessons} lessons live</span>
            <span>{totalLessons - coveredLessons} coming soon</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 justify-center mb-8 text-xs font-bold">
        <span className="flex items-center gap-1.5 text-emerald-400"><CheckCircle2 size={13} /> Complete</span>
        <span className="flex items-center gap-1.5 text-blue-400"><Clock size={13} /> In Progress</span>
        <span className="flex items-center gap-1.5 text-slate-500"><Lock size={13} /> Under Dev 🚧</span>
      </div>

      {/* Phase Cards Grid */}
      <div className="space-y-4">
        {CURRICULUM.map(phase => (
          <PhaseCard key={phase.id} phase={phase} />
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-10 text-center">
        <div className="inline-flex items-center gap-2 text-xs text-slate-500">
          <BookOpen size={13} />
          New subjects added regularly · Updated Jul 2026 · All lessons free forever
        </div>
      </div>
    </section>
  );
}
