import type { Metadata } from 'next';
import CmdClient from './CmdClient';

export const metadata: Metadata = {
  title: "Windows Command Prompt Simulator | Nextsem Academy",
  description: "Learn Windows command terminal commands step-by-step with our interactive CMD.EXE simulator. Run dir, mkdir, cd, echo, ping, ipconfig and master command prompt.",
  alternates: { canonical: "/cmd" },
  openGraph: {
    title: "Windows Command Prompt Simulator | Nextsem Academy",
    description: "Master Windows command terminal commands step-by-step. Write and run standard CMD commands interactively in the browser.",
    url: "https://nextsem.online/cmd",
  },
  twitter: {
    card: "summary",
    title: "Windows Command Prompt Simulator | Nextsem Academy",
    description: "Write, run, and debug Windows command line actions in the Nextsem CMD Simulator.",
  },
};

export default function CmdPage() {
  return <CmdClient />;
}
