import type { Metadata } from 'next';
import CourseClient from './CourseClient';

export const metadata: Metadata = {
  title: "Structured Course Curriculum & Syllabus | Nextsem Academy",
  description: "Browse the complete structured frontend developer syllabus, track progress scores, launch CLI terminal simulators, and build real-world web projects.",
  alternates: { canonical: "/course" },
  openGraph: {
    title: "Structured Course Curriculum & Syllabus | Nextsem Academy",
    description: "Browse the complete structured frontend developer syllabus, track progress scores, launch CLI terminal simulators, and build real-world web projects.",
    url: "https://nextsem.online/course",
  },
  twitter: {
    card: "summary_large_image",
    title: "Structured Course Curriculum & Syllabus | Nextsem Academy",
    description: "Browse the complete structured frontend developer syllabus, track progress scores, launch CLI terminal simulators, and build real-world web projects.",
  },
};

export default function CoursePage() {
  return <CourseClient />;
}
