import type { Metadata } from "next";
import SystemInfoFindstrLessonClient from "@/components/SystemInfoFindstrLessonClient";

export const metadata: Metadata = {
  title: "systeminfo | findstr OS Name, Version & Architecture Explained | NextSem CLI",
  description: "Learn how to filter and extract Windows 11 OS Name, Kernel Version, and 64-bit System Type using systeminfo and findstr with /B and /C flags.",
  alternates: {
    canonical: "/cli/windows-systeminfo-findstr-os-details",
  },
  openGraph: {
    title: "Windows CLI: systeminfo | findstr OS Details Explained",
    description: "Step-by-step breakdown of systeminfo piping with findstr in Windows 11 with interactive simulators.",
    url: "/cli/windows-systeminfo-findstr-os-details",
    type: "article",
  },
};

export default function SystemInfoFindstrPage() {
  return <SystemInfoFindstrLessonClient />;
}
