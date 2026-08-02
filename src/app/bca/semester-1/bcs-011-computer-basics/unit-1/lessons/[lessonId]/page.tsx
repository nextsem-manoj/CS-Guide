import React from 'react';
import { unit1Lessons } from '@/data/unit1LessonsData';
import Unit1LessonClient from '@/components/bca/Unit1LessonClient';

export function generateStaticParams() {
  return unit1Lessons.map((lesson) => ({
    lessonId: lesson.id,
  }));
}

export default async function Unit1LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const resolvedParams = await params;
  return <Unit1LessonClient lessonId={resolvedParams.lessonId} />;
}
