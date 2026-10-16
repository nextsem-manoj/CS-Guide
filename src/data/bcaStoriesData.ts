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
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    isVerified: true,
    role: "Lead Developer",
    hasUnseenStories: true,
    latestDay: 5,
    lastActive: "15m ago",
    slides: [
      {
        id: "slide-m5",
        day: 5,
        lessonTitle: "HTML Forms & Input Elements",
        category: "HTML",
        timestamp: "15m ago",
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
      }
    ]
  },
  {
    id: "story-priya",
    userId: "priya-101",
    userName: "Priya Sharma",
    userHandle: "priya_webdev",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    isVerified: true,
    role: "Student",
    hasUnseenStories: true,
    latestDay: 4,
    lastActive: "42m ago",
    slides: [
      {
        id: "slide-p4",
        day: 4,
        lessonTitle: "HTML Semantic Elements & Page Structure",
        category: "HTML",
        timestamp: "42m ago",
        caption: "Completed Day 4! Loving the clean structure of semantic HTML tags. Pushed everything to my personal GitHub repository.",
        vivaScore: "100% First Attempt",
        githubRepoUrl: "https://github.com/priya-sharma-dev/ignou-bca-practicals",
        techTags: ["HTML5", "SemanticTags", "IGNOU_BCA"],
        gradientTheme: "from-rose-600 via-pink-600 to-purple-800",
        codeSnippetPreview: `<header>\n  <h1>IGNOU BCA Practical</h1>\n  <nav><a href="#about">About</a></nav>\n</header>`,
        createdAt: Date.now() - 1000 * 60 * 42
      },
      {
        id: "slide-p2",
        day: 2,
        lessonTitle: "HTML Headings, Paragraphs & Text Formatting",
        category: "HTML",
        timestamp: "1d ago",
        caption: "Mastered h1-h6 hierarchy and text styling with <strong> and <em>. Zero syntax errors!",
        vivaScore: "100% Approved",
        githubRepoUrl: "https://github.com/priya-sharma-dev/ignou-bca-practicals",
        techTags: ["HTML5", "Headings", "Formatting"],
        gradientTheme: "from-purple-600 via-violet-700 to-slate-900",
        createdAt: Date.now() - 1000 * 60 * 1500
      }
    ]
  },
  {
    id: "story-aman",
    userId: "aman-202",
    userName: "Aman Verma",
    userHandle: "aman_codes",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    isVerified: false,
    role: "Student",
    hasUnseenStories: true,
    latestDay: 3,
    lastActive: "1h ago",
    slides: [
      {
        id: "slide-a3",
        day: 3,
        lessonTitle: "HTML Links and Images",
        category: "HTML",
        timestamp: "1h ago",
        caption: "Finally resolved image path issues on Windows! Learned that ../ moves up one directory. Pushed to GitHub via VS Code terminal.",
        vivaScore: "100% Viva Approved",
        githubRepoUrl: "https://github.com/amanverma-cs/bca-web-practical",
        techTags: ["HTML5", "RelativePaths", "GitPush"],
        gradientTheme: "from-amber-600 via-orange-600 to-rose-900",
        createdAt: Date.now() - 1000 * 60 * 60
      }
    ]
  },
  {
    id: "story-sneha",
    userId: "sneha-303",
    userName: "Sneha Patel",
    userHandle: "sneha_frontend",
    userAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    isVerified: true,
    role: "BCA Peer",
    hasUnseenStories: true,
    latestDay: 2,
    lastActive: "3h ago",
    slides: [
      {
        id: "slide-s2",
        day: 2,
        lessonTitle: "HTML Headings, Paragraphs & Text Formatting",
        category: "HTML",
        timestamp: "3h ago",
        caption: "Day 2 done! The step-by-step instructions make it so much easier than college books. My repository is live on GitHub.",
        vivaScore: "100% Approved",
        githubRepoUrl: "https://github.com/snehapatel-dev/bca-semester-1",
        techTags: ["HTML5", "VSCode", "WebDev"],
        gradientTheme: "from-teal-600 via-emerald-600 to-slate-900",
        createdAt: Date.now() - 1000 * 60 * 180
      }
    ]
  },
  {
    id: "story-rahul",
    userId: "rahul-404",
    userName: "Rahul Mehta",
    userHandle: "rahul_tech",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    isVerified: false,
    role: "Student",
    hasUnseenStories: false,
    latestDay: 1,
    lastActive: "5h ago",
    slides: [
      {
        id: "slide-r1",
        day: 1,
        lessonTitle: "HTML Setup & First Webpage",
        category: "HTML",
        timestamp: "5h ago",
        caption: "Configured VS Code with Live Server and pushed my very first index.html file to GitHub! Feeling ready for Day 2.",
        vivaScore: "100% Approved",
        githubRepoUrl: "https://github.com/rahulmehta-dev/my-first-website",
        techTags: ["VSCode", "HTMLSetup", "FirstCommit"],
        gradientTheme: "from-blue-700 via-indigo-700 to-slate-900",
        createdAt: Date.now() - 1000 * 60 * 300
      }
    ]
  }
];

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
