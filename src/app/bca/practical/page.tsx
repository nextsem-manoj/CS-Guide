import React from "react";
import { Metadata } from "next";
import BcaPracticalHubClient from "./BcaPracticalHubClient";

export const metadata: Metadata = {
  title: "BCA Practical Learning Portal | 3-Year Job-Oriented Training | NextSem Academy",
  description: "Comprehensive practical training system for BCA students across all 3 years (6 Semesters). Foundation, Specialization tracks, hands-on coding labs, Git/GitHub, and portfolio building.",
  keywords: [
    "bca practical portal",
    "bca coding curriculum",
    "bca practical subjects",
    "bca web development track",
    "bca 90 day coding challenge",
    "bca github portfolio",
    "nextsem bca practicals",
    "ignou bca practical lab",
    "du bca practicals"
  ],
  alternates: {
    canonical: "https://ignou-study-notes-by-nextsem.web.app/bca/practical"
  },
  openGraph: {
    title: "BCA Practical Learning Portal | NextSem Academy",
    description: "Hands-on, job-oriented practical coding portal for BCA students. Foundation ➔ Specialization ➔ Projects ➔ GitHub ➔ Portfolio.",
    url: "https://ignou-study-notes-by-nextsem.web.app/bca/practical",
    type: "website"
  }
};

export default function BcaPracticalPage() {
  return <BcaPracticalHubClient />;
}
