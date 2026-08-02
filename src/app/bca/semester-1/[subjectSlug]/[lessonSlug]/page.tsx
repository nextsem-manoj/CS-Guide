import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBcaLesson, bcaLessons } from "@/data/bcaLessonsData";
import BcaLessonClient from "@/components/bca/BcaLessonClient";

interface PageProps {
  params: Promise<{
    subjectSlug: string;
    lessonSlug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subjectSlug, lessonSlug } = await params;
  const lesson = getBcaLesson(subjectSlug, lessonSlug);

  if (!lesson) {
    return {
      title: "Lesson Not Found | IGNOU BCA 1st Semester",
    };
  }

  return {
    title: `${lesson.title} | IGNOU BCA 1st Semester Notes`,
    description: lesson.seoDescription,
    keywords: lesson.keywords,
    openGraph: {
      title: `${lesson.title} — IGNOU BCA Semester 1`,
      description: lesson.seoDescription,
      url: `https://nextsem.online/bca/semester-1/${subjectSlug}/${lessonSlug}`,
      siteName: "Nextsem Academy",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
      type: "article",
    },
    alternates: {
      canonical: `https://nextsem.online/bca/semester-1/${subjectSlug}/${lessonSlug}`,
    },
  };
}

export async function generateStaticParams() {
  return bcaLessons.map((lesson) => ({
    subjectSlug: lesson.subjectSlug,
    lessonSlug: lesson.slug,
  }));
}

export default async function BcaLessonPage({ params }: PageProps) {
  const { subjectSlug, lessonSlug } = await params;
  const lesson = getBcaLesson(subjectSlug, lessonSlug);

  if (!lesson) {
    notFound();
  }

  return <BcaLessonClient lesson={lesson} />;
}
