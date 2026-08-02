import React from "react";
import { Metadata } from "next";
import { htmlLessons } from "@/data/htmlLessonsData";
import HtmlLessonClient from "@/components/HtmlLessonClient";

export const metadata: Metadata = {
  title: "HTML5 Tutorial & Free Web Developer Lessons | NextSem",
  description: "Learn HTML5 step-by-step with free tutorials, interactive exercises, and developer certification tracks.",
  alternates: {
    canonical: "/html"
  },
  openGraph: {
    title: "HTML5 Tutorial & Free Web Developer Lessons | NextSem",
    description: "Learn HTML5 step-by-step with free tutorials, interactive exercises, and developer certification tracks.",
    url: "https://nextsem.online/html",
    type: "website"
  }
};

export default function HtmlRootPage() {
  const lessonOne = htmlLessons[0];
  return <HtmlLessonClient lesson={lessonOne} />;
}
