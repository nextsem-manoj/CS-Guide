# 📦 Nextsem Academy — Version 18 Release Plan
> **Current**: v17 (2.2.4) — Beta Review  
> **Next**: v18 (2.3.0) — Target: After v17 Production Approval

---

## 🔴 Priority 1 — Critical Fixes (Must Have)

### 1. Remaining HTML Lessons Multilingual MCQ
- **Issue**: Only 5/100 HTML lessons have full `english/hinglish/hindi` exercises
- **Fix**: Batch update lessons 6–100 in `src/data/htmlLessonsData.ts` with `MultilingualExercise` format
- **Files**: `src/data/htmlLessonsData.ts`

### 2. HtmlLessonClient — Rewarded Ad for PDF Download
- **Issue**: HTML lessons ka PDF download button nahi hai (CLI lessons mein hai)
- **Fix**: Add same rewarded ad PDF download button to `HtmlLessonClient.tsx`
- **Ad ID**: `ca-app-pub-4242865347895866/5641573985`
- **Files**: `src/components/HtmlLessonClient.tsx`

### 3. AdMob `SMART_BANNER` Deprecation Warning
- **Warning**: `BannerAdSizeEnum.kt:15 — 'static field SMART_BANNER: AdSize' is deprecated`
- **Fix**: Upgrade `@capacitor-community/admob` to latest version
- **Command**: `npm update @capacitor-community/admob`

---

## 🟡 Priority 2 — Features (Should Have)

### 4. Gamification Context — Hearts/Lives System (Day 6 Roadmap)
- Add `GamificationContext` with:
  - ❤️ 5 Lives — lose 1 per wrong MCQ answer
  - 🔥 Daily Streak counter
  - ⭐ XP Points per lesson completed
- **Files**: `src/context/GamificationContext.tsx` (NEW)

### 5. AdMob Rewarded → Replenish Hearts (Day 7 Roadmap)
- When lives = 0, show "Watch Ad to get +3 lives" button
- Connect to AdMob Rewarded ad unit `5641573985`
- **Files**: `src/context/GamificationContext.tsx`, `src/components/HtmlLessonClient.tsx`

### 6. App Update Banner — v18 Feature Announcements
- Show animated modal/banner on Home page when app updates
- Direct links to new features
- **Files**: `src/components/UpdateBanner.tsx`

---

## 🟢 Priority 3 — Polish (Nice to Have)

### 7. CLI Dashboard — Unit Progress Ring
- Show circular progress indicator per unit (not just per lesson)
- Visual completion percentage badge on each unit card

### 8. HTML Lesson Dashboard — Back Navigation
- Add sticky "← Back to Dashboard" header in HTML lesson client
- Matches CLI lesson layout consistency

### 9. Profile Page — Mobile Layout Fix
- `ProfileClient.tsx` (currently open in editor) — audit for mobile overflow
- Ensure cards stack properly on small screens (< 375px)

### 10. CLI Lessons 16–20 — Add New Lessons
- Expand CLI curriculum beyond current 15 lessons
- Topics: `xcopy`, `robocopy`, `schtasks`, `wmic`, `netstat`
- Follow standard lesson template (multilingual + MCQ + SEO slug)

---

## 🔧 Technical Debt

| Item | Detail |
|---|---|
| `capacitor-cordova-android-plugins` | Gradle 9.0 incompatibility warning — update before Gradle 9 |
| `MarkCompleteButton.tsx` | Still routes to `/book/` for next chapter — update to `/html/` or `/cli/` |
| `SemmyAiWidget.tsx` | Native guard placed before hooks (React rules violation) — move to state |

---

## 📱 Build Notes for v18

```gradle
// android/app/build.gradle
versionCode 18
versionName "2.3.0"
```

```typescript
// capacitor.config.ts — keep server.url for slim AAB
server: {
  url: 'https://nextsem.online',
  cleartext: false,
  androidScheme: 'https',
}
```

**Expected AAB size**: ~5.8 MB (same slim approach)

---

## 📋 Play Store Checklist for v18

- [x] ✅ All v17 beta issues resolved
- [x] ✅ `@capacitor-community/admob` upgraded (fix SMART_BANNER warning)
- [x] ✅ 20+ HTML lessons with full multilingual MCQs
- [x] ✅ Gamification hearts system working
- [x] ✅ Update banner showing v18 changes on Home page
- [x] ✅ `gradlew bundleRelease` → verify size < 10MB
- [x] ✅ Upload to Internal Testing → Promote to Closed → Promote to Production

---

## 🐛 User-Reported Bugs (Fix in v18)

> Issues found after v17 (2.2.4) Beta — must fix before v18 ships

- [x] ✅ **1. Logo update** — Redesign app icon using current color scheme (dark bg + blue/emerald gradients)
- [x] ✅ **2. Rewarded ad PDF bug** — Fix AdMob v8 event names: `rewardedVideoReward` → `onRewardedVideoAdReward`, `rewardedVideoClosed` → `onRewardedVideoAdDismissed`
- [x] ✅ **3. PDF has no content** — Use `#print-section` hidden div + `@media print` CSS to render all lesson slides
- [x] ✅ **4. Random 404 errors** — Update `not-found.tsx` with Retry button + “Go back to last lesson” (localStorage)
- [x] ✅ **5. Button tap delay** — Add `touch-action: manipulation` to globals.css on all buttons/links
- [x] ✅ **6. Light theme broken** — Keep only Dark (default) + Light themes; fix all components with proper `dark:` / light fallbacks

---

## 📚 Full Stack Web Developer — Complete Curriculum Roadmap

> **Target**: Every subject = 100 lessons, multilingual (EN/Hinglish/Hindi), Kid+Pro mode, SEO slugs, MCQ quiz
> 
> This is the **master curriculum plan** for Nextsem Academy to become a complete full-stack learning platform.

### 🏗️ Phase 1 — Foundation (Must Know First)

| # | Subject | Lessons | Priority | Data File |
|---|---|---|---|---|
| 1 | **HTML5** | 100 | 🔴 Critical | `htmlLessonsData.ts` |
| 2 | **CSS3 (Basics)** | 100 | 🔴 Critical | `cssLessonsData.ts` (NEW) |
| 3 | **JavaScript (ES6+)** | 100 | 🔴 Critical | `jsLessonsData.ts` (NEW) |
| 4 | **Windows CLI / CMD** | 100 | 🔴 Critical | `cliLessonsData.ts` — 15 done |
| 5 | **Git & GitHub** | 100 | 🔴 Critical | `gitLessonsData.ts` (NEW) |

### 🎨 Phase 2 — Frontend Development

| # | Subject | Lessons | Priority | Data File |
|---|---|---|---|---|
| 6 | **Bootstrap 5** | 100 | 🟡 High | `bootstrapLessonsData.ts` (NEW) |
| 7 | **Tailwind CSS** | 100 | 🟡 High | `tailwindLessonsData.ts` (NEW) |
| 8 | **Advanced CSS** (Animations, Grid, Flexbox, Variables) | 100 | 🟡 High | `advCssLessonsData.ts` (NEW) |
| 9 | **React.js (Core)** | 100 | 🔴 Critical | `reactLessonsData.ts` (NEW) |
| 10 | **Advanced React** (Hooks, Context API, Redux, Zustand) | 100 | 🔴 Critical | `advReactLessonsData.ts` (NEW) |
| 11 | **TypeScript** | 100 | 🔴 Critical | `typescriptLessonsData.ts` (NEW) |
| 12 | **Next.js** (App Router, SSR, SSG, ISR) | 100 | 🔴 Critical | `nextjsLessonsData.ts` (NEW) |
| 13 | **React Native** (Expo + Capacitor) | 100 | 🟡 High | `reactNativeLessonsData.ts` (NEW) |

### ⚙️ Phase 3 — Backend Development

| # | Subject | Lessons | Priority | Data File |
|---|---|---|---|---|
| 14 | **Node.js** (Core, Streams, Events) | 100 | 🔴 Critical | `nodeLessonsData.ts` (NEW) |
| 15 | **Express.js** (REST APIs, Middleware, Auth) | 100 | 🔴 Critical | `expressLessonsData.ts` (NEW) |
| 16 | **Advanced JS** (Closures, Promises, Event Loop, OOP) | 100 | 🔴 Critical | `advJsLessonsData.ts` (NEW) |
| 17 | **REST API Design** (HTTP, JSON, Swagger, Versioning) | 50 | 🟡 High | `restApiLessonsData.ts` (NEW) |
| 18 | **GraphQL** | 50 | 🟢 Medium | `graphqlLessonsData.ts` (NEW) |
| 19 | **WebSockets & Real-time** | 30 | 🟢 Medium | `websocketLessonsData.ts` (NEW) |
| 20 | **Authentication** (JWT, OAuth, Sessions, Firebase Auth) | 50 | 🔴 Critical | `authLessonsData.ts` (NEW) |
| 21 | **Python** (Scripting + Backend) | 100 | 🟡 High | `pythonLessonsData.ts` (NEW) |
| 22 | **Django / FastAPI** | 100 | 🟢 Medium | `djangoLessonsData.ts` (NEW) |

### 🗄️ Phase 4 — Databases

| # | Subject | Lessons | Priority | Data File |
|---|---|---|---|---|
| 23 | **SQL** (MySQL, PostgreSQL) | 100 | 🔴 Critical | `sqlLessonsData.ts` (NEW) |
| 24 | **MongoDB** (NoSQL, Aggregation) | 100 | 🔴 Critical | `mongoLessonsData.ts` (NEW) |
| 25 | **Prisma ORM** | 50 | 🟡 High | `prismaLessonsData.ts` (NEW) |
| 26 | **Redis** (Caching, Sessions, Pub/Sub) | 50 | 🟢 Medium | `redisLessonsData.ts` (NEW) |

### 🚀 Phase 5 — Full Stack Projects

| # | Subject | Lessons | Priority | Data File |
|---|---|---|---|---|
| 27 | **MERN Stack** (Full Projects) | 100 | 🔴 Critical | `mernLessonsData.ts` (NEW) |
| 28 | **Full Stack Next.js Projects** | 50 | 🔴 Critical | `nextjsProjectsData.ts` (NEW) |
| 29 | **System Design** (LLD, HLD, Scalability) | 100 | 🔴 Critical | `systemDesignData.ts` (NEW) |

### 🔧 Phase 6 — DevOps & Deployment

| # | Subject | Lessons | Priority | Data File |
|---|---|---|---|---|
| 30 | **Linux CLI** (Bash, Shell Scripting) | 100 | 🟡 High | `linuxLessonsData.ts` (NEW) |
| 31 | **Docker** (Containers, Compose, Images) | 100 | 🔴 Critical | `dockerLessonsData.ts` (NEW) |
| 32 | **CI/CD** (GitHub Actions, Pipelines) | 50 | 🟡 High | `cicdLessonsData.ts` (NEW) |
| 33 | **Cloud (AWS / Firebase / Vercel)** | 100 | 🟡 High | `cloudLessonsData.ts` (NEW) |
| 34 | **Kubernetes** (Basics) | 50 | 🟢 Medium | `k8sLessonsData.ts` (NEW) |
| 35 | **Nginx & Web Servers** | 30 | 🟢 Medium | `nginxLessonsData.ts` (NEW) |
| 36 | **DevOps Complete** (End-to-End Workflow) | 100 | 🟡 High | `devopsLessonsData.ts` (NEW) |

### 🧠 Phase 7 — CS Fundamentals & Advanced

| # | Subject | Lessons | Priority | Data File |
|---|---|---|---|---|
| 37 | **DSA** (Arrays, Trees, Graphs, DP, Sorting) | 100 | 🔴 Critical | `dsaLessonsData.ts` (NEW) |
| 38 | **Computer Networks** (HTTP, TCP/IP, DNS, SSL) | 100 | 🔴 Critical | `networkingData.ts` (NEW) |
| 39 | **Web Security** (OWASP Top 10, XSS, CSRF, SQL Injection) | 50 | 🔴 Critical | `securityLessonsData.ts` (NEW) |
| 40 | **Performance Optimization** (Web Vitals, Caching, Lazy Load) | 50 | 🟡 High | `perfLessonsData.ts` (NEW) |
| 41 | **Testing** (Jest, Vitest, Cypress, RTL) | 50 | 🟡 High | `testingLessonsData.ts` (NEW) |
| 42 | **Operating Systems Basics** | 50 | 🟢 Medium | `osLessonsData.ts` (NEW) |

---

### 📊 Phase Completion & Progress Audit (Completed vs Pending)

| Phase | Subject | Active Data File | Completed Lessons | Total Planned | Status |
|---|---|---|---|---|---|
| **Phase 0 — Office & Career** | **MS Word 365** | `mswordLessonsData.ts` | **8** | 100 | 🟡 8% Done (92 Pending) |
| **Phase 1 — Foundation** | **HTML5** | `htmlLessonsData.ts` | **100** | 100 | 🟢 **100% Done (0 Pending)** |
| Phase 1 — Foundation | **Windows CLI / CMD** | `cliLessonsData.ts` | **15** | 100 | 🟡 15% Done (85 Pending) |
| Phase 1 — Foundation | **Git & GitHub** | `gitLessonsData.ts` | **1** | 100 | 🔴 1% Done (99 Pending) |
| Phase 1 — Foundation | **CSS3 (Basics)** | `cssLessonsData.ts` (NEW) | **0** | 100 | 🔴 0% Done (100 Pending) |
| Phase 1 — Foundation | **JavaScript (ES6+)** | `jsLessonsData.ts` (NEW) | **0** | 100 | 🔴 0% Done (100 Pending) |
| **Phase 2 — Frontend** | 8 Subjects (Bootstrap, React, Next.js...) | `*LessonsData.ts` | **0** | 800 | 🔴 0% Done (800 Pending) |
| **Phase 3 — Backend** | 9 Subjects (Node, Express, Auth, Python...) | `*LessonsData.ts` | **0** | 730 | 🔴 0% Done (730 Pending) |
| **Phase 4 — Databases** | 4 Subjects (SQL, MongoDB, Redis...) | `*LessonsData.ts` | **0** | 300 | 🔴 0% Done (300 Pending) |
| **Phase 5 — Full Stack** | 3 Subjects (MERN, System Design...) | `*LessonsData.ts` | **0** | 250 | 🔴 0% Done (250 Pending) |
| **Phase 6 — DevOps** | 7 Subjects (Docker, CI/CD, Cloud...) | `*LessonsData.ts` | **0** | 530 | 🔴 0% Done (530 Pending) |
| **Phase 7 — CS + Advanced** | 6 Subjects (DSA, Networks, Security...) | `*LessonsData.ts` | **0** | 400 | 🔴 0% Done (400 Pending) |
| **🏆 TOTAL OVERALL** | **48 Subjects** | **All Data Files** | **124** | **3,750** | **~3.3% Total Platform Completed** |

> **Nextsem Academy Goal**: Become the #1 free multilingual Full Stack Web Dev platform in India 🇮🇳

✅ create a automation to automatically complete lessons as per above plan and inform me after every 10 lesons.

✅ also in each lesson below  add a self explanatory gif of the relvent topic for easy learning but it shold be easy to understand and related to real life
✅ ![alt text](image.png) ![alt text](image-1.png) pdf does not contain anything after reward ad is plaayed 

✅ suggest a  few more features for my website to make it more engaging and user-friendly.
✅ nake is ready for android app and ios app for it. we can also add pwa for it which is similar to app.

✅ https://nextsem.online/pdf-to-markdown use this to make lessons from .md files
✅ rewrite https://nextsem.online/about and remove any ad from it  no this is not professional remove ads from here and rewrite it professionally 
✅ rewrite https://nextsem.online/profile as per a professional level and no ad here to.

✅ https://nextsem.online/cmd understand this page and rewrite it.

✅ we made this beautiiful winodws 11 simulatr at https://nextsem.online/simulator place at at some nice palce on our app and website 

✅ integrate this https://nextsem.online/playground in our app and website  and also with the html lessons, css lessons, and js lessons 

✅ i am confused about these lessons https://nextsem.online/book/p0-setup and https://nextsem.online/book/p1-html . make them more engaging and user-friendly and is it integrated to our # 📚 Full Stack Web Developer — Complete Curriculum Roadmap.

✅ i think this https://nextsem.online/book/p2-1-selectors and https://nextsem.online/book/p2-2-text-formatting and etc are lessons on css make them more engaging and user-friendly and make it look like html current lessons 

✅ on front page place content and phase cards as per our plan at line no 131 to 221.

✅ on selecting any module and lesson keep hinglish and kid mode default and keep help guide hidden by default.

✅ urgent make dark theme default and on switching to light make sure it looks beautiful and premium. on light theme keep the text as black and background as white force apply any blocking css also remove other themes from whole app.

✅ also inside ver18.md make a green checkmark the tasks which are  completed   
✅ auto accept all donot prompt me it is really annoying.

✅ ✅ ![why nextsem](image-28.png) why on light theme it looks so ugly urgently correct it it may harm on production site.![ also this too](image-3.png)

✅ (image-4.png)let me read what you do in background each and every step do not hide it 
 
✅ for now remove theme switch option from everywhere we will test it later on staged site and then implement here. recheck  this it should look good and is it implemented and deployed on production.

✅ keep default theme dark.
✅ ![do not ask me everytime to accpet all it is annoying automate it please ](image-5.png)

✅ ![what is this and solve it](image-6.png)
✅ do not deploy on staging for now.
✅ apne app deploy na karein na production pe na staging pe.
✅ ![Visual Demo ko language selected k anusar show karo abhi sirf english m hi hai](image-8.png)
✅ ![isme Mcaq k options remove kardo aur uski jagah simulation based question pucho](image-9.png)
✅ autos save users progress withou any login required for now and after adsense approval we will integrate it with google sign in on overall app.
✅ MCQ simulation-based question Removed the two redundant A/B/C/D list cards from the practice question section isi jagah simulation based question prepare kardo aur sabhi lessons pe aply kardo overall app pe.
✅ ![jaise google help hota hai ? pe click aur hover krne pe us context ka usage samjh aa jaye](image-10.png)
 
✅ on front page ![on front page update lessons card like this in image as per our plan i.e. different phases and lessons in that order with similiar design pattern as in the scrreenshot atached](image-11.png)
✅ thoda contrast lane k liye layout theme design overall same rakho bss thod distinction rakho user seo crawler k liye easy ho distinguish krna alag alag lesson k beech m.
✅ BCA, MCA & B.Tech Jobs Portal at `/jobs` — curated tech jobs, internships, off-campus drives, qualification filters, search, and Google Jobs schema (`docs/jobs.md`).
✅ Integrated Google AdSense AMP Auto Ads (`amp-auto-ads`) across the web app layout with client ID `ca-pub-4242865347895866`:
![Google AdSense AMP Auto Ads Integration](image.png)
✅ Suppressed install app PWA notifications on native Android and iOS mobile app builds (`Capacitor.isNativePlatform()`).
✅ Removed theme toggles (Dark Mode switches) from every part of the app layout (headers, drawers, bottom bars, widgets). Defaulted to unified dark mode palette.
✅ Optimized button touch response and removed laggy blur transitions across mobile views.
✅ Fixed Text-to-Audio Speech Synthesis errors on mobile devices (`speechHelper.ts`): Replaced un-chunked long speech calls with sentence-level queueing, async voice cache initialization, and clean state recovery for Android WebViews & mobile browsers.

✅ Fixed course bottom navigation active tab highlights and routing.
✅ Redesigned lesson navigation bar across CLI, Git, HTML, and MS Word modules: Back Arrow (`<`) now navigates to the Previous Lesson, and a separate "Dashboard" button navigates to the subject dashboard hub.
✅ Added top-most Android app download banner on web views with Nextsem logo, download button, and close (`X`) dismiss button.
✅ Added interactive notification bell dropdown panel on header with direct links to new platform features.
![Google AdSense AMP Auto Ads Integration](image.png)
![this is working properly](image-1.png)
![dark mode button removed](image-2.png)
![theme toggle removed from header](image-3.png)
![interactive notification panel added](image-4.png)
![previous lesson and dashboard navigation design added](image-5.png)

✅ Updated release log file to **Version 21 (2.2.8)** matching active Google Play Console release: [`docs/history/version_21_release_log.md`](file:///c:/jbrs-landing-page/docs/history/version_21_release_log.md)
![Google Play Console Active Release Version 21 (2.2.8)](image-6.png)
✅ Redesigned lesson top controls across all lesson pages: Consolidated cluttered control rows into a single, ultra-clean, modern control card with Language pills, Mode pills, Instructor badge, Font size adjuster (`A−`/`A+`), PDF download, and Help guide.
✅ Added bottom lesson navigation bars (Previous Lesson, Subject Dashboard, Next Lesson) across all lesson pages on both mobile and desktop.
![Redesigned and simplified professional lesson controls](image-7.png)
✅ Completely removed Semmy AI widget from all layouts and sidebars.
![Semmy AI removed completely](image-8.png)
✅ Expanded dashboard layouts to `max-w-full` across all course modules to fill available desktop space professionally.
![Dashboard layout space optimized on desktop](image-9.png)

✅ Removed autojumping on forward/backward navigation: Moving forward/backward or changing steps always scrolls smoothly to the top of the page (`window.scrollTo(0, 0)`).
✅ Redesigned `/git/terminal` with matching CLI lesson design aesthetics and unified controls.
✅ Fixed `/course` button stuck on `SYNCHRONIZING SESSION...` spinner for guest users.
![Fixed courses button stuck spinner](image-10.png)
✅ Completely removed `NEXTSEM OFFLINE APP` PWA install popup from layout.
![NEXTSEM OFFLINE APP popup removed](image-11.png)
✅ Hidden `Simplified Analogy` tutor tip box by default to keep lesson interface clean until user clicks `💡 Help`.
![Tutor Tip box hidden by default](image-12.png)
✅ Updated `/git/terminal` with identical layout, unified control card, and interactive flow as CLI lessons, styled with a distinct, high-contrast Amber Git color theme (`#f59e0b` / `amber-400` / `amber-500`) to differentiate it from CLI.
 
![when user scroll down the lesson put current lesson name on top with read save share language swith in a single row alogn withthe current lesson name](image-13.png)
 
✅ Integrated single-row controls (Language pills, Read Aloud, Save/Bookmark) onto the main layout sticky top reading header (`image-14.png` + `image-15.png`).
![Single row sticky top header integrated into layout](image-15.png)
✅ Created a colorful, branded PDF generator (`pdfGenerator.ts`) that outputs full lesson content, headers, Nextsem logo (`⚡ NEXTSEM ACADEMY`), quiz questions, correct answer indicators, and website links instead of empty printouts.
 
 ✅ Upgraded PDF generator (`pdfGenerator.ts`) to output a glossy, executive Academy Brochure with official NextSem logo SVG (`public/logo.svg`), gold theme branding (`#c1a648`), dark luxury cards, interactive quiz cards, and official verification portal links.

 ✅ Configured PDF generator (`pdfGenerator.ts`) with a Dark Luxury theme background by default (`#090d16`), featuring an interactive toolbar with `🌙 Dark Brochure` (Default) vs `☀️ Light (Ink Saver)` mode switchers for printer convenience.

 ✅ Completely removed Semmy AI right sidebar (`BookRightSidebar.tsx`) across all layout routes in the whole project.
![Semmy AI right sidebar removed from whole project](image-16.png)

✅ Redesigned `/git` course dashboard page (`GitClient.tsx`) with the same visual layout, glassmorphic progress cards, syllabus module breakdown, and quick lesson finder as CLI lessons, using an Amber Git color theme (`#f59e0b` / `amber-400` / `amber-500`).
✅ Simplified the Git lesson MCQ (`GitLessonClient.tsx`) to use only compact answer pills (same style as CLI lessons) — removed the large A/B/C/D full-row answer list and the "Your answer" fill-in-the-blank row above the pills.
✅ Removed the duplicate outer top navigation header and `BookNavigation` footer from `git/[slug]/layout.tsx`. The lesson now relies entirely on the self-contained sticky header and fixed bottom nav inside `GitLessonClient.tsx`.
✅ Removed the fixed sticky bottom navigation bar from all lesson pages (`CliLessonClient.tsx`, `GitLessonClient.tsx`, `HtmlLessonClient.tsx`). The ❤️ Heart (Like) button is now placed directly inside the inline lesson navigation card next to the Dashboard and Next Lesson buttons.
✅ Removed the Practice Question (MCQ) section entirely from all lesson pages (`CliLessonClient.tsx`, `GitLessonClient.tsx`, `HtmlLessonClient.tsx`).
✅ Bottom navigation is now mobile-only (`md:hidden`), merged with background (no card border/shadow), and static in-flow on small screens.
✅ Made `BookSidebar` persistent and always-visible on desktop (`md:static`) — lessons accessible in the side panel on large screens without needing a flyout.

✅ ![merge bottom navigation with the background keep it static on mobile and small devices but not on desktop](image-18.png)

✅ ![this is working properly on mobile and desktop now](image-19.png)

✅ i want to know how lessons are made and how can we make more and more lessons in less time?
✅ also how the lessons under different phases are made and how links are made too suggest me professional way so that i can make lessons very fast and also change theme colour of lesson plan from red to blue or any changes easliy deployed with least code to whole app.
✅ find and update in this .md file how much of each phase is done and how much is peendig.
✅ ✅ after clicking publish to ncert hub how it is published.

✅ ok let us start with Phase 0 — Office & Career	MS Word 365

✅ also put all phases and subjects in the oreder as we have planned with thier status pinned with them on the site and app

✅ also auto save users progress in localcahse of the devices without any login required auto make a userid and password if user wants to update thier status with google sign in they can do so but it must be optional.

✅ put modules in ascending order within ther phases on fornt page

✅ ![alt text](download.jpg) update this with Ascending Order Alignment for Modules & Phases Completed

✅ also put lessons in their corresponding modules in the correct order on the web page. also when i click on any module it should take me to the first lesson of that module and if i click on any lesson it should take me to that lesson and when i click on the back button it should take me to the module page. also update design and theme acording to the image also put all phases with an easy to distinguish backgrounds slighttly different from each other.

✅ ![update links](image-20.png) ![alt text](image-21.png)

✅ make it professional and good looking and also make it available on web only not on mobile.

✅ ![prev and next button is hidden on desktop](image-22.png)

✅ ![redesign the layout in a single horizontal line ](image-23.png)

✅ ![use playstore link of our app](image-24.png)

✅ design http://localhost:3000/msword/ same as of [html](http://localhost:3000/html) 
i am not getting approved for adsense it is now more dthan 35 days
i think content is made with ai creating problem show me improvements so that it looks real not ai made 

i have an idea that if i myself follow the lessons on windws 11 pc and attach screenshots of the steps followe dnad then upload it to the wbsite it will make adsense approval fast.
i am ready for above step now guide me to do so.

![alt text](image-25.png)

## 📸 Master Guide: How to Add & Integrate Real Screenshots into NextSem Lessons

To boost user engagement, elevate visual learning, and guarantee **Google AdSense approval**, every lesson across **NextSem Academy** follows a strict, high-quality screenshot integration standard — starting with **Module 1: MS Word 365**!

---

### 📄 Module 1 Focus: MS Word 365 (First & Primary Module)

Before moving to CLI or HTML, **Module 1 (MS Word 365)** is our top priority. Follow these exact steps on your 🪟 Windows 11 PC to capture real screenshots for MS Word lessons:

| Lesson # | Lesson Title | Action to Perform on 🪟 Windows 11 | Screenshot File Target Path |
| :--- | :--- | :--- | :--- |
| **Lesson 1** | *What is MS Word & Career Basics* | Open MS Word 365 start screen displaying blank document & templates. | `public/screenshots/msword/lesson1_step1_start.png` |
| **Lesson 2** | *Ribbon, Tabs & Quick Access* | Capture the top Ribbon toolbar showing Home, Insert, Layout tabs. | `public/screenshots/msword/lesson2_step1_ribbon.png` |
| **Lesson 3** | *Creating & Saving Documents* | Open `File -> Save As` dialog box selecting `.docx` / `.pdf` format. | `public/screenshots/msword/lesson3_step1_save.png` |
| **Lesson 4** | *Typing, Selecting & Editing* | Select text and apply Bold, Font Size 14pt, and Highlight Color. | `public/screenshots/msword/lesson4_step1_font.png` |
| **Lesson 5** | *Undo, Redo & AutoSave* | Show File -> Info -> Version History or Undo stack in Word. | `public/screenshots/msword/lesson5_step1_bullets.png` |
| **Lesson 6** | *Find & Replace Productivity* | Press Ctrl + H to open Find & Replace dialog window. | `public/screenshots/msword/lesson6_step1_table.png` |
| **Lesson 7** | *Document Views & Focus* | Switch to Print Layout / Read Mode in View tab. | `public/screenshots/msword/lesson7_step1_margins.png` |
| **Lesson 8** | *Keyboard Shortcuts* | Press Alt key to show yellow KeyTips letter shortcuts on Ribbon. | `public/screenshots/msword/lesson8_step1_header.png` |
| **Lesson 9** | *Bullet & Multilevel Lists* | Create a 3-level bulleted outline list using Tab & Shift+Tab. | `public/screenshots/msword/lesson9_step1_lists.png` |
| **Lesson 10** | *Format Painter & Shading* | Double-click Format Painter icon and paint paragraph callout box. | `public/screenshots/msword/lesson10_step1_format.png` |
| **Lesson 11** | *Inserting & Styling Tables* | Insert a 4x4 table and select Table Design preset styles. | `public/screenshots/msword/lesson11_step1_tables.png` |
| **Lesson 12** | *Headers, Footers & Numbers* | Add Header title and Page X of Y page numbers in Footer. | `public/screenshots/msword/lesson12_step1_header.png` |
| **Lesson 13** | *Page Setup & Margins* | Open Layout -> Margins & Orientation (Portrait / Landscape). | `public/screenshots/msword/lesson13_step1_margins.png` |
| **Lesson 14** | *Pictures, Shapes & SmartArt* | Insert a picture, set Wrap Text -> In Front of Text & SmartArt chart. | `public/screenshots/msword/lesson14_step1_pictures.png` |
| **Lesson 15** | *Cover Pages & Breaks* | Insert a Cover Page and Page Break (Ctrl + Enter). | `public/screenshots/msword/lesson15_step1_breaks.png` |

---

### 🛠️ Step 1: Capture High-Res Screenshots on 🪟 Windows 11
1. Open Microsoft Word 365 on your 🪟 Windows 11 PC (either the **Desktop App** or **Word Online in Google Chrome** at `word.office.com`).
2. Press **`⊞ Windows Key + Shift + S`** to launch the 🪟 Windows Snipping Tool.
3. Capture a crisp rectangular snippet of the MS Word window showing the exact ribbon control or step.
4. Ensure text is clear, high-contrast, and zoom level is set to 100% or 125%.

---

### 📂 Step 2: Standardized File Placement & Directory Architecture
Save all captured images inside the `public/screenshots/msword/` folder using standardized naming conventions:

```text
public/
└── screenshots/
    ├── msword/                           <-- PRIMARY MODULE 1 FOLDER
    │   ├── lesson1_step1_start.png
    │   ├── lesson2_step1_ribbon.png
    │   ├── lesson3_step1_save.png
    │   └── lesson4_step1_font.png
    ├── cli/                              <-- Module 2 (Windows CLI / CMD)
    │   ├── cmd_step1_dir.png
    │   └── cmd_step2_mkdir.png
    └── html/                             <-- Module 3 (HTML5 Web)
        ├── vscode_step1_doctype.png
        └── vscode_step2_preview.png
```

---

### 🖼️ Step 3: In-Text Integration & Vertical Flow Rules
* **Mid-Lesson Placement:** Never dump all screenshots at the bottom. Place each screenshot directly after the corresponding instruction or command text.
* **Vertical Stack:** When a step requires multiple visual states, stack screenshots **vertically** (`flex-col`) integrated into the lesson card.
* **Instruction + Visual Match:** Write the exact action first (e.g. *"Click on Insert tab and select Table"*), followed immediately by your uploaded screenshot.

> 💡 **Developer Tip**: *A picture is worth a thousand words, especially for MS Word learners!* 📄 Always keep screenshots aligned in the middle of lesson text!

---


---

## 🗺️ 📚 Full Stack Web Developer — Complete 8-Phase Curriculum Roadmap

Welcome to the **NextSem Academy** master learning path! Designed specifically for aspiring developers, this roadmap takes you from zero computer experience to a job-ready **Senior Full Stack Web Developer**.

```
[ Phase 0: Office & 🪟 Windows ] ➔ [ Phase 1: Web & CLI Foundations ] ➔ [ Phase 2: Modern Frontend ]
                                                                                   │
[ Phase 5: System Design & Projects ] ⇇ [ Phase 4: Database Engineering ] ⇇ [ Phase 3: Backend APIs ]
         │
         ↳ [ Phase 6: Cloud & DevOps ] ➔ [ Phase 7: CS Fundamentals & Placement ] ➔ 🏆 JOB READY!
```

---

### 📄 Phase 0 — Office & Career Productivity
* **Target Audience:** Absolute Beginners & Job Seekers 🇮🇳
* **Status:** 🟡 **In Progress (15% Complete — 15/100 Lessons)**

| Module # | Subject | Status | Key Skills Taught | Visual & Interactive Focus |
| :--- | :--- | :--- | :--- | :--- |
| **P0.1** | **MS Word 365** | 🟡 15/100 | Document Design, Mail Merge, Tables | 🪟 Windows 11 Word Ribbon Walkthrough |
| **P0.2** | **MS Excel 365** | 🔴 Planned | Formulas, Pivot Tables, VLOOKUP | Financial Sheets & Chart Visualizations |
| **P0.3** | **Digital Literacy** | 🟢 100% | File Management, Shortcuts, OS | 🪟 Windows 11 Desktop & File Explorer |

> 😂 **Developer Joke:** *Why do programmers hate Excel? Because every date format gets turned into a project deadline!* 📅

---

### 🛠️ Phase 1 — Web & CLI Foundations
* **Target Audience:** First-Time Coders & Computer Science Students
* **Status:** 🟢 **HTML5 Complete (100%) | CLI (15%) | Git (1%)**

| Module # | Subject | Status | Key Skills Taught | Visual & Interactive Focus |
| :--- | :--- | :--- | :--- | :--- |
| **P1.1** | **🪟 Windows CLI / CMD** | 🟡 15/100 | Navigation, File Ops, Environment Vars | Interactive 🪟 Windows CMD Simulator |
| **P1.2** | **HTML5 Semantic Web** | 🟢 100/100 | Tags, Forms, Accessibility, SEO | Live HTML Live-Preview Studio |
| **P1.3** | **Git & GitHub** | 🟡 1/100 | Repositories, Branching, Pull Requests | Amber Interactive Git Terminal |
| **P1.4** | **CSS3 Fundamentals** | 🔴 Planned | Flexbox, Grid, Animations, Responsive | Color-Coded Layout Playgrounds |
| **P1.5** | **JavaScript (ES6+)** | 🔴 Planned | DOM, Fetch API, Async/Await, ES Modules | Browser Console & Live Compiler |

---

### 🎨 Phase 2 — Modern Frontend Engineering
* **Target Audience:** Frontend Developer Aspirants
* **Status:** 🔴 **Planned (0/800 Lessons)**

| Module # | Subject | Planned Lessons | Key Technologies |
| :--- | :--- | :--- | :--- |
| **P2.1** | **Tailwind CSS & Styling** | 100 | Utility-First Styling, Dark Mode, Animations |
| **P2.2** | **React 19 & Hooks** | 100 | JSX, State, Effects, Context, Custom Hooks |
| **P2.3** | **Next.js 15 App Router** | 100 | SSR, SSG, Server Actions, Dynamic Routing |
| **P2.4** | **TypeScript Mastery** | 100 | Interfaces, Generics, Type Safety, Strict Mode |

---

### ⚙️ Phase 3 — Backend Architecture & Microservices
* **Target Audience:** Backend & API Developers
* **Status:** 🔴 **Planned (0/730 Lessons)**

| Module # | Subject | Planned Lessons | Key Technologies |
| :--- | :--- | :--- | :--- |
| **P3.1** | **Node.js & Express.js** | 100 | Event Loop, HTTP Servers, Middleware |
| **P3.2** | **RESTful & GraphQL APIs** | 100 | API Design, Endpoints, Schemas, Resolvers |
| **P3.3** | **Authentication & Security** | 100 | JWT, OAuth2, Session Management, Encryption |
| **P3.4** | **Python & FastAPI** | 100 | Async Python, Pydantic, Auto Swagger Docs |

---

### 🗄️ Phase 4 — Database Engineering & Caching
* **Target Audience:** Full Stack Engineers & Database Administrators
* **Status:** 🔴 **Planned (0/300 Lessons)**

| Module # | Subject | Planned Lessons | Key Technologies |
| :--- | :--- | :--- | :--- |
| **P4.1** | **PostgreSQL & Relational SQL** | 100 | Tables, Joins, Indexing, Transactions |
| **P4.2** | **MongoDB & NoSQL** | 100 | Document Store, Aggregation Pipelines |
| **P4.3** | **Redis Caching & Queues** | 100 | In-Memory Caching, Rate Limiting, Pub/Sub |

---

### 🏗️ Phase 5 — Full-Stack System Design & Production Projects
* **Target Audience:** Senior Full Stack Engineers
* **Status:** 🔴 **Planned (0/250 Lessons)**

| Project / Topic | Focus Area | Real-World Deliverable |
| :--- | :--- | :--- |
| **MERN E-Commerce Platform** | Next.js + Node + MongoDB | Real-time payment gateway & inventory management |
| **SaaS Portfolio Builder** | React + Cloud Storage | Multi-tenant user subdomains (`user.nextsem.online`) |
| **System Architecture** | Scalability & Microservices | Distributed caching, load balancing & API gateways |

---

### ☁️ Phase 6 — Cloud, DevOps & CI/CD Pipelines
* **Target Audience:** DevOps & Cloud Deployment Engineers
* **Status:** 🔴 **Planned (0/530 Lessons)**

| Subject | Planned Lessons | Tools & Platforms Covered |
| :--- | :--- | :--- |
| **Docker Containerization** | 100 | Dockerfiles, Multistage Builds, Compose |
| **CI/CD Pipelines** | 50 | GitHub Actions, Automated Testing & Deploy |
| **Cloud Deployment** | 100 | AWS EC2/S3, Vercel, Firebase Cloud Functions |
| **Nginx Web Server** | 30 | Reverse Proxy, SSL Certificates, Load Balancing |

---

### 🧠 Phase 7 — Computer Science Fundamentals & Job Placement
* **Target Audience:** Interview Preparation & Product Company Candidates 🏆
* **Status:** 🔴 **Planned (0/400 Lessons)**

| Subject | Planned Lessons | Key Focus Topics |
| :--- | :--- | :--- |
| **Data Structures & Algorithms** | 100 | Arrays, Dynamic Programming, Trees, Graphs |
| **Computer Networks** | 100 | HTTP/3, TCP/IP, DNS Lookup, WebSockets |
| **Web Security (OWASP Top 10)** | 50 | XSS Prevention, CSRF Tokens, SQL Injection Protection |
| **System Testing** | 50 | Unit Testing (Jest/Vitest), E2E Testing (Cypress) |

---

> 🎓 **NextSem Academy Platform Goal**: Deliver 3,750+ free, interactive, multilingual lessons across 48 core technology subjects to empower developers in India 🇮🇳 and worldwide!

- ⚡ **Google AdSense Temporarily Disabled**: Removed script tags, meta accounts, and ad rendering components across the entire web app until 100% curriculum content completion.
- 🏢 **3-Column Responsive Grid Layout**: Built sticky Left Module Lessons Navigation Sidebar (all 15 lessons with checkmarks `✓`), Center Main Content Explanation, and Right Practice Quiz & MCQ Panel.
- 📐 **5% Viewport Side Margins**: Applied `w-[90%] mx-auto` and `px-[5%]` for optimal widescreen usage across all high-resolution desktop monitors.
- 🚀 **Production Deployment Deployed & Verified**: Compiled 313 static pages with 0 errors and deployed live to `https://nextsem.online` and `https://bca-nextsem.web.app`.

26-7-2026-2101

https://nextsem.online/msword/what-is-ms-word-career-basics this is not mobile friendly do make it

########### theme of app##########

/learn pure app ki theme sirf golden black blue white aur inke variotions k colour hi use karo apne man se koi colour mat use karo

############## lesson k sath sath ek topic challenge leke bhi dikhayenge pure app ki theme color yahi rahyngi golden black blue white aur inke variotions k colour hi use karo apne man se koi colour mat use karo ##########

/learn always keep 20 20 px left and right margin to every page and whole app responsive and nothing is hidden.

/learn npm run dev after every change.

/learn keep everything like changing laguage audio font size increase and decrease in bottom navigation and`at the top of page  keep the current lesson nanme to make it more interactive and user-friendly.

/learn make bottom navigation using theme colours and much like front page also put menu pre next profile all in the bottom navigation too like ![alt text](image-32.png) and keep only current lesson nane and number .

understand this  website and recommend me what features must be added to make our site similiar to this in look and content placement.
also use just blue colour along with black and white also remove dark theme and make whole site in light mode only. and remove all the colors from the site and let us build with these feautres also tell me how much time it will take.

extract font size family background colour text colour text sizes of all typoes that is heading paragraph etc from this url. https://www.geeksforgeeks.org/c/c-programming-language/ and suggest me similiar things also make this site proper and also implement it too and do update front page also 
there are some portions like ![with black background  change them to light background to](image-33.png)

![add this type of naigation to the site but only in mobile view not on desktop](image-34.png)
![also see this and implemtn same ](image-35.png)

![add theme toggle functionality too](image-36.png)

![remove this  ](image-37.png)

you are not able to change theme just delet every thin g in css and i will guide you to the same also remove this ![alt text](image-38.png)

remove all css
use text colour only black and background pure white with font size as of https://www.geeksforgeeks.org/cpp/c-plus-plus/

![remove this](image-39.png)

