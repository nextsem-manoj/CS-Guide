import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: "IGNOU BCA Free Study Materials & Lessons | Er. Manoj Kumar",
  description: "Free IGNOU BCA 1st Semester study materials, line-by-line textbook notes, BCS-111 Computer Basics, BCS-012 Math, BCSL-013 Lab, BEGLA-136 English & BEVAE-181 by Er. Manoj Kumar.",
  keywords: [
    "ignou",
    "ignou bca",
    "ignou bca free study materials",
    "ignou bca lessons",
    "ignou bca notes",
    "ignou bca 1st semester hub",
    "bcs-111 computer basics ignou",
    "bcs-011 computer basics and pc software",
    "bcs-012 basic mathematics ignou",
    "bcsl-013 software lab ignou",
    "begla-136 workplace english ignou",
    "bevae-181 environmental studies ignou",
    "ignou bca solved assignments",
    "ignou bca previous year questions",
    "ignou study hub online"
  ],
  alternates: { canonical: "https://ignou.nextsem.online" },
  openGraph: {
    title: "IGNOU BCA Free Study Materials & Lessons | Er. Manoj Kumar",
    description: "Free line-by-line IGNOU BCA Semester 1 curriculum with interactive units, bilingual notes, MCQs, and lab simulators.",
    url: "https://ignou.nextsem.online",
    siteName: "IGNOU BCA Hub by Nextsem",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IGNOU BCA Free Study Materials & Lessons | Er. Manoj Kumar",
    description: "Bilingual IGNOU BCA courses, solved unit notes, lab simulators, and interactive MCQs.",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://ignou.nextsem.online/#website",
        "url": "https://ignou.nextsem.online",
        "name": "IGNOU BCA Study Hub",
        "description": "Free IGNOU BCA Study Materials, Line-by-Line Textbook Notes & Practical Simulators",
        "publisher": {
          "@type": "EducationalOrganization",
          "name": "IGNOU BCA Hub • Nextsem Online",
          "logo": {
            "@type": "ImageObject",
            "url": "https://ignou.nextsem.online/icon.svg"
          }
        }
      },
      {
        "@type": "EducationalOrganization",
        "@id": "https://ignou.nextsem.online/#organization",
        "name": "IGNOU BCA Study Hub by Nextsem",
        "url": "https://ignou.nextsem.online",
        "founder": {
          "@type": "Person",
          "name": "Er. Manoj Kumar"
        }
      },
      {
        "@type": "Course",
        "name": "BCS-111 / BCS-011: Computer Basics and PC Software",
        "description": "Comprehensive IGNOU BCA 1st Semester Computer Basics, Hardware, OS, CLI Commands & Networking line-by-line textbook lessons.",
        "provider": {
          "@type": "EducationalOrganization",
          "name": "IGNOU BCA Hub",
          "url": "https://ignou.nextsem.online"
        }
      },
      {
        "@type": "Course",
        "name": "BCS-012: Basic Mathematics",
        "description": "IGNOU BCA Semester 1 Basic Mathematics algebra, calculus, matrices, and problem-solving modules.",
        "provider": {
          "@type": "EducationalOrganization",
          "name": "IGNOU BCA Hub",
          "url": "https://ignou.nextsem.online"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Where can I get free IGNOU BCA study materials and notes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can access 100% free IGNOU BCA study materials, line-by-line textbook unit notes, interactive MCQs, and lab simulators directly on https://ignou.nextsem.online created by Er. Manoj Kumar."
            }
          },
          {
            "@type": "Question",
            "name": "Which subjects are covered in IGNOU BCA Semester 1?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "IGNOU BCA Semester 1 includes BCS-111 / BCS-011 (Computer Basics and PC Software), BCS-012 (Basic Mathematics), BCSL-013 (Software Lab), BEGLA-136 (Workplace English), and BEVAE-181 (Environmental Studies)."
            }
          },
          {
            "@type": "Question",
            "name": "Does IGNOU BCA Hub support English and Hinglish explanations?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! All lessons on IGNOU BCA Hub support English, Hinglish, and Hindi language modes with both Kid/Easy and Pro complexity options."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}

