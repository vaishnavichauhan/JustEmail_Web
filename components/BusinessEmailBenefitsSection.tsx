"use client";

import { motion } from "framer-motion";
import {
  Building2,
  ShieldCheck,
  Calendar,
  Cloud,
  Smartphone,
  ShieldAlert,
  Sparkles,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const benefits = [
  {
    icon: Building2,
    title: "Professional Brand Identity",
    description: "Build instant trust and credibility with clients using branded email addresses (@yourcompany.com) instead of free consumer webmail.",
    color: "text-blue-600 bg-blue-50 border-blue-100"
  },
  {
    icon: ShieldCheck,
    title: "Secure Business Communication",
    description: "Protect sensitive corporate communications with enterprise SSL/TLS encryption, DKIM authentication, and strict anti-phishing protocols.",
    color: "text-indigo-600 bg-indigo-50 border-indigo-100"
  },
  {
    icon: Calendar,
    title: "Shared Calendars",
    description: "Effortlessly coordinate team meetings, share group availability, and schedule resources with integrated Google & Outlook calendars.",
    color: "text-purple-600 bg-purple-50 border-purple-100"
  },
  {
    icon: Cloud,
    title: "Cloud Collaboration",
    description: "Co-author documents, spreadsheets, and presentations in real-time with built-in Google Docs or Microsoft 365 cloud office suites.",
    color: "text-emerald-600 bg-emerald-50 border-emerald-100"
  },
  {
    icon: Smartphone,
    title: "Anywhere Access",
    description: "Stay connected across all devices with instant synchronization between webmail, mobile apps (iOS & Android), and Outlook desktop.",
    color: "text-amber-600 bg-amber-50 border-amber-100"
  },
  {
    icon: ShieldAlert,
    title: "Spam & Virus Protection",
    description: "Stop 99.9% of malware, ransomware, and phishing threats before they hit inboxes using AI-powered anti-spam filtering shields.",
    color: "text-rose-600 bg-rose-50 border-rose-100"
  }
];

export default function BusinessEmailBenefitsSection() {
  return (
    <section className="py-20 bg-white border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why You Need Business Email</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Business Email Benefits
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Discover why modern companies choose professional custom-domain email to boost credibility, security, and team productivity.
          </p>
        </div>

        {/* 6 Benefit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="p-8 rounded-3xl bg-[#F8FAFC] border border-gray-200/90 hover:border-blue-300 hover:bg-white transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${benefit.color} border flex items-center justify-center mb-6 shadow-xs group-hover:scale-105 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* <div className="pt-6 mt-6 border-t border-gray-200/60 flex items-center gap-1 text-xs font-extrabold text-blue-600 group-hover:translate-x-1 transition-transform">
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div> */}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
