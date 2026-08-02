"use client";

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { 
  Search, ArrowLeft, X, History, Sparkles, BookOpen, Plus, 
  Mic, Camera, UploadCloud, FileText, CheckCircle2, XCircle,
  ExternalLink, Code 
} from 'lucide-react';
import Link from 'next/link';
import searchIndex from '../data/searchIndex.json';
import { getChapterUrl } from '../lib/htmlLessonsHelper';
import { auth, signInWithGoogle } from '../lib/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

const SUGGESTED_SEARCHES = [
  'HTML5 semantic tags',
  'CSS Flexbox & Grid',
  'React hooks useState',
  'Node Express APIs',
  'MongoDB database collections'
];

const STOP_WORDS = new Set(['a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'arent', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'cant', 'cannot', 'could', 'couldnt', 'did', 'didnt', 'do', 'does', 'doesnt', 'doing', 'dont', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'hadnt', 'has', 'hasnt', 'have', 'havent', 'having', 'he', 'hed', 'hell', 'hes', 'her', 'here', 'heres', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'hows', 'i', 'id', 'ill', 'im', 'ive', 'if', 'in', 'into', 'is', 'isnt', 'it', 'its', 'itself', 'lets', 'me', 'more', 'most', 'mustnt', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shant', 'she', 'shed', 'shell', 'shes', 'should', 'shouldnt', 'so', 'some', 'such', 'than', 'that', 'thats', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'theres', 'these', 'they', 'theyd', 'theyll', 'theyre', 'theyve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasnt', 'we', 'wed', 'well', 'were', 'weve', 'werent', 'what', 'whats', 'when', 'whens', 'where', 'wheres', 'which', 'while', 'who', 'whos', 'whom', 'why', 'whys', 'with', 'wont', 'would', 'wouldnt', 'you', 'youd', 'youll', 'youre', 'youve', 'your', 'yours', 'yourself', 'yourselves']);

function getLevenshteinDistance(a: string, b: string): number {
  const tmp = [];
  for (let i = 0; i <= a.length; i++) tmp[i] = [i];
  for (let j = 0; j <= b.length; j++) tmp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      tmp[i][j] = Math.min(
        tmp[i - 1][j] + 1,
        tmp[i][j - 1] + 1,
        tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return tmp[a.length][b.length];
}

const highlightText = (text: string, query: string) => {
  if (!query) return <span>{text}</span>;
  const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 1 && !STOP_WORDS.has(w));
  if (words.length === 0) {
    const cleanQ = query.trim();
    if (!cleanQ) return <span>{text}</span>;
    words.push(cleanQ.toLowerCase());
  }

  const pattern = words.map(w => w.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|');
  const regex = new RegExp(`(${pattern})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark key={index} className="bg-blue-500/20 text-blue-400 font-bold border border-blue-500/20 px-0.5 rounded">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
};

interface SearchItem {
  id: string;
  title: string;
  content: string;
  phase: string;
  duration: string;
  color: string;
  icon: string;
}

interface AiResponse {
  title: string;
  summary: string;
  code?: string;
  chapter: string;
}

interface LensOcrResult {
  extractedText: string;
  queries: string[];
}

interface LensOmrAnswer {
  q: number | string;
  selected: string;
  status: "correct" | "incorrect";
  correct: string;
}

interface LensOmrResult {
  title?: string;
  score: number;
  total: number;
  percentage: number;
  answers: LensOmrAnswer[];
}

type LensResult = LensOcrResult | LensOmrResult;

interface SearchResultItem {
  id: string;
  title: string;
  content: string;
  phase: string;
  duration: string;
  color: string;
  icon: string;
  score: number;
  excerpt: string;
}

const AI_RESPONSES: Record<string, { title: string; summary: string; code: string; chapter: string }> = {
  flexbox: {
    title: "CSS Flexbox Layout",
    summary: "Flexbox (Flexible Box Layout) is a 1-dimensional CSS layout model designed for distributing space and aligning items inside container divs along a single axis (row or column). It makes alignment, centering, and sizing children dynamic and simple.",
    code: `.container {\n  display: flex;\n  flex-direction: row; /* or column */\n  justify-content: center; /* horizontal alignment */\n  align-items: center; /* vertical alignment */\n}`,
    chapter: "p2-css-practical"
  },
  grid: {
    title: "CSS Grid Layout",
    summary: "CSS Grid is a powerful 2-dimensional layout system. Unlike Flexbox, it lets you create complex, responsive layouts with BOTH columns and rows. It is ideal for structured main page templates and galleries.",
    code: `.grid-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n}`,
    chapter: "p2-css-practical"
  },
  react: {
    title: "React JS UI Library",
    summary: "React is a component-based frontend library developed by Meta. It enables developers to build reusable UI elements and handles DOM updates efficiently via a Virtual DOM. You write markup in JSX and manage page states with hooks.",
    code: `import React, { useState } from 'react';\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>Clicks: {count}</button>;\n}`,
    chapter: "p4-react-practical"
  },
  usestate: {
    title: "React useState Hook",
    summary: "The `useState` hook allows functional React components to maintain local reactive state variables. Whenever the setter function is called, React triggers a re-render of the component to update the UI on screen.",
    code: `const [state, setState] = useState(initialValue);\n// Call setState(newValue) to trigger render`,
    chapter: "p4-react-practical"
  },
  html: {
    title: "HTML5 Web Skeleton",
    summary: "HTML (HyperText Markup Language) defines the document structure of web pages. It uses semantic tag elements (headers, paragraphs, sections, buttons) to represent markup blocks structurally.",
    code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Document</title>\n</head>\n<body>\n  <h1>Welcome!</h1>\n</body>\n</html>`,
    chapter: "p1-1-intro-and-text"
  },
  javascript: {
    title: "JavaScript ES6+",
    summary: "JavaScript is the programming language that powers web interactivity. It runs directly inside client browsers to capture click events, fetch server APIs, manipulate HTML styling, and perform logical computations.",
    code: `const btn = document.querySelector("#btn");\nbtn.addEventListener("click", () => {\n  console.log("Button clicked!");\n});`,
    chapter: "p3-js-practical"
  },
  js: {
    title: "JavaScript ES6+",
    summary: "JavaScript is the programming language that powers web interactivity. It runs directly inside client browsers to capture click events, fetch server APIs, manipulate HTML styling, and perform logical computations.",
    code: `const btn = document.querySelector("#btn");\nbtn.addEventListener("click", () => {\n  console.log("Button clicked!");\n});`,
    chapter: "p3-js-practical"
  },
  css: {
    title: "CSS3 Styling Sheets",
    summary: "CSS (Cascading Style Sheets) styles the layout visual representations of HTML. It handles grid structures, colors, hover transitions, text sizes, dark themes, and responsive design media queries.",
    code: `body {\n  background-color: #0f172a;\n  color: #f8fafc;\n  font-family: sans-serif;\n}`,
    chapter: "p2-css-practical"
  },
  node: {
    title: "Node.js Backend runtime",
    summary: "Node.js is an open-source, cross-platform JavaScript runtime environment that lets you execute JS code outside of web browsers. It is commonly used for building scalable server backends and REST APIs with Express.js.",
    code: `const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('Hello from Nextsem API!');\n});\n\napp.listen(3000);`,
    chapter: "p5-nodejs-mongodb"
  }
};

const getLocalAiResponse = (query: string) => {
  const normalized = query.toLowerCase().trim();
  
  // 1. Direct Keyword Match
  for (const key of Object.keys(AI_RESPONSES)) {
    if (normalized.includes(key)) {
      return AI_RESPONSES[key];
    }
  }

  // 2. Local RAG Fallback using search index
  const words = normalized.split(/\s+/).filter((w) => w.length > 2);
  let bestItem: SearchItem | null = null;
  let highestScore = 0;

  for (const item of searchIndex) {
    let score = 0;
    const lowerTitle = item.title.toLowerCase();
    const lowerContent = item.content.toLowerCase();

    if (lowerTitle.includes(normalized)) score += 50;
    if (lowerContent.includes(normalized)) score += 10;
    
    words.forEach(word => {
      if (lowerTitle.includes(word)) score += 20;
      if (lowerContent.includes(word)) score += 5;
    });

    if (score > highestScore) {
      highestScore = score;
      bestItem = item;
    }
  }

  if (bestItem && highestScore > 0) {
    // Extract snippet
    let excerpt = '';
    const index = bestItem.content.toLowerCase().indexOf(words[0] || normalized);
    const start = Math.max(0, index - 30);
    const end = Math.min(bestItem.content.length, index + 150);
    excerpt = bestItem.content.substring(start, end).replace(/\s+/g, ' ').trim() + '...';

    return {
      title: `AI Synthesis: ${bestItem.title}`,
      summary: `Based on Nextsem's front-end developer curriculum for ${bestItem.phase}, this lesson covers: ${excerpt}`,
      code: `// Matching topic: ${bestItem.title}\n// Duration: ${bestItem.duration}`,
      chapter: bestItem.id
    };
  }

  // 3. Out of Context / Dynamic Synthesized Fallback
  if (normalized.includes("python") || normalized.includes("django") || normalized.includes("flask") || normalized.includes("fastapi")) {
    return {
      title: "AI Synthesis: Python (Out of Context)",
      summary: `Python is a high-level general-purpose programming language. While Nextsem's front-end roadmap focuses exclusively on JavaScript, TypeScript, and the Node.js web ecosystem, Python is widely used for Backend APIs (via FastAPI or Django), Data Science, Machine Learning, and automation scripting.`,
      code: `def greet(name):\n    # Python syntax is clean and indentation-based\n    return f"Hello, {name}!"\n\nprint(greet("Developer"))`,
      chapter: "p0-1-setup"
    };
  }

  if (normalized.includes("java") || normalized.includes("spring") || normalized.includes("kotlin")) {
    return {
      title: "AI Synthesis: Java & OOP (Out of Context)",
      summary: `Java is a class-based, object-oriented programming language designed to run anywhere via the JVM. In web development, we use JavaScript/TypeScript for dynamic UI rendering. However, Java is a powerhouse for enterprise-grade backend APIs, Android application development, and large scale systems.`,
      code: `public class Main {\n    public static void main(String[] args) {\n        // Strong typing and Object-Oriented paradigm\n        System.out.println("Hello from Java!");\n    }\n}`,
      chapter: "p0-1-setup"
    };
  }

  if (normalized.includes("c++") || normalized.includes("c#") || normalized.includes("dotnet") || normalized.includes("golang") || normalized.includes("rust")) {
    return {
      title: "AI Synthesis: Systems Languages (Out of Context)",
      summary: `Systems programming languages (like C++, Go, Rust, or C#) are compiled languages designed for high performance, memory safety, and low-level control. Frontend web apps run JavaScript inside browsers, but systems languages are frequently used to build browser engines, databases, high-speed servers, and video games.`,
      code: `#include <iostream>\n\nint main() {\n    // High-performance systems execution\n    std::cout << "Hello from C++!" << std::endl;\n    return 0;\n}`,
      chapter: "p0-1-setup"
    };
  }

  if (normalized.includes("sql") || normalized.includes("postgres") || normalized.includes("mysql") || normalized.includes("database")) {
    return {
      title: "AI Synthesis: Relational SQL Databases (Out of Context)",
      summary: `SQL (Structured Query Language) is the standard language for querying relational database management systems. Our Phase 5 backend curriculum covers MongoDB (a document-based NoSQL database), but relational databases like PostgreSQL and MySQL are essential tools to master for full-stack developer roles.`,
      code: `-- Fetch data from relational tables\nSELECT id, name, class \nFROM students \nWHERE is_active = true \nORDER BY name ASC;`,
      chapter: "p5-3-mongodb"
    };
  }

  if (normalized.includes("docker") || normalized.includes("kubernetes") || normalized.includes("devops") || normalized.includes("aws") || normalized.includes("github")) {
    return {
      title: "AI Synthesis: DevOps & Version Control (Out of Context)",
      summary: `DevOps involves tools and practices that automate software deployment, version control (Git/GitHub), containerization (Docker, Kubernetes), and cloud infrastructure hosting (AWS, GCP). While Nextsem teaches you to write the application code, DevOps manages the automated delivery pipeline.`,
      code: `# Sample Dockerfile structure\nFROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD ["npm", "start"]`,
      chapter: "p0-1-setup"
    };
  }

  // General query fallback
  return {
    title: `AI Synthesis: "${query}" (Out of Curriculum)`,
    summary: `You searched for "${query}". This topic falls outside Nextsem Academy's primary web development curriculum, which is specifically designed to take you from a beginner to a job-ready Front End Developer using HTML, CSS, JavaScript, React, and Node.js. Ready to write code? Use index.html or script.js in the playground!`,
    code: `// Tip: Try searching for standard curriculum terms like:\n// "Flexbox", "Grid", "useState", "React", or "JavaScript"`,
    chapter: "p0-1-setup"
  };
};

const SearchWidget = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const cseRef = useRef<HTMLDivElement>(null);

  const [isAiMode, setIsAiMode] = useState(false);
  const [autosuggestions, setAutosuggestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResponse, setAiResponse] = useState<AiResponse | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // User Authentication Real States
  const [user, setUser] = useState<{ name: string; email: string; avatar: string; photo?: string } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Nextsem Lens Scanner states
  const [isLensOpen, setIsLensOpen] = useState(false);
  const [lensMode, setLensMode] = useState<"ocr" | "omr">("ocr");
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string } | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [lensResult, setLensResult] = useState<LensResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  // Auto-close search modal when route/pathname changes (allows bottom nav navigation to work seamlessly)
  useEffect(() => {
    setTimeout(() => setIsOpen(false), 0);
  }, [pathname]);

  // Lock body scroll when search modal is open to prevent mobile scroll hijacking
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

  // Load Search History & register shortcut keys
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedHistory = localStorage.getItem('nextsem_search_history');
      if (savedHistory) {
        try {
          const parsed = JSON.parse(savedHistory);
          setTimeout(() => setHistory(parsed), 0);
        } catch (e) {
          console.error(e);
        }
      }
    }

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => {
          const inputEl = document.querySelector('input[type="text"]') as HTMLInputElement;
          inputEl?.focus();
        }, 150);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, []);

  // Listen to Auth State Events and update locally
  useEffect(() => {
    const handleOpenAuth = () => {
      setIsAuthModalOpen(true);
    };
    window.addEventListener("open_google_auth", handleOpenAuth);

    const handleOpenSearch = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const query = typeof detail === 'object' && detail !== null && 'query' in detail ? detail.query : '';
      setIsOpen(true);
      if (query) {
        setSearchQuery(query);
      }
      setTimeout(() => inputRef.current?.focus(), 150);
    };
    window.addEventListener("open_search", handleOpenSearch as EventListener);

    const handleAuthError = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const code = customEvent.detail || "";
      if (code === "auth/configuration-not-found") {
        setAuthError("configuration-not-found");
      }
    };
    window.addEventListener("nextsem_auth_error", handleAuthError as EventListener);

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const initials = firebaseUser.displayName 
          ? firebaseUser.displayName.split(" ").map(n => n[0]).join("").substring(0, 2)
          : "NS";
        
        const userObj = {
          name: firebaseUser.displayName || "Nextsem Student",
          email: firebaseUser.email || "",
          avatar: initials.toUpperCase(),
          photo: firebaseUser.photoURL || undefined
        };
        setUser(userObj);
        localStorage.setItem('nextsem_user', JSON.stringify(userObj));
        window.dispatchEvent(new Event("nextsem_auth_changed"));
      } else {
        setUser(null);
        localStorage.removeItem('nextsem_user');
        window.dispatchEvent(new Event("nextsem_auth_changed"));
      }
    });

    return () => {
      window.removeEventListener("open_google_auth", handleOpenAuth);
      window.removeEventListener("open_search", handleOpenSearch as EventListener);
      window.removeEventListener("nextsem_auth_error", handleAuthError as EventListener);
      unsubscribe();
    };
  }, []);

  // AI Response generator trigger
  useEffect(() => {
    if (isAiMode && searchQuery.trim()) {
      setTimeout(() => setIsGenerating(true), 0);
      const timer = setTimeout(() => {
        const response = getLocalAiResponse(searchQuery);
        setAiResponse(response);
        setIsGenerating(false);
      }, 950);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        setAiResponse(null);
        setIsGenerating(false);
      }, 0);
    }
  }, [searchQuery, isAiMode]);



  // Save history to localStorage
  const saveSearchToHistory = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    const filtered = [trimmed, ...history.filter((h) => h !== trimmed)].slice(0, 5);
    setHistory(filtered);
    localStorage.setItem('nextsem_search_history', JSON.stringify(filtered));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('nextsem_search_history');
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      saveSearchToHistory(searchQuery);
      setAutosuggestions([]);
      setIsInputFocused(false);
      inputRef.current?.blur();
    }
  };

  const handleExternalGoogleSearch = () => {
    if (typeof window !== 'undefined' && searchQuery.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank', 'noopener,noreferrer');
    }
  };

  const handleFullscreenTrigger = () => {
    // Disabled OS-level fullscreen request to prevent navigation resets on mobile
  };

  const handleSelectResult = (query: string) => {
    saveSearchToHistory(query);
    handleFullscreenTrigger();
    setIsOpen(false);
  };

  const getSearchResults = (): SearchResultItem[] => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    const queryWords = query.split(/\s+/).filter(w => w.length > 1);
    const stopWordsFiltered = queryWords.filter(w => !STOP_WORDS.has(w));
    const wordsToSearch = stopWordsFiltered.length > 0 ? stopWordsFiltered : queryWords;

    return (searchIndex as SearchItem[])
      .map((item) => {
        let score = 0;
        const lowerTitle = item.title.toLowerCase();
        const lowerContent = item.content.toLowerCase();

        // 1. Exact title match boost
        if (lowerTitle === query) {
          score += 1500;
        } else if (lowerTitle.startsWith(query)) {
          score += 800;
        } else if (lowerTitle.includes(query)) {
          score += 400;
        }

        // 2. Substring phrase match in content
        if (lowerContent.includes(query)) {
          score += 300;
        }

        // 3. Word matches in title & content
        wordsToSearch.forEach((word) => {
          // Word match in title
          if (lowerTitle.includes(word)) {
            score += 100;
            // Matches exact word in title (boundaries)
            const regex = new RegExp(`\\b${word}\\b`, 'i');
            if (regex.test(lowerTitle)) {
              score += 150;
            }
          }

          // Word occurrences in content (TF-IDF approximation)
          const occurrences = lowerContent.split(word).length - 1;
          if (occurrences > 0) {
            score += Math.min(occurrences * 15, 150); // cap TF at 150
          }

          // 4. Fuzzy word matches in title (Levenshtein distance)
          if (word.length >= 4) {
            const titleWords = lowerTitle.split(/\s+/);
            titleWords.forEach((tWord) => {
              const cleanTWord = tWord.replace(/[^a-zA-Z]/g, '');
              if (cleanTWord.length >= 4) {
                const dist = getLevenshteinDistance(word, cleanTWord);
                if (dist === 1) {
                  score += 80;
                } else if (dist === 2) {
                  score += 40;
                }
              }
            });
          }
        });

        // 5. Word Proximity Boost
        if (wordsToSearch.length > 1) {
          let lastIndex = -1;
          let minDistance = Infinity;
          wordsToSearch.forEach((word) => {
            const idx = lowerContent.indexOf(word);
            if (idx !== -1) {
              if (lastIndex !== -1) {
                const dist = Math.abs(idx - lastIndex);
                if (dist < minDistance) minDistance = dist;
              }
              lastIndex = idx;
            }
          });
          if (minDistance < 150) {
            score += 100; // close proximity boost
          }
        }

        // Extract a clean matched text snippet around the query
        let excerpt = '';
        let bestIndex = 0;
        for (const word of wordsToSearch) {
          const idx = lowerContent.indexOf(word);
          if (idx !== -1) {
            bestIndex = idx;
            break;
          }
        }

        const start = Math.max(0, bestIndex - 40);
        const end = Math.min(item.content.length, bestIndex + 120);
        excerpt = item.content.substring(start, end).replace(/\s+/g, ' ').trim();
        if (start > 0) excerpt = '...' + excerpt;
        if (end < item.content.length) excerpt = excerpt + '...';

        return { ...item, score, excerpt };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);
  };

  // Lens processing logic
  const startLensProcess = (fileName: string, fileSize: string) => {
    setSelectedFile({ name: fileName, size: fileSize });
    setIsScanning(true);
    setLensResult(null);

    setTimeout(() => {
      setIsScanning(false);
      if (lensMode === "ocr") {
        if (fileName.includes("homework")) {
          setLensResult({
            extractedText: "Assignment 3: Implement HTML tables with styled borders and custom grid templates.",
            queries: ["HTML Tables", "Grid Layout"]
          });
        } else if (fileName.includes("syllabus")) {
          setLensResult({
            extractedText: "Phase 4 Core Focus: React Hooks, Component State Management, and API Integration.",
            queries: ["React Hooks", "API Integration"]
          });
        } else {
          setLensResult({
            extractedText: `Document scanner successfully parsed ${fileName}. Detected key technical terms: Flexbox, Grid columns, JavaScript array manipulation, and database schemas.`,
            queries: ["Flexbox", "JavaScript", "database schemas"]
          });
        }
      } else {
        // OMR Mode
        setLensResult({
          title: fileName.includes("midterm") ? "Midterm Web Development OMR Evaluation" : "Custom OMR Grading Sheet",
          score: 16,
          total: 20,
          percentage: 80,
          answers: [
            { q: 1, selected: "A", correct: "A", status: "correct" },
            { q: 2, selected: "B", correct: "C", status: "incorrect" },
            { q: 3, selected: "D", correct: "D", status: "correct" },
            { q: 4, selected: "A", correct: "A", status: "correct" },
            { q: 5, selected: "C", correct: "B", status: "incorrect" },
            { q: 6, selected: "C", correct: "C", status: "correct" },
            { q: 7, selected: "B", correct: "B", status: "correct" },
            { q: 8, selected: "A", correct: "A", status: "correct" }
          ]
        });
      }
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeKB = (file.size / 1024).toFixed(1) + " KB";
      startLensProcess(file.name, sizeKB);
    }
  };

  // Google authentication actions
  const handleGoogleSignIn = async () => {
    try {
      setIsAuthModalOpen(false);
      await signInWithGoogle();
    } catch (err) {
      console.error("Google Sign-In Error: ", err);
      const authErr = err as { code?: string; message?: string };
      if (authErr.code === "auth/configuration-not-found") {
        setAuthError("configuration-not-found");
      } else {
        alert("Failed to authenticate with Google: " + (authErr.message || String(err)));
      }
    }
  };

  const handleSignOut = async () => {
    try {
      setIsProfileDropdownOpen(false);
      await signOut(auth);
    } catch (err) {
      console.error("Sign Out Error: ", err);
    }
  };

  const results = getSearchResults();

  if (pathname === '/playground') return null;

  return (
    <>
      {/* YouTube Android App-style Fullscreen Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-background text-white z-[999] flex flex-col animate-in fade-in zoom-in-95 duration-200">
          
          {/* Top Search Bar */}
          <div className="flex items-center gap-2 p-3 bg-slate-950/80 border-b border-slate-850/50 sticky top-0 z-50">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-slate-850 rounded-full transition-colors text-slate-400 hover:text-white"
            >
              <ArrowLeft size={22} />
            </button>
            
            <div className="flex-1 bg-slate-900 rounded-full px-4 py-2 flex items-center gap-2 border border-slate-800 focus-within:border-blue-500/50 transition-colors relative">
              <Plus 
                size={16} 
                className="text-slate-500 shrink-0 cursor-pointer hover:text-blue-500 hover:scale-115 transition-transform" 
                onClick={() => {
                  setIsOpen(false);
                  setIsLensOpen(true);
                }}
              />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchSubmit();
                  }
                }}
                placeholder="Ask Nextsem..."
                className="flex-1 bg-transparent text-white placeholder-slate-500 font-bold focus:outline-none text-sm md:text-base"
              />
              {searchQuery ? (
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={handleSearchSubmit}
                    className="p-1 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-blue-500 mr-0.5 cursor-pointer"
                    title="Search"
                  >
                    <Search size={15} />
                  </button>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setAutosuggestions([]);
                    }}
                    className="p-1 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white cursor-pointer"
                    title="Clear"
                  >
                    <X size={15} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-slate-500 mr-1 shrink-0">
                  <Mic size={15} />
                  <Camera size={15} className="hidden sm:inline" />
                </div>
              )}

              {/* Google-like Autosuggestions & History Dropdown */}
              {(autosuggestions.length > 0 || (isInputFocused && !searchQuery)) && (
                <div className="absolute top-[110%] left-0 right-0 bg-[#0f172a] border border-slate-800 rounded-2xl shadow-2xl z-[100] max-h-[280px] overflow-y-auto p-2 flex flex-col text-left animate-in fade-in slide-in-from-top-1 duration-150">
                  {searchQuery ? (
                    // Show autosuggestions on typing
                    autosuggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSearchQuery(sug);
                          setAutosuggestions([]);
                          setIsInputFocused(false);
                        }}
                        className="flex items-center gap-2.5 px-3 py-2.5 hover:bg-slate-800/80 rounded-xl text-xs font-semibold text-slate-200 transition-colors text-left"
                      >
                        <Search size={12} className="text-slate-500 shrink-0" />
                        <span className="truncate">{sug}</span>
                      </button>
                    ))
                  ) : (
                    // Show history and recommended topics when focused and empty
                    <div className="space-y-3 p-1">
                      {history.length > 0 && (
                        <div>
                          <span className="block text-[9px] font-black uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                            <History size={10} /> Recent Searches
                          </span>
                          <div className="flex flex-col">
                            {history.slice(0, 3).map((h, i) => (
                              <button
                                key={i}
                                onClick={() => {
                                  setSearchQuery(h);
                                  setIsInputFocused(false);
                                }}
                                className="flex items-center gap-2 py-2 hover:bg-slate-800/50 text-left text-xs font-semibold text-slate-300 rounded-lg px-1"
                              >
                                <History size={11} className="text-slate-550 shrink-0" />
                                <span className="truncate flex-1">{h}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <span className="block text-[9px] font-black uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                          <Sparkles size={10} /> Recommended Topics
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {SUGGESTED_SEARCHES.slice(0, 3).map((s, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setSearchQuery(s);
                                setIsInputFocused(false);
                              }}
                              className="px-2.5 py-1.5 bg-slate-850 hover:bg-slate-800 border border-slate-800 rounded-full text-[10px] font-bold text-slate-300 transition-all"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex bg-slate-950 px-4 border-b border-slate-900 text-xs shrink-0 select-none overflow-x-auto custom-scrollbar">
            <button
              onClick={() => {
                setIsAiMode(false);
              }}
              className={`flex items-center gap-1.5 px-5 py-3 font-black uppercase tracking-wider border-b-2 transition-all shrink-0 ${
                !isAiMode
                  ? "border-blue-500 text-white bg-slate-900/30" 
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <Search size={13} />
              <span>Standard Results</span>
            </button>
            <button
              onClick={() => {
                setIsAiMode(true);
                inputRef.current?.focus();
              }}
              className={`flex items-center gap-1.5 px-5 py-3 font-black uppercase tracking-wider border-b-2 transition-all shrink-0 ${
                isAiMode 
                  ? "border-emerald-500 text-emerald-400 bg-slate-900/30" 
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <Sparkles size={13} className="text-emerald-500" />
              <span>AI Search Mode</span>
            </button>
          </div>

          {/* Search Content Pane */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 max-w-3xl mx-auto w-full pb-20">
            
            {/* Case A: Empty Query - Show History & Suggestions */}
            {!searchQuery && (
              <div className="space-y-6">
                
                {/* Search History */}
                {history.length > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <History size={14} /> Recent Searches
                      </span>
                      <button onClick={clearHistory} className="text-xs font-bold text-blue-400 hover:underline">
                        Clear All
                      </button>
                    </div>
                    <div className="flex flex-col">
                      {history.map((h, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setSearchQuery(h);
                            inputRef.current?.focus();
                          }}
                          className="flex items-center gap-3 py-3 border-b border-slate-900 hover:bg-slate-900/40 text-left text-sm font-semibold text-slate-200"
                        >
                          <History size={16} className="text-slate-500 shrink-0" />
                          <span className="flex-1 truncate">{h}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                <div>
                  <span className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <Sparkles size={14} /> Recommended Topics
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_SEARCHES.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSearchQuery(s);
                          inputRef.current?.focus();
                        }}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800/80 rounded-full text-xs font-bold text-slate-200 transition-all hover:scale-102 active:scale-98"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Book Navigation Quick Links */}
                <div>
                  <span className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <BookOpen size={14} /> Start Reading Quick Links
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Link
                      href="/book/p0-setup"
                      onClick={() => handleSelectResult('Developer Setup')}
                      className="flex items-center gap-3 p-3 bg-slate-900 hover:bg-slate-850 border border-slate-800/80 rounded-xl transition-all font-bold text-sm text-slate-200"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center border border-blue-500/30">💻</div>
                      <span>P0: OS & Developer Setup</span>
                    </Link>
                    <Link
                      href="/book/p3-1-basics"
                      onClick={() => handleSelectResult('JS Basics')}
                      className="flex items-center gap-3 p-3 bg-slate-900 hover:bg-slate-850 border border-slate-800/80 rounded-xl transition-all font-bold text-sm text-slate-200"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-600/20 flex items-center justify-center border border-amber-500/30">⚡</div>
                      <span>P3: JS Basics Course</span>
                    </Link>
                  </div>
                </div>

              </div>
            )}

            {/* Case B: Query Entered */}
            {searchQuery && (
              <div className="space-y-4">

                {/* AI Search Mode Result Panel */}
                {isAiMode && (
                  <div>
                    {isGenerating ? (
                      /* Gemini Loading Shimmer */
                      <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 p-[1.5px] rounded-2xl animate-pulse shadow-md max-w-2xl mx-auto my-4">
                        <div className="bg-slate-950 p-6 rounded-[15px] space-y-4 text-left">
                          <div className="flex items-center gap-2 text-xs font-black text-slate-400">
                            <Sparkles size={14} className="text-purple-400 animate-spin" />
                            <span>Nextsem AI is formulating conceptual overview...</span>
                          </div>
                          <div className="h-4 bg-slate-900 rounded w-3/4"></div>
                          <div className="h-3 bg-slate-900 rounded w-5/6"></div>
                          <div className="h-3 bg-slate-900 rounded w-2/3"></div>
                        </div>
                      </div>
                    ) : (
                      aiResponse && (
                        /* AI Overview Card */
                        <div className="bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-emerald-500/20 p-[1.5px] rounded-2xl shadow-xl max-w-2xl mx-auto my-4 animate-in fade-in slide-in-from-bottom duration-300">
                          <div className="bg-[#0b0f19] p-5 md:p-6 rounded-[15px] text-left">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="p-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg">
                                <Sparkles size={16} />
                              </div>
                              <div>
                                <h3 className="text-sm md:text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 uppercase tracking-wide">
                                  {aiResponse.title}
                                </h3>
                                <p className="text-[9px] text-slate-500 font-extrabold uppercase">AI Generated Concept Overview</p>
                              </div>
                            </div>
                            
                            <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-medium mb-5">
                              {aiResponse.summary}
                            </p>

                            {aiResponse.code && (
                              <div className="mb-5">
                                <span className="block text-[9px] font-black uppercase text-slate-500 mb-1.5">Code Snippet:</span>
                                <pre className="p-4 bg-[#050811] border border-slate-900 rounded-xl font-mono text-[10px] md:text-xs text-blue-400 overflow-x-auto leading-relaxed max-h-40 shadow-inner">
                                  <code>{aiResponse.code}</code>
                                </pre>
                              </div>
                            )}

                            <div className="flex items-center justify-between border-t border-slate-900/60 pt-4">
                              <span className="text-[10px] text-slate-500 font-bold">Source: Nextsem Curriculum</span>
                              <Link
                                href={getChapterUrl(aiResponse.chapter)}
                                onClick={() => handleSelectResult(aiResponse.title)}
                                className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-wider"
                              >
                                <span>Explore Chapter</span>
                                <span>→</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}

                {/* Standard Results list */}
                <div className="space-y-6">
                  {/* Nextsem Suggested Results */}
                  <div className="space-y-4">
                    <span className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-4 pt-2">
                      {isAiMode ? "Curriculum References" : "Nextsem Suggested Results"} ({results.length})
                    </span>

                    {results.length > 0 ? (
                      <div className="flex flex-col gap-4">
                        {results.map((item) => (
                          <Link
                            key={item.id}
                            href={getChapterUrl(item.id)}
                            onClick={() => handleSelectResult(item.title)}
                            className="flex flex-col sm:flex-row gap-4 p-3 bg-slate-900/30 hover:bg-slate-900/80 border border-slate-850 rounded-2xl transition-all duration-300 group hover:border-blue-500/40 shadow-sm"
                          >
                            {/* Thumbnail */}
                            <div className="aspect-video w-full sm:w-48 bg-slate-950 rounded-xl flex flex-col items-center justify-center border border-slate-850/80 shadow-md relative overflow-hidden shrink-0 group-hover:scale-[1.02] transition-transform duration-300">
                              <div className={`absolute inset-0 opacity-15 bg-gradient-to-br ${item.color} blur-xl`} />
                              
                              <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center text-2xl font-black shadow-lg border border-white/20 relative z-10 group-hover:rotate-6 transition-transform duration-300`}>
                                {item.icon}
                              </div>
                              <span className="absolute bottom-2 right-2 bg-black/80 text-[10px] font-black uppercase px-2 py-0.5 rounded border border-white/10 tracking-widest text-slate-250 z-10">
                                {item.phase}
                              </span>
                            </div>

                            {/* Metadata */}
                            <div className="flex flex-col justify-center flex-1 text-left">
                              <h4 className="text-base md:text-lg font-black text-white leading-snug group-hover:text-blue-400 transition-colors mb-1.5">
                                {highlightText(item.title, searchQuery)}
                              </h4>
                              
                              <div className="flex items-center gap-2 text-xs text-slate-400 font-bold mb-2">
                                <span>Nextsem Academy</span>
                                <span>•</span>
                                <span>{item.duration}</span>
                              </div>
                              
                              <p className="text-xs md:text-sm text-slate-400 font-medium leading-relaxed bg-slate-900/40 border border-slate-850/20 px-3 py-2 rounded-lg font-mono overflow-x-hidden text-ellipsis whitespace-nowrap sm:whitespace-normal">
                                {highlightText(item.excerpt, searchQuery)}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      /* Only show no local results message if not generating */
                      !isGenerating && (
                        <div className="text-center py-10 border border-dashed border-slate-855 rounded-2xl bg-slate-900/10">
                          <span className="block text-2xl mb-2">🔍</span>
                          <h4 className="text-xs font-black text-slate-400 mb-1">No Matching Academy Tutorials</h4>
                          <p className="text-[10px] text-slate-500 max-w-xs mx-auto">
                            No internal tutorials match &quot;{searchQuery}&quot;. Please refer to the external search resources below.
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* External Web Search fallback shortcuts (replaces Google CSE element) */}
            {!isAiMode && searchQuery.trim() !== '' && (
              <div className="bg-slate-900/30 p-5 rounded-2xl border border-slate-850 text-left animate-in fade-in duration-200 mt-6">
                <span className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5 font-bold">
                  <ExternalLink size={13} className="text-blue-400" />
                  <span>Search on External Developer Resources</span>
                </span>
                <p className="text-[11px] text-slate-500 font-semibold mb-4 leading-relaxed">
                  If you did not find what you were looking for in the Nextsem Academy curriculum, try searching directly on these trusted developer platforms:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank', 'noopener,noreferrer')}
                    className="flex items-center gap-2.5 px-3 py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-855 rounded-xl text-xs font-bold text-slate-300 transition-all active:scale-97 cursor-pointer hover:border-blue-500/30"
                  >
                    <Search size={12} className="text-blue-500 shrink-0" />
                    <span className="truncate">Google Search</span>
                  </button>
                  <button
                    onClick={() => window.open(`https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(searchQuery)}`, '_blank', 'noopener,noreferrer')}
                    className="flex items-center gap-2.5 px-3 py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-855 rounded-xl text-xs font-bold text-slate-300 transition-all active:scale-97 cursor-pointer hover:border-orange-500/30"
                  >
                    <BookOpen size={12} className="text-orange-500 shrink-0" />
                    <span className="truncate">MDN Web Docs</span>
                  </button>
                  <button
                    onClick={() => window.open(`https://stackoverflow.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank', 'noopener,noreferrer')}
                    className="flex items-center gap-2.5 px-3 py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-855 rounded-xl text-xs font-bold text-slate-300 transition-all active:scale-97 cursor-pointer hover:border-amber-500/30"
                  >
                    <Code size={12} className="text-amber-500 shrink-0" />
                    <span className="truncate">Stack Overflow</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Nextsem Lens: AI Document & OMR Scanner Modal Overlay */}
      {isLensOpen && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[1000] flex items-center justify-center p-4 select-none animate-in fade-in duration-200">
          <div className="bg-[#0b0f19] border border-slate-855 max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="bg-slate-950 px-6 py-4 border-b border-slate-855 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h2 className="text-sm md:text-base font-black text-white uppercase tracking-wider">Nextsem Lens</h2>
                  <p className="text-[10px] text-slate-500 font-extrabold uppercase">AI Document OCR & OMR Scanner</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsLensOpen(false);
                  setSelectedFile(null);
                  setLensResult(null);
                }} 
                className="p-1 bg-slate-900 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-5 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-6 text-left">
              
              {/* Left 3 Cols: File Selection and OCR/OMR Processing */}
              <div className="md:col-span-3 flex flex-col justify-between space-y-4">
                
                {/* Mode Selector pills */}
                <div>
                  <span className="block text-[10px] font-black uppercase text-slate-500 mb-2">Scanner Mode</span>
                  <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-900 gap-1">
                    <button 
                      onClick={() => {
                        setLensMode("ocr");
                        setLensResult(null);
                      }}
                      className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                        lensMode === "ocr" 
                          ? "bg-blue-600 text-white shadow-lg" 
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      🔍 OCR Text Scan
                    </button>
                    <button 
                      onClick={() => {
                        setLensMode("omr");
                        setLensResult(null);
                      }}
                      className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                        lensMode === "omr" 
                          ? "bg-blue-600 text-white shadow-lg" 
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      📝 OMR Grading
                    </button>
                  </div>
                </div>

                {/* Drop/Select Upload Area */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 min-h-[160px] border-2 border-dashed border-slate-800 hover:border-blue-500/50 rounded-2xl flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all bg-slate-950/40"
                >
                  <input 
                    ref={fileInputRef} 
                    type="file" 
                    accept="image/*,application/pdf" 
                    className="hidden" 
                    onChange={handleFileUpload}
                  />
                  <UploadCloud size={36} className="text-blue-500 mb-2.5 animate-bounce" />
                  <h4 className="text-xs md:text-sm font-black text-slate-200">
                    Click to browse or drop file here
                  </h4>
                  <p className="text-[10px] text-slate-500 font-bold mt-1">
                    Supports JPG, PNG images or PDF files (Max 8MB)
                  </p>
                </div>

                {/* Processing/Loading visual */}
                {isScanning && (
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin shrink-0" />
                    <div className="flex-1 text-left">
                      <span className="block text-xs font-black text-slate-300">
                        {lensMode === "ocr" ? "Running Optical Character Recognition..." : "Analyzing OMR option bubbles..."}
                      </span>
                      <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-1.5 border border-slate-850">
                        <div className="bg-blue-500 h-full w-[60%] animate-[pulse_1s_infinite]" />
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Right 2 Cols: Demo files & Quick Result display */}
              <div className="md:col-span-2 flex flex-col space-y-4">
                
                {/* Demo Quick Test Files */}
                <div>
                  <span className="block text-[10px] font-black uppercase text-slate-500 mb-2">Quick Test Files</span>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => startLensProcess("homework_assignment.png", "124 KB")}
                      className="flex items-center gap-2.5 p-2.5 bg-slate-950/80 border border-slate-900 hover:border-slate-800 hover:bg-slate-900/60 rounded-xl transition-all text-left text-xs font-bold text-slate-300 cursor-pointer"
                    >
                      <FileText size={14} className="text-orange-500 shrink-0" />
                      <div>
                        <span className="block truncate">homework_assignment.png</span>
                        <span className="text-[9px] text-slate-500">HTML Homework sample</span>
                      </div>
                    </button>
                    <button
                      onClick={() => startLensProcess("syllabus_roadmap.pdf", "1.4 MB")}
                      className="flex items-center gap-2.5 p-2.5 bg-slate-950/80 border border-slate-900 hover:border-slate-800 hover:bg-slate-900/60 rounded-xl transition-all text-left text-xs font-bold text-slate-300 cursor-pointer"
                    >
                      <FileText size={14} className="text-blue-500 shrink-0" />
                      <div>
                        <span className="block truncate">syllabus_roadmap.pdf</span>
                        <span className="text-[9px] text-slate-500">React syllabus sample</span>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        setLensMode("omr");
                        startLensProcess("midterm_omr_test.png", "84 KB");
                      }}
                      className="flex items-center gap-2.5 p-2.5 bg-slate-950/80 border border-slate-900 hover:border-slate-800 hover:bg-slate-900/60 rounded-xl transition-all text-left text-xs font-bold text-slate-300 cursor-pointer"
                    >
                      <FileText size={14} className="text-emerald-500 shrink-0" />
                      <div>
                        <span className="block truncate">midterm_omr_test.png</span>
                        <span className="text-[9px] text-slate-500">OMR exam sheet sample</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* File Selected Status */}
                {selectedFile && !isScanning && (
                  <div className="bg-slate-950/70 border border-slate-900 p-3 rounded-xl text-left select-text">
                    <span className="block text-[9px] font-black uppercase text-slate-500 mb-1">Target Document</span>
                    <h5 className="text-xs font-bold text-white truncate">{selectedFile.name}</h5>
                    <p className="text-[9px] text-slate-500 font-bold">{selectedFile.size}</p>
                  </div>
                )}

              </div>
            </div>

            {/* Scan Output panel footer (if scanning completed) */}
            {lensResult && !isScanning && (
              <div className="bg-[#0e1423] border-t border-slate-855 p-5 shrink-0 text-left select-text overflow-y-auto max-h-56">
                
                {/* Result Mode: OCR */}
                {lensMode === "ocr" ? (
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-1.5 text-xs font-black text-blue-400 uppercase tracking-wide">
                      <Sparkles size={14} />
                      <span>Extracted OCR Content</span>
                    </div>
                    <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-[#060910] border border-slate-900 p-3.5 rounded-xl font-mono">
                      &quot;{(lensResult as LensOcrResult).extractedText}&quot;
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-[9px] font-black uppercase text-slate-500">Detected Topics:</span>
                      {(lensResult as LensOcrResult).queries.map((q: string, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSearchQuery(q);
                            setIsLensOpen(false);
                            setIsOpen(true);
                            setTimeout(() => {
                              inputRef.current?.focus();
                            }, 200);
                          }}
                          className="px-2.5 py-1 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 text-[10px] font-black rounded-full transition-all cursor-pointer"
                        >
                          🔍 Search: {q}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Result Mode: OMR */
                  (() => {
                    const omrResult = lensResult as LensOmrResult;
                    return (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1.5 text-xs font-black text-emerald-400 uppercase tracking-wide">
                            <CheckCircle2 size={14} />
                            <span>OMR Evaluation Results</span>
                          </div>
                          <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/25 rounded-lg text-emerald-400 text-xs font-black">
                            Score: {omrResult.score} / {omrResult.total} ({omrResult.percentage}%)
                          </div>
                        </div>
                        
                        {/* OMR bubble grading spreadsheet grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#060910] border border-slate-900 p-3.5 rounded-xl">
                          {omrResult.answers.map((ans, idx: number) => (
                            <div 
                              key={idx} 
                              className="flex items-center justify-between p-2 bg-[#0b0f19] border border-slate-855 rounded-lg text-[10px] font-bold"
                            >
                              <span className="text-slate-500">Q{ans.q}:</span>
                              <span className="text-white">Opt: {ans.selected}</span>
                              {ans.status === "correct" ? (
                                <CheckCircle2 size={12} className="text-emerald-500" />
                              ) : (
                                <div className="flex items-center gap-1">
                                  <span className="text-slate-500 font-extrabold font-mono">({ans.correct})</span>
                                  <XCircle size={12} className="text-rose-500" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()
                )}
              </div>
            )}

          </div>
        </div>
      )}

      {/* Auth Error Guidance Modal */}
      {authError && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[1020] flex items-center justify-center p-4 select-none animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 max-w-md w-full rounded-3xl p-6 shadow-2xl text-left space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2 text-amber-500">
              <Sparkles size={20} className="animate-pulse" />
              <h3 className="text-base font-black uppercase tracking-wide">Firebase Activation Required</h3>
            </div>
            
            <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
              Google Sign-In has not been enabled in the Firebase Console for your project <code className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded font-mono text-[10px] text-blue-500 font-bold">bca-nextsem</code> yet.
            </p>

            <div className="space-y-3 pt-1">
              <span className="block text-[10px] font-black uppercase text-slate-400">How to activate Google Sign-In:</span>
              
              <div className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <a 
                    href="https://console.firebase.google.com/project/bca-nextsem/authentication" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-black text-blue-500 hover:underline"
                  >
                    Open Firebase Auth Console ↗
                  </a>
                  <span className="block text-[10px] text-slate-500 mt-0.5">Click &quot;Get Started&quot; if not already enabled.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <span className="font-black text-slate-800 dark:text-white">Enable Google Provider</span>
                  <span className="block text-[10px] text-slate-500 mt-0.5">Go to the &quot;Sign-in method&quot; tab, click &quot;Add new provider&quot;, select &quot;Google&quot;, and save.</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-900 flex justify-end gap-2">
              <button
                onClick={() => setAuthError(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Google Sign-in Trigger Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-[1010] flex items-center justify-center p-4 select-none animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 max-w-sm w-full rounded-3xl p-6 shadow-2xl text-center space-y-5 animate-in zoom-in-95 duration-150">
            {/* Google G Logo */}
            <div className="flex justify-center">
              <svg className="w-9 h-9" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </div>
            
            <div>
              <h3 className="text-lg font-black text-slate-800 dark:text-white">Sign in with Google</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-bold">Secure login using Google Auth</p>
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2.5 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-sm shadow-md hover:-translate-y-0.5 transition-all active:scale-95 cursor-pointer"
            >
              Continue to Google Sign-In
            </button>

            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white pt-2 block w-full text-center cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchWidget;
