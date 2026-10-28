import { MetadataRoute } from "next";
import searchIndex from "../data/searchIndex.json";
import { htmlLessons } from "../data/htmlLessonsData";
import { PRACTICAL_LESSONS } from "../data/bcaPracticalData";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cs.nextsem.online";

  // Base paths
  const baseRoutes = [
    "",
    "/html",
    "/html/tags",
    "/bca",
    "/bca/semester-1",
    "/bca/1",
    "/bca/2",
    "/bca/3",
    "/bca/4",
    "/bca/5",
    "/bca/6",
    "/bca/semmy-ai",
    "/cmd",
    "/profile",
    "/about",
    "/contact",
    "/privacy",
    "/terms"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" || route === "/bca/semester-1" || route === "/bca" ? 1.0 : 0.9,
  }));

  // BCA 1st Semester Subject routes
  const bcaSubjectRoutes = [
    "/bca/semester-1/bcs-011-computer-basics",
    "/bca/semester-1/bcs-011-computer-basics/unit-1-introduction-to-computer-systems",
    "/bca/semester-1/bcs-011-computer-basics/unit-2-operating-system",
    "/bca/notes/bcs-011-unit-2-operating-system",
    "/bca/notes/bcs-011-unit-3-programming-languages",
    "/bca/notes/bcs-011-block-3-unit-1-networking-and-internet",
    "/bca/semester-1/bcs-011-computer-basics/unit-5-introduction-to-personal-computers",
    "/bca/notes/bcs-011-unit-5",
    "/bca/semester-1/bcsl-013-software-lab",
    "/bca/semester-1/bcs-012-basic-mathematics",
    "/bca/semester-1/begla-136-english",
    "/bca/semester-1/bevae-181-environmental-studies",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.95,
  }));

  // Dynamic course chapter paths for other lessons (filter out HTML lessons)
  const courseRoutes = searchIndex
    .filter((chapter) => !chapter.id.startsWith("p1-"))
    .map((chapter) => ({
      url: `${baseUrl}/book/${chapter.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  // Add the other 99 HTML sub-lessons
  const htmlLessonRoutes = htmlLessons.slice(1).map((lesson) => ({
    url: `${baseUrl}/html/${lesson.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // Algorithms and 10 Master Problems dedicated routes
  const algorithmRoutes = [
    "/algorithms-and-flowcharts-10-master-problems.html",
    "/algorithms-and-flowcharts",
    "/algorithms-and-flowcharts/problem-1-largest-of-three-numbers",
    "/algorithms-and-flowcharts/problem-2-prime-or-composite-number",
    "/algorithms-and-flowcharts/problem-3-factorial-of-a-number",
    "/algorithms-and-flowcharts/problem-4-fibonacci-series",
    "/algorithms-and-flowcharts/problem-5-reverse-number-and-palindrome",
    "/algorithms-and-flowcharts/problem-6-simple-and-compound-interest",
    "/algorithms-and-flowcharts/problem-7-quadratic-equation-roots",
    "/algorithms-and-flowcharts/problem-8-linear-search-in-array",
    "/algorithms-and-flowcharts/problem-9-armstrong-and-sum-of-digits",
    "/algorithms-and-flowcharts/problem-10-temperature-converter-menu",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.95,
  }));

  // BCA Practical Learning Portal & Daily Lesson routes
  const bcaPracticalRoutes = [
    "/bca/practical",
    ...PRACTICAL_LESSONS.map((l) => `/bca/practical/${l.slug}`),
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.98,
  }));

  return [...baseRoutes, ...bcaSubjectRoutes, ...bcaPracticalRoutes, ...algorithmRoutes, ...courseRoutes, ...htmlLessonRoutes];
}
