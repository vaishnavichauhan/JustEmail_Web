"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Mail,
  ShieldCheck,
  HardDrive,
  Users,
  Zap
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";

interface BusinessEmailCard {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  price: string;
  period: string;
  billingNote: string;
  storage: string;
  uptime: string;
  recommendedUsers: string;
  logoType: "zoho" | "rediff" | "titan" | "google" | "microsoft";
  features: string[];
}

const businessEmailCards: BusinessEmailCard[] = [
  {
    id: "google",
    name: "Google Workspace",
    subtitle: "Business Starter",
    badge: "Best for Google Ecosystem",
    price: "₹136",
    period: "/ user / month",
    billingNote: "Billed annually (₹160/mo if monthly)",
    storage: "30 GB Storage",
    uptime: "99.9% SLA",
    recommendedUsers: "5 - 500 Users",
    logoType: "google",
    features: [
      "30 GB Pooled Cloud Storage per User",
      "Gmail for Professional Business Domain",
      "100 Participant Google Meet Video Calls",
      "Google Docs, Sheets, Slides & Forms Suite",
      "Centralized Google Cloud Admin Console",
      "24/7 Enterprise Support & 2SV Security"
    ]
  },
  {
    id: "microsoft",
    name: "Microsoft 365",
    subtitle: "Exchange Online (Plan 1)",
    badge: "Best for Office & Outlook",
    price: "₹145",
    period: "/ user / month",
    billingNote: "Billed annually (₹175/mo if monthly)",
    storage: "50 GB Storage",
    uptime: "99.9% SLA",
    recommendedUsers: "10 - 1000+ Users",
    logoType: "microsoft",
    features: [
      "50 GB Dedicated Mailbox Storage",
      "150 MB Attachment Sending & Receiving Limit",
      "Full Outlook Web & Premium Mobile Apps",
      "Exchange Anti-Spam & Threat Protection",
      "Shared Calendars, Contacts & Distribution Lists",
      "24/7 Microsoft Enterprise Technical Support"
    ]
  },
  {
    id: "zoho",
    name: "Zoho Mail",
    subtitle: "Mail Lite Starter Plan",
    badge: "Best Value for Startups",
    price: "₹58",
    period: "/ user / month",
    billingNote: "Billed annually (₹69/mo if monthly)",
    storage: "5 GB Storage",
    uptime: "99.9% SLA",
    recommendedUsers: "1 - 50 Users",
    logoType: "zoho",
    features: [
      "5 GB NVMe Mailbox Storage per User",
      "Custom Business Domain (@yourcompany.com)",
      "Email Aliases, Routing & Group Mailboxes",
      "Webmail, iOS/Android & Desktop App Access",
      "Zero-Ads Interface with AI Anti-Spam Shield",
      "Free 1-Click Migration & 24/7 Managed Support"
    ]
  },
  {
    id: "rediff",
    name: "Rediffmail Pro",
    subtitle: "Enterprise Mail Suite",
    badge: "High Security & Compliance",
    price: "₹89",
    period: "/ user / month",
    billingNote: "Billed annually (₹99/mo if monthly)",
    storage: "10 GB Storage",
    uptime: "99.99% SLA",
    recommendedUsers: "10 - 200 Users",
    logoType: "rediff",
    features: [
      "10 GB Encrypted Storage per Inbox",
      "Custom Domain Email Branding & Setup",
      "Advanced Phishing & Malware Shield",
      "POP3, IMAP, SMTP & Webmail Protocols",
      "Centralized Admin Console & User Permissions",
      "24/7 Priority Indian Technical Support"
    ]
  },
  {
    id: "titan",
    name: "Titan Mail",
    subtitle: "Business Mail Lite",
    badge: "Most Popular for Teams",
    price: "₹79",
    period: "/ user / month",
    billingNote: "Billed annually (₹89/mo if monthly)",
    storage: "10 GB Storage",
    uptime: "99.9% SLA",
    recommendedUsers: "1 - 100 Users",
    logoType: "titan",
    features: [
      "10 GB Storage with Instant Global Search",
      "Read Receipts, Undo Send & Scheduled Mail",
      "Follow-up Reminders & Snippet Templates",
      "Integrated Calendar, Contacts & Tasks",
      "Seamless One-Click Gmail & Outlook Import",
      "Multi-Account Support on Mobile & Desktop"
    ]
  }
];

export default function BusinessEmailsSection({
  onOpenAuthModal
}: {
  onOpenAuthModal?: (mode: "login" | "signup") => void;
}) {
  const [startIndex, setStartIndex] = useState(0);
  const [cards, setCards] = useState<BusinessEmailCard[]>(businessEmailCards);

  useEffect(() => {
    async function fetchDynamicProviders() {
      try {
        const res = await fetch("/api/providers");
        if (res.ok) {
          const data = await res.json();
          if (data.data && Array.isArray(data.data) && data.data.length > 0) {
            const enabledList = data.data.filter((p: any) => p.enabled !== false);
            if (enabledList.length > 0) {
              // Group by provider logoType/group and keep ONLY the latest plan for each provider
              const latestProviderMap = new Map<string, any>();

              enabledList.forEach((p: any) => {
                const groupKey = (p.logoType || p.id).toLowerCase();
                latestProviderMap.set(groupKey, p); // keeps the latest plan per provider group
              });

              const latestCards = Array.from(latestProviderMap.values()).map((p: any) => ({
                id: p.id,
                name: p.name,
                subtitle: p.subtitle || p.name,
                badge: p.badge || "Official Provider",
                price: p.price,
                period: p.period || "/ user / month",
                billingNote: p.billingNote || "Billed annually",
                storage: p.storage,
                uptime: p.uptime,
                recommendedUsers: p.recommendedUsers || "1 - 100 Users",
                logoType: (p.logoType || "custom").toLowerCase() as any,
                features: Array.isArray(p.features) ? p.features : [],
              }));

              setCards(latestCards);
            }
          }
        }
      } catch (e) {
        console.error("Failed to load providers from API:", e);
      }
    }
    fetchDynamicProviders();
  }, []);

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? Math.max(0, cards.length - 3) : Math.max(0, prev - 1)));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 3 >= cards.length ? 0 : prev + 1));
  };

  const visibleCards = cards.slice(startIndex, startIndex + 3);

  if (visibleCards.length < 3 && cards.length >= 3) {
    visibleCards.push(...cards.slice(0, 3 - visibleCards.length));
  }

  const renderLogo = (logoType: string, isDark?: boolean) => {
    switch (logoType) {
      case "zoho":
        return (
          <div className="w-11 h-11 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center p-2 overflow-hidden">
            <Image
              src="/images/zoho-mail.png"
              alt="Zoho Mail Logo"
              width={36}
              height={36}
              className="object-contain max-h-7 w-auto"
            />
          </div>
        );
      case "rediff":
        return (
          <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-100 overflow-hidden p-2">
            <Image
              src="/images/rediffmail.png"
              alt="Rediffmail Logo"
              width={36}
              height={36}
              className="object-contain max-h-7 w-auto"
            />
          </div>
        );
      case "titan":
        return (
          <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-100 overflow-hidden p-2">
            <Image
              src="/images/titan-mail.png"
              alt="Titan Mail Logo"
              width={36}
              height={36}
              className="object-contain max-h-7 w-auto"
            />
          </div>
        );
      case "microsoft":
        return (
          <div className="w-11 h-11 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center p-2 overflow-hidden">
            <Image
              src="/images/microsoft-365.png"
              alt="Microsoft 365 Logo"
              width={36}
              height={36}
              className="object-contain max-h-7 w-auto"
            />
          </div>
        );
      case "google":
        return (
          <div className="w-11 h-11 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center p-2 overflow-hidden">
            <Image
              src="/images/google-workspace.png"
              alt="Google Workspace Logo"
              width={36}
              height={36}
              className="object-contain max-h-7 w-auto"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="business-emails" className="pt-6 pb-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Header Badge & Text */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-1.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-800 border border-blue-100 shadow-2xs">
              Trusted Email Solutions
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-gray-900 tracking-tight leading-[1.25] mb-4"
          >
            Power Your Business<br className="hidden sm:inline" /> with Trusted Email Platforms
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-gray-500 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Deploy secure, professional email for your business with the world's leading providers. We help you set up, migrate, manage, and support all one trusted partner.
          </motion.p>
        </div>

        {/* Business Email Cards Carousel / Grid */}
        <div className="relative mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {visibleCards.map((card, idx) => {
                const isCenterCard = idx === 1;
                const isDark = isCenterCard;
                return (
                  <motion.div
                    key={`${card.id}-${idx}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className={`rounded-2xl p-7 md:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${isCenterCard
                      ? "bg-[#0B1437] text-white shadow-2xl border border-slate-800 md:-translate-y-2 md:scale-105 z-20"
                      : "bg-white text-gray-900 shadow-md hover:shadow-xl border border-gray-100 z-10"
                      }`}
                  >
                    {/* Background Subtle Mail Outline */}
                    <div className={`absolute -top-3 -right-3 pointer-events-none ${isDark ? "text-white/10" : "text-gray-200/50"}`}>
                      <Mail className="w-28 h-28 stroke-[0.8]" />
                    </div>

                    <div>
                      {/* Top Highlight Badge */}
                      <div className="mb-4">
                        <span className={`inline-block px-3 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase ${isDark
                          ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                          : "bg-blue-50 text-blue-700 border border-blue-100"
                          }`}>
                          {card.badge}
                        </span>
                      </div>

                      {/* Header Row: Logo & Names */}
                      <div className="flex items-center gap-3.5 mb-4 relative z-10">
                        {renderLogo(card.logoType, isDark)}
                        <div>
                          <h3 className={`text-2xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                            {card.name}
                          </h3>
                          <p className={`text-xs font-medium mb-1.5 ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                            {card.subtitle}
                          </p>
                          <Link
                            href={`/business-emails/${card.logoType === 'google' ? 'google-workspace' : card.logoType === 'microsoft' ? 'microsoft-365' : card.logoType === 'zoho' ? 'zoho-mail' : card.logoType === 'rediff' ? 'rediffmail-pro' : 'titan-mail'}`}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold transition-all border ${isDark
                              ? "bg-blue-500/20 text-blue-300 border-blue-400/30 hover:bg-blue-500/30 hover:text-white"
                              : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:text-blue-900"
                              }`}
                          >
                            <span>Explore {card.name} Page</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>

                      {/* Key Spec Chips Bar */}
                      <div className={`grid grid-cols-2 gap-2 p-3 rounded-xl mb-6 text-[11px] font-semibold ${isDark ? "bg-[#14214D] text-gray-200 border border-slate-700" : "bg-slate-50 text-gray-700 border border-gray-100"
                        }`}>
                        <div className="flex items-center gap-1.5">
                          <HardDrive className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <span>{card.storage}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{card.uptime}</span>
                        </div>
                        <div className="flex items-center gap-1.5 col-span-2">
                          <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{card.recommendedUsers}</span>
                        </div>
                      </div>

                      {/* Expanded 6 Features List */}
                      <div className="space-y-3 mb-8">
                        {card.features.map((feature, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2.5">
                            <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${isDark ? "bg-[#1E2A56] text-blue-300" : "bg-[#D8E6FF] text-[#2563EB]"
                              }`}>
                              <Check className="w-3 h-3 stroke-[2.5]" />
                            </div>
                            <span className={`text-xs font-medium leading-relaxed ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Price, Billing Note & Action Button */}
                    <div className={`pt-5 flex items-center justify-between border-t ${isDark ? "border-slate-800" : "border-gray-100"
                      }`}>
                      <div>
                        <div className={`text-2xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                          {card.price}
                          <span className={`text-xs font-medium ml-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            {card.period}
                          </span>
                        </div>
                        <div className={`text-[10px] font-normal mt-0.5 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                          {card.billingNote}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/enquiryForm?provider=${encodeURIComponent(card.name || "")}&plan=${encodeURIComponent(`${card.subtitle || card.name} (${card.price || ""})`)}&providerId=${encodeURIComponent(card.id || "")}`}
                          className={`rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all duration-300 border ${isDark
                            ? "bg-blue-500/20 text-blue-300 border-blue-400/30 hover:bg-blue-500/40 hover:text-white"
                            : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:text-blue-900"
                            }`}
                        >
                          <span>Enquiry now</span>
                        </Link>
                        {/* <Link
                          href={`/checkout?plan=${card.id === 'google' ? 'google-starter' :
                            card.id === 'microsoft' ? 'ms-basic' : card.id === 'zoho' ? 'zoho-lite'
                              : card.id === 'rediff' ? 'rediff-starter' : 'titan-lite'}`}
                          className={`rounded-xl px-4 py-2.5 text-xs font-bold flex items-center gap-1.5 transition-all duration-300 ${isDark
                            ? "bg-white text-[#0B1437] hover:bg-gray-100 shadow-sm"
                            : "bg-[#0B1437] text-white hover:bg-black shadow-sm"
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

        {/* Circular Carousel Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-50 shadow-xs transition-all active:scale-95"
            aria-label="Previous plans"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-xl bg-[#0B1437] text-white flex items-center justify-center shadow-md hover:bg-black transition-all active:scale-95"
            aria-label="Next plans"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}

