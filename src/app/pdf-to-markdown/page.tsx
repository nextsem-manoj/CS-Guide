import React from "react";
import { Metadata } from "next";
import PdfToMarkdownConverter from "@/components/PdfToMarkdownConverter";

export const metadata: Metadata = {
  title: "PDF to Markdown (.md) Converter | NextSem Academy Tools",
  description: "Upload any PDF file (textbook, lecture notes, syllabus, slides) and convert it into structured Markdown (.md) files for NextSem Academy curriculum.",
  alternates: {
    canonical: "/pdf-to-markdown"
  },
  openGraph: {
    title: "PDF to Markdown (.md) Converter | NextSem Academy Tools",
    description: "Upload any PDF file and extract text into clean, structured Markdown (.md) notes.",
    url: "https://nextsem.online/pdf-to-markdown",
    type: "website"
  }
};

export default function PdfToMarkdownPage() {
  return <PdfToMarkdownConverter />;
}
