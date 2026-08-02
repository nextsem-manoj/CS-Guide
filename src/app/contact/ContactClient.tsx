"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, MapPin, Send, HelpCircle } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import AdSenseBanner from "../../components/AdSenseBanner";

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSubmitting(true);
      try {
        await addDoc(collection(db, "contact_submissions"), {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          timestamp: serverTimestamp()
        });
        setSubmitted(true);
      } catch (err) {
        console.error("Error submitting contact form: ", err);
        const error = err as Error;
        alert("Failed to send message: " + error.message);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert("Please fill in all inputs.");
    }
  };

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

      <div className="max-w-4xl mx-auto px-6 pt-6 shrink-0">
        <AdSenseBanner />
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-6 grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
        
        {/* Contact Info & Details */}
        <div className="space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-500">Contact Support</span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">Get in Touch</h1>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-bold">
              Have questions about our Frontend development syllabus, credentials, or Firebase integrations? Send us a message and our support engineers will get back to you shortly.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <span className="block text-[10px] font-black uppercase text-slate-500">Email Address</span>
                <a href="mailto:nextsem.academy@gmail.com" className="text-xs md:text-sm text-white font-bold hover:underline">
                  nextsem.academy@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <span className="block text-[10px] font-black uppercase text-slate-500">Office Location</span>
                <span className="text-xs md:text-sm text-slate-350 font-bold">
                  Nextsem Academy New delhi India
                </span>
              </div>
            </div>
          </div>

          <AdSenseBanner />

          {/* FAQ Preview */}
          <div className="p-4 bg-slate-900/30 border border-slate-850 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-slate-200">
              <HelpCircle size={16} className="text-purple-400" />
              <h4 className="text-xs font-black uppercase tracking-wide">Quick FAQ</h4>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed font-bold">
              <strong>Is nextsem free?</strong> Yes! Our web development reading modules and playground workspace are completely free.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-slate-900/40 border border-slate-850/60 p-6 rounded-3xl shadow-xl flex flex-col justify-center">
          {submitted ? (
            <div className="text-center space-y-4 py-8 animate-in fade-in duration-200">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                <Send size={20} className="animate-pulse" />
              </div>
              <h3 className="text-base font-black">Message Sent Successfully!</h3>
              <p className="text-xs text-slate-400 font-bold max-w-xs mx-auto">
                Thank you for contacting Nextsem Academy. We will reply to your inquiry within 24 business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-black text-blue-400 hover:underline pt-2"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rahul Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="e.g. rahul@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Your Inquiry</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/85 border-t-transparent rounded-full animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <span>Send Message</span>
                )}
              </button>
            </form>
          )}
        </div>

      </div>

      <div className="max-w-4xl mx-auto px-6 pb-6 shrink-0">
        <AdSenseBanner />
      </div>
    </div>
  );
}
