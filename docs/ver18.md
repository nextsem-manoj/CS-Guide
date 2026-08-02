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

- [ ] All v17 beta issues resolved
- [ ] `@capacitor-community/admob` upgraded (fix SMART_BANNER warning)
- [ ] 20+ HTML lessons with full multilingual MCQs
- [ ] Gamification hearts system working
- [ ] Update banner showing v18 changes on Home page
- [ ] `gradlew bundleRelease` → verify size < 10MB
- [ ] Upload to Internal Testing → Promote to Closed → Promote to Production

---

## 🐛 User-Reported Bugs (Fix in v18)

> Issues found after v17 (2.2.4) Beta — must fix before v18 ships

- [ ] **1. Logo update** — Redesign app icon using current color scheme (dark bg + blue/emerald gradients)
- [ ] **2. Rewarded ad PDF bug** — Fix AdMob v8 event names: `rewardedVideoReward` → `onRewardedVideoAdReward`, `rewardedVideoClosed` → `onRewardedVideoAdDismissed`
- [ ] **3. PDF has no content** — Use `#print-section` hidden div + `@media print` CSS to render all lesson slides
- [ ] **4. Random 404 errors** — Update `not-found.tsx` with Retry button + “Go back to last lesson” (localStorage)
- [ ] **5. Button tap delay** — Add `touch-action: manipulation` to globals.css on all buttons/links
- [ ] **6. Light theme broken** — Keep only Dark (default) + Light themes; fix all components with proper `dark:` / light fallbacks

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

### 📊 Total Curriculum Overview *(Updated — see Phase 0 section above for full table)*

| Phase | Subjects | Total Lessons |
|---|---|---|
| **Phase 0 — Office & Career** | 6 subjects | ~240 lessons |
| Phase 1 — Foundation | 5 subjects | ~500 lessons |
| Phase 2 — Frontend | 8 subjects | ~800 lessons |
| Phase 3 — Backend | 9 subjects | ~730 lessons |
| Phase 4 — Databases | 4 subjects | ~300 lessons |
| Phase 5 — Full Stack | 3 subjects | ~250 lessons |
| Phase 6 — DevOps | 7 subjects | ~530 lessons |
| Phase 7 — CS + Advanced | 6 subjects | ~400 lessons |
| **🏆 TOTAL** | **48 subjects** | **~3,750 lessons** |

> **Nextsem Academy Goal**: Become the #1 free multilingual Full Stack Web Dev platform in India 🇮🇳

create a automation to automatically complete lessons as per above plan and inform me after every 10 lesons.

also in each lesson below  add a self explanatory gif of the relvent topic for easy learning but it shold be easy to understand and related to real life
![alt text](image.png) ![alt text](image-1.png) pdf does not contain anything after reward ad is plaayed 

suggest a  few more features for my website to make it more engaging and user-friendly.
nake is ready for android app and ios app for it. we can also add pwa for it which is similar to app.

https://nextsem.online/pdf-to-markdown use this to make lessons from .md files
 rewrite https://nextsem.online/about and remove any ad from it  no this is not professional remove ads from here and rewrite it professionally 
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

✅ ![alt text](image-2.png) why on light theme it looks so ugly urgently correct it it may harm on production site.![ also this too](image-3.png)

✅ (image-4.png)let me read what you do in background each and every step do not hide it 
 
✅ for now remove theme switch option from everywhere we will test it later on staged site and then implement here. recheck  this it should look good and is it implemented and deployed on production.

✅ keep default theme dark.
✅ ![do not ask me everytime to accpet all it is annoying automate it please ](image-5.png)

✅ ![what is this and solve it](image-6.png)
✅ do not deploy on staging for now.
✅ apne app deploy na karein na production pe na staging pe.
✅ ![Visual Demo ko language selected k anusar show karo abhi sirf english m hi hai](image-8.png)
✅ ![isme Mcaq k options remove kardo aur uski jagah simulation based question pucho](image-9.png)
autos save users progress withou any login required for now and after adsense approval we will integrate it with google sign in on overall app.
 MCQ simulation-based question Removed the two redundant A/B/C/D list cards from the practice question section isi jagah simulation based question prepare kardo aur sabhi lessons pe aply kardo overall app pe.
 ✅ ![jaise google help hota hai ? pe click aur hover krne pe us context ka usage samjh aa jaye](image-10.png)
 
✅ on front page ![on front page update lessons card like this in image as per our plan i.e. different phases and lessons in that order with similiar design pattern as in the scrreenshot atached](image-11.png)
✅ thoda contrast lane k liye layout theme design overall same rakho bss thod distinction rakho user seo crawler k liye easy ho distinguish krna alag alag lesson k beech m.
✅ BCA, MCA & B.Tech Jobs Portal at `/jobs` — curated tech jobs, internships, off-campus drives, qualification filters, search, and Google Jobs schema (`docs/jobs.md`).