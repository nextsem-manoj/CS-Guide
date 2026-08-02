export const coursePhases = [
  {
    id: 'CLI',
    title: '🪟 Windows commands Module 1',
    duration: '1-2 Weeks',
    color: 'bg-[#1f1f1f]',
    bulletColor: '#1f1f1f',
    imageUrl: '/cli_illustration.webp',
    icon: '>_',
    path: 'cli/introduction-to-command-line-interface-cli-basics',
    topics: [
      { label: 'Lesson 1: CLI Introduction & Desktop Navigation', path: 'cli/introduction-to-command-line-interface-cli-basics' },
      { label: 'Lesson 2: Command Line Basics', path: 'cli/learn-windows-command-prompt-cmd-basics' },
      { label: 'Lesson 3: Drive Letters and the File System', path: 'cli/windows-drive-letters-and-file-system-structure' },
      { label: 'Lesson 4: Understanding the Prompt', path: 'cli/how-to-customize-windows-command-prompt' },
      { label: 'Lesson 5: Working with Directories', path: 'cli/mkdir-cd-dir-working-with-windows-directories' },
      { label: 'Lesson 6: File Attributes and NTFS Permissions', path: 'cli/modify-file-attributes-ntfs-permissions-attrib' },
      { label: 'Lesson 7: Copying, Moving, Renaming, and Deleting Files', path: 'cli/copy-move-rename-delete-files-cmd' },
      { label: 'Lesson 8: Wildcards and Redirection', path: 'cli/windows-cli-wildcards-and-stream-redirection' },
      { label: 'Lesson 9: Disk Management', path: 'cli/windows-disk-management-chkdsk-defrag-diskpart' },
      { label: 'Lesson 10: Connecting to File Shares', path: 'cli/connect-network-shares-net-use-command' },
      { label: 'Lesson 11: Managing User Accounts', path: 'cli/manage-windows-user-accounts-groups-net-user' },
      { label: 'Lesson 12: Networking', path: 'cli/network-troubleshooting-ping-tracert-ipconfig' },
      { label: 'Lesson 13: Remote Access', path: 'cli/remote-access-ssh-telnet-rdp-setup' },
      { label: 'Lesson 14: Batch Files', path: 'cli/learn-windows-batch-files-scripting-basics' },
      { label: 'Lesson 15: Task Management', path: 'cli/windows-task-management-taskkill-schtasks' },
    ]
  },
  {
    id: 'P0',
    title: 'Introduction to Coding',
    duration: '1-2 Weeks',
    color: 'bg-[#5b2c6f]',
    bulletColor: '#5b2c6f',
    imageUrl: '/git_illustration.webp',
    icon: '</>',
    path: 'p0-setup',
    topics: [
      { label: 'P0 Setup Overview & Hub', path: 'p0-setup' },
      { label: 'Software Downloads', path: 'p0-1-setup' },
      { label: 'VS Code Configuration', path: 'p0-3-vscode' },
      { label: 'Git Version Control', path: 'p0-4-git' },
      { label: 'Chrome DevTools Debugging', path: 'p0-5-devtools' },
    ]
  },
  {
    id: 'P1',
    title: 'Basics of Web Dev',
    duration: '2-3 Weeks',
    color: 'bg-[#2980b9]',
    bulletColor: '#2980b9',
    imageUrl: '/html5_illustration.webp',
    icon: '5',
    path: 'p1-1-intro-and-text',
    topics: [
      { label: 'Client-Server Web Basics & Text', path: 'p1-1-intro-and-text' },
      { label: 'Links & Media Assets', path: 'p1-2-links-and-media' },
      { label: 'Organized Lists & Tables', path: 'p1-3-lists-and-tables' },
      { label: 'Forms & User Data Inputs', path: 'p1-4-forms-and-inputs' },
      { label: 'Semantics & SEO Basics', path: 'p1-5-semantics-and-seo' },
      { label: 'HTML5 Layout Elements', path: 'p1-6-html5-tags' },
    ]
  },
  {
    id: 'P2',
    title: 'Advanced HTML/CSS',
    duration: '3-4 Weeks',
    color: 'bg-[#1abc9c]',
    bulletColor: '#1abc9c',
    imageUrl: '/css3_illustration.webp',
    icon: '3',
    path: 'p2-1-selectors',
    topics: [
      { label: 'CSS Selectors & Rules', path: 'p2-1-selectors' },
      { label: 'HSL Colors & Gradients', path: 'p2-2-colors' },
      { label: 'Resilient CSS Box Model', path: 'p2-3-box-model' },
      { label: 'Absolute & Sticky Positions', path: 'p2-4-positions' },
      { label: 'Flexbox Flex Alignments', path: 'p2-5-flexbox' },
      { label: 'CSS Grid Layouts', path: 'p2-6-grid' },
      { label: 'Keyframe Animations', path: 'p2-7-animations' },
      { label: 'Root Variables & Dark Mode', path: 'p2-8-variables' },
    ]
  },
  {
    id: 'P3',
    title: 'JavaScript Fundamentals',
    duration: '4-5 Weeks',
    color: 'bg-[#f39c12]',
    bulletColor: '#f39c12',
    imageUrl: '/javascript_illustration.webp',
    icon: 'JS',
    path: 'p3-1-basics',
    topics: [
      { label: 'Variables & Flow Control', path: 'p3-1-basics' },
      { label: 'Conditions, Loops & Functions', path: 'p3-2-conditions' },
      { label: 'Arrays & Stack Operations', path: 'p3-3-arrays' },
      { label: 'ES6+ Array Iterations', path: 'p3-4-advanced-arrays' },
      { label: 'Objects & JSON Data', path: 'p3-5-objects' },
      { label: 'DOM Queries & Mutators', path: 'p3-6-dom' },
      { label: 'Event Listeners', path: 'p3-7-events' },
      { label: 'LocalStorage Persistence', path: 'p3-8-localstorage' },
    ]
  },
  {
    id: 'P4',
    title: 'React Basics',
    duration: '4-5 Weeks',
    color: 'bg-[#e74c3c]',
    bulletColor: '#e74c3c',
    imageUrl: '/react_illustration.webp',
    icon: '⚛',
    path: 'p4-1-jsx',
    topics: [
      { label: 'JSX & Virtual DOM', path: 'p4-1-jsx' },
      { label: 'Functional Components', path: 'p4-2-components' },
      { label: 'Props Passing & Destructuring', path: 'p4-3-props' },
      { label: 'useState Hooks', path: 'p4-4-usestate' },
      { label: 'useEffect Side Effects', path: 'p4-5-useeffect' },
      { label: 'useRef Physical DOM Refs', path: 'p4-6-useref' },
      { label: 'React Router SPAs', path: 'p4-7-router' },
      { label: 'Context API Global Store', path: 'p4-8-context' },
    ]
  },
  {
    id: 'P5',
    title: 'Backend & APIs',
    duration: '3-4 Weeks',
    color: 'bg-[#27ae60]',
    bulletColor: '#27ae60',
    imageUrl: '/nodejs_illustration.webp',
    icon: 'node',
    path: 'p5-1-node',
    topics: [
      { label: 'Node.js & Express Servers', path: 'p5-1-node' },
      { label: 'RESTful HTTP API Endpoints', path: 'p5-2-rest' },
      { label: 'MongoDB CRUD Storage', path: 'p5-3-mongodb' },
      { label: 'Firebase Hosting & PWA', path: 'p5-4-firebase' },
    ]
  },
  {
    id: 'FS',
    title: 'Full-Stack Mastery',
    duration: '2-3 Weeks',
    color: 'bg-[#8e44ad]',
    bulletColor: '#8e44ad',
    imageUrl: '/cli_illustration.webp',
    icon: '⚡',
    path: 'fs-ch1-intro',
    topics: [
      { label: 'Full-Stack Web Architecture', path: 'fs-ch1-intro' },
      { label: 'Node.js Runtime & Modules', path: 'fs-ch2-nodejs' },
      { label: 'Express.js & REST API Routing', path: 'fs-ch3-express' },
    ]
  },
  {
    id: 'P6',
    title: 'Capstone Projects',
    duration: '3-4 Weeks',
    color: 'bg-[#2c3e50]',
    bulletColor: '#2c3e50',
    imageUrl: '/projects_illustration.webp',
    icon: '📂',
    path: 'p6-1-portfolio',
    topics: [
      { label: 'Personal Portfolio Web', path: 'p6-1-portfolio' },
      { label: 'Interactive Dashboard App', path: 'p6-2-dashboard' },
      { label: 'Full Stack E-Commerce App', path: 'p6-3-ecommerce' },
      { label: 'Realtime Chat Client', path: 'p6-4-chat' },
    ]
  },
  {
    id: 'P7',
    title: 'Placement Prep',
    duration: '2-3 Weeks',
    color: 'bg-[#34495e]',
    bulletColor: '#34495e',
    imageUrl: '/projects_illustration.webp',
    icon: '🚀',
    path: 'p7-1-interview',
    topics: [
      { label: 'Technical Mock Interviews', path: 'p7-1-interview' },
      { label: 'ATS Resume Writing', path: 'p7-2-resume' },
      { label: 'GitHub & Portfolio ASO', path: 'p7-3-github' },
      { label: 'Freelance & Remote Funnels', path: 'p7-4-hiring' },
    ]
  }
];

export const uniqueFeatures = [
  '100% Practical & Project Based',
  'Step-by-Step Learning',
  'Industry Standard Tools & Workflow',
  'Portfolio & GitHub Focused',
  'Interview & Placement Oriented',
  'AI Tools Integrated Learning'
];

export const careerOutcomes = [
  'Frontend Developer',
  'Web Developer',
  'UI Developer',
  'Full Stack Developer',
  'Freelancer'
];

export const techStack = [
  'VS Code', 'Git', 'GitHub', 'Chrome', 'Figma',
  'Node.js', 'Express.js', 'MongoDB', 'React', 'Postman'
];

export const projectsList = [
  'Personal Portfolio Website',
  'Responsive Business Website',
  'To-Do List App',
  'Weather Application',
  'Notes App',
  'E-Commerce Frontend',
  'Blog Website',
  'Full Stack Student Management System',
  'And Many More...'
];
