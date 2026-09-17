import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBcaLesson, bcaLessons } from "@/data/bcaLessonsData";
import BcaLessonClient from "@/components/bca/BcaLessonClient";

interface PageProps {
  params: Promise<{
    lessonSlug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lessonSlug } = await params;
  const lesson = getBcaLesson("bcs-011-computer-basics", lessonSlug);

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
      url: `https://ignou-study-notes-by-nextsem.web.app/bca/semester-1/bcs-011-computer-basics/${lessonSlug}`,
      siteName: "Nextsem Academy",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
      type: "article",
    },
    alternates: {
      canonical: `https://ignou-study-notes-by-nextsem.web.app/bca/semester-1/bcs-011-computer-basics/${lessonSlug}`,
    },
  };
}

export async function generateStaticParams() {
  return bcaLessons
    .filter((l) => l.subjectSlug === "bcs-011-computer-basics")
    .map((l) => ({
      lessonSlug: l.slug,
    }));
}

export default async function BcaBasicsLessonPage({ params }: PageProps) {
  const { lessonSlug } = await params;
  const lesson = getBcaLesson("bcs-011-computer-basics", lessonSlug);

  if (!lesson) {
    notFound();
  }

  return <BcaLessonClient lesson={lesson} />;
}
