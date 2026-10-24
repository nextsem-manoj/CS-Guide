"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { 
  Check, Sparkles, Code2, Copy, CheckCircle2, 
  XCircle, ArrowRight, RotateCcw, Laptop, Globe, 
  GitBranch, HelpCircle
} from "lucide-react";
import { PracticalLesson } from "@/data/bcaPracticalData";
import { useStudentProgress } from "@/context/StudentProgressContext";
import { verifyStudentGitHubCode, GitHubCodeCheckResult } from "@/lib/githubCodeVerifier";
import Day1GitHubRepoCreationGuide from "@/components/bca/Day1GitHubRepoCreationGuide";
import { useCrossDeviceSync } from "@/context/CrossDeviceSyncContext";
import { safeInstantCopy } from "@/lib/clipboard";

interface LineByLineStep {
  lineNumber: number;
  expectedTag: string;
  category: "declaration" | "structure" | "meta" | "content" | "closing";
  explanation: {
    title: string;
    description: string;
    whyItMatters: string;
    analogy?: string;
  };
  options: {
    id: string;
    code: string;
    isCorrect: boolean;
    hintOnWrong: string;
  }[];
  previewEffect?: {
    tabTitle?: string;
    bodyHtml?: string;
  };
}

// ── 11 INTERACTIVE LINE-BY-LINE STEPS FOR DAY 1 ──
const DAY_1_STEPS: LineByLineStep[] = [
  {
    lineNumber: 1,
    expectedTag: "<!DOCTYPE html>",
    category: "declaration",
    explanation: {
      title: "Line 1: Document Type Declaration",
      description: "Every modern webpage MUST start with <!DOCTYPE html> on the very first line.",
      whyItMatters: "Tells Google Chrome, Edge, and Safari to run in modern W3C Standards mode instead of broken 1990s quirks mode.",
      analogy: "Like showing a passport at border control before entering the web world!"
    },
    options: [
      { id: "opt-1", code: "<!DOCTYPE html>", isCorrect: true, hintOnWrong: "" },
      { id: "opt-2", code: "<doctype html5>", isCorrect: false, hintOnWrong: "HTML5 doesn't use '<doctype html5>'. The standard tag is '<!DOCTYPE html>'." },
      { id: "opt-3", code: "<html version=\"5\">", isCorrect: false, hintOnWrong: "HTML5 eliminated version numbers. Use '<!DOCTYPE html>'." },
      { id: "opt-4", code: "<!-- HTML5 -->", isCorrect: false, hintOnWrong: "That is just a comment, not the document declaration!" },
    ]
  },
  {
    lineNumber: 2,
    expectedTag: "<html lang=\"en\">",
    category: "structure",
    explanation: {
      title: "Line 2: The Root HTML Element",
      description: "The <html> tag is the root container of your entire document. The attribute lang=\"en\" declares that the page is in English.",
      whyItMatters: "Screen readers and search engines need to know the primary language to pronounce and index words properly.",
      analogy: "Think of <html> as the outer covers of a book that hold all the pages inside."
    },
    options: [
      { id: "opt-1", code: "<html lang=\"en\">", isCorrect: true, hintOnWrong: "" },
      { id: "opt-2", code: "<webpage language=\"en\">", isCorrect: false, hintOnWrong: "There is no '<webpage>' tag in HTML. The root tag is '<html>'." },
      { id: "opt-3", code: "<document lang=\"english\">", isCorrect: false, hintOnWrong: "The root element is '<html>' and language code is 'en'." },
      { id: "opt-4", code: "<root html=\"5\">", isCorrect: false, hintOnWrong: "'<root>' is used in XML, not HTML. Tap '<html lang=\"en\">'." },
    ]
  },
  {
    lineNumber: 3,
    expectedTag: "<head>",
    category: "structure",
    explanation: {
      title: "Line 3: The Head (Page Settings)",
      description: "The <head> element contains behind-the-scenes metadata, page titles, and stylesheet links.",
      whyItMatters: "Visitors do not see <head> elements painted directly on the page; it provides essential configuration to the browser.",
      analogy: "Think of <head> as the hidden engine under the hood of a car."
    },
    options: [
      { id: "opt-1", code: "<head>", isCorrect: true, hintOnWrong: "" },
      { id: "opt-2", code: "<header>", isCorrect: false, hintOnWrong: "'<header>' is for visual page banners in <body>. For metadata, use '<head>'." },
      { id: "opt-3", code: "<meta-container>", isCorrect: false, hintOnWrong: "The standard HTML tag is simply '<head>'." },
      { id: "opt-4", code: "<brain>", isCorrect: false, hintOnWrong: "While it acts like a brain, the HTML tag is called '<head>'!" },
    ]
  },
  {
    lineNumber: 4,
    expectedTag: "  <meta charset=\"UTF-8\">",
    category: "meta",
    explanation: {
      title: "Line 4: Universal Character Encoding",
      description: "Specifies that the document uses UTF-8 encoding (supporting universal alphabets, mathematical signs, and emojis).",
      whyItMatters: "Prevents text corruption (like strange symbols or '') across international browsers.",
      analogy: "Like a universal translator for every language and emoji on the planet!"
    },
    options: [
      { id: "opt-1", code: "  <meta charset=\"UTF-8\">", isCorrect: true, hintOnWrong: "" },
      { id: "opt-2", code: "  <charset encoding=\"utf8\">", isCorrect: false, hintOnWrong: "Charset is an attribute of the '<meta>' tag: '<meta charset=\"UTF-8\">'." },
      { id: "opt-3", code: "  <text-format=\"UTF-8\">", isCorrect: false, hintOnWrong: "Use the standard '<meta charset=\"UTF-8\">' tag." },
      { id: "opt-4", code: "  <encoding type=\"universal\">", isCorrect: false, hintOnWrong: "The official HTML5 tag is '<meta charset=\"UTF-8\">'." },
    ]
  },
  {
    lineNumber: 5,
    expectedTag: "  <title>My First BCA Webpage</title>",
    category: "meta",
    explanation: {
      title: "Line 5: Browser Tab Title",
      description: "The <title> tag sets the title that appears on the browser tab and in Google Search results.",
      whyItMatters: "Without a <title>, the browser tab will awkwardly display the file's raw disk path (e.g. C:/Users/...).",
      analogy: "The title on the tab is like the nametag on your college desk!"
    },
    options: [
      { id: "opt-1", code: "  <title>My First BCA Webpage</title>", isCorrect: true, hintOnWrong: "" },
      { id: "opt-2", code: "  <tab-title>My First BCA Webpage</tab-title>", isCorrect: false, hintOnWrong: "Browser tabs use the '<title>' tag, not '<tab-title>'." },
      { id: "opt-3", code: "  <heading>My First BCA Webpage</heading>", isCorrect: false, hintOnWrong: "'<heading>' is not an HTML tag. Use '<title>' inside <head>." },
      { id: "opt-4", code: "  <name>My First BCA Webpage</name>", isCorrect: false, hintOnWrong: "Use '<title>' for browser tab titles." },
    ],
    previewEffect: {
      tabTitle: "My First BCA Webpage"
    }
  },
  {
    lineNumber: 6,
    expectedTag: "</head>",
    category: "closing",
    explanation: {
      title: "Line 6: Close the Head Element",
      description: "In HTML, container tags that open with <tag> must close with a forward slash </tag>.",
      whyItMatters: "Tells the browser engine that all metadata is finished so it can begin parsing visible page content.",
      analogy: "Zipping up your backpack after packing all your tools!"
    },
    options: [
      { id: "opt-1", code: "</head>", isCorrect: true, hintOnWrong: "" },
      { id: "opt-2", code: "<head/>", isCorrect: false, hintOnWrong: "'<head>' is a container tag and must be closed with '</head>'." },
      { id: "opt-3", code: "<close-head>", isCorrect: false, hintOnWrong: "Closing tags in HTML always use a forward slash: '</head>'." },
      { id: "opt-4", code: "<endhead>", isCorrect: false, hintOnWrong: "Use standard '</head>' syntax." },
    ]
  },
  {
    lineNumber: 7,
    expectedTag: "<body>",
    category: "structure",
    explanation: {
      title: "Line 7: The Visible Body Element",
      description: "The <body> tag holds everything that the user actually sees on the screen: headings, paragraphs, images, and buttons.",
      whyItMatters: "Any visible tag placed outside <body> is invalid HTML and can cause layout bugs.",
      analogy: "Think of <body> as the blank white canvas in an art studio."
    },
    options: [
      { id: "opt-1", code: "<body>", isCorrect: true, hintOnWrong: "" },
      { id: "opt-2", code: "<content>", isCorrect: false, hintOnWrong: "There is no '<content>' container tag in standard HTML. Use '<body>'." },
      { id: "opt-3", code: "<main-page>", isCorrect: false, hintOnWrong: "The standard container for visible elements is '<body>'." },
      { id: "opt-4", code: "<screen>", isCorrect: false, hintOnWrong: "HTML uses '<body>' for all visible page elements." },
    ]
  },
  {
    lineNumber: 8,
    expectedTag: "  <h1>Welcome to BCA Practical Portal</h1>",
    category: "content",
    explanation: {
      title: "Line 8: Top-Level Heading (H1)",
      description: "<h1> represents the primary, most important heading on a webpage.",
      whyItMatters: "Search engines (SEO) and screen readers treat <h1> as the definitive topic of your page. You should only have one <h1> per page.",
      analogy: "Like the headline on the front page of a newspaper!"
    },
    options: [
      { id: "opt-1", code: "  <h1>Welcome to BCA Practical Portal</h1>", isCorrect: true, hintOnWrong: "" },
      { id: "opt-2", code: "  <heading1>Welcome to BCA Practical Portal</heading1>", isCorrect: false, hintOnWrong: "HTML headings use 'h1' through 'h6', not '<heading1>'." },
      { id: "opt-3", code: "  <big-text>Welcome to BCA Practical Portal</big-text>", isCorrect: false, hintOnWrong: "Use standard '<h1>' for top-level headings." },
      { id: "opt-4", code: "  <title1>Welcome to BCA Practical Portal</title1>", isCorrect: false, hintOnWrong: "'<title>' belongs in the head. Use '<h1>' for visible headings inside <body>." },
    ],
    previewEffect: {
      bodyHtml: "<h1 class=\"text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2\">Welcome to BCA Practical Portal</h1>"
    }
  },
  {
    lineNumber: 9,
    expectedTag: "  <p>Today is Day 1 of my coding journey into computer software!</p>",
    category: "content",
    explanation: {
      title: "Line 9: Body Paragraph (P)",
      description: "The <p> tag defines a paragraph of regular body text.",
      whyItMatters: "Browsers automatically add clean vertical margins before and after paragraphs so text is comfortable to read.",
      analogy: "A paragraph of text in a textbook!"
    },
    options: [
      { id: "opt-1", code: "  <p>Today is Day 1 of my coding journey into computer software!</p>", isCorrect: true, hintOnWrong: "" },
      { id: "opt-2", code: "  <paragraph>Today is Day 1 of my coding journey into computer software!</paragraph>", isCorrect: false, hintOnWrong: "HTML shortens paragraph to just '<p>' and '</p>'." },
      { id: "opt-3", code: "  <text>Today is Day 1 of my coding journey into computer software!</text>", isCorrect: false, hintOnWrong: "Standard HTML body text uses the '<p>' element." },
      { id: "opt-4", code: "  <para>Today is Day 1 of my coding journey into computer software!</para>", isCorrect: false, hintOnWrong: "The correct tag is '<p>'." },
    ],
    previewEffect: {
      bodyHtml: "<p class=\"text-sm text-slate-600 dark:text-slate-300 leading-relaxed\">Today is Day 1 of my coding journey into computer software!</p>"
    }
  },
  {
    lineNumber: 10,
    expectedTag: "</body>",
    category: "closing",
    explanation: {
      title: "Line 10: Closing the Body Element",
      description: "Closes the visible content area of the document.",
      whyItMatters: "Tells the browser that all user-facing content (headings, paragraphs, buttons) has ended.",
      analogy: "Closing the stage curtain after the performance!"
    },
    options: [
      { id: "opt-1", code: "</body>", isCorrect: true, hintOnWrong: "" },
      { id: "opt-2", code: "<body-end>", isCorrect: false, hintOnWrong: "HTML closing tags always use a slash: '</body>'." },
      { id: "opt-3", code: "</content>", isCorrect: false, hintOnWrong: "Close the matching body tag with '</body>'." },
      { id: "opt-4", code: "<close-body>", isCorrect: false, hintOnWrong: "Use standard '</body>' syntax." },
    ]
  },
  {
    lineNumber: 11,
    expectedTag: "</html>",
    category: "closing",
    explanation: {
      title: "Line 11: Closing the Root HTML Document",
      description: "The final tag in every valid HTML5 document.",
      whyItMatters: "Signals to the browser that the entire document tree is complete. Your page is now 100% W3C Standards Compliant!",
      analogy: "Closing the back cover of the book. You're done!"
    },
    options: [
      { id: "opt-1", code: "</html>", isCorrect: true, hintOnWrong: "" },
      { id: "opt-2", code: "</webpage>", isCorrect: false, hintOnWrong: "The root tag is '<html>', so close it with '</html>'." },
      { id: "opt-3", code: "<end-document>", isCorrect: false, hintOnWrong: "Use '</html>' to close the document." },
      { id: "opt-4", code: "<!-- EOF -->", isCorrect: false, hintOnWrong: "Close the root element with '</html>'." },
    ]
  }
];

interface Props {
  lesson: PracticalLesson;
}

export default function LineByLineInteractiveStudio({ lesson }: Props) {
  const { copyAndSyncToCloud } = useCrossDeviceSync();
  const { 
    user, 
    isDayCompleted, 
    completeDayWithGitHub, 
    githubRepoUrls 
  } = useStudentProgress();

  const isCompleted = isDayCompleted(lesson.day);

  // Active step index (0 to 10 for lines 1 to 11)
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [wrongAttemptHint, setWrongAttemptHint] = useState<string | null>(null);
  const [justAddedLine, setJustAddedLine] = useState<number | null>(null);
  const [tabMode, setTabMode] = useState<"code" | "preview">("code");
  const [copiedAssembled, setCopiedAssembled] = useState<boolean>(false);
  const [copiedVsCodeCmd, setCopiedVsCodeCmd] = useState<boolean>(false);
  const [copiedGitCmd, setCopiedGitCmd] = useState<boolean>(false);

  // Phase: "interactive" | "vscode_github"
  const [studioPhase, setStudioPhase] = useState<"interactive" | "vscode_github">("interactive");

  // GitHub Auto-Verification State
  const savedRepoKey = "nextsem_student_github_repo";
  const [githubUrl, setGithubUrl] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationResult, setVerificationResult] = useState<GitHubCodeCheckResult | null>(null);
  const [autoVerifySuccess, setAutoVerifySuccess] = useState<boolean>(isCompleted);

  // Load saved GitHub repository
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(savedRepoKey) || githubRepoUrls[lesson.day.toString()] || "";
      if (stored) {
        setGithubUrl(stored);
      }
    }
  }, [lesson.day, githubRepoUrls]);

  // If already completed in past, user can still review or replay
  useEffect(() => {
    if (isCompleted) {
      setAutoVerifySuccess(true);
    }
  }, [isCompleted]);

  const activeStep = DAY_1_STEPS[currentStepIndex] || DAY_1_STEPS[DAY_1_STEPS.length - 1];
  const isAllLinesBuilt = currentStepIndex >= DAY_1_STEPS.length;
  const progressPercent = Math.round((currentStepIndex / DAY_1_STEPS.length) * 100);

  // Click on a pill option
  const handlePillClick = useCallback((option: { id: string; code: string; isCorrect: boolean; hintOnWrong: string }) => {
    if (option.isCorrect) {
      setWrongAttemptHint(null);
      const newLine = activeStep.expectedTag;
      setCompletedLines(prev => [...prev, newLine]);
      setJustAddedLine(activeStep.lineNumber);

      setTimeout(() => {
        setJustAddedLine(null);
      }, 1000);

      // Move to next line
      if (currentStepIndex + 1 < DAY_1_STEPS.length) {
        setCurrentStepIndex(prev => prev + 1);
      } else {
        // All lines completed!
        setCurrentStepIndex(DAY_1_STEPS.length);
        setStudioPhase("vscode_github");
      }
    } else {
      // Wrong attempt
      setWrongAttemptHint(option.hintOnWrong || "Not quite the standard HTML5 tag. Check the explanation and try again!");
    }
  }, [activeStep, currentStepIndex]);

  // Reset interactive builder
  const handleRestart = useCallback(() => {
    setCurrentStepIndex(0);
    setCompletedLines([]);
    setWrongAttemptHint(null);
    setStudioPhase("interactive");
  }, []);

  // Copy Full Assembled Code
  const handleCopyAssembledCode = useCallback(() => {
    const fullCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First BCA Webpage</title>
</head>
<body>
  <h1>Welcome to BCA Practical Portal</h1>
  <p>Today is Day 1 of my coding journey into computer software!</p>
</body>
</html>`;
    copyAndSyncToCloud(fullCode, "Assembled HTML Boilerplate");
    setCopiedAssembled(true);
    setTimeout(() => setCopiedAssembled(false), 2000);
  }, [copyAndSyncToCloud]);

  // Copy VS Code Terminal Command
  const handleCopyVsCodeCmd = useCallback(() => {
    const cmd = "mkdir bca-day-1\ncd bca-day-1\ncode .";
    copyAndSyncToCloud(cmd, "VS Code Terminal Command");
    setCopiedVsCodeCmd(true);
    setTimeout(() => setCopiedVsCodeCmd(false), 2000);
  }, [copyAndSyncToCloud]);

  // Copy Git Push Command
  const handleCopyGitCmd = useCallback(() => {
    const cmd = 'git add .\ngit commit -m "Day 01: Setup HTML5 boilerplate and first page"\ngit push origin main';
    copyAndSyncToCloud(cmd, "Git Push Commands");
    setCopiedGitCmd(true);
    setTimeout(() => setCopiedGitCmd(false), 2000);
  }, [copyAndSyncToCloud]);

  // Auto-Verify on GitHub
  const handleAutoVerifyGitHub = useCallback(async () => {
    const trimmedUrl = githubUrl.trim();
    if (!trimmedUrl) {
      setVerificationResult({
        success: false,
        owner: "",
        repo: "",
        passedItems: [],
        missingItems: ["GitHub URL missing"],
        message: "Please enter your GitHub repository URL (e.g. https://github.com/username/bca-day-1)."
      });
      return;
    }

    // Save for future days so user never has to retype
    try {
      localStorage.setItem(savedRepoKey, trimmedUrl);
    } catch {}

    setIsVerifying(true);
    setVerificationResult(null);

    try {
      const result = await verifyStudentGitHubCode(trimmedUrl, lesson);
      setVerificationResult(result);

      if (result.success) {
        await completeDayWithGitHub(lesson.day, trimmedUrl);
        setAutoVerifySuccess(true);
      }
    } catch {
      setVerificationResult({
        success: false,
        owner: "",
        repo: "",
        passedItems: [],
        missingItems: ["Verification service error"],
        message: "Network error checking GitHub. You can also use the Instant Local Practice Verification button below."
      });
    } finally {
      setIsVerifying(false);
    }
  }, [githubUrl, lesson, completeDayWithGitHub]);

  // Fallback: Instant Local Practice Verification
  const handleInstantLocalVerify = useCallback(async () => {
    const fallbackUrl = githubUrl.trim() || `https://github.com/${user?.name?.toLowerCase().replace(/\s+/g, '-') || 'student'}/bca-practicals`;
    try {
      localStorage.setItem(savedRepoKey, fallbackUrl);
    } catch {}

    await completeDayWithGitHub(lesson.day, fallbackUrl);
    setAutoVerifySuccess(true);
  }, [githubUrl, user, lesson.day, completeDayWithGitHub]);

  // Dynamic Browser preview state
  const browserTabTitle = useMemo(() => {
    return completedLines.some(l => l.includes("<title>")) ? "My First BCA Webpage" : "Untitled Document";
  }, [completedLines]);

  const hasH1 = completedLines.some(l => l.includes("<h1>"));
  const hasP = completedLines.some(l => l.includes("<p>"));

  return (
    <div className="w-full flex flex-col space-y-4">

      {/* ── TOP COMPACT HUD: Title, Line Counter & Phase Switcher ── */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#0c1328] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600/10 dark:bg-emerald-500/10 border border-blue-600/30 dark:border-emerald-500/30 flex items-center justify-center text-blue-600 dark:text-emerald-400 font-bold shrink-0">
            <Sparkles size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-emerald-950/60 text-blue-600 dark:text-emerald-400 border border-blue-200 dark:border-emerald-500/30 uppercase">
                Interactive Line-by-Line Studio
              </span>
              <span className="text-xs font-mono text-slate-500">
                Day {lesson.day} • {lesson.category}
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-black text-black dark:text-white tracking-tight">
              {lesson.title}
            </h1>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 dark:bg-neutral-900 p-1 rounded-xl border border-slate-200 dark:border-neutral-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => setStudioPhase("interactive")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              studioPhase === "interactive"
                ? "bg-blue-600 dark:bg-emerald-500 text-white dark:text-black shadow-xs font-extrabold"
                : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
            }`}
          >
            <Code2 size={13} />
            <span>1. Build Line-by-Line</span>
          </button>

          <button
            type="button"
            onClick={() => setStudioPhase("vscode_github")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              studioPhase === "vscode_github"
                ? "bg-blue-600 dark:bg-emerald-500 text-white dark:text-black shadow-xs font-extrabold"
                : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
            }`}
          >
            <GitBranch size={13} />
            <span>2. VS Code &amp; Auto-GitHub</span>
            {autoVerifySuccess && <Check size={12} className="stroke-[3] text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* ── PROGRESS BAR ── */}
      <div className="w-full bg-slate-200 dark:bg-neutral-900 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-emerald-500 dark:to-teal-400 h-full rounded-full transition-all duration-300"
          style={{ width: `${studioPhase === "vscode_github" ? 100 : progressPercent}%` }}
        />
      </div>


      {/* ════════════════════════════════════════════════════════════════
          PHASE 1: INTERACTIVE LINE-BY-LINE CODE BUILDER (LOW SCROLL)
      ════════════════════════════════════════════════════════════════ */}
      {studioPhase === "interactive" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          
          {/* ── LEFT 6 COLUMNS: LIVE CODE ASSEMBLED + LIVE BROWSER PREVIEW ── */}
          <div className="lg:col-span-6 rounded-2xl bg-[#090e1c] border border-slate-800 overflow-hidden shadow-lg flex flex-col">
            
            {/* Window Title Bar & Output Switcher */}
            <div className="px-3.5 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-slate-400 font-bold ml-1">index.html</span>
              </div>

              {/* View Mode Toggle: Code vs Browser Preview */}
              <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setTabMode("code")}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    tabMode === "code"
                      ? "bg-emerald-500 text-black shadow-xs"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Code2 size={11} />
                  <span>Code ({completedLines.length}/11)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTabMode("preview")}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    tabMode === "preview"
                      ? "bg-emerald-500 text-black shadow-xs"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Globe size={11} />
                  <span>Live Browser</span>
                </button>
              </div>
            </div>

            {/* TAB 1: Code View with Line Numbers */}
            {tabMode === "code" ? (
              <div className="p-4 font-mono text-xs leading-relaxed text-slate-200 overflow-x-auto min-h-[300px] flex items-start gap-3">
                {/* Line Numbers Gutter */}
                <div className="text-slate-600 select-none text-right shrink-0">
                  {Array.from({ length: Math.max(11, completedLines.length + 1) }, (_, i) => (
                    <div key={i} className="leading-relaxed">
                      {i + 1}
                    </div>
                  ))}
                </div>

                {/* Code Lines with Syntax Coloring */}
                <div className="space-y-0.5 flex-1">
                  {completedLines.length === 0 && (
                    <div className="text-slate-500 italic text-[11px] py-2">
                      Tap the first pill below to begin assembling line 1...
                    </div>
                  )}

                  {completedLines.map((line, idx) => {
                    const lineNum = idx + 1;
                    const isFresh = justAddedLine === lineNum;
                    return (
                      <div 
                        key={idx}
                        className={`transition-all rounded px-1.5 ${
                          isFresh 
                            ? "bg-emerald-500/30 text-emerald-300 font-bold animate-pulse" 
                            : line.includes("<!DOCTYPE")
                            ? "text-purple-400 font-bold"
                            : line.includes("<html") || line.includes("</html>")
                            ? "text-cyan-400 font-bold"
                            : line.includes("<head") || line.includes("</head>")
                            ? "text-blue-400 font-bold"
                            : line.includes("<body") || line.includes("</body>")
                            ? "text-yellow-400 font-bold"
                            : line.includes("<h1")
                            ? "text-emerald-400 font-bold"
                            : "text-slate-200"
                        }`}
                      >
                        {line}
                      </div>
                    );
                  })}

                  {/* Active Blinking Cursor for next line */}
                  {!isAllLinesBuilt && (
                    <div className="text-emerald-400 font-bold flex items-center gap-1 pt-0.5">
                      <span className="text-slate-500 text-[11px]">Line {currentStepIndex + 1}:</span>
                      <span className="w-2 h-4 bg-emerald-400 animate-pulse" />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* TAB 2: Live Browser Simulation */
              <div className="bg-white dark:bg-neutral-900 rounded-b-2xl overflow-hidden flex flex-col min-h-[300px]">
                {/* Browser Tab Bar */}
                <div className="bg-slate-100 dark:bg-neutral-950 border-b border-slate-200 dark:border-neutral-800 px-3 py-1.5 flex items-center gap-2 text-[11px] font-mono">
                  <div className="px-3 py-1 rounded-t-lg bg-white dark:bg-neutral-900 border-t border-x border-slate-200 dark:border-neutral-800 text-slate-800 dark:text-slate-200 font-bold truncate max-w-[200px] flex items-center gap-1.5 shadow-xs">
                    <Globe size={11} className="text-blue-600 dark:text-emerald-400 shrink-0" />
                    <span className="truncate">{browserTabTitle}</span>
                  </div>
                  <div className="flex-1 bg-white dark:bg-neutral-900 px-2 py-0.5 rounded border border-slate-200 dark:border-neutral-800 text-[10px] text-slate-500 truncate">
                    http://localhost:3000/index.html
                  </div>
                </div>

                {/* Rendered Browser Page Viewport */}
                <div className="p-6 bg-white dark:bg-black flex-1 space-y-3">
                  {!hasH1 && !hasP ? (
                    <div className="h-44 flex flex-col items-center justify-center text-center text-slate-400 space-y-1">
                      <Globe size={24} className="opacity-40 animate-pulse" />
                      <p className="text-xs font-mono">Browser Canvas Empty</p>
                      <p className="text-[11px] text-slate-500 max-w-xs">
                        Assemble through Line 8 (&lt;h1&gt;) to see elements paint live here!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {hasH1 && (
                        <h1 className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight">
                          Welcome to BCA Practical Portal
                        </h1>
                      )}
                      {hasP && (
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          Today is Day 1 of my coding journey into computer software!
                        </p>
                      )}
                      <div className="pt-4 border-t border-slate-100 dark:border-neutral-900 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                        ✓ W3C HTML5 Standards Mode Active
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Bottom Quick Controls */}
            <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Lines Completed: <strong className="text-white">{completedLines.length} / 11</strong></span>
              <button
                type="button"
                onClick={handleRestart}
                className="hover:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer"
                title="Restart Line-by-Line Builder"
              >
                <RotateCcw size={11} />
                <span>Restart</span>
              </button>
            </div>
          </div>


          {/* ── RIGHT 6 COLUMNS: SENIOR DEV EXPLANATION + INTERACTIVE CLICKABLE PILLS ── */}
          <div className="lg:col-span-6 space-y-4">
            
            {!isAllLinesBuilt ? (
              <div className="rounded-2xl bg-white dark:bg-[#0c1328] border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-sm">
                
                {/* Step Header Badge */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-emerald-950/60 border border-blue-200 dark:border-emerald-500/30 text-blue-600 dark:text-emerald-400 text-xs font-mono font-black">
                    Step {activeStep.lineNumber} of 11
                  </span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    Click the correct tag pill below
                  </span>
                </div>

                {/* Line Explanation */}
                <div className="space-y-1.5">
                  <h2 className="text-base font-black text-black dark:text-white">
                    {activeStep.explanation.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {activeStep.explanation.description}
                  </p>
                </div>

                {/* Why It Matters Callout */}
                <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-slate-900/80 border border-blue-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-blue-600 dark:text-emerald-400">
                    <HelpCircle size={13} />
                    <span>Why does this line matter?</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    {activeStep.explanation.whyItMatters}
                  </p>
                  {activeStep.explanation.analogy && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-0.5">
                      💡 <strong>Analogy:</strong> {activeStep.explanation.analogy}
                    </p>
                  )}
                </div>

                {/* Wrong Attempt Hint Alert */}
                {wrongAttemptHint && (
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/40 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2 animate-shake">
                    <XCircle size={15} className="shrink-0 mt-0.5 text-rose-500" />
                    <div>
                      <span className="font-bold">Not quite right:</span> {wrongAttemptHint}
                    </div>
                  </div>
                )}

                {/* ── CLICKABLE PILL OPTIONS ── */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    Choose the correct line pill:
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeStep.options.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handlePillClick(opt)}
                        className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 hover:bg-blue-50 dark:bg-neutral-900/90 dark:hover:bg-slate-850 hover:border-blue-400 dark:hover:border-emerald-500/50 text-left transition-all cursor-pointer font-mono text-xs active:scale-98 group flex items-center justify-between gap-2 shadow-2xs"
                      >
                        <span className="text-black dark:text-white font-bold group-hover:text-blue-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                          {opt.code.trim()}
                        </span>
                        <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-neutral-800 group-hover:bg-blue-600 dark:group-hover:bg-emerald-500 group-hover:text-white dark:group-hover:text-black flex items-center justify-center text-[10px] shrink-0 font-sans transition-all">
                          +
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              /* All lines completed celebration banner */
              <div className="rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/40 p-5 space-y-4 shadow-md text-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-black flex items-center justify-center font-black mx-auto shadow-lg shadow-emerald-500/30">
                  <CheckCircle2 size={32} />
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black text-black dark:text-white">
                    🎉 Incredible Work! Day 1 Code Built!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    You have successfully understood and assembled every single line of a valid HTML5 document. Now run it in real VS Code and verify on GitHub!
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setStudioPhase("vscode_github")}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-black font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  <span>Proceed to VS Code &amp; Auto-GitHub Push</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}

            {/* Senior Dev Quick Reference Card */}
            <div className="rounded-2xl bg-slate-50 dark:bg-[#0c1328] border border-slate-200 dark:border-slate-800 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                <Laptop size={14} className="text-blue-600 dark:text-emerald-400" />
                <span>Senior Developer Takeaway for Day 1:</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Remember: In HTML, the <strong>&lt;head&gt;</strong> is for page configuration and tab title, while the <strong>&lt;body&gt;</strong> is for everything visible on the screen. Never write visible content outside of &lt;body&gt;!
              </p>
            </div>

          </div>

        </div>
      )}


      {/* ════════════════════════════════════════════════════════════════
          PHASE 2: REAL VS CODE RUN & AUTOMATIC GITHUB PUSH VERIFICATION
      ════════════════════════════════════════════════════════════════ */}
      {studioPhase === "vscode_github" && (
        <div className="rounded-2xl bg-white dark:bg-[#0c1328] border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-6 shadow-sm">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 uppercase">
                Final Step • Automatic Verification
              </span>
              <h2 className="text-lg font-black text-black dark:text-white tracking-tight mt-1">
                Run in VS Code &amp; Auto-Verify on GitHub
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setStudioPhase("interactive")}
              className="text-xs font-mono text-slate-500 hover:text-black dark:hover:text-white flex items-center gap-1 transition-colors self-start sm:self-auto cursor-pointer"
            >
              <span>← Back to Line-by-Line</span>
            </button>
          </div>

          {/* Day 1 Exclusive: GitHub Repository Creation Guide with Step-by-Step Animation & Direct Link */}
          {lesson.day === 1 && (
            <div className="pt-1">
              <Day1GitHubRepoCreationGuide />
            </div>
          )}

          {/* 3 Step Action Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Step 1: Open VS Code */}
            <div className="rounded-xl p-4 bg-slate-50 dark:bg-neutral-900/70 border border-slate-200 dark:border-neutral-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-600 dark:text-emerald-400 font-mono">
                  Step 1
                </span>
                <button
                  type="button"
                  onClick={handleCopyVsCodeCmd}
                  className="text-[11px] font-mono text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <Copy size={11} />
                  <span>{copiedVsCodeCmd ? "Copied!" : "Copy"}</span>
                </button>
              </div>

              <h3 className="text-xs font-black text-black dark:text-white">
                Launch VS Code on PC
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                Open Command Prompt or Terminal on your Windows PC and execute:
              </p>

              <pre className="p-2 rounded-lg bg-black text-emerald-400 font-mono text-[10px] overflow-x-auto leading-tight">
                <code>mkdir bca-day-1<br />cd bca-day-1<br />code .</code>
              </pre>
            </div>

            {/* Step 2: Create index.html */}
            <div className="rounded-xl p-4 bg-slate-50 dark:bg-neutral-900/70 border border-slate-200 dark:border-neutral-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-600 dark:text-emerald-400 font-mono">
                  Step 2
                </span>
                <button
                  type="button"
                  onClick={handleCopyAssembledCode}
                  className="text-[11px] font-mono text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <Copy size={11} />
                  <span>{copiedAssembled ? "Copied!" : "Copy Code"}</span>
                </button>
              </div>

              <h3 className="text-xs font-black text-black dark:text-white">
                Paste Assembled Code
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                Inside VS Code, create a file named <strong>index.html</strong> and paste your assembled code.
              </p>

              <div className="p-2 rounded-lg bg-black text-slate-300 font-mono text-[10px] truncate">
                index.html • 11 Lines • Valid HTML5
              </div>
            </div>

            {/* Step 3: Git Push */}
            <div className="rounded-xl p-4 bg-slate-50 dark:bg-neutral-900/70 border border-slate-200 dark:border-neutral-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-600 dark:text-emerald-400 font-mono">
                  Step 3
                </span>
                <button
                  type="button"
                  onClick={handleCopyGitCmd}
                  className="text-[11px] font-mono text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <Copy size={11} />
                  <span>{copiedGitCmd ? "Copied!" : "Copy"}</span>
                </button>
              </div>

              <h3 className="text-xs font-black text-black dark:text-white">
                Push to Personal GitHub
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                In VS Code Terminal, commit and push:
              </p>

              <pre className="p-2 rounded-lg bg-black text-emerald-400 font-mono text-[10px] overflow-x-auto leading-tight">
                <code>git add .<br />git commit -m &quot;Day 01&quot;<br />git push origin main</code>
              </pre>
            </div>

          </div>

          {/* ── AUTOMATIC GITHUB REPOSITORY VERIFIER BOX ── */}
          <div className="rounded-2xl p-5 bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <GitBranch size={16} className="text-blue-600 dark:text-emerald-400" />
                <h3 className="text-sm font-black text-black dark:text-white">
                  Automatic Student GitHub Verification
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Saved in browser • Never repeat pasting
              </span>
            </div>

            {/* URL Input Form */}
            <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
              <div className="flex-1 relative">
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/your-username/bca-day-1"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-neutral-900 text-xs font-mono text-black dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:focus:ring-emerald-500 shadow-2xs"
                />
              </div>

              <button
                type="button"
                onClick={handleAutoVerifyGitHub}
                disabled={isVerifying}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-black font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                {isVerifying ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
                    <span>Checking GitHub...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={13} />
                    <span>Auto-Verify on GitHub</span>
                  </>
                )}
              </button>
            </div>

            {/* Verification Result Feedback */}
            {verificationResult && (
              <div className={`p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${
                verificationResult.success
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-200"
                  : "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-500/40 text-amber-800 dark:text-amber-200"
              }`}>
                {verificationResult.success ? (
                  <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <div className="font-bold">
                    {verificationResult.success ? "GitHub Repository Verified Successfully!" : "Verification Check Details:"}
                  </div>
                  <div>{verificationResult.message}</div>
                  {verificationResult.passedItems?.length > 0 && (
                    <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                      ✓ Verified: {verificationResult.passedItems.join(" • ")}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Offline Practice Fallback */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                Practicing offline or haven&apos;t pushed to GitHub yet?
              </span>

              <button
                type="button"
                onClick={handleInstantLocalVerify}
                className="text-xs font-bold text-blue-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
              >
                <span>⚡ Instant Verify Local Practice &amp; Complete Day 1</span>
              </button>
            </div>

          </div>

          {/* ── SUCCESS BANNER & PROCEED TO DAY 2 BUTTON ── */}
          {autoVerifySuccess && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-blue-500/15 border border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-black flex items-center justify-center font-black shrink-0 shadow-md">
                  <Check size={20} className="stroke-[3]" />
                </div>
                <div>
                  <div className="text-sm font-black text-black dark:text-white">
                    Day 1 Completed &amp; Verified! 🎉
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    Day 2 (HTML Headings, Paragraphs &amp; Text Formatting) is now unlocked for you.
                  </div>
                </div>
              </div>

              <Link
                href="/bca/practical/day-2-html-headings-paragraphs-text-formatting"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/30 transition-transform active:scale-95 cursor-pointer shrink-0"
              >
                <span>Proceed to Day 2 Lesson</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
