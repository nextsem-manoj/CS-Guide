"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Plus, Flame, ExternalLink } from "lucide-react";
import { collection, onSnapshot, query, limit, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useStudentProgress } from "@/context/StudentProgressContext";
import { 
  BcaStudentStory, 
  BcaStorySlide, 
  INITIAL_COMMUNITY_STORIES, 
  getLessonTitleByDay,
  getStoryDisplayName,
  getUserInitials,
  getAvatarGradient,
  formatTimeAgo
} from "@/data/bcaStoriesData";
import BcaStoryViewerModal from "./BcaStoryViewerModal";
import BcaStoryComposeModal from "./BcaStoryComposeModal";

export default function BcaStoriesTray() {
  const { user, completedDays, githubRepoUrls, githubUsername } = useStudentProgress();

  const userGitHubPagesUrl = user?.email === "nextsem.academy@gmail.com"
    ? "https://nextsemacademy-max.github.io/bca-practical/"
    : (githubUsername
        ? `https://${githubUsername.toLowerCase().replace(/_/g, '-')}.github.io/bca-practical/`
        : (githubRepoUrls["1"] ? `https://${githubRepoUrls["1"].replace(/https?:\/\/github\.com\//, "").split("/")[0]}.github.io/${githubRepoUrls["1"].replace(/https?:\/\/github\.com\//, "").split("/")[1] || "bca-practical"}/` : undefined));

  const [communityStories, setCommunityStories] = useState<BcaStudentStory[]>(INITIAL_COMMUNITY_STORIES);
  const [seenStoryIds, setSeenStoryIds] = useState<Record<string, boolean>>({});
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  // Load seen stories from localStorage on mount
  useEffect(() => {
    try {
      const savedSeen = localStorage.getItem("nextsem_seen_stories");
      if (savedSeen) setSeenStoryIds(JSON.parse(savedSeen));
    } catch (e) {
      console.warn("Could not load local stories cache:", e);
    }
  }, []);

  // Real-time synchronization of actual student submissions from both users_progress and bca_practical_stories
  useEffect(() => {
    let usersDocs: any[] = [];
    let storiesDocs: any[] = [];

    const processCombinedStories = () => {
      try {
        const storiesByUser: Record<string, {
          userId: string;
          userName: string;
          userAvatar: string | null;
          latestDay: number;
          lastActiveTs: number;
          slides: BcaStorySlide[];
          completedDays: number[];
          urls: Record<string, string>;
          ghUser: string;
        }> = {};

        // 1. Ingest all registered students from users_progress (authoritative source of completedDays)
        usersDocs.forEach((docItem) => {
          const uid = docItem.id;
          if (!uid || uid === user?.uid || uid === "manoj-lead" || docItem.email === user?.email) return;

          const email = (docItem.email || "").toLowerCase();
          if (!email || !email.includes("@") || email.includes("guest") || email.endsWith("@nextsem.local") || email.includes("example.com") || email.includes("fake") || email.includes("dummy")) return;

          const completedDaysList: number[] = (docItem.bca_practical?.completedDays || []).filter((d: any) => typeof d === "number" && d > 0 && d <= 90);
          const maxDay = completedDaysList.length > 0 ? Math.max(...completedDaysList) : 0;
          const name = docItem.displayName || docItem.email?.split("@")[0] || "BCA Student";
          const lastUpdatedStr = docItem.bca_practical?.lastUpdated || docItem.lastLogin;
          const lastActiveTs = lastUpdatedStr ? new Date(lastUpdatedStr).getTime() : Date.now() - 1000 * 60 * 30;

          storiesByUser[uid] = {
            userId: uid,
            userName: name,
            userAvatar: docItem.photoURL || null,
            latestDay: maxDay,
            lastActiveTs,
            slides: [],
            completedDays: completedDaysList,
            urls: docItem.bca_practical?.githubRepoUrls || {},
            ghUser: docItem.bca_practical?.githubUsername || ""
          };
        });

        // 2. Ingest all published stories/reels from bca_practical_stories
        storiesDocs.forEach((docItem) => {
          const uid = docItem.userId;
          if (!uid || uid === user?.uid || uid === "manoj-lead") return;

          const dayNum = Number(docItem.day) || 1;
          const title = docItem.lessonTitle || getLessonTitleByDay(dayNum);
          const tsNum = typeof docItem.createdAt === "number"
            ? docItem.createdAt
            : (docItem.timestamp ? new Date(docItem.timestamp).getTime() : Date.now());

          const slide: BcaStorySlide = {
            id: docItem.id || `slide-${uid}-${dayNum}`,
            day: dayNum,
            lessonTitle: title,
            category: dayNum <= 10 ? "HTML" : dayNum <= 20 ? "CSS" : "JavaScript",
            timestamp: formatTimeAgo(tsNum),
            caption: docItem.caption || `Completed Day ${dayNum}: ${title} and pushed verified code to GitHub! 🚀 Viva approved.`,
            vivaScore: "100% Viva Approved",
            githubRepoUrl: docItem.githubRepoUrl || "https://github.com",
            liveDemoUrl: docItem.liveDemoUrl,
            techTags: [dayNum <= 10 ? "HTML5" : dayNum <= 20 ? "CSS3" : "JavaScript", "VSCode", "Git"],
            gradientTheme: "from-blue-600 via-indigo-600 to-purple-800",
            createdAt: tsNum
          };

          if (!storiesByUser[uid]) {
            storiesByUser[uid] = {
              userId: uid,
              userName: docItem.userName || "BCA Student",
              userAvatar: docItem.userPhoto || null,
              latestDay: dayNum,
              lastActiveTs: tsNum,
              slides: [slide],
              completedDays: [dayNum],
              urls: {},
              ghUser: ""
            };
          } else {
            // Deduplicate slide by id or day
            const existingIdx = storiesByUser[uid].slides.findIndex((s) => s.id === slide.id || s.day === dayNum);
            if (existingIdx >= 0) {
              storiesByUser[uid].slides[existingIdx] = slide;
            } else {
              storiesByUser[uid].slides.push(slide);
            }
            if (dayNum > storiesByUser[uid].latestDay) {
              storiesByUser[uid].latestDay = dayNum;
            }
            if (tsNum > storiesByUser[uid].lastActiveTs) {
              storiesByUser[uid].lastActiveTs = tsNum;
              if (docItem.userPhoto) storiesByUser[uid].userAvatar = docItem.userPhoto;
              if (docItem.userName) storiesByUser[uid].userName = docItem.userName;
            }
          }
        });

        // 3. For any completed day in users_progress lacking an explicit story doc, synthesize a slide
        Object.values(storiesByUser).forEach((group) => {
          group.completedDays.forEach((dayNum) => {
            const hasSlide = group.slides.some((s) => s.day === dayNum);
            if (!hasSlide) {
              const title = getLessonTitleByDay(dayNum);
              const ghUrl = group.urls[dayNum.toString()] || (group.ghUser ? `https://github.com/${group.ghUser}` : "https://github.com");
              group.slides.push({
                id: `auto-slide-${group.userId}-${dayNum}`,
                day: dayNum,
                lessonTitle: title,
                category: dayNum <= 10 ? "HTML" : dayNum <= 20 ? "CSS" : "JavaScript",
                timestamp: formatTimeAgo(group.lastActiveTs),
                caption: `Completed Day ${dayNum}: ${title} and pushed verified code to GitHub! 🚀 Viva approved.`,
                vivaScore: "100% Viva Approved",
                githubRepoUrl: ghUrl,
                techTags: [dayNum <= 10 ? "HTML5" : dayNum <= 20 ? "CSS3" : "JavaScript", "VSCode", "Git"],
                gradientTheme: "from-blue-600 via-indigo-600 to-purple-800",
                createdAt: group.lastActiveTs
              });
            }
          });

          // Sort student slides in descending order (highest day first)
          group.slides.sort((a, b) => (b.day || 0) - (a.day || 0));
          // Authoritative latest day badge
          group.latestDay = Math.max(group.latestDay, ...group.slides.map((s) => s.day), 1);
        });

        // 4. Convert to BcaStudentStory array with real data
        const realStudentStories: BcaStudentStory[] = Object.values(storiesByUser).map((group) => {
          const cleanHandle = group.ghUser
            ? group.ghUser.toLowerCase().replace(/_/g, '-')
            : (group.userName.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 15) || "student");
          const ghPages = group.userId === "manoj-lead"
            ? "https://nextsemacademy-max.github.io/bca-practical/"
            : `https://${cleanHandle}.github.io/bca-practical/`;

          return {
            id: `story-${group.userId}`,
            userId: group.userId,
            userName: group.userName,
            userHandle: group.userName.toLowerCase().replace(/[^a-z0-9]/g, "_").slice(0, 15) || "student",
            userAvatar: group.userAvatar,
            isVerified: false,
            role: "Student",
            hasUnseenStories: true,
            latestDay: group.latestDay,
            lastActive: formatTimeAgo(group.lastActiveTs),
            githubPagesUrl: ghPages,
            slides: group.slides
          };
        });

        // Order real students by latestDay (descending) then by most recent activity
        realStudentStories.sort((a, b) => {
          if (b.latestDay !== a.latestDay) {
            return b.latestDay - a.latestDay;
          }
          return (b.slides[0]?.createdAt || 0) - (a.slides[0]?.createdAt || 0);
        });

        // Merge: Er. Manoj Kumar (Curriculum Author) + Actual Live Students
        setCommunityStories([...INITIAL_COMMUNITY_STORIES, ...realStudentStories]);
      } catch (err) {
        console.warn("Could not process combined community stories:", err);
      }
    };

    // Sub 1: users_progress
    const qUsers = query(collection(db, "users_progress"), limit(50));
    const unsubUsers = onSnapshot(
      qUsers,
      (snapshot) => {
        usersDocs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        processCombinedStories();
      },
      (error) => console.warn("Firestore users_progress listener warning:", error)
    );

    // Sub 2: bca_practical_stories
    const qStories = query(collection(db, "bca_practical_stories"), limit(60));
    const unsubStories = onSnapshot(
      qStories,
      (snapshot) => {
        storiesDocs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        processCombinedStories();
      },
      (error) => console.warn("Firestore stories listener warning:", error)
    );

    return () => {
      unsubUsers();
      unsubStories();
    };
  }, [user]);

  // Compute "Your Story" slides dynamically from authenticated user's real progress
  const userStory: BcaStudentStory = useMemo(() => {
    const customSavedRaw = typeof window !== "undefined" ? localStorage.getItem("nextsem_user_custom_stories") : null;
    let customSlides: BcaStorySlide[] = [];
    try {
      if (customSavedRaw) customSlides = JSON.parse(customSavedRaw);
    } catch {}

    const completedSlides: BcaStorySlide[] = completedDays
      .slice(-5) // latest 5 completed
      .reverse()
      .map((day) => {
        const ghUrl = githubRepoUrls[day.toString()] || (githubUsername ? `https://github.com/${githubUsername}/bca` : "https://github.com/my-bca-repo");
        const title = getLessonTitleByDay(day);
        return {
          id: `user-day-${day}`,
          day,
          lessonTitle: title,
          category: day <= 10 ? "HTML" : day <= 20 ? "CSS" : "JavaScript",
          timestamp: "Recently",
          caption: `Completed Day ${day}: ${title} and pushed verified code to GitHub! 🚀 Viva passed 100%.`,
          vivaScore: "100% Viva Approved",
          githubRepoUrl: ghUrl,
          techTags: [day <= 10 ? "HTML5" : day <= 20 ? "CSS3" : "JavaScript", "VSCode", "Git"],
          gradientTheme: "from-blue-600 via-indigo-600 to-purple-800",
          createdAt: Date.now()
        };
      });

    const combinedSlides = [...customSlides, ...completedSlides];
    const latestDay = combinedSlides.length > 0 ? combinedSlides[0].day : (completedDays.length > 0 ? Math.max(...completedDays) : 0);

    return {
      id: "story-current-user",
      userId: user?.uid || "current-user",
      userName: user ? user.name : "You",
      userHandle: user ? (githubUsername || user.name.toLowerCase().replace(/\s+/g, "_")) : "student",
      userAvatar: user?.photo || null,
      isCurrentUser: true,
      isVerified: !!user && !user.isGuest,
      role: "Student",
      hasUnseenStories: combinedSlides.length > 0,
      slides: combinedSlides,
      latestDay,
      lastActive: "Now",
      githubPagesUrl: userGitHubPagesUrl
    };
  }, [user, completedDays, githubRepoUrls, githubUsername]);

  // Combine userStory with verified communityStories
  const allStories = useMemo(() => {
    return [userStory, ...communityStories];
  }, [userStory, communityStories]);

  // Handle Mark Seen with useCallback and idempotency guard
  const handleMarkSeen = useCallback((storyId: string) => {
    setSeenStoryIds((prev) => {
      if (prev[storyId]) return prev;
      const updated = { ...prev, [storyId]: true };
      try {
        localStorage.setItem("nextsem_seen_stories", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  // Handle clicking "Your Story"
  const handleYourStoryClick = () => {
    if (userStory.slides.length > 0) {
      setActiveStoryIndex(0);
      setIsViewerOpen(true);
    } else {
      setIsComposeOpen(true);
    }
  };

  // Handle clicking a community story
  const handleStoryClick = (index: number) => {
    setActiveStoryIndex(index);
    setIsViewerOpen(true);
  };

  // Handle Custom Story Published from Modal
  const handleStoryPublished = async (data: { day: number; caption: string; githubUrl: string }) => {
    const title = getLessonTitleByDay(data.day);
    const newSlide: BcaStorySlide = {
      id: `custom-${Date.now()}`,
      day: data.day,
      lessonTitle: title,
      category: data.day <= 10 ? "HTML" : data.day <= 20 ? "CSS" : "JavaScript",
      timestamp: "Just now",
      caption: data.caption,
      vivaScore: "100% Viva Approved",
      githubRepoUrl: data.githubUrl,
      techTags: ["BCA", "Practical", "WebDev"],
      gradientTheme: "from-purple-600 via-pink-600 to-rose-700",
      createdAt: Date.now()
    };

    // Save locally for instant 0ms hydration
    try {
      const existing = localStorage.getItem("nextsem_user_custom_stories");
      const list: BcaStorySlide[] = existing ? JSON.parse(existing) : [];
      const updated = [newSlide, ...list];
      localStorage.setItem("nextsem_user_custom_stories", JSON.stringify(updated));
    } catch {}

    // Cloud broadcast to real community feed in Firestore
    if (user && !user.isGuest) {
      try {
        await setDoc(doc(db, "bca_practical_stories", `${user.uid}_custom_${Date.now()}`), {
          userId: user.uid,
          userName: user.name,
          userPhoto: user.photo || null,
          day: data.day,
          lessonTitle: title,
          caption: data.caption,
          githubRepoUrl: data.githubUrl,
          timestamp: new Date().toISOString(),
          createdAt: Date.now()
        }, { merge: true });
      } catch (err) {
        console.warn("Could not sync custom story to Firestore:", err);
      }
    }

    // Open viewer immediately to show their newly posted story
    setTimeout(() => {
      setActiveStoryIndex(0);
      setIsViewerOpen(true);
    }, 150);
  };

  return (
    <section aria-label="BCA Students Daily Status Feed" className="w-full mb-8 select-none">
      {/* Header Label & Live Indicator */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-black dark:text-white flex items-center gap-1.5">
            <span>BCA Student Stories &amp; Updates</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
              Live
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://nextsemacademy-max.github.io/bca-practical/"
            target="_blank"
            rel="noopener noreferrer"
            title="Open Master BCA Practical GitHub Pages Portfolio"
            className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60 hover:bg-blue-600 hover:text-white flex items-center gap-1 transition-all shadow-xs"
          >
            <span>Live GitHub Pages</span>
            <ExternalLink size={10} />
          </a>

          <button
            onClick={() => setIsComposeOpen(true)}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Plus size={13} className="stroke-[3]" />
            <span>Post Status</span>
          </button>
        </div>
      </div>

      {/* Horizontal Scrolling Stories Tray */}
      <div className="rounded-2xl bg-slate-50/70 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800/80 p-3 sm:p-4 shadow-sm backdrop-blur-sm">
        <div className="flex items-start gap-4 sm:gap-5 overflow-x-auto pb-1 scrollbar-none overscroll-x-contain">
          {/* ── 1. YOUR STORY BUBBLE ── */}
          <div className="flex flex-col items-center shrink-0 w-[72px] sm:w-[80px] text-center group cursor-pointer">
            <div className="relative" onClick={handleYourStoryClick}>
              {/* Vibrant Ring (if user has active slides) or dashed ring */}
              <div 
                className={`p-[2.5px] rounded-full transition-transform group-hover:scale-105 active:scale-95 ${
                  userStory.slides.length > 0
                    ? "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] shadow-sm"
                    : "border-2 border-dashed border-slate-300 dark:border-neutral-700"
                }`}
              >
                <div className="p-[2px] rounded-full bg-white dark:bg-black">
                  {userStory.userAvatar ? (
                    <img
                      src={userStory.userAvatar}
                      alt={userStory.userName}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = "none";
                        const fb = document.getElementById("your-story-fallback");
                        if (fb) fb.classList.remove("hidden");
                      }}
                    />
                  ) : null}
                  <div 
                    id="your-story-fallback"
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-black text-white text-base shadow-inner ${userStory.userAvatar ? "hidden" : "flex"}`}
                  >
                    {user ? getUserInitials(user.name) : "You"}
                  </div>
                </div>
              </div>

              {/* Plus Badge */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsComposeOpen(true);
                }}
                className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center border-2 border-white dark:border-black shadow-md cursor-pointer transition-transform hover:scale-110 active:scale-95"
                title="Post new story status"
              >
                <Plus size={12} className="stroke-[3]" />
              </button>
            </div>

            {/* Label */}
            <span className="text-[11px] font-bold text-black dark:text-white mt-1.5 truncate max-w-full group-hover:text-blue-600 dark:group-hover:text-blue-400">
              Your Story
            </span>
            <span suppressHydrationWarning className="text-[9px] font-mono text-slate-500 dark:text-slate-400 truncate max-w-full">
              {userStory.slides.length > 0 ? `Day ${userStory.latestDay} • Active` : (user ? "Share status" : "Sign in & share")}
            </span>
            {userGitHubPagesUrl && (
              <a
                href={userGitHubPagesUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Open Your Live GitHub Pages Portfolio"
                className="mt-1 inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-600 hover:text-white transition-all shadow-xs"
              >
                <span>Pages</span>
                <ExternalLink size={8} />
              </a>
            )}
          </div>

          {/* ── 2. VERIFIED MENTOR & ACTUAL PEER STUDENTS ── */}
          {communityStories.map((story, idx) => {
            const actualIndex = idx + 1; // offset by 1 because userStory is at index 0
            const isSeen = !!seenStoryIds[story.id];
            const shortName = getStoryDisplayName(story.userName);
            const storyPagesUrl = story.githubPagesUrl || (
              story.userId === "manoj-lead"
                ? "https://nextsemacademy-max.github.io/bca-practical/"
                : `https://${story.userHandle.toLowerCase().replace(/_/g, '-')}.github.io/bca-practical/`
            );

            return (
              <div
                key={story.id}
                onClick={() => handleStoryClick(actualIndex)}
                className="flex flex-col items-center shrink-0 w-[72px] sm:w-[80px] text-center group cursor-pointer"
              >
                <div className="relative">
                  {/* Vibrant Gradient Ring */}
                  <div 
                    className={`p-[2.5px] rounded-full transition-transform group-hover:scale-105 active:scale-95 ${
                      !isSeen
                        ? "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] shadow-sm animate-pulse-subtle"
                        : "border border-slate-300 dark:border-neutral-700 opacity-80"
                    }`}
                  >
                    <div className="p-[2px] rounded-full bg-white dark:bg-black">
                      {story.userAvatar ? (
                        <img
                          src={story.userAvatar}
                          alt={story.userName}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLElement).style.display = "none";
                            const fb = document.getElementById(`avatar-fb-${story.id}`);
                            if (fb) fb.classList.remove("hidden");
                          }}
                        />
                      ) : null}
                      <div 
                        id={`avatar-fb-${story.id}`}
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${getAvatarGradient(story.userName)} flex items-center justify-center font-black text-white text-base shadow-inner ${story.userAvatar ? "hidden" : "flex"}`}
                      >
                        {getUserInitials(story.userName)}
                      </div>
                    </div>
                  </div>

                  {/* Day Badge on avatar */}
                  <div className="absolute -bottom-1 right-0 px-1.5 py-0.2 rounded-full bg-black/90 border border-white/20 text-[9px] font-black text-amber-400 flex items-center gap-0.5 shadow-sm">
                    <Flame size={9} className="text-rose-500 fill-rose-500" />
                    <span>D{story.latestDay}</span>
                  </div>
                </div>

                {/* Name */}
                <span className="text-[11px] font-bold text-black dark:text-white mt-1.5 truncate max-w-full group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {shortName}
                </span>
                <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 truncate max-w-full">
                  {story.lastActive}
                </span>

                {/* Live GitHub Pages Link */}
                {storyPagesUrl && (
                  <a
                    href={storyPagesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    title={`Open ${shortName}'s Live GitHub Pages Portfolio`}
                    className="mt-1 inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-600 hover:text-white transition-all shadow-xs"
                  >
                    <span>Pages</span>
                    <ExternalLink size={8} />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── STORY PLAYER MODAL ── */}
      {isViewerOpen && activeStoryIndex !== null && (
        <BcaStoryViewerModal
          stories={allStories}
          initialUserIndex={activeStoryIndex}
          isOpen={isViewerOpen}
          onClose={() => {
            setIsViewerOpen(false);
            setActiveStoryIndex(null);
          }}
          onMarkSeen={handleMarkSeen}
        />
      )}

      {/* ── COMPOSE STORY MODAL ── */}
      {isComposeOpen && (
        <BcaStoryComposeModal
          isOpen={isComposeOpen}
          onClose={() => setIsComposeOpen(false)}
          onStoryPublished={handleStoryPublished}
        />
      )}
    </section>
  );
}
