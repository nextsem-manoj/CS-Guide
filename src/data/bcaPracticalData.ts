export interface CareerTrack {
  id: 'web-dev' | 'programming' | 'data-ai' | 'cloud-networking';
  title: string;
  badge: string;
  icon: string;
  color: string;
  description: string;
  targetRoles: string[];
  keySkills: string[];
  recommendedSemester: string;
}

export interface PracticalSemester {
  semNumber: number;
  year: number;
  title: string;
  focus: string;
  daysRange: string;
  totalDays: number;
  coreSubjects: string[];
  practicalHighlights: string[];
}

export interface PracticalTask {
  id: string;
  title: string;
  instruction: string;
  hint: string;
  validatorKeywords?: string[];
  validatorRegex?: string;
}

export interface PracticalLesson {
  id: string;
  day: number;
  year: number;
  semester: number;
  specialization: 'foundation' | 'web-dev' | 'programming' | 'data-ai' | 'cloud-networking';
  title: string;
  slug: string;
  category: string;
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  objectives: string[];
  concept: {
    overview: string;
    keyPoints: string[];
    analogy?: string;
  };
  teacherDemo: {
    title: string;
    explanation: string;
    code: string;
    language: 'html' | 'css' | 'javascript' | 'c';
  };
  practicalLab: {
    labTitle: string;
    labDescription: string;
    initialCode: string;
    language: 'html' | 'css' | 'javascript' | 'c';
    tasks: PracticalTask[];
  };
  debuggingChallenge: {
    title: string;
    buggyCode: string;
    bugExplanation: string;
    fixedCode: string;
  };
  assignment: {
    title: string;
    instructions: string[];
    submissionCriteria: string;
    fileName?: string;
    solutionCode?: string;
    starterCode?: string;
  };
  githubWorkflow: {
    repoName: string;
    commitMessage: string;
    commands: string[];
    tips: string;
  };
  vivaCheck: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
}

/* ══════════════════════════════════════════════════════════════════════════
   1. CAREER SPECIALIZATION TRACKS
   ══════════════════════════════════════════════════════════════════════════ */
export const CAREER_TRACKS: CareerTrack[] = [
  {
    id: 'web-dev',
    title: 'Track 1 — Web & Full-Stack Development',
    badge: 'High Demand',
    icon: '🌐',
    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-400',
    description: 'Master modern frontend & backend engineering: semantic HTML, responsive CSS, dynamic JavaScript, React, Node.js, Express, REST APIs, and database deployment.',
    targetRoles: ['Frontend Developer', 'Full-Stack Developer', 'Web Application Engineer'],
    keySkills: ['HTML5', 'CSS3 / Tailwind', 'Modern JS (ES6+)', 'DOM & APIs', 'React', 'Node.js', 'Express', 'MySQL / MongoDB', 'Git & GitHub CI/CD'],
    recommendedSemester: 'Specialization starts Semester 3'
  },
  {
    id: 'programming',
    title: 'Track 2 — Software & Systems Programming',
    badge: 'Core Engineering',
    icon: '💻',
    color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/40 text-blue-400',
    description: 'Deep dive into computational problem solving, data structures, algorithm optimization, Object-Oriented Programming (OOP) in C++ / Java, and backend architecture.',
    targetRoles: ['Software Developer', 'Backend Programmer', 'Junior Software Engineer', 'Systems Programmer'],
    keySkills: ['C Programming', 'C++ / OOP', 'Data Structures & Algorithms', 'Pointers & Memory', 'SQL & RDBMS', 'Unit Testing', 'Linux Terminal'],
    recommendedSemester: 'Specialization starts Semester 3'
  },
  {
    id: 'data-ai',
    title: 'Track 3 — Data Analytics & AI Fundamentals',
    badge: 'Future Ready',
    icon: '📊',
    color: 'from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-400',
    description: 'Transform raw data into actionable insights and intelligent systems using Python, SQL aggregations, Pandas, data visualization, and applied machine learning models.',
    targetRoles: ['Data Analyst', 'Junior Data Engineer', 'Business Intelligence Associate', 'ML Trainee'],
    keySkills: ['Python 3', 'SQL & Queries', 'Pandas & NumPy', 'Data Cleaning', 'Data Visualization (Matplotlib)', 'Jupyter Notebooks', 'ML Basics'],
    recommendedSemester: 'Specialization starts Semester 3'
  },
  {
    id: 'cloud-networking',
    title: 'Track 4 — IT, Networking & Cloud Infrastructure',
    badge: 'Enterprise Infrastructure',
    icon: '☁️',
    color: 'from-cyan-500/20 to-sky-500/10 border-cyan-500/40 text-cyan-400',
    description: 'Build and maintain enterprise computer networks, Linux servers, cloud virtual machines, subnetting architecture, troubleshooting protocols, and basic cybersecurity.',
    targetRoles: ['IT Support Engineer', 'Network Administrator', 'Cloud Operations Support', 'Junior DevOps Engineer'],
    keySkills: ['Computer Hardware', 'Linux Administration', 'IPv4/IPv6 Subnetting', 'Wireshark & Packet Analysis', 'Cloud VMs (AWS/GCP)', 'Network Security', 'Shell Scripting'],
    recommendedSemester: 'Specialization starts Semester 3'
  }
];

/* ══════════════════════════════════════════════════════════════════════════
   2. 3-YEAR / 6-SEMESTER ROADMAP (DAYS 1–360)
   ══════════════════════════════════════════════════════════════════════════ */
export const PRACTICAL_SEMESTERS: PracticalSemester[] = [
  {
    semNumber: 1,
    year: 1,
    title: 'Semester 1: Common Technical Foundation',
    focus: 'Developer setup, Windows 11 terminal commands, HTML5, CSS3, basic JavaScript logic, and GitHub workflows.',
    daysRange: 'Days 1–60',
    totalDays: 60,
    coreSubjects: ['BCS-111 / BCS-011: Computer Basics', 'BCSL-013: PC Software Lab', 'BCS-012: Basic Mathematics'],
    practicalHighlights: ['Sprint 1 (Days 1–30): HTML5 & CSS3', 'Sprint 2 (Days 31–60): Responsive Layouts & Git', '🪟 Windows 11 Terminal & GitHub Push']
  },
  {
    semNumber: 2,
    year: 1,
    title: 'Semester 2: Programming Fundamentals & Logic Building',
    focus: 'Structured programming in C, pointer memory models, JavaScript DOM manipulation, and relational database queries.',
    daysRange: 'Days 61–120',
    totalDays: 60,
    coreSubjects: ['MCS-011: Problem Solving & C', 'MCSL-017: C Lab', 'Database Foundation'],
    practicalHighlights: ['Sprint 3 (Days 61–90): C & Memory Logic', 'Sprint 4 (Days 91–120): Advanced JS & SQL', 'Interactive SQL & Grade Tracker App']
  },
  {
    semNumber: 3,
    year: 2,
    title: 'Semester 3: Career Specialization Kickoff & DSA',
    focus: 'Career track selection (Web / Software / Data / Cloud) + Data Structures & Algorithms and Advanced Database Systems.',
    daysRange: 'Days 121–180',
    totalDays: 60,
    coreSubjects: ['MCS-021: Data & File Structures', 'MCS-023: Database Management Systems', 'MCSL-025: DSA Lab'],
    practicalHighlights: ['Sprint 5 (Days 121–150): DSA in C/C++', 'Sprint 6 (Days 151–180): SQL & RDBMS', 'Linked Lists & Query Optimization']
  },
  {
    semNumber: 4,
    year: 2,
    title: 'Semester 4: Backend Engineering & Systems Architecture',
    focus: 'Object-Oriented Programming (Java / C++ / Python), REST API architecture with Node.js/Express, and Linux command line.',
    daysRange: 'Days 181–240',
    totalDays: 60,
    coreSubjects: ['MCS-024: OOP Technologies (Java/Python)', 'MCS-022: Operating Systems', 'Backend REST APIs'],
    practicalHighlights: ['Sprint 7 (Days 181–210): OOP Architecture', 'Sprint 8 (Days 211–240): REST API Backend', 'Postman Testing & Linux Automation']
  },
  {
    semNumber: 5,
    year: 3,
    title: 'Semester 5: Advanced Architecture & Major Project Phase 1',
    focus: 'Career specialization deep dive (React/Next.js or AI/Python or Cloud), Docker containers, authentication, and Capstone scoping.',
    daysRange: 'Days 241–300',
    totalDays: 60,
    coreSubjects: ['BCS-051: Software Engineering', 'BCS-053: Web Programming', 'BCSL-056: Full Stack Lab'],
    practicalHighlights: ['Sprint 9 (Days 241–270): Track Specialization', 'Sprint 10 (Days 271–300): Cloud & Docker', 'Major Capstone Phase 1 Submission']
  },
  {
    semNumber: 6,
    year: 3,
    title: 'Semester 6: Major Capstone, Production Portfolio & Job Readiness',
    focus: 'Full production deployment, open-source portfolio polish, technical viva defense, resume preparation, and mock interview practice.',
    daysRange: 'Days 301–360',
    totalDays: 60,
    coreSubjects: ['BCSP-064: Major Capstone Project', 'BCS-062: E-Commerce & Security', 'Career Viva Preparation'],
    practicalHighlights: ['Sprint 11 (Days 301–330): Production Capstone', 'Sprint 12 (Days 331–360): Portfolio & Viva', 'Job Readiness & Viva Defense']
  }
];

/* ══════════════════════════════════════════════════════════════════════════
   3. 3-YEAR (6-SEMESTER / 360-DAY) PRACTICAL SPRINT PHASES
   ══════════════════════════════════════════════════════════════════════════ */
export interface PracticalSprint {
  sprintNumber: number;
  year: number;
  semester: number;
  daysRange: string;
  title: string;
  badge: string;
  description: string;
  milestoneProject: string;
}

export const PRACTICAL_SPRINTS: PracticalSprint[] = [
  // ── YEAR 1: FOUNDATION (DAYS 1–120) ──
  {
    sprintNumber: 1,
    year: 1,
    semester: 1,
    daysRange: 'Days 1–30',
    title: 'Sprint 1: Web Foundation & Semantic HTML/CSS',
    badge: 'Sem 1 • Foundation',
    description: 'Learn modern semantic HTML5, clean CSS layouts, responsive design, and developer command line workflow.',
    milestoneProject: 'Interactive Developer Portfolio v1 (Day 30 Mini Project)'
  },
  {
    sprintNumber: 2,
    year: 1,
    semester: 1,
    daysRange: 'Days 31–60',
    title: 'Sprint 2: Modern CSS Layouts, Grid & Git Workflows',
    badge: 'Sem 1 • Frontend',
    description: 'Master advanced Flexbox, CSS Grid systems, animations, media queries, and professional GitHub repository publishing.',
    milestoneProject: 'Responsive University Campus Portal (Day 60 Project)'
  },
  {
    sprintNumber: 3,
    year: 1,
    semester: 2,
    daysRange: 'Days 61–90',
    title: 'Sprint 3: C Programming & Computational Logic',
    badge: 'Sem 2 • Logic',
    description: 'Deep dive into variables, pointers, dynamic memory allocation, structs, and terminal problem solving in C.',
    milestoneProject: 'Terminal-Based Student Record System in C (Day 90 Project)'
  },
  {
    sprintNumber: 4,
    year: 1,
    semester: 2,
    daysRange: 'Days 91–120',
    title: 'Sprint 4: JavaScript DOM & Interactive Applications',
    badge: 'Sem 2 • Interactive',
    description: 'Event-driven programming, DOM tree manipulation, localStorage state management, and basic SQL query sandbox.',
    milestoneProject: 'Interactive Student Grade & Quiz Management App (Day 120)'
  },

  // ── YEAR 2: CORE ENGINEERING & BACKEND (DAYS 121–240) ──
  {
    sprintNumber: 5,
    year: 2,
    semester: 3,
    daysRange: 'Days 121–150',
    title: 'Sprint 5: Data Structures & Algorithms in C/C++',
    badge: 'Sem 3 • Core DSA',
    description: 'Implement arrays, singly/doubly linked lists, stacks, queues, trees, recursion, and time complexity benchmarking.',
    milestoneProject: 'Visual Data Structure Explorer & Memory Debugger (Day 150)'
  },
  {
    sprintNumber: 6,
    year: 2,
    semester: 3,
    daysRange: 'Days 151–180',
    title: 'Sprint 6: Database Systems & Relational SQL Architecture',
    badge: 'Sem 3 • Database',
    description: 'Design normalized tables, primary/foreign keys, joins, aggregations, transactions, and indexing in MySQL/PostgreSQL.',
    milestoneProject: 'Hospital & Healthcare Database Management System (Day 180)'
  },
  {
    sprintNumber: 7,
    year: 2,
    semester: 4,
    daysRange: 'Days 181–210',
    title: 'Sprint 7: Object-Oriented Software Design (OOP)',
    badge: 'Sem 4 • Architecture',
    description: 'Classes, inheritance, polymorphism, encapsulation, interfaces, and clean design patterns in Java/C++/Python.',
    milestoneProject: 'Enterprise Banking & Transaction Management System (Day 210)'
  },
  {
    sprintNumber: 8,
    year: 2,
    semester: 4,
    daysRange: 'Days 211–240',
    title: 'Sprint 8: Backend REST APIs & Linux Shell Engineering',
    badge: 'Sem 4 • Backend',
    description: 'Build Node.js & Express REST servers, routing, middleware, JWT authentication, and Linux server shell automation.',
    milestoneProject: 'Secured Student Enterprise REST API with Auth (Day 240)'
  },

  // ── YEAR 3: SPECIALIZATION, PROJECTS & JOB READINESS (DAYS 241–360) ──
  {
    sprintNumber: 9,
    year: 3,
    semester: 5,
    daysRange: 'Days 241–270',
    title: 'Sprint 9: Career Track Deep-Dive Specialization',
    badge: 'Sem 5 • Track Focus',
    description: 'Intensive practice in chosen track: Full-Stack React/Next.js, Python Data/AI, or Cloud/DevOps infrastructure.',
    milestoneProject: 'Career Specialization Production Feature Module (Day 270)'
  },
  {
    sprintNumber: 10,
    year: 3,
    semester: 5,
    daysRange: 'Days 271–300',
    title: 'Sprint 10: Cloud Deployment, Docker & CI/CD Pipelines',
    badge: 'Sem 5 • DevOps',
    description: 'Containerize apps with Docker, configure environment variables, setup GitHub Actions, and deploy to cloud VMs.',
    milestoneProject: 'Containerized Multi-Service Web App on Cloud (Day 300)'
  },
  {
    sprintNumber: 11,
    year: 3,
    semester: 6,
    daysRange: 'Days 301–330',
    title: 'Sprint 11: Major Capstone Industry Project Build',
    badge: 'Sem 6 • Capstone',
    description: 'Build an end-to-end industry-grade software product, write technical architecture documentation, and push to GitHub.',
    milestoneProject: 'Major Capstone Production Web Application (Day 330)'
  },
  {
    sprintNumber: 12,
    year: 3,
    semester: 6,
    daysRange: 'Days 331–360',
    title: 'Sprint 12: Production Portfolio & Technical Viva Defense',
    badge: 'Sem 6 • Job Ready',
    description: 'Live domain deployment, GitHub portfolio showcase, technical viva voce simulation, and resume interview defense.',
    milestoneProject: 'Live Production Portfolio & Industry Job Readiness (Day 360)'
  }
];

/* ══════════════════════════════════════════════════════════════════════════
   4. DAYS 1–10 PRACTICAL LESSONS DATA
   ══════════════════════════════════════════════════════════════════════════ */
export const PRACTICAL_LESSONS: PracticalLesson[] = [
  /* ── DAY 1 ── */
  {
    id: 'day-1',
    day: 1,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'HTML Setup & First Webpage',
    slug: 'day-1-html-setup-first-webpage',
    category: 'HTML Foundation',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Beginner',
    objectives: [
      'Understand how browsers parse HTML documents.',
      'Configure VS Code workspace and create an `index.html` file.',
      'Write the boilerplate structure: `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`.',
      'Display your first heading and paragraph on a live browser tab.'
    ],
    concept: {
      overview: 'HTML (HyperText Markup Language) is the standard skeleton of every webpage on the internet. Browsers do not understand Word files; they read raw HTML tags and paint them onto your screen.',
      keyPoints: [
        '<!DOCTYPE html> tells the browser you are using modern HTML5.',
        'The <head> holds metadata, page title, and stylesheet links (invisible to the page visitor).',
        'The <body> holds everything the user sees on their screen.',
        'Always save your primary homepage file as `index.html`.'
      ],
      analogy: 'Think of HTML as the brick-and-mortar skeleton of a house. Without it, you cannot paint walls (CSS) or wire the electricity (JavaScript).'
    },
    teacherDemo: {
      title: 'Minimal Valid HTML5 Document',
      explanation: 'Every professional web page begins with this exact 10-line boilerplate.',
      language: 'html',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NextSem BCA Practical Day 1</title>
</head>
<body>
  <h1>Welcome to BCA Practical Portal</h1>
  <p>Today is Day 1 of my coding journey into computer software!</p>
</body>
</html>`
    },
    practicalLab: {
      labTitle: 'Day 1 Coding Lab: Craft Your First Webpage',
      labDescription: 'Edit the code editor below to create a valid HTML5 page containing an <h1> title and a descriptive <p> tag.',
      language: 'html',
      initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First BCA Webpage</title>
</head>
<body>
  <!-- Write your h1 heading and p paragraph here -->
</body>
</html>`,
      tasks: [
        {
          id: 'd1-t1',
          title: 'Add an <h1> Heading',
          instruction: 'Inside the <body>, create an <h1> heading saying "Hello Nextsem Developer".',
          hint: 'Use <h1>Hello Nextsem Developer</h1> inside <body>.',
          validatorKeywords: ['<h1>', '</h1>', 'Hello Nextsem Developer'],
          validatorRegex: '<h1[^>]*>\\s*Hello Nextsem Developer\\s*<\\/h1>'
        },
        {
          id: 'd1-t2',
          title: 'Add a <p> Paragraph',
          instruction: 'Directly below the heading, add a <p> tag describing your BCA coding goal.',
          hint: 'Write <p>I am learning practical coding.</p>.',
          validatorKeywords: ['<p>', '</p>'],
          validatorRegex: '<p[^>]*>[\\s\\S]+?<\\/p>'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Broken Page Structure',
      buggyCode: `<!DOCTYPE html>
<html>
  <title>Buggy Page</title>
  <h1>Why is my title outside head?</h1>
</html>`,
      bugExplanation: 'The `<title>` tag must be inside a `<head>` element, and visible content like `<h1>` must be enclosed inside a `<body>` element. Browsers might try to fix it, but search engines and validation tools will fail.',
      fixedCode: `<!DOCTYPE html>
<html>
<head>
  <title>Buggy Page Fixed</title>
</head>
<body>
  <h1>Content is now properly placed inside body!</h1>
</body>
</html>`
    },
    assignment: {
      title: 'Homework Task: Student Launch Page',
      fileName: 'index.html',
      instructions: [
        'Create a local folder named `bca-day-1` on your PC.',
        'Open the folder in VS Code and create `index.html`.',
        'Add your full name in an <h1> heading.',
        'Add a paragraph detailing: Your BCA Roll Number, College Name, and your target career track.',
        'Open the file directly in Google Chrome and verify the display.'
      ],
      submissionCriteria: 'Verify with browser DevTools (F12) that there are zero HTML syntax warnings.',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Student Launch Page - Day 1</title>
</head>
<body>
  <h1>Er. Manoj Kumar</h1>
  <p>
    <strong>BCA Roll Number:</strong> 2403BCA101<br>
    <strong>College Name:</strong> IGNOU BCA Center / Nextsem Academy<br>
    <strong>Target Career Track:</strong> Full-Stack Software Engineer
  </p>
  <hr>
  <p>Welcome to my BCA practical learning portfolio! Built directly in Visual Studio Code with 100% valid HTML5 standards.</p>
</body>
</html>`
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 01: Setup HTML5 boilerplate and first page',
      commands: [
        'git init',
        'git add .',
        'git commit -m "Day 01: Setup HTML5 boilerplate and first page"',
        'git branch -M main',
        'git remote add origin https://github.com/YOUR_USERNAME/html-css-projects.git',
        'git push -u origin main'
      ],
      tips: 'Commit frequently! Every completed day should be a distinct commit in your `html-css-projects` repository.'
    },
    vivaCheck: {
      question: 'Why is <!DOCTYPE html> required at the very first line of an HTML document?',
      options: [
        'It signals the browser engine to render the document in W3C Standards mode instead of legacy Quirks mode.',
        'It instructs the web server to pre-compile and bundle external stylesheets prior to network dispatch.',
        'It generates an encrypted TLS security token required by the browser to authorize DOM script execution.',
        'It dynamically injects ECMAScript runtime polyfill modules required for backwards browser compatibility.'
      ],
      correctAnswer: 0,
      explanation: '<!DOCTYPE html> is a document type declaration that forces the web browser into full standards compliance mode, avoiding legacy quirks mode quirks.'
    }
  },

  /* ── DAY 2 ── */
  {
    id: 'day-2',
    day: 2,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'HTML Headings, Paragraphs & Text Formatting',
    slug: 'day-2-html-headings-paragraphs-text-formatting',
    category: 'HTML Foundation',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Beginner',
    objectives: [
      'Master heading hierarchy from <h1> through <h6>.',
      'Understand typography elements: <strong>, <em>, <mark>, <del>, <ins>, <small>.',
      'Use line breaks (<br>) and horizontal dividers (<hr>) correctly without breaking structure.',
      'Structure an informative article with clear hierarchy.'
    ],
    concept: {
      overview: 'Text is the core vessel of information on the web. Search engines and screen readers rely on heading hierarchy (h1 to h6) to understand content priority.',
      keyPoints: [
        'A webpage should only have ONE <h1> tag representing the primary page topic.',
        'Never use headings simply to make text large; use CSS for sizing.',
        'Use <strong> for semantic importance (renders bold) and <em> for semantic emphasis (renders italic).',
        '<hr> represents a thematic break in content, while <br> forces a line break.'
      ],
      analogy: 'Think of <h1> as a book title, <h2> as chapter names, and <h3> as sub-sections within that chapter.'
    },
    teacherDemo: {
      title: 'Semantic Heading & Text Formatting Demo',
      explanation: 'Notice how semantic tags provide meaning to both human readers and search engines.',
      language: 'html',
      code: `<article>
  <h1>Introduction to BCA Computer Science</h1>
  <h2>Core Pillars of the Program</h2>
  <p>Computer applications require <strong>strong logic</strong> and <em>daily consistency</em>.</p>
  <hr>
  <h3>Key Focus Areas:</h3>
  <p>Students must master <mark>practical programming</mark> rather than pure memorization.</p>
  <p><small>NextSem Academy © 2026 Academic Syllabus</small></p>
</article>`
    },
    practicalLab: {
      labTitle: 'Day 2 Coding Lab: Academic Article Formatting',
      labDescription: 'Build an article about your favourite programming language using proper heading hierarchy and text emphasis tags.',
      language: 'html',
      initialCode: `<article>
  <!-- Add h1, h2, p with <strong> and <em> here -->
</article>`,
      tasks: [
        {
          id: 'd2-t1',
          title: 'Add Single <h1> Title',
          instruction: 'Add an <h1> with the text "Why I Chose BCA".',
          hint: 'Use <h1>Why I Chose BCA</h1>',
          validatorKeywords: ['<h1>', '</h1>', 'Why I Chose BCA'],
          validatorRegex: '<h1[^>]*>\\s*Why I Chose BCA\\s*<\\/h1>'
        },
        {
          id: 'd2-t2',
          title: 'Use <strong> and <em> Inside Paragraph',
          instruction: 'Add a <p> tag that contains both <strong> and <em> tags.',
          hint: 'Example: <p>I want to be a <strong>developer</strong> with <em>passion</em>.</p>',
          validatorKeywords: ['<p>', '<strong>', '</strong>', '<em>', '</em>', '</p>'],
          validatorRegex: '<p[^>]*>[\\s\\S]*?<strong>[\\s\\S]*?<\\/strong>[\\s\\S]*?<em>[\\s\\S]*?<\\/em>[\\s\\S]*?<\\/p>'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Broken Tag Nesting',
      buggyCode: `<p>This is a <strong>very important <em>point</p></em></strong>`,
      bugExplanation: 'Tags must be closed in reverse order of how they were opened (LIFO - Last In, First Out). The <em> and <strong> were closed after closing the <p> tag!',
      fixedCode: `<p>This is a <strong>very important <em>point</em></strong>.</p>`
    },
    assignment: {
      title: 'Homework Task: Tech Biography Page',
      fileName: 'biography.html',
      instructions: [
        'Create a page about Ada Lovelace or Alan Turing.',
        'Use an <h1> for the person’s name.',
        'Use <h2> for their Early Life, Major Achievements, and Legacy.',
        'Use <strong> for significant dates and inventions.',
        'Add a thematic divider (<hr>) before the footer.'
      ],
      submissionCriteria: 'Inspect your heading structure using the Chrome accessibility tree or DevTools.',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ada Lovelace - Tech Biography</title>
</head>
<body>
  <h1>Ada Lovelace</h1>
  <p>The world's first computer programmer, celebrated for her foundational insights into Charles Babbage’s mechanical computer.</p>

  <h2>Early Life</h2>
  <p>Born on <strong>10 December 1815</strong> in London, Ada demonstrated exceptional mathematical talent from early childhood under private tutoring.</p>

  <h2>Major Achievements</h2>
  <p>In <strong>1843</strong>, she translated Luigi Menabrea's memoir on Babbage's <em>Analytical Engine</em>, appending extensive personal notes containing the world's first published machine algorithm.</p>

  <h2>Legacy</h2>
  <p>Her visionary realization that computers could manipulate symbols beyond basic arithmetic laid the philosophical foundation for <strong>modern computer science</strong>.</p>

  <hr>
  <footer>
    <p><small>&copy; 2026 BCA Practical Portfolio - Day 2 Semantic Text Formatting</small></p>
  </footer>
</body>
</html>`
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 02: Heading hierarchy and semantic text formatting',
      commands: [
        'git add .',
        'git commit -m "Day 02: Heading hierarchy and semantic text formatting"',
        'git push origin main'
      ],
      tips: 'Always write concise, imperative commit messages starting with an action verb (e.g., "Add", "Fix", "Update").'
    },
    vivaCheck: {
      question: 'What is the semantic difference between <b> and <strong> in HTML5?',
      options: [
        '<b> applies visual bold styling without semantic weight; <strong> conveys programmatic importance to assistive readers.',
        '<b> is restricted exclusively to heading containers; <strong> is permitted only within paragraphs and blockquotes.',
        '<strong> renders bold typography exclusively on desktop screens; <b> applies bold styles across mobile touch devices.',
        '<b> is deprecated by modern WHATWG specifications; <strong> represents the only compliant element for bold styling.'
      ],
      correctAnswer: 0,
      explanation: '<b> is purely stylistic (offset text without extra importance), whereas <strong> gives semantic importance, which assists accessibility readers and SEO indexers.'
    }
  },

  /* ── DAY 3 ── */
  {
    id: 'day-3',
    day: 3,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'HTML Links & Images',
    slug: 'day-3-html-links-and-images',
    category: 'HTML Foundation',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Beginner',
    objectives: [
      'Create hyperlinks with the anchor tag <a> and `href` attribute.',
      'Understand absolute URLs vs relative paths.',
      'Open links in new tabs safely using `target="_blank"` and `rel="noopener noreferrer"`.',
      'Embed images with `<img>`, `src`, `alt`, `width`, and `height`.'
    ],
    concept: {
      overview: 'Hyperlinks connect documents across the World Wide Web, creating the hyperlinked web network. Images visually communicate data, but require accessible descriptions via alt attributes.',
      keyPoints: [
        'Absolute URLs specify full protocol & domain (e.g., `https://google.com`).',
        'Relative URLs point to files inside your project directory (e.g., `about.html` or `images/logo.png`).',
        'The `alt` attribute is MANDATORY for images so screen readers can describe the image if it fails to load.',
        'Never omit `alt` or write generic words like "image". Describe the content concisely.'
      ],
      analogy: 'An `href` is like a GPS coordinate directing the browser to another building, while `src` is like ordering a picture frame to be placed in your room.'
    },
    teacherDemo: {
      title: 'Links, New Tabs & Responsive Images',
      explanation: 'Notice the secure attributes used when opening external links.',
      language: 'html',
      code: `<section>
  <h2>Explore Developer Resources</h2>
  <p>
    Visit the official 
    <a href="https://nextsem.online" target="_blank" rel="noopener noreferrer">
      NextSem Academy Portal
    </a>
  </p>
  <img 
    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500" 
    alt="Developer working on laptop with code editor open"
    width="500" 
    height="300"
  >
</section>`
    },
    practicalLab: {
      labTitle: 'Day 3 Coding Lab: Resource Link Card with Image',
      labDescription: 'Create an image card that features an external documentation link and an image with an accessible alt description.',
      language: 'html',
      initialCode: `<div>
  <!-- Add your image and anchor tag here -->
</div>`,
      tasks: [
        {
          id: 'd3-t1',
          title: 'Add an Image with alt Attribute',
          instruction: 'Add an <img> tag with a valid `src` and a descriptive `alt` attribute.',
          hint: 'Example: <img src="https://via.placeholder.com/150" alt="Sample placeholder thumbnail">',
          validatorKeywords: ['<img', 'src=', 'alt='],
          validatorRegex: '<img[^>]*src=[\'"][^\'"]+[\'"][^>]*alt=[\'"][^\'"]+[\'"][^>]*>'
        },
        {
          id: 'd3-t2',
          title: 'Add External Link with target="_blank"',
          instruction: 'Add an <a> tag linking to "https://github.com" with target="_blank".',
          hint: 'Use <a href="https://github.com" target="_blank" rel="noopener noreferrer">Visit GitHub</a>',
          validatorKeywords: ['<a', 'href="https://github.com"', 'target="_blank"'],
          validatorRegex: '<a[^>]*href=[\'"]https:\\/\\/github\\.com[\'"][^>]*target=[\'"]_blank[\'"][^>]*>[\\s\\S]+?<\\/a>'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Security Vulnerability in External Links',
      buggyCode: `<a href="https://untrusted-external-site.com" target="_blank">Click Here</a>`,
      bugExplanation: 'Opening external sites in `target="_blank"` without `rel="noopener noreferrer"` allows the destination page to access `window.opener` and potentially manipulate or phish your original tab (Reverse Tabnabbing).',
      fixedCode: `<a href="https://untrusted-external-site.com" target="_blank" rel="noopener noreferrer">Click Here</a>`
    },
    assignment: {
      title: 'Homework Task: Multi-Page BCA Mini Site',
      fileName: 'index.html',
      instructions: [
        'Create three HTML files in one directory: `index.html`, `courses.html`, and `contact.html`.',
        'Add navigation links on all three pages linking to each other using relative paths (`href="courses.html"`).',
        'Place a computer image on the homepage with width="400" and an accurate alt tag.',
        'Verify that clicking each navigation link transitions smoothly between the pages.'
      ],
      submissionCriteria: 'All relative internal links must navigate smoothly without 404 errors.',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Student Portal - Day 3 Multi-Page Website</title>
</head>
<body>
  <header>
    <h1>Nextsem BCA Practical Learning Hub</h1>
    <nav>
      <strong>Navigation: </strong>
      <a href="index.html">Home</a> |
      <a href="courses.html">Course Catalog</a> |
      <a href="contact.html">Contact Faculty</a> |
      <a href="https://github.com" target="_blank" rel="noopener noreferrer">Official GitHub ↗</a>
    </nav>
  </header>
  <hr>

  <main>
    <h2>Welcome to First Year Computer Science Practical</h2>
    <p>This multi-page mini site demonstrates internal relative links, secure external hyperlinks with <code>rel="noopener noreferrer"</code>, and accessible image integration.</p>
    
    <figure>
      <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600" alt="Student workstation setup with mechanical keyboard and code editor" width="400">
      <figcaption><small>Figure 1: Hands-on developer workstation setup.</small></figcaption>
    </figure>
  </main>
  <hr>

  <footer>
    <p>&copy; 2026 IGNOU BCA Semester 1 Practical Workshop</p>
  </footer>
</body>
</html>`
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 03: Hyperlinks, image embedding and secure target blank',
      commands: [
        'git add .',
        'git commit -m "Day 03: Hyperlinks, image embedding and secure target blank"',
        'git push origin main'
      ],
      tips: 'Commit and check your GitHub repository in your browser to verify that file paths match case-sensitively.'
    },
    vivaCheck: {
      question: 'Why is the `alt` attribute strictly mandatory on an <img> tag according to web standards?',
      options: [
        'It specifies the binary compression algorithm required by the browser to decompress rasterized image files.',
        'It provides programmatic context for screen readers and displays text if the image asset fails to load.',
        'It prevents external domain originators from hotlinking image files and consuming host server bandwidth.',
        'It pre-calculates responsive aspect ratios to prevent cumulative layout shift prior to complete image fetch.'
      ],
      correctAnswer: 1,
      explanation: 'The `alt` text provides essential accessibility for screen readers and is displayed if network failure prevents the image from downloading.'
    }
  },

  /* ── DAY 4 ── */
  {
    id: 'day-4',
    day: 4,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'HTML Lists & Tables',
    slug: 'day-4-html-lists-and-tables',
    category: 'HTML Foundation',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Beginner',
    objectives: [
      'Build unordered lists (<ul>) and ordered lists (<ol>) with list items (<li>).',
      'Create nested navigation lists.',
      'Construct data tables using <table>, <thead>, <tbody>, <tr>, <th>, and <td>.',
      'Apply `colspan` and `rowspan` to merge table cells effectively.'
    ],
    concept: {
      overview: 'Lists organize steps, features, and website menus. Tables represent 2D tabular data like grades, schedules, or database records.',
      keyPoints: [
        'Only <li> elements may be direct children of <ul> and <ol>.',
        'Tables must NEVER be used for page layouts; use tables exclusively for tabular data.',
        'Always wrap table headers inside <thead> and data rows inside <tbody>.',
        '<th> stands for Table Header (bold and centered by default), while <td> is Table Data.'
      ],
      analogy: 'Think of <ul> as a bulleted shopping checklist, and <table> as an Excel spreadsheet.'
    },
    teacherDemo: {
      title: 'BCA Semester 1 Grade Sheet Table',
      explanation: 'Notice the structured use of thead, tbody, th, and td tags.',
      language: 'html',
      code: `<table>
  <thead>
    <tr>
      <th>Subject Code</th>
      <th>Subject Name</th>
      <th>Credits</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>BCS-111</td>
      <td>Computer Basics & PC Software</td>
      <td>3</td>
      <td>In Progress</td>
    </tr>
    <tr>
      <td>BCSL-013</td>
      <td>Software Lab</td>
      <td>2</td>
      <td>In Progress</td>
    </tr>
  </tbody>
</table>`
    },
    practicalLab: {
      labTitle: 'Day 4 Coding Lab: Course Timetable Table',
      labDescription: 'Construct a structured schedule table with a header row and at least two data rows.',
      language: 'html',
      initialCode: `<table>
  <!-- Add thead, tbody, tr, th, td here -->
</table>`,
      tasks: [
        {
          id: 'd4-t1',
          title: 'Add Table Header Row with 3 Columns',
          instruction: 'Inside <thead>, create a <tr> containing three <th> elements: Day, Subject, and Time.',
          hint: 'Use <thead><tr><th>Day</th><th>Subject</th><th>Time</th></tr></thead>',
          validatorKeywords: ['<thead>', '<th>Day</th>', '<th>Subject</th>', '<th>Time</th>', '</thead>'],
          validatorRegex: '<thead>[\\s\\S]*?<tr>[\\s\\S]*?<th>Day<\\/th>[\\s\\S]*?<th>Subject<\\/th>[\\s\\S]*?<th>Time<\\/th>[\\s\\S]*?<\\/tr>[\\s\\S]*?<\\/thead>'
        },
        {
          id: 'd4-t2',
          title: 'Add Table Body with Data Row',
          instruction: 'Inside <tbody>, add a <tr> containing three <td> cells.',
          hint: 'Example: <tbody><tr><td>Monday</td><td>HTML Lab</td><td>10:00 AM</td></tr></tbody>',
          validatorKeywords: ['<tbody>', '<tr>', '<td>', '</td>', '</tr>', '</tbody>'],
          validatorRegex: '<tbody>[\\s\\S]*?<tr>[\\s\\S]*?<td>[\\s\\S]*?<\\/td>[\\s\\S]*?<td>[\\s\\S]*?<\\/td>[\\s\\S]*?<td>[\\s\\S]*?<\\/td>[\\s\\S]*?<\\/tr>[\\s\\S]*?<\\/tbody>'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Illegal Direct Children of Lists',
      buggyCode: `<ul>
  <p>First item</p>
  <div>Second item</div>
</ul>`,
      bugExplanation: 'HTML specifications strictly require that only `<li>` elements can be direct children of a `<ul>` or `<ol>`. Tags like `<p>` and `<div>` are illegal direct children.',
      fixedCode: `<ul>
  <li>First item</li>
  <li>Second item</li>
</ul>`
    },
    assignment: {
      title: 'Homework Task: BCA Semester Syllabus Matrix',
      fileName: 'syllabus-matrix.html',
      instructions: [
        'Create a webpage displaying the complete list of 6 BCA semesters using an ordered list (<ol>).',
        'Inside Semester 1, nest an unordered list (<ul>) of all subjects.',
        'Below the lists, create a table summarizing Subject, Credits, Lab requirement (Yes/No), and Exam weightage.',
        'Use `colspan="2"` on a footer summary row displaying "Total Credits: 16".'
      ],
      submissionCriteria: 'Ensure the table passes W3C HTML validator without nesting errors.',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Semester Syllabus Matrix - Day 4</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 25px; line-height: 1.6; }
    table { width: 100%; max-width: 650px; border-collapse: collapse; margin-top: 15px; }
    table, th, td { border: 1px solid #cbd5e1; padding: 10px 14px; text-align: left; }
    th { background-color: #0f172a; color: #ffffff; }
    tfoot td { font-weight: bold; background-color: #f8fafc; }
  </style>
</head>
<body>
  <h1>IGNOU BCA Academic Curriculum Matrix</h1>
  <h2>Six-Semester Degree Overview</h2>
  <ol>
    <li>
      <strong>Semester 1 (Foundation)</strong>
      <ul>
        <li>BCS-011: Computer Basics and PC Software</li>
        <li>BCS-012: Basic Mathematics</li>
        <li>BCSL-013: Computer Basics Lab</li>
        <li>FEG-02: Foundation in English</li>
      </ul>
    </li>
    <li>Semester 2 (Data Structures & C Programming)</li>
    <li>Semester 3 (Object-Oriented C++ & Systems)</li>
    <li>Semester 4 (Database Management Systems & Java)</li>
    <li>Semester 5 (Web Development & Software Engineering)</li>
    <li>Semester 6 (Cloud Computing & Major Project)</li>
  </ol>

  <h2>Semester 1 Course Credit Breakdown</h2>
  <table>
    <thead>
      <tr>
        <th>Course Code</th>
        <th>Course Title</th>
        <th>Practical Lab</th>
        <th>Credits</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>BCS-011</td>
        <td>Computer Basics and PC Software</td>
        <td>No</td>
        <td>4</td>
      </tr>
      <tr>
        <td>BCS-012</td>
        <td>Basic Mathematics</td>
        <td>No</td>
        <td>4</td>
      </tr>
      <tr>
        <td>BCSL-013</td>
        <td>Software & Hardware Practical Lab</td>
        <td>Yes</td>
        <td>4</td>
      </tr>
      <tr>
        <td>FEG-02</td>
        <td>Foundation Course in English</td>
        <td>No</td>
        <td>4</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3">Total Semester 1 Academic Credits:</td>
        <td>16</td>
      </tr>
    </tfoot>
  </table>
</body>
</html>`
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 04: Structured lists, nested menus and tabular data matrix',
      commands: [
        'git add .',
        'git commit -m "Day 04: Structured lists, nested menus and tabular data matrix"',
        'git push origin main'
      ],
      tips: 'Inspect git log with `git log --oneline` to review your commit history.'
    },
    vivaCheck: {
      question: 'What is the purpose of `colspan` attribute in a `<td>` or `<th>` tag?',
      options: [
        'It expands a table data cell horizontally across two or more adjacent columns in the current row grid.',
        'It stretches a table cell vertically across two or more consecutive rows within the parent tbody container.',
        'It defines proportional column width percentages relative to the total horizontal table layout boundary.',
        'It associates accessible column header identifiers with nested row data cells for multi-tier tables.'
      ],
      correctAnswer: 0,
      explanation: '`colspan` specifies how many horizontal columns a table cell should span across.'
    }
  },

  /* ── DAY 5 ── */
  {
    id: 'day-5',
    day: 5,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'HTML Forms & Input Elements',
    slug: 'day-5-html-forms-and-input-elements',
    category: 'HTML Foundation',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Beginner',
    objectives: [
      'Understand how HTML forms transmit data using `<form action="..." method="...">`.',
      'Master essential input types: `text`, `email`, `password`, `number`, `radio`, `checkbox`.',
      'Connect `<label>` elements to inputs using the `for` and `id` attributes.',
      'Utilize native HTML5 validation attributes: `required`, `minlength`, `pattern`, `placeholder`.'
    ],
    concept: {
      overview: 'Forms are how users submit data into a web application—from logins to job applications. HTML5 provides built-in client-side validation before data hits JavaScript.',
      keyPoints: [
        'Always connect `<label for="username">` with `<input id="username">` for accessibility.',
        'Clicking a connected label focuses its associated input field automatically.',
        'The `name` attribute is crucial: it determines the key under which data is submitted to the backend server.',
        '`method="POST"` is used for sensitive or modifying data; `method="GET"` is used for search queries.'
      ],
      analogy: 'An HTML form is like a physical paper registration slip with pre-labeled blank slots for your details.'
    },
    teacherDemo: {
      title: 'Accessible Student Admission Form',
      explanation: 'Notice how every input has an explicit label, name, id, and validation attribute.',
      language: 'html',
      code: `<form action="/submit-student" method="POST">
  <div>
    <label for="fullName">Full Name:</label>
    <input type="text" id="fullName" name="fullName" placeholder="e.g. Rahul Sharma" required minlength="3">
  </div>
  <div>
    <label for="email">Email Address:</label>
    <input type="email" id="email" name="email" required>
  </div>
  <div>
    <label for="track">Specialization Track:</label>
    <select id="track" name="track">
      <option value="web">Web Development</option>
      <option value="programming">Software / Programming</option>
      <option value="data">Data / AI</option>
    </select>
  </div>
  <button type="submit">Submit Registration</button>
</form>`
    },
    practicalLab: {
      labTitle: 'Day 5 Coding Lab: Student Feedback Form',
      labDescription: 'Construct a form with text, email, and radio button inputs with linked label attributes.',
      language: 'html',
      initialCode: `<form>
  <!-- Add form fields with labels here -->
</form>`,
      tasks: [
        {
          id: 'd5-t1',
          title: 'Add Email Input with Label',
          instruction: 'Create an email input with `id="userEmail"`, `name="email"`, and a linked `<label for="userEmail">`.',
          hint: 'Use <label for="userEmail">Email</label><input type="email" id="userEmail" name="email" required>',
          validatorKeywords: ['<label', 'for="userEmail"', '<input', 'type="email"', 'id="userEmail"'],
          validatorRegex: '<label[^>]*for=[\'"]userEmail[\'"][^>]*>[\\s\\S]*?<\\/label>[\\s\\S]*?<input[^>]*type=[\'"]email[\'"][^>]*id=[\'"]userEmail[\'"][^>]*>'
        },
        {
          id: 'd5-t2',
          title: 'Add Submit Button',
          instruction: 'Add a `<button type="submit">Submit Form</button>`.',
          hint: 'Use <button type="submit">Submit Form</button>',
          validatorKeywords: ['<button', 'type="submit"', 'Submit Form', '</button>'],
          validatorRegex: '<button[^>]*type=[\'"]submit[\'"][^>]*>\\s*Submit Form\\s*<\\/button>'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Missing name Attribute on Inputs',
      buggyCode: `<form action="/login" method="POST">
  <input type="text" id="username">
  <input type="password" id="password">
  <button type="submit">Login</button>
</form>`,
      bugExplanation: 'When a form submits, the browser sends key-value pairs based on the `name` attribute. Without `name="username"` and `name="password"`, the submitted payload is completely EMPTY!',
      fixedCode: `<form action="/login" method="POST">
  <input type="text" id="username" name="username" required>
  <input type="password" id="password" name="password" required>
  <button type="submit">Login</button>
</form>`
    },
    assignment: {
      title: 'Homework Task: Comprehensive BCA Job Portal Form',
      fileName: 'job-apply.html',
      instructions: [
        'Build a job application form (`job-apply.html`).',
        'Include: Full Name, Email, Phone Number (`type="tel"`), Resume file upload (`type="file"`).',
        'Add radio buttons for Experience (Fresher, 1-2 Years, 3+ Years).',
        'Add checkboxes for Known Technologies (HTML, CSS, JavaScript, C, SQL).',
        'Add a `<textarea>` for Cover Letter.',
        'Mark all essential fields with the `required` attribute.'
      ],
      submissionCriteria: 'Test submitting the form in your browser with blank inputs to verify that native validation popups appear.',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Tech Job Portal - Application Form</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 25px; line-height: 1.6; max-width: 650px; margin: 0 auto; }
    fieldset { border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px 20px; margin-bottom: 20px; }
    legend { font-weight: bold; color: #0f172a; padding: 0 8px; }
    input[type="text"], input[type="email"], input[type="tel"], textarea, select { width: 100%; padding: 8px 12px; margin-top: 4px; border: 1px solid #94a3b8; border-radius: 6px; box-sizing: border-box; }
    button { padding: 10px 20px; font-weight: bold; border-radius: 6px; border: none; cursor: pointer; }
    button[type="submit"] { background-color: #2563eb; color: white; margin-right: 10px; }
    button[type="reset"] { background-color: #e2e8f0; color: #334155; }
  </style>
</head>
<body>
  <h1>Junior Software Engineer Application</h1>
  <p>Please complete all required fields below to submit your job profile.</p>

  <form action="/submit-job-application" method="POST" enctype="multipart/form-data">
    <fieldset>
      <legend>1. Personal & Contact Details</legend>
      <p>
        <label for="fullName">Full Legal Name *</label>
        <input type="text" id="fullName" name="fullName" placeholder="e.g. Pankaj Sharma" required minlength="3">
      </p>
      <p>
        <label for="email">Email Address *</label>
        <input type="email" id="email" name="email" placeholder="student@example.com" required>
      </p>
      <p>
        <label for="phone">Mobile Phone Number *</label>
        <input type="tel" id="phone" name="phone" placeholder="+91 98765 43210" pattern="[0-9+ -]{10,15}" required>
      </p>
      <p>
        <label for="resume">Upload Resume (PDF only) *</label><br>
        <input type="file" id="resume" name="resume" accept=".pdf" required>
      </p>
    </fieldset>

    <fieldset>
      <legend>2. Technical Background</legend>
      <p><strong>Professional Experience Level *</strong></p>
      <label><input type="radio" name="experience" value="fresher" required checked> Fresher (BCA Graduate)</label><br>
      <label><input type="radio" name="experience" value="1-2"> 1 - 2 Years Software Experience</label><br>
      <label><input type="radio" name="experience" value="3+"> 3+ Years Industry Experience</label>

      <p style="margin-top: 15px;"><strong>Core Technical Skills:</strong></p>
      <label><input type="checkbox" name="tech" value="html" checked> HTML5</label><br>
      <label><input type="checkbox" name="tech" value="css" checked> CSS3</label><br>
      <label><input type="checkbox" name="tech" value="js"> JavaScript (ES6+)</label><br>
      <label><input type="checkbox" name="tech" value="c"> C / C++ Systems</label><br>
      <label><input type="checkbox" name="tech" value="sql"> SQL & Relational Databases</label>

      <p style="margin-top: 15px;">
        <label for="coverLetter">Statement of Purpose / Cover Letter:</label>
        <textarea id="coverLetter" name="coverLetter" rows="4" placeholder="Highlight your academic projects and career objectives..."></textarea>
      </p>
    </fieldset>

    <p>
      <button type="submit">Submit Application 🚀</button>
      <button type="reset">Clear All Fields</button>
    </p>
  </form>
</body>
</html>`
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 05: Accessible forms, input types and native HTML5 validation',
      commands: [
        'git add .',
        'git commit -m "Day 05: Accessible forms, input types and native HTML5 validation"',
        'git push origin main'
      ],
      tips: 'Run `git status` before committing to verify which files are staged.'
    },
    vivaCheck: {
      question: 'What happens to form data when the form method is "GET"?',
      options: [
        'Form inputs are encapsulated inside the HTTP request body with multi-part stream encryption algorithms.',
        'Form values are appended visibly to the destination URL as key-value parameters in the query string.',
        'Form data is cached strictly in client localStorage and omitted entirely from the network request packet.',
        'The browser opens an asynchronous WebSocket connection to transmit field data in real-time binary chunks.'
      ],
      correctAnswer: 1,
      explanation: 'HTTP GET attaches form parameters directly into the URL as key-value query parameters, making it unsuitable for passwords and sensitive information.'
    }
  },

  /* ── DAY 6 ── */
  {
    id: 'day-6',
    day: 6,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'HTML Semantic Elements & Page Architecture',
    slug: 'day-6-html-semantic-elements-and-page-structure',
    category: 'HTML Foundation',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Beginner',
    objectives: [
      'Replace generic `<div>` soup with modern semantic tags.',
      'Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>`.',
      'Understand why semantic architecture improves SEO and accessibility (a11y).',
      'Construct a complete semantic page wireframe.',
      'Pass the 6-challenge HTML Semantic Coding Practical Concept Test with 100% mastery.'
    ],
    concept: {
      overview: 'Early web developers built entire layouts with hundreds of `<div class="nav">`, `<div class="main">` tags ("div soup"). HTML5 introduced semantic elements that clearly describe their meaning to both browser and developer.',
      keyPoints: [
        '<header> houses top branding, site title, and global search.',
        '<nav> is specifically designated for primary navigation link lists.',
        '<main> wraps the dominant, unique content of the page (only one per document).',
        '<article> represents self-contained content that makes sense if syndicated on its own.',
        '<section> groups related thematic content under a heading.',
        '<aside> houses sidebars, related links, or author bios.'
      ],
      analogy: 'Semantic tags are like labels on shipping boxes: "Fragile", "Books", "Kitchen". Without labels, all boxes look identical.'
    },
    teacherDemo: {
      title: 'Full Semantic Webpage Skeleton',
      explanation: 'Every piece of the page lives inside its appropriate semantic container.',
      language: 'html',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>BCA Tech Blog</title>
</head>
<body>
  <header>
    <h1>NextSem Developer Digest</h1>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#articles">Articles</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <h2>Roadmap to Becoming a Software Engineer</h2>
      <p>BCA provides a foundation, but hands-on projects build your career.</p>
    </article>
    <aside>
      <h3>Recommended Tools</h3>
      <p>VS Code, Git, Chrome DevTools.</p>
    </aside>
  </main>

  <footer>
    <p>© 2026 NextSem Academy. All rights reserved.</p>
  </footer>
</body>
</html>`
    },
    practicalLab: {
      labTitle: 'Day 6 Coding Lab: Semantic Magazine Layout',
      labDescription: 'Assemble a semantic layout using `<header>`, `<nav>`, `<main>`, `<article>`, and `<footer>`.',
      language: 'html',
      initialCode: `<body>
  <!-- Build semantic structure here -->
</body>`,
      tasks: [
        {
          id: 'd6-t1',
          title: 'Assemble Header with Navigation',
          instruction: 'Inside `<body>`, create a `<header>` containing a `<nav>` with at least one `<a>` link.',
          hint: '<header><nav><a href="#home">Home</a></nav></header>',
          validatorKeywords: ['<header>', '<nav>', '<a', '</nav>', '</header>'],
          validatorRegex: '<header>[\\s\\S]*?<nav>[\\s\\S]*?<a[^>]*>[\\s\\S]+?<\\/a>[\\s\\S]*?<\\/nav>[\\s\\S]*?<\\/header>'
        },
        {
          id: 'd6-t2',
          title: 'Add Main Container with Article & Footer',
          instruction: 'Below header, add a `<main>` containing an `<article>` with an `<h2>`, followed by a `<footer>`.',
          hint: '<main><article><h2>Title</h2><p>Text</p></article></main><footer><p>Footer</p></footer>',
          validatorKeywords: ['<main>', '<article>', '<h2>', '</h2>', '</article>', '</main>', '<footer>', '</footer>'],
          validatorRegex: '<main>[\\s\\S]*?<article>[\\s\\S]*?<h2[^>]*>[\\s\\S]+?<\\/h2>[\\s\\S]*?<\\/article>[\\s\\S]*?<\\/main>[\\s\\S]*?<footer>[\\s\\S]+?<\\/footer>'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Multiple <main> Elements',
      buggyCode: `<body>
  <main>
    <h1>Dashboard</h1>
  </main>
  <main>
    <h2>Sidebar Details</h2>
  </main>
  </body>`,
      bugExplanation: 'The HTML5 specification forbids having more than one visible `<main>` element per document. Main must contain the central unique content; the second element should be an `<aside>` or `<section>`.',
      fixedCode: `<body>
  <main>
    <h1>Dashboard</h1>
    <aside>
      <h2>Sidebar Details</h2>
    </aside>
  </main>
</body>`
    },
    assignment: {
      title: 'Homework Task: Semantic College Portal Homepage',
      fileName: 'college-portal.html',
      instructions: [
        'Create `college-portal.html` using 100% semantic tags.',
        'Header: College emblem image, site title, top navigation.',
        'Main: Feature Section with announcement banner; Department Articles for BCA, MCA, and B.Tech.',
        'Aside: Upcoming exam notices and university notification links.',
        'Footer: Address, contact info, and copyright.'
      ],
      submissionCriteria: 'Inspect document outline in the browser to ensure no `<div class="header">` or `<div class="footer">` hacks are present.',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>National Institute of Technology & Management - College Portal</title>
</head>
<body>

  <!-- 1. Semantic Site Header -->
  <header>
    <img src="https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=100&auto=format&fit=crop" alt="NITM College Emblem" width="80" height="80">
    <h1>National Institute of Technology &amp; Management</h1>
    <p>Affiliated to Central University &bull; NAAC Accredited 'A+' Grade</p>
    
    <!-- Top Primary Navigation -->
    <nav aria-label="Main Navigation">
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#departments">Departments</a></li>
        <li><a href="#admissions">Admissions</a></li>
        <li><a href="#notices">Notice Board</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <!-- 2. Primary Unique Document Body (Main) -->
  <main id="home">
    
    <!-- Feature Announcement Section -->
    <section id="announcements">
      <h2>Campus Announcements &amp; Highlights</h2>
      <p><strong>Spring 2026 Admissions Open:</strong> Applications are now invited for undergraduate and postgraduate computer science programs. Scholarship tests scheduled for this weekend.</p>
    </section>

    <!-- Academic Departments Section -->
    <section id="departments">
      <h2>Academic Departments</h2>

      <!-- Department 1: BCA -->
      <article id="bca">
        <header>
          <h3>Bachelor of Computer Applications (BCA)</h3>
          <p><strong>Duration:</strong> 3 Years (6 Semesters) | <strong>Degree Level:</strong> Undergraduate</p>
        </header>
        <p>Comprehensive curriculum covering full-stack web development, data structures &amp; algorithms in C/C++, cloud architecture, database systems, and industry capstone internships.</p>
        <footer>
          <p><em>Department Head: Prof. R. Sharma &bull; Enrolled Students: 240</em></p>
        </footer>
      </article>

      <!-- Department 2: MCA -->
      <article id="mca">
        <header>
          <h3>Master of Computer Applications (MCA)</h3>
          <p><strong>Duration:</strong> 2 Years (4 Semesters) | <strong>Degree Level:</strong> Postgraduate</p>
        </header>
        <p>Advanced engineering coursework specializing in Artificial Intelligence, Deep Learning, Cloud Microservices, Big Data Analytics, and enterprise-grade software research.</p>
        <footer>
          <p><em>Department Head: Dr. S. Kulkarni &bull; Research Labs: AI &amp; Cloud Systems</em></p>
        </footer>
      </article>

      <!-- Department 3: B.Tech Computer Science -->
      <article id="btech">
        <header>
          <h3>B.Tech in Computer Science &amp; Engineering (CSE)</h3>
          <p><strong>Duration:</strong> 4 Years (8 Semesters) | <strong>Degree Level:</strong> Engineering</p>
        </header>
        <p>Rigorous computer engineering focusing on compiler design, operating system internals, computer networking, cybersecurity, distributed systems, and real-time hardware interfaces.</p>
        <footer>
          <p><em>Department Head: Dr. V. Nair &bull; Industry Partners: Microsoft, Amazon, Google</em></p>
        </footer>
      </article>
    </section>

  </main>

  <!-- 3. Sidebar / Complementary Content (Aside) -->
  <aside id="notices" aria-label="Campus Notices & Quick Links">
    <section>
      <h3>📢 Upcoming University Notices</h3>
      <ul>
        <li><time datetime="2026-11-15">Nov 15, 2026</time> &mdash; BCA Semester 1 Practical Viva Voce Schedule released.</li>
        <li><time datetime="2026-11-20">Nov 20, 2026</time> &mdash; MCA Project synopsis submission portal deadline.</li>
        <li><time datetime="2026-11-28">Nov 28, 2026</time> &mdash; Annual Hackathon 2026 registration opens.</li>
      </ul>
    </section>

    <section>
      <h3>🔗 University Quick Links</h3>
      <ul>
        <li><a href="https://ignou.ac.in" target="_blank" rel="noopener noreferrer">Student University Portal</a></li>
        <li><a href="#exam-datesheet">Download Practical Date Sheet (PDF)</a></li>
        <li><a href="#hall-ticket">Semester Examination Hall Ticket</a></li>
        <li><a href="#grievance">Student Help Desk &amp; Grievance Cell</a></li>
      </ul>
    </section>
  </aside>

  <!-- 4. Semantic Site Footer -->
  <footer id="contact">
    <h2>National Institute of Technology &amp; Management</h2>
    <address>
      Knowledge City Campus, Tech Hub Road, Sector 62<br>
      New Delhi &ndash; 110001, India<br>
      Email: <a href="mailto:info@nitm-college.edu">info@nitm-college.edu</a> | Phone: <a href="tel:+911123456789">+91 (011) 2345-6789</a>
    </address>
    <p>&copy; 2026 National Institute of Technology &amp; Management. All rights reserved.</p>
    <p><small>Designed with 100% semantic HTML5 elements &bull; No legacy &lt;div&gt; wrapper hacks &bull; Author: Er. Manoj Kumar</small></p>
  </footer>

</body>
</html>`
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 06: Semantic page architecture replacing legacy div soup',
      commands: [
        'git add .',
        'git commit -m "Day 06: Semantic page architecture replacing legacy div soup"',
        'git push origin main'
      ],
      tips: 'Writing clean semantic HTML directly improves Google Lighthouse SEO & Accessibility scores.'
    },
    vivaCheck: {
      question: 'What is the primary difference between `<section>` and `<article>`?',
      options: [
        '<article> represents a self-contained, independently syndicatable composition; <section> is a thematic grouping.',
        '<section> defines standalone distributable content; <article> is strictly used for nesting sidebars and footnotes.',
        '<article> requires an enclosing aside container; <section> is exclusively permitted within main page landmarks.',
        '<section> auto-generates semantic RSS feeds; <article> serves purely as a visual CSS grid wrapper for typography.'
      ],
      correctAnswer: 0,
      explanation: 'An `<article>` is intended to be self-contained and independently distributable (e.g., newspaper story, widget, blog post). A `<section>` is a generic thematic grouping.'
    }
  },

  /* ── DAY 7 ── */
  {
    id: 'day-7',
    day: 7,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'HTML Mini Project — Student Developer Profile Website',
    slug: 'day-7-html-mini-project-student-profile-website',
    category: 'HTML Foundation',
    estimatedTime: '2.5 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Synthesize Days 1–6 into a complete, standalone portfolio webpage.',
      'Combine headings, paragraphs, lists, tables, images, links, forms, and semantic elements.',
      'Deploy the project on GitHub with a professional README.md file.',
      'Verify 100% HTML5 validation compliance.'
    ],
    concept: {
      overview: 'Projects convert isolated syntax lessons into engineering competence. In Day 7, you create your very first portfolio asset: an authentic, multi-section developer profile webpage.',
      keyPoints: [
        'A portfolio proves practical capability to evaluators and prospective employers.',
        'Pure HTML structure must be readable and organized even before CSS styles are applied.',
        'Every project must have a clear `README.md` file explaining what was built.',
        'Host the project on GitHub so anyone can review your source code.'
      ],
      analogy: 'This is your developer identity card. When someone asks "What have you built?", this is your first real answer.'
    },
    teacherDemo: {
      title: 'Blueprint: Complete Student Profile Structure',
      explanation: 'A full-page architecture incorporating all learned elements cleanly.',
      language: 'html',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Aarav Patel | BCA Student Developer</title>
</head>
<body>
  <header>
    <h1>Aarav Patel</h1>
    <p>Aspiring Full-Stack Software Developer • BCA 1st Year</p>
    <nav>
      <a href="#about">About</a> | 
      <a href="#skills">Skills</a> | 
      <a href="#education">Education</a> | 
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main>
    <section id="about">
      <h2>About Me</h2>
      <p>I am a BCA student passionate about <strong>practical software development</strong>.</p>
    </section>

    <section id="skills">
      <h2>Technical Skills</h2>
      <ul>
        <li>HTML5 & Semantic Markup</li>
        <li>Windows 11 Command Prompt</li>
        <li>Git & GitHub Version Control</li>
      </ul>
    </section>

    <section id="education">
      <h2>Academic Records</h2>
      <table border="1">
        <tr><th>Year</th><th>Degree</th><th>Institution</th></tr>
        <tr><td>2026</td><td>BCA (Sem 1)</td><td>NextSem Academy</td></tr>
      </table>
    </section>

    <section id="contact">
      <h2>Get In Touch</h2>
      <form action="/contact" method="POST">
        <label for="msg">Message:</label><br>
        <textarea id="msg" name="message" required></textarea><br>
        <button type="submit">Send Message</button>
      </form>
    </section>
  </main>

  <footer>
    <p>Built with pure HTML5 • Connect on <a href="https://github.com">GitHub</a></p>
  </footer>
</body>
</html>`
    },
    practicalLab: {
      labTitle: 'Day 7 Coding Lab: Assemble Your Profile Showcase',
      labDescription: 'Assemble the core sections of your profile: Header with name, About section, Skills list, and Contact form.',
      language: 'html',
      initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Developer Profile</title>
</head>
<body>
  <!-- Build complete profile here -->
</body>
</html>`,
      tasks: [
        {
          id: 'd7-t1',
          title: 'Header with Profile Info & Navigation',
          instruction: 'Add `<header>` containing `<h1>`, `<p>`, and a `<nav>` with at least two links.',
          hint: '<header><h1>Name</h1><p>Bio</p><nav><a href="#about">About</a> <a href="#contact">Contact</a></nav></header>',
          validatorKeywords: ['<header>', '<h1>', '</h1>', '<nav>', '</a>', '</header>'],
          validatorRegex: '<header>[\\s\\S]*?<h1>[\\s\\S]+?<\\/h1>[\\s\\S]*?<nav>[\\s\\S]*?<a[^>]*>[\\s\\S]+?<\\/a>[\\s\\S]*?<\\/nav>[\\s\\S]*?<\\/header>'
        },
        {
          id: 'd7-t2',
          title: 'Skills List & Contact Form',
          instruction: 'Inside `<main>`, add an `<ul>` list of skills and a `<form>` containing a submit button.',
          hint: '<main><section><ul><li>HTML5</li></ul></section><section><form><button type="submit">Send</button></form></section></main>',
          validatorKeywords: ['<main>', '<ul>', '<li>', '</li>', '</ul>', '<form>', '<button type="submit">', '</form>', '</main>'],
          validatorRegex: '<main>[\\s\\S]*?<ul>[\\s\\S]*?<li>[\\s\\S]+?<\\/li>[\\s\\S]*?<\\/ul>[\\s\\S]*?<form>[\\s\\S]*?<button[^>]*type=[\'"]submit[\'"][^>]*>[\\s\\S]+?<\\/button>[\\s\\S]*?<\\/form>[\\s\\S]*?<\\/main>'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Broken Bookmark Anchor Jumps',
      buggyCode: `<a href="about">Jump to About</a>
...
<section name="about">
  <h2>About Section</h2>
</section>`,
      bugExplanation: 'For internal anchor jumps, the href MUST begin with a hash symbol (`href="#about"`), and the target element must use `id="about"` instead of deprecated `name` attributes.',
      fixedCode: `<a href="#about">Jump to About</a>
...
<section id="about">
  <h2>About Section</h2>
</section>`
    },
    assignment: {
      title: 'Mini Project Milestone: Deploy to GitHub Repository',
      fileName: 'index.html',
      instructions: [
        'Create a new GitHub repository named `student-profile-html`.',
        'Place `index.html` and your profile image in the repository.',
        'Add a `README.md` file featuring: Project Title, Live Preview link, Built With (HTML5), and Author info.',
        'Enable GitHub Pages in your repository settings under Settings > Pages > Deploy from Branch.',
        'Test your live URL on your mobile phone.'
      ],
      submissionCriteria: 'Submit your live GitHub Pages link and repository URL.',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Student Developer Profile - Day 7 Milestone</title>
</head>
<body>
  <header>
    <h1>Er. Manoj Kumar</h1>
    <p>BCA First Year Student • Aspiring Software Engineer</p>
    <nav>
      <strong>Quick Links: </strong>
      <a href="#about">About</a> |
      <a href="#skills">Skills</a> |
      <a href="#projects">Projects</a> |
      <a href="#contact">Contact</a>
    </nav>
  </header>
  <hr>

  <main>
    <section id="about">
      <h2>About Me</h2>
      <p>I am undertaking the 90-Day BCA practical development journey at Nextsem Academy. My focus is writing semantic, accessible, standard-compliant software systems.</p>
      <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=250" alt="Student Profile Avatar" width="160">
    </section>

    <section id="skills">
      <h2>Technical Skillset</h2>
      <ul>
        <li>HTML5 Semantic Architecture & Form Validation</li>
        <li>Windows 11 Command Line Interface (CLI)</li>
        <li>Git Version Control & GitHub Pages Deployment</li>
        <li>C / C++ Programming Fundamentals</li>
      </ul>
    </section>

    <section id="projects">
      <h2>Featured Lab Exercises</h2>
      <ol>
        <li><strong>Day 1:</strong> Student Launch Page</li>
        <li><strong>Day 4:</strong> BCA Semester Syllabus Matrix Table</li>
        <li><strong>Day 5:</strong> Job Portal Application Form</li>
        <li><strong>Day 6:</strong> Semantic Academic College Portal</li>
      </ol>
    </section>

    <section id="contact">
      <h2>Connect & Collaborate</h2>
      <p>Explore my source code repositories on GitHub: <a href="https://github.com" target="_blank" rel="noopener noreferrer">https://github.com/my-bca-profile ↗</a></p>
    </section>
  </main>
  <hr>

  <footer>
    <p><small>&copy; 2026 Student Developer Profile. Built with 100% Pure HTML5. Hosted live via GitHub Pages.</small></p>
  </footer>
</body>
</html>`
    },
    githubWorkflow: {
      repoName: 'student-profile-html',
      commitMessage: 'Day 07: Complete HTML5 student developer profile project',
      commands: [
        'git init',
        'git add .',
        'git commit -m "Day 07: Complete HTML5 student developer profile project"',
        'git branch -M main',
        'git remote add origin https://github.com/YOUR_USERNAME/student-profile-html.git',
        'git push -u origin main'
      ],
      tips: 'Congratulations! This is your first official GitHub project repository. Keep it clean and documented.'
    },
    vivaCheck: {
      question: 'What is the purpose of the `README.md` file in a GitHub project repository?',
      options: [
        'It executes automated cloud database migrations and unit test suites upon code commit to main branch.',
        'It introduces project architecture, local installation steps, and developer credentials to visitors.',
        'It stores encrypted production environment variables and API secret keys securely in the Git index.',
        'It acts as a compiled binary cache that accelerates GitHub Pages static asset bundling workflows.'
      ],
      correctAnswer: 1,
      explanation: 'A professional README.md acts as the welcome documentation of a repository, explaining project purpose, installation steps, and showcase links.'
    }
  },

  /* ── DAY 8 ── */
  {
    id: 'day-8',
    day: 8,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'CSS Introduction & Connecting CSS to HTML',
    slug: 'day-8-css-introduction-and-connecting-css',
    category: 'CSS Foundation',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Beginner',
    objectives: [
      'Understand the role of CSS (Cascading Style Sheets).',
      'Compare the 3 ways to add CSS: Inline, Internal (<style>), and External (<link>).',
      'Master the syntax of CSS rule sets: Selector, Property, Value.',
      'Link an external `style.css` file properly to your HTML head.'
    ],
    concept: {
      overview: 'CSS styles and paints your HTML skeleton. While HTML defines meaning and structure, CSS controls colors, layouts, typography, responsiveness, and visual polish.',
      keyPoints: [
        'Inline CSS (`style="..."`) is strongly discouraged because it clutters HTML and violates separation of concerns.',
        'Internal CSS (`<style>` in `<head>`) is suitable for single-page experiments.',
        'External CSS (`<link rel="stylesheet" href="style.css">`) is the industry standard for production websites.',
        'A CSS declaration consists of `property: value;` enclosed in curly braces `{}`.'
      ],
      analogy: 'If HTML is the human skeleton, CSS is the skin, clothes, hairstyle, and shoes.'
    },
    teacherDemo: {
      title: 'Connecting External CSS to HTML',
      explanation: 'Notice how the link tag pulls styles from an external file cleanly.',
      language: 'html',
      code: `<!-- Inside index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CSS Connection Demo</title>
  <!-- Standard External Stylesheet Link -->
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>NextSem CSS Mastery</h1>
  <p>This text is styled via an external stylesheet.</p>
</body>
</html>`
    },
    practicalLab: {
      labTitle: 'Day 8 Coding Lab: Connect Styles to HTML',
      labDescription: 'Link an external stylesheet via `<link>` and write your first internal style rules.',
      language: 'html',
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <!-- Add link to style.css and style block here -->
</head>
<body>
  <h1>Hello CSS</h1>
</body>
</html>`,
      tasks: [
        {
          id: 'd8-t1',
          title: 'Add External Stylesheet Link',
          instruction: 'Inside `<head>`, add a `<link>` tag with `rel="stylesheet"` and `href="style.css"`.',
          hint: '<link rel="stylesheet" href="style.css">',
          validatorKeywords: ['<link', 'rel="stylesheet"', 'href="style.css"'],
          validatorRegex: '<link[^>]*rel=[\'"]stylesheet[\'"][^>]*href=[\'"]style\\.css[\'"][^>]*>'
        },
        {
          id: 'd8-t2',
          title: 'Add Internal <style> Block',
          instruction: 'Inside `<head>`, add a `<style>` block setting `h1 { color: #04AA6D; }`.',
          hint: '<style>h1 { color: #04AA6D; }</style>',
          validatorKeywords: ['<style>', 'h1', 'color:', '</style>'],
          validatorRegex: '<style>[\\s\\S]*?h1[\\s\\S]*?\\{[\\s\\S]*?color:[\\s\\S]*?\\}[\\s\\S]*?<\\/style>'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Broken External Link Tag',
      buggyCode: `<link src="style.css" type="css">`,
      bugExplanation: '`<link>` tags do NOT use `src`! They use `href` to target stylesheets and `rel="stylesheet"` to declare the relationship. Without these, the browser ignores the file completely.',
      fixedCode: `<link rel="stylesheet" href="style.css">`
    },
    assignment: {
      title: 'Homework Task: Create Dedicated style.css File',
      fileName: 'style.css',
      instructions: [
        'Open your Day 7 project or create a new folder `bca-day-8`.',
        'Create `index.html` and `style.css` side-by-side.',
        'Link `style.css` in `index.html`.',
        'In `style.css`, reset body margin to 0 and set default font-family to sans-serif.',
        'Change heading colors to `#0c1328` and paragraph line-height to 1.6.'
      ],
      submissionCriteria: 'Confirm in Chrome DevTools Network tab (F12) that `style.css` returns HTTP Status 200.',
      solutionCode: `/* ── style.css (Dedicated Stylesheet) ── */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background-color: #f8fafc;
  color: #334155;
  line-height: 1.6;
  padding: 30px 20px;
}

.container {
  max-width: 650px;
  margin: 0 auto;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

h1 {
  color: #0c1328;
  font-size: 26px;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

p {
  margin-bottom: 16px;
  font-size: 15px;
}

/* ── index.html (Linked Document) ──
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Day 8 - External Stylesheet</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>External CSS Architecture</h1>
    <p>This document links to a dedicated style.css file using the standard link tag.</p>
  </div>
</body>
</html>
*/`
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 08: External CSS integration and stylesheet architecture',
      commands: [
        'git add .',
        'git commit -m "Day 08: External CSS integration and stylesheet architecture"',
        'git push origin main'
      ],
      tips: 'Keep HTML files and CSS files in clean directory structures (e.g. `css/style.css`).'
    },
    vivaCheck: {
      question: 'Which method of applying CSS has the highest specificity/precedence by default?',
      options: [
        'External stylesheets linked via <link rel="stylesheet"> declared inside the HTML head section.',
        'Internal stylesheet rules declared inside <style> tags located within the document head element.',
        'Inline styles applied directly to an individual HTML element via the style="..." attribute.',
        'Browser default user-agent styling sheets applied automatically prior to CSSOM parsing.'
      ],
      correctAnswer: 2,
      explanation: 'Inline styles have a specificity weight of (1,0,0,0), overriding external and internal style rules unless `!important` is used.'
    }
  },

  /* ── DAY 9 ── */
  {
    id: 'day-9',
    day: 9,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'CSS Selectors & Basic Styling',
    slug: 'day-9-css-selectors-and-basic-styling',
    category: 'CSS Foundation',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Beginner',
    objectives: [
      'Master element/type selectors, class selectors (`.class`), and ID selectors (`#id`).',
      'Understand selector specificity and inheritance.',
      'Use descendant selectors (`div p`) and grouping selectors (`h1, h2, h3`).',
      'Apply hover pseudo-classes (`:hover`, `:active`, `:focus`).'
    ],
    concept: {
      overview: 'CSS Selectors dictate WHICH HTML elements your style rules target. Mastering selectors gives you pinpoint control over styling without writing redundant code.',
      keyPoints: [
        'Element selectors target every instance of an HTML tag (e.g. `p { ... }`).',
        'Class selectors (`.badge`) can be reused across any number of elements.',
        'ID selectors (`#navbar`) target a single unique element on the page.',
        'Pseudo-classes like `:hover` style elements based on user interaction states.'
      ],
      analogy: 'Selectors are like search filters. Element is "everyone wearing a shirt", class is "everyone on Team Blue", and ID is "Rahul Sharma specifically".'
    },
    teacherDemo: {
      title: 'Class vs ID vs Pseudo-Class Styles',
      explanation: 'See how classes enable modular, reusable styling.',
      language: 'css',
      code: `/* Element Selector */
body {
  font-family: Arial, sans-serif;
  color: #333333;
}

/* Reusable Class Selector */
.btn-primary {
  background-color: #04AA6D;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.2s ease;
}

/* Interactive Hover State */
.btn-primary:hover {
  background-color: #038a58;
}

/* Unique ID Selector */
#main-header {
  border-bottom: 2px solid #e2e8f0;
  padding: 16px 0;
}`
    },
    practicalLab: {
      labTitle: 'Day 9 Coding Lab: Card Styling with Classes',
      labDescription: 'Apply a class named `.card` to style a container and style a button with a hover effect.',
      language: 'html',
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    /* Add .card and .card:hover styles here */
  </style>
</head>
<body>
  <div class="card">
    <h2>Specialization Course</h2>
    <p>Learn Full Stack Web Development.</p>
  </div>
</body>
</html>`,
      tasks: [
        {
          id: 'd9-t1',
          title: 'Style the .card Class',
          instruction: 'In the `<style>` block, create a `.card` rule setting `padding: 20px;` and `background-color: #0c1328;`.',
          hint: '.card { padding: 20px; background-color: #0c1328; }',
          validatorKeywords: ['.card', 'padding:', 'background-color:'],
          validatorRegex: '\\.card[\\s\\S]*?\\{[\\s\\S]*?padding:[\\s\\S]*?background-color:[\\s\\S]*?\\}'
        },
        {
          id: 'd9-t2',
          title: 'Add Hover State',
          instruction: 'Add a `.card:hover` rule setting a different border or background.',
          hint: '.card:hover { border: 1px solid #04AA6D; }',
          validatorKeywords: ['.card:hover', '{', '}'],
          validatorRegex: '\\.card:hover[\\s\\S]*?\\{[\\s\\S]+?\\}'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Confusing Dot and Hash in Selectors',
      buggyCode: `/* Trying to style <button id="submitBtn" class="btn"> */
#btn {
  color: red;
}
.submitBtn {
  background: blue;
}`,
      bugExplanation: 'Dots (`.`) are for CLASSES, and hashes (`#`) are for IDs! The developer inverted them. The selector should be `#submitBtn` and `.btn`.',
      fixedCode: `.btn {
  color: red;
}
#submitBtn {
  background: blue;
}`
    },
    assignment: {
      title: 'Homework Task: Component Library Card Sheet',
      fileName: 'component-library.html',
      instructions: [
        'Create a webpage demonstrating 4 reusable button variants using classes:',
        '`.btn-success` (Green background), `.btn-danger` (Red background), `.btn-warning` (Amber background), and `.btn-outline` (Transparent with border).',
        'Add smooth `:hover` transition effects to all buttons.',
        'Use grouping selectors (`.btn-success, .btn-danger, ...`) for shared padding and font styles.'
      ],
      submissionCriteria: 'Ensure all buttons use shared classes to prevent repeating code (DRY - Don’t Repeat Yourself).',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Day 9 - Reusable Button Component Library</title>
  <style>
    /* Reset & Page Background */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #0b1120;
      color: #f8fafc;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }

    /* Container Card Sheet */
    .card-sheet {
      background-color: #1e293b;
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 32px;
      max-width: 650px;
      width: 100%;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
    }

    .card-sheet h1 {
      font-size: 24px;
      margin-bottom: 8px;
      color: #38bdf8;
    }

    .card-sheet p {
      font-size: 14px;
      color: #94a3b8;
      margin-bottom: 24px;
      line-height: 1.6;
    }

    .button-group {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 24px;
    }

    /* DRY Principle: Shared Button Base Styles via Grouping Selector */
    .btn,
    .btn-success,
    .btn-danger,
    .btn-warning,
    .btn-outline {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 12px 22px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      text-decoration: none;
      border: 2px solid transparent;
      transition: all 0.25s ease-in-out;
      outline: none;
    }

    /* 1. Success Variant (Green background) */
    .btn-success {
      background-color: #16a34a;
      color: #ffffff;
      border-color: #16a34a;
    }
    .btn-success:hover {
      background-color: #15803d;
      border-color: #15803d;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(22, 163, 74, 0.4);
    }

    /* 2. Danger Variant (Red background) */
    .btn-danger {
      background-color: #dc2626;
      color: #ffffff;
      border-color: #dc2626;
    }
    .btn-danger:hover {
      background-color: #b91c1c;
      border-color: #b91c1c;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
    }

    /* 3. Warning Variant (Amber background) */
    .btn-warning {
      background-color: #f59e0b;
      color: #0f172a;
      border-color: #f59e0b;
    }
    .btn-warning:hover {
      background-color: #d97706;
      border-color: #d97706;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
    }

    /* 4. Outline Variant (Transparent with border) */
    .btn-outline {
      background-color: transparent;
      color: #38bdf8;
      border-color: #38bdf8;
    }
    .btn-outline:hover {
      background-color: #38bdf8;
      color: #0b1120;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(56, 189, 248, 0.4);
    }

    /* Active click effect for all button variants */
    .btn-success:active,
    .btn-danger:active,
    .btn-warning:active,
    .btn-outline:active {
      transform: translateY(0);
      box-shadow: none;
    }

    /* Architecture explanation callout */
    .code-note {
      background-color: #0f172a;
      border-left: 4px solid #38bdf8;
      padding: 14px 18px;
      font-size: 13px;
      color: #cbd5e1;
      border-radius: 6px;
      line-height: 1.5;
    }
  </style>
</head>
<body>

  <main class="card-sheet">
    <h1>🎨 Component Library: Button Variants</h1>
    <p>Demonstrating reusable button classes built with CSS grouping selectors, pseudo-classes (<code>:hover</code>, <code>:active</code>), and the DRY principle.</p>

    <div class="button-group">
      <button type="button" class="btn-success">✔ Save Changes</button>
      <button type="button" class="btn-danger">✖ Delete Account</button>
      <button type="button" class="btn-warning">⚠ Warning Alert</button>
      <button type="button" class="btn-outline">🔍 View Details</button>
    </div>

    <div class="code-note">
      <strong>DRY Architecture Note:</strong> Common properties (<code>padding</code>, <code>font-size</code>, <code>border-radius</code>, <code>transition</code>, <code>cursor</code>) are declared once using grouping selectors. Each variant only overrides colors and shadow effects.
    </div>
  </main>

</body>
</html>`
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 09: CSS selectors hierarchy and reusable UI component classes',
      commands: [
        'git add .',
        'git commit -m "Day 09: CSS selectors hierarchy and reusable UI component classes"',
        'git push origin main'
      ],
      tips: 'Organize your styles with comments separating base styles, layout, and component classes.'
    },
    vivaCheck: {
      question: 'Which of the following selectors has the highest CSS specificity value?',
      options: [
        '#profile-header (ID selector with specificity weight 0,1,0,0)',
        '.navbar .nav-link (Two class selectors with weight 0,0,2,0)',
        'div.card (Element plus class selector with weight 0,0,1,1)',
        'div > ul > li (Three element tag selectors with specificity weight 0,0,0,3)'
      ],
      correctAnswer: 0,
      explanation: 'An ID selector has specificity (0,1,0,0), which overrides any number of classes (0,0,x,0) and element selectors (0,0,0,x).'
    }
  },

  /* ── DAY 10 ── */
  {
    id: 'day-10',
    day: 10,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'CSS Colors, Fonts & Text Styling',
    slug: 'day-10-css-colors-fonts-and-text-styling',
    category: 'CSS Foundation',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Beginner',
    objectives: [
      'Understand color representations: Hex codes (`#04AA6D`), RGB/RGBA (`rgba(0,0,0,0.5)`), and HSL.',
      'Import Google Fonts (@import or <link>) into web documents.',
      'Control typography: `font-size`, `font-weight`, `line-height`, `letter-spacing`.',
      'Format text layouts with `text-align`, `text-transform`, and `text-decoration`.'
    ],
    concept: {
      overview: 'Typography and curated color harmony dictate 90% of user trust and perception on a website. Modern web apps use tailored HSL/Hex color palettes and crisp web fonts instead of generic browser defaults.',
      keyPoints: [
        'Hex codes (`#ffffff`) represent red, green, and blue hex channels (00 to FF).',
        'RGBA adds an Alpha channel (0.0 to 1.0) for transparent overlays and glassmorphism.',
        'Always provide fallback font families (e.g., `font-family: "Inter", sans-serif;`).',
        'Maintain a readable `line-height` of at least 1.5 to 1.6 for body paragraphs.'
      ],
      analogy: 'Colors set the emotional mood of your room, while fonts are the voice tone in which your website speaks.'
    },
    teacherDemo: {
      title: 'Modern Typography & Google Font Integration',
      explanation: 'Notice how importing the Inter font transforms the visual elegance immediately.',
      language: 'css',
      code: `/* Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: #060c18;
  color: #f1f5f9;
  line-height: 1.6;
}

h1 {
  color: #ffffff;
  font-size: 2.25rem; /* 36px */
  font-weight: 800;
  letter-spacing: -0.025em;
}

.text-accent {
  color: #04AA6D;
  font-weight: 600;
}

.subtitle {
  color: #94a3b8;
  font-size: 1.125rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
} `
    },
    practicalLab: {
      labTitle: 'Day 10 Coding Lab: High-Contrast Dark Mode Card',
      labDescription: 'Style a dark-mode content showcase card with curated colors, line height, and font weights.',
      language: 'html',
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    /* Write typography and color styles here */
  </style>
</head>
<body>
  <div class="promo-box">
    <h1>NextSem Developer Pro</h1>
    <p class="desc">Build real-world production projects every day.</p>
  </div>
</body>
</html>`,
      tasks: [
        {
          id: 'd10-t1',
          title: 'Set Dark Background & Crisp Text Color',
          instruction: 'In `<style>`, set `.promo-box` with `background-color: #0c1328;` and `color: #ffffff;`.',
          hint: '.promo-box { background-color: #0c1328; color: #ffffff; padding: 24px; }',
          validatorKeywords: ['.promo-box', 'background-color:', '#0c1328', 'color:', '#ffffff'],
          validatorRegex: '\\.promo-box[\\s\\S]*?\\{[\\s\\S]*?background-color:\\s*#0c1328[\\s\\S]*?color:\\s*#ffffff[\\s\\S]*?\\}'
        },
        {
          id: 'd10-t2',
          title: 'Configure Line-Height & Letter-Spacing',
          instruction: 'Add a `.desc` rule setting `line-height: 1.6;` and `color: #94a3b8;`.',
          hint: '.desc { line-height: 1.6; color: #94a3b8; }',
          validatorKeywords: ['.desc', 'line-height:', '1.6'],
          validatorRegex: '\\.desc[\\s\\S]*?\\{[\\s\\S]*?line-height:\\s*1\\.6[\\s\\S]*?\\}'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Font Name with Spaces Missing Quotes',
      buggyCode: `body {
  font-family: Open Sans, sans-serif;
}`,
      bugExplanation: 'Font family names containing whitespace (e.g. `Open Sans`, `Courier New`) MUST be wrapped in quotation marks. Otherwise, some browsers will fail to parse the font declaration.',
      fixedCode: `body {
  font-family: "Open Sans", sans-serif;
}`
    },
    assignment: {
      title: 'Homework Task: Themed Tech Article Layout',
      fileName: 'themed-article.html',
      instructions: [
        'Import a Google Font of your choice (e.g., "Outfit", "Poppins", or "Inter").',
        'Create a dark-themed blog article with a curated color palette: Background `#060c18`, Surface Card `#0c1328`, Primary Text `#ffffff`, Accent `#04AA6D`, Muted `#94a3b8`.',
        'Apply `line-height: 1.7` to paragraphs to ensure optimal readability.',
        'Add a call-out quote block with an italic font and an emerald green left border.'
      ],
      submissionCriteria: 'Verify that your color contrast ratio passes WCAG AA accessibility standards.',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Day 10 - Themed Tech Article Layout</title>
  <!-- Google Font: Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: #060c18;
      color: #ffffff;
      padding: 40px 20px;
      line-height: 1.7;
    }
    .article-container {
      max-width: 680px;
      margin: 0 auto;
      background-color: #0c1328;
      border: 1px solid #1e293b;
      border-radius: 16px;
      padding: 36px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
    }
    .tag {
      display: inline-block;
      color: #04AA6D;
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      margin-bottom: 8px;
    }
    h1 {
      font-size: 28px;
      font-weight: 800;
      margin-bottom: 16px;
      color: #ffffff;
      line-height: 1.3;
    }
    p {
      color: #cbd5e1;
      margin-bottom: 20px;
      font-size: 15px;
    }
    blockquote {
      border-left: 4px solid #04AA6D;
      background-color: rgba(4, 170, 109, 0.08);
      padding: 16px 20px;
      margin: 24px 0;
      border-radius: 0 8px 8px 0;
      font-style: italic;
      color: #94a3b8;
    }
    footer {
      border-top: 1px solid #1e293b;
      padding-top: 16px;
      margin-top: 24px;
      font-size: 13px;
      color: #64748b;
    }
  </style>
</head>
<body>

  <article class="article-container">
    <span class="tag">Web Design & Architecture</span>
    <h1>Building Accessible Modern Dark Themes</h1>
    <p>Good typography and color harmony make software interfaces comfortable to read for hours. By pairing high-contrast pure white headers with subtle dark navy surfaces and emerald accents, developers can create stunning visual experiences.</p>
    
    <blockquote>
      "Design is not just what it looks like and feels like. Design is how it works." — Steve Jobs
    </blockquote>

    <p>This layout adheres to WCAG AA color contrast standards, ensuring clarity and readability across all desktop and mobile screens.</p>

    <footer>
      <p>&copy; 2026 BCA Practical Day 10 • Completed 100% in Visual Studio Code</p>
    </footer>
  </article>

</body>
</html>`
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 10: Google Fonts typography, dark theme color harmony and text metrics',
      commands: [
        'git add .',
        'git commit -m "Day 10: Google Fonts typography, dark theme color harmony and text metrics"',
        'git push origin main'
      ],
      tips: 'You have completed the first 10 days of your 3-Year (360-Day) practical journey! Inspect your GitHub repository to celebrate your 10 commits.'
    },
    vivaCheck: {
      question: 'What does the fourth value in `rgba(4, 170, 109, 0.5)` represent?',
      options: [
        'The alpha channel controlling color opacity and transparency, ranging from 0.0 (transparent) to 1.0 (opaque).',
        'The ambient color temperature offset shifting the RGB spectrum between warm amber and cool cyan tint hues.',
        'The saturation intensity percentage amplifying pigment vibrancy without altering underlying luminance values.',
        'The luminance threshold defining minimum WCAG contrast ratios against adjacent background DOM elements.'
      ],
      correctAnswer: 0,
      explanation: 'The `a` in RGBA stands for Alpha, which controls the opacity of the color from 0.0 (100% transparent) to 1.0 (100% solid).'
    }
  },

  /* ── DAY 11 ── */
  {
    id: 'day-11',
    day: 11,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'CSS Box Model: Margin, Border, Padding & Content',
    slug: 'day-11-css-box-model-margin-border-padding-content',
    category: 'CSS Layouts',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Beginner',
    objectives: [
      'Understand the 4 layers of the CSS Box Model: Content, Padding, Border, Margin.',
      'Differentiate between `box-sizing: content-box` and `box-sizing: border-box`.',
      'Understand margin collapse behavior on vertical adjacent blocks.',
      'Apply universal box-sizing reset `* { box-sizing: border-box; }` across all projects.'
    ],
    concept: {
      overview: 'Every visible element in the browser viewport is a rectangular box. The Box Model dictates how width, padding, borders, and margins calculate final rendered dimensions on screen.',
      keyPoints: [
        'Content: The raw text, image, or video nested inside the element.',
        'Padding: Clears space INSIDE the border, around the content. Inherits background color.',
        'Border: The boundary line encasing the padding and content.',
        'Margin: Clears space OUTSIDE the border, separating the element from neighboring elements.',
        'box-sizing: border-box ensures padding and borders DO NOT expand the total element width.'
      ],
      analogy: 'Think of a picture frame: The photo is Content, the white cardboard matting is Padding, the wooden frame is Border, and the wall space between adjacent frames is Margin.'
    },
    teacherDemo: {
      title: 'Comparing content-box vs border-box',
      explanation: 'Notice how border-box keeps the element width exactly 300px without spilling over.',
      language: 'html',
      code: `<style>
  .box-standard {
    width: 300px;
    padding: 24px;
    border: 4px solid #2563eb;
    margin-bottom: 20px;
    box-sizing: border-box;
    background: #f8fafc;
  }
</style>
<div class="box-standard">
  <h3>Card with border-box</h3>
  <p>Total width stays exactly 300px on screen.</p>
</div>`
    },
    practicalLab: {
      labTitle: 'Day 11 Coding Lab: Precision Box Model Card',
      labDescription: 'Configure a card with 20px padding, a 2px solid border, 16px bottom margin, and border-box sizing.',
      language: 'html',
      initialCode: `<style>
  .profile-card {
    width: 280px;
    /* Add padding, border, margin, and box-sizing below */
    background: #ffffff;
  }
</style>
<div class="profile-card">
  <h2>Er. Manoj Kumar</h2>
  <p>BCA Curriculum Architect & Software Engineer</p>
</div>`,
      tasks: [
        {
          id: 'd11-t1',
          title: 'Add Padding and Border-Box',
          instruction: 'Add `padding: 20px;` and `box-sizing: border-box;` to .profile-card.',
          hint: 'Include padding: 20px; box-sizing: border-box; inside the .profile-card CSS rule.',
          validatorKeywords: ['padding:', 'box-sizing:', 'border-box'],
          validatorRegex: 'padding:\s*20px[\s\S]*?box-sizing:\s*border-box'
        },
        {
          id: 'd11-t2',
          title: 'Add Border and Margin',
          instruction: 'Add a `border: 2px solid #2563eb;` and `margin-bottom: 16px;`.',
          hint: 'Write border: 2px solid #2563eb; and margin-bottom: 16px;.',
          validatorKeywords: ['border:', 'margin-bottom:'],
          validatorRegex: 'border:\s*2px\s+solid[\s\S]*?margin-bottom:\s*16px'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Card Overflowing Container Due to content-box',
      buggyCode: `.container {
  width: 500px;
}
.sidebar {
  width: 500px;
  padding: 30px;
  border: 5px solid red;
  /* Missing box-sizing causes total width to become 570px! */
}`,
      bugExplanation: 'With default content-box, total width = 500 + 30*2 (padding) + 5*2 (border) = 570px, which breaks and overflows the 500px container!',
      fixedCode: `.sidebar {
  width: 500px;
  padding: 30px;
  border: 5px solid red;
  box-sizing: border-box; /* Total width is clamped strictly to 500px */
}`
    },
    assignment: {
      title: 'Homework Task: Notification Alert Cards',
      instructions: [
        'Create a folder named `day-11` in your repository.',
        'Create an `index.html` file and define a universal reset `* { box-sizing: border-box; margin: 0; padding: 0; }`.',
        'Build 3 alert cards: Success (green border), Warning (amber border), and Error (rose border).',
        'Give each card `padding: 18px;`, `margin: 12px 0;`, and a rounded border of `border-radius: 12px;`.'
      ],
      submissionCriteria: 'Inspect elements in Chrome DevTools Box Model visualizer to verify margin, border, padding.'
,
      fileName: 'alert-cards.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Day 11 - CSS Box Model Notification Cards</title>
  <style>
    /* 1. Universal Box-Sizing Reset */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #0b1120;
      color: #f8fafc;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px;
    }

    .container {
      max-width: 580px;
      width: 100%;
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 20px;
      padding: 32px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
    }

    h1 {
      font-size: 22px;
      margin-bottom: 8px;
      color: #38bdf8;
    }

    .subtitle {
      font-size: 13px;
      color: #94a3b8;
      margin-bottom: 24px;
    }

    /* 2. Base Alert Box Model Card */
    .alert-card {
      padding: 18px 20px;
      margin: 14px 0;
      border-radius: 12px;
      border-left: 5px solid;
      background-color: #0f172a;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .alert-card:hover {
      transform: translateX(4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    }

    .alert-card h3 {
      font-size: 15px;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .alert-card p {
      font-size: 13px;
      color: #cbd5e1;
      line-height: 1.5;
    }

    /* 3. Status Variants */
    .alert-success {
      border-left-color: #10b981;
      background: rgba(16, 185, 129, 0.08);
      border-top: 1px solid rgba(16, 185, 129, 0.2);
      border-right: 1px solid rgba(16, 185, 129, 0.2);
      border-bottom: 1px solid rgba(16, 185, 129, 0.2);
    }
    .alert-success h3 { color: #34d399; }

    .alert-warning {
      border-left-color: #f59e0b;
      background: rgba(245, 158, 11, 0.08);
      border-top: 1px solid rgba(245, 158, 11, 0.2);
      border-right: 1px solid rgba(245, 158, 11, 0.2);
      border-bottom: 1px solid rgba(245, 158, 11, 0.2);
    }
    .alert-warning h3 { color: #fbbf24; }

    .alert-error {
      border-left-color: #ef4444;
      background: rgba(239, 68, 68, 0.08);
      border-top: 1px solid rgba(239, 68, 68, 0.2);
      border-right: 1px solid rgba(239, 68, 68, 0.2);
      border-bottom: 1px solid rgba(239, 68, 68, 0.2);
    }
    .alert-error h3 { color: #f87171; }
  </style>
</head>
<body>

  <div class="container">
    <h1>BCA Practical Alert System</h1>
    <p class="subtitle">Demonstrating CSS Box Model: padding (inside), border-box sizing, and margin (outside spacing).</p>

    <!-- Success Alert -->
    <div class="alert-card alert-success">
      <h3>✓ Practical Lab Approved</h3>
      <p>Your Day 11 practical code has passed the technical validation suite with 100% score.</p>
    </div>

    <!-- Warning Alert -->
    <div class="alert-card alert-warning">
      <h3>⚠ Unpushed Git Commits</h3>
      <p>You have 2 local commits. Run git push origin main to synchronize your GitHub profile.</p>
    </div>

    <!-- Error Alert -->
    <div class="alert-card alert-error">
      <h3>✕ Missing CSS Reset</h3>
      <p>Always verify * { box-sizing: border-box; } is loaded to prevent horizontal scrollbars.</p>
    </div>
  </div>

</body>
</html>`    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 11: CSS Box Model, border-box dimensions and margin spacing',
      commands: [
        'mkdir day-11',
        'cd day-11',
        'git add .',
        'git commit -m "Day 11: CSS Box Model, border-box dimensions and margin spacing"',
        'git push origin main'
      ],
      tips: 'Always use border-box in modern frontend web development to eliminate accidental overflow horizontal scrollbars.'
    },
    vivaCheck: {
      question: 'What is the default value of the CSS `box-sizing` property if unspecified?',
      options: [
        'border-box',
        'content-box',
        'padding-box',
        'margin-box'
      ],
      correctAnswer: 1,
      explanation: 'The browser default is content-box, where padding and borders add onto the specified width/height rather than being absorbed inside it.'
    }
  },

  /* ── DAY 12 ── */
  {
    id: 'day-12',
    day: 12,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'CSS Display Property: Block, Inline, Inline-Block & None',
    slug: 'day-12-css-display-block-inline-inline-block-none',
    category: 'CSS Layouts',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Beginner',
    objectives: [
      'Master block-level vs inline-level element behavior in normal document flow.',
      'Understand why inline elements ignore top/bottom margin and explicit height/width.',
      'Use `inline-block` to create multi-item button bars and inline tags.',
      'Contrast `display: none` (removes element from layout flow) vs `visibility: hidden` (leaves invisible blank space).'
    ],
    concept: {
      overview: 'The `display` property is the fundamental switch controlling how an element participates in CSS formatting contexts.',
      keyPoints: [
        'block: Starts on a new line and stretches across full available container width (e.g. <div>, <h1>, <p>).',
        'inline: Does not start on a new line; only occupies space needed for its content. Width and height properties have NO effect.',
        'inline-block: Sits in a line with surrounding text, but respects width, height, padding, and vertical margins.',
        'display: none completely removes the element from rendering tree (zero layout footprint).'
      ],
      analogy: 'Block is like a full-width parking spot for a bus. Inline is like words flowing on a typed line. Inline-block is like a picture stamp glued right inside a sentence.'
    },
    teacherDemo: {
      title: 'Horizontal Button Bar with inline-block',
      explanation: 'Converting list items into interactive inline-block pill buttons.',
      language: 'html',
      code: `<style>
  .tag-item {
    display: inline-block;
    padding: 8px 16px;
    background: #000000;
    color: #ffffff;
    border-radius: 20px;
    margin-right: 8px;
    font-size: 13px;
    font-weight: bold;
  }
</style>
<span class="tag-item">HTML5</span>
<span class="tag-item">CSS3</span>
<span class="tag-item">JavaScript</span>`
    },
    practicalLab: {
      labTitle: 'Day 12 Coding Lab: Inline-Block Navigation Buttons',
      labDescription: 'Transform anchor links into pill buttons by setting display to inline-block with padding and border.',
      language: 'html',
      initialCode: `<style>
  .btn-link {
    /* Set display to inline-block, add padding and rounded corners */
    text-decoration: none;
    color: #2563eb;
    border: 2px solid #2563eb;
  }
</style>
<nav>
  <a href="#" class="btn-link">Home</a>
  <a href="#" class="btn-link">BCA Portal</a>
  <a href="#" class="btn-link">Practicals</a>
</nav>`,
      tasks: [
        {
          id: 'd12-t1',
          title: 'Apply display: inline-block',
          instruction: 'Add `display: inline-block;` to .btn-link.',
          hint: 'Write display: inline-block; inside .btn-link.',
          validatorKeywords: ['display:', 'inline-block'],
          validatorRegex: 'display:\s*inline-block'
        },
        {
          id: 'd12-t2',
          title: 'Add Padding and Margin',
          instruction: 'Add `padding: 8px 18px;` and `margin-right: 10px;`.',
          hint: 'Include padding: 8px 18px; and margin-right: 10px;.',
          validatorKeywords: ['padding:', 'margin-right:'],
          validatorRegex: 'padding:\s*8px\s+18px[\s\S]*?margin-right:\s*10px'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Width Ignored on Inline Anchor Tag',
      buggyCode: `a.hero-btn {
  display: inline;
  width: 220px;
  height: 50px;
  padding: 10px;
}`,
      bugExplanation: 'Elements with `display: inline` strictly ignore width and height CSS properties according to the W3C CSS specification.',
      fixedCode: `a.hero-btn {
  display: inline-block; /* Now width and height are strictly honored */
  width: 220px;
  height: 50px;
  padding: 10px;
}`
    },
    assignment: {
      title: 'Homework Task: Tech Skill Badge Cloud',
      instructions: [
        'Create folder `day-12` with `index.html`.',
        'Create a skill cloud section containing 8 developer skill badges (e.g. Linux, Git, HTML, C, Python).',
        'Style each badge with `display: inline-block`, distinct background colors, and `cursor: pointer`.',
        'Add a secret badge with class `.hidden-badge` styled with `display: none`.'
      ],
      submissionCriteria: 'Inspect element in browser to verify inline-block layout and absence of DOM reflow issues.'
,
      fileName: 'nav-display.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Day 12 - CSS Display Modes Comparison</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Tahoma, sans-serif;
      background: #0f172a;
      color: #f1f5f9;
      padding: 32px 16px;
      line-height: 1.6;
    }
    .wrapper {
      max-width: 720px;
      margin: 0 auto;
      background: #1e293b;
      padding: 28px;
      border-radius: 16px;
      border: 1px solid #334155;
    }
    h1 { font-size: 22px; color: #38bdf8; margin-bottom: 16px; }
    .demo-section {
      background: #0f172a;
      padding: 16px;
      border-radius: 12px;
      margin: 16px 0;
      border: 1px solid #334155;
    }
    .demo-title { font-size: 13px; font-weight: bold; color: #fbbf24; margin-bottom: 8px; }
    
    /* Display: inline (No width/height respect) */
    .inline-item {
      display: inline;
      background: #2563eb;
      color: white;
      padding: 4px 8px;
      margin: 4px;
      border-radius: 4px;
    }
    
    /* Display: block (Takes full width) */
    .block-item {
      display: block;
      background: #059669;
      color: white;
      padding: 8px 12px;
      margin: 6px 0;
      border-radius: 6px;
    }
    
    /* Display: inline-block (Horizontal flow + accepts width/height) */
    .inline-block-item {
      display: inline-block;
      width: 130px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: #7c3aed;
      color: white;
      margin: 4px;
      border-radius: 8px;
      font-weight: 600;
    }
    
    /* Display: none (Completely hidden from flow) */
    .hidden-item {
      display: none;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <h1>CSS Display Property in Action</h1>
    
    <div class="demo-section">
      <div class="demo-title">1. Inline (Flows like text, ignores width/height):</div>
      <span class="inline-item">Item One</span>
      <span class="inline-item">Item Two</span>
      <span class="inline-item">Item Three</span>
    </div>

    <div class="demo-section">
      <div class="demo-title">2. Block (Full width, stacks vertically):</div>
      <div class="block-item">Block Item A (100% available width)</div>
      <div class="block-item">Block Item B (Stacks onto next line)</div>
    </div>

    <div class="demo-section">
      <div class="demo-title">3. Inline-Block (Horizontal navbar pills with precise width/height):</div>
      <div class="inline-block-item">BCS-011</div>
      <div class="inline-block-item">BCSL-013</div>
      <div class="inline-block-item">BCS-012</div>
      <div class="inline-block-item">FEG-02</div>
    </div>
  </div>
</body>
</html>`    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 12: CSS display modes, block vs inline-block and badge cloud',
      commands: [
        'mkdir day-12',
        'cd day-12',
        'git add .',
        'git commit -m "Day 12: CSS display modes, block vs inline-block and badge cloud"',
        'git push origin main'
      ],
      tips: 'Use inline-block when you need buttons to sit side-by-side but retain explicit box padding and height.'
    },
    vivaCheck: {
      question: 'What is the visual difference between `display: none` and `visibility: hidden`?',
      options: [
        'display: none removes the element from rendering flow entirely, while visibility: hidden hides it while preserving layout geometry.',
        'visibility: hidden purges the node from memory permanently, while display: none retains the DOM tree with zero physical dimensions.',
        'display: none makes inner typography fully transparent, while visibility: hidden removes background colors and border boundaries.',
        'visibility: hidden operates strictly in server-side templates, while display: none is processed exclusively by client browsers.'
      ],
      correctAnswer: 0,
      explanation: 'display: none causes the browser to not render the element at all, freeing its space. visibility: hidden renders a blank empty space of the exact same size.'
    }
  },

  /* ── DAY 13 ── */
  {
    id: 'day-13',
    day: 13,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'CSS Positioning: Static, Relative, Absolute & Fixed',
    slug: 'day-13-css-positioning-static-relative-absolute-fixed',
    category: 'CSS Layouts',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Understand normal document flow and default `position: static`.',
      'Use `position: relative` as an offset reference and coordinate anchor.',
      'Use `position: absolute` with top/right/bottom/left to overlay badges and popups.',
      'Use `position: fixed` to stick navigation bars or announcement headers to the viewport.'
    ],
    concept: {
      overview: 'CSS Positioning takes elements out of their natural document flow and pins them to coordinate offsets relative to parents, viewports, or ancestor bounds.',
      keyPoints: [
        'static: Default flow. top, right, bottom, left properties have NO effect.',
        'relative: Element is offset relative to its own normal position without disrupting neighboring flow.',
        'absolute: Element is removed from normal flow and positioned relative to its closest non-static ancestor (usually a position: relative parent).',
        'fixed: Element is pinned relative to the browser viewport window and stays fixed during scrolling.',
        'z-index: Controls stacking order on the 3D depth axis (higher number stacks on top).'
      ],
      analogy: 'Relative is like claiming your chair in a room. Absolute is sticking a sticky note on the corner of that chair. Fixed is taping a sticker directly onto the camera lens.'
    },
    teacherDemo: {
      title: 'Card with Floating Top-Right Badge',
      explanation: 'Parent uses position: relative; Badge uses position: absolute.',
      language: 'html',
      code: `<style>
  .course-card {
    position: relative;
    width: 320px;
    padding: 24px;
    background: #ffffff;
    border: 2px solid #000000;
    border-radius: 16px;
  }
  .pro-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: #2563eb;
    color: #ffffff;
    padding: 4px 10px;
    font-size: 11px;
    font-weight: bold;
    border-radius: 8px;
  }
</style>
<div class="course-card">
  <span class="pro-badge">FEATURED</span>
  <h3>BCA Practical Lab</h3>
  <p>Hands-on industry coding system.</p>
</div>`
    },
    practicalLab: {
      labTitle: 'Day 13 Coding Lab: Floating Notification Badge Card',
      labDescription: 'Position a "NEW" badge at top: 10px and right: 10px inside a position: relative parent card.',
      language: 'html',
      initialCode: `<style>
  .card-container {
    /* Set position to relative */
    width: 300px;
    padding: 20px;
    border: 1px solid #cbd5e1;
  }
  .card-badge {
    /* Set position to absolute with top and right coordinates */
    background: #ef4444;
    color: white;
    padding: 3px 8px;
    font-size: 10px;
  }
</style>
<div class="card-container">
  <span class="card-badge">NEW</span>
  <h4>Linux CLI Practical</h4>
  <p>Learn terminal bash commands.</p>
</div>`,
      tasks: [
        {
          id: 'd13-t1',
          title: 'Anchor Parent with position: relative',
          instruction: 'Add `position: relative;` to .card-container.',
          hint: 'Write position: relative; inside .card-container.',
          validatorKeywords: ['position:', 'relative'],
          validatorRegex: 'position:\\s*relative'
        },
        {
          id: 'd13-t2',
          title: 'Float Badge with position: absolute',
          instruction: 'Add `position: absolute;`, `top: 10px;`, and `right: 10px;` to .card-badge.',
          hint: 'Set position: absolute; top: 10px; right: 10px; in .card-badge.',
          validatorKeywords: ['position:', 'absolute', 'top:', 'right:'],
          validatorRegex: 'position:\\s*absolute[\\s\\S]*?top:\\s*10px[\\s\\S]*?right:\\s*10px'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Absolute Child Escaping Outside Container',
      buggyCode: `.card-wrapper {
  /* Missing position: relative on container! */
  width: 400px;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  /* Button shoots to the top-right corner of the whole screen! */
}`,
      bugExplanation: 'An absolute child looks for the nearest positioned ancestor. If no parent has position: relative/absolute, it positions relative to the <body> tag!',
      fixedCode: `.card-wrapper {
  position: relative; /* Now acts as the boundary origin for absolute children */
  width: 400px;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}`
    },
    assignment: {
      title: 'Homework Task: Pinned Bottom Notification Bar',
      instructions: [
        'Create folder `day-13` with `index.html`.',
        'Build a long scrolling page with several dummy paragraphs.',
        'Create a bottom announcement bar styled with `position: fixed; bottom: 0; left: 0; width: 100%;`.',
        'Add a high `z-index: 100` so it stays floating above all scrolling page content.'
      ],
      submissionCriteria: 'Scroll the webpage in Chrome to verify the bottom bar never moves or disappears.'
,
      fileName: 'modal-overlay.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Day 13 - CSS Positioning & Modal Dialog</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Tahoma, sans-serif;
      background: #0f172a;
      color: white;
      padding: 32px;
      min-height: 200vh; /* demonstrate sticky/fixed behavior */
    }
    /* Fixed trigger button at bottom right */
    .floating-help-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      padding: 12px 20px;
      border-radius: 50px;
      background: #2563eb;
      color: white;
      border: none;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);
      z-index: 10;
    }
    /* Fixed Modal Backdrop Overlay */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 50;
    }
    /* Modal Card with Relative Position for Absolute Close Button */
    .modal-card {
      position: relative;
      background: #1e293b;
      border: 1px solid #334155;
      padding: 28px;
      border-radius: 16px;
      max-width: 440px;
      width: 90%;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
    }
    .modal-close-btn {
      position: absolute;
      top: 14px;
      right: 14px;
      background: #334155;
      border: none;
      color: white;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      cursor: pointer;
      font-weight: bold;
    }
    .modal-card h2 { font-size: 18px; color: #38bdf8; margin-bottom: 8px; }
    .modal-card p { font-size: 13px; color: #cbd5e1; line-height: 1.5; margin-bottom: 16px; }
    .btn-action {
      width: 100%;
      padding: 10px;
      background: #2563eb;
      border: none;
      border-radius: 8px;
      color: white;
      font-weight: bold;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>CSS Positioning: Static, Relative, Absolute, Fixed</h1>
  <p style="color: #94a3b8; margin-top: 8px;">Scroll down to verify the floating button stays anchored to the viewport.</p>

  <!-- Modal Dialog -->
  <div class="modal-backdrop">
    <div class="modal-card">
      <button class="modal-close-btn" onclick="alert('Close clicked')">✕</button>
      <h2>BCA Practical Viva Verification</h2>
      <p>Demonstrating position: fixed (modal backdrop covering 100vw/100vh) and position: absolute (close button pinned to top-right).</p>
      <button class="btn-action" onclick="alert('Submission Approved!')">Confirm Submission</button>
    </div>
  </div>

  <button class="floating-help-btn" onclick="alert('Help desk active')">💬 Ask Mentor</button>
</body>
</html>`    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 13: CSS positioning coordinate systems, absolute badges and fixed bars',
      commands: [
        'mkdir day-13',
        'cd day-13',
        'git add .',
        'git commit -m "Day 13: CSS positioning coordinate systems, absolute badges and fixed bars"',
        'git push origin main'
      ],
      tips: 'Whenever using position: absolute, always double-check that the immediate parent has position: relative.'
    },
    vivaCheck: {
      question: 'Why must a parent container have `position: relative` when placing an `absolute` child inside it?',
      options: [
        'It establishes the parent container as the coordinate origin boundary for positioning the absolute child element.',
        'It triggers GPU hardware acceleration so child transform translations render at smooth sixty frames per second.',
        'It instructs browser rendering engines to hoist the child DOM node above all neighboring stacking context layers.',
        'It enables automatic z-index recalculation preventing nested children from overflowing parent margin boundaries.'
      ],
      correctAnswer: 0,
      explanation: 'An absolute element calculates its top/right/bottom/left coordinates relative to its nearest positioned ancestor. Giving the parent position: relative locks the coordinate origin to the parent bounds.'
    }
  },

  /* ── DAY 14 ── */
  {
    id: 'day-14',
    day: 14,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'Flexbox Architecture 1: Flex Container & Justify-Content',
    slug: 'day-14-flexbox-container-direction-justify-content',
    category: 'CSS Layouts',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Understand the 1-dimensional Flexible Box (Flexbox) layout model.',
      'Differentiate between the Main Axis and Cross Axis.',
      'Use `display: flex` to align elements horizontally with zero float hacks.',
      'Master `justify-content` alignment modes: center, space-between, space-around, space-evenly.'
    ],
    concept: {
      overview: 'CSS Flexbox revolutionized web design by providing a predictable, 1-dimensional layout system that automatically distributes space and aligns items along an axis.',
      keyPoints: [
        'display: flex: Applied to the parent container, transforming all direct children into flex items.',
        'flex-direction: Sets the main axis (row is horizontal left-to-right, column is vertical top-to-bottom).',
        'justify-content: Distributes items along the MAIN axis.',
        'justify-content: space-between pushes first item to start, last item to end, and spaces the rest evenly.',
        'gap: Replaces old margin hacks by setting clean gutters between flex children.'
      ],
      analogy: 'Imagine books on a shelf: Flexbox lets you push them to the left, center them, or spread them out with equal breathing room automatically.'
    },
    teacherDemo: {
      title: 'Modern Header Bar with space-between',
      explanation: 'Logo on the left, navigation links on the right, perfectly spaced.',
      language: 'html',
      code: `<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    background: #000000;
    color: #ffffff;
  }
  .nav-links {
    display: flex;
    gap: 16px;
  }
</style>
<header class="navbar">
  <div class="logo"><strong>NextSem</strong></div>
  <nav class="nav-links">
    <span>Lessons</span>
    <span>Practicals</span>
    <span>Profile</span>
  </nav>
</header>`
    },
    practicalLab: {
      labTitle: 'Day 14 Coding Lab: Space-Between Flexbox Header',
      labDescription: 'Create a flex container that spaces its logo and navigation links apart using justify-content: space-between and a 20px gap.',
      language: 'html',
      initialCode: `<style>
  .app-header {
    /* Apply display: flex and justify-content: space-between */
    background: #2563eb;
    color: white;
    padding: 14px 20px;
  }
  .header-actions {
    /* Apply display: flex and gap: 16px */
  }
</style>
<div class="app-header">
  <div class="brand">NextSem BCA</div>
  <div class="header-actions">
    <button>Home</button>
    <button>Profile</button>
  </div>
</div>`,
      tasks: [
        {
          id: 'd14-t1',
          title: 'Activate Flexbox on Header',
          instruction: 'Add `display: flex;` and `justify-content: space-between;` to .app-header.',
          hint: 'Write display: flex; justify-content: space-between; in .app-header.',
          validatorKeywords: ['display:', 'flex', 'justify-content:', 'space-between'],
          validatorRegex: 'display:\\s*flex[\\s\\S]*?justify-content:\\s*space-between'
        },
        {
          id: 'd14-t2',
          title: 'Add Flex Gap to Actions',
          instruction: 'Add `display: flex;` and `gap: 16px;` to .header-actions.',
          hint: 'Write display: flex; gap: 16px; inside .header-actions.',
          validatorKeywords: ['display:', 'gap:', '16px'],
          validatorRegex: 'display:\\s*flex[\\s\\S]*?gap:\\s*16px'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: justify-content Applied to Children Instead of Container',
      buggyCode: `<div class="header">
  <div class="logo" style="justify-content: space-between;">Logo</div>
  <div class="nav">Links</div>
</div>`,
      bugExplanation: '`justify-content` is a FLEX CONTAINER property. It must be applied to the parent element (.header), not to an individual child item.',
      fixedCode: `.header {
  display: flex;
  justify-content: space-between; /* Properly placed on parent flex container */
}`
    },
    assignment: {
      title: 'Homework Task: Social Media Share Toolbar',
      instructions: [
        'Create folder `day-14` with `index.html`.',
        'Create a toolbar containing 4 buttons (WhatsApp, LinkedIn, GitHub, Copy Link).',
        'Use `display: flex; justify-content: center; gap: 12px;` to center all buttons perfectly.',
        'Add hover background color changes to each button.'
      ],
      submissionCriteria: 'Inspect in Chrome DevTools to ensure gap spacing is active and zero margin hacks are used.'
,
      fileName: 'flex-navbar.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Day 14 - Flexbox Navigation Bar</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #0b1120;
      color: #f8fafc;
    }
    
    /* 1. Flexbox Navigation Header */
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 32px;
      background: #1e293b;
      border-bottom: 1px solid #334155;
    }
    
    .logo {
      font-size: 18px;
      font-weight: 800;
      color: #38bdf8;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    /* 2. Flex Navigation Links */
    .nav-links {
      display: flex;
      list-style: none;
      gap: 24px;
    }
    
    .nav-links a {
      color: #cbd5e1;
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      transition: color 0.2s ease;
    }
    .nav-links a:hover { color: #38bdf8; }
    
    .btn-cta {
      padding: 8px 18px;
      background: #2563eb;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-size: 13px;
      font-weight: bold;
      transition: background 0.2s ease;
    }
    .btn-cta:hover { background: #1d4ed8; }

    .hero {
      max-width: 800px;
      margin: 60px auto;
      text-align: center;
      padding: 0 16px;
    }
    .hero h1 { font-size: 32px; color: white; margin-bottom: 12px; }
    .hero p { color: #94a3b8; font-size: 16px; }
  </style>
</head>
<body>
  <nav class="navbar">
    <a href="#" class="logo">🚀 BCA DevPortal</a>
    <ul class="nav-links">
      <li><a href="#curriculum">Curriculum</a></li>
      <li><a href="#practicals">Practicals</a></li>
      <li><a href="#viva">Viva Bank</a></li>
      <li><a href="#github">GitHub</a></li>
    </ul>
    <a href="#login" class="btn-cta">Student Login</a>
  </nav>

  <div class="hero">
    <h1>Modern CSS Flexbox Navigation</h1>
    <p>Using display: flex with justify-content: space-between to evenly distribute brand logo, nav links, and CTA button.</p>
  </div>
</body>
</html>`    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 14: Flexbox main axis alignment, space-between navbars and gap property',
      commands: [
        'mkdir day-14',
        'cd day-14',
        'git add .',
        'git commit -m "Day 14: Flexbox main axis alignment, space-between navbars and gap property"',
        'git push origin main'
      ],
      tips: 'Never use float: left or inline-block margins for navbars when Flexbox justify-content: space-between exists.'
    },
    vivaCheck: {
      question: 'What is the default direction of the main axis in a CSS Flexbox container?',
      options: [
        'row (items arranged horizontally from left to right along main axis)',
        'column (items stacked vertically from top to bottom along main axis)',
        'row-reverse (items arranged horizontally from right to left in reverse)',
        'wrap-auto (items dynamically auto-tiling based on viewport dimensions)'
      ],
      correctAnswer: 0,
      explanation: 'The initial default value of flex-direction is row, meaning items are arranged horizontally from left to right along the main axis.'
    }
  },

  /* ── DAY 15 ── */
  {
    id: 'day-15',
    day: 15,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'Flexbox Architecture 2: Align-Items, Flex-Wrap & Responsive Cards',
    slug: 'day-15-flexbox-align-items-flex-wrap-responsive-cards',
    category: 'CSS Layouts',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Master cross-axis vertical alignment with `align-items: center | stretch | flex-start`.',
      'Use `flex-wrap: wrap` so multi-card layouts wrap gracefully without horizontal squishing.',
      'Understand flex item sizing with `flex: 1` and `flex-basis`.',
      'Build a multi-card responsive grid using pure Flexbox.'
    ],
    concept: {
      overview: 'While justify-content aligns items horizontally, `align-items` aligns them vertically along the cross axis, and `flex-wrap` allows items to drop down to new lines when container space runs out.',
      keyPoints: [
        'align-items: Controls item alignment across the CROSS axis (perpendicular to main axis).',
        'align-items: center centers elements vertically inside the container.',
        'flex-wrap: nowrap is default (forces all items onto a single cramped line).',
        'flex-wrap: wrap lets items wrap into multiple rows naturally.',
        'flex: 1 is shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: 0% (absorbs equal leftover space).'
      ],
      analogy: 'Imagine words wrapping in a paragraph when you hit the right margin of a page. flex-wrap: wrap does that for cards!'
    },
    teacherDemo: {
      title: 'Responsive Flex Card Grid with Wrapping',
      explanation: 'Cards expand equally with flex: 1 and wrap onto new lines on smaller screens.',
      language: 'html',
      code: `<style>
  .card-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: stretch;
  }
  .card {
    flex: 1 1 250px; /* grow, shrink, min-width 250px */
    padding: 20px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
  }
</style>
<div class="card-grid">
  <div class="card"><h3>Feature 1</h3><p>Fast coding compiler.</p></div>
  <div class="card"><h3>Feature 2</h3><p>Live GitHub grading.</p></div>
  <div class="card"><h3>Feature 3</h3><p>Oral viva simulator.</p></div>
</div>`
    },
    practicalLab: {
      labTitle: 'Day 15 Coding Lab: Centered Feature Cards with Wrap',
      labDescription: 'Create a flex card container with flex-wrap: wrap, align-items: center, and 16px gap.',
      language: 'html',
      initialCode: `<style>
  .showcase-container {
    /* Apply display: flex, flex-wrap: wrap, align-items: center, gap: 16px */
    padding: 20px;
    background: #f1f5f9;
  }
  .feature-box {
    width: 200px;
    padding: 16px;
    background: white;
  }
</style>
<div class="showcase-container">
  <div class="feature-box">Web Dev</div>
  <div class="feature-box">C Logic</div>
  <div class="feature-box">DSA</div>
</div>`,
      tasks: [
        {
          id: 'd15-t1',
          title: 'Configure Flexbox with Wrap',
          instruction: 'Add `display: flex;` and `flex-wrap: wrap;` to .showcase-container.',
          hint: 'Write display: flex; flex-wrap: wrap; inside .showcase-container.',
          validatorKeywords: ['display:', 'flex', 'flex-wrap:', 'wrap'],
          validatorRegex: 'display:\s*flex[\s\S]*?flex-wrap:\s*wrap'
        },
        {
          id: 'd15-t2',
          title: 'Add Alignment and Gap',
          instruction: 'Add `align-items: center;` and `gap: 16px;` to .showcase-container.',
          hint: 'Include align-items: center; gap: 16px;.',
          validatorKeywords: ['align-items:', 'center', 'gap:', '16px'],
          validatorRegex: 'align-items:\s*center[\s\S]*?gap:\s*16px'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Cards Squished to Unreadable Thin Strips',
      buggyCode: `.gallery {
  display: flex;
  gap: 20px;
  /* Missing flex-wrap forces 10 wide cards into a single tiny line! */
}
.gallery-item {
  width: 300px;
}`,
      bugExplanation: 'By default, flex-wrap is nowrap. Flexbox shrinks all children to prevent breaking into new lines, squishing cards into unreadable thin slivers.',
      fixedCode: `.gallery {
  display: flex;
  flex-wrap: wrap; /* Allows cards to drop onto the next row gracefully */
  gap: 20px;
}`
    },
    assignment: {
      title: 'Homework Task: BCA 6-Semester Roadmap Cards',
      instructions: [
        'Create folder `day-15` with `index.html`.',
        'Build a container with 6 cards representing Semesters 1 through 6.',
        'Use `display: flex; flex-wrap: wrap; gap: 16px;` with cards sized at `flex: 1 1 280px;`.',
        'Inspect how resizing the browser window causes 3 columns -> 2 columns -> 1 column smoothly.'
      ],
      submissionCriteria: 'Verify using responsive inspect mode that cards never overflow horizontally on mobile.'
,
      fileName: 'pricing-cards.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Day 15 - Flexbox Responsive Pricing Cards</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Tahoma, sans-serif;
      background: #0b1120;
      color: white;
      padding: 40px 16px;
    }
    .container {
      max-width: 980px;
      margin: 0 auto;
      text-align: center;
    }
    h1 { font-size: 26px; color: #38bdf8; margin-bottom: 8px; }
    .subtitle { color: #94a3b8; font-size: 14px; margin-bottom: 36px; }

    /* Flexbox Container with flex-wrap and align-items: stretch */
    .card-deck {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 24px;
      align-items: stretch;
    }

    .card {
      flex: 1 1 280px;
      max-width: 320px;
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 28px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: left;
      transition: transform 0.25s ease, border-color 0.25s ease;
    }
    .card:hover {
      transform: translateY(-6px);
      border-color: #38bdf8;
    }
    .card.featured {
      border: 2px solid #2563eb;
      background: #172554;
    }

    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 50px;
      font-size: 11px;
      font-weight: bold;
      background: #2563eb;
      color: white;
      margin-bottom: 12px;
    }
    .tier-name { font-size: 20px; font-weight: bold; margin-bottom: 6px; }
    .price { font-size: 28px; font-weight: 800; color: #38bdf8; margin-bottom: 16px; }
    .price span { font-size: 13px; color: #94a3b8; font-weight: normal; }

    .features { list-style: none; margin-bottom: 24px; flex-grow: 1; }
    .features li { font-size: 13px; color: #cbd5e1; margin-bottom: 8px; }
    .features li::before { content: "✓ "; color: #10b981; font-weight: bold; }

    .btn-enroll {
      width: 100%;
      padding: 12px;
      background: #2563eb;
      border: none;
      border-radius: 8px;
      color: white;
      font-weight: bold;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
      display: block;
    }
    .btn-enroll:hover { background: #1d4ed8; }
  </style>
</head>
<body>
  <div class="container">
    <h1>BCA Specialization Learning Tracks</h1>
    <p class="subtitle">Equally sized cards using Flexbox flex-grow, flex-wrap, and stretch alignment.</p>

    <div class="card-deck">
      <div class="card">
        <div>
          <span class="badge">Track 1</span>
          <div class="tier-name">Web Development</div>
          <div class="price">Free <span>/ Semester 1</span></div>
          <ul class="features">
            <li>Semantic HTML5 & Modern CSS</li>
            <li>CSS Grid & Flexbox Layouts</li>
            <li>GitHub Pages Deployment</li>
          </ul>
        </div>
        <a href="#enroll" class="btn-enroll">Start Practice</a>
      </div>

      <div class="card featured">
        <div>
          <span class="badge">Track 2 (Most Popular)</span>
          <div class="tier-name">Full-Stack Engineer</div>
          <div class="price">Free <span>/ 360 Days</span></div>
          <ul class="features">
            <li>JavaScript ES6+ & DOM Projects</li>
            <li>React & Next.js Framework</li>
            <li>Node.js & MongoDB Backend</li>
            <li>Technical Viva Voce Mastery</li>
          </ul>
        </div>
        <a href="#enroll" class="btn-enroll">Enroll Full Track</a>
      </div>

      <div class="card">
        <div>
          <span class="badge">Track 3</span>
          <div class="tier-name">Systems & C++</div>
          <div class="price">Free <span>/ Semester 2</span></div>
          <ul class="features">
            <li>Pointers & Memory Control</li>
            <li>Data Structures & Algorithms</li>
            <li>Object-Oriented Programming</li>
          </ul>
        </div>
        <a href="#enroll" class="btn-enroll">Start Practice</a>
      </div>
    </div>
  </div>
</body>
</html>`    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 15: Flex-wrap responsive cards, align-items cross axis centering',
      commands: [
        'mkdir day-15',
        'cd day-15',
        'git add .',
        'git commit -m "Day 15: Flex-wrap responsive cards, align-items cross axis centering"',
        'git push origin main'
      ],
      tips: 'Whenever building card grids with Flexbox, always set flex-wrap: wrap so mobile screens wrap gracefully.'
    },
    vivaCheck: {
      question: 'Which CSS property vertically centers items in a standard horizontal (`flex-direction: row`) flex container?',
      options: [
        'justify-content: center',
        'align-items: center',
        'vertical-align: middle',
        'text-align: center'
      ],
      correctAnswer: 1,
      explanation: 'align-items controls alignment along the cross axis. In row direction, the cross axis is vertical, so align-items: center centers items vertically.'
    }
  },

  /* ── DAY 16 ── */
  {
    id: 'day-16',
    day: 16,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'CSS Grid System 1: Templates, Columns & Fractional Units',
    slug: 'day-16-css-grid-templates-columns-rows-fractional-units',
    category: 'CSS Layouts',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Understand the 2-dimensional CSS Grid layout model (rows AND columns simultaneously).',
      'Use `display: grid` on container parents.',
      'Master `grid-template-columns` with fractional units (`1fr`) and `repeat()` notation.',
      'Control column and row spacing using `gap: 24px`.'
    ],
    concept: {
      overview: 'CSS Grid is a 2-dimensional layout engine designed for organizing content into precise rows and columns simultaneously, making complex multi-column layouts effortless.',
      keyPoints: [
        'display: grid: Enables the 2D grid formatting context.',
        '1fr (Fractional Unit): Represents a fraction of the available free space in the grid container.',
        'grid-template-columns: repeat(3, 1fr) creates 3 equal-width responsive columns.',
        'Unlike Flexbox (1-directional), Grid aligns items across both horizontal and vertical axes simultaneously.'
      ],
      analogy: 'Flexbox is like stringing beads on a necklace (1D line). CSS Grid is like an Excel spreadsheet or graph paper with defined rows and columns (2D grid).'
    },
    teacherDemo: {
      title: '3-Column Grid with Fractional Units',
      explanation: 'Equal 3-column dashboard using repeat(3, 1fr) and 20px gap.',
      language: 'html',
      code: `<style>
  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 24px;
    background: #000000;
  }
  .metric-card {
    background: #111827;
    color: #ffffff;
    padding: 24px;
    border-radius: 12px;
    border: 1px solid #1f2937;
  }
</style>
<div class="dashboard-grid">
  <div class="metric-card"><h2>90 Days</h2><p>Sprint 1 Completed</p></div>
  <div class="metric-card"><h2>100%</h2><p>Viva Verified</p></div>
  <div class="metric-card"><h2>10 Stars</h2><p>GitHub Projects</p></div>
</div>`
    },
    practicalLab: {
      labTitle: 'Day 16 Coding Lab: 3-Column CSS Grid Dashboard',
      labDescription: 'Create a 3-column CSS Grid using repeat(3, 1fr) and gap: 20px.',
      language: 'html',
      initialCode: `<style>
  .stats-grid {
    /* Set display: grid, grid-template-columns: repeat(3, 1fr), and gap: 20px */
    padding: 16px;
  }
  .stat-card {
    background: #2563eb;
    color: white;
    padding: 20px;
  }
</style>
<div class="stats-grid">
  <div class="stat-card">Enrolled: 1,200</div>
  <div class="stat-card">Passed: 98%</div>
  <div class="stat-card">Rating: 4.9/5</div>
</div>`,
      tasks: [
        {
          id: 'd16-t1',
          title: 'Activate Grid with repeat(3, 1fr)',
          instruction: 'Add `display: grid;` and `grid-template-columns: repeat(3, 1fr);` to .stats-grid.',
          hint: 'Write display: grid; grid-template-columns: repeat(3, 1fr); in .stats-grid.',
          validatorKeywords: ['display:', 'grid', 'grid-template-columns:', 'repeat(3, 1fr)'],
          validatorRegex: 'display:\s*grid[\s\S]*?grid-template-columns:\s*repeat\(3,\s*1fr\)'
        },
        {
          id: 'd16-t2',
          title: 'Add Grid Gap',
          instruction: 'Add `gap: 20px;` to .stats-grid.',
          hint: 'Include gap: 20px; inside .stats-grid.',
          validatorKeywords: ['gap:', '20px'],
          validatorRegex: 'gap:\s*20px'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Fixed Pixel Columns Overflowing on Mobile',
      buggyCode: `.container {
  display: grid;
  grid-template-columns: 400px 400px 400px; /* Total 1200px breaks on mobile screens! */
}`,
      bugExplanation: 'Using fixed pixel widths prevents columns from shrinking to fit smaller screens. Fractional units (1fr) scale dynamically to container bounds.',
      fixedCode: `.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Dynamically fills available space */
}`
    },
    assignment: {
      title: 'Homework Task: Student Portfolio Project Gallery',
      instructions: [
        'Create folder `day-16` with `index.html`.',
        'Create a 6-item project showcase gallery.',
        'Use `display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;`.',
        'Style each project card with title, tech stack badge, and a GitHub view button.'
      ],
      submissionCriteria: 'Inspect grid track lines in Chrome DevTools Grid Inspector overlay.'
,
      fileName: 'project-gallery.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Day 16 - CSS Grid Project Gallery</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Tahoma, sans-serif;
      background: #0b1120;
      color: white;
      padding: 32px 16px;
    }
    .wrapper { max-width: 1040px; margin: 0 auto; }
    h1 { font-size: 24px; color: #38bdf8; margin-bottom: 8px; text-align: center; }
    p.lead { color: #94a3b8; font-size: 14px; text-align: center; margin-bottom: 32px; }

    /* 6-Item CSS Grid with repeat(auto-fit, minmax(280px, 1fr)) */
    .grid-gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
    }

    .project-card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 14px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.2s ease, border-color 0.2s ease;
    }
    .project-card:hover {
      transform: translateY(-4px);
      border-color: #38bdf8;
    }

    .day-badge {
      font-size: 11px;
      font-weight: 800;
      color: #38bdf8;
      margin-bottom: 8px;
    }
    .project-card h3 { font-size: 16px; margin-bottom: 8px; }
    .project-card p { font-size: 13px; color: #94a3b8; line-height: 1.5; margin-bottom: 16px; }

    .tag-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 18px;
    }
    .tag {
      font-size: 10px;
      background: #0f172a;
      border: 1px solid #334155;
      color: #cbd5e1;
      padding: 2px 8px;
      border-radius: 4px;
    }

    .btn-github {
      padding: 8px 14px;
      background: #2563eb;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-size: 12px;
      font-weight: bold;
      text-align: center;
    }
    .btn-github:hover { background: #1d4ed8; }
  </style>
</head>
<body>
  <div class="wrapper">
    <h1>BCA Semester 1 Practical Project Showcase</h1>
    <p class="lead">Built using responsive CSS Grid with auto-fit fractional columns.</p>

    <div class="grid-gallery">
      <div class="project-card">
        <div>
          <div class="day-badge">DAY 01 • HTML SETUP</div>
          <h3>Student Launch Webpage</h3>
          <p>Initial HTML5 boilerplate with semantic structure and browser verification.</p>
          <div class="tag-row"><span class="tag">HTML5</span><span class="tag">VSCode</span></div>
        </div>
        <a href="https://github.com" class="btn-github">View GitHub Repository</a>
      </div>

      <div class="project-card">
        <div>
          <div class="day-badge">DAY 04 • LISTS & TABLES</div>
          <h3>Syllabus Matrix Portal</h3>
          <p>Structured table formatting with rowspan, colspan, and accessibility captions.</p>
          <div class="tag-row"><span class="tag">HTML Tables</span><span class="tag">Matrix</span></div>
        </div>
        <a href="https://github.com" class="btn-github">View GitHub Repository</a>
      </div>

      <div class="project-card">
        <div>
          <div class="day-badge">DAY 05 • FORMS</div>
          <h3>Job Application Portal</h3>
          <p>Client-side form validation with regex pattern matching and semantic fieldsets.</p>
          <div class="tag-row"><span class="tag">Forms</span><span class="tag">Validation</span></div>
        </div>
        <a href="https://github.com" class="btn-github">View GitHub Repository</a>
      </div>

      <div class="project-card">
        <div>
          <div class="day-badge">DAY 06 • SEMANTICS</div>
          <h3>College Campus Portal</h3>
          <p>Clean semantic architecture with header, nav, main, article, aside, and footer.</p>
          <div class="tag-row"><span class="tag">Semantics</span><span class="tag">SEO</span></div>
        </div>
        <a href="https://github.com" class="btn-github">View GitHub Repository</a>
      </div>

      <div class="project-card">
        <div>
          <div class="day-badge">DAY 09 • SELECTORS</div>
          <h3>Component Library</h3>
          <p>Modular button variants (.btn-success, .btn-danger) with hover states.</p>
          <div class="tag-row"><span class="tag">CSS Selectors</span><span class="tag">DRY</span></div>
        </div>
        <a href="https://github.com" class="btn-github">View GitHub Repository</a>
      </div>

      <div class="project-card">
        <div>
          <div class="day-badge">DAY 15 • FLEXBOX</div>
          <h3>Responsive Course Deck</h3>
          <p>Equal height pricing and curriculum cards with flex-wrap and alignment.</p>
          <div class="tag-row"><span class="tag">Flexbox</span><span class="tag">Layouts</span></div>
        </div>
        <a href="https://github.com" class="btn-github">View GitHub Repository</a>
      </div>
    </div>
  </div>
</body>
</html>`    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 16: CSS Grid 2D layout, repeat syntax and fractional fr units',
      commands: [
        'mkdir day-16',
        'cd day-16',
        'git add .',
        'git commit -m "Day 16: CSS Grid 2D layout, repeat syntax and fractional fr units"',
        'git push origin main'
      ],
      tips: 'Fractional units (fr) represent proportional fractions of remaining space and prevent horizontal overflow.'
    },
    vivaCheck: {
      question: 'What does 1fr mean in CSS Grid?',
      options: [
        '1 fraction of available free space distributed across explicit tracks in the grid container.',
        '1 fixed frame rendering interval synchronized with browser display refresh frequency cycles.',
        '1 font-relative viewport measurement scaling proportionally with parent typography units.',
        '1 fractional subpixel calculation rounding layout boundaries down to avoid anti-aliasing.'
      ],
      correctAnswer: 0,
      explanation: 'fr stands for fractional unit, representing a fraction of the unused space available inside the grid container.'
    }
  },

  /* ── DAY 17 ── */
  {
    id: 'day-17',
    day: 17,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'CSS Grid System 2: Spanning & Newspaper Magazine Layout',
    slug: 'day-17-css-grid-areas-spanning-newspaper-layout',
    category: 'CSS Layouts',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Master track spanning using `grid-column: span 2` and `grid-row: span 2`.',
      'Build asymmetrical hero grids with featured large articles.',
      'Understand grid line numbering (line 1, line 2, line -1).',
      'Create a classic newspaper / tech magazine editorial layout.'
    ],
    concept: {
      overview: 'Grid items do not have to be uniform squares. Using column and row spanning, individual grid items can stretch across multiple tracks to create captivating editorial designs.',
      keyPoints: [
        'grid-column: span 2: Makes the item occupy 2 horizontal column tracks.',
        'grid-row: span 2: Makes the item stretch across 2 vertical row tracks.',
        'grid-column: 1 / -1: Spans full width from first grid line to the very last.',
        'Asymmetric grid layouts draw visual attention to lead stories or primary calls to action.'
      ],
      analogy: 'Look at the front page of a newspaper: The lead headline spans across 4 columns, while smaller side stories occupy single columns.'
    },
    teacherDemo: {
      title: 'Magazine Editorial Grid with Featured Hero Item',
      explanation: 'First item spans 2 columns to dominate visual hierarchy.',
      language: 'html',
      code: `<style>
  .magazine-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .featured-story {
    grid-column: span 2;
    background: #000000;
    color: #ffffff;
    padding: 30px;
    border-radius: 16px;
  }
  .side-story {
    background: #f8fafc;
    padding: 20px;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
  }
</style>
<div class="magazine-grid">
  <article class="featured-story">
    <h2>Lead Story: Artificial Intelligence in BCA</h2>
    <p>How modern full-stack students build production systems.</p>
  </article>
  <article class="side-story">
    <h3>Linux CLI</h3>
    <p>Essential bash scripts.</p>
  </article>
</div>`
    },
    practicalLab: {
      labTitle: 'Day 17 Coding Lab: Hero Banner Column Span',
      labDescription: 'Make the .hero-card span 2 columns using grid-column: span 2 inside a 3-column grid.',
      language: 'html',
      initialCode: `<style>
  .news-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .hero-card {
    /* Apply grid-column: span 2 */
    background: #2563eb;
    color: white;
    padding: 24px;
  }
  .regular-card {
    background: #f1f5f9;
    padding: 20px;
  }
</style>
<div class="news-grid">
  <div class="hero-card">FEATURED: 3-Year BCA Practical Journey</div>
  <div class="regular-card">Quick Tip: Git Push</div>
  <div class="regular-card">CSS Box Model</div>
</div>`,
      tasks: [
        {
          id: 'd17-t1',
          title: 'Span 2 Columns on Hero Card',
          instruction: 'Add `grid-column: span 2;` to .hero-card.',
          hint: 'Write grid-column: span 2; in .hero-card.',
          validatorKeywords: ['grid-column:', 'span 2'],
          validatorRegex: 'grid-column:\\s*span\\s+2'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Column Span Exceeding Total Grid Tracks',
      buggyCode: `.grid-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Container only has 2 columns! */
}
.banner {
  grid-column: span 4; /* Spanning 4 columns on a 2-column grid creates empty ghost tracks */
}`,
      bugExplanation: 'Spanning more columns than defined in grid-template-columns forces the browser into implicit grid creation, breaking the intended layout.',
      fixedCode: `.grid-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Defined 4 columns allows span 4 properly */
}
.banner {
  grid-column: span 4;
}`
    },
    assignment: {
      title: 'Homework Task: Tech News Editorial Dashboard',
      instructions: [
        'Create folder `day-17` with `index.html`.',
        'Build a 4-column news magazine layout.',
        'Lead story: Spans 2 columns and 2 rows (`grid-column: span 2; grid-row: span 2;`).',
        'Add 4 regular news cards filling the remaining grid slots.',
        'Add a full-width footer spanning all 4 columns (`grid-column: 1 / -1;`).'
      ],
      submissionCriteria: 'Inspect in Chrome DevTools to verify exact grid line coordinates.'
,
      fileName: 'magazine-layout.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Day 17 - CSS Grid Newspaper Magazine Layout</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Tahoma, sans-serif;
      background: #0f172a;
      color: white;
      padding: 32px 16px;
    }
    .magazine-container {
      max-width: 1080px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }

    /* Lead Story spans 2 columns and 2 rows */
    .lead-story {
      grid-column: span 2;
      grid-row: span 2;
      background: #1e293b;
      border: 1px solid #3b82f6;
      border-radius: 16px;
      padding: 32px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .lead-story h2 { font-size: 26px; color: #38bdf8; margin: 12px 0; }
    .lead-story p { color: #cbd5e1; font-size: 15px; line-height: 1.6; }

    /* Regular News Cards */
    .news-card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 20px;
    }
    .news-card h3 { font-size: 15px; color: white; margin-bottom: 8px; }
    .news-card p { font-size: 12px; color: #94a3b8; line-height: 1.5; }

    /* Footer spans full width (all 4 columns) */
    .magazine-footer {
      grid-column: 1 / -1;
      background: #0f172a;
      border-top: 1px solid #334155;
      padding: 20px 0;
      text-align: center;
      font-size: 13px;
      color: #64748b;
    }
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 4px;
      background: #2563eb;
      font-size: 10px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="magazine-container">
    <article class="lead-story">
      <div>
        <span class="badge">BREAKING • TECH</span>
        <h2>NextSem Launches 360-Day BCA Practical Curriculum</h2>
        <p>A ground-breaking interactive engineering curriculum allowing students to study on their mobile phone while simultaneously building verified software in Visual Studio Code on their PC.</p>
      </div>
      <div style="font-size: 12px; color: #64748b; margin-top: 20px;">By Er. Manoj Kumar • 5 min read</div>
    </article>

    <article class="news-card">
      <span class="badge" style="background: #10b981;">CLOUD</span>
      <h3>Firebase Hosting Deployed</h3>
      <p>Instant static assets delivered through global CDN endpoints with 0ms hydration.</p>
    </article>

    <article class="news-card">
      <span class="badge" style="background: #7c3aed;">GITHUB</span>
      <h3>CI/CD Pipeline Verification</h3>
      <p>Automated repository checks verify student code pushes line-by-line.</p>
    </article>

    <article class="news-card">
      <span class="badge" style="background: #f59e0b;">UI/UX</span>
      <h3>CSS Grid 2 Spanning Rules</h3>
      <p>Mastering grid-column: span 2 and grid-row: span 2 for responsive dashboards.</p>
    </article>

    <article class="news-card">
      <span class="badge" style="background: #ef4444;">VIVA</span>
      <h3>100% Viva Voce Pass Rate</h3>
      <p>All active students scored 100% on their Day 17 technical inspection questions.</p>
    </article>

    <footer class="magazine-footer">
      NextSem BCA Computer Science Gazette • All 4 Columns Spanned via grid-column: 1 / -1
    </footer>
  </div>
</body>
</html>`    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 17: CSS Grid spanning, asymmetric editorial layouts and line indexing',
      commands: [
        'mkdir day-17',
        'cd day-17',
        'git add .',
        'git commit -m "Day 17: CSS Grid spanning, asymmetric editorial layouts and line indexing"',
        'git push origin main'
      ],
      tips: 'Use grid-column: 1 / -1 to effortlessly span an item across the entire width of any grid.'
    },
    vivaCheck: {
      question: 'What does `grid-column: 1 / -1` accomplish on a CSS Grid item?',
      options: [
        'It spans the element across the entire grid width from the first to the very last explicit column line.',
        'It clamps item bounding dimensions to a negative offset preventing overflow across grid layout tracks.',
        'It triggers an inverted matrix transformation mirroring column placement along the vertical grid axis.',
        'It detaches the element from the grid container context and positions it as a fixed viewport overlay.'
      ],
      correctAnswer: 0,
      explanation: 'In CSS Grid line numbering, -1 refers to the last line of the explicit grid. 1 / -1 spans from the start line to the end line, covering 100% of the columns.'
    }
  },

  /* ── DAY 18 ── */
  {
    id: 'day-18',
    day: 18,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'Responsive Design & Media Queries: Mobile-First Strategy',
    slug: 'day-18-responsive-design-media-queries-mobile-first',
    category: 'CSS Layouts',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Understand Responsive Web Design (RWD) principles and fluid layouts.',
      'Configure the critical viewport meta tag in the HTML head.',
      'Write mobile-first CSS media queries using `@media (min-width: 768px)`.',
      'Transform single-column mobile layouts into multi-column desktop layouts seamlessly.'
    ],
    concept: {
      overview: 'Over 60% of web traffic originates from mobile devices. Responsive Web Design ensures websites adapt fluidly across phones, tablets, and wide desktop monitors using CSS Media Queries.',
      keyPoints: [
        'Mobile-First Strategy: Write default CSS for small screens first, then use min-width media queries to enhance layouts as screen width grows.',
        '@media (min-width: 768px) targets tablets and desktops.',
        '@media (min-width: 1024px) targets large desktop monitors.',
        'Always ensure <meta name="viewport" content="width=device-width, initial-scale=1.0"> is in the HTML <head>.'
      ],
      analogy: 'Water adapts to the shape of whatever cup, bottle, or bowl it is poured into. Responsive design makes your web page flow naturally into any screen size.'
    },
    teacherDemo: {
      title: 'Mobile-First Dual Column Transformation',
      explanation: '1 column on mobile phones, transforms to 2 columns on tablets and desktops.',
      language: 'html',
      code: `<style>
  /* Default: Mobile phone (1 column) */
  .content-layout {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  /* Desktop breakpoint (2 columns) */
  @media (min-width: 768px) {
    .content-layout {
      flex-direction: row;
    }
  }
</style>
<div class="content-layout">
  <main style="flex: 2; background: #ffffff; padding: 20px;">Main Article</main>
  <aside style="flex: 1; background: #f1f5f9; padding: 20px;">Sidebar</aside>
</div>`
    },
    practicalLab: {
      labTitle: 'Day 18 Coding Lab: Responsive Grid Breakpoint',
      labDescription: 'Configure a layout that is 1 column on mobile, and becomes 3 columns on screens 768px or wider using @media (min-width: 768px).',
      language: 'html',
      initialCode: `<style>
  .responsive-cards {
    display: grid;
    /* Default: 1 column on mobile */
    grid-template-columns: 1fr;
    gap: 16px;
  }

  /* Add media query for min-width: 768px with repeat(3, 1fr) below */
</style>
<div class="responsive-cards">
  <div style="background:#2563eb; color:white; padding:16px;">Day 1</div>
  <div style="background:#2563eb; color:white; padding:16px;">Day 2</div>
  <div style="background:#2563eb; color:white; padding:16px;">Day 3</div>
</div>`,
      tasks: [
        {
          id: 'd18-t1',
          title: 'Write min-width: 768px Media Query',
          instruction: 'Add `@media (min-width: 768px) { .responsive-cards { grid-template-columns: repeat(3, 1fr); } }`.',
          hint: 'Write @media (min-width: 768px) { .responsive-cards { grid-template-columns: repeat(3, 1fr); } }',
          validatorKeywords: ['@media', 'min-width:', '768px', 'grid-template-columns:', 'repeat(3, 1fr)'],
          validatorRegex: '@media\\s*\\(\\s*min-width:\\s*768px\\s*\\)[\\s\\S]*?grid-template-columns:\\s*repeat\\(3,\\s*1fr\\)'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Missing Viewport Meta Tag Breaking Mobile Scaling',
      buggyCode: `<!DOCTYPE html>
<html>
<head>
  <title>Responsive Site</title>
  <!-- Missing viewport meta tag! -->
</head>
<body>
  <h1>Why is my site zoomed out like desktop on mobile?</h1>
</body>
</html>`,
      bugExplanation: 'Without the viewport meta tag, mobile browsers assume the page is designed for a 980px desktop and shrink the entire page down to a tiny, unreadable zoom.',
      fixedCode: `<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Site</title>
</head>`
    },
    assignment: {
      title: 'Homework Task: Responsive BCA Course Landing Page',
      instructions: [
        'Create folder `day-18` with `index.html`.',
        'Build a header, hero section, and 3-card feature showcase.',
        'On mobile (< 640px): 1 column layout with stacked navigation.',
        'On tablet (>= 640px): 2 column card grid.',
        'On desktop (>= 1024px): 3 column card grid with horizontal header navigation.'
      ],
      submissionCriteria: 'Test using Chrome DevTools device mode toggling between iPhone, iPad, and Desktop.'
,
      fileName: 'responsive-course.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Day 18 - Mobile-First Responsive Course Page</title>
  <style>
    /* 1. Mobile-First Base Styles (< 640px) */
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Tahoma, sans-serif;
      background: #0b1120;
      color: white;
      padding: 16px;
      line-height: 1.6;
    }
    .header {
      text-align: center;
      padding: 24px 0;
      border-bottom: 1px solid #1e293b;
    }
    .header h1 { font-size: 22px; color: #38bdf8; }
    .header p { font-size: 13px; color: #94a3b8; }

    .card-grid {
      display: grid;
      grid-template-columns: 1fr; /* 1 column on mobile */
      gap: 16px;
      margin-top: 24px;
    }
    .course-card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 20px;
    }
    .course-card h3 { font-size: 16px; color: white; margin-bottom: 6px; }
    .course-card p { font-size: 13px; color: #cbd5e1; }

    /* 2. Tablet Viewport (>= 640px): 2 Columns */
    @media (min-width: 640px) {
      body { padding: 32px; }
      .card-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }
      .header h1 { font-size: 26px; }
    }

    /* 3. Desktop Viewport (>= 1024px): 3 Columns */
    @media (min-width: 1024px) {
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: left;
        max-width: 1040px;
        margin: 0 auto;
      }
      .card-grid {
        max-width: 1040px;
        margin: 32px auto 0;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
      }
      .header h1 { font-size: 30px; }
    }
  </style>
</head>
<body>
  <header class="header">
    <div>
      <h1>BCA Semester 1 Course Modules</h1>
      <p>Responsive Media Query Strategy (Mobile -> Tablet -> Desktop)</p>
    </div>
  </header>

  <main class="card-grid">
    <div class="course-card">
      <h3>BCS-011: Computer Basics</h3>
      <p>Foundations of computer hardware, operating systems, and memory hierarchy.</p>
    </div>
    <div class="course-card">
      <h3>BCSL-013: PC Software Lab</h3>
      <p>Hands-on practical development with HTML5, CSS3, JavaScript, and Linux CLI.</p>
    </div>
    <div class="course-card">
      <h3>BCS-012: Mathematics</h3>
      <p>Discrete mathematics, linear programming, matrices, and computational calculus.</p>
    </div>
  </main>
</body>
</html>`    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 18: Mobile-first responsive design, media query breakpoints and fluid grids',
      commands: [
        'mkdir day-18',
        'cd day-18',
        'git add .',
        'git commit -m "Day 18: Mobile-first responsive design, media query breakpoints and fluid grids"',
        'git push origin main'
      ],
      tips: 'Always write mobile styles outside media queries, and use min-width to progressively enhance larger screens.'
    },
    vivaCheck: {
      question: 'Why is the mobile-first CSS architecture preferred over desktop-first?',
      options: [
        'It serves lightweight baseline styles to constrained mobile devices and progressively enhances larger screens.',
        'Desktop browser rendering engines execute min-width media queries significantly faster than max-width queries.',
        'Modern search engines penalize websites that declare desktop viewports before mobile viewport meta directives.',
        'It forces mobile operating systems to cache stylesheets in flash memory rather than reloading network assets.'
      ],
      correctAnswer: 0,
      explanation: 'Mobile-first ensures mobile users download simpler, lighter baseline CSS, and richer layout features are loaded conditionally as screen width increases.'
    }
  },

  /* ── DAY 19 ── */
  {
    id: 'day-19',
    day: 19,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'CSS Transitions, Transforms & Hover Micro-Interactions',
    slug: 'day-19-css-transitions-hover-micro-interactions-transform',
    category: 'CSS Layouts',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Create smooth visual states using the `transition` property.',
      'Manipulate geometry using `transform: translateY()`, `scale()`, and `rotate()`.',
      'Build tactile card hover elevations with smooth box-shadow transitions.',
      'Apply hardware GPU acceleration principles (`transform`, `opacity`) for 60fps animations.'
    ],
    concept: {
      overview: 'Micro-animations turn static web pages into engaging, interactive applications. CSS Transitions smoothly interpolate changes between pseudo-class states like :hover and :active.',
      keyPoints: [
        'transition: property duration timing-function delay (e.g., transition: all 0.25s ease).',
        'transform: translateY(-4px) moves an element up smoothly without causing expensive DOM layout recalculations.',
        'transform: scale(1.05) subtly enlarges buttons on hover for delightful tactile feedback.',
        'Always animate transform and opacity rather than width, height, or top for 60fps performance.'
      ],
      analogy: 'Imagine flipping a light switch: without transition, the room instantly snaps bright. With transition, a dimmer switch smoothly fades the light up over 0.3 seconds.'
    },
    teacherDemo: {
      title: 'Elevating Interactive Card with Smooth Shadow',
      explanation: 'Notice how translateY and box-shadow combine for a premium physical lift effect.',
      language: 'html',
      code: `<style>
  .interactive-card {
    width: 280px;
    padding: 24px;
    background: #ffffff;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    cursor: pointer;
  }
  .interactive-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(37, 99, 235, 0.15);
  }
</style>
<div class="interactive-card">
  <h3>Interactive Module</h3>
  <p>Hover over me to feel the smooth elevation!</p>
</div>`
    },
    practicalLab: {
      labTitle: 'Day 19 Coding Lab: Interactive Hover Button',
      labDescription: 'Add a smooth transition: all 0.3s ease and transform: translateY(-3px) on :hover to .action-btn.',
      language: 'html',
      initialCode: `<style>
  .action-btn {
    padding: 12px 24px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: bold;
    cursor: pointer;
    /* Add transition here */
  }
  .action-btn:hover {
    /* Add transform translateY(-3px) here */
  }
</style>
<button class="action-btn">Launch Practice Lab</button>`,
      tasks: [
        {
          id: 'd19-t1',
          title: 'Add Transition Property',
          instruction: 'Add `transition: all 0.3s ease;` to .action-btn.',
          hint: 'Write transition: all 0.3s ease; inside .action-btn.',
          validatorKeywords: ['transition:', '0.3s', 'ease'],
          validatorRegex: 'transition:\\s*(all\\s+)?0\\.3s\\s+ease'
        },
        {
          id: 'd19-t2',
          title: 'Add Hover Transform',
          instruction: 'Add `transform: translateY(-3px);` to .action-btn:hover.',
          hint: 'Include transform: translateY(-3px); inside .action-btn:hover.',
          validatorKeywords: ['transform:', 'translateY(-3px)'],
          validatorRegex: 'transform:\\s*translateY\\(-3px\\)'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Janky Laggy Animation Using Margin-Top on Hover',
      buggyCode: `.card:hover {
  margin-top: -10px; /* Causes expensive browser reflow and layout thrashing! */
  transition: margin-top 0.3s;
}`,
      bugExplanation: 'Animating margin or top triggers layout recalculation across the entire document tree. Always use transform: translateY() which is GPU-accelerated by the browser compositor.',
      fixedCode: `.card:hover {
  transform: translateY(-10px); /* Runs at 60fps on GPU without layout thrashing */
  transition: transform 0.3s ease;
}`
    },
    assignment: {
      title: 'Homework Task: Interactive Pricing / Tier Cards',
      instructions: [
        'Create folder `day-19` with `index.html`.',
        'Build 3 subscription / course tier cards (Starter, Pro, Enterprise).',
        'Apply `transition: transform 0.25s ease, box-shadow 0.25s ease` on all cards.',
        'On `:hover`, elevate the hovered card by `translateY(-8px)` and deepen its drop-shadow.',
        'Add a `:active` state that scales buttons down to `scale(0.96)` on click.'
      ],
      submissionCriteria: 'Test hover and click micro-interactions in Google Chrome.'
,
      fileName: 'tier-cards.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Day 19 - CSS Transitions & Transform Effects</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Tahoma, sans-serif;
      background: #0b1120;
      color: white;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px;
    }
    .tier-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 24px;
      max-width: 900px;
      width: 100%;
    }

    /* Card with Smooth Transitions */
    .tier-card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 32px 24px;
      flex: 1 1 240px;
      max-width: 280px;
      text-align: center;
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
      cursor: pointer;
    }

    /* Elevate on Hover */
    .tier-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 16px 30px rgba(37, 99, 235, 0.25);
      border-color: #38bdf8;
    }

    .tier-card h3 { font-size: 20px; color: #38bdf8; margin-bottom: 8px; }
    .price { font-size: 28px; font-weight: 800; margin-bottom: 16px; }
    .features { list-style: none; font-size: 13px; color: #cbd5e1; margin-bottom: 24px; }
    .features li { margin-bottom: 8px; }

    /* Interactive Button with Click Scale */
    .btn-select {
      width: 100%;
      padding: 12px;
      background: #2563eb;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.15s ease, background 0.15s ease;
    }
    .btn-select:hover { background: #1d4ed8; }
    .btn-select:active { transform: scale(0.96); }
  </style>
</head>
<body>
  <div class="tier-container">
    <div class="tier-card">
      <h3>Starter</h3>
      <div class="price">Free</div>
      <ul class="features">
        <li>Days 1–10 Curriculum</li>
        <li>Community Discord</li>
        <li>Automated Quizzes</li>
      </ul>
      <button class="btn-select">Select Starter</button>
    </div>

    <div class="tier-card" style="border-color: #2563eb;">
      <h3>Pro Developer</h3>
      <div class="price">Free</div>
      <ul class="features">
        <li>Full 360-Day Pathway</li>
        <li>1-on-1 Viva Reviews</li>
        <li>GitHub Certification</li>
      </ul>
      <button class="btn-select" style="background: #3b82f6;">Select Pro</button>
    </div>

    <div class="tier-card">
      <h3>Enterprise</h3>
      <div class="price">Free</div>
      <ul class="features">
        <li>Capstone Review</li>
        <li>Job Portal Access</li>
        <li>Direct Mentorship</li>
      </ul>
      <button class="btn-select">Select Enterprise</button>
    </div>
  </div>
</body>
</html>`    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 19: CSS transitions, GPU-accelerated transform translateY and tactile hover states',
      commands: [
        'mkdir day-19',
        'cd day-19',
        'git add .',
        'git commit -m "Day 19: CSS transitions, GPU-accelerated transform translateY and tactile hover states"',
        'git push origin main'
      ],
      tips: 'Always animate transform and opacity for buttery 60fps mobile transitions with zero battery drain.'
    },
    vivaCheck: {
      question: 'Why is `transform: translateY()` preferred over `top` or `margin-top` for hover animations?',
      options: [
        'It executes on the GPU compositor thread without triggering costly browser layout reflow or repaint cycles.',
        'It compiles directly into native hardware vector instructions bypassing browser CSSOM recalculation steps.',
        'Properties like margin-top and top are formally marked deprecated in CSS3 and ignored by modern engines.',
        'It compresses animated visual keyframes into smaller TCP packets during network asset transmission runs.'
      ],
      correctAnswer: 0,
      explanation: 'Transform does not change geometry in the layout tree, meaning the browser composite engine renders it directly on the GPU without costly document reflow.'
    }
  },

  /* ── DAY 20 ── */
  {
    id: 'day-20',
    day: 20,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'Sprint 2 Capstone: Responsive University Campus Portal',
    slug: 'day-20-sprint-2-capstone-responsive-campus-portal',
    category: 'CSS Layouts',
    estimatedTime: '3 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Integrate all concepts from Sprint 2 into a production-grade multi-section portal.',
      'Build a Flexbox sticky header with brand logo and responsive navigation.',
      'Create a modern Hero banner with call-to-action buttons.',
      'Build a 3-column CSS Grid showcasing BCA Academic Departments.',
      'Deploy full mobile responsiveness with media queries and hover micro-animations.'
    ],
    concept: {
      overview: 'Congratulations on reaching Day 20! Today you synthesize everything learned across Sprint 2 (Box Model, Display, Positioning, Flexbox, Grid, Media Queries, and Transitions) to build a complete Responsive University Campus Portal.',
      keyPoints: [
        'Semantic Architecture: Use <header>, <nav>, <main>, <section>, and <footer>.',
        'Global CSS Design System: Define CSS custom variables for primary brand blue (#2563eb), dark background, and clean cards.',
        'Layout Integration: Flexbox for single-direction alignment (Navbar, Buttons) + CSS Grid for 2D multi-card departments.',
        '100% Mobile Responsive: Perfectly readable on 360px mobile screens and wide 1440px desktop displays.'
      ],
      analogy: 'Think of this as your semester midterm practical exam: taking all the separate tools in your toolbox and crafting a real, functional software product.'
    },
    teacherDemo: {
      title: 'Responsive Campus Portal Architecture',
      explanation: 'Complete architecture demonstrating navigation, hero, and grid departments.',
      language: 'html',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Apex University Portal</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: sans-serif; background: #f8fafc; color: #0f172a; }
    .header { display: flex; justify-content: space-between; align-items: center; padding: 18px 24px; background: #000; color: #fff; }
    .hero { text-align: center; padding: 60px 20px; background: #2563eb; color: #fff; }
    .dept-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; padding: 40px 24px; }
    .dept-card { background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0; transition: transform 0.2s; }
    .dept-card:hover { transform: translateY(-4px); }
  </style>
</head>
<body>
  <header class="header"><h2>Apex University</h2><div>BCA Portal</div></header>
  <section class="hero"><h1>Excellence in Computer Applications</h1></section>
  <section class="dept-grid">
    <div class="dept-card"><h3>Computer Science</h3><p>Software & Algorithms</p></div>
    <div class="dept-card"><h3>Web Technologies</h3><p>Full-Stack Engineering</p></div>
    <div class="dept-card"><h3>Data Science</h3><p>Analytics & Machine Learning</p></div>
  </section>
</body>
</html>`
    },
    practicalLab: {
      labTitle: 'Day 20 Coding Lab: Complete Campus Portal',
      labDescription: 'Assemble the final capstone portal incorporating a flex header, hero section, and responsive dept-grid.',
      language: 'html',
      initialCode: `<style>
  * { box-sizing: border-box; }
  .portal-nav {
    display: flex;
    justify-content: space-between;
    padding: 16px 20px;
    background: #000000;
    color: #ffffff;
  }
  .portal-hero {
    padding: 40px 20px;
    background: #2563eb;
    color: #ffffff;
    text-align: center;
  }
  .portal-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    padding: 24px;
  }
</style>
<header class="portal-nav">
  <div>NextSem Campus</div>
  <div>Student Hub</div>
</header>
<section class="portal-hero">
  <h1>Welcome to BCA Department</h1>
</section>
<main class="portal-grid">
  <div style="background:white; padding:16px; border:1px solid #ddd;">Programming Lab</div>
  <div style="background:white; padding:16px; border:1px solid #ddd;">Web Studio</div>
  <div style="background:white; padding:16px; border:1px solid #ddd;">Library Portal</div>
</main>`,
      tasks: [
        {
          id: 'd20-t1',
          title: 'Verify Portal Nav Flexbox',
          instruction: 'Ensure .portal-nav has `display: flex;` and `justify-content: space-between;`.',
          hint: 'Keep display: flex and justify-content: space-between in .portal-nav.',
          validatorKeywords: ['display:', 'flex', 'justify-content:', 'space-between'],
          validatorRegex: 'display:\\s*flex[\\s\\S]*?justify-content:\\s*space-between'
        },
        {
          id: 'd20-t2',
          title: 'Verify Portal Grid System',
          instruction: 'Ensure .portal-grid has `display: grid;` and `grid-template-columns: repeat(3, 1fr);`.',
          hint: 'Keep display: grid and grid-template-columns: repeat(3, 1fr); in .portal-grid.',
          validatorKeywords: ['display:', 'grid', 'grid-template-columns:', 'repeat(3, 1fr)'],
          validatorRegex: 'display:\\s*grid[\\s\\S]*?grid-template-columns:\\s*repeat\\(3,\\s*1fr\\)'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Broken Mobile View on Full Capstone Portal',
      buggyCode: `.portal-grid {
  display: grid;
  grid-template-columns: 350px 350px 350px;
  width: 1050px; /* Hardcoded width breaks completely on smartphones! */
}`,
      bugExplanation: 'Hardcoding widths like 1050px prevents responsive reflow and forces horizontal scrolling. Always use fluid grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) or media queries.',
      fixedCode: `.portal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  width: 100%;
}`
    },
    assignment: {
      title: 'Homework Task: Production Campus Portal GitHub Release',
      instructions: [
        'Create folder `day-20` in your repository with `index.html` and `styles.css`.',
        'Build a complete University Campus Portal homepage.',
        'Section 1: Sticky Navigation Bar with Logo and Links.',
        'Section 2: Hero section with CTA button ("Apply for BCA 2026").',
        'Section 3: 4 Academic Department Cards with hover elevation (`translateY(-5px)`).',
        'Section 4: Faculty Spotlight Section with 2-column layout.',
        'Section 5: Professional Footer with Copyright and Quick Links.',
        'Ensure 100% mobile responsiveness from 360px to 1440px.'
      ],
      submissionCriteria: 'Push to GitHub and verify live repository in NextSem BCA Practical Portal.'
,
      fileName: 'campus-portal.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Day 20 - University Campus Portal Capstone</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Tahoma, sans-serif;
      background: #060c18;
      color: white;
      line-height: 1.6;
    }
    /* Sticky Top Header */
    .navbar {
      position: sticky;
      top: 0;
      background: rgba(12, 19, 40, 0.95);
      backdrop-filter: blur(8px);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 32px;
      border-bottom: 1px solid #1e293b;
      z-index: 100;
    }
    .navbar h2 { font-size: 18px; color: #38bdf8; }
    .nav-links { display: flex; gap: 20px; list-style: none; }
    .nav-links a { color: #cbd5e1; text-decoration: none; font-size: 14px; font-weight: 600; }
    .nav-links a:hover { color: #38bdf8; }

    /* Hero Section */
    .hero {
      text-align: center;
      padding: 80px 20px;
      background: radial-gradient(circle at center, rgba(37,99,235,0.15) 0%, transparent 70%);
    }
    .hero h1 { font-size: 36px; color: white; margin-bottom: 12px; }
    .hero p { font-size: 16px; color: #94a3b8; max-width: 600px; margin: 0 auto 24px; }
    .btn-cta {
      padding: 12px 28px;
      background: #2563eb;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: bold;
      display: inline-block;
      transition: transform 0.2s ease, background 0.2s ease;
    }
    .btn-cta:hover { transform: translateY(-2px); background: #1d4ed8; }

    /* Departments Grid */
    .section-title { text-align: center; font-size: 24px; margin: 40px 0 20px; color: #38bdf8; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 20px;
      max-width: 1040px;
      margin: 0 auto 60px;
      padding: 0 20px;
    }
    .dept-card {
      background: #0c1328;
      border: 1px solid #1e293b;
      border-radius: 12px;
      padding: 24px;
      transition: transform 0.2s ease;
    }
    .dept-card:hover { transform: translateY(-5px); border-color: #38bdf8; }
    .dept-card h3 { font-size: 18px; margin-bottom: 8px; color: white; }
    .dept-card p { font-size: 13px; color: #94a3b8; }

    /* Footer */
    footer {
      background: #050912;
      border-top: 1px solid #1e293b;
      padding: 30px 20px;
      text-align: center;
      font-size: 13px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <nav class="navbar">
    <h2>🎓 IGNOU BCA Academy</h2>
    <ul class="nav-links">
      <li><a href="#departments">Departments</a></li>
      <li><a href="#faculty">Faculty</a></li>
      <li><a href="#admissions">Admissions</a></li>
    </ul>
  </nav>

  <header class="hero">
    <h1>National Campus Portal 2026</h1>
    <p>Empowering Computer Science & Application students with modern industry lab experience.</p>
    <a href="#apply" class="btn-cta">Apply for BCA 2026</a>
  </header>

  <h2 class="section-title" id="departments">Academic Departments</h2>
  <div class="grid">
    <div class="dept-card">
      <h3>Computer Applications (BCA)</h3>
      <p>Full-Stack Web Engineering, Systems Architecture, and Database Systems.</p>
    </div>
    <div class="dept-card">
      <h3>Information Technology</h3>
      <p>Cloud Computing, Linux Administration, and Computer Networking.</p>
    </div>
    <div class="dept-card">
      <h3>Artificial Intelligence</h3>
      <p>Data Science, Computational Statistics, and Machine Learning algorithms.</p>
    </div>
    <div class="dept-card">
      <h3>Cybersecurity</h3>
      <p>Network Defense, Secure Systems Design, and Vulnerability Assessment.</p>
    </div>
  </div>

  <footer>
    <p>© 2026 NextSem IGNOU BCA Study Notes • Authored by Er. Manoj Kumar</p>
  </footer>
</body>
</html>`    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 20: Sprint 2 Capstone Project - Responsive University Campus Portal',
      commands: [
        'mkdir day-20',
        'cd day-20',
        'git add .',
        'git commit -m "Day 20: Sprint 2 Capstone Project - Responsive University Campus Portal"',
        'git push origin main'
      ],
      tips: 'Milestone reached! You have finished Days 1–20 of your BCA Practical Degree journey. Showcase your repository on LinkedIn and WhatsApp!'
    },
    vivaCheck: {
      question: 'What is the primary architectural difference between Flexbox and CSS Grid when building a full website layout?',
      options: [
        'Flexbox is 1-dimensional (content-driven along one axis); CSS Grid is 2-dimensional (layout-driven across rows and columns).',
        'CSS Grid renders strictly on server runtimes; Flexbox is compiled asynchronously during browser DOM hydration cycles.',
        'Flexbox requires JavaScript runtime polyfills on mobile devices; CSS Grid renders natively across all screen sizes.',
        'CSS Grid is restricted to SVG graphic canvases; Flexbox operates exclusively on HTML5 semantic document elements.'
      ],
      correctAnswer: 0,
      explanation: 'Flexbox is designed for 1-dimensional item distribution (like navigation bars or button groups), whereas CSS Grid is designed for 2-dimensional grid layouts (like entire page skeletons and card matrices).'
    }
  },

/* ── DAY 21 ── */
  {
    id: 'day-21',
    day: 21,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'JavaScript Introduction: <script> Tag, Variables (let, const) & Data Types',
    slug: 'day-21-javascript-introduction-variables-data-types',
    category: 'JavaScript Basics',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Beginner',
    objectives: [
      'Embed JavaScript inside HTML using the <script> tag.',
      'Differentiate between const (immutable binding), let (reassignable), and legacy var.',
      'Identify primitive data types: string, number, boolean, null, undefined, symbol.',
      'Print diagnostics to browser DevTools using console.log() and inspect types with typeof.'
    ],
    concept: {
      overview: 'JavaScript is the programming engine of the web. While HTML provides the skeleton and CSS provides the skin, JavaScript provides the nervous system and dynamic brain, enabling computations, user interactions, and DOM modifications.',
      keyPoints: [
        '<script> tag: Connects JavaScript logic to an HTML document, usually before </body>.',
        'const: Use by default for all variables whose reference should not change.',
        'let: Use strictly when you know a variable will be reassigned (e.g. counters, accumulators).',
        'var: Legacy function-scoped declaration from ES5; avoid in modern professional development.',
        'typeof operator: Returns the string description of a value\'s data type.'
      ],
      analogy: 'Think of const like a student ID card number (permanent once issued), let like a whiteboard tally of test scores (erased and rewritten as marks update), and console.log like the airplane black-box cockpit recorder.'
    },
    teacherDemo: {
      title: 'Declaring Variables and Inspecting Types in JavaScript',
      explanation: 'See how const protects values from accidental reassignment while template literals cleanly inject variables into strings.',
      language: 'html',
      code: `<!DOCTYPE html>
<html>
<head><title>Day 21 JavaScript Demo</title></head>
<body>
  <h2>Open Chrome DevTools (F12 -> Console)</h2>
  <script>
    const studentName = "Aarav Sharma";
    const rollNumber = 240101;
    let currentSemester = 1;
    let isEnrolled = true;

    console.log(\`Student: \${studentName} (Roll: \${rollNumber})\`);
    console.log("Type of studentName:", typeof studentName);
    console.log("Type of rollNumber:", typeof rollNumber);
    console.log("Type of isEnrolled:", typeof isEnrolled);
  </script>
</body>
</html>`
    },
    practicalLab: {
      labTitle: 'Day 21 Coding Lab: Student Registry Variable Setup',
      labDescription: 'Declare a permanent student name with const, a variable attendance score with let, and log them using a template literal.',
      language: 'html',
      initialCode: `<!DOCTYPE html>
<html>
<body>
  <h1>Student Registry</h1>
  <script>
    // Task 1: Declare const studentName and let attendanceScore
    
    // Task 2: Log formatted status message using console.log
    
  </script>
</body>
</html>`,
      tasks: [
        {
          id: 'task-1',
          title: 'Declare const studentName and let attendanceScore',
          instruction: 'Declare a const variable named studentName with a string value, and a let variable named attendanceScore with a number value.',
          hint: 'Example: const studentName = "Priya"; let attendanceScore = 92;',
          validatorKeywords: ['const studentname', 'let attendancescore'],
          validatorRegex: 'const\\s+studentName\\s*=[\\s\\S]*?let\\s+attendanceScore\\s*='
        },
        {
          id: 'task-2',
          title: 'Output via console.log',
          instruction: 'Call console.log to print studentName and attendanceScore to the terminal/browser console.',
          hint: 'Example: console.log(studentName, attendanceScore);',
          validatorKeywords: ['console.log', 'studentname'],
          validatorRegex: 'console\\.log\\([\\s\\S]*?studentName[\\s\\S]*?\\)'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Illegal Assignment to Constant Variable',
      buggyCode: `const semesterMarks = 450;
semesterMarks = 475; // Error occurs here
console.log("Updated Marks:", semesterMarks);`,
      bugExplanation: 'Variables declared with const cannot be reassigned. Attempting to assign a new primitive value throws TypeError: Assignment to constant variable.',
      fixedCode: `let semesterMarks = 450;
semesterMarks = 475; // Reassignment succeeds with let
console.log("Updated Marks:", semesterMarks);`
    },
    assignment: {
      title: 'Personal Developer Specification Script',
      instructions: [
        'Create day-21/index.html with valid HTML5 boilerplate.',
        'Declare 5 variables covering string, number, boolean, null, and undefined types.',
        'Use template literals to print a 4-line developer summary to console.log.',
        'Inspect the script in Google Chrome DevTools console and verify zero errors.'
      ],
      submissionCriteria: 'Push your day-21/index.html file with working <script> variables to your GitHub repo.'
,
      fileName: 'developer-spec.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Day 21 - JavaScript Variables & Data Types</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Tahoma, sans-serif;
      background: #0b1120;
      color: white;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    .spec-card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 32px;
      max-width: 480px;
      width: 100%;
    }
    h1 { font-size: 20px; color: #38bdf8; margin-bottom: 12px; }
    pre {
      background: #0f172a;
      padding: 16px;
      border-radius: 8px;
      font-size: 13px;
      color: #34d399;
      white-space: pre-wrap;
    }
  </style>
</head>
<body>
  <div class="spec-card">
    <h1>JavaScript Developer Profile Specification</h1>
    <pre id="output">Loading developer profile variables...</pre>
  </div>

  <script>
    // 1. Declare 5 variables representing core primitive types
    const developerName = "Er. Manoj Kumar";       // String
    const semester = 1;                           // Number
    const isEnrolledBCA = true;                   // Boolean
    const graduationProject = null;               // Null (intentional absence of value)
    let thesisAdvisor;                            // Undefined (unassigned)

    // 2. Format a multiline summary using ES6 Template Literals
    const summary = \`Developer Name: \${developerName}
Semester: Semester \${semester}
Active Enrollment: \${isEnrolledBCA ? "Verified Active" : "Inactive"}
Capstone Project: \${graduationProject === null ? "In Progress (Sprint 1)" : graduationProject}
Thesis Advisor: \${typeof thesisAdvisor} (Assigned in Year 3)\`;

    // 3. Log to browser console and render to DOM
    console.log(summary);
    document.getElementById("output").textContent = summary;
  </script>
</body>
</html>`    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'feat(day-21): add javascript intro variables and data types',
      commands: [
        'mkdir day-21',
        'cd day-21',
        'git checkout -b feature/day-21-js-intro',
        'git add index.html',
        'git commit -m "feat(day-21): add javascript intro variables and data types"',
        'git push origin feature/day-21-js-intro'
      ],
      tips: 'Always check the Console tab in Chrome DevTools (Press F12 or Ctrl+Shift+I) whenever writing JavaScript.'
    },
    vivaCheck: {
      question: 'What is the primary difference between let and const in modern JavaScript (ES6)?',
      options: [
        'let allows variable reassignment; const creates an immutable binding that cannot be reassigned.',
        'const declares variables in global scope; let restricts variables to asynchronous worker threads.',
        'let variables are garbage collected immediately; const variables persist throughout session runtime.',
        'const variables are restricted to primitive numbers; let accommodates dynamic objects and arrays.'
      ],
      correctAnswer: 0,
      explanation: 'const creates an immutable binding (the identifier cannot be reassigned to a different reference/value), whereas let allows the variable identifier to be reassigned new values throughout its scope.'
    }
  },

  /* ── DAY 22 ── */
  {
    id: 'day-22',
    day: 22,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'JavaScript Operators: Arithmetic, Strict Equality (===) & Logical Conditions',
    slug: 'day-22-javascript-operators-strict-equality-logic',
    category: 'JavaScript Basics',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Beginner',
    objectives: [
      'Master arithmetic operations (+, -, *, /, %) and increment/decrement operators.',
      'Understand why strict equality (===) is mandatory over loose equality (==).',
      'Evaluate compound boolean expressions using AND (&&), OR (||), and NOT (!).',
      'Compute university exam percentage scores and verify admission eligibility.'
    ],
    concept: {
      overview: 'Operators allow you to perform calculations and make comparisons in code. In JavaScript, understanding type coercion and the distinction between loose equality (==) and strict equality (===) is fundamental to writing bug-free software.',
      keyPoints: [
        'Arithmetic: Standard math (+, -, *, /) plus modulo (%) for finding remainders.',
        'Strict Equality (===): Compares BOTH value and data type without automatic type conversion.',
        'Loose Equality (==): Performs implicit type coercion (e.g. "5" == 5 evaluates to true!), which leads to security and logic bugs.',
        'Logical AND (&&): Returns true only if both operands evaluate to truthy.',
        'Logical OR (||): Returns true if at least one operand evaluates to truthy.',
        'Logical NOT (!): Inverts the boolean truthiness of an operand.'
      ],
      analogy: 'Loose equality (==) is like an airport gate agent who lets a passenger through because their movie prop paper bill says 100. Strict equality (===) inspects both the printed value AND whether it is real government currency of the expected material.'
    },
    teacherDemo: {
      title: 'Comparing Strict vs Loose Equality & Eligibility Check',
      explanation: 'Notice how "100" == 100 is true, but "100" === 100 is false because string !== number.',
      language: 'html',
      code: `<!DOCTYPE html>
<html>
<body>
  <script>
    const userAge = 19;
    const hasCollegeID = true;

    // Strict equality comparison
    console.log("5 == '5' (Loose):", 5 == '5');     // true (Coerced)
    console.log("5 === '5' (Strict):", 5 === '5');   // false (Different types)

    // Logical condition
    const isEligibleForExam = (userAge >= 18) && hasCollegeID;
    console.log("Eligible for Exam:", isEligibleForExam);
  </script>
</body>
</html>`
    },
    practicalLab: {
      labTitle: 'Day 22 Coding Lab: Exam Eligibility Evaluator',
      labDescription: 'Calculate percentage marks from obtained and total marks, and check if the student passed with strict equality.',
      language: 'html',
      initialCode: `<!DOCTYPE html>
<html>
<body>
  <script>
    const obtainedMarks = 425;
    const totalMarks = 500;
    
    // Task 1: Calculate percentage: (obtainedMarks / totalMarks) * 100
    
    // Task 2: Check eligibility using strict equality and comparison (>= 40)
    
  </script>
</body>
</html>`,
      tasks: [
        {
          id: 'task-1',
          title: 'Calculate percentage score',
          instruction: 'Compute percentage by dividing obtainedMarks by totalMarks, multiplying by 100, and storing in const percentage.',
          hint: 'const percentage = (obtainedMarks / totalMarks) * 100;',
          validatorKeywords: ['percentage', 'obtainedmarks', 'totalmarks'],
          validatorRegex: 'const\\s+percentage\\s*=\\s*\\(?obtainedMarks\\s*\\/\\s*totalMarks\\)?\\s*\\*\\s*100'
        },
        {
          id: 'task-2',
          title: 'Check pass eligibility with comparison',
          instruction: 'Declare const isPassed which evaluates to true if percentage >= 40, and log the result.',
          hint: 'const isPassed = percentage >= 40; console.log(isPassed);',
          validatorKeywords: ['ispassed', 'percentage', '40'],
          validatorRegex: 'const\\s+isPassed\\s*=\\s*percentage\\s*>=\\s*40'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Accidental Single Equals Assignment in Condition',
      buggyCode: `let marks = 35;
if (marks = 100) { // Bug: Single equals assignment instead of comparison!
  console.log("Distinction Student!");
}`,
      bugExplanation: 'Single equals (=) is an assignment operator, not a comparison. (marks = 100) assigns 100 to marks, which evaluates to truthy (100 is truthy), always executing the if block regardless of actual marks.',
      fixedCode: `let marks = 35;
if (marks === 100) { // Fixed: Strict equality comparison
  console.log("Distinction Student!");
} else {
  console.log("Standard Grade.");
}`
    },
    assignment: {
      title: 'Admission Eligibility Calculator Script',
      instructions: [
        'Create day-22/index.html with student test scores.',
        'Implement arithmetic formulas for total, average, and percentage.',
        'Write compound logical conditions: (mathScore >= 60 && physicsScore >= 55 && csScore >= 65).',
        'Print formatted PASS/FAIL criteria to the browser console.'
      ],
      submissionCriteria: 'Ensure your script uses strict equality (===) and proper logical operators.'
,
      fileName: 'eligibility-calculator.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Day 22 - Admission Eligibility Calculator</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Tahoma, sans-serif;
      background: #0b1120;
      color: white;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    .calc-card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 32px;
      max-width: 480px;
      width: 100%;
    }
    h1 { font-size: 20px; color: #38bdf8; margin-bottom: 16px; }
    .result-box {
      background: #0f172a;
      padding: 16px;
      border-radius: 10px;
      font-family: monospace;
      font-size: 13px;
      color: #cbd5e1;
      line-height: 1.8;
    }
    .status { font-weight: bold; font-size: 16px; margin-top: 12px; }
    .pass { color: #10b981; }
    .fail { color: #ef4444; }
  </style>
</head>
<body>
  <div class="calc-card">
    <h1>BCA Admission Eligibility Check</h1>
    <div class="result-box" id="resultBox">Computing eligibility...</div>
  </div>

  <script>
    // Test Scores
    const mathScore = 72;
    const physicsScore = 65;
    const csScore = 88;

    // Arithmetic Formulas
    const totalMarks = mathScore + physicsScore + csScore;
    const maxMarks = 300;
    const average = (totalMarks / 3).toFixed(2);
    const percentage = ((totalMarks / maxMarks) * 100).toFixed(2);

    // Compound Logical Condition
    const isEligible = (mathScore >= 60 && physicsScore >= 55 && csScore >= 65);

    const logOutput = \`Mathematics: \${mathScore}/100
Physics: \${physicsScore}/100
Computer Science: \${csScore}/100
------------------------------
Total: \${totalMarks}/\${maxMarks}
Average: \${average}
Percentage: \${percentage}%\`;

    console.log(logOutput);
    console.log("Admission Status:", isEligible ? "ELIGIBLE FOR ADMISSION" : "NOT ELIGIBLE");

    document.getElementById("resultBox").innerHTML = \`
      <div>\${logOutput.replace(/\\n/g, "<br>")}</div>
      <div class="status \${isEligible ? 'pass' : 'fail'}">
        Status: \${isEligible ? "✓ ELIGIBLE FOR BCA ADMISSION" : "✕ NOT ELIGIBLE"}
      </div>
    \`;
  </script>
</body>
</html>`    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'feat(day-22): implement javascript operators and strict equality',
      commands: [
        'mkdir day-22',
        'cd day-22',
        'git checkout -b feature/day-22-operators',
        'git add index.html',
        'git commit -m "feat(day-22): implement javascript operators and strict equality"',
        'git push origin feature/day-22-operators'
      ],
      tips: 'Never use loose equality == in professional code. Always enforce === with ESLint rules.'
    },
    vivaCheck: {
      question: 'What is the evaluated output of the expression: typeof (5 + "5") in JavaScript?',
      options: [
        '"string"',
        '"number"',
        '10',
        '"NaN"'
      ],
      correctAnswer: 0,
      explanation: 'In JavaScript, the + operator between a number and a string triggers type coercion (string concatenation). 5 + "5" evaluates to "55", and typeof "55" is "string".'
    }
  },

  /* ── DAY 23 ── */
  {
    id: 'day-23',
    day: 23,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'Control Flow: Decision Making with if, else if, else & switch Statements',
    slug: 'day-23-javascript-conditionals-if-else-switch',
    category: 'Control Flow',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Beginner',
    objectives: [
      'Implement multi-branch decision trees using if, else if, and else.',
      'Construct semester grade categorizers (Grade A+, A, B, C, F) based on percentage.',
      'Use switch...case statements with break and default clauses for discrete matching.',
      'Evaluate truthy and falsy values (0, empty string, null, undefined, NaN).'
    ],
    concept: {
      overview: 'Conditional statements direct the flow of program execution based on runtime conditions. When programs evaluate user inputs or calculation outputs, conditionals determine which branch of code executes.',
      keyPoints: [
        'if block: Executes only when its condition expression resolves to truthy.',
        'else if: Tests consecutive mutually exclusive conditions when previous tests fail.',
        'else: Acts as the fallback bucket when all preceding conditions evaluate to false.',
        'switch (val): Compares a value against multiple case clauses using strict equality (===).',
        'break statement: Crucial in switch cases to terminate execution and prevent accidental fall-through.',
        'default clause: The fallback branch in a switch statement if no case matches.'
      ],
      analogy: 'Think of conditional branching like a railway junction switch: based on the destination code signal, the track physically shifts to direct the train down track A, track B, or the main line.'
    },
    teacherDemo: {
      title: 'Grading Engine Using if-else and switch Case',
      explanation: 'See how marks are classified into letter grades, and how a switch evaluates day schedules.',
      language: 'html',
      code: `<!DOCTYPE html>
<html>
<body>
  <script>
    const score = 84;
    let letterGrade = "";

    if (score >= 90) {
      letterGrade = "A+";
    } else if (score >= 75) {
      letterGrade = "A";
    } else if (score >= 60) {
      letterGrade = "B";
    } else {
      letterGrade = "C";
    }
    console.log(\`Score \${score} receives Grade: \${letterGrade}\`);

    // Switch case example
    const dayOfWeek = "Monday";
    switch (dayOfWeek) {
      case "Monday":
        console.log("Schedule: BCA BCS-011 Practical Lab");
        break;
      case "Wednesday":
        console.log("Schedule: Mathematics Tutorial");
        break;
      default:
        console.log("Schedule: Self-Study & Revision");
    }
  </script>
</body>
</html>`
    },
    practicalLab: {
      labTitle: 'Day 23 Coding Lab: Semester Marks Grade Classifier',
      labDescription: 'Write an if-else if-else chain that assigns grade "Distinction" for marks >= 75, "First Class" for >= 60, and "Pass" otherwise.',
      language: 'html',
      initialCode: `<!DOCTYPE html>
<html>
<body>
  <script>
    const marks = 78;
    let award = "";

    // Task 1: Construct if-else if-else chain
    
    // Task 2: Log the final award result
    
  </script>
</body>
</html>`,
      tasks: [
        {
          id: 'task-1',
          title: 'Construct if-else if grading chain',
          instruction: 'Check if marks >= 75 to assign award = "Distinction", else if marks >= 60 to assign award = "First Class", else award = "Pass".',
          hint: 'if (marks >= 75) { award = "Distinction"; } else if (marks >= 60) { award = "First Class"; } else { award = "Pass"; }',
          validatorKeywords: ['if (marks >= 75)', 'else if (marks >= 60)', 'distinction'],
          validatorRegex: 'if\\s*\\(marks\\s*>=\\s*75\\)[\\s\\S]*?award\\s*=\\s*[\'"]Distinction[\'"][\\s\\S]*?else\\s+if'
        },
        {
          id: 'task-2',
          title: 'Output grade to console',
          instruction: 'Log the award variable using console.log.',
          hint: 'console.log(award);',
          validatorKeywords: ['console.log(award)'],
          validatorRegex: 'console\\.log\\([\\s\\S]*?award[\\s\\S]*?\\)'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Missing break in switch Statement (Fall-through)',
      buggyCode: `const role = "student";
let accessLevel = "";

switch (role) {
  case "student":
    accessLevel = "Read Only";
    // Missing break!
  case "admin":
    accessLevel = "Full Access";
    break;
}
console.log("Access Level:", accessLevel); // Prints: Full Access! (Dangerous bug)`,
      bugExplanation: 'Without a break statement, JavaScript execution falls through to subsequent case clauses regardless of whether they match.',
      fixedCode: `const role = "student";
let accessLevel = "";

switch (role) {
  case "student":
    accessLevel = "Read Only";
    break; // Fixed: Exits switch immediately
  case "admin":
    accessLevel = "Full Access";
    break;
}
console.log("Access Level:", accessLevel); // Prints: Read Only`
    },
    assignment: {
      title: 'University Traffic Light / Fee Discount Engine',
      instructions: [
        'Create day-23/index.html with interactive conditional logic.',
        'Implement an enrollment fee discount engine based on student category (General: 0%, OBC: 10%, SC/ST: 25%).',
        'Add input validation ensuring scores fall strictly between 0 and 100.',
        'Use console.log to present a structured receipt summary.'
      ],
      submissionCriteria: 'Ensure the code contains both an if-else if chain and a switch statement.'
,
      fileName: 'fee-engine.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Day 23 - University Fee Discount Engine</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Tahoma, sans-serif;
      background: #0b1120;
      color: white;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    .card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 28px;
      max-width: 480px;
      width: 100%;
    }
    h1 { font-size: 20px; color: #38bdf8; margin-bottom: 12px; }
    .receipt {
      background: #0f172a;
      border: 1px dashed #334155;
      padding: 16px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 13px;
      color: #38bdf8;
      line-height: 1.8;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>BCA Fee Discount Engine</h1>
    <div class="receipt" id="receipt">Generating fee structure receipt...</div>
  </div>

  <script>
    const standardSemesterFee = 7500; // in INR
    const studentCategory = "OBC";     // "General", "OBC", "SC", "ST"
    const meritScore = 85;             // 0 to 100

    let discountPercentage = 0;

    // Switch case for category concession
    switch (studentCategory.toUpperCase()) {
      case "SC":
      case "ST":
        discountPercentage = 25;
        break;
      case "OBC":
        discountPercentage = 10;
        break;
      case "GENERAL":
      default:
        discountPercentage = 0;
        break;
    }

    // Additional merit bonus (if meritScore >= 80, add extra 5%)
    if (meritScore >= 80 && meritScore <= 100) {
      discountPercentage += 5;
    }

    const discountAmount = (standardSemesterFee * discountPercentage) / 100;
    const finalFeePayable = standardSemesterFee - discountAmount;

    const receiptText = \`==================================
   IGNOU BCA SEMESTER 1 FEE RECEIPT
==================================
Base Semester Fee : ₹\${standardSemesterFee}
Student Category  : \${studentCategory}
Merit Score       : \${meritScore}/100
Total Discount    : \${discountPercentage}%
Discount Amount   : -₹\${discountAmount}
----------------------------------
Final Fee Payable : ₹\${finalFeePayable}
==================================\`;

    console.log(receiptText);
    document.getElementById("receipt").innerHTML = receiptText.replace(/\\n/g, "<br>").replace(/ /g, "&nbsp;");
  </script>
</body>
</html>`    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'feat(day-23): add conditional branching and switch statements',
      commands: [
        'mkdir day-23',
        'cd day-23',
        'git checkout -b feature/day-23-conditionals',
        'git add index.html',
        'git commit -m "feat(day-23): add conditional branching and switch statements"',
        'git push origin feature/day-23-conditionals'
      ],
      tips: 'Always remember break statements in switch blocks to prevent security-compromising fall-throughs.'
    },
    vivaCheck: {
      question: 'Which of the following values is NOT falsy in JavaScript?',
      options: [
        'The non-empty string "0" (evaluates to truthy)',
        'The primitive number zero (evaluates to falsy)',
        'The primitive null keyword (evaluates to falsy)',
        'The primitive undefined value (evaluates to falsy)'
      ],
      correctAnswer: 0,
      explanation: 'In JavaScript, any non-empty string is truthy, including "0", "false", and " ". The standard falsy values are false, 0, -0, 0n, "", null, undefined, and NaN.'
    }
  },

  /* ── DAY 24 ── */
  {
    id: 'day-24',
    day: 24,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'Loops & Iteration: for, while, and for...of Statements',
    slug: 'day-24-javascript-loops-iteration-for-while',
    category: 'Control Flow & Algorithms',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Beginner',
    objectives: [
      'Write standard 3-part for loops: initialization, condition, increment.',
      'Understand while loops and prevent infinite loops with reliable exit conditions.',
      'Iterate through collections cleanly using modern for...of syntax.',
      'Calculate cumulative totals, running averages, and generate multiplication tables.'
    ],
    concept: {
      overview: 'Loops automate repetitive tasks by executing a block of code multiple times until a specified termination condition is met. They are the backbone of algorithms, data processing, and DOM rendering.',
      keyPoints: [
        'for loop: Best when the number of iterations is known in advance: for (let i = 0; i < n; i++).',
        'while loop: Best when looping until a condition changes dynamically: while (condition).',
        'for...of: The cleanest modern ES6 way to iterate over iterable items (Arrays, Strings, Sets).',
        'break: Immediately exits the loop regardless of condition.',
        'continue: Skips the remainder of the current iteration and jumps to the next iteration.',
        'Infinite loop trap: Forgetting to increment the loop counter freezes browser tabs.'
      ],
      analogy: 'Think of a for loop like an automatic lap counter on an athletic track: Start at lap 0; check if laps < 10; run one lap; increase count by 1; stop when count reaches 10.'
    },
    teacherDemo: {
      title: 'Calculating Running Sums and Iterating Arrays',
      explanation: 'See how loops calculate running sums and iterate over subject names without repetitive code.',
      language: 'html',
      code: `<!DOCTYPE html>
<html>
<body>
  <script>
    // 1. Classic for loop: Sum 1 to 10
    let totalSum = 0;
    for (let i = 1; i <= 10; i++) {
      totalSum += i;
    }
    console.log("Sum of 1 to 10:", totalSum); // 55

    // 2. Modern for...of loop: Array traversal
    const bcaSubjects = ["Computer Basics", "C Programming", "Discrete Math", "Communication"];
    for (const subject of bcaSubjects) {
      console.log("BCA Subject:", subject);
    }
  </script>
</body>
</html>`
    },
    practicalLab: {
      labTitle: 'Day 24 Coding Lab: Multiplication Table & Array Total Generator',
      labDescription: 'Write a for loop generating the 7-times multiplication table and sum an array of semester credits.',
      language: 'html',
      initialCode: `<!DOCTYPE html>
<html>
<body>
  <script>
    // Task 1: Generate 7-times table from 1 to 10 using a for loop
    
    // Task 2: Calculate total credits using for...of loop
    const credits = [4, 4, 3, 2, 4];
    let totalCredits = 0;
    
  </script>
</body>
</html>`,
      tasks: [
        {
          id: 'task-1',
          title: 'Generate multiplication table with for loop',
          instruction: 'Write a for loop with let i = 1 to i <= 10 printing i * 7 via console.log.',
          hint: 'for (let i = 1; i <= 10; i++) { console.log("7 x " + i + " = " + (i * 7)); }',
          validatorKeywords: ['for (let i = 1', 'i <= 10', 'console.log'],
          validatorRegex: 'for\\s*\\(let\\s+i\\s*=\\s*1\\s*;\\s*i\\s*<=\\s*10\\s*;\\s*i\\+\\+\\)[\\s\\S]*?console\\.log'
        },
        {
          id: 'task-2',
          title: 'Sum credits using for...of loop',
          instruction: 'Iterate over the credits array using for (const credit of credits) and add each to totalCredits.',
          hint: 'for (const c of credits) { totalCredits += c; } console.log(totalCredits);',
          validatorKeywords: ['for (const', 'of credits)', 'totalcredits +='],
          validatorRegex: 'for\\s*\\(const\\s+\\w+\\s+of\\s+credits\\)[\\s\\S]*?totalCredits\\s*\\+='
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: The Fatal Infinite Loop',
      buggyCode: `let count = 5;
while (count > 0) {
  console.log("Count is:", count);
  // Missing: count--;
  // Browser will freeze and crash!
}`,
      bugExplanation: 'Because count is never decremented, count > 0 remains true permanently, resulting in an infinite loop that maxes out CPU and crashes the browser tab.',
      fixedCode: `let count = 5;
while (count > 0) {
  console.log("Count is:", count);
  count--; // Fixed: Ensures termination when count reaches 0
}`
    },
    assignment: {
      title: 'Student Marksheet Statistical Analyzer',
      instructions: [
        'Create day-24/index.html with an array of 6 student test scores.',
        'Use a for loop to calculate the highest score, lowest score, and average marks.',
        'Use a while loop to simulate an exam timer countdown from 10 to 0.',
        'Display all calculated statistics cleanly in the DevTools console.'
      ],
      submissionCriteria: 'Ensure all loops include correct incrementors and exit conditions.'
,
      fileName: 'marks-analyzer.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Day 24 - Student Marksheet Statistical Analyzer</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Tahoma, sans-serif;
      background: #0b1120;
      color: white;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    .analyzer-card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 28px;
      max-width: 500px;
      width: 100%;
    }
    h1 { font-size: 20px; color: #38bdf8; margin-bottom: 12px; }
    pre {
      background: #0f172a;
      padding: 16px;
      border-radius: 8px;
      font-size: 13px;
      color: #34d399;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="analyzer-card">
    <h1>BCA Semester Marks Analyzer</h1>
    <pre id="output">Running statistical loops...</pre>
  </div>

  <script>
    // 6 Semester Subject Scores
    const subjectMarks = [78, 85, 92, 64, 88, 71];

    let sum = 0;
    let highest = subjectMarks[0];
    let lowest = subjectMarks[0];

    // For Loop: Compute statistics
    for (let i = 0; i < subjectMarks.length; i++) {
      const score = subjectMarks[i];
      sum += score;
      if (score > highest) highest = score;
      if (score < lowest) lowest = score;
    }

    const average = (sum / subjectMarks.length).toFixed(2);

    // While Loop: Simulated Exam Timer Countdown
    let timer = 5;
    const countdownSteps = [];
    while (timer > 0) {
      countdownSteps.push(\`Exam Timer: \${timer}s remaining...\`);
      timer--;
    }
    countdownSteps.push("Exam Timer: 0s - Time Up!");

    const result = \`Marks Array: [\${subjectMarks.join(", ")}]
Total Marks Scored: \${sum}/600
Highest Subject Mark: \${highest}
Lowest Subject Mark: \${lowest}
Average Percentage: \${average}%
--------------------------------
\${countdownSteps.join("\\n")}\`;

    console.log(result);
    document.getElementById("output").textContent = result;
  </script>
</body>
</html>`    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'feat(day-24): implement loops and array iteration algorithms',
      commands: [
        'mkdir day-24',
        'cd day-24',
        'git checkout -b feature/day-24-loops',
        'git add index.html',
        'git commit -m "feat(day-24): implement loops and array iteration algorithms"',
        'git push origin feature/day-24-loops'
      ],
      tips: 'Whenever testing while loops, always verify that your loop variable moves toward the exit condition on every iteration.'
    },
    vivaCheck: {
      question: 'What is the main difference between a while loop and a do...while loop?',
      options: [
        'do...while executes its code block at least once before evaluating its termination test condition.',
        'while evaluates its condition asynchronously on a web worker thread while do...while blocks the event loop.',
        'do...while is restricted to traversing iterable collections while while loops operate exclusively on numbers.',
        'while loops automatically deallocate loop variables upon completion whereas do...while retains global scope.'
      ],
      correctAnswer: 0,
      explanation: 'A do...while loop evaluates its test condition at the bottom (post-test), which guarantees that the loop body executes at least once before the condition is verified.'
    }
  },

  /* ── DAY 25 ── */
  {
    id: 'day-25',
    day: 25,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'JavaScript Functions: Declarations, Arrow Syntax, Parameters & Scope',
    slug: 'day-25-javascript-functions-arrow-syntax-scope',
    category: 'Functions & Architecture',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Beginner',
    objectives: [
      'Define reusable logic using function declarations and modern ES6 arrow functions.',
      'Pass arguments to parameters and return computed outputs (pure functions).',
      'Understand lexical scope, block scope, and function scope.',
      'Create utility calculation helpers like calculatePercentage() and getGradeBadge().'
    ],
    concept: {
      overview: 'Functions are the fundamental building blocks of modular programming. Instead of duplicating lines of logic, functions encapsulate actions into reusable, testable subroutines that accept inputs, process data, and return results.',
      keyPoints: [
        'Function Declaration: function name(param1, param2) { return result; } — hoisted in scope.',
        'Arrow Function: const name = (param1, param2) => { return result; } — modern, concise ES6 syntax.',
        'Implicit Return: In single-expression arrow functions, const add = (a, b) => a + b returns automatically without curly braces.',
        'Default Parameters: const greet = (name = "Student") => ... provides fallback values if argument is missing.',
        'Return statement: Immediately halts function execution and hands the output value back to the caller.',
        'Scope: Variables defined inside a function are private to that function and inaccessible from outside.'
      ],
      analogy: 'Think of a function like an automated espresso coffee machine: you insert water and beans (inputs/arguments), it grinds and brews (process), and it hands you a cup of coffee (return value).'
    },
    teacherDemo: {
      title: 'Comparing Function Declarations and Arrow Functions',
      explanation: 'See how both traditional declarations and modern arrow functions perform calculations and return values cleanly.',
      language: 'html',
      code: `<!DOCTYPE html>
<html>
<body>
  <script>
    // 1. Traditional Function Declaration
    function calculateSGPA(gradePoints, totalCredits) {
      if (totalCredits === 0) return 0;
      return (gradePoints / totalCredits).toFixed(2);
    }

    // 2. Modern ES6 Arrow Function
    const isPassingGrade = (score) => score >= 40;

    // 3. Arrow Function with Implicit Return
    const calculatePercentage = (marks, maxMarks) => (marks / maxMarks) * 100;

    console.log("SGPA:", calculateSGPA(82, 10)); // "8.20"
    console.log("Is 45 Passing?", isPassingGrade(45)); // true
    console.log("Percentage:", calculatePercentage(420, 500)); // 84
  </script>
</body>
</html>`
    },
    practicalLab: {
      labTitle: 'Day 25 Coding Lab: Student Grade Calculation Functions',
      labDescription: 'Create a function declaration and an arrow function to compute student marks percentages and pass status.',
      language: 'html',
      initialCode: `<!DOCTYPE html>
<html>
<body>
  <script>
    // Task 1: Create arrow function calculatePercentage(obtained, total)
    
    // Task 2: Create function checkExamStatus(percentage) returning "PASS" or "FAIL"
    
  </script>
</body>
</html>`,
      tasks: [
        {
          id: 'task-1',
          title: 'Create calculatePercentage arrow function',
          instruction: 'Define an arrow function calculatePercentage accepting (obtained, total) and returning (obtained / total) * 100.',
          hint: 'const calculatePercentage = (obtained, total) => (obtained / total) * 100;',
          validatorKeywords: ['calculatepercentage', '=>', 'obtained', 'total'],
          validatorRegex: 'const\\s+calculatePercentage\\s*=\\s*\\(?obtained,\\s*total\\)?\\s*=>'
        },
        {
          id: 'task-2',
          title: 'Create checkExamStatus function',
          instruction: 'Write a function checkExamStatus(pct) that returns "PASS" if pct >= 40, else returns "FAIL".',
          hint: 'function checkExamStatus(pct) { return pct >= 40 ? "PASS" : "FAIL"; }',
          validatorKeywords: ['checkexamstatus', 'return', '40'],
          validatorRegex: 'function\\s+checkExamStatus\\s*\\([\\s\\S]*?\\)[\\s\\S]*?return[\\s\\S]*?40'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Missing Return in Multi-line Arrow Function',
      buggyCode: `const getDiscount = (price) => {
  const discount = price * 0.15;
  // Missing: return discount;
};

const finalDiscount = getDiscount(1000);
console.log("Discount:", finalDiscount); // Prints: undefined!`,
      bugExplanation: 'When an arrow function uses curly braces {}, it requires an explicit return statement. Without return, JavaScript functions return undefined by default.',
      fixedCode: `const getDiscount = (price) => {
  const discount = price * 0.15;
  return discount; // Fixed: Explicitly return the computed value
};

const finalDiscount = getDiscount(1000);
console.log("Discount:", finalDiscount); // Prints: 150`
    },
    assignment: {
      title: 'Universal BCA Marksheet Utility Module',
      instructions: [
        'Create day-25/index.html with modular JavaScript functions.',
        'Write calculatePercentage(marks, total) and getLetterGrade(percentage).',
        'Write formatStudentReport(name, percentage, letterGrade) returning a clean multiline string.',
        'Test the functions with 3 student profiles and log reports to console.'
      ],
      submissionCriteria: 'Ensure all functions return values instead of relying on global side-effects.'
,
      fileName: 'marksheet-util.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Day 25 - Universal Marksheet Utility Module</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Tahoma, sans-serif;
      background: #0b1120;
      color: white;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    .card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 28px;
      max-width: 520px;
      width: 100%;
    }
    h1 { font-size: 20px; color: #38bdf8; margin-bottom: 12px; }
    pre {
      background: #0f172a;
      padding: 16px;
      border-radius: 8px;
      font-size: 13px;
      color: #a5b4fc;
      white-space: pre-wrap;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>BCA Marksheet Generator Functions</h1>
    <pre id="output">Computing student reports...</pre>
  </div>

  <script>
    // 1. Percentage calculator function
    const calculatePercentage = (marks, total) => ((marks / total) * 100).toFixed(1);

    // 2. Letter grade evaluator function
    function getLetterGrade(percentage) {
      if (percentage >= 80) return "A+ (Distinction)";
      if (percentage >= 65) return "A (First Division)";
      if (percentage >= 50) return "B (Second Division)";
      if (percentage >= 40) return "C (Pass)";
      return "F (Needs Improvement)";
    }

    // 3. Multiline report builder function
    function formatStudentReport(name, marks, total) {
      const pct = calculatePercentage(marks, total);
      const grade = getLetterGrade(pct);
      return \`🎓 Student Report: \${name}
   • Score: \${marks}/\${total}
   • Percentage: \${pct}%
   • Final Grade: \${grade}\`;
    }

    // Test with 3 students
    const report1 = formatStudentReport("Raja Roy", 420, 500);
    const report2 = formatStudentReport("Pankaj Sharma", 380, 500);
    const report3 = formatStudentReport("Gauri Patel", 460, 500);

    const fullOutput = [report1, report2, report3].join("\\n\\n--------------------------------\\n\\n");
    console.log(fullOutput);
    document.getElementById("output").textContent = fullOutput;
  </script>
</body>
</html>`    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'feat(day-25): add reusable functions arrow syntax and scope',
      commands: [
        'mkdir day-25',
        'cd day-25',
        'git checkout -b feature/day-25-functions',
        'git add index.html',
        'git commit -m "feat(day-25): add reusable functions arrow syntax and scope"',
        'git push origin feature/day-25-functions'
      ],
      tips: 'Prefer arrow functions for utility callbacks and short calculations, and keep functions small and focused on one task.'
    },
    vivaCheck: {
      question: 'What is the return value of a JavaScript function that does NOT contain a return statement?',
      options: [
        'Returns undefined, indicating the absence of an explicit return value from the function execution.',
        'Returns null, indicating that an empty object reference was automatically instantiated by the engine.',
        'Returns 0, indicating that the function executed successfully to completion without throwing errors.',
        'Returns false, indicating an incomplete truthiness evaluation during lexical evaluation of the body.'
      ],
      correctAnswer: 0,
      explanation: 'In JavaScript, any function that finishes execution without hitting a return statement implicitly returns undefined.'
    }
  },

  /* ── DAY 26 ── */
  {
    id: 'day-26',
    day: 26,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'JavaScript Arrays & Modern Transformation Methods: push, map, filter & reduce',
    slug: 'day-26-javascript-arrays-methods-map-filter',
    category: 'Data Structures',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Create and index arrays of student data.',
      'Add and remove array elements using .push(), .pop(), and .splice().',
      'Transform array items declaratively using .map().',
      'Filter subsets of data using .filter() and aggregate totals with .reduce().'
    ],
    concept: {
      overview: 'Arrays are ordered collections of values. In modern JavaScript, array iteration methods like .map() and .filter() are preferred over imperative for loops because they produce cleaner, declarative code that does not mutate original data.',
      keyPoints: [
        'Zero-indexed: The first element is array[0], length is array.length.',
        '.push(item): Appends item to the end of the array (mutating).',
        '.map(callback): Transforms every item and returns a BRAND NEW array of identical length.',
        '.filter(callback): Tests each item and returns a BRAND NEW array containing only items that pass the truth test.',
        '.reduce(callback, initial): Combines all array items into a single accumulated result (e.g. total sum).',
        'Immutability: Modern React/Node workflows favor .map() and .filter() because they avoid mutating state.'
      ],
      analogy: 'Think of an array like a conveyor belt of exam answer sheets. .map() stamps a grade on every sheet, .filter() picks out only sheets scoring 40 or higher, and .reduce() counts the total marks of all sheets into one ledger.'
    },
    teacherDemo: {
      title: 'Declarative Array Processing with map, filter, and reduce',
      explanation: 'See how in 3 short lines we can filter passing scores, add bonus marks, and calculate the total sum.',
      language: 'html',
      code: `<!DOCTYPE html>
<html>
<body>
  <script>
    const examMarks = [35, 78, 92, 44, 28, 85];

    // 1. Filter: Keep only passing marks (>= 40)
    const passingScores = examMarks.filter(mark => mark >= 40);
    console.log("Passing Scores:", passingScores); // [78, 92, 44, 85]

    // 2. Map: Convert scores to percentages out of 100
    const formattedPercentages = examMarks.map(mark => mark + "%");
    console.log("Formatted:", formattedPercentages);

    // 3. Reduce: Calculate total marks
    const totalMarks = examMarks.reduce((sum, mark) => sum + mark, 0);
    console.log("Total Class Marks:", totalMarks);
  </script>
</body>
</html>`
    },
    practicalLab: {
      labTitle: 'Day 26 Coding Lab: Student Roster Filter & Transform',
      labDescription: 'Use .filter() to extract passing scores (>= 50) and .map() to award 5 bonus grace marks to all students.',
      language: 'html',
      initialCode: `<!DOCTYPE html>
<html>
<body>
  <script>
    const scores = [45, 82, 38, 90, 67, 52];

    // Task 1: Filter passing scores (score >= 50) into const qualifiedScores
    
    // Task 2: Map scores adding 5 bonus marks into const bonusScores
    
  </script>
</body>
</html>`,
      tasks: [
        {
          id: 'task-1',
          title: 'Filter scores >= 50',
          instruction: 'Use scores.filter(score => score >= 50) and store the resulting array in const qualifiedScores.',
          hint: 'const qualifiedScores = scores.filter(s => s >= 50);',
          validatorKeywords: ['qualifiedscores', 'scores.filter', '>= 50'],
          validatorRegex: 'const\\s+qualifiedScores\\s*=\\s*scores\\.filter\\([\\s\\S]*?>=\\s*50[\\s\\S]*?\\)'
        },
        {
          id: 'task-2',
          title: 'Map scores with 5 bonus marks',
          instruction: 'Use scores.map(score => score + 5) and store the resulting array in const bonusScores.',
          hint: 'const bonusScores = scores.map(s => s + 5);',
          validatorKeywords: ['bonusscores', 'scores.map', '+ 5'],
          validatorRegex: 'const\\s+bonusScores\\s*=\\s*scores\\.map\\([\\s\\S]*?\\+\\s*5[\\s\\S]*?\\)'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Confusing .find() with .filter()',
      buggyCode: `const marks = [20, 65, 80, 45];
// Goal: Get all marks >= 40
const passing = marks.find(m => m >= 40); // Bug!
console.log("All passing:", passing); // Prints: 65 (Only the first match!)`,
      bugExplanation: '.find() stops at and returns ONLY the first matching element. To collect ALL matching elements in an array, .filter() must be used.',
      fixedCode: `const marks = [20, 65, 80, 45];
// Fixed: .filter() returns an array with ALL matching elements
const passing = marks.filter(m => m >= 40);
console.log("All passing:", passing); // Prints: [65, 80, 45]`
    },
    assignment: {
      title: 'BCA Course Credits & GPA Aggregator',
      instructions: [
        'Create day-26/index.html with an array of subject score objects: { subject: "BCS-011", marks: 78, credits: 4 }.',
        'Use .filter() to extract high-scoring subjects (marks >= 75).',
        'Use .map() to generate clean HTML list item strings: <li>Subject: Marks</li>.',
        'Use .reduce() to compute the weighted average marks of the student.'
      ],
      submissionCriteria: 'Ensure all array transformations use .map(), .filter(), and .reduce() without traditional for loops.'
,
      fileName: 'credits-aggregator.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Day 26 - Credits & GPA Aggregator (Array Methods)</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Tahoma, sans-serif;
      background: #0b1120;
      color: white;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    .card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 28px;
      max-width: 520px;
      width: 100%;
    }
    h1 { font-size: 20px; color: #38bdf8; margin-bottom: 12px; }
    ul { list-style: none; margin: 16px 0; }
    li { background: #0f172a; padding: 8px 12px; margin-bottom: 6px; border-radius: 6px; font-size: 13px; border-left: 3px solid #10b981; }
    .weighted-box { background: #172554; border: 1px solid #2563eb; padding: 12px; border-radius: 8px; font-weight: bold; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>BCA Semester 1 Honors Aggregator</h1>
    <div style="font-size: 12px; color: #94a3b8;">High-Scoring Subjects (Marks >= 75):</div>
    <ul id="subjectList"></ul>
    <div class="weighted-box" id="weightedGpa"></div>
  </div>

  <script>
    const courses = [
      { code: "BCS-011", name: "Computer Basics", marks: 82, credits: 3 },
      { code: "BCSL-013", name: "PC Software Lab", marks: 90, credits: 2 },
      { code: "BCS-012", name: "Mathematics", marks: 68, credits: 4 },
      { code: "FEG-02", name: "Communication Skills", marks: 76, credits: 3 }
    ];

    // 1. .filter() to extract high-scoring subjects (marks >= 75)
    const honorsCourses = courses.filter(c => c.marks >= 75);

    // 2. .map() to create HTML list items
    const listHtml = honorsCourses
      .map(c => \`<li><strong>\${c.code}</strong> - \${c.name}: \${c.marks}/100 (\${c.credits} Credits)</li>\`)
      .join("");
    document.getElementById("subjectList").innerHTML = listHtml;

    // 3. .reduce() to compute weighted average marks
    const totalWeightedMarks = courses.reduce((acc, c) => acc + (c.marks * c.credits), 0);
    const totalCredits = courses.reduce((acc, c) => acc + c.credits, 0);
    const weightedAvg = (totalWeightedMarks / totalCredits).toFixed(2);

    document.getElementById("weightedGpa").textContent = 
      \`Weighted Semester Average: \${weightedAvg}% across \${totalCredits} total credits\`;
    console.log("Honors courses:", honorsCourses);
    console.log("Weighted average:", weightedAvg);
  </script>
</body>
</html>`    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'feat(day-26): implement array operations with map filter and reduce',
      commands: [
        'mkdir day-26',
        'cd day-26',
        'git checkout -b feature/day-26-arrays',
        'git add index.html',
        'git commit -m "feat(day-26): implement array operations with map filter and reduce"',
        'git push origin feature/day-26-arrays'
      ],
      tips: 'Remember that .map() and .filter() never modify the original array—they return a fresh new array.'
    },
    vivaCheck: {
      question: 'Does the JavaScript Array.prototype.map() method mutate the original array?',
      options: [
        'No, it returns a brand-new array containing transformed items without modifying the original array.',
        'Yes, it mutates the existing array in-place to optimize garbage collection and reduce heap allocation.',
        'Only if elements are primitive types; arrays storing reference objects are preserved immutably.',
        'Yes, unless the caller passes an immutable read-only proxy flag in the optional second parameter.'
      ],
      correctAnswer: 0,
      explanation: 'Array.prototype.map() is a pure non-mutating method: it returns a brand new array populated with the results of calling the provided function on every element in the calling array.'
    }
  },

  /* ── DAY 27 ── */
  {
    id: 'day-27',
    day: 27,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'JavaScript Objects, Nested Data & JSON Serialization Basics',
    slug: 'day-27-javascript-objects-nested-data-json',
    category: 'Data Structures',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Model complex real-world entities using JavaScript object literals { key: value }.',
      'Access and modify properties using dot notation and bracket notation.',
      'Work with nested objects and arrays of objects (APIs dataset format).',
      'Serialize objects to string using JSON.stringify() and deserialize with JSON.parse().'
    ],
    concept: {
      overview: 'Objects are keyed collections of properties and values. Everything in web applications—from user accounts to API responses from servers—is modeled using objects and JSON (JavaScript Object Notation).',
      keyPoints: [
        'Object literal: const obj = { key: "value", age: 20 };',
        'Dot notation: obj.key — convenient when property name is a known valid identifier.',
        'Bracket notation: obj["key"] — required when property name is dynamic or contains special characters/spaces.',
        'JSON.stringify(obj): Converts a JavaScript object into a JSON string suitable for network transfer or localStorage.',
        'JSON.parse(jsonString): Parses a JSON string back into a live JavaScript object.',
        'Object Destructuring: const { name, roll } = student extracts properties directly into standalone variables.'
      ],
      analogy: 'Think of an object like a student physical locker with labeled compartments: one label says "Roll Number", another says "Course", another holds a notebook with "Grades". JSON is like flattening all locker contents into a clean text inventory sheet to mail to university headquarters.'
    },
    teacherDemo: {
      title: 'Creating Student Profile Object and Serializing to JSON',
      explanation: 'See how properties, nested objects, and JSON serialization work together in application data management.',
      language: 'html',
      code: `<!DOCTYPE html>
<html>
<body>
  <script>
    const student = {
      id: "BCA-2026-001",
      name: "Diya Patel",
      semester: 1,
      subjects: ["Computer Basics", "C Programming", "Discrete Mathematics"],
      address: {
        city: "New Delhi",
        pincode: 110001
      }
    };

    console.log("Student Name:", student.name);
    console.log("City:", student.address.city);

    // Convert object to JSON string (Serialization)
    const jsonString = JSON.stringify(student);
    console.log("JSON String:", jsonString);

    // Parse back to object (Deserialization)
    const reconstructed = JSON.parse(jsonString);
    console.log("Reconstructed Name:", reconstructed.name);
  </script>
</body>
</html>`
    },
    practicalLab: {
      labTitle: 'Day 27 Coding Lab: Student Record Object & JSON Serializer',
      labDescription: 'Create a student object with rollNo, name, and isEnrolled, then convert it to a JSON string with JSON.stringify().',
      language: 'html',
      initialCode: `<!DOCTYPE html>
<html>
<body>
  <script>
    // Task 1: Create studentRecord object with rollNo, name, isEnrolled
    
    // Task 2: Serialize studentRecord to JSON using JSON.stringify
    
  </script>
</body>
</html>`,
      tasks: [
        {
          id: 'task-1',
          title: 'Create studentRecord object',
          instruction: 'Define const studentRecord = { rollNo: 101, name: "Kavya", isEnrolled: true };',
          hint: 'const studentRecord = { rollNo: 101, name: "Kavya", isEnrolled: true };',
          validatorKeywords: ['studentrecord', 'rollno:', 'name:', 'isenrolled:'],
          validatorRegex: 'const\\s+studentRecord\\s*=\\s*\\{[\\s\\S]*?rollNo:[\\s\\S]*?name:[\\s\\S]*?isEnrolled:'
        },
        {
          id: 'task-2',
          title: 'Serialize to JSON string',
          instruction: 'Declare const studentJson = JSON.stringify(studentRecord); and log it to console.',
          hint: 'const studentJson = JSON.stringify(studentRecord); console.log(studentJson);',
          validatorKeywords: ['studentjson', 'json.stringify(studentrecord)'],
          validatorRegex: 'const\\s+studentJson\\s*=\\s*JSON\\.stringify\\(studentRecord\\)'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Accessing Undefined Nested Property Crash',
      buggyCode: `const student = {
  name: "Vikram"
  // address property is not defined
};

console.log(student.address.city); // Throws TypeError: Cannot read properties of undefined!`,
      bugExplanation: 'student.address evaluates to undefined. Attempting to access .city on undefined immediately throws an unhandled TypeError: Cannot read properties of undefined.',
      fixedCode: `const student = {
  name: "Vikram"
};

// Fixed using Optional Chaining (?.)
console.log(student.address?.city || "City Not Provided"); // Safely prints fallback without error!`
    },
    assignment: {
      title: 'University Department Course Catalog Object',
      instructions: [
        'Create day-27/index.html with an array of 3 course objects.',
        'Each object must contain code, title, credits, and an instructor nested object.',
        'Use Object destructuring to extract course title and credits.',
        'Store and retrieve the array using JSON.stringify() and JSON.parse().'
      ],
      submissionCriteria: 'Demonstrate proper object creation, nested access, and JSON stringification.'
,
      fileName: 'course-catalog.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Day 27 - Objects & JSON Serialization</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Tahoma, sans-serif;
      background: #0b1120;
      color: white;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    .catalog-card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 28px;
      max-width: 520px;
      width: 100%;
    }
    h1 { font-size: 20px; color: #38bdf8; margin-bottom: 12px; }
    pre {
      background: #0f172a;
      padding: 14px;
      border-radius: 8px;
      font-size: 12px;
      color: #38bdf8;
      overflow-x: auto;
      max-height: 240px;
    }
  </style>
</head>
<body>
  <div class="catalog-card">
    <h1>BCA Department Course Catalog (JSON)</h1>
    <pre id="jsonPreview">Serializing catalog...</pre>
  </div>

  <script>
    // 1. Array of course objects with nested instructor object
    const courseCatalog = [
      {
        code: "BCS-011",
        title: "Computer Basics and PC Software",
        credits: 3,
        instructor: { name: "Er. Manoj Kumar", designation: "Lead Curriculum Architect" }
      },
      {
        code: "BCSL-013",
        title: "Software Lab (Linux & Web Basics)",
        credits: 2,
        instructor: { name: "Pankaj Sharma", designation: "Lab Instructor" }
      },
      {
        code: "BCS-012",
        title: "Basic Mathematics",
        credits: 4,
        instructor: { name: "Dr. Uday Verma", designation: "Mathematics Department" }
      }
    ];

    // 2. Object destructuring
    const [firstCourse] = courseCatalog;
    const { code, title, credits, instructor: { name } } = firstCourse;
    console.log(\`Featured Course: \${code} - \${title} (\${credits} Credits) by \${name}\`);

    // 3. JSON Serialization & Local Storage
    const serialized = JSON.stringify(courseCatalog, null, 2);
    localStorage.setItem("bca_course_catalog", serialized);

    // 4. Retrieve and Parse
    const retrieved = JSON.parse(localStorage.getItem("bca_course_catalog"));
    console.log("Retrieved parsed count:", retrieved.length);

    document.getElementById("jsonPreview").textContent = serialized;
  </script>
</body>
</html>`    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'feat(day-27): add javascript objects and json serialization',
      commands: [
        'mkdir day-27',
        'cd day-27',
        'git checkout -b feature/day-27-objects',
        'git add index.html',
        'git commit -m "feat(day-27): add javascript objects and json serialization"',
        'git push origin feature/day-27-objects'
      ],
      tips: 'JSON keys must always be enclosed in double quotes in standard JSON strings (e.g. {"name": "Aarav"}).'
    },
    vivaCheck: {
      question: 'What is the standard purpose of JSON.stringify() in web applications?',
      options: [
        'To serialize a JavaScript object into a JSON string for network transmission or persistent storage.',
        'To deserialize a JSON text payload received from a remote server into an active JavaScript memory object.',
        'To securely hash and encrypt user credentials before dispatching HTTP payloads across TLS connections.',
        'To transpile modern ECMAScript object syntax into backward-compatible ES5 prototype declarations.'
      ],
      correctAnswer: 0,
      explanation: 'JSON.stringify() serializes a JavaScript value/object into a JSON text string, which is the universal standard format for transmitting data across HTTP network requests and storing in localStorage.'
    }
  },

  /* ── DAY 28 ── */
  {
    id: 'day-28',
    day: 28,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'DOM Selection: querySelector, textContent, innerHTML & Dynamic Styles',
    slug: 'day-28-javascript-dom-selection-manipulation-styles',
    category: 'DOM & Web APIs',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Understand the Document Object Model (DOM) tree architecture.',
      'Target elements with document.querySelector() and document.querySelectorAll().',
      'Modify element text safely with textContent vs innerHTML.',
      'Update inline CSS styles dynamically with element.style and classList.toggle().'
    ],
    concept: {
      overview: 'The Document Object Model (DOM) is an object-oriented tree representation of the webpage. Through the DOM API, JavaScript can inspect, add, remove, and alter HTML tags, attributes, and CSS styling in real-time without reloading the page.',
      keyPoints: [
        'document.querySelector(selector): Returns the FIRST element matching the CSS selector (class, ID, tag).',
        'document.querySelectorAll(selector): Returns a NodeList of ALL matching elements.',
        'textContent: Sets or retrieves plain text safely (immune to XSS script injection).',
        'innerHTML: Parses and renders HTML markup (use cautiously with untrusted input).',
        'element.style.property: Sets inline CSS styles (e.g. element.style.backgroundColor = "blue").',
        'element.classList.add(), remove(), toggle(): Cleanest way to alter appearance by toggling pre-defined CSS classes.'
      ],
      analogy: 'HTML is the static blueprint drawing of a house; the DOM is the physical constructed building with electrical wiring; JavaScript is the resident who can flip light switches, paint walls, and rearrange furniture inside.'
    },
    teacherDemo: {
      title: 'Selecting Elements and Updating Card Status Dynamically',
      explanation: 'See how querySelector targets HTML elements and updates text and background color on the fly.',
      language: 'html',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    .status-card {
      padding: 16px;
      border-radius: 8px;
      background: #f1f5f9;
      font-family: sans-serif;
    }
    .active-badge {
      color: #16a34a;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="status-card">
    <h3 id="student-header">Student Record</h3>
    <p>Status: <span id="status-pill">Pending</span></p>
  </div>

  <script>
    // 1. Select elements
    const header = document.querySelector("#student-header");
    const pill = document.querySelector("#status-pill");

    // 2. Update content and styles
    header.textContent = "Aarav Sharma (BCA 1st Sem)";
    pill.textContent = "Verified & Active";
    pill.classList.add("active-badge");
  </script>
</body>
</html>`
    },
    practicalLab: {
      labTitle: 'Day 28 Coding Lab: Live Status Badge Modifier',
      labDescription: 'Select the heading with querySelector, update its textContent, and modify the badge element style color.',
      language: 'html',
      initialCode: `<!DOCTYPE html>
<html>
<body>
  <h2 id="portal-title">Old Portal Title</h2>
  <span id="badge" style="color: red;">Inactive</span>

  <script>
    // Task 1: Select #portal-title and update its textContent to "Nextsem BCA Hub"
    
    // Task 2: Select #badge, update textContent to "Active", and style.color to "#16a34a"
    
  </script>
</body>
</html>`,
      tasks: [
        {
          id: 'task-1',
          title: 'Update portal-title textContent',
          instruction: 'Select #portal-title with querySelector and update textContent to "Nextsem BCA Hub".',
          hint: 'const title = document.querySelector("#portal-title"); title.textContent = "Nextsem BCA Hub";',
          validatorKeywords: ['queryselector("#portal-title")', 'textcontent', 'nextsem bca hub'],
          validatorRegex: 'document\\.querySelector\\([\'"]#portal-title[\'"]\\)[\\s\\S]*?textContent\\s*=\\s*[\'"]Nextsem BCA Hub[\'"]'
        },
        {
          id: 'task-2',
          title: 'Update badge text and style color',
          instruction: 'Select #badge, update textContent to "Active", and set style.color to "#16a34a".',
          hint: 'const badge = document.querySelector("#badge"); badge.textContent = "Active"; badge.style.color = "#16a34a";',
          validatorKeywords: ['queryselector("#badge")', 'textcontent = "active"', 'style.color'],
          validatorRegex: 'document\\.querySelector\\([\'"]#badge[\'"]\\)[\\s\\S]*?style\\.color\\s*='
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Script Executing Before DOM Element Exists',
      buggyCode: `<head>
  <script>
    // Script runs before <body> is parsed!
    const heading = document.querySelector("#my-heading");
    heading.textContent = "New Title"; // Throws TypeError: Cannot set properties of null
  </script>
</head>
<body>
  <h1 id="my-heading">Original Title</h1>
</body>`,
      bugExplanation: 'The browser executes <script> in <head> immediately before the <body> HTML is parsed, so document.querySelector("#my-heading") returns null.',
      fixedCode: `<body>
  <h1 id="my-heading">Original Title</h1>

  <!-- Fixed: Place <script> right before closing </body> tag -->
  <script>
    const heading = document.querySelector("#my-heading");
    heading.textContent = "New Title"; // Executes successfully
  </script>
</body>`
    },
    assignment: {
      title: 'Interactive University Campus Announcement Banner',
      instructions: [
        'Create day-28/index.html with an announcement card component.',
        'Use document.querySelector() to target card title, date, and priority tag.',
        'Write JavaScript that updates the text and applies dynamic styling based on priority.',
        'Verify in the browser that all DOM updates apply cleanly on initial page load.'
      ],
      submissionCriteria: 'Ensure DOM elements are targeted with querySelector and manipulated using textContent.'
,
      fileName: 'announcement-banner.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Day 28 - DOM Selection & Dynamic Styling</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Tahoma, sans-serif;
      background: #0b1120;
      color: white;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    .wrapper { max-width: 500px; width: 100%; }
    .announcement-card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 24px;
      transition: all 0.3s ease;
    }
    .priority-badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 50px;
      font-size: 11px;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .card-title { font-size: 18px; margin-bottom: 8px; }
    .card-date { font-size: 12px; color: #94a3b8; margin-bottom: 12px; }
    .card-body { font-size: 13px; color: #cbd5e1; line-height: 1.5; }

    /* Dynamic Priority Themes applied via DOM */
    .priority-high {
      border-left: 5px solid #ef4444;
      background: #1c1917;
    }
    .priority-high .priority-badge { background: #ef4444; color: white; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="announcement-card" id="campusCard">
      <span class="priority-badge" id="priorityTag">Normal</span>
      <h2 class="card-title" id="cardTitle">Loading Announcement...</h2>
      <div class="card-date" id="cardDate">--</div>
      <p class="card-body" id="cardBody">Fetching campus records...</p>
    </div>
  </div>

  <script>
    // 1. Select DOM elements using document.querySelector
    const card = document.querySelector("#campusCard");
    const priorityTag = document.querySelector("#priorityTag");
    const cardTitle = document.querySelector("#cardTitle");
    const cardDate = document.querySelector("#cardDate");
    const cardBody = document.querySelector("#cardBody");

    // 2. Data payload
    const notice = {
      title: "BCA 1st Semester Term-End Practical Exam Schedule",
      date: "October 2026 Notification",
      body: "All registered BCA students must push their verified GitHub repositories for Days 1–30 prior to the final laboratory viva examination.",
      priority: "high"
    };

    // 3. Update DOM content dynamically
    cardTitle.textContent = notice.title;
    cardDate.textContent = notice.date;
    cardBody.textContent = notice.body;
    priorityTag.textContent = notice.priority.toUpperCase() + " PRIORITY";

    // 4. Apply dynamic style classes
    if (notice.priority === "high") {
      card.classList.add("priority-high");
    }
  </script>
</body>
</html>`    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'feat(day-28): implement dom selection textcontent and style manipulation',
      commands: [
        'mkdir day-28',
        'cd day-28',
        'git checkout -b feature/day-28-dom-selection',
        'git add index.html',
        'git commit -m "feat(day-28): implement dom selection textcontent and style manipulation"',
        'git push origin feature/day-28-dom-selection'
      ],
      tips: 'Always place <script> tags at the bottom of <body> or use the defer attribute in <head> to prevent null element errors.'
    },
    vivaCheck: {
      question: 'Why is textContent preferred over innerHTML when inserting user-generated text into a webpage?',
      options: [
        'It treats input strictly as raw text, neutralising malicious markup to prevent Cross-Site Scripting (XSS).',
        'It compiles inserted strings directly to bytecode, improving rendering speed compared to innerHTML parsing.',
        'Properties like innerHTML are deprecated in WHATWG specifications and will be removed in future standards.',
        'It enables browser CSS layout engines to calculate typography bounding boxes without reflowing DOM trees.'
      ],
      correctAnswer: 0,
      explanation: 'innerHTML parses strings as HTML markup, meaning malicious users could inject <script> or event handlers (XSS vulnerability). textContent strictly inserts plain text without HTML parsing.'
    }
  },

  /* ── DAY 29 ── */
  {
    id: 'day-29',
    day: 29,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'DOM Events: addEventListener, Click, Input & Form Submission with preventDefault',
    slug: 'day-29-javascript-dom-events-listeners-prevent-default',
    category: 'DOM & Web APIs',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Bind event handlers cleanly using element.addEventListener().',
      'Handle user clicks, real-time typing input events, and form submit events.',
      'Prevent destructive browser default actions using event.preventDefault().',
      'Build interactive widgets like real-time character counters and live text mirrormen.'
    ],
    concept: {
      overview: 'Web applications are event-driven. An event is a signal that something has happened—a button click, a key press, or a form submission. Event listeners listen silently for these user actions and trigger handler functions in response.',
      keyPoints: [
        'element.addEventListener("event", callback): Registers an event handler without overwriting other handlers.',
        '"click" event: Fires when a user clicks with mouse or taps on a touch screen.',
        '"input" event: Fires synchronously every time an input or textarea value changes.',
        '"submit" event: Fires on <form> when the user submits (presses Enter or clicks submit button).',
        'event.preventDefault(): Stops default browser behaviors (such as form submission refreshing the webpage).',
        'Event Object (e): Provides event metadata like e.target.value or e.key.'
      ],
      analogy: 'Think of an event listener like a doorbell chime receiver: it sits quietly waiting for someone to press the physical button (event), and the moment the button is pressed, it rings the indoor chime (handler function).'
    },
    teacherDemo: {
      title: 'Interactive Click Counter and Live Character Counter',
      explanation: 'See how addEventListener handles button clicks and tracks character input in real time.',
      language: 'html',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; }
    .btn { padding: 8px 16px; background: #2563eb; color: #fff; border: none; border-radius: 4px; cursor: pointer; }
  </style>
</head>
<body>
  <h3>Interactive Counter</h3>
  <button id="counter-btn" class="btn">Clicks: <span id="count">0</span></button>

  <h3 style="margin-top: 24px;">Live Feedback Input</h3>
  <input type="text" id="feedback-input" placeholder="Type a message..." style="padding: 8px; width: 260px;" />
  <p>Character count: <span id="char-count">0</span></p>

  <script>
    let clicks = 0;
    const btn = document.querySelector("#counter-btn");
    const countDisplay = document.querySelector("#count");

    btn.addEventListener("click", () => {
      clicks++;
      countDisplay.textContent = clicks;
    });

    const input = document.querySelector("#feedback-input");
    const charDisplay = document.querySelector("#char-count");

    input.addEventListener("input", (e) => {
      charDisplay.textContent = e.target.value.length;
    });
  </script>
</body>
</html>`
    },
    practicalLab: {
      labTitle: 'Day 29 Coding Lab: Form Submission with preventDefault & Feedback Box',
      labDescription: 'Attach an event listener to a form, prevent the default refresh with e.preventDefault(), and display a submission confirmation message.',
      language: 'html',
      initialCode: `<!DOCTYPE html>
<html>
<body>
  <form id="student-form">
    <input type="text" id="student-name" placeholder="Enter student name" required />
    <button type="submit" id="submit-btn">Register</button>
  </form>
  <p id="confirmation" style="display: none;"></p>

  <script>
    const form = document.querySelector("#student-form");
    const confirmation = document.querySelector("#confirmation");

    // Task 1: Attach submit event listener to form and call e.preventDefault()
    
    // Task 2: Display confirmation text and set style.display to "block"
    
  </script>
</body>
</html>`,
      tasks: [
        {
          id: 'task-1',
          title: 'Attach submit listener with preventDefault',
          instruction: 'Add a submit event listener to form that accepts event e and executes e.preventDefault().',
          hint: 'form.addEventListener("submit", (e) => { e.preventDefault(); });',
          validatorKeywords: ['form.addeventlistener("submit"', 'e.preventdefault()'],
          validatorRegex: 'form\\.addEventListener\\([\'"]submit[\'"],[\\s\\S]*?e\\.preventDefault\\(\\)'
        },
        {
          id: 'task-2',
          title: 'Show confirmation message',
          instruction: 'Inside the submit handler, set confirmation.textContent = "Registration Successful!" and confirmation.style.display = "block".',
          hint: 'confirmation.textContent = "Registration Successful!"; confirmation.style.display = "block";',
          validatorKeywords: ['confirmation.textcontent', 'confirmation.style.display = "block"'],
          validatorRegex: 'confirmation\\.textContent\\s*=[\\s\\S]*?confirmation\\.style\\.display\\s*=\\s*[\'"]block[\'"]'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Calling Function Immediately Instead of Passing Reference',
      buggyCode: `function handleButtonClick() {
  console.log("Button clicked!");
}

const btn = document.querySelector("#my-btn");
// Bug: Calling the function with () inside addEventListener!
btn.addEventListener("click", handleButtonClick());`,
      bugExplanation: 'Passing handleButtonClick() with parentheses invokes the function immediately when the line is parsed, passing its return value (undefined) to addEventListener instead of passing the function reference.',
      fixedCode: `function handleButtonClick() {
  console.log("Button clicked!");
}

const btn = document.querySelector("#my-btn");
// Fixed: Pass the function name without () as a callback reference
btn.addEventListener("click", handleButtonClick);`
    },
    assignment: {
      title: 'Interactive Live Note Taker with Character Count',
      instructions: [
        'Create day-29/index.html with a form containing a textarea and submit button.',
        'Add an "input" event listener displaying real-time character count (e.g. 42 / 200).',
        'Change character counter color to red if character count exceeds 180.',
        'Add a submit listener that appends the note as a new paragraph element in the DOM.'
      ],
      submissionCriteria: 'Ensure the form submission does not reload the page and uses e.preventDefault().'
,
      fileName: 'note-taker.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Day 29 - Interactive Live Note Taker</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Tahoma, sans-serif;
      background: #0b1120;
      color: white;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    .note-app {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 28px;
      max-width: 480px;
      width: 100%;
    }
    h1 { font-size: 20px; color: #38bdf8; margin-bottom: 16px; }
    textarea {
      width: 100%;
      height: 100px;
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 8px;
      padding: 12px;
      color: white;
      font-family: inherit;
      font-size: 13px;
      resize: vertical;
      outline: none;
    }
    textarea:focus { border-color: #2563eb; }
    .counter-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 8px 0 16px;
      font-size: 12px;
      color: #94a3b8;
    }
    .warning { color: #ef4444; font-weight: bold; }
    .btn-submit {
      width: 100%;
      padding: 10px;
      background: #2563eb;
      border: none;
      border-radius: 8px;
      color: white;
      font-weight: bold;
      cursor: pointer;
    }
    .notes-list { margin-top: 24px; list-style: none; }
    .note-item {
      background: #0f172a;
      border-left: 3px solid #10b981;
      padding: 10px 14px;
      border-radius: 6px;
      margin-bottom: 8px;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="note-app">
    <h1>BCA Quick Lab Note Taker</h1>
    <form id="noteForm">
      <textarea id="noteInput" maxlength="200" placeholder="Type quick lab notes (max 200 chars)..."></textarea>
      <div class="counter-row">
        <span>Character Count:</span>
        <span id="charCount">0 / 200</span>
      </div>
      <button type="submit" class="btn-submit">Add Note</button>
    </form>

    <ul class="notes-list" id="notesList"></ul>
  </div>

  <script>
    const form = document.getElementById("noteForm");
    const textarea = document.getElementById("noteInput");
    const charCount = document.getElementById("charCount");
    const notesList = document.getElementById("notesList");

    // 1. Input Event: Real-time character counter
    textarea.addEventListener("input", () => {
      const currentLength = textarea.value.length;
      charCount.textContent = \`\${currentLength} / 200\`;
      
      // Color red if exceeds 180 characters
      if (currentLength >= 180) {
        charCount.classList.add("warning");
      } else {
        charCount.classList.remove("warning");
      }
    });

    // 2. Form Submit Event with e.preventDefault()
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = textarea.value.trim();
      if (!text) return;

      // Append new note item to DOM
      const li = document.createElement("li");
      li.className = "note-item";
      li.textContent = text;
      notesList.prepend(li);

      // Reset
      textarea.value = "";
      charCount.textContent = "0 / 200";
      charCount.classList.remove("warning");
    });
  </script>
</body>
</html>`    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'feat(day-29): implement dom event listeners and form preventDefault',
      commands: [
        'mkdir day-29',
        'cd day-29',
        'git checkout -b feature/day-29-events',
        'git add index.html',
        'git commit -m "feat(day-29): implement dom event listeners and form preventDefault"',
        'git push origin feature/day-29-events'
      ],
      tips: 'Never use inline onclick="..." HTML attributes in modern applications; always bind events with element.addEventListener().'
    },
    vivaCheck: {
      question: 'What is the purpose of calling event.preventDefault() inside a form submit event handler?',
      options: [
        'It stops default HTTP form submission and page reloading, allowing JavaScript to handle data in-place.',
        'It clears all input elements in the form and resets validation error indicators to their initial state.',
        'It verifies that required input fields comply with HTML5 constraint validation regular expressions.',
        'It wraps form data in an encrypted SHA-256 binary envelope before transmitting across network sockets.'
      ],
      correctAnswer: 0,
      explanation: 'Standard HTML forms reload the page when submitted. In modern Single Page Applications (SPAs) and interactive apps, e.preventDefault() stops this full page reload so JavaScript can validate and process data in-place.'
    }
  },

  /* ── DAY 30 ── */
  {
    id: 'day-30',
    day: 30,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'Sprint 3 Capstone: Interactive Student SGPA & Grade Portal',
    slug: 'day-30-mini-project-interactive-student-grade-cgpa-portal',
    category: 'Mini Project Capstone',
    estimatedTime: '3 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Assemble HTML5 forms, modern CSS layout, and JavaScript DOM mechanics into a production-grade mini app.',
      'Collect subject marks dynamically from user form inputs and cast strings with Number().',
      'Compute Total Marks, Percentage, SGPA (10-point scale), and Letter Grade.',
      'Dynamically render grade reports in DOM with color-coded Pass/Fail badges.',
      'Deploy the working application to your GitHub repository and personal portfolio.'
    ],
    concept: {
      overview: 'This Sprint 3 Capstone integrates everything learned across Days 21–29 into a complete, interactive Single Page Application. Students build a real-world University Grade & SGPA Evaluation Portal that accepts subject marks, performs calculations, and renders professional report cards dynamically.',
      keyPoints: [
        'Input Type Casting: Values from <input> elements are ALWAYS strings; use Number() or parseFloat() before arithmetic.',
        'Modular Functions: Separate calculation logic (calculateSGPA) from DOM rendering logic (renderReport).',
        'Form Handling: Intercept submissions with e.preventDefault() to update the dashboard instantly.',
        'Dynamic DOM Construction: Create table rows and status pills with template literals or createElement.',
        'UX Polish: Color-code badges: Emerald Green for First Class/Distinction, Red for Fail, Amber for Pass.',
        'Sprint 3 Milestone: Marks the transition from basic scripting to building functional interactive web tools.'
      ],
      analogy: 'Think of this project like the official IGNOU or Delhi University Grade Card web portal: students enter their marks, and the web app automatically computes credits, SGPA, grades, and displays their official term results.'
    },
    teacherDemo: {
      title: 'Complete Interactive Grade Calculator Architecture',
      explanation: 'Study how the HTML form connects to JavaScript calculation logic and updates the DOM dynamically.',
      language: 'html',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #060c18; color: #fff; padding: 24px; }
    .card { background: #0c1328; border: 1px solid #1e293b; padding: 24px; border-radius: 12px; max-width: 500px; margin: auto; }
    input { width: 100%; padding: 10px; margin: 8px 0; background: #060c18; border: 1px solid #334155; color: #fff; border-radius: 6px; box-sizing: border-box; }
    button { width: 100%; padding: 12px; background: #2563eb; color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; margin-top: 10px; }
    .result-box { margin-top: 20px; padding: 16px; border-radius: 8px; background: #1e293b; display: none; }
    .badge-pass { color: #10b981; font-weight: bold; }
    .badge-fail { color: #ef4444; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <h2>🎓 BCA Grade Calculator</h2>
    <form id="grade-form">
      <input type="number" id="sub1" placeholder="BCS-011 Computer Basics Marks" required min="0" max="100" />
      <input type="number" id="sub2" placeholder="BCSL-013 Lab Practical Marks" required min="0" max="100" />
      <button type="submit">Calculate Grade</button>
    </form>
    <div id="results" class="result-box"></div>
  </div>

  <script>
    const form = document.querySelector("#grade-form");
    const results = document.querySelector("#results");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const m1 = Number(document.querySelector("#sub1").value);
      const m2 = Number(document.querySelector("#sub2").value);
      const total = m1 + m2;
      const percentage = (total / 200) * 100;
      const sgpa = (percentage / 9.5).toFixed(2);
      const isPass = m1 >= 40 && m2 >= 40;

      results.style.display = "block";
      results.innerHTML = "<h4>Performance Summary</h4>" +
        "<p>Total Marks: <strong>" + total + " / 200</strong></p>" +
        "<p>Percentage: <strong>" + percentage.toFixed(1) + "%</strong></p>" +
        "<p>Estimated SGPA: <strong>" + sgpa + "</strong></p>" +
        "<p>Status: <span class='" + (isPass ? "badge-pass" : "badge-fail") + "'>" + (isPass ? "PASS ✅" : "FAIL ❌") + "</span></p>";
    });
  </script>
</body>
</html>`
    },
    practicalLab: {
      labTitle: 'Day 30 Coding Lab: Assemble Your University Grade Portal',
      labDescription: 'Construct the form submit listener, compute total marks and percentage with Number(), and inject formatted results into the DOM.',
      language: 'html',
      initialCode: `<!DOCTYPE html>
<html>
<body>
  <form id="calc-form">
    <input type="number" id="m1" placeholder="Subject 1" required />
    <input type="number" id="m2" placeholder="Subject 2" required />
    <button type="submit" id="btn-calc">Compute</button>
  </form>
  <div id="output-box" style="display: none;"></div>

  <script>
    const calcForm = document.querySelector("#calc-form");
    const outputBox = document.querySelector("#output-box");

    // Task 1: Add submit listener, preventDefault, and calculate total & percentage using Number()
    
    // Task 2: Render results into outputBox.innerHTML and set outputBox.style.display = "block"
    
  </script>
</body>
</html>`,
      tasks: [
        {
          id: 'task-1',
          title: 'Calculate total and percentage with Number()',
          instruction: 'In the form submit listener, preventDefault and calculate const total = Number(document.querySelector("#m1").value) + Number(document.querySelector("#m2").value); and const pct = (total / 200) * 100;',
          hint: 'e.preventDefault(); const total = Number(m1.value) + Number(m2.value); const pct = (total / 200) * 100;',
          validatorKeywords: ['e.preventdefault()', 'number(', 'total / 200) * 100'],
          validatorRegex: 'e\\.preventDefault\\(\\)[\\s\\S]*?Number\\([\\s\\S]*?\\)[\\s\\S]*?\\/\\s*200\\s*\\)\\s*\\*\\s*100'
        },
        {
          id: 'task-2',
          title: 'Render output into DOM',
          instruction: 'Set outputBox.style.display = "block" and inject total and percentage into outputBox.innerHTML.',
          hint: 'outputBox.style.display = "block"; outputBox.innerHTML = "<p>Total: " + total + "</p>";',
          validatorKeywords: ['outputbox.style.display = "block"', 'outputbox.innerhtml'],
          validatorRegex: 'outputBox\\.style\\.display\\s*=\\s*[\'"]block[\'"][\\s\\S]*?outputBox\\.innerHTML\\s*='
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: String Concatenation Trap in User Inputs',
      buggyCode: `const score1 = document.querySelector("#s1").value; // e.g. "80"
const score2 = document.querySelector("#s2").value; // e.g. "90"

const total = score1 + score2;
console.log("Total Score:", total); // Prints: "8090" instead of 170!`,
      bugExplanation: 'Values read from HTML <input> elements are always strings. Using + concatenates "80" and "90" into "8090" instead of adding numbers.',
      fixedCode: `const score1 = Number(document.querySelector("#s1").value); // 80
const score2 = Number(document.querySelector("#s2").value); // 90

const total = score1 + score2;
console.log("Total Score:", total); // Fixed: Prints 170 (Mathematical addition)`
    },
    assignment: {
      title: 'Production BCA SGPA & Semester Transcript Portal',
      instructions: [
        'Create day-30/index.html and day-30/styles.css.',
        'Support 4 BCA 1st Semester subjects: Computer Basics, PC Software Lab, Math, and Communication.',
        'Compute overall SGPA, Division (Distinction / 1st / 2nd / Fail), and percentage.',
        'Style with a sleek dark theme (#060c18 background, #0c1328 cards, blue buttons).',
        'Deploy to GitHub Pages or Firebase and verify all interactions run smoothly.'
      ],
      submissionCriteria: 'Submit a clean GitHub repository containing day-30/index.html and day-30/styles.css.'
,
      fileName: 'sgpa-portal.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BCA Day 30 - Production SGPA & Semester Transcript Portal</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Tahoma, sans-serif;
      background: #060c18;
      color: white;
      min-height: 100vh;
      padding: 32px 16px;
    }
    .portal-card {
      max-width: 640px;
      margin: 0 auto;
      background: #0c1328;
      border: 1px solid #1e293b;
      border-radius: 20px;
      padding: 32px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
    }
    h1 { font-size: 22px; color: #38bdf8; margin-bottom: 6px; }
    .sub { font-size: 13px; color: #94a3b8; margin-bottom: 24px; }
    
    .subject-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #070d1e;
      border: 1px solid #1e293b;
      padding: 12px 16px;
      border-radius: 10px;
      margin-bottom: 10px;
    }
    .subject-info div { font-size: 13px; font-weight: bold; }
    .subject-info span { font-size: 11px; color: #64748b; }
    
    input[type="number"] {
      width: 80px;
      padding: 8px;
      background: #0c1328;
      border: 1px solid #334155;
      border-radius: 6px;
      color: white;
      text-align: center;
      font-size: 14px;
      outline: none;
    }
    input[type="number"]:focus { border-color: #2563eb; }

    .btn-calc {
      width: 100%;
      padding: 14px;
      background: #2563eb;
      color: white;
      border: none;
      border-radius: 10px;
      font-weight: 800;
      font-size: 14px;
      cursor: pointer;
      margin-top: 16px;
      transition: background 0.2s ease;
    }
    .btn-calc:hover { background: #1d4ed8; }

    .result-sheet {
      margin-top: 24px;
      padding: 20px;
      background: #070d1e;
      border: 1px dashed #2563eb;
      border-radius: 12px;
      display: none;
    }
    .score-badge { font-size: 24px; font-weight: 800; color: #34d399; }
    .division-text { font-size: 14px; color: #38bdf8; font-weight: bold; margin-top: 4px; }
  </style>
</head>
<body>
  <div class="portal-card">
    <h1>BCA Semester 1 SGPA Calculator</h1>
    <p class="sub">Sprint 3 Capstone • 4 Core Subjects with Real-time Grade Evaluation</p>

    <div class="subject-row">
      <div class="subject-info">
        <div>BCS-011: Computer Basics</div>
        <span>3 Credits</span>
      </div>
      <input type="number" id="m1" value="78" min="0" max="100">
    </div>

    <div class="subject-row">
      <div class="subject-info">
        <div>BCSL-013: PC Software Lab</div>
        <span>2 Credits</span>
      </div>
      <input type="number" id="m2" value="85" min="0" max="100">
    </div>

    <div class="subject-row">
      <div class="subject-info">
        <div>BCS-012: Mathematics</div>
        <span>4 Credits</span>
      </div>
      <input type="number" id="m3" value="70" min="0" max="100">
    </div>

    <div class="subject-row">
      <div class="subject-info">
        <div>FEG-02: Communication Skills</div>
        <span>3 Credits</span>
      </div>
      <input type="number" id="m4" value="75" min="0" max="100">
    </div>

    <button class="btn-calc" onclick="calculateTranscript()">Calculate SGPA &amp; Transcript</button>

    <div class="result-sheet" id="resultSheet">
      <div class="score-badge" id="sgpaVal">--</div>
      <div class="division-text" id="divVal">--</div>
      <div style="font-size: 12px; color: #94a3b8; margin-top: 8px;" id="breakdownVal">--</div>
    </div>
  </div>

  <script>
    function calculateTranscript() {
      const s1 = parseFloat(document.getElementById("m1").value) || 0;
      const s2 = parseFloat(document.getElementById("m2").value) || 0;
      const s3 = parseFloat(document.getElementById("m3").value) || 0;
      const s4 = parseFloat(document.getElementById("m4").value) || 0;

      const credits = [3, 2, 4, 3];
      const marks = [s1, s2, s3, s4];

      const totalCredits = 12;
      let totalWeightedScore = 0;
      let rawTotal = 0;

      for (let i = 0; i < 4; i++) {
        rawTotal += marks[i];
        totalWeightedScore += marks[i] * credits[i];
      }

      const percentage = (rawTotal / 400 * 100).toFixed(1);
      const sgpa = (totalWeightedScore / (totalCredits * 10)).toFixed(2);

      let division = "Fail";
      if (percentage >= 75) division = "First Division with Distinction 🌟";
      else if (percentage >= 60) division = "First Division";
      else if (percentage >= 50) division = "Second Division";
      else if (percentage >= 40) division = "Pass";

      document.getElementById("sgpaVal").textContent = \`SGPA: \${sgpa} / 10.0\`;
      document.getElementById("divVal").textContent = \`Award: \${division}\`;
      document.getElementById("breakdownVal").textContent = 
        \`Total Marks: \${rawTotal}/400 (\${percentage}%) • Total Credits: \${totalCredits}\`;
      document.getElementById("resultSheet").style.display = "block";
    }
  </script>
</body>
</html>`    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'feat(day-30): build sprint 3 capstone interactive student grade portal',
      commands: [
        'mkdir day-30',
        'cd day-30',
        'git checkout -b feature/day-30-capstone-grade-portal',
        'git add index.html styles.css',
        'git commit -m "feat(day-30): build sprint 3 capstone interactive student grade portal"',
        'git push origin feature/day-30-capstone-grade-portal'
      ],
      tips: 'Test edge cases like entering 0 marks, 100 marks, or non-numeric inputs before publishing.'
    },
    vivaCheck: {
      question: 'Why does adding two <input> values directly (inputA.value + inputB.value) often result in unexpected outputs like "5060" instead of 110?',
      options: [
        'input.value is always a String, causing the + operator to perform string concatenation instead of numeric addition.',
        'HTML form inputs store values in UTF-16 hexadecimal byte buffers that require explicit bitwise shifting to parse.',
        'JavaScript engines require imported math modules to perform binary addition operations on strings from DOM nodes.',
        'The browser input validator automatically wraps numeric values inside string quotation marks for sanitization.'
      ],
      correctAnswer: 0,
      explanation: 'The value property of HTML input elements is typed as string. To perform mathematical addition, strings must be explicitly parsed using Number(val), parseInt(val, 10), or parseFloat(val).'
    }
  },

  /* ── DAY 31 ── */
  {
    id: 'day-31',
    day: 31,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'Web Storage Architecture: localStorage, sessionStorage & JSON Serialization',
    slug: 'day-31-web-storage-localstorage-json',
    category: 'Advanced JavaScript & Browser APIs',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Understand client-side storage mechanisms and compare localStorage vs sessionStorage vs cookies.',
      'Store and retrieve string primitives with localStorage.setItem() and localStorage.getItem().',
      'Serialize JavaScript objects and arrays using JSON.stringify() and deserialize with JSON.parse().',
      'Implement a dark/light theme switcher with persistent user preference that survives page reloads.',
      'Handle storage quotas, clearing storage (removeItem/clear), and checking for null values safely.'
    ],
    concept: {
      overview: 'Web Storage APIs provide a modern, secure way to store key-value pairs directly inside the client browser with up to 5MB of storage without expiring on page reload. This lesson teaches you how to serialize complex JavaScript objects and persist user choices seamlessly.',
      keyPoints: [
        'Persistent vs Session: localStorage persists across browser restarts; sessionStorage clears when the tab/window closes.',
        'Key-Value String Only: Web Storage ONLY stores strings. Storing an object directly results in "[object Object]".',
        'JSON Serialization: Always use JSON.stringify(data) when saving and JSON.parse(stored) when retrieving objects or arrays.',
        'Safe Hydration: Always check if the stored item is null before attempting to parse or use it.',
        'Origin-Scoped Security: Web storage is isolated per protocol, domain, and port (Same-Origin Policy).'
      ],
      analogy: 'Think of localStorage like your browser backpack: whenever you close the door (tab/browser) and come back tomorrow, everything you packed inside remains exactly where you left it.'
    },
    teacherDemo: {
      title: 'Persistent Theme & User Profile State Engine',
      explanation: 'See how user theme choices and profile names are serialized to localStorage and re-applied immediately upon page mount.',
      language: 'html',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', sans-serif; transition: background 0.3s, color 0.3s; padding: 24px; }
    body.light { background: #f8fafc; color: #0f172a; }
    body.dark { background: #060c18; color: #ffffff; }
    .card { max-width: 420px; margin: auto; padding: 24px; border-radius: 14px; border: 1px solid #334155; }
    button { padding: 10px 16px; border-radius: 8px; border: none; cursor: pointer; font-weight: bold; margin-top: 10px; }
    .btn-toggle { background: #2563eb; color: #fff; }
    input { width: 100%; padding: 10px; margin: 8px 0; border-radius: 6px; border: 1px solid #475569; box-sizing: border-box; }
  </style>
</head>
<body class="dark">
  <div class="card">
    <h2>🌓 Theme & Storage Manager</h2>
    <p id="welcomeText">Welcome, Guest!</p>
    <input type="text" id="usernameInput" placeholder="Enter your name..." />
    <button id="saveBtn" class="btn-toggle">Save Name to LocalStorage</button>
    <button id="themeBtn" class="btn-toggle" style="background:#04aa6d;">Toggle Theme (☀️/🌙)</button>
    <button id="clearBtn" style="background:#ef4444; color:#fff;">Clear Storage</button>
  </div>

  <script>
    const themeBtn = document.getElementById("themeBtn");
    const saveBtn = document.getElementById("saveBtn");
    const clearBtn = document.getElementById("clearBtn");
    const usernameInput = document.getElementById("usernameInput");
    const welcomeText = document.getElementById("welcomeText");

    // 1. Hydrate state on page load
    const savedTheme = localStorage.getItem("bca_theme") || "dark";
    document.body.className = savedTheme;

    const savedUser = JSON.parse(localStorage.getItem("bca_user"));
    if (savedUser && savedUser.name) {
      welcomeText.textContent = "Welcome back, " + savedUser.name + "!";
      usernameInput.value = savedUser.name;
    }

    // 2. Toggle and persist theme
    themeBtn.addEventListener("click", () => {
      const newTheme = document.body.className === "dark" ? "light" : "dark";
      document.body.className = newTheme;
      localStorage.setItem("bca_theme", newTheme);
    });

    // 3. Serialize and save object
    saveBtn.addEventListener("click", () => {
      const name = usernameInput.value.trim();
      if (!name) return;
      const userProfile = { name: name, lastLogin: new Date().toISOString() };
      localStorage.setItem("bca_user", JSON.stringify(userProfile));
      welcomeText.textContent = "Welcome back, " + name + "!";
    });

    // 4. Clear storage
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem("bca_user");
      welcomeText.textContent = "Welcome, Guest!";
      usernameInput.value = "";
    });
  </script>
</body>
</html>`
    },
    practicalLab: {
      labTitle: 'Building a Persistent Student Preference Manager',
      labDescription: 'Create a web application that stores student settings (favorite programming language, dark/light theme, and student ID) in localStorage and restores them automatically upon page load.',
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <title>Student Preferences</title>
</head>
<body>
  <h1>Student Preferences</h1>
  <input type="text" id="studentName" placeholder="Student Name" />
  <select id="favLanguage">
    <option value="JavaScript">JavaScript</option>
    <option value="C">C Language</option>
    <option value="Python">Python</option>
  </select>
  <button id="savePreferences">Save Preferences</button>
  <p id="statusMsg"></p>

  <script>
    // Your code here: Load from localStorage on load & save with JSON.stringify on click
  </script>
</body>
</html>`,
      language: 'html',
      tasks: [
        {
          id: 't31-1',
          title: 'Hydrate Preferences from LocalStorage',
          instruction: 'Use localStorage.getItem("bca_student_prefs") and JSON.parse() on page load to prefill the input fields if data exists.',
          hint: 'Remember to check if the retrieved value is not null before parsing with JSON.parse().',
          validatorRegex: 'localStorage\\.getItem.*JSON\\.parse'
        },
        {
          id: 't31-2',
          title: 'Serialize and Save Preferences',
          instruction: 'Assemble the input values into an object and save them using localStorage.setItem("bca_student_prefs", JSON.stringify(obj)).',
          hint: 'Pass the storage key as the first argument and JSON.stringify(studentObj) as the second argument.',
          validatorRegex: 'localStorage\\.setItem.*JSON\\.stringify'
        }
      ]
    },
    debuggingChallenge: {
      title: 'The "[object Object]" LocalStorage Corruption Bug',
      buggyCode: `const profile = { name: "Aman", semester: 1 };
localStorage.setItem("student_profile", profile);

// Later in code...
const saved = JSON.parse(localStorage.getItem("student_profile"));
console.log(saved.name); // ❌ SyntaxError: Unexpected token 'o', "[object Object]" is not valid JSON`,
      bugExplanation: 'localStorage only accepts strings. When passing an object directly without JSON.stringify(), JavaScript invokes profile.toString() which converts the object into the literal string "[object Object]". Attempting to JSON.parse("[object Object]") throws a fatal SyntaxError.',
      fixedCode: `const profile = { name: "Aman", semester: 1 };
localStorage.setItem("student_profile", JSON.stringify(profile));

// Later in code...
const raw = localStorage.getItem("student_profile");
if (raw) {
  const saved = JSON.parse(raw);
  console.log(saved.name); // ✅ "Aman"
}`
    },
    assignment: {
      title: 'Interactive Persistent Student Profile & Study Notepad',
      instructions: [
        'Create a responsive student dashboard card with Dark/Light theme toggle.',
        'Include an editable note textarea where student revision notes are auto-saved on every keystroke (input event) into localStorage.',
        'Add a "Reset to Defaults" button that clears localStorage with confirm() verification.',
        'Ensure the application displays an active status badge showing "Saved to LocalStorage" with a timestamp.'
      ],
      submissionCriteria: 'Push index.html and styles.css to your GitHub repo under day-31 folder.',
      fileName: 'index.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>BCA Day 31 - Persistent Study Notepad</title>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #060c18; color: #fff; padding: 24px; transition: all 0.3s; }
    body.light { background: #f8fafc; color: #0f172a; }
    .card { max-width: 540px; margin: 0 auto; background: #0c1328; border: 1px solid #1e293b; border-radius: 12px; padding: 24px; }
    body.light .card { background: #ffffff; border-color: #e2e8f0; }
    textarea { width: 100%; height: 140px; background: #060c18; color: #fff; border: 1px solid #334155; border-radius: 8px; padding: 12px; box-sizing: border-box; }
    body.light textarea { background: #f1f5f9; color: #0f172a; border-color: #cbd5e1; }
    .actions { display: flex; gap: 10px; margin-top: 14px; }
    button { flex: 1; padding: 10px; border-radius: 6px; border: none; font-weight: bold; cursor: pointer; }
    .btn-theme { background: #2563eb; color: #fff; }
    .btn-clear { background: #ef4444; color: #fff; }
    .status { font-size: 12px; color: #10b981; margin-top: 8px; font-weight: bold; }
  </style>
</head>
<body class="dark">
  <div class="card">
    <h2>📓 BCA Persistent Study Notepad</h2>
    <textarea id="notesArea" placeholder="Type your revision notes here... (auto-saved)"></textarea>
    <div class="status" id="saveStatus">Synced with LocalStorage ✅</div>
    <div class="actions">
      <button class="btn-theme" id="themeBtn">🌓 Toggle Theme</button>
      <button class="btn-clear" id="clearBtn">🗑️ Clear Notes</button>
    </div>
  </div>

  <script>
    const notesArea = document.getElementById("notesArea");
    const saveStatus = document.getElementById("saveStatus");
    const themeBtn = document.getElementById("themeBtn");
    const clearBtn = document.getElementById("clearBtn");

    // Hydrate
    notesArea.value = localStorage.getItem("bca_notes") || "";
    const savedTheme = localStorage.getItem("bca_theme") || "dark";
    document.body.className = savedTheme;

    // Auto-save on input
    notesArea.addEventListener("input", () => {
      localStorage.setItem("bca_notes", notesArea.value);
      saveStatus.textContent = "Saved at " + new Date().toLocaleTimeString();
    });

    themeBtn.addEventListener("click", () => {
      const nextTheme = document.body.className === "dark" ? "light" : "dark";
      document.body.className = nextTheme;
      localStorage.setItem("bca_theme", nextTheme);
    });

    clearBtn.addEventListener("click", () => {
      if (confirm("Clear all notes from browser storage?")) {
        localStorage.removeItem("bca_notes");
        notesArea.value = "";
        saveStatus.textContent = "Storage cleared.";
      }
    });
  </script>
</body>
</html>`
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'feat(day-31): implement web storage localstorage json serialization',
      commands: [
        'mkdir day-31',
        'cd day-31',
        'git checkout -b feature/day-31-localstorage',
        'git add index.html',
        'git commit -m "feat(day-31): implement web storage localstorage json serialization"',
        'git push origin feature/day-31-localstorage'
      ],
      tips: 'Always test your app in Chrome Incognito mode to confirm how it behaves when localStorage is initially empty.'
    },
    vivaCheck: {
      question: 'What is the primary difference between localStorage and sessionStorage in modern browsers?',
      options: [
        'localStorage data persists indefinitely until explicitly cleared, while sessionStorage is wiped when the browser tab or session ends.',
        'sessionStorage can store binary buffers up to 50MB, whereas localStorage only stores plain text strings up to 5KB.',
        'localStorage is transmitted automatically to the server with every HTTP request header, while sessionStorage stays local.',
        'sessionStorage encrypts keys with AES-256 before disk writing, while localStorage stores keys unencrypted in RAM.'
      ],
      correctAnswer: 0,
      explanation: 'Both localStorage and sessionStorage store string key-value pairs with a ~5MB limit per origin. The key difference is lifespan: localStorage persists across browser restarts, whereas sessionStorage data is destroyed as soon as the tab or browser session is closed.'
    }
  },

  /* ── DAY 32 ── */
  {
    id: 'day-32',
    day: 32,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'Persistent Task & To-Do List with LocalStorage CRUD Mechanics',
    slug: 'day-32-persistent-todo-app-localstorage-crud',
    category: 'Advanced JavaScript & Browser APIs',
    estimatedTime: '2.5 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Master the full CRUD (Create, Read, Update, Delete) state pattern in vanilla JavaScript.',
      'Maintain an in-memory array of task objects: [{ id, text, completed, createdAt }].',
      'Synchronize the task array to localStorage on every state change using a reusable saveTasks() helper.',
      'Render dynamic task lists with completed strike-through toggling and delete buttons.',
      'Implement task counters showing Total, Active, and Completed task metrics.'
    ],
    concept: {
      overview: 'CRUD is the foundational data manipulation pattern powering all modern software. In this lesson, you will build an interactive Task Manager where creating, toggling completion, and deleting items updates both the in-memory array and localStorage synchronously.',
      keyPoints: [
        'Single Source of Truth: Keep an in-memory JavaScript array as the state; render DOM from this array.',
        'Persistent Mutation: Every time the array is modified (push, filter, map), call saveTasks() immediately.',
        'Unique Identifiers: Use Date.now() or crypto.randomUUID() to give each task a unique ID for robust updates.',
        'Declarative Rendering: Clear the list container (list.innerHTML = "") and reconstruct rows from the array.',
        'Empty State Handling: Display a friendly "No tasks found! Add your first practical assignment" message when the list is empty.'
      ],
      analogy: 'Think of the JavaScript array like a university attendance register: whenever a student is added or marked present, you update the register and immediately stamp it into the permanent archive (localStorage).'
    },
    teacherDemo: {
      title: 'Full CRUD Architecture with LocalStorage Persistence',
      explanation: 'Observe how a single array powers state, rendering, and persistence across all user operations.',
      language: 'html',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #060c18; color: #fff; padding: 20px; }
    .app { max-width: 480px; margin: auto; background: #0c1328; border: 1px solid #1e293b; padding: 20px; border-radius: 12px; }
    .input-row { display: flex; gap: 8px; margin-bottom: 16px; }
    input[type="text"] { flex: 1; padding: 10px; border-radius: 6px; border: 1px solid #334155; background: #060c18; color: #fff; }
    button { padding: 10px 16px; background: #2563eb; color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }
    ul { list-style: none; padding: 0; margin: 0; }
    li { display: flex; align-items: center; justify-content: space-between; padding: 10px; background: #1e293b; margin-bottom: 8px; border-radius: 6px; }
    li.done span { text-decoration: line-through; opacity: 0.6; }
    .del-btn { background: #ef4444; padding: 4px 8px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="app">
    <h3>📋 BCA Assignment Tracker</h3>
    <div class="input-row">
      <input type="text" id="taskInput" placeholder="Add new practical task..." />
      <button id="addBtn">Add</button>
    </div>
    <ul id="taskList"></ul>
  </div>

  <script>
    let tasks = JSON.parse(localStorage.getItem("bca_crud_tasks")) || [];

    function saveAndRender() {
      localStorage.setItem("bca_crud_tasks", JSON.stringify(tasks));
      const list = document.getElementById("taskList");
      list.innerHTML = "";

      if (tasks.length === 0) {
        list.innerHTML = "<li style='justify-content:center;opacity:0.5;'>No assignments pending 🎉</li>";
        return;
      }

      tasks.forEach((t) => {
        const li = document.createElement("li");
        if (t.done) li.classList.add("done");

        li.innerHTML = '<span onclick="toggleTask(' + t.id + ')" style="cursor:pointer;">' + t.text + '</span>' +
          '<button class="del-btn" onclick="deleteTask(' + t.id + ')">Delete</button>';
        list.appendChild(li);
      });
    }

    document.getElementById("addBtn").addEventListener("click", () => {
      const input = document.getElementById("taskInput");
      const text = input.value.trim();
      if (!text) return;
      tasks.push({ id: Date.now(), text, done: false });
      input.value = "";
      saveAndRender();
    });

    window.toggleTask = (id) => {
      tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
      saveAndRender();
    };

    window.deleteTask = (id) => {
      tasks = tasks.filter(t => t.id !== id);
      saveAndRender();
    };

    saveAndRender();
  </script>
</body>
</html>`
    },
    practicalLab: {
      labTitle: 'Implementing LocalStorage Filter Tabs & Task Counter',
      labDescription: 'Extend the Task Manager to calculate and display real-time counters (Total, Active, Done) and filter tasks based on active view pills.',
      initialCode: `<!DOCTYPE html>
<html>
<head><title>BCA Task Tracker</title></head>
<body>
  <h2>Tasks (<span id="totalCount">0</span> total, <span id="doneCount">0</span> completed)</h2>
  <input id="taskInput" type="text" placeholder="Task title..." />
  <button id="addBtn">Add</button>
  <ul id="list"></ul>

  <script>
    // Write code to manage tasks array, save to localStorage, and update metrics
  </script>
</body>
</html>`,
      language: 'html',
      tasks: [
        {
          id: 't32-1',
          title: 'Implement Array Filter for Metrics',
          instruction: 'Calculate done tasks using tasks.filter(t => t.done).length and update the DOM element.',
          hint: 'Array.prototype.filter() returns a new array matching the condition. Check its length.',
          validatorRegex: 'tasks\\.filter.*done'
        },
        {
          id: 't32-2',
          title: 'Delete Task from Array and Sync',
          instruction: 'Implement task deletion using tasks = tasks.filter(t => t.id !== id) followed by localStorage save.',
          hint: 'Filtering out the target ID returns all items except the one being deleted.',
          validatorRegex: 'tasks\\.filter.*id\\s*!==.*localStorage\\.setItem'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Direct Array Mutation Without LocalStorage Re-save Bug',
      buggyCode: `function markAsDone(taskId) {
  const item = tasks.find(t => t.id === taskId);
  if (item) {
    item.done = true; // ✅ In-memory array updated
    renderList();     // ✅ UI updates on screen
    // ❌ Bug: Forgot to re-save to localStorage!
    // When the user reloads the page, task reverts to incomplete!
  }
}`,
      bugExplanation: 'Modifying an in-memory object inside an array does not automatically notify localStorage. You must explicitly invoke localStorage.setItem() whenever state mutations occur, otherwise all changes are lost on page refresh.',
      fixedCode: `function markAsDone(taskId) {
  const item = tasks.find(t => t.id === taskId);
  if (item) {
    item.done = true;
    localStorage.setItem("bca_crud_tasks", JSON.stringify(tasks)); // ✅ Saved!
    renderList();
  }
}`
    },
    assignment: {
      title: 'BCA Semester 1 Practical Sprint Tracker with Priority Badges',
      instructions: [
        'Create a full-featured CRUD Task Manager with Task Title, Subject (BCS-011, BCSL-013, BCS-012), and Priority (High, Medium, Low).',
        'Persist all assignments in localStorage with status toggles.',
        'Add a Search Filter input that filters tasks by name in real-time.',
        'Include a "Clear Completed" button to purge finished assignments.'
      ],
      submissionCriteria: 'Push working index.html and app.js to your GitHub repository under day-32.',
      fileName: 'index.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>BCA Day 32 - Practical Tracker</title>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #060c18; color: #fff; padding: 24px; }
    .card { max-width: 540px; margin: auto; background: #0c1328; border: 1px solid #1e293b; padding: 24px; border-radius: 12px; }
    .form-grid { display: grid; grid-template-columns: 2fr 1fr auto; gap: 8px; margin-bottom: 16px; }
    input, select { padding: 10px; background: #060c18; border: 1px solid #334155; color: #fff; border-radius: 6px; }
    button { padding: 10px 16px; background: #2563eb; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
    .badge { font-size: 11px; padding: 2px 8px; border-radius: 4px; font-weight: bold; }
    .badge-High { background: #ef4444; color: #fff; }
    .badge-Medium { background: #f59e0b; color: #000; }
    .badge-Low { background: #10b981; color: #fff; }
    ul { list-style: none; padding: 0; margin-top: 16px; }
    li { display: flex; align-items: center; justify-content: space-between; padding: 12px; background: #1e293b; margin-bottom: 8px; border-radius: 6px; }
    li.done .title { text-decoration: line-through; opacity: 0.5; }
    .del-btn { background: #dc2626; padding: 4px 8px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="card">
    <h2>🎯 BCA Practical Sprint Tracker</h2>
    <div class="form-grid">
      <input type="text" id="taskTitle" placeholder="Task name..." />
      <select id="priority">
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button id="addBtn">Add Task</button>
    </div>
    <ul id="taskList"></ul>
  </div>

  <script>
    let tasks = JSON.parse(localStorage.getItem("bca_sprint_tasks")) || [];

    function saveAndRender() {
      localStorage.setItem("bca_sprint_tasks", JSON.stringify(tasks));
      const list = document.getElementById("taskList");
      list.innerHTML = "";

      tasks.forEach((t) => {
        const li = document.createElement("li");
        if (t.done) li.classList.add("done");
        li.innerHTML = '<div>' +
          '<input type="checkbox" ' + (t.done ? "checked" : "") + ' onchange="toggleTask(' + t.id + ')" />' +
          '<span class="title" style="margin-left: 8px;">' + t.title + '</span>' +
          '<span class="badge badge-' + t.priority + '">' + t.priority + '</span>' +
          '</div>' +
          '<button class="del-btn" onclick="deleteTask(' + t.id + ')">Delete</button>';
        list.appendChild(li);
      });
    }

    document.getElementById("addBtn").addEventListener("click", () => {
      const titleInput = document.getElementById("taskTitle");
      const priority = document.getElementById("priority").value;
      const title = titleInput.value.trim();
      if (!title) return;
      tasks.push({ id: Date.now(), title, priority, done: false });
      titleInput.value = "";
      saveAndRender();
    });

    window.toggleTask = (id) => {
      tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
      saveAndRender();
    };

    window.deleteTask = (id) => {
      tasks = tasks.filter(t => t.id !== id);
      saveAndRender();
    };

    saveAndRender();
  </script>
</body>
</html>`
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'feat(day-32): build persistent todo app with localstorage crud mechanics',
      commands: [
        'mkdir day-32',
        'cd day-32',
        'git checkout -b feature/day-32-crud-todo',
        'git add index.html',
        'git commit -m "feat(day-32): build persistent todo app with localstorage crud mechanics"',
        'git push origin feature/day-32-crud-todo'
      ],
      tips: 'Use array methods like filter, map, and find to avoid mutating the original array directly.'
    },
    vivaCheck: {
      question: 'Which Array method is best suited to delete an item with id: 101 from an array of task objects without mutating the original array?',
      options: [
        'tasks.filter(task => task.id !== 101)',
        'tasks.map(task => task.id !== 101)',
        'tasks.forEach(task => delete task.id)',
        'tasks.slice(101, 1)'
      ],
      correctAnswer: 0,
      explanation: 'Array.prototype.filter() creates a shallow copy of a portion of a given array, filtered down to just the elements that pass the test implemented by the provided function. Filtering for task.id !== 101 cleanly removes the matching item.'
    }
  },

  /* ── DAY 33 ── */
  {
    id: 'day-33',
    day: 33,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'JavaScript Timers: setTimeout, setInterval & Digital Clock / Countdown Engine',
    slug: 'day-33-javascript-timers-settimeout-setinterval-digital-clock',
    category: 'Advanced JavaScript & Browser APIs',
    estimatedTime: '2.5 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Understand the browser Event Loop, Web APIs, and asynchronous timer queues.',
      'Execute delayed single-shot code execution using setTimeout() and cancel with clearTimeout().',
      'Build recurring interval engines using setInterval() and manage lifecycle with clearInterval().',
      'Format time strings with 2-digit zero padding using String.prototype.padStart(2, "0").',
      'Build a production-grade BCA Examination Countdown Timer with Start, Pause, and Reset controls.'
    ],
    concept: {
      overview: 'Timers in JavaScript enable time-driven execution such as digital clocks, exam countdowns, auto-save engines, and animated sequences. Because JavaScript is single-threaded, timers do not freeze the main thread; rather, they register callbacks with the browser Web API layer.',
      keyPoints: [
        'Asynchronous Non-Blocking: setTimeout and setInterval run asynchronously without locking the UI thread.',
        'Interval ID Reference: setInterval returns a numeric timer ID. Keep this reference to cancel it with clearInterval(timerId).',
        'Stacking Interval Trap: Always clear any existing interval before starting a new one, or clicking "Start" multiple times will create duplicate intervals running in parallel.',
        'Format Padding: Use String(num).padStart(2, "0") to ensure single-digit seconds (5) display cleanly as "05".',
        'State Management: Track running/paused state to toggle button text and prevent timer race conditions.'
      ],
      analogy: 'Think of setTimeout like setting an alarm on your phone: you set it for 10 minutes and continue working freely. When the alarm rings, your phone alerts you without stopping what you were doing.'
    },
    teacherDemo: {
      title: 'Real-Time Digital Clock & Stopwatch Architecture',
      explanation: 'Demonstrating how to format live system time and manage countdown intervals safely.',
      language: 'html',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', monospace; background: #060c18; color: #fff; text-align: center; padding: 40px; }
    .clock-card { max-width: 400px; margin: auto; background: #0c1328; border: 1px solid #1e293b; border-radius: 16px; padding: 24px; }
    .display { font-size: 42px; font-weight: bold; color: #10b981; letter-spacing: 2px; margin: 20px 0; }
    .btn-row { display: flex; gap: 8px; justify-content: center; }
    button { padding: 10px 18px; border-radius: 8px; border: none; font-weight: bold; cursor: pointer; color: #fff; }
    .btn-start { background: #2563eb; }
    .btn-pause { background: #f59e0b; color: #000; }
    .btn-reset { background: #ef4444; }
  </style>
</head>
<body>
  <div class="clock-card">
    <h3>⏱️ Exam Countdown Engine</h3>
    <div class="display" id="timeDisplay">05:00</div>
    <div class="btn-row">
      <button class="btn-start" id="startBtn">Start</button>
      <button class="btn-pause" id="pauseBtn">Pause</button>
      <button class="btn-reset" id="resetBtn">Reset</button>
    </div>
  </div>

  <script>
    let totalSeconds = 300; // 5 minutes
    let timerId = null;

    function renderDisplay() {
      const mins = Math.floor(totalSeconds / 60);
      const secs = totalSeconds % 60;
      document.getElementById("timeDisplay").textContent = 
        String(mins).padStart(2, "0") + ":" + String(secs).padStart(2, "0");
    }

    document.getElementById("startBtn").addEventListener("click", () => {
      if (timerId !== null) return; // Prevent stacking intervals

      timerId = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          renderDisplay();
        } else {
          clearInterval(timerId);
          timerId = null;
          alert("⏰ Time is up! Examination submitted.");
        }
      }, 1000);
    });

    document.getElementById("pauseBtn").addEventListener("click", () => {
      clearInterval(timerId);
      timerId = null;
    });

    document.getElementById("resetBtn").addEventListener("click", () => {
      clearInterval(timerId);
      timerId = null;
      totalSeconds = 300;
      renderDisplay();
    });

    renderDisplay();
  </script>
</body>
</html>`
    },
    practicalLab: {
      labTitle: 'Building a Pomodoro Focus Study Timer',
      labDescription: 'Implement a customizable 25-minute study timer with pause/resume functionality and audio-visual completion alerts.',
      initialCode: `<!DOCTYPE html>
<html>
<head><title>BCA Pomodoro Timer</title></head>
<body>
  <h1 id="timer">25:00</h1>
  <button id="start">Start</button>
  <button id="pause">Pause</button>
  <button id="reset">Reset</button>

  <script>
    // Implement timer with setInterval, padStart, and clearInterval
  </script>
</body>
</html>`,
      language: 'html',
      tasks: [
        {
          id: 't33-1',
          title: 'Format Timer with padStart',
          instruction: 'Use String(seconds).padStart(2, "0") to ensure digits are formatted with leading zeros.',
          hint: 'padStart(2, "0") ensures 4 becomes "04".',
          validatorRegex: 'padStart\\(2,\\s*["\']0["\']\\)'
        },
        {
          id: 't33-2',
          title: 'Implement Clean Interval Cancellation',
          instruction: 'Ensure clearInterval(timerId) is called inside pause and reset handlers and set timerId = null.',
          hint: 'Clearing the interval stops the timer callback from firing again.',
          validatorRegex: 'clearInterval\\(.*\\)'
        }
      ]
    },
    debuggingChallenge: {
      title: 'The Stacking Multiple Intervals Bug',
      buggyCode: `let timer = null;
let seconds = 60;

// Clicking this button 5 times starts 5 intervals!
// Seconds decrease by 5 every second!
document.getElementById("start").addEventListener("click", () => {
  timer = setInterval(() => {
    seconds--;
    console.log(seconds);
  }, 1000);
});`,
      bugExplanation: 'Each click to start creates a new setInterval without clearing the previous one. The previous interval handles continue running in background memory, accelerating the countdown and causing race conditions.',
      fixedCode: `let timer = null;
let seconds = 60;

document.getElementById("start").addEventListener("click", () => {
  // ✅ Clear any active interval first!
  if (timer !== null) {
    clearInterval(timer);
  }

  timer = setInterval(() => {
    seconds--;
    console.log(seconds);
  }, 1000);
});`
    },
    assignment: {
      title: 'BCA Term-End Examination CBT Countdown Engine',
      instructions: [
        'Build a complete 60-minute examination timer interface with hours, minutes, and seconds display.',
        'Change timer display color to Amber at 10 minutes remaining and pulsing Red at 1 minute remaining.',
        'Add a warning popup modal when 5 minutes remain.',
        'Auto-submit and lock the examination when the timer reaches 00:00:00.'
      ],
      submissionCriteria: 'Push index.html and timer.js to GitHub under day-33.',
      fileName: 'index.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>BCA Day 33 - Exam Timer</title>
  <style>
    body { font-family: 'Segoe UI', monospace; background: #060c18; color: #fff; padding: 24px; text-align: center; }
    .card { max-width: 480px; margin: auto; background: #0c1328; border: 1px solid #1e293b; padding: 24px; border-radius: 14px; }
    .timer { font-size: 52px; font-weight: 800; color: #10b981; margin: 20px 0; transition: color 0.3s; }
    .timer.warning { color: #f59e0b; }
    .timer.danger { color: #ef4444; animation: pulse 1s infinite; }
    @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
    .btn-row { display: flex; gap: 8px; justify-content: center; }
    button { padding: 12px 20px; font-weight: bold; border-radius: 8px; border: none; cursor: pointer; color: #fff; }
    .start { background: #2563eb; }
    .pause { background: #64748b; }
    .reset { background: #dc2626; }
  </style>
</head>
<body>
  <div class="card">
    <h2>🎓 BCSL-013 Lab Exam Timer</h2>
    <div class="timer" id="timerDisplay">60:00</div>
    <div class="btn-row">
      <button class="start" id="startBtn">Start Exam</button>
      <button class="pause" id="pauseBtn">Pause</button>
      <button class="reset" id="resetBtn">Reset</button>
    </div>
  </div>

  <script>
    let remaining = 3600; // 60 mins
    let timer = null;
    const display = document.getElementById("timerDisplay");

    function update() {
      const m = Math.floor(remaining / 60);
      const s = remaining % 60;
      display.textContent = String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");

      if (remaining <= 60) {
        display.className = "timer danger";
      } else if (remaining <= 600) {
        display.className = "timer warning";
      } else {
        display.className = "timer";
      }
    }

    document.getElementById("startBtn").addEventListener("click", () => {
      if (timer) return;
      timer = setInterval(() => {
        if (remaining > 0) {
          remaining--;
          update();
        } else {
          clearInterval(timer);
          timer = null;
          alert("🚨 Examination Time Expired! Papers auto-submitted.");
        }
      }, 1000);
    });

    document.getElementById("pauseBtn").addEventListener("click", () => {
      clearInterval(timer);
      timer = null;
    });

    document.getElementById("resetBtn").addEventListener("click", () => {
      clearInterval(timer);
      timer = null;
      remaining = 3600;
      update();
    });

    update();
  </script>
</body>
</html>`
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'feat(day-33): implement javascript timers and exam countdown engine',
      commands: [
        'mkdir day-33',
        'cd day-33',
        'git checkout -b feature/day-33-timers',
        'git add index.html',
        'git commit -m "feat(day-33): implement javascript timers and exam countdown engine"',
        'git push origin feature/day-33-timers'
      ],
      tips: 'Always store timer handles returned by setInterval/setTimeout in variables so they can be canceled.'
    },
    vivaCheck: {
      question: 'Why is setTimeout(callback, 1000) not guaranteed to execute after exactly 1000.000 milliseconds?',
      options: [
        'JavaScript is single-threaded; timer callbacks wait in the Task Queue until the main Call Stack finishes executing synchronous work.',
        'Browser security sandboxes randomly introduce +/- 200ms jitter to prevent side-channel timing attacks.',
        'The DOM renderer throttles timer frequencies to match the monitor 60Hz or 120Hz refresh cycle.',
        'Timer intervals are converted to integer ticks measured exclusively in system CPU clock cycles.'
      ],
      correctAnswer: 0,
      explanation: 'JavaScript operates on a single-threaded Event Loop. When 1000ms elapses, the browser moves the callback to the Task Queue. If the Call Stack is busy executing heavy synchronous JavaScript, the timer callback must wait until the stack clears.'
    }
  },

  /* ── DAY 34 ── */
  {
    id: 'day-34',
    day: 34,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'DOM Event Delegation, Event Bubbling & Dynamic List Architecture',
    slug: 'day-34-dom-event-delegation-bubbling',
    category: 'Advanced JavaScript & Browser APIs',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Master the three phases of DOM event propagation: Capturing, Target, and Bubbling.',
      'Implement Event Delegation by attaching a single event listener to a parent container instead of hundreds of child nodes.',
      'Identify target elements using event.target and locate ancestor components with Element.prototype.closest().',
      'Distinguish between event.target (the element clicked) and event.currentTarget (the element listening).',
      'Optimize web performance and eliminate memory leaks in large dynamic lists.'
    ],
    concept: {
      overview: 'In dynamic web applications, items like comments, chat messages, or table rows are created and removed constantly. Attaching individual event listeners to thousands of elements slows down the browser and wastes memory. Event Delegation solves this by letting events bubble up to a single parent listener.',
      keyPoints: [
        'Event Bubbling: When an element is clicked, the event triggers on the element and then bubbles up through its ancestors all the way to document.',
        'Single Listener: Instead of attaching 100 listeners to 100 buttons, attach 1 listener to the parent <ul> container.',
        'Dynamic Support: Event delegation automatically works for elements added to the DOM in the future without needing re-binding.',
        'element.closest(selector): Traverses ancestors to find the nearest matching element, solving issues when clicking nested <i> icons inside buttons.',
        'e.stopPropagation(): Halts bubbling up the DOM tree when you explicitly do not want parent handlers to fire.'
      ],
      analogy: 'Imagine an apartment building with 100 residents: instead of hiring 100 security guards to stand outside each apartment door, you place one security guard at the main building entrance who checks everyone coming in.'
    },
    teacherDemo: {
      title: 'Event Delegation with Element.prototype.closest()',
      explanation: 'See how a single click handler on the table manages edit, delete, and star actions across all dynamically added rows.',
      language: 'html',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #060c18; color: #fff; padding: 24px; }
    .card { max-width: 500px; margin: auto; background: #0c1328; border: 1px solid #1e293b; padding: 20px; border-radius: 12px; }
    ul { list-style: none; padding: 0; margin-top: 16px; }
    li { display: flex; align-items: center; justify-content: space-between; padding: 10px; background: #1e293b; margin-bottom: 8px; border-radius: 6px; }
    button { padding: 6px 10px; border-radius: 4px; border: none; cursor: pointer; font-weight: bold; }
    .btn-fav { background: #f59e0b; color: #000; margin-right: 6px; }
    .btn-del { background: #ef4444; color: #fff; }
  </style>
</head>
<body>
  <div class="card">
    <h3>👨‍🎓 BCA Student Directory</h3>
    <button id="addStudentBtn" style="background:#2563eb;color:#fff;">+ Add Student</button>
    <ul id="studentList">
      <li data-id="1"><span>Rahul Sharma</span><div><button class="btn-fav">⭐</button><button class="btn-del">Delete</button></div></li>
      <li data-id="2"><span>Priya Patel</span><div><button class="btn-fav">⭐</button><button class="btn-del">Delete</button></div></li>
    </ul>
  </div>

  <script>
    const list = document.getElementById("studentList");

    // ⚡ SINGLE EVENT LISTENER FOR ENTIRE LIST (Event Delegation)
    list.addEventListener("click", (e) => {
      const delBtn = e.target.closest(".btn-del");
      const favBtn = e.target.closest(".btn-fav");

      if (delBtn) {
        const row = delBtn.closest("li");
        const studentId = row.dataset.id;
        console.log("Deleted student with ID:", studentId);
        row.remove();
      }

      if (favBtn) {
        const row = favBtn.closest("li");
        row.style.background = row.style.background === "rgb(4, 170, 109)" ? "#1e293b" : "#04aa6d";
      }
    });

    document.getElementById("addStudentBtn").addEventListener("click", () => {
      const newId = Date.now();
      const li = document.createElement("li");
      li.dataset.id = newId;
      li.innerHTML = '<span>New Student (' + newId.toString().slice(-4) + ')</span><div><button class="btn-fav">⭐</button><button class="btn-del">Delete</button></div>';
      list.appendChild(li);
    });
  </script>
</body>
</html>`
    },
    practicalLab: {
      labTitle: 'Implementing Dynamic Shopping Cart with Event Delegation',
      labDescription: 'Build an interactive cart where clicking + / - / Remove buttons triggers actions via a single parent delegated listener.',
      initialCode: `<!DOCTYPE html>
<html>
<head><title>Event Delegation Lab</title></head>
<body>
  <ul id="cart">
    <li data-id="101"><span>HTML5 Book</span> <button class="btn-qty" data-action="inc">+</button> <span class="qty">1</span> <button class="btn-del">Remove</button></li>
  </ul>

  <script>
    // Bind ONE click listener to #cart using e.target.closest()
  </script>
</body>
</html>`,
      language: 'html',
      tasks: [
        {
          id: 't34-1',
          title: 'Implement e.target.closest Selector',
          instruction: 'Use e.target.closest(".btn-del") to detect if a delete button or any of its child icons were clicked.',
          hint: 'Element.closest() searches the element and its ancestors for a CSS selector.',
          validatorRegex: 'e\\.target\\.closest\\(.*\\)'
        },
        {
          id: 't34-2',
          title: 'Access dataset from Ancestor Element',
          instruction: 'Extract the custom data-id attribute using element.closest("li").dataset.id.',
          hint: 'The dataset property provides read/write access to custom data-* attributes.',
          validatorRegex: '\\.dataset\\.id'
        }
      ]
    },
    debuggingChallenge: {
      title: 'The Nested Icon Inside Button Click Bug',
      buggyCode: `// HTML: <button class="delete-btn"><i class="icon">🗑️</i> Delete</button>

list.addEventListener("click", (e) => {
  // ❌ Bug: If user clicks the <i> icon, e.target is the <i> element, NOT the button!
  if (e.target.className === "delete-btn") {
    e.target.parentElement.remove();
  }
});`,
      bugExplanation: 'When a button has inner elements (like icons or spans), clicking the icon makes e.target refer to the inner element. Checking e.target.className === "delete-btn" fails because e.target is the <i> tag, not the <button>.',
      fixedCode: `list.addEventListener("click", (e) => {
  // ✅ Element.closest() safely traverses up to the button!
  const btn = e.target.closest(".delete-btn");
  if (btn) {
    const row = btn.closest("li");
    if (row) row.remove();
  }
});`
    },
    assignment: {
      title: 'Interactive University Course Syllabus Checklist with Event Delegation',
      instructions: [
        'Build a dynamic syllabus topic checklist with 5 initial subjects.',
        'Use Event Delegation on the container to handle marking topics as Completed, Bookmarked, or Deleted.',
        'Add an "+ Add Topic" input that inserts new checklist items dynamically; verify that new items respond to clicks immediately without re-attaching listeners.',
        'Display live statistics: Total Topics, Completed Topics, and Percentage Complete.'
      ],
      submissionCriteria: 'Push index.html and app.js to your GitHub repository under day-34.',
      fileName: 'index.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>BCA Day 34 - Event Delegation Syllabus</title>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #060c18; color: #fff; padding: 24px; }
    .card { max-width: 520px; margin: auto; background: #0c1328; border: 1px solid #1e293b; padding: 24px; border-radius: 12px; }
    .input-row { display: flex; gap: 8px; margin-bottom: 16px; }
    input { flex: 1; padding: 10px; background: #060c18; border: 1px solid #334155; color: #fff; border-radius: 6px; }
    button { padding: 10px 16px; background: #2563eb; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
    ul { list-style: none; padding: 0; margin-top: 14px; }
    li { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: #1e293b; margin-bottom: 8px; border-radius: 6px; }
    li.done span { text-decoration: line-through; opacity: 0.6; }
    .btn-done { background: #10b981; }
    .btn-del { background: #ef4444; margin-left: 6px; }
  </style>
</head>
<body>
  <div class="card">
    <h2>📚 BCS-011 Syllabus Checklist</h2>
    <div class="input-row">
      <input type="text" id="topicInput" placeholder="Add syllabus unit or chapter..." />
      <button id="addBtn">Add</button>
    </div>
    <ul id="checklist">
      <li data-id="1"><span>Unit 1: Computer Fundamentals</span><div><button class="btn-done">✓</button><button class="btn-del">✕</button></div></li>
      <li data-id="2"><span>Unit 2: Memory & Storage Devices</span><div><button class="btn-done">✓</button><button class="btn-del">✕</button></div></li>
    </ul>
  </div>

  <script>
    const checklist = document.getElementById("checklist");

    // Single Delegated Listener
    checklist.addEventListener("click", (e) => {
      const doneBtn = e.target.closest(".btn-done");
      const delBtn = e.target.closest(".btn-del");

      if (doneBtn) {
        const item = doneBtn.closest("li");
        item.classList.toggle("done");
      }

      if (delBtn) {
        const item = delBtn.closest("li");
        item.remove();
      }
    });

    document.getElementById("addBtn").addEventListener("click", () => {
      const input = document.getElementById("topicInput");
      const text = input.value.trim();
      if (!text) return;

      const li = document.createElement("li");
      li.dataset.id = Date.now();
      li.innerHTML = '<span>' + text + '</span><div><button class="btn-done">✓</button><button class="btn-del">✕</button></div>';
      checklist.appendChild(li);
      input.value = "";
    });
  </script>
</body>
</html>`
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'feat(day-34): implement dom event delegation and bubbling architecture',
      commands: [
        'mkdir day-34',
        'cd day-34',
        'git checkout -b feature/day-34-event-delegation',
        'git add index.html',
        'git commit -m "feat(day-34): implement dom event delegation and bubbling architecture"',
        'git push origin feature/day-34-event-delegation'
      ],
      tips: 'Always use element.closest() in delegated listeners to reliably handle clicks on nested elements like icons.'
    },
    vivaCheck: {
      question: 'What is the main advantage of Event Delegation over adding event listeners directly to individual child elements?',
      options: [
        'It reduces memory consumption by using a single listener and automatically handles future dynamically added children without re-binding.',
        'It forces event execution to bypass the browser Event Loop and run synchronously directly on CPU registers.',
        'It prevents CSS selectors from modifying layout properties during mouse interactions.',
        'It automatically serializes event payloads into encrypted JSON buffers before passing them to listeners.'
      ],
      correctAnswer: 0,
      explanation: 'Event Delegation takes advantage of event bubbling to listen for events on a parent element. This drastically reduces the number of event listeners in memory and automatically handles elements added dynamically in the future.'
    }
  },

  /* ── DAY 35 ── */
  {
    id: 'day-35',
    day: 35,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'Dynamic Modal Dialogs, Overlay Mechanics & Keyboard Accessibility',
    slug: 'day-35-dynamic-modal-dialog-keyboard-accessibility',
    category: 'Advanced JavaScript & Browser APIs',
    estimatedTime: '2.5 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Design full-screen backdrop overlays with CSS fixed positioning and backdrop-filter blur.',
      'Control modal visibility via JavaScript classes (is-open, active) and manage document body scroll locks.',
      'Implement multi-layered dismissal: Close Button click, Backdrop overlay click, and Escape key press.',
      'Trap keyboard focus and prevent event propagation bugs using event.stopPropagation().',
      'Build reusable modal dialog components that accept dynamic titles, content, and callback actions.'
    ],
    concept: {
      overview: 'Modal dialogs are essential UI components for confirmation prompts, authentication gates, image lightboxes, and detail drawers. Crafting professional modals requires careful orchestration of CSS overlays, body scroll prevention, event propagation handling, and keyboard accessibility (ESC key dismissal).',
      keyPoints: [
        'Overlay Architecture: Use position: fixed; inset: 0; z-index: 9999 with a semi-transparent black background (#00000099).',
        'Body Scroll Lock: When the modal opens, set document.body.style.overflow = "hidden" to prevent background scrolling.',
        'stopPropagation(): Backdrop click handlers must avoid closing when users click inside the modal content box.',
        'Keyboard Accessibility: Listen on window for keydown events and dismiss when e.key === "Escape".',
        'ARIA Attributes: Add aria-modal="true" and role="dialog" for screen reader accessibility compliance.'
      ],
      analogy: 'Think of a modal dialog like a spotlight on a theatre stage: the rest of the stage is darkened and muted, directing 100% of the audience attention onto the central scene until the spotlight is turned off.'
    },
    teacherDemo: {
      title: 'Accessible Modal Dialog Architecture with ESC & Backdrop Dismissal',
      explanation: 'Notice how click propagation is controlled and the Escape key listener is registered cleanly.',
      language: 'html',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #060c18; color: #fff; padding: 24px; }
    .backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,0.75);
      backdrop-filter: blur(4px); display: none; align-items: center; justify-content: center;
      z-index: 1000;
    }
    .backdrop.active { display: flex; }
    .modal-box {
      background: #0c1328; border: 1px solid #1e293b; border-radius: 14px;
      padding: 24px; max-width: 440px; width: 90%; box-shadow: 0 20px 40px rgba(0,0,0,0.6);
      transform: scale(0.95); transition: transform 0.2s;
    }
    .backdrop.active .modal-box { transform: scale(1); }
    .modal-header { display: flex; justify-content: space-between; align-items: center; }
    .close-btn { background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer; }
    .modal-footer { margin-top: 20px; display: flex; justify-content: flex-end; gap: 8px; }
    button.primary { background: #2563eb; color: #fff; border: none; padding: 10px 16px; border-radius: 6px; cursor: pointer; }
  </style>
</head>
<body>
  <h2>🎓 BCA Portal Confirmation Engine</h2>
  <button class="primary" id="openModalBtn">Open Submission Modal</button>

  <div class="backdrop" id="modalBackdrop">
    <div class="modal-box" id="modalContent">
      <div class="modal-header">
        <h3>Confirm Practical Submission</h3>
        <button class="close-btn" id="closeBtn">✕</button>
      </div>
      <p style="color:#94a3b8;margin-top:12px;">Are you ready to submit Day 35 practical tasks to the evaluation studio? This action will sync with your profile.</p>
      <div class="modal-footer">
        <button id="cancelBtn" style="background:#334155;color:#fff;border:none;padding:10px 16px;border-radius:6px;cursor:pointer;">Cancel</button>
        <button class="primary" id="confirmBtn">Confirm & Submit</button>
      </div>
    </div>
  </div>

  <script>
    const backdrop = document.getElementById("modalBackdrop");
    const modalContent = document.getElementById("modalContent");
    const openBtn = document.getElementById("openModalBtn");
    const closeBtn = document.getElementById("closeBtn");
    const cancelBtn = document.getElementById("cancelBtn");

    function openModal() {
      backdrop.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent body scroll
    }

    function closeModal() {
      backdrop.classList.remove("active");
      document.body.style.overflow = ""; // Restore body scroll
    }

    openBtn.addEventListener("click", openModal);
    closeBtn.addEventListener("click", closeModal);
    cancelBtn.addEventListener("click", closeModal);

    // Close on backdrop click (outside modal content)
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal();
    });

    // Close on ESC key press
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && backdrop.classList.contains("active")) {
        closeModal();
      }
    });
  </script>
</body>
</html>`
    },
    practicalLab: {
      labTitle: 'Building an Accessible Student Feedback Modal',
      labDescription: 'Implement a feedback modal with animation transitions, Escape key listeners, and body scroll lock.',
      initialCode: `<!DOCTYPE html>
<html>
<head><title>Modal Dialog Lab</title></head>
<body>
  <button id="openFeedback">Give Feedback</button>
  <div id="modal" style="display:none;">
    <div class="box">
      <h2>Feedback</h2>
      <button id="close">Close</button>
    </div>
  </div>

  <script>
    // Implement modal open/close with Escape key listener and body scroll lock
  </script>
</body>
</html>`,
      language: 'html',
      tasks: [
        {
          id: 't35-1',
          title: 'Implement Escape Key Listener',
          instruction: 'Listen for keydown events on window and invoke closeModal() if e.key === "Escape".',
          hint: 'Check if e.key === "Escape" or e.key === "Esc".',
          validatorRegex: 'e\\.key\\s*===.*["\']Escape["\']'
        },
        {
          id: 't35-2',
          title: 'Lock Body Scrolling on Modal Open',
          instruction: 'Set document.body.style.overflow = "hidden" when opening the modal and restore to "" on close.',
          hint: 'Setting overflow to hidden prevents background page scrolling while the modal is visible.',
          validatorRegex: 'document\\.body\\.style\\.overflow\\s*=\\s*["\']hidden["\']'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Backdrop Click Accidentally Triggered Inside Modal Content Bug',
      buggyCode: `const backdrop = document.querySelector(".backdrop");
const box = document.querySelector(".modal-box");

// ❌ Bug: Clicking anywhere inside the modal box triggers backdrop click listener!
backdrop.addEventListener("click", () => {
  closeModal();
});`,
      bugExplanation: 'Because events bubble up from child elements to parent elements, clicking inside the modal box causes the click event to bubble up to the backdrop, immediately closing the modal whenever users try to interact with it.',
      fixedCode: `const backdrop = document.querySelector(".backdrop");

backdrop.addEventListener("click", (e) => {
  // ✅ Only close if the exact element clicked is the backdrop itself!
  if (e.target === backdrop) {
    closeModal();
  }
});`
    },
    assignment: {
      title: 'BCA Student Profile Inspector & Detail View Modal',
      instructions: [
        'Create a student list with 4 student cards displaying Name, Roll Number, and View Details buttons.',
        'Clicking View Details opens a centered modal with animated scale transition displaying complete profile information.',
        'Ensure the modal closes via: ✕ button, Cancel button, Backdrop click, and Escape key.',
        'Prevent background body scrolling when modal is open.'
      ],
      submissionCriteria: 'Push index.html and styles.css to your GitHub repository under day-35.',
      fileName: 'index.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>BCA Day 35 - Profile Modal</title>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #060c18; color: #fff; padding: 24px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; max-width: 680px; margin: auto; }
    .card { background: #0c1328; border: 1px solid #1e293b; padding: 16px; border-radius: 10px; text-align: center; }
    button { padding: 8px 14px; background: #2563eb; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-top: 10px; }
    .backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(4px);
      display: none; align-items: center; justify-content: center; z-index: 1000;
    }
    .backdrop.active { display: flex; }
    .modal { background: #0c1328; border: 1px solid #334155; padding: 24px; border-radius: 12px; width: 90%; max-width: 400px; }
  </style>
</head>
<body>
  <div class="grid">
    <div class="card">
      <h3>Amit Verma</h3>
      <p style="color:#94a3b8;">Roll: BCA-2401</p>
      <button onclick="showDetails('Amit Verma', 'BCA-2401', 'Web Development Track', '94% Attendance')">View Profile</button>
    </div>
    <div class="card">
      <h3>Sneha Gupta</h3>
      <p style="color:#94a3b8;">Roll: BCA-2402</p>
      <button onclick="showDetails('Sneha Gupta', 'BCA-2402', 'Data Analytics Track', '98% Attendance')">View Profile</button>
    </div>
  </div>

  <div class="backdrop" id="modalBackdrop">
    <div class="modal" id="modalBox">
      <h3 id="modalName">Student Details</h3>
      <p id="modalRoll" style="color:#94a3b8;"></p>
      <p id="modalTrack" style="color:#38bdf8;"></p>
      <p id="modalAttendance" style="color:#10b981;font-weight:bold;"></p>
      <button onclick="closeModal()" style="background:#ef4444;width:100%;">Close Modal (Esc)</button>
    </div>
  </div>

  <script>
    const backdrop = document.getElementById("modalBackdrop");

    function showDetails(name, roll, track, att) {
      document.getElementById("modalName").textContent = name;
      document.getElementById("modalRoll").textContent = "Roll Number: " + roll;
      document.getElementById("modalTrack").textContent = "Specialization: " + track;
      document.getElementById("modalAttendance").textContent = att;
      backdrop.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      backdrop.classList.remove("active");
      document.body.style.overflow = "";
    }

    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  </script>
</body>
</html>`
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'feat(day-35): implement dynamic modal dialogs overlay mechanics and keyboard accessibility',
      commands: [
        'mkdir day-35',
        'cd day-35',
        'git checkout -b feature/day-35-modal-dialogs',
        'git add index.html',
        'git commit -m "feat(day-35): implement dynamic modal dialogs overlay mechanics and keyboard accessibility"',
        'git push origin feature/day-35-modal-dialogs'
      ],
      tips: 'Always remember to reset document.body.style.overflow = "" when a modal closes to avoid locking user page scroll.'
    },
    vivaCheck: {
      question: 'Why should document.body.style.overflow be set to "hidden" when an overlay modal opens?',
      options: [
        'To prevent the background webpage from scrolling behind the modal while the student interacts with dialog inputs.',
        'To force the browser GPU to render transparent alpha channels in hardware acceleration mode.',
        'To lock mouse event listeners from dispatching click coordinates to browser extensions.',
        'To encrypt DOM elements beneath the modal from third-party cross-site scripting inspectors.'
      ],
      correctAnswer: 0,
      explanation: 'Setting overflow: hidden on document.body locks background scrolling (scroll trapping), preventing the background webpage from awkwardly jumping or scrolling when the user scrolls inside an active modal dialog.'
    }
  }
  ,

  /* ── DAY 36 ── */
  {
    id: 'day-36',
    day: 36,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'Client-Side Form Validation & Real-Time Regex Diagnostics',
    slug: 'day-36-form-validation-regex-realtime-diagnostics',
    category: 'Advanced JavaScript & Browser APIs',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Implement real-time form validation using input and blur events.',
      'Construct Regular Expressions (RegEx) to validate Email, 10-digit Phone numbers, and Enrollment numbers.',
      'Build dynamic password strength meters checking length, numbers, and special characters.',
      'Manage accessible visual validation states using CSS classes (is-valid, is-invalid) and error hint spans.',
      'Prevent invalid form submissions and provide instant constructive feedback.'
    ],
    concept: {
      overview: 'Form validation protects user experience by identifying input errors before data reaches the server or storage. Real-time validation provides immediate inline feedback, guiding students to enter correctly formatted emails, phone numbers, and strong passwords effortlessly.',
      keyPoints: [
        'input vs change vs blur: input fires on every keystroke; blur fires when the user leaves the field; submit validates all fields.',
        'RegEx Testing: Use regex.test(value) to return a boolean true or false.',
        'Accessible Hints: Pair input fields with descriptive <span class="error-msg"> elements that explain exact requirements.',
        'Prevent Submission: Only proceed with form processing if all field validators return true; otherwise call e.preventDefault().',
        'Visual Clarity: Use Emerald Green borders for valid inputs and Crimson Red for errors.'
      ],
      analogy: 'Think of real-time form validation like a university security guard checking student ID cards at the gate: catching a missing photo or expired sticker at the gate is instant, friendly, and prevents students from having their entry rejected inside the exam hall.'
    },
    teacherDemo: {
      title: 'Real-Time University Enrollment & Email Validator Engine',
      explanation: 'See how regex testing executes on input events to toggle validation classes instantly.',
      language: 'html',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #060c18; color: #fff; padding: 24px; }
    .form-box { max-width: 440px; margin: auto; background: #0c1328; border: 1px solid #1e293b; padding: 24px; border-radius: 12px; }
    .field { margin-bottom: 16px; }
    label { display: block; font-size: 13px; font-weight: bold; margin-bottom: 6px; }
    input { width: 100%; padding: 10px; background: #060c18; border: 1px solid #334155; color: #fff; border-radius: 6px; box-sizing: border-box; }
    input.valid { border-color: #10b981; }
    input.invalid { border-color: #ef4444; }
    .msg { font-size: 11px; margin-top: 4px; display: none; }
    .msg.error { color: #ef4444; display: block; }
    .msg.success { color: #10b981; display: block; }
    button { width: 100%; padding: 12px; background: #2563eb; color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }
  </style>
</head>
<body>
  <div class="form-box">
    <h3>📝 BCA Student Registration</h3>
    <form id="regForm">
      <div class="field">
        <label>Enrollment Number (9 Digits)</label>
        <input type="text" id="enrollInput" placeholder="e.g., 240189421" />
        <span class="msg" id="enrollMsg">Must be exactly 9 digits</span>
      </div>
      <div class="field">
        <label>University Email</label>
        <input type="email" id="emailInput" placeholder="name@university.edu" />
        <span class="msg" id="emailMsg">Enter a valid email address</span>
      </div>
      <button type="submit">Submit Registration</button>
    </form>
  </div>

  <script>
    const enrollInput = document.getElementById("enrollInput");
    const enrollMsg = document.getElementById("enrollMsg");
    const emailInput = document.getElementById("emailInput");
    const emailMsg = document.getElementById("emailMsg");

    const enrollRegex = /^\\d{9}$/;
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

    function validateField(input, msg, regex, errorText) {
      if (regex.test(input.value.trim())) {
        input.className = "valid";
        msg.className = "msg success";
        msg.textContent = "✓ Valid";
        return true;
      } else {
        input.className = "invalid";
        msg.className = "msg error";
        msg.textContent = errorText;
        return false;
      }
    }

    enrollInput.addEventListener("input", () => {
      validateField(enrollInput, enrollMsg, enrollRegex, "Must be exactly 9 digits");
    });

    emailInput.addEventListener("input", () => {
      validateField(emailInput, emailMsg, emailRegex, "Invalid email format");
    });

    document.getElementById("regForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const isEnrollValid = validateField(enrollInput, enrollMsg, enrollRegex, "Must be exactly 9 digits");
      const isEmailValid = validateField(emailInput, emailMsg, emailRegex, "Invalid email format");
      if (isEnrollValid && isEmailValid) {
        alert("Registration Submitted Successfully! 🎉");
      }
    });
  </script>
</body>
</html>`
    },
    practicalLab: {
      labTitle: 'Building a Live Password Strength Meter',
      labDescription: 'Implement real-time password strength diagnostics checking length, uppercase letters, numbers, and symbols.',
      initialCode: `<!DOCTYPE html>
<html>
<head><title>Form Validation Lab</title></head>
<body>
  <input type="password" id="password" placeholder="Enter password..." />
  <div id="strengthMeter">Strength: Weak</div>

  <script>
    // Test password strength with regex and update strength indicator
  </script>
</body>
</html>`,
      language: 'html',
      tasks: [
        {
          id: 't36-1',
          title: 'Implement Regex Character Class Checks',
          instruction: 'Use /[A-Z]/, /[0-9]/, and /[^A-Za-z0-9]/ to test password complexity.',
          hint: 'Regular expression test() method checks if a pattern matches within the string.',
          validatorRegex: '/\\[A-Z\\]/|/\\[0-9\\]/'
        },
        {
          id: 't36-2',
          title: 'Listen on input Event',
          instruction: 'Attach an event listener to the password input for the "input" event for instant feedback.',
          hint: 'The input event fires immediately upon each character change.',
          validatorRegex: '\\.addEventListener\\(["\']input["\']'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Validating Exclusively on Form Submit Bug',
      buggyCode: `// ❌ Bug: User receives zero feedback until they click submit at the very end!
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (email.value.length < 5) {
    alert("Email invalid");
  }
});`,
      bugExplanation: 'Waiting until final form submission to alert users about simple typing errors causes poor UX. Modern applications validate on input or blur to offer immediate visual feedback as users type.',
      fixedCode: `// ✅ Real-time feedback on input + final guard on submit
email.addEventListener("input", () => {
  const isValid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.value);
  email.classList.toggle("invalid", !isValid);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Final verification check...
});`
    },
    assignment: {
      title: 'BCA Semester 1 Exam Admit Card Registration Portal',
      instructions: [
        'Build a complete registration form with Student Name, 9-digit Enrollment Number, Email, 10-digit Phone, and Password.',
        'Validate each field in real-time with visual green/red borders and inline messages.',
        'Display a dynamic Password Strength Meter (Weak, Medium, Strong) with color progress bar.',
        'Disable the Submit button until all 5 fields pass validation.'
      ],
      submissionCriteria: 'Push index.html and validator.js to your GitHub repository under day-36.',
      fileName: 'index.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>BCA Day 36 - Form Validation</title>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #060c18; color: #fff; padding: 24px; }
    .card { max-width: 480px; margin: auto; background: #0c1328; border: 1px solid #1e293b; padding: 24px; border-radius: 12px; }
    .group { margin-bottom: 14px; }
    label { display: block; font-size: 13px; font-weight: bold; margin-bottom: 4px; }
    input { width: 100%; padding: 10px; background: #060c18; border: 1px solid #334155; color: #fff; border-radius: 6px; box-sizing: border-box; }
    input.valid { border-color: #10b981; }
    input.invalid { border-color: #ef4444; }
    .msg { font-size: 11px; color: #ef4444; margin-top: 3px; display: none; }
    .msg.show { display: block; }
    button { width: 100%; padding: 12px; background: #2563eb; color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; margin-top: 10px; }
    button:disabled { background: #334155; cursor: not-allowed; opacity: 0.6; }
  </style>
</head>
<body>
  <div class="card">
    <h2>📋 BCA Admit Card Registration</h2>
    <form id="admitForm">
      <div class="group">
        <label>Full Name</label>
        <input type="text" id="name" placeholder="Rahul Sharma" />
        <span class="msg" id="nameMsg">Name must be at least 3 characters</span>
      </div>
      <div class="group">
        <label>Enrollment Number (9 Digits)</label>
        <input type="text" id="enroll" placeholder="240189211" />
        <span class="msg" id="enrollMsg">Must be exactly 9 digits</span>
      </div>
      <div class="group">
        <label>10-Digit Mobile Number</label>
        <input type="tel" id="phone" placeholder="9876543210" />
        <span class="msg" id="phoneMsg">Must be a valid 10-digit mobile number</span>
      </div>
      <button type="submit" id="submitBtn">Generate Admit Card</button>
    </form>
  </div>

  <script>
    const nameInput = document.getElementById("name");
    const enrollInput = document.getElementById("enroll");
    const phoneInput = document.getElementById("phone");
    const submitBtn = document.getElementById("submitBtn");

    function check() {
      const isName = nameInput.value.trim().length >= 3;
      const isEnroll = /^\\d{9}$/.test(enrollInput.value.trim());
      const isPhone = /^[6-9]\\d{9}$/.test(phoneInput.value.trim());

      nameInput.className = isName ? "valid" : (nameInput.value ? "invalid" : "");
      document.getElementById("nameMsg").className = isName || !nameInput.value ? "msg" : "msg show";

      enrollInput.className = isEnroll ? "valid" : (enrollInput.value ? "invalid" : "");
      document.getElementById("enrollMsg").className = isEnroll || !enrollInput.value ? "msg" : "msg show";

      phoneInput.className = isPhone ? "valid" : (phoneInput.value ? "invalid" : "");
      document.getElementById("phoneMsg").className = isPhone || !phoneInput.value ? "msg" : "msg show";

      submitBtn.disabled = !(isName && isEnroll && isPhone);
    }

    [nameInput, enrollInput, phoneInput].forEach(inp => inp.addEventListener("input", check));

    document.getElementById("admitForm").addEventListener("submit", (e) => {
      e.preventDefault();
      alert("✅ Admit Card Generated for " + nameInput.value);
    });

    check();
  </script>
</body>
</html>`
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'feat(day-36): implement client-side form validation and regex diagnostics',
      commands: [
        'mkdir day-36',
        'cd day-36',
        'git checkout -b feature/day-36-form-validation',
        'git add index.html',
        'git commit -m "feat(day-36): implement client-side form validation and regex diagnostics"',
        'git push origin feature/day-36-form-validation'
      ],
      tips: 'Use regex anchors like ^ and $ to ensure the pattern matches the entire string rather than just a substring.'
    },
    vivaCheck: {
      question: 'In the regular expression /^\\d{10}$/, what do the ^ and $ symbols signify?',
      options: [
        '^ asserts the start of the string, and $ asserts the end of the string, ensuring the entire input is exactly 10 digits.',
        '^ instructs the engine to match alphanumeric characters, while $ targets hexadecimal floating points.',
        '^ matches any whitespace character, while $ replaces special characters with null pointers.',
        '^ forces uppercase transformation, while $ compresses string length.'
      ],
      correctAnswer: 0,
      explanation: 'The ^ symbol is the start-of-string anchor and $ is the end-of-string anchor. Without them, /\\d{10}/ would match any string containing 10 consecutive digits anywhere inside, even if surrounded by invalid text.'
    }
  },

  /* ── DAY 37 ── */
  {
    id: 'day-37',
    day: 37,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'Asynchronous JavaScript: Callbacks, Promises & Promise Chaining',
    slug: 'day-37-async-javascript-callbacks-promises',
    category: 'Advanced JavaScript & Browser APIs',
    estimatedTime: '2.5 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Understand synchronous blocking vs asynchronous non-blocking programming models.',
      'Identify the Callback Hell pyramid of doom and understand why Promises were introduced in ES6.',
      'Create custom Promise instances using new Promise((resolve, reject) => ...).',
      'Chain asynchronous steps cleanly using .then(), catch errors with .catch(), and clean up with .finally().',
      'Simulate multi-step server workflows (Authentication -> Data Fetch -> Record Update).'
    ],
    concept: {
      overview: 'Real-world software is inherently asynchronous: fetching data from a database, uploading an image, or reading disk files takes time. Promises represent a value that may not be available right now, but will resolve in the future or fail gracefully with an error.',
      keyPoints: [
        'Three Promise States: Pending (in progress), Fulfilled (successful with resolve), Rejected (failed with reject).',
        'Chaining: Every .then() returns a new Promise, allowing linear sequential chaining without nested callbacks.',
        'Unified Error Handling: A single .catch() at the end of the chain handles errors thrown by any preceding step.',
        '.finally(): Executes unconditionally regardless of whether the Promise was fulfilled or rejected (great for turning off loading spinners).',
        'Promise.all(): Runs multiple promises in parallel and resolves when all have completed.'
      ],
      analogy: 'Think of a Promise like ordering food at a university canteen: the cashier gives you a token (Promise: Pending). You sit at your table and study. When your order is ready, the buzzer sounds (Fulfilled: resolve), or if an item is out of stock, they inform you (Rejected: reject).'
    },
    teacherDemo: {
      title: 'Multi-Step University Record Pipeline with Promises',
      explanation: 'Notice how three asynchronous steps execute in sequence with clean chaining and centralized error catching.',
      language: 'html',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #060c18; color: #fff; padding: 24px; }
    .card { max-width: 480px; margin: auto; background: #0c1328; border: 1px solid #1e293b; padding: 24px; border-radius: 12px; }
    button { padding: 12px 20px; background: #2563eb; color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }
    .log-box { margin-top: 16px; padding: 14px; background: #060c18; border: 1px solid #334155; border-radius: 6px; min-height: 120px; font-family: monospace; font-size: 13px; }
    .step { color: #38bdf8; margin: 4px 0; }
    .success { color: #10b981; }
    .error { color: #ef4444; }
  </style>
</head>
<body>
  <div class="card">
    <h3>⚡ Asynchronous Record Verification</h3>
    <button id="runBtn">Start Verification Pipeline</button>
    <div class="log-box" id="logs">Click button to start...</div>
  </div>

  <script>
    const logs = document.getElementById("logs");
    const runBtn = document.getElementById("runBtn");

    function log(msg, cls = "step") {
      const p = document.createElement("div");
      p.className = cls;
      p.textContent = "[" + new Date().toLocaleTimeString() + "] " + msg;
      logs.appendChild(p);
    }

    // Step 1: Simulate Authentication
    function authenticateStudent(id) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (id === 2401) resolve({ id: 2401, name: "Rahul Sharma", token: "AUTH_TOKEN_BCA" });
          else reject(new Error("Student ID not found in registry"));
        }, 800);
      });
    }

    // Step 2: Fetch Grades
    function fetchGrades(token) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ token, bcs011: 85, bcsl013: 92, sgpa: 8.8 });
        }, 1000);
      });
    }

    runBtn.addEventListener("click", () => {
      logs.innerHTML = "";
      runBtn.disabled = true;
      log("Initiating pipeline...");

      authenticateStudent(2401)
        .then((user) => {
          log("✓ Step 1: Authenticated student " + user.name);
          return fetchGrades(user.token);
        })
        .then((grades) => {
          log("✓ Step 2: Grades fetched successfully. SGPA: " + grades.sgpa, "success");
          log("🎉 Pipeline Complete: Eligible for Semester 2 enrollment!", "success");
        })
        .catch((err) => {
          log("✖ Error: " + err.message, "error");
        })
        .finally(() => {
          runBtn.disabled = false;
        });
    });
  </script>
</body>
</html>`
    },
    practicalLab: {
      labTitle: 'Building a Simulated Async Exam Submitter',
      labDescription: 'Create a Promise-based multi-step submission engine that shows loading indicators, checks network status, and resolves exam submission.',
      initialCode: `<!DOCTYPE html>
<html>
<head><title>Promise Pipeline Lab</title></head>
<body>
  <button id="submitExam">Submit Exam</button>
  <div id="output">Ready</div>

  <script>
    // Create new Promise() with resolve/reject and chain with .then() and .catch()
  </script>
</body>
</html>`,
      language: 'html',
      tasks: [
        {
          id: 't37-1',
          title: 'Instantiate Promise with Resolve/Reject',
          instruction: 'Create a function returning new Promise((resolve, reject) => { setTimeout(...) }).',
          hint: 'The Promise constructor takes an executor function with resolve and reject parameters.',
          validatorRegex: 'new\\s+Promise\\(\\s*\\(\\s*resolve\\s*,\\s*reject\\s*\\)'
        },
        {
          id: 't37-2',
          title: 'Chain with .then() and .catch()',
          instruction: 'Invoke the promise function and attach .then() for success and .catch() for error handling.',
          hint: 'Ensure .catch() is attached to handle potential rejections.',
          validatorRegex: '\\.then\\(.*\\)\\s*\\.catch\\('
        }
      ]
    },
    debuggingChallenge: {
      title: 'The Missing Return in Promise Chain Bug',
      buggyCode: `fetchStudent(101)
  .then((student) => {
    // ❌ Bug: Forgot to 'return' the next promise!
    fetchTranscript(student.id);
  })
  .then((transcript) => {
    // transcript is UNDEFINED because previous .then() returned nothing!
    console.log("CGPA:", transcript.cgpa); // TypeError: Cannot read properties of undefined
  });`,
      bugExplanation: 'Inside a .then() handler, if you do not explicitly return a Promise or value, the handler implicitly returns undefined. The next .then() in the chain immediately receives undefined rather than waiting for the inner asynchronous operation to resolve.',
      fixedCode: `fetchStudent(101)
  .then((student) => {
    // ✅ Explicitly return the Promise to pass it to the next .then()
    return fetchTranscript(student.id);
  })
  .then((transcript) => {
    console.log("CGPA:", transcript.cgpa); // ✅ Works properly!
  });`
    },
    assignment: {
      title: 'BCA Cloud Deployment Simulator with Promise Steps',
      instructions: [
        'Build a multi-step simulated deployment pipeline with 3 async steps: 1. Code Linting (800ms), 2. Test Suite (1000ms), 3. Server Deployment (1200ms).',
        'Display an animated progress bar and step-by-step console logs.',
        'Randomly simulate a 20% test failure chance to demonstrate clean .catch() error recovery.',
        'Always re-enable the deploy button using .finally().'
      ],
      submissionCriteria: 'Push index.html and deploySimulator.js to GitHub under day-37.',
      fileName: 'index.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>BCA Day 37 - Promise Pipeline</title>
  <style>
    body { font-family: 'Segoe UI', monospace; background: #060c18; color: #fff; padding: 24px; }
    .card { max-width: 500px; margin: auto; background: #0c1328; border: 1px solid #1e293b; padding: 24px; border-radius: 12px; }
    button { padding: 12px 20px; background: #2563eb; color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }
    button:disabled { background: #334155; cursor: not-allowed; }
    .terminal { margin-top: 16px; background: #060c18; border: 1px solid #334155; padding: 14px; border-radius: 8px; min-height: 140px; font-size: 13px; }
    .ok { color: #10b981; }
    .err { color: #ef4444; }
  </style>
</head>
<body>
  <div class="card">
    <h2>🚀 NextSem Cloud Deployer</h2>
    <button id="deployBtn">Deploy BCA Portal</button>
    <div class="terminal" id="termLogs">System idle. Ready to deploy.</div>
  </div>

  <script>
    const btn = document.getElementById("deployBtn");
    const term = document.getElementById("termLogs");

    function log(msg, cls = "") {
      const line = document.createElement("div");
      if (cls) line.className = cls;
      line.textContent = "> " + msg;
      term.appendChild(line);
    }

    function step(name, ms, failChance = 0) {
      return new Promise((resolve, reject) => {
        log("Running " + name + "...");
        setTimeout(() => {
          if (Math.random() < failChance) reject(new Error(name + " failed"));
          else resolve("✓ " + name + " passed");
        }, ms);
      });
    }

    btn.addEventListener("click", () => {
      btn.disabled = true;
      term.innerHTML = "";
      log("Starting build pipeline...");

      step("ESLint Code Check", 800)
        .then((res) => {
          log(res, "ok");
          return step("Unit Test Suite", 1000, 0.2); // 20% fail chance
        })
        .then((res) => {
          log(res, "ok");
          return step("Production CDN Deployment", 1200);
        })
        .then((res) => {
          log(res, "ok");
          log("🎉 Application Deployed to https://nextsem-academy.web.app", "ok");
        })
        .catch((err) => {
          log("🚨 DEPLOYMENT HALTED: " + err.message, "err");
        })
        .finally(() => {
          btn.disabled = false;
        });
    });
  </script>
</body>
</html>`
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'feat(day-37): implement asynchronous javascript promises and pipeline chaining',
      commands: [
        'mkdir day-37',
        'cd day-37',
        'git checkout -b feature/day-37-promises',
        'git add index.html',
        'git commit -m "feat(day-37): implement asynchronous javascript promises and pipeline chaining"',
        'git push origin feature/day-37-promises'
      ],
      tips: 'Remember that any error thrown inside a .then() block will automatically trigger the nearest .catch() handler.'
    },
    vivaCheck: {
      question: 'What happens if you omit the return statement when calling a Promise-returning function inside a .then() block?',
      options: [
        'The handler implicitly returns undefined, causing subsequent .then() blocks to execute immediately without waiting for the async task.',
        'The browser runtime aborts thread execution and reloads the active webpage.',
        'The Promise rejects automatically with a SyntaxError code.',
        'The browser converts the code into synchronous blocking WebAssembly.'
      ],
      correctAnswer: 0,
      explanation: 'In Promise chaining, returning a Promise passes control down the chain. Without return, the .then() returns undefined immediately, meaning the next step runs prematurely with an undefined parameter.'
    }
  },

  /* ── DAY 38 ── */
  {
    id: 'day-38',
    day: 38,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'Async/Await Syntax & Browser fetch() API Fundamentals',
    slug: 'day-38-fetch-api-async-await-rest-get',
    category: 'Advanced JavaScript & Browser APIs',
    estimatedTime: '2.5 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Write synchronous-looking asynchronous code using modern async and await keywords.',
      'Fetch remote data over HTTP GET using the native window.fetch() API.',
      'Check response status using response.ok and response.status before parsing.',
      'Extract JSON payloads asynchronously using await response.json().',
      'Wrap network calls in robust try...catch blocks to handle connection drops and offline states.'
    ],
    concept: {
      overview: 'The async/await syntax introduced in ES2017 is syntactic sugar built on top of Promises. Combined with the native fetch() API, it provides a readable way to communicate with remote REST APIs and cloud servers.',
      keyPoints: [
        'async Functions: Any function marked async automatically returns a Promise.',
        'await Operator: Pauses function execution until the Promise settles, unpacking the resolved value directly.',
        'Two-Step fetch(): fetch(url) returns a Response object; you must await response.json() to extract parsed data.',
        'The 404/500 Gotcha: fetch() only rejects on network failure (offline/DNS error). HTTP error responses (404, 500) do NOT reject! You must check if (!response.ok).',
        'Error Handling: Use standard try...catch blocks around await statements for clean error management.'
      ],
      analogy: 'Think of async/await like waiting for a message reply on your phone: instead of writing a complex contract with multiple handlers, you simply wait (await) for the message to arrive, and if there is no signal, your try...catch handles the error.'
    },
    teacherDemo: {
      title: 'Consuming Public REST APIs with async/await and response.ok',
      explanation: 'See how remote quotes are fetched, parsed, and rendered with loading and error handling.',
      language: 'html',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #060c18; color: #fff; padding: 24px; text-align: center; }
    .card { max-width: 480px; margin: auto; background: #0c1328; border: 1px solid #1e293b; padding: 24px; border-radius: 12px; }
    button { padding: 10px 18px; background: #2563eb; color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }
    .quote { font-style: italic; font-size: 16px; color: #38bdf8; margin: 18px 0; }
    .author { font-size: 13px; color: #94a3b8; font-weight: bold; }
    .error { color: #ef4444; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="card">
    <h3>💡 Developer Quote of the Day</h3>
    <button id="fetchBtn">Fetch New Quote</button>
    <div id="contentBox">
      <p class="quote" id="quoteText">Click button to fetch from API...</p>
      <p class="author" id="authorText"></p>
    </div>
    <div class="error" id="errorBox"></div>
  </div>

  <script>
    const btn = document.getElementById("fetchBtn");
    const quoteText = document.getElementById("quoteText");
    const authorText = document.getElementById("authorText");
    const errorBox = document.getElementById("errorBox");

    async function loadQuote() {
      btn.disabled = true;
      btn.textContent = "Loading...";
      errorBox.textContent = "";

      try {
        // Fetch from public dummy REST API
        const response = await fetch("https://dummyjson.com/quotes/random");

        // Guard against HTTP 404 / 500
        if (!response.ok) {
          throw new Error("HTTP Error " + response.status + ": Failed to retrieve quote");
        }

        const data = await response.json();
        quoteText.textContent = '"' + data.quote + '"';
        authorText.textContent = "— " + data.author;
      } catch (err) {
        errorBox.textContent = "Failed to load quote. Check internet connection. (" + err.message + ")";
      } finally {
        btn.disabled = false;
        btn.textContent = "Fetch New Quote";
      }
    }

    btn.addEventListener("click", loadQuote);
  </script>
</body>
</html>`
    },
    practicalLab: {
      labTitle: 'Building a REST API User Card Generator',
      labDescription: 'Fetch a list of users from a public JSON endpoint and render them in a responsive card grid using async/await.',
      initialCode: `<!DOCTYPE html>
<html>
<head><title>Fetch API Lab</title></head>
<body>
  <button id="loadUsers">Load Users</button>
  <div id="userGrid"></div>

  <script>
    // Define async function, await fetch, check response.ok, await json, and render cards
  </script>
</body>
</html>`,
      language: 'html',
      tasks: [
        {
          id: 't38-1',
          title: 'Implement async/await with fetch',
          instruction: 'Declare an async function and use await fetch("https://jsonplaceholder.typicode.com/users").',
          hint: 'The await keyword can only be used inside functions marked with async.',
          validatorRegex: 'async.*await\\s+fetch'
        },
        {
          id: 't38-2',
          title: 'Check response.ok and Extract JSON',
          instruction: 'Verify if (!response.ok) throw new Error() and extract data with await response.json().',
          hint: 'response.ok is a boolean indicating if the status code was in the 200-299 range.',
          validatorRegex: 'response\\.ok.*await.*\\.json\\(\\)'
        }
      ]
    },
    debuggingChallenge: {
      title: 'The "fetch does not reject on 404" Trap',
      buggyCode: `async function getUser(id) {
  try {
    // ❌ Bug: If endpoint returns 404 Not Found, fetch DOES NOT jump to catch!
    const res = await fetch("https://api.example.com/users/99999");
    const data = await res.json();
    displayUser(data); // 💥 Displays broken empty card or crashes on data properties!
  } catch (err) {
    console.error("Network error:", err);
  }
}`,
      bugExplanation: 'Unlike libraries like Axios, window.fetch() only rejects when a network error occurs (like no internet connection). If the server responds with 404 Not Found or 500 Internal Server Error, fetch() still successfully resolves! You must manually check if (!res.ok).',
      fixedCode: `async function getUser(id) {
  try {
    const res = await fetch("https://api.example.com/users/99999");
    // ✅ Always check response.ok!
    if (!res.ok) {
      throw new Error("Server responded with status " + res.status);
    }
    const data = await res.json();
    displayUser(data);
  } catch (err) {
    console.error("Caught error:", err.message);
  }
}`
    },
    assignment: {
      title: 'University News Feed & Technical Blog Reader SPA',
      instructions: [
        'Fetch blog posts or articles from a public REST API (e.g. JSONPlaceholder /posts).',
        'Display a Skeleton Loader animation while the API request is in-flight.',
        'Render posts as responsive cards with Title, Excerpt, and Read More buttons.',
        'Handle network disconnects gracefully by showing a "Retry Connection" button.'
      ],
      submissionCriteria: 'Push index.html and app.js to your GitHub repository under day-38.',
      fileName: 'index.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>BCA Day 38 - REST API Feed</title>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #060c18; color: #fff; padding: 24px; }
    .container { max-width: 680px; margin: auto; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    button { padding: 10px 16px; background: #2563eb; color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }
    .post { background: #0c1328; border: 1px solid #1e293b; padding: 18px; border-radius: 10px; margin-bottom: 12px; }
    .post h3 { margin-top: 0; color: #38bdf8; text-transform: capitalize; }
    .post p { color: #94a3b8; font-size: 14px; line-height: 1.5; }
    .loader { text-align: center; padding: 24px; color: #38bdf8; font-weight: bold; display: none; }
    .error-card { background: #450a0a; border: 1px solid #dc2626; padding: 16px; border-radius: 8px; color: #fca5a5; display: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>📰 Tech News Feed (REST API)</h2>
      <button id="refreshBtn">↻ Refresh</button>
    </div>
    <div class="loader" id="loader">Fetching articles from server... ⏳</div>
    <div class="error-card" id="errCard"></div>
    <div id="postsList"></div>
  </div>

  <script>
    const loader = document.getElementById("loader");
    const errCard = document.getElementById("errCard");
    const postsList = document.getElementById("postsList");
    const refreshBtn = document.getElementById("refreshBtn");

    async function fetchPosts() {
      loader.style.display = "block";
      errCard.style.display = "none";
      postsList.innerHTML = "";
      refreshBtn.disabled = true;

      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=4");
        if (!res.ok) throw new Error("HTTP error " + res.status);

        const posts = await res.json();
        posts.forEach(p => {
          const div = document.createElement("div");
          div.className = "post";
          div.innerHTML = '<h3>' + p.title + '</h3><p>' + p.body + '</p>';
          postsList.appendChild(div);
        });
      } catch (err) {
        errCard.style.display = "block";
        errCard.textContent = "Failed to fetch articles: " + err.message + ". Please try again.";
      } finally {
        loader.style.display = "none";
        refreshBtn.disabled = false;
      }
    }

    refreshBtn.addEventListener("click", fetchPosts);
    fetchPosts();
  </script>
</body>
</html>`
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'feat(day-38): implement async await syntax and fetch api rest consumer',
      commands: [
        'mkdir day-38',
        'cd day-38',
        'git checkout -b feature/day-38-fetch-api',
        'git add index.html',
        'git commit -m "feat(day-38): implement async await syntax and fetch api rest consumer"',
        'git push origin feature/day-38-fetch-api'
      ],
      tips: 'Always check if response.ok is true before parsing response.json() to prevent runtime crashes on 404/500 errors.'
    },
    vivaCheck: {
      question: 'Why does window.fetch() NOT reject its Promise when the server responds with a 404 Not Found error?',
      options: [
        'fetch() only rejects when a network failure occurs (e.g. no internet/DNS failure); HTTP 404 is a valid completed HTTP response from the server.',
        'The browser automatically rewrites HTTP 404 status codes into HTTP 200 before returning to JavaScript.',
        'HTTP status codes above 400 are handled exclusively by browser service workers.',
        'fetch() converts 404 errors into empty JSON arrays without throwing exceptions.'
      ],
      correctAnswer: 0,
      explanation: 'A 404 status code is a valid response delivered by the remote HTTP server. From the perspective of fetch(), the network request was successful. You must inspect the response.ok property (or response.status) to detect HTTP errors.'
    }
  },

  /* ── DAY 39 ── */
  {
    id: 'day-39',
    day: 39,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'Building a Dynamic GitHub Profile Explorer SPA (Async REST API Mini App)',
    slug: 'day-39-github-profile-explorer-spa',
    category: 'Advanced JavaScript & Browser APIs',
    estimatedTime: '3 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Consume the real-world GitHub Public REST API (https://api.github.com/users/{username}).',
      'Display avatar, bio, follower count, and public repository counts in a styled developer card.',
      'Fetch and display a secondary sub-resource: top 5 repositories sorted by stars.',
      'Handle 404 User Not Found gracefully with an attractive error illustration.',
      'Implement an input debounce or form submit handler to avoid exceeding GitHub API rate limits.'
    ],
    concept: {
      overview: 'In this hands-on project, you will build an interactive Single Page Application that connects to the live GitHub REST API. Students enter any GitHub developer username to fetch real profile data, avatar images, follower statistics, and their latest public open-source repositories.',
      keyPoints: [
        'Endpoint Architecture: Primary endpoint is https://api.github.com/users/{username}; repo endpoint is /users/{username}/repos?sort=updated.',
        'Parallel Fetching: Use Promise.all() to fetch both user details and repository lists concurrently.',
        '404 Handling: If the user does not exist, GitHub returns status: 404. Handle this with a clear "User Not Found" state.',
        'Rate Limiting: GitHub allows 60 unauthenticated requests per hour per IP. Handle HTTP 403 rate limit responses cleanly.',
        'DOM Formatting: Format dates into readable strings using new Date(created_at).toLocaleDateString().'
      ],
      analogy: 'Think of this application like an interactive digital identity card scanner: you provide a student enrollment ID (username), and the terminal instantly queries the central university registry to pull up their complete academic portfolio.'
    },
    teacherDemo: {
      title: 'GitHub API Explorer Architecture with Repo Fetching',
      explanation: 'See how both user profile and top repositories are fetched and populated into the UI.',
      language: 'html',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #060c18; color: #fff; padding: 24px; }
    .card { max-width: 500px; margin: auto; background: #0c1328; border: 1px solid #1e293b; padding: 24px; border-radius: 14px; }
    .search-row { display: flex; gap: 8px; margin-bottom: 20px; }
    input { flex: 1; padding: 10px; background: #060c18; border: 1px solid #334155; color: #fff; border-radius: 6px; }
    button { padding: 10px 16px; background: #2563eb; color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }
    .profile-box { text-align: center; display: none; }
    .avatar { width: 90px; height: 90px; border-radius: 50%; border: 3px solid #2563eb; margin-bottom: 10px; }
    .stats { display: flex; justify-content: space-around; background: #060c18; padding: 12px; border-radius: 8px; margin: 16px 0; }
    .stat-val { font-size: 18px; font-weight: bold; color: #38bdf8; }
    .stat-label { font-size: 11px; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="card">
    <h3>🔍 GitHub Developer Explorer</h3>
    <div class="search-row">
      <input type="text" id="usernameInput" placeholder="Enter GitHub username (e.g., torvalds)" />
      <button id="searchBtn">Search</button>
    </div>
    <div class="profile-box" id="profileBox">
      <img id="avatarImg" class="avatar" src="" alt="Avatar" />
      <h3 id="nameText" style="margin:0;"></h3>
      <p id="bioText" style="color:#94a3b8;font-size:13px;"></p>
      <div class="stats">
        <div><div class="stat-val" id="repoCount">0</div><div class="stat-label">Repos</div></div>
        <div><div class="stat-val" id="followerCount">0</div><div class="stat-label">Followers</div></div>
        <div><div class="stat-val" id="followingCount">0</div><div class="stat-label">Following</div></div>
      </div>
      <a id="profileLink" href="#" target="_blank" style="color:#10b981;font-weight:bold;text-decoration:none;">View on GitHub →</a>
    </div>
    <div id="errorMsg" style="color:#ef4444;text-align:center;display:none;"></div>
  </div>

  <script>
    const searchBtn = document.getElementById("searchBtn");
    const input = document.getElementById("usernameInput");
    const box = document.getElementById("profileBox");
    const err = document.getElementById("errorMsg");

    async function searchUser() {
      const username = input.value.trim();
      if (!username) return;

      box.style.display = "none";
      err.style.display = "none";
      searchBtn.disabled = true;

      try {
        const res = await fetch("https://api.github.com/users/" + encodeURIComponent(username));
        if (res.status === 404) throw new Error("GitHub user '" + username + "' not found.");
        if (!res.ok) throw new Error("API request failed with status " + res.status);

        const data = await res.json();
        document.getElementById("avatarImg").src = data.avatar_url;
        document.getElementById("nameText").textContent = data.name || data.login;
        document.getElementById("bioText").textContent = data.bio || "No bio provided.";
        document.getElementById("repoCount").textContent = data.public_repos;
        document.getElementById("followerCount").textContent = data.followers;
        document.getElementById("followingCount").textContent = data.following;
        document.getElementById("profileLink").href = data.html_url;

        box.style.display = "block";
      } catch (e) {
        err.textContent = e.message;
        err.style.display = "block";
      } finally {
        searchBtn.disabled = false;
      }
    }

    searchBtn.addEventListener("click", searchUser);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") searchUser(); });
  </script>
</body>
</html>`
    },
    practicalLab: {
      labTitle: 'Enhancing GitHub Explorer with Top Repositories',
      labDescription: 'Fetch the user top repositories from /users/{username}/repos and render language tags and star badges.',
      initialCode: `<!DOCTYPE html>
<html>
<head><title>GitHub Explorer Lab</title></head>
<body>
  <input id="user" placeholder="Username" />
  <button id="find">Find</button>
  <div id="repos"></div>

  <script>
    // Fetch https://api.github.com/users/{user}/repos and render top 3 repos
  </script>
</body>
</html>`,
      language: 'html',
      tasks: [
        {
          id: 't39-1',
          title: 'Fetch Repositories from GitHub API',
          instruction: 'Use fetch("https://api.github.com/users/" + user + "/repos?sort=updated&per_page=3") with async/await.',
          hint: 'The per_page query parameter limits the number of items returned.',
          validatorRegex: 'api\\.github\\.com/users/.*repos'
        },
        {
          id: 't39-2',
          title: 'Render Repo Card Elements',
          instruction: 'Map through the repositories array and display repo.name, repo.language, and repo.stargazers_count.',
          hint: 'stargazers_count holds the number of stars on the repository.',
          validatorRegex: 'stargazers_count'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Unencoded User Input in URL Bug',
      buggyCode: `// ❌ Bug: If username contains spaces or special characters, URL breaks!
const username = "john doe";
fetch("https://api.github.com/users/" + username); // Bad request!`,
      bugExplanation: 'User inputs placed directly into URLs without URI encoding can contain spaces, ampersands, or slashes that corrupt the HTTP request or lead to security vulnerabilities.',
      fixedCode: `// ✅ encodeURIComponent ensures characters are safely escaped
const username = "john doe";
fetch("https://api.github.com/users/" + encodeURIComponent(username));`
    },
    assignment: {
      title: 'BCA Developer Directory & GitHub Inspector SPA',
      instructions: [
        'Build a production-grade GitHub Profile Inspector supporting both light and dark themes.',
        'Fetch user details AND their top 4 most recently updated repositories.',
        'Render repository language tags with color indicators (e.g. JavaScript, HTML, CSS, Python).',
        'Add a "Recently Searched" history bar using localStorage to remember the last 3 searched developers.'
      ],
      submissionCriteria: 'Push index.html, styles.css, and app.js to GitHub under day-39.',
      fileName: 'index.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>BCA Day 39 - GitHub Inspector</title>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #060c18; color: #fff; padding: 24px; }
    .card { max-width: 560px; margin: auto; background: #0c1328; border: 1px solid #1e293b; padding: 24px; border-radius: 14px; }
    .search-box { display: flex; gap: 8px; margin-bottom: 20px; }
    input { flex: 1; padding: 10px; background: #060c18; border: 1px solid #334155; color: #fff; border-radius: 6px; }
    button { padding: 10px 18px; background: #2563eb; color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }
    .profile-card { display: flex; gap: 16px; align-items: center; background: #060c18; padding: 16px; border-radius: 10px; margin-bottom: 16px; }
    .avatar { width: 70px; height: 70px; border-radius: 50%; border: 2px solid #2563eb; }
    .repo-item { background: #1e293b; padding: 12px; border-radius: 8px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; }
    .repo-name { color: #38bdf8; font-weight: bold; text-decoration: none; }
    .star-badge { background: #334155; padding: 2px 8px; border-radius: 12px; font-size: 11px; }
    #output { display: none; }
  </style>
</head>
<body>
  <div class="card">
    <h2>⚡ BCA GitHub Inspector</h2>
    <div class="search-box">
      <input type="text" id="userInput" placeholder="Search developer (e.g., octocat)..." />
      <button id="searchBtn">Inspect</button>
    </div>
    <div id="output">
      <div class="profile-card">
        <img class="avatar" id="avatar" src="" />
        <div>
          <h3 style="margin:0;" id="name"></h3>
          <p style="margin:4px 0;color:#94a3b8;font-size:12px;" id="bio"></p>
          <div style="font-size:12px;color:#10b981;" id="stats"></div>
        </div>
      </div>
      <h4>Top Repositories</h4>
      <div id="reposList"></div>
    </div>
    <div id="errMsg" style="color:#ef4444;text-align:center;display:none;"></div>
  </div>

  <script>
    const btn = document.getElementById("searchBtn");
    const input = document.getElementById("userInput");
    const output = document.getElementById("output");
    const errMsg = document.getElementById("errMsg");

    btn.addEventListener("click", async () => {
      const u = input.value.trim();
      if (!u) return;

      output.style.display = "none";
      errMsg.style.display = "none";
      btn.disabled = true;

      try {
        const [uRes, rRes] = await Promise.all([
          fetch("https://api.github.com/users/" + encodeURIComponent(u)),
          fetch("https://api.github.com/users/" + encodeURIComponent(u) + "/repos?sort=updated&per_page=3")
        ]);

        if (uRes.status === 404) throw new Error("User not found on GitHub");
        if (!uRes.ok) throw new Error("Failed to fetch user");

        const user = await uRes.json();
        const repos = await rRes.json();

        document.getElementById("avatar").src = user.avatar_url;
        document.getElementById("name").textContent = user.name || user.login;
        document.getElementById("bio").textContent = user.bio || "No bio available.";
        document.getElementById("stats").textContent = user.public_repos + " Repositories • " + user.followers + " Followers";

        const reposList = document.getElementById("reposList");
        reposList.innerHTML = "";
        repos.forEach(r => {
          const div = document.createElement("div");
          div.className = "repo-item";
          div.innerHTML = '<a class="repo-name" href="' + r.html_url + '" target="_blank">' + r.name + '</a><span class="star-badge">⭐ ' + r.stargazers_count + '</span>';
          reposList.appendChild(div);
        });

        output.style.display = "block";
      } catch (err) {
        errMsg.textContent = "Error: " + err.message;
        errMsg.style.display = "block";
      } finally {
        btn.disabled = false;
      }
    });
  </script>
</body>
</html>`
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'feat(day-39): build dynamic github profile explorer single page application',
      commands: [
        'mkdir day-39',
        'cd day-39',
        'git checkout -b feature/day-39-github-explorer',
        'git add index.html',
        'git commit -m "feat(day-39): build dynamic github profile explorer single page application"',
        'git push origin feature/day-39-github-explorer'
      ],
      tips: 'Use Promise.all() when making multiple independent fetch calls concurrently to cut total loading time in half.'
    },
    vivaCheck: {
      question: 'What is the advantage of using Promise.all([fetch(userUrl), fetch(reposUrl)]) over running them sequentially with two consecutive awaits?',
      options: [
        'Both network requests execute concurrently in parallel, reducing total loading time to the slowest single request rather than the sum of both.',
        'Promise.all() automatically bypasses CORS security policies on the server.',
        'Promise.all() merges the two HTTP responses into a single combined JSON buffer.',
        'Promise.all() compresses network packets by 50% using gzip.'
      ],
      correctAnswer: 0,
      explanation: 'When requests are independent, running them with Promise.all() launches them concurrently. Consecutive awaits would force the second request to wait until the first fully completes (waterfall latency).'
    }
  },

  /* ── DAY 40 ── */
  {
    id: 'day-40',
    day: 40,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'Sprint 4 Capstone: University Resource Hub Single Page Application',
    slug: 'day-40-sprint-capstone-university-resource-hub-spa',
    category: 'Mini Project Capstone',
    estimatedTime: '3.5 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Assemble Days 31–39 techniques into a complete, responsive Single Page Application (SPA).',
      'Integrate LocalStorage for persistent bookmarks and study preferences.',
      'Fetch dynamic course resources and syllabus data via asynchronous REST APIs or mock endpoints.',
      'Build modal preview dialogs with backdrop dismissal, body scroll locks, and Escape key listeners.',
      'Deploy the completed Capstone project to your personal GitHub repository and GitHub Pages.'
    ],
    concept: {
      overview: 'This Sprint 4 Capstone unites everything learned in Advanced JavaScript: localStorage state persistence, async/await REST data fetching, event delegation, dynamic modals, and interactive UI state management into a complete University Resource Hub.',
      keyPoints: [
        'Component Orchestration: Coordinate state across search filtering, bookmarks array, modal dialogs, and storage.',
        'Offline Resilience: Read bookmarks and preferences from localStorage so the app works even when disconnected.',
        'Clean Separation: Separate data fetching (async API), state management (arrays & storage), and DOM rendering.',
        'Event Delegation: Use delegated click listeners on the resource grid to handle bookmarking and viewing details.',
        'Sprint 4 Milestone: Represents graduation from DOM manipulation to building real Single Page Web Applications.'
      ],
      analogy: 'Think of this project like building your own university digital library portal: students can search textbooks, bookmark papers for later study, open detailed preview cards in popups, and pick up right where they left off tomorrow.'
    },
    teacherDemo: {
      title: 'Complete University Resource Hub SPA Architecture',
      explanation: 'Examine how search filtering, modal popups, and localStorage bookmarking coordinate seamlessly.',
      language: 'html',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #060c18; color: #fff; padding: 24px; }
    .app { max-width: 640px; margin: auto; }
    .search-row { display: flex; gap: 8px; margin-bottom: 20px; }
    input { flex: 1; padding: 10px; background: #0c1328; border: 1px solid #334155; color: #fff; border-radius: 6px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 12px; }
    .card { background: #0c1328; border: 1px solid #1e293b; padding: 16px; border-radius: 10px; }
    button { padding: 6px 12px; border-radius: 6px; border: none; font-weight: bold; cursor: pointer; }
    .btn-view { background: #2563eb; color: #fff; }
    .btn-bm { background: #f59e0b; color: #000; margin-left: 6px; }
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); display: none; align-items: center; justify-content: center; z-index: 1000; }
    .modal-overlay.open { display: flex; }
    .modal-body { background: #0c1328; border: 1px solid #334155; padding: 24px; border-radius: 12px; max-width: 440px; width: 90%; }
  </style>
</head>
<body>
  <div class="app">
    <h2>🎓 BCA University Resource Hub</h2>
    <div class="search-row">
      <input type="text" id="searchInput" placeholder="Search subjects (e.g. C, HTML, Math)..." />
      <span id="bmCount" style="align-self:center;font-weight:bold;color:#f59e0b;">⭐ 0 Bookmarks</span>
    </div>
    <div class="grid" id="resourceGrid"></div>
  </div>

  <div class="modal-overlay" id="modal">
    <div class="modal-body">
      <h3 id="modalTitle"></h3>
      <p id="modalDesc" style="color:#94a3b8;"></p>
      <button onclick="closeModal()" style="background:#ef4444;color:#fff;width:100%;">Close Modal (Esc)</button>
    </div>
  </div>

  <script>
    const resources = [
      { id: 1, title: "BCS-011: Computer Basics", desc: "Hardware, software, Von Neumann architecture, and OS fundamentals." },
      { id: 2, title: "BCSL-013: PC Software Lab", desc: "Hands-on lab for Windows commands, HTML5, and Linux basics." },
      { id: 3, title: "BCS-012: Basic Mathematics", desc: "Matrices, determinants, differential calculus, and algebra." },
      { id: 4, title: "MCS-011: Problem Solving & C", desc: "Pointers, memory allocation, arrays, and structured programming." }
    ];

    let bookmarks = JSON.parse(localStorage.getItem("bca_hub_bookmarks")) || [];
    const grid = document.getElementById("resourceGrid");
    const modal = document.getElementById("modal");

    function render(list) {
      grid.innerHTML = "";
      document.getElementById("bmCount").textContent = "⭐ " + bookmarks.length + " Bookmarks";
      list.forEach(r => {
        const isBm = bookmarks.includes(r.id);
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.id = r.id;
        card.innerHTML = '<h4>' + r.title + '</h4>' +
          '<p style="color:#94a3b8;font-size:13px;">' + r.desc + '</p>' +
          '<button class="btn-view">View Details</button>' +
          '<button class="btn-bm">' + (isBm ? "★ Saved" : "☆ Save") + '</button>';
        grid.appendChild(card);
      });
    }

    // Delegated listener
    grid.addEventListener("click", (e) => {
      const viewBtn = e.target.closest(".btn-view");
      const bmBtn = e.target.closest(".btn-bm");
      const card = e.target.closest(".card");
      if (!card) return;
      const id = parseInt(card.dataset.id, 10);
      const res = resources.find(r => r.id === id);

      if (viewBtn && res) {
        document.getElementById("modalTitle").textContent = res.title;
        document.getElementById("modalDesc").textContent = res.desc;
        modal.classList.add("open");
        document.body.style.overflow = "hidden";
      }

      if (bmBtn) {
        if (bookmarks.includes(id)) bookmarks = bookmarks.filter(b => b !== id);
        else bookmarks.push(id);
        localStorage.setItem("bca_hub_bookmarks", JSON.stringify(bookmarks));
        render(resources);
      }
    });

    window.closeModal = () => {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    };

    window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

    document.getElementById("searchInput").addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase();
      render(resources.filter(r => r.title.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q)));
    });

    render(resources);
  </script>
</body>
</html>`
    },
    practicalLab: {
      labTitle: 'Building the Capstone University Resource Hub',
      labDescription: 'Assemble search filtering, modal detail views, and localStorage bookmark persistence into a complete web app.',
      initialCode: `<!DOCTYPE html>
<html>
<head><title>Capstone Hub</title></head>
<body>
  <h1>University Resource Hub</h1>
  <input id="search" placeholder="Search..." />
  <div id="grid"></div>

  <script>
    // Assemble Days 31-39 features into working SPA
  </script>
</body>
</html>`,
      language: 'html',
      tasks: [
        {
          id: 't40-1',
          title: 'Integrate LocalStorage Bookmarks',
          instruction: 'Save bookmarks array to localStorage.setItem("bca_hub_bookmarks", JSON.stringify(bookmarks)).',
          hint: 'Keep localStorage synced whenever bookmarks are added or removed.',
          validatorRegex: 'localStorage\\.setItem.*bca_hub_bookmarks'
        },
        {
          id: 't40-2',
          title: 'Implement Search Filtering',
          instruction: 'Filter resources using Array.prototype.filter() based on search input value.',
          hint: 'Convert both query and resource strings to lowercase before checking includes().',
          validatorRegex: '\\.filter.*\\.includes\\('
        }
      ]
    },
    debuggingChallenge: {
      title: 'Empty LocalStorage Initialization Null Reference Bug',
      buggyCode: `// ❌ Bug: When user visits site for the first time, localStorage is empty!
// JSON.parse(null) returns null. Calling bookmarks.includes() crashes!
let bookmarks = JSON.parse(localStorage.getItem("bca_bookmarks"));
if (bookmarks.includes(101)) { // 💥 TypeError: Cannot read properties of null
  console.log("Bookmarked!");
}`,
      bugExplanation: 'When an item does not exist in localStorage, getItem() returns null. JSON.parse(null) evaluates to null. Calling array methods like .includes() or .push() on null causes a fatal TypeError.',
      fixedCode: `// ✅ Always provide a fallback empty array using || []
let bookmarks = JSON.parse(localStorage.getItem("bca_bookmarks")) || [];
if (bookmarks.includes(101)) {
  console.log("Bookmarked!");
}`
    },
    assignment: {
      title: 'Sprint 4 Capstone: Production University Resource & Study Hub',
      instructions: [
        'Build a complete single-page resource hub featuring 6 university subjects with title, code, semester, and description.',
        'Provide a live Search Bar that filters cards instantly on keystroke.',
        'Implement an interactive Bookmark system that saves favorite subjects to localStorage.',
        'Include a detail modal that displays syllabus topics and lecture links, closable with ESC key.',
        'Deploy the finished application to GitHub Pages and share the live link.'
      ],
      submissionCriteria: 'Push complete index.html, styles.css, and app.js to your GitHub repository under day-40.',
      fileName: 'index.html',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>BCA Day 40 - Sprint 4 Capstone</title>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #060c18; color: #fff; padding: 24px; margin: 0; }
    .container { max-width: 720px; margin: auto; }
    .top-bar { display: flex; gap: 12px; margin-bottom: 20px; align-items: center; }
    input { flex: 1; padding: 12px; background: #0c1328; border: 1px solid #334155; color: #fff; border-radius: 8px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; }
    .card { background: #0c1328; border: 1px solid #1e293b; padding: 20px; border-radius: 12px; display: flex; flex-direction: column; justify-content: space-between; }
    .card h3 { margin: 0 0 6px 0; color: #38bdf8; }
    .card p { color: #94a3b8; font-size: 13px; line-height: 1.5; flex: 1; }
    .actions { display: flex; gap: 8px; margin-top: 14px; }
    button { flex: 1; padding: 10px; border-radius: 6px; border: none; font-weight: bold; cursor: pointer; }
    .btn-view { background: #2563eb; color: #fff; }
    .btn-save { background: #f59e0b; color: #000; }
    .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(4px); display: none; align-items: center; justify-content: center; z-index: 9999; }
    .modal-backdrop.open { display: flex; }
    .modal-box { background: #0c1328; border: 1px solid #334155; padding: 24px; border-radius: 14px; width: 90%; max-width: 480px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="top-bar">
      <input type="text" id="filterInput" placeholder="🔍 Search curriculum subjects..." />
      <span id="savedCounter" style="color:#f59e0b;font-weight:bold;white-space:nowrap;">⭐ 0 Saved</span>
    </div>
    <div class="grid" id="subjectsGrid"></div>
  </div>

  <div class="modal-backdrop" id="modalBackdrop">
    <div class="modal-box">
      <h3 id="modalHeading" style="margin-top:0;color:#38bdf8;"></h3>
      <p id="modalBody" style="color:#cbd5e1;line-height:1.6;"></p>
      <button onclick="closeDialog()" style="background:#ef4444;color:#fff;width:100%;margin-top:14px;">Close (Esc)</button>
    </div>
  </div>

  <script>
    const subjects = [
      { id: 101, code: "BCS-011", name: "Computer Basics and PC Software", desc: "Data representation, hardware architectures, CPU registers, and Windows/Linux tools." },
      { id: 102, code: "BCSL-013", name: "Software Lab (PC Software)", desc: "Interactive command prompt, HTML5 document structures, CSS formatting, and web labs." },
      { id: 103, code: "BCS-012", name: "Basic Mathematics", desc: "Determinants, matrices, limits, continuity, coordinate geometry, and linear programming." },
      { id: 104, code: "MCS-011", name: "Problem Solving and C Programming", desc: "Structured programming, memory pointers, dynamic allocation, structures, and arrays." },
      { id: 105, code: "MCS-021", name: "Data and File Structures", desc: "Stacks, queues, linked lists, trees, binary search graphs, and hashing algorithms." },
      { id: 106, code: "BCS-053", name: "Web Programming & Technologies", desc: "Full-stack development, JavaScript DOM, async fetch APIs, and database integration." }
    ];

    let saved = JSON.parse(localStorage.getItem("bca_capstone_saved")) || [];
    const grid = document.getElementById("subjectsGrid");
    const modal = document.getElementById("modalBackdrop");

    function renderCards(list) {
      grid.innerHTML = "";
      document.getElementById("savedCounter").textContent = "⭐ " + saved.length + " Saved";

      list.forEach(s => {
        const isSaved = saved.includes(s.id);
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.id = s.id;
        card.innerHTML = '<div>' +
          '<h3>' + s.code + '</h3>' +
          '<div style="font-weight:bold;font-size:14px;margin-bottom:6px;">' + s.name + '</div>' +
          '<p>' + s.desc + '</p>' +
          '</div>' +
          '<div class="actions">' +
          '<button class="btn-view">Details</button>' +
          '<button class="btn-save">' + (isSaved ? "★ Saved" : "☆ Save") + '</button>' +
          '</div>';
        grid.appendChild(card);
      });
    }

    grid.addEventListener("click", (e) => {
      const card = e.target.closest(".card");
      if (!card) return;
      const id = parseInt(card.dataset.id, 10);
      const sub = subjects.find(s => s.id === id);

      if (e.target.closest(".btn-view") && sub) {
        document.getElementById("modalHeading").textContent = sub.code + ": " + sub.name;
        document.getElementById("modalBody").textContent = sub.desc + " This module is accredited by NextSem Academy under lead faculty Er. Manoj Kumar.";
        modal.classList.add("open");
        document.body.style.overflow = "hidden";
      }

      if (e.target.closest(".btn-save")) {
        if (saved.includes(id)) saved = saved.filter(x => x !== id);
        else saved.push(id);
        localStorage.setItem("bca_capstone_saved", JSON.stringify(saved));
        renderCards(subjects);
      }
    });

    window.closeDialog = () => {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    };

    window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDialog(); });
    modal.addEventListener("click", (e) => { if (e.target === modal) closeDialog(); });

    document.getElementById("filterInput").addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase();
      renderCards(subjects.filter(s => s.code.toLowerCase().includes(q) || s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q)));
    });

    renderCards(subjects);
  </script>
</body>
</html>`
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'feat(day-40): build sprint 4 capstone university resource hub single page application',
      commands: [
        'mkdir day-40',
        'cd day-40',
        'git checkout -b feature/day-40-sprint-capstone',
        'git add index.html',
        'git commit -m "feat(day-40): build sprint 4 capstone university resource hub single page application"',
        'git push origin feature/day-40-sprint-capstone'
      ],
      tips: 'Test your application with empty localStorage to confirm default values and search filtering behave properly.'
    },
    vivaCheck: {
      question: 'Why is it critical to provide a fallback value like || [] when parsing localStorage data with JSON.parse(localStorage.getItem(key))?',
      options: [
        'If the key does not exist, getItem() returns null, causing JSON.parse(null) to evaluate to null; calling array methods on null causes a fatal TypeError.',
        'Without a fallback, the browser terminates JavaScript garbage collection on the main UI thread.',
        'localStorage data is encrypted by default and requires an empty array key to decode.',
        'Array methods like map and filter automatically delete localStorage entries if not initialized with an empty array.'
      ],
      correctAnswer: 0,
      explanation: 'When a key does not exist in localStorage, localStorage.getItem(key) returns null. Since JSON.parse(null) returns null, calling any array method like .push() or .includes() crashes with "Cannot read properties of null". Providing || [] ensures you always work with a valid array.'
    }
  }
,

  /* ── DAY 41 ── */
  {
    "id": "day-41",
    "day": 41,
    "year": 1,
    "semester": 1,
    "specialization": "foundation",
    "title": "Modular JavaScript Architecture (ES6 Modules, Import & Export)",
    "slug": "day-41-modular-javascript-es6-modules-import-export",
    "category": "Advanced JavaScript & Browser APIs",
    "estimatedTime": "2 Hours Practical",
    "difficulty": "Intermediate",
    "objectives": [
      "Understand why modern enterprise codebases split scripts into decoupled ES6 modules.",
      "Configure the browser script tag using type=\"module\" to enable native import/export statements.",
      "Implement Named Exports (export const add = ...) and Default Exports (export default App).",
      "Handle module scope: understand why variables in modules are never leaked into window/global scope.",
      "Structure a multi-file frontend architecture with utility helpers and DOM handlers."
    ],
    "concept": {
      "overview": "Prior to ES6 (ECMAScript 2015), JavaScript lacked a native module system, forcing developers to use massive single script files or pollute the window global object. ES6 Modules provide clean, file-scoped boundaries where each file explicitly declares what functions or data it shares using export and what dependencies it consumes using import.",
      "keyPoints": [
        "Module Tag: Script tags loading ES6 modules MUST specify type=\"module\" (<script type=\"module\" src=\"app.js\"></script>).",
        "Named Exports: You can export multiple named entities using export const or export { fnA, fnB }. They must be imported with matching names inside curly braces { fnA }.",
        "Default Export: A module can have exactly one default export (export default function), which can be imported under any alias without curly braces.",
        "Strict Mode by Default: All code inside ES6 modules executes in strict mode (\"use strict\") automatically.",
        "CORS Requirement: Modern browsers only load type=\"module\" scripts via HTTP/HTTPS protocols (e.g. Live Server), not via raw file:/// protocols due to CORS security policies."
      ],
      "analogy": "Think of modules like individual tools in a master craftsman toolbox: instead of carrying a giant 100-pound fused metal block, each tool (hammer, screwdriver, wrench) is independent in its own slot and brought out only when specifically needed."
    },
    "teacherDemo": {
      "title": "ES6 Module Multi-File Architecture Simulation",
      "explanation": "See how math utilities and formatting functions are encapsulated in separate files and imported cleanly into the primary application runner.",
      "language": "html",
      "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>ES6 Modules Demo</title>\n  <style>\n    body { font-family: system-ui, sans-serif; background: #060c18; color: #fff; padding: 24px; }\n    .card { background: #0c1328; border: 1px solid #1e293b; padding: 20px; border-radius: 12px; max-width: 500px; margin: auto; }\n    .val { color: #38bdf8; font-weight: bold; font-family: monospace; }\n  </style>\n</head>\n<body>\n  <div class=\"card\">\n    <h2>📦 Modular Calculator</h2>\n    <p>Addition (Named Export): <span class=\"val\" id=\"resAdd\">...</span></p>\n    <p>Currency Format (Default Export): <span class=\"val\" id=\"resCur\">...</span></p>\n  </div>\n\n  <script type=\"module\">\n    const add = (a, b) => a + b;\n    const formatINR = (num) => '₹' + num.toLocaleString('en-IN');\n\n    const sum = add(1500, 2750);\n    document.getElementById(\"resAdd\").textContent = sum;\n    document.getElementById(\"resCur\").textContent = formatINR(sum);\n  </script>\n</body>\n</html>"
    },
    "practicalLab": {
      "labTitle": "Building Modular Financial Calculator",
      "labDescription": "Structure multiple decoupled script files using ES6 named and default exports.",
      "initialCode": "<!DOCTYPE html>\n<html>\n<head><title>ES6 Modules</title></head>\n<body>\n  <div id=\"output\"></div>\n  <script type=\"module\">\n    // Practice named and default exports\n  </script>\n</body>\n</html>",
      "language": "html",
      "tasks": [
        {
          "id": "t41-1",
          "title": "Add type=\"module\" to Script Tag",
          "instruction": "Add type=\"module\" to the script tag to activate native browser ES6 module loading.",
          "hint": "Use <script type=\"module\" src=\"main.js\"></script>",
          "validatorRegex": "<script\\s+[^>]*type=[\"']module[\"']"
        },
        {
          "id": "t41-2",
          "title": "Export Named Functions from Utility File",
          "instruction": "Export named helper functions calculateGST and calculateDiscount using the export keyword.",
          "hint": "export function calculateGST(amount) { return amount * 0.18; }",
          "validatorRegex": "export\\s+(function|const|let)\\s+calculateGST"
        },
        {
          "id": "t41-3",
          "title": "Import Named Functions in Main Script",
          "instruction": "Import the calculateGST helper from the relative module path ./utils/tax.js.",
          "hint": "import { calculateGST } from \"./utils/tax.js\";",
          "validatorRegex": "import\\s*\\{[^}]*calculateGST[^}]*\\}\\s*from"
        }
      ]
    },
    "debuggingChallenge": {
      "title": "Spot the Bug: Relative Path Extension Missing in ES6 Module Import",
      "buggyCode": "// utils.js exists in the same folder\nimport { calculateTotal } from \"./utils\";\nconsole.log(calculateTotal(100));",
      "bugExplanation": "In Node.js or bundlers like Webpack, file extensions can often be omitted. However, native browser ES6 module loaders do NOT automatically resolve .js extensions; you MUST provide the exact full relative path including .js extension.",
      "fixedCode": "// ✅ Correct: Always specify the explicit .js extension in browser ES6 imports\nimport { calculateTotal } from \"./utils.js\";\nconsole.log(calculateTotal(100));"
    },
    "assignment": {
      "title": "Modular E-Commerce Checkout Calculator Architecture",
      "instructions": [
        "Create three decoupled files: index.html, taxCalculator.js, and main.js.",
        "In taxCalculator.js, export named functions for GST (18%) and Shipping fee calculation, plus default export for Invoice total.",
        "In main.js, import the modules using relative paths with .js extensions and bind them to an interactive billing table.",
        "Run the project using a local dev server (e.g. VS Code Live Server) to verify CORS compliance."
      ],
      "submissionCriteria": "Push modular index.html, taxCalculator.js, and main.js to your GitHub repository under day-41.",
      "fileName": "index.html",
      "solutionCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>BCA Day 41 - Modular Architecture</title>\n  <style>\n    body { font-family: \"Segoe UI\", sans-serif; background: #060c18; color: #fff; padding: 24px; }\n    .card { background: #0c1328; border: 1px solid #1e293b; padding: 24px; border-radius: 12px; max-width: 480px; margin: auto; }\n    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #1e293b; }\n    .total { font-size: 18px; font-weight: bold; color: #38bdf8; border-top: 2px solid #38bdf8; margin-top: 12px; padding-top: 12px; }\n    button { width: 100%; padding: 12px; background: #2563eb; color: #fff; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 16px; }\n  </style>\n</head>\n<body>\n  <div class=\"card\">\n    <h2>🛒 Order Summary (Modular ES6)</h2>\n    <div class=\"row\"><span>Item Subtotal:</span><span id=\"subtotal\">₹2,400</span></div>\n    <div class=\"row\"><span>GST (18%):</span><span id=\"tax\">₹0</span></div>\n    <div class=\"row\"><span>Shipping:</span><span id=\"shipping\">₹0</span></div>\n    <div class=\"row total\"><span>Grand Total:</span><span id=\"grandTotal\">₹0</span></div>\n    <button id=\"calcBtn\">Calculate Invoice</button>\n  </div>\n\n  <script type=\"module\">\n    const taxModule = {\n      getGST: (amt) => amt * 0.18,\n      getShipping: (amt) => amt > 2000 ? 0 : 150,\n      getTotal: (amt, tax, ship) => amt + tax + ship\n    };\n\n    document.getElementById(\"calcBtn\").addEventListener(\"click\", () => {\n      const sub = 2400;\n      const tax = taxModule.getGST(sub);\n      const shipping = taxModule.getShipping(sub);\n      const grand = taxModule.getTotal(sub, tax, shipping);\n\n      document.getElementById(\"tax\").textContent = \"₹\" + tax.toFixed(2);\n      document.getElementById(\"shipping\").textContent = shipping === 0 ? \"FREE\" : \"₹\" + shipping;\n      document.getElementById(\"grandTotal\").textContent = \"₹\" + grand.toFixed(2);\n    });\n  </script>\n</body>\n</html>"
    },
    "githubWorkflow": {
      "repoName": "html-css-projects",
      "commitMessage": "feat(day-41): implement es6 modular architecture with named and default exports",
      "commands": [
        "mkdir day-41",
        "cd day-41",
        "git checkout -b feature/day-41-es6-modules",
        "git add .",
        "git commit -m \"feat(day-41): implement es6 modular architecture with named and default exports\"",
        "git push origin feature/day-41-es6-modules"
      ],
      "tips": "Always test ES6 module web projects using VS Code Live Server or python -m http.server; opening raw file:/// directly will trigger browser CORS security blocks."
    },
    "vivaCheck": {
      "question": "Why does opening an ES6 module file directly from the local file system (file:///) result in a CORS error in modern browsers?",
      "options": [
        "The ES6 module specification strictly treats all origin requests as null on the file:/// protocol, triggering browser cross-origin policy restrictions.",
        "Local hard drives do not support modern JavaScript syntax without installing a local C++ compiler.",
        "The browser automatically disables the JavaScript engine whenever a file extension ends in .html.",
        "file:/// protocols only allow inline script tags and permanently ban all external script tags."
      ],
      "correctAnswer": 0,
      "explanation": "Under the HTML5 / ECMAScript security model, resources fetched with type=\"module\" are loaded using CORS. When opened via file:///, the origin is null, which fails the cross-origin origin checks. Running a local HTTP server provides an authentic HTTP origin (e.g. http://localhost:5500)."
    }
  },

  /* ── DAY 42 ── */
  {
    "id": "day-42",
    "day": 42,
    "year": 1,
    "semester": 1,
    "specialization": "foundation",
    "title": "HTML5 2D Canvas API Fundamentals (Coordinates, Shapes & Paths)",
    "slug": "day-42-html5-canvas-api-fundamentals-coordinates-shapes-paths",
    "category": "Advanced JavaScript & Browser APIs",
    "estimatedTime": "2.5 Hours Practical",
    "difficulty": "Intermediate",
    "objectives": [
      "Initialize an HTML5 <canvas> element and access its 2D rendering context (canvas.getContext(\"2d\")).",
      "Master the Canvas coordinate grid system (X-axis left-to-right, Y-axis top-to-bottom from top-left origin 0,0).",
      "Draw geometric primitives: fillRect(), strokeRect(), and clearRect().",
      "Construct custom vector shapes using path routines: beginPath(), moveTo(), lineTo(), and stroke().",
      "Render smooth circles and arcs using the arc(x, y, radius, startAngle, endAngle) method."
    ],
    "concept": {
      "overview": "The HTML5 <canvas> element provides a resolution-dependent bitmap canvas that can be drawn on dynamically using JavaScript. Unlike regular DOM elements, canvas operates as an immediate-mode raster drawing surface, making it the industry foundation for web games, charts, signature pads, and image manipulation.",
      "keyPoints": [
        "Rendering Context: The <canvas> tag is simply an empty container. All visual rendering is performed through the context object obtained via const ctx = canvas.getContext(\"2d\").",
        "Coordinate Origin: (0, 0) is situated at the TOP-LEFT corner of the canvas. Positive X extends rightwards, and positive Y extends downwards.",
        "Fill vs Stroke: fillStyle and fillRect create solid filled shapes; strokeStyle and strokeRect render outlines.",
        "Path Construction: Always start a new line or vector shape with ctx.beginPath(); otherwise subsequent strokes will connect to previously drawn points.",
        "Angles in Radians: Canvas trigonometric methods expect angles in radians (radians = degrees * Math.PI / 180). A complete circle spans 0 to 2 * Math.PI."
      ],
      "analogy": "Think of the <canvas> element like an artist blank linen canvas mounted on an easel, and the 2D rendering context (ctx) like the artist paintbrush and palette. You command the brush where to move and when to apply paint."
    },
    "teacherDemo": {
      "title": "Canvas Shapes, Gradients & Coordinate Demonstration",
      "explanation": "See how rectangles, diagonal lines, and smooth circular badges are painted programmatically on a single canvas element.",
      "language": "html",
      "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Canvas 2D Fundamentals</title>\n  <style>\n    body { font-family: system-ui, sans-serif; background: #060c18; color: #fff; padding: 24px; text-align: center; }\n    canvas { background: #0c1328; border: 2px solid #1e293b; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.5); }\n  </style>\n</head>\n<body>\n  <h2>🎨 HTML5 2D Canvas Primitives</h2>\n  <canvas id=\"myCanvas\" width=\"480\" height=\"280\"></canvas>\n\n  <script>\n    const canvas = document.getElementById(\"myCanvas\");\n    const ctx = canvas.getContext(\"2d\");\n\n    ctx.fillStyle = \"#2563eb\";\n    ctx.fillRect(30, 30, 100, 70);\n\n    ctx.strokeStyle = \"#38bdf8\";\n    ctx.lineWidth = 3;\n    ctx.strokeRect(160, 30, 100, 70);\n\n    ctx.beginPath();\n    ctx.moveTo(300, 100);\n    ctx.lineTo(360, 30);\n    ctx.lineTo(420, 100);\n    ctx.strokeStyle = \"#c1a648\";\n    ctx.lineWidth = 4;\n    ctx.stroke();\n\n    ctx.beginPath();\n    ctx.arc(240, 190, 50, 0, Math.PI * 2);\n    ctx.fillStyle = \"#04AA6D\";\n    ctx.fill();\n  </script>\n</body>\n</html>"
    },
    "practicalLab": {
      "labTitle": "Canvas Geometric Primitives Lab",
      "labDescription": "Practice creating 2D context, rendering rectangles, lines, and circular arcs.",
      "initialCode": "<!DOCTYPE html>\n<html>\n<body>\n  <canvas id=\"artboard\" width=\"400\" height=\"300\"></canvas>\n  <script>\n    // Get 2D context and render shapes\n  </script>\n</body>\n</html>",
      "language": "html",
      "tasks": [
        {
          "id": "t42-1",
          "title": "Obtain 2D Rendering Context",
          "instruction": "Select canvas element by id \"artboard\" and retrieve its 2d context into a variable named ctx.",
          "hint": "const ctx = canvas.getContext(\"2d\");",
          "validatorRegex": "canvas\\.getContext\\([\"']2d[\"']\\)"
        },
        {
          "id": "t42-2",
          "title": "Draw Filled Rectangle",
          "instruction": "Set the fillStyle to \"#38bdf8\" and draw a filled rectangle at (50, 50) with width 120 and height 80.",
          "hint": "ctx.fillStyle = \"#38bdf8\"; ctx.fillRect(50, 50, 120, 80);",
          "validatorRegex": "ctx\\.fillRect\\(\\s*50\\s*,\\s*50\\s*,\\s*120\\s*,\\s*80\\s*\\)"
        },
        {
          "id": "t42-3",
          "title": "Draw a Circle with arc()",
          "instruction": "Use beginPath(), arc() with 0 to Math.PI * 2, and fill() to render a circle.",
          "hint": "ctx.beginPath(); ctx.arc(100, 100, 40, 0, Math.PI * 2); ctx.fill();",
          "validatorRegex": "ctx\\.arc\\(.*Math\\.PI\\s*\\*\\s*2\\)"
        }
      ]
    },
    "debuggingChallenge": {
      "title": "Spot the Bug: Canvas Dimension Scaling Distortion",
      "buggyCode": "<!-- HTML -->\n<canvas id=\"stage\" style=\"width: 500px; height: 400px;\"></canvas>\n\n<script>\n  const ctx = document.getElementById(\"stage\").getContext(\"2d\");\n  ctx.beginPath();\n  ctx.arc(100, 100, 50, 0, Math.PI * 2);\n  ctx.stroke();\n</script>",
      "bugExplanation": "Canvas has TWO sizes: the drawing buffer coordinate size (defined via HTML width and height attributes) and the CSS display size. If width/height attributes are omitted, the drawing buffer defaults to 300x150 pixels. Applying CSS width/height stretches those 300x150 pixels like an image, distorting all aspect ratios.",
      "fixedCode": "<!-- ✅ Correct: Set the internal coordinate resolution directly on HTML attributes -->\n<canvas id=\"stage\" width=\"500\" height=\"400\"></canvas>\n\n<script>\n  const ctx = document.getElementById(\"stage\").getContext(\"2d\");\n  ctx.beginPath();\n  ctx.arc(100, 100, 50, 0, Math.PI * 2);\n  ctx.stroke();\n</script>"
    },
    "assignment": {
      "title": "Interactive Geometric Flag & University Badge Painter",
      "instructions": [
        "Initialize an HTML5 canvas with width=600 and height=400.",
        "Paint a stylized dark background with a 3-stripe horizontal flag or banner.",
        "In the center, construct a circular gold emblem using ctx.arc().",
        "Add text onto the canvas using ctx.font, ctx.textAlign = \"center\", and ctx.fillText().",
        "Provide an interactive \"Clear Canvas\" button that invokes ctx.clearRect(0, 0, canvas.width, canvas.height)."
      ],
      "submissionCriteria": "Push canvas-primitives.html to your GitHub repository under day-42.",
      "fileName": "index.html",
      "solutionCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>BCA Day 42 - Canvas Flag & Badge</title>\n  <style>\n    body { font-family: \"Segoe UI\", sans-serif; background: #060c18; color: #fff; text-align: center; padding: 24px; }\n    canvas { background: #0c1328; border: 2px solid #1e293b; border-radius: 12px; margin-top: 16px; }\n    .btn { padding: 10px 20px; background: #2563eb; color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; margin: 6px; }\n  </style>\n</head>\n<body>\n  <h2>🎓 BCA Academic Badge Painter</h2>\n  <div>\n    <button class=\"btn\" id=\"drawBtn\">🎨 Draw Badge</button>\n    <button class=\"btn\" style=\"background:#dc2626;\" id=\"clearBtn\">🗑️ Clear Canvas</button>\n  </div>\n  <canvas id=\"badgeCanvas\" width=\"600\" height=\"360\"></canvas>\n\n  <script>\n    const canvas = document.getElementById(\"badgeCanvas\");\n    const ctx = canvas.getContext(\"2d\");\n\n    function drawBadge() {\n      ctx.clearRect(0, 0, canvas.width, canvas.height);\n\n      ctx.fillStyle = \"#0f172a\";\n      ctx.fillRect(40, 20, 520, 320);\n      ctx.strokeStyle = \"#38bdf8\";\n      ctx.lineWidth = 2;\n      ctx.strokeRect(40, 20, 520, 320);\n\n      ctx.beginPath();\n      ctx.arc(300, 160, 70, 0, Math.PI * 2);\n      ctx.fillStyle = \"#1e293b\";\n      ctx.fill();\n      ctx.strokeStyle = \"#c1a648\";\n      ctx.lineWidth = 4;\n      ctx.stroke();\n\n      ctx.beginPath();\n      ctx.arc(300, 160, 55, 0, Math.PI * 2);\n      ctx.fillStyle = \"#04AA6D\";\n      ctx.fill();\n\n      ctx.fillStyle = \"#ffffff\";\n      ctx.font = \"bold 20px Segoe UI\";\n      ctx.textAlign = \"center\";\n      ctx.fillText(\"IGNOU BCA ACADEMY\", 300, 166);\n    }\n\n    document.getElementById(\"drawBtn\").addEventListener(\"click\", drawBadge);\n    document.getElementById(\"clearBtn\").addEventListener(\"click\", () => {\n      ctx.clearRect(0, 0, canvas.width, canvas.height);\n    });\n\n    drawBadge();\n  </script>\n</body>\n</html>"
    },
    "githubWorkflow": {
      "repoName": "html-css-projects",
      "commitMessage": "feat(day-42): implement 2d html5 canvas geometric primitives, paths, and clearRect",
      "commands": [
        "mkdir day-42",
        "cd day-42",
        "git checkout -b feature/day-42-canvas-2d",
        "git add index.html",
        "git commit -m \"feat(day-42): implement 2d html5 canvas geometric primitives, paths, and clearRect\"",
        "git push origin feature/day-42-canvas-2d"
      ],
      "tips": "Always set canvas width and height attributes in HTML, not in CSS, to avoid stretching and blurry rendering."
    },
    "vivaCheck": {
      "question": "What happens to canvas content if you dynamically change canvas.width or canvas.height via JavaScript (e.g. canvas.width = 800)?",
      "options": [
        "The canvas drawing buffer is completely erased and all context state properties (like fillStyle and lineWidth) are reset to defaults.",
        "The existing drawing is automatically scaled up using bicubic interpolation.",
        "The browser creates a second virtual canvas in the background and merges both layers.",
        "The canvas is converted into an SVG vector element without data loss."
      ],
      "correctAnswer": 0,
      "explanation": "Modifying the width or height property of a canvas element immediately reallocates its bitmap memory buffer, which clears all existing drawing pixels and resets context properties (such as fillStyle, font, and strokeStyle) back to their initial defaults."
    }
  },

  /* ── DAY 43 ── */
  {
    "id": "day-43",
    "day": 43,
    "year": 1,
    "semester": 1,
    "specialization": "foundation",
    "title": "Building an Interactive Digital Signature & Sketch Pad (Canvas Mouse & Touch Events)",
    "slug": "day-43-interactive-digital-signature-sketch-pad-canvas",
    "category": "Advanced JavaScript & Browser APIs",
    "estimatedTime": "3 Hours Practical",
    "difficulty": "Intermediate",
    "objectives": [
      "Track mouse movement and drawing state with mousedown, mousemove, and mouseup events.",
      "Accurately calculate canvas-relative cursor coordinates using e.clientX - rect.left.",
      "Implement smooth line drawing with lineCap = \"round\" and lineJoin = \"round\".",
      "Provide interactive toolbars: brush color picker, stroke size slider, and undo/clear options.",
      "Export the finished canvas signature as a high-resolution PNG data URL using canvas.toDataURL()."
    ],
    "concept": {
      "overview": "Digital signatures are standard in modern enterprise web applications (e-banking, delivery verification, university document approvals). In this project, students bind mouse and pointer events to canvas drawing routines, recording fluid handwriting strokes and exporting the resulting image as base64 PNG data.",
      "keyPoints": [
        "Drawing State Flag: A boolean flag (isDrawing = true/false) determines whether cursor movement paints strokes or simply hovers.",
        "Bounding Rect Calculations: Never use raw e.clientX or e.pageX directly for canvas coordinates. Subtract canvas.getBoundingClientRect().left and .top to calculate accurate relative offsets.",
        "Smooth Curves: Setting ctx.lineCap = \"round\" and ctx.lineJoin = \"round\" eliminates jagged edges between connected line segments.",
        "Data Export: canvas.toDataURL(\"image/png\") generates a base64 encoded data URI representing the canvas image, which can be sent to backends or downloaded.",
        "Touch Support: Touch events (touchstart, touchmove, touchend) map to e.touches[0].clientX for mobile responsiveness."
      ],
      "analogy": "Imagine holding a felt-tip pen over a sheet of paper. When you press the pen down (mousedown), isDrawing becomes true. As your hand moves across the surface (mousemove), ink flows. When you lift the pen up (mouseup), ink stops."
    },
    "teacherDemo": {
      "title": "Digital Signature Pad with PNG Download Engine",
      "explanation": "See how freehand drawing is captured stroke-by-stroke and exported as a clean transparent image file.",
      "language": "html",
      "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Signature Pad Demo</title>\n  <style>\n    body { font-family: system-ui, sans-serif; background: #060c18; color: #fff; padding: 20px; text-align: center; }\n    canvas { background: #ffffff; border-radius: 8px; cursor: crosshair; touch-action: none; }\n    .toolbar { margin: 12px auto; display: flex; justify-content: center; gap: 10px; align-items: center; }\n    button { padding: 8px 16px; border-radius: 6px; font-weight: bold; border: none; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <h3>✍️ Digital Signature Pad</h3>\n  <canvas id=\"pad\" width=\"450\" height=\"200\"></canvas>\n  <div class=\"toolbar\">\n    <input type=\"color\" id=\"penColor\" value=\"#000000\" />\n    <input type=\"range\" id=\"penSize\" min=\"1\" max=\"10\" value=\"2\" />\n    <button id=\"clearBtn\" style=\"background:#dc2626;color:#fff;\">Clear</button>\n    <button id=\"saveBtn\" style=\"background:#2563eb;color:#fff;\">Save PNG</button>\n  </div>\n\n  <script>\n    const canvas = document.getElementById(\"pad\");\n    const ctx = canvas.getContext(\"2d\");\n    let isDrawing = false;\n\n    ctx.lineCap = \"round\";\n    ctx.lineJoin = \"round\";\n\n    function getCoords(e) {\n      const rect = canvas.getBoundingClientRect();\n      return { x: e.clientX - rect.left, y: e.clientY - rect.top };\n    }\n\n    canvas.addEventListener(\"mousedown\", (e) => {\n      isDrawing = true;\n      const { x, y } = getCoords(e);\n      ctx.beginPath();\n      ctx.moveTo(x, y);\n    });\n\n    canvas.addEventListener(\"mousemove\", (e) => {\n      if (!isDrawing) return;\n      const { x, y } = getCoords(e);\n      ctx.strokeStyle = document.getElementById(\"penColor\").value;\n      ctx.lineWidth = document.getElementById(\"penSize\").value;\n      ctx.lineTo(x, y);\n      ctx.stroke();\n    });\n\n    window.addEventListener(\"mouseup\", () => { isDrawing = false; });\n    document.getElementById(\"clearBtn\").addEventListener(\"click\", () => {\n      ctx.clearRect(0, 0, canvas.width, canvas.height);\n    });\n    document.getElementById(\"saveBtn\").addEventListener(\"click\", () => {\n      const url = canvas.toDataURL(\"image/png\");\n      const a = document.createElement(\"a\");\n      a.href = url;\n      a.download = \"signature.png\";\n      a.click();\n    });\n  </script>\n</body>\n</html>"
    },
    "practicalLab": {
      "labTitle": "Building Interactive Signature Pad Lab",
      "labDescription": "Implement canvas mouse tracking, smoothing parameters, and data URL export.",
      "initialCode": "<!DOCTYPE html>\n<html>\n<body>\n  <canvas id=\"pad\" width=\"400\" height=\"200\"></canvas>\n  <button id=\"export\">Export</button>\n</body>\n</html>",
      "language": "html",
      "tasks": [
        {
          "id": "t43-1",
          "title": "Set Line Cap and Join Properties",
          "instruction": "Configure the 2D context lineCap and lineJoin properties to \"round\" for smooth handwriting rendering.",
          "hint": "ctx.lineCap = \"round\"; ctx.lineJoin = \"round\";",
          "validatorRegex": "ctx\\.lineCap\\s*=\\s*[\"']round[\"']"
        },
        {
          "id": "t43-2",
          "title": "Calculate Bounding Client Rect Coordinates",
          "instruction": "Calculate mouse coordinates relative to canvas using getBoundingClientRect.",
          "hint": "const rect = canvas.getBoundingClientRect(); return { x: e.clientX - rect.left, y: e.clientY - rect.top };",
          "validatorRegex": "getBoundingClientRect\\(\\)"
        },
        {
          "id": "t43-3",
          "title": "Export Canvas as Image with toDataURL",
          "instruction": "Call canvas.toDataURL(\"image/png\") to generate a downloadable base64 image.",
          "hint": "const signatureUrl = canvas.toDataURL(\"image/png\");",
          "validatorRegex": "canvas\\.toDataURL\\([\"']image\\/png[\"']\\)"
        }
      ]
    },
    "debuggingChallenge": {
      "title": "Spot the Bug: Runaway Line Sticking to Cursor After Mouse Leave",
      "buggyCode": "canvas.addEventListener(\"mousedown\", () => { isDrawing = true; });\ncanvas.addEventListener(\"mouseup\", () => { isDrawing = false; });\n// If cursor leaves the canvas, mouseup is never caught by canvas!",
      "bugExplanation": "Attaching the mouseup listener solely to the canvas element misses release events if the user drags the mouse outside the canvas boundaries before letting go. Attaching mouseup to the global window ensures isDrawing is always reset.",
      "fixedCode": "canvas.addEventListener(\"mousedown\", () => { isDrawing = true; });\n// ✅ Correct: Bind mouseup to window so releases outside canvas are safely captured\nwindow.addEventListener(\"mouseup\", () => { isDrawing = false; });"
    },
    "assignment": {
      "title": "University Student Verification Signature & Whiteboard Studio",
      "instructions": [
        "Create a responsive drawing surface with white canvas background on a dark platform theme.",
        "Include a controls dock: color palette buttons (Black, Blue, Crimson, Emerald), line thickness slider (1-8px), and an eraser mode.",
        "Implement the canvas.toDataURL() download trigger that saves the signature file named bca-signature.png.",
        "Display a live image preview card beneath the canvas immediately when the user clicks \"Confirm Signature\"."
      ],
      "submissionCriteria": "Push signature-pad.html and signature.js to your GitHub repository under day-43.",
      "fileName": "index.html",
      "solutionCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>BCA Day 43 - Signature Studio</title>\n  <style>\n    body { font-family: \"Segoe UI\", sans-serif; background: #060c18; color: #fff; padding: 24px; text-align: center; }\n    .card { background: #0c1328; border: 1px solid #1e293b; padding: 24px; border-radius: 12px; max-width: 550px; margin: auto; }\n    canvas { background: #ffffff; border-radius: 8px; cursor: crosshair; touch-action: none; border: 2px dashed #38bdf8; }\n    .toolbar { display: flex; justify-content: center; gap: 8px; align-items: center; margin: 16px 0; }\n    button { padding: 8px 16px; border-radius: 6px; font-weight: bold; border: none; cursor: pointer; }\n    .btn-action { background: #2563eb; color: #fff; }\n  </style>\n</head>\n<body>\n  <div class=\"card\">\n    <h2>✍️ Student Verification Signature Pad</h2>\n    <canvas id=\"sigCanvas\" width=\"480\" height=\"220\"></canvas>\n    <div class=\"toolbar\">\n      <input type=\"color\" id=\"strokeColor\" value=\"#000000\" />\n      <input type=\"range\" id=\"strokeWidth\" min=\"1\" max=\"8\" value=\"2\" />\n      <button id=\"clearBtn\" style=\"background:#dc2626;color:#fff;\">Clear</button>\n      <button id=\"confirmBtn\" class=\"btn-action\">Download PNG</button>\n    </div>\n  </div>\n\n  <script>\n    const canvas = document.getElementById(\"sigCanvas\");\n    const ctx = canvas.getContext(\"2d\");\n    let isDrawing = false;\n    ctx.lineCap = \"round\";\n    ctx.lineJoin = \"round\";\n\n    function getPos(e) {\n      const r = canvas.getBoundingClientRect();\n      return { x: e.clientX - r.left, y: e.clientY - r.top };\n    }\n\n    canvas.addEventListener(\"mousedown\", (e) => {\n      isDrawing = true;\n      const pos = getPos(e);\n      ctx.beginPath();\n      ctx.moveTo(pos.x, pos.y);\n    });\n\n    canvas.addEventListener(\"mousemove\", (e) => {\n      if (!isDrawing) return;\n      const pos = getPos(e);\n      ctx.strokeStyle = document.getElementById(\"strokeColor\").value;\n      ctx.lineWidth = document.getElementById(\"strokeWidth\").value;\n      ctx.lineTo(pos.x, pos.y);\n      ctx.stroke();\n    });\n\n    window.addEventListener(\"mouseup\", () => { isDrawing = false; });\n    document.getElementById(\"clearBtn\").addEventListener(\"click\", () => ctx.clearRect(0, 0, canvas.width, canvas.height));\n    document.getElementById(\"confirmBtn\").addEventListener(\"click\", () => {\n      const a = document.createElement(\"a\");\n      a.href = canvas.toDataURL(\"image/png\");\n      a.download = \"bca-signature.png\";\n      a.click();\n    });\n  </script>\n</body>\n</html>"
    },
    "githubWorkflow": {
      "repoName": "html-css-projects",
      "commitMessage": "feat(day-43): build interactive digital signature pad with mouse tracking and toDataURL png export",
      "commands": [
        "mkdir day-43",
        "cd day-43",
        "git checkout -b feature/day-43-signature-pad",
        "git add index.html",
        "git commit -m \"feat(day-43): build interactive digital signature pad with mouse tracking and toDataURL png export\"",
        "git push origin feature/day-43-signature-pad"
      ],
      "tips": "Add touch-action: none to canvas CSS to prevent mobile touchscreens from scrolling while students are signing."
    },
    "vivaCheck": {
      "question": "What is the purpose of CSS touch-action: none on a drawing canvas on mobile devices?",
      "options": [
        "It disables default browser gesture actions (like scrolling and pinch-to-zoom) so touch movements are sent directly to your drawing script.",
        "It prevents other apps on the phone from taking screenshots of the canvas.",
        "It increases the GPU clock frequency on mobile processors by 50%.",
        "It automatically forces the device keyboard to remain open."
      ],
      "correctAnswer": 0,
      "explanation": "On mobile touch devices, dragging your finger defaults to scrolling the web page. Setting touch-action: none informs the browser that touch interactions belong exclusively to the canvas, allowing fluid continuous drawing without jittery screen scrolling."
    }
  },

  /* ── DAY 44 ── */
  {
    "id": "day-44",
    "day": 44,
    "year": 1,
    "semester": 1,
    "specialization": "foundation",
    "title": "Custom HTML5 Audio & Video Player (Media API & Real-time Progress Bar)",
    "slug": "day-44-custom-html5-audio-video-player-media-api",
    "category": "Advanced JavaScript & Browser APIs",
    "estimatedTime": "2.5 Hours Practical",
    "difficulty": "Intermediate",
    "objectives": [
      "Control HTML5 media elements (<video> and <audio>) programmatically with media.play() and media.pause().",
      "Track playback progress in real time using the timeupdate event and duration / currentTime properties.",
      "Build a custom scrubbable progress bar that allows users to seek forward and backward.",
      "Implement audio volume manipulation and mute toggle buttons using media.volume and media.muted.",
      "Format raw playback seconds into polished standard mm:ss digital timer strings."
    ],
    "concept": {
      "overview": "While modern browsers offer default native media controls via the controls attribute, commercial streaming platforms (YouTube, Netflix, Spotify) require fully customized player skins. The HTML5 Media API exposes rich methods and events that allow developers to design bespoke media interfaces with custom timelines, play buttons, and volume bars.",
      "keyPoints": [
        "Playback Control: Calling media.play() returns a Promise. media.pause() halts playback without resetting currentTime.",
        "Time Tracking: The timeupdate event fires several times per second during active playback. Calculate percentage with (currentTime / duration) * 100.",
        "Seeking: Setting media.currentTime = newSeconds immediately jumps the media playback to that specific timestamp.",
        "Volume Range: media.volume accepts decimal values strictly between 0.0 (silent) and 1.0 (maximum volume).",
        "Mute State: media.muted is a boolean toggle that preserves the current volume value when toggled back on."
      ],
      "analogy": "Think of the HTML5 Media API like the remote control of a physical DVD/Blu-ray player: the play button sends a laser command to spin the disc, the timeline slider moves the laser head to a specific chapter, and the volume wheel adjusts the speaker amplifier."
    },
    "teacherDemo": {
      "title": "Custom Dark-Themed Audio/Video Player Console",
      "explanation": "See how play/pause toggles, timeline progress scrubbing, and duration formatting are wired up using vanilla JavaScript.",
      "language": "html",
      "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Custom Media Player</title>\n  <style>\n    body { font-family: system-ui, sans-serif; background: #060c18; color: #fff; padding: 24px; text-align: center; }\n    .player-card { max-width: 480px; margin: auto; background: #0c1328; border: 1px solid #1e293b; padding: 20px; border-radius: 12px; }\n    .progress-bar { width: 100%; height: 8px; background: #1e293b; border-radius: 4px; cursor: pointer; margin: 16px 0; position: relative; }\n    .progress-fill { width: 0%; height: 100%; background: #04AA6D; border-radius: 4px; }\n    .controls { display: flex; justify-content: space-between; align-items: center; }\n    button { background: #2563eb; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold; }\n  </style>\n</head>\n<body>\n  <div class=\"player-card\">\n    <h3>🎵 Nextsem Podcast Player</h3>\n    <audio id=\"audioTrack\" src=\"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3\"></audio>\n    <div class=\"progress-bar\" id=\"progressBar\"><div class=\"progress-fill\" id=\"progressFill\"></div></div>\n    <div class=\"controls\">\n      <button id=\"playBtn\">▶ Play</button>\n      <span id=\"timeDisplay\" style=\"font-family:monospace;font-size:13px;\">00:00 / 00:00</span>\n      <button id=\"muteBtn\" style=\"background:#475569;\">🔊</button>\n    </div>\n  </div>\n\n  <script>\n    const audio = document.getElementById(\"audioTrack\");\n    const playBtn = document.getElementById(\"playBtn\");\n    const fill = document.getElementById(\"progressFill\");\n\n    playBtn.addEventListener(\"click\", () => {\n      if (audio.paused) { audio.play(); playBtn.textContent = \"⏸ Pause\"; }\n      else { audio.pause(); playBtn.textContent = \"▶ Play\"; }\n    });\n\n    audio.addEventListener(\"timeupdate\", () => {\n      const pct = (audio.currentTime / audio.duration) * 100;\n      fill.style.width = pct + \"%\";\n    });\n  </script>\n</body>\n</html>"
    },
    "practicalLab": {
      "labTitle": "Media Playback Controls Lab",
      "labDescription": "Control playback state, compute elapsed progress, and bind volume listeners.",
      "initialCode": "<!DOCTYPE html>\n<html>\n<body>\n  <video id=\"vid\" src=\"sample.mp4\"></video>\n  <button id=\"play\">Play</button>\n  <div id=\"bar\"></div>\n</body>\n</html>",
      "language": "html",
      "tasks": [
        {
          "id": "t44-1",
          "title": "Toggle Media Play and Pause",
          "instruction": "Write an event listener on playBtn that checks video.paused and calls video.play() or video.pause().",
          "hint": "if (video.paused) { video.play(); } else { video.pause(); }",
          "validatorRegex": "video\\.play\\(\\)"
        },
        {
          "id": "t44-2",
          "title": "Calculate Playback Percentage",
          "instruction": "Calculate the percentage of media played using (media.currentTime / media.duration) * 100.",
          "hint": "const percent = (media.currentTime / media.duration) * 100;",
          "validatorRegex": "media\\.currentTime\\s*\\/\\s*media\\.duration"
        },
        {
          "id": "t44-3",
          "title": "Implement Volume Slider Handler",
          "instruction": "Listen to input event on volumeSlider and set media.volume to e.target.value.",
          "hint": "media.volume = parseFloat(e.target.value);",
          "validatorRegex": "media\\.volume\\s*="
        }
      ]
    },
    "debuggingChallenge": {
      "title": "Spot the Bug: Unhandled Play Promise Rejection on Autoplay",
      "buggyCode": "window.addEventListener(\"DOMContentLoaded\", () => {\n  const audio = document.getElementById(\"player\");\n  audio.play(); // ❌ Fails on modern browsers!\n});",
      "bugExplanation": "Modern browsers block unmuted audio and video autoplay to protect users from unexpected noise and bandwidth consumption. media.play() returns a Promise which rejects if no user gesture (click or tap) has occurred yet. You must either start muted (video.muted = true) or wait for a user button click.",
      "fixedCode": "// ✅ Correct: Play must be initiated by a user click, or explicitly muted first\nplayBtn.addEventListener(\"click\", async () => {\n  try {\n    await audio.play();\n  } catch (err) {\n    console.warn(\"Autoplay blocked, user interaction required:\", err);\n  }\n});"
    },
    "assignment": {
      "title": "University Video Lecture Mini-Player Studio",
      "instructions": [
        "Build a responsive custom video player with play/pause, restart, and 10s skip (+/- 10s) buttons.",
        "Implement an interactive timeline slider that highlights the elapsed time with emerald green color (#04AA6D).",
        "Display elapsed time and total duration formatted neatly as mm:ss (e.g. 02:45 / 15:30).",
        "Add a volume control slider and fullscreen toggle button using document.fullscreenElement / requestFullscreen()."
      ],
      "submissionCriteria": "Push video-player.html and player.js to your GitHub repository under day-44.",
      "fileName": "index.html",
      "solutionCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>BCA Day 44 - Video Lecture Player</title>\n  <style>\n    body { font-family: \"Segoe UI\", sans-serif; background: #060c18; color: #fff; padding: 24px; text-align: center; }\n    .player-wrap { max-width: 640px; margin: auto; background: #0c1328; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden; }\n    video { width: 100%; display: block; background: #000; }\n    .controls { padding: 16px; display: flex; flex-direction: column; gap: 12px; }\n    .timeline { width: 100%; height: 6px; background: #1e293b; border-radius: 3px; cursor: pointer; position: relative; }\n    .timeline-fill { width: 0%; height: 100%; background: #04AA6D; border-radius: 3px; }\n    .btn-row { display: flex; justify-content: space-between; align-items: center; }\n    button { padding: 6px 14px; background: #2563eb; color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <div class=\"player-wrap\">\n    <video id=\"vid\" src=\"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4\"></video>\n    <div class=\"controls\">\n      <div class=\"timeline\" id=\"timeline\"><div class=\"timeline-fill\" id=\"fill\"></div></div>\n      <div class=\"btn-row\">\n        <button id=\"playBtn\">▶ Play</button>\n        <span id=\"timeText\" style=\"font-family:monospace;font-size:12px;\">00:00 / 00:00</span>\n      </div>\n    </div>\n  </div>\n\n  <script>\n    const vid = document.getElementById(\"vid\");\n    const playBtn = document.getElementById(\"playBtn\");\n    const fill = document.getElementById(\"fill\");\n    const timeText = document.getElementById(\"timeText\");\n\n    function formatTime(sec) {\n      if (isNaN(sec)) return \"00:00\";\n      const m = Math.floor(sec / 60);\n      const s = Math.floor(sec % 60);\n      return (m < 10 ? \"0\" + m : m) + \":\" + (s < 10 ? \"0\" + s : s);\n    }\n\n    playBtn.addEventListener(\"click\", () => {\n      if (vid.paused) { vid.play(); playBtn.textContent = \"⏸ Pause\"; }\n      else { vid.pause(); playBtn.textContent = \"▶ Play\"; }\n    });\n\n    vid.addEventListener(\"timeupdate\", () => {\n      const pct = (vid.currentTime / vid.duration) * 100;\n      fill.style.width = pct + \"%\";\n      timeText.textContent = formatTime(vid.currentTime) + \" / \" + formatTime(vid.duration);\n    });\n  </script>\n</body>\n</html>"
    },
    "githubWorkflow": {
      "repoName": "html-css-projects",
      "commitMessage": "feat(day-44): implement custom html5 video audio player with seekable timeline and volume controls",
      "commands": [
        "mkdir day-44",
        "cd day-44",
        "git checkout -b feature/day-44-media-player",
        "git add index.html",
        "git commit -m \"feat(day-44): implement custom html5 video audio player with seekable timeline and volume controls\"",
        "git push origin feature/day-44-media-player"
      ],
      "tips": "Remember to handle the isNaN check on media.duration because before the metadata loads, duration returns NaN."
    },
    "vivaCheck": {
      "question": "Why is it necessary to call e.preventDefault() during the dragover event when implementing HTML5 Drag and Drop?",
      "options": [
        "By default, browsers reject drop operations on web page elements; calling preventDefault() signals that the target is a valid drop zone.",
        "preventDefault() clears the operating system clipboard buffer before dropping files.",
        "Without preventDefault(), the browser forces a complete page reload on every drag movement.",
        "It converts dragged images into high-resolution canvas elements automatically."
      ],
      "correctAnswer": 0,
      "explanation": "Under the HTML5 Drag and Drop specification, the default behavior for most DOM elements is to disallow dropping. Calling e.preventDefault() inside the dragover event handler explicitly tells the browser that this element is a valid drop target, allowing the subsequent drop event to fire."
    }
  },

  /* ── DAY 45 ── */
  {
    "id": "day-45",
    "day": 45,
    "year": 1,
    "semester": 1,
    "specialization": "foundation",
    "title": "HTML5 Drag & Drop API (Building an Interactive Kanban Task Board)",
    "slug": "day-45-html5-drag-and-drop-api-kanban-board",
    "category": "Advanced JavaScript & Browser APIs",
    "estimatedTime": "3 Hours Practical",
    "difficulty": "Intermediate",
    "objectives": [
      "Enable native browser dragging by setting the HTML attribute draggable=\"true\".",
      "Handle key drag lifecycle events: dragstart, dragend, dragover, dragenter, dragleave, and drop.",
      "Pass structured data across drag zones using the DataTransfer object (e.dataTransfer.setData()).",
      "Build a multi-column Kanban board (To Do, In Progress, Done) with smooth visual dropzone feedback.",
      "Persist card positions across columns into localStorage so board state survives page refreshes."
    ],
    "concept": {
      "overview": "The HTML5 Drag and Drop (DnD) API allows users to grab DOM elements with their mouse or pointer, drag them across the viewport, and drop them into designated target dropzones. This API powers modern project management tools like Trello, Jira, and GitHub Project Boards.",
      "keyPoints": [
        "Draggable Attribute: Elements are not draggable by default; you must explicitly set draggable=\"true\" on the element.",
        "DataTransfer Object: During dragstart, store payload data using e.dataTransfer.setData(\"text/plain\", cardId). During drop, read it with e.dataTransfer.getData(\"text/plain\").",
        "Dragover Requirement: You MUST invoke e.preventDefault() inside the dragover event listener; otherwise the drop event will never fire!",
        "Visual Feedback: Use dragenter and dragleave to add and remove highlight CSS classes (e.g. .drag-over) on column containers.",
        "DOM Repositioning: Inside drop, append the dragged element using targetColumn.appendChild(draggedCard)."
      ],
      "analogy": "Imagine a physical whiteboard with sticky notes categorized into columns (Planning, In Progress, Finished). Drag and drop lets you peel a sticky note off the whiteboard, carry it across to a new column, and press it firmly against the new column."
    },
    "teacherDemo": {
      "title": "2-Column Drag and Drop Kanban Board Demo",
      "explanation": "See how cards are transferred between columns with animated drop indicators and clean DOM appending.",
      "language": "html",
      "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Drag and Drop Kanban</title>\n  <style>\n    body { font-family: system-ui, sans-serif; background: #060c18; color: #fff; padding: 24px; }\n    .board { display: flex; gap: 20px; max-width: 720px; margin: auto; }\n    .column { flex: 1; background: #0c1328; border: 2px dashed #1e293b; border-radius: 12px; padding: 16px; min-height: 250px; }\n    .column.drag-over { border-color: #38bdf8; background: #0f1d3a; }\n    .card { background: #1e293b; border: 1px solid #334155; padding: 12px; border-radius: 8px; margin-bottom: 10px; cursor: grab; }\n  </style>\n</head>\n<body>\n  <div class=\"board\">\n    <div class=\"column\" id=\"col-todo\">\n      <h4>📋 To Do</h4>\n      <div class=\"card\" draggable=\"true\" id=\"c1\">Study BCS-111 Networking</div>\n    </div>\n    <div class=\"column\" id=\"col-done\">\n      <h4>✅ Completed</h4>\n      <div class=\"card\" draggable=\"true\" id=\"c2\">Setup VS Code Environment</div>\n    </div>\n  </div>\n\n  <script>\n    let dragged = null;\n    document.querySelectorAll(\".card\").forEach(c => {\n      c.addEventListener(\"dragstart\", (e) => { dragged = e.target; });\n    });\n    document.querySelectorAll(\".column\").forEach(col => {\n      col.addEventListener(\"dragover\", (e) => { e.preventDefault(); col.classList.add(\"drag-over\"); });\n      col.addEventListener(\"dragleave\", () => { col.classList.remove(\"drag-over\"); });\n      col.addEventListener(\"drop\", (e) => {\n        e.preventDefault();\n        col.classList.remove(\"drag-over\");\n        if (dragged) col.appendChild(dragged);\n      });\n    });\n  </script>\n</body>\n</html>"
    },
    "practicalLab": {
      "labTitle": "Kanban Drag and Drop Operations Lab",
      "labDescription": "Configure draggable cards, dropzone preventDefault, and DOM reparenting.",
      "initialCode": "<!DOCTYPE html>\n<html>\n<body>\n  <div class=\"col\" id=\"col1\"><div class=\"card\" draggable=\"true\">Task 1</div></div>\n  <div class=\"col\" id=\"col2\"></div>\n</body>\n</html>",
      "language": "html",
      "tasks": [
        {
          "id": "t45-1",
          "title": "Add draggable Attribute to Elements",
          "instruction": "Add draggable=\"true\" attribute to task cards so the browser allows native dragging.",
          "hint": "<div class=\"card\" draggable=\"true\">My Task</div>",
          "validatorRegex": "draggable=[\"']true[\"']"
        },
        {
          "id": "t45-2",
          "title": "Prevent Default on dragover",
          "instruction": "Call e.preventDefault() inside the dragover event listener to designate container as drop zone.",
          "hint": "column.addEventListener(\"dragover\", (e) => { e.preventDefault(); });",
          "validatorRegex": "addEventListener\\([\"']dragover[\"'].*preventDefault"
        },
        {
          "id": "t45-3",
          "title": "Append Dragged Element on Drop",
          "instruction": "Inside the drop event handler, prevent default and append the dragged element into the drop column.",
          "hint": "column.appendChild(draggedItem);",
          "validatorRegex": "column\\.appendChild\\(\\s*draggedItem\\s*\\)"
        }
      ]
    },
    "debuggingChallenge": {
      "title": "Spot the Bug: Drop Event Never Fires",
      "buggyCode": "const column = document.getElementById(\"doneCol\");\n// ❌ Missing dragover listener!\ncolumn.addEventListener(\"drop\", (e) => {\n  console.log(\"Card dropped!\");\n  column.appendChild(draggedItem);\n});",
      "bugExplanation": "By default, browser elements reject drops. Without an active dragover event listener that explicitly executes e.preventDefault(), the browser cancels the drop action and the \"drop\" event is never triggered.",
      "fixedCode": "const column = document.getElementById(\"doneCol\");\n// ✅ Correct: e.preventDefault() in dragover is mandatory for drop to fire!\ncolumn.addEventListener(\"dragover\", (e) => {\n  e.preventDefault();\n});\ncolumn.addEventListener(\"drop\", (e) => {\n  e.preventDefault();\n  column.appendChild(draggedItem);\n});"
    },
    "assignment": {
      "title": "BCA 3-Column Sprint Project Kanban Board",
      "instructions": [
        "Build a 3-column Kanban workspace: \"Backlog\", \"In Development\", and \"Verified & Completed\".",
        "Provide an \"Add New Task\" modal or input form to dynamically spawn new draggable cards.",
        "Highlight columns dynamically with cyan borders when a card is dragged over them.",
        "Persist all card positions in localStorage so refreshing the page restores the exact column state."
      ],
      "submissionCriteria": "Push kanban-board.html and kanban.js to your GitHub repository under day-45.",
      "fileName": "index.html",
      "solutionCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>BCA Day 45 - Kanban Board</title>\n  <style>\n    body { font-family: \"Segoe UI\", sans-serif; background: #060c18; color: #fff; padding: 24px; }\n    .header { max-width: 900px; margin: auto; display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }\n    .board { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 900px; margin: auto; }\n    .col { background: #0c1328; border: 2px dashed #1e293b; border-radius: 12px; padding: 16px; min-height: 380px; }\n    .col.hovered { border-color: #38bdf8; background: #0f1e3d; }\n    .card { background: #1e293b; border: 1px solid #334155; padding: 12px; border-radius: 8px; margin-bottom: 10px; cursor: grab; user-select: none; }\n  </style>\n</head>\n<body>\n  <div class=\"header\">\n    <h2>📋 BCA Sprint Kanban Board</h2>\n    <div>\n      <input type=\"text\" id=\"taskInput\" placeholder=\"New task...\" />\n      <button id=\"addBtn\">+ Add Card</button>\n    </div>\n  </div>\n\n  <div class=\"board\">\n    <div class=\"col\" id=\"col-backlog\"><h4>📌 Backlog</h4><div class=\"card\" draggable=\"true\">Write Unit Tests</div></div>\n    <div class=\"col\" id=\"col-progress\"><h4>⚙️ In Progress</h4><div class=\"card\" draggable=\"true\">Canvas Pad</div></div>\n    <div class=\"col\" id=\"col-done\"><h4>✅ Completed</h4><div class=\"card\" draggable=\"true\">ES6 Setup</div></div>\n  </div>\n\n  <script>\n    let dragged = null;\n    function attach(card) {\n      card.addEventListener(\"dragstart\", (e) => { dragged = e.target; });\n    }\n    document.querySelectorAll(\".card\").forEach(attach);\n    document.querySelectorAll(\".col\").forEach(col => {\n      col.addEventListener(\"dragover\", (e) => { e.preventDefault(); col.classList.add(\"hovered\"); });\n      col.addEventListener(\"dragleave\", () => { col.classList.remove(\"hovered\"); });\n      col.addEventListener(\"drop\", (e) => {\n        e.preventDefault();\n        col.classList.remove(\"hovered\");\n        if (dragged) col.appendChild(dragged);\n      });\n    });\n  </script>\n</body>\n</html>"
    },
    "githubWorkflow": {
      "repoName": "html-css-projects",
      "commitMessage": "feat(day-45): build 3-column interactive kanban task board using html5 drag and drop api",
      "commands": [
        "mkdir day-45",
        "cd day-45",
        "git checkout -b feature/day-45-kanban-dnd",
        "git add index.html",
        "git commit -m \"feat(day-45): build 3-column interactive kanban task board using html5 drag and drop api\"",
        "git push origin feature/day-45-kanban-dnd"
      ],
      "tips": "Ensure dynamic cards created after initial page load also have dragstart and dragend listeners attached."
    },
    "vivaCheck": {
      "question": "Which method on navigator.geolocation triggers continuous tracking of user coordinates as they move?",
      "options": [
        "navigator.geolocation.watchPosition()",
        "navigator.geolocation.getCurrentPosition()",
        "navigator.geolocation.trackMovementLoop()",
        "window.addEventListener(\"geolocate\")"
      ],
      "correctAnswer": 0,
      "explanation": "While getCurrentPosition() retrieves a one-time snapshot of the user coordinates, watchPosition() registers a handler function that is automatically invoked whenever the device position changes (e.g. GPS update), returning a watch ID that can be cancelled with clearWatch()."
    }
  },

  /* ── DAY 46 ── */
  {
    "id": "day-46",
    "day": 46,
    "year": 1,
    "semester": 1,
    "specialization": "foundation",
    "title": "Browser Geolocation & Device APIs (Permission Models & Coordinate Mapping)",
    "slug": "day-46-browser-geolocation-device-apis-coordinates",
    "category": "Advanced JavaScript & Browser APIs",
    "estimatedTime": "2 Hours Practical",
    "difficulty": "Intermediate",
    "objectives": [
      "Access the HTML5 Geolocation API via navigator.geolocation.getCurrentPosition().",
      "Parse the GeolocationPosition object to extract latitude, longitude, and accuracy in meters.",
      "Handle permission denial, timeout, and positioning unavailable errors using standard error codes.",
      "Construct a live interactive Google Maps / OpenStreetMap direct link using latitude and longitude.",
      "Understand the browser permission prompt lifecycle and HTTPS security requirements."
    ],
    "concept": {
      "overview": "Location-aware applications (campus navigation, food delivery tracking, local weather utilities) rely on the HTML5 Geolocation API. This browser API securely requests permission from the student to obtain their GPS coordinates or IP-derived geographical position.",
      "keyPoints": [
        "HTTPS Requirement: Browsers strictly restrict the Geolocation API to secure origins (HTTPS and localhost); unencrypted HTTP requests will immediately fail.",
        "Permission Prompt: The browser automatically displays a permission prompt (\"Allow site to access location?\"). Developers cannot bypass this security modal.",
        "Position Object: The success callback receives a position object containing coords.latitude, coords.longitude, and coords.accuracy (in meters).",
        "Error Handling: The error callback receives an error object with code: 1 (PERMISSION_DENIED), 2 (POSITION_UNAVAILABLE), or 3 (TIMEOUT).",
        "Options Configuration: Pass an options object { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 } to request GPS precision."
      ],
      "analogy": "Think of the Geolocation API like a registered postal courier: before handing over your house address, the courier asks for your explicit signature (permission). Once signed, the courier reads the GPS satellite coordinates from their handheld scanner."
    },
    "teacherDemo": {
      "title": "Live Geolocation Coordinate Diagnostic Console",
      "explanation": "See how user coordinates are requested, error states are intercepted, and interactive map links are generated.",
      "language": "html",
      "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Geolocation API Demo</title>\n  <style>\n    body { font-family: system-ui, sans-serif; background: #060c18; color: #fff; padding: 24px; text-align: center; }\n    .card { background: #0c1328; border: 1px solid #1e293b; padding: 24px; border-radius: 12px; max-width: 460px; margin: auto; }\n    .coord { font-family: monospace; color: #38bdf8; font-size: 16px; margin: 8px 0; }\n    button { padding: 10px 18px; background: #2563eb; color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <div class=\"card\">\n    <h3>📍 Live Geolocation Diagnostic</h3>\n    <button id=\"locBtn\">📡 Locate My Device</button>\n    <div id=\"output\" style=\"display:none;margin-top:16px;\">\n      <div class=\"coord\">Lat: <span id=\"lat\">...</span>, Lon: <span id=\"lon\">...</span></div>\n    </div>\n  </div>\n\n  <script>\n    document.getElementById(\"locBtn\").addEventListener(\"click\", () => {\n      navigator.geolocation.getCurrentPosition((pos) => {\n        document.getElementById(\"lat\").textContent = pos.coords.latitude.toFixed(4);\n        document.getElementById(\"lon\").textContent = pos.coords.longitude.toFixed(4);\n        document.getElementById(\"output\").style.display = \"block\";\n      });\n    });\n  </script>\n</body>\n</html>"
    },
    "practicalLab": {
      "labTitle": "Geolocation Service Integration Lab",
      "labDescription": "Request GPS coordinates and handle error callbacks.",
      "initialCode": "<!DOCTYPE html>\n<html>\n<body>\n  <button id=\"find\">Locate</button>\n  <div id=\"coords\"></div>\n</body>\n</html>",
      "language": "html",
      "tasks": [
        {
          "id": "t46-1",
          "title": "Check Geolocation API Support",
          "instruction": "Check if navigator.geolocation exists before calling location methods.",
          "hint": "if (\"geolocation\" in navigator) { ... }",
          "validatorRegex": "navigator\\.geolocation"
        },
        {
          "id": "t46-2",
          "title": "Call getCurrentPosition with Callbacks",
          "instruction": "Invoke navigator.geolocation.getCurrentPosition with success and error handlers.",
          "hint": "navigator.geolocation.getCurrentPosition(onSuccess, onError);",
          "validatorRegex": "getCurrentPosition"
        },
        {
          "id": "t46-3",
          "title": "Extract Latitude and Longitude",
          "instruction": "Destructure latitude and longitude from position.coords.",
          "hint": "const { latitude, longitude } = position.coords;",
          "validatorRegex": "latitude.*longitude"
        }
      ]
    },
    "debuggingChallenge": {
      "title": "Spot the Bug: Geolocation Permanently Fails on Insecure HTTP Protocol",
      "buggyCode": "// Testing on raw http:// origin\nnavigator.geolocation.getCurrentPosition(pos => {\n  console.log(pos.coords.latitude);\n});",
      "bugExplanation": "To safeguard user privacy, browser vendors (Google Chrome, Firefox, Safari) enforce Powerful Features Policies: Geolocation, Cameras, and Microphones are strictly restricted to Secure Contexts (https:// or http://localhost). Insecure remote HTTP origins automatically disable the API.",
      "fixedCode": "// ✅ Correct: Geolocation requires HTTPS in production, or localhost during development\nif (location.protocol === \"https:\" || location.hostname === \"localhost\") {\n  navigator.geolocation.getCurrentPosition(pos => console.log(pos.coords.latitude));\n} else {\n  console.warn(\"Geolocation requires HTTPS or localhost.\");\n}"
    },
    "assignment": {
      "title": "University Campus Nearest Exam Center Finder App",
      "instructions": [
        "Retrieve user live coordinates using navigator.geolocation.getCurrentPosition.",
        "Calculate straight-line distance to 3 pre-defined BCA exam centers (using the Haversine formula or simplified Euclidean distance).",
        "Sort the exam centers dynamically and highlight the closest examination center with an emerald green badge.",
        "Handle permission denial with a friendly instructional card explaining how to re-enable location permissions."
      ],
      "submissionCriteria": "Push exam-locator.html and locator.js to your GitHub repository under day-46.",
      "fileName": "index.html",
      "solutionCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>BCA Day 46 - Campus Exam Locator</title>\n  <style>\n    body { font-family: \"Segoe UI\", sans-serif; background: #060c18; color: #fff; padding: 24px; text-align: center; }\n    .card { background: #0c1328; border: 1px solid #1e293b; padding: 24px; border-radius: 12px; max-width: 520px; margin: auto; }\n    .center-card { background: #060c18; border: 1px solid #1e293b; padding: 14px; border-radius: 8px; margin: 10px 0; text-align: left; }\n    button { padding: 10px 20px; background: #2563eb; color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <div class=\"card\">\n    <h2>📍 Campus Exam Center Finder</h2>\n    <button id=\"findBtn\">Locate Nearest Center</button>\n    <div id=\"results\" style=\"margin-top:16px;\"></div>\n  </div>\n\n  <script>\n    document.getElementById(\"findBtn\").addEventListener(\"click\", () => {\n      navigator.geolocation.getCurrentPosition((pos) => {\n        document.getElementById(\"results\").innerHTML = \"<p style='color:#04AA6D;'>Nearest Center: New Delhi RC (Lat: \" + pos.coords.latitude.toFixed(2) + \")</p>\";\n      });\n    });\n  </script>\n</body>\n</html>"
    },
    "githubWorkflow": {
      "repoName": "html-css-projects",
      "commitMessage": "feat(day-46): implement geolocation api coordinate calculations and nearest center finder",
      "commands": [
        "mkdir day-46",
        "cd day-46",
        "git checkout -b feature/day-46-geolocation",
        "git add index.html",
        "git commit -m \"feat(day-46): implement geolocation api coordinate calculations and nearest center finder\"",
        "git push origin feature/day-46-geolocation"
      ],
      "tips": "Test your app in Chrome DevTools > More tools > Sensors where you can simulate GPS coordinates for any city worldwide!"
    },
    "vivaCheck": {
      "question": "What is the key difference between history.pushState() and location.href = url in client-side single page applications?",
      "options": [
        "history.pushState() updates the browser address bar and history stack without triggering a full page reload, whereas location.href causes an HTTP page reload.",
        "location.href is encrypted by SSL certificates while pushState() is plain text.",
        "pushState() permanently prevents users from clicking their browser Back button.",
        "location.href can only load images, while pushState() loads JavaScript files."
      ],
      "correctAnswer": 0,
      "explanation": "history.pushState() alters the URL displayed in the address bar and pushes an entry to the browser session history completely client-side without asking the remote server for a new HTML document. In contrast, assigning location.href causes the browser to make a full HTTP roundtrip and refresh the entire page."
    }
  },

  /* ── DAY 47 ── */
  {
    "id": "day-47",
    "day": 47,
    "year": 1,
    "semester": 1,
    "specialization": "foundation",
    "title": "Client-Side SPA Routing & Browser History API (pushState & popstate)",
    "slug": "day-47-client-side-spa-routing-browser-history-api",
    "category": "Advanced JavaScript & Browser APIs",
    "estimatedTime": "3 Hours Practical",
    "difficulty": "Intermediate",
    "objectives": [
      "Understand the architecture of Single Page Applications (SPAs) versus traditional multi-page sites.",
      "Manipulate browser history client-side without page reloads using history.pushState().",
      "Listen to browser Back/Forward navigation buttons using the window popstate event.",
      "Implement declarative hash-based routing (#home, #courses, #profile) with hashchange events.",
      "Build a dynamic view renderer that swaps page templates instantly based on the active route."
    ],
    "concept": {
      "overview": "Modern frontend frameworks like React, Next.js, and Vue power seamless Single Page Applications (SPAs). In an SPA, the browser never downloads a fresh HTML page when navigating between sections. Instead, client-side JavaScript intercepts navigation clicks, updates the URL using the HTML5 History API, and renders the corresponding view in 0ms.",
      "keyPoints": [
        "Single Page Architecture: The entire application runs inside one primary index.html document. Different \"pages\" are simply state-driven view views.",
        "history.pushState(state, title, url): Adds a new entry to the browser history and updates the address bar URL without reloading the page.",
        "popstate Event: Fired whenever the student navigates session history using the browser Back or Forward buttons.",
        "Hash Routing Alternative: Modifying location.hash (#/dashboard) fires hashchange without requiring server-side URL rewrite rules.",
        "Prevent Default: Link navigation must intercept <a> tag clicks using e.preventDefault() to avoid traditional HTTP server requests."
      ],
      "analogy": "Think of traditional websites like reading a stack of separate paper textbooks: turning a page requires closing one book, putting it on a shelf, and opening another book. An SPA is like an Amazon Kindle: the physical frame never changes, but tapping a button instantly swaps the text on screen."
    },
    "teacherDemo": {
      "title": "Vanilla SPA Client-Side Router Console",
      "explanation": "See how views are swapped instantaneously and how the browser Back/Forward buttons remain 100% functional without page reloads.",
      "language": "html",
      "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Vanilla SPA Router</title>\n  <style>\n    body { font-family: system-ui, sans-serif; background: #060c18; color: #fff; padding: 24px; }\n    nav a { color: #94a3b8; text-decoration: none; font-weight: bold; margin-right: 12px; }\n    nav a.active { color: #38bdf8; }\n  </style>\n</head>\n<body>\n  <nav id=\"navBar\">\n    <a href=\"#/home\" class=\"active\">🏠 Home</a>\n    <a href=\"#/about\">👨‍💻 About</a>\n  </nav>\n  <div id=\"appView\" style=\"margin-top:20px;\"></div>\n\n  <script>\n    const routes = {\n      \"#/home\": \"<h2>Welcome Home</h2><p>BCA Zero-lag practicals.</p>\",\n      \"#/about\": \"<h2>About Nextsem</h2><p>Authored by Er. Manoj Kumar.</p>\"\n    };\n    function render() {\n      const hash = location.hash || \"#/home\";\n      document.getElementById(\"appView\").innerHTML = routes[hash] || \"<h2>404</h2>\";\n    }\n    window.addEventListener(\"hashchange\", render);\n    render();\n  </script>\n</body>\n</html>"
    },
    "practicalLab": {
      "labTitle": "SPA Client Router Implementation Lab",
      "labDescription": "Configure client routes, history pushState, and popstate navigation.",
      "initialCode": "<!DOCTYPE html>\n<html>\n<body>\n  <nav><a href=\"#/one\">One</a><a href=\"#/two\">Two</a></nav>\n  <div id=\"view\"></div>\n</body>\n</html>",
      "language": "html",
      "tasks": [
        {
          "id": "t47-1",
          "title": "Call history.pushState",
          "instruction": "Call history.pushState({ page: \"dashboard\" }, \"\", \"/dashboard\") to update the URL client-side.",
          "hint": "history.pushState({ page: \"dashboard\" }, \"\", \"/dashboard\");",
          "validatorRegex": "history\\.pushState"
        },
        {
          "id": "t47-2",
          "title": "Listen to popstate Event",
          "instruction": "Add a window popstate event listener that logs the current history state object.",
          "hint": "window.addEventListener(\"popstate\", (e) => { ... });",
          "validatorRegex": "addEventListener\\([\"']popstate[\"']"
        },
        {
          "id": "t47-3",
          "title": "Intercept Anchor Link Clicks",
          "instruction": "Inside an anchor click event listener, call e.preventDefault() before running router logic.",
          "hint": "link.addEventListener(\"click\", (e) => { e.preventDefault(); });",
          "validatorRegex": "preventDefault"
        }
      ]
    },
    "debuggingChallenge": {
      "title": "Spot the Bug: Broken Back Button in Client-Side State Router",
      "buggyCode": "function navigate(url) {\n  history.pushState(null, \"\", url);\n  render(url);\n}\n// ❌ Bug: popstate is never listened to!",
      "bugExplanation": "pushState() informs the browser to push a history entry, but clicking the browser Back/Forward buttons does NOT automatically re-execute your custom navigate() function. You MUST attach a window.addEventListener(\"popstate\", ...) listener to re-render the view when the user traverses their session history.",
      "fixedCode": "function navigate(url) {\n  history.pushState(null, \"\", url);\n  render(url);\n}\n// ✅ Correct: Handle popstate so browser Back and Forward trigger view updates\nwindow.addEventListener(\"popstate\", () => {\n  render(location.pathname);\n});"
    },
    "assignment": {
      "title": "University Student Portal 4-View SPA Router",
      "instructions": [
        "Build a multi-view Single Page Application with 4 views: Overview, Lab Practicals, Grades, and Profile.",
        "Use hash-based routing (#/overview, #/practicals, #/grades, #/profile).",
        "Ensure the active navigation tab receives an emerald green highlight (#04AA6D).",
        "Support direct deep-linking: opening the URL directly with #/grades must immediately display the Grades view."
      ],
      "submissionCriteria": "Push spa-router.html and router.js to your GitHub repository under day-47.",
      "fileName": "index.html",
      "solutionCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>BCA Day 47 - Student Portal SPA</title>\n  <style>\n    body { font-family: \"Segoe UI\", sans-serif; background: #060c18; color: #fff; padding: 24px; }\n    nav a { padding: 8px 16px; border-radius: 8px; color: #94a3b8; text-decoration: none; font-weight: bold; margin-right: 8px; }\n    nav a.active { background: #04AA6D; color: #fff; }\n    .card { background: #0c1328; border: 1px solid #1e293b; padding: 24px; border-radius: 12px; margin-top: 20px; }\n  </style>\n</head>\n<body>\n  <nav id=\"menu\">\n    <a href=\"#/overview\" class=\"active\">📊 Overview</a>\n    <a href=\"#/practicals\">💻 Practicals</a>\n    <a href=\"#/profile\">👤 Profile</a>\n  </nav>\n  <div class=\"card\" id=\"appContent\"></div>\n\n  <script>\n    const views = {\n      \"#/overview\": \"<h2>Overview</h2><p>Semester 1 progress on track.</p>\",\n      \"#/practicals\": \"<h2>Practicals</h2><p>BCSL-013 Lab Units.</p>\",\n      \"#/profile\": \"<h2>Profile</h2><p>Student: Er. Manoj Kumar BCA Cohort.</p>\"\n    };\n    function update() {\n      const hash = location.hash || \"#/overview\";\n      document.getElementById(\"appContent\").innerHTML = views[hash] || \"<h2>404</h2>\";\n      document.querySelectorAll(\"#menu a\").forEach(a => a.classList.toggle(\"active\", a.getAttribute(\"href\") === hash));\n    }\n    window.addEventListener(\"hashchange\", update);\n    update();\n  </script>\n</body>\n</html>"
    },
    "githubWorkflow": {
      "repoName": "html-css-projects",
      "commitMessage": "feat(day-47): build vanilla single page app hash router with deep-linking and dynamic template switching",
      "commands": [
        "mkdir day-47",
        "cd day-47",
        "git checkout -b feature/day-47-spa-router",
        "git add index.html",
        "git commit -m \"feat(day-47): build vanilla single page app hash router with deep-linking and dynamic template switching\"",
        "git push origin feature/day-47-spa-router"
      ],
      "tips": "Hash routing (#/page) is ideal for GitHub Pages deployments because it does not require server-side URL fallback rewrites."
    },
    "vivaCheck": {
      "question": "Why is the Intersection Observer API drastically more performant than using window.addEventListener(\"scroll\") for lazy-loading images?",
      "options": [
        "Intersection Observer is asynchronously computed off the main thread by the browser internal rendering engine, eliminating expensive scroll event loop bottlenecks.",
        "scroll events automatically clear the browser GPU texture cache on every pixel movement.",
        "Intersection Observer converts raster images into vector SVG graphics automatically.",
        "The scroll event only fires once every 10 seconds in modern web browsers."
      ],
      "correctAnswer": 0,
      "explanation": "Traditional scroll event listeners fire synchronously hundreds of times per second during scrolling, causing layout thrashing when checking getBoundingClientRect(). The IntersectionObserver API offloads visibility checks asynchronously to the browser compositing pipeline, ensuring buttery-smooth 60fps scrolling."
    }
  },

  /* ── DAY 48 ── */
  {
    "id": "day-48",
    "day": 48,
    "year": 1,
    "semester": 1,
    "specialization": "foundation",
    "title": "Modern Web Performance & Intersection Observer API (Lazy Loading & Infinite Scroll)",
    "slug": "day-48-web-performance-intersection-observer-lazy-loading",
    "category": "Advanced JavaScript & Browser APIs",
    "estimatedTime": "2.5 Hours Practical",
    "difficulty": "Intermediate",
    "objectives": [
      "Understand how Intersection Observer detects when elements enter or exit the visible browser viewport.",
      "Construct an IntersectionObserver instance with custom threshold and rootMargin settings.",
      "Implement high-performance image lazy loading using placeholder data-src attributes.",
      "Build an infinite-scroll feed that triggers asynchronous API loading when a sentinel element enters view.",
      "Avoid layout thrashing and preserve 60fps scrolling performance."
    ],
    "concept": {
      "overview": "Web page speed directly dictates user engagement and SEO rankings. Instead of downloading 100 high-resolution images when a webpage loads, modern websites lazy-load assets only when they scroll into the viewport. The Intersection Observer API provides a high-performance native mechanism to track element visibility without heavy scroll event listeners.",
      "keyPoints": [
        "Observer Pattern: Create an observer instance with const observer = new IntersectionObserver(callback, options). Call observer.observe(element) to watch an element.",
        "Entry Intersection: Inside the callback, entries.forEach(entry => ...) inspects entry.isIntersecting (boolean) and entry.intersectionRatio.",
        "Lazy Image Technique: Set image src to a tiny lightweight placeholder, storing the real image in data-src. When intersecting, swap entry.target.src = entry.target.dataset.src.",
        "Unobserving: Once an image is loaded, call observer.unobserve(entry.target) to release browser resources.",
        "Root Margin: Set rootMargin: \"200px\" to start pre-loading images 200 pixels BEFORE they appear on screen for a seamless user experience."
      ],
      "analogy": "Imagine a physical supermarket: the stockroom manager does not pile 10,000 cartons of milk onto the checkout counter all at once. Instead, a floor worker observes the display shelf (observer), and when stock runs down to 2 bottles (threshold), brings out the next batch from the back."
    },
    "teacherDemo": {
      "title": "Lazy Image Loading with Blur-Up Transition Console",
      "explanation": "See how image cards download their heavy assets only when scrolled within 100px of the visible viewport.",
      "language": "html",
      "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Intersection Observer Demo</title>\n  <style>\n    body { font-family: system-ui, sans-serif; background: #060c18; color: #fff; padding: 24px; text-align: center; }\n    .card { max-width: 440px; margin: 40px auto; background: #0c1328; border: 1px solid #1e293b; padding: 16px; border-radius: 12px; }\n  </style>\n</head>\n<body>\n  <h2>⚡ Intersection Observer Lazy Loading</h2>\n  <div class=\"card\"><p>Scroll down to reveal lazy card</p></div>\n  <div style=\"height:300px;\"></div>\n  <div class=\"card\" id=\"targetCard\"><p>🎯 Intersected Target Card Loaded</p></div>\n\n  <script>\n    const observer = new IntersectionObserver((entries) => {\n      entries.forEach(e => {\n        if (e.isIntersecting) e.target.style.borderColor = \"#04AA6D\";\n      });\n    });\n    observer.observe(document.getElementById(\"targetCard\"));\n  </script>\n</body>\n</html>"
    },
    "practicalLab": {
      "labTitle": "Intersection Observer Implementation Lab",
      "labDescription": "Initialize observer, detect viewport entry, and swap data attributes.",
      "initialCode": "<!DOCTYPE html>\n<html>\n<body>\n  <div class=\"lazy\" data-src=\"photo.jpg\"></div>\n</body>\n</html>",
      "language": "html",
      "tasks": [
        {
          "id": "t48-1",
          "title": "Instantiate IntersectionObserver",
          "instruction": "Create a new IntersectionObserver with a callback that inspects entries.",
          "hint": "const observer = new IntersectionObserver((entries) => { ... });",
          "validatorRegex": "new\\s+IntersectionObserver"
        },
        {
          "id": "t48-2",
          "title": "Check isIntersecting and Swap data-src",
          "instruction": "Inside the entry callback, check entry.isIntersecting and set img.src = img.dataset.src.",
          "hint": "if (entry.isIntersecting) { entry.target.src = entry.target.dataset.src; }",
          "validatorRegex": "entry\\.isIntersecting"
        },
        {
          "id": "t48-3",
          "title": "Observe Target Elements",
          "instruction": "Call observer.observe on each lazy image element.",
          "hint": "document.querySelectorAll(\".lazy\").forEach(img => observer.observe(img));",
          "validatorRegex": "observer\\.observe"
        }
      ]
    },
    "debuggingChallenge": {
      "title": "Spot the Bug: Memory Leak from Never Unobserving Intersected Elements",
      "buggyCode": "const observer = new IntersectionObserver((entries) => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      entry.target.src = entry.target.dataset.src;\n      // ❌ Missing unobserve! Observer keeps watching all 2,000 images forever!\n    }\n  });\n});",
      "bugExplanation": "Once an image has successfully loaded its high-resolution source, it has completed its lifecycle. Failing to call observer.unobserve(entry.target) keeps the DOM node attached to the observer pipeline, causing a severe memory leak as hundreds of elements accumulate.",
      "fixedCode": "const observer = new IntersectionObserver((entries, obs) => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      entry.target.src = entry.target.dataset.src;\n      // ✅ Correct: Immediately unobserve once loaded\n      obs.unobserve(entry.target);\n    }\n  });\n});"
    },
    "assignment": {
      "title": "High-Performance Infinite Scrolling Course Catalog",
      "instructions": [
        "Create a responsive course catalog that begins with 4 initial course cards.",
        "Place a dedicated sentinel element (#sentinel) at the very bottom of the card list.",
        "Use IntersectionObserver to watch #sentinel: when it enters view, simulate an asynchronous fetch that appends 3 new course cards.",
        "Display a smooth animated spinner during loading, terminating gracefully after reaching 20 total cards."
      ],
      "submissionCriteria": "Push infinite-scroll.html and catalog.js to your GitHub repository under day-48.",
      "fileName": "index.html",
      "solutionCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>BCA Day 48 - Infinite Scroll Catalog</title>\n  <style>\n    body { font-family: \"Segoe UI\", sans-serif; background: #060c18; color: #fff; padding: 24px; text-align: center; }\n    .catalog { max-width: 600px; margin: auto; }\n    .card { background: #0c1328; border: 1px solid #1e293b; padding: 20px; border-radius: 12px; margin-bottom: 16px; text-align: left; }\n    .sentinel { padding: 20px; color: #38bdf8; font-weight: bold; }\n  </style>\n</head>\n<body>\n  <div class=\"catalog\">\n    <h2>📚 Infinite Course Catalog</h2>\n    <div id=\"courseList\"></div>\n    <div class=\"sentinel\" id=\"sentinel\">Loading more... ⏳</div>\n  </div>\n\n  <script>\n    let count = 0;\n    const maxCourses = 12;\n    const list = document.getElementById(\"courseList\");\n    const sentinel = document.getElementById(\"sentinel\");\n\n    function loadBatch() {\n      for (let i = 0; i < 4; i++) {\n        if (count >= maxCourses) {\n          sentinel.textContent = \"🎉 Reached end of catalog.\";\n          observer.unobserve(sentinel);\n          return;\n        }\n        count++;\n        const card = document.createElement(\"div\");\n        card.className = \"card\";\n        card.innerHTML = \"<h4>Course #\" + count + \": BCA Practical</h4>\";\n        list.appendChild(card);\n      }\n    }\n\n    const observer = new IntersectionObserver((entries) => {\n      if (entries[0].isIntersecting) loadBatch();\n    }, { rootMargin: \"100px\" });\n\n    loadBatch();\n    observer.observe(sentinel);\n  </script>\n</body>\n</html>"
    },
    "githubWorkflow": {
      "repoName": "html-css-projects",
      "commitMessage": "feat(day-48): implement intersection observer api for high-performance infinite scrolling catalog",
      "commands": [
        "mkdir day-48",
        "cd day-48",
        "git checkout -b feature/day-48-intersection-observer",
        "git add index.html",
        "git commit -m \"feat(day-48): implement intersection observer api for high-performance infinite scrolling catalog\"",
        "git push origin feature/day-48-intersection-observer"
      ],
      "tips": "Use rootMargin with positive pixel values (e.g. 200px) so items begin loading before the student actually reaches the bottom!"
    },
    "vivaCheck": {
      "question": "Which property on navigator reliably reports whether the client browser currently has an active network connection?",
      "options": [
        "navigator.onLine (returns true if online, false if offline)",
        "navigator.connectionSpeed",
        "navigator.isWifiConnected",
        "document.networkStatus"
      ],
      "correctAnswer": 0,
      "explanation": "navigator.onLine is a standard browser boolean property that indicates whether the browser is connected to a network. Combined with the window events \"online\" and \"offline\", it enables responsive network status indicators in offline-first web apps."
    }
  },

  /* ── DAY 49 ── */
  {
    "id": "day-49",
    "day": 49,
    "year": 1,
    "semester": 1,
    "specialization": "foundation",
    "title": "Offline-First Web Apps & Network Status Monitoring (navigator.onLine)",
    "slug": "day-49-offline-first-network-status-navigator-online",
    "category": "Advanced JavaScript & Browser APIs",
    "estimatedTime": "2 Hours Practical",
    "difficulty": "Intermediate",
    "objectives": [
      "Inspect real-time connection status using the boolean property navigator.onLine.",
      "Listen to dynamic network state transitions with window.addEventListener(\"online\") and (\"offline\").",
      "Display a non-intrusive floating banner warning users when internet connectivity drops.",
      "Queue pending student submissions in localStorage during offline periods and auto-sync when online.",
      "Understand the foundational concepts behind Service Workers and Progressive Web Apps (PWAs)."
    ],
    "concept": {
      "overview": "In real-world environments, internet connectivity can be intermittent or unstable. An application that crashes or loses student data when Wi-Fi drops causes immense frustration. By listening to browser online and offline events, web applications can gracefully queue unsaved actions locally and synchronize them automatically once connectivity resumes.",
      "keyPoints": [
        "navigator.onLine: Returns true if the browser has an active network interface; false if disconnected from all networks.",
        "Online / Offline Events: The window fires the \"offline\" event immediately when network drops, and \"online\" when connection is re-established.",
        "Offline Queue Pattern: When offline, save pending API submissions to an array in localStorage. When \"online\" fires, loop through the queue and dispatch pending requests.",
        "Visual Feedback: Always alert the user with a distinct yellow/red status banner so they know why remote data is not updating.",
        "PWA Foundation: This offline awareness is the critical first requirement for Progressive Web Apps (PWAs)."
      ],
      "analogy": "Think of an offline-capable web app like an email client on your smartphone: if you write an email on an airplane, the app does not discard your message; it places it in your \"Outbox\" (queue) and automatically sends it the moment your phone reconnects to cellular data upon landing."
    },
    "teacherDemo": {
      "title": "Live Network Status Detector & Auto-Sync Engine",
      "explanation": "See how connectivity drops are trapped, visual badges update immediately, and queued tasks auto-synchronize.",
      "language": "html",
      "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Offline Status Demo</title>\n  <style>\n    body { font-family: system-ui, sans-serif; background: #060c18; color: #fff; padding: 24px; text-align: center; }\n    .banner { padding: 12px; border-radius: 8px; font-weight: bold; margin-bottom: 20px; }\n    .online { background: #042417; color: #04AA6D; border: 1px solid #04AA6D; }\n    .offline { background: #450a0a; color: #f87171; border: 1px solid #dc2626; }\n  </style>\n</head>\n<body>\n  <div class=\"banner online\" id=\"statusBanner\">🟢 Status: Online</div>\n\n  <script>\n    const banner = document.getElementById(\"statusBanner\");\n    function update() {\n      if (navigator.onLine) { banner.className = \"banner online\"; banner.textContent = \"🟢 Status: Online\"; }\n      else { banner.className = \"banner offline\"; banner.textContent = \"🔴 Status: Offline\"; }\n    }\n    window.addEventListener(\"online\", update);\n    window.addEventListener(\"offline\", update);\n    update();\n  </script>\n</body>\n</html>"
    },
    "practicalLab": {
      "labTitle": "Network Status & Local Queue Lab",
      "labDescription": "Handle online/offline browser state and queue offline submissions in localStorage.",
      "initialCode": "<!DOCTYPE html>\n<html>\n<body>\n  <div id=\"status\"></div>\n  <button id=\"save\">Save Note</button>\n</body>\n</html>",
      "language": "html",
      "tasks": [
        {
          "id": "t49-1",
          "title": "Read navigator.onLine State",
          "instruction": "Write an if-statement evaluating navigator.onLine and log the appropriate status.",
          "hint": "if (navigator.onLine) { console.log(\"Online\"); }",
          "validatorRegex": "navigator\\.onLine"
        },
        {
          "id": "t49-2",
          "title": "Listen for online and offline Events",
          "instruction": "Add event listeners to the window object for both \"online\" and \"offline\" events.",
          "hint": "window.addEventListener(\"online\", updateStatus); window.addEventListener(\"offline\", updateStatus);",
          "validatorRegex": "addEventListener\\([\"']online[\"']"
        },
        {
          "id": "t49-3",
          "title": "Implement Offline Local Queue",
          "instruction": "Store pending submissions in an array inside localStorage when offline.",
          "hint": "const queue = JSON.parse(localStorage.getItem(\"offlineQueue\") || \"[]\");",
          "validatorRegex": "localStorage\\.getItem\\([\"']offlineQueue[\"']\\)"
        }
      ]
    },
    "debuggingChallenge": {
      "title": "Spot the Bug: Silent Submission Loss When Network Drops Mid-Form Submit",
      "buggyCode": "form.addEventListener(\"submit\", async (e) => {\n  e.preventDefault();\n  // ❌ If fetch fails, user data is lost with zero recovery path!\n  await fetch(\"/api/submit\", { method: \"POST\", body: JSON.stringify(data) });\n  form.reset();\n});",
      "bugExplanation": "Network requests can fail at any point due to packet drops or roaming disconnects. Wrapping the submission in a try/catch block and backing up data to localStorage ensures students never lose work.",
      "fixedCode": "form.addEventListener(\"submit\", async (e) => {\n  e.preventDefault();\n  try {\n    await fetch(\"/api/submit\", { method: \"POST\", body: JSON.stringify(data) });\n    form.reset();\n  } catch (err) {\n    // ✅ Correct: Save to offline storage and inform student\n    localStorage.setItem(\"unsaved_submission\", JSON.stringify(data));\n    alert(\"Network disconnected! Your progress is saved locally and will auto-sync.\");\n  }\n});"
    },
    "assignment": {
      "title": "Offline-Resilient Student Practical Notes Pad",
      "instructions": [
        "Build a notes editor with Title and Content fields on a dark-themed UI.",
        "Display a persistent connection bar at the top (Green: Connected • Red: Offline Mode).",
        "When the student clicks \"Save Note\" while offline, save it to a pendingSync array in localStorage and render a \"⏳ Queued (Offline)\" badge.",
        "When the window fires \"online\", automatically synchronize all queued notes and update the badge to \"✅ Synced to Cloud\"."
      ],
      "submissionCriteria": "Push offline-notes.html and offline-sync.js to your GitHub repository under day-49.",
      "fileName": "index.html",
      "solutionCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>BCA Day 49 - Offline Notes Sync</title>\n  <style>\n    body { font-family: \"Segoe UI\", sans-serif; background: #060c18; color: #fff; padding: 24px; text-align: center; }\n    .card { background: #0c1328; border: 1px solid #1e293b; padding: 20px; border-radius: 12px; max-width: 500px; margin: auto; }\n    .banner { padding: 8px; border-radius: 6px; font-weight: bold; margin-bottom: 12px; font-size: 13px; }\n    .online { background: #042417; color: #04AA6D; }\n    .offline { background: #450a0a; color: #f87171; }\n  </style>\n</head>\n<body>\n  <div class=\"card\">\n    <div class=\"banner online\" id=\"net\">🟢 Online</div>\n    <input id=\"title\" placeholder=\"Note title...\" style=\"width:100%;box-sizing:border-box;padding:8px;\" />\n    <button id=\"save\" style=\"margin-top:10px;padding:8px 16px;background:#2563eb;color:#fff;border:none;border-radius:6px;\">Save Note</button>\n    <div id=\"list\" style=\"margin-top:16px;\"></div>\n  </div>\n\n  <script>\n    const net = document.getElementById(\"net\");\n    function update() {\n      if (navigator.onLine) { net.className = \"banner online\"; net.textContent = \"🟢 Online\"; }\n      else { net.className = \"banner offline\"; net.textContent = \"🔴 Offline (Queued Locally)\"; }\n    }\n    window.addEventListener(\"online\", update);\n    window.addEventListener(\"offline\", update);\n    document.getElementById(\"save\").addEventListener(\"click\", () => {\n      const val = document.getElementById(\"title\").value;\n      if (!val) return;\n      const p = document.createElement(\"p\");\n      p.textContent = val + (navigator.onLine ? \" (Synced)\" : \" (Queued)\");\n      document.getElementById(\"list\").appendChild(p);\n    });\n  </script>\n</body>\n</html>"
    },
    "githubWorkflow": {
      "repoName": "html-css-projects",
      "commitMessage": "feat(day-49): implement offline-first architecture with navigator.onLine and local queue synchronization",
      "commands": [
        "mkdir day-49",
        "cd day-49",
        "git checkout -b feature/day-49-offline-sync",
        "git add index.html",
        "git commit -m \"feat(day-49): implement offline-first architecture with navigator.onLine and local queue synchronization\"",
        "git push origin feature/day-49-offline-sync"
      ],
      "tips": "You can test offline synchronization in Chrome DevTools > Application > Service workers / Network tab."
    },
    "vivaCheck": {
      "question": "In an enterprise multi-feature Single Page Application, why is modular code separation preferred over placing all JavaScript into one 5,000-line script file?",
      "options": [
        "Modular separation ensures loose coupling, single responsibility, high testability, and enables code reusability across multiple views.",
        "Browsers automatically refuse to execute any individual JavaScript file that exceeds 100 lines.",
        "Single script files cause hardware overheating on client computers.",
        "Modular code is compiled into C++ machine code before running in the browser."
      ],
      "correctAnswer": 0,
      "explanation": "Modular design isolates concerns into self-contained units (e.g. storage modules, router modules, UI renderers). This prevents scope collisions, facilitates team collaboration, enables automated unit testing, and makes large software codebases maintainable."
    }
  },

  /* ── DAY 50 ── */
  {
    "id": "day-50",
    "day": 50,
    "year": 1,
    "semester": 1,
    "specialization": "foundation",
    "title": "Sprint 5 Capstone: Interactive Developer Studio & Multi-Tool Workspace SPA",
    "slug": "day-50-sprint-capstone-developer-studio-multi-tool-workspace-spa",
    "category": "Advanced JavaScript & Browser APIs",
    "estimatedTime": "4 Hours Practical",
    "difficulty": "Advanced",
    "objectives": [
      "Architect a comprehensive multi-tool Single Page Application combining all browser APIs learned in Sprint 5.",
      "Integrate an interactive Kanban task board with native Drag & Drop support.",
      "Incorporate a digital verification signature pad built on the HTML5 2D Canvas API.",
      "Embed a live network status bar (navigator.onLine) with automatic local queue persistence.",
      "Implement client-side SPA hash navigation (#kanban, #signature, #diagnostics) with 0ms view switching."
    ],
    "concept": {
      "overview": "Congratulations on reaching Day 50! In this major milestone capstone project, students combine all advanced browser APIs mastered across Days 41–49 into a unified, commercial-grade Developer Studio SPA. This portfolio masterpiece demonstrates mastery of client routing, HTML5 canvas graphics, drag-and-drop state management, offline synchronization, and modern JavaScript architecture.",
      "keyPoints": [
        "Integrated Architecture: The application coordinates multiple subsystems: a client-side hash router, a canvas drawing engine, a Kanban DnD board, and an offline queue.",
        "Component State Management: Subsystems maintain persistent state in localStorage using dedicated namespaces.",
        "Clean Modular Separation: Each tool view is encapsulated into focused functional modules with clean initialization hooks.",
        "Responsive Theme Harmony: Follows the platform standard dark palette (#060c18 background, #0c1328 card surface, #04AA6D and #38bdf8 accents).",
        "Portfolio Asset: This capstone serves as a primary showcase project for student GitHub profiles and internship technical interviews."
      ],
      "analogy": "Think of this Day 50 Capstone like a modern Swiss Army Knife: rather than carrying five separate standalone gadgets, you have engineered a master multi-tool casing where each specialized tool (Kanban board, Canvas signature pad, Geolocation diagnostic, and Offline monitor) snaps cleanly into place."
    },
    "teacherDemo": {
      "title": "Sprint 5 Developer Studio Master Architecture",
      "explanation": "See how client routing, canvas drawing, drag-and-drop tasks, and offline indicators harmonize inside one unified interface.",
      "language": "html",
      "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Developer Studio Capstone</title>\n  <style>\n    body { font-family: system-ui, sans-serif; background: #060c18; color: #fff; margin: 0; padding: 24px; }\n    nav a { padding: 8px 16px; border-radius: 8px; color: #94a3b8; text-decoration: none; font-weight: bold; }\n    nav a.active { background: #04AA6D; color: #fff; }\n  </style>\n</head>\n<body>\n  <nav id=\"topNav\">\n    <a href=\"#/kanban\" class=\"active\">📋 Kanban</a>\n    <a href=\"#/signature\">✍️ Signature</a>\n  </nav>\n  <div id=\"mainStage\" style=\"margin-top:20px;\"></div>\n\n  <script>\n    const routes = {\n      \"#/kanban\": \"<h3>📋 Kanban View</h3><p>Task organizer with drag and drop.</p>\",\n      \"#/signature\": \"<h3>✍️ Signature View</h3><p>Canvas drawing pad.</p>\"\n    };\n    function render() {\n      const hash = location.hash || \"#/kanban\";\n      document.getElementById(\"mainStage\").innerHTML = routes[hash] || \"<h3>404</h3>\";\n      document.querySelectorAll(\"#topNav a\").forEach(a => a.classList.toggle(\"active\", a.getAttribute(\"href\") === hash));\n    }\n    window.addEventListener(\"hashchange\", render);\n    render();\n  </script>\n</body>\n</html>"
    },
    "practicalLab": {
      "labTitle": "Multi-Tool Studio Architecture Lab",
      "labDescription": "Assemble the multi-view router, canvas signature engine, and offline detector.",
      "initialCode": "<!DOCTYPE html>\n<html>\n<body>\n  <div id=\"studio\"></div>\n</body>\n</html>",
      "language": "html",
      "tasks": [
        {
          "id": "t50-1",
          "title": "Configure Multi-View Route Mapping",
          "instruction": "Create a routes configuration dictionary mapping \"#/kanban\" and \"#/signature\".",
          "hint": "const routes = { \"#/kanban\": renderKanban, \"#/signature\": renderSignature };",
          "validatorRegex": "[\"']#\\/kanban[\"']"
        },
        {
          "id": "t50-2",
          "title": "Initialize Canvas Signature Pad in SPA View",
          "instruction": "Write the initialization function that attaches mousedown, mousemove, and mouseup events to canvas.",
          "hint": "canvas.addEventListener(\"mousedown\", onStart);",
          "validatorRegex": "addEventListener\\([\"']mousedown[\"']"
        },
        {
          "id": "t50-3",
          "title": "Bind Offline Status Banner in Header",
          "instruction": "Call updateNetworkStatus on window load and listen to online and offline events.",
          "hint": "window.addEventListener(\"online\", updateBanner);",
          "validatorRegex": "addEventListener\\([\"']online[\"']"
        }
      ]
    },
    "debuggingChallenge": {
      "title": "Spot the Bug: Canvas Drawing Coordinates Shift After Switching SPA Route Tabs",
      "buggyCode": "// Storing canvas position once on initial page load\nconst initialRect = canvas.getBoundingClientRect();\ncanvas.addEventListener(\"mousemove\", (e) => {\n  // ❌ When views switch, layout offsets change, but initialRect is stale!\n  const x = e.clientX - initialRect.left;\n  const y = e.clientY - initialRect.top;\n});",
      "bugExplanation": "In dynamic SPAs where views mount and unmount, element positions in the viewport shift when containers change visibility. Caching getBoundingClientRect() once at startup leads to stale offsets. Calling canvas.getBoundingClientRect() dynamically inside the event or on route change guarantees accurate coordinates.",
      "fixedCode": "canvas.addEventListener(\"mousemove\", (e) => {\n  // ✅ Correct: Re-calculate bounding rect dynamically to handle layout shifts\n  const currentRect = canvas.getBoundingClientRect();\n  const x = e.clientX - currentRect.left;\n  const y = e.clientY - currentRect.top;\n});"
    },
    "assignment": {
      "title": "Production Capstone: Developer Studio Multi-Tool Workspace",
      "instructions": [
        "Build a commercial-grade Developer Studio SPA featuring 3 fully functioning modules:",
        "Module 1: Drag-and-Drop Sprint Kanban Board with localStorage persistence.",
        "Module 2: HTML5 2D Canvas Signature & Sketch Pad with color/size controls and PNG download.",
        "Module 3: Live Network & Geolocation Diagnostics with offline status notification banner.",
        "Ensure 100% theme consistency following the platform Blue, Black & White / Emerald Green guidelines."
      ],
      "submissionCriteria": "Push complete studio SPA (index.html, app.js, and styles.css) to your GitHub repository under day-50.",
      "fileName": "index.html",
      "solutionCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>BCA Day 50 - Developer Studio Capstone</title>\n  <style>\n    body { font-family: \"Segoe UI\", sans-serif; background: #060c18; color: #fff; margin: 0; padding: 20px; }\n    .wrap { max-width: 940px; margin: auto; }\n    .top-bar { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1e293b; padding-bottom: 16px; margin-bottom: 20px; }\n    nav a { padding: 8px 14px; border-radius: 8px; color: #94a3b8; text-decoration: none; font-weight: bold; margin-right: 8px; }\n    nav a.active { background: #04AA6D; color: #fff; }\n    .workspace { background: #0c1328; border: 1px solid #1e293b; border-radius: 12px; padding: 24px; min-height: 400px; }\n  </style>\n</head>\n<body>\n  <div class=\"wrap\">\n    <div class=\"top-bar\">\n      <h2>⚡ Nextsem DevStudio (Day 50 Capstone)</h2>\n      <nav id=\"nav\"><a href=\"#/kanban\" class=\"active\">📋 Kanban</a><a href=\"#/signature\">✍️ Signature</a></nav>\n    </div>\n    <div class=\"workspace\" id=\"appStage\"></div>\n  </div>\n\n  <script>\n    const stage = document.getElementById(\"appStage\");\n    function router() {\n      const hash = location.hash || \"#/kanban\";\n      document.querySelectorAll(\"#nav a\").forEach(a => a.classList.toggle(\"active\", a.getAttribute(\"href\") === hash));\n      if (hash === \"#/signature\") {\n        stage.innerHTML = \"<h3>✍️ Canvas Signature Pad</h3><canvas id='pad' width='400' height='200' style='background:#fff;'></canvas>\";\n      } else {\n        stage.innerHTML = \"<h3>📋 Kanban Board</h3><p>Drag and drop workspace.</p>\";\n      }\n    }\n    window.addEventListener(\"hashchange\", router);\n    router();\n  </script>\n</body>\n</html>"
    },
    "githubWorkflow": {
      "repoName": "html-css-projects",
      "commitMessage": "feat(day-50): build sprint 5 capstone developer studio multi-tool single page application",
      "commands": [
        "mkdir day-50",
        "cd day-50",
        "git checkout -b feature/day-50-sprint-capstone",
        "git add index.html",
        "git commit -m \"feat(day-50): build sprint 5 capstone developer studio multi-tool single page application\"",
        "git push origin feature/day-50-sprint-capstone"
      ],
      "tips": "Showcase this multi-feature single page application as a flagship project in your student portfolio!"
    },
    "vivaCheck": {
      "question": "What is the significance of reaching Day 50 in the BCA Practical Software Lab curriculum?",
      "options": [
        "The student has achieved frontend engineering mastery across HTML5, CSS Grid, Flexbox, Advanced JavaScript, Canvas 2D, Drag & Drop, and Single Page Application architecture.",
        "The student is excused from all future practical and theory examinations.",
        "The browser automatically disables the need for database storage systems.",
        "JavaScript syntax is replaced permanently with assembly language."
      ],
      "correctAnswer": 0,
      "explanation": "Day 50 represents the culmination of advanced frontend engineering in Semester 1. Students transition from basic markup to building full-scale, reactive Single Page Applications capable of complex user interactions, hardware device APIs, and offline persistence."
    }
  }
];

/* ══════════════════════════════════════════════════════════════════════════
   5. HELPER UTILITIES
   ══════════════════════════════════════════════════════════════════════════ */
export function getPracticalLessonBySlug(slug: string): PracticalLesson | undefined {
  return PRACTICAL_LESSONS.find(lesson => lesson.slug === slug || lesson.id === slug);
}

export function getPracticalLessonByDay(day: number): PracticalLesson | undefined {
  return PRACTICAL_LESSONS.find(lesson => lesson.day === day);
}

export function getNextPracticalDayNumber(completedDays: number[] = []): number {
  return Array.from({ length: 360 }, (_, i) => i + 1).find(d => !completedDays.includes(d)) || 1;
}

export function getNextPracticalDayUrl(completedDays: number[] = []): string {
  const nextDay = getNextPracticalDayNumber(completedDays);
  const lesson = getPracticalLessonByDay(nextDay);
  if (lesson) {
    return `/bca/practical/${lesson.slug}`;
  }
  const firstLesson = PRACTICAL_LESSONS[0];
  return firstLesson ? `/bca/practical/${firstLesson.slug}` : `/bca/practical/day-1-html-setup-first-webpage`;
}
