import type { Metadata } from "next";
import MsWordDashboardClient from "../../components/MsWordDashboardClient";

export const metadata: Metadata = {
  title: "MS Word 365 Career Skills — Free Online Lessons | Nextsem",
  description: "Learn Microsoft Word 365 for free. Career-focused lessons with real job scenarios, AI tips, multilingual (Hindi/Hinglish/English) — perfect for job seekers aged 18–40.",
  keywords: ["ms word", "microsoft word 365", "office skills", "career skills", "word lessons", "free ms word course"],
  openGraph: {
    title: "MS Word 365 Career Skills — Nextsem",
    description: "60 free MS Word lessons for job seekers. Real scenarios, AI tips, Hindi/Hinglish/English.",
    url: "https://nextsem.online/msword",
  },
};

export default function MsWordPage() {
  return <MsWordDashboardClient />;
}
