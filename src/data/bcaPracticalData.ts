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
   2. 3-YEAR / 6-SEMESTER ROADMAP
   ══════════════════════════════════════════════════════════════════════════ */
export const PRACTICAL_SEMESTERS: PracticalSemester[] = [
  {
    semNumber: 1,
    year: 1,
    title: 'Semester 1: Common Technical Foundation',
    focus: 'Developer setup, Windows 11 terminal commands, HTML5, CSS3, basic JavaScript logic, and GitHub workflows.',
    coreSubjects: ['BCS-111 / BCS-011: Computer Basics', 'BCSL-013: PC Software Lab', 'BCS-012: Basic Mathematics'],
    practicalHighlights: ['90-Day Sprint (Days 1–30): HTML/CSS/JS', '🪟 Windows 11 CLI', 'Git Init, Add, Commit, Push']
  },
  {
    semNumber: 2,
    year: 1,
    title: 'Semester 2: Programming Fundamentals & Databases',
    focus: 'Structured programming in C/C++, pointer memory models, JavaScript DOM manipulation, and SQL CRUD queries.',
    coreSubjects: ['MCS-011: Problem Solving & C', 'MCSL-017: C Lab', 'Database Concepts'],
    practicalHighlights: ['C Pointer Visualizer', 'Interactive SQL Sandbox', 'Mini Project: Quiz / Library System']
  },
  {
    semNumber: 3,
    year: 2,
    title: 'Semester 3: Career Specialization Kickoff & DSA',
    focus: 'Choose your track (Web / Software / Data / Cloud) + Object-Oriented Programming (Java / Python) and Data Structures.',
    coreSubjects: ['MCS-021: Data & File Structures', 'MCS-023: Database Management Systems', 'MCSL-025: DSA Lab'],
    practicalHighlights: ['Track Specialization Modules', 'Linked Lists & Trees Implementation', 'API Consumer Web Apps']
  },
  {
    semNumber: 4,
    year: 2,
    title: 'Semester 4: Backend Engineering & Systems',
    focus: 'Node.js, Express servers, REST API architecture, MySQL relations, Linux command line, and OS process management.',
    coreSubjects: ['MCS-024: OOP Technologies (Java/Python)', 'MCS-022: Operating Systems', 'Backend REST APIs'],
    practicalHighlights: ['Node + Express + MySQL Backend', 'Postman API Testing', 'Linux Shell Automation']
  },
  {
    semNumber: 5,
    year: 3,
    title: 'Semester 5: Full-Stack Architecture & Major Project Phase 1',
    focus: 'End-to-end full-stack integration, JWT authentication, role-based access control, deployment pipelines, and Capstone scoping.',
    coreSubjects: ['BCS-051: Software Engineering', 'BCS-053: Web Programming', 'BCSL-056: Full Stack Lab'],
    practicalHighlights: ['Full-Stack Auth & CRUD App', 'Cloud Hosting Deployment', 'Major Capstone Phase 1 Submission']
  },
  {
    semNumber: 6,
    year: 3,
    title: 'Semester 6: Major Capstone, Portfolio & Job Preparation',
    focus: 'Production capstone deployment, professional GitHub profile, resume crafting, technical viva, and mock interview practice.',
    coreSubjects: ['BCSP-064: Major Capstone Project', 'BCS-062: E-Commerce & Security', 'Career Viva Preparation'],
    practicalHighlights: ['Production Live App on Cloud', 'Professional Portfolio Website', 'Technical Viva Defense']
  }
];

/* ══════════════════════════════════════════════════════════════════════════
   3. 90-DAY PRACTICAL SPRINT PHASES
   ══════════════════════════════════════════════════════════════════════════ */
export interface PracticalSprint {
  sprintNumber: number;
  daysRange: string;
  title: string;
  badge: string;
  description: string;
  milestoneProject: string;
}

export const PRACTICAL_SPRINTS: PracticalSprint[] = [
  {
    sprintNumber: 1,
    daysRange: 'Days 1–30',
    title: 'Sprint 1: Web Foundation & Interactive UI',
    badge: 'Foundation',
    description: 'Learn modern semantic HTML5, CSS layouts (Flexbox & Grid), responsive design, and core JavaScript essentials.',
    milestoneProject: 'Interactive Student Portal (Day 30 Mini Project)'
  },
  {
    sprintNumber: 2,
    daysRange: 'Days 31–60',
    title: 'Sprint 2: DOM Manipulation, Async JS, APIs & Git',
    badge: 'Frontend Mastery',
    description: 'Master advanced DOM events, regex validation, localStorage, asynchronous fetch, REST APIs, Git branches, and GitHub push.',
    milestoneProject: 'CRUD Student Management System with API & GitHub (Day 60)'
  },
  {
    sprintNumber: 3,
    daysRange: 'Days 61–90',
    title: 'Sprint 3: Node.js, Express, MySQL & Full-Stack Deployment',
    badge: 'Full-Stack Ready',
    description: 'Build backend REST APIs with Express & MySQL, password hashing, JWT tokens, frontend integration, and live production deployment.',
    milestoneProject: 'Full-Stack Secured Student Enterprise Web App (Day 90 Portfolio)'
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
      instructions: [
        'Create a local folder named `bca-day-1` on your PC.',
        'Open the folder in VS Code and create `index.html`.',
        'Add your full name in an <h1> heading.',
        'Add a paragraph detailing: Your BCA Roll Number, College Name, and your target career track.',
        'Open the file directly in Google Chrome and verify the display.'
      ],
      submissionCriteria: 'Verify with browser DevTools (F12) that there are zero HTML syntax warnings.'
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
        'It downloads external CSS styles from the server.',
        'It signals the browser to render the page in standard HTML5 mode rather than Quirks mode.',
        'It is an encrypted security key required by the server.',
        'It creates a link to the website database.'
      ],
      correctAnswer: 1,
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
      instructions: [
        'Create a page about Ada Lovelace or Alan Turing.',
        'Use an <h1> for the person’s name.',
        'Use <h2> for their Early Life, Major Achievements, and Legacy.',
        'Use <strong> for significant dates and inventions.',
        'Add a thematic divider (<hr>) before the footer.'
      ],
      submissionCriteria: 'Inspect your heading structure using the Chrome accessibility tree or DevTools.'
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
        '<b> is deprecated and will not render in modern browsers.',
        '<b> only styles text bold visually, while <strong> conveys strong importance to screen readers and search bots.',
        '<strong> makes text red, while <b> makes it black.',
        'There is zero difference; they are 100% interchangeable.'
      ],
      correctAnswer: 1,
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
      instructions: [
        'Create three HTML files in one directory: `index.html`, `courses.html`, and `contact.html`.',
        'Add navigation links on all three pages linking to each other using relative paths (`href="courses.html"`).',
        'Place a computer image on the homepage with width="400" and an accurate alt tag.',
        'Verify that clicking each navigation link transitions smoothly between the pages.'
      ],
      submissionCriteria: 'All relative internal links must navigate smoothly without 404 errors.'
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
        'It tells the browser what file format the image is.',
        'It ensures screen readers can announce image content for visually impaired users and displays fallback text if the image fails to load.',
        'It speeds up internet connection bandwidth.',
        'It prevents other users from downloading the image.'
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
      instructions: [
        'Create a webpage displaying the complete list of 6 BCA semesters using an ordered list (<ol>).',
        'Inside Semester 1, nest an unordered list (<ul>) of all subjects.',
        'Below the lists, create a table summarizing Subject, Credits, Lab requirement (Yes/No), and Exam weightage.',
        'Use `colspan="2"` on a footer summary row displaying "Total Credits: 16".'
      ],
      submissionCriteria: 'Ensure the table passes W3C HTML validator without nesting errors.'
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
        'It changes the color of the column.',
        'It merges the current cell across multiple horizontal columns.',
        'It spans the cell vertically across multiple rows.',
        'It sets the column font size.'
      ],
      correctAnswer: 1,
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
      instructions: [
        'Build a job application form (`job-apply.html`).',
        'Include: Full Name, Email, Phone Number (`type="tel"`), Resume file upload (`type="file"`).',
        'Add radio buttons for Experience (Fresher, 1-2 Years, 3+ Years).',
        'Add checkboxes for Known Technologies (HTML, CSS, JavaScript, C, SQL).',
        'Add a `<textarea>` for Cover Letter.',
        'Mark all essential fields with the `required` attribute.'
      ],
      submissionCriteria: 'Test submitting the form in your browser with blank inputs to verify that native validation popups appear.'
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
        'Data is encrypted with SHA-256 before transmission.',
        'Form input values are appended visibly to the URL query string (e.g. ?name=rahul).',
        'Data is stored inside localStorage permanently.',
        'The form automatically downloads as a PDF file.'
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
      'Construct a complete semantic page wireframe.'
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
      instructions: [
        'Create `college-portal.html` using 100% semantic tags.',
        'Header: College emblem image, site title, top navigation.',
        'Main: Feature Section with announcement banner; Department Articles for BCA, MCA, and B.Tech.',
        'Aside: Upcoming exam notices and university notification links.',
        'Footer: Address, contact info, and copyright.'
      ],
      submissionCriteria: 'Inspect document outline in the browser to ensure no `<div class="header">` or `<div class="footer">` hacks are present.'
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
        '<section> is used for images only; <article> is used for audio.',
        '<article> is independent and syndicatable on its own (like a blog post); <section> represents a thematic sub-grouping of content.',
        '<section> can only appear inside a footer.',
        'There is no distinction in HTML5.'
      ],
      correctAnswer: 1,
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
      instructions: [
        'Create a new GitHub repository named `student-profile-html`.',
        'Place `index.html` and your profile image in the repository.',
        'Add a `README.md` file featuring: Project Title, Live Preview link, Built With (HTML5), and Author info.',
        'Enable GitHub Pages in your repository settings under Settings > Pages > Deploy from Branch.',
        'Test your live URL on your mobile phone.'
      ],
      submissionCriteria: 'Submit your live GitHub Pages link and repository URL.'
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
        'It executes backend database migration scripts.',
        'It documents what the project does, how to run it locally, and highlights author credentials for visitors and interviewers.',
        'It hides private API keys from the public.',
        'It automatically compiles TypeScript to JavaScript.'
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
      instructions: [
        'Open your Day 7 project or create a new folder `bca-day-8`.',
        'Create `index.html` and `style.css` side-by-side.',
        'Link `style.css` in `index.html`.',
        'In `style.css`, reset body margin to 0 and set default font-family to sans-serif.',
        'Change heading colors to `#0c1328` and paragraph line-height to 1.6.'
      ],
      submissionCriteria: 'Confirm in Chrome DevTools Network tab (F12) that `style.css` returns HTTP Status 200.'
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
        'External stylesheet linked via <link>',
        'Internal stylesheet defined in <style>',
        'Inline style defined directly on an element via the style="..." attribute',
        'Browser user-agent default styles'
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
} `,
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
      instructions: [
        'Create a webpage demonstrating 4 reusable button variants using classes:',
        '`.btn-success` (Green background), `.btn-danger` (Red background), `.btn-warning` (Amber background), and `.btn-outline` (Transparent with border).',
        'Add smooth `:hover` transition effects to all buttons.',
        'Use grouping selectors (`.btn-success, .btn-danger, ...`) for shared padding and font styles.'
      ],
      submissionCriteria: 'Ensure all buttons use shared classes to prevent repeating code (DRY - Don’t Repeat Yourself).'
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
        'div.card (Element + Class)',
        '#profile-header (ID Selector)',
        '.navbar .nav-link (Two Classes)',
        'p (Element Selector)'
      ],
      correctAnswer: 1,
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
}`
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
      instructions: [
        'Import a Google Font of your choice (e.g., "Outfit", "Poppins", or "Inter").',
        'Create a dark-themed blog article with a curated color palette: Background `#060c18`, Surface Card `#0c1328`, Primary Text `#ffffff`, Accent `#04AA6D`, Muted `#94a3b8`.',
        'Apply `line-height: 1.7` to paragraphs to ensure optimal readability.',
        'Add a call-out quote block with an italic font and an emerald green left border.'
      ],
      submissionCriteria: 'Verify that your color contrast ratio passes WCAG AA accessibility standards.'
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 10: Google Fonts typography, dark theme color harmony and text metrics',
      commands: [
        'git add .',
        'git commit -m "Day 10: Google Fonts typography, dark theme color harmony and text metrics"',
        'git push origin main'
      ],
      tips: 'You have completed the first 10 days of your 90-day practical journey! Inspect your GitHub repository to celebrate your 10 commits.'
    },
    vivaCheck: {
      question: 'What does the fourth value in `rgba(4, 170, 109, 0.5)` represent?',
      options: [
        'Hue rotation degree',
        'Alpha channel representing opacity (transparency) from 0.0 (transparent) to 1.0 (opaque)',
        'Brightness enhancement level',
        'Saturation percentage'
      ],
      correctAnswer: 1,
      explanation: 'The `a` in RGBA stands for Alpha, which controls the opacity of the color from 0.0 (100% transparent) to 1.0 (100% solid).'
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
