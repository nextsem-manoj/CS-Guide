"use client";

import React from "react";
import Link from "next/link";

interface NextSemLogoBadgeProps {
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  showWordmark?: boolean;
}

/**
 * Authentic NextSem Academy Logo Badge
 * - Squircle Box: Electric Blue border (#2563eb)
 * - Letter 'N': Guaranteed Vibrant Emerald Green (#04AA6D)
 * - Letter 'S': Guaranteed Pure White (#ffffff)
 * - Wordmark: "Academy" with theme-aware styling
 */
export function NextSemEmblem({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 select-none block"
    >
      {/* Outer Squircle Box with Vibrant Emerald Green Border */}
      <rect x="2" y="2" width="36" height="36" rx="10" fill="#090d16" stroke="#04AA6D" strokeWidth="2.5" />
      <rect x="4" y="4" width="32" height="32" rx="8" stroke="#04AA6D" strokeWidth="0.6" strokeOpacity="0.4" />

      {/* Bold N in Vibrant Emerald Green (#04AA6D) */}
      <path
        d="M 10 29 V 11 L 21 29 V 11"
        stroke="#04AA6D"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Bold S in Pure White (#FFFFFF) */}
      <path
        d="M 31 15.5 C 31 11, 23 11, 23 17 C 23 23, 31 22, 31 27 C 31 32, 23 32, 23 27.5"
        stroke="#FFFFFF"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function NextSemLogoBadge({
  size = "md",
  href = "/",
  className = "",
  showWordmark = true
}: NextSemLogoBadgeProps) {
  const emblemSize = size === "sm" ? 26 : size === "lg" ? 40 : 32;

  const content = (
    <div
      className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-white dark:bg-[#090d16] border border-slate-200 dark:border-[#04AA6D]/60 shadow-sm dark:shadow-[0_0_12px_rgba(4,170,109,0.3)] transition-all hover:scale-105 select-none shrink-0 ${className}`}
    >
      <NextSemEmblem size={emblemSize} />
      {showWordmark && (
        <span className="font-black text-sm text-slate-900 dark:text-white tracking-tight">
          Academy
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block" title="NextSem Academy Home">
        {content}
      </Link>
    );
  }

  return content;
}
