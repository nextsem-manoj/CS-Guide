# 📱 NextSem Academy — Mobile Application Architecture & Feature Spec (`mobile.md`)

> **Package ID**: `online.nextsem.app`  
> **App Name**: NextSem Academy  
> **Target Platforms**: Android (APK / AAB) & iOS  
> **Framework Stack**: Next.js 16 (React 19) + Capacitor 8 Native Bridge  

---

## 📌 1. Overview & Mobile Architecture Strategy

NextSem Academy Mobile is engineered as a **High-Performance Hybrid Native Application**. It leverages standard web technologies (HTML, CSS, TypeScript) bridged directly into native Android and iOS runtime environments via Capacitor.

### ⚡ Ultra-Lightweight Bundle Architecture (< 6 MB)
- **Live Dynamic Asset Streaming**: To avoid bundling 100MB+ of pre-rendered static HTML/JSON files inside the APK/AAB binary, the mobile app uses Capacitor's production server configuration:
  ```typescript
  // capacitor.config.ts
  server: {
    url: 'https://nextsem.online',
    cleartext: false,
    androidScheme: 'https',
  }
  ```
- **Result**: The compiled Android App Bundle (`app-release.aab`) maintains an ultra-compact download size of **~5.89 MB** while serving 100% of live features, lessons, quizzes, and themes seamlessly over the network.

---

## 🎨 2. Mobile Viewport & UX Specifications

### 📱 Responsive Layout & Viewport Fitting
- **Zero Scroll Hijacking**: Mobile layouts fit within device viewports (`h-screen`) using scoped internal scrolling containers (`overflow-y-auto`) to prevent unwanted window-level bounces.
- **Mobile Hamburger Navigation Drawer**:
  - Left navigation drawer slides in smoothly on mobile viewports (`< 768px`).
  - Provides instant tap navigation to **Courses**, **BCA Notes**, **NCERT**, **Playground**, **Theme Switcher**, and **User Profile**.
- **Touch-Optimized Interactive Controls**:
  - Command Prompt terminal simulation adapted for mobile virtual keyboards.
  - Swipeable lesson card carousels in [`PaginatedSections.tsx`](file:///c:/jbrs-landing-page/src/components/PaginatedSections.tsx).

### 🚫 Native Chatbot Exclusion Rule
- **Native Platform Rule**: The Semmy AI chatbot widget ([`SemmyAiWidget`](file:///c:/jbrs-landing-page/src/components/SemmyAiWidget.tsx)) is disabled on native mobile platforms via `Capacitor.isNativePlatform()` to maximize screen real estate and reduce layout clutter.

---

## 💰 3. Mobile AdMob Hybrid Strategy

When running on mobile native builds, Google AdSense containers are hidden, and native **Google AdMob SDK** overlays take over.

### 📋 Production Ad Unit Credentials
* **AdMob App ID**: `ca-app-pub-4242865347895866~7674001100` *(Embedded in `AndroidManifest.xml`)*

| Ad Type | Purpose | Production Ad Unit ID | Code Implementation |
| :--- | :--- | :--- | :--- |
| **Adaptive Banner** | Top & permanent bottom content ad | `ca-app-pub-4242865347895866/1125281920` | [`AdSenseBanner.tsx`](file:///c:/jbrs-landing-page/src/components/AdSenseBanner.tsx) |
| **Rewarded Video** | Unlocks "Download Lesson PDF" & refills lives | `ca-app-pub-4242865347895866/5641573985` | [`GitLessonClient.tsx`](file:///c:/jbrs-landing-page/src/components/GitLessonClient.tsx), [`CliLessonClient.tsx`](file:///c:/jbrs-landing-page/src/components/CliLessonClient.tsx) |
| **Interstitial** | Triggers upon completing a lesson | `ca-app-pub-4242865347895866/3489485149` | [`MarkCompleteButton.tsx`](file:///c:/jbrs-landing-page/src/components/MarkCompleteButton.tsx) |

### 🎯 Subtle Content-Integrated Ad Placement
- **Frequency**: After every 1 lesson page/card.
- **Styling**: Blended into the bottom of the content flow with soft background cards (`bg-slate-900/40`), subtle rounded borders (`rounded-xl`), and low-contrast `Sponsored` indicators to prevent disruptive user experiences.

---

## 🗣️ 4. Multilingual & Dual Learning Modes

Every lesson in the app supports instant switching across:
- **Languages**: 🇬🇧 English, 🇮🇳 Hinglish, 🇮🇳 Hindi.
- **Complexity Levels**:
  - 👦 **Kid Mode**: Fun visual analogies, emojis, storytelling, and developer jokes.
  - 💼 **Pro Mode**: Production terminal workflows, command line flags, and industrial cheat sheets.

---

## 🛠️ 5. Mobile Build & Deployment Workflow

### 1. Sync Web Assets
```bash
npx cap sync android
```

### 2. Compile Signed Android Release Bundle (`.aab`)
```powershell
cd android
.\gradlew.bat clean bundleRelease
```
- **Output File**: [`android/app/build/outputs/bundle/release/app-release.aab`](file:///c:/jbrs-landing-page/android/app/build/outputs/bundle/release/app-release.aab)

### 3. Google Play Store Release Notes (`<en-US>`)
```xml
<en-US>
🚀 What's New in v2.2.8:
- NEW Git Module: Learn how to join & checkout GitHub project branches step-by-step.
- Multilingual Support: Learn in English, Hinglish, & Hindi (Kid & Pro modes).
- Ultra-Fast & Compact: App download size under 6 MB!
- Interactive quizzes, BCA course notes, & lesson PDF downloads.
</en-US>
```
redesign bottom navigation bar in android app and ios app.
it should look professional and realistic as made by real users and not by ai.
only on mobile and pwa also add app open ad.and make sure ad shoud not be obvious.
make layout of each and every lesson same for every module on our app.
add reward and interstitial ad on each lesson completion and reward ad on download lesson pdf. using google mobile ads sdk.
adjust the content do not make lesson cluttered and increase font size to make it easy to read and understand.

make .apk for installation inside bluestacks 

on nextsem.online ad placement is not right it looks very large 
also colour scheme theme scheme icons are giving a feel of robotic look or website is not looking realistic as made by real users as i have applied for adsense so make it realistic .
