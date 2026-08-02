# 💼 BCA, MCA & B.Tech Tech Jobs Portal — Architecture & Feature Spec

> **Live Route**: `https://nextsem.online/jobs`
> **Target Audience**: BCA, MCA, and B.Tech (CS/IT/ECE) students, freshers, and early career developers (0–3 years exp) in India 🇮🇳

---

## 📌 Overview

The **Nextsem Jobs Portal** (`/jobs`) connects computer science students and engineering graduates with relevant job openings, internships, off-campus hiring drives, and government IT roles tailored specifically to their qualification (BCA, MCA, B.Tech).

---

## 🚀 Key Features

### 1. 🎓 Qualification-Based Filtering
- **BCA Eligible Jobs**: Entry-level web developer, QA engineer, desktop support, junior analyst.
- **MCA Eligible Jobs**: Software engineer, backend developer, cloud associate, database admin.
- **B.Tech Eligible Jobs**: Frontend/Backend/Full stack engineer, DevOps engineer, SDE-1.
- **All / Multi-Eligible**: Open to all CS degree holders.

### 2. 🎯 Job Categories & Roles
- **Frontend Development**: HTML/CSS, React, Next.js, Tailwind
- **Backend & Full Stack**: Node.js, Express, Python, Django, MongoDB, SQL
- **Internships & Off-Campus**: Paid internships, hiring challenges for 2024/2025/2026 batches
- **QA & Testing**: Automation testing, Manual QA, Cypress, Selenium
- **System Administration & Cloud**: Linux, AWS, Networking, IT Support
- **Govt & Public Sector IT**: NIC, CDAC, ISRO IT Assistant, PSU Tech Officers

### 3. 🔍 Smart Search & Filtering
- Search by role title, company name, required skill, or location (Bengaluru, NCR, Remote, Pune, Hyderabad, Mumbai).
- Filter by **Work Mode**: Remote / Hybrid / On-Site.
- Filter by **Experience**: Freshers (0 Yrs) / 0–1 Yrs / 1–3 Yrs.

### 4. 💾 Saved Jobs & Bookmark System
- Users can bookmark/save jobs with one click.
- Saved jobs persist in browser `localStorage` (`nextsem_saved_jobs`).

### 5. 📄 Admin PDF OCR & Multi-Position Auto-Parser GUI
- **Multi-Position PDF Intelligence**: When uploading official Job Notification `.pdf` or `.txt` circulars, the client-side parser scans the document for single or multiple job designations (e.g., Position 1: Junior Developer, Position 2: Systems Analyst, Position 3: QA Specialist).
- **Automated Field Population for Each Position**: Extracts and populates Title, Company/Ministry Name, Salary/Pay Scale, Work Location, Experience Level, Eligible Qualification Degrees (`BCA`, `MCA`, `B.Tech`), Required Skills, Official Description, Apply URL, and source PDF attachment for every detected role.
- **Batch Review & Edit GUI**: Displays all parsed job positions in a multi-card review list allowing individual editing, addition, or deletion before publishing.
- **One-Click Batch Publishing**: Publishes all parsed positions into the live `/jobs` feed with persistent browser storage in `localStorage` (`nextsem_custom_jobs`).
- **Complete Single-View Modal**: Displays all qualifications, salary, skills, source PDF download, and direct application links in **ONE PLACE**.


### 6. 📑 Structured JSON-LD Data for Google Jobs Schema
- Every job listing includes Schema.org `JobPosting` JSON-LD markup to enable automatic indexing on **Google Jobs Search**.


---

## 🗄️ Data Structure (`src/data/jobsData.ts`)

```typescript
export interface JobListing {
  id: string;
  title: string;
  company: string;
  logo: string; // Emoji or SVG path
  location: string;
  workType: "Remote" | "Hybrid" | "On-Site";
  type: "Full-Time" | "Internship" | "Contract";
  experience: "Freshers" | "0-1 Years" | "1-3 Years";
  salary: string; // e.g. "₹4.5 - ₹7.0 LPA" or "₹25,000/month"
  degrees: ("BCA" | "MCA" | "B.Tech")[];
  category: "Frontend" | "Backend" | "Full Stack" | "QA & Testing" | "Cloud & DevOps" | "Internship" | "Govt IT";
  postedDate: string;
  skills: string[];
  description: string;
  applyUrl: string;
  featured?: boolean;
}
```

---

## 🎨 Component Architecture

- **Page Route**: `src/app/jobs/page.tsx` — Next.js Server Component with SSG & SEO Metadata.
- **Client Component**: `src/components/JobsClient.tsx` — Interactive search, filter pills, saved jobs state, modal view, and Google Jobs schema generator.
- **Data Source**: `src/data/jobsData.ts` — Curated listings for top companies hiring BCA, MCA & B.Tech freshers (e.g. TCS, Infosys, Wipro, Zoho, Accenture, startups, remote roles).

---

## ✅ Implementation Checklist

- [x] Create `docs/jobs.md` specification
- [x] Create data array `src/data/jobsData.ts` with 25+ real job & internship opportunities for BCA/MCA/B.Tech
- [x] Create client component `src/components/JobsClient.tsx`
- [x] Create static route `src/app/jobs/page.tsx` with rich SEO metadata
- [x] Add `/jobs` to top navigation dropdown & footer links on `HomeClient.tsx`
