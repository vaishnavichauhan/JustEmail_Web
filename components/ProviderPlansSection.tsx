"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  ArrowRight, 
  HardDrive, 
  Zap, 
  SlidersHorizontal, 
  CheckSquare, 
  Square,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCompare, PlanItem } from "@/lib/compareContext";
import { useCart } from "@/lib/cartContext";

interface ProviderTab {
  id: string;
  name: string;
  logo: string;
  badge: string;
}

const providerTabs: ProviderTab[] = [
  { id: "google", name: "Google Workspace", logo: "/images/google-workspace.png", badge: "Best Google Suite" },
  { id: "microsoft", name: "Microsoft 365", logo: "/images/microsoft-365.png", badge: "Best Outlook Suite" },
  { id: "zoho", name: "Zoho Mail", logo: "/images/zoho-mail.png", badge: "Best Budget Option" },
  { id: "rediff", name: "Rediffmail Pro", logo: "/images/rediffmail.png", badge: "Indian Data Sovereignty" },
  { id: "titan", name: "Titan Mail", logo: "/images/titan-mail.png", badge: "Built for Productivity" }
];

const providerPlansData: Record<string, PlanItem[]> = {
  zoho: [
    {
      id: "zoho-lite",
      providerId: "zoho",
      providerName: "Zoho Mail",
      planName: "Mail Lite",
      price: "₹58",
      period: "/ user / month",
      logo: "/images/zoho-mail.png",
      storage: "5 GB NVMe",
      sla: "99.9% SLA",
      attachment: "25 MB",
      features: [
        "5 GB NVMe Mailbox Storage per User",
        "Custom Business Domain (@yourcompany.com)",
        "Zero-Ads Interface with AI Anti-Spam",
        "Webmail, iOS & Android Mobile Apps",
        "Email Aliases, Routing & Group Mailboxes",
        "Free 1-Click Migration & 24/7 Support"
      ]
    },
    {
      id: "zoho-standard",
      providerId: "zoho",
      providerName: "Zoho Mail",
      planName: "Workplace Standard",
      price: "₹99",
      period: "/ user / month",
      logo: "/images/zoho-mail.png",
      storage: "30 GB Pooled",
      sla: "99.9% SLA",
      attachment: "50 MB",
      features: [
        "30 GB Pooled Mailbox + Drive Storage",
        "Custom Business Email (@company.com)",
        "Zoho Office Suite (Writer, Sheet, Show)",
        "Team Chat (Cliq) & Video Meetings",
        "Admin Control Console & Governance",
        "24/7 Managed Priority Technical Support"
      ]
    },
    {
      id: "zoho-premium",
      providerId: "zoho",
      providerName: "Zoho Mail",
      planName: "Mail Premium",
      price: "₹199",
      period: "/ user / month",
      logo: "/images/zoho-mail.png",
      storage: "50 GB Dedicated",
      sla: "99.9% SLA",
      attachment: "1 GB Huge Limit",
      features: [
        "50 GB Dedicated NVMe Storage per User",
        "Huge File Attachments up to 1 GB",
        "eDiscovery & Mail Archival Retention",
        "Custom S/MIME Encryption & Digital Signatures",
        "Domain Digital Signatures & Security",
        "24/7 Dedicated Support & SLA Guarantee"
      ]
    }
  ],
  rediff: [
    {
      id: "rediff-starter",
      providerId: "rediff",
      providerName: "Rediffmail Pro",
      planName: "Enterprise Starter",
      price: "₹89",
      period: "/ user / month",
      logo: "/images/rediffmail.png",
      storage: "10 GB Encrypted",
      sla: "99.99% SLA",
      attachment: "25 MB",
      features: [
        "10 GB Encrypted Cloud Storage per Inbox",
        "Custom Domain Email Branding & Setup",
        "Advanced Anti-Phishing & Spam Shield",
        "POP3, IMAP, SMTP & Webmail Protocols",
        "Shared Address Book & Contacts",
        "24/7 Priority Indian Technical Support"
      ]
    },
    {
      id: "rediff-business",
      providerId: "rediff",
      providerName: "Rediffmail Pro",
      planName: "Enterprise Business",
      price: "₹149",
      period: "/ user / month",
      logo: "/images/rediffmail.png",
      storage: "25 GB Storage",
      sla: "99.99% SLA",
      attachment: "35 MB",
      features: [
        "25 GB High-Speed Mailbox Storage",
        "Multi-Device Mobile App & Webmail Sync",
        "Dual-Layer Anti-Virus & Threat Shield",
        "Centralized Multi-User Admin Portal",
        "Shared Calendars & Event Reminders",
        "24/7 Priority Indian Support Team"
      ]
    },
    {
      id: "rediff-pro",
      providerId: "rediff",
      providerName: "Rediffmail Pro",
      planName: "Enterprise Pro Archival",
      price: "₹249",
      period: "/ user / month",
      logo: "/images/rediffmail.png",
      storage: "50 GB Storage",
      sla: "99.99% SLA",
      attachment: "50 MB",
      features: [
        "50 GB Storage + Automated Mail Archival",
        "Legal Hold Search & Compliance Audit",
        "Custom SSL Webmail Branding & Domain",
        "Dedicated Account Manager Assigned",
        "99.99% Financially Backed Uptime SLA",
        "24/7 Priority Phone & Live Support"
      ]
    }
  ],
  titan: [
    {
      id: "titan-lite",
      providerId: "titan",
      providerName: "Titan Mail",
      planName: "Business Mail Lite",
      price: "₹79",
      period: "/ user / month",
      logo: "/images/titan-mail.png",
      storage: "10 GB Storage",
      sla: "99.9% SLA",
      attachment: "30 MB",
      features: [
        "10 GB Mailbox Storage per Inbox",
        "Read Receipts & Undo Send Feature",
        "Follow-up Reminders & Snippet Templates",
        "Built-in Calendar, Contacts & Tasks Sync",
        "Seamless 1-Click Gmail & Outlook Import",
        "Multi-Account Sync on Mobile & Web"
      ]
    },
    {
      id: "titan-premium",
      providerId: "titan",
      providerName: "Titan Mail",
      planName: "Business Mail Premium",
      price: "₹149",
      period: "/ user / month",
      logo: "/images/titan-mail.png",
      storage: "30 GB Storage",
      sla: "99.9% SLA",
      attachment: "40 MB",
      features: [
        "30 GB Dedicated Storage per User Inbox",
        "Priority Inbox & Send Later Scheduling",
        "Advanced Email Templates & Snippets",
        "Built-in Task Manager & Collaboration",
        "Priority Customer Support Response",
        "24/7 Technical Managed Assistance"
      ]
    }
  ],
  google: [
    {
      id: "google-starter",
      providerId: "google",
      providerName: "Google Workspace",
      planName: "Business Starter",
      price: "₹136",
      period: "/ user / month",
      logo: "/images/google-workspace.png",
      storage: "30 GB Pooled",
      sla: "99.9% SLA",
      attachment: "25 MB / Drive",
      features: [
        "30 GB Pooled Cloud Storage per User",
        "Professional Gmail (@yourcompany.com)",
        "100 Participant Google Meet Video Calls",
        "Google Docs, Sheets & Slides Collaboration",
        "Centralized Google Cloud Admin Console",
        "2-Step Verification & Google Security"
      ]
    },
    {
      id: "google-standard",
      providerId: "google",
      providerName: "Google Workspace",
      planName: "Business Standard",
      price: "₹672",
      period: "/ user / month",
      logo: "/images/google-workspace.png",
      storage: "2 TB Pooled",
      sla: "99.9% SLA",
      attachment: "25 MB / Drive",
      features: [
        "2 TB (2000 GB) Pooled Storage per User",
        "150 User Meet + Recording & Noise Cancel",
        "Shared Team Drives for File Storage",
        "Security Controls & Central Admin Console",
        "Enhanced Cloud Search & Audit Logs",
        "24/7 Google Enterprise Support"
      ]
    },
    {
      id: "google-plus",
      providerId: "google",
      providerName: "Google Workspace",
      planName: "Business Plus",
      price: "₹1260",
      period: "/ user / month",
      logo: "/images/google-workspace.png",
      storage: "5 TB Pooled",
      sla: "99.9% SLA",
      attachment: "25 MB / Drive",
      features: [
        "5 TB (5000 GB) Pooled Storage per User",
        "500 User Meet + Recording + Attendance",
        "Vault eDiscovery & Data Retention",
        "Advanced Endpoint & Device Management",
        "Enhanced Security & Threat Defense Suite",
        "24/7 Priority Enterprise Google Support"
      ]
    }
  ],
  microsoft: [
    {
      id: "ms-basic",
      providerId: "microsoft",
      providerName: "Microsoft 365",
      planName: "Business Basic",
      price: "₹145",
      period: "/ user / month",
      logo: "/images/microsoft-365.png",
      storage: "50 GB Mailbox",
      sla: "99.9% SLA",
      attachment: "150 MB Large",
      features: [
        "50 GB Dedicated Exchange Mailbox per User",
        "1 TB OneDrive Cloud Storage Included",
        "Web & Mobile Outlook & Office Apps",
        "Microsoft Teams Meetings, Video & Chat",
        "Shared Calendars, Contacts & Groups",
        "Exchange Anti-Spam & Threat Defense"
      ]
    },
    {
      id: "ms-standard",
      providerId: "microsoft",
      providerName: "Microsoft 365",
      planName: "Business Standard",
      price: "₹660",
      period: "/ user / month",
      logo: "/images/microsoft-365.png",
      storage: "50 GB + 1 TB Drive",
      sla: "99.9% SLA",
      attachment: "150 MB Large",
      features: [
        "50 GB Exchange Mailbox + 1 TB OneDrive",
        "Full Desktop Installable Office Apps (Word, Excel, PPT, Outlook)",
        "Teams Webinars & Attendee Reporting",
        "Microsoft Booking & Customer Scheduling",
        "Centralized Admin Console & Permissions",
        "24/7 Microsoft Technical Support"
      ]
    },
    {
      id: "ms-premium",
      providerId: "microsoft",
      providerName: "Microsoft 365",
      planName: "Business Premium",
      price: "₹1620",
      period: "/ user / month",
      logo: "/images/microsoft-365.png",
      storage: "50 GB + 1 TB Drive",
      sla: "99.9% SLA",
      attachment: "150 MB Large",
      features: [
        "50 GB Mailbox + Desktop Office Apps Suite",
        "Advanced Defender Cyber Threat Defense",
        "Microsoft Intune Device & Mobile Management",
        "Information Protection & Data Loss Prevention",
        "Zero-Trust Access & Conditional Access",
        "24/7 Microsoft Enterprise Support"
      ]
    }
  ]
};

export default function ProviderPlansSection({
  onOpenAuthModal
}: {
  onOpenAuthModal?: (mode: "login" | "signup") => void;
}) {
  const [tabs, setTabs] = useState<ProviderTab[]>(providerTabs);
  const [plansData, setPlansData] = useState<Record<string, PlanItem[]>>(providerPlansData);
  const [selectedProviderTab, setSelectedProviderTab] = useState<string>("google");

  const { toggleComparePlan, isPlanSelected } = useCompare();
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchDynamicProviderPlans() {
      try {
        const res = await fetch("/api/providers");
        if (res.ok) {
          const data = await res.json();
          if (data.data && Array.isArray(data.data) && data.data.length > 0) {
            const enabledList = data.data.filter((p: any) => p.enabled !== false);
            if (enabledList.length > 0) {
              const newTabsMap = new Map<string, ProviderTab>();
              const newPlansMap: Record<string, PlanItem[]> = {};

              enabledList.forEach((p: any) => {
                const groupKey = (p.logoType || "google").toLowerCase().trim();
                const logoPath = `/images/${
                  groupKey === "google"
                    ? "google-workspace"
                    : groupKey === "microsoft"
                    ? "microsoft-365"
                    : groupKey === "zoho"
                    ? "zoho-mail"
                    : groupKey === "rediff"
                    ? "rediffmail"
                    : groupKey === "titan"
                    ? "titan-mail"
                    : "justemail-logo"
                }.png`;

                const providerDisplayName =
                  groupKey === "google"
                    ? "Google Workspace"
                    : groupKey === "microsoft"
                    ? "Microsoft 365"
                    : groupKey === "zoho"
                    ? "Zoho Mail"
                    : groupKey === "rediff"
                    ? "Rediffmail Pro"
                    : groupKey === "titan"
                    ? "Titan Mail"
                    : p.name;

                if (!newTabsMap.has(groupKey)) {
                  newTabsMap.set(groupKey, {
                    id: groupKey,
                    name: providerDisplayName,
                    logo: logoPath,
                    badge: p.badge || "Official Provider",
                  });
                }

                if (!newPlansMap[groupKey]) {
                  newPlansMap[groupKey] = [];
                }

                const newPlanItem: PlanItem = {
                  id: p.id,
                  providerId: groupKey,
                  providerName: p.name || providerDisplayName,
                  planName: p.subtitle || p.name,
                  price: p.price,
                  period: p.period || "/ user / month",
                  logo: logoPath,
                  storage: p.storage,
                  sla: p.uptime,
                  attachment: "30 MB",
                  features: Array.isArray(p.features) ? p.features : [],
                };

                const existingIndex = newPlansMap[groupKey].findIndex((item) => item.id === p.id);
                if (existingIndex > -1) {
                  newPlansMap[groupKey][existingIndex] = newPlanItem;
                } else {
                  newPlansMap[groupKey].push(newPlanItem);
                }
              });

              // Ensure standard fallback tabs are present if no custom plans exist for that provider
              providerTabs.forEach((t) => {
                if (!newTabsMap.has(t.id)) {
                  newTabsMap.set(t.id, t);
                  if (providerPlansData[t.id]) {
                    newPlansMap[t.id] = [...providerPlansData[t.id]];
                  }
                }
              });

              const mergedTabs = Array.from(newTabsMap.values());
              setTabs(mergedTabs);
              setPlansData(newPlansMap);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load provider plans:", err);
      }
    }
    fetchDynamicProviderPlans();
  }, []);

  const currentPlans = plansData[selectedProviderTab] || plansData["google"] || [];

  return (
    <section id="provider-plans" className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-800 border border-blue-100 uppercase tracking-wider">
            All Business Email Plans
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-3">
            Select Your Preferred Email Provider
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Switch providers below to view all official plans, features, and pricing. Check any plan to compare side-by-side!
          </p>
        </div>

        {/* --- PROVIDERS SINGLE HORIZONTAL LINE TAB BAR --- */}
        <div className="mb-12">
          <div className="flex items-center justify-start md:justify-center gap-3 overflow-x-auto pb-4 no-scrollbar">
            {tabs.map((tab) => {
              const isSelected = selectedProviderTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedProviderTab(tab.id)}
                  className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all shrink-0 ${
                    isSelected 
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
                  <div className="text-left">
                    <div className="text-xs font-extrabold leading-tight">{tab.name}</div>
                    <div className={`text-[10px] ${isSelected ? "text-blue-300" : "text-gray-400"}`}>
                      {tab.badge}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* --- PLAN CARDS DISPLAY GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {currentPlans.map((plan, idx) => {
              const isChecked = isPlanSelected(plan.id);
              const isFeaturedCard = idx === 1 || currentPlans.length === 1;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className={`rounded-2xl p-7 md:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                    isFeaturedCard 
                      ? "bg-[#0B1437] text-white shadow-2xl border border-slate-800 z-10" 
                      : "bg-white text-gray-900 shadow-md hover:shadow-xl border border-gray-200 z-10"
                  }`}
                >
                  <div>
                    {/* Top Bar: Logo & COMPARE BUTTON IN TOP RIGHT CORNER */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-11 h-11 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center p-2 overflow-hidden">
                        <Image
                          src={plan.logo}
                          alt={plan.providerName}
                          width={36}
                          height={36}
                          className="object-contain max-h-7 w-auto"
                        />
                      </div>

                      {/* COMPARE BUTTON IN TOP RIGHT CORNER */}
                      <button
                        onClick={() => toggleComparePlan(plan)}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-300 shadow-xs border active:scale-95 ${
                          isChecked 
                            ? "bg-blue-600 text-white border-blue-500 shadow-md" 
                            : isFeaturedCard 
                              ? "bg-white/10 text-white border-white/20 hover:bg-white/20" 
                              : "bg-[#0B1437] text-white border-[#0B1437] hover:bg-black"
                        }`}
                        title="Compare this plan"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        <span>{isChecked ? "Selected" : "Compare"}</span>
                      </button>
                    </div>

                    {/* Plan Names */}
                    <h3 className={`text-2xl font-extrabold tracking-tight mb-1 ${isFeaturedCard ? "text-white" : "text-gray-900"}`}>
                      {plan.planName}
                    </h3>
                    <div className="mb-4">
                      <Link 
                        href={`/business-emails/${plan.providerId}`}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold transition-all shadow-xs border ${
                          isFeaturedCard 
                            ? "bg-blue-500/20 text-blue-300 border-blue-400/30 hover:bg-blue-500/30 hover:text-white" 
                            : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:text-blue-900"
                        }`}
                      >
                        <span>Explore {plan.providerName} Page</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {/* Spec Chips Bar */}
                    <div className={`grid grid-cols-2 gap-2 p-3 rounded-xl mb-6 text-[11px] font-semibold ${
                      isFeaturedCard ? "bg-[#14214D] text-gray-200 border border-slate-700" : "bg-slate-50 text-gray-700 border border-gray-100"
                    }`}>
                      <div className="flex items-center gap-1.5">
                        <HardDrive className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{plan.storage}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{plan.sla}</span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5">
                          <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                            isFeaturedCard ? "bg-[#1E2A56] text-blue-300" : "bg-[#D8E6FF] text-[#2563EB]"
                          }`}>
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          </div>
                          <span className={`text-xs font-medium leading-relaxed ${isFeaturedCard ? "text-gray-200" : "text-gray-700"}`}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Row: Price & BUY NOW Button */}
                  <div className={`pt-5 flex items-center justify-between border-t ${
                    isFeaturedCard ? "border-slate-800" : "border-gray-100"
                  }`}>
                    <div>
                      <div className={`text-2xl font-extrabold tracking-tight ${isFeaturedCard ? "text-white" : "text-gray-900"}`}>
                        {plan.price}
                        <span className={`text-xs font-medium ml-1 ${isFeaturedCard ? "text-gray-400" : "text-gray-500"}`}>
                          {plan.period}
                        </span>
                      </div>
                      <div className={`text-[10px] font-normal mt-0.5 ${isFeaturedCard ? "text-gray-400" : "text-gray-500"}`}>
                        Billed annually
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/enquiryForm?provider=${encodeURIComponent(plan.providerName || plan.providerId || "")}&plan=${encodeURIComponent(`${plan.planName || plan.subtitle || plan.name || ""} (${plan.price || ""})`)}&providerId=${encodeURIComponent(plan.id || "")}`}
                        className={`rounded-xl px-3 py-2.5 text-xs font-bold transition-all duration-300 border ${
                          isFeaturedCard
                            ? "bg-blue-500/20 text-blue-300 border-blue-400/30 hover:bg-blue-500/40 hover:text-white"
                            : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:text-blue-900"
                        }`}
                      >
                        <span>Enquiry now</span>
                      </Link>
                      {/* <Link
                        href={`/checkout?plan=${plan.id}`}
                        onClick={() => addToCart(plan, 1)}
                        className={`rounded-xl px-4 py-2.5 text-xs font-extrabold flex items-center gap-1.5 transition-all duration-300 active:scale-95 ${
                          isFeaturedCard 
                            ? "bg-white text-[#0B1437] hover:bg-gray-100 shadow-md" 
                            : "bg-[#0B1437] text-white hover:bg-black shadow-md"
                        }`}
                      >
                        <span>Buy Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link> */}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
