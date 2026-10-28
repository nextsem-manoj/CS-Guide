import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import Sprint1TestClient from './Sprint1TestClient';

export const metadata: Metadata = {
  title: 'Sprint 1: HTML Coding Practical Concept Test | BCA Practical Portal | NextSem',
  description: 'Comprehensive 12-question interactive HTML practical coding concept test covering HTML5 setup, boilerplate, links, images, tables, forms, validation, and semantic page architecture.',
  alternates: { canonical: '/tests/sprint1' },
  openGraph: {
    title: 'Sprint 1: HTML Coding Practical Concept Test | NextSem BCA Practical',
    description: 'Test your practical HTML coding skills with 12 real-world code snippet challenges, instant W3C standard feedback, and verified certification.',
    url: 'https://cs.nextsem.online/tests/sprint1',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sprint 1: HTML Coding Practical Concept Test | NextSem',
    description: 'Interactive HTML coding test covering HTML5 boilerplate, forms, tables, and semantic architecture.',
  },
};

export default function Sprint1TestPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex items-center justify-center text-sm font-mono">
          Loading Sprint 1 Practical Test...
        </div>
      }
    >
      <Sprint1TestClient />
    </Suspense>
  );
}
