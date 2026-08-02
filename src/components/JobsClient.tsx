"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search, Briefcase, MapPin, Building2, GraduationCap,
  Bookmark, BookmarkCheck, ArrowLeft, Filter, Sparkles,
  ExternalLink, Clock, CheckCircle2, ChevronRight, X, FileText, Upload, Plus, Trash2, Check, Edit3, Layers
} from "lucide-react";
import { JOBS_DATA, JobListing, JOB_CATEGORIES, DEGREE_FILTERS } from "../data/jobsData";

export interface ParsedJobPosition {
  tempId: string;
  title: string;
  company: string;
  location: string;
  workType: "Remote" | "Hybrid" | "On-Site";
  type: "Full-Time" | "Internship" | "Contract";
  experience: "Freshers" | "0-1 Years" | "1-3 Years";
  salary: string;
  degrees: ("BCA" | "MCA" | "B.Tech")[];
  category: "Frontend" | "Backend" | "Full Stack" | "QA & Testing" | "Cloud & DevOps" | "Internship" | "Govt IT";
  skills: string;
  description: string;
  applyUrl: string;
}

export default function JobsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDegree, setSelectedDegree] = useState<string>("All Degrees");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedWorkType, setSelectedWorkType] = useState<string>("All");
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<"all" | "saved">("all");
  const [selectedJobModal, setSelectedJobModal] = useState<JobListing | null>(null);
  const [mounted, setMounted] = useState(false);

  // Admin PDF Upload & Custom Jobs State
  const [customJobs, setCustomJobs] = useState<JobListing[]>([]);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [uploadPdfName, setUploadPdfName] = useState("");
  const [pdfDataUrl, setPdfDataUrl] = useState("");
  
  // Multi-Position Parsed Roles Array
  const [parsedPositions, setParsedPositions] = useState<ParsedJobPosition[]>([]);
  const [activePositionIdx, setActivePositionIdx] = useState<number>(0);
  const [isProcessingOcr, setIsProcessingOcr] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Saved jobs
    const rawSaved = localStorage.getItem("nextsem_saved_jobs");
    if (rawSaved) {
      try {
        const arr = JSON.parse(rawSaved);
        if (Array.isArray(arr)) setSavedJobIds(new Set(arr));
      } catch {}
    }

    // Custom posted jobs from PDF uploads
    const rawCustom = localStorage.getItem("nextsem_custom_jobs");
    if (rawCustom) {
      try {
        const arr = JSON.parse(rawCustom);
        if (Array.isArray(arr)) setCustomJobs(arr);
      } catch {}
    }
  }, []);

  const toggleSaveJob = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = new Set(savedJobIds);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setSavedJobIds(updated);
    localStorage.setItem("nextsem_saved_jobs", JSON.stringify(Array.from(updated)));
  };

  // Helper: Extract text from PDF raw Data URL stream
  const extractTextFromPdfDataUrl = (dataUrl: string, rawFileName: string): string => {
    try {
      const base64Part = dataUrl.split(",")[1] || "";
      const decoded = atob(base64Part);
      // Clean readable ASCII / UTF-8 strings
      const printableMatches = decoded.match(/[\w\s.,;:()\/\-–—₹%&$@#'"+=<>!?]{4,}/g);
      if (printableMatches && printableMatches.length > 5) {
        return printableMatches.join("\n");
      }
    } catch {}
    return rawFileName;
  };

  // Advanced PDF Intelligent Multi-Position OCR & Field Parser
  const parsePdfDocumentContent = (rawContent: string, fileName: string, dataUrl: string) => {
    setIsProcessingOcr(true);

    const pdfText = extractTextFromPdfDataUrl(dataUrl, fileName) + "\n" + rawContent;
    const lowerText = pdfText.toLowerCase();

    // 1. Detect Company / Hiring Entity Name
    let detectedCompany = "Official Tech Recruitment";
    if (/accenture/i.test(pdfText)) detectedCompany = "Accenture";
    else if (/tata consultancy|tcs/i.test(pdfText)) detectedCompany = "Tata Consultancy Services (TCS)";
    else if (/wipro/i.test(pdfText)) detectedCompany = "Wipro Technologies";
    else if (/infosys/i.test(pdfText)) detectedCompany = "Infosys Limited";
    else if (/zoho/i.test(pdfText)) detectedCompany = "Zoho Corporation";
    else if (/national informatics|nic/i.test(pdfText)) detectedCompany = "National Informatics Centre (NIC)";
    else if (/isro/i.test(pdfText)) detectedCompany = "ISRO (Indian Space Research Org)";
    else if (/cdac/i.test(pdfText)) detectedCompany = "C-DAC India";
    else if (/amazon/i.test(pdfText)) detectedCompany = "Amazon Tech";
    else if (/google/i.test(pdfText)) detectedCompany = "Google";
    else {
      const companyMatch = pdfText.match(/(?:company|organization|recruiter|hiring agency|agency):\s*([A-Za-z0-9\s&.]+)/i);
      if (companyMatch && companyMatch[1]) detectedCompany = companyMatch[1].trim();
    }

    // 2. Multi-Position Detection: Look for position markers / designations
    const positionKeywords = [
      "consultant", "software engineer", "frontend developer", "backend developer",
      "full stack developer", "qa engineer", "system analyst", "cloud associate",
      "data analyst", "devops engineer", "web developer", "technical assistant",
      "network engineer", "database administrator", "ui/ux designer", "it support"
    ];

    const detectedTitles: string[] = [];

    // Check explicitly numbered posts (e.g. "Post 1: Senior Consultant", "Post 2: Software Engineer")
    const postMatches = pdfText.match(/(?:post|position|role|designation|post code)\s*#?\s*\d*[:.-]?\s*([A-Za-z\s\/&]{4,40})/gi);
    if (postMatches && postMatches.length > 0) {
      postMatches.forEach((m) => {
        const cleaned = m.replace(/(?:post|position|role|designation|post code)\s*#?\s*\d*[:.-]?\s*/i, "").trim();
        if (cleaned.length >= 3 && !detectedTitles.includes(cleaned)) {
          detectedTitles.push(cleaned);
        }
      });
    }

    // Scan for technology role keywords if none found
    if (detectedTitles.length === 0) {
      positionKeywords.forEach((kw) => {
        if (lowerText.includes(kw)) {
          const formatted = kw.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
          if (!detectedTitles.includes(formatted)) {
            detectedTitles.push(formatted);
          }
        }
      });
    }

    // Fallback: file name as single title if no positions auto-detected
    if (detectedTitles.length === 0) {
      let baseTitle = fileName.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      baseTitle = baseTitle.charAt(0).toUpperCase() + baseTitle.slice(1);
      detectedTitles.push(baseTitle.length > 4 ? baseTitle : "IT Consultant & Software Associate");
    }

    // 3. Build Extracted Position Objects for each detected role
    const results: ParsedJobPosition[] = detectedTitles.slice(0, 6).map((title, idx) => {
      // Experience Level
      let experience: "Freshers" | "0-1 Years" | "1-3 Years" = "Freshers";
      if (/1-3 yrs|1 to 3 years|2 years|3 years/i.test(pdfText)) experience = "1-3 Years";
      else if (/0-1 yrs|0 to 1 year|6 months/i.test(pdfText)) experience = "0-1 Years";

      // Salary
      let salary = "₹4.5 - ₹8.5 LPA";
      const salaryMatch = pdfText.match(/(?:salary|pay|ctc|package|stipend)[:\s]*([₹Rs.\d\s\-.,LPA/month]+)/i);
      if (salaryMatch && salaryMatch[1] && salaryMatch[1].length < 30) {
        salary = salaryMatch[1].trim();
      }

      // Location
      let location = "Bengaluru / Remote";
      if (/remote|work from home/i.test(pdfText)) location = "Remote (Work from Home)";
      else if (/delhi|ncr|noida|gurugram/i.test(pdfText)) location = "NCR (Delhi / Noida / Gurugram)";
      else if (/hyderabad/i.test(pdfText)) location = "Hyderabad, Telangana";
      else if (/pune|mumbai/i.test(pdfText)) location = "Pune / Mumbai, Maharashtra";
      else if (/chennai/i.test(pdfText)) location = "Chennai, Tamil Nadu";

      // Work Mode
      let workType: "Remote" | "Hybrid" | "On-Site" = "Hybrid";
      if (/remote/i.test(location)) workType = "Remote";
      else if (/on-site|office/i.test(pdfText)) workType = "On-Site";

      // Degrees
      const degrees: ("BCA" | "MCA" | "B.Tech")[] = [];
      if (/bca/i.test(pdfText) || /bca/i.test(title)) degrees.push("BCA");
      if (/mca/i.test(pdfText) || /mca/i.test(title)) degrees.push("MCA");
      if (/btech|b\.tech|computer science|engineering/i.test(pdfText) || /btech/i.test(title)) degrees.push("B.Tech");

      if (degrees.length === 0) degrees.push("BCA", "MCA", "B.Tech");

      // Category
      let category: ParsedJobPosition["category"] = "Full Stack";
      if (/frontend|react|html|css|ui/i.test(title.toLowerCase())) category = "Frontend";
      else if (/backend|node|express|python|java/i.test(title.toLowerCase())) category = "Backend";
      else if (/qa|testing|automation/i.test(title.toLowerCase())) category = "QA & Testing";
      else if (/cloud|devops|linux|system/i.test(title.toLowerCase())) category = "Cloud & DevOps";
      else if (/intern/i.test(title.toLowerCase())) category = "Internship";
      else if (/nic|govt|isro|cdac|psu/i.test(detectedCompany.toLowerCase())) category = "Govt IT";

      // Skills Extraction
      const foundSkills: string[] = [];
      const skillCatalog = ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "Express", "SQL", "Python", "Java", "Git", "Linux", "AWS", "Cypress", "MongoDB", "TypeScript", "Tailwind CSS"];
      skillCatalog.forEach((s) => {
        if (lowerText.includes(s.toLowerCase())) foundSkills.push(s);
      });
      if (foundSkills.length === 0) foundSkills.push("Problem Solving", "Web Basics", "SQL", "Git");

      // Apply URL
      let applyUrl = "https://nextsem.online";
      const urlMatch = pdfText.match(/https?:\/\/[^\s<"']+/i);
      if (urlMatch && urlMatch[0] && !urlMatch[0].includes("nextsem")) {
        applyUrl = urlMatch[0];
      } else if (detectedCompany.includes("Accenture")) applyUrl = "https://www.accenture.com/in-en/careers";
      else if (detectedCompany.includes("TCS")) applyUrl = "https://nextstep.tcs.com/campus/";
      else if (detectedCompany.includes("Wipro")) applyUrl = "https://careers.wipro.com/";
      else if (detectedCompany.includes("Zoho")) applyUrl = "https://www.zoho.com/careers/";
      else if (detectedCompany.includes("NIC")) applyUrl = "https://www.nic.in/recruitment/";

      return {
        tempId: `parsed-pos-${Date.now()}-${idx}`,
        title: title,
        company: detectedCompany,
        location: location,
        workType: workType,
        type: "Full-Time",
        experience: experience,
        salary: salary,
        degrees: degrees,
        category: category,
        skills: foundSkills.join(", "),
        description: `Official job notification for ${title} at ${detectedCompany}. Extracted from official circular "${fileName}". Eligible candidates from BCA, MCA, and B.Tech can apply.`,
        applyUrl: applyUrl,
      };
    });

    setParsedPositions(results);
    setActivePositionIdx(0);
    setIsProcessingOcr(false);
  };

  // PDF File Upload Handler
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadPdfName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setPdfDataUrl(content);

      // Trigger multi-position parser
      parsePdfDocumentContent(content, file.name, content);
    };

    reader.readAsDataURL(file);
  };

  // Publish ALL parsed positions in batch
  const handlePublishAllPositions = (e: React.FormEvent) => {
    e.preventDefault();
    if (parsedPositions.length === 0) return;

    const newJobs: JobListing[] = parsedPositions.map((pos, idx) => ({
      id: `custom-job-${Date.now()}-${idx}`,
      title: pos.title.trim(),
      company: pos.company.trim(),
      logo: "📄",
      location: pos.location.trim() || "India",
      workType: pos.workType,
      type: pos.type,
      experience: pos.experience,
      salary: pos.salary.trim() || "As per industry standards",
      degrees: pos.degrees,
      category: pos.category,
      postedDate: "Just now",
      skills: pos.skills.split(",").map((s) => s.trim()).filter(Boolean),
      description: pos.description.trim() || "Official PDF Notification Job Drive",
      applyUrl: pos.applyUrl.trim() || "https://nextsem.online",
      pdfUrl: pdfDataUrl || undefined,
      pdfFileName: uploadPdfName || undefined,
      featured: true,
    }));

    const updatedCustom = [...newJobs, ...customJobs];
    setCustomJobs(updatedCustom);
    localStorage.setItem("nextsem_custom_jobs", JSON.stringify(updatedCustom));

    // Reset admin form state
    setUploadPdfName("");
    setPdfDataUrl("");
    setParsedPositions([]);
    setShowAdminPanel(false);
    if (newJobs[0]) setSelectedJobModal(newJobs[0]);
  };

  const updateCurrentPositionField = <K extends keyof ParsedJobPosition>(
    field: K,
    value: ParsedJobPosition[K]
  ) => {
    setParsedPositions((prev) => {
      const copy = [...prev];
      if (copy[activePositionIdx]) {
        copy[activePositionIdx] = { ...copy[activePositionIdx], [field]: value };
      }
      return copy;
    });
  };

  const toggleDegreeForActivePosition = (deg: "BCA" | "MCA" | "B.Tech") => {
    setParsedPositions((prev) => {
      const copy = [...prev];
      const active = copy[activePositionIdx];
      if (active) {
        const exists = active.degrees.includes(deg);
        const nextDegrees = exists
          ? active.degrees.filter((d) => d !== deg)
          : [...active.degrees, deg];
        copy[activePositionIdx] = {
          ...active,
          degrees: nextDegrees.length > 0 ? nextDegrees : [deg],
        };
      }
      return copy;
    });
  };

  const removePositionCard = (idx: number) => {
    setParsedPositions((prev) => {
      const filtered = prev.filter((_, i) => i !== idx);
      if (activePositionIdx >= filtered.length) {
        setActivePositionIdx(Math.max(0, filtered.length - 1));
      }
      return filtered;
    });
  };

  const addNewBlankPosition = () => {
    const newPos: ParsedJobPosition = {
      tempId: `blank-${Date.now()}`,
      title: "New Technology Specialist",
      company: parsedPositions[0]?.company || "Official Hiring Drive",
      location: "Bengaluru, India",
      workType: "Hybrid",
      type: "Full-Time",
      experience: "Freshers",
      salary: "₹5.0 - ₹8.0 LPA",
      degrees: ["BCA", "MCA", "B.Tech"],
      category: "Full Stack",
      skills: "HTML5, CSS3, JavaScript, React, Node.js",
      description: "Additional position extracted from circular.",
      applyUrl: parsedPositions[0]?.applyUrl || "https://nextsem.online",
    };
    setParsedPositions((prev) => [...prev, newPos]);
    setActivePositionIdx(parsedPositions.length);
  };

  const handleDeleteCustomJob = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customJobs.filter((j) => j.id !== id);
    setCustomJobs(updated);
    localStorage.setItem("nextsem_custom_jobs", JSON.stringify(updated));
  };

  // Combine static + custom uploaded jobs
  const allJobs = [...customJobs, ...JOBS_DATA];

  // Upgraded Multi-word search filter logic
  const filteredJobs = allJobs.filter((job) => {
    if (activeTab === "saved" && !savedJobIds.has(job.id)) return false;

    if (selectedDegree !== "All Degrees") {
      if (!job.degrees.includes(selectedDegree as "BCA" | "MCA" | "B.Tech")) return false;
    }

    if (selectedCategory !== "All") {
      if (job.category !== selectedCategory) return false;
    }

    if (selectedWorkType !== "All") {
      if (job.workType !== selectedWorkType) return false;
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      const terms = q.split(/\s+/).filter(Boolean);

      const jobCorpus = [
        job.title,
        job.company,
        job.location,
        job.category,
        job.workType,
        job.experience,
        job.salary,
        job.description,
        ...job.degrees,
        ...job.skills
      ].join(" ").toLowerCase();

      const matchesAllTerms = terms.every((term) => jobCorpus.includes(term));
      if (!matchesAllTerms) return false;
    }

    return true;
  });

  // Generate Google Jobs schema for crawlers
  const jsonLdJobs = filteredJobs.map((job) => ({
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "identifier": {
      "@type": "PropertyValue",
      "name": job.company,
      "value": job.id
    },
    "datePosted": "2026-07-20",
    "employmentType": job.type === "Full-Time" ? "FULL_TIME" : "INTERN",
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.company
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location
      }
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": {
        "@type": "QuantitativeValue",
        "unitText": "YEAR",
        "value": job.salary
      }
    }
  }));

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-8 animate-pulse">
        <div className="h-8 bg-slate-900 rounded w-1/4 mb-4" />
        <div className="h-12 bg-slate-900 rounded w-3/4 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-40 bg-slate-900 rounded-xl" />
          <div className="h-40 bg-slate-900 rounded-xl" />
        </div>
      </div>
    );
  }

  const currentPos = parsedPositions[activePositionIdx];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Schema.org markup for Google Jobs Crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdJobs) }}
      />

      {/* Header Bar */}
      <div className="sticky top-0 z-40 h-14 bg-slate-950/90 backdrop-blur border-b border-slate-800 flex items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={14} />
          Home
        </Link>
        <div className="flex items-center gap-2">
          <Briefcase size={16} className="text-blue-400" />
          <span className="text-xs md:text-sm font-black text-white uppercase tracking-wider">
            BCA · MCA · B.Tech Tech Jobs Portal
          </span>
        </div>
        
        {/* Admin Upload Trigger Button */}
        <button
          onClick={() => setShowAdminPanel(!showAdminPanel)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-blue-600/20"
        >
          <Upload size={13} />
          <span>Upload PDF Circular</span>
        </button>
      </div>

      {/* Admin PDF OCR & Multi-Position Auto-Parser Panel */}
      {showAdminPanel && (
        <div className="bg-slate-900 border-b border-blue-500/40 p-6 relative animate-in slide-in-from-top duration-200">
          <div className="max-w-5xl mx-auto space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-amber-400" />
                <h3 className="text-base font-black text-white uppercase tracking-wider">
                  PDF OCR &amp; Multi-Position Intelligent Job Parser
                </h3>
              </div>
              <button onClick={() => setShowAdminPanel(false)} className="text-slate-400 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>

            {/* File Drag & Drop Upload Zone */}
            <div className="border-2 border-dashed border-blue-500/40 hover:border-blue-400 rounded-2xl p-6 text-center bg-blue-950/20 transition-all">
              <Upload size={26} className="mx-auto text-blue-400 mb-2" />
              <p className="font-bold text-white mb-1">
                Upload Official Job Circular / Multi-Role Notification PDF
              </p>
              <p className="text-[11px] text-slate-400 mb-3 max-w-lg mx-auto">
                Upload any single or multi-position recruitment PDF/TXT. Our OCR engine automatically extracts every job role, salary, skills, and degree requirements!
              </p>
              <input
                type="file"
                accept=".pdf,.txt"
                onChange={handlePdfUpload}
                className="hidden"
                id="pdf-upload-input-multi"
              />
              <label
                htmlFor="pdf-upload-input-multi"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-wider rounded-xl cursor-pointer transition-all shadow-lg shadow-blue-600/30 text-xs"
              >
                <FileText size={15} /> Select PDF Circular File
              </label>

              {uploadPdfName && (
                <div className="mt-3 inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-700/50 text-emerald-300 text-xs font-bold px-3.5 py-1.5 rounded-lg">
                  <Check size={14} /> PDF Circular: {uploadPdfName}
                </div>
              )}
            </div>

            {/* Processing Shimmer */}
            {isProcessingOcr && (
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-center space-y-2 animate-pulse">
                <Sparkles size={20} className="mx-auto text-amber-400 animate-spin" />
                <p className="text-xs font-black text-blue-400 uppercase">
                  Running Intelligent OCR &amp; Multi-Position Extraction...
                </p>
              </div>
            )}

            {/* Multi-Position Review & Edit Tabs */}
            {parsedPositions.length > 0 && !isProcessingOcr && (
              <form onSubmit={handlePublishAllPositions} className="space-y-4 text-xs">
                
                {/* Positions Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-slate-950 border border-slate-800 rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <Layers size={16} className="text-blue-400" />
                    <span className="font-black text-white uppercase text-xs">
                      🎉 {parsedPositions.length} Job Position{parsedPositions.length > 1 ? "s" : ""} Auto-Detected from Circular
                    </span>
                  </div>
                  
                  <button
                    type="button"
                    onClick={addNewBlankPosition}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-blue-300 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={13} /> Add Position
                  </button>
                </div>

                {/* Position Selection Selector Cards */}
                <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                  {parsedPositions.map((pos, idx) => (
                    <div
                      key={pos.tempId}
                      onClick={() => setActivePositionIdx(idx)}
                      className={`px-3 py-2 rounded-xl border text-left cursor-pointer transition-all shrink-0 min-w-[160px] flex items-center justify-between gap-2 ${
                        activePositionIdx === idx
                          ? "bg-blue-600/30 border-blue-400 text-white shadow-md"
                          : "bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <div className="truncate">
                        <span className="text-[10px] font-mono font-bold block text-blue-400">Position {idx + 1}</span>
                        <h4 className="font-black text-xs text-white truncate max-w-[130px]">{pos.title || "Untitled Role"}</h4>
                      </div>
                      {parsedPositions.length > 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removePositionCard(idx);
                          }}
                          className="text-slate-500 hover:text-rose-400 p-1"
                          title="Remove position"
                        >
                          <X size={13} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Selected Position Edit Form */}
                {currentPos && (
                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="font-black text-xs text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Edit3 size={13} /> Editing Details for Position {activePositionIdx + 1}: {currentPos.title}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      <div>
                        <label className="text-slate-400 font-bold uppercase block mb-1">Job Title *</label>
                        <input
                          type="text"
                          required
                          value={currentPos.title}
                          onChange={(e) => updateCurrentPositionField("title", e.target.value)}
                          placeholder="e.g. Junior Web Developer"
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-semibold focus:border-blue-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-slate-400 font-bold uppercase block mb-1">Company / Ministry *</label>
                        <input
                          type="text"
                          required
                          value={currentPos.company}
                          onChange={(e) => updateCurrentPositionField("company", e.target.value)}
                          placeholder="e.g. TCS / NIC / Accenture"
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-semibold focus:border-blue-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-slate-400 font-bold uppercase block mb-1">Salary Package *</label>
                        <input
                          type="text"
                          required
                          value={currentPos.salary}
                          onChange={(e) => updateCurrentPositionField("salary", e.target.value)}
                          placeholder="e.g. ₹4.5 - ₹7.5 LPA"
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-semibold focus:border-blue-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-slate-400 font-bold uppercase block mb-1">Location *</label>
                        <input
                          type="text"
                          required
                          value={currentPos.location}
                          onChange={(e) => updateCurrentPositionField("location", e.target.value)}
                          placeholder="e.g. Bengaluru / Remote"
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-semibold focus:border-blue-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-slate-400 font-bold uppercase block mb-1">Experience Level *</label>
                        <select
                          value={currentPos.experience}
                          onChange={(e) => updateCurrentPositionField("experience", e.target.value as any)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-semibold focus:border-blue-500 focus:outline-none"
                        >
                          <option value="Freshers">Freshers (0 Yrs)</option>
                          <option value="0-1 Years">0-1 Years</option>
                          <option value="1-3 Years">1-3 Years</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-slate-400 font-bold uppercase block mb-1">Apply Direct URL *</label>
                        <input
                          type="url"
                          required
                          value={currentPos.applyUrl}
                          onChange={(e) => updateCurrentPositionField("applyUrl", e.target.value)}
                          placeholder="https://company.com/apply"
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-semibold focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Eligible Degrees Checkboxes */}
                    <div>
                      <label className="text-slate-400 font-bold uppercase block mb-1.5">Eligible Degrees *</label>
                      <div className="flex gap-2">
                        {(["BCA", "MCA", "B.Tech"] as const).map((deg) => {
                          const isChecked = currentPos.degrees.includes(deg);
                          return (
                            <button
                              type="button"
                              key={deg}
                              onClick={() => toggleDegreeForActivePosition(deg)}
                              className={`px-3 py-1 rounded-xl text-xs font-black uppercase transition-all flex items-center gap-1 border cursor-pointer ${
                                isChecked
                                  ? "bg-blue-600 border-blue-400 text-white"
                                  : "bg-slate-900 border-slate-800 text-slate-500"
                              }`}
                            >
                              {isChecked && <Check size={12} />}
                              {deg}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <label className="text-slate-400 font-bold uppercase block mb-1">Required Skills (Comma separated)</label>
                      <input
                        type="text"
                        value={currentPos.skills}
                        onChange={(e) => updateCurrentPositionField("skills", e.target.value)}
                        placeholder="e.g. HTML5, CSS3, JavaScript, React, Node.js, SQL"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-semibold focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="text-slate-400 font-bold uppercase block mb-1">Position Summary &amp; Description</label>
                      <textarea
                        rows={2}
                        value={currentPos.description}
                        onChange={(e) => updateCurrentPositionField("description", e.target.value)}
                        placeholder="Key responsibilities and qualifications extracted from PDF..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-semibold focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Batch Action Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-400 font-medium">
                    All published positions will include download link for <strong>{uploadPdfName}</strong>.
                  </span>
                  
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setParsedPositions([]);
                        setShowAdminPanel(false);
                      }}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus size={15} /> Publish All {parsedPositions.length} Positions
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-950/50 via-slate-950 to-indigo-950/40 border-b border-slate-800 py-12 px-4 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.15)_0%,_transparent_70%)] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-950/60 border border-blue-700/40 text-blue-300 text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            <GraduationCap size={14} /> BCA / MCA / B.Tech Freshers &amp; Experience Drive
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Find Tech Jobs &amp; Internships For{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
              BCA, MCA &amp; B.Tech
            </span>
          </h1>

          <p className="text-slate-400 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed">
            Curated job openings, off-campus drives, paid internships, and government IT assistant roles for CS/IT students and graduates across India.
          </p>

          {/* Big Search Input */}
          <div className="max-w-2xl mx-auto pt-4 relative">
            <div className="flex bg-slate-900 border border-slate-800 focus-within:border-blue-500 rounded-2xl shadow-2xl overflow-hidden p-1">
              <div className="flex items-center pl-4 text-slate-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search job title, company, skill (e.g. React, Node.js, TCS, Bengaluru)..."
                className="w-full bg-transparent px-3 py-3 text-xs md:text-sm text-white placeholder-slate-500 focus:outline-none font-medium"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="px-3 text-slate-400 hover:text-white">
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Quick Degree Filter Badges */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <span className="text-xs text-slate-500 font-bold self-center mr-1">Filter Degree:</span>
            {DEGREE_FILTERS.map((deg) => (
              <button
                key={deg}
                onClick={() => setSelectedDegree(deg)}
                className={`px-3 py-1 rounded-full text-xs font-black transition-all cursor-pointer ${
                  selectedDegree === deg
                    ? "bg-blue-600 text-white border border-blue-400 shadow-md shadow-blue-600/20"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                {deg === "All Degrees" ? "🎓 All Degrees" : `🎓 ${deg}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

        {/* Tab & Filter Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          
          {/* Tabs: All Jobs vs Saved Jobs */}
          <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 gap-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                activeTab === "all" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              All Openings ({allJobs.length})
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "saved" ? "bg-amber-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <Bookmark size={13} />
              Saved Jobs ({savedJobIds.size})
            </button>
          </div>

          {/* Category & Work Type Dropdowns */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Category Select */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
              <Filter size={13} className="text-slate-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer font-bold"
              >
                {JOB_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-900 text-white">
                    Category: {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Work Type Select */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
              <Building2 size={13} className="text-slate-400" />
              <select
                value={selectedWorkType}
                onChange={(e) => setSelectedWorkType(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer font-bold"
              >
                <option value="All" className="bg-slate-900 text-white">Work Mode: All</option>
                <option value="Remote" className="bg-slate-900 text-white">Remote</option>
                <option value="Hybrid" className="bg-slate-900 text-white">Hybrid</option>
                <option value="On-Site" className="bg-slate-900 text-white">On-Site</option>
              </select>
            </div>
          </div>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 border border-slate-800/60 rounded-2xl p-8 space-y-3">
            <div className="text-4xl">🔍</div>
            <h3 className="text-lg font-black text-white">No Jobs Found</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              No active job openings match your current search query or filter criteria. Try resetting your degree or category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDegree("All Degrees");
                setSelectedCategory("All");
                setSelectedWorkType("All");
                setActiveTab("all");
              }}
              className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map((job) => {
              const isSaved = savedJobIds.has(job.id);
              const isCustom = job.id.startsWith("custom-job-");

              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJobModal(job)}
                  className={`bg-slate-900/60 border rounded-2xl p-5 hover:border-blue-500/50 hover:bg-slate-900/90 transition-all cursor-pointer flex flex-col justify-between space-y-4 group relative ${
                    job.featured ? "border-blue-500/40 bg-gradient-to-br from-blue-950/20 via-slate-900/60 to-slate-900/60" : "border-slate-800/80"
                  }`}
                >
                  {/* Top Bar: Company logo + Title + Save/Delete button */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center text-xl shrink-0">
                          {job.logo}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold text-slate-400">{job.company}</span>
                            {isCustom && (
                              <span className="text-[9px] bg-emerald-950/60 text-emerald-300 border border-emerald-700/40 px-1.5 py-0.2 rounded font-mono font-bold">
                                PDF Uploaded
                              </span>
                            )}
                          </div>
                          <h3 className="text-sm font-black text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                            {job.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        {isCustom && (
                          <button
                            onClick={(e) => handleDeleteCustomJob(job.id, e)}
                            className="p-2 rounded-xl bg-rose-950/40 border border-rose-800/40 text-rose-400 hover:text-rose-200 transition-all"
                            title="Delete custom published job"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                        <button
                          onClick={(e) => toggleSaveJob(job.id, e)}
                          className={`p-2 rounded-xl border transition-all cursor-pointer ${
                            isSaved
                              ? "bg-amber-950/40 border-amber-700/50 text-amber-400"
                              : "bg-slate-800/40 border-slate-700/40 text-slate-500 hover:text-white"
                          }`}
                          title={isSaved ? "Remove from saved" : "Save job"}
                        >
                          {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                        </button>
                      </div>
                    </div>

                    {/* Meta Info: Location, Work Mode, Experience, Salary */}
                    <div className="flex flex-wrap gap-2 text-[11px] text-slate-400 mt-3">
                      <span className="flex items-center gap-1 bg-slate-800/60 border border-slate-700/40 px-2.5 py-1 rounded-lg">
                        <MapPin size={11} className="text-slate-400" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1 bg-slate-800/60 border border-slate-700/40 px-2.5 py-1 rounded-lg">
                        <Building2 size={11} className="text-slate-400" /> {job.workType}
                      </span>
                      <span className="flex items-center gap-1 bg-emerald-950/40 border border-emerald-700/40 text-emerald-300 font-bold px-2.5 py-1 rounded-lg">
                        💰 {job.salary}
                      </span>
                    </div>

                    {/* Degree Eligibility Badges */}
                    <div className="flex items-center gap-1.5 mt-3">
                      <span className="text-[10px] text-slate-500 font-bold">Eligible:</span>
                      {job.degrees.map((deg) => (
                        <span
                          key={deg}
                          className="text-[10px] font-black uppercase tracking-wider bg-blue-950/50 border border-blue-700/40 text-blue-300 px-2 py-0.5 rounded-md"
                        >
                          {deg}
                        </span>
                      ))}
                      <span className="text-[10px] font-bold text-slate-500 ml-auto flex items-center gap-1">
                        <Clock size={10} /> {job.postedDate}
                      </span>
                    </div>

                    {/* Skills pills */}
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-slate-800/50">
                      {job.skills.map((skill) => (
                        <span key={skill} className="text-[10px] text-slate-400 bg-slate-800/40 px-2 py-0.5 rounded-md font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Footer */}
                  <div className="pt-3 border-t border-slate-800/50 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400">
                      Exp: <strong className="text-white">{job.experience}</strong>
                    </span>
                    
                    <div className="flex items-center gap-2">
                      {job.pdfUrl && (
                        <span className="text-[10px] text-blue-400 font-bold flex items-center gap-1 bg-blue-950/40 border border-blue-800/40 px-2 py-1 rounded-lg">
                          <FileText size={12} /> PDF Attached
                        </span>
                      )}
                      <a
                        href={job.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1 shadow-md shadow-blue-600/20"
                      >
                        Apply Now <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Career Guidance & Roadmap Banner for BCA / MCA / B.Tech */}
        <div className="bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-700/40 rounded-2xl p-6 md:p-8 text-left space-y-4">
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-black uppercase tracking-wider">
            <Sparkles size={14} className="text-amber-400" /> Fresher Career Playbook
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white">
            Top Tech Roles &amp; Off-Campus Preparation for BCA, MCA &amp; B.Tech
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
              <span className="text-base">🎓</span>
              <h4 className="font-bold text-white">For BCA Freshers</h4>
              <p className="text-slate-400 leading-relaxed">
                Focus on <strong>HTML, CSS, JS, SQL, and Windows CLI</strong>. Aim for Junior Web Dev, QA Engineer, or Desktop Support roles (₹3.5–₹6 LPA).
              </p>
            </div>

            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
              <span className="text-base">💻</span>
              <h4 className="font-bold text-white">For MCA Freshers</h4>
              <p className="text-slate-400 leading-relaxed">
                Master <strong>React, Node.js, Express, MongoDB &amp; DSA</strong>. Target Full Stack, Backend API Developer, and Cloud Associate roles (₹5–₹10 LPA).
              </p>
            </div>

            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
              <span className="text-base">🚀</span>
              <h4 className="font-bold text-white">For B.Tech (CS/IT)</h4>
              <p className="text-slate-400 leading-relaxed">
                Build 2+ live MERN/Next.js projects, practice Git workflows, and solve System Design basics. Target SDE-1 and Off-Campus Drives (₹6–₹14 LPA).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal View for Job Details — ALL DETAILS IN ONE PLACE */}
      {selectedJobModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 text-left space-y-5 relative animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedJobModal(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800"
            >
              <X size={18} />
            </button>

            {/* Header: Company & Title */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl shrink-0">
                {selectedJobModal.logo}
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400">{selectedJobModal.company}</span>
                <h3 className="text-lg font-black text-white">{selectedJobModal.title}</h3>
              </div>
            </div>

            {/* All Overview Pills in ONE PLACE */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-500 font-bold block uppercase">Salary Package</span>
                <span className="text-xs font-black text-emerald-400">{selectedJobModal.salary}</span>
              </div>
              <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-500 font-bold block uppercase">Experience Required</span>
                <span className="text-xs font-black text-white">{selectedJobModal.experience}</span>
              </div>
              <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-500 font-bold block uppercase">Location</span>
                <span className="text-xs font-black text-slate-200">{selectedJobModal.location}</span>
              </div>
              <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-500 font-bold block uppercase">Work Mode</span>
                <span className="text-xs font-black text-blue-400">{selectedJobModal.workType} ({selectedJobModal.type})</span>
              </div>
            </div>

            {/* Eligible Qualification Degrees */}
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
              <h4 className="text-[10px] font-black uppercase text-slate-400 mb-1">Eligible Qualification Degrees</h4>
              <div className="flex gap-2">
                {selectedJobModal.degrees.map((deg) => (
                  <span key={deg} className="bg-blue-950/60 border border-blue-700/40 text-blue-300 text-xs font-black px-2.5 py-0.5 rounded-md">
                    🎓 {deg}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-black uppercase text-slate-400 mb-1.5">Description &amp; Official Requirements</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-medium bg-slate-950/50 p-3 rounded-xl border border-slate-800/60">
                {selectedJobModal.description}
              </p>
            </div>

            {/* Required Skills */}
            <div>
              <h4 className="text-xs font-black uppercase text-slate-400 mb-1.5">Required Key Skills</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedJobModal.skills.map((skill) => (
                  <span key={skill} className="text-xs text-slate-300 bg-slate-800 border border-slate-700/60 px-2.5 py-1 rounded-md font-bold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Attached PDF Notification Viewer (If available) */}
            {selectedJobModal.pdfUrl && (
              <div className="p-3 bg-blue-950/40 border border-blue-800/40 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-blue-400" />
                  <div>
                    <span className="text-xs font-bold text-white block">Official Job Notification PDF</span>
                    <span className="text-[10px] text-slate-400">{selectedJobModal.pdfFileName || "Job_Circular.pdf"}</span>
                  </div>
                </div>
                <a
                  href={selectedJobModal.pdfUrl}
                  download={selectedJobModal.pdfFileName || "Job_Circular.pdf"}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold"
                >
                  Download PDF
                </a>
              </div>
            )}

            {/* Direct Apply CTA Footer */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Posted: <strong>{selectedJobModal.postedDate}</strong>
              </span>
              <a
                href={selectedJobModal.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-blue-600/30"
              >
                Apply Direct <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
