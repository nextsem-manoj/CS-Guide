import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#0b0f19] border-t border-slate-900 text-slate-400 py-8 w-full mt-auto select-none">
      <div className="max-w-[1600px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo and Tagline */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="Nextsem Logo" className="w-6 h-6 rounded-md border border-emerald-500/20" />
            <span className="text-white font-black text-xs md:text-sm tracking-wider uppercase">Nextsem Academy</span>
          </div>
          <span className="text-[10px] text-slate-500 font-bold">Start your journey to become a job-ready Front End Developer.</span>
        </div>

        {/* Legal Pages & Links required by AdSense */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-black uppercase tracking-wider">
          <Link href="/about" className="hover:text-white transition-colors cursor-pointer">About Us</Link>
          <Link href="/contact" className="hover:text-white transition-colors cursor-pointer">Contact Us</Link>
          <Link href="/privacy" className="hover:text-white transition-colors cursor-pointer">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors cursor-pointer">Terms of Service</Link>
          <Link href="/sitemap" className="hover:text-emerald-350 text-emerald-450 transition-colors cursor-pointer flex items-center gap-1">Sitemap</Link>
        </div>

        {/* Copyright notice */}
        <div className="text-[10px] text-slate-500 font-bold text-center md:text-right">
          <span>© {new Date().getFullYear()} Nextsem. All rights reserved.</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
