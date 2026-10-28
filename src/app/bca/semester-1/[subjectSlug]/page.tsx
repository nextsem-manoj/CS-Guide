import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { bcaSemesters } from '@/data/bcaCoursesData';
import SubjectSyllabusDashboard from '../../[semester]/[subject]/SubjectClient';

interface PageProps {
  params: Promise<{ subjectSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subjectSlug } = await params;
  const sem1 = bcaSemesters.find(s => s.id === 1);
  const subjectUpper = subjectSlug.toUpperCase();
  const sub = sem1?.subjects.find(s => 
    s.code.toUpperCase() === subjectUpper || 
    s.code.toUpperCase().replace("-", "") === subjectUpper.replace("-", "") ||
    subjectSlug.toLowerCase().includes(s.code.toLowerCase())
  );

  const title = sub ? `${sub.code}: ${sub.name}` : "Subject Syllabus";

  return {
    title: `${title} | IGNOU BCA 1st Semester Notes`,
    description: `Official IGNOU BCA Semester 1 syllabus, block notes, and interactive textbook units for Nextsem's curriculum.`,
    alternates: {
      canonical: `https://cs.nextsem.online/bca/semester-1/${subjectSlug}`,
    },
  };
}

export function generateStaticParams() {
  const sem1Subjects = [
    "BCS-111", "bcs-111", "BCS111", "bcs111", "BCS-011", "bcs-011", "BCS011", "bcs011",
    "bcs-011-computer-basics", "bcs-111-computer-basics-and-pc-software",
    "BCS-012", "bcs-012", "BCS012", "bcs012", "bcs-012-basic-mathematics", "bcs-012-mathematics",
    "BCSL-013", "bcsl-013", "BCSL013", "bcsl013", "bcsl-013-software-lab", "bcsl-013-pc-software-lab",
    "BEGLA-136", "begla-136", "begla-136-english", "begla-136-english-in-daily-life",
    "BEVAE-181", "bevae-181", "bevae-181-environmental-studies"
  ];

  return sem1Subjects.map((subjectSlug) => ({
    subjectSlug,
  }));
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return (
    <SubjectSyllabusDashboard 
      semester="1" 
      subject={resolvedParams.subjectSlug} 
    />
  );
}
