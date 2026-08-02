export interface JobListing {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  workType: "Remote" | "Hybrid" | "On-Site";
  type: "Full-Time" | "Internship" | "Contract";
  experience: "Freshers" | "0-1 Years" | "1-3 Years";
  salary: string;
  degrees: ("BCA" | "MCA" | "B.Tech")[];
  category: "Frontend" | "Backend" | "Full Stack" | "QA & Testing" | "Cloud & DevOps" | "Internship" | "Govt IT";
  postedDate: string;
  skills: string[];
  description: string;
  applyUrl: string;
  pdfUrl?: string;
  pdfFileName?: string;
  featured?: boolean;
}

export const JOBS_DATA: JobListing[] = [
  {
    id: "job-000",
    title: "IT Consultant & Systems Analyst",
    company: "Accenture & Global Tech Advisory",
    logo: "💼",
    location: "Bengaluru / Remote",
    workType: "Hybrid",
    type: "Full-Time",
    experience: "Freshers",
    salary: "₹6.0 - ₹9.5 LPA",
    degrees: ["BCA", "MCA", "B.Tech"],
    category: "Cloud & DevOps",
    postedDate: "Just now",
    skills: ["IT Consulting", "System Architecture", "Cloud Basics", "SQL", "Web Technologies"],
    description: "Official Consultant & Systems Analyst hiring notification. Open to BCA, MCA, and B.Tech graduates. Responsibilities include technical consulting, requirement analysis, and system architecture implementation.",
    applyUrl: "https://www.accenture.com/in-en/careers",
    featured: true
  },
  {
    id: "job-001",
    title: "Junior Frontend Developer (React / HTML / Tailwind)",
    company: "TechNova Solutions",
    logo: "⚡",
    location: "Bengaluru, Karnataka",
    workType: "Hybrid",
    type: "Full-Time",
    experience: "Freshers",
    salary: "₹4.5 - ₹6.5 LPA",
    degrees: ["BCA", "MCA", "B.Tech"],
    category: "Frontend",
    postedDate: "1 day ago",
    skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS"],
    description: "Looking for enthusiastic freshers with strong fundamentals in HTML, CSS, JavaScript, and React. You will build responsive UI components and integrate REST APIs.",
    applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Junior%20Frontend%20Developer",
    featured: true
  },
  {
    id: "job-002",
    title: "Graduate Engineer Trainee (GET - IT Systems)",
    company: "Tata Consultancy Services (TCS)",
    logo: "🏢",
    location: "Pan India (Multiple Locations)",
    workType: "On-Site",
    type: "Full-Time",
    experience: "Freshers",
    salary: "₹3.8 - ₹7.0 LPA",
    degrees: ["BCA", "MCA", "B.Tech"],
    category: "Full Stack",
    postedDate: "2 days ago",
    skills: ["Core Java", "SQL", "Windows CLI", "Git", "Problem Solving"],
    description: "TCS Off-Campus Hiring Drive for 2024 & 2025 batch BCA, MCA, and B.Tech graduates. Selected candidates will undergo structured training before project allocation.",
    applyUrl: "https://nextstep.tcs.com/campus/",
    featured: true
  },
  {
    id: "job-003",
    title: "Full Stack Web Developer Intern",
    company: "CodersHQ Startup Lab",
    logo: "🚀",
    location: "Remote (Work from Home)",
    workType: "Remote",
    type: "Internship",
    experience: "Freshers",
    salary: "₹15,000 - ₹25,000 / month",
    degrees: ["BCA", "MCA", "B.Tech"],
    category: "Internship",
    postedDate: "Today",
    skills: ["Node.js", "Express", "React", "MongoDB", "REST APIs"],
    description: "3-month paid internship with PPO opportunity. Build real-world MERN stack web applications alongside senior full stack mentors.",
    applyUrl: "https://wellfound.com/jobs?q=full+stack+intern",
    featured: true
  },
  {
    id: "job-004",
    title: "Junior Backend Developer (Node.js & Express)",
    company: "ScaleGrid Systems",
    logo: "⚙️",
    location: "Gurugram, NCR",
    workType: "Hybrid",
    type: "Full-Time",
    experience: "0-1 Years",
    salary: "₹5.0 - ₹8.0 LPA",
    degrees: ["MCA", "B.Tech"],
    category: "Backend",
    postedDate: "3 days ago",
    skills: ["Node.js", "Express.js", "PostgreSQL", "Redis", "Docker Basics"],
    description: "Build robust REST APIs and database schemas for high-traffic financial web platforms. Freshers with solid project portfolio are welcome.",
    applyUrl: "https://www.indeed.com/q-Node.js-Developer-jobs.html",
    featured: false
  },
  {
    id: "job-005",
    title: "Junior QA & Automation Test Engineer",
    company: "QualityFirst Labs",
    logo: "🧪",
    location: "Hyderabad, Telangana",
    workType: "On-Site",
    type: "Full-Time",
    experience: "Freshers",
    salary: "₹3.6 - ₹5.2 LPA",
    degrees: ["BCA", "MCA", "B.Tech"],
    category: "QA & Testing",
    postedDate: "2 days ago",
    skills: ["Manual Testing", "JavaScript", "Cypress", "Postman", "Bug Tracking"],
    description: "Execute test cases, write automated UI tests in Cypress/JavaScript, and report defects for enterprise web applications.",
    applyUrl: "https://www.naukri.com/qa-automation-testing-jobs",
    featured: false
  },
  {
    id: "job-006",
    title: "Cloud & Linux Support Associate",
    company: "CloudInfra Technologies",
    logo: "☁️",
    location: "Noida, NCR",
    workType: "On-Site",
    type: "Full-Time",
    experience: "Freshers",
    salary: "₹3.5 - ₹5.0 LPA",
    degrees: ["BCA", "MCA", "B.Tech"],
    category: "Cloud & DevOps",
    postedDate: "4 days ago",
    skills: ["Linux CLI", "Bash Scripting", "Networking Basics", "AWS Cloud Essentials"],
    description: "Monitor server infrastructure, run terminal diagnostics, handle deployments, and assist in cloud migration tasks.",
    applyUrl: "https://aws.amazon.com/careers/",
    featured: false
  },
  {
    id: "job-007",
    title: "Junior Technical Assistant (NIC Govt IT)",
    company: "National Informatics Centre (NIC)",
    logo: "🏛️",
    location: "New Delhi (Govt)",
    workType: "On-Site",
    type: "Full-Time",
    experience: "Freshers",
    salary: "₹35,400 - ₹1,12,400 / month (Level 6)",
    degrees: ["BCA", "MCA", "B.Tech"],
    category: "Govt IT",
    postedDate: "5 days ago",
    skills: ["Computer Fundamentals", "SQL", "Networking", "Web Development"],
    description: "Government IT recruitment for BCA, MCA, and B.Tech CS/IT pass-outs. Conduct software maintenance and portal operations for Govt Ministries.",
    applyUrl: "https://www.nic.in/recruitment/",
    featured: true
  },
  {
    id: "job-008",
    title: "React.js Web Engineer",
    company: "Zoho Corporation",
    logo: "🔴",
    location: "Chennai, Tamil Nadu",
    workType: "On-Site",
    type: "Full-Time",
    experience: "0-1 Years",
    salary: "₹6.0 - ₹9.0 LPA",
    degrees: ["BCA", "MCA", "B.Tech"],
    category: "Frontend",
    postedDate: "3 days ago",
    skills: ["React.js", "TypeScript", "HTML5", "CSS Grid", "Performance Tuning"],
    description: "Zoho is hiring talented front-end developers for their cloud office apps. Open to BCA/MCA/B.Tech grads who clear their hands-on coding test.",
    applyUrl: "https://www.zoho.com/careers/",
    featured: true
  },
  {
    id: "job-009",
    title: "Off-Campus Software Engineer (2024 / 2025 Batch)",
    company: "Wipro Technologies",
    logo: "🌐",
    location: "Pune, Maharashtra",
    workType: "Hybrid",
    type: "Full-Time",
    experience: "Freshers",
    salary: "₹3.5 - ₹6.5 LPA",
    degrees: ["BCA", "MCA", "B.Tech"],
    category: "Full Stack",
    postedDate: "4 days ago",
    skills: ["Java", "Python", "Web Basics", "SQL", "Git"],
    description: "Wipro Elite National Talent Hunt drive. Open for BCA, MCA, and B.Tech graduates with minimum 60% in degree.",
    applyUrl: "https://careers.wipro.com/",
    featured: false
  },
  {
    id: "job-010",
    title: "Frontend UI Developer (Remote)",
    company: "PixelCraft Digital",
    logo: "🎨",
    location: "Remote",
    workType: "Remote",
    type: "Full-Time",
    experience: "1-3 Years",
    salary: "₹6.5 - ₹10.0 LPA",
    degrees: ["BCA", "MCA", "B.Tech"],
    category: "Frontend",
    postedDate: "Just now",
    skills: ["Next.js", "Tailwind CSS", "TypeScript", "Figma to Code"],
    description: "Create pixel-perfect responsive landing pages and interactive dashboards for global SaaS clients.",
    applyUrl: "https://remoteok.com/remote-frontend-jobs",
    featured: false
  }
];

export const JOB_CATEGORIES = [
  "All",
  "Frontend",
  "Backend",
  "Full Stack",
  "QA & Testing",
  "Cloud & DevOps",
  "Internship",
  "Govt IT"
] as const;

export const DEGREE_FILTERS = ["All Degrees", "BCA", "MCA", "B.Tech"] as const;
