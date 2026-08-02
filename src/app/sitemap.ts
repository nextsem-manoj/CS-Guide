import { MetadataRoute } from "next";
import searchIndex from "../data/searchIndex.json";
import { htmlLessons } from "../data/htmlLessonsData";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ignou.nextsem.online";

  // Base paths
  const baseRoutes = [
    "",
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
    "/bca/semester-1/bcs-011-computer-basics/unit-5-introduction-to-personal-computers",
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

  return [...baseRoutes, ...bcaSubjectRoutes, ...courseRoutes, ...htmlLessonRoutes];
}
