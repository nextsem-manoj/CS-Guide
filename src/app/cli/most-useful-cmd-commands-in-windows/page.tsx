import type { Metadata } from "next";
import EssentialCmdCommandsClient from "@/components/EssentialCmdCommandsClient";

export const metadata: Metadata = {
  title: "Most Useful & Essential CMD Commands in Windows (2026 Guide) | NextSem",
  description: "Comprehensive guide to essential Windows Command Prompt (CMD) commands for beginners, system diagnostics, network troubleshooting, and developer automation.",
  alternates: {
    canonical: "/cli/most-useful-cmd-commands-in-windows",
  },
  openGraph: {
    title: "Most Useful & Essential CMD Commands in Windows | NextSem Academy",
    description: "Learn essential Windows CMD commands step-by-step with interactive terminal simulation, code copy options, and developer notes.",
    url: "https://nextsem.online/cli/most-useful-cmd-commands-in-windows",
    type: "article",
  },
};

export default function MostUsefulCmdCommandsPage() {
  return <EssentialCmdCommandsClient />;
}
