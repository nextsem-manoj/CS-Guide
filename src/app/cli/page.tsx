import React from "react";
import { Metadata } from "next";
import CliDashboardClient from "@/components/CliDashboardClient";

export const metadata: Metadata = {
  title: "Windows Command Line Free Lessons Dashboard & Study Path | NextSem",
  description: "Explore our interactive Windows CLI developer syllabus. Track your progress, unlock 15 lessons, and resume your coding journey on command prompts, directory structures, and networking utilities.",
  alternates: {
    canonical: "/cli"
  },
  openGraph: {
    title: "Windows Command Line Free Lessons Dashboard & Study Path | NextSem",
    description: "Explore our interactive Windows CLI developer syllabus. Track your progress, unlock 15 lessons, and resume your coding journey on command prompts, directory structures, and networking utilities.",
    url: "https://nextsem.online/cli",
    type: "website"
  }
};

export default function CliRootPage() {
  return <CliDashboardClient />;
}
