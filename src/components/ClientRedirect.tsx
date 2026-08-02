"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ClientRedirectProps {
  url: string;
}

export default function ClientRedirect({ url }: ClientRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    router.replace(url);
  }, [router, url]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400 font-mono text-xs">
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-500 mb-3" />
      <div>Redirecting you to the new visual lesson portal...</div>
    </div>
  );
}
