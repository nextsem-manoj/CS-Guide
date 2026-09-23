"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowRight, RotateCcw, Play, CheckCircle2, 
  X, ChevronRight, Zap, Cpu, Terminal, Database, FileCode, Sparkles, BookOpen, Layers, Award
} from "lucide-react";

interface CStatement {
  id: string;
  code: string;
  explanation: string;
  actionType: "include" | "declare" | "assign" | "input" | "print" | "return";
  varName?: string;
  varType?: string;
  address?: string;
  value?: string | number;
}

interface RamSlot {
  address: string;
  name: string;
  type: string;
  value: string | number | null;
  isHighlighted?: boolean;
}

interface Challenge {
  id: string;
  challengeNumber: number;
  title: string;
  mission: string;
  targetOutput: string;
  maxSteps: number;
  availablePills: CStatement[];
  expectedSequence: string[];
  initialRam: RamSlot[];
  explanation: {
    title: string;
    concept: string;
    analogy: string;
    takeaway: string;
  };
}

interface Chapter {
  chapterNumber: number;
  title: string;
  conceptTitle: string;
  badge: string;
  challenges: Challenge[];
}

// ── COMPLETE PHASE 1: 4 CHAPTERS WITH 5 CHALLENGES EACH (TOTAL 20 CHALLENGES) ──
const PHASE_1_DATA: Chapter[] = [
  // ── CHAPTER 1: main() & Console Output (5 Challenges) ──
  {
    chapterNumber: 1,
    title: "The main() Flow & Console Output",
    conceptTitle: "Standard I/O & Program Execution",
    badge: "Chapter 1",
    challenges: [
      {
        id: "ch1-ex1",
        challengeNumber: 1,
        title: "Hello World Basics",
        mission: "Assemble your very first C program: include standard I/O library <stdio.h>, print 'Hello, World!' to the console, and return 0.",
        targetOutput: "Hello, World!",
        maxSteps: 3,
        initialRam: [
          { address: "0x000", name: "stdout_stream", type: "I/O Buffer", value: "READY" }
        ],
        availablePills: [
          { id: "c1-inc", code: "#include <stdio.h>", explanation: "Loads Standard Input/Output functions like printf()", actionType: "include" },
          { id: "c1-p1", code: 'printf("Hello, World!\\n");', explanation: "Prints 'Hello, World!' to the console window", actionType: "print", value: "Hello, World!" },
          { id: "c1-ret", code: "return 0;", explanation: "Signals to Operating System that program finished with 0 errors", actionType: "return" }
        ],
        expectedSequence: ["c1-inc", "c1-p1", "c1-ret"],
        explanation: {
          title: "The Anatomy of a C Program",
          concept: "Every C program starts inside int main() and runs instructions line-by-line from top to bottom. #include <stdio.h> provides the printf() function.",
          analogy: "Think of #include <stdio.h> as plugging in the computer monitor, and printf() as typing words onto the screen.",
          takeaway: "Every C program needs <stdio.h> to print text and begins execution at main()!"
        }
      },
      {
        id: "ch1-ex2",
        challengeNumber: 2,
        title: "Multi-line Printing with \\n",
        mission: "Print your Name on line 1, Course on line 2 using the newline character \\n, and return 0.",
        targetOutput: "Name: Alex | Course: C Language",
        maxSteps: 3,
        initialRam: [
          { address: "0x000", name: "stdout_stream", type: "I/O Buffer", value: "ACTIVE" }
        ],
        availablePills: [
          { id: "c1-p2a", code: 'printf("Name: Alex | ");', explanation: "Prints 'Name: Alex | ' without newline", actionType: "print", value: "Name: Alex | " },
          { id: "c1-p2b", code: 'printf("Course: C Language\\n");', explanation: "Prints course name and creates a new line", actionType: "print", value: "Name: Alex | Course: C Language" },
          { id: "c1-ret2", code: "return 0;", explanation: "Normal program termination code 0", actionType: "return" }
        ],
        expectedSequence: ["c1-p2a", "c1-p2b", "c1-ret2"],
        explanation: {
          title: "The \\n Newline Escape Sequence",
          concept: "In C, '\\n' is an escape sequence that moves the cursor to the next line. Consecutive printf() calls without '\\n' continue printing on the same line.",
          analogy: "Pressing Enter on your keyboard is represented by '\\n' in C strings.",
          takeaway: "Use \\n whenever you want output to start on a fresh new line!"
        }
      },
      {
        id: "ch1-ex3",
        challengeNumber: 3,
        title: "Integer Placeholders with %d",
        mission: "Print a welcome message embedding year 2026 using the %d integer placeholder.",
        targetOutput: "Welcome to Nextsem in Year 2026!",
        maxSteps: 2,
        initialRam: [
          { address: "0x004", name: "format_engine", type: "printf parser", value: "%d Ready" }
        ],
        availablePills: [
          { id: "c1-p3", code: 'printf("Welcome to Nextsem in Year %d!\\n", 2026);', explanation: "Replaces %d with integer number 2026 in output", actionType: "print", value: "Welcome to Nextsem in Year 2026!" },
          { id: "c1-ret3", code: "return 0;", explanation: "Clean program exit", actionType: "return" }
        ],
        expectedSequence: ["c1-p3", "c1-ret3"],
        explanation: {
          title: "The %d Format Specifier",
          concept: "%d stands for 'decimal integer'. In printf(), %d acts as a placeholder that gets replaced by the number provided after the comma.",
          analogy: "%d is a blank slot in a fill-in-the-blanks sentence.",
          takeaway: "%d tells printf to insert a whole integer number at that exact spot!"
        }
      },
      {
        id: "ch1-ex4",
        challengeNumber: 4,
        title: "Tab Alignment with \\t",
        mission: "Format two columns 'ID' and 'SCORE' neatly separated by a horizontal tab \\t.",
        targetOutput: "ID: 101 \t SCORE: 98",
        maxSteps: 2,
        initialRam: [
          { address: "0x000", name: "stdout_stream", type: "I/O Buffer", value: "TAB_ALIGNED" }
        ],
        availablePills: [
          { id: "c1-p4", code: 'printf("ID: 101 \\t SCORE: 98\\n");', explanation: "Inserts a tab spacing between ID and SCORE", actionType: "print", value: "ID: 101 \t SCORE: 98" },
          { id: "c1-ret4", code: "return 0;", explanation: "Return success code", actionType: "return" }
        ],
        expectedSequence: ["c1-p4", "c1-ret4"],
        explanation: {
          title: "Tab Alignment (\\t)",
          concept: "'\\t' inserts a horizontal tab space (usually 4 to 8 columns), allowing you to align table columns cleanly without typing manual spaces.",
          analogy: "Like hitting the 'Tab' key on your keyboard to align spreadsheet data.",
          takeaway: "\\t creates clean, aligned tables in terminal output!"
        }
      },
      {
        id: "ch1-ex5",
        challengeNumber: 5,
        title: "Exit Status Codes & return 0",
        mission: "Print system status 'All Systems Operational' and return exit code 0 to the Operating System.",
        targetOutput: "All Systems Operational [Exit 0]",
        maxSteps: 2,
        initialRam: [
          { address: "0x008", name: "exit_register", type: "int", value: 0 }
        ],
        availablePills: [
          { id: "c1-p5", code: 'printf("All Systems Operational [Exit 0]\\n");', explanation: "Prints system operational confirmation", actionType: "print", value: "All Systems Operational [Exit 0]" },
          { id: "c1-ret5", code: "return 0;", explanation: "Returns 0 to tell Windows/Linux that program succeeded", actionType: "return" }
        ],
        expectedSequence: ["c1-p5", "c1-ret5"],
        explanation: {
          title: "Why return 0 matters in C",
          concept: "The Operating System checks the return value of your program. A return value of 0 means 'All Good, Zero Errors'. Any non-zero number (like 1 or -1) indicates a runtime error.",
          analogy: "return 0 is signing a delivery receipt stating the package was delivered with zero damage.",
          takeaway: "Always end int main() with return 0 to indicate successful program execution!"
        }
      }
    ]
  },

  // ── CHAPTER 2: Variables & Data Types (5 Challenges) ──
  {
    chapterNumber: 2,
    title: "Variables & Data Types (int, char, float)",
    conceptTitle: "Physical Memory Allocation in RAM",
    badge: "Chapter 2",
    challenges: [
      {
        id: "ch2-ex1",
        challengeNumber: 1,
        title: "Integer Allocation (int)",
        mission: "Declare a 4-byte integer 'age = 21' at RAM address 0x100 and print it to the screen.",
        targetOutput: "Age = 21",
        maxSteps: 2,
        initialRam: [
          { address: "0x100", name: "age", type: "int (4 bytes)", value: null }
        ],
        availablePills: [
          { id: "c2-a1", code: "int age = 21;", explanation: "Reserves 4 bytes at address 0x100 and writes 21", actionType: "declare", varName: "age", value: 21, address: "0x100" },
          { id: "c2-p1", code: 'printf("Age = %d\\n", age);', explanation: "Reads age from 0x100 and prints integer", actionType: "print", value: "Age = 21" }
        ],
        expectedSequence: ["c2-a1", "c2-p1"],
        explanation: {
          title: "Integers in RAM (4 Bytes)",
          concept: "An 'int' in C stores whole numbers (-2 billion to +2 billion) by occupying 4 contiguous bytes in physical RAM.",
          analogy: "An 'int' is a 4-slot locker in RAM dedicated to storing whole numbers.",
          takeaway: "Use 'int' for counting items, ages, scores, and discrete quantities!"
        }
      },
      {
        id: "ch2-ex2",
        challengeNumber: 2,
        title: "Character Allocation (char)",
        mission: "Declare a 1-byte character 'grade = A' at RAM address 0x104 and display it with %c.",
        targetOutput: "Grade = A",
        maxSteps: 2,
        initialRam: [
          { address: "0x104", name: "grade", type: "char (1 byte)", value: null }
        ],
        availablePills: [
          { id: "c2-g1", code: "char grade = 'A';", explanation: "Reserves 1 byte at address 0x104 and stores ASCII 'A' (65)", actionType: "declare", varName: "grade", value: "'A'", address: "0x104" },
          { id: "c2-p2", code: 'printf("Grade = %c\\n", grade);', explanation: "Prints character using %c format specifier", actionType: "print", value: "Grade = A" }
        ],
        expectedSequence: ["c2-g1", "c2-p2"],
        explanation: {
          title: "Characters in RAM (1 Byte & Single Quotes)",
          concept: "A 'char' stores single characters in 1 byte of memory. Always enclose single characters in single quotes ('A'), NOT double quotes.",
          analogy: "A 'char' is a mini 1-slot locker in RAM holding a single letter badge.",
          takeaway: "'char' uses %c and stores single characters enclosed in single quotes ('')!"
        }
      },
      {
        id: "ch2-ex3",
        challengeNumber: 3,
        title: "Decimal Floats (float)",
        mission: "Declare a decimal variable 'temp = 98.6' at address 0x108 and print it with %.1f.",
        targetOutput: "Temperature = 98.6 F",
        maxSteps: 2,
        initialRam: [
          { address: "0x108", name: "temp", type: "float (4 bytes)", value: null }
        ],
        availablePills: [
          { id: "c2-f1", code: "float temp = 98.6f;", explanation: "Allocates 4 bytes for fractional decimal number 98.6", actionType: "declare", varName: "temp", value: 98.6, address: "0x108" },
          { id: "c2-p3", code: 'printf("Temperature = %.1f F\\n", temp);', explanation: "Prints float formatted to 1 decimal place using %.1f", actionType: "print", value: "Temperature = 98.6 F" }
        ],
        expectedSequence: ["c2-f1", "c2-p3"],
        explanation: {
          title: "Floating-Point Decimals (float & %f)",
          concept: "The 'float' type stores real numbers with fractional decimal points using IEEE-754 binary encoding in 4 bytes of RAM.",
          analogy: "Like a digital thermometer that can measure points between whole numbers (98.6).",
          takeaway: "Use 'float' with %f (or %.1f for 1 decimal precision) for measurements and prices!"
        }
      },
      {
        id: "ch2-ex4",
        challengeNumber: 4,
        title: "Multiple Variables in Adjacent Memory",
        mission: "Declare both score (500) and rank ('S') in adjacent RAM boxes, then print both in a single printf.",
        targetOutput: "Player Score: 500 | Rank: S",
        maxSteps: 3,
        initialRam: [
          { address: "0x100", name: "score", type: "int (4 bytes)", value: null },
          { address: "0x104", name: "rank", type: "char (1 byte)", value: null }
        ],
        availablePills: [
          { id: "c2-sc", code: "int score = 500;", explanation: "Stores 500 in score at 0x100", actionType: "declare", varName: "score", value: 500, address: "0x100" },
          { id: "c2-rk", code: "char rank = 'S';", explanation: "Stores 'S' in rank at 0x104", actionType: "declare", varName: "rank", value: "'S'", address: "0x104" },
          { id: "c2-p4", code: 'printf("Player Score: %d | Rank: %c\\n", score, rank);', explanation: "Prints %d and %c in sequential order", actionType: "print", value: "Player Score: 500 | Rank: S" }
        ],
        expectedSequence: ["c2-sc", "c2-rk", "c2-p4"],
        explanation: {
          title: "Multi-Variable Printing Order",
          concept: "In printf(), placeholders are matched strictly left-to-right with the arguments after the string (%d gets score, %c gets rank).",
          analogy: "Matching passengers with their reserved seat tickets in exact order.",
          takeaway: "Order of variables in printf must match the order of placeholders (%d, %c)!"
        }
      },
      {
        id: "ch2-ex5",
        challengeNumber: 5,
        title: "Variable Overwriting & Re-assignment",
        mission: "Set level = 1, then overwrite it to level = 2 to see the RAM memory box update in real-time.",
        targetOutput: "Upgraded to Level 2",
        maxSteps: 3,
        initialRam: [
          { address: "0x100", name: "level", type: "int (4 bytes)", value: null }
        ],
        availablePills: [
          { id: "c2-l1", code: "int level = 1;", explanation: "Initializes level with 1 at 0x100", actionType: "declare", varName: "level", value: 1, address: "0x100" },
          { id: "c2-l2", code: "level = 2;", explanation: "Overwrites previous 1 with 2 inside RAM box", actionType: "assign", varName: "level", value: 2 },
          { id: "c2-p5", code: 'printf("Upgraded to Level %d\\n", level);', explanation: "Reads updated value 2 from RAM", actionType: "print", value: "Upgraded to Level 2" }
        ],
        expectedSequence: ["c2-l1", "c2-l2", "c2-p5"],
        explanation: {
          title: "Variables Vary: Memory Overwrite",
          concept: "Variables are mutable: writing 'level = 2;' erases the old number 1 and places 2 in that exact same RAM address. Notice you don't repeat 'int' when re-assigning!",
          analogy: "Erasing a chalkboard and writing a new number in the same spot.",
          takeaway: "Only use 'int' once to create a variable; use 'var = val;' to update its value!"
        }
      }
    ]
  },

  // ── CHAPTER 3: Arithmetic & ALU Operations (5 Challenges) ──
  {
    chapterNumber: 3,
    title: "Arithmetic & ALU Operations (+, -, *, /, %)",
    conceptTitle: "CPU Computation & Memory State Update",
    badge: "Chapter 3",
    challenges: [
      {
        id: "ch3-ex1",
        challengeNumber: 1,
        title: "Addition & Subtraction",
        mission: "Start wallet with $100, add +$50 bonus, spend -$30 for food, and print remaining wallet balance.",
        targetOutput: "Wallet Balance: $120",
        maxSteps: 4,
        initialRam: [
          { address: "0x100", name: "wallet", type: "int (4 bytes)", value: null }
        ],
        availablePills: [
          { id: "c3-w1", code: "int wallet = 100;", explanation: "Initial balance 100 at 0x100", actionType: "declare", varName: "wallet", value: 100, address: "0x100" },
          { id: "c3-w2", code: "wallet = wallet + 50;", explanation: "ALU calculates 100+50 = 150 and writes to RAM", actionType: "assign", varName: "wallet", value: 150 },
          { id: "c3-w3", code: "wallet = wallet - 30;", explanation: "ALU calculates 150-30 = 120 and writes to RAM", actionType: "assign", varName: "wallet", value: 120 },
          { id: "c3-p1", code: 'printf("Wallet Balance: $%d\\n", wallet);', explanation: "Reads final balance 120 from RAM", actionType: "print", value: "Wallet Balance: $120" }
        ],
        expectedSequence: ["c3-w1", "c3-w2", "c3-w3", "c3-p1"],
        explanation: {
          title: "The CPU ALU: Fetch, Compute, Store",
          concept: "When C executes 'wallet = wallet + 50;', the CPU fetches 100 from RAM, adds 50 inside the Arithmetic Logic Unit (ALU), and stores 150 back into RAM.",
          analogy: "Taking money out of your wallet, counting it, and putting the new total back in.",
          takeaway: "The right-side expression is evaluated first, then saved to the left-side variable!"
        }
      },
      {
        id: "ch3-ex2",
        challengeNumber: 2,
        title: "Multiplication & Area Calculation",
        mission: "Define length = 8 and width = 5, compute rectangle area with area = length * width, and display it.",
        targetOutput: "Rectangle Area = 40 sq units",
        maxSteps: 4,
        initialRam: [
          { address: "0x100", name: "length", type: "int (4 bytes)", value: null },
          { address: "0x104", name: "width", type: "int (4 bytes)", value: null },
          { address: "0x108", name: "area", type: "int (4 bytes)", value: null }
        ],
        availablePills: [
          { id: "c3-l", code: "int length = 8;", explanation: "Length = 8 at 0x100", actionType: "declare", varName: "length", value: 8, address: "0x100" },
          { id: "c3-w", code: "int width = 5;", explanation: "Width = 5 at 0x104", actionType: "declare", varName: "width", value: 5, address: "0x104" },
          { id: "c3-a", code: "int area = length * width;", explanation: "ALU multiplies 8 * 5 = 40 and stores in area at 0x108", actionType: "declare", varName: "area", value: 40, address: "0x108" },
          { id: "c3-p2", code: 'printf("Rectangle Area = %d sq units\\n", area);', explanation: "Displays calculated area", actionType: "print", value: "Rectangle Area = 40 sq units" }
        ],
        expectedSequence: ["c3-l", "c3-w", "c3-a", "c3-p2"],
        explanation: {
          title: "Multiplication with the * Operator",
          concept: "In C, the asterisk (*) is the multiplication operator. The CPU reads both length and width from RAM, multiplies them, and assigns the result to area.",
          analogy: "Like computing the tile count of a room by multiplying rows by columns.",
          takeaway: "Use * for multiplication across all C numeric types!"
        }
      },
      {
        id: "ch3-ex3",
        challengeNumber: 3,
        title: "Integer Division & Truncation (/)",
        mission: "Divide 17 cookies among 4 people using integer division (int perPerson = 17 / 4;).",
        targetOutput: "Each Person Gets: 4 cookies",
        maxSteps: 3,
        initialRam: [
          { address: "0x100", name: "cookies", type: "int", value: 17 },
          { address: "0x104", name: "perPerson", type: "int", value: null }
        ],
        availablePills: [
          { id: "c3-ck", code: "int cookies = 17;", explanation: "17 cookies in RAM", actionType: "declare", varName: "cookies", value: 17, address: "0x100" },
          { id: "c3-dv", code: "int perPerson = cookies / 4;", explanation: "Integer division: 17 / 4 = 4 (decimal .25 is truncated)", actionType: "declare", varName: "perPerson", value: 4, address: "0x104" },
          { id: "c3-p3", code: 'printf("Each Person Gets: %d cookies\\n", perPerson);', explanation: "Prints quotient 4", actionType: "print", value: "Each Person Gets: 4 cookies" }
        ],
        expectedSequence: ["c3-ck", "c3-dv", "c3-p3"],
        explanation: {
          title: "Integer Division Truncates Decimals!",
          concept: "When dividing two integers in C (17 / 4), the result is ALWAYS an integer (4). C truncates (drops) the decimal portion entirely.",
          analogy: "If you share 17 whole apples equally among 4 friends, each friend gets 4 whole apples.",
          takeaway: "In C integer division (int / int), decimals are discarded, not rounded!"
        }
      },
      {
        id: "ch3-ex4",
        challengeNumber: 4,
        title: "Modulo Remainder Operator (%)",
        mission: "Find the leftover cookies when 17 cookies are divided by 4 using the modulo % operator.",
        targetOutput: "Leftover Cookies: 1",
        maxSteps: 2,
        initialRam: [
          { address: "0x100", name: "leftover", type: "int (4 bytes)", value: null }
        ],
        availablePills: [
          { id: "c3-mod", code: "int leftover = 17 % 4;", explanation: "17 divided by 4 leaves remainder 1 (4*4 + 1 = 17)", actionType: "declare", varName: "leftover", value: 1, address: "0x100" },
          { id: "c3-p4", code: 'printf("Leftover Cookies: %d\\n", leftover);', explanation: "Prints remainder 1", actionType: "print", value: "Leftover Cookies: 1" }
        ],
        expectedSequence: ["c3-mod", "c3-p4"],
        explanation: {
          title: "The Modulo % Remainder Operator",
          concept: "The modulo operator (%) returns the remainder of an integer division. 17 % 4 = 1 because 4 fits into 17 four times (16) with 1 left over.",
          analogy: "Finding the change left over after paying in full bills.",
          takeaway: "Use % to check for even/odd numbers (num % 2 == 0) and clock cycles!"
        }
      },
      {
        id: "ch3-ex5",
        challengeNumber: 5,
        title: "Shorthand Increment & Decrement (++, --)",
        mission: "Start with lives = 3, decrement lives with lives--, and print remaining lives.",
        targetOutput: "Lives Remaining: 2",
        maxSteps: 3,
        initialRam: [
          { address: "0x100", name: "lives", type: "int", value: null }
        ],
        availablePills: [
          { id: "c3-lv", code: "int lives = 3;", explanation: "Initial 3 lives in RAM", actionType: "declare", varName: "lives", value: 3, address: "0x100" },
          { id: "c3-dec", code: "lives--;", explanation: "Shorthand for lives = lives - 1; (reduces to 2)", actionType: "assign", varName: "lives", value: 2 },
          { id: "c3-p5", code: 'printf("Lives Remaining: %d\\n", lives);', explanation: "Prints 2 lives", actionType: "print", value: "Lives Remaining: 2" }
        ],
        expectedSequence: ["c3-lv", "c3-dec", "c3-p5"],
        explanation: {
          title: "The Increment & Decrement Shortcuts",
          concept: "'++' adds 1 to a variable, and '--' subtracts 1 from a variable. 'lives--;' is equivalent to 'lives = lives - 1;' but faster and cleaner to write.",
          analogy: "Clicking a tally counter button up or down by 1.",
          takeaway: "Use ++ and -- for counters, loops, and game lives!"
        }
      }
    ]
  },

  // ── CHAPTER 4: User Input & Memory Addresses (5 Challenges) ──
  {
    chapterNumber: 4,
    title: "User Input & Address Operator (&)",
    conceptTitle: "Direct Memory Input with scanf()",
    badge: "Chapter 4",
    challenges: [
      {
        id: "ch4-ex1",
        challengeNumber: 1,
        title: "Reading Integer with scanf(&var)",
        mission: "Declare 'int pin;', read user input directly into its RAM address &pin, and print verified PIN.",
        targetOutput: "PIN Verified: 4096",
        maxSteps: 3,
        initialRam: [
          { address: "0x100", name: "pin", type: "int (4 bytes)", value: null }
        ],
        availablePills: [
          { id: "c4-p1a", code: "int pin;", explanation: "Allocates 4 bytes at address 0x100 (uninitialized)", actionType: "declare", varName: "pin", value: "null", address: "0x100" },
          { id: "c4-s1", code: 'scanf("%d", &pin);', explanation: "Reads input 4096 and writes directly to RAM address &pin (0x100)", actionType: "input", varName: "pin", value: 4096 },
          { id: "c4-p1b", code: 'printf("PIN Verified: %d\\n", pin);', explanation: "Displays verified pin from 0x100", actionType: "print", value: "PIN Verified: 4096" }
        ],
        expectedSequence: ["c4-p1a", "c4-s1", "c4-p1b"],
        explanation: {
          title: "Why scanf() Needs the & Operator",
          concept: "scanf() needs to know WHERE in memory to place the user's input. The ampersand (&) gives scanf the exact RAM address (&pin = 0x100) so it can write directly to hardware.",
          analogy: "Giving a courier your street address (&pin) so they know which house to deliver the package to.",
          takeaway: "Always put & before variable names in scanf() so it knows where to write in RAM!"
        }
      },
      {
        id: "ch4-ex2",
        challengeNumber: 2,
        title: "Reading Single Character (scanf %c)",
        mission: "Declare char choice;, read character 'Y' into &choice, and print confirmation.",
        targetOutput: "User Selected: [Y]",
        maxSteps: 3,
        initialRam: [
          { address: "0x104", name: "choice", type: "char (1 byte)", value: null }
        ],
        availablePills: [
          { id: "c4-c1", code: "char choice;", explanation: "Reserves 1 byte at address 0x104", actionType: "declare", varName: "choice", value: "null", address: "0x104" },
          { id: "c4-s2", code: 'scanf(" %c", &choice);', explanation: "Reads single letter 'Y' into address 0x104", actionType: "input", varName: "choice", value: "'Y'" },
          { id: "c4-p2", code: 'printf("User Selected: [%c]\\n", choice);', explanation: "Displays stored choice character", actionType: "print", value: "User Selected: [Y]" }
        ],
        expectedSequence: ["c4-c1", "c4-s2", "c4-p2"],
        explanation: {
          title: "Reading Characters with scanf(' %c')",
          concept: "Adding a leading space before '%c' in scanf(' %c', &choice) is a vital C trick: it skips any leftover newline or whitespace characters from previous inputs.",
          analogy: "Clearing the mail slot before putting in the new letter.",
          takeaway: "Always put a space before %c in scanf to avoid reading accidental whitespace!"
        }
      },
      {
        id: "ch4-ex3",
        challengeNumber: 3,
        title: "Multiple Inputs in One scanf",
        mission: "Declare x and y, read both in one call with scanf('%d %d', &x, &y), and display coordinates.",
        targetOutput: "Coordinates: X=10, Y=20",
        maxSteps: 4,
        initialRam: [
          { address: "0x100", name: "x", type: "int", value: null },
          { address: "0x104", name: "y", type: "int", value: null }
        ],
        availablePills: [
          { id: "c4-x", code: "int x;", explanation: "Allocates x at 0x100", actionType: "declare", varName: "x", value: "null", address: "0x100" },
          { id: "c4-y", code: "int y;", explanation: "Allocates y at 0x104", actionType: "declare", varName: "y", value: "null", address: "0x104" },
          { id: "c4-s3", code: 'scanf("%d %d", &x, &y);', explanation: "Reads 10 into &x and 20 into &y simultaneously", actionType: "input", varName: "x", value: 10 },
          { id: "c4-p3", code: 'printf("Coordinates: X=%d, Y=%d\\n", x, y);', explanation: "Displays (10, 20)", actionType: "print", value: "Coordinates: X=10, Y=20" }
        ],
        expectedSequence: ["c4-x", "c4-y", "c4-s3", "c4-p3"],
        explanation: {
          title: "Reading Multiple Values at Once",
          concept: "scanf() can read multiple values in a single line. When the user types '10 20', scanf delivers 10 to &x (0x100) and 20 to &y (0x104).",
          analogy: "Delivering two separate packages to two adjacent neighbors in one trip.",
          takeaway: "Pass multiple &addresses to scanf to collect multiple inputs efficiently!"
        }
      },
      {
        id: "ch4-ex4",
        challengeNumber: 4,
        title: "Input Calculation Pipeline",
        mission: "Read circle radius r (7) from user, calculate diameter (d = r * 2), and print result.",
        targetOutput: "Radius = 7 -> Diameter = 14",
        maxSteps: 4,
        initialRam: [
          { address: "0x100", name: "r", type: "int", value: null },
          { address: "0x104", name: "d", type: "int", value: null }
        ],
        availablePills: [
          { id: "c4-r", code: "int r;", explanation: "Radius variable at 0x100", actionType: "declare", varName: "r", value: "null", address: "0x100" },
          { id: "c4-sr", code: 'scanf("%d", &r);', explanation: "User enters 7 into &r", actionType: "input", varName: "r", value: 7 },
          { id: "c4-cd", code: "int d = r * 2;", explanation: "ALU computes 7 * 2 = 14 and stores in d at 0x104", actionType: "declare", varName: "d", value: 14, address: "0x104" },
          { id: "c4-p4", code: 'printf("Radius = %d -> Diameter = %d\\n", r, d);', explanation: "Displays calculated diameter 14", actionType: "print", value: "Radius = 7 -> Diameter = 14" }
        ],
        expectedSequence: ["c4-r", "c4-sr", "c4-cd", "c4-p4"],
        explanation: {
          title: "The Input-Process-Output (IPO) Cycle",
          concept: "This is the fundamental loop of computer science: 1) Input via scanf, 2) Process via CPU calculation, 3) Output via printf.",
          analogy: "Input is raw ingredients, CPU is cooking, Output is the served meal.",
          takeaway: "Almost every real-world C program follows the Input -> Process -> Output pattern!"
        }
      },
      {
        id: "ch4-ex5",
        challengeNumber: 5,
        title: "Inspecting Real RAM Addresses (%p & &var)",
        mission: "Declare secret = 777, and print both its value (%d) and physical hex memory address (%p) using &secret.",
        targetOutput: "Secret: 777 @ Physical RAM: 0x100",
        maxSteps: 2,
        initialRam: [
          { address: "0x100", name: "secret", type: "int (4 bytes)", value: 777 }
        ],
        availablePills: [
          { id: "c4-sc", code: "int secret = 777;", explanation: "Stores 777 at RAM address 0x100", actionType: "declare", varName: "secret", value: 777, address: "0x100" },
          { id: "c4-p5", code: 'printf("Secret: %d @ Physical RAM: %p\\n", secret, (void*)&secret);', explanation: "Prints value and exact hex address 0x100 using %p", actionType: "print", value: "Secret: 777 @ Physical RAM: 0x100" }
        ],
        expectedSequence: ["c4-sc", "c4-p5"],
        explanation: {
          title: "Printing Memory Addresses with %p",
          concept: "%p is the pointer format specifier used to print hex memory addresses. &secret reveals the exact physical RAM location where your variable lives.",
          analogy: "Looking at the GPS coordinates stamped on your front doorstep.",
          takeaway: "%p with &var reveals the physical hardware address of any variable in RAM!"
        }
      }
    ]
  }
];

// Helper to ensure pills are randomized and NEVER in the exact sequential solution order
const getScrambledPills = (pills: CStatement[]): CStatement[] => {
  if (!pills || pills.length <= 1) return pills || [];
  const scrambled = [...pills];
  // Deterministic + random shuffle
  for (let i = scrambled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [scrambled[i], scrambled[j]] = [scrambled[j], scrambled[i]];
  }
  // If shuffle accidentally matches exact original order, shift elements
  const isExactMatch = scrambled.every((p, idx) => p.id === pills[idx]?.id);
  if (isExactMatch && scrambled.length > 1) {
    scrambled.push(scrambled.shift()!);
  }
  return scrambled;
};

export default function CVisualLogicSimulator() {
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);

  const currentChapter = PHASE_1_DATA[activeChapterIdx] || PHASE_1_DATA[0];
  const currentChallenge = currentChapter.challenges[activeChallengeIdx] || currentChapter.challenges[0];

  const [shuffledPills, setShuffledPills] = useState<CStatement[]>(() => 
    getScrambledPills(currentChallenge.availablePills)
  );

  const [selectedSteps, setSelectedSteps] = useState<CStatement[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStepIdx, setActiveStepIdx] = useState<number | null>(null);

  // Live RAM and Hardware Simulation state
  const [ramState, setRamState] = useState<RamSlot[]>(currentChallenge.initialRam);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [cpuStatusText, setCpuStatusText] = useState<string>("CPU Idle. Click ▶ Run C Code to execute.");

  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [failureMsg, setFailureMsg] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  // Reset state on chapter or challenge change & scramble pills
  useEffect(() => {
    setRamState(currentChallenge.initialRam.map(cell => ({ ...cell })));
    setShuffledPills(getScrambledPills(currentChallenge.availablePills));
    setSelectedSteps([]);
    setConsoleOutput([`[GCC Ready] Target Output: "${currentChallenge.targetOutput}"`]);
    setCpuStatusText("CPU Idle. Click ▶ Run C Code to execute.");
    setIsSuccess(false);
    setIsFailed(false);
    setShowExplanation(false);
    setIsRunning(false);
    setActiveStepIdx(null);
  }, [activeChapterIdx, activeChallengeIdx, currentChallenge]);

  // Add instruction pill in ascending order
  const handleAddPill = (pill: CStatement) => {
    if (isRunning || isSuccess) return;
    if (selectedSteps.some(s => s.id === pill.id)) return;
    if (selectedSteps.length >= currentChallenge.maxSteps) return;
    setSelectedSteps((prev) => [...prev, pill]);
    setIsFailed(false);
  };

  // Remove instruction by index
  const handleRemoveStep = (indexToRemove: number) => {
    if (isRunning || isSuccess) return;
    setSelectedSteps((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setIsFailed(false);
  };

  // Clear all steps
  const handleReset = () => {
    setIsRunning(false);
    setSelectedSteps([]);
    setShuffledPills(getScrambledPills(currentChallenge.availablePills));
    setRamState(currentChallenge.initialRam.map(cell => ({ ...cell })));
    setConsoleOutput([`[System] Reset memory to initial state.`]);
    setCpuStatusText("CPU Idle. Assemble statements and click Run.");
    setIsSuccess(false);
    setIsFailed(false);
    setActiveStepIdx(null);
  };

  // Execute C code line-by-line with live CPU pointer and RAM updates
  const handleRunCode = async () => {
    if (selectedSteps.length === 0 || isRunning) return;

    setIsRunning(true);
    setIsFailed(false);
    setIsSuccess(false);
    setConsoleOutput(["[GCC Compiler] Compiling main.c with -O2...", "Executable running in RAM:"]);

    const currentRam = currentChallenge.initialRam.map(r => ({ ...r }));
    const logs: string[] = ["gcc -Wall main.c -o main", "Program started (PID: 1024)"];

    for (let i = 0; i < selectedSteps.length; i++) {
      setActiveStepIdx(i);
      const step = selectedSteps[i];
      setCpuStatusText(`CPU Executing Step ${i + 1}: ${step.code}`);

      await new Promise((r) => setTimeout(r, 650));

      if (step.actionType === "include") {
        logs.push(`[PREPROCESSOR] Included header <stdio.h> symbol table`);
      } else if (step.actionType === "declare" || step.actionType === "assign") {
        const slot = currentRam.find(r => r.name === step.varName);
        if (slot) {
          slot.value = step.value ?? null;
          slot.isHighlighted = true;
          logs.push(`[RAM] Updated ${slot.name} [${slot.address}] = ${step.value}`);
        }
      } else if (step.actionType === "input") {
        const slot = currentRam.find(r => r.name === step.varName);
        if (slot) {
          slot.value = step.value ?? null;
          slot.isHighlighted = true;
          logs.push(`[SCANF] Received input '${step.value}' -> Written to memory address &${slot.name} (${slot.address})`);
        }
      } else if (step.actionType === "print") {
        logs.push(`[STDOUT] >>> ${step.value}`);
      } else if (step.actionType === "return") {
        logs.push(`[EXIT] Process terminated with code 0 (SUCCESS)`);
      }

      setRamState([...currentRam]);
      setConsoleOutput([...logs]);
    }

    setActiveStepIdx(null);

    // Verify if code sequence matches expected logic
    const userSequence = selectedSteps.map(s => s.id);
    const isCorrect = currentChallenge.expectedSequence.every((expectedId, idx) => userSequence[idx] === expectedId);

    if (isCorrect && selectedSteps.length === currentChallenge.expectedSequence.length) {
      setIsSuccess(true);
      setCpuStatusText("✅ Program completed with return code 0 (Success).");
      logs.push(`✅ Output matched target: "${currentChallenge.targetOutput}"`);
      setConsoleOutput([...logs]);
    } else {
      setIsFailed(true);
      setFailureMsg("Execution completed, but statements did not produce the expected result. Check the statement order!");
      setCpuStatusText("⚠️ Output mismatch. Review the order of your C statements.");
      logs.push("⚠️ Result mismatch. Modify statements and rerun.");
      setConsoleOutput([...logs]);
    }

    setIsRunning(false);
  };

  const totalChallenges = PHASE_1_DATA.reduce((acc, ch) => acc + ch.challenges.length, 0);
  const currentTotalIdx = activeChapterIdx * 5 + activeChallengeIdx;
  const progressPercent = Math.round(((currentTotalIdx + (isSuccess ? 1 : 0.2)) / totalChallenges) * 100);

  return (
    <div className="min-h-screen bg-[#070b14] text-white flex flex-col font-sans selection:bg-emerald-950 selection:text-emerald-300">
      
      {/* ── TOP HEADER HUD ── */}
      <header className="sticky top-0 z-40 bg-[#070b14]/95 backdrop-blur-md border-b border-slate-800/80 py-3 px-4 sm:px-8 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/curriculum"
              className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors shrink-0"
              title="Exit to Curriculum"
            >
              <X size={16} />
            </Link>
            <Link href="/" className="flex items-center gap-2 group" title="Nextsem Academy">
              <div className="h-8 px-2.5 rounded-xl bg-[#0c1328] border border-[#04AA6D] flex items-center justify-center shadow-[0_0_12px_rgba(4,170,109,0.4)] group-hover:scale-105 transition-transform select-none">
                <span className="font-black text-sm tracking-tight text-[#04AA6D]">N</span>
                <span className="font-black text-sm tracking-tight text-white">S</span>
              </div>
            </Link>
          </div>

          {/* Continuous Green Progress Bar */}
          <div className="flex-1 max-w-md mx-auto flex items-center gap-3">
            <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-[#04AA6D] rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(4,170,109,0.8)]"
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              />
            </div>
            <span className="text-xs font-bold text-[#04AA6D] font-mono shrink-0">
              {progressPercent}%
            </span>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs font-black text-cyan-400 bg-cyan-950/70 border border-cyan-500/40 px-2.5 py-1 rounded-lg">
              C Language
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-white">
              Ch {currentChapter.chapterNumber} • Ex {currentChallenge.challengeNumber}/5
            </span>
          </div>

        </div>
      </header>

      {/* ── BREADCRUMB NAVIGATION TRAIL ── */}
      <nav aria-label="Breadcrumb" className="bg-[#050811] border-b border-slate-800/80 px-4 sm:px-8 py-2">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-medium text-slate-400">
          <Link href="/" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
            <span>🏠 Home</span>
          </Link>
          <span>❯</span>
          <Link href="/bca" className="hover:text-emerald-400 transition-colors">
            <span>BCA Hub</span>
          </Link>
          <span>❯</span>
          <span className="text-white font-bold">C Language Simulator</span>
        </div>
      </nav>

      {/* ── CHAPTER & CHALLENGE SELECTOR DUAL TABS ── */}
      <div className="bg-[#0b101c] border-b border-slate-800 px-4 sm:px-8 py-3 space-y-2.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          
          {/* Chapter Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <span className="text-xs font-mono font-bold text-slate-400 shrink-0 mr-1 hidden sm:inline">
              CHAPTERS:
            </span>
            {PHASE_1_DATA.map((ch, chIdx) => {
              const isChActive = chIdx === activeChapterIdx;

              return (
                <button
                  key={ch.chapterNumber}
                  onClick={() => {
                    setActiveChapterIdx(chIdx);
                    setActiveChallengeIdx(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isChActive
                      ? "bg-cyan-950 border border-cyan-400 text-cyan-300 shadow-md scale-[1.02]"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <span>Ch {ch.chapterNumber}: {ch.title.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Sub-Challenge Pills (5 Challenges per Chapter) */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
            <span className="text-[11px] font-mono font-bold text-slate-400 shrink-0 mr-1">
              PRACTICE (5):
            </span>
            {currentChapter.challenges.map((chal, cIdx) => {
              const isChalActive = cIdx === activeChallengeIdx;
              const isChalDone = cIdx < activeChallengeIdx || (isChalActive && isSuccess);

              return (
                <button
                  key={chal.id}
                  onClick={() => setActiveChallengeIdx(cIdx)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                    isChalActive
                      ? "bg-[#04AA6D] text-white shadow-sm font-black"
                      : isChalDone
                      ? "bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/60"
                      : "bg-slate-900/90 border border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                  title={chal.title}
                >
                  {isChalDone ? <CheckCircle2 size={11} className="text-white" /> : null}
                  <span>Ex {chal.challengeNumber}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* ── MAIN ARENA: 3-PANEL CONNECTED C SIMULATOR ── */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center gap-6">
        
        {/* Mission Briefing Banner */}
        <div className="bg-[#0b101c] border border-cyan-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400">
              <Cpu size={15} />
              <span>{currentChapter.conceptTitle.toUpperCase()} • CHALLENGE {currentChallenge.challengeNumber} OF 5</span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-white">
              {currentChallenge.mission}
            </h2>
          </div>
          <div className="shrink-0 bg-slate-900 border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-emerald-400">
            Target Output: <span className="text-white font-mono">{currentChallenge.targetOutput}</span>
          </div>
        </div>

        {/* 3-Column Split: RAM Memory | Source Code main.c | Statement Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* ── PANEL 1: PHYSICAL COMPUTER RAM MEMORY (4 COLS) ── */}
          <div className="lg:col-span-4 bg-[#090e1a] border border-slate-700/80 rounded-3xl p-5 shadow-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Database size={16} className="text-[#04AA6D]" />
                  <span className="text-sm font-black text-white tracking-wide">Physical Computer RAM</span>
                </div>
                <span className="text-[11px] font-mono text-cyan-400 font-bold">Hardware View</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Live memory slots reserved inside the computer&apos;s RAM:
              </p>

              {/* Memory Storage Locker Boxes */}
              <div className="space-y-3 pt-1">
                {ramState.map((cell) => {
                  return (
                    <div
                      key={cell.name}
                      className={`relative rounded-2xl p-3.5 transition-all duration-300 border ${
                        cell.isHighlighted
                          ? "bg-cyan-950/70 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-[1.02]"
                          : "bg-[#131c2e] border-slate-700/80"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-700/60 pb-1.5 mb-2">
                        <span className="text-cyan-400 font-bold">{cell.address}</span>
                        <span className="bg-slate-900/80 px-1.5 py-0.5 rounded text-[10px] text-slate-300 border border-slate-700 font-sans">
                          {cell.type}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-black text-white">
                          {cell.name}
                        </span>

                        <div className="h-8 px-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-xs font-mono font-black">
                          {cell.value === null ? (
                            <span className="text-slate-600 italic">null (empty)</span>
                          ) : (
                            <span className="text-emerald-300 font-black text-sm">
                              {cell.value}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-[11px] text-slate-500 font-mono border-t border-slate-800/80 pt-2 flex items-center justify-between">
              <span>RAM ARCH: 32-BIT</span>
              <span>4-BYTE CHUNKS</span>
            </div>
          </div>

          {/* ── PANEL 2: C SOURCE FILE main.c WITH LIVE CPU POINTER (4 COLS) ── */}
          <div className="lg:col-span-4 bg-[#090e1a] border border-slate-700/80 rounded-3xl p-5 shadow-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <FileCode size={16} className="text-cyan-400" />
                  <span className="text-sm font-black text-white tracking-wide">C Program (main.c)</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400">gcc runtime</span>
              </div>

              {/* Code Editor Viewport */}
              <div className="bg-[#050810] border border-slate-800 rounded-2xl p-4 font-mono text-xs space-y-1 select-none">
                <div className="text-cyan-300 font-bold">1  int main() &#123;</div>

                {/* User assembled lines rendered live */}
                {selectedSteps.length === 0 ? (
                  <div className="py-6 text-center text-slate-600 italic">
                    {"// (Click statements on right to assemble program)"}
                  </div>
                ) : (
                  selectedSteps.map((step, idx) => {
                    const isExecuting = activeStepIdx === idx;

                    return (
                      <div
                        key={`${step.id}-${idx}`}
                        className={`flex items-center justify-between px-2 py-1.5 rounded-lg transition-all ${
                          isExecuting
                            ? "bg-amber-500/20 border-l-4 border-amber-400 text-amber-200 font-black shadow-md"
                            : "text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-slate-600 text-[10px] w-3">{idx + 2}</span>
                          {isExecuting && (
                            <span className="px-1 py-0.2 rounded bg-amber-400 text-black text-[9px] font-black uppercase">
                              CPU
                            </span>
                          )}
                          <span className="text-slate-200">{step.code}</span>
                        </div>
                      </div>
                    );
                  })
                )}

                <div className="text-cyan-300 font-bold">
                  {selectedSteps.length + 2}  &#125;
                </div>
              </div>

              {/* Status banner */}
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
                {cpuStatusText}
              </div>
            </div>

            {/* Live Terminal Output Console */}
            <div className="bg-[#050810] border border-slate-800 rounded-2xl p-3.5 font-mono space-y-1.5 shadow-inner">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 border-b border-slate-800 pb-1.5">
                <Terminal size={13} className="text-emerald-400" />
                <span>Terminal Output (stdout)</span>
              </div>
              <div className="space-y-1 text-xs text-slate-300 max-h-24 overflow-y-auto min-h-[48px]">
                {consoleOutput.map((log, idx) => (
                  <div key={idx} className={log.includes("✅") ? "text-emerald-300 font-bold" : log.includes("⚠️") ? "text-amber-300" : "text-slate-300"}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── PANEL 3: STATEMENT BUILDER & PILLS (4 COLS) ── */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="bg-gradient-to-b from-[#0e1626] to-[#0a101c] border border-slate-700/80 rounded-3xl p-5 shadow-2xl space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-white tracking-tight">
                    Instruction Pipeline:
                  </h3>
                  <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md border ${
                    selectedSteps.length >= currentChallenge.maxSteps
                      ? "bg-amber-950/60 border-amber-500/60 text-amber-300"
                      : "bg-slate-800 border-slate-700 text-slate-300"
                  }`}>
                    {selectedSteps.length} / {currentChallenge.maxSteps}
                  </span>
                </div>
                {selectedSteps.length > 0 && !isRunning && !isSuccess && (
                  <button
                    onClick={handleReset}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-rose-950/40 border border-slate-700 hover:border-rose-500/50 text-slate-300 hover:text-rose-300 font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-xs"
                    title="Clear all steps"
                  >
                    <RotateCcw size={12} />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              {/* Assembled Step Cards */}
              <div className="space-y-2.5 min-h-[140px]">
                {selectedSteps.length === 0 ? (
                  <div className="h-32 border border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-500 text-xs font-semibold bg-slate-950/40 space-y-1 p-3 text-center">
                    <Zap size={18} className="text-slate-600" />
                    <span>Click the statement buttons below in execution order</span>
                  </div>
                ) : (
                  selectedSteps.map((step, idx) => {
                    const isExecuting = activeStepIdx === idx;

                    return (
                      <div
                        key={`${step.id}-${idx}`}
                        className={`rounded-2xl px-3.5 py-2.5 flex items-center justify-between transition-all duration-200 ${
                          isExecuting
                            ? "bg-cyan-950/80 border border-cyan-400 shadow-md scale-[1.01]"
                            : isSuccess
                            ? "bg-emerald-950/40 border border-emerald-500/40"
                            : "bg-[#182234] border border-slate-700/70"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-md bg-slate-900 border border-slate-700 font-mono text-[11px] font-bold text-cyan-400 flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <code className="text-white font-mono font-extrabold text-xs">
                            {step.code}
                          </code>
                        </div>

                        <div>
                          {isSuccess ? (
                            <CheckCircle2 size={16} className="text-[#04AA6D]" />
                          ) : isExecuting ? (
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                          ) : !isRunning ? (
                            <button
                              onClick={() => handleRemoveStep(idx)}
                              className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                              title="Remove"
                            >
                              <X size={13} />
                            </button>
                          ) : null}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Error Notice */}
              {isFailed && (
                <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-700/80 text-rose-200 text-xs font-bold flex items-center gap-2">
                  <X size={15} className="text-rose-400 shrink-0" />
                  <span>{failureMsg}</span>
                </div>
              )}
            </div>

            {/* Instruction Pills Bank (Shuffled / Scrambled) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider block font-mono">
                  C Statements (Click to Add):
                </span>
                <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
                  🔀 Shuffled
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {shuffledPills.map((pill) => {
                  const isSelected = selectedSteps.some((s) => s.id === pill.id);
                  const isLimitReached = selectedSteps.length >= currentChallenge.maxSteps;

                  return (
                    <button
                      key={pill.id}
                      onClick={() => handleAddPill(pill)}
                      disabled={isRunning || isSuccess || isLimitReached || isSelected}
                      className={`px-3.5 py-2.5 rounded-xl border text-left font-mono font-extrabold shadow-sm transition-all flex flex-col gap-0.5 cursor-pointer ${
                        isSelected
                          ? "bg-slate-900/40 border-slate-800 opacity-40 cursor-not-allowed text-slate-500"
                          : "bg-[#1e293b] hover:bg-[#283850] active:scale-95 border-slate-600/80 text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs">
                          <span className={isSelected ? "text-slate-600" : "text-cyan-400 font-black"}>&gt;</span>
                          <span className={isSelected ? "text-slate-500 line-through" : "text-white"}>{pill.code}</span>
                        </div>
                        {isSelected && (
                          <span className="text-[10px] font-sans text-emerald-400 font-bold flex items-center gap-1">
                            ✓ Added
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-sans font-medium pl-3">
                        {pill.explanation}
                      </span>
                    </button>
                  );
                })}
              </div>

              {selectedSteps.length >= currentChallenge.maxSteps && !isSuccess && (
                <p className="text-[11px] text-amber-300/90 font-medium">
                  Maximum {currentChallenge.maxSteps} statements reached. Click ▶ Run C Code to test!
                </p>
              )}
            </div>

          </div>

        </div>
      </main>

      {/* ── BOTTOM ACTION BAR ── */}
      <footer className="sticky bottom-0 z-40 bg-[#070b14]/95 backdrop-blur-md border-t border-slate-800 py-3.5 px-4 sm:px-8 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="text-xs text-slate-400 font-medium hidden sm:block">
            {isSuccess ? "🎉 Great job! Code and RAM execution verified successfully." : "Assemble C statements and click Run to watch the CPU execute."}
          </div>

          <div className="w-full sm:w-auto flex justify-end">
            {!isSuccess ? (
              <button
                onClick={handleRunCode}
                disabled={selectedSteps.length === 0 || isRunning}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#04AA6D] hover:bg-[#039861] disabled:bg-slate-800 disabled:text-slate-500 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                <Play size={15} className={isRunning ? "animate-spin" : "fill-white"} />
                <span>{isRunning ? "CPU Executing..." : "▶ Run C Code (gcc)"}</span>
              </button>
            ) : (
              <button
                onClick={() => setShowExplanation(true)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#04AA6D] hover:bg-[#039861] text-white font-extrabold text-sm shadow-lg shadow-emerald-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  {activeChallengeIdx < currentChapter.challenges.length - 1 
                    ? `Continue to Challenge ${activeChallengeIdx + 2} »` 
                    : activeChapterIdx < PHASE_1_DATA.length - 1 
                    ? `Complete Chapter & Go to Chapter ${activeChapterIdx + 2} »` 
                    : "Complete Phase 1! 🎉"}
                </span>
                <ArrowRight size={15} />
              </button>
            )}
          </div>

        </div>
      </footer>

      {/* ── INTUITIVE CONCEPT EXPLANATION MODAL ── */}
      {showExplanation && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e1626] border border-slate-700 max-w-lg w-full rounded-3xl p-6 sm:p-7 space-y-5 shadow-2xl relative animate-in fade-in zoom-in duration-150">
            
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="h-8 px-2.5 rounded-xl bg-[#0c1328] border border-[#04AA6D] flex items-center justify-center shadow-[0_0_12px_rgba(4,170,109,0.4)] select-none">
                  <span className="font-black text-sm tracking-tight text-[#04AA6D]">N</span>
                  <span className="font-black text-sm tracking-tight text-white">S</span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-white">
                  {currentChallenge.explanation.title}
                </h2>
              </div>
              <button
                onClick={() => setShowExplanation(false)}
                className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {currentChallenge.explanation.concept}
            </p>

            <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs sm:text-sm text-cyan-200 font-medium">
              💡 <strong className="text-white font-bold">Everyday Analogy:</strong> {currentChallenge.explanation.analogy}
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-emerald-300 font-medium">
              <Zap size={15} className="inline text-emerald-400 mr-1.5" />
              <strong className="text-white font-bold">Key Takeaway:</strong> {currentChallenge.explanation.takeaway}
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => {
                  setShowExplanation(false);
                  if (activeChallengeIdx < currentChapter.challenges.length - 1) {
                    setActiveChallengeIdx((prev) => prev + 1);
                  } else if (activeChapterIdx < PHASE_1_DATA.length - 1) {
                    setActiveChapterIdx((prev) => prev + 1);
                    setActiveChallengeIdx(0);
                  } else {
                    setActiveChapterIdx(0);
                    setActiveChallengeIdx(0);
                  }
                }}
                className="px-6 py-2.5 rounded-xl bg-[#04AA6D] hover:bg-[#039861] text-white font-extrabold text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>
                  {activeChallengeIdx < currentChapter.challenges.length - 1 
                    ? `Next Challenge (${activeChallengeIdx + 2}/5) »` 
                    : activeChapterIdx < PHASE_1_DATA.length - 1 
                    ? `Next Chapter (${activeChapterIdx + 2}/4) »` 
                    : "Restart Phase 1"}
                </span>
                <ChevronRight size={15} />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
