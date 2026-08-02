import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import CliQuizClient from './CliQuizClient';

export const metadata: Metadata = {
  title: 'Interactive CLI & CMD Quiz | Nextsem Academy',
  description: 'Test your Windows Command Prompt (CMD) skills with interactive multiple-choice questions, score tracking, and instant explanations.',
  alternates: { canonical: '/cli/quiz' },
  openGraph: {
    title: 'Interactive CLI & CMD Quiz | Nextsem Academy',
    description: 'Test your Windows Command Prompt (CMD) skills with interactive multiple-choice questions, score tracking, and instant explanations.',
    url: 'https://nextsem.online/cli/quiz',
  },
};

export default function CliQuizPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#060c18] text-white flex items-center justify-center text-sm font-mono">
          Loading CLI Quiz...
        </div>
      }
    >
      <CliQuizClient />
    </Suspense>
  );
}
