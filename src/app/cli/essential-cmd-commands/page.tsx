import type { Metadata } from "next";
import EssentialCmdCommandsClient from "@/components/EssentialCmdCommandsClient";

export const metadata: Metadata = {
  title: "Essential CMD Commands Cheatsheet for Windows Users | NextSem",
  description: "Quick reference guide to essential Windows CMD commands for beginners and developers.",
  alternates: {
    canonical: "/cli/essential-cmd-commands",
  },
};

export default function EssentialCmdCommandsAliasPage() {
  return <EssentialCmdCommandsClient />;
}
