<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project-Scoped Rules
- **Curriculum Formatting Style:** Always avoid long, continuous blocks of plain text in curriculum/MDX files. Instead, rewrite them with relevant icons, emojis, bullet list highlights, descriptive GIFs/visual animations, and engaging developer jokes to keep learning highly visual, fun, and memorable.
- **Windows Naming Style:** Whenever referring to "Windows" or "Windows 11" in the curriculum/textbook content, always accompany it with the Windows icon/emoji (e.g. ⊞ Windows or 🪟 Windows 11) to maintain standard, high-quality visual branding.
<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project-Scoped Rules
- **Curriculum Formatting Style:** Always avoid long, continuous blocks of plain text in curriculum/MDX files. Instead, rewrite them with relevant icons, emojis, bullet list highlights, descriptive GIFs/visual animations, and engaging developer jokes to keep learning highly visual, fun, and memorable.
- **Windows Naming Style:** Whenever referring to "Windows" or "Windows 11" in the curriculum/textbook content, always accompany it with the Windows icon/emoji (e.g. ⊞ Windows or 🪟 Windows 11) to maintain standard, high-quality visual branding.
- **Automatic Chat Transcript Archiving**: Always run `npm run save-chat` or write a custom formatting script to archive the conversation transcript under the `chat-logs/` folder before concluding any session. If the user requests a custom name, use that name (e.g. `100+ more projects for front end web developer.md`). Make sure to structure and save all chat logs dynamically for future developer references.
- **Excluding Semmy AI on Native App:** Do not load or display the Semmy AI chatbot widget (`SemmyAiWidget`) on native Android or iOS app platforms. Use `Capacitor.isNativePlatform()` to disable rendering of the chatbot widget.
- **Excluded Header Links:** Never place or render Playground, NCERT Hub, BCA Hub, or Job Portal links in the main navigation headers or sub-navigation subject bars.
- **IGNOU BCA Master Curriculum Persistence & Auto-Read**: Always inspect, read, and honor instructions written in `docs/ignou_bca_1st_sem_master_curriculum.md`. Never delete user-written text or notes in curriculum files. Continuously log session decisions, chat results, and sitemap/architectural progress under Section 5 of the master document.
- **IGNOU BCA Language & Complexity Structure**: All IGNOU BCA Semester 1 content must support **English** and **Hinglish** language variants with **Easy** (visual/conceptual foundation) and **Normal** (formal IGNOU exam preparation) complexity modes.
- **IGNOU BCA PDF Coverage & Pill Options**: Every IGNOU BCA lesson must cover 100% of the unit PDF content line-by-line with rich graphics, interactive pill-form options for fill-in-the-blank questions, developer key takeaways, and official reference links.
- **IGNOU BCA PDF Dark Mode & Native Reader Navigation**: Keep all PDF viewers in dark mode (`#060c18` background). Open PDFs in a new tab on web or via native Capacitor File Opener/intent on mobile. Display an animated loader modal with a prominent **"Cancel / Return to Lesson"** button before PDF launch. If cancelled, return users directly to their active lesson.
- **Home Page IGNOU BCA Hub Linking**: Always connect and feature the IGNOU BCA 1st Semester Hub (`/bca/semester-1`) on the main home page hero banner via a dark-themed **`Start IGNOU BCA Free Lessons`** button (styled using `#0c1328` surface, gold `#c1a648` icon, and emerald `#04AA6D` border) and career roadmap cards.
- **BCA Route Slug Resolution**: `generateStaticParams()` in `[semester]/page.tsx` and `[semester]/[subject]/page.tsx` must supply both `"1"` and `"semester-1"` params with case-insensitive subject codes, and `SubjectClient` must parse `parseInt(semester.replace(/^semester-/, ""), 10)` and `subject.toUpperCase()` to ensure zero runtime errors.
- **`semester-1` Route Handler**: `src/app/bca/semester-1/page.tsx` directly renders `SemesterSubjectsDashboard` with `semester="1"` so the static directory never intercepts or blocks `/bca/semester-1` page loads.
- **Mobile BCA Accordion & Subject Switcher**: On `/bca`, render all semesters as collapsible accordions (Semester 1 open by default). Tapping any subject launches Unit 1 directly. Top header renders `BcaHeaderNav` with Home button & subject switcher dropdown. Mobile bottom navigation bar uses rounded corners (`rounded-3xl`), emerald green glowing border (`border-emerald-500/50`), increased bottom padding, and dynamic BCA semester tabs (`Sem 1` to `Sem 6` dynamically detected from URL).
- **Subject Dashboard Theme & Interactive Lesson Integration**: `SubjectClient.tsx` strictly uses the platform theme palette (`#060c18` background, `#0c1328` card surface, gold headers `#c1a648`, cyan/emerald accents), renders `BcaHeaderNav` at top, features direct **"Start Lesson"** buttons for interactive units (Unit 1), and renders **"Return to IGNOU BCA Hub"** buttons at the bottom.
- **1st Semester Subject Order & Aliases**: `BCS-111 Computer Basics and PC Software` is ordered as Subject #1 at the top of 1st Semester in `bcaCoursesData.ts`, and `SubjectClient` maps `BCS-011` / `BCS-111` aliases seamlessly so clicking the top subject opens Computer Basics.
- **BCA Lesson Sequential Navigation**: Every BCA lesson must render **"Previous Lesson"** and **"Next Lesson"** navigation buttons at the bottom of the content page so students can seamlessly navigate forward and backward through units.
- **IGNOU BCA Author Attribution**: All IGNOU BCA lessons, PDF exports, and curriculum documents must explicitly attribute the content author as **Er. Manoj Kumar**.
- **Golden Header Logo & PDF URL Link**: Render the golden NS logo badge in the header right. PDF exports must include the exact canonical lesson URL (`https://ignou-study-notes-by-nextsem.web.app/bca/semester-1/...`) formatted as a clickable link returning back to the active web lesson.
- **IGNOU BCA Dudu & Bubu Work-In-Progress Widget**: On all unreleased BCA semesters or upcoming subject/unit pages, render the animated `DuduBubuWipWidget` featuring sequential story animation (Scene 1: Bubu `image-17.png` lipsyncing first, Scene 2: Dudu `image-18.png` speaking next, Scene 3: Both side-by-side) with the exact message: *"Arre Arre! Yahan tak to aa gaye 🐾... par yahan se aage ka content Dudu aur Bubu milkar bana rahe hain! Thoda wait karo 🐻❤️🐻"* and an active return link.
- **IGNOU BCA Brand Theme Compliance**: All BCA lesson headers, footers, badges, buttons, option pills, code boxes, and cards must strictly use the platform theme palette (`#060c18` background, `#0c1328` surface, cyan/emerald accents, gold headers).
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


