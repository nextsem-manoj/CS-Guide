import { bcaSemesters, BcaSemester } from './bcaCoursesData';

export interface UniversitySubjectUnit {
  unitNumber: number;
  title: string;
  topics: string[];
  isInteractive?: boolean;
}

export interface UniversitySubject {
  code: string;
  name: string;
  credits: number;
  type: 'DSC (Core)' | 'DSE (Elective)' | 'GE (Generic)' | 'SEC (Skill)' | 'Theory' | 'Practical Lab';
  isLab: boolean;
  theoryCredits?: number;
  practicalCredits?: number;
  description: string;
  units: UniversitySubjectUnit[];
  targetUrl?: string;
}

export interface UniversitySemester {
  id: number;
  name: string;
  subjects: UniversitySubject[];
}

export interface UniversityProgram {
  id: 'du' | 'ignou';
  universityName: string;
  shortName: string;
  degreeName: string;
  regulation: string;
  badge: string;
  description: string;
  semesters: UniversitySemester[];
}

/* ── 1. DELHI UNIVERSITY (DU) — B.SC. (HONS) COMPUTER SCIENCE (NEP 2020 UGCF) ── */
export const duCsSemesters: UniversitySemester[] = [
  {
    id: 1,
    name: "1st Semester",
    subjects: [
      {
        code: "CSDSC01",
        name: "Programming using Python",
        credits: 4,
        type: "DSC (Core)",
        isLab: true,
        theoryCredits: 3,
        practicalCredits: 1,
        description: "Foundational programming in Python, data types, control flow, functions, lists, dictionaries, tuples, and file handling.",
        targetUrl: "/du/1/csdsc01-python",
        units: [
          {
            unitNumber: 1,
            title: "Introduction to Python & Basic Syntax",
            topics: [
              "Python Interpreter & Interactive Shell",
              "Variables, Dynamic Typing & Reserved Keywords",
              "Operators: Arithmetic, Relational, Logical, Bitwise",
              "Standard I/O: input() and print() formatting"
            ],
            isInteractive: true
          },
          {
            unitNumber: 2,
            title: "Control Flow & Conditional Structures",
            topics: [
              "Boolean expressions & Decision structures: if-elif-else",
              "Loops: while and for loops",
              "Loop control: break, continue, pass statements",
              "Nested iterations and range() generator"
            ],
            isInteractive: true
          },
          {
            unitNumber: 3,
            title: "Functions & Modular Programming",
            topics: [
              "Function definition, parameters and return values",
              "Default arguments, keyword arguments & *args/**kwargs",
              "Variable scope: local vs global & global keyword",
              "Recursion and base cases"
            ]
          },
          {
            unitNumber: 4,
            title: "Compound Data Types (Strings, Lists, Tuples)",
            topics: [
              "String operations, indexing, slicing and methods",
              "Lists: mutability, list comprehensions, methods",
              "Tuples: immutability, packing and unpacking",
              "Linear search and sorting basics on collections"
            ]
          },
          {
            unitNumber: 5,
            title: "Dictionaries, Sets & File Handling",
            topics: [
              "Dictionaries: key-value mapping, dict comprehensions",
              "Sets: set operations (union, intersection, difference)",
              "File operations: reading, writing, with statement",
              "Exception handling with try-except-finally blocks"
            ]
          }
        ]
      },
      {
        code: "CSDSC02",
        name: "Computer System Architecture",
        credits: 4,
        type: "DSC (Core)",
        isLab: true,
        theoryCredits: 3,
        practicalCredits: 1,
        description: "Digital logic, boolean algebra, combinatorial & sequential circuits, register transfer, CPU organization, memory hierarchy and assembly.",
        targetUrl: "/du/1/csdsc02-csa",
        units: [
          {
            unitNumber: 1,
            title: "Digital Logic & Boolean Algebra",
            topics: [
              "Logic gates: AND, OR, NOT, NAND, NOR, XOR, XNOR",
              "Boolean laws, De Morgan's theorems, Truth tables",
              "Combinational circuits: Adders, Subtractors, Multiplexers, Decoders",
              "Sequential circuits: Latches, Flip-Flops (SR, JK, D, T), Registers"
            ],
            isInteractive: true
          },
          {
            unitNumber: 2,
            title: "Register Transfer & Microoperations",
            topics: [
              "Register Transfer Language (RTL) notation",
              "Bus and Memory transfers, Tri-state bus buffers",
              "Arithmetic microoperations, Logic microoperations, Shift microoperations"
            ]
          },
          {
            unitNumber: 3,
            title: "Basic Computer Organization & CPU Design",
            topics: [
              "Instruction codes, Computer registers, Instruction cycle (Fetch-Decode-Execute)",
              "Register reference, Memory reference & Input-Output instructions",
              "General Register Organization, Stack Organization, Instruction formats"
            ],
            isInteractive: true
          },
          {
            unitNumber: 4,
            title: "Memory System & Hierarchy",
            topics: [
              "Memory hierarchy: Registers, L1/L2/L3 Cache, Main Memory (RAM/ROM)",
              "Auxiliary memory: SSD, Magnetic disk",
              "Associative memory, Cache mapping (Direct, Associative, Set-Associative)",
              "Virtual memory & Paging fundamentals"
            ]
          }
        ]
      },
      {
        code: "CSDSC03",
        name: "Mathematics for Computing",
        credits: 4,
        type: "DSC (Core)",
        isLab: true,
        theoryCredits: 3,
        practicalCredits: 1,
        description: "Discrete mathematics foundations: Propositional logic, predicate logic, sets, relations, functions, recurrence relations, and graph theory.",
        targetUrl: "/du/1/csdsc03-maths-for-computing",
        units: [
          {
            unitNumber: 1,
            title: "Propositional Logic & Proof Techniques",
            topics: [
              "Propositions, Truth tables, Logical connectives, Tautologies",
              "Rules of Inference and Deductive Reasoning",
              "Mathematical Induction: Weak and Strong Induction"
            ]
          },
          {
            unitNumber: 2,
            title: "Sets, Relations & Functions",
            topics: [
              "Set operations, Power set, Cartesian products",
              "Equivalence relations, Partial order relations (POSET), Hasse diagrams",
              "Functions: Injective, Surjective, Bijective, Inverses and Compositions"
            ]
          },
          {
            unitNumber: 3,
            title: "Recurrence Relations & Combinatorics",
            topics: [
              "Pigeonhole Principle, Permutations & Combinations",
              "Solving linear recurrence relations with constant coefficients",
              "Generating functions basics"
            ]
          },
          {
            unitNumber: 4,
            title: "Graph Theory Foundations",
            topics: [
              "Graphs, Subgraphs, Bipartite graphs, Paths and Cycles",
              "Eulerian paths and circuits, Hamiltonian paths",
              "Trees, Spanning trees, Graph representation matrices"
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "2nd Semester",
    subjects: [
      {
        code: "CSDSC04",
        name: "Object-Oriented Programming with C++",
        credits: 4,
        type: "DSC (Core)",
        isLab: true,
        theoryCredits: 3,
        practicalCredits: 1,
        description: "OOP principles: Classes, objects, constructors, destructors, operator overloading, inheritance, polymorphism, templates and STL.",
        units: [
          {
            unitNumber: 1,
            title: "OOP Paradigm & Class Basics",
            topics: ["Principles of OOP", "Classes & Access Specifiers", "Constructors & Destructors", "Friend functions"]
          },
          {
            unitNumber: 2,
            title: "Operator Overloading & Type Conversions",
            topics: ["Overloading unary and binary operators", "Stream insertion/extraction overloading", "Type conversions"]
          },
          {
            unitNumber: 3,
            title: "Inheritance & Dynamic Polymorphism",
            topics: ["Single, Multiple, Multilevel, Hierarchical inheritance", "Virtual base classes", "Virtual functions & Abstract classes"]
          },
          {
            unitNumber: 4,
            title: "Templates, STL & Exception Handling",
            topics: ["Function and Class templates", "STL Containers: vector, list, map, set", "Exception handling try-catch-throw"]
          }
        ]
      },
      {
        code: "CSDSC05",
        name: "Discrete Mathematical Structures",
        credits: 4,
        type: "DSC (Core)",
        isLab: true,
        theoryCredits: 3,
        practicalCredits: 1,
        description: "Formal logic, Boolean algebra, lattices, algebraic structures, groups, rings, and advanced combinatorics.",
        units: [
          {
            unitNumber: 1,
            title: "Boolean Algebras & Lattices",
            topics: ["Lattices as POSETs and algebraic systems", "Distributive and Complemented lattices", "Boolean algebras and switching circuits"]
          },
          {
            unitNumber: 2,
            title: "Algebraic Structures",
            topics: ["Semigroups, Monoids, Groups", "Subgroups, Cyclic groups, Cosets, Lagrange's theorem", "Rings and Fields overview"]
          }
        ]
      },
      {
        code: "CSDSC06",
        name: "Data Structures",
        credits: 4,
        type: "DSC (Core)",
        isLab: true,
        theoryCredits: 3,
        practicalCredits: 1,
        description: "Core abstract data types: Arrays, Linked Lists, Stacks, Queues, Binary Trees, BSTs, Heaps, and Graph traversals.",
        units: [
          {
            unitNumber: 1,
            title: "Linear Data Structures (Lists, Stacks, Queues)",
            topics: ["Singly, Doubly and Circular Linked Lists", "Stack ADT: Infix to Postfix conversion, Evaluation", "Queue ADT: Circular Queues, Deque, Priority Queues"]
          },
          {
            unitNumber: 2,
            title: "Non-Linear Data Structures (Trees & Graphs)",
            topics: ["Binary Trees, Traversals (Pre, In, Post, Level-order)", "Binary Search Trees (BST): Insert, Delete, Search", "AVL Trees & Heaps", "Graph BFS and DFS"]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "3rd Semester",
    subjects: [
      {
        code: "CSDSC07",
        name: "Operating Systems",
        credits: 4,
        type: "DSC (Core)",
        isLab: true,
        description: "Process management, CPU scheduling, multithreading, synchronization, deadlocks, memory management, virtual memory, file systems.",
        units: [
          {
            unitNumber: 1,
            title: "Process & Thread Management",
            topics: ["Process states, PCB, Context switching", "Threads and Multithreading models", "CPU Scheduling algorithms: FCFS, SJF, Priority, Round Robin"]
          },
          {
            unitNumber: 2,
            title: "Synchronization & Deadlocks",
            topics: ["Critical Section Problem, Semaphores, Mutex", "Deadlock characterization, Prevention, Avoidance (Banker's Algorithm)", "Deadlock Detection and Recovery"]
          },
          {
            unitNumber: 3,
            title: "Memory Management & File Systems",
            topics: ["Contiguous memory allocation, Paging, Segmentation", "Virtual Memory, Page replacement algorithms (FIFO, LRU, Optimal)", "File allocation methods, Directory structures"]
          }
        ]
      },
      {
        code: "CSDSC08",
        name: "Numerical Optimization",
        credits: 4,
        type: "DSC (Core)",
        isLab: true,
        description: "Optimization algorithms, unconstrained and constrained optimization, gradient descent, linear programming and simplex method.",
        units: [
          {
            unitNumber: 1,
            title: "Optimization Fundamentals",
            topics: ["Objective functions, Convex sets and functions", "Gradient descent, Newton's method", "Linear programming and Simplex method"]
          }
        ]
      },
      {
        code: "CSDSC09",
        name: "Database Management Systems (DBMS)",
        credits: 4,
        type: "DSC (Core)",
        isLab: true,
        description: "ER modeling, relational model, relational algebra, SQL DDL/DML, normalization (1NF to BCNF), transaction processing, ACID properties.",
        units: [
          {
            unitNumber: 1,
            title: "Data Modeling & Relational Algebra",
            topics: ["Entity-Relationship (ER) modeling", "Relational Model & Constraints", "Relational Algebra operations: Select, Project, Join, Union"]
          },
          {
            unitNumber: 2,
            title: "SQL & Normalization",
            topics: ["SQL DDL, DML, DCL, Aggregate functions, Subqueries", "Functional dependencies & Normal Forms (1NF, 2NF, 3NF, BCNF)", "Lossless decomposition & Dependency preservation"]
          },
          {
            unitNumber: 3,
            title: "Transactions & Concurrency Control",
            topics: ["Transaction ACID properties", "Schedules: Serializability, Conflict & View serializability", "Two-Phase Locking (2PL) protocol"]
          }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "4th Semester",
    subjects: [
      {
        code: "CSDSC10",
        name: "Design & Analysis of Algorithms",
        credits: 4,
        type: "DSC (Core)",
        isLab: true,
        description: "Asymptotic notation, Divide and Conquer, Greedy algorithms, Dynamic Programming, Graph algorithms, NP-Completeness.",
        units: [
          {
            unitNumber: 1,
            title: "Algorithm Analysis & Divide and Conquer",
            topics: ["Big-O, Omega, Theta notations", "Divide and conquer: Merge sort, Quick sort, Master Theorem"]
          },
          {
            unitNumber: 2,
            title: "Greedy Strategy & Dynamic Programming",
            topics: ["Fractional Knapsack, Huffman coding, Kruskal & Prim MST", "0/1 Knapsack, Longest Common Subsequence (LCS), Matrix Chain Multiplication"]
          },
          {
            unitNumber: 3,
            title: "Graph Algorithms & Complexity Classes",
            topics: ["Shortest paths: Dijkstra and Bellman-Ford", "P, NP, NP-Complete, NP-Hard concept"]
          }
        ]
      },
      {
        code: "CSDSC11",
        name: "Software Engineering",
        credits: 4,
        type: "DSC (Core)",
        isLab: true,
        description: "SDLC models (Agile, Scrum, Waterfall), Requirements engineering, UML modeling, software testing, quality assurance.",
        units: [
          {
            unitNumber: 1,
            title: "Software Process Models & Agile",
            topics: ["Waterfall, Spiral, Prototyping models", "Agile methodologies & Scrum framework", "Software Requirements Specification (SRS)"]
          },
          {
            unitNumber: 2,
            title: "Design & Testing",
            topics: ["UML diagrams: Class, Use Case, Sequence diagrams", "Black-box and White-box testing", "Unit testing, Integration testing, System testing"]
          }
        ]
      },
      {
        code: "CSDSC12",
        name: "Computer Networks",
        credits: 4,
        type: "DSC (Core)",
        isLab: true,
        description: "OSI and TCP/IP models, physical layer, data link layer, network layer (IP addressing, routing), transport layer (TCP/UDP), application layer.",
        units: [
          {
            unitNumber: 1,
            title: "Network Architectures & Physical Layer",
            topics: ["OSI 7-Layer vs TCP/IP 4-Layer model", "Transmission media, Modulation, Multiplexing"]
          },
          {
            unitNumber: 2,
            title: "Data Link Layer & Error Control",
            topics: ["Framing, Error detection (CRC, Parity, Checksum)", "Sliding Window protocols: Go-Back-N, Selective Repeat", "MAC protocols: CSMA/CD, Ethernet"]
          },
          {
            unitNumber: 3,
            title: "Network & Transport Layers",
            topics: ["IPv4 vs IPv6, Subnetting & CIDR", "Routing algorithms: Distance Vector, Link State (OSPF)", "TCP 3-way handshake, Flow control & Congestion control", "DNS, HTTP, SMTP protocols"]
          }
        ]
      }
    ]
  }
];

/* ── 2. IGNOU BCA CURRICULUM WRAPPER ── */
export const ignouBcaSemesters: UniversitySemester[] = bcaSemesters.map((sem: BcaSemester) => ({
  id: sem.id,
  name: sem.name,
  subjects: sem.subjects.map(sub => ({
    code: sub.code,
    name: sub.name,
    credits: sub.code.startsWith("BCS-012") ? 4 : sub.code.startsWith("BEGLA") ? 6 : sub.code.startsWith("BEVAE") ? 4 : 3,
    type: sub.isLab ? "Practical Lab" : "DSC (Core)",
    isLab: sub.isLab,
    description: `Complete university syllabus and textbook notes for ${sub.name} (${sub.code}).`,
    targetUrl: sub.code === "BCS-111" || sub.code === "BCS-011" 
      ? "/bca/semester-1/bcs-011-computer-basics" 
      : `/bca/${sem.id}/${sub.code.toLowerCase()}`,
    units: sub.blocks.flatMap(block => 
      block.units.map((unit, idx) => ({
        unitNumber: idx + 1,
        title: unit.displayName,
        topics: [block.name],
        isInteractive: unit.isInteractive
      }))
    )
  }))
}));

/* ── 3. COMBINED UNIVERSITY REGISTRY ── */
export const UNIVERSITY_PROGRAMS: UniversityProgram[] = [
  {
    id: "du",
    universityName: "University of Delhi (DU)",
    shortName: "Delhi University",
    degreeName: "B.Sc. (Hons) Computer Science",
    regulation: "NEP 2020 UGCF (Undergraduate Curriculum Framework)",
    badge: "🏛️ Central University",
    description: "Official Department of Computer Science, University of Delhi curriculum covering Core Discipline Specific Courses (DSCs), programming labs, and theory.",
    semesters: duCsSemesters
  },
  {
    id: "ignou",
    universityName: "Indira Gandhi National Open University (IGNOU)",
    shortName: "IGNOU",
    degreeName: "Bachelor of Computer Applications (BCA)",
    regulation: "Revised CBCS & National Education Policy",
    badge: "🎓 National Open University",
    description: "Official School of Computer and Information Sciences (SOCIS) IGNOU BCA curriculum with 100% textbook notes, interactive simulators, and fill-in-the-blank practice.",
    semesters: ignouBcaSemesters
  }
];
