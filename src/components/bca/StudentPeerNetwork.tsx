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
  recentMilestone: string;
  track: string;
}

// Initial registered peer seed network (Curriculum Author & Peer Study Community)
const SEED_PEERS: PeerStudent[] = [
  {
    id: "manoj-lead",
    name: "Er. Manoj Kumar",
    handle: "manoj_dev",
    avatar: "/nextsem-emblem.png",
    role: "Lead Developer",
    isVerified: true,
    activeDay: 5,
    completedCount: 5,
    followersCount: 1420,
    followingCount: 38,
    lastActive: "Active now",
    lastActiveTs: Date.now() - 1000 * 60 * 5,
    githubUrl: "https://github.com/nextsemacademy-max/bca",
    recentMilestone: "Pushed Day 5: HTML Forms & Native Validation",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-rahul",
    name: "Rahul Sharma",
    handle: "rahul_codes",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 5,
    completedCount: 5,
    followersCount: 284,
    followingCount: 65,
    lastActive: "Active 15m ago",
    lastActiveTs: Date.now() - 1000 * 60 * 15,
    githubUrl: "https://github.com",
    recentMilestone: "Building Day 5: job-apply.html in VS Code",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-priya",
    name: "Priya Patel",
    handle: "priya_web",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 4,
    completedCount: 4,
    followersCount: 395,
    followingCount: 112,
    lastActive: "Active 1h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 60,
    githubUrl: "https://github.com",
    recentMilestone: "Passed Day 4: Structured Lists & Course Timetable",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-amit",
    name: "Amit Verma",
    handle: "amit_v",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 4,
    completedCount: 4,
    followersCount: 198,
    followingCount: 45,
    lastActive: "Active 2h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 120,
    githubUrl: "https://github.com",
    recentMilestone: "Verified Day 4: BCA Semester Syllabus Matrix",
    track: "Software Systems"
  },
  {
    id: "peer-sneha",
    name: "Sneha Reddy",
    handle: "sneha_dev",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 3,
    completedCount: 3,
    followersCount: 312,
    followingCount: 88,
    lastActive: "Active 3h ago",
    lastActiveTs: Date.now() - 1000 * 60 * 180,
    githubUrl: "https://github.com",
    recentMilestone: "Pushed Day 3: Hyperlinks & Secure Anchor rel",
    track: "Full-Stack Web Dev"
  },
  {
    id: "peer-vikram",
    name: "Vikram Singh",
    handle: "vikram_bca",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 3,
    completedCount: 3,
    followersCount: 167,
    followingCount: 52,
    lastActive: "Active yesterday",
    lastActiveTs: Date.now() - 1000 * 60 * 1440,
    githubUrl: "https://github.com",
    recentMilestone: "Completed Day 3: Image Paths & Alt Accessibility",
    track: "Data & AI"
  },
  {
    id: "peer-ananya",
    name: "Ananya Roy",
    handle: "ananya_r",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    role: "Student",
    isVerified: false,
    activeDay: 2,
    completedCount: 2,
    followersCount: 224,
    followingCount: 71,
    lastActive: "Active 2d ago",
    lastActiveTs: Date.now() - 1000 * 60 * 2880,
    githubUrl: "https://github.com",
    recentMilestone: "Passed Day 2: Headings & Text Formatting Viva",
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
                githubUrl: data.bca_practical?.githubRepoUrls?.[maxDay.toString()] || (data.bca_practical?.githubUsername ? `https://github.com/${data.bca_practical.githubUsername}` : undefined),
                recentMilestone: `Completed Day ${maxDay} practical laboratory exercises`,
                track: data.bca_practical?.selectedTrack === "programming" ? "Software Systems" : data.bca_practical?.selectedTrack === "data-ai" ? "Data & AI" : "Full-Stack Web Dev"
              });
            });

            if (firestorePeers.length > 0) {
              // Combine seed peers and real firestore peers (prevent duplicates by ID)
              const existingIds = new Set(firestorePeers.map((p) => p.id));
              const nonDuplicateSeeds = SEED_PEERS.filter((s) => !existingIds.has(s.id));
              setPeers([...nonDuplicateSeeds, ...firestorePeers]);
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

                  {peer.githubUrl && (
                    <a
                      href={peer.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <GitBranch size={11} />
                      <span>Code</span>
                    </a>
                  )}
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
