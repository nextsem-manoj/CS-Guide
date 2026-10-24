import type { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "Faculty & Student Evaluation Dashboard | NextSem Academy",
  description:
    "Official IGNOU BCA practical learning & code evaluation dashboard. Lead Faculty Er. Manoj Kumar reviews, evaluates, and certifies live student submissions, GitHub repositories, and viva assessments.",
  keywords: [
    "NextSem Academy Dashboard",
    "IGNOU BCA Evaluation",
    "BCA Practical Dashboard",
    "Er. Manoj Kumar",
    "Code Evaluation",
    "Viva Verification",
  ],
};

export default function DashboardPage() {
  return <DashboardClient />;
}
