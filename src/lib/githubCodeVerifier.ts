import { PracticalLesson } from "@/data/bcaPracticalData";

export interface GitHubCodeCheckResult {
  success: boolean;
  owner: string;
  repo: string;
  branch?: string;
  filePath?: string;
  matchedFile?: string;
  fileSize?: number;
  rawContentSnippet?: string;
  passedItems: string[];
  missingItems: string[];
  message: string;
}

export interface ParsedGitHubUrl {
  isValid: boolean;
  owner: string;
  repo: string;
  branch?: string;
  filePath?: string;
  errorMessage?: string;
}

const PLACEHOLDER_USERNAMES = [
  "your-username", "your_username", "yourname", "username", "example",
  "octocat", "user", "template", "null", "undefined", "none", "student",
  "facebook", "vercel", "google", "microsoft", "github"
];

const PLACEHOLDER_REPOS = [
  "your-repo", "your_repo", "your-project", "repo-name", "repo_name",
  "placeholder", "repo", "project-name", "project", "none", "undefined"
];

/**
 * Parses and sanitizes a user-entered GitHub URL.
 */
export function parseGitHubUrl(inputUrl: string): ParsedGitHubUrl {
  const clean = (inputUrl || "").trim();
  if (!clean) {
    return { isValid: false, owner: "", repo: "", errorMessage: "GitHub URL is empty." };
  }

  // Regex matching github.com/owner/repo or github.com/owner/repo/blob/branch/path...
  const reg = /^https?:\/\/(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_.-]+)(?:\/(?:blob|tree)\/([^/]+)\/(.+))?$/i;
  const match = clean.match(reg);

  if (!match) {
    return {
      isValid: false,
      owner: "",
      repo: "",
      errorMessage: "Please enter a valid GitHub repository URL (e.g. https://github.com/username/bca-day-1)."
    };
  }

  const owner = match[1];
  const repo = match[2].replace(/\.git$/i, "");
  const branch = match[3] || undefined;
  const filePath = match[4] || undefined;

  const ownerLower = owner.toLowerCase();
  const repoLower = repo.toLowerCase();

  if (PLACEHOLDER_USERNAMES.includes(ownerLower)) {
    return {
      isValid: false,
      owner,
      repo,
      errorMessage: `"${owner}" is an example placeholder. Please provide your OWN real GitHub username.`
    };
  }

  if (PLACEHOLDER_REPOS.includes(repoLower)) {
    return {
      isValid: false,
      owner,
      repo,
      errorMessage: `"${repo}" looks like a placeholder repository name. Please provide your real repository.`
    };
  }

  return { isValid: true, owner, repo, branch, filePath };
}

/**
 * Determines list of candidate filenames based on practical lesson language and day number.
 */
function getCandidateFilenames(lesson: PracticalLesson): string[] {
  const day = lesson.day;
  const padDay = day < 10 ? `0${day}` : `${day}`;
  const lang = lesson.practicalLab.language;

  if (lang === "html") {
    return [
      `day-${padDay}/index.html`,
      `day-${day}/index.html`,
      `bca-day-${padDay}/index.html`,
      `bca-day-${day}/index.html`,
      `day${padDay}/index.html`,
      `day${day}/index.html`,
      `bca-day${day}/index.html`,
      `Day-${padDay}/index.html`,
      `Day-${day}/index.html`,
      `Day${day}/index.html`,
      `day-${padDay}.html`,
      `day-${day}.html`,
      `day${padDay}.html`,
      `day${day}.html`,
      `bca-day-${day}.html`,
      "index.html",
      "main.html",
      "home.html"
    ];
  } else if (lang === "css") {
    return [
      `day-${padDay}/style.css`,
      `day-${day}/style.css`,
      `day-${padDay}/styles.css`,
      `day-${day}/styles.css`,
      "style.css",
      "styles.css",
      `day-${padDay}/index.html`,
      `day-${day}/index.html`,
      "index.html"
    ];
  } else if (lang === "c") {
    return [
      `day-${padDay}/main.c`,
      `day-${day}/main.c`,
      `day${padDay}.c`,
      `day${day}.c`,
      `day-${day}.c`,
      "main.c",
      "program.c",
      "solution.c",
      "app.c"
    ];
  } else if (lang === "javascript") {
    return [
      `day-${padDay}/script.js`,
      `day-${day}/script.js`,
      `day-${padDay}/app.js`,
      `day-${day}/app.js`,
      "script.js",
      "main.js",
      "index.js",
      "app.js",
      `day-${padDay}/index.html`,
      `day-${day}/index.html`,
      "index.html"
    ];
  }

  return ["index.html", "main.c", "style.css", "script.js"];
}

/**
 * Fetches raw file content via GitHub Blob API by SHA (handles special characters, double-dots, spaces in filenames).
 */
async function tryFetchBlobBySha(owner: string, repo: string, sha: string): Promise<string | null> {
  const url = `https://api.github.com/repos/${owner}/${repo}/git/blobs/${sha}`;
  try {
    const res = await fetch(url, { headers: { "Accept": "application/vnd.github.v3+json" } });
    if (res.ok) {
      const data = await res.json();
      if (data && data.content && data.encoding === "base64") {
        const cleaned = data.content.replace(/\s/g, '');
        if (typeof window !== "undefined" && window.atob) {
          try {
            return decodeURIComponent(escape(window.atob(cleaned)));
          } catch {
            return window.atob(cleaned);
          }
        }
        if (typeof Buffer !== "undefined") {
          return Buffer.from(cleaned, 'base64').toString('utf8');
        }
      }
    }
  } catch (e) {}
  return null;
}

/**
 * Attempts to fetch a raw file from raw.githubusercontent.com
 */
async function tryFetchRawFile(owner: string, repo: string, branch: string, path: string): Promise<{ content: string; url: string } | null> {
  const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${encodeURI(path)}`;
  try {
    const res = await fetch(rawUrl, {
      method: "GET",
      headers: { "Accept": "text/plain" }
    });
    if (res.ok) {
      const text = await res.text();
      return { content: text, url: rawUrl };
    }
  } catch (e) {
    // network or CORS error
  }
  return null;
}

/**
 * Recursively inspects public GitHub repository tree to discover files across all subfolders.
 */
async function tryDiscoverFilesViaRecursiveGitTree(
  owner: string, 
  repo: string, 
  branches: string[], 
  lesson: PracticalLesson
): Promise<{ path: string; content: string; branch: string } | null> {
  const day = lesson.day;
  const ext = lesson.practicalLab.language === "html" ? ".html" 
    : lesson.practicalLab.language === "css" ? ".css" 
    : lesson.practicalLab.language === "c" ? ".c" 
    : ".js";

  for (const branch of branches) {
    try {
      const treeUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
      const res = await fetch(treeUrl, {
        headers: { "Accept": "application/vnd.github.v3+json" }
      });
      if (!res.ok) continue;
      const data = await res.json();
      if (!data.tree || !Array.isArray(data.tree)) continue;

      // Filter all blobs matching the lesson's target extension
      const blobs = data.tree.filter((t: any) => t.type === "blob" && t.path.toLowerCase().endsWith(ext));
      if (blobs.length === 0) continue;

      // Prioritize files matching day patterns: day-02, day-2, bca-day-2, day2, etc.
      const dayRegex = new RegExp(`(day[-_]?0?${day}|bca[-_]?day[-_]?0?${day})`, 'i');
      let candidate = blobs.find((b: any) => dayRegex.test(b.path));

      // If not found by day pattern, look for index.html or check the last modified blob
      if (!candidate) {
        candidate = blobs.find((b: any) => b.path.toLowerCase().endsWith("index.html")) || blobs[blobs.length - 1];
      }

      if (candidate) {
        let content: string | null = null;
        // 1. Try raw fetch
        const rawRes = await tryFetchRawFile(owner, repo, branch, candidate.path);
        if (rawRes && rawRes.content && rawRes.content.trim().length > 0) {
          content = rawRes.content;
        }
        // 2. Fallback to blob sha API (handles spaces, symbols, and double-dots like Alan Turing..html)
        if (!content && candidate.sha) {
          content = await tryFetchBlobBySha(owner, repo, candidate.sha);
        }

        if (content && content.trim().length > 0) {
          return { path: candidate.path, content, branch };
        }
      }
    } catch (e) {}
  }
  return null;
}

/**
 * Core Verifier Function:
 * Fetches the student's pushed code from GitHub and validates it against the lesson's technical criteria.
 */
export async function verifyStudentGitHubCode(githubUrl: string, lesson: PracticalLesson): Promise<GitHubCodeCheckResult> {
  const parsed = parseGitHubUrl(githubUrl);
  if (!parsed.isValid) {
    return {
      success: false,
      owner: parsed.owner,
      repo: parsed.repo,
      passedItems: [],
      missingItems: ["Valid GitHub repository URL"],
      message: parsed.errorMessage || "Invalid GitHub repository URL."
    };
  }

  const { owner, repo } = parsed;
  const branchesToTry = parsed.branch ? [parsed.branch] : ["main", "master"];
  const candidateFiles = parsed.filePath ? [parsed.filePath] : getCandidateFilenames(lesson);

  let fetchedContent: string | null = null;
  let matchedBranch = "";
  let matchedFilePath = "";

  // 1. Try fetching via raw CDN across candidate branches and file paths
  for (const branch of branchesToTry) {
    for (const file of candidateFiles) {
      const result = await tryFetchRawFile(owner, repo, branch, file);
      if (result && result.content && result.content.trim().length > 0) {
        fetchedContent = result.content;
        matchedBranch = branch;
        matchedFilePath = file;
        break;
      }
    }
    if (fetchedContent) break;
  }

  // 2. If standard filenames were not found, use recursive Git tree discovery
  if (!fetchedContent) {
    const discovered = await tryDiscoverFilesViaRecursiveGitTree(owner, repo, branchesToTry, lesson);
    if (discovered) {
      fetchedContent = discovered.content;
      matchedBranch = discovered.branch;
      matchedFilePath = discovered.path;
    }
  }

  // If still not found, repository might be 404, private, or missing the expected code file
  if (!fetchedContent) {
    const padDay = lesson.day < 10 ? `0${lesson.day}` : `${lesson.day}`;
    return {
      success: false,
      owner,
      repo,
      passedItems: [],
      missingItems: [
        `Public repository at https://github.com/${owner}/${repo}`,
        `File matching 'day-${padDay}/index.html' or 'bca-day-${lesson.day}/index.html' on branch 'main' or 'master'`
      ],
      message: `Could not find your Day ${lesson.day} code file in public repository "${owner}/${repo}". Please make sure: (1) Your repo is set to Public, (2) You created folder "day-${padDay}" or "bca-day-${lesson.day}", (3) Your file is named "index.html" (lowercase, no spaces), and (4) You pushed code to branch 'main' or 'master'.`
    };
  }

  const code = fetchedContent.trim();
  const passedItems: string[] = [];
  const missingItems: string[] = [];

  passedItems.push(`Public repository found: ${owner}/${repo}`);
  passedItems.push(`Detected source file: ${matchedFilePath} (${matchedBranch} branch, ${code.length} characters)`);

  // Check 1: Minimum file length (avoid empty files)
  if (code.length < 35) {
    missingItems.push("Substantial code implementation (file is too short or empty)");
    return {
      success: false,
      owner,
      repo,
      branch: matchedBranch,
      filePath: matchedFilePath,
      fileSize: code.length,
      rawContentSnippet: code,
      passedItems,
      missingItems,
      message: `The file "${matchedFilePath}" in your GitHub repository is too short or empty (${code.length} characters). Please write your solution and push your real code.`
    };
  }
  passedItems.push("File contains substantial code (> 35 characters)");

  // Check 2: Language-specific structural check
  const lang = lesson.practicalLab.language;
  const codeLower = code.toLowerCase();

  if (lang === "html") {
    const hasHtmlTags = codeLower.includes("<html") || codeLower.includes("<!doctype") || codeLower.includes("<body") || codeLower.includes("<h1") || codeLower.includes("<p");
    if (!hasHtmlTags) {
      missingItems.push("Valid HTML5 markup structure (doctype, html, body, or elements)");
    } else {
      passedItems.push("Valid HTML5 structure detected");
    }
  } else if (lang === "css") {
    const hasCssRules = code.includes("{") && code.includes("}");
    if (!hasCssRules) {
      missingItems.push("Valid CSS style rules and declarations");
    } else {
      passedItems.push("Valid CSS selector and declaration blocks detected");
    }
  } else if (lang === "c") {
    const hasCBasics = code.includes("main") || code.includes("#include");
    if (!hasCBasics) {
      missingItems.push("C program entry point (main function or #include)");
    } else {
      passedItems.push("C standard boilerplate and main function detected");
    }
  }

  // Check 3: Check against the lesson's task requirements (keywords and regex)
  const tasks = lesson.practicalLab.tasks || [];
  let matchedTaskCount = 0;

  for (const task of tasks) {
    let taskPassed = false;

    // Check regex validator if present
    if (task.validatorRegex) {
      try {
        const reg = new RegExp(task.validatorRegex, "i");
        if (reg.test(code)) {
          taskPassed = true;
        }
      } catch (e) {}
    }

    // Check validator keywords if present
    if (!taskPassed && task.validatorKeywords && task.validatorKeywords.length > 0) {
      const allFound = task.validatorKeywords.every(kw => 
        codeLower.includes(kw.toLowerCase().trim())
      );
      if (allFound) {
        taskPassed = true;
      }
    }

    // Fallback: check if task title core words exist
    if (!taskPassed && task.validatorKeywords && task.validatorKeywords.length > 0) {
      const anyFound = task.validatorKeywords.some(kw => 
        codeLower.includes(kw.toLowerCase().trim())
      );
      if (anyFound) {
        taskPassed = true;
      }
    }

    if (taskPassed) {
      matchedTaskCount++;
      passedItems.push(`Task Check: ${task.title}`);
    } else {
      missingItems.push(`Task Check: ${task.title} (${task.hint})`);
    }
  }

  // If no task matched at all, but tasks were required:
  if (tasks.length > 0 && matchedTaskCount === 0) {
    return {
      success: false,
      owner,
      repo,
      branch: matchedBranch,
      filePath: matchedFilePath,
      matchedFile: matchedFilePath,
      fileSize: code.length,
      rawContentSnippet: code.slice(0, 300) + (code.length > 300 ? "..." : ""),
      passedItems,
      missingItems,
      message: `Your GitHub file "${matchedFilePath}" was found, but it is missing the required code elements for Day ${lesson.day}: ${missingItems.slice(0, 2).join(", ")}. Please update your code in VS Code, commit, and push to GitHub!`
    };
  }

  // Successful verification!
  const snippet = code.slice(0, 350) + (code.length > 350 ? "..." : "");

  return {
    success: true,
    owner,
    repo,
    branch: matchedBranch,
    filePath: matchedFilePath,
    matchedFile: matchedFilePath,
    fileSize: code.length,
    rawContentSnippet: snippet,
    passedItems,
    missingItems,
    message: `Verified! Found "${matchedFilePath}" (${matchedBranch} branch) with authentic Day ${lesson.day} code (${matchedTaskCount}/${tasks.length} task checkpoints verified on GitHub).`
  };
}
