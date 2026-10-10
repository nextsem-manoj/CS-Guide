"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function McaRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/bca?prog=ignou-mca");
  }, [router]);

  return (
    <div className="w-full h-screen bg-[#1d2a35] flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-t-amber-500 border-slate-800 rounded-full animate-spin" />
        <span className="text-xs font-bold text-slate-400">Loading IGNOU MCA (Master of Computer Applications) Hub...</span>
      </div>
    </div>
  );
}
