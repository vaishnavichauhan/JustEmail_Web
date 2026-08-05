"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  RefreshCcw,
  FileCheck2,
  KeyRound,
  Headphones,
  Layers,
  BarChart3,
  MailCheck
} from "lucide-react";
import Image from "next/image";

const migrationSteps = [
  {
    step: "01",
    title: "Pre-Migration Domain & DNS Audit",
    timeframe: "Day 1 • 30 Mins",
    description: "Our certified engineers inspect your domain's DNS zones, MX records, SPF, DKIM, and DMARC parameters to ensure clean IP deliverability.",
    icon: FileCheck2,
    badge: "DNS & Anti-Spam",
    highlights: ["SPF & DKIM pre-validation", "MX TTL optimization", "Blacklist & IP reputation scan"]
  },
  {
    step: "02",
    title: "Background Mailbox Data Migration",
    timeframe: "Day 1-2 • Background Sync",
    description: "We execute automated delta IMAP/OAuth migration for all emails, sub-folders, contacts, and calendar events without any user downtime.",
    icon: RefreshCcw,
    badge: "0% Interruption",
    highlights: ["Incremental delta sync", "PST/IMAP cloud transfer", "Complete folder hierarchy preserved"]
  },
  {
    step: "03",
    title: "Seamless MX Switch & Cutover",
    timeframe: "Day 2 • 15 Mins Switch",
    description: "MX records are switched to your new provider (Google Workspace, M365, Titan, or Rediffmail Pro). Incoming emails route instantly with 0 data loss.",
    icon: MailCheck,
    badge: "Zero Email Loss",
    highlights: ["Dual-delivery routing", "0-minute mail server downtime", "Live MX propagation tracking"]
  },
  {
    step: "04",
    title: "Post-Migration Support & Training",
    timeframe: "Ongoing • 24/7 SLA",
    description: "We assist your team with Outlook/Mobile app configuration, setup admin delegation policies, and provide 24/7 priority support.",
    icon: Headphones,
    badge: "< 15 Min Ticket SLA",
    highlights: ["Dedicated Account Manager", "Outlook & Mobile App Sync", "Admin console orientation"]
  }
];

const hybridAdvantages = [
  {
    title: "Hybrid Domain Cost Optimization",
    desc: "Assign premium Google Workspace or M365 licenses to CXOs/Managers while provisioning cost-effective Titan or Rediffmail Pro to field & operation teams under the exact same domain (@yourcompany.com).",
    icon: Layers,
    stats: "Save up to 60% on total email licensing costs"
  },
  {
    title: "Unified Billing & Indian GST Invoice",
    desc: "Consolidate all business mailboxes across multiple cloud providers under a single monthly or annual invoice with 18% GST input tax credit.",
    icon: BarChart3,
    stats: "100% Tax Compliant Indian Invoicing"
  }
];

export default function EmailMigrationWorkflowSection() {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">

        {/* --- 1. MIGRATION ROADMAP HEADER --- */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-extrabold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Zero-Downtime Guarantee</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            How We Deploy & Migrate <br />
            <span className="text-blue-400">Your Business Mailboxes</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Our 4-step managed migration workflow ensures 100% data preservation, zero email loss, and seamless MX record cutover with round-the-clock Indian technical support.
          </p>
        </div>

        {/* --- 2. 4-STEP MIGRATION GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {migrationSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-slate-800/80 border border-slate-700/80 hover:border-blue-400/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 group relative"
              >
                <div>
                  {/* Top Bar: Icon + Step Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-700 group-hover:text-blue-400/40 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold bg-blue-500/10 text-blue-300 border border-blue-400/20 uppercase tracking-wider mb-3">
                    {item.badge}
                  </span>

                  <h3 className="text-lg font-extrabold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>

                  <div className="text-[11px] font-semibold text-emerald-400 mb-3 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.timeframe}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-700/60 space-y-2">
                  {item.highlights.map((point) => (
                    <div key={point} className="flex items-center gap-2 text-[11px] text-slate-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* --- 3. HYBRID ARCHITECTURE & COST SAVINGS CARD --- */}
        <div className="bg-gradient-to-r from-blue-900/60 via-slate-800/80 to-purple-900/60 rounded-3xl p-8 sm:p-12 border border-slate-700 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-extrabold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Enterprise Cost Efficiency</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Mix Google Workspace & Titan Under 1 Domain
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Why pay full premium pricing for every single user? Our hybrid domain routing allows you to combine high-tier cloud mailboxes (Google Workspace / M365) with cost-effective Titan or Rediffmail Pro mailboxes for your front-line workforce.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {hybridAdvantages.map((adv) => {
                  const Icon = adv.icon;
                  return (
                    <div key={adv.title} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-700/80 space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs font-extrabold text-white">{adv.title}</h4>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{adv.desc}</p>
                      <div className="text-[10px] font-bold text-emerald-400 pt-1">{adv.stats}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-slate-900/80 border border-slate-700 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <KeyRound className="w-8 h-8" />
              </div>
              <div>
                <div className="text-xl font-black text-white">Ready to Migrate?</div>
                <p className="text-xs text-slate-400 mt-1">Get a free migration strategy & MX record assessment from our certified team.</p>
              </div>
              <a
                href="https://wa.me/919999999999?text=Hi%20Justemail,%20I%20want%20a%20free%20business%20email%20migration%20assessment"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Speak to Migration Expert</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
