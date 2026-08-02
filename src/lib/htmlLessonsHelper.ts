import { htmlLessons } from "../data/htmlLessonsData";
import { cliLessons } from "../data/cliLessonsData";

export function getChapterIdFromPath(pathname: string): string {
  if (!pathname) return "";
  if (pathname === "/html") {
    return "p1-1-intro-and-text";
  }
  if (pathname === "/cli") {
    return "p0-2-terminal";
  }
  if (pathname.startsWith("/html/")) {
    const slug = pathname.split("/html/")[1]?.split("?")[0];
    const lesson = htmlLessons.find((l) => l.slug === slug);
    if (lesson) {
      if (lesson.id <= 10) return "p1-1-intro-and-text";
      if (lesson.id <= 20) return "p1-2-links-and-media";
      if (lesson.id <= 30) return "p1-3-lists-and-tables";
      if (lesson.id <= 40) return "p1-4-forms-and-inputs";
      if (lesson.id <= 50) return "p1-5-semantics-and-seo";
      return "p1-6-html5-tags";
    }
  }
  if (pathname.startsWith("/cli/")) {
    const slug = pathname.split("/cli/")[1]?.split("?")[0];
    const lesson = cliLessons.find((l) => l.slug === slug);
    if (lesson) {
      return lesson.originalChapterId;
    }
  }
  return pathname.split("/book/")[1]?.split("?")[0] || "";
}

export function isHtmlLessonPath(pathname: string): boolean {
  if (!pathname) return false;
  return pathname === "/html" || pathname.startsWith("/html/");
}

export function isCliLessonPath(pathname: string): boolean {
  if (!pathname) return false;
  return pathname === "/cli" || pathname.startsWith("/cli/");
}

export function getChapterUrl(chapterId: string): string {
  if (chapterId === "p1-1-intro-and-text") return "/html";
  if (chapterId === "p0-2-terminal") return "/cli";
  
  if (chapterId.startsWith("p1-")) {
    // Map phase chapter key back to the first lesson slug of that unit
    const phaseMap: Record<string, string> = {
      "p1-1-intro-and-text": "learn-html-web-free-lessons-what-is-the-internet",
      "p1-2-links-and-media": "doctype-html5-declaration-syntax",
      "p1-3-lists-and-tables": "html-body-tag-visible-content",
      "p1-4-forms-and-inputs": "bold-b-vs-semantic-strong-tag",
      "p1-5-semantics-and-seo": "anchor-a-tag-href-hyperlinks",
      "p1-6-html5-tags": "image-img-tag-src-images",
    };
    const slug = phaseMap[chapterId];
    if (slug) {
      if (chapterId === "p1-1-intro-and-text") return "/html";
      return `/html/${slug}`;
    }
  }

  // Check if it matches a CLI lesson
  const cliLesson = cliLessons.find(l => l.originalChapterId === chapterId || l.slug === chapterId);
  if (cliLesson) {
    return `/cli/${cliLesson.slug}`;
  }

  return `/book/${chapterId}`;
}
