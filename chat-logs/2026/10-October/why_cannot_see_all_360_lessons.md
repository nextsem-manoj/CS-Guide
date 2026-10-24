# Chat Log: Why I Cannot See All 360 Lessons (Architecture & Multi-Sprint Update)

- **Date**: 24 October 2026
- **Author**: Er. Manoj Kumar
- **User Query**: *"why i cannot see all 360 lessons"* (with screenshot of home sidebar showing only `Sprint 1: Web Foundation Days 1-10`).

---

## 🔍 Root Cause Analysis

1. **Architecture Difference (Home Studio vs Full 360 Practical Portal)**:
   - The Home page ([`HomeClient.tsx`](file:///c:/Users/Manoj/Nextsem%20Repositories/CS-Guide/src/app/HomeClient.tsx)) is designed as an interactive daily coding studio.
   - Previously, the left syllabus sidebar only had a hardcoded `Sprint 1: Web Foundation (Days 1–10)` container.
   - Sprints 2–5 (Days 11–50) were not linked or exposed in the sidebar.
   - Semesters 2–6 only listed theoretical subject courses and did not show their planned practical sprints.
2. **Current Implementation vs Full 360-Day Roadmap**:
   - The complete BCA curriculum spans **3 Years / 6 Semesters / 360 Days** (12 Sprints of 30 days each).
   - **Days 1 to 50** are 100% fully implemented with interactive line-by-line coding labs, regex auto-validators, VS Code setup, GitHub workflows, and technical viva checks.
   - Sprints 6 to 12 (Days 51–360) are mapped across Semesters 2–6 as part of the full university degree roadmap.
3. **Dedicated Portal Location**:
   - The complete 360-Day portal is located at [`/bca/practical`](file:///c:/Users/Manoj/Nextsem%20Repositories/CS-Guide/src/app/bca/practical/page.tsx) ([`BcaPracticalHubClient.tsx`](file:///c:/Users/Manoj/Nextsem%20Repositories/CS-Guide/src/app/bca/practical/BcaPracticalHubClient.tsx)).
   - In that portal, the filter was previously labeled "All 30 Days" and only went up to Day 30.

---

## 🛠️ Solutions Implemented

1. **[`HomeClient.tsx`](file:///c:/Users/Manoj/Nextsem%20Repositories/CS-Guide/src/app/HomeClient.tsx)**:
   - Replaced hardcoded `SPRINT_1_DAYS` with `ACTIVE_SPRINTS` (Sprints 1–5 covering all 50 live days) and `ALL_ACTIVE_DAYS`.
   - Added a prominent **"360 Days Practical Portal"** gateway card at the top of the Syllabus sidebar.
   - Added multi-sprint collapsible accordions under `Semester 1: Foundation` for all 5 active sprints:
     - `Sprint 1: Web Foundation (Days 1–10)`
     - `Sprint 2: Modern CSS & Grid (Days 11–20)`
     - `Sprint 3: JavaScript Core (Days 21–30)`
     - `Sprint 4: DOM & Events (Days 31–40)`
     - `Sprint 5: APIs & SPA Studio (Days 41–50)`
     - Direct jump link: `View All 360 Days (Sprints 1–12) »`
   - Added planned practical roadmap sections under Semesters 2 to 6.
   - Upgraded both desktop and mobile top day strips with a Sprint selector (`Sprint 1`, `Sprint 2`, `Sprint 3`, `Sprint 4`, `Sprint 5`) and `All 360 Days »` button.

2. **[`BcaPracticalHubClient.tsx`](file:///c:/Users/Manoj/Nextsem%20Repositories/CS-Guide/src/app/bca/practical/BcaPracticalHubClient.tsx)**:
   - Updated `dayFilter` to support all 50 live days: `All Live Days (1–50)`, `1–10`, `11–20`, `21–30`, `31–40`, and `41–50`.
   - Added the comprehensive **"360-Day Degree Progression Roadmap Card (Days 51–360)"** detailing Sprints 6–12 across all 6 semesters.
