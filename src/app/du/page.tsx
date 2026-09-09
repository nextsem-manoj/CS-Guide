"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DelhiUniversityRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/bca?uni=du");
  }, [router]);

  return (
    <div className="w-full h-screen bg-[#060c18] flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-t-blue-500 border-slate-800 rounded-full animate-spin" />
        <span className="text-xs font-bold text-slate-400">Loading Delhi University Computer Science Hub...</span>
      </div>
    </div>
  );
}
