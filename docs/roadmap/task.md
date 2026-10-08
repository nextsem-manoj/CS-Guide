# 🚀 BCA Practical Learning Portal & Platform Roadmap

> **Nextsem Academy Development Roadmap**
> Primary Goal: Convert complete BCA practical teaching system into a structured, practical-first learning platform across all 3 years (6 Semesters) and 4 Career Specializations.
> Pipeline: **Foundation ➔ Specialization ➔ Projects ➔ GitHub ➔ Portfolio ➔ Job Preparation**

---

## 📌 Active Status & Immediate Next Step
- **Current Milestone**: Phase 1 (Step 1 Complete ✅)
- **Immediate Next Step (Auto-Suggest for Antigravity IDE)**:
  👉 **Step 2**: Author & integrate **Days 11–20** of the 90-Day Practical Sprint in `src/data/bcaPracticalData.ts` (CSS Box Model, Flexbox, Grid, Positioning, Cards & Responsive Mini Project) + Connect persistent student profile progress & track choice in `src/app/profile`.

---

## 🏗️ Master Phase Breakdown

### 🟩 Phase 1: Core Portal Architecture & Sprint 1 Foundation (In Progress)
- [x] **Step 1: Data Model & Hub Launch**:
  - Created `src/data/bcaPracticalData.ts` with 4 Career Specialization Tracks, 3-Year/6-Semester breakdown, 90-Day Sprint structure, and comprehensive Days 1–10 lessons.
  - Built Practical Hub Dashboard (`src/app/bca/practical/page.tsx` + `BcaPracticalHubClient.tsx`).
  - Built Universal Practical Lesson Template (`src/app/bca/practical/[daySlug]/page.tsx` + `BcaPracticalLessonClient.tsx`) with 7-step practical flow and in-browser coding runner (`TaskBasedCodingLab.tsx`).
  - Integrated with `BcaHeaderNav.tsx`, `/bca` hero, and `sitemap.ts`.
- [ ] **Step 2: Days 11–20 (CSS Layouts & Mini Project)**:
  - Day 11 (Box Model), Day 12 (Width/Height/Borders), Day 13 (Display), Day 14 (Flexbox), Day 15 (Grid), Day 16 (Positioning), Day 17 (Navbars), Day 18 (Cards), Day 19 (Responsive Design), Day 20 (Responsive College Website Mini Project).
- [ ] **Step 3: Days 21–30 (JavaScript Essentials & Interactive Portal)**:
  - Days 21–30 JavaScript fundamentals (Variables, Conditions, Loops, Functions, Arrays, Objects, DOM Selection, Events, Day 30 Interactive Student Portal Mini Project).

### 🟦 Phase 2: Student Accounts, Scoped Progress & Assignment Submission
- [ ] Connect Firebase Google Auth to save student practical completions under `users_progress/{userId}/practical_days`.
- [ ] Build in-app assignment upload / GitHub repository link submission box.
- [ ] LocalStorage + Firestore auto-sync with offline-first persistence.

### 🟨 Phase 3: Career Specialization Tracks (Year 2 & 3)
- [ ] Track 1: Web / Full-Stack Development (HTML/CSS/JS ➔ React ➔ Node ➔ Express ➔ MySQL).
- [ ] Track 2: Software / Programming (C ➔ C++ ➔ OOP ➔ Data Structures & Algorithms).
- [ ] Track 3: Data / AI (Python ➔ SQL ➔ Pandas ➔ Data Visualization ➔ ML Basics).
- [ ] Track 4: IT / Networking / Cloud (Linux ➔ Networking Labs ➔ Wireshark ➔ Cloud VMs).

### 🟪 Phase 4: GitHub Repository & Portfolio System
- [ ] Student GitHub Profile linker (`githubUsername`).
- [ ] Automated repo structure generator for `html-css-projects`, `javascript-projects`, `c-cpp-programs`, `data-structures`, etc.
- [ ] Interactive Git Commit checklist for each practical lesson.

### 🟧 Phase 5: Teacher / Admin Dashboard & Assessment Scoring
- [ ] Teacher view: Monitor student batches, identify students falling behind, view assignment submissions.
- [ ] Scoring Rubric Calculator:
  - Code Quality (20%)
  - Working Project (30%)
  - Git/GitHub (20%)
  - Documentation (10%)
  - Debugging (10%)
  - Viva Check (10%)

### 🟥 Phase 6: Job Readiness, Portfolio & Technical Viva Defense
- [ ] Dynamic Job Readiness Score calculator (0–100%).
- [ ] Interactive Resume Builder tailored for BCA freshers.
- [ ] Mock technical interview & viva simulation questions.
