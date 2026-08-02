export interface BcaContentVariant {
  title: string;
  summary: string;
  sections: {
    heading: string;
    content: string;
    codeSnippet?: string;
    keyTakeaways?: string[];
  }[];
}

export interface BcaMultilingualLesson {
  id: string;
  subjectCode: string;
  subjectSlug: string;
  blockNumber: number;
  unitNumber: number;
  title: string;
  slug: string;
  seoDescription: string;
  keywords: string[];
  content: {
    english: {
      easy: BcaContentVariant;
      normal: BcaContentVariant;
    };
    hinglish: {
      easy: BcaContentVariant;
      normal: BcaContentVariant;
    };
  };
  exercise: {
    english: {
      mcq: {
        question: string;
        options: string[];
        correctAnswer: number;
        explanation: string;
      };
      blank: {
        question: string;
        answer: string;
        hint: string;
      };
    };
    hinglish: {
      mcq: {
        question: string;
        options: string[];
        correctAnswer: number;
        explanation: string;
      };
      blank: {
        question: string;
        answer: string;
        hint: string;
      };
    };
  };
}

export const bcaLessons: BcaMultilingualLesson[] = [
  {
    id: "bcs-111-unit-1",
    subjectCode: "BCS-111",
    subjectSlug: "bcs-011-computer-basics",
    blockNumber: 1,
    unitNumber: 1,
    title: "Unit 1: Introduction to Computer Systems & Data Representation",
    slug: "unit-1-introduction-to-computer-systems",
    seoDescription: "Master Computer System Building Blocks, Von Neumann Architecture, Stored Program Concept, Binary/Hexadecimal Data Representation, and Logic Gates for IGNOU BCA Semester 1.",
    keywords: ["IGNOU BCA", "BCS-011 Unit 1", "Computer Architecture", "Von Neumann Bottleneck", "Binary Conversion", "Logic Gates"],
    content: {
      english: {
        easy: {
          title: "Unit 1: Introduction to Computer Systems & Data Representation 💻",
          summary: "Explore the core building blocks of a computer, Von Neumann architecture, binary/hexadecimal data representation, and fundamental logic gates with visual diagrams.",
          sections: [
            {
              heading: "1. Functional Building Blocks of a Computer 🏗️",
              content: "Every computer system is composed of three primary functional subsystems working in synchronization:\n\n1. Central Processing Unit (CPU):\n• Control Unit (CU): Directs the flow of data and decodes program instructions.\n• Arithmetic Logic Unit (ALU): Performs arithmetic computations (+, -, *, /) and logical evaluations (AND, OR, NOT).\n• Registers: High-speed internal memory cells (e.g. Program Counter PC, Accumulator ACC, Instruction Register IR).\n\n2. Main Memory Unit (RAM/ROM):\nHolds active program instructions and transient data required immediately by the CPU.\n\n3. Input/Output (I/O) Peripherals:\nEnables user interaction (Keyboards, Mice, Displays, Mass Disk Storage).",
              codeSnippet: `// Basic C++ Simulation of CPU Input-Process-Output (IPO) Cycle
#include <iostream>

int main() {
    int inputData = 42; // Input stage
    int result = inputData * 2; // Process stage (ALU)
    std::cout << "CPU Output: " << result << std::endl; // Output stage
    return 0;
}`,
              keyTakeaways: [
                "CPU is the central brain containing CU, ALU, and Registers.",
                "Program Counter (PC) stores the memory address of the next instruction to execute.",
                "Accumulator (ACC) temporarily stores intermediate ALU calculation results."
              ]
            },
            {
              heading: "2. The Stored Program Concept & Von Neumann Architecture 🧠",
              content: "Proposed by John von Neumann, the Stored Program Concept dictates that both program instructions and data reside together in the same unified primary memory.\n\nVon Neumann Bottleneck:\nBecause data and instructions share the single system bus connecting CPU to RAM, instructions cannot be fetched at the exact same instant that data is read or written. This sequential throughput limit is called the Von Neumann Bottleneck.\n\nHarvard Architecture Alternative:\nUnlike Von Neumann, Harvard Architecture utilizes separate physical buses and memory units for instructions and data, allowing simultaneous instruction fetch and data access.",
              keyTakeaways: [
                "Von Neumann Architecture uses a single shared bus for data and instructions.",
                "Harvard Architecture uses separate dedicated buses for faster parallel access."
              ]
            },
            {
              heading: "3. Data Representation & Number System Conversions 🔢",
              content: "Computers use binary states (0s and 1s) representing low and high voltages.\n\nNumber Systems:\n• Decimal (Base-10): Digits 0-9\n• Binary (Base-2): Digits 0, 1\n• Octal (Base-8): Digits 0-7\n• Hexadecimal (Base-16): Digits 0-9 and Letters A-F (where A=10, F=15)\n\nConversion Example (Decimal 25 to Binary):\n25 / 2 = 12 (Remainder 1)\n12 / 2 = 6  (Remainder 0)\n6 / 2  = 3  (Remainder 0)\n3 / 2  = 1  (Remainder 1)\n1 / 2  = 0  (Remainder 1)\nReading remainders bottom-to-top gives: 11001₂.",
              keyTakeaways: [
                "1 Byte = 8 Bits. 1 Nibble = 4 Bits.",
                "Hexadecimal simplifies long binary strings (e.g. 1111₂ = F₁₆)."
              ]
            },
            {
              heading: "4. Fundamental Logic Gates ⚡",
              content: "Logic gates are hardware building blocks that process binary inputs to produce a single binary output:\n\n• AND Gate: Output is 1 ONLY if ALL inputs are 1.\n• OR Gate: Output is 1 if AT LEAST ONE input is 1.\n• NOT Gate (Inverter): Inverts input (0 ➔ 1, 1 ➔ 0).\n• NAND Gate: Universal gate (Opposite of AND).\n• NOR Gate: Universal gate (Opposite of OR).\n• XOR Gate: Output is 1 if inputs are DIFFERENT.",
              keyTakeaways: [
                "NAND and NOR are Universal Gates because any logic circuit can be built using only NAND or NOR gates.",
                "XOR is used in binary adders for arithmetic operations."
              ]
            }
          ]
        },
        normal: {
          title: "Unit 1: Introduction to Computer Systems & Data Representation",
          summary: "Comprehensive academic reference guide for IGNOU BCS-111 Unit 1 covering CPU components, memory hierarchy, number system algorithms, and logic gate truth tables.",
          sections: [
            {
              heading: "Computer Organization & Architectural Principles",
              content: "A computer system executes programs via the Instruction Cycle: Fetch, Decode, Execute, and Writeback. Registers like the Instruction Register (IR) hold the current opcode, while the Memory Address Register (MAR) holds memory location pointers.",
              keyTakeaways: [
                "ALU performs arithmetic and logic decisions.",
                "Control unit generates control signals for bus synchronization."
              ]
            },
            {
              heading: "Information Representation & Logic Synthesis",
              content: "Fixed-point and floating-point representations handle integers and real numbers respectively. Truth tables define Boolean expressions synthesized through Karnaugh maps and logic gate configurations.",
              keyTakeaways: [
                "De Morgan's Laws simplify complex Boolean expressions.",
                "NAND/NOR gates form the basis of CMOS logic fabrication."
              ]
            }
          ]
        }
      },
      hinglish: {
        easy: {
          title: "Unit 1: Introduction to Computer Systems & Data Representation 💻",
          summary: "Computer system ke building blocks, Von Neumann architecture, binary/hexadecimal number conversions, aur logic gates ko aasan Hinglish me visual diagrams ke sath samjho.",
          sections: [
            {
              heading: "1. Computer ke Main Building Blocks 🏗️",
              content: "Har computer system 3 main parts se milkar banta hai:\n\n1. Central Processing Unit (CPU):\n• Control Unit (CU): Saare instructions ko decode karta hai aur data flow control karta hai.\n• Arithmetic Logic Unit (ALU): Saari math (+, -, *, /) aur logical decisions (AND, OR) leta hai.\n• Registers: Super-fast internal memory cells (jaise Program Counter PC aur Accumulator ACC).\n\n2. Primary Memory (RAM/ROM):\nAbhi chal rahe active programs aur data ko store karta hai.\n\n3. Input/Output (I/O) Devices:\nKeyboard, Mouse, Monitor, aur Hard Disk jo user interaction ko possible banate hain.",
              codeSnippet: `// Basic C++ CPU IPO Cycle Simulation
#include <iostream>

int main() {
    int inputData = 42; // Input step
    int result = inputData * 2; // Process step (ALU)
    std::cout << "CPU Output: " << result << std::endl; // Output step
    return 0;
}`,
              keyTakeaways: [
                "CPU computer ka brain hai jisme CU, ALU aur Registers hote hain.",
                "Program Counter (PC) agle instruction ka memory address yaad rakhta hai.",
                "Accumulator (ACC) ALU ke calculation results ko temporary store karta hai."
              ]
            },
            {
              heading: "2. Stored Program Concept & Von Neumann Architecture 🧠",
              content: "John von Neumann ne ye concept diya tha ki program instructions aur data dono ek hi primary memory (RAM) me saath me store hote hain.\n\nVon Neumann Bottleneck:\nKyunki data aur instructions ek hi shared bus se travel karte hain, isliye CPU ek hi time par data read aur instruction fetch nahi kar sakta. Iss speed limit ko Von Neumann Bottleneck kehte hain.\n\nHarvard Architecture:\nHarvard architecture me data aur instructions ke liye alag-alag dedicated buses hoti hain, jisse data aur instruction ek saath fast access hote hain.",
              keyTakeaways: [
                "Von Neumann Architecture ek hi shared bus use karti hai.",
                "Harvard Architecture me parallel access ke liye separate buses hoti hain."
              ]
            },
            {
              heading: "3. Number Systems & Binary Conversion 🔢",
              content: "Computer sirf binary voltage states (0 aur 1) samajhta hai.\n\nMain Number Systems:\n• Decimal (Base-10): Digits 0-9\n• Binary (Base-2): Digits 0, 1\n• Octal (Base-8): Digits 0-7\n• Hexadecimal (Base-16): Digits 0-9 aur Letters A-F (jahan A=10, F=15)\n\nDecimal 25 ko Binary me convert karne ka tarika:\n25 ÷ 2 = 12 (Remainder 1)\n12 ÷ 2 = 6  (Remainder 0)\n6 ÷ 2  = 3  (Remainder 0)\n3 ÷ 2  = 1  (Remainder 1)\n1 ÷ 2  = 0  (Remainder 1)\nRemainders ko neeche se upar padhein: 11001₂.",
              keyTakeaways: [
                "1 Byte = 8 Bits. 1 Nibble = 4 Bits.",
                "Hexadecimal long binary numbers ko chota karke likhne me help karta hai."
              ]
            },
            {
              heading: "4. Basic Logic Gates ⚡",
              content: "Logic gates binary signals ko process karke final output dete hain:\n\n• AND Gate: Output 1 tabhi hoga jab SAARI inputs 1 honge.\n• OR Gate: Output 1 hoga agar KOI BHI EK input 1 hoga.\n• NOT Gate (Inverter): Input ko ulta kar deta hai (0 ➔ 1, 1 ➔ 0).\n• NAND Gate: AND ka opposite (Universal Gate).\n• NOR Gate: OR ka opposite (Universal Gate).\n• XOR Gate: Output 1 hoga jab dono inputs DIFFERENT honge.",
              keyTakeaways: [
                "NAND aur NOR ko Universal Gates kehte hain kyunki inase koi bhi logic circuit banaya ja sakta hai.",
                "XOR gate binary adders me use hota hai."
              ]
            }
          ]
        },
        normal: {
          title: "Unit 1: Introduction to Computer Systems & Data Representation",
          summary: "IGNOU BCA exam preparation notes covering CPU building blocks, Von Neumann bottleneck, binary conversion rules, and logic gate truth tables.",
          sections: [
            {
              heading: "Computer Organization & Architectural Principles",
              content: "Computer system instruction cycle (Fetch, Decode, Execute, Writeback) ke through work karta hai. MAR memory location pointers hold karta hai aur IR active opcode hold karta hai.",
              keyTakeaways: [
                "ALU math aur logic evaluation handle karta hai.",
                "Control Unit system bus signals synchronize karta hai."
              ]
            },
            {
              heading: "Data Representation & Boolean Logic",
              content: "Binary, Octal, Decimal, aur Hexadecimal numbers digital systems ka base hote hain. Truth tables Boolean expressions ko evaluate aur simplify karne ke liye use hoti hain.",
              keyTakeaways: [
                "De Morgan's Laws Boolean functions ko simplify karti hain.",
                "Universal gates NAND aur NOR se saare circuits fabricate hote hain."
              ]
            }
          ]
        }
      }
    },
    exercise: {
      english: {
        mcq: {
          question: "Which CPU register stores the memory address of the NEXT instruction to be fetched and executed?",
          options: ["Program Counter (PC)", "Instruction Register (IR)", "Memory Data Register (MDR)", "Accumulator (ACC)"],
        correctAnswer: 0,
          explanation: "The Program Counter (PC) holds the memory address of the next instruction waiting to be executed."
        },
        blank: {
          question: "The speed bottleneck caused by sharing a single bus for both data and instructions is called the ______ Bottleneck.",
          answer: "Von Neumann",
          hint: "Named after the scientist John von Neumann."
        }
      },
      hinglish: {
        mcq: {
          question: "CPU ka kaunsa register agle execute hone wale instruction ka memory address store karke rakhta hai?",
          options: ["Instruction Register (IR)", "Program Counter (PC)", "Memory Data Register (MDR)", "Accumulator (ACC)"],
        correctAnswer: 1,
          explanation: "Program Counter (PC) hamesha agle instruction ka memory address hold karta hai."
        },
        blank: {
          question: "Data aur instructions ke ek hi bus share karne ki speed limit ko ______ Bottleneck kehte hain.",
          answer: "Von Neumann",
          hint: "John von Neumann ke naam par hai."
        }
      }
    }
  },
  {
    id: "bcs-111-unit-5",
    subjectCode: "BCS-111",
    subjectSlug: "bcs-011-computer-basics",
    blockNumber: 1,
    unitNumber: 5,
    title: "Unit 5: Introduction to Personal Computers & OS Utilities",
    slug: "unit-5-introduction-to-personal-computers",
    seoDescription: "Learn Personal Computer types (Desktop, Laptop, Tablet, Netbook), CPU execution steps, Motherboard slots, CHKDSK disk checker, and System Restore in IGNOU BCA Semester 1.",
    keywords: ["IGNOU BCA", "BCS-011 Unit 5", "Personal Computer", "CHKDSK", "System Restore", "Motherboard"],
    content: {
      english: {
        easy: {
          title: "Unit 5: Introduction to Personal Computers & OS Utilities 🖥️",
          summary: "Learn what constitutes a Personal Computer (PC), key hardware components (Motherboard, CPU steps, Video Cards), and Windows utilities (CHKDSK disk repair & System Restore).",
          sections: [
            {
              heading: "1. What is a Personal Computer (PC)? 💻",
              content: "A Personal Computer (PC) is a general-purpose machine designed for individual daily tasks including education, business administration, graphics, and online communications. PCs accept input data, process instructions, and generate output.\n\nKey Variations:\n• Desktop PCs: Stationed tower setups with separate monitor, keyboard, and mouse.\n• Laptops: Integrated portable units with built-in battery power.\n• Netbooks: Compact, low-cost laptops powered by power-efficient chips like Intel Atom.\n• Tablets: Slate-shaped touchscreen devices utilizing virtual keyboards and handwriting recognition.",
              keyTakeaways: [
                "Desktops offer superior upgradeability and ventilation space.",
                "Laptops offer portability and battery power backup.",
                "Netbooks are lightweight devices focused on web access and documentation.",
                "Tablets rely on touchscreens and digital styluses for input."
              ]
            },
            {
              heading: "2. Key Hardware Components & CPU Steps 🧠",
              content: "Hardware refers to the physical, touchable components of a PC.\n\nThe CPU follows a 4-step execution cycle:\n1. Fetch (retrieve instruction from memory)\n2. Decode (translate instruction into control signals)\n3. Execute (perform operation in ALU)\n4. Output (write result back to storage/display)\n\nMotherboard Connectors:\n• ATX Power Connector: Connects PSU power to the mainboard.\n• AGP / PCIe Slots: Connects high-performance video graphics cards.\n• USB Headers: Pin headers connecting front-panel ports.",
              codeSnippet: `// Standard ⊞ Windows PC Specifications Query (C++)
#include <iostream>
int main() {
    std::cout << "Standard PC Execution: Fetch -> Decode -> Execute -> Output" << std::endl;
    return 0;
}`,
              keyTakeaways: [
                "ALU (Arithmetic Logic Unit) executes all math (+, -) and logical decisions.",
                "CU (Control Unit) coordinates traffic between peripherals and CPU.",
                "ULV (Ultra Low Voltage) processors consume minimal power for mobile tablets."
              ]
            },
            {
              heading: "3. OS Utilities: CHKDSK & System Restore 🛠️",
              content: "Utility software focuses on system infrastructure health and system maintenance.\n\nCHKDSK (Check Disk):\nScans storage drives for logical filesystem errors and bad sectors.\n• CHKDSK C: /f -> Fixes filesystem errors on volume.\n• CHKDSK C: /r -> Locates bad sectors and recovers readable data.\n\nSystem Restore:\nRolls back core system files (.dll, .exe, registry keys) to an earlier restore point if malware or driver crashes occur. Note: System Restore DOES NOT alter personal files (images, emails, documents).",
              keyTakeaways: [
                "Exit Code 0 on CHKDSK means no errors were found.",
                "System Restore protects OS drivers and registry settings, not personal media.",
                "Always maintain separate backups of personal documents."
              ]
            }
          ]
        },
        normal: {
          title: "Unit 5: Introduction to Personal Computers & Operating System Utilities",
          summary: "Formal IGNOU examination reference notes covering personal computer classifications, architectural motherboard slots, CHKDSK parameters, and system restore configurations.",
          sections: [
            {
              heading: "Classification of Personal Computing Systems",
              content: "Personal computers operate on standard input-process-output (IPO) paradigms. Workstations are high-performance single-user systems tailored for computer-aided design (CAD), image processing, and scientific simulations running UNIX or Windows NT. Desktops provide modular expansion, whereas Laptops integrate display, battery, and peripherals into a sealed portable chassis.",
              keyTakeaways: [
                "Workstations excel at multi-tasking and CAD processing.",
                "DDR (Double Data Rate) and SATA (Serial ATA) govern storage and memory bandwidth."
              ]
            },
            {
              heading: "Disk Diagnostic & Recovery Utilities",
              content: "The CHKDSK command line utility scans file system integrity. Command switch /f resolves volume allocation table errors, while switch /r locates bad sectors and attempts physical sector recovery. System Restore captures system state snapshots (Restore Points) containing registry keys and executable binaries.",
              keyTakeaways: [
                "CHKDSK switch /f repairs filesystem table errors.",
                "System Restore excludes user document directories."
              ]
            }
          ]
        }
      },
      hinglish: {
        easy: {
          title: "Unit 5: Introduction to Personal Computers & OS Utilities 🖥️",
          summary: "Personal Computers ke alag types (Desktop, Laptop, Tablet), CPU ke 4 steps, Motherboard slots, aur Windows ke 2 powerful tools (CHKDSK aur System Restore) seekho.",
          sections: [
            {
              heading: "1. Personal Computer (PC) Kya Hai? 💻",
              content: "Personal Computer (PC) ek general-purpose machine hai jo daily operations jaise padhai, office work, software development aur entertainment ke liye use hota hai.\n\nPC ke Alag Types:\n• Desktop PCs: Fixed desk par rehta hai jisme separate monitor, keyboard, aur CPU cabinet hota hai.\n• Laptops: Single integrated portable unit jisme inbuilt battery hoti hai.\n• Netbooks: Chote, light-weight laptops jo Intel Atom jaise low-power chips par chalte hain.\n• Tablets: Touchscreen slate devices jo virtual keyboard aur stylus pen input use karte hain.",
              keyTakeaways: [
                "Desktop ko upgrade aur cooling karna bahut aasan hota hai.",
                "Laptop me portability aur battery backup sabse bada advantage hai.",
                "Netbooks internet surfing aur basic notes typing ke liye best hain."
              ]
            },
            {
              heading: "2. CPU Execution Steps & Motherboard Slots 🧠",
              content: "Hardware wahi components hain jinhe hum touch kar sakte hain.\n\nCPU execution ke 4 steps hote hain:\n1. Fetch (memory se instruction lana)\n2. Decode (instruction ko samajhna)\n3. Execute (ALU me calculate karna)\n4. Output (result display ya save karna)\n\nMotherboard Slots:\n• ATX Connector: Power supply unit (PSU) se mainboard ko current deta hai.\n• AGP / PCIe Slot: Dedicated high-speed graphics card lagane ke liye.",
              codeSnippet: `// ⊞ Windows PC Specs Log (C++)
#include <iostream>
int main() {
    std::cout << "CPU Execution Cycle: Fetch -> Decode -> Execute -> Output" << std::endl;
    return 0;
}`,
              keyTakeaways: [
                "ALU saare mathematical (+, -) aur logical decisions leta hai.",
                "Control Unit (CU) saare input-output traffic ko control karta hai."
              ]
            },
            {
              heading: "3. OS Utilities: CHKDSK & System Restore 🛠️",
              content: "Utility software system ki health aur maintenance ka dhyan rakhta hai.\n\nCHKDSK (Check Disk):\nHard drive me file system errors aur bad sectors repair karta hai.\n• CHKDSK C: /f -> Errors fix karta hai.\n• CHKDSK C: /r -> Bad sectors dhoondh kar readable data recover karta hai.\n\nSystem Restore:\nSystem crash ya virus aane par registry aur system files (.dll, .exe) ko purani working date par rollback karta hai. Dhyan rakhein: System Restore aapki personal photos ya documents ko delete ya recover nahi karta!",
              keyTakeaways: [
                "CHKDSK exit code 0 ka matlab hai disk me koi error nahi hai.",
                "System Restore sirf OS files aur drivers ko restore karta hai."
              ]
            }
          ]
        },
        normal: {
          title: "Unit 5: Introduction to Personal Computers & OS Utilities",
          summary: "IGNOU exam perspective se PC specifications, ATX motherboard architecture, CHKDSK CLI options, aur System Restore detailed reference notes.",
          sections: [
            {
              heading: "Personal Computer Architecture & Form Factors",
              content: "PC input-process-output (IPO) model par work karta hai. Workstation CAD simulations aur 3D graphics ke liye high-end system hota hai jo UNIX ya Windows NT use karta hai.",
              keyTakeaways: [
                "Workstations heavy multitasking ke liye ideal hote hain.",
                "ULV (Ultra Low Voltage) CPUs battery power save karte hain."
              ]
            },
            {
              heading: "System Diagnostics & Maintenance Tools",
              content: "CHKDSK utility storage integrity evaluate karti hai. Switch /f allocation errors fix karta hai, aur switch /r physical bad sectors check karta hai.",
              keyTakeaways: [
                "CHKDSK /f filesystem errors repair karta hai.",
                "System Restore user files backup nahi karta."
              ]
            }
          ]
        }
      }
    },
    exercise: {
      english: {
        mcq: {
          question: "Which CHKDSK command switch scans for bad sectors and attempts to recover readable information?",
          options: ["/f", "/s", "/r", "/p"],
        correctAnswer: 2,
          explanation: "The /r switch instructs CHKDSK to locate bad sectors on the disk volume and recover readable information."
        },
        blank: {
          question: "System Restore rolls back system files like .dll and .exe, but does NOT affect personal ______ files.",
          answer: "document",
          hint: "Think of personal photos, text files, or spreadsheets."
        }
      },
      hinglish: {
        mcq: {
          question: "Disk drive ke bad sectors locate karke readable data recover karne ke liye CHKDSK ka kaunsa switch use hota hai?",
          options: ["/f", "/s", "/p", "/r"],
        correctAnswer: 3,
          explanation: "/r switch bad sectors dhoondh kar unse readable information recover karne ki koshish karta hai."
        },
        blank: {
          question: "System Restore system files roll back karta hai par aapke personal ______ files ko change nahi karta.",
          answer: "document",
          hint: "Jaise aapki photos ya personal text files."
        }
      }
    }
  }
];

// ✅ Keep sorted by ascending unitNumber — navigation auto-chains in order 1→2→3→4→5→6
bcaLessons.sort((a, b) => {
  if (a.subjectSlug === b.subjectSlug) return a.unitNumber - b.unitNumber;
  return a.subjectSlug.localeCompare(b.subjectSlug);
});

export function getBcaLesson(subjectSlug: string, lessonSlug: string): BcaMultilingualLesson | undefined {
  const normSub = subjectSlug.toLowerCase();
  const normLesson = lessonSlug.toLowerCase();

  // Extract unit number from lesson slug (e.g. "unit-5-intro-to-pcs" → 5)
  const unitNumMatch = normLesson.match(/unit-(\d+)/);
  const unitNum = unitNumMatch ? parseInt(unitNumMatch[1], 10) : null;

  // ✅ Priority 1: Exact subjectSlug + exact slug match (most specific)
  const exactMatch = bcaLessons.find(
    l => l.subjectSlug.toLowerCase() === normSub && l.slug.toLowerCase() === normLesson
  );
  if (exactMatch) return exactMatch;

  // ✅ Priority 2: Exact subjectSlug + unit number match
  if (unitNum !== null) {
    const unitMatch = bcaLessons.find(
      l => l.subjectSlug.toLowerCase() === normSub && l.unitNumber === unitNum
    );
    if (unitMatch) return unitMatch;
  }

  // ✅ Priority 3: Subject code alias (bcs-011 ↔ bcs-111) + unit number
  if (unitNum !== null) {
    return bcaLessons.find(l => {
      const codeAlias =
        l.subjectCode.toLowerCase() === normSub ||
        normSub.replace("bcs-0", "bcs-1") === l.subjectCode.toLowerCase() ||
        normSub.replace("bcs-1", "bcs-0") === l.subjectCode.toLowerCase();
      return codeAlias && l.unitNumber === unitNum;
    });
  }

  return undefined;
}

