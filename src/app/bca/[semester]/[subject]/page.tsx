import React from 'react';
import { bcaSemesters } from '@/data/bcaCoursesData';
import { bcaLessons } from '@/data/bcaLessonsData';
import SubjectSyllabusDashboard from './SubjectClient';

export function generateStaticParams() {
  const paramsSet = new Set<string>();
  const params: { semester: string; subject: string }[] = [];

  const addParam = (sem: string, sub: string) => {
    if (!sem || !sub) return;
    const lowerSub = sub.toLowerCase();
    const key = `${sem}___${lowerSub}`;
    if (!paramsSet.has(key)) {
      paramsSet.add(key);
      params.push({ semester: sem, subject: lowerSub });
    }
  };

  // Map subjects only to their valid semesters
  bcaSemesters.forEach((sem) => {
    const semStr = sem.id.toString();
    const semPrefix = `semester-${sem.id}`;

    sem.subjects.forEach((sub) => {
      const code = sub.code;
      const codeLower = sub.code.toLowerCase();
      const codeNoDash = sub.code.replace("-", "");
      const codeNoDashLower = codeNoDash.toLowerCase();
      const fullSlug = sub.path ? sub.path.split("/").pop()?.replace(/\s+/g, "-") || sub.code : sub.code;

      [semStr, semPrefix].forEach((sParam) => {
        [code, codeLower, codeNoDash, codeNoDashLower, fullSlug, fullSlug.toLowerCase()].forEach((subParam) => {
          addParam(sParam, subParam);
        });
      });
    });
  });

  // Additional Semester 1 custom aliases used across navigation links
  const sem1Aliases = [
    "BCS-011", "bcs-011", "BCS011", "bcs011", "bcs-011-computer-basics",
    "BCS-111", "bcs-111", "BCS111", "bcs111", "bcs-111-computer-basics-and-pc-software",
    "BCS-012", "bcs-012", "BCS012", "bcs012", "bcs-012-basic-mathematics", "bcs-012-mathematics",
    "BCSL-013", "bcsl-013", "BCSL013", "bcsl013", "bcsl-013-software-lab", "bcsl-013-pc-software-lab",
    "BEGLA-136", "begla-136", "begla-136-english", "begla-136-english-in-daily-life",
    "BEVAE-181", "bevae-181", "bevae-181-environmental-studies"
  ];

  ["1", "semester-1"].forEach((sParam) => {
    sem1Aliases.forEach((subParam) => {
      addParam(sParam, subParam);
    });
  });

  return params;
}

interface PageProps {
  params: Promise<{ semester: string; subject: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return (
    <SubjectSyllabusDashboard 
      semester={resolvedParams.semester} 
      subject={resolvedParams.subject} 
    />
  );
}
