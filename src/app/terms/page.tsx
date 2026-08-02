import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale } from 'lucide-react';
import AdSenseBanner from "@/components/AdSenseBanner";

export const metadata: Metadata = {
  title: "Terms & Conditions | Nextsem Academy",
  description: "Read the Nextsem Academy Terms and Conditions to understand your rights and responsibilities when using our platform.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms & Conditions | Nextsem Academy",
    description: "Nextsem Academy's Terms and Conditions cover usage policies, intellectual property rights, and user responsibilities.",
    url: "https://nextsem.online/terms",
  },
  twitter: {
    card: "summary",
    title: "Terms & Conditions | Nextsem Academy",
    description: "Read the terms governing your use of Nextsem Academy.",
  },
};

export default function TermsPage() {
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
          <Scale size={24} />
          <span className="text-xs font-black uppercase tracking-widest">Legal Document</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">Terms of Service</h1>
        <p className="text-xs text-slate-400 font-bold">Last Updated: July 1, 2026</p>

        <hr className="border-slate-850" />

        <AdSenseBanner />

        <div className="space-y-4 text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          <p>
            Welcome to Nextsem Academy. These terms and conditions outline the rules and regulations for the use of Nextsem Academy&apos;s Website, located at https://nextsem.online.
          </p>

          <p>
            By accessing this website we assume you accept these terms and conditions. Do not continue to use Nextsem Academy if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <h3 className="text-base font-black text-white pt-2">License</h3>
          <p>
            Unless otherwise stated, Nextsem Academy and/or its licensors own the intellectual property rights for all material on Nextsem Academy. All intellectual property rights are reserved. You may access this from Nextsem Academy for your own personal use subjected to restrictions set in these terms and conditions.
          </p>

          <AdSenseBanner />

          <h3 className="text-base font-black text-white pt-2">User Accounts</h3>
          <p>
            When you register an account with us using Google Authentication, you must ensure that your account details remain accurate. You are solely responsible for maintaining the confidentiality of your session tokens and security parameters.
          </p>

          <h3 className="text-base font-black text-white pt-2">Reservation of Rights</h3>
          <p>
            We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time.
          </p>

          <h3 className="text-base font-black text-white pt-2">Disclaimer</h3>
          <p>
            To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nextsem Academy makes no warranties regarding curriculum completeness or job guarantees.
          </p>

          <AdSenseBanner />
        </div>

      </div>
    </div>
  );
}
