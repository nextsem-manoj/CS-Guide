import type { Metadata } from 'next';
import CurriculumClient from './CurriculumClient';

export const metadata: Metadata = {
  title: "Complete Free Dev Curriculum | Nextsem Academy",
  description: "Explore Nextsem Academy's complete free developer curriculum: CLI, HTML, CSS, JavaScript, React, Node.js, Git, and Capstone project pathways.",
  alternates: { canonical: "/curriculum" },
  openGraph: {
    title: "Complete Free Dev Curriculum | Nextsem Academy",
    description: "Explore Nextsem Academy's complete free developer curriculum.",
    url: "https://nextsem.online/curriculum",
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete Free Dev Curriculum | Nextsem Academy",
    description: "Explore Nextsem Academy's complete free developer curriculum.",
  },
};

export default function CurriculumPage() {
  return <CurriculumClient />;
}
