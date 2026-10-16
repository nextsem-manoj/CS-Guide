"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Plus, Sparkles, CheckCircle2, ChevronRight, Flame } from "lucide-react";
import { useStudentProgress } from "@/context/StudentProgressContext";
import { 
  BcaStudentStory, BcaStorySlide, INITIAL_COMMUNITY_STORIES, getLessonTitleByDay 
} from "@/data/bcaStoriesData";
import BcaInstagramStoryModal from "./BcaInstagramStoryModal";
import BcaStoryComposeModal from "./BcaStoryComposeModal";

export default function BcaInstagramStoriesTray() {
  const { user, completedDays, githubRepoUrls, githubUsername } = useStudentProgress();

  const [communityStories, setCommunityStories] = useState<BcaStudentStory[]>(INITIAL_COMMUNITY_STORIES);
  const [seenStoryIds, setSeenStoryIds] = useState<Record<string, boolean>>({});
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  // Load seen stories & custom stories from localStorage on mount
  useEffect(() => {
    try {
      const savedSeen = localStorage.getItem("nextsem_seen_stories");
      if (savedSeen) setSeenStoryIds(JSON.parse(savedSeen));

      const savedCustom = localStorage.getItem("nextsem_user_custom_stories");
      if (savedCustom) {
        const parsedCustom: BcaStorySlide[] = JSON.parse(savedCustom);
        if (parsedCustom.length > 0) {
          // Custom slides are present
        }
      }
    } catch (e) {
      console.warn("Could not load local stories cache:", e);
    }
  }, []);

  // Compute "Your Story" slides dynamically from completedDays and githubRepoUrls
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
          caption: `Completed Day ${day}: ${title} and pushed code to GitHub! 🚀 Viva passed 100%.`,
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
      lastActive: "Now"
    };
  }, [user, completedDays, githubRepoUrls, githubUsername]);

  // Combine userStory with communityStories
  const allStories = useMemo(() => {
    return [userStory, ...communityStories];
  }, [userStory, communityStories]);

  // Handle Mark Seen
  const handleMarkSeen = (storyId: string) => {
    setSeenStoryIds((prev) => {
      const updated = { ...prev, [storyId]: true };
      try {
        localStorage.setItem("nextsem_seen_stories", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

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
  const handleStoryPublished = (data: { day: number; caption: string; githubUrl: string }) => {
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

    try {
      const existing = localStorage.getItem("nextsem_user_custom_stories");
      const list: BcaStorySlide[] = existing ? JSON.parse(existing) : [];
      const updated = [newSlide, ...list];
      localStorage.setItem("nextsem_user_custom_stories", JSON.stringify(updated));
    } catch {}

    // Open viewer immediately to show their newly posted story
    setTimeout(() => {
      setActiveStoryIndex(0);
      setIsViewerOpen(true);
    }, 150);
  };

  return (
    <section aria-label="BCA Students Story Tray" className="w-full mb-8 select-none">
      {/* Header Label & Live Indicator */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-black dark:text-white flex items-center gap-1.5">
            <span>BCA Live Status & Stories</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
              Instagram Style
            </span>
          </h2>
        </div>

        <button
          onClick={() => setIsComposeOpen(true)}
          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <Plus size={13} className="stroke-[3]" />
          <span>Post Status</span>
        </button>
      </div>

      {/* Horizontal Scrolling Stories Tray */}
      <div className="rounded-2xl bg-slate-50/70 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800/80 p-3 sm:p-4 shadow-sm backdrop-blur-sm">
        <div className="flex items-start gap-4 sm:gap-5 overflow-x-auto pb-1 scrollbar-none overscroll-x-contain">
          {/* ── 1. YOUR STORY BUBBLE ── */}
          <div className="flex flex-col items-center shrink-0 w-[72px] sm:w-[80px] text-center group cursor-pointer">
            <div className="relative" onClick={handleYourStoryClick}>
              {/* Instagram Gradient Ring (if user has active slides) or subtle ring */}
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
                    />
                  ) : (
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-black text-white text-lg">
                      {user ? user.name.charAt(0) : "You"}
                    </div>
                  )}
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
            <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400">
              {userStory.slides.length > 0 ? `Day ${userStory.latestDay} • Active` : "Share status"}
            </span>
          </div>

          {/* ── 2. COMMUNITY PEER STORIES ── */}
          {communityStories.map((story, idx) => {
            const actualIndex = idx + 1; // offset by 1 because userStory is at index 0
            const isSeen = !!seenStoryIds[story.id];

            return (
              <div
                key={story.id}
                onClick={() => handleStoryClick(actualIndex)}
                className="flex flex-col items-center shrink-0 w-[72px] sm:w-[80px] text-center group cursor-pointer"
              >
                <div className="relative">
                  {/* Instagram Gradient Ring */}
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
                        />
                      ) : (
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-white text-base">
                          {story.userName.charAt(0)}
                        </div>
                      )}
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
                  {story.userName.split(" ")[0]}
                </span>
                <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 truncate max-w-full">
                  {story.lastActive}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── INSTAGRAM STORY PLAYER MODAL ── */}
      {isViewerOpen && activeStoryIndex !== null && (
        <BcaInstagramStoryModal
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
