import React from "react";
import { Metadata } from "next";
import AllHtmlTagsClient from "@/components/AllHtmlTagsClient";

export const metadata: Metadata = {
  title: "All HTML Tags with Examples (Complete HTML5 Reference List) | NextSem",
  description: "Comprehensive reference of all standard HTML5 tags and legacy HTML elements with live code examples, attributes breakdown, sandbox editor, and explanations in English, Hinglish, and Hindi.",
  keywords: [
    "all html tags",
    "html tags with examples",
    "html5 tags list",
    "html tags cheat sheet",
    "html tags reference",
    "html tags hindi hinglish",
    "html tags live preview",
    "complete html tags guide"
  ],
  alternates: {
    canonical: "/html/tags"
  },
  openGraph: {
    title: "All HTML Tags with Examples (Complete HTML5 Reference List) | NextSem",
    description: "Explore all 110+ HTML tags with real-time interactive preview, attributes, and examples.",
    url: "https://nextsem.online/html/tags",
    type: "website",
    siteName: "NextSem Academy"
  }
};

export default function AllHtmlTagsPage() {
  return <AllHtmlTagsClient />;
}
