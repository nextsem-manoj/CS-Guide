"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, BookOpen, Clock, BarChart2 } from "lucide-react";
import AdSenseBanner from "../../../components/AdSenseBanner";

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  phase: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  image: string;
  requiredChapters: string[];
  requiredChapterTitles: string[];
}

const PROJECTS: ProjectItem[] = [
  {
    id: "bio-card",
    title: "Responsive Personal Bio Card",
    description: "A clean, responsive card showing your profile picture, biography, and social links. Perfect for practicing flex layouts.",
    phase: "Phase 1: HTML & CSS Basics",
    difficulty: "Beginner",
    duration: "2-3 Hours",
    image: "/html5_illustration.webp",
    requiredChapters: ["p0-1-setup", "cli-ch1-basics", "p1-1-intro-and-text", "p1-2-links-and-media", "p2-3-box-model"],
    requiredChapterTitles: ["Setup Tools", "CLI Basics", "Web Intro & Text", "Links & Media", "CSS Box Model"]
  },
  {
    id: "pricing-table",
    title: "Comparison Pricing Table",
    description: "An interactive subscription plans selector (Basic, Pro, Enterprise) utilizing CSS Grid and smooth hover card scaling animations.",
    phase: "Phase 1: HTML & CSS Basics",
    difficulty: "Beginner",
    duration: "3-4 Hours",
    image: "/css3_illustration.webp",
    requiredChapters: ["p1-4-forms-and-inputs", "p2-4-positioning", "p2-5-flexbox", "p2-6-grid"],
    requiredChapterTitles: ["Forms & Inputs", "CSS Positioning", "CSS Flexbox", "CSS Grid"]
  },
  {
    id: "currency-converter",
    title: "Live Currency Converter Widget",
    description: "A functional exchange converter querying online rates via API, parsing details, and updating numbers dynamically on keypress.",
    phase: "Phase 2: JavaScript DOM",
    difficulty: "Intermediate",
    duration: "5-6 Hours",
    image: "/javascript_illustration.webp",
    requiredChapters: ["p3-1-basics", "p3-2-control-flow", "p3-3-functions", "p3-9-events", "p3-10-storages"],
    requiredChapterTitles: ["JS Basics", "Control Flow", "Functions", "Events", "Storages"]
  },
  {
    id: "markdown-editor",
    title: "Markdown Live Note Editor",
    description: "A split-screen React notebook displaying written markdown syntax on the left and a live formatted output preview on the right.",
    phase: "Phase 3: React Components",
    difficulty: "Intermediate",
    duration: "6-8 Hours",
    image: "/react_illustration.webp",
    requiredChapters: ["p4-1-jsx", "p4-2-components", "p4-4-state", "p4-6-refs"],
    requiredChapterTitles: ["React JSX", "React Components", "React State", "React Refs"]
  },
  {
    id: "kanban-board",
    title: "Trello Kanban Board Workspace",
    description: "An advanced drag-and-drop workflow planner with multiple columns (To Do, In Progress, Done) for tracking team tasks.",
    phase: "Phase 4: Full App Integration",
    difficulty: "Advanced",
    duration: "10-12 Hours",
    image: "/projects_illustration.webp",
    requiredChapters: ["p3-5-array-iterators", "p3-7-dom-selection", "p4-8-context", "p5-1-node"],
    requiredChapterTitles: ["Array Iterators", "DOM Selection", "React Context", "Node.js Basics"]
  },
  {
    id: "student-portal",
    title: "BCA Student Dashboard Portal",
    description: "A complete system for tracking homework checklists, semester schedules, assignment dropzones, and study indicators.",
    phase: "Phase 4: Full App Integration",
    difficulty: "Advanced",
    duration: "15-20 Hours",
    image: "/projects_illustration.webp",
    requiredChapters: ["p6-2-dashboard", "p6-3-ecommerce", "p7-1-interview", "p7-3-github"],
    requiredChapterTitles: ["Dashboard UI", "Ecommerce Layout", "Interview Prep", "Github Actions"]
  }
];

export default function ProjectsClient() {
  const router = useRouter();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nextsem_target_project");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setSelectedProjectId(parsed.id);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handleSelectProject = (project: ProjectItem) => {
    if (typeof window !== "undefined") {
      if (selectedProjectId === project.id) {
        // Deselect
        localStorage.removeItem("nextsem_target_project");
        setSelectedProjectId(null);
      } else {
        localStorage.setItem("nextsem_target_project", JSON.stringify(project));
        setSelectedProjectId(project.id);
        router.push("/course");
      }
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#39FF14] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white select-none pb-24 relative overflow-x-hidden animate-in fade-in duration-300">
      {/* Ambient backgrounds */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Header */}
      <div className="h-16 border-b border-slate-850/50 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-4 md:px-8">
        <Link 
          href="/course" 
          className="flex items-center gap-2 text-slate-400 hover:text-white font-black text-xs uppercase tracking-wider transition-all"
        >
          <ArrowLeft size={16} />
          <span>Curriculum</span>
        </Link>
        <span className="text-xs font-black uppercase tracking-widest text-[#39FF14]">Project Suggestions</span>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-4 py-8 relative z-10 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/25 text-[#39FF14] text-[9px] font-black uppercase tracking-widest rounded-full">
            Target-Driven Learning
          </span>
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white leading-tight">
            Choose Your Target Project
          </h1>
          <p className="text-xs text-slate-400 font-bold leading-relaxed">
            Select one of the real-world projects below. Once chosen, the curriculum path will highlight and track the exact lessons you need to master to build it!
          </p>
        </div>

        <AdSenseBanner />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => {
            const isSelected = selectedProjectId === project.id;
            
            return (
              <React.Fragment key={project.id}>
                {index === 2 && (
                  <div className="md:col-span-2 py-2">
                    <AdSenseBanner />
                  </div>
                )}
                <div 
                  className={`group rounded-3xl overflow-hidden border transition-all duration-350 flex flex-col justify-between ${
                    isSelected 
                      ? "border-emerald-500 bg-[#071911]/80 shadow-[0_0_20px_rgba(16,185,129,0.15)]" 
                      : "border-slate-850 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60 shadow-xl"
                  }`}
                >
                <div>
                  {/* Visual header */}
                  <div className="h-40 w-full relative bg-slate-950 overflow-hidden flex items-center justify-center p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "/projects_illustration.webp";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    <span className="absolute top-4 left-4 px-2.5 py-0.5 rounded-full bg-slate-950/80 border border-slate-800 text-[8px] font-black uppercase tracking-widest text-slate-400">
                      {project.phase}
                    </span>
                  </div>

                  {/* Body details */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-sm md:text-base font-black text-white uppercase tracking-tight group-hover:text-emerald-450 transition-colors">
                        {project.title}
                      </h3>
                      {isSelected && (
                        <span className="flex items-center gap-1 text-[8px] font-black uppercase tracking-wider text-[#39FF14] bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full shrink-0">
                          <Check size={8} /> Active Goal
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 font-bold leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 text-[8px] font-black uppercase tracking-wider text-slate-400">
                      <div className="flex items-center gap-1 px-2.5 py-1 bg-slate-950/40 border border-slate-850 rounded-lg">
                        <Clock size={10} className="text-sky-400" />
                        <span>{project.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 px-2.5 py-1 bg-slate-950/40 border border-slate-850 rounded-lg">
                        <BarChart2 size={10} className="text-amber-400" />
                        <span>{project.difficulty}</span>
                      </div>
                    </div>

                    {/* Required Chapters List */}
                    <div className="space-y-2 pt-2 border-t border-slate-850/60">
                      <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                        <BookOpen size={10} />
                        <span>Required Curriculum Track:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.requiredChapterTitles.map((title, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-0.5 bg-slate-950/80 border border-slate-850 rounded-md text-[9px] font-bold text-slate-350"
                          >
                            {title}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleSelectProject(project)}
                    className={`w-full py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all cursor-pointer ${
                      isSelected 
                        ? "bg-slate-950 border border-emerald-500/40 hover:border-emerald-500 text-emerald-450 hover:text-white" 
                        : "bg-[#39FF14] hover:bg-[#32e011] text-black hover:shadow-lg hover:shadow-emerald-500/10"
                    }`}
                  >
                    {isSelected ? "Deselect Target" : "Select as Target Goal"}
                  </button>
                </div>
              </div>
            </React.Fragment>
            );
          })}
        </div>

        <AdSenseBanner />

      </div>
    </div>
  );
}
