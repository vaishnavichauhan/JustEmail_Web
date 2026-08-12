"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Video,
  HardDrive,
  FileText,
  Calendar,
  CheckCircle2,
  Sparkles,
  Smartphone,
  Users,
  Table as TableIcon,
  LayoutGrid,
  Check,
  X,
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AppsSectionProps {
  providerSlug?: string;
  allowTabSwitching?: boolean;
}

const providerTabs = [
  { id: "google", name: "Google Workspace", logo: "/images/google-workspace.png" },
  { id: "microsoft", name: "Microsoft 365", logo: "/images/microsoft-365.png" },
  { id: "titan", name: "Titan Mail", logo: "/images/titan-mail.png" },
  { id: "rediff", name: "Rediffmail Pro", logo: "/images/rediffmail.png" }
];

// --- APP COMPARISON MATRIX ROWS ---
const appComparisonMatrix = [
  {
    category: "Professional Custom Domain Email",
    icon: Mail,
    google: "Gmail for Business (@yourcompany.com)",
    microsoft: "Outlook & Exchange (@yourcompany.com)",
    titan: "Titan Smart Webmail (@yourcompany.com)",
    rediff: "Rediffmail Pro (@yourcompany.com)"
  },
  {
    category: "HD Video Meetings & Conferencing",
    icon: Video,
    google: "Google Meet (Up to 500 attendees + Recording)",
    microsoft: "Microsoft Teams (Up to 300 attendees + Recording)",
    titan: "Integrated 1-Click Meeting Link",
    rediff: "Basic Video Integration"
  },
  {
    category: "Cloud Storage & Team Shared Drives",
    icon: HardDrive,
    google: "Google Drive (30 GB to 5 TB / user)",
    microsoft: "OneDrive for Business (1 TB cloud storage / user)",
    titan: "Titan Cloud Storage (Up to 30 GB)",
    rediff: "Rediff Pro Inbox Storage (Up to 50 GB)"
  },
  {
    category: "Office Productivity Suite",
    icon: FileText,
    google: "Docs, Sheets, Slides (Real-time Co-authoring)",
    microsoft: "Word, Excel, PowerPoint (Desktop & Web Apps)",
    titan: "Smart Templates & Signature Builder",
    rediff: "Webmail Document Viewer"
  },
  {
    category: "Smart Calendar & Resource Booking",
    icon: Calendar,
    google: "Google Calendar (Team overlay & Room booking)",
    microsoft: "Outlook Calendar & Microsoft Bookings",
    titan: "Titan Integrated Inbox Calendar",
    rediff: "Standard Business Calendar"
  },
  {
    category: "Mobile Apps (iOS & Android)",
    icon: Smartphone,
    google: "Gmail, Meet & Drive Native Apps",
    microsoft: "Outlook, Teams & Office Native Apps",
    titan: "Titan iOS & Android Native App",
    rediff: "Rediffmail Mobile Webmail App"
  }
];

const googleOfficialApps = [
  {
    name: "Gmail for Business",
    category: "Professional Email",
    description: "Custom domain email (@yourcompany.com) with 99.9% uptime SLA, AI smart compose, and anti-phishing shield.",
    icon: Mail,
    bgColor: "bg-red-50 border-red-100 text-red-600 font-bold",
    features: ["Custom @yourcompany.com email", "99.9% AI Spam & Phishing Shield", "Search & Smart Reply"]
  },
  {
    name: "Google Meet",
    category: "Video Meetings",
    description: "Encrypted HD video conferences up to 500 participants with background noise cancellation & cloud recording.",
    icon: Video,
    bgColor: "bg-emerald-50 border-emerald-100 text-emerald-600 font-bold",
    features: ["500 participant HD meetings", "Cloud meeting recording", "Background noise cancellation"]
  },
  {
    name: "Google Drive",
    category: "Cloud Storage",
    description: "Centralized cloud storage with Shared Drives, offline file access, and desktop/mobile auto-sync.",
    icon: HardDrive,
    bgColor: "bg-blue-50 border-blue-100 text-blue-600 font-bold",
    features: ["30 GB to 5 TB storage / user", "Team Shared Drives", "Desktop & Mobile auto-sync"]
  },
  {
    name: "Google Sheets & Slides",
    category: "Spreadsheets & Presentations",
    description: "Co-create data spreadsheets and presentations simultaneously with live cursor tracking & version history.",
    icon: FileText,
    bgColor: "bg-amber-50 border-amber-100 text-amber-600 font-bold",
    features: ["Real-time multi-user editing", "Version history restoration", "MS Excel & PPT compatibility"]
  },
  {
    name: "Google Calendar",
    category: "Smart Scheduling",
    description: "Integrated business calendar with team availability overlay, room booking, and automatic meeting links.",
    icon: Calendar,
    bgColor: "bg-cyan-50 border-cyan-100 text-cyan-600 font-bold",
    features: ["Team calendar overlay", "Room & resource booking", "1-click Meet links"]
  }
];

const microsoftOfficialApps = [
  {
    name: "Outlook & Exchange",
    category: "Enterprise Mailbox",
    description: "50 GB Exchange Online mailbox per user with custom domain, shared calendars, and anti-malware defense.",
    icon: Mail,
    bgColor: "bg-blue-50 border-blue-100 text-blue-600 font-bold",
    features: ["50 GB Exchange inbox", "150 MB attachment limit", "Outlook web, desktop & mobile"]
  },
  {
    name: "Microsoft Teams",
    category: "Video & Channels",
    description: "Host 300-person video meetings, team channel chats, file sharing, and whiteboarding in one app.",
    icon: Video,
    bgColor: "bg-purple-50 border-purple-100 text-purple-600 font-bold",
    features: ["300 attendee HD meetings", "Team channels & chat", "Meeting transcriptions & notes"]
  },
  {
    name: "OneDrive for Business",
    category: "1 TB Storage",
    description: "1 TB personal cloud storage per user with Files-On-Demand, ransomware detection, and secure sharing.",
    icon: HardDrive,
    bgColor: "bg-sky-50 border-sky-100 text-sky-600 font-bold",
    features: ["1 TB cloud storage / user", "Ransomware recovery", "Files-On-Demand sync"]
  },
  {
    name: "Word, Excel & PowerPoint",
    category: "Office Desktop Apps",
    description: "Install full desktop Office applications across 5 PCs/Macs per user with real-time co-authoring.",
    icon: FileText,
    bgColor: "bg-orange-50 border-orange-100 text-orange-600 font-bold",
    features: ["Install on 5 devices per user", "Advanced formulas & AI Copilot", "Offline editing support"]
  }
];

const titanOfficialApps = [
  {
    name: "Titan Webmail & Desktop",
    category: "Smart Email App",
    description: "Modern, clutter-free webmail interface with custom domain (@yourcompany.com), undo send, and signature builder.",
    icon: Mail,
    bgColor: "bg-blue-50 border-blue-100 text-blue-600 font-bold",
    features: ["Custom domain email", "Undo Send (Recall sent mail)", "Rich HTML Signature Builder"]
  },
  {
    name: "Titan Mobile Apps (iOS & Android)",
    category: "Mobile Native App",
    description: "Full-featured native iOS and Android apps with swipe gestures, Dark Mode, and real-time push alerts.",
    icon: Smartphone,
    bgColor: "bg-rose-50 border-rose-100 text-rose-600 font-bold",
    features: ["Instant mobile push alerts", "Swipe gesture actions", "Sleek Dark Mode theme"]
  },
  {
    name: "Titan Calendar App",
    category: "Integrated Calendar",
    description: "Schedule meetings, send invites, and manage group availability directly inside your Titan email view.",
    icon: Calendar,
    bgColor: "bg-cyan-50 border-cyan-100 text-cyan-600 font-bold",
    features: ["Integrated inbox calendar", "Recurring meeting scheduling", "Time zone converter"]
  },
  {
    name: "Titan Contacts & Groups",
    category: "Address Book App",
    description: "Centralized company contact book, distribution lists, and category tags for quick team mailing.",
    icon: Users,
    bgColor: "bg-purple-50 border-purple-100 text-purple-600 font-bold",
    features: ["Shared team contacts", "Distribution lists", "Instant contact search"]
  }
];

const rediffOfficialApps = [
  {
    name: "Rediffmail Pro Webmail",
    category: "Cloud Webmail App",
    description: "High-speed corporate webmail hosted in Tier-4 Indian data centers with custom domain branding.",
    icon: Mail,
    bgColor: "bg-red-50 border-red-100 text-red-600 font-bold",
    features: ["Custom domain email", "100% Indian Data Sovereignty", "24/7 Phone Support"]
  },
  {
    name: "Rediff Mobile App",
    category: "Mobile Webmail App",
    description: "Dedicated mobile app for Android & iOS with low-bandwidth sync and push alerts.",
    icon: Smartphone,
    bgColor: "bg-blue-50 border-blue-100 text-blue-600 font-bold",
    features: ["Real-time push notifications", "Low bandwidth data saver", "Offline reading mode"]
  }
];

export default function OfficialAppsSection({
  providerSlug,
  allowTabSwitching = true
}: AppsSectionProps) {
  const [selectedTab, setSelectedTab] = useState<string>("google");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const effectiveSlug = providerSlug
    ? providerSlug.toLowerCase()
    : selectedTab;

  const isMicrosoft = effectiveSlug === "microsoft-365" || effectiveSlug === "microsoft";
  const isTitan = effectiveSlug === "titan-mail" || effectiveSlug === "titan";
  const isRediff = effectiveSlug === "rediffmail-pro" || effectiveSlug === "rediff" || effectiveSlug === "rediffmail";

  const officialApps = isMicrosoft
    ? microsoftOfficialApps
    : isTitan
      ? titanOfficialApps
      : isRediff
        ? rediffOfficialApps
        : googleOfficialApps;

  const providerTitle = isMicrosoft
    ? "Microsoft 365"
    : isTitan
      ? "Titan Mail"
      : isRediff
        ? "Rediffmail Pro"
        : "Google Workspace";

  return (
    <section className="py-20 bg-white border-t border-gray-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-extrabold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Applications Included (Side-by-Side Breakdown)</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Official Applications Included Comparison
          </h2>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Side-by-side comparison of core apps included across Google Workspace, Microsoft 365, Titan Mail, and Rediffmail Pro.
          </p>

          {/* View Switcher Toggle (Table Matrix vs Card Grid) */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all border ${viewMode === "table"
                  ? "bg-[#0B1437] text-white border-[#0B1437] shadow-md"
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
            >
              <TableIcon className="w-4 h-4 text-blue-400" />
              <span>Side-by-Side Table Matrix</span>
            </button>

            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all border ${viewMode === "grid"
                  ? "bg-[#0B1437] text-white border-[#0B1437] shadow-md"
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
            >
              <LayoutGrid className="w-4 h-4 text-blue-400" />
              <span>Provider Card Grid</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW MODE 1: SIDE-BY-SIDE APPLICATION COMPARISON TABLE MATRIX             */}
        {/* ========================================================================= */}
        {viewMode === "table" && (
          <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-xl bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-[#0B1437] via-[#14214D] to-[#0B1437] text-white border-b border-slate-800">
                  <th className="p-6 text-left w-72 min-w-[240px] text-xs font-extrabold text-white uppercase tracking-wider">
                    Application Category
                  </th>
                  <th className="p-6 text-left min-w-[200px]">
                    <div className="flex items-center gap-2">
                      <Image src="/images/google-workspace.png" alt="Google" width={24} height={24} className="object-contain" />
                      <span className="text-sm font-extrabold text-white">Google Workspace</span>
                    </div>
                  </th>
                  <th className="p-6 text-left min-w-[200px]">
                    <div className="flex items-center gap-2">
                      <Image src="/images/microsoft-365.png" alt="Microsoft" width={24} height={24} className="object-contain" />
                      <span className="text-sm font-extrabold text-white">Microsoft 365</span>
                    </div>
                  </th>
                  <th className="p-6 text-left min-w-[200px]">
                    <div className="flex items-center gap-2">
                      <Image src="/images/titan-mail.png" alt="Titan" width={24} height={24} className="object-contain" />
                      <span className="text-sm font-extrabold text-white">Titan Mail</span>
                    </div>
                  </th>
                  <th className="p-6 text-left min-w-[200px]">
                    <div className="flex items-center gap-2">
                      <Image src="/images/rediffmail.png" alt="Rediff" width={24} height={24} className="object-contain" />
                      <span className="text-sm font-extrabold text-white">Rediffmail Pro</span>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
                {appComparisonMatrix.map((row, idx) => {
                  const RowIcon = row.icon;
                  return (
                    <tr key={row.category} className="hover:bg-slate-50/70 transition-colors">
                      {/* Category Title Column */}
                      <td className="p-6 bg-gray-50/60 font-extrabold text-gray-900 border-r border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                            <RowIcon className="w-4 h-4" />
                          </div>
                          <span>{row.category}</span>
                        </div>
                      </td>

                      {/* Google */}
                      <td className="p-6">
                        <div className="font-bold text-gray-900 leading-snug">{row.google}</div>
                        <div className="text-[10px] text-emerald-600 font-extrabold flex items-center gap-1 mt-1">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Included Official App</span>
                        </div>
                      </td>

                      {/* Microsoft */}
                      <td className="p-6">
                        <div className="font-bold text-gray-900 leading-snug">{row.microsoft}</div>
                        <div className="text-[10px] text-emerald-600 font-extrabold flex items-center gap-1 mt-1">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Included Official App</span>
                        </div>
                      </td>

                      {/* Titan */}
                      <td className="p-6">
                        <div className="font-bold text-gray-900 leading-snug">{row.titan}</div>
                        <div className="text-[10px] text-emerald-600 font-extrabold flex items-center gap-1 mt-1">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Included Official App</span>
                        </div>
                      </td>

                      {/* Rediff */}
                      <td className="p-6">
                        <div className="font-bold text-gray-900 leading-snug">{row.rediff}</div>
                        <div className="text-[10px] text-emerald-600 font-extrabold flex items-center gap-1 mt-1">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Included Official App</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW MODE 2: PROVIDER TAB CARD GRID                                      */}
        {/* ========================================================================= */}
        {viewMode === "grid" && (
          <div className="space-y-8">
            {/* Interactive Provider Selector Tabs */}
            {!providerSlug && allowTabSwitching && (
              <div className="flex items-center justify-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                {providerTabs.map((tab) => {
                  const isSelected = selectedTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id)}
                      className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all shrink-0 ${isSelected
                          ? "bg-[#0B1437] text-white border-[#0B1437] shadow-lg scale-[1.02]"
                          : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-2xs"
                        }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 border border-gray-100 shadow-xs">
                        <Image
                          src={tab.logo}
                          alt={tab.name}
                          width={28}
                          height={28}
                          className="object-contain max-h-6 w-auto"
                        />
                      </div>
                      <span className="text-xs font-extrabold">{tab.name}</span>
                    </button>
                  );
                })}
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={effectiveSlug}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {officialApps.map((app, idx) => {
                  const Icon = app.icon;
                  return (
                    <div
                      key={app.name}
                      className="p-7 rounded-3xl bg-[#F8FAFC] border border-gray-200/90 hover:border-blue-400 hover:bg-white transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <div className={`w-12 h-12 rounded-2xl ${app.bgColor} border flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-extrabold text-blue-700 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                            {app.category}
                          </span>
                        </div>

                        <h3 className="text-xl font-extrabold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {app.name}
                        </h3>

                        <p className="text-xs text-gray-600 leading-relaxed mb-6">
                          {app.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-200/60 space-y-2">
                        {app.features.map((feat) => (
                          <div key={feat} className="flex items-center gap-2 text-[11px] font-semibold text-gray-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
}
