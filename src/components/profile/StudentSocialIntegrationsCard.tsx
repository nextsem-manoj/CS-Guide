"use client";

import React, { useState, useEffect } from "react";
import { useStudentProgress } from "@/context/StudentProgressContext";
import { ExternalLink, CheckCircle2, Share2, Save } from "lucide-react";

export default function StudentSocialIntegrationsCard() {
  const { socialLinks, updateSocialLinks, completedDays } = useStudentProgress();

  const [linkedin, setLinkedin] = useState(socialLinks?.linkedin || "");
  const [instagram, setInstagram] = useState(socialLinks?.instagram || "");
  const [whatsapp, setWhatsapp] = useState(socialLinks?.whatsapp || "");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setLinkedin(socialLinks?.linkedin || "");
    setInstagram(socialLinks?.instagram || "");
    setWhatsapp(socialLinks?.whatsapp || "");
  }, [socialLinks]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSocialLinks({
      linkedin: linkedin.trim(),
      instagram: instagram.trim(),
      whatsapp: whatsapp.trim()
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  // Helper formats
  const cleanPhone = whatsapp.replace(/[^0-9]/g, "");
  const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}` : "";

  const linkedinUrl = linkedin.trim().startsWith("http")
    ? linkedin.trim()
    : linkedin.trim()
    ? `https://linkedin.com/in/${linkedin.trim().replace(/^@/, "")}`
    : "";

  const instagramUrl = instagram.trim().startsWith("http")
    ? instagram.trim()
    : instagram.trim()
    ? `https://instagram.com/${instagram.trim().replace(/^@/, "")}`
    : "";

  // WhatsApp Share Practical Progress text
  const shareMessage = encodeURIComponent(
    `🚀 Hi! I am practicing full-stack BCA coding on NextSem Academy.\n` +
    `✅ Completed: ${completedDays.length} Practical Coding Days with real GitHub pushes!\n` +
    `Check out the BCA Practical Portal: https://cs.nextsem.online/bca/practical`
  );
  const shareUrl = `https://api.whatsapp.com/send?text=${shareMessage}`;

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-neutral-800 pb-3">
        <div>
          <h4 className="text-xs sm:text-sm font-black text-black dark:text-white uppercase tracking-wider flex items-center gap-2">
            <span>Professional &amp; Social Integrations</span>
            <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-800">
              Portfolio &amp; Network
            </span>
          </h4>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Link your professional profiles for job recruiters and share verified coding milestones on WhatsApp.
          </p>
        </div>

        {/* WhatsApp Quick Share Button */}
        <a
          href={shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer"
          title="Share your practical coding milestones with mentors or friends on WhatsApp"
        >
          <Share2 size={13} />
          <span>Share on WhatsApp</span>
        </a>
      </div>

      <form onSubmit={handleSave} className="space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* LinkedIn Input */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-[#0a66c2] text-white flex items-center justify-center text-[10px] font-bold">
                  in
                </span>
                <span>LinkedIn</span>
              </label>
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
                >
                  <span>Visit</span>
                  <ExternalLink size={10} />
                </a>
              )}
            </div>
            <input
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="username or profile link"
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
            />
          </div>

          {/* Instagram Input */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center text-[10px] font-bold">
                  ig
                </span>
                <span>Instagram</span>
              </label>
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
                >
                  <span>Visit</span>
                  <ExternalLink size={10} />
                </a>
              )}
            </div>
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="@username or profile link"
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
            />
          </div>

          {/* WhatsApp Input */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-[#25d366] text-white flex items-center justify-center text-[10px] font-bold">
                  wa
                </span>
                <span>WhatsApp Phone</span>
              </label>
              {waUrl && (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5"
                >
                  <span>Chat</span>
                  <ExternalLink size={10} />
                </a>
              )}
            </div>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="+91 9876543210"
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
            />
          </div>

        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="text-[10px] text-slate-400 font-mono">
            {isSaved ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 size={12} /> Social links saved &amp; synchronized!
              </span>
            ) : (
              <span>Stored securely &amp; synced across devices</span>
            )}
          </div>

          <button
            type="submit"
            className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Save size={13} />
            <span>Save Profiles</span>
          </button>
        </div>
      </form>
    </div>
  );
}
