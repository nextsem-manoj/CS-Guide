import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import AdSenseBanner from "@/components/AdSenseBanner";

export const metadata: Metadata = {
  title: "Privacy Policy | Nextsem Academy",
  description: "Read the Nextsem Academy Privacy Policy to understand how we collect, use, and protect your personal data.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | Nextsem Academy",
    description: "Nextsem Academy's Privacy Policy outlines data handling practices and your rights as a user.",
    url: "https://nextsem.online/privacy",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Nextsem Academy",
    description: "Your privacy matters. Read how Nextsem Academy protects your data.",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#060c18] to-slate-950 text-white pb-20 select-none">
      
      {/* Navbar */}
      <div className="h-16 border-b border-slate-850/50 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 flex items-center px-4 md:px-8">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-slate-400 hover:text-white font-bold text-sm transition-all"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-12 text-left space-y-6">
        
        <div className="flex items-center gap-2.5 text-blue-400">
          <Shield size={24} />
          <span className="text-xs font-black uppercase tracking-widest">Legal Document</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">Privacy Policy</h1>
        <p className="text-xs text-slate-400 font-bold">Last Updated: July 1, 2026</p>

        <hr className="border-slate-850" />

        <AdSenseBanner />

        <div className="space-y-4 text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          <p>
            At Nextsem Academy, accessible from https://nextsem.online, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Nextsem Academy and how we use it.
          </p>

          <h3 className="text-base font-black text-white pt-2">Log Files</h3>
          <p>
            Nextsem Academy follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services&apos; analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.
          </p>

          <h3 className="text-base font-black text-white pt-2">Google DoubleClick DART Cookie</h3>
          <p>
            Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://policies.google.com/technologies/ads</a>
          </p>

          <AdSenseBanner />

          <h3 className="text-base font-black text-white pt-2">Cookies and Web Beacons</h3>
          <p>
            Like any other website, Nextsem Academy uses &apos;cookies&apos;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
          </p>

          <h3 className="text-base font-black text-white pt-2">Third Party Privacy Policies</h3>
          <p>
            Nextsem Academy&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>

          <h3 className="text-base font-black text-white pt-2">Consent</h3>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
          </p>

          <AdSenseBanner />
        </div>

      </div>
    </div>
  );
}
