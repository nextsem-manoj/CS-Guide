import { Suspense } from 'react';
import SemmyAiClient from './SemmyAiClient';

export const metadata = {
  title: 'Semmy AI Training Lab',
  description: 'Teach Semmy AI new concepts and expand its BCA knowledge base. Interactive training playground.',
};

export default function SemmyAiPage() {
  return (
    <Suspense fallback={
      <div className="w-full h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-t-indigo-500 border-slate-800 rounded-full animate-spin" />
      </div>
    }>
      <SemmyAiClient />
    </Suspense>
  );
}
