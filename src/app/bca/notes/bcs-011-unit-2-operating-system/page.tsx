"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, BookOpen, Sparkles, Check, HelpCircle, AlertCircle, 
  Award, ChevronRight, ChevronLeft, Zap, Menu, X, Star, FileText,
  Eye, EyeOff, Lightbulb, RotateCcw, Compass, CheckCircle2, Trophy
} from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import BcaHeaderNav from '@/components/bca/BcaHeaderNav';

interface BlankItem {
  num: number;
  initial: string;
  answer: string;
  hint: string;
}

interface PageLesson {
  pageNo: number;
  bookPage: number;
  section: string;
  title: string;
  originalText: string;
  explanationEn: string;
  explanationHi: string;
  blanks: BlankItem[];
  mcq: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  };
}

const LESSONS: PageLesson[] = [
  {
    pageNo: 1,
    bookPage: 46,
    section: "Section 2.0",
    title: "Introduction & The Role of Operating Systems",
    originalText: "An operating system is system software which may be viewed as an organized collection of software consisting of procedures for operating a computer and providing an environment for execution of programs. It acts as an interface between users and the hardware of a computer system. Studying the OS helps users understand the inner functions of a computer very closely. Key concepts introduced include command interface, bootstrap loader, kernel, nanokernel, thin clients, and multiprogramming OS. Finally, historical evolution traces back to the earliest serial processing era.",
    explanationEn: "🖥️ **What is an Operating System?**\n• An OS is the primary **System Software** that coordinates hardware operations and provides a stable runtime environment for user applications.\n• **The Essential Interface**: It serves as a bridge between human users/applications and raw silicon hardware (CPU, Memory, Storage, I/O).\n• **Why Study the OS?** It unlocks a deep understanding of low-level machine architecture, concurrency, and resource scheduling.\n• **Key Concepts Covered**: Command shells, bootstrap loaders, kernel architectures (micro/nano), thin client terminals, and multiprogramming.",
    explanationHi: "🖥️ **ऑपरेटिंग सिस्टम (OS) क्या है?**\n• OS वह मुख्य **सिस्टम सॉफ्टवेयर** है जो कंप्यूटर हार्डवेयर को संचालित करता है और यूजर प्रोग्राम्स को चलाने के लिए सुरक्षित वातावरण देता है।\n• **मुख्य इंटरफ़ेस**: यह यूजर और कंप्यूटर के फिजिकल हार्डवेयर के बीच पुल (Interface) का कार्य करता है।\n• **अध्ययन का महत्व**: इससे कंप्यूटर के आंतरिक कार्यप्रणाली (Inner Functions), मेमोरी और प्रोसेस शेड्यूलिंग की स्पष्ट समझ मिलती है।",
    blanks: [
      { num: 1, initial: "s", answer: "system software", hint: "Broad software category managing hardware and providing an environment for application execution" },
      { num: 2, initial: "i", answer: "interface", hint: "A boundary or mediator linking human users and computer hardware" },
      { num: 3, initial: "i", answer: "inner functions", hint: "Internal, low-level hardware and architectural operations of the machine" },
      { num: 4, initial: "m", answer: "multiprogramming", hint: "Technique of holding several active programs in memory concurrently" },
      { num: 5, initial: "s", answer: "serial processing", hint: "One-by-one sequential hardware access mode of the 1940s" }
    ],
    mcq: {
      question: "Which software category does an Operating System belong to?",
      options: [
        "Application Software",
        "System Software",
        "Utility Malware",
        "Firmware Compiler"
      ],
      answer: 1,
      explanation: "An Operating System is classified as System Software because it manages the physical computer hardware and provides a base for applications."
    }
  },
  {
    pageNo: 2,
    bookPage: 47,
    section: "Section 2.1 - 2.2",
    title: "Concept of Operating System & Hardware Management",
    originalText: "The basic objectives of an operating system are to make the computer system convenient to use and to utilize computer hardware in an efficient manner. The OS manages primary resources including memory, the processor, file system, and input/output devices. Hardware managed also includes storage disks, I/O devices, and the network interface card. In schematic Figure 2.1, the command interface is depicted, which in some systems is treated as an external shell outside of the operating system.",
    explanationEn: "🎯 **Dual Core Objectives of Any OS**:\n1. **Convenience**: Make the machine intuitive, comfortable, and easy for humans to operate.\n2. **Efficiency**: Maximize hardware throughput and eliminate idle CPU/RAM cycles.\n\n⚙️ **Core Managed Hardware Resources**:\n• **Processor (CPU)**: Time-slicing and process scheduling.\n• **Main Memory**: RAM allocation and virtual address translation.\n• **File Systems**: Storage sector organization and directory trees.\n• **NIC (Network Interface Card)**: Packet routing and network comms.\n• **The Shell**: The outer interactive command interpreter.",
    explanationHi: "🎯 **OS के दो प्राथमिक उद्देश्य**:\n1. **सुविधाजनक (Convenient)**: यूजर के लिए कंप्यूटर का उपयोग सरल और सहज बनाना।\n2. **कुशल (Efficient)**: हार्डवेयर (CPU, RAM, Disks) का अधिकतम और बिना बर्बादी के उपयोग करना।\n\n⚙️ **प्रमुख प्रबंधित संसाधन**: प्रोसेसर, मेमोरी, फाइल सिस्टम, इनपुट/आउटपुट डिवाइसेज और नेटवर्क इंटरफ़ेस कार्ड (NIC)।",
    blanks: [
      { num: 1, initial: "c", answer: "convenient to use", hint: "User-friendly, accessible, and comfortable to work with" },
      { num: 2, initial: "e", answer: "efficient manner", hint: "High-performance, non-wasteful resource allocation manner" },
      { num: 3, initial: "p", answer: "processor", hint: "The central processing chip executing machine instructions" },
      { num: 4, initial: "n", answer: "network interface card", hint: "Hardware expansion card enabling communication over computer networks (NIC)" },
      { num: 5, initial: "s", answer: "shell", hint: "Outer interactive command interpreter wrapping around the OS" }
    ],
    mcq: {
      question: "What are the two primary objectives of an operating system?",
      options: [
        "High cost and maximum disk usage",
        "Convenience for users and efficient hardware utilization",
        "Preventing network access and disabling terminals",
        "Writing compilers and deleting registry entries"
      ],
      answer: 1,
      explanation: "An OS aims to make the system convenient to use while keeping hardware utilization as efficient as possible."
    }
  },
  {
    pageNo: 3,
    bookPage: 48,
    section: "Section 2.2 • Concurrency",
    title: "Steps in Command Execution & Resident vs Non-Resident Parts",
    originalText: "When an OS accepts a command from mouse clicks or keyboard, it identifies the source of input through a port number. To boot up a system, the OS provides boot-strapping or Initial Program Load (IPL). Because a single processor can physically execute only one instruction at a time, concurrent processing is used for multitasking and multiuser support. The OS is divided into two distinct parts: critical services that must remain in memory permanently are called resident parts, while routines loaded only when required are called non resident parts.",
    explanationEn: "🔌 **Input Identification**: Commands entering from keyboards, mice, or networks are tagged via a hardware **port number**.\n\n🚀 **System Booting (IPL)**: Initial Program Load (IPL) or bootstrapping initializes registers and loads the nucleus into RAM.\n\n⚡ **Resident vs. Non-Resident Modules**:\n• **Resident Parts**: Critical OS core (Kernel, interrupt handlers, memory managers) that permanently occupy RAM.\n• **Non-Resident Parts**: Infrequently used utility programs (formatters, diagnostic tools) loaded into RAM on-demand.",
    explanationHi: "🔌 **कमांड निष्पादन और बूटिंग**:\n• इनपुट डिवाइस से आने वाले सिग्नल्स को **Port Number** से पहचाना जाता है।\n• सिस्टम स्टार्ट को **IPL (Initial Program Load)** या बूट-स्ट्रैपिंग कहते हैं।\n\n⚡ **Resident बनाम Non-Resident भाग**:\n• **Resident भाग**: हमेशा RAM में परमानेंट रहते हैं (जैसे Kernel)।\n• **Non-Resident भाग**: जरूरत पड़ने पर ही डिस्क से मेमोरी में लोड होते हैं।",
    blanks: [
      { num: 1, initial: "p", answer: "port number", hint: "Numerical communication channel identifier for I/O routing" },
      { num: 2, initial: "I", answer: "Initial Program Load (IPL)", hint: "Technical term / acronym IPL for initiating startup sequence" },
      { num: 3, initial: "c", answer: "concurrent processing", hint: "Mechanisms simulating simultaneous execution of multiple programs" },
      { num: 4, initial: "r", answer: "resident", hint: "Inhabiting RAM memory continuously from boot until shutdown" },
      { num: 5, initial: "n", answer: "non resident", hint: "Transient modules fetched into RAM only when explicitly called" }
    ],
    mcq: {
      question: "Which part of the operating system stays in RAM permanently from boot until shutdown?",
      options: [
        "Non-resident utility programs",
        "Resident parts (Kernel)",
        "Temporary swap files",
        "Recycle bin icons"
      ],
      answer: 1,
      explanation: "Resident parts (like the kernel) remain permanently in main memory to handle system interruptions and core tasks."
    }
  },
  {
    pageNo: 4,
    bookPage: 49,
    section: "Section 2.2 • Architecture",
    title: "Bootstrap Loader, Kernel Architecture & Thin Clients",
    originalText: "At startup, critical programs are loaded into memory by the bootstrap loader stored in read-only memory (ROM). The memory-resident component of the OS is known as the kernel. The modern design trend aims to reduce kernel size by adopting a micro kernel (or nano kernel). A diskless workstation that completely depends on a network server for programs and storage is called a thin client. When users interact directly with running programs to supply data and guidance in real-time, the system is performing online processing.",
    explanationEn: "🧬 **The Bootstrap Loader**: Firmware burned into ROM / BIOS / UEFI that initializes hardware and loads the kernel.\n\n🛡️ **Kernel & Microkernel Architecture**:\n• **Monolithic Kernel**: All drivers and services run inside kernel space.\n• **Microkernel / Nanokernel**: Keeps only minimal primitives (IPC, basic memory, scheduling) in kernel space, moving drivers to user space for higher stability.\n\n💻 **Thin Clients & Online Processing**:\n• **Thin Client**: Lightweight diskless terminals fetching OS images from servers.\n• **Online Processing**: Real-time conversational interaction between user and CPU.",
    explanationHi: "🧬 **बूटस्ट्रैप लोडर और कर्नेल**:\n• ROM में स्टोर्ड **Bootstrap Loader** सिस्टम स्टार्ट होते ही कर्नेल को लोड करता है।\n• **कर्नेल (Kernel)**: OS का मुख्य केंद्र भाग जो मेमोरी में लगातार बना रहता है।\n• **Micro Kernel**: छोटा और स्थिर कर्नेल आर्किटेक्चर।\n• **Thin Client**: बिना लोकल डिस्क वाला कंप्यूटर जो नेटवर्क सर्वर पर निर्भर रहता है।",
    blanks: [
      { num: 1, initial: "b", answer: "bootstrap loader", hint: "Firmware program responsible for loading the operating system into RAM" },
      { num: 2, initial: "k", answer: "kernel", hint: "The indispensable foundational nucleus of an operating system" },
      { num: 3, initial: "m", answer: "micro kernel (or nano kernel)", hint: "Minimalist kernel architecture (or nanokernel) handling only core primitives" },
      { num: 4, initial: "t", answer: "thin client", hint: "Network-dependent lightweight computer terminal with minimal local storage" },
      { num: 5, initial: "o", answer: "online processing", hint: "Immediate conversational processing mode (connected directly to the computer)" }
    ],
    mcq: {
      question: "Where is the bootstrap loader code permanently stored?",
      options: [
        "In dynamic RAM",
        "In Read-Only Memory (ROM)",
        "On external USB drives",
        "In the CPU cache level 1"
      ],
      answer: 1,
      explanation: "The bootstrap loader is stored in permanent Read-Only Memory (ROM/Flash) so it is ready immediately when power is turned on."
    }
  },
  {
    pageNo: 5,
    bookPage: 50,
    section: "Section 2.3",
    title: "Batch Processing & Five Core OS Services",
    originalText: "In banking operations and large sorting jobs, programs or jobs are collected on tape or disk and processed without ongoing user intervention, which is known as batch processing. Modern systems unite graphical user interfaces with command lines. Section 2.3 identifies five essential building blocks of OS services: 1. Command processor and user interface, 2. File management system, 3. Input/output control system, 4. Process management, and 5. Memory management. To the end user, the most direct and visible service provided by the OS is the command processor and user interface.",
    explanationEn: "📦 **Batch Processing**: Grouping non-interactive jobs (e.g., payroll, billing, batch sorting) together to execute in sequence without human intervention.\n\n🏛️ **The 5 Pillars of OS Services**:\n1. **Command Processor & UI**: Interprets user commands (GUI / CLI).\n2. **File Management System (FMS)**: Creates, reads, writes, and protects files.\n3. **I/O Control System (IOCS)**: Coordinates device drivers and data transfers.\n4. **Process Management**: Schedules CPU time and manages task states.\n5. **Memory Management**: Tracks free RAM and prevents unauthorized memory overwrites.",
    explanationHi: "📦 **बैच प्रोसेसिंग और 5 मुख्य सेवाएं**:\n• बिना मानवीय हस्तक्षेप के एक साथ जॉब्स प्रोसेस करना **Batch Processing** कहलाता है।\n\n🏛️ **OS की 5 बुनियादी सेवाएं**:\n1. कमांड प्रोसेसर और यूजर इंटरफ़ेस\n2. फाइल मैनेजमेंट सिस्टम\n3. इनपुट/आउटपुट कंट्रोल सिस्टम\n4. प्रोसेस मैनेजमेंट\n5. मेमोरी मैनेजमेंट",
    blanks: [
      { num: 1, initial: "b", answer: "batch processing", hint: "Technique of executing queued jobs sequentially in a bundle" },
      { num: 2, initial: "F", answer: "File management system", hint: "Subsystem managing files, disk directories, and physical sector allocation" },
      { num: 3, initial: "P", answer: "Process management", hint: "Subsystem managing job scheduling, synchronization, and process lifecycles" },
      { num: 4, initial: "c", answer: "command processor and user interface", hint: "Frontend mechanism that parses user commands and handles interaction" }
    ],
    mcq: {
      question: "Which OS subsystem is directly visible and interacted with by the end user?",
      options: [
        "Memory paging algorithm",
        "Command processor and user interface",
        "Disk sector defragmenter",
        "Interrupt vector controller"
      ],
      answer: 1,
      explanation: "The command processor (CLI/GUI) is the user-facing frontend through which commands are issued to the OS."
    }
  },
  {
    pageNo: 6,
    bookPage: 51,
    section: "Section 2.3.1 - 2.3.2",
    title: "UNIX Shells, Interfaces & Logical File Units",
    originalText: "In UNIX, user command capabilities are provided by shells. Three prominent UNIX shells are the C shell, the Bourne shell, and the Korn shell. Graphical user interfaces rely on menus and mouse clicks, whereas the command line interface provides direct access to file systems and services. In UNIX, privileged administrators who can alter platform settings and access rights are termed superusers. A file constitutes a logical unit of storage. The file system maintains the mapping between logical storage needs and physical media.",
    explanationEn: "🐚 **UNIX Shell Trio**:\n• **Bourne Shell (`sh`)**: Created by Stephen Bourne at Bell Labs.\n• **C Shell (`csh`)**: Syntax resembling C language.\n• **Korn Shell (`ksh`)**: Developed by David Korn, combining features of `sh` and `csh`.\n\n👑 **Superusers (root)**: Highest authority in UNIX systems.\n\n📁 **Files & Storage Mapping**: A file is a **logical unit of storage**. The OS translates human-readable file paths into physical disk cylinders, heads, and sectors.",
    explanationHi: "🐚 **UNIX शेल्स और फाइल सिस्टम**:\n• मुख्य शेल्स: **Bourne Shell (sh)**, **C Shell (csh)**, और **Korn Shell (ksh)**।\n• **Superuser**: UNIX में सबसे शक्तिशाली रूट एडमिनिस्ट्रेटर।\n• **फाइल**: स्टोरेज की एक लॉजिकल यूनिट होती है, जिसे OS फिजिकल डिस्क सेक्टर्स पर मैप करता है।",
    blanks: [
      { num: 1, initial: "K", answer: "Korn shell", hint: "Shell developed by David Korn at Bell Labs (ksh)" },
      { num: 2, initial: "c", answer: "command line interface", hint: "Text-driven user interface based on typed syntax (CLI)" },
      { num: 3, initial: "s", answer: "superusers", hint: "Privileged administrative root users" },
      { num: 4, initial: "l", answer: "logical unit of storage", hint: "An abstract conceptual storage entity meaningful to users and programs" },
      { num: 5, initial: "m", answer: "mapping", hint: "Mathematical translation linking logical file names to physical disk blocks" }
    ],
    mcq: {
      question: "Which of the following is NOT one of the classic UNIX shells listed in the textbook?",
      options: [
        "Bourne shell",
        "C shell",
        "Korn shell",
        "Pascal shell"
      ],
      answer: 3,
      explanation: "The three classic UNIX shells mentioned are Bourne (sh), C (csh), and Korn (ksh). Pascal shell does not exist."
    }
  },
  {
    pageNo: 7,
    bookPage: 52,
    section: "Section 2.3.3 - 2.3.4",
    title: "Device Drivers, Process Control & Multithreading",
    originalText: "The OS includes hardware-specific I/O device driver programs that perform data transfers between hardware and memory. In Windows, automated device integration is known as plug-and-play. An executing program considered as the standard unit of work is a process. Cooperating processes communicate via interprocess messaging services. The determination of which job is admitted into the system and in what order is called job scheduling. An individually executable part of a process sharing memory with sibling threads is called a thread.",
    explanationEn: "🔌 **Device Drivers**: Specialized software translators enabling the kernel to communicate with hardware controllers.\n\n✨ **Plug-and-Play (PnP)**: Automatic hardware discovery and configuration in ⊞ Windows.\n\n⚙️ **Process vs. Thread**:\n• **Process**: A program in execution with its own dedicated memory space.\n• **Thread**: A lightweight execution stream *inside* a process sharing memory and file handles.\n• **IPC**: Inter-Process Communication enables concurrent processes to exchange messages safely.",
    explanationHi: "🔌 **डिवाइस ड्राइवर और प्रोसेस**:\n• **I/O Device Drivers**: हार्डवेयर और मेमोरी के बीच डेटा ट्रांसफर कराने वाले प्रोग्राम।\n• **Plug-and-Play**: ⊞ Windows में ऑटोमैटिक हार्डवेयर डिटेक्शन।\n• **Process vs Thread**: प्रोसेस एक रनिंग प्रोग्राम है, जबकि Thread प्रोसेस के भीतर मेमोरी शेयर करने वाला हल्का एग्जीक्यूशन यूनिट है।",
    blanks: [
      { num: 1, initial: "I", answer: "I/O device driver programs", hint: "Software modules that bridge OS calls to specific peripheral hardware registers" },
      { num: 2, initial: "p", answer: "plug-and-play", hint: "Hardware specification standard for automated device configuration (PnP)" },
      { num: 3, initial: "p", answer: "process", hint: "Active entity encompassing code, memory space, and allocated resources" },
      { num: 4, initial: "i", answer: "interprocess messaging services", hint: "IPC messaging mechanisms facilitating inter-process communication" },
      { num: 5, initial: "j", answer: "job scheduling", hint: "The OS scheduling algorithm governing job admission" },
      { num: 6, initial: "t", answer: "thread", hint: "Lightweight unit of CPU dispatching within a process" }
    ],
    mcq: {
      question: "What is an individually dispatchable unit of execution inside a process sharing memory called?",
      options: [
        "Thread",
        "Semaphore",
        "Paging block",
        "Cluster sector"
      ],
      answer: 0,
      explanation: "A thread is a lightweight sub-unit of a process that shares memory and resources with other threads in the same process."
    }
  },
  {
    pageNo: 8,
    bookPage: 53,
    section: "Section 2.3.5 - 2.4",
    title: "Memory Allocation Tasks & The Serial Processing Era",
    originalText: "The memory management system maintains one or more queues of programs waiting to be loaded based on priority and memory requirements. When a program completes execution, the OS frees space through de-allocation. During the late 1940s to mid-1950s, programmers had direct access to hardware with no operating system in a mode called serial processing. Human operators controlled these machines directly from a console with toggle switches, and programs were loaded via a card reader.",
    explanationEn: "🧠 **Memory Management Functions**:\n• **Allocation & Queuing**: Allocates contiguous or paged RAM slots to waiting jobs based on priority.\n• **De-allocation**: Automatically reclaims RAM when a program terminates to avoid memory leaks.\n\n🕰️ **The Serial Processing Era (1940s-1950s)**:\n• No OS existed! Programmers reserved blocks of machine time.\n• Direct hardware interaction via front **consoles** with physical toggle switches and flashing lamps.\n• Code loaded line-by-line via punched **card readers**.",
    explanationHi: "🧠 **मेमोरी मैनेजमेंट और सीरियल प्रोसेसिंग**:\n• **Queues और De-allocation**: जॉब्स को कतार में रखना और काम खत्म होने पर RAM खाली करना।\n• **Serial Processing (1940-1950)**: बिना किसी OS के, एक समय में केवल एक ही यूजर पंच कार्ड और टॉगल स्विच कंसोल से हार्डवेयर चलाता था।",
    blanks: [
      { num: 1, initial: "q", answer: "queues", hint: "Ordered waiting lines of jobs awaiting memory space" },
      { num: 2, initial: "d", answer: "de-allocation", hint: "Releasing allocated RAM back to the free memory pool" },
      { num: 3, initial: "s", answer: "serial processing", hint: "One-user-at-a-time physical access mode to early mainframe hardware" },
      { num: 4, initial: "c", answer: "console", hint: "Physical hardware operator panel featuring toggle switches and display lamps" },
      { num: 5, initial: "c", answer: "card reader", hint: "Peripheral device that read punched cards" }
    ],
    mcq: {
      question: "How did early programmers load programs during the serial processing era?",
      options: [
        "Through Wi-Fi download",
        "Using punched card readers and console switches",
        "Via optical USB drives",
        "Through cloud APIs"
      ],
      answer: 1,
      explanation: "Early mainframe computers in the 1950s used punched paper cards fed into mechanical card readers and console switches."
    }
  },
  {
    pageNo: 9,
    bookPage: 54,
    section: "Section 2.4.1",
    title: "Simple Batch Systems, The Monitor & Burroughs MCP",
    originalText: "The first batch operating system was created in the mid-1950s by General Motors for an IBM 701. The core supervisory software of early batch systems was known as the monitor. In 1963, Burroughs engineered the Master Control Program (MCP), supporting dual multiprocessing CPUs. In 1964, IBM unveiled OS/360, which introduced Job Control Language (JCL). This permitted other programs to utilize the CPU whenever one program was delayed waiting for I/O.",
    explanationEn: "🚗 **General Motors & The First Batch OS**: Developed for the IBM 701 in 1956 to eliminate manual setup downtime.\n\n🖥️ **The Resident Monitor**: The primitive ancestor of the kernel. It automatically loaded and executed batch jobs sequentially.\n\n🌟 **Major Historic Milestones**:\n• **Burroughs MCP (1963)**: First OS supporting dual multiprocessing CPUs.\n• **IBM OS/360 (1964)**: Introduced **Job Control Language (JCL)** and multiprogramming to keep the CPU busy during slow I/O operations.",
    explanationHi: "🚗 **पहला बैच ऑपरेटिंग सिस्टम**:\n• 1950 के दशक में **General Motors** ने IBM 701 के लिए पहला बैच OS बनाया।\n• **Monitor**: बैच जॉब्स को लगातार चलाने वाला शुरुआती कंट्रोलर।\n• **Burroughs MCP (1963)**: मल्टी-प्रोसेसिंग सपोर्ट करने वाला पहला OS।\n• **IBM OS/360 (1964)**: JCL (Job Control Language) और मल्टीप्रोग्रामिंग की शुरुआत।",
    blanks: [
      { num: 1, initial: "G", answer: "General Motors", hint: "Automotive corporation that built the GM-NAA I/O batch system" },
      { num: 2, initial: "m", answer: "monitor", hint: "The resident batch controller program managing job transitions" },
      { num: 3, initial: "M", answer: "MCP", hint: "Burroughs operating system acronym supporting dual processors" },
      { num: 4, initial: "J", answer: "Job Control Language (JCL)", hint: "Scripting language instructing mainframes how to process batch jobs (JCL)" },
      { num: 5, initial: "I", answer: "I/O", hint: "Input/Output operations involving external devices or disks" }
    ],
    mcq: {
      question: "Which company created the very first batch operating system for the IBM 701?",
      options: [
        "Microsoft",
        "General Motors",
        "Apple Computer",
        "Google"
      ],
      answer: 1,
      explanation: "General Motors created the GM-NAA I/O system in 1956 for the IBM 701 mainframe."
    }
  },
  {
    pageNo: 10,
    bookPage: 55,
    section: "Section 2.4.2",
    title: "Multiprogramming vs Time Sharing & UNIX Origins",
    originalText: "In time-sharing systems, multiple users access the system via terminals, and execution is interleaved in a short quantum of computation. As summarized in Table 2.1, multiprogramming maximizes processor use, while time-sharing seeks to minimize response time. A major joint project between MIT, Bell Labs, and GE gave rise to MULTICS. UNIX was initially built on a Digital PDP-7 minicomputer and later ported to a PDP-11, where it was rewritten in the C language by Ken Thompson and Dennis Ritchie.",
    explanationEn: "⚖️ **Multiprogramming vs. Time-Sharing**:\n• **Multiprogramming Goal**: Maximize processor utilization (keep CPU 100% busy).\n• **Time-Sharing Goal**: Minimize user response time by allotting a tiny **quantum (time-slice)** to each terminal.\n\n🌐 **MULTICS & The Birth of UNIX**:\n• **MULTICS**: Pioneered multi-user timesharing (MIT + Bell Labs + GE).\n• **UNIX Genesis**: Ken Thompson and Dennis Ritchie created UNIX on a PDP-7 / PDP-11 and famously rewrote it in **C language** in 1973, sparking modern operating systems.",
    explanationHi: "⚖️ **मल्टीप्रोग्रामिंग बनाम टाइम-शेयरिंग**:\n• **Multiprogramming**: CPU यूटिलाइज़ेशन को अधिकतम करना।\n• **Time-Sharing**: यूजर्स के रिस्पांस टाइम को न्यूनतम करना (Time Quantum के जरिए)।\n\n🌐 **UNIX का जन्म**:\n• Bell Labs में **Ken Thompson** और **Dennis Ritchie** द्वारा PDP-7/11 पर C भाषा में UNIX विकसित किया गया।",
    blanks: [
      { num: 1, initial: "q", answer: "quantum of computation", hint: "Short computational time slice allotted sequentially to each active user" },
      { num: 2, initial: "m", answer: "minimize response time", hint: "Reduce conversational latency for interactive terminal users" },
      { num: 3, initial: "M", answer: "MULTICS", hint: "Multiplexed Information and Computer Service system" },
      { num: 4, initial: "C", answer: "C language", hint: "Iconic procedural programming language created at Bell Labs" },
      { num: 5, initial: "D", answer: "Dennis Ritchie", hint: "Pioneering computer scientist who created C and co-created UNIX" }
    ],
    mcq: {
      question: "Who co-created UNIX and rewrote its kernel in the C language alongside Ken Thompson?",
      options: [
        "Bill Gates",
        "Dennis Ritchie",
        "Steve Wozniak",
        "Alan Turing"
      ],
      answer: 1,
      explanation: "Dennis Ritchie created the C language and co-developed UNIX with Ken Thompson at Bell Labs."
    }
  },
  {
    pageNo: 11,
    bookPage: 56,
    section: "Section 2.4.3",
    title: "The PC Revolution (1982), CP/M, MS-DOS & Modern Trends",
    originalText: "Because UNIX was implemented in C, it was remarkably easy to port to other architectures. In 1982, mass computing was transformed with the launch of the IBM personal computer (IBM PC) running PC-DOS (MS-DOS), which was derived from Gary Kildall's earlier CP/M system. Microkernel research in the 1980s produced Mach, providing stability for modern modular operating systems. To execute code in a machine-independent and network-transparent fashion, Sun Microsystems created the JAVA Virtual Machine (JVM).",
    explanationEn: "🚀 **Portability of C**: Writing UNIX in C allowed rapid porting across different CPU architectures without rewriting in assembly.\n\n💻 **The PC Revolution (1981-1982)**:\n• **IBM PC**: Powered by Intel 8088 running MS-DOS (PC-DOS).\n• **CP/M Ancestor**: Gary Kildall's CP/M was the conceptual predecessor to DOS.\n• **Mach Microkernel**: Developed at CMU; became the foundation of modern macOS / iOS XNU kernel.\n• **JVM**: Sun Microsystems enabled 'Write Once, Run Anywhere' bytecode execution.",
    explanationHi: "💻 **पीसी क्रांति और आधुनिक प्रवृत्तियां**:\n• 1981-1982 में **IBM PC** और **MS-DOS** के आने से पर्सनल कंप्यूटिंग घर-घर पहुंची।\n• **Mach Microkernel**: CMU में बना माइक्रोकर्नेल जो आधुनिक OS का आधार बना।\n• **Java Virtual Machine (JVM)**: Sun Microsystems द्वारा बाइटकोड निष्पादन के लिए बनाया गया इंजन।",
    blanks: [
      { num: 1, initial: "p", answer: "port", hint: "Translate and adapt code to execute across different hardware platforms" },
      { num: 2, initial: "I", answer: "IBM personal computer (IBM PC)", hint: "Iconic desktop machine establishing standard commercial PC architecture" },
      { num: 3, initial: "C", answer: "CP/M", hint: "Control Program for Microcomputers" },
      { num: 4, initial: "M", answer: "Mach", hint: "Influential microkernel developed at Carnegie Mellon University" },
      { num: 5, initial: "J", answer: "JAVA Virtual Machine (JVM)", hint: "Virtual engine executing Java bytecode on any host platform (JVM)" }
    ],
    mcq: {
      question: "Which iconic microkernel developed at Carnegie Mellon University influenced modern operating systems like macOS?",
      options: [
        "Mach",
        "Minix",
        "MS-DOS 1.0",
        "Symbian"
      ],
      answer: 0,
      explanation: "Mach was developed at Carnegie Mellon University and served as the foundational microkernel for modern operating system kernels like Apple XNU."
    }
  },
  {
    pageNo: 12,
    bookPage: 57,
    section: "Section 2.5 - 2.7",
    title: "Unit Summary & Check Your Progress Key Answers",
    originalText: "The unit summary affirms that multiprogramming improves system throughput specifically by overlapping CPU and I/O operation on a single machine. The OS decides which job will enter the system through job scheduling. An individually executable segment of a process sharing memory with peers is defined as a thread. The four core structural components reviewed are command processor, file management, process management, and memory management. Recommended foundational reading includes William Stallings' standard text Operating Systems.",
    explanationEn: "🎓 **Unit 2 Synthesis & Key Exam Takeaways**:\n• **Throughput Maximization**: Achieved by overlapping CPU execution with peripheral I/O activities.\n• **Core 4 Structural Pillars**: Command Processor, File Management, Process Management, and Memory Management.\n• **Thread**: Dispatchable execution unit inside a process.\n• **Standard Reference**: William Stallings' classic *Operating Systems: Internals and Design Principles*.",
    explanationHi: "🎓 **यूनिट 2 सारांश और परीक्षा मुख्य बिंदु**:\n• **सिस्टम थ्रूपुट**: CPU और I/O ऑपरेशंस को ओवरलैप करके सिस्टम की कार्यक्षमता बढ़ाई जाती है।\n• **चार मुख्य स्तंभ**: कमांड प्रोसेसर, फाइल मैनेजमेंट, प्रोसेस मैनेजमेंट, और मेमोरी मैनेजमेंट।\n• **थ्रेड**: प्रोसेस का सबसे छोटा एग्जीक्यूटेबल हिस्सा जो मेमोरी शेयर करता है।",
    blanks: [
      { num: 1, initial: "o", answer: "overlapping CPU and I/O operation", hint: "Running processor operations concurrently with peripheral I/O activities" },
      { num: 2, initial: "j", answer: "job scheduling", hint: "Queue admission and resource prioritization policy" },
      { num: 3, initial: "t", answer: "thread", hint: "Basic dispatchable thread of execution" },
      { num: 4, initial: "m", answer: "memory management", hint: "Subsystem managing physical and virtual RAM memory" },
      { num: 5, initial: "O", answer: "Operating Systems", hint: "Classic computer science textbook title (4th edition)" }
    ],
    mcq: {
      question: "How does multiprogramming fundamentally improve computer system throughput?",
      options: [
        "By increasing physical CPU clock frequency",
        "By overlapping CPU execution with I/O device operations",
        "By compressing hard drive volumes",
        "By deleting inactive background processes"
      ],
      answer: 1,
      explanation: "Multiprogramming keeps the CPU busy with other jobs whenever one active job is paused waiting for slow I/O operations to complete."
    }
  }
];

export default function Bcs011Unit2OperatingSystemPage() {
  const router = useRouter();
  const { markCompleted } = useProgress();
  
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const [selectedLang, setSelectedLang] = useState<'both' | 'en' | 'hi'>('both');
  
  // MCQ state: pageIndex -> selected option index
  const [selectedMcqs, setSelectedMcqs] = useState<{ [pageIdx: number]: number }>({});
  
  // Blank interactive input: `${pageIdx}-${blankNum}` -> user string
  const [userBlankInputs, setUserBlankInputs] = useState<{ [key: string]: string }>({});
  const [revealedHints, setRevealedHints] = useState<{ [key: string]: boolean }>({});
  const [revealedAnswers, setRevealedAnswers] = useState<{ [key: string]: boolean }>({});

  const [completedPages, setCompletedPages] = useState<number[]>([]);
  const [userEmail, setUserEmail] = useState('guest');

  useEffect(() => {
    const savedUser = localStorage.getItem('nextsem_user');
    let email = 'guest';
    if (savedUser) {
      try { email = JSON.parse(savedUser).email || 'guest'; } catch (e) {}
    }
    setUserEmail(email);

    const savedProgress = localStorage.getItem(`nextsem_bca_unit2_progress_${email}`);
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        if (parsed.completedPages) setCompletedPages(parsed.completedPages);
        if (parsed.selectedMcqs) setSelectedMcqs(parsed.selectedMcqs);
        if (parsed.userBlankInputs) setUserBlankInputs(parsed.userBlankInputs);
      } catch (e) {}
    }
  }, []);

  const saveState = (newPages: number[], newMcqs: any, newBlanks: any) => {
    localStorage.setItem(`nextsem_bca_unit2_progress_${userEmail}`, JSON.stringify({
      completedPages: newPages,
      selectedMcqs: newMcqs,
      userBlankInputs: newBlanks
    }));
  };

  const handleSelectMcq = (pageIdx: number, optionIdx: number) => {
    const updated = { ...selectedMcqs, [pageIdx]: optionIdx };
    setSelectedMcqs(updated);

    const isCorrect = optionIdx === LESSONS[pageIdx].mcq.answer;
    if (isCorrect && !completedPages.includes(pageIdx)) {
      const newCompleted = [...completedPages, pageIdx];
      setCompletedPages(newCompleted);
      saveState(newCompleted, updated, userBlankInputs);
      markCompleted(`bca_unit:1st Semester/BCS-111 Computer Basics and PC Software/Block 2 Basics of Computer Software/Unit-2.pdf`);
    } else {
      saveState(completedPages, updated, userBlankInputs);
    }
  };

  const handleBlankChange = (pageIdx: number, blankNum: number, value: string) => {
    const key = `${pageIdx}-${blankNum}`;
    const updated = { ...userBlankInputs, [key]: value };
    setUserBlankInputs(updated);
    saveState(completedPages, selectedMcqs, updated);
  };

  const toggleHint = (pageIdx: number, blankNum: number) => {
    const key = `${pageIdx}-${blankNum}`;
    setRevealedHints(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleAnswer = (pageIdx: number, blankNum: number) => {
    const key = `${pageIdx}-${blankNum}`;
    setRevealedAnswers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const revealAllPageHints = (pageIdx: number) => {
    const updated = { ...revealedHints };
    LESSONS[pageIdx].blanks.forEach(b => {
      updated[`${pageIdx}-${b.num}`] = true;
    });
    setRevealedHints(updated);
  };

  const revealAllPageAnswers = (pageIdx: number) => {
    const updated = { ...revealedAnswers };
    LESSONS[pageIdx].blanks.forEach(b => {
      updated[`${pageIdx}-${b.num}`] = true;
    });
    setRevealedAnswers(updated);
  };

  const resetPageSelfTest = (pageIdx: number) => {
    const newHints = { ...revealedHints };
    const newAnswers = { ...revealedAnswers };
    const newInputs = { ...userBlankInputs };
    LESSONS[pageIdx].blanks.forEach(b => {
      delete newHints[`${pageIdx}-${b.num}`];
      delete newAnswers[`${pageIdx}-${b.num}`];
      delete newInputs[`${pageIdx}-${b.num}`];
    });
    setRevealedHints(newHints);
    setRevealedAnswers(newAnswers);
    setUserBlankInputs(newInputs);
    saveState(completedPages, selectedMcqs, newInputs);
  };

  const currentLesson = LESSONS[currentPageIdx];
  const totalCompleted = completedPages.length;
  const progressPct = Math.round((totalCompleted / LESSONS.length) * 100);

  return (
    <div className="min-h-screen bg-[#060c18] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Top Header */}
      <BcaHeaderNav currentSubjectCode="BCS-111" currentSubjectName="Computer Basics & PC Software" />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-6 space-y-6">
        
        {/* Navigation Breadcrumbs */}
        <nav aria-label="Breadcrumbs" className="flex flex-wrap items-center gap-2 text-xs text-slate-300 font-bold py-1">
          <Link href="/" className="hover:text-[#04AA6D] transition-colors flex items-center gap-1">
            <span>🏠 Home</span>
          </Link>
          <span className="text-slate-600 font-bold">❯</span>
          <Link href="/bca" className="hover:text-[#04AA6D] transition-colors">
            BCA Hub
          </Link>
          <span className="text-slate-600 font-bold">❯</span>
          <Link href="/bca/semester-1" className="hover:text-[#04AA6D] transition-colors">
            Semester 1
          </Link>
          <span className="text-slate-600 font-bold">❯</span>
          <Link href="/bca/semester-1/bcs-011-computer-basics" className="hover:text-[#04AA6D] transition-colors">
            BCS-111
          </Link>
          <span className="text-slate-600 font-bold">❯</span>
          <span className="text-cyan-300 font-extrabold">Unit 2 Notes</span>
        </nav>

        {/* Navigation Breadcrumb / Unit Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#0c1328] border border-slate-800 rounded-2xl shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Link 
                href="/bca/semester-1/bcs-011-computer-basics"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to BCS-111 Dashboard
              </Link>
              <span className="text-slate-600">•</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold uppercase">
                Block 2 • Unit 2 (Pages 46–57)
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>🖥️ Operating System Fundamentals & Evolution</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              12 Page-Wise Interactive Lessons with Initial-Letter Clues & Self-Test Mastery
            </p>
          </div>

          {/* Action Stats & Standalone HTML Portal */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <a 
              href="/os-unit2-fill-in-the-blanks.html" 
              target="_blank" 
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition-all shadow-md"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>HTML Version</span>
            </a>

            <div className="px-3.5 py-2 rounded-xl bg-[#070d19] border border-slate-800 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <div className="text-left">
                <div className="text-[10px] text-slate-400 font-bold">Progress</div>
                <div className="text-xs font-black text-emerald-400">{progressPct}% ({totalCompleted}/12)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Toolbar & Page Selector */}
        <div className="sticky top-2 z-30 p-3 bg-[#0c1328]/95 backdrop-blur-md border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-2xl">
          {/* Page Jump Selector */}
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400 shrink-0" />
            <select
              value={currentPageIdx}
              onChange={(e) => setCurrentPageIdx(parseInt(e.target.value, 10))}
              className="bg-slate-900 text-xs font-bold text-white border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              {LESSONS.map((l, idx) => (
                <option key={l.pageNo} value={idx}>
                  Page {l.pageNo} (Book p.{l.bookPage}) — {l.title} {completedPages.includes(idx) ? '✓' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Mode & Language Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Language Switcher */}
            <div className="inline-flex rounded-lg bg-slate-900 p-0.5 border border-slate-800">
              <button
                onClick={() => setSelectedLang('both')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                  selectedLang === 'both' ? 'bg-cyan-500 text-black shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedLang('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                  selectedLang === 'en' ? 'bg-cyan-500 text-black shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setSelectedLang('hi')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                  selectedLang === 'hi' ? 'bg-cyan-500 text-black shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                हिन्दी
              </button>
            </div>

            {/* Hint & Answer Quick Tools */}
            <button
              onClick={() => revealAllPageHints(currentPageIdx)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5" /> Hints
            </button>
            <button
              onClick={() => revealAllPageAnswers(currentPageIdx)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" /> Answers
            </button>
            <button
              onClick={() => resetPageSelfTest(currentPageIdx)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* Active Page Card */}
        <div className="bg-[#0c1328] border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-2xl space-y-6">
          
          {/* Card Top Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/80 gap-2">
            <div>
              <div className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                {currentLesson.section} • Book Page {currentLesson.bookPage} of 57
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
                Page {currentLesson.pageNo}: {currentLesson.title}
              </h2>
            </div>

            {/* Page Dots & Completion Indicator */}
            <div className="flex items-center gap-1.5 self-start sm:self-center">
              {LESSONS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPageIdx(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentPageIdx === i
                      ? 'w-6 bg-cyan-400'
                      : completedPages.includes(i)
                      ? 'bg-emerald-400'
                      : 'bg-slate-700 hover:bg-slate-500'
                  }`}
                  title={`Page ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Section 1: Fill-in-the-Blanks Initial Alphabet Form */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Textbook Passage & Initial Alphabet Clues</span>
              </h3>
              <span className="text-[11px] text-slate-400">Fill dashes with correct keywords</span>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-[#060c18] border border-slate-800 text-sm leading-relaxed text-slate-200 space-y-4">
              <p className="leading-loose">
                {currentLesson.originalText}
              </p>
            </div>

            {/* Interactive Blank Pills Breakdown */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <span>📝 Test Your Recall for Page {currentLesson.pageNo} ({currentLesson.blanks.length} Blanks):</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentLesson.blanks.map((b) => {
                  const inputKey = `${currentPageIdx}-${b.num}`;
                  const currentInput = userBlankInputs[inputKey] || '';
                  const isHintOpen = revealedHints[inputKey];
                  const isAnswerOpen = revealedAnswers[inputKey];
                  const isMatch = currentInput.trim().toLowerCase() === b.answer.toLowerCase();

                  return (
                    <div 
                      key={b.num}
                      className={`p-3.5 rounded-xl border transition-all ${
                        isMatch 
                          ? 'bg-emerald-950/20 border-emerald-500/40' 
                          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-amber-400">
                            #{b.num}
                          </span>
                          <span className="text-xs font-mono font-black text-cyan-300">
                            Initial: [{b.initial.toUpperCase()}]
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleHint(currentPageIdx, b.num)}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 text-[11px] font-bold"
                            title="Toggle Hint"
                          >
                            💡 Hint
                          </button>
                          <button
                            onClick={() => toggleAnswer(currentPageIdx, b.num)}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 text-[11px] font-bold"
                            title="Toggle Answer"
                          >
                            👁️ Solution
                          </button>
                        </div>
                      </div>

                      {/* Input Box */}
                      <div className="relative">
                        <input
                          type="text"
                          placeholder={`Starts with '${b.initial}'...`}
                          value={currentInput}
                          onChange={(e) => handleBlankChange(currentPageIdx, b.num, e.target.value)}
                          className={`w-full bg-[#060c18] border rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none transition-colors ${
                            isMatch 
                              ? 'border-emerald-500 text-emerald-300 font-bold' 
                              : 'border-slate-700 focus:border-cyan-500'
                          }`}
                        />
                        {isMatch && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 absolute right-2.5 top-2" />
                        )}
                      </div>

                      {/* Revealed Hint Box */}
                      {isHintOpen && (
                        <div className="mt-2 p-2 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-[11px] text-emerald-300 animate-fadeIn">
                          💡 <strong>Hint</strong>: {b.hint}
                        </div>
                      )}

                      {/* Revealed Answer Box */}
                      {isAnswerOpen && (
                        <div className="mt-2 p-2 rounded-lg bg-amber-950/30 border border-amber-800/40 text-[11px] text-amber-300 font-bold animate-fadeIn">
                          👁️ <strong>Exact Answer</strong>: {b.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 2: Visual Concept Breakdown (Bilingual) */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Visual Explanation & Core Concepts</span>
            </h3>

            {/* English Explanation */}
            {(selectedLang === 'both' || selectedLang === 'en') && (
              <div className="p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="text-[10px] font-bold text-cyan-400 uppercase font-mono">🇬🇧 English Deep-Dive</div>
                <div className="text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                  {currentLesson.explanationEn}
                </div>
              </div>
            )}

            {/* Hinglish Explanation */}
            {(selectedLang === 'both' || selectedLang === 'hi') && (
              <div className="p-4 sm:p-5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-2">
                <div className="text-[10px] font-bold text-emerald-400 uppercase font-mono">🇮🇳 हिन्दी / Hinglish Summary</div>
                <div className="text-xs sm:text-sm text-emerald-100 whitespace-pre-line leading-relaxed">
                  {currentLesson.explanationHi}
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Interactive MCQ Mastery Check */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-purple-400" />
                <span>Page {currentLesson.pageNo} Knowledge Verification MCQ</span>
              </h3>
              {completedPages.includes(currentPageIdx) && (
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Check className="w-3 h-3" /> Page Mastered
                </span>
              )}
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-[#060c18] border border-slate-800 space-y-3">
              <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                {currentLesson.mcq.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentLesson.mcq.options.map((option, optIdx) => {
                  const isSelected = selectedMcqs[currentPageIdx] === optIdx;
                  const isCorrect = optIdx === currentLesson.mcq.answer;
                  const hasAnswered = selectedMcqs[currentPageIdx] !== undefined;

                  let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700";
                  if (hasAnswered) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold shadow-lg shadow-emerald-950/50";
                    } else if (isSelected) {
                      btnStyle = "bg-rose-950/60 border-rose-500 text-rose-300 font-bold";
                    } else {
                      btnStyle = "bg-slate-950/40 border-slate-900 text-slate-500 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectMcq(currentPageIdx, optIdx)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2 cursor-pointer ${btnStyle}`}
                    >
                      <span className="w-5 h-5 rounded-md bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0 font-mono text-[10px] font-bold">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1 leading-snug">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* MCQ Feedback & Explanation */}
              {selectedMcqs[currentPageIdx] !== undefined && (
                <div className={`mt-3 p-3 rounded-xl border text-xs leading-relaxed animate-fadeIn ${
                  selectedMcqs[currentPageIdx] === currentLesson.mcq.answer
                    ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-200'
                    : 'bg-rose-950/30 border-rose-800/50 text-rose-200'
                }`}>
                  <div className="font-bold mb-1">
                    {selectedMcqs[currentPageIdx] === currentLesson.mcq.answer
                      ? '🎉 Correct! Superb Recall.'
                      : '⚠️ Incorrect. Review the explanation below:'}
                  </div>
                  <div>{currentLesson.mcq.explanation}</div>
                </div>
              )}
            </div>
          </div>

          {/* Previous & Next Page Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800 gap-3">
            <button
              onClick={() => setCurrentPageIdx(Math.max(0, currentPageIdx - 1))}
              disabled={currentPageIdx === 0}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                currentPageIdx === 0
                  ? 'bg-slate-900/50 border-slate-800 text-slate-600 cursor-not-allowed'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-white hover:border-cyan-500 shadow-md cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Previous Page
            </button>

            <span className="text-xs font-mono font-bold text-slate-400">
              Page {currentPageIdx + 1} of {LESSONS.length}
            </span>

            <button
              onClick={() => setCurrentPageIdx(Math.min(LESSONS.length - 1, currentPageIdx + 1))}
              disabled={currentPageIdx === LESSONS.length - 1}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                currentPageIdx === LESSONS.length - 1
                  ? 'bg-slate-900/50 border-slate-800 text-slate-600 cursor-not-allowed'
                  : 'bg-cyan-500 hover:bg-cyan-400 border-cyan-400 text-black shadow-lg shadow-cyan-500/20 font-black cursor-pointer'
              }`}
            >
              Next Page <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sequential Lesson Navigation Footer */}
        <div className="p-5 bg-[#0c1328] border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <Link
            href="/bca/semester-1/bcs-011-computer-basics/unit-1/lessons"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-all"
          >
            <ChevronLeft className="w-4 h-4 text-cyan-400" />
            <span>Unit 1: Computer Origin & Apps</span>
          </Link>

          <div className="text-center">
            <div className="text-[11px] text-slate-400 font-bold">IGNOU BCS-111 • Block 2 Curriculum</div>
            <div className="text-xs font-bold text-white">Created by Er. Manoj Kumar</div>
          </div>

          <Link
            href="/bca/notes/bcs-011-unit-5"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-all"
          >
            <span>Unit 5: My Personal Computer</span>
            <ChevronRight className="w-4 h-4 text-cyan-400" />
          </Link>
        </div>

      </main>
    </div>
  );
}
