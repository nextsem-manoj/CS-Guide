import type { Metadata } from 'next';
import GitClient from './GitClient';

export const metadata: Metadata = {
  title: "Git Terminal Simulator & Version Control Tutorial | Nextsem Academy",
  description: "Learn Git version control commands step-by-step with our interactive Git console simulator on Windows 11. Run git init, add, commit, push, checkout, and merge.",
  alternates: { canonical: "/git" },
  openGraph: {
    title: "Git Terminal & Version Control Simulator | Nextsem Academy",
    description: "Master Git commands step-by-step. Run real-time git repositories, stage changes, commit logs, branch structures, and merge code interactively.",
    url: "https://nextsem.online/git",
  },
  twitter: {
    card: "summary_large_image",
    title: "Git Terminal Simulator & Version Control Tutorial | Nextsem Academy",
    description: "Learn and practice Git commands with an interactive Windows 11 console shell simulator.",
  },
};

export default function GitPage() {
  return <GitClient />;
}
