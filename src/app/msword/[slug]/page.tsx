import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mswordLessons } from "../../../data/mswordLessonsData";
import MsWordLessonClient from "../../../components/MsWordLessonClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return mswordLessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lesson = mswordLessons.find((l) => l.slug === slug);
  if (!lesson) return { title: "Lesson Not Found" };
  return {
    title: `${lesson.title} | MS Word 365 Career Skills — Nextsem`,
    description: `Learn ${lesson.title} in Microsoft Word 365. Career-focused lesson with real job scenarios, Hindi, Hinglish & English explanations, and AI tips.`,
    keywords: [`ms word`, `microsoft word 365`, `office skills`, `career skills`, lesson.title],
    openGraph: {
      title: `${lesson.title} | MS Word Career Skills`,
      description: `Free MS Word lesson: ${lesson.title}. Real job scenarios, multilingual, interactive.`,
      url: `https://nextsem.online/msword/${lesson.slug}`,
    },
  };
}

export default async function MsWordLessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = mswordLessons.find((l) => l.slug === slug);
  if (!lesson) notFound();
  return <MsWordLessonClient lesson={lesson} />;
}
