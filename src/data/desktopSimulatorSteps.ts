/**
 * desktopSimulatorSteps.ts
 * Day 1 — 10-Day Gamified Roadmap
 *
 * Defines all interactive steps for the Windows Desktop Simulator.
 * Each step teaches mouse/keyboard skills in a guided, gamified sequence.
 *
 * Flow: Desktop basics → Start Menu → File Explorer → CMD → Recycle Bin → Shortcuts
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type ActionType =
  | "click"
  | "double-click"
  | "right-click"
  | "drag"
  | "keyboard"
  | "hover"
  | "mcq";

export type DifficultyLevel = "beginner" | "easy" | "medium";

export type StepCategory =
  | "desktop"
  | "start-menu"
  | "taskbar"
  | "file-explorer"
  | "terminal"
  | "recycle-bin"
  | "shortcuts";

export interface MCQOption {
  label: string; // e.g. "[A]"
  text: string;  // e.g. "Double-click"
}

export interface DesktopSimulatorStep {
  /** Unique step ID — used for progress tracking in localStorage */
  id: string;

  /** Short title shown in the progress bar */
  title: string;

  /** Full instruction displayed to the user */
  instruction: string;

  /** Hint shown after 10 seconds of inactivity or on request */
  hint: string;

  /** Category for grouping steps into worlds/chapters */
  category: StepCategory;

  /** Type of action the user must perform */
  action: ActionType;

  /** CSS selector or element ID to highlight in the simulator UI */
  targetElement: string;

  /** XP awarded on successful completion */
  xpReward: number;

  /** Hearts (lives) deducted on wrong action */
  heartPenalty: number;

  /** Difficulty badge shown on the step card */
  difficulty: DifficultyLevel;

  /** For MCQ steps — list of answer options */
  mcqOptions?: MCQOption[];

  /** For MCQ steps — the correct option label e.g. "A" */
  correctOption?: string;

  /** Success message shown when the step is completed */
  successMsg: string;

  /** Optional keyboard shortcut to teach (e.g. "Ctrl+C") */
  shortcut?: string;

  /** Optional image path for visual hint */
  hintImage?: string;
}

// ─── Step Definitions ────────────────────────────────────────────────────────

export const desktopSimulatorSteps: DesktopSimulatorStep[] = [

  // ═══════════════════════════════════════════════════
  // 🖥️  WORLD 1 — DESKTOP BASICS
  // ═══════════════════════════════════════════════════

  {
    id: "desktop-click-1",
    title: "🖱️ Your First Click",
    category: "desktop",
    action: "click",
    targetElement: "#desktop-bg",
    difficulty: "beginner",
    instruction:
      "Welcome to your 🪟 Windows Desktop! 🎉\n\nThe big area you see is called the **Desktop** — it's your workspace where everything lives.\n\n👉 Click anywhere on the dark desktop background to begin.",
    hint: "Just tap the dark background area — anywhere works! 👆",
    successMsg:
      "Great! You just clicked the Desktop. 🎉 The Desktop is like your virtual desk — you can place files, folders, and shortcuts here.",
    xpReward: 10,
    heartPenalty: 0,
  },

  {
    id: "desktop-rightclick-1",
    title: "🖱️ Right-Click the Desktop",
    category: "desktop",
    action: "right-click",
    targetElement: "#desktop-bg",
    difficulty: "beginner",
    instruction:
      "Now let's explore the **Context Menu**!\n\nRight-clicking shows a list of options for whatever you clicked on. It's like asking the computer: *'What can I do here?'*\n\n👉 Right-click anywhere on the desktop background.",
    hint: "On a touchpad, tap with two fingers. On a mouse, press the RIGHT button.",
    successMsg:
      "A context menu appeared! 🎯 This menu lets you create files, change settings, and more. Press Escape to close it.",
    xpReward: 15,
    heartPenalty: 0,
  },

  {
    id: "desktop-icons-mcq",
    title: "❓ What Are Desktop Icons?",
    category: "desktop",
    action: "mcq",
    targetElement: "#mcq-block",
    difficulty: "beginner",
    instruction:
      "Quick Question! 🧠\n\nYou see small pictures with labels on the Desktop. These are called **Icons**.\n\nWhat do you do to **OPEN** a file or folder icon on Windows?",
    hint: "Think about how you open apps — it's different from a single click!",
    mcqOptions: [
      { label: "A", text: "Single-click it" },
      { label: "B", text: "Double-click it" },
      { label: "C", text: "Right-click it" },
      { label: "D", text: "Hover over it" },
    ],
    correctOption: "B",
    successMsg:
      "Correct! 🎯 On Windows, you **double-click** to open files and folders. A single click just selects it.",
    xpReward: 20,
    heartPenalty: 1,
  },

  // ═══════════════════════════════════════════════════
  // 🪟 WORLD 2 — START MENU & TASKBAR
  // ═══════════════════════════════════════════════════

  {
    id: "taskbar-click-1",
    title: "📌 Find the Taskbar",
    category: "taskbar",
    action: "click",
    targetElement: "#taskbar",
    difficulty: "beginner",
    instruction:
      "Look at the **bottom of the screen** — that long bar is called the **Taskbar**! 📌\n\nIt always shows:\n• The **Start Button** (Windows logo)\n• **Pinned apps** you use often\n• **Running apps** (they appear here when open)\n• The **Clock** and **System Tray** on the right\n\n👉 Click anywhere on the Taskbar.",
    hint: "The Taskbar is the dark bar at the very bottom of the screen.",
    successMsg:
      "You found the Taskbar! 🏆 This is your command center — everything you need is accessible from here.",
    xpReward: 15,
    heartPenalty: 0,
  },

  {
    id: "start-menu-open-1",
    title: "🪟 Open the Start Menu",
    category: "start-menu",
    action: "click",
    targetElement: "#start-button",
    difficulty: "beginner",
    instruction:
      "The **Start Button** is the Windows logo (⊞) at the bottom-center (Windows 11) or bottom-left (Windows 10) of your Taskbar.\n\nClicking it opens the **Start Menu** — your app launcher, search bar, and quick settings all in one!\n\n👉 Click the Windows logo (Start Button) now.",
    hint: "Look for the ⊞ Windows logo at the bottom of the screen.",
    shortcut: "⊞ Windows Key",
    successMsg:
      "The Start Menu is open! 🎉 You can search for any app, open Settings, or shut down the computer from here. Press Escape to close it.",
    xpReward: 20,
    heartPenalty: 0,
  },

  {
    id: "start-menu-search-1",
    title: "🔍 Search for CMD",
    category: "start-menu",
    action: "keyboard",
    targetElement: "#start-search-input",
    difficulty: "easy",
    instruction:
      "With the Start Menu open, you can **type to search** — no need to click the search bar first!\n\nWe're going to open the **Command Prompt** (a text-based interface we'll use a LOT).\n\n👉 Type `cmd` using your keyboard.",
    hint: "Just start typing 'cmd' — the search happens automatically!",
    shortcut: "⊞ Windows Key → type 'cmd'",
    successMsg:
      "You searched for CMD! 🔍 The Command Prompt app appears in the results. This is how professionals launch apps super fast without touching the mouse!",
    xpReward: 25,
    heartPenalty: 1,
  },

  // ═══════════════════════════════════════════════════
  // 📁 WORLD 3 — FILE EXPLORER
  // ═══════════════════════════════════════════════════

  {
    id: "file-explorer-open-1",
    title: "📁 Open File Explorer",
    category: "file-explorer",
    action: "double-click",
    targetElement: "#file-explorer-icon",
    difficulty: "easy",
    instruction:
      "**File Explorer** is your file manager — it shows all your files and folders in a visual interface.\n\nYou can also think of it as the 'Windows version of a filing cabinet' 🗄️\n\n👉 **Double-click** the File Explorer icon (it looks like a yellow folder 📁) on the Desktop or Taskbar.",
    hint: "Two quick clicks! Double-click = open. Single-click = select.",
    shortcut: "⊞ Windows + E",
    successMsg:
      "File Explorer is open! 📂 You can see your Downloads, Documents, Pictures, and all drives from here. This is where your files live!",
    xpReward: 25,
    heartPenalty: 1,
  },

  {
    id: "file-explorer-navigate-1",
    title: "📂 Open the Documents Folder",
    category: "file-explorer",
    action: "click",
    targetElement: "#documents-folder",
    difficulty: "easy",
    instruction:
      "Inside File Explorer, you'll see folders on the left sidebar:\n• 📥 Downloads\n• 📄 **Documents**\n• 🖼️ Pictures\n• 🎵 Music\n• 🎬 Videos\n\nThese are your **User Profile Folders** — Windows creates them automatically.\n\n👉 Click on **Documents** in the left sidebar.",
    hint: "Look on the left side panel — Documents is usually the second folder listed.",
    successMsg:
      "You're now inside Documents! 📄 This is where you should save school notes, projects, and text files. Keep it organized!",
    xpReward: 20,
    heartPenalty: 0,
  },

  {
    id: "file-explorer-mcq",
    title: "❓ File Path Quiz",
    category: "file-explorer",
    action: "mcq",
    targetElement: "#mcq-block",
    difficulty: "easy",
    instruction:
      "🧠 Quick Knowledge Check!\n\nYou're inside the **Documents** folder of user **Admin** on the **C:** drive.\n\nWhat is the correct **file path** of this folder?",
    hint: "File paths start with the drive letter (C:), then use backslashes (\\) to show folders.",
    mcqOptions: [
      { label: "A", text: "C:/Users/Admin/Documents" },
      { label: "B", text: "C:\\Users\\Admin\\Documents" },
      { label: "C", text: "Documents/Admin/C:" },
      { label: "D", text: "\\Admin\\Documents" },
    ],
    correctOption: "B",
    successMsg:
      "Correct! 🏆 Windows uses **backslashes** (\\) in file paths, unlike Linux/Mac which use forward slashes (/). This is super important for CMD commands!",
    xpReward: 30,
    heartPenalty: 1,
  },

  // ═══════════════════════════════════════════════════
  // 💻 WORLD 4 — COMMAND PROMPT
  // ═══════════════════════════════════════════════════

  {
    id: "cmd-open-1",
    title: "💻 Launch Command Prompt",
    category: "terminal",
    action: "keyboard",
    targetElement: "#start-search-input",
    difficulty: "easy",
    instruction:
      "Time to meet your new best friend — the **Command Prompt** (CMD)! 💻\n\nCMD is a text-based way to control Windows. Instead of clicking icons, you **type commands**.\n\n👉 Press ⊞ Windows Key, type `cmd`, then press **Enter** to launch it.",
    hint: "Press the Windows key on your keyboard, type 'cmd', then press Enter.",
    shortcut: "⊞ + cmd + Enter",
    successMsg:
      "Command Prompt is open! 🖥️ See that blinking cursor? That's where you type commands. The text before it (like `C:\\Users\\Admin>`) is called the **prompt** — it tells you which folder you're currently in.",
    xpReward: 30,
    heartPenalty: 1,
  },

  {
    id: "cmd-dir-command",
    title: "📋 List Files with DIR",
    category: "terminal",
    action: "keyboard",
    targetElement: "#cmd-input",
    difficulty: "easy",
    instruction:
      "You're inside CMD! Let's run your first real Windows command.\n\n`dir` means **directory listing** — it shows all the files and folders in your current location.\n\n👉 Type `dir` and press **Enter**.",
    hint: "Type the three letters: d-i-r, then press Enter.",
    shortcut: "dir → Enter",
    successMsg:
      "You ran your first CMD command! 🎉 The `dir` command showed you all files in your current folder — just like File Explorer but in text form. Developers use this all day long!",
    xpReward: 35,
    heartPenalty: 1,
  },

  // ═══════════════════════════════════════════════════
  // 🗑️ WORLD 5 — RECYCLE BIN
  // ═══════════════════════════════════════════════════

  {
    id: "recycle-bin-open-1",
    title: "🗑️ Open the Recycle Bin",
    category: "recycle-bin",
    action: "double-click",
    targetElement: "#recycle-bin-icon",
    difficulty: "beginner",
    instruction:
      "The **Recycle Bin** is a temporary holding area for deleted files.\n\nWhen you delete a file, it goes here first — so you can recover it if you made a mistake! 🛡️\n\n👉 **Double-click** the Recycle Bin icon on the Desktop.",
    hint: "The Recycle Bin is the trash/bin icon on your Desktop. Double-click = two fast clicks!",
    successMsg:
      "Recycle Bin is open! 🗑️ Any files here can be restored. Once you 'Empty Recycle Bin', they're gone forever. Always check here before panicking about a missing file!",
    xpReward: 20,
    heartPenalty: 0,
  },

  {
    id: "recycle-bin-mcq",
    title: "❓ Recycle Bin Quiz",
    category: "recycle-bin",
    action: "mcq",
    targetElement: "#mcq-block",
    difficulty: "easy",
    instruction:
      "🧠 Quick Quiz!\n\nYou accidentally deleted an important project file. Where should you check FIRST to recover it?",
    hint: "Windows moves deleted files to a safe place before permanently removing them.",
    mcqOptions: [
      { label: "A", text: "Downloads folder" },
      { label: "B", text: "Recycle Bin" },
      { label: "C", text: "Control Panel" },
      { label: "D", text: "Task Manager" },
    ],
    correctOption: "B",
    successMsg:
      "Correct! 🎯 Always check the **Recycle Bin** first! Right-click the file there and choose 'Restore' to put it back where it was. You saved the project! 🏆",
    xpReward: 25,
    heartPenalty: 1,
  },

  // ═══════════════════════════════════════════════════
  // ⌨️ WORLD 6 — KEYBOARD SHORTCUTS
  // ═══════════════════════════════════════════════════

  {
    id: "shortcut-copy-paste",
    title: "⌨️ Copy & Paste",
    category: "shortcuts",
    action: "keyboard",
    targetElement: "#shortcut-demo-area",
    difficulty: "easy",
    instruction:
      "Keyboard shortcuts make you **10x faster** as a developer! 🚀\n\nThe most important ones:\n• **Ctrl + C** → Copy selected text/file\n• **Ctrl + V** → Paste\n• **Ctrl + X** → Cut (move, not copy)\n• **Ctrl + Z** → Undo (lifesaver! 🛡️)\n\n👉 Click the text box below, then press **Ctrl + A** to select all text.",
    hint: "Hold the Ctrl key and press A at the same time.",
    shortcut: "Ctrl + A",
    successMsg:
      "All text selected! ✨ Now you can copy it with Ctrl+C. These shortcuts work in EVERY Windows app — Word, VS Code, browsers, everything!",
    xpReward: 30,
    heartPenalty: 0,
  },

  {
    id: "shortcut-screenshot",
    title: "📸 Take a Screenshot",
    category: "shortcuts",
    action: "keyboard",
    targetElement: "#shortcut-demo-area",
    difficulty: "easy",
    instruction:
      "Need to capture what's on your screen? 📸\n\nWindows has built-in screenshot tools:\n• **PrtScn** → Copies entire screen to clipboard\n• **⊞ Win + Shift + S** → Opens Snip & Sketch (pick a region!)\n• **⊞ Win + PrtScn** → Saves to Pictures/Screenshots folder\n\n👉 Press **⊞ Windows + Shift + S** to try the snip tool.",
    hint: "Hold Windows key + Shift + S all at once. The screen will dim slightly.",
    shortcut: "⊞ + Shift + S",
    successMsg:
      "Screenshot tool activated! 📸 The screen dimmed and you can drag to select any area. This is how developers capture bugs, share designs, and take notes!",
    xpReward: 30,
    heartPenalty: 0,
  },

  {
    id: "shortcut-taskmanager",
    title: "⚙️ Open Task Manager",
    category: "shortcuts",
    action: "keyboard",
    targetElement: "#shortcut-demo-area",
    difficulty: "medium",
    instruction:
      "**Task Manager** is your system health monitor! 🏥\n\nIt shows:\n• All running apps and background processes\n• CPU, RAM, Disk, and Network usage\n• How to **force-close** a frozen app\n\n👉 Press **Ctrl + Shift + Esc** to open Task Manager.",
    hint: "Hold Ctrl + Shift + Esc all at the same time. This opens Task Manager directly!",
    shortcut: "Ctrl + Shift + Esc",
    successMsg:
      "Task Manager is open! 🏆 Let's use it to diagnose and end a frozen application.",
    xpReward: 30,
    heartPenalty: 1,
  },

  {
    id: "taskmanager-kill-chrome",
    title: "🏥 Kill Unresponsive Chrome",
    category: "shortcuts",
    action: "click",
    targetElement: "#taskmanager-kill-btn",
    difficulty: "medium",
    instruction:
      "Look at the Task Manager window! 📊\n\n`Chrome (Not Responding)` is currently consuming 98% of your CPU, causing the system to freeze!\n\n👉 Click the **End Task** button next to Google Chrome to force-close it.",
    hint: "Click on Google Chrome (Not Responding) in the task list, then click the End Task button at the bottom-right.",
    successMsg:
      "Chrome force-closed successfully! 🏥 Look at the CPU graph — it dropped immediately to 2%. Understanding how to kill frozen processes is a vital developer troubleshooting skill!",
    xpReward: 30,
    heartPenalty: 1,
  },

  {
    id: "settings-open-1",
    title: "⚙️ Open Settings App",
    category: "start-menu",
    action: "click",
    targetElement: "#settings-icon-start",
    difficulty: "easy",
    instruction:
      "Windows 11 lets you personalize your device and change system settings in the **Settings App**.\n\n👉 Open the **Start Menu** by clicking the Windows logo, then click the **Settings ⚙️** icon under Pinned Apps.",
    hint: "Click the Windows Start logo at the bottom, then click the gear icon labeled 'Settings'.",
    successMsg:
      "Settings app is open! ⚙️ You can configure display settings, custom themes, wallpapers, and accounts from here.",
    xpReward: 20,
    heartPenalty: 1,
  },

  {
    id: "settings-change-wallpaper",
    title: "🖼️ Change Desktop Wallpaper",
    category: "desktop",
    action: "click",
    targetElement: "#settings-wallpaper-bloom",
    difficulty: "easy",
    instruction:
      "Let's change our background wallpaper to give our coding environment a premium look!\n\nInside the Settings app, click on the **Bloom (Windows 11)** wallpaper tile.",
    hint: "Click the blue/purple 'Bloom' wallpaper block under personalization settings.",
    successMsg:
      "Amazing! Your desktop wallpaper has been updated. Visual personalization makes your coding workspace feel professional! 🎨",
    xpReward: 20,
    heartPenalty: 1,
  },

  {
    id: "recycle-bin-drag-1",
    title: "🗑️ Drag to Recycle Bin",
    category: "recycle-bin",
    action: "drag",
    targetElement: "#recycle-bin-icon",
    difficulty: "easy",
    instruction:
      "You can also delete files by dragging them directly to the trash.\n\nOn the desktop, you'll see a file named **old_notes.txt**.\n\n👉 Click and drag **old_notes.txt** and drop it onto the **Recycle Bin** icon.",
    hint: "Hold mouse click on old_notes.txt, move it over Recycle Bin, then release click.",
    successMsg:
      "Deleted! 🗑️ The Recycle Bin icon has updated to 'full'. You can double-click it to empty it or restore files.",
    xpReward: 25,
    heartPenalty: 0,
  },

  {
    id: "cmd-mkdir-project",
    title: "📁 Create Folder in CMD",
    category: "terminal",
    action: "keyboard",
    targetElement: "#cmd-input",
    difficulty: "easy",
    instruction:
      "Let's create a directory (folder) inside the Command Prompt.\n\nThe command `mkdir` stands for **make directory**.\n\n👉 Type `mkdir project` and press **Enter**.",
    hint: "Type: mkdir project, then press Enter.",
    successMsg:
      "Folder created! 📂 Let's run 'dir' next to verify that it is listed.",
    xpReward: 30,
    heartPenalty: 1,
  },

  {
    id: "cmd-dir-verify",
    title: "📋 Verify Folder Listing",
    category: "terminal",
    action: "keyboard",
    targetElement: "#cmd-input",
    difficulty: "easy",
    instruction:
      "Now let's check if the directory list shows your new project folder.\n\n👉 Type `dir` and press **Enter**.",
    hint: "Type `dir` and press Enter.",
    successMsg:
      "Success! You can see the new `<DIR> project` folder in the command line listing. You've officially created a folder via CLI! 🚀",
    xpReward: 30,
    heartPenalty: 1,
  },

  // ═══════════════════════════════════════════════════
  // 🏆 COMPLETION STEP
  // ═══════════════════════════════════════════════════

  {
    id: "world-1-complete",
    title: "🏆 World 1 Complete!",
    category: "desktop",
    action: "click",
    targetElement: "#completion-btn",
    difficulty: "beginner",
    instruction:
      "🎉 **YOU DID IT!** 🎉\n\nYou've completed the **Windows Desktop Simulator** and earned your:\n\n🏅 **Terminal Cadet Badge**\n⭐ **250+ XP**\n\nYou now know how to:\n✅ Navigate the Desktop & Taskbar\n✅ Use the Start Menu & File Explorer\n✅ Launch and use Command Prompt\n✅ Use the Recycle Bin safely\n✅ Apply essential keyboard shortcuts\n\n👉 Click **'Claim Your Reward'** to collect your XP and Badge!",
    hint: "You've already completed everything! Just click the button to claim your reward.",
    successMsg:
      "🏆 CERTIFIED: Windows Desktop Navigator! You're ready for Chapter 1 — Windows CLI Commands. Let's go! 🚀",
    xpReward: 100,
    heartPenalty: 0,
  },
];

// ─── Helper Functions ─────────────────────────────────────────────────────────

/** Get a single step by ID */
export const getStepById = (id: string): DesktopSimulatorStep | undefined =>
  desktopSimulatorSteps.find((step) => step.id === id);

/** Get all steps in a given category */
export const getStepsByCategory = (category: StepCategory): DesktopSimulatorStep[] =>
  desktopSimulatorSteps.filter((step) => step.category === category);

/** Calculate total XP for completing all steps */
export const getTotalXP = (): number =>
  desktopSimulatorSteps.reduce((sum, step) => sum + step.xpReward, 0);

/** Get index of current step */
export const getStepIndex = (id: string): number =>
  desktopSimulatorSteps.findIndex((step) => step.id === id);

/** Get next step after current */
export const getNextStep = (id: string): DesktopSimulatorStep | null => {
  const index = getStepIndex(id);
  return index >= 0 && index < desktopSimulatorSteps.length - 1
    ? desktopSimulatorSteps[index + 1]
    : null;
};

/** Check if all steps are completed (based on saved progress array) */
export const isSimulatorComplete = (completedIds: string[]): boolean =>
  desktopSimulatorSteps.every((step) => completedIds.includes(step.id));
