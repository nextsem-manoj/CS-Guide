import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: "CS Guide by NextSem | University Computer Science (BCA & MCA)",
  description: "Universal Computer Science curriculum, textbook notes, and interactive practical simulators for BCA & MCA students by Er. Manoj Kumar.",
  keywords: [
    "cs guide by nextsem",
    "university computer science",
    "bca curriculum",
    "mca curriculum",
    "bca notes",
    "mca notes",
    "bca practical labs",
    "computer science courses",
    "web development practicals",
    "nextsem computer science"
  ],
  alternates: { canonical: "https://cs.nextsem.online" },
  openGraph: {
    title: "CS Guide by NextSem | University Computer Science (BCA & MCA)",
    description: "Free university computer science study materials, syllabi, interactive units, MCQs, and lab simulators.",
    url: "https://cs.nextsem.online",
    siteName: "CS Guide by NextSem",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CS Guide by NextSem | University Computer Science (BCA & MCA)",
    description: "University computer science curriculum, syllabi, lab simulators, and interactive notes.",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://cs.nextsem.online/#website",
        "url": "https://cs.nextsem.online",
        "name": "CS Guide by NextSem",
        "description": "University Computer Science Courses, Syllabi, Textbook Notes & Practical Simulators",
        "publisher": {
          "@type": "EducationalOrganization",
          "name": "CS Guide • Nextsem Online",
          "logo": {
            "@type": "ImageObject",
            "url": "https://cs.nextsem.online/icon.svg"
          }
        }
      },
      {
        "@type": "EducationalOrganization",
        "@id": "https://cs.nextsem.online/#organization",
        "name": "CS Guide by NextSem",
        "url": "https://cs.nextsem.online",
        "founder": {
          "@type": "Person",
          "name": "Er. Manoj Kumar"
        }
      },
      {
        "@type": "Course",
        "name": "BCA: Bachelor of Computer Applications",
        "description": "Comprehensive 3-year undergraduate Computer Science curriculum covering Computer Basics, Programming, Data Structures, Web Development, and 3-Year Practical Lab (360 Days).",
        "provider": {
          "@type": "EducationalOrganization",
          "name": "NextSem Academy CS Guide",
          "url": "https://cs.nextsem.online"
        }
      },
      {
        "@type": "Course",
        "name": "MCA: Master of Computer Applications",
        "description": "Advanced 2-year postgraduate Computer Science curriculum covering Artificial Intelligence, Machine Learning, Big Data, Cloud Computing, and Capstone Projects.",
        "provider": {
          "@type": "EducationalOrganization",
          "name": "NextSem Academy CS Guide",
          "url": "https://cs.nextsem.online"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Where can university computer science students access free BCA & MCA study materials?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Students can access 100% free university Computer Science study materials, line-by-line textbook notes, interactive MCQs, and 3-Year Practical Lab (360 Days) simulators directly on https://cs.nextsem.online created by Er. Manoj Kumar."
            }
          },
          {
            "@type": "Question",
            "name": "Which programs are supported on the CS Guide platform?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "CS Guide supports full undergraduate BCA (6 Semesters) and postgraduate MCA (4 Semesters) computer science degree programs with practical coding labs and solved exercises."
            }
          },
          {
            "@type": "Question",
            "name": "Does the CS Guide platform include practical coding exercises?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! The platform includes interactive in-browser coding labs, terminal simulators, and GitHub workflows for HTML, CSS, JavaScript, C/C++, and Python."
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

