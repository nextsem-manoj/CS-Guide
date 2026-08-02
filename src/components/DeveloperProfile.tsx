"use client";

import React, { useState } from "react";

interface DeveloperProfileProps {
  name: string;
  role: string;
  salary: string;
  company: string;
  experience: string;
  avatar: string;
  stack: string;
  quote: string;
  photoUrl?: string;
  profileUrl?: string;
  bgGradient?: string;
}

const TABS = ["About", "Stack", "Quote"] as const;
type Tab = typeof TABS[number];

export default function DeveloperProfile({
  name,
  role,
  salary,
  company,
  experience,
  avatar,
  stack,
  quote,
  photoUrl,
  profileUrl,
}: DeveloperProfileProps) {
  const [activeTab, setActiveTab] = useState<Tab>("About");
  const techs = (typeof stack === "string" ? stack.split(",") : []).map((t) => t.trim());

  return (
    <div
      className="my-4 rounded-2xl border shadow-md overflow-hidden relative transition-all duration-300"
      style={{
        background: "linear-gradient(135deg, var(--profile-card-bg-start), var(--profile-card-bg-end))",
        borderColor: "var(--profile-card-border)"
      }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute w-32 h-32 rounded-full blur-[45px] opacity-20 pointer-events-none transition-all duration-300"
        style={{ 
          background: "var(--profile-card-glow)", 
          top: "-16px", 
          right: "-16px" 
        }}
      />

      {/* —— Header Row —— */}
      <div className="flex items-center gap-3 px-4 pt-3 pb-2.5 relative z-10">
        {/* Avatar */}
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 overflow-hidden border"
          style={{ 
            backgroundColor: "var(--profile-card-avatar-bg)",
            borderColor: "var(--profile-card-border)"
          }}
        >
          {photoUrl ? (
            <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            avatar
          )}
        </div>

        {/* Name + label */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span 
              className="text-xs font-black truncate transition-colors duration-300"
              style={{ color: "var(--profile-card-text-primary)" }}
            >
              {name}
            </span>
            {profileUrl && (
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[8px] font-black uppercase tracking-wider bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20 text-blue-500 dark:text-blue-400 hover:bg-blue-500/20 transition-all whitespace-nowrap"
              >
                Profile ↗
              </a>
            )}
          </div>
          <span 
            className="text-[8px] uppercase tracking-widest font-black block mt-0.5"
            style={{ color: "var(--profile-card-text-secondary)" }}
          >
            Real-World Case Study
          </span>
        </div>

        {/* Exp badge */}
        <span className="shrink-0 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-450 whitespace-nowrap">
          {experience} Exp
        </span>
      </div>

      {/* —— Tab Bar —— */}
      <div 
        className="flex border-t relative z-10"
        style={{ borderColor: "var(--profile-card-border)" }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-1.5 text-[10px] font-extrabold transition-all border-b-2"
              style={{
                borderColor: isActive ? "var(--profile-card-border)" : "transparent",
                color: isActive ? "var(--profile-card-text-primary)" : "var(--profile-card-text-secondary)",
                backgroundColor: isActive ? "var(--profile-card-tab-active-bg)" : "transparent"
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* —— Tab Content —— */}
      <div className="px-4 py-2.5 relative z-10 min-h-[60px]">
        {activeTab === "About" && (
          <div className="grid grid-cols-3 gap-2">
            <div 
              className="rounded-xl p-2 border transition-all duration-300"
              style={{ 
                backgroundColor: "var(--profile-card-field-bg)",
                borderColor: "var(--profile-card-border)"
              }}
            >
              <span 
                className="block text-[7px] font-extrabold uppercase tracking-widest mb-0.5"
                style={{ color: "var(--profile-card-text-secondary)" }}
              >
                Role
              </span>
              <span 
                className="text-[10px] font-black leading-tight transition-colors duration-300"
                style={{ color: "var(--profile-card-text-primary)" }}
              >
                {role}
              </span>
            </div>
            
            <div 
              className="rounded-xl p-2 border transition-all duration-300"
              style={{ 
                backgroundColor: "var(--profile-card-field-bg)",
                borderColor: "var(--profile-card-border)"
              }}
            >
              <span 
                className="block text-[7px] font-extrabold uppercase tracking-widest mb-0.5"
                style={{ color: "var(--profile-card-text-secondary)" }}
              >
                Salary
              </span>
              <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-450 leading-tight">
                {salary}
              </span>
            </div>

            <div 
              className="rounded-xl p-2 border transition-all duration-300"
              style={{ 
                backgroundColor: "var(--profile-card-field-bg)",
                borderColor: "var(--profile-card-border)"
              }}
            >
              <span 
                className="block text-[7px] font-extrabold uppercase tracking-widest mb-0.5"
                style={{ color: "var(--profile-card-text-secondary)" }}
              >
                Company
              </span>
              <span 
                className="text-[10px] font-black leading-tight transition-colors duration-300"
                style={{ color: "var(--profile-card-text-primary)" }}
              >
                {company}
              </span>
            </div>
          </div>
        )}

        {activeTab === "Stack" && (
          <div className="flex flex-wrap gap-1">
            {techs.map((tech, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-lg border text-[9px] font-bold"
                style={{ 
                  backgroundColor: "var(--profile-card-field-bg)",
                  borderColor: "var(--profile-card-border)",
                  color: "var(--profile-card-text-primary)"
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {activeTab === "Quote" && (
          <p 
            className="text-[10px] italic leading-relaxed"
            style={{ color: "var(--profile-card-text-primary)" }}
          >
            &ldquo;{quote}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}
