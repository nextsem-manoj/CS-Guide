import type { Metadata } from 'next';
import { Suspense } from 'react';
import TerminalClient from './TerminalClient';

export const metadata: Metadata = {
  title: "Git Interactive Terminal Session | Nextsem Academy",
  description: "Practise Git commands inside an isolated Windows 11 console mockup window.",
};

export default function GitTerminalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#05060f] flex items-center justify-center text-slate-400 font-mono text-xs">Loading terminal...</div>}>
      <TerminalClient />
    </Suspense>
  );
}
