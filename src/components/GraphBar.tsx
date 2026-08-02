"use client";

import React from "react";

interface GraphItem {
  label: string;
  value: number; // percentage or numerical value
  displayValue?: string; // string value to display (e.g. "₹24 LPA" or "84%")
  color?: string;
}

interface GraphBarProps {
  title: string;
  subtitle?: string;
  items: GraphItem[];
}

export default function GraphBar({ title, subtitle, items }: GraphBarProps) {
  const G = "#39FF14"; // brand green
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <div className="my-8 rounded-3xl p-6 bg-slate-900/60 dark:bg-black/60 border border-slate-800 shadow-xl">
      <div className="mb-4">
        <h4 className="text-white text-base font-black tracking-wide leading-tight">
          {title}
        </h4>
        {subtitle && (
          <p className="text-slate-400 text-xs mt-0.5">{subtitle}</p>
        )}
      </div>

      <div className="space-y-4">
        {safeItems.map((item, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-300">{item.label}</span>
              <span style={{ color: item.color || G }}>
                {item.displayValue || `${item.value}%`}
              </span>
            </div>
            
            {/* Track */}
            <div className="h-3 bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/30">
              {/* Fill */}
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${item.value}%`,
                  background: item.color || G,
                  boxShadow: `0 0 10px ${item.color || G}66`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
