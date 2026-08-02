import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: "Contact & Support | Nextsem Academy",
  description: "Get in touch with Nextsem Academy. Send us your questions about web development courses, curriculum, or support.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact & Support | Nextsem Academy",
    description: "Contact Nextsem Academy support team for questions about our web development courses and curriculum.",
    url: "https://nextsem.online/contact",
  },
  twitter: {
    card: "summary",
    title: "Contact & Support | Nextsem Academy",
    description: "Reach out to the Nextsem Academy support team.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
