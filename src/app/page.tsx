import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: "IGNOU BCA 1st Semester Hub | Er. Manoj Kumar | Nextsem Online",
  description: "Official IGNOU BCA 1st Semester learning dashboard featuring line-by-line textbook units, bilingual English & Hinglish lessons, MCQs, and practical lab simulators by Er. Manoj Kumar.",
  alternates: { canonical: "https://ignou.nextsem.online" },
  openGraph: {
    title: "IGNOU BCA 1st Semester Hub | Er. Manoj Kumar",
    description: "Line-by-line IGNOU BCA Semester 1 curriculum with interactive units, bilingual support, and exam preparation by Er. Manoj Kumar.",
    url: "https://ignou.nextsem.online",
  },
  twitter: {
    card: "summary_large_image",
    title: "IGNOU BCA 1st Semester Hub | Er. Manoj Kumar",
    description: "Bilingual IGNOU BCA 1st Semester courses, lab simulators, and interactive MCQs.",
  },
};

export default function Home() {
  return <HomeClient />;
}

