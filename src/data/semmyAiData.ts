// src/data/semmyAiData.ts
// Semmy AI Shared Knowledge Database
// All concepts are loaded from here by:
//   1. The global floating SemmyAiWidget
//   2. The textbook viewer side panel
//   3. The /bca/semmy-ai training playground

export interface SemmyConcept {
  title: string;
  summary: string;
  code?: string;
  isCustom?: boolean;
  tags?: string[];
}

export type SemmyKnowledgeBase = Record<string, SemmyConcept>;

const STORAGE_KEY = "nextsem_semmy_taught";

// ─── Default built-in curriculum concepts ────────────────────────────────────
export const DEFAULT_CONCEPTS: SemmyKnowledgeBase = {
  "von neumann": {
    title: "Von Neumann Architecture",
    summary: "Proposed by John von Neumann in 1945, this design forms the basis of modern computers. Key features: 1) Stored Program Concept — RAM holds both code instructions and data, 2) CPU with ALU + registers executing instructions sequentially, 3) Program Counter (PC) tracking current instruction address.",
    code: "// Von Neumann Fetch-Decode-Execute Cycle:\n// 1. FETCH: Load instruction at PC address into IR\n// 2. DECODE: Control Unit interprets opcode bits\n// 3. EXECUTE: ALU performs operation, stores result in ACC\n// 4. UPDATE PC: Increment to next instruction cell",
    tags: ["architecture", "cpu", "memory", "unit2"]
  },
  "register": {
    title: "CPU Registers",
    summary: "Registers are ultra-fast volatile storage cells inside the CPU. They hold active instructions, memory addresses, and data values. Key registers: Program Counter (PC), Accumulator (ACC), Instruction Register (IR), Memory Address Register (MAR), Memory Buffer Register (MBR).",
    code: "ACC = 0;        // Accumulator: ALU workspace\nPC  = 04;       // Program Counter: next instruction\nIR  = 'ADD 06'; // Instruction Register: current op\nMAR = 06;       // Memory Address Register: target cell\nMBR = 27;       // Memory Buffer Register: fetched value",
    tags: ["cpu", "memory", "unit2"]
  },
  "gate": {
    title: "Digital Logic Gates",
    summary: "Logic gates are transistor-based switches implementing Boolean algebra. They are the atomic building blocks of all digital chips. Types: AND (both high), OR (any high), NOT (invert), NAND, NOR, XOR. Multiple gates form adders, multiplexers, and full ALU circuits.",
    code: "// AND Gate Truth Table:\nA=0, B=0 → 0  (Low)\nA=1, B=0 → 0  (Low)\nA=0, B=1 → 0  (Low)\nA=1, B=1 → 1  (HIGH ✓)",
    tags: ["hardware", "boolean", "unit1"]
  },
  "babbage": {
    title: "Charles Babbage & Engines",
    summary: "Charles Babbage (1791–1871) designed the Difference Engine (tabulating polynomials mechanically) and the Analytical Engine — the first concept of a general-purpose programmable computer with a Store (memory), Mill (CPU), punched card input, and printer output. He is celebrated as the 'Father of the Computer'.",
    code: "// Analytical Engine structure:\nStore = RAM   // Holds 1000 numbers of 50 digits each\nMill  = CPU   // Performs arithmetic operations\nCards = Input // Punched card instruction streams\nPrint = Output // Printed result ribbons",
    tags: ["history", "unit1"]
  },
  "generation": {
    title: "Computer Generations",
    summary: "Computer evolution is classified into 5 generations: 1st (1940s–50s, Vacuum Tubes — hot, room-sized), 2nd (1950s–60s, Transistors — smaller, faster), 3rd (1960s–70s, ICs — silicon chips), 4th (1970s–present, VLSI Microprocessors — single chip CPU), 5th (present–future, ULSI + AI neural nets).",
    code: "const generations = {\n  '1st': { tech: 'Vacuum Tubes',       size: 'Room-sized' },\n  '2nd': { tech: 'Transistors',         size: 'Cupboard'   },\n  '3rd': { tech: 'Integrated Circuits', size: 'Desk'       },\n  '4th': { tech: 'VLSI Microprocessors',size: 'Handheld'   },\n  '5th': { tech: 'ULSI + Neural Nets',  size: 'Wearable'   },\n};",
    tags: ["history", "unit1"]
  },
  "limit": {
    title: "Computer Limitations",
    summary: "Computers have inherent limitations: 1) No native intelligence — they follow only programmed instructions, 2) Emotionless — no empathy, art, or moral judgment, 3) Garbage In, Garbage Out (GIGO) — incorrect input always produces incorrect output, 4) No self-correction — they cannot identify errors in their own logic.",
    code: "// GIGO Principle:\nif (input === 'garbage') {\n  return 'garbage'; // Always!\n}\n// Computers cannot validate their own program logic",
    tags: ["theory", "unit1"]
  },
  "alu": {
    title: "Arithmetic Logic Unit (ALU)",
    summary: "The ALU is the computational core of the CPU. It performs two categories of operations: 1) Arithmetic — addition, subtraction, multiplication, division, 2) Logical — AND, OR, NOT comparisons (greater-than, equal-to). Results are stored in the Accumulator register and status flags are set.",
    code: "// ALU Operation Types:\nopcode = 'ADD'  → result = operand1 + operand2\nopcode = 'SUB'  → result = operand1 - operand2\nopcode = 'CMP'  → zeroFlag = (A === B) ? 1 : 0\nopcode = 'AND'  → result = A & B  (bitwise)",
    tags: ["cpu", "hardware", "unit2"]
  },
  "bus": {
    title: "System Bus Pathways",
    summary: "The system bus is a set of copper pathways on the motherboard linking CPU, RAM, and I/O controllers. It has 3 types: 1) Data Bus — carries actual values (bidirectional), 2) Address Bus — carries memory cell addresses (unidirectional), 3) Control Bus — carries read/write/interrupt signals.",
    code: "// 64-bit system bus layout:\nData Bus    = 64 wires ↔ (carries 8 bytes per transfer)\nAddress Bus = 64 wires →  (can address 2^64 memory cells)\nControl Bus = N wires  →  (READ, WRITE, RESET, IRQ flags)",
    tags: ["hardware", "motherboard", "unit1"]
  },
  "bios": {
    title: "BIOS & POST Sequence",
    summary: "BIOS (Basic Input/Output System) is firmware stored in a ROM chip on the motherboard. On power-on, it runs the Power On Self Test (POST) — checking CPU, RAM, keyboard, and storage. Once hardware passes POST, BIOS loads the Operating System bootloader from the boot disk.",
    code: "// POST Boot Sequence:\n[1] CPU initializes and reads BIOS ROM address\n[2] BIOS runs POST — tests RAM, CPU, keyboard\n[3] BIOS searches bootable disk (HDD/SSD/USB)\n[4] Bootloader is loaded at memory address 0x7C00\n[5] OS kernel takes over system control",
    tags: ["hardware", "motherboard", "unit1"]
  },
  "ram": {
    title: "RAM (Random Access Memory)",
    summary: "RAM is the primary volatile workspace memory. Any cell can be accessed in constant time regardless of location (random access). Under Von Neumann architecture, RAM stores both program instructions and data in the same address space. Data is lost instantly when power is cut.",
    code: "RAM[0] = 15;    // operand A\nRAM[1] = 27;    // operand B\nRAM[2] = 'ADD'; // instruction\nRAM[3] = 42;    // result (stored after ALU)\n// Access time: nanoseconds (volatile)",
    tags: ["memory", "unit1", "unit2"]
  },
  "abacus": {
    title: "Abacus — First Computing Device",
    summary: "The Abacus (3000 B.C., China) is the earliest known computing instrument. It consists of vertical wires holding beads separated by a horizontal bar into 'heaven' (top, value 5) and 'earth' (bottom, value 1) sections. Skilled operators can add and subtract as fast as a modern pocket calculator.",
    tags: ["history", "unit1"]
  },
  "cache": {
    title: "CPU Cache Memory (L1/L2/L3)",
    summary: "Cache is ultra-fast SRAM memory built directly into the CPU die. It stores frequently accessed instruction and data blocks to reduce slow RAM access cycles. L1 cache (fastest, smallest, ~32KB) is per-core, L2 (~256KB) per-core, L3 (largest, ~8MB) shared across all cores.",
    code: "// Cache hierarchy:\nL1 Cache: 32KB,  ~1ns access  (per core)\nL2 Cache: 256KB, ~4ns access  (per core)\nL3 Cache: 8MB,   ~10ns access (shared)\nRAM:      16GB,  ~60ns access (system)",
    tags: ["hardware", "cpu", "memory"]
  },
  "terminal": {
    title: "Windows Command Prompt Simulator",
    summary: "An interactive CLI simulation environment that teaches ⊞ Windows command prompt utilities. Learn how to list directories (dir), create folders (mkdir), change paths (cd), write files (echo), read files (type), and check network configurations (ipconfig) step-by-step.",
    code: "// Taught CMD commands:\n> dir               # List folder items\n> mkdir my_folder   # Create directory\n> cd my_folder      # Navigate inside\n> ipconfig          # View network configuration",
    tags: ["cmd", "command", "terminal", "windows", "cli"]
  },
  "points": {
    title: "App Gamification System",
    summary: "Earn 🪙 points and XP by completing chapters and interactive lessons. Track your learning progress through streaks and lives. Complete MCQs and fill-in-the-blanks on study notes pages to increase your rank.",
    code: "// Gamification State:\nconst stats = {\n  points: 120,      // Earned by finishing units\n  certified: true,  // Granted on course completion\n  progress: '100%'\n};",
    tags: ["points", "xp", "gamification", "streak", "lives", "hearts"]
  },
  "semmy": {
    title: "Semmy AI Training Laboratory",
    summary: "Train Semmy AI right on the web playground at /bca/semmy-ai! Type custom keywords and responses. Semmy instantly updates its state across the app using local storage and updates the global floating chatbot bubble widget.",
    code: "// Train Semmy dynamically:\nsaveSemmyConcept('my-keyword', {\n  title: 'Custom Concept Title',\n  summary: 'Response details...',\n  tags: ['custom']\n});",
    tags: ["semmy", "ai", "train", "chat", "widget"]
  },
  "accounting": {
    title: "Class 11 Accountancy Financial Part-1",
    summary: "Covers the fundamental principles of accounting. Topics include the double-entry bookkeeping system (Luca Pacioli, 1494), qualitative characteristics of financial reports (relevance, reliability, comparability), and Indian Goods and Services Tax (GST, CGST, SGST, IGST) rules.",
    code: "// Accounting Identity Equation:\nAssets = Liabilities + Owner's Capital\n// GST rule:\nIntra-state sales -> CGST + SGST (50/50 split)\nInter-state sales -> IGST (100% Centre)",
    tags: ["accounting", "finance", "gst", "class11"]
  },
  "physics": {
    title: "Class 12 Physics Part-1 (Current Electricity)",
    summary: "Deals with the flow of electric charges. Topics cover electric current density (j = I/A), drift velocity (vd = -eEτ/m), conductivity (j = σE), cells in series and parallel, Wheatstone bridge balance conditions, and Kirchhoff's loop and junction laws.",
    code: "// Current Density Vector Form:\nj = σ * E\n// Kirchhoff junction rule:\nΣ I_inward = Σ I_outward  (Charge Conservation)\n// Kirchhoff loop rule:\nΣ ΔV = 0  (Energy Conservation)",
    tags: ["physics", "electricity", "current", "class12"]
  }
};

// ─── Dynamic loader (merges defaults + LocalStorage custom concepts) ──────────
export function getSemmyResponses(): SemmyKnowledgeBase {
  const combined: SemmyKnowledgeBase = { ...DEFAULT_CONCEPTS };

  if (typeof window === "undefined") return combined;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const custom: SemmyKnowledgeBase = JSON.parse(raw);
      Object.entries(custom).forEach(([key, val]) => {
        combined[key.toLowerCase().trim()] = { ...val, isCustom: true };
      });
    }
  } catch (e) {
    console.warn("Semmy AI: Failed to load custom concepts from storage", e);
  }

  return combined;
}

// ─── Match user input to the best knowledge base entry ───────────────────────
export function querySemmy(input: string, kb: SemmyKnowledgeBase): SemmyConcept | null {
  const normalized = input.toLowerCase().trim();

  // Direct key match
  if (kb[normalized]) return kb[normalized];

  // Partial keyword scan
  for (const [key, concept] of Object.entries(kb)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return concept;
    }
  }

  // Tag match
  const words = normalized.split(/\s+/);
  for (const [, concept] of Object.entries(kb)) {
    if (concept.tags?.some(tag => words.includes(tag))) {
      return concept;
    }
  }

  return null;
}

// ─── Save a user-taught concept to LocalStorage ───────────────────────────────
export function saveSemmyConcept(keyword: string, concept: SemmyConcept): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const existing = raw ? JSON.parse(raw) : {};
    existing[keyword.toLowerCase().trim()] = { ...concept, isCustom: true };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {
    console.warn("Semmy AI: Failed to save concept", e);
  }
}

// ─── Delete a single custom concept ──────────────────────────────────────────
export function deleteSemmyConcept(keyword: string): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const existing = JSON.parse(raw);
    delete existing[keyword.toLowerCase().trim()];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (e) { }
}

// ─── Reset all custom concepts ────────────────────────────────────────────────
export function resetSemmyCustomConcepts(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

// ─── Get only user-taught custom concepts ────────────────────────────────────
export function getCustomConcepts(): SemmyKnowledgeBase {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}
