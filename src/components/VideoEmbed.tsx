"use client";

import React, { useState } from "react";
import { Play, Tv } from "lucide-react";

interface VideoEmbedProps {
  title: string;
  url: string; // YouTube embed URL or static video URL
  thumbnail?: string;
  duration?: string;
}

export default function VideoEmbed({ title, url, thumbnail, duration }: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const G = "#39FF14"; // brand green

  return (
    <div className="my-8 rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
      {/* Video Container */}
      <div className="relative aspect-video w-full bg-black flex items-center justify-center">
        {isPlaying ? (
          url.includes(".mp4") || url.includes("mp4?") ? (
            <video
              src={url}
              controls
              autoPlay
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <iframe
              src={`${url}${url.includes("?") ? "&" : "?"}autoplay=1`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          )
        ) : (
          <>
            {/* Thumbnail */}
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 hover:scale-[1.02] transition-transform duration-700"
              />
            ) : (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center text-slate-700 pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(57,255,20,0.03) 0%, transparent 80%)",
                }}
              >
                <Tv size={64} className="stroke-[1]" />
              </div>
            )}

            {/* Play overlay button */}
            <button
              onClick={() => setIsPlaying(true)}
              className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center bg-black/80 border-2 transition-all hover:scale-110 active:scale-95 group shadow-[0_0_30px_rgba(0,0,0,0.8)]"
              style={{
                borderColor: `${G}80`,
                boxShadow: `0 0 30px ${G}30`,
              }}
            >
              <Play
                size={22}
                className="transition-colors group-hover:scale-105"
                style={{ fill: G, stroke: G }}
              />
            </button>

            {/* Duration Badge */}
            {duration && (
              <span className="absolute bottom-4 right-4 px-2 py-0.5 rounded bg-black/80 border border-white/10 text-[10px] font-black text-white uppercase tracking-wider">
                {duration}
              </span>
            )}
          </>
        )}
      </div>

      {/* Info bar */}
      <div className="p-4 bg-slate-900/60 dark:bg-black/60 border-t border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ background: G }}
            />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: G }} />
          </span>
          <span className="text-xs font-black text-white">{title}</span>
        </div>
        <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest">
          Video Walkthrough
        </span>
      </div>
    </div>
  );
}
