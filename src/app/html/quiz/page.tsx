import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import HtmlQuizClient from './HtmlQuizClient';

export const metadata: Metadata = {
  title: 'Interactive HTML Quiz | Nextsem Academy',
  description: 'Test your HTML skills with interactive multiple-choice questions, score tracking, and instant explanations.',
  alternates: { canonical: '/html/quiz' },
  openGraph: {
    title: 'Interactive HTML Quiz | Nextsem Academy',
    description: 'Test your HTML skills with interactive multiple-choice questions, score tracking, and instant explanations.',
    url: 'https://nextsem.online/html/quiz',
  },
};

export default function HtmlQuizPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#060c18] text-white flex items-center justify-center text-sm font-mono">
          Loading HTML Quiz...
        </div>
      }
    >
      <HtmlQuizClient />
    </Suspense>
  );
}
