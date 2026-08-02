const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../src/data/unit1LessonsData.ts');
let fileContent = fs.readFileSync(targetFile, 'utf8');

// Pattern to match each lesson entry: { id: "...", ... mcq: { ... } }
// We can dynamically add extraNotes after keyPoints or content for each lesson.

// Let's create an object map of extraNotes for each lesson
const extraNotesMap = {
  1: {
    subheading: "### 🌟 Modern Cloud & Edge Computing Systems",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Computer_system_bus.svg/800px-Computer_system_bus.svg.png",
    imageCaption: "System Bus Architecture: Connecting CPU, RAM, and I/O Peripherals",
    content: {
      english: "In modern software engineering, computers extend far beyond desktop towers into distributed Cloud Clusters and Edge Chips.\n\n🔹 **BCA Exam Pro-Tip**: Always draw the IPO (Input-Process-Output) block diagram when defining a computer. IGNOU evaluators give full marks for labeled block diagrams!",
      hinglish: "Aaj ke time me computers sirf desktop towers nahi hain, balki Cloud Servers aur Edge Microchips par spread hain.\n\n🔹 **BCA Exam Pro-Tip**: IGNOU exam me Hamesha IPO (Input-Process-Output) diagram draw karein. Diagram se 100% full marks milte hain!"
    }
  },
  2: {
    subheading: "### 🚀 Mechanical Logic to Digital Transistors",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Abacus_600px.jpg/640px-Abacus_600px.jpg",
    imageCaption: "Classical Abacus: The First Manual Calculation Tool",
    content: {
      english: "The positional arithmetic of the Abacus and Pascaline gear teeth directly inspired digital hardware registers.\n\n🔹 **Developer Insight**: Pascal's carry-gear mechanism is the direct mechanical equivalent of the digital Full-Adder circuit in modern CPUs.",
      hinglish: "Abacus aur Pascaline ke gears ne modern CPU registers ko inspire kiya. Pascal ka carry gear mechanism digital Full-Adder circuit jaisa hi tha.\n\n🔹 **Developer Insight**: Binary bit-shifts (`<<` aur `>>`) in C/C++ trace back to positional arithmetic principles."
    }
  },
  3: {
    subheading: "### 🏛️ The Mill & Store: Forefather of CPU & RAM",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Babbage_Difference_Engine_London_Ph_2009.jpg/640px-Babbage_Difference_Engine_London_Ph_2009.jpg",
    imageCaption: "Charles Babbage's Difference Engine No. 2 (London Science Museum)",
    content: {
      english: "Charles Babbage's **Mill** was the conceptual ALU, while the **Store** was the world's first RAM design.\n\n🔹 **BCA Exam Tip**: In IGNOU term-end exams, clearly list out all 4 components of the Analytical Engine (Mill, Store, Reader, Printer).",
      hinglish: "Babbage ka **Mill** ALU tha aur **Store** RAM design thi. Memory aur Processing ko alag rakhna computer architecture ki foundation hai.\n\n🔹 **BCA Exam Tip**: Exam me Analytical Engine ke 4 parts (Mill, Store, Reader, Printer) ko list karein."
    }
  },
  4: {
    subheading: "### 💻 The Birth of Software Engineering & Algorithms",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/640px-Ada_Lovelace_portrait.jpg",
    imageCaption: "Ada Lovelace: Conceptualizer of Machine Algorithms",
    content: {
      english: "Ada Lovelace foresaw that computers could process music and graphics, not just numbers.\n\n🔹 **Industry Relevance**: The Ada programming language created by the US DoD in 1980 is still used today in aviation and defense systems.",
      hinglish: "Ada Lovelace ne 100 saal pehle soch liya tha ki computer music aur graphics bhi process kar sakta hai.\n\n🔹 **Industry Relevance**: 'Ada' programming language aaj bhi aerospace aur military systems me use hoti hai."
    }
  },
  5: {
    subheading: "### ⚡ Thermionic Valves to Modern Solid-State Silicon",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Vacuum_tube.jpg/640px-Vacuum_tube.jpg",
    imageCaption: "Vacuum Tube (Thermionic Valve): 1st Gen Switching Hardware",
    content: {
      english: "Vacuum tubes relied on thermionic emission in glass bulbs. Because they consumed hundreds of watts, ENIAC required giant fans.\n\n🔹 **Exam Pro-Tip**: In 1st Gen questions, highlight ENIAC (1945) and UNIVAC (1951) with Vacuum Tubes.",
      hinglish: "Vacuum tubes heat se electricity conduct karte the. ENIAC me bohot heat banti thi.\n\n🔹 **Exam Pro-Tip**: 1st Gen question me ENIAC (1945) aur Vacuum Tube technology ka zikr zaroor karein."
    }
  }
};

// Generic extra note generator for lessons 6 to 50
const defaultExtraNote = (num, title, pdfPage) => {
  const headings = [
    "### 🌟 Modern Hardware Architecture & Practical Applications",
    "### 🚀 Pro-Tip for BCA Term-End Examinations",
    "### 🧠 Real-World Industry Insight & System Design",
    "### 💻 Developer Key Takeaway & Real-Life Code Insight",
    "### ⚡ Hardware Performance & Modern Benchmark Metrics"
  ];
  const images = [
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Computer_system_bus.svg/800px-Computer_system_bus.svg.png", cap: "System Bus Architecture Diagram" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logic_gates.svg/800px-Logic_gates.svg.png", cap: "Digital Logic Gates Truth Table & Circuit Diagrams" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/CPU_block_diagram.svg/800px-CPU_block_diagram.svg.png", cap: "CPU Internal Block Architecture (CU, ALU, Registers)" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Von_Neumann_Architecture.svg/800px-Von_Neumann_Architecture.svg.png", cap: "Von Neumann Stored Program Architecture" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/RAM_module_image.jpg/640px-RAM_module_image.jpg", cap: "Primary Memory & Cache Storage Hierarchy" }
  ];

  const selH = headings[num % headings.length];
  const selImg = images[num % images.length];

  return {
    subheading: `${selH}`,
    imageUrl: selImg.url,
    imageCaption: `${selImg.cap} (IGNOU PDF Page #${pdfPage} Extension)`,
    content: {
      english: `Understanding ${title} is crucial for both IGNOU BCA exams and industry software design. In modern 64-bit multi-core processors, this concept forms the core foundation of operating system memory management and micro-architecture execution pipelines.\n\n🔹 **Er. Manoj Sir Exam Pro-Tip**: When answering 5-mark or 10-mark questions on this topic, state the definition first, draw a neat labeled block diagram, and list at least 3 key technical highlights to secure full marks.`,
      hinglish: `${title} ko samajhna IGNOU BCA exams aur industry software development dono ke liye zaroori hai. Modern 64-bit multi-core CPUs me ye concept OS memory management aur instruction pipelines ki foundation hai.\n\n🔹 **Er. Manoj Sir Exam Pro-Tip**: 5-mark ya 10-mark questions me pehle formal definition likhein, fir clean labeled diagram banayein aur 3 key technical highlights point-by-point explain karein!`
    }
  };
};

console.log("Enrichment script ready to process all 50 micro-lessons.");
