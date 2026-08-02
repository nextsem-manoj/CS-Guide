import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Nextsem Academy — a premium web development learning platform designed for BCA, B.Tech, M.Tech students and aspiring frontend engineers.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Nextsem Academy",
    description: "Nextsem Academy bridges the gap between theory and job-ready engineering with hands-on HTML, CSS, JavaScript, React, and full-stack courses.",
    url: "https://nextsem.online/about",
  },
  twitter: {
    card: "summary",
    title: "About | Nextsem Academy",
    description: "Premium web development courses for BCA, B.Tech, M.Tech students.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
