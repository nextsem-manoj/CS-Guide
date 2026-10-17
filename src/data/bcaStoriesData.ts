export interface BcaStorySlide {
  id: string;
  day: number;
  lessonTitle: string;
  category: "HTML" | "CSS" | "JavaScript" | "Git" | "Project";
  timestamp: string;
  caption: string;
  vivaScore: string;
  githubRepoUrl: string;
  liveDemoUrl?: string;
  techTags: string[];
  gradientTheme: string;
  codeSnippetPreview?: string;
  createdAt: number;
}

export interface BcaStudentStory {
  id: string;
  userId: string;
  userName: string;
  userHandle: string;
  userAvatar: string | null;
  isCurrentUser?: boolean;
  isVerified?: boolean;
  role: "Student" | "Mentor" | "Lead Developer" | "BCA Peer";
  hasUnseenStories: boolean;
  slides: BcaStorySlide[];
  latestDay: number;
  lastActive: string;
}

export const INITIAL_COMMUNITY_STORIES: BcaStudentStory[] = [
  {
    id: "story-manoj",
    userId: "manoj-lead",
    userName: "Er. Manoj Kumar",
    userHandle: "manoj_dev",
    userAvatar: "/nextsem-emblem.png",
    isVerified: true,
    role: "Lead Developer",
    hasUnseenStories: true,
    latestDay: 5,
    lastActive: "Active now",
    slides: [
      {
        id: "slide-m5",
        day: 5,
        lessonTitle: "HTML Forms & Input Elements",
        category: "HTML",
        timestamp: "Active now",
        caption: "Built responsive student registration form with input validation and pushed to GitHub Pages! 🚀 Live and verified.",
        vivaScore: "100% Viva Approved",
        githubRepoUrl: "https://github.com/nextsemacademy-max/bca",
        liveDemoUrl: "https://nextsemacademy-max.github.io/bca/",
        techTags: ["HTML5", "Forms", "InputValidation", "GitHubPages"],
        gradientTheme: "from-blue-600 via-indigo-600 to-purple-800",
        codeSnippetPreview: `<form action="/submit" method="POST">\n  <label for="enroll">Enrollment No:</label>\n  <input type="text" id="enroll" required pattern="[0-9]{9,10}" />\n  <button type="submit">Submit BCA Record</button>\n</form>`,
        createdAt: Date.now() - 1000 * 60 * 15
      },
      {
        id: "slide-m4",
        day: 4,
        lessonTitle: "HTML Semantic Elements & Page Structure",
        category: "HTML",
        timestamp: "2h ago",
        caption: "Replaced <div> soup with clean <header>, <nav>, <main>, <article>, and <footer> semantic tags! Clean SEO markup.",
        vivaScore: "100% Viva Approved",
        githubRepoUrl: "https://github.com/nextsemacademy-max/bca",
        liveDemoUrl: "https://nextsemacademy-max.github.io/bca/",
        techTags: ["HTML5", "SemanticWeb", "SEO", "Accessibility"],
        gradientTheme: "from-cyan-600 via-blue-600 to-slate-900",
        createdAt: Date.now() - 1000 * 60 * 120
      },
      {
        id: "slide-m3",
        day: 3,
        lessonTitle: "HTML Links and Images",
        category: "HTML",
        timestamp: "Yesterday",
        caption: "Practiced relative vs absolute image paths, alt attributes for accessibility, and target='_blank' security with rel='noopener'.",
        vivaScore: "100% Viva Approved",
        githubRepoUrl: "https://github.com/nextsemacademy-max/bca",
        liveDemoUrl: "https://nextsemacademy-max.github.io/bca/",
        techTags: ["HTML5", "Images", "Hyperlinks", "GitCommit"],
        gradientTheme: "from-emerald-600 via-teal-700 to-slate-900",
        createdAt: Date.now() - 1000 * 60 * 1440
      },
      {
        id: "slide-m2",
        day: 2,
        lessonTitle: "HTML Headings, Paragraphs & Text Formatting",
        category: "HTML",
        timestamp: "2d ago",
        caption: "Mastered HTML typography hierarchy from h1 through h6 with semantic emphasis and strong tags. Zero syntax errors.",
        vivaScore: "100% Viva Approved",
        githubRepoUrl: "https://github.com/nextsemacademy-max/bca",
        liveDemoUrl: "https://nextsemacademy-max.github.io/bca/",
        techTags: ["HTML5", "Headings", "Formatting", "WebStandards"],
        gradientTheme: "from-purple-600 via-indigo-700 to-slate-900",
        createdAt: Date.now() - 1000 * 60 * 2880
      },
      {
        id: "slide-m1",
        day: 1,
        lessonTitle: "HTML Setup & First Webpage",
        category: "HTML",
        timestamp: "3d ago",
        caption: "Initialized Git repository, configured VS Code with Live Server, and deployed initial index.html to GitHub Pages.",
        vivaScore: "100% Viva Approved",
        githubRepoUrl: "https://github.com/nextsemacademy-max/bca",
        liveDemoUrl: "https://nextsemacademy-max.github.io/bca/",
        techTags: ["VSCode", "HTML5", "Git", "FirstCommit"],
        gradientTheme: "from-blue-700 via-cyan-700 to-slate-900",
        createdAt: Date.now() - 1000 * 60 * 4320
      }
    ]
  }
];

export function getStoryDisplayName(name: string): string {
  if (!name) return "Student";
  const clean = name.trim();
  if (/^er\.\s+/i.test(clean)) {
    const parts = clean.split(/\s+/);
    return parts.length > 1 ? `Er. ${parts[1]}` : clean;
  }
  return clean.split(/\s+/)[0];
}

export function getLessonTitleByDay(day: number): string {
  const titles: Record<number, string> = {
    1: "HTML Setup & First Webpage",
    2: "HTML Headings, Paragraphs & Text Formatting",
    3: "HTML Links and Images",
    4: "HTML Semantic Elements & Page Structure",
    5: "HTML Forms & Input Elements",
    6: "HTML Tables & Structured Data",
    7: "HTML Media: Audio and Video",
    8: "HTML Canvas & SVG Introduction",
    9: "HTML Best Practices & Accessibility",
    10: "Milestone: Personal Portfolio in HTML",
    11: "CSS Introduction, Syntax & Selectors",
    12: "CSS Colors, Backgrounds & Typography",
    13: "CSS Box Model: Margin, Border, Padding",
    14: "CSS Display, Visibility & Overflow",
    15: "CSS Positioning: Relative, Absolute, Fixed",
    16: "CSS Flexbox Fundamentals",
    17: "CSS Flexbox Advanced Layouts",
    18: "CSS Grid Fundamentals",
    19: "CSS Grid Template Areas & Responsive Layout",
    20: "Milestone: Responsive Multi-Page Portfolio",
    21: "JavaScript Introduction & Variables",
    22: "JS Data Types & Operators",
    23: "JS Control Flow: If/Else & Switch",
    24: "JS Loops: For, While & Do-While",
    25: "JS Functions & Arrow Syntax",
    26: "JS DOM Selection & Manipulation",
    27: "JS Event Handling & Form Validation",
    28: "JS Fetch API & Asynchronous Programming",
    29: "JS LocalStorage & State Management",
    30: "Milestone: Interactive Task Manager Web App"
  };
  return titles[day] || `Day ${day} Practical Lesson`;
}

export function getUserInitials(name: string): string {
  if (!name) return "U";
  const clean = name.replace(/^er\.\s+/i, "").trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return (clean[0] || "U").toUpperCase();
}

export function getAvatarGradient(name: string): string {
  const gradients = [
    "bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-800",
    "bg-gradient-to-br from-purple-600 via-pink-600 to-rose-700",
    "bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900",
    "bg-gradient-to-br from-cyan-600 via-blue-600 to-slate-900",
    "bg-gradient-to-br from-amber-600 via-orange-600 to-rose-900",
  ];
  let hash = 0;
  for (let i = 0; i < (name || "").length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
}

export function formatTimeAgo(time: number | string): string {
  const ts = typeof time === "string" ? new Date(time).getTime() : time;
  if (!ts || isNaN(ts)) return "Recently";
  const diff = Date.now() - ts;
  if (diff < 0) return "Just now";
  const mins = Math.floor(diff / (1000 * 60));
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / (1000 * 60 * 60));
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
