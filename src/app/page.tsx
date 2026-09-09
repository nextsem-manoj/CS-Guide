import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: "CS Guide by NextSem | University Computer Science (DU, IGNOU BCA & MCA)",
  description: "Official Computer Science university curriculum, notes, and interactive simulators for Delhi University (DU B.Sc. Prog CS) and IGNOU (BCA & MCA New) by Er. Manoj Kumar.",
  keywords: [
    "cs guide by nextsem",
    "delhi university computer science",
    "du bsc program computer science",
    "ignou bca",
    "ignou mca new",
    "ignou bca free study materials",
    "ignou bca lessons",
    "ignou bca notes",
    "bcs-111 computer basics ignou",
    "bcs-012 basic mathematics ignou",
    "bcsl-013 software lab ignou",
    "computer science university courses",
    "nextsem computer science"
  ],
  alternates: { canonical: "https://ignou-study-notes-by-nextsem.web.app" },
  openGraph: {
    title: "CS Guide by NextSem | University Computer Science (DU, IGNOU BCA & MCA)",
    description: "Free university computer science study materials, official syllabi PDFs, interactive units, MCQs, and lab simulators.",
    url: "https://ignou-study-notes-by-nextsem.web.app",
    siteName: "CS Guide by NextSem",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CS Guide by NextSem | University Computer Science (DU, IGNOU BCA & MCA)",
    description: "University computer science curriculum, official syllabi, lab simulators, and interactive notes.",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://ignou-study-notes-by-nextsem.web.app/#website",
        "url": "https://ignou-study-notes-by-nextsem.web.app",
        "name": "CS Guide by NextSem",
        "description": "University Computer Science Courses, Official Syllabi PDFs, Textbook Notes & Practical Simulators",
        "publisher": {
          "@type": "EducationalOrganization",
          "name": "CS Guide • Nextsem Online",
          "logo": {
            "@type": "ImageObject",
            "url": "https://ignou-study-notes-by-nextsem.web.app/icon.svg"
          }
        }
      },
      {
        "@type": "EducationalOrganization",
        "@id": "https://ignou-study-notes-by-nextsem.web.app/#organization",
        "name": "CS Guide by NextSem",
        "url": "https://ignou-study-notes-by-nextsem.web.app",
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
          "url": "https://ignou-study-notes-by-nextsem.web.app"
        }
      },
      {
        "@type": "Course",
        "name": "BCS-012: Basic Mathematics",
        "description": "IGNOU BCA Semester 1 Basic Mathematics algebra, calculus, matrices, and problem-solving modules.",
        "provider": {
          "@type": "EducationalOrganization",
          "name": "IGNOU BCA Hub",
          "url": "https://ignou-study-notes-by-nextsem.web.app"
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
              "text": "You can access 100% free IGNOU BCA study materials, line-by-line textbook unit notes, interactive MCQs, and lab simulators directly on https://ignou-study-notes-by-nextsem.web.app created by Er. Manoj Kumar."
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

