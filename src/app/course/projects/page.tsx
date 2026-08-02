import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Curated Project Suggestions | Nextsem Academy",
  description: "Choose a target web development project, automatically highlight its required chapters on your syllabus path, and track your readiness progress score.",
  alternates: { canonical: "/course/projects" },
  openGraph: {
    title: "Curated Project Suggestions | Nextsem Academy",
    description: "Choose a target web development project, automatically highlight its required chapters on your syllabus path, and track your readiness progress score.",
    url: "https://nextsem.online/course/projects",
  },
  twitter: {
    card: "summary_large_image",
    title: "Curated Project Suggestions | Nextsem Academy",
    description: "Choose a target web development project, automatically highlight its required chapters on your syllabus path, and track your readiness progress score.",
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
