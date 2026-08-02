import type { Metadata } from 'next';
import PlaygroundClient from './PlaygroundClient';

export const metadata: Metadata = {
  title: "Code Sandbox",
  description: "Write and run HTML, CSS, and JavaScript in a real-time browser sandbox. Practice your web development skills interactively.",
  alternates: { canonical: "/playground" },
  openGraph: {
    title: "Code Sandbox | Nextsem Academy",
    description: "Interactive browser-based code editor for practicing HTML, CSS, and JavaScript in real-time.",
    url: "https://nextsem.online/playground",
  },
  twitter: {
    card: "summary",
    title: "Code Sandbox | Nextsem Academy",
    description: "Write, run, and debug HTML, CSS, and JavaScript in the Nextsem Code Sandbox.",
  },
};

export default function PlaygroundPage() {
  return <PlaygroundClient />;
}
