"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Users, 
  UserCheck, 
  UserPlus, 
  Sparkles, 
  Search, 
  CheckCircle2, 
  GitBranch, 
  ExternalLink, 
  Flame, 
  Award, 
  Clock, 
  ShieldCheck,
  ChevronRight,
  Filter
} from "lucide-react";
import { collection, onSnapshot, query, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useStudentProgress } from "@/context/StudentProgressContext";
import { getUserInitials, getAvatarGradient, formatTimeAgo } from "@/data/bcaStoriesData";

export interface PeerStudent {
  id: string;
  name: string;
  handle: string;
  email?: string;
  avatar: string | null;
  role: "Mentor" | "Lead Developer" | "Student" | "BCA Peer";
  isVerified?: boolean;
  activeDay: number;
  completedCount: number;
  followersCount: number;
  followingCount: number;
  lastActive: string;
  lastActiveTs: number;
  githubUrl?: string;
  githubPagesUrl?: string;
  recentMilestone: string;
  track: string;
}

export function getGitHubPagesUrl(githubUrl?: string, email?: string): string | undefined {
  if (email === "nextsem.academy@gmail.com") {
    return "https://nextsemacademy-max.github.io/bca-practical/";
  }
  if (!githubUrl) return undefined;
  if (githubUrl.includes(".github.io")) return githubUrl;
  if (githubUrl.includes("nextsemacademy-max")) {
    return "https://nextsemacademy-max.github.io/bca-practical/";
  }
  const match = githubUrl.match(/github\.com\/([a-zA-Z0-9_-]+)(?:\/([a-zA-Z0-9_.-]+))?/);
  if (match) {
    const owner = match[1];
    const repo = match[2]?.replace(/\.git$/, "") || "bca-practical";
    if (owner === "github" || owner === "your-username" || owner === "username") return undefined;
    return `https://${owner}.github.io/${repo}/`;
  }
  return undefined;
}

// Initial registered peer seed network (Curriculum Author & Peer Study Community)
const SEED_PEERS: PeerStudent[] = [
  {
    id: "manoj-lead",
    name: "Er. Manoj Kumar",
    handle: "manoj_dev",
    email: "nextsem.academy@gmail.com",
    avatar: "/nextsem-emblem.png",
    role: "Lead Developer",
    isVerified: true,
    activeDay: 6,
    completedCount: 6,
    followersCount: 1420,
    followingCount: 38,
    lastActive: "Active now",
    lastActiveTs: Date.now() - 1000 * 60 * 5,
    githubUrl: "https://github.com/nextsemacademy-max/bca-practical",
    githubPagesUrl: "https://nextsemacademy-max.github.io/bca-practical/",
    recentMilestone: "Pushed Day 6: HTML Semantic Elements & college-portal.html",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-pankaj",
    name: "Pankaj Sharma",
    handle: "pankaj_codes",
    avatar: "https://images.unsplash.com/photo-1618835962148-cf177563c6c0?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 6,
    completedCount: 6,
    followersCount: 342,
    followingCount: 65,
    lastActive: "Active 15m ago",
    lastActiveTs: Date.now() - 1000 * 60 * 15,
    githubUrl: "https://github.com/manoj-dev/bca-practical",
    githubPagesUrl: "https://manoj-dev.github.io/bca-practical/",
    recentMilestone: "Building Day 6: college-portal.html in VS Code",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-gauri",
    name: "Gauri Patel",
    handle: "gauri_web",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 5,
    completedCount: 5,
    followersCount: 418,
    followingCount: 112,
    lastActive: "Active 45m ago",
    lastActiveTs: Date.now() - 1000 * 60 * 45,
    githubUrl: "https://github.com/gauri-web/bca-practical",
    githubPagesUrl: "https://gauri-web.github.io/bca-practical/",
    recentMilestone: "Passed Day 5: HTML Forms & Native Validation",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-uday",
    name: "Uday Verma",
    handle: "uday_v",
    avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 5,
    completedCount: 5,
    followersCount: 230,
    followingCount: 45,
    lastActive: "Active 1h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 60,
    githubUrl: "https://github.com/uday-v/bca-practical",
    githubPagesUrl: "https://uday-v.github.io/bca-practical/",
    recentMilestone: "Verified Day 5: job-apply.html Form Inputs",
    track: "Software Systems"
  },
  {
    id: "peer-dinesh",
    name: "Dinesh Reddy",
    handle: "dinesh_dev",
    avatar: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 4,
    completedCount: 4,
    followersCount: 325,
    followingCount: 88,
    lastActive: "Active 2h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 120,
    githubUrl: "https://github.com/dinesh-dev/bca-practical",
    githubPagesUrl: "https://dinesh-dev.github.io/bca-practical/",
    recentMilestone: "Pushed Day 4: BCA Semester Syllabus Matrix Table",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-kamal",
    name: "Kamal Singh",
    handle: "kamal_bca",
    avatar: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 4,
    completedCount: 4,
    followersCount: 189,
    followingCount: 52,
    lastActive: "Active 2h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 140,
    githubUrl: "https://github.com/kamal-bca/bca-practical",
    githubPagesUrl: "https://kamal-bca.github.io/bca-practical/",
    recentMilestone: "Completed Day 4: Structured Lists & Course Timetable",
    track: "Data & AI"
  },
  {
    id: "peer-ananya",
    name: "Ananya Roy",
    handle: "ananya_r",
    avatar: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 3,
    completedCount: 3,
    followersCount: 245,
    followingCount: 71,
    lastActive: "Active 3h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 180,
    githubUrl: "https://github.com/ananya-r/bca-practical",
    githubPagesUrl: "https://ananya-r.github.io/bca-practical/",
    recentMilestone: "Completed Day 3: Hyperlinks & Anchor rel Attributes",
    track: "Cloud & Networks"
  },
  {
    id: "peer-rohit",
    name: "Rohit Gupta",
    handle: "rohit_dev",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 6,
    completedCount: 6,
    followersCount: 310,
    followingCount: 45,
    lastActive: "Active 20m ago",
    lastActiveTs: Date.now() - 1000 * 60 * 20,
    githubUrl: "https://github.com/rohit-dev/bca-practical",
    githubPagesUrl: "https://rohit-dev.github.io/bca-practical/",
    recentMilestone: "Pushed Day 6: HTML Semantic Layout & Header Nav",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-pooja",
    name: "Pooja Nair",
    handle: "pooja_codes",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 5,
    completedCount: 5,
    followersCount: 425,
    followingCount: 92,
    lastActive: "Active 35m ago",
    lastActiveTs: Date.now() - 1000 * 60 * 35,
    githubUrl: "https://github.com/pooja-codes/bca-practical",
    githubPagesUrl: "https://pooja-codes.github.io/bca-practical/",
    recentMilestone: "Submitted Day 5 Form Accessibility Check",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-ayush",
    name: "Ayush Tiwari",
    handle: "ayush_t",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 5,
    completedCount: 5,
    followersCount: 215,
    followingCount: 58,
    lastActive: "Active 45m ago",
    lastActiveTs: Date.now() - 1000 * 60 * 45,
    githubUrl: "https://github.com/ayush-t/bca-practical",
    githubPagesUrl: "https://ayush-t.github.io/bca-practical/",
    recentMilestone: "Configured Git Push & VS Code Workspaces",
    track: "Software Systems"
  },
  {
    id: "peer-neha",
    name: "Neha Saxena",
    handle: "neha_s",
    avatar: "https://images.unsplash.com/photo-1610088441520-43522567219b?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 4,
    completedCount: 4,
    followersCount: 380,
    followingCount: 84,
    lastActive: "Active 1h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 60,
    githubUrl: "https://github.com/neha-s/bca-practical",
    githubPagesUrl: "https://neha-s.github.io/bca-practical/",
    recentMilestone: "Built Timetable Table with Rowspan and Colspan",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-varun",
    name: "Varun Mehta",
    handle: "varun_bca",
    avatar: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 6,
    completedCount: 6,
    followersCount: 295,
    followingCount: 61,
    lastActive: "Active 1h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 75,
    githubUrl: "https://github.com/varun-bca/bca-practical",
    githubPagesUrl: "https://varun-bca.github.io/bca-practical/",
    recentMilestone: "Pushed Semantic Section & Aside Architecture",
    track: "Cloud & Networks"
  },
  {
    id: "peer-riya",
    name: "Riya Sen",
    handle: "riya_dev",
    avatar: "https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 3,
    completedCount: 3,
    followersCount: 190,
    followingCount: 42,
    lastActive: "Active 2h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 110,
    githubUrl: "https://github.com/riya-dev/bca-practical",
    githubPagesUrl: "https://riya-dev.github.io/bca-practical/",
    recentMilestone: "Practicing Hyperlinks and Anchor rel Attributes",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-ankit",
    name: "Ankit Choudhary",
    handle: "ankit_c",
    avatar: "https://images.unsplash.com/photo-1541823709867-1b206113eafd?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 4,
    completedCount: 4,
    followersCount: 275,
    followingCount: 73,
    lastActive: "Active 2h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 130,
    githubUrl: "https://github.com/ankit-c/bca-practical",
    githubPagesUrl: "https://ankit-c.github.io/bca-practical/",
    recentMilestone: "Resolved Day 4 Nested Ordered & Unordered Lists",
    track: "Software Systems"
  },
  {
    id: "peer-simran",
    name: "Simran Kaur",
    handle: "simran_k",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 5,
    completedCount: 5,
    followersCount: 360,
    followingCount: 95,
    lastActive: "Active 2h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 150,
    githubUrl: "https://github.com/simran-k/bca-practical",
    githubPagesUrl: "https://simran-k.github.io/bca-practical/",
    recentMilestone: "Validated Radio Buttons & Dropdown Selects",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-harish",
    name: "Harish Joshi",
    handle: "harish_j",
    avatar: "https://images.unsplash.com/photo-1618835962148-cf177563c6c0?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 2,
    completedCount: 2,
    followersCount: 140,
    followingCount: 38,
    lastActive: "Active 3h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 170,
    githubUrl: "https://github.com/harish-j/bca-practical",
    githubPagesUrl: "https://harish-j.github.io/bca-practical/",
    recentMilestone: "Passed Day 2 Headings & Text Formatting Viva",
    track: "Data & AI"
  },
  {
    id: "peer-tanya",
    name: "Tanya Mishra",
    handle: "tanya_m",
    avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 6,
    completedCount: 6,
    followersCount: 410,
    followingCount: 105,
    lastActive: "Active 3h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 190,
    githubUrl: "https://github.com/tanya-m/bca-practical",
    githubPagesUrl: "https://tanya-m.github.io/bca-practical/",
    recentMilestone: "Completed Day 6 Assignment: college-portal.html",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-saurabh",
    name: "Saurabh Deshmukh",
    handle: "saurabh_d",
    avatar: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 3,
    completedCount: 3,
    followersCount: 185,
    followingCount: 49,
    lastActive: "Active 4h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 230,
    githubUrl: "https://github.com/saurabh-d/bca-practical",
    githubPagesUrl: "https://saurabh-d.github.io/bca-practical/",
    recentMilestone: "Fixed Broken Image Paths with Relative URLs",
    track: "Software Systems"
  },
  {
    id: "peer-megha",
    name: "Megha Iyer",
    handle: "megha_i",
    avatar: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 5,
    completedCount: 5,
    followersCount: 330,
    followingCount: 78,
    lastActive: "Active 4h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 250,
    githubUrl: "https://github.com/megha-i/bca-practical",
    githubPagesUrl: "https://megha-i.github.io/bca-practical/",
    recentMilestone: "Implemented Native HTML5 Password & Email Validations",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-aditya",
    name: "Aditya Kulkarni",
    handle: "aditya_k",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 6,
    completedCount: 6,
    followersCount: 375,
    followingCount: 89,
    lastActive: "Active 5h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 290,
    githubUrl: "https://github.com/aditya-k/bca-practical",
    githubPagesUrl: "https://aditya-k.github.io/bca-practical/",
    recentMilestone: "Optimized Semantic HTML5 Nav and Footer Tags",
    track: "Cloud & Networks"
  },
  {
    id: "peer-kavita",
    name: "Kavita Yadav",
    handle: "kavita_y",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 4,
    completedCount: 4,
    followersCount: 260,
    followingCount: 64,
    lastActive: "Active 5h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 310,
    githubUrl: "https://github.com/kavita-y/bca-practical",
    githubPagesUrl: "https://kavita-y.github.io/bca-practical/",
    recentMilestone: "Crafted BCS-011 Semester Timetable Matrix",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-deepak",
    name: "Deepak Chauhan",
    handle: "deepak_c",
    avatar: "https://images.unsplash.com/photo-1610088441520-43522567219b?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 2,
    completedCount: 2,
    followersCount: 155,
    followingCount: 41,
    lastActive: "Active 6h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 350,
    githubUrl: "https://github.com/deepak-c/bca-practical",
    githubPagesUrl: "https://deepak-c.github.io/bca-practical/",
    recentMilestone: "Practicing HTML Boilerplate in VS Code",
    track: "Data & AI"
  },
  {
    id: "peer-swati",
    name: "Swati Bhatt",
    handle: "swati_b",
    avatar: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 6,
    completedCount: 6,
    followersCount: 390,
    followingCount: 97,
    lastActive: "Active 6h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 380,
    githubUrl: "https://github.com/swati-b/bca-practical",
    githubPagesUrl: "https://swati-b.github.io/bca-practical/",
    recentMilestone: "Pushed Day 6 Semantic Article Cards to GitHub",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-manish",
    name: "Manish Dubey",
    handle: "manish_d",
    avatar: "https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 5,
    completedCount: 5,
    followersCount: 240,
    followingCount: 56,
    lastActive: "Active 7h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 410,
    githubUrl: "https://github.com/manish-d/bca-practical",
    githubPagesUrl: "https://manish-d.github.io/bca-practical/",
    recentMilestone: "Completed Day 5 Bug Hunt: Missing Submit Button",
    track: "Software Systems"
  },
  {
    id: "peer-praveen",
    name: "Praveen Rao",
    handle: "praveen_r",
    avatar: "https://images.unsplash.com/photo-1541823709867-1b206113eafd?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 3,
    completedCount: 3,
    followersCount: 175,
    followingCount: 48,
    lastActive: "Active 7h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 430,
    githubUrl: "https://github.com/praveen-r/bca-practical",
    githubPagesUrl: "https://praveen-r.github.io/bca-practical/",
    recentMilestone: "Linked Multi-Page Navigation with Target Blank",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-shweta",
    name: "Shweta Kapoor",
    handle: "shweta_k",
    avatar: "https://images.unsplash.com/photo-1618835962148-cf177563c6c0?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 6,
    completedCount: 6,
    followersCount: 445,
    followingCount: 118,
    lastActive: "Active 8h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 480,
    githubUrl: "https://github.com/shweta-k/bca-practical",
    githubPagesUrl: "https://shweta-k.github.io/bca-practical/",
    recentMilestone: "Completed Day 6 Viva Check on Semantic Elements",
    track: "Cloud & Networks"
  },
  {
    id: "peer-abhishek",
    name: "Abhishek Jha",
    handle: "abhishek_j",
    avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 4,
    completedCount: 4,
    followersCount: 220,
    followingCount: 53,
    lastActive: "Active 8h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 500,
    githubUrl: "https://github.com/abhishek-j/bca-practical",
    githubPagesUrl: "https://abhishek-j.github.io/bca-practical/",
    recentMilestone: "Mastered Table Headers, Tbody, and Border Styling",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-nandini",
    name: "Nandini Bose",
    handle: "nandini_b",
    avatar: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 5,
    completedCount: 5,
    followersCount: 315,
    followingCount: 76,
    lastActive: "Active 9h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 540,
    githubUrl: "https://github.com/nandini-b/bca-practical",
    githubPagesUrl: "https://nandini-b.github.io/bca-practical/",
    recentMilestone: "Designed Student Registration Form with Fieldset",
    track: "Software Systems"
  },
  {
    id: "peer-karan",
    name: "Karan Malviya",
    handle: "karan_m",
    avatar: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 3,
    completedCount: 3,
    followersCount: 165,
    followingCount: 44,
    lastActive: "Active 9h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 560,
    githubUrl: "https://github.com/karan-m/bca-practical",
    githubPagesUrl: "https://karan-m.github.io/bca-practical/",
    recentMilestone: "Optimized SVG Icons & WebP Image Assets",
    track: "Data & AI"
  },
  {
    id: "peer-divya",
    name: "Divya Pillai",
    handle: "divya_p",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 6,
    completedCount: 6,
    followersCount: 385,
    followingCount: 91,
    lastActive: "Active 10h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 600,
    githubUrl: "https://github.com/divya-p/bca-practical",
    githubPagesUrl: "https://divya-p.github.io/bca-practical/",
    recentMilestone: "Constructed Semantic FAQ Section with Details & Summary",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-rakesh",
    name: "Rakesh Nambiar",
    handle: "rakesh_n",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 4,
    completedCount: 4,
    followersCount: 205,
    followingCount: 51,
    lastActive: "Active 11h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 660,
    githubUrl: "https://github.com/rakesh-n/bca-practical",
    githubPagesUrl: "https://rakesh-n.github.io/bca-practical/",
    recentMilestone: "Passed Technical Viva Check for HTML Tables",
    track: "Cloud & Networks"
  },
  {
    id: "peer-archana",
    name: "Archana Pandey",
    handle: "archana_p",
    avatar: "https://images.unsplash.com/photo-1610088441520-43522567219b?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 2,
    completedCount: 2,
    followersCount: 135,
    followingCount: 39,
    lastActive: "Active 11h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 680,
    githubUrl: "https://github.com/archana-p/bca-practical",
    githubPagesUrl: "https://archana-p.github.io/bca-practical/",
    recentMilestone: "Configured VS Code Live Server Extension",
    track: "Software Systems"
  },
  {
    id: "peer-vikas",
    name: "Vikas Kashyap",
    handle: "vikas_k",
    avatar: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 5,
    completedCount: 5,
    followersCount: 270,
    followingCount: 68,
    lastActive: "Active 12h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 720,
    githubUrl: "https://github.com/vikas-k/bca-practical",
    githubPagesUrl: "https://vikas-k.github.io/bca-practical/",
    recentMilestone: "Submitted GitHub Repo with Form Action & Method",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-monika",
    name: "Monika Rawat",
    handle: "monika_r",
    avatar: "https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 6,
    completedCount: 6,
    followersCount: 405,
    followingCount: 102,
    lastActive: "Active 13h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 780,
    githubUrl: "https://github.com/monika-r/bca-practical",
    githubPagesUrl: "https://monika-r.github.io/bca-practical/",
    recentMilestone: "Architected Responsive Semantic News Grid",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-suraj",
    name: "Suraj Solanki",
    handle: "suraj_s",
    avatar: "https://images.unsplash.com/photo-1541823709867-1b206113eafd?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 3,
    completedCount: 3,
    followersCount: 195,
    followingCount: 47,
    lastActive: "Active 14h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 840,
    githubUrl: "https://github.com/suraj-s/bca-practical",
    githubPagesUrl: "https://suraj-s.github.io/bca-practical/",
    recentMilestone: "Configured Bookmark Links with ID Anchors",
    track: "Data & AI"
  },
  {
    id: "peer-preeti",
    name: "Preeti Agarwal",
    handle: "preeti_a",
    avatar: "https://images.unsplash.com/photo-1618835962148-cf177563c6c0?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 5,
    completedCount: 5,
    followersCount: 340,
    followingCount: 82,
    lastActive: "Active 15h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 900,
    githubUrl: "https://github.com/preeti-a/bca-practical",
    githubPagesUrl: "https://preeti-a.github.io/bca-practical/",
    recentMilestone: "Pushed HTML5 Range & Color Pickers",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-tarun",
    name: "Tarun Batra",
    handle: "tarun_b",
    avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 4,
    completedCount: 4,
    followersCount: 235,
    followingCount: 59,
    lastActive: "Active 16h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 960,
    githubUrl: "https://github.com/tarun-b/bca-practical",
    githubPagesUrl: "https://tarun-b.github.io/bca-practical/",
    recentMilestone: "Resolved Missing Closing Tags in Table Bug Hunt",
    track: "Software Systems"
  },
  {
    id: "peer-isha",
    name: "Isha Mukherjee",
    handle: "isha_m",
    avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 6,
    completedCount: 6,
    followersCount: 430,
    followingCount: 110,
    lastActive: "Active 17h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 1020,
    githubUrl: "https://github.com/isha-m/bca-practical",
    githubPagesUrl: "https://isha-m.github.io/bca-practical/",
    recentMilestone: "Structured College Portal with Accessible Landmarks",
    track: "Cloud & Networks"
  },
  {
    id: "peer-gaurav",
    name: "Gaurav Pandey",
    handle: "gaurav_p",
    avatar: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 2,
    completedCount: 2,
    followersCount: 150,
    followingCount: 36,
    lastActive: "Active 18h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 1080,
    githubUrl: "https://github.com/gaurav-p/bca-practical",
    githubPagesUrl: "https://gaurav-p.github.io/bca-practical/",
    recentMilestone: "Mastered Strong, Em, and Code Formatting Tags",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-pallavi",
    name: "Pallavi Goswami",
    handle: "pallavi_g",
    avatar: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 5,
    completedCount: 5,
    followersCount: 320,
    followingCount: 79,
    lastActive: "Active 19h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 1140,
    githubUrl: "https://github.com/pallavi-g/bca-practical",
    githubPagesUrl: "https://pallavi-g.github.io/bca-practical/",
    recentMilestone: "Added Pattern Regex Attributes to Phone Input",
    track: "Software Systems"
  },
  {
    id: "peer-nitin",
    name: "Nitin Bisht",
    handle: "nitin_b",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 3,
    completedCount: 3,
    followersCount: 180,
    followingCount: 46,
    lastActive: "Active 20h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 1200,
    githubUrl: "https://github.com/nitin-b/bca-practical",
    githubPagesUrl: "https://nitin-b.github.io/bca-practical/",
    recentMilestone: "Generated Student Photo Gallery with Figcaption",
    track: "Data & AI"
  },
  {
    id: "peer-sanya",
    name: "Sanya Chawla",
    handle: "sanya_c",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 6,
    completedCount: 6,
    followersCount: 395,
    followingCount: 98,
    lastActive: "Active 21h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 1260,
    githubUrl: "https://github.com/sanya-c/bca-practical",
    githubPagesUrl: "https://sanya-c.github.io/bca-practical/",
    recentMilestone: "Integrated Clean Semantic Aside Navigation",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-rohan",
    name: "Rohan Bhattacharya",
    handle: "rohan_b",
    avatar: "https://images.unsplash.com/photo-1610088441520-43522567219b?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 4,
    completedCount: 4,
    followersCount: 250,
    followingCount: 63,
    lastActive: "Active 22h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 1320,
    githubUrl: "https://github.com/rohan-b/bca-practical",
    githubPagesUrl: "https://rohan-b.github.io/bca-practical/",
    recentMilestone: "Designed Course Credit Table with Footers",
    track: "Software Systems"
  },
  {
    id: "peer-komal-t",
    name: "Komal Thakur",
    handle: "komal_t",
    avatar: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 5,
    completedCount: 5,
    followersCount: 355,
    followingCount: 87,
    lastActive: "Active 23h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 1380,
    githubUrl: "https://github.com/komal-t/bca-practical",
    githubPagesUrl: "https://komal-t.github.io/bca-practical/",
    recentMilestone: "Passed Day 5 Technical Viva Check on Forms",
    track: "Cloud & Networks"
  },
  {
    id: "peer-mayank",
    name: "Mayank Negi",
    handle: "mayank_n",
    avatar: "https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 2,
    completedCount: 2,
    followersCount: 145,
    followingCount: 37,
    lastActive: "Active yesterday",
    lastActiveTs: Date.now() - 1000 * 60 * 1440,
    githubUrl: "https://github.com/mayank-n/bca-practical",
    githubPagesUrl: "https://mayank-n.github.io/bca-practical/",
    recentMilestone: "Initialized First Git Repository for Day 2",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-geeta",
    name: "Geeta Menon",
    handle: "geeta_m",
    avatar: "https://images.unsplash.com/photo-1541823709867-1b206113eafd?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 6,
    completedCount: 6,
    followersCount: 415,
    followingCount: 104,
    lastActive: "Active yesterday",
    lastActiveTs: Date.now() - 1000 * 60 * 1500,
    githubUrl: "https://github.com/geeta-m/bca-practical",
    githubPagesUrl: "https://geeta-m.github.io/bca-practical/",
    recentMilestone: "Styled college-portal.html with Modern Semantic Tags",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-sumit",
    name: "Sumit Saxena",
    handle: "sumit_s",
    avatar: "https://images.unsplash.com/photo-1618835962148-cf177563c6c0?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 3,
    completedCount: 3,
    followersCount: 190,
    followingCount: 50,
    lastActive: "Active yesterday",
    lastActiveTs: Date.now() - 1000 * 60 * 1560,
    githubUrl: "https://github.com/sumit-s/bca-practical",
    githubPagesUrl: "https://sumit-s.github.io/bca-practical/",
    recentMilestone: "Fixed Case Sensitivity Bug in Relative Links",
    track: "Data & AI"
  },
  {
    id: "peer-bhavna",
    name: "Bhavna Saini",
    handle: "bhavna_s",
    avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 5,
    completedCount: 5,
    followersCount: 335,
    followingCount: 81,
    lastActive: "Active yesterday",
    lastActiveTs: Date.now() - 1000 * 60 * 1620,
    githubUrl: "https://github.com/bhavna-s/bca-practical",
    githubPagesUrl: "https://bhavna-s.github.io/bca-practical/",
    recentMilestone: "Validated Required Attributes on Student Form",
    track: "Software Systems"
  },
  {
    id: "peer-mohit",
    name: "Mohit Rathi",
    handle: "mohit_r",
    avatar: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 4,
    completedCount: 4,
    followersCount: 225,
    followingCount: 57,
    lastActive: "Active 2d ago",
    lastActiveTs: Date.now() - 1000 * 60 * 2880,
    githubUrl: "https://github.com/mohit-r/bca-practical",
    githubPagesUrl: "https://mohit-r.github.io/bca-practical/",
    recentMilestone: "Completed HTML List Styling & Description Lists",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-tanvi",
    name: "Tanvi Mahajan",
    handle: "tanvi_m",
    avatar: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 6,
    completedCount: 6,
    followersCount: 390,
    followingCount: 96,
    lastActive: "Active 2d ago",
    lastActiveTs: Date.now() - 1000 * 60 * 2940,
    githubUrl: "https://github.com/tanvi-m/bca-practical",
    githubPagesUrl: "https://tanvi-m.github.io/bca-practical/",
    recentMilestone: "Organized Multi-Section BCA Academic Portal",
    track: "Cloud & Networks"
  },
  {
    id: "peer-ashish",
    name: "Ashish Gautam",
    handle: "ashish_g",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 3,
    completedCount: 3,
    followersCount: 170,
    followingCount: 43,
    lastActive: "Active 2d ago",
    lastActiveTs: Date.now() - 1000 * 60 * 3000,
    githubUrl: "https://github.com/ashish-g/bca-practical",
    githubPagesUrl: "https://ashish-g.github.io/bca-practical/",
    recentMilestone: "Implemented Downloadable Syllabus PDF Anchor",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-shalini",
    name: "Shalini Das",
    handle: "shalini_d",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 5,
    completedCount: 5,
    followersCount: 350,
    followingCount: 85,
    lastActive: "Active 2d ago",
    lastActiveTs: Date.now() - 1000 * 60 * 3060,
    githubUrl: "https://github.com/shalini-d/bca-practical",
    githubPagesUrl: "https://shalini-d.github.io/bca-practical/",
    recentMilestone: "Pushed Verified job-apply.html to GitHub",
    track: "Software Systems"
  },
  {
    id: "peer-hemant",
    name: "Hemant Upadhyay",
    handle: "hemant_u",
    avatar: "https://images.unsplash.com/photo-1610088441520-43522567219b?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 2,
    completedCount: 2,
    followersCount: 160,
    followingCount: 40,
    lastActive: "Active 3d ago",
    lastActiveTs: Date.now() - 1000 * 60 * 4320,
    githubUrl: "https://github.com/hemant-u/bca-practical",
    githubPagesUrl: "https://hemant-u.github.io/bca-practical/",
    recentMilestone: "Passed HTML Doctype & Head Metadata Viva",
    track: "Data & AI"
  },
  {
    id: "peer-aarti",
    name: "Aarti Tripathi",
    handle: "aarti_t",
    avatar: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 6,
    completedCount: 6,
    followersCount: 420,
    followingCount: 108,
    lastActive: "Active 3d ago",
    lastActiveTs: Date.now() - 1000 * 60 * 4380,
    githubUrl: "https://github.com/aarti-t/bca-practical",
    githubPagesUrl: "https://aarti-t.github.io/bca-practical/",
    recentMilestone: "Pushed Semantic Layout with Modern Main Section",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-yash",
    name: "Yashwardhan Singhania",
    handle: "yash_s",
    avatar: "https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 4,
    completedCount: 4,
    followersCount: 265,
    followingCount: 66,
    lastActive: "Active 3d ago",
    lastActiveTs: Date.now() - 1000 * 60 * 4440,
    githubUrl: "https://github.com/yash-s/bca-practical",
    githubPagesUrl: "https://yash-s.github.io/bca-practical/",
    recentMilestone: "Constructed Laboratory Experiment Schedule Table",
    track: "Software Systems"
  },
  {
    id: "peer-kirti",
    name: "Kirti Goyal",
    handle: "kirti_g",
    avatar: "https://images.unsplash.com/photo-1541823709867-1b206113eafd?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 5,
    completedCount: 5,
    followersCount: 365,
    followingCount: 90,
    lastActive: "Active 3d ago",
    lastActiveTs: Date.now() - 1000 * 60 * 4500,
    githubUrl: "https://github.com/kirti-g/bca-practical",
    githubPagesUrl: "https://kirti-g.github.io/bca-practical/",
    recentMilestone: "Handled Textarea Character Limits and Placeholders",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-lokesh",
    name: "Lokesh Chandra",
    handle: "lokesh_c",
    avatar: "https://images.unsplash.com/photo-1618835962148-cf177563c6c0?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 6,
    completedCount: 6,
    followersCount: 380,
    followingCount: 94,
    lastActive: "Active 4d ago",
    lastActiveTs: Date.now() - 1000 * 60 * 5760,
    githubUrl: "https://github.com/lokesh-c/bca-practical",
    githubPagesUrl: "https://lokesh-c.github.io/bca-practical/",
    recentMilestone: "Verified GitHub Commit History for Day 6",
    track: "Cloud & Networks"
  }
];

export function StudentPeerNetwork() {
  const { user } = useStudentProgress();
  const [peers, setPeers] = useState<PeerStudent[]>(SEED_PEERS);
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"all" | "following" | "top" | "active">("all");

  // Load followed users from localStorage scoped by user email/id
  useEffect(() => {
    try {
      const scopeKey = user?.email ? `nextsem_following_${user.email}` : "nextsem_following_local";
      const saved = localStorage.getItem(scopeKey);
      if (saved) {
        setFollowingMap(JSON.parse(saved));
      } else {
        // By default, follow the lead curriculum author
        setFollowingMap({ "manoj-lead": true });
      }
    } catch (e) {
      console.warn("Could not load followed peers:", e);
    }
  }, [user]);

  // Synchronize live registered students from Firestore
  useEffect(() => {
    try {
      const q = query(collection(db, "users_progress"), limit(30));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          try {
            const firestorePeers: PeerStudent[] = [];

            snapshot.docs.forEach((docItem) => {
              const data = docItem.data();
              // Don't show current authenticated user in peer list
              if (docItem.id === user?.uid || data.email === user?.email) return;

              const completedDaysList: number[] = data.bca_practical?.completedDays || [];
              const dayCount = completedDaysList.length;
              const maxDay = completedDaysList.length > 0 ? Math.max(...completedDaysList) : 1;
              const name = data.displayName || data.email?.split("@")[0] || "BCA Student";
              const handle = name.toLowerCase().replace(/[^a-z0-9]/g, "_").slice(0, 15);
              const lastUpdatedStr = data.bca_practical?.lastUpdated || data.lastLogin;
              const lastUpdatedTs = lastUpdatedStr ? new Date(lastUpdatedStr).getTime() : Date.now() - 1000 * 60 * 30;

              // Compute stable follower seeds
              let hash = 0;
              for (let i = 0; i < (docItem.id || name).length; i++) {
                hash = (docItem.id || name).charCodeAt(i) + ((hash << 5) - hash);
              }
              const baseFollowers = 80 + Math.abs(hash % 400);
              const baseFollowing = 30 + Math.abs((hash * 3) % 150);

              firestorePeers.push({
                id: docItem.id,
                name,
                handle,
                avatar: data.photoURL || null,
                role: "Student",
                isVerified: false,
                activeDay: maxDay,
                completedCount: dayCount,
                followersCount: baseFollowers,
                followingCount: baseFollowing,
                lastActive: formatTimeAgo(lastUpdatedTs),
                lastActiveTs: lastUpdatedTs,
                githubUrl: data.email === "nextsem.academy@gmail.com"
                  ? "https://github.com/nextsemacademy-max/bca-practical"
                  : (data.bca_practical?.githubRepoUrls?.[maxDay.toString()] || (data.bca_practical?.githubUsername ? `https://github.com/${data.bca_practical.githubUsername}/bca-practical` : undefined)),
                githubPagesUrl: data.email === "nextsem.academy@gmail.com"
                  ? "https://nextsemacademy-max.github.io/bca-practical/"
                  : getGitHubPagesUrl(data.bca_practical?.githubRepoUrls?.[maxDay.toString()], data.email) || (data.bca_practical?.githubUsername ? `https://${data.bca_practical.githubUsername}.github.io/bca-practical/` : undefined),
                recentMilestone: `Completed Day ${maxDay} practical laboratory exercises`,
                track: data.bca_practical?.selectedTrack === "programming" ? "Software Systems" : data.bca_practical?.selectedTrack === "data-ai" ? "Data & AI" : "Full-Stack Web Dev"
              });
            });

            if (firestorePeers.length > 0) {
              // Sort real active peers by active day (highest first) and recent activity
              firestorePeers.sort((a, b) => (b.activeDay - a.activeDay) || (b.lastActiveTs - a.lastActiveTs));
              const existingIds = new Set(firestorePeers.map((p) => p.id));
              const nonDuplicateSeeds = SEED_PEERS.filter((s) => !existingIds.has(s.id));
              setPeers([...firestorePeers, ...nonDuplicateSeeds]);
            }
          } catch (err) {
            console.warn("Could not process firestore registered peers:", err);
          }
        },
        (error) => {
          console.warn("Firestore peers listener notice:", error);
        }
      );

      return () => unsubscribe();
    } catch (e) {
      console.warn("Error setting up peers listener:", e);
    }
  }, [user]);

  // Toggle follow/unfollow state
  const handleToggleFollow = (peerId: string) => {
    setFollowingMap((prev) => {
      const isCurrentlyFollowing = Boolean(prev[peerId]);
      const next = { ...prev, [peerId]: !isCurrentlyFollowing };

      // Persist to localStorage
      try {
        const scopeKey = user?.email ? `nextsem_following_${user.email}` : "nextsem_following_local";
        localStorage.setItem(scopeKey, JSON.stringify(next));
      } catch (e) {}

      // Update peer follower count optimistically
      setPeers((peerList) =>
        peerList.map((p) => {
          if (p.id === peerId) {
            return {
              ...p,
              followersCount: isCurrentlyFollowing
                ? Math.max(0, p.followersCount - 1)
                : p.followersCount + 1
            };
          }
          return p;
        })
      );

      return next;
    });
  };

  // Filter peers
  const filteredPeers = useMemo(() => {
    let list = [...peers];

    // Filter by Tab
    if (activeTab === "following") {
      list = list.filter((p) => Boolean(followingMap[p.id]));
    } else if (activeTab === "top") {
      list.sort((a, b) => b.completedCount - a.completedCount || b.followersCount - a.followersCount);
    } else if (activeTab === "active") {
      list.sort((a, b) => b.lastActiveTs - a.lastActiveTs);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.handle.toLowerCase().includes(q) ||
          p.recentMilestone.toLowerCase().includes(q) ||
          p.track.toLowerCase().includes(q)
      );
    }

    return list;
  }, [peers, followingMap, activeTab, searchQuery]);

  const totalFollowingCount = Object.values(followingMap).filter(Boolean).length;

  return (
    <div className="rounded-3xl border-2 border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5 sm:p-7 shadow-sm space-y-6">
      {/* ── Header Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-neutral-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-600 text-white flex items-center gap-1 shadow-sm">
              <Users size={11} />
              Peer Network &amp; Coder Directory
            </span>
            <span className="text-xs font-mono font-bold text-slate-500">
              {peers.length} Registered BCA Peers
            </span>
          </div>

          <h2 className="text-lg sm:text-2xl font-black text-black dark:text-white tracking-tight">
            Follow Peers &amp; Study Buddies
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl leading-relaxed">
            Connect with fellow BCA students, view their verified GitHub practical repositories, track milestones together, and stay motivated!
          </p>
        </div>

        {/* Current User Following Metric Pill */}
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-2.5 rounded-2xl self-start sm:self-auto shrink-0">
          <div className="text-center px-2">
            <span className="block text-sm font-black text-blue-600 dark:text-blue-400">
              {totalFollowingCount}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Following
            </span>
          </div>
          <div className="h-6 w-px bg-slate-200 dark:bg-neutral-800" />
          <div className="text-center px-2">
            <span className="block text-sm font-black text-black dark:text-white">
              {peers.length}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Peers
            </span>
          </div>
        </div>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Tab Filters */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-neutral-900 p-1 rounded-xl border border-slate-200 dark:border-neutral-800 text-xs font-bold overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "all"
                ? "bg-white dark:bg-black text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
            }`}
          >
            All Peers ({peers.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("following")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              activeTab === "following"
                ? "bg-white dark:bg-black text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
            }`}
          >
            <UserCheck size={13} />
            <span>Following ({totalFollowingCount})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("top")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              activeTab === "top"
                ? "bg-white dark:bg-black text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
            }`}
          >
            <Flame size={13} className="text-amber-500" />
            <span>Top Coders</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("active")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              activeTab === "active"
                ? "bg-white dark:bg-black text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
            }`}
          >
            <Clock size={13} />
            <span>Active Today</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[220px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search peer by name or handle..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
          />
        </div>
      </div>

      {/* ── Peers Card Grid ── */}
      {filteredPeers.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-slate-200 dark:border-neutral-800 rounded-2xl p-6">
          <Users size={32} className="mx-auto text-slate-400 mb-2 opacity-60" />
          <p className="text-sm font-bold text-black dark:text-white">
            {activeTab === "following" ? "You are not following any peers yet" : "No peers match your search query"}
          </p>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {activeTab === "following"
              ? "Browse the 'All Peers' tab and click '+ Follow' to stay connected with other BCA students!"
              : "Try searching with a different keyword or view all registered peers."}
          </p>
          {activeTab === "following" && (
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className="mt-3 px-4 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-sm cursor-pointer"
            >
              Browse All Peers
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPeers.map((peer) => {
            const isFollowing = Boolean(followingMap[peer.id]);
            const initials = getUserInitials(peer.name);
            const avatarBg = getAvatarGradient(peer.name);

            return (
              <div
                key={peer.id}
                className="group rounded-2xl border border-slate-200 dark:border-neutral-800 bg-slate-50/60 dark:bg-neutral-900/60 hover:bg-white dark:hover:bg-neutral-900 p-4 transition-all duration-200 hover:shadow-md hover:border-blue-500/40 flex flex-col justify-between space-y-3 relative overflow-hidden"
              >
                {/* Top User Info Bar */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    {/* Avatar with Circular Glowing Ring */}
                    <div className="relative shrink-0">
                      <div className="p-0.5 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600">
                        {peer.avatar ? (
                          <img
                            src={peer.avatar}
                            alt={peer.name}
                            className="w-12 h-12 rounded-full object-cover bg-neutral-900 border-2 border-white dark:border-black"
                          />
                        ) : (
                          <div
                            className={`w-12 h-12 rounded-full ${avatarBg} text-white flex items-center justify-center font-black text-sm border-2 border-white dark:border-black`}
                          >
                            {initials}
                          </div>
                        )}
                      </div>
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-black" />
                    </div>

                    {/* Follow / Following Interactive Button */}
                    <button
                      type="button"
                      onClick={() => handleToggleFollow(peer.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer active:scale-95 flex items-center gap-1.5 shadow-sm ${
                        isFollowing
                          ? "bg-slate-200 hover:bg-rose-100 hover:text-rose-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-neutral-700"
                          : "bg-blue-600 hover:bg-blue-700 text-white border border-blue-600"
                      }`}
                    >
                      {isFollowing ? (
                        <>
                          <CheckCircle2 size={13} className="text-emerald-500" />
                          <span>Following</span>
                        </>
                      ) : (
                        <>
                          <UserPlus size={13} />
                          <span>Follow</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Name & Handle */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="text-sm font-black text-black dark:text-white truncate">
                        {peer.name}
                      </h4>
                      {peer.isVerified && (
                        <span title="Verified BCA Lead" className="text-blue-500 shrink-0">
                          <CheckCircle2 size={14} className="fill-blue-500 text-white" />
                        </span>
                      )}
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40 shrink-0">
                        {peer.role}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                      <span>@{peer.handle}</span>
                      <span>•</span>
                      <span className="text-[11px] font-sans">{peer.lastActive}</span>
                    </div>
                  </div>

                  {/* Recent Activity Milestone */}
                  <div className="mt-2.5 p-2.5 rounded-xl bg-white dark:bg-black/60 border border-slate-200/80 dark:border-neutral-800/80 text-[11px] space-y-1">
                    <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-extrabold uppercase tracking-wide text-[10px]">
                      <Sparkles size={11} />
                      <span>Active Milestone</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 line-clamp-2 leading-snug font-medium">
                      {peer.recentMilestone}
                    </p>
                  </div>
                </div>

                {/* Footer Metrics & GitHub Link */}
                <div className="pt-2 border-t border-slate-200/80 dark:border-neutral-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-3">
                    <span>
                      <strong className="text-black dark:text-white font-bold">{peer.followersCount}</strong> Followers
                    </span>
                    <span>
                      <strong className="text-black dark:text-white font-bold">{peer.followingCount}</strong> Following
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {peer.githubUrl && (
                      <a
                        href={peer.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                        title="View GitHub Repository"
                      >
                        <GitBranch size={11} />
                        <span>Code</span>
                      </a>
                    )}
                    {peer.githubPagesUrl && (
                      <a
                        href={peer.githubPagesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 hover:underline transition-all px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 shadow-xs"
                        title="View Live Deployed GitHub Pages"
                      >
                        <ExternalLink size={11} />
                        <span>Pages</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default StudentPeerNetwork;
