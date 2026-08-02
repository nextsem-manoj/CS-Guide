import React from 'react';
import SemesterSubjectsDashboard from './SemesterClient';

export function generateStaticParams() {
  return [
    { semester: "1" },
    { semester: "2" },
    { semester: "3" },
    { semester: "4" },
    { semester: "5" },
    { semester: "6" },
    { semester: "semester-1" },
    { semester: "semester-2" },
    { semester: "semester-3" },
    { semester: "semester-4" },
    { semester: "semester-5" },
    { semester: "semester-6" }
  ];
}

interface PageProps {
  params: Promise<{ semester: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <SemesterSubjectsDashboard semester={resolvedParams.semester} />;
}
