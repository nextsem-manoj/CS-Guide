"use client";

import React, { Suspense } from 'react';
import TextbookViewer from '@/app/bca/viewer/ViewerClient';

export default function NcertPdfPage() {
  return (
    <Suspense fallback={
      <div className="w-full h-screen bg-[#060c18] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-t-emerald-500 border-slate-800 rounded-full animate-spin" />
      </div>
    }>
      <TextbookViewer />
    </Suspense>
  );
}
