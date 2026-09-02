import type { Metadata } from 'next';
import CurriculumClient from './CurriculumClient';

export const metadata: Metadata = {
  title: "IGNOU BCA Subject-Wise Phase Curriculum & Progress | Er. Manoj Kumar",
  description: "Official IGNOU BCA 3-Year Degree curriculum roadmap structured into 6 sequential phases with percentage completion trackers, subject cards, and interactive units by Er. Manoj Kumar.",
  alternates: { canonical: "https://ignou-study-notes-by-nextsem.web.app/curriculum" },
  openGraph: {
    title: "IGNOU BCA Subject-Wise Phase Curriculum & Progress | Er. Manoj Kumar",
    description: "Official IGNOU BCA 3-Year Degree curriculum roadmap structured into 6 sequential phases.",
    url: "https://ignou-study-notes-by-nextsem.web.app/curriculum",
  },
  twitter: {
    card: "summary_large_image",
    title: "IGNOU BCA Subject-Wise Phase Curriculum & Progress | Er. Manoj Kumar",
    description: "Official IGNOU BCA 3-Year Degree curriculum roadmap structured into 6 sequential phases.",
  },
};

export default function CurriculumPage() {
  return <CurriculumClient />;
}
