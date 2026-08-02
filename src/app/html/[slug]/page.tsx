import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { htmlLessons } from "@/data/htmlLessonsData";
import HtmlLessonClient from "@/components/HtmlLessonClient";

export async function generateStaticParams() {
  return htmlLessons.map((lesson) => ({
    slug: lesson.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lesson = htmlLessons.find((l) => l.slug === slug);
  
  if (!lesson) {
    return {
      title: "Lesson Not Found | NextSem",
      description: "This HTML lesson was not found in our course directory.",
    };
  }

  const title = `${lesson.title} | Free HTML Web Coding Lesson | NextSem`;
  const description = `Learn ${lesson.title} step-by-step in Hindi, Hinglish, and English with interactive check tasks. Free online HTML web coding lessons at NextSem Academy.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/html/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://nextsem.online/html/${slug}`,
      type: "article",
    },
  };
}

export default async function HtmlSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = htmlLessons.find((l) => l.slug === slug);

  if (!lesson) {
    notFound();
  }

  return <HtmlLessonClient lesson={lesson} />;
}
