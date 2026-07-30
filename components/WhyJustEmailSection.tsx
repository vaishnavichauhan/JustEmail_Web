"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Headphones, 
  RefreshCw, 
  Settings, 
  CheckCircle2, 
  Sparkles,
  Zap,
  ArrowRight,
  Lock,
  Clock
} from "lucide-react";
import Link from "next/link";

const whyJePillars = [
  {
    num: "01",
    icon: Settings,
    badge: "100% Managed Service",
    title: "Expert Admin Panel Setup & Managed Services",
    description: "Certified Google & Microsoft engineers configure your DNS security (DKIM, SPF, DMARC) and security policies.",
    iconColor: "bg-indigo-600 text-white shadow-indigo-500/25",
    accentBorder: "hover:border-indigo-400",
    bullets: ["Turnkey DKIM/SPF/DMARC", "Role-Based Access Control", "Proactive Security Audits"]
  },
  {
    num: "02",
    icon: RefreshCw,
    badge: "Zero-Downtime Cutover",
    title: "Free Data & MX Record Migration Support",
    description: "Seamless automated cross-tenant data migration for emails, contacts, and calendars without missing a single message.",
    iconColor: "bg-emerald-600 text-white shadow-emerald-500/25",
    accentBorder: "hover:border-emerald-400",
    bullets: ["0% Business Interruption", "PST / IMAP Cloud Transfer", "Dedicated Migration Engineers"]
  },
  {
    num: "03",
    icon: Headphones,
    badge: "< 15 Min SLA Support",
    title: "24/7 Dedicated Technical Support",
    description: "Direct WhatsApp, phone hotline, and priority ticket support from certified email engineers anytime, day or night.",
    iconColor: "bg-purple-600 text-white shadow-purple-500/25",
    accentBorder: "hover:border-purple-400",
    bullets: ["Direct Phone & WhatsApp", "< 15 Min Ticket SLA", "Dedicated Account Manager"]
  }
];

export default function WhyJustEmailSection() {
  return (
    <section id="why-je" className="py-20 bg-[#F8FAFC] border-t border-gray-200/80 relative overflow-hidden">
      
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>The Justemail Difference</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 flex items-center justify-center gap-3">
            <span>Why</span>
            <Image
              src="/images/justemail-logo.png"
              alt="Justemail Logo"
              width={220}
              height={60}
              priority
              className="h-10 sm:h-12 md:h-14 w-auto object-contain"
            />
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Core pillars of our enterprise email management, migration support, and 24/7 technical administration.
          </p>
        </div>

        {/* 3 Feature Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {whyJePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`p-7 sm:p-8 rounded-3xl bg-white border border-gray-200/90 ${pillar.accentBorder} transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group relative overflow-hidden`}
              >
                <div>
                  {/* Top Bar: Icon + Step Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl ${pillar.iconColor} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-gray-200 group-hover:text-blue-200 transition-colors">
                      {pillar.num}
                    </span>
                  </div>

                  {/* Badge */}
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 rounded-md bg-gray-100 text-gray-700 text-[11px] font-bold uppercase tracking-wider">
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-extrabold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                {/* Bullets List */}
                <div className="pt-4 border-t border-gray-100 space-y-2">
                  {pillar.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
