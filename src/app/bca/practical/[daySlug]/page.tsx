import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPracticalLessonBySlug, PRACTICAL_LESSONS } from "@/data/bcaPracticalData";
import BcaPracticalLessonClient from "./BcaPracticalLessonClient";

interface PageProps {
  params: Promise<{
    daySlug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { daySlug } = await params;
  const lesson = getPracticalLessonBySlug(daySlug);

  if (!lesson) {
    return {
      title: "Practical Lesson Not Found | BCA Practical Portal",
    };
  }

  return {
    title: `Day ${lesson.day}: ${lesson.title} | BCA Practical Learning Portal | NextSem`,
    description: lesson.concept.overview,
    keywords: [
      `bca practical day ${lesson.day}`,
      lesson.title,
      lesson.category,
      "bca practical exercises",
      "bca coding lab",
      "nextsem academy practicals"
    ],
    openGraph: {
      title: `Day ${lesson.day}: ${lesson.title} — BCA Practical Portal`,
      description: lesson.concept.overview,
      url: `https://cs.nextsem.online/bca/practical/${lesson.slug}`,
      siteName: "NextSem Academy",
      type: "article",
    },
    alternates: {
      canonical: `https://cs.nextsem.online/bca/practical/${lesson.slug}`,
    },
  };
}

export function generateStaticParams() {
  return PRACTICAL_LESSONS.map((lesson) => ({
    daySlug: lesson.slug,
  }));
}

export default async function PracticalLessonPage({ params }: PageProps) {
  const { daySlug } = await params;
  const lesson = getPracticalLessonBySlug(daySlug);

  if (!lesson) {
    notFound();
  }

  return <BcaPracticalLessonClient lesson={lesson} />;
}
