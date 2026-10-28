import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDotnetLessonBySlug, DOTNET_LESSONS } from "@/data/dotnetPracticalData";
import DotnetPracticalLessonClient from "./DotnetPracticalLessonClient";

interface PageProps {
  params: Promise<{
    daySlug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { daySlug } = await params;
  const lesson = getDotnetLessonBySlug(daySlug);

  if (!lesson) {
    return {
      title: "Practical Lesson Not Found | .NET Practical Portal",
    };
  }

  return {
    title: `Day ${lesson.day}: ${lesson.title} | .NET Practical Learning Portal | NextSem`,
    description: lesson.concept.overview,
    keywords: [
      `dotnet practical day ${lesson.day}`,
      lesson.title,
      lesson.category,
      "c# practical exercises",
      "dotnet coding lab",
      "nextsem academy practicals"
    ],
    openGraph: {
      title: `Day ${lesson.day}: ${lesson.title} — .NET Practical Portal`,
      description: lesson.concept.overview,
      url: `https://nextsem.online/practical/dotnet/${lesson.slug}`,
      siteName: "NextSem Academy",
      type: "article",
    },
    alternates: {
      canonical: `https://nextsem.online/practical/dotnet/${lesson.slug}`,
    },
  };
}

export function generateStaticParams() {
  return DOTNET_LESSONS.map((lesson) => ({
    daySlug: lesson.slug,
  }));
}

export default async function DotnetLessonPage({ params }: PageProps) {
  const { daySlug } = await params;
  const lesson = getDotnetLessonBySlug(daySlug);

  if (!lesson) {
    notFound();
  }

  return <DotnetPracticalLessonClient lesson={lesson} />;
}
