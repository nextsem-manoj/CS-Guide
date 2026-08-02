# PDF to Interactive Lesson Prompt Template

Use this prompt template to convert raw textbook chapters or PDF content into visually engaging, gamified study guides with interactive quizzes.

---

## 📋 The Prompt Template

```markdown
Read the whole PDF and for each page, process the content page-by-page. For each page, split the text into groups of 5 sentences. 

For each group of sentences, provide:
1. The original sentences from the textbook.
2. A bite-sized explanation of the concepts. Ensure you use:
   - Emojis and bullet points to break up text blocks.
   - Standard Windows branding (e.g., ⊞ Windows or 🪟 Windows 11) whenever referring to the Windows operating system.
   - An engaging, developer-friendly, and memorable tone.

At the end of each page, create practice questions:
- **Multiple Choice Questions (MCQs)**: With 4 clear options, the correct answer index, and a detailed explanation of why it is correct.
- **Fill in the Blanks**: With the question, the exact correct answer, and a helpful hint.
```

---

## 🛠️ Implementation Guidance

When implementing this prompt in Next.js/React:
1. Create a dynamic path or a static notes route under the subject folder (e.g., `/bca/semester-1/[subject]/[unit]`).
2. Store the parsed pages in a `LESSONS` configuration array:
   ```typescript
   interface PageLesson {
     pageNo: number;
     title: string;
     originalText: string;
     explanationEn: string;
     mcq: {
       question: string;
       options: string[];
       answer: number; // 0-indexed correct option
       explanation: string;
     };
     blank: {
       question: string;
       answer: string;
       hint: string;
     };
   }
   ```
3. Use a tabbed card slider or vertical step container matching the application's premium theme (e.g., emerald or indigo gradients).
4. Persist completed progress using the global `ProgressContext` or `localStorage` to keep track of user completion status and award points/XP.
