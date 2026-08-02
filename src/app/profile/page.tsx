import type { Metadata } from 'next';
import ProfileClient from './ProfileClient';

export const metadata: Metadata = {
  title: "My Profile",
  description: "Track your web development course progress, view completed chapters, and manage your Nextsem Academy student profile.",
  alternates: { canonical: "/profile" },
  openGraph: {
    title: "My Profile | Nextsem Academy",
    description: "Track your Nextsem Academy course progress and completed chapters.",
    url: "https://nextsem.online/profile",
  },
  twitter: {
    card: "summary",
    title: "My Profile | Nextsem Academy",
    description: "Track your web development progress on Nextsem Academy.",
  },
};

export default function ProfilePage() {
  return <ProfileClient />;
}
