export interface ChapterLesson {
  id: string;
  title: string;
  type: "terminal" | "mcq";
  instruction: string;
  expectedInput: string;
  hint: string;
  successMsg: string;
  suggestedCommands?: string[];
  options?: string[];
  correctOption?: string;
  outputs?: string[];
  hintImage?: string;
}

export interface ChapterSimulator {
  chapterId: string;
  chapterTitle: string;
  icon: string;
  lessons: ChapterLesson[];
}

const CHAPTER_SIMULATORS: ChapterSimulator[] = [
  {
    chapterId: "p0-2-terminal",
    chapterTitle: "CLI Introduction & Desktop Navigation",
    icon: "🖥️",
    lessons: [
      {
        id: "launch_cmd",
        title: "LESSON 1: Opening the Command Prompt",
        type: "terminal",
        instruction:
          "Welcome! 🎉 Before we write code, we need to launch the terminal.\n\nIn 🪟 Windows 11, press ⊞ Windows Key, search for 'cmd', and press Enter.\n\nFor this simulation — type 'cmd' and press Enter to launch the terminal.",
        expectedInput: "cmd",
        hint: "cmd",
        successMsg:
          "The Command Prompt is open! 🚀 Notice the black window with blinking text — this is the CLI (Command Line Interface). GUI uses icons; CLI uses text.",
        suggestedCommands: ["cmd", "powershell", "terminal"],
        outputs: [
          "Microsoft Windows [Version 10.0.22000.253]",
          "(c) Microsoft Corporation. All rights reserved.",
          "",
        ],
      },
      {
        id: "screenshot_question",
        title: "LESSON 2: Analyzing the Command Prompt",
        type: "mcq",
        instruction:
          "💡 Click the 'Show Hint' button to inspect the full screenshot of the Command Prompt task.\n\n❓ Based on the screenshot, what is the 'QUICK RUN' command suggested to list directory contents?",
        expectedInput: "A",
        hint: "Click the Hint button to view the screenshot, then look at the first green quick run button.",
        successMsg: "Correct! The screenshot shows '$ dir' as the first Quick Run command option.",
        options: [
          "  [A] $ dir",
          "  [B] $ ls",
          "  [C] $ help",
          "  [D] $ cd ..",
        ],
        correctOption: "A",
        hintImage: "/lessons/p0-2-terminal-hint.png"
      },
      {
        id: "gui_vs_cli",
        title: "LESSON 3: GUI vs CLI — Which Is Faster?",
        type: "mcq",
        instruction:
          "📖 GUI = Graphical User Interface (point and click with a mouse).\n💻 CLI = Command Line Interface (type text commands).\n\n❓ Which interface do professional developers prefer for speed and automation?",
        expectedInput: "B",
        hint: "Think about scripting — which one lets you automate repetitive work?",
        successMsg:
          "Correct! CLI is preferred by developers because it supports scripting, automation, and is significantly faster for file operations and server management.",
        options: [
          "  [A] GUI — because it has icons and windows",
          "  [B] CLI — because it supports automation and scripting",
          "  [C] Both are equally fast for all tasks",
          "  [D] Neither — developers use only IDEs",
        ],
        correctOption: "B",
      },
      {
        id: "ver_command",
        title: "LESSON 4: Checking Windows Version (ver)",
        type: "terminal",
        instruction:
          "📖 The 'ver' command displays the current Windows version installed on your system.\n\nThis is useful when checking system compatibility before installing developer tools like Node.js or Git.\n\n💡 Type 'ver' and press Enter:",
        expectedInput: "ver",
        hint: "ver",
        successMsg:
          "'ver' displays your Windows build number — useful for checking compatibility before installing Node.js, Git, or VS Code.",
        suggestedCommands: ["ver", "winver", "systeminfo"],
        outputs: ["", "Microsoft Windows [Version 10.0.22000.2538]", ""],
      },
      {
        id: "echo_command",
        title: "LESSON 5: Printing Text to Screen (echo)",
        type: "terminal",
        instruction:
          "📖 The 'echo' command prints any text you type after it directly to the terminal output.\n\nDevelopers use 'echo' to display status messages inside scripts and batch files.\n\n💡 Type 'echo Hello Developer!' and press Enter:",
        expectedInput: "echo Hello Developer!",
        hint: "echo Hello Developer!",
        successMsg:
          "Echo printed your message! 🎉 Every automated deployment script uses echo to log progress and show status updates to the developer.",
        suggestedCommands: ["echo Hello Developer!", "echo Welcome to Nextsem!", "echo Nextsem Academy"],
        outputs: ["Hello Developer!"],
      },
      {
        id: "cls_command",
        title: "LESSON 6: Clearing the Screen (cls)",
        type: "terminal",
        instruction:
          "📖 After running many commands, the terminal gets cluttered.\n\nThe 'cls' command (Clear Screen) wipes all previous output, giving you a fresh, clean terminal view.\n\n💡 Type 'cls' and press Enter to clean the screen:",
        expectedInput: "cls",
        hint: "cls",
        successMsg:
          "Screen cleared! 🧹 Professional developers use 'cls' to stay organized during long coding sessions and script executions.",
        suggestedCommands: ["cls", "clear", "echo."],
        outputs: [],
      },
      {
        id: "automation_quiz",
        title: "LESSON 7: CLI Automation — Real World",
        type: "mcq",
        instruction:
          "📖 You have now learned: cmd, ver, echo, cls.\n\n❓ You need to rename 500 photos at once to include a date prefix. Which is the best approach?",
        expectedInput: "C",
        hint: "Which option lets you automate repetitive tasks with a single script?",
        successMsg:
          "Correct! A CLI script renames 500 files in under 1 second. GUI would require 500 individual clicks — never do that when you know CLI!",
        options: [
          "  [A] Right-click each file individually in File Explorer",
          "  [B] Open Notepad and type the name for each file",
          "  [C] Write a CLI batch script to rename all 500 files at once",
          "  [D] Use File Explorer search to find and rename each file",
        ],
        correctOption: "C",
      },
      {
        id: "exit_command",
        title: "LESSON 8: Closing the Terminal (exit)",
        type: "terminal",
        instruction:
          "📖 The 'exit' command gracefully closes the current Command Prompt session.\n\nAlways use 'exit' to close the terminal so all running processes terminate cleanly.\n\n💡 Type 'exit' to complete this chapter:",
        expectedInput: "exit",
        hint: "exit",
        successMsg:
          "🎓 Chapter Complete! You now know 5 essential CLI commands: cmd, ver, echo, cls, exit — and understand why developers prefer CLI over GUI!",
        suggestedCommands: ["exit", "quit", "close"],
        outputs: ["", "[Session Terminated Successfully]"],
      },
    ],
  },
  {
    chapterId: "cli-ch1-basics",
    chapterTitle: "Windows CMD — Core Basics",
    icon: "⌨️",
    lessons: [
      {
        id: "dir_command",
        title: "LESSON 1: List Files in a Folder (dir)",
        type: "terminal",
        instruction:
          "📖 The 'dir' command lists all files and subdirectories inside your current folder.\n\nThis is the CLI equivalent of opening a folder in File Explorer — but 100x faster.\n\n💡 Type 'dir' and press Enter:",
        expectedInput: "dir",
        hint: "dir",
        successMsg:
          "dir listed all files and folders with their dates and sizes! Professionals use 'dir' dozens of times a day to inspect project directories.",
        suggestedCommands: ["dir", "ls", "dir /w", "dir /a"],
        outputs: [
          " Volume in drive C has no label.",
          " Volume Serial Number is A1B2-3C4D",
          "",
          " Directory of C:\\Users\\User",
          "",
          "09/07/2026  12:00 AM    <DIR>          Desktop",
          "09/07/2026  12:00 AM    <DIR>          Documents",
          "09/07/2026  12:00 AM    <DIR>          Downloads",
          "               0 File(s)              0 bytes",
          "               3 Dir(s)  98,421,098,112 bytes free",
        ],
      },
      {
        id: "mkdir_command",
        title: "LESSON 2: Create a New Folder (mkdir)",
        type: "terminal",
        instruction:
          "📖 The 'mkdir' command (Make Directory) creates a new folder at the current path.\n\nDevelopers use mkdir to set up project structures: src/, public/, components/ etc.\n\n💡 Type 'mkdir projects' and press Enter:",
        expectedInput: "mkdir projects",
        hint: "mkdir projects",
        successMsg:
          "The 'projects' folder was created! 📁 Every new coding project starts with mkdir to build its folder structure in the terminal.",
        suggestedCommands: ["mkdir projects", "md projects", "mkdir src"],
        outputs: [],
      },
      {
        id: "cd_command",
        title: "LESSON 3: Navigate Into a Folder (cd)",
        type: "terminal",
        instruction:
          "📖 The 'cd' command (Change Directory) moves your terminal into a different folder.\n\nAfter cd, the prompt updates from C:\\Users\\User> to C:\\Users\\User\\projects>\n\n💡 Type 'cd projects' to enter the projects folder:",
        expectedInput: "cd projects",
        hint: "cd projects",
        successMsg:
          "You are now inside the projects folder! Notice the prompt updated. You are navigating the entire file system using only your keyboard. 🚀",
        suggestedCommands: ["cd projects", "cd Desktop", "cd Documents"],
        outputs: [],
      },
      {
        id: "cd_back",
        title: "LESSON 4: Go Up One Level (cd ..)",
        type: "terminal",
        instruction:
          "📖 Two dots '..' always refers to the parent directory — one level above your current location.\n\nThis is essential for navigating complex nested project folder structures.\n\n💡 Type 'cd ..' to go back up one folder level:",
        expectedInput: "cd ..",
        hint: "cd ..",
        successMsg:
          "You moved back up to the parent directory! Combining 'cd foldername' and 'cd ..' gives you full file system navigation without a mouse.",
        suggestedCommands: ["cd ..", "cd ..\\.."],
        outputs: [],
      },
      {
        id: "cmd_basics_quiz",
        title: "LESSON 5: CMD Navigation Quiz",
        type: "mcq",
        instruction:
          "📖 You have learned: dir, mkdir, cd, and cd ..\n\n❓ Which command would you use to navigate two folder levels up at once?",
        expectedInput: "C",
        hint: "You can chain '..' with a backslash separator!",
        successMsg:
          "Correct! 'cd ..\\..' navigates two levels up at once. Chain as many '..' as needed to reach any ancestor folder instantly.",
        options: [
          "  [A] cd back back",
          "  [B] cd up 2",
          "  [C] cd ..\\..",
          "  [D] cd \\\\root",
        ],
        correctOption: "C",
      },
    ],
  },
  {
    chapterId: "cli-ch2-drives",
    chapterTitle: "Drive Letters & Path Navigation",
    icon: "💾",
    lessons: [
      {
        id: "change_drive",
        title: "LESSON 1: Switching Drives (D: or E:)",
        type: "terminal",
        instruction:
          "📖 Windows uses drive letters to identify separate storage partitions or physical drives.\n\nC: = primary system drive. D: = secondary drive or partition.\n\nTo switch drives, type the drive letter followed by a colon.\n\n💡 Type 'D:' and press Enter:",
        expectedInput: "D:",
        hint: "D:",
        successMsg:
          "You switched to the D: drive! The prompt changed to D:\\>. This is how you access external drives, USB drives, and secondary partitions from the terminal.",
        suggestedCommands: ["D:", "E:", "C:"],
        outputs: [],
      },
      {
        id: "absolute_path",
        title: "LESSON 2: Navigate Using Absolute Path",
        type: "terminal",
        instruction:
          "📖 An absolute path starts from the drive root and gives the exact full location.\n\nExample: C:\\Users\\User\\Documents\n\nYou can jump to any folder instantly using its full absolute path.\n\n💡 Type 'cd C:\\Users\\User\\Documents' and press Enter:",
        expectedInput: "cd C:\\Users\\User\\Documents",
        hint: "cd C:\\Users\\User\\Documents",
        successMsg:
          "You jumped directly to Documents using an absolute path! This is much faster than navigating step-by-step with multiple cd commands.",
        suggestedCommands: ["cd C:\\Users\\User\\Documents", "cd C:\\Users\\User\\Desktop", "cd C:\\Windows"],
        outputs: [],
      },
      {
        id: "path_quiz",
        title: "LESSON 3: Absolute vs Relative Path",
        type: "mcq",
        instruction:
          "📖 Two path types exist:\n\n🔵 Absolute: Starts from drive root — C:\\Users\\User\\projects\n🟢 Relative: Starts from current location — .\\src or ..\\projects\n\n❓ Which of the following is an absolute path?",
        expectedInput: "A",
        hint: "Absolute paths always start with a drive letter like C:\\",
        successMsg:
          "Correct! C:\\Users\\User\\nextsem\\index.html is absolute because it starts from the drive root (C:\\). Relative paths use . or .. to navigate from your current location.",
        options: [
          "  [A] C:\\Users\\User\\nextsem\\index.html",
          "  [B] ..\\nextsem\\index.html",
          "  [C] .\\index.html",
          "  [D] ~\\nextsem\\src",
        ],
        correctOption: "A",
      },
      {
        id: "pushd_popd",
        title: "LESSON 4: Save & Restore Location (pushd / popd)",
        type: "terminal",
        instruction:
          "📖 'pushd' saves your current directory to a stack, then changes to a new path.\n'popd' returns you to the last saved location.\n\nDevelopers use pushd/popd in scripts to temporarily change directories without losing their place.\n\n💡 Type 'pushd C:\\Windows' to save current location and switch:",
        expectedInput: "pushd C:\\Windows",
        hint: "pushd C:\\Windows",
        successMsg:
          "pushd saved your previous location! Now type 'popd' to instantly return. Developers use pushd/popd in batch scripts to temporarily change directories.",
        suggestedCommands: ["pushd C:\\Windows", "pushd C:\\Users\\User\\Desktop", "popd"],
        outputs: ["C:\\Users\\User PUSHD_STACK [saved]"],
      },
    ],
  },
];

export function getChapterSimulator(chapterId: string): ChapterSimulator | null {
  return CHAPTER_SIMULATORS.find((s) => s.chapterId === chapterId) || null;
}

export function getNextChapterSimulator(chapterId: string): ChapterSimulator | null {
  const idx = CHAPTER_SIMULATORS.findIndex((s) => s.chapterId === chapterId);
  if (idx === -1 || idx >= CHAPTER_SIMULATORS.length - 1) return null;
  return CHAPTER_SIMULATORS[idx + 1];
}

export default CHAPTER_SIMULATORS;
