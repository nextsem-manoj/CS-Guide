import React from 'react';
import Link from 'next/link';
import { getChapterUrl } from '../lib/htmlLessonsHelper';

interface Topic {
  label: string;
  path: string;
}

interface PhaseCardProps {
  phase: {
    id: string;
    title: string;
    duration: string;
    color: string;
    bulletColor: string;
    icon: string;
    path: string;
    topics: Topic[];
  };
  onClick: () => void;
}

// Map each phase ID to a rich visual config
const PHASE_META: Record<string, {
  gradient: string;
  glow: string;
  badge: string;
  emoji: string;
  outcome: string;
  tag: string;
}> = {
  P0: {
    gradient: 'from-violet-600 via-purple-600 to-indigo-700',
    glow: 'rgba(139,92,246,0.35)',
    badge: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    emoji: '⚙️',
    outcome: 'Professional dev environment ready',
    tag: 'Foundation',
  },
  P1: {
    gradient: 'from-sky-500 via-blue-600 to-cyan-600',
    glow: 'rgba(14,165,233,0.35)',
    badge: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    emoji: '🌐',
    outcome: 'Build any static webpage from scratch',
    tag: 'Markup',
  },
  P2: {
    gradient: 'from-emerald-500 via-teal-500 to-green-600',
    glow: 'rgba(16,185,129,0.35)',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    emoji: '🎨',
    outcome: 'Design pixel-perfect responsive UIs',
    tag: 'Styling',
  },
  P3: {
    gradient: 'from-amber-500 via-orange-500 to-yellow-500',
    glow: 'rgba(245,158,11,0.35)',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    emoji: '⚡',
    outcome: 'Add interactivity and logic to any page',
    tag: 'Logic',
  },
  P4: {
    gradient: 'from-blue-500 via-indigo-500 to-violet-600',
    glow: 'rgba(99,102,241,0.35)',
    badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    emoji: '⚛️',
    outcome: 'Build dynamic SPAs with React',
    tag: 'Frontend Framework',
  },
  P5: {
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-600',
    glow: 'rgba(236,72,153,0.35)',
    badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    emoji: '🗄️',
    outcome: 'Power your apps with a live backend',
    tag: 'Backend',
  },
  P6: {
    gradient: 'from-cyan-500 via-teal-500 to-emerald-600',
    glow: 'rgba(6,182,212,0.35)',
    badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    emoji: '🚀',
    outcome: 'Ship real apps to production',
    tag: 'Deployment',
  },
  P7: {
    gradient: 'from-slate-600 via-gray-700 to-zinc-800',
    glow: 'rgba(100,116,139,0.35)',
    badge: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
    emoji: '💼',
    outcome: 'Land your first developer job',
    tag: 'Career',
  },
};

const PhaseCard: React.FC<PhaseCardProps> = ({ phase }) => {
  const meta = PHASE_META[phase.id] ?? {
    gradient: 'from-slate-600 to-slate-700',
    glow: 'rgba(100,116,139,0.3)',
    badge: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
    emoji: '📚',
    outcome: 'Master this phase to level up',
    tag: 'Module',
  };

  return (
    <div
      className="group flex flex-col w-full rounded-2xl overflow-hidden border border-white/10 dark:border-slate-800 bg-white dark:bg-[#0a0f1e] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: `0 8px 32px ${meta.glow}` }}
    >
      {/* ── Gradient Header ── */}
      <div className={`relative bg-gradient-to-br ${meta.gradient} px-5 pt-5 pb-4 overflow-hidden`}>
        {/* Background decorative blobs */}
        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 w-32 h-10 rounded-full bg-black/20 blur-2xl pointer-events-none" />

        {/* Phase ID tag */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border bg-white/15 text-white/90 border-white/20`}>
            {phase.id} · {meta.tag}
          </span>
          <span className="text-[10px] font-bold text-white/60 flex items-center gap-1">
            ⏱ {phase.duration}
          </span>
        </div>

        {/* Icon + Title row */}
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-xl font-black border border-white/25 bg-white/15 backdrop-blur-sm shadow-inner"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
          >
            {meta.emoji}
          </div>
          <div>
            <div className="text-base font-black text-white leading-tight tracking-tight">{phase.title}</div>
            <div className="text-[11px] text-white/70 mt-0.5 font-medium">{meta.outcome}</div>
          </div>
        </div>

        {/* Topic count pill */}
        <div className="mt-3 flex items-center gap-1.5">
          {[...Array(Math.min(phase.topics.length, 8))].map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full bg-white/30 overflow-hidden"
            >
              <div className="h-full w-full bg-white/80 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ transitionDelay: `${i * 60}ms` }}
              />
            </div>
          ))}
          <span className="text-[9px] font-black text-white/70 ml-1 shrink-0">
            {phase.topics.length} lessons
          </span>
        </div>
      </div>

      {/* ── Topic List ── */}
      <ul className="flex-1 divide-y divide-slate-100 dark:divide-slate-800/70">
        {phase.topics.map((topic, idx) => (
          <li key={idx}>
            <Link
              href={getChapterUrl(topic.path)}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group/item"
            >
              {/* Numbered bullet */}
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black shrink-0 transition-all duration-200 group-hover/item:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${phase.bulletColor}33, ${phase.bulletColor}66)`,
                  color: phase.bulletColor,
                  border: `1px solid ${phase.bulletColor}44`,
                }}
              >
                {idx + 1}
              </span>

              {/* Label */}
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors leading-snug flex-1">
                {topic.label}
              </span>

              {/* Arrow */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover/item:text-blue-500 group-hover/item:translate-x-0.5 transition-all shrink-0"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>

      {/* ── CTA Footer ── */}
      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800">
        <Link
          href={getChapterUrl(phase.path)}
          className={`w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r ${meta.gradient} text-white font-black text-[11px] uppercase tracking-widest py-3 px-5 rounded-xl shadow-md transition-all active:scale-[0.97] hover:opacity-90 cursor-pointer`}
          style={{ boxShadow: `0 4px 14px ${meta.glow}` }}
        >
          <span>{meta.emoji}</span>
          <span>Start {phase.id}: {phase.title.split(' ')[0]}</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default PhaseCard;
