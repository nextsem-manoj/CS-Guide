import type { Metadata } from "next";
import JobsClient from "../../components/JobsClient";

export const metadata: Metadata = {
  title: "BCA, MCA & B.Tech Tech Jobs & Internships | Nextsem Academy",
  description: "Find curated tech jobs, off-campus hiring drives, paid internships, and government IT roles for BCA, MCA, and B.Tech (CS/IT) freshers and developers in India.",
  keywords: [
    "bca jobs", "mca jobs", "btech jobs", "tech jobs india",
    "bca freshers jobs", "mca off campus drive", "btech CS internships",
    "junior frontend developer jobs", "off campus hiring 2025"
  ],
  alternates: { canonical: "https://nextsem.online/jobs" },
  openGraph: {
    title: "BCA, MCA & B.Tech Tech Jobs & Internships — Nextsem",
    description: "Curated tech job openings, off-campus drives & internships for BCA, MCA, and B.Tech graduates.",
    url: "https://nextsem.online/jobs",
  },
};

export default function JobsPage() {
  return <JobsClient />;
}
