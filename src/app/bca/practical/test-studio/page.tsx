import React from "react";
import { Metadata } from "next";
import TestStudioClient from "./TestStudioClient";

export const metadata: Metadata = {
  title: "Live Practical Coding Test Studio | BCA Portal | NextSem Academy",
  description: "Interactive HTML & CSS live coding test studio. Type code on the left side, watch it render live on the right, and automatically advance to the next lesson upon passing all tasks.",
  keywords: [
    "bca practical test studio",
    "html css coding test",
    "interactive web development test",
    "bca practical exercises",
    "nextsem coding studio"
  ]
};

export default function TestStudioPage() {
  return <TestStudioClient />;
}
