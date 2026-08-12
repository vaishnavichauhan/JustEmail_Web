"use client";

import { motion } from "framer-motion";
import {
  Wrench,
  CheckCircle2,
  Zap,
  Calendar,
  MessageSquare,
  Settings,
  ShieldCheck,
  Layers,
  Bell,
  Clock,
  FileText,
  RotateCcw,
  Lock,
  Search
} from "lucide-react";

interface ToolsSectionProps {
  providerSlug?: string;
}

const googleToolsIncluded = [
  {
    name: "Google Calendar",
    category: "Scheduling Tool",
    description: "Integrated business calendar with team availability overlay, meeting room booking, and automatic video links.",
    icon: Calendar,
    color: "text-cyan-400"
  },
  {
    name: "Google Chat & Spaces",
    category: "Messaging Tool",
    description: "Direct messaging, threaded project team spaces, file attachments, and automated bot integrations.",
    icon: MessageSquare,
    color: "text-teal-400"
  },
  {
    name: "Google Admin Console",
    category: "Management Tool",
    description: "Centralized security policies, enforced 2-factor authentication, SAML SSO, and endpoint device control.",
    icon: Settings,
    color: "text-indigo-400"
  },
  {
    name: "Google Security & Vault",
    category: "Compliance Tool",
    description: "Automated email archiving, legal hold, eDiscovery search, and audit log exports for regulatory compliance.",
    icon: ShieldCheck,
    color: "text-purple-400"
  }
];

const microsoftToolsIncluded = [
  {
    name: "Exchange Admin Center",
    category: "Management Tool",
    description: "Manage mailboxes, distribution groups, shared mailboxes, and automated mail flow transport rules.",
    icon: Settings,
    color: "text-blue-400"
  },
  {
    name: "Defender for Office 365",
    category: "Security Shield",
    description: "Protects corporate inboxes against safe links, safe attachments, zero-day malware, and spoofing.",
    icon: ShieldCheck,
    color: "text-emerald-400"
  },
  {
    name: "SharePoint Online",
    category: "Team Intranet Tool",
    description: "Share and manage team content, documents, knowledge, and custom intranet applications seamlessly.",
    icon: Layers,
    color: "text-purple-400"
  },
  {
    name: "Microsoft Bookings",
    category: "Appointment Tool",
    description: "Allow clients and customers to schedule and manage appointments directly with your team online.",
    icon: Calendar,
    color: "text-teal-400"
  }
];

const titanToolsIncluded = [
  {
    name: "Read Receipts & Link Tracking",
    category: "Email Intelligence Tool",
    description: "Get real-time push alerts the moment a client opens your email or clicks an included proposal link.",
    icon: Bell,
    color: "text-amber-400"
  },
  {
    name: "Follow-Up Reminders",
    category: "Productivity Tool",
    description: "Automated reminders if a recipient hasn't responded within your chosen timeframe so no deal is lost.",
    icon: Clock,
    color: "text-purple-400"
  },
  {
    name: "Smart Email Templates",
    category: "Speed Tool",
    description: "Save frequently used sales pitches and customer support answers as templates for 1-click email sending.",
    icon: FileText,
    color: "text-emerald-400"
  },
  {
    name: "1-Click Mailbox Migration Tool",
    category: "Transfer Tool",
    description: "Seamlessly import historical emails, sub-folders, and contacts from Gmail, Yahoo, or cPanel in minutes.",
    icon: RotateCcw,
    color: "text-blue-400"
  }
];

const rediffToolsIncluded = [
  {
    name: "Enterprise Anti-Spam Guard",
    category: "Security Shield",
    description: "Shields your company inboxes against ransomware, phishing, malware, and email address spoofing.",
    icon: ShieldCheck,
    color: "text-emerald-400"
  },
  {
    name: "Domain Admin Console",
    category: "Management Tool",
    description: "Simple administrator panel to provision mailboxes, reset passwords, and set storage quota limits.",
    icon: Settings,
    color: "text-indigo-400"
  }
];

export default function IncludedToolsSection({ providerSlug = "google-workspace" }: ToolsSectionProps) {
  const normSlug = (providerSlug || "").toLowerCase();

  const isMicrosoft = normSlug === "microsoft-365" || normSlug === "microsoft";
  const isTitan = normSlug === "titan-mail" || normSlug === "titan";
  const isRediff = normSlug === "rediffmail-pro" || normSlug === "rediff" || normSlug === "rediffmail";

  const toolsIncluded = isMicrosoft
    ? microsoftToolsIncluded
    : isTitan
      ? titanToolsIncluded
      : isRediff
        ? rediffToolsIncluded
        : googleToolsIncluded;

  const providerTitle = isMicrosoft
    ? "Microsoft 365"
    : isTitan
      ? "Titan Mail"
      : isRediff
        ? "Rediffmail Pro"
        : "Google Workspace";

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">

        {/* Section 2 Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-extrabold uppercase tracking-wider mb-4">
            <Wrench className="w-4 h-4 text-emerald-400" />
            <span>Built-In Tools & Security Features</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Productivity & Security Tools Included in <br />
            <span className="text-blue-400">{providerTitle}</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Administrative management tools, email intelligence features, automated security shields, and scheduling tools built right into your account.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {toolsIncluded.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-7 rounded-3xl bg-slate-800/80 border border-slate-700/80 hover:border-blue-400/80 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className={`w-6 h-6 ${tool.color}`} />
                    </div>
                    <span className="text-[10px] font-extrabold text-blue-300 uppercase tracking-wider bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-400/20">
                      {tool.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {tool.name}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-700/60 flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Included at 0 Extra Cost</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Trust Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900/60 via-slate-800/80 to-purple-900/60 border border-slate-700 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 text-blue-300 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-lg font-extrabold text-white">Full License Activation & Admin Delegation</div>
              <p className="text-xs text-slate-300 mt-0.5">
                Our certified team handles 100% of DKIM, SPF, DMARC security setup and mailbox provisioning for {providerTitle}.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
