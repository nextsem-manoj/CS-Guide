import type { Metadata } from 'next';
import CbtClient from './CbtClient';

export const metadata: Metadata = {
  title: "Computer Competency Assessment (100 MCQ CBT) | NextSem CS-Guide",
  description: "Official 100-question Computer-Based Test (CBT) covering Windows OS, Linux OS, MS Office (Word, Excel, PowerPoint), Networking, Git, HTML, and CSS. Test your skills and link your certified score to your NextSem student profile.",
  alternates: { canonical: "/cbt" },
  openGraph: {
    title: "National Computer Competency Assessment (100 MCQs) | NextSem CS-Guide",
    description: "Complete 100-question computer science exam with instant grading, question-by-question analysis, and Google profile verification.",
    url: "https://cs.nextsem.online/cbt",
  },
  twitter: {
    card: "summary_large_image",
    title: "100-MCQ Computer Competency Test | NextSem CS-Guide",
    description: "Standard 90-minute Computer-Based Test assessment with certified score linking.",
  },
};

export default function CbtPage() {
  return <CbtClient />;
}
