import React from "react";
import { Metadata } from "next";
import CVisualLogicSimulator from "@/components/CVisualLogicSimulator";

export const metadata: Metadata = {
  title: "Learn C Language with Visual Logic & Memory Simulation | Nextsem Academy",
  description: "Master C programming language from absolute scratch through interactive visual logic, memory pointer simulation, arrays, loops, and step-by-step algorithms.",
  keywords: ["C Language Visual Simulator", "Learn C Language", "C Programming Memory Pointers", "C Language Interactive", "Nextsem Academy C Course"],
  alternates: {
    canonical: "https://ignou-study-notes-by-nextsem.web.app/c",
  },
};

export default function CPage() {
  return <CVisualLogicSimulator />;
}
