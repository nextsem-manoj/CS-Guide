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
