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
  type: 'Discipline A (Core)' | 'DSC (Core)' | 'DSE (Elective)' | 'Practical Lab' | 'Core Theory';
  isLab: boolean;
  theoryCredits?: number;
  practicalCredits?: number;
  description: string;
  pdfUrl?: string;
  targetUrl?: string;
  units: UniversitySubjectUnit[];
}

export interface UniversitySemester {
  id: number;
  name: string;
  exitAward?: string;
  totalCredits: number;
  subjects: UniversitySubject[];
}

export interface UniversityProgram {
  id: 'du-bsc' | 'ignou-bca' | 'ignou-mca';
  universityName: string;
  shortName: string;
  degreeName: string;
  regulation: string;
  badge: string;
  officialSyllabusPdf: string;
  officialSourceUrl: string;
  description: string;
  semesters: UniversitySemester[];
}

/* ══════════════════════════════════════════════════════════════════════════
   1. DELHI UNIVERSITY (DU) — B.SC. (PROGRAM) WITH COMPUTER SCIENCE (NEP 2024)
   Source: https://cs.du.ac.in/uploads/syllabus/NEP/bscprog2024.html
   ══════════════════════════════════════════════════════════════════════════ */
export const duBscProgSemesters: UniversitySemester[] = [
  {
    id: 1,
    name: "Semester I",
    totalCredits: 22,
    subjects: [
      {
        code: "Discipline A1",
        name: "Programming using C++",
        credits: 4,
        type: "Discipline A (Core)",
        isLab: true,
        theoryCredits: 3,
        practicalCredits: 1,
        description: "Official DU syllabus covering C++ fundamental syntax, structured programming, OOP concepts, classes, inheritance, operator overloading, and pointers.",
        pdfUrl: "/syllabus/DU_BSc_Prog_CS_Sem1_Programming_using_C++.pdf",
        targetUrl: "/cli",
        units: [
          {
            unitNumber: 1,
            title: "Introduction to C++ & Structured Programming",
            topics: [
              "History, features and structure of a C++ program",
              "Data types, operators, expressions and operator precedence",
              "Decision making: if, if-else, nested if, switch statement",
              "Iterative statements: while, do-while, for loops, break and continue"
            ],
            isInteractive: true
          },
          {
            unitNumber: 2,
            title: "Functions, Arrays & Strings",
            topics: [
              "Function declaration, definition and calling conventions",
              "Parameter passing: pass by value, pass by reference, pass by pointer",
              "One-dimensional and multidimensional arrays",
              "String handling functions and character arrays"
            ],
            isInteractive: true
          },
          {
            unitNumber: 3,
            title: "Object Oriented Programming (OOP) & Classes",
            topics: [
              "Class concept, data abstraction, encapsulation",
              "Constructors: default, parameterized, copy constructors, destructors",
              "Friend functions, inline functions, static data members and methods"
            ]
          },
          {
            unitNumber: 4,
            title: "Inheritance, Polymorphism & Dynamic Memory",
            topics: [
              "Types of inheritance: single, multilevel, multiple, hierarchical",
              "Virtual functions, pure virtual functions and abstract classes",
              "Pointers, references, new and delete operators for dynamic allocation"
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Semester II",
    exitAward: "Undergraduate Certificate in Multidisciplinary Study (44 Credits)",
    totalCredits: 22,
    subjects: [
      {
        code: "Discipline A2",
        name: "Data Structures",
        credits: 4,
        type: "Discipline A (Core)",
        isLab: true,
        theoryCredits: 3,
        practicalCredits: 1,
        description: "Core linear and non-linear data structures: Arrays, Linked Lists, Stacks, Queues, Binary Trees, BSTs, Searching, and Sorting algorithms.",
        pdfUrl: "/syllabus/DU_BSc_Prog_CS_Sem2_Data_Structures.pdf",
        units: [
          {
            unitNumber: 1,
            title: "Linear Data Structures (Lists, Stacks, Queues)",
            topics: [
              "Singly, Doubly, and Circular Linked Lists: insertion, deletion, traversal",
              "Stack ADT: array and linked implementation, infix-to-postfix conversion",
              "Queue ADT: linear queues, circular queues, double-ended queues (deque)"
            ]
          },
          {
            unitNumber: 2,
            title: "Non-Linear Structures (Trees & Graphs)",
            topics: [
              "Binary trees, tree traversals (pre-order, in-order, post-order)",
              "Binary Search Trees (BST): insertion, deletion, searching, height",
              "Heaps: Max-heap, Min-heap, heap sort",
              "Graph basics: adjacency matrix, adjacency list, BFS and DFS"
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Semester III",
    totalCredits: 22,
    subjects: [
      {
        code: "Discipline A3",
        name: "Design and Analysis of Algorithms",
        credits: 4,
        type: "Discipline A (Core)",
        isLab: true,
        theoryCredits: 3,
        practicalCredits: 1,
        description: "Asymptotic notation, Divide-and-Conquer, Greedy approaches, Dynamic Programming, and Graph algorithms.",
        pdfUrl: "/syllabus/DU_BSc_Prog_CS_Sem3_Design_and_Analysis_of_Algorithms.pdf",
        units: [
          {
            unitNumber: 1,
            title: "Algorithm Analysis & Divide and Conquer",
            topics: [
              "Big-O, Omega, and Theta notations",
              "Merge Sort, Quick Sort, Recurrence relations (Master Theorem)"
            ]
          },
          {
            unitNumber: 2,
            title: "Greedy Strategy & Dynamic Programming",
            topics: [
              "Fractional Knapsack, Huffman coding, Prim & Kruskal MST",
              "0/1 Knapsack, Longest Common Subsequence (LCS)"
            ]
          }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Semester IV",
    exitAward: "Undergraduate Diploma in Multidisciplinary Study (88 Credits)",
    totalCredits: 22,
    subjects: [
      {
        code: "Discipline A4",
        name: "Operating Systems",
        credits: 4,
        type: "Discipline A (Core)",
        isLab: true,
        theoryCredits: 3,
        practicalCredits: 1,
        description: "Process management, CPU scheduling, synchronization, deadlocks, memory management, virtual memory, and file systems.",
        pdfUrl: "/syllabus/DU_BSc_Prog_CS_Sem4_Operating_Systems.pdf",
        units: [
          {
            unitNumber: 1,
            title: "Processes, Threads & CPU Scheduling",
            topics: [
              "Process states, PCB, Context switching, Multithreading",
              "Scheduling: FCFS, SJF, Priority, Round Robin"
            ]
          },
          {
            unitNumber: 2,
            title: "Synchronization & Memory Management",
            topics: [
              "Critical Section, Semaphores, Deadlocks (Banker's Algorithm)",
              "Paging, Segmentation, Virtual Memory, Page Replacement (FIFO, LRU)"
            ]
          }
        ]
      }
    ]
  },
  {
    id: 5,
    name: "Semester V",
    totalCredits: 22,
    subjects: [
      {
        code: "Discipline A5",
        name: "Database Management Systems",
        credits: 4,
        type: "Discipline A (Core)",
        isLab: true,
        theoryCredits: 3,
        practicalCredits: 1,
        description: "ER modeling, relational algebra, SQL (DDL, DML, DCL), functional dependencies, normalization (1NF to BCNF), and transactions.",
        pdfUrl: "/syllabus/DU_BSc_Prog_CS_Sem5_Database_Management_Systems.pdf",
        units: [
          {
            unitNumber: 1,
            title: "Data Modeling & Relational Model",
            topics: ["ER modeling, Relational constraints, Relational algebra"]
          },
          {
            unitNumber: 2,
            title: "SQL & Normalization",
            topics: ["SQL queries, Aggregation, Subqueries, Normal forms (1NF to BCNF)"]
          }
        ]
      }
    ]
  },
  {
    id: 6,
    name: "Semester VI",
    exitAward: "Bachelor of Science Degree (132 Credits)",
    totalCredits: 22,
    subjects: [
      {
        code: "Discipline A6",
        name: "Computer Networks",
        credits: 4,
        type: "Discipline A (Core)",
        isLab: true,
        theoryCredits: 3,
        practicalCredits: 1,
        description: "OSI and TCP/IP protocol architectures, physical layer, data link layer, IP routing, TCP/UDP transport, and DNS/HTTP applications.",
        pdfUrl: "/syllabus/DU_BSc_Prog_CS_Sem6_Computer_Networks.pdf",
        units: [
          {
            unitNumber: 1,
            title: "Protocol Stacks & Data Link Layer",
            topics: ["OSI 7-layer vs TCP/IP, Framing, Error detection, Sliding Window"]
          },
          {
            unitNumber: 2,
            title: "Network & Transport Layers",
            topics: ["IPv4 vs IPv6, Subnetting, Routing algorithms, TCP 3-way handshake"]
          }
        ]
      }
    ]
  },
  {
    id: 7,
    name: "Semester VII",
    totalCredits: 22,
    subjects: [
      {
        code: "DSC - 07",
        name: "Software Engineering",
        credits: 4,
        type: "DSC (Core)",
        isLab: true,
        theoryCredits: 3,
        practicalCredits: 1,
        description: "Software process models (Agile, Scrum, Waterfall), requirements analysis, UML modeling, software testing, and quality assurance.",
        pdfUrl: "/syllabus/DU_BSc_Prog_CS_Sem7_Software_Engineering.pdf",
        units: [
          {
            unitNumber: 1,
            title: "Software Process Models & Requirements",
            topics: ["Agile methodologies, Scrum, Waterfall, SRS documentation"]
          },
          {
            unitNumber: 2,
            title: "Design & Quality Testing",
            topics: ["UML diagrams, Black-box & White-box testing, Unit & Integration testing"]
          }
        ]
      }
    ]
  },
  {
    id: 8,
    name: "Semester VIII",
    exitAward: "Bachelor of Science with Honours / Research (176 Credits)",
    totalCredits: 22,
    subjects: [
      {
        code: "DSC - 08",
        name: "Information Security",
        credits: 4,
        type: "DSC (Core)",
        isLab: true,
        theoryCredits: 3,
        practicalCredits: 1,
        description: "Cryptography principles (symmetric & asymmetric), hashing (SHA, MD5), network security protocols, firewalls, and cyber laws.",
        pdfUrl: "/syllabus/DU_BSc_Prog_CS_Sem8_Information_Security.pdf",
        units: [
          {
            unitNumber: 1,
            title: "Cryptography & Encryption",
            topics: ["Classical ciphers, AES, DES, RSA public key cryptography"]
          },
          {
            unitNumber: 2,
            title: "System & Network Security",
            topics: ["Digital signatures, Authentication, Firewalls, Malware analysis"]
          }
        ]
      }
    ]
  }
];

export const duCsSemesters: UniversitySemester[] = duBscProgSemesters;

/* ══════════════════════════════════════════════════════════════════════════
   2. IGNOU BCA (BACHELOR OF COMPUTER APPLICATIONS — REVISED)
   Source: https://www.ignou.ac.in/viewFile/SOCIS/programmeguide/BCA_NEW-May-2026.pdf
   ══════════════════════════════════════════════════════════════════════════ */
export const ignouBcaSemesters: UniversitySemester[] = bcaSemesters.map((sem: BcaSemester) => ({
  id: sem.id,
  name: sem.name,
  totalCredits: sem.id === 1 ? 19 : 16,
  subjects: sem.subjects.map(sub => ({
    code: sub.code,
    name: sub.name,
    credits: sub.code.startsWith("BCS-012") ? 4 : sub.code.startsWith("BEGLA") ? 6 : sub.code.startsWith("BEVAE") ? 4 : 3,
    type: sub.isLab ? "Practical Lab" : "DSC (Core)",
    isLab: sub.isLab,
    description: `Complete textbook notes and curriculum for ${sub.name} (${sub.code}).`,
    pdfUrl: "/syllabus/IGNOU_BCA_Programme_Guide_Syllabus.pdf",
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

/* ══════════════════════════════════════════════════════════════════════════
   3. IGNOU MCA (MASTER OF COMPUTER APPLICATIONS — NEW 2-YEAR SYLLABUS)
   Source: https://www.ignou.ac.in/viewFile/SOCIS/programmeguide/MCA-New-July-2025.pdf
   ══════════════════════════════════════════════════════════════════════════ */
export const ignouMcaSemesters: UniversitySemester[] = [
  {
    id: 1,
    name: "1st Semester",
    totalCredits: 20,
    subjects: [
      {
        code: "MCS-211",
        name: "Design and Analysis of Algorithms",
        credits: 4,
        type: "Core Theory",
        isLab: false,
        description: "Advanced algorithm design techniques: Divide & Conquer, Dynamic Programming, Greedy algorithms, Graph algorithms, NP-Completeness.",
        pdfUrl: "/syllabus/IGNOU_MCA_Programme_Guide_Syllabus.pdf",
        units: [
          { unitNumber: 1, title: "Introduction to Algorithmics", topics: ["Asymptotic complexity, Recurrences, Master Theorem"] },
          { unitNumber: 2, title: "Design Paradigms", topics: ["Greedy algorithms, Dynamic programming, Backtracking, Branch & Bound"] },
          { unitNumber: 3, title: "Graph Algorithms & NP-Completeness", topics: ["Shortest paths, Maximum flow, P vs NP, NP-Complete problems"] }
        ]
      },
      {
        code: "MCS-212",
        name: "Discrete Mathematics",
        credits: 4,
        type: "Core Theory",
        isLab: false,
        description: "Formal logic, propositional and predicate calculus, recurrence relations, generating functions, graph theory, trees, and algebraic structures.",
        pdfUrl: "/syllabus/IGNOU_MCA_Programme_Guide_Syllabus.pdf",
        units: [
          { unitNumber: 1, title: "Mathematical Logic & Proofs", topics: ["Propositional logic, Predicate calculus, Proof techniques"] },
          { unitNumber: 2, title: "Combinatorics & Graph Theory", topics: ["Recurrence relations, Generating functions, Graph connectivity, Trees"] }
        ]
      },
      {
        code: "MCS-213",
        name: "Software Engineering",
        credits: 4,
        type: "Core Theory",
        isLab: false,
        description: "Advanced software engineering, Agile methodologies, Scrum, requirements engineering, object-oriented design using UML, software testing and DevOps.",
        pdfUrl: "/syllabus/IGNOU_MCA_Programme_Guide_Syllabus.pdf",
        units: [
          { unitNumber: 1, title: "Process Models & Requirements", topics: ["Agile, Scrum, Software requirements specification (SRS)"] },
          { unitNumber: 2, title: "Design, Testing & Quality", topics: ["UML architectural design, Automated testing, Software quality metrics"] }
        ]
      },
      {
        code: "MCS-214",
        name: "Professional Skills and Ethics",
        credits: 2,
        type: "Core Theory",
        isLab: false,
        description: "Corporate communication, ethical standards in computing, intellectual property rights, data privacy, and career leadership.",
        pdfUrl: "/syllabus/IGNOU_MCA_Programme_Guide_Syllabus.pdf",
        units: [
          { unitNumber: 1, title: "Communication & Leadership", topics: ["Technical writing, Presentation skills, Conflict resolution"] },
          { unitNumber: 2, title: "Cyber Ethics & IPR", topics: ["Intellectual property rights, Cyber ethics, IT Act compliance"] }
        ]
      },
      {
        code: "MCS-215",
        name: "Security and Cyber Laws",
        credits: 2,
        type: "Core Theory",
        isLab: false,
        description: "Cybersecurity fundamentals, network security architectures, encryption standards, information security governance, and Indian Cyber Laws.",
        pdfUrl: "/syllabus/IGNOU_MCA_Programme_Guide_Syllabus.pdf",
        units: [
          { unitNumber: 1, title: "Security Technologies", topics: ["Symmetric & Asymmetric encryption, Digital certificates, Firewalls"] },
          { unitNumber: 2, title: "Cyber Laws & Crimes", topics: ["Cyber forensic basics, Information Technology Act, Compliance standards"] }
        ]
      },
      {
        code: "MCSL-216",
        name: "DAA and Web Design Lab",
        credits: 2,
        type: "Practical Lab",
        isLab: true,
        description: "Hands-on implementation of algorithms in C/Python and modern responsive web development (HTML5, CSS3, JavaScript).",
        pdfUrl: "/syllabus/IGNOU_MCA_Programme_Guide_Syllabus.pdf",
        units: [
          { unitNumber: 1, title: "Algorithm Implementation Lab", topics: ["Sorting algorithms, Graph traversal labs, Dynamic programming coding"] },
          { unitNumber: 2, title: "Responsive Web Development Lab", topics: ["Semantic HTML5, CSS Grid/Flexbox, DOM manipulation"] }
        ]
      },
      {
        code: "MCSL-217",
        name: "Software Engineering Lab",
        credits: 2,
        type: "Practical Lab",
        isLab: true,
        description: "Case studies in software requirements, UML diagram modeling, test case writing, and automated test execution.",
        pdfUrl: "/syllabus/IGNOU_MCA_Programme_Guide_Syllabus.pdf",
        units: [
          { unitNumber: 1, title: "UML Design Lab", topics: ["Class diagrams, Sequence diagrams, Use-case modeling"] }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "2nd Semester",
    totalCredits: 20,
    subjects: [
      {
        code: "MCS-218",
        name: "Data Communication and Computer Networks",
        credits: 4,
        type: "Core Theory",
        isLab: false,
        description: "Modern network architectures, TCP/IP protocols, routing protocols, wireless networks, network security, and socket programming.",
        pdfUrl: "/syllabus/IGNOU_MCA_Programme_Guide_Syllabus.pdf",
        units: [
          { unitNumber: 1, title: "Data Communication & Protocols", topics: ["Transmission media, Modulation, Error control, Routing protocols"] },
          { unitNumber: 2, title: "Transport & Application Layers", topics: ["TCP/UDP flow control, Congestion management, Socket programming"] }
        ]
      },
      {
        code: "MCS-219",
        name: "Object Oriented Analysis and Design",
        credits: 4,
        type: "Core Theory",
        isLab: false,
        description: "OOAD methodology, design patterns (Creational, Structural, Behavioral), architectural patterns, and refactoring.",
        pdfUrl: "/syllabus/IGNOU_MCA_Programme_Guide_Syllabus.pdf",
        units: [
          { unitNumber: 1, title: "OOAD & UML Methodology", topics: ["Object modeling, Statechart diagrams, Activity diagrams"] },
          { unitNumber: 2, title: "GoF Design Patterns", topics: ["Singleton, Factory, Observer, Strategy, Decorator patterns"] }
        ]
      },
      {
        code: "MCS-220",
        name: "Web Technologies",
        credits: 4,
        type: "Core Theory",
        isLab: false,
        description: "Full-stack web architecture: Modern JavaScript (ES6+), Server-side development (Node.js/PHP), RESTful APIs, and database integration.",
        pdfUrl: "/syllabus/IGNOU_MCA_Programme_Guide_Syllabus.pdf",
        units: [
          { unitNumber: 1, title: "Client-Side Technologies", topics: ["ES6+, Async/Await, Fetch API, Single Page Applications"] },
          { unitNumber: 2, title: "Server-Side & Databases", topics: ["Node.js, Express, REST APIs, JSON, MongoDB/MySQL integration"] }
        ]
      },
      {
        code: "MCS-221",
        name: "Data Warehousing and Data Mining",
        credits: 4,
        type: "Core Theory",
        isLab: false,
        description: "OLAP architectures, multidimensional data modeling, ETL processes, association rule mining, classification, clustering algorithms.",
        pdfUrl: "/syllabus/IGNOU_MCA_Programme_Guide_Syllabus.pdf",
        units: [
          { unitNumber: 1, title: "Data Warehousing & OLAP", topics: ["Star/Snowflake schema, Data cubes, ETL pipelines"] },
          { unitNumber: 2, title: "Data Mining Algorithms", topics: ["Apriori algorithm, Decision Trees, K-Means clustering"] }
        ]
      },
      {
        code: "MCSL-222",
        name: "OOAD and Web Technologies Lab",
        credits: 2,
        type: "Practical Lab",
        isLab: true,
        description: "Practical modeling of software design patterns and full-stack web application development.",
        pdfUrl: "/syllabus/IGNOU_MCA_Programme_Guide_Syllabus.pdf",
        units: [
          { unitNumber: 1, title: "Full-Stack Web Lab", topics: ["REST API development, Frontend framework integration, Database connectivity"] }
        ]
      },
      {
        code: "MCSL-223",
        name: "Computer Networks and Data Mining Lab",
        credits: 2,
        type: "Practical Lab",
        isLab: true,
        description: "Network simulation with Wireshark/Packet Tracer and data mining algorithm implementations using Python/Weka.",
        pdfUrl: "/syllabus/IGNOU_MCA_Programme_Guide_Syllabus.pdf",
        units: [
          { unitNumber: 1, title: "Network Simulation & Data Mining", topics: ["Packet analysis, Classification models in Python, Clustering datasets"] }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "3rd Semester",
    totalCredits: 20,
    subjects: [
      {
        code: "MCS-224",
        name: "Artificial Intelligence and Machine Learning",
        credits: 4,
        type: "Core Theory",
        isLab: false,
        description: "Search algorithms, Knowledge representation, Supervised learning (Linear/Logistic regression, SVM), Unsupervised learning, Neural Networks, Deep Learning.",
        pdfUrl: "/syllabus/IGNOU_MCA_Programme_Guide_Syllabus.pdf",
        units: [
          { unitNumber: 1, title: "AI Search & Knowledge Representation", topics: ["A* search, Minimax algorithm, First-order logic"] },
          { unitNumber: 2, title: "Machine Learning Foundations", topics: ["Regression, Classification, Support Vector Machines, Neural Networks"] }
        ]
      },
      {
        code: "MCS-225",
        name: "Accountancy and Financial Management",
        credits: 4,
        type: "Core Theory",
        isLab: false,
        description: "Financial accounting principles, balance sheets, cost accounting, financial statements analysis, working capital management.",
        pdfUrl: "/syllabus/IGNOU_MCA_Programme_Guide_Syllabus.pdf",
        units: [
          { unitNumber: 1, title: "Financial Accounting Basics", topics: ["Double entry system, Journal to Ledger, Profit & Loss accounts"] }
        ]
      },
      {
        code: "MCS-226",
        name: "Data Science and Big Data",
        credits: 4,
        type: "Core Theory",
        isLab: false,
        description: "Data analytics lifecycle, Big Data architectures, Hadoop, MapReduce, Apache Spark, NoSQL databases, and data visualization.",
        pdfUrl: "/syllabus/IGNOU_MCA_Programme_Guide_Syllabus.pdf",
        units: [
          { unitNumber: 1, title: "Big Data & Hadoop Ecosystem", topics: ["HDFS, MapReduce, Apache Spark, NoSQL data modeling"] }
        ]
      },
      {
        code: "MCS-227",
        name: "Cloud Computing and IoT",
        credits: 4,
        type: "Core Theory",
        isLab: false,
        description: "Cloud deployment models (IaaS, PaaS, SaaS), virtualization, Docker containers, Kubernetes, IoT architectures and sensor networks.",
        pdfUrl: "/syllabus/IGNOU_MCA_Programme_Guide_Syllabus.pdf",
        units: [
          { unitNumber: 1, title: "Cloud Architectures & Containers", topics: ["Virtualization, AWS/GCP services, Docker containers, Kubernetes"] }
        ]
      },
      {
        code: "MCSL-228",
        name: "AI, Machine Learning and Python Lab",
        credits: 2,
        type: "Practical Lab",
        isLab: true,
        description: "Hands-on machine learning projects with Python, NumPy, Pandas, Scikit-Learn, and TensorFlow.",
        pdfUrl: "/syllabus/IGNOU_MCA_Programme_Guide_Syllabus.pdf",
        units: [
          { unitNumber: 1, title: "Python ML Implementation Lab", topics: ["Data preprocessing, Model training, Evaluation metrics, Neural networks"] }
        ]
      },
      {
        code: "MCSL-229",
        name: "Cloud and Data Science Lab",
        credits: 2,
        type: "Practical Lab",
        isLab: true,
        description: "Cloud deployment experiments, container orchestration with Docker, and big data processing with PySpark.",
        pdfUrl: "/syllabus/IGNOU_MCA_Programme_Guide_Syllabus.pdf",
        units: [
          { unitNumber: 1, title: "Cloud Deployment & PySpark", topics: ["Docker containerization, Spark DataFrames, Cloud storage operations"] }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "4th Semester",
    totalCredits: 12,
    subjects: [
      {
        code: "MCSP-232",
        name: "Project / Major Dissertation",
        credits: 12,
        type: "Practical Lab",
        isLab: true,
        description: "Comprehensive software engineering industry capstone project, system design, implementation, testing, and university viva voce.",
        pdfUrl: "/syllabus/IGNOU_MCA_Programme_Guide_Syllabus.pdf",
        units: [
          { unitNumber: 1, title: "Project Inception & SRS", topics: ["Problem definition, Literature review, SRS documentation"] },
          { unitNumber: 2, title: "Implementation & Viva Voce", topics: ["Full stack implementation, Testing verification, Final dissertation report"] }
        ]
      }
    ]
  }
];

/* ══════════════════════════════════════════════════════════════════════════
   4. UNIFIED UNIVERSITY & PROGRAM REGISTRY
   ══════════════════════════════════════════════════════════════════════════ */
export const UNIVERSITY_PROGRAMS: UniversityProgram[] = [
  {
    id: "du-bsc",
    universityName: "University of Delhi (DU)",
    shortName: "Delhi University (DU)",
    degreeName: "B.Sc. (P) with Computer Science",
    regulation: "NEP 2024 / UGCF Framework",
    badge: "🏛️ Central University",
    officialSyllabusPdf: "/syllabus/DU_BSc_Prog_CS_Sem1_Programming_using_C++.pdf",
    officialSourceUrl: "https://cs.du.ac.in/uploads/syllabus/NEP/bscprog2024.html",
    description: "Official Department of Computer Science, University of Delhi curriculum covering Programming using C++, Data Structures, Algorithms, Operating Systems, DBMS, Networks, and Information Security.",
    semesters: duBscProgSemesters
  },
  {
    id: "ignou-bca",
    universityName: "Indira Gandhi National Open University (IGNOU)",
    shortName: "IGNOU BCA (UG)",
    degreeName: "Bachelor of Computer Applications (BCA)",
    regulation: "Revised CBCS & National Education Policy",
    badge: "🎓 National Open University",
    officialSyllabusPdf: "/syllabus/IGNOU_BCA_Programme_Guide_Syllabus.pdf",
    officialSourceUrl: "https://www.ignou.ac.in/viewFile/SOCIS/programmeguide/BCA_NEW-May-2026.pdf",
    description: "Official School of Computer and Information Sciences (SOCIS) IGNOU BCA 6-semester undergraduate degree program with complete textbook notes and practical labs.",
    semesters: ignouBcaSemesters
  },
  {
    id: "ignou-mca",
    universityName: "Indira Gandhi National Open University (IGNOU)",
    shortName: "IGNOU MCA (PG)",
    degreeName: "Master of Computer Applications (MCA New)",
    regulation: "New 2-Year Master Curriculum (AICTE Approved)",
    badge: "🎓 Postgraduate Degree",
    officialSyllabusPdf: "/syllabus/IGNOU_MCA_Programme_Guide_Syllabus.pdf",
    officialSourceUrl: "https://www.ignou.ac.in/viewFile/SOCIS/programmeguide/MCA-New-July-2025.pdf",
    description: "Official School of Computer and Information Sciences (SOCIS) IGNOU MCA 2-year postgraduate program covering Advanced Algorithms, AI/ML, Cloud Computing, Big Data, and Web Tech.",
    semesters: ignouMcaSemesters
  }
];
