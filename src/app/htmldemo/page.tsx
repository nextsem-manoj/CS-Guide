import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import HtmlDemoClient from './HtmlDemoClient';

export const metadata: Metadata = {
  title: 'Interactive HTML/CSS/JS Tutorial | Nextsem Academy',
  description: 'Learn HTML, CSS, and JavaScript step-by-step with an interactive code editor and live preview.',
  alternates: { canonical: '/htmldemo' },
  openGraph: {
    title: 'HTML/CSS/JS Interactive Tutorial | Nextsem Academy',
    description: 'Learn web development hands-on with live code + preview, lesson navigation, hints, and documentation.',
    url: 'https://nextsem.online/htmldemo',
  },
};

export default function HtmlDemoPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen bg-[#0e1726] text-white flex items-center justify-center text-sm font-mono">
          Loading TryIt Editor...
        </div>
      }
    >
      <HtmlDemoClient />
    </Suspense>
  );
}
