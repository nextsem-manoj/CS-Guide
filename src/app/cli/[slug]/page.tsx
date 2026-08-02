import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cliLessons } from "@/data/cliLessonsData";
import CliLessonClient from "@/components/CliLessonClient";

export async function generateStaticParams() {
  return cliLessons.map((lesson) => ({
    slug: lesson.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lesson = cliLessons.find((l) => l.slug === slug);
  
  if (!lesson) {
    return {
      title: "Lesson Not Found | NextSem",
      description: "This Windows CLI lesson was not found in our course directory.",
    };
  }

  const title = `${lesson.title} | Free Windows Command Line Lesson | NextSem`;
  const description = `Learn ${lesson.title} step-by-step in Hindi, Hinglish, and English with interactive check tasks. Free online Windows CLI lessons at NextSem Academy.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/cli/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://nextsem.online/cli/${slug}`,
      type: "article",
    },
  };
}

export default async function CliSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = cliLessons.find((l) => l.slug === slug);

  if (!lesson) {
    notFound();
  }

  return <CliLessonClient lesson={lesson} />;
}
