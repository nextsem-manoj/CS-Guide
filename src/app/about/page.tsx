import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: "About Us & Vision | Nextsem Academy",
  description: "Learn about the mission of Nextsem Academy: providing open-source, hands-on, target-driven web development curriculum for self-taught developers and college students.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us & Vision | Nextsem Academy",
    description: "Learn about the mission of Nextsem Academy: providing open-source, hands-on, target-driven web development curriculum.",
    url: "https://nextsem.online/about",
  },
  twitter: {
    card: "summary",
    title: "About Us & Vision | Nextsem Academy",
    description: "Learn about the mission of Nextsem Academy.",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
