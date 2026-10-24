# Project-Scoped Rules

- Do not make or compile native APK or AAB files (e.g. running Gradle assembleDebug or bundleRelease) for the Android app unless the user explicitly requests it.
- **Ad Platform Hybrid Strategy**: Always show Google AdSense ads only on web platform builds, and native Google AdMob ads only on native mobile app builds. Check `Capacitor.isNativePlatform()` to dynamically toggle and display the correct ad units.
- **App Update Notification Strategy**: Always display new feature additions and app updates on the Home page. Use clean, animated app-start modal alerts or banners that describe the changes and provide direct click-to-navigate links so users can instantly check out the new features.
- **Proactive Execution / Command Authorization**: Always proceed with command execution, verification runs (e.g. `npm run lint`, `npm test`), and workspace file changes proactively. Avoid asking for manual permission or approval prompts for these actions since the user has authorized an "accept all" policy from their side.
- **Exclusive Windows CMD Terminal Simulation**: Always use the interactive Windows Command Prompt terminal simulation layout for the landing page. Users are taught Windows terminal commands step-by-step, with each command presented on a new screen. Remove any classic slides or gamified roadmaps.
- **Forced Authentication & Scoped Progress Persistence**: Always enforce Firebase Google Authentication before starting the Command Simulator. Save and sync terminal progress to localStorage scoped by user email (`nextsem_terminal_step_${email}` and `nextsem_terminal_certified_${email}`) to prevent users from repeating completed lessons.
- **Responsive Layout & Screen Fitting**: Always keep the terminal layout and interactive elements fitted perfectly within the device's viewport. Avoid vertical overflows or sizing elements larger than the viewport height (e.g. wrapping layout in h-screen and subcomponents in overflow-y-auto) to prevent scroll hijacking and ensure easy navigation.
- **Show Thinking in Chat**: Always write analysis, reasoning, plans, and technical thoughts directly inside the chat response as readable text. Never hide reasoning inside artifacts, collapsed sections, or tool-call outputs when the user wants to read it. If the user asks "what do you think" or "let me read", respond in plain readable chat text.
- **Automatic Chat Transcript Archiving**: Always run `npm run save-chat` or write a custom formatting script to archive the conversation transcript under the `chat-logs/` folder before concluding any session. If the user requests a custom name, use that name (e.g. `100+ more projects for front end web developer.md`). Make sure to structure and save all chat logs dynamically for future developer references.
- **Gamified 10-Day Development Roadmap**: Always align the development flow with the roadmap saved in `docs/roadmap/brilliant_app_ideas_analysis.md`. Whenever the user asks for their daily task, prompts "what is my task", or asks "what to do next", guide and implement the corresponding day's task step-by-step:
  * **Day 1**: Define `desktopSimulatorSteps.ts` metadata, keyboard/mouse objectives.
  * **Day 2**: Build `DesktopSimulator.tsx` (draggable files, folder double-clicks, recycle bin).
  * **Day 3**: Setup conditional staging redirection to the desktop simulator on first launch.
  * **Day 4**: Refactor `/book/[chapter]` into bite-sized card sliders.
  * **Day 5**: Integrate MCQs, matching, and drag-and-drop quiz card blocks.
  * **Day 6**: Create `GamificationContext` (Hearts/Lives, Streaks, Points).
  * **Day 7**: Connect AdMob Rewarded Video ads to replenish hearts.
  * **Day 8**: Configure Capacitor AdMob (Mobile) vs Google AdSense (Web) smart banner loading.
  * **Day 9**: Implement AI Compiler Sage CLI hint generator.
  * **Day 10**: Build sandbox static portfolio subdomain publishing backend.
  * Keep track of this progress inside `docs/roadmap/task.md` in the workspace directory.

- **Standard Lesson Template (PERMANENT RULE - ALL CURRENT AND FUTURE LESSONS)**: Every lesson created for this project (HTML, CLI, or any future subject) MUST follow this standard format:
  1. **Language Tabs**: `english`, `hinglish`, `hindi` lesson body text — each with `kid` + `pro` complexity modes (6 content variants per lesson).
  2. **Multilingual MCQ Exercise**: The `exercise` field MUST use `MultilingualExercise` format from `src/data/htmlLessonsData.ts` with `english`, `hinglish`, `hindi` keys, each containing `{ question, options, correctAnswer, hint }`. Never use the old single-language exercise format for new lessons.
  3. **Dashboard Back Link**: All lesson pages must include a header link back to their subject dashboard (e.g. `/html`, `/cli`).
  4. **SEO Slugs**: All lesson URLs must be descriptive and SEO-optimized (e.g. `/cli/learn-windows-command-prompt-cmd-basics`). Never use opaque IDs like `/book/cli-ch1-basics`.
  5. **AdMob/AdSense PDF Download**: Each lesson must include a "Download Lesson PDF" option gated behind a rewarded ad (AdMob on native, simulation on web).
  6. **Data file**: HTML lessons use `src/data/htmlLessonsData.ts` (with `MultilingualExercise` interface). CLI lessons use `src/data/cliLessonsData.ts`. New subjects → create `src/data/<subject>LessonsData.ts` using the same interface.
  7. **Client component pattern**: Use `const currentExercise = lesson.exercise[selectedLang] ?? lesson.exercise.english` for language-aware MCQ rendering in each lesson client component.
- **Theme Toggle Button in Bottom Navigation Standard (IMPORTANT - PERMANENT RULE)**: On every instance, page, and mobile bottom navigation bar, always include a dedicated **Theme Toggle** button (`Moon 🌙 / Sun ☀️` with live theme switching and persistent `localStorage` synchronization across Dark and Light modes).
- **Complete Home Page Breadcrumb Navigation Standard (PERMANENT RULE - ALL LINKS & PAGES)**: Across all existing, new, and standalone curriculum pages, subject dashboards, semester hubs, lesson templates, and special studios, ALWAYS render a complete, clickable breadcrumb navigation trail starting from the Home Page (`🏠 Home`) all the way to the current active page (e.g., `🏠 Home ❯ BCA Hub ❯ Semester X ❯ Subject Code / Unit ❯ Lesson / Studio`). Every parent step in the breadcrumb trail MUST be an interactive, clickable hyperlink so students can instantly jump back to Home or any ancestor level from anywhere on the platform across both mobile and desktop viewports.
- **BCA Practical Learning Portal Auto-Run & Antigravity IDE Session Orientation Standard (PERMANENT RULE)**:
  Whenever opening this project in Antigravity IDE or starting any conversation session, ALWAYS:
  1. Immediately execute **`npm run bca`** (or `npm run task`, `npm run status`) to display the live BCA Practical Portal progress metrics, sprint completion status (Days 1–90), and active local endpoints.
  2. Inspect `docs/roadmap/task.md`, remind the user of the active BCA Practical Learning Portal progress (Phase 1 through Phase 6), and proactively auto-suggest the immediate next implementation step.
- **BCA Practical Mandatory Google Login & GitHub Completion Enforcement Standard (PERMANENT RULE)**:
  1. **Google Login Mandatory for Access**: Students CANNOT access, view, or practice daily practical lessons (`/bca/practical/[daySlug]`) without signing in via Google authentication. If unauthenticated, render a dedicated Google Sign-In Gate with clickable breadcrumbs (`🏠 Home ❯ BCA Hub ❯ Practical Portal ❯ Day X`), clear explanation of why login is mandatory, and a direct Google Sign-In button.
  2. **Strict Lesson Completion Prerequisites**: A practical day lesson CANNOT be marked complete or unlock subsequent days unless all four conditions are met:
     - User is authenticated with Google (or Student profile).
     - The student implements code in Visual Studio Code (`code .`) following guided specifications on their PC, verified live from their pushed personal GitHub repository.
     - The Technical Viva Check is answered correctly (`vivaPassed === true`).
     - The student submits a valid, non-placeholder personal GitHub repository URL (`https://github.com/<username>/<repo>`) where their real code is pushed and verified to unlock the next lesson. Reject generic placeholders (`your-username`, `example`, `octocat`, etc.).
  3. **Strict Blue, Black & White Theme Standard**: All practical portal pages, lessons, gates, checklists, and modals must strictly use the Blue, Black, and White color palette (`#2563eb`, `#000000`, `#ffffff`) with dual Light Mode and Dark Mode support.
  4. **Attribution**: Always attribute curriculum and practical systems to **Er. Manoj Kumar**.
- **Zero-Lag Instant Auth Hydration & 60fps Smooth Modal Standard (PERMANENT RULE)**:
  1. **Instant Local Hydration & Non-Blocking Google Sign-In**: Never block the UI or show full-screen loading spinners while waiting for remote Firestore network calls during Google Sign-In, sign-up, or auth state changes. Always hydrate user profile and progress immediately in 0ms from localStorage, set `loading = false` synchronously, and perform cloud synchronization (`getDoc`, `setDoc`) in the background asynchronously.
  2. **Pre-Mounted Modal & Zero Layout Thrashing**: Never unmount (`return null`) the Student Profile Dashboard modal. Keep it permanently mounted in the DOM using hardware GPU-accelerated CSS transitions (`will-change: transform, opacity`; `opacity-0 pointer-events-none invisible` when closed, `opacity-100 visible` when opened) to guarantee instant, 60fps/120fps opening with 0ms latency.
  3. **Context Re-render Isolation**: Memoize context values and handlers (`useCallback`, `useMemo`) so opening or closing the dashboard modal never triggers unnecessary re-renders of heavy lesson or roadmap client components.
  4. **Scrollbar Stability**: Enforce `scrollbar-gutter: stable` on root HTML layout to eliminate layout shift or text jumping when modals open/close on Windows.
- **App Size Optimization & Under-20MB Standard (PERMANENT RULE)**:
  1. **Strict Target Download Size**: Always ensure the production mobile app download size on user devices remains strictly **under 20 MB** (typically 12–16 MB on modern devices).
  2. **Release Code & Resource Shrinking (R8 / ProGuard)**: In `android/app/build.gradle.kts`, always enforce `isMinifyEnabled = true` and `isShrinkResources = true` with `proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")` to strip unused code, libraries, and resources.
  3. **Android App Bundle (.aab) Architecture Splitting**: Always package and release using Google Play App Bundles (`.aab`). Google Play dynamically generates device-specific split APKs, delivering only the necessary native CPU architecture (`arm64-v8a` or `armeabi-v7a`) and screen density to the user's device, cutting user download size by up to 60%.
  4. **Dynamic Cloud Delivery for Heavy Educational Media**: Never bundle offline curriculum PDFs, uncompressed audio/video, or multi-megabyte image assets directly inside the native APK/AAB binary. Always stream heavy textbook PDFs dynamically from Firebase Storage / CDN with on-demand local caching.
  5. **Vector & WebP Asset Compression**: All static app assets, illustrations, and icons must strictly use SVG vectors or WebP compressed raster formats. Never bundle uncompressed PNGs or RAW images.
- **Real Registered Users Only & Zero Fake/AI-Made Profiles Standard (PERMANENT RULE)**:
  1. Show strictly only actual users who have registered with real accounts via Firebase Auth / Firestore (`users_progress`).
  2. Completely hide and eliminate all fake, AI-made, synthetic, guest (`guest@nextsem.local`), or placeholder demo users across all dashboards, student trays, evaluation studios, and community feeds.
  3. Never fabricate or auto-generate fake completed days or dummy submissions for any user. If a student has 0 completed days, display their true 0-day status without inventing submissions.
  4. If no submissions exist, display a clean, authentic "No Submissions Yet" empty state rather than injecting placeholder or demo data.
- **Strict 2-Color Theme Standard (Vibrant Emerald Green & Pure White - PERMANENT RULE)**:
  Exclusively use Vibrant Emerald Green (`#04AA6D`) and Pure White (`#ffffff`), adapted cleanly for both Dark (`#000000` / `#05080f`) and Light (`#ffffff` / `#f8fafc`) themes with zero extraneous rainbow/blue/purple colors.
- **Exact Code & Demo Links Standard (PERMANENT RULE)**:
  Code and Demo links must always point to the exact repository folder (`bca-day-${padDay}`) and matching live GitHub Pages deployment for that specific day as provided during lesson completion.
- **Instant WhatsApp & Email Evaluation Notification Standard (PERMANENT RULE)**:
  When evaluating any student submission, generate instant WhatsApp and Email notification dispatches to inform the student on their registered email and WhatsApp immediately upon evaluation.


